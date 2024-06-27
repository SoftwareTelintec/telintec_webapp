export const placeList = [
	{
		id: 1,
		name: 'GUERRERO',
	},
	{
		id: 2,
		name: 'UNIVERSIDAD',
	},
	{
		id: 3,
		name: 'ALMACEN',
	},
	{
		id: 4,
		name: 'CURUBUSCO',
	},
	{
		id: 5,
		name: 'MITRAS',
	},
	{
		id: 6,
		name: 'LARGOS NORTE',
	},
	{
		id: 7,
		name: 'JUVENTUD',
	},
	{
		id: 8,
		name: 'PESQUERIA',
	},
	{
		id: 9,
		name: 'CSI',
	},
	{
		id: 10,
		name: 'CSC',
	},
	{
		id: 11,
		name: 'EDIFICIO METALICOS',
	},
	{
		id: 12,
		name: 'NOVA',
	},
	{
		id: 13,
		name: 'PUEBLA',
	},
	{
		id: 14,
		name: 'SAN LUIS',
	},
	{
		id: 15,
		name: 'OTROS',
	},
];

export const incidences = [
	{ id: 1, name: 'acuerdo' },
	{ id: 2, name: 'permiso sin goce' },
	{ id: 3, name: 'festivo' },
	{ id: 4, name: 'vacaciones' },
	{ id: 5, name: 'incapacidad' },
	{ id: 6, name: 'suspension' },
];

export const events = [
	{ id: 1, name: 'falta' },
	{ id: 2, name: 'atraso' },
	{ id: 3, name: 'extra' },
	{ id: 4, name: 'normal' },
];

export const columns = [
	{
		name: 'ID',
		selector: (row: any) => row.id,
	},
	{
		name: 'ID Empleado',
		selector: (row: any) => row.idEmployee,
	},
	{
		name: 'Nombre',
		selector: (row: any) => row.name,
	},
	{
		name: 'Contrato',
		selector: (row: any) => row.contract,
	},
	{
		name: 'Evento',
		selector: (row: any) => row.event,
	},
	{
		name: 'Lugar',
		selector: (row: any) => row.location,
	},
	{
		name: 'Actividad',
		selector: (row: any) => row.activity,
	},
	{
		name: 'Timestamp',
		selector: (row: any) => row.timestamp,
	},
	{
		name: 'Valor',
		selector: (row: any) => row.value,
	},
	{
		name: 'Comentario',
		selector: (row: any) => row.comment,
	},
];

export const pagesPerRole = [
	{
		role: 'admin',
		pages: [
			'/auth/dashboard',
			'/auth/dashboard/warehouse',
			'/auth/dashboard/sm',
			'/auth/dashboard/warehouse',
			'/auth/dashboard/rrhh',
			'/auth/dashboard/sm',
			'/auth/dashboard/logs',
		],
	},
	{
		role: 'almacen',
		pages: ['/auth/dashboard', '/auth/dashboard/warehouse'],
	},
	{
		role: 'rrhh',
		pages: ['/auth/dashboard', '/auth/dashboard/rrhh'],
	},
	{
		role: 'bitacoras',
		pages: ['/auth/dashboard', '/auth/dashboard/logs'],
	},
	{
		role: 'sm',
		pages: ['/auth/dashboard', '/auth/dashboard/sm'],
	},
];
