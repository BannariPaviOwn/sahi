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
   - **Configure Project** screen — set these:

   | Setting | Value | Why |
   |--------|--------|-----|
   | **Framework Preset** | Next.js | Auto-detected; leave as is. |
   | **Root Directory** | `.` (or leave empty) | Your app is at the repo root (`app/`, `package.json` here). |
   | **Build Command** | `npm run build` (default) | Leave default. |
   | **Output Directory** | *(leave default)* | Vercel uses Next.js output automatically. |
   | **Install Command** | `npm install` (default) | Leave default. |

   - **Root Directory** is the only one people often change. If your Next.js app were inside a subfolder (e.g. `apps/web`), you’d set Root Directory to `apps/web`. For this repo, keep it **.** so Vercel uses the repo root.
   - Click **Deploy**.

   **Where to set Root Directory later (if you missed it)**  
   After the project is created: **Project** → **Settings** → **General** → **Root Directory**. Set to `.` (or leave empty) for this repo.

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

## 2. Connect your Namecheap domain to Vercel

After you’ve bought the domain on Namecheap, follow these steps.

### Step 1: Add the domain in Vercel

1. Open your project on **Vercel** → **Settings** → **Domains**.
2. Under **Add**, enter your domain (e.g. `drsahiwellness.com`) and press **Add**.
3. Add **www** as well if you want (e.g. `www.drsahiwellness.com`). Vercel will list both.
4. Vercel will show a **Configuration** section with the DNS records you need. Keep this open.

### Step 2: Get the DNS values from Vercel

In the Domains page, for your domain you’ll see something like:

- **A Record** for root (`@`): type **A**, name **@**, value **`76.76.21.21`** (or the IP Vercel shows).
- **CNAME Record** for **www**: type **CNAME**, name **www**, value **`cname.vercel-dns.com`** (or what Vercel shows).

Write these down or keep the tab open.

### Step 3: Add DNS records in Namecheap

1. Log in to **Namecheap** → **Domain List** → click **Manage** next to your domain.
2. Open the **Advanced DNS** tab.
3. Remove any conflicting records (e.g. if there’s already an A record for `@` pointing elsewhere, delete or edit it).
4. **Add A record (root domain):**
   - Click **Add New Record**.
   - Type: **A Record**.
   - Host: **@**.
   - Value: **`76.76.21.21`** (use the IP Vercel gave you).
   - TTL: **Automatic** (or 300). Save.
5. **Add CNAME record (www):**
   - Click **Add New Record**.
   - Type: **CNAME Record**.
   - Host: **www**.
   - Value: **`cname.vercel-dns.com`** (or the CNAME target Vercel shows).
   - TTL: **Automatic**. Save.

### Step 4: Wait and verify

- DNS can take **5–30 minutes** (sometimes up to 48 hours).
- In Vercel **Settings** → **Domains**, the domain will show **Valid Configuration** when it’s correct.
- Open `https://yourdomain.com` and `https://www.yourdomain.com` to confirm they load your site.

### Step 5: Set env and redeploy (for SEO)

1. In Vercel → **Settings** → **Environment Variables**, add or edit:
   - **`NEXT_PUBLIC_SITE_URL`** = **`https://yourdomain.com`** (no trailing slash).
2. **Redeploy** the project (Deployments → ⋯ → Redeploy) so sitemap, Open Graph, and canonical URLs use your real domain.

---

## 2b. Production vs Pre-production domains (main vs dev)

Use one domain for **production** (only `main` branch) and a separate domain/subdomain for **pre-production** (e.g. `dev` branch).

### 1. Create and push a `dev` branch

```bash
git checkout -b dev
git push -u origin dev
```

From now on: push to **main** for production, push to **dev** for pre-production.

### 2. Add both domains in Vercel

1. **Vercel** → your project → **Settings** → **Domains**.
2. **Production domain** (e.g. `sahiwellness.com`):
   - If already added, skip. Otherwise add it (e.g. `sahiwellness.com` and `www.sahiwellness.com`).
3. **Pre-production domain** (e.g. subdomain):
   - Add **`dev.sahiwellness.com`** (or `staging.sahiwellness.com`, `preview.sahiwellness.com` — your choice).
   - Click **Add**.

### 3. Assign each domain to a Git branch

1. On the **Domains** page, each domain has a **Git Branch** (or “Branch”) setting.
2. **Production domain** (`sahiwellness.com` / `www.sahiwellness.com`):
   - Click the domain row or the **Edit** (pencil) icon.
   - Set **Git Branch** to **`main`**.
   - Save. Only deployments from `main` will serve this domain.
