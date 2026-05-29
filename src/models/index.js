import mongoose from 'mongoose'

// Blog Model
const BlogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  excerpt: { type: String, required: true },
  content: { type: String, required: true },
  image: { type: String, default: '' },
  category: { type: String, default: 'General' },
  tags: [String],
  author: { type: String, default: 'Nexira Team' },
  published: { type: Boolean, default: false },
  seo: {
    title: String,
    description: String,
    keywords: String,
  },
}, { timestamps: true })

// Portfolio Model
const PortfolioSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  fullDescription: { type: String, default: '' },
  image: { type: String, default: '' },
  category: { type: String, default: 'Web' },
  tags: [String],
  liveUrl: { type: String, default: '' },
  featured: { type: Boolean, default: false },
  order: { type: Number, default: 0 },
}, { timestamps: true })

// Service Model
const ServiceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  icon: { type: String, default: 'FaCode' },
  features: [String],
  price: { type: String, default: '' },
  order: { type: Number, default: 0 },
  active: { type: Boolean, default: true },
}, { timestamps: true })

// Career Model
const CareerSchema = new mongoose.Schema({
  title: { type: String, required: true },
  department: { type: String, required: true },
  location: { type: String, default: 'Remote / Madurai' },
  type: { type: String, enum: ['Full-time', 'Part-time', 'Contract', 'Internship'], default: 'Full-time' },
  description: { type: String, required: true },
  requirements: [String],
  active: { type: Boolean, default: true },
}, { timestamps: true })

// Enquiry Model
const EnquirySchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, default: '' },
  service: { type: String, default: '' },
  message: { type: String, required: true },
  status: { type: String, enum: ['new', 'read', 'replied', 'closed'], default: 'new' },
  source: { type: String, default: 'website' },
}, { timestamps: true })

// Tool Model
const ToolSchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  icon: { type: String, default: 'FaTools' },
  url: { type: String, required: true },
  category: { type: String, default: 'General' },
  free: { type: Boolean, default: true },
  active: { type: Boolean, default: true },
  order: { type: Number, default: 0 },
}, { timestamps: true })

// Settings Model
const SettingsSchema = new mongoose.Schema({
  key: { type: String, required: true, unique: true },
  value: { type: mongoose.Schema.Types.Mixed },
}, { timestamps: true })

// Admin User Model
const AdminSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, default: 'Admin' },
  role: { type: String, default: 'admin' },
}, { timestamps: true })

export const Blog = mongoose.models.Blog || mongoose.model('Blog', BlogSchema)
export const Portfolio = mongoose.models.Portfolio || mongoose.model('Portfolio', PortfolioSchema)
export const Service = mongoose.models.Service || mongoose.model('Service', ServiceSchema)
export const Career = mongoose.models.Career || mongoose.model('Career', CareerSchema)
export const Enquiry = mongoose.models.Enquiry || mongoose.model('Enquiry', EnquirySchema)
export const Tool = mongoose.models.Tool || mongoose.model('Tool', ToolSchema)
export const Settings = mongoose.models.Settings || mongoose.model('Settings', SettingsSchema)
export const Admin = mongoose.models.Admin || mongoose.model('Admin', AdminSchema)
