'use client';

import { useState, useEffect, useCallback } from 'react';
import { Categories, Product, Products, Suppliers } from '@/types/types';
import useModal from '@/hooks/useModal';
import useFetch from '@/hooks/useFetch';
import { debounce } from '@/lib/utils';
import DataTable from 'react-data-table-component';
import { movementsColumns } from '@/columnsConstants';
import {
	CustomInput,
	CustomModal,
	Loader,
	CustomSelect,
	Button,
	Label,
	CustomSwitch,
} from '@/components';
import MainContainer from '@/containers/MainContainer';

const INITIAL_STATE = {
	id: 0,
	name: '',
	sku: '',
	udm: '',
	stock: 0,
	category: {
		value: '',
		label: '',
	},
	supplier: {
		value: '',
		label: '',
	},
	is_tool: 0,
	is_internal: 0,
};

export default function InventoryPage() {
	const [currentProduct, setCurrentProduct] = useState<Product>(INITIAL_STATE);
	const [showTable, setShowTable] = useState(false);
	const { modalIsOpen, modalMessage, openModal, closeModal, handleConfirm } =
		useModal();

	const {
		data: categoriesData,
		error: categoriesError,
		loading: categoriesLoading,
	} = useFetch<Categories | undefined>({
		method: 'GET',
		url: '/almacen/inventory/categories/all',
	});

	const {
		data: supplierData,
		error: supplierError,
		loading: supplierLoading,
	} = useFetch<Suppliers | undefined>({
		method: 'GET',
		url: '/almacen/inventory/suppliers/all',
	});

	const {
		data: productsData,
		error: productsError,
		loading: productsLoading,
	} = useFetch<Products | undefined>({
		method: 'GET',
		url: '/almacen/inventory/products/all',
	});

	// eslint-disable-next-line react-hooks/exhaustive-deps
	const debouncedHandleInputChange = useCallback(
		debounce((newCurrentProduct: Partial<Product>) => {
			setCurrentProduct((prev) => ({
				...prev,
				...newCurrentProduct,
			}));
		}, 300),
		[]
	);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setCurrentProduct((prev) => ({
			...prev,
			[name]: value,
		}));
		debouncedHandleInputChange(name, value);
	};

	const handleSelectedCategory = (value: string) => {
		const selectedCategory = categoriesData?.data?.find(
			(category) => category.id === value
		);
		if (selectedCategory) {
			setCurrentProduct({
				...currentProduct,
				category: { value: selectedCategory.id, label: selectedCategory.name },
			});
		}
	};

	const handleSelectedSupplier = (value: string) => {
		const selectedSupplier = supplierData?.data?.find(
			(supplier) => supplier.id === value
		);
		if (selectedSupplier) {
			setCurrentProduct({
				...currentProduct,
				supplier: { value: selectedSupplier.id, label: selectedSupplier.name },
			});
		}
	};

	const clearFields = () => {
		setCurrentProduct(INITIAL_STATE);
	};

	if (categoriesLoading || supplierLoading || productsLoading)
		return <Loader />;

	return (
		<MainContainer>
			<h2 className="text-4xl text-neutral-200">Inventario</h2>
			<section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-4 py-6 mt-6 w-full h-full border border-neutral-500/50 bg-neutral-800/20 rounded">
				<CustomInput
					id="id"
					label="Id del producto"
					value={String(`${currentProduct.id}`)}
					placeholder=""
					type="number"
					disabled={true}
					handleDataChange={(e) => handleInputChange(e)}
				/>
				<CustomInput
					id="name"
					label="Nombre del producto"
					value={currentProduct.name}
					placeholder="Ingresa el nombre"
					type="text"
					handleDataChange={(e) => handleInputChange(e)}
				/>
				<CustomInput
					id="sku"
					label="SKU del producto"
					value={currentProduct.sku}
					placeholder="Ingresa el sku"
					type="text"
					handleDataChange={(e) => handleInputChange(e)}
				/>
				<CustomInput
					id="udm"
					label="UDM del producto"
					value={currentProduct.udm}
					placeholder="Ingresa la unidad de medida"
					type="text"
					handleDataChange={(e) => handleInputChange(e)}
				/>
				<CustomInput
					id="stock"
					label="Stock del producto"
					value={String(currentProduct.stock)}
					type="number"
					handleDataChange={(e) => handleInputChange(e)}
				/>
				<CustomSelect
					placeholder="Selecciona una categoria"
					id="Categoria del producto"
					value={currentProduct.category}
					data={
						categoriesData?.data?.map((category) => ({
							value: category.id,
							label: category.name,
						})) ?? []
					}
					handleDataChange={handleSelectedCategory}
				/>
				<CustomSelect
					placeholder="Selecciona un proveedor"
					id="Proveedor del producto"
					value={currentProduct.supplier}
					data={
						supplierData?.data?.map((category) => ({
							value: category.id,
							label: category.name,
						})) ?? []
					}
					handleDataChange={handleSelectedSupplier}
				/>

				<CustomSwitch
					id="tool"
					label="Herramienta"
					checked={currentProduct.is_tool === 0 ? false : true}
					onClick={() =>
						setCurrentProduct({
							...currentProduct,
							is_tool: currentProduct.is_tool === 0 ? 1 : 0,
						})
					}
				/>

				<CustomSwitch
					id="internal"
					label="Interno"
					checked={currentProduct.is_internal === 0 ? false : true}
					onClick={() =>
						setCurrentProduct({
							...currentProduct,
							is_internal: currentProduct.is_internal === 0 ? 1 : 0,
						})
					}
				/>
				<section className="col-span-1 lg:col-span-3 w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-6 py-6 lg:py-8">
					<div className="w-full">
						<Button
							className="w-full bg-[#5970D3]"
							size="lg"
							onClick={() =>
								openModal('Desear limpiar los campos?', clearFields)
							}
						>
							Limpiar Campos
						</Button>
					</div>
					<div className="w-full">
						<Button className="w-full bg-[#5970D3]" size="lg">
							Agregar Producto
						</Button>
					</div>
					<div className="w-full">
						<Button className="w-full bg-[#5970D3]" size="lg">
							Actualizar Producto
						</Button>
					</div>
					<div className="w-full">
						<Button className="w-full bg-[#5970D3]" size="lg">
							Eliminar Producto
						</Button>
					</div>
					<div className="w-full">
						<Button
							className="w-full bg-[#5970D3]"
							size="lg"
							onClick={() => setShowTable(!showTable)}
						>
							{showTable ? 'Cerrar tabla' : 'Ver tabla'}
						</Button>
					</div>
				</section>
			</section>

			{showTable && (
				<div className="w-full h-auto rounded mt-12">
					<DataTable
						columns={movementsColumns}
						data={productsData?.data ?? []}
						onRowDoubleClicked={(row) => console.log(row)}
						pagination
						paginationPerPage={10}
					/>
				</div>
			)}
			<CustomModal
				isOpen={modalIsOpen}
				onRequestClose={closeModal}
				onConfirm={handleConfirm}
				message={modalMessage}
			/>
		</MainContainer>
	);
}

