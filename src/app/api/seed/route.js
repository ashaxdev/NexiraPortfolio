import { NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import { Admin, Service, Tool } from '@/models'
import bcrypt from 'bcryptjs'

export async function GET() {
  await dbConnect()

  // Create admin
  const existing = await Admin.findOne({ email: 'admin@nexirasolution.in' })
  if (!existing) {
    const hashed = await bcrypt.hash('Admin@123', 12)
    await Admin.create({ email: 'admin@nexirasolution.in', password: hashed, name: 'Nexira Admin' })
  }

  // Seed services
  const services = [
    { title: 'Website & Landing Page', slug: 'website-landing-page', description: 'High-converting websites and landing pages built with modern technologies for maximum performance and user engagement.', icon: 'FaGlobe', features: ['Responsive Design', 'SEO Optimized', 'Fast Loading', 'CMS Integration'], order: 1 },
    { title: 'Portfolio Websites', slug: 'portfolio-websites', description: 'Professional portfolio sites that showcase your work, skills, and achievements to attract clients and employers.', icon: 'FaBriefcase', features: ['Custom Design', 'Project Showcase', 'Contact Forms', 'Mobile Ready'], order: 2 },
    { title: 'ERP Solutions', slug: 'erp-solutions', description: 'Enterprise Resource Planning systems that streamline your business operations, from finance to HR to inventory.', icon: 'FaDatabase', features: ['Modules Integration', 'Real-time Analytics', 'Multi-user Access', 'Cloud Hosted'], order: 3 },
    { title: 'SaaS Development', slug: 'saas-development', description: 'Scalable Software as a Service products built for growth, with subscription management and multi-tenant architecture.', icon: 'FaCloud', features: ['Multi-tenant', 'Subscription Billing', 'API First', 'Scalable'], order: 4 },
    { title: 'E-Commerce', slug: 'ecommerce', description: 'Full-featured online stores with payment gateway integration, inventory management, and seamless checkout experience.', icon: 'FaShoppingCart', features: ['Payment Gateway', 'Inventory Mgmt', 'Order Tracking', 'Admin Dashboard'], order: 5 },
    { title: 'AI Agents', slug: 'ai-agents', description: 'Intelligent AI agents that automate complex workflows, make decisions, and handle tasks autonomously for your business.', icon: 'FaRobot', features: ['Task Automation', 'Natural Language', 'API Integration', '24/7 Operation'], order: 6 },
    { title: 'AI Chatbots', slug: 'ai-chatbots', description: 'Smart conversational AI chatbots for customer support, lead generation, and engagement on your website or app.', icon: 'FaComments', features: ['NLP Powered', 'Multi-platform', 'CRM Integration', 'Analytics'], order: 7 },
  ]

  for (const s of services) {
    await Service.findOneAndUpdate({ slug: s.slug }, s, { upsert: true })
  }

  // Seed tools
  const tools = [
    { name: 'SEO Analyzer', slug: 'seo-analyzer', description: 'Analyze your website SEO score and get actionable recommendations.', icon: 'FaSearch', url: '/tools/seo-analyzer', category: 'SEO', free: true, order: 1 },
    { name: 'Website Speed Test', slug: 'speed-test', description: 'Test your website loading speed and performance metrics.', icon: 'FaBolt', url: '/tools/speed-test', category: 'Performance', free: true, order: 2 },
    { name: 'AI Content Generator', slug: 'ai-content', description: 'Generate high-quality content for blogs, social media, and marketing.', icon: 'FaMagic', url: '/tools/ai-content', category: 'AI', free: false, order: 3 },
    { name: 'Color Palette Generator', slug: 'color-palette', description: 'Create beautiful color palettes for your brand and design projects.', icon: 'FaPalette', url: '/tools/color-palette', category: 'Design', free: true, order: 4 },
    { name: 'Meta Tag Generator', slug: 'meta-tags', description: 'Generate optimized meta tags for better search engine visibility.', icon: 'FaTag', url: '/tools/meta-tags', category: 'SEO', free: true, order: 5 },
    { name: 'Invoice Generator', slug: 'invoice-generator', description: 'Create professional invoices quickly and download as PDF.', icon: 'FaFileInvoice', url: '/tools/invoice', category: 'Business', free: true, order: 6 },
  ]

  for (const t of tools) {
    await Tool.findOneAndUpdate({ slug: t.slug }, t, { upsert: true })
  }

  return NextResponse.json({ message: 'Database seeded successfully! Admin: admin@nexirasolution.in / Admin@123' })
}
