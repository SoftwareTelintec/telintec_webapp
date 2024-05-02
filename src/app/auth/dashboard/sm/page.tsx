'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { CalendarSelector, TextInput, MySelect } from '@/app/components';
import { PlusIcon, XIcon } from 'lucide-react';

interface SelectedOptions {
	client: string;
	orderStatus: string;
}

const formatDate = (date: Date) => {
	const day = date.getDate();
	const month = date.getMonth() + 1;
	const year = date.getFullYear();
	return `${year}-${month}-${day}`;
};

export default function MaterialRequest() {
	const [dataForm, setDataForm] = useState({
		smCode: '',
		folio: '',
		contract: '',
		orderNumber: '',
		plant: '',
		area: '',
		client: '',
		personal: '',
		orderStatus: '',
		history: '',
		comments: '',
		products: [],
		startDate: new Date(),
		endDate: new Date(),
	});
	const [clients, setClients] = useState([]);
	const [products, setProducts] = useState([]);
	const [isClientsModalOpen, setIsClientsModalOpen] = useState(false);
	const [isProductsModalOpen, setIsProductsModalOpen] = useState(false);
	const [isProductAdded, setIsProductAdded] = useState(false);

	const fetchClients = async () => {
		try {
			const response = await axios.get(
				'http://localhost:5000/GUI/api/v1/sm/clients'
			);
			setClients(response?.data);
		} catch (error) {
			console.error(error);
		}
	};

	const statusOptions = [
		{ value: '0', label: 'En proceso' },
		{ value: '1', label: 'Pendiente' },
		{ value: '2', label: 'Completada' },
		{ value: '3', label: 'Enviada' },
	];

	const clientOptions = clients?.data?.map((client) => ({
		value: client[0],
		label: client[1],
	}));

	const handleSelectedProducts = (selectedOption) => {
		setDataForm({ ...dataForm, products: selectedOption });
	};
	const fetchProducts = async () => {
		try {
			const response = await axios.post(
				'http://localhost:5000/GUI/api/v1/sm/products',
				{
					limit: 200,
					page: 0,
				}
			);
			const formattedProducts = response?.data?.data.map((product) => ({
				value: product.id,
				label: `${product.name} - stock: ${product.stock}`,
			}));
			const filterPerStock = formattedProducts.filter(
				(product) => product.label.split(':')[1] > 0
			);
			setProducts(filterPerStock);
		} catch (error) {
			console.error(error);
		}
	};

	const handleProducts = () => {
		if (!dataForm.products) return console.log('No products selected');
		setIsProductAdded(true);
	};

	const handleSelectChange = (
		e: React.ChangeEvent<HTMLSelectElement>,
		selector: keyof SelectedOptions
	) => {
		setDataForm((prevState) => ({
			...prevState,
			[selector]: e.target.value,
		}));
	};

	const handleSelectClientChange = (selectedOption: any) => {
		setDataForm((prevState) => ({
			...prevState,
			client: selectedOption,
		}));
	};

	const handleSelectStatusChange = (selectedOption: any) => {
		setDataForm((prevState) => ({
			...prevState,
			orderStatus: selectedOption,
		}));
	};

	const handleStartDateChange = (date: Date | null) => {
		setDataForm((prevState) => ({
			...prevState,
			startDate: date as Date,
		}));
	};

	const handleEndDateChange = (date: Date | null) => {
		setDataForm((prevState) => ({
			...prevState,
			endDate: date as Date,
		}));
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
	};

	useEffect(() => {
		fetchProducts();
		fetchClients();
	}, []);

	return (
		<section className="flex flex-col p-10 ml-20 w-full gap-5 2xl:container 2xl:mx-auto relative overflow-auto">
			<h2 className="text-3xl font-semibold tracking-wide mb-4">
				Solicitud de Materiales
			</h2>
			<form onSubmit={handleSubmit} className="flex flex-col gap-6 px-4 py-2">
				<div className="flex items-center justify-center">
					<CalendarSelector
						label="Fecha de Solicitud"
						selectedDate={dataForm.startDate}
						onChange={handleStartDateChange}
					/>
					<CalendarSelector
						label="Fecha limite de entrega"
						selectedDate={dataForm.endDate}
						onChange={handleEndDateChange}
					/>
				</div>
				<div className="grid grid-cols-2 gap-6">
					<TextInput
						label="Codigo SM"
						placeholder="Ingresa el codigo de solicitud"
						onChange={(e) =>
							setDataForm({ ...dataForm, smCode: e.target.value })
						}
					/>
					<TextInput
						label="Folio"
						placeholder="Ingresa el folio"
						onChange={(e) =>
							setDataForm({ ...dataForm, folio: e.target.value })
						}
					/>
					<TextInput
						label="Contrato"
						placeholder="Ingresa el contrato asignado"
						onChange={(e) =>
							setDataForm({ ...dataForm, contract: e.target.value })
						}
					/>
					<TextInput
						label="Numero de Pedido / Cotizacion"
						placeholder="Ingresa el numero de pedido o cotizacion"
						onChange={(e) =>
							setDataForm({ ...dataForm, orderNumber: e.target.value })
						}
					/>
					<TextInput
						label="Planta"
						placeholder="Ingresa la planta asignada"
						onChange={(e) =>
							setDataForm({ ...dataForm, plant: e.target.value })
						}
					/>
					<TextInput
						label="Area"
						placeholder="Ingresa el area asignada"
						onChange={(e) => setDataForm({ ...dataForm, area: e.target.value })}
					/>
					<div className="w-full flex flex-col items-start gap-2 justify-center">
						<label>Cliente</label>
						<div className="flex items-center justify-center gap-2 w-full">
							<MySelect
								placeholder="Selecciona un cliente"
								options={clientOptions}
								value={dataForm?.client}
								onChange={handleSelectClientChange}
							/>
							<button
								className="bg-indigo-600/50 rounded-full p-1 hover:scale-105"
								onClick={() => setIsClientsModalOpen(true)}
							>
								<PlusIcon size={20} className="" />
							</button>
						</div>
					</div>
					<TextInput
						label="Personal"
						placeholder="Nombre del Empleado"
						disabled
					/>
					<div className="w-full flex flex-col items-start gap-2 justify-center">
						<label>Estatus de la Orden</label>
						<MySelect
							placeholder="Selecciona un estatus"
							options={statusOptions}
							value={dataForm?.orderStatus}
							onChange={handleSelectStatusChange}
						/>
					</div>
					<TextInput
						label="Comentarios"
						placeholder="Ingresa los comentarios de la solicitud"
						onChange={(e) =>
							setDataForm({ ...dataForm, comments: e.target.value })
						}
					/>
					<TextInput
						label="Historial"
						placeholder="Historial de la solicitud"
						disabled
					/>
				</div>
				<div className="w-full col-span-2">
					<label>Productos</label>
					<div className="flex items-center justify-center gap-2">
						<MySelect
							options={products}
							isMulti
							value={dataForm.products}
							onChange={handleSelectedProducts}
							placeholder="Selecciona los productos"
						/>
						<button
							className="bg-indigo-600/50 rounded-full p-1 hover:scale-105"
							onClick={() => setIsProductsModalOpen(true)}
						>
							<PlusIcon size={20} className="" />
						</button>
					</div>
					<input
						type="button"
						className="mt-4 border border-[#cccccc] rounded-md p-2 w-full hover:bg-slate-100 transition-all duration-100 ease-in"
						onClick={handleProducts}
						defaultValue="Agregar productos"
					/>
					{isProductAdded && (
						<div className="mt-4">
							<h3 className="text-2xl font-semibold mb-4">
								Productos Agregados
							</h3>
							<div className="flex items-center gap-2 justify-center flex-wrap overflow-hidden">
								{dataForm?.products?.map((product) => (
									<div
										key={product?.value}
										className="flex flex-wrap items-center justify-start gap-4 border border-[#cccccc] rounded-md p-2 w-full"
									>
										<div className="grid grid-cols-1 w-full">
											<label htmlFor="">Producto</label>
											<input
												type="text"
												className="border border-[#cccccc] rounded-md p-1 w-1/6"
												value={product?.value}
											/>
										</div>
										<div className="grid grid-cols-1 w-full">
											<label htmlFor="">Descripcion</label>
											<input
												type="text"
												className="border border-[#cccccc] rounded-md p-1 w-full"
												value={product?.label}
											/>
										</div>

										<div className="grid grid-cols-1 w-full">
											<label htmlFor="">Cantidad de productos</label>
											<input
												type="text"
												className="border border-[#cccccc] rounded-md p-1 w-full"
												placeholder="cantidad"
												onChange={(e) => {
													const newProducts = dataForm?.products?.map(
														(prod) => {
															if (prod?.value === product?.value) {
																prod.quantity = e.target?.value;
															}
															return prod;
														}
													);
													setDataForm({ ...dataForm, products: newProducts });
												}}
											/>
										</div>

										<div className="grid grid-cols-1 w-full">
											<label htmlFor="">Comentarios adicionales</label>
											<input
												type="text"
												className="border border-[#cccccc] rounded-md p-1 w-full"
												placeholder="Comentarios / Estado"
												onChange={(e) => {
													const newProducts = dataForm?.products?.map(
														(prod) => {
															if (prod?.value === product?.value) {
																prod.comment = e.target.value;
															}
															return prod;
														}
													);
													setDataForm({ ...dataForm, products: newProducts });
												}}
											/>
										</div>
									</div>
								))}
							</div>
						</div>
					)}
				</div>
				<div className="col-span-2 flex gap-6">
					<button className="mt-6 border border-[#cccccc] rounded-md p-2 w-full hover:bg-slate-100 transition-all duration-100 ease-in">
						Agregar Solicitud
					</button>
					<input
						type="button"
						className="mt-4 border border-[#cccccc] rounded-md p-2 w-full hover:bg-slate-100 transition-all duration-100 ease-in"
						// onClick={handleCancel}
						value="Cancelar Solicitud"
					/>
				</div>
			</form>
			{isProductsModalOpen && (
				<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
					<div className="rounded-md border bg-slate-100 shadow-lg w-[400px] p-4">
						<div className="flex items-center justify-between p-4">
							<h3 className="text-2xl font-semibold">Agregar Producto</h3>
							<button
								className="text-2xl font-semibold"
								onClick={() => setIsProductsModalOpen(false)}
							>
								<XIcon size={20} />
							</button>
						</div>
						<div className="px-4 py-2 flex flex-col gap-2">
							<TextInput
								label="Nombre del producto"
								placeholder="Ingresa el nombre del producto"
							/>
							<TextInput
								label="SKU del producto"
								placeholder="Ingresa el sku del producto"
							/>
							<TextInput
								label="UDM del producto"
								placeholder="Ingresa la UDM del producto"
							/>
							<TextInput
								label="Stock del producto"
								placeholder="Ingresa el stock del producto"
							/>
							<div>
								<label htmlFor="">Categoria del producto</label>
								<MySelect placeholder="Selecciona una categoria" />
							</div>
							<input
								type="button"
								className="mt-4 border border-[#cccccc] rounded-md p-2 w-full hover:bg-slate-100 transition-all duration-100 ease-in"
								onClick={handleProducts}
								defaultValue="Agregar producto"
							/>
						</div>
					</div>
				</div>
			)}
			{isClientsModalOpen && (
				<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
					<div className="rounded-md border bg-slate-100 shadow-lg w-[400px] p-4">
						<div className="flex items-center justify-between p-4">
							<h3 className="text-2xl font-semibold">Agregar Cliente</h3>
							<button
								className="text-2xl font-semibold"
								onClick={() => setIsClientsModalOpen(false)}
							>
								<XIcon size={20} />
							</button>
						</div>
						<div className="px-4 py-2 flex flex-col gap-2">
							<TextInput
								label="Nombre del Cliente"
								placeholder="Ingresa el nombre del cliente"
							/>
							<TextInput
								label="Email del Cliente"
								placeholder="Ingresa el email del cliente"
							/>
							<TextInput
								label="Telefono del Cliente"
								placeholder="Ingresa el telefono del cliente"
							/>
							<TextInput
								label="RFC del Cliente"
								placeholder="Ingresa el RFC del cliente"
							/>
							<TextInput
								label="Direccion del Cliente"
								placeholder="Ingresa la direccion del cliente"
							/>
							<input
								type="button"
								className="mt-4 border border-[#cccccc] rounded-md p-2 w-full hover:bg-slate-100 transition-all duration-100 ease-in"
								// onClick={handleProducts}
								defaultValue="Agregar Cliente"
							/>
						</div>
					</div>
				</div>
			)}
		</section>
	);
}
