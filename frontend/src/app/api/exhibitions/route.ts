import { NextRequest, NextResponse } from 'next/server';
import { getExhibitions } from '@/lib/exhibitionsServer';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const featured = searchParams.get('featured') === 'true';

    return NextResponse.json(await getExhibitions(featured), { status: 200 });
  } catch (error: unknown) {
    console.error('Error fetching exhibitions:', error);
    return NextResponse.json({ exhibitions: [], source: 'static' }, { status: 200 });
  }
}
