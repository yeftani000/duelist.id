from fastapi import FastAPI
from playwright.async_api import async_playwright
import os
import re

app = FastAPI()
# ... rest of your code

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
async def search(card: str):
    token = os.getenv('BROWSERLESS_TOKEN')
    if not token:
        return {"error": "Browserless token missing in Vercel env vars"}
    # Note: In a real Vercel env, you would use browserless.io token here
    # For this local prototype, we use standard playwright
    async with async_playwright() as p:
        try:
            # DO NOT USE p.chromium.launch() - it will 500
            browser = await p.chromium.connect_over_cdp(
                f"wss://production-sfo.browserless.io?token={token}"
            )
            # ... rest of your code
        except Exception as e:
            return {"error": str(e)} # This helps you see the REAL error in the UI
return {"data": []}
