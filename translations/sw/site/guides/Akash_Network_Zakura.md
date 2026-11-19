# Jinsi ya kuendesha Zakura kwenye Mtandao wa Akash

Mwongozo wa hatua kwa hatua wa kutumia full node ya Zakura Zcash kwa kutumia kiolezo cha [awesome-akash zcash-zakura](https://github.com/akash-network/awesome-akash/tree/master/zcash-zakura).

Zakura ni node ya Zcash inayooana na makubaliano (iliyotokana na Zebra), yenye usawazishaji wa haraka zaidi, upunguzaji wa data uliojengewa ndani na uanzishaji kutoka kwenye snapshot. Kiolezo hiki hubainisha **`zakuracore/zakura:1.8.1`** (digest imebainishwa; usitumie `:latest` au `1.1.1`).

### Unachopata

- Mainnet P2P: kontena **8233**, iliyochapishwa duniani kote (tazama upangaji wa milango hapa chini)
- Hali endelevu iliyopunguzwa (64 GiB kwa chaguo-msingi) pamoja na uanzishaji kutoka kwenye snapshot ya Valar wakati wa kuwasha mara ya kwanza
- Prometheus **9999** na hali ya afya **8080** (za ndani, hakuna URI ya umma)
- JSON-RPC **8232** ya ndani kwa ajili ya **lightwalletd** iliyo pamoja nayo; LWD husikiliza kwenye kontena **9067** na huchapishwa duniani kote

Alama za vipengele katika SDL (true/false): `ENABLE_METRICS`, `ENABLE_HEALTH`, `ENABLE_RPC`, `ENABLE_LIGHTWALLETD`. Uthibitishaji wa cookie umezimwa wakati lightwalletd imewashwa, kwa sababu lightwalletd haiwezi kusoma faili za cookie.

### Tovuti ipi ya kutumia (malipo)

SDL ni ileile. Kiolesura cha wavuti cha Akash hizi mbili hutofautiana kwa **jinsi unavyolipa**.

| Tovuti | Malipo | Pochi |
| --- | --- | --- |
| [console.akash.network](https://console.akash.network) | Malipo ya kawaida ya wavuti (kadi / njia za malipo za fiat zinazotolewa na Console) | Akaunti ya Console |
| [air.akash.network](https://air.akash.network) | Malipo ya asili ya mnyororo wa Akash (AKT / ACT) | **Keplr** |

Tumia **Air** unapotaka kulipa kwa Keplr kupitia on-chain. Tumia **Console** unapotaka mchakato wa kawaida wa malipo ya wavuti. Usitarajie malipo ya asili ya Keplr kwenye Console.

### Tekeleza

**Malipo ya wavuti (Console)**

[![Deploy on Akash Console](https://raw.githubusercontent.com/akash-network/console/refs/heads/main/apps/deploy-web/public/images/deploy-with-akash-btn.svg)](https://console.akash.network/new-deployment?step=edit-deployment&templateId=akash-network-awesome-akash-zcash-zakura)

**Malipo ya asili ya Akash kwa kutumia Keplr (Air)**

[Fungua kiolezo hiki kwenye Air](https://air.akash.network/new-deployment?step=edit-deployment&templateId=akash-network-awesome-akash-zcash-zakura)

1. Fungua kiungo kinacholingana hapo juu (Console au Air).
2. Kwenye Air, unganisha **Keplr** na uhakikishe una AKT/ACT za kuweka amana na kukodisha. Kwenye Console, kamilisha malipo ya wavuti yanayoonyeshwa na kiolesura.
3. Pakia `zcash-zakura/deploy.yaml` ikiwa bado haijajazwa.
4. Weka amana, kubali zabuni, kisha subiri ukodishaji.
5. Kumbukumbu zinapaswa kuonyesha upakuaji wa snapshot (wakati wa kuwasha mara ya kwanza), kisha `zakurad start`.
6. Fungua **Ukodishaji → URI**. Tumia host:port aliyokupa mtoa huduma, si 8233 au 9067 kwenye IP ya umma.

### Jinsi Akash huchapisha milango

Milango ya SDL `port` / `as` (8233, 9067, 8232) ni milango ya **kontena**. Zakura bado husikiliza kwenye 8233; lightwalletd kwenye 9067; RPC kwenye 8232 kwa sidecar ya LWD (`zakura:8232`).

Hizi **si** milango kwenye IP ya umma ya mtoa huduma.

**Chaguo-msingi (kiolezo hiki):** hakuna IP maalum. Kila ufichuaji wa TCP wa `global: true` hupangiwa **mlango wa juu wa nasibu** kwenye host ya pamoja ya mtoa huduma. Console/Air huorodhesha milango hiyo kama URI za ukodishaji, kwa mfano:

```
zakura-8233: provider.example:31482
lightwalletd-9067: provider.example:32011
```

Vifaa rika huunganisha kwenye URI ya **8233** (`provider.example:31482`). Pochi za kompakt hutumia URI ya **9067** (TLS imezimwa isipokuwa uisimamishe mwenyewe). Weka `ZAKURA_NETWORK__EXTERNAL_ADDR` iwe URI ya P2P iliyopangiwa, si `:8233`.

Milango ya **ndani** iliyofichuliwa (RPC ya `8232`, vipimo vya `9999`, hali ya afya ya `8080`) hubaki kwenye mtandao wa utumaji. Hakuna URI ya umma.

**IP maalum** (`endpoints` / `kind: ip`) ni huduma ya ziada ya kulipia na **haijajumuishwa** kwenye kiolezo hiki. Zinaweza kubainisha IP ya umma na wakati mwingine mlango wa `as`. Ongeza hilo tu ikiwa unahitaji `host:8233` thabiti.

### Kumbukumbu kamili dhidi ya zilizopunguzwa

Chaguo-msingi ni **zilizopunguzwa** (snapshot ya takriban 11 GiB, diski ya 64 GiB). Ili kuhifadhi historia kamili, weka `SNAPSHOT_KIND=archive`, ongeza nafasi ya diski hadi angalau 350 GiB, na uweke `ZAKURA_STATE__STORAGE_MODE=archive`.

### Zinazohusiana

- [Zebra kwenye Akash](/guides/akash-network-zebra) — Zcash Foundation `zebrad` (historia kamili, bila snapshot)
- [Thus Spoke Zakura kwenye Akash](/guides/thus-spoke-zakura-akash) — Dashibodi ya Regtest + programu (v0.4.1)
- Zakura chanzo: [github.com/zakura-core/zakura](https://github.com/zakura-core/zakura)
- Snapshots: [zakura.com/snapshots/](https://zakura.com/snapshots/)
