# Zcash Nduzi Onye Mmepụta JS

**zcash.js** (`@zcashlabs/zcash.js`) bụ SDK TypeScript/JavaScript nnwale nke Zcash Labs wepụtara na 26 Ọktoba 2026. Ọ na-enye ndị mmepụta ohere iwulite e-akpa ego [wallets], light client, dashboard, na ngwa na-emekọrịta ihe na netwọk Zcash site na Node.js na ihe nchọgharị weebụ.

> **Ọnọdụ**: Nnwale (v0.1.1). E-akpa ego Node na-adịgide adịgide chọrọ ugbu a Linux + `flock`. Iziga/nata zuru ezu na ihe nchọgharị dị ndụ na mbugharị nchekwa data e-akpa ego ochie erubeghị eru maka ojiji zuru oke. Na-enyocha akwụkwọ nkọwa gọọmentị mgbe niile tupu ojiji mmepụta.

## Ihe SDK Na-enye

- `createPublicClient` — ajụjụ JSON-RPC enweghị ọnọdụ na nleba anya Azụmahia [transaction]
- `createLightClient` — ajụjụ na iyi lightwallet (gRPC nke obodo na Node, gRPC-Web na ihe nchọgharị)
- `createWalletClient` — akaụntụ mpaghara, nyocha, atụmatụ, mbinye aka, ntinye, na mgbake Kwụọ ụhwọ [payment] edere
- Ọnụọgụ `bigint` ziri ezi, nkwado netwọk, ngwá ọrụ nlele/adreesị, na ngwa PCZT
- Igwe e-akpa ego ndabere ejikọtara ọnụ, workers, na akụ nkwado mpaghara Sapling (enweghị mkpa ịwụnye Rust iche)

## Ntinye

Jiri **Node.js 22.23.4** (ụdị nke ngwugwu kwụgidere).

```bash
npm install @zcashlabs/zcash.js@0.1.1
```

- Họrọ TypeScript nwere ESM (`"type": "module"` na `package.json`).
- Ngwa ihe nchọgharị na-arụ ọrụ site n'aka bundler ESM nke oge a. Bundler ahụ ga-emepụta akụ WASM, worker, na proving na-ebute nwayọọ — a ga-ebunye ndị a na ngwa gị.

## Ajụjụ Chain Mbụ (Enweghị E-akpa Ego)

```ts
import { createLightClient } from '@zcashlabs/zcash.js';

const light = await createLightClient('https://testnet.zec.rocks:443', {
  network: 'testnet',
});

const tip = await light.getTip();
console.log(tip.height, tip.hash);
```

- Ịhapụ nhọrọ `network` na-eme ka ọ bụrụ mainnet na ndabara (nye endpoint kwekọrọ).
- `createPublicClient` dịkwa maka ojiji JSON-RPC dị ọcha.

## Imeghe E-akpa Ego

```ts
import { createWalletClient } from '@zcashlabs/zcash.js';

const wallet = await createWalletClient('https://testnet.zec.rocks:443', {
  network: 'testnet',
  storage: { kind: 'node-filesystem', path: './my-wallet' }, // Linux only for durable storage
});

try {
  const accounts = await wallet.accounts.list();
  console.log(accounts);
} finally {
  await wallet.close();
}
```

### Nhọrọ Nchekwa

| Gburugburu     | Nhọrọ nchekwa                                      |
|-----------------|-----------------------------------------------------|
| Node (na-adịgide)  | `{ kind: 'node-filesystem', path: './my-wallet' }`  |
| Ihe nchọgharị         | `{ kind: 'browser-opfs', name: 'my-wallet' }`       |
| Nke a ga-atụfu      | `{ kind: 'memory' }`                                |

**Ntọala ndabara dị mkpa** (dịka na v0.1.1):

- Mmefu na mgbanwe bụ naanị-Ironwood na ndabara
- Iwu ugwo [fee]: ZIP-317
- Nkwenye: 3 a tụkwasịrị obi / 3 a na-atụkwasịghị obi
- Kpọọ `wallet.sync()` mgbe niile tupu atụpụta Kwụọ ụhwọ

