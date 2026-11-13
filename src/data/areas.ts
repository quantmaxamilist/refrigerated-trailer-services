// Area pages. The nine city pages exist on the old site and keep their exact addresses and wording.
// The local pages are new: South Wales and the surrounding area, written from RTS's own facts plus the road in.
export const oldCities = ['Bristol', 'Newcastle', 'Leeds', 'Manchester', 'Birmingham', 'Liverpool', 'Sheffield', 'Leicester', 'York'];
export const cityPath = (c: string) => `/refrigerated-trucks-for-sale-in-${c.toLowerCase()}`;

export interface Local { name: string; slug: string; county: string; road: string }
export const locals: Local[] = [
  { name: 'Merthyr Tydfil', slug: 'merthyr-tydfil', county: 'Merthyr Tydfil', road: 'Our yard is in Pentrebach, on the Merthyr Tydfil Industrial Estate, just off the A4060 and the A470.' },
  { name: 'Cardiff', slug: 'cardiff', county: 'Cardiff', road: 'Cardiff is straight down the A470 from our yard in Pentrebach.' },
  { name: 'Newport', slug: 'newport', county: 'Newport', road: 'Newport is reached from our yard in Pentrebach via the A470 and the M4.' },
  { name: 'Swansea', slug: 'swansea', county: 'Swansea', road: 'Swansea is reached from our yard in Pentrebach along the A465 Heads of the Valleys road and the M4.' },
  { name: 'Bridgend', slug: 'bridgend', county: 'Bridgend', road: 'Bridgend is reached from our yard in Pentrebach via the A470 and the M4.' },
  { name: 'Pontypridd', slug: 'pontypridd', county: 'Rhondda Cynon Taf', road: 'Pontypridd sits on the A470 between our yard in Pentrebach and Cardiff.' },
  { name: 'Aberdare', slug: 'aberdare', county: 'Rhondda Cynon Taf', road: 'Aberdare is in the Cynon Valley, the next valley over from our yard in Pentrebach.' },
  { name: 'Caerphilly', slug: 'caerphilly', county: 'Caerphilly', road: 'Caerphilly is reached from our yard in Pentrebach via the A470 and the A468.' },
  { name: 'Ebbw Vale', slug: 'ebbw-vale', county: 'Blaenau Gwent', road: 'Ebbw Vale is east of our yard in Pentrebach along the A465 Heads of the Valleys road.' },
  { name: 'Abergavenny', slug: 'abergavenny', county: 'Monmouthshire', road: 'Abergavenny is at the eastern end of the A465 Heads of the Valleys road, which passes close to our yard in Pentrebach.' },
  { name: 'Neath', slug: 'neath', county: 'Neath Port Talbot', road: 'Neath is at the western end of the A465 Heads of the Valleys road, which passes close to our yard in Pentrebach.' },
  { name: 'Port Talbot', slug: 'port-talbot', county: 'Neath Port Talbot', road: 'Port Talbot is reached from our yard in Pentrebach via the A465 and the M4.' },
  { name: 'Brecon', slug: 'brecon', county: 'Powys', road: 'Brecon is north of our yard in Pentrebach on the A470.' },
  { name: 'Cwmbran', slug: 'cwmbran', county: 'Torfaen', road: 'Cwmbran is reached from our yard in Pentrebach via the A472 and the A4042.' },
  { name: 'Barry', slug: 'barry', county: 'Vale of Glamorgan', road: 'Barry is reached from our yard in Pentrebach via the A470 and the A4232.' },
  { name: 'Llanelli', slug: 'llanelli', county: 'Carmarthenshire', road: 'Llanelli is reached from our yard in Pentrebach via the A465 and the M4.' },
  { name: 'Carmarthen', slug: 'carmarthen', county: 'Carmarthenshire', road: 'Carmarthen is reached from our yard in Pentrebach via the A465, the M4 and the A48.' },
  { name: 'Hereford', slug: 'hereford', county: 'Herefordshire', road: 'Hereford is reached from our yard in Pentrebach along the A465 through Abergavenny.' },
  { name: 'Gloucester', slug: 'gloucester', county: 'Gloucestershire', road: 'Gloucester is reached from our yard in Pentrebach via the A465 and the A40.' },
];
export const localPath = (l: Local) => `/refrigerated-trailers-for-sale-in-${l.slug}`;
