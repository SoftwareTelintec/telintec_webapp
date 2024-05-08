'use client';

import Navigation from '@/app/components/navigation/Navigation';

export default function MainApp({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<body className="w-full min-h-screen h-auto flex flex-row items-center justify-center relative bg-svg-pattern bg-no-repeat bg-cover">
			<Navigation />
			{children}
		</body>
	);
}
