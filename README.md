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
- Light and dark palettes, both meeting WCAG AA for body text.
- The site works with JavaScript disabled. The reveal animation is opt-in via a `js`
  class on `<html>`, so nothing is ever hidden from a reader who has no scripting.

## Local preview

```bash
python3 -m http.server 4402
```

Then open <http://127.0.0.1:4402>.

## Deploying to GitHub Pages

1. Push this repository to GitHub.
2. Settings → Pages → deploy from the `main` branch, root folder.
3. Add a `CNAME` file containing `ileanaprince.com`.
4. Point the domain's DNS at GitHub Pages (four `A` records for the apex, or a `CNAME`
   record for `www`). **Do this last** — the moment DNS moves, the WordPress site is
   no longer what visitors see.

`.nojekyll` is already present so GitHub serves the files as-is.

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
