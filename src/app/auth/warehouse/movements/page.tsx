import React from 'react';
import { UnderConstruction } from '@/components/ui/UnderConstruction';
import MainContainer from '@/containers/MainContainer';

export default function MovementsPage() {
	return (
		<MainContainer>
			<UnderConstruction />
		</MainContainer>
	);
}

// 'use client';

// import { CalendarSelector, MySelect, TextInput } from '@/app/components';
// import CustomModal from '@/app/components/ui/CustomModal';
// import useModal from '@/app/hooks/useModal';
// import { formatDate } from '@/utils';
// import axios from 'axios';
// import debounce from 'lodash.debounce';
// import { useCallback, useEffect, useState } from 'react';
// import DataTable from 'react-data-table-component';

// const columns = [
// 	{
// 		name: 'ID',
// 		selector: (row: any) => row.id,
// 		width: '100px',
// 	},
// 	{
// 		name: 'ID Producto',
// 		selector: (row: any) => row.id_product,
// 		width: '100px',
// 	},
// 	{
// 		name: 'Tipo',
// 		selector: (row: any) => row.type_m,
// 		sortable: true,
// 		width: '200px',
// 	},
// 	{
// 		name: 'Cantidad',
// 		selector: (row: any) => row.quantity,
// 		width: '100px',
// 	},
// 	{
// 		name: 'Fecha',
// 		selector: (row: any) => row.movement_date,
// 		sortable: true,
// 		width: '200px',
// 	},
// 	{
// 		name: 'ID SM',
// 		selector: (row: any) => row.sm_id,
// 		sortable: true,
// 		width: '100px',
// 	},
// 	{
// 		name: 'Cantidad anterior',
// 		selector: (row: any) => row.previous_q,
// 		width: '200px',
// 	},
// ];

// const movementsOptions = [
// 	{
// 		value: '0',
// 		label: 'entrada',
// 	},
// 	{
// 		value: '1',
// 		label: 'salida',
// 	},
// ];

// interface Movement {
// 	id: number;
// 	id_product: number;
// 	type_m: {
// 		value: string;
// 		label: string;
// 	};
// 	quantity: number;
// 	movement_date: Date;
// 	sm_id: number;
// 	previous_q: null;
// }

// const INITIAL_MOVEMENT: Movement = {
// 	id: 0,
// 	id_product: 0,
// 	type_m: {
// 		value: '0',
// 		label: 'entrada',
// 	},
// 	quantity: 0,
// 	movement_date: new Date(),
// 	sm_id: 0,
// 	previous_q: null,
// };

// function MovementsPage() {
// 	const [ins, setIns] = useState<Array<Movement>>([]);
// 	const [outs, setOuts] = useState<Array<Movement>>([]);
// 	const [loading, setLoading] = useState(true);
// 	const [error, setError] = useState<string>('');
// 	const [movement, setMovement] = useState<Movement>(INITIAL_MOVEMENT);
// 	const [showTable, setShowTable] = useState(false);
// 	const { modalIsOpen, modalMessage, openModal, closeModal, handleConfirm } =
// 		useModal();

// 	const postNewMovement = async () => {
// 		const data = {
// 			info: {
// 				id: movement?.id,
// 				id_product: movement?.id_product,
// 				type_m: movement?.type_m,
// 				quantity: movement?.quantity,
// 				movement_date: formatDate(movement?.movement_date),
// 				sm_id: movement?.sm_id,
// 				previous_q: movement?.previous_q,
// 			},
// 			id: movement?.id,
// 		};
// 		await axios
// 			.post(`${process.env.NEXT_PUBLIC_API_HOST}/almacen/movement`, data)
// 			.then((res) => {
// 				console.log(res.data);
// 			})
// 			.catch((err) => {
// 				setError(err);
// 			});
// 	};

// 	const updateMovement = async () => {
// 		const data = {
// 			info: {
// 				id: Number(movement?.id),
// 				id_product: Number(movement?.id_product),
// 				type_m: String(movement?.type_m),
// 				quantity: Number(movement?.quantity),
// 				movement_date: formatDate(movement?.movement_date),
// 				sm_id: Number(movement?.sm_id),
// 				previous_q: movement?.previous_q || 0,
// 			},
// 			id: movement?.id,
// 		};
// 		await axios(`${process.env.NEXT_PUBLIC_API_HOST}/almacen/movement`, {
// 			data: data,
// 			method: 'PUT',
// 		})
// 			.then((res) => {
// 				console.log(res.data);
// 			})
// 			.catch((err) => {
// 				setError(err);
// 			});
// 	};

// 	const deleteMovement = async () => {
// 		const data = {
// 			id: movement?.id,
// 		};
// 		await axios(`${process.env.NEXT_PUBLIC_API_HOST}/almacen/movement`, {
// 			method: 'DELETE',
// 			data: data,
// 		})
// 			.then((res) => {
// 				console.log(res.data);
// 			})
// 			.catch((err) => {
// 				setError(err);
// 			});
// 	};

// 	const getAllIns = async () => {
// 		await axios
// 			.get(`${process.env.NEXT_PUBLIC_API_HOST}/almacen/movements/entrada`)
// 			.then((res) => {
// 				setIns(res.data.data);
// 			})
// 			.catch((err) => {
// 				setError(err);
// 			});
// 	};

