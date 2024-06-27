import NextAuth from 'next-auth';
import authConfif from '@/auth.config';

const { auth } = NextAuth(authConfif);

export default auth((req: any) => {
	const isLoggedIn = !!req.auth;
	console.log('Route ', req.nextUrl.pathname);
	console.log('Is Logged In ', isLoggedIn);

	if (!isLoggedIn) {
		return Response.redirect(new URL('/', req.nextUrl).toString());
	}
});

export const config = { matcher: '/auth/:path*' };
