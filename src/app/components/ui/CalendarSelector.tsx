import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface DateSelectorProps {
	label: string;
	selectedDate: Date;
	placeholder?: string;
	onChange: (date: Date) => void;
}

export default function CalendarSelector({
	label,
	selectedDate,
	onChange,
}: DateSelectorProps) {
	return (
		<div className="flex flex-col items-start gap-2 justify-center w-full">
			<label>{label}</label>
			<DatePicker
				showIcon
				selected={selectedDate}
				onChange={onChange}
				placeholderText="Selecciona una fecha"
				className="border border-indigo-600 rounded-md w-full"
			/>
		</div>
	);
}
