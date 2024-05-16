import Image from 'next/image';
import CustomForm from './CustomForm';

function LoginPage() {
	return (
		<section className="h-screen flex justify-center items-center w-full relative md:overflow-hidden">
			<div className="bg-svg-robot bg-no-repeat bg-contain bg-fixed bg-right-bottom h-full w-full absolute animate-pulse transition-colors duration-500"></div>
			<div className="w-full h-full flex flex-col items-center justify-between gap-4">
				<Image
					src="/img/logo.svg"
					alt="Robot"
					width={400}
					height={300}
					layout="fixed"
					className="w-[300px] h-[200px] md:w-[400px] md:h-[300px]"
				/>
				<div className="h-full w-full flex items-start justify-center">
					<CustomForm />
				</div>
			</div>
		</section>
	);
}

export default LoginPage;
