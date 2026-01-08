from pydantic_settings import BaseSettings
from functools import lru_cache


class Settings(BaseSettings):
    """Application settings loaded from environment variables."""

    # API Keys
    anthropic_api_key: str

    # Claude Configuration
    claude_model: str = "claude-3-5-haiku-latest"
    claude_max_tokens: int = 1024

    # CORS
    cors_origins: list[str] = ["http://localhost:4321", "https://noah-kellner.de"]

    # App
    debug: bool = False

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"


@lru_cache
def get_settings() -> Settings:
    """Get cached settings instance."""
    return Settings()
