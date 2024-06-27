'use client';

import { BarChart, Card, DonutChart } from '@tremor/react';

const data = [
	{
		Mes: 'Enero',
		Ventas: 10,
	},
	{
		Mes: 'Febrero',
		Ventas: 5,
	},
	{
		Mes: 'Marzo',
		Ventas: 4,
	},
	{
		Mes: 'Abril',
		Ventas: 2,
	},
	{
		Mes: 'Mayo',
		Ventas: 1,
	},
];

function DashboardPage() {
	return (
		<>
			<section className="flex flex-col p-10 ml-20 w-full gap-5 2xl:container 2xl:mx-auto">
				<h1 className="text-4xl text-neutral-200">Dashboard</h1>
				<div className="w-full h-auto grid grid-cols-2 gap-4 items-center justify-center">
					<Card className="w-full h-full">
						<BarChart data={data} index="Mes" categories={['Ventas']} />
					</Card>

					<Card className="w-full h-full flex flex-col gap-4 items-center justify-center">
						<h2 className="text-white font-semibold">Ventas</h2>
						<DonutChart
							data={data}
							index="Mes"
							category="Ventas"
							variant="pie"
						/>
					</Card>

					<Card className="w-full h-full flex flex-col gap-4 items-center justify-center">
						<h2 className="text-white font-semibold">Ventas</h2>
						<DonutChart
							data={data}
							index="Mes"
							category="Ventas"
							variant="pie"
						/>
					</Card>

					<Card className="w-full h-full">
						<BarChart data={data} index="Mes" categories={['Ventas']} />
					</Card>
				</div>
			</section>
		</>
	);
}

export default DashboardPage;
