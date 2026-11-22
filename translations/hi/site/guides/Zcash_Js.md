# Zcash JS डेवलपर गाइड

**zcash.js** (`@zcashlabs/zcash.js`) एक प्रायोगिक TypeScript/JavaScript SDK है, जिसे Zcash Labs ने 26 अक्टूबर 2026 को जारी किया। इसकी मदद से डेवलपर (developer) Node.js और ब्राउज़र से Zcash नेटवर्क के साथ इंटरैक्ट करने वाले वॉलेट (wallet), लाइट क्लाइंट (light client), डैशबोर्ड (dashboard) और एप्लिकेशन बना सकते हैं।

> **स्थिति**: प्रायोगिक (v0.1.1)। स्थायी Node वॉलेट के लिए फ़िलहाल Linux + `flock` आवश्यक हैं। ब्राउज़र में लाइव भेजने/प्राप्त करने की पूरी प्रक्रिया और पुराने वॉलेट डेटाबेस का माइग्रेशन अभी पूरी तरह प्रमाणित नहीं हैं। प्रोडक्शन में उपयोग से पहले आप हमेशा आधिकारिक दस्तावेज़ देखें।

## SDK क्या प्रदान करता है

- `createPublicClient` — स्टेटलेस JSON-RPC क्वेरी और लेनदेन (transaction) का अवलोकन
- `createLightClient` — लाइटवॉलेट क्वेरी और स्ट्रीम (Node पर नेटिव gRPC, ब्राउज़र में gRPC-Web)
- `createWalletClient` — लोकल अकाउंट, स्कैनिंग, प्रस्ताव, साइनिंग, सबमिशन और रिकॉर्ड किए गए भुगतान (payment) की रिकवरी
- सटीक `bigint` राशियाँ, नेटवर्क सत्यापन, व्यूइंग/एड्रेस (address) उपकरण (tools) और PCZT यूटिलिटी
- बंडल किया गया बेसलाइन वॉलेट इंजन, वर्कर और लोकल Sapling प्रूविंग एसेट (अलग से Rust इंस्टॉल करने की आवश्यकता नहीं)

## इंस्टॉलेशन

**Node.js 22.23.4** का उपयोग करें (पैकेज द्वारा तय किया गया संस्करण)।

```bash
npm install @zcashlabs/zcash.js@0.1.1
```

- ESM के साथ TypeScript को प्राथमिकता दें (`package.json` में `"type": "module"`)।
- ब्राउज़र एप्लिकेशन किसी आधुनिक ESM बंडलर के माध्यम से काम करते हैं। बंडलर लेज़ी WASM, वर्कर और प्रूविंग एसेट तैयार करेगा — इन्हें आपको अपने एप्लिकेशन के साथ डिप्लॉय करना होगा।

## पहली चेन क्वेरी (वॉलेट के बिना)

```ts
import { createLightClient } from '@zcashlabs/zcash.js';

const light = await createLightClient('https://testnet.zec.rocks:443', {
  network: 'testnet',
});

const tip = await light.getTip();
console.log(tip.height, tip.hash);
```

- `network` विकल्प न देने पर डिफ़ॉल्ट रूप से मेननेट चुना जाता है (आप उससे मेल खाता एंडपॉइंट दें)।
- केवल JSON-RPC उपयोग के लिए `createPublicClient` भी उपलब्ध है।

## वॉलेट खोलना

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

### स्टोरेज विकल्प

| परिवेश     | स्टोरेज विकल्प                                      |
|-----------------|-----------------------------------------------------|
| Node (स्थायी)  | `{ kind: 'node-filesystem', path: './my-wallet' }`  |
| ब्राउज़र         | `{ kind: 'browser-opfs', name: 'my-wallet' }`       |
| अस्थायी      | `{ kind: 'memory' }`                                |

**महत्वपूर्ण डिफ़ॉल्ट सेटिंग** (v0.1.1 के अनुसार):

- डिफ़ॉल्ट रूप से खर्च और चेंज केवल Ironwood में होते हैं
- शुल्क (fee) नियम: ZIP-317
- पुष्टियाँ: 3 विश्वसनीय / 3 अविश्वसनीय
- भुगतान का प्रस्ताव बनाने से पहले हमेशा `wallet.sync()` कॉल करें

