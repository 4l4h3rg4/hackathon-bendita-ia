import asyncio
import os
from typing import Dict, Any
from app import data

class FlashResearchService:
    def __init__(self):
        self.model = "Gemini 3 (Flash Mode)"
        self.api_key = os.getenv("GEMINI_API_KEY")

    async def search_internal_rag(self, query: str) -> Dict[str, Any]:
        # Simulate RAG by searching mock evidence
        print(f"[{self.model}] Searching Internal RAG for: {query} (Key: {self.api_key[:4]}...)")
        await asyncio.sleep(0.5) # Fast search
        
        # Simple keyword match mock
        results = []
        if "robotica" in query.lower() or "paralisis" in query.lower():
            results.append(data.MOCK_EVIDENCE)
        
        return {"source": "Internal Knowledge Base", "matches": results}

    async def search_external_web(self, query: str) -> Dict[str, Any]:
        # Simulate Web Search
        print(f"[{self.model}] Searching External Web for: {query}")
        await asyncio.sleep(0.8) # Slightly slower than RAG but still fast
        
        return {
            "source": "Trusted Medical Web",
            "matches": [
                {"title": "Latest Guidelines 2024", "url": "https://med-example.com/guidelines"},
                {"title": "Clinical Trials Summary", "url": "https://clinicaltrials.gov/example"}
            ]
        }

    async def execute(self, query: str) -> Dict[str, Any]:
        # Run searches in parallel for speed
        rag_task = asyncio.create_task(self.search_internal_rag(query))
        web_task = asyncio.create_task(self.search_external_web(query))
        
        rag_result, web_result = await asyncio.gather(rag_task, web_task)
        
        # Synthesize (Mock)
        synthesis = f"Based on internal evidence and rapid web search, standard treatment for '{query}' involves..."
        if rag_result["matches"]:
            synthesis += f" Internal protocols support this (See {rag_result['matches'][0]['id']})."
        
        return {
            "query": query,
            "synthesis": synthesis,
            "sources": {
                "internal": rag_result,
                "external": web_result
            },
            "model_used": self.model,
            "speed": "Ultra-Fast"
        }
