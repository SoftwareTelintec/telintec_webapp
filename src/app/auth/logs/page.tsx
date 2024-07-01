import React from 'react';
import { UnderConstruction } from '@/components/ui/UnderConstruction';
import MainContainer from '@/containers/MainContainer';

export default function LogsPage() {
	return (
		<MainContainer>
			<UnderConstruction />
		</MainContainer>
	);
}

// 'use client';

// import { useCallback, useEffect, useState } from 'react';
// import axios from 'axios';
// import { CalendarSelector, TextInput, MySelect } from '@/app/components';
// import { formatDate } from '@/utils';
// import debounce from 'lodash.debounce';
// import DataTable from 'react-data-table-component';
// import { useSession } from 'next-auth/react';
// import CustomModal from '@/app/components/ui/CustomModal';
// import useModal from '@/app/hooks/useModal';

// const contractsOptions = [
// 	{
// 		value: '0',
// 		label: 'AUTO',
// 	},
// 	{
// 		value: '1',
// 		label: 'ALMACEN',
// 	},
// 	{
// 		value: '2',
// 		label: 'GRUAS',
// 	},
// 	{
// 		value: '43',
// 		label: 'RFID',
// 	},
// 	{
// 		value: '4',
// 		label: 'OTROS',
// 	},
// 	{
// 		value: '5',
// 		label: 'OPERACIONES',
// 	},
// 	{
// 		value: '6',
// 		label: 'PUEBLA',
// 	},
// 	{
// 		value: '7',
// 		label: 'CCTV',
// 	},
// 	{
// 		value: '8',
// 		label: 'INFRA',
// 	},
// 	{
// 		value: '9',
// 		label: 'IPAD',
// 	},
// ];

// const eventsOptions = [
// 	{
// 		value: '0',
// 		label: 'FALTA',
// 	},
// 	{
// 		value: '1',
// 		label: 'ATRASO',
// 	},
// 	{
// 		value: '2',
// 		label: 'EXTRA',
// 	},
// 	{
// 		value: '3',
// 		label: 'NORMAL',
// 	},
// ];

// const placeOptions = [
// 	{
// 		value: '0',
// 		label: 'Guerrero',
// 	},
// 	{
// 		value: '1',
// 		label: 'Universidad',
// 	},
// 	{
// 		value: '2',
// 		label: 'Almacen',
// 	},
// 	{
// 		value: '3',
// 		label: 'Churubusco',
// 	},
// 	{
// 		value: '4',
// 		label: 'Mitras',
// 	},
// 	{
// 		value: '5',
// 		label: 'Lagos norte',
// 	},
// 	{
// 		value: '6',
// 		label: 'Juventud',
// 	},
// 	{
// 		value: '7',
// 		label: 'Pesqueria',
// 	},
// 	{
// 		value: '8',
// 		label: 'CSI',
// 	},
// 	{
// 		value: '9',
// 		label: 'CSC',
// 	},
// 	{
// 		value: '10',
// 		label: 'Edificio metalicos',
// 	},
// 	{
// 		value: '11',
// 		label: 'Nova',
// 	},
// 	{
// 		value: '12',
// 		label: 'Puebla',
// 	},
// 	{
// 		value: '13',
// 		label: 'San luis',
// 	},
// 	{
// 		value: '14',
// 		label: 'Otros',
// 	},
// ];

// const incidentsOptions = [
// 	{
// 		value: '0',
// 		label: 'ACUERDO',
// 	},
// 	{
// 		value: '1',
// 		label: 'PERMISO SIN GOSE',
// 	},
// 	{
// 		value: '2',
// 		label: 'FESTIVO',
// 	},
// 	{
// 		value: '3',
// 		label: 'VACACIONES',
// 	},
// 	{
// 		value: '4',
// 		label: 'INCAPACIDAD',
// 	},
// 	{
// 		value: '5',
// 		label: 'SUSPENSION',
// 	},
// ];

