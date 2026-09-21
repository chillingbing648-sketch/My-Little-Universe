
<div align="center">

# ✦ The Little Universe I Made for You

### A private, cinematic web experience made from memories, letters, music, and little things worth keeping.

<p>
  <a href="https://chillingbing648-sketch.github.io/My-Little-Universe/"><strong>✦ Enter the Universe</strong></a>
  &nbsp; · &nbsp;
  <a href="https://github.com/chillingbing648-sketch/My-Little-Universe">⌘ Explore the Source</a>
</p>

<p>
  <img src="https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react&logoColor=white" alt="React 18">
  <img src="https://img.shields.io/badge/Vite-5-646CFF?style=flat-square&logo=vite&logoColor=white" alt="Vite 5">
  <img src="https://img.shields.io/badge/JavaScript-ES%20Modules-F7DF1E?style=flat-square&logo=javascript&logoColor=111111" alt="JavaScript">
  <img src="https://img.shields.io/badge/CSS3-Cinematic_UI-1572B6?style=flat-square&logo=css3&logoColor=white" alt="CSS3">
  <img src="https://img.shields.io/badge/Static_Site-Private%20Experience-111827?style=flat-square" alt="Static site">
  <img src="https://img.shields.io/badge/GitHub_Actions-Deploy-2088FF?style=flat-square&logo=githubactions&logoColor=white" alt="GitHub Actions">
</p>

</div>

---

## ◇ The Idea

**The Little Universe** is not built like a conventional website.

It is a single-page, section-based experience where navigation becomes part of the story. A visitor enters through an opening moment, reaches a constellation-like **Universe**, and moves between memories, letters, music, small interactions, and a final reveal.

The goal is simple:

> **Make a website feel like a place someone can wander through.**

---

## ✦ What Lives Inside

| Destination | Experience |
|---|---|
| **Universe** | Constellation-style navigation for the entire experience |
| **The Beginning** | A chronological memory timeline |
| **Memory Museum** | Exhibit-style memories with photo viewing |
| **Things I Don't Say Enough** | Short, personal thoughts revealed as interactive cards |
| **A Letter For You** | A paper-inspired reading experience |
| **Open When…** | Unlockable letters with optional date locks |
| **How Well Do You Know Us** | A lightweight shared-memory quiz |
| **Our Soundtrack** | Songs, artwork, context, and optional playback |
| **Surprise Me** | Small randomized messages and memories |
| **The Future** | Things to do and places not reached yet |
| **One Last Thing** | The closing reveal |

---

## ⚙ Technology at a Glance

<table>
<tr>
<td width="25%" valign="top">

### ⚛ Frontend
**React 18**  
React DOM

Focused section components, shared UI, lightweight route handling, transitions, overlays, and interactive states.

</td>
<td width="25%" valign="top">

### ⚡ Build
**Vite 5**  
Node.js · npm

Simple local development and production bundling with a deliberately small dependency surface.

</td>
<td width="25%" valign="top">

### ◇ Interface
**JavaScript + CSS3**  
HTML5 · SVG

Custom layouts, responsive behavior, motion, constellation graphics, typography, atmospheric layers, and interaction styling.

</td>
<td width="25%" valign="top">

### ☁ Delivery
**GitHub Actions**  
GitHub Pages

The production site is built in CI from source and deployed as a static artifact.

</td>
</tr>
</table>

### Stack

```text
React 18
├── React DOM
├── Section components
├── Shared UI
└── Contextual interactions

Vite 5
├── Dev server
└── Production build

JavaScript
├── Hash navigation
├── Experience logic
└── Data-driven content

CSS3 + SVG
├── Design system
├── Motion
├── Atmospheric visuals
└── Constellation interface

Google Fonts
├── Sora
└── Fraunces

GitHub Actions
└── Build + Pages deployment
```

---

## ♢ Why the Architecture Stays Lightweight

This project deliberately avoids a backend, database, account system, or application framework beyond React.

