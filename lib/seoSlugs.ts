export const SEO_SLUGS = [
  { slug: '10-trieu', gross: 10_000_000 },
  { slug: '15-trieu', gross: 15_000_000 },
  { slug: '20-trieu', gross: 20_000_000 },
  { slug: '25-trieu', gross: 25_000_000 },
  { slug: '30-trieu', gross: 30_000_000 },
  { slug: '40-trieu', gross: 40_000_000 },
  { slug: '50-trieu', gross: 50_000_000 },
] as const
export type SeoSlug = typeof SEO_SLUGS[number]['slug']
export const findSeoSlug = (s: string) => SEO_SLUGS.find(x => x.slug === s)
