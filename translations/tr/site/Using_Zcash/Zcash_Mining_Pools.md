<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Zcash_Mining_Pools.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Sayfayı düzenle"/>
</a>

# Zcash Madencilik Havuzları

## Kısaca

* Bir madencilik havuzu, birçok madencinin hash gücünü birleştirir ve bulduğu her blok ödülünü madencilerin katkılarına göre paylaştırır.
* Havuz üyeleri düzenli olarak küçük ödemeler alır. Evindeki donanımla tek başına madencilik yapan biri, kendi bloğunu bulmak için yıllarca bekleyebilir.
* Havuzlar ödeme yöntemine, ücrete ve ödeme gizliliğine göre farklılık gösterir. Aşağıdaki her girişte bu üç bilgi de yer alır.
* Gizli Ödemeler, bir havuzun korumalı bir adrese ödeme yapıp yapamadığını gösterir.
* Donanımınızı bir havuza yönlendirmeden önce havuzun durumunu ve güncel ücretini kendi sitesinden kontrol edin.

## Temel Açıklama

### Zcash Madencilik Havuzu Nedir?

Zcash madencilik havuzları, bireysel madencilerin bilgi işlem güçlerini (hash gücü) birleştirmesine olanak tanıyan hizmetlerdir. Katılımcılar kaynaklarını havuzda birleştirerek ağ bloklarını çözme şanslarını artırır ve tek başına madenciliğin öngörülemeyen piyango sistemine bel bağlamak yerine düzenli, daha küçük ödemeler kazanır.

### Ödemeler Nasıl Yapılır?

Her madenci, tamamlanmış işin “share” adı verilen küçük parçalarını havuza gönderir. Havuz bu payları sayar ve ödeme yöntemine göre ödeme yapar. Aşağıdaki girişlerde üç yöntem kullanılır:

- **Pay Per Share (PPS):** Havuz, blok bulup bulmadığına bakmaksızın her geçerli share için sabit bir tutar öder. Şans riskini havuz üstlendiği için PPS ücretleri genellikle daha yüksektir.
- **Pay Per Last N Shares (PPLNS):** Havuz, yalnızca gerçekten bulduğu bloklardan ödeme yapar ve bu ödemeyi en son N share arasında paylaştırır. Ödemeler havuzun şansına göre artıp azalır; ücretler genellikle daha düşüktür.
- **Pay Per Share Plus (PPS+):** Blok ödülü PPS yöntemiyle ödenir; işlem ücretleri ise PPLNS yöntemiyle paylaşılır.

---

### Zcash Madencilik Havuzlarının Listesi

---

#### [Luxor](https://luxor.tech/)

<a href="https://luxor.tech/">
    <img src="/content-images/Luxor-20Pool-3aa38cd52b.webp" alt="Luxor Logosu" width="200" height="100"/>
</a>

