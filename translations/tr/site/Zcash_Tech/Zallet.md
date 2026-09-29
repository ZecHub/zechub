<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Zallet.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Zallet

Zallet, Rust ile yazılmış bir tam düğüm Zcash cüzdanıdır. Eskiden `zcashd` içine gömülü olan cüzdanın yerine geçer. `zcashd`, 18 Temmuz 2026'da 3417100 blok yüksekliğinde Destek Sonu durmasına ulaştıktan sonra, fikir birliği ve cüzdan görevleri bölündü: **Zebra** veya **Zakura** zinciri doğrular; **Zallet** ise anahtarları tutar, notları tarar ve cüzdan JSON-RPC'sini sunar.

Zallet şu anda **beta** aşamasındadır. Tam olarak incelenmemiştir. Uyumluluğu bozan değişiklikler, cüzdanın silinip yeniden oluşturulmasını gerektirebilir. [The Zallet Book](https://zcash.github.io/zallet/) içindeki güvenlik uyarılarını okumadan, büyük miktardaki ZEC için bunu üretim saklama çözümü olarak değerlendirmeyin.

---

## Kısaca

- Zallet, bir **tam düğüm RPC cüzdanıdır**; mobil hafif cüzdan veya fikir birliği düğümü değildir.
- `zcashd`'ın cüzdan yarısının yerine geçer. Düğüm yarısı [Zebra](Zebra_Full_Node.md) veya [Zakura](Zakura_Node.md)'dır.
- **Rust** ile yazılmıştır, çift lisansı MIT / Apache-2.0'dır ve [zcash/zallet](https://github.com/zcash/zallet) içinde sürdürülür.
- Ağustos 2026 sonu itibarıyla yayımlanan en güncel sürüm: **v0.1.0-beta.3**.
- Zincir verileriyle iki arka uçtan biri aracılığıyla iletişim kurar: **zebra-state** (yerel bir `zebrad` üzerinden doğrudan `ReadStateService`) veya **Zaino**.
- **zcashd uyumlu JSON-RPC** alt kümesi sunar. Bazı yöntemler değişti; bazıları ise kasıtlı olarak çıkarıldı.
- Anahtar materyali her zaman **age** ile şifrelenir. İşlem geçmişi, adresler ve görüntüleme anahtarları `wallet.db` içinde açık biçimde bulunur.
- Tek imzalı arşivde üç ikili dosya sunar: `zallet` (başlatıcı), `zallet-zebra` ve `zallet-zaino`.
- Resmî belgeler: [The Zallet Book](https://zcash.github.io/zallet/).

---

## Zallet neden var?

`zcashd`, Bitcoin Core türevi bir fikir birliği düğümünü ve bir cüzdanı tek süreçte bir araya getiriyordu. Bu tasarım artık yok.

| Rol | Eski yığın | Mevcut yığın |
|------|-----------|---------------|
| Fikir birliği / P2P | `zcashd` | Zebra (`zebrad`) veya Zakura |
| Cüzdan / anahtarlar / bakiyeler | `zcashd` `wallet.dat` | **Zallet** (`wallet.db`) |
| Hafif istemci dizinleyicisi | `lightwalletd` | Zaino veya `lightwalletd` |

Cüzdanı düğümden ayırmak şunları sağlar:

- Anahtarlar taşınmadan düğüm yazılımı değiştirilebilir (Zebra ve Zakura).
- Cüzdan taraması ve harcama yetkisi, ayrı olarak sıkılaştırılabilen bir süreçte bulunur.
- RPC semantiği, ZIP 32 hesaplarına, Unified Addresses'e ve PCZT'lere doğru gelişebilir; `zcashd` tuhaflıklarında donmuş kalmaz.

Zallet; daha önce `zcashd`'ı sıcak cüzdan, borsa arka ucu, faucet veya madencilik ödeme cüzdanı olarak çalıştıran operatörler için tasarlanmış cüzdandır.

---

## Durum

Zallet **beta** aşamasındadır.

Pratikte bunun anlamı:

- Her beta sürümüne uyumluluğu bozan değişiklikler gelebilir. Veri dizinini silip yeniden başlamak zorunda kalabilirsiniz.
- Her `zcashd` cüzdan RPC'si taşınmış değildir.
- Taşınan bazı yöntemlerin semantiği `zcashd`'dan farklıdır. Entegrasyonların [değiştirilmiş semantik sayfasını](https://zcash.github.io/zallet/zcashd/json_rpc.html) okuması gerekir.
- Crate'ler geliştirme aşamasındadır ve tam olarak incelenmemiştir.
- Zallet bir Rust kütüphanesi **değildir**. Ona bu şekilde bağımlı olursanız hiçbir garanti yoktur.

Geri bildirimler [GitHub sorunlarına](https://github.com/zcash/zallet/issues/new) veya `#wallet-dev`[ R&D DiscordZcash üzerindeki ](https://discord.gg/xpzPR53xtU) kanalına gönderilir.

Amaçlanan RPC yüzeyi hazır olduğunda daha sonraki bir kararlı aşama planlanmaktadır. Çağıranların, belgelenmiş semantik farklılıklar dahil olmak üzere, o zaman Zallet yöntemlerine geçmesi beklenecektir.

---

## Mimari

Zallet, iki zincir arka ucunun farklı bağımlılık grafiklerini takip edebilmesi için üç Cargo çalışma alanına ayrılmıştır.

```
zallet            launcher: reads `backend` in zallet.toml (default "zebra")
                  and execs zallet-zebra or zallet-zaino
zallet-core       shared wallet: CLI, config, JSON-RPC, SQLite DB, sync
zallet-zebra      zebra-state backend (ReadStateService + Zebra JSON-RPC)
zallet-zaino      Zaino indexer backend
```

Her üç ikili dosya da **aynı** `wallet.db`'ı açar. Başlatıcı, çalışma zamanında bir arka uç seçer; geçiş yapmak için yeniden derleme yapmazsınız.

Tipik dağıtım:

```
zebrad  (or Zakura)
   │  JSON-RPC / ReadStateService
   ▼
Zallet  (zallet-zebra or zallet-zaino)
   │  JSON-RPC on 127.0.0.1
   ▼
Your application, exchange, faucet, or operator scripts
```

Zallet bir **tam düğüm cüzdanıdır**: yerel doğrulama yapan bir düğüm bekler. Hafif istemci değildir. Hafif cüzdanlar ve kompakt blok sunucuları için bkz. [Zaino](Zaino.md) ve [Hafif Cüzdan Düğümleri](Lightwallet_Nodes.md).

Zcash Foundation'ın [Z3](https://github.com/ZcashFoundation/z3) compose yığını, Zebra + Zallet'yi birlikte çalıştırır; harici hafif istemciler için isteğe bağlı bağımsız Zaino da bulunur.

---

## Hesaplar, adresler ve anahtarlar

Zallet, ZIP 32 hesapları etrafında oluşturulmuştur; `zcashd`'ın tek örtük hesabı etrafında değil.

- Bir cüzdan **birden fazla BIP 39 anımsatıcı sözcük dizisi** tutabilir. Her anımsatıcı sözcük dizisi, **tohum parmak izi** (`zip32seedfp1…`) ile tanımlanan bağımsız bir harcama köküdür.
- **Hesaplar**, bir tohumdan ZIP 32 hesap indeksi ile türetilir. Bir Zallet örneği içinde ayrıca yerel bir **UUID**'ye sahiptirler. Bir hesabın taşınabilir kimliği `(seedfp, account index)`'dır.
- Adresler, `z_getaddressforaccount` ile üretilen **ZIP 316 Unified Addresses**'tir. Bir hesap çok sayıda çeşitlendirilmiş adrese sahip olabilir; korumalı alıcılar zincir üzerinde ilişkilendirilemez.
- İçe aktarılan harcama anahtarları (`z_importkey`) ve yalnızca izleme adresleri (`z_importaddress`), hiçbir anımsatıcı sözcük dizisinin kapsamadığı UUID hesapları hâline gelir.
- Görüntüleme anahtarları; birleşik tam görüntüleme anahtarları ve gelen görüntüleme anahtarları dahil olmak üzere dışa aktarılabilir ve içe aktarılabilir (`z_exportviewingkey`, `z_importviewingkey`).

`getnewaddress` uygulanmamıştır. `z_getnewaccount` ve `z_getaddressforaccount` kullanın.

`keystore.require_backup` açıksa (`zcashd`'ın `walletrequirebackup` özelliğinin taşınmış biçimi), Zallet yedeği doğrulanmamış bir anımsatıcı sözcük dizisinden yeni harcama yetkisi türetmeyi reddeder.

---

## Şifreleme ve yedekler

Anahtar materyali **her zaman** şifrelenir. Şifrelenmemiş mod ve `encryptwallet` RPC'si yoktur — bu `zcashd` yöntemi hiçbir zaman tam olarak desteklenmemiştir.

- Kurulum, varsayılan yolu `{datadir}/encryption-identity.txt` olan bir **age** kimliği oluşturur.
- Anımsatıcı sözcük dizileri ve içe aktarılan harcama anahtarları, `wallet.db` içinde age şifreli metni olarak saklanır.
- Veritabanının geri kalanı şifrelenmiş **değildir**. Birisi dosyayı ele geçirirse geçmiş, adresler ve görüntüleme anahtarları okunabilir.
- Kimlik, parola ile sarılabilir (`generate-encryption-identity -p`). `walletpassphrase` RPC'siyle kilidi açın; `walletlock` ile kilitleyin.
- Kimlik dosyasını veya parolasını kaybetmek, harcama anahtarlarının kurtarılamaz olmasına neden olur. Kimliği, her anımsatıcı sözcük dizisini ve sakladığınız tüm `wallet.db` kopyalarını (ayrı olarak şifrelenmiş) yedekleyin.

Zallet çalışırken `wallet.db`'ı kopyalamak güvenli bir yedek değildir. SQLite bozulabilir. Durdurulmuş bir süreci tercih edin veya resmî çevrimiçi yedekleme komutunu bekleyin.

---

## JSON-RPC

Zallet, HTTP üzerinden Basic auth ile `zcashd` cüzdan RPC'lerinin bir alt kümesini uygular. Loopback'e bağlayın. Uzaktan kullanım şifreli tünel üzerinden yapılmalıdır. `rpc.allow_insecure_remote_bind` vardır ve güvenli değildir.

`zcashd`'dan önemli farklar:

- `getwalletinfo` üzerindeki bakiye alanları boştur. `z_getbalances`, `z_getbalanceforaccount`, `z_gettotalbalance` kullanın.
- Ücretler **ZIP 317**'yi izler. `settxfee` yoktur.
- Harcama oluşturma işlemi **PCZT**'lere (Kısmen Oluşturulmuş Zcash İşlemleri, ZIP 374) taşınıyor. PCZT RPC'leri beta serisinde kullanıma sunuldu.
- Genel bir **senkronizasyon kilidi**, cüzdan güncellenirken veya yeniden düzenlemeden kurtarılırken bakiye ve harcama RPC'lerini engeller (`ClientInInitialDownload` / `ForbiddenBySafeMode`).

Kasıtlı olarak çıkarılan yöntemler arasında `createrawtransaction`, `fundrawtransaction`, `getnewaddress`, `getrawchangeaddress`, `keypoolrefill`, `importwallet` ve `encryptwallet` bulunur. Yerine geçenler [Zallet Book](https://zcash.github.io/zallet/zcashd/json_rpc.html) içinde listelenmiştir.

---

## Başlarken

Resmî yükleme yolları (Debian paketleri, Docker, sürüm ikili dosyaları) [yükleme kılavuzunda](https://zcash.github.io/zallet/guide/installation/index.html) yer alır. Sürüm arşivleri `zallet-<version>-<arch>.tar.gz` olarak adlandırılır ve üç ikili dosyanın tümünü içerir.

Yeni cüzdan için en az akış:

```bash
# data directory; default is $HOME/.zallet
zallet -d /path/to/zallet/datadir example-config > /path/to/zallet/datadir/zallet.toml
# edit zallet.toml: network, backend, indexer / read-state, rpc.bind

zallet -d /path/to/zallet/datadir generate-encryption-identity
zallet -d /path/to/zallet/datadir init-wallet-encryption
zallet -d /path/to/zallet/datadir generate-mnemonic
zallet -d /path/to/zallet/datadir confirm-backup
zallet -d /path/to/zallet/datadir start
```

`[indexer]`'yi yerel bir `zebrad` JSON-RPC uç noktasına yönlendirin. Zebra arka ucu ayrıca `[indexer.read_state_service]` ve Zallet'nın zincir durumunu doğrudan okuyabilmesi için dizinleyici özelliğiyle derlenmiş bir `zebrad` ister.

Tekrarlanabilir imajlar [StageX](https://codeberg.org/stagex/stagex/) ile oluşturulabilir (Docker 25+, containerd imaj deposu, GNU Make).

---

## zcashd'dan geçiş

Bakiyeleri doğrulayıp bir geri yüklemeyi test edene kadar eski `zcashd` veri dizinini saklayın.

```bash
zallet init-wallet-encryption
zallet migrate-zcash-conf --zcashd-datadir /path/to/zcashd/datadir \
  -o /path/to/zallet/datadir/zallet.toml
zallet migrate-zcashd-wallet --zcashd-datadir /path/to/zcashd/datadir
```

`migrate-zcashd-wallet` yalnızca `zcashd-import` özelliğine sahip derlemelerde bulunur. `wallet.dat`'ı okumak için, `zcashd`'ın kullandığı sürüm olan **Berkeley DB 6.2**'den `db_dump` gerekir.

Adım adım operatör notları: [Geçiş Kılavuzu: zcashd'dan Zebrad/Zallet'a](/guides/migration-guide-zcashd-to-zebrad-zallet).

---

## Zallet diğer yazılımlarla nasıl ilişkilidir?

| | Zallet | zecd | Zashi / ZODL / YWallet | Zebra / Zakura | Zaino |
|--|--------|------|------------------------|----------------|-------|
| Nedir? | Tam düğüm RPC cüzdanı | Korumalı-öncelikli cüzdan sunucusu | Son kullanıcı cüzdanları | Fikir birliği düğümü | Dizinleyici / lightwalletd yerine geçen |
| Yerine geçer | `zcashd` cüzdanı | Yerine doğrudan kullanılabilen bir `zcashd` klonu değil | Mobil/masaüstü uygulamaları | `zcashd` düğümü | `lightwalletd` |
| Yerel düğüm gerektirir | Evet | Evet (varsayılan olarak Zebra) | Hayır (hafif istemci) | Düğümün *kendisidir* | Evet |
| zcashd RPC uyumluluğu | Uyumluluk yolu olarak tasarlanmıştır | Yalnızca küçük, seçilmiş alt küme | Uygulanamaz | Kısmi / Zakura uyumluluk modu | Farklı API |
| Saklama modeli | Operatör anahtarları `wallet.db` içinde tutar | Tohumla kurtarılabilir sunucu | Kullanıcı cihazı anahtarları | Cüzdan yok | Anahtar yok |

Zallet ve **zecd**, ikisi de Zebra'ın önünde bulunabilir. `z_*` cüzdan yüzeyine ve `wallet.dat`'dan geçiş yoluna ihtiyacınız olduğunda Zallet'i seçin. Açıkça bir `zcashd` klonu *olmayan* korumalı-öncelikli bir sunucu istediğinizde zecd'ü seçin.

[zallet.io](https://www.zallet.io/) adresinde aynı adı kullanan ayrı bir tüketici ürünü vardır. Bu uygulama bu proje değildir.

---

## İlgili sayfalar

- [Tam Düğümler](Full_Nodes.md) — Zebra, Zakura ve kullanımdan kaldırılmış `zcashd` düğümü
- [Zebra Tam Düğüm](Zebra_Full_Node.md) — düğümün, Zallet'nın varsayılan arka ucunu okuduğu
- [Zakura Düğümü](Zakura_Node.md) — alternatif doğrulama yapan düğüm
- [Zaino](Zaino.md) — dizinleyici arka ucu ve hafif istemci sunucusu
- [ZECD](ZECD.md) — librustzcash üzerinde başka bir cüzdan-sunucu tasarımı
- [Zcash Cüzdan Senkronizasyonu](Zcash_Wallet_Syncing.md) — korumalı cüzdanların zinciri nasıl taradığı
- [Görüntüleme Anahtarları](Viewing_Keys.md)

## Kaynaklar

- [The Zallet Book](https://zcash.github.io/zallet/)
- [GitHub'da zcash/zallet](https://github.com/zcash/zallet)
- [Sürümler](https://github.com/zcash/zallet/releases)
- [JSON-RPC değiştirilmiş semantiği](https://zcash.github.io/zallet/zcashd/json_rpc.html)
- [ZecHub geçiş kılavuzu](/guides/migration-guide-zcashd-to-zebrad-zallet)
- [ZecHub Raspberry Pi kılavuzu (Zebra + Zallet)](/guides/raspberry-pi-4-full-node)
- [Z3 (Zebra + Zallet compose yığını)](https://github.com/ZcashFoundation/z3)
- [Zcash R&D Discord](https://discord.gg/xpzPR53xtU) — `#wallet-dev`
