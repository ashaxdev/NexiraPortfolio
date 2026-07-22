export default function sitemap() {
  const base = 'https://www.nexirasolution.in'
  const routes = [
    '',
    '/about',
    '/services',
    '/portfolio',
    '/blog',
    '/careers',
    '/contact',
    '/tools',
    '/privacy-policy',
    '/terms',
  ]

  return routes.map((route) => ({
    url: `${base}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: route === '' ? 1 : 0.7,
  }))
}