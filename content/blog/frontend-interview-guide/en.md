---
title: "Frontend Interview Guide: How to Prepare, Step by Step"
description: "A complete frontend interview guide: interview stages, Junior vs Senior expectations, the most asked HTML, JavaScript, React and Next.js questions, and a 4-week plan."
date: "2026-09-14"
categories: ["html-css", "javascript", "typescript", "react", "nextjs", "system-design"]
tags: ["frontend interview", "interview preparation", "javascript", "react", "career"]
---

This guide covers what a frontend developer interview actually looks like, what interviewers expect at each seniority level, and the specific concepts that come up again and again in HTML, CSS, JavaScript, TypeScript, React, Next.js, performance and frontend system design. It ends with a realistic 4-week study plan and practical advice for the day itself, so you can stop guessing and prepare for what is really asked.

## The Typical Frontend Interview Process

Every company runs its process a little differently, but most frontend hiring loops are built from the same building blocks. Knowing which stage you are in tells you what to optimize for.

### 1. Recruiter or HR screening

A 20–30 minute call. The goal is to check basic fit: your experience, the stack you have worked with, salary expectations, notice period and English level (for international roles). Have a crisp 60-second summary of your background ready, and know the numbers you want.

### 2. Technical screening or quiz

Often a short call with an engineer or an online test. Expect rapid-fire conceptual questions: "What is the difference between `==` and `===`?", "What does `useEffect` with an empty dependency array do?", "How does CSS specificity work?". Some companies use multiple-choice platforms for this stage. This is where breadth matters more than depth, and where timed practice with quizzes pays off the most.

### 3. Live coding

You solve a problem while sharing your screen. For frontend roles this is usually one of:

- A small UI component (autocomplete, modal, tabs, infinite list) in plain JS or React.
- A utility function: `debounce`, `throttle`, deep clone, `Promise.all` polyfill, flattening an array.
- An easy-to-medium algorithm problem (arrays, strings, hash maps). Hard LeetCode problems are rare for frontend roles.

Interviewers care about how you communicate, how you handle edge cases, and whether your code works, roughly in that order.

### 4. Take-home assignment

A small app built in a few hours to a couple of days: fetch data from an API, show a list with filtering and pagination, handle loading and error states. Reviewers look at project structure, component boundaries, state handling, typing, tests and the README. A clean, finished small project beats an ambitious unfinished one.

### 5. Frontend system design (Middle+ and Senior)

You design something like a news feed, a chat widget, an image gallery, or a design system. The discussion covers component architecture, data fetching and caching, state management, rendering strategy, performance, accessibility and failure handling. Senior candidates are expected to drive this conversation.

### 6. Behavioral interview

Questions about conflict, ownership, mistakes, and collaboration with designers and backend engineers. Prepare 5–6 real stories using the **STAR** format (Situation, Task, Action, Result) and include measurable results where possible.

## What Is Expected at Junior, Middle and Senior Level

The same question gets judged differently depending on the level you apply for. "Explain the event loop" is a pass/fail check for a Junior, but a Senior is expected to connect it to real problems such as long tasks blocking input.

| Area | Junior | Middle | Senior |
|---|---|---|---|
| JavaScript | Solid basics: scope, closures, arrays, async/await | Event loop, prototypes, `this` binding, error handling | Deep runtime understanding, memory leaks, performance trade-offs |
| React | Components, props, state, basic hooks | Rendering behavior, custom hooks, memoization, data fetching | Architecture, server/client boundaries, scaling state across teams |
| CSS | Box model, flexbox, responsive layout | Grid, specificity, layout bugs, CSS architecture | Design systems, theming, rendering performance |
| Testing | Knows why tests matter | Writes unit and component tests | Defines test strategy for a team |
| System design | Not expected | Can design a feature end to end | Leads design of a whole app, discusses trade-offs |
| Ownership | Completes well-defined tasks | Owns features | Owns outcomes, mentors, influences technical direction |

Be honest about your level. Applying for Senior while answering at a Middle level is worse than applying for Middle and clearly exceeding expectations.

