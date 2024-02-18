import json

from flask import Flask, request, jsonify

import openai

app = Flask(__name__)

secrets_file = open("secrets.json", "r")
secrets = json.load(secrets_file)
secrets_file.close()

openai_client = openai.OpenAI(
    api_key=secrets["openai_key"], organization="org-fXbeRxZE1jTnRoBcOv8ja3EI"
)

@app.after_request
def cors(response):
    response.headers["Access-Control-Allow-Origin"] = "*"
    return response

@app.route("/completion")
def completion():
    prompt = request.args.get("prompt", "")  # Safely get the prompt with a default value
    if not prompt:
        return jsonify({"error": "Prompt is required"}), 400

    try:
        chat_completion = openai_client.chat.completions.create(
            messages=[
                {
                    "role": "user",
                    "content": request.args["prompt"],
                }
            ],
            model="gpt-3.5-turbo",
        )
        # Assuming chat_completion structure is correct and contains the expected fields
        completion_text = chat_completion.choices[0].message.content
        print(completion_text)

        return jsonify({"completion": completion_text})
    except Exception as e:
        print(e)
        return jsonify({"error": "Failed to generate completion"}), 500

if __name__ == "__main__":
    app.run(debug=True)
