/*
  PHOTOS DATA
  ===========
  This is the only file you need to touch to add new photographs.

  Each entry is one photo. Fill in the fields like this:

  {
    number: "001",                     // specimen number — just keep counting up
    src: "images/birds/mallard.jpg",   // path to your photo file
    alt: "Mallard drake on a pond",    // describe the image (for accessibility)
    species: "Mallard",                // common name, shown on the card
    scientific: "Anas platyrhynchos",  // optional, shown in italics — leave "" to omit
    location: "united-states",         // must match a value in FILTERS.location below
    types: ["waterfowl"],              // one or more values from FILTERS.birdType below
                                        // (an array, so a photo can have more than one tag)
  },

  To add a new LOCATION or BIRD TYPE tag later:
  1. Add it to the FILTERS object below (id = lowercase-with-dashes, label = display text)
  2. Use that same id in the "location" or "types" field of any photo
  That's it — the filter buttons are generated from this list automatically.
*/

const FILTERS = {
  location: [
    { id: "united-states", label: "United States" },
    { id: "europe", label: "Europe" },
    { id: "asia", label: "Asia" },
    { id: "africa", label: "Africa" },
  ],
  birdType: [
    { id: "waterfowl", label: "Waterfowl" },
    { id: "nightjars", label: "Nightjars" },
    { id: "corvids", label: "Corvids" },
    { id: "wrens", label: "Wrens" },
    { id: "cranes-herons", label: "Cranes & herons" },
  ],
};

const PHOTOS = [
  {
  number: "001",
  src: "images/birds/whooping-crane-1",
  alt: "Whooping crane standing in marshy field.",
  species: "Whooping crane",
  scientific: "Grus americana",
  location: "united-states",
  types: ["cranes-herons"],
  },
  {
    number: "002",
    src: "https://picsum.photos/seed/egyptiangoose/700/560",
    alt: "Egyptian goose standing on riverbank",
    species: "Egyptian Goose",
    scientific: "Alopochen aegyptiaca",
    location: "africa",
    types: ["waterfowl"],
  },
  {
    number: "003",
    src: "https://picsum.photos/seed/nighthawk/700/560",
    alt: "Common nighthawk camouflaged on a branch",
    species: "Common Nighthawk",
    scientific: "Chordeiles minor",
    location: "united-states",
    types: ["nightjars"],
  },
  {
    number: "004",
    src: "https://picsum.photos/seed/indiannightjar/700/560",
    alt: "Indian nightjar at dusk",
    species: "Indian Nightjar",
    scientific: "Caprimulgus asiaticus",
    location: "asia",
    types: ["nightjars"],
  },
  {
    number: "005",
    src: "https://picsum.photos/seed/bluejay/700/560",
    alt: "Blue jay perched on a fence post",
    species: "Blue Jay",
    scientific: "Cyanocitta cristata",
    location: "united-states",
    types: ["corvids"],
  },
  {
    number: "006",
    src: "https://picsum.photos/seed/magpie/700/560",
    alt: "Eurasian magpie on a stone wall",
    species: "Eurasian Magpie",
    scientific: "Pica pica",
    location: "europe",
    types: ["corvids"],
  },
  {
    number: "007",
    src: "https://picsum.photos/seed/housewren/700/560",
    alt: "House wren singing from a low branch",
    species: "House Wren",
    scientific: "Troglodytes aedon",
    location: "united-states",
    types: ["wrens"],
  },
  {
    number: "008",
    src: "https://picsum.photos/seed/pacificwren/700/560",
    alt: "Pacific wren among ferns",
    species: "Pacific Wren",
    scientific: "Troglodytes pacificus",
    location: "asia",
    types: ["wrens"],
  },
];