// const columns = [
// 	{
// 		name: 'ID',
// 		selector: (row: any) => row.id,
// 		width: '100px',
// 	},
// 	{
// 		name: 'Nombre',
// 		selector: (row: any) => row.name,
// 		sortable: true,
// 		width: '200px',
// 	},
// 	{
// 		name: 'Contrato',
// 		selector: (row: any) => row.contract,
// 		sortable: true,
// 		width: '200px',
// 	},
// 	{
// 		name: 'Evento',
// 		selector: (row: any) => row.event,
// 		sortable: true,
// 		width: '200px',
// 	},
// 	{
// 		name: 'Lugar',
// 		selector: (row: any) => row.location,
// 		sortable: true,
// 		width: '200px',
// 	},
// 	{
// 		name: 'Actividad',
// 		selector: (row: any) => row.activity,
// 		width: '200px',
// 	},
// 	{
// 		name: 'Timestamp',
// 		selector: (row: any) => row.timestamp,
// 		width: '200px',
// 	},
// 	{
// 		name: 'Valor',
// 		selector: (row: any) => row.value,
// 		width: '200px',
// 	},
// 	{
// 		name: 'Comentario',
// 		selector: (row: any) => row.comment,
// 		width: '200px',
// 	},
// ];

// interface Event {
// 	id: number;
// 	date: Date;
// 	event: {
// 		value: string;
// 		label: string;
// 	};
// 	hour: number;
// 	min: number;
// 	id_emp: {
// 		value: string;
// 		label: string;
// 	};
// 	contract: {
// 		value: string;
// 		label: string;
// 	};
// 	inicident: {
// 		value: string;
// 		label: string;
// 	};
// 	prima: boolean;
// 	activity: string;
// 	place: {
// 		value: string;
// 		label: string;
// 	};
// 	comments: string;
// }

// const INITIAL_EVENT: Event = {
// 	id: 0,
// 	id_emp: { value: '0', label: 'Selecciona un empleado' },
// 	contract: { value: '0', label: 'Selecciona un contrato' },
// 	date: new Date(),
// 	event: { value: '0', label: 'Selecciona un tipo de evento' },
// 	inicident: { value: '0', label: 'Selecciona un tipo de incidencia' },
// 	activity: '',
// 	place: { value: '0', label: 'Selecciona un lugar' },
// 	comments: '',
// 	prima: false,
// 	hour: 0,
// 	min: 0,
// };

// export default function LogsPage() {
// 	const [employees, setEmployees] = useState([]);
// 	const [events, setEvents] = useState([]);
// 	const [event, setEvent] = useState<Event>(INITIAL_EVENT);
// 	const [error, setError] = useState();
// 	const [showTable, setShowTable] = useState(false);
// 	const [loading, setLoading] = useState(true);
// 	const { modalIsOpen, modalMessage, openModal, closeModal, handleConfirm } =
// 		useModal();

// 	const getAllEvents = async () => {
// 		// ${process.env.${process.env.NEXT_PUBLIC_API_HOST}}
// 		await axios(`${process.env.NEXT_PUBLIC_API_HOST}/bitacora/fichaje/table`, {
// 			method: 'POST',
// 			data: {
// 				date: formatDate(new Date()),
// 			},
// 		})
// 			.then((response) => {
// 				const responseData = response.data;
// 				if (responseData && responseData.data && responseData.columns) {
// 					const { data } = responseData;
// 					const dataFormatted: any = [];
// 					data?.map((record: any, index: number) => {
// 						const obj = {
// 							id: index,
// 							idEmployee: record[0],
// 							name: record[1],
// 							contract: record[2],
// 							event: record[3],
// 							location: record[4],
// 							activity: record[5],
// 							timestamp: record[6],
// 							value: record[7],
// 							comment: record[8],
// 						};
// 						dataFormatted.push(obj);
// 						setEvents(dataFormatted);
// 						console.log(events);
// 					});
// 					setLoading(false);
// 				}
// 			})
// 			.catch((error) => {
// 				setError(error);
// 			});
// 	};

