import { useState } from "react";
import { predictDiabetes } from "../services/form";

interface FormData {
  Glucose: number;
  Age: number;
  Insulin: number;
  BMI: number;
}
export const usePredict = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [confidence, setConfidence] = useState<number | null>(null);

  const Prediction = async ({ formData }: { formData: FormData }) => {
    setLoading(true);
    setError(null);

    try {
      const data = await predictDiabetes({ datosForm: formData });
      setResult(data.prediction);
      setConfidence(data.confidence);
    } catch (error) {
      setError("Error al obtener la prediccion");
    } finally {
      setLoading(false);
    }
  };

  return { Prediction, loading, result, error, confidence };
};
