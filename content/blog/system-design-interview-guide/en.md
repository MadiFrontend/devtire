---
title: "System Design Interview: A Step-by-Step Guide to Passing"
description: "Prepare for your system design interview with a proven 45-minute framework, estimation examples, core building blocks, a URL shortener walkthrough, and a study plan."
date: "2026-11-09"
categories: ["scalability", "load-balancing", "caching-cdn", "replication-sharding", "consistency", "case-studies"]
tags: ["system design", "interview prep", "scalability", "distributed systems", "architecture"]
---

A system design interview is not a test of whether you can recite how Netflix works. It measures whether you can take a vague problem, turn it into concrete requirements, and reason your way to a design whose trade-offs you can defend. This guide gives you a repeatable framework for the 45–60 minute session, the building blocks you need to know cold, a worked URL shortener example, and a study plan you can actually follow.

## What Interviewers Actually Evaluate

Most companies score system design on a rubric that looks roughly like this:

- **Problem scoping**: Do you ask the questions that change the design (scale, read/write ratio, latency targets, consistency needs), or do you start drawing boxes immediately?
- **Technical depth**: Can you explain *how* a component works when pushed, not just name it? "We'll add Kafka" is a label; explaining partitions, consumer groups, and ordering guarantees is depth.
- **Trade-off reasoning**: Every choice has a cost. Interviewers want to hear "I'm choosing X over Y because of requirement Z, and the price is W."
- **Communication and driving**: You lead the conversation, check in at milestones, and adapt when the interviewer redirects you.
- **Pragmatism**: Do you design for the stated scale, or over-engineer a 100-user internal tool into a multi-region mesh?

There is rarely a single correct answer. Two candidates can propose different architectures and both get a strong hire, because the score comes from the reasoning, not the diagram.

## A Step-by-Step Framework for the 45–60 Minute Interview

Time management is where many candidates fail. They spend 25 minutes on requirements or jump into database schemas and never reach the high-level design. Use a rough budget:

| Phase | Time (45 min) | Output |
|---|---|---|
| Clarify requirements | 5–7 min | Functional + non-functional list |
| Estimation | 3–5 min | QPS, storage, bandwidth |
| API design | 3–5 min | Core endpoints |
| Data model | 3–5 min | Entities, storage choice |
| High-level design | 8–10 min | Box diagram, request flow |
| Deep dives | 10–15 min | 1–2 components in detail |
| Bottlenecks and wrap-up | 3–5 min | Risks, trade-offs, next steps |

### 1. Clarify Requirements

Split requirements into two groups and write them down where the interviewer can see them.

**Functional requirements** describe what the system does. Keep the list short, three to five core features, and explicitly mark what's out of scope. "Users can create short links and be redirected. Custom aliases are nice-to-have. Analytics is out of scope unless you'd like me to include it."

**Non-functional requirements** shape the architecture far more than the features do:

- **Scale**: daily active users, requests per second, data growth
- **Latency**: p99 targets for the hot path (for example, redirect under 50 ms)
- **Availability**: 99.9% vs 99.99% means very different redundancy
- **Consistency**: Is it acceptable for a newly created item to be invisible for a second? For a bank balance, no; for a like count, yes.
- **Durability**: Can we ever lose data?

A good question to ask: "Is this read-heavy or write-heavy?" That single answer drives your caching, replication, and storage decisions.

### 2. Back-of-the-Envelope Estimation

Estimation is about orders of magnitude, not precision. Round aggressively: a day has about 100,000 seconds (86,400 really), which makes mental math easy. Here's a worked example for a URL shortener:

```text
Assumptions
  New URLs per day:        100 M
  Read:write ratio:        100:1
  Record size:             ~500 bytes (short key, long URL, metadata)
  Retention:               5 years

Write QPS
  100 M / 86,400 s         ≈ 1,200 writes/s   (peak ×3 ≈ 3,500/s)

Read QPS
  1,200 × 100              ≈ 120,000 reads/s  (peak ≈ 350,000/s)

Storage
  100 M × 365 × 5          ≈ 182 B records
  182 B × 500 B            ≈ 91 TB

Key space
  Base62, 7 characters     = 62^7 ≈ 3.5 trillion keys  (enough for 182 B)

Cache (80/20 rule)
  Assume ~1 B distinct URLs read per day, cache the hottest 20%
  0.2 × 1 B × 500 B        ≈ 100 GB  → fits in a small Redis cluster
```

