# Zcash Testnet

## Zcash Testnet Nedir?

**Zcash Testnet**, gerçek Zcash ana ağına (Mainnet) paralel bir blokzincirdir ve protokolü, kuralları ve işlem mantığını aynen kopyalar; ancak 2 temel farkı vardır:

1. **Coin’lerin gerçek parasal değeri yoktur**; bunlara ZEC değil **TAZ** denir ve yalnızca test amacıyla kullanılır.  
2. **Ağ yükseltmeleri, araçlar ve yazılımlar**, gerçek Zcash blokzincirinde kullanıma sunulmadan önce burada test edilir.

Başka bir deyişle Testnet, geliştiricilerin, denetçilerin ve ürün geliştirenlerin gerçek para riski almadan fikirlerini deneyebilecekleri bir **sandbox veya deney ortamı** gibidir.

## Testnet Neden Var?

Testnet, blokzincir geliştirme açısından kritik öneme sahiptir; çünkü Zcash gibi gerçek blokzincirler **değiştirilemezdir**. İşlemler ana ağda onaylandıktan sonra geri alınamaz. Testnet, özellikleri Mainnet’te kullanıma sunmadan önce denemek, test etmek ve hata ayıklamak için **güvenli bir kopya** sağlar.

### Testnet’in Kullanım Alanları

#### 1. Yazılım Geliştirme ve Entegrasyon

Cüzdan, borsa, madencilik yazılımı veya gizlilik araçları geliştiren geliştiriciler bunları Testnet’te güvenle test edebilir. Olanaklar şunları içerir:

- İşlem gönderme ve alma
- Sıfır değerli TAZ coin’leriyle yeni bloklar madenciliği yapma
- Kullanıcı arayüzleri ve API’ler geliştirme
- İşlem gizliliği özelliklerini test etme (şeffaf ve korumalı)

