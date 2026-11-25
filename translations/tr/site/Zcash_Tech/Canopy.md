<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Canopy.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Sayfayı düzenle"/>
</a>

# Canopy

> Canopy, Zcash ana ağında 1.046.400 numaralı blokta (18 Kasım 2020 UTC) kullanıma sunuldu.

Öğrenecekleriniz: Zcash, kurucular ödülü sona erdikten sonra kendi geliştirme çalışmalarını nasıl finanse etmeye devam etti ve Canopy, sonraki ağ yükseltmelerinin hâlâ temel aldığı fon dağılımını nasıl oluşturdu.

Canopy, Zcash'in beşinci ağ yükseltmesidir ve Network Upgrade 4 (NU4) olarak da adlandırılır. [ZIP 251](https://zips.z.cash/zip-0251) ile devreye alınmış ve Zcash'in ilk blok ödülü yarılanmasıyla aynı anda, 18 Kasım 2020'de (UTC) ana ağın 1.046.400 numaralı bloğunda etkinleştirilmiştir. Canopy esas olarak bir yönetişim ve para politikası yükseltmesiydi. İlk kurucular ödülünü sona erdirdi ve Electric Coin Company, Zcash Foundation ve bağımsız hibe alıcılarına ödeme yapan yeni Zcash Geliştirme Fonu'nu başlattı. Bu fonun arkasındaki politika, 2019'da yürütülen kapsamlı bir topluluk yönetişimi sürecinin sonucuydu.

Bunun önemi. Zcash, arkasında bir şirket olmadığı için kendi geliştirme çalışmalarını blok ödüllerinden finanse eder. İlk yıllarını finanse eden kurucular ödülünün ilk yarılanmada sona ermesi planlanmıştı. Canopy bunun yerine geçti: Her blok ödülünün sabit bir payını Geliştirme Fonu'na yönlendirdi ve fonun alıcılarını belirledi. Bu model, sonraki ağ yükseltmeleriyle [NU6.1](../zcash-tech/nu6-1)'e kadar geliştirildi.

![Canopy'den önce kurucular ödülü geliştirmeyi finanse ediyor ve ilk yarılanmada sona erecek şekilde ayarlanıyordu. Canopy'den sonra Geliştirme Fonu her blok ödülünün yüzde 20'sini alır ve 2024'teki ikinci yarılanmaya kadar sürer](/content-images/canopy-founders-to-devfund-010676e799.webp)

## Geliştirme fonu

Canopy ilk kurucular ödülünü sona erdirdi ve yerine Zcash Geliştirme Fonu'nu koydu. Bu değişiklik, Zcash'in ilk yarılanmasıyla aynı blokta gerçekleşti; blok ödülü 6,25 ZEC'ten 3,125 ZEC'e düştü. Böylece madenciler, bu küçülen ödülün yeni bir payı geliştirme çalışmalarına aktarılmaya başladığı gün ödüllerinin yarıya indiğini gördü.

