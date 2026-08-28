from app.ai.client import client


def parse_intent(message: str):
    try:
        prompt = f"""
Extract the following information from the user's message.

Return ONLY valid JSON.

User:
{message}

Format:
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

        return response.choices[0].message.content

    except Exception:
        # Fallback for demo
        return """
{
    "intent":"OWNERSHIP_TRANSFER",
    "role":"BUYER",
    "vehicle_type":"TWO_WHEELER"
}
"""