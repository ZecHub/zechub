<a href="https://github.com/zechub/zechub/edit/main/site/Privacy_Tools/Nym_Mixnet_Wallet_Setup.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edihttps://github.com/ZecHub/zechub/pull/2238t Page"/>
</a>

# Zcash Cüzdan Trafiğini Nym Mixnet Üzerinden Yönlendirin

> Son doğrulama: 29 Eylül 2026

Zcash korumalı işlemler zincir üzerindeki işlem verilerini korur, ancak cüzdanlar yine de internet üzerinden iletişim kurar. Ağ gözlemcileri potansiyel olarak IP adresiniz, cüzdanınızın ne zaman bağlandığı ve hangi altyapıyla iletişim kurduğu gibi meta verileri öğrenebilir.

Nym, ayrı bir ağ gizliliği katmanı ekler. Eylül 2026 itibarıyla en iyi yaklaşım cüzdana bağlıdır:

1. **Mevcut olduğunda cüzdanın yerel Nym entegrasyonunu tercih edin.**
2. Aksi durumda, cüzdana özgü proxy desteğine bağlı olmadan cüzdanın ağ trafiğinin Nym üzerinden yönlendirilmesi için **sistem düzeyinde NymVPN Mixnet modunu** kullanın.

Genel VPN ve dVPN bilgileri için [VPN ve dVPN](./VPN_and_DVPN.md) sayfasına bakın.

## Nym ne ekler — ve ne eklemez

Korumalı bir Zcash ödemesi ile bir ağ gizliliği aracı farklı sorunları çözer:

- **Zcash korumalı havuzları** zincir üzerindeki işlem ayrıntılarını korur.
- **Nym mixnet yönlendirmesi**, gerçek ağ kimliğiniz ile cüzdan trafiğini alan hizmet arasındaki ilişkilendirilebilirliği azaltmak üzere tasarlanmıştır.
- Sistem düzeyindeki bir NymVPN tüneli aracılığıyla iletişim kurulan bir hedef, ev/mobil IP'niz yerine bir Nym çıkışı görmelidir.

Nym'in mixnet'i ağ meta verisi sızıntısını azaltmak için birden fazla atlama, paket karıştırma, rastgele gecikmeler, örtü trafiği ve onion şifrelemesi kullanır.

Nym; ele geçirilmiş bir cihaza, kötü amaçlı cüzdan yazılımına, açığa çıkmış kurtarma ifadelerine, borsa hesapları aracılığıyla ifşa ettiğiniz kimliğe veya şeffaf Zcash etkinliğinin neden olduğu gizlilik kaybına karşı **koruma sağlamaz**.

## Yerel Nym desteği: mevcut olduğunda önce bunu kullanın

Nym, 24 Eylül 2026'da Zcash Community Grant çalışmasının tamamlandığını ve yerel mixnet desteğinin gerçek Zcash cüzdanlarında kullanıma sunulduğunu duyurdu.

### Zingo! Wallet

Zingo PC yerel bir Nym aktarımı içerir. Zingo Mobile ayrıca uygulama içi bir Nym proxy kullanarak iOS ve Android'de Mixnet Mode sunar.

Zingo tarafından belgelenen mevcut davranış:

- Nym denetimi **Settings → Nym Mixnet** altında bulunur.
- Ödeme gönderimi mixnet üzerinden yönlendirilir.
- Ironwood geçiş aktarımları aynı korumalı gönderim yolunu izler.
- ZEC fiyat istekleri de mixnet üzerinden yönlendirilir.
- Nym etkinleştirildiğinde gönderim kapalı şekilde başarısız olur: mixnet aktarımı kullanılamıyorsa ödeme clearnet üzerinden sessizce gönderilmez.
- Zingo PC içinde **zincir senkronizasyonu şu anda mixnet üzerinden yönlendirilmez**. Kompakt bloklar, nullifier sorguları, işlem getirmeleri, mempool trafiği ve sunucu sağlık kontrolleri hâlâ normal sunucu bağlantısını kullanır.

Bu ayrım önemlidir: Zingo'in yerel entegrasyonu en yüksek ilişkilendirme riskine sahip yayın yolunu korur, ancak henüz tam cihaz düzeyinde bir ağ tüneli değildir.

Tehdit modeliniz senkronizasyon trafiğinin de sunucudan gizlenmesini gerektiriyorsa, bunun getirdiği ek gecikmeyi ve karmaşıklığı anlayarak NymVPN gibi sistem düzeyinde bir gizlilik tünelini de kullanın.

Kaynaklar:

- https://github.com/zingolabs/zingo-pc#the-nym-mixnet
- https://github.com/zingolabs/zingo-mobile
- https://nym.com/blog/nym-mixnet-zcash-wallets

### Zkool

Nym, **Zkool** uygulamasının artık yerel bir anahtar kullanarak Nym mixnet üzerinden Zcash RPC altyapısına bağlanmayı desteklediğini bildiriyor.

