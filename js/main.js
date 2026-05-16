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
   title: "Luminous Flight",
   image: "images/luminousframe1.jpg",
   year: "2026",
   medium: "Acrylic on canvas",
   textColor: "white",
    description: "This painting is about escapisim."
   },

 {
   title: "Shadowrider",
   image: "images/shadowriderframe1.jpg",
   year: "2025",
   medium: "Acrylic on canvas",
   textColor: "white",
   imageFit: "contain",
   description: "This painting is about dragons."
   },

  {
    title: "Grim Flight",
    image: "images/GF1.jpg",
    year: "2024",
    medium: "Acrylic on canvas",
    textColor: "white",
    description: "<em>When you can't ride dragons, you paint it instead<em>. This painting was inspired by Game of Thrones. "
  },

    {
   title: "The High Witch and Her Ride",
   image: "images/highwitchframe1.jpg",
   year: "2026",
   medium: "Acrylic on canvas",
   textColor: "white",
    description: "This painting is about the witch and her dragons."
   },

    {
   title: "The Crossing",
   image: "images/oracleframe1.jpg",
   year: "2026",
   medium: "Acrylic on canvas",
   textColor: "white",
    description: "This painting is about a lady going in the gate."
   },

  {
   title: "The Woven Arcana",
   image: "images/WovenArcana.jpg",
   year: "2025",
   medium: "Acrylic on canvas",
   textColor: "white",
    description: "This painting is about a book."
   },

   {
   title: "The dream of a better world",
   image: "images/dreamofbetterworld.png",
   year: "2025",
   medium: "Acrylic on canvas",
   textColor: "white",
    description: "This painting is about a book."
   },

    {
   title: "The Whispers of the North",
   image: "images/whispers.jpg",
   year: "2025",
   medium: "Acrylic on canvas",
   textColor: "white",
    description: "This painting is about a folklore with nymphs"
   },
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
    <img 
  src="${a.image}" 
  alt="${a.title}" 
  class="gallery-image"
  style="object-fit:${a.imageFit || 'cover'}"
>
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

// ── runs on any page that needs it ──
if (document.getElementById('galleryGrid')) buildGallery('all');

