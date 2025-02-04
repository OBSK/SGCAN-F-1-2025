from flask import Flask, request, jsonify
from email_service import send_email

app = Flask(__name__)

@app.route('/send-email', methods=['POST'])
def send_email_api():
    data = request.get_json()
    if 'email' not in data:
        return jsonify({"status": "error", "message": "Falta el correo electrónico"}), 400
    
    email = data['email']
    
    result = send_email(email)
    
    return jsonify(result)

if __name__ == '__main__':
    app.run(debug=True)