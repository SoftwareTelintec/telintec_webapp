'use client';

import { signOut, useSession } from 'next-auth/react';
import { motion, useAnimationControls, AnimatePresence } from 'framer-motion';
import { useState, useEffect, use } from 'react';
import NavigationLink from './NavigationLink';
import {
	ArchiveBoxIcon,
	ChartBarIcon,
	DocumentCheckIcon,
	Square2StackIcon,
	ArrowLeftStartOnRectangleIcon,
} from '@heroicons/react/24/outline';
import ProjectLink from './ProjectLink';
import ProjectNavigation from './ProjectNavigation';
import { pagesPerRole } from '@/constants';

const containerVariants = {
	close: {
		width: '5rem',
		transition: {
			type: 'spring',
			damping: 15,
			duration: 0.5,
		},
	},
	open: {
		width: '16rem',
		transition: {
			type: 'spring',
			damping: 15,
			duration: 0.5,
		},
	},
};

const svgVariants = {
	close: {
		rotate: 360,
	},
	open: {
		rotate: 180,
	},
};

const Navigation = () => {
	const session = useSession();
	const roles: { [key: string]: boolean } = session.data?.user?.name?.role;
	const [permissions, setPermissions] = useState<string[]>([]);
	const [isOpen, setIsOpen] = useState(false);
	const [hasPermission, setHasPermission] = useState(false);
	const [selectedProject, setSelectedProject] = useState<string | null>(null);

	const containerControls = useAnimationControls();
	const svgControls = useAnimationControls();

	const validateRoles = () => {
		if (roles) {
			const newPermissions: any = [];
			Object.keys(roles).forEach((role) => {
				const roleName = role.toLowerCase().split('.')[2];
				switch (roleName) {
					case 'admin':
						newPermissions.push(...pagesPerRole[0].pages);
						break;
					case 'almacen':
						newPermissions.push(...pagesPerRole[1].pages);
						break;
					case 'rrhh':
						newPermissions.push(...pagesPerRole[2].pages);
						break;
					case 'bitacoras':
						newPermissions.push(...pagesPerRole[3].pages);
						break;
					case 'sm':
						newPermissions.push(...pagesPerRole[4].pages);
						break;
					default:
						break;
				}
			});
			const uniquePermissions = [...new Set(newPermissions)];
			setPermissions(uniquePermissions);
		}
	};

	useEffect(() => {
		if (session.status === 'authenticated') {
			validateRoles();
			setHasPermission(true);
		}
	}, [session.status]);

	useEffect(() => {
		if (isOpen) {
			containerControls.start('open');
			svgControls.start('open');
		} else {
			containerControls.start('close');
			svgControls.start('close');
		}
	}, [isOpen]);

	const handleOpenClose = () => {
		setIsOpen(!isOpen);
		setSelectedProject(null);
	};

	return (
		<>
			{/* {hasPermission && (
				<motion.nav
					variants={containerVariants}
					animate={containerControls}
					initial="close"
					className={`flex flex-col z-10 gap-20 p-5 absolute top-0 left-0 h-full shadow transition-colors duration-300 ${
						isOpen
							? 'bg-[#D9D9D9]  shadow-neutral-600'
							: 'bg-[#D9D9D9]/70 shadow-[##5C5F65]/50'
					}`}
				>
					<div className="flex flex-row w-full justify-between place-items-center">
						<div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-amber-700 rounded-full"></div>
						<button
							className="p-1 rounded-full flex"
							onClick={() => handleOpenClose()}
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth={2}
								stroke="currentColor"
								className="w-8 h-8 stroke-neutral-900"
							>
								<motion.path
									strokeLinecap="round"
									strokeLinejoin="round"
									variants={svgVariants}
									animate={svgControls}
									d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
									transition={{
										duration: 0.5,
										ease: 'easeInOut',
									}}
								/>
							</svg>
						</button>
					</div>
					<div className="flex flex-col gap-3">
						{isOpen && (
							<span className="uppercase text-xs text-neutral-600">main</span>
						)}
						{permissions.includes('/auth/dashboard') && (
							<NavigationLink
								name="Dashboard"
								href={'/auth/dashboard'}
								isOpen={!isOpen}
							>
								<ChartBarIcon className="stroke-inherit stroke-[0.75] min-w-8 w-8" />
							</NavigationLink>
						)}
						{permissions.includes('/auth/dashboard/sm') && (
							<NavigationLink
								name="Solicitud de Material"
								href={'/auth/dashboard/sm'}
								isOpen={!isOpen}
							>
								<Square2StackIcon className="stroke-inherit stroke-[0.75] min-w-8 w-8" />
							</NavigationLink>
						)}
						{permissions.includes('/auth/dashboard/logs') && (
							<NavigationLink
								name="Bitacora"
								href={'/auth/dashboard/logs'}
								isOpen={!isOpen}
							>
								<DocumentCheckIcon className="stroke-inherit stroke-[0.75] min-w-8 w-8" />
							</NavigationLink>
						)}
					</div>
					<div className="flex flex-col gap-3">
						{permissions.includes('/auth/dashboard/warehouse') && (
							<ProjectLink
								name="Almacen"
								setSelectedProject={setSelectedProject}
								isOpen={!isOpen}
							>
								<ArchiveBoxIcon className="stroke-inherit stroke-[0.75] min-w-8 w-8" />
							</ProjectLink>
						)}
						{permissions.includes('/auth/dashboard/rrhh') && (
							<ProjectLink
								name="RRHH"
								setSelectedProject={setSelectedProject}
								isOpen={!isOpen}
							>
								<div className="min-w-4 mx-2 border-indigo-600 border rounded-full aspect-square bg-indigo-700" />
							</ProjectLink>
						)}
					</div>
					{isOpen && (
						<span className="uppercase text-xs text-neutral-600">settings</span>
					)}
					{isOpen ? (
						<button
							className="w-full flex flex-row gap-2 items-center justify-center  px-2 py-1 rounded-md hover:scale-[1.05] transition-colors duration-300 text-sm bg-[#050B21] text-neutral-200 shadow-[#050B21]"
							onClick={() => signOut()}
						>
							<span>Salir</span>
							<ArrowLeftStartOnRectangleIcon className="min-w-8 w-8" />
						</button>
					) : (
						<button
							className="w-full flex flex-row gap-2 items-center justify-center  px-2 py-1 rounded-md hover:scale-[1.05] transition-colors duration-300 text-sm bg-[#050B21] text-neutral-200 shadow-[#050B21]"
							onClick={() => signOut()}
						>
							<ArrowLeftStartOnRectangleIcon className="min-w-8 w-8" />
						</button>
					)}
				</motion.nav>
			)} */}
			<motion.nav
				variants={containerVariants}
				animate={containerControls}
				initial="close"
				className={`flex flex-col z-10 gap-20 p-5 absolute top-0 left-0 h-full shadow transition-colors duration-300 ${
					isOpen
						? 'bg-[#D9D9D9]  shadow-neutral-600'
						: 'bg-[#D9D9D9]/70 shadow-[##5C5F65]/50'
				}`}
			>
				<div className="flex flex-row w-full justify-between place-items-center">
					<div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-amber-700 rounded-full"></div>
					<button
						className="p-1 rounded-full flex"
						onClick={() => handleOpenClose()}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={2}
							stroke="currentColor"
							className="w-8 h-8 stroke-neutral-900"
						>
							<motion.path
								strokeLinecap="round"
								strokeLinejoin="round"
								variants={svgVariants}
								animate={svgControls}
								d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
								transition={{
									duration: 0.5,
									ease: 'easeInOut',
								}}
							/>
						</svg>
					</button>
				</div>
				<div className="flex flex-col gap-3">
					{isOpen && (
						<span className="uppercase text-xs text-neutral-600">main</span>
					)}
					{permissions.includes('/auth/dashboard') && (
						<NavigationLink
							name="Dashboard"
							href={'/auth/dashboard'}
							isOpen={!isOpen}
						>
							<ChartBarIcon className="stroke-inherit stroke-[0.75] min-w-8 w-8" />
						</NavigationLink>
					)}
					{permissions.includes('/auth/dashboard/sm') && (
						<NavigationLink
							name="Solicitud de Material"
							href={'/auth/dashboard/sm'}
							isOpen={!isOpen}
						>
							<Square2StackIcon className="stroke-inherit stroke-[0.75] min-w-8 w-8" />
						</NavigationLink>
					)}
					{permissions.includes('/auth/dashboard/logs') && (
						<NavigationLink
							name="Bitacora"
							href={'/auth/dashboard/logs'}
							isOpen={!isOpen}
						>
							<DocumentCheckIcon className="stroke-inherit stroke-[0.75] min-w-8 w-8" />
						</NavigationLink>
					)}
				</div>
				<div className="flex flex-col gap-3">
					{permissions.includes('/auth/dashboard/warehouse') && (
						<ProjectLink
							name="Almacen"
							setSelectedProject={setSelectedProject}
							isOpen={!isOpen}
						>
							<ArchiveBoxIcon className="stroke-inherit stroke-[0.75] min-w-8 w-8" />
						</ProjectLink>
					)}
					{permissions.includes('/auth/dashboard/rrhh') && (
						<ProjectLink
							name="RRHH"
							setSelectedProject={setSelectedProject}
							isOpen={!isOpen}
						>
							<div className="min-w-4 mx-2 border-indigo-600 border rounded-full aspect-square bg-indigo-700" />
						</ProjectLink>
					)}
				</div>
				{isOpen && (
					<span className="uppercase text-xs text-neutral-600">settings</span>
				)}
				{isOpen ? (
					<button
						className="w-full flex flex-row gap-2 items-center justify-center  px-2 py-1 rounded-md hover:scale-[1.05] transition-colors duration-300 text-sm bg-[#050B21] text-neutral-200 shadow-[#050B21]"
						onClick={() => signOut()}
					>
						<span>Salir</span>
						<ArrowLeftStartOnRectangleIcon className="min-w-8 w-8" />
					</button>
				) : (
					<button
						className="w-full flex flex-row gap-2 items-center justify-center  px-2 py-1 rounded-md hover:scale-[1.05] transition-colors duration-300 text-sm bg-[#050B21] text-neutral-200 shadow-[#050B21]"
						onClick={() => signOut()}
					>
						<ArrowLeftStartOnRectangleIcon className="min-w-8 w-8" />
					</button>
				)}
			</motion.nav>
			<AnimatePresence>
				{selectedProject && (
					<ProjectNavigation
						selectedProject={selectedProject}
						setSelectedProject={setSelectedProject}
						isOpen={isOpen}
					/>
				)}
			</AnimatePresence>
		</>
	);
};

export default Navigation;
