from fastapi import APIRouter, HTTPException
from models.schemas import (
    ValidateAnswerRequest,
    ValidateAnswerResponse,
    GameStateResponse,
    GameResetResponse,
)
from services.game_logic import game_logic_service
import logging

router = APIRouter()
logger = logging.getLogger(__name__)

@router.get("/state", response_model=GameStateResponse)
async def get_game_state() -> GameStateResponse:
    """Get the current game state"""
    try:
        state = game_logic_service.get_game_state()
        return GameStateResponse(**state)
    except Exception as e:
        logger.error(f"Error getting game state: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/validate-answer", response_model=ValidateAnswerResponse)
async def validate_answer(request: ValidateAnswerRequest) -> ValidateAnswerResponse:
    """
    Validate extracted information and unlock secrets

    Args:
        request: ValidateAnswerRequest with extracted information

    Returns:
        ValidateAnswerResponse indicating if answer is correct
    """
    try:
        logger.info(f"Validating answer for secret: {request.secretId}")
        result = game_logic_service.validate_extracted_info(
            extracted_info=request.extractedInfo,
            secret_id=request.secretId
        )
        return ValidateAnswerResponse(**result)
    except Exception as e:
        logger.error(f"Error validating answer: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/reset", response_model=GameResetResponse)
async def reset_game() -> GameResetResponse:
    """Reset the game state for a new playthrough"""
    try:
        game_logic_service.reset_game()
        logger.info("Game has been reset")
        return GameResetResponse()
    except Exception as e:
        logger.error(f"Error resetting game: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/status")
async def game_status():
    """Get the status of the game service"""
    return {
        "status": "ready",
        "service": "game",
        "message": "Game endpoint is operational"
    }

@router.get("/rank-status")
async def get_rank_status():
    """Get the current player rank and progress"""
    try:
        rank_status = game_logic_service.get_rank_status()
        return rank_status
    except Exception as e:
        logger.error(f"Error getting rank status: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/secrets")
async def get_all_secrets():
    """Get all available secrets"""
    try:
        secrets = game_logic_service.secrets_db.get("secrets", [])
        return {"secrets": secrets}
    except Exception as e:
        logger.error(f"Error getting secrets: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))
