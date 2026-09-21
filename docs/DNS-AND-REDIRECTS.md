# DNS, hosting cutover and redirects — basketballman.com.au

For whoever manages the domain and the current WordPress hosting.

The new site is a static site hosted on GitHub Pages. Nothing on the current
WordPress host is reused. The cutover is a DNS change plus a set of 301 redirects.

---

## 1. Canonical address

**`https://basketballman.com.au` (no www).**

This matches what the current WordPress site already uses, so existing rankings
and links keep pointing at the apex. `www.basketballman.com.au` 301s to the apex.

---

## 2. DNS records

At the domain's DNS host, for the apex:

| Type | Name | Value | TTL |
|---|---|---|---|
| A | `@` | `185.199.108.153` | 3600 |
| A | `@` | `185.199.109.153` | 3600 |
| A | `@` | `185.199.110.153` | 3600 |
| A | `@` | `185.199.111.153` | 3600 |
| AAAA | `@` | `2606:50c0:8000::153` | 3600 |
| AAAA | `@` | `2606:50c0:8001::153` | 3600 |
| AAAA | `@` | `2606:50c0:8002::153` | 3600 |
| AAAA | `@` | `2606:50c0:8003::153` | 3600 |
| CNAME | `www` | `tristahull22.github.io` | 3600 |

`tristahull22` is the GitHub account hosting the site
(repository: `tristahull22/The-Basketball-Man`). The CNAME points at the account's
Pages domain, not at the repository — there is no repository name in the value.

GitHub Pages handles the `www` → apex redirect itself once both the CNAME record
and the custom domain setting are in place, so no separate rule is needed for that.

**Before switching:** drop the TTL on the existing web records to 300 a day ahead,
so a rollback is quick if anything looks wrong.

**Leave alone:** any MX, TXT (SPF/DKIM/DMARC) or other mail records. Email on the
domain is unaffected — only the A/AAAA/CNAME web records move.

**HTTPS:** GitHub issues a Let's Encrypt certificate automatically once DNS
resolves. Tick *Enforce HTTPS* in Settings → Pages afterwards. Allow up to 24
hours, and don't announce the launch until that box is ticked.

---

## 3. Redirects from the old WordPress URLs

GitHub Pages cannot serve 301 redirects. These need to be handled either:

- **at the DNS/CDN layer** — Cloudflare on the free plan in front of the domain,
  using Bulk Redirects or Page Rules, is the usual approach; or
- **not at all**, accepting that six old URLs will 404 for a while.

If Cloudflare is used: point the domain's nameservers at Cloudflare, add the
A/AAAA records above as proxied records, and configure the list below.

### Redirect map

| Old URL | New URL | Status |
|---|---|---|
| `/post-systems/` | `/basketball-systems/` | 301 |
| `/roof-mount-system-2/` | `/basketball-systems/#systems` | 301 |
| `/backboards/` | `/basketball-systems/#backboards-section` | 301 |
| `/rings-and-nets/` | `/basketball-systems/#rings-section` | 301 |
| `/netball-post-systems/` | `/netball-systems/` | 301 |
| `/rings-nets-and-accessories/` | `/netball-systems/#rings-section` | 301 |
| `/about/` | `/` | 301 |
| `/hello-world/` | `/` | 301 |
| `/netball-systems/` | unchanged | — |
| `/maintenance-support/` | unchanged | — |
| `/` | unchanged | — |

Worth catching as well, since WordPress sites accumulate them:

| Pattern | Action |
|---|---|
| `/wp-admin/*`, `/wp-login.php` | 301 to `/`, or leave to 404 |
| `/feed/`, `/*/feed/` | 301 to `/` |
| `/?p=*` | 301 to `/` |

Anything not on this list can 404 — the site has a styled 404 page that points
visitors back to the main sections.

---

## 4. Cutover sequence

1. Repository published and GitHub Pages enabled.
2. Client signs off on the preview at `https://tristahull22.github.io/The-Basketball-Man/`.
3. Enquiry form connected and tested (see the README).
4. Custom domain set in Settings → Pages.
5. TTLs lowered on the existing web records.
6. A/AAAA records and the `www` CNAME switched.
7. Wait for the certificate, then tick *Enforce HTTPS*.
8. Redirects added.
9. Submit `https://basketballman.com.au/sitemap.xml` in Google Search Console and
   let the 301s do the rest.
10. Keep the WordPress hosting active but unpointed for 30 days as a rollback path.
    Take a final database and file backup before cancelling it.

---

## 5. Post-launch checks

- `https://basketballman.com.au` loads with a valid certificate.
- `http://basketballman.com.au`, `https://www.basketballman.com.au` and
  `http://www.basketballman.com.au` all land on the canonical HTTPS apex.
- All five pages load, and the navigation works on a phone.
- A test enquiry arrives at sales@boomering.com.au.
- Every old URL in the redirect map returns a 301 to its new destination — not a
  302, not a 404.
- Search Console shows the sitemap read, with five URLs discovered.
