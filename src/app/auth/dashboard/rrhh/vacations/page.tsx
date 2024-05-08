'use client';

import { MySelect, TextInput } from '@/app/components';

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
				<div className="flex flex-row gap-5 w-full">
					<div className="flex flex-row gap-5 w-full">
						<div className="w-full flex gap-4 items-center justify-around px-4 py-6">
							<button className="px-4 py-2 bg-cyan-700 rounded-md text-neutral-800 font-semibold tracking-wider">
								Limpiar Campos
							</button>
							<button className="px-4 py-2 bg-cyan-700 rounded-md text-neutral-800 font-semibold tracking-wider">
								Agregar Registro
							</button>
							<button className="px-4 py-2 bg-cyan-700 rounded-md text-neutral-800 font-semibold tracking-wider">
								Actualizar Registro
							</button>
							<button className="px-4 py-2 bg-[#cecece] rounded-md text-red-500 border border-red-500 font-semibold tracking-wider">
								Eliminar Registro
							</button>
							<button className="px-4 py-2 bg-cyan-700 rounded-md text-neutral-800 font-semibold tracking-wider">
								Ver Tabla
							</button>
						</div>
					</div>
				</div>
			</section>
		</>
	);
}

export default VacationsPage;
