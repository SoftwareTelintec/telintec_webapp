'use client';

import { useState } from 'react';
import Select from 'react-select';

interface SelectorProps {
	data: {
		htmlfor: string;
		title: string;
		values: any;
		placeholer: string;
		employee?: any;
	};
}

interface Others {
	id: number;
	name: string;
}

type OptionType = String | Others;

export default function Selector({ data }: SelectorProps) {
	const [selectedOption, setSelectedOption] = useState<OptionType | null>();

	const handleChange = (selectedOption: any) => {
		setSelectedOption(selectedOption);
	};

	if (data?.htmlfor.includes('employee')) {
		var options = data.values?.map((employee: string) => {
			return {
				value: employee[0],
				label: (employee[1] + ' ' + employee[2]).toString().toUpperCase(),
			};
		});
	} else if (!data?.htmlfor.includes('employee')) {
		var options = data.values?.map((contract: Others) => {
			return {
				value: contract?.id,
				label: contract?.name,
			};
		});
	}

	return (
		<div className="flex flex-col items-start gap-2 justify-center w-full">
			<label htmlFor={data?.htmlfor}>{data?.title}</label>
			<Select
				options={options}
				value={selectedOption}
				onChange={handleChange}
				placeholder={data?.placeholer}
				id={data?.htmlfor}
				className="w-full"
			/>
		</div>
	);
}
