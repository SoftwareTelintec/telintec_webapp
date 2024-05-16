"use client";

import { CalendarSelector, MySelect, TextInput } from "@/app/components";
import { useEffect, useState } from "react";
import { ActionMeta } from "react-select";
import axios from "axios";
import DataTable from "react-data-table-component";

const columns = [
  {
    name: "ID Examen",
    selector: (row: any) => row.id_exam,
    width: "100px",
  },
  {
    name: "Nombre",
    selector: (row: any) => row.name,
    sortable: true,
  },
  {
    name: "Tipo de Sangre",
    selector: (row: any) => row.blood,
  },
  {
    name: "Estatus",
    selector: (row: any) => row.status,
    sortable: true,
  },
  {
    name: "Aptitudes",
    selector: (row: any) => row.aptitudes,
  },
  {
    name: "Fechas",
    selector: (row: any) => row.dates,
  },
  {
    name: "ID Empleado",
    selector: (row: any) => row.emp_id,
  },
];

interface ExaMedical {
  id_exam: number;
  name: string;
  blood: string;
  status: string;
  aptitudes: string;
  dates: string;
  emp_id: number;
}
interface Option {
  value: string;
  label: string;
}

const bloodTypeOptions = [
  { value: "A+", label: "A+" },
  { value: "B+", label: "B+" },
  { value: "O+", label: "O+" },
  { value: "AB+", label: "AB+" },
];

const stateOptions = [
  { value: "activo", label: "Activo" },
  { value: "inactivo", label: "Inactivo" },
];

const aptitudeOptions = [
  { value: "1", label: "1" },
  { value: "2", label: "2" },
];

const INITIAL_EXAMEDICAL: ExaMedical = {
  id_exam: 0,
  name: "",
  blood: "",
  status: "",
  aptitudes: "",
  dates: "",
  emp_id: 0,
};

function MedicalPage() {
  const [examedicals, setExaMedicals] = useState<ExaMedical[]>();
  const [examedical, setExaMedical] = useState<ExaMedical>(INITIAL_EXAMEDICAL);
  const [error, setError] = useState("");
  const [showTable, setShowTable] = useState(false);
  const [loading, setLoading] = useState(false);

  const [selectedBloodType, setSelectedBloodType] = useState(
    bloodTypeOptions[0]
  );
  const [selectedState, setSelectedState] = useState(stateOptions[0]);
  const [selectedAptitude, setSelectedAptitude] = useState(aptitudeOptions[0]);

  function handleBloodTypeChange(option: Option) {
    setSelectedBloodType(option);
  }

  function handleStateChange(option: Option) {
    setSelectedState(option);
  }

  function handleAptitudeChange(option: Option) {
    setSelectedAptitude(option);
  }

  function handleSelectChange(
    option: Option | null,
    actionMeta: ActionMeta<Option>
  ): void {
    console.log("Action type:", actionMeta.action);
    if (option) {
      console.log("Selected option:", option);
    } else {
      console.log("No option selected");
    }
  }

  const getAllExaMedical = async () => {
    await axios
      .get("http://localhost:5000/GUI/api/v1/rrhh/employees/medical/all")
      .then((res) => {
        setExaMedicals(res.data);
      })
      .catch((err) => {
        setError(err);
      });
  };

  const hadleShowTable = () => {
    setShowTable(!showTable);
  };

  const handleSelectedRow = (row: any) => {
    const { id_exam, name, blood, status, aptitudes, dates, emp_id } = row;
    setExaMedical({
      id_exam,
      name,
      blood,
      status,
      aptitudes,
      dates,
      emp_id,
    });
  };

  // HTTP request
  const postNewExaMedical = async () => {
    const data = {
      info: {},
      //id: 0,
    };
    await axios("http://localhost:5000/GUI/api/v1/", {
      method: "POST",
      data,
    })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        setError(err);
      });
  };
  const updateExaMedical = async () => {
    const data = {
      info: {},
      //id: 0,
    };
    await axios("http://localhost:5000/GUI/api/v1/", {
      method: "POST",
      data,
    })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        setError(err);
      });
  };

  const deleteExaMedical = async () => {
    const data = {
      info: {},
      //id: 0,
    };
    await axios("http://localhost:5000/GUI/api/v1/", {
      method: "DELETE",
      data,
    })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        setError(err);
      });
  };

  useEffect(() => {
    getAllExaMedical();
  }, []);

  return (
    <>
      <section className="flex flex-col p-10 ml-20 w-full gap-5 2xl:container 2xl:mx-auto">
        <h1 className="text-4xl text-neutral-200">Examenes Medicos</h1>
        <div className="w-full h-80 border border-neutral-500/50 bg-neutral-800/20 rounded grid grid-cols-3 gap-4 px-4 py-6">
          <CalendarSelector label="fecha" />
          <TextInput label="ID Empleado" />
          <div className="flex flex-col justify-end">
            <button className="px-4 py-2  bg-indigo-400 rounded-md text-neutral-800 font-semibold ">
              Buscar Id
            </button>
          </div>

          <TextInput label="Nombre" />
          <MySelect
            label="Tipo de Sangre"
            options={bloodTypeOptions}
            value={selectedBloodType}
            onChange={setSelectedBloodType}
            placeholder="Selecciona un tipo de sangre"
          />
          <MySelect
            label="Estado"
            options={stateOptions}
            value={selectedState}
            onChange={setSelectedState}
            placeholder="Selecciona un estado"
          />
          <MySelect
            label="Aptitud"
            options={aptitudeOptions}
            value={selectedAptitude}
            onChange={setSelectedAptitude}
            placeholder="Selecciona una aptitud"
          />
        </div>

        <div className="flex flex-row gap-5 w-full">
          <div className="flex flex-row gap-5 w-full">
            <div className="w-full flex gap-4 items-center justify-around px-4 py-6">
              <button className="px-4 py-2 bg-indigo-400rounded-md text-neutral-800 font-semibold tracking-wider">
                Limpiar Campos
              </button>
              <button className="px-4 py-2 bg-indigo-400 rounded-md text-neutral-800 font-semibold tracking-wider">
                Agregar Examen
              </button>
              <button className="px-4 py-2 bg-indigo-400 rounded-md text-neutral-800 font-semibold tracking-wider">
                Actualizar Examen
              </button>
              <button className="px-4 py-2 bg-[#cecece] rounded-md text-red-500 border border-red-500 font-semibold tracking-wider">
                Eliminar Examen
              </button>
              <button
                className="px-4 py-2 bg-indigo-400 rounded-md text-neutral-800 font-semibold tracking-wider"
                onClick={hadleShowTable}
              >
                Ver Tabla
              </button>
            </div>
          </div>
        </div>
        {showTable && (
          <DataTable
            columns={columns}
            data={examedicals?.data}
            onRowDoubleClicked={(row) => handleSelectedRow(row)}
            pagination
            paginationPerPage={10}
            progressPending={loading}
          />
        )}
      </section>
    </>
  );
}

export default MedicalPage;
