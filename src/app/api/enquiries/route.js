import { NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import { Enquiry } from '@/models'

export async function GET() {
  await dbConnect()
  const items = await Enquiry.find().sort({ createdAt: -1 })
  return NextResponse.json(items)
}

export async function POST(req) {
  await dbConnect()
  const body = await req.json()
  const item = await Enquiry.create(body)
  return NextResponse.json(item, { status: 201 })
}
