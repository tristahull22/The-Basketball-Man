# basketballman.com.au

The Basketball Man website. Plain static HTML, CSS and one small JavaScript file —
no build step, no framework, no database. What is in this repository is exactly
what gets served.

---

## Pages

| Page | URL | File |
|---|---|---|
| Home | `/` | `index.html` |
| Basketball Systems | `/basketball-systems/` | `basketball-systems/index.html` |
| Netball Systems | `/netball-systems/` | `netball-systems/index.html` |
| Maintenance & Support | `/maintenance-support/` | `maintenance-support/index.html` |
| Contact | `/contact/` | `contact/index.html` |
| Thank you (after form submit) | `/thanks/` | `thanks/index.html` |
| Not found | any bad URL | `404.html` |

`/netball-systems/` and `/maintenance-support/` deliberately match the URLs on the
old WordPress site so their search rankings and any existing links carry over.
The others need redirects — see `docs/DNS-AND-REDIRECTS.md`.

Links and asset paths are relative, so the site works from a domain root, from a
subfolder such as `username.github.io/basketballman-site/`, or opened straight off
a hard drive. That makes it easy to preview before the domain is switched over.

---

## Publishing it (GitHub Pages)

1. Create a repository in the client's GitHub account — `basketballman-site` is a
   sensible name. Public is fine; GitHub Pages on free accounts requires it.
2. Upload everything in this folder to the repository root. Either drag the files
   into GitHub's web uploader, or from a terminal:

   ```
   git remote add origin https://github.com/<account>/basketballman-site.git
   git branch -M main
   git push -u origin main
   ```

3. In the repository: **Settings → Pages**. Under *Build and deployment*, set
   **Source** to *Deploy from a branch*, branch `main`, folder `/ (root)`. Save.
4. A preview appears within a minute at
   `https://<account>.github.io/basketballman-site/`. Send that link to the client
   for sign-off before touching DNS.
5. When it's approved, under *Custom domain* enter `basketballman.com.au` and save.
   (The `CNAME` file in this repo already contains that domain.)
6. Once DNS has propagated, tick **Enforce HTTPS**. The certificate can take up to
   24 hours to issue — the box stays greyed out until then.

The site rebuilds and redeploys within a minute of every push to `main`.

---

## Before it goes live — two things to set up

### 1. Test the enquiry form

The form on `/contact/` posts to Formspree at `https://formspree.io/f/xeaoalon`,
which emails submissions to **sales@boomering.com.au**. The endpoint is already in
`contact/index.html`. It includes a hidden honeypot field for spam, a subject line,
and a redirect to `/thanks/` after a successful submission.

Two things to confirm once the site is published:

1. **Send a test enquiry** from the live URL and check it arrives at
   sales@boomering.com.au. Formspree requires the destination address to be
   confirmed once — the first submission triggers that email if it hasn't been done.
2. **Add the domain to the form's allowed list** in the Formspree dashboard
   (`basketballman.com.au`), so submissions from anywhere else are rejected.

The redirect to `/thanks/` uses the absolute URL `https://basketballman.com.au/thanks/`.
If you test from the `github.io` preview URL, the form will submit but the
thank-you redirect will land on the live domain — that is expected and corrects
itself once DNS is switched.

### 2. DNS and redirects

See `docs/DNS-AND-REDIRECTS.md` — written for whoever manages the domain and the
current WordPress hosting.

---

## Changing content

Everything is in the HTML. There is no CMS and nothing to compile, so a price
change is a text edit. The easiest route is GitHub's web editor:

1. Open the file on GitHub (e.g. `basketball-systems/index.html`).
2. Click the pencil icon.
3. Use Ctrl+F / Cmd+F to find the text — searching for `$880` or `Senior System`
   lands you in the right spot.
4. Change the text between the tags, leaving the tags themselves alone.
5. Scroll down, write a short note about what changed, and click *Commit changes*.

The live site updates about a minute later.

Where things live:

- **Prices and specs** — inside the relevant page file.
- **Phone number** — in the header, footer and contact section of every page, and
  in `assets/js/site.js`. Search for `0417 970 163` and `+61417970163`.
- **Page titles and descriptions for Google** — the `<title>` and
  `<meta name="description">` lines at the top of each page file.
- **Colours, fonts and spacing** — the variables at the top of
  `assets/css/site.css`. Changing `--orange-500` changes the accent colour
  everywhere.

After changing a page's URL or adding a page, update `sitemap.xml` to match.

---

## Files

```
index.html                 home
basketball-systems/        basketball page
netball-systems/           netball page
maintenance-support/       maintenance page
contact/                   contact page and enquiry form
thanks/                    post-submission page
404.html                   not-found page
assets/css/site.css        all styling, design tokens at the top
assets/js/site.js          mobile menu, form fallback (about 50 lines)
assets/img/                photos, logo, favicon
assets/fonts/              Poppins, self-hosted (no Google Fonts call)
CNAME                      custom domain for GitHub Pages
robots.txt, sitemap.xml    search engine basics
.nojekyll                  stops GitHub from processing the files
docs/                      handover notes
```

---

## Notes

- Nothing loads from a third-party CDN, so there is no external dependency that
  can break or slow the site. Fonts and images are served from the site itself.
- Page weight is roughly 300–600KB, mostly photography.
- Every page works with JavaScript disabled, apart from the mobile menu.
- `LocalBusiness` structured data is on every page — that is what feeds Google's
  business panel.
