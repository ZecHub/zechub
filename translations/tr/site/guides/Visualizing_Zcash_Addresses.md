<a href="https://github.com/zechub/zechub/edit/main/site/guides/Visualizing_Zcash_Addresses.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Sayfayı düzenle"/>
</a>


# Zcash Adreslerini Görselleştirme

Zcash hakkında ilk kez bilgi ediniyorsanız, gerçekleşebilecek iki tür [işlem](https://zechub.wiki/using-zcash/transactions) olduğunu hemen fark edeceksiniz: *şeffaf* ve *korumalı*.
Ayrıca, Zcash ekosistemindeki en son gelişmeleri takip ediyorsanız [Birleşik Adresler](https://zips.z.cash/zip-0316) veya UA'lar hakkında bilgi edinmiş olabilirsiniz.
Zcash sektöründe *korumalı* işlemlerden söz edildiğinde, sapling veya orchard protokolleri için kodlanmış adresleri içeren işlemler kastedilir.
UA'lar, *herhangi* bir korumalı veya şeffaf işlem türünü tek bir adreste birleştirmek üzere tasarlanmıştır. Bu genelleme, kullanıcı deneyimini (UX) bundan böyle basitleştirmenin anahtarıdır. Bu kılavuzun amacı, somut görsel örneklerle UA'ları daha iyi anlamanıza yardımcı olmaktır.

## Zcash adres türleri

Bugüne kadar kullanımda olan üç ana adres türü vardır. Bunlar şunlardır:

* şeffaf

![img1](/content-images/219261771-a9957ec3-2841-4073-9cfd-1db9d6-574fc930f0.webp)

* sapling

![img2](/content-images/219261784-1a617e70-f588-4eed-96bf-f0789d-e10ebfc543.webp)

* Birleşik Adres (Tam)

![img3](/content-images/219261794-bcc79db6-4dc6-4c6a-867b-3717b8-a3650f8968.webp)


İlk olarak, her adres türünün uzunluğunun farklı olduğunu fark edin. Bunu, adres dizisindeki karakter sayısından *veya* ilişkili QR kodlarına bakarak görsel olarak anlayabilirsiniz. Adres uzunluğu arttıkça QR kodu genellikle küçülür ve kareye daha fazla veri sığdırır.

* `t1goiSyw2JinFCmUnfiwwp72LEZzD42TyYu` 35 karakter uzunluğundadır
* `zs1cpf4prtmnqpg6x2ngcrwelu9a39z9l9lqukq9fwagnaqrknk34a7n3szwxpjuxfjdxkuzykel53` 78 karakter uzunluğundadır
* `u1ckeydud0996ftppqrnpdsqyeq4e57qcyjr4raht4dc8j3njuyj3gmm9yk7hq9k88cdkqfuqusgpcpjfhwu3plm2vrd32g8du78kzkm5un357r4vkhz4vhxd4yfl8zvszk99cmsc89qv4trd7jzkcs8h6lukzgy25j8cv76p0g603nrrg6yt6cxsh2v8rmkasskd69ylfyphhjyv0cxs` 213 karakter uzunluğundadır

Dikkat edilmesi gereken ikinci nokta, her adres dizisinin önekidir: şeffaf adresler *t* ile, sapling adresleri *zs* ile ve son olarak UA'lar *u1* ile başlar.

Şunu not etmek önemlidir:

#### "Orchard ödeme adreslerinin tek başına kullanılabilen bir dizi kodlaması yoktur. Bunun yerine, Orchard dahil olmak üzere farklı türlerdeki adresleri bir araya getirebilen ‘birleşik adresler’ tanımlarız. Birleşik adreslerin Mainnet'te İnsan Tarafından Okunabilir Bölümü ‘u’dur; yani ‘u1’ önekine sahip olurlar."

## Birleşik Adres alıcıları

[burada](https://medium.com/@hanh425/transaction-privacy-78f80f9f175e) ele alındığı gibi, şeffaf, sapling ve orchard adres türlerinin bazı birleşimlerini kullanarak UA'lar oluşturabilirsiniz.
Tam bir UA'nın yanı sıra, yaygın olarak kullanılan türlerden bazıları şunlardır:

* şeffaf + sapling

![img4](/content-images/219267475-38ad1419-0aac-4205-b18e-687328-46b8f12f80.webp)

* şeffaf + orchard


![img5](/content-images/219267496-90db21ff-f4e1-4a50-8f2a-1a71d9-7423486eb5.webp)

* sapling + orchard


![img6](/content-images/219267520-6b731ec2-e911-4469-acc5-c39d4a-a89ba01b88.webp)

* orchard
  
![img7](/content-images/219267538-1a748fff-4034-4559-96ac-182723-3d69e23dac.webp)

Öncelikle, bu UA'ların her birinin aynı özel anahtardan geldiğini unutmayın! İkinci olarak, her UA türünün uzunluklarına dikkat edin:

* t+s `u13qutpuktq026dwczvxmnh8mxdacsjx3kg2rrhzgns8zsty53t9y0hqp5d440zc9w7z7zkkjqw8dq0uuc0mkt883464mq8mkys7l4xjnhylh7u3u02ukknurm5yxerqlf500y2atq28e` 141 karakter
* t+o `u1yvwppp7ann6n3pgkysdu0spvr50w4jf4jwgme3c8x8fp4av59rupgvdd3fddc3f2cwrk3ghs5lxt87ggj8cvjuzcrf4jkejwlu9pc83gk2vtx03ucqcc3ed0furcuypqs6d6swu3nws` 141 karakter
* s+o `u1dq8kg78fgpjsc7dn2ynpdzc8xu99wra0jec4jy30rjqk5frsj62qtgqcu9nn0j8g352phlwprshancgxcuhdcclx0wxtvqylhmuegas7ul8hwnwggy727l05pyujuywtnn4nkfznctaelpkcrqcm9cxhkgv3t9jtrvgym7la5varrmzc` 178 karakter
* o   `u1cysntkxwt0h4sahp7rhj7u27pgc2ga7685ekf65g0d5ht5glkfm4zkumhvkd2zg2pdrgv3mrwq2x3vw2yl5u7zef3cr2nqwrzu7v2dsa` 106 karakter

Üçüncü olarak, her UA'nın görsel olarak biraz farklı olduğuna dikkat edin! UA'ların gücü, son kullanıcılara sundukları *seçimdir*. Gelecekte yeni bir protokole ihtiyaç duyulursa, UA'lar kullanıma hazır olacaktır.

## Kaynaklar

https://zcash.github.io/orchard/design/keys.html

https://medium.com/@hanh425/transaction-privacy-78f80f9f175e
