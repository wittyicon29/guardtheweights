from fastapi import APIRouter, HTTPException
from models.schemas import AskQuestionRequest, AskQuestionResponse
from services.gemini_service import gemini_service
from services.game_logic import game_logic_service
from services.entropy_service import entropy_service
import logging

router = APIRouter()
logger = logging.getLogger(__name__)

@router.post("/ask", response_model=AskQuestionResponse)
async def ask_question(request: AskQuestionRequest) -> AskQuestionResponse:
    """
    Ask the narrator a question

    Args:
        request: AskQuestionRequest containing the question and optional context

    Returns:
        AskQuestionResponse with the narrator's answer and entropy metrics
    """
    try:
        # Log the question
        logger.info(f"Received question: {request.question}")

        # Get current rank from game logic
        current_rank = game_logic_service.get_current_rank()
        logger.info(f"Current player rank: {current_rank}")

        # Get response from Gemini with rank-based prompt
        response = gemini_service.ask_question(
            question=request.question,
            game_context=request.gameContext,
            rank=current_rank
        )

        logger.info(f"Generated response of length: {len(response)}")

        # Calculate entropy and closeness metrics
        # Find the current secret (first unlocked secret not yet fully explored, or first secret)
        unlocked_secrets = game_logic_service.game_state["unlocked_secrets"]
        all_secrets = game_logic_service.secrets_db.get("secrets", [])

        # Target the first non-unlocked secret for entropy calculation
        target_secret = None
        for secret in all_secrets:
            if secret["id"] not in unlocked_secrets:
                target_secret = secret
                break

        # If all secrets unlocked, use the last one
        if not target_secret and all_secrets:
            target_secret = all_secrets[-1]

        # Calculate closeness metrics
        entropy_metrics = {
            "entropyScore": 0.5,
            "closenessPercent": 0,
            "closenessLevel": "neutral",
            "feedback": "Neutral"
        }

        if target_secret:
            keywords = target_secret.get("keywords", [])
            description = target_secret.get("description", "")
            entropy_metrics = entropy_service.get_closeness_score(
                response=response,
                secret_keywords=keywords,
                secret_description=description
            )
            logger.info(f"Entropy metrics calculated: {entropy_metrics}")

        return AskQuestionResponse(
            response=response,
            extractedInfo=None,
            entropyScore=entropy_metrics["entropyScore"],
            closenessPercent=entropy_metrics["closenessPercent"],
            closenessLevel=entropy_metrics["closenessLevel"],
            feedback=entropy_metrics["feedback"]
        )

    except ValueError as e:
        logger.error(f"Configuration error: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail=f"API Configuration Error: Make sure GEMINI_API_KEY is set in .env file"
        )
    except Exception as e:
        logger.error(f"Error processing question: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail=f"Error getting response from narrator: {str(e)}"
        )

@router.get("/status")
async def chat_status():
    """Get the status of the chat service"""
    return {
        "status": "ready",
        "service": "chat",
        "message": "Chat endpoint is operational"
    }
