# DevTier

Bilingual (English / Persian) interview practice for developers. Pick a topic, choose your level, and answer multiple-choice questions with instant feedback and a full explanation for every answer.

**Live:** [https://devtire.vercel.app](https://devtire.vercel.app/)

## Features

- 1200 multiple-choice questions: 8 topics, 3 levels (Junior, Middle, Senior), 50 questions each
- Instant right/wrong feedback with explanations
- Full English and Persian support, with RTL layout for Persian
- Search across all questions
- Bookmarks and per-level progress, saved in your browser (no account, no backend)
- Light and dark themes

## Topics

HTML & CSS, JavaScript, TypeScript, React, State Management, Next.js, Design Patterns, System Design.

Backend and software engineering topics are planned.

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

## Project structure

```
messages/            UI strings (en.json, fa.json)
src/app/[locale]/    Pages: home, category, practice, bookmarks, feedback
src/components/      UI, layout, and practice (quiz) components
src/data/            Questions and category metadata
src/lib/storage.ts   localStorage for progress, bookmarks, and feedback
```

## Adding questions

Questions live in `src/data/`. The files in `src/data/extra/` use a compact format through `build()` in `src/data/build.ts`. Each question has a Persian and an English text, four options with the correct one listed first, and an explanation. Options are shuffled for display, so the correct answer does not always appear first.

## Author

Made by [Mahdi Hosseini](https://github.com/MadiFrontend).
