# ZECA

ZECA is a JavaScript project that connects to the Zcash blockchain, listening for incoming shielded transactions.
When a transaction is received, the message contained in its **encrypted memo field** is replicated to external platforms.  

The first integration is with Discord (as a bot), but the modular design makes it easy to extend support to other platforms like Telegram, X/Twitter, Matrix, or any other messaging system.

---

## How it Works

- **Zcash Integration**  
  ZECA connects to the Zcash network (via [zcash-walletd](https://github.com/james-katz/zcash-walletd)) and monitors a given wallet for incoming transactions.
  Each Zcash shielded transaction can carry a **512-byte encrypted memo**.  
  Once decrypted, ZECA extracts the memo text.

- **Replication Layer**  
  The memo is then broadcast to one or more connected platforms.  
  For example, with the Discord integration, messages appear in real time inside a chosen Discord channel.  

<div align="center">
<img src="https://github.com/user-attachments/assets/c79312fd-1d97-41ba-9b8d-f3a03ee02bde" width="600px" />
</div>


---

## Use Cases

- **Whistleblowing**  
  Zcash allows anyone to send private transactions with encrypted memos.  
  By monitoring a public wallet, ZECA can replicate whistleblowing reports or anonymous tips to public communication channels, while preserving the sender’s privacy.

- **Decentralized Messaging**  
  Shielded memos can act as a censorship-resistant microblogging system, mirrored into mainstream platforms.

- **Community Updates**  
  DAOs, projects, or communities can use ZECA to distribute updates, announcements, or polls in a verifiable way (on-chain proof).

- **Experimentation**  
  Explore how blockchain-based messaging can bridge into existing platforms.

---

## Features (Hackathon Scope)

- Listen for Zcash shielded transactions  
- Replicate memos into Discord (via bot)  
- Modular architecture for extending to other platforms  

---

## Building Instructions

1. Clone the Zcash wallet backend:  

```bash
git clone https://github.com/james-katz/zcash-walletd
```

2. Install nj-cli (one-time step):

```bash
cargo install nj-cli
```

3. Build the Node.js binding:

```bash
cd zcash-walletd/js
nj-cli build --release
```

4. Clone this repo (ZECA):

```bash

git clone https://github.com/Paow4n/ZECA
cd ZECA
```

5. Copy the built files into ZECA root:

```bash
cp -r ../zcash-walletd/js/dist ./dist
```

6. Configure environment variables:

```bash
cp sample.env .env
```

7. Run npm install:

```bash
npm install
```

8. Setup the database:

```bash
node sync_db.js
```


9. Run the bot:

```bash
node index.js
```