// 	const getAllEmployees = async () => {
// 		await axios(`${process.env.NEXT_PUBLIC_API_HOST}/bitacora/employees`, {
// 			method: 'GET',
// 		})
// 			.then((response) => {
// 				setEmployees(response.data);
// 			})
// 			.catch((error) => {
// 				setError(error);
// 			});
// 	};

// 	const employeesOptions = employees?.data?.map((employee) => ({
// 		value: employee[0],
// 		label:
// 			String(employee[1]).toUpperCase() +
// 			' ' +
// 			String(employee[2]).toUpperCase(),
// 	}));

// 	const hadleShowTable = () => {
// 		setShowTable(!showTable);
// 	};

// 	const handleSelectedRow = (row) => {
// 		const {
// 			id,
// 			idEmployee,
// 			name,
// 			contract,
// 			event,
// 			location,
// 			activity,
// 			timestamp,
// 			value,
// 			comment,
// 		} = row;
// 		setEvent({
// 			id: id,
// 			id_emp: { value: idEmployee, label: name },
// 			contract: { value: '0', label: contract },
// 			date: new Date(timestamp),
// 			event: { value: '0', label: event },
// 			inicident: { value: '0', label: 'Selecciona un tipo de incidencia' },
// 			activity: activity,
// 			place: { value: '0', label: location },
// 			comments: comment,
// 			prima: false,
// 			hour: 0,
// 			min: 0,
// 		});
// 		console.log(row);
// 	};

// 	const handleDate = (date) => {
// 		setEvent({ ...event, date });
// 	};

// 	const convertHHToMinutes = (hours: number, minutes: number) => {
// 		return (hours * 60 + minutes) / 60;
// 	};

// 	useEffect(() => {
// 		getAllEmployees();
// 	}, []);

// 	useEffect(() => {
// 		getAllEvents();
// 	}, [event.date]);

// 	const handleEvent = (selectedOption: { value: string; label: string }) => {
// 		const { value } = selectedOption;
// 		setEvent({
// 			...event,
// 			event: eventsOptions[value],
// 			inicident: { value: '0', label: 'Selecciona un tipo de incidencia' },
// 			activity: '',
// 			place: { value: '0', label: 'Selecciona un lugar' },
// 			comments: '',
// 			prima: false,
// 			hour: 0,
// 			min: 0,
// 		});
// 	};

// 	const handleEmployee = (selectedOption: { value: string; label: string }) => {
// 		const { value } = selectedOption;
// 		setEvent({
// 			...event,
// 			id_emp: employeesOptions.find((employee) => employee.value === value),
// 		});
// 	};

// 	const handleContract = (selectedOption: { value: string; label: string }) => {
// 		const { value } = selectedOption;
// 		setEvent({ ...event, contract: contractsOptions[value] });
// 	};

// 	const handleIncident = (selectedOption: { value: string; label: string }) => {
// 		const { value } = selectedOption;
// 		setEvent({ ...event, inicident: incidentsOptions[value] });
// 	};

// 	const handleInputChange = (e) => {
// 		const { name, value } = e.target;
// 		setEvent({ ...event, [name]: value });
// 	};

// 	const handlePlace = (selectedOption: { value: string; label: string }) => {
// 		const { value } = selectedOption;
// 		setEvent({ ...event, place: placeOptions[value] });
// 	};

// 	const handleCheckboxChange = () => {
// 		setEvent({ ...event, prima: !event.prima });
// 	};

// 	const clearFields = () => {
// 		setEvent(INITIAL_EVENT);
// 	};

