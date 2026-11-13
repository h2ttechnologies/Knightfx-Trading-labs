# KnightFX Trading Labs

A responsive trading education website for KnightFX Trading Labs. The public site uses the supplied brand logo and Hareesh portrait, includes editable course and market content, and keeps partner and evidence claims unpublished until verified.

## Run locally

```bash
npm install
npm run dev
```

## Supabase setup

1. Copy `.env.example` to `.env.local` and set the public site URL, Supabase project URL, and anon key.
2. Apply [`supabase/schema.sql`](supabase/schema.sql) in the Supabase SQL editor.
3. Set `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` on the server deployment only. The service-role key is used by the contact route and must never use a `NEXT_PUBLIC_` prefix.
4. Create an administrator account in Supabase Auth. Assign `app_metadata.role = "admin"` with a trusted Supabase Admin API operation. Do not grant admin through user-editable metadata.
5. Visit `/admin` and sign in. Supabase row-level security checks the admin role for database writes and media uploads.

The admin workspace manages course outlines, market posts, verified evidence, partners, public site settings, contact submissions, and uploaded media. Public pages read published records from Supabase and use the local editable content in [`src/lib/content.ts`](src/lib/content.ts) when no public content is configured. Results require both `verified` and `published`; partner cards only show records with active status.

Contact form success is returned only after a database insert succeeds. If the Supabase server credentials or `contact_submissions` table are unavailable, the form reports that the message was not sent.

## Content safety

- Market room seed posts are labeled demonstration content and contain no live prices or trading calls.
- No payout evidence, partner relationships, discount codes, community sizes, testimonials or performance statistics are invented.
- Add verified social destinations under the public `social_links` setting. Add mentor overrides under `mentor_profile`.
- The metadata, sitemap and robots.txt default to `https://knightfxtradinglabs.vercel.app`. Set `NEXT_PUBLIC_SITE_URL` to your custom domain in the deployment environment if the production domain changes.
- Review the privacy and terms drafts and add the actual business identity and contact details before publishing.

## Stack

Next.js App Router, React, TypeScript, Tailwind CSS, Framer Motion, GSAP + ScrollTrigger, Lenis, Lucide, and optional Supabase Auth, PostgreSQL and Storage.
