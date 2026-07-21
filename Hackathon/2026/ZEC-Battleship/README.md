# ZEC Battleship

**A two-player Battleship game where both players stake shielded ZEC and the winner takes the pot — with anti-cheat board commitments and a threshold-signed escrow that no single party can steal from.**

Built for **ZecHub Hackathon 3.0** · Tracks: **Games + FROST**

---

## The problem this solves

Wagering money on a game between two strangers is an old problem with a hard core: **who holds the pot, and how does the winner trust they'll be paid?**

The usual answers are all flawed. A human middleman can run off with the stakes. A centralized platform takes a cut and sees everything you do. On a smart-contract chain you can escrow funds in code — but that code is public, every wager is visible on a transparent ledger, and privacy is gone.

Zcash offers privacy through shielded transactions, but it deliberately has **no smart contracts** — so the usual "just escrow it in a contract" answer isn't available. That constraint is exactly what makes this project interesting. ZEC Battleship is a working answer to the question: **how do you run a fair, private, real-stakes wager on a chain with no smart contracts, such that neither player nor the operator can cheat or steal?**

## What it is

Two players each stake an equal amount of shielded ZEC. They play a standard game of Battleship. The winner receives the entire pot to their shielded address. Three mechanisms make this fair and trustworthy:

1. **Shielded stakes with private attribution.** Each player funds the pot with a shielded payment carrying a unique encrypted memo, so the game can tell whose deposit is whose — privately, using Zcash's memo field — without exposing anything on a public ledger.

2. **Commit–reveal board locking (anti-cheat).** Before the first shot, each player commits a SHA-256 hash of their board layout plus a secret salt. The layout stays hidden during play, but at the end every board is verified against its commitment. This makes it impossible for a player *or the server* to move a ship mid-game to dodge a loss. A mismatch voids the match and refunds both stakes — so cheating can never pay.

3. **Threshold-signed, non-custodial escrow.** The pot is held by a 2-of-3 FROST threshold signature — one key share each for the two players and a referee. Moving the funds requires any two of the three to sign. The server alone cannot touch the pot; neither can a single player. Because Zcash uses *rerandomized* FROST, the resulting threshold signature is indistinguishable on-chain from an ordinary shielded transaction, so nothing about the multi-party escrow leaks.

## Why it matters for the Zcash ecosystem

**It demonstrates trustless-feeling escrow without smart contracts.** The 2-of-3 FROST pattern shown here isn't specific to a game. It's a general primitive for holding shielded value between mutually distrusting parties — wagers, marketplaces, deposits, dispute-resolved payments — anywhere you'd reach for an escrow contract on another chain but want Zcash's privacy instead. Battleship is just an approachable way to make that primitive tangible.

**It shows privacy as a feature, not a compromise.** Every payment — the stakes and the payout — is shielded, and the escrow's multi-party nature is invisible on-chain. This is a concrete example of Zcash doing something Ethereum-style contracts structurally cannot: settle a multi-party financial interaction while revealing nothing.

**It lowers the on-ramp.** Games are how people first touch new financial technology without friction. A shielded-stake game is a low-stakes, high-clarity way to introduce people to shielded payments, encrypted memos, and threshold custody — the building blocks of the wider Zcash toolkit.

**It exercises real ecosystem tooling.** The project is built against the actual Zcash Foundation FROST implementation (RedPallas ciphersuite) and the Zingo light-client, not reimplemented crypto — so it's a working reference for how these pieces fit together in an application.

## How it works (flow)

awaiting_players → awaiting_deposits → placing → in_play → settling → complete
└→ void (refund on commitment mismatch)

1. Two players join a match; each is given the escrow address and a unique memo.
2. Both send their shielded stake; the game confirms both deposits by memo.
3. Each player places a fleet and commits its SHA-256 hash. Play begins only once both are committed.
4. Players alternate shots. Each client only ever sees its own board and the results of its own shots.
5. When a fleet is sunk, the game verifies both boards against their commitments and pays the pot to the winner.

## Architecture

The Zcash settlement layer sits behind a single interface (`ZcashClient`), so the game logic never depends on how funds move. Three implementations can plug in without touching the game: a **simulator** for the reproducible demo, a **Zingo light-client** backend for real shielded deposits and payouts, and a **FROST escrow** backend where payouts are authorized by the 2-of-3 threshold signature.

## What is real in this submission

- A fully playable two-player game: staking, board commitments, turn-based play, and win detection — working and tested.
- A **real, runnable 2-of-3 FROST threshold-signing proof** in `frost-verify/`. It generates a 3-share group, signs a payout with two signers, verifies the signature under the group key, and proves a tampered payout is rejected. Run it with `cargo run`.
- The full Zcash settlement layer, built behind the `ZcashClient` interface, with deposit-monitoring and shielded-payout paths implemented against the Zingo light-client (`zingo-cli` builds and runs on macOS with Rust 1.90).

## What is not yet demonstrated on-chain

A live testnet/mainnet payout was **not** captured for this submission: the public testnet lightwalletd server was unavailable during the final build window, so a confirmed on-chain transaction could not be recorded in time. The settlement path is fully architected, the wallet toolchain builds and runs, and wiring a confirmed on-chain transaction is the documented next step. This is stated plainly rather than staged.

## Trust model and honest limitations

- **Escrow is custodial in the base game** (one server-held wallet pays the winner). The **FROST path removes this**, requiring 2-of-3 to authorize any payout.
- The server arbitrates shots, so it learns both boards at placement time; the commitment prevents *altering* a board but not hiding it from the arbiter. The documented upgrade is **per-shot zero-knowledge proofs**.
- The FROST demo uses trusted-dealer key generation; the production upgrade is **distributed key generation (DKG)**, so no party ever holds the full key.

## Links

- **Demo video:** [https://youtu.be/0Rn2FF0_nxM]
- **Source repository:** [(https://github.com/Franklynstein/Zechub-hackathon.git)]

## License

MIT — open source.
