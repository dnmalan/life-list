# Life List

A photography site for your bird "life list," built as a plain HTML/CSS/JS
site so it runs directly on GitHub Pages — no build step, no framework.

## What's in here

```
life-list-site/
├── index.html          the page structure
├── css/style.css        all styling
├── js/photos-data.js    ← YOU EDIT THIS to add photos and tags
├── js/app.js            filtering logic (rarely needs edits)
└── images/birds/        put your real photo files here
```

Right now `photos-data.js` is filled with 8 placeholder photos (via
picsum.photos) so you can see the filtering work immediately. Replace them
with your own.

## Adding a photo

1. Drop the image file into `images/birds/` (e.g. `great-blue-heron.jpg`).
   Export at roughly 1200px on the long edge — plenty sharp for the web,
   and small enough to load fast.
2. Open `js/photos-data.js` and add an entry to the `PHOTOS` array:

   ```js
   {
     number: "009",
     src: "images/birds/great-blue-heron.jpg",
     alt: "Great blue heron wading in shallow water",
     species: "Great Blue Heron",
     scientific: "Ardea herodias",
     location: "united-states",
     types: ["waterfowl"],
   },
   ```
3. Save, commit, and push. That's it — no other file needs to change.

## Adding a new tag (Location or Bird Type)

Open the `FILTERS` object at the top of `js/photos-data.js` and add a line,
e.g. to add "Oceania" as a location:

```js
location: [
  { id: "united-states", label: "United States" },
  { id: "europe", label: "Europe" },
  { id: "asia", label: "Asia" },
  { id: "africa", label: "Africa" },
  { id: "oceania", label: "Oceania" },   // new
],
```

Use that same `id` (lowercase, dashes for spaces) in any photo's `location`
or `types` field. The filter button appears automatically — nothing in
`app.js` or `index.html` needs to change.

## Adding a whole new section later (e.g. "Mammals")

The site is currently one section ("Birds"). To add a second section down
the road, the cleanest approach is:
- Duplicate the `<section class="section">...</section>` block in
  `index.html`, give it a new `id`/heading (e.g. "Mammals")
- Give it its own filter bar + grid container with new element `id`s
- Duplicate the `FILTERS`/`PHOTOS` pattern in a second data file (e.g.
  `photos-data-mammals.js`) and a second small init call in `app.js`

Happy to build that out with you once you're ready — just flag it.

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
