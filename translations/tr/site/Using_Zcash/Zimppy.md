<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Zimppy.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Zimppy.xyz

## Kısaca

- **Zimppy**, Zcash'ın Machine Payment Protocol (MPP) kullanan AI agent'ları için gizlilik öncelikli bir ödeme altyapısıdır
- Zincir üzerinde **bir kez para yatırın** (~75 saniye), ardından istek başına blockchain etkileşimi olmadan **sınırsız anlık istek** yapın
- **Tamamen korumalı Zcash (Orchard)** ödemelerini destekler — gönderen, alıcı, tutar ve memo tamamen şifrelenir
- AI işlem hatlarına ve API sunucularına kolay entegrasyon için **TypeScript ve Rust SDK'leriyle** çalışır
- **LLM API'leri, veri pazar yerleri, MCP araç sunucuları** ve tüm M2M ödeme kullanım durumları için mükemmeldir

---

> **Zimppy**, hem korumalı hem de şeffaf ödemeleri destekleyen, Zcash için Machine Payment Protocol (MPP) ödeme yöntemidir. Zincir üzerinde bir kez para yatırın, ardından istek başına zincir etkileşimi olmadan sınırsız anlık bearer istekleri yapın.

---

## İçindekiler

1. [Zimppy.xyz nedir?](#what-is-zimppyxyz)
2. [AI Agent'ları için Neden Korumalı Ödemeler?](#why-shielded-payments-for-ai-agents)
3. [Machine Payment Protocol (MPP)](#machine-payment-protocol-mpp)
4. [Zimppy Nasıl Çalışır?](#how-zimppy-works)
   - [Oturumlar (Önerilen)](#sessions-recommended)
   - [Akış](#streaming)
   - [Ücretlendirme](#charge)
5. [Kullanım Durumları ve Örnekler](#use-cases--examples)
6. [Kurulum](#installation)
7. [Zimppy Cüzdanını Ayarlama](#setting-up-the-zimppy-wallet)
8. [Zimppy Entegrasyonu](#integrating-zimppy--typescript-sdk)
   - [Sunucu (Korumalı)](#typescript-server--shielded)
   - [Sunucu (Şeffaf)](#typescript-server--transparent)
   - [İstemci](#typescript-client)
9. [Zimppy - Rust SDK Entegrasyonu](#integrating-zimppy--rust-sdk)
   - [Sunucu (Axum)](#rust-server-axum)
   - [İstemci](#rust-client)
10. [CLI Referansı](#cli-reference)
11. [Temel Özellikler](#key-features)
12. [Mimari](#architecture)
13. [Örnekler ve Demolar](#examples--demos)

---

## Zimppy.xyz nedir?

**Zimppy.xyz**, özellikle AI agent'ları ve otomatik makineden makineye (M2M) iş akışları için tasarlanmış, gizlilik öncelikli bir ödeme altyapısıdır. Temel para birimi olarak **Zcash** kullanan **Machine Payment Protocol (MPP)** uygular ve hem korumalı (tamamen özel) hem de şeffaf ödeme modlarını mümkün kılar.

Her işlemin zincir üzerinde herkese açık olduğu geleneksel blockchain ödeme sistemlerinin aksine Zimppy, kriptografik gizliliği korurken istek başına gecikmeyi ortadan kaldıran oturum tabanlı bir mimari etrafında tasarlanmıştır. Bu, onu davranışsal meta veri sızıntısı olmadan API'ler, veri, işlem gücü veya AI araçları için programatik olarak ödeme yapması gereken AI agent'ları için benzersiz biçimde uygun kılar.

### Temel Özellikler

- Zincir üzerinde **bir kez para yatırma** (Zcash onayı için ~75 saniye)
- Oturum açıldıktan sonra **sınırsız anlık istek**, istek başına sıfır zincir etkileşimi
- **Korumalı ödemeler**, göndereni, alıcıyı, tutarı ve memo'yu Zcash'ın Orchard protokolünü kullanarak şifreler
- **Şeffaf ödemeler**, tam gizlilik olmadan yeniden oynatma önleme için challenge başına T-adresleri kullanır
- **Spesifikasyona uyumlu**, HMAC-SHA256 challenge'ları, RFC 9457 hataları, `/.well-known/payment` keşfi

---

## AI Agent'ları için Neden Korumalı Ödemeler?

Hassas iş akışları, hukuki araştırmalar, tıbbi sorgular, finansal analizler ve rekabet istihbaratı yürüten AI agent'ları için **herkese açık her ödeme bir meta veri sızıntısıdır**. Zimppy, varsayılan olarak **özel** olan tek MPP ödeme yöntemidir.

### Gizlilik Karşılaştırma Tablosu

| Özellik | Açık Zincirler (USDC, ETH) | Zimppy Korumalı | Zimppy Şeffaf |
|---|---|---|---|
| **Gönderen** | Görünür | Şifreli | Görünür |
| **Alıcı** | Görünür | Şifreli | Challenge başına (bağlantılandırılamaz) |
| **Tutar** | Görünür | Şifreli | Görünür |
| **Memo** | Görünür | Şifreli | Yok |
| **Yeniden Oynatma Koruması** | Yok | Memo bağlama | Challenge başına T-adresi |
| **Hizmet Kullanım Deseni** | Bağlantılandırılabilir | Özel | Bağlantılandırılamaz (yeni adres) |

### Oturumlarla Çözülen Gecikme Sorunu

> *"Ama Zcash'ın blok süreleri 75 saniye."*

**Oturumlar bunu çözer.** Zincir üzerindeki bekleme, para yatırma sırasında tam olarak **bir kez** gerçekleşir. Sonraki her istek anlıktır.

```
Agent  ->  100,000 zat yatır              (tek zincir üzeri tx, ~75 sn)
Agent  ->  oturum aç                      (bearer token verilir)
Agent  ->  istek -> yanıt                 (0 ms - zincir etkileşimi yok)
Agent  ->  istek -> yanıt                 (0 ms - zincir etkileşimi yok)
Agent  ->  istek -> yanıt                 (0 ms - zincir etkileşimi yok)
           ... yüzlerce istek ...
Agent  ->  oturumu kapat                  (kullanılmayan bakiyeyi iade et)
```

**Bir kez ödeyin, anında çağırın, para üstünü geri alın.** İstek başına gecikme sıfırdır.

---

## Machine Payment Protocol (MPP)

**Machine Payment Protocol (MPP)**, otonom yazılım agent'larının (AI agent'ları, botlar, script'ler) insan müdahalesi olmadan API erişimi için ödeme gereksinimlerini keşfetmesini, müzakere etmesini ve yerine getirmesini sağlayan standartlaştırılmış bir protokoldür.

### MPP API'lerle Nasıl Entegre Olur?

MPP, HTTP **402 Payment Required** akışını izler:

1. **Agent**, ücretli bir API endpoint'inden kaynak ister.
2. **Sunucu**, `402 Payment Required` + imzalı bir challenge (tutar, alıcı, memo) ile yanıt verir.
3. **Agent**, uyumlu bir ödeme yöntemi kullanarak ödeme yapar (örneğin, Zimppy korumalı Zcash).
4. **Agent**, `Authorization: Payment {txid}` ile isteği yeniden dener.
5. **Sunucu**, ödemeyi kriptografik olarak doğrular (Orchard IVK şifre çözme, tutar + memo kontrolü).
6. **Sunucu**, `200 OK` + bir `Payment-Receipt` header'ı ile yanıt verir.

### Spesifikasyon Uyumluluğu

- **HMAC-SHA256** challenge imzalama
- **RFC 9457** yapılandırılmış hata yanıtları
- Otomatik ödeme yöntemi keşfi için **`/.well-known/payment`** endpoint'i
- Harcama anahtarlarını açığa çıkarmadan sunucu tarafında ödeme doğrulaması için **Orchard IVK** (Incoming Viewing Key)

---

## Zimppy Nasıl Çalışır?

### Oturumlar (Önerilen)

Oturumlar ana etkileşim modelidir. Agent, zincir üzerinde bir kez bakiye yatırır, bir bearer token alır ve bunu sonraki tüm istekler için sıfır gecikmeyle kullanır.

```
Agent  ->  100,000 zat yatır              (zincir üzerinde, tek seferlik ~75 sn)
Agent  ->  oturum aç                      (bearer token verilir)
Agent  ->  GET /api/query + bearer        (anlık, bakiye düşülür)
Agent  ->  GET /api/query + bearer        (anlık, bakiye düşülür)
Agent  ->  oturumu kapat                  (kullanılmayan bakiyeyi zincir üzerinde iade et)
```

**En uygun olduğu durumlar:** Yüksek frekanslı API çağrıları, LLM çıkarımı, tekrarlanan veri sorguları.

---

### Akış

**Server-Sent Events (SSE)** üzerinden sunulan, token başına ücretlendirilen içerik. Sunucu, yayınlanan her kelime veya token için oturum bakiyesinden düşer.

```
Agent  ->  para yatırarak oturum aç
Agent  ->  GET /api/stream (SSE)
Server ->  token başına düşerek kelime kelime akış yap
Agent  ->  oturumu kapat, kalanı iade et
```

**En uygun olduğu durumlar:** LLM akış yanıtları, gerçek zamanlı veri akışları, token başına ücretli AI araçları.

---

### Ücretlendirme

İstek başına tek bir korumalı ödeme. Tam HTTP 402 akışı her çağrıda yürütülür. İstekler seyrek veya yüksek değerliyse uygundur.

```
Agent  ->  GET /api/resource
Server ->  402 + challenge (tutar, alıcı, memo)
Agent  ->  memo "zimppy:{challenge_id}" ile korumalı ZEC
Agent  ->  GET /api/resource + Authorization: Payment {txid}
Server ->  Orchard IVK ile şifreyi çöz, tutarı + memo'yu doğrula
Server ->  200 OK + Payment-Receipt
```

**En uygun olduğu durumlar:** Yüksek değerli tek seferlik istekler, seyrek API çağrıları, premium veri endpoint'leri.

---

## Kullanım Durumları ve Örnekler

### 1. AI Agent

Bir hukuki AI agent'ı ücretli bir içtihat veri tabanında sorgu yapar. Zimppy korumalı oturumlarını kullanarak ne hukuk bürosunun kimliği ne de belirli sorgular zincir üzerinde görünür; bu da avukat-müvekkil gizliliğini altyapı düzeyinde korur.

```
Agent oturum açar (100,000 zat para yatırma)
-> GET /api/cases?q=patent+infringement+2024     (anlık)
-> GET /api/cases?q=prior+art+semiconductor      (anlık)
-> GET /api/document/US11234567B2                (anlık)
Oturum kapatılır, kullanılmayan bakiye iade edilir
```

### 2. Tıbbi Sorgu İşlem Hattı için AI Agent

Bir tıbbi teşhis agent'ı birden fazla klinik veri tabanında sorgu yapar. Korumalı ödemeler, hasta sorgu örüntülerinin sağlayıcılar arasında bağlantılandırılmamasını sağlar.

### 3. Finansal Analiz Agent'ı

Algoritmik bir alım satım agent'ı gerçek zamanlı piyasa verisi API'leri için ödeme yapar. Şeffaf ödemeler, her challenge için yeni T-adresleri kullanarak veri sağlayıcıları arasındaki kullanım örüntüsü korelasyonunu önler.

### 4. MCP Araç Sunucusu, Ücretli AI Araçları

Bir MCP (Model Context Protocol) sunucusu ücretli AI araçlarını sunar. Her araç çağrısı bir Zimppy ücretlendirmesini tetikler ve paraya çevrilmiş AI yeteneklerinden oluşan bir pazar yeri sağlar.

### 5. LLM Özetleyici, Token Başına Ödeme

Bir LLM özetleme hizmeti, SSE akışı aracılığıyla agent'lardan çıktı token'ı başına ücret alır; otomatik bakiye düşümü ve kullanılmayan ön ödemeli bakiyenin iadesini sağlar.

---

## Kurulum

### Node.js / TypeScript

```bash
npm install zimppy          # CLI + wallet
npm install zimppy-ts       # TypeScript SDK
```

### Rust

```toml
[dependencies]
zimppy-core = "0.5"         # Rust verification engine
zimppy-rs = "0.5"           # Rust SDK (charge, session, axum)
```

---

## Zimppy Cüzdanını Ayarlama

Zimppy CLI, tam kapsamlı bir cüzdan arayüzü sağlar. Tüm komutlara `npx zimppy` aracılığıyla erişilebilir.

### Adım 1 : Cüzdan Oluşturma

```bash
npx zimppy wallet create
```

Kriptografik anahtarlar üretir ve **seed phrase**'inizi gösterir. Bunu güvenli bir yerde saklayın; kaybedilirse kurtarılamaz.

### Adım 2 : Adresinizi ve Bakiyenizi Kontrol Etme

```bash
npx zimppy wallet whoami
```

**Unified Address (UA)**, **T-address**, mevcut bakiyeniz ve etkin ağınızı gösterir.

```bash
npx zimppy wallet balance --all
```

Tüm ZIP-32 hesaplarındaki hesap başına bakiye dökümünü gösterir.

### Adım 3 : Cüzdanınıza Fon Sağlama

ZEC'i, Zcash uyumlu herhangi bir cüzdandan veya borsadan Unified Address'inize gönderin. Korumalı yatırımlar doğrudan Orchard hesabınıza gider.

### Adım 4 : Fon Gönderme ve Koruma

```bash
# Herhangi bir adrese ZEC gönderin (korumalı veya şeffaf)
npx zimppy wallet send <addr> 42000

# Şeffaf fonları Orchard'a taşıyın (korumalı)
npx zimppy wallet shield

# Kendi hesaplarınız arasında transfer yapın
npx zimppy wallet transfer 0 1 50000

# Etkin cüzdan kimliğini değiştirin
npx zimppy wallet use work
```

### Adım 5 : Otomatik Ödeme İsteği Yapma

```bash
npx zimppy request <url>
```

Tam 402 -> ödeme -> yeniden deneme akışını otomatik olarak yönetir. Oturumlar şeffaf biçimde açılır ve yönetilir.

---

## Zimppy - TypeScript SDK Entegrasyonu

### TypeScript Sunucusu - Korumalı

```typescript
import { Mppx } from 'mppx/server'
import { zcash } from 'zimppy-ts/server'

const mppx = Mppx.create({
  methods: [await zcash({ wallet: 'server' })],
  realm: 'my-api',
  secretKey: process.env.MPP_SECRET_KEY,
})

const result = await mppx.charge({
  amount: '42000',
  currency: 'zec',
})(request)

if (result.status === 402) return result.challenge

return result.withReceipt(Response.json({ data }))
```

**Önemli noktalar:**
- `zcash({ wallet: 'server' })`, sunucunun korumalı cüzdanını yükler
- `mppx.charge()`, tam 402 challenge/doğrulama yaşam döngüsünü yönetir
- `result.withReceipt()`, yanıta kriptografik ödeme makbuzunu ekler

---

### TypeScript Sunucusu - Şeffaf

```typescript
import { Mppx } from 'mppx/server'
import { zcashTransparent } from 'zimppy-ts/server'

const mppx = Mppx.create({
  methods: [await zcashTransparent({ wallet: 'server' })],
  // per-challenge T-address generated automatically (replay-safe)
})
```

Her challenge, **yeni bir T-adresi** üretir ve ödeme isteklerini oturumlar arasında bağlantılandırılamaz hâle getirir.

---

### TypeScript İstemcisi

```typescript
import { Mppx } from 'mppx/client'
import { zcash } from 'zimppy-ts/client'

const mppx = Mppx.create({ methods: [zcash({ wallet: 'default' })] })

// Session opened automatically; 402 is handled transparently
const res = await mppx.fetch('https://api.example.com/resource')
```

İstemci `402` yanıtlarını yakalar, otomatik olarak oturum açar ve isteği yeniden dener; çağıran kod ödeme odaklı bir mantık gerektirmez.

---

## Zimppy - Rust SDK Entegrasyonu

### Rust Sunucusu (Axum)

```rust
use mpp::server::axum::*;
use zimppy_rs::ZcashChallenger;

struct Price;

impl ChargeConfig for Price {
    fn amount() -> &'static str { "42000" }
}

async fn handler(charge: MppCharge<Price>) -> WithReceipt<Json<Value>> {
    WithReceipt {
        receipt: charge.receipt,
        body: Json(data),
    }
}
```

**Önemli noktalar:**
- `MppCharge<Price>`, handler çalışmadan önce ödemeyi doğrulayan bir Axum extractor'ıdır
- `WithReceipt`, yanıtı kriptografik bir ödeme makbuzuyla sarmalar
- `ChargeConfig`, fiyatlandırma mantığını tanımlar; istek parametrelerine göre dinamik olabilir

---

### Rust İstemcisi

```rust
use mpp::client::Fetch;
use zimppy_rs::ZcashPaymentProvider;

let provider = ZcashPaymentProvider::new(wallet_config, &rpc);

let resp = client
    .get("https://api.example.com/resource")
    .send_with_payment(&provider)
    .await?;
```

`send_with_payment`, herhangi bir HTTP istemcisini otomatik 402 yönetimi, oturum yönetimi ve Zcash ödeme gerçekleştirmesiyle genişletir.

---

## CLI Referansı

| Komut | Açıklama |
|---|---|
| `npx zimppy wallet create` | Anahtarları üretir ve seed phrase'i gösterir |
| `npx zimppy wallet whoami` | Adresi (UA + T-addr), bakiyeyi ve ağı gösterir |
| `npx zimppy wallet balance --all` | Hesap başına bakiye dökümü |
| `npx zimppy wallet send <addr> <zat>` | Korumalı veya şeffaf ZEC gönderir |
| `npx zimppy wallet transfer <from> <to> <zat>` | Hesaplar arası dahili transfer |
| `npx zimppy wallet shield` | Şeffaf fonları Orchard'a taşır (korumalı) |
| `npx zimppy wallet use <name>` | Etkin cüzdan kimliğini değiştirir |
| `npx zimppy request <url>` | Otomatik 402 -> ödeme -> yeniden deneme isteği |

---

## Temel Özellikler

### Agent-Doğal Cüzdanlar

Zimppy cüzdanları, insan tarafından yönetilen tarayıcı eklentileri için değil, AI agent'ları tarafından programatik kullanım için tasarlanmıştır. Anahtarlar CLI veya SDK'ler aracılığıyla yönetilir, hesaplar **ZIP-32 hesap türetimi** yoluyla döndürülebilir ve cüzdan, işlem başına insan onayı olmadan tamamen otomatik ödeme akışlarını destekler.

### Çoklu Agent Desteği

Birden fazla agent, **ZIP-32 hesap rotasyonu** kullanarak aynı cüzdandan çalışabilir; her agent, izole bakiye takibi, hesaplar arası transfer yeteneği ve hesap başına bakiye raporlamasıyla kendi hesabını alır. Bu, tek bir cüzdan altyapısından çok sayıda agent'ın filo yönetimini sağlar.

### Tamamen Korumalı Zcash İşlemleri (Orchard)

Korumalı ödemeler, en yeni ve en güvenli korumalı havuz olan Zcash'ın **Orchard protokolünü** kullanır. Sunucu, harcama anahtarını açığa çıkarmadan alınan notların şifresini çözebilen bir **Incoming Viewing Key (IVK)** kullanarak ödemeleri doğrular. Yeniden oynatma saldırıları **memo bağlama** ile önlenir; her challenge, kriptografik olarak doğrulanan benzersiz bir `zimppy:{challenge_id}` memo'su içerir.

### Oturumlar , İstek Başına Sıfır Gecikme

Oturum mimarisi, zincir üzerindeki onay beklemesini istek başına gecikmeden ayırır. Tek bir para yatırma işleminden (~75 saniye) sonra, oturum kapanana kadar tüm sonraki bearer-token istekleri blockchain etkileşimi olmadan anında sunulur.

### Akış , Token Başına Ödeme

Doğal **SSE (Server-Sent Events)** desteği, token başına ücretlendirilen içeriği mümkün kılar. Çıktı uzunluğunun değişken olduğu ve faturalandırmanın gerçek tüketimi yansıtması gereken LLM çıkarım API'leri için idealdir.

### Spesifikasyon Uyumluluğu

- **HMAC-SHA256** imzalı challenge'lar sahteciliği önler
- Birlikte çalışabilir hata yönetimi için **RFC 9457** yapılandırılmış hata biçimi
- MPP uyumlu herhangi bir agent tarafından otomatik ödeme yöntemi keşfi için **`/.well-known/payment`**

---

## Mimari

```
crates/
  zimppy-core/       Zcash verification engine (Orchard decryption, replay protection)
  zimppy-wallet/     Native Zcash wallet (zingolib)
  zimppy-rs/         Rust SDK (ChargeMethod, SessionMethod, PaymentProvider, axum extractors)
  zimppy-napi/       Node.js native bindings (NAPI-RS)

packages/
  zimppy-ts/         TypeScript SDK (charge, session, SSE)
  zimppy-cli/        CLI with auto-pay and session management
```

### Bileşen Sorumlulukları

**`zimppy-core`** - Kriptografik çekirdek. Sunucunun IVK'sini kullanarak Orchard notlarının şifresini çözmeyi, memo ayrıştırmayı, yeniden oynatma koruma mantığını ve challenge doğrulamasını yönetir. Performans ve doğruluk için Rust ile yazılmıştır.

**`zimppy-wallet`** - `zingolib` destekli yerel bir Zcash cüzdanı. Anahtarları, hesapları, korumalı/şeffaf bakiyeleri ve işlem gönderimini yönetir.

**`zimppy-rs`** - Rust SDK. Ergonomik sunucu entegrasyonu için `ChargeMethod`, `SessionMethod` ve `PaymentProvider` trait'lerinin yanı sıra Axum extractor'ları (`MppCharge`, `WithReceipt`) sağlar.

**`zimppy-napi`** - Rust çekirdeğini Node.js'e açan NAPI-RS bağlamalarıdır; TypeScript SDK'sinin Zcash ilkel yapılarını JavaScript'te yeniden uygulamadan aynı kriptografik motoru kullanmasını sağlar.

**`zimppy-ts`** - TypeScript SDK. Ücretlendirme, oturum ve SSE akış akışları için NAPI bağlamalarını yerleşik async/await API'leriyle sarmalar.

**`zimppy-cli`** - Komut satırı cüzdanı ve istek aracı. Otomatik ödemeyi (402 -> ödeme -> yeniden deneme), oturum yönetimini ve tüm cüzdan işlemlerini destekler.

---

## Örnekler ve Demolar

| Örnek | Açıklama |
|---|---|
| `examples/fortune-teller/` | Ücretlendirme, oturum ve akış demoları - Rust sunucusu + istemci |
| `examples/llm-summarizer/` | Token başına ödeme yapan LLM akış demosu |
| `examples/mcp-server/` | Ücretli AI araçlarına sahip MCP araç sunucusu |
| `examples/ts-server/` | TypeScript MPP sunucusu referans uygulaması |

---

## Dahil Olanlar - Özellik Özeti

| Özellik | Açıklama |
|---|---|
| **Oturumlar** | Bir kez para yatırma, anlık bearer istekleri, kapanışta iade |
| **Akış** | SSE üzerinden token başına ücretlendirilen içerik |
| **Ücretlendirme** | HTTP isteği başına korumalı veya şeffaf ödeme (402 akışı) |
| **Şeffaf Ödemeler** | Challenge başına yeniden oynatma önleme + shield komutuyla T-adresleri |
| **Çoklu Hesap** | ZIP-32 hesap rotasyonu, hesaplar arası transferler, hesap başına bakiyeler |
| **CLI Cüzdanı** | Gönderme, shield, transfer, balance --all, whoami, otomatik ödeme |
| **Çift SDK** | TypeScript ve Rust |
| **Spesifikasyona Uyumlu** | HMAC-SHA256 challenge'ları, RFC 9457 hataları, `/.well-known/payment` keşfi |

---

*Daha fazla bilgi için [zimppy.xyz](https://zimppy.xyz) adresini ziyaret edin*

---

## İlgili Sayfalar

- [Cüzdanlar](/using-zcash/wallets) — Korumalı işlemleri destekleyen Zcash cüzdanları
- [Korumalı Havuzlar](/using-zcash/shielded-pools) — Orchard korumalı işlemlerinin ödeme verilerini nasıl koruduğu
- [Ödeme İşlemcileri](/using-zcash/payment-processors) — Zcash ödemelerini kabul etmenin diğer yolları
- [Zcash Shielded Assets](/zcash-tech/zcash-shielded-assets) — ZSA'lar ve Zcash programlanabilirliğinin geleceği
- [Topluluk Projeleri](/zcash-community/community-projects) — Daha fazla Zcash ekosistemi projesi