Zkool, YWallet uygulamasının aktif olarak sürdürülen halefidir. Projesi ayrıca Zcash sunucu bağlantıları için Tor proxy kullanımını ve onion hizmetlerini destekler.

Belgelenmemiş bir proxy yoluyla eski bir YWallet derlemesini zorlamaya çalışmak yerine Zkool'in yerel Nym seçeneğini tercih edin.

Kaynaklar:

- https://nym.com/blog/nym-mixnet-zcash-wallets
- https://github.com/hhanh00/zkool2

### Nozy

NozyWallet ayrıca Nym farkındalığı olan aktarım yollarına sahiptir. Mevcut uygulaması, giden işlem gönderimlerinin Nym mixnet üzerinden yönlendirilmesini ve kompakt blok senkronizasyonu için ayrı bir Nym dVPN yolunu destekler. Her cüzdan isteğinin otomatik olarak mixnet'i kullandığını varsaymak yerine, bunları ayrı korumalar olarak değerlendirin.

Kaynaklar:

- https://github.com/LEONINE-DAO/Nozy-wallet
- https://github.com/LEONINE-DAO/Nozy-wallet/blob/master/docs/reference/NYM_SEND_EGRESS_CASE_BREAKDOWN.md
- https://github.com/LEONINE-DAO/Nozy-wallet/blob/master/docs/reference/NYM_DVPN_SYNC_CASE_BREAKDOWN.md

### Zodl

Zodl şu anda Zingo, Zkool ve Nozy için yukarıda açıklanan aynı yerel Nym entegrasyonuna değil, yerleşik **Tor Protection** özelliğine sahiptir.

Zodl'un Tor özelliği işlem gönderimlerini, işlem verisi alımlarını, döviz kuru isteklerini ve üçüncü taraf API çağrılarını Tor üzerinden yönlendirebilir. Nym, 24 Eylül 2026'da daha kapsamlı mixnet entegrasyonu hakkında Zodl ekibiyle hâlâ aktif görüşmeler yürüttüğünü belirtti.

Bugün Zodl için şunlardan birini kullanın:

- Zodl'un belgelenmiş Tor Protection özelliğini veya
- amacınız cüzdanın genel cihaz trafiğini Nym üzerinden yönlendirmekse sistem düzeyinde NymVPN kullanmayı.

İkisinin de gizlilik ağı olması nedeniyle Tor ve Nym'in cüzdan içinde birbirinin yerine kullanılabilir aktarımlar olduğunu varsaymayın.

Zodl Tor ayarları:

**More → Advanced Features → Beta: Tor Protection → Enable → Save changes**

Kaynaklar:

- https://support.zodl.com/article/17-enabling-tor-protection
- https://nym.com/blog/nym-mixnet-zcash-wallets

## Geri dönüş: sistem düzeyinde NymVPN

Bu, cüzdanın Nym'e özgü proxy ayarlarını anlamasını gerektirmediği için en geniş uyumluluğa sahip Nym seçeneğidir.

### 1. NymVPN yükleyin

NymVPN uygulamasını yalnızca Nym'in resmi web sitesinden veya resmi platform mağazasından indirin:

- https://nym.com/
- https://nym.com/blog/nymvpn-v2026.12

NymVPN Android, iOS, Linux, Windows ve macOS'u destekler.

### 2. Mixnet modunu seçin

NymVPN, daha düşük gecikme için optimize edilmiş 2 atlamalı dVPN yolu olan **Fast mode** ile daha güçlü ağ meta verisi koruması için optimize edilmiş 5 atlamalı mixnet yolu olan **Mixnet mode** sunar. Hassas cüzdan etkinliği için Mixnet modunu seçin ve cüzdanı açmadan veya yenilemeden önce istemcinin bağlantının kurulduğunu bildirmesini bekleyin.

### 3. Cüzdanı normal ağ ayarlarında bırakın

İşletim sistemi trafiği zaten NymVPN üzerinden tünelliyorsa, çoğu cüzdanın özel proxy ayarlarına ihtiyacı yoktur.

Cüzdanı normal şekilde açın ve senkronize olmasına izin verin.

NymVPN platformunuzda bölünmüş tünelleme sunuyorsa cüzdanın bir atlama veya hariç tutma listesine konulmadığını, **korumalı tünele dahil edildiğini** doğrulayın.

### 4. Cüzdanı kullanmadan önce tüneli doğrulayın

Basit bir sistem düzeyi kontrol:

1. NymVPN bağlantısını kesin.
2. Herkese açık bir IP kontrol hizmetini ziyaret edin veya masaüstünde şunu çalıştırın:

   ```bash
   curl https://api.ipify.org
   ```

3. Görünen IP'yi kaydedin.
4. NymVPN uygulamasını Mixnet modunda bağlayın.
5. Kontrolü tekrarlayın.

Görünen herkese açık IP değişmelidir.

Bu, sistem tünelini doğrular. Ancak uygulamanın veya işletim sisteminin özel yönlendirme kuralları varsa, belirli bir cüzdanın yaptığı her isteğin aynı yolu izlediğini kanıtlamaz.

