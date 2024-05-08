'use client';

import { CalendarSelector, MySelect, TextInput } from '@/app/components';
import { useState } from 'react';
import { ActionMeta } from 'react-select';

function MedicalPage() {
	interface Option {
		value: string;
		label: string;
	}
	// Dummy data
	const bloodTypeOptions = [
		{ value: 'A+', label: 'A+' },
		{ value: 'B+', label: 'B+' },
		{ value: 'O+', label: 'O+' },
		{ value: 'AB+', label: 'AB+' },
	];
	const stateOptions = [
		{ value: 'activo', label: 'Activo' },
		{ value: 'inactivo', label: 'Inactivo' },
	];
	const aptitudeOptions = [
		{ value: '1', label: '1' },
		{ value: '2', label: '2' },
	];
	// Estado para cada selección
	const [selectedBloodType, setSelectedBloodType] = useState(
		bloodTypeOptions[0]
	);
	const [selectedState, setSelectedState] = useState(stateOptions[0]);
	const [selectedAptitude, setSelectedAptitude] = useState(aptitudeOptions[0]);
	// Funciones onChange
	function handleBloodTypeChange(option: Option) {
		console.log('Selected Blood Type:', option);
		setSelectedBloodType(option);
	}

	function handleStateChange(option: Option) {
		console.log('Selected State:', option);
		setSelectedState(option);
	}

	function handleAptitudeChange(option: Option) {
		console.log('Selected Aptitude:', option);
		setSelectedAptitude(option);
	}
	function handleSelectChange(
		option: Option | null,
		actionMeta: ActionMeta<Option>
	): void {
		console.log('Action type:', actionMeta.action);
		if (option) {
			console.log('Selected option:', option);
		} else {
			console.log('No option selected');
		}
	}

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
							<button className="px-4 py-2 bg-cyan-700 rounded-md text-neutral-800 font-semibold tracking-wider">
								Limpiar Campos
							</button>
							<button className="px-4 py-2 bg-cyan-700 rounded-md text-neutral-800 font-semibold tracking-wider">
								Agregar Examen
							</button>
							<button className="px-4 py-2 bg-cyan-700 rounded-md text-neutral-800 font-semibold tracking-wider">
								Actualizar Examen
							</button>
							<button className="px-4 py-2 bg-[#cecece] rounded-md text-red-500 border border-red-500 font-semibold tracking-wider">
								Eliminar Examen
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

export default MedicalPage;
