export type ClientTestimonial = {
  id: string;
  name: string;
  location: string;
  /** Placeholder portrait until a consented photo is supplied. */
  photo: string;
  photoAlt: string;
  quote: string;
  result: string;
  years: number;
};

export type VideoTestimonial = {
  title: string;
  description: string;
  thumbnail: string;
  thumbnailAlt: string;
};

export type TrustMetric = {
  id: string;
  value: string;
  label: string;
  icon: 'families' | 'assets' | 'retention';
};

/** Placeholder voices for /about/client-stories. Replace with consented copy. */
export const clientTestimonials: ClientTestimonial[] = [
  {
    id: 'andreas-k',
    name: 'Andreas K.',
    location: 'Zurich',
    photo: 'https://placehold.co/200x200/070E18/FFFFFF?text=Client+Photo',
    photoAlt: 'Placeholder portrait for Andreas K.',
    quote:
      'We came for a written comparison of pension versus lump sum and left with a plan we could actually follow. The first meeting cost nothing and nobody tried to sell us a product.',
    result: 'A hybrid withdrawal kept a floor income and avoided drawing everything in one tax year.',
    years: 8,
  },
  {
    id: 'marta-s',
    name: 'Marta S.',
    location: 'Lucerne',
    photo: 'https://placehold.co/200x200/070E18/FFFFFF?text=Client+Photo',
    photoAlt: 'Placeholder portrait for Marta S.',
    quote:
      'Helfenstein modelled the pillar 3a and vested-benefits withdrawals before I retired. Seeing the progression in writing changed the year I took the capital.',
    result: 'Drawing the capital over three tax years reduced the combined withdrawal tariff.',
    years: 5,
  },
  {
    id: 'retos-l',
    name: 'Reto L.',
    location: 'Zug',
    photo: 'https://placehold.co/200x200/070E18/FFFFFF?text=Client+Photo',
    photoAlt: 'Placeholder portrait for Reto L.',
    quote:
      'Our fixed-rate mortgage was coming due and the incumbent renewal looked expensive. They ran a comparable tender across banks and set the numbers out clearly.',
    result: 'The chosen offer improved on the published list rate versus the incumbent renewal.',
    years: 6,
  },
];

export const videoTestimonial: VideoTestimonial = {
  title: 'A first meeting, then a written plan',
  description:
    'A short conversation about how an independent, fee-only mandate works — and what happens after the free first meeting.',
  thumbnail: 'https://placehold.co/600x400/070E18/FFFFFF?text=Video+Testimonial',
  thumbnailAlt: 'Placeholder thumbnail for a client video testimonial',
};

/** Stand-in figures for layout only — replace with verified statistics. */
export const trustMetrics: TrustMetric[] = [
  { id: 'families', value: '50+', label: 'families advised', icon: 'families' },
  { id: 'assets', value: 'CHF 200M+', label: 'assets managed', icon: 'assets' },
  { id: 'retention', value: '7 years', label: 'average client retention', icon: 'retention' },
];
