import { NextResponse } from "next/server";

export async function middleware(req) {
    const url = req.nextUrl;
  
    if (url.pathname === '/dashboard' && url.searchParams.get('menu') === 'Docs') {
      url.pathname = '/docs';
      url.search = '';
      return NextResponse.redirect(url);
    }
  
    return NextResponse.next();
  }
  
  export const config = {
    matcher: ['/dashboard'], 
  };
  