// 	const postNewSm = async () => {
// 		const data = {
// 			id: 0,
// 			date: formatDate(event.date),
// 			event: event.event.label.toLowerCase(),
// 			value: convertHHToMinutes(event.hour, event.min),
// 			comment: event.comments,
// 			id_emp: event.id_emp.value,
// 			contract: event.contract.label,
// 		};
// 		await axios(`${process.env.NEXT_PUBLIC_API_HOST}/bitacora/fichaje/event`, {
// 			method: 'POST',
// 			data: data,
// 		})
// 			.then((response) => {
// 				console.log(response.data);
// 			})
// 			.catch((error) => {
// 				setError(error);
// 			});
// 	};

// 	const putNewSm = async () => {
// 		const data = {
// 			id: event.id,
// 			date: formatDate(event.date),
// 			event: event.event.label,
// 			value: convertHHToMinutes(event.hour, event.min),
// 			comment: event.comments,
// 			id_emp: event.id_emp.value,
// 			contract: event.contract.label,
// 		};
// 		await axios(`${process.env.NEXT_PUBLIC_API_HOST}/bitacora/fichaje/event`, {
// 			method: 'PUT',
// 			data: data,
// 		})
// 			.then((response) => {
// 				console.log(response.data);
// 			})
// 			.catch((error) => {
// 				setError(error);
// 			});
// 	};

// 	const deleteSm = async () => {
// 		const data = {
// 			id: event.id,
// 			date: formatDate(event.date),
// 			event: event.event.label,
// 			id_emp: event.id_emp.value,
// 			contract: event.contract.label,
// 		};
// 		await axios(`${process.env.NEXT_PUBLIC_API_HOST}/bitacora/fichaje/event`, {
// 			method: 'DELETE',
// 			data: data,
// 		})
// 			.then((response) => {
// 				console.log(response.data);
// 			})
// 			.catch((error) => {
// 				setError(error);
// 			});
// 	};

// 	return (
// 		<section className="flex flex-col p-10 ml-20 w-full gap-5 2xl:container 2xl:mx-auto">
// 			<h2 className="text-4xl text-neutral-200">Bitacora</h2>
// 			<div className="w-full h-auto border border-neutral-500/50 bg-neutral-800/20 rounded grid grid-cols-2 gap-4 px-4 py-6">
// 				<MySelect
// 					label="Empleado"
// 					placeholder="Selecciona un empleado"
// 					options={employeesOptions}
// 					value={
// 						event?.id_emp
// 							? event.id_emp
// 							: { label: '', value: 'Selecciona un empleado' }
// 					}
// 					onChange={handleEmployee}
// 				/>
// 				<MySelect
// 					label="Contrato"
// 					placeholder="Selecciona un contrato"
// 					options={contractsOptions}
// 					value={
// 						event?.contract
// 							? event.contract
// 							: { label: '', value: 'Selecciona un contrato' }
// 					}
// 					onChange={handleContract}
// 				/>
// 				<CalendarSelector
// 					label="Fecha"
// 					selectedDate={event.date}
// 					onChange={handleDate}
// 				/>
// 				<MySelect
// 					label="Evento"
// 					placeholder="Selecciona un evento"
// 					options={eventsOptions}
// 					value={event.event}
// 					onChange={handleEvent}
// 				/>
// 				{event.event.value === '0' && (
// 					<MySelect
// 						label="Incidencia"
// 						placeholder="Selecciona una incidencia"
// 						options={incidentsOptions}
// 						onChange={handleIncident}
// 						value={event.inicident}
// 					/>
// 				)}

// 				{event.event.value === '1' ||
// 					(event.event.value === '2' && (
// 						<div className="flex gap-4">
// 							<TextInput
// 								id="hours"
// 								label="Horas"
// 								name="hours"
// 								placeholder="HH"
// 								onChange={(e) => handleInputChange(e)}
// 								defaultValue={event?.hour ? String(event.hour) : ''}
// 							/>
// 							<TextInput
// 								id="mins"
// 								label="Minutos"
// 								name="mins"
// 								placeholder="MM"
// 								onChange={(e) => handleInputChange(e)}
// 								defaultValue={event?.min ? String(event.min) : ''}
// 							/>
// 						</div>
// 					))}

