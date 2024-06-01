'use client';

import { TextInput } from '@/app/components';
import axios from 'axios';
import debounce from 'lodash.debounce';
import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';
import { set } from 'react-hook-form';

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

function EmployeesPage() {
	const [employees, setEmployees] = useState<Array<Employee>>();
	const [error, setError] = useState('');
	const [res, setRes] = useState('');
	const [loading, setLoading] = useState(false);
	//paginador
	const [currentEmployees, setCurrentEmployees] = useState<Employee[]>([]);
	const [currentPage, setCurrentPage] = useState<number>(0);
	const [rowsPerPage, setRowsPerPage] = useState<number>(10);
	const [totalPages, setTotalPages] = useState<number>(0);
	// buscador
	const [search, setSearch] = useState<string>('');
	const [filteredEmployees, setFilteredEmployees] = useState<Employee[]>([]);

	const handleChangePage = (page: number) => {
		const newPage = currentPage + page;
		if (newPage < 0 || newPage >= totalPages) return;
		setCurrentPage(newPage);
	};

	const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearch(e.target.value);
	};

	const debouncedSearch = useCallback(
		debounce((search: string) => {
			if (search === '') {
				setFilteredEmployees([]);
			} else {
				const filtered = employees?.filter((employee) =>
					employee.name.toLowerCase().includes(search.toLowerCase())
				);
				setFilteredEmployees(filtered);
			}
			setCurrentPage(0);
		}, 500),
		[employees]
	);

	const getAllEmployees = async () => {
		await axios
			.get(`${process.env.NEXT_PUBLIC_API_HOST}/rrhh/employees/info/all`)
			.then((res) => {
				setEmployees(res.data.data);
				setRowsPerPage(12);
				setTotalPages(Math.ceil(res.data.data.length / rowsPerPage));
				setCurrentEmployees(res.data.data?.slice(currentPage, rowsPerPage));
			})
			.catch((err) => {
				setError(err);
			})
			.finally(() => {
				setLoading(false);
			});
	};

	useEffect(() => {
		debouncedSearch(search);
	}, [search, debouncedSearch]);

	useEffect(() => {
		const relevantEmployees =
			search === '' ? employees : filteredEmployees ?? [];
		setTotalPages(Math.ceil(relevantEmployees?.length / rowsPerPage));
		const start = currentPage * rowsPerPage;
		const end = start + rowsPerPage;
		setCurrentEmployees(relevantEmployees?.slice(start, end));
	}, [currentPage, employees, rowsPerPage, filteredEmployees, search]);

	useEffect(() => {
		getAllEmployees();
	}, []);

	return (
		<section className="flex flex-col p-10 ml-20 w-full gap-5 2xl:container 2xl:mx-auto">
			<h2 className="text-4xl text-neutral-200 font-semibold tracking-wide">
				Informacion de Empleados
			</h2>
			<div className="w-full h-auto border border-neutral-500/50 bg-neutral-800/20 rounded grid grid-cols-4 gap-4 px-4 py-6g">
				<div className="col-span-4 w-full pt-2">
					<h3>Listado de Empelados</h3>
					<div className="w-full pt-2">
						<TextInput
							label="Buscar empleado"
							placeholder="Buscar empleado"
							onChange={handleSearch}
							defaultValue={search}
						/>
					</div>
				</div>
				{search === '' ? (
					currentEmployees?.map((employee) => (
						<Link
							href={`/auth/dashboard/rrhh/employees-stats/${employee.id}`}
							key={employee.id}
							className="max-w-sm rounded overflow-hidden shadow-lg bg-white"
						>
							<div className="px-6 py-4">
								<h3 className="font-bold text-xl mb-2 text-neutral-200">
									{employee.name}
								</h3>
								<p className="text-gray-700 text-base">{employee.dep}</p>
								<p className="text-gray-700 text-base">{employee.email}</p>
								<p className="text-gray-700 text-base">{employee.contract}</p>
								<p className="text-gray-700 text-base">{employee.admission}</p>
								<p className="text-gray-700 text-base">{employee.rfc}</p>
								<p className="text-gray-700 text-base">{employee.curp}</p>
								<p className="text-gray-700 text-base">{employee.nss}</p>
								<p className="text-gray-700 text-base">{employee.emergency}</p>
								<p className="text-gray-700 text-base">{employee.departure}</p>
								<p className="text-gray-700 text-base">{employee.exam_id}</p>
								<p className="text-gray-700 text-base">{employee.birthday}</p>
								<p className="text-gray-700 text-base">{employee.legajo}</p>
							</div>
							<div className="px-6 pt-4 pb-2">
								<span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
									{employee.phone === '' ? 'Sin telefono' : employee.phone}
								</span>
								<span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
									{employee.modality}
								</span>
								<span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
									{employee.position === '' ||
									employee.position === 'None' ||
									employee.position === null
										? 'Sin asignar'
										: employee.position}
								</span>
								<span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
									{employee.status}
								</span>
							</div>
						</Link>
					))
				) : filteredEmployees.length > 0 ? (
					filteredEmployees?.map((employee) => (
						<Link
							href={`/auth/dashboard/rrhh/employees-stats/${employee.id}`}
							key={employee.id}
							className="max-w-sm rounded overflow-hidden shadow-lg bg-white"
						>
							<div className="px-6 py-4">
								<h3 className="font-bold text-xl mb-2 text-neutral-200">
									{employee.name}
								</h3>
								<p className="text-gray-700 text-base">{employee.dep}</p>
								<p className="text-gray-700 text-base">{employee.email}</p>
								<p className="text-gray-700 text-base">{employee.contract}</p>
								<p className="text-gray-700 text-base">{employee.admission}</p>
								<p className="text-gray-700 text-base">{employee.rfc}</p>
								<p className="text-gray-700 text-base">{employee.curp}</p>
								<p className="text-gray-700 text-base">{employee.nss}</p>
								<p className="text-gray-700 text-base">{employee.emergency}</p>
								<p className="text-gray-700 text-base">{employee.departure}</p>
								<p className="text-gray-700 text-base">{employee.exam_id}</p>
								<p className="text-gray-700 text-base">{employee.birthday}</p>
								<p className="text-gray-700 text-base">{employee.legajo}</p>
							</div>
							<div className="px-6 pt-4 pb-2">
								<span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
									{employee.phone === '' ? 'Sin telefono' : employee.phone}
								</span>
								<span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
									{employee.modality}
								</span>
								<span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
									{employee.position === '' || employee.position === 'None'
										? 'Sin asignar'
										: employee.position}
								</span>
								<span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
									{employee.status}
								</span>
							</div>
						</Link>
					))
				) : (
					<p>No se encontraron resultados</p>
				)}
			</div>
			<div className="flex items-center justify-center gap-6">
				<button
					onClick={() => handleChangePage(-1)}
					className="px-4 py-2 bg-slate-50 rounded-xl cursor-pointer"
				>
					-1
				</button>
				<span className="text-xl font-bold">{currentPage}</span>

				<button
					onClick={() => handleChangePage(1)}
					className="px-4 py-2 bg-slate-50 rounded-xl cursor-pointer"
				>
					+1
				</button>
			</div>
		</section>
	);
}

export default EmployeesPage;
