'use strict';

/* ============================================================
   CONFIG — único lugar del código donde viven los datos
   pendientes del negocio. Editar aquí, nunca en el HTML.
   ============================================================ */
const CONFIG = {
  marca: {
    nombre: 'loopi',
    tagline: 'BEST LUMPIAS IN TOWN',
    ciudad: 'Caracas, Venezuela',
  },

  // PENDIENTE: reemplazar por el número real, formato 58 + código de área + número, sin "+", sin espacios.
  whatsapp: {
    numero: '58XXXXXXXXXX',
  },

  instagram: {
    handle: '@loopi.ccs',
    url: 'https://www.instagram.com/loopi.ccs',
  },

  contacto: {
    // PENDIENTE: dirección exacta del local o punto de despacho.
    direccion: 'PENDIENTE — dirección del local / punto de despacho en Caracas',
    // PENDIENTE: horario real de atención.
    horario: 'PENDIENTE — ej. Lun a Sáb, 9:00am a 6:00pm',
    // PENDIENTE: zonas de Caracas donde se hace delivery.
    zonaDelivery: 'PENDIENTE — ej. Caracas (Este, Centro, Los Palos Grandes...)',
    // PENDIENTE: métodos de pago aceptados.
    metodosPago: 'PENDIENTE — ej. Pago móvil, Zelle, Efectivo',
    // PENDIENTE: correo de contacto (opcional).
    email: 'PENDIENTE — correo de contacto',
    // PENDIENTE: pegar aquí el URL del iframe "src" de Google Maps si hay local físico. Dejar vacío si no aplica.
    mapsEmbedUrl: '',
  },

  // PENDIENTE: precios en USD. $-- se muestra mientras estén en null.
  precios: {
    caja12: null,
    caja24: null,
  },
};

/* ============================================================
   MENU — catálogo de sabores. Agregar un sabor nuevo es
   agregar una línea aquí; el HTML se genera solo.
   ============================================================ */
const MENU_BASE = [
  {
    id: 'vegetales',
    nombre: 'Vegetales',
    categoria: 'salado',
    descripcion: 'La clásica. Vegetales salteados, crunchy por fuera.',
    img: './img/productos/vegetales.webp',
    badge: null,
  },
  {
    id: 'carbonara',
    nombre: 'Carbonara',
    categoria: 'salado',
    descripcion: 'Cremosa, con tocineta y queso.',
    img: './img/productos/carbonara.webp',
    badge: 'La más pedida',
  },
  {
    id: 'pollo-curry',
    nombre: 'Pollo al Curry',
    categoria: 'salado',
    descripcion: 'Pollo especiado con un toque de curry suave.',
    img: './img/productos/pollo-curry.webp',
    badge: null,
  },
  {
    id: 'funghi',
    nombre: 'Funghi',
    categoria: 'salado',
    descripcion: 'Hongos salteados y queso cremoso.',
    img: './img/productos/funghi.webp',
    badge: null,
  },
  {
    id: 'morcilla-carupanera',
    nombre: 'Morcilla Carupanera',
    categoria: 'salado',
    descripcion: 'Morcilla de Carúpano. Sabor venezolano de verdad.',
    img: './img/productos/morcilla-carupanera.webp',
    badge: 'La local',
  },
  {
    id: 'salted-caramel',
    nombre: 'Salted Caramel',
    categoria: 'postre',
    descripcion: 'Caramelo salado, dulce con carácter.',
    img: './img/productos/salted-caramel.webp',
    badge: null,
  },
  {
    id: 'nutella',
    nombre: 'Nutella',
    categoria: 'postre',
    descripcion: 'Nutella tibia y derretida por dentro.',
    img: './img/productos/nutella.webp',
    badge: null,
  },
];

const MENU = MENU_BASE.map((item) => ({
  ...item,
  precio12: CONFIG.precios.caja12,
  precio24: CONFIG.precios.caja24,
}));

/* ============================================================
   Helpers
   ============================================================ */
function formatPrecio(valor) {
  return valor === null || valor === undefined ? '$--' : `$${valor}`;
}

function buildWhatsAppUrl(mensaje) {
  return `https://wa.me/${CONFIG.whatsapp.numero}?text=${encodeURIComponent(mensaje)}`;
}