Fonun, Kasım 2020'deki bu ilk yarılanmadan 2024'teki ikinci yarılanmaya kadar dört yıl boyunca devam etmesi planlanmıştı. Üzerinde uzlaşılan politika, [ZIP 1014](https://zips.z.cash/zip-1014) olarak belgelendi. Parayı gerçekten aktaran konsensüs mekanizması, fon akışı mekanizmasıdır: [ZIP 207](https://zips.z.cash/zip-0207), blok sübvansiyonunun bir bölümünü tanımlanmış alıcılara yönlendirmenin genel yöntemini sundu; [ZIP 214](https://zips.z.cash/zip-0214) ise Geliştirme Fonu için özel kuralları ve alıcı adreslerini belirledi.

## Paranın dağılımı

Geliştirme Fonu, her blok ödülünün yüzde 20'sini alır. Madenciler kalan yüzde 80'i alır. Bu yüzde 20, ZIP 1014'ü izleyerek üçe bölünür.

1. Electric Coin Company'in ana kuruluşu olan Bootstrap Project'e yüzde 35.
2. Zcash Foundation'e yüzde 25.
3. Bağımsız çalışmaları finanse eden ve Zcash Foundation tarafından yönetilen Major Grants'e yüzde 40. Major Grants daha sonra Zcash Community Grants (ZCG) adını aldı.

Bu payları yalnızca fonun değil, toplam blok ödülünün oranı olarak hesaplarsak Electric Coin Company yüzde 7, Zcash Foundation yüzde 5 ve Major Grants yüzde 8 alır. İki ifade de aynı sayıları anlatır.

![Geliştirme Fonu her blok ödülünün yüzde 20'sidir; bunun yüzde 35'i Bootstrap ve Electric Coin Company'ye, yüzde 25'i Zcash Foundation'a ve yüzde 40'ı Major Grants'e ayrılır](/content-images/canopy-dev-fund-split-005bf6f2dd.webp)

## Sprout havuzundaki değişiklik

Canopy ayrıca en eski korumalı havuzun kullanımdan kaldırılması sürecini başlattı. Sprout, Zcash'in ilk korumalı havuzuydu ve Canopy, [ZIP 211](https://zips.z.cash/zip-0211) aracılığıyla bu havuzun kullanımını aşamalı olarak sonlandırmaya başladı.

Canopy etkinleştirildiği andan itibaren Sprout havuzuna yeni değer eklenemez. Teknik olarak her JoinSplit işleminin vpub_old alanı sıfır olmalıdır. Sprout içindeki fonlar hâlâ çekilebilir; dolayısıyla hiç kimse erişimden mahrum kalmaz, ancak havuz bundan böyle yalnızca küçülebilir. Bu, eski Sprout havuzunu sonunda daha yeni korumalı havuzlar lehine kullanımdan kaldırmanın ilk adımıdır.

![Canopy'den önce değer Sprout havuzuna hem girebilir hem çıkabilirdi. Canopy'den sonra yeni değer giremez, ancak çekimlere izin verilir](/content-images/canopy-sprout-pool-f5166aa049.webp)

## Teknik eklemeler

Fonlama değişikliklerinin yanı sıra Canopy, iki küçük teknik ZIP içeriyordu. [ZIP 212](https://zips.z.cash/zip-0212), alıcının Sapling geçici gizli anahtarını türetme biçimini değiştirdi ve bu anahtarı note açık metninden türetti. [ZIP 215](https://zips.z.cash/zip-0215) ise Ed25519 imzalarının doğrulanmasına yönelik açık kuralları belirledi; böylece tüm düğümler hangi imzaların geçerli sayılacağı konusunda aynı fikirde olur.

## Kısaca

- Canopy (NU4), ana ağın 1.046.400 numaralı bloğunda (18 Kasım 2020 UTC) etkinleştirildi — blok ödülünü 6,25'ten 3,125 ZEC'e düşüren Zcash'in ilk yarılanmasıyla aynı blokta.
- Kurucular ödülünü sona erdirdi ve Zcash Geliştirme Fonu'nu oluşturdu: 2024'teki ikinci yarılanmaya kadar dört yıl boyunca her blok ödülünün yüzde 20'si (ZIP 1014 politikası; ZIP 207/214 mekanizması).
- Fonun yüzde 20'si Bootstrap'e (Electric Coin Company) yüzde 35, Zcash Foundation'e yüzde 25 ve Major Grants'e yüzde 40 olarak bölünür — Major Grants daha sonra Zcash Community Grants adını aldı.
- Sprout havuzuna yeni değer eklenmesini durdurdu (ZIP 211): Yeni yatırma işlemleri yapılamaz, ancak çekimler devam eder.
- İki teknik ZIP de bu yükseltmeye dahildi: ZIP 212 (Sapling geçici gizli anahtarının note açık metninden türetilmesi) ve ZIP 215 (açık Ed25519 doğrulama kuralları).

## Temel açıklama

Zcash, arkasında bir şirket olmadığı için kendi geliştirme çalışmalarını blok ödüllerinden finanse eder. Kurucular ödülü ilk yılları karşıladı ve ilk yarılanmada sona ermesi planlandı; bu nedenle o tarihten önce yeni bir fonlama modeli oluşturulmalıydı. Canopy bu modelin yerini aldı: ZIP 207, blok sübvansiyonunun bir bölümünü tanımlanmış alıcı adreslerine yönlendiren genel fon akışı mekanizmasını sundu; ZIP 214 ise Geliştirme Fonu'na ilişkin özel kuralları ve adresleri belirledi. Payları yalnızca fonun değil, toplam ödülün oranı olarak hesaplarsak ECC yüzde 7, Zcash Foundation yüzde 5 ve Major Grants yüzde 8 alır — iki farklı şekilde ifade edilen aynı sayılar.

Canopy ayrıca Zcash'in en eski korumalı havuzu olan Sprout'i kullanımdan kaldırmaya başladı: Etkinleştirmeden itibaren her JoinSplit işleminin vpub_old alanı sıfır olmalıdır; böylece değer Sprout'ten çıkabilir, ancak havuza tekrar giremez.

## Görsel benzetme

Canopy, bir girişimin kurucularına maaş ödediği dönemin sona erip bir anayasanın yürürlüğe girmesi gibidir: O bloktan itibaren ağın bastığı her 1 doların 20 senti, bakım çalışmaları için ayrılır ve üç departman arasında 35/25/40 oranında paylaştırılır. Aynı zamanda eski depo (Sprout) yeni depolamaya kapatılır — herkes mallarını almaya devam edebilir, ancak depoya yeni bir şey konamaz.

## Derinlemesine inceleme

Fon akışı güvene değil, konsensüse dayanır: Düğümler, coinbase işlemi tanımlanmış alıcılara belirlenmiş paylarını ödemeyen blokları reddeder. Canopy, yarılanma bloğunda bilerek devreye alındı; böylece madenciler ödüllerinin yarıya indiği anda, küçülen ödülün yeni bir payının geliştirme çalışmalarına aktarılmaya başladığını gördü. ZIP 212, Sapling geçici gizli anahtarının türetilme biçimini değiştirdi (artık note açık metninden türetiliyor); ZIP 215 ise her düğümün imzaları aynı şekilde doğrulaması için açık Ed25519 kabul kurallarını belirledi — konsensüsteki belirsizliklerin tüm sınıflarını ortadan kaldıran küçük değişiklikler.

## Sık yapılan hatalar

- **Canopy'in yarılanmanın kendisi olduğunu düşünmek.** Aynı etkinleştirme bloğunu paylaştılar, ancak bunlar ayrı değişikliklerdir: ZIP 251 (Canopy) ve ihraç takvimi.
- **Yüzde 20'nin madencilerin yeni payından alındığını düşünmek.** Madenciler yüzde 80'i aldı; fon, blok ödülünün yüzde 20'sini alır.
- **Sprout fonlarının dondurulduğunu veya yok edildiğini varsaymak.** Çekimler hâlâ mümkündür — yalnızca yeni yatırmalar durdurulmuştur.
- **“Fonun yüzde 35/25/40'ı” ile “ödülün yüzde 7/5/8'i” ifadelerini farklı dağılımlar olarak görmek.** Farklı tabanlara göre hesaplanmış aynı oranlardır.
- **Canopy'i bir kriptografi yükseltmesi olarak nitelendirmek.** Esas olarak yönetişim ve para politikasıyla ilgiliydi; teknik ZIP'ler küçük düzenlemelerdi.


## Sözlük

| Terim | Sade dille anlamı |
|---|---|
| Founders reward | Zcash'in ilk geliştirme çalışmalarını finanse eden ve ilk yarılanmada sona ermesi planlanan özgün fonlama modeli |
| Development Fund | Canopy'in geliştirme çalışmalarına yönlendirdiği ve ikinci yarılanmaya kadar devam eden, her blok ödülünün yüzde 20'lik payı |
| Block reward (subsidy) | Her blok kazıldığında oluşturulan ve ödenen yeni ZEC |
| Halving | Blok ödülünün yarıya indirildiği planlı olay |
| Funding stream | Blok sübvansiyonunun bir bölümünü tanımlanmış alıcı adreslerine yönlendiren konsensüs mekanizması (ZIP 207) |
| Sprout pool | Zcash'in özgün korumalı havuzu; Canopy bu havuza yeni değer kabul etmeyi durdurdu |

## SSS

Canopy, ZEC'ümü veya gizliliğimi etkiler mi? Hayır. Canopy, geliştirme çalışmalarının nasıl finanse edildiğiyle ve birkaç teknik kuralla ilgilidir. Bakiyeleriniz ve korumalı işlemleriniz etkilenmez.

Canopy blok ödülünü düşürdü mü? Canopy, ödülü 6,25 ZEC'ten 3,125 ZEC'e düşüren Zcash'in ilk yarılanmasıyla aynı blokta etkinleştirildi. Yarılanma, Zcash'in para politikasının bir parçasıdır. Canopy'in görevi, küçülen ödülün bir payının nasıl kullanılacağını belirlemekti.

Geliştirme Fonu ne için kullanılır? Zcash'i geliştiren kişileri finanse eder. Para; Bootstrap Project aracılığıyla Electric Coin Company'e, Zcash Foundation'e ve bağımsız çalışmaları destekleyen Major Grants'e gider.

Sprout havuzundaki fonları hâlâ kullanabilir miyim? Evet. Sprout içinde bulunan fonları çekebilirsiniz. Canopy'dan sonra havuza yeni değer ekleyemezsiniz.

Geliştirme Fonu kalıcı mı? Hayır. Fonun, Kasım 2020'deki ilk yarılanmadan 2024'teki ikinci yarılanmaya kadar dört yıl sürmesi planlandı; böylece topluluğa, fonu yeniden değerlendirmeden önce nasıl işlediğini görme zamanı tanındı.

Canopy, NU6 ve NU6.1 ile nasıl ilişkilidir? Canopy, üçlü fon dağılımını ve fon akışı mekanizmasını oluşturdu. NU6 ve NU6.1 dahil olmak üzere sonraki ağ yükseltmeleri, bu temel üzerine kurulan Geliştirme Fonu'nu yeniden değerlendirdi ve şekillendirdi.

## Anlayışınızı sınayın

Canopy, Zcash'in ilk yarılanmasıyla tam olarak aynı blokta etkinleştirildi. Bu zamanlama neden seçildi ve Canopy olmasaydı geliştirme fonlamasına ne olurdu?

<details>
<summary>Yanıt</summary>

İlk kurucular ödülünün ilk yarılanmada sona ermesi planlanmıştı. Canopy olmasaydı, yarılanma sonrası daha düşük blok ödülünün tamamı madencilere gider ve geliştirme çalışmaları için protokol düzeyinde fonlama kalmazdı. Canopy, kurucular ödülünün yerine tam o blokta Geliştirme Fonu'nu koyarak fonlamanın kesintisiz sürmesini sağladı.
</details>

### Kaynaklar

[ZIP 251: Canopy Ağ Yükseltmesinin Devreye Alınması](https://zips.z.cash/zip-0251)

[ZIP 1014: ECC, ZF ve Major Grants için Geliştirme Fonu Oluşturulması](https://zips.z.cash/zip-1014)

[ZIP 207: Fon Akışları](https://zips.z.cash/zip-0207)

[ZIP 214: Zcash Geliştirme Fonu için Konsensüs Kuralları](https://zips.z.cash/zip-0214)

[ZIP 211: Sprout Zincir Değer Havuzuna Yeni Değer Eklenmesinin Devre Dışı Bırakılması](https://zips.z.cash/zip-0211)

[Canopy Ağ Yükseltmesi](https://z.cash/upgrade/canopy/)

### Ayrıca bakınız

[Zcash Ağ Yükseltmeleri](../start-here/network-upgrades)

[Geliştirme Fonu](../start-here/development-fund)

[Zcash Para Politikası](../start-here/zcash-monetary-policy)

[Korumalı Havuzlar](../using-zcash/shielded-pools)

[NU6.1](../zcash-tech/nu6-1)

[Zcash Yönetişim](../zcash-community/zcash-governance)

---

## İlgili sayfalar

- [Sprout](./Sprout.md) — havuz Canopy yeni yatırmalara kapatıldı
- [Heartwood](./Heartwood.md) — serideki önceki ağ yükseltmesi
- [NU5](./NU5.md) — Orchard'i başlatan sonraki ağ yükseltmesi
- [NU6.1](./NU6_1.md) — geliştirme fonlamasının en güncel düzenlemesi


Seri: [Ağ Yükseltmeleri dizini](../start-here/network-upgrades) · Önceki: [Heartwood](../zcash-tech/heartwood) · Sonraki: [NU5](../zcash-tech/nu5)
