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
    openGraph: blog.image
      ? {
          title: blog.title,
          description: blog.excerpt,
          images: [{ url: blog.image }],
        }
      : undefined,
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
          paddingBottom: blog.image ? 40 : 60,
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
              fontSize: 'clamp(28px, 5vw, 58px)',
              lineHeight: 1.2,
              marginBottom: 24,
            }}
          >
            {blog.title}
          </h1>

          <p
            style={{
              color: 'var(--text2)',
              fontSize: 17,
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
              flexWrap: 'wrap',
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
              {blog.author || 'Nexira Team'}
            </span>

            {blog.readTime && (
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
            )}
          </div>
        </div>
      </section>

      {/* Featured Image */}
      {blog.image && (
        <section className="container" style={{ maxWidth: 900, marginBottom: 40 }}>
          <div className="blog-detail-img-frame">
            <img src={blog.image} alt={blog.title} />
          </div>
        </section>
      )}

      {/* Content */}
      <section className="section" style={{ paddingTop: blog.image ? 0 : undefined }}>
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

      <style>{`
        .blog-detail-img-frame {
          width: 100%;
          max-height: 480px;
          border-radius: 16px;
          border: 1px solid var(--border);
          background: var(--bg3);
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .blog-detail-img-frame img {
          width: 100%;
          height: 100%;
          max-height: 480px;
          object-fit: contain;
        }

        @media (max-width: 640px) {
          .blog-detail-img-frame {
            max-height: 260px;
            border-radius: 12px;
          }

          .blog-detail-img-frame img {
            max-height: 260px;
          }
        }
      `}</style>
    </>
  )
}