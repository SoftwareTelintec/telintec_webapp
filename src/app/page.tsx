import { Link as Linkicon } from 'lucide-react';
import Link from 'next/link';

function HomePage() {
	return (
		<div className="flex items-center justify-center h-full flex-col">
			<h2 className="text-4xl text-neutral-100 mb-4">
				Favor de iniciar sesion
			</h2>
			<Link
				href="/auth/login"
				className="flex flex-row items-center justify-center gap-2 border border-white rounded-md px-4 py-2  cursor-pointer"
			>
				<Linkicon className="text-white" />
				<span className="text-neutral-200">
					Ir a la pagina de inicio de sesion
				</span>
			</Link>
		</div>
	);
}

export default HomePage;
