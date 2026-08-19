<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/What_a_Block_Explorer_Can_See.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Zcash'te bir blok gezgini neleri görebilir

## Kısaca

- Bitcoin'de bir blok gezgini her şeyi gösterir: gönderen, alıcı ve miktar.
- Zcash'te bu yalnızca şeffaf (t-address) etkinlik için geçerlidir.
- Bir gezgin, paranın shielded pool'a girişini ve çıkışını görebilir, ancak içinde ne olduğunu göremez.
- Tam shielded (z'den z'ye) işlemler göndereni, alıcıyı ve miktarı açığa çıkarmaz.
- Herhangi bir kamuya açık "shield rate" verisi bir alt sınırdır, çünkü tamamen özel etkinlik dışarıdan görünmez.

---

## İki adres türü

Zcash'te iki tür adres vardır.

Bir **şeffaf adres** `t` ile başlar ve bir Bitcoin adresi gibi çalışır. Bakiyeler ve ödemeler herkese açıktır.

Bir **shielded adres** `z` ile başlar ve sıfır bilgi ispatlarıyla korunur. Ağ, bir shielded ödemenin geçerli olduğunu; göndereni, alıcıyı veya miktarı açıklamadan doğrulayabilir.

İki tür olduğu için değer dört şekilde hareket edebilir: şeffaftan şeffafa (t'den t'ye), şeffaftan shielded'a (t'den z'ye, shielding olarak adlandırılır), shielded'dan şeffafa (z'den t'ye, deshielding olarak adlandırılır) ve shielded'dan shielded'a (z'den z'ye, tamamen özel).

## Bir gezgin neleri görebilir

[Blockchair](https://blockchair.com/zcash) gibi herkese açık bir gezgin şunları açıkça okuyabilir:

- Baştan sona tamamen şeffaf (t'den t'ye) her ödeme.
- Shielded pool'a giren para (şeffaf taraf ve miktar).
- Shielded pool'dan çıkan para (şeffaf taraf ve miktar).
- Her shielded pool'da tutulan toplam ZEC; bu bilgi herkese açıktır çünkü ağ, yoktan coin yaratılmadığını bu sayede kanıtlayabilir.

Kısacası, shielded pool'un kenarları görünürdür. Değerin içeri girip çıktığını izleyebilirsiniz.

## Bir gezgin neleri göremez

Herkese açık bir gezgin şunları okuyamaz:

- Tam shielded (z'den z'ye) işlemleri. Gönderen, alıcı ve miktar gizli kalır.
- Herhangi bir shielded ödemenin arkasındaki göndereni veya alıcıyı.
- Tek bir shielded adresin bakiyesini.
- Fonlar pool'un içine girdikten sonra onlara ne olduğunu.

Ham veriyi sorguladığınızda, shielded gönderen ve alıcı alanları boş döner. Gezgin bunu kendi tercihiyle gizlemiyor. Bu bilgi, okunabilir biçimde hiçbir zaman herkese açık zincirde yer almadı. Bilgi şifrelenmiştir ve yalnızca doğru viewing key'e sahip biri onu okuyabilir.

## Neden önemlidir

**Gizliliğiniz bir şirkete güvenmekten değil, kriptografiden gelir.** Bir veri sağlayıcısı istese bile shielded bir işlemin içini göremez.

**Kamuya açık shield-rate sayıları gizliliği eksik sayar.** Araştırmacılar yalnızca kamuya açık sınırı geçenleri ölçebilir; bu nedenle özel etkinliğin gerçek miktarı en az rapor ettikleri kadardır ve genellikle daha fazladır.

**Daha büyük bir shielded pool herkesi korur.** Shielded adresleri kullanan kişi sayısı arttıkça, tek bir özel ödemenin gizlenebileceği kalabalık da büyür. Bir shielded adres kullanmak hem sizi hem de pool'daki herkesi korumaya yardımcı olur.

## Bunu pratiğe dökün

- Varsayılan olarak shielded adresleri kullanan bir cüzdan kullanın; örneğin [ZODL](https://zodl.com) veya [Ywallet](https://ywallet.app/).
- ZEC'i şeffaf bir adreste aldığınızda, harcamadan önce onu bir shielded adrese taşıyın.
- Mümkün olan yerlerde shielded adreslere ödeme yapın. Her şeffaf ödeme tamamen herkese açıktır; shielded olan ise değildir.

## Kaynaklar

- [Zcash: gizlilik ve güvenlik önerileri](https://z.cash/support/security/privacy-security-recommendations/)
- [Shielded bir ekosistem (Electric Coin Company)](https://electriccoin.co/blog/shielded-ecosystem/)
- [Zcash teknolojisi nasıl çalışır](https://z.cash/technology/)
- [Blockchair Zcash gezgini](https://blockchair.com/zcash)

## İlgili sayfalar

- [Zcash temelleri](/start-here/what-is-zec-and-zcash)
- [Cüzdanlar](/using-zcash/wallets)
- [Shielded pool'lar](/using-zcash/shielded-pools)
- [ZK-SNARKs](/zcash-tech/zk-snarks)

---

*Bu wiki sayfasına ekleme yapmak veya düzenleme önermek isterseniz lütfen [ZecHub GitHub deposuna](https://github.com/ZecHub/zechub) gidin ve bir pull request gönderin.*
