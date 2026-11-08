---
title: "Backend Interview Guide: Node.js, APIs, Databases & More"
description: "A complete backend interview guide: Node.js event loop, API design, SQL and NoSQL, Redis caching, auth, message queues, a 4-week plan and level expectations."
date: "2026-11-09"
categories: ["nodejs", "api-design", "databases", "caching", "auth-security", "message-queues"]
tags: ["backend interview", "nodejs", "system design", "interview prep", "databases"]
---

This guide covers what backend interviews actually test, how expectations change from Junior to Senior, and the concepts that come up again and again in each area: Node.js, API design, SQL and NoSQL databases, caching, security, message queues, and architecture. The examples use Node.js, but almost everything applies to any backend stack. It ends with a 4-week study plan and practical advice for interview day.

## The Stages of a Backend Interview

Most companies use some version of this pipeline. Knowing what each stage checks helps you prepare for the right thing.

1. **Recruiter or HR screen (15–30 min).** Your background, salary expectations, notice period. Have a 60-second summary of your experience ready.
2. **Technical screen (45–60 min).** Rapid-fire conceptual questions ("What's the difference between `process.nextTick` and `setImmediate`?", "When would you add an index?") and sometimes a small coding task.
3. **Coding round.** Either algorithmic problems or, more often for backend roles, a practical task: build an endpoint, fix a buggy service, write a query.
4. **System design (Middle and Senior).** Design a URL shortener, a notification service, or a rate limiter. You're evaluated on trade-offs, not on a "correct" diagram.
5. **Behavioral and team fit.** Incidents you handled, disagreements, ownership. Use the STAR format (Situation, Task, Action, Result) and real numbers.
6. **Take-home assignment (some companies).** Clean structure, tests, a README, and sensible error handling matter more than extra features.

## What Each Level Is Expected to Know

| Area | Junior | Middle | Senior |
|---|---|---|---|
| Node.js | Async/await, modules, basic event loop | Event loop phases, streams, error handling patterns | Worker threads, memory leaks, profiling, performance tuning |
| API design | CRUD with REST, common status codes | Pagination, validation, idempotency, versioning | API evolution strategy, REST vs GraphQL vs gRPC trade-offs |
| Databases | Basic SQL, JOINs, primary/foreign keys | Indexes, transactions, N+1, query plans | Isolation levels, replication, sharding, migrations at scale |
| Caching | Knows what a cache is | Cache-aside, TTL, invalidation | Stampede protection, consistency trade-offs, multi-layer caching |
| Security | Password hashing, HTTPS | JWT vs sessions, OWASP basics | OAuth 2.0 flows, threat modeling, secret management |
| Architecture | Layered app structure | Queues, background jobs, testing strategy | Microservices boundaries, observability, failure modes |
| Ownership | Completes well-defined tasks | Owns features end to end | Drives technical decisions, mentors, handles incidents |

A useful rule: Juniors are asked **what** something is, Middles are asked **how** to use it correctly, and Seniors are asked **when not** to use it and what breaks at scale.

## Node.js

Start with the fundamentals and test yourself with [Node.js interview questions for Juniors](/en/backend/nodejs/junior) before moving to harder material.

### The Event Loop and Its Phases

Node.js runs your JavaScript on a single thread. I/O is delegated to the OS or to **libuv**'s thread pool (used for file system operations, DNS lookups, `crypto`, and `zlib`), and callbacks are queued for the event loop. The phases, in order:

- **timers**: callbacks from `setTimeout` and `setInterval` whose time has elapsed
- **pending callbacks**: some deferred system-level I/O callbacks
- **poll**: retrieve new I/O events and run their callbacks; the loop may block here waiting
- **check**: `setImmediate` callbacks
- **close callbacks**: e.g. `socket.on('close')`

Between each callback, Node drains the **`process.nextTick` queue** first, then the **Promise microtask queue**. This ordering question is an interview classic:

