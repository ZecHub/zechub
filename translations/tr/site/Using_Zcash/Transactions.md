<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Transactions.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>


# İşlemler

ZEC, arkadaşlara ödeme yapmak, alışveriş yapmak veya bağışta bulunmak gibi çeşitli işlemler için uygun olmasını sağlayan güçlü gizlilik özellikleri sunan, ödemelerde yaygın olarak kullanılan bir dijital varlıktır. Gizliliği ve güvenliği en üst düzeye çıkarmak için Zcash içindeki farklı işlem türlerinin nasıl çalıştığını anlamak önemlidir.

## Kısaca

- Zcash iki tür işlemi destekler: ayrıntıları gizli tutan **korumalı** işlemler ve bunları herkese açık olarak kaydeden **şeffaf** işlemler.
- Korumalı adresler `u` veya `z` ile başlar. Şeffaf adresler `t` ile başlar ve Bitcoin adresine çok benzer şekilde çalışır.
- Her ödemede seçim sizindir. Gizlilik, Zcash'in size sunduğu bir seçenektir; başkasının sizin için belirlediği bir ayar değildir.
- Bir borsadan para çekmek, insanların gizliliğini en sık kaybettiği yerdir. Borsa yalnızca şeffaf para çekimlerini destekliyorsa, fonlar ulaştıktan sonra onları kendiniz korumalı hâle getirin.
- Ücretler [ZIP 317](https://zips.z.cash/zip-0317) kurallarını izler ve işlemin boyutuyla artar. Eski sabit ücreti göndermeye devam eden cüzdanların işlemleri gecikebilir.
- Çoğu Zcash işleminin [ZIP 203](https://zips.z.cash/zip-0203) kapsamında bir son geçerlilik yüksekliği vardır. Bir işlem madenciliği yapılmadan önce sona ererse, bu son geçerlilik yüksekliğinden sonra onaylanamaz ve yeniden gönderilmesi gerekebilir.

## Korumalı İşlemler

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

Korumalı işlemler, ZEC'i korumalı cüzdanınıza taşıdığınızda gerçekleşir. Korumalı cüzdan adresiniz `u` veya `z` ile başlar. Korumalı işlemler gönderirken siz ve işlem yaptığınız kişiler, varsayılan olarak herkese açık ödeme ağlarında mümkün olmayan bir gizlilik düzeyini koruyabilirsiniz.

Korumalı işlem göndermek, mevcut Zcash ağını ve mevcut korumalı havuzları destekleyen bir cüzdan kullandığınızda en kolaydır. Gizlilik için bir cüzdana güvenmeden önce korumalı gönderimi, korumalı alımı ve kullanmayı planladığınız havuzu destekleyip desteklemediğini kontrol edin. Bir borsadan ZEC çekerken, borsanın korumalı veya şeffaf para çekimlerini destekleyip desteklemediğini kontrol edin. Yalnızca şeffaf para çekimlerini destekliyorsa, fonlar ulaştıktan sonra bunları korumalı işlem yapabilen bir cüzdana taşıyın.

Fon göndermek ve almak için korumalı işlemleri kullanmak, gizliliği korumanın ve ödeme verilerinin sızması riskini azaltmanın en iyi yoludur.

## Şeffaf İşlemler

Şeffaf işlemler Bitcoin işlemlerine benzer şekilde çalışır. Şeffaf adresler ve şeffaf değerler dâhil işlem ayrıntıları blokzincir üzerinde herkese açıktır. Gizliliğin öncelikli olduğu durumlarda şeffaf işlemlerden kaçınılmalıdır.

Şeffaf adresler, özellikle bir borsa veya hizmet korumalı adresleri desteklemediğinde, bazı durumlarda hâlâ yararlıdır. Şeffaf bir adrese ZEC alırsanız, daha sonraki ödemeleri yapmadan önce bunu korumalı hâle getirmeyi düşünün.

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

## Bunu Canlandırmanın Basit Bir Yolu

Şeffaf bir işlem bir kartpostaldır. Postacı onu teslim eder, ancak yol boyunca onu eline alan herkes mesajı okuyabilir, kimin gönderdiğini ve kimin aldığını görebilir.

Korumalı bir işlem mühürlü bir zarftır. Posta hizmeti, gerçek posta ücreti olan gerçek bir mektubun sistemden geçtiğini yine de doğrular ve hiç kimse sahte bir tane oluşturamaz veya aynı mektubu iki kez gönderemez. Zarfın içeriği gönderen ve alıcı arasında kalır.

Önemli olan, Zcash'in hangi işlemi göndereceğinize her ödeme için ayrı ayrı karar vermenizi sağlamasıdır.

## Zcash Ücretleri

Zcash, Ethereum tarzı gas birimleri kullanmaz. Zcash işlem ücretleri ZEC ile ödenir ve genellikle **zatoshis** cinsinden ölçülür. Bir ZEC, 100.000.000 zatoshis'e eşittir.

[ZIP 317](https://zips.z.cash/zip-0317), işlem karmaşıklığıyla ölçeklenen geleneksel bir ücret mekanizması tanımlar. Her işlemin eski 1.000-zatoshi sabit ücretini kullanması yerine, geleneksel ücret girdiler, çıktılar ve korumalı eylemler gibi "mantıksal eylemlere" dayanır. Basit işlemler genellikle yaklaşık 10.000 zatoshis veya 0.0001 ZEC ile başlar; daha karmaşık işlemler ise daha fazlasını gerektirebilir.

Mevcut cüzdanların çoğunda kullanıcıların ZIP 317 ücretlerini manuel olarak hesaplaması gerekmemelidir. Cüzdan uygun bir ücreti otomatik olarak seçmelidir. Bir cüzdan hâlâ eski sabit ücreti kullanıyorsa veya ZIP 317 geleneksel ücretinin çok altında bir ücret belirlemenize izin veriyorsa, işlem gecikebilir, daha düşük öncelik alabilir, bazı düğümler tarafından bırakılabilir veya güvenilir şekilde aktarılamayabilir.

## Takılı Kalan İşlemler İçin Sorun Giderme

Bir Zcash işlemi yalnızca cüzdanınızda göründüğü için kesinleşmiş sayılmaz. Bir bloğa madenciliği yapıldıktan ve durumunuz için yeterli sayıda onay aldıktan sonra normal kullanım için kesinleşir. Borsalar ve hizmetler, bir cüzdanın varsayılan olarak gösterdiğinden daha fazla onay isteyebilir.

Yeniden göndermeden önce bu karar ağacını kullanın:

1. **Cüzdanınız bir işlem kimliği gösteriyor mu?**
   - Hayırsa, cüzdan işlemi henüz oluşturmuş veya yayınlamış olmayabilir. Senkronizasyon durumunu, internet bağlantısını, cüzdan sürümünü ve cüzdan hata mesajlarını kontrol edin.
   - Evetse, işlem kimliğini kopyalayın ve devam edin.
2. **İşlem bir blokta onaylandı mı?**
   - Evetse, cüzdanınızın, borsanızın, satıcınızın veya hizmetinizin gerektirdiği sayıda onayı bekleyin.
   - Hayırsa, devam edin.
3. **İşlem son geçerlilik yüksekliğine ulaştı mı?**
   - Hayırsa, aynı ödemeyi henüz manuel olarak yeniden göndermeyin. Orijinal işlem hâlâ onaylanabilir.
   - Evetse, işlem bu son geçerlilik yüksekliğinden sonra madenciliği yapılamaz. Cüzdanınız işlemi süresi dolmuş veya başarısız olarak işaretleyebilir ve yeni bir işlem oluşturmanız gerekebilir.
4. **İşlem bir sunucuda veya gezginde görünüyor, ancak diğerinde görünmüyor mu?**
   - Bunu işlemin başarısız olduğunun kanıtı olarak değil, bir ağ görünürlüğü sorunu olarak değerlendirin. Farklı düğümlerin farklı mempool görünümleri olabilir.
   - Bekleyin, cüzdanınızı yeniden senkronize edin veya cüzdanınız destekliyorsa başka güvenilir bir sunucuya geçin.
5. **İşlem onaylanmış göründükten sonra kayboldu mu?**
   - Kısa süreli bir zincir yeniden organizasyonu, işlemi geçici olarak en iyi zincirden kaldırabilir.
   - Daha fazla blok bekleyin. İşlem geri dönerse, onayları beklemeye devam edin. Geri dönmez ve daha sonra süresi dolarsa yeni bir işlem oluşturun.
6. **Cüzdan sizden yeniden göndermenizi mi istiyor?**
   - Önceki işlemin süresinin dolduğunu, başarısız olduğunu veya artık geçerli olmadığını kontrol ettikten sonra yalnızca cüzdanın mevcut yönlendirmesini izleyin.
   - Emin değilseniz, yeniden göndermeden önce destek ekibine sorun.

## Beklemede, Süresi Dolmuş, Bırakılmış ve Yeniden Organize Edilmiş

- **Beklemede**, işlemin oluşturulduğu veya yayınlandığı ancak henüz bir bloğa madenciliği yapılmadığı anlamına gelir.
- **Süresi dolmuş**, işlemin son geçerlilik yüksekliğinin geçtiği anlamına gelir. ZIP 203 kapsamında, son geçerlilik yüksekliği olan bir işlem bu yükseklikten sonra madenciliği yapılamaz.
- **Bırakılmış**, bir veya daha fazla düğümün işlemi artık mempool'unda tutmadığı anlamına gelir. Bu; son geçerlilik, düşük ücretler, mempool politikası, yeniden başlatma davranışı veya aktarma farklılıkları nedeniyle gerçekleşebilir.
- **Yeniden organize edilmiş**, daha önce işlemi içeren bir bloğun artık en iyi zincirin parçası olmadığı anlamına gelir. İşlem daha sonra yeniden madenciliği yapılabilir veya hâlâ geçerliyse tekrar bekleme durumuna dönebilir.

## Ne Zaman Yeniden Göndermemeli

Bir işlem beklemede, yavaş veya bir gezginde görünmüyor diye hemen yeniden göndermeyin. Çok erken yeniden göndermek karışıklığa yol açabilir ve cüzdanın yeni ödemeyi nasıl oluşturduğuna bağlı olarak iki kez ödeme riskini doğurabilir.

Şu durumlarda önce bekleyin veya destek alın:

- İşlemin bir işlem kimliği varsa ve süresi dolmamışsa.
- Bir sunucu işlemi gösterirken diğeri göstermiyorsa.
- İşlem yakın zamanda madenciliği yapıldıysa ancak olası bir yeniden organizasyondan sonra onaylarını kaybettiyse.
- Alıcı hizmet henüz onayları saymayı tamamlamadıysa.
- Cüzdanınız hâlâ senkronize oluyorsa.

Genellikle yalnızca cüzdan işlemi açıkça süresi dolmuş veya başarısız olarak işaretledikten ya da destek ekibi orijinal işlemin onaylanamayacağını doğruladıktan sonra yeniden göndermek daha güvenlidir.

## Gizlilik Açısından Güvenli Kontroller

Gereğinden fazla bilgi açığa çıkarmadan temel işlem durumunu kontrol edebilirsiniz:

- Cüzdanınızın tamamen senkronize olup olmadığını kontrol edin.
- Cüzdan uygulamasının güncel olup olmadığını kontrol edin.
- İşlemin bir işlem kimliği olup olmadığını kontrol edin.
- İşlemin onaylanmış, beklemede, süresi dolmuş veya başarısız olup olmadığını kontrol edin.
- Mevcut blok yüksekliğini kontrol edin ve cüzdanınız gösteriyorsa işlem son geçerlilik yüksekliğiyle karşılaştırın.
- Şeffaf işlemler için bir blok gezgini herkese açık işlemi, adresleri, değerleri ve onayları gösterebilir.
- Korumalı işlemler için bir blok gezgini işlemin var olduğunu gösterebilir; ancak korumalı göndereni, alıcıyı, tutarı veya not ayrıntılarını gösteremez.

## Herkese Açık Olarak Paylaşılmaması Gerekenler

Bunları asla herkese açık sohbette, sosyal medyada veya bir sorun takip sisteminde paylaşmayın:

- Seed phrase veya kurtarma ifadesi
- Harcama anahtarı, özel anahtar veya cüzdan yedeği
- Tam görüntüleme anahtarı
- Bakiyeleri, tam adresleri, notları, QR kodlarını veya borsa hesap ayrıntılarını gösteren ekran görüntüleri
- Kişisel kimlik belgeleri veya hesap kurtarma kayıtları

Bir işlem kimliği zincir üzerinde herkese açıktır, ancak destek sorunuzla kimliğiniz arasında bağlantı kurabilir. Gizlilik önemliyse, bunu yalnızca güvenilir bir destek kanalıyla paylaşın.

## Destek Ekiplerinin İhtiyaç Duydukları

Cüzdan, borsa veya hizmet desteğinden yardım isterken yalnızca gerekli en az bilgiyi paylaşın:

- Cüzdan veya hizmet adı
- Uygulama sürümü ve işletim sistemi
- İşlemin korumalı, şeffaf veya korumalı ve şeffaf adresler arasında olup olmadığı
- Paylaşmak konusunda rahatsanız işlem kimliği
- Yaklaşık gönderim zamanı
- Cüzdanın tamamen senkronize olup olmadığı
- Cüzdanın gösterdiği mevcut durum
- Özel veriler çıkarılmış şekilde hata mesajının tamamı
- Bakiyelerin, adreslerin, notların ve hesap ayrıntılarının gizlendiği ekran görüntüsü

Destek ekipleri seed phrase'inize, harcama anahtarınıza, özel anahtarınıza veya tam görüntüleme anahtarınıza ihtiyaç duymaz.

## Yaygın Hatalar

- **ZEC listeleyen her cüzdanın onu gizli olarak gönderebildiğini varsaymak.** Bazı çoklu coin cüzdanları yalnızca Zcash'in şeffaf tarafını destekler. Gizlilik için güvenmeden önce cüzdanın desteklediği havuzları kontrol edin. [Cüzdanlar](https://zechub.wiki/using-zcash/wallets) sayfası bunu her seçenek için listeler.
- **Şeffaf bir adrese para çekmek ve fonları orada bırakmak.** Para çekme işleminin kendisi herkese açıktır ve o adresten sonraki her hareket de herkese açık kalır. Fonlar ulaşır ulaşmaz onları korumalı hâle getirin.
- **Gizliliği bir kez açtığınız bir şey olarak görmek.** Her işlem ayrı bir seçimdir. Bugün korumalı gönderim yapmak, geçen hafta yaptığınız şeffaf ödemeyi geri almaz.
- **Şeffaf bir adresi her şey için yeniden kullanmak.** Şeffaf etkinlik kalıcı olarak görünür olduğundan, yeniden kullanılan tek bir adres zamanla bağlantılı olması için hiçbir neden olmayan ödemeleri birbirine bağlar.
- **Güncel olmayan varsayılan ücretle göndermek.** ZIP 317'yi benimsememiş cüzdanlar hâlâ eski sabit ücreti gönderebilir; bu da bir işlemin onaylanmadan beklemesine neden olabilir.
- **Süresi dolmadan yeniden göndermek.** Beklemedeki bir işlem, süresi dolana kadar hâlâ onaylanabilir. Başka bir ödeme oluşturmadan önce son geçerlilik durumunu kontrol edin.

## Not

Lütfen ZEC kullanmanın en güvenli yolunun, gönderen, alıcı, cüzdan ve hizmetin tümü desteklediğinde korumalı işlemleri kullanmak olduğunu unutmayın. Bazı cüzdanlar ve borsalar, birden fazla Zcash alıcı türünü tek bir adreste birleştirebilen [birleşik adresleri](https://electriccoin.co/blog/unified-addresses-in-zcash-explained/#:~:text=The%20unified%20address%20(UA)%20is,within%20the%20broader%20Zcash%20ecosystem.) destekler.

## Kaynaklar

- [ZIP 203: İşlem Son Geçerliliği](https://zips.z.cash/zip-0203)
- [ZIP 317: Orantılı Transfer Ücreti Mekanizması](https://zips.z.cash/zip-0317)
- [Zcash ZIP'leri](https://zips.z.cash/)

## İlgili Sayfalar

- [Cüzdanlar](/using-zcash/wallets) - hangi cüzdanların korumalı gönderimi desteklediği ve hangilerinin yalnızca şeffaf olduğu
- [Korumalı Havuzlar](/using-zcash/shielded-pools) - korumalı fonlarınızın bulunduğu Sapling ve Orchard havuzları
- [Notlar](/using-zcash/memos) - korumalı bir işlemle birlikte iletilebilen şifreli mesajlar
- [Şeffaf Borsa Adresleri](/using-zcash/transparent-exchange-addresses) - TEX adresleri ve borsaların bunları neden kullandığı
- [Saklamalı Borsalar](/using-zcash/custodial-exchanges) - hangi borsaların korumalı para çekimlerini desteklediği

## ZEC'ten ZAT'a Dönüştürücü
