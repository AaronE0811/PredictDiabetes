"use client";
import { useState } from "react";
import { MdOutlineWaterDrop } from "react-icons/md";
import { FaRegCalendarAlt } from "react-icons/fa";
import { IoScaleOutline } from "react-icons/io5";
import { LuSyringe } from "react-icons/lu";
import { LuTriangleAlert } from "react-icons/lu";
import { usePredict } from "../hook/usePredict";
import { MdInfoOutline } from "react-icons/md";
import { MdPregnantWoman } from "react-icons/md";

function Datos() {
  const { Prediction, loading, result, error, confidence } = usePredict();
  const [formData, setFormData] = useState({
    Pregnancies: "" as unknown as number,
    Glucose: "" as unknown as number,
    Age: "" as unknown as number,
    Insulin: "" as unknown as number,
    BMI: "" as unknown as number,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: Number(value),
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await Prediction({ formData });
  };

  const getRiskLevel = (score: number) => {
    if (score <= 30)
      return { label: "Low Risk", color: "text-green-600", icon: "✅" };
    if (score <= 60)
      return { label: "Moderate Risk", color: "text-yellow-600", icon: "⚠️" };
    return { label: "High Risk", color: "text-red-600", icon: "🚨" };
  };
  const getState = () => {
    if (formData.Glucose < 70)
      return { label: "Low", color: "text-red-600", icon: "⚠️" };
    if (formData.Glucose >= 101 && formData.Glucose <= 125)
      return { label: "prediabetes", color: "text-yellow-600", icon: "⚠️" };
    if (formData.Glucose >= 126)
      return { label: "diabetes", color: "text-red-600", icon: "🚨" };
    return { label: "Normal", color: "text-green-600", icon: "✅" };
  };
  const getStateInsulin = () => {
    if (formData.Insulin < 15)
      return { label: "Low", color: "text-red-600", icon: "⚠️" };
    if (formData.Insulin >= 161 && formData.Insulin <= 280)
      return { label: "High", color: "text-red-600", icon: "⚠️" };
    if (formData.Insulin >= 280)
      return { label: "very high", color: "text-red-600", icon: "🚨" };
    return { label: "Normal", color: "text-green-600", icon: "✅" };
  };
  const getStateBmi = () => {
    if (formData.BMI < 18.5)
      return { label: "Low weight", color: "text-red-600", icon: "⚠️" };
    if (formData.BMI > 30)
      return { label: "obesity", color: "text-red-600", icon: "⚠️" };
    if (formData.BMI >= 25 && formData.BMI <= 29)
      return { label: "overweight", color: "text-red-600", icon: "⚠️" };
    return { label: "Normal", color: "text-green-600", icon: "✅" };
  };
  return (
    <div className=" w-full lg:w-1/2 bg-[#ffffff] shadow-2xl rounded items-center  p-4 flex justify-center">
      <main className="flex flex-col gap-4 items-center p-4">
        <div className="w-full flex flex-col gap-2 items-center justify-center">
          <h1 className="text-3xl font-bold text-slate-800 flex items-center gap-2">
            <LuTriangleAlert /> Predict Diabetes
          </h1>
          <p className="text-slate-500">
            Enter your biometrics and check your diabetes risk score
          </p>
          <h3 className="text-blue-800 font-bold text-sm uppercase tracking-wide">
            Important: Test Conditions
          </h3>
          <p className="text-blue-700 text-sm mt-1 leading-relaxed ">
            For maximum prediction accuracy, please enter the{" "}
            <strong>Glucose</strong> and <strong>Insulin</strong> values
            obtained <strong>2 hours after</strong> a glucose tolerance test or
            a meal.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex w-full md:w-1/2 lg:w-1/2  flex-wrap gap-4 justify-evenly"
        >
          {/* Card: pregnancy */}
          <div className="w-full shadow-xl md:w-[40%] lg:w-[40%] border rounded p-2 flex flex-col">
            <h2 className="flex gap-2 items-center text-xl font-semibold mb-2">
              <MdPregnantWoman className="text-blue-500" /> Pregnancies
            </h2>
            <label className="text-sm text-slate-600 mb-1" htmlFor="Glucose">
              Pregnancies
            </label>
            <input
              type="number"
              name="Pregnancies"
              id="Pregnancies"
              value={formData.Pregnancies}
              onChange={handleChange}
              placeholder="2"
              required
              className="w-full border rounded p-2"
              min="0"
              max="20"
            />
          </div>

          {/* Card: Glucose */}
          <div className="w-full shadow-xl md:w-[40%] lg:w-[40%] border rounded p-2 flex flex-col">
            <h2 className="flex gap-2 items-center text-xl font-semibold mb-2">
              <MdOutlineWaterDrop className="text-blue-500" /> Glucose
            </h2>
            <label className="text-sm text-slate-600 mb-1" htmlFor="Glucose">
              Glucose level
            </label>
            <input
              type="number"
              name="Glucose"
              id="Glucose"
              value={formData.Glucose}
              onChange={handleChange}
              placeholder="100"
              required
              className="w-full border rounded p-2"
              min="10"
              max="999"
            />
          </div>

          {/* Card: Age*/}
          <div className="w-full shadow-xl md:w-[40%] lg:w-[40%] border rounded p-2">
            <h2 className="flex gap-2 items-center text-xl font-semibold mb-2">
              <FaRegCalendarAlt className="text-blue-500" /> Age
            </h2>
            <label className="text-sm text-slate-600 mb-1" htmlFor="Age">
              Age
            </label>
            <input
              type="number"
              name="Age"
              id="Age"
              value={formData.Age}
              onChange={handleChange}
              placeholder="25"
              required
              className="w-full border rounded p-2"
              min="1"
              max="99"
            />
          </div>

          {/* Card: insuline*/}
          <div className="w-full shadow-xl md:w-[40%] lg:w-[40%] border rounded p-2">
            <h2 className="flex gap-2 items-center text-xl font-semibold mb-2">
              <LuSyringe className="text-blue-500" />
              Insulin
            </h2>
            <label className="text-sm text-slate-600 mb-1" htmlFor="Insulin">
              Insuline level
            </label>
            <input
              type="number"
              name="Insulin"
              id="Insulin"
              value={formData.Insulin}
              onChange={handleChange}
              placeholder="100"
              required
              className="w-full border rounded p-2"
              min="10"
              max="999"
            />
          </div>

          {/* Card: BMI*/}
          <div className="w-full shadow-xl md:w-[40%] lg:w-[40%] border rounded p-2">
            <h2 className="flex gap-2 items-center text-xl font-semibold mb-2">
              <IoScaleOutline className="text-blue-500" /> BMI
            </h2>
            <label className="text-sm text-slate-600 mb-1" htmlFor="BMI">
              BMI
            </label>
            <input
              type="number"
              step="0.1"
              name="BMI"
              id="BMI"
              value={formData.BMI}
              onChange={handleChange}
              placeholder="24.5"
              required
              className="w-full border rounded p-2"
              min="10"
              max="99"
            />
          </div>
          <button
            disabled={loading}
            className="w-full shadow-xl bg-blue-500 hover:bg-blue-600 text-white py-2 rounded"
          >
            {loading ? "Loading..." : "Predict"}
          </button>
        </form>

        {result !== null && (
          <div className="w-full ">
            <div className="Porcentaje shadow mt-4 p-4 rounded-lg text-center border">
              <h2 className="text-xl font-bold mb-2 text-slate-700">
                Analysis Result
              </h2>
              {confidence !== null ? (
                <div className="flex gap-4 items-center justify-center">
                  <h2>Probability of Diabetes</h2>
                  <div className="flex gap-2 items-center">
                    <span>{getRiskLevel(confidence).icon}</span>
                    <p className={`${getRiskLevel(confidence).color}`}>
                      {confidence}% {getRiskLevel(confidence).label}
                    </p>
                  </div>
                </div>
              ) : (
                <p className="text-slate-400 italic">No data analyzed yet</p>
              )}
            </div>
            <div className="metric mt-4 w-full flex items-center justify-center">
              <table className="w-full border-collapse text-left mt-4">
                <thead>
                  <tr className="rounded shadow border-b-2 border-slate-800 bg-slate-50">
                    <th className="p-4 font-bold">Metric</th>
                    <th className="p-4 font-bold">Your Value</th>
                    <th className="p-4 font-bold">Normal Range</th>
                    <th className="p-4 font-bold">State</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {/* Fila Glucosa */}
                  <tr className="hover:bg-slate-50 transition-colors">
                    <td className="p-4 font-medium">Glucose</td>
                    <td className="p-4">{formData.Glucose} mg/dl</td>
                    <td className="p-4 text-slate-500">70 - 100 mg/dl</td>
                    <td className={`p-4 font-bold ${getState().color}`}>
                      <span className="flex items-center gap-2">
                        {getState().icon} {getState().label}
                      </span>
                    </td>
                  </tr>

                  {/* Fila Insulina */}
                  <tr className="hover:bg-slate-50 transition-colors">
                    <td className="p-4 font-medium">Insulin</td>
                    <td className="p-4">{formData.Insulin} mu U/ml</td>
                    <td className="p-4 text-slate-500">16-160 mu U/ml</td>
                    <td className={`p-4 font-bold ${getStateInsulin().color}`}>
                      <span className="flex items-center gap-2">
                        {getStateInsulin().icon} {getStateInsulin().label}
                      </span>
                    </td>
                  </tr>

                  {/* Fila BMI */}
                  <tr className="hover:bg-slate-50 transition-colors">
                    <td className="p-4 font-medium">BMI</td>
                    <td className="p-4">
                      {formData.BMI} kg/m<sup>2</sup>
                    </td>
                    <td className="p-4 text-slate-500">18.5 - 24.9</td>
                    <td className={`p-4 font-bold ${getStateBmi().color}`}>
                      <span className="flex items-center gap-2">
                        {getStateBmi().icon} {getStateBmi().label}
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="mt-4">
              <p className="text-red-600">
                Disclaimer: These results are based on the Pima Indians Diabetes
                dataset. Please consult a doctor for a professional diagnosis.
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
export default Datos;