## Core Topics and the Most Frequently Asked Concepts

### HTML and CSS

Many candidates underestimate this section and lose easy points.

- **Semantic HTML**: when to use `<button>` vs `<a>`, `<nav>`, `<main>`, `<article>`, `<section>`, and why a clickable `<div>` is a problem (no keyboard focus, no role for screen readers).
- **Box model**: content, padding, border, margin, and what `box-sizing: border-box` changes. Margin collapsing between vertical block elements is a classic follow-up.
- **Flexbox vs Grid**: Flexbox is for one-dimensional layouts (a row or a column), Grid for two-dimensional layouts. Know `justify-content` vs `align-items`, `flex: 1`, and `grid-template-columns: repeat(auto-fill, minmax(200px, 1fr))`.
- **Specificity**: inline styles > IDs > classes/attributes/pseudo-classes > elements. `!important` overrides normal rules; `:where()` has zero specificity.
- **Positioning and stacking**: `relative`, `absolute`, `fixed`, `sticky`, and why `z-index` sometimes "doesn't work" (a new stacking context created by `transform`, `opacity < 1`, etc.).
- **Accessibility (a11y)**: `alt` text, labels for inputs, focus management in modals, color contrast, and using ARIA only when native HTML is not enough.

Practice: [HTML & CSS interview questions for juniors](/en/frontend/html-css/junior).

### JavaScript

This is the heart of almost every frontend interview. If you only have time to master one topic, make it this one.

**Closures.** A closure is a function that keeps access to variables from the scope where it was created, even after that scope has finished executing. The most famous interview question:

```javascript
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 0);
}
// Output: 3, 3, 3

for (let j = 0; j < 3; j++) {
  setTimeout(() => console.log(j), 0);
}
// Output: 0, 1, 2
```

`var` is function-scoped, so all three callbacks share one `i`, which is `3` when they run. `let` creates a new binding for each iteration, so each callback captures its own value.

**The event loop.** Synchronous code runs first, then all **microtasks** (Promise callbacks, `queueMicrotask`), then one **macrotask** (`setTimeout`, I/O, events), then microtasks again, and so on.

```javascript
console.log("1");
setTimeout(() => console.log("2"), 0);
Promise.resolve().then(() => console.log("3"));
queueMicrotask(() => console.log("4"));
console.log("5");
// Output: 1, 5, 3, 4, 2
```

Being able to explain *why* this output is correct is worth more than memorizing it.

Other high-frequency JavaScript topics:

- **`this`**: determined by how a function is called, not where it is defined. Arrow functions do not have their own `this`; they take it from the surrounding scope. Know `call`, `apply` and `bind`.
- **Promises and async/await**: states (pending, fulfilled, rejected), chaining, error handling with `try/catch`, and the difference between `Promise.all`, `Promise.allSettled`, `Promise.race` and `Promise.any`.
- **Prototypes**: every object has an internal `[[Prototype]]`; property lookup walks the chain. `class` is mostly syntax on top of this.
- **Hoisting**: `var` declarations are hoisted and initialized to `undefined`; `let` and `const` are hoisted but stay in the **temporal dead zone** until their declaration; function declarations are hoisted entirely.
- **Equality**: `===` compares without type coercion; `==` coerces. `null == undefined` is `true`, `NaN === NaN` is `false` (use `Number.isNaN`), and objects compare by reference.

A typical live-coding warm-up is writing `debounce`:

```javascript
function debounce(fn, delay) {
  let timerId;
  return function (...args) {
    clearTimeout(timerId);
    timerId = setTimeout(() => fn.apply(this, args), delay);
  };
}
```

Practice by level: [JavaScript junior questions](/en/frontend/javascript/junior) and [JavaScript middle questions](/en/frontend/javascript/middle).

### TypeScript

Most frontend job descriptions now list TypeScript. Interviewers usually check that you use it to model data, not just to silence the compiler.

