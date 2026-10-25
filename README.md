# DevTier

Bilingual (English / Persian) software engineering interview practice. Pick a track, choose a topic and level, then answer multiple-choice questions with instant feedback and a full explanation for every answer.

**Live:** [https://devtire.vercel.app](https://devtire.vercel.app/)

## Features

- Tracks on the home page: Frontend (live), Backend, System Design, Algorithms, Software Engineering, DevOps, Behavioral (coming soon)
- 1200 frontend multiple-choice questions: 8 topics, 3 levels (Junior, Middle, Senior), 50 questions each
- Instant right/wrong feedback with explanations
- Full English and Persian support, with RTL layout for Persian
- Search across all questions
- Bookmarks and per-level progress, saved in your browser (no account, no backend)
- Light and dark themes

## Tracks

| Track | Status | Topics |
| --- | --- | --- |
| Frontend | Live | HTML & CSS, JavaScript, TypeScript, React, State Management, Next.js, Design Patterns, Frontend System Design |
| Backend | Coming soon | Node.js, API design, databases, auth, caching |
| System Design | Coming soon | Scalability, load balancing, sharding, case studies |
| Algorithms & Data Structures | Coming soon | Big O, arrays, trees, graphs, DP |
| Software Engineering | Coming soon | OOP, SOLID, patterns, testing, Git |
| DevOps & Cloud | Coming soon | Docker, CI/CD, Linux, Kubernetes |
| Behavioral | Coming soon | STAR, teamwork, conflict, leadership |

## Tech stack

- [Next.js](https://nextjs.org) (App Router) and React
- TypeScript
- Tailwind CSS
- [next-intl](https://next-intl.dev) for i18n
- next-themes, Radix UI, lucide-react

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The site redirects to `/en`; the Persian version is at `/fa`.

Example URLs:

- `/en` – track picker
- `/en/frontend` – frontend topics
- `/en/frontend/react/senior` – practice
- `/en/backend` – coming soon page

## Project structure

```
messages/                 UI strings (en.json, fa.json)
src/app/[locale]/         Home, track, category, practice, bookmarks, feedback
src/components/           UI, layout, and practice (quiz) components
src/data/tracks.ts        Track metadata (live / coming soon)
src/data/categories.ts    Topics, each linked to a track
src/data/                 Question banks
src/lib/storage.ts        localStorage for progress, bookmarks, and feedback
```

## Adding questions

Questions live in `src/data/`. The files in `src/data/extra/` use a compact format through `build()` in `src/data/build.ts`. Each question has a Persian and an English text, four options with the correct one listed first, and an explanation. Options are shuffled for display, so the correct answer does not always appear first.

New tracks are declared in `src/data/tracks.ts`. Set `status: "live"` when their categories and questions are ready.

## Author

Made by [Mahdi Hosseini](https://mahdihosseini.site/) ([GitHub](https://github.com/MadiFrontend)).
