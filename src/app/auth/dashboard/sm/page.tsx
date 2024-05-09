'use client';

import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { CalendarSelector, TextInput, MySelect } from '@/app/components';
import { formatDate } from '@/utils';
import debounce from 'lodash.debounce';
import DataTable from 'react-data-table-component';
import { useSession } from 'next-auth/react';

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
	{
		name: 'Productos',
		selector: (row: any) => row.items,
	},
];

const INITIAL_STATE = {
	id: 0,
	sm_code: '',
	folio: '',
	contract: '',
	facility: '',
	location: '',
	client_id: { label: '', value: '' },
	order_quotation: '',
	emp_id: { name: '', id: 0 },
	date: new Date(),
	limit_date: new Date(),
	status: { label: '', value: '' },
	history: '',
	comments: '',
	items: [],
};

const statusOptions = [
	{ value: '0', label: 'En proceso' },
	{ value: '1', label: 'Pendiente' },
	{ value: '2', label: 'Completada' },
	{ value: '3', label: 'Enviada' },
];

interface Product {
	id: number;
	name: string;
	udm: string;
	stock: number;
}

export default function MaterialRequest() {
	const [showTable, setShowTable] = useState(false);
	const [allSms, setAllSms] = useState([]);
	const [sm, setSm] = useState(INITIAL_STATE);
	const [loading, setLoading] = useState(true);
	const [clients, setClients] = useState([]);
	const [products, setProducts] = useState([]);
	const [isClientsModalOpen, setIsClientsModalOpen] = useState(false);
	const [isProductsModalOpen, setIsProductsModalOpen] = useState(false);
	const [isProductAdded, setIsProductAdded] = useState(false);
	const session = useSession();

	const getAllProducts = async () => {
		await axios('http://localhost:5000/GUI/api/v1/sm/products', {
			method: 'POST',
			data: {
				limit: 1000,
				page: 0,
			},
		})
			.then((response) => {
				const formattedProducts = response?.data?.data.map(
					(product: Product) => ({
						value: product.id,
						label: `${product.name} - stock: ${product.stock}`,
					})
				);
				const filterPerStock = formattedProducts.filter(
					(product: any) => product.label.split(':')[1] > 0
				);
				setProducts(filterPerStock);
			})
			.catch((error) => {
				console.log(error);
			});
	};

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

	const getAllClients = async () => {
		await axios
			.get('http://localhost:5000/GUI/api/v1/sm/clients')
			.then((response) => {
				setClients(response?.data);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	const clientsOptions = clients?.data?.map((client) => ({
		value: client[0],
		label: client[1],
	}));

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

	const handleClientChange = (e: any) => {
		setSm((prev): any => ({
			...prev,
			client_id: e,
		}));
	};

	const handleStatusChange = (e: any) => {
		setSm((prev): any => ({
			...prev,
			status: e,
		}));
	};

	const handleSelectedProducts = (selectedOption: any) => {
		setSm({ ...sm, items: selectedOption });
	};

	const clearFields = () => {
		setSm(INITIAL_STATE);
	};

	const handleAddProductsToSm = () => {
		setIsProductAdded(true);
	};

	const handleClearProducts = () => {
		setIsProductAdded(false);
		setSm({ ...sm, items: [] });
	};

	useEffect(() => {
		getAllProducts();
		getAllSms();
		getAllClients();
	}, []);

	useEffect(() => {
		if (session.status === 'authenticated') {
			setSm({
				...sm,
				emp_id: {
					id: session?.data?.user?.name?.id,
					name: session?.data?.user?.name?.name,
				},
			});
		}
	}, [session]);

	return (
		<section className="flex flex-col p-10 ml-20 w-full gap-5 2xl:container 2xl:mx-auto">
			<h2 className="text-4xl text-neutral-200">Solicitud de Material</h2>
			<div className="w-full h-auto border border-neutral-500/50 bg-neutral-800/20 rounded grid grid-cols-2 gap-4 px-4 py-6">
				<TextInput
					id="sm_code"
					label="Codigo de SM"
					name="sm_code"
					placeholder="Ingresa el codigo de la SM"
					onChange={(e) => handleInputChange(e)}
					defaultValue={sm?.sm_code ? String(sm.sm_code) : ''}
				/>
				<TextInput
					id="folio"
					label="Folio"
					name="folio"
					placeholder="Ingresa el folio de la SM"
					onChange={(e) => handleInputChange(e)}
					defaultValue={sm?.folio ? String(sm.folio) : ''}
				/>
				<TextInput
					id="contract"
					label="Contrato"
					name="contract"
					placeholder="Ingresa el contrato de la SM"
					onChange={(e) => handleInputChange(e)}
					defaultValue={sm?.contract ? String(sm.contract) : ''}
				/>
				<TextInput
					id="facility"
					label="Planta"
					name="facility"
					placeholder="Ingresa la planta de la SM"
					onChange={(e) => handleInputChange(e)}
					defaultValue={sm?.facility ? String(sm.facility) : ''}
				/>
				<TextInput
					id="location"
					label="Ubicacion"
					name="location"
					placeholder="Ingresa la Ubicacion de la SM"
					onChange={(e) => handleInputChange(e)}
					defaultValue={sm?.location ? String(sm.location) : ''}
				/>
				<MySelect
					label="Cliente"
					placeholder="Selecciona un cliente"
					options={clientsOptions ? clientsOptions : []}
					value={sm?.client_id ? sm.client_id : { label: '', value: '' }}
					onChange={(e) => handleClientChange(e)}
				/>
				<TextInput
					id="order_quotation"
					label="Número de orden"
					name="order_quotation"
					placeholder="Ingresa el número de orden"
					onChange={(e) => handleInputChange(e)}
					defaultValue={sm?.order_quotation ? String(sm.order_quotation) : ''}
				/>
				<TextInput
					id="emp_id"
					label="Personal"
					name="emp_id"
					placeholder="Ingresa el personal"
					onChange={(e) => handleInputChange(e)}
					disabled
					defaultValue={sm?.emp_id.name ? String(sm.emp_id.name) : ''}
				/>
				<MySelect
					label="Estatus"
					placeholder="Selecciona un estatus"
					options={statusOptions}
					value={sm?.status ? sm.status : { label: '', value: '' }}
					onChange={(e) => handleStatusChange(e)}
				/>
				<TextInput
					id="history"
					label="Historial"
					name="history"
					placeholder="Ingresa el historial"
					onChange={(e) => handleInputChange(e)}
					defaultValue={sm?.history ? String(sm.history) : ''}
				/>
				<TextInput
					id="comments"
					label="Comentarios"
					name="comments"
					placeholder="Ingresa los comentarios"
					onChange={(e) => handleInputChange(e)}
					defaultValue={sm?.comments ? String(sm.comments) : ''}
				/>
			</div>
			<div className="flex flex-col gap-4">
				<MySelect
					label="Selector de productos"
					placeholder="Selecciona un producto"
					options={products ? products : []}
					value={sm?.items}
					isMulti
					onChange={handleSelectedProducts}
				/>
				<div className="col-span-2 flex gap-6 mb-4">
					<button
						className="mt-6 border border-[#cccccc] rounded-md p-2 w-full hover:bg-slate-100 transition-all duration-100 ease-in"
						onClick={handleAddProductsToSm}
					>
						Agregar Productos
					</button>
					<input
						type="button"
						className="mt-6 border border-[#cccccc] rounded-md p-2 w-full hover:bg-slate-100 transition-all duration-100 ease-in"
						onClick={handleClearProducts}
						value="Limpiar Productos"
					/>
				</div>
				<div className="grid grid-cols-2 gap-4">
					{isProductAdded &&
						sm?.items.map((item: any) => (
							<div
								key={item.value}
								className="flex gap-4 items-center justify-between border border-[#cccccc] bg-neutral-800/20 p-4 rounded-md w-full"
							>
								<TextInput
									id="product_name"
									label="Nombre del Producto"
									name="product_name"
									disabled
									placeholder="Nombre del producto"
									defaultValue={String(item.label).split(' - ')[0]}
								/>
								<TextInput
									id="current_stock"
									label="Stock Actual"
									name="current_stock"
									disabled
									placeholder="Cantidad actual en stock"
									defaultValue={String(item.label).split(':')[1]}
								/>
								<TextInput
									id="quantity"
									label="Cantidad a solicitar"
									name="quantity"
									placeholder="Ingresa la cantidad a pedir"
									// onChange={(e) => handleInputChange(e)}
									// defaultValue={sm?.comments ? String(sm.comments) : ''}
								/>
							</div>
						))}
				</div>
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
