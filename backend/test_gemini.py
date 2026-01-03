import google.generativeai as genai
import os
from dotenv import load_dotenv
from pathlib import Path

env_path = Path(__file__).parent / '.env'
load_dotenv(dotenv_path=env_path)

api_key = os.getenv("GEMINI_API_KEY")
if not api_key:
    print("GEMINI_API_KEY not found")
    exit(1)

genai.configure(api_key=api_key)

try:
    model = genai.GenerativeModel("gemini-1.5-flash")
    response = model.generate_content("Hello, can you hear me?")
    print(f"Success! Response: {response.text}")
except Exception as e:
    print(f"Error with gemini-1.5-flash: {e}")
    try:
        print("Trying gemini-pro...")
        model = genai.GenerativeModel("gemini-pro")
        response = model.generate_content("Hello?")
        print(f"Success with gemini-pro: {response.text}")
    except Exception as e2:
        print(f"Error with gemini-pro: {e2}")
