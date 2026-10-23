<a href="https://github.com/zechub/zechub/edit/main/site/guides/Zcash_Node_RPC_and_Indexing.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Mwongozo wa Vitendo: Zcash Node RPC na Blockchain Indexing

Ukurasa huu ni kitabu cha upishi cha kuzungumza na nodi kamili Zcash inayoendeshwa kupitia JSON-RPC na cha kuambatanisha kiashiria ambacho pochi nyepesi na wachunguzi wanaweza kuuliza. Sio mwongozo wa pili wa usakinishaji.

Jinsi ya kuleta chapisho-`zcashd` mrundikano (Zebra + Zallet, Zaino, milango, ujazo, buti ya awamu mbili), tumia [Mrundiko wa Z3](/zcash-tech/z3-stack) ukurasa na [Hifadhi ya Z3](https://github.com/ZcashFoundation/z3)Kwa usuli wa nodi ya makubaliano, tazama [Nodi Kamili](/zcash-tech/full-nodes) na [Kifundo Kamili cha Zebra](/zcash-tech/zebra-full-node).

`zcashd` walifikia mwisho wa maisha yao tarehe 18 Julai 2026. Kazi mpya ya mwendeshaji inapaswa kulenga Zebra (au [Zakura](/zcash-tech/zakura-node)) pamoja na pochi/kiorodheshaji, si `zcashd`.

---

## TL;DR

* **JSON-RPC** ni jinsi waendeshaji na pochi wanavyouliza nodi kuhusu ncha ya mnyororo, rika, na (kwenye mchakato wa pochi). Kwenye Z3, Zebra hutoa nodi ya RPC; Zallet hutoa pochi ya RPC.
* **Regtest** ndio mahali sahihi pa kujifunza simu. Kipanga njia cha rpc cha Z3 kimewashwa `http://127.0.0.1:8181` inakubali `zebra` / `zebra` na husambaza mbinu za nodi kwa Zebra na mbinu za pochi kwa Zallet.
* **Mainnet na testnet** hutumia uidhinishaji wa vidakuzi kwenye Zebra. Usinakili jina la mtumiaji/nenosiri la jaribio la awali kwenye nodi ya umma.
* **Kuorodhesha** ni kazi tofauti na uthibitishaji. Zebra huthibitisha. [Zaino](/zcash-tech/zaino) (Z3 `--profile indexer`) hutoa gRPC lightwalletd-compatible. [Ztreamer](https://github.com/distractedm1nd/ztreamer) ni kiashiria Zakura-backed; si kile Z3 husafirisha.
* Zaino JSON-RPC na kiashiria cha hiari Zebra's gRPC ni cha kurudi nyuma au mtandao unaoaminika. Usiwafichue bila kuthibitishwa kwenye mtandao wa umma.

---

## Ni mchakato gani unajibu wito upi

| Unataka | Zungumza na | Lango la mwenyeji wa mtandao mkuu wa Z3 | Vidokezo |
| --- | --- | --- | --- |
| Ncha ya mnyororo, wenzao, `getblockchaininfo` | Zebra JSON-RPC | 8232 | Uidhinishaji wa vidakuzi |
| Salio la pochi, anwani, kutuma | Zallet RPC | 28232 | Mchakato tofauti; programu ya beta |
| Vitalu vidogo vya pochi nyepesi | Zaino gRPC | 8137 | Tu na `--profile indexer`maandishi wazi h2c |
| Kichunguzi / bomba mbadala la JSON-RPC | Zaino JSON-RPC | 8237 | Mtandao unaoaminika pekee |
| Fanya mazoezi yote yaliyo hapo juu bila kusawazisha | Kipanga njia cha rpc cha jaribio la Z3 | 8181 | Jina la mtumiaji `zebra` / nenosiri `zebra` |

Matrix ya mlango na majina ya mradi wa Tunga: [Mrundiko wa Z3](/zcash-tech/z3-stack) na [`z3-contract.yaml`](https://github.com/ZcashFoundation/z3/blob/main/z3-contract.yaml).

---

## Fanya mazoezi kwenye jaribio la kujiandikisha kwanza

Kutoka kwa malipo ya Z3, baada ya `./scripts/regtest-init.sh` na `docker compose --env-file .env.regtest up -d`:

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

Afya `getblockchaininfo` matokeo yanajumuisha `"blocks"` na `"upgrades"` ramani. Ikiwa curl itaning'inia, kipanga njia hakijasimama; ukipata `401`, unabonyeza Zebra moja kwa moja badala ya kipanga njia (Zebra moja kwa moja kwenye regtest ni `29232` na bado inatarajia sifa za kipanga njia isipokuwa ukazibadilisha).

Mtiririko kamili wa kazi wa majaribio ya usajili, ikiwa ni pamoja na kuchimba vizuizi vya uanzishaji: [Z3 `docs/regtest.md`](https://github.com/ZcashFoundation/z3/blob/main/docs/regtest.md).

---

## Mainnet / testnet JSON-RPC (auth ya kuki)

Kwenye mtandao mkuu na testnet, Zallet na huduma ya hiari Zaino walisoma **juzuu ya vidakuzi vilivyoshirikiwa**. Kidakuzi hicho hutengenezwa upya wakati wa kuwasha; si lengo mbadala.

Usichapishe Zebra JSON-RPC kwenye mtandao wa umma. Iite kutoka kwa mtandao wa Kutunga (`zebra:8232`) au kutoka kwa seva pangishi tu ikiwa umeifunga kwenye kitanzi cha nyuma.

Ukaguzi wa kawaida wa mwendeshaji baada ya Zebra `/ready`:

```bash
# Wait until Zebra is synced (Z3 helper)
./scripts/check-zebra-readiness.sh

# Then start Zallet
docker compose --env-file .env.mainnet up -d
```

`getblocktemplate` / `getmininginfo` wanachimba madini ya RPC. Mabwawa ya kuogelea ambayo bado yalitarajia moja `zcashd` mchakato unahitaji Zebra (au Zakura) kwa violezo pamoja na pochi yoyote wanayotumia kwa ajili ya coinbase. Tazama [Mabwawa ya Uchimbaji Madini Zcash](/using-zcash/zcash-mining-pools) na [mwongozo wa uhamiaji](/guides/migration-guide-zcashd-to-zebrad-zallet).

---

## Ambatisha kiashiria

Uthibitishaji na uorodheshaji ni kazi tofauti.

### Zaino (kile Z3 inasafirisha)

Zaino husoma Zebra na hutoa API ya gRPC lightwalletd-compatible pamoja na proksi ya JSON-RPC. Zallet **haihitaji** chombo cha Zaino kinachojitegemea; hupachika maktaba za Zaino na kuzungumza na Zebra kupitia JSON-RPC. Anza Zaino inayojitegemea unapotaka pochi za taa za nje, wachunguzi, au mabomba:

```bash
docker compose --env-file .env.mainnet --profile indexer up -d
```

Subiri hadi Zebra isawazishwe kabla ya kuwaelekeza wateja Zaino. Kiashiria cha wingi kinachofuatilia kwa pamoja na sarafu inayopatikana kwa wingi kinaweza kupunguza kasi ya kithibitishaji Zebra's; endelea `fetch_concurrency` katika tarakimu moja za chini hadi kiashiria kitakapofikia kiwango kinachohitajika.

Jaribio la RegPc (maandishi wazi; mlango `28137`):

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

Zaino gRPC ni h2c ya maandishi wazi kwenye mitandao yote. Zima TLS kwa njia mbadala ya kinyume ikiwa kitu chochote nje ya seva pangishi kitaunganishwa. Maelezo: [Zaino](/zcash-tech/zaino) na [Z3 `docs/regtest.md`](https://github.com/ZcashFoundation/z3/blob/main/docs/regtest.md).

### Viashiria vingine (sio Z3)

* **lightwalletd** — seva ya zamani ya block-compact. Bado imetumika porini; Zaino ndiye njia inayofuata jukumu hili.
* **Ztreamer** — kiashiria Zakura-backed na `CompactTxStreamer` utekelezaji. Sio huduma ya Z3. Tazama [Hifadhi ya Ztreamer](https://github.com/distractedm1nd/ztreamer).
* **Zebra `rpc.indexer_listen_addr`** — msikilizaji wa hiari wa gRPC *ndani* Zebra. Z3 haihitaji na haiichapishi kwa mwenyeji.

---

## Makosa ya kawaida

**Mbinu za kupiga simu kwenye pochi kwenye Zebra.** `getwalletinfo` na kutuma RPC ni za Zallet (au pochi nyingine), si za nodi ya makubaliano.

**Kuanza Zallet kabla ya Zebra ni `/ready`.** Zallet itaanzisha upya. Tumia `scripts/check-zebra-readiness.sh` kwenye mtandao mkuu/jaribio.

**Kunakili jaribio la kawaida `zebra`/`zebra` kwenye mtandao mkuu.** Uidhinishaji wa vidakuzi ni chaguo-msingi la mtandao mkuu/jaribio la mtandao kwa sababu fulani.

**Kuitendea Zaino kama nodi kamili.** Zebra (au Zakura) huthibitisha. Fahirisi za Zaino.

**Kufichua Zaino JSON-RPC au kiashiria cha Zebra gRPC hadharani.** Sehemu hizo za mwisho ni za kurudi nyuma au mtandao wa kibinafsi unaoaminika.

**Tukichukulia kwamba kila pochi nyepesi tayari inazungumza Zaino.** Angalia toleo la sasa la pochi dhidi ya itifaki ambayo inatekeleza.

---

## Kurasa zinazohusiana

* [Mrundiko wa Z3](/zcash-tech/z3-stack) — usakinishaji, milango, ujazo, uanzishaji wa awamu mbili
* [Zaino](/zcash-tech/zaino) — jukumu la mfafanuzi na maelezo ya mwendeshaji
* [Nodi Kamili](/zcash-tech/full-nodes)
* [Kifundo Kamili cha Zebra](/zcash-tech/zebra-full-node)
* [Nodi za Lightwallet](/zcash-tech/lightwallet-nodes)
* [Mwongozo wa Uhamiaji: zcashd hadi Zebrad/Zallet](/guides/migration-guide-zcashd-to-zebrad-zallet)
* [Mafunzo ya Zingolib na Zaino](/guides/zingolib-and-zaino-tutorial)

## Rasilimali

* [Hifadhi ya Z3](https://github.com/ZcashFoundation/z3)
* [Kitabu cha upishi cha majaribio ya Z3 (curl / grpcurl)](https://github.com/ZcashFoundation/z3/blob/main/docs/regtest.md)
* [Maswali Yanayoulizwa Mara kwa Mara ya Z3](https://github.com/ZcashFoundation/z3/blob/main/docs/faq.md)
* [Zebra](https://zebra.zfnd.org/)
* [Zaino](https://github.com/zingolabs/zaino)
* [Kitabu Zallet](https://zcash.github.io/zallet/)
* [Ztreamer](https://github.com/distractedm1nd/ztreamer)

**Ilisasishwa mara ya mwisho:** Septemba 2026