That is intentional.

The experience is primarily **content + interaction + presentation**, so the implementation keeps those concerns close to the browser:

```text
Content
  ↓
giftData.js
  ↓
React Sections
  ↓
Shared Navigation / Transitions
  ↓
Static Vite Build
  ↓
GitHub Pages
```

The result is easy to deploy, easy to personalize, and small enough to understand without introducing infrastructure that the experience does not need.

---

## 🌌 Experience Architecture

```text
                         THE LITTLE UNIVERSE
                                 │
                         ┌───────┴────────┐
                         │   React App    │
                         └───────┬────────┘
                                 │
                 ┌───────────────┼───────────────┐
                 │               │               │
                 ▼               ▼               ▼
             Opening         Universe        Shared UI
                                 │
                                 ▼
                         Hash-based route
                                 │
                                 ▼
                        Section component
                                 │
                 ┌───────────────┼───────────────┐
                 │               │               │
                 ▼               ▼               ▼
             Content          Motion          Media
             + State        + Transition      + Audio
                 │               │               │
                 └───────────────┼───────────────┘
                                 ▼
                          Static experience
```

### Runtime flow

```text
Opening
   ↓
Enter
   ↓
Universe
   ↓
Select a destination
   ↓
Short section transition
   ↓
Destination loads
   ↓
Explore / return / wander
```

The application uses a lightweight hash route instead of a full router. The current route is reflected in the URL and the corresponding section is rendered by `App.jsx`.

---

## ✧ The Universe Navigation

The **Universe** is the experience's central map.

It currently renders ten destination nodes connected by a decorative constellation path. On larger screens, the nodes occupy the field spatially; on smaller screens, the layout becomes a simpler vertical navigation list.

Interaction behavior is deliberately restrained:

- nodes gently float when motion is allowed
- selecting a node briefly highlights the destination
- other nodes visually recede during the transition
- reduced-motion preferences remove drifting and decorative animation
- touch-friendly controls preserve access to the same destinations

The lines are **visual storytelling**, not a data graph. The route itself remains deterministic.

---

## 🎞️ Motion With Purpose

Motion is used as part of the storytelling system rather than as background noise.

```text
Entrance
  → reveal

Selection
  → focus

Transition
  → movement

Section
  → settle

Reduced motion
  → preserve structure, remove drift
```

The experience respects `prefers-reduced-motion`, and the settings layer can reduce particle/background motion independently for lower-powered devices.

---

## ♢ Content Is Separated From Presentation

The main personalization surface is:

```text
src/data/giftData.js
```

That module contains the editable experience content:

```text
recipient / sender
opening copy
timeline entries
museum exhibits
unsaid thoughts
letter
open-when letters
quiz
soundtrack
future plans
destinations
surprises
final reveal
settings
```

This separation means the story can change without rewriting the components that present it.

### Media

Place assets under:

```text
public/
├── memories/
├── photos/
├── music/
└── icons/
```

Reference them with repository-safe relative paths such as:

```js
'./memories/memory-01.jpg'
'./photos/song-01.jpg'
'./music/our-song.mp3'
```

---

## 🎨 Design Direction

The visual language is a blend of **warm editorial typography + midnight space + soft memory objects**.

### Core ingredients

```text
Midnight background
        +
Gold / blush / lavender accents
        +
Fraunces for expressive moments
        +
Sora for interface text
        +
Constellation lines
        +
Soft panels / paper surfaces
        +
Controlled motion
        =
A digital keepsake that feels like a place
```

The design avoids treating every section as the same card grid. Each destination is allowed to have its own visual treatment while still belonging to one system.

---

## 🧩 Project Structure

```text
My-Little-Universe/
│
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
│   │
│   ├── data/
│   │   └── giftData.js
│   │
│   ├── hooks/
│   │   ├── useHashRoute.js
│   │   └── useReducedMotion.js
│   │
│   ├── styles/
│   │   ├── global.css
│   │   └── sections.css
│   │
│   ├── App.jsx
│   └── main.jsx
│
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js
└── .gitignore
```

