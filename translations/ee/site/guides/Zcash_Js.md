# Zcash JS Mɔ̃ ƒe ɖoɖoŋlɔla ƒe Kplɔɖeŋu

**zcash.js** (`@zcashlabs/zcash.js`) nye TypeScript/JavaScript SDK si le dodom le kpɔkpɔ me, si Zcash Labs ɖe gbe 26 le October 2026 me. E na mɔ̃ ƒe ɖoɖoŋlɔlawo mɔ be woatu gakotokuwo, nyatakaka si hiã ƒe mɔwo, ɖoɖowo ƒuƒopéwo, kple dɔwɔɖoɖowo siwo doa dze Zcash network la ŋu tso Node.js kple browser la me.

> **Nɔnɔme**: Le dodom le kpɔkpɔ me (v0.1.1). Node gakotoku siwo nɔ anyi tegbee la hia Linux + `flock` fifia. Wo mede asi na live-browser fexexe/gaɖeɖe blibo kple gakotoku ƒe database xoxo ƒe tututu va yeye blibo o haɖe. Kpɔ official documentation la ɣesiaɣi hafi nàzãe le production me.

## Nu Si SDK La Nana

- `createPublicClient` — JSON-RPC ƒe biabia si mele state o kple gaɖoɖowo ƒe kpɔkpɔ
- `createLightClient` — lightwallet ƒe biabiawo kple streams (native gRPC le Node me, gRPC-Web le browser la me)
- `createWalletClient` — accountwo le afi sia afi, scan, proposalwo, asixɔxɔ, tuɖoɖo, kple fexexe siwo woŋlɔ ɖo ƒe gbugbɔxɔxɔ
- `bigint` ƒe ga ƒe asixɔxɔ bliboa, network ƒe kpekpeɖeŋu, viewing/address dɔwɔnuwo, kple PCZT ƒe dɔwɔnuwo
- Wallet engine, workers, kple Sapling ƒe proving assets le package la me (mele be nàɖo Rust ɖe eŋu vovotɔ o)

## Ɖoɖo

Zã **Node.js 22.23.4** (version si package la de ɖo).

```bash
npm install @zcashlabs/zcash.js@0.1.1
```

- De asi na TypeScript kple ESM (`"type": "module"` le `package.json` me).
- Browser dɔwɔɖoɖowo wɔa dɔ kple ESM bundler yeye aɖe. Bundler la aɖe WASM, worker, kple proving assets siwo wòle be woaɖo ɖe wò dɔwɔɖoɖo la kple asi.

## Ɖoɖonu ƒe Biabia Gbãtɔ (Gakotoku Meli O)

```ts
import { createLightClient } from '@zcashlabs/zcash.js';

const light = await createLightClient('https://testnet.zec.rocks:443', {
  network: 'testnet',
});

const tip = await light.getTip();
console.log(tip.height, tip.hash);
```

- Ne mètsɔ `network` option la o la, ekplɔa mainnet (tsɔ endpoint si sɔ kple eŋu).
- `createPublicClient` hã li na JSON-RPC ƒe zãzã dzro.

## Gakotoku ƒe Dede

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

### Nudzraɖoƒe ƒe Tiaɖewo

| Nɔnɔme     | Nudzraɖoƒe ƒe tiaɖe                              |
|-----------------|-----------------------------------------------------|
| Node (tegbee)  | `{ kind: 'node-filesystem', path: './my-wallet' }`  |
| Browser         | `{ kind: 'browser-opfs', name: 'my-wallet' }`       |
| Kpuie         | `{ kind: 'memory' }`                                |

**Nɔnɔme siwo woɖo ɖe eŋu le gɔmedzedze me** (le v0.1.1 ŋu):

- Spending kple change nye Ironwood-ko le gɔmedzedze me
- Adzɔ ƒe se: ZIP-317
- Kpekpeɖeŋuwo: 3 siwo wòka ɖe dzi / 3 siwo mèka ɖe dzi o
- Yɔ `wallet.sync()` ɣesiaɣi hafi nàɖo fexexe aɖe ɖe asi

