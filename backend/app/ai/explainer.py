from app.ai.client import client


def explain_status(status, action):
    try:
        prompt = f"""
Explain this application status in simple English.

Status:
{status}

Action:
{action}

Keep it under 80 words.
"""

        response = client.chat.completions.create(
            model="gpt-4.1-mini",
            messages=[
                {
                    "role": "user",
                    "content": prompt
                }
            ]
        )

        return response.choices[0].message.content

    except Exception:
        return (
            f"Your application is currently '{status}'. "
            f"The next recommended action is '{action}'. "
            "Please follow this step to continue your application."
        )