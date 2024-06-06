'use client';

import { CalendarSelector, MySelect, TextInput } from '@/app/components';
import { useCallback, useEffect, useState } from 'react';
import { ActionMeta } from 'react-select';
import axios from 'axios';
import DataTable from 'react-data-table-component';
import debounce from 'lodash.debounce';
import { set } from 'react-hook-form';

const columns = [
	{
		name: 'ID Examen',
		selector: (row: any) => row.id_exam,
		width: '100px',
	},
	{
		name: 'Nombre',
		selector: (row: any) => row.name,
		sortable: true,
	},
	{
		name: 'Tipo de Sangre',
		selector: (row: any) => row.blood,
		width: '150px',
	},
	{
		name: 'Estatus',
		selector: (row: any) => row.status,
		sortable: true,
		width: '100px',
	},
	{
		name: 'Aptitudes',
		selector: (row: any) => row.aptitudes,
		width: '200px',
	},
	{
		name: 'Fechas',
		selector: (row: any) => row.dates,
		width: '300px',
	},
	{
		name: 'ID Empleado',
		selector: (row: any) => row.emp_id,
		width: '150px',
	},
	{
		name: 'Aptitud Actual',
		selector: (row: any) => row.apt_actual,
		width: '150px',
	},
];

interface ExaMedical {
	id: any;
	name: string;
	blood: {
		value: string;
		label: string;
	};
	status: {
		value: string;
		label: string;
	};
	aptitudes: {
		value: string;
		label: string;
	};
	date: Date;
	apt_actual: Number;
	emp_id: number;
}

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

const INITIAL_EXAMEDICAL: ExaMedical = {
	id: 0,
	name: '',
	blood: { value: '0', label: 'Selecciona un tipo de sangre' },
	status: { value: '0', label: 'Selecciona un estatus' },
	apt_actual: 0,
	date: new Date(),
	emp_id: 0,
	aptitudes: { value: '0', label: 'Selecciona una aptitud' },
};

