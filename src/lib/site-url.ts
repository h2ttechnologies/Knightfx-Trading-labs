const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim().replace(/\/$/, "");

export const siteUrl = configuredSiteUrl || "https://knightfxtradinglabs.vercel.app";
