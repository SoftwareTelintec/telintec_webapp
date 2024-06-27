import React from 'react';
import MainContainer from '@/containers/MainContainer';
import { CustomChart } from '@/components/ui/CustomChart';

const data = {
	labels: [
		'2016',
		'2017',
		'2018',
		'2019',
		'2020',
		'2021',
		'2022',
		'2023',
		'2024',
	],
	datasets: [
		{
			label: 'Sales',
			data: [5000, 10000, 7500, 15000, 20000, 15000, 20000, 25000, 30000],
			fill: true,
			backgroundColor: 'rgba(75,192,192,0.2)',
			borderColor: 'rgba(75,192,192,1)',
			tension: 0.1,
		},
	],
};

export default function DashboardPage() {
	return (
		<MainContainer>
			<section className="w-full h-full flex flex-col justify-center gap-4 p-4">
				<header className="w-full flex flex-col md:flex-row justify-between items-center gap-4">
					<h2 className="text-2xl font-bold text-slate-100">Dashboard</h2>
					<div className="flex items-center w-full md:w-auto">
						<input
							type="text"
							placeholder="Search..."
							className="border p-2 rounded-md flex-1"
						/>
						<div className="ml-4 h-8 w-8 bg-gray-200 rounded-full"></div>
					</div>
				</header>
				<section className="w-full flex flex-col md:flex-row items-start justify-center gap-4">
					<aside className="w-full md:w-64 h-full bg-white p-4 rounded-md shadow-md hidden md:block">
						<h2 className="text-xl font-semibold">TarreManager</h2>
						<nav className="mt-4">
							<ul>
								<li className="mt-2">
									<a
										href="#"
										className="flex items-center p-2 text-gray-700 rounded-md hover:bg-gray-200"
									>
										Dashboard
									</a>
								</li>
								<li className="mt-2">
									<a
										href="#"
										className="flex items-center p-2 text-gray-700 rounded-md hover:bg-gray-200"
									>
										Companies
									</a>
								</li>
								<li className="mt-2">
									<a
										href="#"
										className="flex items-center p-2 text-gray-700 rounded-md hover:bg-gray-200"
									>
										Calendar
									</a>
								</li>
							</ul>
						</nav>
						<div className="mt-8">
							<h3 className="text-lg font-semibold">Tools</h3>
							<ul>
								<li className="mt-2">
									<a
										href="#"
										className="flex items-center p-2 text-gray-700 rounded-md hover:bg-gray-200"
									>
										FAQs
									</a>
								</li>
								<li className="mt-2">
									<a
										href="#"
										className="flex items-center p-2 text-gray-700 rounded-md hover:bg-gray-200"
									>
										Analytics
									</a>
								</li>
							</ul>
						</div>
					</aside>
					<main className="w-full lg:flex-1">
						<section className="grid grid-cols-1 md:grid-cols-3 gap-4">
							<div className="bg-white p-4 rounded-md shadow-md">
								<h2 className="text-lg font-semibold">Companies created</h2>
								<p className="text-2xl">12,450</p>
								<p className="text-green-500">15% ↑</p>
							</div>
							<div className="bg-white p-4 rounded-md shadow-md">
								<h2 className="text-lg font-semibold">Total Revenue</h2>
								<p className="text-2xl">86.5%</p>
								<p className="text-green-500">80% ↑</p>
							</div>
							<div className="bg-white p-4 rounded-md shadow-md">
								<h2 className="text-lg font-semibold">Bounce Rate</h2>
								<p className="text-2xl">363,95€</p>
								<p className="text-green-500">30% ↑</p>
							</div>
						</section>
						<section className="mt-8 bg-white p-4 rounded-md shadow-md">
							<h2 className="text-lg font-semibold">Last customers</h2>
							<div className="overflow-x-auto">
								<table className="w-full mt-4 table-auto">
									<thead>
										<tr className="bg-gray-200">
											<th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
												Status
											</th>
											<th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
												Email
											</th>
											<th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
												Amount
											</th>
											<th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
												Actions
											</th>
										</tr>
									</thead>
									<tbody>
										<tr className="border-b">
											<td className="px-4 py-2 text-sm text-gray-900">
												Success
											</td>
											<td className="px-4 py-2 text-sm text-gray-900">
												ken99@yahoo.com
											</td>
											<td className="px-4 py-2 text-sm text-gray-900">
												$316.00
											</td>
											<td className="px-4 py-2 text-sm text-gray-900">
												<button className="px-2 py-1 bg-blue-500 text-white text-xs font-medium rounded hover:bg-blue-600">
													View
												</button>
											</td>
										</tr>
										<tr className="border-b bg-gray-50">
											<td className="px-4 py-2 text-sm text-gray-900">
												Success
											</td>
											<td className="px-4 py-2 text-sm text-gray-900">
												abe45@gmail.com
											</td>
											<td className="px-4 py-2 text-sm text-gray-900">
												$242.00
											</td>
											<td className="px-4 py-2 text-sm text-gray-900">
												<button className="px-2 py-1 bg-blue-500 text-white text-xs font-medium rounded hover:bg-blue-600">
													View
												</button>
											</td>
										</tr>
										<tr className="border-b">
											<td className="px-4 py-2 text-sm text-gray-900">
												Processing
											</td>
											<td className="px-4 py-2 text-sm text-gray-900">
												monserrat44@gmail.com
											</td>
											<td className="px-4 py-2 text-sm text-gray-900">
												$837.00
											</td>
											<td className="px-4 py-2 text-sm text-gray-900">
												<button className="px-2 py-1 bg-blue-500 text-white text-xs font-medium rounded hover:bg-blue-600">
													View
												</button>
											</td>
										</tr>
										<tr className="border-b bg-gray-50">
											<td className="px-4 py-2 text-sm text-gray-900">
												Success
											</td>
											<td className="px-4 py-2 text-sm text-gray-900">
												silas22@gmail.com
											</td>
											<td className="px-4 py-2 text-sm text-gray-900">
												$874.00
											</td>
											<td className="px-4 py-2 text-sm text-gray-900">
												<button className="px-2 py-1 bg-blue-500 text-white text-xs font-medium rounded hover:bg-blue-600">
													View
												</button>
											</td>
										</tr>
										<tr>
											<td className="px-4 py-2 text-sm text-gray-900">
												Failed
											</td>
											<td className="px-4 py-2 text-sm text-gray-900">
												carmella@hotmail.com
											</td>
											<td className="px-4 py-2 text-sm text-gray-900">
												$721.00
											</td>
											<td className="px-4 py-2 text-sm text-gray-900">
												<button className="px-2 py-1 bg-blue-500 text-white text-xs font-medium rounded hover:bg-blue-600">
													View
												</button>
											</td>
										</tr>
									</tbody>
								</table>
							</div>
						</section>
						<section className="mt-8 bg-white p-4 rounded-md shadow-md w-full h-full">
							<h2 className="text-lg font-semibold">Sales Distribution</h2>
							<CustomChart data={data} />
						</section>
					</main>
				</section>
			</section>
		</MainContainer>
	);
}
