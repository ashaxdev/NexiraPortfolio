import { NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import { Tool } from '@/models'
import slugify from 'slugify'

export async function GET() {
  await dbConnect()
  const items = await Tool.find({ active: true }).sort({ order: 1 })
  return NextResponse.json(items)
}

export async function POST(req) {
  await dbConnect()
  const body = await req.json()
  const slug = slugify(body.name, { lower: true, strict: true })
  const item = await Tool.create({ ...body, slug })
  return NextResponse.json(item, { status: 201 })
}
