'use client';

import Navigation from '@/components/navigation/Navigation';
import { SessionProvider, useSession } from 'next-auth/react';
import { Inter as FontSans } from 'next/font/google';
import { cn } from '@/lib/utils';
import AssistanModal from '@/components/ui/AsistantModal';
import { MobileNav } from '@/components/navigation/MobileNav';

const fontSans = FontSans({
	subsets: ['latin'],
	variable: '--font-sans',
});

export default function SessionLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const session = useSession();

	return (
		<html lang="en" suppressHydrationWarning>
			<body
				className={`${cn(
					'min-h-screen font-sans w-full h-auto',
					fontSans.variable
				)} bg-[#050B22] bg-svg-pattern bg-cover`}
			>
				<SessionProvider>
					<Navigation />
					<MobileNav />
					<main className="min-h-screen h-auto w-full md:w-[calc(100vw-10rem)] py-4 px-2 lg:ml-20 lg:py-12 lg:px-8">
						{children}
					</main>
					{session.status === 'authenticated' && (
						<AssistanModal roles={['almacen']} />
					)}
				</SessionProvider>
			</body>
		</html>
	);
}
