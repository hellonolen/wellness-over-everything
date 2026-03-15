// =====================
// DLD DYNAMICS — main.js
// =====================

// SVG bottle fallback for broken product images
function showBottleFallback(img) {
  const parent = img.parentElement;
  const colorMap = [
    { key: 'Magnesium',    bg: '#E0F269', stroke: '#5A8A00', label: 'MAGNESIUM\nGLYCINATE' },
    { key: 'Beauty',       bg: '#DF169C', stroke: '#DF169C', label: 'BEAUTY\nHAIR · SKIN' },
    { key: 'Multivitamin', bg: '#9BFDF0', stroke: '#00BFB3', label: 'MULTI\nVITAMIN' },
    { key: 'Lion',         bg: '#4760FF', stroke: '#4760FF', label: "LION'S\nMANE" },
    { key: 'Ashwagandha',  bg: '#E0F269', stroke: '#5A8A00', label: 'ASHWA-\nGANDHA' },
    { key: 'Vitamin D',    bg: '#FFF3EB', stroke: '#FF7A00', label: 'VITAMIN\nD3' },
    { key: 'Creatine',     bg: '#4760FF', stroke: '#4760FF', label: 'CREATINE\nPOWDER' },
    { key: 'Ginkgo',       bg: '#E0F269', stroke: '#5A8A00', label: 'GINKGO\nGINSENG' },
    { key: 'Strawberry',   bg: '#9BFDF0', stroke: '#DF169C', label: 'MULTI\nGUMMIES' },
  ];
  const alt = img.alt || '';
  const match = colorMap.find(c => alt.includes(c.key)) || { bg: '#F5F0EC', stroke: '#2D1025', label: 'DLD\nSUPPLEMENT' };
  const [l1, l2] = match.label.split('\n');
  const isDark = ['#4760FF', '#DF169C'].includes(match.stroke);
  const labelFill = isDark ? 'rgba(255,255,255,0.22)' : match.bg;
  const labelText = isDark ? '#ffffff' : match.stroke;
  const cap = match.stroke;
  parent.innerHTML = `
    <div style="display:flex;align-items:center;justify-content:center;height:100%;padding:24px 0;background:${match.bg};">
      <svg viewBox="0 0 90 140" width="130" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="${alt}">
        <rect x="28" y="4" width="34" height="18" rx="7" fill="${cap}"/>
        <rect x="18" y="18" width="54" height="112" rx="14" fill="white" stroke="${match.stroke}" stroke-width="2"/>
        <rect x="22" y="48" width="46" height="56" rx="6" fill="${labelFill}" stroke="${cap}" stroke-width="0.8" opacity="0.9"/>
        <text x="45" y="66" text-anchor="middle" font-size="7" font-weight="900" fill="${labelText}" font-family="Arial,sans-serif">DLD</text>
        <text x="45" y="76" text-anchor="middle" font-size="5.5" fill="${labelText}" font-family="Arial,sans-serif">DYNAMICS</text>
        <line x1="28" y1="82" x2="62" y2="82" stroke="${labelText}" stroke-width="0.8" opacity="0.5"/>
        <text x="45" y="93" text-anchor="middle" font-size="5" font-weight="700" fill="${labelText}" font-family="Arial,sans-serif">${l1}</text>
        <text x="45" y="101" text-anchor="middle" font-size="4.5" fill="${labelText}" font-family="Arial,sans-serif">${l2}</text>
        <ellipse cx="35" cy="120" rx="7" ry="4" fill="${match.stroke}" opacity="0.25"/>
        <ellipse cx="48" cy="123" rx="5" ry="3" fill="${match.stroke}" opacity="0.18"/>
        <ellipse cx="60" cy="119" rx="6" ry="3.5" fill="${match.stroke}" opacity="0.2"/>
      </svg>
    </div>`;
}

