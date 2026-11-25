<a href="https://github.com/zechub/zechub/edit/main/site/guides/Nym_Mixnet_Wallet_Setup.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Sayfayı düzenle"/>
</a>

# Zcash Cüzdan Trafiğini Nym Mixnet Üzerinden Yönlendirme

> Son doğrulama: 29 Eylül 2026

Zcash korumalı işlemler Zincir üzerindeki işlem verilerini korur, ancak cüzdanlar yine de internet üzerinden iletişim kurar. Ağ gözlemcileri IP adresiniz, cüzdanınızın ne zaman bağlandığı ve hangi altyapıyla iletişim kurduğu gibi meta verileri öğrenebilir.

Nym ayrı bir ağ gizliliği katmanı sağlar. Eylül 2026 itibarıyla en iyi yaklaşım cüzdana bağlıdır:

1. **Yerleşik Nym entegrasyonu varsa cüzdanın bunu tercih edin.**
2. Aksi takdirde, cüzdana özgü proxy desteğine bağlı kalmadan cüzdanın ağ trafiğini Nym üzerinden yönlendirmek için **sistem düzeyinde NymVPN Mixnet modunu** kullanın.

VPN ve dVPN hakkında genel bilgi için [VPN ve dVPN](../Privacy_Tools/VPN_and_DVPN.md) sayfasına bakın.

## Nym neler sağlar — neleri sağlamaz

Korumalı bir Zcash ödemesi ile ağ gizliliği aracı farklı sorunları çözer:

- **Zcash korumalı havuzlar**, Zincir üzerindeki işlem ayrıntılarını korur.
- **Nym mixnet yönlendirmesi**, gerçek ağ kimliğiniz ile cüzdan trafiğini alan hizmet arasındaki ilişkilendirilebilirliği azaltmak üzere tasarlanmıştır.
- Sistem düzeyinde bir NymVPN tüneli üzerinden iletişim kurulan hedef, ev veya mobil IP adresiniz yerine bir Nym çıkış noktası görmelidir.

Nym mixnet'i, ağ meta verilerinin sızmasını azaltmak için birden çok atlama, paket karıştırma, rastgele gecikmeler, örtü trafiği ve soğan şifrelemesi kullanır.

Nym; güvenliği ihlal edilmiş bir cihaza, kötü amaçlı cüzdan yazılımına, açığa çıkmış kurtarma ifadelerine, borsa hesapları aracılığıyla ifşa ettiğiniz kimliğe veya şeffaf Zcash etkinliğinin yol açtığı gizlilik kaybına karşı **koruma sağlamaz**.

## Yerel Nym desteği: Varsa önce bunu kullanın

Nym, 24 Eylül 2026'da Zcash Community Grant çalışmalarının tamamlandığını ve yerel mixnet desteğinin gerçek Zcash cüzdanlarında sunulmaya başladığını duyurdu.

### Zingo! Cüzdan

Zingo PC yerel bir Nym aktarım katmanı içerir. Zingo Mobile da uygulama içi bir Nym proxy'si kullanan Mixnet Modu'nu iOS ve Android üzerinde sunar.

Zingo tarafından belgelenen mevcut davranış:

- Nym denetimi **Ayarlar → Nym Mixnet** altındadır.
- Ödeme gönderimleri mixnet üzerinden yönlendirilir.
- Ironwood geçiş iletimleri de aynı korumalı gönderim yolunu izler.
- ZEC fiyat istekleri de mixnet üzerinden yönlendirilir.
- Nym etkinleştirildiğinde gönderimler güvenli hata yaklaşımını izler: mixnet aktarım katmanı kullanılamıyorsa ödeme sessizce açık ağ üzerinden gönderilmez.
- **Zincir eşitlemesi şu anda Zingo PC içinde mixnet üzerinden yönlendirilmez.** Sıkıştırılmış bloklar, nullifier sorguları, işlem alımları, mempool trafiği ve sunucu durumu denetimleri normal sunucu bağlantısını kullanmaya devam eder.

Bu ayrım önemlidir: Zingo yerel entegrasyonu, ilişkilendirilebilirliğin en yüksek olduğu yayın yolunu korur, ancak henüz tüm cihaz trafiğini kapsayan bir ağ tüneli değildir.

Tehdit modeliniz eşitleme trafiğini de sunucudan gizlemeyi gerektiriyorsa, bunun getireceği ek gecikme ve karmaşıklığı da göz önünde bulundurarak NymVPN gibi sistem düzeyinde bir gizlilik tüneli kullanın.

Kaynaklar:

- https://github.com/zingolabs/zingo-pc#the-nym-mixnet
- https://github.com/zingolabs/zingo-mobile
- https://nym.com/blog/nym-mixnet-zcash-wallets

### Zkool

Nym, **Zkool** uygulamasının artık yerel bir düğmeyle Nym mixnet'i üzerinden Zcash RPC altyapısına bağlanmayı desteklediğini bildiriyor.

Zkool, YWallet uygulamasının aktif olarak sürdürülen devamıdır. Projesi ayrıca Zcash sunucu bağlantıları için Tor proxy kullanımını ve onion hizmetlerini destekler.

