import { useEffect, useRef, useState } from "react";
import {
  FaBuilding,
  FaBath,
  FaCalendarCheck,
  FaCut,
  FaInstagram,
  FaMapMarkerAlt,
  FaShieldAlt,
  FaWhatsapp,
} from "react-icons/fa";
import { SiWaze } from "react-icons/si";
import { coverageCategories, premiumSizeOptions } from "./coverageData";
import { SEO_BASE_URL, planSeo, seoPages, teamPages } from "./seoData";

const ASSET = "/assets";
const WHATSAPP_NUMBER = "553199116515";
const ADDRESS =
  "R. Nossa Sra. das Brotas, 179 - Entre Rios de Minas, MG, 35490-000";
const CNPJ = "58.545.751/0001-73";
const buildWhatsAppUrl = (message) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
const WHATSAPP_URL = buildWhatsAppUrl(
  "Olá, gostaria de falar com a equipe Cuidary.",
);
const PETCLUB_DONATION_URL = buildWhatsAppUrl(
  "Olá, quero contratar o Pet Club e ajudar os pets de ONGs.",
);
const GOOGLE_MAPS_URL = "https://www.google.com/maps/place/Cuidary+-+Hospital+Veterin%C3%A1rio+24+horas/@-20.6744341,-44.0668394,1384m/data=!3m1!1e3!4m6!3m5!1s0xa16ddd87db6107:0xdc00b321d6ce76b0!8m2!3d-20.672873!4d-44.064612!16s%2Fg%2F11nvvbs1vf?hl=pt_BR&entry=ttu&g_ep=EgoyMDI2MDkyMC4wIKXMDSoASAFQAw%3D%3D";
const WAZE_URL = `https://waze.com/ul?q=${encodeURIComponent(ADDRESS)}&navigate=yes&utm_source=cuidary_site`;
const INSTAGRAM_URL = "https://www.instagram.com/cuidary.oficial/";

const planSlugByName = {
  Basic: "basic",
  Premium: "premium",
  Essencial: "essencial",
  "Cat Premium": "cat-premium",
};

const upsertMeta = (selector, attributes) => {
  let element = document.head.querySelector(selector);
  if (!element) {
    element = document.createElement(attributes.tag || "meta");
    document.head.appendChild(element);
  }
  Object.entries(attributes).forEach(([key, value]) => {
    if (key !== "tag") element.setAttribute(key, value);
  });
  return element;
};

function useSeoMetadata({ title, description, path = "/", schema = [] }) {
  useEffect(() => {
    const canonicalUrl = `${SEO_BASE_URL}${path === "/" ? "" : path}`;
    document.title = title;
    upsertMeta('meta[name="description"]', { name: "description", content: description });
    upsertMeta('meta[property="og:title"]', { property: "og:title", content: title });
    upsertMeta('meta[property="og:description"]', { property: "og:description", content: description });
    upsertMeta('meta[property="og:type"]', { property: "og:type", content: "website" });
    upsertMeta('meta[property="og:url"]', { property: "og:url", content: canonicalUrl });
    upsertMeta('meta[name="twitter:card"]', { name: "twitter:card", content: "summary_large_image" });
    let canonical = document.head.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = canonicalUrl;
    document.querySelectorAll('script[data-cuidary-schema="true"]').forEach((node) => node.remove());
    schema.forEach((entry) => {
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.dataset.cuidarySchema = "true";
      script.textContent = JSON.stringify(entry);
      document.head.appendChild(script);
    });
  }, [title, description, path, JSON.stringify(schema)]);
}

const veterinarySchema = (path = "/") => ({
  "@context": "https://schema.org",
  "@type": "VeterinaryCare",
  name: "Cuidary - Hospital Veterinário 24 horas",
  url: `${SEO_BASE_URL}${path === "/" ? "" : path}`,
  telephone: "+55 31 9911-6515",
  taxID: CNPJ,
  hasMap: GOOGLE_MAPS_URL,
  sameAs: [INSTAGRAM_URL],
  address: {
    "@type": "PostalAddress",
    streetAddress: "R. Nossa Sra. das Brotas, 179",
    addressLocality: "Entre Rios de Minas",
    addressRegion: "MG",
    postalCode: "35490-000",
    addressCountry: "BR",
  },
  geo: { "@type": "GeoCoordinates", latitude: -20.672873, longitude: -44.064612 },
  openingHoursSpecification: [{
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
    opens: "00:00",
    closes: "23:59",
  }],
});

const gallery = [
  ["estrutura-consultorio-01.png", "Consultório 01"],
  ["estrutura-consultorio-02.png", "Consultório 02"],
  ["estrutura-recepcao.png", "Recepção"],
  ["estrutura-recepcao-02.png", "Recepção 02"],
  ["estrutura-sala-banho.png", "Sala de banho"],
  ["estrutura-corredor.png", "Corredor"],
  ["estrutura-internacao-01.png", "Internação 01"],
  ["estrutura-isolamento.png", "Isolamento"],
  ["estrutura-bloco-cirurgico.png", "Bloco cirúrgico"],
];

const services = [
  {
    title: "Hospital 24 Horas",
    text: "Atendimento 24h por dia 7 dias por semana.",
    icon: "service-stethoscope.png",
    href: "/hospital-veterinario-24-horas-entre-rios-de-minas",
    light: true,
  },
  {
    title: "Exames & Raio X",
    text: "Resultado imediato sem precisar sair da cidade",
    icon: "service-lightning.png",
    href: "/exames-veterinarios-entre-rios-de-minas",
  },
  {
    title: "Cirurgia e Internação",
    text: "Ambiente equipado para que seu pet seja bem atendido",
    icon: "service-care.png",
    href: "/cirurgia-veterinaria-entre-rios-de-minas",
  },
  {
    title: "Banho & Tosa",
    text: "Seu pet sempre limpinho e cheiroso",
    icon: "service-cloud.png",
    href: "/banho-e-tosa-entre-rios-de-minas",
    light: true,
  },
];

const team = [
  {
    image: "staff-magna.png",
    name: "Dra. Magna Colares",
    role: "CRMV 23577",
    slug: "/equipe/dra-magna-colares",
  },
  {
    image: "staff-lucas.png",
    name: "Dr. Lucas Fiusa",
    role: "CRMV 28445043",
    slug: "/equipe/dr-lucas-fiusa",
  },
  {
    image: "staff-isadora.png",
    name: "Isadora Resende",
    role: "Gerente Administrativa",
    slug: "/equipe/isadora-resende",
  },
];

const specialties = [
  "Dermatologia",
  "Ortopedia",
  "Oftalmologia",
  "Endocrinologia",
  "Medicina felina",
  "Ultrassom",
  "Limpeza de tártaro",
  "Castração",
  "Exames",
  "Vacinas",
  "Internação",
  "Hemograma",
  "Raio X",
  "Cardiologia",
];

const catPlanFeatures = [
  ["Consultas generalistas", "4 inclusas"],
  ["Urgência e Emergência 24h", "Incluso"],
  ["Vacinas felinas + Raiva", "Incluso"],
  ["Castração", "Proced. + anestesia"],
  ["Telemedicina 24h", "Incluso"],
  ["Banho", "1 por mês"],
  ["Corte de unhas", "1 por mês"],
  ["Demais procedimentos", "20% OFF"],
];

const planFeatures = [
  "Consulta",
  "Urgência e Emergência 24h",
  "Vacinas V10, Raiva e Quíntupla",
  "Cirurgias",
  "Internação",
  "Ultrassom",
  "Raio X e Exames",
  "Remoção de tártaro",
  "Telemedicina 24h",
  "Castração",
  "Banho & Tosa",
  "Pet sitter",
  "Medicamentos",
];

