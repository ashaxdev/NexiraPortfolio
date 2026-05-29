import { NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import { Blog } from '@/models'
import slugify from 'slugify'

export async function GET(req, context) {
  try {
    await dbConnect()

    const { id } = context.params

    const blog = await Blog.findById(id)

    if (!blog) {
      return NextResponse.json(
        { error: 'Blog not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(blog)
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    )
  }
}

export async function PUT(req, context) {
  try {
    await dbConnect()

    const { id } = context.params
    const body = await req.json()

    if (body.title) {
      body.slug = slugify(body.title, {
        lower: true,
        strict: true,
      })
    }

    const updatedBlog = await Blog.findByIdAndUpdate(
      id,
      body,
      { new: true }
    )

    return NextResponse.json(updatedBlog)
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    )
  }
}

export async function DELETE(req, context) {
  try {
    await dbConnect()

    const { id } = context.params

    await Blog.findByIdAndDelete(id)

    return NextResponse.json({
      success: true,
      message: 'Blog deleted successfully',
    })
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    )
  }
}