## Usoro Ọrụ E-akpa Ego Ọkwa Dị Elu

1. Mepụta ma ọ bụ bubata akaụntụ mnemonic ma tinye onye na-edebanye aha
2. Kpọọ `wallet.sync()`
3. Rịọ adreesị nnata (họrọ Unified / Ironwood)
4. Mepụta atụmatụ → nyochaa ya → kpọọ `wallet.send()`
5. Lelee maka nkwenye ma ọ bụ jiri ọrụ ndị e dere maka mgbake mgbe ịmalitegharịrị

Ngwa ahụ nwere bytes mnemonic. Hichapụ ha na ebe nchekwa mgbe ha na-adịkwaghị mkpa. Na-egosi mgbe niile UI nkwado doro anya nke na-egosi onye nnata ọ bụla, ọnụọgụ, ugwo, pool, na oge njedebe.

Lee ntụziaka gọọmentị [Wallet](https://zcashlabs.github.io/zcashjs/api/walkthrough.html) maka ọmụmaatụ zuru oke na-arụ ọrụ.

## Ihe Ederede Banyere Platform na Mmachi Ugbu a

| Ike            | Node                              | Ihe nchọgharị                          |
|-----------------------|-----------------------------------|----------------------------------|
| Ngwugwu               | Node 22.23.4 + ESM                | Bundler ESM nke oge a + WebAssembly |
| Ajụjụ light         | gRPC nke obodo                       | gRPC-Web + CORS                  |
| Nchekwa na-adịgide       | Linux + `flock` naanị              | OPFS (ọnọdụ echekwara)            |
| Nchekwa a ga-atụfu    | ebe nchekwa                            | ebe nchekwa                           |

Mmachi ndị ọzọ:

- Nchekwa Node na-adịgide ugbu a bụ naanị-Linux
- Enwebeghị vault nzuzo ejikwa, ọrụ proving dịpụrụ adịpụ, ma ọ bụ njikọta hardware-signer
- A naghị akpọsa nchekwa dị ka nke Nzobe ederede [encryption] n'oge izu ike
- Emeghela otu nchekwa e-akpa ego site n'aka ọtụtụ usoro ma ọ bụ taabụ ihe nchọgharị n'otu oge
- Mechie e-akpa ego nke ọma mgbe niile site na `await wallet.close()`

## Nzọụkwụ Ndị Na-esote

- Ntinye gọọmentị na arịrịọ mbụ: [Ntinye](https://zcashlabs.github.io/zcashjs/api/installation.html)
- Imeghe na ịhazi e-akpa ego: [Mepee e-akpa ego](https://zcashlabs.github.io/zcashjs/api/wallet-runtime.html)
- Usoro ọrụ zuru ezu: [Ntuziaka e-akpa ego](https://zcashlabs.github.io/zcashjs/api/walkthrough.html)
- Ntụaka API: [Ntụaka API](https://zcashlabs.github.io/zcashjs/api/reference.html)
- Mmachi platform: [Nhazi Node na ihe nchọgharị](https://zcashlabs.github.io/zcashjs/api/platforms.html)


## Akụ Gọọmentị

- Akwụkwọ onye mmepụta: [https://zcashlabs.github.io/zcashjs/](https://zcashlabs.github.io/zcashjs/)
- Ebe nchekwa GitHub: [https://github.com/zcashlabs/zcashjs](https://github.com/zcashlabs/zcashjs)
- Ngwugwu npm: `@zcashlabs/zcash.js`


---

*Ntuziaka a dabere na `@zcashlabs/zcash.js@0.1.1` (Ọktoba 2026). SDK ahụ nọ n'okpuru mmepe na-arụsi ọrụ ike — họrọ akwụkwọ nkọwa gọọmentị mgbe niile maka API na mmachi kachasị ọhụrụ.*