```js
// CommonJS module (node app.js)
console.log('1: sync');

setTimeout(() => console.log('timeout'), 0);
setImmediate(() => console.log('immediate'));
Promise.resolve().then(() => console.log('promise'));
process.nextTick(() => console.log('nextTick'));

console.log('2: sync');

// Output:
// 1: sync
// 2: sync
// nextTick
// promise
// timeout / immediate  <- order between these two is not guaranteed here
```

Strong answers mention the nuance: in the main module, `setTimeout(0)` vs `setImmediate` depends on process timing. **Inside an I/O callback**, `setImmediate` always runs first, because the check phase comes right after poll. Also, a recursive `process.nextTick` can starve the event loop, because the queue is drained completely before moving on.

### Non-blocking I/O

"Non-blocking" means the main thread doesn't wait for I/O. It does **not** mean CPU work is free. A `JSON.parse` on a 50 MB payload, a synchronous `bcrypt.hashSync`, or a catastrophic regex blocks every request on that process. Be ready to explain how you would detect this (event loop lag metrics, `--prof`, clinic.js) and fix it (chunking, streaming, worker threads, moving work to a queue).

### Streams

Streams process data in chunks instead of loading it all into memory. Know the four types (**Readable**, **Writable**, **Duplex**, **Transform**) and **backpressure**: when the writable side can't keep up, `write()` returns `false` and the producer should pause until `drain`. Use `stream.pipeline()` (or `await pipeline()` from `node:stream/promises`) rather than chained `.pipe()`, because `pipeline` propagates errors and cleans up all streams.

### Worker Threads, Cluster, and Child Processes

- **worker_threads**: for CPU-heavy work inside the same process; can share memory via `SharedArrayBuffer`.
- **cluster** (or multiple containers behind a load balancer): to use multiple CPU cores for handling HTTP traffic.
- **child_process**: to run external programs or isolate untrusted work.

### Error Handling

Interviewers want to see that you distinguish **operational errors** (DB timeout, invalid input) from **programmer errors** (undefined is not a function). Key points: always handle rejections in async route handlers (Express 5 does this automatically; Express 4 needs a wrapper), use a central error middleware, and treat `uncaughtException` as fatal: log, then exit and let the process manager restart. Continuing after it leaves the process in an unknown state.

Once these feel comfortable, try the [Middle-level Node.js questions](/en/backend/nodejs/middle).

## API Design

### REST Semantics and Status Codes

Know the methods and their properties:

| Method | Safe | Idempotent | Typical use |
|---|---|---|---|
| GET | Yes | Yes | Read a resource |
| PUT | No | Yes | Replace a resource |
| PATCH | No | Not guaranteed | Partial update |
| DELETE | No | Yes | Remove a resource |
| POST | No | No | Create, or trigger an action |

Status codes worth knowing cold: **200**, **201** (with a `Location` header), **204**, **400** (malformed request), **401** (not authenticated), **403** (authenticated but not allowed), **404**, **409** (conflict, e.g. duplicate), **422** (validation failed), **429** (rate limited), **500**, **502/503/504**.

### Idempotency

Networks fail, clients retry. If a client retries `POST /payments` after a timeout, you must not charge twice. The standard solution is an **Idempotency-Key** header: the server stores the result of the first request under that key and returns the same result for retries.

```js
// Express + Redis (node-redis v4)
app.post('/payments', async (req, res) => {
  const key = req.get('Idempotency-Key');
  if (!key) return res.status(400).json({ error: 'Idempotency-Key required' });

  const cacheKey = `idem:${req.user.id}:${key}`;
  // Atomically claim the key; NX = only set if it doesn't exist
  const claimed = await redis.set(cacheKey, 'processing', { NX: true, EX: 86400 });

  if (!claimed) {
    const stored = await redis.get(cacheKey);
    if (stored === 'processing') return res.status(409).json({ error: 'Request in progress' });
    const { status, body } = JSON.parse(stored);
    return res.status(status).json(body);
  }

  try {
    const payment = await createPayment(req.user.id, req.body);
    await redis.set(cacheKey, JSON.stringify({ status: 201, body: payment }), { EX: 86400 });
    res.status(201).json(payment);
  } catch (err) {
    await redis.del(cacheKey); // allow a retry after failure
    throw err;
  }
});
```

