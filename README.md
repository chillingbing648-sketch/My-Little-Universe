<div align="center">

# The Little Universe I Made for You

**A cinematic, interactive digital gift — built as a small universe of memories, words, music, and moments.**

<p>
  <img src="https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react&logoColor=white" alt="React 18">
  <img src="https://img.shields.io/badge/Vite-5-646CFF?style=flat-square&logo=vite&logoColor=white" alt="Vite 5">
  <img src="https://img.shields.io/badge/JavaScript-ES%20Modules-F7DF1E?style=flat-square&logo=javascript&logoColor=111111" alt="JavaScript">
  <img src="https://img.shields.io/badge/CSS3-Cinematic_UI-1572B6?style=flat-square&logo=css3&logoColor=white" alt="CSS3">
  <img src="https://img.shields.io/badge/GitHub_Actions-CI-2088FF?style=flat-square&logo=githubactions&logoColor=white" alt="GitHub Actions">
  <img src="https://img.shields.io/badge/GitHub_Pages-Deployment-222222?style=flat-square&logo=githubpages&logoColor=white" alt="GitHub Pages">
</p>

<p>
  <a href="https://chillingbing648-sketch.github.io/My-Little-Universe/">✦ Live Experience</a>
  &nbsp;·&nbsp;
  <a href="https://github.com/chillingbing648-sketch/My-Little-Universe">⌘ Source</a>
</p>

</div>

---

## ✦ Technology at a Glance

The stack is intentionally lightweight: **React** handles the experience layer, **Vite** handles development and production bundling, and **CSS** carries the visual language, responsive behavior, motion, and atmosphere.

<table>
<tr>
<td width="25%" valign="top">

### ⚛ Frontend
**React 18**  
React DOM

Component-driven architecture for the individual sections, shared UI, navigation, overlays, and interactive states.

</td>
<td width="25%" valign="top">

### ⚡ Tooling
**Vite 5**  
Node.js · npm

Fast development server and production build pipeline with a minimal dependency footprint.

</td>
<td width="25%" valign="top">

### ◇ Interface
**JavaScript**  
HTML5 · CSS3

ES modules, semantic markup, responsive layouts, layered visual effects, transitions, and custom interaction styling.

</td>
<td width="25%" valign="top">

### ☁ Delivery
**GitHub Actions**  
GitHub Pages

Every production deployment is built from `main` and published as a fresh static artifact.

</td>
</tr>
</table>

### Stack

```text
React 18
├── React DOM
├── Component-based sections
└── Hash-based navigation

Vite 5
├── Development server
├── Production bundling
└── Static build output

JavaScript + HTML5 + CSS3
├── Interaction logic
├── Responsive presentation
├── Motion + transitions
└── Visual design system

Google Fonts
├── Sora
└── Fraunces

GitHub Actions
└── Automated production build

GitHub Pages
└── Static hosting
```

### Why this stack?

**Small footprint.** The project does not need a backend, database, authentication layer, or large framework surface to deliver the experience.

**Component separation.** Each destination is isolated into its own React component area, while shared behaviors live in reusable hooks and UI components.

**Design-first CSS.** The visual identity is driven through a centralized design system plus section-specific styling rather than a heavy UI framework.

**Deployment-ready by default.** The repository builds a fresh production bundle through GitHub Actions instead of storing generated `dist/` files in source control.

---

## ✧ What the Experience Includes

<table>
<tr>
<td width="50%" valign="top">

### Cosmic Navigation
A constellation-style **Universe** acts as the main map, connecting the experience's destinations through interactive stars, layered atmosphere, and section transitions.

### Memory Storytelling
The experience moves through **The Beginning**, **Memory Museum**, **Things Unsaid**, **A Letter**, and **Final Reveal** — giving different memories different visual treatments.

### Personal Interactions
**Open When...**, **The Quiz**, **Soundtrack**, **Surprise Me**, and **The Future** introduce lightweight interactions beyond reading.

</td>
<td width="50%" valign="top">

### Content-First Personalization
Names, memories, writing, media references, quiz content, songs, future plans, surprises, and settings are centralized in:

`src/data/giftData.js`

### Responsive Experience
Desktop and mobile layouts use different presentation strategies where appropriate, with mobile navigation and reduced-motion support built into the interface.

### Static by Design
There is no server-side application layer, account system, database, or backend requirement. The project builds to a static production site.

</td>
</tr>
</table>

---

## Preview

<p align="center">
  <img src="./assets/sections-preview.svg" alt="The Little Universe sections interface preview" width="1100">
</p>

<p align="center"><sub>The latest Universe / sections experience — the navigation layer for the entire gift.</sub></p>

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

### Runtime Flow

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

### Add Media

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

For a production check:

```bash
npm run build
npm run preview
```

---

## ✦ How It Ships

The repository follows a deliberately simple production loop:

