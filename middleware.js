import { decode } from 'jsonwebtoken'
import { NextResponse } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export default async function middleware(request) {
  const token = request.cookies.get('authtoken')?.value
  const path = request.nextUrl.pathname.split('/') 

  if (!token) {
    return NextResponse.redirect(new URL('/login',request.nextUrl))
  }
  let decoded = decode(token)
  let subscription = decoded.subscription
  
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/home/:path*',
    '/fmge/:path*',
    '/mbbs/:path*',
    '/neetss/:path*',
    '/pgneet/:path*',
    '/profile/:path*',
  ],
}