# 🚀 REDDOT.AI — Complete Project State & Architecture Runbook

> **Last Updated:** August 23, 2026  
> **Repository:** `https://github.com/reddotorg123/REDDOT.git`  
> **Live Production Domain:** `https://reddot.org.in`  

---

## 📌 1. Unified Brand & Business Guidelines (Mandatory Standard)

| Attribute | Standard Value | Notes |
| :--- | :--- | :--- |
| **Official Email** | `reddot.org123@gmail.com` | Exclusively used across Contact, Footer, Legal, Chat, and Modals |
| **Official Phone / WhatsApp** | `+91 80150 24729` | Exclusively used across all pages |
| **Established Year** | `2024` | Established in India (Do NOT use 2026) |
| **Headquarters** | Chennai, Tamil Nadu, India | OMR IT Corridor |

---

## 🛠️ 2. Complete Technology Stack

### **Frontend:**
- **Framework:** React 19 (`react`, `react-dom`) with TypeScript
- **Bundler & Tooling:** Vite 7 with Fast HMR & Tree-shaking
- **Styling:** Tailwind CSS v4 (`@tailwindcss/vite`), Custom CSS Design System with dark mode tokens (`index.css`)
- **Animation & 3D:** Framer Motion (`framer-motion`), Canvas 2D Particle Engine, Three.js (`three`, `@react-three/fiber`, `@react-three/drei`)
- **Icons & UI Primitives:** Lucide React (`lucide-react`), Radix UI (`@radix-ui/*`)
- **Forms & Validation:** React Hook Form (`react-hook-form`), Zod (`zod`), Google Forms automated integration
- **Notifications:** Sonner (`sonner`)

### **Backend & APIs:**
- **Server:** Node.js with Express (`express`)
- **RPC & Data Fetching:** tRPC v11 (`@trpc/server`, `@trpc/client`, `@trpc/react-query`), TanStack React Query v5
- **Real-Time Voice & Video:** LiveKit Server SDK (`livekit-server-sdk`), LiveKit Client (`livekit-client`)
- **AI & LLM Services:** Google Gemini API (`@google/generative-ai`)
- **Database & ORM:** PostgreSQL / MySQL with Drizzle ORM (`drizzle-orm`, `drizzle-kit`)

### **Production Infrastructure (AWS EC2):**
- **Process Manager:** PM2 (`pm2`)
- **Web Server & Reverse Proxy:** NGINX (terminates SSL/TLS and proxies to `http://127.0.0.1:3000`)
- **Port:** Fixed on `3000` (bound to `0.0.0.0:3000`)

---

## 🗺️ 3. Complete Page & Route Inventory

| Route | Component | Purpose & Features |
| :--- | :--- | :--- |
| `/` | `client/src/pages/Home.tsx` | Hero canvas, Services overview, AI Timeline, Metrics, Industries, Case Studies, Core Values, Team, Tech Stack, CTA |
| `/products` | `client/src/pages/Products.tsx` | HAPP (Agentic AI Manager), SEM (Campus Hub), Evalora (AI Evaluation), AI Avatar & Voice |
| `/services` (or `/#services`) | `client/src/components/Services.tsx` | 16 enterprise services across Intelligence, Experience, and Infrastructure |
| `/industries` | `client/src/pages/Industries.tsx` | 12 targeted verticals (Healthcare, Finance, Manufacturing, Education, etc.) |
| `/blog` | `client/src/pages/Blog.tsx` | Technical articles, AI case studies, enterprise agent whitepapers |
| `/blog/:id` | `client/src/pages/BlogPost.tsx` | Full article view with dynamic Twitter/X & LinkedIn share URLs |
| `/career` | `client/src/pages/Career.tsx` | Full-time job listings with department filters and direct application modal |
| `/internship` | `client/src/pages/Internship.tsx` | Internship tracks with Google Forms direct application flow |
| `/contact` | `client/src/pages/Contact.tsx` | Unified contact methods (Email, Phone, WhatsApp), consultation inquiry form |
| `/legal` | `client/src/pages/Legal.tsx` | Privacy Policy, Terms of Service, Cookie Policy, Zero-Trust Security standard |

---

## 🔧 4. AWS Deployment & 502 Bad Gateway Troubleshooting Runbook

### **Standard Production Update Command:**
On your AWS EC2 instance terminal:
```bash
cd ~/app
git pull origin main
npm install --production=false
npm run build
pm2 restart all
```

### **Diagnosing & Fixing 502 Bad Gateway:**

A `502 Bad Gateway` error occurs when **NGINX is running, but the Node.js / PM2 backend process on port 3000 is stopped or crashed**.

#### Step 1: Check PM2 Process Status
```bash
pm2 status
```
- If the status is `errored` or `stopped`, check the error logs:
```bash
pm2 logs --lines 50
```

#### Step 2: Restart PM2 with Clean Build
```bash
cd ~/app
npm run build
pm2 restart reddot || pm2 start dist/index.js --name "reddot"
```

#### Step 3: Verify Node.js is Listening on Port 3000
```bash
curl -I http://127.0.0.1:3000
```
- Should return `HTTP/1.1 200 OK`.

#### Step 4: Verify NGINX Status
```bash
sudo systemctl status nginx
sudo nginx -t
sudo systemctl reload nginx
```
