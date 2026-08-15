<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/ZECD.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# ZECD — Sikakorabea Serwa a Wɔabɔ ho Ban-Nea Edi Kan

> 🇧🇷 [Versão em Portugalfo na wɔwom](/zechubglobal/zcashbrasil/zcashtech/zecd)

ZECD yɛ shielded-first wallet server ma Zcash, a wɔasi wɔ so [librustzcash a wɔde di dwuma](https://github.com/zcash/librustzcash) na wɔdaa no adi denam Bitcoin Core JSON-RPC kasa no so. Ɛma developers ne payment integrators API a wonim, a ɛne Bitcoin hyia a wɔde bɛdi nkitaho ne Zcash — bere a ɛma Orchard (private pool a ɛsen biara) yɛ default. Wɔyɛɛ no ​​denam [zec.rocks](https://zec.rocks), wɔayɛ ZECD sɛ wɔmfa nsi ananmu `zcashd`’s wallet dwumadie wɔ nnɛyi, cloud-native deployments mu.

**Mprempren nkyerɛaseɛ:** 0.5.0-rc3 (July 13, 2026) — a Ironwood (NU6.3) mmoa ka ho. Install via `cargo install zecd` anaasɛ fa Docker mfonini a ɛyɛ aban de no di dwuma.

---

## TL;DR

- ZECD yɛ **wallet daemon (server)** — ɛnyɛ node a ɛyɛ ma. Ɛdi safoa, scanning, proving, ne RPC ho dwuma a ɛnka Zcash P2P protocol no.
- Ɛka **Bitcoin Core JSON-RPC kasa**: ɔkwan koro no ara din, afuw nsusuwii, auth, ne mfomso koodu — Bitcoin RPC afɛfo pii ne Zcash yɛ adwuma fi adaka no mu.
- **Orchard (shielded) address ahorow no ne default**; transparent (t-address) ne Sapling mmoa hwehwɛ sɛ wobɛpaw pefee wɔ sika kotoku biara mu.
- Ɛka **self-hosted ho [Zebra](Zebra_Full_Node.md) full node** via local JSON-RPC — lightwalletd biara nhia.
- **Stateless by design**: sika kotoku no nyinaa yɛ nea wotumi san fi aba kasasin no nkutoo mu, na ɛma data kyerɛwtohɔ no yɛ nea wotumi tow gu.
- **Ɛnyɛ drop-in ma zcashd**: ɛde Zcash RPC akwan no fã ketewaa bi pɛ di dwuma, a wɔahyɛ da ayɛ nsonsonoe wɔ nhyehyɛe mu ma kokoamsɛm ne ahobammɔ.
- Fees di **ZIP-317** (deterministic fee akontabuo) akyi; wɔpow sika a ɔde di dwuma no akyerɛ.
- Boa **shielded memos (ZIP-302)** denam Bitcoin RPC soro a wonim no yiye no so.

---

## Ɔhaw Bɛn na ZECD Di Ho Dwuma?

`zcashd` was Zcash’s original node and wallet combined — forked from Bitcoin’s C++ codebase in 2016. Bere kɔɔ so no, eyi de akasakasa bae: ɛyɛ den sɛ wɔbɛhwɛ koodu no so, wɔde sika kotoku no abɔ node no denneennen, na wɔde address ahorow a ɛda adi pefee kyerɛ sɛ nea edi kan a wobetumi apaw wɔ nea wɔabɔ ho ban no nkyɛn.

ZECD tetew sika kotoku mu asɛyɛde ne adwene a wɔpene so. Ɛyɛ **wallet layer a wɔatu ho ama** a ɛte application ne Zebra full node ntam, ɛma:

- Rust dwumadie a ɛho tew, nnɛyi de a wɔasi wɔ librustzcash (nwomakorabea korɔ no ara a ɛma Zodl ne Zingo ahoɔden) so .
- Privacy-by-default design (Orchard address ahorow gye sɛ wɔahyehyɛ no ɔkwan foforo so) .
- RPC interface a ɛne Bitcoin hyia a ɛyi hia a ɛhia sɛ wosua Zcash-specific tooling no fi hɔ
- Stateless, aba-recoverable architecture a ɛfata ma containerized ne cloud deployments

---

## Dan nhyehyɛeɛ

ZECD yɛ adwuma wɔ ɔkwan a ɛwɔ afã abiɛsa so:

```
Your app / Bitcoin RPC client
        ↓  JSON-RPC
       ZECD
   (keys, scanning, proving, RPC)
        ↓  JSON-RPC (local only)
       Zebra
   (full node — consensus, mempool, chain data)
```

ZECD ne Zebra di nkitaho **ɛnam mpɔtam hɔ JSON-RPC** so nkutoo — atipɛnfo ntam nkitahodi biara nni hɔ, indexers a ɛto so abiɛsa biara nni hɔ, lightwalletd biara nni hɔ. Zebra nkitahodi no yɛ nea wɔahyɛ da ayɛ wɔ mpɔtam hɔ nkutoo: ZECD bɛpow sɛ wɔde adansedi nkrataa bɛmena host a wotumi fa so wɔ wiase nyinaa gye sɛ wɔasiesie no pefee ama out-of-band secured tunnel (e.g. WireGuard anaa SSH).

---

## Nneɛma Titiriw a Ɛwɔ Hɔ

### Shielded-First, Orchard by Default

ZECD de Orchard Unified Addresses di dwuma sɛ address type a wɔahyɛ da ayɛ. Sapling ne transparent (t-address) pools hwehwɛ nhyehyɛe a ɛda adi pefee wɔ sika kotoku biara mu. Saa nhyehyeɛ yi brɛ asiane a ɛwɔ akwanhyia mu a ɛda adi sɛ wɔde bɛmena no ase — kokoamsɛm afiri a ɛtaa ba wɔ Zcash nnwinnadeɛ dedaw mu.

Privacy policy yɛ configurable wɔ frɛ biara anaa wiase nyinaa wɔ `[spend] privacy_policy`:

| Nhyehyɛe | Suban |
|--------|----------|
| `AllowRevealedRecipients` (a wɔahyɛ da ayɛ) | Tumi krataa de kɔma wɔn a wogye no pefee; da dodow ne nea ogye no adi on-chain |
| `AllowRevealedAmounts` | Ma kwan ma cross-pool sends (Sapling↔Orchard) nanso ɛpow transparent agyefo |
| `FullPrivacy` | Nsomaa a wɔabɔ ho ban koraa nkutoo na ɛwɔ ɔtare biako mu; pow wɔn a wogye no pefee ne cross-pool |
| `AllowFullyTransparent` | Afei nso ma kwan t→t soma sika fi transparent UTXOs |

### Bitcoin Core RPC Nkitahodi

ZECD de Bitcoin Core JSON-RPC kasa no di dwuma a ɛne no hyia wɔ:

- Akwan din ahorow (e.g. `getblockchaininfo`, `getbalance`, `getnewaddress`, `listtransactions`, `sendtoaddress`, `sendmany`)
- Field din ne ahorow a ɛwɔ mmuae ahorow mu
- JSON-RPC 1.0 envelope nhyehyeɛ
- Basic auth, . `rpcauth` nsɛm a wɔakyerɛw, ne cookie fael no ho adansedi
- Mfomso koodu ne HTTP tebea ho mfonini (HTTP 500 a mfomso nipadua, 401 nkyerɛase) .

Wei kyerɛ sɛ Bitcoin sikatua nwomakorabea bebree a ɛwɔ hɔ dada, exchange integrations, ne monitoring tools betumi ne Zcash adi nkitaho denam ZECD so a code nsakraeɛ kakraa bi anaasɛ enni biara.

Conformance suite (140+ checks) no tu mmirika wɔ PR biara so tia live regtest daemon na wɔsan nso dii ho adanseɛ tia public testnet.

### Nkyerɛwde a Wɔabɔ ho ban (ZIP-302) .

ZECD da Zcash shielded memo feature no adi denam Bitcoin RPC soro a wonim no yiye no so — biribi a enni hɔ wɔ standard Bitcoin tooling mu:

- `sendtoaddress` gye hex memo a wopɛ sɛ akyi parameter foforo (ɛkɔ baiti 512; wɔpow ma wɔn a wogye no pefee) .
- Transaction abakɔsɛm entries fi `listtransactions` ne `gettransaction` fa ka ho `memo` (hex) ne `memoStr` (decoded text) fields bere a output bi kura bi
- Wɔboa zero-amount sends to a shielded recipient ma memo-only use cases (the `z_sendmany` "memo-only-send" nhwɛsode) .

Wei ma ZECD fata ma aplikeshɔn a ɛhia kokoam, nkɔnsɔnkɔnsɔn nkrasɛm a ɛka sikatua ho.

### Ɔman nnim denam Design so

ZECD kɔ so **off-chain tebea biara nni hɔ a aba nkutoo sanba ntumi nsan nkyekye**. Sika kotoku no ho nsɛm a wɔahyehyɛ ( .`data.sqlite`) yɛ nea wobetumi anya afi aba kasasin mu koraa — wogye sika a wɔabɔ ho ban a biribiara nhyɛ mu; wɔsan nya sika a ɛda adi pefee no kosi anohyeto a wɔahyehyɛ no.

Sɛ wopɛ sɛ wosan de sika kotoku bi fi aba mu ba a:

```sh
zecd init --restore --birthday <block-height>
```

Wei ma data directory no **disposable**: container a enni persistent volume, a wɔasan asi afi aba no mu wɔ mfiase biara no, nhwere biribiara a ɛho hia. Adwumayɛfoɔ na wɔhwɛ address a wɔde ma no akyi — ZECD kae address bere a wɔanya sika wɔ nkɔnsɔnkɔnsɔn mu pɛnkoro pɛ.

Wɔhyɛ da de nkyerɛwde ahorow nni hɔ. Esiane sɛ labels nni on-chain source na wontumi mfa aba nsan nsiesie nti, ZECD ntumi mmoa kɛkɛ. Frɛ label akwan san ba a `method-not-found` mfomsoɔ (`-32601`).

### No lightwalletd Dependency a ɛwɔ hɔ no

ZECD derives compact blocks, tree state, and mempool visibility directly from Zebra's JSON-RPC. There is no lightwalletd to operate or maintain — reducing operational complexity for self-hosted deployments.

### Cloud-Native ne Containerized Deployments a Wɔde Di Dwuma

Wɔayɛ ZECD no stateless architecture no ama Docker ne Kubernetes mpɔtam hɔ:

- Full Docker Hyehyɛ stack (`zebra → zecd`) a ɛwɔ baabi a wɔkora nneɛma so
- Akwahosan awiei wɔ hyɛn gyinabea `9233` a wɔde ahoboa nhwehwɛmu a wotumi hyehyɛ ( .`synced` or `connected`)
- JSON logging option a wɔahyehyɛ ama log aggregation pipelines
- ZIP-317 deterministic fees — no fee oracle anaa nsaano ka nhyehyɛe
- `bootstrap_from_keys` (default on): data kyerɛwtohɔ a hwee nni mu a ɛwɔ nkyɛn `keys.toml` auto-rebuilds sika kotoku no wɔ startup — deploy denam mounting Secret biako na efi ase de PVC hunu

---

## Nhwɛso ahorow a Wɔde Hwɛ Nnipa So

ZECD boa key-custody models abiɛsa, a ɛfata ma deployment ne ahobammɔ ahwehwɛde ahorow:

### 1. Wɔamfa encrypted (Default — Auto-Unlock) .

Aba no mnemonic wɔ `keys.toml` wɔde abɔ **mfe a wɔde kyerɛ fael** (`identity.txt`). Na default no na ɛwɔ hɔ `auto_unlock = true`, wɔ decrypted aba no kɔ memory mu wɔ startup enti seds no yɛ unattended na dabi `walletpassphrase` ɔfrɛ ho hia.

Nea eye sen biara ma: automated payment processors, exchange sika kotoku a ɛyɛ hyew, developer mmeae.

```sh
zecd init --datadir ./data --wallet default --account-name primary
```

> Kora `identity.txt` **abɔnten** data directory wɔ mainnet — obiara a ɔkenkan fael abien no nyinaa wɔ spend tumi.

### 2. Encrypted (Wɔabɔ ho ban wɔ Passphrase) .

Wɔde passphrase (age scrypt) abɔ mnemonic no mu sen sɛ wɔde identity file bɛhyɛ mu. Sika kotoku no fi ase to mu; `walletpassphrase "<pass>" <timeout>` bue no bere tenten a wɔde ama no na auto-relocks wɔ bere a etwa to mu — a ɛne Bitcoin Core encrypted wallet suban hyia.

Nea eye sen biara ma: sika kotoku a ɛyɛ hyew a ɛho nhia sɛ wonya tumi a wɔde di dwuma a obiara nhwɛ so; nkitahodi adwumayɛfo adwumayɛ nhyehyɛe ahorow.

```sh
zecd init --datadir ./data --encrypt
# later: walletpassphrase "my-passphrase" 300
```

### 3. Ɔwɛn-Nkutoo (UFVK — No Spend Key) .

Wɔde Unified Full Viewing Key (UFVK) a wɔde fi sika kotoku foforo mu na efii ase. Wobetumi agye, scan, na wɔabɔ sika a aka ho amanneɛ — nanso wontumi mfa ne nsa nhyɛ nnwuma ase. Ɛyɛ papa ma monitoring, invoicing, anaa audit nodes a wɔatew wɔn ho fi signing wallet no ho.

```sh
# On the signing wallet's host:
zecd export-ufvk

# On the watch-only host:
zecd init --datadir ./data-watch --ufvk "uview1..." --birthday <height>
```

---

## Backup ne Recovery a Wɔde Yɛ Adwuma

Sika a wobetumi anya afi **mnemonic nkutoo** mu. Biribiara a aka no yɛ cache.

| Nneɛma a Wɔde Yɛ Nneɛma | Beae a ɛwɔ | Nea ɛbɔ ho ban | Back up? |
|----------|----------|-----------------|----------|
| **Nsɛmfua 24-nkae** | Wɔakyerɛ pɛnkoro wɔ `zecd init` | Sika no — adehwere = daa adehwere | **Yiw — offline (krataa/HSM)** |
| `keys.toml` | `<wallet dir>/keys.toml` | Encrypted aba + awoda + network | **Yiw — sɛ Ahintasɛm** |
| `identity.txt` | `[keys] age_identity` | Ɔdecrypt ahorow no `keys.toml` (sɛe tumidi) | **Yiw — a ɛyɛ soronko fi `keys.toml`** |
| Awoda tenten | Emu `keys.toml` | Ma san de ntɛmntɛm (ɔsorokɔ biara ansa na tx a edi kan) | Kyerɛwtohɔ a wɔde mnemonic |
| `data.sqlite` | `<wallet dir>/data.sqlite` | Wallet cache — wɔasan akyekye afi aba so wɔ sanba | Dabi — a wɔtow gu |
| `blocks/` | `<wallet dir>/blocks/` | Compact block cache a ɛwɔ hɔ | Dabi — dabi hyɛn; betumi anyin kɛse |
| `.cookie` | `<datadir>/.cookie` | Ephemeral RPC kukisi a ɛyɛ bere tiaa bi | Dabi — wɔasan ayɛ no foforo wɔ mfiase |

> **Ɛsɛ sɛ data kyerɛwtohɔ no yɛ host-local.** ZECD no single-instance lock (`<datadir>/.lock`) yɛ OS afotuo lock — ɛnyɛ span hosts. Mma nkyɛ data directory akenkan-kyerɛw wɔ mfiri ahorow (NFS, Kubernetes) so da `ReadWriteMany`) — ZECD nhwɛso abien bɛsɛe sika kotoku DB no. Fa di dwuma `ReadWriteOnce` nhoma ahorow a ɛwɔ Kubernetes mu.

