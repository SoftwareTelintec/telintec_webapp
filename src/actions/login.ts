'use server';

import { signIn } from '@/auth';
import { AuthError } from 'next-auth';

export interface loginData {
	username: string;
	password: string;
}

export const login = async (data: loginData) => {
	const { username, password } = data;
	try {
		const res = await signIn('credentials', {
			username,
			password,
			redirectTo: '/auth/dashboard',
		});
		return res;
	} catch (error) {
		if (error instanceof AuthError) {
			switch (error.type) {
				case 'CredentialsSignin':
					return { error: 'Credenciales incorrectas' };
				default:
					return { error: 'Error desconocido' };
			}
		}
		throw error;
	}
};
