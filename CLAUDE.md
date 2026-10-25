# JAFJ website (jafinejewelry.com)

Next.js 14 (app router) on Vercel. Brand: cream/navy/gold, Cormorant Garamond + Jost (see app/globals.css and jonathan_alistair_brand_palette.pdf). Tone: warm, private, bespoke, never salesy.

## Client portal (/portal) — hidden, unlinked, noindex
Private client area for Jonathan Alistair Fine Jewelry clients. Passwordless: email magic link, then a 7-day signed cookie.
- Login: app/portal/login/page.tsx -> POST /api/portal/login -> emails a 15-minute link (Resend) -> /api/portal/verify sets the cookie.
- Data: read-only from HubSpot via lib/portal/hubspot.ts (private app token). A client sees only deals associated with their contact. Stage ids map to the 7 client-facing steps in STAGE_STEP.
- Deal fields used: dealname, dealstage, piece, hs_next_step, job_due_date, quoted_amount, paid_amount, owed_amount, plus portal_cad_urls (https image links), portal_quote_url, portal_message.
- Approve / Request changes: POST /api/portal/respond emails jonathan@jafinejewelry.com (reply-to = client).
- Env vars (Vercel, all environments): HUBSPOT_PRIVATE_APP_TOKEN, PORTAL_SECRET (32+ chars), RESEND_API_KEY. NEVER commit or print secret values.
- Test client: jonathanpottow@gmail.com (HubSpot deal "Engagement ring new test").
- Styling: app/portal/portal.module.css. The goal is to make it feel cute, fun and high-end for clients reviewing their piece.

## Rules
- Do not link the portal from the public nav or sitemap until Jonathan says so.
- Keep every client-facing string warm and plain. No exclamation-point spam, no emojis in emails.
- Never write to HubSpot from the portal without Jonathan's explicit approval of the feature.
- Preview deployments are behind Vercel login; test magic links in a browser signed in to Vercel.
