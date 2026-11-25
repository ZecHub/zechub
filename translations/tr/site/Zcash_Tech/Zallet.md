<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Zallet.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Zallet

Zallet, Rust ile yazılmış tam düğüm Zcash cüzdanıdır. Eskiden `zcashd` içine gömülü olan cüzdanın yerini alır. `zcashd`, 18 Temmuz 2026'da 3417100 blok yüksekliğinde Desteğin Sona Ermesi nedeniyle durduktan sonra konsensüs ve cüzdan görevleri ayrıldı: **Zebra** veya **Zakura** Zincir'i doğrular, **Zallet** ise anahtarları tutar, note'ları tarar ve cüzdan JSON-RPC'sini sunar.

Zallet şu anda **beta** aşamasındadır. Henüz tamamen incelenmemiştir. Geriye dönük uyumsuz değişiklikler, cüzdanın silinip yeniden oluşturulmasını gerektirebilir. [The Zallet Book](https://zcash.github.io/zallet/) içindeki güvenlik uyarılarını okumadan, büyük miktarlarda ZEC için üretim ortamında saklama çözümü olarak kullanmayın.

---

## Kısaca

- Zallet bir **tam düğüm RPC cüzdanıdır**; mobil hafif cüzdan veya konsensüs düğümü değildir.
- `zcashd`'nin cüzdan kısmının yerini alır. Düğüm kısmı [Zebra](Zebra_Full_Node.md) veya [Zakura](Zakura_Node.md)'tir.
- **Rust** ile yazılmıştır, MIT / Apache-2.0 çift lisanslıdır ve [zcash/zallet](https://github.com/zcash/zallet) içinde bakımı yapılır.
- Yayımlanan en son sürüm: **v0.1.0-beta.4** (2 Kasım 2026). [NU7](NU7.md) sürümünü takip eder ve `zebrad` **7.0.0 veya üzerini** gerektirir.
- Zincir verilerini tek bir arka uç olan **zebra** üzerinden okur: `ReadStateService`, aynı ana bilgisayardaki bir `zebrad`'nin durum dizinini kullanır; ayrıca Zebra'ün JSON-RPC'sinden yararlanır. Zaino arka ucu v0.1.0-beta.4 sürümünde kaldırılmıştır.
- **zcashd uyumlu JSON-RPC** alt kümesi sunar. Bazı yöntemler değişmiş, bazıları bilerek kapsam dışında bırakılmıştır.
- Anahtar materyali her zaman **age** ile şifrelenir. İşlem geçmişi, adresler ve görüntüleme anahtarları `wallet.db` içinde açık metin olarak tutulur.
- Tek bir imzalı arşivde iki ikili dosya sunulur: `zallet` (başlatıcı) ve `zallet-zebra`. Cüzdanı eşitlemek için yalnızca **Linux** kullanılabilir: macOS veya Windows üzerinde henüz hiçbir Zincir arka ucu çalışmaz.
- `zallet backup` (beta.4'te eklendi), çalışır durumda olan veya durdurulmuş bir cüzdanın tutarlı anlık görüntüsünü alır.
- Resmî belgeler: [The Zallet Book](https://zcash.github.io/zallet/).

---

## Zallet neden var?

`zcashd`, Bitcoin Core'dan türetilmiş bir konsensüs düğümünü ve cüzdanı tek bir süreçte bir araya getiriyordu. Bu tasarım artık yok.

| Rol | Eski yığın | Mevcut yığın |
|------|------|---------------|
| Konsensüs / P2P | `zcashd` | Zebra (`zebrad`) veya Zakura |
| Cüzdan / anahtarlar / bakiyeler | `zcashd` `wallet.dat` | **Zallet** (`wallet.db`) |
| Hafif istemci indeksleyicisi | `lightwalletd` | Zaino veya `lightwalletd` |

Cüzdanı düğümden ayırmanın anlamı şudur:

- Anahtarları taşımadan düğüm yazılımı değiştirilebilir (Zebra yerine Zakura veya tersi).
- Cüzdan taraması ve harcama yetkisi, ayrı olarak güvenliği sıkılaştırılabilen bir süreçte bulunur.
- RPC anlambilimi, `zcashd` özelliklerine bağlı kalmak yerine ZIP 32 hesaplarına, Birleşik Adreslere ve PCZT'lere doğru gelişebilir.

Zallet, daha önce `zcashd`'ü sıcak cüzdan, borsa arka ucu, faucet veya madencilik ödemeleri cüzdanı olarak çalıştıran operatörlere yönelik cüzdandır.

---

## Durum

Zallet **beta** aşamasındadır.

Uygulamada bunun anlamı:

- Geriye dönük uyumsuz değişiklikler herhangi bir beta sürümünde gelebilir. Veri dizinini silip baştan başlamanız gerekebilir.
- `zcashd` cüzdan RPC'lerinin tümü taşınmamıştır.
- Taşınan bazı yöntemlerin anlambilimi `zcashd`'den farklıdır. Entegrasyonlar, [anlam farklılıkları sayfasını](https://zcash.github.io/zallet/zcashd/json_rpc.html) incelemelidir.
- Crate'ler geliştirme aşamasındadır ve henüz tamamen incelenmemiştir.
- Zallet bir Rust kitaplığı **değildir**. Kitaplık olarak bağımlı olmanız hâlinde hiçbir garanti verilmez.

Geri bildirimlerinizi [GitHub issues](https://github.com/zcash/zallet/issues/new) bölümüne veya [Zcash R&D Discord](https://discord.gg/xpzPR53xtU) üzerindeki `#wallet-dev` kanalına iletin.

Amaçlanan RPC arayüzü tamamlandığında daha sonra kararlı bir aşamaya geçilmesi planlanmaktadır. Bu aşamada çağıranların, belgelenmiş anlamsal farklılıklar da dâhil olmak üzere, Zallet yöntemlerine geçmesi beklenecektir.

---

## Mimari

Zallet, her Zincir arka ucunun kendi bağımlılık grafiğini takip edebilmesi için Cargo çalışma alanlarına bölünmüştür. v0.1.0-beta.4 sürümünden itibaren yalnızca zebra arka ucu sunulmaktadır.

```
zallet            launcher: reads `backend` in zallet.toml (default "zebra")
                  and execs zallet-zebra
zallet-core       shared wallet: CLI, config, JSON-RPC, SQLite DB, sync
zallet-zebra      zebra-state backend (ReadStateService + Zebra JSON-RPC)
```

Her iki ikili dosya da aynı `wallet.db` dosyasını açar. v0.1.0-beta.3 sürümüne kadar bir `zallet-zaino` arka ucu da vardı. `zallet.toml` dosyanızda `backend = "zaino"` yazıyorsa bunu `backend = "zebra"` olarak değiştirin. Cüzdan veritabanı için geçiş gerekmez; veri dizinindeki eski `zaino` klasörü silinebilir.

zebra arka ucu, `zebrad`'in durum veritabanını doğrudan okur. Bu nedenle, `indexer` özelliği etkinleştirilerek derlenmiş bir `zebrad` ve **aynı ana bilgisayarda** bulunan durum dizini gerekir. Bir kapsayıcıdaki Zallet'in ağ üzerinden başka bir kapsayıcıdaki `zebrad` ile iletişim kurduğu kurulum, yalnızca ağ üzerinden çalışan bir arka uç eklenene kadar desteklenmez ([zallet#900](https://github.com/zcash/zallet/pull/900)).

Tipik dağıtım:

```
zebrad  (or Zakura)
   │  JSON-RPC / ReadStateService
   ▼
Zallet  (zallet-zebra)
   │  JSON-RPC on 127.0.0.1
   ▼
Your application, exchange, faucet, or operator scripts
```

Zallet bir **tam düğüm cüzdanıdır**: yerel bir doğrulayıcı düğüm bekler. Hafif istemci değildir. Hafif cüzdanlar ve kompakt blok sunucuları için [Zaino](Zaino.md) ve [Lightwallet Nodes](Lightwallet_Nodes.md) sayfalarına bakın.

Zcash Foundation'ün [Z3](https://github.com/ZcashFoundation/z3) compose yığını, Zebra + Zallet bileşenlerini birlikte çalıştırır; harici hafif istemciler için isteğe bağlı bağımsız Zaino da kullanılabilir. Sabitlenmiş imajları NU7 ve Zallet beta.4 sürümlerinden öncedir: kullanmadan önce [Z3 Stack](Z3_Stack.md) sayfasına bakın.

---

## Hesaplar, adresler ve anahtarlar

Zallet, `zcashd`'ün tek örtük hesabı yerine ZIP 32 hesapları temel alınarak oluşturulmuştur.

- Bir cüzdanda **birden fazla BIP 39 anımsatıcı** bulunabilir. Her anımsatıcı, **seed parmak izi**yle (`zip32seedfp1…`) tanımlanan bağımsız bir harcama köküdür.
- **Hesaplar**, bir seed'den ZIP 32 hesap diziniyle türetilir. Tek bir Zallet örneğinde ayrıca yerel bir **UUID** de bulunur. Bir hesabın taşınabilir kimliği `(seedfp, account index)`'tir.
- Adresler, `z_getaddressforaccount` ile oluşturulan **ZIP 316 Birleşik Adreslerdir**. Bir hesapta birçok çeşitlendirilmiş adres bulunabilir; korumalı alıcılar zincir üstünde birbirleriyle ilişkilendirilemez.
- İçe aktarılan harcama anahtarları (`z_importkey`) ve yalnızca izleme amaçlı adresler (`z_importaddress`), hiçbir anımsatıcının kapsamadığı UUID hesaplarına dönüşür.
- Görüntüleme anahtarları dışa ve içe aktarılabilir (`z_exportviewingkey`, `z_importviewingkey`); buna birleşik tam görüntüleme anahtarları ve gelen görüntüleme anahtarları da dâhildir.

`getnewaddress` uygulanmamıştır. `z_getnewaccount` ve `z_getaddressforaccount` kullanın.

`keystore.require_backup` açıksa (`zcashd`'ün `walletrequirebackup` özelliğinin taşınmış biçimi), Zallet yedeği onaylanmamış bir anımsatıcıdan yeni harcama yetkisi türetmeyi reddeder.

---

## Şifreleme ve yedekler

Anahtar materyali **her zaman** şifrelenir. Şifrelenmemiş çalışma modu ve `encryptwallet` RPC yoktur; bu `zcashd` yöntemi hiçbir zaman tam olarak desteklenmemiştir.

- Kurulum, varsayılan yolu `{datadir}/encryption-identity.txt` olan bir **age** kimliği oluşturur.
- Anımsatıcılar ve içe aktarılan harcama anahtarları, `wallet.db` içinde age şifreli metinleri olarak saklanır.
- Veritabanının geri kalanı **şifrelenmez**. Dosyayı ele geçiren biri geçmişi, adresleri ve görüntüleme anahtarlarını okuyabilir.
- Kimlik dosyası bir parola ile korunabilir (`generate-encryption-identity -p`). Kilidi `walletpassphrase` RPC'siyle açın; `walletlock` ile kilitleyin.
- Kimlik dosyasını veya parolasını kaybederseniz harcama anahtarları kurtarılamaz. Kimlik dosyasını, her anımsatıcıyı ve sakladığınız tüm `wallet.db` kopyalarını (ayrı olarak, şifrelenmiş biçimde) yedekleyin.

Zallet çalışırken `wallet.db` dosyasını elle kopyalamak güvenli bir yedekleme yöntemi değildir: SQLite verileri bozulabilir. v0.1.0-beta.4 sürümünden itibaren [`backup` command](https://github.com/zcash/zallet/blob/main/book/src/cli/backup.md) komutunu kullanın:

```bash
zallet -d /path/to/zallet/datadir backup /path/to/backups/
```

Bu komut, çalışır durumda olan veya durdurulmuş bir cüzdanın işlem tutarlılığı olan ve bütünlüğü denetlenmiş bir anlık görüntüsünü yazar. Bir dizin belirtildiğinde dosyaya `zallet-wallet-backup-<UTC time>.db` adını verir ve mevcut bir dosyanın üzerine asla yazmaz. Sürekli cüzdan yazma işlemleri (örneğin ilk eşitleme sırasında) kopyalama işlemini yeniden başlatıp durursa, on dakika sonra açık bir hatayla vazgeçer: daha sonra yeniden deneyin veya önce cüzdanı durdurun. Yedek, age kimlik dosyasını **içermez**. Kimlik dosyasını bir kez yedekleyin ve veritabanı yedeklerinden ayrı saklayın; çünkü her ikisine de sahip olan biri anahtarların şifresini çözebilir.

---

## JSON-RPC

Zallet, HTTP üzerinden Basic kimlik doğrulamasıyla `zcashd` cüzdan RPC'lerinin bir alt kümesini uygular. Yalnızca yerel geri döngü arayüzüne bağlayın. Uzak erişim şifrelenmiş bir tünel üzerinden yapılmalıdır. `rpc.allow_insecure_remote_bind` vardır ve güvenli değildir.

`zcashd`'den kayda değer farkları:

- `getwalletinfo` içindeki bakiye alanları boştur. `z_getbalances`, `z_getbalanceforaccount`, `z_gettotalbalance` kullanın.
- Ücretler **ZIP 317** standardına uygundur. `settxfee` yoktur.
- Harcama oluşturma süreci **PCZT**'lere (Kısmen Oluşturulmuş Zcash İşlemler, ZIP 374) taşınmaktadır. PCZT RPC'leri beta serisinde eklendi.
- Genel bir **eşitleme kilidi**, cüzdan geriden yetişirken veya zincir yeniden düzenlemesinden sonra kurtarılırken bakiye ve harcama RPC'lerini engeller (`ClientInInitialDownload` / `ForbiddenBySafeMode`).

Bilerek kapsam dışında bırakılan yöntemler arasında `createrawtransaction`, `fundrawtransaction`, `getnewaddress`, `getrawchangeaddress`, `keypoolrefill`, `importwallet` ve `encryptwallet` bulunur. Bunların yerine kullanılacak yöntemler [Zallet Book](https://zcash.github.io/zallet/zcashd/json_rpc.html) içinde listelenmiştir.

---

## Başlarken

Resmî kurulum seçenekleri (Debian paketleri, Docker, sürüm ikili dosyaları) [installation guide](https://zcash.github.io/zallet/guide/installation/index.html) içinde yer alır. Sürüm arşivleri `zallet-v<version>-linux-<amd64|arm64>.tar.gz` adıyla yayımlanır ve `zallet` ile `zallet-zebra` dosyalarını içerir. Docker imajları `zodlinc/zallet` olarak yayımlanır.

Yeni cüzdan oluşturmak için temel akış:

```bash
# data directory; default is $HOME/.zallet
zallet -d /path/to/zallet/datadir example-config > /path/to/zallet/datadir/zallet.toml
# edit zallet.toml: network, indexer.validator_address, [indexer.read_state_service], rpc.bind

zallet -d /path/to/zallet/datadir generate-encryption-identity
zallet -d /path/to/zallet/datadir init-wallet-encryption
zallet -d /path/to/zallet/datadir generate-mnemonic
zallet -d /path/to/zallet/datadir confirm-backup
zallet -d /path/to/zallet/datadir start
```

`[indexer]`'i yerel `zebrad` JSON-RPC uç noktasına `validator_address` ile yönlendirin. Bu seçenek gereklidir ve varsayılan olarak localhost'u kullanmaz. zebra arka ucu ayrıca `[indexer.read_state_service]` ile aynı ana bilgisayarda bulunan, `indexer` özelliği etkinleştirilerek derlenmiş bir `zebrad` 7.0.0 veya üzerini gerektirir. Böylece Zallet Zincir durumunu doğrudan okuyabilir. `indexer.db_path` yalnızca kaldırılmış olan Zaino arka ucunu yapılandırıyordu: artık bir uyarıyla yok sayılır.

Yeniden üretilebilir imajlar [StageX](https://codeberg.org/stagex/stagex/) ile oluşturulabilir (Docker 25+, containerd imaj deposu, GNU Make).

---

## zcashd'den geçiş

Bakiyeleri doğrulayıp geri yüklemeyi test edene kadar eski `zcashd` veri dizinini saklayın.

```bash
zallet init-wallet-encryption
zallet migrate-zcash-conf --zcashd-datadir /path/to/zcashd/datadir \
  -o /path/to/zallet/datadir/zallet.toml
zallet migrate-zcashd-wallet --zcashd-datadir /path/to/zcashd/datadir
```

`migrate-zcashd-wallet` yalnızca `zcashd-import` özelliği etkinleştirilmiş derlemelerde bulunur. `wallet.dat`'i okumak için, `zcashd`'in kullandığı Berkeley DB'nin **6.2** sürümündeki `db_dump` gerekir.

Operatörler için adım adım notlar: [Migration Guide: zcashd'den Zebrad/Zallet'e](/guides/migration-guide-zcashd-to-zebrad-zallet).

---

## Zallet'in diğer yazılımlarla ilişkisi

| | Zallet | zecd | ZODL (Zashi) / Zingo / Zkool | Zebra / Zakura | Zaino |
|--|--------|------|------------------------------|----------------|-------|
| Nedir? | Tam düğüm RPC cüzdanı | Korumalı kullanımı önceleyen cüzdan sunucusu | Son kullanıcı cüzdanları | Konsensüs düğümü | İndeksleyici / lightwalletd alternatifi |
| Yerini aldığı | `zcashd` cüzdanı | Doğrudan yerine geçebilecek bir `zcashd` klonu değildir | Mobil/masaüstü uygulamalar | `zcashd` düğümü | `lightwalletd` |
| Yerel düğüm gerekir mi? | Evet | Evet (varsayılan olarak Zebra) | Hayır (hafif istemci) | Düğümün kendisidir | Evet |
| zcashd RPC uyumluluğu | Uyumluluk yolu olarak tasarlanmıştır | Yalnızca seçilmiş küçük bir alt küme | Uygulanamaz | Kısmi / Zakura uyumluluk modu | Farklı API |
| Saklama modeli | Operatör, anahtarları `wallet.db` içinde tutar | Seed ile kurtarılabilir sunucu | Kullanıcı cihazındaki anahtarlar | Cüzdan yok | Anahtar yok |

Hem Zallet hem de **zecd**, Zebra önünde çalışabilir. Zallet'i, `wallet.dat`'den geçiş yolu ve `z_*` cüzdan arayüzü gerektiğinde seçin. Açıkça bir `zcashd` klonu olmayan, korumalı kullanımı önceleyen bir sunucu istediğinizde zecd'i seçin.

[zallet.io](https://www.zallet.io/) adresinde aynı adı kullanan ayrı bir tüketici ürünü vardır. Bu uygulama bu proje değildir.

---

## İlgili sayfalar

- [Full Nodes](Full_Nodes.md) — Zebra, Zakura ve artık kullanılmayan `zcashd` düğümü
- [Zebra Full Node](Zebra_Full_Node.md) — Zallet düğümünün varsayılan olarak okuduğu arka uç
- [Zakura Node](Zakura_Node.md) — alternatif doğrulayıcı düğüm
- [Zaino](Zaino.md) — indeksleyici ve hafif istemci sunucusu (beta.4'ten itibaren Zallet arka ucu değildir)
- [Z3 Stack](Z3_Stack.md) — Zebra + Zallet compose yığını
- [zecd](ZECD.md) — librustzcash üzerinde başka bir cüzdan sunucusu tasarımı
- [Zcash Wallet Syncing](Zcash_Wallet_Syncing.md) — korumalı cüzdanların Zincir'i nasıl taradığı
- [Viewing Keys](Viewing_Keys.md)

## Kaynaklar

- [The Zallet Book](https://zcash.github.io/zallet/)
- [zcash/zallet on GitHub](https://github.com/zcash/zallet)
- [Releases](https://github.com/zcash/zallet/releases) · [v0.1.0-beta.4 changelog](https://github.com/zcash/zallet/blob/v0.1.0-beta.4/CHANGELOG.md)
- [JSON-RPC altered semantics](https://zcash.github.io/zallet/zcashd/json_rpc.html)
- [ZecHub migration guide](/guides/migration-guide-zcashd-to-zebrad-zallet)
- [ZecHub Raspberry Pi guide (Zebra + Zallet)](/guides/raspberry-pi-4-full-node)
- [Z3 (Zebra + Zallet compose stack)](https://github.com/ZcashFoundation/z3)
- [Zcash R&D Discord](https://discord.gg/xpzPR53xtU) — `#wallet-dev`
