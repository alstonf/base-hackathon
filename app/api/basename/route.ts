// app/api/basename/route.ts
import { NextResponse } from 'next/server';
import { getName } from '@coinbase/onchainkit/identity';
import { baseSepolia } from 'viem/chains';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const address = searchParams.get('address');

  if (!address) {
    return NextResponse.json({ error: 'Address is required' }, { status: 400 });
  }

  try {
    // Fetch Basename using getName from OnchainKit
    const basename = await getName({
      address: address as `0x${string}`,
      chain: baseSepolia, // Use base for mainnet in production
    });

    return NextResponse.json({ basename: basename || address });
  } catch {
    return NextResponse.json({ error: 'Failed to fetch Basename' }, { status: 500 });
  }
}