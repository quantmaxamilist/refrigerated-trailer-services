import raw from './stock.json';
import { makes } from './site';

export interface Trailer {
  id: string; slug: string; path: string; isNew: boolean; title: string; ref: string; summary: string; price: string; description: string;
  specs: Record<string, Record<string, string>>; photos: { f: string; w: number; h: number }[]; card: string;
  year: string; make: string; makeSlug: string; makeName: string; model: string; temp: 'Mono' | 'Multi' | 'Mono or Multi';
  features: string[]; fridge: string; hours: string; mot: string; tyres: string; axles: string;
}
const cleanSlug = (s: string) => s.replace(/&/g, 'and');
function features(d: string): string[] {
  const parts = d.split(/\s+-\s+/).map((x) => x.trim()).filter(Boolean);
  const out: string[] = [];
  for (let i = 0; i < parts.length; i++) {
    if (parts[i] === 'Bi' && parts[i + 1]) { out.push('Bi-' + parts[i + 1]); i++; } else out.push(parts[i].replace(/\s*-$/, ''));
  }
  return out;
}
export const stock: Trailer[] = (raw as any[]).map((s) => {
  const d = s.specs?.Details || {}; const c = s.specs?.Condition || {}; const cf = s.specs?.Configuration || {};
  const f = features(s.description || '');
  const hours = (s.description.match(/Engine Hours:?\s*([\d,]+)/i) || [])[1] || '';
  const fridge = f.find((x) => /thermo king|carrier|\bTK\b|frigoblock/i.test(x) && !/hours/i.test(x)) || '';
  const m = makes.find((k) => k.feed === d.Make);
  const model = d.Model || '';
  return {
    id: s.id, slug: cleanSlug(s.slug), path: `/detail/${s.id}/${cleanSlug(s.slug)}`, isNew: s.new, title: s.title, ref: s.ref, summary: s.summary, price: s.price || 'POA', description: s.description,
    specs: s.specs, photos: s.photos, card: s.card, year: d.Year || '', make: d.Make || '', makeSlug: m?.slug || '', makeName: m?.name || d.Make || '', model,
    temp: /mono or multi/i.test(model) ? 'Mono or Multi' : /multi|\bMT\b/i.test(model) ? 'Multi' : 'Mono',
    features: f.map((x) => x.replace(/^engine hours:?\s*[\d,]+\s*-?\s*/i, '').trim()).filter(Boolean), fridge, hours, mot: d['MOT Expires'] || '', tyres: c['Tyre Condition'] || '', axles: cf['Trailer Axles'] || '',
  };
});
export const newStock = stock.filter((s) => s.isNew);
export const usedStock = stock.filter((s) => !s.isNew);
export const byId = (id: string) => stock.find((s) => s.id === id);
// "2022 CHEREAU Multi Temperature" reads better with the maker in normal case; the words are unchanged
export const niceTitle = (t: Trailer) => t.title.replace(t.make, t.makeName);
