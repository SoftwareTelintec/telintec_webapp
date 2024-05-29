'use client';

import { TextInput } from '@/app/components';
import { use, useCallback, useEffect, useState } from 'react';
import debounce from 'lodash.debounce';
import axios from 'axios';

interface Client {
	name: string;
	address: string;
	phone: string;
	email: string;
	rfc: string;
}

function ClientsPage() {
	const [client, setClient] = useState<Client>({
		name: '',
		address: '',
		phone: '',
		email: '',
		rfc: '',
	});
	const [clients, setClients] = useState<Array<Client>>([]);

	const debouncedHandleInputChange = useCallback(
		debounce((name, value) => {
			setClient((prev) => ({ ...prev, [name]: value }));
		}, 300),
		[]
	);

	const postNewClient = async () => {
		await axios
			.post(`${process.env.NEXT_PUBLIC_API_HOST}/sm/newclient`, client)
			.then((res) => {
				console.log(res.data);
			})
			.catch((err) => {
				console.error(err);
			});
	};

	// TODO: Add a function to get all clients from the database
	const getAllClients = async () => {
		await axios
			.get(`${process.env.NEXT_PUBLIC_API_HOST}/sm/clients`)
			.then((res) => {
				setClients(res.data);
				console.log(res.data);
			})
			.catch((err) => {
				console.error(err);
			});
	};

	// TODO: Add a function to update a client by id

	// TODO: Add a function to delete a client by id
	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		debouncedHandleInputChange(name, value);
	};

	useEffect(() => {
		getAllClients();
	}, []);

	return (
		<>
			<section className="flex flex-col p-10 ml-20 w-full gap-5 2xl:container 2xl:mx-auto">
				<h2 className="text-4xl text-neutral-200 font-semibold tracking-wide">
					Clientes
				</h2>
				<div className="w-full h-auto border border-neutral-500/50 bg-neutral-800/20 rounded grid grid-cols-2 gap-4 px-4 py-6">
					<TextInput
						label="Nombre"
						name="name"
						placeholder="Ingresa el nombre"
						onChange={(e) => handleInputChange(e)}
					/>
					<TextInput
						label="Direccion"
						name="address"
						placeholder="Ingresa la direccion"
						onChange={(e) => handleInputChange(e)}
					/>
					<TextInput
						label="Telefono"
						name="phone"
						placeholder="Ingresa el telefono"
						onChange={(e) => handleInputChange(e)}
					/>
					<TextInput
						label="Email"
						name="email"
						placeholder="Ingresa el email"
						onChange={(e) => handleInputChange(e)}
					/>
					<TextInput
						label="RFC"
						name="rfc"
						placeholder="Ingresa el RFC"
						onChange={(e) => handleInputChange(e)}
					/>
				</div>
				<div className="w-full flex gap-4 items-center justify-around">
					<button className="px-4 py-2 bg-cyan-700 rounded-md text-neutral-800 font-semibold tracking-wider">
						Limpiar Campos
					</button>
					<button
						className="px-4 py-2 bg-cyan-700 rounded-md text-neutral-800 font-semibold tracking-wider"
						onClick={postNewClient}
					>
						Agregar Empleado
					</button>
					<button className="px-4 py-2 bg-cyan-700 rounded-md text-neutral-800 font-semibold tracking-wider">
						Actualizar Empleado
					</button>
					<button className="px-4 py-2 bg-[#cecece] rounded-md text-red-500 border border-red-500 font-semibold tracking-wider">
						Eliminar Empleado
					</button>
					<button className="px-4 py-2 bg-cyan-700 rounded-md text-neutral-800 font-semibold tracking-wider">
						Ver Tabla
					</button>
				</div>
			</section>
		</>
	);
}

export default ClientsPage;