// 	const getAllOuts = async () => {
// 		await axios
// 			.get(`${process.env.NEXT_PUBLIC_API_HOST}/almacen/movements/salida`)
// 			.then((res) => {
// 				setOuts(res.data.data);
// 			})
// 			.catch((err) => {
// 				setError(err);
// 			});
// 	};

// 	const debouncedHandleInputChange = useCallback(
// 		debounce((name, value) => {
// 			setMovement((prev): any => ({
// 				...prev,
// 				[name]: value,
// 			}));
// 		}, 300),
// 		[]
// 	);

// 	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// 		const { name, value } = e.target;
// 		debouncedHandleInputChange(name, value);
// 	};

// 	const handleSelectedRow = (row: any) => {
// 		setMovement(row);
// 	};

// 	const clearFields = () => {
// 		setMovement({
// 			id: 0,
// 			id_product: 0,
// 			type_m: movementsOptions[0],
// 			quantity: 0,
// 			movement_date: new Date(),
// 			sm_id: 0,
// 			previous_q: null,
// 		});
// 	};

// 	const hadleShowTable = () => {
// 		setShowTable(!showTable);
// 	};

// 	const handleMovementChange = (selectedOption: {
// 		value: string;
// 		label: string;
// 	}) => {
// 		const { value } = selectedOption;
// 		setMovement({
// 			...movement,
// 			type_m: movementsOptions.find((employee) => employee.value === value),
// 		});
// 	};

// 	const handleDate = (date: Date) => {
// 		setMovement({ ...movement, movement_date: date });
// 	};

// 	useEffect(() => {
// 		getAllIns();
// 		getAllOuts();
// 		setTimeout(() => {
// 			setLoading(false);
// 		}, 300);
// 	}, []);

// 	return (
// 		<section className="flex flex-col p-10 ml-20 w-full gap-5 2xl:container 2xl:mx-auto">
// 			<h2 className="text-4xl text-neutral-200 font-semibold tracking-wide">
// 				Movimientos
// 			</h2>
// 			<div className="w-full h-auto border border-neutral-500/50 bg-neutral-800/20 rounded grid grid-cols-2 gap-4 px-4 py-6">
// 				<TextInput
// 					label="ID Producto"
// 					name="id_product"
// 					placeholder="Ingresa el id del producto"
// 					onChange={(e) => handleInputChange(e)}
// 					defaultValue={movement?.id_product ? String(movement.id_product) : ''}
// 				/>
// 				<MySelect
// 					label="Tipo de movimiento"
// 					placeholder="Tipo de movimiento"
// 					options={movementsOptions}
// 					value={
// 						movement?.type_m
// 							? movement.type_m
// 							: { label: 'Selecciona un movimiento', value: '0' }
// 					}
// 					onChange={handleMovementChange}
// 				/>
// 				<TextInput
// 					label="Cantidad de movimiento"
// 					name="quantity"
// 					placeholder="Ingresa la cantidad"
// 					onChange={(e) => handleInputChange(e)}
// 					defaultValue={movement?.quantity ? String(movement.quantity) : ''}
// 				/>
// 				<CalendarSelector
// 					label="Fecha"
// 					selectedDate={movement?.movement_date}
// 					onChange={handleDate}
// 				/>
// 				<TextInput
// 					label="ID de SM"
// 					name="sm_id"
// 					placeholder="Ingresa el id de SM"
// 					onChange={(e) => handleInputChange(e)}
// 					defaultValue={movement?.sm_id ? String(movement.sm_id) : ''}
// 				/>
// 				<TextInput
// 					label="Cantidad anterior"
// 					name="previous_q"
// 					placeholder="Ingresa la cantidad anterior"
// 					onChange={(e) => handleInputChange(e)}
// 					defaultValue={movement?.previous_q ? movement.previous_q : ''}
// 				/>
// 			</div>
// 			<div className="flex flex-col gap-5 w-full">
// 				{error && (
// 					<div className="bg-red-500 text-white p-4 rounded-md">
// 						{error?.message}
// 					</div>
// 				)}
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
// 							openModal(
// 								'¿Estás seguro de agregar la solicitud?',
// 								postNewMovement
// 							)
// 						}
// 					>
// 						Agregar Entrada
// 					</button>
// 					<button
// 						className="px-4 py-2 bg-cyan-700 rounded-md text-neutral-800 font-semibold tracking-wider"
// 						onClick={() =>
// 							openModal(
// 								'¿Estás seguro de actualizar la solicitud?',
// 								updateMovement
// 							)
// 						}
// 					>
// 						Actualizar Entrada
// 					</button>
// 					<button
// 						className="px-4 py-2 bg-[#cecece] rounded-md text-red-500 border border-red-500 font-semibold tracking-wider"
// 						onClick={() =>
// 							openModal(
// 								'¿Estás seguro de eliminar la solicitud?',
// 								deleteMovement
// 							)
// 						}
// 					>
// 						Eliminar Entrada
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
// 						data={[...ins, ...outs]}
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

// export default MovementsPage;
