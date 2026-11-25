<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/NU6.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Sayfayı düzenle"/>
</a>

# NU6

> NU6, Zcash tarihinde mainnet’te 2,726,400. blokta kullanıma açıldı (23 Kasım 2024 UTC).

Bu sayfadan öğrenecekleriniz: Zcash’ın yarılanmadan sonra kendi gelişimini nasıl finanse etmeye devam ettiği, henüz nasıl harcanacağını bilmediği bir rezervi neden ayırdığı ve toplam ZEC arzını nasıl tam olarak öngörülebilir hâle getirdiği.

NU6, Zcash [ağ yükseltmesidir](../start-here/network-upgrades); [ZIP 253](https://zips.z.cash/zip-0253) tarafından devreye alındı ve Kasım 2024’te 2,726,400. blokta mainnet’te etkinleştirildi. Bu, parasal ve [geliştirme finansmanı](../start-here/development-fund) yükseltmesidir: Kasım 2024 yarılanmasından sonra blok sübvansiyonunun bir kısmını geliştirmeye aktarmayı sürdürdü, topluluğun ileride karar vereceği kullanım için protokol içinde bir rezerv oluşturdu ve yeni ZEC miktarının nasıl hesaplandığını kesinleştirdi. NU6, hem Electric Coin Company hem de Zcash Foundation tarafından desteklendi.

Bu neden önemli? Zcash’ın [Geliştirme Fonu](../zcash-tech/canopy), tarihindeki ikinci yarılanma olan Kasım 2024 yarılanması civarında sona erecek şekilde planlanmıştı. NU6 bu finansmanı sürdürdü; ancak tüm coin’leri sabit alıcılara aktarmak yerine, topluluğun daha sonra ne yapılacağına karar verebilmesi için bir payı protokol içinde rezerve etti. Ayrıca yeni ZEC miktarının nasıl oluşturulduğuyla ilgili gözden kaçmış bir hesaplama boşluğunu kapattı; böylece gelecekte var olacak toplam miktar artık tam olarak öngörülebiliyor.

## Kısaca

- NU6, 2,726,400. blokta mainnet’te etkinleştirildi (23 Kasım 2024 UTC); ZIP 253 tarafından devreye alındı.
- Kasım 2024 yarılanmasından sonra blok sübvansiyonunun %20’sini geliştirmeye aktarmayı sürdürdü: %8 Zcash Community Grants’ya (ZCG), %12 ise yeni Ertelenmiş Geliştirme Fonu Kilitli Kasası’na (ZIP 2001).
- Kilitli kasa, harcama yetkisi tanımlanmamış, protokol içi bir rezervdir — NU6 yönetişim konusunu bilerek açık bıraktı ve NU6.1 (2025) daha sonra bu soruyu yanıtladı.
- ZIP 236 artık her coinbase işleminin tam olarak dengelenmesini zorunlu kılıyor; böylece madenciler eksik talepte bulunup yanlışlıkla ZEC yakamıyor. Gelecekteki toplam arz tam olarak öngörülebilir hâle geliyor.
- Bakiyeler, gizlilik ve işlem kuralları değişmedi: NU6 bir finansman ve hesaplama yükseltmesidir.

## Görsel benzetme

NU6’ı, inşaatçılarına düzenli ödenek veren ve bu ödemelerin sona ereceği tarihi bilen bir hane olarak düşünün. Ödemeleri durdurmak yerine NU6 ödeneği ikiye böler: Bir kısmı topluluk hibeleri komitesine gitmeye devam eder, diğer kısmı ise henüz açılma yöntemi duyurulmamış bir aile kasasına konur. Hane, kasadaki parayı açma kuralları üzerinde anlaşana kadar bu para ayrılmış olarak kalır — bu anlaşma NU6.1’dır.


## NU6 neleri değiştirdi

NU6, Kasım 2024 yarılanmasından sonra blok sübvansiyonunun %20’sini geliştirme finansmanına aktarmayı sürdürdü; bu kural [ZIP 1015](https://zips.z.cash/zip-1015)’te tanımlandı. Bu %20’lik payı ikiye böldü.

1. Blok sübvansiyonunun %8’i, topluluk tarafından ve topluluk için yapılan çalışmaları finanse eden Zcash Community Grants’ya (ZCG) gider.
2. %12’si, topluluğun ileride karar vereceği kullanım için tutulan yeni bir protokol içi kilitli kasaya aktarılır.

Blok sübvansiyonunun geri kalanı ve işlem ücretleri, ağı güvence altına alan madencilere gider. NU6 ayrıca mevcut finansman akışı ve geliştirme fonu kurallarını (ZIP 207 ve ZIP 214) bu yeni yapıya uyarladı.

![NU6 geliştirme fonu bölüşümü: blok sübvansiyonunun yüzde 20'si geliştirmeye gider; yüzde 8 Zcash Community Grants'e, yüzde 12 Deferred Dev Fund Lockbox'a ayrılır](/content-images/nu6-dev-fund-split-08bc73e317.webp)

## Ertelenmiş kilitli kasa

%12’lik pay, NU6’daki yeni fikirdir. Bu değer, bir alıcı adrese ödenmek yerine, Ertelenmiş Geliştirme Fonu Kilitli Kasası adlı protokol içi bir havuza doğrudan yatırılır. Bu kasa [ZIP 2001](https://zips.z.cash/zip-2001)’de tanımlanmıştır.

1. Kilitli kasa, yeni bir finansman akışı türüdür (DEFERRED_POOL); blok ödülü değeri bir kişiye ya da kuruluşa değil, protokolün kendisine aktarılır.
2. Ağ, bunu kendi Zincir değeri havuzu bakiyesi olarak izler; tıpkı korumalı havuzların bakiyelerini izlediği gibi.
3. NU6 kilitli kasayı bilerek oluşturdu, ancak zor soruyu açık bıraktı: Bu fonları kim kontrol edecek ve nasıl serbest bırakılacaklar?

Bu soruyu daha sonra yönetişimi belirleyen [NU6.1](../zcash-tech/nu6-1) yanıtladı: Blok sübvansiyonunun %8’lik akışını Zcash Community Grants’ya sürdürdü ve %12’lik akışı, kilitli kasadaki fonlarla oluşturulan coin sahiplerinin kontrolündeki bir fona yönlendirdi.

## Hesapları denkleştirme

NU6, yeni ZEC oluşturulma biçimindeki bir hesaplama boşluğunu da kapattı; bu konu [ZIP 236](https://zips.z.cash/zip-0236)’de tanımlanmıştır. Coinbase işlemleri, her blokta oluşturulan yeni ZEC ve ücretleri ödeyen özel işlemlerdir.

1. NU6 öncesinde coinbase işleminin, kendisine ödenmesi gerekenden fazlasını talep etmemesi yeterliydi. Bir madenci, sübvansiyonun tamamından daha azını talep edebilir ve bu ZEC miktarı sessizce yakabilirdi.
2. NU6 sonrasında coinbase işlemi tam olarak dengelenmelidir: toplam çıktı değeri, madenci sübvansiyonu ile ücretlerin toplamına eşit olmalı; ne fazla ne eksik olmalıdır.
3. Madenciler artık eksik talepte bulunup yanlışlıkla ZEC yakamayacağı için, gelecekte var olacak toplam ZEC miktarı artık tam olarak öngörülebilir.

![NU6 öncesi ve sonrası Coinbase dengesi: önce coinbase işlemi eksik miktar talep edip ZEC yakabildiği için arz tam olarak öngörülebilir değildi; sonra coinbase işlemi tam olarak dengelenmek zorunda olduğundan emisyon da öngörülebilir hâle geldi](/content-images/nu6-coinbase-balance-0fa2394799.webp)

## Finansmanın gelişimi

NU6, Zcash’ın kendi finansmanını nasıl sağladığına ilişkin daha uzun bir öykünün bir bölümüdür.

1. Canopy (2020), kuruculara verilen ilk ödülü sona erdirdi ve [geliştirme fonu](../start-here/development-fund)nu oluşturdu.
2. NU6 (Kasım 2024), ikinci yarılanmadan sonra bu finansmanı yeniden yapılandırdı ve topluluğun ileride karar vereceği hibeler için ihracın bir payını ayıran Ertelenmiş Geliştirme Fonu Kilitli Kasası’nı oluşturdu.
3. NU6.1 (2025), NU6’ın açık bıraktığı, ayrılan fonları kimin kontrol edeceği sorusunu yanıtladı: Blok sübvansiyonunun %8’ini Zcash Community Grants’ya aktarmayı sürdürdü ve %12’lik payı, kilitli kasadaki fonlarla oluşturulan coin sahiplerinin kontrolündeki bir fona yönlendirdi.

![Zcash finansmanının gelişimi: Canopy geliştirme fonunu oluşturdu, NU6 kilit kutusunu kurdu ve NU6.1 onu kimin kontrol edeceğine ilişkin kuralları belirledi](/content-images/nu6-funding-timeline-2427db58c0.webp)

## Yaygın Hatalar

- **NU6’ın para politikasını değiştirdiğini düşünmek.** İhraç takvimi ve yarılanma zamanlaması değişmedi; NU6, yeni ZEC miktarını değil, sübvansiyonun bir kısmını kimin aldığını değiştirdi.
- **Kilitli kasayı bir vakıf cüzdanıyla karıştırmak.** Ertelenmiş Geliştirme Fonu Kilitli Kasası, konsensüs tarafından izlenen bir Zincir değeri havuzudur; herhangi birinin harcayabileceği bir adres değildir.
- **NU6.1 ile NU6’ın aynı yükseltme olduğunu varsaymak.** NU6 rezervi oluşturdu; NU6.1 ise bunu kimin kontrol edeceğine karar verdi — %8 ZCG’ya, %12 coin sahiplerinin kontrolündeki bir fona.
- **Tam denge kuralının (ZIP 236) kullanıcı coin’lerini değiştirdiğine inanmak.** Bu kural, coinbase işlemlerini — blok başına ihraç ödemelerini — sınırlar; mevcut bakiyeleri veya sıradan işlemleri etkilemez.
- **Geliştirme için ayrılan %20’lik payın yeni olduğunu düşünmek.** Geliştirme için %20 finansman Canopy’dan beri vardı; NU6 bunu yarılanma sonrasında sürdürdü ve %8 ZCG / %12 kilitli kasa şeklinde böldü.


## Sözlük

| Terim | Sade dille anlamı |
|---|---|
| Block subsidy | Madencilikle oluşturulan her blokla birlikte yaratılan yeni ZEC |
| Coinbase transaction | Bir bloğun sübvansiyonunu ve ücretlerini ödeyen özel işlem |
| Deferred Dev Fund Lockbox | İhracın bir payını topluluğun ileride karar vereceği kullanım için tutan protokol içi rezerv |
| Zcash Community Grants (ZCG) | Zcash topluluğu tarafından ve topluluğu için yapılan çalışmaları finanse eden komite |
| Consensus branch id | Düğümlerin bir bloğun hangi yükseltmenin kurallarını izlediğini belirlemek için kullandığı tanımlayıcı |
| Network upgrade (NU) | Belirli bir blok yüksekliğinde etkinleştirilen, Zcash’ın konsensüs kurallarında yapılan eşgüdümlü değişiklik |

## SSS

NU6 ZEC'imi veya gizliliğimi değiştirir mi? Hayır. NU6, işlemleriniz veya gizliliğinizle değil, geliştirme finansmanının nasıl sağlandığı ve ihracın nasıl hesaplandığıyla ilgilidir. Fonlarınız ve korumalı işlemleriniz etkilenmez.

Finansman nereden geliyor? Blok sübvansiyonundan; bloklar madencilikle oluşturuldukça ihraç edilen yeni ZEC miktarından. Bu miktarın %20’si, tamamının madencilere gitmesi yerine geliştirme çalışmalarına yönlendirilir.

Kilitli kasa ne işe yarar? İhracın bir payını protokol içinde rezerve eder; böylece topluluk bu payın nasıl kullanılacağına daha sonra karar verebilir. NU6 rezervi ayırdı, NU6.1 ise rezervi kimin kontrol edeceğine ilişkin kuralları belirledi.

Tam denge kuralı coin’lerimi değiştirir mi? Hayır. Yalnızca her bloktaki coinbase işleminin, kendisine ödenmesi gereken miktarı tam olarak ödemesini zorunlu kılar. Mevcut bakiyeleri değil, yeni ihracın hesaplanmasını etkiler.

NU6 teknik olarak neyle tanımlanır? NU6, ana ağda 2,726,400. blokta etkinleştirilmesini ve konsensüs dal kimliğini belirleyen ZIP 253 ile devreye alınır. Konsensüs değişikliklerinin kendileri ZIP 236, ZIP 1015 ve ZIP 2001’den gelir; ZIP 207 ve ZIP 214 ise bu yapıya uyacak şekilde güncellenmiştir.

NU6, NU6.1’dan nasıl farklıdır? NU6 finansmanı yeniden yapılandırdı ve kilitli kasayı oluşturdu. NU6.1, kilitli kasadaki fonları kimin kontrol edeceğine ve ayrılan payın nasıl bölüneceğine karar verdi.

## Bilginizi sınayın

NU6, Ertelenmiş Geliştirme Fonu Kilitli Kasası’nı oluşturdu ancak onu kimin kontrol edeceğini belirtmedi. Bir yükseltme neden rezerv oluşturup yönetişim konusunu bilerek daha sonraya bırakır?

<details>
<summary>Yanıt</summary>

Rezervin oluşturulması, ihracın bir payının sabit alıcılara ödenmek yerine protokol içinde ayrılmasını güvence altına aldı. Bu fonları kimin kontrol edeceğine ve nasıl serbest bırakılacaklarına karar vermek daha zor bir yönetişim sorusudur. NU6 bu soruyu bilerek açık bıraktı ve NU6.1 yanıtladı: Blok sübvansiyonunun %8’i Zcash Community Grants’ya aktarılmaya devam eder, %12’si ise kilitli kasadaki fonlarla oluşturulan coin sahiplerinin kontrolündeki bir fona gider.
</details>

### Kaynaklar

[ZIP 253: NU6 Ağ Yükseltmesinin](https://zips.z.cash/zip-0253) devreye alınması

[ZIP 236: Bloklar tam olarak dengelenmelidir](https://zips.z.cash/zip-0236)

[ZIP 1015: Doğrudan Olmayan Geliştirme Finansmanı için Blok Sübvansiyonu Tahsisi](https://zips.z.cash/zip-1015)

[ZIP 2001: Kilitli Kasa Finansman Akışları](https://zips.z.cash/zip-2001)

[Ağ Yükseltmesi 6 (NU6)](https://z.cash/upgrade/nu6/)

### Ayrıca bkz.

[Zcash Ağ Yükseltmeleri](../start-here/network-upgrades)

[Geliştirme Fonu](../start-here/development-fund)

[Zcash Para Politikası](../start-here/zcash-monetary-policy)

[NU6.1](../zcash-tech/nu6-1)

[NU6.2](../zcash-tech/nu6-2)

[ZEC ve Zcash nedir](../start-here/what-is-zec-and-zcash)

---

## İlgili Sayfalar

| Sayfa | İlgili olma nedeni |
|---|---|
| [Canopy](./Canopy.md) | NU6’ın yeniden yapılandırdığı geliştirme fonunu oluşturdu |
| [NU6.1](./NU6_1.md) | kilitli kasadaki fonları kimin kontrol edeceğine karar verdi |
| [NU6.2](./NU6_2.md) | aynı serideki Orchard acil onarım yükseltmesi |
| [Geliştirme Fonu](../start-here/development-fund) | %20’lik payın arkasındaki finansman geçmişi |


Seri: [Ağ Yükseltmeleri dizini](../start-here/network-upgrades) · Önceki: [NU5](../zcash-tech/nu5) · Sonraki: [NU6.1](../zcash-tech/nu6-1)
