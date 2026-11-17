import { useEffect } from "react";

export const SITE_URL = "https://www.saifcodes.in";
const SITE_NAME = "Saif Tandel";
const DEFAULT_IMAGE = `${SITE_URL}/og-image.png`;

const upsert = (selector, create) => {
  let el = document.head.querySelector(selector);
  if (!el) {
    el = create();
    document.head.appendChild(el);
  }
  return el;
};

const setMeta = (attr, key, content) => {
  if (!content) return;
  upsert(`meta[${attr}="${key}"]`, () => {
    const el = document.createElement("meta");
    el.setAttribute(attr, key);
    return el;
  }).setAttribute("content", content);
};

/**
 * Per-route SEO. index.html ships static title / description / canonical /
 * Open Graph tags for the home page (so they exist before JS runs); this
 * component updates those same tags in place on every route, which avoids the
 * duplicate <title>/<meta> elements that hoisting new tags next to the static
 * ones would create.
 */
const Seo = ({ title, description, path = "/", type = "website", image, noindex = false, jsonLd }) => {
  useEffect(() => {
    const url = `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;

    if (title) document.title = title;
    setMeta("name", "description", description);
    setMeta("name", "robots", noindex ? "noindex, nofollow" : "index, follow");

    upsert('link[rel="canonical"]', () => {
      const el = document.createElement("link");
      el.setAttribute("rel", "canonical");
      return el;
    }).setAttribute("href", url);

    setMeta("property", "og:type", type);
    setMeta("property", "og:url", url);
    setMeta("property", "og:site_name", SITE_NAME);
    setMeta("property", "og:title", title);
    setMeta("property", "og:description", description);
    setMeta("name", "twitter:title", title);
    setMeta("name", "twitter:description", description);
    setMeta("property", "og:image", image || DEFAULT_IMAGE);
    setMeta("name", "twitter:image", image || DEFAULT_IMAGE);
  }, [title, description, path, type, image, noindex]);

  if (!jsonLd) return null;
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
    />
  );
};

export default Seo;
