import {
	AdjustmentsHorizontalIcon,
	ArrowTrendingUpIcon,
	BoltIcon,
	CursorArrowRaysIcon,
	PencilIcon,
	UserGroupIcon,
	UserIcon,
	XMarkIcon,
} from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import NavigationLink from './NavigationLink';

const variants = {
	close: {
		x: -300,
		opacity: 0,
	},
	open: {
		x: 0,
		opacity: 100,
	},
};

interface Props {
	selectedProject: string;
	isOpen: boolean;
	setSelectedProject: (project: string | null) => void;
}

const ProjectNavigation = ({
	selectedProject,
	isOpen,
	setSelectedProject,
}: Props) => {
	return (
		<motion.nav
			variants={variants}
			initial="close"
			animate="open"
			exit="close"
			transition={{
				duration: 0.25,
				ease: 'easeInOut',
			}}
			className={`h-full flex flex-col gap-8 w-64 absolute bg-[#D9D9D9] ml-0 ${
				isOpen ? 'left-64' : 'left-20'
			} border-r border-l bg-[#D9D9D9] p-5 z-10`}
		>
			<div className="flex flex-row w-full justify-between place-items-center">
				<h1 className="tracking-wide text-neutral-800 font-semibold text-lg">
					{selectedProject}
				</h1>
				<button onClick={() => setSelectedProject(null)}>
					<XMarkIcon className="w-8 stroke-neutral-400" />
				</button>
			</div>
			<div className="flex flex-col gap-3">
				{selectedProject.toLocaleLowerCase() === 'rrhh' && (
					<>
						<NavigationLink
							name="Empleados"
							href="/auth/dashboard/rrhh/employees"
						>
							<ArrowTrendingUpIcon className="stroke-[0.75] stroke-inherit min-w-8 w-8" />
						</NavigationLink>
						<NavigationLink
							name="Examenes Medicos"
							href="/auth/dashboard/rrhh/medical_exams"
						>
							<UserGroupIcon className="stroke-[0.75] stroke-inherit min-w-8 w-8" />
						</NavigationLink>
						<NavigationLink
							name="Vacaciones"
							href="/auth/dashboard/rrhh/vacations"
						>
							<PencilIcon className="stroke-[0.75] stroke-inherit min-w-8 w-8" />
						</NavigationLink>
						<NavigationLink
							name="Encuestas"
							href="/auth/dashboard/rrhh/surveys"
						>
							<BoltIcon className="stroke-[0.75] stroke-inherit min-w-8 w-8" />
						</NavigationLink>
					</>
				)}
				{selectedProject.toLowerCase() === 'almacen' && (
					<>
						<NavigationLink
							name="Inventario"
							href="/auth/dashboard/warehouse/inventory"
						>
							<BoltIcon className="stroke-[0.75] stroke-inherit min-w-8 w-8" />
						</NavigationLink>
						<NavigationLink
							name="Movimientos"
							href="/auth/dashboard/warehouse/movements"
						>
							<CursorArrowRaysIcon className="stroke-[0.75] stroke-inherit min-w-8 w-8" />
						</NavigationLink>
					</>
				)}
			</div>
		</motion.nav>
	);
};

export default ProjectNavigation;
