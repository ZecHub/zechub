<a href="https://github.com/zechub/zechub/edit/main/site/guides/Zcash_Node_RPC_and_Indexing.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Hariri Ukurasa"/>
</a>

# Mwongozo wa Vitendo: Zcash Node RPC na Uorodheshaji wa Blockchain

Ukurasa huu ni mkusanyiko wa maelekezo ya kuwasiliana na Zcash full node inayoendesha kupitia JSON-RPC na kuunganisha kihorodha ambacho pochi nyepesi na vivinjari vinaweza kuuliza. **Huu si mwongozo mwingine wa usakinishaji.**

Kwa maelekezo ya kuwasha mfumo wa baada ya `zcashd` (Zebra + Zallet, Zaino ya hiari, milango, ujazo, kuwasha kwa awamu mbili), tumia ukurasa wa [Z3 Stack](/zcash-tech/z3-stack) na [hazina ya Z3](https://github.com/ZcashFoundation/z3). Kwa maelezo ya msingi kuhusu consensus-node, angalia [Full Nodes](/zcash-tech/full-nodes) na [Zebra Full Node](/zcash-tech/zebra-full-node).

`zcashd` ilifikia mwisho wa kipindi chake cha matumizi tarehe 18 Julai 2026. Kazi mpya za waendeshaji zinapaswa kulenga Zebra (au [Zakura](/zcash-tech/zakura-node)) pamoja na pochi/kihorodha, wala si `zcashd`.

---

## Kwa kifupi

* **JSON-RPC** ndiyo njia ambayo waendeshaji na pochi hutumia kuuliza node kuhusu kilele cha mnyororo, wenzao, na salio (kwenye mchakato wa pochi). Kwenye Z3, Zebra hutoa node RPC; Zallet hutoa wallet RPC.
* **Regtest** ndiyo mahali panapofaa kujifunza maombi haya. Kipanga njia cha rpc-router cha Z3 kwenye `http://127.0.0.1:8181` kinakubali `zebra` / `zebra` na kuelekeza mbinu za node kwa Zebra na mbinu za wallet kwa Zallet.
* **Mainnet na testnet** hutumia uthibitishaji wa cookie kwenye Zebra. Usinakili jina la mtumiaji/nenosiri la regtest kwenda kwenye node ya umma.
* **Uorodheshaji** ni kazi tofauti na uthibitishaji. Zebra huthibitisha. [Zaino](/zcash-tech/zaino) (Z3 `--profile indexer`) hutoa gRPC inayooana na lightwalletd. [Ztreamer](https://github.com/zcashlabs/ztreamer) ni kihorodha kinachotumia Zakura; hakisambazwi na Z3.
* JSON-RPC ya Zaino na gRPC ya kihorodha cha hiari cha Zebra ni kwa mawasiliano ya ndani ya kifaa au mtandao unaoaminika. Usivifichue bila uthibitishaji kwenye intaneti ya umma.

---

## Ni mchakato upi hujibu ombi gani

| Unachotaka | Wasiliana na | Mlango wa mwenyeji wa Z3 mainnet | Maelezo |
| --- | --- | --- | --- |
| Kilele cha mnyororo, wenzao, `getblockchaininfo` | JSON-RPC ya Zebra | 8232 | Uthibitishaji wa cookie |
| Salio la pochi, anwani, kutuma | RPC ya Zallet | 28232 | Mchakato tofauti; programu ya beta |
| blocks fupi kwa pochi nyepesi | gRPC ya Zaino | 8137 | Kwa `--profile indexer` pekee; h2c ya maandishi wazi |
| Wakala wa JSON-RPC wa kichunguzi / chanzo cha sarafu za bure | JSON-RPC ya Zaino | 8237 | Mtandao unaoaminika pekee |
| Fanya mazoezi ya yote hapo juu bila kusawazisha | Kipanga njia cha rpc-router cha Z3 regtest | 8181 | Jina la mtumiaji `zebra` / nenosiri `zebra` |

Jedwali la milango na majina ya miradi ya Compose: [Z3 Stack](/zcash-tech/z3-stack) na [`z3-contract.yaml`](https://github.com/ZcashFoundation/z3/blob/main/z3-contract.yaml).

---

## Fanya mazoezi kwenye regtest kwanza

Kutoka kwenye nakala ya Z3, baada ya `./scripts/regtest-init.sh` na `docker compose --env-file .env.regtest up -d`:

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

Jibu lenye afya la `getblockchaininfo` linajumuisha `"blocks"` na ramani ya `"upgrades"`. Ikiwa curl inasubiri bila majibu, kipanga njia hakijawashwa; ukipata `401`, unawasiliana na Zebra moja kwa moja badala ya kipanga njia (Zebra ya moja kwa moja kwenye regtest ni `29232` na bado huhitaji kitambulisho cha kipanga njia isipokuwa umebadilisha).

Mtiririko kamili wa kazi wa regtest, ikijumuisha uchimbaji wa blocks za uamilishaji: [Z3 `docs/regtest.md`](https://github.com/ZcashFoundation/z3/blob/main/docs/regtest.md).

---

## JSON-RPC ya Mainnet / testnet (uthibitishaji wa cookie)

Kwenye mainnet na testnet, Zallet na huduma ya hiari ya Zaino husoma **ujazo wa cookie unaoshirikiwa**. Cookie hiyo hutengenezwa upya wakati wa kuwasha; si lengwa la nakala rudufu.

**Usichapishe** JSON-RPC ya Zebra kwenye intaneti ya umma. Iite kutoka kwenye mtandao wa Compose (`zebra:8232`) au kutoka kwa mwenyeji ikiwa tu umeifunga kwenye loopback.

Ukaguzi wa kawaida wa mwendeshaji baada ya Zebra kuwa `/ready`:

```bash
# Wait until Zebra is synced (Z3 helper)
./scripts/check-zebra-readiness.sh

# Then start Zallet
docker compose --env-file .env.mainnet up -d
```

`getblocktemplate` / `getmininginfo` ni RPC za uchimbaji. Mabwawa ambayo bado yalitarajia mchakato mmoja wa `zcashd` yanahitaji Zebra (au Zakura) kwa violezo, pamoja na pochi yoyote wanayotumia kwa coinbase. Tazama [Zcash Mining Pools](/using-zcash/zcash-mining-pools) na [mwongozo wa uhamishaji](/guides/migration-guide-zcashd-to-zebrad-zallet).

---

## Unganisha kihorodha

Uthibitishaji na uorodheshaji ni kazi tofauti.

### Zaino (kile kinachosambazwa na Z3)

Zaino husoma Zebra na kutoa API ya gRPC inayooana na lightwalletd pamoja na wakala wa JSON-RPC. Zallet **haihitaji** kontena la Zaino la kujitegemea; hupachika maktaba za Zaino na kuwasiliana na Zebra kupitia JSON-RPC. Washa Zaino ya kujitegemea unapotaka pochi nyepesi za nje, vivinjari au vyanzo vya sarafu za bure:

```bash
docker compose --env-file .env.mainnet --profile indexer up -d
```

Subiri hadi Zebra iwe imesawazishwa kabla ya kuelekeza wateja kwenye Zaino. Kihorodha cha data nyingi kinachofuatilia data ya nyuma na kutumia konkurenzi kubwa ya upokeaji kinaweza kupunguza kasi ya kithibitishaji cha Zebra; weka `fetch_concurrency` kwenye tarakimu chache za mwanzo hadi kihorodha kifuatilie data ya nyuma.

gRPC ya regtest (maandishi wazi; mlango wa `28137`):

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

gRPC ya Zaino ni h2c ya maandishi wazi kwenye mitandao yote. Sitisha TLS kwenye wakala wa nyuma ikiwa kifaa chochote nje ya mwenyeji kitaunganishwa. Maelezo: [Zaino](/zcash-tech/zaino) na [Z3 `docs/regtest.md`](https://github.com/ZcashFoundation/z3/blob/main/docs/regtest.md).

### Vihorodha vingine (si vya Z3)

* **lightwalletd** — seva ya zamani zaidi ya compact-block. Bado inatumika katika maeneo mbalimbali; Zaino ndiyo njia mrithi kwa jukumu hili.
* **Ztreamer** — kihorodha kinachotumia Zakura na utekelezaji wa `CompactTxStreamer`. Si huduma ya Z3. Tazama [Ztreamerhazina](https://github.com/zcashlabs/ztreamer).
* **Zinder** — kihorodha cha Zcash Foundation (alpha). Husoma kutoka kwenye Zebra ya hifadhi au node ya Zakura na hutoa API yake ya gRPC ya `WalletQuery` pamoja na adapta ya lightwalletd inayooana na `CompactTxStreamer`. Mwongozo wake wa kuanza haraka huendesha kando ya node ya Z3, lakini si huduma ya Z3. Tazama [Zinder](/zcash-tech/zinder).
* **Zebra `rpc.indexer_listen_addr`** — kisikilizaji cha hiari cha gRPC *ndani ya* Zebra. Z3 hakikihitaji wala kukichapisha kwa mwenyeji.

---

## Makosa ya kawaida

**Kuita mbinu za wallet kwenye Zebra.** RPC za `getwalletinfo` na kutuma ni za Zallet (au pochi nyingine), si za node ya makubaliano.

**Kuwasha Zallet kabla ya Zebra kuwa `/ready`.** Zallet itajifungua upya mfululizo. Tumia `scripts/check-zebra-readiness.sh` kwenye mainnet/testnet.

**Kunakili `zebra`/`zebra` za regtest kwenda mainnet.** Uthibitishaji wa cookie ndiyo chaguo-msingi la mainnet/testnet kwa sababu maalumu.

**Kuchukulia Zaino kama full node.** Zebra (au Zakura) huthibitisha. Zaino huorodhesha.

**Kufichua JSON-RPC ya Zaino au gRPC ya kihorodha cha Zebra hadharani.** Miisho hiyo ni kwa mawasiliano ya ndani ya kifaa au mtandao binafsi unaoaminika.

**Kudhani kila pochi nyepesi tayari inatumia Zaino.** Kagua toleo la sasa la pochi kulingana na itifaki ambayo inatekeleza kwa hakika.

---

## Kurasa zinazohusiana

* [Z3 Stack](/zcash-tech/z3-stack) — usakinishaji, milango, ujazo, kuwasha kwa awamu mbili
* [Zaino](/zcash-tech/zaino) — jukumu la kihorodha na madokezo ya mwendeshaji
* [Full Nodes](/zcash-tech/full-nodes)
* [Zebra Full Node](/zcash-tech/zebra-full-node)
* [Lightwallet Nodes](/zcash-tech/lightwallet-nodes)
* [Zcash Stack](/guides/zcash-stack) — Zebra + lightwalletd (au Zaino) kwenye Kubernetes au Compose ya Docker
* [Mwongozo wa Uhamishaji: zcashd kwenda Zebrad/Zallet](/guides/migration-guide-zcashd-to-zebrad-zallet)
* [Zingolib na Mafunzo ya Zaino](/guides/zingolib-and-zaino-tutorial)

## Rasilimali

* [hazina ya Z3](https://github.com/ZcashFoundation/z3)
* [Kitabu cha mapishi cha Z3 regtest (curl / grpcurl)](https://github.com/ZcashFoundation/z3/blob/main/docs/regtest.md)
* [Maswali Yanayoulizwa Mara kwa Mara ya Z3](https://github.com/ZcashFoundation/z3/blob/main/docs/faq.md)
* [Zebra](https://zebra.zfnd.org/)
* [Zaino](https://github.com/zingolabs/zaino)
* [Zallet Book](https://zcash.github.io/zallet/)
* [Ztreamer](https://github.com/zcashlabs/ztreamer)

**Ilisasishwa mwisho:** Septemba 2026
