# Korumalı ödemeleri tespit etme: taramanın maliyeti

Korumalı ZEC kabul eden bir işletmenin gelen ödemeleri bulması gerekir. Şeffaf havuzda bunun için dizin araması yapılır. Korumalı havuzlarda ödemeler adrese göre dizinlenemediğinden cüzdanın veya arka ucun, zincirdeki her korumalı çıktıyı kendi anahtarlarıyla denemesi gerekir. Bu sayfa bunun nasıl çalıştığını, maliyetini ve maliyeti kontrol altında tutan hesap tasarımının nasıl seçileceğini açıklar.

## Özet

* Korumalı ödeme tespitinin maliyeti, verdiğiniz adres sayısına değil, izlediğiniz **görüntüleme anahtarı** sayısına göre artar
* Tek bir hesap, tarama maliyetini artırmadan her müşteri veya fatura için yeni ve ilişkilendirilemez bir **çeşitlendirilmiş adres** oluşturabilir
* Bir görüntüleme anahtarı **hesabın tamamını** gösterir. Denetçinin yalnızca bir müşteriyi görmesi gerekiyorsa o müşterinin ayrı hesabı olmalıdır ve her hesap her blokta tarama işini artırır
* Tarayıcıyı ortalamaya göre değil, **tam bloklara** göre boyutlandırın. Mainnet'te zaten arka arkaya neredeyse tam dolu bloklar oluşuyor
* Kapasiteyi belirlemeden önce deneme başına maliyeti kendi donanımınızda ölçün

## Korumalı ödemeler neden dizinlenemez?

Şeffaf adreslerde bir düğüm her çıktının adresini okuyabilir ve adreslerden çıktılara bir dizin oluşturabilir. Zebra bunu `getaddressutxos` ve `getaddresstxids` üzerinden sunar.

Korumalı bir eylemde okunabilir bir adres bulunmaz. Eylem bir not taahhüdü, geçici bir açık anahtar ve şifrelenmiş bir not içerir. Bu baytlarda ödemenin kime yapıldığını belirten hiçbir şey yoktur; bu yüzden ne düğüm ne de bir [dizin oluşturucu](Lightwallet_Nodes.md) adres dizini oluşturabilir.

Bu nedenle keşif ters yönde işler. Cüzdan her korumalı çıktıyı alır ve şifresini çözmeyi deneyerek “bu bana mı ait?” diye sorar. Buna **deneme amaçlı şifre çözme** denir. [Görüntüleme anahtarları](Viewing_Keys.md) anahtarların neleri açığa çıkardığını, [Zcash cüzdan eşitleme](Zcash_Wallet_Syncing.md) ise cüzdanların bu işi nasıl planladığını açıklar.

## Tek bir deneme nasıl işler?

Hem Orchard hem de Ironwood havuzlarının kullandığı Orchard protokolündeki eylem biçimi için:

1. **Anahtar anlaşması:** Eylemin geçici açık anahtarını gelen görüntüleme anahtarınızla çarpın. Bu, Pallas eğrisi üzerinde bir skaler çarpımıdır ve maliyetin büyük kısmını oluşturur
2. **Anahtar türetme:** Paylaşılan gizli anahtarı simetrik bir anahtara dönüştürmek için karma işlevinden geçirin
3. Notun ilk 52 baytının şifresini çözün: çeşitlendirici, değer ve `rseed`
4. Şifresini çözdüğünüz verilerden not taahhüdünü yeniden oluşturun
5. Bunu eylemin `cmx` değeriyle **karşılaştırın**. Eşleşirse not sizindir

Notun size ait olup olmadığını ancak 5. adımda öğrenirsiniz; bu yüzden **eşleşmeyen bir deneme, eşleşen denemeyle yaklaşık aynı maliyete sahiptir**. Zincirdeki eylemlerin neredeyse tamamı başkalarına aittir; dolayısıyla işin neredeyse tamamı eşleşmeyen denemelerden oluşur.

## Maliyet formülü

