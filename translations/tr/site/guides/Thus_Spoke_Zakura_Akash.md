# Thus Spoke Zakura on Akash (Regtest)

Akash üzerinde **Thus Spoke Zakura v0.4.1** yığınını çalıştırın: Zakura Regtest, lightwalletd ve cüzdan **gösterge paneli / HTTP API**. Test coinlerinin değeri yoktur. Buraya ana ağ ZEC göndermeyin.

Şablon: [awesome-akash/thus-spoke-zakura](https://github.com/akash-network/awesome-akash/tree/master/thus-spoke-zakura)

Üst proje: [zcashlabs/thus-spoke-zakura](https://github.com/zcashlabs/thus-spoke-zakura) etiketi **v0.4.1**

### Görseller

| Hizmet | Görsel |
| --- | --- |
| Gösterge paneli + API (`app`) | `ghcr.io/zcashlabs/thus-spoke-zakura-app:0.4.1` |
| lightwalletd | `ghcr.io/zcashlabs/thus-spoke-zakura-lightwalletd:0.4.1` |
| Zakura | `zakuracore/zakura:1.6.0` (0.4.1 başlatıcısına derlenmiş sabit sürüm) |

### Kendi kendine önyükleme

İlk başlatmada `app` kapsayıcısı kalıcı biriminde `ths-server init` çalıştırır, ardından `ths-server serve`. Zakura JSON-RPC ve lightwalletd hazır olana kadar Serve yeniden dener. Sağlayıcıda `ths` çalıştırmazsınız; SDL çalışma zamanıdır.

### Akash bağlantı noktalarını nasıl yayımlar?

SDL `port` / `as` **kapsayıcı** bağlantı noktalarıdır. Uygulama **8080**'de (`THS_LISTEN`); lightwalletd **9067**'de; Zakura RPC **18232**'de ve P2P **18233**'te dinler. Dağıtımın içinde hizmetler zaten bu bağlantı noktalarını kullanır (`http://zakura:18232`, `http://lightwalletd:9067`).

Bunlar sağlayıcının genel IP adresindeki bağlantı noktaları **değildir**.

**Varsayılan (bu şablon):** özel IP yoktur.

| Hizmet | Kapsayıcıda dinlenen bağlantı noktası | SDL `as` | Kiralamada nasıl görünür |
| --- | --- | --- | --- |
| `app` (gösterge paneli + HTTP API) | 8080 | 80 (HTTP) | Giriş ana bilgisayar adı, genellikle 80/443 üzerinden — **bu URI'yi tarayıcıda açın** |
| `lightwalletd` | 9067 | 9067 (TCP, genel) | `host:&lt;random-high-port&gt;` |
| `zakura` RPC | 18232 | 18232 (TCP, genel) | `host:&lt;random-high-port&gt;` |
| `zakura` P2P | 18233 | 18233 (TCP, genel) | `host:&lt;random-high-port&gt;` |

Kiralamaya hazır olduğunda, **Leases → URIs** tek güvenilir bilgi kaynağıdır. Gösterge paneli için **`app`** URI'sini açın (`ths` yerel olarak aynı arayüzü açar). Kompakt istemcileri **lightwalletd** URI'sine yönlendirin (`THS_LIGHTWALLETD_TLS=false`). Özel IP kiralaması bu bağlantı noktalarını herkese açık hâle getirmediyse sağlayıcının IP adresinde `:8080`, `:80` veya `:9067` yazmayın.

**Özel IP'ler** (`endpoints` / `kind: ip`) ücretli bir eklentidir ve bu şablonda **yer almaz**. Genel bir IP'yi ve bazen `as` bağlantı noktasını sabitleyebilirler. İhtiyacınız yoksa etkinleştirmeyin.

### Hangi site kullanılmalı (ödemeler)

SDL aynıdır. İki Akash web arayüzü **ödeme yöntemleri** bakımından farklıdır.

| Site | Ödemeler | Cüzdan |
| --- | --- | --- |
| [console.akash.network](https://console.akash.network) | Geleneksel web ödeme süreci (kart / Console'un sunduğu itibari para seçenekleri) | Console hesabı |
| [air.akash.network](https://air.akash.network) | Yerel Akash Zincir ödemeleri (AKT / ACT) | **Keplr** |

Zincir üstü Keplr ile ödeme yapmak istiyorsanız **Air** kullanın. Geleneksel bir web üzerinden ödeme süreci istiyorsanız **Console** kullanın.

### Dağıtım

**Web üzerinden ödeme (Console)**

[![Deploy on Akash Console](https://raw.githubusercontent.com/akash-network/console/refs/heads/main/apps/deploy-web/public/images/deploy-with-akash-btn.svg)](https://console.akash.network/new-deployment?step=edit-deployment&templateId=akash-network-awesome-akash-thus-spoke-zakura)

**Akash ile yerel ödemeler, Keplr kullanarak (Air)**

[Bu şablonu Air'de açın](https://air.akash.network/new-deployment?step=edit-deployment&templateId=akash-network-awesome-akash-thus-spoke-zakura)

Şablondan dağıtımı oluşturun, bir teklifi kabul edin, `app` günlüklerinde `ths-server serve` hizmetinin çalışır durumda kaldığını görene kadar bekleyin, ardından gösterge paneli için **`app` URI'sini** açın.

### İlgili içerik

- [Zakura, Akash](/guides/akash-network-zakura) üzerinde — Ana ağ/Testnet doğrulayıcı düğümü
- [Zebra, Akash](/guides/akash-network-zebra) üzerinde
- Kitap: [github.com/zcashlabs/thus-spoke-zakura/tree/main/book](https://github.com/zcashlabs/thus-spoke-zakura/tree/main/book)
