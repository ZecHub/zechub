# Zakura Akash Ağında nasıl çalıştırılır

[awesome-akash zcash-zakura](https://github.com/akash-network/awesome-akash/tree/master/zcash-zakura) şablonunu kullanarak bir **Zakura** Zcash tam düğümünü çalıştırmak için adım adım yol.

Zakura, daha hızlı eşitleme, yerel budama ve anlık görüntü önyüklemesi sunan, konsensüs uyumlu bir Zcash düğümüdür (Zebra üzerinden çatallanmıştır). Bu şablon **`zakuracore/zakura:1.8.1`** sürümünü sabitler (özeti sabitlenmiştir; `:latest` veya `1.1.1` kullanmayın).

### Elde edecekleriniz

- Mainnet P2P: container **8233**, genel kullanıma açık (aşağıdaki port eşlemesine bakın)
- İlk başlatmada Valar anlık görüntüsüyle önyüklenen kalıcı budanmış durum (varsayılan 64 GiB)
- Prometheus **9999** ve sağlık durumu **8080** (dahili, herkese açık URI yok)
- Yan yana çalışan **lightwalletd** için dahili JSON-RPC **8232**; LWD container **9067** portunu dinler ve genel kullanıma açılır

SDL'deki özellik bayrakları (true/false): `ENABLE_METRICS`, `ENABLE_HEALTH`, `ENABLE_RPC`, `ENABLE_LIGHTWALLETD`. lightwalletd etkin olduğunda çerez kimlik doğrulaması kapalıdır, çünkü lightwalletd RPC kimlik doğrulama çerez dosyalarını okuyamaz.

### Hangi site kullanılmalı (ödemeler)

SDL aynıdır. İki Akash web kullanıcı arayüzü, **nasıl ödeme yaptığınız** konusunda farklıdır.

| Site | Ödemeler | Cüzdan |
| --- | --- | --- |
| [console.akash.network](https://console.akash.network) | Geleneksel web ödeme adımı (Console'un sunduğu kart / itibari para kanalları) | Console hesabı |
| [air.akash.network](https://air.akash.network) | Yerel Akash Zinciri ödemeleri (AKT / ACT) | **Keplr** |

Keplr ile zincir üstü ödeme yapmak istiyorsanız **Air**'i kullanın. Geleneksel bir web ödeme akışı istiyorsanız **Console**'u kullanın. Console'da Keplr yerel uzlaşmasının gerçekleşmesini beklemeyin.

### Dağıtım

**Web ödemeleri (Console)**

[![Deploy on Akash Console](https://raw.githubusercontent.com/akash-network/console/refs/heads/main/apps/deploy-web/public/images/deploy-with-akash-btn.svg)](https://console.akash.network/new-deployment?step=edit-deployment&templateId=akash-network-awesome-akash-zcash-zakura)

**Keplr ile yerel Akash ödemeleri (Air)**

[Bu şablonu Air'dde açın](https://air.akash.network/new-deployment?step=edit-deployment&templateId=akash-network-awesome-akash-zcash-zakura)

1. Yukarıdaki eşleşen bağlantıyı (Console veya Air) açın.
2. Air'de **Keplr** bağlantısını kurun ve depozito ile kiralama için AKT/ACT bulunduğunu doğrulayın. Console'da, kullanıcı arayüzünün sunduğu web ödeme adımını tamamlayın.
3. Önceden doldurulmamışsa `zcash-zakura/deploy.yaml` yükleyin.
4. Depozito yatırın, bir teklifi kabul edin ve kiralamanın başlamasını bekleyin.
5. Günlüklerde önce anlık görüntü indirmesi (ilk başlatma), ardından `zakurad start` görünmelidir.
6. **Kiralama → URI'ler** bölümünü açın. Genel IP'deki 8233 veya 9067 yerine, sağlayıcının atadığı host:port değerini kullanın.

### Akash portları nasıl yayınlar

SDL `port` / `as` (8233, 9067, 8232) **container** portlarıdır. Zakura hâlâ 8233'ü; lightwalletd 9067'yı; LWD yan hizmeti için RPC ise 8232'yi (`zakura:8232`) dinler.

Bunlar sağlayıcının genel IP'sindeki portlar **değildir**.

**Varsayılan (bu şablon):** özel IP yoktur. Her `global: true` TCP dışa açılımı, paylaşılan bir sağlayıcı ana bilgisayarında **rastgele yüksek bir porta** eşlenir. Console/Air bunları, örneğin aşağıdaki gibi kiralama URI'leri olarak listeler:

```
zakura-8233: provider.example:31482
lightwalletd-9067: provider.example:32011
```

Eşler **8233** URI'sine (`provider.example:31482`) bağlanır. Kompakt cüzdanlar **9067** URI'sini kullanır (TLS'yi kendiniz sonlandırmadığınız sürece TLS kapalıdır). `ZAKURA_NETWORK__EXTERNAL_ADDR` değerini `:8233` yerine eşlenmiş P2P URI'sine ayarlayın.

**Dahili** dışa açılımlar (`8232` RPC, `9999` metrikler, `8080` sağlık durumu) dağıtım ağında kalır. Herkese açık URI yoktur.

**Özel IP'ler** (`endpoints` / `kind: ip`) ücretli bir eklentidir ve bu şablonda **yer almaz**. Genel bir IP'yi ve bazen `as` portunu sabitleyebilirler. Bunu yalnızca sabit bir `host:8233` ihtiyacınız varsa ekleyin.

### Arşiv ve budanmış mod

Varsayılan **budanmış** moddur (~11 GiB anlık görüntüsü, 64 GiB disk). Tam geçmiş için `SNAPSHOT_KIND=archive` değerini ayarlayın, diski 350 GiB veya daha fazlasına yükseltin ve `ZAKURA_STATE__STORAGE_MODE=archive` değerini ayarlayın.

### İlgili

- [Zebra, Akash](/guides/akash-network-zebra) üzerinde — Zcash Foundation `zebrad` (tam geçmiş, anlık görüntüsü yok)
- [Thus Spoke Zakura, Akash](/guides/thus-spoke-zakura-akash) üzerinde — Regtest gösterge paneli + uygulama (v0.4.1)
- Zakura kaynak kodu: [github.com/zakura-core/zakura](https://github.com/zakura-core/zakura)
- Anlık görüntüleri: [zakura.com/snapshots/](https://zakura.com/snapshots/)