// 'use client';

// import { MySelect, TextInput } from '@/app/components';
// import CustomModal from '@/app/components/ui/CustomModal';
// import useModal from '@/app/hooks/useModal';
// import axios from 'axios';
// import debounce from 'lodash.debounce';
// import { useCallback, useEffect, useState } from 'react';
// import DataTable from 'react-data-table-component';

// function InventoryPage() {
// 	const [product, setProduct] = useState<Product>(INITIAL_STATE);
// 	const [products, setProducts] = useState<Array<Product>>();
// 	const [categories, setCategories] = useState<Array<Category>>();
// 	const [suppliers, setSuppliers] = useState<Array<Supplier>>();
// 	const [error, setError] = useState('');
// 	const [showTable, setShowTable] = useState(false);
// 	const [loading, setLoading] = useState(false);
// 	const [res, setRes] = useState<any>();
// 	const { modalIsOpen, modalMessage, openModal, closeModal, handleConfirm } =
// 		useModal();

// 	const debouncedHandleInputChange = useCallback(
// 		debounce((name, value) => {
// 			setProduct((prev): any => ({
// 				...prev,
// 				[name]: value,
// 			}));
// 		}, 300),
// 		[]
// 	);

// 	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// 		const { name, value } = e.target;
// 		debouncedHandleInputChange(name, value);
// 	};

// 	const handleSelectedRow = (row: any) => {
// 		const {
// 			id,
// 			name,
// 			sku,
// 			udm,
// 			stock,
// 			category_name,
// 			supplier_name,
// 			is_tool,
// 			is_internal,
// 		} = row;
// 		setProduct({
// 			id,
// 			name,
// 			sku,
// 			udm,
// 			stock,
// 			category_name: { label: category_name, value: category_name },
// 			supplier_name: { label: supplier_name, value: supplier_name },
// 			is_tool,
// 			is_internal,
// 		});
// 	};

