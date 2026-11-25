<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Zimppy.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Zimppy.xyz

## Kısaca

- **Zimppy**, Zcash Machine Payment Protocol (MPP) kullanan, gizliliği önceliklendiren bir yapay zekâ ajanı ödeme altyapısıdır
- Zincir üstünde bir kez para yatırın (~NU7'ten bu yana blok başına 25 saniye), ardından istek başına blokzincir etkileşimi olmadan **sınırsız anında istek** gönderin
- Gönderenin, alıcının, tutarın ve memo'nun tümünün şifrelendiği **tamamen korumalı Zcash (Orchard)** ödemelerini destekler
- Yapay zekâ iş akışlarına ve API sunucularına kolayca entegre olmak için **TypeScript ve Rust SDK'larıyla** çalışır
- **LLM API'leri, veri pazar yerleri, MCP araç sunucuları** ve makineden makineye (M2M) tüm ödeme kullanım alanları için idealdir

---

> **Zimppy**, hem korumalı hem de şeffaf ödemeleri destekleyen, Zcash için Machine Payment Protocol (MPP) ödeme yöntemidir. Zincir üstünde bir kez para yatırın, ardından istek başına Zincir etkileşimi olmadan sınırsız anında bearer isteği gönderin.

---

## İçindekiler

1. [Zimppy.xyz nedir?](#what-is-zimppyxyz)
2. [Yapay Zekâ Ajanları İçin Korumalı Ödemeler Neden Önemlidir?](#why-shielded-payments-for-ai-agents)
3. [Machine Payment Protocol (MPP)](#machine-payment-protocol-mpp)
4. [Zimppy Nasıl Çalışır](#how-zimppy-works)
   - [Oturumlar (Önerilen)](#sessions-recommended)
   - [Akış](#streaming)
   - [Ücretlendirme](#charge)
5. [Kullanım Alanları ve Örnekler](#use-cases--examples)
6. [Kurulum](#installation)
7. [Zimppy Cüzdanını Ayarlama](#setting-up-the-zimppy-wallet)
8. [Zimppy Entegrasyonu](#integrating-zimppy--typescript-sdk)
   - [Sunucu (Korumalı)](#typescript-server--shielded)
   - [Sunucu (Şeffaf)](#typescript-server--transparent)
   - [İstemci](#typescript-client)
9. [Zimppy Entegrasyonu - Rust SDK](#integrating-zimppy--rust-sdk)
   - [Sunucu (Axum)](#rust-server-axum)
   - [İstemci](#rust-client)
10. [CLI Başvuru Kılavuzu](#cli-reference)
11. [Temel Özellikler](#key-features)
12. [Mimari](#architecture)
13. [Örnekler ve Demolar](#examples--demos)

---

## Zimppy.xyz nedir?

**Zimppy.xyz**, özellikle yapay zekâ ajanları ve otomatik makineden makineye (M2M) iş akışları için tasarlanmış, gizliliği önceliklendiren bir ödeme altyapısıdır. Temel para birimi olarak **Zcash** kullanan **Machine Payment Protocol'ü (MPP)** uygular ve hem korumalı (tamamen özel) hem de şeffaf ödeme modlarını mümkün kılar.

Her işlemin zincir üstünde herkese açık olduğu geleneksel blokzincir ödeme sistemlerinden farklı olarak Zimppy, istek başına gecikmeyi ortadan kaldırırken kriptografik gizliliği koruyan oturum tabanlı bir mimari üzerine kurulmuştur. Bu sayede davranışsal meta verileri açığa çıkarmadan API'ler, veriler, hesaplama kaynakları veya yapay zekâ araçları için programatik olarak ödeme yapması gereken yapay zekâ ajanları için benzersiz biçimde uygundur.

### Temel Özellikler

- Zincir üstünde bir kez para yatırın (NU7'ten bu yana bir Zcash bloğu için ~25 saniye; öncesinde 75 saniye)
- Oturum açıldıktan sonra sınırsız anında istek; istek başına blokzincir etkileşimi sıfır
- **Korumalı ödemeler**, göndereni, alıcıyı, tutarı ve memo'yu Zcash'ın Orchard protokolünü kullanarak şifreler
- **Şeffaf ödemeler**, tam gizlilik sağlamadan tekrar oynatma saldırılarını önlemek için her challenge'a özel T adresleri kullanır
- **Spesifikasyona uygundur**: HMAC-SHA256 challenge'ları, RFC 9457 hataları, `/.well-known/payment` keşfi

---

## Yapay Zekâ Ajanları İçin Korumalı Ödemeler Neden Önemlidir?

Hassas iş akışlarını, hukuki araştırmaları, tıbbi sorguları, finansal analizleri ve rekabet istihbaratını yürüten yapay zekâ ajanları için **herkese açık her ödeme bir meta veri sızıntısıdır**. Zimppy, **varsayılan olarak özel** olan tek MPP ödeme yöntemidir.

### Gizlilik Karşılaştırma Tablosu

| Özellik | Herkese Açık Zincirler (USDC, ETH) | Zimppy Korumalı | Zimppy Şeffaf |
|---|---|---|---|
| **Gönderen** | Görünür | Şifreli | Görünür |
| **Alıcı** | Görünür | Şifreli | Challenge başına (ilişkilendirilemez) |
| **Tutar** | Görünür | Şifreli | Görünür |
| **Memo** | Görünür | Şifreli | Yok |
| **Tekrar Oynatma Koruması** | Yok | Memo bağlama | Challenge başına T adresi |
| **Hizmet Kullanım Deseni** | İlişkilendirilebilir | Özel | İlişkilendirilemez (yeni adres) |

### Oturumlarla Çözülen Gecikme Sorunu

> *“Ancak Zcash blokları hâlâ 25 saniye sürüyor (NU7 öncesinde 75 saniye).”*

**Oturumlar bu sorunu çözer.** Zincir üstündeki bekleme, para yatırma sırasında tam olarak **bir kez** gerçekleşir. Sonraki her istek anında işlenir.

```
Agent  ->  deposit 100,000 zat           (one on-chain tx, ~25s)
Agent  ->  open session                  (bearer token issued)
Agent  ->  request -> response           (0ms - no chain interaction)
Agent  ->  request -> response           (0ms - no chain interaction)
Agent  ->  request -> response           (0ms - no chain interaction)
           ... hundreds of requests ...
Agent  ->  close session                 (refund unused balance)
```

**Bir kez ödeyin, anında çağrı yapın, para üstünüzü geri alın.** İstek başına gecikme sıfırdır.

---

## Machine Payment Protocol (MPP)

**Machine Payment Protocol (MPP)**, otonom yazılım ajanlarının (yapay zekâ ajanları, botlar, betikler) API erişimi için ödeme gerekliliklerini herhangi bir insan müdahalesi olmadan keşfetmesini, müzakere etmesini ve yerine getirmesini sağlayan standartlaştırılmış bir protokoldür.

### MPP'nin API'lerle Entegrasyonu

MPP, HTTP **402 Payment Required** akışını izler:

1. **Ajan**, ücretli bir API uç noktasından kaynak ister.
2. **Sunucu**, `402 Payment Required` + imzalı bir challenge (tutar, alıcı, memo) ile yanıt verir.
3. **Ajan**, uyumlu bir ödeme yöntemiyle (ör. Zimppy korumalı Zcash) ödeme yapar.
4. **Ajan**, isteği `Authorization: Payment {txid}` ile yeniden gönderir.
5. **Sunucu**, ödemeyi kriptografik olarak doğrular (Orchard IVK şifre çözme, tutar + memo kontrolü).
6. **Sunucu**, `200 OK` + `Payment-Receipt` başlığıyla yanıt verir.

### Spesifikasyona Uygunluk

- **HMAC-SHA256** challenge imzalama
- **RFC 9457** yapılandırılmış hata yanıtları
- Ödeme yöntemlerinin otomatik keşfi için **`/.well-known/payment`** uç noktası
- Harcama anahtarlarını açığa çıkarmadan sunucu tarafında ödeme doğrulaması için **Orchard IVK** (Incoming Viewing Key)

---

## Zimppy Nasıl Çalışır

### Oturumlar (Önerilen)

Oturumlar, temel etkileşim biçimidir. Ajan zincir üstünde bir kez bakiye yatırır, bir bearer token alır ve sonraki tüm istekler için bunu sıfır gecikmeyle kullanır.

```
Agent  ->  deposit 100,000 zat           (on-chain, ~75s one-time)
Agent  ->  open session                  (bearer token issued)
Agent  ->  GET /api/query + bearer       (instant, balance deducted)
Agent  ->  GET /api/query + bearer       (instant, balance deducted)
Agent  ->  close session                 (refund unused balance on-chain)
```

**En uygun kullanım:** Yüksek sıklıkta API çağrıları, LLM çıkarımı, yinelenen veri sorguları.

---

### Akış

**Server-Sent Events (SSE)** üzerinden sunulan, token başına ölçümlenen içerik için ödeme yapın. Sunucu, akışla iletilen her kelime veya token için oturum bakiyesinden düşer.

```
Agent  ->  open session with deposit
Agent  ->  GET /api/stream (SSE)
Server ->  stream word by word, deducting per token
Agent  ->  close session, refund remaining
```

**En uygun kullanım:** LLM akış yanıtları, gerçek zamanlı veri akışları, token başına ücretlendirilen yapay zekâ araçları.

---

### Ücretlendirme

İstek başına tek bir korumalı ödeme. Her çağrı için HTTP 402 akışının tamamı yürütülür. İsteklerin seyrek veya yüksek değerli olduğu durumlar için uygundur.

```
Agent  ->  GET /api/resource
Server ->  402 + challenge (amount, recipient, memo)
Agent  ->  shielded ZEC with memo "zimppy:{challenge_id}"
Agent  ->  GET /api/resource + Authorization: Payment {txid}
Server ->  decrypt with Orchard IVK, verify amount + memo
Server ->  200 OK + Payment-Receipt
```

**En uygun kullanım:** Tek seferlik yüksek değerli istekler, seyrek API çağrıları, premium veri uç noktaları.

---

## Kullanım Alanları ve Örnekler

### 1. Yapay Zekâ Ajanı

Hukuk alanında çalışan bir yapay zekâ ajanı, ücretli bir içtihat veri tabanını sorgular. Zimppy korumalı oturumlarını kullanarak ne hukuk firmasının kimliği ne de belirli sorgular zincir üstünde görünür; böylece avukat-müvekkil gizliliği altyapı düzeyinde korunur.

```
Agent opens session (100,000 zat deposit)
-> GET /api/cases?q=patent+infringement+2024     (instant)
-> GET /api/cases?q=prior+art+semiconductor      (instant)
-> GET /api/document/US11234567B2                (instant)
Session closed, unused balance refunded
```

### 2. Tıbbi Sorgu İş Akışı İçin Yapay Zekâ Ajanı

Tıbbi teşhis ajanı birden fazla klinik veri tabanını sorgular. Korumalı ödemeler, hasta sorgu desenlerinin farklı sağlayıcılar arasında ilişkilendirilememesini sağlar.

### 3. Finansal Analiz Ajanı

Algoritmik alım satım yapan bir ajan, gerçek zamanlı piyasa verisi API'leri için ödeme yapar. Şeffaf ödemeler her challenge için yeni T adresleri kullanır; böylece farklı veri sağlayıcıları arasındaki kullanım desenlerinin ilişkilendirilmesi önlenir.

### 4. MCP Araç Sunucusu, Ücretli Yapay Zekâ Araçları

Bir MCP (Model Context Protocol) sunucusu ücretli yapay zekâ araçları sunar. Her araç çağrısı bir Zimppy ücreti tetikleyerek para kazanılan yapay zekâ yeteneklerinden oluşan bir pazar yeri oluşturur.

### 5. LLM Özetleyici, Token Başına Ücretlendirme

Bir LLM özetleme hizmeti, SSE akışı üzerinden çıktı token'ı başına ajanlardan ücret alır; kullanılmayan ön ödemeli bakiye otomatik olarak düşülür ve iade edilir.

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

Zimppy CLI, eksiksiz bir cüzdan arayüzü sunar. Tüm komutlara `npx zimppy` üzerinden erişilebilir.

### Adım 1 : Cüzdan Oluşturma

```bash
npx zimppy wallet create
```

Kriptografik anahtarları oluşturur ve **kurtarma ifadenizi** görüntüler. Bunu güvenli bir yerde saklayın; kaybolursa kurtarılamaz.

### Adım 2 : Adresinizi ve Bakiyenizi Kontrol Etme

```bash
npx zimppy wallet whoami
```

**Birleşik Adresinizi (UA)**, **T adresinizi**, mevcut bakiyenizi ve etkin ağı görüntüler.

```bash
npx zimppy wallet balance --all
```

Tüm ZIP-32 hesapları genelinde hesap başına bakiye dökümünü gösterir.

### Adım 3 : Cüzdanınıza Para Yatırma

Herhangi bir Zcash-uyumlu cüzdan veya borsadan Birleşik Adresinize ZEC gönderin. Korumalı yatırmalar doğrudan Orchard hesabınıza gider.

### Adım 4 : Para Gönderme ve Korumalı Hâle Getirme

```bash
# Send ZEC to any address (shielded or transparent)
npx zimppy wallet send <addr> 42000

# Move transparent funds into Orchard (shielded)
npx zimppy wallet shield

# Transfer between your own accounts
npx zimppy wallet transfer 0 1 50000

# Switch active wallet identity
npx zimppy wallet use work
```

### Adım 5 : Otomatik Ödeme İsteği Yapma

```bash
npx zimppy request <url>
```

402 -> ödeme -> yeniden deneme akışının tamamını otomatik olarak yönetir. Oturumlar şeffaf biçimde açılır ve yönetilir.

---

## Zimppy Entegrasyonu - TypeScript SDK

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

**Temel noktalar:**
- `zcash({ wallet: 'server' })`, sunucunun korumalı cüzdanını yükler
- `mppx.charge()`, 402 challenge/doğrulama yaşam döngüsünün tamamını yönetir
- `result.withReceipt()`, kriptografik ödeme makbuzunu yanıta ekler

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

Her challenge **yeni bir T adresi** oluşturur ve ödeme isteklerinin oturumlar arasında ilişkilendirilememesini sağlar.

---

### TypeScript İstemcisi

```typescript
import { Mppx } from 'mppx/client'
import { zcash } from 'zimppy-ts/client'

const mppx = Mppx.create({ methods: [zcash({ wallet: 'default' })] })

// Session opened automatically; 402 is handled transparently
const res = await mppx.fetch('https://api.example.com/resource')
```

İstemci, `402` yanıtlarını yakalar, otomatik olarak bir oturum açar ve isteği yeniden gönderir; çağıran kodun ödemeye özgü bir mantık içermesi gerekmez.

---

## Zimppy Entegrasyonu - Rust SDK

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

**Temel noktalar:**
- `MppCharge<Price>`, işleyici çalışmadan önce ödemeyi doğrulayan bir Axum çıkarıcısıdır
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

`send_with_payment`, herhangi bir HTTP istemcisini otomatik 402 işleme, oturum yönetimi ve Zcash ödeme tamamlama özellikleriyle genişletir.

---

## CLI Başvuru Kılavuzu

| Komut | Açıklama |
|---|---|
| `npx zimppy wallet create` | Anahtarları oluşturur ve kurtarma ifadesini görüntüler |
| `npx zimppy wallet whoami` | Adresi (UA + T adresi), bakiyeyi ve ağı gösterir |
| `npx zimppy wallet balance --all` | Hesap başına bakiye dökümü |
| `npx zimppy wallet send <addr> <zat>` | Korumalı veya şeffaf ZEC gönderir |
| `npx zimppy wallet transfer <from> <to> <zat>` | Hesaplar arası dahili transfer |
| `npx zimppy wallet shield` | Şeffaf parayı Orchard (korumalı) hâle getirir |
| `npx zimppy wallet use <name>` | Etkin cüzdan kimliğini değiştirir |
| `npx zimppy request <url>` | İsteği otomatik olarak 402 -> öde -> yeniden dene akışıyla gönderir |

---

## Temel Özellikler

### Ajanlara Özel Cüzdanlar

Zimppy cüzdanları, insanların yönettiği tarayıcı eklentileri için değil, yapay zekâ ajanlarının programatik kullanımı için tasarlanmıştır. Anahtarlar CLI veya SDK'lar üzerinden yönetilir, hesaplar **ZIP-32 hesap türetme** ile değiştirilebilir ve cüzdan, her işlem için insan onayı gerektirmeden tamamen otomatik ödeme akışlarını destekler.

### Çoklu Ajan Desteği

Birden fazla ajan, **ZIP-32 hesap döndürme** özelliğini kullanarak aynı cüzdandan çalışabilir. Her ajan, yalıtılmış bakiye takibi, hesaplar arası transfer olanağı ve hesap başına bakiye raporlamasıyla kendi hesabını alır. Bu özellik, tek bir cüzdan altyapısından çok sayıda ajanın yönetilmesini sağlar.

### Tamamen Korumalı Zcash İşlemleri (Orchard)

Korumalı ödemeler, NU5 tarafından sunulan korumalı havuzu kullanan Zcash **Orchard protokolünü** kullanır. Sunucu, harcama anahtarını açığa çıkarmadan alınan note'ları şifre çözerek okuyabilen bir **Incoming Viewing Key (IVK)** kullanarak ödemeleri doğrular. Tekrar oynatma saldırıları, her challenge'ın kriptografik olarak doğrulanan benzersiz bir `zimppy:{challenge_id}` memo içermesini sağlayan **memo bağlama** ile önlenir.

### Oturumlar , İstek Başına Sıfır Gecikme

Oturum mimarisi, zincir üstü onay bekleme süresini istek başına gecikmeden ayırır. Tek bir yatırmadan sonra (NU7'ten bu yana yaklaşık 25 saniye), sonraki tüm bearer token istekleri, oturum kapanana kadar blokzincir etkileşimi olmadan anında işlenir.

### Akış , Token Başına Ücretlendirme

Yerleşik **SSE (Server-Sent Events)** desteği, token başına ölçümlenen içerik için ödeme yapılmasını sağlar. Çıktı uzunluğunun değişken olduğu ve ücretlendirmenin gerçek kullanımı yansıtması gereken LLM çıkarım API'leri için idealdir.

### Spesifikasyona Uygunluk

- Sahteciliği önlemek için **HMAC-SHA256** ile imzalanmış challenge'lar
- Birlikte çalışabilir hata yönetimi için **RFC 9457** yapılandırılmış hata biçimi
- MPP uyumlu tüm ajanların ödeme yöntemlerini otomatik keşfetmesi için **`/.well-known/payment`**

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

### Bileşenlerin Sorumlulukları

**`zimppy-core`** - Kriptografik çekirdek. Sunucunun IVK'sini kullanarak Orchard note şifre çözme işlemini, memo ayrıştırmayı, tekrar oynatma koruması mantığını ve challenge doğrulamasını yönetir. Performans ve doğruluk için Rust ile yazılmıştır.

**`zimppy-wallet`** - `zingolib` tarafından desteklenen yerel bir Zcash cüzdan. Anahtarları, hesapları, korumalı/şeffaf bakiyeleri ve işlem gönderimini yönetir.

**`zimppy-rs`** - Rust SDK'sı. `ChargeMethod`, `SessionMethod` ve `PaymentProvider` trait'lerinin yanı sıra kolay sunucu entegrasyonu için Axum çıkarıcıları (`MppCharge`, `WithReceipt`) sunar.

**`zimppy-napi`** - Rust çekirdeğini Node.js ortamına sunan NAPI-RS bağları. Böylece TypeScript SDK'sı, JavaScript içinde Zcash ilkellerini yeniden uygulamadan aynı kriptografik altyapıyı kullanabilir.

**`zimppy-ts`** - TypeScript SDK'sı. Ücretlendirme, oturum ve SSE akış süreçleri için NAPI bağlarını deyimsel async/await API'leriyle sarmalar.

**`zimppy-cli`** - Komut satırı cüzdanı ve istek aracı. Otomatik ödemeyi (402 -> öde -> yeniden dene), oturum yönetimini ve tüm cüzdan işlemlerini destekler.

---

## Örnekler ve Demolar

| Örnek | Açıklama |
|---|---|
| `examples/fortune-teller/` | Ücretlendirme, oturum ve akış demoları - Rust sunucusu + istemcisi |
| `examples/llm-summarizer/` | Token başına ücretlendirilen LLM akış demosu |
| `examples/mcp-server/` | Ücretli yapay zekâ araçları sunan MCP araç sunucusu |
| `examples/ts-server/` | TypeScript MPP sunucusu referans uygulaması |

---

## Neler Dahil - Özellik Özeti

| Özellik | Açıklama |
|---|---|
| **Oturumlar** | Bir kez para yatırın, anında bearer istekleri gönderin, oturum kapanınca para iadesi alın |
| **Akış** | SSE üzerinden token başına ölçümlenen içerik için ödeme |
| **Ücretlendirme** | HTTP isteği başına korumalı veya şeffaf ödeme (402 akışı) |
| **Şeffaf Ödemeler** | Challenge başına tekrar oynatma koruması ve korumalı hâle getirme komutuyla T adresleri |
| **Çoklu Hesap** | ZIP-32 hesap döndürme, hesaplar arası transferler, hesap başına bakiyeler |
| **CLI Cüzdanı** | Gönderme, korumalı hâle getirme, transfer, tüm bakiyeler, kim olduğumu göster, otomatik ödeme |
| **Çift SDK** | TypeScript ve Rust |
| **Spesifikasyona Uygun** | HMAC-SHA256 challenge'ları, RFC 9457 hataları, `/.well-known/payment` keşfi |

---

*Daha fazla bilgi için [zimppy.xyz](https://zimppy.xyz) adresini ziyaret edin*

---

## İlgili Sayfalar

- [Cüzdanlar](/using-zcash/wallets) — Korumalı işlemleri destekleyen Zcash cüzdanları
- [Korumalı Havuzlar](/using-zcash/shielded-pools) — Orchard korumalı işlemlerinin ödeme verilerini nasıl koruduğu
- [Ödeme İşlemcileri](/using-zcash/payment-processors) — Zcash ödemelerini kabul etmenin diğer yolları
- [Zcash Korumalı Varlıklar](/zcash-tech/zcash-shielded-assets) — ZSA'lar ve Zcash programlanabilirliğinin geleceği
- [Topluluk Projeleri](/zcash-community/community-projects) — Daha fazla Zcash ekosistem projesi
