'use client';

import { MySelect, TextInput } from '@/app/components';
import axios from 'axios';
import { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';

const vacationColumns = [
	{
		name: 'ID',
		selector: (row: Vacation) => row.emp_id,
		width: '100px',
	},
	{
		name: 'Nombre',
		selector: (row: Vacation) => row.name,
		sortable: true,
	},
	{
		name: 'Fecha de Contratación',
		selector: (row: Vacation) => row.date_admission,
	},
	{
		name: 'Prima',
		selector: (row: Vacation) => row.seniority.prima?.status || '-',
		width: '100px',
	},
	{
		name: 'Fecha de Pago Prima',
		selector: (row: Vacation) => row.seniority.prima?.fecha_pago || '-',
		width: '150px',
	},
	{
		name: 'Estado de Vacaciones',
		selector: (row: Vacation) => row.seniority.status,
		sortable: true,
	},
	{
		name: 'Comentarios',
		selector: (row: Vacation) => row.seniority.comentarios,
	},
];

interface Vacation {
	emp_id: number;
	name: string;
	date_admission: string;
	seniority: {
		prima?: {
			status: string;
			fecha_pago: string;
		};
		status: string;
		comentarios: string;
	};
}
const INITIAL_VACATION: Vacation = {
	emp_id: 0,
	name: '',
	date_admission: '',
	seniority: {
		status: '',
		comentarios: '',
	},
};
function VacationsPage() {
	const [vacations, setVacations] = useState<Vacation[]>();
	const [vacation, setVacation] = useState<Vacation>(INITIAL_VACATION);
	const [error, setError] = useState('');
	const [showTable, setShowTable] = useState(false);
	const [loading, setLoading] = useState(false);

	const getAllVacations = async () => {
		await axios
			.get('http://localhost:5000/GUI/api/v1/rrhh/employees/vacations/all')
			.then((res) => {
				setVacations(res.data);
			})
			.catch((err) => {
				setError(err);
			});
	};

	const hadleShowTable = () => {
		setShowTable(!showTable);
	};

	const handleSelectedVacation = (row: Vacation) => {
		const {
			emp_id,
			name,
			date_admission,
			seniority: { prima, status, comentarios },
		} = row;

		setVacation({
			emp_id,
			name,
			date_admission,
			seniority: {
				prima,
				status,
				comentarios,
			},
		});
	};
	useEffect(() => {
		getAllVacations();
	}, []);

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
							<button className="px-4 py-2 bg-indigo-400 rounded-md text-neutral-800 font-semibold tracking-wider">
								Limpiar Campos
							</button>
							<button className="px-4 py-2 bg-indigo-400 rounded-md text-neutral-800 font-semibold tracking-wider">
								Agregar Registro
							</button>
							<button className="px-4 py-2 bg-indigo-400 rounded-md text-neutral-800 font-semibold tracking-wider">
								Actualizar Registro
							</button>
							<button className="px-4 py-2 bg-[#cecece] rounded-md text-red-500 border border-red-500 font-semibold tracking-wider">
								Eliminar Registro
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
						columns={vacationColumns}
						data={vacations?.data}
						onRowDoubleClicked={(row) => handleSelectedVacation(row)}
						pagination
						paginationPerPage={10}
						progressPending={loading}
					/>
				)}
			</section>
		</>
	);
}

export default VacationsPage;
