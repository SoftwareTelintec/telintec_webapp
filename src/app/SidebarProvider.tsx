'use client';

import SidebarContextProvider from '@/context/SidebarContext';
import React from 'react';

export default function SidebarProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	return <SidebarContextProvider>{children}</SidebarContextProvider>;
}