- Web sitesi: [Luxor](https://luxor.tech/)
- Gizli Ödemeler: EVET
- Havuz Türü: Pay Per Share
- Havuz ücreti: %3

---

#### [2Miners](https://zec.2miners.com/)

<a href="https://zec.2miners.com/">
    <img src="/content-images/2Miners-3c99609047.webp" alt="2Miners Logosu" width="200" height="100"/>
</a>

- Web sitesi: [2Miners](https://zec.2miners.com/)
- Gizli Ödemeler: Hayır
- Havuz Türü: Pay Per Last N 
- Havuz ücreti: %1

---

#### [Nanopool](https://zec.nanopool.org/)

<a href="https://zec.nanopool.org/">
    <img src="/content-images/Nanopool-e484b00998.webp" alt="Nanopool Logosu" width="200" height="100"/>
</a>

- Web sitesi: [Nanopool](https://zec.nanopool.org/)
- Gizli Ödemeler: Hayır
- Havuz Türü: Pay Per Last N 
- Havuz ücreti: %1

---

#### [Poolin](https://www.poolin.com/)

<a href="https://www.poolin.com/">
    <img src="/content-images/Poolin-6fd4b44ba3.webp" alt="Poolin Logosu" width="200" height="100"/>
</a>

- Web sitesi: [Poolin](https://www.poolin.com/)
- Durum: Poolin Technology PTE. LTD., 22 Temmuz 2026'dan beri Chapter 11 iflas sürecindedir (Dosya No. 26-18325, ABD İflas Mahkemesi, New Jersey Bölgesi; [dava bilgileri](https://veritaglobal.net/Poolin)). Hash gücünüzü yönlendirmeden önce havuzun hâlâ madencilik yapıp ödeme gönderdiğini ZEC teyit edin (13 Kasım 2026'da kontrol edildi).
- Gizli Ödemeler: Hayır
- Havuz Türü: Pay Per Share
- Havuz ücreti: %3

---

#### [Antpool](https://v3.antpool.com/home)

<a href="https://v3.antpool.com/home">
    <img src="/content-images/Antpool-9c5dac3b65.webp" alt="Antpool Logosu" width="200" height="100"/>
</a>

- Web sitesi: [Antpool](https://v3.antpool.com/home)
- Gizli Ödemeler: Hayır
- Havuz Türü: Pay Per Share
- Havuz ücreti: %3

---

#### [ViaBTC](https://www.viabtc.com/en/)

<a href="https://www.viabtc.com/en/">
    <img src="/content-images/ViaBTC-8fa5be7bd7.webp" alt="ViaBTC Logosu" width="200" height="100"/>
</a>

- Web sitesi: [ViaBTC](https://www.viabtc.com/en/)
- Gizli Ödemeler: Hayır
- Havuz Türü: Pay Per Share+
- Havuz ücreti: %4

---

#### [Foundry Zcash Madencilik Havuzu](https://foundrydigital.com/foundry-zcash-pool/)

<a href="https://foundrydigital.com/foundry-zcash-pool/">
    <img src="/content-images/Foundry-3f33346374.webp" alt="Foundry Zcash Madencilik Havuzu Logosu" width="200" height="100"/>
</a>

- Web sitesi: [Foundry Zcash Madencilik Havuzu](https://foundrydigital.com/foundry-zcash-pool/)
- Gizli Ödemeler: Hayır
- Havuz Türü: Pay Per Last N Shares
- Havuz ücreti: Kamuya açık değil

---

#### [suprnova](https://zec.suprnova.cc/)

<a href="https://zec.suprnova.cc/">
    <img src="/content-images/suprnova-logo-1-small-e95de6cdb3.webp" alt="suprnova Logosu" width="200" height="100"/>
</a>

- Web sitesi: [suprnova](https://zec.suprnova.cc/)
- Gizli Ödemeler: Hayır
- Havuz Türü: Pay Per Last N Shares
- Havuz ücreti: %0,5 - %1

---

#### [NiceHash](https://www.nicehash.com/blog/post/how-to-start-mining-zec-equihash-on-nicehash)

<a href="https://www.nicehash.com/blog/post/how-to-start-mining-zec-equihash-on-nicehash">
    <img src="data:image/png;base64,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" alt="NiceHash Logosu" width="200" height="100"/>
</a>

- Web sitesi: [NiceHash](https://www.nicehash.com/blog/post/how-to-start-mining-zec-equihash-on-nicehash)
- Gizli Ödemeler: Bitcoin (BTC) olarak ödeme alınır
- Havuz Türü: Hashrate pazaryeri / Proxy havuzu
- Havuz ücreti: %0,5 - %1

---

#### [Sovright Madencilik Havuzu](https://mining.sovright.com/)

<a href="https://mining.sovright.com/">
    <img src="/content-images/-qOtwa1p_400x400-fce1523375.webp" alt="Sovright Logosu" width="200" height="100"/>
</a>

- Web sitesi: [Sovright Madencilik Havuzu](https://mining.sovright.com/)
- Gizli Ödemeler: EVET
- Havuz Türü: Pay Per Last N Shares (PPLNS)
- Havuz Ücreti: %1


---

### Önceki Zcash havuzları

#### Slush Pool (Braiins Pool)

Braiins Pool artık güncel bir Zcash madencilik seçeneği değildir. [resmî havuz SSS](https://academy.braiins.com/braiins-pool/faqs/pool) sayfasında desteklenen coin olarak Bitcoin listelenir ve altcoin desteği için planı olmadığı belirtilir (12 Kasım 2026'da kontrol edildi).

## Görsel / Benzetme

Bir madencilik havuzu, balıkçı mürettebatı gibi çalışır. Tek ağlı bir tekne, yıllar içinde bir kez büyük bir balık yakalar. Teknelerden oluşan bir ekip ağlarını tüm koya yayar, her gün balık getirir ve avı her teknenin suya ne kadar ağ bıraktığına göre paylaşır.

Hash gücünüz ağdır. Blok ödülü ise avdır.

## Sık Yapılan Hatalar

- **Madencilik havuzlarını korumalı havuzlarla karıştırmak.** Madencilik havuzu, madencilere yönelik bir hizmettir. [korumalı havuz](/using-zcash/shielded-pools) ise Zcash protokolünün özel fonları tutan bir parçasıdır.
- **Havuzu yalnızca ücretine göre seçmek.** Ödeme yöntemi, gelirinizin ne kadar düzenli olacağını değiştirir. Ücreti düşük bir PPLNS havuzu, şansın yaver gitmediği haftalarda daha az ödeme yapar.
- **Durum notlarını gözden kaçırmak.** Poolin hakkında bir iflas notu bulunur; Önceki Zcash havuzları bölümünde artık ZEC madenciliği yapmayan havuzlar listelenir.
- **Şeffaf bir ödeme adresi kullanmak.** Gizli Ödemeler alanında EVET yazıyorsa havuza korumalı bir adres verin.
- **NiceHash üzerinden ZEC beklemek.** NiceHash, madencilere Bitcoin (BTC) olarak ödeme yapar.

## İlgili Sayfalar

- [Zcash Madencilik Rehberi](/using-zcash/zcash-mining-guide): donanım ve yazılımı kurun, ardından bir havuza katılın.
- [Zcash Para Politikası](/start-here/zcash-monetary-policy): havuzların paylaştığı blok ödülü.
- [Korumalı Havuzlar](/using-zcash/shielded-pools): gizli ödemelerin gönderildiği yer.
- [Cüzdanlar](/using-zcash/wallets): ödemeler için korumalı bir adres sağlayan cüzdanlar.
