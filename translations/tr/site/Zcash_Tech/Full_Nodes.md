<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Full_Nodes.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Sayfayı Düzenle"/>
</a>

# Tam Düğümler

## Özet

- Bir tam düğüm, Zcash blok zincirinin eksiksiz bir kopyasını tutar ve her yeni blok ile işlemi fikir birliği kurallarına göre denetler.
- Zebra (`zebrad`), bugün kurulacak düğümdür. Zakura, Zebra üzerinden çatallanmış ikinci bir uygulamadır.
- zcashd kullanımdan kaldırılmıştır. Destek Sonu durdurma noktasına 18 Temmuz 2026'da, 3417100 blok yüksekliğinde ulaşıldı ve bu düğümler artık başlamıyor.
- Düğüm ve cüzdan artık ayrı programlardır. [Zallet](https://github.com/zcash/zallet) bir düğüm üzerinde çalışır ve anahtarları tutar.
- Kendi düğümünüzü çalıştırmak size bağımsız doğrulama sağlar ve başka birinin sunucusuna güvenme gereksinimini ortadan kaldırır.

## Temel Açıklama

Tam Düğüm, bir kripto paranın blok zincirinin tam bir kopyasını çalıştıran ve size protokolün özelliklerine erişim sağlayan yazılımdır.

Genesis'ten bu yana gerçekleşen her işlemin eksiksiz kaydını tutar; bu nedenle blok zincirine eklenen yeni işlemlerin ve blokların geçerliliğini doğrulayabilir.

## Düğüm Uygulamaları

### Zebra

Zebra, Zcash Foundation tarafından oluşturulan ve Rust ile yazılmış, Zcash protokolünün bağımsız ve üretime hazır bir tam düğüm uygulamasıdır. zcashd kullanımdan kaldırıldığı için, yeni kurulumlarda önerilen tam düğüm Zebra'dır (`zebrad`).

Zebra blokları ve işlemleri doğrular, eşler arası ağa katılır ve uygulamalar için bir RPC arayüzü sunar. Cüzdan artık ayrı bir bileşendir: [Zallet](https://github.com/zcash/zallet), bir Zebra düğümü üzerinde çalışır ve anahtarlar ile bakiyeleri yönetir. Bu, düğümü ve cüzdanı tek bir süreçte birleştiren zcashd'ün yerini alır.

Korumalı hafif cüzdanlara hizmet vermek için düğüm, yerleşik [lightwalletd](https://github.com/zcash/lightwalletd) veya daha yeni [Zaino](https://zechub.wiki/zcash-tech/zaino) olmak üzere bir indeksleyiciyle birlikte çalışır.

Kurulum talimatları için Zebra kitabını mutlaka okuyun ve destek için Ar-Ge Discord sunucusuna katılın.

[Github](https://github.com/ZcashFoundation/zebra/)

[Zebra Kitabı](https://zebra.zfnd.org)

Kurulum adımları, yapılandırma ve donanım gereksinimleri için [Zebra Tam Düğüm](/zcash-tech/zebra-full-node) sayfasına bakın.

### Zakura

Zakura, Zebra üzerinden çatallanmış ve Valar Group ile Project Tachyon tarafından geliştirilmiş, fikir birliğiyle uyumlu ikinci bir tam düğümdür. Aynı protokol kurallarını izler; daha hızlı senkronizasyon, blok budama ve bir zcashd RPC uyumluluk katmanı ekler. [Zakura Düğümü](/zcash-tech/zakura-node) sayfasına bakın.

### zcashd (kullanımdan kaldırıldı)

> **Not:** zcashd kullanımdan kaldırılmıştır. Electric Coin Company [kullanımdan kaldırıldığını duyurdu](https://z.cash/support/zcashd-deprecation/) ve otomatik Destek Sonu durdurma noktasına 18 Temmuz 2026'da, 3417100 blok yüksekliğinde ulaşıldı. Değiştirilmemiş her zcashd 6.20.0 düğümü bu yükseklikte kapandı ve yeniden başlamayı reddeder; yazılım NU6.3'ü desteklemez. Zebra kullanın. Bir zcashd `wallet.dat` sahibiyseniz, [Geçiş Rehberi: zcashd'den Zebrad/Zallet'e](https://zechub.wiki/guides/migration-guide-zcashd-to-zebrad-zallet) bölümünü izleyin.

zcashd, Electric Coin Company tarafından geliştirilen ve sürdürülen, Zcash için özgün Tam Düğüm uygulamasıydı. Aşağıdaki derleme talimatları, başvuru amacıyla ve zcashd'ten geçiş yapan operatörler için korunmuştur.

Zcashd, RPC arayüzü üzerinden bir dizi API sunar. Bu API'ler, harici uygulamaların düğümle etkileşim kurmasını sağlayan işlevler sunar.

[Lightwalletd](https://github.com/zcash/lightwalletd), geliştiricilerin Zcashd ile doğrudan etkileşim kurmak zorunda kalmadan mobil uyumlu korumalı hafif cüzdanlar oluşturup sürdürmelerini sağlamak için bir tam düğüm kullanan uygulama örneğidir.

[Desteklenen RPC komutlarının tam listesi](https://zcash.github.io/rpc/)

[Zcashd kitabı](https://zcash.github.io/zcash/)

#### Bir Düğüm Başlatma (Linux)

- Bağımlılıkları Kurun

      sudo apt update

      sudo apt-get install \
      build-essential pkg-config libc6-dev m4 g++-multilib \
      autoconf libtool ncurses-dev unzip git python3 python3-zmq \
      zlib1g-dev curl bsdmainutils automake libtinfo5

- En son sürümü klonlayın, sürümü seçin, kurulum yapın ve derleyin:

      git clone https://github.com/zcash/zcash.git

      cd zcash/

      git checkout v5.4.1
      ./zcutil/fetch-params.sh
      ./zcutil/clean.sh
      ./zcutil/build.sh -j$(nproc)

- Blok Zincirini Senkronize Edin (birkaç saat sürebilir)

    Düğümü başlatmak için şunu çalıştırın:

      ./src/zcashd

- Özel Anahtarlar ~/.zcash/wallet.dat içinde saklanır

[Raspberry Pi üzerinde Zcashd rehberi](https://zechub.notion.site/Raspberry-Pi-4-a-zcashd-full-node-guide-6db67f686e8d4b0db6047e169eed51d1)

## Pratik Sonuçlar

### Ağ

Bir tam düğüm çalıştırarak merkeziyetsizliğini destekleyip zcash ağının güçlenmesine yardımcı olursunuz.

Bu, hasım kontrolünü önlemeye ve ağın bazı kesinti türlerine karşı dayanıklı kalmasına yardımcı olur.

DNS tohumlayıcıları, yerleşik bir sunucu üzerinden diğer güvenilir düğümlerin listesini sunar. Bu, işlemlerin ağ boyunca yayılmasını sağlar.

### Ağ İstatistikleri

Bunlar, Zcash Ağ verilerine erişim sağlayan örnek platformlardır:

[Zcash Blok Gezgini](https://zcashblockexplorer.com)

[Coinmetrics](https://docs.coinmetrics.io/info/assets/zec)

[Blockchair](https://blockchair.com/zcash)

Ayrıca testler çalıştırarak veya yeni iyileştirmeler önerip metrikler sağlayarak ağın geliştirilmesine katkıda bulunabilirsiniz.

### Madencilik

Madenciler, getblocktemplate ve getmininginfo gibi madencilikle ilgili tüm RPC'lere erişmek için tam düğümlere ihtiyaç duyar.

Zcashd ayrıca korumalı coinbase'e madenciliği de mümkün kılar. Madenciler ve madencilik havuzları, varsayılan olarak bir z-adresinde korumalı ZEC biriktirmek için doğrudan madencilik yapma seçeneğine sahiptir.

[Madencilik Rehberi](https://zcash.readthedocs.io/en/latest/rtd_pages/zcash_mining_guide.html)'ni okuyun veya [Zcash Madenciler](https://forum.zcashcommunity.com/c/mining/13) için Topluluk Forumu sayfasına katılın.

### Gizlilik

Bir tam düğüm çalıştırmak, Zcash ağındaki tüm işlemleri ve blokları bağımsız olarak doğrulamanızı sağlar.

Tam düğüm çalıştırmak, işlemleri sizin adınıza doğrulamak için üçüncü taraf hizmetleri kullanmayla ilişkili bazı gizlilik risklerini önler.

Kendi düğümünüzü kullanmak ayrıca ağa [Tor](https://zcash.github.io/zcash/user/tor.html) aracılığıyla bağlanmaya da olanak tanır.
Bunun ek bir avantajı, diğer kullanıcıların düğümünüzün .onion adresine özel olarak bağlanabilmesidir.

## Yaygın Hatalar

- Yukarıdaki talimatlarla zcashd derleyip çalışan bir düğüm beklemek. Bu ikili dosyalar kullanım dışı bırakma yüksekliğinde durur.
- Bir düğüm çalıştırıp mobil cüzdanınızın artık onu kullandığını varsaymak. Bir hafif cüzdan, kendi sunucunuza yönlendirene kadar yapılandırıldığı sunucuyla iletişim kurmaya devam eder. [Hafif Cüzdan Düğümleri](/zcash-tech/lightwallet-nodes) sayfasına bakın.
- Yalnızca `zebrad` çalıştırıp hafif cüzdanların bağlanmasını beklemek. Düğümün yanında lightwalletd veya [Zaino](/zcash-tech/zaino) olmak üzere bir indeksleyici gerekir.
- Düğümde cüzdan RPC'leri aramak. Anahtarlar ve bakiyeler Zallet'e taşındı.

## İlgili Sayfalar

- [Zebra Tam Düğüm](/zcash-tech/zebra-full-node) - önerilen düğümü kurun, yapılandırın ve çalıştırın
- [Zakura Düğüm](/zcash-tech/zakura-node) - Zebra üzerinden çatallanmış ikinci düğüm uygulaması
- [Hafif Cüzdan Düğümleri](/zcash-tech/lightwallet-nodes) - hafif cüzdanların sorguladığı sunucular
- [Zaino](/zcash-tech/zaino) - hafif cüzdanlara hizmet veren Rust indeksleyicisi
- [Zcash Cüzdan Senkronizasyonu](/zcash-tech/zcash-wallet-syncing) - senkronizasyonun neden bu şekilde çalıştığı

## Daha Fazla Öğrenme

[Destek Belgeleri](https://zcash.readthedocs.io/en/latest/)'ni okuyun

[Discord Sunucumuza](https://discord.gg/zcash) katılın veya [X](https://X.com/ZecHub) üzerinden bizimle iletişime geçin
