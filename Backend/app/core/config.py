# app/core/config.py
from pydantic_settings import BaseSettings
from pydantic import Field
from dotenv import load_dotenv
import os
from pathlib import Path

env_path = Path(__file__).parent.parent.parent / ".env"
load_dotenv(dotenv_path=env_path, override=True)


class Settings(BaseSettings):
    # Project metadata
    PROJECT_NAME: str = Field("PDF AI Tagger", env="PROJECT_NAME")
    VERSION: str = Field("0.1.0", env="VERSION")
    PROJECT_DESCRIPTION: str = Field(
        "FastAPI service for AI-based PDF tagging", env="PROJECT_DESCRIPTION"
    )

    # OpenAI / LLM settings
    OPENAI_API_KEY: str = Field(..., env="OPENAI_API_KEY")
    LLM_MODEL_NAME: str = Field("gpt-4o-mini", env="LLM_MODEL_NAME")
    LLM_TEMPERATURE: float = Field(0.0, env="LLM_TEMPERATURE")

    # class Config:
    #     env_file = env_path
    #     env_file_encoding = "utf-8"

# instantiate a global settings object
settings = Settings()
