import React from 'react';
import { Label, Input } from '@/components';

interface Props {
	id: string;
	label: string;
	value: string;
	placeholder?: string;
	type: string;
	disabled?: boolean;
	handleDataChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const CustomInput: React.FC<Props> = ({
	id,
	label,
	value,
	placeholder = '',
	handleDataChange,
	type = 'text',
	disabled = false,
	...rest
}) => {
	return (
		<section className="grid w-full items-center gap-4">
			<Label htmlFor={id} className="text-slate-100 text-base">
				{label}
			</Label>
			<Input
				required
				autoComplete="off"
				value={value}
				onChange={handleDataChange}
				placeholder={placeholder}
				id={id}
				name={id}
				type={type}
				disabled={disabled}
				{...rest}
			/>
		</section>
	);
};

export { CustomInput };
