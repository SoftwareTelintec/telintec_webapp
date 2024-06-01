'use client';

import axios from 'axios';
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
	emergency: string;
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
	const [isLoading, setIsLoading] = useState(false);

	const getEmployee = async () => {
		await axios(
			`${process.env.NEXT_PUBLIC_API_HOST}/rrhh/employee/info/${employeId}`,
			{
				method: 'GET',
			}
		)
			.then((res) => {
				setEmployee(res.data);
			})
			.catch((err) => {
				setError(err);
			})
			.finally(() => {
				setIsLoading(false);
			});
	};

	useEffect(() => {
		if (employeId) {
			getEmployee();
		}
	}, []);

	return (
		<div>
			{isLoading ? (
				<p>Loading...</p>
			) : (
				<>
					{error ? (
						<p>{error}</p>
					) : (
						<div>
							<p>{employee?.name}</p>
							<p>{employee?.phone}</p>
							<p>{employee?.dep}</p>
							<p>{employee?.modality}</p>
							<p>{employee?.email}</p>
							<p>{employee?.contract}</p>
							<p>{employee?.admission}</p>
							<p>{employee?.rfc}</p>
							<p>{employee?.curp}</p>
							<p>{employee?.nss}</p>
							<p>{employee?.emergency}</p>
							<p>{employee?.position}</p>
							<p>{employee?.status}</p>
							<p>{employee?.departure}</p>
							<p>{employee?.exam_id}</p>
							<p>{employee?.birthday}</p>
							<p>{employee?.legajo}</p>
						</div>
					)}
				</>
			)}
		</div>
	);
}
