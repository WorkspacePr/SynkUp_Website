import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const token = request.cookies.get('auth_token')?.value;
    const isAuthenticated = !!token;

    console.log('=== MIDDLEWARE DEBUG ===');
    console.log('Path:', pathname);
    console.log('Has Token:', isAuthenticated);
    console.log('All Cookies:', request.cookies.getAll());
    console.log('=======================');

    // Protected routes
    const protectedRoutes = ['/dashboard'];
    const isProtectedRoute = protectedRoutes.some(route => 
        pathname.startsWith(route)
    );

    // Auth routes (redirect to dashboard if logged in)
    const authRoutes = ['/login', '/register', '/forgot-password'];
    const isAuthRoute = authRoutes.some(route => 
        pathname.startsWith(route)
    );

    // Redirect to login if accessing protected route without auth
    if (isProtectedRoute && !isAuthenticated) {
        console.log('Redirecting to login - no token');
        const loginUrl = new URL('/login', request.url);
        loginUrl.searchParams.set('redirect', pathname);
        return NextResponse.redirect(loginUrl);
    }

    // Redirect to dashboard if accessing auth routes while logged in
    if (isAuthRoute && isAuthenticated) {
        console.log('Redirecting to dashboard - already logged in');
        return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    return NextResponse.next();
}

// IMPORTANT: This config is required for Next.js 15+
export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
};