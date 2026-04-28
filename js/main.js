// ── NAV SCROLL BORDER ──
window.addEventListener('scroll', () => {
  document.getElementById('mainNav').classList.toggle('scrolled', window.scrollY > 20);
});

// ── MOBILE MENU ──
function toggleMenu() {
  const menu = document.getElementById('mobileMenu');
  menu.classList.toggle('open');
  document.body.style.overflow = menu.classList.contains('open') ? 'hidden' : '';
}

// ── ARTWORK DATA (shared across gallery + lightbox) ──
const artworks = [
  { title: 'Still Life No. 7',  meta: 'Oil on Canvas · 60×60cm · 2024',     desc: 'A study in domestic quiet. Objects on a windowsill, caught in late afternoon light.', cls: 'ap1', tag: 'oil' },
  { title: 'Interior Light',    meta: 'Acrylic on Board · 40×50cm · 2024',   desc: 'The geometry of an empty room. Shadow and warmth in equal measure.',                  cls: 'ap2', tag: 'acrylic' },
  { title: 'Afternoon, Soft',   meta: 'Oil on Linen · 80×80cm · 2023',       desc: 'Hazy, warm, unhurried. The painting holds a moment that barely lasted.',               cls: 'ap3', tag: 'oil' },
  { title: 'Vessel Study I',    meta: 'Oil on Canvas · 30×40cm · 2023',      desc: 'A ceramic bowl. Its shadow longer than itself.',                                        cls: 'ap4', tag: 'studies' },
  { title: 'Morning Room',      meta: 'Acrylic on Canvas · 90×70cm · 2023',  desc: 'Early light across a white wall. Nothing has happened yet.',                          cls: 'ap5', tag: 'acrylic' },
  { title: 'Vessel Study II',   meta: 'Oil on Board · 30×40cm · 2022',       desc: 'Continuation of the vessel series. A different angle, the same stillness.',             cls: 'ap6', tag: 'studies' },
  { title: 'Window, East',      meta: 'Oil on Linen · 50×70cm · 2022',       desc: 'The window as a frame within a frame. Light entering, unhurried.',                     cls: 'ap2', tag: 'oil' },
  { title: 'Pale Ground',       meta: 'Acrylic on Canvas · 100×100cm · 2022',desc: 'Large and spare. A field of warm white with one soft edge of colour.',                cls: 'ap1', tag: 'acrylic' },
];

const aspectMap = { 0:'3/4', 1:'4/5', 2:'1/1', 3:'3/4', 4:'4/3', 5:'3/4', 6:'5/7', 7:'1/1' };

// ── GALLERY (used on works.html) ──
function buildGallery(filter) {
  const grid = document.getElementById('galleryGrid');
  if (!grid) return;
  grid.innerHTML = '';
  const items = filter === 'all' ? artworks : artworks.filter(a => a.tag === filter);
  items.forEach(a => {
    const idx = artworks.indexOf(a);
    const el = document.createElement('div');
    el.className = 'gallery-item';
    el.innerHTML = `
      <div class="art-placeholder ${a.cls}" style="aspect-ratio:${aspectMap[idx] || '3/4'}"></div>
      <div class="overlay">
        <div class="overlay-text">
          <span class="overlay-title">${a.title}</span>
          <span class="overlay-info">${a.meta.split('·')[0].trim()}</span>
        </div>
      </div>`;
    el.onclick = () => openLightbox(idx);
    grid.appendChild(el);
  });
}

function filterGallery(tag, el) {
  document.querySelectorAll('.gallery-filter li').forEach(li => li.classList.remove('active'));
  el.classList.add('active');
  buildGallery(tag);
}

// ── LIGHTBOX ──
function openLightbox(idx) {
  const a = artworks[idx];
  document.getElementById('lightboxArt').className = 'lightbox-art art-placeholder ' + a.cls;
  document.getElementById('lightboxTitle').textContent = a.title;
  document.getElementById('lightboxMeta').textContent = a.meta;
  document.getElementById('lightboxDesc').textContent = a.desc;
  document.getElementById('lightbox').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox(e) {
  if (!e || e.target === document.getElementById('lightbox') || e.target.classList.contains('lightbox-close')) {
    document.getElementById('lightbox').classList.remove('open');
    document.body.style.overflow = '';
  }
}

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeLightbox({ target: document.getElementById('lightbox') });
});

// ── CONTACT FORM ──
function handleSubmit(e) {
  e.preventDefault();
  document.getElementById('contactForm').style.display = 'none';
  document.getElementById('formSuccess').style.display = 'block';
}

// ── INIT (runs on any page that needs it) ──
if (document.getElementById('galleryGrid')) buildGallery('all');

  // Add dark mode toggle (if needed)
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    prefersDarkScheme.addEventListener('change', (e) => {
        if (e.matches) {
            document.body.classList.add('dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
        }
    });