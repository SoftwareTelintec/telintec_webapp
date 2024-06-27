'use client';

import { MySelect } from '@/app/components';
import axios from 'axios';
import { useState, useEffect } from 'react';

interface Employee {
	id: number;
	name: string;
}

interface Survey {
	id?: number;
	question: string;
	subquestions: string[];
	options: string[] | [];
	answer: number | string;
	type: number;
}

const surveyTypes = [
	{ value: '0', label: 'Encuesta de salida' },
	{ value: '1', label: 'Encuesta de norma 035 50' },
	{ value: '2', label: 'Encuesta de norma 035 +50' },
	{ value: '3', label: 'Encuesta de clima laboral' },
	{ value: '4', label: 'Encuesta de evaluación 360' },
];

function SurverysPage() {
	const [data, setData] = useState<Survey[]>([]);
	const [employeesSurve, setEmployeesSurve] = useState<Employee[]>([]);
	const [survey, setSurvey] = useState<Survey[]>([]);
	const [error, setError] = useState<string | null>(null);
	const [selectedEmployee, setSelectedEmployee] = useState<{
		value: string;
		label: string;
	} | null>(null);
	const [showSurveys, setShowSurveys] = useState(false);
	const [selectedSurveyType, setSelectedSurveyType] = useState(surveyTypes[0]);
	const [answers, setAnswers] = useState<{ [key: number]: string }>({});

	//fetching
	const getSelectedSurvey = async (value: number | null = null) => {
		await axios(
			`${process.env.NEXT_PUBLIC_API_HOST}/rrhh/download/quizz/${value}`,
			{
				method: 'GET',
			}
		).then((res) => {
			const questionsArray = Object.entries(res.data).map(([key, value]) => ({
				id: key,
				...value,
			}));
			setSurvey(questionsArray);
		});
	};

	const getAllEmployees = async () => {
		await axios
			.get(`${process.env.NEXT_PUBLIC_API_HOST}/rrhh/employees/fichaje/all`)
			.then((response) => {
				setEmployeesSurve(response.data.data as Employee[]);
			})
			.catch((error) => {
				setError(error);
			});
	};

	const employeeOptions = employeesSurve?.map((employee: Employee) => ({
		value: employee.id.toString(),
		label: employee.name,
	}));

	function handleSurveyTypeChange(selectedOption: {
		value: string;
		label: string;
	}) {
		const { value } = selectedOption;
		setSelectedSurveyType(surveyTypes[parseInt(value)]);
	}

	const handleEmployeeChange = (selectedOption: {
		value: string;
		label: string;
	}) => {
		const { value } = selectedOption;
		setSelectedEmployee(
			employeeOptions.find((employee) => employee.value === value)
		);
	};

	const handleCreateSurvey = async () => {
		setShowSurveys(true); // Asegúrate de que las encuestas se mostrarán
		await getSelectedSurvey(Number(selectedSurveyType.value));
	};

	const handleSubmitSurvey = () => {
		downloadCSV();
		clearSuvery();
	};

	const clearSuvery = () => {
		setShowSurveys(false);
		setSelectedEmployee(null);
		setSurvey([]);
		setAnswers({});
	};

	const downloadCSV = () => {
		const csvRows = [];
		const headers = ['questionId', 'answer'];
		csvRows.push(headers.join(','));

		// Convertir el objeto de respuestas a filas CSV
		for (const [key, value] of Object.entries(answers)) {
			const row = [key, value];
			csvRows.push(row.join(','));
		}

		const csvString = csvRows.join('\n');
		const blob = new Blob([csvString], { type: 'text/csv' });
		const url = window.URL.createObjectURL(blob);
		const link = document.createElement('a');
		link.href = url;
		link.download = 'survey_responses.csv';
		link.click();
		window.URL.revokeObjectURL(url);
	};

	const limpiarTexto = (texto: string) => {
		const textoNormalizado = texto
			.normalize('NFD')
			.replace(/[\u0300-\u036f]/g, '');
		// Elimina caracteres especiales excepto espacios
		const textoLimpio = textoNormalizado.replace(/[^a-zA-Z0-9\s]/g, '');
		return textoLimpio;
	};

	function styledQuestion(question: string) {
		const parts = question.split('*');
		return (
			<>
				{parts.map((part, index) => {
					if (index % 2 === 1) {
						return (
							<span key={index} style={{ color: 'red' }}>
								*{part}*
							</span>
						);
					}
					return part;
				})}
			</>
		);
	}

	// Save change into state
	const handleOptionChange = (surveyId: number, option: string) => {
		console.log({ surveyId, option });
		setAnswers((prev) => ({
			...prev,
			[surveyId]: limpiarTexto(option),
		}));
	};

	useEffect(() => {
		getAllEmployees();
	}, []);

	useEffect(() => {
		console.log(answers);
	}, [answers]);

	return (
		<>
			<section className="flex flex-col p-10 w-full gap-5 max-w-4xl mx-auto">
				{!showSurveys && (
					<div className="h-80 border border-neutral-500/50 bg-neutral-800/20 rounded grid grid-cols-3 gap-4 px-4 py-6 justify-center">
						<MySelect
							label="Tipo de encuesta"
							options={surveyTypes}
							value={selectedSurveyType}
							onChange={handleSurveyTypeChange}
							placeholder="Seleccione un tipo de encuesta"
						/>
						<MySelect
							label="Empleado a encuestar"
							options={employeeOptions ? employeeOptions : []}
							value={
								selectedEmployee ?? {
									value: '',
									label: 'Seleccione un empleado',
								}
							}
							onChange={handleEmployeeChange}
							placeholder="Seleccione un empleado"
						/>
						<div className="flex flex-col justify-center ">
							<p className="text-white mb-2">Crear encuesta</p>
							<button
								className="px-4 py-2 h-auto min-h-10 bg-indigo-400 rounded-md text-neutral-800 font-semibold"
								onClick={handleCreateSurvey}
							>
								Crear Encuesta
							</button>
						</div>
					</div>
				)}

				{survey?.map((survey, index) => (
					<section
						className="flex flex-col py-6 w-full gap-5 bg-white/90"
						key={`${survey.type} + ${index}`}
					>
						{index === 0 && (
							<div className="flex flex-col py-6 w-full gap-5 bg-white shadow-lg border-t-8 border-indigo-600 rounded-tl-lg rounded-tr-lg relative -top-14 p-5">
								<h1 className="text-4xl text-black font-bold shadow-sm">
									{styledQuestion('**Encuesta**')}
								</h1>
								<div className="mt-4"></div>
							</div>
						)}

						<h2 className="p-5 rounded flex flex-col items-start font-semibold">
							{styledQuestion(survey.question)}
							<span
								className="w-1/2 bg-indigo-600 mt-2 h-px"
								style={{ width: '50%' }}
							></span>
						</h2>

						{survey?.subquestions?.length > 0 && (
							<ul className="bg-white/100 p-3 border-l-4 border-indigo-900 rounded-lg ml-4 mr-4">
								{survey?.subquestions?.map(
									(subquestion: string, subIndex: number) => (
										<li key={subIndex}>{subquestion}</li>
									)
								)}
							</ul>
						)}

						<div>
							{survey?.options && survey.options.length > 0 ? (
								survey.options.map((option: string, optionIndex: number) => (
									<div
										key={`${survey.id}-${optionIndex}`}
										className="ml-6 mt-2 flex items-center"
									>
										<input
											type="radio"
											name={`${survey.id}`}
											id={`${survey.id}-${optionIndex}`}
											className="form-radio h-5 w-5 custom-radio transition duration-150 ease-in-out"
											onChange={() => handleOptionChange(survey.id!, option)}
											checked={answers[survey.id!] === option}
										/>
										<label
											htmlFor={`${survey.id}-${optionIndex}`}
											className="ml-2 text-gray-800 font-normal cursor-pointer select-none transition-colors duration-200 hover:text-indigo-600"
										>
											{option}
										</label>
									</div>
								))
							) : (
								<p className="text-gray-600 ml-7">
									No hay opciones disponibles para esta pregunta.
								</p>
							)}
						</div>
					</section>
				))}

				{showSurveys && (
					<div className="mt-10 flex justify-end gap-4">
						<button
							className="px-4 py-2 bg-red-400 text-white rounded-md shadow-md hover:bg-red-500"
							onClick={clearSuvery}
						>
							Cancelar
						</button>
						<button
							className="px-4 py-2 bg-blue-400 text-white rounded-md shadow-md hover:bg-blue-500"
							onClick={handleSubmitSurvey}
						>
							Submit Survey
						</button>
					</div>
				)}
			</section>
		</>
	);
}

export default SurverysPage;
