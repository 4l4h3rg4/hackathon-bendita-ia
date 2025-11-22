from app.services.agents import ResearcherAgent, LawyerAgent, CleanerAgent

async def run_clinical_chain(query: str):
    # Initialize Agents
    researcher = ResearcherAgent()
    lawyer = LawyerAgent()
    cleaner = CleanerAgent()

    # Step 1: Research (Gemini 3)
    research_result = await researcher.process(query)

    # Step 2: Legal Verification (DeepSeek 3.1)
    legal_result = await lawyer.process(research_result)

    # Step 3: Cleaning & QA (GPT 5.1)
    final_result = await cleaner.process(legal_result)

    return final_result
