export const smColumns = [
	{
		name: 'ID',
		selector: (row: any) => row.id,
		width: '100px',
	},
	{
		name: 'Codigo de SM',
		selector: (row: any) => row.sm_code,
		width: '100px',
	},
	{
		name: 'Folio',
		selector: (row: any) => row.folio,
		sortable: true,
		width: '100px',
	},
	{
		name: 'Contrato',
		selector: (row: any) => row.contract,
		sortable: true,
		width: '100px',
	},
	{
		name: 'Planta',
		selector: (row: any) => row.facility,
		sortable: true,
		width: '100px',
	},
	{
		name: 'Área',
		selector: (row: any) => row.location,
		sortable: true,
		width: '100px',
	},
	{
		name: 'Cliente',
		selector: (row: any) => row.client_id,
		sortable: true,
		width: '100px',
	},
	{
		name: 'Número de orden',
		selector: (row: any) => row.order_quotation,
		sortable: true,
		width: '100px',
	},
	{
		name: 'Personal',
		selector: (row: any) => row.emp_id,
		sortable: true,
		width: '100px',
	},
	{
		name: 'Fecha de inicio',
		selector: (row: any) => row.date,
		sortable: true,
		width: '200px',
	},
	{
		name: 'Fecha de fin',
		selector: (row: any) => row.limit_date,
		sortable: true,
		width: '200px',
	},
	{
		name: 'Estado de la orden',
		selector: (row: any) => row.status,
		sortable: true,
		width: '200px',
	},
	{
		name: 'Historial',
		selector: (row: any) => row.history,
		sortable: true,
		width: '300px',
	},
	{
		name: 'Comentarios',
		selector: (row: any) => row.comments,
		sortable: true,
		width: '300px',
	},
	{
		name: 'Productos',
		selector: (row: any) => row.items,
		width: '300px',
	},
];

export const movementsColumns = [
	{
		name: 'ID',
		selector: (row: any) => row.id,
		width: '50px',
	},
	{
		name: 'Nombre',
		selector: (row: any) => row.name,
		width: '300px',
	},
	{
		name: 'SKU',
		selector: (row: any) => row.sku,
		width: '150px',
	},
	{
		name: 'UDM',
		selector: (row: any) => row.udm,
		width: '100px',
	},
	{
		name: 'Stock',
		selector: (row: any) => row.stock,
		width: '100px',
	},
	{
		name: 'Categoria',
		selector: (row: any) => row.category_name,
		width: '120px',
		sortable: true,
	},
	{
		name: 'Proveedor',
		selector: (row: any) => row.supplier_name,
		width: '120px',
		sortable: true,
	},
	{
		name: 'Herramienta',
		selector: (row: any) => row.is_tool,
		sortable: true,
		width: '120px',
	},
	{
		name: 'Interno',
		selector: (row: any) => row.is_internal,
		sortable: true,
		width: '120px',
	},
];
