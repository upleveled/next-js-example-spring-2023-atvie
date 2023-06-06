import { NextResponse } from 'next/server';

export function GET(): NextResponse<{ animals: string }> {
  return NextResponse.json({ animals: '/api/animals' });
}
