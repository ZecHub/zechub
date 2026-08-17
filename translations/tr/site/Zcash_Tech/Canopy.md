<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Canopy.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Sayfayı Düzenle"/>
</a>

# Canopy

> Canopy, Zcash mainnet’inde 1.046.400. blokta (18 Kasım 2020 UTC) canlıya geçti.

Bu bölümden çıkaracağınız ana fikir: kurucu ödülü sona erdikten sonra Zcash’in kendi geliştirmesini finanse etmeye nasıl devam ettiği ve Canopy’nin daha sonraki yükseltmelerin de üzerine inşa edildiği fonlama dağılımını nasıl kurduğu.

Canopy, Zcash’in beşinci ağ yükseltmesidir ve Ağ Yükseltmesi 4 (NU4) olarak da adlandırılır. [ZIP 251](https://zips.z.cash/zip-0251) ile devreye alınmıştır ve 18 Kasım 2020’de (UTC), Zcash’in ilk blok ödülü yarılanmasıyla aynı anda, mainnet’in 1.046.400. bloğunda etkinleşmiştir. Canopy esas olarak bir yönetişim ve parasal yükseltmeydi. Orijinal kurucu ödülünü sona erdirdi ve Electric Coin Company, Zcash Foundation ve bağımsız hibe alıcılarına ödeme yapan yeni Zcash Development Fund’ı başlattı. Bu fonun arkasındaki politika, 2019’da uzun süren bir topluluk yönetişim sürecinden çıktı.

Bu neden önemli? Zcash’in arkasında bir şirket olmadığı için kendi geliştirmesini blok ödüllerinden finanse eder. İlk yıllarını finanse eden kurucu ödülünün, ilk yarılanmada sona ermesi planlanmıştı. Canopy bunun yerine geçti: her blok ödülünün sabit bir payını bir Development Fund’a yönlendirdi ve bunu kimin alacağını belirledi. Bu model, [NU6.1](../zcash-tech/nu6-1) dahil olmak üzere sonraki yükseltmelerle daha da geliştirildi.

![Canopy’den önce kurucu ödülü geliştirmeyi finanse ediyordu ve ilk yarılanmada sona ermesi planlanmıştı. Canopy’den sonra Development Fund, her blok ödülünün yüzde 20’sini alır ve 2024’teki ikinci yarılanmaya kadar devam eder](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/canopy-founders-to-devfund.png)

## Geliştirme fonu

Canopy, orijinal kurucu ödülünü sona erdirdi ve yerine Zcash Development Fund’ı getirdi. Bu değişiklik, blok ödülünün 6,25 ZEC’ten 3,125 ZEC’e düştüğü, Zcash’in ilk yarılanmasıyla aynı blokta gerçekleşti. Yani madenciler, ödüllerinin yarıya indiği aynı gün, bu daha küçük ödülün yeni bir diliminin geliştirmeye akmaya başladığını gördü.

Fonun dört yıl boyunca, Kasım 2020’deki bu ilk yarılanmadan 2024’teki ikinci yarılanmaya kadar sürmesi planlandı. Üzerinde anlaşmaya varılan politika [ZIP 1014](https://zips.z.cash/zip-1014) olarak yazıya döküldü. Parayı fiilen hareket ettiren konsensüs mekanizması ise funding stream mekanizmasıdır: [ZIP 207](https://zips.z.cash/zip-0207), blok sübvansiyonunun bir kısmını tanımlı alıcılara yönlendirmenin genel yöntemini tanıttı; [ZIP 214](https://zips.z.cash/zip-0214) ise Development Fund için özel kuralları ve alıcı adreslerini belirledi.

## Paranın nasıl bölündüğü

Development Fund, her blok ödülünün yüzde 20’sini alır. Madenciler diğer yüzde 80’i elinde tutar. Bu yüzde 20, ZIP 1014’e göre daha sonra üçe bölünür.

1. Bootstrap Project’e, yani Electric Coin Company’nin ana kuruluşuna yüzde 35.
2. Zcash Foundation’a yüzde 25.
3. Bağımsız çalışmaları finanse eden ve Zcash Foundation tarafından yönetilen Major Grants’e yüzde 40. Major Grants daha sonra Zcash Community Grants (ZCG) oldu.

Sadece fon yerine toplam blok ödülüne göre ölçüldüğünde, bu paylar Electric Coin Company için yüzde 7, Zcash Foundation için yüzde 5 ve Major Grants için yüzde 8 eder. Bunları anlatmanın iki yolu da aynı sayıları ifade eder.

![Development Fund, her blok ödülünün yüzde 20’sidir; bunun yüzde 35’i Bootstrap ve Electric Coin Company’ye, yüzde 25’i Zcash Foundation’a ve yüzde 40’ı Major Grants’e bölünür](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/canopy-dev-fund-split.png)

## Sprout havuzu değişikliği

Canopy ayrıca en eski shielded havuzun emekliye ayrılmasını da başlattı. Sprout, Zcash’in ilk shielded havuzuydu ve Canopy, [ZIP 211](https://zips.z.cash/zip-0211) aracılığıyla onu kademeli olarak devreden çıkarmaya başladı.

Canopy etkinleştiği andan itibaren Sprout havuzuna yeni değer eklenemez. Teknik olarak, her JoinSplit’in vpub_old alanı sıfır olmak zorundadır. Sprout’ta zaten bulunan fonlar hâlâ çekilebilir, yani kimse erişim dışında kalmaz; ancak havuz artık yalnızca küçülebilir. Bu, eski Sprout havuzunun zamanla daha yeni shielded havuzlar lehine kullanımdan kaldırılmasına yönelik ilk adımdır.

![Canopy’den önce değer Sprout havuzuna hem girebilir hem de çıkabilirdi. Canopy’den sonra yeni değer giremez ama çekimlere hâlâ izin verilir](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/canopy-sprout-pool.png)

## Teknik ekler

Fonlama değişikliklerinin yanında Canopy, iki küçük teknik ZIP daha içeriyordu. [ZIP 212](https://zips.z.cash/zip-0212), bir alıcının Sapling ephemeral secret’ı nasıl türettiğini değiştirdi; artık bunu note plaintext’ten türetiyor. [ZIP 215](https://zips.z.cash/zip-0215) ise Ed25519 imzalarının doğrulanması için açık kuralları yazıya döktü; böylece her düğüm tam olarak hangi imzaların geçerli sayıldığı konusunda aynı sonuca varır.

## Sözlük

| Terim | Sade anlamı |
|---|---|
| Kurucu ödülü | Zcash’in ilk geliştirme dönemini finanse eden, ilk yarılanmada sona ermesi planlanan orijinal finansman modeli |
| Development Fund | Canopy’nin geliştirmeye yönlendirdiği, her blok ödülünün yüzde 20’lik payı; ikinci yarılanmaya kadar sürer |
| Blok ödülü (sübvansiyon) | Her blok çıkarıldığında oluşturulan ve dağıtılan yeni ZEC |
| Yarılanma | Blok ödülünün yarıya indirildiği planlı olay |
| Funding stream | Blok sübvansiyonunun bir kısmını tanımlı alıcı adreslerine yönlendiren konsensüs mekanizması (ZIP 207) |
| Sprout havuzu | Canopy’nin yeni değer kabul etmeyi durdurduğu, Zcash’in orijinal shielded havuzu |

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

Seri: [Ağ Yükseltmeleri dizini](../start-here/network-upgrades) · Önceki: [Heartwood](../zcash-tech/heartwood) · Sonraki: [NU5](../zcash-tech/nu5)
