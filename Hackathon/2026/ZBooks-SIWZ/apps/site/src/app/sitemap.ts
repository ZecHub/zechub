import type { MetadataRoute } from "next";

const BASE = "https://siwz.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${BASE}/`,             priority: 1.0, changeFrequency: "weekly" },
    { url: `${BASE}/#compat`,      priority: 0.8, changeFrequency: "monthly" },
    { url: `${BASE}/#flows`,       priority: 0.8, changeFrequency: "monthly" },
    { url: `${BASE}/#quickstart`,  priority: 0.9, changeFrequency: "weekly"  },
    { url: `${BASE}/#apps`,        priority: 0.7, changeFrequency: "monthly" },
    { url: `${BASE}/#packages`,    priority: 0.7, changeFrequency: "monthly" },
  ];
}