---

## RPC Ɔkwan a Wɔfa so Ahobammɔ

Wɔ deployments a credential leak bɛyɛ ɔsɛeɛ no, ZECD boa sɛ wɔbɛto RPC ani no ano hye wɔ akwan ketewa bi a wɔapaw so:

```toml
[rpc]
allowed_methods = ["getblockchaininfo", "getbalance", "getnewaddress", "listtransactions"]
```

Ɔkwan biara a enni list no mu no san ba `-32601` (HTTP 404) — ɛnyɛ nsonsonoeɛ ne ɔkwan a enni hɔ, enti server a wɔatoto mu no nda biribiara adi mfa deɛ ɛsim no ho. Invoicer a wɔde gye nkutoo betumi ayɛ adwuma `sendtoaddress`, `sendmany`, ne `stop` sɛnea ɛbɛyɛ a wɔbɛtew blast radius a efi client a wɔagye no atom so.

---

## Nsonsonoe titiriw a ɛda Bitcoin Core RPC ntam

Ɛsɛ sɛ developers a wotu fi Bitcoin anaa zcashd tooling no hu saa mpaapaemu a wɔahyɛ da ayɛ yi:

| Suban | Bitcoin Core | ZECD |
|----------|-------------|------|
| Address nhyehyɛe | `1...` / `bc1...` | `u1...` (Orchard Unified Address) — wontumi nkyekyε mu sε Bitcoin address denam string-parsing clients so |
| Nkyerɛwde ahorow | Full label sotɔɔ | Wɔamfa anni dwuma — . `setlabel`, `listlabels`, ne nea ɛkeka ho san ba `-32601` |
| Nneɛma a wɔbɔ | Ɔdefo-a wotumi de si hɔ; fee gua so | ZIP-317 deterministic nkutoo na ɛwɔ hɔ; `settxfee`, `fee_rate`, `subtractfeefromamount` apow no ne `-8` |
| Nsɛm a wɔka kyerɛ | Wɔnnye mmoa | `sendtoaddress` gye hex memo tom; abakɔsɛm anya `memo` + `memoStr` afuw mu |
| Confirmations a ɛsɛ sɛ wɔsɛe no | 1 | 3 (ankasa nsakrae) / 10 (ɔfã a ɛto so abiɛsa) — configurable via `trusted_confirmations` / `untrusted_confirmations` |
| `listsinceblock` wɔ reorg | Nantew san kɔ fork | San ba `-5` (Block no nnya) sɛ cursor no reorged akɔ akyirikyiri — san-baseline ne parameterless frɛ |
| Duplicate wɔn a wogye no wɔ `sendmany` | Mfomso | JSON parser hwe ase duplicates (nkonimdi a etwa to) ansa na ZECD ahu — nkyerɛw address koro no ara mprenu |
| Kari pɛ wɔ bere a edi kan sync | Blocks anaasɛ ɔhyew-up | Serves fã bi kari pɛ — apon automation so `GET /readyz` (ɛsan de 503 kɔsi sɛ ɛbɛyɛ sync koraa na enhancement backlog no akɔ) |
| `minconf 0` in `getbalance` | 0-conf kari pɛ | Served as 1 — a shielded note no nyɛ nea wontumi nsɛe no da a wɔantu |

