// =====================
// DLD DYNAMICS — main.js
// =====================

// ── Branded bottle SVG fallback for product card images ──
function showBottleFallback(img) {
  const parent = img.parentElement;
  // Define accent colors per product by alt text keyword
  const colorMap = [
    { key: 'Magnesium',   bg: '#E0F269', stroke: '#5A8A00', label: 'MAGNESIUM\nGLYCINATE' },
    { key: 'Beauty',      bg: '#DF169C', stroke: '#DF169C', label: 'BEAUTY\nHAIR · SKIN' },
    { key: 'Multivitamin',bg: '#9BFDF0', stroke: '#00BFB3', label: 'MULTI\nVITAMIN' },
    { key: 'Lion',        bg: '#4760FF', stroke: '#4760FF', label: "LION'S\nMANE" },
    { key: 'Ashwagandha', bg: '#E0F269', stroke: '#5A8A00', label: 'ASHWA-\nGANDHA' },
    { key: 'Vitamin D',   bg: '#FFF3EB', stroke: '#FF7A00', label: 'VITAMIN\nD3' },
    { key: 'Creatine',    bg: '#4760FF', stroke: '#4760FF', label: 'CREATINE\nPOWDER' },
    { key: 'Ginkgo',      bg: '#E0F269', stroke: '#5A8A00', label: 'GINKGO\nGINSENG' },
    { key: 'Strawberry',  bg: '#9BFDF0', stroke: '#DF169C', label: 'MULTI\nGUMMIES' },
  ];
  const alt = img.alt || '';
  let match = colorMap.find(c => alt.includes(c.key)) || { bg: '#F5F0EC', stroke: '#2D1025', label: 'DLD\nSUPPLEMENT' };
  const [l1, l2] = match.label.split('\n');
  const isDark = ['#4760FF','#DF169C'].includes(match.stroke);
  const labelFill = isDark ? 'rgba(255,255,255,0.22)' : match.bg;
  const labelText = isDark ? '#ffffff' : match.stroke;
  const capColor = match.stroke;
  parent.innerHTML = `
    <div style="display:flex;align-items:center;justify-content:center;height:100%;padding:24px 0;background:${match.bg};">
      <svg viewBox="0 0 90 140" width="130" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${alt || 'DLD Dynamics product'}">
        <!-- Cap -->
        <rect x="28" y="4" width="34" height="18" rx="7" fill="${capColor}"/>
        <!-- Bottle body -->
        <rect x="18" y="18" width="54" height="112" rx="14" fill="white" stroke="${match.stroke}" stroke-width="2"/>
        <!-- Label area -->
        <rect x="22" y="48" width="46" height="56" rx="6" fill="${labelFill}" stroke="${capColor}" stroke-width="0.8" opacity="0.9"/>
        <!-- Brand name -->
        <text x="45" y="66" text-anchor="middle" font-size="7" font-weight="900" fill="${labelText}" font-family="Arial, sans-serif">DLD</text>
        <text x="45" y="76" text-anchor="middle" font-size="5.5" fill="${labelText}" font-family="Arial, sans-serif">DYNAMICS</text>
        <!-- Divider -->
        <line x1="28" y1="82" x2="62" y2="82" stroke="${labelText}" stroke-width="0.8" opacity="0.5"/>
        <!-- Product name -->
        <text x="45" y="93" text-anchor="middle" font-size="5" font-weight="700" fill="${labelText}" font-family="Arial, sans-serif">${l1}</text>
        <text x="45" y="101" text-anchor="middle" font-size="4.5" fill="${labelText}" font-family="Arial, sans-serif">${l2}</text>
        <!-- Capsule pills decoration -->
        <ellipse cx="35" cy="120" rx="7" ry="4" fill="${match.stroke}" opacity="0.25"/>
        <ellipse cx="48" cy="123" rx="5" ry="3" fill="${match.stroke}" opacity="0.18"/>
        <ellipse cx="60" cy="119" rx="6" ry="3.5" fill="${match.stroke}" opacity="0.2"/>
      </svg>
    </div>`;
}

document.addEventListener('DOMContentLoaded', () => {

  // ── Sticky Nav ──
  const nav = document.querySelector('.nav');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
    updateStickyCart();
  }, { passive: true });

  // ── Scroll Reveal ──
  const reveals = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  reveals.forEach(el => revealObserver.observe(el));

  // ── FAQ Accordion ──
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      faqItems.forEach(i => i.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    });
  });

  // ── Cart State ──
  let cart = [];
  const cartCount = document.querySelector('.cart-count');
  const toast = document.getElementById('toast');

  window.addToCart = function(product) {
    cart.push(product);
    cartCount.textContent = cart.length;
    cartCount.style.display = 'flex';
    showToast(`${product.name} added to cart ✓`);
  };

  function showToast(message) {
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 2800);
  }

  // ── Sticky Cart ──
  const stickyCart = document.querySelector('.sticky-cart');
  function updateStickyCart() {
    if (window.scrollY > 600) {
      stickyCart.classList.add('visible');
    } else {
      stickyCart.classList.remove('visible');
    }
  }

  document.querySelector('.sticky-cart-btn')?.addEventListener('click', () => {
    addToCart({ name: 'Magnesium Glycinate', price: '$26.90' });
  });

  // ── Count-up animation ──
  const countEls = document.querySelectorAll('[data-count]');
  const countObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.count);
        const suffix = el.dataset.suffix || '';
        const prefix = el.dataset.prefix || '';
        let start = 0;
        const duration = 1800;
        const step = target / (duration / 16);
        const timer = setInterval(() => {
          start = Math.min(start + step, target);
          el.textContent = prefix + Math.floor(start).toLocaleString() + suffix;
          if (start >= target) clearInterval(timer);
        }, 16);
        countObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  countEls.forEach(el => countObserver.observe(el));

  // ── Newsletter Form ──
  document.querySelector('.newsletter-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = e.target.querySelector('input');
    showToast('Welcome to DLD Dynamics! Check your email ✓');
    input.value = '';
  });

  // ── Duplicate marquee for seamless loop ──
  const track = document.querySelector('.marquee-track');
  if (track) {
    track.innerHTML += track.innerHTML;
  }

});
