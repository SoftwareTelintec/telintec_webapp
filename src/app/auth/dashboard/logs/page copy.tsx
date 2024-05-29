'use client';

import { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { columns, events, incidences, placeList } from '@/constants';
import Selector from './components/Selector';
import InputText from './components/InputText';
import axios from 'axios';

interface records {
	data: {
		id: number;
		employee: string;
		contract: string;
		event: string;
		location: string;
		activity: string;
		timestamp: string;
		value: string;
		comment: string;
	};
}

export default function LogsPage() {
	const [records, setRecords] = useState<records[]>([]);
	const [selectedRows, setSelectedRows] = useState();
	const [loading, setLoading] = useState(true);
	const [startDate, setStartDate] = useState(new Date());
	const [employees, setEmployees] = useState<any>();
	const [contracts, setContracts] = useState<any>();
	const [selectedEmployee, setSelectedEmployee] = useState();

	const fetchEmployees = async () => {
		const response = await fetch(
			`${process.env.NEXT_PUBLIC_API_HOST}/bitacora/employees`
		);
		const data = await response.json();
		setEmployees(data.data);
		const uniqueLastElements = new Set(
			data?.data?.map((row: any) => row[row.length - 1])
		);
		let uniqueLastArray = Array.from(uniqueLastElements);
		uniqueLastArray = uniqueLastArray.map((contract, index) => {
			return {
				id: index,
				name: contract,
			};
		});
		setContracts(uniqueLastArray);
	};

	const fethEvents = async () => {
		const response = await axios.post(
			`${process.env.NEXT_PUBLIC_API_HOST}/bitacora/fichaje/table`,
			{
				date: formatDate(startDate),
			}
		);
		const responseData = response.data;
		if (responseData && responseData.data && responseData.columns) {
			const { data } = responseData;
			const dataFormatted: any = [];
			data?.map((record: any, index: number) => {
				const obj = {
					id: index,
					idEmployee: record[0],
					name: record[1],
					contract: record[2],
					event: record[3],
					location: record[4],
					activity: record[5],
					timestamp: record[6],
					value: record[7],
					comment: record[8],
				};
				dataFormatted.push(obj);
				setRecords({ ...records, data: dataFormatted });
			});
		}
	};

	const handleChange = (e: any) => {
		const filteredData = records?.data?.filter((record) => {
			return record.employee
				.toLowerCase()
				.includes(e.target.value.toLowerCase());
		});
		setRecords(filteredData);
	};

	const handleSelectedRowsChange = (data: any) => {
		setSelectedRows(data.selectedRows);
	};

	const formatDate = (date?: any) => {
		const day = date.getDate();
		const month = date.getMonth();
		const year = date.getFullYear();
		return `${year}-${month}-${day}`;
	};

	useEffect(() => {
		const timeout = setTimeout(() => {
			fetchEmployees();
			fethEvents();
			setLoading(false);
		}, 1000);
		return () => clearTimeout(timeout);
	}, [startDate]);

	useEffect(() => {
		if (selectedRows) {
			const employee = {
				id: selectedRows[0]?.id,
				idEmployee: selectedRows[0]?.idEmployee,
				name: selectedRows[0]?.name,
				contract: selectedRows[0]?.contract,
				event: selectedRows[0]?.event,
				location: selectedRows[0]?.location,
				activity: selectedRows[0]?.activity,
				timestamp: selectedRows[0]?.timestamp,
				value: selectedRows[0]?.value,
				comment: selectedRows[0]?.comment,
			};
			setSelectedEmployee(employee);
		}
	}, [selectedRows]);

	const [updatedSelectedEmployee, setUpdatedSelectedEmployee] = useState(null);

	useEffect(() => {
		setUpdatedSelectedEmployee(selectedEmployee);
	}, [selectedEmployee]);

	return (
		<main className="container mx-auto px-6 py-4 flex flex-col gap-y-6">
			<h2 className="text-4xl font-semibold tracking-wide">Bitacora</h2>
			<div className="grid grid-cols-2 gap-2 w-full items-start">
				<Selector
					data={{
						values: employees,
						htmlfor: 'employeec',
						title: 'Empleado (c)',
						placeholer: 'Selecciona un empleado...',
						employee: updatedSelectedEmployee,
					}}
				/>
				<Selector
					data={{
						values: employees,
						htmlfor: 'employee',
						title: 'Empleado (extra)',
						placeholer: 'Selecciona un empleado...',
						employee: updatedSelectedEmployee,
					}}
				/>
				<Selector
					data={{
						values: contracts,
						htmlfor: 'contract',
						title: 'Contrato',
						placeholer: 'Selecciona un contrato...',
						employee: updatedSelectedEmployee,
					}}
				/>
				<div className="flex flex-col items-start gap-2 justify-center w-full">
					<label htmlFor="date">Fecha</label>
					<DatePicker
						showIcon
						selected={startDate}
						onChange={(date: any) => {
							setStartDate(date);
						}}
						className="border border-[#cccccc] rounded-md p-2 w-full"
					/>
				</div>
				<Selector
					data={{
						values: events,
						htmlfor: 'event',
						title: 'Evento',
						placeholer: 'Selecciona un evento...',
						employee: updatedSelectedEmployee,
					}}
				/>
				<Selector
					data={{
						values: incidences,
						htmlfor: 'incidence',
						title: 'Incidencia',
						placeholer: 'Selecciona una incidencia...',
						employee: updatedSelectedEmployee,
					}}
				/>
				<InputText
					data={{
						htmlfor: 'activity',
						title: 'Actividad',
						employee: updatedSelectedEmployee,
					}}
				/>
				<Selector
					data={{
						values: placeList,
						htmlfor: 'ubication',
						title: 'Ubicacion',
						placeholer: 'Selecciona una ubicacion...',
						employee: updatedSelectedEmployee,
					}}
				/>
				<InputText
					data={{
						htmlfor: 'comments',
						title: 'Comentarios',
						employee: updatedSelectedEmployee,
					}}
				/>
			</div>

			<div className="w-full flex gap-x-2 items-start">
				<button className="border border-gray-600 p-2 rounded-md hover:bg-slate-700 hover:text-white">
					Agregar Evento
				</button>
				<button className="border border-gray-600 p-2 rounded-md hover:bg-slate-700 hover:text-white">
					Actualizar Datos
				</button>
				<button className="border border-gray-600 p-2 rounded-md hover:bg-slate-700 hover:text-white">
					Actualizar Tabla
				</button>
				<button className="border border-gray-600 p-2 rounded-md hover:bg-slate-700 hover:text-white">
					Eliminar Evento
				</button>
				<button className="border border-gray-600 p-2 rounded-md hover:bg-slate-700 hover:text-white">
					Limpiar campos
				</button>
			</div>

			<div className="mt-4 w-full">
				<div className="flex flex-col items-start justify-center gap-2 w-full">
					<label htmlFor="search">Buscar empleado</label>
					<input
						type="text"
						onChange={handleChange}
						placeholder="Inrgesa un nombre..."
						id="search"
						className="w-full border border-[#cccccc] rounded-md p-2"
					/>
				</div>
				<DataTable
					title="Bitacora de Empleados"
					columns={columns}
					data={records?.data?.map((record) => record)}
					selectableRows
					pagination
					paginationPerPage={10}
					onSelectedRowsChange={(data) => handleSelectedRowsChange(data)}
					progressPending={loading}
				/>
			</div>
		</main>
	);
}
