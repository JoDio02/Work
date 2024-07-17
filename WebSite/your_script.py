import sys
import json

if __name__ == "__main__":
    input_data = sys.argv[1]  # Komut satırından alınan girdi
    # İşlem yap (örneğin, sadece girdiyi döndür)
    print(json.dumps({"message": "Girdi alındı!", "input": input_data}))