function mensajeProducto(nombre, tamano) {
  return `Hola loopi! 👋 Quiero pedir una cajita de *${tamano} mini lumpias de ${nombre}*. ¿Está disponible?`;
}

function mensajeGenerico() {
  return `Hola loopi! 👋 Quiero hacer un pedido de mini lumpias.`;
}

function mensajePedido(tamano, items, total) {
  const lineas = items
    .filter((i) => i.cantidad > 0)
    .map((i) => `• ${i.cantidad}x Cajita de ${tamano} — ${i.nombre}`)
    .join('\n');
  return `Hola loopi! 👋 Quiero hacer este pedido:\n\n${lineas}\n\nTotal estimado: ${formatPrecio(total)}\n\n¿Me confirman disponibilidad?`;
}

/* ============================================================
   Iconos SVG inline (sin font-icons, sin imágenes)
   ============================================================ */
const ICONS = {
  whatsapp: `<svg viewBox="0 0 32 32" fill="currentColor" aria-hidden="true"><path d="M16.02 3C9.4 3 4 8.4 4 15.02c0 2.36.68 4.55 1.86 6.4L4 29l7.76-1.83a11.9 11.9 0 0 0 4.26.78h.01c6.63 0 12.02-5.4 12.02-12.02C28.05 8.4 22.65 3 16.02 3Zm0 21.86h-.01a9.8 9.8 0 0 1-5-1.37l-.36-.21-4.6 1.09 1.11-4.48-.24-.37a9.75 9.75 0 0 1-1.5-5.2c0-5.4 4.4-9.8 9.8-9.8 2.62 0 5.08 1.02 6.93 2.87a9.72 9.72 0 0 1 2.87 6.93c0 5.4-4.4 9.54-9.8 9.54Zm5.37-7.34c-.29-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.29-.77.96-.94 1.16-.17.2-.35.22-.64.07-.29-.15-1.23-.45-2.34-1.44-.87-.77-1.45-1.72-1.62-2.01-.17-.29-.02-.45.13-.6.13-.13.29-.34.44-.51.15-.17.2-.29.29-.49.1-.2.05-.37-.02-.51-.07-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.51.07-.78.37-.27.29-1.02 1-1.02 2.44s1.05 2.83 1.2 3.03c.15.2 2.06 3.15 5 4.42.7.3 1.24.48 1.67.61.7.22 1.34.19 1.84.12.56-.08 1.75-.71 2-1.4.25-.68.25-1.27.17-1.4-.07-.12-.26-.2-.55-.34Z"/></svg>`,
  instagram: `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2.2c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.72 3.72 0 0 1-1.38-.9 3.72 3.72 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.2 15.58 2.2 15.2 2.2 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.2 8.8 2.2 12 2.2Zm0 1.8c-3.15 0-3.5.01-4.73.07-.96.04-1.48.2-1.83.34-.46.18-.79.39-1.13.74-.35.34-.56.67-.74 1.13-.14.35-.3.87-.34 1.83C3.17 8.5 3.16 8.85 3.16 12s.01 3.5.07 4.73c.04.96.2 1.48.34 1.83.18.46.39.79.74 1.13.34.35.67.56 1.13.74.35.14.87.3 1.83.34 1.23.06 1.58.07 4.73.07s3.5-.01 4.73-.07c.96-.04 1.48-.2 1.83-.34.46-.18.79-.39 1.13-.74.35-.34.56-.67.74-1.13.14-.35.3-.87.34-1.83.06-1.23.07-1.58.07-4.73s-.01-3.5-.07-4.73c-.04-.96-.2-1.48-.34-1.83a3.02 3.02 0 0 0-.74-1.13 3.02 3.02 0 0 0-1.13-.74c-.35-.14-.87-.3-1.83-.34C15.5 4.01 15.15 4 12 4Zm0 3.65A4.35 4.35 0 1 1 7.65 12 4.35 4.35 0 0 1 12 7.65Zm0 1.8A2.55 2.55 0 1 0 14.55 12 2.55 2.55 0 0 0 12 9.45Zm4.5-2.02a1.02 1.02 0 1 1-1.02-1.02 1.02 1.02 0 0 1 1.02 1.02Z"/></svg>`,
  menu: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" aria-hidden="true"><path d="M4 6h16M4 12h16M4 18h16"/></svg>`,
  close: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" aria-hidden="true"><path d="M5 5l14 14M19 5L5 19"/></svg>`,
  plus: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg>`,
  minus: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" aria-hidden="true"><path d="M5 12h14"/></svg>`,
  paso1: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 6h16M4 12h10M4 18h7"/></svg>`,
  paso2: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5Z"/></svg>`,
  paso3: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 7l1-3h11l1 3M3 7h13m-13 0v9a1 1 0 0 0 1 1h1m11-10v10h-8m8-10 4 4v6h-4M6 20a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm10 0a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"/></svg>`,
};

