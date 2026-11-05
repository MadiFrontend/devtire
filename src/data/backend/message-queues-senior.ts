import { build } from "../build";

export const messageQueuesSenior = build("message-queues", [
  {
    id: "mq-s-exactly-once-hard",
    level: "senior",
    tags: ["delivery-semantics"],
    q: [
      "چرا exactly-once delivery در یک سیستم توزیع‌شده با side effect خارجی عملاً قابل تضمین نیست؟",
      "Why can't exactly-once delivery truly be guaranteed in a distributed system with external side effects?",
    ],
    options: [
      ["چون consumer نمی‌تواند اتمیک هم اثر را اعمال کند و هم ack را ثبت کند؛ crash بین این دو ابهام ایجاد می‌کند", "The consumer can't atomically apply the effect and record the ack; a crash between them is ambiguous"],
      ["چون brokerها فقط از UDP استفاده می‌کنند", "Because brokers only use UDP"],
      ["چون پیام‌ها همیشه در شبکه خراب می‌شوند", "Because messages are always corrupted in transit"],
      ["چون هیچ brokerی از ack پشتیبانی نمی‌کند", "Because no broker supports acks"],
    ],
    a: [
      "این همان مسئله Two Generals است: فرستنده نمی‌تواند بین «پردازش نشد» و «پردازش شد ولی ack گم شد» تمایز قائل شود. در عمل exactly-once یعنی at-least-once delivery به‌علاوه پردازش idempotent (effectively-once).",
      "This is the Two Generals problem: the sender can't distinguish 'not processed' from 'processed but ack lost'. In practice exactly-once means at-least-once delivery plus idempotent processing (effectively-once).",
    ],
  },
  {
    id: "mq-s-kafka-eos-scope",
    level: "senior",
    tags: ["kafka", "transactions"],
    q: [
      "Exactly-once semantics در Kafka (transactions) دقیقاً چه چیزی را پوشش می‌دهد؟",
      "What exactly does Kafka's exactly-once semantics (transactions) cover?",
    ],
    options: [
      ["الگوی read-process-write درون Kafka: خواندن، نوشتن در topicها و commit offset به‌صورت اتمیک", "The read-process-write loop within Kafka: consuming, producing to topics and committing offsets atomically"],
      ["هر side effect خارجی مثل ارسال ایمیل یا فراخوانی API", "Any external side effect like sending email or calling an API"],
      ["نوشتن هم‌زمان در PostgreSQL و Kafka به‌صورت اتمیک", "Atomic writes to both PostgreSQL and Kafka"],
      ["تضمین اینکه consumer هر پیام را فقط یک بار poll می‌کند", "Ensuring a consumer polls each message only once"],
    ],
    a: [
      "Producer با `sendOffsetsToTransaction` offsetها را جزو تراکنش commit می‌کند و consumerهای `read_committed` فقط نتایج commit‌شده را می‌بینند. اثرات خارج از Kafka همچنان به idempotency نیاز دارند.",
      "The producer commits consumed offsets inside the transaction via `sendOffsetsToTransaction`, and `read_committed` consumers see only committed results. Effects outside Kafka still need idempotency.",
    ],
  },
  {
    id: "mq-s-idempotent-producer",
    level: "senior",
    tags: ["kafka", "producer"],
    q: [
      "Idempotent producer در Kafka (`enable.idempotence=true`) چگونه از پیام تکراری جلوگیری می‌کند؟",
      "How does Kafka's idempotent producer (`enable.idempotence=true`) prevent duplicates?",
    ],
    options: [
      ["Broker با producer ID و sequence number هر partition، retryهای تکراری را تشخیص و رد می‌کند", "The broker uses the producer ID and per-partition sequence numbers to detect and drop duplicate retries"],
      ["Producer قبل از ارسال، کل topic را برای پیام مشابه جستجو می‌کند", "The producer scans the whole topic for an identical message before sending"],
      ["Broker بر اساس hash محتوای پیام تکراری‌ها را حذف می‌کند", "The broker dedups based on a hash of message content"],
      ["Consumer پیام‌های تکراری را با key فیلتر می‌کند", "The consumer filters duplicates by key"],
    ],
    a: [
      "این مکانیزم فقط تکرارهای ناشی از retry شبکه در یک session producer را حذف می‌کند. اگر برنامه خودش دوباره `send` کند یا producer restart شود (بدون transactional.id)، پیام تکراری ممکن است.",
      "It only removes duplicates caused by network retries within one producer session. If the application calls `send` again or the producer restarts (without a transactional.id), duplicates can still occur.",
    ],
  },
  {
    id: "mq-s-min-isr",
    level: "senior",
    tags: ["kafka", "durability"],
    q: [
      "با `replication.factor=3`، `min.insync.replicas=2` و `acks=all`، اگر دو broker از سه از دسترس خارج شوند چه می‌شود؟",
      "With `replication.factor=3`, `min.insync.replicas=2` and `acks=all`, what happens if two of three brokers go down?",
    ],
    options: [
      ["نوشتن‌ها با خطای `NotEnoughReplicas` رد می‌شوند ولی داده commit‌شده از دست نمی‌رود", "Writes fail with `NotEnoughReplicas`, but committed data isn't lost"],
      ["نوشتن‌ها فقط با یک replica ادامه پیدا می‌کنند", "Writes continue with just one replica"],
      ["Kafka خودکار replicaهای جدید روی brokerهای دیگر می‌سازد و ادامه می‌دهد", "Kafka creates new replicas elsewhere and carries on"],
      ["Consumerها هم دیگر نمی‌توانند بخوانند", "Consumers can't read anymore either"],
    ],
    a: [
      "این ترکیب durability را بر availability نوشتن ترجیح می‌دهد: هر write حداقل روی دو replica تأیید می‌شود. خواندن از leader باقی‌مانده همچنان ممکن است.",
      "This combination favors durability over write availability: each write must be confirmed by at least two replicas. Reads from the remaining leader still work.",
    ],
  },
  {
    id: "mq-s-acks-all-without-minisr",
    level: "senior",
    tags: ["kafka", "durability"],
    q: [
      "چرا `acks=all` به‌تنهایی (با `min.insync.replicas=1`) durability کافی نمی‌دهد؟",
      "Why is `acks=all` alone (with `min.insync.replicas=1`) not enough for durability?",
    ],
    options: [
      ["اگر ISR فقط به leader کوچک شود، `acks=all` با تأیید یک replica برمی‌گردد و خرابی leader داده را از بین می‌برد", "If the ISR shrinks to just the leader, `acks=all` is satisfied by one replica and losing the leader loses data"],
      ["چون `acks=all` فقط روی consumer اعمال می‌شود", "Because `acks=all` applies only to consumers"],
      ["چون `acks=all` پیام‌ها را روی دیسک نمی‌نویسد", "Because `acks=all` doesn't write to disk"],
      ["چون `acks=all` فقط در حالت transactional کار می‌کند", "Because `acks=all` only works in transactional mode"],
    ],
    a: [
      "`acks=all` یعنی منتظر همه اعضای فعلی ISR، نه همه replicaها. `min.insync.replicas` حداقل اندازه ISR برای پذیرش write را تعیین می‌کند.",
      "`acks=all` waits for all current ISR members, not all replicas. `min.insync.replicas` sets the minimum ISR size required to accept writes.",
    ],
  },
  {
    id: "mq-s-isr",
    level: "senior",
    tags: ["kafka", "replication"],
    q: [
      "یک follower چه زمانی از ISR (in-sync replicas) خارج می‌شود؟",
      "When is a follower removed from the ISR (in-sync replicas)?",
    ],
    options: [
      ["وقتی بیش از `replica.lag.time.max.ms` نتواند به leader برسد", "When it fails to catch up with the leader for longer than `replica.lag.time.max.ms`"],
      ["وقتی تعداد consumerهایش از حد بیشتر شود", "When it has too many consumers"],
      ["هر بار که یک پیام جدید منتشر می‌شود", "Every time a new message is produced"],
      ["وقتی topic فشرده‌سازی شود", "When the topic is compacted"],
    ],
    a: [
      "Followerهایی که عقب می‌مانند از ISR حذف می‌شوند تا `acks=all` منتظرشان نماند. فقط اعضای ISR (در حالت پیش‌فرض) می‌توانند leader جدید شوند.",
      "Lagging followers drop out of the ISR so `acks=all` doesn't wait on them. By default only ISR members are eligible to become the new leader.",
    ],
  },
  {
    id: "mq-s-unclean-leader",
    level: "senior",
    tags: ["kafka", "replication"],
    q: [
      "فعال کردن `unclean.leader.election.enable=true` چه trade-offی دارد؟",
      "What trade-off does `unclean.leader.election.enable=true` make?",
    ],
    options: [
      ["Availability بالاتر به قیمت احتمال از دست رفتن پیام‌های commit‌شده", "Higher availability at the risk of losing committed messages"],
      ["Durability بالاتر به قیمت کاهش throughput", "Higher durability at the cost of throughput"],
      ["ترتیب سراسری به قیمت تأخیر بیشتر", "Global ordering at the cost of latency"],
      ["امنیت بیشتر به قیمت مصرف CPU", "Better security at the cost of CPU"],
    ],
    a: [
      "اگر همه اعضای ISR از دست بروند، یک replica عقب‌مانده می‌تواند leader شود و پیام‌هایی که فقط روی ISR قبلی بودند حذف می‌شوند. پیش‌فرض این گزینه `false` است.",
      "If all ISR members are lost, an out-of-sync replica may become leader, truncating messages that existed only on the old ISR. The default is `false`.",
    ],
  },
  {
    id: "mq-s-max-in-flight-ordering",
    level: "senior",
    tags: ["kafka", "ordering"],
    q: [
      "در producer کافکا بدون idempotence، چرا `max.in.flight.requests.per.connection > 1` همراه با retry می‌تواند ترتیب را به هم بزند؟",
      "On a Kafka producer without idempotence, why can `max.in.flight.requests.per.connection > 1` with retries break ordering?",
    ],
    options: [
      ["Batch اول شکست می‌خورد و retry می‌شود در حالی که batch دوم موفق شده، پس batch دوم زودتر نوشته می‌شود", "Batch 1 fails and is retried while batch 2 succeeds, so batch 2 is written first"],
      ["چون broker batchها را به ترتیب اندازه مرتب می‌کند", "Because the broker sorts batches by size"],
      ["چون هر request به partition تصادفی می‌رود", "Because each request goes to a random partition"],
      ["چون consumer batchها را موازی می‌خواند", "Because the consumer reads batches in parallel"],
    ],
    a: [
      "با idempotence فعال، broker با sequence number ترتیب را تا ۵ request هم‌زمان حفظ می‌کند. بدون آن، برای ترتیب سخت باید این مقدار را ۱ گذاشت که throughput را کم می‌کند.",
      "With idempotence on, the broker uses sequence numbers to keep order with up to 5 in-flight requests. Without it, strict ordering requires setting this to 1, which hurts throughput.",
    ],
  },
  {
    id: "mq-s-zombie-fencing",
    level: "senior",
    tags: ["kafka", "transactions"],
    q: [
      "در Kafka، `transactional.id` چگونه از producerهای zombie جلوگیری می‌کند؟",
      "In Kafka, how does `transactional.id` protect against zombie producers?",
    ],
    options: [
      ["با هر `initTransactions` یک epoch جدید ثبت می‌شود و broker درخواست‌های epoch قدیمی را رد می‌کند", "Each `initTransactions` bumps an epoch and the broker rejects requests from older epochs"],
      ["Producerهای قدیمی بعد از ۵ دقیقه خودکار حذف می‌شوند", "Old producers are auto-removed after 5 minutes"],
      ["Broker آدرس IP producer قبلی را block می‌کند", "The broker blocks the old producer's IP"],
      ["Consumerها پیام‌های producer قدیمی را با timestamp فیلتر می‌کنند", "Consumers filter the old producer's messages by timestamp"],
    ],
    a: [
      "اگر instance قدیمی (مثلاً بعد از GC pause طولانی) برگردد و بخواهد بنویسد، با `ProducerFencedException` رد می‌شود. این fencing برای جلوگیری از نوشتن دوگانه حیاتی است.",
      "If an old instance comes back (e.g. after a long GC pause) and tries to write, it gets a `ProducerFencedException`. This fencing is essential to prevent double writes.",
    ],
  },
  {
    id: "mq-s-read-committed",
    level: "senior",
    tags: ["kafka", "transactions"],
    q: [
      "Consumer با `isolation.level=read_uncommitted` (پیش‌فرض) در کنار producer تراکنشی چه چیزی را می‌بیند؟",
      "With `isolation.level=read_uncommitted` (the default), what does a consumer see alongside a transactional producer?",
    ],
    options: [
      ["پیام‌های تراکنش‌های abort‌شده و در جریان را هم می‌بیند", "It also sees messages from aborted and in-flight transactions"],
      ["فقط پیام‌های commit‌شده را می‌بیند", "Only committed messages"],
      ["هیچ پیامی از producer تراکنشی نمی‌بیند", "No messages from transactional producers"],
      ["فقط control markerها را می‌بیند", "Only control markers"],
    ],
    a: [
      "برای exactly-once، consumer پایین‌دستی باید `read_committed` باشد. در این حالت تا Last Stable Offset می‌خواند و پیام‌های abort‌شده را کنار می‌گذارد.",
      "For exactly-once, downstream consumers must use `read_committed`. They then read up to the Last Stable Offset and skip aborted messages.",
    ],
  },
  {
    id: "mq-s-hot-partition",
    level: "senior",
    tags: ["kafka", "partitioning"],
    q: [
      "۸۰ درصد ترافیک متعلق به یک مشتری بزرگ است و `customerId` به‌عنوان partition key استفاده می‌شود. مشکل و راه‌حل چیست؟",
      "80% of traffic comes from one big customer and `customerId` is the partition key. What's the problem and a fix?",
    ],
    options: [
      ["Hot partition ایجاد می‌شود؛ key ریزدانه‌تر (مثل `customerId:orderId`) اگر ترتیب فقط در آن سطح لازم است", "A hot partition forms; use a finer key (like `customerId:orderId`) if ordering is only needed at that level"],
      ["مشکلی نیست چون Kafka خودکار بار را بین partitionها پخش می‌کند", "No problem, Kafka rebalances load across partitions automatically"],
      ["باید replication factor را افزایش داد", "Increase the replication factor"],
      ["باید auto-commit را فعال کرد", "Enable auto-commit"],
    ],
    a: [
      "Key skew باعث می‌شود یک partition و consumerش گلوگاه شوند و افزودن partition کمکی نکند. انتخاب key یک trade-off بین دامنه ترتیب و موازی‌سازی است.",
      "Key skew makes one partition and its consumer a bottleneck that more partitions won't fix. Key choice trades ordering scope against parallelism.",
    ],
  },
  {
    id: "mq-s-head-of-line",
    level: "senior",
    tags: ["kafka", "ordering", "poison-message"],
    q: [
      "در یک partition مرتب، یک پیام خراب پردازش را متوقف کرده است. اگر ترتیب per-key حیاتی باشد، بهترین راهبرد چیست؟",
      "In an ordered partition, one bad message blocks processing. If per-key order is critical, what's the best strategy?",
    ],
    options: [
      ["Park کردن آن پیام و همه پیام‌های بعدی همان key، در حالی که بقیه keyها ادامه پیدا می‌کنند", "Park that message and all later messages for the same key while other keys continue"],
      ["Skip کردن پیام و ادامه پردازش پیام‌های بعدی همان key", "Skip it and keep processing later messages for that key"],
      ["متوقف کردن کل consumer تا رفع دستی مشکل، برای همه keyها", "Stop the whole consumer for all keys until manual fixing"],
      ["Restart کردن broker", "Restart the broker"],
    ],
    a: [
      "Skip کردن ترتیب آن key را می‌شکند و توقف کامل head-of-line blocking برای همه keyها ایجاد می‌کند. نگه داشتن مجموعه keyهای park‌شده تا رفع مشکل، هر دو را متعادل می‌کند.",
      "Skipping breaks that key's order, and stopping everything causes head-of-line blocking for all keys. Tracking a set of parked keys until resolved balances both.",
    ],
  },
  {
    id: "mq-s-parallel-within-partition",
    level: "senior",
    tags: ["kafka", "scaling"],
    q: [
      "چگونه می‌توان throughput یک consumer کافکا را فراتر از تعداد partitionها برد، با حفظ ترتیب per-key؟",
      "How can a Kafka consumer exceed partition-count parallelism while preserving per-key order?",
    ],
    options: [
      ["پردازش موازی پیام‌ها بر اساس key درون یک partition و commit فقط تا پایین‌ترین offset کامل‌شده", "Process messages in parallel by key within a partition and commit only up to the lowest fully completed offset"],
      ["Commit کردن offset هر پیام به‌محض شروع پردازش", "Commit each message's offset as soon as processing starts"],
      ["چند consumer group روی یک topic برای تقسیم کار", "Use multiple consumer groups on one topic to split work"],
      ["فعال کردن auto-commit با interval کوتاه", "Enable auto-commit with a short interval"],
    ],
    a: [
      "کتابخانه‌هایی مثل Confluent Parallel Consumer همین کار را انجام می‌دهند. چون offset خطی است، نمی‌توان از پیامی که هنوز در حال پردازش است جلوتر commit کرد بدون ریسک از دست رفتن.",
      "Libraries like Confluent Parallel Consumer do exactly this. Since offsets are linear, you can't commit past an in-flight message without risking loss.",
    ],
  },
  {
    id: "mq-s-cooperative-rebalance",
    level: "senior",
    tags: ["kafka", "consumer-groups"],
    q: [
      "مزیت cooperative incremental rebalancing نسبت به eager rebalancing چیست؟",
      "What's the benefit of cooperative incremental rebalancing over eager rebalancing?",
    ],
    options: [
      ["فقط partitionهایی که جابه‌جا می‌شوند revoke می‌شوند و بقیه consumerها بدون توقف ادامه می‌دهند", "Only partitions that move are revoked; others keep consuming without a stop-the-world pause"],
      ["Rebalance هرگز رخ نمی‌دهد", "Rebalances never happen"],
      ["ترتیب سراسری بین partitionها حفظ می‌شود", "Global ordering across partitions is preserved"],
      ["Offsetها دیگر نیازی به commit ندارند", "Offsets no longer need committing"],
    ],
    a: [
      "در eager همه partitionها از همه اعضا گرفته و دوباره تقسیم می‌شوند. `CooperativeStickyAssignor` در چند مرحله فقط بخش لازم را منتقل می‌کند و همراه static membership (`group.instance.id`) اختلال deploy را کم می‌کند.",
      "Eager revokes every partition from every member and reassigns. `CooperativeStickyAssignor` moves only what's needed over multiple rounds, and with static membership (`group.instance.id`) reduces deploy disruption.",
    ],
  },
  {
    id: "mq-s-rebalance-commit",
    level: "senior",
    tags: ["kafka", "consumer-groups"],
    q: [
      "برای جلوگیری از پردازش تکراری هنگام rebalance، consumer باید در `onPartitionsRevoked` چه کاری انجام دهد؟",
      "To limit duplicate processing during rebalance, what should a consumer do in `onPartitionsRevoked`?",
    ],
    options: [
      ["پردازش جاری را تمام و offsetهای پردازش‌شده را همگام commit کند", "Finish in-flight work and synchronously commit processed offsets"],
      ["همه offsetها را به ابتدا reset کند", "Reset all offsets to the beginning"],
      ["Consumer را بلافاصله ببندد بدون commit", "Close immediately without committing"],
      ["پیام‌های جاری را به topic دیگری بفرستد", "Forward in-flight messages to another topic"],
    ],
    a: [
      "پس از revoke، partition به consumer دیگری می‌رسد که از آخرین offset commit‌شده شروع می‌کند. Commit نهایی در این callback پنجره تکرار را کوچک می‌کند، هرچند idempotency همچنان لازم است.",
      "After revocation, the partition goes to another consumer starting at the last committed offset. A final commit in this callback shrinks the duplicate window, though idempotency is still required.",
    ],
  },
  {
    id: "mq-s-compaction-tombstone",
    level: "senior",
    tags: ["kafka", "compaction"],
    q: [
      "در یک topic compact‌شده، چرا consumerی که خیلی دیر شروع کند ممکن است حذف یک key را هرگز نبیند؟",
      "In a compacted topic, why might a very late consumer never observe a key's deletion?",
    ],
    options: [
      ["Tombstoneها پس از `delete.retention.ms` حذف می‌شوند و key کاملاً از log پاک می‌شود", "Tombstones are removed after `delete.retention.ms`, erasing the key from the log entirely"],
      ["Tombstoneها هرگز به consumerها تحویل داده نمی‌شوند", "Tombstones are never delivered to consumers"],
      ["Compaction پیام‌های با value `null` را رمزنگاری می‌کند", "Compaction encrypts `null`-valued messages"],
      ["Tombstoneها فقط به consumer group اول می‌رسند", "Tombstones reach only the first consumer group"],
    ],
    a: [
      "Consumerی که state محلی ساخته و بعد از این بازه از offset قدیمی ادامه می‌دهد، رکورد قدیمی را نگه می‌دارد. برای همین bootstrap از ابتدا یا `delete.retention.ms` کافی اهمیت دارد.",
      "A consumer with local state that resumes from an old offset after this window will keep the stale record. Hence bootstrapping from the start or a long enough `delete.retention.ms` matters.",
    ],
  },
  {
    id: "mq-s-retention-vs-compaction",
    level: "senior",
    tags: ["kafka", "retention"],
    q: [
      "برای topicی که باید هم آخرین وضعیت هر entity را نگه دارد و هم رویدادهای قدیمی‌تر از ۳۰ روز را دور بریزد، کدام تنظیم مناسب است؟",
      "For a topic that should keep each entity's latest state but drop anything older than 30 days, which setting fits?",
    ],
    options: [
      ["`cleanup.policy=compact,delete` با `retention.ms` برابر ۳۰ روز", "`cleanup.policy=compact,delete` with `retention.ms` of 30 days"],
      ["فقط `cleanup.policy=compact`", "Only `cleanup.policy=compact`"],
      ["فقط `cleanup.policy=delete` بدون retention", "Only `cleanup.policy=delete` with no retention"],
      ["`min.insync.replicas=30`", "`min.insync.replicas=30`"],
    ],
    a: [
      "ترکیب دو policy باعث می‌شود نسخه‌های قدیمی هر key compact شوند و segmentهای قدیمی‌تر از retention هم حذف شوند. توجه کنید که حتی آخرین مقدار یک key اگر قدیمی‌تر از retention باشد حذف می‌شود.",
      "Combining both compacts older versions per key and also deletes segments older than retention. Note that even a key's latest value is removed once it's older than retention.",
    ],
  },
  {
    id: "mq-s-event-sourcing",
    level: "senior",
    tags: ["event-sourcing"],
    q: [
      "در event sourcing، منبع حقیقت (source of truth) چیست؟",
      "In event sourcing, what is the source of truth?",
    ],
    options: [
      ["دنباله تغییرناپذیر رویدادها؛ وضعیت فعلی با replay آن‌ها ساخته می‌شود", "The immutable sequence of events; current state is derived by replaying them"],
      ["آخرین snapshot جدول اصلی که با UPDATE به‌روز می‌شود", "The latest row in a table updated in place"],
      ["کش Redis که وضعیت فعلی را نگه می‌دارد", "A Redis cache holding current state"],
      ["لاگ‌های اپلیکیشن", "Application logs"],
    ],
    a: [
      "هر تغییر به‌صورت رویداد append می‌شود و هرگز ویرایش نمی‌شود. این audit کامل و امکان بازسازی وضعیت در هر زمان را می‌دهد، ولی پیچیدگی versioning و projectionها را اضافه می‌کند.",
      "Every change is appended as an event and never edited. This gives a full audit trail and time-travel rebuilds, at the cost of event versioning and projection complexity.",
    ],
  },
  {
    id: "mq-s-snapshots",
    level: "senior",
    tags: ["event-sourcing"],
    q: [
      "چرا در event sourcing از snapshot استفاده می‌شود؟",
      "Why are snapshots used in event sourcing?",
    ],
    options: [
      ["تا برای بارگذاری aggregate لازم نباشد همه رویدادها از ابتدا replay شوند", "To avoid replaying every event from the start when loading an aggregate"],
      ["تا رویدادهای قدیمی حذف شوند و منبع حقیقت snapshot شود", "To delete old events and make the snapshot the source of truth"],
      ["تا رویدادها رمزنگاری شوند", "To encrypt events"],
      ["تا ترتیب رویدادها تغییر کند", "To reorder events"],
    ],
    a: [
      "Snapshot یک بهینه‌سازی است: وضعیت در version N ذخیره و فقط رویدادهای بعد از آن replay می‌شوند. رویدادها همچنان منبع حقیقت‌اند و snapshot قابل بازسازی است.",
      "A snapshot is an optimization: state at version N is stored and only later events replayed. Events remain the source of truth and snapshots can be rebuilt.",
    ],
  },
  {
    id: "mq-s-optimistic-concurrency-es",
    level: "senior",
    tags: ["event-sourcing", "concurrency"],
    q: [
      "در event store، دو درخواست هم‌زمان می‌خواهند به یک aggregate رویداد اضافه کنند. روش رایج جلوگیری از تناقض چیست؟",
      "In an event store, two concurrent requests append to the same aggregate. What's the common way to prevent conflicts?",
    ],
    options: [
      ["Optimistic concurrency با expected version؛ append در صورت تغییر version شکست می‌خورد", "Optimistic concurrency with an expected version; the append fails if the version changed"],
      ["قفل سراسری روی کل event store", "A global lock on the entire event store"],
      ["پذیرفتن هر دو و merge خودکار رویدادها", "Accept both and auto-merge the events"],
      ["فقط درخواست اول را با timestamp انتخاب کردن بعد از ذخیره هر دو", "Store both, then keep the earliest by timestamp"],
    ],
    a: [
      "Writer نسخه‌ای را که خوانده اعلام می‌کند و store فقط اگر نسخه فعلی همان باشد append می‌کند. درخواست بازنده دوباره بارگذاری و تصمیم‌گیری می‌کند.",
      "The writer states the version it read and the store appends only if it's still current. The losing request reloads and re-decides.",
    ],
  },
  {
    id: "mq-s-cqrs-read-your-writes",
    level: "senior",
    tags: ["cqrs", "consistency"],
    q: [
      "در CQRS، کاربر بعد از ثبت سفارش، آن را در لیست سفارش‌ها نمی‌بیند. علت و راه‌حل رایج چیست؟",
      "In CQRS, a user places an order but doesn't see it in their order list. Cause and common fix?",
    ],
    options: [
      ["Read model هنوز eventual consistent است؛ برگرداندن version و صبر یا نمایش optimistic در UI", "The read model is eventually consistent; return a version and wait for it, or show it optimistically in the UI"],
      ["Command شکست خورده و باید دوباره ارسال شود", "The command failed and must be resent"],
      ["Read model باید حذف شود و از write model خوانده شود", "Delete the read model and always read from the write model"],
      ["باید auto-ack را در consumer projection فعال کرد", "Enable auto-ack in the projection consumer"],
    ],
    a: [
      "Projection با تأخیر رویداد را اعمال می‌کند. راه‌حل‌ها شامل برگرداندن position رویداد و انتظار تا رسیدن projection به آن، یا به‌روزرسانی optimistic سمت کلاینت است.",
      "The projection applies the event with some lag. Fixes include returning the event position and waiting until the projection catches up, or optimistic client-side updates.",
    ],
  },
  {
    id: "mq-s-outbox-relay-ordering",
    level: "senior",
    tags: ["outbox", "ordering"],
    q: [
      "در relay مبتنی بر polling جدول outbox با چند instance، چه مشکلی برای ترتیب رویدادها پیش می‌آید و چگونه حل می‌شود؟",
      "With multiple instances polling an outbox table, what ordering problem arises and how is it addressed?",
    ],
    options: [
      ["Instanceها ممکن است رویدادهای یک aggregate را خارج از ترتیب منتشر کنند؛ با تقسیم بر اساس aggregate یا یک leader و `FOR UPDATE SKIP LOCKED`", "Instances may publish one aggregate's events out of order; partition work by aggregate or use one leader and `FOR UPDATE SKIP LOCKED`"],
      ["هیچ مشکلی نیست چون دیتابیس ترتیب را تضمین می‌کند", "No problem, the database guarantees order"],
      ["رویدادها هرگز تکراری نمی‌شوند پس ترتیب مهم نیست", "Events are never duplicated, so order doesn't matter"],
      ["باید outbox را حذف و مستقیم به broker نوشت", "Remove the outbox and write directly to the broker"],
    ],
    a: [
      "`SKIP LOCKED` از پردازش هم‌زمان یک ردیف جلوگیری می‌کند ولی به‌تنهایی ترتیب per-aggregate را حفظ نمی‌کند. همچنین ID افزایشی یا sequence ممکن است به ترتیب commit تراکنش‌ها نباشد.",
      "`SKIP LOCKED` prevents two relays grabbing the same row but alone doesn't preserve per-aggregate order. Also, auto-increment IDs may not match transaction commit order.",
    ],
  },
  {
    id: "mq-s-cdc-debezium",
    level: "senior",
    tags: ["cdc", "outbox"],
    q: [
      "مزیت استفاده از CDC (مثل Debezium) برای انتشار رویدادهای outbox نسبت به polling چیست؟",
      "What's the advantage of CDC (e.g. Debezium) over polling for publishing outbox events?",
    ],
    options: [
      ["تغییرات را از transaction log دیتابیس (مثل WAL یا binlog) به ترتیب commit و با تأخیر کم می‌خواند", "It reads changes from the DB transaction log (WAL or binlog) in commit order with low latency"],
      ["تضمین می‌کند هر رویداد دقیقاً یک بار به consumer برسد", "It guarantees each event reaches consumers exactly once"],
      ["نیاز به جدول outbox را حذف می‌کند و dual-write را مجاز می‌کند", "It removes the outbox table and makes dual-writes safe"],
      ["بدون هیچ دسترسی خاصی به دیتابیس کار می‌کند", "It works without any special database access"],
    ],
    a: [
      "Debezium به‌عنوان Kafka Connect source از replication slot یا binlog می‌خواند و بار polling روی جداول را حذف می‌کند. همچنان تحویل at-least-once است و Outbox Event Router می‌تواند ردیف‌ها را به topic مناسب route کند.",
      "Debezium runs as a Kafka Connect source reading the replication slot or binlog, removing polling load. Delivery is still at-least-once, and its Outbox Event Router routes rows to the right topic.",
    ],
  },
  {
    id: "mq-s-cdc-raw-tables",
    level: "senior",
    tags: ["cdc", "architecture"],
    q: [
      "عیب اصلی انتشار مستقیم تغییرات جداول داخلی با CDC (بدون outbox) به سرویس‌های دیگر چیست؟",
      "What's the main downside of publishing raw internal table changes via CDC (without an outbox) to other services?",
    ],
    options: [
      ["Schema داخلی دیتابیس به قرارداد عمومی تبدیل می‌شود و هر refactor مصرف‌کننده‌ها را می‌شکند", "The internal DB schema becomes a public contract, so any refactor breaks consumers"],
      ["CDC روی جداول عادی کار نمی‌کند", "CDC doesn't work on regular tables"],
      ["رویدادها همیشه گم می‌شوند", "Events are always lost"],
      ["CDC فقط روی MongoDB کار می‌کند", "CDC only works on MongoDB"],
    ],
    a: [
      "تغییرات سطح ردیف معنای دامنه ندارند و جزئیات پیاده‌سازی را نشت می‌دهند. Outbox امکان طراحی integration eventهای پایدار و مستقل از schema داخلی را می‌دهد.",
      "Row-level changes lack domain meaning and leak implementation details. An outbox lets you design stable integration events decoupled from the internal schema.",
    ],
  },
  {
    id: "mq-s-2pc-drawbacks",
    level: "senior",
    tags: ["distributed-transactions"],
    q: [
      "چرا معمولاً از two-phase commit (XA) بین دیتابیس و message broker در میکروسرویس‌ها پرهیز می‌شود؟",
      "Why is two-phase commit (XA) between a database and a broker usually avoided in microservices?",
    ],
    options: [
      ["Coordinator نقطه blocking است، throughput کم می‌شود و بسیاری از brokerهای مدرن از XA پشتیبانی نمی‌کنند", "The coordinator is a blocking point, throughput drops, and many modern brokers don't support XA"],
      ["2PC ترتیب پیام‌ها را تضمین نمی‌کند", "2PC doesn't guarantee message order"],
      ["2PC فقط روی NoSQL کار می‌کند", "2PC only works on NoSQL"],
      ["2PC اجازه rollback نمی‌دهد", "2PC doesn't allow rollback"],
    ],
    a: [
      "اگر coordinator بعد از prepare از کار بیفتد، شرکت‌کنندگان در وضعیت نامعلوم با قفل باز می‌مانند. Kafka و SQS از XA پشتیبانی نمی‌کنند؛ outbox و saga جایگزین‌های رایج‌اند.",
      "If the coordinator dies after prepare, participants stay in doubt holding locks. Kafka and SQS don't support XA; outbox and sagas are the common alternatives.",
    ],
  },
  {
    id: "mq-s-saga",
    level: "senior",
    tags: ["saga"],
    q: [
      "الگوی saga چگونه consistency را در تراکنش‌های چندسرویسی حفظ می‌کند؟",
      "How does the saga pattern maintain consistency across multiple services?",
    ],
    options: [
      ["دنباله‌ای از تراکنش‌های محلی که در صورت شکست، با compensating transaction اثر مراحل قبلی را خنثی می‌کند", "A sequence of local transactions where failures trigger compensating transactions to undo earlier steps"],
      ["یک تراکنش ACID سراسری روی همه دیتابیس‌ها", "A single global ACID transaction across all databases"],
      ["قفل کردن همه منابع تا پایان کل فرایند", "Locking all resources until the whole process ends"],
      ["تکرار هر مرحله تا موفقیت بدون هیچ rollback", "Retrying every step until success with no rollback"],
    ],
    a: [
      "Saga اتمیک بودن سراسری ندارد و فقط eventual consistency می‌دهد. Compensation یک rollback واقعی نیست بلکه یک عمل معنایی معکوس است، مثل refund به‌جای حذف پرداخت.",
      "A saga isn't globally atomic and only offers eventual consistency. Compensation isn't a real rollback but a semantic reverse action, like a refund instead of deleting a payment.",
    ],
  },
  {
    id: "mq-s-choreography-vs-orchestration",
    level: "senior",
    tags: ["saga", "architecture"],
    q: [
      "مهم‌ترین trade-off بین saga از نوع choreography و orchestration چیست؟",
      "What's the key trade-off between choreography and orchestration sagas?",
    ],
    options: [
      ["Choreography coupling کمتری دارد ولی دنبال کردن جریان سخت است؛ orchestration جریان را متمرکز و قابل مشاهده می‌کند ولی یک coordinator اضافه می‌کند", "Choreography is loosely coupled but hard to trace; orchestration centralizes and clarifies flow but adds a coordinator"],
      ["Orchestration نیازی به پیام‌رسانی ندارد", "Orchestration needs no messaging"],
      ["Choreography از compensation پشتیبانی نمی‌کند", "Choreography doesn't support compensation"],
      ["Orchestration فقط با Kafka و choreography فقط با RabbitMQ کار می‌کند", "Orchestration only works with Kafka, choreography only with RabbitMQ"],
    ],
    a: [
      "در choreography هر سرویس به رویدادها واکنش نشان می‌دهد و با رشد مراحل ممکن است وابستگی‌های چرخه‌ای پنهان ایجاد شود. Orchestrator (مثل Temporal یا Step Functions) state ماشین saga را صریح نگه می‌دارد.",
      "In choreography each service reacts to events, and as steps grow hidden cyclic dependencies can emerge. An orchestrator (like Temporal or Step Functions) keeps the saga state machine explicit.",
    ],
  },
  {
    id: "mq-s-compensation-idempotent",
    level: "senior",
    tags: ["saga", "idempotency"],
    q: [
      "چرا compensating transactionها باید idempotent و retryable باشند؟",
      "Why must compensating transactions be idempotent and retryable?",
    ],
    options: [
      ["چون شکست compensation راه بازگشت دیگری ندارد و ممکن است چند بار تحویل داده شود", "Because a failed compensation has no further fallback and it may be delivered multiple times"],
      ["چون compensation همیشه sync اجرا می‌شود", "Because compensations always run synchronously"],
      ["چون compensation فقط یک بار امکان اجرا دارد", "Because a compensation can only ever run once"],
      ["چون compensation داده را رمزنگاری می‌کند", "Because compensations encrypt data"],
    ],
    a: [
      "Compensation باید در نهایت موفق شود، پس تا موفقیت retry می‌شود و همین ممکن است تکرار ایجاد کند. همچنین ممکن است compensation قبل از خود عملیات اصلی برسد که باید درست مدیریت شود.",
      "A compensation must eventually succeed, so it's retried until it does, which can cause duplicates. It may even arrive before the original action, which must be handled correctly.",
    ],
  },
  {
    id: "mq-s-saga-isolation",
    level: "senior",
    tags: ["saga", "consistency"],
    q: [
      "Saga فاقد isolation است. کدام تکنیک برای کاهش anomalyهایی مثل dirty read استفاده می‌شود؟",
      "Sagas lack isolation. Which technique mitigates anomalies like dirty reads?",
    ],
    options: [
      ["Semantic lock، مثلاً وضعیت `PENDING` روی رکورد تا پایان saga", "A semantic lock, e.g. a `PENDING` status on the record until the saga completes"],
      ["استفاده از auto-ack در همه consumerها", "Using auto-ack on every consumer"],
      ["افزایش تعداد partitionها", "Increasing the partition count"],
      ["حذف همه compensating transactionها", "Removing all compensating transactions"],
    ],
    a: [
      "چون تراکنش‌های محلی قبل از پایان saga commit می‌شوند، بقیه می‌توانند داده نیمه‌کاره را ببینند. Semantic lock، commutative updates و مرتب‌سازی مراحل (pivot transaction) از countermeasureهای رایج‌اند.",
      "Because local transactions commit before the saga ends, others can see partial data. Semantic locks, commutative updates and step ordering around a pivot transaction are common countermeasures.",
    ],
  },
  {
    id: "mq-s-pivot-transaction",
    level: "senior",
    tags: ["saga"],
    q: [
      "در saga، «pivot transaction» چیست؟",
      "In a saga, what is a 'pivot transaction'?",
    ],
    options: [
      ["نقطه بدون بازگشت؛ اگر موفق شود، مراحل بعدی فقط retryable هستند و compensation نمی‌شوند", "The point of no return; once it succeeds, later steps are only retried, never compensated"],
      ["اولین مرحله saga که همیشه compensatable است", "The first saga step, which is always compensatable"],
      ["تراکنشی که کل saga را rollback می‌کند", "A transaction that rolls back the whole saga"],
      ["مرحله‌ای که پیام‌ها را به DLQ می‌فرستد", "A step that sends messages to the DLQ"],
    ],
    a: [
      "مراحل قبل از pivot قابل compensation هستند و مراحل بعد از آن باید حتماً در نهایت موفق شوند. قرار دادن عملیات غیرقابل‌برگشت (مثل شارژ کارت) در pivot طراحی را ساده می‌کند.",
      "Steps before the pivot are compensatable and steps after must eventually succeed. Placing irreversible actions (like charging a card) at the pivot simplifies the design.",
    ],
  },
  {
    id: "mq-s-inbox-pattern",
    level: "senior",
    tags: ["idempotency", "inbox"],
    q: [
      "الگوی inbox در کنار outbox چه مشکلی را حل می‌کند؟",
      "What problem does the inbox pattern solve alongside the outbox?",
    ],
    options: [
      ["Consumer شناسه پیام دریافتی را در همان تراکنش اثر تجاری ثبت می‌کند تا تکراری‌ها نادیده گرفته شوند", "The consumer records the incoming message ID in the same transaction as its effect, so duplicates are ignored"],
      ["پیام‌ها را قبل از ارسال در producer بافر می‌کند", "It buffers messages in the producer before sending"],
      ["ترتیب سراسری بین همه سرویس‌ها را تضمین می‌کند", "It guarantees global order across services"],
      ["نیاز به broker را حذف می‌کند", "It removes the need for a broker"],
    ],
    a: [
      "Outbox انتشار مطمئن (at-least-once) را تضمین می‌کند و inbox مصرف effectively-once را. ترکیب این دو جایگزین عملی exactly-once سرتاسری است.",
      "The outbox ensures reliable (at-least-once) publishing and the inbox ensures effectively-once consumption. Together they're the practical end-to-end substitute for exactly-once.",
    ],
  },
  {
    id: "mq-s-out-of-order-events",
    level: "senior",
    tags: ["ordering", "consistency"],
    q: [
      "Consumer ممکن است `CustomerUpdated` نسخه ۵ را قبل از نسخه ۴ دریافت کند. امن‌ترین رویکرد چیست؟",
      "A consumer may receive `CustomerUpdated` v5 before v4. What's the safest approach?",
    ],
    options: [
      ["ذخیره version هر entity و نادیده گرفتن رویدادهایی با version کمتر یا مساوی", "Store each entity's version and ignore events with a lower or equal version"],
      ["اعمال رویدادها به ترتیب رسیدن", "Apply events in arrival order"],
      ["مرتب کردن بر اساس timestamp ساعت consumer", "Sort by the consumer's wall-clock timestamp"],
      ["دور ریختن همه رویدادها و فقط polling سرویس مبدأ", "Discard events and only poll the source service"],
    ],
    a: [
      "یک شماره version یا sequence افزایشی از مبدأ، conditional update مثل `WHERE version < :v` را ممکن می‌کند. ساعت‌های سیستم‌های مختلف skew دارند و برای ترتیب قابل اعتماد نیستند.",
      "A monotonically increasing version from the source enables conditional updates like `WHERE version < :v`. Clocks across machines skew and aren't reliable for ordering.",
    ],
  },
  {
    id: "mq-s-global-ordering-cost",
    level: "senior",
    tags: ["ordering", "scaling"],
    q: [
      "هزینه نیاز به ترتیب سراسری (total order) روی همه پیام‌های یک topic در Kafka چیست؟",
      "What's the cost of requiring total ordering across all messages of a Kafka topic?",
    ],
    options: [
      ["باید از یک partition استفاده کرد و موازی‌سازی مصرف به یک consumer محدود می‌شود", "You need a single partition, limiting consumption to one consumer"],
      ["Kafka به‌طور پیش‌فرض ترتیب سراسری دارد و هزینه‌ای ندارد", "Kafka has total ordering by default at no cost"],
      ["باید replication را غیرفعال کرد", "You must disable replication"],
      ["باید retention را صفر کرد", "You must set retention to zero"],
    ],
    a: [
      "Kafka فقط ترتیب درون partition را تضمین می‌کند. معمولاً ترتیب per-entity کافی است و با partition key به دست می‌آید، که مقیاس‌پذیری را حفظ می‌کند.",
      "Kafka only orders within a partition. Per-entity ordering via a partition key is usually sufficient and keeps scalability.",
    ],
  },
  {
    id: "mq-s-schema-full-compat",
    level: "senior",
    tags: ["schema", "compatibility"],
    q: [
      "اگر consumerها قبل از producerها upgrade شوند، کدام حالت سازگاری schema لازم است؟",
      "If consumers are upgraded before producers, which schema compatibility mode is required?",
    ],
    options: [
      ["BACKWARD: schema جدید باید داده نوشته‌شده با schema قبلی را بخواند", "BACKWARD: the new schema must read data written with the previous one"],
      ["FORWARD: schema قدیمی باید داده schema جدید را بخواند", "FORWARD: the old schema must read data written with the new one"],
      ["NONE: هیچ بررسی لازم نیست", "NONE: no check is needed"],
      ["فقط باید نام topic را عوض کرد", "Just rename the topic"],
    ],
    a: [
      "Consumer جدید هنوز پیام‌های producer قدیمی را می‌خواند، پس backward لازم است. اگر producerها اول upgrade شوند، forward لازم است و FULL هر دو را تضمین می‌کند.",
      "Upgraded consumers still read old producers' messages, so backward compatibility is needed. If producers upgrade first, you need forward; FULL guarantees both.",
    ],
  },
  {
    id: "mq-s-breaking-change",
    level: "senior",
    tags: ["schema", "versioning"],
    q: [
      "برای یک تغییر breaking در ساختار یک رویداد پرمصرف، رویکرد امن چیست؟",
      "What's a safe approach for a breaking change to a widely consumed event?",
    ],
    options: [
      ["انتشار موازی نسخه جدید در topic یا type جدید (مثل `OrderPlaced.v2`) و مهاجرت تدریجی consumerها", "Publish the new version in parallel on a new topic or type (like `OrderPlaced.v2`) and migrate consumers gradually"],
      ["تغییر مستقیم schema و restart هم‌زمان همه سرویس‌ها", "Change the schema in place and restart every service at once"],
      ["خاموش کردن compatibility check در Schema Registry", "Disable compatibility checks in the Schema Registry"],
      ["حذف topic قدیمی و ساختن دوباره با همان نام", "Delete the old topic and recreate it with the same name"],
    ],
    a: [
      "Deploy هم‌زمان همه سرویس‌ها در سیستم توزیع‌شده عملاً ممکن نیست. انتشار دوگانه برای یک دوره گذار به consumerها اجازه مهاجرت مستقل می‌دهد؛ upcasting در consumer هم گزینه‌ای برای event sourcing است.",
      "Lockstep deploys across a distributed system aren't realistic. Dual publishing for a transition period lets consumers migrate independently; consumer-side upcasting is another option in event sourcing.",
    ],
  },
  {
    id: "mq-s-gdpr-event-log",
    level: "senior",
    tags: ["event-sourcing", "compliance"],
    q: [
      "در یک event log تغییرناپذیر، چگونه درخواست حذف داده شخصی (GDPR) را برآورده می‌کنید؟",
      "In an immutable event log, how do you honor a personal-data deletion (GDPR) request?",
    ],
    options: [
      ["Crypto-shredding: رمزنگاری داده شخصی با کلید per-user و حذف کلید", "Crypto-shredding: encrypt personal data with a per-user key and delete the key"],
      ["ویرایش مستقیم رویدادها در log", "Edit the events in place in the log"],
      ["هیچ راهی نیست؛ event sourcing با GDPR ناسازگار است", "There's no way; event sourcing is incompatible with GDPR"],
      ["افزودن رویداد `UserDeleted` کافی است و داده قدیمی می‌ماند", "Appending a `UserDeleted` event is enough, old data can stay"],
    ],
    a: [
      "با حذف کلید، داده رمزشده در همه کپی‌ها و backupها غیرقابل‌خواندن می‌شود بدون اینکه log تغییر کند. گزینه دیگر نگهداری PII خارج از رویدادها و ارجاع به آن است.",
      "Deleting the key renders the encrypted data unreadable everywhere, including backups, without mutating the log. Another option is storing PII outside events and referencing it.",
    ],
  },
  {
    id: "mq-s-priority-starvation",
    level: "senior",
    tags: ["priority", "scheduling"],
    q: [
      "در priority queue سخت (strict)، چه ریسکی برای پیام‌های کم‌اولویت وجود دارد و چگونه کاهش می‌یابد؟",
      "In a strict priority queue, what risk do low-priority messages face and how is it mitigated?",
    ],
    options: [
      ["Starvation؛ با weighted fair queuing یا aging (افزایش اولویت با گذر زمان)", "Starvation; mitigated with weighted fair queuing or aging (raising priority over time)"],
      ["تکرار پیام؛ با idempotency", "Duplication; mitigated with idempotency"],
      ["از دست رفتن ترتیب؛ با partition key", "Loss of ordering; mitigated with a partition key"],
      ["رمزنگاری ضعیف؛ با TLS", "Weak encryption; mitigated with TLS"],
    ],
    a: [
      "اگر جریان پیام‌های پراولویت قطع نشود، پیام‌های کم‌اولویت هرگز پردازش نمی‌شوند. صف‌های جدا با سهم ثابت worker هم روش ساده‌ای برای تضمین پیشرفت است.",
      "If high-priority traffic never stops, low-priority messages never run. Separate queues with a fixed share of workers is another simple way to guarantee progress.",
    ],
  },
  {
    id: "mq-s-backpressure-end-to-end",
    level: "senior",
    tags: ["backpressure", "resilience"],
    q: [
      "API ورودی پیام‌ها را سریع‌تر از ظرفیت کل pipeline در صف می‌گذارد و backlog هر روز رشد می‌کند. راهبرد درست چیست؟",
      "An ingest API enqueues faster than the pipeline can ever process, and the backlog grows daily. What's the right strategy?",
    ],
    options: [
      ["اعمال backpressure در لبه (rate limit یا `429`)، load shedding برای کار کم‌ارزش و افزایش ظرفیت", "Apply backpressure at the edge (rate limits or `429`), shed low-value load, and add capacity"],
      ["افزایش نامحدود حافظه broker", "Grow broker memory without limit"],
      ["افزایش retention تا پیام‌ها حذف نشوند", "Increase retention so messages aren't deleted"],
      ["افزایش prefetch همه consumerها", "Raise prefetch on all consumers"],
    ],
    a: [
      "Queue فقط پیک‌های موقت را صاف می‌کند و عدم تعادل دائمی را حل نمی‌کند؛ صف نامحدود فقط تأخیر را بی‌نهایت می‌کند. باید یا ظرفیت را بالا برد یا ورودی را محدود کرد.",
      "A queue smooths temporary peaks but can't fix a sustained imbalance; an unbounded queue just makes latency unbounded. Either add capacity or limit intake.",
    ],
  },
  {
    id: "mq-s-lag-time-based",
    level: "senior",
    tags: ["monitoring", "kafka"],
    q: [
      "چرا alert بر اساس lag زمانی (ثانیه) معمولاً بهتر از lag تعدادی (پیام) است؟",
      "Why is alerting on time-based lag (seconds) usually better than offset-count lag (messages)?",
    ],
    options: [
      ["چون تعداد پیام با تغییر نرخ ترافیک معنای متفاوتی دارد ولی تأخیر زمانی مستقیماً با SLA مرتبط است", "Message count means different things at different traffic rates, while time lag maps directly to SLAs"],
      ["چون Kafka lag تعدادی را محاسبه نمی‌کند", "Because Kafka can't compute count lag"],
      ["چون lag زمانی همیشه صفر است", "Because time lag is always zero"],
      ["چون lag تعدادی فقط برای producer معنا دارد", "Because count lag only applies to producers"],
    ],
    a: [
      "۱۰,۰۰۰ پیام lag در ساعت پیک ممکن است چند ثانیه و در شب چند ساعت تأخیر باشد. ابزارهایی مانند Burrow یا exporterهای lag زمان را تخمین می‌زنند.",
      "10,000 messages of lag could be seconds at peak or hours overnight. Tools like Burrow or lag exporters estimate it in time.",
    ],
  },
  {
    id: "mq-s-sqs-fifo-throughput",
    level: "senior",
    tags: ["sqs", "scaling"],
    q: [
      "چرا یک صف FIFO در SQS که همه پیام‌هایش `MessageGroupId` یکسان دارند کند است؟",
      "Why is an SQS FIFO queue slow when all messages share one `MessageGroupId`?",
    ],
    options: [
      ["چون پیام‌های یک group تا ack شدن پیام قبلی به consumer دیگری داده نمی‌شوند و پردازش کاملاً سریال می‌شود", "Messages in one group aren't handed out until the prior one is handled, so processing is fully serial"],
      ["چون FIFO پیام‌ها را روی دیسک کند ذخیره می‌کند", "Because FIFO stores messages on slow disks"],
      ["چون dedup برای هر پیام ۵ دقیقه صبر می‌کند", "Because dedup waits 5 minutes per message"],
      ["چون FIFO از long polling پشتیبانی نمی‌کند", "Because FIFO doesn't support long polling"],
    ],
    a: [
      "SQS ترتیب را با قفل کردن group در حین پردازش حفظ می‌کند. استفاده از groupهای متعدد (high-cardinality) و حالت high-throughput FIFO موازی‌سازی را ممکن می‌کند.",
      "SQS preserves order by locking a group while its messages are in flight. Many high-cardinality groups and high-throughput FIFO mode enable parallelism.",
    ],
  },
  {
    id: "mq-s-rabbit-vs-kafka",
    level: "senior",
    tags: ["architecture", "kafka", "rabbitmq"],
    q: [
      "در کدام سناریو Kafka انتخاب بهتری از RabbitMQ است؟",
      "In which scenario is Kafka a better choice than RabbitMQ?",
    ],
    options: [
      ["جریان رویداد با حجم بالا که چند consumer مستقل باید آن را بخوانند و replay کنند", "High-volume event streams that several independent consumers read and replay"],
      ["Routing پیچیده per-message با header و اولویت", "Complex per-message routing with headers and priorities"],
      ["Task queue کوچک با retry و TTL per-message", "A small task queue with per-message retries and TTL"],
      ["RPC با پاسخ مستقیم و تأخیر بسیار کم برای هر درخواست", "Request/reply RPC with very low per-request latency"],
    ],
    a: [
      "Kafka یک log پایدار با replay، retention و throughput بالاست. RabbitMQ در routing انعطاف‌پذیر، ack per-message، priority و الگوهای task queue قوی‌تر است.",
      "Kafka is a durable log with replay, retention and high throughput. RabbitMQ shines at flexible routing, per-message acks, priorities and task-queue patterns.",
    ],
  },
  {
    id: "mq-s-claim-check",
    level: "senior",
    tags: ["patterns", "storage"],
    q: [
      "در الگوی claim-check، چه چالشی در مورد چرخه حیات داده باید مدیریت شود؟",
      "In the claim-check pattern, what lifecycle challenge must be handled?",
    ],
    options: [
      ["Payload در storage ممکن است قبل از مصرف حذف شود یا بعد از مصرف بی‌نهایت بماند؛ retention باید با صف هماهنگ باشد", "The stored payload may be deleted before consumption or linger forever; its retention must align with the queue"],
      ["Payload همیشه دو بار ذخیره می‌شود", "The payload is always stored twice"],
      ["Claim-check ترتیب پیام‌ها را تغییر می‌دهد", "Claim-check reorders messages"],
      ["Broker باید payload را رمزگشایی کند", "The broker must decrypt the payload"],
    ],
    a: [
      "اگر lifecycle rule آبجکت را زودتر از retention یا DLQ پاک کند، پیام بدون داده می‌ماند. Payload باید تغییرناپذیر و با کلید یکتا ذخیره شود تا redelivery همان داده را ببیند.",
      "If a lifecycle rule deletes the object before queue or DLQ retention ends, the message points to nothing. Store payloads immutably under unique keys so redeliveries see the same data.",
    ],
  },
  {
    id: "mq-s-domain-vs-integration",
    level: "senior",
    tags: ["event-driven", "architecture"],
    q: [
      "تفاوت domain event و integration event چیست؟",
      "What's the difference between a domain event and an integration event?",
    ],
    options: [
      ["Domain event درون bounded context است و آزادانه تغییر می‌کند؛ integration event قرارداد عمومی پایدار بین سرویس‌هاست", "Domain events live inside a bounded context and change freely; integration events are stable public contracts between services"],
      ["Domain event همیشه sync و integration event همیشه async است", "Domain events are always sync and integration events always async"],
      ["Integration event فقط برای سیستم‌های legacy است", "Integration events are only for legacy systems"],
      ["هیچ تفاوتی ندارند", "There is no difference"],
    ],
    a: [
      "انتشار مستقیم domain eventها به بیرون مدل داخلی را به قرارداد تبدیل می‌کند. Integration eventها نسخه‌بندی و مستندسازی می‌شوند و معمولاً از طریق outbox منتشر می‌شوند.",
      "Publishing domain events externally turns the internal model into a contract. Integration events are versioned and documented, and usually published via an outbox.",
    ],
  },
  {
    id: "mq-s-ecst-tradeoff",
    level: "senior",
    tags: ["event-driven", "consistency"],
    q: [
      "مهم‌ترین ریسک event-carried state transfer وقتی چند سرویس کپی محلی داده را نگه می‌دارند چیست؟",
      "What's the main risk of event-carried state transfer when many services keep local copies?",
    ],
    options: [
      ["Eventual consistency و انحراف کپی‌ها در صورت گم شدن یا نامرتب رسیدن رویدادها", "Eventual consistency and replica drift if events are lost or arrive out of order"],
      ["افزایش coupling زمانی چون consumer باید سرویس مبدأ را صدا بزند", "More temporal coupling because consumers call the source"],
      ["عدم امکان scale افقی consumerها", "Inability to scale consumers horizontally"],
      ["نیاز به two-phase commit", "A need for two-phase commit"],
    ],
    a: [
      "این الگو coupling زمانی را حذف می‌کند ولی داده را تکثیر می‌کند. برای بازیابی انحراف، topicهای compact‌شده برای re-bootstrap و version per-entity کمک می‌کنند.",
      "It removes temporal coupling but duplicates data. Compacted topics for re-bootstrapping and per-entity versions help recover from drift.",
    ],
  },
  {
    id: "mq-s-redis-durability",
    level: "senior",
    tags: ["redis", "durability"],
    q: [
      "مهم‌ترین ریسک durability در استفاده از BullMQ یا Redis Streams برای jobهای حیاتی چیست؟",
      "What's the main durability risk of using BullMQ or Redis Streams for critical jobs?",
    ],
    options: [
      ["Redis in-memory است و با AOF غیرهمگام یا failover به replica عقب‌مانده، jobهای اخیر ممکن است از دست بروند", "Redis is in-memory, and async AOF or failover to a lagging replica can lose recent jobs"],
      ["Redis هیچ مکانیزم persistence ندارد", "Redis has no persistence at all"],
      ["Redis پیام‌ها را همیشه تکراری می‌کند", "Redis always duplicates messages"],
      ["Redis فقط یک client هم‌زمان را پشتیبانی می‌کند", "Redis supports only one client at a time"],
    ],
    a: [
      "Replication در Redis غیرهمگام است و `appendfsync everysec` حدود یک ثانیه داده را در معرض خطر قرار می‌دهد. برای داده حیاتی، outbox در دیتابیس اصلی یا brokerهای replicated را در نظر بگیرید.",
      "Redis replication is async and `appendfsync everysec` risks about a second of writes. For critical data, consider an outbox in your primary DB or a replicated broker.",
    ],
  },
  {
    id: "mq-s-rabbit-partition-handling",
    level: "senior",
    tags: ["rabbitmq", "distributed-systems"],
    q: [
      "در cluster ای RabbitMQ با classic mirrored queues، استراتژی `pause_minority` در partition شبکه چه می‌کند؟",
      "In a RabbitMQ cluster with classic mirrored queues, what does the `pause_minority` strategy do on a network partition?",
    ],
    options: [
      ["Nodeهای سمت اقلیت خودشان را متوقف می‌کنند تا split-brain و نوشتن واگرا رخ ندهد", "Nodes in the minority side pause themselves to prevent split-brain and divergent writes"],
      ["همه nodeها به کار ادامه می‌دهند و بعداً داده merge می‌شود", "All nodes keep running and merge data later"],
      ["Node دارای بیشترین پیام leader می‌شود", "The node with most messages becomes leader"],
      ["کل cluster خاموش می‌شود", "The entire cluster shuts down"],
    ],
    a: [
      "حالت پیش‌فرض `ignore` می‌تواند split-brain ایجاد کند. Quorum queueها با Raft این مسئله را به‌طور ذاتی مدیریت می‌کنند و برای دسترس‌پذیری بالا توصیه می‌شوند.",
      "The default `ignore` mode can cause split-brain. Quorum queues handle this inherently via Raft and are recommended for high availability.",
    ],
  },
  {
    id: "mq-s-dedup-window",
    level: "senior",
    tags: ["dedup", "idempotency"],
    q: [
      "در طراحی جدول dedup برای consumer، چه trade-offی در مدت نگهداری شناسه‌ها وجود دارد؟",
      "When designing a consumer dedup table, what trade-off exists in how long IDs are kept?",
    ],
    options: [
      ["پنجره کوتاه فضای کمتری می‌گیرد ولی redelivery یا replay دیرتر از آن تکراری پردازش می‌شود", "A short window uses less storage, but redeliveries or replays older than it get reprocessed"],
      ["پنجره طولانی باعث از دست رفتن پیام‌ها می‌شود", "A long window causes message loss"],
      ["مدت نگهداری هیچ تأثیری ندارد", "Retention duration has no effect"],
      ["پنجره کوتاه ترتیب پیام‌ها را تضمین می‌کند", "A short window guarantees message order"],
    ],
    a: [
      "پنجره dedup باید حداقل به اندازه حداکثر زمان ممکن redelivery (retry، DLQ redrive، replay از Kafka) باشد. وقتی عملیات به‌طور طبیعی idempotent باشد، این وابستگی حذف می‌شود.",
      "The dedup window must cover the longest possible redelivery path (retries, DLQ redrive, Kafka replay). Naturally idempotent operations remove this dependency.",
    ],
  },
  {
    id: "mq-s-retry-storm",
    level: "senior",
    tags: ["retry", "resilience"],
    q: [
      "یک سرویس پایین‌دستی کند شده و consumerها مدام retry می‌کنند و وضعیت بدتر می‌شود. کدام ترکیب بهترین محافظت را می‌دهد؟",
      "A downstream service slows down and consumers keep retrying, making it worse. Which combination best protects it?",
    ],
    options: [
      ["Circuit breaker، backoff با jitter، سقف تعداد تلاش و توقف موقت مصرف", "A circuit breaker, backoff with jitter, a max-attempts cap, and pausing consumption"],
      ["افزایش تعداد consumerها تا کار سریع‌تر تمام شود", "Adding more consumers to finish faster"],
      ["حذف timeout تا درخواست‌ها شکست نخورند", "Removing timeouts so requests don't fail"],
      ["Retry فوری بدون تأخیر", "Retrying immediately with no delay"],
    ],
    a: [
      "Retryهای تهاجمی بار را چند برابر می‌کنند و یک کندی را به outage تبدیل می‌کنند (retry storm). Circuit breaker با fail-fast به سرویس فرصت بازیابی می‌دهد و پیام‌ها در صف امن می‌مانند.",
      "Aggressive retries multiply load and turn a slowdown into an outage (a retry storm). A circuit breaker fails fast to let the service recover while messages wait safely in the queue.",
    ],
  },
  {
    id: "mq-s-replay-side-effects",
    level: "senior",
    tags: ["event-sourcing", "replay"],
    q: [
      "هنگام replay کل event log برای بازسازی یک projection جدید، مهم‌ترین خطر چیست؟",
      "When replaying the whole event log to rebuild a new projection, what's the biggest danger?",
    ],
    options: [
      ["اجرای دوباره side effectهای خارجی مثل ارسال ایمیل یا شارژ کارت؛ handlerهای projection باید از آن‌ها جدا باشند", "Re-triggering external side effects like emails or card charges; projection handlers must be separated from them"],
      ["تغییر ترتیب رویدادها در log اصلی", "Reordering events in the original log"],
      ["حذف شدن رویدادهای قدیمی پس از replay", "Old events being deleted after replay"],
      ["افزایش replication factor توسط Kafka", "Kafka increasing the replication factor"],
    ],
    a: [
      "Projectionها باید توابع خالص از رویدادها به state باشند. Handlerهایی که اثر خارجی دارند (process manager، notifier) باید جدا باشند یا در حالت replay غیرفعال شوند؛ همچنین projection جدید را در کنار قبلی بسازید و سپس جابه‌جا کنید.",
      "Projections should be pure functions from events to state. Handlers with external effects (process managers, notifiers) must be separate or disabled during replay; build the new projection alongside the old one, then swap.",
    ],
  },
  {
    id: "mq-s-delayed-at-scale",
    level: "senior",
    tags: ["delayed-messages", "scheduling"],
    q: [
      "برای زمان‌بندی میلیون‌ها پیام تأخیری (مثلاً یادآوری چند روز بعد) روی Kafka، کدام طراحی رایج است؟",
      "To schedule millions of delayed messages (e.g. reminders days later) on Kafka, which design is common?",
    ],
    options: [
      ["ذخیره در یک scheduler store با ایندکس زمانی و انتشار به topic در زمان سررسید", "Store them in a scheduler store indexed by due time and publish to the topic when due"],
      ["`sleep` در consumer تا رسیدن زمان هر پیام", "Have the consumer `sleep` until each message is due"],
      ["تنظیم `retention.ms` برابر زمان تأخیر", "Set `retention.ms` to the delay duration"],
      ["استفاده از `max.poll.interval.ms` به‌عنوان تایمر", "Use `max.poll.interval.ms` as the timer"],
    ],
    a: [
      "Kafka تحویل تأخیری per-message ندارد و `sleep` در consumer کل partition را block و rebalance ایجاد می‌کند. Scheduler مبتنی بر دیتابیس یا timing wheel، یا topicهای bucket‌شده با تأخیر ثابت، راه‌حل‌های رایج‌اند.",
      "Kafka has no per-message delayed delivery, and sleeping in a consumer blocks the partition and triggers rebalances. A DB-backed scheduler or timing wheel, or fixed-delay bucket topics, are common solutions.",
    ],
  },
]);
