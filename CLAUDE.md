# JAFJ website (jafinejewelry.com)

Next.js 14 (app router) on Vercel. Brand: cream/navy/gold, Cormorant Garamond + Jost (see app/globals.css and jonathan_alistair_brand_palette.pdf). Tone: warm, private, bespoke, never salesy.

## Client portal (/portal) — hidden, unlinked, noindex
Private client area for Jonathan Alistair Fine Jewelry clients. Passwordless: email magic link, then a 7-day signed cookie.
- Login: app/portal/login/page.tsx -> POST /api/portal/login -> emails a 15-minute link (Resend) -> /api/portal/verify sets the cookie.
- Data: read live from HubSpot via lib/portal/hubspot.ts (private app token) on every page load, so stage and field changes in HubSpot show to the client on their next visit. Writes: addDealNote (client responses) and updateStudioDeal (owner studio); see Rules. A client sees only deals associated with their contact. Stage ids map to the 7 client-facing steps in STAGE_STEP.
- Deal fields used: dealname, dealstage, piece, hs_next_step, job_due_date, quoted_amount, paid_amount, owed_amount, plus portal_cad_urls (https image links), portal_quote_url, portal_message.
- Approve / Request changes: POST /api/portal/respond emails jonathan@jafinejewelry.com (reply-to = client) and adds a note to the HubSpot deal and contact. Needs the private app to have note write access.
- Env vars (Vercel, all environments): HUBSPOT_PRIVATE_APP_TOKEN, PORTAL_SECRET (32+ chars), RESEND_API_KEY, BLOB_READ_WRITE_TOKEN. NEVER commit or print secret values.
- Test client: jonathanpottow@gmail.com (HubSpot deal "Engagement ring new test").
- Studio (/portal/studio): owner-only page for Jonathan (OWNER_EMAILS in lib/portal/session.ts). Same magic-link login; owners land in the studio. Lists open deals, and per deal sets stage, portal message, next step, CAD images and quote link, then optionally emails the client. "View as client" renders the client page in preview mode (review buttons send nothing).
- CAD uploads go to Vercel Blob (public, random-suffixed URLs) via /api/portal/studio/upload. Needs the BLOB_READ_WRITE_TOKEN env var, created by connecting a Blob store to the project in Vercel.
- Styling: app/portal/portal.module.css. The goal is to make it feel cute, fun and high-end for clients reviewing their piece.

## Rules
- Do not link the portal from the public nav or sitemap until Jonathan says so.
- Keep every client-facing string warm and plain. No exclamation-point spam, no emojis in emails.
- Never write to HubSpot from the portal without Jonathan's explicit approval of the feature.
  - Approved 2026-10-25: the respond route may create a note on the deal and contact when a client approves or requests changes. Notes only from the client side.
  - Approved 2026-10-25: the owner studio may change dealstage, portal_message, hs_next_step, portal_cad_urls and portal_quote_url, and email the client when Jonathan sends an update. No other deal fields (amounts, dates, owner) are written.
- Preview deployments are behind Vercel login; test magic links in a browser signed in to Vercel.
