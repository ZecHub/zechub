Reactions feature – investigation log

Context
- Reactions are header-only memos: `v1; type=reaction; conversation_id=...; seq=...; target_seq=...; emoji=...`
- They should aggregate as chips on the target bubble (top-left for outgoing, top-right for incoming), not as list items.

What we implemented
- Parse v1 headers from body; later added robust parsing to fall back to subject (some header-only memos land in subject).
- Send reactions via `_sendReaction` with proper `conversation_id`, `seq`, `target_seq`, `emoji`.
- Optimistic echo of reaction memos (hidden) so UI updates immediately.
- Reaction chips UI: circular, color-coded (gold/orange for outgoing, grey for incoming), slight darken on orange, emoji shadows.
- Layout tuning: chooser size + position; chip overlap and reserved band to avoid pushing layout.
- Guarding: single chooser at a time; single emoji picker; full-color emoji rendering.

Bugs observed
- Incoming reactions sometimes not aggregating (fixed by parsing from subject and defaulting sender to `peer`).
- Reactions mis-associate at top of thread: reacting to the invite shows up on accept as well, and an extra floating chip below accept.

Attempts to fix mis-association
1) target_author field
   - Added `target_author` to outgoing reactions (`me`).
   - On receive, map `target_author` to local perspective (swap me/peer for incoming memos).
   - Result: works when both sides send target_author; does not help when the other side doesn’t include it.

2) Defaulting when target_author missing
   - Initially defaulted to `peer` (assumed the peer’s authored bubble). This caused reactions to land on the accept bubble (incoming) when reacting to the invite (outgoing).

3) Aggregation keying
   - Moved from (cid,target_seq,author) to exact bubbleId `(cid + seq + incoming/outgoing)`, so we attach to a single concrete bubble.
   - Still need the correct incoming/outgoing choice when target_author is absent.

4) Layout gap under accept
   - Reduced reserved chip band and increased upward overlap to remove large gaps.

Next approaches
5) Direction fallback (v1): map missing `target_author` to the bubble with the same direction as the memo (incoming->incoming, outgoing->outgoing). Result: duplicates appeared in some cases.
6) Prefer non-accept (hybrid): when resolving a target bubble (with or without `target_author`), search in two passes:
   - Pass 1: choose the bubble matching `cid+seq+direction` whose header `type != accept` (so invite wins when seq=1 on both invite/accept).
   - Pass 2: if none found, fall back to any bubble that matches `cid+seq+direction`.
   Aggregation remains keyed by exact `bubbleId`.

If this still fails
- As a fallback, embed a tiny disambiguator in future outgoing invites: e.g., set `target_author=me` for all outgoing reactions and request peer to reciprocate in an upcoming protocol bump; or store `cid_first_out_seq` and prefer that.

7) Bubble candidate index: pre-index bubbles (invite/accept/message) by (cid, seq) and sort to prefer non-accept, then resolve reaction targets against this index (plus author/direction) and aggregate strictly by the resolved bubbleId. This ensures:
- old reactions resurface (we scan all messages each build),
- single attachment per bubble,
- no accept mis-association at thread top.

8) Deterministic invite-first resolution + full overlap (current):
- Rank bubbles by type invite > message > accept for a given (cid, seq) and always attach reactions to the highest-ranked bubble in that set. This removes ambiguity when invite and accept share seq=1.
- Remove reserved chip band and increase upward overlap so chips never push layout down and cannot float under bubbles.


