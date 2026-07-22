# Worker registry

This is a portable index of roles and handoff locations. `PROJECT_BOARD.md` remains the canonical task-status record. Do not put credentials, personal data, private chat transcripts, or vendor-only state here.

**Roles are the canonical unit and are platform-independent.** A Codex task ID below is legacy metadata kept only so the work can optionally be traced or round-tripped back to that Codex task; it is not where the role "lives." Any agent on any platform assumes a role by reading `START-HERE.md` → `PROJECT_BOARD.md` → the role's `RESUME-*.md`, then updating those repository records.

| Role | Owner (role = canonical; platform ref is legacy metadata) | State | Authority and handoff |
| --- | --- | --- | --- |
| Product owner | Eric Linxie | active | Final authority for priorities, scope, publication, material methodology, services/accounts/storage, and spend. |
| Project Manager | open role · legacy Codex task `019f866e-2765-7b42-a9c1-573fd075a4f6` | active | Sequencing, dependencies, risks, and board state. [`PROJECT_BOARD.md`](../PROJECT_BOARD.md) |
| Migration and Company Systems Architect | open role · legacy Codex task `019f8677-9674-74c2-b2c5-5e39c97c6c6e` | active | Portability kit and later owner-approved migration proposals. [`RESUME-SYSTEMS-ARCHITECT.md`](../RESUME-SYSTEMS-ARCHITECT.md) |
| Finance/Resource Manager | open role · legacy Codex task `019f8677-9461-7432-9f20-b71a59acae3d` | tabled | Capacity policy only; resume after kit acceptance or Eric reprioritizes. [`RESUME-RESOURCE-MANAGER.md`](../RESUME-RESOURCE-MANAGER.md) |
| P2 correction owner | unassigned | blocked | Must wait for architecture/resource gates and Eric's explicit reauthorization. [`RESUME-P2-DATA-VERIFICATION.md`](../RESUME-P2-DATA-VERIFICATION.md) |
| Lead QA | open role · legacy Codex task `019f86ce-0dd3-7e80-87fa-05da576f309e` | queued | Activate only when both P3 prerequisite deliverables are accepted. [`RESUME-LEAD-QA.md`](../RESUME-LEAD-QA.md) |

When a role changes platform, retain the role and checkpoint; replace the platform reference (or keep the prior one as legacy metadata). Never treat a vendor task ID as the role's home.
