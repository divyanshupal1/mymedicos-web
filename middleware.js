import { decode } from 'jsonwebtoken'
import { NextResponse } from 'next/server'


export default async function middleware(request) {
  const token = request.cookies.get('authtoken')?.value
  // const path = request.nextUrl.pathname.split('/') 

  if (!token) {
    return NextResponse.redirect(new URL('/auth/login',request.nextUrl))
  }
  let decoded = decode(token)
  if(!decoded) {
    return NextResponse.redirect(new URL('/auth/login',request.nextUrl))
  }

  let subscription = decoded.subscription
  // //console.log(subscription)
  
}

export const config = {
  matcher: [
    '/home/:path*',
    '/fmge/:path*',
    '/mbbs/:path*',
    '/neetss/:path*',
    '/pgneet/:path*',
    '/profile:path*',
    '/api/getQuiz/:path*',
    '/api/utility/:path*',
  ],
}