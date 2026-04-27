from fastapi import FastAPI, Query
from playwright.async_api import async_playwright
import os
import re

app = FastAPI()

def parse_facebook_post(text):
    # NLP logic to extract price and action from messy FB posts
    # Matches: WTS/WTB, Price (jt/rb/k), and removes clutter
    price_pattern = r"(?i)(\\d+[.,]?\\d*)\\s*(jt|rb|k|idr|rp)"
    action_pattern = r"(?i)(WTS|WTB|WTT|WTL)"
    
    price_match = re.search(price_pattern, text)
    action_match = re.search(action_pattern, text)
    
    price = "PM for Price"
    if price_match:
        val, unit = price_match.groups()
        val = val.replace(',', '.')
        if 'jt' in unit.lower(): price = f"Rp {float(val)}.000.000"
        elif 'rb' in unit.lower() or 'k' in unit.lower(): price = f"Rp {float(val)}.000"
        else: price = f"Rp {val}"
        
    action = action_match.group(0).upper() if action_match else "POST"
    return action, price

@app.get("/api/search")
async def search(card: str = Query(..., min_length=3)):
    results = []
    # Note: In a real Vercel env, you would use browserless.io token here
    # For this local prototype, we use standard playwright
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        context = await browser.new_context()
        page = await context.new_page()

        # Simulated Tokopedia Scrape
        results.append({
            "id": "tokopedia-1",
            "source": "Tokopedia",
            "name": f"{card} - Ultra Rare OCG",
            "price": "Rp 450.000",
            "url": "https://tokopedia.com"
        })

        # Simulated FB Parsing (The NLP in action)
        fb_raw_text = f"WTS {card} Rare JP condition NM 1.2jt Jakarta"
        action, price = parse_facebook_post(fb_raw_text)
        results.append({
            "id": "fb-1",
            "source": "Facebook (YDI)",
            "name": f"[{action}] {card} - Community Listing",
            "price": price,
            "url": "https://facebook.com/groups/yugioh.duelist.indonesia"
        })

        await browser.close()
        return {"data": results}
