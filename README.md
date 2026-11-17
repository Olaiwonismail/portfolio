# Ismail Olaiwon — Portfolio

Personal portfolio for Ismail Olaiwon, a backend-focused full stack engineer in Lagos, Nigeria.

Live site: <https://olaiwon-ismail.vercel.app/>

## What's on the page

| Section | What it holds |
|---|---|
| **About** | Intro, and the stack with brand icons |
| **Projects** | Six builds, each linked to its source |
| **Open source** | Pull requests merged into other people's projects |
| **Writing** | Notes on the backend work |
| **Experience** | Roles and education |
| **Activity** | A year of GitHub contributions |

## Features

- Static HTML, CSS and vanilla JavaScript. No framework, no runtime dependencies, and no build step needed to deploy.
- Light and dark themes, with the choice remembered.
- Brand icons for the stack, inlined as an SVG sprite so they tint with the theme instead of being flat images.
- A year of GitHub contributions, fetched at runtime and degrading quietly if the request fails.
- Keyboard accessible throughout, with visible focus, a skip link and no scroll-linked animation.

## Tech

| Layer | |
|---|---|
| **Structure** | HTML5, semantic markup, ARIA where it helps |
| **Styling** | Vanilla CSS, custom properties, media queries |
| **Interactivity** | Vanilla JavaScript, rAF-throttled scroll handling |
| **Typography** | [Libron](https://fonts.google.com/specimen/Libron) and [JetBrains Mono](https://fonts.google.com/specimen/JetBrains+Mono), self-hosted as woff2 |
| **Icons** | [Simple Icons](https://simpleicons.org/), inlined as an SVG sprite |

## Project structure

```
portfolio/
├── index.html        # the page
├── styles.css        # design system, components, responsive styles
├── script.js         # theme, heatmap, clock, active nav tracking
├── fonts/            # self-hosted woff2 files
├── images/           # project screenshots, logos
├── profile.jpg       # used for social previews
└── sitemap.xml
```

## Writing a post

The Writing section on the page is in place and waiting. To publish something, add a row to the list in `index.html` and write the post as its own page, following the structure of the page itself.

## Run locally

```bash
# Clone the repo
git clone https://github.com/olaiwonismail/portfolio.git
cd portfolio

# Serve with any static server
npx -y http-server . -p 8080

# Open http://localhost:8080
```

## Contact

- **Email:** [olaiwonismail@gmail.com](mailto:olaiwonismail@gmail.com)
- **GitHub:** [github.com/olaiwonismail](https://github.com/olaiwonismail)
- **LinkedIn:** [linkedin.com/in/olaiwonismail](https://www.linkedin.com/in/ismail-olaiwon-186938324/)
