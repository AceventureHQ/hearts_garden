This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Vercel Deployment

This repository is a small monorepo-style layout with the Next.js app inside `frontend/`.

When you create the Vercel project, set the Root Directory to `frontend`. If Vercel points at the repository root instead, it will not find the Next.js app and you can end up with a 404.

Recommended settings:

- Root Directory: `frontend`
- Build Command: `npm run build`
- Install Command: `npm install`
- Output Directory: leave default for Next.js

## Supabase & Resend Setup

The app now has browser and server Supabase client helpers ready for later backend work.

.env.local
1. Add the values from your Supabase project dashboard.
2. In Vercel, add the same environment variables under Project Settings -> Environment Variables.
3. Set `RESEND_API_KEY` from your Resend dashboard.
4. Add a sender address later if you want to send confirmation or launch emails.

Required variable for the current signup flow:

- `RESEND_API_KEY`

Optional variables for later email sending and Supabase work:

- `RESEND_FROM_EMAIL`
- `RESEND_NOTIFICATION_EMAIL`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

Optional server-only variable for later admin access:

- `SUPABASE_SERVICE_ROLE_KEY`

Use `lib/supabase/browser.ts` in client components and `lib/supabase/server.ts` in server code.
The signup form posts to `/api/waitlist`, which stores each address in Resend as a contact.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
