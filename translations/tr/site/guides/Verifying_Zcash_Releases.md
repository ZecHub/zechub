<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Community/Verifying_Zcash_Releases.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Zcash Sürümlerini Doğrulama

## Özet

- Bir Zcash ikili dosyasını indirmek, projenin yayımladığı dosyayı edinmekle aynı şey değildir. Aradaki farkı anlamanızı sağlayan şey doğrulamadır.
- Bir sağlama toplamı dosyanın bozulmadan ulaştığını kanıtlar. Bir **imza** ise onu kimin ürettiğini kanıtlar. İkisine de ihtiyacınız vardır ve tek başına bir sağlama toplamı çok az şeyi kanıtlar.
- Zebra, `SHA256SUMS` dosyasıyla birlikte sürümü belirli bir GitHub Actions iş akışına, etikete ve commit’e bağlayan bir **Sigstore** paketi yayımlar; anahtar yönetimi gerekmez.
- Zallet, SLSA provenance ve bir SBOM ile birlikte ayrık **GPG** imzaları (`.asc`) yayımlar.
- Zcash imzalama anahtarı 2026’da Electric Coin Company’den Zcash Open Development Lab’e (ZODL) geçti. Daha eski sürümleri doğruladıysanız yeni anahtara ihtiyacınız var; devir beyanı her iki anahtarla da imzalandığı için dönüşümün kendisini de doğrulayabilirsiniz.
- `gpg`, bir dosyayı imzalayan **alt anahtarı** raporlar; duyurularda adı geçen birincil anahtarı değil. Yanlış görünen bir parmak izi genellikle bir alt anahtardır, saldırı değil.
- Doğrulama başarısız olursa ikili dosyayı çalıştırmayın.

*Zebra `v6.3.0` ve Zallet `v0.1.0-beta.2` ile 2026-08-18 tarihinde doğrulanmıştır.*

## Bu neden Zcash için daha önemli

Kurcalanmış bir cüzdan ikili dosyası bir harcama anahtarını ya da bir viewing key’i sızdırabilir. Ele geçirilmiş bir parolanın aksine bu kayıp kalıcıdır: geri alma yoktur, chargeback yoktur ve destek masası yoktur. Shielded işlemler zincir *üzerinde* olanları korur; çalıştırdığınız yazılım size ulaşmadan önce değiştirilmişse hiçbir koruma sağlamazlar.

Bu, protokolün gizlilik garantilerinin basitçe alakasız olduğu az sayıdaki saldırı yolundan biridir. Bunu kapsayan katman doğrulamadır.

## Tehdit modeli: doğrulama neyi yakalar, neyi yakalayamaz

**Yakaladıkları:**

- Kurcalanmış bir yansının ya da projenin sürüm sayfası dışındaki bir yerden sunulan değiştirilmiş bir dosyanın varlığını.
- İndirme sırasında ortadaki adam saldırısıyla yapılan değişimi.
- Ele geçirilmiş bir CDN’i ya da kaçırılmış bir dağıtım sunucusunu.
- Aktarım sırasında oluşan kazara bozulmayı.

**Yakalayamadıkları:**

- Kötü amaçlı kodu imzalayan bir bakımcıyı. İmza doğru şekilde doğrulanır; niyeti değil, kaynağı kanıtlar.
- İmzalanmış ama kötü amaçlı bir artefakt üreten ele geçirilmiş bir derleme sunucusunu. Reproducible build’ler ve provenance attestations bunun kapsamını daraltmak için vardır.
- İkili dosyayla aynı ele geçirilmiş kaynaktan aldığınız bir anahtarı. Saldırgan hem dosyayı hem de karşılaştırdığınız anahtarı kontrol ediyorsa doğrulama size hiçbir şey söylemez.

Rehberlerin çoğunun atladığı son nokta budur. **Anahtarı nereden aldığınız, komutu çalıştırmanız kadar önemlidir.**

---

## Bölüm 1 — Zebra: sağlama toplamları ve Sigstore

Zebra her sürüm için şu varlıkları yayımlar:

