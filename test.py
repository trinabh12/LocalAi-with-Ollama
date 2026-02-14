from brain import Brain

brain = Brain()
models=brain.displayDownloadedModels()
print(models)

selected_model = str(input("Enter your model of choice: "))

set_model=brain.setModel(selected_model)

print(set_model)

print(brain.fetchAnswer('Hi, answer in one word...'))

'''
from ollama import chat
from ollama import ChatResponse

response: ChatResponse = chat(model='llama3.1', messages=[
  {
    'role': 'user',
    'content': 'Why is the sky blue?',
  },
])
print(response['message']['content'])
# or access fields directly from the response object
print(response.message.content)'''

# extract the actual list of model objects
'''model_list = models.models

# now extract the model names from that list
model_names = [m.model for m in model_list]

print(model_names)'''
