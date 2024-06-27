import {
	ArchiveBoxIcon,
	DocumentArrowUpIcon,
	DocumentChartBarIcon,
	UserGroupIcon,
	XMarkIcon,
} from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import { NavigationLink } from '@/components';

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
							name="Empleados Info"
							href="/auth/rrhh/employees_info"
						>
							<UserGroupIcon className="stroke-[0.75] stroke-inherit min-w-8 w-8" />
						</NavigationLink>
						<NavigationLink name="Empleados" href="/auth/rrhh/employees">
							<UserGroupIcon className="stroke-[0.75] stroke-inherit min-w-8 w-8" />
						</NavigationLink>
						<NavigationLink name="Fichajes" href="/auth/rrhh/fichaje">
							<UserGroupIcon className="stroke-[0.75] stroke-inherit min-w-8 w-8" />
						</NavigationLink>
						<NavigationLink
							name="Examenes Medicos"
							href="/auth/rrhh/medical_exams"
						>
							<UserGroupIcon className="stroke-[0.75] stroke-inherit min-w-8 w-8" />
						</NavigationLink>
						<NavigationLink name="Encuestas" href="/auth/rrhh/surveys">
							<UserGroupIcon className="stroke-[0.75] stroke-inherit min-w-8 w-8" />
						</NavigationLink>
						<NavigationLink name="Vacaciones" href="/auth/rrhh/vacations">
							<UserGroupIcon className="stroke-[0.75] stroke-inherit min-w-8 w-8" />
						</NavigationLink>
					</>
				)}
				{selectedProject.toLowerCase() === 'almacen' && (
					<>
						<NavigationLink name="Inventario" href="/auth/warehouse/inventory">
							<ArchiveBoxIcon className="stroke-[0.75] stroke-inherit min-w-8 w-8" />
						</NavigationLink>
						<NavigationLink
							name="Procesado de SM"
							href="/auth/warehouse/sm_processing"
						>
							<DocumentChartBarIcon className="stroke-[0.75] stroke-inherit min-w-8 w-8" />
						</NavigationLink>
						<NavigationLink name="Movimientos" href="/auth/warehouse/movements">
							<DocumentArrowUpIcon className="stroke-[0.75] stroke-inherit min-w-8 w-8" />
						</NavigationLink>
					</>
				)}
			</div>
		</motion.nav>
	);
};

export default ProjectNavigation;
