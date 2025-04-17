import { NextResponse } from 'next/server'

export async function middleware(req) {
  const url = req.nextUrl
  const token = req.cookies.get('token')?.value
  const isAuth = Boolean(token)

  if (url.pathname === '/dashboard' && url.searchParams.get('menu') === 'Docs') {
    url.pathname = '/docs'
    url.search = ''
    return NextResponse.redirect(url)
  }

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

  return NextResponse.next()
}

export const config = {
  matcher: ['/', '/index', '/login', '/dashboard'],
}
