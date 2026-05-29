import { NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import { Blog } from '@/models'
import slugify from 'slugify'

export async function GET(req) {
  await dbConnect()
  const { searchParams } = new URL(req.url)
  const pub = searchParams.get('published')
  const query = pub === 'true' ? { published: true } : {}
  const blogs = await Blog.find(query).sort({ createdAt: -1 })
  return NextResponse.json(blogs)
}

export async function POST(req) {
  await dbConnect()
  const body = await req.json()
  const slug = slugify(body.title, { lower: true, strict: true })
  const blog = await Blog.create({ ...body, slug })
  return NextResponse.json(blog, { status: 201 })
}
