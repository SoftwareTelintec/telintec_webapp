import React, { useState } from 'react';

interface AsistenteVirtualProps {
	roles: string[];
}

const AssistanModal: React.FC<AsistenteVirtualProps> = ({ roles }) => {
	const [isOpen, setIsOpen] = useState(false);

	const handleToggleModal = () => {
		setIsOpen(!isOpen);
	};

	return (
		<div className="fixed bottom-4 right-4">
			<button
				onClick={handleToggleModal}
				className="px-6 py-2 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 focus:outline-none"
			>
				Asistente Virtual
			</button>

			{isOpen && (
				<div className="fixed inset-0 flex items-center justify-center z-50">
					<div className="relative bg-white w-11/12 max-w-md mx-auto rounded shadow-lg">
						<div className="p-6">
							<h2 className="text-xl font-bold mb-4">Permisos Requeridos</h2>
							<ul className="list-disc list-inside">
								{roles?.map((role, index) => (
									<li key={index} className="text-gray-700">
										{role}
									</li>
								))}
							</ul>
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
					<div
						className="fixed inset-0 bg-black opacity-50"
						onClick={handleToggleModal}
					></div>
				</div>
			)}
		</div>
	);
};

export default AssistanModal;
