from app.ai.client import client


def parse_intent(message: str):
    """
    Parse the user's message using OpenAI.
    If OpenAI is unavailable (quota, network, etc.),
    return a fallback response for the demo.
    """

    try:
        print("🔵 Calling OpenAI API...")

        prompt = f"""
Extract the following information from the user's message.

Return ONLY valid JSON.

User:
{message}

Output format:

{{
    "intent": "",
    "role": "",
    "vehicle_type": ""
}}
"""

        response = client.chat.completions.create(
            model="gpt-4.1-mini",
            messages=[
                {
                    "role": "user",
                    "content": prompt
                }
            ],
            temperature=0
        )

        print("✅ OpenAI response received successfully.")

        return response.choices[0].message.content

    except Exception as e:
        print("❌ OpenAI API Error:", e)
        print("🟡 Using fallback response...")

        return """
{
    "intent": "OWNERSHIP_TRANSFER",
    "role": "BUYER",
    "vehicle_type": "TWO_WHEELER"
}
"""