---

## Mfiase Ntɛmntɛm

**Nea ɛsɛ sɛ wodi kan yɛ:** Zebra a ɔretu mmirika wɔ mpɔtam hɔ ne `rpc.listen_addr = 127.0.0.1:18234` (testnet) (sɔhwɛ a wɔde sɔ hwɛ).

Fa fi crates.io (0.4.3+) so hyɛ mu:

```sh
cargo install zecd
```

Anaasɛ si fi fibea:

```sh
git clone https://github.com/zecrocks/zecd && cd zecd
cargo build --release
```

```sh
# 1. Initialize a testnet wallet (generates a 24-word mnemonic and an account)
zecd --datadir ./data --testnet init --wallet default --account-name primary

# 2. Start the daemon (syncs in background, serves JSON-RPC on port 18232)
zecd --datadir ./data --testnet \
    --rpcuser zec --rpcpassword secret --rpcbind 127.0.0.1 --rpcport 18232
```

**Nkitahodi denam curl so:**

```sh
curl -s --user zec:secret --data-binary \
  '{"jsonrpc":"1.0","id":"1","method":"getblockchaininfo","params":[]}' \
  -H 'content-type: text/plain;' http://127.0.0.1:18232/
```

**Fa Python so di nkitaho (fa Bitcoin RPC nhomakorabea di dwuma):**

