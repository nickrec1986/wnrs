import type { Locale } from './locale';

export type Ui = {
  services: string;
  aboutUs: string;
  byType: string;
  byIndustry: string;
  allServices: string;
  moreIndustries: string;
  login: string;
  bookACall: string;
  bookACallCta: string;
  talkToExpert: string;
  openMenu: string;
  types: string;
  industry: string;
  resources: string;
  insights: string;
  more: string;
  terms: string;
  privacy: string;
  home: string;
  social: string;
  logoAlt: string;
  homeAria: string;
  copyright: (year: number, name: string) => string;
  debtCollectionExperts: string;
  keyStats: string;
  pickYourService: string;
  banner3x: string;
  journeySub: string;
  journeyCaption: string;
  journeyArtAlt: string;
  recognizedBy: string;
  recognizedH2: string;
  teamsAtWorkAlt: string;
  whatClientsSay: string;
  overview: string;
  benefits: string;
  sector: string;
  industryKind: string;
  collectionServicesFor: (name: string) => string;
  pickTheStage: string;
  whatYouCanExpect: string;
  collectionServices: string;
  campaignResultsAlt: string;
  outreachAlt: string;
  collectionsAlt: (name: string) => string;
  serviceHeroAlt: (name: string) => string;
  aboutKicker: string;
  aboutH1: string;
  ourClients: string;
  operationCenters: string;
  contactUs: string;
  ceoAlt: string;
  featuresBenefits: string;
  pickServiceAbout: string;
  servicesKicker: string;
  servicesH1: string;
  servicesLede: string;
  bySectorH2: string;
  bySectorSub: string;
  cashFlow: string;
  byTypeH2: string;
  byTypeSub: string;
  byIndustryH2: string;
  byIndustrySub: string;
  insightsKicker: string;
  insightsH1: string;
  insightsLede: string;
  insightsEmpty: string;
  privacyKicker: string;
  privacyH1: string;
  privacyLede: string;
  termsKicker: string;
  termsH1: string;
  termsLede: string;
  notFoundH1: string;
  notFoundLede: string;
};

