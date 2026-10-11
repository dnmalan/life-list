/*
  DATA
  ====
  This is the file you edit to add species, photos, and tags.

  STRUCTURE
  - KINDS: the top-level categories on the homepage (Birds, and later Mammals, etc.)
  - FILTERS: the filter tags available for each kind, and what to call the
    second filter category for that kind (e.g. "Bird Type" vs "Mammal Type")
  - SPECIES: one entry per species. Each species has one or more PHOTOS.
    The homepage shows one "cover" card per species (its first photo).
    Clicking it goes to species.html, which shows every photo of that species.
    Clicking a photo there opens an enlarged view with its caption.

  ----------------------------------------------------------------------------
  ADDING A NEW PHOTO OF A SPECIES YOU ALREADY HAVE
  Find its entry in SPECIES below and add an object to its "photos" array:

  {
    src: "images/birds/mallard-3.jpg",
    alt: "Mallard pair swimming at dusk",
    date: "2025-03-14",                    // ISO format, sorts nicely
    location: "Lake Merritt, Oakland, CA",  // free text — shown in the caption
    locationTag: "united-states",           // must match a FILTERS location id
                                             // (used for homepage filtering)
    notes: "Spotted this pair just after sunrise.", // optional, shown in caption
  }

  ----------------------------------------------------------------------------
  ADDING A NEW SPECIES
  Copy a whole entry in SPECIES, give it a new unique "slug" (lowercase,
  dashes for spaces — this becomes the URL: species.html?slug=your-slug),
  and fill in its details and at least one photo.

  ----------------------------------------------------------------------------
  ADDING A NEW KIND (e.g. "Mammals")
  1. Add it to KINDS below.
  2. Add a matching entry to FILTERS with its own location/type tag lists.
  3. Add SPECIES entries with kind: "mammals".
  That's all — index.html builds a new section automatically.

  ----------------------------------------------------------------------------
  ADDING A NEW LOCATION OR TYPE TAG
  Add it to the relevant list inside FILTERS[kind]. Use that same id in any
  species' "types" field, or any photo's "locationTag" field.
*/

const KINDS = [
  { id: "birds", label: "Birds" },
  // { id: "mammals", label: "Mammals" },  // uncomment (and fill in FILTERS + SPECIES) when ready
];

// How many species cards show on the homepage per kind, before the rest are hidden.
const HOMEPAGE_LIMIT = 8;

const FILTERS = {
  birds: {
    typeLabel: "Bird Type",
    location: [
      { id: "united-states", label: "United States" },
      { id: "europe", label: "Europe" },
      { id: "asia", label: "Asia" },
      { id: "africa", label: "Africa" },
    ],
    type: [
      { id: "waterfowl", label: "Waterfowl" },
      { id: "nightjars", label: "Nightjars" },
      { id: "corvids", label: "Corvids" },
      { id: "wrens", label: "Wrens" },
      { id: "cranes-herons", label: "Cranes & herons" },
      { id: "birds-prey", label: "Birds of prey" },
      { id: "pelicans", label: "Pelicans" },
      { id: "ostriches", label: "Ostriches" },
    ],
  },
};

const SPECIES = [
  {
    slug: "brown-pelican",
    kind: "birds",
    number: "001",
    name: "Brown Pelican",
    scientific: "Pelecanus occidentalis",
    types: ["pelicans"],
    photos: [
      {
        src: "images/birds/brown-pelican-1.jpg",
        alt: "Brown Pelican photographed in Aransas County, Texas",
        date: "2024-02-23",
        location: "Aransas County, Texas",
        locationTag: "united-states",
        notes: "Floating at the Port Aransas jetties.",
      },
      {
        src: "images/birds/brown-pelican-2.jpg",
        alt: "Brown Pelican photographed in Manatee County, Florida",
        date: "2022-11-12",
        location: "Manatee County, Florida",
        locationTag: "united-states",
        notes: "Hanging out at the Skyway Fishing Pier State Park, with the Sunshine Skyway bridge in the background.",
      },
      {
        src: "images/birds/brown-pelican-3.jpg",
        alt: "Brown Pelican photographed in Brevard County, Florida",
        date: "2022-11-08",
        location: "Brevard County, Florida",
        locationTag: "united-states",
        notes: "Going in for a dive at Sebastian Inlet State Park in Florida.",
      },
      {
        src: "images/birds/brown-pelican-4.jpg",
        alt: "Brown Pelican photographed in Brevard County, Florida",
        date: "2022-11-08",
        location: "Brevard County, Florida",
        locationTag: "united-states",
        notes: "Sebastian Inlet State Park in Florida.",
      },
      {
        src: "images/birds/brown-pelican-5.jpg",
        alt: "Brown Pelican photographed in Brevard County, Florida",
        date: "2022-11-08",
        location: "Brevard County, Florida",
        locationTag: "united-states",
        notes: "The fish did eventually make it down! Sebastian Inlet State Park in Florida.",
      },
      {
        src: "images/birds/brown-pelican-6.jpg",
        alt: "Brown Pelican photographed in Brevard County, Florida",
        date: "2022-11-08",
        location: "Brevard County, Florida",
        locationTag: "united-states",
        notes: "Water landing, at Sebastian Inlet State Park in Florida.",
      },
      {
        src: "images/birds/brown-pelican-7.jpg",
        alt: "Brown Pelican photographed in Aransas County, Texas",
        date: "2024-02-21",
        location: "Aransas County, Texas",
        locationTag: "united-states",
        notes: "Showing off full breeding plumage in the golden hour, Port Aransas jetties.",
      },
    ],
  },
  {
    slug: "common-ostrich",
    kind: "birds",
    number: "002",
    name: "Common Ostrich",
    scientific: "Struthio camelus",
    types: ["ostriches"],
    photos: [
      {
        src: "images/birds/common-ostrich-1.jpg",
        alt: "Common Ostrich photographed in Kruger National Park, South Africa",
        date: "2017-11-17",
        location: "Kruger National Park, South Africa",
        locationTag: "africa",
        notes: "Sighting from pretty far away while on safari.",
      },
    ],
  },
];

/* ---- helpers used by home.js and species.js — no need to edit below ---- */

function getSpeciesByKind(kindId) {
  return SPECIES.filter((s) => s.kind === kindId);
}

function getSpeciesLocations(species) {
  const set = new Set(species.photos.map((p) => p.locationTag));
  return Array.from(set);
}

function getSpeciesBySlug(slug) {
  return SPECIES.find((s) => s.slug === slug);
}

function formatDate(isoDate) {
  if (!isoDate) return "";
  const d = new Date(isoDate + "T00:00:00");
  if (isNaN(d.getTime())) return isoDate;
  return d.toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
