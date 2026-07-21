# Bluff Arena

Real-time multiplayer Bluff (a.k.a. "I Doubt It" / "Cheat"): play cards face-down, declare a rank, and call Bluff! on anyone you think is lying. Built with Next.js and Socket.io, natively built on Zcash, with a ZEC testnet staking pool that every game is headed toward requiring by default.

## Demo Video

A ~3:58 hackathon demo video (built with [Remotion](https://remotion.dev)) lives in the sibling `bluff-demo-video/` project and walks through:

1. **Intro**: hook + project overview, positioned as natively built on Zcash
2. **Game Rules & How to Play**: Bluff mechanics explained
3. **Full Gameplay Demo**: a complete round: dealing, playing, bluffing, calling Bluff!, resolution
4. **Architecture & Technical Flow**: Next.js/React client ↔ Socket.io ↔ Node server, in-memory game state, the ZEC staking pool, and the roadmap from today's custodial pool to FROST threshold signatures (Zcash Foundation's frost-core)
5. **Key Features**: real-time multiplayer, animated bluff reveals, native ZEC staking, reconnect handling
6. **Closing**: call to action

The video visually matches this app's real design system (see `CLAUDE.md`): DM Mono + Sora fonts, dark near-black palette, accent-red/green/yellow/blue.

Two things worth knowing before you read the script or generate narration:
- **Staking is framed as forward-looking.** The deposit-address / on-chain payout mechanism already works today for staked games, but every game *requiring* a stake by default is the direction, not the current default (`stakeUsd` defaults to 0 / free).
- **FROST is roadmap, not live.** The architecture scene calls out moving the ZEC pool to FROST threshold signatures, built on Zcash Foundation's `frost-core`, so no single party holds the keys. That's the target architecture; a standalone proof of concept lives in `frost-poc/` in this repo, but it isn't wired into the live game yet.

**To preview or render it:**

```console
cd ../bluff-demo-video
npm i
npm run dev        # opens Remotion Studio to scrub the timeline
npx remotion render BluffDemo out/bluff-demo.mp4   # 1920x1080 MP4
```

It renders correctly with no narration (captions + animation are self-contained). To add ElevenLabs voiceover, see `bluff-demo-video/VOICEOVER_SCRIPT.md` for the exact per-scene script (including the positioning notes above), filenames, and generation settings, then follow the "Adding real narration" steps in `bluff-demo-video/README.md`.
