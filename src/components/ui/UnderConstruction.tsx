import React from 'react';

const UnderConstruction: React.FC = () => {
	return (
		<div className="flex flex-col items-center justify-center w-full h-[calc(100vh-10rem)] bg-gray-100">
			<h1 className="text-4xl font-bold text-gray-800 mb-4">
				🚧 Página en Desarrollo 🚧
			</h1>
			<p className="text-gray-600">
				Esta página está actualmente en desarrollo. Vuelve pronto para más
				actualizaciones.
			</p>
		</div>
	);
};

export { UnderConstruction };
