import CustomForm from './CustomForm';

function LoginPage() {
	return (
		<section className="h-[calc(100vh-1rem)] flex justify-center items-center w-full relative overflow-hidden">
			<div className="bg-svg-robot bg-no-repeat bg-contain bg-fixed bg-right-bottom h-full w-full absolute animate-pulse transition-colors duration-500"></div>
			<CustomForm />
		</section>
	);
}

export default LoginPage;
