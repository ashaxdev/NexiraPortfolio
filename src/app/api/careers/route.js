import { NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import { Career } from '@/models'

export async function GET() {
  await dbConnect()
  const items = await Career.find({ active: true }).sort({ createdAt: -1 })
  return NextResponse.json(items)
}

export async function POST(req) {
  await dbConnect()
  const body = await req.json()
  const item = await Career.create(body)
  return NextResponse.json(item, { status: 201 })
}
