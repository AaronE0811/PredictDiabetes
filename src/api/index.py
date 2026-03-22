from flask import Flask
from flask_cors import CORS

from src.api.route import api 

app = Flask(__name__)
CORS(app)

# Registramos el blueprint
app.register_blueprint(api, url_prefix="/")  


@app.route('/')
def health_check():
    return {"status": "ok", "message": "Flask is running on Vercel"}

if __name__ == "__main__":
    app.run(debug=True)