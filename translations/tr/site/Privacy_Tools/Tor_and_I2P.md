<a href="https://github.com/zechub/zechub/edit/main/site/Privacy_Tools/Tor_and_I2P.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Sayfayı düzenle"/>
</a>


# Gizlilik Neden Önemlidir?

## Özet

- **Tor**, trafiğinizi üç aktarıcı üzerinden yönlendirir ve hem normal web’de hem de onion hizmetlerinde çalışır — günümüzde cüzdan bağlantılarını ve gezinme etkinliğini anonimleştirmek için en kullanışlı varsayılan seçenektir
- **I2P**, kendi dahili hizmetleri için tasarlanmış, tamamen şifrelenmiş bir eşler arası yer paylaşım ağıdır; **güncel hiçbir Zcash düğümü I2P’yi yerel olarak desteklemez**
- **Mobilde:** Bir Zcash cüzdanını Orbot ile birkaç dokunuşta Tor üzerinden yönlendirin (“Tor Etkin Uygulamalar”)
- **Şu anda Zcash düğümünü Tor üzerinden çalıştırmak mümkün değil:** `zcashd`, 18 Temmuz 2026’da destek süresinin sonuna ulaştı ve Zebra'ın Tor özelliği upstream depoda hâlâ devre dışı
- Tor *nerede olduğunuzu* gizler, *zincir üstünde ne yaptığınızı* değil — şeffaf işlemler herkese açık kalır