/* ============================================================
   Render del header / nav
   ============================================================ */
function initHeader() {
  const header = document.querySelector('.header');
  const onScroll = () => {
    header.classList.toggle('header--scrolled', window.scrollY > 40);
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  const toggleBtn = document.querySelector('.header__hamburger');
  const mobileNav = document.querySelector('.mobile-nav');
  const closeBtn = document.querySelector('.mobile-nav__close');

  const openMenu = () => {
    mobileNav.classList.add('is-open');
    toggleBtn.setAttribute('aria-expanded', 'true');
    document.body.classList.add('no-scroll');
  };
  const closeMenu = () => {
    mobileNav.classList.remove('is-open');
    toggleBtn.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('no-scroll');
  };

  toggleBtn.addEventListener('click', openMenu);
  closeBtn.addEventListener('click', closeMenu);
  mobileNav.querySelectorAll('a').forEach((a) => a.addEventListener('click', closeMenu));
}

/* ============================================================
   Botones de WhatsApp genéricos (hero, header, flotante, footer)
   ============================================================ */
function initBotonesGenericos() {
  document.querySelectorAll('[data-wa-generico]').forEach((el) => {
    el.setAttribute('href', buildWhatsAppUrl(mensajeGenerico()));
  });
}

/* ============================================================
   Menú de sabores — toggle 12/24 + tarjetas
   ============================================================ */
const stateMenu = { tamano: 12 };

function renderTarjetaMenu(item) {
  const badgeHtml = item.badge ? `<span class="card__badge">${item.badge}</span>` : '';
  return `
    <article class="card" data-id="${item.id}">
      ${badgeHtml}
      <img class="card__img" src="${item.img}" alt="Mini lumpias sabor ${item.nombre}: ${item.descripcion}" width="900" height="900" loading="lazy" decoding="async">
      <div class="card__body">
        <h3 class="card__title">${item.nombre}</h3>
        <p class="card__desc">${item.descripcion}</p>
        <p class="card__precio" data-precio>${formatPrecio(stateMenu.tamano === 12 ? item.precio12 : item.precio24)}</p>
        <a class="btn btn--whatsapp" data-wa-item target="_blank" rel="noopener" href="#" aria-label="Pedir ${item.nombre} por WhatsApp">
          ${ICONS.whatsapp}
          <span>Pedir por WhatsApp</span>
        </a>
      </div>
    </article>`;
}

function renderMenu() {
  const salados = MENU.filter((m) => m.categoria === 'salado');
  const postres = MENU.filter((m) => m.categoria === 'postre');
  document.querySelector('#grid-salados').innerHTML = salados.map(renderTarjetaMenu).join('');
  document.querySelector('#grid-postres').innerHTML = postres.map(renderTarjetaMenu).join('');
  actualizarPreciosYLinks();
}

function actualizarPreciosYLinks() {
  document.querySelectorAll('.card').forEach((card) => {
    const item = MENU.find((m) => m.id === card.dataset.id);
    const precio = stateMenu.tamano === 12 ? item.precio12 : item.precio24;
    card.querySelector('[data-precio]').textContent = formatPrecio(precio);
    card.querySelector('[data-wa-item]').setAttribute(
      'href',
      buildWhatsAppUrl(mensajeProducto(item.nombre, stateMenu.tamano))
    );
  });
}

function initToggleTamano() {
  const botones = document.querySelectorAll('.size-toggle__btn');
  botones.forEach((btn) => {
    btn.addEventListener('click', () => {
      stateMenu.tamano = Number(btn.dataset.tamano);
      botones.forEach((b) => b.classList.toggle('is-active', b === btn));
      botones.forEach((b) => b.setAttribute('aria-pressed', String(b === btn)));
      actualizarPreciosYLinks();
    });
  });
}

/* ============================================================
   Arma tu pedido — configurador en memoria (sin backend, sin localStorage)
   ============================================================ */
const statePedido = {
  tamano: 12,
  cantidades: Object.fromEntries(MENU.map((m) => [m.id, 0])),
};

function precioUnitario(item) {
  const valor = statePedido.tamano === 12 ? item.precio12 : item.precio24;
  return valor === null || valor === undefined ? 0 : valor;
}

function renderConfigurador() {
  const cont = document.querySelector('#lista-configurador');
  cont.innerHTML = MENU.map((item) => {
    const cantidad = statePedido.cantidades[item.id];
    return `
      <div class="config-row" data-id="${item.id}">
        <img class="config-row__img" src="${item.img}" alt="" width="64" height="64" loading="lazy">
        <div class="config-row__info">
          <p class="config-row__nombre">${item.nombre}</p>
          <p class="config-row__precio">${formatPrecio(statePedido.tamano === 12 ? item.precio12 : item.precio24)} c/u</p>
        </div>
        <div class="config-row__stepper">
          <button type="button" class="stepper__btn" data-accion="menos" aria-label="Quitar una cajita de ${item.nombre}">${ICONS.minus}</button>
          <span class="stepper__cantidad" data-cantidad>${cantidad}</span>
          <button type="button" class="stepper__btn" data-accion="mas" aria-label="Agregar una cajita de ${item.nombre}">${ICONS.plus}</button>
        </div>
      </div>`;
  }).join('');
  actualizarTotalPedido();
}

function actualizarTotalPedido() {
  let total = 0;
  let unidades = 0;
  MENU.forEach((item) => {
    const cant = statePedido.cantidades[item.id];
    total += cant * precioUnitario(item);
    unidades += cant;
  });
  document.querySelector('#config-total').textContent = formatPrecio(CONFIG.precios.caja12 === null ? null : total);
  document.querySelector('#config-unidades').textContent = String(unidades);

  const btnPedir = document.querySelector('#config-btn-whatsapp');
  const items = MENU.map((item) => ({ nombre: item.nombre, cantidad: statePedido.cantidades[item.id] }));
  const hayItems = unidades > 0;
  btnPedir.classList.toggle('is-disabled', !hayItems);
  btnPedir.setAttribute('aria-disabled', String(!hayItems));
  btnPedir.setAttribute(
    'href',
    hayItems ? buildWhatsAppUrl(mensajePedido(statePedido.tamano, items, total)) : '#'
  );
}

function initConfigurador() {
  renderConfigurador();

  document.querySelectorAll('.config-size-toggle .size-toggle__btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      statePedido.tamano = Number(btn.dataset.tamano);
      document
        .querySelectorAll('.config-size-toggle .size-toggle__btn')
        .forEach((b) => b.classList.toggle('is-active', b === btn));
      renderConfigurador();
    });
  });

  document.querySelector('#lista-configurador').addEventListener('click', (e) => {
    const btn = e.target.closest('.stepper__btn');
    if (!btn) return;
    const row = btn.closest('.config-row');
    const id = row.dataset.id;
    const delta = btn.dataset.accion === 'mas' ? 1 : -1;
    statePedido.cantidades[id] = Math.max(0, statePedido.cantidades[id] + delta);
    row.querySelector('[data-cantidad]').textContent = String(statePedido.cantidades[id]);
    actualizarTotalPedido();
  });

  document.querySelector('#config-btn-whatsapp').addEventListener('click', (e) => {
    if (e.currentTarget.classList.contains('is-disabled')) e.preventDefault();
  });
}

