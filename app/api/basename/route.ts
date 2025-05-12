// app/api/basename/route.ts
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const address = searchParams.get('address');

  if (!address) {
    return NextResponse.json({ error: 'Address is required' }, { status: 400 });
  }

  try {
    // Simulate Basename fetching (replace with actual OnchainKit identity API call)
    const basename = `${address.slice(0, 6)}.base.eth`; // Mock Basename
    return NextResponse.json({ basename });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch Basename' }, { status: 500 });
  }
}