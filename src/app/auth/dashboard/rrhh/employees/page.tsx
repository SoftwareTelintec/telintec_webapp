'use client';

import { CalendarSelector, TextInput } from '@/app/components';

function EmployeesPage() {
	return (
		<>
			<section className="flex flex-col p-10 ml-20 w-full gap-5 2xl:container 2xl:mx-auto">
				<h2 className="text-4xl text-neutral-200 font-semibold tracking-wide">
					Empleados
				</h2>
				<div className="w-full h-auto border border-neutral-500/50 bg-neutral-800/20 rounded grid grid-cols-4 gap-4 px-4 py-6">
					<TextInput label="Nombre" placeholder="Ingresa el nombre" />
					<TextInput label="Apellido" placeholder="Ingresa el apellido" />
					<TextInput label="CURP" placeholder="Ingresa el curp" />
					<TextInput label="Telefono" placeholder="Ingresa el telefono" />

					<TextInput label="Modalidad" placeholder="Ingresa la modalidad" />
					<TextInput
						label="Departamento"
						placeholder="Ingresa el departamento"
					/>
					<TextInput label="Contrato" placeholder="Ingresa el contrato" />
					<CalendarSelector label="Fecha de Ingreso" />

					<TextInput label="RFC" placeholder="Ingresa el RFV" />
					<TextInput label="NSS" placeholder="Ingresa el NSS" />
					<TextInput label="Puesto" placeholder="Ingresa el puesto" />
					<TextInput label="Estatus" placeholder="Activo o Inactivo" />

					<CalendarSelector label="Fecha de la baja" />
					<TextInput label="Comentarios" placeholder="..." />
					<CalendarSelector label="Fecha de nacimiento" />
					<TextInput
						label="Numero de Legajo"
						placeholder="Ingresa el numero de legajo"
					/>
				</div>
				<div className="flex flex-row gap-5 w-full">
					<div className="border-neutral-500/50 min-h-60 w-1/2 bg-neutral-800/20 rounded border grid grid-cols-2 gap-4 px-4 py-6">
						<TextInput label="Email Telintec" placeholder="Ingresa el RFV" />
						<TextInput label="Email Personal" placeholder="Ingresa el NSS" />
						<p className="col-span-2">Numero / Contacto de emergencias</p>
						<TextInput
							label="Nombre"
							placeholder="Ingresa el nombre del contacto"
						/>
						<TextInput label="Numero" placeholder="Ingresa el numero" />
					</div>
					<div className="border-neutral-500/50 min-h-60 w-1/2 bg-neutral-800/20 rounded border grid grid-cols-2 gap-6 px-4 py-6">
						<button className="px-4 py-2 bg-cyan-700 rounded-md text-neutral-800 font-semibold tracking-wider">
							Limpiar Campos
						</button>
						<button className="px-4 py-2 bg-cyan-700 rounded-md text-neutral-800 font-semibold tracking-wider">
							Agregar Empleado
						</button>
						<button className="px-4 py-2 bg-cyan-700 rounded-md text-neutral-800 font-semibold tracking-wider">
							Actualizar Empleado
						</button>
						<button className="px-4 py-2 bg-cyan-700 rounded-md text-neutral-800 font-semibold tracking-wider">
							Eliminar Empleado
						</button>
						<button className="px-4 py-2 bg-cyan-700 rounded-md text-neutral-800 font-semibold tracking-wider">
							Ver Tabla
						</button>
					</div>
				</div>
			</section>
		</>
	);
}

export default EmployeesPage;
