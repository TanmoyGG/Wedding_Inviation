# Platform 3 Wedding Invitation

Modern, interactive, mobile-responsive wedding invitation built with Next.js App Router, Tailwind CSS, and Framer Motion.

## Couple

- Groom: Partha Saha
- Bride: Trisa Das

## Dynamic Routes

- `/invite/wedding` - Wedding details only
- `/invite/reception` - Reception details only
- `/invite/both` - Combined timeline with both events

## Local Development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Build Check

```bash
npm run lint
npm run build
```

## Vercel Deployment

This repository is ready for Vercel with zero extra setup:

1. Import the GitHub repo into Vercel.
2. Framework preset: `Next.js` (auto-detected).
3. Build command: `npm run build`.
4. Output directory: `.next` (managed by Vercel automatically).
