# ZatBoard

**ZatBoard** is a privacy-preserving, directory-structured bulletin board and chat system built on Zcash i.e., encrypted memos inside Zcash shielded transactions.

It is designed to feel like a hybrid between a filesystem and a BBS (bulletin board system):

- Users can navigate folders and files using CLI-style commands.
- Each folder can also function as a chatroom, where members with write access can leave persistent, private messages.
- The project starts as a CLI prototype and later expands to a mock web demo for easier interaction.


Author => @DavidIfebueme


---

## Core Concepts

### Zcash Shielded Transactions & Memos

- Zcash shielded transactions allow users to send funds and attach encrypted memos (512 bytes).
- Only the intended recipient can decrypt the memo.
- This provides a privacy-preserving "message bus" without needing smart contracts.

### Authentication via Reply Addresses

- Memos do not natively authenticate the sender.
- **Solution:** Users attach a persistent reply-to shielded address and digitally sign their first message.
- Coordinators (directory managers) then know where to send responses.

### Chain Latency

- Zcash block time ≈ 75 seconds.
- For commands (e.g., `ls folder`), aggressive local polling and buffering are used so responses appear quickly.
- For chats, the delay is embraced — branding them as asynchronous private message boards.

---

## Features

### Filesystem-like Interaction

- Commands: `ls <folder>`, `cat <file>`, `mkdir <folder>`, etc.
- Coordinators hold authoritative directories and respond via encrypted memos.

### Folder-Based Chats

- Each folder doubles as a chatroom for members with write access.
- Chats persist on-chain via memos, so returning users can replay history.

### Global Broadcasts

- Zcash supports multi-recipient shielded transactions.
- Coordinators can send one message/notification to many users at once (e.g., system-wide announcements).

### Persistence

- Directory state (files/folders) stored locally by coordinators.
- Chats are persisted as a chronological log of memos (each participant syncs when rejoining).

---

## Architecture

### Actors

- **Users:** Interact with ZatBoard via CLI.
- **Coordinators:** Manage directories, enforce permissions, respond to commands.
- **Zcash Network:** Transport and persistence layer for encrypted memos.

### Components

#### CLI Client

- Written in Rust
- Handles: command parsing, memo construction, reply address management.

#### Coordinator Service

- Runs as a daemon.
- Listens to memos on its shielded address, processes commands, and replies.
- Persists directory state (files/folders) and chat logs locally (e.g., RocksDB/SQLite).

#### Zcash Interface

- Uses `zingolib` / `zingo-cli` for sending and receiving shielded transactions.
- For web phase, can bridge via a lightweight API wrapper.

#### Node & Infrastructure

- A `lightwalletd`-backed client is sufficient for development (no need to run a full node initially).
- Full nodes are optional but improve resilience.


**Workflow:**
1. Spin up addresses.
2. Send memos back and forth.
3. Simulate directories and chat.
4. Once stable, deploy to mainnet with real ZEC micro-payments.

---

## Development Plan

**Phase 1 – CLI Prototype**
- Implement sending/receiving memos.
- Add basic commands (`ls`, `cat`, `echo`, `mkdir`).
- Implement reply address & digital signatures.

**Phase 2 – Coordinator Service**
- Directory persistence.
- Permission enforcement.
- Multi-recipient messaging.

**Phase 3 – Folder Chats**
- Asynchronous message board per folder.
- Local replay of persisted chat logs.

**Phase 4 – Web Demo**
- Build a mock web frontend for demonstration.
- Backend still powered by Zcash memos.

---

## Steps to Run

### as coordinator
- clone the repo
- ensure *cargo* and *rust* are installed
- ensure *zingo cli* is installed and set up on a chosen data dir
- mkdir a *coordinator.toml* and edit your data dir.
- run the cooridnator daemon by *cargo run --bin zatboard-coordinator*

### as client/user
- same first three steps as coordinator
- run the client process *cargo run --bin zatboard*


## Name & Identity

- **Project Name:** ZatBoard
- **Meaning:** Zcash Addressed Text Bulletin Board
- **Tagline:** "A private filesystem and message board built on Zcash."


nb: still in development
