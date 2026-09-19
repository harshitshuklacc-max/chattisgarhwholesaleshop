import { Product } from '../types';

export const CATEGORIES = [
  { id: 'all', name: 'All Products', icon: 'Sparkles', count: 14 },
  { id: 'cold-pyro', name: 'Cold Pyro & Firing Systems', icon: 'Flame', count: 4 },
  { id: 'smoke-sfx', name: 'Smoke & Fog Machines', icon: 'CloudFog', count: 3 },
  { id: 'wedding-entry', name: 'Wedding Entry & Props', icon: 'Crown', count: 2 },
  { id: 'confetti-bubble', name: 'Confetti & Bubble Blasters', icon: 'PartyPopper', count: 2 },
  { id: 'lighting-laser', name: 'Stage DJ Lights & Lasers', icon: 'Zap', count: 3 },
] as const;

export const PRODUCTS: Product[] = [
  {
    id: 'wsc-cp-01',
    name: 'Indoor Stage Cold Pyro Sparkular Fountain (Electronic)',
    hindiName: 'इलेक्ट्रिक कोल्ड पायरो फाउंटेन (इंडोर सेफ)',
    category: 'cold-pyro',
    categoryLabel: 'Cold Pyro & Firing',
    description: '100% smokeless, non-hazardous titanium cold spark effect for wedding stages, bride-groom grand entry, and stage concerts. Safe for indoor venues with zero burn risk.',
    pricePerUnit: 1450, // Per Box of 5 pcs
    retailPrice: 2400,
    unitType: 'Box (5 Pcs)',
    minOrderQty: 3, // 3 boxes min
    packagingDetails: '5 pieces per sealed inner box | 50 pieces per Master Carton',
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&auto=format&fit=crop&q=80'
    ],
    inStock: true,
    stockCount: 420,
    featured: true,
    bestseller: true,
    specifications: {
      'Effect Height': '1 to 5 Meters adjustable',
      'Duration': '30 - 45 Seconds steady fountain',
      'Firing Method': 'Electronic ignition / 9V Battery / Wireless Cue',
      'Safety': 'Smokeless, cold to touch, no sulphur smell',
      'Origin': 'Direct Factory Import (Tested A-Grade)'
    },
    wholesaleTiers: [
      { minQty: 3, pricePerUnit: 1450, label: '3-9 Boxes (Wholesale)' },
      { minQty: 10, pricePerUnit: 1320, label: '10-24 Boxes (Bulk Dealer)' },
      { minQty: 25, pricePerUnit: 1190, label: '25+ Master Carton Rate' }
    ],
    safetyNotes: 'Certified cold pyro spark for indoor decor and stage event production.'
  },
  {
    id: 'wsc-cp-02',
    name: '12-Cue Wireless Stage Pyro Firing Machine with Remote System',
    hindiName: '12 क्यू वायरलेस रिमोट फायरिंग मशीन',
    category: 'cold-pyro',
    categoryLabel: 'Cold Pyro & Firing',
    description: 'Heavy duty professional 12-channel wireless stage firing receiver box with master remote controller. Up to 150m transmission range for synchronised wedding stage blasts.',
    pricePerUnit: 2850,
    retailPrice: 4500,
    unitType: 'Complete Set (12 Cues + Remote)',
    minOrderQty: 1,
    packagingDetails: 'Foam padded shockproof briefcase with digital testing indicator',
    image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800&auto=format&fit=crop&q=80',
    inStock: true,
    stockCount: 85,
    featured: true,
    bestseller: false,
    specifications: {
      'Channels': '12 Separate cue points with LED continuity check',
      'Range': '150-200 meters line-of-sight',
      'Battery': 'AA batteries in base + 12V 23A in transmitter',
      'Functions': 'Single fire, sequential stepping, all-fire simultaneously'
    },
    wholesaleTiers: [
      { minQty: 1, pricePerUnit: 2850, label: 'Single Set' },
      { minQty: 3, pricePerUnit: 2600, label: '3-5 Sets (Event Planner)' },
      { minQty: 10, pricePerUnit: 2350, label: '10+ Sets (Distributor)' }
    ]
  },
  {
    id: 'wsc-sm-01',
    name: 'Daylight High Density Colour Smoke Grenade / Fountain (Pack of 10)',
    hindiName: 'कलर स्मोक फाउंटेन (10 पीस पैक - 5 रंग)',
    category: 'smoke-sfx',
    categoryLabel: 'Smoke & Fog Machines',
    description: 'Rich vibrant color smoke grenades for photography, pre-wedding shoot, sports entries, and party reveals. Red, Blue, Yellow, Green, and Purple colors included.',
    pricePerUnit: 850,
    retailPrice: 1400,
    unitType: 'Pack of 10 Pcs',
    minOrderQty: 4,
    packagingDetails: '10 pieces assorted colors per shrink pack | 100 pcs per carton',
    image: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?w=800&auto=format&fit=crop&q=80',
    inStock: true,
    stockCount: 650,
    featured: true,
    bestseller: true,
    specifications: {
      'Burn Duration': '60 Seconds continuous dense cloud',
      'Pull Wire': 'Quick friction / wire ring pull ignition',
      'Non-Toxic': 'Cool-burning chemical formulation',
      'Colors': 'Red, Royal Blue, Sunny Yellow, Emerald Green, Violet'
    },
    wholesaleTiers: [
      { minQty: 4, pricePerUnit: 850, label: '4-9 Packs (Wholesale)' },
      { minQty: 10, pricePerUnit: 760, label: '10-24 Packs (Dealer)' },
      { minQty: 25, pricePerUnit: 690, label: '25+ Packs (Master Carton)' }
    ]
  },
  {
    id: 'wsc-sm-02',
    name: '3000W Heavy Low-Lying Dry Ice Cloud Fog Machine for Stage Entry',
    hindiName: '3000W ड्राई आइस स्टेज फॉग मशीन (क्लाउड इफेक्ट)',
    category: 'smoke-sfx',
    categoryLabel: 'Smoke & Fog Machines',
    description: 'Professional grade wedding stage entry low fog machine. Produces thick, ankle-height white cloud blanket that hugs the floor without rising. Essential for royal bride and groom entries.',
    pricePerUnit: 14200,
    retailPrice: 22000,
    unitType: 'Unit with Flight Case',
    minOrderQty: 1,
    packagingDetails: 'Heavy duty road flight case with 360 locking caster wheels',
    image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&auto=format&fit=crop&q=80',
    inStock: true,
    stockCount: 32,
    featured: true,
    bestseller: true,
    specifications: {
      'Power Rating': '3000W Double Element Fast Heating',
      'Warmup Time': '8-10 Minutes quick start',
      'Coverage': '250 - 300 square meters floor carpet',
      'Control': 'DMX-512 & Wireless Digital Timer Remote'
    },
    wholesaleTiers: [
      { minQty: 1, pricePerUnit: 14200, label: '1 Unit' },
      { minQty: 2, pricePerUnit: 13500, label: '2-4 Units (Rental Company)' },
      { minQty: 5, pricePerUnit: 12400, label: '5+ Units (Wholesaler)' }
    ]
  },
  {
    id: 'wsc-we-01',
    name: '360° Revolving Cold Pyro Flower Wheel Entry Mechanism (Motorised)',
    hindiName: '360 डिग्री मोटर वाली चक्र एंट्री मशीन',
    category: 'wedding-entry',
    categoryLabel: 'Wedding Entry & Props',
    description: 'Stainless steel dual-axis rotating wheel holds up to 8 cold pyros. Spins automatically with high-torque DC motor to create spectacular spinning spark wheels as couples walk in.',
    pricePerUnit: 4800,
    retailPrice: 7500,
    unitType: 'Pair (2 Units with Stands)',
    minOrderQty: 1,
    packagingDetails: 'Foldable tripod legs with industrial carry bag',
    image: 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?w=800&auto=format&fit=crop&q=80',
    inStock: true,
    stockCount: 45,
    featured: false,
    bestseller: true,
    specifications: {
      'Motor': 'Heavy duty 12V DC reversible rotation motor',
      'Pyro Slots': '8 Slots with built-in spring copper contact clamps',
      'Height': 'Adjustable from 4ft to 7.5ft',
      'Control': 'Wireless remote button activation'
    },
    wholesaleTiers: [
      { minQty: 1, pricePerUnit: 4800, label: '1 Pair' },
      { minQty: 3, pricePerUnit: 4350, label: '3-5 Pairs' },
      { minQty: 6, pricePerUnit: 3950, label: '6+ Pairs (Direct Factory)' }
    ]
  },
  {
    id: 'wsc-cb-01',
    name: 'Double Barrel Electric Confetti Cannon Blaster (Paper & Foil Blast)',
    hindiName: 'डबल बैरल इलेक्ट्रिक कंफेटी ब्लास्टर',
    category: 'confetti-bubble',
    categoryLabel: 'Confetti & Bubble Blasters',
    description: 'High pressure dual cannon stage confetti shot gun. Blasts metallic gold & silver foil, rose petals, and paper ribbons up to 12 meters into the air at grand wedding moments.',
    pricePerUnit: 3200,
    retailPrice: 5200,
    unitType: 'Piece (Dual Barrel Machine)',
    minOrderQty: 2,
    packagingDetails: 'Foam carton packing with angle adjustment bracket',
    image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&auto=format&fit=crop&q=80',
    inStock: true,
    stockCount: 90,
    featured: true,
    bestseller: false,
    specifications: {
      'Shooting Angle': '0 to 90 degrees multi-angle tilt',
      'Blast Distance': '10-14 meters high spread',
      'Compatible With': 'Standard 40cm / 60cm / 80cm electric confetti cartridges',
      'Power': 'AC 220V with Direct DMX & Remote Relay'
    },
    wholesaleTiers: [
      { minQty: 2, pricePerUnit: 3200, label: '2-4 Pieces' },
      { minQty: 5, pricePerUnit: 2950, label: '5-9 Pieces' },
      { minQty: 10, pricePerUnit: 2650, label: '10+ Pieces (Dealer)' }
    ]
  },
  {
    id: 'wsc-cb-02',
    name: 'Party Poppers (Metallic Gold / Silver / Multi) Master Carton (60 Pcs)',
    hindiName: 'पार्टी पॉपर मास्टर कार्टन (60 पीस)',
    category: 'confetti-bubble',
    categoryLabel: 'Confetti & Bubble Blasters',
    description: 'Premium Spring/Air compressed hand twist party poppers. Loaded with brilliant metallic ribbons, heart-shaped foils, and star glitter for birthday, anniversary, and reception entries.',
    pricePerUnit: 1850,
    retailPrice: 3200,
    unitType: 'Master Carton (60 Pcs - 50cm)',
    minOrderQty: 2,
    packagingDetails: 'Heavy 5-ply corrugated master carton with 60 individual shrinked poppers',
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&auto=format&fit=crop&q=80',
    inStock: true,
    stockCount: 220,
    featured: false,
    bestseller: true,
    specifications: {
      'Size': '50 cm length with high compression cylinder',
      'Fillers': 'Flame retardant metallic foil strips & streamers',
      'Reach': '6 - 8 meters burst elevation',
      'Certification': 'Safe spring mechanical mechanism'
    },
    wholesaleTiers: [
      { minQty: 2, pricePerUnit: 1850, label: '2-5 Master Cartons' },
      { minQty: 6, pricePerUnit: 1680, label: '6-14 Cartons (Shopkeeper)' },
      { minQty: 15, pricePerUnit: 1520, label: '15+ Cartons (Container Rate)' }
    ]
  },
  {
    id: 'wsc-lt-01',
    name: '54x3W RGBW High Brightness Aluminum Stage Par Light',
    hindiName: '54x3W RGBW एल्युमिनियम स्टेज पार लाइट',
    category: 'lighting-laser',
    categoryLabel: 'Stage DJ Lights & Lasers',
    description: 'Heavy duty die-cast aluminum LED stage par light with 54 ultra-bright 3W LEDs (Red, Green, Blue, White). Smooth color mixing, sound-active mode, and DMX console support.',
    pricePerUnit: 1150,
    retailPrice: 1900,
    unitType: 'Piece (Full Aluminum Body)',
    minOrderQty: 4,
    packagingDetails: 'Inner bubble packing with dual hanging brackets | 8 pcs per master carton',
    image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&auto=format&fit=crop&q=80',
    inStock: true,
    stockCount: 380,
    featured: true,
    bestseller: true,
    specifications: {
      'LED Configuration': '54 x 3 Watt (14 Red, 14 Green, 14 Blue, 12 White)',
      'Beam Angle': '25 degrees high punch focus',
      'Control Mode': 'DMX512 (8 Channels), Auto-Run, Master-Slave, Sound Active',
      'Body Material': 'Thick heat-dissipating cast aluminum housing'
    },
    wholesaleTiers: [
      { minQty: 4, pricePerUnit: 1150, label: '4-7 Pieces' },
      { minQty: 8, pricePerUnit: 1040, label: '8-23 Pieces (Box Pack)' },
      { minQty: 24, pricePerUnit: 940, label: '24+ Pieces (Wholesale Lot)' }
    ]
  },
  {
    id: 'wsc-lt-02',
    name: '260W Sharpy 9R Moving Head Beam Light with Flight Case (Pair)',
    hindiName: '260W शार्पी मूविंग हेड बीम लाइट (फ्लाइट केस के साथ)',
    category: 'lighting-laser',
    categoryLabel: 'Stage DJ Lights & Lasers',
    description: 'Ultra-bright 260W 9R lamp moving head stage beam light. Razor sharp solid beam that cuts through ambient light and haze over 150+ meters. Includes dual road case with wheels.',
    pricePerUnit: 27500,
    retailPrice: 42000,
    unitType: 'Pair (2 Lights + 1 Dual Flight Case)',
    minOrderQty: 1,
    packagingDetails: 'Heavy road-ready flight case with butterfly latches and 4 caster wheels',
    image: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=800&auto=format&fit=crop&q=80',
    inStock: true,
    stockCount: 24,
    featured: true,
    bestseller: false,
    specifications: {
      'Lamp': '260W 9R Stage Discharge Lamp (2,000 hrs life)',
      'Color Wheel': '14 colors + open white with rainbow effect',
      'Gobo Wheel': '17 fixed gobos + open white with high speed shake',
      'Prism': '8-facet + 16-facet honeycomb rotating prism stack'
    },
    wholesaleTiers: [
      { minQty: 1, pricePerUnit: 27500, label: '1 Pair with Case' },
      { minQty: 2, pricePerUnit: 25800, label: '2-4 Pairs (Sound & Light Setup)' },
      { minQty: 5, pricePerUnit: 24200, label: '5+ Pairs (Distributor Deal)' }
    ]
  },
  {
    id: 'wsc-lt-03',
    name: 'Multi-Pattern Animation RGB Laser Light (2W / 3W High Scan)',
    hindiName: 'एनीमेशन RGB लेजर लाइट (फुल कलर बीम & टेक्स्ट)',
    category: 'lighting-laser',
    categoryLabel: 'Stage DJ Lights & Lasers',
    description: 'Full color RGB scanner laser capable of creating graphic animations, 3D tunnel beam effects, wedding couple names, and sync beat shows. High speed 20Kpps galvo scanner.',
    pricePerUnit: 6800,
    retailPrice: 11500,
    unitType: 'Unit with Remote & Bracket',
    minOrderQty: 1,
    packagingDetails: 'Color retail gift box with shockproof EPS foam',
    image: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=800&auto=format&fit=crop&q=80',
    inStock: true,
    stockCount: 65,
    featured: false,
    bestseller: false,
    specifications: {
      'Diode Power': '2500mW RGB (Red 600mW, Green 400mW, Blue 1500mW)',
      'Patterns': 'Over 256 built-in beams, graphics, waves, and tunnels',
      'Scanner': 'High speed 20Kpps optical galvo scanner'
    },
    wholesaleTiers: [
      { minQty: 1, pricePerUnit: 6800, label: '1 Unit' },
      { minQty: 3, pricePerUnit: 6200, label: '3-5 Units' },
      { minQty: 6, pricePerUnit: 5650, label: '6+ Units (Dealer Price)' }
    ]
  },
  {
    id: 'wsc-sm-03',
    name: '1500W DMX Stage Smoke Machine with 6 RGB LEDs',
    hindiName: '1500W स्टेज स्मोक मशीन (RGB LED लाइट के साथ)',
    category: 'smoke-sfx',
    categoryLabel: 'Smoke & Fog Machines',
    description: 'Heavy duty 1500 watt vertical & horizontal smoke jet machine with 6 high power LEDs around the nozzle. Illuminates smoke clouds in synchronized colors as it blasts out.',
    pricePerUnit: 2950,
    retailPrice: 4800,
    unitType: 'Unit with Wireless Remote',
    minOrderQty: 2,
    packagingDetails: 'Double walled export carton box with 1L fluid tank & wired remote',
    image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&auto=format&fit=crop&q=80',
    inStock: true,
    stockCount: 110,
    featured: false,
    bestseller: true,
    specifications: {
      'Heating Block': '1500W Rapid temperature thermal block',
      'Tank Capacity': '2.5 Liters liquid reservoir with level view',
      'Output Distance': '7 to 9 meters powerful jet stream',
      'LEDs': '6 x 3W RGB color-changing diodes'
    },
    wholesaleTiers: [
      { minQty: 2, pricePerUnit: 2950, label: '2-4 Units' },
      { minQty: 5, pricePerUnit: 2650, label: '5-9 Units' },
      { minQty: 10, pricePerUnit: 2350, label: '10+ Units (Dealer)' }
    ]
  },
  {
    id: 'wsc-we-02',
    name: 'Cold Pyro Handheld Firing Torch Gun for Groom / VIP Entry',
    hindiName: 'कोल्ड पायरो हैंड गन (दूल्हा-दुल्हन वीआईपी एंट्री)',
    category: 'wedding-entry',
    categoryLabel: 'Wedding Entry & Props',
    description: 'Futuristic handheld dual-barrel cold pyro firing prop gun with trigger grip. Allows event personnel or bridal party to trigger sparkling cold pyro fountains safely by hand.',
    pricePerUnit: 2200,
    retailPrice: 3800,
    unitType: 'Pair (2 Gun Props + Battery Charger)',
    minOrderQty: 1,
    packagingDetails: 'Hard padded protective carrying kit',
    image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800&auto=format&fit=crop&q=80',
    inStock: true,
    stockCount: 52,
    featured: true,
    bestseller: true,
    specifications: {
      'Grip': 'Ergonomic ABS pistol grip with safety safety-lock trigger',
      'Mounts': 'Accepts 2 standard cold pyro fountains simultaneously',
      'Power': 'Internal rechargeable lithium battery pack'
    },
    wholesaleTiers: [
      { minQty: 1, pricePerUnit: 2200, label: '1 Pair (2 Guns)' },
      { minQty: 3, pricePerUnit: 1980, label: '3-5 Pairs' },
      { minQty: 6, pricePerUnit: 1750, label: '6+ Pairs (Direct Wholesale)' }
    ]
  }
];

