export default function Loader() {
	return (
		<div className="flex flex-col items-center justify-center h-full">
			<div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-32 w-32 mb-4"></div>
			<p className="text-center text-lg font-semibold text-white">
				Cargando...
			</p>
		</div>
	);
}
