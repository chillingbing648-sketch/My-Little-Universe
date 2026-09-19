<div align="center">

# The Little Universe I Made for You

**A cinematic, interactive digital gift — built as a small universe of memories, words, music, and moments.**

<p>
  <a href="https://chillingbing648-sketch.github.io/My-Little-Universe/">Live Experience</a>
  ·
  <a href="https://github.com/chillingbing648-sketch/My-Little-Universe">Source</a>
</p>

</div>

---

## ✦ Tech Stack

<p>
  <img alt="React" src="https://img.shields.io/badge/React_18-20232A?style=for-the-badge&logo=react&logoColor=61DAFB">
  <img alt="Vite" src="https://img.shields.io/badge/Vite_5-646CFF?style=for-the-badge&logo=vite&logoColor=FFFFFF">
  <img alt="JavaScript" src="https://img.shields.io/badge/JavaScript-0B0F1A?style=for-the-badge&logo=javascript&logoColor=F7DF1E">
  <img alt="CSS3" src="https://img.shields.io/badge/CSS3-0B0F1A?style=for-the-badge&logo=css3&logoColor=1572B6">
  <img alt="GitHub Pages" src="https://img.shields.io/badge/GitHub_Pages-0B0F1A?style=for-the-badge&logo=github&logoColor=FFFFFF">
</p>

## ✧ Features

- **11 interactive destinations** connected through a constellation-style universe.
- **Cinematic transitions** between sections with layered atmosphere and motion.
- **Memory-led storytelling** across timelines, exhibits, letters, surprises, music, and future plans.
- **Single-file personalization** through `src/data/giftData.js`.
- **Responsive interaction design** with mobile navigation and reduced-motion support.
- **Static architecture** with no backend, account system, or database.

---

## Preview

<p align="center">
  <img src="./assets/sections-preview.svg" alt="The Little Universe sections interface preview" width="1100">
</p>

<p align="center"><sub>The newest sections experience — a constellation map for navigating every part of the gift.</sub></p>

---

## The Concept

**The Little Universe** is designed as a single-page digital experience rather than a conventional website.

The opening presents the gift as a private space. From there, the visitor enters a constellation of destinations, where each star leads to a different kind of memory or interaction.

### Experience Map

| Destination | Purpose |
|---|---|
| **Universe** | Interactive constellation map and section navigation |
| **The Beginning** | Chronological memory timeline |
| **Memory Museum** | Exhibit-style memories with photo viewing |
| **Things Unsaid** | Small thoughts revealed through interactive cards |
| **A Letter** | A paper-style personal letter |
| **Open When...** | Conditional letters with optional date locks |
| **The Quiz** | A lightweight shared-memory quiz |
| **Soundtrack** | Songs, covers, explanations, and optional playback |
| **Surprise Me** | Randomized little messages and memories |
| **The Future** | Things to do, plus abstract destinations |
| **Final Reveal** | Closing message and final memory |

---

## Design Direction

The interface is built around a **warm midnight / starlight** visual language:

- deep midnight backgrounds instead of pure black
- restrained gold, blush, and lavender accents
- editorial serif typography paired with a modern sans-serif UI
- soft panels, paper textures, halos, and constellation lines
- motion used as storytelling rather than decoration

The aim is to make navigation feel like **moving through a place**, not clicking through a collection of pages.

---

## Architecture

```text
React App
│
├── App.jsx
│   └── Hash-based section routing
│
├── components/
│   ├── Opening/
│   ├── Universe/
│   ├── Timeline/
│   ├── MemoryMuseum/
│   ├── Unsaid/
│   ├── Letter/
│   ├── OpenWhen/
│   ├── Quiz/
│   ├── Soundtrack/
│   ├── Surprise/
│   ├── Future/
│   ├── FinalReveal/
│   ├── Navigation/
│   ├── PhotoViewer/
│   └── UI/
│
├── data/
│   └── giftData.js
│       └── Content + settings
│
├── hooks/
│   └── Reusable interaction behavior
│
├── styles/
│   ├── global.css
│   └── sections.css
│
└── public/
    ├── memories/
    ├── photos/
    ├── music/
    └── icons/
```

### Runtime flow

```text
Opening
   ↓
Universe
   ↓
Hash route
   ↓
Section component
   ↓
Shared navigation + transitions + music + Easter eggs
```

There is no server-side application layer. The experience is delivered as a static React build.

---

## Personalize It

The project intentionally keeps personal content separate from presentation code.

Edit:

```text
src/data/giftData.js
```

That file contains the configurable content for:

- names
- opening text
- timeline entries
- museum exhibits
- unsaid thoughts
- letter content
- Open When messages and unlock dates
- quiz questions and answers
- songs
- future plans
- surprise messages
- final reveal
- settings and Easter eggs

You normally should not need to edit the components to personalize the experience.

### Add media

Place files in:

```text
public/memories/
public/photos/
public/music/
```

Use repository-safe relative references such as:

```js
'./memories/memory-01.jpg'
'./photos/song-01.jpg'
'./music/our-song.mp3'
```

Missing media is handled with placeholders or hidden playback controls instead of taking down the rest of the experience.

---

## Run Locally

Requires Node.js 18+.

```bash
npm install
npm run dev
```

Open the local Vite URL shown in the terminal.

For a production build:

```bash
npm run build
npm run preview
```

---

## Deployment

The repository is deployed through **GitHub Actions → GitHub Pages**.

```text
main
 ↓
GitHub Actions
 ↓
npm ci
 ↓
npm run build
 ↓
fresh dist/
 ↓
GitHub Pages
```

The generated `dist/` directory is intentionally **not committed** to the repository. It is produced fresh by CI for each deployment.

Deployment workflow:

```text
.github/workflows/deploy.yml
```

---

## Project Structure

```text
.
├── .github/workflows/deploy.yml
├── public/
│   ├── memories/
│   ├── photos/
│   ├── music/
│   └── icons/
├── src/
│   ├── components/
│   ├── data/
│   ├── hooks/
│   ├── styles/
│   ├── App.jsx
│   └── main.jsx
├── index.html
├── package.json
├── vite.config.js
└── .gitignore
```

---

## Engineering Notes

**Hash navigation** keeps the experience inside a single-page runtime while still allowing direct section URLs.

**Content/data separation** keeps personal writing and media references in one place, reducing the need to modify presentation code.

**Graceful media handling** prevents a missing image or audio file from breaking the overall experience.

**Reduced-motion support** respects the visitor's system preference and the project's own particle setting.

**Responsive visual complexity** lets the desktop universe carry the richer constellation treatment while the mobile layout switches to a simpler section list.

---

## Accessibility & UX

The project includes:

- keyboard-focus states for interactive controls
- semantic buttons for interaction
- minimum touch-friendly control sizes
- responsive mobile navigation
- reduced-motion handling
- visible state changes for active, selected, and playing elements

---

## Roadmap

The current repository is intentionally focused on the core static experience.

Potential future additions can live here without changing the central structure:

```text
• richer personal media
• more memory exhibits
• additional Open When letters
• expanded soundtrack collection
• more interactive hidden details
```

These are **future ideas**, not claims about functionality already implemented.

---

## License

Personal / private project.

The source structure is shared for reference and experimentation; personal content and media should be replaced with your own when creating another version.

---

<div align="center">

### Made as a place to keep the little things that matter.

**The Little Universe I Made for You** · React + Vite

</div>
