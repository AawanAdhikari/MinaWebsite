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
  {
    title: "Grim Flight",
    image: "images/GF1.jpg",
    year: "2024",
    medium: "Acrylic on canvas",
    textColor: "black",
    description: "<em>When you can't ride dragons, you paint this instead<em>. This painting was inspired by Game of Thrones. "
  }
];

const aspectMap = { 0: '3/4', 1: '4/5', 2: '1/1', 3: '3/4', 4: '4/3', 5: '3/4', 6: '5/7', 7: '1/1' };

// ── GALLERY (used on works.html) ──
function buildGallery(filter) {
  const grid = document.getElementById('galleryGrid');
  if (!grid) return;

  grid.innerHTML = '';

  artworks.forEach((a, idx) => {
    const el = document.createElement('div');
    el.className = 'gallery-item';

    el.innerHTML = `
      <img src="${a.image}" alt="${a.title}" class="gallery-image">

      <div class="overlay">
      <div class="overlay-text" style="color:${a.textColor || 'white'}">
          <span class="overlay-title">${a.title}</span>
          <span class="overlay-info">${a.year}</span>
        </div>
      </div>
    `;

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

  document.getElementById('lightboxArt').innerHTML =
    `<img src="${a.image}" alt="${a.title}" class="lightbox-image">`;

  document.getElementById('lightboxTitle').textContent = a.title;
  document.getElementById('lightboxMeta').textContent =
    `${a.medium} · ${a.year}`;

  document.getElementById('lightboxDesc').innerHTML = a.description;

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