document.addEventListener('DOMContentLoaded', () => {

  // Sticky Nav
  const nav = document.querySelector('.nav');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
    updateStickyCart();
  }, { passive: true });

  // Scroll Reveal
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

  // FAQ Accordion
  document.querySelectorAll('.faq-item').forEach(item => {
    item.querySelector('.faq-question').addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    });
  });

  // ── Cart ──
  let cart = [];
  const cartCountEl  = document.querySelector('.cart-count');
  const cartDrawer   = document.getElementById('cartDrawer');
  const cartOverlay  = document.getElementById('cartOverlay');
  const cartEmpty    = document.getElementById('cartEmpty');
  const cartFooter   = document.getElementById('cartFooter');
  const cartTotalEl  = document.getElementById('cartTotal');
  const cartItemsEl  = document.getElementById('cartItems');
  const toast        = document.getElementById('toast');

  function openCart() {
    cartDrawer?.classList.add('open');
    cartOverlay?.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeCart() {
    cartDrawer?.classList.remove('open');
    cartOverlay?.classList.remove('open');
    document.body.style.overflow = '';
  }

  document.getElementById('cartBtn')?.addEventListener('click', openCart);
  document.getElementById('cartClose')?.addEventListener('click', closeCart);
  cartOverlay?.addEventListener('click', closeCart);

  function updateCartCount() {
    if (!cartCountEl) return;
    cartCountEl.textContent = cart.length;
    cartCountEl.style.display = cart.length > 0 ? 'flex' : 'none';
  }

  function renderCart() {
    cartItemsEl?.querySelectorAll('.cart-item').forEach(el => el.remove());
    if (cart.length === 0) {
      if (cartEmpty) cartEmpty.style.display = 'block';
      if (cartFooter) cartFooter.style.display = 'none';
      return;
    }
    if (cartEmpty) cartEmpty.style.display = 'none';
    if (cartFooter) cartFooter.style.display = 'block';

    cart.forEach((item, idx) => {
      const row = document.createElement('div');
      row.className = 'cart-item';
      row.innerHTML = `
        <img class="cart-item-img" src="${item.img || 'images/magnesium.jpg'}" alt="${item.name}" onerror="this.style.display='none'">
        <div class="cart-item-info">
          <div class="cart-item-name">${item.name}</div>
          <div class="cart-item-price">${item.price}</div>
        </div>
        <button class="cart-item-remove" data-idx="${idx}" aria-label="Remove">&#x2715;</button>
      `;
      cartItemsEl.appendChild(row);
    });

    cartItemsEl.querySelectorAll('.cart-item-remove').forEach(btn => {
      btn.addEventListener('click', () => {
        cart.splice(parseInt(btn.dataset.idx), 1);
        updateCartCount();
        renderCart();
      });
    });

    const total = cart.reduce((sum, item) => {
      return sum + (parseFloat(item.price.replace(/[^0-9.]/g, '')) || 0);
    }, 0);
    if (cartTotalEl) cartTotalEl.textContent = '$' + total.toFixed(2);
  }

  document.getElementById('clearCart')?.addEventListener('click', () => {
    cart = [];
    updateCartCount();
    renderCart();
  });

  window.addToCart = function(product) {
    cart.push(product);
    updateCartCount();
    renderCart();
    showToast(`${product.name} added`);
    setTimeout(openCart, 300);
  };

  function showToast(msg) {
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 2800);
  }

  // Sticky bottom bar
  const stickyCart = document.querySelector('.sticky-cart');
  function updateStickyCart() {
    stickyCart?.classList.toggle('visible', window.scrollY > 600);
  }
  document.querySelector('.sticky-cart-btn')?.addEventListener('click', () => {
    addToCart({ name: 'Magnesium Glycinate', price: '$26.90', img: 'images/magnesium.jpg' });
  });

  // Count-up
  const countObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseInt(el.dataset.count);
      const suffix = el.dataset.suffix || '';
      const prefix = el.dataset.prefix || '';
      let start = 0;
      const step = target / (1800 / 16);
      const timer = setInterval(() => {
        start = Math.min(start + step, target);
        el.textContent = prefix + Math.floor(start).toLocaleString() + suffix;
        if (start >= target) clearInterval(timer);
      }, 16);
      countObserver.unobserve(el);
    });
  }, { threshold: 0.5 });
  document.querySelectorAll('[data-count]').forEach(el => countObserver.observe(el));

  // Newsletter
  document.querySelector('.newsletter-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    e.target.querySelector('input').value = '';
    showToast('Welcome to DLD Dynamics!');
  });

  // Seamless marquee
  const track = document.querySelector('.marquee-track');
  if (track) track.innerHTML += track.innerHTML;

});
