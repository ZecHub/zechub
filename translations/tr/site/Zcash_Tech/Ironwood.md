<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Ironwood.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Sayfayı Düzenle"/>
</a>

# Ironwood

> Ironwood, Zcash mainnet'inde 3,428,143. blokta etkinleşir; bunun 28 Temmuz 2026 UTC civarında olması bekleniyor.

Buradan çıkaracağınız ana fikirler: Ironwood'un neleri değiştirdiği, gizli paradaki bir hatanın neden ciddi olduğu ve turnikenin hiç ZEC üretilmediğini herkesin nasıl doğrulamasına izin verdiği.

Ironwood, resmi olarak NU6.3 olan ve aynı adı taşıyan yeni bir shielded pool sunan bir Zcash [ağ yükseltmesi](../start-here/network-upgrades)'dir. Bir [shielded pool](../using-zcash/shielded-pools), miktarları ve sahipleri [sıfır bilgi kriptografisi](../zcash-tech/zk-snarks) ile gizli tutulan fonların kümesidir. Ironwood, mevcut Orchard shielded pool'unda bulunan bir soundness bug'ını sınırlamak ve denetlemek, ayrıca topluluğa ZEC'in toplam arzının dürüst olduğunu kontrol etmek için daha güçlü bir yol sunmak amacıyla vardır. Konsensüs kuralları [ZIP 258](https://zips.z.cash/zip-0258) içinde belirtilmiştir.

Bunun neden önemli olduğu. Bitcoin gibi şeffaf paralarda, kamuya açık defteri okuyarak hiç coin üretilmediğini herkes kontrol edebilir. Shielded para miktarları gizler, bu yüzden yalnızca bakarak anlayamazsınız. Bunun yerine, hiç kimsenin gizlice para yaratamamasını bizzat kriptografinin garanti etmesi gerekir. Ironwood önemlidir çünkü Orchard havuzu için bu garantide bir hata bulundu. Bu yükseltme açığı kapatır ve herkese ZEC'in toplam arzının hâlâ dürüst olduğunu doğrulama imkânı verir.

Zcash'e yeni misiniz? Önce [ZEC ve Zcash nedir](../start-here/what-is-zec-and-zcash) ve [Shielded Pools](../using-zcash/shielded-pools) sayfalarını okuyun, sonra buraya geri dönün.

![Ironwood değer taşıma akışı: değer Orchard havuzundan çıkar, turnike kontrol noktasından geçer ve yeni Ironwood havuzuna girer](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/ironwood-flow.png)

## Ironwood neden gerekliydi

Mayıs 2026'nın sonlarında, bağımsız güvenlik araştırmacısı Taylor Hornby, [Shielded Labs](../zcash-organizations/shielded-labs) için yaptığı bir protokol denetimi sırasında Orchard shielded pool'unda bir soundness bug'ını sorumlu açıklama ilkelerine uygun biçimde bildirdi. Orchard o sırada Zcash'in en yeni shielded pool'uydu ve kusur, [Halo](../zcash-tech/halo) 2 ispat sistemini kullanan sıfır bilgi devresinin eliptik eğriyle ilgili bir bölümünde bulunuyordu.

1. Soundness bug, bir işlemin geçerli olduğunu kanıtlayan matematiğin bunu tam olarak garanti etmediği anlamına gelir.
2. Teorik olarak bir saldırgan, kusuru kullanarak Orchard havuzu içinde geçersiz değer üretebilir ve gerçekte kendisine ait olmayan fonları harcayabilirdi; normal bir düğümün yakalayacağı hiçbir iz bırakmazdı.
3. Zcash'in turnikesi yine de Orchard'dan çıkabilecek toplam değere üst sınır koyuyordu, bu nedenle toplam arz şişirilemezdi; ancak havuzun kendi kriptografisi artık içindeki her gizli coin'in gerçek olduğunu garanti etmiyordu.

![Hatanın açıklaması: bir işlem 5 ZEC koyuyor, ancak kusurlu ispat 7 ZEC çıktığında da geçiyor ve yoktan 2 ZEC yaratıyor](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/ironwood-bug.png)

Yukarıdaki sayılar basitleştirilmiş bir tablodur. Gerçek kusur, devrenin matematiğindeki belirli bir parçadaydı; içeri giren ve çıkan coin'lerin birebir sayımı değildi. Buradan çıkarılması gereken tek nokta, bir soundness bug'ının havuz içinde tespit edilmeden değer yaratılmasına izin verebilmesidir.

Önemle belirtmek gerekir ki hatanın hiç istismar edildiğine dair bir kanıt yoktur, kullanıcı fonlarının etkilendiğine dair bir kanıt yoktur ve ZEC'in toplam arzının değiştiğine dair bir kanıt yoktur. Güvenlik araştırması sayesinde bulundu ve bilinen herhangi bir zarar oluşmadan önce düzeltildi.

## Yanıt

Zcash topluluğu tüm düzeltmeleri tek seferde yapmak yerine aşamalı olarak yayımladı.

![Ironwood yanıt zaman çizelgesi: Orchard hatası Mayıs 2026'da bulunuyor, havuz Haziran 2026'da duraklatılıyor, devre NU6.2'de düzeltiliyor ve Ironwood yaklaşık 28 Temmuz 2026'da etkinleşiyor](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/ironwood-timeline.png)

1. Haziran 2026'nın başlarında, tam düzeltme hazırlanırken geçici bir önlem olarak Orchard havuzu devre dışı bırakıldı.
2. NU6.2 yükseltmesi Orchard devresinin kendisini düzelterek alttaki soundness açığını kapattı.
3. NU6.3 yükseltmesi olan Ironwood, yeni bir shielded pool ve eski Orchard havuzundan değerin tam denetim altında çıkmasını sağlayan kamusal bir kontrol noktası sunar.

![NU6.2'deki düzeltme: düzeltilmiş ispat girdilerin çıktılara eşit olmasını gerektirir; böylece geçerli bir 5 ZEC çıktısı kabul edilirken 7 ZEC çıkarma girişimi reddedilir](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/ironwood-fix.png)

## Ironwood havuzu ne yapar

NU6.2, tüm yeni işlemler için Orchard devresini güvence altına aldı, ancak eski kurallar altında yaratılmış değer hâlâ Orchard havuzunda duruyor. Ironwood, bu değere temiz bir hedef ve hareket ederken denetlenmesini sağlayan bir yöntem sunar.

Ironwood havuzu, NU6.3 etkinleştiğinde oluşturulan yeni bir shielded value pool'dur. Düzeltilmiş devre üzerine kuruludur ve kuantum kurtarılabilir bir not formatı kullanır (bugünün kriptografisi bir gün [kuantum bilgisayarlar](../zcash-tech/post-quantum-security) tarafından kırılırsa fonların kurtarılmasına izin veren bir tasarım); bu format [ZIP 2005](https://zips.z.cash/zip-2005) içinde tanımlanmıştır.

1. Etkinleşmeden sonra eski Orchard havuzu yalnızca harcanabilir hâle gelir; dolayısıyla içine yeni değer giremez.
2. Yeni shielded değer bunun yerine Ironwood'a akar.
3. Shielded ZEC, göndereni, alıcıyı ve miktarı gizleyen aynı güçlü gizlilik garantilerini korur.

## Turnike

Ironwood'daki temel fikir turnikedir; eski Orchard havuzundan Ironwood'a geçerken her coin'in içinden geçmesi gereken bir muhasebe kontrol noktasıdır.

> Turnike, gizli para için cam bir kapının banka kasası için yaptığı şeyi yapar. İçeriyi hâlâ göremezsiniz, ama neyin girip neyin çıktığını tam olarak sayabilirsiniz.

1. Orchard'dan çıkan fonlar, Ironwood'a girmeden önce kamusal bir doğrulama noktasında sayılır.
2. Bu, ne kadar ZEC'in taşındığını herkesin denetlemesine imkân vererek gerçek dolaşımdaki arza olan güveni güçlendirir.
3. Eğer önceki hata yoluyla sahte ZEC yaratılmış olsaydı, bunun ortaya çıkacağı yer bu taşıma muhasebesi olurdu.

Turnikeler Zcash için yeni değildir. Ağ, Sprout, Sapling ve Orchard havuzları arasındaki sınırlarda daha önce de bunları kullandı; böylece havuzlar arasında taşınan değer denetlenebilir kalır ve hiçbir havuz, meşru olarak içine girenden daha fazlasını dışarı çıkaramaz.

Konsensüs kuralları, Ironwood dâhil her değer havuzunu, ağın azami para sınırı içinde tutar; bu yüzden havuz bakiyeleri asla negatife inemez.

## Kullanıcıların yapması gerekenler

Cüzdanlar ve düğüm yazılımı bunun çoğunu otomatik olarak halleder, ancak pratik değişim basittir: zaman içinde shielded bakiyelerinizi eski Orchard havuzundan turnike üzerinden Ironwood havuzuna taşıyın. Cüzdan sağlayıcınızın yönlendirmelerini izleyin ve etkinleşme bloğundan önce mutlaka desteklenen bir sürüme güncelleyin.

## Sözlük

| Terim | Düz anlamı |
|---|---|
| Shielded pool | Miktarları ve sahipleri sıfır bilgi kriptografisi ile gizlenen fon kümesi |
| Soundness bug | Geçersiz bir işlemin, geçerliymiş gibi ispat denetiminden geçmesine izin veren kusur |
| Turnstile | Havuzlar arasında taşınan değeri sayan kamusal kontrol noktası; böylece arz denetlenebilir kalır |
| Spend-only | İçinden harcama yapabildiğiniz ama içine yeni değer ekleyemediğiniz havuz |
| Network upgrade (NU) | Belirli bir blok yüksekliğinde etkinleşen, Zcash'in konsensüs kurallarındaki eşgüdümlü değişiklik |
| Quantum-recoverable note | Kuantum bilgisayarlar bir gün bugünün kriptografisini kırarsa fonların kurtarılabilmesi için tasarlanmış not formatı |

## SSS

ZEC'im etkilendi mi? Hayır. Hatanın hiç kullanıldığına dair kanıt yok, kullanıcı fonlarına etkisi yok ve toplam arzda bir değişiklik yok.

Bir şey yapmam gerekiyor mu? Etkinleşme bloğundan önce cüzdanınızı ve düğüm yazılımınızı desteklenen bir sürüme güncel tutun. Harcama yaptıkça cüzdanınız fonları zaman içinde Ironwood'a taşır; bu yüzden aceleyle elle yapmanız gereken bir şey yoktur. Cüzdan sağlayıcınızın yönlendirmelerini izleyin.

Zcash hâlâ gizli mi? Evet. Ironwood, göndereni, alıcıyı ve miktarı gizleyen aynı shielded gizliliği korur. Bu yükseltme gizlilikle değil, arz bütünlüğüyle ilgilidir.

Hata hiç istismar edildi mi? Edildiğine dair bir kanıt yok. Güvenlik araştırmasıyla bulundu, sorumlu biçimde açıklandı ve bilinen herhangi bir zarar oluşmadan önce düzeltildi.

Eski Orchard havuzuna ne olacak? Yalnızca harcanabilir hâle gelir. İçine yeni değer giremez ve mevcut değer turnike üzerinden Ironwood'a taşınır; bu taşıma kamuya açık şekilde denetlenir.

## Anladığınızı test edin

Shielded havuzların içindeki ZEC gizliyse, Orchard hatasının toplam arzı gizlice şişirmediğini herkes nasıl doğrulayabilir?

<details>
<summary>Cevap</summary>

Turnike sayesinde. Eski Orchard havuzundan çıkan her coin, Ironwood'a girerken kamusal bir kontrol noktasında sayılır. Meşru olarak girenden daha fazla değer çıkmaya çalışsaydı, muhasebe dengelenmezdi; dolayısıyla hatanın yaratmış olabileceği herhangi bir sahte değer bu geçitte ortaya çıkardı.
</details>

### Kaynaklar

[ZIP 258: NU6.3 Ağ Yükseltmesinin Dağıtımı](https://zips.z.cash/zip-0258)

[ZIP 257: Orchard Geçici Açık Azaltımı ve NU6.2 Ağ Yükseltmesinin Dağıtımı](https://zips.z.cash/zip-0257)

[ZIP 2005: Ironwood Quantum Recoverability](https://zips.z.cash/zip-2005)

[Ironwood: Zcash için Yeni Bir Shielded Pool](https://zodl.com/ironwood-a-new-shielded-pool-for-zcash/)

### Ayrıca bakın

[Zcash Ağ Yükseltmeleri](../start-here/network-upgrades)

[Shielded Pools](../using-zcash/shielded-pools)

[Halo](../zcash-tech/halo)

[zk-SNARKS](../zcash-tech/zk-snarks)

[Kuantum Sonrası Güvenlik](../zcash-tech/post-quantum-security)

[Shielded Labs](../zcash-organizations/shielded-labs)

[ZEC ve Zcash nedir](../start-here/what-is-zec-and-zcash)

---

Seri: [Ağ Yükseltmeleri dizini](../start-here/network-upgrades) · Önceki: [NU6.2](../zcash-tech/nu6-2)