3. **Pre-production domain** (`dev.sahiwellness.com`):
   - Set **Git Branch** to **`dev`**.
   - Save. Only deployments from `dev` will serve this domain.

### 4. DNS for the pre-production subdomain

In **Namecheap** → **Advanced DNS** for `sahiwellness.com`:

- Add a **CNAME** record:
  - **Host:** `dev` (so it’s `dev.sahiwellness.com`).
  - **Value:** `cname.vercel-dns.com` (or the CNAME target Vercel shows for `dev.sahiwellness.com`).
  - TTL: Automatic. Save.

Wait a few minutes; Vercel will show the domain as valid when DNS is correct.

### 5. Result

| Branch | Domain (example)        | When it updates        |
|--------|-------------------------|-------------------------|
| **main** | `sahiwellness.com`, `www.sahiwellness.com` | When you push to **main** |
| **dev**  | `dev.sahiwellness.com`  | When you push to **dev**  |

- **Production:** push to `main` → only production domain changes.
- **Pre-production:** push to `dev` → only pre-production domain changes.

### 6. Environment variables (optional)

- For **production** you may want **Production** env only (e.g. `NEXT_PUBLIC_SITE_URL=https://sahiwellness.com`).
- For **pre-production** you can set **Preview** env (e.g. `NEXT_PUBLIC_SITE_URL=https://dev.sahiwellness.com`) so links and SEO use the right URL per environment.

In **Settings** → **Environment Variables**, when adding a variable you can choose **Production**, **Preview**, or **Development**. Use **Preview** for values that should apply to `dev` (and other preview deployments).

---

## 3. Other hosting options

- **Netlify**  
  [netlify.com](https://netlify.com) → Connect GitHub repo, build command: `npm run build`, publish directory: `.next` (use **Next.js runtime** so it runs `next start` or their Next.js plugin).

- **Cloudflare Pages**  
  [pages.cloudflare.com](https://pages.cloudflare.com) → Connect repo, framework: **Next.js**, build: `npm run build`. Set `NEXT_PUBLIC_SITE_URL` to your Cloudflare Pages URL or custom domain.

- **Railway / Render / Fly.io**  
  Use **Docker** or **Node** environment: install deps, `npm run build`, then run `npm start` and expose the port (usually 3000). Set `NEXT_PUBLIC_SITE_URL` to your final site URL.

---

## 4. SEO checklist (already done in this project)

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

## 5. Quick reference: env vars

| Variable                  | Required | Purpose                          |
|---------------------------|----------|----------------------------------|
| `SMTP_HOST`               | Yes*     | Send contact form emails         |
| `SMTP_PORT`               | Yes*     | Usually 587                      |
| `SMTP_USER`               | Yes*     | SMTP login                       |
| `SMTP_PASS`               | Yes*     | SMTP password / app password     |
| `NEXT_PUBLIC_SITE_URL`    | Strongly recommended | SEO, sitemap, OG, canonical |
| `SMTP_FROM` / `CONTACT_TO`| No       | Optional sender/recipient        |

\* Required only if you want the contact form to send email.

---

## 6. Troubleshooting

### Error: `routes-manifest.json` couldn't be found

If the build fails with:

```text
The file ".../public/routes-manifest.json" couldn't be found.
```

Vercel is looking for the build in the wrong place (e.g. `public` instead of Next.js’s `.next`). There is often **no “Output Directory”** in the UI for Next.js projects.

**Fix 1: Clear cache and redeploy**

1. **Vercel** → your project → **Deployments**.
2. Open the **⋯** menu on the latest deployment.
3. Click **Redeploy**.
4. Turn **on** “Clear build cache” (or “Redeploy with clean cache”).
5. Confirm. This forces a fresh build and can clear an old wrong output path.

**Fix 2: Make sure the project is Next.js**

1. **Settings** → **General**.
2. Under **Framework Preset**, ensure it says **Next.js**. If it says “Other” or something else, change it to **Next.js** and save.
3. **Redeploy** again (with “Clear build cache” if possible).

**Fix 3: Re-import the project**

If it still fails, create a new project:

1. **Add New** → **Project** → select the same GitHub repo.
2. Set **Framework Preset** to **Next.js**, **Root Directory** to **.** (or leave empty).
3. Do **not** set any custom “Output Directory” (leave it blank if you see it).
4. Deploy. You can delete the old project after the new one works.
