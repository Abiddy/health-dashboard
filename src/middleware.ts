import { createServerClient } from '@supabase/ssr';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Define which routes are public (don't require authentication)
const publicRoutes = ['/auth/login', '/auth/register', '/auth/reset-password'];

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  
  // Create a Supabase client for the middleware
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get: (name) => req.cookies.get(name)?.value,
        set: (name, value, options) => {
          res.cookies.set({ name, value, ...options });
        },
        remove: (name, options) => {
          res.cookies.delete({ name, ...options });
        },
      },
    }
  );
  
  // Check if the user is authenticated
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const url = req.nextUrl.clone();
  const { pathname } = req.nextUrl;
  
  // Allow access to public routes regardless of authentication status
  if (publicRoutes.some(route => pathname.startsWith(route))) {
    return res;
  }
  
  // Handle API routes separately if needed
  if (pathname.startsWith('/api/')) {
    // API routes are handled by their own authentication logic
    return res;
  }
  
  // Redirect unauthenticated users to login page for protected routes
  if (!session && !pathname.startsWith('/auth/')) {
    url.pathname = '/auth/login';
    return NextResponse.redirect(url);
  }
  
  // Redirect authenticated users away from auth pages
  if (session && pathname.startsWith('/auth/')) {
    url.pathname = '/';
    return NextResponse.redirect(url);
  }
  
  return res;
}

// Define which routes the middleware should run on
export const config = {
  matcher: [
    /*
     * Match all request paths except for:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|public/).*)',
  ],
}; 