A good follow-up point: scope keys per user, and in production also compare a hash of the request body so the same key with a different payload is rejected.

### Pagination

- **Offset pagination** (`?limit=20&offset=40`): simple, supports jumping to page N, but slow on large offsets (the DB still scans skipped rows) and unstable when rows are inserted.
- **Cursor (keyset) pagination** (`?limit=20&after=<id>`): uses `WHERE id > :cursor ORDER BY id LIMIT 20`, stays fast with an index and stable under inserts. This is the answer for feeds and large tables.

### Versioning

URL versioning (`/v1/orders`) is the most common and easiest to cache and debug; header-based versioning keeps URLs clean. More important than the mechanism: add fields without breaking clients, never change the meaning of an existing field, and deprecate with a timeline.

### REST vs GraphQL vs gRPC

- **REST**: simple, HTTP caching works out of the box, best for public APIs.
- **GraphQL**: clients request exactly the fields they need; great for multiple frontends with different needs. Costs: HTTP caching is harder, N+1 on resolvers (use DataLoader), and you need query complexity limits.
- **gRPC**: binary Protobuf over HTTP/2, strict contracts, streaming; ideal for internal service-to-service calls, awkward directly from browsers.

Practice these trade-offs with the [API design quizzes](/en/backend/api-design).

## SQL Databases

### Indexes

An index (usually a **B-tree**) lets the DB find rows without a full table scan, at the cost of slower writes and extra storage. Know **composite index** column order: an index on `(user_id, created_at)` serves `WHERE user_id = ?` and `WHERE user_id = ? ORDER BY created_at`, but not `WHERE created_at > ?` alone (the leftmost-prefix rule).

```sql
-- Query: latest orders for a user
SELECT id, total, created_at
FROM orders
WHERE user_id = 42
ORDER BY created_at DESC
LIMIT 20;

-- Supports both the filter and the sort, no separate sort step
CREATE INDEX idx_orders_user_created ON orders (user_id, created_at DESC);

-- Verify the plan (PostgreSQL)
EXPLAIN ANALYZE SELECT ...;
```

Always mention `EXPLAIN` / `EXPLAIN ANALYZE`. Saying "I'd check the query plan" is a strong signal.

### Transactions and Isolation Levels

**ACID** is the baseline. The deeper question is isolation. From weakest to strongest:

- **Read Uncommitted**: dirty reads possible (PostgreSQL treats it as Read Committed).
- **Read Committed**: no dirty reads, but non-repeatable reads. Default in PostgreSQL.
- **Repeatable Read**: same row read twice gives the same value. Default in MySQL InnoDB.
- **Serializable**: behaves as if transactions ran one at a time; expect serialization failures you must retry.

A classic scenario: two requests decrement stock at the same time. Solutions are an atomic update (`UPDATE products SET stock = stock - 1 WHERE id = ? AND stock > 0`), `SELECT ... FOR UPDATE`, or optimistic locking with a `version` column.

### The N+1 Problem

Fetching 50 posts, then running one query per post for its author, means 51 queries. Fix it with a JOIN, a single `WHERE id IN (...)` query, or your ORM's eager loading (`include` in Prisma/Sequelize). In GraphQL, use DataLoader to batch.

### Normalization

Normalize (roughly to 3NF) to avoid update anomalies and duplicated data. Denormalize deliberately for read-heavy paths, such as storing `comments_count` on a post, and be clear about how you keep it consistent.

Test yourself with the [Middle-level database questions](/en/backend/databases/middle).

## NoSQL

### Document Modeling

