import json

from flask import Flask, request

import openai

app = Flask(__name__)

secrets_file = open("secrets.json", "r")
secrets = json.load(secrets_file)
secrets_file.close()

openai_client = openai.OpenAI(
    api_key=secrets["openai_key"], organization="org-T2pC9M5B4MuRPfEZpg1VTRvk"
)


@app.route("/completion")
def completion():
    print(request.args["prompt"])

    chat_completion = openai_client.chat.completions.create(
        messages=[
            {
                "role": "user",
                "content": request.args["prompt"],
            }
        ],
        model="gpt-3.5-turbo",
    )

    print(chat_completion.choices[0].message.content)

    return str(chat_completion.choices[0].message.content)