- **Generics**: writing reusable typed functions and components, plus constraints with `extends`.
- **Narrowing**: `typeof`, `instanceof`, `in`, discriminated unions, and custom type guards (`value is User`).
- **Utility types**: `Partial`, `Required`, `Pick`, `Omit`, `Record`, `ReturnType`, `Awaited`.
- **`type` vs `interface`**, and **`unknown` vs `any`**: `unknown` forces you to narrow before use, which is why it is the safer choice for external data.

```typescript
type ApiResult<T> =
  | { status: "success"; data: T }
  | { status: "error"; message: string };

function render<T>(result: ApiResult<T>) {
  if (result.status === "success") {
    return result.data; // narrowed to T
  }
  return result.message; // narrowed to string
}
```

See the [TypeScript question bank](/en/frontend/typescript).

### React

React questions focus on understanding how rendering works, not on remembering API names.

- **Rendering**: a component re-renders when its state changes, its parent re-renders, or a context it consumes changes. Re-rendering is not the same as updating the DOM; React diffs the output first.
- **Rules of hooks**: call hooks only at the top level and only from components or custom hooks, because React relies on call order to match state to hooks.
- **`useEffect` pitfalls**: missing dependencies causing stale closures, infinite loops from setting state that is also a dependency, missing cleanup for subscriptions and timers, and using effects for things that should be computed during render.
- **Keys**: keys let React match list items between renders. Using the array index as a key breaks when items are reordered, inserted or removed, and can leak state between rows.
- **Memoization**: `React.memo`, `useMemo` and `useCallback` only help when they prevent expensive work or keep props referentially stable for memoized children. Wrapping everything adds cost without benefit. Mention that the React Compiler can apply this automatically in projects that enable it.
- **State management**: local state first, lift state when siblings need it, context for low-frequency global values (theme, auth), and a dedicated library (Redux Toolkit, Zustand) or a server-state tool (TanStack Query) when the app needs it. Explain *why* you choose, not just *what*.

A classic stale-closure bug:

```jsx
function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setCount((c) => c + 1); // functional update avoids stale `count`
    }, 1000);
    return () => clearInterval(id);
  }, []);

  return <p>{count}</p>;
}
```

With `setCount(count + 1)` and an empty dependency array, the counter would stop at `1` because the interval callback always sees the initial `count`.

Practice: [React junior questions](/en/frontend/react/junior), [React middle questions](/en/frontend/react/middle), and [state management questions](/en/frontend/state-management).

### Next.js

For Next.js roles, expect questions about rendering strategies and the App Router model.

- **SSR, SSG, ISR and CSR**: when the HTML is generated (per request, at build time, at build time with background revalidation, or in the browser) and the trade-offs between freshness, speed and server cost.
- **App Router**: file-based routing with `layout`, `page`, `loading` and `error` files, nested layouts, and route groups.
- **Server Components vs Client Components**: components are Server Components by default; add `"use client"` only when you need state, effects, event handlers or browser APIs. Server Components reduce the JavaScript sent to the browser and can fetch data directly.
- **Caching**: know that caching behavior has changed between versions. In recent versions `fetch` requests are not cached by default, and you opt in explicitly. Be ready to explain revalidation by time and on demand, and to say which version you have worked with.

Practice: [Next.js middle questions](/en/frontend/nextjs/middle).

### Performance and Core Web Vitals

Middle and Senior candidates should be able to discuss performance with real metrics:

- **LCP (Largest Contentful Paint)**: good is 2.5s or less. Improve with optimized images, preloading the hero image, server rendering and a fast server response.
- **INP (Interaction to Next Paint)**: good is 200ms or less. Replaced FID in 2024. Improve by breaking up long tasks, reducing JavaScript, and avoiding heavy work in event handlers.
- **CLS (Cumulative Layout Shift)**: good is 0.1 or less. Fix by reserving space for images, ads and embeds, and by handling web fonts carefully.

Also know code splitting, lazy loading, list virtualization, and how to use the Performance panel in Chrome DevTools to find long tasks.

### Frontend System Design

Use a repeatable structure so you do not freeze:

