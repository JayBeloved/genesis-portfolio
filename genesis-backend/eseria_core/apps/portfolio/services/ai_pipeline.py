import os
import google.generativeai as genai
from decouple import config

class SovereignAIException(Exception):
    pass

async def generate_portfolio_asset(star_data: dict) -> str:
    """
    Ingests S.T.A.R. JSON data, applies the Zenith Architect prompt, 
    and returns authoritative, SEO-ready Markdown via Google Gemini 1.5 Pro.
    """
    api_key = config('API_KEY', default=None)
    if not api_key:
        api_key = os.environ.get('GEMINI_API_KEY')
    
    if not api_key:
        raise SovereignAIException("System Halt: GEMINI_API_KEY missing from environment.")
    
    genai.configure(api_key=api_key)
    
    # Initialize the model - 1.5 Pro is recommended for complex reasoning
    model = genai.GenerativeModel('gemini-2.5-pro')
    
    system_prompt = f"""
        You are the Zenith DevOps Architect for JJL Enterprise. You write with the extreme technical depth, precision, and brutalist authority of a $1B enterprise architect. 

        I am providing you with raw project notes based on the S.T.A.R. framework (Situation, Task, Action, Result). 

        YOUR MANDATE: Transform these notes into a highly structured, professional Executive Case Study in Markdown format.

        CRITICAL CONSTRAINTS (DO NOT VIOLATE):
        1. ZERO HALLUCINATION: You are strictly forbidden from inventing metrics, percentages, revenue amounts, or timelines. If a number is not in the source text, DO NOT make one up.
        2. NO TECHNOLOGY ASSUMPTIONS: Do not list programming languages, frameworks, or cloud providers unless they are explicitly mentioned in the source text.
        3. TONE: Brutalist, concise, and institutional. Eliminate all marketing fluff, adjectives, and hyperbole (e.g., never use words like "thrilled," "amazing," "cutting-edge," or "revolutionized"). Speak in actions, architecture, and outcomes.

        MARKDOWN STRUCTURE REQUIREMENT:
        Use exactly this structure:
        # Executive Summary
        [A 2-sentence synthesis of the problem and the resolution].

        ## The Baseline (Situation)
        [Expand the situation into a clear, analytical problem statement].

        ## Architectural Mandate (Task)
        [Define the exact objective and technical requirements].

        ## The Execution (Action)
        [Detail the steps taken in a highly professional, engineering-focused manner. Use bullet points for specific technical implementations if necessary].

        ## Economic & Systems Impact (Result)
        [State the exact outcomes. Focus on systems stability, revenue protected/generated, or time saved. Strictly use only the data provided].
        """
    
    payload_data = star_data.get('payload_data')
    if payload_data:
        user_prompt = f"RAW S.T.A.R. DATA:\n{payload_data}"
    else:
        user_prompt = f"RAW S.T.A.R. DATA:\nSituation:\n{star_data.get('situation', 'N/A')}\n\nTask:\n{star_data.get('task', 'N/A')}\n\nAction:\n{star_data.get('action', 'N/A')}\n\nResult:\n{star_data.get('result', 'N/A')}"
    
    # We use generate_content_async to comply with Django async view requirements
    try:
        response = await model.generate_content_async([
            {"role": "user", "parts": [system_prompt, user_prompt]}
        ])
        return response.text
    except Exception as e:
        raise SovereignAIException(f"AI Generation Failed: {str(e)}")
