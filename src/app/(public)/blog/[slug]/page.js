import { notFound } from 'next/navigation'
import { FaClock, FaUser } from 'react-icons/fa'
import dbConnect from '@/lib/mongodb'
import { Blog } from '@/models'

async function getBlog(slug) {
  await dbConnect()

  const blog = await Blog.findOne({
    slug,
    published: true,
  })

  if (!blog) {
    return null
  }

  return JSON.parse(JSON.stringify(blog))
}

export async function generateMetadata({ params }) {
  const blog = await getBlog(params.slug)

  if (!blog) {
    return {
      title: 'Blog Not Found',
    }
  }

  return {
    title: `${blog.title} | Nexira Solution`,
    description: blog.excerpt,
  }
}

export default async function BlogDetailsPage({ params }) {
  const blog = await getBlog(params.slug)

  if (!blog) {
    notFound()
  }

  return (
    <>
      {/* Hero */}
      <section
        style={{
          paddingTop: 140,
          paddingBottom: 60,
          background:
            'linear-gradient(180deg, var(--bg) 0%, var(--bg2) 100%)',
        }}
      >
        <div className="container" style={{ maxWidth: 900 }}>
          <span className="badge" style={{ marginBottom: 20 }}>
            {blog.category}
          </span>

          <h1
            style={{
              fontSize: 'clamp(32px, 5vw, 58px)',
              lineHeight: 1.2,
              marginBottom: 24,
            }}
          >
            {blog.title}
          </h1>

          <p
            style={{
              color: 'var(--text2)',
              fontSize: 18,
              lineHeight: 1.8,
              marginBottom: 30,
            }}
          >
            {blog.excerpt}
          </p>

          <div
            style={{
              display: 'flex',
              gap: 20,
              color: 'var(--text3)',
              fontSize: 14,
            }}
          >
            <span
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
              }}
            >
              <FaUser />
              Nexira Team
            </span>

            <span
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
              }}
            >
              <FaClock />
              {blog.readTime}
            </span>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="section">
        <div
          className="container"
          style={{
            maxWidth: 900,
          }}
        >
          <div
            className="card"
            style={{
              padding: 40,
              lineHeight: 1.9,
              fontSize: 16,
            }}
          >
            <div
              dangerouslySetInnerHTML={{
                __html: blog.content,
              }}
            />
          </div>
        </div>
      </section>
    </>
  )
}