[![Edit Page](https://img.shields.io/badge/Edit-blue)](https://github.com/zechub/zechub/edit/main/site/Privacy_Tools/2FA_Hardware_Devices.md)

# 2FA Donanım Cihazları

Veri güvenliği ve gizlilik, bireyler ve işletmeler için kritik konulardır. Siber saldırılar ve veri ihlalleri giderek daha yaygın hale geliyor; hassas verileri korumak ve gizliliğinizi sürdürmek için proaktif adımlar atmak büyük önem taşıyor. Bu önlemlerden biri, cihazlarınızı ve verilerinizi korumak için ek bir güvenlik katmanı sağlayan donanım güvenlik anahtarlarını kullanmaktır.

## Donanım güvenlik anahtarları nedir?

Donanım güvenlik anahtarı, hesaplarınızı ve cihazlarınızı korumak için iki faktörlü kimlik doğrulamada (2FA) kullanılan fiziksel bir cihazdır. Yalnızca yetkili kullanıcıların hesaplarınıza ve verilerinize erişebilmesini sağlamak için kullanıcı adınız ve parolanızla birlikte çalışır.

Bu anahtarlar, yalnızca yetkili kullanıcıların hesaplarınıza ve verilerinize erişebilmesini sağlamak üzere kullanıcı adınız ve parolanızla birlikte çalışacak şekilde tasarlanmıştır. USB bellekler, NFC kartları veya Bluetooth cihazları gibi çeşitli biçimlerde bulunurlar.

![Donanım güvenlik anahtarı örneği](/content-images/1dff66a4-d8e6-483f-9a1e-065d3974d665-a4c6c73e00.webp)

## Donanım güvenlik anahtarı nasıl çalışır

Bu teknolojiyi destekleyen web sitesinde veya platformda donanım güvenlik anahtarları aracılığıyla 2FA'yı etkinleştirmeniz gerekir; örneğin Binance ve Coinbase borsalarında.

YubiKey gibi donanım güvenlik anahtarlarıyla, donanım anahtarını masaüstü/dizüstü bilgisayarınızın veya akıllı telefonunuzun USB ya da Type-C bağlantı noktasına takmanız yeterlidir; anahtar doğrulamayı sizin için tamamlar.

## Donanım güvenlik anahtarı kullanmanın faydaları nelerdir?

FIDO U2F veya FIDO2/WebAuthn ile kullanıldığında donanım güvenlik anahtarı, sizin yazmanız için bir kod üretmek yerine yeni bir doğrulama sorgusunu imzalayarak kimlik doğrulaması yapar. Hizmet bir açık anahtar tutarken özel anahtar kimlik doğrulayıcıda kalır. Kimlik bilgileri hizmete özeldir ve tarayıcı, kimlik avına karşı koymak için güvenilen tarafın kimliğini denetler. Bu faydalar, çok protokollü bir anahtarın destekleyebileceği her yöntemi değil, FIDO kimlik doğrulamasını tanımlar. Kullanmayı düşündüğünüz yöntemin hizmetiniz, tarayıcınız, cihazınız ve bağlantı türünüz tarafından desteklendiğini kontrol edin. [Yubico'nun WebAuthn tanıtımına](https://developers.yubico.com/WebAuthn/) ve [FIDO2/WebAuthn geliştirici kılavuzuna](https://developers.yubico.com/WebAuthn/WebAuthn_Developer_Guide/) bakın.

## Donanım güvenlik anahtarları tüm cihazlar ve işletim sistemleriyle uyumlu mudur?

Hayır, donanım güvenlik anahtarları çeşitli biçimlerde bulunur ve tüm cihazlar ve işletim sistemleriyle uyumlu olmayabilir. Bir anahtar satın almadan önce cihazınız ve işletim sisteminizle uyumlu olduğundan emin olun.

![Donanım güvenlik anahtarı biçimleri](/content-images/a830c435-ad20-4183-b381-475afe1089b3-5537cd7388.webp)

## Bir donanım güvenlik anahtarı birden fazla hesapla kullanılabilir mi?

Evet, tek bir donanım güvenlik anahtarı farklı web sitelerindeki ve hizmetlerdeki birden fazla hesabı korumak için kullanılabilir.

## Donanım güvenlik anahtarımı kaybedersem ne olur?

Donanım güvenlik anahtarınızı kaybederseniz hesaplarınıza erişiminizin engellenmesi riski vardır. Bu durumu önlemek için yedek bir anahtarınızın veya alternatif bir kimlik doğrulama yönteminizin olması önerilir.

## 2FA Donanım Örnekleri

Piyasada bulunan 2FA donanım ürünlerinden bazı örnekler şunlardır.

**Yubico YubiKey 5 NFC**

![Yubico YubiKey 5 NFC](/content-images/bf1ac95e-7277-4559-b5ef-63117b66971b-3aa542aba7.webp)

Birçok güvenlik anahtarının kullandığı FIDO U2F açık kimlik doğrulama standardının eş geliştiricisi Yubico tarafından üretilen YubiKey 5 NFC, cihazlarınızı korumak için güvenilir bir seçenektir. Adından da anlaşılacağı üzere USB A (veya bir adaptörle USB C) ya da NFC kullanır.  
Google Chrome, Facebook, Dropbox, LastPass, 1Password ve daha fazlası dahil olmak üzere birçok hizmetle kutudan çıktığı gibi uyumludur. YubiKey 5 kompakt, dayanıklı ve hafiftir; ayrıca su geçirmezdir.  
Hizmetin talimatlarını izleyerek ve istendiğinde anahtarı USB yuvasına takarak YubiKey'i sorunsuzca ikinci bir U2F faktörü olarak yapılandırabilirsiniz. Anahtardaki altın renkli daireye dokunmak veya basmak anahtarınızı kaydeder; böylece bir sonraki oturum açışınızda parolanızı girip anahtarı takmanız ve ona dokunmanız yeterlidir.

**Thetis Fido U2F Güvenlik Anahtarı**

![Thetis Fido U2F Security Key](/content-images/b83e42e5-bba6-4175-ad6c-d64972ef54ef-a2ef17a10d.webp)

Fiyatına göre en iyi güvenlik anahtarını arıyorsanız Thetis'in bu modeli listenizde olmalı. Yerleşik Bluetooth özelliği yoktur (daha pahalı bir modelde bulunur) ve yalnızca FIDO U2F standardını desteklediğinden UAF veya OTP uyumluluğu sunmaz. Ancak Windows, macOS veya Linux üzerinde tarayıcı olarak Chrome ya da Opera kullanıyorsanız web sitelerine güvenli erişim sağlar.  
Bu uygun fiyatlı güvenlik anahtarı, taşıma sırasında bağlantı noktasının zarar görmesini önleyen, döner alüminyum kasalı kompakt ve katlanabilir bir tasarıma sahiptir. Siyah, Altın ve Gümüş olmak üzere üç çekici renkte sunulur.  
Plastik kasa sağlam ve nispeten dayanıklı hissettirir, ancak çantanızda ağır nesnelerle birlikte taşımaktan kaçınmanız gerekir. Anahtardaki delik yeterince büyük olmadığından anahtarlık veya boyun askısı takma seçenekleriniz sınırlı olacaktır.

**CryptoTrust OnlyKey**

![CryptoTrust OnlyKey](/content-images/13be6ecc-227e-498c-8a36-6d52c023cd78-06e3e924dc.webp)

Adından da anlaşılacağı üzere OnlyKey, rakiplerinde bulunmayan bazı kullanışlı özelliklere sahiptir. Bilgisayarlara sızan tuş kaydedicileri devre dışı bırakabilen yerleşik tuş takımı sayesinde, bir bilgisayarın veya web sitesinin güvenliği ihlal edilse bile çevrimiçi hesaplarınızı güvende tutabilir. FIDO 2 U2F, Yubico OTP ve TOTP dahil olmak üzere birden fazla 2FA yöntemini destekler.  
Genel kullanım için en iyi parola yöneticisi olmasa da OnlyKey tek bir anahtarda 24 OTP hesabı, 24 parola ve 24 kullanıcı adı/URL saklayabilir. Birden fazla parolayı ezberlemek istemiyorsanız ve bunu sizin yerinize anahtarın yapmasını tercih ediyorsanız bu özellik oldukça kullanışlıdır.  
Şifrelenmiş yedekleme, belirli sayıda yanlış denemeden sonra cihazdaki verileri silen kendi kendini imha etme ve yeni özelliklere erişmek için ürün yazılımını güncelleme olanağı gibi özellikler sunar. Olumsuz yönü ise kullanıcı arayüzünün pek iyi olmamasıdır.

## 2FA Donanım Anahtarınızı Google hesabınıza bağlama

Artık 2FA donanım anahtarlarının ne olduğunu ve nasıl çalıştığını bildiğinize göre, anahtarınızı Google hesabınıza nasıl bağlayacağınızı burada bulabilirsiniz.

**1. Adım**  
Gmail hesabınızda oturum açın ve **Google Hesabınızı Yönetin** seçeneğine tıklayın.

![Google Account - Manage Account](/content-images/995fc955-791a-4456-9218-7e5964da48b5-31c64640b2.webp)

**2. Adım**  
**Güvenlik** seçeneğine tıklayın.

![Google Security Settings](/content-images/246db235-6596-41ff-bd7a-f8ee4f80962b-340193c2c3.webp)

**3. Adım**  
**2 Adımlı Doğrulama** seçeneğine tıklayın.

![2 adımlı doğrulama ekranı](/content-images/19cd202a-1a70-47e6-a02a-aa24f6e199fa-a9fcb911ce.webp)

**4. Adım**  
**Daha Fazla Seçeneği Göster** seçeneğini belirleyin.

![Show More Options](/content-images/2ade9531-1cf6-48e8-b9a8-178d41a4cd30-b1e9ea1400.webp)

**5. Adım**  
Şimdi **Güvenlik Anahtarı** seçeneğini belirleyin ve ardından **İleri** seçeneğine tıklayın.

**6. Adım**  
2FA güvenlik anahtarınızı bağlayın.

**7. Adım**  
Cihaz için istediğiniz adı yazın ve **Bitti** seçeneğine tıklayın.
