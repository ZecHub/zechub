"""
Configuration module for BananaBetting application.
"""

import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()


class Settings:
    # TODO: Auto-shielding configuration (for future implementation)
    
    """Application settings loaded from environment variables."""
    
    # Zcash Addresses
    POOL_ZCASH_ADDRESS: str = os.getenv("POOL_ZCASH_ADDRESS", "ztestsapling1pool123456789abcdefghijklmnopqrstuvwxyz")
    HOUSE_ZCASH_ADDRESS: str = os.getenv("HOUSE_ZCASH_ADDRESS", "ztestsapling1house123456789abcdefghijklmnopqrstuvwxyz")
    
    @classmethod
    def get_pool_address(cls) -> str:
        return cls.POOL_ZCASH_ADDRESS
    
    @classmethod 
    def get_house_address(cls) -> str:
        return cls.HOUSE_ZCASH_ADDRESS
    
    @classmethod
    def get_config_summary(cls) -> dict:
        """Get a summary of current configuration."""
        return {
            "pool_address": cls.POOL_ZCASH_ADDRESS[:20] + "..." if len(cls.POOL_ZCASH_ADDRESS) > 20 else cls.POOL_ZCASH_ADDRESS,
            "house_address": cls.HOUSE_ZCASH_ADDRESS[:20] + "..." if len(cls.HOUSE_ZCASH_ADDRESS) > 20 else cls.HOUSE_ZCASH_ADDRESS,
        }


# Global settings instance
settings = Settings()
