import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function debounce(func: (...args: any[]) => void, wait: number) {
	let timeout: ReturnType<typeof setTimeout>;
	return (...args: any[]) => {
		clearTimeout(timeout);
		timeout = setTimeout(() => {
			func(...args);
		}, wait);
	};
}

export function formatDate(date: Date) {
	const day = date.getDate().toString().padStart(2, '0');
	const month = (date.getMonth() + 1).toString().padStart(2, '0');
	const year = date.getFullYear();
	return `${year}-${month}-${day}`;
}