```text
work per block = K × I × A × t

K  accounts you watch
I  incoming viewing keys per account (2: external and internal)
A  shielded actions in the block
t  time for one trial on one core
```

Formülde adres sayısı yer almaz. Cüzdanlar hem dış anahtarı (verdiğiniz adresler) hem de iç anahtarı (para üstü) dener; bu yüzden `I = 2`. Bunu librustzcash'in `zcash_client_backend/src/scanning.rs` içindeki `for scope in [Scope::External, Scope::Internal]` döngülerinde görebilirsiniz.

[ZIP 218](https://zips.z.cash/zip-0218), korumalı eylem sayısını **blok başına 330** ile sınırlar; dolayısıyla `A` en fazla 330'dur.

## Çeşitlendirilmiş adresler: çok adres, tek anahtar

Bir Orchard protokolü adresi, `d` (11 bayt) boyutunda bir çeşitlendirici ile aynı gelen görüntüleme anahtarından türetilen bir iletim anahtarından oluşur. [ZIP 32](https://zips.z.cash/zip-0032), her çeşitlendiriciyi FF1 şifrelemesiyle 88 bitlik bir dizinden türetir. Böylece tek bir hesapta **2^88 adres** bulunur ve bunların her biri Orchard protokolü için geçerlidir.

Bu, ödeme arka ucuna iki kullanışlı özellik sağlar:

* **Adresler birbiriyle ilişkilendirilemez.** Görüntüleme anahtarı olmadan aynı hesaptaki iki çeşitlendirilmiş adres, iki farklı cüzdana aitmiş gibi görünür
* **Ödemeler, arama tablosu olmadan faturalara bağlanır.** Deneme amaçlı şifre çözme başarılı olduğunda, şifresi çözülen not `d` içerir. Hesabın çeşitlendirici anahtarı `d` öğesinin şifresini çözerek dizinini elde eder; böylece dizin fatura numaranızsa hangi faturanın ödendiğini bilirsiniz

Müşteriye göstermeden önce her adresi bir [birleşik adres](../Using_Zcash/Unified_Addresses.md) ([ZIP 316](https://zips.z.cash/zip-0316)) içine alın.

## Önemli nokta: görüntüleme anahtarı hesabın tamamını gösterir

Hesaptaki her adres aynı anahtarı kullandığı için görüntüleme anahtarını tek bir çeşitlendirilmiş adresle sınırlayamazsınız. Bu nedenle bilgi paylaşımının kapsamını da hesap belirler. Bir hesabın görüntüleme anahtarını ele geçiren herkes, o hesaptaki tüm adreslere yapılan bütün ödemeleri görebilir.

Bu nedenle üç konu tek bir karara bağlıdır:

| Tasarım | Tarama maliyeti | Denetçiye gösterilebilecekler |
|:--|:--|:--|
| Tek hesap, her müşteri için çeşitlendirilmiş adres | Müşteri sayısı ne olursa olsun tek anahtar | Her şey veya hiçbir şey |
| Her müşteri için bir hesap | Her blokta müşteri başına bir anahtar | Her seferinde tek müşteri |
| Her müşteri ve dönem için bir hesap | Her müşteri ve dönem için bir anahtar | Tek bir müşterinin tek bir dönemi |

Hesap tasarımını baştan seçin. Bir hesabı sonradan bölmek, içindeki fonları yeni hesaplara taşımayı gerektirir; bu da ücretlere ve görünür bir işlem örüntüsüne yol açar.

## Uygulamadaki maliyet

Bu ölçümler, testnet'teki gerçek Ironwood eylemlerinde `zcash_note_encryption` 0.5.1 sürümündeki `try_compact_note_decryption` kullanılarak, tek bir dizüstü bilgisayar çekirdeğinde (Apple M3 Pro, sürüm derlemesi) alınmıştır:

| Ölçüm | Değer |
|:--|:--|
| Tek seferde tek anahtarla bir deneme | yaklaşık 82 µs |
| 10 veya 100 anahtar üzerinde toplu işlenen bir deneme | yaklaşık 42 µs |

Toplu işleme maliyeti yaklaşık yarıya indirir; librustzcash tarayıcısı da aynı nedenle toplu işlem yapar.

`t = 42 µs` ve 330 eylem içeren tam bloklar için:

| İzlenen hesap sayısı | Tam blok başına çekirdek süresi | Tam blokları yakalamak için gereken çekirdek sayısı |
|:--|:--|:--|
| 1 | 28 ms | 0.001 |
| 1.000.000 (müşteri başına bir hesap) | 7,7 saat | yaklaşık 1.109 |

Aynı bir milyon müşterinin tek bir hesaptaki çeşitlendirilmiş adreslerini kullanmak, tam blok başına 28 ms'ye mal olur. Tek fark, hesap sınırının nerede olduğudur.

## Ortalamaya göre değil, yoğun dönemlere göre boyutlandırın

3.582.677 yüksekliğine kadar olan 5.000 mainnet bloğunda (17 Kasım 2026'da örneklenmiştir):

* Blokların %62'sinde korumalı çıktı yoktu ve ortanca değer sıfırdı
* Blok başına ortalama korumalı çıktı sayısı 12,3'tü
* 3.579.935 ile 3.580.346 yükseklikleri arasında, yani yaklaşık üç saatlik zincir boyunca, her birinde 250'den fazla çıktı bulunan 153 blok oluştu; bu bloklar çoğu zaman arka arkaya geldi. Örnekteki tüm çıktıların %75'ini içeriyorlardı

Ortalama değere göre boyutlandırılmış bir tarayıcı böyle bir seri sırasında geride kalır. Kapasite payı bırakın (örneğin, her bloğun 25 saniyelik aralığının yalnızca yarısını kullanmayı planlayın) ve üst sınıra göre boyutlandırın.

## Kompakt bloklar bant genişliğine yardımcı olur, deneme sayısını azaltmaz

Hafif cüzdanlar, bir hafif cüzdan sunucusundan kompakt blokları tarar. Kompakt bir eylem 148 bayttır; tam eylem ise 820 bayttır. Deneme için gereken verilerle sınırlıdır: geçici anahtar, şifreli metnin ilk 52 baytı, nullifier ve `cmx`. Şeffaf veriler yalnızca istemci talep ederse gönderilir.

Kompakt bloklar indirme boyutunu küçültür. Deneme sayısını azaltmaz; çünkü her eylem yine her anahtarla denenmelidir.

## Ödeme arka ucu için kontrol listesi

* Hesapları oluşturmadan önce kimin neyi görebileceğine karar verin
* Bilgi paylaşımı sınırları elverdiği sürece tek bir hesaptan her fatura için çeşitlendirilmiş adres verin
* `t` değerini, toplu işlem açıkken kendi donanımınızda ölçün
* Uç taramasını, blok başına 330 eyleme göre ve kapasite payı bırakarak boyutlandırın
* Yeniden taramaları yükseklik aralıklarına göre çalışanlar arasında bölün. Geçmiş değişmez; bu nedenle paralelleştirme sorunsuzca yapılabilir
* Her yeni hesabın başlangıç yüksekliğinden itibaren geriye dönük taranması gerektiğini unutmayın

## Daha fazla bilgi

* [ZIP 218: 25 saniyelik blok hedef aralığı](https://zips.z.cash/zip-0218) ve blok başına eylem sınırları
* [ZIP 32: korumalı hiyerarşik deterministik cüzdanlar](https://zips.z.cash/zip-0032)
* [ZIP 316: birleşik adresler ve birleşik görüntüleme anahtarları](https://zips.z.cash/zip-0316)
* [Lightwallet protokolü: compact_formats.proto](https://github.com/zcash/lightwallet-protocol/tree/main/walletrpc)
* [librustzcash](https://github.com/zcash/librustzcash): `zcash_client_backend` taraması ve `zcash_note_encryption`
* [Tek görüntüleme anahtarı, bir milyon müşteri](https://udokaam.dev/writing/one-viewing-key-a-million-customers/): yeniden oluşturulabilmeleri için laboratuvar koduyla birlikte tüm ölçümler
