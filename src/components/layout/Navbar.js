'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { FaBars, FaTimes, FaWhatsapp } from 'react-icons/fa'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/services', label: 'Services' },
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/tools', label: 'Tools' },
  { href: '/blog', label: 'Blog' },
  { href: '/careers', label: 'Careers' },
  { href: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  const pathname = usePathname()

  useEffect(() => {
    const handler = () => {
      setScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handler)

    return () => window.removeEventListener('scroll', handler)
  }, [])

  const wa = `https://wa.me/${
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '919384155672'
  }?text=Hi, I'm interested in your services!`

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,

        background: scrolled
          ? 'rgba(255,255,255,0.95)'
          : 'transparent',

        backdropFilter: scrolled
          ? 'blur(18px)'
          : 'none',

        borderBottom: scrolled
          ? '1px solid rgba(0,0,0,0.08)'
          : 'none',

        transition: 'all 0.3s ease',
      }}
    >
      <div
        className="container"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: 78,
        }}
      >
        {/* Logo */}
        <Link
          href="/"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
          }}
        >
          <Image
            src="/images/logo.png"
            alt="Nexira Solution"
            width={200}
            height={200}
            priority
            style={{
              objectFit: 'contain',
            }}
          />

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              lineHeight: 1.1,
            }}
          >
            {/* <span
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 800,
                fontSize: 22,
                color: '#111',
              }}
            >
              Nexira
            </span>

            <span
              style={{
                fontSize: 13,
                fontWeight: 600,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: 'var(--primary)',
              }}
            >
              Solution
            </span> */}
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div
          className="desktop-nav"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 4,
          }}
        >
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              style={{
                padding: '10px 16px',
                borderRadius: 10,

                fontSize: 14,
                fontWeight: 600,

                color:
                  pathname === l.href
                    ? '#111'
                    : '#4b5563',

                background:
                  pathname === l.href
                    ? 'rgba(255,204,0,0.18)'
                    : 'transparent',

                transition: 'all 0.25s ease',
              }}
              onMouseEnter={(e) => {
                if (pathname !== l.href) {
                  e.currentTarget.style.color = '#111'
                  e.currentTarget.style.background =
                    'rgba(255,204,0,0.08)'
                }
              }}
              onMouseLeave={(e) => {
                if (pathname !== l.href) {
                  e.currentTarget.style.color = '#4b5563'
                  e.currentTarget.style.background =
                    'transparent'
                }
              }}
            >
              {l.label}
            </Link>
          ))}

          <a
            href={wa}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
            style={{
              padding: '12px 22px',
              fontSize: 14,
              marginLeft: 10,
            }}
          >
            <FaWhatsapp />
            WhatsApp
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="mobile-toggle"
          style={{
            background: 'none',
            border: 'none',

            color: '#111',

            fontSize: 24,

            cursor: 'pointer',

            display: 'none',
          }}
        >
          {open ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div
          style={{
            background: 'rgba(255,255,255,0.98)',

            backdropFilter: 'blur(20px)',

            borderTop: '1px solid rgba(0,0,0,0.06)',

            padding: '16px 0',

            boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
          }}
        >
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              style={{
                display: 'block',

                padding: '14px 24px',

                fontSize: 16,
                fontWeight: 600,

                color:
                  pathname === l.href
                    ? '#111'
                    : '#4b5563',

                borderLeft:
                  pathname === l.href
                    ? '4px solid var(--primary)'
                    : '4px solid transparent',

                background:
                  pathname === l.href
                    ? 'rgba(255,204,0,0.12)'
                    : 'transparent',
              }}
            >
              {l.label}
            </Link>
          ))}

          <div style={{ padding: '16px 24px' }}>
            <a
              href={wa}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
              style={{
                width: '100%',
                justifyContent: 'center',
              }}
            >
              <FaWhatsapp />
              Chat on WhatsApp
            </a>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 900px) {
          .desktop-nav {
            display: none !important;
          }

          .mobile-toggle {
            display: block !important;
          }
        }
      `}</style>
    </nav>
  )
}