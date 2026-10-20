# İndeksleyici Karşılaştırması: Zaino vs Ztreamer

Zaino ve Ztreamer, Zcash hafif cüzdanlarının senkronize olmak için kullandığı API olan lightwallet gRPC protokolünü sunan iki indeksleyicidir. Bu sayfa, ikisinin bağımsız ve yeniden üretilebilir bir karşılaştırmasını özetler: aynı yanıtları verip vermedikleri, indekslerini oluşturmalarının ne kadar sürdüğü ve cüzdanlara ne kadar hızlı hizmet verdikleri.

## Kısaca

* Her iki indeksleyici de doğru zincir verilerini döndürür. Zebra ile doğrulanabilen her yanıt eşleşti; dolayısıyla cüzdanlar her ikisini de kullanabilir.
* Bulunan farklılıklar, kurallar ve uç durumlarla ilgilidir: hata kodları, bir hash'in bayt sırası, yinelenen bir adresin nasıl sayıldığı ve birkaç JSON-RPC yanıt biçimi.
* Ztreamer, aynı CPU üzerinde indeksini yaklaşık 6× daha hızlı oluşturur. Zaino ise oluşturma sırasında istekleri Zebra'e ileterek 6 saniye sonra yanıt vermeye başlar.
* Ztreamer, ölçülen her senaryoda daha hızlı hizmet verir: tam bir cüzdan indirmesinde saniyede 13–17× daha fazla blok.
* Zaino'in gecikmesinin önemli bir kısmı, eksik bir socket ayarından (`TCP_NODELAY`) kaynaklanır; bu, birçok isteğe yaklaşık 40 ms ekler. Tek satırlık bir düzeltmedir.

## Karşılaştırılanlar

| Derleme | Arka uç düğümü | Neden |
|:--|:--|:--|
| Zaino 0.10.1 | Zebra 6.4.2 (`direct` arka ucu) | En son kararlı Zaino sürümü |
| Zaino 0.9.0 | Zebra 6.4.2 (`direct` arka ucu) | Ztreamer'in kendi yayımladığı karşılaştırmada ölçülen sürüm |
| Ztreamer v0.1.0 | Gömülü Zakura düğümü | En son Ztreamer etiketi |
| Ztreamer master | Gömülü Zakura 1.5.1 | Ztreamer'in kurulum talimatlarının oluşturduğu sürüm |

İkisi farklı tasarımlar kullanır:

* **Zaino**, bir [Zebra](Zebra_Full_Node.md) tam düğümünün yanında ayrı bir süreç olarak çalışır, Zebra'in durumunu okur ve kendi indeksini tutar. [Z3 yığınının](Z3_Stack.md) indeksleyicisidir. Bkz. [Zaino](Zaino.md).
* **Ztreamer**, aynı süreç içine bir [Zakura](Zakura_Node.md) düğümü (bir Zebra fork'u) gömer ve bir kompakt blok indeksi tutar.

## Nasıl Ölçüldü

* **Herkes için aynı veri.** Her derleme, 4.382.897 yüksekliğinde dondurulmuş aynı Zcash Foundation testnet anlık görüntüsünden başladı; böylece hepsi tam olarak aynı zinciri indeksledi.
* **Herkes tekrarlayabilir.** Her şey ücretsiz GitHub barındırmalı çalıştırıcılarda çalışır: depoyu fork'layın ve bir iş akışı çalıştırın.
* **Her derleme için üç çalıştırma**, her biri boş bir indeksten başladı. Sunucu ve yük oluşturucu ayrı CPU çekirdeklerinde çalıştı.
* **Uyumluluk:** lightwallet protokolünün 20 gRPC yönteminin tamamı (274 test durumu), derlemeler arasında bayt bayt karşılaştırıldı ve Zebra'in JSON-RPC'sine göre denetlendi. Zaino'in sunduğu 28 JSON-RPC yöntemi de denetlendi.
* **Performans:** indeksi oluşturmak için gereken süre ve kaynaklar, istek başına gecikme, blok aralığı işlem hacmi, 1 ila 128 eşzamanlı istemci ve Sapling etkinleştirmesinden uca kadar tam cüzdan indirmesi.

## Sonuçlar

### İndeks oluşturma

Üç çalıştırmanın medyanları:

| Derleme | İndeks tamamlandı | İlk yanıt | Diskteki indeks boyutu |
|:--|--:|--:|--:|
| Zaino 0.10.1 | 1.395 s | 6 s | 22,06 GiB |
| Zaino 0.9.0 | 1.211 s | 6 s | 22,06 GiB |
| Ztreamer v0.1.0 | 216 s | 210 s | 1,44 GiB |
| Ztreamer master | 159 s | 158 s | 1,44 GiB |

Zaino, oluşturma sırasında istekleri Zebra'e ilettiği için neredeyse anında kullanılabilir. Ztreamer, indeksi tamamlanana kadar hiçbir şey sunmaz. Aynı CPU modelinde Zaino 0.10.1, Ztreamer v0.1.0'dan 6–6,5× daha uzun sürdü ve 7,5–8× CPU süresi kullandı (Zebra dahil).

### Hizmet verme

Aksi belirtilmedikçe, saniye başına blok cinsinden üç çalıştırmanın medyanları:

| Senaryo | Zaino 0.10.1 | Ztreamer v0.1.0 |
|:--|--:|--:|
| 1.000 blokluk blok aralığı | 11.414 | 179.486 |
| Tam cüzdan indirmesi (280.000 → uç) | 11.124 | 189.041 |
| 128 istemcili 1.000 blokluk blok aralığı | 110.093 | 229.527 |
| Tek blok, 128 istemci (istek/s) | 6.843 | 11.044 |

Her iki sunucu da iki CPU çekirdeğiyle sınırlı olduğundan, 128 istemcide fark yaklaşık 2×'e düşer.

### 40 ms tabanı

Zaino üzerinde, on iki RPC'nin altısının medyan gecikmesi yaklaşık 40 ms'dir ve her RPC'nin 99. yüzdelik değeri yaklaşık 41 ms'dir. Bunun nedeni, Zaino'in gRPC dinleyicisini kurma biçimidir: `TCP_NODELAY` socket seçeneği hiçbir zaman açılmaz; bu nedenle işletim sistemi küçük yanıtları 40 ms'ye kadar bekletir.

Zaino ikili dosyasını değiştirmeden, seçeneği dışarıdan açmak bu tabanı ortadan kaldırdı. Örneğin `GetTreeState`, 40,3 ms'den 0,75 ms'ye düştü (Ztreamer: 0,63 ms). Toplu blok akışı değişmedi; dolayısıyla yukarıdaki işlem hacmi farkı gerçektir.

### Uyumluluk farkları

* **Zaino 0.9.0**, protokol varsayılanın yalnızca korumalı veri olduğunu belirtirken, varsayılan olarak `GetBlock` içinde şeffaf veri içerir. Bu durum 0.10.1'de düzeltildi.
* **`GetSubtreeRoots`:** `completingBlockHash` alanı iki indeksleyicide zıt bayt sıraları kullanır. Güncel cüzdanlar bu alanı okumaz.
* **Hata kodları:** Zaino, hatalı girdi için `INTERNAL` döndürür; Ztreamer ise `INVALID_ARGUMENT` veya `NOT_FOUND` döndürür.
* `GetTaddressBalanceStream` içindeki **yinelenen adresler**, Ztreamer master hariç iki kez sayılır.
* **JSON-RPC:** Zaino'in, ayrıntı düzeyi 0 olan `getrawtransaction` yöntemi, Zebra ve zcashd'den farklı olarak hex dizgesi yerine bir nesne döndürür.

## Sınırlamalar

* **Yalnızca Testnet.** Testnet blokları mainnet bloklarından daha küçüktür; dolayısıyla mutlak süreler ve boyutlar mainnet değerleri değildir. Karşılaştırma, özdeş girdiler üzerindeki göreli bir karşılaştırmadır.
* **Birden fazla CPU modeli bulunan paylaşımlı CI makineleri.** Tam rapor, ana sonuçlar için aynı CPU'daki karşılaştırmaları sunar.
* **Ölçülmeyenler:** yeniden düzenlemeler, canlı bir zincir ucunu takip etme, mempool yükü ve TLS.

## Daha Fazlasını Öğrenin

* Tam rapor: [zcash-indexer-bench/report/report.md](https://github.com/pearl-max468/zcash-indexer-bench/blob/main/report/report.md)
* Karşılaştırma deposu: [github.com/pearl-max468/zcash-indexer-bench](https://github.com/pearl-max468/zcash-indexer-bench)
* Ham veriler: [results-2026-10-10 release](https://github.com/pearl-max468/zcash-indexer-bench/releases/tag/results-2026-10-10)
* Zaino: [github.com/zingolabs/zaino](https://github.com/zingolabs/zaino)
* Ztreamer: [ztreamer.sh](https://ztreamer.sh)
