(function () {
  const DATA = window.MIST_DATA || { brand: {}, products: [], spaces: [], curations: [], blogs: [] };
  const STORAGE_KEY = 'mist_design_cart_v1';
  const WISH_KEY = 'mist_design_wish_v1';
  const PROMO_KEY = 'mist_design_promo_v1';

  const formatCOP = (val) => '$' + (Number(val) || 0).toLocaleString('es-CO') + ' COP';

  const getCart = () => { try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'); } catch { return []; } };
  const saveCart = (items) => { localStorage.setItem(STORAGE_KEY, JSON.stringify(items)); updateCartUI(); };

  const getWish = () => { try { return JSON.parse(localStorage.getItem(WISH_KEY) || '[]'); } catch { return []; } };
  const toggleWish = (productId) => {
    let w = getWish();
    if (w.includes(productId)) { w = w.filter(id => id !== productId); toast('Eliminado de favoritos'); }
    else { w.push(productId); toast('Guardado en favoritos ♥'); }
    localStorage.setItem(WISH_KEY, JSON.stringify(w));
    document.querySelectorAll('.js-wish-count').forEach(el => { el.textContent = w.length; });
    document.querySelectorAll(`.prod-heart-btn[data-pid="${productId}"]`).forEach(btn => {
      btn.classList.toggle('liked', w.includes(productId));
      btn.innerHTML = w.includes(productId) ? '♥' : '♡';
    });
  };

  const getPromo = () => localStorage.getItem(PROMO_KEY) === 'MIST10';
  const setPromo = (on) => {
    if (on) localStorage.setItem(PROMO_KEY, 'MIST10');
    else localStorage.removeItem(PROMO_KEY);
    updateCartUI();
  };

  const toast = (msg) => {
    let el = document.getElementById('mistToast');
    if (!el) {
      el = document.createElement('div');
      el.id = 'mistToast';
      el.className = 'mist-toast';
      document.body.appendChild(el);
    }
    el.textContent = msg;
    el.classList.add('show');
    clearTimeout(el._t);
    el._t = setTimeout(() => el.classList.remove('show'), 2800);
  };

  const addToCart = (productId, variantIdx = 0, qty = 1) => {
    const p = DATA.products.find(x => x.id === productId);
    if (!p) return;
    const v = (p.variants && p.variants[variantIdx]) || (p.variants && p.variants[0]) || { id: p.id, title: p.title, price: p.price, sku: '' };
    const cart = getCart();
    const key = `${p.id}::${v.id || variantIdx}`;
    const existing = cart.find(c => c.key === key);
    if (existing) existing.qty += qty;
    else {
      cart.push({
        key,
        id: p.id,
        slug: p.slug,
        title: p.title,
        variant: (v.options && v.options.length ? v.options.join(' / ') : (v.title !== p.title ? v.title : 'Edición Estándar')),
        sku: v.sku || '',
        price: v.price || p.price,
        image: v.image || (p.images && p.images[0]) || '',
        qty
      });
    }
    saveCart(cart);
    toast(`Añadido: ${p.title}`);
    openCart();
  };

  const changeQty = (key, delta) => {
    const cart = getCart().map(item => item.key === key ? { ...item, qty: item.qty + delta } : item).filter(item => item.qty > 0);
    saveCart(cart);
  };

  const openCart = () => {
    document.getElementById('cartDrawer')?.classList.add('open');
    document.getElementById('drawerBackdrop')?.classList.add('open');
  };
  const closeCart = () => {
    document.getElementById('cartDrawer')?.classList.remove('open');
    document.getElementById('drawerBackdrop')?.classList.remove('open');
  };

  const updateCartUI = () => {
    const cart = getCart();
    const count = cart.reduce((acc, i) => acc + i.qty, 0);
    document.querySelectorAll('.js-cart-count').forEach(el => { el.textContent = count; });

    const body = document.getElementById('cartDrawerBody');
    const foot = document.getElementById('cartDrawerFoot');
    if (!body || !foot) return;

    if (!cart.length) {
      body.innerHTML = `
        <div style="text-align:center; padding:3rem 1rem; color:var(--muted);">
          <p style="font-size:1.1rem; font-weight:700; color:var(--forest); margin-bottom:0.5rem;">Tu bolsa está vacía</p>
          <p style="font-size:0.86rem; margin-bottom:1.5rem;">Explora nuestra colección de mobiliario artesanal hecho en Colombia.</p>
          <a href="catalogo.html" class="btn-mist">Ver Catálogo &rarr;</a>
        </div>`;
      foot.innerHTML = '';
      return;
    }

    body.innerHTML = cart.map(item => `
      <div class="cart-item">
        <img src="${item.image}" alt="${item.title}">
        <div style="display:flex; flex-direction:column; gap:0.2rem;">
          <a href="producto.html?slug=${encodeURIComponent(item.slug)}" style="font-size:0.9rem; font-weight:700; color:var(--ink);">${item.title}</a>
          <span style="font-size:0.72rem; color:var(--muted);">${item.variant}${item.sku ? ' · SKU ' + item.sku : ''}</span>
          <div style="display:flex; justify-content:space-between; align-items:center; margin-top:0.35rem;">
            <div style="display:inline-flex; align-items:center; gap:0.4rem; border:1px solid var(--hairline); border-radius:999px; padding:0.15rem 0.45rem;">
              <button type="button" onclick="MistApp.changeQty('${item.key}', -1)" style="border:0; background:transparent; font-weight:700;">−</button>
              <span style="font-size:0.78rem; font-weight:700;">${item.qty}</span>
              <button type="button" onclick="MistApp.changeQty('${item.key}', 1)" style="border:0; background:transparent; font-weight:700;">+</button>
            </div>
            <strong style="font-size:0.84rem; color:var(--forest);">${formatCOP(item.price * item.qty)}</strong>
          </div>
        </div>
      </div>
    `).join('');

    const subtotal = cart.reduce((acc, i) => acc + (i.price * i.qty), 0);
    const hasPromo = getPromo();
    const discount = hasPromo ? Math.round(subtotal * 0.10) : 0;
    const total = subtotal - discount;

    const lines = cart.map(i => `• ${i.qty}x ${i.title} (${i.variant}${i.sku ? ' - ' + i.sku : ''}): ${formatCOP(i.price * i.qty)}`).join('%0A');
    const promoNote = hasPromo ? `%0ADescuento Comunidad MIST (-10%): -${formatCOP(discount)}` : '';
    const waText = `Hola Mist Design! Quiero realizar mi compra:%0A%0A${lines}${promoNote}%0A%0ATotal: ${formatCOP(total)}%0A%0A¿Me confirmas el link de pago y tiempos de entrega (20 días hábiles + envío)?`;
    const waUrl = `https://wa.me/${DATA.brand.whatsapp}?text=${waText}`;

    foot.innerHTML = `
      <div style="display:flex; gap:0.4rem; margin-bottom:0.85rem;">
        <input id="promoInput" type="text" placeholder="Código (MIST10)" value="${hasPromo ? 'MIST10' : ''}" style="flex:1; padding:0.55rem 0.9rem; border:1px solid var(--hairline); border-radius:999px; font-size:0.76rem;">
        <button type="button" class="btn-mist-outline" style="padding:0.52rem 0.95rem; font-size:0.7rem;" onclick="MistApp.applyPromo()">${hasPromo ? 'Quitar 10%' : 'Aplicar 10%'}</button>
      </div>
      <div style="display:flex; justify-content:space-between; font-size:0.82rem; margin-bottom:0.2rem;">
        <span>Subtotal</span><span>${formatCOP(subtotal)}</span>
      </div>
      ${hasPromo ? `<div style="display:flex; justify-content:space-between; font-size:0.82rem; color:var(--terra); margin-bottom:0.2rem;">
        <span>Comunidad MIST (10% OFF)</span><span>−${formatCOP(discount)}</span>
      </div>` : ''}
      <div style="display:flex; justify-content:space-between; font-size:0.98rem; font-weight:700; color:var(--ink); padding:0.55rem 0; border-top:1px solid var(--hairline); margin-bottom:0.8rem;">
        <span>Total</span><span>${formatCOP(total)}</span>
      </div>
      <a href="${waUrl}" target="_blank" rel="noopener" class="btn-mist" style="width:100%; margin-bottom:0.45rem;">Comprar por WhatsApp &rarr;</a>
      <p style="font-size:0.7rem; color:var(--muted); margin:0; text-align:center;">Producción artesanal: 20 días hábiles + envío (5 a 10 días).</p>
    `;
  };

  const applyPromo = () => {
    if (getPromo()) { setPromo(false); toast('Código MIST10 removido'); return; }
    const val = (document.getElementById('promoInput')?.value || '').trim().toUpperCase();
    if (!val || val === 'MIST10') { setPromo(true); toast('10% OFF Comunidad MIST aplicado'); }
    else { toast('Usa el código MIST10 para obtener 10% OFF'); }
  };

  const getMainSpaceLabel = (p) => {
    const priority = ['Sofás', 'Poltronas', 'Sillas', 'Mesas', 'Iluminación', 'Espejos', 'Cojines', 'Mascotas', 'Verano Atemporal', 'Sala', 'Comedor', 'Habitación', 'Estudio', 'Decoración y Styling'];
    for (const tag of priority) {
      if (p.collections && p.collections.includes(tag)) return tag;
    }
    return (p.collections && p.collections[0]) || 'MIST DESIGN';
  };

  const renderProductCard = (p) => {
    const img1 = (p.images && p.images[0]) || DATA.brand.ambient_img;
    const img2 = (p.images && p.images[1]) || img1;
    const isChrome = p.collections && p.collections.includes('Cromos');
    const isPet = p.collections && p.collections.includes('Mascotas');
    const badge = isChrome ? `<span class="prod-badge chrome">Cromo</span>`
      : isPet ? `<span class="prod-badge">Pet</span>` : '';

    const liked = getWish().includes(p.id);
    const hasVariants = p.variants && p.variants.length > 1;
    const buyAction = hasVariants ? `MistApp.openQuickView('${p.id}')` : `MistApp.addToCart('${p.id}', 0)`;

    return `
      <article class="mist-prod-card">
        <div class="mist-prod-media">
          ${badge}
          <button type="button" class="prod-heart-btn ${liked ? 'liked' : ''}" data-pid="${p.id}" onclick="MistApp.toggleWish('${p.id}')" aria-label="Guardar favorito">${liked ? '♥' : '♡'}</button>
          <a href="producto.html?slug=${encodeURIComponent(p.slug)}" style="display:block; width:100%; height:100%;">
            <img class="img-main" src="${img1}" alt="${p.title}" loading="lazy">
            ${img2 !== img1 ? `<img class="img-hover" src="${img2}" alt="${p.title}" loading="lazy">` : ''}
          </a>
        </div>
        <div style="padding:0.85rem 0.35rem 0; display:flex; flex-direction:column; gap:0.25rem; flex:1;">
          <div style="font-size:0.66rem; font-weight:600; text-transform:uppercase; letter-spacing:0.08em; color:var(--muted);">${getMainSpaceLabel(p)}</div>
          <a href="producto.html?slug=${encodeURIComponent(p.slug)}" style="font-size:0.94rem; font-weight:700; color:var(--ink); line-height:1.25;">${p.title}</a>
          <div style="margin-top:auto; padding-top:0.55rem; display:flex; justify-content:space-between; align-items:center; gap:0.5rem;">
            <span style="font-size:0.86rem; font-weight:700; color:var(--forest-btn);">${formatCOP(p.price)}</span>
            <button type="button" class="circle-accent-btn" onclick="${buyAction}" title="${hasVariants ? 'Elegir acabado' : 'Agregar a la bolsa'}" aria-label="Agregar ${p.title}">&rarr;</button>
          </div>
        </div>
      </article>
    `;
  };

  const openQuickView = (productId) => {
    const p = DATA.products.find(x => x.id === productId);
    if (!p) return;
    let modal = document.getElementById('qvModal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'qvModal';
      modal.className = 'qv-modal';
      modal.addEventListener('click', (e) => { if (e.target === modal) closeQuickView(); });
      document.body.appendChild(modal);
    }
    let selectedIdx = 0;
    const render = () => {
      const v = (p.variants && p.variants[selectedIdx]) || { price: p.price, image: '', title: p.title };
      const img = v.image || (p.images && p.images[0]) || '';
      const optsHtml = (p.variants && p.variants.length > 1) ? `
        <div style="margin-top:0.75rem;">
          <div style="font-size:0.68rem; font-weight:700; letter-spacing:0.1em; text-transform:uppercase; color:var(--muted);">Acabado / Opción</div>
          <div class="variant-grid">
            ${p.variants.slice(0, 12).map((vr, i) => `
              <button type="button" class="variant-btn ${i === selectedIdx ? 'active' : ''}" data-vidx="${i}">
                ${(vr.options && vr.options.length) ? vr.options.join(' / ') : vr.title}
              </button>
            `).join('')}
          </div>
        </div>` : '';

      modal.innerHTML = `
        <div class="qv-dialog">
          <button class="qv-close" type="button" aria-label="Cerrar" onclick="MistApp.closeQuickView()">✕</button>
          <div style="background:var(--bg); min-height:360px;">
            <img src="${img}" alt="${p.title}" style="width:100%; height:100%; object-fit:cover;">
          </div>
          <div style="padding:2rem; display:flex; flex-direction:column; justify-content:center;">
            <span class="mist-kicker">${getMainSpaceLabel(p)}</span>
            <h3 class="mist-h2" style="font-size:1.8rem; margin-bottom:0.4rem;">${p.title}</h3>
            <div style="font-size:1.18rem; font-weight:700; color:var(--forest-btn); margin-bottom:0.75rem;">${formatCOP(v.price || p.price)}</div>
            <p style="font-size:0.84rem; color:var(--muted); margin:0 0 0.85rem;">${p.excerpt}</p>
            ${optsHtml}
            <div style="display:flex; flex-direction:column; gap:0.5rem; margin-top:auto;">
              <button type="button" class="btn-mist" id="qvAddBtn">Agregar a la bolsa &rarr;</button>
              <a href="producto.html?slug=${encodeURIComponent(p.slug)}" class="btn-mist-outline">Ver ficha completa</a>
            </div>
          </div>
        </div>`;

      modal.querySelectorAll('[data-vidx]').forEach(btn => {
        btn.addEventListener('click', () => { selectedIdx = Number(btn.dataset.vidx); render(); });
      });
      modal.querySelector('#qvAddBtn')?.addEventListener('click', () => {
        closeQuickView();
        addToCart(p.id, selectedIdx);
      });
    };
    render();
    modal.classList.add('open');
  };

  const closeQuickView = () => document.getElementById('qvModal')?.classList.remove('open');

  const mountChrome = () => {
    const page = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
    const isHome = (page === 'index.html' || page === '');
    const furnitureSubs = [
      { label: 'Todo el catálogo', col: '' },
      { label: 'Sala', col: 'Sala' },
      { label: 'Comedor', col: 'Comedor' },
      { label: 'Habitación', col: 'Habitación' },
      { label: 'Un verano atemporal', col: 'Verano Atemporal' },
      { label: 'Estudio', col: 'Estudio' },
      { label: 'Mascotas', col: 'Mascotas' },
      { label: 'Decoración y Styling', col: 'Decoración y Styling' },
      { label: 'Iluminación', col: 'Iluminación' }
    ];

    const searchSvg = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.35-4.35"/></svg>`;
    const bagSvg = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M6 7h12l1 13H5L6 7z"/><path d="M9 7V5a3 3 0 0 1 6 0v2"/></svg>`;
    const wishCount = getWish().length;

    const headerWrap = document.createElement('div');
    headerWrap.innerHTML = `
      <header class="site-header ${isHome ? 'is-fixed-home is-hero-top' : ''}" id="siteHeader">
        <div class="header-inner">
          <a href="index.html" aria-label="MIST DESIGN" style="display:inline-flex; align-items:center;">
            <img src="${DATA.brand.logo || ''}" alt="MIST DESIGN" style="height:36px; width:auto; object-fit:contain;">
          </a>

          <nav class="mist-nav-pill" aria-label="Menú Principal">
            <div class="nav-item"><a class="nav-link ${isHome ? 'active' : ''}" href="index.html">Inicio</a></div>
            <div class="nav-item">
              <a class="nav-link ${page === 'catalogo.html' || page === 'producto.html' ? 'active' : ''}" href="catalogo.html">Furniture ▾</a>
              <div class="nav-dropdown">
                ${furnitureSubs.map(s => `<a href="catalogo.html${s.col ? '?col=' + encodeURIComponent(s.col) : ''}"><span>${s.label}</span><span>→</span></a>`).join('')}
              </div>
            </div>
            <div class="nav-item"><a class="nav-link ${page === 'manifiesto.html' ? 'active' : ''}" href="manifiesto.html">Manifiesto</a></div>
            <div class="nav-item"><a class="nav-link ${page === 'diario.html' ? 'active' : ''}" href="diario.html">Blog</a></div>
            <div class="nav-item"><a class="nav-link ${page === 'alianzas.html' ? 'active' : ''}" href="alianzas.html">Alianzas</a></div>
          </nav>

          <div class="header-actions">
            <a href="catalogo.html#buscar" class="mist-circle-btn" title="Buscar" aria-label="Buscar">${searchSvg}</a>
            <a href="catalogo.html?wish=1" class="mist-circle-btn" title="Favoritos" aria-label="Favoritos">
              <span>♡</span>
              <span class="circle-badge js-wish-count">${wishCount}</span>
            </a>
            <button class="mist-circle-btn" type="button" onclick="MistApp.openCart()" title="Bolsa" aria-label="Bolsa">
              ${bagSvg}
              <span class="circle-badge js-cart-count">0</span>
            </button>
            <a href="contacto.html" class="mist-contact-link">Contacto</a>
            <button class="mobile-toggle" type="button" onclick="document.getElementById('mobileDrawer').classList.toggle('open')">Menú</button>
          </div>
        </div>
      </header>
      <div class="mobile-drawer" id="mobileDrawer">
        <button type="button" onclick="this.parentElement.classList.remove('open')" style="align-self:flex-end; border:1px solid rgba(255,255,255,0.28); background:transparent; color:#fff; padding:0.45rem 0.9rem; border-radius:999px; font-weight:600;">✕ Cerrar</button>
        <a href="index.html" style="font-size:1.25rem; font-weight:700; border-bottom:1px solid rgba(255,255,255,0.14); padding-bottom:0.6rem;">Inicio</a>
        <div style="font-size:0.7rem; font-weight:700; letter-spacing:0.14em; text-transform:uppercase; color:var(--sand); margin-top:0.4rem;">Furniture menú</div>
        ${furnitureSubs.map(s => `<a href="catalogo.html${s.col ? '?col=' + encodeURIComponent(s.col) : ''}" style="font-size:0.95rem; padding-left:0.6rem; color:rgba(255,255,255,0.88);">${s.label}</a>`).join('')}
        <a href="manifiesto.html" style="font-size:1.05rem; font-weight:600; border-top:1px solid rgba(255,255,255,0.14); padding-top:0.7rem;">Manifiesto</a>
        <a href="diario.html" style="font-size:1.05rem; font-weight:600;">Blog</a>
        <a href="alianzas.html" style="font-size:1.05rem; font-weight:600;">Alianzas Mist</a>
        <a href="contacto.html" style="font-size:1.05rem; font-weight:600;">Contacto &amp; Cita individual</a>
      </div>
    `;
    document.body.prepend(headerWrap);

    const drawers = document.createElement('div');
    drawers.innerHTML = `
      <div class="drawer-backdrop" id="drawerBackdrop" onclick="MistApp.closeCart()"></div>
      <aside class="cart-drawer" id="cartDrawer" aria-label="Bolsa de compras">
        <div class="drawer-head">
          <div>
            <span class="mist-kicker" style="margin-bottom:0;">tu selección</span>
            <h3 style="font-size:1.18rem; font-weight:700; color:var(--forest); margin:0.15rem 0 0;">Bolsa MIST (<span class="js-cart-count">0</span>)</h3>
          </div>
          <button type="button" onclick="MistApp.closeCart()" style="border:1px solid var(--hairline); background:#fff; width:34px; height:34px; border-radius:50%;">✕</button>
        </div>
        <div class="drawer-body" id="cartDrawerBody"></div>
        <div class="drawer-foot" id="cartDrawerFoot"></div>
      </aside>
      <a class="wa-float" href="https://wa.me/${DATA.brand.whatsapp}?text=hola%20quiero%20mas%20informaci%C3%B3n" target="_blank" rel="noopener">
        WhatsApp · ${DATA.brand.whatsapp_display}
      </a>
    `;
    document.body.appendChild(drawers);

    const footer = document.createElement('footer');
    footer.className = 'mist-footer';
    footer.innerHTML = `
      <div class="container">
        <div class="footer-grid">
          <div>
            <img src="${DATA.brand.logo || ''}" alt="MIST DESIGN" style="height:38px; margin-bottom:1rem;">
            <p style="font-size:0.84rem; color:rgba(255,255,255,0.82); max-width:320px; margin:0 0 0.85rem;">
              Contamos <span class="font-bimbo" style="font-size:1.45rem; color:var(--sand);">historias</span> a través de piezas únicas.
            </p>
            <p style="font-size:0.76rem; color:rgba(255,255,255,0.62); line-height:1.6; margin:0;">
              ${DATA.brand.company} · NIT ${DATA.brand.nit}<br>
              ${DATA.brand.address}<br>
              ${DATA.brand.hours}
            </p>
          </div>
          <div>
            <h4 class="footer-heading">Menú</h4>
            <ul class="footer-links">
              <li><a href="catalogo.html">Catálogo</a></li>
              <li><a href="manifiesto.html">Manifiesto</a></li>
              <li><a href="diario.html">Blog</a></li>
              <li><a href="alianzas.html">Alianzas Mist</a></li>
              <li><a href="contacto.html">Contacto &amp; Cita individual</a></li>
            </ul>
          </div>
          <div>
            <h4 class="footer-heading">Envíos &amp; Legal</h4>
            <ul class="footer-links">
              <li><a href="politicas.html#terminos">Términos y condiciones</a></li>
              <li><a href="politicas.html#devoluciones">Envíos y reembolsos</a></li>
              <li><a href="politicas.html#privacidad">Privacidad</a></li>
            </ul>
            <img src="https://assets.zyrosite.com/xnVtBOd44LiC4fNz/metodos-de-pago-jWJ8RG8m9NOS1eyl.png" alt="Métodos de pago" style="margin-top:0.9rem; max-width:165px; display:block;">
          </div>
          <div>
            <h4 class="footer-heading">Contacto</h4>
            <ul class="footer-links">
              <li><a href="mailto:${DATA.brand.email}">${DATA.brand.email}</a></li>
              <li><a href="https://wa.me/${DATA.brand.whatsapp}" target="_blank">WhatsApp ${DATA.brand.whatsapp_display}</a></li>
              <li><a href="${DATA.brand.instagram}" target="_blank">Instagram @mist.design.co</a></li>
            </ul>
          </div>
        </div>
        <div class="footer-bottom">
          <span>© 2026 MIST DESIGN. Todos los derechos reservados.</span>
          <span>Bogotá, Colombia</span>
        </div>
      </div>
    `;
    document.body.appendChild(footer);

    if (isHome) {
      const syncHeader = () => {
        const hdr = document.getElementById('siteHeader');
        if (!hdr) return;
        hdr.classList.toggle('is-hero-top', window.scrollY < 60);
      };
      window.addEventListener('scroll', syncHeader, { passive: true });
      syncHeader();
    }

    updateCartUI();
  };

  document.addEventListener('DOMContentLoaded', mountChrome);

  window.MistApp = {
    DATA,
    formatCOP,
    addToCart,
    changeQty,
    openCart,
    closeCart,
    toggleWish,
    getWish,
    applyPromo,
    renderProductCard,
    openQuickView,
    closeQuickView,
    toast
  };
})();
