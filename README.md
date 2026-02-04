## Serenity Circle – Wellness & Counseling Site

A modern, animated landing page for a wellness and counseling practice, with a query form that emails inquiries to your inbox.

### Structure

- `server.js` – Node/Express server that serves the static site and exposes the `/api/contact` endpoint.
- `public/index.html` – Main single-page website layout.
- `public/styles.css` – Visual design, layout, and scroll animations.
- `public/script.js` – Scroll-triggered animations and contact form submission logic.
- `.env.example` – Example environment variables for configuring email delivery.

### Running the site locally

1. **Install dependencies**

```bash
cd d:\sahi
npm install
```

2. **Configure environment variables**

- Copy `.env.example` to `.env`.
- Fill in your SMTP provider details (host, port, username, password) and the email address you want to receive inquiries at.

3. **Start the server**

```bash
npm start
```

4. **Open the site**

- Visit `http://localhost:3000` in your browser.

### How email sending works

- The contact form sends a POST request to `/api/contact` with `name`, `email`, `topic`, and `message`.
- `server.js` uses `nodemailer` and your SMTP credentials (from `.env`) to send an email to the address specified in `CONTACT_TO`.
- If sending fails, the user sees a friendly error message and can choose to email you directly.

