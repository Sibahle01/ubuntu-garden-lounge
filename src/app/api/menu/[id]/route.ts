// src/app/api/menu/[id]/route.ts
import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params
    console.log('Fetching menu item ID:', id) // Add this for debugging
    
    const menuItem = await prisma.menuItem.findUnique({ 
      where: { id }
    })
    
    if (!menuItem) {
      console.log('Menu item not found:', id)
      return NextResponse.json({ error: 'Menu item not found' }, { status: 404 })
    }
    
    return NextResponse.json(menuItem)
  } catch (error) {
    console.error('Error fetching menu item:', error)
    return NextResponse.json(
      { error: 'Failed to fetch menu item' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params
    const data = await request.json()

    // Validate required fields
    if (!data.name || !data.description || !data.price || !data.category) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const updatedItem = await prisma.menuItem.update({
      where: { id },
      data: {
        name: data.name,
        description: data.description,
        // Convert price to float before saving to Decimal field in Prisma
        price: parseFloat(data.price), 
        category: data.category,
        imageUrl: data.imageUrl || null,
        // Set default to true if isAvailable is not provided (shouldn't happen on PUT, but good safeguard)
        isAvailable: data.isAvailable !== undefined ? data.isAvailable : true 
      }
    })

    return NextResponse.json(updatedItem)
  } catch (error) {
    console.error('Error updating menu item:', error)
    return NextResponse.json(
      { error: 'Failed to update menu item' },
      { status: 500 }
    )
  }
}

// --- NEW DELETE HANDLER ---
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }) {
  try {
    const { id } = params
    
    // Check if the item exists before attempting to delete (optional, but handles 404 cleanly)
    const existingItem = await prisma.menuItem.findUnique({
      where: { id }
    });

    if (!existingItem) {
      return NextResponse.json({ error: 'Menu item not found' }, { status: 404 });
    }
    
    // Perform the deletion
    await prisma.menuItem.delete({
      where: { id }
    })
    
    // Return a 200 OK or 204 No Content response for successful deletion
    return NextResponse.json({ success: true }, { status: 200 })
    // NOTE: A status 204 (No Content) is often preferred for successful DELETE operations 
    // where no body content is expected in the response.
    // return new NextResponse(null, { status: 204 }); 

  } catch (error) {
    // Check if the error indicates a record not found or similar issue (e.g., in Prisma)
    console.error('Error deleting menu item:', error)

    return NextResponse.json(
      { error: 'Failed to delete menu item' },
      { status: 500 }
    )
  }
}