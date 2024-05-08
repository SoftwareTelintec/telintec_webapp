"use client";

import { MySelect, TextInput } from "@/app/components";

function VacationsPage() {
  return (
    <>
      <section className="flex flex-col p-10 ml-20 w-full gap-5 2xl:container 2xl:mx-auto">
        <h1 className="text-4xl text-neutral-200">Vacaciones</h1>
        <div className="w-full h-80 border border-neutral-500/50 bg-neutral-800/20 rounded grid grid-cols-3 gap-4 px-4 py-6">
          <TextInput label="ID Empleado" />
          <TextInput label="Año " />
          <TextInput label="Pendientes" />
          <MySelect label="Pago prima" />
          <TextInput label=" text" />
          <div>
            <textarea
              className="w-full h-32 resize-none border border-gray-300 rounded-lg shadow"
              placeholder="comentarios"
            ></textarea>
          </div>
        </div>
        <div className=" h-50border border-neutral-500/50 bg-neutral-800/20 rounded grid grid-cols-5 gap-4 px-4 py-6">
          <button className="px-4 py-2  bg-indigo-400 rounded-md text-neutral-800 font-semibold ">
            Probar ID
          </button>
          <button className="px-4 py-2  bg-indigo-400 rounded-md text-neutral-800 font-semibold ">
            Actualizar registro
          </button>
          <button className="px-4 py-2  bg-indigo-400 rounded-md text-neutral-800 font-semibold ">
            Borrar registro
          </button>
          <button className="px-4 py-2  bg-indigo-400 rounded-md text-neutral-800 font-semibold ">
            Actualizar empleados
          </button>
          <button className="px-4 py-2  bg-indigo-400 rounded-md text-neutral-800 font-semibold ">
            Exportar
          </button>
        </div>

        {/* <div className="flex flex-row gap-5 w-full">
          <div className="border-neutral-500/50 h-60 w-1/2 bg-neutral-800/20 rounded border" />
          <div className="border-neutral-500/50 h-60 w-1/2 bg-neutral-800/20 rounded border" />
        </div> */}
      </section>
    </>
  );
}

export default VacationsPage;
