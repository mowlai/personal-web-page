import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { site } from '../data/site';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const posts = (await getCollection('blog', (p) => !p.data.draft)).sort(
    (a, b) => +b.data.date - +a.data.date
  );

  return rss({
    title: `${site.name} — Blog`,
    description: 'Technical deep-dives, paper summaries, and case studies.',
    site: context.site ?? site.url,
    items: posts.map((p) => ({
      title: p.data.title,
      description: p.data.description,
      pubDate: p.data.date,
      link: `/blog/${p.id}/`,
      categories: [p.data.category, ...p.data.tags],
    })),
  });
}
