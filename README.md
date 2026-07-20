# Edmonds Barber Shop

Marketing + booking website for Edmonds Barber Shop. Next.js (App Router) frontend
with a serverless API route that emails booking requests — no database.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Before this goes live — placeholder checklist

All real business content lives in a small number of files so it's easy to swap in:

- **Logo** — replace `public/logo-placeholder.svg` with your real logo (update the
  filename in `lib/business-info.ts` → `logoSrc` if you change the file name).
- **Business story, tagline, address, phone, email, Facebook, Instagram** — all in
  `lib/business-info.ts`, each marked `TODO`.
- **Gallery photos** — drop images into `public/gallery/` and update the list in
  `lib/gallery.ts` (remove the placeholder entries).
- **Service pricing** — already filled in at `lib/services.ts`; edit there if prices
  change (this file also drives the booking modal, so it only needs to change once).

## Email setup (Resend)

Booking submissions are emailed via [Resend](https://resend.com) from the
`/api/book` serverless route — nothing is stored in a database.

1. Create a free Resend account and an API key.
2. Verify your real domain in Resend (Domains → Add Domain) so you can send from an
   address like `booking@edmondsbarbershop.com`. Until a domain is verified, sending
   to arbitrary customer/owner addresses will fail — this is a Resend restriction,
   not something in the code.
3. Copy `.env.local.example` to `.env.local` and fill in:
   - `RESEND_API_KEY`
   - `BOOKING_FROM_EMAIL` (must be on the verified domain)
   - `OWNER_EMAIL_1` — required, the primary recipient of every booking request.
   - `OWNER_EMAIL_2`, `OWNER_EMAIL_3` — optional; if set, they're Cc'd.
4. Restart `npm run dev` after editing `.env.local`.

When a customer submits the booking form, `/api/book`:
- Re-validates everything server-side (never trusts the client).
- Sends a single email with the booking details, addressed To `OWNER_EMAIL_1` and
  the customer's email together, Cc'ing `OWNER_EMAIL_2`/`OWNER_EMAIL_3` if configured.

## Deploying to Vercel

1. Push this repo to GitHub (or another Git provider) and import it in Vercel, or
   run `vercel` from this directory.
2. In the Vercel project settings, add the same environment variables from
   `.env.local` (Settings → Environment Variables).
3. Deploy. `app/api/book/route.ts` automatically becomes a serverless function —
   no extra configuration needed.

## Project structure

```
app/
  page.tsx           single-page site (Hero, About, Services, Gallery, Hours, Footer)
  api/book/route.ts  serverless booking endpoint (validates + sends email)
components/          page sections + BookingModal/BookNowButton/BookingProvider
lib/
  business-info.ts   placeholder business details (name, story, contact, hours)
  services.ts        service list + pricing (shared by Services section + modal)
  gallery.ts          gallery image list
  timeSlots.ts        business-hours + 30-min slot generation/validation
  validation.ts        email/US-phone validation + formatting
  email.ts             Resend email sending + templates
```