| Varlık | Amaç |
|---|---|
| `zebrad-<version>-<arch>.tar.gz` | ikili arşiv |
| `zebrad-<version>-<arch>.tar.gz.sha256` | dosya bazında sağlama toplamı |
| `SHA256SUMS` | tüm mimariler için sağlama toplamları |
| `SHA256SUMS.sigstore.json` | `SHA256SUMS` dosyasını imzalayan Sigstore paketi |

### Adım 1 — İndirme

```bash
BASE=https://github.com/ZcashFoundation/zebra/releases/download/v6.3.0
curl -sLO $BASE/zebrad-6.3.0-x86_64-unknown-linux-gnu.tar.gz
curl -sLO $BASE/SHA256SUMS
curl -sLO $BASE/SHA256SUMS.sigstore.json
```

### Adım 2 — Sağlama toplamını kontrol edin

```bash
sha256sum -c --ignore-missing SHA256SUMS
```

Gerçek çıktı:

```
zebrad-6.3.0-x86_64-unknown-linux-gnu.tar.gz: OK
```

Burada `--ignore-missing` gereklidir çünkü `SHA256SUMS` her mimariyi kapsar ve siz yalnızca birini indirdiniz. Bu olmadan `sha256sum`, eksik aarch64 arşivini hata olarak raporlar ve siz de başarılı bir sonucu başarısızlık diye okuyabilirsiniz.

Dosya başına olan varyant da çalışır:

```bash
sha256sum -c zebrad-6.3.0-x86_64-unknown-linux-gnu.tar.gz.sha256
```

```
zebrad-6.3.0-x86_64-unknown-linux-gnu.tar.gz: OK
```

**Bu adım tek başına yeterli değildir.** Sağlama toplamını da ikili dosyayla aynı yerden indirdiniz. Birini değiştirebilen biri diğerini de değiştirebilir. Sağlama toplamı bütünlüğü kanıtlar; sonraki adım ise kaynağı kanıtlar.

### Adım 2b — Aynı kontrolün Windows’taki karşılığı

PowerShell’de `-c` doğrulama modu yoktur, bu yüzden karşılaştırmayı elle yaparsınız:

```powershell
Get-FileHash .\zebrad-6.3.0-x86_64-unknown-linux-gnu.tar.gz -Algorithm SHA256 | Format-List
```

Gerçek çıktı:

```
Algorithm : SHA256
Hash      : 86326F5324F4E59CC2008C15F94407CC8D5FEACF75D64942164BB5F08ECA8C5E
Path      : \\wsl$\Ubuntu\home\briefking\verify\zebrad-6.3.0-x86_64-unknown-linux-gnu.tar.gz
```

Bunu bu sayfanın önceki kısmındaki Linux sonucuyla karşılaştırın:

```
86326f5324f4e59cc2008c15f94407cc8d5feacf75d64942164bb5f08eca8c5e
86326F5324F4E59CC2008C15F94407CC8D5FEACF75D64942164BB5F08ECA8C5E
```

**Değerler aynıdır.** Hex büyük/küçük harfe duyarlı değildir ve Windows’ta en sık görülen yanlış alarm budur.

Windows’a özgü iki tuzak daha:

- **Kontrol edilecek bir çıkış kodu yoktur.** Linux’ta `sha256sum -c` başarısız olduğunda 1 döner ve bir betik buna göre hareket edebilir. `Get-FileHash` ise yalnızca bir hash yazdırır; karşılaştırmayı yapmak sizin işinizdir ve göz ucuyla bakıp hata yapma riski size aittir.
- **64 hex karakterini gözle okumak güvenilir değildir.** Bunu kabuğa yaptırın:

```powershell
$expected = "86326f5324f4e59cc2008c15f94407cc8d5feacf75d64942164bb5f08eca8c5e"
$actual = (Get-FileHash .\zebrad-6.3.0-x86_64-unknown-linux-gnu.tar.gz -Algorithm SHA256).Hash.ToLower()
if ($actual -eq $expected) { "OK" } else { "MISMATCH" }
```

