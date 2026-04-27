# api/index.py
from fastapi import FastAPI
from playwright.async_api import async_playwright
import os

app = FastAPI()

@app.get("/api/search")
async def search(card: str):
    async with async_playwright() as p:
        # Connect to an external browser to keep the Vercel build tiny
        browser = await p.chromium.connect_over_cdp(
            f"wss://chrome.browserless.io?token={os.getenv('BROWSERLESS_TOKEN')}"
        )
        context = await browser.new_context()
        page = await context.new_page()
        
        # Search Tokopedia
        await page.goto(f"https://www.tokopedia.com/search?q={card}")
        # ... (Insert scraping logic from previous chat here) ...
        
        await browser.close()
        return {"results": [{"name": card, "price": "Rp 1.000.000", "source": "Tokopedia"}]}
