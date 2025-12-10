import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const menuItems = await prisma.menuItem.findMany({
      orderBy: { order: 'asc' }
    })
    return NextResponse.json(menuItems)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch menu items' },
      { status: 500 }
    )
  }
}