> **macOS’te:** iş akışı aynıdır, ancak BSD kullanıcı alanı `sha256sum` yerine `shasum` ile gelir; `shasum -a 256 -c --ignore-missing SHA256SUMS` kullanın. Bu sayfanın yazarı erişilebilir bir macOS makinesine sahip olmadığından bu komut çalıştırılarak değil, Apple’ın araçları temel alınarak belgelenmiştir. macOS’te doğrulama yaparsanız bunu onaylayan ya da düzelten bir PR açın lütfen.

### Adım 3 — Sigstore paketini doğrulayın

Sigstore, uzun ömürlü imzalama anahtarlarını genel bir şeffaflık günlüğüne kaydedilen, bir CI kimliğine bağlı kısa ömürlü sertifikalarla değiştirir. Çalınabilecek bir sürüm anahtarını kimse elinde tutmaz.

En doğrudan yol `cosign` kullanmaktır:

```bash
cosign verify-blob \
  --bundle SHA256SUMS.sigstore.json \
  --certificate-identity-regexp '^https://github\.com/ZcashFoundation/zebra/' \
  --certificate-oidc-issuer https://token.actions.githubusercontent.com \
  SHA256SUMS
```

İki `--certificate-*` bayrağı meselenin özüdür. **Bunlar olmadan yalnızca bir yerlerde birilerinin dosyayı imzaladığını doğrulamış olursunuz.** Bunlarla birlikte, dosyanın Zebra deposundaki bir iş akışı tarafından, GitHub’ın OIDC sağlayıcısı üzerinden kimliği doğrulanmış şekilde imzalandığını doğrulamış olursunuz.

> ⚠️ **Sürüm önemlidir.** Daha eski cosign derlemeleri mevcut Sigstore paket biçimini okuyamaz. Yukarıdaki komutu cosign `v2.4.1` ile çalıştırmak şunu üretir:
>
> ```
> Error: bundle does not contain cert for verification, please provide public key
> ```
>
> Paket *gerçekten* bir sertifika içerir; bu sertifika, eski sürümlerin bakmadığı `verificationMaterial.certificate.rawBytes` altında bulunur. Bu, bozuk bir sürüm değil istemci sınırlamasıdır. Bununla karşılaşırsanız indirmenin kötü olduğunu düşünmek yerine cosign’ı güncelleyin. Dağıtım paketlerindeki cosign sürümleri genellikle upstream’in epey gerisindedir.

Sonraki iki adım, aynı paketin elle nasıl doğrulanacağını gösterir. Bu yolu anlamak her durumda faydalıdır ve cosign derlemeniz işbirliği yapmadığında uygulanabilir bir geri dönüş yoludur.

### Adım 4 — Sertifikanın gerçekte ne iddia ettiğini okuyun

Neye güvendiğinizi anlamak için paketi `cosign` olmadan inceleyebilirsiniz. Sertifikayı çıkarın:

```bash
python3 -c "
import json,base64
d=json.load(open('SHA256SUMS.sigstore.json'))
open('cert.der','wb').write(base64.b64decode(d['verificationMaterial']['certificate']['rawBytes']))"

openssl x509 -in cert.der -inform DER -noout -issuer -ext subjectAltName
```

Zebra v6.3.0 için gerçek çıktı:

```
issuer=O = sigstore.dev, CN = sigstore-intermediate
X509v3 Subject Alternative Name: critical
    URI:https://github.com/ZcashFoundation/zebra/.github/workflows/zfnd-release-binaries.yml@refs/tags/v6.3.0
```

Subject Alternative Name kimliğin kendisidir. Depoyu, tam iş akışı dosyasını ve etiketi adlandırır. Sigstore ayrıca özel uzantılara daha fazla derleme meta verisi gömer:

| Alan | v6.3.0 için değer |
|---|---|
| OIDC sağlayıcısı | `https://token.actions.githubusercontent.com` |
| Kaynak deposu | `https://github.com/ZcashFoundation/zebra` |
| Derleme commit’i | `f5c5277fe41eba9c74f37098738f93f35dd70d60` |
| Ref | `refs/tags/v6.3.0` |
| Çalıştırıcı ortamı | `github-hosted` |
| İş akışı çalıştırması | `.../actions/runs/31424510487/attempts/1` |
| Depo görünürlüğü | `public` |

