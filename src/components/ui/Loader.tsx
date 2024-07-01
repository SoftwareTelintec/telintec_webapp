const Loader: React.FC = () => {
	return (
		<div className="flex flex-col min-h-[calc(100vh)] md:min-h-[calc(100vh-10rem)] items-center justify-center h-full w-full">
			<div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-32 w-32 mb-4"></div>
			<p className="text-center text-xl md:text-2xl font-semibold text-white">
				Cargando...
			</p>
		</div>
	);
};

export { Loader };
