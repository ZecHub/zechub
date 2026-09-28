# **SOL/USDC -> ZEC Takası: Encrypt.trade Kullanımı**  


![img1](/content-images/Bkbg5alCll-7a02545c00.webp)


*Solana'dan Zcash'a takas yapın; zincirler arası adım Near Intents üzerinden yönlendirilir.*  

---

###  Giriş  
[**encrypt.trade**](https://encrypt.trade/zec), JMD Labs Inc. tarafından işletilen bir Solana uygulamasıdır. Solana üzerindeki **SOL veya USDC** varlıklarınızı **Zcash (ZEC)** varlığıyla takas etmenizi sağlar. Tokenleriniz önce tutarların Solana üzerinde gizli kalması için şifrelenmiş sürümlere sarılır, ardından Near Intents aracılığıyla ZEC ile takas edilir.

Takas bazı açılardan özeldir, ancak her açıdan değil. Uygulamanın kendi [dokümanları](https://docs.encifher.io/docs), zincirle etkileşiminizin anonim olmadığını belirtir: insanlar cüzdanınızın uygulamayı kullandığını görebilir, ancak ne kadar taşıdığınızı göremez. ZEC ayrıca şeffaf bir adrese ulaşır; bu nedenle korumalı hale getirene kadar Zcash zincirinde görünür kalır.


![img2](/content-images/ByQ2qpeRee-67fce2814c.webp)

---

###  Takas Yapmadan Önce Bilmeniz Gerekenler  
- **Solana tarafı.** Sarma işlemi tutarları gizler, ancak cüzdan adresiniz ve uygulamayı kullanımınız herkese açıktır. [en iyi uygulamalar](https://docs.encifher.io/docs/best-practices) sayfası, basit bir sarma, takas ve açma işleminin işleminizi ilişkilendirilebilir hale getirdiği konusunda uyarır.
- **Şifreleme.** Şifrelenmiş bakiyeler, bir donanım güvenli alanı (TEE) içinde zincir dışında işlenir. Geliştiricilerin [makalesi](https://eprint.iacr.org/2026/1504), bunun yalnızca kriptografiye değil; TEE bütünlüğüne, dürüst eşikli anahtar yönetimine ve bulut doğrulama köküne dayandığını belirtir.
- **Zincirler arası adım.** ZEC takası, bağımsız çözücülerin emri karşıladığı Near Intents üzerinden yönlendirilir.
- **Zcash tarafı.** Near Intents, ZEC varlığını yalnızca [şeffaf adresler için](https://docs.near-intents.org/resources/chain-support) desteklenen olarak listeler ve encrypt.trade üzerindeki ZEC alanı, bu rehber Eylül 2026'da kontrol edildiğinde yalnızca şeffaf (t1 veya t3) adresleri kabul ediyordu. Şeffaf bir adres, korumalı hale getirene kadar bakiyesini ve gelen transferlerini herkese açık biçimde gösterir.
- **Tarama.** Uygulama, bağlanan cüzdanları TRM ve Chainalysis gibi veritabanlarına karşı kontrol eder; [uyumluluk sayfası](https://docs.encifher.io/docs/compliance), meşru bir hukuki gerekçe varsa şifrelenmiş kayıtların incelenebileceğini belirtir. Near Intents de kendi [tarama](https://docs.near-intents.org/security-compliance/risk-and-compliance) işlemini yürütür.

---

###  Adım 1: Solana Cüzdanınızı Bağlayın  
[encrypt.trade](https://encrypt.trade/zec) sitesini **Chrome veya Firefox** kullanarak ziyaret edin ve **Phantom**, **Solflare** veya **Slope** cüzdanınızı bağlayın. Cüzdanınızda gas ücretleri için yeterli **SOL** ve takas etmek istediğiniz tokenlerin bulunduğundan emin olun. Bağlandıktan sonra varlıklarınızı sarmaya hazırsınız.  


![img3](/content-images/SyVOs6lRxx-cbd8193e84.webp)





---

![img4](/content-images/Bkh_jTgCex-2fc8428592.webp)


---

###  Adım 2: Tokenlerinizi Sarın  
**Wrap** bölümüne gidin. **SOL** veya **USDC** seçin, tutarı girin ve onaylayın. Uygulama varlıklarınızı kilitler ve **şifrelenmiş sürümlerini (eSOL veya eUSDC)** çıkarır. Takas edeceğinizden farklı bir tutarı sarmak, ikisini tutara göre eşleştirmeyi zorlaştırır; ancak cüzdanınızın uygulamayı kullandığını gizlemez.  




![img5](/content-images/S10J26xCxg-6322a40b18.webp)

---



![img6](/content-images/Sk0y3Te0gl-124792365a.webp)


---

###  Adım 3: ZODL Cüzdanınızı Hazırlayın  
[**ZODL**](https://zodl.com) uygulamasını indirin; bu, ZODL tarafından sürdürülen bir Zcash cüzdandır. Alım ekranında **Zcash Şeffaf Adresinizi** kopyalayın (t1 ile başlar). encrypt.trade şu anda ZEC için korumalı veya birleşik adresleri kabul etmez. Devam etmeden önce kurtarma ifadenizi güvenli bir şekilde saklayın.  


![img7](/content-images/SykjhpgRll-60d19f6979.webp)


---

###  Adım 4: Takas  
**encrypt.trade** üzerinde tekrar **Swap** bölümüne gidin. **eSOL/eUSDC -> ZEC** seçin, ZODL şeffaf adresinizi yapıştırın, ayrıntıları gözden geçirin ve onaylayın.



![img8](/content-images/SJkI6pl0ge-9f93d8f34c.webp)

---


![img9](/content-images/S1yoapgRle-6d2031a62c.webp)


**Near Intents**, zincirler arası yönlendirmeyi yönetir ve **ZEC** varlığını ZODL cüzdanınıza gönderir. Bu işlem birkaç dakika sürebilir. Near Intents, zincirler arası takaslar için 15 dakikaya kadar süre tanınmasını önerir.  



![img10](/content-images/S1h36Tg0xl-2d7dd0a495.webp)

---

###  Adım 5: ZEC Varlığınızı Koruyun  
ZEC ulaştığında, onu [korumalı havuza](/using-zcash/shielded-pools) taşımak için ZODL uygulamasının **Shield** seçeneğini kullanın. O zamana kadar, herkesin bakiyeyi görebildiği şeffaf bir adreste bulunur. Koruma, bundan sonra yapacaklarınızı gizler; ancak gelen transfer ve koruma işlemi zincirde görünür kalır. Her zaman bağlantıları doğrulayın, adresleri tekrar kullanmaktan kaçının ve önce küçük tutarlarla deneyin.  

---

###  Kimler Dahil ve Nereden Yardım Alınır  
- **encrypt.trade**, JMD Labs Inc. tarafından işletilen uygulamadır. [gizlilik politikası](https://encrypt.trade/privacy), IP, tarayıcı ve cihaz ayrıntıları gibi teknik verileri topladığını; takastan önce cüzdan adresinizi, yakın geçmişinizi ve bakiyelerinizi uyumluluk sağlayıcılarına gönderdiğini; günlükleri ve AML tarama sonuçlarını beş yıla kadar saklayabileceğini belirtir. [koşulları](https://encrypt.trade/terms), konumunuzu gizlemek için VPN veya proxy kullanılmasını yasaklar. Destek: help@encifher.io veya uygulamadan bağlantı verilen [Telegram grubu](https://t.me/+ZWHGMW4ZHXQwYTZl).
- **Near Intents**, zincirler arası adımı yönlendirir ve ZEC varlığını teslim eder. [1Click API koşullarına](https://docs.near-intents.org/security-compliance/terms-of-service) ve near.com/privacy adresindeki gizlilik politikasına bakın, takasları [Near Intents Explorer](https://explorer.near-intents.org) üzerinde takip edin ve [Near Intents Telegram](https://t.me/near_intents) içinde yardım isteyin.

Koşullar ve desteklenen adresler değişebilir; bu nedenle büyük bir takastan önce güncel sürümleri kontrol edin. Daha geniş tablo hakkında bilgi için [Saklama Hizmeti Sunmayan Borsalar](/using-zcash/non-custodial-exchanges) bölümüne bakın.

---

**Solana**, **Zcash** ve **Near Intents**'i bir araya getiren **encrypt.trade**, SOL veya USDC'den ZEC varlığına hızlı bir rota sunar. Solana'daki tutarları gizler, ancak uçtan uca özel değildir; bu nedenle ZEC varlığınız ulaştığında onu korumalı hale getirin.
