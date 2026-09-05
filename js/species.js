/*
  SPECIES PAGE LOGIC
  ==================
  Reads ?slug=... from the URL, finds that species in js/data.js, renders
  every photo of it, and wires up a lightbox: clicking a photo enlarges it
  with its full caption (exact location, date, notes), with prev/next
  navigation and Escape/backdrop-click to close.
*/

(function () {
  const slug = new URLSearchParams(window.location.search).get("slug");
  const species = getSpeciesBySlug(slug);

  const notFound = document.getElementById("not-found");
  const content = document.getElementById("species-content");

  if (!species) {
    notFound.hidden = false;
    content.hidden = true;
    return;
  }

  document.title = `${species.name} — Life List`;

  document.getElementById("species-number").textContent = `No. ${species.number}`;
  document.getElementById("species-name").textContent = species.name;
  const sciEl = document.getElementById("species-scientific");
  if (species.scientific) {
    sciEl.textContent = species.scientific;
  } else {
    sciEl.remove();
  }

  const kindMeta = KINDS.find((k) => k.id === species.kind);
  const backLink = document.getElementById("back-link");
  backLink.href = `index.html#kind-${species.kind}`;
  backLink.textContent = `← Back to ${kindMeta ? kindMeta.label : "Life List"}`;

  const tagRow = document.getElementById("species-tags");
  const filterConfig = FILTERS[species.kind];
  species.types.forEach((t) => {
    const label = filterConfig?.type.find((f) => f.id === t)?.label || t;
    tagRow.appendChild(makeTagPill(label));
  });
  getSpeciesLocations(species).forEach((loc) => {
    const label = filterConfig?.location.find((f) => f.id === loc)?.label || loc;
    tagRow.appendChild(makeTagPill(label));
  });

  const grid = document.getElementById("species-grid");
  species.photos.forEach((photo, index) => {
    grid.appendChild(photoCard(photo, index));
  });

  function makeTagPill(text) {
    const span = document.createElement("span");
    span.className = "tag-pill";
    span.textContent = text;
    return span;
  }

  function photoCard(photo, index) {
    const fig = document.createElement("figure");
    fig.className = "specimen photo-card";

    const button = document.createElement("button");
    button.type = "button";
    button.className = "photo-card__button";
    button.setAttribute("aria-label", `Enlarge photo from ${photo.location || species.name}`);

    const img = document.createElement("img");
    img.src = photo.src;
    img.alt = photo.alt;
    img.loading = "lazy";
    button.appendChild(img);
    button.addEventListener("click", () => openLightbox(index));
    fig.appendChild(button);

    const caption = document.createElement("figcaption");
    if (photo.location) {
      const loc = document.createElement("span");
      loc.className = "photo-card__location";
      loc.textContent = photo.location;
      caption.appendChild(loc);
    }
    if (photo.date) {
      const date = document.createElement("span");
      date.className = "photo-card__date";
      date.textContent = formatDate(photo.date);
      caption.appendChild(date);
    }
    fig.appendChild(caption);
    return fig;
  }

  /* ---------------- Lightbox ---------------- */

  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const lightboxLocation = document.getElementById("lightbox-location");
  const lightboxDate = document.getElementById("lightbox-date");
  const lightboxNotes = document.getElementById("lightbox-notes");
  const lightboxClose = document.getElementById("lightbox-close");
  const lightboxPrev = document.getElementById("lightbox-prev");
  const lightboxNext = document.getElementById("lightbox-next");

  let currentIndex = 0;
  let lastFocusedEl = null;

  function openLightbox(index) {
    currentIndex = index;
    lastFocusedEl = document.activeElement;
    renderLightbox();
    lightbox.hidden = false;
    document.body.classList.add("lightbox-open");
    lightboxClose.focus();
    document.addEventListener("keydown", handleKeydown);
  }

  function closeLightbox() {
    lightbox.hidden = true;
    document.body.classList.remove("lightbox-open");
    document.removeEventListener("keydown", handleKeydown);
    if (lastFocusedEl) lastFocusedEl.focus();
  }

  function step(delta) {
    const total = species.photos.length;
    currentIndex = (currentIndex + delta + total) % total;
    renderLightbox();
  }

  function renderLightbox() {
    const photo = species.photos[currentIndex];
    lightboxImg.src = photo.src;
    lightboxImg.alt = photo.alt;
    lightboxLocation.textContent = photo.location || "";
    lightboxDate.textContent = formatDate(photo.date);
    lightboxNotes.textContent = photo.notes || "";
    lightboxNotes.hidden = !photo.notes;
    const multi = species.photos.length > 1;
    lightboxPrev.hidden = !multi;
    lightboxNext.hidden = !multi;
  }

  function handleKeydown(e) {
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowLeft") step(-1);
    if (e.key === "ArrowRight") step(1);
  }

  lightboxClose.addEventListener("click", closeLightbox);
  lightboxPrev.addEventListener("click", () => step(-1));
  lightboxNext.addEventListener("click", () => step(1));
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();
  });
})();
