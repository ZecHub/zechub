<a href="https://github.com/zechub/zechub/edit/main/site/guides/Visualizing_Zcash_Addresses.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>


# Zcash Adreslerini Görselleştirme

Zcash hakkında ilk kez bilgi ediniyorsanız, hemen iki tür [işlemin](https://zechub.wiki/using-zcash/transactions) gerçekleşebileceğini fark edeceksiniz: *transparent* ve *shielded*.
Ayrıca, Zcash ekosistemindeki en son gelişmeleri takip ediyorsanız, [Unified Address](https://electriccoin.co/blog/unified-addresses-in-zcash-explained/) ya da UA'leri öğrenmiş olabilirsiniz.
Zcash sektöründeki kişiler *shielded* işlemlerden söz ettiğinde, sapling veya orchard protokolleri için kodlanmış adresleri içeren işlemleri kastederler. 
UA'ler, *shielded* ya da transparent türündeki *herhangi bir* işlemi tek bir adres içinde birleştirmek için tasarlanmıştır. Bu genelleme, ileriye dönük olarak kullanıcı deneyimini sadeleştirmenin anahtarıdır. Bu rehberin amacı, UA'lere dair anlayışı somut görsel örneklerle desteklemektir.

## Zcash adres türleri

Şu anda kullanımda olan üç ana adres türü vardır. Bunlar şunlardır:

* transparent

![img1](https://user-images.githubusercontent.com/81990132/219261771-a9957ec3-2841-4073-9cfd-1db9d6356693.png)

* sapling

![img2](https://user-images.githubusercontent.com/81990132/219261784-1a617e70-f588-4eed-96bf-f0789d7af58a.png)

* Unified Address (Tam)

![img3](https://user-images.githubusercontent.com/81990132/219261794-bcc79db6-4dc6-4c6a-867b-3717b81e6b71.png)


İlk fark edilecek şey, her adres türünün uzunluğunun farklı olmasıdır. Bunu görsel olarak adres dizisindeki karakter sayısından *veya* ilişkili QR kodlarına bakarak görebilirsiniz. Adresin uzunluğu arttıkça, QR kodu daha fazla veriyi kareye sığdırmak için genellikle uzaklaşmış gibi görünür.

* `t1goiSyw2JinFCmUnfiwwp72LEZzD42TyYu` 35 karakter uzunluğundadır
* `zs1cpf4prtmnqpg6x2ngcrwelu9a39z9l9lqukq9fwagnaqrknk34a7n3szwxpjuxfjdxkuzykel53` 78 karakter uzunluğundadır
* `u1ckeydud0996ftppqrnpdsqyeq4e57qcyjr4raht4dc8j3njuyj3gmm9yk7hq9k88cdkqfuqusgpcpjfhwu3plm2vrd32g8du78kzkm5un357r4vkhz4vhxd4yfl8zvszk99cmsc89qv4trd7jzkcs8h6lukzgy25j8cv76p0g603nrrg6yt6cxsh2v8rmkasskd69ylfyphhjyv0cxs` 213 karakter uzunluğundadır

İkinci dikkat edilmesi gereken şey, her adres dizisinin önekidir -- transparent adresler *t* ile, sapling adresler *zs* ile ve son olarak UA'ler *u1* ile başlar.

Şunu belirtmek önemlidir:

#### "Orchard payment addresses do not have a stand-alone string encoding. Instead, we define "unified addresses" that can bundle together addresses of different types, including Orchard. Unified addresses have a Human-Readable Part of "u" on Mainnet, i.e. they will have the prefix "u1". "

## Unified Address alıcıları

[Burada](https://medium.com/@hanh425/transaction-privacy-78f80f9f175e) ele alındığı gibi, kişi farklı alıcılarla UA'ler oluşturabilir -- transparent, sapling ve orchard adres türlerinin bazı kombinasyonlarıyla.
Tam bir UA'nin yanı sıra, pratikte en sık karşılaşacağınız türler şunlardır:

* transparent + sapling

![img4](https://user-images.githubusercontent.com/81990132/219267475-38ad1419-0aac-4205-b18e-6873283f9d85.png)

* transparent + orchard


![img5](https://user-images.githubusercontent.com/81990132/219267496-90db21ff-f4e1-4a50-8f2a-1a71d995652a.png)

* sapling + orchard


![img6](https://user-images.githubusercontent.com/81990132/219267520-6b731ec2-e911-4469-acc5-c39d4addcac2.png)

* orchard
  
![img7](https://user-images.githubusercontent.com/81990132/219267538-1a748fff-4034-4559-96ac-182723409b3a.png)

İlk dikkat edilmesi gereken şey, bu UA'lerin her birinin aynı private key'den gelmesidir! İkinci dikkat edilmesi gereken şey ise her UA türünün uzunluğudur:

* t+s `u13qutpuktq026dwczvxmnh8mxdacsjx3kg2rrhzgns8zsty53t9y0hqp5d440zc9w7z7zkkjqw8dq0uuc0mkt883464mq8mkys7l4xjnhylh7u3u02ukknurm5yxerqlf500y2atq28e` 141 karakter
* t+o `u1yvwppp7ann6n3pgkysdu0spvr50w4jf4jwgme3c8x8fp4av59rupgvdd3fddc3f2cwrk3ghs5lxt87ggj8cvjuzcrf4jkejwlu9pc83gk2vtx03ucqcc3ed0furcuypqs6d6swu3nws` 141 karakter
* s+o `u1dq8kg78fgpjsc7dn2ynpdzc8xu99wra0jec4jy30rjqk5frsj62qtgqcu9nn0j8g352phlwprshancgxcuhdcclx0wxtvqylhmuegas7ul8hwnwggy727l05pyujuywtnn4nkfznctaelpkcrqcm9cxhkgv3t9jtrvgym7la5varrmzc` 178 karakter
* o   `u1cysntkxwt0h4sahp7rhj7u27pgc2ga7685ekf65g0d5ht5glkfm4zkumhvkd2zg2pdrgv3mrwq2x3vw2yl5u7zef3cr2nqwrzu7v2dsa` 106 karakter

Üçüncü dikkat edilmesi gereken şey, her UA'nin görsel olarak biraz farklı olmasıdır! UA'lerin gücü, son kullanıcılara sundukları *seçimdir*. Gelecekte yeni bir protokole ihtiyaç duyulursa, UA'ler buna hazır olacaktır.

## Kaynaklar

https://zcash.github.io/orchard/design/keys.html

https://medium.com/@hanh425/transaction-privacy-78f80f9f175e
