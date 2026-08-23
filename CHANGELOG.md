# 📜 REDDOT.AI — Complete Version History & Changelog

All notable changes, bug fixes, features, and optimizations made to the REDDOT platform are recorded here.

---

## [Unreleased] / August 23, 2026

### 🛡️ Production & AWS 502 Bad Gateway Fixes
- **Port Binding Fix (`server/_core/index.ts`)**: In production mode (`NODE_ENV=production`), the Express server now strictly binds to `process.env.PORT || 3000` on `0.0.0.0`, ensuring NGINX reverse proxy (`http://127.0.0.1:3000`) never encounters port mismatches (502 Bad Gateway).
- **OWASP Security Headers**: Added `X-Content-Type-Options: nosniff`, `X-Frame-Options: SAMEORIGIN` (anti-clickjacking), `X-XSS-Protection`, `Referrer-Policy: strict-origin-when-cross-origin`, and `Permissions-Policy`.
- **Express Fingerprint Removal**: Disabled `X-Powered-By: Express` header to prevent server technology enumeration.
- **In-Memory Rate Limiter**: Added IP-based request throttling on all `/api/` endpoints (120 req/min per IP) to protect against DDoS and brute-force abuse.
- **Health Check Endpoint (`/api/health`)**: Added dedicated liveness probe returning HTTP 200 with uptime and timestamp for NGINX/ALB monitoring.
- **Graceful Process Shutdown**: Added `SIGTERM` and `SIGINT` connection drain handlers so PM2 reloads complete in-flight requests without dropped packets.
- **Zero-Downtime Deployment Script (`deploy.sh`)**: Added automated build verification, dependency installation, PM2 reload, and health check validation.
- **Startup Error Logging**: Added explicit event listeners for `EADDRINUSE` and startup exceptions to log detailed diagnostics in PM2.

### ⚡ Performance & Core Web Vitals (Lighthouse Optimization)
- **LCP & FCP Optimization (`client/src/components/Hero.tsx`)**: Removed initial `opacity: 0` CSS variants from the Hero `<h1>`, subheadline, and CTA buttons. Content is now rendered immediately with full visibility (`opacity: 1`), eliminating the 3.73s+ LCP delay.
- **On-Demand Deferred Google Translate (`client/index.html`, `client/src/components/Navbar.tsx`)**: Converted synchronous external Google Translate script into an asynchronous on-demand loader triggered only when interacting with the language menu, eliminating render-blocking network requests.
- **1-Year Static Caching (`server/_core/vite.ts`)**: Enabled `Cache-Control: public, max-age=31536000, immutable` headers for all hashed assets (`.js`, `.css`, images, fonts).

### 🎨 Dark Mode & UI Consistency
- **Hero Canvas Dark Mode (`client/src/components/Hero.tsx`)**: Replaced continuous white canvas fill (`rgba(250, 251, 252, 0.15)`) with clean `ctx.clearRect` and theme-aware particle colors (neon blue/cyan `#60a5fa` in dark mode, corporate blue `#2563eb` in light mode).
- **Universal Dark Mode Overrides (`client/src/index.css`)**: Added global `.dark` utility selectors to ensure every card, container, and text element automatically adapts to dark mode.
- **Internships Page Dark Mode (`client/src/pages/Internship.tsx`)**: Added explicit dark mode styling to hero, tech ticker, why intern cards, and opening domain cards.
- **Contact Cards Hover Text Fix (`client/src/pages/Contact.tsx`)**: Rebuilt contact cards with a single unified container and hover gradient overlay, ensuring text and icons remain 100% sharp and high-contrast white on hover.
- **Mouse Scroll Indicator Removal (`Hero.tsx`, `Contact.tsx`)**: Completely removed the floating mouse scroll indicator animation across all pages per design request.

### 🌐 Multilingual Translation & Reset
- **Clean Reset to Default (`client/index.html`)**: Selecting "English (Default)" completely purges all `googtrans` cookies across all hostnames/domains and reloads the clean, original source English DOM.
- **Suppressed Google Translate Toolbar**: Offscreen-hidden all Google banner frames (`VIpgJd-ZVi9od-ORHb-Oxf5td`, `.goog-te-banner-frame`) and locked `body { top: 0px !important }` to prevent header shifting.

### 📞 Contact & Brand Standards
- **Unified Email**: Exclusively `reddot.org123@gmail.com` across `Contact.tsx`, `Footer.tsx`, `Legal.tsx`, `FloatingChat.tsx`, and `BookingModal.tsx`.
- **Unified Phone**: Exclusively `+91 80150 24729` across all pages.
- **Established Year**: Standardized to `2024` in `About.tsx`, `Career.tsx`, and `FloatingChat.tsx`.
