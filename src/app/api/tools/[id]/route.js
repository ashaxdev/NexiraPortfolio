import { NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import { Tool } from '@/models'
import slugify from 'slugify'

export async function PUT(req, { params }) {
  await dbConnect()
  const body = await req.json()
  if (body.name) body.slug = slugify(body.name, { lower: true, strict: true })
  const item = await Tool.findByIdAndUpdate(params.id, body, { new: true })
  return NextResponse.json(item)
}

export async function DELETE(req, { params }) {
  await dbConnect()
  await Tool.findByIdAndDelete(params.id)
  return NextResponse.json({ success: true })
}
