<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Transparent_Exchange_Addresses.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Sayfayı Düzenle"/>
</a>

# Zcash TEX Adresleri Nedir?

## Özet

* TEX adresi, farklı bir biçimde yazılmış şeffaf bir Zcash adresidir. `tex1` ile başlar ve [ZIP 320](https://zips.z.cash/zip-0320) içinde tanımlanmıştır.
* Cüzdanınıza tek bir şey söyler: bu adrese yalnızca şeffaf fonlarla ödeme yapın.
* Bakiyeniz korumalıysa uyumlu bir cüzdan sizin için iki adım uygular. Tutarı geçici bir şeffaf adrese taşır, ardından TEX adresine gönderir.
* 2023'te Binance, Zcash topluluğundan korumalı yatırmaları reddetmenin ve geri göndermenin bir yolunu istedi. TEX adresleri bunun yanıtıdır ve Binance, ZecHub [Saklama Hizmeti Sunan Borsalar](/using-zcash/custodial-exchanges) listesindeki TEX yatırmalarını kabul eden borsadır.
* Bir TEX adresine yapılan ödeme, tüm şeffaf ödemeler gibi blokzincir üzerinde herkese açıktır. Korumalı bakiyenizin geri kalanı gizli kalır.

## Temel Açıklama

Bir Zcash TEX adresi, özel bir alıcı adresi türüdür. TEX, "Transparent Exchange" anlamına gelir. Tek bir p2pkh Şeffaf adresinin Bech32m ile yeniden kodlanmış hâlidir. TEX adresleri `tex1` ile başlar ve Unified Addresslerden ayrı bir türdür.

Bir TEX adresi, uyumlu bir cüzdana yalnızca Şeffaf (T -> T) işlem yapmasını söyler. 

Mantık şöyledir: Uyumlu bir cüzdan TEX Adresi algıladığında, içerdiği Şeffaf alıcıyı elde etmek için onu çözer. Cüzdan daha sonra işlem için gerekli fonları Korumalı havuzdan, kullanıcının kontrolündeki ayrı ve geçici bir Şeffaf adrese gönderir (Z -> T). Ardından bu fonları TEX adresinin çözülmüş Şeffaf alıcısına gönderir (T -> T).  

TEX adreslerine yönelik teknik öneri, yalnızca Şeffaf Adreslerden fon almak için bir adres türü tanımlayan Zcash [ZIP 320](https://zips.z.cash/zip-0320) içinde açıklanmıştır.

![TEX](/content-images/ZashiTex-b1cbec5f07.webp)

TEX adresleri henüz yaygın olarak benimsenmemiştir. Zcash kullanıcılarının sonunda bunları kullanması gerekebilir.

### TEX Adresine Ne Zaman İhtiyacım Olur?

#### Şeffaf bir adrese doğrudan göndermeyi desteklemeyen bir cüzdan kullanarak Şeffaf bir adrese fon gönderirken TEX adresine ihtiyacınız vardır.

Bazı cüzdanlar doğrudan Şeffaf bir adrese göndermeye izin vermez ve alıcı TEX karşılığını sunmayabilir. Bu nedenle, bazen Şeffaf bir adresten TEX adresine dönüştürme gerekebilir. Bu, [zip-320](https://zips.z.cash/zip-0320#reference-implementation) içinde açıklanan referans uygulama çalıştırılarak manuel olarak gerçekleştirilebilir.

#### Bu fonların Şeffaf bir kaynaktan gelmesini gerektiren merkezi bir borsaya fon gönderirken TEX adresine ihtiyacınız vardır.

[Binance](https://www.binance.com/), TEX adreslerinin var olma nedenidir. Kasım 2023'te, Zcash topluluğuna, korumalı adreslerden gelen yatırmaları reddetmenin ve bunları yatırımı yapana geri göndermenin bir yolu olmadığı sürece ZEC'in listeden çıkarılabileceğini bildirdi ([ZIP 320, Arka Plan](https://zips.z.cash/zip-0320#background)). ZIP 320, diğer borsaların bir ödemenin hangi adresten geldiğini bilmeleri gerekmedikçe TEX adresleri vermesini beklemez. Binance, [Saklama Hizmeti Sunan Borsalar](/using-zcash/custodial-exchanges) listemizde TEX adresine yapılan yatırmaları kabul eden borsadır.
TEX adresleri, uyumlu bir cüzdana bu adrese gönderilen tüm fonların şeffaf olması gerektiğini ve korumalı tüm değerlerin söz konusu adrese gönderilmesini engellediğini bildirir.
Binance gibi bir borsa gönderilen değeri reddederse, bu değeri geldiği adrese geri göndermek için gerekli araçlara sahiptir. Ayrıca Binance gibi kuruluşların hükûmetler veya diğer makamlar tarafından getirilen yasa ve düzenlemelere uymasına yardımcı olur.

### Hangi cüzdanlar TEX Adreslerini destekler?

En güncel listeyi [cüzdanlar](/using-zcash/wallets) sayfamızda görebilirsiniz. TEX Address filtresini kullanın.

## Görsel / Benzetme

Korumalı bakiyenizi evinizdeki kilitli bir kasadaki para gibi düşünün. Dışarıdaki hiç kimse içinde ne kadar olduğunu göremez.

Binance gibi bir borsanın gişesinde şu yazan bir tabela vardır: yalnızca şeffaf bir zarftaki ödemeler kabul edilir; böylece gişe görevlisi paranın nereden geldiğini görebilir ve gerekirse geri verebilir. TEX adresi bu tabeladır.

Cüzdanınız tabelayı gördüğünde, tutarı kasadan çıkarır, üzerinde iade adresinizin yazdığı şeffaf bir zarfa koyar (geçici şeffaf adres) ve zarfı gişeye götürür. Kasa kilitli kalır ve hiç kimse içinde başka ne olduğunu öğrenmez.

## Ayrıntılı İnceleme

### TEX adresi nasıl oluşturulur?

`t1` ile başlayan normal bir şeffaf adres, Base58Check ile yazılmış 20 baytlık bir anahtar özeti içerir. TEX adresi, aynı 20 baytı `tex` ön ekiyle Bech32m'de yeniden kodlanmış olarak içerir (testnet'te `textest`). Birini diğerine dönüştürmek, ZIP 320'nin referans uygulamasında gösterdiği birkaç satır kod gerektirir.

Basit tasarım, Binance tarafından getirilen bir gereksinimdi: dönüştürme, borsanın ön yüz kodunda yalnızca Base58Check ve Bech32m kütüphaneleriyle çalışmak zorundaydı. ZIP 320'nin önceki taslağı fikri Unified Addresses içine yerleştiriyordu ve bu sürüm bu nedenle bırakıldı.

### Korumalı bakiyeden TEX adresine ödeme yapmak

ZIP 320, uyumlu bir cüzdanın burada iki işlem oluşturmasını gerektirir. İlki, fonları korumalı bakiyenizden yeni, geçici bir şeffaf adrese taşır. İkincisi, bunları o adresten TEX adresine gönderir.

Borsa yatırmayı reddederse fonları geçici adrese geri gönderir. Cüzdanınızın bunları bulup harcayabilmesi gerekir; bu nedenle ZIP 320, cüzdanlardan geçici adresleri seed ifadenizden türetmelerini ister. Ayrıca ayrı ödemelerin birbiriyle ilişkilendirilememesi için cüzdanlardan her seferinde yeni bir geçici adres kullanmalarını ister.

### Blokzincirin gösterdiği şey

TEX kuralı cüzdanlarda bulunur. Düğümler bunu denetlemez, bu nedenle fikir birliği kuralları aynı kalır. Zincir üzerinde, bir TEX adresine yapılan ödeme eşleşen `t1` adresine yapılan ödemeyle aynı görünür. Tüm şeffaf işlemlerde olduğu gibi tutar, geçici adres ve borsanın adresi herkese açıktır.

## İlgili Sayfalar

- [Saklama Hizmeti Sunan Borsalar](/using-zcash/custodial-exchanges): Binance'in TEX yatırmaları dâhil olmak üzere hangi borsaların hangi adres türlerini kabul ettiği.
- [Cüzdanlar](/using-zcash/wallets): bir TEX adresine ödeme yapabilen cüzdanları bulmak için TEX Address filtresini kullanın.
- [Korumalı Havuzlar](/using-zcash/shielded-pools): bir TEX ödemesi bakiyenizin bir kısmını dışarı taşımadan önce özel bakiyenizin bulunduğu yer.
- [Zcash Ödemenizi Kimler Görebilir](/start-here/who-can-see-your-zcash-payment): fonlar korumalı havuzdan çıktıktan sonra nelerin görünür hâle geldiği.
- [Bir Blok Gezgini Ne Görebilir](/zcash-tech/what-a-block-explorer-can-see): şeffaf bir ödemenin zincir üzerinde nasıl göründüğü.
- [Zcash Ödeme Talebi URI'leri](/using-zcash/payment-request-uris): önceden doldurulmuş ödemeler için başka bir cüzdan standardı.

**Son güncelleme:** Ekim 2026
