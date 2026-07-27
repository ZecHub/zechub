<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Full_Nodes.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Full Node'lar

Bir Full Node, herhangi bir kripto paranın blockchain'inin tam bir kopyasını çalıştıran ve protokol özelliklerine erişim sağlayan bir yazılımdır.

Genesis'ten bu yana gerçekleşen her işlemin eksiksiz kaydını tutar ve bu nedenle blockchain'e eklenen yeni işlemlerin ve blokların geçerliliğini doğrulayabilir.

## Zcashd

> **Not:** zcashd kullanımdan kaldırılıyor. Electric Coin Company, zcashd'nin emekliye ayrıldığını resmen [duyurdu](https://z.cash/support/zcashd-deprecation/); full node rolü [Zebra](https://github.com/ZcashFoundation/zebra) (`zebrad`) ile, cüzdan rolü ise [Zallet](https://github.com/zcash/zallet) ile değiştiriliyor. Yeni kurulumlar için Zebra kullanın (aşağıya bakın). Zaten bir zcashd node'u çalıştırıyorsanız [Geçiş Rehberi: zcashd'den Zebrad/Zallet'e](https://zechub.wiki/migration-guide-zcashd-to-zebrad-zallet) göz atın.

zcashd, Electric Coin Company tarafından geliştirilen ve sürdürülen, Zcash için orijinal Full Node uygulamasıydı. Aşağıdaki derleme talimatları, referans olması ve zcashd'den geçiş yapan operatörler için korunmuştur.

Zcashd, RPC arayüzü üzerinden bir dizi API sunar. Bu API'ler, harici uygulamaların node ile etkileşime girmesini sağlayan işlevler sunar.

[Lightwalletd](https://github.com/zcash/lightwalletd), geliştiricilerin Zcashd ile doğrudan etkileşime girmek zorunda kalmadan mobil uyumlu korumalı hafif cüzdanlar oluşturup sürdürmesini sağlamak için bir full node kullanan uygulamalara bir örnektir.

[Desteklenen RPC komutlarının tam listesi](https://zcash.github.io/rpc/)

[Zcashd kitabı](https://zcash.github.io/zcash/)


### Bir Node Başlatma (Linux)

- Bağımlılıkları yükleyin

      sudo apt update

      sudo apt-get install \
      build-essential pkg-config libc6-dev m4 g++-multilib \
      autoconf libtool ncurses-dev unzip git python3 python3-zmq \
      zlib1g-dev curl bsdmainutils automake libtinfo5

- En son sürümü klonlayın, checkout yapın, kurulumu gerçekleştirin ve derleyin:

      git clone https://github.com/zcash/zcash.git

      cd zcash/

      git checkout v5.4.1
      ./zcutil/fetch-params.sh
      ./zcutil/clean.sh
      ./zcutil/build.sh -j$(nproc)

- Blockchain'i senkronize edin (birkaç saat sürebilir)

    Node'u başlatmak için şunu çalıştırın:

      ./src/zcashd

- Private key'ler ~/.zcash/wallet.dat içinde saklanır

[Raspberry Pi üzerinde Zcashd rehberi](https://zechub.notion.site/Raspberry-Pi-4-a-zcashd-full-node-guide-6db67f686e8d4b0db6047e169eed51d1)


## Zebra

Zebra, Zcash protokolünün bağımsız, üretime hazır bir full node uygulamasıdır; Zcash Foundation tarafından oluşturulmuş ve Rust ile yazılmıştır. zcashd emekliye ayrıldığı için, yeni kurulumlarda önerilen full node Zebra'dır (`zebrad`).

Zebra blokları ve işlemleri doğrular, eşten eşe ağa katılır ve uygulamalar için bir RPC arayüzü sunar. Cüzdan artık ayrı bir bileşendir: [Zallet](https://github.com/zcash/zallet), bir Zebra node'una bağlanarak çalışır ve anahtarları ile bakiyeleri yönetir. Bu, node ile cüzdanı tek bir süreçte birleştiren zcashd'nin yerini alır.

Korumalı hafif cüzdanlara hizmet vermek için node, ya yerleşik [lightwalletd](https://github.com/zcash/lightwalletd) ya da daha yeni [Zaino](https://zechub.wiki/zaino) olmak üzere bir indeksleyiciyle birlikte çalışır.

Kurulum talimatları için mutlaka Zebra kitabını okuyun ve destek için R&D Discord sunucusuna katılın. 

[Github](https://github.com/ZcashFoundation/zebra/)

[Zebra Kitabı](https://zebra.zfnd.org) 

[Discord](https://discord.gg/uvEdHsrb)



## Ağ

Bir full node çalıştırarak Zcash ağının merkeziyetsizliğini destekler ve böylece ağı güçlendirmeye yardımcı olursunuz. 

Bu, kötü niyetli kontrolü önlemeye yardımcı olur ve ağın bazı kesinti türlerine karşı dayanıklı kalmasını sağlar.

DNS seeder'lar, yerleşik bir sunucu aracılığıyla diğer güvenilir node'ların bir listesini sunar. Bu, işlemlerin ağ genelinde yayılmasını sağlar. 

### Ağ İstatistikleri

Bunlar, Zcash ağ verilerine erişim sağlayan örnek platformlardır:

[Zcash Blok Gezgini](https://zcashblockexplorer.com)

[Coinmetrics](https://docs.coinmetrics.io/info/assets/zec)

[Blockchair](https://blockchair.com/zcash)

Ayrıca testler çalıştırarak veya yeni iyileştirmeler önerip metrikler sağlayarak ağın geliştirilmesine katkıda bulunabilirsiniz. 



### Madencilik

Madenciler, getblocktemplate ve getmininginfo gibi madencilikle ilgili tüm RPC'lere erişmek için full node'lara ihtiyaç duyar. 

Zcashd ayrıca korumalı coinbase'e madenciliği de mümkün kılar. Madenciler ve madencilik havuzları, varsayılan olarak bir z-address içinde korumalı ZEC biriktirmek için doğrudan madencilik yapma seçeneğine sahiptir. 

[Maden Rehberi](https://zcash.readthedocs.io/en/latest/rtd_pages/zcash_mining_guide.html)'ni okuyun veya [Zcash Madencileri](https://forum.zcashcommunity.com/c/mining/13) için Topluluk Forumu sayfasına katılın.

### Gizlilik 

Bir full node çalıştırmak, Zcash ağındaki tüm işlemleri ve blokları bağımsız olarak doğrulamanıza olanak tanır.

Bir full node çalıştırmak, işlemleri sizin adınıza doğrulaması için üçüncü taraf hizmetleri kullanmakla ilişkili bazı gizlilik risklerinden kaçınmanızı sağlar.

Kendi node'unuzu kullanmak ayrıca ağa [Tor](https://zcash.github.io/zcash/user/tor.html) üzerinden bağlanmanıza da izin verir.
Bunun ek bir avantajı da diğer kullanıcıların node'unuzun .onion adresine özel olarak bağlanabilmesidir.


**Yardıma mı ihtiyacınız var?**

[Destek Dokümantasyonu](https://zcash.readthedocs.io/en/latest/)'nu okuyun

[Discord Sunucumuza](https://discord.gg/zcash) katılın veya [twitter](https://twitter.com/ZecHub) üzerinden bize ulaşın