**Örnek:**  
[`zcash_tx_tool`](https://github.com/QED-it/zcash_tx_tool) gibi araçlar, işlem oluşturmak ve Zcash korumalı varlık işlevlerini test etmek için Testnet’i kullanır.

**Gerçek dünyadan bir senaryo:**  
Bir cüzdan geliştiricisi, Mainnet’te yayına geçmeden önce yazılımını bir Testnet RPC uç noktasına bağlayıp adres oluşturma, korumalı işlemler gönderme ve bakiyeleri doğrulama dahil tüm yaşam döngüsünü simüle edebilir.

#### 2. Ağ Yükseltmelerini Test Etme

Zcash, çekirdek protokolünü düzenli olarak yükseltir (ör. NU6.1, NU6.2 ve Ironwood). Testnet, yeni yükseltmeleri **Mainnet’ten önce** etkinleştirerek geliştiricilerin ve topluluğun hataları belirleyip düzeltmesine olanak tanır.

**Örnek:**  
Yeni bir konsensüs kuralı veya işlem türü önce Testnet’e uygulanır. Testler başarıyla tamamlandıktan sonra önceden belirlenmiş bir blok yüksekliğinde Mainnet’te etkinleşir.

#### 3. Düğüm Uygulamalarını Test Etme

Zcash için bakımı sürdürülen düğüm **Zebra**’dır (Zcash Foundation tarafından bakımı sürdürülen Rust tabanlı düğüm); bakımı sürdürülen cüzdan ise [Zallet](https://github.com/zcash/zallet)’dır. Özgün düğüm uygulaması olan `zcashd`, 18 Temmuz 2026’da otomatik destek sonu durdurmasına ulaştı ve artık bakımı sürdürülmüyor. Zebra ve Zallet’ya geçiş için [zcashd’e bakın](https://zechub.wiki/guides/migration-guide-zcashd-to-zebrad-zallet). Testnet, düğümlerin finansal risk olmadan gerçek koşullarda test edilmesini sağlar.

Düğüm geliştiricileri şunları yapabilir:

- Blok yayılımını doğrulama
- RPC arayüzlerini test etme
- Düğüm davranışını yük altında gözlemleme
- Madencilik yazılımlarının etkileşimlerini test etme

#### 4. Öğrenme ve Eğitim

Yeni başlayanlar madencilik, korumalı işlemler oluşturma ve Birleşik Adresleri kullanma gibi Zcash özelliklerini öğrenebilir.  
Topluluk eğitimleri ve belgeleri, **Testnet faucet’lerine, blok gezginlerine ve kılavuzlara** erişim sağlar.

## Testnet’in Gerçek Kullanım Alanları

### 1. Geliştirici Testleri (Cüzdan / Uygulama)

- Zcash Testnet’e bağlanma
- Bir faucet’ten TAZ talep etme
- Korumalı işlemler gönderme
- Gizliliği ve kullanıcı arayüzünün kararlılığını doğrulama

Hata yapılsa bile gerçek ZEC kaybedilmez.

### 2. Borsa Entegrasyonu Testleri

- Bir Testnet düğümü çalıştırma
- İşlemleri işlemek için Zebrad JSON-RPC uç noktalarını kullanma
- Otomatik para yatırma/çekme mantığını test etme

Üretim kodunun güvenliğini sağlar ve finansal kayıpları önler.

### 3. Madencilik Kurulumu Denemeleri

- Madencilik şablonlarını kullanma
- Blok doğrulamayı test etme
- Madencilik ödüllerini gözlemleme (yalnızca TAZ)
- Madencilik performansını ayarlama

Mainnet’e geçerken hizmet kesintisini veya kazanç kaybını önler.

### 4. Akademik Araştırma / Protokol Araştırması

Araştırmacılar Testnet’i kullanarak **durumsuz doğrulama**, **sıfır bilgi kanıtı optimizasyonu** veya diğer protokol deneyleri gibi yenilikleri test edebilir.  
İleri düzey kullanıcılar, özel deneyler için **özel Testnet’ler veya regtest ortamları** da çalıştırabilir.

## Mainnet ve Testnet Arasındaki Temel Farklar

| Özellik               | Mainnet           | Testnet                  |
|-----------------------|-----------------|--------------------------|
| Coin’lerin değeri     | Gerçek ZEC         | TAZ (parasal değeri yok) |
| Risk                  | Finansal risk   | Test için güvenli        |
| Protokol yükseltmeleri| Üretim          | Erken etkinleştirme      |
| Madencilik ödülleri   | Gerçek ihracı   | Yalnızca test ödülü      |
| Ağın kullanım amacı   | Canlı işlemler  | Test ve geliştirme       |

## Yaygın Yanlış Anlamalar

- **Testnet coin’leri bir değere sahiptir** -> Yanlış, TAZ’ın değeri sıfırdır.
- **Testnet coin’lerini kaybetmek önemlidir** -> Yanlış, gerçek bir değer kaybedilmez.
- **Testnet ile Mainnet aynıdır** -> Yanlış, Testnet sık sık sıfırlanır ve Mainnet gibi ekonomik güvenceye sahip değildir.

---

## TAZ Nedir?

**TAZ**, Zcash coin’lerinin Testnet sürümüdür:

- Gerçek para değildir; ZEC veya itibari para karşılığında takas edilemez
- Test, geliştirme ve öğrenme amacıyla kullanılır
- Tüm Zcash kurallarına uyar: gönderilebilir, madenciliği yapılabilir ve korumalı adreslerde kullanılabilir

**Örnek:**  
Bir geliştirici, gerçek ZEC riskine girmeden bir cüzdan özelliğini test etmek için bir Testnet adresinden diğerine 100 TAZ gönderebilir.

TAZ’ı **Zcash Testnet için “oyun parası”** olarak düşünebilirsiniz.

## Faucet’ler Nedir?

Bir **faucet**, test amacıyla ücretsiz TAZ coin’i veren bir hizmettir:

- Genellikle web siteleri veya API’lerdir
- Kullanıcılar bir Testnet adresi verir; faucet küçük miktarda TAZ gönderir
- TAZ’ı elle madencilikle elde etme ihtiyacını ortadan kaldırır

**Örnek:**  
1. Bir Testnet faucet’ini ziyaret edin (ör. [fauzec.com](https://fauzec.com/) | [zcashfaucet.jinolabs.xyz](https://zcashfaucet.jinolabs.xyz/))
2. Testnet adresinizi girin
3. TAZ talep edin
4. Teste başlamak için TAZ’ı hemen alın

**Önemi:**
- ZEC riske atmadan güvenli test
- Yeni başlayanlar ve geliştiriciler için erişilebilirlik
- Cüzdanlar, borsalar ve uygulamalar için hızlı prototipleme

## Zkool ve Zingo! Cüzdanları

### Zkool

- İleri düzey Zcash kullanıcıları için çok hesaplı cüzdan
- Kurtarma ifadelerini, görüntüleme anahtarlarını, şeffaf ve korumalı adresleri destekler
- Tam düğümler veya lightwallet sunucuları üzerinden Mainnet’e, Testnet’e ya da Regtest’e bağlanabilir

### Zingo!

- Gizlilik ve sadeliğe odaklanan mobil cüzdan
- Korumalı ve birleşik adresleri destekler
- NU6 Testnet dahil Testnet protokollerini destekleyecek şekilde güncellenmiştir

## Cüzdanlarda Testnet’i Etkinleştirme

### Zkool Cüzdanı

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/XCGwwqLZILg"
    title="Zkool Testnet"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>

**İpuçları:**
- Ağlar arasında geçiş yaparken cüzdan yeniden başlayabilir
- Mainnet ZEC hesapları etkilenmez
- İstenirse bir Testnet lightwallet sunucusu kullanın

### Zingo! Cüzdanı

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/To7WAkiBldA"
    title="Zingo Testnet"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>

Etkinleştirildikten sonra cüzdanlar TAZ gönderebilir ve alabilir, korumalı işlemleri test edebilir ve güvenle deneyler yapabilir.

## Testnet’i Etkinleştirdikten Sonra

- İşlemler Mainnet’teki gibi gerçekleşir, ancak TAZ’ın değeri **sıfırdır**
- Korumalı işlemler, birden fazla adres ve gizlilik özellikleri test edilebilir
- Geliştiriciler gerçek ZEC riskine girmeden özelliklerde hata ayıklayabilir ve test yapabilir

## Kısa Özet

- **Zcash Testnet**, geliştirme, test ve denemeler için güvenli bir sandbox ortamıdır
- Kullanım alanları: geliştirici testleri, düğüm testleri, borsa entegrasyonu, araştırma ve eğitim
- **TAZ coin’leri**, ZEC yerine kullanılır ve gerçek bir değeri yoktur
- Testnet, özellikleri Mainnet’te canlıya almadan önce kullanılması gereken temel bir ortamdır
