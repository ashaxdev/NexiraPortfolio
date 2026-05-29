export default function robots() {
  return {
    rules: [
      { userAgent: '*', allow: '/', disallow: ['/admin/', '/api/'] },
    ],
    sitemap: 'https://www.nexirasolution.in/sitemap.xml',
    host: 'https://www.nexirasolution.in',
  }
}