Belgelenmemiş bir proxy yoluyla eski bir YWallet derlemesini kullanmaya çalışmak yerine Zkool uygulamasının yerel Nym seçeneğini tercih edin.

Kaynaklar:

- https://nym.com/blog/nym-mixnet-zcash-wallets
- https://github.com/hhanh00/zkool2

### Nozy

NozyWallet uygulamasında da Nym uyumlu aktarım yolları bulunur. Mevcut uygulaması, giden işlem gönderimlerinin Nym mixnet'i üzerinden ve sıkıştırılmış blok eşitlemesinin ayrı bir Nym dVPN yolu üzerinden yönlendirilmesini destekler. Her cüzdan isteğinin otomatik olarak mixnet'i kullandığını varsaymak yerine bunları ayrı koruma yöntemleri olarak değerlendirin.

Kaynaklar:

- https://github.com/LEONINE-DAO/Nozy-wallet
- https://github.com/LEONINE-DAO/Nozy-wallet/blob/master/docs/reference/NYM_SEND_EGRESS_CASE_BREAKDOWN.md
- https://github.com/LEONINE-DAO/Nozy-wallet/blob/master/docs/reference/NYM_DVPN_SYNC_CASE_BREAKDOWN.md

### Zodl

Zodl uygulamasında şu anda yerleşik **Tor Koruması** bulunur; bu, yukarıda Zingo, Zkool ve Nozy için açıklanan yerel Nym entegrasyonuyla aynı değildir.

Zodl uygulamasının Tor özelliği; işlem gönderimlerini, işlem verilerinin alınmasını, döviz kuru isteklerini ve üçüncü taraf API çağrılarını Tor üzerinden yönlendirebilir. Nym, 24 Eylül 2026'da daha kapsamlı mixnet entegrasyonu hakkında Zodl ekibiyle görüşmelerinin sürdüğünü belirtti.

Bugün Zodl için şu seçeneklerden birini kullanın:

- Zodl uygulamasının belgelenmiş Tor Koruması veya
- Amacınız cüzdanın genel cihaz trafiğini Nym üzerinden yönlendirmekse sistem düzeyinde NymVPN.

Tor ve Nym ağlarının ikisi de gizlilik ağı olduğu için cüzdan içindeki aktarım yöntemlerinin birbirinin yerine kullanılabileceğini varsaymayın.

Zodl Tor ayarları:

**Daha Fazla → Gelişmiş Özellikler → Beta: Tor Koruması → Etkinleştir → Değişiklikleri kaydet**

Kaynaklar:

- https://support.zodl.com/article/17-enabling-tor-protection
- https://nym.com/blog/nym-mixnet-zcash-wallets

## Alternatif: sistem düzeyinde NymVPN

Cüzdanın Nym'a özgü proxy ayarlarını anlamasını gerektirmediği için en geniş uyumluluğa sahip Nym seçeneğidir.

### 1. NymVPN uygulamasını yükleyin

NymVPN uygulamasını yalnızca Nym'ın resmî web sitesinden veya resmî platform mağazasından indirin:

- https://nym.com/
- https://nym.com/blog/nymvpn-v2026.12

NymVPN; Android, iOS, Linux, Windows ve macOS'u destekler.

### 2. Mixnet modunu seçin

NymVPN, daha düşük gecikme için optimize edilmiş 2 atlamalı bir dVPN yolu olan **Hızlı mod** ile daha güçlü ağ meta verisi koruması için optimize edilmiş 5 atlamalı bir mixnet yolu olan **Mixnet modu** seçeneklerini sunar. Hassas cüzdan işlemleri için Mixnet modunu seçin ve cüzdanı açmadan veya yenilemeden önce istemcinin bağlantının kurulduğunu bildirmesini bekleyin.

### 3. Cüzdanın normal ağ ayarlarını kullanmasına izin verin

İşletim sistemi trafiği zaten NymVPN üzerinden tünelliyorsa çoğu cüzdan özel proxy ayarlarına ihtiyaç duymaz.

Cüzdanı normal şekilde açın ve eşitlemenin tamamlanmasına izin verin.

NymVPN platformunuzda bölünmüş tünelleme sunuyorsa cüzdanın bir atlama veya hariç tutma listesine alınmadığını, **korumalı tünele dahil edildiğini** doğrulayın.

### 4. Cüzdanı kullanmadan önce tüneli doğrulayın

Sistem düzeyinde basit bir denetim:

1. NymVPN bağlantısını kesin.
2. Herkese açık bir IP denetleme hizmetini ziyaret edin veya masaüstünde şunu çalıştırın:

   ```bash
   curl https://api.ipify.org
   ```

3. Görünen IP adresini kaydedin.
4. Mixnet modunda NymVPN bağlantısını kurun.
5. Denetimi tekrarlayın.

Görünen herkese açık IP adresi değişmiş olmalıdır.

Bu, sistem tünelinin çalıştığını doğrular. Uygulamanın veya işletim sisteminin özel yönlendirme kuralları varsa belirli bir cüzdanın yaptığı her isteğin aynı yolu izlediğini **kanıtlamaz**.

