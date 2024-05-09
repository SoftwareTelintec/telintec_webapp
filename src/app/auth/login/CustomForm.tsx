'use client';

import { useForm } from 'react-hook-form';
import { redirect } from 'next/navigation';
import { login } from '@/actions/login';
import Button from '@/app/components/ui/Button';
import { useEffect, useState } from 'react';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import { signIn, useSession } from 'next-auth/react';

function CustomForm() {
	const [showPassword, setShowPassword] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const session = useSession();

	useEffect(() => {
		if (session?.status === 'authenticated') {
			redirect('/auth/dashboard');
		}
	}, [session]);

	const {
		handleSubmit,
		register,
		formState: { errors },
	} = useForm();

	const onSubmit = handleSubmit(async (data: any) => {
		await signIn('credentials', {
			username: data.username,
			password: data.password,
			redirect: false,
		})
			.then((res) => {
				if (res?.error) {
					setError('Creedenciales incorrectas');
				} else {
					redirect('/auth/dashboard');
				}
			})
			.catch((error) => {
				console.log('Error', error);
			});
	});

	return (
		<form
			className="w-1/3 px-6 py-10 rounded-md bg-clip-padding bg-opacity-20 relative"
			onSubmit={onSubmit}
			autoComplete="on"
		>
			<h2 className="text-slate-200 font-bold text-4xl mb-4 text-center">
				Iniciar Sesion
			</h2>

			<label
				htmlFor="username"
				className="text-slate-200 mb-2 block text-sm  mt-4"
			>
				Nombre de usuario:
			</label>
			<input
				id="username"
				type="text"
				className="p-3 rounded-2xl block mb-2 bg-[#D9D9D9] text-neutral-600 w-full"
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

			<label
				htmlFor="password"
				className="text-slate-200 mb-2 block text-sm mt-4"
			>
				Contrasena:
			</label>

			<input
				id="password"
				type={showPassword ? 'text' : 'password'}
				className="p-3 rounded-2xl mb-2 relative bg-[#D9D9D9] text-neutral-600 w-full"
				placeholder="********"
				{...register('password', {
					required: {
						value: true,
						message: 'La contraseña es requerida',
					},
				})}
			/>

			<span
				className="absolute right-8 w-12 h-12 cursor-pointer"
				onClick={() => setShowPassword(!showPassword)}
			>
				{showPassword ? (
					<EyeSlashIcon className="p-1" />
				) : (
					<EyeIcon className="p-1" />
				)}
			</span>

			{errors.password && (
				<p className="text-red-500 text-sm">{`${errors?.password?.message}`}</p>
			)}
			{error && <p className="text-red-500 text-sm">{error}</p>}

			<div className="w-full flex items-center justify-center mt-4">
				<Button text={'Iniciar Sesion'} />
			</div>
		</form>
	);
}

export default CustomForm;
