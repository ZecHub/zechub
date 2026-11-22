# Otu esi agba Zakura na Netwọk Akash

Nzọụkwụ site na mmalite ruo n’ọgwụgwụ maka full node Zcash Zakura nke na-eji template [awesome-akash zcash-zakura](https://github.com/akash-network/awesome-akash/tree/master/zcash-zakura).

Zakura bụ node Zcash nke kwekọrọ na consensus (e si na Zebra kewaa ya), nke na-eme sync ngwa ngwa, na-akwụsị idebe data ochie n’ime node n’onwe ya, ma na-amalite site na snapshot. Template a na-akpọchi ụdị `zakuracore/zakura:1.8.1` (a kpọchiri digest ya; ejikwala `:latest` ma ọ bụ `1.1.1`).

### Ihe ị ga-enweta

- Mainnet P2P: container **8233**, nke a na-ebipụta n’ụwa niile (lee nhazi port n’okpuru)
- Ọnọdụ pruned na-adịgide adịgide (ndabara 64 GiB) nke na-eji Valar snapshot amalite na mbido mbụ
- Prometheus **9999** na health **8080** (n’ime, enweghị URI ọha)
- JSON-RPC **8232** dị n’ime maka **lightwalletd** nke ya na ya nọ; LWD na-ege ntị na container **9067**, a na-ebipụtakwa ya n’ụwa niile

Ọkọlọtọ njirimara na SDL (eziokwu/ụgha): `ENABLE_METRICS`, `ENABLE_HEALTH`, `ENABLE_RPC`, `ENABLE_LIGHTWALLETD`. A naghị eji cookie auth mgbe lightwalletd dị, n’ihi na lightwalletd enweghị ike ịgụ faịlụ cookie.

### Ebe ị ga-eji (ịkwụ ụgwọ)

SDL bụ otu ihe ahụ. UI web Akash abụọ ahụ dị iche n’ụzọ **ị si akwụ ụgwọ**.

| Ebe | Ịkwụ ụgwọ | E-akpa ego |
| --- | --- | --- |
| [console.akash.network](https://console.akash.network) | Ịkwụ ụgwọ web ọdịnala (kaadị / ụzọ fiat Console na-enye) | Akaụntụ Console |
| [air.akash.network](https://air.akash.network) | Ịkwụ ụgwọ chain Akash nke aka ya (AKT / ACT) | **Keplr** |

Jiri **Air** mgbe ịchọrọ iji Keplr kwụọ ụgwọ on-chain. Jiri **Console** mgbe ịchọrọ usoro ịkwụ ụgwọ web nke ọdịnala. Atụla anya na Keplr ga-emecha ịkwụ ụgwọ n’onwe ya na Console.

### Mepụta

**Ịkwụ ụgwọ web (Console)**

[![Deploy on Akash Console](https://raw.githubusercontent.com/akash-network/console/refs/heads/main/apps/deploy-web/public/images/deploy-with-akash-btn.svg)](https://console.akash.network/new-deployment?step=edit-deployment&templateId=akash-network-awesome-akash-zcash-zakura)

**Ịkwụ ụgwọ chain Akash nke aka ya na Keplr (Air)**

[Mepee template a na Air](https://air.akash.network/new-deployment?step=edit-deployment&templateId=akash-network-awesome-akash-zcash-zakura)

1. Mepee njikọ kwekọrọ n’elu (Console ma ọ bụ Air).
2. Na Air, jikọọ **Keplr** ma kwenye na ị nwere AKT/ACT maka nkwụnye ego na lease. Na Console, mechaa ịkwụ ụgwọ web nke UI gosiri.
3. Tinye `zcash-zakura/deploy.yaml` ma ọ bụrụ na etinyebeghị ya.
4. Tinye nkwụnye ego, nabata bid, chere ka lease malite.
5. Log kwesịrị igosi nbudata snapshot (na mbido mbụ), emesịa `zakurad start`.
6. Mepee **Leases → URIs**. Jiri host:port nke provider kenyere, ọ bụghị 8233 ma ọ bụ 9067 na IP ọha.

### Otu Akash si ebipụta ports

Ports SDL `port` / `as` (8233, 9067, 8232) bụ ports **container**. Zakura ka na-ege ntị na 8233; lightwalletd na 9067; RPC na 8232 maka LWD sidecar (`zakura:8232`).

Ha **abụghị** ports dị na IP ọha nke provider.

**Ntọala ndabara (template a):** enweghị IP pụrụ iche. A na-ejikọta expose TCP `global: true` nke ọ bụla na **port dị elu a họpụtara na mberede** na host provider nke ọtụtụ ndị na-ekekọrịta. Console/Air na-edepụta ha dị ka lease URIs, dịka ọmụmaatụ:

```
zakura-8233: provider.example:31482
lightwalletd-9067: provider.example:32011
```

Peers na-akpọ URI **8233** (`provider.example:31482`). E-akpa ego compact na-eji URI **9067** (TLS agbanyụghị ọ gwụla ma unu onwe unu hazie njedebe TLS). Tọọ `ZAKURA_NETWORK__EXTERNAL_ADDR` ka ọ bụrụ URI P2P e jikọtara, ọ bụghị `:8233`.

Exposes **nke ime** (`8232` RPC, `9999` metrics, `8080` health) na-anọgide na netwọk deployment. Enweghị URI ọha.

**IP pụrụ iche** (`endpoints` / `kind: ip`) bụ mgbakwunye a na-akwụ ụgwọ, ọ dịghịkwa na template a. Ha nwere ike ijide IP ọha na mgbe ụfọdụ port `as`. Tinye nke ahụ naanị ma ọ bụrụ na ịchọrọ `host:8233` kwụsiri ike.

### Archive na pruned

Ndabara bụ **pruned** (snapshot dị ihe dị ka 11 GiB, disk 64 GiB). Maka akụkọ ihe mere eme zuru ezu, tọọ `SNAPSHOT_KIND=archive`, welie disk ka ọ bụrụ 350 GiB ma ọ bụ karịa, ma tọọ `ZAKURA_STATE__STORAGE_MODE=archive`.

### Ihe metụtara ya

- [Zebra na Akash](/guides/akash-network-zebra) — Zcash Foundation `zebrad` (akụkọ ihe mere eme zuru ezu, enweghị snapshot)
- [Thus Spoke Zakura na Akash](/guides/thus-spoke-zakura-akash) — Dashboard Regtest + ngwa (v0.4.1)
- Zakura isi mmalite: [github.com/zakura-core/zakura](https://github.com/zakura-core/zakura)
- Snapshots: [zakura.com/snapshots/](https://zakura.com/snapshots/)
