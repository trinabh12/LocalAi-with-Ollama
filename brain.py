import ollama
from ollama import ChatResponse
from ollama import chat

class Brain:

    def __init__(self, model="no model selected"):
        self.model = model

    def displayDownloadedModels(self):
        try:
            models_info = ollama.list().models
            models_list = [m.model for m in models_info]
            return models_list

        except Exception as e:
            return f"An error Occurred in displayDownloadedModels(): {e}"


    def setModel(self, model_name):
        try:
            self.model = model_name
            ollama.pull(self.model)
            return self.model

        except Exception as e:
            return f"An error Occurred in setModel(): {e}"

    def displayCurrentModel(self):
        return self.model

    def fetchAnswer(self, user_prompt):
        response: ChatResponse = chat(model=self.model, messages=[
            {
                'role': 'user',
                'content': user_prompt,
            },
        ])
        return response.message.content

