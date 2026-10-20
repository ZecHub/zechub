<a href="https://github.com/zechub/zechub/edit/main/site/guides/Zcash_Node_RPC_and_Indexing.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Sayfayı Düzenle"/>
</a>

# Pratik Rehber: Zcash Düğüm RPC ve Blokzincir İndeksleme

Bu sayfa, çalışan bir Zcash tam düğümle JSON-RPC üzerinden iletişim kurmak ve hafif cüzdanların ve gezginlerin sorgulayabileceği bir indeksleyici bağlamak için bir kullanım rehberidir. Bu, ikinci bir kurulum rehberi **değildir**.

`zcashd` sonrası yığını nasıl ayağa kaldıracağınızı (Zebra + Zallet, isteğe bağlı Zaino, portlar, birimler, iki aşamalı başlatma) öğrenmek için [Z3 Stack](/zcash-tech/z3-stack) sayfasını ve [Z3 repository](https://github.com/ZcashFoundation/z3)'yi kullanın. Konsensüs düğümü hakkında arka plan bilgisi için [Full Nodes](/zcash-tech/full-nodes) ve [Zebra Full Node](/zcash-tech/zebra-full-node) sayfalarına bakın.

`zcashd`, 18 Temmuz 2026'da kullanım ömrünün sonuna ulaştı. Yeni operatör çalışmaları, `zcashd` yerine Zebra (veya [Zakura](/zcash-tech/zakura-node)) ile birlikte bir cüzdan/indeksleyiciyi hedeflemelidir.

---

## Kısaca

* **JSON-RPC**, operatörlerin ve cüzdanların bir düğüme zincir ucu, eşler ve (bir cüzdan sürecinde) bakiyeler hakkında soru sorma yoludur. Z3'te Zebra düğüm RPC'sini; Zallet ise cüzdan RPC'sini sunar.
* **Regtest**, çağrıları öğrenmek için doğru yerdir. Z3'ün `http://127.0.0.1:8181` üzerindeki rpc-router'ı `zebra` / `zebra` kabul eder ve düğüm yöntemlerini Zebra'e, cüzdan yöntemlerini ise Zallet'a yönlendirir.
* **Mainnet ve testnet**, Zebra üzerinde cookie kimlik doğrulaması kullanır. Regtest kullanıcı adı/parolasını genel bir düğüme kopyalamayın.
* **İndeksleme**, doğrulamadan ayrı bir iştir. Zebra doğrulama yapar. [Zaino](/zcash-tech/zaino) (Z3 `--profile indexer`), lightwalletd uyumlu gRPC sunar. [Ztreamer](https://github.com/distractedm1nd/ztreamer), Zakura destekli bir indeksleyicidir; Z3'ün sunduğu şey bu değildir.
* Zaino JSON-RPC'si ve Zebra'nin isteğe bağlı indeksleyici gRPC'si geri döngü veya güvenilir bir ağ içindir. Bunları kimlik doğrulaması olmadan genel internete açmayın.

---

## Hangi süreç hangi çağrıyı yanıtlar

| İstediğiniz | Şununla iletişim kurun | Z3 mainnet ana makine portu | Notlar |
| --- | --- | --- | --- |
| Zincir ucu, eşler, `getblockchaininfo` | Zebra JSON-RPC | 8232 | Cookie kimlik doğrulaması |
| Cüzdan bakiyesi, adresler, gönderim | Zallet RPC | 28232 | Ayrı süreç; beta yazılım |
| Hafif cüzdanlar için kompakt bloklar | Zaino gRPC | 8137 | Yalnızca `--profile indexer` ile; düz metin h2c |
| Gezgin / faucet JSON-RPC proxy'si | Zaino JSON-RPC | 8237 | Yalnızca güvenilir ağ |
| Senkronizasyon olmadan yukarıdakilerin tümünü uygulama | Z3 regtest rpc-router | 8181 | Kullanıcı adı `zebra` / parola `zebra` |

Port matrisi ve Compose proje adları: [Z3 Stack](/zcash-tech/z3-stack) ve [`z3-contract.yaml`](https://github.com/ZcashFoundation/z3/blob/main/z3-contract.yaml).

---

## Önce regtest üzerinde pratik yapın

Bir Z3 checkout'undan, `./scripts/regtest-init.sh` ve `docker compose --env-file .env.regtest up -d` sonrasında:

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

Sağlıklı bir `getblockchaininfo` sonucu, `"blocks"` ve bir `"upgrades"` haritası içerir. curl takılırsa yönlendirici çalışmıyordur; `401` alırsanız yönlendirici yerine doğrudan Zebra'e erişiyorsunuzdur (regtest üzerindeki doğrudan Zebra, `29232`'dir ve değiştirmediğiniz sürece yine yönlendirici kimlik bilgilerini bekler).

Etkinleştirme bloklarının madenciliği de dahil olmak üzere tam regtest iş akışı: [Z3 `docs/regtest.md`](https://github.com/ZcashFoundation/z3/blob/main/docs/regtest.md).

---

## Mainnet / testnet JSON-RPC (cookie kimlik doğrulaması)

Mainnet ve testnet'te Zallet ile isteğe bağlı Zaino hizmeti **paylaşılan bir cookie birimi** okur. Bu cookie başlatma sırasında yeniden oluşturulur; yedekleme hedefi değildir.

Zebra JSON-RPC'sini genel internete **açmayın**. Ona Compose ağından (`zebra:8232`) veya yalnızca geri döngüye bağladıysanız ana makineden erişin.

Zebra `/ready` olduktan sonra tipik operatör kontrolleri:

```bash
# Wait until Zebra is synced (Z3 helper)
./scripts/check-zebra-readiness.sh

# Then start Zallet
docker compose --env-file .env.mainnet up -d
```

`getblocktemplate` / `getmininginfo` madencilik RPC'leridir. Hâlâ tek bir `zcashd` süreci bekleyen havuzlar, şablonlar için Zebra'e (veya Zakura'e) ve coinbase için kullandıkları cüzdana ihtiyaç duyar. [Zcash Mining Pools](/using-zcash/zcash-mining-pools) ve [migration guide](/guides/migration-guide-zcashd-to-zebrad-zallet) sayfalarına bakın.

---

## Bir indeksleyici bağlayın

Doğrulama ve indeksleme farklı işlerdir.

### Zaino (Z3'ün sunduğu)

Zaino, Zebra okur ve lightwalletd uyumlu bir gRPC API'sinin yanı sıra bir JSON-RPC proxy'si sunar. Zallet, bağımsız Zaino konteynerine ihtiyaç duymaz; Zaino kütüphanelerini gömer ve JSON-RPC üzerinden Zebra ile iletişim kurar. Harici hafif cüzdanlar, gezginler veya faucet'ler istediğinizde bağımsız Zaino'ü başlatın:

```bash
docker compose --env-file .env.mainnet --profile indexer up -d
```

İstemcileri Zaino'e yönlendirmeden önce Zebra senkronize olana kadar bekleyin. Yüksek getirme eşzamanlılığıyla geride kalmayı telafi eden toplu bir indeksleyici, Zebra'in doğrulayıcısını yavaşlatabilir; indeksleyici yetişene kadar `fetch_concurrency` değerini düşük tek haneli sayılarda tutun.

Regtest gRPC (düz metin; port `28137`):

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

Zaino gRPC'si tüm ağlarda düz metin h2c'dir. Ana makine dışından herhangi bir şey bağlanacaksa TLS'yi bir reverse proxy'de sonlandırın. Ayrıntılar: [Zaino](/zcash-tech/zaino) ve [Z3 `docs/regtest.md`](https://github.com/ZcashFoundation/z3/blob/main/docs/regtest.md).

### Diğer indeksleyiciler (Z3 değil)

* **lightwalletd** — eski kompakt blok sunucusu. Hâlâ yaygın olarak kullanılıyor; bu rol için Zaino onun ardıl yoludur.
* **Ztreamer** — Zakura destekli bir indeksleyici ve `CompactTxStreamer` uygulaması. Bir Z3 hizmeti değildir. [Ztreamer repository](https://github.com/distractedm1nd/ztreamer)'ye bakın.
* **Zebra `rpc.indexer_listen_addr`** — Zebra içindeki isteğe bağlı bir gRPC dinleyicisi. Z3 bunu gerektirmez ve ana makineye yayınlamaz.

---

## Yaygın hatalar

**Cüzdan yöntemlerini Zebra üzerinde çağırmak.** `getwalletinfo` ve gönderim RPC'leri, konsensüs düğümüne değil Zallet'e (veya başka bir cüzdana) aittir.

**Zebra, `/ready` olmadan önce Zallet'ü başlatmak.** Zallet yeniden başlatma döngüsüne girer. Mainnet/testnet'te `scripts/check-zebra-readiness.sh` kullanın.

**Regtest `zebra`/`zebra`'yi mainnet'e kopyalamak.** Cookie kimlik doğrulaması bir sebepten dolayı mainnet/testnet varsayılanıdır.

**Zaino'u tam düğüm olarak ele almak.** Zebra (veya Zakura) doğrulama yapar. Zaino indeksleme yapar.

**Zaino JSON-RPC'sini veya Zebra indeksleyici gRPC'sini herkese açık biçimde sunmak.** Bu uç noktalar geri döngü veya güvenilir özel ağ içindir.

**Her hafif cüzdanın zaten Zaino konuştuğunu varsaymak.** Cüzdanın güncel sürümünü gerçekten uyguladığı protokolle karşılaştırın.

---

## İlgili sayfalar

* [Z3 Stack](/zcash-tech/z3-stack) — kurulum, portlar, birimler, iki aşamalı başlatma
* [Zaino](/zcash-tech/zaino) — indeksleyici rolü ve operatör notları
* [Full Nodes](/zcash-tech/full-nodes)
* [Zebra Full Node](/zcash-tech/zebra-full-node)
* [Lightwallet Nodes](/zcash-tech/lightwallet-nodes)
* [Migration Guide: zcashd'den Zebrad/Zallet](/guides/migration-guide-zcashd-to-zebrad-zallet)'ye
* [Zingolib ve Zaino Tutorial](/guides/zingolib-and-zaino-tutorial)

## Kaynaklar

* [Z3 repository](https://github.com/ZcashFoundation/z3)
* [Z3 regtest kullanım rehberi (curl / grpcurl)](https://github.com/ZcashFoundation/z3/blob/main/docs/regtest.md)
* [Z3 SSS](https://github.com/ZcashFoundation/z3/blob/main/docs/faq.md)
* [Zebra](https://zebra.zfnd.org/)
* [Zaino](https://github.com/zingolabs/zaino)
* [Zallet Book](https://zcash.github.io/zallet/)
* [Ztreamer](https://github.com/distractedm1nd/ztreamer)

**Son güncelleme:** Eylül 2026
