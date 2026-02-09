# Email Configuration Guide

Steps to configure email for the Dr. Sahi contact form.

---

## Option 1: Gmail (Free, Simple)

### Step 1: Enable 2-Step Verification

1. Go to [Google Account Security](https://myaccount.google.com/security)
2. Under "How you sign in to Google", click **2-Step Verification**
3. Follow the prompts to enable it

### Step 2: Create an App Password

1. Go to [App Passwords](https://myaccount.google.com/apppasswords)
2. Select app: **Mail**
3. Select device: **Other (Custom name)** → type "Dr Sahi Website"
4. Click **Generate**
5. Copy the 16-character password (e.g. `abcd efgh ijkl mnop`)

### Step 3: Create `.env` file

1. In the project root (`d:\sahi`), copy the example file:
   ```
   copy .env.example .env
   ```

2. Open `.env` in a text editor and fill in:

   ```
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_SECURE=false
   SMTP_USER=your-gmail@gmail.com
   SMTP_PASS=xxxx xxxx xxxx xxxx
   SMTP_FROM=your-gmail@gmail.com
   CONTACT_TO=contact@drsahiwellness.com
   PORT=3000
   ```

   Replace:
   - `your-gmail@gmail.com` → your Gmail address
   - `xxxx xxxx xxxx xxxx` → the 16-character App Password (no spaces)
   - `contact@drsahiwellness.com` → email where you want to receive inquiries

### Step 4: Run the server

```bash
npm start
```

Visit `http://localhost:3000`, fill the contact form, and submit to test.

---

## Option 2: Resend (Free Tier – 3,000 emails/month)

### Step 1: Create account

1. Go to [resend.com](https://resend.com)
2. Sign up for a free account

### Step 2: Get API key

1. In Resend dashboard, go to **API Keys**
2. Click **Create API Key**
3. Copy the key (starts with `re_`)

### Step 3: Verify your domain (or use Resend's domain)

- For testing: use `onboarding@resend.dev` as sender
- For production: add and verify your domain in Resend

### Step 4: Update `.env`

```
SMTP_HOST=smtp.resend.com
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=resend
SMTP_PASS=re_your_api_key_here
SMTP_FROM=onboarding@resend.dev
CONTACT_TO=contact@drsahiwellness.com
PORT=3000
```

Replace `re_your_api_key_here` with your actual Resend API key.

---

## Option 3: Outlook / Microsoft 365

### Step 1: Get credentials

- Use your Outlook/Hotmail email
- Or your Microsoft 365 work email

### Step 2: Create App Password (if 2FA is enabled)

1. Go to [Microsoft Account Security](https://account.microsoft.com/security)
2. Under "Security basics" → **Advanced security options**
3. Create an **App password**
4. Copy the generated password

### Step 3: `.env` for Outlook

```
SMTP_HOST=smtp-mail.outlook.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@outlook.com
SMTP_PASS=your-app-password
SMTP_FROM=your-email@outlook.com
CONTACT_TO=contact@drsahiwellness.com
PORT=3000
```

---

## Deployment (Vercel)

This project uses a Vercel serverless function at `api/contact.js` for the contact form.

### Add Environment Variables in Vercel

1. Go to [Vercel Dashboard](https://vercel.com/dashboard) → your project
2. **Settings** → **Environment Variables**
3. Add each variable (for Production, Preview, and Development):

| Name        | Value                      |
|-------------|----------------------------|
| SMTP_HOST   | smtp.gmail.com             |
| SMTP_PORT   | 587                        |
| SMTP_SECURE | false                      |
| SMTP_USER   | your-gmail@gmail.com       |
| SMTP_PASS   | your-app-password          |
| SMTP_FROM   | your-gmail@gmail.com       |
| CONTACT_TO  | contact@drsahiwellness.com |

4. **Redeploy** the project after adding variables (Deployments → ⋮ → Redeploy)

---

## Troubleshooting

| Issue | Fix |
|-------|-----|
| "Invalid login" | Use App Password, not normal password (Gmail/Outlook) |
| "Connection timeout" | Check SMTP_PORT (587 for TLS, 465 for SSL) |
| Emails not received | Check spam folder; verify CONTACT_TO is correct |
| "Self signed certificate" | Set SMTP_SECURE=false for port 587 |

---

## Quick test

After configuring, run:

```bash
npm start
```

Submit the contact form at `http://localhost:3000/#contact`. You should receive an email at the `CONTACT_TO` address.
