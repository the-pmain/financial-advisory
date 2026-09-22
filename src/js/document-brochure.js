import { AGREEMENT_DEFAULTS } from './document-fields.js';

function present(value) {
  const raw = value == null ? '' : String(value).trim();
  if (!raw || /^\[[^\]]+\]$/.test(raw)) return '';
  return raw;
}

function optionalCopy(value, example) {
  const filled = present(value);
  if (filled) return { type: 'p', text: filled };
  return { type: 'p', text: example, filled: false };
}

export function buildBrochure(values = {}, register = {}) {
  const firm = register?.firm ?? {};
  return [
    {
      type: 'cover',
      company: register?.groupName || 'Helfenstein Group',
      location: register?.jurisdiction || 'Lucerne, Switzerland',
      title: 'Private client brochure',
      tagline: 'Independent, fee-only advice. We never hold your assets.',
      fields: [
        {
          label: 'Prepared for',
          text: present(values.clientName) || 'The household named at the meeting.',
          filled: Boolean(present(values.clientName)),
        },
        {
          label: 'Date',
          text: present(values.brochureDate) || 'Today’s meeting',
          filled: Boolean(present(values.brochureDate)),
        },
      ],
    },
    { type: 'h', text: 'Who this is for' },
    optionalCopy(
      values.clientName,
      'Prepared for the household named at the meeting — names are filled when the adviser saves this brochure.',
    ),
    { type: 'h', text: 'Services' },
    { type: 'p', text: present(values.servicesIncluded) || AGREEMENT_DEFAULTS.servicesIncluded },
    { type: 'h', text: 'What we do not do' },
    { type: 'p', text: present(values.servicesExcluded) || AGREEMENT_DEFAULTS.servicesExcluded },
    { type: 'h', text: 'Fees' },
    { type: 'p', text: present(values.advisoryFeeRate) || AGREEMENT_DEFAULTS.advisoryFeeRate },
    { type: 'h', text: 'Next steps' },
    optionalCopy(
      values.nextSteps,
      'A written mandate, then a custody-bank introduction once you have signed.',
    ),
    {
      type: 'footnote',
      text: [firm.legalName, firm.uid, firm.lei, 'FINMA'].filter(Boolean).join('  ·  '),
    },
  ];
}
