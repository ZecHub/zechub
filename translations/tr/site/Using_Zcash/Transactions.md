---
<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Transactions.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Sayfayı Düzenle"/>
</a>


# İşlemler

ZEC, ödemeler için yaygın olarak kullanılan bir dijital varlıktır ve güçlü gizlilik özellikleri sayesinde arkadaşlara ödeme yapmak, alışveriş yapmak veya bağışta bulunmak gibi çeşitli işlemler için uygundur. Gizliliği ve güvenliği en üst düzeye çıkarmak için, Zcash içinde farklı işlem türlerinin nasıl çalıştığını anlamak çok önemlidir.

## Kısaca

- Zcash iki tür işlemi destekler: ayrıntıları gizli tutan **shielded** ve bunları herkese açık olarak kaydeden **transparent**.
- Shielded adresler `u` veya `z` ile başlar. Transparent adresler `t` ile başlar ve büyük ölçüde bir Bitcoin adresi gibi davranır.
- Her ödemede seçim sizin. Gizlilik, Zcash’in size sunduğu bir seçenektir; sizin yerinize başkasının karar verdiği bir ayar değildir.
- Bir borsadan çekim yapmak, insanların en sık gizlilik kaybettiği yerdir. Borsa yalnızca transparent çekimleri destekliyorsa, varlıklar geldikten sonra onları kendiniz shielded hale getirin.
- Ücretler [ZIP 317](https://zips.z.cash/zip-0317)’yi takip eder ve işlemin boyutuna göre artar. Hâlâ eski sabit ücreti gönderen cüzdanlarda işlemler gecikebilir.

## Shielded İşlemler

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/bZM3o_eIovU"
    title="Zcash Açıklaması: Zcash Shielded İşlemler"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>

---

Shielded işlemler, ZEC’i shielded cüzdanınıza taşıdığınızda gerçekleşir. Shielded cüzdan adresiniz U veya Z ile başlar. Shielded işlemler gönderdiğinizde, hem sizin hem de işlem yaptığınız kişilerin, diğer P2P ödeme ağlarında mümkün olmayan bir gizlilik düzeyini korumasını sağlarsınız. Shielded bir işlem göndermek çok kolaydır; sadece iki şeyden emin olmanız gerekir. İlki, doğru cüzdan türünü kullanıyor olmanızdır. Doğru cüzdan türünü kullandığınızdan emin olmanın en kolay yolu bir [cüzdan](https://zechub.wiki/wallets) indirmektir. İkinci önemli nokta ise ZEC’i shielded bir cüzdana taşımaktır. Bir borsadan ZEC çekerken, borsanın shielded mi yoksa transparent çekimleri mi desteklediğini bilmeniz gerekir. Shielded çekimleri destekliyorlarsa, ZEC’i doğrudan shielded adresinize çekebilirsiniz. Borsa yalnızca transparent çekimleri destekliyorsa, YWallet kullanmanız ve aldıktan sonra ZEC’inizi otomatik olarak shielded hale getirmeniz gerekir. Para göndermek ve almak için yalnızca shielded işlemleri kullanmak, gizliliği korumanın ve veri sızdırma riskini azaltmanın en iyi yoludur

## Transparent İşlemler

Transparent işlemler benzer şekilde çalışır ancak gizlilik korumalarına sahip değildir; bu da işlem ayrıntılarını blokzincirde herkese açık hâle getirir. Gizlilik öncelik olduğunda transparent işlemlerden kaçınılmalıdır. Not: Transparent cüzdanlar, işlem karmaşıklığıyla orantılı ücretler gerektiren ZIP-317 nedeniyle sorun yaşayabilir. Varsayılan ücretler reddedilmeye veya gecikmelere yol açabilir; bu yüzden ücret özelleştirmesi kritik önem taşır.

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/R-krX1UpsIg"
    title="🛡️Zcash shielded cüzdanlarını öğrenin!"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>

## Bunu Gözünüzde Canlandırmanın Basit Bir Yolu

Transparent bir işlem bir kartpostaldır. Postacı onu teslim eder, ancak yol boyunca ona dokunan herkes mesajı okuyabilir, kimin gönderdiğini görebilir ve kimin aldığını görebilir.

Shielded bir işlem ise mühürlü bir zarftır. Posta hizmeti yine de gerçek pullu gerçek bir mektubun sistemden geçtiğini doğrular ve hiç kimse bir tanesini sahte olarak üretemez ya da aynı mektubu iki kez gönderemez. Zarfın içeriği, gönderen ile alıcı arasında kalır.

Önemli olan şu ki, Zcash size hangisini göndereceğinize ödeme bazında karar verme imkânı tanır.

## Transparent İşlemler İçin Ücretleri Yönetme

ZIP-317 Rehberi: Ücret yapısı işlem karmaşıklığına göre ölçeklenir ve standart 0.00001 ZEC ücretinin ötesinde ayarlamalar gerektirir.
Örnek Hesaplama: Basit, tek notlu bir işlem 0.0001 ZEC ücret gerektirebilir; her ek not için bu tutar yaklaşık 0.00005 ZEC artar.

Cüzdanlarda Ücret Düzenleme

Trust Wallet: Bir işlem oluştururken dişli simgesine dokunarak gelişmiş ayarlara erişin. İşlemin başarısız olmaması için Miner Tip Gwei ve Max Fee Gwei alanlarını dikkatlice ayarlayın. Trust Wallet yalnızca ağ ücretlerini alır.
Coinomi Wallet: Ağ koşullarına göre Low, Normal, High olmak üzere üç dinamik ücret seçeneği sunar. Manuel ayarlamalar için desteklenen coin’lerde Custom seçeneğini seçin veya sağ üst köşedeki Change Fee seçeneğini kullanın. Kullanıcılar bayt veya kilobayt başına ücret belirleyebilir; bu da onay sürelerini etkiler. Emin değilseniz dinamik seçenekleri kullanmanız önerilir.

## Yaygın Hatalar

- **ZEC listeleyen her cüzdanın onu özel olarak gönderebildiğini varsaymak.** Çok sayıda çoklu coin cüzdanı, Zcash’in yalnızca transparent tarafını destekler. Gizlilik için ona güvenmeden önce cüzdanın desteklediği havuzları kontrol edin. [Cüzdanlar](https://zechub.wiki/using-zcash/wallets) sayfası bunu her seçenek için listeler.
- **Transparent bir adrese çekim yapıp varlıkları orada bırakmak.** Çekimin kendisi herkese açıktır ve daha sonra o adresten yapılan her hareket de herkese açık kalır. Varlıklar ulaştığında onları shielded hale getirin.
- **Gizliliği bir kez açılan bir şey gibi görmek.** Her işlem ayrı bir seçimdir. Bugün shielded göndermeniz, geçen hafta yaptığınız transparent bir ödemeyi geri almaz.
- **Her şey için aynı transparent adresi yeniden kullanmak.** Transparent faaliyet kalıcı olarak görünür olduğundan, tekrar kullanılan tek bir adres zamanla birbirine bağlanmaması gereken ödemeleri ilişkilendirir.
- **Güncelliğini yitirmiş bir varsayılan ücretle göndermek.** ZIP 317’yi benimsememiş cüzdanlar hâlâ eski sabit ücreti gönderiyor olabilir; bu da bir işlemin onaylanmadan beklemesine neden olabilir.

## Not

Lütfen ZEC kullanmanın en güvenli yolunun yalnızca shielded işlemleri kullanmak olduğunu unutmayın. Bazı cüzdanlar, kullanıcıların ve borsaların transparent ve shielded adresleri birlikte birleştirmesine olanak tanıyan [unified addresses](https://electriccoin.co/blog/unified-addresses-in-zcash-explained/#:~:text=The%20unified%20address%20(UA)%20is,within%20the%20broader%20Zcash%20ecosystem.) özelliğini uygulama sürecindedir.

## Kaynaklar

[ZIPS](https://zips.z.cash/)

## İlgili Sayfalar

- [Cüzdanlar](/using-zcash/wallets) — hangi cüzdanlar shielded gönderimi destekler, hangileri yalnızca transparent’tır
- [Shielded Havuzlar](/using-zcash/shielded-pools) — shielded varlıklarınızın bulunduğu havuzlar olan Sapling ve Orchard
- [Notlar](/using-zcash/memos) — shielded bir işlemle birlikte taşınabilen şifreli mesajlar
- [Transparent Borsa Adresleri](/using-zcash/transparent-exchange-addresses) — TEX adresleri ve borsaların bunları neden kullandığı
- [Saklamalı Borsalar](/using-zcash/custodial-exchanges) — hangi borsaların shielded çekimleri desteklediği

## ZEC’den ZAT’a Dönüştürücü