Then say what the numbers *mean*: 120K reads/s is far beyond a single database, so reads must be served mostly from cache; 91 TB won't fit on one machine, so we need sharding; 3,500 writes/s is moderate and manageable with a sharded store.

It also helps to know the classic latency numbers, because they justify decisions like "cache this in memory" or "avoid a cross-region call on the hot path":

| Operation | Approximate latency |
|---|---|
| L1 cache reference | ~1 ns |
| Main memory reference | ~100 ns |
| SSD random read | ~20–100 µs |
| Round trip within a datacenter | ~0.5 ms |
| Read 1 MB sequentially from SSD | ~1 ms |
| HDD disk seek | ~10 ms |
| Cross-continent round trip | ~100–150 ms |

### 3. API Design

Define the contract before the internals. Two or three endpoints are usually enough:

```http
POST /api/v1/urls
Body: { "longUrl": "https://...", "customAlias": "optional", "expiresAt": "optional" }
Response: 201 { "shortUrl": "https://sho.rt/aZ3kQ9x" }

GET /{shortKey}
Response: 301 or 302 redirect to longUrl
```

Mention decisions as you go: authentication (API keys for creation), rate limiting per user, idempotency for retried POSTs, and pagination for any list endpoint. For the redirect, **301** lets browsers cache the redirect (less load, but you lose click analytics), while **302** sends every click through your servers. That's a trade-off worth saying out loud.

### 4. Data Model

Identify entities and access patterns, then choose storage. Access patterns matter more than the entity list: the URL shortener needs a single lookup by key, with no joins and no range queries. That points toward a key-value or wide-column store, though a sharded relational database also works.

| Criterion | SQL (PostgreSQL, MySQL) | NoSQL (DynamoDB, Cassandra, MongoDB) |
|---|---|---|
| Schema | Strict, enforced | Flexible |
| Transactions | Strong ACID, multi-row | Often limited to single item or partition |
| Joins | Native | Usually denormalize instead |
| Horizontal scaling | Possible, needs effort (sharding, Vitess, Citus) | Built in |
| Best for | Relational data, complex queries, integrity | Simple access patterns, massive scale, high write throughput |

Don't say "NoSQL because it scales." Say "our access pattern is a point lookup by key at 120K reads/s with 91 TB of data, and we don't need cross-row transactions, so a partitioned key-value store fits well."

### 5. High-Level Design

Draw the main components and walk through one request end to end. For most web systems the skeleton is: client → DNS/CDN → load balancer → stateless application servers → cache → database, plus async workers behind a queue. Narrate the write path and the read path separately. Keep it simple first; you'll add complexity in the deep dives.

### 6. Deep Dives

The interviewer will usually pick one or two areas, or ask you to choose. Good candidates are the parts most affected by the non-functional requirements: key generation, the caching strategy, the sharding scheme, or how you handle a hot key. This is where depth shows: failure modes, consistency during replication, what happens when the cache goes down.

### 7. Bottlenecks and Trade-offs

Proactively find the weak points: single points of failure, hot partitions, thundering herds on cache misses, a queue backing up. For each one, propose a mitigation and state its cost.

### 8. Wrap-Up

Summarize the design in under a minute, restate the key trade-offs, and list what you'd do with more time: monitoring and alerting, multi-region deployment, abuse prevention, cost optimization. Ending with a clear summary leaves a much stronger impression than running out of time mid-sentence.

## Core Building Blocks You Must Know

You can't reason about trade-offs between components you only know by name. These are the areas that come up in almost every interview. You can check your understanding with the [scalability practice questions](/en/system-design/scalability) on DevTier.

### Load Balancers

Know the difference between **L4** (transport layer, routes by IP/port, very fast) and **L7** (application layer, routes by path, headers, or cookies, can terminate TLS). Know the algorithms: round robin, least connections, weighted, and **consistent hashing** for sticky routing to caches. Health checks and the requirement that app servers be **stateless** (session data in Redis or a token, not in local memory) are almost always relevant. Test yourself with [middle-level load balancing questions](/en/system-design/load-balancing/middle).