1. **Clarify requirements**: functional (what the user can do) and non-functional (scale, devices, offline support, accessibility, SEO).
2. **High-level architecture**: main components and how they communicate.
3. **Data model and API**: what data you need, REST vs GraphQL, pagination (cursor vs offset), real-time updates (polling, SSE, WebSocket).
4. **State and caching**: what lives on the server, what lives in the client, and how it stays in sync.
5. **Performance, accessibility and error handling**: loading states, retries, optimistic updates, keyboard navigation.
6. **Trade-offs**: say what you would do differently with more time or at larger scale.

Practice: [frontend system design senior questions](/en/frontend/system-design/senior).

## Common Mistakes Candidates Make

- **Memorizing answers without understanding.** Interviewers ask a follow-up question specifically to catch this. "Why?" is the most common follow-up.
- **Coding in silence during live coding.** Talk through your approach before typing. A correct solution delivered silently scores lower than a partly correct one with clear reasoning.
- **Skipping edge cases.** Empty arrays, `null` values, network errors, double clicks, very long text.
- **Ignoring HTML, CSS and accessibility.** They are easy points that many candidates lose.
- **Over-engineering the take-home.** Adding Redux, micro-frontends and a custom design system to a two-page app signals poor judgment.
- **Vague behavioral answers.** "We worked as a team and solved it" says nothing. Describe what *you* did and what changed.
- **Not asking questions at the end.** It looks like a lack of interest. Ask about the team, code review process, and how success is measured in the role.

## A Realistic 4-Week Study Plan

This plan assumes about 1.5–2 hours on weekdays and a bit more on weekends. Adjust the depth to your target level.

### Week 1: JavaScript fundamentals

- Scope, closures, hoisting, `this`, prototypes, equality.
- Event loop, Promises, async/await.
- Implement by hand: `debounce`, `throttle`, `Promise.all`, deep clone, `Array.prototype.map`.
- Take a timed JavaScript quiz every day and review every wrong answer until you can explain it.

### Week 2: HTML, CSS, TypeScript

- Semantic HTML and accessibility basics; test a page using only the keyboard.
- Build two or three layouts with Flexbox and Grid from scratch.
- Specificity, stacking context, responsive design.
- TypeScript generics, narrowing and utility types; convert a small JS project to TS.

### Week 3: React and Next.js

- Rendering behavior, hooks rules, `useEffect` cleanup and dependencies.
- Build common interview components: autocomplete with debounced fetch, modal with focus trap, paginated list with loading and error states.
- State management choices and when to use server-state libraries.
- Next.js rendering strategies, Server vs Client Components, caching and revalidation.

### Week 4: Performance, system design, mock interviews

- Core Web Vitals; audit one of your own projects with Lighthouse and fix two issues.
- Practice two or three system design problems out loud, using the structure above.
- Prepare 5–6 STAR stories.
- Do at least two mock interviews with a friend or colleague, including live coding under time pressure.
- Revisit your weakest topics based on quiz results.

## Tips for the Day of the Interview

- **Test your setup** 15 minutes early: camera, microphone, screen sharing, and the editor or online IDE they will use.
- **Restate the problem** in your own words and ask clarifying questions before writing code.
- **Start simple, then improve.** A working brute-force solution followed by an optimization is better than an unfinished clever one.
- **Say "I don't know, but here is how I would find out"** when you genuinely do not know. Guessing confidently and being wrong hurts more.
- **Test your code** by walking through an example input, including an edge case.
- **Manage time.** If you are stuck for more than a few minutes, say so and ask for a hint; that is a normal part of the process.
- **Write down what you were asked** right after the interview. These notes are the best material for your next one.

## Summary

Frontend interviews reward a solid understanding of fundamentals more than knowledge of the latest library. Focus on JavaScript, rendering in React, and clear communication; know what is expected at your target level; and practice under realistic conditions. The fastest way to find your weak spots is to test yourself regularly. Start practicing with level-based quizzes on [DevTier's frontend interview questions](/en/frontend) and track your progress topic by topic.
