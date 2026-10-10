<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/NU5.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# NU5

> NU5, 1.687.104 numaralı blokta (31 Mayıs 2022 UTC) Zcash ana ağında etkinleştirildi.

Buradan öğrenecekleriniz: NU5'in, Zcash'e güvenilir kurulum gerektirmeyen yeni bir korumalı havuzu nasıl sunduğu ve havuzlar arasında çalışan tek bir adres türü.

NU5 (Network Upgrade 5), Zcash'in [ağ yükseltmelerinin](../start-here/network-upgrades) altıncısıdır ve [ZIP 252](https://zips.z.cash/zip-0252) ile dağıtılmıştır. Büyük bir kriptografik yükseltmedir. Orchard korumalı ödeme protokolünü, Halo 2 kanıtlama sistemiyle birlikte; ayrıca birleşik Adresleri ve yeni sürüm 5 işlem formatını kullanıma sundu. NU5, Electric Coin Company'in zcashd v5.0.0 sürümüyle yayımlandı.

Bu neden önemli? Bir korumalı havuz, yalnızca onu oluşturan kurulum kadar güvenilirdir. Zcash'in ilk iki korumalı havuzu olan Sprout ve Sapling, gizli parametrelerini üretmek için tek seferlik güvenilir kurulum törenlerine ihtiyaç duyuyordu. Bu parametreler yok edilmek yerine saklanmış olsaydı, biri kimse fark etmeden sahte ZEC basabilirdi. NU5'in Orchard havuzu, böyle bir tören gerektirmeyen Halo 2 kanıtlama sistemini kullanarak bu endişeyi ortadan kaldırır.

## Güvenilir kurulum

