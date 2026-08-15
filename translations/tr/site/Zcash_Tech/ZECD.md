---
<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/ZECD.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# ZECD — Shielded-First Cüzdan Sunucusu

> 🇧🇷 [Portekizce Sürüm](/zechubglobal/zcashbrasil/zcashtech/zecd)

ZECD, [librustzcash](https://github.com/zcash/librustzcash) üzerine inşa edilmiş ve Bitcoin Core'un JSON-RPC lehçesi üzerinden sunulan, Zcash için shielded-first bir cüzdan sunucusudur. Geliştiricilere ve ödeme entegratörlerine, Zcash ile etkileşim kurmak için tanıdık, Bitcoin uyumlu bir API sunar — bunu yaparken de Orchard'ı (en özel havuz) varsayılan hale getirir. [zec.rocks](https://zec.rocks) tarafından geliştirilen ZECD, modern, bulut tabanlı dağıtımlarda `zcashd`'nin cüzdan işlevselliğinin yerini almak üzere tasarlanmıştır.

**Güncel sürüm:** 0.5.0-rc3 (13 Temmuz 2026) — Ironwood (NU6.3) desteğiyle. `cargo install zecd` ile kurun veya resmî Docker imajını kullanın.

---

## Kısaca

- ZECD bir **cüzdan daemon'udur (sunucu)** — tam düğüm değildir. Anahtarları, taramayı, proving'i ve RPC'yi yönetir; ancak Zcash P2P protokolünü konuşmaz.
- **Bitcoin Core'un JSON-RPC lehçesini** konuşur: aynı yöntem adları, alan yapıları, kimlik doğrulama ve hata kodları — birçok Bitcoin RPC istemcisi Zcash ile kutudan çıktığı gibi çalışır.
- **Orchard (shielded) adresleri varsayılandır**; transparent (t-address) ve Sapling desteği cüzdan başına açık şekilde etkinleştirilmelidir.
- Yerel JSON-RPC üzerinden **kendi barındırdığınız bir [Zebra](Zebra_Full_Node.md) tam düğümüne** bağlanır — lightwalletd gerekmez.
- **Tasarım gereği durumsuzdur**: tüm cüzdan yalnızca seed phrase'den kurtarılabilir; bu da veri dizinini gözden çıkarılabilir hale getirir.
- **zcashd için birebir yerine geçen bir çözüm değildir**: yalnızca Zcash RPC yöntemlerinin bir alt kümesini uygular ve gizlilik ile güvenlik için kasıtlı tasarım farkları içerir.
- Ücretler **ZIP-317**'yi izler (deterministik ücret hesaplaması); kullanıcı tarafından belirtilen ücretler reddedilir.
- Tanıdık Bitcoin RPC yüzeyi üzerinden **shielded memo'ları (ZIP-302)** destekler.

---

## ZECD Hangi Sorunu Çözüyor?

`zcashd`, Zcash'in özgün düğüm ve cüzdan birleşimiydi — 2016'da Bitcoin'in C++ kod tabanından çatallanmıştı. Zamanla bu durum sürtünme yarattı: kodun bakımı zor, cüzdan düğüme sıkı şekilde bağlı ve transparent adresler shielded olanlarla birlikte birinci sınıf seçenekler olarak sunuluyor.

ZECD, cüzdan sorumluluğunu konsensüsten ayırır. Uygulamalar ile bir Zebra tam düğümü arasında duran **özel bir cüzdan katmanıdır** ve şunları sağlar:

- librustzcash üzerine kurulu temiz, modern bir Rust uygulaması (Zodl ve Zingo'yu güçlendiren aynı kütüphane)
- Varsayılan olarak gizlilik odaklı tasarım (aksi yapılandırılmadıkça Orchard adresleri)
- Zcash'e özgü araçları öğrenme ihtiyacını ortadan kaldıran Bitcoin uyumlu RPC arayüzü
- Kapsayıcı ve bulut dağıtımlarına uygun, durumsuz ve seed'den geri kazanılabilir mimari

---

## Mimari

ZECD üç katmanlı bir modelde çalışır:

```
Your app / Bitcoin RPC client
        ↓  JSON-RPC
       ZECD
   (keys, scanning, proving, RPC)
        ↓  JSON-RPC (local only)
       Zebra
   (full node — consensus, mempool, chain data)
```

ZECD, Zebra ile **yalnızca yerel JSON-RPC üzerinden** iletişim kurar — eşten eşe ağ yok, üçüncü taraf indexer yok, lightwalletd yok. Zebra bağlantısı bilinçli olarak yalnızca yereldir: ZECD, küresel olarak yönlendirilebilir bir ana makineye kimlik bilgisi göndermeyi, açıkça bant dışı güvenli bir tünel (ör. WireGuard veya SSH) için yapılandırılmadıkça reddeder.

---

## Temel Özellikler

### Shielded-First, Varsayılan Olarak Orchard

ZECD, varsayılan adres türü olarak Orchard Unified Address kullanır. Sapling ve transparent (t-address) havuzları, cüzdan başına açık yapılandırma gerektirir. Bu tasarım, eski Zcash araçlarında yaygın bir gizlilik tuzağı olan kazara transparent gönderim riskini azaltır.

Gizlilik politikası, çağrı başına veya genel olarak `[spend] privacy_policy` içinde yapılandırılabilir:

| Politika | Davranış |
|--------|----------|
| `AllowRevealedRecipients` (varsayılan) | Transparent alıcılara gönderime izin verir; zincir üzerinde tutarı ve alıcıyı açığa çıkarır |
| `AllowRevealedAmounts` | Havuzlar arası gönderime (Sapling↔Orchard) izin verir ancak transparent alıcıları reddeder |
| `FullPrivacy` | Yalnızca tek havuz içinde tamamen shielded gönderimler; transparent alıcıları ve havuzlar arası gönderimi reddeder |
| `AllowFullyTransparent` | Ayrıca transparent UTXO'larla finanse edilen t→t gönderimlere izin verir |

### Bitcoin Core RPC Uyumluluğu

ZECD, Bitcoin Core'un JSON-RPC lehçesini şu alanlarda uyumlulukla uygular:

- Yöntem adları (ör. `getblockchaininfo`, `getbalance`, `getnewaddress`, `listtransactions`, `sendtoaddress`, `sendmany`)
- Yanıtlardaki alan adları ve türleri
- JSON-RPC 1.0 zarf yapısı
- Basic auth, `rpcauth` girdileri ve cookie dosyası kimlik doğrulaması
- Hata kodları ve HTTP durum eşlemesi (hata gövdesiyle HTTP 500, 401 semantiği)

Bu, mevcut birçok Bitcoin ödeme kütüphanesinin, borsa entegrasyonunun ve izleme aracının Zcash ile ZECD üzerinden çok az ya da hiç kod değişikliği olmadan etkileşime girebilmesi anlamına gelir.

Uyumluluk test paketi (140+ kontrol), canlı bir regtest daemon'una karşı her PR'da çalıştırılır ve ayrıca herkese açık testnet'te de doğrulanmıştır.

### Shielded Memo'lar (ZIP-302)

ZECD, Zcash'in shielded memo özelliğini tanıdık Bitcoin RPC yüzeyi üzerinden sunar — bu, standart Bitcoin araçlarında bulunmayan bir şeydir:

- `sendtoaddress`, ekstra sonda gelen bir parametre olarak isteğe bağlı hex memo kabul eder (512 bayta kadar; transparent alıcılar için reddedilir)
- `listtransactions` ve `gettransaction` içindeki işlem geçmişi girdileri, bir çıktı bunu taşıyorsa `memo` (hex) ve `memoStr` (çözümlenmiş metin) alanlarını içerir
- Shielded bir alıcıya sıfır tutarlı gönderimler, yalnızca memo kullanım senaryoları için desteklenir (`z_sendmany` içindeki "memo-only-send" deseni)

Bu, ZECD'yi ödemelerin yanında özel, zincir üstü mesajlaşma gerektiren uygulamalar için uygun hale getirir.

### Tasarım Gereği Durumsuz

ZECD, **yalnızca seed ile geri yüklemenin yeniden inşa edemeyeceği hiçbir zincir dışı durumu kalıcı olarak saklamaz**. Cüzdan veritabanı (`data.sqlite`), seed phrase'den tamamen türetilebilir — shielded fonlar koşulsuz olarak kurtarılır; transparent fonlar ise yapılandırılmış gap limit'e kadar kurtarılır.

Bir cüzdanı seed'den geri yüklemek için:

```sh
zecd init --restore --birthday <block-height>
```

Bu, veri dizinini **gözden çıkarılabilir** hale getirir: kalıcı hacmi olmayan, her başlangıçta seed'den yeniden oluşturulan bir container hiçbir kritik şeyi kaybetmez. Operatörler verdikleri adresleri takip etmekten sorumludur — ZECD adresleri ancak zincir üzerinde fon aldıktan sonra hatırlar.

Etiketler kasıtlı olarak yoktur. Etiketlerin zincir üzerinde bir kaynağı olmadığı ve seed'den yeniden oluşturulamayacağı için ZECD bunları basitçe desteklemez. Etiket yöntemlerini çağırmak `method-not-found` hatası (`-32601`) döndürür.

### lightwalletd Bağımlılığı Yok

ZECD, compact block'ları, ağaç durumunu ve mempool görünürlüğünü doğrudan Zebra'nın JSON-RPC'sinden türetir. Çalıştırılması veya bakımı gereken bir lightwalletd yoktur — bu da kendi barındırdığınız dağıtımlarda operasyonel karmaşıklığı azaltır.

### Bulut Tabanlı ve Kapsayıcılı Dağıtımlar

ZECD'nin durumsuz mimarisi Docker ve Kubernetes ortamları için tasarlanmıştır:

- Depoda tam Docker Compose yığını (`zebra → zecd`) mevcuttur
- `9233` portunda, yapılandırılabilir hazır olma prob'larıyla (`synced` veya `connected`) health endpoint
- Log toplama hatları için yapılandırılmış JSON günlükleme seçeneği
- ZIP-317 deterministik ücretler — ücret oracle'ı veya manuel ücret yapılandırması yok
- `bootstrap_from_keys` (varsayılan olarak açık): `keys.toml` yanında boş bir veri dizini, başlangıçta cüzdanı otomatik yeniden oluşturur — tek bir Secret mount edip boş bir PVC ile başlatarak dağıtım yapın

---

## Saklama Modelleri

ZECD, farklı dağıtım ve güvenlik gereksinimlerine uygun üç anahtar saklama modelini destekler:

### 1. Şifrelenmemiş (Varsayılan — Otomatik Kilit Açma)

`keys.toml` içindeki mnemonic seed, bir **age kimlik dosyasına** (`identity.txt`) sarılır. Varsayılan `auto_unlock = true` ile seed başlangıçta belleğe çözülür; böylece gönderimler gözetimsiz gerçekleşir ve `walletpassphrase` çağrısına gerek kalmaz.

Şunlar için en uygunudur: otomatik ödeme işlemcileri, borsa hot wallet'ları, geliştirici ortamları.

```sh
zecd init --datadir ./data --wallet default --account-name primary
```

> `identity.txt` dosyasını mainnet'te veri dizininin **dışında** saklayın — her iki dosyayı da okuyan herkes harcama yetkisine sahip olur.

### 2. Şifreli (Parola Korumalı)

Mnemonic, bir kimlik dosyası yerine bir parola ile (age scrypt) sarılır. Cüzdan kilitli başlar; `walletpassphrase "<pass>" <timeout>` onu verilen süre boyunca açar ve süre dolunca otomatik olarak yeniden kilitler — Bitcoin Core'un şifreli cüzdan davranışıyla eşleşir.

Şunlar için en uygunudur: gözetimsiz harcama yetkisi gerekmeyen hot wallet'lar; etkileşimli operatör iş akışları.

```sh
zecd init --datadir ./data --encrypt
# later: walletpassphrase "my-passphrase" 300
```

### 3. Watch-Only (UFVK — Harcama Anahtarı Yok)

Başka bir cüzdandan dışa aktarılan bir Unified Full Viewing Key (UFVK) ile başlatılır. Alabilir, tarayabilir ve bakiyeleri raporlayabilir — ancak işlemleri imzalayamaz. İmzalama cüzdanından ayrı izleme, faturalama veya denetim düğümleri için idealdir.

```sh
# On the signing wallet's host:
zecd export-ufvk

# On the watch-only host:
zecd init --datadir ./data-watch --ufvk "uview1..." --birthday <height>
```

---

## Yedekleme ve Kurtarma

Fonlar **yalnızca mnemonic ile** kurtarılabilir. Geri kalan her şey bir önbellektir.

| Öğe | Konum | Neyi korur | Yedeklensin mi? |
|----------|----------|-----------------|----------|
| **24 kelimelik mnemonic** | `zecd init` sırasında bir kez gösterilir | Fonlar — kayıp = kalıcı kayıp | **Evet — çevrimdışı (kâğıt/HSM)** |
| `keys.toml` | `<wallet dir>/keys.toml` | Şifrelenmiş seed + birthday + ağ | **Evet — bir Secret olarak** |
| `identity.txt` | `[keys] age_identity` | `keys.toml` dosyasını çözer (harcama yetkisi) | **Evet — `keys.toml`'dan ayrı olarak** |
| Birthday yüksekliği | `keys.toml` içinde | Geri yüklemeyi hızlı yapar (ilk tx'den önceki herhangi bir yükseklik) | Mnemonic ile birlikte kaydedin |
| `data.sqlite` | `<wallet dir>/data.sqlite` | Cüzdan önbelleği — geri yüklemede seed'den yeniden oluşturulur | Hayır — gözden çıkarılabilir |
| `blocks/` | `<wallet dir>/blocks/` | Compact block önbelleği | Hayır — asla taşımayın; büyük boyuta ulaşabilir |
| `.cookie` | `<datadir>/.cookie` | Geçici RPC cookie'si | Hayır — başlangıçta yeniden oluşturulur |

> **Veri dizini ana makineye yerel olmalıdır.** ZECD'nin tek örnek kilidi (`<datadir>/.lock`) işletim sistemi danışmalı kilididir — ana makineler arasında geçerli değildir. Bir veri dizinini makineler arasında asla okuma-yazma olarak paylaşmayın (NFS, Kubernetes `ReadWriteMany`) — iki ZECD örneği cüzdan veritabanını bozacaktır. Kubernetes'te `ReadWriteOnce` hacimleri kullanın.

---

## RPC Yöntem Güvenli Liste

Kimlik bilgisi sızıntısının felaket olacağı dağıtımlarda ZECD, RPC yüzeyini seçilen bir yöntem alt kümesiyle sınırlandırmayı destekler:

```toml
[rpc]
allowed_methods = ["getblockchaininfo", "getbalance", "getnewaddress", "listtransactions"]
```

Listede olmayan herhangi bir yöntem `-32601` (HTTP 404) döndürür — bu, mevcut olmayan bir yöntemden ayırt edilemez; böylece sıkı kilitlenmiş bir sunucu, neyi devre dışı bıraktığını açığa vurmaz. Yalnızca alım yapan bir faturalama sunucusu, tehlike alanını en aza indirmek için `sendtoaddress`, `sendmany` ve `stop` yöntemlerini kapatabilir.

---

## Bitcoin Core RPC'den Temel Farklar

Bitcoin veya zcashd araçlarından geçen geliştiriciler, şu kasıtlı ayrımlara dikkat etmelidir:

| Davranış | Bitcoin Core | ZECD |
|----------|-------------|------|
| Adres biçimi | `1...` / `bc1...` | `u1...` (Orchard Unified Address) — string-parsing yapan istemciler tarafından Bitcoin adresi olarak ayrıştırılamaz |
| Etiketler | Tam etiket deposu | Uygulanmadı — `setlabel`, `listlabels` vb. `-32601` döndürür |
| Ücretler | Kullanıcı ayarlayabilir; ücret piyasası | Yalnızca ZIP-317 deterministik; `settxfee`, `fee_rate`, `subtractfeefromamount` `-8` ile reddedilir |
| Memo'lar | Desteklenmez | `sendtoaddress` hex memo kabul eder; geçmişte `memo` + `memoStr` alanları vardır |
| Harcamak için onaylar | 1 | 3 (kendi change'i) / 10 (üçüncü taraf) — `trusted_confirmations` / `untrusted_confirmations` ile yapılandırılabilir |
| Reorg sırasında `listsinceblock` | Fork'a kadar geri gider | İmleç reorg ile ortadan kalkarsa `-5` (Block not found) döndürür — parametresiz çağrıyla yeniden baz alın |
| `sendmany` içinde yinelenen alıcılar | Hata | JSON ayrıştırıcısı, ZECD görmeden önce yinelenenleri daraltır (sonuncu kazanır) — aynı adresi iki kez listelemeyin |
| İlk senkronizasyon sırasında bakiye | Bloklar veya warm-up | Kısmi bakiye sunar — otomasyonu `GET /readyz` üzerinde kapılayın (tam senkronizasyon ve iyileştirme birikimi boşalana kadar 503 döndürür) |
| `getbalance` içinde `minconf 0` | 0-conf bakiye | 1 olarak sunulur — shielded bir note, kazılmadan asla harcanabilir değildir |

---

## Hızlı Başlangıç

**Ön koşullar:** Zebra, `rpc.listen_addr = 127.0.0.1:18234` (testnet) ile yerelde çalışıyor olmalı.

crates.io üzerinden kurulum (0.4.3+):

```sh
cargo install zecd
```

Veya kaynak koddan derleyin:

```sh
git clone https://github.com/zecrocks/zecd && cd zecd
cargo build --release
```

```sh
# 1. Initialize a testnet wallet (generates a 24-word mnemonic and an account)
zecd --datadir ./data --testnet init --wallet default --account-name primary

# 2. Start the daemon (syncs in background, serves JSON-RPC on port 18232)
zecd --datadir ./data --testnet \
    --rpcuser zec --rpcpassword secret --rpcbind 127.0.0.1 --rpcport 18232
```

**curl ile etkileşim kurun:**

```sh
curl -s --user zec:secret --data-binary \
  '{"jsonrpc":"1.0","id":"1","method":"getblockchaininfo","params":[]}' \
  -H 'content-type: text/plain;' http://127.0.0.1:18232/
```

**Python ile etkileşim kurun (bir Bitcoin RPC kütüphanesi kullanarak):**

```python
from bitcoinrpc.authproxy import AuthServiceProxy
rpc = AuthServiceProxy("http://zec:secret@127.0.0.1:18232")
print(rpc.getblockchaininfo())
addr = rpc.getnewaddress()          # returns a u1... Orchard Unified Address
print(rpc.getbalance())
print(rpc.listtransactions("*", 20))

# Send with a shielded memo
rpc.sendtoaddress(addr, 0.001, "", "", False, "48656c6c6f205a6563617368")  # hex memo
```

**Seed'den geri yükleme:**

```sh
zecd --datadir ./data init --restore --birthday 2500000
# paste your 24-word mnemonic when prompted
```

---

## Varsayılan Portlar

| Ağ | ZECD RPC | Zebra RPC (arka uç) | Health |
|---------|----------|---------------------|--------|
| Mainnet | 8232 | 8234 | 9233 |
| Testnet | 18232 | 18234 | 9233 |

---

## ZECD vs. zcashd vs. Zaino

| | zcashd | Zaino | ZECD |
|--|--------|-------|------|
| Rol | Tam düğüm + cüzdan | Indexer (lightwalletd'nin yerini alır) | Yalnızca cüzdan sunucusu |
| Dil | C++ | Rust | Rust |
| Durum | Kullanımdan kaldırılıyor | Aktif | Aktif (v0.5.0-rc3, Tem 2026) |
| Varsayılan havuz | Transparent | Uygulanamaz | Orchard (shielded) |
| RPC lehçesi | zcashd'ye özgü | gRPC (lightwalletd) | Bitcoin Core JSON-RPC |
| Tam düğüm gerektirir | Evet (kendisi) | Zebra veya zcashd | Zebra |
| Durumsuz kurtarma | Hayır | Uygulanamaz | Evet (yalnızca seed) |
| Shielded memo'lar | Evet (`z_sendmany`) | Uygulanamaz | Evet (Bitcoin RPC yüzeyi) |
| Watch-only (UFVK) | Evet | Evet | Evet |
| Bulut tabanlı | Hayır | Kısmen | Evet |
| Kurulum | Derleme/binary | Derleme | `cargo install zecd` |

---

## İlgili Sayfalar

- [Zebra Tam Düğüm](Zebra_Full_Node.md) — ZECD'nin bağlandığı tam düğüm
- [Zaino Indexer](Zaino.md) — alternatif indexer yaklaşımı (lightwalletd'nin yerini alır)
- [Zakura Düğümü](Zakura_Node.md) — başka bir tam düğüm uygulaması (Zebra'nın fork'u)
- [Viewing Keys](Viewing_Keys.md) — ZECD'nin hesap viewing key'lerini kullanarak zinciri nasıl taradığı
- [Cüzdanlar](/using-zcash/wallets) — cüzdan ekosistemine genel bakış

## Kaynaklar

- [ZECD GitHub (zecrocks/zecd)](https://github.com/zecrocks/zecd)
- [ZECD Operasyonlar Çalıştırma Kitabı](https://github.com/zecrocks/zecd/blob/main/docs/OPERATIONS.md)
- [zec.rocks](https://zec.rocks)
- [librustzcash — temel Zcash kriptografi kütüphanesi](https://github.com/zcash/librustzcash)
- [ZIP-317: Orantılı Transfer Ücreti Mekanizması](https://zips.z.cash/zip-0317)
- [ZIP-302: Shielded Memo'lar](https://zips.z.cash/zip-0302)
- [Zodl cüzdanı (librustzcash uyumlu)](https://github.com/zodl-inc/zodl-ios)
