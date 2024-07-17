from flask import Flask, request, jsonify
import subprocess
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/run', methods=['POST'])
def run_script():
    data = request.get_json()
    user_input = data.get('input')

    # Python dosyasını çalıştır
    result = subprocess.run(['python', 'your_script.py', user_input], capture_output=True, text=True)
    output = result.stdout.strip()  # Çıktıyı temizle

    return jsonify({"output": output})

if __name__ == '__main__':
    app.run(debug=True)