```text
        WRITE
          │
          ▼
      `main`
          │
          ▼
   GitHub Actions
          │
     npm ci + build
          │
          ▼
     fresh `dist/`
          │
          ▼
    GitHub Pages
```

The generated build is created by CI and is **not stored in source control**. This keeps the repository focused on the source that actually defines the experience.

` .github/workflows/deploy.yml `

---

## ◇ Inside the Build

<table>
<tr>
<td width="50%" valign="top">

### Content is separated from presentation

The personal layer lives in:

`src/data/giftData.js`

Names, writing, memories, songs, quiz content, future plans, surprises, media references, and experience settings can be changed without rebuilding the component architecture.

</td>
<td width="50%" valign="top">

### The interface is built as a system

The experience is divided into focused React areas rather than one oversized component.

Shared navigation, transitions, music controls, photo viewing, routing behavior, and reusable hooks sit beside the individual destinations.

</td>
</tr>
</table>

---

## ✧ Design Principles

This project is guided by a few simple rules:

> **Make the interface feel like a place, not a dashboard.**

> **Use motion to reveal meaning, not to fill empty space.**

> **Let typography and spacing create emotion before effects do.**

> **Keep the implementation lighter than the experience it creates.**

The result is intentionally somewhere between a digital keepsake, an interactive story, and a tiny personal universe.

---

## ✦ Experience Map

```text
OPENING
   │
   ▼
UNIVERSE
   ├── The Beginning
   ├── Memory Museum
   ├── Things Unsaid
   ├── A Letter
   ├── Open When...
   ├── The Quiz
   ├── Soundtrack
   ├── Surprise Me
   ├── The Future
   └── Final Reveal
```

Each destination is a different interaction with the same underlying story.

---

## ⚙ Engineering Details

| Area | Approach |
|---|---|
| Routing | Lightweight hash-based navigation |
| UI Architecture | Focused React components + shared UI |
| Content | Centralized data-driven configuration |
| Styling | Global design tokens + section-specific CSS |
| Motion | CSS transitions / keyframes with reduced-motion handling |
| Media | Local files under `public/` |
| Deployment | GitHub Actions → GitHub Pages |
| Build Output | Generated CI artifact, not committed |

---

## ◌ Project Structure

```text
.
├── .github/
│   └── workflows/
│       └── deploy.yml
│
├── public/
│   ├── memories/
│   ├── photos/
│   ├── music/
│   └── icons/
│
├── src/
│   ├── components/
│   │   ├── Opening/
│   │   ├── Universe/
│   │   ├── Timeline/
│   │   ├── MemoryMuseum/
│   │   ├── Unsaid/
│   │   ├── Letter/
│   │   ├── OpenWhen/
│   │   ├── Quiz/
│   │   ├── Soundtrack/
│   │   ├── Surprise/
│   │   ├── Future/
│   │   ├── FinalReveal/
│   │   ├── Navigation/
│   │   ├── PhotoViewer/
│   │   └── UI/
│   ├── data/
│   │   └── giftData.js
│   ├── hooks/
│   ├── styles/
│   │   ├── global.css
│   │   └── sections.css
│   ├── App.jsx
│   └── main.jsx
│
├── index.html
├── package.json
├── vite.config.js
└── .gitignore
```

---

## ♢ Personalization

The intended editing surface is small.

```text
src/data/giftData.js
        │
        ├── names
        ├── memories
        ├── letter
        ├── open-when messages
        ├── quiz
        ├── soundtrack
        ├── future plans
        ├── surprises
        ├── final reveal
        └── settings
```

Add photographs, covers, and audio under `public/`, then reference them from the data file.

---

## ⌁ Run It

Requires Node.js 18+.

```bash
npm install
npm run dev
```

Production check:

```bash
npm run build
npm run preview
```

---

## ◇ Roadmap

The roadmap stays intentionally small and experience-focused:

```text
01  More personal memories
02  More visual keepsakes
03  More hidden interactions
04  More soundtrack moments
05  More reasons to return
```

These are future directions, not currently implemented features.

---

## Privacy

This project is designed as a static experience.

There is currently:

```text
No backend
No database
No authentication
No account system
No analytics layer
```

The personal story remains inside the project and its deployed static assets.

---

## License

Personal / private project.

The code structure may be used as a reference for experimentation, but personal writing, photographs, music, and other media should be replaced with content you have permission to use.

---

<div align="center">

### Built like software. Kept like a memory.

A small React experience for the moments that deserve a place of their own.

<br>

**The Little Universe I Made for You**

<sub>React 18 · Vite 5 · JavaScript · CSS3 · GitHub Actions · GitHub Pages</sub>

<br><br>

<a href="https://chillingbing648-sketch.github.io/My-Little-Universe/">Enter the Universe ↗</a>
&nbsp;&nbsp;·&nbsp;&nbsp;
<a href="https://github.com/chillingbing648-sketch/My-Little-Universe">Explore the Source ↗</a>

</div>
