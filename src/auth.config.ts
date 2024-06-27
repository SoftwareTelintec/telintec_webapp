import type { NextAuthConfig } from 'next-auth';
import credentials from 'next-auth/providers/credentials';

export default {
	providers: [
		credentials({
			credentials: {
				username: {},
				password: {},
			},
			authorize: async (credentials) => {
				const convertedPassword = require('crypto');
				const hashedPassword = convertedPassword
					.createHash('md5')
					.update(credentials?.password)
					.digest('hex');
				const data = {
					username: credentials?.username,
					password: hashedPassword,
				};
				const res = await fetch(
					`${process.env.NEXT_PUBLIC_API_HOST}/auth/loginUP`,
					{
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
						},
						body: JSON.stringify(data),
					}
				);
				const resData = await res.json();
				if (!resData.emp_id) throw new Error('Usuario no encontrado');

				const roles: { [key: string]: boolean } = {};
				resData.permissions.forEach((permission) => {
					const { role } = permission;
					roles[role] = true;
				});
				resData.permission = roles;

				return {
					name: {
						id: resData.emp_id,
						name: resData.name,
						role: resData.permission,
						contract: resData.contract,
					},
				};
			},
		}),
	],
} satisfies NextAuthConfig;
