# ileanaprince.com — portfolio redesign

A static, hand-built replacement for the WordPress/Divi portfolio at
[ileanaprince.com](https://ileanaprince.com). No build step, no CMS, no dependencies —
plain HTML, one stylesheet, one small progressive-enhancement script.

This repository is **not** connected to Building Our Tech in any way.

## Structure

```
index.html              Home — hero, selected work, approach, about, contact
work/                   One page per case study
  local-roots.html
  ulta-beauty.html
  keep-going.html
  better-homes-gardens.html
  ios-toolkit.html
  xbox.html
  starbucks.html
css/main.css            The whole design system
js/main.js              Scroll reveal, sticky header, TOC highlighting, image lightbox
images/photos/          Headshots (resized for web)
images/work/<project>/  Case study visuals, pulled from the current WordPress site
```

## What changed from the old site

The old site was a single Divi page with a portfolio grid. Every case study was a stack
of exported Figma slides, so the actual content — the research, the personas, the test
findings — existed only as pixels inside images. None of it was readable by a search
engine, a screen reader, or anyone skimming on a phone.

The rewrite transcribes that content into real HTML text, keeps the slides as
supporting figures, and gives each project a page of its own. Also fixed along the way:

- The Starbucks project linked to `?project=auto-draft` — an unpublished permalink that
  went nowhere. It now has a real page.
- Case study pages had no titles, descriptions, or share metadata. Each page now carries
  its own `<title>`, meta description, canonical URL, and Open Graph tags, plus
  `Person` structured data on the home page.
- Content was spread across two paginated grid pages with no way to see everything at once.

## Accessibility

Built to the standards the portfolio itself argues for:

- Semantic landmarks, a skip link, and correct heading order on every page.
- Every image carries alt text; decorative SVG is `aria-hidden`.
- Visible `:focus-visible` rings; the lightbox moves focus in and returns it on close.
- Full `prefers-reduced-motion` support — animation and smooth scrolling both stand down.
- Light and dark palettes. Measured contrast ratios: body text 15.2:1 light and
  14.8:1 dark; muted text 5.1:1 and 7.4:1; the terracotta accent 5.2:1 on the page
  background, 4.6:1 on the tinted sections, 5.5:1 on cards. All above the 4.5:1 AA
  threshold for normal text.
- All content is readable with JavaScript disabled. The reveal animation is opt-in via a
  `js` class on `<html>`, so nothing is ever hidden from a reader who has no scripting.
  The only thing scripting adds is the click-to-enlarge on gallery images; the images
  themselves still display.

## Local preview

Double-click `index.html`. It opens in a browser and behaves like the live site — no
server, no commands. See [EDITING.md](EDITING.md) for editing without writing code.

If you want a real local server (needed only if you add anything that requires HTTP
rather than `file://`), `tools/sync_preview.sh` copies the site to
`/private/tmp/ileana-portfolio-preview/site` and `.claude/launch.json` serves it on
port 4322. The copy step exists because the preview sandbox cannot read `~/Desktop`.

## Deployment

Live at **https://venticlaw.github.io/ileana-prince-portfolio/**, served by GitHub Pages
from the `main` branch, root folder. Every push to `main` republishes within a minute or
two. `.nojekyll` is present so the files are served as-is.

`ileanaprince.com` is **not** pointed here yet — it still serves the WordPress site.
Nothing visitors see has changed.

### When it's time to switch the domain

1. Add a `CNAME` file containing `ileanaprince.com`.
2. Settings → Pages → Custom domain → `ileanaprince.com`, then tick Enforce HTTPS once
   the certificate is issued.
3. At the domain registrar, point the apex at GitHub Pages with four `A` records
   (185.199.108–111.153) and a `CNAME` for `www` pointing at `venticlaw.github.io`.

Step 3 is the irreversible one — the moment DNS moves, WordPress stops being the live
site. Do it last, and only once Ileana has signed off on the content.

The `canonical` and Open Graph URLs already say `ileanaprince.com`. That's deliberate: it
keeps search engines treating the real domain as authoritative rather than indexing the
github.io copy, and it needs no change on the day the domain moves.

## Known follow-ups

- **Images.** The case study visuals were pulled from the live WordPress uploads and
  resized to 1400 px. They are Figma slide exports, so text inside them is an image.
  Fresh exports from Ileana's Figma files — or WebP versions — would cut roughly half
  the page weight and sharpen the type.
- **Unused source images.** `images/work/` holds every slide from each deck, including
  the ones no page references. They're kept as source material; delete them if you'd
  rather keep the repository lean.
- **Better Homes & Gardens** has the thinnest case study, because its slides were almost
  entirely visual. It needs a few paragraphs from Ileana about the research and the
  decisions.
- **Résumé.** Not linked. The PDF version carries a phone number, which shouldn't sit on
  a public page — if she wants it available, use a version with email and LinkedIn only.
