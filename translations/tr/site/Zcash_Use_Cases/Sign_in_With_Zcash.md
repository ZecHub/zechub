# <img src="/content-images/icons8-lock-2f8e221321.svg" width="24" height="24" alt="lock icon"/> Zcash ile oturum açın

<span className="inline-flex items-center gap-[6px]"><span className="inline-block w-[12px] h-[12px] bg-green-500 rounded-full"></span>Orta - 7 dakika</span>

## Kısaca

- Şifre kullanmak yerine bir Zcash adresinin kontrolünü elinizde bulundurduğunuzu kanıtlayarak oturum açın
- İki tasarım kullanılıyor: **bir meydan okumayı imzalamak** veya **memo alanında bir kod bulunan korumalı bir ödeme göndermek**
- Korumalı adresler bakiyeyi ve geçmişi gizlediğinden, kontrolü kanıtlamak mali durumunuzu açığa çıkarmaz
- Bu yaklaşım henüz başlangıç aşamasında. Onaylanmış bir standart yok ve uygulamalar birbiriyle uyumlu değil

<br/>

## <img src="/content-images/user-svgrepo-com-21adf62b7c.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="user icon"/> Bu kimler için?

- Kişisel veri toplamadan şifresiz oturum açma imkânı sunmak isteyen geliştiriciler
- Her siteyle e-posta adresini paylaşmak istemeyen kullanıcılar
- Finansal geçmişini bir hesaba bağlamadan oturum açmak isteyen herkes

<br/>

## <img src="/content-images/warning-error-svgrepo-com-b7ea8a50da.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="warning icon"/> Sorun

Çoğu oturum açma seçeneği bir şeyleri sızdırır:

- **Şifre ve e-posta**, kimliğinize bağlı bir hesap oluşturur ve her ikisi de veri ihlali dökümlerinde yer alır
- **Sosyal medya ile oturum açma**, kimlik sağlayıcısına nerelerde ve ne zaman oturum açtığınızı bildirir
- **Şeffaf Zincirlerde cüzdanla oturum açma**, göründüğünden daha kötüdür. Bir cüzdanı bağlamak, tüm bakiyenizi ve işlem geçmişinizi kalıcı olarak siteye verebilir

Genellikle kolaylık ile bilgi ifşası arasında seçim yapmak zorunda kalırsınız.

<br/>

## <img src="/content-images/celebration-spark-svgrepo-com-bc98dec7c1.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="spark icon"/> Zcash neden?

Zcash, *kontrolü kanıtlamayı* *finansal bilgileri açığa çıkarmaktan* ayırır:

- **Korumalı adresler** bakiyeleri ve işlem geçmişini gizli tutar; böylece bir adrese sahip olduğunuzu kanıtlamanız, ne kadar varlığınız olduğunu göstermez
- **Şifrelenmiş memolar**, tek kullanımlık oturum açma kodunu bir işlem içinde gizlice taşıyabilir
- **Görüntüleme anahtarları** seçici açıklamaya olanak tanır; böylece bir uygulamaya yalnızca ihtiyaç duyduğu verilere okuma erişimi verilebilir

<br/>

## <img src="/content-images/ladder-svgrepo-com-7232bf46ed.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="step icon"/> Nasıl çalışır?

İki yaklaşım ortaya çıkmıştır. Her ikisinin sonunda da uygulama sizi tanımlayan kalıcı bir tanımlayıcıya sahip olur ve şifre kullanılmaz.

### Yaklaşım 1: Bir meydan okumayı imzalayın

1. Uygulama rastgele, tek kullanımlık bir meydan okuma oluşturur
2. Cüzdanınız, adresinizin arkasındaki anahtarla bu meydan okumayı imzalar
3. Uygulama imzayı doğrular ve oturum açmanızı sağlar

