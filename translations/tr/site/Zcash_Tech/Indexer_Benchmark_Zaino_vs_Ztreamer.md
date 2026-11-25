# İndeksleyici Karşılaştırması: Zaino ve Ztreamer

Zaino ve Ztreamer, Zcash hafif cüzdanların eşitleme için kullandığı API olan lightwallet gRPC protokolünü sunan iki indeksleyicidir. Bu sayfa, ikisinin bağımsız ve tekrarlanabilir bir karşılaştırmasını özetlemektedir: Aynı yanıtları verip vermedikleri, indekslerini oluşturmanın ne kadar sürdüğü ve cüzdanlara ne kadar hızlı hizmet verdikleri.

## Kısaca

* Her iki indeksleyici de doğru Zincir verileri döndürür. Zebra ile karşılaştırılabilen tüm yanıtlar eşleşti; bu nedenle cüzdanlar ikisinden herhangi birini kullanabilir.
* Bulunan farklılıklar, kurallar ve uç durumlarla ilgilidir: hata kodları, bir hash'in bayt sıralaması, yinelenen bir adresin nasıl sayıldığı ve birkaç JSON-RPC yanıt biçimi.
* Ztreamer aynı CPU üzerinde indeksini yaklaşık 6 kat daha hızlı oluşturur. Zaino, indeksini oluştururken istekleri Zebra üzerinden ileterek 6 saniye sonra yanıt vermeye başlar.
* Ztreamer, ölçülen her senaryoda daha hızlı hizmet verir: Tam cüzdan indirmesinde saniyede 13–17 kat daha fazla blok.
* Zaino gecikmesinin büyük bir kısmı, eksik bir soket ayarından (`TCP_NODELAY`) kaynaklanır; bu ayar birçok isteğe yaklaşık 40 ms ekler. Tek satırlık bir düzeltmesi vardır.

## Karşılaştırılanlar

| Derleme | Altta yatan düğüm | Nedeni |
|:--|:--|:--|
| Zaino 0.10.1 | Zebra 6.4.2 (`direct` arka ucu) | En son kararlı Zaino sürümü |
| Zaino 0.9.0 | Zebra 6.4.2 (`direct` arka ucu) | Ztreamer tarafından yayımlanan kendi karşılaştırmasında ölçülen sürüm |
| Ztreamer v0.1.0 | Gömülü Zakura düğümü | En son Ztreamer etiketi |
| Ztreamer master | Gömülü Zakura 1.5.1 | Ztreamer kurulum talimatlarının derlediği sürüm |

İki indeksleyici farklı tasarımlar kullanır:

* **Zaino**, [Zebra](Zebra_Full_Node.md) tam düğümünün yanında ayrı bir süreç olarak çalışır, Zebra durumunu okur ve kendi indeksini tutar. [Z3 yığınının](Z3_Stack.md) indeksleyicisidir. Bkz. [Zaino](Zaino.md).
* **Ztreamer**, aynı süreçte bir [Zakura](Zakura_Node.md) düğümünü (bir Zebra çatallaması) gömer ve kompakt blok indeksi tutar.

## Ölçüm Yöntemi

* **Herkes için aynı veriler.** Her derleme, yüksekliği 4.382.897'de sabitlenmiş aynı Zcash Foundation test ağı anlık görüntüsüyle başladı; böylece hepsi tamamen aynı Zinciri indeksledi.
* **Herkes tekrarlayabilir.** Her şey ücretsiz GitHub barındırmalı çalıştırıcılarda çalışır: Depoyu çatallayıp bir iş akışı çalıştırmanız yeterlidir.
* **Her derleme için üç çalıştırma**, her biri boş bir indeksle başladı. Sunucu ve yük oluşturucu ayrı CPU çekirdeklerinde çalıştı.
* **Uyumluluk:** 20 lightwallet-protocol gRPC yönteminin tümü (274 test durumu), derlemeler arasında bayt bayt karşılaştırıldı ve Zebra JSON-RPC'siyle kontrol edildi. Zaino tarafından sunulan 28 JSON-RPC yöntemi de kontrol edildi.
* **Performans:** İndeksi oluşturma süresi ve kaynakları, istek başına gecikme, blok aralığı iş hacmi, 1 ila 128 eşzamanlı istemci ve Sapling etkinleştirmesinden Zincir ucuna kadar tam cüzdan indirmesi.

## Sonuçlar

### İndeks oluşturma

Üç çalıştırmanın ortanca değerleri:

