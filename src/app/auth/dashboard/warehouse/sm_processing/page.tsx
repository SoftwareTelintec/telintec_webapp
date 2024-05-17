'use client';

import { TextInput } from '@/app/components';
import axios from 'axios';
import { comment } from 'postcss';
import React, { use, useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { set } from 'react-hook-form';
import { json } from 'stream/consumers';

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
		width: '200px',
	},
	{
		name: 'Comentarios',
		selector: (row: any) => row.comments,
		sortable: true,
		width: '400px',
	},
	{
		name: 'Productos',
		selector: (row: any) => row.items,
		width: '200px',
	},
];

export default function SmProcessingPage() {
	const [allSms, setAllSms] = useState([]);
	const [loading, setLoading] = useState(true);
	const [currentSm, setCurrentSm] = useState({ items: [], history: [] });

	const getAllSms = async () => {
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

	const handleSmProcess = (row: any) => {
		const data = row.history;
		const trimmedStringData = data.replace(/^['"]|['"]$/g, '');
		const jsonData = JSON.parse(trimmedStringData);
		setCurrentSm((prev) => ({
			...prev,
			history: jsonData,
		}));
	};

	useEffect(() => {
		getAllSms();
	}, []);

	return (
		<div className="flex flex-col p-10 ml-20 w-full gap-5 2xl:container 2xl:mx-auto">
			<h2 className="text-4xl text-neutral-200">
				Procesado de Solicitud de Material
			</h2>
			<div className="w-full h-auto border border-neutral-500/50 bg-neutral-800/20 rounded grid grid-cols-2 gap-4 px-4 py-6">
				<div className="flex flex-col gap-4">
					<div className="flex flex-col gap-2">
						<label htmlFor="products_sm">Productos del SM</label>
						<textarea
							name="products_sm"
							id="products_sm"
							className="min-h-40 rounded-md p-1"
						/>
					</div>
					<div className="flex flex-col gap-2">
						<label htmlFor="history_sm">Historial del SM</label>
						<textarea
							name="history_sm"
							id="history_sm"
							defaultValue={currentSm ? currentSm.history : ''}
							className="min-h-40 rounded-md p-1"
						/>
					</div>
				</div>
				<div>
					<DataTable
						columns={columns}
						data={allSms?.data}
						onRowDoubleClicked={(row) => handleSmProcess(row)}
						pagination
						paginationPerPage={10}
						progressPending={loading}
					/>
				</div>
			</div>
			<div className="flex flex-col gap-5 w-full">
				<div className="w-full flex gap-4 items-center justify-around px-4 py-6">
					<button className="px-4 py-2 bg-cyan-700 rounded-md text-neutral-800 font-semibold tracking-wider">
						Despachar
					</button>
					<button className="px-4 py-2 bg-cyan-700 rounded-md text-neutral-800 font-semibold tracking-wider">
						Actualizar
					</button>
					<button className="px-4 py-2 bg-[#cecece] rounded-md text-red-500 border border-red-500 font-semibold tracking-wider">
						Cancelar
					</button>
				</div>
			</div>
		</div>
	);
}