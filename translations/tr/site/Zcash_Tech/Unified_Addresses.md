# Birleşik Adres (ZIP-316) Doğrulaması

*Bu, öğrenme amaçlı bir kılavuzdur; paketlenmiş bir kod çözücü veya kopyala-yapıştır ödeme kütüphanesi değildir. Birleşik Adres’in yapısını, bakımı yapılan kütüphanelerin arka planda ne yaptığını anlayabilmeniz için açıklar. Gerçek fonları işleyen her şey için aşağıdaki [ZIP-316 belirtimine](https://zips.z.cash/zip-0316) ve resmi uygulamalara başvurun.*

---

## Genel bakış

Birleşik Adres (UA), birden fazla alıcı türü içeren tek bir adres dizgesidir: **Şeffaf**, **Sapling**, **Orchard** veya bunların birleşimi. Ödeme yapan cüzdan, desteklediği en uygun alıcı havuzunu otomatik olarak seçer.

Bir UA’yı, üzerinde etiketli birkaç kart bulunan mühürlü bir zarf gibi düşünün. Her kart size ulaşmanın farklı bir yolunu temsil eder. Bir adresi doğrulamak için uygulamanın şunları yapması gerekir:

1. **Zarfı açın:** Metin dizgesini çözün.
2. **İçindekileri karıştırmadan çıkarın:** Koruyucu karıştırmayı (**F4Jumble**) geri alın.
3. **Her kartı okuyun:** Tek tek alıcıları çıkarın.
4. **Protokol kurallarını uygulayın:** Tür kodu aralığına göre girdileri yoksayın veya reddedin.

---

## “Bech32m’yi çözmek” neden yeterli değil?

Bir UA, Bech32m metin kodlamasını kullanır; ancak yalnızca Bech32m’yi çözmek, kullanılabilir alıcıları ortaya çıkarmaz.

ZIP-316, yükü kodlamadan önce **F4Jumble** kullanarak kasıtlı olarak karıştırır. F4Jumble, adresteki tek bir karakteri bile değiştirmenin çözülen çıktıyı tamamen değiştirmesini sağlar. Böylece saldırganın, önek ve son ek geçerli görünürken adresin ortasındaki baytları değiştirdiği adres değiştirilebilirliği saldırıları önlenir.

> **Temel kural:** Değiştirilebilirliğe karşı koruma, yalnızca uygulamanız tüm çözme ve doğrulama işlem hattını çalıştırırsa işe yarar. Kısmi çözüm, tüm riski korurken güvenliği ortadan kaldırır.

---

## Çözüm işlem hattı, adım adım

### Adım 1: Bech32m’yi çözün ve ağı kontrol edin
- **İnsan tarafından okunabilir kısım (HRP):** `u` mainnet’i; `utest` testnet’i belirtir. *(Mainnet UA’lar `u1` ile başlar; burada `1` Bech32 ayırıcısıdır.)*
- **Uzunluk sınırı:** Standart Bech32m, 90 karakterlik bir sınır uygular. UA’lar genellikle bu sınırı aşar; bu nedenle kod çözücüde standart uzunluk kontrolleri devre dışı bırakılmalıdır.
- 5 bitlik Bech32m sözcüklerini yeniden standart 8 bitlik baytlara dönüştürün.

### Adım 2: F4Jumble’ı tersine çevirin
F4Jumble, BLAKE2b üzerine kurulu 4 turlu bir Feistel ağıdır:
- **Sol yarının uzunluğu:** `min(64, floor(length / 2))` bayt. 64 baytlık üst sınır, BLAKE2b’nin maksimum çıktı boyutuna karşılık gelir. Sağ yarı kalan yükü içerir.
- **Özet işlevleri:** Sabit kişiselleştirme etiketleriyle (`UA_F4Jumble_G` ve `UA_F4Jumble_H`) G ve H sırayla kullanılır.
- **Tur sıralaması:** İleri kodlama G(0) → H(0) → G(1) → H(1) sırasını izler. Tersine çevirme (karıştırmayı geri alma) H(1) → G(1) → H(0) → G(0) sırasını izler.
- **Aralık kontrolü:** ZIP-316 yük boyutu sınırlarının dışındaki girdileri reddedin.

### Adım 3: Dolguyu kaldırın ve HRP’yi doğrulayın
Karıştırmadan önce kodlayıcı, sıfırlarla doldurulmuş ve HRP’yi içeren 16 bayt ekler.
- Karıştırmayı geri aldıktan sonra son 16 baytı kaldırın.
- Gömülü HRP’nin beklenen ağla (`u` veya `utest`) eşleştiğini doğrulayın. Bu, testnet adreslerinin yanlışlıkla mainnet’te kabul edilmesini önler.

### Adım 4: Alıcıları çıkarın
Kalan yük, `(typecode, length, content)` girdilerinden oluşur; tür kodu ve uzunluk kompakt boyutlu tamsayılar olarak saklanır (küçük değerler için tek bayt). Bilinen alıcı türü kodları:

| Tür kodu | Alıcı türü       | İçerik uzunluğu |
| :------- | :------------------ | :------------- |
| `0x00`   | Şeffaf (P2PKH) | 20 bayt       |
| `0x01`   | Şeffaf (P2SH)  | 20 bayt       |
| `0x02`   | Sapling             | 43 bayt       |
| `0x03`   | Orchard             | 43 bayt       |

Bunların ötesinde, ZIP-316 ileriye dönük uyumluluk için iki ek aralık ayırır:

- **`0xC0`–`0xDF` (anlaşılması ZORUNLU OLMAYAN üst veriler):** Tüketiciler, bu aralıkta tanımadıkları üst veri öğelerini yoksaymalıdır.
- **`0xE0` ve `0xE1` (atanmış, anlaşılması ZORUNLU üst veriler - sona erme):** Mevcut ZIP-316 kayıt defteri, bunları adresin sona erme yüksekliği ve zamanına atar. Tüketiciler bu öğeleri anlamalı, aksi takdirde adresi reddetmelidir.
- **`0xE2`–`0xFC` (atanmamış, anlaşılması ZORUNLU üst veriler):** Tüketiciler bu aralıkta tanımadıkları bir öğeyle karşılaşırlarsa adresi reddetmelidir.

Bilinen alıcı türlerinde, kodlanmış uzunluğun tür için belirtilen içerik uzunluğuyla eşleştiğini doğrulayın. Üst veri öğelerinde içerik uzunluğunu belirlemek için kodlanmış kompakt boyut uzunluğunu kullanın. Kesilmiş girdileri veya sondaki fazladan baytları reddedin.

**Tercih edilen alıcı sıralaması.** Bir adres başarıyla ayrıştırıldığında, cüzdan veya ödeme aracı en iyi alıcıyı şu sırayla seçmelidir: Orchard, ardından Sapling, sonra şeffaf alıcı.

---

## ZIP-316 kapsamında zorunlu ret kuralları

**Başarıyla çözülmesi, bir adresi geçerli kılmaz.** Resmi Zcash cüzdanları aşağıdaki kuralları ihlal eden adresleri kesin olarak reddeder. Ödeme hatalarını önlemek için web araçları da bu adresleri reddetmelidir:

- **Korumalı alıcıların eksik olması:** Adres en az bir Sapling veya Orchard alıcısı **içermelidir**. Yalnızca şeffaf alıcıları olan bir UA, ZIP-316 kapsamında geçersizdir.
- **Yinelenen tür kodları:** Her alıcı türü en fazla bir kez görünebilir.
- **Sıralanmamış tür kodları:** Alıcılar, tür kodları kesin artan sırada olacak şekilde görünmelidir.
- **Çakışan şeffaf alıcılar:** Bir UA, P2PKH veya P2SH içerebilir; ancak **ikisini birden asla içeremez**.
- **Hatalı girdiler veya dolgu:** Eşleşmeyen ağ önekleri, kesilmiş yükler veya uzunluk uyuşmazlıkları derhal reddedilmeyi gerektirmelidir.
- **Tanınmayan tür kodları:** Tüketiciler, tanınmayan öğeleri yoksaymalıdır; ancak tanınmayan olduklarında reddedilmesi gereken, anlaşılması ZORUNLU üst veri aralığındaki öğeler (`0xE0`–`0xFC`) buna dahil değildir. Mevcut kayıt defterinde `0xE0` ve `0xE1` sona erme türlerine atanmış, `0xE2`–`0xFC` ise atanmamıştır. Ayrıca, Sapling veya Orchard alıcısı bulunması şartı da dahil olmak üzere yukarıdaki zorunlu geçerlilik kurallarını karşılamayan her adresi reddedin.

---

## Geliştiriciler için en iyi uygulamalar

- **Ham dizgeleri değil, ayrıştırılmış alıcıları karşılaştırın.** Eşitliği kontrol etmeden önce adresleri çözün.
- **Fon işleyen her şey için bakımı yapılan kütüphaneleri kullanın.** Resmi Rust crate’lerini (`zcash_address` gibi) WebAssembly için derleyin; özel JavaScript kod çözücüleri kullanıma almayın.
- **Elle yazılmış ayrıştırıcılara temkinli yaklaşın.** Öğrenmek için bir tane yazarsanız, bunu bir çalışma projesi olarak ele alın ve herhangi bir şey için güvenmeden önce aşağıdaki resmi test vektörleriyle sınayın.

---

## Resmi belirtimler ve referans uygulamalar

- **[ZIP-316: Birleşik Adresler ve Görüntüleme Anahtarları](https://zips.z.cash/zip-0316)**
- **[zcash_address crate’i (librustzcash)](https://github.com/zcash/librustzcash/tree/main/components/zcash_address)**
- **[f4jumble crate’i (librustzcash)](https://github.com/zcash/librustzcash/tree/main/components/f4jumble)**
- **Resmi test vektörleri:**
  - [F4Jumble test vektörleri](https://github.com/zcash/librustzcash/blob/main/components/f4jumble/src/test_vectors.rs)
  - [Birleşik Adres test vektörleri](https://github.com/zcash/librustzcash/blob/main/components/zcash_address/src/kind/unified/address/test_vectors.rs)

---

## Sözlük

| Terim | Anlamı |
| :----------------------- | :-------------------------------------------------------------------- |
| **Unified Address (UA)** | Birden fazla alıcı havuzunu bir araya getiren tek bir adres dizgesi. |
| **Receiver** | Belirli bir ödeme hedefi türü (şeffaf, Sapling veya Orchard). |
| **Bech32m** | UA dizgeleri için kullanılan metin kodlama şeması. |
| **HRP** | İnsan tarafından okunabilir kısım veya ağ öneki (`u` veya `utest`). |
| **F4Jumble** | Adres bütünlüğünü sağlayan, geri çevrilebilir bir gizleme algoritması. |
| **Typecode** | Yükteki her girdide alıcı türünü tanımlayan sayı. |
| **Malleability** | Adres baytlarının tespit edilmeden izinsiz değiştirilmesi. |

Ayrıca bkz.: [Görüntüleme Anahtarları](./Viewing_Keys.md)
