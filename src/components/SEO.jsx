import { Helmet } from "react-helmet-async";

const SITE_URL = "https://dupe-scent.vercel.app";
const DEFAULT_IMAGE = `${SITE_URL}/og-image.png`;

export default function SEO({ title, description, path = "/" }) {
  const fullTitle = title
    ? `${title} — DupeScent`
    : "DupeScent — Guia de dupes de perfume";
  const url = `${SITE_URL}${path}`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />

      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={DEFAULT_IMAGE} />

      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={DEFAULT_IMAGE} />

      <link rel="canonical" href={url} />
    </Helmet>
  );
}
