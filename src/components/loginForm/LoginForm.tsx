'use client';

import { useCallback, useEffect, useState } from 'react';
import { Button, Alert, CustomInput } from '@/components';
import { debounce } from '@/lib/utils';
import { FormData } from '@/types/types';
import { signIn, useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';

const INITIAL_DATA = {
	username: '',
	password: '',
};

const LoginForm: React.FC = () => {
	const [formData, setFormData] = useState<FormData>(INITIAL_DATA);
	const [error, setError] = useState('');
	const session = useSession();

	// eslint-disable-next-line react-hooks/exhaustive-deps
	const debouncedUpdateFormData = useCallback(
		debounce((newFormData: Partial<FormData>) => {
			setFormData((prev) => ({
				...prev,
				...newFormData,
			}));
		}, 300),
		[]
	);

	const handleDataChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
		debouncedUpdateFormData({ [name]: value });
	};

	const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		await signIn('credentials', {
			username: formData.username,
			password: formData.password,
			redirect: false,
		})
			.then((res) => {
				if (res?.error) {
					setError('Credenciales incorrectas');
				} else {
					redirect('/auth/dashboard');
				}
			})
			.catch((error) => {
				console.log('Error', error);
			});
	};

	useEffect(() => {
		if (session?.status === 'authenticated') {
			redirect('/auth/');
		}
	}, [session]);

	return (
		<form
			className="space-y-12 w-full sm:w-[400px]"
			autoComplete="off"
			onSubmit={onSubmit}
		>
			<CustomInput
				id="username"
				label="Nombre de usuario"
				type="text"
				value={formData.username}
				handleDataChange={handleDataChange}
			/>
			<CustomInput
				id="password"
				label="Contraseña"
				type="password"
				value={formData.password}
				handleDataChange={handleDataChange}
			/>
			{error && <Alert className="border-red-500 text-red-800">{error}</Alert>}
			<div className="w-full">
				<Button className="w-full bg-[#5970D3]" size="lg">
					Ingresar
				</Button>
			</div>
		</form>
	);
};

export { LoginForm };
