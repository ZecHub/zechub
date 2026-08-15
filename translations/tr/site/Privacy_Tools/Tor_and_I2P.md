---
<a href="https://github.com/zechub/zechub/edit/main/site/Privacy_Tools/Tor_and_I2P.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Sayfayı Düzenle"/>
</a>


# Gizlilik Neden Önemlidir

Dijital çağda, [gizliliğinizi](https://www.privacyguides.org/en/) korumak giderek daha hayati hale geldi. Bazıları gizliliği kaybedilmiş bir dava olarak görebilir, ancak öyle değildir. Gizliliğiniz risk altındadır ve endişe konusu olmalıdır. Gizlilik, güç ile ilişkili olduğu için önemli bir değere sahiptir ve bu gücün sorumlu bir şekilde kullanılmasını sağlamak kritik önemdedir.

## Tor ve I2P Teknolojileri

## Tor

[Tor](https://www.privacyguides.org/en/tor/?h=tor), uygulamalar için bağlantılar kurmak üzere Tor ağını kullanan bir proxy aracıdır. Torbot bunu, trafiğini Tor üzerinden yönlendirerek gerçekleştirir; böylece bu uygulamalar için [gizliliği ve anonimliğe](https://www.torproject.org/) katkıyı artırır.

## I2P Ağı

[I2P](https://geti2p.net/en/about/intro) ağı, yani Invisible Internet Project, tamamen şifrelenmiş eşler arası bir örtü ağıdır. Mesajların içeriğinin, kaynağının ve hedefinin gözlemcilerden gizlenmesini sağlar. Başka bir deyişle, hiç kimse trafiğin kaynağını veya hedefini ya da iletilen mesajların gerçek içeriğini göremez. I2P'de kullanılan şifreleme, kullanıcıları için yüksek düzeyde gizlilik ve anonimlik sağlar.

### I2P Kurulumu

İki uygulaması vardır. Orijinal [Java I2P](https://geti2p.net/en/download), Windows, macOS, Linux ve Android üzerinde çalışır. C++ ile yazılmış olan [i2pd](https://i2pd.website/), daha hafiftir ve sunucularda ya da düşük güçlü makinelerde genellikle tercih edilen seçenektir.

Çalışmaya başladığında, I2P `127.0.0.1:7657` üzerinde yerel bir konsol ve `127.0.0.1:4444` (HTTP) ile `127.0.0.1:4447` (SOCKS) üzerinde proxy'ler sunar. İlk başlatmada bunun birkaç dakika sürmesini bekleyin: I2P'nin herhangi bir şey çalışmadan önce ağ üzerinden tüneller oluşturması gerekir ve çevrimiçi kaldığı süre uzadıkça daha hızlı hale gelir.

### I2P'yi Zcash ile Kullanmak

Şunu bilin ki **mevcut hiçbir Zcash düğümü yerel olarak I2P konuşmaz.** Zebra'da I2P desteği yoktur ve zcashd'de de yoktu. Bir Zcash düğümünü I2P üzerinden çalıştırdığını iddia eden bir rehber görürseniz, bu yazılımın yapmadığı bir şeyi anlatıyordur.

I2P'nin burada gerçekten faydalı olduğu alan, cüzdanın etrafındaki her şeydir: bir siteye, foruma veya hizmete adresinizi açığa çıkarmadan erişmek. Cüzdan bağlantısının kendisini anonimleştirmek için bugün pratik seçenek Tor'dur ve aşağıdaki bölümlerde bu anlatılmaktadır.

## Tor ve I2P ortak özellikler paylaşır, ancak önemli farkları da vardır. 

Tor ve I2P'nin her ikisi de merkeziyetsiz ve anonim eşler arası ağlardır, ancak I2P Tor'a kıyasla daha yüksek güvenlik seviyeleri sunar. Bununla birlikte, I2P öncelikle kendi ağı içinde e-posta, sohbet ve torrent gibi hizmetlere erişmek için tasarlanmıştır ve normal internete erişmek için kullanılamaz. Öte yandan Tor, kullanıcıların I2P gibi deep web'e erişmesine olanak tanır, ancak aynı zamanda surface web üzerindeki web sitelerine erişmek için normal bir tarayıcı olarak da işlev görür.

*Not: Tor ve I2P'nin benzerlikleri ve farklılıkları hakkında daha fazla bilgi için [burayı](https://geti2p.net/en/comparison/tor) ziyaret edin*

## Orbot ile mobil bir cüzdanı Tor üzerinden yönlendirme

Orbot, akıllı telefonlar için tasarlanmış, cihazınızdaki tüm uygulamalardan gelen trafiği Tor ağı üzerinden yönlendiren ücretsiz bir sanal özel ağdır (VPN).

Bir Zcash cüzdanını Tor üzerinden yönlendirmek için şu talimatları izleyin. Bu rehberin önceki sürümlerinde kullanılan Ywallet artık bakım almıyor ve Ironwood sonrasında ağı takip etmeyecek, bu yüzden [Wallets](/using-zcash/wallets) sayfasından bakım alan bir cüzdan seçin.

1.  Uygulama mağazasından *Orbot*'u indirin ve kurun.

2.  Kurulumdan sonra bir karşılama mesajı görünecektir. *Orbot* ana sayfasına devam edin ve *'Tor Enabled Apps'* seçeneğine tıklayın.              

3. Ekranda Tor ile uyumlu uygulamaları gösteren bir sayfa açılacaktır. Listede Zcash cüzdanınızı bulun ve seçili olduğundan emin olun.

4. Bir VPN kurmak için bir bağlantı isteği görünecektir; bu, *Orbot*'un ağ trafiğini izlemesine olanak tanıyacaktır. Bu izin onaylandıktan sonra *Orbot* başlatılacaktır. 

5. Tor'un çalıştığını doğrulamak için görev çubuğunu veya Orbot ana sayfasını kontrol edin; bunu, 'Connected to the Tor network' ifadesini gördüğünüzde doğrulamış olursunuz.

*Not: Tor mobil ağınız tarafından engelleniyorsa, bağlanmak için alternatif bir yol olarak bir Bridge Server kullanabilirsiniz.*


## PC veya masaüstünde Tor kurulumu

* Tor Browser resmi web sitesinden indirilebilir, bağlantıya [buradan](https://www.torproject.org/download/) erişebilirsiniz.

 Tor kurmanın en uygun yolu Tor Browser Bundle üzerinden yapmaktır. Başsız kurulumları tercih ediyorsanız, Tor daemon'unu ayrı olarak kurmayı seçebilirsiniz. 

*Not: Varsayılan olarak, Tor Browser paketi tcp/9150 üzerinde bir SOCKS dinleyicisi sunar ve Tor daemon tcp/9050 üzerinde SOCKS dinleyicisini sunar.*

* Tor Project tarafından sağlanan, işletim sisteminize özel kurulum [talimatlarına](https://support.torproject.org/apt/) bakın.

## Bir düğümü Tor üzerinden çalıştırmak

En çok değişen kısım burasıdır ve dürüst cevap, bunun şu anda eskisine göre daha zor olduğudur.

**zcashd artık yok.** Destek süresinin sonuna ulaştı ve 18 Temmuz 2026'da 3,417,100. blokta durdu. Yeniden başlamayacak, indirme sayfası 404 döndürüyor ve apt deposu artık sunulmuyor. Size `zcashd -proxy=127.0.0.1:9050` çalıştırmanızı söyleyen herhangi bir talimat artık hiçbir şey için geçerli değildir.

**Zebra da bunu henüz yapamıyor.** Zebra bakım alan düğümdür ve ağ crate'i Tor için yalıtılmış bağlantı kodu içerir, ancak özellik `zebra-network/Cargo.toml` içinde yorum satırına alınmıştır:

```
# tor = ["arti-client", "tor-rtcompat"]
```

Crate dokümantasyonu da aynı şeyi açıkça söylüyor: *"`arti-client` bağımlılığı olan `x25519-dalek v1.2.0` güncellenene kadar Tor bağlantıları şu anda devre dışı bırakılmıştır."* `connect_isolated_tor` fonksiyonu da bununla birlikte yorum satırına alınmıştır. Dolayısıyla bugün bir Zcash düğümünü Tor üzerinden çalıştırmanın desteklenen bir yolu yoktur.

Şu anda düğüm düzeyinde anonimlik gerekiyorsa, işe yarayan yaklaşım düğümün kendisini yapılandırmak yerine tüm makineyi işletim sistemi düzeyinde Tor veya bir VPN arkasına koymaktır. Bu, oluşturulmamış düğüm özelliklerine dayanmak zorunda kalmadan ağ konumunuzu korur.

### Bugün hâlâ yapabilecekleriniz

- **Mobilde cüzdanınızı Tor üzerinden yönlendirin**; yukarıda açıklandığı gibi Orbot ile. Bu, çoğu insan için pratik seçenektir ve cüzdanınızın konuştuğu lightwalletd sunucusundan IP adresinizi gizler
- **Tor Browser kullanın**; block explorer'lar, forumlar ve adresinizle ilişkilendirilmek istemeyeceğiniz diğer her şey için
- **Tor'un neyi gizlemediğini unutmayın.** Ağ konumunuzu anonimleştirir, zincir üstü etkinliğinizi değil. Şeffaf bir adresten gönderim yapmak hâlâ herkese açıktır ve korumalı havuzlar arasında geçen değer hâlâ miktarı yayımlar. Görünür kalanlar için [Shielded Pools](/using-zcash/shielded-pools) sayfasına bakın
