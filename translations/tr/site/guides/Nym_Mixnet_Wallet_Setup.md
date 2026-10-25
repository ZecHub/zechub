<a href="https://github.com/zechub/zechub/edit/main/site/guides/Nym_Mixnet_Wallet_Setup.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edihttps://github.com/ZecHub/zechub/pull/2238t Sayfası"/>
</a>

# Zcash Cüzdan Trafiğini Nym Mixnet Üzerinden Yönlendirin

> Son doğrulama: 29 Eylül 2026

Zcash shielded işlemleri, işlem verilerini zincir üzerinde korur; ancak cüzdanlar yine de internet üzerinden iletişim kurar. Ağ gözlemcileri IP adresiniz, cüzdanınızın ne zaman bağlandığı ve hangi altyapıyla iletişim kurduğu gibi meta verileri potansiyel olarak öğrenebilir.

Nym ayrı bir ağ gizliliği katmanı ekler. Eylül 2026 itibarıyla en iyi yaklaşım cüzdana bağlıdır:

1. **Mevcut olduğunda cüzdanın yerel Nym entegrasyonunu tercih edin.**
2. Aksi hâlde, cüzdana özgü proxy desteğine bağlı kalmadan cüzdanın ağ trafiğinin Nym üzerinden yönlendirilmesi için **sistem düzeyinde NymVPN Mixnet modunu** kullanın.

Genel VPN ve dVPN bilgileri için [VPN & dVPN](./VPN_and_DVPN.md) bölümüne bakın.

## Nym ne ekler — ve ne eklemez

Shielded bir Zcash ödemesi ve bir ağ gizliliği aracı farklı sorunları çözer:

- **Zcash shielded havuzları**, işlem ayrıntılarını zincir üzerinde korur.
- **Nym mixnet yönlendirmesi**, gerçek ağ kimliğiniz ile cüzdan trafiğini alan hizmet arasındaki ilişkilendirilebilirliği azaltmak üzere tasarlanmıştır.
- Sistem düzeyindeki bir NymVPN tüneli üzerinden iletişim kurulan hedef, ev/mobil IP'niz yerine bir Nym çıkışı görmelidir.

Nym'nin mixnet'i, ağ meta verisi sızıntısını azaltmak için birden fazla atlama, paket karıştırma, rastgele gecikmeler, örtü trafiği ve onion şifreleme kullanır.

Nym; ele geçirilmiş bir cihaza, kötü amaçlı cüzdan yazılımına, açığa çıkmış kurtarma ifadelerine, borsa hesapları üzerinden ifşa ettiğiniz kimliğe veya şeffaf Zcash faaliyetinin neden olduğu gizlilik kaybına karşı **koruma sağlamaz**.

## Yerel Nym desteği: mevcut olduğunda bunu önce kullanın

Nym, 24 Eylül 2026'da Zcash Community Grant çalışmasının tamamlandığını ve yerel mixnet desteğinin gerçek Zcash cüzdanlarında kullanıma sunulduğunu duyurdu.

### Zingo! Wallet

Zingo PC yerel bir Nym taşıma katmanı içerir. Zingo Mobile, uygulama içi bir Nym proxy kullanarak iOS ve Android üzerinde Mixnet Mode ile birlikte sunulur.

Zingo tarafından belgelenen güncel davranış:

- Nym kontrolü **Settings → Nym Mixnet** altında bulunur.
- Ödeme gönderimi mixnet üzerinden yönlendirilir.
- Ironwood geçiş aktarımları aynı korumalı gönderim yolunu izler.
- ZEC fiyat istekleri de mixnet üzerinden yönlendirilir.
- Nym etkin durumdayken gönderim kapalı hata verir: mixnet taşıma katmanı kullanılamazsa ödeme sessizce clearnet üzerinden gönderilmez.
- **Zincir senkronizasyonu şu anda Zingo PC içinde mixnet üzerinden yönlendirilmemektedir.** Compact bloklar, nullifier sorguları, işlem getirmeleri, mempool trafiği ve sunucu sağlık kontrolleri hâlâ normal sunucu bağlantısını kullanır.

Bu ayrım önemlidir: Zingo'nin yerel entegrasyonu, en yüksek ilişkilendirme riskine sahip yayın yolunu korur; ancak henüz tam cihaz kapsamlı bir ağ tüneli değildir.

Tehdit modeliniz sunucudan senkronizasyon trafiğini gizlemeyi de gerektiriyorsa, bunun getirdiği ek gecikmeyi ve karmaşıklığı anlayarak NymVPN gibi sistem düzeyinde bir gizlilik tüneli kullanın.

Kaynaklar:

- https://github.com/zingolabs/zingo-pc#the-nym-mixnet
- https://github.com/zingolabs/zingo-mobile
- https://nym.com/blog/nym-mixnet-zcash-wallets

### Zkool

Nym, **Zkool** ürününün artık yerel bir geçiş kullanarak Zcash RPC altyapısına Nym mixnet üzerinden bağlanmayı desteklediğini bildiriyor.