Hiçbir şey yayınlanmadığından ücret ödemezsiniz ve bir blok beklemeniz gerekmez. İlgili spesifikasyon [ZIP 304, Sapling Adres İmzaları](https://zips.z.cash/zip-0304)'dır. Bu hâlâ bir taslak olduğundan, cüzdanların mesaj imzalama desteği farklılık gösterir.

### Yaklaşım 2: Korumalı bir ödemeyle kanıtlayın

1. Uygulama tek kullanımlık bir kod oluşturur ve bir ödeme talebi gösterir
2. Bu kodu memo alanına ekleyerek küçük bir korumalı işlem gönderirsiniz
3. Uygulama memoyu izler, kodu eşleştirir ve oturum açmanızı sağlar

Bu yöntem, bugün zaten memo desteği sunan cüzdanlarla çalışır; bu da çoğu cüzdanı kapsar. Karşılığında ağ ücreti ödersiniz ve onay beklemeniz gerekir.

### Adresi gizli tutmak

Bir uygulamanın sizi tanımak için adresinizi kaydetmesi gerekmez. Bazı uygulamalar adresinizi uygulamaya özel bir değerle birlikte hash'ler; böylece her site aynı kullanıcı için farklı ve kalıcı bir tanımlayıcı görür. Bu, sitelerin hesaplarınızı birbirine bağlamak için notlarını karşılaştırmasını önler.

<br/>

## <img src="/content-images/icons8-toolbox-9bebbb1619.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="toolbox icon"/> Ödünleşimler

Bu yöntemi kullanarak bir şey geliştirmeden veya ona güvenmeden önce bunları anlamanızda fayda var.

| | İmzalı meydan okuma | Korumalı ödeme |
|---|---|---|
| Maliyet | Ücretsiz | Her oturum açmada ağ ücreti |
| Hız | Anında | Onay beklenir |
| Cüzdan desteği | Sınırlı, ZIP 304 taslak aşamasında | Yaygın, yalnızca memo desteği gerekir |
| Zincirde kayıt bırakır mı? | Hayır | Evet, bir işlem oluşur |

Ortak sınırlamalar:

- **Varsayılan olarak hesap kurtarma yoktur.** Uygulama bir kurtarma yolu tasarlamadıysa anahtarı kaybetmek hesabı kaybetmek anlamına gelir
- **Adresi yeniden kullanmak sizi ilişkilendirilebilir hâle getirebilir.** Aynı adresi birçok sitede kullanmak takip sorununu yeniden yaratır; bu nedenle uygulamaya özel tanımlayıcılar önemlidir
- **Onaylanmış bir standart yoktur.** Her projenin kendi yöntemi vardır; bu nedenle biri için oluşturulan oturum açma sistemi diğeriyle çalışmaz
- **Tek başına anonimlik sağlamaz.** Mali durumunuzu uygulamadan gizler, ancak uygulama oturum açtıktan sonra yaptıklarınızın profilini çıkarmaya devam edebilir

<br/>

## <img src="/content-images/icons8-cancel-7f786be3c1.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="cancel icon"/> Kaçınılması gereken yaygın hatalar

- Bir meydan okuma kodunu yeniden kullanmak. Her kod tek kullanımlık olmalı ve kısa sürede geçerliliğini yitirmelidir; aksi takdirde ele geçirilen bir kod yeniden kullanılabilir
- Kullanıcılardan oturum açmak için anlamlı bir miktar göndermelerini istemek. Ödeme bir kanıttır; bu yüzden miktar önemsiz düzeyde olmalıdır
- Uygulamaya özel bir tanımlayıcının aynı işi göreceği durumlarda ham adresi saklamak
- Mesaj imzalamanın her yerde çalıştığını varsaymak. Kullanıcılarınızın gerçekten kullandığı cüzdanları kontrol edin
- Bir memonun sonradan gizli kaldığını varsaymak. Memo, gönderenin işlemi yaptığını kanıtlar; şifre değildir

<br/>

## <img src="/content-images/checked-checkbox-svgrepo-com-7ea19022da.svg" width="28" height="28" className="inline-block align-middle mr-1 p-[2px]" alt="done icon"/> Bu konuyu inceleyen projeler

Bunlar, [ZecHub Hackathon 3.0](https://zechub.wiki/hackathon) kapsamındaki **Zcash Oturum Açma** kategorisi için geliştirildi. Tamamlanmış ürünlerden çok deney niteliğindeler ve aynı fikrin ne kadar farklı şekillerde hayata geçirilebileceğini gösteriyorlar.

- **ZecAuth** - başka yerlerde WalletConnect'in yaptığına benzer şekilde, Zcash için bir cüzdan bağlantı protokolü. Uygulama, oturum açma, ödeme talepleri veya görüntüleme erişimi gibi istediği yeteneklerle birlikte bir meydan okuma içeren QR kodu ya da `zecauth://` bağlantısı gösterir. İşlem yok, ücret yok, Zincir etkileşimi yok. Kodun yanında yazılı bir protokol spesifikasyonu da sunar
- **ZShield** - korumalı bir adresi W3C DID'ye ve OpenID Connect kimliğine dönüştürür. Tarayıcı bir anahtar çifti oluşturur, sunucu ZIP 304 tarzı bir arayüz üzerinden nonce gönderir, cüzdan bunu imzalar ve sunucu bir JWT döndürür. Sonuç OIDC ile uyumlu olduğundan, mevcut uygulamalar özel bir entegrasyon olmadan bunu kullanabilir
- **ZecPass** - sahipliği imzalı bir memo aracılığıyla kanıtlar ve uygulamanın kullanıcının adresini hiçbir zaman öğrenmemesini sağlayacak şekilde geliştirilmiştir. Kalıcı bir tanımlayıcı olarak kullanmak üzere uygulama kapsamlı bir hash türetir, meydan okumaları tek kullanımlık ve süreli tutar, ayrıca Node doğrulama kitaplığıyla kullanıma hazır bir React düğmesi sunar
- **Portal** - ana ağda çalışan bu yöntem, memo alanında tek kullanımlık bir kod bulunan korumalı işlem göndererek oturum açmayı sağlar. Aynı akış, ücretli içeriğin kilidini açmak ve bir bağlantı üzerinden para gönderip almak için de kullanılır
- **ZcashMe** - kimlik kanıtı olarak korumalı bir ödeme kullanır ve dizüstü bilgisayarda oturum açmak için tarayıcı uzantısı gerekmemesi amacıyla masaüstü ile mobil arasındaki boşluğa odaklanır
- **ZBooks** - Zcash ile oturum açmayı ürünün kendisi yerine yeniden kullanılabilir bir kimlik doğrulama yapı taşı olarak ele alan muhasebe ve ödeme aracı; hazine verilerini Birleşik Full Viewing Key üzerinden okur

<br/>

## <img src="/content-images/chain-for-links-svgrepo-com-117ee0dec1.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="chain-links icon"/> İlgili sayfalar

- [Memolar](/using-zcash/memos) - şifrelenmiş memoların nasıl çalıştığı ve oturum açma kodunun bir memo içinde nasıl taşındığı
- [Görüntüleme Anahtarları](/zcash-tech/viewing-keys) - harcama yetkisini vermeden salt okunur erişim sağlama
- [Korumalı ZEC](/zcash-use-cases/keeping-records-with-shielded-zec) ile Kayıt Tutma - muhasebeye uygulanan aynı seçici açıklama fikri
- [Kimliği Bağlamadan Para Gönderme](/zcash-use-cases/send-money-without-linking-identity) - adresi yeniden kullanmanın gizliliği neden zayıflattığı

<br/>
