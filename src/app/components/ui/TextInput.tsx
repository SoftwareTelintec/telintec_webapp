interface TextInputProps {
	id?: string;
	label: string;
	name?: string;
	defaultValue?: string;
	placeholder?: string;
	disabled?: boolean;
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function TextInput({ label, ...rest }: TextInputProps) {
	return (
		<div className="flex flex-col items-start gap-2 justify-center w-full">
			<label htmlFor={rest?.name}>{label}</label>
			<input
				{...rest}
				className="border border-[#D9D9D9] bg-[#D9D9D9] rounded-md p-1 w-full text-neutral-600 hover:border-[#D9D9D9] focus:border-[#D9D9D9] focus:outline-none"
			/>
		</div>
	);
}
