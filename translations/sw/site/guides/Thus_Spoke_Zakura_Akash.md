# Hivyo Ndivyo Alivyosema Zakura kwenye Akash (Regtest)

Endesha rundo la **Thus Spoke Zakura v0.4.1** kwenye Akash: Zakura Regtest, lightwalletd na dashibodi ya pochi / HTTP API. Sarafu za majaribio hazina thamani. Usitume ZEC za mainnet hapa.

Kiolezo: [awesome-akash/thus-spoke-zakura](https://github.com/akash-network/awesome-akash/tree/master/thus-spoke-zakura)

Chanzo cha awali: [zcashlabs/thus-spoke-zakura](https://github.com/zcashlabs/thus-spoke-zakura) lebo **v0.4.1**

### Picha

| Huduma | Picha |
| --- | --- |
| Dashibodi + API (`app`) | `ghcr.io/zcashlabs/thus-spoke-zakura-app:0.4.1` |
| lightwalletd | `ghcr.io/zcashlabs/thus-spoke-zakura-lightwalletd:0.4.1` |
| Zakura | `zakuracore/zakura:1.6.0` (imefungwa kwenye kizindua cha 0.4.1) |

### Uanzishaji wa awali wa kiotomatiki

Inapoanzishwa kwa mara ya kwanza, kontena la `app` huendesha `ths-server init` kwenye hifadhi yake endelevu, kisha `ths-server serve`. Huduma hujaribu tena hadi Zakura JSON-RPC na lightwalletd ziwe zimewashwa. Huhitaji kuendesha `ths` kwenye mtoa huduma; SDL ndiyo mazingira ya utekelezaji.

### Jinsi Akash huchapisha milango

Milango ya SDL `port` / `as` ni milango ya **kontena**. Programu husikiliza kwenye **8080** (`THS_LISTEN`); lightwalletd kwenye **9067**; RPC ya Zakura kwenye **18232** na P2P kwenye **18233**. Ndani ya deployment, huduma tayari hutumia milango hiyo (`http://zakura:18232`, `http://lightwalletd:9067`).

**Si** milango kwenye IP ya umma ya mtoa huduma.

**Chaguomsingi (kiolezo hiki):** hakuna IP maalumu.

| Huduma | Mlango wa kusikilizia wa kontena | SDL `as` | Jinsi inavyoonekana kwenye lease |
| --- | --- | --- | --- |
| `app` (dashibodi + HTTP API) | 8080 | 80 (HTTP) | Jina la mwenyeji la ingress, mara nyingi kwenye 80/443 — **fungua URI hii kwenye kivinjari** |
| `lightwalletd` | 9067 | 9067 (TCP, ya jumla) | `host:&lt;random-high-port&gt;` |
| RPC ya `zakura` | 18232 | 18232 (TCP, ya jumla) | `host:&lt;random-high-port&gt;` |
| P2P ya `zakura` | 18233 | 18233 (TCP, ya jumla) | `host:&lt;random-high-port&gt;` |

Baada ya lease kuwa tayari, **Leases → URIs** ndiyo chanzo sahihi cha taarifa. Fungua URI ya **`app`** kwa dashibodi (UI ileile ambayo `ths` hufungua kwenye kifaa chako). Elekeza wateja wepesi kwenye URI ya **lightwalletd** (`THS_LIGHTWALLETD_TLS=false`). Usiweke `:8080`, `:80` au `:9067` kwenye IP ya mtoa huduma isipokuwa lease ya IP maalumu imefanya milango hiyo ipatikane kwa umma.

**IP maalumu** (`endpoints` / `kind: ip`) ni huduma ya ziada ya kulipia na **haijajumuishwa** kwenye kiolezo hiki. Inaweza kuweka IP ya umma isiyobadilika na wakati mwingine mlango wa `as`. Iache ikiwa imezimwa isipokuwa uihitaji.

### Tovuti ya kutumia (malipo)

SDL ni ileile. UI mbili za wavuti za Akash hutofautiana katika **jinsi ya kulipa**.

| Tovuti | Malipo | Pochi |
| --- | --- | --- |
| [console.akash.network](https://console.akash.network) | Malipo ya kawaida kupitia tovuti (kadi / njia za malipo ya fedha za kawaida zinazotolewa na Console) | Akaunti ya Console |
| [air.akash.network](https://air.akash.network) | Malipo ya asili kwenye mnyororo wa Akash (AKT / ACT) | **Keplr** |

Tumia **Air** unapotaka kulipa kwa Keplr kwenye mnyororo. Tumia **Console** unapotaka kufanya malipo ya kawaida kupitia tovuti.

### Weka kwenye deployment

**Malipo ya wavuti (Console)**

[![Deploy on Akash Console](https://raw.githubusercontent.com/akash-network/console/refs/heads/main/apps/deploy-web/public/images/deploy-with-akash-btn.svg)](https://console.akash.network/new-deployment?step=edit-deployment&templateId=akash-network-awesome-akash-thus-spoke-zakura)

**Malipo ya asili ya Akash kwa kutumia Keplr (Air)**

[Fungua kiolezo hiki kwenye Air](https://air.akash.network/new-deployment?step=edit-deployment&templateId=akash-network-awesome-akash-thus-spoke-zakura)

Unda deployment kutoka kwenye kiolezo, kubali zabuni, subiri hadi kumbukumbu za `app` zionyeshe kuwa `ths-server serve` inaendelea kufanya kazi, kisha fungua **URI ya `app`** kwa dashibodi.

### Vinavyohusiana

- [Zakura kwenye Akash](/guides/akash-network-zakura) — node ya uthibitishaji ya Mainnet/Testnet
- [Zebra kwenye Akash](/guides/akash-network-zebra)
- Kitabu: [github.com/zcashlabs/thus-spoke-zakura/tree/main/book](https://github.com/zcashlabs/thus-spoke-zakura/tree/main/book)
