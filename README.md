# 🩺 Diabetes Prediction System - Pima Indians Dataset

Este proyecto es una aplicación que utiliza Machine Learning para predecir el riesgo de diabetes. Integra un modelo predictivo optimizado con un backend en Python y una interfaz moderna en Next.js.

## 🚀 Logros Principales
* **Optimización de Precisión**: Incremento del Accuracy del **76% al 82%** mediante técnicas avanzadas de Feature Engineering y limpieza de datos.
* **Manejo de Desbalanceo**: Implementación de **SMOTE** (Synthetic Minority Over-sampling Technique) para equilibrar las clases y mejorar el Recall en pacientes positivos.
* **Arquitectura Full-Stack**: Conexión fluida entre un modelo de ML (`joblib`), una API REST y un cliente React.

## 🧠 Análisis de Datos y Modelo
El modelo se entrenó utilizando el dataset de **Pima Indians Diabetes**. Durante el proceso de ETL, se tomaron decisiones críticas basadas en la correlación estadística:

* **Feature Selection**: Se eliminaron las columnas `BloodPressure`, `SkinThickness` y `DiabetesPedigreeFunction` al identificarlas como fuentes de ruido que afectaban la generalización del modelo.


## 🛠️ Tecnologías Utilizadas

### Data Science & Backend
- **Python**: Lenguaje principal de procesamiento.
- **Scikit-Learn**: Entrenamiento y validación del modelo.
- **Pandas & NumPy**: Manipulación de datos y ETL.
- **Joblib**: Serialización del modelo para producción.
- **Flask/FastAPI**: para servir las predicciones.

### Frontend
- **Next.js / React**: Interfaz de usuario interactiva.
- **Tailwind CSS**: Diseño responsivo y moderno.
- **TypeScript**: Robustez en el manejo de datos del formulario.

url live: https://predict-diabetes-delta.vercel.app/

url backEnd: https://github.com/AaronE0811/backend-PredictDiabetes
