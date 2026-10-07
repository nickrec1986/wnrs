/**
 * Old WordPress URLs → current Astro routes.
 * Directory-style sources go through Astro `redirects` (meta-refresh pages).
 * File-like sources (.html, .hmtl) are written to public/ as static HTML.
 */
import { SLUG_BY_LOCALE } from './i18n/slugs.mjs';

export const PORTAL = 'https://online.wnrs.com';

function localeSlugRedirects() {
  /** @type {Record<string, string>} */
  const out = {};
  for (const locale of ['es', 'pt']) {
    for (const [en, loc] of Object.entries(SLUG_BY_LOCALE[locale])) {
      if (en !== loc) out[`/${locale}/${en}`] = `/${locale}/${loc}/`;
    }
  }
  for (const [en, loc] of Object.entries(SLUG_BY_LOCALE.es)) {
    if (en !== loc) out[`/${loc}`] = `/es/${loc}/`;
  }
  out['/defensa-y-seguridad'] = '/es/seguridad-privada/';
  return out;
}

const SAME_INDUSTRY = [
  'aerospace-defense',
  'private-security',
  'banking',
  'chemicals',
  'construction-operations',
  'consumer-products',
  'education-research',
  'engineering',
  'government-contracting',
  'healthcare',
  'insurance',
  'life-sciences',
  'manufacturing',
  'media',
  'mill-products',
  'mining',
  'oil-gas',
  'professional-services',
  'retail',
  'sports-entertainment',
  'telecommunications',
  'travel-transportation',
  'wholesale-distribution',
];

/** Astro `redirects` map. Keys are source paths (slash-normalized by Astro). */
export const ASTRO_REDIRECTS = {
  ...localeSlugRedirects(),
  ...Object.fromEntries(SAME_INDUSTRY.map((slug) => [`/industries/${slug}`, `/${slug}/`])),
  '/industries/defense-security': '/private-security/',
  '/industries/hightec': '/high-tech/',
  '/industries/gaming-hospitality-and-leisure': '/gaming-hospitality-leisure/',
  '/industries/industrial-machinery-and-components': '/industrial-machinery-components/',
  '/industries/163': '/services/',

  '/service/early-stage-collection': '/early-stage-arm/',
  '/service/late-stage-collection': '/late-stage-arm/',
  '/service/specialized-collection': '/specialized-arm/',
  '/service/financial-skip-tracing': '/financial-skip-tracing/',
  '/service/attorney-intervention': '/attorney-intervention/',
  '/service/payment-processing': '/services/',

  '/sector': '/services/',
  '/sector/business': '/business/',
  '/sector/enterprise': '/enterprise/',
  '/sector/government': '/government/',

  '/contact-us': '/#contact',
  '/legal-privacy': '/privacy/',
  '/user-agreement': '/terms/',

  '/bio-page': '/about-us/',
  '/quick-facts': '/about-us/',
  '/associates/qt-associates': '/about-us/',
  '/associates/qt-associates1': '/about-us/',
  '/associates/qt-associates2': '/about-us/',
  '/associates/qt-associates3': '/about-us/',
  '/associates/top-business-processes': '/about-us/',

  '/solution': '/services/',
  '/site-map': '/services/',
  '/case/122': '/services/',
  '/case/case-study-1': '/services/',
  '/case/case-study-2': '/services/',
  '/case/case-study-3': '/services/',
  '/case/case-study-5': '/services/',
  '/case/case-study-6': '/services/',
  '/case/case-study-7': '/services/',
  '/case/case-study-8': '/services/',

  '/news': '/insights/',
  '/news/page/2': '/insights/',
  '/category/news': '/insights/',
  '/author/wnrs': '/insights/',
  '/wnrs-the-tug-and-pull-between-technology-and-talet': '/insights/',

  '/client-center': PORTAL,
  '/login': PORTAL,
  '/register': PORTAL,
  '/registration': PORTAL,
  '/lostpassword': PORTAL,
  '/resetpass': PORTAL,
  '/logout': PORTAL,
  '/payment-receipt': PORTAL,
  '/payment-receipt/error': PORTAL,

  '/landing-page': '/',
  '/landing-page-2-2': '/',
  '/landing-2-call': '/',
  '/landing': '/',
  '/landing-page-2-2/imgs1': '/',
  '/landing-page-2-2/recuperando': '/',
  '/landing-page/img-1-150x150': '/',
  '/landing-page/img-2-2': '/',
  '/landing-page/img-3-150x150': '/',
  '/landing-page/landing-2': '/',
  '/landing-page/slide1-2': '/',
  '/landing-page/slide2-2': '/',
  '/landing-page/slide4-2': '/',
  '/landing-page/slide5-2': '/',
  '/landing_page_1/landing-1b': '/',
  '/landing_page_1/test1': '/',
  '/landing_page_2/landing-test-page-2': '/',
  '/landingip1': '/',
  '/landingip3': '/',
  '/landingip5': '/',

  '/thanks': '/',
  '/thanks-english': '/',
  '/thanks-canada': '/',
  '/thanks-ec': '/',
  '/obrigado': '/',
  '/after-submit-page': '/',
  '/thank-you': '/',
};