## Gakotoku ƒe Dɔwɔwɔ Ƒe Mɔ Gã

1. Wɔ alo ɖo mnemonic account aɖe kple asi nɛ na signer aɖe
2. Yɔ `wallet.sync()`
3. Bia gaɖeɖe ƒe gaɖoƒe ƒe dzesi aɖe (de asi na Unified / Ironwood)
4. Wɔ proposal aɖe → kpɔe nyuie → yɔ `wallet.send()`
5. Kpɔ be wòkpɔ kpekpeɖeŋu alo zã operation siwo woŋlɔ ɖo tsɔ gbugbɔ xɔe le restart megbe

Dɔwɔɖoɖo lae xɔ mnemonic bytes la. Ɖe wo ɖa le memory me ne woƒe hiahiãɖeɖe va yi. Ɖe mɔ na approval UI klaro aɖe ɣesiaɣi, si fia nuxɔlawo katã, ga ƒe asixɔxɔ, adzɔ, gaƒuƒoƒo, kple expire ƒe ɣeyiɣi.

Kpɔ official [Wallet ƒe mɔkplɔɖeŋu](https://zcashlabs.github.io/zcashjs/api/walkthrough.html) la na wɔwɔɖoɖo blibo si wɔa dɔ.

## Platform Ƒe Nya Kple Nu Siwo Mete Ŋu Wɔe Fia

| Nuteŋu            | Node                              | Browser                          |
|-----------------------|-----------------------------------|----------------------------------|
| Package               | Node 22.23.4 + ESM                | ESM bundler yeye + WebAssembly |
| Light ƒe biabiawo         | Native gRPC                       | gRPC-Web + CORS                  |
| Nudzraɖoƒe tegbee       | Linux + `flock` ko              | OPFS (secure context)            |
| Nudzraɖoƒe kpuie    | memory                            | memory                           |

Nu siwo hã mete ŋu wɔe:

- Node ƒe nudzraɖoƒe tegbee nye Linux-ko fifia
- Secret vault si woɖoa dzi, proving service didi, alo hardware-signer ƒe kpekpeɖeŋu meli haɖe o
- Wometsa nudzraɖoƒe la ɖe gbe be woɣlãa eƒe nyawo le afi si wòle o
- Mègale gakotoku nudzraɖoƒe ma kea ɖe process geɖe alo browser tab geɖe me enumake o
- Ƒo gakotoku la nyuie ɣesiaɣi kple `await wallet.close()`

## Afɔɖeŋu Siwo Kplɔe ɖo

- Ɖoɖo official kple biabia gbãtɔ: [Ɖoɖo](https://zcashlabs.github.io/zcashjs/api/installation.html)
- Gakotoku ƒe dede kple ɖoɖo: [Ʋu gakotoku aɖe](https://zcashlabs.github.io/zcashjs/api/wallet-runtime.html)
- Dɔwɔwɔ ƒe mɔ bliboa: [Wallet ƒe mɔkplɔɖeŋu](https://zcashlabs.github.io/zcashjs/api/walkthrough.html)
- API ƒe referens: [API ƒe Referens](https://zcashlabs.github.io/zcashjs/api/reference.html)
- Platform ƒe limitwo: [Node kple browser ƒe ɖoɖo](https://zcashlabs.github.io/zcashjs/api/platforms.html)


## Official Ƒe Nuŋkɔwo

- Mɔ̃ ƒe ɖoɖoŋlɔla ƒe agbalẽ: [https://zcashlabs.github.io/zcashjs/](https://zcashlabs.github.io/zcashjs/)
- GitHub ƒe repository: [https://github.com/zcashlabs/zcashjs](https://github.com/zcashlabs/zcashjs)
- npm package: `@zcashlabs/zcash.js`


---

*Wotu kplɔɖeŋu sia ɖe `@zcashlabs/zcash.js@0.1.1` (October 2026) dzi. SDK la le dodom vevie — de asi na official documentation la ɣesiaɣi na API yeye kple limitwo.*
