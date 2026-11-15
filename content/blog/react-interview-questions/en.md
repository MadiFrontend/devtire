---
title: "React Interview Questions in 2026: What Gets Asked and How to Answer"
description: "The React interview questions that keep coming up from Junior to Senior: rendering, hooks, state, performance, keys, and the answers that quietly lose you points."
date: "2026-11-09"
categories: ["react", "state-management", "javascript"]
tags: ["React interview questions", "React", "hooks", "interview prep", "frontend"]
---

If you are preparing for a frontend interview, React almost always shows up. Not always as a trivia list of APIs. More often as questions that reveal whether you actually understand when a component re-renders, where state should live, and how you start debugging a slow page.

This is not a "100 React questions" dump. It focuses on what I keep hearing in real interviews, what a solid answer looks like at each level, and where candidates usually slip. For direct practice, I linked the [React](/en/frontend/react) and [state management](/en/frontend/state-management) quizzes.

## What a React interview usually looks like

It varies by company, but the common pattern is:

1. A run of conceptual questions (10 to 20 minutes).
2. A small live coding task: modal, autocomplete, filterable list, multi-step form.
3. Sometimes a short discussion about a performance bug or an architecture choice.

Interviewers are usually checking three things: whether your mental model of React is sound, whether you can think out loud, and whether you have a real way to find answers when you get stuck instead of guessing.

## Fundamentals you cannot skip

### Components, props, and state

Classic question: "What is the difference between props and state?"

Short correct answer: props come from outside and the parent owns them. State belongs to the component and updating it triggers a re-render. You do not mutate props in the child. If something needs to change, you send a callback up.

Stronger answer: local state should live close to where it is used. Lift it too high and you get extra renders. Keep it too low and sharing becomes painful. Be ready to talk about that trade-off.

### Virtual DOM and reconciliation

A lot of people say "the Virtual DOM is faster than the real DOM" and stop there. That answer is incomplete.

React builds a description of the UI, compares it with the previous one, and then applies only the needed updates to the real DOM. The expensive parts are usually the JavaScript work and the DOM commits, not some magic Virtual DOM speed boost. If the interviewer goes deeper, talk about Fiber, interruptible rendering, and why keys matter in lists.

### Keys

Question: "Why do lists need keys, and why is using the index often a bad idea?"

Keys help React tell which item is the same item as before. If you use the index and the list order changes (delete, insert, sort), React can attach the wrong component state to a different item. The classic example is an input inside a row that keeps the wrong value after you remove another row.

Practice this section with the [Junior React quiz](/en/frontend/react/junior).

## Hooks: where most people get stuck

### useState

Beyond the syntax, know these:

- State updates are batched asynchronously. If the next value depends on the previous one, use the functional form: `setCount(c => c + 1)`.
- If state is an object, create a new one. Direct mutation (`state.items.push(...)`) will not be detected.
- If the initial value is expensive to compute, use a lazy initializer: `useState(() => compute())`.

### useEffect

This is still the most common source of interview bugs.

Common questions:

- What does an empty dependency array mean?
- Why does an infinite loop happen?
- What is cleanup for?
- Why should you not dump every data fetch into an effect without thinking?

Clean answer: an effect means "after the UI matches these dependencies, run this side work." Cleanup matters when you created a subscription, timer, or listener. Miss a dependency and you work with stale values. Put an unstable object or function in the dependency list and the effect re-runs for no good reason.

What stronger candidates add: a lot of data fetching today is better handled by framework tools (loaders, Server Components) or libraries like TanStack Query, not a raw `useEffect` on every page.

Practice: [Middle React](/en/frontend/react/middle).

### useMemo, useCallback, and React.memo

Popular question: "When do you use these?"

Weak answer: "Everywhere, for performance."

Good answer: only when the computation or child render cost is real, or when referential equality matters for an effect dependency. Memoization has a cost and makes code noisier. Measure with the Profiler first, then optimize.

`React.memo` helps when props are stable. If the parent creates a new object or function on every render, memo does almost nothing. That is when `useCallback` starts to make sense, not as a default habit.

### useRef

useRef keeps a value across renders without causing another render. Common uses: DOM access, timer ids, and storing a previous value.

Good interview question: "How is useRef different from useState?" If you only say "one is for the DOM," you undersold it.

