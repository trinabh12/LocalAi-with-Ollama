from flask import Flask, render_template, request, jsonify
from brain import Brain

app = Flask(__name__)
ai_brain = Brain()


@app.route("/")
def home():
    return render_template("chat.html")


@app.route("/api/models", methods=["GET"])
def get_models():

    models_available = ai_brain.displayDownloadedModels()
    return jsonify({"models": models_available})


@app.route("/api/set_model", methods=["POST"])
def set_model():
    data = request.get_json()
    model_name = data.get("model", "")
    if not model_name:
        return jsonify({"status": "error", "message": "No model name provided."})

    result = ai_brain.setModel(model_name)
    status = "success" if result.startswith("✅") else "error"
    return jsonify({"status": status, "message": result})


@app.route("/api/chat", methods=["POST"])
def chat():

    data = request.get_json()
    user_input = data.get("prompt", "")
    response = ai_brain.fetchAnswer(user_input)
    return jsonify({"response": response})


if __name__ == "__main__":
    app.run(debug=True)
