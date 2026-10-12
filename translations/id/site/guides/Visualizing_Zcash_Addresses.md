<a href="https://github.com/zechub/zechub/edit/main/site/guides/Visualizing_Zcash_Addresses.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Halaman"/>
</a>


# Memvisualisasikan Alamat Zcash

Jika kamu baru pertama kali mempelajari Zcash, kamu akan segera menyadari bahwa ada dua jenis [transaksi](https://zechub.wiki/using-zcash/transactions) yang dapat terjadi: *transparan* dan *terlindungi*.
Selain itu, jika kamu telah mengikuti perkembangan terbaru dalam ekosistem Zcash, kamu mungkin telah mempelajari tentang [Unified Addresses](https://web.archive.org/web/20260823012524/https://electriccoin.co/blog/unified-addresses-in-zcash-explained/), atau UA.
Ketika orang-orang di industri Zcash berbicara tentang transaksi *terlindungi*, yang mereka maksud adalah transaksi yang melibatkan alamat yang dikodekan untuk protokol sapling atau orchard.
UA dirancang untuk menyatukan *setiap* jenis transaksi terlindungi maupun transparan ke dalam satu alamat tunggal. Generalisasi ini adalah kunci untuk menyederhanakan UX di masa depan. Tujuan dari panduan ini adalah untuk melengkapi pemahaman tentang UA dengan contoh visual yang konkret.

## Jenis-jenis alamat Zcash

Saat ini ada tiga jenis utama alamat yang digunakan hingga saat ini. Ini termasuk

* transparan

![img1](/content-images/219261771-a9957ec3-2841-4073-9cfd-1db9d6-574fc930f0.webp)

* sapling

![img2](/content-images/219261784-1a617e70-f588-4eed-96bf-f0789d-e10ebfc543.webp)

* Unified Address (Lengkap)

![img3](/content-images/219261794-bcc79db6-4dc6-4c6a-867b-3717b8-a3650f8968.webp)


Hal pertama yang perlu diperhatikan adalah bagaimana panjang dari setiap jenis alamat berbeda satu sama lain. Kamu dapat melihat hal ini secara visual melalui jumlah karakter dalam string alamat *atau* dengan melihat kode QR terkait. Seiring bertambahnya panjang alamat, kode QR cenderung mengecil (zoom out) agar dapat memuat lebih banyak data ke dalam kotak tersebut.

* `t1goiSyw2JinFCmUnfiwwp72LEZzD42TyYu` memiliki panjang 35 karakter
* `zs1cpf4prtmnqpg6x2ngcrwelu9a39z9l9lqukq9fwagnaqrknk34a7n3szwxpjuxfjdxkuzykel53` memiliki panjang 78 karakter
* `u1ckeydud0996ftppqrnpdsqyeq4e57qcyjr4raht4dc8j3njuyj3gmm9yk7hq9k88cdkqfuqusgpcpjfhwu3plm2vrd32g8du78kzkm5un357r4vkhz4vhxd4yfl8zvszk99cmsc89qv4trd7jzkcs8h6lukzgy25j8cv76p0g603nrrg6yt6cxsh2v8rmkasskd69ylfyphhjyv0cxs` memiliki panjang 213 karakter

Hal kedua yang perlu diperhatikan adalah awalan dari setiap string alamat -- alamat transparan dimulai dengan *t*, Sapling dengan *zs*, dan terakhir UA dengan *u1*.

Penting untuk diperhatikan:

#### Alamat pembayaran Orchard tidak memiliki pengodean string yang berdiri sendiri. Sebaliknya, kami mendefinisikan "alamat terpadu" yang dapat menggabungkan alamat dari berbagai tipe, termasuk Orchard. Alamat terpadu memiliki Bagian yang Dapat Dibaca Manusia berupa "u" pada Mainnet, yaitu mereka akan memiliki awalan "u1".

## Penerima Unified Address

Seperti yang telah dibahas [di sini](https://medium.com/@hanh425/transaction-privacy-78f80f9f175e) seseorang dapat membangun UA dengan penerima yang berbeda -- beberapa kombinasi dari tipe alamat transparan, sapling, dan orchard.
Selain UA lengkap, berikut adalah yang paling umum yang akan kamu temukan di lapangan:

* transparan + sapling

![img4](/content-images/219267475-38ad1419-0aac-4205-b18e-687328-46b8f12f80.webp)

* transparan + orchard


![img5](/content-images/219267496-90db21ff-f4e1-4a50-8f2a-1a71d9-7423486eb5.webp)

* sapling + orchard


![img6](/content-images/219267520-6b731ec2-e911-4469-acc5-c39d4a-a89ba01b88.webp)

* orchard
  
![img7](/content-images/219267538-1a748fff-4034-4559-96ac-182723-3d69e23dac.webp)

Hal pertama yang perlu diperhatikan adalah bahwa masing-masing UA ini berasal dari private key yang sama! Hal kedua yang perlu diperhatikan adalah panjang dari setiap jenis UA:

* t+s `u13qutpuktq026dwczvxmnh8mxdacsjx3kg2rrhzgns8zsty53t9y0hqp5d440zc9w7z7zkkjqw8dq0uuc0mkt883464mq8mkys7l4xjnhylh7u3u02ukknurm5yxerqlf500y2atq28e` 141 karakter
* t+o `u1yvwppp7ann6n3pgkysdu0spvr50w4jf4jwgme3c8x8fp4av59rupgvdd3fddc3f2cwrk3ghs5lxt87ggj8cvjuzcrf4jkejwlu9pc83gk2vtx03ucqcc3ed0furcuypqs6d6swu3nws` 141 karakter
* s+o `u1dq8kg78fgpjsc7dn2ynpdzc8xu99wra0jec4jy30rjqk5frsj62qtgqcu9nn0j8g352phlwprshancgxcuhdcclx0wxtvqylhmuegas7ul8hwnwggy727l05pyujuywtnn4nkfznctaelpkcrqcm9cxhkgv3t9jtrvgym7la5varrmzc` 178 karakter
* o   `u1cysntkxwt0h4sahp7rhj7u27pgc2ga7685ekf65g0d5ht5glkfm4zkumhvkd2zg2pdrgv3mrwq2x3vw2yl5u7zef3cr2nqwrzu7v2dsa` 106 karakter

Hal ketiga yang perlu diperhatikan adalah bagaimana secara visual setiap UA sedikit berbeda! Kekuatan dari UA adalah *pilihan* yang mereka berikan bagi pengguna akhir. Jika di masa depan diperlukan protokol baru, UA akan siap untuk digunakan.

## Sumber

https://zcash.github.io/orchard/design/keys.html

https://medium.com/@hanh425/transaction-privacy-78f80f9f175e