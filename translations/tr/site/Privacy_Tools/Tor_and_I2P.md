<a href="https://github.com/zechub/zechub/edit/main/site/Privacy_Tools/Tor_and_I2P.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>


# Gizlilik Neden Önemlidir

Dijital çağda, [gizliliğinizi](https://www.privacyguides.org/en/) korumak giderek daha hayati hale gelmiştir. Bazıları gizliliği kaybedilmiş bir dava olarak görebilir, ancak öyle değildir. Gizliliğiniz risk altındadır ve önemsenmesi gereken bir konudur. Gizlilik, güç ile ilişkili olduğu için önemli bir değere sahiptir ve bu gücün sorumlu bir şekilde kullanıldığından emin olmak kritik önemdedir.

## Tor & I2P Teknolojileri

## Tor

[Tor](https://www.privacyguides.org/en/tor/?h=tor), uygulamalar için bağlantılar kurmak amacıyla Tor ağını kullanan bir proxy aracıdır. Torbot bunu, uygulamaların trafiğini Tor üzerinden yönlendirerek gerçekleştirir; böylece bu uygulamalar için [gizlilik ve anonimlik](https://www.torproject.org/) artırılmış olur.

## I2P Ağı

[I2P ağı](https://geti2p.net/en/about/intro) olarak da bilinen Invisible Internet Project, tamamen şifrelenmiş eşler arası bir örtü ağdır. Mesajların içeriğinin, kaynağının ve hedefinin gözlemcilerden gizli kalmasını sağlar. Başka bir deyişle, hiç kimse trafiğin kaynağını veya hedefini ya da iletilen mesajların gerçek içeriğini göremez. I2P’de kullanılan şifreleme, kullanıcıları için yüksek düzeyde gizlilik ve anonimlik sağlar.

## Tor ve I2P ortak özellikler paylaşır, ancak önemli farklılıklara da sahiptir. 

Hem Tor hem de I2P merkeziyetsiz ve anonim eşler arası ağlardır, ancak I2P Tor’a kıyasla daha yüksek güvenlik seviyeleri sunar. Bununla birlikte, I2P öncelikle kendi ağı içinde e-posta, sohbet ve torrent gibi hizmetlere erişmek için tasarlanmıştır ve normal internete erişmek için kullanılamaz. Öte yandan Tor, tıpkı I2P gibi kullanıcıların deep web’e erişmesine olanak tanır, ancak aynı zamanda surface web’deki web sitelerine erişmek için normal bir tarayıcı gibi de çalışır.

*Not: Tor & I2P arasındaki benzerlikler ve farklılıklar hakkında daha fazla bilgi için [burayı](https://geti2p.net/en/comparison/tor) ziyaret edin*

## Akıllı Telefonda Tor’u Ywallet ile Entegre Etme

Orbot, cihazınızdaki tüm uygulamaların trafiğini Tor ağı üzerinden yönlendiren, akıllı telefonlar için tasarlanmış ücretsiz bir sanal özel ağdır (VPN).

Tor’u Zcash Cüzdanına *(Ywallet)* bağlamak için aşağıdaki talimatları izleyin:

1.  Uygulama mağazasından *Orbot*’u indirip kurun.

2.  Kurulumdan sonra bir karşılama mesajı görünecektir. *Orbot* ana sayfasına devam edin ve *'Tor Enabled Apps'* seçeneğine tıklayın.              

3. Bu, ekranda Tor ile uyumlu uygulamaları gösteren bir sayfa açacaktır. *Ywallet* uygulamasını bulun ve seçili olduğundan emin olun.

4. *Orbot*’un ağ trafiğini izlemesine izin verecek bir VPN kurulum bağlantı isteği görünecektir. Bu izin onaylandıktan sonra *Orbot* başlatılacaktır. 

5. Tor’un çalıştığını doğrulamak için görev çubuğunu veya Orbot ana sayfasını kontrol edin; bunu, 'Connected to the Tor network' ifadesini gördüğünüzde anlayabilirsiniz.

* Video eğitimini izlemek için [buraya](https://drive.google.com/file/d/12ODTLrjgSzYFeAOTrv-P9LvfBVOvrSXK/view?usp=sharing) bakın

*Not: Tor mobil ağınız tarafından engelleniyorsa, bağlanmak için alternatif bir yol olarak Bridge Server kullanabilirsiniz.*


## PC/Masaüstünde Torbot ile bir Zcash cüzdanı nasıl kurulur

## Zcash’te Tor desteği var mı?

* Tor browser resmi web sitesinden indirilebilir, bağlantıya [buradan](https://www.torproject.org/download/) ulaşabilirsiniz.

 Tor’u kurmanın en pratik yolu Tor Browser Bundle üzerinden yapmaktır. Başsız kurulumları tercih ediyorsanız, Tor daemon’u ayrı olarak kurmayı seçebilirsiniz. 

*Not: Varsayılan olarak, Tor Browser bundle tcp/9150 üzerinde bir SOCKS dinleyicisi açar ve Tor daemon tcp/9050 üzerinde SOCKS dinleyicisini açar.*

* Tor Project tarafından sağlanan, işletim sisteminize özel kurulum [talimatlarına](https://support.torproject.org/apt/) bakın.

## Zcashd cüzdanını kurun

Zcashd, Electric Coin Company’nin çekirdek geliştiricileri tarafından güncellenen ve bakımı yapılan resmi Linux tabanlı full-node cüzdandır. Zcash madenciliği yapmak ve işlemleri doğrulamak isteyebilecek kullanıcıların yanı sıra Zcash gönderip almak isteyen kullanıcılar için tasarlanmıştır.

* Zcashd Wallet’ı indirmek için resmi web sitesine [buradan](https://electriccoin.co/zcashd/) ulaşabilirsiniz. 

* Cüzdanı kurun: Zcash cüzdan geliştiricileri tarafından sağlanan eğitim videosunun bağlantısı [burada](https://www.youtube.com/watch?v=hTKL0jPu7X0).

##  Zcashd’yi Tor üzerinden çalıştırın 

* Zcashd’yi Tor SOCKS proxy kullanacak şekilde yapılandırmak için, daemon komutuna -proxy komut satırı argümanını ekleyebilirsiniz.

 Örneğin:

  $ zcashd -proxy=127.0.0.1:9050
      
Alternatif olarak, zcash.conf dosyasına aşağıdaki satırı ekleyin:

  proxy=127.0.0.1:9050

Yapılandırma değişikliklerinin etkili olması için zcashd’yi yeniden başlatmanız tavsiye edilir.

Bunun, Tor daemon’un kullanıldığını varsaydığını unutmayın. Eğer Tor Browser Bundle kullanılıyorsa, 9050 yerine 9150 yazın.

Ek olarak, düğümünüzün erişilebilir olacağı bir .onion adresi oluşturması için daemon’a -listenonion komut satırı argümanını ekleyebilirsiniz.
