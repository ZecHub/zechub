# Korumalı ödemeleri tespit etme: taramanın maliyeti

Korumalı ZEC kabul eden bir işletmenin gelen ödemeleri bulması gerekir. Şeffaf havuzda bu, bir dizin aramasıdır. Korumalı havuzlarda hiç kimse ödemeleri adrese göre dizine ekleyemez; bu nedenle cüzdanın veya arka uç sisteminin, kendi anahtarlarını kullanarak Zincir’deki her korumalı çıktıyı sınaması gerekir. Bu sayfa, bunun nasıl işlediğini, maliyetini ve maliyeti kontrol altında tutan bir hesap tasarımının nasıl seçileceğini açıklar.

## Kısaca

* Korumalı ödemeleri tespit etme maliyeti, dağıttığınız adreslerin sayısına değil, izlediğiniz **görüntüleme anahtarlarının** sayısına göre artar
* Tek bir hesap, tarama maliyetini artırmadan her müşteri veya fatura için yeni ve ilişkilendirilemez bir **çeşitlendirilmiş adres** oluşturabilir
* Bir görüntüleme anahtarı **hesabın tamamını** gösterir. Bir denetçinin yalnızca tek bir müşteriyi görmesi gerekiyorsa o müşterinin ayrı bir hesabı olmalıdır ve her hesap her blokta tarama işini artırır
* Tarayıcıyı ortalama bloklara göre değil, **tam bloklara** göre boyutlandırın. Mainnet’te şimdiden peş peşe neredeyse tam dolu bloklar üretiliyor
* Kapasiteyi belirlemeden önce kendi donanımınızda deneme başına maliyeti ölçün

## Korumalı ödemeler neden dizine eklenemez?

Şeffaf adreslerde bir düğüm her çıktının üzerindeki adresi okuyabilir ve adreslerden çıktılara giden bir dizin oluşturabilir. Zebra bunu `getaddressutxos` ve `getaddresstxids` üzerinden sunar.

Korumalı bir eylemde okunabilir bir adres bulunmaz. Eylem; bir note kriptografik taahhüdü, geçici bir açık anahtar ve şifrelenmiş bir note içerir. Bu baytların hiçbiri ödemenin kime yapıldığını belirtmediğinden, ne düğüm ne de bir [dizinleyici](Lightwallet_Nodes.md) adres dizini oluşturabilir.

Bu nedenle keşif ters yönde işler. Cüzdan her korumalı çıktıyı alır ve şifresini çözmeyi deneyerek “bu bana mı ait?” diye sorar. Buna **deneme amaçlı şifre çözme** denir. [Görüntüleme anahtarları](Viewing_Keys.md) anahtarların neleri açığa çıkardığını açıklar; [Zcash cüzdan senkronizasyonu](Zcash_Wallet_Syncing.md) ise cüzdanların bu işi nasıl planladığını ele alır.

## Tek bir deneme nasıl işler?

Hem Orchard hem de Ironwood havuzlarının kullandığı Orchard protokollü eylem biçimi için:

1. **Anahtar anlaşması:** Eylemin geçici açık anahtarını gelen görüntüleme anahtarınızla çarpın. Bu, Pallas eğrisi üzerinde bir skaler çarpımıdır ve maliyetin büyük bölümünü oluşturur
2. **Anahtar türetme:** Paylaşılan gizli değeri simetrik bir anahtara dönüştürerek özetleyin
3. Note’un **ilk 52 baytının** şifresini çözün: çeşitlendirici, değer ve `rseed`
4. Şifresini çözdüğünüz verilerden note’un kriptografik taahhüdünü **yeniden oluşturun**
5. Bunu eylemin `cmx` değeriyle **karşılaştırın**. Eşleşme, note’un size ait olduğu anlamına gelir

Note’un size ait olup olmadığını ancak 5. adımda öğrenirsiniz; bu nedenle **eşleşmeyen denemenin maliyeti, eşleşen denemeninkiyle yaklaşık aynıdır**. Zincir’deki eylemlerin neredeyse tamamı başkalarına aittir; dolayısıyla işin neredeyse tamamı eşleşmeyen denemelerden oluşur.

