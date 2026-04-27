from fastapi import FastAPI, Query
import os
import json
import websockets

app = FastAPI()

@app.get("/api/search")
async def search(card: str = Query(...)):
    token = os.getenv("BROWSERLESS_TOKEN")
    
    # Static fallback for testing
    results = [{
        "id": "1",
        "source": "Tokopedia",
        "name": f"{card} - Near Mint",
        "price": "Rp 750.000",
        "url": f"https://www.tokopedia.com/search?q={card}"
    }]

    # If you have the token, this connects to the browser via WebSocket
    if token:
        try:
            # You can send Playwright-style commands over this WS connection
            ws_url = f"wss://production-sfo.browserless.io?token={token}"
            # Logic for remote execution goes here
            pass
        except Exception as e:
            print(f"Browserless Error: {e}")

    return {"data": results}