const plans = [
  {
    name: "Plano Basic",
    shortName: "Basic",
    monthly: 37,
    annual: 399,
    procedureDiscount: 10,
    discounts: ["Incluso", "Incluso", "Incluso", "10% OFF"],
  },
  {
    name: "Plano Premium",
    shortName: "Premium",
    monthly: 249,
    annual: 2699,
    procedureDiscount: 20,
    featured: true,
    discounts: ["Incluso", "Incluso", "Incluso", "20% OFF"],
  },
  {
    name: "Plano Essencial",
    shortName: "Essencial",
    monthly: 57,
    annual: 615,
    procedureDiscount: 15,
    discounts: ["Incluso", "Incluso", "Incluso", "15% OFF"],
  },
  {
    name: "Cat Premium",
    shortName: "Cat Premium",
    monthly: 117,
    annual: 1264,
    procedureDiscount: 20,
    cat: true,
    discounts: ["Incluso", "Incluso", "Incluso", "20% OFF"],
  },
];

const planComparisonRows = [
  {
    label: "Mensalidade",
    values: {
      Basic: { text: "R$ 37/mês", tone: "price" },
      Essencial: { text: "R$ 57/mês", tone: "price" },
      Premium: { text: "A partir de R$ 249/mês", tone: "price" },
    },
  },
  {
    label: "Consultas generalistas",
    values: {
      Basic: { text: "4 inclusas", tone: "included" },
      Essencial: { text: "4 inclusas", tone: "included" },
      Premium: { text: "4 inclusas", tone: "included" },
    },
  },
  {
    label: "Urgência e emergência 24h",
    values: {
      Basic: { text: "Incluso", tone: "included" },
      Essencial: { text: "Incluso", tone: "included" },
      Premium: { text: "Incluso", tone: "included" },
    },
  },
  {
    label: "Vacinas V10, Raiva e Quíntupla",
    values: {
      Basic: { text: "3 inclusas", tone: "included" },
      Essencial: { text: "3 inclusas", tone: "included" },
      Premium: { text: "3 inclusas", tone: "included" },
    },
  },
  {
    label: "Desconto nos demais procedimentos",
    values: {
      Basic: { text: "10% OFF", tone: "discount" },
      Essencial: { text: "15% OFF", tone: "discount" },
      Premium: { text: "20% OFF", tone: "discount" },
    },
  },
  {
    label: "Telemedicina 24h",
    values: {
      Basic: { text: "10% OFF", tone: "discount" },
      Essencial: { text: "15% OFF", tone: "discount" },
      Premium: { text: "Incluso", tone: "included" },
    },
  },
  {
    label: "Castração",
    values: {
      Basic: { text: "10% OFF", tone: "discount" },
      Essencial: { text: "15% OFF", tone: "discount" },
      Premium: { text: "Procedimento + anestesia • 180 dias", tone: "premium" },
    },
  },
  {
    label: "Internação",
    values: {
      Basic: { text: "10% OFF", tone: "discount" },
      Essencial: { text: "15% OFF", tone: "discount" },
      Premium: { text: "20% OFF", tone: "discount" },
    },
  },
  {
    label: "Medicamentos",
    values: {
      Basic: { text: "10% OFF", tone: "discount" },
      Essencial: { text: "15% OFF", tone: "discount" },
      Premium: { text: "20% OFF", tone: "discount" },
    },
  },
  {
    label: "Banho e tosa",
    values: {
      Basic: { text: "10% OFF", tone: "discount" },
      Essencial: { text: "15% OFF", tone: "discount" },
      Premium: { text: "4 banhos + 1 tosa/mês", tone: "premium" },
    },
  },
  {
    label: "Pet Sitter",
    values: {
      Basic: { text: "10% OFF", tone: "discount" },
      Essencial: { text: "15% OFF", tone: "discount" },
      Premium: { text: "20% OFF", tone: "discount" },
    },
  },
  {
    label: "Hospedagem",
    values: {
      Basic: { text: "Indisponível", tone: "unavailable" },
      Essencial: { text: "Indisponível", tone: "unavailable" },
      Premium: { text: "Indisponível", tone: "unavailable" },
    },
  },
];

const testimonials = [
  {
    image: "testimonial-01.png",
    name: "Fernanda Beuren",
    role: "Esteticista Especialista em Estética Integrativa e em tecnológica",
  },
  {
    image: "testimonial-02.png",
    name: "Carolina Mattei de Reis",
    role: "Biomédica Esteta - CM Clínica Estética Avançada & Saúde",
  },
  {
    image: "testimonial-03.png",
    name: "Patrícia Rodella",
    role: "Farmacêutica-Bioquímica e Esteta, doutora de Ciências Farmacêuticas",
  },
  {
    image: "testimonial-04.png",
    name: "Bruna Serolli",
    role: "Linfoterapeuta - Clínica Kurah",
  },
  {
    image: "testimonial-05.png",
    name: "Leonardo Bündrich",
    role: "Cirurgião-dentista e mestre Estomatologista",
  },
];

const faqs = [
  ["A Cuidary funciona 24 horas?", "Sim. O hospital mantém atendimento veterinário 24 horas por dia, todos os dias da semana."],
  ["É necessário agendar uma emergência?", "Não. Emergências são recebidas a qualquer hora. Se puder, avise a equipe pelo WhatsApp enquanto estiver a caminho."],
  ["A Cuidary possui raio-X?", "Sim. A estrutura conta com diagnóstico por imagem para agilizar a avaliação do seu pet."],
  ["A Cuidary realiza exames?", "Sim. Realizamos exames laboratoriais e de imagem de acordo com a indicação clínica."],
  ["Existe internação?", "Sim. Contamos com ambientes de internação organizados para as diferentes necessidades dos pacientes."],
  ["A Cuidary realiza cirurgias?", "Sim. A equipe realiza procedimentos cirúrgicos com estrutura preparada e acompanhamento veterinário."],
  ["O Pet Club é um plano de saúde?", "É um clube de benefícios veterinários, com serviços inclusos e descontos conforme o plano escolhido."],
  ["A Cuidary atende animais de outras cidades?", "Sim. Recebemos pacientes de Entre Rios de Minas e de toda a região."],
  ["Posso testar antes de pagar?", "Fale com a nossa equipe para conhecer as condições atuais e escolher o plano ideal para o seu pet."],
];

function Logo({ className = "" }) {
  return <img className={className} src={`${ASSET}/logo.svg`} alt="Cuidary" />;
}

function Button({
  children,
  className = "",
  href = "#contato",
  target,
  rel,
  showArrow = true,
}) {
  return (
    <a className={`button ${className}`} href={href} target={target} rel={rel}>
      {children}
      {showArrow && <span aria-hidden="true">›</span>}
    </a>
  );
}

function PetPill({ image, className = "" }) {
  return (
    <span className={`animal-inline ${className}`} aria-hidden="true">
      <img src={`${ASSET}/${image}`} alt="" />
    </span>
  );
}

