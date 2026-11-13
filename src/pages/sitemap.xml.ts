import type { APIRoute } from 'astro';
import { SITE, makes } from '../data/site';
import { stock } from '../data/stock';
import { oldCities, cityPath, locals, localPath } from '../data/areas';
export const GET: APIRoute = () => {
  const today = new Date().toISOString().slice(0, 10);
  const urls: [string, string][] = [
    ['/', '1.0'], ['/showroom', '0.9'], ['/new-trailers', '0.9'], ['/used-trailers', '0.9'], ['/used-fridges', '0.8'], ['/parts', '0.8'], ['/trailer-export', '0.8'], ['/finance', '0.8'], ['/sell-your-trailer', '0.8'],
    ['/about', '0.7'], ['/contact', '0.8'], ['/reviews', '0.5'], ['/enquiry', '0.4'], ['/part-exchange', '0.4'], ['/areas', '0.6'], ['/terms', '0.2'], ['/privacy', '0.2'], ['/sitemap', '0.2'],
    ...makes.map((m) => [`/used-trailers/${m.slug}`, '0.7'] as [string, string]),
    ...stock.map((t) => [t.path, '0.8'] as [string, string]),
    ...oldCities.map((c) => [cityPath(c), '0.6'] as [string, string]),
    ...locals.map((l) => [localPath(l), '0.6'] as [string, string]),
  ];
  const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map(([u, p]) => `  <url><loc>${SITE}${u === '/' ? '/' : u}</loc><lastmod>${today}</lastmod><priority>${p}</priority></url>`).join('\n')}\n</urlset>\n`;
  return new Response(body, { headers: { 'Content-Type': 'application/xml' } });
};
