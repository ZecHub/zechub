<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Z3_Stack.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Sayfayı Düzenle"/>
</a>

# Z3 Stack

**Z3 Stack**, Zcash Foundation’nin paketlenmiş düğüm platformudur: **Zebra** (tam düğüm) + **Zallet** (tam düğüm cüzdanı) ve isteğe bağlı bir **Zaino** dizinleyicisi. Tek bir ikili dosyada mutabakatı ve cüzdanı bir araya getiren ve 18 Temmuz 2026 tarihinde kullanım ömrünün sonuna ulaşan bağımsız bir `zcashd` sürecinin yerine geçmesi amaçlanmıştır.

Referans uygulama, [github.com/ZcashFoundation/z3](https://github.com/ZcashFoundation/z3) adresindeki Docker Compose projesidir.

---

## Kısaca

* Z3, **yeni bir mutabakat istemcisi değildir**. `zcashd` sonrası stack’i birlikte çalıştırma yöntemidir: Zebra zinciri doğrular, Zallet anahtarları tutar ve cüzdan RPC sunar; Zaino ise (isteğe bağlı) lightwalletd gRPC protokolünü kullanır.
* `zcashd` düğüm + cüzdanı bir araya getiriyordu. Z3 **bu rolleri ayırır**. Borsalar, madencilik havuzları ve diğer tam düğüm cüzdanı operatörleri yalnızca Zebra yerine bu kombinasyona geçer.
* Bir ana makinede üç yalıtılmış Compose projesi çalışabilir: **mainnet**, **testnet** ve **regtest**.
* Mainnet’in ilk senkronizasyonu yaklaşık **24–72 saat** sürer ve yaklaşık **300 GB** alan gerektirir. Regtest saniyeler içinde çalışır ve stack’i öğrenmek için doğru yerdir.
* Zallet, Zaino’nin dizinleyici kütüphanelerini gömer ve Zebra ile JSON-RPC üzerinden iletişim kurar. Bağımsız Zaino hizmeti yalnızca harici cüzdanlar için lightwalletd uyumlu bir uç nokta istiyorsanız gereklidir.
* Zallet **beta** aşamasındadır. Kırıcı değişiklikler cüzdanın silinmesini ve yeniden oluşturulmasını gerektirebilir. Büyük tutarlar için tamamlanmış bir saklama yazılımı olarak değerlendirmeyin.

---

## Z3 neden var?

Zcash’nin yaşamının büyük bölümünde `zcashd` hem referans tam düğüm hem de üretimdeki tek tam düğüm cüzdanıydı. Borsalar, havuzlar ve saklama hizmetleri bu tasarımla entegre oldu.

`zcashd` kullanımdan kaldırıldı. Mutabakat [Zebra](/zcash-tech/zebra-full-node)’ye (ve artık ayrıca [Zakura](/zcash-tech/zakura-node)’ye) taşındı. Gömülü cüzdan [Zallet](https://github.com/zcash/zallet)’ye taşındı. Hafif cüzdan hizmeti [lightwalletd](/zcash-tech/lightwallet-nodes)’den [Zaino](/zcash-tech/zaino)’ye taşınıyor.

Bu üç parça ayrı depolar, ayrı sürüm döngüleri ve ayrı yapılandırmalardır. Z3 bunları birleştiren katmandır: sabitlenmiş imajlar, düğüm senkronize olana dek cüzdanı kapalı tutan sağlık kontrolleri, ağ başına portlar ve birimler ile belgelenmiş bir operatör yolu.

Adı, varsayılan Compose dosyası yalnızca Zebra ve Zallet başlatsa da gayriresmî bir ekosistem kısaltmasıdır — Zebra, Zaino, Zallet. Zaino zorunlu bir üçüncü süreç değil, bir Compose profilidir.

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

| Bileşen | Z3’teki rolü | Gerekli mi? |
| --- | --- | --- |
| **Zebra** | Zinciri, gossip’i, JSON-RPC’yi ve sağlık uç noktasını senkronize eder ve doğrular | Evet |
| **Zallet** | Tam düğüm cüzdanı. Zaino kütüphanelerini gömer. Doğrudan Zebra JSON-RPC’ye bağlanır. Bağımsız Zaino konteynerini **çağırmaz** | Evet |
| **Zaino** | Bağımsız dizinleyici. Harici hafif istemciler için lightwalletd uyumlu gRPC ve ayrıca gezginler ile faucet’ler için JSON-RPC proxy’si sunar | Hayır — `--profile indexer` |

Z3, imaj sürümlerini `docker-compose.yml` içinde sabitler. Farklı bir etiket gerekiyorsa `Z3_ZEBRA_IMAGE`, `Z3_ZAINO_IMAGE` veya `Z3_ZALLET_IMAGE` ile geçersiz kılın.

---

## zcashd ile farkları

| | zcashd | Z3 |
| --- | --- | --- |
| Dil | C++ (Bitcoin fork’u) | Docker Compose ile düzenlenen Rust hizmetleri |
| Süreç modeli | Tek ikili dosya: düğüm + cüzdan | Ayrı düğüm ve cüzdan konteynerleri |
| Mutabakat | Kullanımdan kaldırıldı (EOS 18 Temmuz 2026) | Zebra (veya uyumlu başka bir düğüm) |
| Cüzdan | Yerleşik `wallet.dat` | Zallet, age ile şifrelenmiş veri dizini |
| Hafif istemciler | Genellikle ayrı bir lightwalletd | İsteğe bağlı Zaino profili |
| Yapılandırma | `zcash.conf` | `config/<network>/` altındaki ağ başına dosyalar ve Compose ortam dosyaları |
| Tek ana makinede ağlar | Zahmetli port çakışmaları | Birinci sınıf: `z3-mainnet`, `z3-testnet`, `z3-regtest` |

Hâlâ bir `zcashd` cüzdanınız varsa, `wallet.dat`’yi Z3 birimine kopyalamak yerine ZecHub’nin [migration guide](/guides/migration-guide-zcashd-to-zebrad-zallet) belgesini ve Zallet’nin `migrate-zcashd-wallet` komutunu kullanın.

---

## Ağlar

Z3, üç bağımsız Compose projesinden oluşur. Portları veya birimleri paylaşmazlar.

| Ağ | Proje adı | Kullanım amacı | İlk senkronizasyon | Gerçek fonlar |
| --- | --- | --- | --- | --- |
| **mainnet** | `z3-mainnet` | Üretim | 24–72 saat | Evet |
| **testnet** | `z3-testnet` | Herkese açık test ağında hazırlık | 2–12 saat | Hayır (test ZEC) |
| **regtest** | `z3-regtest` | Yerel pratik: anında bloklar, eş yok | Saniyeler | Hayır |

Yeni operatörler **regtest** ile başlamalı, RPC ve cüzdan akışlarını doğrulamalı, ardından testnet veya mainnet’e geçmelidir.

---

## Varsayılan ana makine portları

Her üç ağ da aynı makinede birlikte bulunmak üzere tasarlanmıştır. Aşağıdaki değerler yayımlanmış varsayılanlardır; her biri eşleşen `Z3_*` ortam değişkeni üzerinden geçersiz kılınabilir. Kanonik matris [`z3-contract.yaml`](https://github.com/ZcashFoundation/z3/blob/main/z3-contract.yaml)’tir.

| Hizmet | Mainnet | Testnet | Regtest |
| --- | --- | --- | --- |
| Zebra JSON-RPC | 8232 | 18232 | 29232 |
| Zebra P2P | 8233 | 18233 | (yayımlanmadı) |
| Zebra health (`/ready`) | 8080 | 18080 | 28080 |
| Zaino gRPC (dizinleyici profili) | 8137 | 18137 | 28137 |
| Zaino JSON-RPC (dizinleyici profili) | 8237 | 18237 | 28237 |
| Zallet RPC | 28232 | 40232 | 50232 |

Compose ağı içinde hizmetler adlarıyla çözümlenir (`zebra`, `zaino`, `zallet`).

---

## Veriler ve yedekler

| Birim | İçeriği | Yedeklenmeli mi? |
| --- | --- | --- |
| `z3-<network>-chain` | Zebra zincir durumu (~300 GB mainnet) | İsteğe bağlı — yeniden senkronize edilebilir |
| `z3-<network>-zallet` | Şifrelenmiş cüzdan veritabanı **ve** kilidini açan age kimliği | **Evet — yedeklenmesi gereken tek birim budur** |
| `z3-<network>-zaino` | Dizinleyici durumu (yalnızca dizinleyici profiliyle) | İsteğe bağlı — yeniden oluşturulabilir |
| `z3-<network>-cookie` | Zebra RPC çerezi | Hayır — yeniden oluşturulur |

İlk başlatmadan önce zincir durumunu başka bir diske koymak için:

```bash
export Z3_CHAIN_DATA_PATH=/mnt/ssd/zebra-state
./scripts/fix-permissions.sh zebra /mnt/ssd/zebra-state
```

`docker compose --env-file .env.<network> --profile "*" down` stack’i durdurur ve birimleri korur. `-v` eklemek bunları siler ve tam yeniden senkronizasyonu zorunlu kılar. Profil tarafından etkinleştirilen hizmetlerin (dizinleyici, izleme) gerçekten kapatılması için `--profile "*"` ekleyin.

---

## Başlangıç

Ön koşullar: Docker Engine, Docker Compose v2.24.4+, Git. `openssl` yalnızca regtest için gereklidir.

### Regtest (stack’i görmenin en hızlı yolu)

```bash
git clone https://github.com/ZcashFoundation/z3 && cd z3
./scripts/regtest-init.sh
docker compose --env-file .env.regtest up -d
```

Test komutları için [docs/regtest.md](https://github.com/ZcashFoundation/z3/blob/main/docs/regtest.md) bölümüne bakın.

### Mainnet (iki aşamalı başlatma)

Zebra senkronizasyonu tamamlamadan Zallet kullanışlı değildir. Zallet’yi erken başlatmak, `/ready` doğru olana kadar yeniden başlatma döngüsüne girmesine neden olur.

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

Testnet için akış, `.env.testnet` ve `./scripts/check-zebra-readiness.sh 18080` ile aynıdır.

`config/<network>/` altındaki düzenlemeler yerel kalır ve `git pull` işlemini atlatır.

### İsteğe bağlı profiller

```bash
# Lightwalletd-compatible gRPC + JSON-RPC proxy
docker compose --env-file .env.mainnet --profile indexer up -d

# Prometheus, Grafana, Jaeger, Alertmanager
docker compose --env-file .env.mainnet --profile monitoring up -d
```

Varsayılan Grafana portları 3000 (mainnet), 13000 (testnet), 23000 (regtest) şeklindedir.

---

## Operatör notları

* **Sabitlenmiş imajlar.** Z3 sessizce `:latest` sürümüne geçmez. İncelenmiş bir değişiklikte sabitlemeyi yükseltin veya `Z3_<SERVICE>_IMAGE` ayarlayın.
* **Root olmayan konteynerler.** Linux yetenekleri kaldırılmıştır. Sağlık kontrolleri, Zebra hazır olana dek cüzdanı bekletir. Yeniden başlatma politikası varsayılan olarak açıktır.
* **Günlükler.** Z3 bir günlükleme sürücüsünü sabitlemez. Docker daemon yapılandırmasında boyut sınırları belirleyin; aksi hâlde günlükler 7/24 çalışan bir düğümde sınırsız büyür.
* **P2P.** Mainnet ve testnet, Zebra’nin P2P portunu yayımlar. NAT arkasındaysanız `ZEBRA_NETWORK__EXTERNAL_ADDR` değişkenini eşlerin çevirmesi gereken adres olarak ayarlayın. Regtest’in eşi yoktur.
* **ARM üzerinde Zaino.** Yukarı akış Zaino imajı yalnızca `linux/amd64` içindir. Apple Silicon üzerinde, kaynaktan derlemediğiniz sürece emülasyon altında çalışır. Zebra ve Zallet çok mimarilidir.
* **Paylaşımlı ana makineler.** Varsayılan olarak CPU veya bellek sınırı ayarlanmamıştır. Makine düğüme ayrılmamışsa bir geçersiz kılma dosyasına `deploy.resources.limits` ekleyin.

Üretim benzeri kontrol listesi ve SSS: [docs/faq.md](https://github.com/ZcashFoundation/z3/blob/main/docs/faq.md), [docs/docker-architecture.md](https://github.com/ZcashFoundation/z3/blob/main/docs/docker-architecture.md).

---

## Z3’ü kim çalıştırmalı?

**Uygun kullanım**

* `zcashd`’yi düğüm artı cüzdan olarak kullanan borsalar, saklama hizmetleri ve madencilik havuzları
* Senkronize bir Zebra karşısında desteklenen tam düğüm cüzdanı RPC’si isteyen operatörler
* Mainnet, testnet ve regtest’i yan yana isteyen geliştiriciler
* Zaino profili aracılığıyla özel bir lightwalletd uyumlu uç nokta kuran herkes

**Genellikle yanlış araç**

* Yalnızca ZEC göndermek ve almak isteyen son kullanıcılar — ZODL / Zashi, Zingo veya YWallet gibi hafif bir cüzdan kullanın
* Yalnızca zinciri doğrulamak isteyen kişiler — tek başına Zebra (veya Zakura) çalıştırın
* Yalnızca compact bloklar sunmak isteyen kişiler — Zallet olmadan Zebra + Zaino veya Zebra + lightwalletd çalıştırın

---

## İlgili sayfalar

* [Zebra Tam Düğüm](/zcash-tech/zebra-full-node) — Z3’ün sarmaladığı mutabakat düğümü
* [Zaino](/zcash-tech/zaino) — isteğe bağlı dizinleyici profili
* [Tam Düğümler](/zcash-tech/full-nodes) — Zebra, Zakura ve kullanımdan kaldırılmış zcashd
* [Hafif Cüzdan Düğümleri](/zcash-tech/lightwallet-nodes) — hafif istemcilerin iletişim kurduğu hizmetler
* [Zakura Düğümü](/zcash-tech/zakura-node) — alternatif tam düğüm; Z3 bugün bunu sunmaz
* [Geçiş Rehberi: zcashd’den Zebrad/Zallet](/guides/migration-guide-zcashd-to-zebrad-zallet)’ye
* [Geliştirici Kaynakları](/start-here/developer-resources)

---

## Kaynaklar

* [Z3 deposu](https://github.com/ZcashFoundation/z3)
* [Z3 sözleşmesi (portlar, birimler, proje adları)](https://github.com/ZcashFoundation/z3/blob/main/z3-contract.yaml)
* [Zebra](https://github.com/ZcashFoundation/zebra) · [Zebra Kitabı](https://zebra.zfnd.org/)
* [Zaino](https://github.com/zingolabs/zaino)
* [Zallet](https://github.com/zcash/zallet) · [Zallet Kitabı](https://zcash.github.io/zallet/)
* [Zcash Topluluk Forumu — Z3 güncellemeleri](https://forum.zcashcommunity.com/t/zcash-z3-updates-formerly-zcashd-deprecation/48965)
* [Z3 Launcher](https://github.com/Jubrilabdulazeez/z3-launcher) — resmî Compose stack’i üzerinde topluluk kontrol düzlemi (ZecHub Hackathon)
