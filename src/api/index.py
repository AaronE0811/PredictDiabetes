from flask import Flask
from flask_cors import CORS
from src.api.route import api

app = Flask(__name__)
CORS(app)

app.register_blueprint(api)

@app.route("/")
def home():
    return {"message": "API funcionando"}

if __name__ == "__main__":
    app.run(debug=True)