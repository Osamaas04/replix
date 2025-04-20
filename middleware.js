import { NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET // Or undefined if you're only decoding

export async function middleware(req) {
  const url = req.nextUrl
  const token = req.cookies.get('token')?.value
  const isAuth = Boolean(token)

  const response = NextResponse.next()

  // Decode token and attach user ID as a header
  if (token) {
    try {
      // You can also use jwt.verify(token, JWT_SECRET) if you want to ensure it's valid
      const decoded = jwt.decode(token)
      if (decoded?.sub) {
        response.headers.set('x-user-id', decoded.sub)
      }
    } catch (err) {
      console.error('Token decode error:', err)
    }
  }

  // Redirect `/dashboard?menu=Docs` -> `/docs`
  if (url.pathname === '/dashboard' && url.searchParams.get('menu') === 'Docs') {
    url.pathname = '/docs'
    url.search = ''
    return NextResponse.redirect(url)
  }

  // Other optional redirects (uncomment as needed)
  // if (url.pathname.startsWith('/dashboard') && !isAuth) {
  //   const loginUrl = new URL('/login', req.url)
  //   return NextResponse.redirect(loginUrl)
  // }

  // if ((url.pathname === '/' || url.pathname === '/index') && isAuth) {
  //   const dashboardUrl = new URL('/dashboard', req.url)
  //   return NextResponse.redirect(dashboardUrl)
  // }

  // if (url.pathname === '/login' && isAuth) {
  //   const dashboardUrl = new URL('/dashboard', req.url)
  //   return NextResponse.redirect(dashboardUrl)
  // }

  return response
}

export const config = {
  matcher: ['/', '/index', '/login', '/dashboard'],
}