Masaüstünde daha fazla güvence için:

- cüzdan sürecini işletim sisteminin ağ izleyicisiyle inceleyin,
- bölünmüş tünel hariç tutması olmadığını doğrulayın,
- NymVPN bağlantısı kesildiğinde beklenen cüzdan davranışının değiştiğini onaylayın.

Sorun giderirken cüzdan adresleri, bakiyeler, işlem kimlikleri, IP adresleri veya kurtarma materyali içeren ekran görüntülerini paylaşmayın.

## NymVPN dApp / cüzdan proxy modu

NymVPN ayrıca mixnet üzerinden SOCKS5 / RPC yönlendirmesi kullanan bir uygulama ve cüzdan proxy modu sunar.

Nym'in herkese açık kurulum belgeleri bunu çoğunlukla Ethereum tarzı RPC yapılandırmasıyla gösterir. Uyumlu genel bir proxy/RPC yolunu açıkça destekleyen yazılımlar için yararlıdır, ancak her Zcash cüzdanıyla çalışacağı varsayılmamalıdır.

Bu yolu yalnızca cüzdanın kendi belgeleri uyumlu proxy veya RPC desteğini doğruladığında kullanın.

Aksi durumda şunları tercih edin:

- cüzdanın yerel Nym entegrasyonunu veya
- sistem düzeyinde NymVPN kullanımını.

## Performans ve zaman aşımı ödünleşimleri

Mixnet'ler daha güçlü meta veri koruması karşılığında bilerek hızdan ödün verir.

Şunlar üzerinde olası etkiler bekleyin:

- ilk cüzdan senkronizasyonu,
- büyük telafi senkronizasyonları,
- işlem geçmişi sorguları,
- RPC zaman aşımları,
- üçüncü taraf API çağrıları.

Pratik rehberlik:

- Varsayılan Nym ayarlarıyla başlayın.
- İlk senkronizasyonun veya uzun telafi senkronizasyonunun daha uzun süreceğini bekleyin.
- Gizlilik ayarlarını zayıflatmadan önce bir zaman aşımını yeniden deneyin.
- Hassas bir işlemden hemen önce gizlilik modlarını art arda değiştirmekten kaçının.
- Toplu senkronizasyon için daha hızlı bir yol kullanıyorsanız, bu süre boyunca iletişim kurulan altyapının gerçek ağ kimliğinizi görebileceğini anlayın.
- Özellikle Zingo PC için, yerel Nym aktarımının şu anda gönderimleri ve fiyat sorgulamasını koruduğunu, senkronizasyonun ise doğrudan kaldığını unutmayın.

## Mobil hususlar

Android ve iOS'ta işletim sistemi VPN yuvası, genel cüzdan trafiğini NymVPN üzerinden yönlendirmenin genellikle en kolay yoludur: önce NymVPN bağlantısını kurun, ardından cüzdanı açın.

Başka bir VPN, güvenlik duvarı veya yerel VPN tabanlı reklam engelleyici sistem VPN arayüzünü zaten kullanıyorsa, iki ürün aynı anda çalışamayabilir. Cüzdanın korunduğunu varsaymadan önce işletim sisteminin VPN durumunu doğrulayın.

## Tehdit modeli kontrol listesi

Kuruluma güvenmeden önce şunları sorun:

- Uygun durumlarda korumalı Zcash adreslerini kullanıyor muyum?
- Cüzdanımda yerel Nym desteği var mı?
- Varsa, bu yerel entegrasyon tam olarak hangi trafiği koruyor?
- Daha geniş kapsam gerekiyorsa, cüzdan ağ etkinliğine başlamadan önce NymVPN bağlı mı?
- Cüzdan bir bölünmüş tünelleme kuralıyla hariç tutuluyor mu?
- Cüzdanın gerçekten belgelediği bir proxy moduna mı güveniyorum?
- Bir borsa, tarayıcı oturumu, üçüncü taraf API veya şeffaf adres aracılığıyla kimliğimi sızdırıyor muyum?
- Daha yavaş senkronizasyona ve ara sıra yaşanan zaman aşımlarına hazır mıyım?

## Kaynaklar

- Nym: Nym mixnet artık Zcash cüzdanlarında yayında, 24 Eylül 2026: https://nym.com/blog/nym-mixnet-zcash-wallets
- Zingo PC Nym davranışı: https://github.com/zingolabs/zingo-pc#the-nym-mixnet
- Zingo Mobile Nym aktarımı: https://github.com/zingolabs/zingo-mobile
- Zkool deposu: https://github.com/hhanh00/zkool2
- NozyWallet Nym aktarım çalışması: https://github.com/LEONINE-DAO/Nozy-wallet
- NymVPN v2026.12: https://nym.com/blog/nymvpn-v2026.12
- Zodl Tor Protection: https://support.zodl.com/article/17-enabling-tor-protection
