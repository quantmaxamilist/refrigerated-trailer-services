import type { APIRoute } from 'astro';
import { SITE, brand, contact, C, services, brandsStocked } from '../data/site';
import { stock, niceTitle } from '../data/stock';
import { locals } from '../data/areas';
export const GET: APIRoute = () => {
  const body = `# ${brand.legal} (${brand.short})

> ${C.home.desc}

${C.home.intro.join(' ')}

- Based at: ${contact.address.join(', ')}, Wales, UK
- Telephone: ${contact.phone}. Mobile and WhatsApp: ${contact.mobile}. Email: ${contact.email}
- Opening hours: ${contact.hours}. Closed Saturday and Sunday.
- Formed in ${brand.founded}. Company registration number ${brand.companyNo}.
- UK agent for Lamberet: new sales, parts and service.
- Makes bought and sold: ${brandsStocked.join(', ')}.
- ${C.about.languages}.
- Areas: South Wales (${locals.map((l) => l.name).join(', ')}), the whole UK, Europe and export worldwide.

## Services
${services.map((s) => `- [${s.title}](${SITE}${s.href}): ${s.line}`).join('\n')}

## Trailers in stock
${stock.map((t) => `- [${niceTitle(t)} (${t.ref})](${SITE}${t.path}): ${t.isNew ? 'New' : 'Used'}. ${t.summary}. ${t.features.slice(0, 4).join(', ')}. Price: ${t.price}.`).join('\n')}

## Contact
- [Contact](${SITE}/contact)
- [Sell your trailer](${SITE}/sell-your-trailer)
`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
