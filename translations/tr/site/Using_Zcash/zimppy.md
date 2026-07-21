<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/zimppy.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Zimppy.xyz

## Kısaca

- **Zimppy**, Zcash'nin Makine Ödeme Protokolü'nü (MPP) kullanan, yapay zekâ ajanları için gizlilik öncelikli bir ödeme altyapısıdır
- Zincir üzerinde bir kez **depozito yatırın** (~75 saniye), ardından istek başına blokzincir etkileşimi olmadan **sınırsız anlık istek** yapın
- **Tamamen shielded Zcash (Orchard)** ödemelerini destekler — gönderici, alıcı, tutar ve notun tamamı şifrelenir
- Yapay zekâ iş akışlarına ve API sunucularına kolay entegrasyon için **TypeScript ve Rust SDK'larıyla** çalışır
- **LLM API'leri, veri pazarları, MCP araç sunucuları** ve her türlü M2M ödeme kullanım senaryosu için mükemmeldir

Çevrilecek Markdown parçası mesajda yer almıyor. Lütfen fragmenti gönderin; yalnızca Türkçe çeviriyi döndüreceğim.

> **Zimppy**, Zcash için hem shielded hem de transparent ödemeleri destekleyen Machine Payment Protocol (MPP) ödeme yöntemidir. Zincir üzerinde bir kez para yatırın, ardından istek başına zincir etkileşimi olmadan sınırsız sayıda anlık bearer isteği yapın.

Lütfen çevrilecek Markdown parçasını gönderin.

## İçindekiler

