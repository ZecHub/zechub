# Thus Spoke Zakura ŋuti Akash (Regtest)

Zã **Thus Spoke Zakura v0.4.1** stack la ɖe Akash dzi: Zakura Regtest, lightwalletd, kple gakotoku ɖoɖowo ƒuƒopé / HTTP API. Test sika mele ŋudɔ aɖeke o. Màɖo mainnet ZEC ɖe afii o.

Template: [awesome-akash/thus-spoke-zakura](https://github.com/akash-network/awesome-akash/tree/master/thus-spoke-zakura)

Upstream: [zcashlabs/thus-spoke-zakura](https://github.com/zcashlabs/thus-spoke-zakura) tag **v0.4.1**

### Nɔnɔmetatawo

| Dɔwɔƒe | Nɔnɔmetata |
| --- | --- |
| ɖoɖowo ƒuƒopé + API (`app`) | `ghcr.io/zcashlabs/thus-spoke-zakura-app:0.4.1` |
| lightwalletd | `ghcr.io/zcashlabs/thus-spoke-zakura-lightwalletd:0.4.1` |
| Zakura | `zakuracore/zakura:1.6.0` (0.4.1 launcher me ʋu compiled) |

### Eɖokui-ɖoɖo

Ne wò ɖoɖo la ƒe ŋkeke gbãtɔ me la, `app` container la zã `ths-server init` le eƒe persistent volume dzi, emegbe `ths-server serve`. Serve la trɔna le eme va se ɖe esime Zakura JSON-RPC kple lightwalletd va dze dɔ. Mèle be nàzã `ths` le provider la dzi o; SDL la nye runtime.

### Ale si Akash ɖea portwo ɖe anyi

SDL `port` / `as` nye **container** portwo. App la ɖea dɔ le **8080** (`THS_LISTEN`); lightwalletd le **9067**; Zakura RPC le **18232** eye P2P le **18233**. Le deployment la me la, dɔwɔƒewo zã wo dometɔwo (`http://zakura:18232`, `http://lightwalletd:9067`).

Wo menye port siwo le provider ƒe public IP dzi o.

**Default (template sia):** dedicated IP mele eme o.

| Dɔwɔƒe | Container ƒe port | SDL `as` | Ale si wòtsɔna ɖe lease la dzi |
| --- | --- | --- | --- |
| `app` (ɖoɖowo ƒuƒopé + HTTP API) | 8080 | 80 (HTTP) | Ingress hostname, zi geɖe le 80/443 — **ʋu URI sia le browser me** |
| `lightwalletd` | 9067 | 9067 (TCP, global) | `host:&lt;random-high-port&gt;` |
| `zakura` RPC | 18232 | 18232 (TCP, global) | `host:&lt;random-high-port&gt;` |
| `zakura` P2P | 18233 | 18233 (TCP, global) | `host:&lt;random-high-port&gt;` |

Ne lease la ƒo ha nu la, **Leases → URIs** nye nyateƒe si wòle be nàtsɔ. Ɖe **`app`** URI la ʋu na ɖoɖowo ƒuƒopé la (UI ma ke si `ths` ʋuna le teƒe sia). Ɖe compact clients ŋu be woazã **lightwalletd** URI la (`THS_LIGHTWALLETD_TLS=false`). Màŋlɔ `:8080`, `:80` alo `:9067` ɖe provider IP dzi o, negbe ne dedicated IP lease de port siawo ɖe public o ha la.

**Dedicated IPs** (`endpoints` / `kind: ip`) nye nudzɔɖeɖe bɔbɔe aɖe, eye womele template sia me o. Wòate ŋu atsi public IP ɖe te, eye ɣeyiɣi aɖewo me la `as` port hã. Ɖe wo ɖi ɖe te, negbe ne ehia wò o.

### Site kae nàzã (fexexe)

SDL la le ɖeka. Akash web UI evea to **ale si nàxe** la me le wo dome.

| Site | Fexexe | Gakotoku |
| --- | --- | --- |
| [console.akash.network](https://console.akash.network) | Web checkout xoxo (card / fiat mɔ siwo Console na) | Console account |
| [air.akash.network](https://air.akash.network) | Akash ɖoɖonu fexexe si wòawɔ eɖokui (AKT / ACT) | **Keplr** |

Zã **Air** ne èdi be nàxe le Keplr ɖoɖonu dzi. Zã **Console** ne èdi web fexexe mɔ xoxo.

### ɖoɖoɖeɖe

**Web fexexe (Console)**

[![Deploy on Akash Console](https://raw.githubusercontent.com/akash-network/console/refs/heads/main/apps/deploy-web/public/images/deploy-with-akash-btn.svg)](https://console.akash.network/new-deployment?step=edit-deployment&templateId=akash-network-awesome-akash-thus-spoke-zakura)

**Akash fexexe si wòawɔ eɖokui kple Keplr (Air)**

[Ŋlɔ template sia ɖe Air](https://air.akash.network/new-deployment?step=edit-deployment&templateId=akash-network-awesome-akash-thus-spoke-zakura)

Wɔ deployment la tso template la me, lɔ̃ bid ɖeka, lala va se ɖe esime `app` logs la fia be `ths-server serve` le dɔ wɔm ɖe te, eye emegbe ʋu **`app` URI** la na ɖoɖowo ƒuƒopé.

### Etsɔ kpee

- [Zakura le Akash](/guides/akash-network-zakura) — Mainnet/Testnet validating ɣaɣla dzesi ŋɔŋlɔ
- [Zebra le Akash](/guides/akash-network-zebra)
- Agbalẽ: [github.com/zcashlabs/thus-spoke-zakura/tree/main/book](https://github.com/zcashlabs/thus-spoke-zakura/tree/main/book)