const en: Ui = {
  services: 'Services',
  aboutUs: 'About Us',
  byType: 'By Type',
  byIndustry: 'By Industry',
  allServices: 'All services',
  moreIndustries: 'More industries',
  login: 'Login',
  bookACall: 'Book a Call',
  bookACallCta: 'Book a call',
  talkToExpert: 'Talk to an expert',
  openMenu: 'Open menu',
  types: 'Types',
  industry: 'Industry',
  resources: 'Resources',
  insights: 'Insights',
  more: 'More…',
  terms: 'Terms of service',
  privacy: 'Privacy policy',
  home: 'Home',
  social: 'Social',
  logoAlt: 'WNRS — Accelerate your Cashflow',
  homeAria: 'WNRS home',
  copyright: (year, name) => `Copyright © ${year} ${name}`,
  debtCollectionExperts: 'Debt Collection Experts',
  keyStats: 'Key Stats:',
  pickYourService: 'Everything you need for any stage of the receivable experience. Pick your service.',
  banner3x: 'Our Clients Recover 3x or more — 10x Faster.',
  journeySub: 'A simplified visual showing how you turn unpaid cases into recovered revenue.',
  journeyCaption: 'Realtime technology and data driven decisions',
  journeyArtAlt: 'WNRS specialists collaborating',
  recognizedBy: 'As recognized by:',
  recognizedH2: '#1 agency for fortune 500 clients and government throughout the Americas',
  teamsAtWorkAlt: 'WNRS teams at work',
  whatClientsSay: 'What our clients say',
  overview: 'Overview',
  benefits: 'Benefits',
  sector: 'Sector',
  industryKind: 'Industry',
  collectionServicesFor: (name) => `Collection services for ${name}`,
  pickTheStage:
    'Pick the stage that matches the aging — early-stage collection, late-stage concentration, skip tracing, attorney intervention, or specialized unit support.',
  whatYouCanExpect: 'What you can expect',
  collectionServices: 'Collection services',
  campaignResultsAlt: 'Campaign results analysis',
  outreachAlt: 'Outreach and scheduling',
  collectionsAlt: (name) => `${name} collections`,
  serviceHeroAlt: (name) => `${name} at WNRS`,
  aboutKicker: 'About WNRS',
  aboutH1: 'About WNRS',
  ourClients: 'Our Clients',
  operationCenters: 'Operation Centers',
  contactUs: 'Contact Us',
  ceoAlt: 'David Fridman, CEO of WNRS',
  featuresBenefits: 'Features & Benefits',
  pickServiceAbout: 'Everything you need for any stage of the receivable experience. Pick your service.',
  servicesKicker: 'Explore',
  servicesH1: 'WNRS Services',
  servicesLede:
    'Sophisticated accounts receivable and collection services don’t have to be complicated. At WNRS we believe in keeping it simple – and smart. Results are what make us the market leader in collections. Explore our services by type, industry, or sector.',
  bySectorH2: 'Services by Sector',
  bySectorSub:
    'Have an existing collections need? From business to enterprise, to government services, we have what you need to collect.',
  cashFlow: 'Cash-Flow',
  byTypeH2: 'Services by Type',
  byTypeSub:
    'Looking for ways to help your Accounts Receivable run better? Choose amongst our award-winning accounts receivable management services.',
  byIndustryH2: 'Services by Industry',
  byIndustrySub:
    'What differentiates world class accounts receivable management services from the average? Often it’s industry specific services. Leverage our best practices, processes, and industry-specific products.',
  insightsKicker: 'Insights',
  insightsH1: 'Insights',
  insightsLede:
    'Practical notes on receivables recovery, collections, and cashflow — written for credit and finance teams.',
  insightsEmpty: 'Articles are on the way. This is the WNRS blog index — new posts will appear here.',
  privacyKicker: 'Privacy',
  privacyH1: 'Privacy policy',
  privacyLede: 'How the public WNRS marketing site handles information.',
  termsKicker: 'Terms',
  termsH1: 'Terms of service',
  termsLede:
    'These terms govern use of the public WNRS marketing website. They are not a collections engagement agreement.',
  notFoundH1: 'Page not found.',
  notFoundLede: 'That URL is not on the WNRS marketing site.',
};

