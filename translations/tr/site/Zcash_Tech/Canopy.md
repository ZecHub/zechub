<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Canopy.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Sayfayı Düzenle"/>
</a>

# Canopy

> Canopy, Zcash mainnet’inde 1.046.400. blokta (18 Kasım 2020 UTC) canlıya geçti.

Bu bölümden çıkaracağınız ana fikir: kurucu ödülü sona erdikten sonra Zcash’in kendi geliştirmesini finanse etmeye nasıl devam ettiği ve Canopy’nin daha sonraki yükseltmelerin de üzerine inşa edildiği fonlama dağılımını nasıl kurduğu.

Canopy, Zcash’in beşinci ağ yükseltmesidir ve Ağ Yükseltmesi 4 (NU4) olarak da adlandırılır. [ZIP 251](https://zips.z.cash/zip-0251) ile devreye alınmıştır ve 18 Kasım 2020’de (UTC), Zcash’in ilk blok ödülü yarılanmasıyla aynı anda, mainnet’in 1.046.400. bloğunda etkinleşmiştir. Canopy esas olarak bir yönetişim ve parasal yükseltmeydi. Orijinal kurucu ödülünü sona erdirdi ve Electric Coin Company, Zcash Foundation ve bağımsız hibe alıcılarına ödeme yapan yeni Zcash Development Fund’ı başlattı. Bu fonun arkasındaki politika, 2019’da uzun süren bir topluluk yönetişim sürecinden çıktı.

Bu neden önemli? Zcash’in arkasında bir şirket olmadığı için kendi geliştirmesini blok ödüllerinden finanse eder. İlk yıllarını finanse eden kurucu ödülünün, ilk yarılanmada sona ermesi planlanmıştı. Canopy bunun yerine geçti: her blok ödülünün sabit bir payını bir Development Fund’a yönlendirdi ve bunu kimin alacağını belirledi. Bu model, [NU6.1](../zcash-tech/nu6-1) dahil olmak üzere sonraki yükseltmelerle daha da geliştirildi.

![Canopy’den önce kurucu ödülü geliştirmeyi finanse ediyordu ve ilk yarılanmada sona ermesi planlanmıştı. Canopy’den sonra Development Fund, her blok ödülünün yüzde 20’sini alır ve 2024’teki ikinci yarılanmaya kadar devam eder](/content-images/canopy-founders-to-devfund-010676e799.webp)

## Geliştirme fonu

Canopy, orijinal kurucu ödülünü sona erdirdi ve yerine Zcash Development Fund’ı getirdi. Bu değişiklik, blok ödülünün 6,25 ZEC’ten 3,125 ZEC’e düştüğü, Zcash’in ilk yarılanmasıyla aynı blokta gerçekleşti. Yani madenciler, ödüllerinin yarıya indiği aynı gün, bu daha küçük ödülün yeni bir diliminin geliştirmeye akmaya başladığını gördü.

Fonun dört yıl boyunca, Kasım 2020’deki bu ilk yarılanmadan 2024’teki ikinci yarılanmaya kadar sürmesi planlandı. Üzerinde anlaşmaya varılan politika [ZIP 1014](https://zips.z.cash/zip-1014) olarak yazıya döküldü. Parayı fiilen hareket ettiren konsensüs mekanizması ise funding stream mekanizmasıdır: [ZIP 207](https://zips.z.cash/zip-0207), blok sübvansiyonunun bir kısmını tanımlı alıcılara yönlendirmenin genel yöntemini tanıttı; [ZIP 214](https://zips.z.cash/zip-0214) ise Development Fund için özel kuralları ve alıcı adreslerini belirledi.

## Paranın nasıl bölündüğü

Development Fund, her blok ödülünün yüzde 20’sini alır. Madenciler diğer yüzde 80’i elinde tutar. Bu yüzde 20, ZIP 1014’e göre daha sonra üçe bölünür.

1. Bootstrap Project’e, yani Electric Coin Company’nin ana kuruluşuna yüzde 35.
2. Zcash Foundation’a yüzde 25.
3. Bağımsız çalışmaları finanse eden ve Zcash Foundation tarafından yönetilen Major Grants’e yüzde 40. Major Grants daha sonra Zcash Community Grants (ZCG) oldu.

Sadece fon yerine toplam blok ödülüne göre ölçüldüğünde, bu paylar Electric Coin Company için yüzde 7, Zcash Foundation için yüzde 5 ve Major Grants için yüzde 8 eder. Bunları anlatmanın iki yolu da aynı sayıları ifade eder.

![Development Fund, her blok ödülünün yüzde 20’sidir; bunun yüzde 35’i Bootstrap ve Electric Coin Company’ye, yüzde 25’i Zcash Foundation’a ve yüzde 40’ı Major Grants’e bölünür](/content-images/canopy-dev-fund-split-005bf6f2dd.webp)

## Sprout havuzu değişikliği

Canopy ayrıca en eski shielded havuzun emekliye ayrılmasını da başlattı. Sprout, Zcash’in ilk shielded havuzuydu ve Canopy, [ZIP 211](https://zips.z.cash/zip-0211) aracılığıyla onu kademeli olarak devreden çıkarmaya başladı.

Canopy etkinleştiği andan itibaren Sprout havuzuna yeni değer eklenemez. Teknik olarak, her JoinSplit’in vpub_old alanı sıfır olmak zorundadır. Sprout’ta zaten bulunan fonlar hâlâ çekilebilir, yani kimse erişim dışında kalmaz; ancak havuz artık yalnızca küçülebilir. Bu, eski Sprout havuzunun zamanla daha yeni shielded havuzlar lehine kullanımdan kaldırılmasına yönelik ilk adımdır.

![Canopy’den önce değer Sprout havuzuna hem girebilir hem de çıkabilirdi. Canopy’den sonra yeni değer giremez ama çekimlere hâlâ izin verilir](/content-images/canopy-sprout-pool-f5166aa049.webp)

## Teknik ekler

Fonlama değişikliklerinin yanında Canopy, iki küçük teknik ZIP daha içeriyordu. [ZIP 212](https://zips.z.cash/zip-0212), bir alıcının Sapling ephemeral secret’ı nasıl türettiğini değiştirdi; artık bunu note plaintext’ten türetiyor. [ZIP 215](https://zips.z.cash/zip-0215) ise Ed25519 imzalarının doğrulanması için açık kuralları yazıya döktü; böylece her düğüm tam olarak hangi imzaların geçerli sayıldığı konusunda aynı sonuca varır.

## Özet

- Canopy (NU4), ana ağda 1.046.400 numaralı blokta (18 Kasım 2020 UTC) etkinleştirildi. Bu, Zcash’in blok ödülünü 6,25’ten 3,125 ZEC’ye düşüren ilk yarılanmasıyla aynı bloktur.
- Kurucu ödülünü sona erdirdi ve Zcash Development Fund’ı oluşturdu. Fon, 2024’teki ikinci yarılanmaya kadar dört yıl boyunca her blok ödülünün %20’sini alır (ZIP 1014 politikası; ZIP 207/214 mekanizması).
- Fonun %20’lik payı şöyle bölünür: %35’i Bootstrap’ye (Electric Coin Company), %25’i Zcash Foundation’ye, %40’ı da daha sonra Zcash Community Grants adını alan Major Grants’e gider.
- Sprout havuzunu yeni değere kapattı (ZIP 211). Havuza yeni yatırım yapılamaz, ancak çekimler hâlâ çalışır.
- Beraberinde iki teknik ZIP de geldi: ZIP 212 (not düz metninden türetilen Sapling geçici sırrı) ve ZIP 215 (açık Ed25519 doğrulama kuralları).

## Temel Açıklama

Zcash, arkasında herhangi bir şirket bulunmadığı için kendi geliştirmesini blok ödüllerinden finanse eder. Kurucu ödülü ilk yılları karşılamıştı ve ilk yarılanmada sona ermesi planlanmıştı; bu nedenle o tarihten önce yerine geçecek bir mekanizmanın hazır olması gerekiyordu. Canopy bu yerine geçen mekanizma oldu: ZIP 207, blok sübvansiyonunun bir kısmını belirlenmiş alıcı adreslerine yönlendiren genel finansman akışı mekanizmasını getirdi ve ZIP 214, Geliştirme Fonu için özel kuralları ve adresleri belirledi. Yalnızca fona göre değil, ödülün tamamına göre ölçüldüğünde paylar %7 ECC, %5 Zcash Foundation ve %8 Büyük Hibeler şeklindedir; bunlar iki farklı biçimde ifade edilen aynı rakamlardır.

Canopy, Zcash’in en eski korumalı havuzu olan Sprout’u kullanımdan kaldırma sürecini de başlattı: etkinleşmeden itibaren her JoinSplit’in vpub_old alanı sıfır olmak zorundadır; böylece değer Sprout’tan çıkabilir ama asla geri giremez.

## Görsel benzetme

Canopy, bir girişimin kurucu maaşı döneminin sona erip yerini bir anayasanın aldığı andır: o bloktan itibaren ağın bastığı her doların 20 senti bakım için ayrılır ve üç departman arasında 35/25/40 oranında paylaştırılır. Aynı anda eski depo (Sprout) yeni depolamaya kapatılır: herkes mallarını hâlâ teslim alabilir, ancak içeri yeni hiçbir şey giremez.

## Derinlemesine İnceleme

Funding stream güvene değil, mutabakata (consensus) dayanarak uygulanır: düğümler, coinbase işlemi tanımlı alıcılara tanımlı paylarını ödemeyen blokları reddeder. Canopy bilinçli olarak halving bloğuna denk getirildi. Böylece madenciler ödülün yarıya indiğini gördükleri anda, küçülen bu ödülün yeni bir dilimi de geliştirmeye akmaya başladı. ZIP 212, Sapling geçici (ephemeral) gizli anahtarının nasıl türetildiğini değiştirdi (artık not düz metninden türetiliyor). ZIP 215 ise her düğümün imzaları aynı şekilde doğrulaması için açık Ed25519 kabul kurallarını yazıya geçirdi. Bu küçük değişiklikler, mutabakattaki belirsizliklerin bütün bir sınıfını ortadan kaldırdı.

## Yaygın Hatalar

- **Canopy'ın yarılanmanın kendisi olduğunu düşünmek.** İkisi aynı etkinleşme bloğunu paylaştı, ancak ayrı değişikliklerdir: ZIP 251 (Canopy) ile ihraç takvimi birbirinden farklıdır.
- **%20'nin madencilerin yeni payından alındığını sanmak.** Madenciler %80'i korudu; fon ise blok ödülünün %20'sini alır.
- **Sprout fonlarının dondurulduğunu veya yok edildiğini varsaymak.** Para çekme işlemleri hâlâ mümkündür; yalnızca yeni yatırımlar durduruldu.
- **"Fonun 35/25/40'ı" ile "ödülün 7/5/8'i" ifadelerini farklı dağılımlar olarak görmek.** Bunlar farklı tabanlara göre ölçülmüş aynı rakamlardır.
- **Canopy'ü bir kriptografi yükseltmesi olarak adlandırmak.** Bu esas olarak yönetişim ve para politikasıyla ilgiliydi; teknik ZIP'ler yalnızca küçük düzenlemelerdi.

## Sözlük

| Terim | Sade anlamı |
|---|---|
| Founders reward | Zcash’in ilk geliştirme dönemini finanse eden, ilk yarılanmada sona ermesi planlanan orijinal finansman modeli |
| Development Fund | Canopy’nin geliştirmeye yönlendirdiği, her blok ödülünün yüzde 20’lik payı; ikinci yarılanmaya kadar sürer |
| Block reward (subsidy) | Her blok çıkarıldığında oluşturulan ve dağıtılan yeni ZEC |
| Halving | Blok ödülünün yarıya indirildiği planlı olay |
| Funding stream | Blok sübvansiyonunun bir kısmını tanımlı alıcı adreslerine yönlendiren konsensüs mekanizması (ZIP 207) |
| Sprout pool | Canopy’nin yeni değer kabul etmeyi durdurduğu, Zcash’in orijinal shielded havuzu |

## SSS

Canopy benim ZEC’imi veya gizliliğimi değiştiriyor mu? Hayır. Canopy, geliştirmenin nasıl finanse edildiği ve birkaç teknik kuralla ilgilidir. Bakiyeleriniz ve shielded işlemleriniz etkilenmez.

Canopy blok ödülünü mü düşürdü? Canopy, Zcash’in ilk yarılanmasıyla aynı blokta etkinleşti; bu yarılanma ödülü 6,25 ZEC’ten 3,125 ZEC’e düşürdü. Yarılanma, Zcash’in parasal politikasının bir parçasıdır. Canopy’nin görevi, bu daha küçük ödülün bir payının nasıl kullanılacağını belirlemekti.

Development Fund ne için var? Zcash’i inşa eden insanları finanse eder. Para Electric Coin Company’ye (Bootstrap Project aracılığıyla), Zcash Foundation’a ve bağımsız çalışmaları destekleyen Major Grants’e gider.

Sprout havuzundaki fonları hâlâ kullanabilir miyim? Evet. Sprout’ta zaten bulunan fonları hâlâ çekebilirsiniz. Sadece Canopy’den sonra içine yeni değer ekleyemezsiniz.

Development Fund kalıcı mı? Hayır. Bunun dört yıl boyunca, Kasım 2020’deki ilk yarılanmadan 2024’teki ikinci yarılanmaya kadar sürmesi planlandı; böylece topluluğun, yeniden değerlendirmeden önce nasıl çalıştığını görmesi için zaman tanındı.

Canopy, NU6 ve NU6.1 ile nasıl ilişkilidir? Canopy, üçlü fonlama dağılımını ve funding stream mekanizmasını kurdu. NU6 ve NU6.1 dahil sonraki yükseltmeler, bu temel üzerine kurulu Development Fund’ı yeniden ele alıp yeniden şekillendirdi.

## Bilginizi test edin

Canopy, Zcash’in ilk yarılanmasıyla tam olarak aynı blokta etkinleşti. Bu zamanlama neden seçildi ve Canopy olmasaydı geliştirme finansmanına ne olurdu?

<details>
<summary>Cevap</summary>

Orijinal kurucu ödülünün ilk yarılanmada sona ermesi planlanmıştı. Canopy olmasaydı, yarılanma sonrası daha küçük blok ödülünün tamamı madencilere giderdi ve geliştirme için protokol düzeyinde hiçbir finansman kalmazdı. Canopy, tam o blokta kurucu ödülünün yerine Development Fund’ı getirdi; böylece finansman kesintisiz devam etti.
</details>

### Kaynaklar

[ZIP 251: Canopy Ağ Yükseltmesinin Devreye Alınması](https://zips.z.cash/zip-0251)

[ZIP 1014: ECC, ZF ve Major Grants için bir Dev Fund Oluşturulması](https://zips.z.cash/zip-1014)

[ZIP 207: Funding Streams](https://zips.z.cash/zip-0207)

[ZIP 214: Bir Zcash Development Fund için konsensüs kuralları](https://zips.z.cash/zip-0214)

[ZIP 211: Sprout Chain Value Pool’a Yeni Değer Eklenmesinin Devre Dışı Bırakılması](https://zips.z.cash/zip-0211)

[Canopy Ağ Yükseltmesi](https://z.cash/upgrade/canopy/)

### Ayrıca bakınız

[Zcash Ağ Yükseltmeleri](../start-here/network-upgrades)

[Development Fund](../start-here/development-fund)

[Zcash Para Politikası](../start-here/zcash-monetary-policy)

[Shielded Havuzlar](../using-zcash/shielded-pools)

[NU6.1](../zcash-tech/nu6-1)

[Zcash Yönetişimi](../zcash-community/zcash-governance)

---

## İlgili Sayfalar

- [Sprout](./Sprout.md) — Canopy yeni yatırımlara kapattığı havuz
- [Heartwood](./Heartwood.md) — serideki bir önceki yükseltme
- [NU5](./NU5.md) — Orchard başlatan bir sonraki yükseltme
- [NU6.1](./NU6_1.md) — geliştirme finansmanındaki en son iyileştirme

Seri: [Ağ Yükseltmeleri dizini](../start-here/network-upgrades) · Önceki: [Heartwood](../zcash-tech/heartwood) · Sonraki: [NU5](../zcash-tech/nu5)
