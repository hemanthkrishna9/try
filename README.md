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

Put the photos in `assets/images/` with these exact names. Until a photo exists, the page shows a soft placeholder in its place.

| File            | Where it appears                                   | Suggested shape        |
|-----------------|----------------------------------------------------|------------------------|
| `hero.jpg`      | Large banner at the top. The subject should be on the right. | Landscape, 2400×1200 or larger |
| `chitrika.jpg`  | "Hi, I'm Chitrika" portrait                         | Portrait 4:5           |
| `props.jpg`     | "How the Classes Work": a mat, blocks, a bottle      | Square                 |
| `schedule.jpg`  | Weekly Schedule card                               | Wide landscape         |
| `chandra.jpg`   | Chandra Namaskar workshop (a moon or an evening session) | 4:3                    |
| `surya.jpg`     | Surya Namaskar workshop (a sunrise or a morning session) | 4:3                    |
| `mindful.jpg`   | "Mindful Movement" banner. The subject should be on the left. | Landscape              |

## Publishing on GitHub Pages

Go to the repo's **Settings → Pages**, set the source to "Deploy from a branch", and select the branch and `/ (root)`.
