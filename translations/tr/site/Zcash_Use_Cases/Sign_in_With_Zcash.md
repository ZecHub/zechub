---
# <img src="/content-images/icons8-lock-2f8e221321.svg" width="24" height="24" alt="lock icon"/> Zcash ile oturum açın

<span className="inline-flex items-center gap-[6px]"><span className="inline-block w-[12px] h-[12px] bg-green-500 rounded-full"></span>Orta seviye - 7 dk</span>

## Kısaca

- Parola kullanmak yerine, bir Zcash adresini kontrol ettiğinizi kanıtlayarak giriş yapın
- İki tasarım kullanımdadır: **bir challenge imzalama** veya **memo içine bir kod koyarak shielded ödeme gönderme**
- Shielded adresler bakiyeyi ve geçmişi gizlediği için, kontrolü kanıtlamak finansal bilgilerinizi açığa çıkarmaz
- Bu yaklaşım erken aşamadadır. Henüz onaylanmış bir standart yoktur ve uygulamalar birbiriyle birlikte çalışmaz

<br/>

## <img src="/content-images/user-svgrepo-com-21adf62b7c.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="user icon"/> Bu kimler için?

- Kişisel veri toplamadan parolasız giriş isteyen geliştiriciler
- E-posta adreslerini her siteye vermek istemeyen kullanıcılar
- Finansal geçmişlerini bir hesapla ilişkilendirmeden giriş yapmak isteyen herkes

<br/>

## <img src="/content-images/warning-error-svgrepo-com-b7ea8a50da.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="warning icon"/> Sorun

Çoğu giriş seçeneği bir şeyleri sızdırır:

- **Parolalar ve e-posta** kimliğinize bağlı bir hesap oluşturur ve ikisi de veri sızıntısı dökümlerinde yer alır
- **Sosyal hesapla giriş**, kimlik sağlayıcısına nerelerde ve ne zaman oturum açtığınızı söyler
- **Şeffaf zincirlerde cüzdanla giriş**, göründüğünden daha kötüdür. Bir cüzdanı bağlamak, siteye tüm bakiyenizi ve işlem geçmişinizi kalıcı olarak verebilir

Genellikle kolaylık ile ifşa arasında seçim yaparsınız.

<br/>

## <img src="/content-images/celebration-spark-svgrepo-com-bc98dec7c1.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="spark icon"/> Neden Zcash?

Zcash, *kontrolü kanıtlamayı* *finansal bilgileri açığa vurmaktan* ayırır:

- **Shielded adresler** bakiyeleri ve işlem geçmişini gizli tutar; dolayısıyla bir tanesine sahip olduğunuzu kanıtlamak, neye sahip olduğunuz hakkında hiçbir şey söylemez
- **Şifreli memolar**, işlem içinde tek kullanımlık bir giriş kodunu gizli şekilde taşıyabilir
- **Viewing keys** seçici ifşaya izin verir; böylece bir uygulamaya tam olarak ihtiyaç duyduğu kadar okuma erişimi verilir, fazlası değil

<br/>

## <img src="/content-images/ladder-svgrepo-com-7232bf46ed.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="step icon"/> Nasıl Çalışır?

İki yaklaşım ortaya çıkmıştır. Her ikisi de uygulamanın sizin için sabit bir tanımlayıcıya sahip olması ve parola gerekmemesiyle sonuçlanır.

### Yaklaşım 1: Bir challenge imzalamak

1. Uygulama rastgele, tek kullanımlık bir challenge üretir
2. Cüzdanınız bu challenge'ı adresinizin arkasındaki anahtarla imzalar
3. Uygulama imzayı doğrular ve sizi içeri alır