Bunların her biri kontrol edilebilir. Commit hash’i depodaki etiketle eşleşmelidir; iş akışı çalıştırması mevcut olmalı ve herkese açık olmalıdır.

### Adım 5 — İmzayı kriptografik olarak doğrulayın

İmzayı OpenSSL ile doğrudan doğrulayabilirsiniz:

```bash
python3 -c "
import json,base64
d=json.load(open('SHA256SUMS.sigstore.json'))
open('sig.bin','wb').write(base64.b64decode(d['messageSignature']['signature']))"

openssl x509 -in cert.der -inform DER -pubkey -noout > pub.pem
openssl dgst -sha256 -verify pub.pem -signature sig.bin SHA256SUMS
```

Gerçek çıktı:

```
Verified OK
```

Paket ayrıca imzaladığı özeti de kaydeder. Bunun yerel dosyanızla eşleştiğini doğrulayın:

```
bundle digest : 3eb5de0634f637e793d0411b6c7108802a36e1219f9151803ecc6108fd0f59f6
local  digest : 3eb5de0634f637e793d0411b6c7108802a36e1219f9151803ecc6108fd0f59f6
```

### Adım 6 — Şeffaflık günlüğü girdisi

Paket, imzanın herkese açık, yalnızca ekleme yapılan bir günlüğe yayımlandığını kanıtlayan bir Rekor girdisi taşır:

| Alan | Değer |
|---|---|
| Rekor günlük indeksi | `2412071838` |
| Girdi türü | `hashedrekord v0.0.1` |
| Günlüğe eklenme zamanı | 2026-08-10 19:43:09 UTC |

Sessiz anahtar kötüye kullanımını tespit edilebilir kılan şey budur. Günlükte hiç görünmeyen ya da makul olmayan bir zamanda görünen bir imza, dikkate alınması gereken bir sinyaldir. Günlüğe eklenme zamanını sürüm duyurusuyla karşılaştırın.

> **OpenSSL yolu hakkında not:** bu yol imzayı sertifikanın açık anahtarına karşı doğrular, ancak tek başına sertifika zincirini Sigstore köküne kadar doğrulamaz ya da günlük girdisinin dahil edilme kanıtını kontrol etmez. `cosign verify-blob` üçünü de yapar. Mekanizmayı anlamak için OpenSSL kullanın; gerçek kontrolünüz için `cosign` kullanın.

---

## Bölüm 2 — Zallet: GPG imzaları

Zallet farklı bir varlık seti yayımlar:

| Varlık | Amaç |
|---|---|
| `zallet-<version>-<platform>.tar.gz` | ikili arşiv |
| `.tar.gz.asc` | ayrık GPG imzası |
| `.tar.gz.intoto.jsonl` | SLSA provenance attestation |
| `.tar.gz.provenance.json` | provenance meta verisi |
| `.tar.gz.sbom.spdx` | yazılım malzeme listesi |

### Adım 1 — Anahtarı aramaya başlamadan önce imzalama anahtarını belirleyin

Önce, hiçbir anahtar içe aktarılmadan doğrulamayı çalıştırın:

```bash
gpg --verify zallet-v0.1.0-beta.2-linux-amd64.tar.gz.asc \
             zallet-v0.1.0-beta.2-linux-amd64.tar.gz
```

Gerçek çıktı:

```
gpg: Signature made Tue Jul 28 19:18:44 2026 WAT
gpg:                using RSA key 1FE99324758F296718B457067F4BBBBA23F0617F
gpg:                issuer "sysadmin@zodl.com"
gpg: Can't check signature: No public key
```

Bu bir başarısızlık değildir. İmzanın var olduğunu gösterir ve aramaya başlamadan **önce** tam olarak hangi anahtara ihtiyacınız olduğunu söyler. Parmak izini ve issuer’ı not edin, ardından anahtarı indirme işleminden bağımsız bir kaynaktan alın.