const pt: Ui = {
  services: 'Serviços',
  aboutUs: 'Sobre nós',
  byType: 'Por tipo',
  byIndustry: 'Por setor',
  allServices: 'Todos os serviços',
  moreIndustries: 'Mais setores',
  login: 'Login',
  bookACall: 'Agendar ligação',
  bookACallCta: 'Agendar ligação',
  talkToExpert: 'Fale com um especialista',
  openMenu: 'Abrir menu',
  types: 'Tipos',
  industry: 'Setor',
  resources: 'Recursos',
  insights: 'Insights',
  more: 'Mais…',
  terms: 'Termos de serviço',
  privacy: 'Política de privacidade',
  home: 'Início',
  social: 'Redes sociais',
  logoAlt: 'WNRS — Accelerate your Cashflow',
  homeAria: 'Página inicial WNRS',
  copyright: (year, name) => `Copyright © ${year} ${name}`,
  debtCollectionExperts: 'Especialistas em cobrança',
  keyStats: 'Números-chave:',
  pickYourService: 'Tudo o que você precisa em qualquer estágio do ciclo de recebíveis. Escolha o serviço.',
  banner3x: 'Nossos clientes recuperam 3x ou mais — 10x mais rápido.',
  journeySub: 'Um visual simples de como casos em aberto viram receita recuperada.',
  journeyCaption: 'Tecnologia em tempo real e decisões baseadas em dados',
  journeyArtAlt: 'Especialistas da WNRS colaborando',
  recognizedBy: 'Conforme reconhecido por:',
  recognizedH2: 'Agência nº 1 para clientes Fortune 500 e governo nas Américas',
  teamsAtWorkAlt: 'Equipes da WNRS em operação',
  whatClientsSay: 'O que nossos clientes dizem',
  overview: 'Visão geral',
  benefits: 'Benefícios',
  sector: 'Segmento',
  industryKind: 'Setor',
  collectionServicesFor: (name) => `Cobrança para ${name}`,
  pickTheStage:
    'Escolha o estágio da carteira — cobrança inicial, concentração em atraso, localização, intervenção advocatícia ou unidade especializada.',
  whatYouCanExpect: 'O que você pode esperar',
  collectionServices: 'Serviços de cobrança',
  campaignResultsAlt: 'Análise de resultados da campanha',
  outreachAlt: 'Contato e agendamento',
  collectionsAlt: (name) => `Cobrança em ${name}`,
  serviceHeroAlt: (name) => `${name} na WNRS`,
  aboutKicker: 'Sobre a WNRS',
  aboutH1: 'Sobre a WNRS',
  ourClients: 'Nossos clientes',
  operationCenters: 'Centros de operação',
  contactUs: 'Fale conosco',
  ceoAlt: 'David Fridman, CEO da WNRS',
  featuresBenefits: 'Recursos e benefícios',
  pickServiceAbout: 'Tudo o que você precisa em qualquer estágio do ciclo de recebíveis. Escolha o serviço.',
  servicesKicker: 'Explorar',
  servicesH1: 'Serviços WNRS',
  servicesLede:
    'Gestão de recebíveis e cobrança sofisticadas não precisam ser complicadas. Na WNRS, apostamos no simples — e no inteligente. Resultado é o que nos torna referência. Explore por tipo, setor ou segmento.',
  bySectorH2: 'Serviços por segmento',
  bySectorSub:
    'Já tem uma necessidade de cobrança? Do mid-market à grande empresa e ao setor público, temos o que você precisa para recuperar.',
  cashFlow: 'Fluxo de caixa',
  byTypeH2: 'Serviços por tipo',
  byTypeSub:
    'Quer que o contas a receber rode melhor? Escolha entre os serviços premiados de gestão de recebíveis da WNRS.',
  byIndustryH2: 'Serviços por setor',
  byIndustrySub:
    'O que diferencia a gestão de recebíveis de classe mundial? Quase sempre, o conhecimento setorial. Use nossas práticas, processos e produtos específicos de cada indústria.',
  insightsKicker: 'Insights',
  insightsH1: 'Insights',
  insightsLede:
    'Notas práticas sobre recuperação de recebíveis, cobrança e fluxo de caixa — para times de crédito e finanças.',
  insightsEmpty: 'Os artigos estão a caminho. Este é o índice do blog da WNRS — os novos posts aparecem aqui.',
  privacyKicker: 'Privacidade',
  privacyH1: 'Política de privacidade',
  privacyLede: 'Como o site institucional da WNRS trata informações.',
  termsKicker: 'Termos',
  termsH1: 'Termos de serviço',
  termsLede:
    'Estes termos regem o uso do site institucional da WNRS. Não são um contrato de mandato de cobrança.',
  notFoundH1: 'Página não encontrada.',
  notFoundLede: 'Esse endereço não existe no site institucional da WNRS.',
};

