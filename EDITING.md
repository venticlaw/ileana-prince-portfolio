# How to edit your site

You don't need to know JavaScript, Python, or any programming to change this site.
Everything you'd normally want to update is plain text sitting inside the page files.

## Opening the site to look at it

Double-click **`index.html`**. It opens in your browser and works exactly like the real
site — click through the projects, resize the window, everything. Nothing to install, no
commands to run.

After you make a change: save the file, then refresh the browser tab (⌘R).

## Editing text

Open any `.html` file in **TextEdit** (right-click → Open With → TextEdit) or a free
editor like VS Code. The pages are mostly readable sentences wrapped in tags:

```html
<p>Three months from a stack of sketches to a tested prototype.</p>
```

Change the words **between** the tags. Leave the pointy brackets alone:

```html
<p>Your new sentence goes here.</p>
```

That's the whole trick. A few things you'll see:

| What you see | What it is |
|---|---|
| `<p>...</p>` | A paragraph |
| `<h1>`, `<h2>`, `<h3>` | Headings, biggest to smallest |
| `<li>...</li>` | One bullet in a list |
| `<a href="...">text</a>` | A link — `href` is the destination, `text` is what people read |
| `<!-- ... -->` | A note to yourself; never shows on the page |
| `&amp;` | An ampersand (&). HTML needs it written this way |

**Rule of thumb:** if you break something, the page will look wrong but nothing is
permanently lost — undo (⌘Z) and save again.

## Which file is which

| To change... | Open |
|---|---|
| The homepage — headline, intro, About section, contact | `index.html` |
| A project write-up | `work/local-roots.html`, `work/ulta-beauty.html`, etc. |
| Colors, fonts, spacing | `css/main.css` — see below |
| Nothing, ever | `js/main.js` |

You never need to touch `js/main.js`. It handles the fade-ins and the image pop-ups, and
it keeps working on its own.

## Changing images

1. Put the new image in the right folder — `images/work/local-roots/` for Local Roots,
   and so on.
2. In the page file, find the line pointing at the old one:

```html
<img src="../images/work/local-roots/07.png" alt="High-fidelity Local Roots app screens.">
```

3. Change the filename to yours.
4. **Update the `alt` text** to describe what the image shows. That sentence is what a
   screen reader announces, and it's what appears if the image fails to load.

Keep images under about 1400 pixels on their longest side so pages stay fast.

## Changing the colors

Everything lives at the top of `css/main.css`, in one block. Change a color once here and
it updates across every page:

```css
--bone:        #FBF7F0;   /* page background */
--ink:         #16231C;   /* body text */
--forest:      #24503F;   /* deep green — headings, contact panel */
--terracotta:  #B3552F;   /* coral accent — links, small labels */
```

These are pulled from your own logo. If you change them, check the site in both light and
dark mode — your Mac's setting under System Settings → Appearance switches it.

## Adding a new project

The quickest way: duplicate an existing project page and edit it.

1. Copy `work/starbucks.html` (the shortest one) and rename the copy —
   e.g. `work/new-project.html`. Use lowercase with hyphens, no spaces.
2. Open it and change the title, the headline, the text, and the images.
3. Add a card for it on the homepage: in `index.html`, copy one whole
   `<article class="work-card">...</article>` block, paste it after the last one, and
   point its link at your new file.
4. Add a line for it in `sitemap.xml` so search engines find it.

## Publishing your changes

Once the site is live on GitHub Pages, changes go up when they're committed and pushed.
If you'd rather not use git, the simplest route is GitHub's website: open the file there,
click the pencil icon, edit, and click **Commit changes**. The live site updates a minute
or two later.

## If something looks broken

- Refresh with ⌘⇧R (a hard refresh, which ignores the cached version).
- Check you didn't delete a `<` or `>` by accident.
- Undo with ⌘Z until it looks right again, then save.