/* ============================================================
   Instagram — bloque fijo (handle + link) e íconos flotantes
   ============================================================ */
function initInstagram() {
  document.querySelectorAll('[data-ig-link]').forEach((el) => {
    el.setAttribute('href', CONFIG.instagram.url);
  });
  document.querySelectorAll('[data-ig-handle]').forEach((el) => {
    el.textContent = CONFIG.instagram.handle;
  });
}

/* ============================================================
   Contacto — datos + mapa condicional
   ============================================================ */
function initContacto() {
  document.querySelector('#dato-direccion').textContent = CONFIG.contacto.direccion;
  document.querySelector('#dato-horario').textContent = CONFIG.contacto.horario;
  document.querySelector('#dato-delivery').textContent = CONFIG.contacto.zonaDelivery;
  document.querySelector('#dato-pago').textContent = CONFIG.contacto.metodosPago;
  document.querySelector('#dato-whatsapp').textContent = `+${CONFIG.whatsapp.numero}`;
  document.querySelector('#dato-whatsapp').setAttribute('href', buildWhatsAppUrl(mensajeGenerico()));
  document.querySelector('#dato-email').textContent = CONFIG.contacto.email;

  const mapWrap = document.querySelector('#mapa-wrap');
  if (CONFIG.contacto.mapsEmbedUrl) {
    mapWrap.innerHTML = `<iframe src="${CONFIG.contacto.mapsEmbedUrl}" loading="lazy" referrerpolicy="no-referrer-when-downgrade" title="Ubicación de loopi en el mapa" width="100%" height="100%" style="border:0"></iframe>`;
  } else {
    mapWrap.innerHTML = `<div class="mapa-pendiente"><p>Mapa pendiente — agrega la dirección y el link de Google Maps en <code>CONFIG.contacto</code>.</p></div>`;
  }
}