function MedicalPage() {
	const [examedicals, setExaMedicals] = useState<ExaMedical[]>();
	const [examedical, setExaMedical] = useState<ExaMedical>(INITIAL_EXAMEDICAL);
	const [error, setError] = useState('');
	const [showTable, setShowTable] = useState(false);
	const [loading, setLoading] = useState(false);
	const [res, setRes] = useState('');

	const getAllExaMedical = async () => {
		await axios
			.get(`${process.env.NEXT_PUBLIC_API_HOST}/rrhh/employees/medical/all`)
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
		const { id, name, blood, status, apt_actual, date, emp_id, aptitudes } =
			row;
		setExaMedical({
			id,
			name,
			blood:
				bloodTypeOptions[
					bloodTypeOptions.findIndex((option) => option.value === blood)
				],
			status:
				stateOptions[
					stateOptions.findIndex(
						(option) => option.value === status.toLowerCase()
					)
				],
			apt_actual,
			date,
			emp_id,
			aptitudes,
		});
	};

	const debouncedHandleInputChange = useCallback(
		debounce((name, value) => {
			setExaMedical((prev): any => ({
				...prev,
				[name]: value,
			}));
		}, 300),
		[]
	);
	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		debouncedHandleInputChange(name, value);
	};

	const postNewExaMedical = async () => {
		const data = {
			info: {
				name: String(examedical.name),
				blood: String(examedical.blood),
				status: String(examedical.status),
				aptitudes: Number(examedical.aptitudes),
				date: String(examedical.date),
				emp_id: Number(examedical.emp_id),
			},
		};
		await axios(`${process.env.NEXT_PUBLIC_API_HOST}/rrhh/employee/medical`, {
			method: 'POST',
			data,
		})
			.then((res) => {
				setError(res.data);
			})
			.catch((err) => {
				setError(err);
			});
	};

	const updateExaMedical = async () => {
		const data = {
			id: examedical.id,
			info: {
				name: String(examedical.name),
				blood: String(examedical.blood),
				status: String(examedical.status),
				aptitudes: Number(examedical.aptitudes),
				date: String(examedical.date),
				emp_id: Number(examedical.emp_id),
			},
		};
		await axios(`${process.env.NEXT_PUBLIC_API_HOST}/rrhh/employee/medical`, {
			method: 'POST',
			data,
		})
			.then((res) => {
				setError(res.data);
			})
			.catch((err) => {
				setError(err);
			});
	};

	const deleteExaMedical = async () => {
		const data = {
			id: examedical.id,
		};
		await axios(`${process.env.NEXT_PUBLIC_API_HOST}/rrhh/employee/medical`, {
			method: 'DELETE',
			data,
		})
			.then((res) => {
				setError(res.data);
			})
			.catch((err) => {
				setError(err);
			});
	};

	const cleanFields = () => {
		setExaMedical(INITIAL_EXAMEDICAL);
	};

	const handleDate = (date) => {
		setExaMedical({ ...event, date });
	};

	function handleBloodTypeChange(option: { value: string; label: string }) {
		setExaMedical({ ...examedical, blood: bloodTypeOptions[option.value] });
	}

	function handleStateChange(option: { value: string; label: string }) {
		setExaMedical({ ...examedical, status: stateOptions[option.value] });
	}

	function handleAptitudeChange(option: { value: string; label: string }) {
		setExaMedical({ ...examedical, aptitudes: aptitudeOptions[option.value] });
	}

	useEffect(() => {
		getAllExaMedical();
	}, []);

	return (
		<>
			<section className="flex flex-col p-10 ml-20 w-full gap-5 2xl:container 2xl:mx-auto">
				<h1 className="text-4xl text-neutral-200">Examenes Medicos</h1>
				<div className="w-full h-80 border border-neutral-500/50 bg-neutral-800/20 rounded grid grid-cols-3 gap-4 px-4 py-6">
					<CalendarSelector
						label="fecha"
						selectedDate={examedical.date}
						onChange={handleDate}
					/>
					<TextInput label="ID Empleado" />
					<TextInput
						name="phone"
						id="phone"
						label="Nombre"
						onChange={(e) => handleInputChange(e)}
						defaultValue={examedical?.name ? String(examedical.name) : ''}
					/>
					<MySelect
						label="Tipo de Sangre"
						options={bloodTypeOptions}
						value={examedical.blood}
						placeholder="Selecciona un tipo de sangre"
						onChange={handleBloodTypeChange}
					/>
					<MySelect
						label="Estado"
						options={stateOptions}
						value={examedical.status}
						placeholder="Selecciona un estado"
						onChange={handleStateChange}
					/>
					<TextInput
						name=" apt_actual"
						id="apt_actual"
						label="Aptitudes"
						onChange={(e) => handleInputChange(e)}
						defaultValue={
							examedical?.apt_actual ? String(examedical.apt_actual) : ''
						}
					/>
					<MySelect
						label="Aptitud"
						options={aptitudeOptions}
						value={examedical.aptitudes}
						placeholder="Selecciona una aptitud"
						onChange={handleAptitudeChange}
					/>
				</div>

				<div className="flex flex-row gap-5 w-full">
					<div className="w-full flex gap-4 items-center justify-around px-4 py-6">
						<button
							className="px-4 py-2 bg-indigo-400 rounded-md text-neutral-800 font-semibold tracking-wider"
							onClick={cleanFields}
						>
							Limpiar Campos
						</button>
						<button
							className="px-4 py-2 bg-indigo-400 rounded-md text-neutral-800 font-semibold tracking-wider"
							onClick={postNewExaMedical}
						>
							Agregar Examen
						</button>
						<button
							className="px-4 py-2 bg-indigo-400 rounded-md text-neutral-800 font-semibold tracking-wider"
							onClick={updateExaMedical}
						>
							Actualizar Examen
						</button>
						<button
							className="px-4 py-2 bg-[#cecece] rounded-md text-red-500 border border-red-500 font-semibold tracking-wider"
							onClick={deleteExaMedical}
						>
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