Zkool, YWallet ürününün etkin olarak sürdürülen halefidir. Projesi ayrıca Zcash sunucu bağlantıları için Tor proxy kullanımı ve onion hizmetlerini destekler.

Belgelenmemiş bir proxy yolu üzerinden eski bir YWallet sürümünü zorlamaya çalışmak yerine, Zkool'nin yerel Nym seçeneğini tercih edin.

Kaynaklar:

- https://nym.com/blog/nym-mixnet-zcash-wallets
- https://github.com/hhanh00/zkool2

### Nozy

NozyWallet ayrıca Nym farkındalığı olan taşıma yollarına sahiptir. Güncel uygulaması, giden işlem gönderimlerinin Nym mixnet üzerinden yönlendirilmesini ve compact blok senkronizasyonu için ayrı bir Nym dVPN yolunu destekler. Her cüzdan isteğinin otomatik olarak mixnet'i kullandığını varsaymak yerine, bunları farklı korumalar olarak değerlendirin.

Kaynaklar:

- https://github.com/LEONINE-DAO/Nozy-wallet
- https://github.com/LEONINE-DAO/Nozy-wallet/blob/master/docs/reference/NYM_SEND_EGRESS_CASE_BREAKDOWN.md
- https://github.com/LEONINE-DAO/Nozy-wallet/blob/master/docs/reference/NYM_DVPN_SYNC_CASE_BREAKDOWN.md

### Zodl

Zodl şu anda, yukarıda Zingo, Zkool ve Nozy için açıklanan yerel Nym entegrasyonuyla aynı olmayan yerleşik **Tor Protection** özelliğine sahiptir.

Zodl'nin Tor özelliği; işlem gönderimini, işlem verisi alımını, döviz kuru isteklerini ve üçüncü taraf API çağrılarını Tor üzerinden yönlendirebilir. Nym, 24 Eylül 2026'da daha kapsamlı mixnet entegrasyonu konusunda Zodl ekibiyle hâlâ aktif görüşmeler yürüttüğünü belirtti.

Bugün Zodl için şunlardan birini kullanın:

- Zodl'nin belgelenmiş Tor Protection özelliği veya
- amacınız cüzdanın genel cihaz trafiğini Nym üzerinden yönlendirmekse sistem düzeyinde NymVPN.

Her ikisi de gizlilik ağı olduğu için Tor ve Nym'nin cüzdan içinde birbirinin yerine geçebilen taşıma katmanları olduğunu varsaymayın.

Zodl Tor ayarları:

**More → Advanced Features → Beta: Tor Protection → Enable → Save changes**

Kaynaklar:

- https://support.zodl.com/article/17-enabling-tor-protection
- https://nym.com/blog/nym-mixnet-zcash-wallets

## Yedek seçenek: sistem düzeyinde NymVPN

Bu, cüzdanın Nym'ye özgü proxy ayarlarını anlamasını gerektirmediği için en geniş uyumluluğa sahip Nym seçeneğidir.

### 1. NymVPN yükleyin

NymVPN uygulamasını yalnızca Nym'nin resmi web sitesinden veya resmi platform mağazasından indirin:

- https://nym.com/
- https://nym.com/blog/nymvpn-v2026.12

NymVPN; Android, iOS, Linux, Windows ve macOS'u destekler.

### 2. Mixnet modunu seçin

NymVPN; daha düşük gecikme için optimize edilmiş 2 atlamalı dVPN yolu olan **Fast mode**'u ve daha güçlü ağ meta verisi koruması için optimize edilmiş 5 atlamalı mixnet yolu olan **Mixnet mode**'u sunar. Hassas cüzdan faaliyetleri için Mixnet mode'u seçin ve cüzdanı açmadan veya yenilemeden önce istemcinin bağlantının kurulduğunu bildirmesini bekleyin.

### 3. Cüzdanı normal ağ ayarlarında bırakın

İşletim sistemi trafiği zaten NymVPN üzerinden tünelliyorsa, çoğu cüzdan özel proxy ayarlarına ihtiyaç duymaz.

Cüzdanı normal şekilde açın ve senkronize olmasına izin verin.

NymVPN platformunuzda split tunneling sunuyorsa, cüzdanın atlama veya hariç tutma listesine konulmadığını, **korumalı tünele dâhil edildiğini** doğrulayın.

### 4. Cüzdanı kullanmadan önce tüneli doğrulayın

Basit bir sistem düzeyi kontrolü:

1. NymVPN bağlantısını kesin.
2. Herkese açık bir IP kontrol hizmetini ziyaret edin veya masaüstünde şunu çalıştırın:

   ```bash
   curl https://api.ipify.org
   ```

3. Görünen IP'yi kaydedin.
4. Mixnet modunda NymVPN bağlantısını kurun.
5. Kontrolü tekrarlayın.

Görünen genel IP değişmelidir.

Bu, sistem tünelini doğrular. Bir uygulamanın veya işletim sisteminin özel yönlendirme kuralları varsa, belirli bir cüzdanın yaptığı her isteğin aynı yolu izlediğini **kanıtlamaz**.

