'use client';

import { useEffect, useState } from 'react';
import { motion, useAnimationControls, AnimatePresence } from 'framer-motion';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

const containerVariants = {
	close: {
		width: '3rem',
		height: '3rem',
		transition: {
			type: 'spring',
			damping: 15,
			duration: 0.5,
		},
	},
	open: {
		width: '70vw',
		height: '100vh',
		transition: {
			type: 'spring',
			damping: 15,
			duration: 0.5,
		},
	},
};

const menuVariants = {
	initial: { opacity: 0, y: -20 },
	open: {
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.3,
			delayChildren: 0.3,
			staggerChildren: 0.1,
		},
	},
	close: {
		opacity: 0,
		y: -20,
		transition: {
			duration: 0.3,
		},
	},
};

const MobileNav = () => {
	const [isOpen, setIsOpen] = useState(false);
	const containerControls = useAnimationControls();
	const svgControls = useAnimationControls();

	const handleOpenClose = () => {
		setIsOpen(!isOpen);
	};

	useEffect(() => {
		if (isOpen) {
			containerControls.start('open');
			svgControls.start(['open', 'exit', 'open']);
		} else {
			containerControls.start('close');
			svgControls.start(['close', 'exit', 'close']);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isOpen]);

	return (
		<>
			<div
				onClick={handleOpenClose}
				className="md:hidden fixed top-2 left-0 z-50 cursor-pointer flex items-center justify-center w-12 h-12 bg-transparent"
			>
				{!isOpen ? (
					<Bars3Icon
						className={`w-12 h-10 ${
							isOpen ? 'text-black' : 'text-white'
						} stroke-2`}
					/>
				) : (
					<XMarkIcon
						className={`w-12 h-10 ${
							isOpen ? 'text-black' : 'text-white'
						} stroke-2`}
					/>
				)}
			</div>
			<motion.nav
				variants={containerVariants}
				animate={containerControls}
				initial="close"
				className={`md:hidden fixed top-0 left-0 shadow-lg overflow-hidden z-40 ${
					isOpen ? 'bg-white' : 'bg-none'
				}`}
			>
				<AnimatePresence>
					{isOpen && (
						<motion.div
							className="flex flex-col mt-12 space-y-12 p-4 bg-white h-full"
							variants={menuVariants}
							initial="initial"
							animate="open"
							exit="close"
						>
							<a href="#" className="p-2">
								Home
							</a>
							<a href="#" className="p-2">
								About
							</a>
							<a href="#" className="p-2">
								Contact
							</a>
						</motion.div>
					)}
				</AnimatePresence>
			</motion.nav>
		</>
	);
};

export { MobileNav };
