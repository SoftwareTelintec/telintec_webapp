import type { Metadata } from 'next';
import './globals.css';
import { SessionProvider } from 'next-auth/react';
import MainApp from './MainApp';

export const metadata: Metadata = {
	title: 'Telintec',
	description: 'Telintec webapp',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<SessionProvider>
				<MainApp>{children}</MainApp>
			</SessionProvider>
		</html>
	);
}
