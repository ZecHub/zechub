---
<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/NU5.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Sayfayı Düzenle"/>
</a>

# NU5

> NU5, Zcash mainnet'inde 1,687,104 numaralı blokta etkinleşti (31 Mayıs 2022 UTC).

Buradan çıkaracağınız şey: NU5'in, Zcash'e güvenilir kurulum gerektirmeyen yeni bir shielded pool ile havuzlar arasında çalışan tek bir adres türü kazandırdığı.

NU5 (Network Upgrade 5), [ZIP 252](https://zips.z.cash/zip-0252) tarafından dağıtıma alınan altıncı Zcash [ağ yükseltmesi](../start-here/network-upgrades)'dir. Büyük bir kriptografik yükseltmedir. Halo 2 ispat sistemi üzerine kurulu Orchard shielded ödeme protokolünü, unified address'leri ve yeni sürüm 5 işlem biçimini tanıttı. NU5, Electric Coin Company'nin zcashd v5.0.0 sürümüyle yayınlandı.

Bu neden önemli? Bir shielded pool, onu oluşturan kurulum kadar güvenilirdir. Zcash'in ilk iki shielded pool'u olan Sprout ve Sapling, gizli parametrelerini üretmek için birer defalık güvenilir kurulum törenine ihtiyaç duyuyordu. Bu parametreler yok edilmek yerine saklansaydı, biri fark edilmeden sahte ZEC basabilirdi. NU5'in Orchard havuzu, böyle bir tören gerektirmeyen Halo 2 ispat sistemini kullanarak bu endişeyi ortadan kaldırır.

## Güvenilir kurulum

Orchard, Zcash'in [ZIP 224](https://zips.z.cash/zip-0224) içinde tanımlanan en yeni shielded protokolüdür. Pallas ve Vesta eğri döngüsü üzerinde PLONKish aritmetizasyon adı verilen bir teknik kullanan Halo 2 ispat sistemi üzerine kuruludur. Pratikte getirisi basittir: Halo 2, güvenilir kurulum ve structured reference string gerektirmez; dolayısıyla kötüye kullanılabilecek hiçbir gizli parametre yoktur.

Hem Sprout hem de Sapling güvenilir kuruluma bağlıydı. Bir grup insan, her havuzun parametrelerini oluşturmak için bir tören yürüttü ve herkes en az birinin kendi gizli parçasını yok ettiğine güvenmek zorundaydı. Orchard bu varsayımı ortadan kaldırır. Eski havuzlar NU5'ten sonra da varlığını sürdürür, bu yüzden kurulum gerektirmeme garantisi Orchard havuzunda tuttuğunuz fonlar için geçerlidir.

![NU5'ten önce Sprout ve Sapling bir güvenilir kurulum törenine ihtiyaç duyuyordu. NU5'ten sonra Orchard havuzu Halo 2 sistemini kullanır ve güvenilir kurulum gerektirmez](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/nu5-trusted-setup.png)

## NU5 neleri değiştirdi

NU5, 1,687,104 numaralı blokta birlikte etkinleşen birkaç konsensüs değişikliğini bir araya getirir.

1. Yukarıda açıklanan Halo 2 tabanlı protokol olan Orchard shielded havuzunu ekledi (ZIP 224).
2. Şeffaf, Sapling ve yeni Orchard verileri için ayrı bölgelere sahip, yeniden yapılandırılmış bir düzen olan sürüm 5 işlem biçimini ekledi (ZIP 225). Sprout alanları kaldırıldı ve eski sürüm 4 biçimi etkinleşmeden sonra da geçerli kaldı.
3. Bir sonraki bölümde ele alınan unified address'leri ve unified viewing key'leri tanıttı (ZIP 316).
4. Bir işlemin kimliğini hesaplamanın, işlemin ne yaptığını onu yetkilendiren ispatlardan ve imzalardan ayıran yeni bir yolu olan işlem tanımlayıcısı değiştirilemezliğini benimsedi (ZIP 244).
5. Standart dışı kodlamaları kaldırmak ve geçerli bir işlem sayılan şeyin kurallarını sıkılaştırmak için canonical Jubjub nokta kodlamalarını benimsedi (ZIP 216).
6. Eşler arası ağ genelinde sürüm 5 işlemlerinin aktarımını etkinleştirdi (ZIP 239).

NU5 ayrıca mevcut birkaç ZIP'i de (32, 203, 209, 212, 213, 221 ve 401) yeni Orchard havuzunu hesaba katacak şekilde güncelledi.

## Unified address'ler

NU5'ten önce her havuzun kendi adres türü vardı ve göndericinin hangisini istediğinizi bilmesi gerekiyordu. [ZIP 316](https://zips.z.cash/zip-0316) içinde tanımlanan unified address'ler bunu değiştirir. Tek bir unified address, birden fazla havuz için alıcı bileşenlerini bir araya getirebilir; böylece göndericinin cüzdanı desteklediği en iyi seçeneği seçer.

![Bir unified address birkaç havuz için alıcı bileşenlerini bir araya getirir: şeffaf bir alıcı, bir Sapling alıcısı ve yeni bir Orchard alıcısı](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/nu5-unified-address.png)

Unified viewing key'ler de görüntüleme için aynı şekilde çalışır. Bir adresin kapsadığı havuzlar boyunca salt okunur görünürlük sağlarlar. Bununla ilgili daha fazlası için [Viewing Keys](../zcash-tech/viewing-keys) sayfasına bakın.

## NU5'in yeri

NU5, Zcash'in önceki yükseltmeleri olan Overwinter, Sapling, Blossom, Heartwood ve Canopy'den sonra geldi. Mainnet'te 31 Mayıs 2022'de etkinleşti. Orchard'ın eğri döngüsü, yinelemeyi desteklediği için seçildi; bu da daha sonraki ölçeklendirme çalışmaları için temel oluşturur. NU5, Orchard havuzu üzerine inşa edilen ve daha sonra ona yama uygulayan NU6 ve NU6.x yükseltmeleri serisinin doğrudan öncüsüdür.

## Sözlük

| Terim | Düz anlamı |
|---|---|
| Network upgrade (NU) | Belirlenmiş bir blok yüksekliğinde etkinleşen, Zcash'in konsensüs kurallarındaki koordineli bir değişiklik |
| Orchard | NU5'in tanıttığı, Halo 2 ispat sistemi üzerine kurulu shielded havuz |
| Halo 2 | Orchard'ın arkasındaki, güvenilir kurulum gerektirmeyen ispat sistemi |
| Trusted setup | Bir havuzun gizli parametrelerini oluşturan ve bunların yok edildiğine güvenilmesi gereken bir defalık tören |
| Unified address | Birden fazla havuz için alıcı bileşenlerini bir araya getirebilen tek bir adres (ZIP 316) |
| Consensus branch id | Bir işlemin hangi kurallar kümesine ait olduğunu belirten tanımlayıcı |

## SSS

NU5 benim ZEC'imi veya gizliliğimi değiştirir mi? Hayır. NU5 yeni bir shielded havuz ve yeni bir adres biçimi ekledi. Mevcut ZEC'iniz etkilenmez ve gizliliğiniz azalmaz. Fonları Orchard'a taşımak, size güvenilir kurulum gerektirmeyen bir havuz sağlar.

Orchard nedir? Orchard, Zcash'in NU5 ile tanıtılan shielded protokolüdür. Halo 2 ispat sistemi üzerinde çalışır, bu yüzden güvenilir kurulum töreni gerektirmez.

Benim bir şey yapmam gerekiyor mu? Hayır. Desteklenen bir cüzdan NU5'i sizin için yönetir. Eski adresleri kullanmaya devam edebilirsiniz ve cüzdanınız sunduğunda unified address kullanmaya başlayabilirsiniz.

Unified address nedir? Birden fazla havuz için alıcı bileşenlerini tutabilen tek bir adres. Göndericinin cüzdanı desteklediği havuzu seçer, böylece her tür için farklı bir adres vermek zorunda kalmazsınız.

NU5 eski fonlarımdaki güvenilir kurulumu ortadan kaldırır mı? Geriye dönük olarak hayır. Orchard güvenilir kurulum gerektirmez, ancak Sapling havuzunun önceki parametreleri NU5'ten sonra da varlığını sürdürür. Kurulum gerektirmeme garantisi Orchard havuzunda tutulan fonlar için geçerlidir.

Eski işlem biçimi çalışmayı bıraktı mı? Hayır. NU5 sürüm 5 biçimini ekledi ve eski sürüm 4 biçimi etkinleşmeden sonra da geçerli kaldı.

## Bilginizi test edin

Hem Sprout hem de Sapling bir güvenilir kurulum törenine ihtiyaç duyuyordu. NU5'in Orchard havuzu bunu nasıl değiştirdi ve bu neden önemlidir?

<details>
<summary>Cevap</summary>

Orchard, güvenilir kurulum ve structured reference string gerektirmeyen Halo 2 ispat sistemi üzerine kuruludur. Bu, geride kalan gizli parametrelerin sahte ZEC üretmek için kullanılabilmesi riskini ortadan kaldırır. Bu garanti, Orchard havuzunda tutulan fonlar için geçerlidir. Eski Sapling parametreleri NU5'ten sonra da varlığını sürdürür.
</details>

### Kaynaklar

[ZIP 252: NU5 Network Upgrade'in Dağıtımı](https://zips.z.cash/zip-0252)

[ZIP 224: Orchard Shielded Protocol](https://zips.z.cash/zip-0224)

[ZIP 225: Sürüm 5 İşlem Biçimi](https://zips.z.cash/zip-0225)

[ZIP 316: Unified Address'ler ve Unified Viewing Key'ler](https://zips.z.cash/zip-0316)

[Network Upgrade 5](https://z.cash/upgrade/nu5/)

[Electric Coin Company: zcashd 5.0.0 sürümü](https://electriccoin.co/blog/new-release-5-0-0/)

### Ayrıca bakın

[Zcash Ağ Yükseltmeleri](../start-here/network-upgrades)

[Shielded Havuzlar](../using-zcash/shielded-pools)

[Halo](../zcash-tech/halo)

[zk-SNARKS](../zcash-tech/zk-snarks)

[Viewing Keys](../zcash-tech/viewing-keys)

[NU6.1](../zcash-tech/nu6-1)

---

Seri: [Network Upgrades dizini](../start-here/network-upgrades) · Önceki: [Canopy](../zcash-tech/canopy) · Sonraki: [NU6](../zcash-tech/nu6)
