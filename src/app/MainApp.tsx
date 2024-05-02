'use client';

import Navigation from '@/app/components/navigation/Navigation';

export default function MainApp({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<body className="w-full h-screen flex flex-row items-center justify-center relative bg-svg-pattern bg-no-repeat bg-cover">
			<Navigation />
			{children}
		</body>
	);
}
