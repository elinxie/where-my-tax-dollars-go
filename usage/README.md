# Usage proxy

ChatGPT Plus exposes no reliable monthly-remaining API to this project. This proxy therefore measures bounded work units instead of pretending to know the real cap.

Each scheduled run must:

1. Read `usage/ledger.json`.
2. Start a new run with a maximum of 12 points.
3. Count one point per primary-source page reviewed, one per build/test cycle, two per specialist-agent review, three per image generation, and four per jurisdiction data package.
4. Stop before exceeding 12 points, write the checkpoint, and leave unfinished work queued.
5. Record the date, task, points used, results, and any platform limit signal actually observed.

These points are a planning proxy, not a claim about OpenAI tokens, messages, or billing. If the platform later exposes an official meter, record it separately and let the official signal override the proxy.
