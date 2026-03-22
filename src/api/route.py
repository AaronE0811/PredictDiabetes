from flask import Blueprint,request,jsonify
from src.services.mlService import ml_service

api=Blueprint('api',__name__)

@api.route('/predict',methods=['POST'])
def predict():

    #recibimos los datos del formulario
    data=request.get_json()
    print("datos recibidos:",data)

    if not data:
        return jsonify({'error':'No data provided'}),400
    #llamamos al servicio
    result=ml_service.predict(data)

    if isinstance(result,dict) and 'error' in result:
        return jsonify(result),400

    

    

    return jsonify({
        "message":"success, datos recibidos",
        "prediction":result["prediction"],
        "confidence":result["confidence"]
    }),200