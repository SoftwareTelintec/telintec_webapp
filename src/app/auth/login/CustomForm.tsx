'use client';

import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { login } from '@/actions/login';
import Button from '@/app/components/ui/Button';

function CustomForm() {
	const {
		handleSubmit,
		register,
		formState: { errors },
	} = useForm();
	const router = useRouter();

	const onSubmit = handleSubmit(async (data: any) => {
		const res = await login(data);
		if (res?.error) {
			alert(`Error: ${res.error}`);
		} else {
			router.push('/auth/dashboard');
			router.refresh();
		}
	});
	return (
		<form
			className="w-1/3 px-6 py-10 rounded-md bg-clip-padding bg-opacity-20 border border-gray-200 bg-white shadow-lg relative"
			onSubmit={onSubmit}
		>
			<h2 className="text-slate-200 font-bold text-4xl mb-4">Iniciar Sesion</h2>

			<label htmlFor="username" className="text-slate-200 mb-2 block text-sm">
				Nombre de usuario:
			</label>
			<input
				type="text"
				className="p-3 rounded block mb-2 bg-slate-900 text-slate-300 w-full"
				placeholder="Ingrese su nombre de usuario"
				{...register('username', {
					required: {
						value: true,
						message: 'El nombre de usuario es requerido',
					},
				})}
			/>
			{errors.username && (
				<p className="text-red-500 text-sm">{`${errors?.username?.message}`}</p>
			)}

			<label htmlFor="password" className="text-slate-200 mb-2 block text-sm">
				Contrasena:
			</label>
			<input
				type="password"
				className="p-3 rounded block mb-2 bg-slate-900 text-slate-300 w-full"
				placeholder="********"
				{...register('password', {
					required: {
						value: true,
						message: 'La contraseña es requerida',
					},
				})}
			/>

			{errors.password && (
				<p className="text-red-500 text-sm">{`${errors?.password?.message}`}</p>
			)}

			<Button text={'Iniciar Sesion'} />
		</form>
	);
}

export default CustomForm;