export const BUSINESS_INFO = {
  name: 'wholesale_shop_chhattisgarsh',
  displayName: 'Wholesale Shop Chhattisgarh',
  owner: 'PANKAJ DHAMECHA',
  phone: '9244021201',
  phoneFormatted: '+91 9244021201',
  whatsappNumber: '919244021201',
  followers: '20.3K followers',
  following: '42 following',
  tagline: 'Manufacturers & Direct Importer 🔥',
  deliveryCoverage: 'All Over India Delivered 🇮🇳',
  trustBadge: '100% Trustable Company - All Event Products',
  location: 'Raipur & Bilaspur Wholesale Logistics Hub, Chhattisgarh, India',
  email: 'pankajdhamecha.wholesale@gmail.com',
  workingHours: 'Mon - Sat: 9:00 AM - 8:30 PM (Sunday Special Wholesale Dispatch)',
  stats: [
    { label: 'Followers on Instagram', value: '20.3K+' },
    { label: 'Pan-India Transport Hubs', value: '450+' },
    { label: 'Satisfied Event Organizers', value: '15,000+' },
    { label: 'Manufacturer & Direct Import', value: '100%' }
  ],
  transportPartners: [
    'VRL Logistics',
    'TCI Express',
    'Raipur Bilty Transport',
    'DTDC Express Courier',
    'Delhivery Surface',
    'Shree Tirupati Courier'
  ]
};
