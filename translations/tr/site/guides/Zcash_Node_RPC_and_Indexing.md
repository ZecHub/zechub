<a href="https://github.com/zechub/zechub/edit/main/site/guides/Zcash_Node_RPC_and_Indexing.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Sayfayı Düzenle"/>
</a>

# Uygulamalı Rehber: Zcash Düğüm RPC ve Blokzincir Dizine Ekleme

Bu sayfa, çalışan bir Zcash tam düğümle JSON-RPC üzerinden iletişim kurmak ve hafif cüzdanların ve gezginlerin sorgulayabileceği bir dizinleyiciye bağlanmak için hazırlanmış bir uygulama rehberidir. İkinci bir kurulum rehberi **değildir**.

Post-`zcashd` yığınını çalıştırma (Zebra + Zallet, isteğe bağlı Zaino, bağlantı noktaları, birimler, iki aşamalı başlatma) hakkında bilgi için [Z3 Stack](/zcash-tech/z3-stack) sayfasını ve [Z3 repository](https://github.com/ZcashFoundation/z3) sayfasını kullanın. Konsensüs düğümü hakkında arka plan bilgisi için [Full Nodes](/zcash-tech/full-nodes) ve [Zebra Full Node](/zcash-tech/zebra-full-node) sayfalarına bakın.

`zcashd` 18 Temmuz 2026'da kullanım ömrünün sonuna ulaştı. Yeni operatör çalışmaları, Zebra (veya [Zakura](/zcash-tech/zakura-node)) ile bir cüzdan/dizinleyiciyi hedeflemeli, `zcashd`'ı değil.

---

## Özet

* **JSON-RPC**, operatörlerin ve cüzdanların bir düğüme Zincir başı, eşler ve (cüzdan sürecinde) bakiyeler hakkında soru sorma yöntemidir. Z3'te Zebra düğüm RPC'sini, Zallet ise cüzdan RPC'sini sunar.
* **Regtest**, çağrıları öğrenmek için doğru yerdir. Z3'ün `http://127.0.0.1:8181` üzerindeki rpc-router'ı `zebra` / `zebra` kabul eder; düğüm yöntemlerini Zebra'e, cüzdan yöntemlerini ise Zallet'a yönlendirir.
* **Mainnet ve testnet**, Zebra üzerinde çerez kimlik doğrulaması kullanır. Regtest kullanıcı adını/parolasını herkese açık bir düğüme kopyalamayın.
* **Dizine ekleme**, doğrulamadan ayrı bir iştir. Zebra doğrulama yapar. [Zaino](/zcash-tech/zaino) (Z3 `--profile indexer`), lightwalletd uyumlu gRPC sunar. [Ztreamer](https://github.com/zcashlabs/ztreamer), Zakura destekli bir dizinleyicidir; Z3'ün sunduğu hizmet bu değildir.
* Zaino JSON-RPC ve Zebra'ın isteğe bağlı dizinleyici gRPC'si, yerel döngü arabirimi veya güvenilir bir ağ içindir. Bunları herkese açık internete kimlik doğrulaması olmadan açmayın.

---

## Hangi süreç hangi çağrıyı yanıtlar

| İstediğiniz | Bağlanılacak yer | Z3 mainnet ana makine bağlantı noktası | Notlar |
| --- | --- | --- | --- |
| Zincir başı, eşler, `getblockchaininfo` | Zebra JSON-RPC | 8232 | Çerez kimlik doğrulaması |
| Cüzdan bakiyesi, adresler, gönderme | Zallet RPC | 28232 | Ayrı süreç; beta yazılımı |
| Hafif cüzdanlar için kompakt bloklar | Zaino gRPC | 8137 | Yalnızca `--profile indexer` ile; şifresiz h2c |
| Gezgin / faucet JSON-RPC vekil sunucusu | Zaino JSON-RPC | 8237 | Yalnızca güvenilir ağ |
| Eşitleme yapmadan yukarıdakilerin hepsini deneme | Z3 regtest rpc-router | 8181 | Kullanıcı adı `zebra` / parola `zebra` |

Bağlantı noktası matrisi ve Compose proje adları: [Z3 Stack](/zcash-tech/z3-stack) ve [`z3-contract.yaml`](https://github.com/ZcashFoundation/z3/blob/main/z3-contract.yaml).

---

## Önce regtest üzerinde deneyin

Bir Z3 checkout'unda, `./scripts/regtest-init.sh` ve `docker compose --env-file .env.regtest up -d` sonrasında:

```bash
# Node method (Zebra)
curl -s -X POST -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","method":"getblockchaininfo","params":[],"id":1}' \
  http://127.0.0.1:8181

# Wallet method (Zallet)
curl -s -X POST -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","method":"getwalletinfo","params":[],"id":2}' \
  http://127.0.0.1:8181
```

Sağlıklı bir `getblockchaininfo` sonucu, `"blocks"` ve bir `"upgrades"` haritası içerir. curl yanıt vermiyorsa router çalışmıyordur; `401` alıyorsanız router yerine doğrudan Zebra'e bağlanıyorsunuz demektir (regtest üzerinde doğrudan Zebra, `29232` olur ve kimlik bilgilerini değiştirmediyseniz yine router kimlik bilgilerini ister).

Etkinleştirme bloklarının madenciliği de dahil olmak üzere tam regtest iş akışı: [Z3 `docs/regtest.md`](https://github.com/ZcashFoundation/z3/blob/main/docs/regtest.md).

---

## Mainnet / testnet JSON-RPC (çerez kimlik doğrulaması)

Mainnet ve testnet'te Zallet ile isteğe bağlı Zaino hizmeti **paylaşılan RPC kimlik doğrulama çerezinin bulunduğu birimi** okur. Bu çerez her başlatmada yeniden oluşturulur; yedekleme hedefi değildir.

Zebra JSON-RPC'yi herkese açık internette **yayımlamayın**. Compose ağı içinden (`zebra:8232`) veya yalnızca yerel döngü arabirimine bağladıysanız ana makineden çağırın.

Zebra durumu `/ready` olduğunda yapılan tipik operatör kontrolleri:

```bash
# Wait until Zebra is synced (Z3 helper)
./scripts/check-zebra-readiness.sh

# Then start Zallet
docker compose --env-file .env.mainnet up -d
```

`getblocktemplate` / `getmininginfo` madencilik RPC'leridir. Tek bir `zcashd` süreci bekleyen havuzların şablonlar için Zebra (veya Zakura) kullanması ve coinbase için kullandıkları cüzdanı ayrıca çalıştırması gerekir. [Zcash Mining Pools](/using-zcash/zcash-mining-pools) ve [migration guide](/guides/migration-guide-zcashd-to-zebrad-zallet) sayfalarına bakın.

---

## Bir dizinleyici bağlayın

Doğrulama ve dizine ekleme farklı işlerdir.

### Zaino (Z3'ün sunduğu)

Zaino, Zebra'i okur ve lightwalletd uyumlu bir gRPC API'si ile JSON-RPC vekil sunucusu sunar. Zallet, bağımsız Zaino kapsayıcısına **ihtiyaç duymaz**; Zaino kitaplıklarını içerir ve JSON-RPC üzerinden Zebra ile iletişim kurar. Harici hafif cüzdanlar, gezginler veya faucet'ler kullanmak istediğinizde bağımsız Zaino'ı başlatın:

```bash
docker compose --env-file .env.mainnet --profile indexer up -d
```

İstemcileri Zaino'e yönlendirmeden önce Zebra eşitlenene kadar bekleyin. Yüksek getirme eşzamanlılığıyla geriden gelen toplu bir dizinleyici, Zebra doğrulayıcısını yavaşlatabilir; dizinleyici yetişene kadar `fetch_concurrency` değerini düşük tek haneli sayılarda tutun.

Regtest gRPC (şifresiz; bağlantı noktası `28137`):

```bash
# From the Z3 repo, after: scripts/vendor.sh zaino
# and: docker compose --env-file .env.regtest --profile indexer up -d zaino

grpcurl -plaintext \
  -import-path vendor/zaino/zaino-proto/proto \
  -proto service.proto \
  127.0.0.1:28137 \
  cash.z.wallet.sdk.rpc.CompactTxStreamer/GetLightdInfo

grpcurl -plaintext \
  -import-path vendor/zaino/zaino-proto/proto \
  -proto service.proto \
  -d '{}' \
  127.0.0.1:28137 \
  cash.z.wallet.sdk.rpc.CompactTxStreamer/GetLatestBlock
```

Zaino gRPC, tüm ağlarda şifresiz h2c'dir. Ana makine dışından bağlantı kurulacaksa TLS'yi ters vekil sunucuda sonlandırın. Ayrıntılar: [Zaino](/zcash-tech/zaino) ve [Z3 `docs/regtest.md`](https://github.com/ZcashFoundation/z3/blob/main/docs/regtest.md).

### Diğer dizinleyiciler (Z3 kapsamında değil)

* **lightwalletd** — daha eski kompakt blok sunucusu. Hâlâ çeşitli ortamlarda kullanılıyor; bu rol için sonraki seçenek Zaino'tir.
* **Ztreamer** — Zakura destekli bir dizinleyici ve `CompactTxStreamer` uygulaması. Z3 hizmeti değildir. [Ztreamer repository](https://github.com/zcashlabs/ztreamer) sayfasına bakın.
* **Zinder** — Zcash Foundation dizinleyicisi (alfa). Bir arşiv Zebra veya Zakura düğümünden veri okur ve kendi `WalletQuery` gRPC API'sini ve lightwalletd uyumlu `CompactTxStreamer` bağdaştırıcısını sunar. Hızlı başlangıç kılavuzunda Z3 düğümünün yanında çalıştırılır, ancak Z3 hizmeti değildir. [Zinder](/zcash-tech/zinder) sayfasına bakın.
* **Zebra `rpc.indexer_listen_addr`** — Zebra *içindeki* isteğe bağlı bir gRPC dinleyicisi. Z3 bunu gerektirmez ve ana makineye yayımlamaz.

---

## Sık yapılan hatalar

**Cüzdan yöntemlerini Zebra üzerinde çağırmak.** `getwalletinfo` ve gönderme RPC'leri, konsensüs düğümüne değil Zallet'a (veya başka bir cüzdana) aittir.

**Zebra `/ready` olmadan Zallet'ı başlatmak.** Zallet sürekli yeniden başlatma döngüsüne girer. Mainnet/testnet'te `scripts/check-zebra-readiness.sh` kullanın.

**Regtest `zebra`/`zebra` değerlerini mainnet'e kopyalamak.** Çerez kimlik doğrulamasının mainnet/testnet varsayılanı olmasının bir nedeni var.

**Zaino'ı tam düğüm sanmak.** Zebra (veya Zakura) doğrulama yapar. Zaino dizine ekler.

**Zaino JSON-RPC'yi veya Zebra dizinleyici gRPC'sini herkese açık hâle getirmek.** Bu uç noktalar, yerel döngü arabirimi veya güvenilir bir özel ağ içindir.

**Her hafif cüzdanın Zaino konuştuğunu varsaymak.** Cüzdanın mevcut sürümünün, gerçekten uyguladığı protokolle uyumlu olup olmadığını kontrol edin.

---

## İlgili sayfalar

* [Z3 Stack](/zcash-tech/z3-stack) — kurulum, bağlantı noktaları, birimler, iki aşamalı başlatma
* [Zaino](/zcash-tech/zaino) — dizinleyici rolü ve operatör notları
* [Full Nodes](/zcash-tech/full-nodes)
* [Zebra Full Node](/zcash-tech/zebra-full-node)
* [Lightwallet Nodes](/zcash-tech/lightwallet-nodes)
* [Zcash Stack](/guides/zcash-stack) — Zebra + lightwalletd (veya Zaino), Kubernetes ya da Docker Compose üzerinde
* [Migration Guide: zcashd to Zebrad/Zallet](/guides/migration-guide-zcashd-to-zebrad-zallet)
* [Zingolib ve Zaino Tutorial](/guides/zingolib-and-zaino-tutorial)

## Kaynaklar

* [Z3 repository](https://github.com/ZcashFoundation/z3)
* [Z3 regtest cookbook (curl / grpcurl)](https://github.com/ZcashFoundation/z3/blob/main/docs/regtest.md)
* [Z3 FAQ](https://github.com/ZcashFoundation/z3/blob/main/docs/faq.md)
* [Zebra](https://zebra.zfnd.org/)
* [Zaino](https://github.com/zingolabs/zaino)
* [Zallet Book](https://zcash.github.io/zallet/)
* [Ztreamer](https://github.com/zcashlabs/ztreamer)

**Son güncelleme:** Eylül 2026
