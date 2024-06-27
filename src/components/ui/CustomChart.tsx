'use client';

import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	Tooltip,
	PointElement,
	LineElement,
} from 'chart.js';
import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';

ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Tooltip
);

interface LineProps {
	data: any;
}

const CustomChart: React.FC<LineProps> = ({ data }) => {
	const [chartData, setChartData] = useState<any>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		setTimeout(() => {
			setLoading(false);
			setChartData(data);
		}, 200);
	}, [data]);

	if (loading) {
		return (
			<div className="flex items-center justify-center w-full h-64 md:h-96">
				<div className="animate-spin rounded-full border-4 border-solid border-current border-r-transparent h-12 w-12 text-cyan-800"></div>
			</div>
		);
	}

	return (
		<div>
			<Line data={chartData} />
		</div>
	);
};

export { CustomChart };
