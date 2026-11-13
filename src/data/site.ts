// Facts and copy for Refrigerated Trailer Services Limited.
// content.json holds the old site's copy WORD FOR WORD (generated from the crawl). Do not edit wording there.
import content from './content.json';
export const C = content;
export const SITE = 'https://www.refrigeratedtrailerservices.co.uk';

export const brand = {
  name: 'Refrigerated Trailer Services',
  legal: 'Refrigerated Trailer Services Limited',
  short: 'RTS',
  companyNo: '06662925',
  founded: 2008,
};

export const contact = {
  phone: '01685 848841',
  phoneHref: 'tel:+441685848841',
  mobile: '07553 632712',
  mobileHref: 'tel:+447553632712',
  whatsapp: 'https://api.whatsapp.com/send/?phone=447553632712',
  email: 'info@refrigeratedtrailerservices.co.uk',
  address: ['Unit D3 Valleys Enterprise Centre', 'Merthyr Tydfil Industrial Estate', 'Pentrebach', 'Merthyr Tydfil', 'CF48 4DR'],
  w3w: 'bikes.funny.couches',
  geo: { lat: 51.7200775, lng: -3.3555713 },
  hours: 'Monday to Friday 08:00-18:00',
};

// Google Business Profile (checked 13 Nov 2026: listing exists, no reviews yet)
const PLACE = 'ChIJ1aVCCmI7bkgRXhLXlnfjJAg';
export const google = {
  placeId: PLACE,
  map: `https://www.google.com/maps/place/?q=place_id:${PLACE}`,
  directions: `https://www.google.com/maps/dir/?api=1&destination=Refrigerated+Trailer+Services&destination_place_id=${PLACE}`,
  reviews: `https://search.google.com/local/reviews?placeid=${PLACE}`,
  write: `https://search.google.com/local/writereview?placeid=${PLACE}`,
};

export const social = {
  facebook: 'https://www.facebook.com/RTSrefrigeratedtrailerservices',
  // The old site also linked a personal Instagram and LinkedIn profile. Left out until RTS confirms business accounts.
};

// Web3Forms: RTS needs its own access key tied to its inbox. Replace this value once they have one.
export const WEB3FORMS_KEY = 'YOUR_WEB3FORMS_KEY';

export const makes = [
  { slug: 'lamberet', name: 'Lamberet', feed: 'LAMBERET', old: 'LAMBERET' },
  { slug: 'schmitz', name: 'Schmitz', feed: 'SCHMITZ', old: 'SCHMITZ' },
  { slug: 'chereau', name: 'Chereau', feed: 'CHEREAU', old: 'CHEREAU' },
  { slug: 'gray-and-adams', name: 'Gray & Adams', feed: 'GRAY & ADAMS', old: 'GRAY+&+ADAMS' },
  { slug: 'krone', name: 'Krone', feed: 'KRONE', old: 'KRONE' },
  { slug: 'montracon', name: 'Montracon', feed: 'MONTRACON', old: 'MONTRACON' },
];
// every make RTS names on the old site, in its order
export const brandsStocked = ['Lamberet', 'Schmitz', 'Chereau', 'Krone', 'Gray & Adams', 'Montracon', 'SDC', 'Cartwright', 'Kässbohrer'];
export const brandFile: Record<string, string> = { Lamberet: 'lamberet', Schmitz: 'schmitz', Chereau: 'chereau', Krone: 'krone', 'Gray & Adams': 'gray-and-adams', Montracon: 'montracon', SDC: 'sdc', Cartwright: 'cartwright', 'Kässbohrer': 'kassbohrer' };

export const nav = [
  { label: 'New Lamberet', href: '/new-trailers' },
  { label: 'Used trailers', href: '/used-trailers' },
  { label: 'Used fridges', href: '/used-fridges' },
  { label: 'Parts', href: '/parts' },
  { label: 'Export', href: '/trailer-export' },
  { label: 'Finance', href: '/finance' },
  { label: 'Sell your trailer', href: '/sell-your-trailer' },
  { label: 'About', href: '/about' },
];

// The seven things RTS does, each with a line lifted from its own page
export const services = [
  { key: 'new', title: 'New Lamberet trailers', href: '/new-trailers', line: C.home.intro[2], img: 'yard-pair', tick: 'New Lamberet trailers' },
  { key: 'used', title: 'Used trailers', href: '/used-trailers', line: C.usedTrailers.intro, img: 'aerial-line', tick: 'Used trailers' },
  { key: 'fridges', title: 'Used fridges', href: '/used-fridges', line: C.usedFridges.paras[0], img: 'fridge-units', tick: 'Used fridges' },
  { key: 'parts', title: 'Parts', href: '/parts', line: C.parts.desc, img: 'carrier-yard', tick: 'Parts' },
  { key: 'export', title: 'Trailer export', href: '/trailer-export', line: C.exporting.services[0][1], img: 'aerial-field', tick: 'Trailer export' },
  { key: 'finance', title: 'Finance', href: '/finance', line: C.finance.partner[0], img: 'customer-truck', tick: 'Finance' },
  { key: 'sell', title: 'Sell your trailer', href: '/sell-your-trailer', line: C.sell.tagline, img: 'side-orange', tick: 'Selling a trailer' },
];
export const interests = [...services.map((s) => s.tick), 'Rental', 'Storage', 'Repair and refurbishment'];
