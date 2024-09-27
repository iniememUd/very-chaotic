from flask import Flask, jsonify, request
from flask_cors import CORS
import json

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Load episodes from a JSON file (simulated database)
with open('episodes.json') as f:
    episodes = json.load(f)

# Route to get all episodes
@app.route('/api/episodes', methods=['GET'])
def get_episodes():
    return jsonify(episodes)

# Route to submit a contact form (you can modify this to send emails, etc.)
@app.route('/api/contact', methods=['POST'])
def contact():
    data = request.get_json()
    name = data.get('name')
    email = data.get('email')
    message = data.get('message')
    print(f"Contact form submitted by {name} ({email}): {message}")
    return jsonify({"message": "Contact form submitted successfully!"})

if __name__ == '__main__':
    app.run(debug=True)