// 				{event.event.value === '2' && (
// 					<div className="flex gap-4">
// 						<div className="flex flex-col items-center justify-center w-1/3">
// 							<label htmlFor="prima">Aplica prima</label>
// 							<input
// 								type="checkbox"
// 								name="prima"
// 								id="prima"
// 								className="w-8 h-4 cursor-pointer mt-2"
// 								onChange={handleCheckboxChange}
// 								value={String(event?.prima)}
// 							/>
// 						</div>
// 					</div>
// 				)}

// 				<TextInput
// 					id="activity"
// 					label="Actividad"
// 					name="activity"
// 					placeholder="Ingresa la actividad a realizar"
// 					onChange={(e) => handleInputChange(e)}
// 					defaultValue={event?.activity ? String(event.activity) : ''}
// 				/>

// 				<MySelect
// 					label="Lugar"
// 					placeholder="Selecciona un lugar"
// 					options={placeOptions.map((option) => ({
// 						...option,
// 						label: option.label.toUpperCase(),
// 					}))}
// 					value={
// 						event?.place
// 							? event.place
// 							: { label: '', value: 'Selecciona un Lugar' }
// 					}
// 					onChange={handlePlace}
// 				/>

// 				<TextInput
// 					id="comments"
// 					label="Comentarios"
// 					name="comments"
// 					placeholder="Ingresa el comentario"
// 					defaultValue={event?.comments ? String(event.comments) : ''}
// 					onChange={(e) => handleInputChange(e)}
// 				/>
// 			</div>

// 			<div className="flex flex-col gap-5 w-full">
// 				<div className="w-full flex gap-4 items-center justify-around px-4 py-6">
// 					<button
// 						className="px-4 py-2 bg-cyan-700 rounded-md text-neutral-800 font-semibold tracking-wider"
// 						onClick={clearFields}
// 					>
// 						Limpiar Campos
// 					</button>
// 					<button
// 						className="px-4 py-2 bg-cyan-700 rounded-md text-neutral-800 font-semibold tracking-wider"
// 						onClick={() =>
// 							openModal('¿Estás seguro de agregar la solicitud?', postNewSm)
// 						}
// 					>
// 						Agregar Solicitud
// 					</button>
// 					<button
// 						className="px-4 py-2 bg-cyan-700 rounded-md text-neutral-800 font-semibold tracking-wider"
// 						onClick={() =>
// 							openModal('¿Estás seguro de actualizar la solicitud?', putNewSm)
// 						}
// 					>
// 						Actualizar Solicitud
// 					</button>
// 					<button
// 						className="px-4 py-2 bg-[#cecece] rounded-md text-red-500 border border-red-500 font-semibold tracking-wider"
// 						onClick={() =>
// 							openModal('¿Estás seguro de eliminar la solicitud?', deleteSm)
// 						}
// 					>
// 						Eliminar Solicitud
// 					</button>
// 					<button
// 						className="px-4 py-2 bg-cyan-700 rounded-md text-neutral-800 font-semibold tracking-wider"
// 						onClick={hadleShowTable}
// 					>
// 						Ver Tabla
// 					</button>
// 				</div>
// 				{showTable && (
// 					<DataTable
// 						columns={columns}
// 						data={events}
// 						onRowDoubleClicked={(row) => handleSelectedRow(row)}
// 						pagination
// 						paginationPerPage={10}
// 						progressPending={loading}
// 					/>
// 				)}
// 			</div>
// 			<CustomModal
// 				isOpen={modalIsOpen}
// 				onRequestClose={closeModal}
// 				onConfirm={handleConfirm}
// 				message={modalMessage}
// 			/>
// 		</section>
// 	);
// }
