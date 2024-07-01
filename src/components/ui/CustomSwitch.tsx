import React from 'react';
import { Label } from './label';
import { Switch } from './switch';

interface Props {
	id: string;
	label: string;
	checked: boolean;
	onClick: (checked: React.FormEvent<HTMLButtonElement>) => void;
}

const CustomSwitch = ({ id, label, checked, onClick }: Props) => {
	return (
		<div className="grid w-full items-center gap-4">
			<Label htmlFor={id} className="text-slate-100 text-base">
				{label}
			</Label>
			<Switch className="" id={id} checked={checked} onClick={onClick} />
		</div>
	);
};

export { CustomSwitch };