// 	const clearFields = () => {
// 		setProduct(INITIAL_STATE);
// 	};

// 	const hadleShowTable = () => {
// 		setShowTable(!showTable);
// 	};

// 	const handleSelectedCategory = (category: any) => {
// 		setProduct((prev): any => ({
// 			...prev,
// 			category_name: category,
// 		}));
// 	};

// 	const handleSelectedSupplier = (supplier: any) => {
// 		setProduct((prev): any => ({
// 			...prev,
// 			supplier_name: supplier,
// 		}));
// 	};

// 	const postNewProduct = async () => {
// 		const data = {
// 			info: {
// 				id: 0,
// 				name: String(product.name),
// 				sku: String(product.sku),
// 				udm: String(product.udm),
// 				stock: Number(product.stock),
// 				category_name: String(product.category_name.value),
// 				supplier_name: String(product.supplier_name.value),
// 				is_tool: product.is_tool,
// 				is_internal: product.is_internal,
// 			},
// 			id: 0,
// 		};
// 		await axios(
// 			`${process.env.NEXT_PUBLIC_API_HOST}/almacen/inventory/product`,
// 			{
// 				method: 'POST',
// 				data,
// 			}
// 		)
// 			.then((res) => {
// 				setRes(res.data);
// 			})
// 			.catch((err) => {
// 				setError(err);
// 			});
// 	};

// 	const updateProduct = async () => {
// 		const data = {
// 			info: {
// 				id: Number(product.id),
// 				name: String(product.name),
// 				sku: String(product.sku),
// 				udm: String(product.udm),
// 				stock: Number(product.stock),
// 				category_name: String(product.category_name.value),
// 				supplier_name: String(product.supplier_name.value),
// 				is_tool: product.is_tool,
// 				is_internal: product.is_internal,
// 			},
// 			id: 0,
// 		};
// 		await axios(
// 			`${process.env.NEXT_PUBLIC_API_HOST}/almacen/inventory/product`,
// 			{
// 				method: 'PUT',
// 				data,
// 			}
// 		)
// 			.then((res) => {
// 				setRes(res.data);
// 			})
// 			.catch((err) => {
// 				setError(err);
// 			});
// 	};

// 	const deleteProduct = async () => {
// 		const data = {
// 			id: product.id,
// 		};
// 		await axios(
// 			`${process.env.NEXT_PUBLIC_API_HOST}/almacen/inventory/product`,
// 			{
// 				method: 'DELETE',
// 				data,
// 			}
// 		)
// 			.then((res) => {
// 				setRes(res.data);
// 			})
// 			.catch((err) => {
// 				setError(err);
// 			});
// 	};

// 	useEffect(() => {
// 		getAllCategories();
// 		getAllSuppliers();
// 		getAllProducts();
// 		setTimeout(() => {
// 			setLoading(false);
// 		}, 300);
// 	}, []);

// 	return (
// 		<section className="flex flex-col p-10 ml-20 w-full gap-5 2xl:container 2xl:mx-auto">
// 			<h2 className="text-4xl text-neutral-200">Inventario</h2>
// 			<div className="w-full h-auto border border-neutral-500/50 bg-neutral-800/20 rounded grid grid-cols-2 gap-4 px-4 py-6">
// 				<TextInput
// 					label="ID Producto"
// 					name="id_product"
// 					placeholder="Ingresa el id del producto"
// 					onChange={(e) => handleInputChange(e)}
// 					defaultValue={product?.id ? String(product.id) : ''}
// 				/>
// 				<TextInput
// 					label="Nombre del producto"
// 					name="name"
// 					placeholder="Ingresa el nombre del producto"
// 					onChange={(e) => handleInputChange(e)}
// 					defaultValue={product?.name ? String(product.name) : ''}
// 				/>
// 				<TextInput
// 					label="SKU del producto"
// 					name="sku"
// 					placeholder="Ingresa el SKU del producto"
// 					onChange={(e) => handleInputChange(e)}
// 					defaultValue={product?.sku ? String(product.sku) : ''}
// 				/>
// 				<TextInput
// 					label="UDM del producto"
// 					name="udm"
// 					placeholder="Ingresa el UDM del producto"
// 					onChange={(e) => handleInputChange(e)}
// 					defaultValue={product?.udm ? String(product.udm) : ''}
// 				/>
// 				<TextInput
// 					label="Stock del producto"
// 					name="stock"
// 					placeholder="Ingresa el stock del producto"
// 					onChange={(e) => handleInputChange(e)}
// 					defaultValue={product?.stock ? String(product.stock) : ''}
// 				/>

