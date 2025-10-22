import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const number = searchParams.get('number');
  
  if (!number) {
    return NextResponse.json({ error: 'Number parameter is required' }, { status: 400 });
  }
  
  const num = parseInt(number);
  if (isNaN(num) || num < 0) {
    return NextResponse.json({ error: 'Number must be a non-negative integer' }, { status: 400 });
  }
  
  // Calculate factorial
  let result = 1;
  for (let i = 2; i <= num; i++) {
    result *= i;
  }
  
  return NextResponse.json({ number: num, factorial: result });
}
