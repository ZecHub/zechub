<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Transparent_Exchange_Addresses.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Zcash TEX Adresleri Nedir?

## Kısaca

* TEX adresi, farklı bir biçimde yazılmış şeffaf bir Zcash adresidir. `tex1` ile başlar ve [ZIP 320](https://zips.z.cash/zip-0320) içinde tanımlanmıştır.
* Cüzdanınıza tek bir şey söyler: bu adrese yalnızca şeffaf fonlarla ödeme yapın.
* Bakiyeniz korumalıysa, uyumlu bir cüzdan sizin için iki adım gerçekleştirir. Tutarı geçici bir şeffaf adrese taşır, ardından TEX adresine gönderir.
* 2023'te Binance, Zcash topluluğundan korumalı yatırmaları reddetmenin ve geri göndermenin bir yolunu istedi. TEX adresleri bunun yanıtıdır ve Binance, ZecHub [Saklama Hizmeti Sunan Borsalar](/using-zcash/custodial-exchanges) listesinde TEX yatırmalarını kabul eden borsadır.
* Gönderim tarafındaki destek de arttı: Coinbase, kullanıcılarının TEX adreslerine ZEC göndermesine izin veriyor ve cüzdan araç setleri ZIP 320 desteği ekliyor.
* TEX adresine yapılan bir ödeme, her şeffaf ödeme gibi blok zincirinde herkese açıktır. Korumalı bakiyenizin geri kalanı gizli kalır.

## Temel Açıklama

Bir Zcash TEX adresi, özel bir alıcı adresi türüdür. TEX, "Transparent Exchange" anlamına gelir. Tek bir p2pkh Şeffaf adresinin Bech32m ile yeniden kodlanmış hâlidir. TEX adresleri `tex1` ile başlar ve Unified Address'lerden ayrı bir türdür.

Bir TEX adresi, uyumlu bir cüzdana yalnızca şeffaf (T -> T) işlem yapmasını söyler. 

Mantık şöyledir: Uyumlu bir cüzdan TEX Adresi algıladığında, içerdiği Şeffaf alıcıyı elde etmek için onu çözer. Cüzdan daha sonra işlem için gerekli fonları Korumalı havuzdan, kullanıcı tarafından kontrol edilen ayrı ve geçici bir Şeffaf adrese gönderir (Z -> T). Ardından bu fonları TEX adresinin çözümlenmiş Şeffaf alıcısına gönderir (T -> T).  

TEX adreslerine yönelik teknik öneri, yalnızca Şeffaf Adreslerden fon almak için bir adres türü tanımlayan Zcash [ZIP 320](https://zips.z.cash/zip-0320) içinde açıklanmıştır.

![TEX](/content-images/ZashiTex-b1cbec5f07.webp)

### TEX adresleri ne kadar yaygın kullanılıyor?

Benimsenme hâlâ kısmi, ancak artık tek bir borsayla sınırlı değil. Birbirinden ayrılması gereken iki farklı rol vardır:

* **TEX yatırma adresleri oluşturmak.** Binance, [Saklama Hizmeti Sunan Borsalar](/using-zcash/custodial-exchanges) listemizde yatırmalar için TEX adresi veren borsadır; böylece fonlar şeffaf bir kaynaktan gelir ([ZIP 320, Arka Plan](https://zips.z.cash/zip-0320#background)). ZIP 320, diğer borsaların bir ödemenin hangi adresten geldiğini bilmeye ihtiyaç duymadıkları sürece TEX adresi vermelerini öngörmez.
* **TEX adreslerine göndermek.** Büyüyen taraf budur. Ekim 2024'te Coinbase, Coinbase.com kullanıcılarının TEX adreslerine Zcash gönderebildiğini duyurdu ([Coinbase Assets duyurusu](https://x.com/CoinbaseAssets/status/1844428577921507416)). Cüzdan araç setleri de ZIP 320 desteği ekliyor: KeepKey, ürün yazılımı 7.15'te TEX işlemleri için imzalama ekledi ([keepkey/hdwallet #75](https://github.com/keepkey/hdwallet/pull/75)) ve XChainJS `zcash-js` kütüphanesi, geçerli `tex1` alıcılarını reddettikten sonra yamalandı (aşağıda daha fazlası var).

Dolayısıyla TEX adresleri evrensel değildir, ancak okuyucu artık Binance'nin bunların göründüğü tek yer olduğunu varsaymamalıdır.

### TEX Adresine Ne Zaman İhtiyacım Var?

#### Doğrudan Şeffaf adrese göndermeyi desteklemeyen bir cüzdan kullanarak Şeffaf adrese fon gönderirken TEX adresine ihtiyacınız olur.

Bazı cüzdanlar doğrudan Şeffaf adrese gönderime izin vermez ve alıcı bir TEX eşdeğeri sunmayabilir. Bu nedenle, bazen Şeffaf bir adresin TEX adresine dönüştürülmesi gerekebilir. Bu, [zip-320](https://zips.z.cash/zip-0320#reference-implementation) içinde açıklanan referans uygulaması çalıştırılarak elle gerçekleştirilebilir.

#### Fonların Şeffaf bir kaynaktan gelmesini gerektiren merkezi bir borsaya fon gönderirken TEX adresine ihtiyacınız olur.

[Binance](https://www.binance.com/), TEX adreslerinin var olma nedenidir. Kasım 2023'te Zcash topluluğuna, korumalı adreslerden gelen yatırmaları reddetmenin ve yatırımı yapan kişiye geri göndermenin bir yolu bulunmadığı takdirde ZEC'nin listeden çıkarılabileceğini bildirdi ([ZIP 320, Arka Plan](https://zips.z.cash/zip-0320#background)). ZIP 320, diğer borsaların bir ödemenin hangi adresten geldiğini bilmeye ihtiyaç duymadıkları sürece TEX adresi vermelerini öngörmez. Binance, [Saklama Hizmeti Sunan Borsalar](/using-zcash/custodial-exchanges) listemizde TEX adresine yapılan yatırmaları kabul eden borsadır.
TEX adresleri, uyumlu bir cüzdana bu adrese gönderilen tüm fonların şeffaf olması gerektiğini ve tüm korumalı değerlerin söz konusu adrese gönderilmesini engellediğini bildirir.
Binance gibi bir borsa gönderilen değeri reddederse, bu değeri geldiği adrese geri göndermek için gerekli imkânlara sahiptir. Ayrıca Binance gibi kuruluşların hükûmetler veya diğer yetkililer tarafından getirilen yasa ve düzenlemelere uymasına yardımcı olur.

### Hangi cüzdanlar TEX Adreslerini destekliyor?

En güncel listeyi [cüzdanlar](/using-zcash/wallets) sayfamızda görebilirsiniz. TEX Address filtresini kullanın.

## Görsel / Analoji

Korumalı bakiyenizi evinizdeki kilitli bir kasadaki para gibi düşünün. Dışarıdaki hiç kimse içinde ne kadar olduğunu göremez.

Binance gibi bir borsanın gişesinde şu yazan bir tabela vardır: yalnızca şeffaf zarf içindeki ödemeler kabul edilir; böylece gişe görevlisi paranın nereden geldiğini görebilir ve gerekirse geri verebilir. TEX adresi bu tabeladır.

Cüzdanınız tabelayı gördüğünde, tutarı kasadan çıkarır, iade adresinizin bulunduğu şeffaf bir zarfa koyar (geçici şeffaf adres) ve zarfı gişeye götürür. Kasa kilitli kalır ve hiç kimse içinde başka ne olduğunu öğrenmez.

## Derinlemesine İnceleme

### TEX adresi nasıl oluşturulur?

`t1` ile başlayan normal bir şeffaf adres, Base58Check ile yazılmış 20 baytlık bir anahtar karması içerir. TEX adresi, aynı 20 baytı `tex` ön ekiyle (testnet'te `textest`) Bech32m içinde yeniden kodlanmış olarak içerir. Birini diğerine dönüştürmek birkaç satır kod gerektirir; ZIP 320 bunu referans uygulamasında gösterir.

Basit tasarım, Binance'nin bir gereksinimiydi: dönüşüm, borsanın ön uç kodunda yalnızca Base58Check ve Bech32m kütüphaneleriyle çalışmalıydı. ZIP 320'nin önceki bir taslağı bu fikri Unified Address'lere yerleştirmişti ve bu sürüm bu nedenle bırakıldı.

TEX adresleri, Unified Address biçiminden Bech32m kodlamasını ödünç alır ancak yapısının neredeyse hiçbirini korumaz. Bech32m'ye ve Zcash adreslerinin nasıl doğrulandığına yeniyseniz, [Birleşik Adresler](/using-zcash/unified-addresses) sayfası [ZIP 316](https://zips.z.cash/zip-0316) kapsamında temel bilgileri ele alır. Bir TEX adresi, bir Unified Address'den dört somut açıdan farklıdır:

| | Unified Address (ZIP 316) | TEX adresi (ZIP 320) |
|---|---|---|
| İçerdiği şey | birlikte paketlenmiş birkaç alıcı | tek bir P2PKH şeffaf alıcı |
| İnsan tarafından okunabilir ön ek (HRP) | `u` (ana ağ) | `tex` (testnet'te `textest`) |
| F4Jumble gizleme | evet | hayır |
| Her alıcı için tür kodları | evet | hayır |

Kısacası TEX adresi, mümkün olan en sade Bech32m sarmalayıcısıdır: bir şeffaf anahtar karması, bir `tex` ön eki ve başka hiçbir şey.

### Cüzdanlar ve entegratörler için işleme kuralları

Bu, uygulamaların yanlış yaptığı kısımdır; bu yüzden açıkça belirtmekte fayda var. Bir TEX adresi algılandığında, cüzdan veya entegratör **korumalı havuzdan doğrudan TEX hedefine harcama yapmamalıdır.** ZIP 320, TEX ödemesindeki her girdinin şeffaf olmasını gerektirir; dolayısıyla ödeme iki adımda oluşturulur:

1. **Korumasını kaldırın.** Tutarı korumalı havuzdan, cüzdanın sahip olduğu yeni, kullanıcı tarafından kontrol edilen geçici şeffaf adrese taşıyın (Z -> T).
2. **Şeffaftan şeffafa gönderin.** Bu geçici çıktıyı, TEX adresi içindeki çözümlenmiş P2PKH alıcısına harcayın (T -> T).

Tümü ZIP 320'den gelen birkaç kural, bunu güvenli hâle getirir:

* Geçici adres, tohum ifadenizden türetilmelidir; böylece borsa fonları iade ederse cüzdanınız onları yine bulabilir ve harcayabilir.
* Ayrı ödemeler birbirine bağlanamasın diye her seferinde yeni bir geçici adres kullanılmalıdır.
* İkinci işlem yalnızca şeffaf girdiler harcamalıdır; böylece borsa temiz bir şeffaftan şeffafa yatırma görür.

Dönüşüm ve iki adımlı akış, [ZIP 320 referans uygulamasında](https://zips.z.cash/zip-0320#reference-implementation) gösterilmiştir. Bunu yanlış yapmak gerçek ve yakın tarihli bir sorundur: Ekim 2026'da XChainJS `zcash-js` kütüphanesi, doğrulayıcısı yalnızca Base58Check `t1` biçimini kabul ettiği için geçerli `tex1` alıcılarını "Invalid 'to' address" hatasıyla reddetti; bu durum, `tex1` adresi yayımlayan hizmetlere yapılan ZEC yatırmalarını bozdu ([issue #1782](https://github.com/xchainjs/xchainjs-lib/issues/1782)). Doğrulayıcıya ZIP 320 kodlamasını kabul etmesi öğretilerek düzeltildi ([PR #1783](https://github.com/xchainjs/xchainjs-lib/pull/1783)).

### TEX gönderiminin açığa çıkardıkları

TEX ödemesi şeffaf bir ödemedir; dolayısıyla herkese açıktır, ancak bir gözlemcinin neyi görüp neyi göremediği konusunda kesin olmak önemlidir.

Zincir üzerinde **görünenler**:

* Korumayı kaldırma adımının çıktısı ve nihai gönderimin girdisi olarak göründüğü için geçici şeffaf adres.
* Her iki tutar: Z -> T adımında korumalı havuzdan çıkan değer ve T -> T adımında teslim edilen değer.
* TEX adresinde kodlanmış P2PKH adresi olan borsanın şeffaf alıcısı.

**Gizli kalanlar**:

* Korumalı bakiyenizin geri kalanı ve ödemeyi hangi belirli korumalı notların finanse ettiği. Korumayı kaldırma adımı, geçici adrese havuzdan *bir miktar* değer çıktığını açığa çıkarır; ancak havuzun içinde nereden geldiğini göstermez.

Dolayısıyla bir gözlemci geçici adresi borsa ödemesiyle ilişkilendirebilir (aynı fonlar, şeffaftan şeffafa) ve bunun korumalı bir çekimle beslendiğini görebilir. Bunu diğer korumalı fonlarınıza veya etkinliğinize bağlayamaz. Zincir üzerinde ödemeyi "TEX" gönderimi olarak işaretleyen hiçbir şey yoktur: ZIP 320'nin belirttiği gibi, TEX adresine yapılan bir ödeme eşleşen `t1` adresine yapılan ödemeden ayırt edilemez; çünkü mutabakat kuralları değişmemiştir ve tüm kural cüzdanda uygulanır.

![On-chain footprint of a TEX send: funds leave the shielded pool to an ephemeral transparent address, then go transparent-to-transparent to the exchange; the ephemeral address, both amounts and the exchange address are visible, while the rest of the shielded balance stays hidden](/content-images/tex-onchain-footprint.webp)

### Blok zincirinin gösterdikleri

TEX kuralı cüzdanlarda bulunur. Düğümler bunu denetlemez; dolayısıyla mutabakat kuralları aynı kalır. Zincir üzerinde TEX adresine yapılan ödeme, eşleşen `t1` adresine yapılan ödemeyle aynı görünür. Tutar, geçici adres ve borsanın adresi, her şeffaf işlemde olduğu gibi herkese açıktır.

## İlgili Sayfalar

- [Unified Address'ler](/using-zcash/unified-addresses): `u1` 316 kapsamındaki ZIP adres biçimi ve TEX adresinin yeniden kullandığı Bech32m temelleri.
- [Saklama Hizmeti Sunan Borsalar](/using-zcash/custodial-exchanges): Binance'nin TEX yatırmaları dâhil olmak üzere, hangi borsaların hangi adres türlerini kabul ettiği.
- [Cüzdanlar](/using-zcash/wallets): TEX adresine ödeme yapabilen cüzdanları bulmak için TEX Address filtresini kullanın.
- [Korumalı Havuzlar](/using-zcash/shielded-pools): TEX ödemesi özel bakiyenizin bir kısmını dışarı taşımadan önce bakiyenizin bulunduğu yer.
- [Zcash Ödemenizi Kimler Görebilir](/start-here/who-can-see-your-zcash-payment): fonlar korumalı havuzdan ayrıldığında nelerin görünür hâle geldiği.
- [Bir Blok Gezgini Neleri Görebilir](/zcash-tech/what-a-block-explorer-can-see): şeffaf bir ödemenin zincir üzerinde nasıl göründüğü.
- [Zcash Ödeme Talebi URI'leri](/using-zcash/payment-request-uris): önceden doldurulmuş ödemeler için başka bir cüzdan standardı.

**Son güncelleme:** Ekim 2026
