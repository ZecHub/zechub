<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Z3_Stack.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Z3 Stack (Nke dị n'ime)

**Z3 Stack** bụ ntọala nke Zcash Foundation: **Zebra** (nkwụnye zuru ezu) + **Zallet** (akpa ego na-ejupụta ọnụ), yana nhọrọ **Zaino** indexer. Ọ bụ ihe a chọrọ iji dochie anya onye kwụụrụ onwe ya `zcashd` usoro, nke jikọtara nkwekọrịta na obere akpa n'otu ọnụọgụ abụọ wee ruo njedebe ndụ ya na 18 Julaị 2026.

Ntughari mmejuputa iwu bu oru Docker Compose na ụlọ ọrụ. [github.com/ZcashFoundation/z3 (Nke a bụ ebe e si nweta ego)](https://github.com/ZcashFoundation/z3).

---

## TL;DR

* Z3 abụghị onye ahịa ọhụrụ. Ọ bụ otu ị si agba post-`zcashd` kpokọta: Zebra na-akwado agbụ, Zallet nwere igodo ma jee ozi obere akpa RPC, yana Zaino (nhọrọ) na -ekwu okwu protocol gRPC lightwalletd.
* `zcashd` agwakọta ọnụ + obere akpa. Z3 ** na-ekewa ọrụ ndị ahụ** . Mgbanwe, ọdọ mmiri igwupụta akụ, yana ndị ọzọ nwere oghere zuru oke nke onye ọ bụla na - agagharị n'ụdị a karịa Zebra naanị ya.
* Atọ dị iche iche mejupụtara oru ngo nwere ike na-agba ọsọ n'otu usu: ** mainnet, * testnet, na regtest.
* Mainnet mbụ sync bụ na iji nke ** 24  72 awa** na banyere ** 300 GB. Regtest abịa elu n'ime sekọnd ma ọ bụ nri ebe ịmụta tojupụtara.
* Zallet na-etinye akwụkwọ ọgụgụ indexer Zaino ma gwa Zebra okwu site na JSON-RPC. Ọrụ Zaino kwụ ọtọ dị mkpa naanị ma ọ bụrụ na ịchọrọ njedebe lightwalletd dakọtara maka obere akpa mpụga.
* Zallet nọ na ** beta. Mgbanwe ndị a nwere ike ịchọ ihichapụ ma mepụta akpa ego ahụ ọzọ. Elela ya anya dị ka ngwanrọ nchekwa zuru ezu maka nnukwu ego.

---

## Ihe mere Z3 ji dịrị ndụ

N'ihe ka ukwuu ná ndụ Zcash, `zcashd` bụ ma ntụle zuru oke na naanị mmepụta akpa ego nke nwere ọnụ. Ọdịdị ahụ bụ ihe mgbanwe, ọdọ mmiri, na ndị nlekọta jikọtara ya.

`zcashd` a na-enye ya ezumike nká. Nkwenye gbanwere gaa n'ọkwá dị elu karịa nke mbụ ahụ. [Zebra](/zcash-tech/zebra-full-node) (Ugbu a kwa) [Zakura](/zcash-tech/zakura-node)) A na-ebugharị obere akpa ahụ n'ime ya. [Zallet](https://github.com/zcash/zallet). Light-wallet na-eje ozi si n'ebe a pụọ. [lightwalletd](/zcash-tech/lightwallet-nodes) to [Zaino](/zcash-tech/zaino).

Akụkụ atọ ndị ahụ bụ ebe nchekwa dị iche, ụgbọ oloko ntọhapụ dị iche na nhazi nkewa. Z3 bụ ihe mkpuchi: eserese ejiri mee ya, nyocha nlekọta ahụike nke na-eme ka obere akpa ego ruo mgbe a ga - emezi ọnụ ọgụgụ ahụ, ọdụ ụgbọ mmiri ọ bụla na olu netwọkụ, yana ụzọ onye ọrụ edere ederede.

Aha ahụ bụ ihe na-abụghị usoro nhazi nke ọma  Zebra, Zaino, Zallet  ọ bụ ezie na faịlụ compose ndabara naanị amalitela zebra na zallet. zaino bu profaịlụ mejupụtara, obughi oru ndi ozo choro.

---

## Ihe owuwu ụlọ

```
                    ┌──────────────────────── Z3 (per network) ────────────────────────┐
                    │                                                                  │
  peers ◄──P2P──►  Zebra (zebrad)  ──JSON-RPC──►  Zallet                                │
                    │   full node                    │  embeds Zaino libraries          │
                    │                                │  wallet RPC for operators        │
                    │                                └─────────────────────────────────┤
                    │                                                                  │
                    │   Zaino (optional, --profile indexer)                            │
                    │     lightwalletd-compatible gRPC + JSON-RPC proxy                │
                    │            │                                                     │
                    └────────────┼─────────────────────────────────────────────────────┘
                                 ▼
                        light wallets / explorers
```

| Akụkụ | Ọrụ na Z3 | A chọrọ ya? |
| --- | --- | --- |
| **Zebra** | Mmekọrịta ma kwado usoro agbụ, asịrị, JSON-RPC, njedebe ahụike | Ee |
| **Zallet** | Akpa ego zuru oke. Na-etinye ọbá akwụkwọ Zaino. Na-ejikọ ozugbo na Zebra JSON-RPC. Anaghị akpọ akpa Zaino nke nọọrọ onwe ya | Ee |
| **Zaino** | Ihe ndeksi nke na-anọpụ iche. gRPC lightwalletd-compatible maka ndị ahịa ọkụ mpụga, tinyere ihe nnọchiteanya JSON-RPC maka ndị na-eme nchọpụta na faucets | No — `--profile indexer` |

Z3 pin oyiyi nsụgharị na- `docker-compose.yml`. Gbanwee na-eji `Z3_ZEBRA_IMAGE`, `Z3_ZAINO_IMAGE`, or `Z3_ZALLET_IMAGE` ma ọ bụrụ na ịchọrọ mkpado dị iche.

---

## Kedu ka nke a si dị iche na zcashd?

| | zcashd | Z3 |
| --- | --- | --- |
| Asụsụ | C++ (Ndụdụ Bitcoin) | Ọrụ nchara, nke Docker Compose haziri |
| Ụdị usoro | Otu ọnụọgụ abụọ: node + obere akpa | Kewapụ oghere na akpa akpa iche |
| Nkwekọrịta | Ezumike ezumike nká (EOS 18 Julaị 2026) | Zebra (ma ọ bụ ihe ọzọ dakọtara) |
| Obere akpa | E wuru n'ime ya `wallet.dat` | Zallet, datadir ezoro ezo nke afọ |
| Ndị ahịa dị mfe | Ọtụtụ mgbe, a na-eji lightwalletd dị iche | Profaịlụ Zaino nhọrọ |
| Nhazi | `zcash.conf` | Faịlụ kwa netwọk dị n'okpuru `config/<network>/` gbakwunyere Dee faịlụ env |
| Netwọk dị n'otu ebe | Nsogbu ọdụ ụgbọ mmiri na-egbu mgbu | Klas nke mbụ: `z3-mainnet`, `z3-testnet`, `z3-regtest` |

Ọ bụrụ na ị ka nwere otu . `zcashd` wallet, use ZecHub’s [ntuziaka mbugharị](/guides/migration-guide-zcashd-to-zebrad-zallet) and Zallet’s `migrate-zcashd-wallet` iwu kama idetuo ya `wallet.dat` n'ime olu Z3.

---

## Netwọk ndị ọzọ

Z3 bụ ọrụ atọ dị iche iche na-arụ. Ha anaghị ekekọrịta ọdụ ụgbọ mmiri ma ọ bụ olu.

| Netwọk | Aha ọrụ | Jiri ya maka | Mmekọrịta mbụ | Ezigbo ego |
| --- | --- | --- | --- | --- |
| **netịịntị** | `z3-mainnet` | Mmepụta | Awa 24–72 | Ee |
| **net ule** | `z3-testnet` | Ịme ihe ngosi na netwọk ule ọha na eze | Awa 2–12 | Mba (nwale ZEC) |
| **ndebanye aha** | `z3-regtest` | Omume mpaghara: mgbochi ozugbo, enweghị ndị ọgbọ | Sekọnd | No |

Ndị ọrụ ọhụrụ kwesịrị ịmalite na ** regtest**, kwado RPC na wallet flows, wee gaa testnet ma ọ bụ mainnet.

---

## Port ndị a na-ahụkarị maka ọdụ ụgbọ mmiri.

A na-eme atụmatụ netwọk atọ ahụ ka ha dịrị n'otu igwe. Ụkpụrụ ndị dị n'okpuru bụ ndabara a bipụtara; onye ọ bụla nwere ike ịfe site na nkwekọrịta nke otu ngwaọrụ (ma ọ bụrụ na e jiri ya tụnyere ihe ọzọ). `Z3_*` Env var. The canonical matriks bụ [`z3-contract.yaml`](https://github.com/ZcashFoundation/z3/blob/main/z3-contract.yaml).

| Ọrụ | Mainnet | Netwọk Nnwale | Ndebanye aha |
| --- | --- | --- | --- |
| Zebra JSON-RPC | 8232 | 18232 | 29232 |
| Zebra P2P | 8233 | 18233 | (ebipụtaghị ya) |
| Ahụike Zebra (`/ready`) | 8080 | 18080 | 28080 |
| Zaino gRPC (profaịlụ indexer) | 8137 | 18137 | 28137 |
| Zaino JSON-RPC (profaịlụ indexer) | 8237 | 18237 | 28237 |
| Zallet RPC | 28232 | 40232 | 50232 |

N'ime netwọk Compose, ọrụ na-edozi aha (`zebra`, `zaino`, `zallet`).

---

## Data na nkwado ndabere

| Olu | Ihe ọ na-ejide | Kwado ya? |
| --- | --- | --- |
| `z3-<network>-chain` | Ọnọdụ agbụ Zebra (~ 300 GB nke isi netwọk) | Nhọrọ — enwere ike ịmekọrịta ọzọ |
| `z3-<network>-zallet` | Nchekwa data akpa ego ezoro ezo **na** njirimara afọ nke na-emeghe ya | **Ee — nke a bụ naanị olu a ga-akwadoro** |
| `z3-<network>-zaino` | Ọnọdụ Indexer (naanị na profaịlụ indexer) | Nhọrọ — enwere ike iwughachi ya |
| `z3-<network>-cookie` | Kuki RPC Zebra | Mba — emegharịrị ọhụrụ |

Iji tinye ọnọdụ nke agbụ na diski ọzọ tupu ịmalite mbụ:

```bash
export Z3_CHAIN_DATA_PATH=/mnt/ssd/zebra-state
./scripts/fix-permissions.sh zebra /mnt/ssd/zebra-state
```

`docker compose --env-file .env.<network> --profile "*" down` Na-akwụsị nchịkọta ma na-edebe mpịakọta. Ịgbakwunye `-v` na-ehichapụ ha ma mee ka a rụgharịa ya. Gụnye `--profile "*"` ya mere, profaịlụ-gated ọrụ (indexers, nlekota) na-n'ezie etisasịwo.

---

## Ịmalite amalite .

Ihe ndị dị mkpa: Docker Engine, Docker Compose v2.24.4+, Git. `openssl` a chọrọ naanị maka regtest.

### Regtest (ụzọ kachasị ọsọ iji hụ nchịkọta)

```bash
git clone https://github.com/ZcashFoundation/z3 && cd z3
./scripts/regtest-init.sh
docker compose --env-file .env.regtest up -d
```

Lee ya ebe a . [docs/regtest.md](https://github.com/ZcashFoundation/z3/blob/main/docs/regtest.md) maka iwu ule.

### Mainnet (ọkwa abụọ)

Zebra ga-emecha syncing tupu Zallet bara uru. Ịmalite Zallet n'oge na - eme ka ọ malitegharịa ruo mgbe a kwụsịrị ya ma mezie usoro ahụ site na iji bọtịnụ "Stop" (Kwụsị) wee pịa OK . `/ready` bụ eziokwu.

```bash
git clone https://github.com/ZcashFoundation/z3 && cd z3

# 1. One-time setup: local config + Zallet wallet identity
./scripts/setup-network.sh mainnet

# 2. Start Zebra and wait until it is synced
docker compose --env-file .env.mainnet up -d zebra
./scripts/check-zebra-readiness.sh

# 3. Start Zallet (and anything else in the default profile)
docker compose --env-file .env.mainnet up -d
```

Testnet bụ otu eruba na `.env.testnet` na nke a: `./scripts/check-zebra-readiness.sh 18080`.

Edits n'okpuru `config/<network>/` nọrọ n'obodo ma lanarị. `git pull`.

### Ihe ndị na-adịghị mkpa

```bash
# Lightwalletd-compatible gRPC + JSON-RPC proxy
docker compose --env-file .env.mainnet --profile indexer up -d

# Prometheus, Grafana, Jaeger, Alertmanager
docker compose --env-file .env.mainnet --profile monitoring up -d
```

Ihe ndabara Grafana ports bụ 3000 (mainnet), 13000 (testnet), 23000 (regtest).

---

## Ihe ndị na-arụ ọrụ kwuru

* ** Ihe oyiyi ndị a na-agbanye.** Z3 anaghị eji nwayọọ efefe n'elu igwe. `:latest`. Bump a pin na-enyocha mgbanwe, ma ọ bụ setịpụrụ `Z3_<SERVICE>_IMAGE`.
* ** Non-root containers.** A na-atụfu ikike Linux. Nnyocha ahụike jidere obere akpa azụ ruo mgbe Zebra dị njikere. Iwu ịmalitegharịa bụ nke ndabara.
* ** Logs.** Z3 anaghị agbanye ọkwọ ụgbọala ndekọ. Debe oke nha na nhazi daemon Docker ma ọ bụ logs etolite n'enweghị nkwụsịtụ na 24/7 node.
* **P2P.** Mainnet na testnet bipụtara Zebra's P2P ọdụ ụgbọ mmiri. N'azụ NAT, setịpụrụ `ZEBRA_NETWORK__EXTERNAL_ADDR` na adreesị ndị ọgbọ kwesịrị ịpịa. Regtest enweghị ndị ibe ya.
* **Zaino na ARM.** Ihe oyiyi Zaino dị n'elu bụ: `linux/amd64` Na Apple Silicon ọ na-agba ọsọ n'okpuru emulation ma ị wuru site isi iyi. Zebra na Zallet bụ multi-arch.
* ** Ndị na-ekerịta ihe.** Enweghị CPU ma ọ bụ ebe nchekwa edobere site na ndabara. Tinye `deploy.resources.limits` na faịlụ override ma ọ bụrụ na igbe ahụ abụghị nke a raara nye node.

Ndepụta nyocha nke mmepụta na FAQ: [docs/faq.md](https://github.com/ZcashFoundation/z3/blob/main/docs/faq.md), [docs/docker-architecture.md](https://github.com/ZcashFoundation/z3/blob/main/docs/docker-architecture.md).

---

## Onye kwesịrị ị na-agba ọsọ Z3

**O dabara gị nke ọma**

* Mgbanwe, ndị na-echekwa ya, na ọdọ mmiri nke igwe eji eme ihe. `zcashd` dị ka node-plus-wallet
* Ndị na-arụ ọrụ chọrọ nkwado zuru oke akpa ego RPC megide Zebra synced
* Ndị mmepe chọrọ mainnet, testnet na regtest n'akụkụ ibe ha.
* Anyone standing up a private lightwalletd-compatible endpoint via the Zaino profile

**Ọ na-abụkarị ngwá ọrụ ezighi ezi**

* Ndị ọrụ njedebe ndị chọrọ naanị izipu ma nata ZEC  jiri obere akpa ego dị ka ZODL / Zashi, Zingo, ma ọ bụ YWallet
* Ndị chọrọ naanị ikwenye na agbụ  agba ọsọ Zebra (ma ọ bụ Zakura) n'onwe ya
* Ndị chọrọ naanị ijere kọmpat blocks  na-agba ọsọ Zebra + Zaino, ma ọ bụ Zebra plus lightwalletd, n'enweghị Zallet

---

## Peeji ndị metụtara ya

* [Zebra Full Node (Nọmba zuru ezu)](/zcash-tech/zebra-full-node)  nkwekọrịta ọnụ Z3 na-ekpuchi ya.
* [Zaino](/zcash-tech/zaino)  nhọrọ indexer profaịlụ
* [Nọmba zuru ezu](/zcash-tech/full-nodes)  Zebra, Zakura na ndị ezumike nká zcashd
* [Lightwallet Nodes (Nọmba nke obere akpa ego)](/zcash-tech/lightwallet-nodes)  onye ndị ahịa na-agwa okwu ọkụ.
* [Zakura Node (Nọmba nke Zaku)](/zcash-tech/zakura-node)  ngbanwe zuru oke; ọ bụghị ihe Z3 na-ebu taa.
* [Ntuziaka Mbugharị: zcashd na Zebrad/Zallet.](/guides/migration-guide-zcashd-to-zebrad-zallet)
* [Akụrụngwa Onye Mmepụta](/start-here/developer-resources)

---

## Akụnụba

* [Ebe nchekwa Z3](https://github.com/ZcashFoundation/z3)
* [Z3 nkwekọrịta (ọdụ ụgbọ mmiri, mpịakọta, aha oru ngo)](https://github.com/ZcashFoundation/z3/blob/main/z3-contract.yaml)
* [Zebra](https://github.com/ZcashFoundation/zebra) · [Akwụkwọ Zebra ahụ](https://zebra.zfnd.org/)
* [Zaino](https://github.com/zingolabs/zaino)
* [Zallet](https://github.com/zcash/zallet) · [Akwụkwọ Zallet ahụ .](https://zcash.github.io/zallet/)
* [Zcash Community Forum  mmelite nke Z3](https://forum.zcashcommunity.com/t/zcash-z3-updates-formerly-zcashd-deprecation/48965)
* [Z3 Launcher (Onye na-ebupụta ihe)](https://github.com/Jubrilabdulazeez/z3-launcher)  ụgbọelu nchịkwa obodo n'elu ụlọ ọrụ na-ede akwụkwọ (ZecHub Hackathon)

