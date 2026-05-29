import { NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import { Service } from '@/models'
import slugify from 'slugify'

export async function PUT(req, { params }) {
  await dbConnect()
  const body = await req.json()
  if (body.title) body.slug = slugify(body.title, { lower: true, strict: true })
  const item = await Service.findByIdAndUpdate(params.id, body, { new: true })
  return NextResponse.json(item)
}

export async function DELETE(req, { params }) {
  await dbConnect()
  await Service.findByIdAndDelete(params.id)
  return NextResponse.json({ success: true })
}
