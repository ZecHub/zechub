<a href="https://github.com/zechub/zechub/edit/main/site/Privacy_Tools/Nym_Mixnet_Wallet_Setup.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Route Zcash Wallet Traffic Over the Nym Mixnet

> Last verified: September 25, 2026

Zcash shielded transactions protect transaction data on-chain, but wallets still communicate over the internet. Network observers can potentially learn metadata such as your IP address, when your wallet connects, and which infrastructure it contacts.

Nym adds a separate network-privacy layer. As of September 2026, the best approach depends on the wallet:

1. **Prefer a wallet's native Nym integration when it exists.**
2. Otherwise, use **system-level NymVPN Mixnet/Anonymous mode** so the wallet's network traffic is routed through Nym without depending on wallet-specific proxy support.

The bounty text referenced `site/Privacy_Tools/Nym_VPN.md`, but that file does not exist on current ZecHub main. The current related ZecHub page is [VPN & dVPN](./VPN_and_DVPN.md).

## What Nym adds — and what it does not

A shielded Zcash payment and a network privacy tool solve different problems:

- **Zcash shielded pools** protect transaction details on-chain.
- **Nym mixnet routing** is designed to reduce linkability between your real network identity and the service receiving wallet traffic.
- A destination contacted through a system-level NymVPN tunnel should see a Nym exit rather than your home/mobile IP.

Nym's mixnet uses multiple hops, packet mixing, randomized delays, cover traffic, and onion encryption to reduce network-metadata leakage.

Nym does **not** protect against a compromised device, malicious wallet software, exposed recovery phrases, identity you reveal through exchange accounts, or privacy loss caused by transparent Zcash activity.

## Native Nym support: use this first when available

Nym announced on September 24, 2026 that its Zcash Community Grant work is complete and native mixnet support is shipping in real Zcash wallets.

### Zingo! Wallet / Zingo PC

Zingo PC includes a native Nym transport.

Current behavior documented by Zingo:

- The Nym control is under **Settings → Nym Mixnet**.
- Sending a payment is routed through the mixnet.
- Ironwood migration transmissions follow the same protected send path.
- ZEC price requests are also routed through the mixnet.
- Sending fails closed while Nym is enabled: if the mixnet transport is unavailable, the payment is not silently sent over clearnet.
- **Chain synchronization is currently not routed through the mixnet** in Zingo PC. Compact blocks, nullifier queries, transaction fetches, mempool traffic, and server-health checks still use the normal server connection.

That distinction matters: Zingo's native integration protects the highest-linkage broadcast path, but it is not yet a full-device network tunnel.

If your threat model also requires hiding sync traffic from the server, use a system-level privacy tunnel such as NymVPN in addition to understanding the extra latency and complexity this introduces.

Sources:

- https://github.com/zingolabs/zingo-pc
- https://nym.com/blog/nym-mixnet-zcash-wallets

### Zkool

Nym reports that **Zkool** now supports connecting to Zcash RPC infrastructure over the Nym mixnet using a native toggle.

Zkool is the actively maintained successor to YWallet. Its project also supports Tor proxying and onion services for Zcash server connections.

Prefer Zkool's native Nym option over trying to force an older YWallet build through an undocumented proxy path.

Sources:

- https://nym.com/blog/nym-mixnet-zcash-wallets
- https://github.com/mladenmarkov/zkool

### Zodl

Zodl currently has built-in **Tor Protection**, not the same native Nym integration described above for Zingo and Zkool.

Zodl's Tor feature can route transaction submission, transaction-data retrieval, exchange-rate requests, and third-party API calls over Tor. Nym stated on September 24, 2026 that it is still in active conversation with the Zodl team about broader mixnet integration.

For Zodl today, use either:

- Zodl's documented Tor Protection, or
- system-level NymVPN if your goal is to route the wallet's general device traffic through Nym.

Do not assume Tor and Nym are interchangeable transports inside the wallet simply because both are privacy networks.

Zodl Tor settings:

**More → Advanced Features → Beta: Tor Protection → Enable → Save changes**

Sources:

- https://support.zodl.com/article/17-enabling-tor-protection
- https://nym.com/blog/nym-mixnet-zcash-wallets

## Fallback: system-level NymVPN

This is the most broadly compatible Nym option because it does not require the wallet to understand Nym-specific proxy settings.