function useMobileCarousel(selector, interval = 4400) {
  const carouselRef = useRef(null);

  useEffect(() => {
    const carousel = carouselRef.current;
    const mobileQuery = window.matchMedia("(max-width: 760px)");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let intervalId;
    let resumeTimeout;
    let interacting = false;

    if (!carousel) return undefined;

    const getItems = () =>
      [...carousel.querySelectorAll(selector)]
        .filter((item) => window.getComputedStyle(item).display !== "none")
        .sort((first, second) => first.offsetLeft - second.offsetLeft);

    const advance = () => {
      if (!mobileQuery.matches || interacting) return;
      const items = getItems();
      if (items.length < 2) return;

      const carouselCenter = carousel.scrollLeft + carousel.clientWidth / 2;
      const currentIndex = items.reduce((nearestIndex, item, index) => {
        const itemCenter = item.offsetLeft + item.offsetWidth / 2;
        const nearest = items[nearestIndex];
        const nearestCenter = nearest.offsetLeft + nearest.offsetWidth / 2;
        return Math.abs(itemCenter - carouselCenter) <
          Math.abs(nearestCenter - carouselCenter)
          ? index
          : nearestIndex;
      }, 0);
      const nextItem = items[(currentIndex + 1) % items.length];
      const nextLeft = Math.max(
        0,
        nextItem.offsetLeft - (carousel.clientWidth - nextItem.offsetWidth) / 2,
      );

      carousel.scrollTo({
        left: nextLeft,
        behavior: reduceMotion.matches ? "auto" : "smooth",
      });
    };

    const start = () => {
      window.clearInterval(intervalId);
      if (mobileQuery.matches) {
        intervalId = window.setInterval(advance, interval);
      }
    };

    const pause = () => {
      interacting = true;
      window.clearInterval(intervalId);
      window.clearTimeout(resumeTimeout);
    };

    const resume = () => {
      window.clearTimeout(resumeTimeout);
      resumeTimeout = window.setTimeout(() => {
        interacting = false;
        start();
      }, 1800);
    };

    carousel.addEventListener("pointerdown", pause);
    window.addEventListener("pointerup", resume);
    window.addEventListener("pointercancel", resume);
    mobileQuery.addEventListener("change", start);
    start();

    return () => {
      window.clearInterval(intervalId);
      window.clearTimeout(resumeTimeout);
      carousel.removeEventListener("pointerdown", pause);
      window.removeEventListener("pointerup", resume);
      window.removeEventListener("pointercancel", resume);
      mobileQuery.removeEventListener("change", start);
    };
  }, [interval, selector]);

  return carouselRef;
}

function AutoCarousel({ items, type, label }) {
  const isGallery = type === "gallery";
  const repeatedItems = [...items, ...items];
  const carouselRef = useMobileCarousel(`.${type}-card:not([aria-hidden="true"])`);

  return (
    <div
      className={`auto-carousel ${type}-carousel`}
      ref={carouselRef}
      aria-label={label}
    >
      <div className={`${type}-track`}>
        {repeatedItems.map((item, index) => {
          const duplicate = index >= items.length;
          if (isGallery) {
            const [image, itemLabel] = item;
            return (
              <article
                className="gallery-card"
                key={`${image}-${index}`}
                aria-hidden={duplicate ? "true" : undefined}
              >
                <img src={`${ASSET}/${image}`} alt={duplicate ? "" : itemLabel} />
                <span className="liquid-glass glass-clear">{itemLabel}</span>
              </article>
            );
          }

          return (
            <article
              className="testimonial-card"
              key={`${item.name}-${index}`}
              aria-hidden={duplicate ? "true" : undefined}
            >
              <img
                src={`${ASSET}/${item.image}`}
                alt={duplicate ? "" : item.name}
              />
            </article>
          );
        })}
      </div>
    </div>
  );
}

function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <a href="/#inicio" aria-label="Ir para o início">
        <Logo className="header-logo" />
      </a>
      <nav className={open ? "nav open" : "nav"} aria-label="Navegação principal">
        <a href="/#hospital" onClick={() => setOpen(false)}>Hospital</a>
        <a href="/#estrutura" onClick={() => setOpen(false)}>Estrutura</a>
        <a href="/#servicos" onClick={() => setOpen(false)}>Serviços</a>
        <a href="/#especialidades" onClick={() => setOpen(false)}>Especialidades</a>
        <a href="/#planos" onClick={() => setOpen(false)}>Pet Club</a>
      </nav>
      <a className="client-button" href="/#cuidaryclub">Área do cliente</a>
      <button
        className={open ? "menu-button active" : "menu-button"}
        type="button"
        aria-label="Abrir menu"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        <span />
        <span />
        <span />
      </button>
    </header>
  );
}

function Hero() {
  return (
    <section className="hero" id="inicio">
      <Header />
      <div className="hero-shade" />
      <div className="container hero-content">
        <p className="eyebrow hero-eyebrow">A estrutura que faltava em Entre Rios de Minas</p>
        <h1>
          <span>O cuidado que o seu pet</span>
          <span className="hero-title-line">
            sempre mereceu
            <img
              className="inline-pet inline-pet-dog"
              src={`${ASSET}/pet-pill-two-dogs.png`}
              alt=""
            />
          </span>
        </h1>
        <p className="hero-description">
          Atendimento veterinário 24 horas, diagnóstico, cirurgia e internação
          sem precisar sair da cidade.
        </p>
      </div>
    </section>
  );
}

function Structure() {
  return (
    <section className="structure" id="hospital">
      <div className="container intro-grid">
        <div>
          <p className="eyebrow dark-eyebrow">Estrutura & responsabilidade</p>
          <h2 className="pet-headline structure-headline">
            <span>Hospital preparado para</span>
            <span>
              acompanhar <PetPill image="pet-pill-cat.png" /> cada
            </span>
            <span>etapa do atendimento</span>
          </h2>
        </div>
        <div className="intro-copy">
          <p>
            Nossa estrutura permite integrar consultas, exames, diagnóstico,
            tratamento, procedimentos cirúrgicos e internação, conforme a
            necessidade de cada paciente.
          </p>
          <Button href="/consulta-veterinaria-entre-rios-de-minas">Agendar uma consulta</Button>
        </div>
      </div>

      <div id="estrutura">
        <AutoCarousel
          items={gallery}
          type="gallery"
          label="Ambientes da Cuidary em apresentação automática"
        />
      </div>
    </section>
  );
}

