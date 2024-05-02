'use client';

import { useState } from 'react';

interface InputTextProps {
	data: {
		htmlfor: string;
		title: string;
		employee?: any;
	};
}

export default function InputText({ data }: InputTextProps) {
	const [comments, setComments] = useState<string>();

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setComments(e.target.value);
	};

	return (
		<div className="flex flex-col items-start gap-2 justify-center w-full">
			<label htmlFor={data?.htmlfor}>{data?.title}</label>
			<input
				type="text"
				id={data?.htmlfor}
				className="border border-[#cccccc] rounded-md p-1 w-full"
				onChange={(e) => handleChange(e)}
			/>
		</div>
	);
}
