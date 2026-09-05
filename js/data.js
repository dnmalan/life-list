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
    ],
  },
};

const SPECIES = [
  {
    slug: "mallard",
    kind: "birds",
    number: "001",
    name: "Mallard",
    scientific: "Anas platyrhynchos",
    types: ["waterfowl"],
    photos: [
      {
        src: "/images/birds/mallard-1",
        alt: "Mallard pair hanging out on a log.",
        date: "2024-05-12",
        location: "Kansas City, MO, USA",
        locationTag: "united-states",
        notes: "This mallard couple XXXX.",
      },
      {
        src: "https://picsum.photos/seed/mallard2/1000/750",
        alt: "Mallard hen leading ducklings",
        date: "2024-06-02",
        location: "Central Park, New York, USA",
        locationTag: "united-states",
        notes: "A hen with a brood of six, tucked against the reeds near the boathouse.",
      },
      {
        src: "https://picsum.photos/seed/mallard3/1000/750",
        alt: "Mallard pair swimming together",
        date: "2023-11-03",
        location: "Central Park, New York, USA",
        locationTag: "united-states",
        notes: "",
      },
    ],
  },
  {
    slug: "egyptian-goose",
    kind: "birds",
    number: "002",
    name: "Egyptian Goose",
    scientific: "Alopochen aegyptiaca",
    types: ["waterfowl"],
    photos: [
      {
        src: "https://picsum.photos/seed/egyptiangoose1/1000/750",
        alt: "Egyptian goose standing on riverbank",
        date: "2023-08-19",
        location: "Nairobi National Park, Kenya",
        locationTag: "africa",
        notes: "Standing sentry on a termite mound, unbothered by a passing safari vehicle.",
      },
      {
        src: "https://picsum.photos/seed/egyptiangoose2/1000/750",
        alt: "Egyptian goose in flight",
        date: "2023-08-20",
        location: "Lake Naivasha, Kenya",
        locationTag: "africa",
        notes: "",
      },
    ],
  },
  {
    slug: "common-nighthawk",
    kind: "birds",
    number: "003",
    name: "Common Nighthawk",
    scientific: "Chordeiles minor",
    types: ["nightjars"],
    photos: [
      {
        src: "https://picsum.photos/seed/nighthawk1/1000/750",
        alt: "Common nighthawk camouflaged on a branch",
        date: "2024-07-04",
        location: "Sandia Foothills, New Mexico, USA",
        locationTag: "united-states",
        notes: "Nearly walked past this one twice — the camouflage is remarkable at rest.",
      },
      {
        src: "https://picsum.photos/seed/nighthawk2/1000/750",
        alt: "Common nighthawk in flight at dusk",
        date: "2024-07-04",
        location: "Sandia Foothills, New Mexico, USA",
        locationTag: "united-states",
        notes: "Same evening, hawking insects overhead as the light faded.",
      },
    ],
  },
  {
    slug: "indian-nightjar",
    kind: "birds",
    number: "004",
    name: "Indian Nightjar",
    scientific: "Caprimulgus asiaticus",
    types: ["nightjars"],
    photos: [
      {
        src: "https://picsum.photos/seed/indiannightjar1/1000/750",
        alt: "Indian nightjar at dusk",
        date: "2022-12-28",
        location: "Keoladeo National Park, India",
        locationTag: "asia",
        notes: "",
      },
    ],
  },
  {
    slug: "blue-jay",
    kind: "birds",
    number: "005",
    name: "Blue Jay",
    scientific: "Cyanocitta cristata",
    types: ["corvids"],
    photos: [
      {
        src: "https://picsum.photos/seed/bluejay1/1000/750",
        alt: "Blue jay perched on a fence post",
        date: "2024-01-09",
        location: "Backyard, Madison, Wisconsin, USA",
        locationTag: "united-states",
        notes: "A regular at the feeder all winter — this one has a notch in its left wing.",
      },
      {
        src: "https://picsum.photos/seed/bluejay2/1000/750",
        alt: "Blue jay mid-call",
        date: "2024-02-14",
        location: "Backyard, Madison, Wisconsin, USA",
        locationTag: "united-states",
        notes: "",
      },
      {
        src: "https://picsum.photos/seed/bluejay3/1000/750",
        alt: "Blue jay carrying an acorn",
        date: "2023-10-22",
        location: "Arboretum, Madison, Wisconsin, USA",
        locationTag: "united-states",
        notes: "Caching acorns for winter, back and forth for almost an hour.",
      },
    ],
  },
  {
    slug: "eurasian-magpie",
    kind: "birds",
    number: "006",
    name: "Eurasian Magpie",
    scientific: "Pica pica",
    types: ["corvids"],
    photos: [
      {
        src: "https://picsum.photos/seed/magpie1/1000/750",
        alt: "Eurasian magpie on a stone wall",
        date: "2023-04-03",
        location: "Edinburgh, Scotland, UK",
        locationTag: "europe",
        notes: "One of a pair that seemed to follow us the entire walk along the wall.",
      },
      {
        src: "https://picsum.photos/seed/magpie2/1000/750",
        alt: "Eurasian magpie in flight",
        date: "2023-04-03",
        location: "Edinburgh, Scotland, UK",
        locationTag: "europe",
        notes: "",
      },
    ],
  },
  {
    slug: "house-wren",
    kind: "birds",
    number: "007",
    name: "House Wren",
    scientific: "Troglodytes aedon",
    types: ["wrens"],
    photos: [
      {
        src: "https://picsum.photos/seed/housewren1/1000/750",
        alt: "House wren singing from a low branch",
        date: "2024-05-30",
        location: "Backyard, Madison, Wisconsin, USA",
        locationTag: "united-states",
        notes: "Nested in the old birdhouse by the shed for the third year running.",
      },
      {
        src: "https://picsum.photos/seed/housewren2/1000/750",
        alt: "House wren feeding a fledgling",
        date: "2024-06-18",
        location: "Backyard, Madison, Wisconsin, USA",
        locationTag: "united-states",
        notes: "",
      },
    ],
  },
  {
    slug: "pacific-wren",
    kind: "birds",
    number: "008",
    name: "Pacific Wren",
    scientific: "Troglodytes pacificus",
    types: ["wrens"],
    photos: [
      {
        src: "https://picsum.photos/seed/pacificwren1/1000/750",
        alt: "Pacific wren among ferns",
        date: "2022-09-11",
        location: "Yakushima Island, Japan",
        locationTag: "asia",
        notes: "Heard it long before I saw it — an enormous song for such a small bird.",
      },
    ],
  },
  {
    slug: "great-blue-heron",
    kind: "birds",
    number: "009",
    name: "Great Blue Heron",
    scientific: "Ardea herodias",
    types: ["waterfowl"],
    photos: [
      {
        src: "https://picsum.photos/seed/greatblueheron1/1000/750",
        alt: "Great blue heron wading in shallow water",
        date: "2024-04-02",
        location: "Everglades National Park, Florida, USA",
        locationTag: "united-states",
        notes: "Stood motionless for almost ten minutes before striking.",
      },
    ],
  },
  {
    slug: "eurasian-jay",
    kind: "birds",
    number: "010",
    name: "Eurasian Jay",
    scientific: "Garrulus glandarius",
    types: ["corvids"],
    photos: [
      {
        src: "https://picsum.photos/seed/eurasianjay1/1000/750",
        alt: "Eurasian jay perched among oak leaves",
        date: "2023-10-05",
        location: "Black Forest, Germany",
        locationTag: "europe",
        notes: "",
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
