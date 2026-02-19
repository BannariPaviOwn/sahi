# Deploy & Host Your Website

This guide covers hosting your Next.js site and making it easy for search engines to find it (SEO).

---

## 1. Recommended: Deploy on Vercel (free tier)

Vercel is made by the Next.js team. One-click deploy from GitHub, free SSL, and great performance.

### Steps

1. **Push your code to GitHub** (if not already)
   ```bash
   git add .
   git commit -m "Ready for deploy"
   git push origin main
   ```

2. **Sign up / log in**
   - Go to [vercel.com](https://vercel.com) and sign in with **GitHub**.

3. **Import the project**
   - Click **Add New** → **Project**.
   - Select your `sahi` repository.
   - Framework Preset: **Next.js** (auto-detected).
   - Root Directory: leave as **./**.
   - Click **Deploy**.

4. **Set environment variables** (for contact form email)
   - In the project dashboard: **Settings** → **Environment Variables**.
   - Add (use your real values):

   | Name            | Value                    | Notes                    |
   |-----------------|--------------------------|--------------------------|
   | `SMTP_HOST`     | e.g. `smtp.gmail.com`    | Your email provider      |
   | `SMTP_PORT`     | `587`                    |                          |
   | `SMTP_USER`     | your-email@example.com  |                          |
   | `SMTP_PASS`     | app password             | Gmail: use App Password  |
   | `SMTP_FROM`     | (optional) same as USER  | Sender address           |
   | `CONTACT_TO`    | (optional) inbox email   | Where form emails go     |
   | `NEXT_PUBLIC_SITE_URL` | `https://yourdomain.com` | **Important for SEO** (see below) |

   Then trigger a new deploy: **Deployments** → **⋯** on latest → **Redeploy**.

5. **Custom domain (for SEO and branding)**
   - **Settings** → **Domains** → add your domain (e.g. `drsahiwellness.com`).
   - Follow Vercel’s instructions to add the DNS records at your registrar.
   - After the domain is connected, set:
     - `NEXT_PUBLIC_SITE_URL` = `https://yourdomain.com` (no trailing slash)
   - Redeploy so sitemap, Open Graph, and canonical URLs use the correct domain.

Your site will be live at a URL like `https://your-project.vercel.app` and, after DNS is set, at `https://yourdomain.com`.

---

## 2. Other hosting options

- **Netlify**  
  [netlify.com](https://netlify.com) → Connect GitHub repo, build command: `npm run build`, publish directory: `.next` (use **Next.js runtime** so it runs `next start` or their Next.js plugin).

- **Cloudflare Pages**  
  [pages.cloudflare.com](https://pages.cloudflare.com) → Connect repo, framework: **Next.js**, build: `npm run build`. Set `NEXT_PUBLIC_SITE_URL` to your Cloudflare Pages URL or custom domain.

- **Railway / Render / Fly.io**  
  Use **Docker** or **Node** environment: install deps, `npm run build`, then run `npm start` and expose the port (usually 3000). Set `NEXT_PUBLIC_SITE_URL` to your final site URL.

---

## 3. SEO checklist (already done in this project)

- **Metadata**  
  Title, description, and keywords are set in `app/layout.js`.

- **Open Graph & Twitter**  
  Set in the same layout so links look good when shared on social media.

- **Canonical URL**  
  Uses `NEXT_PUBLIC_SITE_URL` so search engines see one main URL.

- **Sitemap**  
  Available at `/sitemap.xml` (generated from `app/sitemap.js`).

- **robots.txt**  
  Generated from `app/robots.js`; allows crawlers and points to the sitemap.

- **Structured data (JSON-LD)**  
  ProfessionalService schema in the layout for rich results in search.

- **Semantic HTML**  
  Sections, headings, and landmarks are used for accessibility and SEO.

### After you have a live domain

1. Set **`NEXT_PUBLIC_SITE_URL`** to `https://yourdomain.com` and redeploy.
2. Submit the sitemap in **Google Search Console**: add property for `https://yourdomain.com`, then submit `https://yourdomain.com/sitemap.xml`.
3. (Optional) Add **Google / Yandex verification** in `app/layout.js` under `metadata.verification` when you get the codes.

---

## 4. Quick reference: env vars

| Variable                  | Required | Purpose                          |
|---------------------------|----------|----------------------------------|
| `SMTP_HOST`               | Yes*     | Send contact form emails         |
| `SMTP_PORT`               | Yes*     | Usually 587                      |
| `SMTP_USER`               | Yes*     | SMTP login                       |
| `SMTP_PASS`               | Yes*     | SMTP password / app password     |
| `NEXT_PUBLIC_SITE_URL`    | Strongly recommended | SEO, sitemap, OG, canonical |
| `SMTP_FROM` / `CONTACT_TO`| No       | Optional sender/recipient        |

\* Required only if you want the contact form to send email.
