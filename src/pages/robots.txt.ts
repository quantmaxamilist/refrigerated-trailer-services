import type { APIRoute } from 'astro';
import { SITE } from '../data/site';
// The old site blocked AI search crawlers. They are welcome here so RTS can appear in AI answers.
export const GET: APIRoute = () => new Response(`User-agent: *\nAllow: /\nDisallow: /thanks\n\nUser-agent: GPTBot\nAllow: /\nUser-agent: OAI-SearchBot\nAllow: /\nUser-agent: ChatGPT-User\nAllow: /\nUser-agent: ClaudeBot\nAllow: /\nUser-agent: Claude-SearchBot\nAllow: /\nUser-agent: PerplexityBot\nAllow: /\nUser-agent: Google-Extended\nAllow: /\n\nSitemap: ${SITE}/sitemap.xml\n`, { headers: { 'Content-Type': 'text/plain' } });
