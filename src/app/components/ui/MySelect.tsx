'use client';

import { useEffect, useState } from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

interface Props {
	label: string;
	options: { value: string; label: string }[];
	value: { value: string; label: string };
	onChange: (value: { value: string; label: string }) => void;
	placeholder: string;
}
export default function MySelect({
	label,
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

	const customStyles = {
		control: (base, state) => ({
			...base,
			background: '#D9D9D9',
			borderRadius: 6,
			borderColor: '#D9D9D9',
			boxShadow: state.isFocused ? null : null,
			'&:hover': {
				borderColor: '#D9D9D9',
			},
		}),
		menu: (base) => ({
			...base,
			// override border radius to match the box
			borderRadius: 6,
			// kill the gap
			marginTop: 0,
		}),
		menuList: (base) => ({
			...base,
			// kill the white space on first and last option
			padding: 0,
		}),
	};

	return (
		isMounted && (
			<div className="flex flex-col items-start gap-2 justify-center w-full">
				<label htmlFor={id} className="text-white">
					{label}
				</label>
				<Select
					{...rest}
					name={id}
					id={id}
					options={options}
					closeMenuOnSelect={true}
					components={animatedComponents}
					placeholder={placeholder}
					className="block p-1 w-full"
					value={value}
					styles={customStyles}
					onChange={onChange}
				/>
			</div>
		)
	);
}
