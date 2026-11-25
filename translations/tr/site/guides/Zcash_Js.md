# Zcash JS Geliştirici Rehberi

**zcash.js** (`@zcashlabs/zcash.js`), Zcash Labs tarafından 26 Ekim 2026'da yayımlanan deneysel bir TypeScript/JavaScript SDK'sıdır. Geliştiricilerin Node.js ve tarayıcı üzerinden Zcash ağıyla etkileşim kuran cüzdanlar, hafif istemciler, gösterge panelleri ve uygulamalar geliştirmesini sağlar.

> **Durum**: Deneysel (v0.1.1). Kalıcı Node cüzdanları şu anda Linux + `flock` gerektirir. Canlı tarayıcıda gönderme/alma ve geçmiş cüzdan veritabanı geçişi henüz tam olarak doğrulanmamıştır. Üretimde kullanmadan önce daima resmi belgeleri kontrol edin.

## SDK Neler Sunar

- `createPublicClient` — durumsuz JSON-RPC sorguları ve işlem gözlemi
- `createLightClient` — lightwallet sorguları ve akışları (Node'da yerel gRPC, tarayıcıda gRPC-Web)
- `createWalletClient` — yerel hesaplar, tarama, öneriler, imzalama, gönderim ve kaydedilmiş ödemelerin kurtarılması
- Kesin `bigint` tutarları, ağ doğrulama, görüntüleme/adres araçları ve PCZT yardımcı programları
- Birlikte sunulan temel cüzdan motoru, çalışanlar ve yerel Sapling kanıtlama varlıkları (ayrı bir Rust kurulumu gerekmez)

## Kurulum

**Node.js 22.23.4** sürümünü kullanın (paketin sabitlediği sürüm).

```bash
npm install @zcashlabs/zcash.js@0.1.1
```

- ESM ile TypeScript kullanmayı tercih edin (`package.json` içinde `"type": "module"`).
- Tarayıcı uygulamaları modern bir ESM paketleyiciyle çalışır. Paketleyici, uygulamanızla birlikte dağıtılması gereken tembel yüklenen WASM, çalışan ve kanıtlama varlıklarını oluşturur.

## İlk Zincir Sorgusu (Cüzdan Olmadan)

```ts
import { createLightClient } from '@zcashlabs/zcash.js';

const light = await createLightClient('https://testnet.zec.rocks:443', {
  network: 'testnet',
});

const tip = await light.getTip();
console.log(tip.height, tip.hash);
```

- `network` seçeneği belirtilmezse varsayılan olarak ana ağ kullanılır (uygun bir uç nokta sağlayın).
- Yalnızca JSON-RPC kullanımı için `createPublicClient` de mevcuttur.

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

| Ortam           | Depolama seçeneği                                  |
|-----------------|-----------------------------------------------------|
| Node (kalıcı)   | `{ kind: 'node-filesystem', path: './my-wallet' }`  |
| Tarayıcı        | `{ kind: 'browser-opfs', name: 'my-wallet' }`       |
| Geçici          | `{ kind: 'memory' }`                                |

**Önemli varsayılanlar** (v0.1.1 itibarıyla):

- Harcama ve para üstü varsayılan olarak yalnızca Ironwood kullanır
- Ücret kuralı: ZIP-317
- Onay sayısı: Güvenilir 3 / güvenilmeyen 3
- Ödeme önermeden önce daima `wallet.sync()` çağrısını yapın

## Üst Düzey Cüzdan İş Akışı

1. Bir kurtarma ifadesi hesabı oluşturun veya içe aktarın ve bir imzalayıcı ekleyin
2. `wallet.sync()` çağrısını yapın
3. Bir alım adresi isteyin (Unified / Ironwood tercih edilir)
4. Bir öneri oluşturun → gözden geçirin → `wallet.send()` çağrısını yapın
5. Onayı bekleyin veya yeniden başlatma sonrasında kurtarma için kaydedilmiş işlemleri kullanın

Kurtarma ifadesi baytları uygulamanın denetimindedir. Artık gerekli olmadıklarında bunları bellekten silin. Her alıcıyı, tutarı, ücreti, havuzu ve son kullanma zamanını gösteren açık bir onay arayüzü sunun.

Eksiksiz çalışan bir örnek için resmi [Wallet adım adım kılavuzuna](https://zcashlabs.github.io/zcashjs/api/walkthrough.html) bakın.

## Platform Notları ve Mevcut Sınırlamalar

| Özellik               | Node                              | Tarayıcı                         |
|-----------------------|-----------------------------------|----------------------------------|
| Paket                 | Node 22.23.4 + ESM                | Modern ESM paketleyici + WebAssembly |
| Hafif sorgular        | Yerel gRPC                        | gRPC-Web + CORS                  |
| Kalıcı depolama       | Yalnızca Linux + `flock`           | OPFS (güvenli bağlam)           |
| Geçici depolama       | Bellek                            | Bellek                           |

Ek sınırlamalar:

- Kalıcı Node depolaması şu anda yalnızca Linux ile kullanılabilir
- Henüz yönetilen bir gizli bilgi kasası, uzaktan kanıtlama hizmeti veya donanım imzalayıcı entegrasyonu yoktur
- Depolamanın bekleme durumunda şifreli olduğu belirtilmemektedir
- Aynı cüzdan depolamasını birden fazla işlemden veya tarayıcı sekmesinden eşzamanlı olarak açmayın
- Cüzdanı kapatırken daima `await wallet.close()` çağrısını yapın

## Sonraki Adımlar

- Resmi kurulum ve ilk istek: [Kurulum](https://zcashlabs.github.io/zcashjs/api/installation.html)
- Cüzdan açma ve yapılandırma: [Cüzdan açma](https://zcashlabs.github.io/zcashjs/api/wallet-runtime.html)
- Tam iş akışı: [Cüzdan adım adım kılavuzu](https://zcashlabs.github.io/zcashjs/api/walkthrough.html)
- API başvurusu: [API Başvurusu](https://zcashlabs.github.io/zcashjs/api/reference.html)
- Platform sınırları: [Node ve tarayıcı kurulumu](https://zcashlabs.github.io/zcashjs/api/platforms.html)


## Resmi Kaynaklar

- Geliştirici kitabı: [https://zcashlabs.github.io/zcashjs/](https://zcashlabs.github.io/zcashjs/)
- GitHub deposu: [https://github.com/zcashlabs/zcashjs](https://github.com/zcashlabs/zcashjs)
- npm paketi: `@zcashlabs/zcash.js`


---

*Bu kılavuz `@zcashlabs/zcash.js@0.1.1` (Ekim 2026) temel alınarak hazırlanmıştır. SDK'nın geliştirilmesi etkin bir şekilde sürmektedir — en güncel API ve sınırlamalar için daima resmi belgeleri tercih edin.*
