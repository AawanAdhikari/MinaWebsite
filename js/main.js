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

let artworks = [];

function createSlug(title) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

fetch("artworks.json")
  .then(response => response.json())
  .then(data => {
    artworks = data;
    console.log(artworks);

    if (document.getElementById('galleryGrid')) {
      buildGallery('all');
    }
    openArtworkFromURL();
  })
  .catch(error => {
    console.error("Error loading artworks:", error);
  });
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

   el.onclick = () => {
  openLightbox(idx);
  history.replaceState(null, '', `#${createSlug(a.title)}`);
};

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

// Create a URL-friendly name from the artwork title
function createArtworkSlug(title) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-');
}

// ── LIGHTBOX ──
function openLightbox(idx, updateURL = true) {
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

  // Add the artwork name to the URL
  if (updateURL) {
    const slug = createArtworkSlug(a.title);
    window.history.pushState(null, '', `#${slug}`);
  }

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

// Open artwork automatically when a specific artwork URL is visited
function openArtworkFromURL() {
  const slug = window.location.hash.substring(1);

  if (!slug) return;

  const artworkIndex = artworks.findIndex(
    artwork => createArtworkSlug(artwork.title) === slug
  );

  if (artworkIndex !== -1) {
    openLightbox(artworkIndex, false);
  }
}

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeLightbox({ target: document.getElementById('lightbox') });
});

// CONTACT FORM --
function handleSubmit(e) {
  e.preventDefault();
  document.getElementById('contactForm').style.display = 'none';
  document.getElementById('formSuccess').style.display = 'block';
}
//-- commision waitlist --
const commissionForm = document.getElementById("commissionForm");
const commissionSuccess = document.getElementById("commissionSuccess");

if (commissionForm) {
  commissionForm.addEventListener("submit", async function (e) {

  if (!commissionForm.checkValidity()) {
    commissionForm.reportValidity();
    return;
  }

  e.preventDefault();

  const data = new FormData(commissionForm);

  const response = await fetch(commissionForm.action, {
    method: "POST",
    body: data,
    headers: {
      Accept: "application/json"
    }
  });

  if (response.ok) {
    commissionForm.style.display = "none";
    commissionSuccess.style.display = "block";
  } else {
    alert("Something went wrong. Please try again.");
  }
});
}