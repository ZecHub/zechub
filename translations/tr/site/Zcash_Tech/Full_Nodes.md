<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Full_Nodes.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Tam Düğümler

## Özet

- Tam bir düğüm, Zcash blokzincirinin eksiksiz bir kopyasını tutar ve her yeni bloğu ve işlemi konsensüs kurallarına göre denetler.
- Zebra (`zebrad`), bugün kurmanız gereken düğümdür. Zakura, Zebra'ten çatallanmış ikinci bir uygulamadır.
- zcashd kullanımdan kaldırılmıştır. Destek Sonu durdurması 18 Temmuz 2026'da 3417100 blok yüksekliğinde gerçekleşti ve bu düğümler artık başlatılamıyor.
- Düğüm ve cüzdan artık ayrı programlardır. [Zallet](https://github.com/zcash/zallet) bir düğüme bağlanarak çalışır ve anahtarları tutar.
- Kendi düğümünüzü çalıştırmak, bağımsız doğrulama yapmanızı sağlar ve başkasının sunucusuna güvenme gereksinimini ortadan kaldırır.

## Temel Açıklama

Tam düğüm, bir kripto para biriminin blokzincirinin eksiksiz bir kopyasını çalıştıran ve protokolün özelliklerine erişmenizi sağlayan yazılımdır.

Başlangıç bloğundan bu yana gerçekleşmiş tüm işlemlerin eksiksiz kaydını tutar; bu nedenle blokzincire eklenen yeni işlem ve blokların geçerliliğini doğrulayabilir.

## Düğüm Uygulamaları

### Zebra

Zebra, Zcash Foundation tarafından oluşturulan ve Rust ile yazılmış, Zcash protokolünün bağımsız ve üretime hazır bir tam düğüm uygulamasıdır. zcashd kullanımdan kaldırıldığı için yeni kurulumlarda önerilen tam düğüm Zebra (`zebrad`) uygulamasıdır.

Zebra blokları ve işlemleri doğrular, eşler arası ağa katılır ve uygulamalar için bir RPC arayüzü sunar. Cüzdan artık ayrı bir bileşendir: [Zallet](https://github.com/zcash/zallet) bir Zebra düğümüne bağlanarak çalışır ve anahtarları ve bakiyeleri yönetir. Bu, düğümü ve cüzdanı tek bir süreçte bir araya getiren zcashd uygulamasının yerini alır.

Korumalı hafif cüzdanlara hizmet vermek için düğüm, yerleşik [lightwalletd](https://github.com/zcash/lightwalletd) veya daha yeni [Zaino](https://zechub.wiki/zcash-tech/zaino) dizinleyicilerinden biriyle birlikte çalışır.

Kurulum talimatları için Zebra kitabını mutlaka okuyun ve destek almak için Ar-Ge Discord sunucusuna katılın.

[GitHub](https://github.com/ZcashFoundation/zebra/)

[Zebra Kitabı](https://zebra.zfnd.org)

Kurulum adımları, yapılandırma ve donanım gereksinimleri için [Zebra Tam Düğüm](/zcash-tech/zebra-full-node) sayfasına bakın.

### Zakura

Zakura, Zebra'ten çatallanmış ve Valar Group ile Project Tachyon tarafından birlikte geliştirilen, konsensüsle uyumlu ikinci bir tam düğümdür. Aynı protokol kurallarına uyar; daha hızlı eşitleme, blok budama ve bir zcashd RPC uyumluluk katmanı ekler. [Zakura Düğüm](/zcash-tech/zakura-node) sayfasına bakın.

### zcashd (kullanımdan kaldırıldı)

> **Not:** zcashd kullanımdan kaldırılmıştır. Electric Coin Company [kullanımdan kaldırıldığını duyurdu](https://z.cash/support/zcashd-deprecation/) ve otomatik Destek Sonu durdurması 18 Temmuz 2026'da 3417100 blok yüksekliğinde gerçekleşti. Değiştirilmemiş tüm zcashd 6.20.0 düğümleri bu blok yüksekliğinde kapandı ve yeniden başlatılamıyor; yazılım NU6.3 sürümünü desteklemiyor. Zebra kullanın. Bir zcashd `wallet.dat` kullanıyorsanız [Migration Guide: zcashd to zebrad/Zallet](https://zechub.wiki/guides/migration-guide-zcashd-to-zebrad-zallet) kılavuzunu izleyin.

zcashd, Zcash için geliştirilen ve bakımı Electric Coin Company tarafından yapılan ilk Tam Düğüm uygulamasıydı. Aşağıdaki derleme talimatları, başvuru amacıyla ve zcashd uygulamasından geçiş yapan operatörler için korunmuştur.

zcashd, RPC arayüzü üzerinden bir API kümesi sunar. Bu API'ler, harici uygulamaların düğümle etkileşim kurmasını sağlayan işlevler sağlar.

[lightwalletd](https://github.com/zcash/lightwalletd), geliştiricilerin zcashd ile doğrudan etkileşim kurmadan mobil cihazlara uygun korumalı hafif cüzdanlar oluşturup bakımını yapmalarını sağlamak için tam düğüm kullanan bir uygulama örneğidir.

[Desteklenen RPC komutlarının tam listesi](https://zcash.github.io/rpc/)

[zcashd kitabı](https://zcash.github.io/zcash/)

#### Düğümü başlatma (Linux)

- Bağımlılıkları yükleyin

      sudo apt update

      sudo apt-get install \
      build-essential pkg-config libc6-dev m4 g++-multilib \
      autoconf libtool ncurses-dev unzip git python3 python3-zmq \
      zlib1g-dev curl bsdmainutils automake libtinfo5

- En son sürümü klonlayın, sürümü seçin, kurulumu yapın ve derleyin:

      git clone https://github.com/zcash/zcash.git

      cd zcash/

      git checkout v5.4.1
      ./zcutil/fetch-params.sh
      ./zcutil/clean.sh
      ./zcutil/build.sh -j$(nproc)

- Blokzinciri eşitleyin (birkaç saat sürebilir)

    Düğümü başlatmak için şu komutu çalıştırın:

      ./src/zcashd

- Özel anahtarlar ~/.zcash/wallet.dat dosyasında saklanır

[Raspberry Pi'de zcashd için kılavuz](https://zechub.notion.site/Raspberry-Pi-4-a-zcashd-full-node-guide-6db67f686e8d4b0db6047e169eed51d1)

## Uygulamadaki Etkileri

### Ağ

Tam bir düğüm çalıştırarak merkeziyetsizliği destekler ve zcash ağını güçlendirmeye yardımcı olursunuz.

Bu, düşmanca denetimi önlemeye ve ağı bazı kesinti türlerine karşı dayanıklı tutmaya yardımcı olur.

DNS tohum sunucuları, yerleşik bir sunucu aracılığıyla diğer güvenilir düğümlerin listesini sunar. Bu, işlemlerin ağ genelinde yayılmasını sağlar. Zcash Foundation'in tohum sunucuları, Rust ile yazılmış ve CoreDNS tabanlı dnsseeder uygulamasının yerini almış bir DNS tohum sunucusu olan [Zeeder](https://github.com/ZcashFoundation/zeeder) uygulamasını çalıştırır. Görüntüleri `zfnd/zeeder` olarak yayımlanır; eski `zfnd/dnsseeder` adı kullanımdan kaldırılmaktadır.

### Ağ İstatistikleri

Zcash ağı verilerine erişim sağlayan platform örnekleri:

[Zcash Blok Gezgini](https://mainnet.zcashexplorer.app)

[Coin Metrics ağ verileri](https://docs.coinmetrics.io/network-data/network-data-overview) — ölçüm belgeleri ve güncel varlık kapsamına ilişkin bağlantılar.

Testler çalıştırarak veya yeni iyileştirmeler önerip ölçüm verileri sağlayarak ağın geliştirilmesine de katkıda bulunabilirsiniz.

### Madencilik

Madencilerin, getblocktemplate ve getmininginfo gibi madencilikle ilgili tüm RPC'lere erişmek için tam düğümlere ihtiyacı vardır.

zcashd, coinbase işleminin korumalı havuza yönlendirilerek madencilik yapılmasını da sağlar. Madenciler ve madencilik havuzları, korumalı ZEC bir z-adresinde varsayılan olarak biriktirmek için doğrudan bu adrese madencilik yapabilir.

[Madencilik Kılavuzu](https://zcash.readthedocs.io/en/latest/rtd_pages/zcash_mining_guide.html)'nu okuyun veya [Zcash Madencileri](https://forum.zcashcommunity.com/c/mining/13) için Topluluk Forumu sayfasına katılın.

### Gizlilik

Tam bir düğüm çalıştırmak, Zcash ağındaki tüm işlemleri ve blokları bağımsız olarak doğrulamanızı sağlar.

Tam bir düğüm çalıştırmak, işlemleri sizin adınıza doğrulamak için üçüncü taraf hizmetlerini kullanmanın getirdiği bazı gizlilik risklerini önler.

Kendi düğümünüzü kullanmanız, ağa [Tor](https://zcash.github.io/zcash/user/tor.html) üzerinden bağlanmanıza da olanak tanır.
Bunun ek bir avantajı, diğer kullanıcıların düğümünüze özel olarak .onion adresiniz üzerinden bağlanabilmesidir.

## Sık Yapılan Hatalar

- Yukarıdaki talimatları izleyerek zcashd derlemek ve çalışan bir düğüm elde edeceğinizi sanmak. Bu ikili dosyalar kullanımdan kaldırılma blok yüksekliğinde durur.
- Bir düğüm çalıştırıp mobil cüzdanınızın artık bu düğümü kullandığını varsaymak. Hafif bir cüzdan, kendi düğümünüzü kullanacak şekilde ayarlayana kadar yapılandırıldığı sunucuyla iletişim kurmaya devam eder. [Hafif Cüzdan Düğümleri](/zcash-tech/lightwallet-nodes) sayfasına bakın.
- Yalnızca `zebrad` çalıştırıp hafif cüzdanların bağlanmasını beklemek. Düğümün yanında, lightwalletd veya [Zaino](/zcash-tech/zaino) dizinleyicilerinden biri çalışmalıdır.
- Düğümde cüzdan RPC'lerini aramak. Anahtarlar ve bakiyeler Zallet uygulamasına taşındı.

## İlgili Sayfalar

- [Zebra Tam Düğüm](/zcash-tech/zebra-full-node) - önerilen düğümü yükleme, yapılandırma ve çalıştırma
- [Zakura Düğüm](/zcash-tech/zakura-node) - Zebra'ten çatallanmış ikinci düğüm uygulaması
- [Hafif Cüzdan Düğümleri](/zcash-tech/lightwallet-nodes) - hafif cüzdanların sorguladığı sunucular
- [Zaino](/zcash-tech/zaino) - hafif cüzdanlara hizmet veren Rust dizinleyicisi
- [Zinder](/zcash-tech/zinder) - Zcash Foundation'in Zebra ve Zakura için alfa dizinleyicisi
- [Zcash Cüzdan Eşitleme](/zcash-tech/zcash-wallet-syncing) - eşitlemenin neden bu şekilde çalıştığı

## Daha Fazla Bilgi

[Destek Belgeleri](https://zcash.readthedocs.io/en/latest/) sayfasını okuyun.

[Discord Sunucumuza](https://discord.gg/zcash) katılın veya [X](https://X.com/ZecHub) üzerinden bize ulaşın.
