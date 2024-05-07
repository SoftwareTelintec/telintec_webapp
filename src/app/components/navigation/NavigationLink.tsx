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
			className="flex p-1 rounded cursor-pointer stroke-[0.75] stroke-black text-neutral-800 place-items-center gap-3 hover:bg-[#050B21] transition-colors duration-100 relative group hover:text-white hover:stroke-neutral-100 font-semibold"
		>
			{children}
			<p className="text-inherit font-poppins overflow-hidden whitespace-nowrap tracking-wide">
				{name}
			</p>

			{isOpen && (
				<div
					className={`absolute left-full rounded-md px-4 py-2 ml-6 text-white bg-[#050B21] text-sm invisible opacity-20 -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0`}
				>
					{name}
				</div>
			)}
		</Link>
	);
};

export default NavigationLink;
