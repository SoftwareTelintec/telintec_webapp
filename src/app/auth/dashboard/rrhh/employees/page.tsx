"use client";

import { CalendarSelector, TextInput } from "@/app/components";
import axios from "axios";
import debounce from "lodash.debounce";
import { useCallback, useEffect, useState } from "react";
import DataTable from "react-data-table-component";

const columns = [
  {
    name: "ID",
    selector: (row: any) => row.id,
    width: "100px",
  },
  {
    name: "Nombre",
    selector: (row: any) => row.name,
    sortable: true,
  },
  {
    name: "Telefono",
    selector: (row: any) => row.phone,
  },
  {
    name: "Departamento",
    selector: (row: any) => row.dep,
    sortable: true,
  },
  {
    name: "Modalidad",
    selector: (row: any) => row.modality,
    sortable: true,
    width: "100px",
  },
  {
    name: "Email",
    selector: (row: any) => row.email,
  },
  {
    name: "Contrato",
    selector: (row: any) => row.contract,
    sortable: true,
  },
  {
    name: "Admision",
    selector: (row: any) => row.admission,
  },
  {
    name: "RFC",
    selector: (row: any) => row.rfc,
    width: "100px",
  },
  {
    name: "CURP",
    selector: (row: any) => row.curp,
    width: "100px",
  },
  {
    name: "NSS",
    selector: (row: any) => row.nss,
    width: "100px",
  },
  {
    name: "Emergencia",
    selector: (row: any) => row.emergency,
  },
  {
    name: "Puesto",
    selector: (row: any) => row.position,
    sortable: true,
  },
  {
    name: "Estatus",
    selector: (row: any) => row.status,
    sortable: true,
    width: "100px",
  },
  {
    name: "Baja",
    selector: (row: any) => row.departure,
  },
  {
    name: "Examen",
    selector: (row: any) => row.exam_id,
  },
  {
    name: "Cumpleaños",
    selector: (row: any) => row.birthday,
    sortable: true,
  },
  {
    name: "Legajo",
    selector: (row: any) => row.legajo,
  },
];

interface Employee {
  id: number;
  name: string;
  phone: string;
  dep: string;
  modality: string;
  email: string;
  contract: string;
  admission: string;
  rfc: string;
  curp: string;
  nss: string;
  emergency: string;
  position: string;
  status: string;
  departure: string;
  exam_id: number;
  birthday: string;
  legajo: null;
}

const INITIAL_EMPLOYEE: Employee = {
  id: 0,
  name: "",
  phone: "",
  dep: "",
  modality: "",
  email: "",
  contract: "",
  admission: "",
  rfc: "",
  curp: "",
  nss: "",
  emergency: "",
  position: "",
  status: "",
  departure: "",
  exam_id: 0,
  birthday: "",
  legajo: null,
};

