import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

interface AsistenteVirtualProps {
	roles: string[];
}

const AssistanModal: React.FC<AsistenteVirtualProps> = ({ roles }) => {
	const [isOpen, setIsOpen] = useState(false);
	const [inputValue, setInputValue] = useState('');
	const [chatHistory, setChatHistory] = useState<
		{ user: string; bot: string }[]
	>([]);
	const [isLoading, setIsLoading] = useState(false); // Estado para manejar el spinner de carga
	const chatEndRef = useRef<HTMLDivElement>(null); // Ref para el elemento final del chat

	const handleToggleModal = () => {
		setIsOpen(!isOpen);
	};

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInputValue(e.target.value);
	};

	const handleSendMessage = async () => {
		const userMessage = inputValue.trim();
		if (userMessage === '') return;

		setIsLoading(true); // Mostrar el spinner cuando se envía el mensaje

		const payload = {
			msg: userMessage,
			department: 'RRHH',
			filename: 'rrhh',
			files: [],
			id: 0,
		};
		try {
			const response = await axios.post(
				`${process.env.NEXT_PUBLIC_API_HOST}/misc/AV/response`,
				payload
			);
			const botResponse = response.data.answer;

			setChatHistory((prevChat) => [
				...prevChat,
				{ user: userMessage, bot: botResponse },
			]);
		} catch (error) {
			console.error('Error sending message', error);
			setChatHistory((prevChat) => [
				...prevChat,
				{ user: userMessage, bot: 'Error, could not get response from server' },
			]);
		} finally {
			setIsLoading(false); // Ocultar el spinner una vez que se reciba la respuesta
		}

		setInputValue('');
	};

	// Efecto para desplazarse hacia abajo cuando el historial de chat cambia
	useEffect(() => {
		if (chatEndRef.current) {
			chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
		}
	}, [chatHistory]);

	return (
		<div className="fixed bottom-4 right-4">
			<button
				onClick={handleToggleModal}
				className="px-6 py-2 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 focus:outline-none"
			>
				Asistente Virtual
			</button>

			{isOpen && (
				<>
					<div
						className="fixed inset-0 bg-black opacity-50 z-40"
						onClick={handleToggleModal}
					></div>
					<div className="fixed inset-0 flex items-center justify-center z-50">
						<div className="relative bg-white w-11/12 max-w-md mx-auto rounded shadow-lg">
							<div className="p-6">
								<h2 className="text-xl font-bold mb-4">Asistente Virtual</h2>
								<div className="mb-4">
									<h3 className="text-lg font-semibold">Permisos Requeridos</h3>
									<ul className="list-disc list-inside">
										{roles?.map((role, index) => (
											<li key={index} className="text-gray-700">
												{role}
											</li>
										))}
									</ul>
								</div>
								<div className="h-64 overflow-y-auto border p-4 mb-4">
									{chatHistory.map((chat, index) => (
										<div key={index}>
											<p className="text-blue-600">
												<strong>Tú:</strong> {chat.user}
											</p>
											<p className="text-green-600">
												<strong>Bot:</strong> {chat.bot}
											</p>
										</div>
									))}
									{isLoading && ( // Spinner de carga
										<div className="flex justify-center p-4">
											<div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-6 w-6"></div>
										</div>
									)}
									<div ref={chatEndRef} />
								</div>
								<div className="flex">
									<input
										type="text"
										value={inputValue}
										onChange={handleInputChange}
										className="flex-grow px-4 py-2 border rounded mr-2"
										placeholder="Escribe tu mensaje..."
									/>
									<button
										onClick={handleSendMessage}
										className="px-4 py-2 bg-blue-600 text-white rounded shadow-lg hover:bg-blue-700 focus:outline-none"
									>
										Enviar
									</button>
								</div>
								<div className="mt-6 flex justify-end">
									<button
										onClick={handleToggleModal}
										className="px-4 py-2 bg-blue-600 text-white rounded shadow-lg hover:bg-blue-700 focus:outline-none"
									>
										Cerrar
									</button>
								</div>
							</div>
						</div>
					</div>
				</>
			)}
		</div>
	);
};

export default AssistanModal;
