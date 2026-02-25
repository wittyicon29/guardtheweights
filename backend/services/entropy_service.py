import math
from typing import Dict, List, Optional, Any
import logging
from collections import Counter

logger = logging.getLogger(__name__)


class EntropyService:
    """
    Calculates Shannon entropy and weighted closeness metrics for LLM responses.

    Weighted metric combines:
    - Response Entropy (40%): Lower entropy = more deterministic = closer to answer
    - Keyword Presence (40%): How many target keywords appear in response
    - Semantic Similarity (20%): How similar response is to secret description
    """

    @staticmethod
    def calculate_response_entropy(response: str) -> float:
        """
        Calculate Shannon entropy of LLM response (0-1 normalized).
        Lower entropy = more predictable = potentially closer to specific answer.

        Args:
            response: The LLM response text

        Returns:
            Normalized entropy score (0-1). 0 = very predictable, 1 = very random
        """
        if not response or len(response.strip()) == 0:
            return 0.5  # Default neutral entropy for empty response

        # Tokenize into words
        tokens = response.lower().split()

        if len(tokens) == 0:
            return 0.5

        # Calculate probability distribution
        token_counts = Counter(tokens)
        total_tokens = len(tokens)
        probabilities = [count / total_tokens for count in token_counts.values()]

        # Calculate Shannon entropy: H(X) = -Σ p(x_i) * log2(p(x_i))
        entropy = 0.0
        for p in probabilities:
            if p > 0:
                entropy -= p * math.log2(p)

        # Normalize to 0-1 range based on max possible entropy
        # Max entropy for n symbols is log2(n)
        max_entropy = math.log2(len(token_counts)) if len(token_counts) > 1 else 1
        normalized_entropy = min(entropy / max_entropy, 1.0) if max_entropy > 0 else 0.5

        return normalized_entropy

    @staticmethod
    def calculate_keyword_score(response: str, secret_keywords: List[str]) -> float:
        """
        Score how well the response matches secret keywords.

        Args:
            response: The LLM response text
            secret_keywords: List of keywords to look for

        Returns:
            Score 0-1 based on keyword matches
        """
        if not secret_keywords or len(secret_keywords) == 0:
            return 0.5  # Neutral score if no keywords

        response_lower = response.lower()
        matching_keywords = sum(
            1 for keyword in secret_keywords
            if keyword.lower() in response_lower
        )

        # Score based on percentage of keywords found
        keyword_score = matching_keywords / len(secret_keywords)

        return min(keyword_score, 1.0)

    @staticmethod
    def calculate_semantic_similarity(response: str, secret_description: str) -> float:
        """
        Calculate rough semantic similarity between response and secret description.
        Uses token overlap as a simple approximation.

        Args:
            response: The LLM response text
            secret_description: The secret's description

        Returns:
            Similarity score 0-1
        """
        if not response or not secret_description:
            return 0.5  # Neutral if empty

        # Tokenize both texts
        response_tokens = set(response.lower().split())
        description_tokens = set(secret_description.lower().split())

        if len(response_tokens) == 0 or len(description_tokens) == 0:
            return 0.5

        # Jaccard similarity: intersection / union
        intersection = len(response_tokens & description_tokens)
        union = len(response_tokens | description_tokens)

        if union == 0:
            return 0.5

        similarity = intersection / union
        return similarity

    def get_closeness_score(
        self,
        response: str,
        secret_keywords: List[str],
        secret_description: str
    ) -> Dict[str, Any]:
        """
        Calculate comprehensive closeness score using weighted metrics.

        Weights:
        - Entropy (40%): Lower entropy = more deterministic information
        - Keywords (40%): More keywords = more directly related
        - Similarity (20%): Better semantic match = more relevant

        Args:
            response: The LLM response
            secret_keywords: Keywords to match against
            secret_description: Full secret description

        Returns:
            Dictionary with:
            - entropyScore: 0-1 (raw shannon entropy)
            - keywordScore: 0-1 (keyword match percentage)
            - similarityScore: 0-1 (semantic similarity)
            - closenessPercent: 0-100 (weighted combination)
            - closenessLevel: categorical level
            - feedback: human-readable feedback
        """
        entropy_score = self.calculate_response_entropy(response)
        keyword_score = self.calculate_keyword_score(response, secret_keywords)
        similarity_score = self.calculate_semantic_similarity(response, secret_description)

        # Invert entropy: high entropy (random) = low closeness
        entropy_component = (1 - entropy_score) * 0.40
        keyword_component = keyword_score * 0.40
        similarity_component = similarity_score * 0.20

        # Calculate weighted closeness (0-1)
        closeness_score = entropy_component + keyword_component + similarity_component
        closeness_percent = int(closeness_score * 100)

        # Determine closeness level
        if closeness_percent >= 75:
            closeness_level = "very_close"
            feedback = "Very Close! 🎯"
        elif closeness_percent >= 50:
            closeness_level = "close"
            feedback = "Getting Warmer! 🔥"
        elif closeness_percent >= 25:
            closeness_level = "neutral"
            feedback = "On the right track 🧭"
        elif closeness_percent > 0:
            closeness_level = "far"
            feedback = "Keep searching 🔍"
        else:
            closeness_level = "very_far"
            feedback = "Getting Colder ❄️"

        return {
            "entropyScore": round(entropy_score, 4),
            "keywordScore": round(keyword_score, 4),
            "similarityScore": round(similarity_score, 4),
            "closenessPercent": closeness_percent,
            "closenessLevel": closeness_level,
            "feedback": feedback
        }

    @staticmethod
    def get_entropy_delta(previous_score: float, current_score: float) -> str:
        """
        Compare two closeness scores to determine if getting closer or further.

        Args:
            previous_score: Previous closeness percent (0-100)
            current_score: Current closeness percent (0-100)

        Returns:
            Feedback string
        """
        delta = current_score - previous_score

        if delta > 10:
            return "Getting much warmer! 🔥🔥"
        elif delta > 5:
            return "Getting warmer! 🔥"
        elif delta > 0:
            return "Slightly warmer 🌡️"
        elif delta == 0:
            return "Same direction 🧭"
        elif delta > -5:
            return "Slightly colder 🧊"
        elif delta > -10:
            return "Getting colder ❄️"
        else:
            return "Much colder ❄️❄️"


# Create singleton instance
entropy_service = EntropyService()
