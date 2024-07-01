// login
export interface FormData {
	username: string;
	password: string;
}

// inventory movements
export interface Product {
	id: number;
	name: string;
	sku: string;
	udm: string;
	stock: number;
	category: { label: string; value: string };
	supplier: { label: string; value: string };
	is_tool: number;
	is_internal: number;
}

export interface Category {
	id: string;
	name: string;
}

export interface Supplier {
	id: string;
	name: string;
}

export interface Products {
	data: Product[] | undefined;
}

export interface Categories {
	data: Category[] | undefined;
}

export interface Suppliers {
	data: Supplier[] | undefined;
}
