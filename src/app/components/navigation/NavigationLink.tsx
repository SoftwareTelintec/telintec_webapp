import Link from 'next/link';

interface Props {
	children: React.ReactNode;
	name: string;
	href: string;
	isOpen?: boolean;
}

const NavigationLink = ({ children, name, href, isOpen }: Props) => {
	return (
		<Link
			href={href}
			className="flex p-1 rounded cursor-pointer stroke-[0.75] hover:stroke-neutral-100 stroke-neutral-400 text-neutral-400 hover:text-neutral-100 place-items-center gap-3 hover:bg-neutral-700/30 transition-colors duration-100 relative group"
		>
			{children}
			<p className="text-inherit font-poppins overflow-hidden whitespace-nowrap tracking-wide">
				{name}
			</p>

			{isOpen && (
				<div
					className={`absolute left-full rounded-md px-4 py-2 ml-6 text-neutral-400 bg-neutral-700 text-sm invisible opacity-20 -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0`}
				>
					{name}
				</div>
			)}
		</Link>
	);
};

export default NavigationLink;
