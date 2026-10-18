# Sıfırdan Sıfır Bilgiye: Lelantus Protokolü

**Seri:** Sıfırdan Sıfır Bilgiye

Bugün **Lelantus**'a göz atıyoruz!

2019'da yayımlanan bu protokol, Zerocoin üzerine inşa edilmiştir. Özel on-chain işlemleri mümkün kılmak için **Firo** para biriminde (eski adıyla Zcoin) kullanılır. Bazı yönleriyle Zcash'e benzer, ancak çoğu açıdan belirgin şekilde farklıdır.

![Lelantus intro](/content-images/Fsk18DgXsAEc0Ob-a8cd9a85d1.webp)

---

## Zcash ve Firo Protokol Temelleri

- **Zcash** - **Zerocash** protokolü üzerine inşa edilmiştir  
- **Firo (Zcoin)** - **Zerocoin** protokolü üzerine inşa edilmiştir

![Zerocash vs Zerocoin comparison](/content-images/Fsk2Fk7WcAA81ty-92158edf6b.webp)

---

## Firo Gizlilik Protokollerinin Evrimi

Zcash'e benzer şekilde, Firo anonim ödemeleri gerçekleştirmek için shielded adresler kullanır.

**Zaman Çizelgesi:**
- **Zerocoin** - Soundness bozuldu
- **Sigma** - Sabit kupür sistemi
- **Lelantus 1.0** - Doğru güvenlik ispatlarından yoksundu

![Protocol evolution](/content-images/Fsk2NdaWAAAKVgH-f84ae27c48.webp)

---

## Sigma Protokolünün Sınırlamaları

Zcoin/Firo'nun önceki sürümlerinde kullanılan Σ (Sigma) protokolünün önemli bir sınırlaması vardı: kullanıcılar yalnızca sabit kupürler mint edebiliyordu.

Bu, daha küçük anonimlik kümeleri oluşturdu ve mint ile redeem işlemleri arasında zamanlama saldırılarına kapı araladı (ayrıca "tainted change" sorunu da vardı).

![Sigma denominations](/content-images/Fsk2fxfWcAMUBDo-333a8f9df3.webp)

---

## Lelantus Gizliliği Nasıl Geliştiriyor

**Lelantus**, mint işlemlerine tek ve daha büyük bir kümeden izin vererek sabit kupür sorununu çözer.

Temel avantajlar:
- Sabit kupürlü anonimlik kümelerini ortadan kaldırır
- burn/redeem arasındaki zamanlama saldırılarını azaltır
- tainted change sorununu ortadan kaldırır

**Sınırlama**: Küme boyutu şu anda **65.000 coin** ile sınırlıdır.

![Lelantus advantages](/content-images/Fsk2wK3X0AA6MEe-06f29b3621.webp)

---

## Coin Commitments

Bir **coin commitment**, coin seri numarasını ve coin değerini kodlayan çift körlemeli bir commitment'tır.

Bunlar, Zcash'teki **Notes** ile benzer işlev görür.

Coin commitment, coin oluşturulduğunda (Mint veya Spend işlemleri yoluyla) yayımlanır ve ledger üzerinde saklanır.

![Coin commitment diagram](/content-images/Fsk3AWNX0AIHya8-0ed01a73c1.webp)

---

## Basecoin < - > Zerocoin Modeli

Lelantus, klasik **basecoin < - > zerocoin** modelini kullanır.

**Önemli özellik**: Artık kalan kısmı ve miktarları gizli tutarken kısmi redeem işlemleri mümkündür.

Zcash'te olduğu gibi, transparent işlemler kullanıcı tarafından açıkça seçilmelidir.

![Lelantus flow](/content-images/Fsk3HrjXgAMgqmX-4d727febf5.webp)

---

## One-of-Many Proofs

Lelantus, dengeyi kanıtlamak için gerekli giriş değerlerini, girişlerin kökenlerini açığa çıkarmadan - ve trusted setup gerektirmeden - çıkarmak için **One-of-Many Proofs** kullanır.

Bu ispatlar ayrıca **Triptych**'te de kullanılır (CryptoNote başlığımızda bahsedilmişti).

![One-of-Many Proofs](/content-images/Fsk3Z0nWIAAPD4k-b76f087018.webp)

---

## Ağ Katmanı Gizliliği: Dandelion++

Firo düğümleri, Zcash'in Magicbean'i ile aynı Network Magic'i kullanır.

Monero gibi, Firo da işlemi yayınlayan kişinin IP adresini gizleyerek gizlilik eklemek için **Dandelion++** uyguladı.

**Dandelion++ aşamaları:**
- **Stem phase** - İşlem tüm eşlere değil, tek bir rastgele düğüme iletilir
- **Fluff phase** - Rastgele başlatılır, ardından normal gossip moduna geçer

Bu, ağ analizi yoluyla bir işlemin kaynağını izlemeyi çok daha zor hâle getirir.

![Dandelion++ explanation](/content-images/Fsk4A8VWcAU84MR-538b054cab.webp)

---

## Gelecek: Lelantus-Spark

**Lelantus-Spark** (2023'ün ilerleyen dönemleri için planlandı), **ZIP-32 tarzı türetme** ve çeşitlendirilmiş adresler kullanarak isteğe bağlı iki görünürlük seviyesi sunar.

Ayrıca şu özellikler için destek ekleyecektir:
- Multisig
- Kullanıcı Tanımlı Gizli Varlıklar

Bu özellikler Zcash Shielded Assets ile paraleldir.

![Lelantus-Spark announcement](/content-images/Fsk4jXeXsAACQ3h-b53294b16e.webp)

---

**ZecHub (@ZecHub) tarafından hazırlanan orijinal gönderi dizisi**  
https://x.com/ZecHub/status/1641902859800150017

---

*Bu sayfa, ZecHub wiki'si için orijinal Sıfırdan Sıfır Bilgiye gönderi dizisinden derlenmiştir.*
