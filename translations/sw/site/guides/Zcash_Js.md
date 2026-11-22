# Mwongozo wa msanidi programu [developer] wa Zcash JS

**zcash.js** (`@zcashlabs/zcash.js`) ni SDK ya majaribio ya TypeScript/JavaScript iliyotolewa na Zcash Labs tarehe 26 Oktoba 2026. Inawawezesha wasanidi programu kutengeneza pochi [wallet], light client, dashibodi [dashboard], na programu zinazoingiliana na mtandao wa Zcash kutoka Node.js na kivinjari.

> **Hali**: Ya majaribio (v0.1.1). Pochi za Node zinazodumu kwa sasa zinahitaji Linux + `flock`. Kutuma/kupokea kikamilifu katika kivinjari cha moja kwa moja na uhamishaji wa kihistoria wa hifadhidata ya pochi bado havijaidhinishwa kikamilifu. Daima angalia nyaraka rasmi kabla ya matumizi ya uzalishaji.

## SDK Hutoa Nini

- `createPublicClient` — hoja za JSON-RPC zisizo na hali na uchunguzi wa miamala [transactions]
- `createLightClient` — hoja na mitiririko ya lightwallet (gRPC asilia kwenye Node, gRPC-Web katika kivinjari)
- `createWalletClient` — akaunti za ndani, uchanganuzi, mapendekezo, utiaji sahihi, uwasilishaji, na urejeshaji wa malipo [payments] yaliyorekodiwa
- Kiasi sahihi cha `bigint`, uthibitishaji wa mtandao, vifaa [tools] vya kutazama/anwani [address], na vifaa vya PCZT
- Injini ya msingi ya pochi iliyojumuishwa, workers, na rasilimali za uthibitishaji za ndani za Sapling (hakuna usakinishaji tofauti wa Rust unaohitajika)

## Usakinishaji

Tumia **Node.js 22.23.4** (toleo lililobandikwa na kifurushi).

```bash
npm install @zcashlabs/zcash.js@0.1.1
```

- Pendelea TypeScript yenye ESM (`"type": "module"` katika `package.json`).
- Programu za kivinjari hufanya kazi kupitia bundler ya kisasa ya ESM. Bundler itatoa rasilimali za WASM, worker, na uthibitishaji zinazopakiwa kwa uvivu — hizi lazima zitumwe pamoja na programu yako.

## Hoja ya Kwanza ya Mnyororo [Chain] (Bila Pochi)

```ts
import { createLightClient } from '@zcashlabs/zcash.js';

const light = await createLightClient('https://testnet.zec.rocks:443', {
  network: 'testnet',
});

const tip = await light.getTip();
console.log(tip.height, tip.hash);
```

- Kuacha chaguo la `network` hutumia mainnet kwa chaguomsingi (toa endpoint inayolingana).
- `createPublicClient` pia inapatikana kwa matumizi safi ya JSON-RPC.

## Kufungua Pochi

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

### Chaguo za Hifadhi

| Mazingira     | Chaguo la hifadhi                                      |
|-----------------|-----------------------------------------------------|
| Node (ya kudumu)  | `{ kind: 'node-filesystem', path: './my-wallet' }`  |
| Kivinjari         | `{ kind: 'browser-opfs', name: 'my-wallet' }`       |
| Ya muda      | `{ kind: 'memory' }`                                |

**Chaguomsingi muhimu** (kuanzia v0.1.1):

- Matumizi na chenji ni Ironwood-pekee kwa chaguomsingi
- Kanuni ya ada [fee]: ZIP-317
- Uthibitisho: 3 wa kuaminika / 3 wasioaminika
- Daima ita `wallet.sync()` kabla ya kupendekeza malipo

## Mtiririko wa Kazi wa Pochi wa Kiwango cha Juu

1. Unda au leta akaunti ya mnemonic na uambatishe mtia sahihi
2. Ita `wallet.sync()`
3. Omba anwani ya kupokea (pendekeza Unified / Ironwood)
4. Unda pendekezo → likague → ita `wallet.send()`
5. Fuatilia uthibitisho au tumia operesheni zilizorekodiwa kwa urejeshaji baada ya kuwasha upya

Programu inamiliki baiti za mnemonic. Zifute kutoka kwenye kumbukumbu zisipohitajika tena. Daima wasilisha kiolesura wazi cha uidhinishaji kinachoonyesha kila mpokeaji, kiasi, ada, bwawa [pool], na muda wa mwisho.

Tazama mwongozo rasmi wa [Pochi](https://zcashlabs.github.io/zcashjs/api/walkthrough.html) kwa mfano kamili unaofanya kazi.

## Maelezo ya Mfumo na Vikwazo vya Sasa

| Uwezo            | Node                              | Kivinjari                          |
|-----------------------|-----------------------------------|----------------------------------|
| Kifurushi               | Node 22.23.4 + ESM                | Bundler ya kisasa ya ESM + WebAssembly |
| Hoja nyepesi         | gRPC asilia                       | gRPC-Web + CORS                  |
| Hifadhi ya kudumu       | Linux + `flock` pekee              | OPFS (muktadha salama)            |
| Hifadhi ya muda    | kumbukumbu                            | kumbukumbu                           |

Vikwazo vya ziada:

- Hifadhi endelevu ya Node kwa sasa ni ya Linux-pekee
- Bado hakuna vault ya siri inayosimamiwa, huduma ya uthibitishaji ya mbali, au ujumuishaji wa mtia sahihi wa hardware
- Hifadhi **haitangazwi** kuwa imesimbwa fiche [encrypted] inapohifadhiwa
- Usifungue hifadhi ileile ya pochi kutoka kwa michakato mingi au vichupo vya kivinjari kwa wakati mmoja
- Daima funga pochi kwa usahihi ukitumia `await wallet.close()`

## Hatua Zinazofuata

- Usakinishaji rasmi na ombi la kwanza: [Usakinishaji](https://zcashlabs.github.io/zcashjs/api/installation.html)
- Kufungua na kusanidi pochi: [Fungua pochi](https://zcashlabs.github.io/zcashjs/api/wallet-runtime.html)
- Mtiririko kamili wa kazi: [Mwongozo wa pochi](https://zcashlabs.github.io/zcashjs/api/walkthrough.html)
- Marejeleo ya API: [Marejeleo ya API](https://zcashlabs.github.io/zcashjs/api/reference.html)
- Vikomo vya mfumo: [Usanidi wa Node na kivinjari](https://zcashlabs.github.io/zcashjs/api/platforms.html)


## Rasilimali Rasmi

- Kitabu cha wasanidi programu: [https://zcashlabs.github.io/zcashjs/](https://zcashlabs.github.io/zcashjs/)
- Hazina ya GitHub: [https://github.com/zcashlabs/zcashjs](https://github.com/zcashlabs/zcashjs)
- Kifurushi cha npm: `@zcashlabs/zcash.js`


---

*Mwongozo huu unategemea `@zcashlabs/zcash.js@0.1.1` (Oktoba 2026). SDK inaendelezwa kikamilifu — daima pendelea nyaraka rasmi kwa API na vikwazo vya hivi karibuni.*
