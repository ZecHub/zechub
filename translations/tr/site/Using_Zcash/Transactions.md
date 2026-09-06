<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Transactions.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>


# İşlemler

ZEC; arkadaşlara ödeme yapmak, alışveriş yapmak veya bağışta bulunmak gibi çeşitli işlemler için uygun olmasını sağlayan güçlü gizlilik özellikleri sunan, yaygın kullanılan bir dijital varlıktır. Gizliliği ve güvenliği en üst düzeye çıkarmak için Zcash içindeki farklı işlem türlerinin nasıl çalıştığını anlamak önemlidir.

## Kısaca

- Zcash iki tür işlemi destekler: Ayrıntıları gizli tutan **korumalı** işlemler ve bunları herkese açık olarak kaydeden **şeffaf** işlemler.
- Korumalı adresler `u` veya `z` ile başlar. Şeffaf adresler `t` ile başlar ve Bitcoin adreslerine çok benzer şekilde çalışır.
- Her ödemede seçim sizindir. Gizlilik, bir başkasının sizin için belirlediği bir ayar değil, Zcash'in size sunduğu bir seçenektir.
- Bir borsadan para çekmek, insanların gizliliğini en sık kaybettiği durumdur. Borsa yalnızca şeffaf para çekimlerini destekliyorsa, fonlar hesabınıza ulaştığında kendiniz korumalı hâle getirin.
- Ücretler [ZIP 317](https://zips.z.cash/zip-0317) kurallarını izler ve işlemin boyutuyla birlikte artar. Hâlâ eski sabit ücreti gönderen cüzdanların işlemleri gecikebilir.
- Çoğu Zcash işleminin [ZIP 203](https://zips.z.cash/zip-0203) kapsamında bir son kullanma yüksekliği vardır. Bir işlem kazılmadan önce son kullanma yüksekliğine ulaşırsa, bu yükseklikten sonra onaylanamaz ve yeniden gönderilmesi gerekebilir.

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

Korumalı işlemler, ZEC'i korumalı cüzdanınıza aktardığınızda gerçekleşir. Korumalı cüzdan adresiniz `u` veya `z` ile başlar. Korumalı işlemler gönderirken siz ve işlem yaptığınız kişiler, varsayılan olarak herkese açık ödeme ağlarında mümkün olmayan bir gizlilik düzeyini koruyabilirsiniz.

Güncel Zcash ağını ve güncel korumalı havuzları destekleyen bir cüzdan kullandığınızda korumalı işlem göndermek en kolaydır. Gizlilik için bir cüzdana güvenmeden önce korumalı gönderimi, korumalı alımı ve kullanmayı planladığınız havuzu destekleyip desteklemediğini kontrol edin. Bir borsadan ZEC çekerken, borsanın korumalı veya şeffaf para çekimlerini destekleyip desteklemediğini kontrol edin. Yalnızca şeffaf para çekimlerini destekliyorsa, fonlar ulaştıktan sonra onları korumalı işlemleri destekleyen bir cüzdana aktarın.

Fon göndermek ve almak için korumalı işlemleri kullanmak, gizliliği korumanın ve ödeme verilerinin sızması riskini azaltmanın en iyi yoludur.

## Şeffaf İşlemler

Şeffaf işlemler Bitcoin işlemlerine benzer şekilde çalışır. Şeffaf adresler ve şeffaf değerler dâhil olmak üzere işlem ayrıntıları blok zincirinde herkese açıktır. Gizlilik öncelik olduğunda şeffaf işlemlerden kaçınılmalıdır.

Şeffaf adresler, özellikle bir borsa veya hizmet korumalı adresleri desteklemediğinde, bazı durumlarda hâlâ faydalıdır. Şeffaf bir adrese ZEC alırsanız, daha sonra ödeme yapmadan önce onu korumalı hâle getirmeyi düşünün.

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

Şeffaf bir işlem bir kartpostaldır. Postacı onu teslim eder, ancak yolda onu eline alan herkes mesajı okuyabilir, kimin gönderdiğini ve kimin aldığını görebilir.

Korumalı bir işlem ise mühürlü bir zarftır. Posta hizmeti, gerçek ücreti ödenmiş gerçek bir mektubun sistemden geçtiğini yine de doğrular ve hiç kimse böyle bir mektubu taklit edemez veya aynı mektubu iki kez gönderemez. Zarfın içeriği gönderici ile alıcı arasında kalır.

Önemli olan, Zcash'in her ödemede hangisini göndereceğinize karar vermenizi sağlamasıdır.

## Zcash Ücretleri

Zcash, Ethereum tarzı gas birimlerini kullanmaz. Zcash işlem ücretleri ZEC ile ödenir ve genellikle **zatoshi** cinsinden ölçülür. Bir ZEC, 100.000.000 zatoshiye eşittir.

[ZIP 317](https://zips.z.cash/zip-0317), işlem karmaşıklığıyla ölçeklenen geleneksel bir ücret mekanizması tanımlar. Her işlemin eski 1.000-zatoshi sabit ücretini kullanması yerine, geleneksel ücret girdiler, çıktılar ve korumalı eylemler gibi "mantıksal eylemlere" dayanır. Basit işlemler genellikle yaklaşık 10.000 zatoshi ya da 0,0001 ZEC ile başlar; daha karmaşık işlemler ise daha fazlasını gerektirebilir.

Çoğu güncel cüzdanda kullanıcıların ZIP 317 ücretlerini manuel olarak hesaplaması gerekmez. Cüzdan uygun bir ücreti otomatik olarak seçmelidir. Bir cüzdan hâlâ eski sabit ücreti kullanıyorsa veya ZIP 317 geleneksel ücretinin çok altında bir ücret belirlemenize izin veriyorsa işlem gecikebilir, daha düşük önceliğe alınabilir, bazı düğümler tarafından bırakılabilir ya da güvenilir şekilde aktarılamayabilir.

## Takılı Kalan İşlemlerde Sorun Giderme

Bir Zcash işlemi yalnızca cüzdanınızda göründüğü için kesinleşmiş sayılmaz. Bir bloğa kazıldıktan ve durumunuz için yeterli sayıda onay aldıktan sonra olağan kullanım için kesinleşir. Borsalar ve hizmetler, bir cüzdanın varsayılan olarak gösterdiğinden daha fazla onay isteyebilir.

Yeniden göndermeden önce bu karar ağacını kullanın:

1. **Cüzdanınız bir işlem kimliği gösteriyor mu?**
   - Hayırsa cüzdan henüz işlemi oluşturmamış veya yayınlamamış olabilir. Senkronizasyon durumunu, internet bağlantısını, cüzdan sürümünü ve cüzdanın gösterdiği hata mesajlarını kontrol edin.
   - Evetse işlem kimliğini kopyalayın ve devam edin.
2. **İşlem bir blokta onaylandı mı?**
   - Evetse cüzdanınızın, borsanızın, satıcınızın veya hizmetinizin istediği sayıda onayı bekleyin.
   - Hayırsa devam edin.
3. **İşlem son kullanma yüksekliğine ulaştı mı?**
   - Hayırsa aynı ödemeyi henüz manuel olarak yeniden göndermeyin. İlk işlem hâlâ onaylanabilir.
   - Evetse işlem bu son kullanma yüksekliğinden sonra kazılamaz. Cüzdanınız işlemi süresi dolmuş veya başarısız olarak işaretleyebilir ve yeni bir işlem oluşturmanız gerekebilir.
4. **İşlem bir sunucuda veya gezginde görünüyor, ancak diğerinde görünmüyor mu?**
   - Bunu işlemin başarısız olduğunun kanıtı olarak değil, ağ görünürlüğü sorunu olarak değerlendirin. Farklı düğümler farklı mempool görünümlerine sahip olabilir.
   - Bekleyin, cüzdanınızı yeniden senkronize edin veya cüzdanınız destekliyorsa güvenilir başka bir sunucuya geçin.
5. **İşlem onaylanmış göründükten sonra kayboldu mu?**
   - Kısa süreli bir zincir yeniden düzenlemesi, işlemi geçici olarak en iyi zincirden kaldırabilir.
   - Daha fazla blok bekleyin. İşlem geri dönerse onayları beklemeye devam edin. Geri dönmez ve daha sonra süresi dolarsa yeni bir işlem oluşturun.
6. **Cüzdan sizden yeniden göndermenizi mi istiyor?**
   - Önceki işlemin süresinin dolduğunu, başarısız olduğunu veya artık geçerli olmadığını kontrol ettikten sonra yalnızca cüzdanın güncel yönlendirmesini izleyin.
   - Emin değilseniz yeniden göndermeden önce destek ekibine danışın.

## Beklemede, Süresi Dolmuş, Bırakılmış ve Yeniden Düzenlenmiş

- **Beklemede**, işlemin oluşturulduğu veya yayınlandığı ancak henüz bir bloğa kazılmadığı anlamına gelir.
- **Süresi dolmuş**, işlemin son kullanma yüksekliğinin geçtiği anlamına gelir. ZIP 203 kapsamında, son kullanma yüksekliği olan bir işlem bu yükseklikten sonra kazılamaz.
- **Bırakılmış**, bir veya daha fazla düğümün işlemi artık mempool'unda tutmadığı anlamına gelir. Bu; son kullanma, düşük ücretler, mempool politikası, yeniden başlatma davranışı veya aktarma farklılıkları nedeniyle gerçekleşebilir.
- **Yeniden düzenlenmiş**, daha önce işlemi içeren bir bloğun artık en iyi zincirin parçası olmadığı anlamına gelir. İşlem daha sonra yeniden kazılabilir veya hâlâ geçerliyse tekrar bekleme durumuna dönebilir.

## Ne Zaman Yeniden Göndermemelisiniz

Bir işlem beklemede, yavaş veya bir gezginde görünmüyor diye hemen yeniden göndermeyin. Çok erken yeniden göndermek kafa karışıklığına yol açabilir ve cüzdanın yeni ödemeyi oluşturma biçimine bağlı olarak iki kez ödeme yapma riski doğurabilir.

Şu durumlarda önce bekleyin veya destek alın:

- İşlemin bir işlem kimliği varsa ve süresi dolmadıysa.
- Bir sunucu işlemi gösterirken diğeri göstermiyorsa.
- İşlem yakın zamanda kazılmış ancak olası bir yeniden düzenlemenin ardından onaylarını kaybetmişse.
- Alıcı hizmet onayları saymayı henüz bitirmediyse.
- Cüzdanınız hâlâ senkronize oluyorsa.

Genellikle yalnızca cüzdan işlemi açıkça süresi dolmuş veya başarısız olarak işaretledikten ya da destek ekibi ilk işlemin onaylanamayacağını doğruladıktan sonra yeniden göndermek daha güvenlidir.

## Gizliliği Koruyan Kontroller

Gereğinden fazla bilgi açığa çıkarmadan temel işlem durumunu kontrol edebilirsiniz:

- Cüzdanınızın tamamen senkronize olup olmadığını kontrol edin.
- Cüzdan uygulamasının güncel olup olmadığını kontrol edin.
- İşlemin bir işlem kimliği olup olmadığını kontrol edin.
- İşlemin onaylanmış, beklemede, süresi dolmuş veya başarısız olup olmadığını kontrol edin.
- Güncel blok yüksekliğini kontrol edin ve cüzdanınız gösteriyorsa işlem son kullanma yüksekliğiyle karşılaştırın.
- Şeffaf işlemlerde, bir blok gezgini herkese açık işlemi, adresleri, değerleri ve onayları gösterebilir.
- Korumalı işlemlerde, bir blok gezgini işlemin var olduğunu gösterebilir; ancak korumalı gönderici, alıcı, tutar veya not ayrıntılarını gösteremez.

## Herkese Açık Olarak Paylaşmamanız Gerekenler

Bunları asla herkese açık sohbetlerde, sosyal medyada veya bir sorun takip sisteminde paylaşmayın:

- Başlangıç ifadesi veya kurtarma ifadesi
- Harcama anahtarı, özel anahtar veya cüzdan yedeği
- Full Viewing Key
- Bakiyeleri, tam adresleri, notları, QR kodlarını veya borsa hesap ayrıntılarını gösteren ekran görüntüleri
- Kişisel kimlik belgeleri veya hesap kurtarma kayıtları

Bir işlem kimliği zincirde herkese açıktır, ancak destek talebinizi kimliğinizle ilişkilendirebilir. Gizlilik önemliyse bunu yalnızca güvenilir bir destek kanalıyla paylaşın.

## Destek Ekiplerinin İhtiyaç Duydukları

Cüzdan, borsa veya hizmet desteğinden yardım isterken yalnızca gerekli en az bilgiyi paylaşın:

- Cüzdan veya hizmet adı
- Uygulama sürümü ve işletim sistemi
- İşlemin korumalı, şeffaf veya korumalı ve şeffaf adresler arasında olup olmadığı
- Paylaşma konusunda rahatsanız işlem kimliği
- Yaklaşık gönderim zamanı
- Cüzdanın tamamen senkronize olup olmadığı
- Cüzdanın gösterdiği güncel durum
- Özel veriler çıkarılmış hâliyle tam hata mesajı
- Bakiyeler, adresler, notlar ve hesap ayrıntıları gizlenmiş ekran görüntüsü

Destek ekiplerinin başlangıç ifadenize, harcama anahtarınıza, özel anahtarınıza veya Full Viewing Key'inize ihtiyacı yoktur.

## Yaygın Hatalar

- **ZEC listeleyen her cüzdanın onu gizli olarak gönderebileceğini varsaymak.** Bir dizi çoklu para birimi cüzdanı Zcash'in yalnızca şeffaf tarafını destekler. Gizlilik için güvenmeden önce cüzdanın desteklediği havuzları kontrol edin. [Cüzdanlar](https://zechub.wiki/using-zcash/wallets) sayfası bunu her seçenek için listeler.
- **Şeffaf bir adrese para çekip fonları orada bırakmak.** Para çekme işleminin kendisi herkese açıktır ve bu adresten sonraki her hareket de herkese açık kalır. Fonlar ulaştığında onları korumalı hâle getirin.
- **Gizliliği bir kez açtığınız bir şey olarak görmek.** Her işlem ayrı bir tercihtir. Bugün korumalı göndermek, geçen hafta yaptığınız şeffaf ödemeyi geri almaz.
- **Şeffaf bir adresi her şey için yeniden kullanmak.** Şeffaf faaliyet kalıcı olarak görünür olduğundan, yeniden kullanılan tek bir adres zamanla birbirine bağlı olması için hiçbir neden olmayan ödemeleri ilişkilendirir.
- **Güncel olmayan varsayılan ücretle göndermek.** ZIP 317'yi benimsememiş cüzdanlar, bir işlemin onaylanmadan beklemesine neden olabilecek eski sabit ücreti göndermeye devam edebilir.
- **Süre dolmadan yeniden göndermek.** Beklemedeki bir işlem, süresi dolana kadar hâlâ onaylanabilir. Başka bir ödeme oluşturmadan önce son kullanma durumunu kontrol edin.

## Not

Lütfen ZEC kullanmanın en güvenli yolunun, gönderici, alıcı, cüzdan ve hizmetin tümü desteklediğinde korumalı işlemleri kullanmak olduğunu unutmayın. Bazı cüzdanlar ve borsalar, birden fazla Zcash alıcı türünü tek bir adreste birleştirebilen [birleşik adresleri](https://electriccoin.co/blog/unified-addresses-in-zcash-explained/#:~:text=The%20unified%20address%20(UA)%20is,within%20the%20broader%20Zcash%20ecosystem.) destekler.

## Kaynaklar

- [ZIP 203: İşlem Son Kullanımı](https://zips.z.cash/zip-0203)
- [ZIP 317: Orantılı Transfer Ücreti Mekanizması](https://zips.z.cash/zip-0317)
- [Zcash ZIP'leri](https://zips.z.cash/)

## İlgili Sayfalar

- [Cüzdanlar](/using-zcash/wallets) - hangi cüzdanların korumalı gönderimi desteklediği ve hangilerinin yalnızca şeffaf olduğu
- [Korumalı Havuzlar](/using-zcash/shielded-pools) - korumalı fonlarınızın bulunduğu Sapling ve Orchard havuzları
- [Notlar](/using-zcash/memos) - korumalı bir işlemle birlikte iletilebilen şifreli mesajlar
- [Şeffaf Borsa Adresleri](/using-zcash/transparent-exchange-addresses) - TEX adresleri ve borsaların bunları neden kullandığı
- [Saklamalı Borsalar](/using-zcash/custodial-exchanges) - hangi borsaların korumalı para çekimlerini desteklediği

## ZEC'ten ZAT'a Dönüştürücü
