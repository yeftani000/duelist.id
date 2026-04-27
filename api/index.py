from fastapi import FastAPI, Query
from playwright.async_api import async_playwright
import os

app = FastAPI()

@app.get("/api/search")
async def search(card: str = Query(...)):
    # Standard response for testing
    return {
        "data": [
            {
                "id": "1",
                "source": "Tokopedia",
                "name": f"{card} - Near Mint (OCG)",
                "price": "Rp 850.000",
                "url": f"https://www.tokopedia.com/search?q={card}"
            }
        ]
    }
