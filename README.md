# 🚀 Nexira Solution — Full-Stack Website

A complete Next.js 14 + MongoDB multipage IT company website with Admin Panel.

**Website:** www.nexirasolution.in  
**Phone:** +91 9384155672

---

## 📋 Features

### Public Website
- ✅ **Hero Section** — Video background, animated text, WhatsApp CTA
- ✅ **Services** — 7 services (Website, Portfolio, ERP, SaaS, E-Commerce, AI Agents, AI Chatbots)
- ✅ **Portfolio** — Filterable project gallery
- ✅ **About** — Story, team, values, mission
- ✅ **Blog** — Articles with SEO metadata
- ✅ **Careers** — Job listings with apply via WhatsApp
- ✅ **Tools** — Online tools section (SEO, Speed, AI Content, etc.)
- ✅ **Contact/Enquiry** — Form that saves to MongoDB
- ✅ **WhatsApp Button** — Floating button, always visible
- ✅ **Mobile Responsive** — Works on all devices
- ✅ **Advanced SEO** — Schema.org, OpenGraph, sitemap.xml, robots.txt

### Admin Panel (`/admin`)
- ✅ **Dashboard** — Stats overview, recent enquiries
- ✅ **Enquiries** — View, filter, update status, reply
- ✅ **Blog Manager** — Create/edit/publish blog posts with SEO fields
- ✅ **Portfolio Manager** — Add/edit/remove projects
- ✅ **Services Manager** — Update service content
- ✅ **Careers Manager** — Manage job openings
- ✅ **Tools Manager** — Add/remove tools
- ✅ **Settings** — WhatsApp number, SEO, social links

---

## 🛠️ Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Database:** MongoDB + Mongoose
- **Auth:** NextAuth.js (credentials)
- **Styling:** CSS Variables (no Tailwind needed)
- **Fonts:** Syne + DM Sans (Google Fonts)
- **Icons:** react-icons
- **Toasts:** react-hot-toast

---

## ⚡ Quick Start

### 1. Install Dependencies
```bash
cd nexira-solution
npm install
```

### 2. Set Up Environment Variables
```bash
cp .env.local.example .env.local
```

Edit `.env.local`:
```env
MONGODB_URI=mongodb://localhost:27017/nexira
NEXTAUTH_SECRET=your-super-secret-key-at-least-32-chars
NEXTAUTH_URL=http://localhost:3000
NEXT_PUBLIC_WHATSAPP_NUMBER=919384155672
NEXT_PUBLIC_SITE_URL=https://www.nexirasolution.in
```

### 3. Start MongoDB
```bash
# Using MongoDB locally
mongod

# OR use MongoDB Atlas (cloud) — update MONGODB_URI with your connection string
```

### 4. Seed the Database
```
Visit: http://localhost:3000/api/seed
```
This creates:
- Admin account: `admin@nexirasolution.in` / `Admin@123`
- All 7 default services
- 6 default tools

### 5. Run Development Server
```bash
npm run dev
```

Visit:
- **Website:** http://localhost:3000
- **Admin:** http://localhost:3000/admin

---

## 📁 Project Structure

```
src/
├── app/
│   ├── (public)/          # Public website pages
│   │   ├── page.js        # Homepage
│   │   ├── about/         # About page
│   │   ├── services/      # Services page
│   │   ├── portfolio/     # Portfolio page
│   │   ├── blog/          # Blog listing
│   │   ├── careers/       # Careers page
│   │   ├── tools/         # Tools page
│   │   └── contact/       # Contact/Enquiry page
│   ├── admin/             # Admin panel
│   │   ├── page.js        # Login
│   │   ├── dashboard/
│   │   ├── blogs/
│   │   ├── portfolio/
│   │   ├── services/
│   │   ├── careers/
│   │   ├── enquiries/
│   │   ├── tools/
│   │   └── settings/
│   └── api/               # REST API routes
│       ├── blogs/
│       ├── portfolio/
│       ├── services/
│       ├── careers/
│       ├── enquiries/
│       ├── tools/
│       └── seed/
├── components/
│   ├── layout/            # Navbar, Footer
│   ├── ui/                # WhatsApp button
│   └── admin/             # Sidebar, Header
├── lib/
│   └── mongodb.js         # DB connection
├── models/
│   └── index.js           # All Mongoose models
└── styles/
    └── globals.css        # All CSS (theme + components)
```

---

## 🎬 Hero Video Setup

Place your video file at:
```
public/videos/hero-bg.mp4
```

Recommended: A tech/digital abstract video (1920x1080, <10MB, dark background works best)

Free sources:
- [Pexels Videos](https://www.pexels.com/videos/)
- [Pixabay](https://pixabay.com/videos/)

---

## 🔑 Admin Credentials

After seeding (`/api/seed`):
- **Email:** admin@nexirasolution.in
- **Password:** Admin@123

⚠️ Change the password after first login!

---

## 🌐 Production Deployment

### Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

Set environment variables in Vercel dashboard.

### Self-hosted (VPS/cPanel)
```bash
npm run build
npm start
```

Use PM2 for process management:
```bash
npm install -g pm2
pm2 start npm --name "nexira" -- start
```

---

## 📈 SEO Features

- ✅ Dynamic `<title>` and `<meta description>` per page
- ✅ OpenGraph tags for social sharing
- ✅ Twitter Card tags
- ✅ Schema.org Organization JSON-LD
- ✅ Auto-generated sitemap.xml
- ✅ robots.txt
- ✅ Canonical URLs
- ✅ Google verification meta tag (add your code in layout.js)

---

## 📞 Support

**Nexira Solution**  
📞 +91 9384155672  
💬 WhatsApp: wa.me/919384155672  
🌐 www.nexirasolution.in
