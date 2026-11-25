<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Z3_Stack.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Z3 Stack

**Z3 Stack**, Zcash Foundation’nin paketlenmiş düğüm platformudur: **Zebra** (tam düğüm) + **Zallet** (tam düğüm cüzdanı) ve isteğe bağlı bir **Zaino** indeksleyici. Tek başına çalışan `zcashd` sürecinin yerini alması amaçlanmıştır. Bu süreç, konsensüs ile cüzdanı tek bir ikili dosyada bir araya getiriyordu ve 18 Temmuz 2026’da kullanım ömrünün sonuna ulaştı.

Referans uygulama, [github.com/ZcashFoundation/z3](https://github.com/ZcashFoundation/z3) adresindeki Docker Compose projesidir.

> **Durum, 14 Kasım 2026: Varsayılan sürüm sabitlemeleri NU7 öncesine ait.** Z3'nin `docker-compose.yml` yapılandırması en son 10 Ağustos 2026’da değiştirildi. Hâlâ `zfnd/zebra:6.2.3` ve `zodlinc/zallet:v0.1.0-beta.1` sabitlenmiş durumda; bunlar `zallet-zaino` ikili dosyası olarak başlatıldı. [NU7](NU7.md), 6 Kasım 2026’da 3.543.405 numaralı blokta Mainnet’te etkinleştirildi ve bunu yalnızca Zebra 7.0.0 veya sonrası izliyor: 6.x sürümündeki bir Zebra eski kurallarda kalır ve gerçek Zincir’den kopar. Zallet v0.1.0-beta.4, NU7 sürümünü izleyen ilk sürümdür ve artık `zallet-zaino` hiç içermemektedir. Dağıtıma geçmeden önce depoda daha yeni sürüm sabitlemeleri olup olmadığını kontrol edin. Görüntüleri kendiniz geçersiz kılıp değiştirirseniz, Zallet'ün kalan `zebra` arka ucu Zebra'in durum dizinini doğrudan okur; bu nedenle Zallet aynı ana makinede, bu dizine erişebilecek şekilde çalışmalıdır ([Zallet](Zallet.md)).

---

## Kısaca

* Z3 **yeni bir konsensüs istemcisi değildir**. `zcashd` sonrası yığını birlikte çalıştırma biçimidir: Zebra Zincir’i doğrular, Zallet anahtarları tutar ve cüzdan RPC hizmeti sunar, Zaino (isteğe bağlı) lightwalletd gRPC protokolü üzerinden iletişim kurar.
* `zcashd`, düğüm ile cüzdanı bir arada sunuyordu. Z3 bu rolleri **birbirinden ayırır**. Borsalar, madencilik havuzları ve diğer tam düğüm cüzdanı işletmecileri yalnızca Zebra yerine bu birleşime geçer.
* Tek bir ana makinede birbirinden yalıtılmış üç Compose projesi çalıştırılabilir: **mainnet**, **testnet** ve **regtest**.
* Mainnet’in ilk eşzamanlaması yaklaşık **24–72 saat** sürer ve yaklaşık **300 GB** alan kullanır. Regtest saniyeler içinde başlar ve yığını öğrenmek için doğru yerdir.
* Sabitlenmiş Z3 görüntüsünde Zallet, `zallet-zaino` arka ucunu (Zaino’in indeksleyici kitaplıklarını) çalıştırır ve Zebra ile JSON-RPC üzerinden iletişim kurar. Zallet, v0.1.0-beta.4’te bu arka ucu kaldırdı; güncel Zallet, Zebra’in durumunu doğrudan okur. Tek başına çalışan Zaino hizmeti, yalnızca harici cüzdanlar için lightwalletd uyumlu bir uç nokta istiyorsanız gereklidir.
* Zallet hâlâ **beta** aşamasındadır. Geriye dönük uyumsuz değişiklikler, cüzdanı silip yeniden oluşturmayı gerektirebilir. Büyük meblağlar için tamamlanmış bir saklama yazılımı olarak görmeyin.

---

## Z3 neden var?

Zcash’nin ömrünün büyük bölümünde `zcashd` hem referans tam düğüm hem de üretim ortamlarında kullanılan tek tam düğüm cüzdanıydı. Borsalar, havuzlar ve saklama hizmeti sağlayıcıları bu tasarımla bütünleşti.

`zcashd` kullanım dışı kaldı. Konsensüs, [Zebra](/zcash-tech/zebra-full-node)'ye (ve artık [Zakura](/zcash-tech/zakura-node)'ye de) taşındı. Yerleşik cüzdan, [Zallet](https://github.com/zcash/zallet)'ye taşındı. Hafif cüzdan hizmeti ise [lightwalletd](/zcash-tech/lightwallet-nodes)'den [Zaino](/zcash-tech/zaino)'ye taşınıyor.

Bu üç bileşen ayrı depolarda, ayrı sürüm süreçlerinde ve ayrı yapılandırmalarda bulunur. Z3 bunları bir araya getirir: sabitlenmiş görüntüler, düğüm eşzamanlanana kadar cüzdanı kapalı tutan sağlık denetimleri, ağ başına ayrı bağlantı noktaları ve birimler, ayrıca belgelenmiş bir işletim yolu.

Bu ad, gayriresmî ekosistem kısaltmasıdır — Zebra, Zaino, Zallet — ancak varsayılan Compose dosyası yalnızca Zebra ve Zallet'yi başlatır. Zaino bir Compose profilidir; çalıştırılması gereken üçüncü bir süreç değildir.

---

## Mimari

```
                    ┌──────────────────────── Z3 (per network) ────────────────────────┐
                    │                                                                  │
  peers ◄──P2P──►  Zebra (zebrad)  ──JSON-RPC──►  Zallet                                │
                    │   full node                    │  embeds Zaino libraries          │
                    │                                │  wallet RPC for operators        │
                    │                                └─────────────────────────────────┤
                    │                                                                  │
                    │   Zaino (optional, --profile indexer)                            │
                    │     lightwalletd-compatible gRPC + JSON-RPC proxy                │
                    │            │                                                     │
                    └────────────┼─────────────────────────────────────────────────────┘
                                 ▼
                        light wallets / explorers
```

| Bileşen | Z3'teki rolü | Gerekli mi? |
| --- | --- | --- |
| **Zebra** | Zincir’i eşzamanlar ve doğrular; dedikodu iletişimini, JSON-RPC'yi ve sağlık uç noktasını sağlar | Evet |
| **Zallet** | Tam düğüm cüzdanı. Sabitlenmiş beta.1 görüntüsü, Zaino kitaplık arka ucunu çalıştırır (`zallet-zaino`, Zallet beta.4'te kaldırıldı) ve doğrudan Zebra JSON-RPC'ye bağlanır. Tek başına çalışan Zaino kapsayıcısını **çağırmaz** | Evet |
| **Zaino** | Tek başına çalışan indeksleyici. Harici hafif istemciler için lightwalletd uyumlu gRPC ve gezginler ile faucet'ler için JSON-RPC vekil sunucusu | Hayır — `--profile indexer` |

Z3, görüntü sürümlerini `docker-compose.yml` içinde sabitler. Farklı bir etiket gerekiyorsa `Z3_ZEBRA_IMAGE`, `Z3_ZAINO_IMAGE` veya `Z3_ZALLET_IMAGE` ile geçersiz kılıp değiştirin.

---

## zcashd'den farkı

| | zcashd | Z3 |
| --- | --- | --- |
| Dil | C++ (Bitcoin çatalı) | Rust hizmetleri, Docker Compose ile düzenlenir |
| Süreç modeli | Tek ikili dosya: düğüm + cüzdan | Ayrı düğüm ve cüzdan kapsayıcıları |
| Konsensüs | Kullanım dışı (EOS 18 Temmuz 2026) | Zebra (veya uyumlu başka bir düğüm) |
| Cüzdan | Yerleşik `wallet.dat` | Zallet, age ile şifrelenmiş veri dizini |
| Hafif istemciler | Genellikle ayrı bir lightwalletd | İsteğe bağlı Zaino profili |
| Yapılandırma | `zcash.conf` | `config/<network>/` altındaki ağ başına dosyalar ve Compose ortam dosyaları |
| Tek ana makinedeki ağlar | Sorunlu bağlantı noktası çakışmaları | Birinci sınıf destek: `z3-mainnet`, `z3-testnet`, `z3-regtest` |

Hâlâ `zcashd` cüzdanınız varsa `wallet.dat`'i Z3 birimine kopyalamak yerine ZecHub'in [migration guide](/guides/migration-guide-zcashd-to-zebrad-zallet) kılavuzunu ve Zallet'in `migrate-zcashd-wallet` komutunu kullanın.

---

## Ağlar

Z3, birbirinden bağımsız üç Compose projesinden oluşur. Bağlantı noktalarını veya birimleri paylaşmazlar.

| Ağ | Proje adı | Kullanım amacı | İlk eşzamanlama | Gerçek fonlar |
| --- | --- | --- | --- | --- |
| **mainnet** | `z3-mainnet` | Üretim | 24–72 saat | Evet |
| **testnet** | `z3-testnet` | Herkese açık test ağında hazırlık | 2–12 saat | Hayır (test ZEC) |
| **regtest** | `z3-regtest` | Yerel alıştırma: anlık bloklar, eş yok | Saniyeler | Hayır |

Yeni işletmeciler **regtest** ile başlamalı, RPC ve cüzdan akışlarını doğruladıktan sonra testnet'e veya mainnet'e geçmelidir.

---

## Varsayılan ana makine bağlantı noktaları

Üç ağın tümü tek bir makinede birlikte çalışacak şekilde tasarlanmıştır. Aşağıdaki değerler yayımlanan varsayılanlardır; her biri eşleşen `Z3_*` ortam değişkeniyle geçersiz kılınıp değiştirilebilir. Esas alınacak matris: [`z3-contract.yaml`](https://github.com/ZcashFoundation/z3/blob/main/z3-contract.yaml).

| Hizmet | Mainnet | Testnet | Regtest |
| --- | --- | --- | --- |
| Zebra JSON-RPC | 8232 | 18232 | 29232 |
| Zebra P2P | 8233 | 18233 | (yayımlanmıyor) |
| Zebra sağlık (`/ready`) | 8080 | 18080 | 28080 |
| Zaino gRPC (indeksleyici profili) | 8137 | 18137 | 28137 |
| Zaino JSON-RPC (indeksleyici profili) | 8237 | 18237 | 28237 |
| Zallet RPC | 28232 | 40232 | 50232 |

Compose ağı içinde hizmetlere adlarıyla erişilir (`zebra`, `zaino`, `zallet`).

---

## Veriler ve yedeklemeler

| Birim | İçeriği | Yedekleyin mi? |
| --- | --- | --- |
| `z3-<network>-chain` | Zebra Zincir durumu (mainnet'te yaklaşık 300 GB) | İsteğe bağlı — yeniden eşzamanlanabilir |
| `z3-<network>-zallet` | Şifrelenmiş cüzdan veritabanı **ve** kilidini açan age kimliği | **Evet — yedeklenmesi gereken tek birim budur** |
| `z3-<network>-zaino` | İndeksleyici durumu (yalnızca indeksleyici profiliyle) | İsteğe bağlı — yeniden oluşturulabilir |
| `z3-<network>-cookie` | Zebra RPC çerezi | Hayır — yeniden oluşturulur |

İlk başlatmadan önce Zincir durumunu başka bir diske taşımak için:

```bash
export Z3_CHAIN_DATA_PATH=/mnt/ssd/zebra-state
./scripts/fix-permissions.sh zebra /mnt/ssd/zebra-state
```

`docker compose --env-file .env.<network> --profile "*" down` yığını durdurur ve birimleri korur. `-v` eklemek birimleri siler ve tam yeniden eşzamanlamayı zorunlu kılar. Profil koşuluna bağlı hizmetlerin (indeksleyici, izleme) gerçekten kapatılması için `--profile "*"` seçeneğini ekleyin.

---

## Başlarken

Ön koşullar: Docker Engine, Docker Compose v2.24.4+, Git. `openssl` yalnızca regtest için gereklidir.

### Regtest (yığını görmenin en hızlı yolu)

```bash
git clone https://github.com/ZcashFoundation/z3 && cd z3
./scripts/regtest-init.sh
docker compose --env-file .env.regtest up -d
```

Test komutları için [docs/regtest.md](https://github.com/ZcashFoundation/z3/blob/main/docs/regtest.md) adresine bakın.

### Mainnet (iki aşamalı başlatma)

Zallet kullanışlı hâle gelmeden önce Zebra eşzamanlamayı tamamlamalıdır. Zallet'i erken başlatırsanız, `/ready` doğru olana kadar yeniden başlatma döngüsüne girer.

```bash
git clone https://github.com/ZcashFoundation/z3 && cd z3

# 1. One-time setup: local config + Zallet wallet identity
./scripts/setup-network.sh mainnet

# 2. Start Zebra and wait until it is synced
docker compose --env-file .env.mainnet up -d zebra
./scripts/check-zebra-readiness.sh

# 3. Start Zallet (and anything else in the default profile)
docker compose --env-file .env.mainnet up -d
```

Testnet'te de aynı akış `.env.testnet` ve `./scripts/check-zebra-readiness.sh 18080` ile uygulanır.

`config/<network>/` altındaki düzenlemeler yerel kalır ve `git pull` sonrasında da korunur.

### İsteğe bağlı profiller

```bash
# Lightwalletd-compatible gRPC + JSON-RPC proxy
docker compose --env-file .env.mainnet --profile indexer up -d

# Prometheus, Grafana, Jaeger, Alertmanager
docker compose --env-file .env.mainnet --profile monitoring up -d
```

Varsayılan Grafana bağlantı noktaları mainnet için 3000, testnet için 13000, regtest için 23000'dir.

---

## İşletmeci notları

* **Sabitlenmiş görüntüler.** Z3 sessizce `:latest` sürümüne geçmez. İncelenmiş bir değişiklikle sürüm sabitlemesini güncelleyin veya `Z3_<SERVICE>_IMAGE` ayarını yapın. Sürüm sabitlemeleri Ağustos 2026'dan beri değişmedi; dolayısıyla NU7 öncesine aitler (yukarıdaki durum notuna bakın).
* **Kök olmayan kapsayıcılar.** Linux yetenekleri kaldırılır. Sağlık denetimleri, Zebra hazır olana kadar cüzdanı bekletir. Yeniden başlatma ilkesi varsayılan olarak etkindir.
* **Günlükler.** Z3 bir günlük sürücüsü sabitlemez. Docker arka plan programı yapılandırmasında boyut sınırlarını belirleyin; aksi takdirde 7/24 çalışan bir düğümde günlükler sınırsız büyür.
* **P2P.** Mainnet ve testnet, Zebra'in P2P bağlantı noktasını yayımlar. NAT arkasındaysanız `ZEBRA_NETWORK__EXTERNAL_ADDR` ayarını eşlerin bağlanması gereken adrese göre yapın. Regtest'te eş yoktur.
* **ARM üzerinde Zaino.** Üst akıştaki Zaino görüntüsü yalnızca `linux/amd64` içindir. Apple Silicon'da, kaynaktan oluşturmadığınız sürece öykünme altında çalışır. Zebra ve Zallet çoklu mimariyi destekler.
* **Paylaşılan ana makineler.** Varsayılan olarak CPU veya bellek sınırları belirlenmez. Makine yalnızca düğüme ayrılmamışsa bir geçersiz kılma dosyasına `deploy.resources.limits` ekleyin.

Üretim ortamına yönelik kontrol listesi ve SSS: [docs/faq.md](https://github.com/ZcashFoundation/z3/blob/main/docs/faq.md), [docs/docker-architecture.md](https://github.com/ZcashFoundation/z3/blob/main/docs/docker-architecture.md).

---

## Z3'yi kimler çalıştırmalı?

**Uygun olanlar**

* Daha önce düğüm ve cüzdanı birlikte sunan `zcashd`'i kullanan borsalar, saklama hizmeti sağlayıcıları ve madencilik havuzları
* Eşzamanlanmış bir Zebra üzerinden desteklenen tam düğüm cüzdanı RPC'si isteyen işletmeciler
* Mainnet, testnet ve regtest'i yan yana çalıştırması gereken geliştiriciler
* Zaino profili aracılığıyla özel, lightwalletd uyumlu bir uç nokta kuran herkes

**Genellikle uygun olmayanlar**

* Yalnızca ZEC gönderip almak isteyen son kullanıcılar — ZODL / Zashi, Zingo veya YWallet'in bakımı sürdürülen halefi olan Zkool gibi hafif bir cüzdan kullanın
* Yalnızca Zincir’i doğrulamak isteyenler — tek başına Zebra (veya Zakura) çalıştırın
* Yalnızca kompakt blokları sunmak isteyenler — Zallet olmadan Zebra + Zaino ya da Zebra + lightwalletd çalıştırın

---

## İlgili sayfalar

* [Zebra Tam Düğüm](/zcash-tech/zebra-full-node) — Z3'nin sarmaladığı konsensüs düğümü
* [Zaino](/zcash-tech/zaino) — isteğe bağlı indeksleyici profili
* [Tam Düğümler](/zcash-tech/full-nodes) — Zebra, Zakura ve kullanım dışı kalan zcashd
* [Hafif Cüzdan Düğümleri](/zcash-tech/lightwallet-nodes) — hafif istemcilerin bağlandığı yer
* [Zakura Düğüm](/zcash-tech/zakura-node) — alternatif tam düğüm; Z3'nin bugün sunduğu seçenek değil
* [Geçiş Kılavuzu: zcashd'den Zebrad/Zallet](/guides/migration-guide-zcashd-to-zebrad-zallet)'ye
* [Geliştirici Kaynakları](/start-here/developer-resources)

---

## Kaynaklar

* [Z3 deposu](https://github.com/ZcashFoundation/z3)
* [Z3 sözleşmesi (bağlantı noktaları, birimler, proje adları)](https://github.com/ZcashFoundation/z3/blob/main/z3-contract.yaml)
* [Zebra](https://github.com/ZcashFoundation/zebra) · [Zebra Kitabı](https://zebra.zfnd.org/)
* [Zaino](https://github.com/zingolabs/zaino)
* [Zallet](https://github.com/zcash/zallet) · [Zallet Kitabı](https://zcash.github.io/zallet/)
* [Zcash Topluluk Forumu — Z3 güncellemeleri](https://forum.zcashcommunity.com/t/zcash-z3-updates-formerly-zcashd-deprecation/48965)
* [Z3 Başlatıcısı](https://github.com/Jubrilabdulazeez/z3-launcher) — resmî Compose yığınının topluluk kontrol düzlemi (ZecHub Hackathon)
