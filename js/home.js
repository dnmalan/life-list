/*
  HOME PAGE LOGIC
  ===============
  Builds one section per entry in KINDS (see js/data.js), each with its own
  filter bar and a grid of species "cover cards" capped at HOMEPAGE_LIMIT.
  Clicking a card goes to species.html?slug=... (see js/species.js).
  The "See all" link goes to all.html?kind=... for the uncapped, full list.
*/

(function () {
  const main = document.getElementById("kind-sections");

  KINDS.forEach((kind) => {
    const kindSpecies = getSpeciesByKind(kind.id);
    if (kindSpecies.length === 0) return;

    const activeFilters = { location: new Set(), type: new Set() };

    const section = document.createElement("section");
    section.className = "section";
    section.id = `kind-${kind.id}`;
    section.setAttribute("aria-labelledby", `${kind.id}-heading`);

    const head = document.createElement("div");
    head.className = "section__head";
    const h2 = document.createElement("h2");
    h2.className = "section__title";
    h2.id = `${kind.id}-heading`;
    h2.textContent = kind.label;
    const headRight = document.createElement("div");
    headRight.className = "section__head-right";
    const count = document.createElement("span");
    count.className = "section__count";
    const seeAll = document.createElement("a");
    seeAll.className = "see-all-link";
    seeAll.href = `all.html?kind=${encodeURIComponent(kind.id)}`;
    seeAll.textContent = `See all ${kind.label} →`;
    headRight.appendChild(count);
    headRight.appendChild(seeAll);
    head.appendChild(h2);
    head.appendChild(headRight);
    section.appendChild(head);

    const filterBar = buildFilterBar(kind.id, activeFilters, render);
    section.appendChild(filterBar);

    const clearBtn = document.createElement("button");
    clearBtn.type = "button";
    clearBtn.className = "clear-link";
    clearBtn.textContent = "Clear filters";
    clearBtn.addEventListener("click", () =>
      clearFilterBar(filterBar, activeFilters, render)
    );
    section.appendChild(clearBtn);

    const emptyState = document.createElement("p");
    emptyState.className = "empty-state";
    emptyState.hidden = true;
    emptyState.textContent = "No entries match that combination yet — try clearing a filter.";
    section.appendChild(emptyState);

    const grid = document.createElement("div");
    grid.className = "photo-grid";
    section.appendChild(grid);

    main.appendChild(section);

    function render() {
      const filtered = kindSpecies.filter((s) => speciesMatchesFilters(s, activeFilters));
      const visible = filtered.slice(0, HOMEPAGE_LIMIT);

      grid.innerHTML = "";
      visible.forEach((s) => grid.appendChild(createCoverCard(s)));

      emptyState.hidden = visible.length !== 0;

      if (filtered.length > HOMEPAGE_LIMIT) {
        count.textContent = `Showing ${visible.length} of ${filtered.length}`;
      } else {
        count.textContent = `${filtered.length} ${filtered.length === 1 ? "entry" : "entries"}`;
      }
    }

    render();
  });
})();
