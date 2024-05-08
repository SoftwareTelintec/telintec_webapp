'use client';

import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { CalendarSelector, TextInput, MySelect } from '@/app/components';
import { formatDate } from '@/utils';
import debounce from 'lodash.debounce';
import DataTable from 'react-data-table-component';

const columns = [
	{
		name: 'ID',
		selector: (row: any) => row.id,
		width: '100px',
	},
	{
		name: 'Codigo de SM',
		selector: (row: any) => row.sm_code,
		width: '100px',
	},
	{
		name: 'Folio',
		selector: (row: any) => row.folio,
		sortable: true,
		width: '100px',
	},
	{
		name: 'Contrato',
		selector: (row: any) => row.contract,
		sortable: true,
		width: '100px',
	},
	{
		name: 'Planta',
		selector: (row: any) => row.facility,
		sortable: true,
		width: '100px',
	},
	{
		name: 'Área',
		selector: (row: any) => row.location,
		sortable: true,
		width: '100px',
	},
	{
		name: 'Cliente',
		selector: (row: any) => row.client_id,
		sortable: true,
		width: '100px',
	},
	{
		name: 'Número de orden',
		selector: (row: any) => row.order_quotation,
		sortable: true,
		width: '100px',
	},
	{
		name: 'Personal',
		selector: (row: any) => row.emp_id,
		sortable: true,
		width: '100px',
	},
	{
		name: 'Fecha de inicio',
		selector: (row: any) => row.date,
		sortable: true,
		width: '200px',
	},
	{
		name: 'Fecha de fin',
		selector: (row: any) => row.limit_date,
		sortable: true,
		width: '200px',
	},
	{
		name: 'Estado de la orden',
		selector: (row: any) => row.status,
		sortable: true,
		width: '200px',
	},
	{
		name: 'Historial',
		selector: (row: any) => row.history,
		sortable: true,
	},
	{
		name: 'Comentarios',
		selector: (row: any) => row.comments,
		sortable: true,
		width: '400px',
	},
];

const INITIAL_STATE = {
	id: 0,
	sm_code: '',
	folio: '',
	contract: '',
	facility: '',
	location: '',
	client_id: '',
	order_quotation: '',
	emp_id: '',
	date: new Date(),
	limit_date: new Date(),
	status: '',
	history: '',
	comments: '',
};

export default function MaterialRequest() {
	const [showTable, setShowTable] = useState(false);
	const [allSms, setAllSms] = useState([]);
	const [sm, setSm] = useState(INITIAL_STATE);
	const [loading, setLoading] = useState(true);

	const fetchAllSms = async () => {
		await axios('http://localhost:5000/GUI/api/v1/sm/all', {
			method: 'POST',
			data: {
				limit: 100,
				page: 0,
			},
		})
			.then((response) => {
				setAllSms(response.data);
				setLoading(false);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	const handleSelectedRow = (row: any) => {
		console.log(row);
	};

	const hadleShowTable = () => {
		setShowTable(!showTable);
	};

	const debouncedHandleInputChange = useCallback(
		debounce((name, value) => {
			setSm((prev): any => ({
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

	const handleSubmit = (e) => {
		e.preventDefault();
	};

	const clearFields = () => {
		setSm(INITIAL_STATE);
	};

	useEffect(() => {
		fetchAllSms();
	}, []);

	return (
		<section className="flex flex-col p-10 ml-20 w-full gap-5 2xl:container 2xl:mx-auto">
			<h2 className="text-4xl text-neutral-200">Solicitud de Material</h2>
			<div className="w-full h-auto border border-neutral-500/50 bg-neutral-800/20 rounded grid grid-cols-2 gap-4 px-4 py-6">
				<TextInput
					label="Codigo de SM"
					name="sm_code"
					placeholder="Ingresa el codigo de la SM"
					onChange={(e) => handleInputChange(e)}
					defaultValue={sm?.sm_code ? String(sm.sm_code) : ''}
				/>
				<TextInput
					label="Folio"
					name="folio"
					placeholder="Ingresa el folio de la SM"
					onChange={(e) => handleInputChange(e)}
					defaultValue={sm?.folio ? String(sm.folio) : ''}
				/>
				<TextInput
					label="Contrato"
					name="contract"
					placeholder="Ingresa el contrato de la SM"
					onChange={(e) => handleInputChange(e)}
					defaultValue={sm?.contract ? String(sm.contract) : ''}
				/>
				<TextInput
					label="Planta"
					name="facility"
					placeholder="Ingresa la planta de la SM"
					onChange={(e) => handleInputChange(e)}
					defaultValue={sm?.facility ? String(sm.facility) : ''}
				/>
				<TextInput
					label="Ubicacion"
					name="location"
					placeholder="Ingresa la Ubicacion de la SM"
					onChange={(e) => handleInputChange(e)}
					defaultValue={sm?.location ? String(sm.location) : ''}
				/>
				<TextInput
					label="Cliente"
					name="client_id"
					placeholder="Ingresa el cliente"
					onChange={(e) => handleInputChange(e)}
					defaultValue={sm?.client_id ? String(sm.client_id) : ''}
				/>
				<TextInput
					label="Número de orden"
					name="order_quotation"
					placeholder="Ingresa el número de orden"
					onChange={(e) => handleInputChange(e)}
					defaultValue={sm?.order_quotation ? String(sm.order_quotation) : ''}
				/>
				<TextInput
					label="Personal"
					name="emp_id"
					placeholder="Ingresa el personal"
					onChange={(e) => handleInputChange(e)}
					defaultValue={sm?.emp_id ? String(sm.emp_id) : ''}
				/>
				<TextInput
					label="Estado de la orden"
					name="status"
					placeholder="Ingresa el estado de la orden"
					onChange={(e) => handleInputChange(e)}
					defaultValue={sm?.status ? String(sm.status) : ''}
				/>
				<TextInput
					label="Historial"
					name="history"
					placeholder="Ingresa el historial"
					onChange={(e) => handleInputChange(e)}
					defaultValue={sm?.history ? String(sm.history) : ''}
				/>
				<TextInput
					label="Comentarios"
					name="comments"
					placeholder="Ingresa los comentarios"
					onChange={(e) => handleInputChange(e)}
					defaultValue={sm?.comments ? String(sm.comments) : ''}
				/>
			</div>
			<div className="flex flex-col gap-5 w-full">
				<div className="w-full flex gap-4 items-center justify-around px-4 py-6">
					<button
						className="px-4 py-2 bg-cyan-700 rounded-md text-neutral-800 font-semibold tracking-wider"
						onClick={clearFields}
					>
						Limpiar Campos
					</button>
					<button className="px-4 py-2 bg-cyan-700 rounded-md text-neutral-800 font-semibold tracking-wider">
						Agregar Solicitud
					</button>
					<button className="px-4 py-2 bg-cyan-700 rounded-md text-neutral-800 font-semibold tracking-wider">
						Actualizar Solicitud
					</button>
					<button className="px-4 py-2 bg-[#cecece] rounded-md text-red-500 border border-red-500 font-semibold tracking-wider">
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
						data={allSms?.data}
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
