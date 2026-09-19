/**
 * Canonical company identity for Helfenstein Asset Management AG (Lucerne).
 * Use these constants instead of scattering brand strings across the app.
 */
export const company = {
  legalName: "Helfenstein Asset Management AG",
  shortName: "Helfenstein",
  groupName: "Helfenstein Group",
  tagline: "Independent, fee-only advice and portfolio management for private clients",
  city: "Lucerne",
  country: "Switzerland",
  address: {
    street: "Pilatusstrasse 23",
    postalCode: "6003",
    city: "Luzern",
    country: "Switzerland",
    line: "Pilatusstrasse 23, 6003 Luzern, Switzerland",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Pilatusstrasse+23%2C+6003+Luzern",
  },
  phone: "+41 41 211 29 29",
  phoneHref: "tel:+41412112929",
  privacyEmail: "",
  uid: "CHE-111.708.730",
  uidRegisterUrl: "https://www.uid.admin.ch/Detail.aspx?uid_id=CHE-111.708.730",
  uidProfileUrl:
    "https://www.help.ch/firma/CHE-111.708.730/helfenstein-asset-management-ag-luzern",
  lei: "894500URZFTDV5G7F357",
  leiUrl: "https://search.gleif.org/#/record/894500URZFTDV5G7F357",
  leiIssuerUrl: "https://lei.bloomberg.com/leis/view/894500URZFTDV5G7F357",
  regulation: {
    summary: "listed by FINMA as an authorised portfolio manager and supervised by OSFINcontrol AG.",
    authority: "FINMA",
    supervisor: "OSFINcontrol AG",
    supervisorUrl: "https://www.osfincontrol.ch/en/",
    registerUrl:
      "https://www.finma.ch/en/finma-public/authorised-institutions-individuals-and-products/",
    finmaAuthorisationNo: "CH-111.708.730",
    finmaDecisionDate: "12.01.2022",
    osfinAffiliationRef: "OSFIN-111.708.730",
    osfinSince: "12.01.2022",
  },
  ombudsman: {
    name: "Finanzombudsstelle Schweiz (FINOS)",
    description: "Swiss Ombudsman for financial service providers under FinSA",
    street: "Freigutstrasse 8",
    postalCode: "8002",
    city: "Zürich",
    country: "Switzerland",
    addressLine: "Freigutstrasse 8, 8002 Zürich, Switzerland",
    phone: "+41 44 552 08 00",
    phoneHref: "tel:+41445520800",
    email: "info@finos.ch",
    website: "https://www.finos.ch",
    websiteLabel: "www.finos.ch",
    reference: "FINOS-111.708.730",
  },
  jurisdiction: "Lucerne, Switzerland",
  commercialRegister: {
    uid: "CHE-111.708.730",
    hrNumber: "CH-100.3.028.191-4",
    registryCourt: "Luzern",
    office: "Handelsregisteramt des Kantons Luzern",
    zefixUrl: "https://www.zefix.ch/en/search/entity/list?name=Helfenstein%20Asset%20Management%20AG",
    officeUrl: "https://www.lu.ch/verwaltung/justiz_sicherheit/handelsregisteramt",
  },
  dataProtection: {
    registration: "CHE-111.708.730",
    authority: "Swiss Federal Data Protection Commissioner (FDPIC)",
    authorityUrl: "https://www.edoeb.admin.ch/edoeb/en/home.html",
  },
  applicableLaw: {
    governing: "Swiss substantive law (excluding CISG)",
    venue: "Courts of Lucerne, Canton of Luzern",
  },
  officialSite: {
    host: "financial-advisory-production.up.railway.app",
    url: "https://financial-advisory-production.up.railway.app",
  },
  custodyBanks: [
    { id: "lukb", name: "Luzerner Kantonalbank AG", city: "Luzern" },
    { id: "ubs", name: "UBS Switzerland AG", city: "Zürich" },
    { id: "vontobel", name: "Bank Vontobel AG", city: "Zürich" },
  ],
} as const;

export type Company = typeof company;
