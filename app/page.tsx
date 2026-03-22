import Image from "next/image";
import Datos from "./components/diabetesForm";

export default function Home() {
  return (
    <div className="w-full flex justify-center items-center mt-20">
      <Datos />
    </div>
  );
}
