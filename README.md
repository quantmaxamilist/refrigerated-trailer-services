# Refrigerated Trailer Services (RTS)

Rebuild of refrigeratedtrailerservices.co.uk. Astro static site, plain CSS tokens, GSAP + Lenis, three.js for the one 3D moment on the homepage.

```
npm install
npm run dev      # http://localhost:4391
npm run build    # output in dist/
```

## Where things live
- `src/data/content.json` holds the old site's copy WORD FOR WORD (generated from the crawl). Do not reword it there.
- `src/data/site.ts` holds contact details, Google links, navigation and the Web3Forms key.
- `src/data/stock.json` holds the 24 trailers that were on the old site on 13 Nov 2026, with full specs. Photos are in `public/stock/<id>/`.
- `src/data/areas.ts` holds the area pages: the nine city pages from the old site (same addresses) and the new South Wales pages.
- `src/scripts/fleet.ts` + `src/components/Fleet.astro` are the 3D moment (one trailer becomes a line of 300). The stills shown when motion is reduced or WebGL is missing are `public/img/fleet-poster.webp` and `fleet-poster-sq.webp`.
- `public/video/line-1080.mp4` is RTS's own drone film, untouched 1080p stream (sound removed). `line-720.mp4` is the phone version.
- `media-originals/` keeps both films from the old site at their original quality. It is not deployed.
- `vercel.json` holds a permanent redirect for every old address that changed, and keeps any `vercel.app` address out of Google. `public/_redirects` is the same list for hosts that read that file.

## Before it goes live
1. **Web3Forms key**: RTS needs its own key tied to its inbox. Put it in `WEB3FORMS_KEY` in `src/data/site.ts`. Until then every form says it is not connected and shows the phone number.
2. **Stock feed**: the old site pulled stock live from Dealer Manager (dealer DM13411). This build is a snapshot. Decide how stock is kept up to date before switching the domain.
3. **Logo**: the only logo file on the old site is 288x90px. Ask RTS for the original artwork.
4. **Analytics**: the old site ran Google Analytics (G-S9KM3BZJRK). None is loaded here. If RTS wants it, it needs a cookie consent banner first.
5. **"Over 300" wording**: the home page description (kept from the old site for SEO) says "Over 300 Refrigerated Trailers"; the showroom has 24. RTS should confirm the wording.
6. **Do not point the real domain at Vercel until RTS has approved it.**
