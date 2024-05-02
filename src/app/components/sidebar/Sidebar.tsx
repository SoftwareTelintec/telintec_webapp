'use client';

import React, { useContext } from 'react';
import Image from 'next/image';
import { ChevronFirst, ChevronLast, MoreVertical } from 'lucide-react';
import { SidebarContext } from '@/context/SidebarContext';

export default function Sidebar({ children }: { children: React.ReactNode }) {
	const { expanded, toggleSidebar } = useContext(SidebarContext);

	return (
		<aside className="h-screen">
			<nav className="h-full flex flex-col bg-white/70 border-r shadow-sm">
				<div className="p-4 pb-2 flex justify-between items-center">
					<Image
						src="/img/243.svg"
						alt="logo"
						className={`overflow-hidden transition-all ${
							expanded ? 'w-32' : 'w-0'
						}`}
						width={128}
						height={128}
					/>
					<button
						className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100"
						onClick={toggleSidebar}
					>
						{expanded ? <ChevronFirst size={20} /> : <ChevronLast size={20} />}
					</button>
				</div>

				<ul className="flex-1 px-3">{children}</ul>

				<div className="border-t flex p-3">
					<Image
						src="/img/userIcon.png"
						alt="avatar"
						className="w-10 h-10 rounded-full"
						width={40}
						height={40}
					/>
					<div
						className={`flex justify-between items-center overflow-hidden transition-all ${
							expanded ? 'w-52 ml-3' : 'w-0'
						}`}
					>
						<div className="leading-4">
							<h4 className="font-semibold">Name</h4>
							<span className="text-xs text-gray-600">email</span>
						</div>
						<MoreVertical size={20} />
					</div>
				</div>
			</nav>
		</aside>
	);
}
