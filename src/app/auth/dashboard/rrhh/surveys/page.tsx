"use client";

import { MySelect } from "@/app/components";
import axios from "axios";
import { useState, useEffect } from "react";

interface Employee {
  id: number;
  name: string;
  //...
}
interface Survey {
  question: string;
  subquestions: string[];
  options: string[];
  answer: number | string;
  type: number;
}
// Para usarlo en un diccionario donde las claves son los números de pregunta como string
interface Surveys {
  [key: string]: Survey;
}

const INITIAL_SURVEY_STATE: Survey = {
  question: "",
  subquestions: [],
  options: [],
  answer: "",
  type: 0,
};

const INITIAL_EMPLOYEE_STATE: Employee = {
  id: 0,
  name: "",
};
function SurverysPage() {
  const [data, setData] = useState<Survey[]>([]);
  const [employeesSurve, setEmployeesSurve] = useState<Employee[]>([]);
  const [survey, setSurvey] = useState<Survey>(INITIAL_SURVEY_STATE);
  const [error, setError] = useState<string | null>(null);
  const [res, setRes] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState<{
    value: string;
    label: string;
  } | null>(null);
  const [showSurveys, setShowSurveys] = useState(false);

  const surveyTypes = [
    { value: "0", label: "Encuesta de salida" },
    { value: "1", label: "Encuesta de norma 035 50" },
    { value: "2", label: "Encuesta de norma 035 +50" },
    { value: "3", label: "Encuesta de clima laboral" },
    { value: "4", label: "Encuesta de evaluación 360" },
  ];
  //fetching
  const getAllSurveyTypes = async (value: number | null = null) => {
    const response = await fetch(
      `http://localhost:5000/GUI/api/v1/rrhh/download/quizz?tipo=${value}`
    );
    const data = await response.json();
    console.log(data);
    return data;
  };

  const getAllEmployees = async () => {
    await axios
      .get("http://localhost:5000/GUI/api/v1/rrhh/employees/info")
      .then((response) => {
        console.log(response.data);
        setEmployeesSurve(response.data as Employee[]);
      })
      .catch((error) => {
        setError(error);
      });
  };

  const employeeOptions = employeesSurve.map((employee: Employee) => ({
    value: employee.id.toString(),
    label: employee.name,
  }));

  const employees = [
    { value: "1", label: "Empleado 1" },
    { value: "2", label: "Empleado 2" },
    { value: "3", label: "Empleado 3" },
  ];
  //changed

  const [selectedSurveyType, setSelectedSurveyType] = useState(surveyTypes[0]);

  function handleSurveyTypeChange(selectedOption: {
    value: string;
    label: string;
  }) {
    console.log("Selected Survey Type:", selectedOption.label);

    setSelectedSurveyType(selectedOption);
  }

  const handleEmployeeChange = (e: any) => {
    const newEmployeeId = e.target.value; // Obtener el valor seleccionado del evento
    const newEmployee = employeesSurve.find(
      (emp) => emp.id.toString() === newEmployeeId
    );
    if (newEmployee) {
      setSelectedEmployee({
        value: newEmployee.id.toString(),
        label: newEmployee.name,
      });
    }
  };

  const handleCreateSurvey = async () => {
    setShowSurveys(true); // Asegúrate de que las encuestas se mostrarán
    try {
      const loadedData = await getAllSurveyTypes(); // Suponiendo que esta función devuelve las encuestas deseadas
      setData(loadedData); // Actualiza el estado con las encuestas cargadas
    } catch (error) {
      //console.log("Failed to load surveys:", error);
      setError(error);
    }
  };

  useEffect(() => {
    if (showSurveys) {
      console.log("Mostrando encuestas...");
    }
  }, [showSurveys]);

  useEffect(() => {
    getAllEmployees();
    getAllSurveyTypes();
  }, []);

  useEffect(() => {
    if (employeesSurve.length > 0) {
      setSelectedEmployee({
        value: employeesSurve[0].id.toString(),
        label: employeesSurve[0].name,
      });
    }
  }, [employeesSurve]);

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
            options={employeeOptions ? employeeOptions : []}
            value={
              selectedEmployee ?? { value: "", label: "Seleccione un empleado" }
            }
            onChange={(e) => handleEmployeeChange(e)}
            placeholder="Seleccione un empleado"
          />
          <div className="flex flex-col justify-center ">
            <button
              className="px-4 py-2 h-auto min-h-10 bg-indigo-400 rounded-md text-neutral-800 font-semibold"
              onClick={handleCreateSurvey}
            >
              Crear Encuesta
            </button>
          </div>
        </div>

        {/* quizz map */}

        <section className="flex flex-col p-10 ml-20 w-full gap-5 2xl:container 2xl:mx-auto">
          {data.map((pregunta: Survey, preguntaIndex: number) => (
            <section key={preguntaIndex} className="survey-question">
              <h2>{pregunta.question}</h2>
              {pregunta.subquestions.length > 0 && (
                <ul>
                  {pregunta.subquestions.map(
                    (subquestion: string, subIndex: number) => (
                      <li key={subIndex}>{subquestion}</li>
                    )
                  )}
                </ul>
              )}
              <div>
                {pregunta.options.map((option: string, optionIndex: number) => (
                  <div key={optionIndex}>
                    <input
                      type="radio"
                      name={`question${preguntaIndex}`}
                      id={`option${optionIndex}`}
                    />
                    <label htmlFor={`option${optionIndex}`}>{option}</label>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </section>
        {/* <div className="flex flex-row gap-5 w-full">
					<div className="border-neutral-500/50 h-60 w-1/2 bg-neutral-800/20 rounded border" />
					<div className="border-neutral-500/50 h-60 w-1/2 bg-neutral-800/20 rounded border" />
				</div> */}
      </section>
    </>
  );
}

export default SurverysPage;
