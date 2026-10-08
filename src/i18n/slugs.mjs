/**
 * EN ids stay the content keys (`early-stage-arm`).
 * ES/PT public URL slugs are localized (ASCII, no accents).
 */
export const SLUG_BY_LOCALE = {
  en: {},
  es: {
    'early-stage-arm': 'cobranza-administrativa',
    'late-stage-arm': 'cobranza-extrajudicial',
    'specialized-arm': 'cobranza-especializada',
    'financial-skip-tracing': 'localizacion-de-deudores',
    'attorney-intervention': 'intervencion-legal',
    business: 'negocio',
    enterprise: 'empresa',
    government: 'gobierno',
    utilities: 'servicios-publicos',
    'education-research': 'educacion-e-investigacion',
    'travel-transportation': 'viajes-y-transporte',
    retail: 'minorista',
    manufacturing: 'fabricacion',
    'professional-services': 'servicios-profesionales',
    'aerospace-defense': 'aeroespacial-y-defensa',
    'private-security': 'seguridad-privada',
    'construction-operations': 'construccion-y-operaciones',
    banking: 'bancario',
    'consumer-products': 'productos-de-consumo',
    chemicals: 'productos-quimicos',
    engineering: 'ingenieria',
    'gaming-hospitality-leisure': 'juegos-hosteleria-y-ocio',
    'government-contracting': 'contratacion-gubernamental',
    healthcare: 'cuidado-de-la-salud',
    'high-tech': 'alta-tecnologia',
    'industrial-machinery-components': 'maquinaria-y-componentes-industriales',
    insurance: 'seguro',
    'life-sciences': 'ciencias-de-la-vida',
    media: 'medios-de-comunicacion',
    'mill-products': 'acero-papel-y-madera',
    mining: 'mineria',
    'oil-gas': 'petroleo-y-gas',
    'wholesale-distribution': 'venta-al-por-mayor-y-distribucion',
    'sports-entertainment': 'deportes-y-entretenimiento',
    telecommunications: 'telecomunicaciones',
  },
  pt: {
    'early-stage-arm': 'cobranca-administrativa',
    'late-stage-arm': 'cobranca-extrajudicial',
    'specialized-arm': 'cobranca-especializada',
    'financial-skip-tracing': 'localizacao-de-inadimplentes',
    'attorney-intervention': 'cobranca-judicial',
    business: 'negocio',
    enterprise: 'empresa',
    government: 'governo',
    utilities: 'servicos-publicos',
    'education-research': 'educacao-e-pesquisa',
    'travel-transportation': 'viagens-e-transporte',
    retail: 'varejo',
    manufacturing: 'fabricacao',
    'professional-services': 'servicos-profissionais',
    'aerospace-defense': 'aeroespacial-e-defesa',
    'private-security': 'seguranca-privada',
    'construction-operations': 'construcao-e-operacoes',
    banking: 'bancario',
    'consumer-products': 'produtos-de-consumo',
    chemicals: 'produtos-quimicos',
    engineering: 'engenharia',
    'gaming-hospitality-leisure': 'jogos-hotelaria-e-lazer',
    'government-contracting': 'contratacao-governamental',
    healthcare: 'saude',
    'high-tech': 'alta-tecnologia',
    'industrial-machinery-components': 'maquinas-e-componentes-industriais',
    insurance: 'seguros',
    'life-sciences': 'ciencias-da-vida',
    media: 'midia',
    'mill-products': 'aco-papel-e-madeira',
    mining: 'mineracao',
    'oil-gas': 'petroleo-e-gas',
    'wholesale-distribution': 'atacado-e-distribuicao',
    'sports-entertainment': 'esportes-e-entretenimento',
    telecommunications: 'telecomunicacoes',
  },
};

for (const id of Object.keys(SLUG_BY_LOCALE.es)) {
  SLUG_BY_LOCALE.en[id] = id;
}

export function toLocaleSlug(enId, locale) {
  return SLUG_BY_LOCALE[locale]?.[enId] ?? enId;
}

/** Retired locale slugs that still resolve to the EN content id. */
export const SLUG_ALIASES = {
  'productos-de-molino': 'mill-products',
  'produtos-de-laminacao': 'mill-products',
  'produtos-de-moinho': 'mill-products',
};

/** Map any known public slug (EN or localized) back to the EN content id. */
export function resolveEnId(slug) {
  const clean = String(slug || '')
    .replace(/^\/+|\/+$/g, '')
    .split('/')[0];
  if (!clean) return clean;
  if (SLUG_ALIASES[clean]) return SLUG_ALIASES[clean];
  for (const map of Object.values(SLUG_BY_LOCALE)) {
    for (const [en, loc] of Object.entries(map)) {
      if (loc === clean || en === clean) return en;
    }
  }
  return clean;
}

export function localizePath(path, locale) {
  if (!path || path === '/') return path || '/';
  if (/^(https?:|mailto:|tel:)/i.test(path)) return path;
  if (path.startsWith('/#')) return path;
  const hashIndex = path.indexOf('#');
  const hash = hashIndex >= 0 ? path.slice(hashIndex) : '';
  const raw = hashIndex >= 0 ? path.slice(0, hashIndex) : path;
  const parts = raw.replace(/^\/+|\/+$/g, '').split('/').filter(Boolean);
  if (!parts.length) return `/${hash}`;
  parts[0] = toLocaleSlug(resolveEnId(parts[0]), locale);
  return `/${parts.join('/')}${hash}`;
}

export function slashedPath(path) {
  if (!path || path === '/') return '/';
  if (path.startsWith('/#')) return path;
  const hashIndex = path.indexOf('#');
  const hash = hashIndex >= 0 ? path.slice(hashIndex) : '';
  const raw = hashIndex >= 0 ? path.slice(0, hashIndex) : path;
  if (raw === '/') return `/${hash}`;
  return `${raw.endsWith('/') ? raw : `${raw}/`}${hash}`;
}
