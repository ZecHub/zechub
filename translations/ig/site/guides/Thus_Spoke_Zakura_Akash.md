# Otu a ka Zakura si kwuo na Akash (Regtest)

Gbaa stack **Thus Spoke Zakura v0.4.1** na Akash: Zakura Regtest, lightwalletd, na **dashboard / HTTP API** nke e-akpa ego. Mkpụrụ ego nnwale enweghị uru. Ezipụla ZEC mainnet ebe a.

Ụdị ndebiri: [awesome-akash/thus-spoke-zakura](https://github.com/akash-network/awesome-akash/tree/master/thus-spoke-zakura)

Isi mmalite: [zcashlabs/thus-spoke-zakura](https://github.com/zcashlabs/thus-spoke-zakura) akara **v0.4.1**

### Foto

| Ọrụ | Foto |
| --- | --- |
| Dashboard + API (`app`) | `ghcr.io/zcashlabs/thus-spoke-zakura-app:0.4.1` |
| lightwalletd | `ghcr.io/zcashlabs/thus-spoke-zakura-lightwalletd:0.4.1` |
| Zakura | `zakuracore/zakura:1.6.0` (etinyere ntụtụ a n'ime onye na-ebido 0.4.1) |

### Mbido onwe ya

Mgbe `app` container malitere nke mbụ, ọ na-agba `ths-server init` na olu nchekwa ya na-adịgide adịgide, emesịa `ths-server serve`. Serve na-anwale ọzọ ruo mgbe Zakura JSON-RPC na lightwalletd malitere ịrụ ọrụ. Ị gaghị agba `ths` na provider; SDL bụ gburugburu oge ịrụ ọrụ.

### Otu Akash si ebipụta ọdụ ụgbọ mmiri

Ọdụ ụgbọ mmiri SDL `port` / `as` bụ ọdụ ụgbọ mmiri **container**. Ngwa ahụ na-ege ntị na **8080** (`THS_LISTEN`); lightwalletd na **9067**; RPC Zakura na **18232**, P2P na **18233**. N'ime deployment ahụ, ọrụ na-eji ndị ahụ ugbua (`http://zakura:18232`, `http://lightwalletd:9067`).

Ha **abụghị** ọdụ ụgbọ mmiri dị na IP ọha nke provider.

**Ntọala mbụ (ụdị ndebiri a):** enweghị IP pụrụ iche.

| Ọrụ | Ọdụ container na-ege ntị na ya | SDL `as` | Otu o si apụta na lease |
| --- | --- | --- | --- |
| `app` (dashboard + HTTP API) | 8080 | 80 (HTTP) | Aha nnabata ingress, na-abụkarị na 80/443 — **mepee URI a na browser** |
| `lightwalletd` | 9067 | 9067 (TCP, zuru ụwa ọnụ) | `host:&lt;random-high-port&gt;` |
| RPC `zakura` | 18232 | 18232 (TCP, zuru ụwa ọnụ) | `host:&lt;random-high-port&gt;` |
| P2P `zakura` | 18233 | 18233 (TCP, zuru ụwa ọnụ) | `host:&lt;random-high-port&gt;` |

Mgbe lease dị njikere, **Leases → URIs** bụ ebe a ga-enweta ozi ziri ezi. Mepee URI **`app`** maka dashboard (otu UI ahụ ka `ths` na-emepe na kọmputa gị). Tọọ URI **lightwalletd** maka ndị ahịa compact (`THS_LIGHTWALLETD_TLS=false`). Edebanyela `:8080`, `:80`, ma ọ bụ `:9067` na IP provider ma ọ bụrụ na lease IP pụrụ iche emebeghị ka ọdụ ụgbọ mmiri ndị ahụ bụrụ ọha.

**IP pụrụ iche** (`endpoints` / `kind: ip`) bụ mgbakwunye a na-akwụ ụgwọ, ọ dịghịkwa n'ụdị ndebiri a. Ha nwere ike kegide IP ọha, mgbe ụfọdụkwa ọdụ ụgbọ mmiri `as`. Hapụ ha ka agbanyụghị ma ọ bụrụ na ịchọghị ha.

### Saịtị ị ga-eji (ịkwụ ụgwọ)

SDL bụ otu. UI web abụọ nke Akash dị iche n’ụzọ **ị ga-esi kwụọ ụgwọ**.

| Saịtị | Ịkwụ ụgwọ | E-akpa ego |
| --- | --- | --- |
| [console.akash.network](https://console.akash.network) | Ịkwụ ụgwọ web ọdịnala (kaadị / usoro ego nkịtị Console na-enye) | Akaụntụ Console |
| [air.akash.network](https://air.akash.network) | Ịkwụ ụgwọ na chain Akash (AKT / ACT) | **Keplr** |

Jiri **Air** mgbe ịchọrọ iji Keplr kwụọ ụgwọ na on-chain. Jiri **Console** mgbe ịchọrọ usoro ịkwụ ụgwọ web a na-emebu.

### Deploy

**Ịkwụ ụgwọ web (Console)**

[![Deploy on Akash Console](https://raw.githubusercontent.com/akash-network/console/refs/heads/main/apps/deploy-web/public/images/deploy-with-akash-btn.svg)](https://console.akash.network/new-deployment?step=edit-deployment&templateId=akash-network-awesome-akash-thus-spoke-zakura)

**Ịkwụ ụgwọ Akash na Keplr (Air)**

[Mepee ụdị ndebiri a na Air](https://air.akash.network/new-deployment?step=edit-deployment&templateId=akash-network-awesome-akash-thus-spoke-zakura)

Mepụta deployment site na ụdị ndebiri ahụ, nabata bid, chere ruo mgbe log `app` gosiri na `ths-server serve` ka na-arụ ọrụ, mgbe ahụ mepee **URI `app`** maka dashboard.

### Ihe ndị metụtara ya

- [Zakura na Akash](/guides/akash-network-zakura) — Node na-akwado Mainnet/Testnet
- [Zebra na Akash](/guides/akash-network-zebra)
- Akwụkwọ: [github.com/zcashlabs/thus-spoke-zakura/tree/main/book](https://github.com/zcashlabs/thus-spoke-zakura/tree/main/book)
