from fastapi import FastAPI
from pydantic import BaseModel
from typing import List

app = FastAPI()

class PriceResult(BaseModel):
    store: str
    card_name: str
    price: int
    link: str
    image: str

@app.get("/api/search")
async def search_cards(q: str):
    # This is where your scraping logic goes
    # For now, here is a mock response to test the frontend
    results = [
        {
            "store": "Tokopedia",
            "card_name": f"{q} (Starlight Rare)",
            "price": 2500000,
            "link": "https://tokopedia.com",
            "image": "https://limitlesstcg.s3.us-east-2.amazonaws.com/yugioh/cards/placeholder.png"
        },
        {
            "store": "Shopee",
            "card_name": f"{q} (Ultra Rare)",
            "price": 150000,
            "link": "https://shopee.co.id",
            "image": "https://limitlesstcg.s3.us-east-2.amazonaws.com/yugioh/cards/placeholder.png"
        }
    ]
    return results
