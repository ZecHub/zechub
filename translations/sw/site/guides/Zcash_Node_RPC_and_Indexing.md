<a href="https://github.com/zechub/zechub/edit/main/site/guides/Zcash_Node_RPC_and_Indexing.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Hariri Ukurasa"/>
</a>

# Mwongozo wa Vitendo: Zcash Node RPC na Uorodheshaji wa Blockchain

Ukurasa huu ni mwongozo wa kuwasiliana na full node inayofanya kazi ya Zcash kupitia JSON-RPC na kuunganisha kiorodheshi ambacho pochi nyepesi na vichunguzi vinaweza kuuliza. Huu **si** mwongozo wa pili wa usakinishaji.

Kwa maelezo ya jinsi ya kuanzisha mfumo baada ya `zcashd` (Zebra + Zallet, Zaino ya hiari, bandari, kiasi cha hifadhi, uanzishaji wa awamu mbili), tumia ukurasa wa [Mfumo wa Z3](/zcash-tech/z3-stack) na [hazina ya Z3](https://github.com/ZcashFoundation/z3). Kwa maelezo ya msingi kuhusu node ya makubaliano [consensus node], angalia [Full Nodes](/zcash-tech/full-nodes) na [Zebra Full Node](/zcash-tech/zebra-full-node).

`zcashd` ilifikia mwisho wa matumizi tarehe 18 Julai 2026. Kazi mpya za waendeshaji zinapaswa kulenga Zebra (au [Zakura](/zcash-tech/zakura-node)) pamoja na pochi/kiorodheshi, si `zcashd`.

---

## Kwa Muhtasari

* **JSON-RPC** ndiyo njia ambayo waendeshaji na pochi huuliza node kuhusu kilele cha mnyororo [chain tip], wenzake, na (kwenye mchakato wa pochi) salio. Kwenye Z3, Zebra hutoa node RPC; Zallet hutoa pochi RPC.
* **Regtest** ni mahali sahihi pa kujifunza miito hiyo. Kipanga njia cha RPC cha Z3 kwenye `http://127.0.0.1:8181` hukubali `zebra` / `zebra` na kuelekeza mbinu za node kwa Zebra na mbinu za pochi kwa Zallet.
* **Mainnet na testnet** hutumia uthibitishaji wa cookie kwenye Zebra. Usinakili jina la mtumiaji/nenosiri la regtest kwenye node ya umma.
* **Uorodheshaji [Indexing]** ni kazi tofauti na uthibitishaji. Zebra huthibitisha. [Zaino](/zcash-tech/zaino) (Z3 `--profile indexer`) hutoa gRPC inayooana na lightwalletd. [Ztreamer](https://github.com/distractedm1nd/ztreamer) ni kiorodheshi kinachotegemea Zakura; si kile ambacho Z3 husambaza.
* JSON-RPC ya Zaino na gRPC ya hiari ya kiorodheshi cha Zebra ni kwa loopback au mtandao unaoaminika. Usiziweke hadharani bila uthibitishaji kwenye intaneti ya umma.

---

## Ni mchakato upi hujibu mwito upi

| Unataka | Wasiliana na | Bandari ya seva pangishi ya Z3 mainnet | Maelezo |
| --- | --- | --- | --- |
| Kilele cha mnyororo, wenzake, `getblockchaininfo` | JSON-RPC ya Zebra | 8232 | Uthibitishaji wa cookie |
| Salio la pochi, anwani, kutuma | RPC ya Zallet | 28232 | Mchakato tofauti; programu ya beta |
| Block fupi za pochi nyepesi | gRPC ya Zaino | 8137 | Kwa `--profile indexer` pekee; h2c ya maandishi wazi |
| Proksi ya JSON-RPC ya kichunguzi / chanzo cha sarafu za bure | JSON-RPC ya Zaino | 8237 | Mtandao unaoaminika pekee |
| Kufanyia mazoezi yote yaliyo hapo juu bila kusawazisha | Kipanga njia cha RPC cha Z3 regtest | 8181 | Jina la mtumiaji `zebra` / nenosiri `zebra` |

Jedwali la bandari na majina ya miradi ya Compose: [Mfumo wa Z3](/zcash-tech/z3-stack) na [`z3-contract.yaml`](https://github.com/ZcashFoundation/z3/blob/main/z3-contract.yaml).

---

## Fanyia mazoezi kwenye regtest kwanza

Kutoka kwenye checkout ya Z3, baada ya `./scripts/regtest-init.sh` na `docker compose --env-file .env.regtest up -d`:

```bash
# Node method (Zebra)
curl -s -X POST -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","method":"getblockchaininfo","params":[],"id":1}' \
  http://127.0.0.1:8181

# Wallet method (Zallet)
curl -s -X POST -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","method":"getwalletinfo","params":[],"id":2}' \
  http://127.0.0.1:8181
```

Matokeo salama ya `getblockchaininfo` yanajumuisha `"blocks"` na ramani ya `"upgrades"`. Ikiwa curl inanasa, kipanga njia hakijaanza; ukipata `401`, unawasiliana na Zebra moja kwa moja badala ya kipanga njia (Zebra ya moja kwa moja kwenye regtest ni `29232` na bado inatarajia vitambulisho vya kipanga njia isipokuwa umevibadilisha).

Mtiririko kamili wa kazi wa regtest, ikijumuisha uchimbaji wa block za uanzishaji: [Z3 `docs/regtest.md`](https://github.com/ZcashFoundation/z3/blob/main/docs/regtest.md).

---

## JSON-RPC ya Mainnet / testnet (uthibitishaji wa cookie)

Kwenye mainnet na testnet, Zallet na huduma ya hiari ya Zaino husoma **kiasi cha hifadhi cha cookie kinachoshirikiwa**. Cookie hiyo huzalishwa upya wakati wa uanzishaji; si lengo la kuhifadhi nakala.

**Usichapishe** JSON-RPC ya Zebra kwenye intaneti ya umma. Iite kutoka kwenye mtandao wa Compose (`zebra:8232`) au kutoka kwa seva pangishi tu ikiwa umeifunga kwenye loopback.

Ukaguzi wa kawaida wa mwendeshaji baada ya Zebra kuwa `/ready`:

```bash
# Wait until Zebra is synced (Z3 helper)
./scripts/check-zebra-readiness.sh

# Then start Zallet
docker compose --env-file .env.mainnet up -d
```

`getblocktemplate` / `getmininginfo` ni RPC za uchimbaji. Mabwawa ambayo bado yalitarajia mchakato mmoja wa `zcashd` yanahitaji Zebra (au Zakura) kwa violezo pamoja na pochi yoyote wanayotumia kwa coinbase. Angalia [Mabwawa ya Uchimbaji ya Zcash](/using-zcash/zcash-mining-pools) na [mwongozo wa uhamishaji](/guides/migration-guide-zcashd-to-zebrad-zallet).

---

## Unganisha kiorodheshi

Uthibitishaji na uorodheshaji ni kazi tofauti.

### Zaino (kile ambacho Z3 husambaza)

Zaino husoma Zebra na kutoa API ya gRPC inayooana na lightwalletd pamoja na proksi ya JSON-RPC. Zallet **haihitaji** kontena huru la Zaino; inajumuisha maktaba za Zaino na kuwasiliana na Zebra kupitia JSON-RPC. Anzisha Zaino huru unapohitaji pochi nyepesi za nje, vichunguzi, au vyanzo vya sarafu za bure:

```bash
docker compose --env-file .env.mainnet --profile indexer up -d
```

Subiri hadi Zebra isawazishwe kabla ya kuelekeza wateja kwa Zaino. Kiorodheshi cha wingi katika hali ya kufikia usawazishaji chenye ushindani mkubwa wa uchukuaji kinaweza kupunguza kasi ya kithibitishaji cha Zebra; weka `fetch_concurrency` katika tarakimu ndogo za tarakimu moja hadi kiorodheshi kifikie usawazishaji.

gRPC ya Regtest (maandishi wazi; bandari `28137`):

```bash
# From the Z3 repo, after: scripts/vendor.sh zaino
# and: docker compose --env-file .env.regtest --profile indexer up -d zaino

grpcurl -plaintext \
  -import-path vendor/zaino/zaino-proto/proto \
  -proto service.proto \
  127.0.0.1:28137 \
  cash.z.wallet.sdk.rpc.CompactTxStreamer/GetLightdInfo

grpcurl -plaintext \
  -import-path vendor/zaino/zaino-proto/proto \
  -proto service.proto \
  -d '{}' \
  127.0.0.1:28137 \
  cash.z.wallet.sdk.rpc.CompactTxStreamer/GetLatestBlock
```

gRPC ya Zaino ni h2c ya maandishi wazi kwenye mitandao yote. Sitisha TLS kwenye proksi geuzi ikiwa kitu chochote nje ya seva pangishi kitaunganisha. Maelezo: [Zaino](/zcash-tech/zaino) na [Z3 `docs/regtest.md`](https://github.com/ZcashFoundation/z3/blob/main/docs/regtest.md).

### Viorodheshi vingine (si Z3)

* **lightwalletd** — seva ya zamani ya block fupi. Bado imetumwa katika mazingira mengi; Zaino ndiyo njia mbadala ya jukumu hili.
* **Ztreamer** — kiorodheshi kinachotegemea Zakura na utekelezaji wa `CompactTxStreamer`. Si huduma ya Z3. Angalia [Ztreamer hazina](https://github.com/distractedm1nd/ztreamer).
* **Zebra `rpc.indexer_listen_addr`** — kisikilizaji cha gRPC cha hiari *ndani ya* Zebra. Z3 haikihitaji na haikichapishi kwa seva pangishi.

---

## Makosa ya kawaida

**Kuita mbinu za pochi kwenye Zebra.** `getwalletinfo` na RPC za kutuma ni za Zallet (au pochi nyingine), si za node ya makubaliano.

**Kuanzisha Zallet kabla ya Zebra kuwa `/ready`.** Zallet itaingia kwenye mzunguko wa kuanzisha upya. Tumia `scripts/check-zebra-readiness.sh` kwenye mainnet/testnet.

**Kunakili `zebra`/`zebra` za regtest kwenye mainnet.** Uthibitishaji wa cookie ndio chaguo-msingi la mainnet/testnet kwa sababu.

**Kuchukulia Zaino kama full node.** Zebra (au Zakura) huthibitisha. Zaino huorodhesha.

**Kuweka JSON-RPC ya Zaino au gRPC ya kiorodheshi cha Zebra hadharani.** Vituo hivyo ni vya loopback au mtandao binafsi unaoaminika.

**Kudhani kuwa kila pochi nyepesi tayari inazungumza Zaino.** Angalia toleo la sasa la pochi dhidi ya itifaki inayotekeleza kwa kweli.

---

## Kurasa zinazohusiana

* [Mfumo wa Z3](/zcash-tech/z3-stack) — usakinishaji, bandari, kiasi cha hifadhi, uanzishaji wa awamu mbili
* [Zaino](/zcash-tech/zaino) — jukumu la kiorodheshi na maelezo ya waendeshaji
* [Full Nodes](/zcash-tech/full-nodes)
* [Zebra Full Node](/zcash-tech/zebra-full-node)
* [Node za Lightwallet](/zcash-tech/lightwallet-nodes)
* [Mwongozo wa Uhamishaji: zcashd hadi Zebrad/Zallet](/guides/migration-guide-zcashd-to-zebrad-zallet)
* [Zingolib na Mafunzo ya Zaino](/guides/zingolib-and-zaino-tutorial)

## Rasilimali

* [hazina ya Z3](https://github.com/ZcashFoundation/z3)
* [mwongozo wa Z3 regtest (curl / grpcurl)](https://github.com/ZcashFoundation/z3/blob/main/docs/regtest.md)
* [Maswali Yanayoulizwa Mara kwa Mara ya Z3](https://github.com/ZcashFoundation/z3/blob/main/docs/faq.md)
* [Zebra](https://zebra.zfnd.org/)
* [Zaino](https://github.com/zingolabs/zaino)
* [Kitabu cha Zallet](https://zcash.github.io/zallet/)
* [Ztreamer](https://github.com/distractedm1nd/ztreamer)

**Ilisasishwa mwisho:** Septemba 2026
