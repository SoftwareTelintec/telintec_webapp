'use client';

import { useEffect, useState } from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

interface Props {
	options: { value: string; label: string }[];
	value: { value: string; label: string };
	onChange: (value: { value: string; label: string }) => void;
	placeholder: string;
}
export default function MySelect({
	options,
	value,
	onChange,
	placeholder,
	...rest
}: Props) {
	const id = Date.now().toString();
	const animatedComponents = makeAnimated();
	const [isMounted, setIsMounted] = useState(false);

	useEffect(() => setIsMounted(true), []);

	return (
		isMounted && (
			<Select
				{...rest}
				id={id}
				options={options}
				closeMenuOnSelect={true}
				components={animatedComponents}
				placeholder={placeholder}
				className="block p-1 w-full"
				value={value}
				onChange={onChange}
			/>
		)
	);
}
