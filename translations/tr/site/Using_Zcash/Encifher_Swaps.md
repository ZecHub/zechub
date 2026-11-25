<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Encifher_Swaps.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Sayfayı düzenle"/>
</a>

# SOL/USDC ile ZEC takası: encrypt.trade kullanımı

> Solana üzerinde SOL veya USDC takas ederek ZEC alın; zincirler arası adım NEAR Intents üzerinden yönlendirilir.


![img1](/content-images/Bkbg5alCll-7a02545c00.webp)



---

## Kısaca

* [encrypt.trade](https://encrypt.trade/zec), SOL veya USDC varlıklarını şifrelenmiş tokenlara (eSOL/eUSDC) sarar, ardından NEAR Intents üzerinden ZEC ile takas eder.
* Tutarlar Solana üzerinde gizlenir, ancak cüzdan adresiniz ve uygulamayı kullanmanız herkese açıktır.
* ZEC yalnızca şeffaf (t1/t3) bir adrese gönderilir; bu nedenle korumalı hâle getirene kadar Zcash Zinciri üzerinde görünür.
* ZEC varlığını ulaşır ulaşmaz cüzdanınızda korumalı hâle getirin.
* Hem uygulama hem de NEAR Intents cüzdanları uyumluluk açısından tarar.

---

## Temel Açıklama
[**encrypt.trade**](https://encrypt.trade/zec), JMD Labs Inc. tarafından işletilen bir Solana uygulamasıdır. Solana üzerinde **SOL veya USDC** varlıklarını **Zcash (ZEC)** ile takas etmenizi sağlar. Tokenlarınız önce şifrelenmiş sürümlerine sarılır; böylece tutarlar Solana üzerinde gizlenir, ardından NEAR Intents üzerinden ZEC ile takas edilir.

Takas bazı açılardan gizlidir, ancak her açıdan değil. Uygulamanın kendi [belgeleri](https://docs.encifher.io/docs), Zincir ile etkileşiminizin anonim olmadığını söylüyor: İnsanlar cüzdanınızın uygulamayı kullandığını görebilir, ancak ne kadar varlık aktardığınızı göremez. ZEC ayrıca şeffaf bir adrese ulaşır; dolayısıyla onu korumalı hâle getirene kadar Zcash Zinciri üzerinde görünür kalır.


![img2](/content-images/ByQ2qpeRee-67fce2814c.webp)

---

###  Takas Etmeden Önce Bilmeniz Gerekenler
- **Solana tarafı.** Sarma işlemi tutarları gizler, ancak cüzdan adresiniz ve uygulamayı kullanmanız herkese açıktır. [en iyi uygulamalar](https://docs.encifher.io/docs/best-practices), basit bir sarma, takas ve açma işleminin işleminizin bağlantısının kurulmasına olanak verdiği konusunda uyarıyor.
- **Şifreleme.** Şifrelenmiş bakiyeler, donanım güvenli bölgesi (TEE) içinde zincir dışında işlenir. Geliştiricilerin [makalesi](https://eprint.iacr.org/2026/1504), bunun yalnızca kriptografiye değil; TEE bütünlüğüne, eşik anahtarlarının dürüstçe yönetilmesine ve bulut doğrulama köküne dayandığını söylüyor.
- **Zincirler arası adım.** ZEC ile takas, bağımsız çözücülerin emri yerine getirdiği NEAR Intents üzerinden yönlendirilir.
- **Zcash tarafı.** NEAR Intents, [yalnızca şeffaf adresler](https://docs.near-intents.org/resources/chain-support) için desteklenen seçenek olarak ZEC varlığını listeliyor. Bu kılavuz Eylül 2026'da kontrol edildiğinde encrypt.trade'deki ZEC alanı yalnızca şeffaf (t1 veya t3) adresleri kabul ediyordu. Şeffaf bir adres, siz onu korumalı hâle getirene kadar bakiyesini ve gelen transferleri herkese açık biçimde gösterir.
- **Tarama.** Uygulama, bağlanan cüzdanları TRM ve Chainalysis gibi veritabanlarına göre kontrol ediyor. Uygulamanın [uyumluluk sayfası](https://docs.encifher.io/docs/compliance), meşru bir hukuki gerekçe bulunması hâlinde şifrelenmiş kayıtların incelenebileceğini söylüyor. NEAR Intents da kendi [tarama](https://docs.near-intents.org/security-compliance/risk-and-compliance) işlemini yürütüyor.

---

###  Adım 1: Solana Cüzdanınızı Bağlayın  
**Chrome veya Firefox** kullanarak [encrypt.trade](https://encrypt.trade/zec) adresini ziyaret edin ve **Phantom**, **Solflare** ya da **Slope** cüzdanınızı bağlayın. Cüzdanınızda gas ücretleri ve takas etmek istediğiniz tokenlar için yeterli **SOL** bulunduğundan emin olun. Bağlandıktan sonra varlıklarınızı sarmaya hazırsınız.


![img3](/content-images/SyVOs6lRxx-cbd8193e84.webp)





---

![img4](/content-images/Bkh_jTgCex-2fc8428592.webp)


---

###  Adım 2: Tokenlarınızı Sarın
**Wrap** bölümüne gidin. **SOL** veya **USDC** seçin, tutarı girin ve onaylayın. Uygulama varlıklarınızı kilitler ve **şifrelenmiş sürümlerini (eSOL veya eUSDC)** çıkarır. Sardığınız tutarın takas ettiğiniz tutardan farklı olması, bu ikisinin tutar üzerinden eşleştirilmesini zorlaştırır; ancak cüzdanınızın uygulamayı kullandığını gizlemez.




![img5](/content-images/S10J26xCxg-6322a40b18.webp)

---



![img6](/content-images/Sk0y3Te0gl-124792365a.webp)


---

###  Adım 3: ZODL Cüzdanınızı Hazırlayın  
ZODL tarafından sürdürülen Zcash cüzdanı olan [**ZODL**](https://zodl.com) uygulamasını indirin. Receive ekranında **Zcash Şeffaf Adresinizi** kopyalayın (t1 ile başlar). encrypt.trade şu anda ZEC için korumalı veya birleşik adresleri kabul etmiyor. Devam etmeden önce kurtarma ifadenizi güvenli bir yere kaydedin.


![img7](/content-images/SykjhpgRll-60d19f6979.webp)


---

###  Adım 4: Takas Edin
**encrypt.trade** sayfasına geri dönün ve **Swap** bölümüne gidin. **eSOL/eUSDC -> ZEC** seçeneğini belirleyin, ZODL şeffaf adresinizi yapıştırın, ayrıntıları gözden geçirin ve onaylayın.



![img8](/content-images/SJkI6pl0ge-9f93d8f34c.webp)

---


![img9](/content-images/S1yoapgRle-6d2031a62c.webp)


Zincirler arası yönlendirmeyi **NEAR Intents** gerçekleştirir ve **ZEC** varlığını ZODL cüzdanınıza gönderir. Bu işlem birkaç dakika sürebilir. NEAR Intents, zincirler arası takaslar için 15 dakikaya kadar beklemenizi öneriyor.



![img10](/content-images/S1h36Tg0xl-2d7dd0a495.webp)

---

###  Adım 5: ZEC Varlığınızı Korumalı Hâle Getirin
ZEC ulaştığında, ZODL uygulamasındaki **Shield** seçeneğini kullanarak onu [korumalı havuza](/using-zcash/shielded-pools) taşıyın. O zamana kadar bakiyeyi herkesin görebileceği şeffaf bir adreste durur. Korumalı hâle getirmek sonraki işlemlerinizi korur, ancak gelen transfer ve korumalı hâle getirme işlemi Zincir üzerinde görünür kalır. Bağlantıları her zaman doğrulayın, adresleri yeniden kullanmaktan kaçının ve önce küçük tutarlarla deneyin.

---

###  Kimler Dahil ve Nereden Yardım Alabilirsiniz
- **encrypt.trade**, JMD Labs Inc. tarafından işletilen uygulamadır. [gizlilik politikası](https://encrypt.trade/privacy), IP adresi, tarayıcı ve cihaz ayrıntıları gibi teknik verileri topladığını; takas öncesinde cüzdan adresinizi, yakın geçmişinizi ve bakiyelerinizi uyumluluk sağlayıcılarına gönderdiğini ve günlükleri ile AML tarama sonuçlarını beş yıla kadar saklayabileceğini söylüyor. [koşulları](https://encrypt.trade/terms), konumunuzu gizlemek için VPN veya proxy kullanmanızı yasaklıyor. Destek: help@encifher.io veya uygulamada bağlantısı verilen [Telegram grubu](https://t.me/+ZWHGMW4ZHXQwYTZl).
- **NEAR Intents**, zincirler arası adımı yönlendirir ve ZEC varlığını teslim eder. [1Click API koşullarına](https://docs.near-intents.org/security-compliance/terms-of-service) ve near.com/privacy adresindeki gizlilik politikasına bakın; takasları [NEAR Intents Gezgini](https://explorer.near-intents.org) üzerinden takip edin ve yardım için [NEAR Intents Telegram](https://t.me/near_intents) kanalına başvurun.

Koşullar ve desteklenen adresler değişebilir; bu nedenle büyük bir takas yapmadan önce güncel sürümleri kontrol edin. Daha geniş kapsamlı bilgi için [Gözetimsiz Borsalar](/using-zcash/non-custodial-exchanges) sayfasına bakın.

---

**Solana**, **Zcash** ve **NEAR Intents** bileşenlerini bir araya getiren **encrypt.trade**, SOL veya USDC varlığından ZEC varlığına hızlı bir geçiş sunar. Solana üzerinde tutarları gizler, ancak baştan sona gizlilik sağlamaz; bu nedenle ZEC varlığınız cüzdanınıza ulaşınca onu korumalı hâle getirin.
