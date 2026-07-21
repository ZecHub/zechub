<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Full_Nodes.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Full Nodes

Bir Full Node, herhangi bir kripto paranın blokzincirinin tam bir kopyasını çalıştıran ve protokol özelliklerine erişim sağlayan bir yazılımdır.

Genesis'ten bu yana gerçekleşmiş her işlemin eksiksiz kaydını tutar ve bu nedenle blokzincire eklenen yeni işlemlerin ve blokların geçerliliğini doğrulayabilir.

## Zcashd

Zcashd, şu anda Electric Coin Company tarafından geliştirilen ve bakımı yapılan, Zcash tarafından kullanılan başlıca Full Node uygulamasıdır.

Zcashd, RPC arayüzü üzerinden bir dizi API sunar. Bu API'ler, harici uygulamaların node ile etkileşim kurmasına olanak tanıyan işlevler sağlar.

[Lightwalletd](https://github.com/zcash/lightwalletd), geliştiricilerin doğrudan Zcashd ile etkileşime girmelerine gerek kalmadan mobil uyumlu shielded light wallet'lar oluşturup sürdürmelerini sağlamak için bir full node kullanan uygulamalara bir örnektir.

[Desteklenen RPC komutlarının tam listesi](https://zcash.github.io/rpc/)

[Zcashd kitabı](https://zcash.github.io/zcash/)


### Bir Node Başlatma (Linux)

- Bağımlılıkları Yükleyin 

      sudo apt update

      sudo apt-get install \
      build-essential pkg-config libc6-dev m4 g++-multilib \
      autoconf libtool ncurses-dev unzip git python3 python3-zmq \
      zlib1g-dev curl bsdmainutils automake libtinfo5

- En son sürümü klonlayın, checkout yapın, kurun ve derleyin:

      git clone https://github.com/zcash/zcash.git

      cd zcash/

      git checkout v5.4.1
      ./zcutil/fetch-params.sh
      ./zcutil/clean.sh
      ./zcutil/build.sh -j$(nproc)

- Blokzinciri eşitleyin (birkaç saat sürebilir)

    Node'u başlatmak için çalıştırın:

      ./src/zcashd

- Private Key'ler ~/.zcash/wallet.dat içinde saklanır

[Raspberry Pi üzerinde Zcashd rehberi](https://zechub.notion.site/Raspberry-Pi-4-a-zcashd-full-node-guide-6db67f686e8d4b0db6047e169eed51d1)


## Zebra

Zebra, Zcash Foundation tarafından oluşturulan, Zcash Protokolü için bağımsız bir full node uygulamasıdır. 

Şu anda test aşamasındadır ve hâlâ deneyseldir.

Zebra'nın iki ana bileşeni vardır. İstemci bileşeni, blokzinciri taramasından ve işlemlerin deneme amaçlı çözülmesinden sorumludur. 

İkinci bölüm ise zebra komut satırı aracıdır. Bu araç, harcama anahtarlarını, adresleri yönetir ve temel cüzdan işlevselliği sağlamak için zebrad içindeki İstemci bileşeniyle iletişim kurar.

Blok kazmak için Zebra'yı denemek isteyen herkes R&D Discord sunucusuna katılmaya davetlidir. Ayrıca kurulum talimatları için Zebra kitabını mutlaka okuyun. 

[Github](https://github.com/ZcashFoundation/zebra/)

[Zebra Kitabı](https://zebra.zfnd.org) 

[Discord](https://discord.gg/uvEdHsrb)



## Ağ

Bir full node çalıştırarak, merkeziyetsizliğini destekleyip güçlendirerek zcash ağını daha sağlam hâle getirmeye yardımcı olursunuz. 

Bu, kötü niyetli kontrolü önlemeye ve ağın bazı kesinti türlerine karşı dayanıklı kalmasına yardımcı olur.

DNS seeders, yerleşik bir sunucu aracılığıyla diğer güvenilir node'ların bir listesini sunar. Bu, işlemlerin ağ genelinde yayılmasını sağlar. 

### Ağ İstatistikleri

Bunlar, Zcash Ağ verilerine erişim sağlayan örnek platformlardır:

[Zcash Blok Gezgini](https://zcashblockexplorer.com)

[Coinmetrics](https://docs.coinmetrics.io/info/assets/zec)

[Blockchair](https://blockchair.com/zcash)

Ayrıca testler çalıştırarak veya yeni iyileştirmeler önerip metrikler sağlayarak ağın geliştirilmesine katkıda bulunabilirsiniz. 



### Madencilik

Madenciler, getblocktemplate ve getmininginfo gibi madencilikle ilgili tüm rpc'lere erişmek için full node'lara ihtiyaç duyar. 

Zcashd ayrıca shielded coinbase'e madenciliği mümkün kılar. Madenciler ve madencilik havuzları, varsayılan olarak bir z-address içinde shielded ZEC biriktirmek için doğrudan madencilik yapma seçeneğine sahiptir. 

[Madencilik Rehberi](https://zcash.readthedocs.io/en/latest/rtd_pages/zcash_mining_guide.html)'ni okuyun veya [Zcash Madencileri](https://forum.zcashcommunity.com/c/mining/13) için Topluluk Forumu sayfasına katılın.

### Gizlilik 

Bir full node çalıştırmak, Zcash ağındaki tüm işlemleri ve blokları bağımsız olarak doğrulamanıza olanak tanır.

Bir full node çalıştırmak, işlemleri sizin adınıza doğrulaması için üçüncü taraf hizmetleri kullanmayla ilişkili bazı gizlilik risklerini önler.

Kendi node'unuzu kullanmak ayrıca ağa [Tor](https://zcash.github.io/zcash/user/tor.html) üzerinden bağlanmanıza da izin verir.
Bunun ek bir avantajı da diğer kullanıcıların node'unuzun .onion adresine gizli şekilde bağlanabilmesidir.


**Yardıma mı ihtiyacınız var?**

[Destek Dokümantasyonu](https://zcash.readthedocs.io/en/latest/)'nu okuyun

[Discord Sunucumuza](https://discord.gg/zcash) katılın veya [twitter](https://twitter.com/ZecHub) üzerinden bize ulaşın

---

**Protected terms (keep in English):** `Zaino` `Zallet`
