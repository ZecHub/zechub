# <img src="/content-images/icons8-lock-2f8e221321.svg" width="24" height="24" alt="lock icon"/> Zcash ile oturum açın

<span className="inline-flex items-center gap-[6px]"><span className="inline-block w-[12px] h-[12px] bg-green-500 rounded-full"></span>Orta seviye - 7 dk</span>

## TL;DR

- Parola kullanmak yerine, bir Zcash adresini kontrol ettiğinizi kanıtlayarak giriş yapın
- Kullanımda olan iki tasarım var: **bir challenge imzalamak** veya **memo içinde bir kod bulunan shielded ödeme göndermek**
- Shielded adresler bakiyeyi ve geçmişi gizlediği için, kontrolü kanıtlamak mali durumunuzu açığa çıkarmaz
- Bu model henüz erken aşamada. Henüz onaylanmış bir standart yok ve implementasyonlar birbiriyle birlikte çalışmıyor

<br/>

## <img src="/content-images/user-svgrepo-com-21adf62b7c.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="user icon"/> Bu kimler için?

- Kişisel veri toplamadan parolasız giriş isteyen geliştiriciler
- E-posta adreslerini her siteye vermek istemeyen kullanıcılar
- Finansal geçmişlerini bir hesaba bağlamadan giriş yapmak isteyen herkes

<br/>

## <img src="/content-images/warning-error-svgrepo-com-b7ea8a50da.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="warning icon"/> Problem

Çoğu giriş seçeneği bir şeyleri sızdırır:

- **Parolalar ve e-posta** kimliğinize bağlı bir hesap oluşturur ve ikisi de veri ihlali dökümlerinde ortaya çıkar
- **Sosyal oturum açma** kimlik sağlayıcısına nerelere ve ne zaman giriş yaptığınızı söyler
- **Transparent zincirlerde cüzdanla giriş** göründüğünden daha kötüdür. Bir cüzdan bağlamak, siteye tüm bakiyenizi ve işlem geçmişinizi kalıcı olarak verebilir

Genelde kolaylık ile ifşa arasında seçim yaparsınız.

<br/>

## <img src="/content-images/celebration-spark-svgrepo-com-bc98dec7c1.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="spark icon"/> Neden Zcash?

Zcash, *kontrolü kanıtlamayı* *finansal bilgileri açığa çıkarmaktan* ayırır:

- **Shielded adresler** bakiyeleri ve işlem geçmişini gizli tutar; bu yüzden bir tanesine sahip olduğunuzu kanıtlamak, neye sahip olduğunuz hakkında hiçbir şey söylemez
- **Şifrelenmiş memolar** bir işlemin içinde tek kullanımlık bir giriş kodunu özel olarak taşıyabilir
- **Viewing key’ler** seçici ifşaya izin verir; böylece bir uygulamaya tam olarak ihtiyaç duyduğu kadar okuma erişimi verilir, daha fazlası değil

<br/>

## <img src="/content-images/ladder-svgrepo-com-7232bf46ed.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="step icon"/> Nasıl Çalışır

İki yaklaşım ortaya çıktı. Her ikisi de uygulamanın sizin için sabit bir tanımlayıcıya sahip olması ve parola gerekmemesiyle sonuçlanır.

### Yaklaşım 1: Bir challenge imzalamak

1. Uygulama rastgele, tek kullanımlık bir challenge üretir
2. Cüzdanınız bu challenge’ı adresinizin arkasındaki anahtarla imzalar
3. Uygulama imzayı doğrular ve sizi içeri alır

