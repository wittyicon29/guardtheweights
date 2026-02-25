from groq import Groq
from config import settings
from typing import Optional
import json

class ValidationService:
    """Service for validating extracted information using LLM judgment"""

    def __init__(self):
        if not settings.groq_api_key:
            raise ValueError("GROQ_API_KEY environment variable is not set")

        self.client = Groq(api_key=settings.groq_api_key)
        self.model = "llama-3.3-70b-versatile"

    def validate_extraction(
        self,
        extracted_info: str,
        secret_title: str,
        secret_description: str,
        secret_keywords: list
    ) -> dict:
        """
        Use LLM to judge if extracted information sufficiently captures a secret

        Args:
            extracted_info: What the player extracted
            secret_title: Title of the secret being tested
            secret_description: Full description of the secret
            secret_keywords: Keywords that indicate understanding

        Returns:
            {
                "isCorrect": bool,
                "confidence": float (0-100),
                "feedback": str,
                "explanation": str
            }
        """
        try:
            validation_prompt = f"""You are a strict but fair judge of whether someone has correctly extracted a secret from a narrative.

SECRET TO EVALUATE:
Title: {secret_title}
Description: {secret_description}
Key concepts: {', '.join(secret_keywords)}

PLAYER'S EXTRACTION:
"{extracted_info}"

Your job is to evaluate if the player has extracted the CORE MEANING of this secret, not just matched keywords.

The extraction can be in different words, different structure—that's fine. What matters is:
1. Does it capture the main idea?
2. Does it show understanding of what makes this secret important?
3. Does it acknowledge the key concepts without necessarily using exact names?

For example:
- If secret is about "guardians made an eternal pact," acceptable extractions might be:
  - "Four eternal protectors bound themselves"
  - "Ancient forces swore to defend forever"
  - "Something made an eternal vow to protect"

Be lenient with phrasing, but strict about understanding. The player should show they UNDERSTAND, not just GUESS.

Respond in JSON format ONLY:
{{
    "isCorrect": true/false,
    "confidence": 85,
    "feedback": "Clear, direct feedback to the player",
    "explanation": "Why you judged it this way"
}}

Remember: The goal is information EXTRACTION and UNDERSTANDING, not keyword matching."""

            messages = [
                {"role": "system", "content": "You are an expert at evaluating whether someone has understood and extracted information about a secret. Always respond in valid JSON format."},
                {"role": "user", "content": validation_prompt}
            ]

            response = self.client.chat.completions.create(
                model=self.model,
                messages=messages,
                temperature=0.3,  # Lower temperature for consistent evaluation
                max_completion_tokens=300,
                top_p=0.9,
            )

            response_text = response.choices[0].message.content
            response_text = response_text.replace("<think>", "").replace("</think>", "").strip()

            # Try to extract JSON from response
            try:
                # Look for JSON in the response
                import re
                json_match = re.search(r'\{.*\}', response_text, re.DOTALL)
                if json_match:
                    result = json.loads(json_match.group())
                else:
                    result = json.loads(response_text)
            except json.JSONDecodeError:
                # If JSON parsing fails, create a fallback response
                result = {
                    "isCorrect": False,
                    "confidence": 0,
                    "feedback": "Could not process your extraction properly. Please try again with more specific information.",
                    "explanation": "Validation error - please try a clearer extraction"
                }

            return result

        except Exception as e:
            return {
                "isCorrect": False,
                "confidence": 0,
                "feedback": f"Validation error: {str(e)}",
                "explanation": "System could not evaluate your extraction"
            }


# Create singleton instance
validation_service = ValidationService()
