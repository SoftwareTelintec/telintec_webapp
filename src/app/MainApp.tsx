'use client';

import Navigation from '@/app/components/navigation/Navigation';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

export default function MainApp({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const session = useSession();
	const [showNav, setShowNav] = useState(false);

	useEffect(() => {
		if (session?.status === 'authenticated') {
			setShowNav(true);
		}
		if (session?.status === 'unauthenticated') {
			setShowNav(false);
		}
	}, [session]);

	return (
		<body
			className="w-full min-h-screen h-auto flex flex-row items-center justify-center relative bg-svg-pattern bg-no-repeat bg-cover"
			id="app"
		>
			{showNav && <Navigation />}
			<div id="modal-root"></div>
			{children}
		</body>
	);
}