## उच्च-स्तरीय वॉलेट वर्कफ़्लो

1. एक मेनेमोनिक अकाउंट बनाएँ या इम्पोर्ट करें और एक साइनर जोड़ें
2. `wallet.sync()` कॉल करें
3. प्राप्त करने के लिए एक एड्रेस का अनुरोध करें (Unified / Ironwood को प्राथमिकता दें)
4. एक प्रस्ताव बनाएँ → उसकी समीक्षा करें → `wallet.send()` कॉल करें
5. पुष्टि की प्रतीक्षा करें या रीस्टार्ट के बाद रिकवरी के लिए रिकॉर्ड किए गए ऑपरेशन का उपयोग करें

मेनेमोनिक बाइट्स एप्लिकेशन के पास रहते हैं। जब उनकी आवश्यकता न रहे, तो उन्हें मेमोरी से हटा दें। हमेशा एक स्पष्ट अनुमोदन UI दिखाएँ, जिसमें हर प्राप्तकर्ता, राशि, शुल्क, पूल (pool) और समाप्ति दिखाई दे।

पूरे कार्यशील उदाहरण के लिए आधिकारिक [वॉलेट वॉकथ्रू](https://zcashlabs.github.io/zcashjs/api/walkthrough.html) देखें।

## प्लेटफ़ॉर्म संबंधी टिप्पणियाँ और वर्तमान सीमाएँ

| क्षमता            | Node                              | ब्राउज़र                          |
|-----------------------|-----------------------------------|----------------------------------|
| पैकेज               | Node 22.23.4 + ESM                | आधुनिक ESM बंडलर + WebAssembly |
| लाइट क्वेरी         | नेटिव gRPC                       | gRPC-Web + CORS                  |
| स्थायी स्टोरेज       | केवल Linux + `flock`              | OPFS (सुरक्षित संदर्भ)            |
| अस्थायी स्टोरेज    | मेमोरी                            | मेमोरी                           |

अतिरिक्त सीमाएँ:

- स्थायी Node स्टोरेज फ़िलहाल केवल Linux पर उपलब्ध है
- अभी कोई प्रबंधित सीक्रेट वॉल्ट, रिमोट प्रूविंग सेवा या हार्डवेयर-साइनर इंटीग्रेशन नहीं है
- स्टोरेज को रेस्ट पर एन्क्रिप्टेड **नहीं** बताया गया है
- एक ही वॉलेट स्टोरेज को एक साथ कई प्रोसेस या ब्राउज़र टैब से न खोलें
- वॉलेट को हमेशा `await wallet.close()` से ठीक तरह बंद करें

## अगले कदम

- आधिकारिक इंस्टॉलेशन और पहला अनुरोध: [इंस्टॉलेशन](https://zcashlabs.github.io/zcashjs/api/installation.html)
- वॉलेट खोलना और कॉन्फ़िगर करना: [वॉलेट खोलना](https://zcashlabs.github.io/zcashjs/api/wallet-runtime.html)
- पूरा वर्कफ़्लो: [वॉलेट वॉकथ्रू](https://zcashlabs.github.io/zcashjs/api/walkthrough.html)
- API संदर्भ: [API संदर्भ](https://zcashlabs.github.io/zcashjs/api/reference.html)
- प्लेटफ़ॉर्म सीमाएँ: [Node और ब्राउज़र सेटअप](https://zcashlabs.github.io/zcashjs/api/platforms.html)


## आधिकारिक संसाधन

- डेवलपर बुक: [https://zcashlabs.github.io/zcashjs/](https://zcashlabs.github.io/zcashjs/)
- GitHub रिपॉज़िटरी: [https://github.com/zcashlabs/zcashjs](https://github.com/zcashlabs/zcashjs)
- npm पैकेज: `@zcashlabs/zcash.js`


---

*यह गाइड `@zcashlabs/zcash.js@0.1.1` (अक्टूबर 2026) पर आधारित है। SDK पर सक्रिय रूप से काम चल रहा है — नवीनतम API और सीमाओं के लिए हमेशा आधिकारिक दस्तावेज़ को प्राथमिकता दें।*
