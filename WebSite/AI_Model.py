from transformers import pipeline

# Modeli yükle
chatbot = pipeline("text-generation", model="YOUR_MODEL_NAME")

def get_response(user_input):
    response = chatbot(user_input, max_length=50, num_return_sequences=1)
    return response[0]['generated_text']
