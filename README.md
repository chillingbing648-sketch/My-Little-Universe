# The Little Universe I Made for You

A private, interactive digital gift. Built with React + Vite, no backend, no
accounts, nothing sent anywhere.

## 1. Put in your own content

Everything you need to personalize lives in **one file**:

```
src/data/giftData.js
```

Open it and replace the placeholder names, dates, memories, letter text,
quiz answers, songs, future list, and the secret message. There are comments
above every section explaining what goes where. You don't need to touch
anything in `src/components`.

Feature toggles (music on/off, date locks, Easter eggs, etc.) are in the
`settings` object at the top of the same file.

## 2. Add your photos and music

```
public/memories/   → photos for "The Beginning" timeline and "One Last Thing"
public/photos/     → photos for the Memory Museum and song covers
public/music/      → your background track and any per-song audio files
```

Reference them in `giftData.js` with a leading slash, e.g. `/memories/us-01.jpg`.
If a file is missing, the site shows a soft placeholder instead of breaking —
so you can fill these in gradually.

## 3. Run it locally

You'll need [Node.js](https://nodejs.org) 18 or newer installed.

```bash
npm install
npm run dev
```

Then open the local URL it prints (usually `http://localhost:5173`).

## 4. Build for production

```bash
npm run build
```

This creates a `dist/` folder with the finished, optimized site.

## 5. Deploy it

**Vercel or Netlify (easiest):** drag the project into either dashboard, or
connect the folder as a Git repo — both auto-detect Vite and just work.
Build command: `npm run build`. Output folder: `dist`.

**GitHub Pages:** if your site will live at
`https://USERNAME.github.io/REPO_NAME/`, open `vite.config.js` and change:

```js
base: '/',
```

to:

```js
base: '/REPO_NAME/',
```

Then run `npm run build` and publish the contents of `dist/` (e.g. with the
`gh-pages` npm package, or GitHub's own "Deploy from a branch" setting
pointed at a `docs/` folder or the `gh-pages` branch).

## Project structure

```
src/
  data/giftData.js      ← all your personal content and settings
  components/           ← one folder per section of the experience
  hooks/                ← small reusable behaviors (reduced motion, routing)
  styles/                ← the design system (global.css) and per-section
                           styles (sections.css)
public/
  memories/ photos/ music/ icons/   ← your assets go here
```

The site is a single page; sections are switched with a bit of internal
state and reflected in the URL hash (e.g. `#museum`), so refreshing the page
never breaks the experience and you can share a direct link to any section.

## Notes

- No analytics, no external APIs, no login. It's a static site.
- Respects "reduce motion" settings automatically; you can also force a
  calmer version for everyone via `settings.reducedParticles`.
- The hidden Easter egg: click the small, faint star in the bottom-left
  corner five times.
