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

  whatsapp: {
    numero: '584223332505',
  },

  instagram: {
    handle: '@loopi.ccs',
    url: 'https://www.instagram.com/loopi.ccs',
  },

  contacto: {
    // PENDIENTE: dirección exacta del local o punto de despacho.
    direccion: 'PENDIENTE — dirección del local / punto de despacho en Caracas',
    horario: 'Lunes a domingo, 9:00am a 6:00pm',
    // PENDIENTE: zonas de Caracas donde se hace delivery.
    zonaDelivery: 'PENDIENTE — ej. Caracas (Este, Centro, Los Palos Grandes...)',
    metodosPago: 'Pago móvil, Zelle, Efectivo, Zinli, Binance',
    email: 'Loopicaracas@gmail.com',
  },
};

/* ============================================================
   MENU — catálogo de sabores. Agregar un sabor nuevo es
   agregar una línea aquí; el HTML se genera solo.
   ============================================================ */
const MENU = [
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

/* ============================================================
   Helpers
   ============================================================ */

// Bloqueo de scroll de fondo con overlays (menú móvil, carrito, lightbox,
// preloader). overflow:hidden en <body> NO alcanza en iOS Safari — el fondo
// igual rebota/scrollea detrás del overlay. Fijar el body en su posición
// actual (position:fixed + top negativo) lo evita del todo. Contador en vez
// de booleano por si dos overlays llegan a superponerse.
let bloqueosScroll = 0;
let scrollGuardadoY = 0;

function bloquearScroll() {
  if (bloqueosScroll === 0) {
    scrollGuardadoY = window.scrollY;
    document.body.classList.add('no-scroll');
    document.body.style.top = `-${scrollGuardadoY}px`;
  }
  bloqueosScroll++;
}

function desbloquearScroll() {
  bloqueosScroll = Math.max(0, bloqueosScroll - 1);
  if (bloqueosScroll === 0) {
    document.body.classList.remove('no-scroll');
    document.body.style.top = '';
    window.scrollTo(0, scrollGuardadoY);
  }
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

// Los precios los cotiza quien atiende WhatsApp — el mensaje solo lista
// sabores y cantidades, nunca un monto.
function mensajePedido(tamano, items) {
  const lineas = items
    .filter((i) => i.cantidad > 0)
    .map((i) => `• ${i.cantidad}x Cajita de ${tamano} — ${i.nombre}`)
    .join('\n');
  return `Hola loopi! 👋 Quiero hacer este pedido:\n\n${lineas}\n\n¿Me confirman disponibilidad y precio?`;
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
  if (!header) return;
  // Páginas sin hero rojo debajo del header (ej. galeria.html) necesitan el
  // header sólido desde el arranque; el texto crema del estado transparente
  // se vuelve invisible sobre un fondo claro.
  const forzarSolido = document.body.classList.contains('header--forzar-solido');
  const onScroll = () => {
    header.classList.toggle('header--scrolled', forzarSolido || window.scrollY > 40);
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  const toggleBtn = document.querySelector('.header__hamburger');
  const mobileNav = document.querySelector('.mobile-nav');
  const closeBtn = document.querySelector('.mobile-nav__close');
  if (!toggleBtn || !mobileNav || !closeBtn) return;

  const openMenu = () => {
    mobileNav.classList.add('is-open');
    mobileNav.setAttribute('aria-hidden', 'false');
    toggleBtn.setAttribute('aria-expanded', 'true');
    bloquearScroll();
    closeBtn.focus();
  };
  const closeMenu = () => {
    mobileNav.classList.remove('is-open');
    mobileNav.setAttribute('aria-hidden', 'true');
    toggleBtn.setAttribute('aria-expanded', 'false');
    desbloquearScroll();
    toggleBtn.focus();
  };

  toggleBtn.addEventListener('click', openMenu);
  closeBtn.addEventListener('click', closeMenu);
  mobileNav.querySelectorAll('a').forEach((a) => a.addEventListener('click', closeMenu));
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileNav.classList.contains('is-open')) closeMenu();
  });
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
      <img class="card__img" src="${item.img}" alt="Mini lumpias sabor ${item.nombre}: ${item.descripcion}" loading="lazy" decoding="async">
      <div class="card__body">
        <h3 class="card__title">${item.nombre}</h3>
        <p class="card__desc">${item.descripcion}</p>
        <a class="btn btn--whatsapp" data-wa-item target="_blank" rel="noopener" href="#" aria-label="Pedir ${item.nombre} por WhatsApp">
          ${ICONS.whatsapp}
          <span>Pedir por WhatsApp</span>
        </a>
      </div>
    </article>`;
}

function renderMenu() {
  const gridSalados = document.querySelector('#grid-salados');
  const gridPostres = document.querySelector('#grid-postres');
  if (!gridSalados || !gridPostres) return;
  const salados = MENU.filter((m) => m.categoria === 'salado');
  const postres = MENU.filter((m) => m.categoria === 'postre');
  gridSalados.innerHTML = salados.map(renderTarjetaMenu).join('');
  gridPostres.innerHTML = postres.map(renderTarjetaMenu).join('');
  actualizarLinksMenu();
}

function actualizarLinksMenu() {
  document.querySelectorAll('.card').forEach((card) => {
    const item = MENU.find((m) => m.id === card.dataset.id);
    card.querySelector('[data-wa-item]').setAttribute(
      'href',
      buildWhatsAppUrl(mensajeProducto(item.nombre, stateMenu.tamano))
    );
  });
}

function initToggleTamano() {
  // :not([data-pedido-size-btn]) evita que este toggle (el del grid de
  // precios) reaccione a clicks en el toggle de tamaño del carrito/pedido,
  // que es un estado independiente manejado por initPedido().
  const botones = document.querySelectorAll('.size-toggle__btn:not([data-pedido-size-btn])');
  botones.forEach((btn) => {
    btn.addEventListener('click', () => {
      stateMenu.tamano = Number(btn.dataset.tamano);
      botones.forEach((b) => b.classList.toggle('is-active', b === btn));
      botones.forEach((b) => b.setAttribute('aria-pressed', String(b === btn)));
      actualizarLinksMenu();
    });
  });
}

/* ============================================================
   Pedido / Carrito — estado compartido y persistente (localStorage),
   igual al sistema de "Mi pedido" de Quality Bikes: botón flotante
   con contador, panel deslizable, mismo pedido disponible en
   cualquier página del sitio (index.html y galeria.html).
   ============================================================ */
const PEDIDO_STORAGE_KEY = 'loopi-pedido-v1';

function cargarPedidoGuardado() {
  try {
    const raw = window.localStorage.getItem(PEDIDO_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === 'object' ? parsed : null;
  } catch {
    return null; // localStorage bloqueado o dato corrupto: arrancamos vacío.
  }
}

function guardarPedido() {
  try {
    window.localStorage.setItem(PEDIDO_STORAGE_KEY, JSON.stringify(statePedido));
  } catch {
    // Sin persistencia (modo privado, etc.): el pedido sigue vivo en memoria.
  }
}

const pedidoGuardado = cargarPedidoGuardado();
const statePedido = {
  tamano: pedidoGuardado && pedidoGuardado.tamano === 24 ? 24 : 12,
  cantidades: Object.fromEntries(
    MENU.map((m) => [m.id, Math.max(0, Number(pedidoGuardado && pedidoGuardado.cantidades && pedidoGuardado.cantidades[m.id]) || 0)])
  ),
};

function renderFilaPedido(item) {
  const cantidad = statePedido.cantidades[item.id];
  return `
    <div class="config-row" data-id="${item.id}">
      <img class="config-row__img" src="${item.img}" alt="" width="64" height="64" loading="lazy">
      <div class="config-row__info">
        <p class="config-row__nombre">${item.nombre}</p>
      </div>
      <div class="config-row__stepper">
        <button type="button" class="stepper__btn" data-accion="menos" data-id="${item.id}" aria-label="Quitar una cajita de ${item.nombre}">${ICONS.minus}</button>
        <span class="stepper__cantidad" data-cantidad>${cantidad}</span>
        <button type="button" class="stepper__btn" data-accion="mas" data-id="${item.id}" aria-label="Agregar una cajita de ${item.nombre}">${ICONS.plus}</button>
      </div>
    </div>`;
}

// Vuelve a pintar todas las listas de pedido presentes en la página
// (la sección "Arma tu pedido" y/o el panel flotante) y refresca totales.
function renderListasPedido() {
  document.querySelectorAll('[data-pedido-lista]').forEach((cont) => {
    cont.innerHTML = MENU.map(renderFilaPedido).join('');
  });
  actualizarPedidoUI();
}

// Actualiza unidades, botón de WhatsApp, contador del carrito y estado
// visual del toggle de tamaño en TODOS los lugares de la página que los
// usen (data-attributes, no IDs fijos → funciona en cualquier combinación
// de secciones presentes). Sin precios: eso lo cotiza quien atiende WhatsApp.
function actualizarPedidoUI() {
  let unidades = 0;
  MENU.forEach((item) => {
    unidades += statePedido.cantidades[item.id];
  });
  const items = MENU.map((item) => ({ nombre: item.nombre, cantidad: statePedido.cantidades[item.id] }));
  const hayItems = unidades > 0;
  const hrefWhatsapp = hayItems ? buildWhatsAppUrl(mensajePedido(statePedido.tamano, items)) : '#';

  document.querySelectorAll('[data-pedido-unidades]').forEach((el) => { el.textContent = String(unidades); });
  document.querySelectorAll('[data-pedido-vacio]').forEach((el) => { el.hidden = hayItems; });
  document.querySelectorAll('[data-pedido-contenido]').forEach((el) => { el.hidden = !hayItems; });
  document.querySelectorAll('[data-pedido-whatsapp]').forEach((btn) => {
    btn.classList.toggle('is-disabled', !hayItems);
    btn.setAttribute('aria-disabled', String(!hayItems));
    btn.setAttribute('href', hrefWhatsapp);
  });
  document.querySelectorAll('[data-pedido-badge]').forEach((el) => {
    el.textContent = String(unidades);
    el.hidden = unidades === 0;
  });
  document.querySelectorAll('[data-pedido-size-btn]').forEach((btn) => {
    const activo = Number(btn.dataset.tamano) === statePedido.tamano;
    btn.classList.toggle('is-active', activo);
    btn.setAttribute('aria-pressed', String(activo));
  });

  guardarPedido();
}

function initPedido() {
  const haySecciones = document.querySelector('[data-pedido-lista]') || document.querySelector('[data-pedido-badge]');
  if (!haySecciones) return;

  renderListasPedido();

  // Delegado en document: cubre steppers en la sección Y en el panel flotante.
  document.addEventListener('click', (e) => {
    const btnSize = e.target.closest('[data-pedido-size-btn]');
    if (btnSize) {
      statePedido.tamano = Number(btnSize.dataset.tamano);
      renderListasPedido();
      return;
    }
    const btnStep = e.target.closest('.stepper__btn');
    if (btnStep) {
      const id = btnStep.dataset.id;
      const delta = btnStep.dataset.accion === 'mas' ? 1 : -1;
      statePedido.cantidades[id] = Math.max(0, statePedido.cantidades[id] + delta);
      document.querySelectorAll(`.config-row[data-id="${id}"] [data-cantidad]`).forEach((el) => {
        el.textContent = String(statePedido.cantidades[id]);
      });
      actualizarPedidoUI();
      return;
    }
    const btnWa = e.target.closest('[data-pedido-whatsapp]');
    if (btnWa && btnWa.classList.contains('is-disabled')) {
      e.preventDefault();
    }
  });
}

/* ============================================================
   Carrito flotante — botón con contador + panel (mismo patrón
   que el "Mi pedido" de Quality Bikes, esquina opuesta a los
   botones de WhatsApp/Instagram).
   ============================================================ */
function initCarritoFlotante() {
  const btn = document.querySelector('#carrito-btn');
  const panel = document.querySelector('#carrito-panel');
  const backdrop = document.querySelector('#carrito-backdrop');
  const cerrar = document.querySelector('#carrito-cerrar');
  const vaciar = document.querySelector('#carrito-vaciar');
  if (!btn || !panel || !backdrop) return;

  const abrirPanel = () => {
    panel.classList.add('is-open');
    backdrop.classList.add('is-open');
    panel.setAttribute('aria-hidden', 'false');
    btn.setAttribute('aria-expanded', 'true');
    bloquearScroll();
    if (cerrar) cerrar.focus();
  };
  const cerrarPanel = () => {
    panel.classList.remove('is-open');
    backdrop.classList.remove('is-open');
    panel.setAttribute('aria-hidden', 'true');
    btn.setAttribute('aria-expanded', 'false');
    desbloquearScroll();
    btn.focus();
  };

  btn.addEventListener('click', () => {
    panel.classList.contains('is-open') ? cerrarPanel() : abrirPanel();
  });
  if (cerrar) cerrar.addEventListener('click', cerrarPanel);
  backdrop.addEventListener('click', cerrarPanel);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && panel.classList.contains('is-open')) cerrarPanel();
  });
  if (vaciar) {
    vaciar.addEventListener('click', () => {
      MENU.forEach((item) => { statePedido.cantidades[item.id] = 0; });
      renderListasPedido();
    });
  }
}

/* ============================================================
   Ruleta de sabores — carrusel deslizable (scroll-snap nativo +
   flechas). Cada tarjeta lleva directo al sabor en el menú.
   ============================================================ */
function initRuleta() {
  const track = document.querySelector('#ruleta-track');
  if (!track) return;

  track.innerHTML = MENU.map(
    (item) => `
      <a href="#menu" class="ruleta__card ruleta__card--${item.categoria}" data-id="${item.id}">
        <img src="${item.img}" alt="" width="160" height="160" loading="lazy">
        <span>${item.nombre}</span>
      </a>`
  ).join('');

  const prevBtn = document.querySelector('.ruleta__arrow--prev');
  const nextBtn = document.querySelector('.ruleta__arrow--next');
  if (!prevBtn || !nextBtn) return;

  const desplazar = (direccion) => {
    const card = track.querySelector('.ruleta__card');
    if (!card) return;
    const gap = parseFloat(getComputedStyle(track).columnGap || '0') || 0;
    const delta = (card.getBoundingClientRect().width + gap) * direccion;
    track.scrollBy({ left: delta, behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
  };

  prevBtn.addEventListener('click', () => desplazar(-1));
  nextBtn.addEventListener('click', () => desplazar(1));
}

/* ============================================================
   Galería — lightbox accesible (teclado, foco, Escape)
   ============================================================ */
function initGaleria() {
  const items = Array.from(document.querySelectorAll('.galeria__item'));
  const lightbox = document.querySelector('#lightbox');
  if (!items.length || !lightbox) return;

  const imgEl = lightbox.querySelector('.lightbox__img');
  let indiceActual = 0;
  let elementoPrevio = null;

  const mostrar = (i) => {
    indiceActual = (i + items.length) % items.length;
    const origen = items[indiceActual].querySelector('img');
    imgEl.src = origen.src;
    imgEl.alt = origen.alt;
  };

  const abrir = (i) => {
    elementoPrevio = document.activeElement;
    mostrar(i);
    lightbox.classList.add('is-open');
    lightbox.setAttribute('aria-hidden', 'false');
    bloquearScroll();
    lightbox.querySelector('.lightbox__close').focus();
  };

  const cerrar = () => {
    lightbox.classList.remove('is-open');
    lightbox.setAttribute('aria-hidden', 'true');
    desbloquearScroll();
    if (elementoPrevio) elementoPrevio.focus();
  };

  items.forEach((item, i) => item.addEventListener('click', () => abrir(i)));
  lightbox.querySelector('.lightbox__close').addEventListener('click', cerrar);
  lightbox.querySelector('.lightbox__prev').addEventListener('click', () => mostrar(indiceActual - 1));
  lightbox.querySelector('.lightbox__next').addEventListener('click', () => mostrar(indiceActual + 1));
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) cerrar();
  });
  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('is-open')) return;
    if (e.key === 'Escape') cerrar();
    if (e.key === 'ArrowLeft') mostrar(indiceActual - 1);
    if (e.key === 'ArrowRight') mostrar(indiceActual + 1);
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
  const elDireccion = document.querySelector('#dato-direccion');
  const elHorario = document.querySelector('#dato-horario');
  const elDelivery = document.querySelector('#dato-delivery');
  const elPago = document.querySelector('#dato-pago');
  const elWhatsapp = document.querySelector('#dato-whatsapp');
  const elEmail = document.querySelector('#dato-email');
  if (!elDireccion || !elHorario || !elDelivery || !elPago || !elWhatsapp || !elEmail) return;

  elDireccion.textContent = CONFIG.contacto.direccion;
  elHorario.textContent = CONFIG.contacto.horario;
  elDelivery.textContent = CONFIG.contacto.zonaDelivery;
  elPago.textContent = CONFIG.contacto.metodosPago;
  elWhatsapp.textContent = `+${CONFIG.whatsapp.numero}`;
  elWhatsapp.setAttribute('href', buildWhatsAppUrl(mensajeGenerico()));
  elEmail.textContent = CONFIG.contacto.email;
}

/* ============================================================
   Footer — año dinámico
   ============================================================ */
function initFooter() {
  const elAnio = document.querySelector('#footer-anio');
  const elTelefono = document.querySelector('#footer-telefono');
  const elEmail = document.querySelector('#footer-email');
  if (!elAnio || !elTelefono || !elEmail) return;

  elAnio.textContent = String(new Date().getFullYear());
  elTelefono.textContent = `+${CONFIG.whatsapp.numero}`;
  elTelefono.setAttribute('href', buildWhatsAppUrl(mensajeGenerico()));
  elEmail.textContent = CONFIG.contacto.email;
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
      const offset = (header ? header.offsetHeight : 0) + 12;
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
  // threshold:0 (en vez de un % del alto del elemento) porque algunos
  // data-reveal son contenedores muy altos en mobile (ej. .menu__grid con
  // varias tarjetas apiladas en una sola columna, cientos de px más alto
  // que el viewport): con un threshold >0 nunca se llega a tener ese % del
  // elemento visible a la vez y el reveal no se dispara jamás, dejando la
  // sección permanentemente invisible (opacity:0).
  const obs = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0, rootMargin: '0px 0px -40px 0px' }
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
  bloquearScroll();

  const MIN_VISIBLE_MS = 500;
  const inicio = performance.now();

  const ocultar = () => {
    const restante = Math.max(0, MIN_VISIBLE_MS - (performance.now() - inicio));
    setTimeout(() => {
      el.classList.add('is-hidden');
      desbloquearScroll();
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
   Hero — portada fija (.hero__sticky, ver CSS) con cambio de
   paleta al hacer scroll: arranca en rojo, el morado se funde a
   mitad del recorrido fijo y hacia el final entra el naranja junto
   al rojo. El slogan "Golden. Crispy. Premium." pasa de naranja a
   morado en el mismo recorrido, de forma lineal. Progreso 0–1
   relativo al alto "de sobra" del envoltorio (offsetHeight menos
   una pantalla) — igual que initLumpia3D, porque .hero también usa
   el patrón envoltorio-alto + position:sticky.
   ============================================================ */
function initHeroColorShift() {
  const hero = document.querySelector('#hero');
  if (!hero || prefersReducedMotion()) return;

  const capaMorado = hero.querySelector('.hero__capa--morado');
  const capaNaranja = hero.querySelector('.hero__capa--naranja');
  const slogan = document.querySelector('#hero-slogan');
  if (!capaMorado || !capaNaranja) return;

  let ticking = false;

  const actualizar = () => {
    ticking = false;
    const rect = hero.getBoundingClientRect();
    const distanciaTotal = hero.offsetHeight - window.innerHeight;
    if (distanciaTotal <= 0) return;
    const progreso = Math.min(1, Math.max(0, -rect.top / distanciaTotal));

    // El morado sube y baja, con pico a mitad de camino.
    const morado = Math.max(0, 1 - Math.abs(progreso - 0.5) * 2);
    // El naranja sube recién en el último tramo, como tinte cálido — tope bajo
    // a propósito: a más opacidad el texto blanco pierde contraste sobre el
    // naranja claro (verificado: 0.35 se queda en ~3.75:1, seguro).
    const naranja = Math.min(0.35, Math.max(0, (progreso - 0.55) / 0.45) * 0.35);

    capaMorado.style.opacity = String(morado);
    capaNaranja.style.opacity = String(naranja);

    if (slogan) {
      slogan.style.color = `color-mix(in srgb, var(--naranja), var(--morado) ${Math.round(progreso * 100)}%)`;
    }
  };

  const onScroll = () => {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(actualizar);
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  actualizar();
}

/* ============================================================
   Lluvia de lumpias — a los 5 segundos de cargar la página,
   una tanda de mini lumpias cae dentro del hero. Puramente
   decorativo (aria-hidden), respeta prefers-reduced-motion.
   ============================================================ */
function initLluviaLumpias() {
  const contenedor = document.querySelector('#hero-lluvia');
  if (!contenedor || prefersReducedMotion()) return;

  const SPRITE = './img/hero/lumpia-sprite-01.png';
  const CANTIDAD = 22;
  const VENTANA_MS = 4000;

  const crearLumpia = () => {
    const img = document.createElement('img');
    img.src = SPRITE;
    img.alt = '';
    img.className = 'hero__lumpia-cayendo';

    const tamano = 26 + Math.random() * 32;
    const izquierda = Math.random() * 96;
    const duracion = 2.6 + Math.random() * 2.2;
    const rotInicial = Math.random() * 360;
    const rotFinal = rotInicial + (Math.random() > 0.5 ? 1 : -1) * (180 + Math.random() * 360);

    img.style.width = `${tamano}px`;
    img.style.left = `${izquierda}%`;
    img.style.setProperty('--rot-inicial', `${rotInicial}deg`);
    img.style.setProperty('--rot-final', `${rotFinal}deg`);
    img.style.animationDuration = `${duracion}s`;

    contenedor.appendChild(img);
    img.addEventListener('animationend', () => img.remove());
  };

  setTimeout(() => {
    for (let i = 0; i < CANTIDAD; i++) {
      setTimeout(crearLumpia, Math.random() * VENTANA_MS);
    }
  }, 5000);
}

/* ============================================================
   Lumpia 3D — el círculo crece y pierde el borde mientras el
   fondo se revela, todo atado al progreso de scroll dentro de
   la sección. Sin GSAP ni Lenis: solo transform vía rAF.
   ============================================================ */
function initLumpia3D() {
  const section = document.querySelector('#lumpia3d');
  if (!section || prefersReducedMotion()) return;

  const bg = section.querySelector('.lumpia3d__bg');
  const content = section.querySelector('.lumpia3d__content');
  const porthole = section.querySelector('.lumpia3d__porthole');
  const revealText = section.querySelector('.lumpia3d__reveal-text');
  const humo = initHumoLumpia3D();
  let humoActivo = false;

  let ticking = false;

  const actualizar = () => {
    ticking = false;
    const rect = section.getBoundingClientRect();
    const distanciaTotal = section.offsetHeight - window.innerHeight;
    if (distanciaTotal <= 0) return;

    const progreso = Math.min(1, Math.max(0, -rect.top / distanciaTotal));

    const salidaTexto = Math.min(1, progreso / 0.35);
    const crecimiento = Math.min(1, progreso / 0.75);
    const revelado = Math.min(1, Math.max(0, (progreso - 0.3) / 0.5));

    content.style.opacity = String(1 - salidaTexto);
    content.style.transform = `translateY(${salidaTexto * -30}px)`;

    const escala = 1 + crecimiento * 7;
    porthole.style.transform = `scale(${escala})`;
    porthole.style.borderRadius = `${50 - crecimiento * 50}%`;

    bg.style.opacity = String(revelado);
    bg.style.transform = `scale(${1.08 - revelado * 0.08})`;

    revealText.style.opacity = String(revelado);

    // El humo recién tiene sentido una vez que la foto de la lumpia se
    // reveló — antes de eso solo se ve "Mira de cerca" sin comida en
    // pantalla, así que no debe aparecer. enPantalla evita que se quede
    // encendido para siempre una vez que la sección ya quedó tapada atrás
    // (revelado se queda en 1 aunque hayas seguido bajando).
    if (humo) {
      const enPantalla = rect.bottom > 0 && rect.top < window.innerHeight;
      const mostrarHumo = enPantalla && revelado > 0.4;
      if (mostrarHumo && !humoActivo) {
        humo.iniciar();
        humoActivo = true;
      } else if (!mostrarHumo && humoActivo) {
        humo.detener();
        humoActivo = false;
      }
    }
  };

  const onScroll = () => {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(actualizar);
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  actualizar();
}

/* ============================================================
   Humo de las lumpias — vapor flotando dentro de #lumpia3d.
   Cada partícula es una imagen de humo con transparencia real
   (ver comentario de .lumpia3d__vapor en styles.css) que sube, se
   curva de lado a lado, gira suave y se desvanece — mismo patrón
   que initLluviaLumpias, pero en loop continuo mientras dure.
   No decide sola cuándo prender/apagar: devuelve {iniciar,
   detener} y es initLumpia3D quien los llama, atado al progreso
   real de scroll (recién cuando la foto se reveló, no antes ni
   una vez que la sección ya quedó tapada).
   ============================================================ */
function initHumoLumpia3D() {
  const contenedor = document.querySelector('#lumpia3d-humo');
  if (!contenedor || prefersReducedMotion()) return null;

  const SPRITES = ['./img/3d/vapor-humo-01.webp', './img/3d/vapor-humo-02.webp'];
  // Espaciado para que casi nunca haya dos a la vez: un detalle discreto que
  // se nota si te fijás, no un efecto que compite con la foto del producto.
  const INTERVALO_MS = 3400;

  const crearVapor = () => {
    const img = document.createElement('img');
    img.src = SPRITES[Math.floor(Math.random() * SPRITES.length)];
    img.alt = '';
    img.className = 'lumpia3d__vapor';

    // Chico, tenue y algo desenfocado a propósito — un hilo fino de vapor
    // real, no una columna de humo pidiendo atención.
    const ancho = 46 + Math.random() * 38;
    const izquierda = 36 + Math.random() * 28;
    const duracion = 7.5 + Math.random() * 3;
    const deriva = (Math.random() > 0.5 ? 1 : -1) * (22 + Math.random() * 28);
    const rotacion = (Math.random() > 0.5 ? 1 : -1) * (4 + Math.random() * 6);
    const opacidadMax = 0.16 + Math.random() * 0.12;
    const nitidez = 0.7 + Math.random() * 1.2;

    img.style.width = `${ancho}px`;
    img.style.left = `${izquierda}%`;
    img.style.setProperty('--vapor-drift', `${deriva}px`);
    img.style.setProperty('--vapor-rot', `${rotacion}deg`);
    img.style.setProperty('--vapor-opacidad', String(opacidadMax));
    img.style.setProperty('--vapor-blur', `${nitidez}px`);
    img.style.animationDuration = `${duracion}s`;

    contenedor.appendChild(img);
    img.addEventListener('animationend', () => img.remove());
  };

  let intervalo = null;
  const iniciar = () => {
    if (intervalo) return;
    crearVapor();
    intervalo = setInterval(crearVapor, INTERVALO_MS);
  };
  const detener = () => {
    clearInterval(intervalo);
    intervalo = null;
  };

  return { iniciar, detener };
}

/* ============================================================
   Init general
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  initHeader();
  initBotonesGenericos();
  initHeroColorShift();
  initLluviaLumpias();
  initLumpia3D();
  initRuleta();
  renderMenu();
  initToggleTamano();
  initPedido();
  initCarritoFlotante();
  initGaleria();
  initInstagram();
  initContacto();
  initFooter();
  initScrollSuave();
  initRevealOnScroll();
  initJsonLd();
});
