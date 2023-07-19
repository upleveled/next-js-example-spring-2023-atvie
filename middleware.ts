import { NextRequest, NextResponse } from 'next/server';

export const config = {
  matcher: '/animal-management-naive-dont-copy/:path*',
};

export function middleware(request: NextRequest) {
  const requestHeaders = new Headers(request.headers);

  requestHeaders.set('x-pathname', request.nextUrl.pathname);

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}