| Derleme | İndeks tamamlandı | İlk yanıt | Diskteki indeks boyutu |
|:--|--:|--:|--:|
| Zaino 0.10.1 | 1.395 s | 6 s | 22.06 GiB |
| Zaino 0.9.0 | 1.211 s | 6 s | 22.06 GiB |
| Ztreamer v0.1.0 | 216 s | 210 s | 1.44 GiB |
| Ztreamer master | 159 s | 158 s | 1.44 GiB |

Zaino neredeyse hemen kullanılabilir; çünkü indeksini oluştururken istekleri Zebra üzerinden iletir. Ztreamer ise indeksi tamamlanana kadar hiçbir şey sunmaz. Aynı CPU modelinde Zaino 0.10.1, Ztreamer v0.1.0'dan 6–6,5 kat daha uzun sürdü ve Zebra dâhil CPU süresini 7,5–8 kat daha fazla kullandı.

### Hizmet sunma

Üç çalıştırmanın ortanca değerleri; aksi belirtilmedikçe saniye başına blok cinsinden:

| Senaryo | Zaino 0.10.1 | Ztreamer v0.1.0 |
|:--|--:|--:|
| 1.000 blokluk blok aralığı | 11.414 | 179.486 |
| Tam cüzdan indirmesi (280.000 → Zincir ucu) | 11.124 | 189.041 |
| 128 istemciyle 1.000 blokluk blok aralığı | 110.093 | 229.527 |
| 128 istemciyle tek blok (istek/s) | 6.843 | 11.044 |

128 istemciyle fark yaklaşık 2 kata iner; çünkü her iki sunucu da iki CPU çekirdeğiyle sınırlıydı.

### 40 ms gecikme tabanı

Zaino üzerinde, 12 RPC'den altısının ortanca gecikmesi yaklaşık 40 ms'dir ve her RPC'nin 99. yüzdelik değeri yaklaşık 41 ms'dir. Bunun nedeni, Zaino gRPC dinleyicisini kurma biçimidir: `TCP_NODELAY` soket seçeneği hiçbir zaman etkinleştirilmez; bu nedenle işletim sistemi küçük yanıtları 40 ms'ye kadar bekletir.

Zaino ikili dosyasını değiştirmeden, seçeneği dışarıdan açmak gecikme tabanını ortadan kaldırdı. Örneğin, `GetTreeState` değeri 40,3 ms'den 0,75 ms'ye düştü (Ztreamer: 0,63 ms). Toplu blok akışında değişiklik olmadı; dolayısıyla yukarıdaki iş hacmi farkı gerçektir.

### Uyumluluk farklılıkları

* **Zaino 0.9.0**, protokol varsayılanın yalnızca korumalı veriler olduğunu belirtmesine rağmen `GetBlock` içine varsayılan olarak şeffaf verileri dâhil eder. Bu, 0.10.1'de düzeltildi.
* **`GetSubtreeRoots`:** `completingBlockHash` alanı, iki indeksleyicide farklı bayt sıralamaları kullanır. Mevcut cüzdanlar bu alanı okumaz.
* **Hata kodları:** Zaino hatalı girdi için `INTERNAL` döndürür; Ztreamer ise `INVALID_ARGUMENT` veya `NOT_FOUND` döndürür.
* `GetTaddressBalanceStream` içindeki **yinelenen adresler**, Ztreamer master dışında iki kez sayılır.
* **JSON-RPC:** Zaino tarafından sunulan `getrawtransaction`, verbosity değeri 0 olduğunda Zebra ve zcashd'den farklı olarak hex dizesi yerine bir nesne döndürür.

## Sınırlamalar

* **Yalnızca test ağı.** Test ağı blokları ana ağ bloklarından daha küçüktür; bu nedenle mutlak süreler ve boyutlar ana ağ değerleri değildir. Karşılaştırma, özdeş girdiler üzerinde görecelidir.
* **Birden fazla CPU modeli kullanan ortak CI makineleri.** Tam raporda, öne çıkan sayılar için aynı CPU üzerindeki karşılaştırmalar yer alır.
* **Ölçülmeyenler:** Zincir yeniden düzenlemeleri, canlı Zincir ucunu takip etme, bellek havuzu yükü ve TLS.

## Daha Fazla Bilgi

* Tam rapor: [zcash-indexer-bench/report/report.md](https://github.com/pearl-max468/zcash-indexer-bench/blob/main/report/report.md)
* Karşılaştırma deposu: [github.com/pearl-max468/zcash-indexer-bench](https://github.com/pearl-max468/zcash-indexer-bench)
* Ham veriler: [2026-10-10 sürümünün sonuçları](https://github.com/pearl-max468/zcash-indexer-bench/releases/tag/results-2026-10-10)
* Zaino: [github.com/zingolabs/zaino](https://github.com/zingolabs/zaino)
* Ztreamer: [ztreamer.sh](https://ztreamer.sh)
