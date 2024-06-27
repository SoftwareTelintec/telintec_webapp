import { ChevronRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

interface Props {
	children: React.ReactNode;
	name: string;
	setSelectedProject: (val: string | null) => void;
	isOpen?: boolean;
}

const ProjectLink = ({ children, name, setSelectedProject, isOpen }: Props) => {
	const handleClick = () => {
		setSelectedProject(null);
		setTimeout(() => {
			setSelectedProject(name);
		}, 250);
	};
	return (
		<Link
			href="#"
			onClick={handleClick}
			className="flex p-1 rounded cursor-pointer stroke-[0.75] stroke-black text-neutral-800 place-items-center gap-3 hover:bg-[#050B21] transition-colors duration-100 relative group hover:text-white hover:stroke-neutral-100 font-semibold"
		>
			{children}
			{!isOpen && (
				<div className="flex overflow-clip place-items-center justify-between w-full">
					<p className="text-inherit font-poppins overflow-hidden whitespace-nowrap tracking-wide">
						{name}
					</p>
					<ChevronRightIcon className="stroke-inherit stroke-[0.75] min-w-8 w-8" />
				</div>
			)}
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

export default ProjectLink;
