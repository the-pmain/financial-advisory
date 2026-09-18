export type ClientTestimonial = {
  id: string;
  name: string;
  location: string;
  photo: string;
  photoAlt: string;
  quote: string;
  result: string;
  years: number;
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
    photo: '/images/clients/andreas-k.png',
    photoAlt: 'Andreas K., Zurich',
    quote:
      'We came for a written comparison of pension versus lump sum and left with a plan we could actually follow. The first meeting cost nothing and nobody tried to sell us a product.',
    result: 'A hybrid withdrawal kept a floor income and avoided drawing everything in one tax year.',
    years: 8,
  },
  {
    id: 'marta-s',
    name: 'Marta S.',
    location: 'Lucerne',
    photo: '/images/clients/marta-s.png',
    photoAlt: 'Marta S., Lucerne',
    quote:
      'Helfenstein modelled the pillar 3a and vested-benefits withdrawals before I retired. Seeing the progression in writing changed the year I took the capital.',
    result: 'Drawing the capital over three tax years reduced the combined withdrawal tariff.',
    years: 5,
  },
  {
    id: 'retos-l',
    name: 'Reto L.',
    location: 'Zug',
    photo: '/images/clients/reto-l.png',
    photoAlt: 'Reto L., Zug',
    quote:
      'Our fixed-rate mortgage was coming due and the incumbent renewal looked expensive. They ran a comparable tender across banks and set the numbers out clearly.',
    result: 'The chosen offer improved on the published list rate versus the incumbent renewal.',
    years: 6,
  },
];

/** Stand-in figures for layout only — replace with verified statistics. */
export const trustMetrics: TrustMetric[] = [
  { id: 'families', value: '50+', label: 'families advised', icon: 'families' },
  { id: 'assets', value: 'CHF 200M+', label: 'assets managed', icon: 'assets' },
  { id: 'retention', value: '7 years', label: 'average client retention', icon: 'retention' },
];