```python
from bitcoinrpc.authproxy import AuthServiceProxy
rpc = AuthServiceProxy("http://zec:secret@127.0.0.1:18232")
print(rpc.getblockchaininfo())
addr = rpc.getnewaddress()          # returns a u1... Orchard Unified Address
print(rpc.getbalance())
print(rpc.listtransactions("*", 20))

# Send with a shielded memo
rpc.sendtoaddress(addr, 0.001, "", "", False, "48656c6c6f205a6563617368")  # hex memo
```

**San fa fi aba mu:**

```sh
zecd --datadir ./data init --restore --birthday 2500000
# paste your 24-word mnemonic when prompted
```

---

## Default Ports a Wɔde Di Dwuma

| Nkitahodi | ZECD RPC | Zebra RPC (akyi) | Akwahosan |
|---------|----------|---------------------|--------|
| Mainnet | 8232 na ɛyɛ | 8234 na ɛyɛ | 9233 na ɛyɛ |
| Testnet | 18232 | 18234 | 9233 na ɛyɛ |

---

## ZECD ne zcashd ne Zaino ntam

| | zcashd a wɔde yɛ adwuma | Zaino | ZECD |
|--|--------|-------|------|
| Dwuma a Di | Node + sika kotoku a ɛyɛ ma | Indexer (ɛsi lightwalletd ananmu) | Wallet server nkutoo |
| Kasa | C++ | Rust | Rust |
| Gyinabea | Wɔagyae | Active | Ɛyɛ adwuma (v0.5.0-rc3, Ɔpɛpɔn 2026) |
| Default pool | Transparent | N/A | Orchard (shielded) |
| RPC dialect | zcashd-specific | gRPC (lightwalletd) | Bitcoin Core JSON-RPC |
| Requires full node | Yes (self) | Zebra or zcashd | Zebra |
| Ɔman a wonni ahoɔden a wɔsan nya | Dabi | N/A | Yiw (aba nkutoo) |
| Memos a wɔabɔ ho ban | Aane (`z_sendmany`) | N/A | Yiw (Bitcoin RPC ani) |
| Watch-nko (UFVK) | Yiw | Yiw | Yiw |
| Mununkum-kuromfoɔ | Dabi | Ɔfã bi | Yiw |
| Install | Ɔkyekye/binary | Sisi | `cargo install zecd` |

