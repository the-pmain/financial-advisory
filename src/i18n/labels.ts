import type { ExpertiseTag } from '../data/topics';
import type { Locale } from './types';

const EXPERTISE: Record<Locale, Record<ExpertiseTag, string>> = {
  en: {
    retirement: 'Retirement',
    investments: 'Investments',
    taxes: 'Taxes',
    'real-estate': 'Real estate',
    estate: 'Estate',
    pensions: 'Pensions',
    insurance: 'Insurance',
  },
  fr: {
    retirement: 'Retraite',
    investments: 'Placements',
    taxes: 'Impôts',
    'real-estate': 'Immobilier',
    estate: 'Succession',
    pensions: 'Prévoyance',
    insurance: 'Assurances',
  },
  de: {
    retirement: 'Vorsorge',
    investments: 'Anlagen',
    taxes: 'Steuern',
    'real-estate': 'Immobilien',
    estate: 'Nachlass',
    pensions: 'Pensionen',
    insurance: 'Versicherungen',
  },
  it: {
    retirement: 'Previdenza',
    investments: 'Investimenti',
    taxes: 'Imposte',
    'real-estate': 'Immobili',
    estate: 'Successione',
    pensions: 'Pensioni',
    insurance: 'Assicurazioni',
  },
};

const LANGUAGES: Record<Locale, Record<string, string>> = {
  en: {
    German: 'German',
    English: 'English',
    French: 'French',
    Spanish: 'Spanish',
    Mandarin: 'Mandarin',
  },
  fr: {
    German: 'allemand',
    English: 'anglais',
    French: 'français',
    Spanish: 'espagnol',
    Mandarin: 'mandarin',
  },
  de: {
    German: 'Deutsch',
    English: 'Englisch',
    French: 'Französisch',
    Spanish: 'Spanisch',
    Mandarin: 'Mandarin',
  },
  it: {
    German: 'tedesco',
    English: 'inglese',
    French: 'francese',
    Spanish: 'spagnolo',
    Mandarin: 'mandarino',
  },
};

const CREDENTIALS: Record<Locale, Record<string, string>> = {
  en: {},
  fr: {
    'Swiss banking diploma': 'Diplôme bancaire suisse',
    'CFA Charterholder': 'Titulaire du CFA Charter',
    'CFA Level II': 'CFA niveau II',
  },
  de: {
    'Swiss banking diploma': 'Schweizer Bankdiplom',
    'CFA Charterholder': 'CFA Charterholder',
    'CFA Level II': 'CFA Level II',
  },
  it: {
    'Swiss banking diploma': 'Diploma bancario svizzero',
    'CFA Charterholder': 'CFA Charterholder',
    'CFA Level II': 'CFA livello II',
  },
};

export function expertiseLabel(locale: Locale, tag: ExpertiseTag): string {
  return EXPERTISE[locale][tag] ?? tag;
}

export function languageLabel(locale: Locale, name: string): string {
  return LANGUAGES[locale][name] ?? name;
}

export function credentialLabel(locale: Locale, name: string): string {
  return CREDENTIALS[locale][name] ?? name;
}
