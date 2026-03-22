interface FormData {
  Pregnancies: number;
  Glucose: number;
  Age: number;
  Insulin: number;
  BMI: number;
}
const api_url = "https://predict-diabetes-phi.vercel.app/api/predict";

export const predictDiabetes = async ({
  datosForm,
}: {
  datosForm: FormData;
}) => {
  try {
    const response = await fetch(api_url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ datosForm }),
    });
    if (!response.ok) throw new Error("Error al hacer la solicitud");
    return await response.json();
  } catch (error) {
    console.log("Error al obtener prediccion", error);
  }
};