function Services() {
  return (
    <section className="services" id="servicos">
      <div className="container services-grid">
        <div className="services-copy">
          <p className="eyebrow dark-eyebrow">Estrutura planejada para oferecer segurança e eficiência</p>
          <h2 className="pet-headline services-headline">
            <span>Ambientes organizados</span>
            <span>
              para diferentes <PetPill image="pet-pill-dog.png" className="animal-inline-wide" />
            </span>
            <span>necessidades clínicas</span>
          </h2>
          <p>
            Cada setor da Cuidary foi desenvolvido para proporcionar conforto aos
            pacientes, melhores condições de trabalho para a equipe e mais
            segurança durante os atendimentos.
          </p>
          <Button href="/consulta-veterinaria-entre-rios-de-minas">Agendar uma consulta</Button>
        </div>
        <div className="service-cards">
          {services.map((service) => (
            <article className={service.light ? "service-card light" : "service-card"} key={service.title}>
              <div className="service-icon">
                <img src={`${ASSET}/${service.icon}`} alt="" />
              </div>
              <h3>{service.title}</h3>
              <p>{service.text}</p>
              <a className="service-seo-link" href={service.href}>Saiba mais</a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function CareBanner() {
  return (
    <section className="care-banner" aria-label="Consultório exclusivo para gatos">
      <div className="container care-banner-inner">
        <article className="care-card">
          <img className="care-mark" src={`${ASSET}/mark.png`} alt="" />
          <h2>Consultório exclusivo para gatos</h2>
          <p>
            Separar gatos de cães reduz cheiros, sons e contato visual que podem causar
            estresse, deixando a avaliação mais tranquila, segura e precisa.
          </p>
          <Button>Agendar uma consulta</Button>
        </article>
      </div>
    </section>
  );
}

function Team() {
  const teamCarouselRef = useMobileCarousel(
    '.team-card:not([aria-hidden="true"])',
    4600,
  );

  return (
    <section className="team-section" id="equipe">
      <div className="container team-grid">
        <div className="team-copy">
          <p className="eyebrow dark-eyebrow">Amamos os pets e</p>
          <h2 className="pet-headline team-headline">
            <span>Cuidamos deles como</span>
            <span>
              se fossem <PetPill image="pet-pill-cat.png" className="animal-inline-cat" /> da
            </span>
            <span>nossa família</span>
          </h2>
          <Button>Agendar uma consulta</Button>
        </div>
        <div className="team-carousel" ref={teamCarouselRef}>
          <div className="team-cards">
            {[...team, ...team].map((member, index) => {
              const duplicate = index >= team.length;
              return (
                <article
                  className={duplicate ? "team-card team-card-duplicate" : "team-card"}
                  key={`${member.name}-${index}`}
                  aria-hidden={duplicate ? "true" : undefined}
                >
                  <img
                    src={`${ASSET}/${member.image}`}
                    alt={duplicate ? "" : member.name}
                  />
                  <div className="team-label liquid-glass glass-clear">
                    <strong>{member.name}</strong>
                    <span>{member.role}</span>
                    {!duplicate && <a className="team-profile-link" href={member.slug}>Ver perfil</a>}
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function Marquee({ reverse = false }) {
  const items = reverse ? [...specialties].reverse() : specialties;
  const trackRef = useRef(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return undefined;

    let previousTime;
    let offset = 0;
    let loopDistance = 0;
    let intervalId;

    const measure = () => {
      const duplicateStart = track.children[items.length];
      loopDistance = duplicateStart?.offsetLeft || track.scrollWidth / 2;

      if (reverse && offset === 0) offset = -loopDistance;
      if (!reverse && offset <= -loopDistance) offset = 0;
      if (reverse && offset < -loopDistance) offset = -loopDistance;
    };

    const animate = () => {
      if (!loopDistance) measure();
      const time = Date.now();
      if (previousTime === undefined) previousTime = time;

      const elapsed = Math.min((time - previousTime) / 1000, 0.05);
      const viewportWidth = window.innerWidth;
      const speed = viewportWidth <= 760 ? 82 : viewportWidth <= 1024 ? 66 : 52;
      offset += (reverse ? 1 : -1) * speed * elapsed;

      if (!reverse && offset <= -loopDistance) offset += loopDistance;
      if (reverse && offset >= 0) offset -= loopDistance;

      track.style.transform = `translate3d(${offset}px, 0, 0)`;
      previousTime = time;
    };

    const resetClock = () => {
      previousTime = undefined;
    };

    measure();
    const resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(track);
    document.addEventListener("visibilitychange", resetClock);
    window.addEventListener("resize", resetClock);
    intervalId = window.setInterval(animate, 20);
    animate();

    return () => {
      window.clearInterval(intervalId);
      resizeObserver.disconnect();
      document.removeEventListener("visibilitychange", resetClock);
      window.removeEventListener("resize", resetClock);
    };
  }, [reverse, items.length]);

  return (
    <div className={reverse ? "marquee reverse" : "marquee"}>
      <div className="marquee-track" ref={trackRef}>
        {[...items, ...items].map((item, index) => (
          <span
            key={`${item}-${index}`}
            aria-hidden={index >= items.length ? "true" : undefined}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

function PlanCard({ plan, billing }) {
  const price = billing === "monthly" ? plan.monthly : plan.annual;
  const cycle = billing === "monthly" ? "/mês" : "/ano";
  return (
    <article className={plan.featured ? "plan-card featured" : "plan-card"}>
      {plan.featured && <span className="recommended">Indicado</span>}
      <h3>{plan.name}</h3>
      <p className="plan-subtitle">{plan.cat ? "Plano exclusivo para gatos" : "Para crescer com controle"}</p>
      <div className="price">
        {plan.featured && <small>a partir</small>}
        <span className="currency">R$</span>
        <strong>{Number.isInteger(price) ? price : price.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</strong>
        <span>{cycle}</span>
      </div>
      <Button
        href={buildWhatsAppUrl(
          `Olá, quero saber mais informações sobre o ${plan.name}.`,
        )}
        target="_blank"
        rel="noreferrer"
      >
        Contratar agora
      </Button>
      <ul className="feature-list">
        {plan.cat
          ? catPlanFeatures.map(([feature, benefit]) => (
              <li key={feature}><span>{feature}</span><small>{benefit}</small></li>
            ))
          : planFeatures.map((feature, index) => {
              let benefit = `${plan.procedureDiscount}% OFF`;
              if (index === 0) benefit = "4 consultas inclusas";
              if (index === 1) benefit = "Incluso";
              if (index === 2) benefit = "3 vacinas inclusas";
              if (plan.featured && index === 8) benefit = "Incluso";
              if (plan.featured && index === 9) benefit = "Proced. + anestesia";
              if (plan.featured && index === 10) benefit = "4 banhos/mês";
              if (plan.featured && index === 11) benefit = "20% OFF";
              return <li key={feature}><span>{feature}</span><small>{benefit}</small></li>;
            })}
      </ul>
      <a
        className="coverage-link"
        href={`/planos/${planSlugByName[plan.shortName]}`}
        aria-label={`Conferir cobertura do ${plan.name}`}
      >
        Conferir Cobertura
      </a>
    </article>
  );
}

function Club() {
  const [billing, setBilling] = useState("monthly");
  const planCarouselRef = useMobileCarousel(".plan-card", 5200);

  return (
    <section className="club-section" id="especialidades">
      <div className="specialties-header container">
        <p className="eyebrow light-eyebrow">Especialidades veterinárias</p>
        <h2>Cuidado especializado sem precisar<br />sair da cidade</h2>
      </div>
      <Marquee />
      <Marquee reverse />

      <div className="club-intro container" id="cuidaryclub">
        <p className="eyebrow light-eyebrow">Especialidades veterinárias</p>
        <h2>
          Economize com procedimento veterinário
          <br />
          usando nosso <em>pet</em><sup>CLUB</sup>
        </h2>
        <p>
          O Pet Club da Cuidary é um programa de benefícios exclusivo para clientes que
          querem cuidar do seu pet com segurança e economia.
        </p>
        <div className="billing-toggle" aria-label="Periodicidade do plano">
          <button
            className={billing === "monthly" ? "active" : ""}
            type="button"
            onClick={() => setBilling("monthly")}
          >
            Mensal
          </button>
          <button
            className={billing === "annual" ? "active" : ""}
            type="button"
            onClick={() => setBilling("annual")}
          >
            Anual
          </button>
        </div>
      </div>

      <div className="container plan-grid" id="planos" ref={planCarouselRef}>
        {plans.map((plan) => (
          <PlanCard key={plan.name} plan={plan} billing={billing} />
        ))}
      </div>

      <div className="container donation">
        <div className="donation-message">
          <span className="donation-kicker">A cada plano</span>
          <span className="donation-line donation-line-orange">
            <strong>contratado</strong>
            <PetPill image="pet-pill-dog.png" className="donation-dog" />
            <strong>doamos</strong>
          </span>
          <span className="donation-line donation-line-food">
            <b>1KG</b>
            <span>de ração</span>
            <PetPill image="pet-pill-cat.png" className="donation-cat" />
            <span>para protetores</span>
          </span>
        </div>
        <div className="donation-mobile-message">
          <span>A cada plano contratado</span>
          <div>
            <PetPill image="pet-pill-dog.png" />
            <strong>Doamos 1KG</strong>
            <PetPill image="pet-pill-cat.png" />
          </div>
          <p>de ração para protetores animais</p>
        </div>
        <div className="donation-action">
          <a href={PETCLUB_DONATION_URL} target="_blank" rel="noreferrer">
            Ajude cuidar dos pets 💜
          </a>
          <small>Proteja seu pet e ajude a ONGs e protetores animais da região.</small>
        </div>
      </div>
    </section>
  );
}

const normalizeSearch = (value) =>
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();

const includedVaccines = new Set([
  "Vacina da Raiva",
  "Vacina Quíntupla (V5 ou V3/V4 + FeLV)",
  "Vacina Polivalente V10",
]);

const includedGeneralConsultations = new Set([
  "Retorno Clínico",
  "Consulta Clínico Geral",
  "Retorno em Horário de Plantão",
  "Consulta Plantão",
]);

const formatBRL = (value) =>
  new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);

function CoverageBenefit({ category, procedure, plan }) {
  const procedureName =
    typeof procedure === "string" ? procedure : procedure.name;
  const unavailable = procedureName === "Hospedagem";
  const isIncludedVaccine =
    category.id === "vacinas" && (plan.cat ? ["Vacina da Raiva", "Vacina Quíntupla (V5 ou V3/V4 + FeLV)", "Vacina Tríplice (V3) / Quádrupla (V4)"].includes(procedureName) : includedVaccines.has(procedureName));
  const isIncludedGeneralConsultation =
    category.id === "consultas" &&
    includedGeneralConsultations.has(procedureName);
  const isUrgencyOrEmergency = category.id === "urgencia-emergencia";
  const isPremiumCastrationIncluded =
    (plan.shortName === "Premium" || plan.cat) &&
    category.id === "castracao" &&
    (procedureName === "Procedimento de castração" ||
      procedureName === "Anestesia da castração");
  const isPlantao =
    isIncludedGeneralConsultation &&
    procedureName.toLowerCase().includes("plantão");
  const included =
    isIncludedVaccine ||
    isIncludedGeneralConsultation ||
    isUrgencyOrEmergency ||
    isPremiumCastrationIncluded ||
    ((plan.shortName === "Premium" || plan.cat) && category.id === "servicos" && procedureName === "Limpeza de ouvido");
  const waitingPeriod = isPremiumCastrationIncluded
    ? "180 dias"
    : isIncludedVaccine
    ? "60 dias"
    : isUrgencyOrEmergency || isPlantao
      ? "30 dias"
      : "45 dias";

  if (category.id === "estetica") {
    const premiumIncluded = ["Transporte mensalista", "Corte de unhas", "Banho", "Tosa higiênica"].includes(procedure.name);
    const catIncluded = ["Corte de unhas", "Banho"].includes(procedure.name);
    const includedAesthetic = plan.cat ? catIncluded : plan.shortName === "Premium" ? premiumIncluded : false;
    const benefit = includedAesthetic ? "Incluso" : `${plan.procedureDiscount}% OFF`;
    return (
      <tr>
        <td data-label="Serviço"><strong className="aesthetic-service-name">{procedure.name}</strong></td>
        <td data-label="Seu benefício"><span className={`benefit-chip ${includedAesthetic ? "included" : "discount"}`}>{benefit}</span></td>
      </tr>
    );
  }

  return (
    <tr>
      <td data-label="Procedimento">{procedureName}</td>
      <td data-label="Seu benefício">
        <span
          className={
            unavailable
              ? "benefit-chip unavailable"
              : included
                ? "benefit-chip included"
                : "benefit-chip discount"
          }
        >
          {unavailable
            ? "Indisponível"
            : included
              ? "Incluso"
              : `${plan.procedureDiscount}% OFF`}
        </span>
      </td>
      <td data-label="Carência">
        <span
          className={
            unavailable
              ? "waiting-time unavailable"
              : included
                ? "waiting-time"
                : "waiting-time no-wait"
          }
        >
          {unavailable ? "—" : included ? waitingPeriod : "Sem carência"}
        </span>
      </td>
    </tr>
  );
}

function ComparisonValue({ benefit }) {
  if (!benefit) return <span className="comparison-value unavailable">—</span>;

  return (
    <span className={`comparison-value ${benefit.tone}`}>
      {benefit.tone === "included" && <b aria-hidden="true">✓</b>}
      {benefit.text}
    </span>
  );
}

function PlanComparison() {
  const comparisonPlans = ["Basic", "Essencial", "Premium"]
    .map((shortName) => plans.find((plan) => plan.shortName === shortName))
    .filter(Boolean);

  return (
    <section className="plan-comparison" aria-labelledby="plan-comparison-title">
      <div className="plan-comparison-heading">
        <div>
          <p className="eyebrow">Compare antes de escolher</p>
          <h2 id="plan-comparison-title">Qual Pet Club combina com seu pet?</h2>
        </div>
        <p>
          Veja lado a lado os principais benefícios. Os serviços com desconto podem
          ser usados sem carência.
        </p>
      </div>

      <div className="plan-comparison-scroll" tabIndex="0" aria-label="Tabela comparativa dos planos">
        <table className="plan-comparison-table">
          <thead>
            <tr>
              <th scope="col">Benefício</th>
              {comparisonPlans.map((plan) => (
                <th
                  className={plan.featured ? "featured" : ""}
                  key={plan.shortName}
                  scope="col"
                >
                  {plan.featured && <span>Mais completo</span>}
                  <strong>{plan.shortName}</strong>
                  <small>
                    {plan.featured ? "a partir de " : ""}R$ {Number.isInteger(plan.monthly) ? plan.monthly : plan.monthly.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}/mês
                  </small>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {planComparisonRows.map((row) => (
              <tr key={row.label}>
                <th scope="row">{row.label}</th>
                {comparisonPlans.map((plan) => {
                  const benefit = row.values[plan.shortName];
                  return (
                    <td className={plan.featured ? "featured" : ""} key={plan.shortName}>
                      <ComparisonValue benefit={benefit} />
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="plan-comparison-mobile" aria-label="Comparação dos planos">
        {comparisonPlans.map((plan) => (
          <article className={plan.featured ? "featured" : ""} key={plan.shortName}>
            <header>
              <div>
                {plan.featured && <span>Mais completo</span>}
                <h3>Plano {plan.shortName}</h3>
              </div>
              <strong>
                {plan.featured && <small>a partir de</small>}
                R$ {plan.monthly}<em>/mês</em>
              </strong>
            </header>
            <ul>
              {planComparisonRows.slice(1).map((row) => (
                <li key={row.label}>
                  <span>{row.label}</span>
                  <ComparisonValue benefit={row.values[plan.shortName]} />
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}

function CoveragePage({ initialPlanName = "Premium" }) {
  const [selectedPlanName, setSelectedPlanName] = useState(initialPlanName);
  const [selectedSizeId, setSelectedSizeId] = useState("small");
  const [search, setSearch] = useState("");
  const selectedPlan =
    plans.find((plan) => plan.shortName === selectedPlanName) || plans[1];
  const selectedSize =
    premiumSizeOptions.find((size) => size.id === selectedSizeId) ||
    premiumSizeOptions[0];
  const monthlyPrice =
    selectedPlan.shortName === "Premium" ? selectedSize.monthly : selectedPlan.monthly;
  const searchTerm = normalizeSearch(search.trim());
  const visibleCategories = coverageCategories
    .map((category) => ({
      ...category,
      procedures: category.procedures.filter((procedure) => {
        const procedureName = typeof procedure === "string" ? procedure : procedure.name;
        if (selectedPlan.cat && /(Canin|Cinomose|Erliqu|Babes|Dirofil|Leishman|Bordetella|Adenovírus|V10|V7\/V8|Gripe)/i.test(procedureName)) return false;
        if (selectedPlan.cat && category.id === "servicos" && ["Limpeza de ouvido", "Locação de sala para atendimento volante"].includes(procedureName)) return false;
        if (
          selectedPlan.cat &&
          category.id === "estetica" &&
          ["Transporte mensalista", "Tosa higiênica", "Tosa na tesoura", "Desembolar", "Tosa de patinha", "Tosa na máquina"].includes(procedureName)
        ) return false;
        const searchable =
          typeof procedure === "string"
            ? procedure
            : `${procedure.name} ${procedure.detail}`;
        return normalizeSearch(searchable).includes(searchTerm);
      }),
    }))
    .filter((category) => category.procedures.length > 0);
  const visibleCount = visibleCategories.reduce(
    (total, category) => total + category.procedures.length,
    0,
  );
  const planMessage =
    selectedPlan.shortName === "Premium"
      ? `Olá, quero saber mais sobre o Plano Premium para um pet de porte ${selectedSize.label.toLowerCase()}.`
      : `Olá, quero saber mais sobre o ${selectedPlan.name}.`;

  useEffect(() => {
    setSelectedPlanName(initialPlanName);
  }, [initialPlanName]);

  const selectPlan = (planName) => {
    setSelectedPlanName(planName);
    const slug = planSlugByName[planName] || "premium";
    window.history.pushState(null, "", `/planos/${slug}`);
    window.dispatchEvent(new PopStateEvent("popstate"));
  };

  return (
    <>
      <section className="coverage-hero" id="cobertura">
        <Header />
        <div className="coverage-hero-shade" />
        <div className="container coverage-hero-content">
          <img src={`${ASSET}/petclub-logo.svg`} alt="Pet Club Cuidary" />
          <p>Planos disponíveis em Entre Rios de Minas e região</p>
          <h1>As maiores coberturas<br />para o seu pet</h1>
          <a href="#cobertura-detalhes">Conferir todos os benefícios <span>↓</span></a>
        </div>
      </section>

      <main className="coverage-main" id="cobertura-detalhes">
        <section className="coverage-intro container">
          <a className="coverage-back" href="/#planos">← Voltar para os planos</a>
          <div className="coverage-heading">
            <div>
              <p className="eyebrow">Cobertura Pet Club</p>
              <h2>Tudo o que você precisa saber, sem letras miúdas</h2>
            </div>
            <p>
              Escolha o plano, confira cada procedimento e veja com clareza o que está
              incluso, qual é o desconto e quando o benefício fica disponível.
            </p>
          </div>

          <div className="coverage-selector-card">
            <div className="coverage-plan-tabs" role="tablist" aria-label="Escolha o plano">
              {plans.map((plan) => (
                <button
                  className={selectedPlan.shortName === plan.shortName ? "active" : ""}
                  key={plan.shortName}
                  type="button"
                  role="tab"
                  aria-selected={selectedPlan.shortName === plan.shortName}
                  onClick={() => selectPlan(plan.shortName)}
                >
                  <span>Plano</span>
                  {plan.shortName}
                </button>
              ))}
            </div>

            <div className="coverage-plan-summary">
              <div>
                <span className="coverage-plan-kicker">Você está conferindo</span>
                <h3>{selectedPlan.name}</h3>
                {selectedPlan.cat ? (
                  <p>Quatro consultas generalistas, urgência, emergência e vacinas felinas estão inclusas. Banho mensal e corte de unhas também estão inclusos; os demais procedimentos têm 20% de desconto.</p>
                ) : selectedPlan.shortName === "Premium" ? (
                  <p>
                    Quatro consultas generalistas, urgência, emergência, Raiva, V10 e
                    Quíntupla estão inclusas. Na castração, somente o procedimento e a
                    anestesia estão inclusos após 180 dias; internação e medicamentos têm
                    20% de desconto.
                  </p>
                ) : (
                  <p>
                    Quatro consultas generalistas, urgência, emergência, Raiva, V10 e
                    Quíntupla estão inclusas. Especialistas e os demais procedimentos
                    têm {selectedPlan.procedureDiscount}% de desconto.
                  </p>
                )}
              </div>
              <div className="coverage-price">
                {selectedPlan.shortName === "Premium" && <small>a partir de</small>}
                <span>R$</span>
                <strong>{monthlyPrice}</strong>
                <em>/mês</em>
              </div>
              <a
                className="button coverage-hire"
                href={buildWhatsAppUrl(planMessage)}
                target="_blank"
                rel="noreferrer"
              >
                Quero este plano <FaWhatsapp aria-hidden="true" />
              </a>
            </div>

            {selectedPlan.shortName === "Premium" ? (
              <div className="premium-size-panel">
                <div className="premium-size-copy">
                  <span className="premium-label">Premium completo</span>
                  <h3>Qual é o porte do seu pet?</h3>
                  <p>O Premium inclui <strong>4 banhos por mês</strong>. Por isso, o valor acompanha o porte do cão.</p>
                </div>
                <div className="pet-size-options" role="radiogroup" aria-label="Porte do pet">
                  {premiumSizeOptions.map((size) => (
                    <button
                      className={`${size.id}${selectedSize.id === size.id ? " active" : ""}`}
                      key={size.id}
                      type="button"
                      role="radio"
                      aria-checked={selectedSize.id === size.id}
                      onClick={() => setSelectedSizeId(size.id)}
                    >
                      <span className="pet-size-copy">
                        <strong>{size.label}</strong>
                        <small>{size.hint}</small>
                        <b>R$ {size.monthly}/mês</b>
                      </span>
                      <span className="pet-size-image" aria-hidden="true">
                        <img src={`${ASSET}/${size.image}`} alt="" />
                      </span>
                      <span className="pet-size-selected" aria-hidden="true">✓</span>
                    </button>
                  ))}
                </div>
                <div className="premium-package-note">
                  <strong className="premium-package-title">
                    <img src={`${ASSET}/brand-heart.svg`} alt="" />
                    Seu pacote de estética
                  </strong>
                  <div className="premium-package-benefits">
                    <span><FaBath aria-hidden="true" />4 banhos por mês</span>
                    <span><FaCut aria-hidden="true" />Corte de unhas incluso</span>
                    <span><FaCalendarCheck aria-hidden="true" />Limpeza de ouvido inclusa</span>
                  </div>
                </div>
              </div>
            ) : selectedPlan.cat ? (
              <div className="premium-size-panel cat-premium-panel">
                <div className="premium-size-copy">
                  <span className="premium-label">Exclusivo para gatos</span>
                  <h3>Cat Premium</h3>
                  <p>Um plano pensado só para gatos, com <strong>valor único de R$ 117/mês</strong> e benefícios felinos sem mistura com os planos para cães.</p>
                </div>
                <div className="pet-size-options cat-only" aria-label="Plano exclusivo para gatos">
                  <div className="pet-size-cat-card">
                    <span className="pet-size-copy">
                      <strong>Gato</strong>
                      <small>valor único</small>
                      <b>R$ 117/mês</b>
                    </span>
                    <span className="pet-size-image" aria-hidden="true">
                      <img src={`${ASSET}/pet-size-cat.png`} alt="" />
                    </span>
                    <span className="pet-size-selected visible" aria-hidden="true">✓</span>
                  </div>
                </div>
                <div className="premium-package-note">
                  <strong className="premium-package-title">
                    <img src={`${ASSET}/brand-heart.svg`} alt="" />
                    Seu pacote de estética
                  </strong>
                  <div className="premium-package-benefits">
                    <span><FaBath aria-hidden="true" />1 banho por mês</span>
                    <span><FaCut aria-hidden="true" />1 corte de unhas</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="fixed-price-note">
                <span aria-hidden="true">✓</span>
                <div>
                  <strong>Preço único para qualquer porte</strong>
                  <p>O valor deste plano não muda conforme o tamanho do pet.</p>
                </div>
              </div>
            )}
          </div>
        </section>

        <section className="coverage-details container">
          <div
            className={
              selectedPlan.shortName === "Premium" || selectedPlan.cat
                ? "coverage-waiting premium-waiting"
                : "coverage-waiting"
            }
          >
            <div className="coverage-waiting-heading">
              <p className="eyebrow">Benefícios inclusos</p>
              <h2>Carências simples de entender</h2>
              <p>Consultas com especialistas e todos os procedimentos com desconto podem ser usados sem carência.</p>
            </div>
            <div className="coverage-waiting-grid">
              <article>
                <span>01</span>
                <strong>4 consultas generalistas selecionadas</strong>
                <b>45 dias</b>
              </article>
              <article>
                <span>02</span>
                <strong>Plantão, urgência e emergência</strong>
                <b>30 dias</b>
              </article>
              <article>
                <span>03</span>
                <strong>{selectedPlan.cat ? "Raiva e vacinas felinas" : "Raiva, V10 e Quíntupla"}</strong>
                <b>60 dias</b>
              </article>
              {(selectedPlan.shortName === "Premium" || selectedPlan.cat) && (
                <article className="castration-waiting-card">
                  <span>{selectedPlan.cat ? "04 • CAT PREMIUM" : "04 • PREMIUM"}</span>
                  <strong>Castração: procedimento + anestesia inclusos</strong>
                  <b>180 dias</b>
                  <small>Internação e medicamentos: 20% OFF</small>
                </article>
              )}
            </div>
          </div>

          <div className="coverage-list-heading">
            <div>
              <p className="eyebrow">Lista completa</p>
              <h2>Confira os {coverageCategories.reduce((sum, item) => sum + item.procedures.length, 0)} procedimentos</h2>
            </div>
            <label className="coverage-search">
              <span aria-hidden="true">⌕</span>
              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Buscar exame ou procedimento"
                aria-label="Buscar exame ou procedimento"
              />
            </label>
          </div>

          <div className="coverage-legend" aria-label="Legenda da cobertura">
            <span><i className="included" /> Incluso com carência</span>
            <span><i className="discount" /> {selectedPlan.procedureDiscount}% de desconto sem carência</span>
            <b>{visibleCount} {visibleCount === 1 ? "resultado" : "resultados"}</b>
          </div>

          <div className="coverage-accordions">
            {visibleCategories.map((category) => (
              <details className="coverage-accordion" key={category.id}>
                <summary>
                  <div>
                    <strong>{category.title}</strong>
                    <span>{category.description}</span>
                  </div>
                  <b>{category.procedures.length}</b>
                  <i aria-hidden="true" />
                </summary>
                <div className={`coverage-table-wrap ${category.id === "estetica" ? "aesthetic-table" : ""}`}>
                  <table>
                    <thead>
                      {category.id === "estetica" ? (
                        <tr><th>Serviço</th><th>Seu benefício</th></tr>
                      ) : (
                        <tr>
                          <th>Procedimento</th>
                          <th>Seu benefício</th>
                          <th>Carência</th>
                        </tr>
                      )}
                    </thead>
                    <tbody>
                      {category.procedures.map((procedure) => (
                        <CoverageBenefit
                          category={category}
                          key={
                            typeof procedure === "string"
                              ? procedure
                              : `${procedure.name}-${procedure.detail}`
                          }
                          procedure={procedure}
                          plan={selectedPlan}
                        />
                      ))}
                    </tbody>
                  </table>
                </div>
              </details>
            ))}
            {visibleCategories.length === 0 && (
              <div className="coverage-empty">
                <strong>Nenhum procedimento encontrado.</strong>
                <p>Tente buscar por outro termo ou limpe o campo de pesquisa.</p>
                <button type="button" onClick={() => setSearch("")}>Limpar busca</button>
              </div>
            )}
          </div>

          <div className="coverage-disclaimer">
            <strong>Importante</strong>
            <p>
              A indicação de exames e procedimentos depende de avaliação veterinária.
              Benefícios, regras de utilização e disponibilidade devem ser confirmados
              no regulamento do Pet Club no momento da contratação.
            </p>
          </div>
          {!selectedPlan.cat && <PlanComparison />}
        </section>
      </main>
      <Footer />
    </>
  );
}


function SeoLandingPage({ page }) {
  const related = seoPages.filter((item) => item.slug !== page.slug).slice(0, 6);
  return (
    <>
      <section className="seo-page-hero">
        <Header />
        <div className="container seo-page-hero-inner">
          <nav className="seo-breadcrumb" aria-label="Breadcrumb">
            <a href="/">Início</a><span>›</span><span>{page.h1}</span>
          </nav>
          <p className="eyebrow">Cuidary • Entre Rios de Minas</p>
          <h1>{page.h1}</h1>
          <p className="seo-lead">{page.lead}</p>
          <div className="seo-hero-actions">
            <a className="button whatsapp" href={WHATSAPP_URL} target="_blank" rel="noreferrer"><FaWhatsapp aria-hidden="true" /> Falar no WhatsApp</a>
            <a className="button maps" href={GOOGLE_MAPS_URL} target="_blank" rel="noreferrer"><FaMapMarkerAlt aria-hidden="true" /> Como chegar</a>
          </div>
        </div>
      </section>
      <main className="seo-page-main">
        <div className="container seo-content-grid">
          <article className="seo-article">
            {page.sections.map(([heading, body]) => (
              <section key={heading}><h2>{heading}</h2><p>{body}</p></section>
            ))}
            <aside className="seo-local-box">
              <strong>Cuidary • Hospital Veterinário 24 horas</strong>
              <p>{ADDRESS}</p>
              <a href={WHATSAPP_URL} target="_blank" rel="noreferrer">WhatsApp: +55 31 9911-6515</a>
            </aside>
            <section className="seo-faq">
              <p className="eyebrow">Perguntas frequentes</p>
              <h2>Dúvidas rápidas</h2>
              {page.faq.map(([question, answer]) => (
                <details key={question}><summary>{question}</summary><p>{answer}</p></details>
              ))}
            </section>
          </article>
          <aside className="seo-sidebar">
            <strong>Serviços relacionados</strong>
            {related.map((item) => <a href={`/${item.slug}`} key={item.slug}>{item.h1}</a>)}
            <a className="seo-plan-link" href="/planos/premium">Conhecer o Pet Club</a>
          </aside>
        </div>
      </main>
      <Footer />
    </>
  );
}

function TeamSeoPage({ page }) {
  return (
    <>
      <section className="seo-page-hero team-seo-hero">
        <Header />
        <div className="container seo-page-hero-inner">
          <nav className="seo-breadcrumb" aria-label="Breadcrumb"><a href="/">Início</a><span>›</span><a href="/#equipe">Equipe</a><span>›</span><span>{page.name}</span></nav>
          <p className="eyebrow">Equipe Cuidary</p>
          <h1>{page.name}</h1>
          <p className="seo-lead">{page.role}{page.credential ? ` • ${page.credential}` : ""}</p>
        </div>
      </section>
      <main className="seo-page-main">
        <div className="container seo-team-profile">
          <article>
            <h2>Atendimento na Cuidary</h2>
            <p>{page.name} integra a equipe da Cuidary em Entre Rios de Minas. Esta página reúne as informações profissionais publicadas pelo hospital.</p>
            {page.credential && <p><strong>Registro informado:</strong> {page.credential}</p>}
            <a className="button whatsapp" href={WHATSAPP_URL} target="_blank" rel="noreferrer"><FaWhatsapp aria-hidden="true" /> Falar com a equipe</a>
          </article>
        </div>
      </main>
      <Footer />
    </>
  );
}

function Testimonials() {
  return (
    <section className="testimonials" id="depoimentos">
      <div className="container testimonials-heading">
        <p className="eyebrow">Depoimentos</p>
        <h2>Quem ama e assina embaixo</h2>
        <p>Histórias reais de tutores que amam e cuidam dos seus pets como se fossem filhos.</p>
      </div>
      <AutoCarousel
        items={testimonials}
        type="testimonial"
        label="Depoimentos em apresentação automática"
      />
    </section>
  );
}

function FAQ() {
  return (
    <section className="faq-section" id="contato">
      <div className="container faq-grid">
        <div className="faq-copy">
          <h2>Tem dúvidas ou precisa de ajuda?</h2>
          <p>
            Nossos veterinários estão sempre a sua disposição. Clique no botão abaixo e
            fale agora com um veterinário de plantão.
          </p>
          <div className="faq-actions">
            <a className="button whatsapp" href={WHATSAPP_URL} target="_blank" rel="noreferrer">
              <FaWhatsapp aria-hidden="true" /> Falar no WhatsApp
            </a>
            <a className="button maps" href={GOOGLE_MAPS_URL} target="_blank" rel="noreferrer">
              <FaMapMarkerAlt aria-hidden="true" /> Google Maps
            </a>
            <a className="button waze" href={WAZE_URL} target="_blank" rel="noreferrer">
              <SiWaze aria-hidden="true" /> Waze
            </a>
          </div>
        </div>
        <div className="accordion">
          {faqs.map(([question, answer]) => (
            <details key={question}>
              <summary>{question}</summary>
              <p>{answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function SeoDiscovery() {
  const featuredPages = seoPages.slice(0, 8);
  return (
    <section className="seo-discovery">
      <div className="container">
        <p className="eyebrow">Informações úteis</p>
        <h2>Saúde veterinária em Entre Rios de Minas</h2>
        <p className="seo-discovery-intro">
          Conteúdos diretos sobre atendimento, prevenção e serviços veterinários da Cuidary.
        </p>
        <div className="seo-discovery-grid">
          {featuredPages.map((page) => (
            <a href={`/${page.slug}`} key={page.slug}>
              <strong>{page.h1}</strong>
              <span>Ver informações</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const [status, setStatus] = useState("");
  const footerLinks = [
    ["Início", "/#inicio"],
    ["Hospital", "/#hospital"],
    ["Estrutura", "/#estrutura"],
    ["Serviços", "/#servicos"],
    ["Equipe", "/#equipe"],
    ["Especialidades", "/#especialidades"],
    ["Planos Pet Club", "/#planos"],
    ["Cobertura dos planos", "/planos/premium"],
    ["Depoimentos", "/#depoimentos"],
    ["Dúvidas e contato", "/#contato"],
  ];
  const socialLinks = [
    { label: "Instagram", href: INSTAGRAM_URL, icon: FaInstagram },
    { label: "WhatsApp", href: WHATSAPP_URL, icon: FaWhatsapp },
  ];

  function subscribe(event) {
    event.preventDefault();
    setStatus("Cadastro realizado. Obrigado!");
    event.currentTarget.reset();
  }

  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <Logo className="footer-logo" />
          <p>Inscreva-se para receber as novidades!</p>
          <form onSubmit={subscribe}>
            <input type="email" required placeholder="Seu e-mail" aria-label="Seu e-mail" />
            <button type="submit">Inscrever <span aria-hidden="true">›</span></button>
          </form>
          <div className="subscribe-status" role="status">{status}</div>
          <div className="socials">
            {socialLinks.map(({ label, href, icon: Icon }) => (
              <a href={href} aria-label={label} key={label} target="_blank" rel="noreferrer">
                <Icon aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>
        <div className="footer-contact">
          <h3>Contatos</h3>
          <a className="contact-item" href={GOOGLE_MAPS_URL} target="_blank" rel="noreferrer">
            <FaMapMarkerAlt aria-hidden="true" />
            <span><strong>Endereço</strong>{ADDRESS}</span>
          </a>
          <a className="contact-item" href={WHATSAPP_URL} target="_blank" rel="noreferrer">
            <FaWhatsapp aria-hidden="true" />
            <span><strong>WhatsApp</strong>+55 31 9911-6515</span>
          </a>
          <div className="contact-item">
            <FaBuilding aria-hidden="true" />
            <span><strong>CNPJ</strong>{CNPJ}</span>
          </div>
        </div>
        <nav className="footer-navigation" aria-label="Navegação do rodapé">
          <h3>Navegação</h3>
          <div className="footer-links">
            {footerLinks.map(([label, href]) => (
              <a href={href} key={label}>{label}</a>
            ))}
          </div>
        </nav>
        <div className="payments">
          <h3>Meios de pagamento</h3>
          <img src={`${ASSET}/payments-row-1.svg`} alt="Visa, Elo e Mastercard" />
          <img src={`${ASSET}/payments-row-2.svg`} alt="PayPal, Diners Club e American Express" />
          <strong className="secure-payment"><FaShieldAlt aria-hidden="true" /> Compra segura</strong>
        </div>
      </div>
      <div className="copyright">
        © {new Date().getFullYear()} Hospital Veterinário Cuidary. Todos os direitos reservados.
      </div>
    </footer>
  );
}

function FloatingWhatsApp() {
  return (
    <a
      className="floating-whatsapp"
      href={WHATSAPP_URL}
      target="_blank"
      rel="noreferrer"
      aria-label="Falar com a Cuidary pelo WhatsApp"
      title="Falar no WhatsApp"
    >
      <FaWhatsapp aria-hidden="true" />
    </a>
  );
}

export default function App() {
  const [locationKey, setLocationKey] = useState(`${window.location.pathname}${window.location.search}${window.location.hash}`);
  const route = window.location.hash || "#inicio";
  const pathname = window.location.pathname.replace(/\/+$/, "") || "/";

  useEffect(() => {
    const sync = () => setLocationKey(`${window.location.pathname}${window.location.search}${window.location.hash}`);
    window.addEventListener("hashchange", sync);
    window.addEventListener("popstate", sync);
    return () => {
      window.removeEventListener("hashchange", sync);
      window.removeEventListener("popstate", sync);
    };
  }, []);

  const planEntry = Object.entries(planSeo).find(([slug]) => pathname === `/planos/${slug}`);
  const seoPage = seoPages.find((page) => pathname === `/${page.slug}`);
  const teamPage = teamPages.find((page) => pathname === `/${page.slug}`);

  let metadata = {
    title: "Cuidary | Hospital Veterinário 24 Horas em Entre Rios de Minas",
    description: "Hospital veterinário 24 horas em Entre Rios de Minas com consultas, urgência, emergência, exames, cirurgia, internação e banho e tosa.",
    path: "/",
    schema: [veterinarySchema("/")],
  };

  if (seoPage) {
    const path = `/${seoPage.slug}`;
    metadata = {
      title: seoPage.title, description: seoPage.description, path,
      schema: [
        veterinarySchema(path),
        {
          "@context": "https://schema.org", "@type": "FAQPage",
          mainEntity: seoPage.faq.map(([question, answer]) => ({
            "@type": "Question", name: question,
            acceptedAnswer: { "@type": "Answer", text: answer },
          })),
        },
      ],
    };
  } else if (teamPage) {
    const path = `/${teamPage.slug}`;
    metadata = {
      title: teamPage.title, description: teamPage.description, path,
      schema: [
        veterinarySchema(path),
        {
          "@context": "https://schema.org", "@type": "Person",
          name: teamPage.name, jobTitle: teamPage.role,
          worksFor: { "@type": "VeterinaryCare", name: "Cuidary - Hospital Veterinário 24 horas" },
        },
      ],
    };
  } else if (planEntry) {
    const [slug, page] = planEntry;
    const path = `/planos/${slug}`;
    metadata = {
      title: page.title, description: page.description, path,
      schema: [
        veterinarySchema(path),
        {
          "@context": "https://schema.org", "@type": "Service", name: page.name,
          provider: { "@type": "VeterinaryCare", name: "Cuidary - Hospital Veterinário 24 horas" },
          areaServed: { "@type": "City", name: "Entre Rios de Minas" },
          url: `${SEO_BASE_URL}${path}`,
        },
      ],
    };
  }

  useSeoMetadata(metadata);

  useEffect(() => {
    if (pathname !== "/") return undefined;
    const targetId = route.replace("#", "").split("?")[0];
    const frame = window.requestAnimationFrame(() => {
      document.getElementById(targetId)?.scrollIntoView({ block: "start" });
    });
    return () => window.cancelAnimationFrame(frame);
  }, [locationKey, pathname, route]);

  if (planEntry) return <><CoveragePage initialPlanName={planEntry[1].planName} /><FloatingWhatsApp /></>;
  if (seoPage) return <><SeoLandingPage page={seoPage} /><FloatingWhatsApp /></>;
  if (teamPage) return <><TeamSeoPage page={teamPage} /><FloatingWhatsApp /></>;

  if (route.startsWith("#cobertura")) {
    const planParam = new URLSearchParams(route.split("?")[1] || "").get("plano");
    const initialPlanName = plans.find((plan) => plan.shortName.toLowerCase() === planParam)?.shortName || "Premium";
    return <><CoveragePage initialPlanName={initialPlanName} /><FloatingWhatsApp /></>;
  }

  return (
    <>
      <Hero />
      <main>
        <Structure /><Services /><CareBanner /><Team /><Club /><Testimonials /><FAQ /><SeoDiscovery />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}