/** File-like WP URLs. Written under public/ so they land in dist as real files. */
export const HTML_REDIRECTS = {
  '/about.html': '/about-us/',
  '/mission.html': '/about-us/',
  '/overview.html': '/about-us/',
  '/accredations.html': '/about-us/',
  '/global.html': '/about-us/',
  '/miami.html': '/about-us/',

  '/services.html': '/services/',
  '/solutions.html': '/services/',
  '/armanagement.html': '/services/',
  '/thirdpartycollections.html': '/services/',
  '/collection_agency.html': '/services/',
  '/Florida_Collection_Agency.html': '/services/',
  '/features.html': '/services/',
  '/paymentprocessing.html': '/services/',

  '/contact.html': '/#contact',
  '/privacypolicy.html': '/privacy/',
  '/attorney.html': '/attorney-intervention/',
  '/earlyintervention.html': '/early-stage-arm/',
  '/financialskiptracing.html': '/financial-skip-tracing/',
  '/payonline.html': PORTAL,

  '/landing.html': '/',
  '/thank-you.html': '/',

  '/acreditaciones.html': '/es/',
  '/arco.html': '/es/',
  '/avisodeprivacidad.html': '/es/',
  '/beneficios.html': '/es/',
  '/cicloderecuperacion.html': '/es/',
  '/cobranzamorosa.html': '/es/',
  '/contactenos.html': '/es/',
  '/inicio.html': '/es/',
  '/intervencionlegal.html': '/es/',
  '/intervenciontemprana.html': '/es/',
  '/landinesp2.html': '/es/',
  '/landingesp2.html': '/es/',
  '/landing2esp.hmtl': '/es/',
  '/mision.html': '/es/',
  '/perfil.html': '/es/',
  '/presenciaglobal.html': '/es/',
  '/procesodepagos.html': '/es/',
  '/quienessomos.html': '/es/',
  '/rastreo.html': '/es/',
  '/servicios.html': '/es/',
  '/soluciones.html': '/es/',
};

export function absoluteDest(dest) {
  if (/^https?:\/\//i.test(dest)) return dest;
  if (dest.startsWith('/#')) return `https://wnrs.com${dest}`;
  if (dest === '/') return 'https://wnrs.com/';
  return `https://wnrs.com${dest}`;
}

/** Dist-relative file that must exist for a source path. */
export function expectedDistFile(source) {
  if (/\.[a-zA-Z0-9]+$/.test(source)) return source.replace(/^\//, '');
  const trimmed = source.replace(/^\//, '').replace(/\/$/, '');
  return `${trimmed}/index.html`;
}

export const ALL_REDIRECT_SOURCES = [
  ...Object.keys(ASTRO_REDIRECTS),
  ...Object.keys(HTML_REDIRECTS),
];
