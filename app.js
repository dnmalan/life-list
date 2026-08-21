/*
  APP LOGIC
  =========
  Renders the filter stamps and the photo grid from js/photos-data.js,
  and handles the filtering behavior:

  - Clicking a filter toggles it on/off (multi-select)
  - Filters within the SAME category are OR'd together
    (e.g. Waterfowl + Corvids shows anything tagged either one)
  - Filters ACROSS categories are AND'd together
    (e.g. Waterfowl + Europe shows only waterfowl seen in Europe)
  - "Clear filters" resets everything
*/

(function () {
  const activeFilters = {
    location: new Set(),
    birdType: new Set(),
  };

  const filterBar = document.getElementById("filter-bar");
  const grid = document.getElementById("photo-grid");
  const emptyState = document.getElementById("empty-state");
  const clearBtn = document.getElementById("clear-filters");
  const resultCount = document.getElementById("result-count");

  function buildFilterGroup(categoryKey, categoryLabel, items) {
    const group = document.createElement("div");
    group.className = "filter-group";

    const heading = document.createElement("span");
    heading.className = "filter-group__label";
    heading.textContent = categoryLabel;
    group.appendChild(heading);

    const row = document.createElement("div");
    row.className = "filter-group__row";

    items.forEach((item) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "stamp";
      btn.dataset.category = categoryKey;
      btn.dataset.value = item.id;
      btn.setAttribute("aria-pressed", "false");
      btn.textContent = item.label;
      btn.addEventListener("click", () => toggleFilter(categoryKey, item.id, btn));
      row.appendChild(btn);
    });

    group.appendChild(row);
    return group;
  }

  function toggleFilter(categoryKey, value, btn) {
    const set = activeFilters[categoryKey];
    if (set.has(value)) {
      set.delete(value);
      btn.classList.remove("stamp--active");
      btn.setAttribute("aria-pressed", "false");
    } else {
      set.add(value);
      btn.classList.add("stamp--active");
      btn.setAttribute("aria-pressed", "true");
    }
    renderPhotos();
  }

  function clearAllFilters() {
    activeFilters.location.clear();
    activeFilters.birdType.clear();
    document.querySelectorAll(".stamp--active").forEach((btn) => {
      btn.classList.remove("stamp--active");
      btn.setAttribute("aria-pressed", "false");
    });
    renderPhotos();
  }

  function matchesFilters(photo) {
    const locOk =
      activeFilters.location.size === 0 || activeFilters.location.has(photo.location);
    const typeOk =
      activeFilters.birdType.size === 0 ||
      photo.types.some((t) => activeFilters.birdType.has(t));
    return locOk && typeOk;
  }

  function card(photo) {
    const el = document.createElement("figure");
    el.className = "specimen";

    const img = document.createElement("img");
    img.src = photo.src;
    img.alt = photo.alt;
    img.loading = "lazy";
    el.appendChild(img);

    const caption = document.createElement("figcaption");

    const nameRow = document.createElement("div");
    nameRow.className = "specimen__name";
    const num = document.createElement("span");
    num.className = "specimen__number";
    num.textContent = `No. ${photo.number}`;
    const species = document.createElement("span");
    species.className = "specimen__species";
    species.textContent = photo.species;
    nameRow.appendChild(num);
    nameRow.appendChild(species);
    caption.appendChild(nameRow);

    if (photo.scientific) {
      const sci = document.createElement("span");
      sci.className = "specimen__scientific";
      sci.textContent = photo.scientific;
      caption.appendChild(sci);
    }

    const tagRow = document.createElement("div");
    tagRow.className = "specimen__tags";
    const locLabel = FILTERS.location.find((f) => f.id === photo.location)?.label || photo.location;
    tagRow.appendChild(makeTagPill(locLabel));
    photo.types.forEach((t) => {
      const label = FILTERS.birdType.find((f) => f.id === t)?.label || t;
      tagRow.appendChild(makeTagPill(label));
    });
    caption.appendChild(tagRow);

    el.appendChild(caption);
    return el;
  }

  function makeTagPill(text) {
    const span = document.createElement("span");
    span.className = "tag-pill";
    span.textContent = text;
    return span;
  }

  function renderPhotos() {
    const visible = PHOTOS.filter(matchesFilters);
    grid.innerHTML = "";
    visible.forEach((photo) => grid.appendChild(card(photo)));

    const anyFilterActive =
      activeFilters.location.size > 0 || activeFilters.birdType.size > 0;

    if (visible.length === 0) {
      emptyState.hidden = false;
    } else {
      emptyState.hidden = true;
    }

    resultCount.textContent = anyFilterActive
      ? `Showing ${visible.length} of ${PHOTOS.length}`
      : `${PHOTOS.length} entries`;
  }

  function init() {
    filterBar.appendChild(
      buildFilterGroup("location", "Location", FILTERS.location)
    );
    filterBar.appendChild(
      buildFilterGroup("birdType", "Bird Type", FILTERS.birdType)
    );
    clearBtn.addEventListener("click", clearAllFilters);
    renderPhotos();
  }

  document.addEventListener("DOMContentLoaded", init);
})();
