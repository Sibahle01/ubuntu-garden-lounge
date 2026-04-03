// src/app/api/menu/route.ts - READING FROM DATABASE
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const menuItems = await prisma.menuItem.findMany({
      orderBy: { order: "asc" },
    });
    return NextResponse.json(menuItems);
  } catch (error) {
    console.error("Error fetching menu items:", error);
    return NextResponse.json(
      { error: "Failed to fetch menu items" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      name,
      description,
      price,
      category,
      imageUrl,
      isSpicy,
      isVegetarian,
      isAvailable,
      isFeatured,
      order,
    } = body;

    const menuItem = await prisma.menuItem.create({
      data: {
        name,
        description,
        price: parseFloat(price).toFixed(2),
        category,
        imageUrl: imageUrl || null,
        isSpicy: isSpicy || false,
        isVegetarian: isVegetarian || false,
        isAvailable: isAvailable !== undefined ? isAvailable : true,
        isFeatured: isFeatured || false,
        order: order || 0,
      },
    });
    return NextResponse.json(menuItem, { status: 201 });
  } catch (error) {
    console.error("Error creating menu item:", error);
    return NextResponse.json(
      { error: "Failed to create menu item" },
      { status: 500 }
    );
  }
}
