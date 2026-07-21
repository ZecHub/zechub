<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Transactions.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Sayfayı Düzenle"/>
</a>


# İşlemler

ZEC, ödemeler için yaygın olarak kullanılan bir dijital varlıktır ve onu arkadaşlara ödeme yapmak, alışveriş yapmak veya bağışta bulunmak gibi çeşitli işlemler için uygun hâle getiren güçlü gizlilik özellikleri sunar. Gizliliği ve güvenliği en üst düzeye çıkarmak için, Zcash içinde farklı işlem türlerinin nasıl çalıştığını anlamak çok önemlidir.

## Shielded İşlemler

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/bZM3o_eIovU"
    title="Zcash Açıklanıyor: Zcash Shielded İşlemleri"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>

---

Shielded işlemler, ZEC’inizi shielded cüzdanınıza taşıdığınızda gerçekleşir. Shielded cüzdan adresiniz U veya Z ile başlar. Shielded işlemler gönderdiğinizde, hem sizin hem de işlem yaptığınız kişilerin, diğer P2P ödeme ağlarında mümkün olmayan bir düzeyde gizliliği korumasını sağlamış olursunuz. Shielded işlem göndermek çok kolaydır; sadece iki şeyden emin olmanız gerekir. İlki, doğru cüzdan türünü kullanıyor olmanızdır. Doğru türde bir cüzdan kullandığınızdan emin olmanın en kolay yolu bir [cüzdan](https://zechub.wiki/wallets) indirmektir. İkinci önemli nokta ise ZEC’i shielded bir cüzdana taşımaktır. Bir borsadan ZEC çekerken, borsanın shielded mı yoksa transparent çekimleri mi desteklediğini bilmeniz gerekir. Shielded çekimleri destekliyorlarsa, ZEC’i doğrudan shielded adresinize çekebilirsiniz. Borsa yalnızca transparent çekimleri destekliyorsa, ZEC hesabınıza ulaştıktan sonra YWallet kullanmalı ve ZEC’inizi otomatik olarak shielded hâle getirmelisiniz. Para göndermek ve almak için yalnızca shielded işlemleri kullanmak, gizliliği korumanın ve veri sızdırma riskini azaltmanın en iyi yoludur.

## Transparent İşlemler

Transparent işlemler benzer şekilde çalışır ancak gizlilik korumalarına sahip değildir; bu da işlem ayrıntılarını blokzincir üzerinde herkese açık hâle getirir. Gizlilik öncelik olduğunda transparent işlemlerden kaçınılmalıdır. Not: Transparent cüzdanlar, işlem karmaşıklığıyla orantılı ücretler gerektiren ZIP-317 nedeniyle sorun yaşayabilir. Varsayılan ücretler reddedilmeye veya gecikmelere yol açabilir; bu nedenle ücret özelleştirmesi kritik öneme sahiptir.

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


### Transparent İşlemler İçin Ücretleri Yönetme

ZIP-317 Rehberi: Ücret yapısı, işlem karmaşıklığına göre ölçeklenir ve standart 0.00001 ZEC ücretinin ötesinde ayarlamalar gerektirir.
Örnek Hesaplama: Basit, tek notalı bir işlem 0.0001 ZEC ücret gerektirebilir; her ek nota için bu ücret yaklaşık 0.00005 ZEC artar.

Cüzdanlarda Ücretleri Düzenleme

Trust Wallet: Bir işlem oluştururken dişli simgesine dokunarak gelişmiş ayarlara erişin. İşlemin başarısız olmaması için Miner Tip Gwei ve Max Fee Gwei alanlarını dikkatlice ayarlayın. Trust Wallet yalnızca ağ ücretlerini tahsil eder.
Coinomi Wallet: Ağ koşullarına göre Düşük, Normal, Yüksek olmak üzere üç dinamik ücret seçeneği sunar. Manuel ayarlamalar için desteklenen coin’lerde Custom seçeneğini seçin veya sağ üst köşedeki Change Fee seçeneğini kullanın. Kullanıcılar bayt veya kilobayt başına ücret belirleyebilir; bu da onay sürelerini etkiler. Emin değilseniz dinamik seçenekleri kullanmanız önerilir.

Bu sürüm, ücret yönetimi rehberini, dinamik ücret seçeneklerini ve Trust Wallet ile Coinomi genelindeki özelleştirme ayarlarını içererek kullanıcılara ücret kontrolü hakkında kapsamlı bilgiler sunar.

#### Kaynaklar

[ZIPS](https://zips.z.cash/)

#### Not

Lütfen ZEC kullanmanın en güvenli yolunun yalnızca shielded işlemleri kullanmak olduğunu unutmayın. Bazı cüzdanlar, kullanıcıların ve borsaların transparent ve shielded adresleri bir arada kullanmasına olanak tanıyan [unified addresses](https://electriccoin.co/blog/unified-addresses-in-zcash-explained/#:~:text=The%20unified%20address%20(UA)%20is,within%20the%20broader%20Zcash%20ecosystem.) özelliğini uygulama sürecindedir. 

## ZEC’den ZAT’a Dönüştürücü