## Maliyet formülü

```text
work per block = K × I × A × t

K  accounts you watch
I  incoming viewing keys per account (2: external and internal)
A  shielded actions in the block
t  time for one trial on one core
```

Formülde adres sayısını belirten bir terim yoktur. Cüzdanlar hem harici anahtarı (dağıttığınız adresler) hem de dahili anahtarı (para üstü) dener; bu nedenle `I = 2`. Bunu librustzcash’ın `zcash_client_backend/src/scanning.rs` içindeki `for scope in [Scope::External, Scope::Internal]` döngülerinde görebilirsiniz.

[ZIP 218](https://zips.z.cash/zip-0218) korumalı eylem sayısını **blok başına 330** ile sınırlar; dolayısıyla `A` en fazla 330’dur.

## Çeşitlendirilmiş adresler: Çok sayıda adres, tek anahtar

Orchard protokollü bir adres; `d` (11 bayt) çeşitlendiriciden ve aynı gelen görüntüleme anahtarından türetilen bir iletim anahtarından oluşur. [ZIP 32](https://zips.z.cash/zip-0032), FF1 şifrelemesiyle her çeşitlendiriciyi 88 bitlik bir dizinden türetir; böylece tek bir hesap **2^88 adrese** sahip olur ve bunların her biri Orchard protokolü için geçerlidir.

Bu, bir ödeme arka uç sistemine iki kullanışlı özellik kazandırır:

* **Adresler ilişkilendirilemez.** Görüntüleme anahtarı olmadan, tek bir hesaptaki iki çeşitlendirilmiş adres iki farklı cüzdana aitmiş gibi görünür
* **Ödemeleri arama tablosu olmadan faturalarla eşleştirebilirsiniz.** Deneme amaçlı şifre çözme başarılı olduğunda, şifresi çözülen note `d` içerir. Hesabın çeşitlendirici anahtarı `d` değerinin şifresini çözerek dizinine ulaşır; dizin numarası fatura numaranızsa hangi faturanın ödendiğini bilirsiniz

Müşteriye göstermeden önce her adresi bir [birleşik adres](../Using_Zcash/Unified_Addresses.md) ([ZIP 316](https://zips.z.cash/zip-0316)) içine yerleştirin.

## Dezavantajı: Görüntüleme anahtarı hesabın tamamını gösterir

Bir görüntüleme anahtarını tek bir çeşitlendirilmiş adresle sınırlayamazsınız; çünkü hesaptaki her adres aynı anahtarı kullanır. Dolayısıyla açıklanabilecek en küçük birim de hesaptır. Hesabın görüntüleme anahtarını alan herkes, hesaptaki tüm adreslere yapılan bütün ödemeleri görür.

Bu nedenle aşağıdaki üç konu tek bir karara bağlıdır:

| Tasarım | Tarama maliyeti | Denetçiye gösterilebilecekler |
|:--|:--|:--|
| Her müşteri için çeşitlendirilmiş adres kullanan tek hesap | Müşteri sayısı ne olursa olsun tek anahtar | Her şey ya da hiçbir şey |
| Müşteri başına bir hesap | Her blokta müşteri başına bir anahtar | Her seferinde tek bir müşteri |
| Her müşteri ve dönem için bir hesap | Müşteri ve dönem başına bir anahtar | Bir dönem için tek bir müşteri |

Hesap tasarımını en baştan seçin. Bir hesabı sonradan bölmek, fonlarını yeni hesaplara aktarmak anlamına gelir; bu da ücretlere yol açar ve görünür bir örüntü oluşturur.

## Uygulamada maliyeti

Bu ölçümler gerçek testnet Ironwood eylemleri üzerinde, `zcash_note_encryption` 0.5.1 sürümündeki `try_compact_note_decryption` kullanılarak tek bir dizüstü bilgisayar çekirdeğinde (Apple M3 Pro, sürüm derlemesi) alınmıştır:

| Ölçüm | Değer |
|:--|:--|
| Tek seferde tek anahtarla bir deneme | yaklaşık 82 µs |
| 10 veya 100 anahtarda toplu olarak bir deneme | yaklaşık 42 µs |

Toplu işleme maliyeti yaklaşık yarıya indirir; librustzcash tarayıcısı da aynı nedenle denemeleri toplu işler.

`t = 42 µs` ve eylem sayısı 330 olan tam bloklarla:

| İzlenen hesap sayısı | Tam blok başına çekirdek süresi | Tam blokları yakalamak için gereken çekirdek sayısı |
|:--|:--|:--|
| 1 | 28 ms | 0,001 |
| 1.000.000 (müşteri başına bir hesap) | 7,7 saat | yaklaşık 1.109 |

Aynı bir milyon müşterinin tek bir hesaptaki çeşitlendirilmiş adreslerini taramanın maliyeti, tam blok başına 28 ms’dir. Tek fark, hesap sınırının nerede olduğudur.

## Ortalamalara değil, ani yoğunluklara göre boyutlandırın

3.582.677 yüksekliğine kadarki 5.000 mainnet bloğunda (17 Kasım 2026’da örneklenmiştir):

* Blokların %62’sinde hiç korumalı çıktı yoktu ve ortanca değer sıfırdı
* Blok başına ortalama korumalı çıktı sayısı 12,3’tü
* 3.579.935 ile 3.580.346 yükseklikleri arasında, yaklaşık üç saatlik Zincir süresinde, her biri 250’den fazla çıktı içeren 153 blok vardı; çoğu zaman bu bloklar peş peşe geldi. Örneklemdeki tüm çıktıların %75’ini bu bloklar içeriyordu

Ortalamaya göre boyutlandırılan bir tarayıcı böyle bir yoğunluk sırasında geride kalır. Kapasite payı bırakın (örneğin her bloğun 25 saniyelik aralığının yarısını kullanmayı planlayın) ve üst sınıra göre boyutlandırın.

## Kompakt bloklar bant genişliğini azaltır, deneme sayısını değil

Hafif cüzdanlar, bir lightwallet sunucusundan kompakt blokları tarar. Kompakt bir eylem 148 bayttır; tam eylem ise 820 bayttır. Kompakt biçim, yalnızca bir deneme için gerekenleri tutar: geçici anahtar, şifreli metnin ilk 52 baytı, nullifier ve `cmx`. Şeffaf veriler yalnızca istemci talep ederse gönderilir.

Kompakt bloklar indirme boyutunu küçültür. Deneme sayısını azaltmazlar; çünkü her eylemin her anahtarla denenmesi gerekir.

## Ödeme arka uç sistemi için kontrol listesi

* Hesap oluşturmadan önce kimin neyi görmesi gerekeceğine karar verin
* İfşaat sınırlarının izin verdiği her durumda tek bir hesaptan fatura başına çeşitlendirilmiş bir adres oluşturun
* `t` değerini kendi donanımınızda toplu işlem açıkken ölçün
* Güncel blokları tarama kapasitesini, blok başına 330 eyleme ve kapasite payına göre boyutlandırın
* Yeniden taramaları çalışanlar arasında yükseklik aralıklarına göre bölün. Geçmiş sabit olduğundan, bu işlem kolayca paralelleştirilebilir
* Her yeni hesabın doğum yüksekliğine kadar geriye dönük taranması gerektiğini unutmayın

## Daha fazla bilgi

* [ZIP 218: 25 saniyelik blok hedef aralığı](https://zips.z.cash/zip-0218) ve blok başına eylem sınırları
* [ZIP 32: korumalı hiyerarşik deterministik cüzdanlar](https://zips.z.cash/zip-0032)
* [ZIP 316: birleşik adresler ve birleşik görüntüleme anahtarları](https://zips.z.cash/zip-0316)
* [Lightwallet protokolü: compact_formats.proto](https://github.com/zcash/lightwallet-protocol/tree/main/walletrpc)
* [librustzcash](https://github.com/zcash/librustzcash): `zcash_client_backend` taraması ve `zcash_note_encryption`
* [Tek görüntüleme anahtarı, bir milyon müşteri](https://udokaam.dev/writing/one-viewing-key-a-million-customers/): laboratuvar koduyla yeniden üretilebilen tüm ölçümler
