/*
  SHARED UI HELPERS
  =================
  Used by both js/home.js (capped homepage grid) and js/all.js (the "see all"
  page for one kind). Keeping this in one place means a filter or card style
  change only needs to happen here.
*/

function buildFilterBar(kindId, activeFilters, onChange) {
  const filterConfig = FILTERS[kindId];
  const bar = document.createElement("div");
  bar.className = "filter-bar";
  bar.setAttribute("role", "group");
  bar.setAttribute("aria-label", `Filter ${kindId}`);
  if (!filterConfig) return bar;

  bar.appendChild(
    buildFilterGroup("location", "Location", filterConfig.location, activeFilters, onChange)
  );
  bar.appendChild(
    buildFilterGroup("type", filterConfig.typeLabel, filterConfig.type, activeFilters, onChange)
  );
  return bar;
}

function buildFilterGroup(categoryKey, categoryLabel, items, activeFilters, onChange) {
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
    btn.setAttribute("aria-pressed", "false");
    btn.textContent = item.label;
    btn.addEventListener("click", () => {
      const set = activeFilters[categoryKey];
      if (set.has(item.id)) {
        set.delete(item.id);
        btn.classList.remove("stamp--active");
        btn.setAttribute("aria-pressed", "false");
      } else {
        set.add(item.id);
        btn.classList.add("stamp--active");
        btn.setAttribute("aria-pressed", "true");
      }
      onChange();
    });
    row.appendChild(btn);
  });
  group.appendChild(row);
  return group;
}

function clearFilterBar(filterBarEl, activeFilters, onChange) {
  activeFilters.location.clear();
  activeFilters.type.clear();
  filterBarEl.querySelectorAll(".stamp--active").forEach((btn) => {
    btn.classList.remove("stamp--active");
    btn.setAttribute("aria-pressed", "false");
  });
  onChange();
}

function speciesMatchesFilters(species, activeFilters) {
  const locs = getSpeciesLocations(species);
  const locOk =
    activeFilters.location.size === 0 ||
    locs.some((l) => activeFilters.location.has(l));
  const typeOk =
    activeFilters.type.size === 0 ||
    species.types.some((t) => activeFilters.type.has(t));
  return locOk && typeOk;
}

function createCoverCard(species) {
  const cover = species.photos[0];
  const a = document.createElement("a");
  a.className = "specimen cover-card";
  a.href = `species.html?slug=${encodeURIComponent(species.slug)}`;

  const img = document.createElement("img");
  img.src = cover.src;
  img.alt = cover.alt;
  img.loading = "lazy";
  a.appendChild(img);

  if (species.photos.length > 1) {
    const badge = document.createElement("span");
    badge.className = "cover-card__badge";
    badge.textContent = `${species.photos.length} photos`;
    a.appendChild(badge);
  }

  const caption = document.createElement("div");
  caption.className = "specimen-caption";

  const nameRow = document.createElement("div");
  nameRow.className = "specimen__name";
  const num = document.createElement("span");
  num.className = "specimen__number";
  num.textContent = `No. ${species.number}`;
  const name = document.createElement("span");
  name.className = "specimen__species";
  name.textContent = species.name;
  nameRow.appendChild(num);
  nameRow.appendChild(name);
  caption.appendChild(nameRow);

  if (species.scientific) {
    const sci = document.createElement("span");
    sci.className = "specimen__scientific";
    sci.textContent = species.scientific;
    caption.appendChild(sci);
  }

  a.appendChild(caption);
  return a;
}
