#cargar modelo entrenado
import joblib
import os
import numpy as np

class MLService:
    def __init__(self):

        BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
        self.model_path = os.path.join(BASE_DIR, 'modeloEntrenado', 'modeloEntrenado.joblib')

        try:
            self.model=joblib.load(self.model_path)
        except Exception as e:
            print(f"Error al cargar el modelo: {e}")
            self.model=None

    def predict(self,data):
        if self.model is None:
            return {"error":"Modelo no cargado"}
        
        try:
            inner_data=data["datosForm"]
            features=[
                float(inner_data['Pregnancies']),
                float(inner_data['Glucose']),
                float(inner_data['Insulin']),
                float(inner_data['BMI']),
                float(inner_data['Age'])
            ]

            input_data=np.array([features])

            #prediccion

            prediction=self.model.predict(input_data)

            probabilidad=self.model.predict_proba(input_data)[0]
            confidence=float(probabilidad[1])*100

            return {
                "prediction":int(prediction[0]),
                "confidence":round(confidence,2)
            }
        except KeyError as e:
            return {"error": f"Falta el campo: {str(e)}"}
        except Exception as e:
            return {"error": str(e)}
        
ml_service=MLService()

        
