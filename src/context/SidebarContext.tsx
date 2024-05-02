import { createContext, useState } from 'react';

interface ISidebarContext {
	expanded: boolean;
	toggleSidebar: () => void;
	closeSidebar: () => void;
}

const initialSidebarContext: ISidebarContext = {
	expanded: false,
	toggleSidebar: () => {},
	closeSidebar: () => {},
};

export const SidebarContext = createContext<ISidebarContext>(
	initialSidebarContext
);

export default function SidebarContextProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const [expanded, setExpanded] = useState<boolean>(
		initialSidebarContext.expanded
	);
	const toggleSidebar = () => setExpanded((curr) => !curr);
	const closeSidebar = () => setExpanded(false);

	const value: ISidebarContext = { expanded, toggleSidebar, closeSidebar };

	return (
		<SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>
	);
}
