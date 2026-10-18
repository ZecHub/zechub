# Zero'dan Sıfır Bilgiye: Anımsatıcı Tohum İfadeleri

**Seri:** Zero to Zero Knowledge

Anımsatıcı tohum ifadeleri, kripto paranın en önemli yönlerinden biri olan **öz saklamanın** temelini oluşturur.  
Bugün, bir tohum ifadesinin nasıl oluşturulduğunu ve cüzdanlarda nasıl kullanıldığını öğreniyoruz.

---

## Anımsatıcı Tohum İfadeleri Nedir?

Kurtarma ifadeleri, günümüzde kullanılan en yaygın kurtarma ifadesi türü olan **BIP-39** spesifikasyonu tarafından tanımlanır.

Kurtarma ifadelerinin oluşturulması **rastgelelik** üretilmesiyle başlar. Daha fazla entropi, daha yüksek güvenlik anlamına gelir. **128 bit** entropi çoğu kullanıcı için yeterli kabul edilir.

![Tohum ifadesi kavramı](/content-images/FooM3qWWACgrwzn-f222c4081f.webp)

Başlangıç entropisinin uzunluğuna bağlı olarak, kurtarma ifadesi **12 ila 24 kelime** uzunluğunda olur.

---

## Adım Adım: 12 Kelimelik Bir Tohum İfadesi Nasıl Oluşturulur

### 1. Entropi Üretin
**128 bit** entropi üreterek başlıyoruz.

### 2. Sağlama Toplamı Ekleyin
Entropiyi **SHA256** kullanarak hash'liyoruz. Bu hash'in ilk birkaç biti sağlama toplamı olur.  
Bu bize entropimiz için benzersiz bir parmak izi verir.

![Entropi + Sağlama Toplamı diyagramı](/content-images/FooNoOEXgAAu-g6-613238fa7e.webp)

### 3. 11 bitlik parçalara bölün
Toplam 132 bit (128 entropi + 4 sağlama toplamı), 11 bitlik parçalara ayrılır.

### 4. Kelime Listesine Eşleyin
Her 11 bitlik dizi ondalık bir sayıya dönüştürülür (0-2047).  
BIP-39 kelime listeleri tam olarak **2048 kelime** içerir (İngilizce, İspanyolca, Çince vb.).

Bu sayılar, kelime listesindeki karşılık gelen kelimeyi bulmak için kullanılır.

![Kelime eşleme örneği](/content-images/FooN9rfXEBoQuU2-d11331fc0a.webp)

**Sonuç:** Artık güvenli, insanlar tarafından okunabilir 12 kelimelik bir kurtarma ifademiz var!

---

## Kurtarma İfadesinden -> Tohuma -> Ödeme Adreslerine

Bir cüzdan, kurtarma ifadesini kullanarak ödeme adresleri ve farklı cüzdan hesapları oluşturmak için anahtarlar üretebilir.

Üretilen anahtarlar **deterministiktir** - aynı girdi her zaman aynı çıktıyı üretir.

### Tohum Üretimi
Cüzdan tohumu, anımsatıcı ifadeden bir **Anahtar Türetme Fonksiyonu (KDF)** kullanılarak türetilir:

- **Bitcoin**'de: PBKDF2  
- **Zcash**'te: Blake2b-256/512

Bu, **64 baytlık (512 bit)** bir tohum üretir.

![Tohumdan ana anahtarlara](/content-images/FooOuumXEAgcBm1-dc7c66b84a.webp)

### Ana Anahtarlar
Tohum iki adet 32 baytlık diziye ayrılır:
- **Ana Harcama Anahtarı**
- **Ana Zincir Kodu**

Bunlar, alt anahtar türetimi için **Hiyerarşik Deterministik (HD) Cüzdanlarda** kullanılır.

---

## Zcash'e Özgü Özellikler (ZIP-32)

Zcash'te, **görüntüleme yetkisi** veya **harcama yetkisi**, ana tohum tehlikeye atılmadan alt ağaçlar için bağımsız olarak devredilebilir.

**ZIP-32**, Zcash'in gizlilik özelliklerine uyarlanmış hiyerarşik deterministik anahtar üretim standardını tanımlar.

Bir **Expanded Spending Key**'den şunları türetiriz:
- Full Viewing Key
- Incoming Viewing Key
- Ödeme adresleri kümesi

Farklı türetme mekanizmaları, korumalı havuzlar (Sapling ve Orchard) boyunca göndericilere verilmek için uygun harici adresler üretir.

![Zcash anahtar türetme hiyerarşisi](/content-images/FooPKd4XEBUQhJ6-af133c01bf.webp)

Zcash ayrıca, Auto-Shielding gibi cüzdan işlemleri için **dahili adresleri** de destekler.

---

## Kaynaklar

- [ZIP-32: Shielded Hierarchical Deterministic Wallets](https://zips.z.cash/zip-0032)  
- [Zcash Protokol Spesifikasyonu (NU5)](https://zips.z.cash/protocol/protocol.pdf)  
- [Varsayılan olarak korumalı cüzdanlara genel bakış](https://zechub.wiki)

---

**ZecHub (@ZecHub) tarafından orijinal ileti dizisi**  
https://x.com/ZecHub/status/1624125037945946145

---

*Bu sayfa, ZecHub wiki için orijinal Zero to Zero Knowledge ileti dizisinden derlenmiştir.*
