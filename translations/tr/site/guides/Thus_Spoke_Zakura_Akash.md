# Thus Spoke Zakura on Akash (Regtest)

Akash üzerinde **Thus Spoke Zakura v0.4.1** yığınını çalıştırın: Zakura Regtest, lightwalletd ve **kontrol paneli / HTTP API** cüzdanı. Test coinlerinin değeri yoktur. Buraya mainnet ZEC göndermeyin.

Şablon: [awesome-akash/thus-spoke-zakura](https://github.com/akash-network/awesome-akash/tree/master/thus-spoke-zakura)

Upstream: [zcashlabs/thus-spoke-zakura](https://github.com/zcashlabs/thus-spoke-zakura) etiketi **v0.4.1**

### Görseller

| Hizmet | Görsel |
| --- | --- |
| Kontrol Paneli + API (`app`) | `ghcr.io/zcashlabs/thus-spoke-zakura-app:0.4.1` |
| lightwalletd | `ghcr.io/zcashlabs/thus-spoke-zakura-lightwalletd:0.4.1` |
| Zakura | `zakuracore/zakura:1.6.0` (0.4.1 başlatıcısına derlenmiş sürüm) |

### Kendi kendine önyükleme

İlk başlatmada `app` kapsayıcısı kalıcı biriminde `ths-server init` çalıştırır, ardından `ths-server serve`. Zakura JSON-RPC ve lightwalletd hazır olana kadar Serve yeniden dener. Sağlayıcıda `ths` çalıştırmanız gerekmez; SDL çalışma zamanıdır.

### Akash bağlantı noktalarını nasıl yayımlar?

SDL `port` / `as` **kapsayıcı** bağlantı noktalarıdır. Uygulama **8080**'de (`THS_LISTEN`) dinler; lightwalletd **9067**'de; Zakura RPC **18232**'de, P2P ise **18233**'te dinler. Dağıtım içinde hizmetler bu bağlantı noktalarını zaten kullanır (`http://zakura:18232`, `http://lightwalletd:9067`).

Bunlar sağlayıcının genel IP adresindeki bağlantı noktaları **değildir**.

**Varsayılan (bu şablon):** özel IP yoktur.

| Hizmet | Kapsayıcıda dinlenen | SDL `as` | Kiralamada nasıl görünür |
| --- | --- | --- | --- |
| `app` (kontrol paneli + HTTP API) | 8080 | 80 (HTTP) | Ingress ana makine adı, genellikle 80/443 üzerinde — **bu URI'yi tarayıcıda açın** |
| `lightwalletd` | 9067 | 9067 (TCP, genel) | `host:&lt;random-high-port&gt;` |
| `zakura` RPC | 18232 | 18232 (TCP, genel) | `host:&lt;random-high-port&gt;` |
| `zakura` P2P | 18233 | 18233 (TCP, genel) | `host:&lt;random-high-port&gt;` |

Kiralamaya hazır olduktan sonra, **Leases → URIs** doğru bilgi kaynağıdır. Kontrol paneli için **`app`** URI'sini açın (aynı kullanıcı arayüzü `ths` yerel olarak açar). Hafif istemcileri **lightwalletd** URI'sine yönlendirin (`THS_LIGHTWALLETD_TLS=false`). Özel IP kiralaması bu bağlantı noktalarını herkese açmadığı sürece sağlayıcının IP adresinde `:8080`, `:80` veya `:9067` yazmayın.

**Özel IP'ler** (`endpoints` / `kind: ip`) ücretli bir ek seçenektir ve bu şablonda **yer almaz**. Genel bir IP'yi ve bazen `as` bağlantı noktasını sabitleyebilirler. İhtiyacınız yoksa bunları devre dışı bırakın.

### Hangi site kullanılmalı (ödemeler)

SDL aynıdır. İki Akash web kullanıcı arayüzü, **ödeme yapma şekliniz** bakımından farklıdır.

| Site | Ödemeler | Cüzdan |
| --- | --- | --- |
| [console.akash.network](https://console.akash.network) | Geleneksel web ödeme sayfası (kart / Console'un sunduğu itibari para ödeme kanalları) | Console hesabı |
| [air.akash.network](https://air.akash.network) | Yerel Akash zincir ödemeleri (AKT / ACT) | **Keplr** |

Zincir üzerinde Keplr ile ödeme yapmak istiyorsanız **Air** kullanın. Geleneksel bir web ödeme akışı istiyorsanız **Console** kullanın.

### Dağıtım

**Web ödemeleri (Console)**

[![Deploy on Akash Console](https://raw.githubusercontent.com/akash-network/console/refs/heads/main/apps/deploy-web/public/images/deploy-with-akash-btn.svg)](https://console.akash.network/new-deployment?step=edit-deployment&templateId=akash-network-awesome-akash-thus-spoke-zakura)

**Keplr ile yerel Akash ödemeleri (Air)**

[Bu şablonu Air'de açın](https://air.akash.network/new-deployment?step=edit-deployment&templateId=akash-network-awesome-akash-thus-spoke-zakura)

Şablondan dağıtımı oluşturun, bir teklifi kabul edin, `app` günlüklerinde `ths-server serve` çalışır durumda görünene kadar bekleyin, ardından kontrol paneli için **`app` URI'sini** açın.

### İlgili

- [Zakura, Akash](/guides/akash-network-zakura) üzerinde — Mainnet/Testnet doğrulayıcı düğümü
- [Zebra, Akash](/guides/akash-network-zebra) üzerinde
- Kitap: [github.com/zcashlabs/thus-spoke-zakura/tree/main/book](https://github.com/zcashlabs/thus-spoke-zakura/tree/main/book)
