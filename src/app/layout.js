import './globals.css'
import { Toaster } from 'react-hot-toast'
import Providers from './providers'

export const metadata = {
  metadataBase: new URL('https://www.nexirasolution.in'),
  title: {
    default: 'Nexira Solution - IT Solutions | Web Development, AI Agents, ERP & More',
    template: '%s | Nexira Solution',
  },
  description: 'Nexira Solution is a leading IT company in Chennai offering website development, ERP, SaaS, e-commerce, AI agents, AI chatbots, and digital transformation services.',
  keywords: ['IT company Chennai', 'web development', 'AI agents', 'ERP solutions', 'SaaS development', 'e-commerce', 'AI chatbot', 'Nexira Solution'],
  authors: [{ name: 'Nexira Solution', url: 'https://www.nexirasolution.in' }],
  creator: 'Nexira Solution',
  publisher: 'Nexira Solution',
  robots: {
    index: true, follow: true,
    googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://www.nexirasolution.in',
    siteName: 'Nexira Solution',
    title: 'Nexira Solution - IT Solutions & Digital Transformation',
    description: 'Leading IT company delivering websites, AI agents, ERP, SaaS, and e-commerce solutions.',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Nexira Solution' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nexira Solution - IT Solutions',
    description: 'Websites, AI, ERP, SaaS & More',
    images: ['/og-image.png'],
  },
  alternates: { canonical: 'https://www.nexirasolution.in' },
  verification: { google: 'your-google-verification-code' },
  // Icons declared through the metadata API so Next.js manages the <link> tags itself
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon.png', type: 'image/png', sizes: '32x32' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Icons are now handled by metadata.icons above — no manual <link> tags needed */}
        <meta name="theme-color" content="#050a14" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Nexira Solution",
              "url": "https://www.nexirasolution.in",
              "logo": "https://www.nexirasolution.in/logo.png",
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+91-9384155672",
                "contactType": "customer service",
                "areaServed": "IN",
                "availableLanguage": ["English", "Tamil"]
              },
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Chennai",
                "addressRegion": "Tamil Nadu",
                "addressCountry": "IN"
              }
            })
          }}
        />
      </head>
      <body>
        <Providers>
          {children}
          <Toaster
            position="top-right"
            toastOptions={{
              style: { background: '#0f2040', color: '#e2eaf7', border: '1px solid rgba(0,170,255,0.2)' },
              success: { iconTheme: { primary: '#00aaff', secondary: '#fff' } },
            }}
          />
        </Providers>
      </body>
    </html>
  )
}