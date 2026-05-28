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
     images: [
    "images/Grimflight/Gf1.jpg",
    "images/Grimflight/Gf2.jpg"
     ],
    year: "2024",
    medium: "Acrylic on canvas",
    textColor: "white",
    description: "<em>When you can't ride dragons, you paint it instead<em>. This painting was inspired by Game of Thrones."
  },

 {
   title: "The Whispers of the North",
   images: [
    "images/Whispers/Whispers1.jpg",
    "images/Whispers/Whispers2.jpg"
   ],
   year: "2025",
   medium: "Acrylic on canvas",
   textColor: "white",
    description: "This painting is about a folklore with nymphs"
   },

   {
   title: "The Woven Arcana",
   images: [
    "images/WovenArcana/WA1.jpg",
    "images/WovenArcana/WA2.jpg",
    "images/WovenArcana/WA3.jpg"
   ],
   year: "2025",
   medium: "Acrylic on canvas",
   textColor: "white",
    description: "This painting is about a book."
   },

   {
   title: "Shadowrider",
   images: [
    "images/Shadowrider/Shadowrider1.jpg",
    "images/Shadowrider/Shadowrider2.jpg",
     ],
   year: "2025",
   medium: "Acrylic on canvas",
   textColor: "white",
   imageFit: "contain",
   description: "This painting is about dragons."
   },

   {
   title: "The dream of a better world",
   images: "images/Dotbw1.jpg",
   year: "2025",
   medium: "Acrylic on canvas",
   textColor: "white",
    description: "This painting is about a book."
   },

   {
   title: "Luminous Flight",
   images: [
    "images/luminousflight/Luminousflight1.jpg"
     ],
   year: "2026",
   medium: "Acrylic on canvas",
   textColor: "white",
    description: "This painting is about escapisim."
   },
   
   {
   title: "The High Witch and Her Ride",
   images: [
    "images/THWR/THWAHR1.jpg",
    "images/THWR/THWAHR2.jpg"
   ],
   year: "2026",
   medium: "Acrylic on canvas",
   textColor: "white",
    description: "This painting is about the witch and her dragons."
   },

    {
   title: "The Crossing",
   images: "images/oracle1.png",
   year: "2026",
   medium: "Acrylic on canvas",
   textColor: "white",
    description: "This painting is about a lady going in the gate."
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

    const displayImage = Array.isArray(a.images)
      ? a.images[0]
      : a.images;

    el.innerHTML = `
      <img 
        src="${displayImage}" 
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

let currentArtworkIndex = 0;
let currentImageIndex = 0;
// ── LIGHTBOX ──
function openLightbox(idx) {
  const a = artworks[idx];
 currentArtworkIndex = idx;
currentImageIndex = 0;

const firstImage = Array.isArray(a.images)
  ? a.images[0]
  : a.images;

document.getElementById('lightboxArt').innerHTML =
  `<img src="${firstImage}" alt="${a.title}" class="lightbox-image">`;

  document.getElementById('lightboxTitle').textContent = a.title;

  document.getElementById('lightboxMeta').textContent =
    `${a.medium} · ${a.year}`;

  document.getElementById('lightboxDesc').innerHTML = a.description;

  document.getElementById('lightbox').classList.add('open');

  document.body.style.overflow = 'hidden';
}
function changeImage(direction) {
  const artwork = artworks[currentArtworkIndex];

  if (!Array.isArray(artwork.images)) return;

  currentImageIndex += direction;

  if (currentImageIndex < 0) {
    currentImageIndex = artwork.images.length - 1;
  }

  if (currentImageIndex >= artwork.images.length) {
    currentImageIndex = 0;
  }

  document.getElementById('lightboxArt').innerHTML =
    `<img src="${artwork.images[currentImageIndex]}" 
    alt="${artwork.title}" 
    class="lightbox-image">`;
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

