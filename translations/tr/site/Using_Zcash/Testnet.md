# Zcash Testneti

## Zcash Testneti Nedir?

**Zcash Testneti**, gerçek Zcash ana ağına (Mainnet) paralel çalışan bir blokzincirdir; aynı protokolü, kuralları ve işlem mantığını birebir kopyalar - ancak iki temel farkla:

1. **Coinlerin gerçek parasal değeri yoktur** - bunlara ZEC değil, **TAZ** denir ve yalnızca test için kullanılırlar.  
2. **Ağ yükseltmeleri, araçlar ve yazılımlar önce burada test edilir**; ardından gerçek Zcash blokzincirine dağıtılır.  

Başka bir deyişle Testnet, geliştiricilerin, denetçilerin ve üreticilerin gerçek parayı riske atmadan fikirleri deneyebileceği bir **kum havuzu veya deneysel ortam** gibidir.


## Testnet Neden Vardır?

Testnet, blokzincir geliştirme için kritik öneme sahiptir çünkü **Zcash gibi gerçek blokzincirler değiştirilemezdir** - işlemler ana ağda onaylandıktan sonra geri alınamazlar. Testnet, özellikleri Mainnet'e dağıtmadan önce denemek, test etmek ve hata ayıklamak için **güvenli bir kopya** sağlar.

### Testnet'in Kullanım Alanları

#### 1. Yazılım Geliştirme ve Entegrasyon

Cüzdanlar, borsalar, madencilik yazılımları veya gizlilik araçları geliştirenler bunları Testnet üzerinde güvenle test edebilir. Yapabilecekleri arasında şunlar bulunur:

- İşlem gönderme ve alma  
- Sıfır değerli TAZ coinlerle yeni bloklar kazma  
- Kullanıcı arayüzleri ve API'ler oluşturma  
- İşlem gizliliği özelliklerini test etme (şeffaf vs shielded)  

