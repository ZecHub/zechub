<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/NU5.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# NU5

> NU5, 31 Mayıs 2022 UTC tarihinde blok 1.687.104'te Zcash ana ağında kullanıma sunuldu.

Öğrenecekleriniz: NU5'ın Zcash'a güvene dayalı kurulum gerektirmeyen yeni bir korumalı havuz ve havuzlar arasında çalışan tek bir adres türünü nasıl kazandırdığı.

NU5 (Ağ Yükseltmesi 5), [ZIP 252](https://zips.z.cash/zip-0252) tarafından devreye alınan altıncı Zcash [ağ yükseltmesidir](../start-here/network-upgrades). Büyük bir kriptografik yükseltmedir. Halo 2 kanıtlama sistemi üzerine kurulu Orchard korumalı ödeme protokolünü, birleşik adresleri ve yeni sürüm 5 işlem biçimini kullanıma sundu. NU5, Electric Coin Company'ın zcashd v5.0.0 sürümünde yayımlandı.

Önemi. Korumalı bir havuzun güvenilirliği, onu oluşturan kurulum kadar güvenilirdir. Zcash'ın ilk iki korumalı havuzu olan Sprout ve Sapling, gizli parametrelerini üretmek için bir defalık güvene dayalı kurulum törenine ihtiyaç duyuyordu. Bu parametreler yok edilmek yerine saklandıysa, biri kimse fark etmeden sahte ZEC üretebilirdi. NU5'ın Orchard havuzu, böyle bir törene ihtiyaç duymayan Halo 2 kanıtlama sistemini kullanarak bu endişeyi ortadan kaldırır.

## Güvene dayalı kurulum

Orchard, NU5 tarafından kullanıma sunulan ve [ZIP 224](https://zips.z.cash/zip-0224) içinde tanımlanan korumalı protokoldür. Pallas ve Vesta eğri döngüsü üzerinde PLONKish aritmetikleştirme adı verilen bir teknik kullanan Halo 2 kanıtlama sistemi üzerine kuruludur. Pratik faydası basittir: Halo 2, güvene dayalı kurulum veya yapılandırılmış başvuru dizgesi gerektirmez; dolayısıyla kötüye kullanılabilecek gizli bir parametre yoktur.

Hem Sprout hem de Sapling güvene dayalı kuruluma bağlıydı. Her havuzun parametrelerini oluşturmak için bir grup insan bir tören düzenledi ve herkes, en az bir kişinin gizli parçayı yok ettiğine güvenmek zorundaydı. Orchard bu varsayımı ortadan kaldırır. Eski havuzlar NU5 sonrasında da varlığını sürdürür; bu nedenle kurulum gerektirmeme garantisi, Orchard havuzunda tuttuğunuz fonlar için geçerlidir.

![NU5'ten önce Sprout ve Sapling güvene dayalı kurulum töreni gerektiriyordu. NU5'ten sonra Orchard havuzu Halo 2 sistemini kullanır ve güvene dayalı kurulum gerektirmez](/content-images/nu5-trusted-setup-5447dbe3f2.webp)

## NU5 neleri değiştirdi

NU5, tümü blok 1.687.104'te birlikte etkinleştirilen birkaç konsensüs değişikliğini bir araya getirir.

1. Yukarıda açıklanan Halo 2 tabanlı protokol olan Orchard korumalı havuzunu (ZIP 224) ekledi.
2. Şeffaf, Sapling ve yeni Orchard verileri için ayrı bölgeler içeren yeniden yapılandırılmış bir düzen olan sürüm 5 işlem biçimini (ZIP 225) ekledi. Sprout alanları kaldırıldı ve eski sürüm 4 biçimi etkinleştirmeden sonra da geçerliliğini korudu.
3. Bir sonraki bölümde ele alınan Birleşik Adresleri ve birleşik görüntüleme anahtarlarını (ZIP 316) kullanıma sundu.
4. İşlemin yaptığı şeyi, işlemi yetkilendiren kanıt ve imzalardan ayıran yeni bir işlem kimliği hesaplama yöntemi olan işlem tanımlayıcısının değiştirilemezliğini (ZIP 244) benimsedi.
5. Standart olmayan kodlamaları ortadan kaldırmak ve neyin geçerli işlem sayılacağına ilişkin kuralları sıkılaştırmak için kanonik Jubjub nokta kodlamalarını (ZIP 216) benimsedi.
6. Sürüm 5 işlemlerinin eşler arası ağda aktarılmasını etkinleştirdi (ZIP 239).

NU5, yeni Orchard havuzunu hesaba katmaları için mevcut bazı ZIP'leri de (32, 203, 209, 212, 213, 221 ve 401) güncelledi.

## Birleşik Adresler

NU5 öncesinde her havuzun kendine ait bir adres türü vardı ve gönderenin hangi türü istediğinizi bilmesi gerekiyordu. [ZIP 316](https://zips.z.cash/zip-0316) içinde tanımlanan Birleşik Adresler bunu değiştirir. Tek bir Birleşik Adres birden fazla havuz için alıcıları bir araya getirebilir; böylece gönderenin cüzdanı desteklediği en uygun olanı seçer.

![Birleşik adres, birkaç havuz için alıcıları bir araya getirir: şeffaf alıcı, Sapling alıcısı ve yeni Orchard alıcısı](/content-images/nu5-unified-address-6e2c84f66e.webp)

Birleşik görüntüleme anahtarları da görüntüleme için aynı şekilde çalışır. Bir adresin kapsadığı havuzlarda salt okunur görünürlük sağlar. Daha fazla bilgi için [Görüntüleme Anahtarları](../zcash-tech/viewing-keys) sayfasına bakın.

## NU5 nerede duruyor

NU5, Zcash'ın önceki yükseltmelerini izledi: Overwinter, Sapling, Blossom, Heartwood ve Canopy. 31 Mayıs 2022'de ana ağda etkinleştirildi. Orchard'ın eğri döngüsü, daha sonraki ölçeklendirme çalışmalarının temelini oluşturan özyinelemeyi desteklediği için seçildi. NU5, Orchard havuzu üzerine kurulan ve daha sonra yamalanan NU6 ve NU6.x yükseltme serisinin doğrudan öncülüdür.

## Kısaca

- NU5, 31 Mayıs 2022 UTC tarihinde blok 1.687.104'te ana ağda etkinleştirildi — ZIP 252 tarafından devreye alınan ve Sapling'dan bu yana Zcash'ın en büyük kriptografik yükseltmesi.
- Güvene dayalı kurulum gerektirmeyen bir kanıtlama sistemi olan Halo 2 üzerine kurulu ilk Zcash havuzu olan Orchard korumalı havuzunu kullanıma sundu.
- Birleşik Adresleri ve birleşik görüntüleme anahtarlarını (ZIP 316) yayımladı: Birden fazla havuz için alıcıları bir araya getirebilen tek bir adres dizgesi.
- İşlemleri sürüm 5 biçimine (ZIP 225) taşıdı ve işlem kimliklerini değiştirilemez hâle getirdi (ZIP 244).
- Orchard, daha sonraki ölçeklendirme çalışmalarının ve NU6.x serisinin temelini oluşturan özyinelemeli kanıtları destekleyen Pallas/Vesta eğri döngüsü üzerinde çalışır.

## Temel Açıklama

Güvene dayalı kurulum sorunu: Sprout (2016) ve Sapling (2018), gizli parametreler oluşturmak için bir defalık tören gerektiriyordu ve güvenlik, en az bir katılımcının kendi parçasını yok etmesine bağlıydı. Tüm katılımcılar gizlice bir kopya saklamış olsaydı, sahte ZEC üretmek mümkün olabilirdi. Orchard bu varsayımı tamamen ortadan kaldırır: Halo 2, güvene dayalı kurulum veya yapılandırılmış başvuru dizgesi kullanmaz; dolayısıyla kötüye kullanılabilecek gizli bir şey yoktur.

NU5, birlikte etkinleştirilen birkaç konsensüs değişikliğini bir araya getirdi: Orchard havuzu (ZIP 224), sürüm 5 işlem biçimi (ZIP 225), Birleşik Adresler (ZIP 316), işlem kimliği değiştirilemezliği (ZIP 244), kanonik Jubjub nokta kodlamaları (ZIP 216) ve v5 işlemlerinin eşler arası aktarımı (ZIP 239). Yeni havuzu hesaba katmaları için ZIP 32, 203, 209, 212, 213, 221 ve 401'i de güncelledi.

## Görsel benzetme

Eski havuzlar, kombinasyonu bir defalık grup töreninde oluşturulmuş kasalar gibidir — her katılımcının kopyasını imha ettiğine güvenirsiniz. Orchard ise kilidi her kullanımda kendini yeniden doğrulayan bir kasa gibidir: tören yok, ana sır yok, saklanabilecek hiçbir şey yok. Birleşik Adresler, her girişi — şeffaf, Sapling, Orchard — listeleyen bir kartvizit gibidir; ziyaretçi de gerçekten açabileceği kapıyı seçer.

## Derinlemesine İnceleme

Halo 2, Pallas ve Vesta eğri döngüsü üzerinde PLONKish aritmetikleştirme kullanır — birbirini tamamlayan iki eşleştirme dostu eğri, özyinelemeyi, yani başka kanıtları doğrulayan kanıtları mümkün kılar. Bu özyineleme, Zcash'ın sonraki ölçeklendirme çalışmalarının temelidir. v5 işlem düzeni şeffaf, Sapling ve Orchard bölgelerini birbirinden ayırır ve Sprout alanlarını kaldırır; eski sürüm 4 biçimi etkinleştirmeden sonra da geçerliliğini korudu. ZIP 244, işlem kimliğini işlemin yaptığı şeyden yeniden hesaplar; işlemi yetkilendiren kanıt ve imzalardan değil. Böylece değiştirilebilirlik açıklarını kapatır.

## Yaygın Hatalar

- **NU5'ın tüm havuzlar için güvene dayalı kurulumu kaldırdığını düşünmek.** Yalnızca Orchard tören gerektirmez; Sapling'ın parametreleri hâlâ vardır, dolayısıyla kurulum gerektirmeme garantisi Orchard içinde tutulan fonlar için geçerlidir.
- **Eski adreslerin veya cüzdanların çalışmayı bıraktığını varsaymak.** NU5 seçenekler ekledi; havuz başına adres türleri ve v4 işlem biçimi geçerliliğini korudu.
- **Orchard ile Halo 2'yi karıştırmak.** Orchard, korumalı protokol/havuzdur; Halo 2 ise bunun üzerinde çalıştığı kanıtlama sistemidir.
- **Birleşik Adresleri tek adres türü olarak görmek.** Cüzdanınız desteklediğinde kullanabileceğiniz ek bir biçimdir.
- **NU5'ın ihracı veya mevcut gizliliği değiştirdiğine inanmak.** Bir havuz ve biçimler ekledi; mevcut ZEC ve gizliliği etkilenmedi.

## Sözlük

| Terim | Sade dille anlamı |
|---|---|
| Ağ yükseltmesi (NU) | Belirli bir blok yüksekliğinde etkinleştirilen, Zcash konsensüs kurallarında eşgüdümlü bir değişiklik |
| Orchard | NU5 tarafından kullanıma sunulan ve Halo 2 kanıtlama sistemi üzerine kurulu korumalı havuz |
| Halo 2 | Güvene dayalı kurulum gerektirmeyen Orchard arkasındaki kanıtlama sistemi |
| Güvene dayalı kurulum | Bir havuzun gizli parametrelerini oluşturan ve bunların yok edilmesi için güven gerektiren tek seferlik tören |
| Birleşik Adres | Birden fazla havuz için alıcıları bir araya getirebilen tek bir adres (ZIP 316) |
| Konsensüs dal kimliği | Bir işlemin hangi kural kümesine ait olduğunu belirten tanımlayıcı |

## Sık Sorulan Sorular

NU5 ZEC'ımı veya gizliliğimi değiştirir mi? Hayır. NU5 yeni bir korumalı havuz ve yeni bir adres biçimi ekledi. Mevcut ZEC'ınız etkilenmez ve gizliliğiniz azalmaz. Fonları Orchard içine taşımak, size güvene dayalı kurulum gerektirmeyen bir havuz sağlar.

Orchard nedir? Orchard, NU5 tarafından kullanıma sunulan Zcash korumalı protokolüdür. Halo 2 kanıtlama sistemi üzerinde çalışır; bu nedenle güvene dayalı kurulum töreni gerektirmez.

Bir şey yapmam gerekiyor mu? Hayır. Desteklenen bir cüzdan NU5 işlemlerini sizin için halleder. Eski adresleri kullanmaya devam edebilir, cüzdanınız sunduğunda birleşik adresleri kullanmaya başlayabilirsiniz.

Birleşik Adres nedir? Birden fazla havuz için alıcıları barındırabilen tek bir adrestir. Gönderenin cüzdanı desteklediği havuzu seçer; böylece her tür için farklı bir adres vermeniz gerekmez.

NU5, eski fonlarım için güvene dayalı kurulumu ortadan kaldırır mı? Geriye dönük olarak kaldırmaz. Orchard güvene dayalı kurulum gerektirmez; ancak Sapling havuzunun önceki parametreleri NU5 sonrasında da varlığını sürdürür. Kurulum gerektirmeme garantisi Orchard havuzunda tutulan fonlar için geçerlidir.

Eski işlem biçimi çalışmayı bıraktı mı? Hayır. NU5 sürüm 5 biçimini ekledi ve eski sürüm 4 biçimi etkinleştirmeden sonra da geçerliliğini korudu.

## Bilginizi sınayın

Sprout ve Sapling, güvene dayalı kurulum töreni gerektiriyordu. NU5'ın Orchard havuzu bu konuda neyi değiştirdi ve bu neden önemlidir?

<details>
<summary>Yanıt</summary>

Orchard, güvene dayalı kurulum veya yapılandırılmış başvuru dizgesi gerektirmeyen Halo 2 kanıtlama sistemi üzerine kuruludur. Böylece geride kalan gizli parametrelerin sahte ZEC üretmek için kullanılma riski ortadan kalkar. Bu garanti, Orchard havuzunda tutulan fonlar için geçerlidir. Eski Sapling parametreleri NU5 sonrasında da varlığını sürdürür.
</details>

### Kaynaklar

[ZIP 252: NU5 Ağ Yükseltmesinin Devreye Alınması](https://zips.z.cash/zip-0252)

[ZIP 224: Orchard Korumalı Protokolü](https://zips.z.cash/zip-0224)

[ZIP 225: Sürüm 5 İşlem Biçimi](https://zips.z.cash/zip-0225)

[ZIP 316: Birleşik Adresler ve Birleşik Görüntüleme Anahtarları](https://zips.z.cash/zip-0316)

[Ağ Yükseltmesi 5](https://z.cash/upgrade/nu5/)

[Electric Coin Company: zcashd 5.0.0 sürümü](https://electriccoin.co/blog/new-release-5-0-0/)

### Ayrıca bakınız

[Zcash Ağ Yükseltmeleri](../start-here/network-upgrades)

[Korumalı Havuzlar](../using-zcash/shielded-pools)

[Halo](../zcash-tech/halo)

[zk-SNARKs](../zcash-tech/zk-snarks)

[Görüntüleme Anahtarları](../zcash-tech/viewing-keys)

[NU6.1](../zcash-tech/nu6-1)

---

## İlgili Sayfalar

- [Halo](./Halo.md) — Orchard arkasındaki, güvene dayalı kurulum gerektirmeyen kanıtlama sistemi
- [Birleşik Adresler](./Unified_Addresses.md) — ZIP 316 adresleme hakkında ayrıntılı inceleme
- [Sapling](./Sapling.md) — törenine bağlı kalmayı sürdüren önceki korumalı havuz
- [NU6](./NU6.md) — Orchard havuzu üzerine kurulu sonraki yükseltme
- [zk_SNARKS](./zk_SNARKS.md) — temelindeki sıfır bilgi teknolojisi


Seri: [Ağ Yükseltmeleri dizini](../start-here/network-upgrades) · Önceki: [Canopy](../zcash-tech/canopy) · Sonraki: [NU6](../zcash-tech/nu6)
