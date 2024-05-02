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
			className="flex p-1 rounded cursor-pointer stroke-[0.75] hover:stroke-neutral-100 stroke-neutral-400 text-neutral-400 hover:text-neutral-100 place-items-center gap-3 hover:bg-neutral-700/30 transition-colors duration-100 relative group"
		>
			{children}
			<div className="flex overflow-clip place-items-center justify-between w-full">
				<p className="text-inherit truncate whitespace-nowrap tracking-wide">
					{name}
				</p>
				<ChevronRightIcon className="stroke-inherit stroke-[0.75] min-w-8 w-8" />
			</div>
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

export default ProjectLink;