Hiçbir şey yayınlanmaz; dolayısıyla ücret yoktur ve bir blok beklemeniz gerekmez. İlgili spesifikasyon [ZIP 304, Sapling Address Signatures](https://zips.z.cash/zip-0304)'tır; bu hâlâ bir taslak olduğu için cüzdanların mesaj imzalama desteği değişkenlik gösterir.

### Yaklaşım 2: Bunu shielded bir ödemeyle kanıtlamak

1. Uygulama tek kullanımlık bir kod üretir ve bir ödeme isteği gösterir
2. Siz de memo içinde bu kodla küçük bir shielded işlem gönderirsiniz
3. Uygulama memoyu izler, kodu eşleştirir ve sizi içeri alır

Bu yöntem, bugün zaten memo desteği olan cüzdanlarla çalışır; bu da çoğu cüzdan demektir. Bunun karşılığında bir ağ ücreti ödersiniz ve onay beklersiniz.

### Adresi gizli tutmak

Bir uygulamanın sizi tanımak için adresinizi saklaması gerekmez. Bazı uygulamalar onu uygulamaya özgü bir değerle birlikte hash'ler; böylece her site aynı kullanıcı için farklı ama sabit bir tanımlayıcı görür. Bu da sitelerin hesaplarınızı ilişkilendirmek için bilgilerini karşılaştırmasını engeller.

<br/>

## <img src="/content-images/icons8-toolbox-9bebbb1619.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="toolbox icon"/> Tavizler

Bunun üzerine bir şey inşa etmeden ya da buna güvenmeden önce anlamaya değer.

| | İmzalı challenge | Shielded ödeme |
|---|---|---|
| Maliyet | Ücretsiz | Giriş başına ağ ücreti |
| Hız | Anında | Onay bekler |
| Cüzdan desteği | Sınırlı, ZIP 304 bir taslak | Geniş, yalnızca memo gerekir |
| Zincirde kayıt bırakır mı | Hayır | Evet, bir işlem vardır |

Ortak sınırlamalar:

- **Varsayılan olarak hesap kurtarma yoktur.** Uygulama bir kurtarma yolu tasarlamadıkça, anahtarı kaybetmek hesabı kaybetmek anlamına gelir
- **Adresin yeniden kullanımı sizi ilişkilendirebilir.** Aynı adresi birçok sitede kullanmak izleme sorununu yeniden yaratır; bu yüzden uygulamaya özgü tanımlayıcılar önemlidir
- **Onaylanmış bir standart yok.** Her projenin kendi şeması vardır; bu yüzden biri için yapılmış giriş sistemi diğeriyle çalışmaz
- **Tek başına anonimlik değildir.** Finansal bilgilerinizi uygulamadan gizler, ancak uygulama içeri girdikten sonra yaptıklarınızı yine de profilleyebilir

<br/>

## <img src="/content-images/icons8-cancel-7f786be3c1.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="cancel icon"/> Kaçınılması Gereken Yaygın Hatalar

- Bir challenge kodunu yeniden kullanmak. Her kod tek kullanımlık olmalı ve hızla süresi dolmalı; aksi takdirde ele geçirilen bir kod yeniden oynatılabilir
- Kullanıcılardan giriş yapmak için anlamlı bir miktar göndermelerini istemek. Ödeme bir kanıttır; dolayısıyla miktar önemsiz olmalıdır
- Uygulamaya özgü bir tanımlayıcı aynı işi görecekken ham adresi saklamak
- Mesaj imzalamanın her yerde çalıştığını varsaymak. Kullanıcılarınızın gerçekten sahip olduğu cüzdanları kontrol edin
- Bir memoyu sonradan sır gibi değerlendirmek. Bu, gönderenin harekete geçtiğini kanıtlar; parola değildir

<br/>

## <img src="/content-images/checked-checkbox-svgrepo-com-7ea19022da.svg" width="28" height="28" className="inline-block align-middle mr-1 p-[2px]" alt="done icon"/> Bunu Araştıran Projeler

Bunlar, [ZecHub Hackathon 3.0](https://zechub.wiki/hackathon)'daki **Zcash Login** kategorisi için geliştirildi. Bitmiş ürünlerden ziyade deneylerdir ve aynı fikrin ne kadar farklı şekillerde inşa edilebileceğini gösterirler.

- **ZecAuth** - başka yerlerde WalletConnect'in yaptığını Zcash için yapma anlayışıyla geliştirilmiş bir cüzdan bağlantı protokolü. Uygulama, oturum açma, ödeme istekleri veya görüntüleme erişimi gibi talep ettiği yeteneklerle birlikte bir challenge taşıyan bir QR kodu ya da `zecauth://` bağlantısı gösterir. İşlem yok, ücret yok, zincir etkileşimi yok. Kodun yanında yazılı bir protokol spesifikasyonu da sunar
- **ZShield** - bir shielded adresi W3C DID ve OpenID Connect kimliğine dönüştürür. Tarayıcı bir anahtar çifti üretir, sunucu ZIP 304 tarzı bir arayüz üzerinden bir nonce verir, cüzdan bunu imzalar ve sunucu bir JWT döndürür. Sonuç OIDC uyumlu olduğu için mevcut uygulamalar bunu özel entegrasyon gerektirmeden kullanabilir
- **ZecPass** - sahipliği imzalı bir memo üzerinden kanıtlar ve uygulamanın kullanıcının adresini hiçbir şekilde öğrenmemesi için tasarlanmıştır. Sabit bir tanımlayıcı olarak kullanmak üzere uygulama kapsamlı bir hash türetir, challenge'ları tek kullanımlık ve zamanla sınırlı tutar ve tak-çalıştır bir React düğmesiyle birlikte bir Node doğrulama kütüphanesi sunar
- **Portal** - memo içinde tek kullanımlık bir kod içeren bir shielded işlem göndererek giriş yapmayı sağlar ve mainnet üzerinde çalışır. Aynı akış ücretli içeriğin kilidini açmak ve bir bağlantı üzerinden para göndermek ya da almak için de yeniden kullanılır
- **ZcashMe** - kimlik kanıtı olarak bir shielded ödeme kullanır ve dizüstü bilgisayarda oturum açmanın bir tarayıcı eklentisi gerektirmemesi için masaüstü-mobil arasındaki boşluğa odaklanır
- **ZBooks** - Zcash ile oturum açmayı ürünün kendisi yerine yeniden kullanılabilir bir kimlik doğrulama primiği olarak ele alan bir muhasebe ve ödeme aracıdır ve hazine verilerini bir Unified Full Viewing Key üzerinden okur

<br/>

## <img src="/content-images/chain-for-links-svgrepo-com-117ee0dec1.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="chain-links icon"/> İlgili sayfalar

- [Memolar](/using-zcash/memos) - şifreli memoların nasıl çalıştığı ve bir giriş kodunun bunlardan birinin içinde nasıl taşındığı
- [Viewing Keys](/zcash-tech/viewing-keys) - harcama yetkisini vermeden salt okunur erişim sağlama
- [Shielded ZEC ile Kayıt Tutmak](/zcash-use-cases/keeping-records-with-shielded-zec) - muhasebeye uygulanmış aynı seçici ifşa fikri
- [Kimliği Bağlamadan Para Göndermek](/zcash-use-cases/send-money-without-linking-identity) - adresin yeniden kullanılmasının gizliliği neden zayıflattığı

<br/>
