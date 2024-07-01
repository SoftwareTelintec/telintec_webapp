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
		// no tiene asistente ni dashboard
		pages: ['/auth/logs'],
	},
	{
		role: 'sm',
		// no tiene asistente ni dashboard
		pages: ['/auth/sm'],
	},
];

// dashboard solo almaacen, sm y admn
