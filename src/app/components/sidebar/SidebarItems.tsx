'use client';

import React, { use } from 'react';
import SidebarItem from './SidebarItem';
import { Boxes, LayoutDashboard, NotebookTabs, Settings } from 'lucide-react';
import { usePathname } from 'next/navigation';

export default function SidebarItems() {
	const path = usePathname();
	return (
		<>
			<SidebarItem
				text="Inicio"
				icon={<LayoutDashboard size={20} />}
				href="/"
				active={path === '/'}
			/>
			<hr className="my-3" />
			<SidebarItem
				text="SM"
				href="/sm"
				icon={<Boxes size={20} />}
				active={path === '/sm'}
			/>
			<hr className="my-3" />
			<SidebarItem
				text="Bitacora"
				href="/logs"
				icon={<NotebookTabs size={20} />}
				active={path === '/logs'}
			/>
			<hr className="my-3" />
			<SidebarItem
				text="Settings"
				href="/settings"
				icon={<Settings size={20} />}
				active={path === '/settings'}
			/>
		</>
	);
}
