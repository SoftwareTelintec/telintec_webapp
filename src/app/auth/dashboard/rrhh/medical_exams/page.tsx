'use client';

import { CalendarSelector, MySelect, TextInput } from '@/app/components';
import { useCallback, useEffect, useState } from 'react';
import { ActionMeta } from 'react-select';
import axios from 'axios';
import DataTable from 'react-data-table-component';
import debounce from 'lodash.debounce';

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
	exist: string;
	id_exam: number;
	name: string;
	blood: string;
	status: string;
	aptitudes: Number;
	dates: string;
	emp_id: number;
	apt_actual?: string;
}
interface Option {
	value: string;
	label: string;
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
	exist: '',
	id_exam: 0,
	name: '',
	blood: '',
	status: '',
	aptitudes: 0,
	dates: '',
	emp_id: 0,
	apt_actual: '',
};

function MedicalPage() {
	const [examedicals, setExaMedicals] = useState<ExaMedical[]>();
	const [examedical, setExaMedical] = useState<ExaMedical>(INITIAL_EXAMEDICAL);
	const [error, setError] = useState('');
	const [showTable, setShowTable] = useState(false);
	const [loading, setLoading] = useState(false);
	const [selectedBloodType, setSelectedBloodType] = useState(
		bloodTypeOptions[0]
	);
	const [selectedState, setSelectedState] = useState(stateOptions[0]);
	const [selectedAptitude, setSelectedAptitude] = useState(aptitudeOptions[0]);
	const [res, setRes] = useState('');

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
		console.log('Action type:', actionMeta.action);
		if (option) {
			console.log('Selected option:', option);
		} else {
			console.log('No option selected');
		}
	}

	const getAllExaMedical = async () => {
		await axios
			.get(`${process.env.API_HOST}/rrhh/employees/medical/all`)
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
		const {
			id,
			exist,
			id_exam,
			name,
			blood,
			status,
			aptitudes,
			dates,

			emp_id,
		} = row;
		setExaMedical({
			id,
			exist,
			id_exam,
			name,
			blood,
			status,
			aptitudes,
			dates,

			emp_id,
		});
	};

	const debouncedHandleInputChange = useCallback(
		debounce((name, value) => {
			setExaMedical((prev): any => ({
				...prev,
				[name]: value,
			}));
			console.log({ name, value });
		}, 300),
		[]
	);
	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		debouncedHandleInputChange(name, value);
	};
	// HTTP request
	//      apt_actual: String(examedical.apt_actual),
	const postNewExaMedical = async () => {
		const data = {
			info: {
				name: String(examedical.name),
				blood: String(examedical.blood),
				status: String(examedical.status),
				aptitudes: Number(examedical.aptitudes),
				dates: String(examedical.dates),

				emp_id: Number(examedical.emp_id),
			},
		};
		await axios(`${process.env.API_HOST}/rrhh/employee/medical`, {
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
				dates: String(examedical.dates),

				emp_id: Number(examedical.emp_id),
			},
		};
		await axios(`${process.env.API_HOST}/rrhh/employee/medical`, {
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
		await axios(`${process.env.API_HOST}/rrhh/employee/medical`, {
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
					<TextInput
						name="phone"
						id="phone"
						label="Nombre"
						onChange={(e) => handleInputChange(e)}
						defaultValue={examedical?.name ? String(examedical.name) : ''}
					/>
					{/* onChange={setSelectedBloodType} */}
					<MySelect
						label="Tipo de Sangre"
						options={bloodTypeOptions}
						value={selectedBloodType}
						placeholder="Selecciona un tipo de sangre"
						onChange={(e) => {
							setSelectedBloodType(e);
							handleInputChange(e);
						}}
					/>
					<MySelect
						label="Estado"
						options={stateOptions}
						value={selectedState}
						placeholder="Selecciona un estado"
						onChange={(e) => {
							setSelectedState(e);
							handleInputChange(e);
						}}
					/>
					<TextInput
						name=" aptitudes"
						id="aptitudes"
						label="Aptitudes"
						onChange={(e) => handleInputChange(e)}
						defaultValue={
							examedical?.aptitudes ? String(examedical.aptitudes) : ''
						}
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
						value={selectedAptitude}
						placeholder="Selecciona una aptitud"
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
