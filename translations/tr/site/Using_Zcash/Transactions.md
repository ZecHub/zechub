<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Transactions.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>


# İşlemler

ZEC, ödemeler için yaygın olarak kullanılan bir dijital varlıktır ve arkadaşlara ödeme yapmak, alışveriş yapmak veya bağışta bulunmak gibi çeşitli işlemler için uygun olmasını sağlayan güçlü gizlilik özellikleri sunar. Gizliliği ve güvenliği en üst düzeye çıkarmak için, Zcash içinde farklı işlem türlerinin nasıl çalıştığını anlamak çok önemlidir.

## Kısaca

- Zcash iki tür işlemi destekler: ayrıntıları gizli tutan **shielded** ve bunları herkese açık olarak kaydeden **transparent**.
- Shielded adresler `u` veya `z` ile başlar. Transparent adresler `t` ile başlar ve büyük ölçüde Bitcoin adresi gibi davranır.
- Her ödemede seçim sizin elinizdedir. Gizlilik, başkasının sizin adınıza karar verdiği bir ayar değil, Zcash'in size sunduğu bir seçenektir.
- Bir borsadan çekim yapmak, insanların en sık gizlilik kaybettiği yerdir. Borsa yalnızca transparent çekimleri destekliyorsa, fonlar geldikten sonra onları kendiniz shield edin.
- Ücretler [ZIP 317](https://zips.z.cash/zip-0317) kurallarını izler ve işlemin boyutuna göre artar. Hâlâ eski sabit ücreti gönderen cüzdanlar, işlemlerinin gecikmesine neden olabilir.
- Çoğu Zcash işleminin [ZIP 203](https://zips.z.cash/zip-0203) kapsamında bir son kullanma yüksekliği vardır. Bir işlem madenciliğe alınmadan önce süresi dolarsa, bu son kullanma yüksekliğinden sonra onaylanamaz ve yeniden gönderilmesi gerekebilir.

## Shielded İşlemler

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/bZM3o_eIovU"
    title="Zcash Explained: Zcash Shielded Transactions"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>

---

Shielded işlemler, ZEC'i shielded cüzdanınıza taşıdığınızda gerçekleşir. Shielded cüzdan adresiniz `u` veya `z` ile başlar. Shielded işlemler gönderirken, siz ve işlem yaptığınız kişiler, varsayılan olarak herkese açık olan ödeme ağlarında mümkün olmayan bir gizlilik düzeyini koruyabilirsiniz.

Shielded işlem göndermek, mevcut Zcash ağını ve güncel shielded havuzlarını destekleyen bir cüzdan kullandığınızda en kolaydır. Bir cüzdana gizlilik için güvenmeden önce, shielded gönderimi, shielded alımı ve kullanmayı planladığınız havuzu destekleyip desteklemediğini kontrol edin. Bir borsadan ZEC çekerken, borsanın shielded mi yoksa transparent çekimleri mi desteklediğini kontrol edin. Yalnızca transparent çekimleri destekliyorsa, fonlar geldikten sonra onları shielded destekleyen bir cüzdana taşıyın.

Fon gönderip almak için shielded işlemleri kullanmak, gizliliği korumanın ve ödeme verilerinin sızma riskini azaltmanın en iyi yoludur.

## Transparent İşlemler

Transparent işlemler, Bitcoin işlemlerine benzer şekilde çalışır. Transparent adresler ve transparent tutarlar dahil olmak üzere işlem ayrıntıları blokzincirde herkese açık şekilde görünür. Gizlilik öncelikliyse transparent işlemlerden kaçınılmalıdır.

Transparent adresler bazı durumlarda hâlâ faydalıdır; özellikle de bir borsa veya hizmet shielded adresleri desteklemiyorsa. ZEC'i transparent bir adrese alırsanız, daha sonraki ödemeleri yapmadan önce bunu shield etmeyi düşünün.

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/R-krX1UpsIg"
    title="Learn Zcash shielded wallets!"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>

## Bunu Hayal Etmenin Basit Bir Yolu

Transparent işlem bir kartpostaldır. Postacı onu teslim eder, ancak yol boyunca eline alan herkes mesajı okuyabilir, kimin gönderdiğini görebilir ve kimin aldığını görebilir.

Shielded işlem ise mühürlü bir zarftır. Posta servisi yine de sistemden gerçek bir mektubun, gerçek bir posta ücretiyle geçtiğini doğrular ve hiç kimse bunu sahte olarak üretemez ya da aynı mektubu iki kez gönderemez. Zarfın içinde ne olduğu, gönderici ile alıcı arasında kalır.

Önemli olan, Zcash'in size hangisini göndereceğinize ödeme bazında karar verme imkânı sunmasıdır.

## Zcash Ücretleri

Zcash, Ethereum tarzı gas birimleri kullanmaz. Zcash işlem ücretleri ZEC cinsinden ödenir ve genellikle **zatoshi** olarak ölçülür. Bir ZEC, 100.000.000 zatoshiye eşittir.

[ZIP 317](https://zips.z.cash/zip-0317), işlem karmaşıklığına göre ölçeklenen geleneksel bir ücret mekanizması tanımlar. Her işlemin eski 1.000 zatoshilik sabit ücreti kullanması yerine, geleneksel ücret girdiler, çıktılar ve shielded eylemler gibi "mantıksal eylemlere" dayanır. Basit işlemler yaygın olarak yaklaşık 10.000 zatoshi yani 0.0001 ZEC civarında başlar, daha karmaşık işlemler ise daha fazlasını gerektirebilir.

Güncel cüzdanların çoğunda kullanıcıların ZIP 317 ücretlerini elle hesaplaması gerekmez. Cüzdan uygun bir ücreti otomatik olarak seçmelidir. Bir cüzdan hâlâ eski sabit ücreti kullanıyorsa veya ZIP 317 geleneksel ücretinin çok altında bir ücret belirlemenize izin veriyorsa, işlem gecikebilir, önceliği düşebilir, bazı düğümler tarafından düşürülebilir veya güvenilir şekilde aktarılamayabilir.

## Takılı Kalan İşlemler İçin Sorun Giderme

Bir Zcash işlemi, yalnızca cüzdanınızda göründüğü için nihai değildir. Bir blok içine madenciliğe alınıp durumunuza göre yeterli onayı aldıktan sonra normal kullanım için nihai hâle gelir. Borsalar ve hizmetler, cüzdanın varsayılan olarak gösterdiğinden daha fazla onay isteyebilir.

Yeniden göndermeden önce şu karar ağacını kullanın:

1. **Cüzdanınız bir işlem kimliği gösteriyor mu?**
   - Hayırsa cüzdan henüz işlemi oluşturmamış veya yayınlamamış olabilir. Senkronizasyon durumunu, internet bağlantısını, cüzdan sürümünü ve cüzdanın verdiği hata mesajlarını kontrol edin.
   - Evetse işlem kimliğini kopyalayın ve devam edin.
2. **İşlem bir blok içinde onaylandı mı?**
   - Evetse cüzdanınızın, borsanın, satıcının veya hizmetin gerektirdiği onay sayısını bekleyin.
   - Hayırsa devam edin.
3. **İşlem son kullanma yüksekliğine ulaştı mı?**
   - Hayırsa aynı ödemeyi henüz elle yeniden göndermeyin. İlk işlem hâlâ onaylanabilir.
   - Evetse işlem bu son kullanma yüksekliğinden sonra madenciliğe alınamaz. Cüzdanınız bunu süresi dolmuş veya başarısız olarak işaretleyebilir ve yeni bir işlem oluşturmanız gerekebilir.
4. **İşlem bir sunucuda veya gezginde görünüyor ama diğerinde görünmüyor mu?**
   - Bunu işlemin başarısız olduğunun kanıtı olarak değil, ağ görünürlüğü sorunu olarak değerlendirin. Farklı düğümlerin mempool görünümleri farklı olabilir.
   - Bekleyin, cüzdanınızı yeniden senkronize edin veya cüzdanınız destekliyorsa başka bir güvenilir sunucuya geçin.
5. **İşlem onaylanmış göründükten sonra kayboldu mu?**
   - Kısa bir zincir yeniden organizasyonu, işlemi geçici olarak en iyi zincirden çıkarabilir.
   - Daha fazla blok bekleyin. İşlem geri gelirse onayları beklemeye devam edin. Geri gelmez ve daha sonra süresi dolarsa yeni bir işlem oluşturun.
6. **Cüzdan sizden yeniden göndermenizi mi istiyor?**
   - Önceki işlemin süresinin dolduğunu, başarısız olduğunu veya artık geçerli olmadığını kontrol ettikten sonra yalnızca cüzdanın güncel yönlendirmesini izleyin.
   - Emin değilseniz yeniden göndermeden önce destek isteyin.

## Beklemede, Süresi Dolmuş, Düşmüş ve Reorg Yaşamış

- **Beklemede**, işlemin oluşturulduğu veya yayınlandığı ancak henüz bir blok içine madenciliğe alınmadığı anlamına gelir.
- **Süresi dolmuş**, işlemin son kullanma yüksekliğinin geçtiği anlamına gelir. ZIP 203 kapsamında, son kullanma yüksekliği olan bir işlem bu yükseklikten sonra madenciliğe alınamaz.
- **Düşmüş**, bir veya daha fazla düğümün artık işlemi mempool'unda tutmadığı anlamına gelir. Bu; sürenin dolması, düşük ücretler, mempool politikası, yeniden başlatma davranışı veya aktarma farklılıkları nedeniyle olabilir.
- **Reorg yaşamış**, daha önce işlemi içeren bir bloğun artık en iyi zincirin parçası olmadığı anlamına gelir. İşlem daha sonra yeniden madenciliğe alınabilir veya hâlâ geçerliyse yeniden bekleme durumuna dönebilir.

## Ne Zaman Yeniden Gönderilmemeli

Bir işlem beklemede diye, yavaş diye veya bir gezginde görünmüyor diye hemen yeniden göndermeyin. Çok erken yeniden göndermek kafa karışıklığına neden olabilir ve cüzdanın yeni ödemeyi nasıl oluşturduğuna bağlı olarak iki kez ödeme yapma riski doğurabilir.

Şu durumlarda önce bekleyin veya destek alın:

- İşlemin bir işlem kimliği varsa ve süresi dolmamışsa.
- Bir sunucu işlemi gösteriyor, diğeri göstermiyorsa.
- İşlem kısa süre önce madenciliğe alındıysa ancak olası bir reorg sonrasında onaylarını kaybettiyse.
- Alıcı hizmet henüz onayları saymayı tamamlamadıysa.
- Cüzdanınız hâlâ senkronize oluyorsa.

Genellikle, ancak cüzdan işlemi açıkça süresi dolmuş veya başarısız olarak işaretledikten sonra ya da destek ekibi ilk işlemin onaylanamayacağını doğruladıktan sonra yeniden göndermek daha güvenlidir.

## Gizlilik Dostu Kontroller

Gereğinden fazla bilgi açığa çıkarmadan temel işlem durumunu kontrol edebilirsiniz:

- Cüzdanınızın tamamen senkronize olup olmadığını kontrol edin.
- Cüzdan uygulamasının güncel olup olmadığını kontrol edin.
- İşlemin bir işlem kimliğine sahip olup olmadığını kontrol edin.
- İşlemin onaylanmış, beklemede, süresi dolmuş veya başarısız durumda olup olmadığını kontrol edin.
- Cüzdanınız gösteriyorsa mevcut blok yüksekliğini kontrol edin ve bunu işlemin son kullanma yüksekliğiyle karşılaştırın.
- Transparent işlemler için, bir blok gezgini herkese açık işlemi, adresleri, tutarları ve onayları gösterebilir.
- Shielded işlemler için, bir blok gezgini işlemin var olduğunu gösterebilir, ancak shielded göndericiyi, alıcıyı, tutarı veya memo ayrıntılarını gösteremez.

## Kamuya Açık Olarak Neler Paylaşılmamalı

Bunları asla herkese açık sohbetlerde, sosyal medyada veya bir issue tracker üzerinde paylaşmayın:

- Seed phrase veya recovery phrase
- Spending key, private key veya cüzdan yedeği
- Full Viewing Key
- Bakiyeleri, tam adresleri, memoları, QR kodlarını veya borsa hesap ayrıntılarını gösteren ekran görüntüleri
- Kişisel kimlik belgeleri veya hesap kurtarma kayıtları

Bir işlem kimliği zincirde herkese açıktır, ancak yine de destek talebinizi kimliğinizle ilişkilendirebilir. Gizlilik önemliyse, bunu yalnızca güvenilir bir destek kanalıyla paylaşın.

## Destek Ekiplerinin İhtiyaç Duyduğu Bilgiler

Cüzdan, borsa veya hizmet desteğinden yardım isterken yalnızca gerekli olan asgari faydalı bilgiyi paylaşın:

- Cüzdanın veya hizmetin adı
- Uygulama sürümü ve işletim sistemi
- İşlemin shielded mi, transparent mı yoksa shielded ve transparent adresler arasında mı olduğu
- Paylaşmakta sakınca görüyorsanız işlem kimliği
- Yaklaşık gönderim zamanı
- Cüzdanın tamamen senkronize olup olmadığı
- Cüzdanın gösterdiği mevcut durum
- Özel veriler çıkarılmış şekilde tam hata mesajı
- Bakiyeler, adresler, memolar ve hesap ayrıntıları gizlenmiş ekran görüntüsü

Destek ekipleri seed phrase'inize, spending key'inize, private key'inize veya Full Viewing Key'inize ihtiyaç duymaz.

## Yaygın Hatalar

- **ZEC listeleyen her cüzdanın onu özel şekilde gönderebildiğini varsaymak.** Bazı çoklu coin cüzdanları yalnızca Zcash'in transparent tarafını destekler. Gizlilik için güvenmeden önce cüzdanın desteklediği havuzları kontrol edin. [Cüzdanlar](https://zechub.wiki/using-zcash/wallets) sayfası bunu her seçenek için listeler.
- **Transparent bir adrese çekim yapıp fonları orada bırakmak.** Çekimin kendisi herkese açıktır ve o adresten sonraki her hareket de herkese açık kalır. Fonlar gelir gelmez onları shield edin.
- **Gizliliği bir kez açılan bir şey gibi görmek.** Her işlem ayrı bir tercihtir. Bugün shielded göndermek, geçen hafta yaptığınız transparent ödemeyi geri almaz.
- **Her şey için aynı transparent adresi yeniden kullanmak.** Transparent faaliyet kalıcı olarak görünür olduğu için, yeniden kullanılan tek bir adres zamanla birbirine bağlı olması gerekmeyen ödemeleri ilişkilendirir.
- **Güncelliğini yitirmiş bir varsayılan ücretle göndermek.** ZIP 317'yi benimsememiş cüzdanlar hâlâ eski sabit ücreti gönderebilir; bu da bir işlemin onaysız şekilde beklemesine neden olabilir.
- **Süresi dolmadan yeniden göndermek.** Bekleyen bir işlem, süresi dolana kadar yine de onaylanabilir. Başka bir ödeme oluşturmadan önce son kullanma durumunu kontrol edin.

## Not

Lütfen, gönderen, alıcı, cüzdan ve hizmetin hepsi desteklediğinde ZEC kullanmanın en güvenli yolunun shielded işlemleri kullanmak olduğunu unutmayın. Bazı cüzdanlar ve borsalar, birden fazla Zcash alıcı türünü tek bir adres içinde birleştirebilen [Unified Address](https://electriccoin.co/blog/unified-addresses-in-zcash-explained/#:~:text=The%20unified%20address%20(UA)%20is,within%20the%20broader%20Zcash%20ecosystem.) desteği sunar.

## Kaynaklar

- [ZIP 203: İşlem Son Kullanımı](https://zips.z.cash/zip-0203)
- [ZIP 317: Orantılı Transfer Ücreti Mekanizması](https://zips.z.cash/zip-0317)
- [Zcash ZIP'leri](https://zips.z.cash/)

## İlgili Sayfalar

- [Cüzdanlar](/using-zcash/wallets) - hangi cüzdanların shielded gönderimi desteklediği ve hangilerinin yalnızca transparent olduğu
- [Shielded Havuzlar](/using-zcash/shielded-pools) - shielded fonlarınızın bulunduğu havuzlar olan Sapling ve Orchard
- [Memolar](/using-zcash/memos) - shielded bir işlemle birlikte taşınabilen şifreli mesajlar
- [Transparent Borsa Adresleri](/using-zcash/transparent-exchange-addresses) - TEX adresleri ve borsaların bunları neden kullandığı
- [Custodial Borsalar](/using-zcash/custodial-exchanges) - hangi borsaların shielded çekimleri desteklediği

## ZEC'ten ZAT'a Dönüştürücü