## Rendering and performance

This section often separates Middle from Senior.

Common scenario: "We have a long list. Every keystroke in the search box makes the whole page lag. What do you do?"

A reasonable path:

1. Measure first (React Profiler, what is actually re-rendering).
2. Move search state lower so the whole tree does not update.
3. Memoize rows if needed.
4. For very large lists, consider virtualization.
5. If typing itself is heavy, look at `useDeferredValue` or debounce.

Bad answer: sprinkle `useMemo` everywhere before you know the problem.

Related questions:

- Context re-renders every consumer. How do you keep the scope small?
- What is the difference between server state (cached data) and client state (UI state)?
- When do you put state in the URL?

For this layer: [Senior React](/en/frontend/react/senior) and [state management](/en/frontend/state-management).

## Controlled vs uncontrolled

A simple question people still miss.

In a controlled input, React state is the source of truth (`value` + `onChange`). In an uncontrolled input, the DOM keeps the value and you read it with a ref.

Controlled fits complex forms, live validation, and syncing multiple fields. Uncontrolled can be lighter for simple forms or integrating non-React libraries. Neither is always right. Say why you chose one.

## Composition beats inheritance and endless prop drilling

React does not do classic UI inheritance, and that is fine. Common patterns:

- children and composition
- compound components
- custom hooks for shared logic
- Context for data that is truly shared

Prop drilling through two or three levels is usually fine. When it hurts, ask yourself before reaching for Redux: is this really a shared-state problem, or is the component tree just poorly structured?

## Questions you see more in 2026

Interviews have moved away from class lifecycle trivia and toward:

- **Server Components vs Client Components**: what should stay on the server, what needs `"use client"`, and why you do not make everything a client component.
- **Suspense and streaming**: where loading boundaries should sit.
- **Transitions**: `startTransition` and `useTransition` for updates that are not urgent.
- **Caching and data fetching**: stale data, invalidation, and avoiding request waterfalls.
- **Accessibility in components**: focus in modals, keyboard use, ARIA only when native HTML is not enough.

You do not need to be an expert in all of this. For Middle and above, you should at least be able to talk with a real example, not a memorized definition.

If your stack is Next.js, also browse the [Next.js questions](/en/frontend/nextjs). A lot of "React interviews" today are really React plus framework interviews.

## Answers that quietly lose you points

- "The Virtual DOM is always faster." No explanation.
- "useEffect is for anything that should run after mount." That means your side-effect model is fuzzy.
- "Context replaces Redux." Sometimes yes, sometimes no. It depends on update rate and complexity.
- "I memoize everything so it stays fast." Usually means you have not measured yet.
- Reciting API names with no story. The interviewer will ask: "When did this bite you last?"

If your experience is thin, do not invent it. Say you practiced it in a side project or read the docs, then show your reasoning. Honesty plus thinking out loud beats fake seniority.

## How to cover this in one or two weeks

If time is short, use this order:

**Days 1 and 2:** props, state, lists, keys, controlled inputs. Keep doing the Junior quiz until the same mistakes stop repeating.

**Days 3 to 5:** useEffect, dependency arrays, cleanup, data fetching, and one real component like a search box with debounce.

**Days 6 to 8:** rendering, memoization, Context, and a couple of performance scenarios. Middle quiz.

**Days 9 and 10:** one timed live coding session (45 minutes). Then review the same code: where state sat in the wrong place, where an effect was unnecessary, where accessibility was missing.

**If you are aiming for Senior:** add two sessions on state architecture, server/client boundaries, and explaining trade-offs. Take the Senior quiz seriously even when it feels hard. Those questions show the gaps.

Start here:

- [All React questions](/en/frontend/react)
- [Junior](/en/frontend/react/junior) · [Middle](/en/frontend/react/middle) · [Senior](/en/frontend/react/senior)
- [State management](/en/frontend/state-management)
- For the wider picture: [Frontend interview guide](/en/blog/frontend-interview-guide)

## Wrap-up

A React interview is less about memorizing APIs than it looks, and more about whether you have a solid model when the UI breaks or gets slow. Get rendering, state, effects, and measurement right. Everything else hangs on that frame.

If you only do one thing today, answer 20 React quiz questions and actually read the explanations, not just the correct option. Those explanations are usually the same things you will need to say in your own words in the interview.