Masaüstünde daha fazla güvence için:

- işletim sisteminin ağ izleme aracını kullanarak cüzdan sürecini inceleyin,
- bölünmüş tünel dışında bırakılmadığını doğrulayın,
- NymVPN bağlantısı kesildiğinde cüzdan davranışının beklendiği gibi değiştiğini teyit edin.

Sorun giderirken cüzdan adreslerini, bakiyeleri, işlem kimliklerini, IP adreslerini veya kurtarma bilgilerini içeren ekran görüntülerini paylaşmayın.

## NymVPN dApp / cüzdan proxy modu

NymVPN, mixnet üzerinden SOCKS5 / RPC yönlendirmesi kullanan bir uygulama ve cüzdan proxy modu da sunar.

Nym'ın herkese açık kurulum belgelerinde bu özellik ağırlıklı olarak Ethereum tarzı RPC yapılandırmasıyla gösterilir. Uyumlu, genel bir proxy/RPC yolunu açıkça destekleyen yazılımlar için kullanışlıdır, ancak her Zcash cüzdanında çalıştığı **varsayılmamalıdır**.

Bu yolu yalnızca cüzdanın kendi belgelerinde uyumlu proxy veya RPC desteği doğrulanıyorsa kullanın.

Aksi takdirde şunları tercih edin:

- cüzdanın yerel Nym entegrasyonu veya
- sistem düzeyinde NymVPN.

## Performans ve zaman aşımı ödünleşimleri

Mixnet'ler, daha güçlü meta veri koruması sağlamak için bilerek hızdan ödün verir.

Şunlar etkilenebilir:

- cüzdanın ilk eşitlemesi,
- büyük eşitleme birikimlerini tamamlama,
- işlem geçmişi sorguları,
- RPC zaman aşımı,
- üçüncü taraf API çağrıları.

Uygulamaya yönelik öneriler:

- Varsayılan Nym ayarlarıyla başlayın.
- İlk eşitlemenin veya uzun süren eşitleme birikimlerini tamamlamanın daha uzun süreceğini göz önünde bulundurun.
- Gizlilik ayarlarını gevşetmeden önce zaman aşımına uğrayan işlemi yeniden deneyin.
- Hassas bir işlemden hemen önce gizlilik modları arasında tekrar tekrar geçiş yapmaktan kaçının.
- Toplu eşitleme için daha hızlı bir yol kullanırsanız, bu süre boyunca iletişim kurulan altyapının gerçek ağ kimliğinizi görebileceğini unutmayın.
- Özellikle Zingo PC için yerel Nym aktarım katmanının şu anda gönderimleri ve fiyat sorgularını koruduğunu, eşitlemenin ise doğrudan gerçekleştiğini unutmayın.

## Mobil cihazlarla ilgili noktalar

Android ve iOS'ta genel cüzdan trafiğini NymVPN üzerinden yönlendirmenin en kolay yolu genellikle işletim sisteminin VPN yuvasıdır: önce NymVPN bağlantısını kurun, sonra cüzdanı açın.

Başka bir VPN, güvenlik duvarı veya yerel VPN tabanlı reklam engelleyici sistemin VPN arayüzünü zaten kullanıyorsa iki ürün aynı anda çalışamayabilir. Cüzdanın korunduğunu varsaymadan önce işletim sisteminin VPN durumunu doğrulayın.

## Tehdit modeli kontrol listesi

Bu yapılandırmaya güvenmeden önce şunları sorun:

- Uygun durumlarda korumalı Zcash adresleri kullanıyor muyum?
- Cüzdanımın yerel Nym desteği var mı?
- Varsa bu yerel entegrasyon tam olarak hangi trafiği koruyor?
- Daha geniş kapsamlı korumaya ihtiyacım varsa cüzdan ağ etkinliği başlatmadan önce NymVPN bağlantısı kurulmuş mu?
- Cüzdan bölünmüş tünelleme kuralıyla kapsam dışında bırakılmış mı?
- Cüzdan belgelerinde gerçekten yer alan bir proxy modunu mu kullanıyorum?
- Bir borsa, tarayıcı oturumu, üçüncü taraf API'si veya şeffaf adres üzerinden kimliğimi açığa çıkarıyor muyum?
- Daha yavaş eşitlemeye ve zaman zaman yaşanabilecek zaman aşımlarına hazırlıklı mıyım?

## Kaynaklar

- Nym: Zcash cüzdanlarında Nym mixnet'i kullanıma sunuldu, 24 Eylül 2026: https://nym.com/blog/nym-mixnet-zcash-wallets
- Zingo PC Nym davranışı: https://github.com/zingolabs/zingo-pc#the-nym-mixnet
- Zingo Mobile Nym aktarım katmanı: https://github.com/zingolabs/zingo-mobile
- Zkool deposu: https://github.com/hhanh00/zkool2
- NozyWallet Nym aktarım katmanı çalışması: https://github.com/LEONINE-DAO/Nozy-wallet
- NymVPN v2026.12: https://nym.com/blog/nymvpn-v2026.12
- Zodl Tor Koruması: https://support.zodl.com/article/17-enabling-tor-protection