**Örnek:**  
[`zcash_tx_tool`](https://github.com/QED-it/zcash_tx_tool) gibi araçlar, işlem oluşturmak ve Zcash shielded varlık işlevlerini test etmek için Testnet'i kullanır.  

**Gerçek dünya senaryosu:**  
Bir cüzdan geliştiricisi, yazılımını bir Testnet RPC uç noktasına bağlayıp tam yaşam döngüsünü simüle edebilir - adres oluşturma, shielded işlemler gönderme ve bakiyeleri doğrulama - ve bunu Mainnet'te canlıya çıkmadan önce yapabilir.

#### 2. Ağ Yükseltmelerini Test Etme

Zcash, temel protokolünü periyodik olarak yükseltir (ör. Nu5, Nu6). Testnet, yeni yükseltmeleri **Mainnet'ten önce** etkinleştirir; böylece geliştiriciler ve topluluk hataları tespit edip düzeltebilir.

**Örnek:**  
Yeni bir konsensüs kuralı veya işlem türü önce Testnet'e uygulanır. Başarılı testlerden sonra, önceden belirlenmiş bir blok yüksekliğinde Mainnet'te etkinleşir.

#### 3. Node Uygulamalarını Test Etme

Zcash, birden fazla node yazılımı uygulamasını destekler - `zcashd` ve **Zebra** (Zcash Foundation tarafından sürdürülen Rust tabanlı node). Testnet, finansal risk olmadan node'ların gerçek koşullarda test edilmesini sağlar.  

Node geliştiricileri şunları yapabilir:

- Blok yayılımını doğrulama  
- RPC arayüzlerini test etme  
- Yük altında node davranışını gözlemleme  
- Madencilik yazılımı etkileşimlerini test etme  

#### 4. Öğrenme ve Eğitim

Yeni başlayanlar, Zcash özelliklerini; örneğin madencilik yapmayı, shielded işlemler oluşturmayı ve Unified Address kullanmayı öğrenebilir.  
Topluluk eğitimleri ve belgeleri, **Testnet faucet'lerine, explorer'larına ve rehberlerine** erişim sağlar.


## Gerçek Testnet Kullanım Senaryoları

### 1. Geliştirici Testi (Cüzdan / Uygulama)

- Zcash Testnet'e bağlanın  
- Bir faucet'ten TAZ isteyin  
- Shielded işlemler gönderin  
- Gizliliği ve arayüz kararlılığını doğrulayın  

Hata olsa bile gerçek ZEC kaybedilmez.

### 2. Borsa Entegrasyon Testi

- Bir Testnet node'u çalıştırın  
- İşlemleri işlemek için Zebrad JSON-RPC uç noktalarını kullanın  
- Otomatik para yatırma/çekme mantığını test edin  

Bu, üretim kodunun güvenli olmasını sağlar ve finansal kaybı önler.

### 3. Madencilik Kurulumu Denemeleri

- Madencilik şablonlarını kullanın  
- Blok doğrulamayı test edin  
- Madencilik ödüllerini gözlemleyin (yalnızca TAZ)  
- Madencilik performansını ayarlayın  

Mainnet'e geçerken kesinti veya kazanç kaybını önler.

### 4. Akademik / Protokol Araştırması

Araştırmacılar, Testnet kullanarak **durumsuz doğrulama**, **sıfır bilgi ispatı optimizasyonu** veya diğer protokol deneyleri gibi yenilikleri test edebilir.  
İleri düzey kullanıcılar ayrıca özelleştirilmiş deneyler için **özel Testnet'ler veya regtest ortamları** çalıştırabilir.


## Mainnet ve Testnet Arasındaki Temel Farklar

| Özellik               | Mainnet           | Testnet                  |
|-----------------------|-----------------|--------------------------|
| Coinlerin değeri      | Gerçek ZEC       | TAZ (parasal değeri yok) |
| Risk                  | Finansal risk    | Test için güvenli        |
| Protokol yükseltmeleri| Üretim           | Erken etkinleştirme      |
| Madencilik ödülleri   | Gerçek ihraç     | Yalnızca test ödülü      |
| Ağın kullanım amacı   | Canlı işlemler   | Test ve geliştirme       |

## Yaygın Yanılgılar

- **Testnet coinlerinin bir değeri vardır** -> Yanlış, TAZ'ın değeri sıfırdır.  
- **Testnet coinlerini kaybetmek önemlidir** -> Yanlış, gerçek bir değer kaybolmaz.  
- **Testnet ve Mainnet aynıdır** -> Yanlış, Testnet sık sık sıfırlanır ve Mainnet gibi ekonomik olarak güvence altında değildir.

---

## TAZ Nedir?

**TAZ**, Zcash coinlerinin Testnet sürümüdür:  

- Gerçek para değildir; ZEC'e veya itibari paraya dönüştürülemez  
- Test, geliştirme ve öğrenme için kullanılır  
- Tüm Zcash kurallarına uyar: gönderilebilir, kazılabilir ve shielded adreslerde kullanılabilir  

**Örnek:**  
Bir geliştirici, gerçek ZEC'i riske atmadan bir cüzdan özelliğini test etmek için bir Testnet adresinden diğerine 100 TAZ gönderebilir.  

TAZ'ı, **Zcash Testneti için "oyun parası"** gibi düşünebilirsiniz.


## Faucet Nedir?

Bir **faucet**, test için ücretsiz TAZ coin veren bir hizmettir:

- Genellikle web siteleri veya API'lerdir  
- Kullanıcılar bir Testnet adresi verir; faucet küçük miktarda TAZ gönderir  
- TAZ'ı manuel olarak kazma gerekliliğini ortadan kaldırır  

**Örnek:**  
1. Bir Testnet faucet'ini ziyaret edin (ör. [testnet.zecfaucet.com](https://testnet.zecfaucet.com) | [fauzec.com](https://fauzec.com/))  
2. Testnet adresinizi girin  
3. TAZ talep edin  
4. Teste başlamak için TAZ'ı anında alın  

**Neden önemlidir:**  
- ZEC'i riske atmadan güvenli test  
- Yeni başlayanlar ve geliştiriciler için erişilebilirlik  
- Cüzdanlar, borsalar ve uygulamalar için hızlı prototipleme



## Zkool ve Zingo! Cüzdanları

### Zkool

- İleri düzey Zcash kullanıcıları için çok hesaplı cüzdan  
- Seed phrase'leri, viewing key'leri, şeffaf ve shielded adresleri destekler  
- Mainnet, Testnet veya Regtest'e tam node'lar ya da lightwallet sunucuları üzerinden bağlanabilir

### Zingo!

- Gizlilik ve sadeliğe odaklanan mobil cüzdan  
- Shielded ve unified adresleri destekler  
- Testnet protokollerini destekleyecek şekilde güncellenmiştir (NU6 Testnet dahil)

## Cüzdanlarda Testnet'i Etkinleştirme

### Zkool Wallet

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
- Ağ değiştirirken cüzdan yeniden başlayabilir  
- Mainnet ZEC hesapları etkilenmez  
- İstenirse bir Testnet lightwallet sunucusu kullanın

### Zingo! Wallet

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


Etkinleştirildikten sonra cüzdanlar TAZ gönderip alabilir, shielded işlemleri test edebilir ve güvenli şekilde deneyler yapabilir.


## Testnet'i Etkinleştirdikten Sonra

- İşlemler Mainnet gibi çalışır ancak **sıfır değerli TAZ** ile  
- Shielded işlemler, birden fazla adres ve gizlilik özellikleri test edilebilir  
- Geliştiriciler gerçek ZEC'i riske atmadan hata ayıklayabilir ve özellikleri test edebilir


## Kısa Özet

- **Zcash Testneti**, inşa etmek, test etmek ve deney yapmak için güvenli bir kum havuzu ortamıdır  
- Kullanım alanları: geliştirici testi, node testi, borsa entegrasyonu, araştırma ve eğitim  
- ZEC yerine **TAZ coinleri** kullanılır ve bunların gerçek bir değeri yoktur  
- Özellikleri Mainnet'te canlıya almadan önce Testnet kritik öneme sahiptir
