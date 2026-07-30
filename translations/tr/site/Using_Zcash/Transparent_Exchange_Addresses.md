# Zcash TEX Adresleri Nedir?

Zcash TEX adresleri, benzersiz bir alıcı adres türünü temsil eder. "Transparent Exchange" adresinin kısaltması olan bu adres, tek bir p2pkh Transparent adresinin **benzersiz**, Unified türünde (bech32m) bir kodlamasıdır. 

Tek amacı, uyumlu bir cüzdana Transparent-Only (T -> T) işlemi yapmasını bildirmektir. 

Mantık şu şekildedir: Uyumlu bir cüzdan bir TEX Adresi tespit ettiğinde, içerdiği Transparent alıcıyı elde etmek için onu çözümler. Cüzdan daha sonra işlem için gereken fonları Shielded havuzundan ayrı, kullanıcı tarafından kontrol edilen, geçici bir Transparent adrese gönderir (Z -> T). Ardından bu fonları TEX adresinden çözümlenen Transparent alıcıya gönderir (T -> T).  

TEX adreslerine yönelik teknik öneri, yalnızca Transparent Adreslerden fon almak için özel bir adres türü tanımlayan Zcash [ZIP 320](https://zips.z.cash/zip-0320) içinde açıklanmıştır.

![TEX](https://i.ibb.co/8m7HPqV/ZashiTex.png)


TEX adresleri henüz yaygın olarak benimsenmemiş olsa da, Zcash kullanıcılarının eninde sonunda bunları kullanması gerekebilir.

## Ne Zaman Bir TEX Adresine İhtiyacım Var

### Doğrudan bir Transparent adrese göndermeyi desteklemeyen bir cüzdan kullanarak bir Transparent adrese fon gönderirken bir TEX adresine **ihtiyacınız vardır**. 
Bazı cüzdanlar doğrudan bir Transparent adrese gönderime izin vermez ve **alıcı TEX eşdeğerini sağlamıyor olabilir**. Bu nedenle, zaman zaman bir Transparent adresten TEX adresine **dönüştürme** gerekebilir. Bu, zip-320'de açıklanan referans uygulama çalıştırılarak manuel olarak yapılabilir. **Transparent-to-TEX-Converter** için barındırılan bir örnek [BURADA](https://690e9524c66a3ecac5d54eff--jade-brioche-873777.netlify.app/) bulunabilir.

### Fonları, bu fonların **Transparent bir kaynaktan gelmesini GEREKTİREN** merkezi bir borsaya gönderirken bir TEX adresine ihtiyacınız vardır. 
Şu anda TEX adreslerini kullanan tek merkezi borsa [Binance](https://www.binance.com/)'tir (ve TEX'in oluşturulmasının temel nedeni de budur). 
TEX adresleri, uyumlu bir cüzdana o adrese gönderilen tüm fonların transparent olması gerektiğini ve söz konusu adrese herhangi bir shielded değerin gönderilmemesi gerektiğini bildirir.
Binance gibi bir borsa gönderilen değeri reddederse, bu değeri geldiği adrese geri göndermek için gerekli araçlara sahiptir. Ayrıca Binance gibi kuruluşların hükümetler veya diğer otoriteler tarafından dayatılan yasa ve düzenlemelere uymasına da yardımcı olur.


## Hangi cüzdanlar TEX Adreslerini destekliyor?

En güncel listeyi [cüzdanlar](https://zechub.wiki/wallets) sayfamızda görebilirsiniz. **TEX Adresi Filtresini** kullanın.
