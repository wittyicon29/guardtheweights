import json
import os
from typing import Dict, List, Optional, Any
import logging
from .validation_service import validation_service

logger = logging.getLogger(__name__)

class GameLogicService:
    """Handles game mechanics, secret unlocking, and answer validation"""

    def __init__(self):
        self.game_state = {
            "unlocked_secrets": [],
            "total_secrets": 0,
            "message_count": 0
        }
        self.secrets_db = self._load_secrets()

    def _load_secrets(self) -> Dict[str, Any]:
        """Load game secrets from data/lore.json"""
        secrets_path = os.path.join(os.path.dirname(__file__), "..", "data", "lore.json")
        try:
            if os.path.exists(secrets_path):
                with open(secrets_path, 'r') as f:
                    return json.load(f)
            else:
                # Return default secrets if file doesn't exist
                return self._get_default_secrets()
        except Exception as e:
            logger.error(f"Error loading secrets: {str(e)}")
            return self._get_default_secrets()

    @staticmethod
    def _get_default_secrets() -> Dict[str, Any]:
        """Get default game secrets"""
        return {
            "secrets": [
                {
                    "id": "secret_1",
                    "title": "Ancient Origins",
                    "description": "This world was created by an ancient civilization",
                    "hints": ["civilization", "ancient", "created"],
                    "keywords": ["ancient", "civilization"],
                    "reward": "Unlock access to hidden ruins"
                },
                {
                    "id": "secret_2",
                    "title": "Hidden Powers",
                    "description": "Magic flows through this land, but few know how to harness it",
                    "hints": ["magic", "power", "harness"],
                    "keywords": ["magic", "power"],
                    "reward": "Learn basic spellcasting"
                },
                {
                    "id": "secret_3",
                    "title": "Lost Treasury",
                    "description": "Gold and artifacts lie hidden in the Obsidian Caves",
                    "hints": ["treasure", "cave", "gold", "obsidian"],
                    "keywords": ["treasure", "cave"],
                    "reward": "Obtain valuable treasure"
                }
            ]
        }

    def get_game_state(self) -> Dict[str, Any]:
        """Get current game state"""
        return {
            "unlockedSecrets": self.game_state["unlocked_secrets"],
            "totalSecrets": len(self.secrets_db.get("secrets", [])),
            "messageCount": self.game_state["message_count"],
            "status": "active"
        }

    def validate_extracted_info(self, extracted_info: str, secret_id: Optional[str] = None) -> Dict[str, Any]:
        """
        Validate extracted information using LLM judgment

        Args:
            extracted_info: The extracted information from user
            secret_id: ID of specific secret to check (optional)

        Returns:
            Result with validation status and potentially unlocked secret
        """
        if secret_id:
            # Check specific secret
            secret = self._find_secret_by_id(secret_id)
            if not secret:
                return {
                    "isCorrect": False,
                    "unlockedSecret": None,
                    "message": "Secret not found"
                }

            # Use LLM to validate the extraction
            validation_result = validation_service.validate_extraction(
                extracted_info=extracted_info,
                secret_title=secret.get("title", "Unknown Secret"),
                secret_description=secret.get("description", ""),
                secret_keywords=secret.get("keywords", [])
            )

            logger.info(f"LLM validation result: {validation_result}")

            # Check if validation was successful based on LLM judgment
            if validation_result.get("isCorrect", False):
                if secret_id not in self.game_state["unlocked_secrets"]:
                    self.game_state["unlocked_secrets"].append(secret_id)
                    logger.info(f"Secret {secret_id} unlocked!")

                return {
                    "isCorrect": True,
                    "unlockedSecret": {
                        "id": secret["id"],
                        "title": secret["title"],
                        "description": secret["description"],
                        "reward": secret.get("reward"),
                        "unlocked": True
                    },
                    "message": validation_result.get("feedback", f"🎉 Correct! You unlocked '{secret['title']}'!")
                }
            else:
                return {
                    "isCorrect": False,
                    "unlockedSecret": None,
                    "message": validation_result.get("feedback", "Not quite right. Keep exploring and trying to understand the secret more deeply.")
                }
        else:
            # Try to match against any secret
            for secret in self.secrets_db.get("secrets", []):
                # Skip already unlocked secrets
                if secret["id"] in self.game_state["unlocked_secrets"]:
                    continue

                validation_result = validation_service.validate_extraction(
                    extracted_info=extracted_info,
                    secret_title=secret.get("title", "Unknown Secret"),
                    secret_description=secret.get("description", ""),
                    secret_keywords=secret.get("keywords", [])
                )

                if validation_result.get("isCorrect", False):
                    secret_id = secret["id"]
                    if secret_id not in self.game_state["unlocked_secrets"]:
                        self.game_state["unlocked_secrets"].append(secret_id)
                        logger.info(f"Secret {secret_id} unlocked!")

                    return {
                        "isCorrect": True,
                        "unlockedSecret": {
                            "id": secret["id"],
                            "title": secret["title"],
                            "description": secret["description"],
                            "reward": secret.get("reward"),
                            "unlocked": True
                        },
                        "message": validation_result.get("feedback", f"🎉 Correct! You unlocked '{secret['title']}'!")
                    }

            return {
                "isCorrect": False,
                "unlockedSecret": None,
                "message": "Keep looking! The narrator may have hidden more clues."
            }

    def _find_secret_by_id(self, secret_id: str) -> Optional[Dict[str, Any]]:
        """Find a secret by ID"""
        for secret in self.secrets_db.get("secrets", []):
            if secret["id"] == secret_id:
                return secret
        return None

    def reset_game(self) -> None:
        """Reset game state for new playthrough"""
        self.game_state = {
            "unlocked_secrets": [],
            "total_secrets": len(self.secrets_db.get("secrets", [])),
            "message_count": 0
        }
        logger.info("Game state has been reset")

    def unlock_secret(self, secret_id: str) -> Optional[Dict[str, Any]]:
        """Manually unlock a specific secret"""
        if secret_id not in self.game_state["unlocked_secrets"]:
            self.game_state["unlocked_secrets"].append(secret_id)
        return self._find_secret_by_id(secret_id)

    def get_hint_for_secret(self, secret_id: str) -> Optional[str]:
        """Get a hint for a specific secret"""
        secret = self._find_secret_by_id(secret_id)
        if secret:
            hints = secret.get("hints", [])
            return hints[0] if hints else "Keep asking the narrator more questions!"
        return None

    def get_current_rank(self) -> str:
        """
        Calculate current rank based on unlocked secrets

        Returns:
            Current difficulty rank (novice, initiate, apprentice, journeyman, adept, expert, sage, master)
        """
        secrets_unlocked = len(self.game_state["unlocked_secrets"])

        if secrets_unlocked >= 7:
            return "master"
        elif secrets_unlocked >= 6:
            return "sage"
        elif secrets_unlocked >= 5:
            return "expert"
        elif secrets_unlocked >= 4:
            return "adept"
        elif secrets_unlocked >= 3:
            return "journeyman"
        elif secrets_unlocked >= 2:
            return "apprentice"
        elif secrets_unlocked >= 1:
            return "initiate"
        else:
            return "novice"

    def get_rank_status(self) -> Dict[str, Any]:
        """
        Get detailed rank status including progress to next rank

        Returns:
            Dictionary with rank info, progress, and icons
        """
        current_rank = self.get_current_rank()
        secrets_unlocked = len(self.game_state["unlocked_secrets"])
        total_secrets = len(self.secrets_db.get("secrets", []))

        rank_info = {
            "novice": {
                "name": "Novice",
                "icon": "🥚",
                "description": "First steps into the mysteries",
                "next_rank": "initiate",
                "secrets_needed": 1,
                "secrets_for_next": max(0, 1 - secrets_unlocked)
            },
            "initiate": {
                "name": "Initiate",
                "icon": "🌱",
                "description": "Beginning to understand the patterns",
                "next_rank": "apprentice",
                "secrets_needed": 2,
                "secrets_for_next": max(0, 2 - secrets_unlocked)
            },
            "apprentice": {
                "name": "Apprentice",
                "icon": "📖",
                "description": "Learning the deeper truths",
                "next_rank": "journeyman",
                "secrets_needed": 3,
                "secrets_for_next": max(0, 3 - secrets_unlocked)
            },
            "journeyman": {
                "name": "Journeyman",
                "icon": "🎯",
                "description": "Skilled in seeking and finding",
                "next_rank": "adept",
                "secrets_needed": 4,
                "secrets_for_next": max(0, 4 - secrets_unlocked)
            },
            "adept": {
                "name": "Adept",
                "icon": "⚔️",
                "description": "Master of information extraction",
                "next_rank": "expert",
                "secrets_needed": 5,
                "secrets_for_next": max(0, 5 - secrets_unlocked)
            },
            "expert": {
                "name": "Expert",
                "icon": "👑",
                "description": "Sees through layers of mystery",
                "next_rank": "sage",
                "secrets_needed": 6,
                "secrets_for_next": max(0, 6 - secrets_unlocked)
            },
            "sage": {
                "name": "Sage",
                "icon": "🧠",
                "description": "Wisdom of the ages flows through",
                "next_rank": "master",
                "secrets_needed": 7,
                "secrets_for_next": max(0, 7 - secrets_unlocked)
            },
            "master": {
                "name": "Master",
                "icon": "✨",
                "description": "All secrets of Aethermoor revealed",
                "next_rank": None,
                "secrets_needed": 7,
                "secrets_for_next": 0
            }
        }

        info = rank_info[current_rank]
        return {
            "currentRank": current_rank,
            "rankName": info["name"],
            "rankIcon": info["icon"],
            "rankDescription": info["description"],
            "totalSecretsUnlocked": secrets_unlocked,
            "totalSecrets": total_secrets,
            "nextRank": info["next_rank"],
            "secretsForNextRank": info["secrets_for_next"],
            "nextRankName": rank_info.get(info["next_rank"], {}).get("name") if info["next_rank"] else "Achieved!"
        }


# Create singleton instance
game_logic_service = GameLogicService()
