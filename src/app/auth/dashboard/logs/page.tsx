'use client';

import { use, useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { CalendarSelector, TextInput, MySelect } from '@/app/components';
import { formatDate } from '@/utils';
import debounce from 'lodash.debounce';
import DataTable from 'react-data-table-component';
import { useSession } from 'next-auth/react';
import { set } from 'react-hook-form';

const contractsOptions = [
	{
		value: '0',
		label: 'AUTO',
	},
	{
		value: '1',
		label: 'ALMACEN',
	},
	{
		value: '2',
		label: 'GRUAS',
	},
	{
		value: '43',
		label: 'RFID',
	},
	{
		value: '4',
		label: 'OTROS',
	},
	{
		value: '5',
		label: 'OPERACIONES',
	},
	{
		value: '6',
		label: 'PUEBLA',
	},
	{
		value: '7',
		label: 'CCTV',
	},
	{
		value: '8',
		label: 'INFRA',
	},
	{
		value: '9',
		label: 'IPAD',
	},
];

const eventsOptions = [
	{
		value: '0',
		label: 'FALTA',
	},
	{
		value: '1',
		label: 'ATRASO',
	},
	{
		value: '2',
		label: 'EXTRA',
	},
	{
		value: '3',
		label: 'NORMAL',
	},
];

const placeOptions = [
	{
		value: '0',
		label: 'Guerrero',
	},
	{
		value: '1',
		label: 'Universidad',
	},
	{
		value: '2',
		label: 'Almacen',
	},
	{
		value: '3',
		label: 'Churubusco',
	},
	{
		value: '4',
		label: 'Mitras',
	},
	{
		value: '5',
		label: 'Lagos norte',
	},
	{
		value: '6',
		label: 'Juventud',
	},
	{
		value: '7',
		label: 'Pesqueria',
	},
	{
		value: '8',
		label: 'CSI',
	},
	{
		value: '9',
		label: 'CSC',
	},
	{
		value: '10',
		label: 'Edificio metalicos',
	},
	{
		value: '11',
		label: 'Nova',
	},
	{
		value: '12',
		label: 'Puebla',
	},
	{
		value: '13',
		label: 'San luis',
	},
	{
		value: '14',
		label: 'Otros',
	},
];

const incidentsOptions = [
	{
		value: '0',
		label: 'ACUERDO',
	},
	{
		value: '1',
		label: 'PERMISO SIN GOSE',
	},
	{
		value: '2',
		label: 'FESTIVO',
	},
	{
		value: '3',
		label: 'VACACIONES',
	},
	{
		value: '4',
		label: 'INCAPACIDAD',
	},
	{
		value: '5',
		label: 'SUSPENSION',
	},
];

const columns = [
	{
		name: 'ID',
		selector: (row: any) => row.id,
		width: '100px',
	},
	{
		name: 'Nombre',
		selector: (row: any) => row.name,
		sortable: true,
		width: '200px',
	},
	{
		name: 'Contrato',
		selector: (row: any) => row.contract,
		sortable: true,
		width: '200px',
	},
	{
		name: 'Evento',
		selector: (row: any) => row.event,
		sortable: true,
		width: '200px',
	},
	{
		name: 'Lugar',
		selector: (row: any) => row.location,
		sortable: true,
		width: '200px',
	},
	{
		name: 'Actividad',
		selector: (row: any) => row.activity,
		width: '200px',
	},
	{
		name: 'Timestamp',
		selector: (row: any) => row.timestamp,
		width: '200px',
	},
	{
		name: 'Valor',
		selector: (row: any) => row.value,
		width: '200px',
	},
	{
		name: 'Comentario',
		selector: (row: any) => row.comment,
		width: '200px',
	},
];

interface Event {
	id: number;
	date: string;
	event: string;
	value: number;
	comment: string;
	id_emp: number;
	contract: string;
}

const INITIAL_EVENT: Event = {
	id: 0,
	date: formatDate(new Date()),
	event: 'FALTA',
	value: 0,
	comment: '',
	id_emp: 0,
	contract: 'AUTO',
};

export default function LogsPage() {
	const [employees, setEmployees] = useState([]);
	const [events, setEvents] = useState([]);
	const [event, setEvent] = useState<Event>(INITIAL_EVENT);
	const [error, setError] = useState();
	const [currentEvent, setCurrentEvent] = useState(eventsOptions[0]);
	const [showTable, setShowTable] = useState(false);
	const [loading, setLoading] = useState(true);

	const getAllEvents = async () => {
		await axios('http://localhost:5000/GUI/api/v1/bitacora/fichaje/table', {
			method: 'POST',
			data: {
				date: formatDate(new Date()),
			},
		})
			.then((response) => {
				console.log(response.data);
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
						setEvents(dataFormatted);
					});
					setLoading(false);
				}
			})
			.catch((error) => {
				setError(error);
			});
	};

	const getAllEmployees = async () => {
		await axios('http://localhost:5000/GUI/api/v1/bitacora/employees', {
			method: 'GET',
		})
			.then((response) => {
				setEmployees(response.data);
			})
			.catch((error) => {
				setError(error);
			});
	};

	const employeesOptions = employees?.data?.map((employee) => ({
		value: employee[0],
		label:
			String(employee[1]).toUpperCase() +
			' ' +
			String(employee[2]).toUpperCase(),
	}));

	const handleEventChange = (event) => {
		setCurrentEvent(event);
	};

	const hadleShowTable = () => {
		setShowTable(!showTable);
	};

	const handleSelectedRow = (row) => {
		console.log(row);
	};

	const handleDate = (date) => {
		setEvent({ ...event, date: formatDate(date) });
	};

	useEffect(() => {
		getAllEmployees();
	}, []);

	useEffect(() => {
		getAllEvents();
	}, [event.date]);

	return (
		<section className="flex flex-col p-10 ml-20 w-full gap-5 2xl:container 2xl:mx-auto">
			<h2 className="text-4xl text-neutral-200">Bitacora</h2>
			<div className="w-full h-auto border border-neutral-500/50 bg-neutral-800/20 rounded grid grid-cols-2 gap-4 px-4 py-6">
				<MySelect
					label="Empleado"
					placeholder="Selecciona un empleado"
					options={employeesOptions}
					// value={sm?.status ? sm.status : { label: '', value: '' }}
					// onChange={(e) => handleStatusChange(e)}
				/>
				<MySelect
					label="Contrato"
					placeholder="Selecciona un contrato"
					options={contractsOptions}
					// value={sm?.status ? sm.status : { label: '', value: '' }}
					// onChange={(e) => handleStatusChange(e)}
				/>
				<CalendarSelector
					label="Fecha"
					selectedDate={event.date}
					onChange={handleDate}
				/>
				<MySelect
					label="Evento"
					placeholder="Selecciona un evento"
					options={eventsOptions}
					value={currentEvent}
					onChange={(e) => handleEventChange(e)}
				/>
				{currentEvent.value === '0' && (
					<MySelect
						label="Incidencia"
						placeholder="Selecciona una incidencia"
						options={incidentsOptions}
						// value={sm?.status ? sm.status : { label: '', value: '' }}
						// onChange={(e) => handleStatusChange(e)}
					/>
				)}

				{currentEvent.value === '1' && (
					<div className="flex gap-4">
						<TextInput
							id="hours"
							label="Horas"
							name="hours"
							placeholder="HH"
							// onChange={(e) => handleInputChange(e)}
							// defaultValue={sm?.sm_code ? String(sm.sm_code) : ''}
						/>
						<TextInput
							id="mins"
							label="Minutos"
							name="mins"
							placeholder="MM"
							// onChange={(e) => handleInputChange(e)}
							// defaultValue={sm?.sm_code ? String(sm.sm_code) : ''}
						/>
					</div>
				)}

				{currentEvent.value === '2' && (
					<div className="flex gap-4">
						<TextInput
							id="hours"
							label="Horas"
							name="hours"
							placeholder="HH"
							// onChange={(e) => handleInputChange(e)}
							// defaultValue={sm?.sm_code ? String(sm.sm_code) : ''}
						/>
						<TextInput
							id="mins"
							label="Minutos"
							name="mins"
							placeholder="MM"
							// onChange={(e) => handleInputChange(e)}
							// defaultValue={sm?.sm_code ? String(sm.sm_code) : ''}
						/>
						<div className="flex flex-col items-center justify-center w-1/3">
							<label htmlFor="prima">Aplica prima</label>
							<input
								type="checkbox"
								name="prima"
								id="prima"
								className="w-8 h-4 cursor-pointer mt-2"
							/>
						</div>
					</div>
				)}
				<TextInput
					id="activity"
					label="Actividad"
					name="activity"
					placeholder="Ingresa la actividad a realizar"
					// onChange={(e) => handleInputChange(e)}
					// defaultValue={sm?.sm_code ? String(sm.sm_code) : ''}
				/>
				<MySelect
					label="Lugar"
					placeholder="Selecciona un lugar"
					options={placeOptions.map((option) => ({
						...option,
						label: option.label.toUpperCase(),
					}))}
					// value={sm?.status ? sm.status : { label: '', value: '' }}
					// onChange={(e) => handleStatusChange(e)}
				/>
				<TextInput
					id="comments"
					label="Comentarios"
					name="comments"
					placeholder="Ingresa el comentario"
					// onChange={(e) => handleInputChange(e)}
					// defaultValue={sm?.sm_code ? String(sm.sm_code) : ''}
				/>
			</div>

			<div className="flex flex-col gap-5 w-full">
				<div className="w-full flex gap-4 items-center justify-around px-4 py-6">
					<button
						className="px-4 py-2 bg-cyan-700 rounded-md text-neutral-800 font-semibold tracking-wider"
						// onClick={clearFields}
					>
						Limpiar Campos
					</button>
					<button
						className="px-4 py-2 bg-cyan-700 rounded-md text-neutral-800 font-semibold tracking-wider"
						// onClick={postNewSm}
					>
						Agregar Solicitud
					</button>
					<button
						className="px-4 py-2 bg-cyan-700 rounded-md text-neutral-800 font-semibold tracking-wider"
						// onClick={putNewSm}
					>
						Actualizar Solicitud
					</button>
					<button
						className="px-4 py-2 bg-[#cecece] rounded-md text-red-500 border border-red-500 font-semibold tracking-wider"
						// onClick={deleteSm}
					>
						Eliminar Solicitud
					</button>
					<button
						className="px-4 py-2 bg-cyan-700 rounded-md text-neutral-800 font-semibold tracking-wider"
						onClick={hadleShowTable}
					>
						Ver Tabla
					</button>
				</div>
				{showTable && (
					<DataTable
						columns={columns}
						data={events}
						onRowDoubleClicked={(row) => handleSelectedRow(row)}
						pagination
						paginationPerPage={10}
						progressPending={loading}
					/>
				)}
			</div>
		</section>
	);
}
