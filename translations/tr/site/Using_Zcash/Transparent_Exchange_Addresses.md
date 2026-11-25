<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Transparent_Exchange_Addresses.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Sayfayı düzenle"/>
</a>

# Zcash TEX Adresleri Nedir?

## Kısaca

* TEX adresi, farklı bir biçimde yazılmış şeffaf bir Zcash adrestir. `tex1` ile başlar ve [ZIP 320](https://zips.z.cash/zip-0320) içinde tanımlanır.
* Cüzdanınıza tek bir şey söyler: Bu adrese yalnızca şeffaf fonlarla ödeme yapın.
* Bakiyeniz korumalıysa uyumlu bir cüzdan sizin için iki adım atar. Tutarı geçici bir şeffaf adrese taşır, ardından TEX adresine gönderir.
* 2023'te Binance, korumalı yatırımları reddedip geri göndermenin bir yolunu bulması için Zcash topluluğuna başvurdu. TEX adresleri bu sorunun yanıtıdır ve Binance, ZecHub [Gözetimli Borsalar](/using-zcash/custodial-exchanges) listesinde TEX yatırımlarını kabul eden borsadır.
* Gönderim tarafındaki destek de arttı: Coinbase, kullanıcılarının ZEC'i TEX adreslerine göndermesine olanak tanıyor ve cüzdan araç takımları ZIP 320 desteği ekliyor.
* TEX adresine yapılan ödeme, her şeffaf ödeme gibi blokzincirde herkese açıktır. Korumalı bakiyenizin geri kalanı gizli kalır.

## Temel Açıklama

Zcash TEX adresi, özel bir alıcı adresi türüdür. TEX, “Transparent Exchange” (Şeffaf Borsa) anlamına gelir. Tek bir p2pkh Şeffaf adresinin Bech32m yeniden kodlamasıdır. TEX adresleri `tex1` ile başlar ve Birleşik Adreslerden ayrı bir türdür.

TEX adresi, uyumlu bir cüzdana yalnızca Şeffaf (T -> T) işlem yapmasını söyler.

İşleyiş şöyledir: Uyumlu bir cüzdan TEX Adresi algıladığında, içerdiği Şeffaf alıcıyı elde etmek için adresin kodunu çözer. Ardından cüzdan, işlem için gereken fonları Korumalı havuzdan ayrı, kullanıcı denetimindeki geçici bir Şeffaf adrese (Z -> T) gönderir. Daha sonra bu fonları TEX adresinin kodu çözülmüş Şeffaf alıcısına gönderir (T -> T).

TEX adresleri için teknik öneri, Zcash [ZIP 320](https://zips.z.cash/zip-0320) içinde açıklanmıştır. Bu öneri, yalnızca Şeffaf Adreslerden fon almak üzere bir adres türü tanımlar.

![TEX](/content-images/ZashiTex-b1cbec5f07.webp)

### TEX adresleri ne kadar yaygın kullanılıyor?

Benimsenme hâlâ kısmi olsa da artık tek bir borsayla sınırlı değil. Birbirinden ayrılması gereken iki farklı rol var:

* **TEX yatırım adresleri oluşturma.** Binance, [Gözetimli Borsalar](/using-zcash/custodial-exchanges) listemizde yatırımlar için TEX adresi veren borsadır; böylece fonlar şeffaf bir kaynaktan gelir ([ZIP 320, Arka Plan](https://zips.z.cash/zip-0320#background)). ZIP 320, bir ödemenin hangi adresten geldiğini bilmeleri gerekmedikçe diğer borsaların TEX adresi oluşturmasını beklemiyor.
* **TEX adreslerine gönderim.** Büyüyen taraf burasıdır. Ekim 2024'te Coinbase, Coinbase.com kullanıcılarının Zcash'i TEX adreslerine gönderebileceğini duyurdu ([Coinbase Varlıklar duyurusu](https://x.com/CoinbaseAssets/status/1844428577921507416)). Cüzdan araç takımları da ZIP 320 desteği ekliyor: KeepKey, 7.15 ürün yazılımında TEX işlemleri için imza desteği ekledi ([keepkey/hdwallet #75](https://github.com/keepkey/hdwallet/pull/75)) ve XChainJS `zcash-js` kitaplığı, geçerli `tex1` alıcılarını reddettikten sonra yamalandı (aşağıda daha fazla bilgi var).

Dolayısıyla TEX adresleri evrensel değil, ancak artık Binance'in göründükleri tek yer olduğunu varsaymamalısınız.

### TEX Adresine Ne Zaman İhtiyaç Duyarım

#### Doğrudan Şeffaf adrese gönderimi desteklemeyen bir cüzdan kullanarak Şeffaf adrese fon gönderirken TEX adresine ihtiyaç duyarsınız.

Bazı cüzdanlar doğrudan Şeffaf adrese gönderime izin vermez ve alıcı TEX karşılığını sağlamayabilir. Bu nedenle bazen Şeffaf adresi TEX adresine dönüştürmek gerekebilir. Bu işlem, [zip-320](https://zips.z.cash/zip-0320#reference-implementation) içinde açıklanan referans uygulama çalıştırılarak elle yapılabilir.

#### Merkezi bir borsaya, fonların Şeffaf bir kaynaktan gelmesini gerektirdiği durumlarda fon gönderirken TEX adresine ihtiyaç duyarsınız.

[Binance](https://www.binance.com/), TEX adreslerinin var olma nedenidir. Kasım 2023'te Zcash topluluğuna, korumalı adreslerden gelen yatırımları reddedip yatıran kişiye geri göndermenin bir yolu bulunmazsa ZEC'in borsadan çıkarılabileceğini bildirdi ([ZIP 320, Arka Plan](https://zips.z.cash/zip-0320#background)). ZIP 320, bir ödemenin hangi adresten geldiğini bilmeleri gerekmedikçe diğer borsaların TEX adresi oluşturmasını beklemiyor. Binance, listemizde TEX adresine yatırımları kabul eden borsadır: [Gözetimli Borsalar](/using-zcash/custodial-exchanges).
TEX adresleri, uyumlu bir cüzdana bu adrese gönderilen tüm fonların şeffaf olması gerektiğini ve korumalı hiçbir değerin söz konusu adrese gönderilmemesi gerektiğini bildirir.
Binance gibi bir borsa gönderilen değeri reddederse, bu değeri geldiği adrese geri göndermek için gerekli imkânlara sahiptir. Bu, Binance gibi kuruluşların hükümetlerin veya diğer yetkili makamların koyduğu yasa ve düzenlemelere uymasına da yardımcı olur.

### Hangi cüzdanlar TEX Adreslerini destekliyor?

En güncel listeyi [cüzdanlar](/using-zcash/wallets) sayfamızda görebilirsiniz. TEX Adresi filtresini kullanın.

## Görsel / Benzetme

Korumalı bakiyenizi evinizdeki kilitli bir kasada duran para gibi düşünün. Dışarıdan hiç kimse içinde ne kadar olduğunu göremez.

Binance gibi bir borsanın gişesinde şu yazıyı düşünün: Ödemeler yalnızca şeffaf zarfta kabul edilir; böylece görevli paranın nereden geldiğini görebilir ve gerekirse geri verebilir. TEX adresi bu yazı gibidir.

Cüzdanınız bu yazıyı gördüğünde, tutarı kasadan çıkarır, üzerine iade adresinizi yazar (geçici şeffaf adres) ve şeffaf bir zarfa koyar; ardından zarfı gişeye götürür. Kasa kilitli kalır ve hiç kimse içindeki diğer şeyleri öğrenemez.

## Ayrıntılı İnceleme

### TEX adresi nasıl oluşturulur?

`t1` ile başlayan normal bir şeffaf adres, Base58Check biçiminde yazılmış 20 baytlık bir anahtar karması içerir. TEX adresi aynı 20 baytı `tex` önekiyle Bech32m biçiminde yeniden kodlar (testnette `textest`). ZIP 320'nin referans uygulamasında gösterildiği gibi, birini diğerine dönüştürmek yalnızca birkaç satır kod gerektirir.

Basit tasarım, Binance tarafından bir gereklilik olarak belirlendi: dönüşümün borsanın ön yüz kodunda yalnızca Base58Check ve Bech32m kitaplıklarıyla çalışması gerekiyordu. ZIP 320'nin önceki bir taslağı bu fikri Birleşik Adreslere dahil etmişti; bu sürüm söz konusu nedenle bırakıldı.

TEX adresleri Bech32m kodlamasını Birleşik Adres biçiminden alır, ancak yapısının neredeyse hiçbirini kullanmaz. Bech32m konusunda ve Zcash adreslerinin nasıl doğrulandığı hakkında yeniyseniz, [Birleşik Adresler](/using-zcash/unified-addresses) sayfasının [ZIP 316](https://zips.z.cash/zip-0316) kapsamındaki temel bilgiler bölümüne bakabilirsiniz. TEX adresi, Birleşik Adresten dört somut yönden farklıdır:

| | Birleşik Adres (ZIP 316) | TEX adresi (ZIP 320) |
|---|---|---|
| İçerdiği | birlikte gruplanmış birkaç alıcı | tek bir P2PKH şeffaf alıcı |
| İnsan tarafından okunabilir önek (HRP) | `u` (mainnet) | `tex` (testnette `textest`) |
| F4Jumble gizleme | evet | hayır |
| Her alıcı için tür kodları | evet | hayır |

Kısacası TEX adresi, mümkün olan en yalın Bech32m sarmalayıcısıdır: tek bir şeffaf anahtar karması, bir `tex` öneki ve başka hiçbir şey.

### Cüzdanlar ve entegrasyonlar için işleme kuralları

Uygulamaların yanlış yaptığı kısım burasıdır; bu nedenle açıkça belirtmek gerekir. Bir cüzdan veya entegrasyon TEX adresi algıladığında **doğrudan korumalı havuzdan TEX hedef adresine harcama yapmamalıdır.** ZIP 320, TEX ödemesindeki her girdinin şeffaf olmasını gerektirir; bu nedenle ödeme iki adımda oluşturulur:

1. **Korumalı havuzdan çıkarma.** Tutarı korumalı havuzdan cüzdanın sahibi olduğu, yeni ve kullanıcı denetimindeki geçici bir şeffaf adrese taşıyın (Z -> T).
2. **Şeffaftan şeffafa gönderim.** Bu geçici çıktıyı TEX adresindeki kodu çözülmüş P2PKH alıcısına harcayın (T -> T).

ZIP 320'den gelen birkaç kural bu işlemi güvenli kılar:

* Geçici adres kurtarma ifadenizden türetilmelidir; böylece borsa fonları geri gönderirse cüzdanınız bu fonları bulup harcayabilir.
* Ayrı ödemelerin birbiriyle ilişkilendirilememesi için her seferinde yeni bir geçici adres kullanılmalıdır.
* İkinci işlem yalnızca şeffaf girdileri harcamalıdır; böylece borsa, şeffaftan şeffafa temiz bir yatırım görür.

Dönüştürme ve iki adımlı akış, [ZIP 320 referans uygulamasında](https://zips.z.cash/zip-0320#reference-implementation) gösterilmiştir. Bu işlemi yanlış yapmanın yakın zamanda yaşanmış gerçek bir örneği var: Ekim 2026'da XChainJS `zcash-js` kitaplığı, “Invalid 'to' address” hatasıyla geçerli `tex1` alıcılarını reddetti; çünkü doğrulayıcısı yalnızca Base58Check `t1` biçimini kabul ediyordu. Bu durum, ZEC adresi yayımlayan hizmetlere yapılan yatırımları bozdu (`tex1` adresi) ([issue #1782](https://github.com/xchainjs/xchainjs-lib/issues/1782)). Doğrulayıcıya ZIP 320 kodlamasını kabul etme desteği eklenerek sorun giderildi ([PR #1783](https://github.com/xchainjs/xchainjs-lib/pull/1783)).

### TEX gönderimi neleri açığa çıkarır?

TEX ödemesi şeffaf bir ödemedir ve bu nedenle herkese açıktır; ancak bir gözlemcinin neleri görebileceğini ve göremeyeceğini açıkça belirtmek gerekir.

Zincir üstünde **görülebilenler**:

* Geçici şeffaf adres; korumalı havuzdan çıkarma adımının çıktısı ve son gönderimin girdisi olarak görünür.
* Her iki tutar: Z -> T adımında korumalı havuzdan çıkan değer ve T -> T adımında teslim edilen değer.
* TEX adresinde kodlanmış P2PKH adresi olan borsanın şeffaf alıcısı.

**Gizli kalanlar**:

* Korumalı bakiyenizin geri kalanı ve ödemeyi finanse eden belirli korumalı notelar. Korumalı havuzdan çıkarma adımı, havuzun içindeki hangi kaynaktan geldiğini değil, *bir miktar* değerin havuzdan geçici adrese çıktığını gösterir.

Dolayısıyla bir gözlemci, geçici adresi borsa ödemesiyle ilişkilendirebilir (aynı fonlar, şeffaftan şeffafa) ve bu adrese korumalı bir çekimden fon eklendiğini görebilir. Ancak bu adresi diğer korumalı fonlarınızla veya faaliyetlerinizle ilişkilendiremez. Zincir üstünde ödemeyi “TEX” gönderimi olarak işaretleyen hiçbir şey yoktur: ZIP 320'nin belirttiği gibi, TEX adresine yapılan ödeme, eşleşen `t1` adresine yapılan ödemeden ayırt edilemez; çünkü konsensüs kuralları değişmez ve bu kuralın tamamı cüzdanda uygulanır.

![TEX gönderiminin zincir üstü izi: fonlar korumalı havuzdan geçici bir şeffaf adrese çıkar, ardından borsaya şeffaf adresten şeffaf adrese gider. Geçici adres, her iki tutar ve borsa adresi görünürken korumalı bakiyenin geri kalanı gizli kalır](/content-images/tex-onchain-footprint.webp)

### Blokzincir ne gösterir?

TEX kuralı cüzdanlarda uygulanır. Düğümler bu kuralı denetlemez; dolayısıyla konsensüs kuralları aynı kalır. Zincir üstünde TEX adresine yapılan ödeme, eşleşen `t1` adresine yapılan ödemeyle aynı görünür. Her şeffaf işlemde olduğu gibi tutar, geçici adres ve borsanın adresi herkese açıktır.

## İlgili Sayfalar

- [Birleşik Adresler](/using-zcash/unified-addresses): ZIP 316 kapsamındaki `u1` adres biçimi ve bir TEX adresinin yeniden kullandığı Bech32m temelleri.
- [Gözetimli Borsalar](/using-zcash/custodial-exchanges): Hangi borsaların hangi adres türlerini kabul ettiği; Binance'ın TEX yatırma işlemleri de buna dahildir.
- [Cüzdanlar](/using-zcash/wallets): TEX adresine ödeme yapabilen cüzdanları bulmak için TEX Adresi filtresini kullanın.
- [Korumalı Havuzlar](/using-zcash/shielded-pools): Bir TEX ödemesi bakiyenizin bir kısmını dışarı aktarmadan önce, gizli bakiyenizin bulunduğu yer.
- [Zcash Ödemenizi Kimler Görebilir](/start-here/who-can-see-your-zcash-payment): Fonlar korumalı havuzdan çıktıktan sonra nelerin görünür hâle geldiği.
- [Bir Blok Gezgini Neleri Görebilir](/zcash-tech/what-a-block-explorer-can-see): Şeffaf bir ödemenin zincir üstünde nasıl göründüğü.
- [Zcash Ödeme İsteği URI'leri](/using-zcash/payment-request-uris): Önceden doldurulmuş ödemeler için başka bir cüzdan standardı.

**Son güncelleme:** Ekim 2026
