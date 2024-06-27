import { LoginForm } from '@/components/loginForm/LoginForm';
import Image from 'next/image';

export default function LoginPage() {
	return (
		<>
			<main className="h-screen w-screen flex justify-center items-center relative">
				<section className="sm:shadow-xl px-8 pb-8 pt-12 sm:bg-white/5 rounded-xl space-y-12">
					<div className="flex flex-col items-center justify-center">
						<Image
							src={'/img/logo.svg'}
							alt="logo"
							width={200}
							height={200}
							className="space-x-0 space-y-0 w-46 h-auto"
						/>
						<h2 className="font-semibold text-2xl md:text-4xl text-center text-[#D9D9D9]">
							Bienvenido
						</h2>
					</div>
					<LoginForm />
				</section>
			</main>
			<div className="bg-svg-robot animation-robot-move h-44 w-44 md:h-96 md:w-96 z-10 absolute bottom-0 right-0" />
		</>
	);
}
