/*
  "SEE ALL" PAGE LOGIC
  ====================
  Reads ?kind=... from the URL (e.g. all.html?kind=birds) and renders every
  species of that kind, filterable, with no HOMEPAGE_LIMIT cap.
*/

(function () {
  const kindId = new URLSearchParams(window.location.search).get("kind");
  const kind = KINDS.find((k) => k.id === kindId);

  const notFound = document.getElementById("not-found");
  const content = document.getElementById("all-content");

  if (!kind) {
    notFound.hidden = false;
    content.hidden = true;
    return;
  }

  const kindSpecies = getSpeciesByKind(kind.id);
  const activeFilters = { location: new Set(), type: new Set() };

  document.title = `All ${kind.label} — Life List`;
  document.getElementById("all-title").textContent = `All ${kind.label}`;
  document.getElementById("back-link").href = `index.html#kind-${kind.id}`;

  const filterBarContainer = document.getElementById("filter-bar-container");
  const filterBar = buildFilterBar(kind.id, activeFilters, render);
  filterBarContainer.appendChild(filterBar);

  document.getElementById("clear-filters").addEventListener("click", () =>
    clearFilterBar(filterBar, activeFilters, render)
  );

  const grid = document.getElementById("all-grid");
  const emptyState = document.getElementById("empty-state");
  const count = document.getElementById("all-count");

  function render() {
    const filtered = kindSpecies.filter((s) => speciesMatchesFilters(s, activeFilters));
    grid.innerHTML = "";
    filtered.forEach((s) => grid.appendChild(createCoverCard(s)));
    emptyState.hidden = filtered.length !== 0;
    count.textContent = `${filtered.length} ${filtered.length === 1 ? "entry" : "entries"}`;
  }

  render();
})();
