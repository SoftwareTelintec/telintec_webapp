"use client";

import { MySelect } from "@/app/components";
import { useState } from "react";

function SurverysPage() {
  const surveyTypes = [
    { value: "salida", label: "Encuesta de salida" },
    { value: "norma_035_50", label: "Encuesta de norma 035 50" },
    { value: "norma_035_50_plus", label: "Encuesta de norma 035 +50" },
    { value: "clima_laboral", label: "Encuesta de clima laboral" },
    { value: "evaluacion_360", label: "Encuesta de evaluación 360" },
  ];

  const employees = [
    { value: "1", label: "Empleado 1" },
    { value: "2", label: "Empleado 2" },
    { value: "3", label: "Empleado 3" },
  ];
  //changed

  const [selectedSurveyType, setSelectedSurveyType] = useState(surveyTypes[0]);
  const [selectedEmployee, setSelectedEmployee] = useState(employees[0]);

  function handleSurveyTypeChange(selectedOption: {
    value: string;
    label: string;
  }) {
    console.log("Selected Survey Type:", selectedOption.label);
    // Asumiendo que 'setSelectedSurveyType' es tu función de estado
    setSelectedSurveyType(selectedOption);
  }

  function handleEmployeeChange(selectedOption: {
    value: string;
    label: string;
  }) {
    console.log("Selected Employee:", selectedOption.label); //  depuración
    setSelectedEmployee(selectedOption);
  }

  return (
    <>
      <section className="flex flex-col p-10 ml-20 w-full gap-5 2xl:container 2xl:mx-auto">
        <h1 className="text-4xl text-neutral-200">Encuestas</h1>
        <div className=" h-80 border border-neutral-500/50 bg-neutral-800/20 rounded grid grid-cols-3 gap-4 px-4 py-6 justify-center">
          <MySelect
            label="Tipo de encuesta"
            options={surveyTypes}
            value={selectedSurveyType}
            onChange={handleSurveyTypeChange}
            placeholder="Seleccione un tipo de encuesta"
          />
          <MySelect
            label="Empleado a encuestar"
            options={employees}
            value={selectedEmployee}
            onChange={(option) => handleEmployeeChange(option)}
            placeholder="Seleccione un empleado"
          />
          <div className="flex flex-col justify-center ">
            <button className="px-4 py-2 h-auto min-h-10 bg-indigo-400 rounded-md text-neutral-800 font-semibold">
              Crear Encuesta
            </button>
          </div>
        </div>
        {/* <div className="flex flex-row gap-5 w-full">
					<div className="border-neutral-500/50 h-60 w-1/2 bg-neutral-800/20 rounded border" />
					<div className="border-neutral-500/50 h-60 w-1/2 bg-neutral-800/20 rounded border" />
				</div> */}
      </section>
    </>
  );
}

export default SurverysPage;