---

## Nkratafa a Ɛfa Ho

- [Zebra Full Node a Ɛyɛ Fɛ](Zebra_Full_Node.md) — node a edi mũ a ZECD di nkitaho no
- [Zaino Indexer a ɔkyerɛwee](Zaino.md) — indexer kwan foforo (ɛsi lightwalletd ananmu) .
- [Zakura Node na ɔkyerɛwee](Zakura_Node.md) — foforo a edi mũ node dwumadie (fork of Zebra) .
- [Nneɛma a Wɔde Hwɛ](Viewing_Keys.md) — sɛnea ZECD de akontaabu hwɛ safe di dwuma de scan nkɔnsɔnkɔnsɔn no
- [Sika kotoku](/using-zcash/wallets) — sika kotoku mu abɔde a nkwa wom ho nsɛm

## Akadeɛ

- [ZECD GitHub (zecrocks/zecd) a ɛyɛ nea ɛwɔ hɔ nnɛ.](https://github.com/zecrocks/zecd)
- [ZECD Dwumadie Mmirikatu Nhoma](https://github.com/zecrocks/zecd/blob/main/docs/OPERATIONS.md)
- [zec.rocks](https://zec.rocks)
- [librustzcash — core Zcash cryptography nhomakorabea](https://github.com/zcash/librustzcash)
- [ZIP-317: Ɔkwan a Wɔfa so Tua Nneɛma a Wɔde Kɔma Afoforo a Ɛfata](https://zips.z.cash/zip-0317)
- [ZIP-302: Nkyerɛwde a Wɔabɔ ho ban](https://zips.z.cash/zip-0302)
- [Zodl sika kotoku (a ɛne librustzcash hyia) .](https://github.com/zodl-inc/zodl-ios)