/* ============================================================
   Footer — año dinámico
   ============================================================ */
function initFooter() {
  document.querySelector('#footer-anio').textContent = String(new Date().getFullYear());
  document.querySelector('#footer-telefono').textContent = `+${CONFIG.whatsapp.numero}`;
  document.querySelector('#footer-telefono').setAttribute('href', buildWhatsAppUrl(mensajeGenerico()));
  document.querySelector('#footer-email').textContent = CONFIG.contacto.email;
}

/* ============================================================
   Scroll suave compensando header sticky
   ============================================================ */
function initScrollSuave() {
  const header = document.querySelector('.header');
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const id = link.getAttribute('href');
      if (id.length <= 1) return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      const offset = header.offsetHeight + 12;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
    });
  });
}

/* ============================================================
   Animaciones de entrada (IntersectionObserver, sin librerías)
   ============================================================ */
function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function initRevealOnScroll() {
  const targets = document.querySelectorAll('[data-reveal]');
  if (prefersReducedMotion()) {
    targets.forEach((el) => el.classList.add('is-visible'));
    return;
  }
  const obs = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
  );
  targets.forEach((el) => obs.observe(el));
}

/* ============================================================
   JSON-LD FoodEstablishment — generado desde CONFIG
   ============================================================ */
function initJsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'FoodEstablishment',
    name: CONFIG.marca.nombre,
    servesCuisine: 'Lumpias, comida venezolana',
    address: {
      '@type': 'PostalAddress',
      streetAddress: CONFIG.contacto.direccion,
      addressLocality: 'Caracas',
      addressCountry: 'VE',
    },
    telephone: `+${CONFIG.whatsapp.numero}`,
    openingHours: CONFIG.contacto.horario,
    priceRange: '$$',
    url: window.location.href,
    sameAs: [CONFIG.instagram.url],
  };
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.textContent = JSON.stringify(data);
  document.head.appendChild(script);
}

/* ============================================================
   Pantalla de carga — se oculta cuando la página termina de
   cargar (evento load), con un mínimo visible para que no
   parpadee en conexiones rápidas.
   ============================================================ */
function initPreloader() {
  const el = document.querySelector('#preloader');
  if (!el) return;
  document.body.classList.add('no-scroll');

  const MIN_VISIBLE_MS = 500;
  const inicio = performance.now();

  const ocultar = () => {
    const restante = Math.max(0, MIN_VISIBLE_MS - (performance.now() - inicio));
    setTimeout(() => {
      el.classList.add('is-hidden');
      document.body.classList.remove('no-scroll');
      el.addEventListener('transitionend', () => el.remove(), { once: true });
    }, restante);
  };

  if (document.readyState === 'complete') {
    ocultar();
  } else {
    window.addEventListener('load', ocultar, { once: true });
  }
}

initPreloader();

/* ============================================================
   Init general
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  initHeader();
  initBotonesGenericos();
  renderMenu();
  initToggleTamano();
  initConfigurador();
  initInstagram();
  initContacto();
  initFooter();
  initScrollSuave();
  initRevealOnScroll();
  initJsonLd();
});
