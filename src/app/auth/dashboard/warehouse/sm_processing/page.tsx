'use client';

import { TextInput } from '@/app/components';
import axios from 'axios';
import React, { use, useEffect, useState } from 'react';
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

const data = [
	{
		id: '5',
		name: 'Bandeja Modular para Fibra Óptica 2 U',
		stock: 2,
		comment: 'mmm  ;(Nuevo)  ;(Pedido)  ;(Despachado) ',
		quantity: 2,
	},
	{
		id: '1',
		name: 'Adaptador Ind riel Din en rack 4RU',
		stock: 28,
		comment: 'nada ;(Despachado) ',
		quantity: 2,
	},
];

export default function SmProcessingPage() {
	const [allSms, setAllSms] = useState([]);
	const [loading, setLoading] = useState(true);
	const [currentSm, setCurrentSm] = useState({ items: data, history: [] });

	const getAllSms = async () => {
		try {
			const response = await axios(
				`${process.env.NEXT_PUBLIC_API_HOST}/sm/all`,
				{
					method: 'POST',
					data: {
						limit: 100,
						page: 0,
					},
				}
			);

			const transformedData = response.data.data.map((sm: any) => ({
				...sm,
				history: JSON.stringify(sm.history),
				items: JSON.parse(sm.items),
			}));
			setAllSms(transformedData);
			setLoading(false);
		} catch (error) {
			console.error('Error fetching SMS data:', error);
			setLoading(false);
		}
	};

	const handleSmProcess = (row: any) => {
		const history = row.history;
		const items = row.items;
		const trimmedStringData1 = history.replace(/^['"]|['"]$/g, '');
		const trimmedStringData2 = items.replace(/^['"]|['"]$/g, '');
		const historyData = JSON.parse(trimmedStringData1);
		const itemsData = JSON.parse(trimmedStringData2);
		setCurrentSm((prev) => ({
			...prev,
			history: JSON.stringify(historyData),
			items: JSON.stringify(itemsData),
		}));
	};

	const handleInputChange = (
		e: React.ChangeEvent<HTMLInputElement>,
		id: string,
		field: string
	) => {
		const { value } = e.target;
		setCurrentSm((prev) => ({
			...prev,
			[id]: {
				...prev[id],
				[field]: value,
			},
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
					<div className="container mx-auto p-4">
						<h1 className="text-2xl font-bold mb-4">Productos</h1>
						<table className="min-w-full bg-white border border-gray-200">
							<thead>
								<tr>
									<th className="py-2 px-3 border-b">ID</th>
									<th className="py-2 px-3 border-b">Nombre</th>
									<th className="py-2 px-3 border-b">Stock</th>
									<th className="py-2 px-3 border-b">Comentarios</th>
									<th className="py-2 px-3 border-b">Cantidad</th>
								</tr>
							</thead>
							<tbody>
								{data.map((item) => (
									<tr key={item.id}>
										<td className="py-2 px-3 border-b">{item.id}</td>
										<td className="py-2 px-3 border-b">
											<input
												type="text"
												value={item.name}
												onChange={(e) => handleInputChange(e, item.id, 'name')}
												className="w-full border p-1"
											/>
										</td>
										<td className="py-2 px-3 border-b">
											<input
												type="number"
												value={item.stock}
												onChange={(e) => handleInputChange(e, item.id, 'stock')}
												className="w-full border p-1"
											/>
										</td>
										<td className="py-2 px-3 border-b">
											<input
												type="text"
												value={item.comment}
												onChange={(e) =>
													handleInputChange(e, item.id, 'comment')
												}
												className="w-full border p-1"
											/>
										</td>
										<td className="py-2 px-3 border-b">
											<input
												type="number"
												value={item.quantity}
												onChange={(e) =>
													handleInputChange(e, item.id, 'quantity')
												}
												className="w-full border p-1"
											/>
										</td>
									</tr>
								))}
							</tbody>
						</table>
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
					<p className="mb-2">SM</p>
					<DataTable
						columns={columns}
						data={allSms}
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
