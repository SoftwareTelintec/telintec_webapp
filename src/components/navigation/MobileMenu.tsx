'use client';

import { useState } from 'react';

const MobileMenu = () => {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<div className="relative">
			<button
				className="block sm:hidden focus:outline-none"
				onClick={() => setIsOpen(!isOpen)}
			>
				<div className="space-y-2">
					<span className="block w-8 h-0.5 bg-black"></span>
					<span className="block w-8 h-0.5 bg-black"></span>
					<span className="block w-8 h-0.5 bg-black"></span>
				</div>
			</button>

			{/* Contenido del Menú */}
			{isOpen && (
				<div className="absolute right-0 top-12 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50">
					<a
						href="#"
						className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
					>
						Home
					</a>
					<a
						href="#"
						className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
					>
						About
					</a>
					<a
						href="#"
						className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
					>
						Services
					</a>
					<a
						href="#"
						className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
					>
						Contact
					</a>
				</div>
			)}
		</div>
	);
};

export { MobileMenu };
