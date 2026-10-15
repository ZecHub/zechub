<a href="https://github.com/zechub/zechub/edit/main/site/guides/Zcash_Node_RPC_and_Indexing.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Ìtọ́sọ́nà Tó Wúlò: Zcash Node RPC àti Blockchain Indexing

Ojú ìwé yìí jẹ́ ìwé oúnjẹ fún bíbá Zcash tó ń ṣiṣẹ́ lórí JSON-RPC sọ̀rọ̀ àti fún fífi àmì ìtọ́kasí kan so mọ́ àwọn àpò ìpamọ́ àti àwọn olùṣàwárí tí wọ́n lè béèrè. **kì í ṣe** ìtọ́sọ́nà ìfisẹ́lé kejì ni.

Fún bí a ṣe lè mú ìwé ìròyìn náà wá-`zcashd` stack up (Zebra + Zallet, iyan Zaino, awọn ibudo, awọn iwọn didun, bata ipele meji), lo [Ìdìpọ̀ Z3](/zcash-tech/z3-stack) ojú ìwé àti [Ibi ipamọ Z3](https://github.com/ZcashFoundation/z3)Fún àgbékalẹ̀ ìfohùnṣọ̀kan-nọ́ńbà, wo [Àwọn Nódù Kíkún](/zcash-tech/full-nodes) àti [Kún Node Àmì Zebra](/zcash-tech/zebra-full-node).

`zcashd` dé òpin ayé ní ọjọ́ kejìdínlógún oṣù keje ọdún 2026. Iṣẹ́ oníṣẹ́ tuntun yẹ kí ó fojú sí Zebra (tàbí [Zakura](/zcash-tech/zakura-node)) pẹ̀lú àpò owó/àmì ìtọ́kasí, kìí ṣe `zcashd`.

---

## TL;DR

* **JSON-RPC** ni bí àwọn olùṣiṣẹ́ àti àwọn àpò owó ṣe ń béèrè lọ́wọ́ àpò owó nípa ìwọ́ntúnwọ̀nsí ẹ̀wọ̀n, àwọn ẹgbẹ́, àti (nínú iṣẹ́ àpò owó). Ní Z3, Zebra ń ṣiṣẹ́ àpò RPC; Zallet ń ṣiṣẹ́ àpò RPC.
* **Regtest** ni ibi tó tọ́ láti kọ́ àwọn ìpè náà. Rpc-router Z3 wà lórí `http://127.0.0.1:8181` gba `zebra` / `zebra` àti síwájú àwọn ọ̀nà nódù sí àwọn ọ̀nà Zebra àti àwọn ọ̀nà àpò owó sí Zallet.
* **Mainnet àti testnet** lo àṣẹ ìjẹ́wọ́ kúkì lórí Zebra. Má ṣe da orúkọ olùlò/ọ̀rọ̀ ìpamọ́ regtest kọ sí ojú òpó gbogbogbò.
* **Ṣíṣe àtọ́ka** jẹ́ iṣẹ́ tó yàtọ̀ sí ìfọwọ́sowọ́pọ̀. Zebra ń fìdí múlẹ̀. [Zaino](/zcash-tech/zaino) (Z3 `--profile indexer`) ń ṣiṣẹ́ fún gRPC lightwalletd-compatible. [Ztreamer](https://github.com/distractedm1nd/ztreamer) jẹ́ ẹ̀rọ ìtọ́kasí Zakura-backed; kì í ṣe ohun tí Z3 ń gbé jáde.
* Atọka iyan ti Zaino JSON-RPC ati Zebra's gRPC wa fun loopback tabi nẹtiwọọki ti o gbẹkẹle. Maṣe fi wọn han laisi idaniloju lori intanẹẹti gbogbogbo.

---

## Ilana wo ni o dahun ipe ti o pe

| O fẹ́ | Bá sọ̀rọ̀ | Ibudo ogun Z3 mainnet | Àwọn Àkíyèsí |
| --- | --- | --- | --- |
| Ìmọ̀ràn ẹ̀wọ̀n, àwọn ẹlẹgbẹ́, `getblockchaininfo` | Zebra JSON-RPC | 8232 | Olùkọ̀wé kúkì |
| Ìwọ̀n owó àpò owó, àdírẹ́sì, àti firánṣẹ́ | RPC Zallet | 28232 | Ilana lọtọ; sọfitiwia beta |
| Awọn bulọọki kekere fun awọn apamọwọ ina | Zaino gRPC | 8137 | Pẹ̀lú nìkan `--profile indexer`; ìwé lásán h2c |
| Aṣojú JSON-RPC ti Explorer / faucet | Zaino JSON-RPC | 8237 | Nẹ́tíwọ́ọ̀kì tí a gbẹ́kẹ̀lé nìkan |
| Ṣe gbogbo àwọn nǹkan tí a mẹ́nu kàn lókè yìí láìsí ìṣọ̀kan | Z3 regtest rpc-router | 8181 | Orúkọ orúkọ `zebra` / ọrọ igbaniwọle `zebra` |

Ibudo matrix ati Kọ awọn orukọ iṣẹ akanṣe: [Ìdìpọ̀ Z3](/zcash-tech/z3-stack) àti [`z3-contract.yaml`](https://github.com/ZcashFoundation/z3/blob/main/z3-contract.yaml).

---

## Ṣe ìdánrawò lórí ìwádìí ìṣàyẹ̀wò ní àkọ́kọ́

Láti ibi isanwo Z3 kan, lẹ́yìn náà `./scripts/regtest-init.sh` àti `docker compose --env-file .env.regtest up -d`:

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

Ara ti o ni ilera `getblockchaininfo` abajade pẹlu `"blocks"` àti ohun `"upgrades"` máàpù. Tí ìrọ̀rí bá dúró, ráútà náà kò ní síta; tí o bá rí i `401`, o n lu Zebra taara dipo olulana (Zebra taara lori regtest jẹ `29232` ó sì tún ń retí àwọn ìwé ẹ̀rí rọ́wọ́ọ̀tì àyàfi tí o bá yí wọn padà).

Iṣẹ́ ìṣàyẹ̀wò kíkún, pẹ̀lú wíwá àwọn búlọ́ọ̀kù ìṣiṣẹ́: [Z3 `docs/regtest.md`](https://github.com/ZcashFoundation/z3/blob/main/docs/regtest.md).

---

## Mainnet/ testnet JSON-RPC (auth kukisi)

Lórí mainnet àti testnet, Zallet àti iṣẹ́ Zaino tí a yàn yóò ka ìwọ̀n kúkì tí a pín**. A tún ṣe kúkì náà nígbà tí a bá bẹ̀rẹ̀; kì í ṣe àfojúsùn àfikún.

Má ṣe gbé Zebra JSON-RPC jáde sí ìkànnì ayélujára gbogbogbò. Pe é láti inú nẹ́tíwọ́ọ̀kì Compose (`zebra:8232`) tàbí láti ọ̀dọ̀ olùgbàlejò nìkan tí o bá so ó mọ́ loopback.

Àwọn oníṣẹ́ tó wọ́pọ̀ máa ń ṣàyẹ̀wò lẹ́yìn tí Zebra bá ti `/ready`:

```bash
# Wait until Zebra is synced (Z3 helper)
./scripts/check-zebra-readiness.sh

# Then start Zallet
docker compose --env-file .env.mainnet up -d
```

`getblocktemplate` / `getmininginfo` wọ́n ń wa àwọn RPC. Àwọn adágún omi tí wọ́n ṣì ń retí ọ̀kan `zcashd` ilana nilo Zebra (tabi Zakura) fun awọn awoṣe pẹlu eyikeyi apamọwọ ti wọn lo fun ipilẹ owo-ori [Àwọn Adágún Ìwakùsà Zcash](/using-zcash/zcash-mining-pools) àti [ìtọ́sọ́nà ìrìnàjò](/guides/migration-guide-zcashd-to-zebrad-zallet).

---

## So atọka kan mọ́

Ifọwọsi ati atọka jẹ awọn iṣẹ oriṣiriṣi.

### Zaino (ohun ti Z3 n gbe)

Zaino ka Zebra ó sì ń lo gRPC API lightwalletd-compatible pẹ̀lú aṣojú JSON-RPC kan. Zallet kò nílò àpótí Zaino tí ó dúró fúnra rẹ̀; ó ní àwọn ilé ìkàwé Zaino nínú, ó sì ń bá Zebra sọ̀rọ̀ lórí JSON-RPC. Bẹ̀rẹ̀ Zaino tí ó dúró fúnra rẹ̀ nígbà tí o bá fẹ́ àwọn àpò ìná, àwọn olùṣàwárí, tàbí àwọn faucets tí ó wà níta:

```bash
docker compose --env-file .env.mainnet --profile indexer up -d
```

Dúró títí tí a ó fi mú Zebra ṣiṣẹpọ kí o tó tọ́ka sí Zaino. Àkójọpọ̀ àmì ìtọ́kasí nínú ìpele pẹ̀lú ìforúkọsílẹ̀ gíga lè dín ìṣàyẹ̀wò Zebra's kù; `fetch_concurrency` nínú àwọn nọ́mbà kékeré kan títí tí a ó fi rí i pé atọ́ka náà ti dé.

Ìdánwò ìforúkọsílẹ̀ gRPC (ọ̀rọ̀ lásán; ibudo `28137`):

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

Zaino gRPC jẹ́ plaintext h2c lórí gbogbo àwọn nẹ́tíwọ́ọ̀kì. Dá TLS dúró ní reverse proxy tí ohunkóhun tí ó wà níta host bá lè so pọ̀. Àwọn àlàyé: [Zaino](/zcash-tech/zaino) àti [Z3 `docs/regtest.md`](https://github.com/ZcashFoundation/z3/blob/main/docs/regtest.md).

### Àwọn atọ́ka mìíràn (kì í ṣe Z3)

* **lightwalletd** — olupin compact-block atijọ. O si tun wa ni ipo ni igbo; Zaino ni ipa-ọna fun ipa yii.
* **Ztreamer** — atọ́ka Zakura-backed àti `CompactTxStreamer` Ìmúṣẹ. Kìí ṣe iṣẹ́ Z3. Wo [Ibi ipamọ Ztreamer](https://github.com/distractedm1nd/ztreamer).
* **Zebra `rpc.indexer_listen_addr`** — olutẹtisi gRPC yiyan *ninu* Zebra. Z3 ko nilo rẹ ati pe ko ṣe atẹjade rẹ si olugbalejo naa.

---

## Àwọn àṣìṣe tó wọ́pọ̀

**Pípè àwọn ọ̀nà àpò owó lórí Zebra.** `getwalletinfo` àti pé àwọn RPC tí a fi ránṣẹ́ jẹ́ ti Zallet (tàbí àpò owó mìíràn), kìí ṣe sí ojú-ọ̀nà ìfohùnṣọ̀kan.

**Bẹ̀rẹ̀ Zallet kí Zebra tó dé `/ready`.** Zallet yoo tun bẹrẹ-loop. Lo `scripts/check-zebra-readiness.sh` lórí mainnet/testnet.

**Ṣíṣe àyẹ̀wò ìṣàyẹ̀wò `zebra`/`zebra` sí orí mainnet.** Auth kuki ni aiyipada mainnet/testnet fun idi kan.

**Ṣíṣe àyẹ̀wò Zaino gẹ́gẹ́ bí nódù pípé.** Zebra (tàbí Zakura) jẹ́rìí sí i. Àwọn àtọ́ka Zaino.

**Ṣíṣí àfihàn Zaino JSON-RPC tàbí Zebra indexer gRPC ní gbangba.** Àwọn ìparí wọ̀nyẹn wà fún loopback tàbí nẹ́tíwọ́ọ̀kì àdáni tí a gbẹ́kẹ̀lé.

**Mo gbà pé gbogbo àpò owó aláfẹ́fẹ́ ti ń sọ̀rọ̀ Zaino.** Ṣàyẹ̀wò ìtújáde àpò owó náà ní ìbámu pẹ̀lú ìlànà tí ó ń lò.

---

## Àwọn ojú ìwé tó jọra

* [Ìdìpọ̀ Z3](/zcash-tech/z3-stack) - fi sori ẹrọ, awọn ebute oko oju omi, awọn iwọn didun, bata ipele meji
* [Zaino](/zcash-tech/zaino) - ipa atọka ati awọn akọsilẹ oniṣẹ
* [Àwọn Nódù Kíkún](/zcash-tech/full-nodes)
* [Kún Node Àmì Zebra](/zcash-tech/zebra-full-node)
* [Àwọn Nódù Àpò Ìmọ́lẹ̀](/zcash-tech/lightwallet-nodes)
* [Ìtọ́sọ́nà Ìṣípòpadà: zcashd sí Zebrad/Zallet](/guides/migration-guide-zcashd-to-zebrad-zallet)
* [Ìkẹ́kọ̀ọ́ Zingolib àti Zaino](/guides/zingolib-and-zaino-tutorial)

## Àwọn ohun àlùmọ́nì

* [Ibi ipamọ Z3](https://github.com/ZcashFoundation/z3)
* [Ìwé oúnjẹ ìṣàyẹ̀wò Z3 (ìdìpọ̀ / grpcurl)](https://github.com/ZcashFoundation/z3/blob/main/docs/regtest.md)
* [Awọn ibeere ti a maa n beere nigbagbogbo nipa Z3](https://github.com/ZcashFoundation/z3/blob/main/docs/faq.md)
* [Zebra](https://zebra.zfnd.org/)
* [Zaino](https://github.com/zingolabs/zaino)
* [Zallet Book](https://zcash.github.io/zallet/)
* [Ztreamer](https://github.com/distractedm1nd/ztreamer)

**Ìmúdàgba ìkẹyìn:** Oṣù Kẹsàn 2026
