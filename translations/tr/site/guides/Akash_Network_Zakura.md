# Akash Ağı'nda Zakura nasıl çalıştırılır

[awesome-akash zcash-zakura](https://github.com/akash-network/awesome-akash/tree/master/zcash-zakura) şablonunu kullanarak bir **Zakura** Zcash tam düğümü çalıştırmak için adım adım kılavuz.

Zakura, daha hızlı eşitleme, yerel budama ve anlık görüntüden önyükleme özelliklerine sahip, mutabakatla uyumlu bir Zcash düğümüdür (Zebra'dan çatallanmıştır). Bu şablon **`zakuracore/zakura:1.8.1`** sürümünü sabitler (özeti sabitlenmiştir; `:latest` veya `1.1.1` kullanmayın).

### Neler elde edersiniz

- Mainnet P2P: konteyner **8233** bağlantı noktası, genel erişime açık (aşağıdaki bağlantı noktası eşlemesine bakın)
- İlk başlatmada Valar anlık görüntüsünden önyükleme yapan kalıcı, budanmış durum (varsayılan 64 GiB)
- Prometheus **9999** ve sağlık denetimi **8080** (dahili, genel URI yok)
- Yan yana çalışan **lightwalletd** için dahili JSON-RPC **8232**; LWD konteynerde **9067** bağlantı noktasını dinler ve bu bağlantı noktası genel erişime açılır

SDL'deki özellik bayrakları (true/false): `ENABLE_METRICS`, `ENABLE_HEALTH`, `ENABLE_RPC`, `ENABLE_LIGHTWALLETD`. lightwalletd açık olduğunda çerez kimlik doğrulaması kapalıdır; çünkü lightwalletd çerez dosyalarını okuyamaz.

### Hangi site kullanılmalı (ödemeler)

SDL aynıdır. İki Akash web arayüzü **ödeme şekli** bakımından farklıdır.

| Site | Ödemeler | Cüzdan |
| --- | --- | --- |
| [console.akash.network](https://console.akash.network) | Geleneksel web ödeme adımı (kart / Console'un sunduğu itibari para ödeme kanalları) | Console hesabı |
| [air.akash.network](https://air.akash.network) | Yerel Akash zincir ödemeleri (AKT / ACT) | **Keplr** |

Zincir üzerinde Keplr ile ödeme yapmak istiyorsanız **Air**'ı kullanın. Geleneksel bir web ödeme akışı istiyorsanız **Console**'u kullanın. Console'da Keplr yerel mutabakatı beklemeyin.

### Dağıtım

**Web ödemeleri (Console)**

[![Deploy on Akash Console](https://raw.githubusercontent.com/akash-network/console/refs/heads/main/apps/deploy-web/public/images/deploy-with-akash-btn.svg)](https://console.akash.network/new-deployment?step=edit-deployment&templateId=akash-network-awesome-akash-zcash-zakura)

**Keplr ile yerel Akash ödemeleri (Air)**

[Open this template on Air](https://air.akash.network/new-deployment?step=edit-deployment&templateId=akash-network-awesome-akash-zcash-zakura)

1. Yukarıdaki uygun bağlantıyı açın (Console veya Air).
2. Air'da **Keplr** cüzdanını bağlayın ve depozito ile kiralama için AKT/ACT bakiyeniz olduğunu doğrulayın. Console'da arayüzün sunduğu web ödeme adımını tamamlayın.
3. Önceden doldurulmamışsa `zcash-zakura/deploy.yaml` öğesini yükleyin.
4. Depozito yatırın, bir teklifi kabul edin ve kiralamanın başlamasını bekleyin.
5. Günlüklerde önce anlık görüntünün indirildiği (ilk başlatmada), ardından `zakurad start` görünmelidir.
6. **Leases → URIs** bölümünü açın. Genel IP'de 8233 veya 9067'yi değil, sağlayıcının atadığı ana bilgisayar:bağlantı noktası adresini kullanın.

### Akash bağlantı noktalarını nasıl yayımlar

SDL'deki `port` / `as` (8233, 9067, 8232) değerleri **konteyner** bağlantı noktalarıdır. Zakura hâlâ 8233'ü; lightwalletd 9067'yi; RPC ise LWD yan hizmeti için 8232'yi dinler (`zakura:8232`).

Bunlar sağlayıcının genel IP'sindeki bağlantı noktaları **değildir**.

**Varsayılan (bu şablon):** özel IP yoktur. Her `global: true` TCP dışa açma bağlantısı, paylaşılan bir sağlayıcı ana bilgisayarında **rastgele, yüksek numaralı bir bağlantı noktasına** eşlenir. Console/Air bunları kiralama URI'leri olarak listeler; örneğin:

```
zakura-8233: provider.example:31482
lightwalletd-9067: provider.example:32011
```

Eşler **8233** URI'sini arar (`provider.example:31482`). Hafif cüzdanlar **9067** URI'sini kullanır (TLS'yi kendiniz sonlandırmadığınız sürece TLS kapalıdır). `ZAKURA_NETWORK__EXTERNAL_ADDR` değerini eşlenmiş P2P URI'sine ayarlayın; `:8233` değerine değil.

**Dahili** dışa açmalar (`8232` RPC, `9999` metrikler, `8080` sağlık denetimi) dağıtım ağı içinde kalır. Genel URI yoktur.

**Özel IP'ler** (`endpoints` / `kind: ip`) ücretli bir seçenektir ve bu şablonda **yer almaz**. Genel bir IP'yi, bazen de `as` bağlantı noktasını sabitleyebilirler. Yalnızca sabit bir `host:8233` gerekiyorsa ekleyin.

### Arşiv düğümü ve budanmış düğüm

Varsayılan ayar **budanmış** durumdur (yaklaşık 11 GiB anlık görüntü, 64 GiB disk). Tüm geçmişi tutmak için `SNAPSHOT_KIND=archive` değerini ayarlayın, disk alanını en az 350 GiB'ye çıkarın ve `ZAKURA_STATE__STORAGE_MODE=archive` değerini ayarlayın.

### İlgili içerikler

- [Zebra — Akash](/guides/akash-network-zebra) üzerinde (tüm geçmiş, anlık görüntü yok): Zcash Foundation `zebrad`
- [Thus Spoke Zakura — Akash](/guides/thus-spoke-zakura-akash) üzerinde — Regtest kontrol paneli ve uygulaması (v0.4.1)
- Zakura kaynak kodu: [github.com/zakura-core/zakura](https://github.com/zakura-core/zakura)
- Anlık görüntüler: [zakura.com/snapshots/](https://zakura.com/snapshots/)
