# Zcash JS Geliştirici Rehberi

**zcash.js** (`@zcashlabs/zcash.js`), Zcash Labs tarafından 26 Ekim 2026'da yayımlanan deneysel bir TypeScript/JavaScript SDK'sıdır. Geliştiricilerin Node.js ve tarayıcı üzerinden Zcash ağıyla etkileşime giren cüzdanlar, hafif istemciler, panolar ve uygulamalar oluşturmasını sağlar.

> **Durum**: Deneysel (v0.1.1). Kalıcı düğüm cüzdanları şu anda Linux + `flock` gerektirir. Canlı tarayıcıda gönderme/alma işlemleri ve geçmiş cüzdan veritabanı geçişi henüz tamamen yeterlilik kazanmış değildir. Üretimde kullanmadan önce her zaman resmî belgeleri kontrol edin.

## SDK'nın Sağladıkları

- `createPublicClient` — durumsuz JSON-RPC sorguları ve işlem gözlemi
- `createLightClient` — hafif cüzdan sorguları ve akışları (düğümde yerel gRPC, tarayıcıda gRPC-Web)
- `createWalletClient` — yerel hesaplar, tarama, teklifler, imzalama, gönderim ve kaydedilmiş ödeme kurtarma
- Kesin `bigint` tutarları, ağ doğrulaması, görüntüleme/adres araçları ve PCZT yardımcı programları
- Paketlenmiş temel cüzdan motoru, çalışanlar ve yerel Sapling kanıtlama varlıkları (ayrı Rust kurulumu gerekmez)

## Kurulum

**Node.js 22.23.4** (paket tarafından sabitlenen sürüm) kullanın.

```bash
npm install @zcashlabs/zcash.js@0.1.1
```

- ESM ile TypeScript tercih edin (`package.json` içinde `"type": "module"`).
- Tarayıcı uygulamaları modern bir ESM paketleyici aracılığıyla çalışır. Paketleyici tembel yüklenen WASM, çalışan ve kanıtlama varlıklarını oluşturur — bunlar uygulamanızla birlikte dağıtılmalıdır.

## İlk Zincir Sorgusu (Cüzdan Yok)

```ts
import { createLightClient } from '@zcashlabs/zcash.js';

const light = await createLightClient('https://testnet.zec.rocks:443', {
  network: 'testnet',
});

const tip = await light.getTip();
console.log(tip.height, tip.hash);
```

- `network` seçeneğinin atlanması varsayılan olarak ana ağı kullanır (eşleşen bir uç nokta sağlayın).
- Yalnızca JSON-RPC kullanımı için bir `createPublicClient` de mevcuttur.

## Cüzdan Açma

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

### Depolama Seçenekleri

| Ortam     | Depolama seçeneği                                      |
|-----------------|-----------------------------------------------------|
| Düğüm (kalıcı)  | `{ kind: 'node-filesystem', path: './my-wallet' }`  |
| Tarayıcı         | `{ kind: 'browser-opfs', name: 'my-wallet' }`       |
| Geçici      | `{ kind: 'memory' }`                                |

**Önemli varsayılanlar** (v0.1.1 itibarıyla):

- Harcama ve para üstü varsayılan olarak yalnızca Ironwood'dır
- Ücret kuralı: ZIP-317
- Onaylar: 3 güvenilir / 3 güvenilmeyen
- Bir ödeme teklif etmeden önce her zaman `wallet.sync()` çağrısı yapın

## Yüksek Seviyeli Cüzdan İş Akışı

1. Bir anımsatıcı hesap oluşturun veya içe aktarın ve bir imzalayıcı bağlayın
2. `wallet.sync()` çağrısı yapın
3. Bir alım adresi isteyin (Unified / Ironwood tercih edin)
4. Bir teklif oluşturun → gözden geçirin → `wallet.send()` çağrısı yapın
5. Onayı izleyin veya yeniden başlatma sonrasında kurtarma için kaydedilmiş işlemleri kullanın

Uygulama anımsatıcı baytların sahibidir. Artık gerekli olmadıklarında bunları bellekten temizleyin. Her alıcıyı, tutarı, ücreti, havuzu ve son kullanma tarihini gösteren açık bir onay arayüzü sunun.

Eksiksiz çalışan bir örnek için resmî [Wallet rehberine](https://zcashlabs.github.io/zcashjs/api/walkthrough.html) bakın.

## Platform Notları ve Mevcut Sınırlamalar

| Özellik            | Düğüm                              | Tarayıcı                          |
|-----------------------|-----------------------------------|----------------------------------|
| Paket               | Düğüm 22.23.4 + ESM                | Modern ESM paketleyici + WebAssembly |
| Hafif sorgular         | Yerel gRPC                       | gRPC-Web + CORS                  |
| Kalıcı depolama       | Yalnızca Linux + `flock`              | OPFS (güvenli bağlam)            |
| Geçici depolama    | bellek                            | bellek                           |

Ek sınırlamalar:

- Kalıcı düğüm depolaması şu anda yalnızca Linux'dır
- Henüz yönetilen gizli anahtar kasası, uzaktan kanıtlama hizmeti veya donanım imzalayıcı entegrasyonu yoktur
- Depolamanın beklemede şifrelendiği **belirtilmemiştir**
- Aynı cüzdan depolamasını birden fazla işlemden veya tarayıcı sekmesinden eşzamanlı olarak açmayın
- Cüzdanı her zaman `await wallet.close()` ile düzgün şekilde kapatın

## Sonraki Adımlar

- Resmî kurulum ve ilk istek: [Kurulum](https://zcashlabs.github.io/zcashjs/api/installation.html)
- Bir cüzdan açma ve yapılandırma: [Cüzdan açma](https://zcashlabs.github.io/zcashjs/api/wallet-runtime.html)
- Tam iş akışı: [Wallet rehberi](https://zcashlabs.github.io/zcashjs/api/walkthrough.html)
- API referansı: [API Referansı](https://zcashlabs.github.io/zcashjs/api/reference.html)
- Platform sınırları: [Düğüm ve tarayıcı kurulumu](https://zcashlabs.github.io/zcashjs/api/platforms.html)


## Resmî Kaynaklar

- Geliştirici kitabı: [https://zcashlabs.github.io/zcashjs/](https://zcashlabs.github.io/zcashjs/)
- GitHub deposu: [https://github.com/zcashlabs/zcashjs](https://github.com/zcashlabs/zcashjs)
- npm paketi: `@zcashlabs/zcash.js`


---

*Bu rehber, `@zcashlabs/zcash.js@0.1.1` (Ekim 2026) temel alınarak hazırlanmıştır. SDK aktif olarak geliştirilmektedir — en güncel API ve sınırlamalar için her zaman resmî belgeleri tercih edin.*
