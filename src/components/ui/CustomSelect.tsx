import React from 'react';
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components';

interface Option {
	value: string;
	label: string;
}

interface Props {
	id: string;
	placeholder: string;
	value: Option | undefined;
	data: Option[];
	handleDataChange: (event: string) => void;
}

const CustomSelect = ({
	placeholder,
	id,
	value,
	data,
	handleDataChange,
}: Props) => {
	return (
		<section className="grid w-full items-center gap-4">
			<Label htmlFor={id} className="text-slate-100 text-base">
				{id}
			</Label>
			<Select value={value?.value} onValueChange={handleDataChange}>
				<SelectTrigger className="w-full">
					<SelectValue placeholder={placeholder} defaultValue={value?.label} />
				</SelectTrigger>
				<SelectContent className="w-[calc(100vw-5rem)] lg:w-full">
					<SelectGroup>
						{data.map((item) => (
							<SelectItem key={item.value} value={item.value}>
								{item.label}
							</SelectItem>
						))}
					</SelectGroup>
				</SelectContent>
			</Select>
		</section>
	);
};

export { CustomSelect };
