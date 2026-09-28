import os
from functools import lru_cache
from dotenv import load_dotenv

load_dotenv()


@lru_cache
def get_settings():
    return {
        "frontend_url": os.getenv("FRONTEND_URL", "http://localhost:5174"),
    }
