import { searchGames } from '@/lib/igdb/queries'
import { NextResponse } from 'next/server'

export async function GET() {
  const games = await searchGames('Elden Ring')
  return NextResponse.json(games)
}