> `gpg` zaman damgalarını yerel saat diliminizde yazdırır. Yukarıdaki çıktı `WAT` (UTC+1) gösteriyor; aynı imza başka bir yerde `18:18:44 UTC` olarak okunur. Aynı an. Saat dilimi farkını uyumsuzluk sanmayın.

### Adım 2 — Anahtarı içe aktarın ve doğrulayın

```bash
curl -sL https://apt.z.cash/zodl.asc -o zodl.asc
gpg --import zodl.asc
gpg --verify zallet-v0.1.0-beta.2-linux-amd64.tar.gz.asc \
             zallet-v0.1.0-beta.2-linux-amd64.tar.gz
```

Gerçek çıktı:

```
gpg: Signature made Tue Jul 28 19:18:44 2026 WAT
gpg:                using RSA key 1FE99324758F296718B457067F4BBBBA23F0617F
gpg:                issuer "sysadmin@zodl.com"
gpg: Good signature from "Zcash Open Development Lab (ZODL) (Dallas, Texas) <sysadmin@zodl.com>" [unknown]
gpg: WARNING: The key's User ID is not certified with a trusted signature!
gpg:          There is no indication that the signature belongs to the owner.
Primary key fingerprint: 0338 34DD 49DE CF9D BB99  34BC 6C93 CA8E 58E2 6AB1
     Subkey fingerprint: 1FE9 9324 758F 2967 18B4  5706 7F4B BBBA 23F0 617F
```

İstediğiniz şey `Good signature` ifadesidir. Bu çıktıda insanları şaşırtan iki şey vardır ve ikisi de normaldir.

### Parmak izi neden duyurudakilerle eşleşmiyor gibi görünüyor

ZODL anahtar geçiş beyanında `0338 34DD 49DE CF9D BB99 34BC 6C93 CA8E 58E2 6AB1` parmak izi yer alır. Ama `gpg --verify` `1FE9 9324 …  23F0 617F` raporladı. Bu bir uyumsuzluk gibi görünür ama değildir.

`gpg`, imzayı oluşturan **alt anahtarı** raporlar. Duyuru ise **birincil anahtarı** adlandırır. İlişkiyi kendiniz doğrulayın:

```bash
gpg --list-keys --with-subkey-fingerprints sysadmin@zodl.com
```

Gerçek çıktı:

```
pub   rsa4096 2026-03-23 [SCEA]
      033834DD49DECF9DBB9934BC6C93CA8E58E26AB1
uid           [ unknown] Zcash Open Development Lab (ZODL) (Dallas, Texas) <sysadmin@zodl.com>
sub   rsa4096 2026-03-23 [SEA]
      1FE99324758F296718B457067F4BBBBA23F0617F
```

`sub` satırı imzalama alt anahtarıdır; `pub` satırı ise birincil anahtardır. Tek kimlik, tek anahtar paketi. Bu yüzden doğrulama çıktısı **her iki** parmak izini de yazdırır: yayımlanmış herhangi bir duyuruyla *birincil* anahtarı karşılaştırın ve alt anahtar satırını anahtarın hangi parçasının işi yaptığını söyleyen bilgi olarak görün.

Anahtarları bu şekilde bölmek bilerek yapılır: bir imzalama alt anahtarı, birincil kimlik ve onun birikmiş güveni çöpe atılmadan döndürülebilir veya iptal edilebilir.

### `[unknown]` uyarısı ne anlama gelir

```
gpg: WARNING: The key's User ID is not certified with a trusted signature!
```

Bu, imzayla ilgili bir sorun **değildir**. İmza kriptografik olarak geçerlidir; `Good signature` ifadesi bunu söyler. Uyarının söylediği şey farklıdır: yerel GnuPG’nize bu anahtarın iddia ettiği kişiye ait olduğuna inandığınızı henüz söylemediniz.

GnuPG iki soruyu birbirinden ayırır:

1. **Bu dosyayı bu anahtar mı imzaladı?** — `Good signature` buna cevap verir. Kriptografiktir, insan yargısı yoktur.
2. **Bu anahtar gerçekten ZODL’ye mi ait?** — buna kriptografi hiç cevap vermez. Bunu parmak izini bağımsız bir kaynakla kontrol ederek belirlersiniz.

Anahtarı yerel olarak açıkça imzalamadığınız sürece bu uyarıyı neredeyse her doğrulamada görürsünüz. Bunu başarısızlık olarak görmeyin. `Good signature` ifadesinin olmamasını ise başarısızlık olarak görün.

### Adım 3 — Anahtar geçişinin kendisini doğrulayın

Zcash sürüm imzalama işi, ZODL’nin Ocak 2026’da eski ECC mühendislik ve ürün ekibi tarafından kurulmasının ardından, 2026’da Electric Coin Company’den Zcash Open Development Lab’e geçti.

| | Eski anahtar | Yeni anahtar |
|---|---|---|
| Parmak izi | `B1C9 095E AA18 48DB B54D 9DDA 1D05 FDC6 6B37 2CFE` | `0338 34DD 49DE CF9D BB99 34BC 6C93 CA8E 58E2 6AB1` |
| UID | Zcash Master Signing Key (ECC) `<sysadmin@z.cash>` | Zcash Open Development Lab (ZODL) `<sysadmin@zodl.com>` |
| Tür | RSA 3072-bit, oluşturulma 2023-06-19 | RSA 4096-bit, oluşturulma 2026-03-23, sona erme 2028-03-22 |
| Yayımlandığı yer | `https://apt.z.cash/zcash.asc` | `https://apt.z.cash/zodl.asc` |

Yayımlanmış zaman çizelgesi: yeni anahtar 2026-03-23’te oluşturuldu, 2026-03-27’de duyuruldu, 2026-04-23’ten itibaren tek başına imzalamaya başladı, eski ECC anahtarının iptali 2026-06-23 için planlandı.

Bir web sitesindeki anahtar dönüşüm duyurusu, web sitesinin kendisi kadar güvenilirdir. Doğru mekanizma, **her iki anahtarla da clear-signed yapılmış** bir beyandır; böylece eski anahtar yeni anahtara kefil olur. ZODL tam olarak bunu yayımlar:

```bash
curl -sL https://zodl.com/security/key-transition.txt.asc -o key-transition.txt.asc
curl -sL https://apt.z.cash/zcash.asc -o zcash.asc
gpg --import zcash.asc
gpg --verify key-transition.txt.asc
```

Gerçek çıktı (kısaltılmıştır — tek belgede iki imza):

```
gpg: Signature made Fri Mar 27 01:11:14 2026 WAT
gpg:                using RSA key B1C9095EAA1848DBB54D9DDA1D05FDC66B372CFE
gpg:                issuer "sysadmin@z.cash"
gpg: Good signature from "Zcash Master Signing Key (Electric Coin Company) <sysadmin@z.cash>" [unknown]
Primary key fingerprint: B1C9 095E AA18 48DB B54D  9DDA 1D05 FDC6 6B37 2CFE

gpg: Signature made Fri Mar 27 01:11:14 2026 WAT
gpg:                using RSA key 1FE99324758F296718B457067F4BBBBA23F0617F
gpg:                issuer "sysadmin@zodl.com"
gpg: Good signature from "Zcash Open Development Lab (ZODL) (Dallas, Texas) <sysadmin@zodl.com>" [unknown]
Primary key fingerprint: 0338 34DD 49DE CF9D BB99  34BC 6C93 CA8E 58E2 6AB1
     Subkey fingerprint: 1FE9 9324 758F 2967 18B4  5706 7F4B BBBA 23F0 617F
```

Tek belgede, eski anahtardan ve yeni anahtardan gelen iki `Good signature` sonucu. Daha önceki sürümler için ECC anahtarına güveniyorsanız bu güven artık `zodl.com`, `apt.z.cash` ya da bir forum gönderisine güvenmenizi gerektirmeden ZODL anahtarına taşınır. Bir proje anahtar döndürdüğünde aramanız gereken özellik budur; bunun yokluğu da sorulmaya değerdir.

