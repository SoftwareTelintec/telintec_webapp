export const pagesPerRole = [
	{
		role: 'admin',
		pages: [
			'/auth/dashboard',
			'/auth/warehouse',
			'/auth/rrhh',
			'/auth/sm',
			'/auth/logs',
			'/auth/settings',
		],
	},
	{
		role: 'almacen',
		pages: ['/auth/dashboard', '/auth/warehouse'],
	},
	{
		role: 'rrhh',
		pages: ['/auth/dashboard', '/auth/rrhh'],
	},
	{
		role: 'bitacoras',
		pages: ['/auth/dashboard', '/auth/logs'],
	},
	{
		role: 'sm',
		pages: ['/auth/dashboard', '/auth/sm'],
	},
];
