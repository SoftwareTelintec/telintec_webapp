'use client';

import { MySelect } from '@/app/components';
import axios from 'axios';
import { useState, useEffect } from 'react';

interface Employee {
	id: number;
	name: string;
}

interface Survey {
	question: string;
	subquestions: string[];
	options: string[];
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
	const [answers, setAnswers] = useState({});

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
		setAnswers([]);
	};

	const downloadJSON = () => {
		const jsonString = JSON.stringify(answers, null, 2); // Formatea el JSON para que sea más legible
		const blob = new Blob([jsonString], { type: 'application/json' });
		const url = window.URL.createObjectURL(blob);
		const link = document.createElement('a');
		link.href = url;
		link.download = 'survey_responses.json';
		link.click();
		window.URL.revokeObjectURL(url);
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

	// save change into state
	const handleOptionChange = (questionId, option) => {
		setAnswers((prev) => ({
			...prev,
			[questionId]: limpiarTexto(option),
		}));
	};

	const limpiarTexto = (texto) => {
		// Normaliza el texto para separar letras de los acentos y diacríticos
		const textoNormalizado = texto
			.normalize('NFD')
			.replace(/[\u0300-\u036f]/g, '');
		// Elimina caracteres especiales excepto espacios
		const textoLimpio = textoNormalizado.replace(/[^a-zA-Z0-9\s]/g, '');
		return textoLimpio;
	};

	useEffect(() => {
		getAllEmployees();
	}, []);

	return (
		<>
			<section className="flex flex-col p-10 ml-20 w-full gap-5 2xl:container 2xl:mx-auto">
				<h1 className="text-4xl text-neutral-200">Encuestas</h1>
				{showSurveys === false && (
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
						className="flex flex-col py-6 w-full gap-5"
						key={`${survey.type} + ${index}`}
					>
						<h2 className="">{survey.question}</h2>
						{survey?.subquestions?.length > 0 && (
							<ul>
								{survey?.subquestions?.map(
									(subquestion: string, subIndex: number) => (
										<li key={subIndex}>{subquestion}</li>
									)
								)}
							</ul>
						)}
						<div>
							{survey?.options && survey.options.length > 0 ? (
								survey.options.map((option: string, optionIndex: number) => {
									const uniqueId = `${survey?.id}-option-${(
										Math.random() * 1000
									).toFixed(3)}`;
									return (
										<div key={uniqueId}>
											<input
												type="radio"
												name={`option ${survey.id}`}
												id={uniqueId}
												className="w-4 h-4 cursor-pointer mr-2"
												onChange={() => handleOptionChange(survey.id, option)}
												checked={answers[survey.id] === option}
											/>
											<label htmlFor={uniqueId} className="cursor-pointer">
												{option}
											</label>
										</div>
									);
								})
							) : (
								<textarea
									onChange={(e) =>
										handleOptionChange(survey.id, e.target.value)
									}
									value={answers[survey.id] || ''}
									className="w-full"
								></textarea>
							)}
						</div>
					</section>
				))}
				{showSurveys && (
					<button
						onClick={handleSubmitSurvey}
						className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-700"
					>
						Enviar Encuesta
					</button>
				)}
			</section>
		</>
	);
}

export default SurverysPage;