Hiçbir şey yayınlanmaz; dolayısıyla ücret yoktur ve bir blok beklemeniz gerekmez. İlgili spesifikasyon hâlâ taslak olan [ZIP 304, Sapling Address Signatures](https://zips.z.cash/zip-0304)’tır; bu yüzden mesaj imzalama için cüzdan desteği değişiklik gösterir.

### Yaklaşım 2: Bunu bir shielded ödeme ile kanıtlamak

1. Uygulama tek kullanımlık bir kod üretir ve bir ödeme isteği gösterir
2. Siz memo içinde bu kodun bulunduğu küçük bir shielded işlem gönderirsiniz
3. Uygulama memoyu izler, kodu eşleştirir ve sizi içeri alır

Bu, bugün zaten memo desteği olan cüzdanlarla çalışır; bu da çoğu cüzdan demektir. Bedeli ise ağ ücreti ödenmesi ve onay beklenmesidir.

### Adresi gizli tutmak

Bir uygulamanın sizi tanıyabilmesi için adresinizi saklaması gerekmez. Bazı implementasyonlar adresi uygulamaya özgü bir değerle birlikte hash’ler; böylece her site aynı kullanıcı için farklı ama sabit bir tanımlayıcı görür. Bu da sitelerin hesaplarınızı ilişkilendirmek için bilgi karşılaştırması yapmasını engeller.

<br/>

## <img src="/content-images/icons8-toolbox-9bebbb1619.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="toolbox icon"/> Ödünleşimler

Bunun üzerine bir şey inşa etmeden veya buna güvenmeden önce anlamaya değer.

| | İmzalı challenge | Shielded ödeme |
|---|---|---|
| Maliyet | Ücretsiz | Giriş başına ağ ücreti |
| Hız | Anında | Onay bekler |
| Cüzdan desteği | Sınırlı, ZIP 304 bir taslak | Geniş, yalnızca memo gerekir |
| Zincirde kayıt bırakır | Hayır | Evet, bir işlem vardır |

Ortak sınırlamalar:

- **Varsayılan olarak hesap kurtarma yoktur.** Uygulama bir kurtarma yolu tasarlamadıkça, anahtarı kaybetmek hesabı kaybetmek demektir
- **Adresin yeniden kullanılması sizi ilişkilendirebilir.** Aynı adresi birçok sitede kullanmak takip problemini yeniden yaratır; bu yüzden uygulamaya özgü tanımlayıcılar önemlidir
- **Onaylanmış bir standart yok.** Her projenin kendi şeması vardır; bu yüzden biri için yapılan giriş sistemi diğeriyle çalışmaz
- **Tek başına anonimlik değildir.** Uygulamadan finansal bilgilerinizi gizler, ancak uygulama içeri girdikten sonra ne yaptığınızı yine de profilleyebilir

<br/>

## <img src="/content-images/icons8-cancel-7f786be3c1.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="cancel icon"/> Kaçınılması Gereken Yaygın Hatalar

- Bir challenge kodunu yeniden kullanmak. Her kod tek kullanımlık olmalı ve hızlıca süresi dolmalı; yoksa ele geçirilen bir kod tekrar kullanılabilir
- Kullanıcılardan giriş yapmak için anlamlı bir miktar göndermelerini istemek. Ödeme bir kanıttır; bu yüzden miktar önemsiz olmalıdır
- Uygulamaya özgü bir tanımlayıcı aynı işi görebilecekken ham adresi saklamak
- Mesaj imzalamanın her yerde çalıştığını varsaymak. Kullanıcılarınızın gerçekten sahip olduğu cüzdanları kontrol edin
- Bir memoyu sonradan gizliymiş gibi ele almak. Bu, gönderenin bir eylem gerçekleştirdiğini kanıtlar; bir parola değildir

<br/>

## <img src="/content-images/checked-checkbox-svgrepo-com-7ea19022da.svg" width="28" height="28" className="inline-block align-middle mr-1 p-[2px]" alt="done icon"/> Bunu Araştıran Projeler

Bunlar, [ZecHub Hackathon 3.0](https://zechub.wiki/hackathon) kapsamındaki **Zcash Login** kategorisi için geliştirildi. Bitmiş ürünlerden ziyade deneylerdir ve aynı fikrin ne kadar farklı şekillerde inşa edilebildiğini gösterirler.

- **ZecAuth** - Zcash için, başka yerlerde WalletConnect’in yaptığını andıran bir cüzdan bağlantı protokolü. Uygulama, challenge ile birlikte istediği yetenekleri taşıyan bir QR kodu veya `zecauth://` bağlantısı gösterir; bunlar arasında oturum açma, ödeme istekleri veya viewing erişimi bulunabilir. İşlem yok, ücret yok, zincir etkileşimi yok. Kodun yanında yazılı bir protokol spesifikasyonu da sunar
- **ZShield** - bir shielded adresi W3C DID’ye ve OpenID Connect kimliğine dönüştürür. Tarayıcı bir anahtar çifti üretir, sunucu ZIP 304 tarzı bir arayüz üzerinden bir nonce verir, cüzdan bunu imzalar ve sunucu bir JWT döndürür. Sonuç OIDC ile uyumlu olduğu için, mevcut uygulamalar bunu özel entegrasyon olmadan kullanabilir
- **ZecPass** - sahipliği imzalı bir memo üzerinden kanıtlar ve uygulamanın kullanıcının adresini hiçbir şekilde öğrenmemesi için tasarlanmıştır. Sabit tanımlayıcı olarak kullanmak üzere uygulama kapsamlı bir hash türetir, challenge’ları tek kullanımlık ve süre sınırlı tutar ve doğrudan kullanılabilir bir React düğmesi ile bir Node doğrulama kütüphanesi sunar
- **Portal** - memo içinde tek kullanımlık bir kod bulunan shielded işlem göndererek giriş yapılmasını sağlar ve mainnet üzerinde çalışır. Aynı akış ücretli içeriğin kilidini açmak ve bir bağlantı üzerinden para göndermek veya almak için de yeniden kullanılır
- **ZcashMe** - kimlik kanıtı olarak shielded ödemeyi kullanır ve masaüstü ile mobil arasındaki boşluğa odaklanır; böylece dizüstü bilgisayarda oturum açmak bir tarayıcı eklentisi gerektirmez
- **ZBooks** - Zcash ile oturum açmayı ürünün kendisinden ziyade yeniden kullanılabilir bir kimlik doğrulama primi olarak ele alan bir muhasebe ve ödeme aracıdır ve hazine verilerini bir Unified Full Viewing Key üzerinden okur

<br/>

## <img src="/content-images/chain-for-links-svgrepo-com-117ee0dec1.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="chain-links icon"/> İlgili sayfalar

- [Memolar](/using-zcash/memos) - şifrelenmiş memoların nasıl çalıştığı ve bir giriş kodunun bunlardan birinin içinde nasıl taşındığı
- [Viewing Key’ler](/zcash-tech/viewing-keys) - harcama yetkisini vermeden salt okunur erişim sağlamak
- [Shielded ZEC ile Kayıt Tutmak](/zcash-use-cases/keeping-records-with-shielded-zec) - muhasebeye uygulanmış aynı seçici ifşa fikri
- [Kimliği Bağlantılandırmadan Para Göndermek](/zcash-use-cases/send-money-without-linking-identity) - adresin yeniden kullanılmasının neden gizliliği zayıflattığı

<br/>