Orchard, NU5 tarafından sunulan ve [ZIP 224](https://zips.z.cash/zip-0224) içinde tanımlanan korumalı protokoldür. Pallas ve Vesta eğri döngüsünde PLONKish aritmetizasyon adı verilen bir teknik kullanan Halo 2 kanıtlama sistemi üzerine kuruludur. Pratik avantajı basittir: Halo 2, güvenilir kurulum veya yapılandırılmış başvuru dizisi gerektirmez; dolayısıyla kötüye kullanılabilecek gizli bir parametre yoktur.

Sprout ve Sapling, güvenilir bir kuruluma bağlıydı. Bir grup insan her havuzun parametrelerini oluşturmak için bir tören gerçekleştirdi ve herkes, içlerinden en az birinin gizli parçayı yok ettiğine güvenmek zorundaydı. Orchard bu varsayımı ortadan kaldırır. Eski havuzlar NU5 sonrasında da varlığını sürdürür; bu nedenle kurulum gerektirmeme garantisi, Orchard havuzunda tuttuğunuz fonlar için geçerlidir.

![Before NU5, Sprout and Sapling needed a trusted setup ceremony. After NU5, the Orchard pool uses the Halo 2 system and needs no trusted setup](/content-images/nu5-trusted-setup-5447dbe3f2.webp)

## NU5 neleri değiştirdi

NU5, 1.687.104 numaralı blokta birlikte etkinleştirilen çeşitli fikir birliği değişikliklerini içerir.

1. Yukarıda açıklanan, ZIP 224 kapsamındaki Halo 2 tabanlı protokol olan Orchard korumalı havuzunu ekledi.
2. Şeffaf, Sapling ve yeni Orchard verileri için ayrı bölümler içeren, yeniden yapılandırılmış bir düzen olan sürüm 5 işlem formatını (ZIP 225) ekledi. Sprout alanları kaldırıldı ve eski sürüm 4 formatı etkinleştirmeden sonra da geçerliliğini korudu.
3. Bir sonraki bölümde ele alınan Birleşik Adresleri ve birleşik görüntüleme anahtarlarını (ZIP 316) kullanıma sundu.
4. Bir işlemin yaptığı şeyleri onu yetkilendiren kanıtlar ve imzalardan ayıran, işlem kimliğini hesaplamanın yeni bir yolu olan işlem tanımlayıcısı değiştirilemezliğini (ZIP 244) benimsedi.
5. Standart dışı kodlamaları kaldırmak ve geçerli bir işlem sayılan şeylere ilişkin kuralları sıkılaştırmak için kanonik Jubjub nokta kodlamalarını (ZIP 216) benimsedi.
6. Sürüm 5 işlemlerinin eşler arası ağ üzerinden aktarılmasını etkinleştirdi (ZIP 239).

NU5 ayrıca, yeni Orchard havuzunu hesaba katmaları için mevcut ZIP'lerin bir kısmını (32, 203, 209, 212, 213, 221 ve 401) güncelledi.

## Birleşik Adresler

NU5 öncesinde her havuzun kendi adres türü vardı ve gönderenin hangi türü istediğinizi bilmesi gerekiyordu. [ZIP 316](https://zips.z.cash/zip-0316) içinde tanımlanan Birleşik Adresler bunu değiştirir. Tek bir Birleşik adres, birden fazla havuz için alıcıları bir araya getirebilir; böylece gönderenin cüzdanı desteklediği en iyi seçeneği belirler.

![A unified address bundles receivers for several pools: a transparent receiver, a Sapling receiver, and a new Orchard receiver](/content-images/nu5-unified-address-6e2c84f66e.webp)

Birleşik görüntüleme anahtarları, görüntüleme için aynı şekilde çalışır. Bir adresin kapsadığı havuzlar genelinde salt okunur görünürlük sağlarlar. Bununla ilgili daha fazla bilgi için [Görüntüleme Anahtarları](../zcash-tech/viewing-keys) sayfasına bakın.

## NU5'in konumu

NU5, Zcash'in önceki yükseltmelerini takip etti: Overwinter, Sapling, Blossom, Heartwood ve Canopy. 31 Mayıs 2022'de ana ağda etkinleştirildi. Orchard'in eğri döngüsü, daha sonraki ölçeklendirme çalışmaları için temel oluşturan özyinelemeyi desteklediği için seçildi. NU5, NU6 ve NU6.x yükseltme serisinin doğrudan öncüsüdür; bu seri Orchard havuzu üzerine inşa edildi ve daha sonra onu yamaladı.

## Sözlük

| Terim | Sade açıklama |
|---|---|
| Network upgrade (NU) | Zcash'in fikir birliği kurallarında, belirli bir blok yüksekliğinde etkinleştirilen koordineli değişiklik |
| Orchard | NU5 tarafından sunulan, Halo 2 kanıtlama sistemi üzerine kurulu korumalı havuz |
| Halo 2 | Orchard'in arkasındaki, güvenilir kurulum gerektirmeyen kanıtlama sistemi |
| Trusted setup | Bir havuzun gizli parametrelerini oluşturan ve bunların yok edildiğine güvenilmesi gereken tek seferlik tören |
| Unified Address | Birden fazla havuz için alıcıları bir araya getirebilen tek bir adres (ZIP 316) |
| Consensus branch id | Bir işlemin hangi kural kümesine ait olduğunu gösteren tanımlayıcı |

## SSS

NU5, ZEC'imi veya gizliliğimi değiştirir mi? Hayır. NU5 yeni bir korumalı havuz ve yeni bir adres formatı ekledi. Mevcut ZEC'iniz etkilenmez ve gizliliğiniz azalmaz. Fonları Orchard'e taşımak size güvenilir kurulum gerektirmeyen bir havuz sağlar.

Orchard nedir? Orchard, Zcash'in NU5 tarafından sunulan korumalı protokolüdür. Halo 2 kanıtlama sistemi üzerinde çalışır, dolayısıyla güvenilir kurulum töreni gerektirmez.

Bir şey yapmam gerekir mi? Hayır. Desteklenen bir cüzdan NU5 işlemini sizin için gerçekleştirir. Eski adresleri kullanmaya devam edebilir ve cüzdanınız sunduğunda Birleşik Adresleri kullanmaya başlayabilirsiniz.

Birleşik Adres nedir? Birden fazla havuz için alıcıları barındırabilen tek bir adrestir. Gönderenin cüzdanı desteklediği havuzu seçer; böylece her tür için farklı bir adres vermeniz gerekmez.

NU5, eski fonlarımdaki güvenilir kurulumu kaldırır mı? Geriye dönük olarak hayır. Orchard güvenilir kurulum gerektirmez, ancak Sapling havuzunun önceki parametreleri NU5 sonrasında da varlığını sürdürür. Kurulum gerektirmeme garantisi, Orchard havuzunda tutulan fonlar için geçerlidir.

Eski işlem formatı çalışmayı bıraktı mı? Hayır. NU5 sürüm 5 formatını ekledi ve eski sürüm 4 formatı etkinleştirmeden sonra da geçerliliğini korudu.

## Anlayışınızı test edin

Sprout ve Sapling, güvenilir kurulum törenine ihtiyaç duyuyordu. NU5'in Orchard havuzu bunu nasıl değiştirdi ve bu neden önemlidir?

<details>
<summary>Cevap</summary>

Orchard, güvenilir kurulum veya yapılandırılmış başvuru dizisi gerektirmeyen Halo 2 kanıtlama sistemi üzerine kuruludur. Bu, kalan gizli parametrelerin ZEC sahteciliği için kullanılabilmesi riskini ortadan kaldırır. Garanti, Orchard havuzunda tutulan fonlar için geçerlidir. Eski Sapling parametreleri NU5 sonrasında da varlığını sürdürür.
</details>

### Kaynaklar

[ZIP 252: NU5 Ağ Yükseltmesinin Dağıtımı](https://zips.z.cash/zip-0252)

[ZIP 224: Orchard Korumalı Protokolü](https://zips.z.cash/zip-0224)

[ZIP 225: Sürüm 5 İşlem Formatı](https://zips.z.cash/zip-0225)

[ZIP 316: Birleşik Adresler ve Birleşik Görüntüleme Anahtarları](https://zips.z.cash/zip-0316)

[Network Upgrade 5](https://z.cash/upgrade/nu5/)

[Electric Coin Company: zcashd 5.0.0 sürümü](https://electriccoin.co/blog/new-release-5-0-0/)

### Ayrıca bakınız

[Zcash Ağ Yükseltmeleri](../start-here/network-upgrades)

[Korumalı Havuzlar](../using-zcash/shielded-pools)

[Halo](../zcash-tech/halo)

[zk-SNARKs](../zcash-tech/zk-snarks)

[Görüntüleme Anahtarları](../zcash-tech/viewing-keys)

[NU6.1](../zcash-tech/nu6-1)

---

Seri: [Ağ Yükseltmeleri dizini](../start-here/network-upgrades) · Önceki: [Canopy](../zcash-tech/canopy) · Sonraki: [NU6](../zcash-tech/nu6)
