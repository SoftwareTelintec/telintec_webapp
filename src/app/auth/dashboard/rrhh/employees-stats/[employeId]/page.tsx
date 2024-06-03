'use client';

import Loader from '@/app/components/ui/Loader';
import axios from 'axios';
import { ArrowBigLeftDashIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface Employee {
	id: number;
	name: string;
	phone: string;
	dep: string;
	modality: string;
	email: string;
	contract: string;
	admission: string;
	rfc: string;
	curp: string;
	nss: string;
	emergency: {
		name: string;
		phone_number: string;
	};
	position: string;
	status: string;
	departure: string;
	exam_id: number;
	birthday: string;
	legajo: null;
}

export default function EmployeePage({
	params,
}: {
	params: { employeId: string };
}) {
	const [employeId, setEmployeId] = useState(params.employeId);
	const [employee, setEmployee] = useState<Employee>();
	const [error, setError] = useState('');
	const [isLoading, setIsLoading] = useState(true);

	const router = useRouter();

	const getEmployee = async () => {
		await axios(
			`${process.env.NEXT_PUBLIC_API_HOST}/rrhh/employee/info/${employeId}`,
			{
				method: 'GET',
			}
		)
			.then((res) => {
				const {
					id,
					name,
					phone,
					dep,
					modality,
					email,
					contract,
					admission,
					rfc,
					curp,
					nss,
					emergency,
					position,
					status,
					departure,
					exam_id,
					birthday,
					legajo,
				} = res.data;
				setEmployee({
					id,
					name,
					phone,
					dep,
					modality,
					email,
					contract,
					admission,
					rfc,
					curp,
					nss,
					emergency: JSON.parse(emergency),
					position,
					status,
					departure,
					exam_id,
					birthday,
					legajo,
				});
			})
			.catch((err) => {
				setError(err);
			})
			.finally(() => {
				setIsLoading(false);
			});
	};

	const handleReturn = () => {
		router.push('/auth/dashboard/rrhh/employees-stats');
	};

	useEffect(() => {
		if (employeId) {
			getEmployee();
		}
	}, [employeId]);

	return (
		<section className="w-full h-full flex items-center justify-center container p-6">
			{isLoading ? (
				<Loader />
			) : (
				<>
					{error ? (
						<p>{error}</p>
					) : (
						<section className="bg-white flex flex-col w-full h-full p-6 rounded-lg shadow-md relative">
							<div className="flex justify-between items-start mb-4">
								<button
									className="px-4 py-2 text-sm font-bold bg-blue-500 hover:bg-blue-600 rounded-full text-white shadow-md cursor-pointer flex items-center space-x-2"
									onClick={handleReturn}
								>
									<span>
										<ArrowBigLeftDashIcon />
									</span>
								</button>
								<h2 className="text-3xl font-bold">{employee?.name}</h2>
								<div></div>
							</div>
							<div className="grid grid-cols-2 gap-4">
								<div>
									<p>
										<span className="font-semibold">Id:</span> {employee?.id}
									</p>
									<p>
										<span className="font-semibold">Estatus:</span>{' '}
										{employee?.status}
									</p>
									<p>
										<span className="font-semibold">Modalidad:</span>{' '}
										{employee?.modality}
									</p>
									<p>
										<span className="font-semibold">Departamento:</span>{' '}
										{employee?.dep}
									</p>
									<p>
										<span className="font-semibold">Contrato:</span>{' '}
										{employee?.contract}
									</p>
								</div>
								<div>
									<p>
										<span className="font-semibold">Correo:</span>{' '}
										{employee?.email === '' || employee?.email === 'None'
											? 'Sin asignar'
											: employee?.email}
									</p>
									<p>
										<span className="font-semibold">RFC:</span> {employee?.rfc}
									</p>
									<p>
										<span className="font-semibold">CURP:</span>{' '}
										{employee?.curp}
									</p>
									<p>
										<span className="font-semibold">NSS:</span> {employee?.nss}
									</p>
									<p>
										<span className="font-semibold">Id del Examen Medico:</span>{' '}
										{employee?.exam_id}
									</p>
								</div>
								<div>
									<p>
										<span className="font-semibold">Fecha de Cumpleaños:</span>{' '}
										{employee?.birthday}
									</p>
									<p>
										<span className="font-semibold">Fecha de Entrada:</span>{' '}
										{employee?.admission}
									</p>
									<p>
										<span className="font-semibold">Teléfono:</span>{' '}
										{employee?.phone}
									</p>
									<p>
										<span className="font-semibold">Posición:</span>{' '}
										{employee?.position === 'None' ||
										employee?.position === null
											? 'Sin asignar'
											: employee?.position}
									</p>
								</div>
								<div>
									<p>
										<span className="font-semibold">Contacto Emergencia:</span>
										<br />
										<span className="ml-4">
											<span className="font-semibold">Nombre:</span>{' '}
											{employee?.emergency?.name === null
												? 'Sin asignar'
												: employee?.emergency?.name}
										</span>
										<br />
										<span className="ml-4">
											<span className="font-semibold">Teléfono:</span>{' '}
											{employee?.emergency?.phone_number}
										</span>
									</p>
									<p>
										<span className="font-semibold">Departamento:</span>{' '}
										{employee?.departure}
									</p>
									<p>
										<span className="font-semibold">Id de Legajo:</span>{' '}
										{employee?.legajo}
									</p>
								</div>
							</div>
						</section>
					)}
				</>
			)}
		</section>
	);
}
