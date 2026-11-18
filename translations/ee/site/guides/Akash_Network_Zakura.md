# Zakura ŋu Akash Network dzi ale si

**Zakura** Zcash full node si wɔwɔ na wòakpɔ mɔ si wòato ɖe edzi, kple [awesome-akash zcash-zakura](https://github.com/akash-network/awesome-akash/tree/master/zcash-zakura) template.

Zakura nye gbegbɔgblɔ ɖi ƒe Zcash node si wòate ŋu awɔ dɔ kple ɣaɣla dzesi ŋɔŋlɔ (wòtsɔe ɖe tso Zebra), si ƒe sync ƒuƒoƒo le bɔbɔe, eɖoa pruning le eŋu, eye snapshot kple bootstrap le eŋu. Template sia ɖoa **`zakuracore/zakura:1.8.1`** (digest-pinned; mèzã `:latest` alo `1.1.1` o).

### Nu si wòakpɔ

- Mainnet P2P: container **8233**, wòɖe eƒe mɔ na amewo le xexeme blibo me (kpɔ port mapping si le anyi)
- Pruned state si wòalé ɖe te (64 GiB si wotsɔ da ɖi) kple Valar snapshot bootstrap le gɔmedzedze gbãtɔ me
- Prometheus **9999** kple ŋusẽdzikpɔkpɔ **8080** (internal, public URI mele o)
- JSON-RPC **8232** internal na **lightwalletd** si wole anyigba ɖeka dzi; LWD se nya le container **9067** dzi eye wòɖe eƒe mɔ na amewo le xexeme blibo me

Feature flags le SDL me (true/false): `ENABLE_METRICS`, `ENABLE_HEALTH`, `ENABLE_RPC`, `ENABLE_LIGHTWALLETD`. Ne lightwalletd le dɔ wɔm la, cookie auth mele dɔ wɔm o, elabena lightwalletd mate ŋu axlẽ cookie files o.

### Site kae wòazã (fexexe)

SDL enye ɖeka. Akash web UI eve la to vovototo le **ale si nàxe asi na fexexe** me.

| Site | Fexexe | Gakotoku |
| --- | --- | --- |
| [console.akash.network](https://console.akash.network) | Web checkout si te ɖe ɖoɖo dedie dzi (ka / fiat mɔ si Console na) | Console account |
| [air.akash.network](https://air.akash.network) | Akash ɖoɖonu dzi fexexe (AKT / ACT) | **Keplr** |

Zã **Air** ne èdi be nàxe asi na fexexe kple Keplr ɖoɖonu dzi. Zã **Console** ne èdi web fexexe mɔ si wòwɔna ɖe ɖoɖo dedie dzi. Mèbu be Keplr native settlement le Console o.

### Deploy

**Web fexexe (Console)**

[![Deploy on Akash Console](https://raw.githubusercontent.com/akash-network/console/refs/heads/main/apps/deploy-web/public/images/deploy-with-akash-btn.svg)](https://console.akash.network/new-deployment?step=edit-deployment&templateId=akash-network-awesome-akash-zcash-zakura)

**Akash fexexe si wɔna kple Keplr (Air)**

[Open this template on Air](https://air.akash.network/new-deployment?step=edit-deployment&templateId=akash-network-awesome-akash-zcash-zakura)

1. Ɖe link si sɔ kple wò la (Console alo Air) ɖe.
2. Le Air dzi la, connect **Keplr** eye kpɔe be AKT/ACT le asiwò hena deposit kple lease. Le Console dzi la, wu web checkout si UI ɖe wò.
3. Ɖe `zcash-zakura/deploy.yaml` ɖe eme ne womeɖo eme ɖi hafi o.
4. Deposit, lɔ bid, eye lɔ̃ lease.
5. Logs axɔ snapshot download (le gɔmedzedze gbãtɔ me) emegbe `zakurad start`.
6. Ɖe **Leases → URIs**. Zã host:port si provider de asi na wò, menye 8233 alo 9067 le public IP dzi o.

### Ale si Akash tsɔa portwo ɖea le mɔ

SDL `port` / `as` (8233, 9067, 8232) nye **container** portwo. Zakura le se nya le 8233 dzi; lightwalletd le 9067 dzi; RPC le 8232 dzi na LWD sidecar (`zakura:8232`).

Menye port siwo le provider ƒe public IP dzi o.

**Si wòle ɖi:** dedicated IP mele eme o. TCP expose ɖesiaɖe si `global: true` wòɖoa ɖe **port si le dzi kplikpaa si womeɖo ɖi o** dzi le provider host si wogana ame geɖe. Console/Air tsɔa wo ɖea le lease URIs me, abe:

```
zakura-8233: provider.example:31482
lightwalletd-9067: provider.example:32011
```

Peerwo bia **8233** URI (`provider.example:31482`). Compact walletwo zãa **9067** URI (TLS ɖe dɔ me o, ne mèwɔ TLS termination ɖe ŋuwò o). Ɖo `ZAKURA_NETWORK__EXTERNAL_ADDR` ɖe P2P URI si wotsɔe mapped, menye `:8233` o.

**Internal** exposes (`8232` RPC, `9999` metrics, `8080` health) anɔ deployment network la me. Public URI mele o.

**Dedicated IPwo** (`endpoints` / `kind: ip`) nye ga-tsɔtsɔ bubu eye womeɖoe template sia me o. Wate ŋu ado public IP ɖe te eye zi aɖewo me port `as`. Tsɔe kpe ɖe eme ko ne èhiã be nàkpɔ `host:8233` si meɖea asi o.

### Archive alo pruned

Si wòle ɖi la nye **pruned** (~11 GiB snapshot, 64 GiB disk). Ne èdi be nàkpɔ abakɔsɛm blibo la, ɖo `SNAPSHOT_KIND=archive`, ɖo disk ɖe 350 GiB alo edzi, eye ɖo `ZAKURA_STATE__STORAGE_MODE=archive`.

### Ɖevi siwo sɔ kple esia

- [Zebra le Akash](/guides/akash-network-zebra) dzi — Zcash Foundation `zebrad` (abakɔsɛm blibo, snapshot mele eme o)
- [Thus Spoke Zakura le Akash](/guides/thus-spoke-zakura-akash) dzi — Regtest ɖoɖowo ƒuƒopé kple app (v0.4.1)
- Zakura source: [github.com/zakura-core/zakura](https://github.com/zakura-core/zakura)
- Snapshots: [zakura.com/snapshots/](https://zakura.com/snapshots/)