---

## 🛠️ Engineering Notes

### Route handling

`useHashRoute` provides the lightweight route model used by `App.jsx`.

### Shared experience layer

Cross-cutting behavior stays outside the individual destination components:

- navigation
- section transitions
- music controls
- hidden Easter eggs
- reduced-motion behavior

### Data-driven content

Content lives in `giftData.js`, while components decide **how** that content is presented.

That boundary is one of the main maintainability decisions in the project.

---

## ☁️ Deployment

Production deployment is handled by:

```text
.github/workflows/deploy.yml
```

Current CI flow:

```text
Push to main
    ↓
GitHub Actions
    ↓
Node 22
    ↓
npm ci
    ↓
npm run build
    ↓
Verify production entry + assets
    ↓
Prepare Pages artifact
    ↓
GitHub Pages
```

The generated `dist/` directory is intentionally **not tracked in source control**.

The Vite build uses:

```js
base: './'
```

so generated asset references remain relative to the deployed repository path.

---

## 🚀 Run Locally

### Requirements

- Node.js 18+
- npm

### Start development

```bash
git clone https://github.com/chillingbing648-sketch/My-Little-Universe.git
cd My-Little-Universe
npm install
npm run dev
```

### Production check

```bash
npm run build
npm run preview
```

Available scripts:

| Command | Purpose |
|---|---|
| `npm run dev` | Start Vite development server |
| `npm run build` | Create the production bundle |
| `npm run preview` | Preview the production bundle |

---

## ◌ Current Engineering Snapshot

| Area | Status |
|---|:---:|
| React section architecture | 🟢 |
| Hash navigation | 🟢 |
| Universe navigation | 🟢 |
| Responsive layout | 🟢 |
| Reduced-motion support | 🟢 |
| Content/data separation | 🟢 |
| Music + media layer | 🟢 |
| Production build | 🟢 |
| GitHub Actions deployment | 🟢 |
| Automated tests | 🟡 |
| Accessibility audit | 🟡 |
| Advanced media optimization | 🟡 |
| Import / export | 🔲 |

**Stage:** Personal interactive experience / active development

---

## 🗺️ Roadmap

The roadmap is intentionally experience-first.

### Next

- More personal memories
- More visual keepsakes
- More hidden interactions
- Better media handling
- More polished mobile presentation

### Later

- Import / export of experience content
- More accessibility hardening
- Deeper offline resilience
- Additional visual chapters

The roadmap describes future direction, not implemented functionality.

---

## 🔒 Privacy by Design

This project is intentionally static.

```text
No backend
No database
No authentication
No account system
No analytics layer
```

The live HTML also asks search engines not to index the experience.

Personal text, photographs, audio, and other media should only be added when you are comfortable placing those files inside the project and its deployed static assets.

---

## 🧭 Design Principles

> **Make the interface feel like a place, not a dashboard.**

> **Use motion to reveal meaning, not to fill space.**

> **Let typography and spacing create emotion before effects do.**

> **Keep the implementation lighter than the experience it creates.**

> **Separate the story from the machinery that presents it.**

---

## License

Personal project.

The code can be used for experimentation and learning, but personal writing, photographs, music, and other media should be replaced with content you have permission to use.

---

<div align="center">

### Built like software. Kept like a memory.

**The Little Universe I Made for You**

<sub>React 18 · Vite 5 · JavaScript · CSS3 · GitHub Actions · GitHub Pages</sub>

<br><br>

<a href="https://chillingbing648-sketch.github.io/My-Little-Universe/"><strong>Enter the Universe ↗</strong></a>
&nbsp;&nbsp;·&nbsp;&nbsp;
<a href="https://github.com/chillingbing648-sketch/My-Little-Universe"><strong>Explore the Source ↗</strong></a>

</div>
