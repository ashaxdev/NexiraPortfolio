import { NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import { Portfolio } from '@/models'
import slugify from 'slugify'

export async function GET(req, { params }) {
  await dbConnect()
  const item = await Portfolio.findById(params.id)
  if (!item) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json(item)
}

export async function PUT(req, { params }) {
  await dbConnect()
  const body = await req.json()
  if (body.title) body.slug = slugify(body.title, { lower: true, strict: true })
  const item = await Portfolio.findByIdAndUpdate(params.id, body, { new: true })
  return NextResponse.json(item)
}

export async function DELETE(req, { params }) {
  await dbConnect()
  await Portfolio.findByIdAndDelete(params.id)
  return NextResponse.json({ success: true })
}
