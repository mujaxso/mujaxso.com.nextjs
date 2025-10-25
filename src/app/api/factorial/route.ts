import { NextResponse } from 'next/server';
import { unstable_cache } from 'next/cache';

export const runtime = 'nodejs';

function calculateFactorial(num: number): number {
  let result = 1;
  for (let i = 2; i <= num; i++) {
    result *= i;
  }
  return result;
}

const getCachedFactorial = unstable_cache(
  async (num: number) => {
    return calculateFactorial(num);
  },
  ['factorial'],
  {
    revalidate: 86400, // 24 hours - factorials don't change
    tags: ['factorial'],
  }
);

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
  
  // For very large numbers, we might want to limit to prevent performance issues
  if (num > 1000) {
    return NextResponse.json({ error: 'Number is too large' }, { status: 400 });
  }
  
  try {
    const result = await getCachedFactorial(num);
    return NextResponse.json({ number: num, factorial: result }, {
      headers: {
        'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=31536000',
      },
    });
  } catch (error) {
    console.error('Factorial calculation error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