const es: Ui = {
  services: 'Servicios',
  aboutUs: 'Nosotros',
  byType: 'Por tipo',
  byIndustry: 'Por industria',
  allServices: 'Todos los servicios',
  moreIndustries: 'Más industrias',
  login: 'Iniciar sesión',
  bookACall: 'Agendar llamada',
  bookACallCta: 'Agendar llamada',
  talkToExpert: 'Hable con un experto',
  openMenu: 'Abrir menú',
  types: 'Tipos',
  industry: 'Industria',
  resources: 'Recursos',
  insights: 'Insights',
  more: 'Más…',
  terms: 'Términos de servicio',
  privacy: 'Aviso de privacidad',
  home: 'Inicio',
  social: 'Redes sociales',
  logoAlt: 'WNRS — Accelerate your Cashflow',
  homeAria: 'Inicio WNRS',
  copyright: (year, name) => `Copyright © ${year} ${name}`,
  debtCollectionExperts: 'Expertos en cobranza',
  keyStats: 'Cifras clave:',
  pickYourService: 'Todo lo que necesita en cualquier etapa de la experiencia de cobranza. Elija su servicio.',
  banner3x: 'Nuestros clientes recuperan 3x o más — 10x más rápido.',
  journeySub: 'Un recorrido visual de cómo los casos impagos se convierten en ingresos recuperados.',
  journeyCaption: 'Tecnología en tiempo real y decisiones basadas en datos',
  journeyArtAlt: 'Especialistas de WNRS colaborando',
  recognizedBy: 'Reconocido por:',
  recognizedH2: 'Agencia n.º 1 para clientes Fortune 500 y gobierno en las Américas',
  teamsAtWorkAlt: 'Equipos de WNRS en operación',
  whatClientsSay: 'Lo que dicen nuestros clientes',
  overview: 'Panorama',
  benefits: 'Beneficios',
  sector: 'Segmento',
  industryKind: 'Industria',
  collectionServicesFor: (name) => `Cobranza para ${name}`,
  pickTheStage:
    'Elija la etapa que corresponde al atraso: cobranza temprana, concentración en mora, localización, intervención legal o unidad especializada.',
  whatYouCanExpect: 'Qué puede esperar',
  collectionServices: 'Servicios de cobranza',
  campaignResultsAlt: 'Análisis de resultados de campaña',
  outreachAlt: 'Contacto y programación',
  collectionsAlt: (name) => `Cobranza en ${name}`,
  serviceHeroAlt: (name) => `${name} en WNRS`,
  aboutKicker: 'Acerca de WNRS',
  aboutH1: 'Acerca de WNRS',
  ourClients: 'Nuestros clientes',
  operationCenters: 'Centros de operación',
  contactUs: 'Contáctenos',
  ceoAlt: 'David Fridman, CEO de WNRS',
  featuresBenefits: 'Características y beneficios',
  pickServiceAbout: 'Todo lo que necesita en cualquier etapa de la experiencia de cobranza. Elija su servicio.',
  servicesKicker: 'Explorar',
  servicesH1: 'Servicios WNRS',
  servicesLede:
    'La gestión de cuentas por cobrar y la cobranza sofisticada no tienen que ser complicadas. En WNRS apostamos por lo simple — y lo inteligente. Los resultados nos hacen líderes. Explore por tipo, industria o segmento.',
  bySectorH2: 'Servicios por segmento',
  bySectorSub:
    '¿Ya tiene una necesidad de cobranza? De empresas en crecimiento a corporativos y sector público, tenemos lo que necesita para recuperar.',
  cashFlow: 'Flujo de caja',
  byTypeH2: 'Servicios por tipo',
  byTypeSub:
    '¿Busca que su cuentas por cobrar opere mejor? Elija entre nuestros servicios de gestión de cuentas por cobrar.',
  byIndustryH2: 'Servicios por industria',
  byIndustrySub:
    '¿Qué diferencia una gestión de cuentas por cobrar de clase mundial? Casi siempre, el conocimiento de industria. Aproveche prácticas, procesos y productos específicos.',
  insightsKicker: 'Insights',
  insightsH1: 'Insights',
  insightsLede:
    'Notas prácticas sobre recuperación de cuentas por cobrar, cobranza y flujo de caja — para equipos de crédito y finanzas.',
  insightsEmpty: 'Los artículos están en camino. Este es el índice del blog de WNRS — las nuevas notas aparecerán aquí.',
  privacyKicker: 'Privacidad',
  privacyH1: 'Aviso de privacidad',
  privacyLede: 'Cómo el sitio institucional de WNRS trata la información.',
  termsKicker: 'Términos',
  termsH1: 'Términos de servicio',
  termsLede:
    'Estos términos rigen el uso del sitio institucional de WNRS. No son un contrato de mandato de cobranza.',
  notFoundH1: 'Página no encontrada.',
  notFoundLede: 'Esa URL no está en el sitio institucional de WNRS.',
};

const UI: Record<Locale, Ui> = { en, pt, es };

export function ui(locale: Locale): Ui {
  return UI[locale];
}