1. [Zimppy.xyz nedir?](#what-is-zimppyxyz)
2. [YZ Aracıları için Neden Shielded Ödemeler?](#why-shielded-payments-for-ai-agents)
3. [Makine Ödeme Protokolü (MPP)](#machine-payment-protocol-mpp)
4. [Zimppy Nasıl Çalışır](#how-zimppy-works)
   - [Oturumlar (Önerilen)](#sessions-recommended)
   - [Akış](#streaming)
   - [Ücretlendirme](#charge)
5. [Kullanım Alanları ve Örnekler](#use-cases--examples)
6. [Kurulum](#installation)
7. [Zimppy Cüzdanını Kurma](#setting-up-the-zimppy-wallet)
8. [Zimppy Entegrasyonu](#integrating-zimppy--typescript-sdk)
   - [Sunucu (Shielded)](#typescript-server--shielded)
   - [Sunucu (Şeffaf)](#typescript-server--transparent)
   - [İstemci](#typescript-client)
9. [Zimppy Entegrasyonu - Rust SDK](#integrating-zimppy--rust-sdk)
   - [Sunucu (Axum)](#rust-server-axum)
   - [İstemci](#rust-client)
10. [CLI Referansı](#cli-reference)
11. [Temel Özellikler](#key-features)
12. [Mimari](#architecture)
13. [Örnekler ve Demolar](#examples--demos)

Kaynak Markdown parçası eksik. Lütfen çevirmemi istediğiniz İngilizce metni gönderin.

## Zimppy.xyz nedir?

**Zimppy.xyz**, özellikle yapay zekâ ajanları ve otomatik makineden makineye (M2M) iş akışları için tasarlanmış, gizlilik öncelikli bir ödeme altyapısıdır. Temel para birimi olarak **Zcash** kullanarak **Makine Ödeme Protokolü’nü (MPP)** uygular ve hem korumalı (tamamen özel) hem de şeffaf ödeme modlarını mümkün kılar.

Geleneksel blokzincir ödeme sistemlerinin aksine, her işlemin zincir üzerinde herkese açık şekilde görülebildiği yapılarda, Zimppy; istek başına gecikmeyi ortadan kaldıran ve kriptografik gizliliği koruyan oturum tabanlı bir mimari etrafında tasarlanmıştır. Bu da onu, davranışsal meta verilerini sızdırmadan API'ler, veri, işlem gücü veya yapay zekâ araçları için programatik olarak ödeme yapması gereken yapay zekâ ajanları için benzersiz derecede uygun hâle getirir.

### Temel Özellikler

- **Bir kez yatırma** işlemi zincir üzerinde yapılır (Zcash onayı için ~75 saniye)
- Oturum açıldıktan sonra **sınırsız anlık istek**, istek başına zincirle sıfır etkileşim
- **Shielded ödemeler**, Zcash'nin Orchard protokolünü kullanarak göndereni, alıcıyı, tutarı ve notu şifreler
- **Transparent ödemeler**, tam gizlilik olmadan yeniden oynatma saldırılarını önlemek için zorluk başına T-adresleri kullanır
- **Spesifikasyona uyumlu**, HMAC-SHA256 zorlukları, RFC 9457 hataları, `/.well-known/payment` keşfi

Lütfen çevrilecek Markdown parçasını gönderin.

## Yapay Zekâ Ajanları için Neden Korumalı Ödemeler?

Yapay zekâ ajanlarının hassas iş akışlarını, hukuki araştırmaları, tıbbi sorguları, finansal analizleri, rekabet istihbaratını yürüttüğü durumlarda, **herkese açık her ödeme bir metadata sızıntısıdır**. Zimppy, varsayılan olarak **özel** olan tek MPP ödeme yöntemidir.

### Gizlilik Karşılaştırma Tablosu

| Özellik | Herkese Açık Zincirler (USDC, ETH) | Zimppy Shielded | Zimppy Transparent |
|---|---|---|---|
| **Gönderen** | Görünür | Şifrelenmiş | Görünür |
| **Alıcı** | Görünür | Şifrelenmiş | Meydan okuma başına (ilişkilendirilemez) |
| **Miktar** | Görünür | Şifrelenmiş | Görünür |
| **Not** | Görünür | Şifrelenmiş | Yok |
| **Yeniden Oynatma Koruması** | Yok | Memo bağlama | Meydan okuma başına T-adresi |
| **Hizmet Kullanım Deseni** | İlişkilendirilebilir | Özel | İlişkilendirilemez (yeni adres) |

### Gecikme Sorunu, Oturumlarla Çözüldü

> *"Ama Zcash'in blok süreleri 75 saniyedir."*

**Oturumlar bunu çözer.** Zincir üstü bekleme, para yatırma sırasında tam olarak **bir kez** gerçekleşir. Sonraki her talep anında yapılır.

```
Agent  ->  deposit 100,000 zat           (one on-chain tx, ~75s)
Agent  ->  open session                  (bearer token issued)
Agent  ->  request -> response           (0ms - no chain interaction)
Agent  ->  request -> response           (0ms - no chain interaction)
Agent  ->  request -> response           (0ms - no chain interaction)
           ... hundreds of requests ...
Agent  ->  close session                 (refund unused balance)
```

**Bir kez ödeyin, anında çağırın, para üstünüzü geri alın.** İstek başına gecikme sıfırdır.

Lütfen çevirmemi istediğiniz Markdown parçasını gönderin.

## Makine Ödeme Protokolü (MPP)

**Makine Ödeme Protokolü (MPP)**, otonom yazılım ajanlarının (AI ajanları, botlar, script’ler) insan müdahalesi olmadan API erişimi için ödeme gereksinimlerini keşfetmesini, müzakere etmesini ve yerine getirmesini sağlayan standartlaştırılmış bir protokoldür.

### MPP API'lerle Nasıl Entegre Olur

MPP, HTTP **402 Payment Required** akışını takip eder:

1. **Ajan**, ücretli bir API uç noktasından bir kaynak **talep eder**.
2. **Sunucu**, `402 Payment Required` + imzalı bir doğrulama isteğiyle (tutar, alıcı, not) **yanıt verir**.
3. **Ajan**, uyumlu bir ödeme yöntemi kullanarak **ödeme yapar** (ör. Zimppy shielded Zcash).
4. **Ajan**, isteği `Authorization: Payment {txid}` ile **yeniden dener**.
5. **Sunucu**, ödemeyi kriptografik olarak **doğrular** (Orchard IVK şifre çözme, tutar + not kontrolü).
6. **Sunucu**, `200 OK` + bir `Payment-Receipt` başlığı ile **yanıt verir**.

### Spesifikasyon Uyumluluğu

- **HMAC-SHA256** challenge imzalama
- **RFC 9457** yapılandırılmış hata yanıtları
- Ödeme yöntemi otomatik keşfi için **`/.well-known/payment`** endpoint'i
- Harcama anahtarlarını açığa çıkarmadan sunucu taraflı ödeme doğrulaması için **Orchard IVK** (Gelen **Viewing Key**)

Çevrilecek Markdown parçası mesajda yer almıyor. Lütfen `---` sonrasına fragmenti yapıştırın.

## Zimppy Nasıl Çalışır

### Oturumlar (Önerilen)

Oturumlar birincil etkileşim modelidir. Aracı, zincir üzerinde bir kez bakiye yatırır, bir bearer token alır ve bunu sonraki tüm istekler için sıfır gecikmeyle kullanır.

```
Agent  ->  deposit 100,000 zat           (on-chain, ~75s one-time)
Agent  ->  open session                  (bearer token issued)
Agent  ->  GET /api/query + bearer       (instant, balance deducted)
Agent  ->  GET /api/query + bearer       (instant, balance deducted)
Agent  ->  close session                 (refund unused balance on-chain)
```

**En uygun kullanım alanları:** Yüksek frekanslı API çağrıları, LLM çıkarımı, tekrarlanan veri sorguları.

Lütfen çevrilecek Markdown parçasını gönderin.

### Akış

**Server-Sent Events (SSE)** üzerinden iletilen token başına ücretlendirilen içerik. Sunucu, akış halinde iletilen her kelime veya token için oturum bakiyesinden düşer.

```
Agent  ->  open session with deposit
Agent  ->  GET /api/stream (SSE)
Server ->  stream word by word, deducting per token
Agent  ->  close session, refund remaining
```

**Şunun için en uygunu:** LLM akış yanıtları, gerçek zamanlı veri akışları, token başına ödeme yapılan yapay zekâ araçları.

Lütfen çevirmemi istediğiniz Markdown parçasını gönderin.

### Ücret

İstek başına tek bir shielded ödeme. Tam HTTP 402 akışı her çağrı için yürütülür. İsteklerin seyrek olduğu veya yüksek değer taşıdığı durumlar için uygundur.

```
Agent  ->  GET /api/resource
Server ->  402 + challenge (amount, recipient, memo)
Agent  ->  shielded ZEC with memo "zimppy:{challenge_id}"
Agent  ->  GET /api/resource + Authorization: Payment {txid}
Server ->  decrypt with Orchard IVK, verify amount + memo
Server ->  200 OK + Payment-Receipt
```

**En iyi kullanım alanı:** Yüksek değerli tek seferlik istekler, seyrek API çağrıları, premium veri uç noktaları.

Lütfen çevrilecek Markdown parçasını gönderin.

## Kullanım Alanları ve Örnekler

### 1. AI Ajanı

Hukuki bir yapay zeka ajanı, ücretli bir içtihat veritabanını sorgular. Zimppy korumalı oturumları kullanıldığında ne hukuk bürosunun kimliği ne de belirli sorgular zincir üzerinde görünür — böylece avukat-müvekkil gizliliği altyapı düzeyinde korunur.

```
Agent opens session (100,000 zat deposit)
-> GET /api/cases?q=patent+infringement+2024     (instant)
-> GET /api/cases?q=prior+art+semiconductor      (instant)
-> GET /api/document/US11234567B2                (instant)
Session closed, unused balance refunded
```

### 2. Tıbbi Sorgu İşlem Hattı için Yapay Zeka Aracısı

Bir tıbbi tanı ajanı birden fazla klinik veritabanını sorgular. Shielded ödemeler, hasta sorgu örüntülerinin sağlayıcılar arasında birbirine bağlanamamasını sağlar.

### 3. Finansal Analiz Ajanı

Algoritmik bir alım satım ajanı, gerçek zamanlı piyasa verisi API’leri için ödeme yapar. Şeffaf ödemeler, her görev için yeni T-adresleri kullanır ve böylece farklı veri sağlayıcıları arasında kullanım örüntülerinin ilişkilendirilmesini önler.

### 4. MCP Araç Sunucusu, Ücretli Yapay Zeka Araçları

Bir MCP (Model Context Protocol) sunucusu, ücretli yapay zeka araçlarını kullanıma sunar. Her araç çağrısı bir Zimppy ücretini tetikler ve böylece paraya dönüştürülebilen yapay zeka yeteneklerinden oluşan bir pazar yeri mümkün olur.

### 5. LLM Özetleyici, Token Başına Ödeme

Bir LLM özetleme hizmeti, ajanlardan çıktı tokeni başına SSE akışı üzerinden ücret alır; kullanılmayan ön ödemeli bakiyenin otomatik olarak düşülmesi ve iade edilmesi sağlanır.

Çevrilecek Markdown parçası sağlanmadı.

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

I can’t translate yet because the source Markdown fragment was not included after the `---` separator.

Please paste the English Markdown fragment, and I’ll return only the Turkish translation in the exact same Markdown structure.

## Zimppy Cüzdanını Kurma

Zimppy CLI, tam kapsamlı bir cüzdan arayüzü sunar. Tüm komutlara `npx zimppy` üzerinden erişilebilir.

### Adım 1 : Bir Cüzdan Oluşturun

```bash
npx zimppy wallet create
```

Kriptografik anahtarlar oluşturur ve **seed phrase**'inizi görüntüler. Bunu güvenli bir şekilde saklayın - kaybolursa geri getirilemez.

### Adım 2 : Adresinizi ve Bakiyenizi Kontrol Edin

```bash
npx zimppy wallet whoami
```

**Unified Address (UA)**, **T-adresi**, mevcut bakiyesi ve etkin ağı görüntüler.

```bash
npx zimppy wallet balance --all
```

Tüm ZIP-32 hesapları genelinde hesap başına bakiye dökümünü gösterir.

### Adım 3 : Cüzdanınıza Fon Yatırın

Herhangi bir Zcash uyumlu cüzdandan veya borsadan Unified Address adresinize ZEC gönderin. Korumalı yatırımlar doğrudan Orchard hesabınıza gider.

### Adım 4 : Fon Gönderin ve Korumaya Alın

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

### Adım 5 : Bir Otomatik Ödeme Talebi Oluşturun

```bash
npx zimppy request <url>
```

402 -> ödeme -> yeniden dene akışının tamamını otomatik olarak yönetir. Oturumlar şeffaf bir şekilde açılır ve yönetilir.

Lütfen çevrilecek Markdown parçasını gönderin.

## Zimppy'yi Entegre Etme - TypeScript SDK

### TypeScript Sunucusu - Shielded

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
- `zcash({ wallet: 'server' })` sunucunun shielded cüzdanını yükler
- `mppx.charge()` tam 402 challenge/verify yaşam döngüsünü yönetir
- `result.withReceipt()` yanıtın içine kriptografik ödeme makbuzunu ekler

Lütfen çevrilecek Markdown parçasını gönderin.

### TypeScript Sunucusu - Şeffaf

```typescript
import { Mppx } from 'mppx/server'
import { zcashTransparent } from 'zimppy-ts/server'

const mppx = Mppx.create({
  methods: [await zcashTransparent({ wallet: 'server' })],
  // per-challenge T-address generated automatically (replay-safe)
})
```

Her meydan okuma, ödeme taleplerini oturumlar arasında ilişkilendirilemez hale getiren **yeni bir T-adresi** oluşturur.

Lütfen çevrilecek Markdown parçasını gönderin.

### TypeScript İstemcisi

```typescript
import { Mppx } from 'mppx/client'
import { zcash } from 'zimppy-ts/client'

const mppx = Mppx.create({ methods: [zcash({ wallet: 'default' })] })

// Session opened automatically; 402 is handled transparently
const res = await mppx.fetch('https://api.example.com/resource')
```

İstemci, `402` yanıtlarını yakalar, otomatik olarak bir oturum açar ve isteği yeniden dener - çağıran kod herhangi bir ödemeye özgü mantık gerektirmez.

Lütfen çevrilecek Markdown parçasını gönderin.

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

**Ana noktalar:**
- `MppCharge<Price>`, handler çalışmadan önce ödemeyi doğrulayan bir Axum extractor’ıdır
- `WithReceipt`, yanıtı kriptografik bir ödeme makbuzuyla sarar
- `ChargeConfig`, fiyatlandırma mantığını tanımlar - istek parametrelerine göre dinamik olabilir

Markdown fragment missing.

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

`send_with_payment` herhangi bir HTTP istemcisini otomatik 402 işleme, oturum yönetimi ve Zcash ödeme gerçekleştirme ile genişletir.

Çevrilecek Markdown parçası eksik. Lütfen fragment’i gönderin.

## CLI Referansı

| Komut | Açıklama |
|---|---|
| `npx zimppy wallet create` | Anahtarları oluştur ve seed ifadesini göster |
| `npx zimppy wallet whoami` | Adresi göster (UA + T-addr), bakiye, ağ |
| `npx zimppy wallet balance --all` | Hesap bazında bakiye dökümü |
| `npx zimppy wallet send <addr> <zat>` | Shielded veya transparent ZEC gönder |
| `npx zimppy wallet transfer <from> <to> <zat>` | Hesaplar arası dahili transfer |
| `npx zimppy wallet shield` | Transparent fonları Orchard'e taşı (shielded) |
| `npx zimppy wallet use <name>` | Etkin cüzdan kimliğini değiştir |
| `npx zimppy request <url>` | Otomatik 402 -> öde -> isteği yeniden dene |

Lütfen çevirmemi istediğiniz Markdown parçasını `---` satırının altına yapıştırın.

## Temel Özellikler

### Yerel-Ajan Cüzdanları

Zimppy cüzdanları, insanlar tarafından yönetilen tarayıcı eklentileri için değil, yapay zekâ ajanları tarafından programatik kullanım için tasarlanmıştır. Anahtarlar CLI veya SDK'lar üzerinden yönetilir, hesaplar **ZIP-32 hesap türetimi** ile döndürülebilir ve cüzdan, işlem başına insan onayı gerektirmeden tamamen otomatik ödeme akışlarını destekler.

### Çoklu Ajan Desteği

Birden fazla ajan, **ZIP-32 hesap rotasyonu** kullanarak aynı cüzdandan çalışabilir - her ajan, izole bakiye takibi, hesaplar arası transfer yeteneği ve hesap bazında bakiye raporlaması ile kendi hesabına sahip olur. Bu, tek bir cüzdan altyapısından birçok ajanın filo yönetimini mümkün kılar.

### Tamamen Shielded Zcash İşlemler (Orchard)

Shielded ödemeler, Zcash'nin **Orchard protokolünü** kullanır - en güncel ve en güvenli shielded havuzu. Sunucu, harcama anahtarını açığa çıkarmadan alınan notları çözebilen bir **Incoming Viewing Key (IVK)** kullanarak ödemeleri doğrular. Replay saldırıları, **memo binding** sayesinde önlenir - her challenge, kriptografik olarak doğrulanan benzersiz bir `zimppy:{challenge_id}` memo içerir.

### Oturumlar, İstek Başına Sıfır Gecikme

Oturum mimarisi, zincir üstü onay beklemesini istek başına gecikmeden ayırır. Tek bir yatırma işleminden sonra (~75 saniye), oturum kapanana kadar sonraki tüm bearer-token istekleri herhangi bir blokzincir etkileşimi olmadan anında karşılanır.

### Akış, Token Başına Ödeme

Yerel **SSE (Server-Sent Events)** desteği, token başına ücretlendirilen ölçümlü içeriği mümkün kılar. Çıktı uzunluğunun değişken olduğu ve faturalandırmanın gerçek tüketime göre yapılması gereken LLM çıkarım API'leri için idealdir.

### Spesifikasyona Uygunluk

- Sahteciliği önlemek için **HMAC-SHA256** ile imzalanmış sorgulamalar
- Birlikte çalışabilir hata işleme için **RFC 9457** yapılandırılmış hata biçimi
- Herhangi bir MPP uyumlu aracı tarafından otomatik ödeme yöntemi keşfi için **`/.well-known/payment`**

Çevrilecek Markdown parçası sağlanmadı.

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

**`zimppy-core`** - Kriptografik çekirdek. Sunucunun IVK'sini kullanarak Orchard notlarının şifresinin çözülmesini, memo ayrıştırmayı, yeniden oynatma koruması mantığını ve challenge doğrulamasını yönetir. Performans ve doğruluk için Rust ile yazılmıştır.

**`zimppy-wallet`** - `zingolib` tarafından desteklenen yerel bir Zcash cüzdanıdır. Anahtarları, hesapları, shielded/transparent bakiyeleri ve işlem gönderimini yönetir.

**`zimppy-rs`** - Rust SDK'sı. `ChargeMethod`, `SessionMethod` ve `PaymentProvider` trait'lerini sağlar; ayrıca ergonomik sunucu entegrasyonu için Axum extractor'larını (`MppCharge`, `WithReceipt`) içerir.

**`zimppy-napi`** - Rust çekirdeğini Node.js'e açığa çıkaran NAPI-RS bağlayıcıları; böylece TypeScript SDK, Zcash primitiflerini JavaScript'te yeniden uygulamak zorunda kalmadan aynı kriptografik motoru kullanabilir.

**`zimppy-ts`** - TypeScript SDK'si. Ücretlendirme, oturum ve SSE akış süreçleri için NAPI bağlamalarını deyimsel `async/await` API'leriyle sarmalar.

**`zimppy-cli`** - Komut satırı cüzdanı ve istek aracı. Otomatik ödemeyi (402 -> pay -> retry), oturum yönetimini ve tüm cüzdan işlemlerini destekler.

Çevrilecek Markdown parçası sağlanmadı.

## Örnekler ve Demolar

| Örnek | Açıklama |
|---|---|
| `examples/fortune-teller/` | Ücretlendirme, oturum ve akış demoları - Rust sunucu + istemci |
| `examples/llm-summarizer/` | Token başına ödeme yapılan LLM akış demosu |
| `examples/mcp-server/` | Ücretli yapay zeka araçlarıyla MCP araç sunucusu |
| `examples/ts-server/` | TypeScript MPP sunucusu referans uygulaması |

Çevrilecek Markdown parçası sağlanmadı.

## Neler Dahil - Özellik Özeti

| Özellik | Açıklama |
|---|---|
| **Oturumlar** | Bir kez para yatırma, anında bearer istekleri, kapanışta iade |
| **Akış** | SSE üzerinden token başına ücretlendirilen içerik |
| **Ücretlendirme** | HTTP isteği başına shielded veya transparent ödeme (`402` akışı) |
| **Şeffaf Ödemeler** | Challenge başına yeniden oynatma önleme + shield komutuyla T-adresleri |
| **Çoklu Hesap** | ZIP-32 hesap rotasyonu, hesaplar arası transferler, hesap başına bakiyeler |
| **CLI Cüzdanı** | Gönder, shield, transfer, `balance --all`, `whoami`, otomatik ödeme |
| **Çift SDK** | TypeScript ve Rust |
| **Spesifikasyona Uyumlu** | HMAC-SHA256 challenge'ları, RFC 9457 hataları, `/.well-known/payment` keşfi |

Lütfen çevrilecek Markdown parçasını gönderin.

*Daha fazla bilgi için ziyaret edin [zimppy.xyz](https://zimppy.xyz)*

Lütfen çevrilecek Markdown parçasını gönderin.

## İlgili Sayfalar

- [Cüzdanlar](/using-zcash/wallets) — Korumalı işlemleri destekleyen Zcash cüzdanlar
- [Korumalı Havuzlar](/using-zcash/shielded-pools) — Orchard korumalı işlemler ödeme verilerini nasıl korur
- [Ödeme İşlemcileri](/using-zcash/payment-processors) — Zcash ödemelerini kabul etmenin diğer yolları
- [Zcash Korumalı Varlıklar](/zcash-tech/zcash-shielded-assets) — ZSA'lar ve Zcash programlanabilirliğinin geleceği
- [Topluluk Projeleri](/zcash-community/community-projects) — Daha fazla Zcash ekosistem projesi