from flask import Flask, request, jsonify
from flask_cors import CORS
from transformers import pipeline  # Pipeline kullanıyoruz

app = Flask(__name__)
CORS(app)

# Model ve tokenizer'ı yükle
model_name = r"C:\Users\STJ\Desktop\final_model_and_tokenizer"  # Model dizinini buraya ekleyin
generator = pipeline('text-generation', model=model_name, tokenizer=model_name)

@app.route('/run', methods=['POST'])
def run_script():
    data = request.get_json()
    user_input = data.get('input')

    # Model ile tahmin yapma
    outputs = generator(user_input, max_length=50, num_return_sequences=1, no_repeat_ngram_size=2)

    # Çıktıyı elde etme
    output_text = outputs[0]['generated_text']
    
    # Konsola yazdırma
    print("User Input:", user_input)
    print("Generated Output:", output_text)

    # Yanıtı döndürme
    response_message = {"message": "Tahmin yapıldı!!!!!!!!!!!", "output": output_text}
    
    return jsonify(response_message)


if __name__ == '__main__':
    app.run(debug=True)
