# Life List

A photography site for your "life list," built as a plain HTML/CSS/JS site
so it runs directly on GitHub Pages — no build step, no framework.

## What's in here

```
life-list-site/
├── index.html         homepage — one section per kind (Birds, later Mammals...),
│                       capped to 8 species each, with filters
├── species.html        a species' detail page — all its photos + lightbox
├── all.html             "see all" page for one kind — every species, filterable,
│                       no cap (linked from the homepage's "See all Birds →")
├── css/style.css       all styling
├── js/data.js          ← YOU EDIT THIS to add species, photos, and tags
├── js/shared.js        filter-bar + cover-card builders shared by home/all pages
├── js/home.js          homepage rendering logic (rarely needs edits)
├── js/all.js           "see all" page logic (rarely needs edits)
├── js/species.js       species-page + lightbox logic (rarely needs edits)
└── images/birds/       put your real photo files here
```

The model is **species-first**: each species (e.g. "Mallard") can have
several photos, taken at different times/places. The homepage shows one
cover photo per species. Click it to see every photo of that species;
click any of those to see it enlarged with its full caption.

`js/data.js` currently has 10 placeholder bird species (via picsum.photos)
so you can see everything working immediately — multiple photos per
species, the 8-item homepage cap (2 species are hidden until you filter or
raise the cap), and the lightbox. Replace them with your own.

## Adding a new photo to a species you already have

1. Drop the image file into `images/birds/` (e.g. `mallard-4.jpg`).
   Export at roughly 1200px on the long edge.
2. Open `js/data.js`, find that species in the `SPECIES` array, and add an
   entry to its `photos` array:

   ```js
   {
     src: "images/birds/mallard-4.jpg",
     alt: "Mallard pair swimming at dusk",
     date: "2025-03-14",
     location: "Lake Merritt, Oakland, California, USA",
     locationTag: "united-states",
     notes: "Spotted this pair just after sunrise.",
   },
   ```
3. Save, commit, push. `notes` is optional — leave it `""` to omit it from
   the caption.

## Adding a whole new species

Copy an existing entry in the `SPECIES` array, give it a new unique `slug`
(this becomes its URL: `species.html?slug=your-slug`), and fill in its
name, scientific name, `types`, and at least one photo. It'll automatically
appear on the homepage (subject to the 8-item cap and any active filters).

## Adding a new tag (Location or Bird Type)

Open the `FILTERS.birds` object in `js/data.js` and add a line, e.g. to add
"Oceania" as a location:

```js
location: [
  { id: "united-states", label: "United States" },
  { id: "europe", label: "Europe" },
  { id: "asia", label: "Asia" },
  { id: "africa", label: "Africa" },
  { id: "oceania", label: "Oceania" },   // new
],
```

Use that same `id` in a species' `types` field, or a photo's `locationTag`.
The filter button appears automatically.

## Changing how many photos show on the homepage

Edit `HOMEPAGE_LIMIT` near the top of `js/data.js` (currently `8`).

## Adding a whole new kind (e.g. "Mammals")

1. In `js/data.js`, uncomment/add a line in `KINDS`: `{ id: "mammals", label: "Mammals" }`
2. Add a matching `FILTERS.mammals = { typeLabel: "Mammal Type", location: [...], type: [...] }`
3. Add `SPECIES` entries with `kind: "mammals"`, each with its own photos.

`index.html` builds a new homepage section automatically — no HTML edits
needed. Put mammal photos in a new `images/mammals/` folder to keep things
tidy.

---

## Publishing with GitHub Pages

1. **Create a repository** on GitHub (e.g. `life-list`). It can be public
   or private (Pages works with either on paid plans; free plans need it
   public).
2. **Push these files** to the repository root — `index.html` should sit
   directly in the repo root, not in a subfolder.

   ```bash
   git init
   git add .
   git commit -m "Initial life list site"
   git branch -M main
   git remote add origin https://github.com/YOUR-USERNAME/life-list.git
   git push -u origin main
   ```
3. **Turn on Pages**: in the repo, go to **Settings → Pages**. Under
   "Build and deployment," set **Source** to "Deploy from a branch," pick
   **main** and **/ (root)**, then save. GitHub will publish the site at
   `https://YOUR-USERNAME.github.io/life-list/` within a minute or two.

## Connecting your custom domain

Say your domain is `yourname.com` (or a subdomain like `photos.yourname.com`).

1. **Add the domain in GitHub**: Settings → Pages → "Custom domain," enter
   your domain, and save. GitHub will create a `CNAME` file in your repo
   automatically (or you can add one yourself — see `CNAME.example` in this
   folder, just rename it to `CNAME` with your domain inside, no extension).
2. **Set your DNS records** with whoever you bought the domain from:
   - **Apex/root domain** (`yourname.com`): add **A records** pointing to
     GitHub's IPs:
     ```
     185.199.108.153
     185.199.109.153
     185.199.110.153
     185.199.111.153
     ```
   - **Subdomain** (`photos.yourname.com`) or `www`: add a **CNAME record**
     pointing to `YOUR-USERNAME.github.io`.
3. **Enforce HTTPS**: back in Settings → Pages, once DNS has propagated
   (can take anywhere from a few minutes to 24 hours), check "Enforce
   HTTPS." GitHub issues a free certificate automatically.
4. Give it a little time — DNS changes aren't instant. You can check
   propagation with a tool like `dig yourname.com` or whatsmydns.net.

That's the whole setup. Ping me if a step throws an error and I can help
debug it.