### Caching and CDN

Know the patterns: **cache-aside** (app reads cache, falls back to DB, populates cache), **write-through**, **write-behind**, and their consistency implications. Know eviction policies (LRU, LFU, TTL), and the classic failure modes: **cache stampede** (many misses at once for a hot key; fix with request coalescing or locks), **cache penetration** (queries for keys that don't exist; fix with negative caching or a Bloom filter), and stale data. A **CDN** caches static and cacheable content at edge locations close to users, which cuts latency and origin load. Practice with [caching and CDN questions](/en/system-design/caching-cdn/middle).

### Replication and Sharding

**Replication** copies data to multiple nodes for availability and read scaling. Leader-follower is the most common setup: writes go to the leader, reads can go to followers, with **replication lag** as the price. Multi-leader and leaderless (quorum-based, as in Cassandra) setups trade simplicity for write availability.

**Sharding** splits data across nodes for write and storage scaling. Know the strategies: range-based (good for range queries, risk of hot spots), hash-based (even distribution, no range queries), and consistent hashing (minimal data movement when nodes are added). Be ready to discuss choosing a shard key, hot partitions, and resharding. Drill this with [replication and sharding questions](/en/system-design/replication-sharding/middle).

### Consistency and CAP

The **CAP theorem** says that during a network partition, a distributed system must choose between consistency and availability. Since partitions happen in practice, the real choice is CP vs AP behavior under failure. **PACELC** extends this: even without partitions, you trade latency against consistency. Know the spectrum: strong consistency, read-your-writes, monotonic reads, causal, and eventual consistency, and be able to map each requirement to a level. Quorum math (`R + W > N` for overlapping reads and writes) is a frequent follow-up. Senior candidates should try the [senior consistency questions](/en/system-design/consistency/senior).

### Message Queues and Event-Driven Architecture

Queues (RabbitMQ, SQS) and logs (Kafka) decouple producers from consumers, absorb traffic spikes, and enable async processing. Know **delivery semantics** (at-most-once, at-least-once, effectively-once), why consumers must be **idempotent**, how Kafka partitions provide ordering only within a partition, dead-letter queues, and patterns like the **transactional outbox** for reliably publishing events after a database write. See the [event-driven questions](/en/system-design/event-driven/middle).

### Reliability Patterns

- **Retries with exponential backoff and jitter**: prevents synchronized retry storms.
- **Timeouts**: every network call needs one; without them, slow dependencies exhaust your thread pools.
- **Circuit breakers**: stop calling a failing dependency and fail fast, then probe for recovery.
- **Rate limiting**: token bucket or sliding window, often enforced at the API gateway, with distributed counters in Redis.
- **Bulkheads**: isolate resources so one failing feature doesn't take down the rest.
- **Graceful degradation**: serve stale cache or a reduced feature set instead of an error.

Test these with [senior reliability questions](/en/system-design/reliability/senior).

## Worked Example: Design a URL Shortener (High Level)

Using the numbers from the estimation section (about 120K reads/s, 3,500 peak writes/s, 91 TB over five years), here's how the design comes together.

**Key generation** is the interesting deep dive. Options:

1. **Hash the long URL** (MD5/SHA-256, take the first 7 base62 characters). Simple, but collisions need detection and retry, and the same long URL always maps to the same key, which may or may not be desired.
2. **Counter + base62 encoding**. Guaranteed unique, but a single global counter is a bottleneck and a single point of failure. Fix it by having each app server lease ID ranges (for example, blocks of 1,000) from a coordination service like ZooKeeper or a database sequence. Sequential keys are guessable; if that matters, shuffle the bits or use a different encoding.
3. **Pre-generated key service**. A background job generates random unused keys into a pool; app servers claim batches. Fast at write time, at the cost of an extra component.

**Write path**: client → load balancer → app server → get key from local ID range → write `{key, longUrl, createdAt, expiresAt, userId}` to the key-value store, sharded by `key` → return the short URL.

**Read path**: client → CDN/edge (optional for very hot links) → load balancer → app server → Redis (cache-aside) → on miss, read from the database and populate the cache → return a 302. With an 80/20 access pattern, the cache absorbs the vast majority of the 120K reads/s.

**Storage**: a partitioned key-value store (DynamoDB, Cassandra) sharded by hash of the key, replicated three times. Because each lookup is a single key, there are no cross-shard queries.

**Bottlenecks and trade-offs to mention**:

- A viral link creates a **hot key**. The cache handles it, and you can add a small in-process cache on app servers for the top keys.
- **Analytics** shouldn't slow the redirect. Publish click events to Kafka asynchronously and aggregate them in a separate pipeline.
- **Abuse**: rate-limit creation per API key and check URLs against a malware blocklist.
- **Expiration**: lazy deletion on read plus a background cleanup job.

Case studies like this are worth practicing repeatedly. Try the [senior case study questions](/en/system-design/case-studies/senior) to test how you reason through full designs.

## How Expectations Differ: Middle vs Senior vs Staff

The same question can be asked at every level; what changes is the bar.

**Middle engineers** are expected to produce a working, reasonable design with some guidance. You should know the building blocks, size the system roughly, and explain the request flow. It's fine if the interviewer nudges you toward the important deep dives. Starting with [junior scalability questions](/en/system-design/scalability/junior) and moving to the middle level is a good warm-up.

**Senior engineers** must drive the interview independently. You identify the hard parts yourself, go deep on at least one or two components, discuss failure modes without prompting, and justify trade-offs with numbers. You should be comfortable with consistency models, replication lag effects, and operational concerns like monitoring, deployments, and data migrations.

**Staff engineers** are evaluated on breadth and judgment across the whole system and organization. Expect to discuss how the design evolves over time (v1 vs v3), multi-region strategy, cost, build-vs-buy decisions, team boundaries, and migration from an existing system without downtime. Staff candidates often reframe the problem: "Do we actually need real-time here, or would a five-minute delay unlock a much simpler design?"

## Common Mistakes

- **Jumping into the solution** before clarifying requirements. You end up designing the wrong system.
- **Buzzword architecture**: adding Kafka, Kubernetes, and microservices without a requirement that justifies them.
- **Ignoring the numbers**: doing estimation and then never using the results to drive decisions.
- **Going silent**: the interviewer can't score reasoning they can't hear. Think out loud.
- **Spending all the time on one component** and never presenting an end-to-end design.
- **No trade-offs**: presenting every choice as obviously correct. Strong candidates name the downside of their own design.
- **Ignoring failure**: never asking "what happens when this node, this cache, or this region goes down?"
- **Fighting the interviewer's hints**: when they redirect you, there's usually a reason.

## A Practical Study Plan

You can build solid readiness in about four to six weeks with consistent effort.

**Weeks 1–2: Fundamentals.** Study one building block per day or two: load balancing, caching, databases and indexing, replication, sharding, consistency, queues, and reliability patterns. *Designing Data-Intensive Applications* by Martin Kleppmann is the best single book for depth. After each topic, answer quiz questions to find the gaps between "I've read about it" and "I can explain it."

**Weeks 3–4: Classic problems.** Work through common prompts: URL shortener, rate limiter, news feed, chat system, notification service, file storage, web crawler, and a distributed cache. For each one, run the full framework on paper within 45 minutes, then compare your design with published solutions and engineering blogs (the engineering blogs of companies like Uber, Discord, Netflix, and Stripe describe real trade-offs at scale).

**Weeks 5–6: Mock interviews.** Practice out loud with a peer or record yourself. Time each phase. Ask for feedback specifically on driving the conversation and articulating trade-offs, since those are the skills that improve most with practice.

**Throughout:** keep a one-page cheat sheet with latency numbers, estimation shortcuts, and the questions you always ask during requirements gathering. Short, frequent quiz sessions are more effective than occasional long study days, because spaced repetition is what moves concepts from recognition to recall.

## Summary

Passing a system design interview comes down to a repeatable process: clarify requirements, estimate the scale, define APIs and data, sketch a high-level design, go deep where it matters, and be honest about trade-offs. The building blocks are finite, and the reasoning gets faster with practice. Test your knowledge of each topic, from load balancing to consistency, with the free [system design quizzes on DevTier](/en/system-design), and come back regularly until the trade-offs come to you without hesitation.
