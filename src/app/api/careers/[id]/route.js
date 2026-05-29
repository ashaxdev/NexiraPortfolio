import { NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import { Career } from '@/models'

export async function PUT(req, { params }) {
  await dbConnect()
  const body = await req.json()
  const item = await Career.findByIdAndUpdate(params.id, body, { new: true })
  return NextResponse.json(item)
}

export async function DELETE(req, { params }) {
  await dbConnect()
  await Career.findByIdAndDelete(params.id)
  return NextResponse.json({ success: true })
}
