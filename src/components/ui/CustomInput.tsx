import React from 'react';
import { Label, Input } from '@/components';

interface Props {
	id: string;
	value: string;
	type: string;
	handleDataChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const CustomInput: React.FC<Props> = ({
	id,
	value,
	type,
	handleDataChange,
}) => {
	return (
		<section className="grid w-full items-center gap-4">
			<Label htmlFor={id} className="text-[#D9D9D9]">
				Usuario
			</Label>
			<Input
				className="w-full"
				required
				autoComplete="false"
				value={value}
				onChange={handleDataChange}
				id={id}
				name={id}
				type={type}
			/>
		</section>
	);
};

export { CustomInput };
