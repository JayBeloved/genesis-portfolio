import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  // console.log("PROXY INTERCEPT:", request.nextUrl.pathname, "COOKIES:", request.cookies.getAll());

  // Define protected routes
  if (request.nextUrl.pathname.startsWith('/forge-gate/dashboard')) {
    
    // The login terminal sets "access_token", so we must read "access_token"
    const token = request.cookies.get('access_token')?.value;

    if (!token) {
      // Redirect to the login terminal if no token exists
      return NextResponse.redirect(new URL('/forge-gate', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/forge-gate/dashboard/:path*'],
};