Masaüstünde daha fazla güvence için:

- cüzdan sürecini işletim sisteminin ağ monitörüyle inceleyin,
- split-tunnel hariç tutması olmadığını doğrulayın,
- NymVPN bağlantısı kesildiğinde beklenen cüzdan davranışının değiştiğini doğrulayın.

Sorun giderirken cüzdan adresleri, bakiyeler, işlem kimlikleri, IP adresleri veya kurtarma materyalleri içeren ekran görüntülerini paylaşmayın.

## NymVPN dApp / cüzdan proxy modu

NymVPN ayrıca mixnet üzerinden SOCKS5 / RPC yönlendirmesi kullanan bir uygulama ve cüzdan proxy modu sunar.

Nym'nin herkese açık kurulum belgeleri bunu temel olarak Ethereum tarzı RPC yapılandırmasıyla gösterir. Uyumlu bir genel proxy/RPC yolunu açıkça destekleyen yazılımlar için yararlıdır; ancak her Zcash cüzdanıyla çalıştığı varsayılmamalıdır.

Bu yolu yalnızca cüzdanın kendi belgeleri uyumlu proxy veya RPC desteğini doğruladığında kullanın.

Aksi hâlde şunları tercih edin:

- cüzdanın yerel Nym entegrasyonu veya
- sistem düzeyinde NymVPN.

## Performans ve zaman aşımı dengeleri

Mixnet'ler daha güçlü meta veri koruması için kasıtlı olarak hızdan ödün verir.

Şunlar üzerinde olası etkiler bekleyin:

- ilk cüzdan senkronizasyonu,
- büyük kapsamlı eşitleme senkronizasyonları,
- işlem geçmişi sorguları,
- RPC zaman aşımları,
- üçüncü taraf API çağrıları.

Pratik öneriler:

- Varsayılan Nym ayarlarıyla başlayın.
- İlk senkronizasyonun veya uzun kapsamlı eşitleme senkronizasyonunun daha uzun süreceğini bekleyin.
- Gizlilik ayarlarını zayıflatmadan önce zaman aşımını yeniden deneyin.
- Hassas bir işlemden hemen önce gizlilik modları arasında tekrar tekrar geçiş yapmaktan kaçının.
- Toplu senkronizasyon için daha hızlı bir yol kullanıyorsanız, iletişim kurulan altyapının o süre boyunca gerçek ağ kimliğinizi görebileceğini anlayın.
- Özellikle Zingo PC için, yerel Nym taşıma katmanının şu anda gönderimleri ve fiyat sorgusunu koruduğunu, senkronizasyonun ise doğrudan kaldığını unutmayın.

## Mobil hususlar

Android ve iOS üzerinde, genel cüzdan trafiğini NymVPN üzerinden yönlendirmenin genellikle en basit yolu işletim sisteminin VPN yuvasıdır: önce NymVPN bağlantısını kurun, ardından cüzdanı açın.

Başka bir VPN, güvenlik duvarı veya yerel VPN tabanlı reklam engelleyici zaten sistem VPN arayüzünü kullanıyorsa, iki ürün aynı anda çalışamayabilir. Cüzdanın korunduğunu varsaymadan önce işletim sisteminin VPN durumunu doğrulayın.

## Tehdit modeli kontrol listesi

Kuruluma güvenmeden önce şunları sorun:

- Uygun olduğunda shielded Zcash adreslerini kullanıyor muyum?
- Cüzdanım yerel Nym desteğine sahip mi?
- Öyleyse, bu yerel entegrasyon tam olarak hangi trafiği koruyor?
- Daha geniş kapsama ihtiyacım varsa, cüzdan ağ etkinliğine başlamadan önce NymVPN bağlı mı?
- Cüzdan bir split-tunneling kuralıyla hariç tutulmuş mu?
- Cüzdanın gerçekten belgelediği bir proxy moduna mı güveniyorum?
- Bir borsa, tarayıcı oturumu, üçüncü taraf API veya şeffaf adres yoluyla kimlik sızdırıyor muyum?
- Daha yavaş senkronizasyona ve ara sıra yaşanabilecek zaman aşımlarına hazır mıyım?

## Kaynaklar

- Nym: Nym mixnet artık Zcash cüzdanlarında yayında, 24 Eylül 2026: https://nym.com/blog/nym-mixnet-zcash-wallets
- Zingo PC Nym davranışı: https://github.com/zingolabs/zingo-pc#the-nym-mixnet
- Zingo Mobile Nym taşıma katmanı: https://github.com/zingolabs/zingo-mobile
- Zkool deposu: https://github.com/hhanh00/zkool2
- NozyWallet Nym taşıma çalışması: https://github.com/LEONINE-DAO/Nozy-wallet
- NymVPN v2026.12: https://nym.com/blog/nymvpn-v2026.12
- Zodl Tor Protection: https://support.zodl.com/article/17-enabling-tor-protection
