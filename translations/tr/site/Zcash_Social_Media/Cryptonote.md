# Sıfırdan Sıfır Bilgiye: CryptoNote Protokolü

**Seri:** Sıfırdan Sıfır Bilgiye

Bugün ilginç bir konu var!  
**CryptoNote** protokolü güçlü zincir üstü gizlilik sağlar. Bugün tüm temel özelliklerini ve çeşitli önemli gizlilik projeleri tarafından nasıl uygulandığını öğreniyoruz.

![CryptoNote intro](/content-images/FrXr5P8WIAAvx36-88db0c8250.webp)

---

## Arka Plan

Orijinal CryptoNote whitepaper’ı **"Nicolas van Saberhagen"** takma adıyla yayımlandı.  

Protokolü uygulayan ilk kripto para **Bytecoin** oldu. Günümüzde bunu kullanan en bilinen proje **Monero (XMR)**’dur. Ayrıca TurtleCoin, Aeon ve daha pek çoğunda da kullanılmıştır.

---

## CryptoNote’un Temel Özellikleri

CryptoNote Protokolü üç ana özellik sunar:

1. İşlemlerin **İzlenemezliği ve Bağlantılanamazlığı**
2. **Eşitlikçi İş Kanıtı** (ASIC’e dayanıklı) 
3. **Dinamik emisyon**

---

## 1. İzlenemezlik - Ring Signatures

İzlenemezlik esas olarak **Ring Signatures** kullanılarak sağlanır.

Bir işlem gönderirken, gerçek açık anahtarınız birkaç sahte anahtarla ("ring") karıştırılır - bunların hepsi aynı miktarda coin içerir. Bu da coin’leri gerçekte kimin gönderdiğini belirlemeyi son derece zorlaştırır.

**Ring boyutu**, anonimlik kümesini önemli ölçüde etkiler. Daha büyük ring’ler daha iyi gizlilik sağlar.

![Ring Signatures explanation](/content-images/FrXteGHXgAANE0F-f11593a0d9.webp)

**Zcash ile karşılaştırma**:  
Zcash’in anonimlik kümesi, belirli bir shielded pool içinde *şimdiye kadar* yapılmış tüm işlemlerin toplamıdır (tipik CryptoNote ring boyutlarından çok daha büyüktür).

---

## Ring CT (Gizli İşlemler)

**Ring CT** modeli, CryptoNote tabanlı coin’lerde gizliliği büyük ölçüde geliştirdi.

Yalnızca göndericiyi gizlemek yerine, Ring CT ayrıca gönderici ile alıcı arasındaki **işlem miktarlarını da gizler**.

![Ring CT diagram](/content-images/FrXuivgWYAAze7B-260071c1b3.webp)

Şunları kullanır:
- Eliptik Eğri Kriptografisi
- Pedersen Taahhütleri
- Homomorfik Şifreleme

**Kanıtlar**, gerçek değerleri **açığa çıkarmadan**, miktarın 0’dan büyük olduğunu ve geçerli aralıklarda bulunduğunu göstermek için kullanılır.

**Stealth Addresses** de alıcı için tek kullanımlık adresler ekler.

![Stealth Addresses + Proofs](/content-images/FrXut5aWAAMhuRb-f3ce8ea3fd.webp)

---

## 2. Eşitlikçi İş Kanıtı (ePoW)

CryptoNote, ASIC’lere dayanıklı olarak daha adil bir madencilik sistemi oluşturmayı amaçlar.

**CryptoNight** algoritmasını kullanır (bellek yoğun bir fonksiyon). Bitcoin’in SHA256’sından farklı olarak CryptoNight, CPU, GPU ve ASIC madencileri arasındaki farkı azaltmak üzere tasarlanmıştır.

**CryptoNight adımları:**
1. Büyük bir bellek alanını (scratchpad) sözde rastgele verilerle başlatmak
2. Scratchpad üzerinde çok sayıda okuma/yazma işlemi gerçekleştirmek
3. Nihai değeri üretmek için tüm scratchpad’i hash’lemek

![CryptoNight mining](/content-images/FrXvNs3XsAA37LG-5779657f5c.webp)

(Not: Monero o zamandan beri CryptoNight’tan uzaklaşarak başka algoritmalara geçti.)

---

## 3. Dinamik Emisyon

Ani yarılanma olayları (Bitcoin’de olduğu gibi) yerine, CryptoNote **kademeli olarak azalan bir blok ödülü** kullanır.

Bu, zaman içinde çok daha pürüzsüz bir emisyon eğrisi oluşturur.

![Dynamic emission curve](/content-images/FrXv8wpXoAEjUxW-e2bbaebced.webp)

**Zcash Bağlantısı**:  
Zcash geliştiricileri, gelecekte muhtemelen bir "Zcash Posterity Fund" aracılığıyla daha pürüzsüz bir emisyon eğrisi uygulamayı tartıştılar.

---

## Sonuç

CryptoNote, zincir üstü gizlilik için güçlü ve sahada kendini kanıtlamış bir yaklaşım olduğunu göstermiştir. Yeniliklerinin birçoğu daha geniş gizlilik coin ekosistemini etkilemiştir.

Bazı araştırmacılar, CryptoNote özelliklerinin sonunda güven gerektirmeyen sıfır bilgi shielded pool’larla birleştirilebileceğine inanıyor.

---

**ZecHub (@ZecHub) tarafından hazırlanan orijinal flood**  
https://x.com/ZecHub/status/1636473585781948416

---

*Bu sayfa, ZecHub wiki için orijinal Sıfırdan Sıfır Bilgiye flood’undan derlenmiştir.*
