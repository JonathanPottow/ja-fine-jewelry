# JAFJ website (jafinejewelry.com)

Next.js 14 (app router) on Vercel. Brand: cream/bottle green/gold (rebranded Oct 26 2026; logo in public/brand), Cormorant Garamond + Jost (see app/globals.css and jonathan_alistair_brand_palette.pdf). Tone: warm, private, bespoke, never salesy.

## Contact and chat
- Inquiries: app/ContactForm.tsx (homepage) and app/contact/ContactPageClient.tsx -> POST /api/contact -> Resend email to jonathan@jafinejewelry.com plus a confirmation to the visitor. Topics live in lib/inquiryTopics.ts.
- Live chat: HubSpot chatflow (account 247775647, loaded in components/HubSpotChat.tsx). Jonathan answers from the HubSpot phone app. No AI chatbot: Jonathan does not want one.
- Services: bespoke engagement rings and wedding bands (main focus), anniversary/gift pieces, heirloom redesigns, fine watches, private sourcing. Jonathan does NOT offer repairs, resizing, cleaning or appraisals. Position him as a private jeweler and expert, not the person physically making pieces.

## Client portal: removed
The /portal client area was removed on 2026-11-24 at Jonathan's request (no client accounts). Old links redirect home. The original portal code is in git history (before commit 72ea50c); do not rebuild it unless he asks.

## Rules
- Keep every client-facing string warm and plain. No exclamation-point spam, no emojis in emails.
- Never write to HubSpot without Jonathan's explicit approval.
- Every push to main goes live. Run `npx next build` first and get Jonathan's OK.
