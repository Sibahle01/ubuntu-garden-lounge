// src/app/api/reservations/route.ts
import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'
import { sendReservationConfirmation } from '@/lib/email.service';

export async function GET() {
  try {
    const reservations = await prisma.reservation.findMany({
      orderBy: { reservationDate: 'desc' }
    })
    return NextResponse.json(reservations)
  } catch (error) {
    console.error("Error fetching reservations:", error)
    return NextResponse.json(
      { error: "Failed to fetch reservations" },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    // 1. Validate required fields
    if (!data.customerName || !data.customerEmail || !data.reservationDate || !data.partySize || !data.time) {
      return NextResponse.json(
        { error: 'Missing required fields (name, email, date, time, party size)' },
        { status: 400 }
      )
    }

    const partySizeInt = parseInt(data.partySize)

    // 2. Validate party size
    if (isNaN(partySizeInt) || partySizeInt < 1 || partySizeInt > 20) {
      return NextResponse.json(
        { error: 'Party size must be a number between 1 and 20' },
        { status: 400 }
      )
    }

    const reservation = await prisma.reservation.create({
      data: {
        customerName: data.customerName,
        customerEmail: data.customerEmail,
        customerPhone: data.customerPhone || null,
        reservationDate: new Date(data.reservationDate),
        time: data.time,
        partySize: partySizeInt,
        specialRequests: data.specialRequests || null,
        status: data.status || 'PENDING'
      }
    })

    // 🆕 SEND EMAIL CONFIRMATION (background - won't block response)
    sendReservationConfirmation({
      customerName: reservation.customerName,
      customerEmail: reservation.customerEmail,
      reservationId: reservation.id,
      date: reservation.reservationDate,
      time: reservation.time,
      guests: reservation.partySize,
      specialRequests: reservation.specialRequests || undefined,
    }).catch(err => console.error('Background email failed:', err));

    return NextResponse.json(reservation, { status: 201 })
  } catch (error) {
    console.error('Error creating reservation:', error)
    return NextResponse.json(
      { error: 'Failed to create reservation' },
      { status: 500 }
    )
  }
}