// 				<MySelect
// 					label={'Categoria'}
// 					placeholder="Selecciona una categoria"
// 					options={categories?.data?.map((category) => ({
// 						value: category.id,
// 						label: category.name,
// 					}))}
// 					value={product?.category_name}
// 					onChange={handleSelectedCategory}
// 				/>

// 				<MySelect
// 					label={'Proveedor'}
// 					placeholder="Selecciona un proveedor"
// 					options={suppliers?.data?.map((supplier) => ({
// 						value: supplier.id,
// 						label: supplier.name,
// 					}))}
// 					value={product?.supplier_name || { label: '', value: '' }}
// 					onChange={handleSelectedSupplier}
// 				/>

// 				<div className="grid grid-cols-2 gap-6 items-center justify-center mt-4">
// 					<div className="flex gap-4">
// 						<label htmlFor="is_tool">Herramienta</label>
// 						<input
// 							type="checkbox"
// 							name="is_tool"
// 							checked={product?.is_tool === 0 ? false : true}
// 							onChange={(e) => {
// 								setProduct((prev): any => ({
// 									...prev,
// 									is_tool: e.target.checked ? 1 : 0,
// 								}));
// 							}}
// 						/>
// 					</div>
// 					<div className="flex gap-4">
// 						<label htmlFor="is_internal">Interno</label>
// 						<input
// 							type="checkbox"
// 							name="is_internal"
// 							checked={product?.is_internal === 0 ? false : true}
// 							onChange={(e) => {
// 								setProduct((prev): any => ({
// 									...prev,
// 									is_internal: e.target.checked ? 1 : 0,
// 								}));
// 							}}
// 						/>
// 					</div>
// 				</div>
// 			</div>
// 			<div className="flex flex-col gap-5 w-full">
// 				{error && (
// 					<div className="bg-red-500 text-white p-4 rounded-md">
// 						{error.message}
// 					</div>
// 				)}
// 				<div className="w-full flex gap-4 items-center justify-around px-4 py-6">
// 					<button
// 						className="px-4 py-2 bg-cyan-700 rounded-md text-neutral-800 font-semibold tracking-wider"
// 						onClick={clearFields}
// 					>
// 						Limpiar Campos
// 					</button>
// 					<button
// 						className="px-4 py-2 bg-cyan-700 rounded-md text-neutral-800 font-semibold tracking-wider"
// 						onClick={() =>
// 							openModal(
// 								'¿Estás seguro de agregar este producto?',
// 								postNewProduct
// 							)
// 						}
// 					>
// 						Agregar Producto
// 					</button>
// 					<button
// 						className="px-4 py-2 bg-cyan-700 rounded-md text-neutral-800 font-semibold tracking-wider"
// 						onClick={() =>
// 							openModal(
// 								'¿Estás seguro de actualizar este producto?',
// 								updateProduct
// 							)
// 						}
// 					>
// 						Actualizar Producto
// 					</button>
// 					<button
// 						className="px-4 py-2 bg-[#cecece] rounded-md text-red-500 border border-red-500 font-semibold tracking-wider"
// 						onClick={() =>
// 							openModal(
// 								'¿Estás seguro de eliminar este producto?',
// 								deleteProduct
// 							)
// 						}
// 					>
// 						Eliminar Producto
// 					</button>
// 					<button
// 						className="px-4 py-2 bg-cyan-700 rounded-md text-neutral-800 font-semibold tracking-wider"
// 						onClick={hadleShowTable}
// 					>
// 						Ver Tabla
// 					</button>
// 				</div>
// 				{showTable && (
// 					<DataTable
// 						columns={columns}
// 						data={products?.data}
// 						onRowDoubleClicked={(row) => handleSelectedRow(row)}
// 						pagination
// 						paginationPerPage={10}
// 						progressPending={loading}
// 					/>
// 				)}
// 			</div>
// 			<CustomModal
// 				isOpen={modalIsOpen}
// 				onRequestClose={closeModal}
// 				onConfirm={handleConfirm}
// 				message={modalMessage}
// 			/>
// 		</section>
// 	);
// }

// export default InventoryPage;
