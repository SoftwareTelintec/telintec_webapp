'use client';

import { MySelect, TextInput } from '@/app/components';
import axios from 'axios';
import debounce from 'lodash.debounce';
import { useCallback, useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';

const columns = [
	{
		name: 'ID',
		selector: (row: any) => row.id,
		width: '100px',
	},
	{
		name: 'Nombre',
		selector: (row: any) => row.name,
	},
	{
		name: 'SKU',
		selector: (row: any) => row.sku,
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
		sortable: true,
	},
	{
		name: 'Proveedor',
		selector: (row: any) => row.supplier_name,
		sortable: true,
	},
	{
		name: 'Herramienta',
		selector: (row: any) => row.is_tool,
		sortable: true,
		width: '100px',
	},
	{
		name: 'Interno',
		selector: (row: any) => row.is_internal,
		sortable: true,
		width: '100px',
	},
];

interface Product {
	id: number;
	name: string;
	sku: string;
	udm: string;
	stock: number;
	category_name: { label: string; value: string };
	supplier_name: { label: string; value: string };
	is_tool: number;
	is_internal: number;
}

interface Category {
	id: number;
	name: string;
}

interface Supplier {
	id: number;
	name: string;
	seller_email: string;
	seller_name: string;
	phone: string;
	address: string;
	web_url: string;
	type: string;
}

const INITIAL_STATE = {
	id: 0,
	name: '',
	sku: '',
	udm: '',
	stock: 0,
	category_name: {
		label: '',
		value: '',
	},
	supplier_name: {
		label: '',
		value: '',
	},
	is_tool: 0,
	is_internal: 0,
};

function InventoryPage() {
	const [product, setProduct] = useState<Product>(INITIAL_STATE);
	const [products, setProducts] = useState<Array<Product>>();
	const [categories, setCategories] = useState<Array<Category>>();
	const [suppliers, setSuppliers] = useState<Array<Supplier>>();
	const [error, setError] = useState('');
	const [showTable, setShowTable] = useState(false);
	const [loading, setLoading] = useState(false);

	const getAllCategories = async () => {
		await axios
			.get('http://localhost:5000/GUI/api/v1/almacen/inventory/categories/all')
			.then((res) => {
				setCategories(res.data);
			})
			.catch((err) => {
				setError(err);
			});
	};

	const getAllSuppliers = async () => {
		await axios
			.get('http://localhost:5000/GUI/api/v1/almacen/inventory/suppliers/all')
			.then((res) => {
				setSuppliers(res.data);
			})
			.catch((err) => {
				setError(err);
			});
	};

	const getAllProducts = async () => {
		await axios
			.get('http://localhost:5000/GUI/api/v1/almacen/inventory/products/all')
			.then((res) => {
				setProducts(res.data);
			})
			.catch((err) => {
				setError(err);
			});
	};

	const debouncedHandleInputChange = useCallback(
		debounce((name, value) => {
			setProduct((prev): any => ({
				...prev,
				[name]: value,
			}));
		}, 300),
		[]
	);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		debouncedHandleInputChange(name, value);
	};

	const handleSelectedRow = (row: any) => {
		const {
			id,
			name,
			sku,
			udm,
			stock,
			category_name,
			supplier_name,
			is_tool,
			is_internal,
		} = row;
		setProduct({
			id,
			name,
			sku,
			udm,
			stock,
			category_name: { label: category_name, value: category_name },
			supplier_name: { label: supplier_name, value: supplier_name },
			is_tool,
			is_internal,
		});
	};

	const clearFields = () => {
		setProduct(INITIAL_STATE);
	};

	const hadleShowTable = () => {
		setShowTable(!showTable);
	};

	const handleSelectedCategory = (category: any) => {
		setProduct((prev): any => ({
			...prev,
			category_name: category,
		}));
	};

	const handleSelectedSupplier = (supplier: any) => {
		setProduct((prev): any => ({
			...prev,
			supplier_name: supplier,
		}));
	};

	const postNewProduct = async () => {
		const data = {
			info: {
				id: 0,
				name: product.name,
				sku: product.sku,
				udm: product.udm,
				stock: product.stock,
				category_name: product.category_name.value,
				supplier_name: product.supplier_name.value,
				is_tool: product.is_tool,
				is_internal: product.is_internal,
			},
			id: 0,
		};
		await axios('http://localhost:5000/GUI/api/v1/almacen/inventory/product', {
			method: 'POST',
			data,
		})
			.then((res) => {
				console.log(res.data);
			})
			.catch((err) => {
				setError(err);
			});
	};

	const updateProduct = async () => {
		const data = {
			info: {
				id: product.id,
				name: product.name,
				sku: product.sku,
				udm: product.udm,
				stock: product.stock,
				category_name: product.category_name.value,
				supplier_name: product.supplier_name.value,
				is_tool: product.is_tool,
				is_internal: product.is_internal,
			},
			id: 0,
		};
		await axios('http://localhost:5000/GUI/api/v1/almacen/inventory/product', {
			method: 'PUT',
			data,
		})
			.then((res) => {
				console.log(res.data);
			})
			.catch((err) => {
				setError(err);
			});
	};

	const deleteProduct = async () => {
		const data = {
			id: product.id,
		};
		await axios('http://localhost:5000/GUI/api/v1/almacen/inventory/product', {
			method: 'DELETE',
			data,
		})
			.then((res) => {
				console.log(res.data);
			})
			.catch((err) => {
				setError(err);
			});
	};

	useEffect(() => {
		getAllCategories();
		getAllSuppliers();
		getAllProducts();
		setTimeout(() => {
			setLoading(false);
		}, 300);
	}, []);

	return (
		<section className="flex flex-col p-10 ml-20 w-full gap-5 2xl:container 2xl:mx-auto">
			<h1 className="text-4xl text-neutral-200">Inventario</h1>
			<div className="w-full h-auto border border-neutral-500/50 bg-neutral-800/20 rounded grid grid-cols-2 gap-4 px-4 py-6">
				<TextInput
					label="ID Producto"
					name="id_product"
					placeholder="Ingresa el id del producto"
					onChange={(e) => handleInputChange(e)}
					defaultValue={product?.id ? String(product.id) : ''}
				/>
				<TextInput
					label="Nombre del producto"
					name="name"
					placeholder="Ingresa el nombre del producto"
					onChange={(e) => handleInputChange(e)}
					defaultValue={product?.name ? String(product.name) : ''}
				/>
				<TextInput
					label="SKU del producto"
					name="sku"
					placeholder="Ingresa el SKU del producto"
					onChange={(e) => handleInputChange(e)}
					defaultValue={product?.sku ? String(product.sku) : ''}
				/>
				<TextInput
					label="UDM del producto"
					name="udm"
					placeholder="Ingresa el UDM del producto"
					onChange={(e) => handleInputChange(e)}
					defaultValue={product?.udm ? String(product.udm) : ''}
				/>
				<TextInput
					label="Stock del producto"
					name="stock"
					placeholder="Ingresa el stock del producto"
					onChange={(e) => handleInputChange(e)}
					defaultValue={product?.stock ? String(product.stock) : ''}
				/>
				<div className="w-full h-auto flex flex-col">
					<label htmlFor="">Categoria</label>
					<MySelect
						placeholder="Selecciona una categoria"
						options={categories?.data?.map((category) => ({
							value: category.id,
							label: category.name,
						}))}
						value={product?.category_name}
						onChange={handleSelectedCategory}
					/>
				</div>
				<div className="w-full h-auto flex flex-col">
					<label htmlFor="">Proveedor</label>
					<MySelect
						placeholder="Selecciona un proveedor"
						options={suppliers?.data?.map((supplier) => ({
							value: supplier.id,
							label: supplier.name,
						}))}
						value={product?.supplier_name || { label: '', value: '' }}
						onChange={handleSelectedSupplier}
					/>
				</div>

				<div className="grid grid-cols-2 gap-6 items-center justify-center mt-4">
					<div className="flex gap-4">
						<label htmlFor="is_tool">Herramienta</label>
						<input
							type="checkbox"
							name="is_tool"
							checked={product?.is_tool === 0 ? false : true}
							onChange={(e) => {
								setProduct((prev): any => ({
									...prev,
									is_tool: e.target.checked ? 1 : 0,
								}));
							}}
						/>
					</div>
					<div className="flex gap-4">
						<label htmlFor="is_internal">Interno</label>
						<input
							type="checkbox"
							name="is_internal"
							checked={product?.is_internal === 0 ? false : true}
							onChange={(e) => {
								setProduct((prev): any => ({
									...prev,
									is_internal: e.target.checked ? 1 : 0,
								}));
							}}
						/>
					</div>
				</div>
			</div>
			<div className="flex flex-col gap-5 w-full">
				{error && (
					<div className="bg-red-500 text-white p-4 rounded-md">
						{error.message}
					</div>
				)}
				<div className="w-full flex gap-4 items-center justify-around px-4 py-6">
					<button
						className="px-4 py-2 bg-cyan-700 rounded-md text-neutral-800 font-semibold tracking-wider"
						onClick={clearFields}
					>
						Limpiar Campos
					</button>
					<button
						className="px-4 py-2 bg-cyan-700 rounded-md text-neutral-800 font-semibold tracking-wider"
						onClick={postNewProduct}
					>
						Agregar Entrada
					</button>
					<button
						className="px-4 py-2 bg-cyan-700 rounded-md text-neutral-800 font-semibold tracking-wider"
						onClick={updateProduct}
					>
						Actualizar Entrada
					</button>
					<button
						className="px-4 py-2 bg-[#cecece] rounded-md text-red-500 border border-red-500 font-semibold tracking-wider"
						onClick={deleteProduct}
					>
						Eliminar Entrada
					</button>
					<button
						className="px-4 py-2 bg-cyan-700 rounded-md text-neutral-800 font-semibold tracking-wider"
						onClick={hadleShowTable}
					>
						Ver Tabla
					</button>
				</div>
				{showTable && (
					<DataTable
						columns={columns}
						data={products?.data}
						onRowDoubleClicked={(row) => handleSelectedRow(row)}
						pagination
						paginationPerPage={10}
						progressPending={loading}
					/>
				)}
			</div>
		</section>
	);
}

export default InventoryPage;