function EmployeesPage() {
  const [employee, setEmployee] = useState<Employee>(INITIAL_EMPLOYEE);
  const [employees, setEmployees] = useState<Array<Employee>>();
  const [error, setError] = useState("");
  const [showTable, setShowTable] = useState(false);
  const [loading, setLoading] = useState(false);

  const getAllEmployees = async () => {
    await axios
      .get("http://localhost:5000/GUI/api/v1/rrhh/employees/info/all")
      .then((res) => {
        setEmployees(res.data);
      })
      .catch((err) => {
        setError(err);
      });
  };

  const hadleShowTable = () => {
    setShowTable(!showTable);
  };

  const handleSelectedRow = (row: any) => {
    const {
      id,
      name,
      phone,
      dep,
      modality,
      email,
      contract,
      admission,
      rfc,
      curp,
      nss,
      emergency,
      position,
      status,
      departure,
      exam_id,
      birthday,
      legajo,
    } = row;
    setEmployee({
      id,
      name,
      phone,
      dep,
      modality,
      email,
      contract,
      admission,
      rfc,
      curp,
      nss,
      emergency,
      position,
      status,
      departure,
      exam_id,
      birthday,
      legajo,
    });
  };

  //Debounce:reduces the number of times a function is executed
  const debouncedHandleInputChange = useCallback(
    debounce((name, value) => {
      setEmployee((prev): any => ({
        ...prev,
        [name]: value,
      }));
    }, 300),
    []
  );
  //listens for changes and avoids excessive use of unnecessary API calls or state updates.
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    debouncedHandleInputChange(name, value);
  };

  // http request
  //  NewEmployee
  const postNewEmployee = async () => {
    const employeeData = {
      info: {
        id: 0,
        name: String(employee.name),
        phone: String(employee.phone),
        dep: String(employee.dep),
        modality: String(employee.modality),
        email: String(employee.email),
        contract: String(employee.contract),
        admission: String(employee.admission),
        rfc: String(employee.rfc),
        curp: String(employee.curp),
        nss: String(employee.nss),
        emergency: String(employee.emergency),
        position: String(employee.position),
        status: String(employee.status),
        departure: String(employee.departure),
        exam_id: Number(employee.exam_id),
        birthday: String(employee.birthday),
        legajo: employee.legajo ? Number(employee.legajo) : null,
      },
      id: 0,
    };

    await axios("http://localhost:5000/api/employee", {
      method: "POST",
      data: employeeData,
    })
      .then((res) => {
        console.log("Empleado creado con éxito:", res.data);
      })
      .catch((err) => {
        console.error("Error al crear el empleado:", err);
      });
  };

  //   update Empeloyee
  const updateEmployee = async () => {
    const data = {
      info: {
        id: Number(employee.id),
        name: String(employee.name),
        phone: String(employee.phone),
        dep: String(employee.dep),
        modality: String(employee.modality),
        email: String(employee.email),
        contract: String(employee.contract),
        admission: String(employee.admission),
        rfc: String(employee.rfc),
        curp: String(employee.curp),
        nss: String(employee.nss),
        emergency: String(employee.emergency),
        position: String(employee.position),
        status: String(employee.status),
        departure: String(employee.departure),
        exam_id: Number(employee.exam_id),
        birthday: String(employee.birthday),
        legajo: employee.legajo ? Number(employee.legajo) : null,
      },
      id: Number(employee.id), // employee to update.
    };

    await axios("http://localhost:5000/api/employee", {
      method: "PUT",
      data,
    })
      .then((res) => {
        console.log("Empleado actualizado con éxito:", res.data);
      })
      .catch((err) => {
        console.error("Error al actualizar el empleado:", err);
      });
  };

  // delete employee
  const deleteEmployee = async () => {
    const data = {
      id: employee.id,
    };

    await axios("http://localhost:5000/api/employee", {
      method: "DELETE",
      data,
    })
      .then((res) => {
        console.log("Empleado eliminado con éxito:", res.data);
      })
      .catch((err) => {
        console.error("Error al eliminar el empleado:", err);
      });
  };

  useEffect(() => {
    getAllEmployees();
    setTimeout(() => {
      setLoading(false);
    }, 300);
  }, []);

  return (
    <>
      <section className="flex flex-col p-10 ml-20 w-full gap-5 2xl:container 2xl:mx-auto">
        <h2 className="text-4xl text-neutral-200 font-semibold tracking-wide">
          Empleados
        </h2>
        <div className="w-full h-auto border border-neutral-500/50 bg-neutral-800/20 rounded grid grid-cols-4 gap-4 px-4 py-6">
          <div className="col-span-2">
            <TextInput
              label="Nombre"
              placeholder="Ingresa el nombre"
              onChange={(e) => handleInputChange(e)}
              defaultValue={employee?.name ? String(employee.name) : ""}
            />
          </div>
          <TextInput
            label="Telefono"
            placeholder="Ingresa el telefono"
            onChange={(e) => handleInputChange(e)}
            defaultValue={employee?.phone ? String(employee.phone) : ""}
          />
          <TextInput
            label="Departamento"
            placeholder="Ingresa el departamento"
            onChange={(e) => handleInputChange(e)}
            defaultValue={employee?.dep ? String(employee.dep) : ""}
          />
          <TextInput
            label="Modalidad"
            placeholder="Ingresa la modalidad"
            onChange={(e) => handleInputChange(e)}
            defaultValue={employee?.modality ? String(employee.modality) : ""}
          />
          <TextInput
            label="Email Personal"
            placeholder="Ingresa el NSS"
            onChange={(e) => handleInputChange(e)}
            defaultValue={employee?.email ? String(employee.email) : ""}
          />
          <TextInput
            label="Contrato"
            placeholder="Ingresa el contrato"
            onChange={(e) => handleInputChange(e)}
            defaultValue={employee?.contract ? String(employee.contract) : ""}
          />
          <CalendarSelector
            label="Fecha de Ingreso"
            onChange={(e) => handleInputChange(e)}
          />
          <TextInput
            label="RFC"
            placeholder="Ingresa el RFV"
            onChange={(e) => handleInputChange(e)}
            defaultValue={employee?.rfc ? String(employee.rfc) : ""}
          />
          <TextInput
            label="CURP"
            placeholder="Ingresa el curp"
            onChange={(e) => handleInputChange(e)}
            defaultValue={employee?.curp ? String(employee.curp) : ""}
          />
          <TextInput
            label="NSS"
            placeholder="Ingresa el NSS"
            onChange={(e) => handleInputChange(e)}
            defaultValue={employee?.nss ? String(employee.nss) : ""}
          />
          <TextInput
            label="Nombre de Emergencia"
            placeholder="Ingresa el nombre del contacto"
            onChange={(e) => handleInputChange(e)}
            defaultValue={employee?.emergency ? String(employee.emergency) : ""}
          />
          <TextInput
            label="Numero de Emergencia"
            placeholder="Ingresa el numero"
            onChange={(e) => handleInputChange(e)}
            defaultValue={employee?.emergency ? String(employee.emergency) : ""}
          />
          <TextInput
            label="Puesto"
            placeholder="Ingresa el puesto"
            onChange={(e) => handleInputChange(e)}
            defaultValue={employee?.position ? String(employee.position) : ""}
          />
          <TextInput
            label="Estatus"
            placeholder="Activo o Inactivo"
            onChange={(e) => handleInputChange(e)}
            defaultValue={employee?.status ? String(employee.status) : ""}
          />
          <CalendarSelector label="Fecha de la baja" />
          <TextInput
            label="Examen Medico"
            placeholder="Id del examen"
            onChange={(e) => handleInputChange(e)}
            defaultValue={employee?.exam_id ? String(employee.exam_id) : ""}
          />
          <CalendarSelector
            label="Fecha de nacimiento"
            onChange={(e) => handleInputChange(e)}
          />
          <TextInput
            label="Numero de Legajo"
            placeholder="Ingresa el numero de legajo"
            onChange={(e) => handleInputChange(e)}
            defaultValue={employee?.legajo ? String(employee.legajo) : ""}
          />
        </div>
        <div className="flex flex-row gap-5 w-full">
          <div className="w-full flex gap-4 items-center justify-around px-4 py-6">
            <button className="px-4 py-2 bg-indigo-400 rounded-md text-neutral-800 font-semibold tracking-wider">
              Limpiar Campos
            </button>
            <button
              className="px-4 py-2 bg-indigo-400 rounded-md text-neutral-800 font-semibold tracking-wider"
              onClick={postNewEmployee}
            >
              Agregar Empleado
            </button>
            <button
              className="px-4 py-2 bg-indigo-400 rounded-md text-neutral-800 font-semibold tracking-wider"
              onClick={updateEmployee}
            >
              Actualizar Empleado
            </button>
            <button
              className="px-4 py-2 bg-[#cecece] rounded-md text-red-500 border border-red-500 font-semibold tracking-wider"
              onClick={deleteEmployee}
            >
              Eliminar Producto
            </button>
            <button
              className="px-4 py-2 bg-indigo-400 rounded-md text-neutral-800 font-semibold tracking-wider"
              onClick={hadleShowTable}
            >
              Ver Tabla
            </button>
          </div>
        </div>
        {showTable && (
          <DataTable
            columns={columns}
            data={employees?.data}
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

export default EmployeesPage;