### Anahtarı nereden almalı, nereden almamalı

En iyiden en kötüye sıralama:

1. **Yukarıdaki gibi önceki anahtarla imzalanmış bir beyan.** Dönüşüm sonrasındaki en güçlü seçenektir.
2. **İndirmeden bağımsız bir kaynak.** İkili dosya GitHub’dan geldi; anahtar `apt.z.cash` üzerinden geldi. Saldırganın her ikisini de ele geçirmesi gerekir.
3. **Yayımlanmış bir parmak iziyle çapraz kontrol edilen bir keyserver.** Çoğu keyserver’a herkes herhangi bir kimlik iddiasıyla anahtar yükleyebilir. Bunu güvenli yapan şey parmak izi karşılaştırmasıdır, keyserver’ın kendisi değil.
4. **İkili dosyayla aynı sayfa.** Neredeyse hiç güvence sağlamaz. Birini değiştirebilen diğeri de değiştirebilir.

Her zaman **tam** parmak izini **birincil** anahtarla karşılaştırın. Kısa anahtar kimlikleri çakıştırılması çok kolaydır ve gerçek saldırılarda kullanılmıştır.

## Bölüm 3 — Başarısız olan bir doğrulama

Doğrulama ancak başarısızlığın nasıl göründüğünü biliyorsanız faydalıdır. Aşağıdaki gerçek örnek, geçerli bir arşive tek bir null baytı eklenerek üretildi:

```bash
cp zebrad-6.3.0-x86_64-unknown-linux-gnu.tar.gz tampered.tar.gz
printf '\x00' >> tampered.tar.gz
sha256sum -c tampered.sha256
```

Gerçek çıktı:

```
tampered.tar.gz: FAILED
sha256sum: WARNING: 1 computed checksum did NOT match
```

Çıkış kodu: `1`.

İki özeti yan yana koyun:

```bash
sha256sum zebrad-6.3.0-x86_64-unknown-linux-gnu.tar.gz tampered.tar.gz
```

```
86326f5324f4e59cc2008c15f94407cc8d5feacf75d64942164bb5f08eca8c5e  zebrad-6.3.0-x86_64-unknown-linux-gnu.tar.gz
8d4e2e22adcb014e006fafc71a974f987ba11297587f593cf89eb9bb1feff0b5  tampered.tar.gz
```

66,992,676 baytlık bir dosyaya eklenmiş tek bayt. İki hash hiçbir şey paylaşmaz; ne ortak bir önek vardır ne bir desen. Kısmi eşleşme ya da “yeterince yakın” diye bir şey yoktur: bir sağlama toplamı ya tam eşleşir ya da dosya istediğiniz dosya değildir.

### Böyle bir durumda ne yapmalı

1. **İkili dosyayı çalıştırmayın.** Çıkarmayın, `chmod +x` yapmayın.
2. **Resmî sürüm sayfasından tekrar deneyin.** Başarısızlıkların çoğu yarım kalmış indirmelerdir.
3. **İkinci kez de başarısız olursa ağ yolunu değiştirin.** Farklı bağlantı ya da bir VPN deneyin. Ağlar arasında sizi takip eden bir başarısızlık, etmeyenden farklıdır.
4. **Doğru sürüm için doğru sağlama toplamı dosyasına sahip olduğunuzu doğrulayın.** v6.3.0 dosyasını v6.2.3 toplamlarıyla karşılaştırmak doğru şekilde başarısız olur.
5. **Hâlâ başarısız oluyorsa bildirin.** Projenin deposunda bir issue açın ya da kasıtlı bir durumdan şüpheleniyorsanız `SECURITY.md` içindeki güvenlik iletişim kanalını kullanın. Açıklama kanalları için [Zcash Ekosistem Güvenliği](/zcash-community/zcash-ecosystem-security) sayfasına bakın.
6. **Artefaktı saklayın.** Kurcalanmış bir ikili dosya kanıttır. Bildirmeden önce silmeyin.

