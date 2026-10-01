# Unified Address (ZIP-316) Doğrulama

*Bu, paketlenmiş bir kod çözücü veya kopyala-yapıştır ödeme kütüphanesi değil, bir öğrenme rehberidir. Bakımı yapılan kütüphanelerin perde arkasında ne yaptığını anlayabilmeniz için bir Unified Address öğesinin nasıl yapılandırıldığını açıklar. Gerçek fonları işleyen her şey için [ZIP-316 belirtimine](https://zips.z.cash/zip-0316) ve aşağıda bağlantısı verilen resmî uygulamalara başvurun.*

---

## Genel bakış

Bir Unified Address (UA), birden fazla alıcı türü taşıyan tek bir adres dizgesidir: **Transparent**, **Sapling**, **Orchard** veya bunların bir kombinasyonu. Ödeme yapan cüzdan, desteklediği en iyi alıcı havuzunu otomatik olarak seçer.

Bir UA'yı, üzerinde etiket bulunan birkaç kart içeren mühürlü bir zarf gibi düşünün. Her kart, size ulaşmanın farklı bir yolunu temsil eder. Bir adresi kontrol etmek için bir uygulamanın şunları yapması gerekir:

1. **Zarfı açmak:** Metin dizgesini çözmek.
2. **İçeriği yeniden düzenlemek:** Koruyucu karıştırmayı (**F4Jumble**) geri almak.
3. **Her kartı okumak:** Tekil alıcıları çıkarmak.
4. **Protokol kurallarını uygulamak:** Girdileri typecode aralıklarına göre yok saymak veya reddetmek.

---

## Neden "yalnızca Bech32m'yi çözmek" yeterli değildir

Bir UA, Bech32m metin kodlaması kullanır, ancak yalnızca Bech32m'yi çözmek kullanılabilir alıcıları ortaya çıkarmaz.

ZIP-316, kodlamadan önce yükü **F4Jumble** kullanarak kasıtlı olarak karıştırır. F4Jumble, adresteki tek bir karakterin bile değiştirilmesinin çözülmüş çıktıyı tamamen değiştirmesini sağlar. Bu, bir saldırganın adresin önek ve sonekini geçerli görünecek şekilde bırakarak ortasındaki baytları değiştirdiği adres değiştirilebilirliği saldırılarını önler.

> **Temel kural:** Değiştirilebilirlik koruması yalnızca uygulamanız tam çözümleme ve doğrulama işlem hattını çalıştırırsa işler. Kısmi çözümleme, tüm riski korurken güvenliği ortadan kaldırır.

---

## Adım adım çözümleme işlem hattı

### Adım 1: Bech32m'yi çözün ve ağı kontrol edin
- **İnsan tarafından okunabilir bölüm (HRP):** `u` ana ağı; `utest` test ağını belirtir. *(Ana ağ UA'ları, `1` Bech32 ayırıcısı olmak üzere `u1` ile başlar.)*
- **Uzunluk sınırı:** Standart Bech32m, 90 karakterlik bir sınır uygular. UA'lar genellikle bu sınırı aşar; bu nedenle çözücüde standart uzunluk kontrolleri devre dışı bırakılmalıdır.
- 5 bitlik Bech32m sözcüklerini yeniden standart 8 bitlik baytlara dönüştürün.

### Adım 2: F4Jumble'ı tersine çevirin
F4Jumble, BLAKE2b üzerine kurulu 4 turlu bir Feistel ağıdır:
- **Sol yarının uzunluğu:** `min(64, floor(length / 2))` bayt. 64 baytlık üst sınır, BLAKE2b'nin azami çıktı boyutuna karşılık gelir. Sağ yarı, kalan yükü içerir.
- **Karma işlevleri:** Sabit kişiselleştirme etiketlerini (`UA_F4Jumble_G` ve `UA_F4Jumble_H`) kullanarak G ile H arasında dönüşümlü çalışır.
- **Tur sıralaması:** İleri kodlama G(0) → H(0) → G(1) → H(1) şeklinde çalışır. Tersine çevirme (karıştırmayı geri alma) ise H(1) → G(1) → H(0) → G(0) şeklinde çalışır.
- **Aralık kontrolü:** ZIP-316 yük boyutu sınırlarının dışındaki girdileri reddedin.

### Adım 3: Dolguyu kaldırın ve HRP'yi doğrulayın
Karıştırmadan önce kodlayıcı, HRP'yi içeren ve sıfırlarla doldurulmuş 16 bayt ekler.
- Karıştırmayı geri aldıktan sonra son 16 baytı kaldırın.
- Gömülü HRP'nin beklenen ağla (`u` veya `utest`) eşleştiğini doğrulayın. Bu, test ağı adreslerinin yanlışlıkla ana ağda kabul edilmesini önler.

### Adım 4: Alıcıları çıkarın
Kalan yük, typecode ve uzunluğun kompakt boyutlu tamsayılar olarak saklandığı `(typecode, length, content)` girdilerinden oluşur (küçük değerler için tek bir bayt). Bilinen alıcı typecode'ları:

| Typecode | Alıcı türü       | İçerik uzunluğu |
| :------- | :------------------ | :------------- |
| `0x00`   | Transparent (P2PKH) | 20 bayt       |
| `0x01`   | Transparent (P2SH)  | 20 bayt       |
| `0x02`   | Sapling             | 43 bayt       |
| `0x03`   | Orchard             | 43 bayt       |

Bunların ötesinde, ZIP-316 ileriye dönük uyumluluk için iki ek aralık ayırır:

- **`0xC0`–`0xDF` (anlaşılması ZORUNLU OLMAYAN meta veriler):** tüketiciler bu aralıkta tanımadıkları meta veri öğelerini yok saymalıdır.
- **`0xE0` ve `0xE1` (atanmış, anlaşılması ZORUNLU sona erme meta verileri):** mevcut ZIP-316 kaydı, bunları adres sona erme yüksekliği ve zamanı için atar. Tüketiciler bu öğeleri anlamalı veya adresi reddetmelidir.
- **`0xE2`–`0xFC` (atanmamış, anlaşılması ZORUNLU meta veriler):** tüketiciler bu aralıkta tanınmayan bir öğeyle karşılaşırlarsa adresi reddetmelidir.

Bilinen alıcı türleri için kodlanmış uzunluğun türün belirtilen içerik uzunluğuyla eşleştiğini doğrulayın. Meta veri öğeleri için içerik uzunluğunu belirlemek üzere kodlanmış kompakt boyutlu uzunluğu kullanın. Kesilmiş girdileri veya sondaki baytları reddedin.

**Tercih edilen alıcı sırası.** Bir adres başarıyla ayrıştırıldıktan sonra, bir cüzdan veya ödeme aracı en iyi alıcıyı şu sırayla seçmelidir: Orchard, ardından Sapling, ardından transparent.

---

## Zorunlu ZIP-316 reddetme kuralları

**Başarıyla çözümlemek bir adresi geçerli kılmaz.** Resmî Zcash cüzdanları, aşağıdaki kuralları ihlal eden adresleri kesin olarak reddeder. Ödeme hatalarını önlemek için web araçları da bunları reddetmelidir:

- **Eksik korumalı alıcılar:** Adres **en az** bir Sapling veya Orchard alıcısı içermelidir. Yalnızca transparent alıcılar içeren bir UA, ZIP-316 kapsamında geçersizdir.
- **Yinelenen typecode'lar:** Her alıcı türü en fazla bir kez görünebilir.
- **Sıralanmamış typecode'lar:** Alıcılar, kesin olarak artan typecode sırasıyla görünmelidir.
- **Çakışan transparent alıcılar:** Bir UA P2PKH veya P2SH taşıyabilir, ancak **asla ikisini birden** taşıyamaz.
- **Hatalı biçimlendirilmiş girdiler veya dolgu:** Eşleşmeyen ağ önekleri, kesilmiş yükler veya uzunluk uyuşmazlıkları derhal reddedilmelidir.
- **Tanınmayan typecode'lar:** Tüketiciler, anlaşılması ZORUNLU meta veri aralığındaki (`0xE0`–`0xFC`) öğeler hariç tanınmayan öğeleri yok saymalıdır; bu öğeleri tanımadıklarında ise reddetmelidirler. Mevcut kayıtta `0xE0` ve `0xE1` atanmış sona erme türleridir, `0xE2`–`0xFC` ise atanmamıştır. Bundan bağımsız olarak, Sapling veya Orchard alıcısı gereksinimi de dâhil olmak üzere yukarıdaki zorunlu geçerlilik kurallarını karşılamayan her adresi reddedin.

---

## Geliştiriciler için en iyi uygulamalar

- **Ham dizgeleri değil, ayrıştırılmış alıcıları karşılaştırın.** Eşitliği kontrol etmeden önce adresleri çözün.
- **Fonları işleyen her şey için bakımı yapılan kütüphaneleri kullanın.** Özel JavaScript çözücüleri dağıtmak yerine, resmî Rust crate'lerini (örneğin `zcash_address`) WebAssembly'ye derleyin.
- **Elle yazılmış ayrıştırıcılara karşı dikkatli olun.** Öğrenmek için bir tane yazarsanız, bunu bir çalışma projesi olarak ele alın ve herhangi bir şey için güvenmeden önce aşağıdaki resmî vektörlerle test edin.

---

## Resmî belirtimler ve referans uygulamaları

- **[ZIP-316: Unified Addresses ve Viewing Keys](https://zips.z.cash/zip-0316)**
- **[zcash_address crate'i (librustzcash)](https://github.com/zcash/librustzcash/tree/main/components/zcash_address)**
- **[f4jumble crate'i (librustzcash)](https://github.com/zcash/librustzcash/tree/main/components/f4jumble)**
- **Resmî test vektörleri:**
  - [F4Jumble test vektörleri](https://github.com/zcash/librustzcash/blob/main/components/f4jumble/src/test_vectors.rs)
  - [Unified Address test vektörleri](https://github.com/zcash/librustzcash/blob/main/components/zcash_address/src/kind/unified/address/test_vectors.rs)

---

## Sözlük

| Terim | Anlamı |
| :----------------------- | :-------------------------------------------------------------------- |
| **Unified Address (UA)** | Birden fazla alıcı havuzunu bir araya getiren tek adres dizgesi. |
| **Receiver** | Belirli ödeme hedefi türü (transparent, Sapling veya Orchard). |
| **Bech32m** | UA dizgeleri için kullanılan metin kodlama şeması. |
| **HRP** | İnsan tarafından okunabilir bölüm veya ağ öneki (`u` veya `utest`). |
| **F4Jumble** | Adres bütünlüğünü sağlayan tersine çevrilebilir gizleme algoritması. |
| **Typecode** | Yükteki alıcı türünü tanımlayan her girdideki sayı. |
| **Malleability** | Adres baytlarının tespit edilmeden yetkisiz şekilde değiştirilmesi. |

Ayrıca bkz.: [Viewing Keys](./Viewing_Keys.md)
