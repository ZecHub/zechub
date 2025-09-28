# Journal - 2025-08-28T23:41:01-07:00

Changes made:
- Wallets & Hardware: active highlight fixed by account identity.
- Removed "Manage Accounts" button.
- Enabled touch drag scrolling globally.
- Smoothed slide-out panel animation and slowed open transition.
- Styled watch-only accounts: sky-blue fill/outline + "Watch-Only" label.
- Animated watch-only styling transitions.
- Unified error modal styling to match confirm dialogs.
- Added guidance to cannot-delete-active message; added period.
- Hid watch-only conversion action for already watch-only accounts.
- Watch-only home: only centered Receive; added "Watch-Only" pill.
- Centered the "Watch-Only" pill.
- Clarified watch-only warning copy: account-specific on this device.
- Quick actions refresh immediately after converting active to watch-only.
- Slide-out handle visible on all pages.
- New/Restore overlay slides over chooser; X returns to chooser with rightward slide.
- Fixed sticky edit state after rename (clears edit/action indices).

Operations:
- Killed duplicate instances; relaunched cleanly.

Files touched:
- lib/router.dart
- lib/pages/utils.dart
- lib/init.dart
- lib/pages/main/home.dart
- lib/pages/accounts/manager.dart
- lib/l10n/intl_en.arb
- lib/generated/intl/messages*.dart


# Journal - 2025-09-02T00:00:00Z

Summary of changes:
- Restore flow UX unified for both paths (with/without Wallet Birthday Height). If height missing: “No Wallet Birthday Height” modal → themed date picker → “Restoration Notification”. If height provided: skip date picker and reuse the confirmation modal.
- Slide-out closes via root navigator, then a full-screen overlay (`#121212`) fades in/out (600ms, easeInOutCubic) during account switching.
- Replaced dual pulse with single centered glowing orb (orange `#F4B728`) using `CenterGlow`, rendered in the overlay.
- Cross-account content now crossfades smoothly (480ms) using `AnimatedSwitcher` keyed by account id.
- “Wallet Birthday Height” field remains visible when switching Seed ↔ Secret/View Key and keeps its value; hint set to “Wallet Birthday Height”; numeric filter fixed.
- Sync pill help: added grey circular “i” icon; tapping shows a single‑button info modal (“OK” only) explaining sync behavior and expectations.
- Date picker themed: dark grey selected fill; calendar text uses balance font/color; centered larger Cancel/OK buttons matching other modals with grey hover.
- Copy tweak: “To Watch-Only” → “Convert to Watch-Only”.

Files touched (high‑level):
- lib/router.dart — overlay glow, restoration flow branching, date picker theming, slide‑out close sequencing, keep Birthday Height field across tabs.
- lib/pages/accounts/submit.dart — added CenterGlow widget for the single pulsing orb.
- lib/pages/main/home.dart — longer AnimatedSwitcher crossfade keyed by account id (480ms).
- lib/pages/main/sync_status.dart — grey info icon and one‑button info modal.
- lib/pages/utils.dart — used one‑button message dialog helper.

Ops:
- Rebuilt Linux debug bundle; killed prior instances; launched a fresh instance; verified crossfade, overlay, date picker theme, and info modal.


## Journal - 2025-09-09

Summary of changes:
- Messages now opens as a top-level root overlay (like Quick Send): slide-in from right, 450ms, easeInOutCubic; reverse matches.
- Root AppBar remains mounted to avoid Balance layout shift before overlay, but is visually covered by the overlay during transition (no underlap).
- Messages has its own AppBar: title centered, back arrow; no Balance “Main/Eyeball/Help/Gear” visible beneath.
- Moved compose (pencil) icon to Messages overlay AppBar (upper-right). Tapping opens Quick Send with a blank memo.
- Added a search field at top of Messages list that filters by contact name/address/subject/body/from-to.
- Threaded conversations built from flat messages; list shows avatar, title, preview, unread badge, and date; tap navigates to details with same slide transition.
- Details page marks thread messages as read and offers Reply (opens Quick Send prefilled with thread address).

Files touched (high-level):
- lib/router.dart — new `'/messages'` overlay route on root navigator; slide transitions; AppBar with compose; bottom nav tap pushes `'/messages'`; removed compose icon from Balance AppBar title row.
- lib/pages/messages.dart — implemented threads, search, list rendering, and details with mark-as-read and reply.

Ops:
- Killed prior YWallet processes and relaunched multiple times to verify overlays and navigator assertions; resolved GoRouter branch default-location assertion by adding a no-op `'/messages_anchor'` route.
