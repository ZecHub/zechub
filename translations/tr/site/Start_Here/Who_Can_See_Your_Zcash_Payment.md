<a href="https://github.com/zechub/zechub/edit/main/site/Start_Here/Who_Can_See_Your_Zcash_Payment.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Zcash Ödemenizi Kimler Görebilir?

## Kısaca

- Zcash size **iki tür adres** sunar: şeffaf (`t`) ve korumalı (`z` veya `u`).
- Kamunun ne kadarını göreceği, ödemenizin hangi türler arasında hareket ettiğine bağlıdır.
- Yalnızca **korumalıdan korumalıya** bir ödeme göndereni, alıcıyı ve tutarı gizler.
- Korumalı bir adres tek bir anahtar değildir. Küçük bir anahtar kümesidir ve **harcama yetkisini vermeden salt okunur erişim** paylaşabilirsiniz.
- Bir viewing key, siz paylaştıktan sonra **geri alınamaz**.

---

## Önce anlaşılması gereken tek şey

Çoğu blokzincirde yapılacak bir seçim yoktur. Gönderdiğiniz her şey, bakan herkes için sonsuza kadar herkese açıktır.

Zcash bunun yerine size bir seçim sunar. Bu seçim iki kez yapılır: **bir kez hangi adrese göndereceğinizi seçerken, bir kez de geçmişinizi okuyabilecek bir anahtarı kime vereceğinize karar verirken.**

Aşağıdaki görsel her ikisini de kapsar.

![Dört işlem yolunun her biri için Zcash anahtar türleri ve bir blok gezgininin görebilecekleri](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Start_Here/assets/who-can-see-your-zcash-payment.png)

---

## Birinci seçim: hangi adres

Her Zcash ödemesi iki adres arasında hareket eder ve bunların her biri şeffaf ya da korumalı olabilir. Bu da dört yol oluşturur ve her biri farklı miktarda bilgi sızdırır.

Desen göründüğünden daha basittir: **şeffaf bir adrese dokunan her şey herkese açık hale gelir.** Baştan sona korumalı havuz içinde kalan bir ödeme, ücret dışında hiçbir şey açığa çıkarmaz.

Bu en çok bir borsadan çekim yaptığınızda önemlidir. Birçok borsa yalnızca şeffaf adreslere gönderim yapar, bu yüzden çekim işlemi herkese açıktır. Fonlar elinize geçer geçmez, harcamadan önce onları kendiniz korumalı hale getirin.

Bir gezginin tam olarak ne okuduğuna daha derinlemesine bakmak için [Bir blok gezgininin görebilecekleri](/zcash-tech/what-a-block-explorer-can-see) sayfasına bakın.

---

## İkinci seçim: anahtarı kim alır

Asla kaldıramayacağınız gizlilik faydalı değildir. Bazen bir muhasebeciye, bir denetçiye ya da vergi dairesine bir şeyi kanıtlamanız gerekir. Zcash bunu, kontrolden vazgeçmenizi istemeden yapar.

**Spending key.** Her şeyi görür ve fonları hareket ettirir. Para budur. Sizde kalır ve hiçbir nedenle hiç kimseyle paylaşılmaz.

**Full viewing key.** Salt okunurdur. Gelen ve giden işlemleri ve bakiyeleri gösterir, ancak tek bir zatoshi bile harcayamaz. Bir denetçiye ya da muhasebeciye verdiğiniz şey budur.

**Incoming viewing key.** Daha da dardır: yalnızca gelen ödemeleri gösterir. Bir borsa veya satıcı, yatırdığınız tutarın ulaştığını doğrulamak için bunu çalıştırabilir; spending key ise internete hiç bağlanmayan donanım üzerinde kalır.

Sıralama önemlidir. Elinizde olan en geniş anahtarı değil, işi gören en dar anahtarı verin.

---

## Yeni başlayanların kaçırdığı kısım

**Bir viewing key iptal edilemez.** "Paylaşımı geri al" düğmesi yoktur. Biri ona sahip olduktan sonra, o adres var olduğu sürece onu okuyabilir. Erişimi kesmeniz gerekiyorsa, fonlarınızı yeni bir adrese taşırsınız.

**Tamamen korumalı bir ödemede bile ücretler herkese açıktır.** Tutar gizlidir; ücret gizli değildir.

**Herkese açık olan kalıcıdır.** Zincirin bugün gösterdiği her şeyi, yirmi yıl sonra da gösterir. Bir ödemeyi gönderdikten *sonra* onu korumalı hale getirmeye karar vermek, yapabileceğiniz bir şey değildir.

---

## Bunu pratiğe dökün

- Varsayılan olarak koruma sağlayan bir cüzdan kullanın; örneğin [Zodl](https://zodl.com) veya [Ywallet](https://ywallet.app/).
- Bir borsadan gelen fonları, harcamadan önce ulaşır ulaşmaz korumalı hale getirin.
- Alıcı destekliyorsa, korumalı adreslere ödeme yapın.
- Bir viewing key paylaşmadan önce, sorulan soruyu yanıtlayan en küçük anahtarın hangisi olduğunu sorun.

---

## Kaynaklar

- [Viewing key'lerin açıklaması (Electric Coin Company)](https://electriccoin.co/blog/explaining-viewing-keys/)
- [Seçici açıklama ve viewing key'ler (Electric Coin Company)](https://electriccoin.co/blog/viewing-keys-selective-disclosure/)
- [ZIP 310: Viewing key'ler](https://zips.z.cash/zip-0310)
- [Zcash teknolojisi nasıl çalışır](https://z.cash/technology/)

## İlgili sayfalar

- [Zcash temelleri](/start-here/what-is-zec-and-zcash)
- [Zcash yeni kullanıcı rehberi](/start-here/new-user-guide)
- [Bir blok gezgininin görebilecekleri](/zcash-tech/what-a-block-explorer-can-see)
- [Viewing key'ler](/zcash-tech/viewing-keys)
- [İşlemler](/using-zcash/transactions)

---

*Bu wiki sayfasına ekleme yapmak veya düzenleme önermek isterseniz, lütfen [ZecHub GitHub deposuna](https://github.com/ZecHub/zechub) gidin ve bir pull request gönderin.*
