[![Sayfayı Düzenle](https://img.shields.io/badge/Edit-blue)](https://github.com/zechub/zechub/edit/main/site/Privacy_Tools/2FA_Hardware_Devices.md)

# 2FA Donanım Cihazları

Veri güvenliği ve gizlilik, hem bireyler hem de işletmeler için kritik öneme sahip konulardır. Siber saldırılar ve veri ihlalleri giderek daha yaygın hâle geliyor ve hassas verileri korumak, gizliliğinizi sürdürmek için proaktif adımlar atmak çok önemlidir. Bu önlemlerden biri de, cihazlarınızı ve verilerinizi korumak için ek bir güvenlik katmanı sağlayan donanım güvenlik anahtarlarını kullanmaktır.

## Donanım güvenlik anahtarları nedir?

Donanım güvenlik anahtarı, hesaplarınızı ve cihazlarınızı korumak için iki faktörlü kimlik doğrulama (2FA) amacıyla kullanılan fiziksel bir cihazdır. Yalnızca yetkili kullanıcıların hesaplarınıza ve verilerinize erişebilmesini sağlamak için kullanıcı adınız ve parolanızla birlikte çalışır.

Bu anahtarlar, yalnızca yetkili kullanıcıların hesaplarınıza ve verilerinize erişebilmesini sağlamak için kullanıcı adınız ve parolanızla birlikte çalışacak şekilde tasarlanmıştır. USB bellekler, NFC kartları veya Bluetooth cihazları gibi çeşitli biçimlerde gelirler.

![Donanım Güvenlik Anahtarı Örneği](https://github.com/ZecHub/zechub/assets/81990132/1dff66a4-d8e6-483f-9a1e-065d3974d665)

## Donanım güvenlik anahtarı nasıl çalışır?

Bu teknolojiyi destekleyen web sitesinde veya platformda donanım güvenlik anahtarları üzerinden 2FA’yı etkinleştirmeniz gerekir; örneğin Binance ve Coinbase borsaları.

YubiKey gibi donanım güvenlik anahtarlarıyla, donanım anahtarını masaüstü/dizüstü bilgisayarınızdaki veya akıllı telefonunuzdaki USB ya da Type-C portuna takmanız yeterlidir; anahtar doğrulamayı sizin yerinize tamamlar.

## Donanım güvenlik anahtarı kullanmanın avantajları nelerdir?

Donanım güvenlik anahtarları, geleneksel parola tabanlı kimlik doğrulama yöntemlerine göre çeşitli avantajlar sunar. Parolalara kıyasla saldırıya uğramaları çok daha zordur; çünkü parolalar kaba kuvvet, sosyal mühendislik veya oltalama saldırılarıyla kolayca ele geçirilebilir. Güvenlik anahtarları her kullanımda benzersiz bir kod üretir, bu da saldırganların kodu tahmin etmesini veya kopyalamasını neredeyse imkânsız hâle getirir. Ayrıca kullanımı ve yapılandırılması kolaydır ve cihazınıza ek bir yazılım ya da sürücü kurulmasını gerektirmez.

## Donanım güvenlik anahtarları tüm cihazlar ve işletim sistemleriyle uyumlu mu?

Hayır, donanım güvenlik anahtarları birçok farklı biçimde gelir ve tüm cihazlar ile işletim sistemleriyle uyumlu olmayabilir. Bir anahtar satın almadan önce, cihazınız ve işletim sisteminizle uyumlu olduğundan emin olun.

![Donanım Güvenlik Anahtarı Form Faktörleri](https://github.com/ZecHub/zechub/assets/81990132/a830c435-ad20-4183-b381-475afe1089b3)

## Donanım güvenlik anahtarı birden fazla hesapla kullanılabilir mi?

Evet, tek bir donanım güvenlik anahtarı farklı web siteleri ve hizmetlerde birden fazla hesabı korumak için kullanılabilir.

## Donanım güvenlik anahtarımı kaybedersem ne olur?

Donanım güvenlik anahtarınızı kaybederseniz, hesaplarınızın kilitlenmesi riskiyle karşı karşıya kalırsınız. Bu senaryodan kaçınmak için bir yedek anahtar veya alternatif kimlik doğrulama yöntemi bulundurmanız önerilir.

## 2FA Donanım Örnekleri

İşte piyasada bulunan bazı 2FA donanım örnekleri.

**Yubico YubiKey 5 NFC**

![Yubico YubiKey 5 NFC](https://github.com/ZecHub/zechub/assets/81990132/bf1ac95e-7277-4559-b5ef-63117b66971b)

Birçok güvenlik anahtarında kullanılan FIDO U2F açık kimlik doğrulama standardının ortak geliştiricisi olan Yubico tarafından üretilen YubiKey 5 NFC, cihazlarınızı korumak için güvenilir bir seçenektir. Adından da anlaşılacağı üzere, USB A (veya adaptör kullanılarak USB C) ya da NFC ile çalışır.  
Google Chrome, Facebook, Dropbox, LastPass, 1Password ve daha birçok hizmetle kutudan çıktığı gibi uyumluluk sunar. YubiKey 5 kompakt, dayanıklı ve hafiftir - hatta su geçirmezdir.  
Hizmet talimatlarını izleyip istendiğinde anahtarı USB yuvasına takarak YubiKey’i ikinci bir U2F faktörü olarak sorunsuz şekilde yapılandırabilirsiniz. Anahtar üzerindeki altın renkli daireye dokunmak veya basmak anahtarınızı kaydeder; böylece bir sonraki girişinizde yalnızca parolayı girin, anahtarı takın ve dokunun.

**Thetis Fido U2F Security Key**

![Thetis Fido U2F Security Key](https://github.com/ZecHub/zechub/assets/81990132/b83e42e5-bba6-4175-ad6c-d64972ef54ef)

Bir güvenlik anahtarında fiyat/performans açısından en iyi seçeneği arıyorsanız, Thetis’in bu modeli listenizde olmalı. Üzerinde Bluetooth yoktur (daha pahalı bir modelde mevcuttur) ve yalnızca FIDO U2F standardını destekler; dolayısıyla UAF veya OTP uyumluluğu yoktur. Ancak Windows, macOS veya Linux üzerinde tarayıcı olarak Chrome ya da Opera kullanıyorsanız web sitelerine güvenli erişim sağlar.  
Kullanışlı bir şekilde, bu uygun fiyatlı güvenlik anahtarı, taşıma sırasında konektörün olası hasarlara maruz kalmasını önleyen döner alüminyum gövdeli kompakt katlanabilir bir tasarıma sahiptir. Siyah, Altın ve Gümüş olmak üzere üç çekici renkte sunulur.  
Plastik gövde sağlam ve nispeten dayanıklı hissettirir, ancak çantanızda ağır nesnelerle birlikte bulundurmaktan kaçınmanız iyi olur. Anahtar üzerindeki delik yeterince büyük değildir; bu nedenle anahtarlık veya askı takmak için seçenekleriniz sınırlı olacaktır.

**CryptoTrust OnlyKey**

![CryptoTrust OnlyKey](https://github.com/ZecHub/zechub/assets/81990132/13be6ecc-227e-498c-8a36-6d52c023cd78)

Adından da anlaşılacağı gibi, OnlyKey’de rakiplerinde bulunmayan bazı kullanışlı özellikler vardır. Bilgisayarlara sızan tuş kaydedicileri atlatabilen yerleşik bir tuş takımı sayesinde, bir bilgisayar veya web sitesi ele geçirilmiş olsa bile çevrimiçi hesapları güvende tutabilir. FIDO 2 U2F, Yubico OTP ve TOTP dahil olmak üzere birden fazla 2FA yöntemini destekler.  
Genel kullanıcılar için en iyi parola yöneticisi olmasa da, OnlyKey tek bir anahtar üzerinde 24 OTP hesabı, 24 parola ve 24 kullanıcı adı/URL saklayabilir. Birden fazla parolayı ezberlemek istemiyorsanız ve bunu anahtarın sizin yerinize yapmasını istiyorsanız bu özellik oldukça kullanışlıdır.  
Şifreli yedekleme, kendini imha etme (belirli sayıda hatalı denemeden sonra cihazı siler) ve yeni özelliklere erişmek için ürün yazılımını güncelleyebilme gibi özellikler sunar. Olumsuz tarafı ise, kullanıcı arayüzünün ideal olmaktan uzak olmasıdır.

## 2FA Donanım Anahtarınızı Google hesabınıza bağlama

Artık 2FA donanım anahtarlarının ne olduğunu ve nasıl çalıştığını bildiğinize göre, işte anahtarınızı Google hesabınıza nasıl bağlayacağınız.

**Adım 1**  
Gmail hesabınıza giriş yapın ve **Google Hesabınızı Yönetin** seçeneğine tıklayın

![Google Hesabı - Hesabı Yönet](https://github.com/ZecHub/zechub/assets/81990132/995fc955-791a-4456-9218-7e5964da48b5)

**Adım 2**  
**Güvenlik** seçeneğine tıklayın

![Google Güvenlik Ayarları](https://github.com/ZecHub/zechub/assets/81990132/246db235-6596-41ff-bd7a-f8ee4f80962b)

**Adım 3**  
**2 Adımlı Doğrulama** seçeneğine tıklayın

![2 Adımlı Doğrulama Ekranı](https://github.com/ZecHub/zechub/assets/81990132/19cd202a-1a70-47e6-a02a-aa24f6e199fa)

**Adım 4**  
**Daha Fazla Seçenek Göster** seçeneğini seçin

![Daha Fazla Seçenek Göster](https://github.com/ZecHub/zechub/assets/81990132/2ade9531-1cf6-48e8-b9a8-178d41a4cd30)

**Adım 5**  
Şimdi **Güvenlik Anahtarı** seçeneğini seçin ve ardından **Gelişmiş** seçeneğine tıklayın

**Adım 6**  
2FA güvenlik anahtarınızı bağlayın

**Adım 7**  
Cihaz için istediğiniz adı yazın ve **Bitti** seçeneğine tıklayın
