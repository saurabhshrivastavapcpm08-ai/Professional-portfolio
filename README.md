# Saurabh Shrivastava — Product Manager Portfolio

Modern, motion-forward portfolio for mid-management Product Manager roles.

## Stack

- Next.js (App Router) + TypeScript + Tailwind CSS
- Motion for scroll/entrance animations
- Contact API with optional Formspree (`FORMSPREE_ENDPOINT`)

## Develop

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Content

- Resume PDF: `public/resume.pdf`
- Portrait: place your headshot at `public/images/portrait.jpg`
- Copy & metrics: `src/data/content.ts`

## Contact form

Set `FORMSPREE_ENDPOINT=https://formspree.io/f/<id>` to deliver submissions server-side.
Without it, the API returns a `mailto:` handoff to your inbox.

## Copyright

© Saurabh Shrivastava. All rights reserved.

## Deploy from `main`

This app uses **Next.js API routes** (Tara demo), so it needs a Node host — not plain GitHub Pages static hosting.

### Option A — Vercel (recommended, ~2 minutes)

1. Open [vercel.com/new](https://vercel.com/new) and import `saurabhshrivastavapcpm08-ai/Professional-portfolio`.
2. Set **Production Branch** to `main` (default).
3. Deploy — every push to `main` redeploys automatically.

No env vars are required unless you use Formspree (`FORMSPREE_ENDPOINT`).

### Option B — GitHub Actions → Vercel

Add these [repository secrets](https://github.com/saurabhshrivastavapcpm08-ai/Professional-portfolio/settings/secrets/actions):

| Secret | Where to find it |
|--------|------------------|
| `VERCEL_TOKEN` | [Vercel account tokens](https://vercel.com/account/tokens) |
| `VERCEL_ORG_ID` | Vercel project → Settings → General |
| `VERCEL_PROJECT_ID` | Same page |

Pushes to `main` run `.github/workflows/deploy-vercel.yml` (production).

### CI

Every push/PR to `main` runs `npm ci` and `npm run build` via `.github/workflows/ci.yml`.