### 1. Install NymVPN

Download NymVPN only from Nym's official website or an official platform store:

- https://nym.com/
- https://nym.com/blog/nymvpn-v2026.12

NymVPN supports Android, iOS, Linux, Windows, and macOS.

### 2. Select Anonymous / Mixnet mode

NymVPN has a lower-latency mode and a stronger anonymous/mixnet route. For the strongest network-metadata protection, use the Anonymous/Mixnet option and wait until the client reports that the connection is established before opening or refreshing the wallet.

### 3. Leave the wallet on normal network settings

When the operating system is already tunneling traffic through NymVPN, most wallets do not need custom proxy settings.

Open the wallet normally and allow it to sync.

If NymVPN exposes split tunneling on your platform, confirm that the wallet is **included in the protected tunnel**, not placed on a bypass or exclusion list.

### 4. Verify the tunnel before using the wallet

A simple system-level check:

1. Disconnect NymVPN.
2. Visit a public IP-checking service, or on desktop run:

   ```bash
   curl https://api.ipify.org
   ```

3. Record the visible IP.
4. Connect NymVPN in Anonymous/Mixnet mode.
5. Repeat the check.

The visible public IP should change.

This confirms the system tunnel. It does **not** prove that every request made by a particular wallet follows the same path if the app or OS has special routing rules.

For more assurance on desktop:

- inspect the wallet process with the operating system's network monitor,
- verify there is no split-tunnel exclusion,
- confirm expected wallet behavior changes if NymVPN is disconnected.

Do not post screenshots containing wallet addresses, balances, transaction IDs, IP addresses, or recovery material while troubleshooting.

## NymVPN dApp / wallet proxy mode

NymVPN also exposes an app-and-wallet proxy mode using SOCKS5 / RPC routing through the mixnet.

Nym's public setup documentation demonstrates this mainly with Ethereum-style RPC configuration. It is useful for software that explicitly supports a compatible generic proxy/RPC path, but it should **not** be assumed to work with every Zcash wallet.

Only use this path when the wallet's own documentation confirms compatible proxy or RPC support.

Otherwise, prefer:

- the wallet's native Nym integration, or
- system-level NymVPN.

## Performance and timeout trade-offs

Mixnets intentionally trade speed for stronger metadata protection.

Expect possible impact on:

- initial wallet synchronization,
- large catch-up syncs,
- transaction-history queries,
- RPC timeouts,
- third-party API calls.

Practical guidance:

- Start with default Nym settings.
- Expect first sync or long catch-up sync to take longer.
- Retry a timeout before weakening privacy settings.
- Avoid repeatedly switching privacy modes immediately before a sensitive transaction.
- If you use a faster path for bulk sync, understand that contacted infrastructure may observe your real network identity during that period.
- For Zingo PC specifically, remember that its native Nym transport currently protects sends and price lookup, while synchronization remains direct.

## Mobile considerations

On Android and iOS, the operating system VPN slot is usually the simplest way to route general wallet traffic through NymVPN: connect NymVPN first, then open the wallet.

If another VPN, firewall, or local VPN-based ad blocker already occupies the system VPN interface, the two products may not be able to operate simultaneously. Confirm the operating system's VPN status before assuming the wallet is protected.

## Threat-model checklist

Before relying on the setup, ask:

- Am I using shielded Zcash addresses where appropriate?
- Does my wallet have native Nym support?
- If so, exactly which traffic does that native integration protect?
- If I need broader coverage, is NymVPN connected before the wallet starts network activity?
- Is the wallet excluded by a split-tunneling rule?
- Am I relying on a proxy mode that the wallet actually documents?
- Am I leaking identity through an exchange, browser session, third-party API, or transparent address?
- Am I prepared for slower sync and occasional timeouts?

## Sources

- Nym: Nym mixnet now live in Zcash wallets, September 24, 2026: https://nym.com/blog/nym-mixnet-zcash-wallets
- Zingo PC repository and Nym behavior: https://github.com/zingolabs/zingo-pc
- Zkool repository: https://github.com/mladenmarkov/zkool
- NymVPN v2026.12: https://nym.com/blog/nymvpn-v2026.12
- Zodl Tor Protection: https://support.zodl.com/article/17-enabling-tor-protection
