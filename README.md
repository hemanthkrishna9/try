# ChitraYoga

Website for **ChitraYoga** by Chitrika — yoga classes in Hyderabad (in person) and worldwide (online).

A static site with plain HTML, CSS and JavaScript and no build step. Open `index.html` in a browser, or host it on GitHub Pages.

## Structure

```
index.html            page content
assets/css/styles.css styles
assets/js/main.js     mobile menu, FAQ accordion, scroll effects
assets/images/        photos
```

## Photos

Photos are in `assets/images/`. Each one is cropped in CSS with `object-position`, so the originals can stay portrait.

| File             | Where it appears                          |
|------------------|-------------------------------------------|
| `hero.jpg`       | Top banner (seated meditation)            |
| `chitrika.jpg`   | "Hi, I'm Chitrika" (tree pose)            |
| `pranayama.jpg`  | "How the Classes Work"                    |
| `schedule.jpg`   | Weekly Schedule card (low lunge)          |
| `corporate.jpg`  | Corporate yoga line in Workshops          |
| `mindful.jpg`    | "Mindful Movement" card (dancer pose)     |
| `og.jpg`         | Preview image when the link is shared     |
| `chandra.jpg` / `surya.jpg` | Optional workshop photos. Until they're added, the cards show a moon and a sun drawn in CSS. |

Keep each photo under about 300 KB. Photos sent through WhatsApp are already about that size.

## Publishing on GitHub Pages

The site is live at https://hemanthkrishna9.github.io/try/ and is served from the `gh-pages` branch.
