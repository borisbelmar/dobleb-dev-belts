import { getCollection } from 'astro:content';
import type { APIRoute } from 'astro';

const site = 'https://dev-belts.dobleb.cl';

export const GET: APIRoute = async () => {
  const [guides, glossaryEntries] = await Promise.all([
    getCollection('guides'),
    getCollection('glossary'),
  ]);

  const staticRoutes = [
    { loc: '/', priority: '1.0' },
    { loc: '/glossary', priority: '0.8' },
  ];

  const beltRoutes = ['white-belt', 'yellow-belt', 'green-belt', 'black-belt'].map(
    (belt) => ({
      loc: `/${belt}`,
      priority: '0.9',
    }),
  );

  const guideRoutes = guides
    .filter((g) => g.data.published !== false)
    .map((guide) => ({
      loc: `/guides/${guide.id}`,
      priority: '0.7',
    }));

  const glossaryRoutes = glossaryEntries.map((entry) => ({
    loc: `/glossary/${entry.id}`,
    priority: '0.6',
  }));

  const allTags = new Set<string>();
  for (const guide of guides) {
    for (const tag of guide.data.tags) {
      allTags.add(tag);
    }
  }
  const tagRoutes = [...allTags].map((tag) => ({
    loc: `/tag/${tag}`,
    priority: '0.5',
  }));

  const allRoutes = [...staticRoutes, ...beltRoutes, ...guideRoutes, ...glossaryRoutes, ...tagRoutes];

  const urlset = allRoutes
    .map(
      (route) => `  <url>
    <loc>${site}${route.loc}</loc>
    <priority>${route.priority}</priority>
  </url>`,
    )
    .join('\n');

  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlset}
</urlset>`,
    {
      headers: { 'Content-Type': 'application/xml' },
    },
  );
};