Bir imza başarısızlığı, sağlama toplamı başarısızlığından daha ciddidir. Sağlama toplamı uyumsuzluğu genellikle bozulmadır; dosya geçerli olup imza kötüyse bu kazayla olan bir şey değildir.

---

## Bölüm 4 — Referans tablosu

| Proje | Sürümlerin yayımlandığı yer | Yöntem | Anahtarın geldiği yer |
|---|---|---|---|
| **Zebra** | `github.com/ZcashFoundation/zebra/releases` | `SHA256SUMS` + Sigstore paketi | Anahtar yok; GitHub OIDC üzerinden CI kimliği |
| **Zallet** | `github.com/zcash/zallet/releases` | Ayrık GPG `.asc`, SLSA provenance, SBOM | `apt.z.cash/zodl.asc` — birincil `0338 34DD…58E2 6AB1`, imzalama alt anahtarı `1FE9 9324…23F0 617F` |
| **zcashd** | *emekliye ayrıldı* | — | 2026-07-18 tarihinde 3,417,100. blokta durdu. Kurmayın. |
| **Zodl** (eski adıyla Zashi) | App Store / Google Play; GitHub’da `zodl-inc` | Mağaza imzası; bağımsız Android ikili dosyaları GPG ile imzalı | Geçiş beyanına göre ZODL anahtarı |

> **Adlandırma notu:** Zashi, 2026’da önce App Store’da sonra Google Play’de **Zodl** olarak yeniden markalandı. “Zashi” diyen eski rehberler aynı cüzdan soyunu anlatır.

---

## Bölüm 5 — Mobil ve donanım cüzdanları

Doğrudan indirmeleri bıraktığınızda doğrulama farklı işler.

**Uygulama mağazaları.** İmzayı kendiniz kontrol edemezsiniz. Paketi mağaza imzalar ve siz mağazanın incelemesine ve geliştirici hesabının bütünlüğüne güvenirsiniz. Doğrulayabileceğiniz şey, doğru uygulamaya sahip olduğunuzdur: yayıncı adını ve paket kimliğini arama sonuçlarına göre değil, projenin resmî sitesine göre doğrulayın. Taklit uygulamalar yaygındır ve bir mağaza listesi özgünlük kanıtı değildir.

**Bağımsız Android APK’ları.** Bunlar doğrulanabilir. ZODL, GitHub Releases üzerinden GPG ile imzalanmış bağımsız Android ikili dosyaları yayımlar; dolayısıyla Bölüm 2’deki iş akışı uygulanır. Denetlenebilir bir zincir istiyorsanız bu yolu tercih edin.

**Donanım cüzdanları.** Cihaz kendi firmware’ini tasdik eder; dolayısıyla güven çıpası makinenizdeki bir dosya değil, donanımın kendisidir. Cihaz doğrulama akışı için [Keystone Zashi](/guides/keystone-zashi) sayfasına bakın. Doğrudan üreticiden satın alın; tedarik zinciri kurcalamaları fabrika ile alıcı arasında gerçekleşir.

---

## İleri okuma

- [Zcash Ekosistem Güvenliği](/zcash-community/zcash-ecosystem-security) — açıklama politikası ve güvenlik iletişim kanalları
- [Zebra Tam Düğümü](/zcash-tech/zebra-full-node) — doğruladıktan sonra Zebra kurulumu
- [Zallet Hızlı Başvuru Rehberi](/using-zcash/zallet-quick-reference-guide) — Zallet kullanımı
- [Sigstore belgeleri](https://docs.sigstore.dev/)
- [SLSA provenance seviyeleri](https://slsa.dev/)

---

*Bu sayfadaki komutlar Zebra `v6.3.0` ve Zallet `v0.1.0-beta.2` ile 2026-08-18 tarihinde çalıştırıldı. Sürüm araçları değişebilir: çıktı burada gösterilenden farklıysa kendi çalıştırdığınız sonuca güvenin ve lütfen bir PR açın.*