Dijital çağda [gizliliğinizi](https://www.privacyguides.org/en/) korumak giderek daha önemli hâle geldi. Bazıları gizliliği kaybedilmiş bir dava olarak görse de öyle değildir. Gizliliğiniz tehlikededir ve önemsenmesi gerekir. Gizlilik, güçle ilişkili olduğu için büyük değer taşır; bu gücün sorumlu biçimde kullanılmasını sağlamak çok önemlidir.

## Tor ve I2P Teknolojileri

## Tor

[Tor](https://www.privacyguides.org/en/tor/?h=tor), uygulamalar için bağlantı kurmak üzere Tor ağını kullanan bir vekil araçtır. Tor, uygulamaların trafiğini Tor üzerinden yönlendirerek [gizlilik ve anonimliği](https://www.torproject.org/) artırır.

## I2P Ağı

[Görünmez İnternet Projesi](https://geti2p.net/en/about/intro) olarak da bilinen I2P ağı, tamamen şifrelenmiş bir eşler arası yer paylaşım ağıdır. İletilerin içeriğinin, kaynağının ve hedefinin gözlemcilerden gizlenmesini sağlar. Başka bir deyişle, hiç kimse trafiğin kaynağını veya hedefini ya da iletilen mesajların gerçek içeriğini göremez. I2P’de kullanılan şifreleme, kullanıcıları için yüksek düzeyde gizlilik ve anonimlik sağlar.

### I2P’yi yükleme

İki uygulama vardır. Özgün [Java I2P](https://geti2p.net/en/download), Windows, macOS, Linux ve Android üzerinde çalışır. C++ ile yazılmış [i2pd](https://i2pd.website/) daha hafiftir ve sunucularda veya düşük güçlü makinelerde genellikle tercih edilir.

Çalışmaya başladıktan sonra I2P, `127.0.0.1:7657` adresinde yerel bir konsol ve `127.0.0.1:4444` (HTTP) ile `127.0.0.1:4447` (SOCKS) adreslerinde vekil sunucular sağlar. İlk başlatmada birkaç dakika sürmesini bekleyin: I2P’nin herhangi bir şey çalışmadan önce ağ üzerinden tüneller kurması gerekir. Çevrimiçi kaldıkça da hızlanır.

### I2P’yi Zcash ile kullanma

Şunu unutmayın: **Güncel hiçbir Zcash düğümü I2P’yi yerel olarak desteklemez.** Zebra I2P desteğine sahip değildir; zcashd de sahip değildi. I2P üzerinden bir Zcash düğümünün çalıştırılmasını anlattığını iddia eden bir kılavuz görürseniz, yazılımın yapmadığı bir şeyi tarif ediyordur.

Burada I2P’nin gerçekten yararlı olduğu alan, cüzdanla ilgili her şeydir: adresinizi açığa çıkarmadan bir siteye, foruma veya hizmete ulaşmak. Cüzdan bağlantısını anonimleştirmek için günümüzde kullanışlı seçenek Tor’dır; aşağıdaki bölümlerde bu konu ele alınmaktadır.

## Tor ve I2P ortak özelliklere sahip olsa da önemli farklılıkları da vardır.

Hem Tor hem de I2P merkeziyetsiz ve anonim eşler arası ağlardır; ancak I2P, Tor'e kıyasla daha yüksek güvenlik düzeyleri sunar. Bununla birlikte I2P, öncelikle kendi ağı içindeki e-posta, sohbet ve torrent gibi hizmetlere erişmek için tasarlanmıştır ve normal internete erişmek için kullanılamaz. Öte yandan Tor, kullanıcıların tıpkı I2P’de olduğu gibi derin ağa erişmesini sağlar; ayrıca açık web’deki sitelere erişmek için normal bir tarayıcı işlevi de görür.

*Not: Tor ve I2P arasındaki benzerlikler ve farklılıklar hakkında daha fazla bilgi için [burayı](https://geti2p.net/en/comparison/tor) ziyaret edin.*

## Tor üzerinden mobil cüzdan trafiğini Orbot ile yönlendirme

Orbot, cihazınızdaki tüm uygulamaların trafiğini Tor ağı üzerinden yönlendiren, akıllı telefonlar için ücretsiz bir sanal özel ağdır (VPN).

Bir Zcash cüzdanını Tor üzerinden yönlendirmek için şu talimatları izleyin. Bu kılavuzun önceki sürümlerinde kullanılan YWallet artık güncellenmiyor ve Ironwood sonrasında ağı takip etmeyecek; bu nedenle [Cüzdanlar](/using-zcash/wallets) sayfasından güncel tutulan bir cüzdan seçin.

1. Uygulama mağazasından *Orbot* uygulamasını indirin ve yükleyin.

2. Yükleme tamamlandıktan sonra bir karşılama mesajı görünür. *Orbot* ana sayfasına geçin ve *“Tor Etkin Uygulamalar”* seçeneğine dokunun.

3. Ekranda Tor ile uyumlu uygulamaları gösteren bir sayfa açılır. Listeden Zcash cüzdanınızı bulun ve seçili olduğundan emin olun.

4. VPN kurmak için bir bağlantı isteği görünür ve bu, *Orbot* uygulamasının ağ trafiğini izlemesine olanak tanır. Bu izin verildikten sonra *Orbot* başlatılır.

5. Orbot ana sayfasını veya görev çubuğunu kontrol ederek Tor uygulamasının çalıştığını doğrulayın. “Tor ağına bağlandı” mesajını gördüğünüzde bağlantı kurulmuş demektir.

*Not: Tor mobil ağınız tarafından engelleniyorsa bağlantı kurmak için alternatif olarak bir Köprü Sunucusu kullanabilirsiniz.*


## Tor’ı bilgisayara veya masaüstüne yükleme

* Tor tarayıcısı resmî web sitesinden indirilebilir; bağlantıya [buradan](https://download.torproject.org/) erişebilirsiniz.

 Tor’ı yüklemenin en kolay yolu Tor Tarayıcı Paketini kullanmaktır. Başsız kurulumları tercih ediyorsanız Tor arka plan hizmetini ayrıca yükleyebilirsiniz.

*Not: Varsayılan olarak Tor Tarayıcı Paketi tcp/9150 üzerinde bir SOCKS dinleyicisi, Tor arka plan hizmeti ise tcp/9050 üzerinde bir SOCKS dinleyicisi sağlar.*

* Tor Projesi tarafından sağlanan, işletim sisteminize özgü yükleme [talimatlarına](https://support.torproject.org/little-t-tor/getting-started/installing/) bakın.

## Tor üzerinden düğüm çalıştırma

En çok değişen bölüm burası ve dürüst yanıt şu: Şu anda bunu yapmak eskisinden daha zor.

**zcashd artık yok.** Destek süresi sona erdi ve 18 Temmuz 2026’da 3.417.100. blokta durdu. Yeniden başlatılmayacak; indirme sayfası 404 hatası veriyor ve apt deposu artık sunulmuyor. `zcashd -proxy=127.0.0.1:9050`’ı çalıştırmanızı söyleyen talimatlar artık hiçbir şey için geçerli değil.

**Zebra da henüz bunu yapamıyor.** Zebra, bakımı sürdürülen düğümdür ve ağ crate’i Tor için yalıtılmış bağlantı kodu içerir; ancak bu özellik `zebra-network/Cargo.toml` içinde yorum satırına alınmıştır:

```
# tor = ["arti-client", "tor-rtcompat"]
```

Crate belgeleri de bunu açıkça söylüyor: *“Tor bağlantıları, `arti-client` bağımlılığı `x25519-dalek v1.2.0` güncellenene kadar şu anda devre dışıdır.”* `connect_isolated_tor` işlevi de aynı şekilde yorum satırına alınmıştır. Dolayısıyla bugün bir Zcash düğümünü Tor üzerinden çalıştırmanın desteklenen bir yolu yoktur.

Şu anda düğüm düzeyinde anonimlik istiyorsanız, uygulanabilir yöntem düğümün kendisini yapılandırmak yerine tüm makineyi işletim sistemi düzeyinde Tor veya bir VPN arkasına almaktır. Bu, henüz yazılıma eklenmemiş düğüm özelliklerine bağlı kalmadan ağ konumunuzu korur.

### Bugün hâlâ yapabilecekleriniz

- **Yukarıda açıklandığı gibi, mobil cihazınızda Orbot ile cüzdanınızı Tor üzerinden yönlendirin.** Bu, çoğu kişi için en kullanışlı seçenektir ve cüzdanınızın iletişim kurduğu lightwalletd sunucusundan IP adresinizi gizler
- **Blok gezginleri, forumlar ve adresinizle ilişkilendirilmek istemediğiniz diğer içerikler için Tor Tarayıcısını kullanın**
- **Tor uygulamasının neleri gizlemediğini unutmayın.** Ağ konumunuzu anonimleştirir, zincir üstü etkinliğinizi değil. Şeffaf bir adresten gönderim yapmak herkese açık olmaya devam eder ve korumalı havuzlar arasında aktarılan değer miktarı yayımlar. Görünür kalmaya devam eden bilgiler için [Korumalı Havuzlar](/using-zcash/shielded-pools) sayfasına bakın

## İlgili sayfalar

- [VPN ve DVPN](VPN_and_DVPN.md) — VPN alternatifleri ve karşılaştırmaları
- [Web Tarayıcıları](Web_Browsers.md) — gündelik gizlilik için tarayıcı güvenliğini artırma
- [Güvenli Mesajlaşma Uygulamaları](Secure_Messengers.md) — gizli iletişim araçları
- [Bir Blok Gezgini Neleri Görebilir?](../Zcash_Tech/What_a_Block_Explorer_Can_See.md) — düğüm düzeyindeki gizliliğin neleri koruyup neleri korumadığı
- [Korumalı Havuzlar](/using-zcash/shielded-pools) — ağ katmanındaki anonimlik kullanılsa bile zincir üstünde görünür kalanlar