In MongoDB and similar stores, **model around your access patterns**, not around entities. Embed data that is read together and bounded in size (order line items inside an order). Reference data that grows without bound or is shared (a user's millions of events). The 16 MB document limit and unbounded arrays are common follow-up topics.

### When to Choose NoSQL

Choose it for flexible or evolving schemas, very high write throughput, simple key-based access at huge scale (DynamoDB, Cassandra), or specific data shapes (time series, graphs). Stay with a relational DB when you need complex queries across entities, strong multi-row transactions, or reporting. "We'll use MongoDB because it's faster" without a reason is a red flag to interviewers. See the [NoSQL quizzes](/en/backend/nosql).

## Caching and Redis

### Cache-Aside

The most common pattern: read from the cache; on a miss, read from the DB, write to the cache with a TTL, and return. On writes, update the DB, then **delete** the cache key (deleting is safer than updating, because it avoids racing writers leaving stale values).

### Invalidation and TTL

"There are only two hard things in computer science: cache invalidation and naming things." Combine explicit invalidation on writes with a **TTL** as a safety net, so stale data eventually expires even if an invalidation is missed. Add random jitter to TTLs so many keys don't expire at the same moment.

### Cache Stampede

When a hot key expires, hundreds of requests miss at once and all hit the database. Mitigations:

- a **lock** (Redis `SET key NX EX`) so only one request rebuilds the value while others wait or get stale data
- **request coalescing** in-process (share one in-flight promise per key)
- **early or probabilistic refresh** before the TTL expires

Also know what Redis is beyond a cache: rate limiting with `INCR` + `EXPIRE`, sessions, sorted-set leaderboards, distributed locks, and pub/sub. Practice with the [Senior-level caching questions](/en/backend/caching/senior).

## Authentication and Security

### Sessions vs JWT

- **Sessions**: the server stores state, the client holds an opaque cookie. Easy to revoke, needs a shared store (Redis) when scaled horizontally.
- **JWT**: signed, self-contained token, verified without a DB lookup. Hard to revoke before expiry, so use short-lived access tokens (5–15 min) plus refresh tokens with rotation.

A JWT is **signed, not encrypted**; never put secrets in the payload. For browsers, an `HttpOnly`, `Secure`, `SameSite` cookie is safer than `localStorage`, which is readable by any XSS payload.

### OAuth 2.0

Know the roles (resource owner, client, authorization server, resource server) and the recommended flows: **Authorization Code with PKCE** for web and mobile apps, and **Client Credentials** for service-to-service. The Implicit flow is deprecated. Remember that OAuth is for authorization; **OpenID Connect** adds authentication (the ID token).

### Password Hashing

Never use MD5 or SHA-256 alone for passwords. Use a slow, salted algorithm: **Argon2id**, **bcrypt**, or **scrypt**. In Node.js, use the async versions so hashing doesn't block the event loop.

### OWASP Essentials

- **SQL injection**: use parameterized queries (`WHERE id = $1`), never string concatenation.
- **XSS**: escape output, use a Content Security Policy, and keep tokens out of JavaScript-readable storage.
- **CSRF**: matters with cookie-based auth. Use `SameSite` cookies and CSRF tokens for state-changing requests.
- **Broken access control**: check that the user owns the resource (`/orders/123`), not just that they're logged in. This is the #1 item in the OWASP Top 10.

Check your knowledge with the [auth and security quizzes for Middles](/en/backend/auth-security/middle).

## Message Queues

### Delivery Guarantees

- **At-most-once**: may lose messages, never duplicates.
- **At-least-once**: never loses, may duplicate. The default in most real systems.
- **Exactly-once**: only achievable within limited boundaries (e.g. Kafka transactions); end-to-end you get it by combining at-least-once delivery with idempotent processing.

### Idempotent Consumers

Since messages can arrive twice, consumers must handle duplicates. Store processed message IDs (a unique constraint on a `processed_messages` table, in the same transaction as the side effect), or design operations to be naturally idempotent (`SET status = 'paid'` rather than `balance = balance + 10`). Mention **dead-letter queues** for messages that keep failing, and the **outbox pattern** for reliably publishing events after a DB write.

### Kafka vs RabbitMQ

| | Kafka | RabbitMQ |
|---|---|---|
| Model | Distributed, append-only log | Message broker with queues and exchanges |
| Retention | Messages kept for a configured time; consumers can replay | Messages removed after acknowledgment |
| Ordering | Guaranteed within a partition | Per queue, weakened by multiple consumers |
| Best for | Event streaming, high throughput, event sourcing | Task queues, complex routing, per-message acks |

Practice with the [message queue questions](/en/backend/message-queues).

## Backend Architecture

### Monolith vs Microservices

Microservices give independent deployment and scaling, at the cost of network failures, distributed transactions, and operational overhead. A **modular monolith** is often the right starting point. Seniors are expected to say *when* to split (team boundaries, very different scaling needs) and how to handle cross-service consistency (sagas, outbox), not just list benefits.

### Observability

The three pillars: **logs** (structured JSON with a request/correlation ID), **metrics** (latency percentiles like p95/p99, error rate, throughput), and **traces** (OpenTelemetry across services). Be ready to describe how you'd debug "the API is slow since yesterday."

### Testing

Unit tests for business logic, integration tests against a real database (Testcontainers is a good answer), contract tests between services, and a small number of end-to-end tests. Mock external services, not your own database.

Explore more with the [backend architecture quizzes](/en/backend/backend-architecture).

## Common Mistakes

- **Memorizing definitions without trade-offs.** "Redis is an in-memory store" is not an answer; "I'd cache this with a 5-minute TTL because stale prices are acceptable for that long" is.
- **Ignoring failure cases.** What happens if the DB is down, the queue redelivers, or the third-party API times out?
- **Jumping into system design without requirements.** Ask about scale, read/write ratio, and consistency needs first.
- **Over-engineering.** Proposing Kafka and ten microservices for a 1,000-user app.
- **Not thinking out loud.** Silence during coding hides your reasoning.
- **Vague behavioral answers.** "We improved performance" is weak; "p95 dropped from 800 ms to 120 ms after adding a composite index" is strong.

## A 4-Week Preparation Plan

**Week 1: Node.js and JavaScript fundamentals.** Event loop phases, Promises, streams, error handling. Write small scripts to verify ordering behavior yourself. Do one quiz per day.

**Week 2: APIs and databases.** Build a small REST API with pagination, validation, and proper status codes. Practice SQL: JOINs, indexes, `EXPLAIN`, transactions. Reproduce an N+1 problem and fix it.

**Week 3: Caching, security, and queues.** Add Redis cache-aside and rate limiting to your API. Implement JWT auth with refresh tokens. Add a background job with a queue and make the consumer idempotent.

**Week 4: System design and mock interviews.** Practice three or four classic designs (URL shortener, rate limiter, notification system, chat). Prepare five STAR stories. Do at least two mock interviews and review weak areas with quizzes.

## Interview-Day Tips

- **Clarify before answering.** Restate the problem and confirm assumptions.
- **Start simple, then improve.** A working naive solution plus a clear optimization path beats an unfinished perfect one.
- **Name the trade-off explicitly.** "This adds a Redis dependency but cuts DB load by roughly 80% for reads."
- **Say "I don't know, but here's how I'd find out."** It's far better than bluffing.
- **Prepare questions for them:** on-call process, deployment frequency, how incidents are reviewed, testing culture.
- **Check your setup** for remote interviews: stable internet, working mic, an editor ready to share.

## Summary

Backend interviews reward understanding over memorization: why the event loop behaves the way it does, when an index helps or hurts, how to keep retries safe, and what fails at scale. Learn the concepts, build something small that uses them, and test yourself regularly. You can practice all of these topics with free multiple-choice quizzes by level on [DevTier's backend track](/en/backend).
