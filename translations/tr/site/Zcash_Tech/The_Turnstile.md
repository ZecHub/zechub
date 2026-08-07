# Turnike

## Kısaca

- Turnike, her shielded pool'a ne kadar değerin girip çıktığını izleyen herkese açık bir muhasebe kuralıdır
- İçindeki işlemler özel kalsa bile, herhangi bir pool'un içine konulandan daha fazlasını dışarı ödemediğini herkesin doğrulamasını sağlar
- Bu, ZEC arzını gizli bir hataya karşı korur; çünkü sahte coin'ler sayımı bozmadan bir pool'dan çıkamaz
- Bu, gizliliği zayıflatmadan çalışır; çünkü herkese açık olan yalnızca pool toplamlarıdır, tek tek işlemler asla değildir
- Turnike, Orchard'dan Ironwood'a geçişin shielded arzın sağlam olduğunu kanıtlayabilmesinin nedenidir

<br/>

## Bu kimler için

- Zcash'in özel arzını nasıl güvenilir tuttuğunu anlamak isteyen herkes
- Orchard'dan Ironwood'a geçişi takip eden ve bunun arzın gerçek olduğunu nasıl kanıtladığını merak eden kullanıcılar
- Özel bir para sisteminin yine de nasıl denetlenebildiğini merak eden yeni başlayanlar

<br/>

## Zorluk

Shielded Zcash, tutarları, gönderenleri ve alıcıları gizler. Amaç da budur. Ancak bu zor bir soruyu ortaya çıkarır: eğer kimse shielded pool'un içini göremiyorsa, toplam ZEC miktarının doğru olduğunu herkes nasıl bilebilir? Göremediğiniz parayı nasıl denetlersiniz?

Eğer bir hata birinin shielded pool içinde coin üretmesine izin verseydi, bu sahtecilik dürüst kullanıcıları koruyan aynı gizlilik tarafından saklanırdı. Bir güvence olmadan bu belirsizlik, toplam arzın tamamına olan güveni sarsardı. Bunu çözen güvence turnikedir.

<br/>

## Turnike nedir

Her shielded pool'u, sayılan tek bir kapısı olan bir oda gibi düşünün. Değer ne zaman dışarıdan pool'a girse ya da oradan başka bir yere çıksa, o kapıdan geçer ve herkese açık biçimde sayılır. Odanın içindeki işlemler özel kalır, ancak kapıdaki kümülatif toplam herkes tarafından görülebilir.

Kural basittir: bir pool, içine girenden daha fazla değerin dışarı çıkmasına asla izin veremez. Node'lar, bir pool'un bakiyesini sıfırın altına itecek her block'u reddeder. Bir pool'un içinde olduğuna inanılan miktar her zaman bilinir, çünkü bu yalnızca içeri giren toplamdan dışarı çıkan toplamın çıkarılmasıyla bulunur. Bu herkese açık sayaç turnikedir.

<br/>

## Nasıl çalışır

Zcash, tarihinde Sprout, Sapling ve Orchard gibi çeşitli shielded pool'lara sahip olmuştur. Değer, transparent chain ile bu pool'lar arasında ve bazen de pool'ların kendi aralarında hareket eder. Turnike bu hareketleri izler:

1. ZEC bir shielded pool'a taşındığında, miktar o pool'un herkese açık bakiyesine eklenir
2. ZEC bir pool'dan çıktığında, miktar çıkarılır
3. Ağ, bir pool'un bakiyesini negatife düşürecek herhangi bir block'u reddeder; bu da şimdiye kadar girenden daha fazlasının çıktığı anlamına gelir
4. Tek tek shielded işlemler tamamen özel kalır, herkese açık olan yalnızca pool toplamlarıdır

Ağ, Sprout, Sapling, Orchard, yeni Ironwood pool'u ile transparent ve lockbox bakiyeleri dahil olmak üzere her value pool için bu şekilde bir bakiye izler. Bu nedenle, bir pool'un tam içeriği gizli olsa bile, ondan çıkabilecek azami miktar içeri girenle sınırlıdır. Gizli enflasyon dolaşıma kaçamaz.

<br/>

## Değer bakiyesi nasıl kontrol edilir

Kapıdaki sayacın güvenilir olmasının tek nedeni, her işlemin gizli kalmasına rağmen doğru bir miktarı taşıdığını kanıtlamak zorunda olmasıdır. Her shielded işlem tek bir dürüst sayı yayımlar: pool'a net olarak ne kadar değer soktuğu ya da pool'dan ne kadar değer çıkardığı; buna value balance denir. Pozitif bir value balance, fonların pool'dan transparent tarafa çıktığı anlamına gelir; negatif olan ise fonların içeri girdiği anlamına gelir. Özel ayrıntılar kapalı kalır, ama bu tek net rakam herkese açıktır ve turnikenin topladığı şey de budur.

Akıllıca olan kısım, bir işlemin bu herkese açık sayının dürüst olduğunu, arkasındaki özel miktarları açığa çıkarmadan nasıl kanıtladığıdır. Mekanizma pool'a göre farklıdır ve turnikenin gerçek çalışma düzeni de budur.

Orijinal Sprout pool'unda her işlem bir JoinSplit kullanır. Bir JoinSplit iki gizli note harcar ve iki yeni note oluşturur; ayrıca iki herkese açık alan taşır: transparent taraftan shielded pool'a giren değeri gösteren vpub_old ve değerin pool'dan transparent tarafa geri çıktığını gösteren vpub_new. Her JoinSplit kendi içinde dengede olmak zorundadır ve zero knowledge proof'u gizli girdilerin ve gizli çıktıların doğru şekilde toplandığını garanti eder. Sprout'un pool bakiyesi, zincir boyunca tüm vpub_old değerleri toplamından tüm vpub_new değerleri toplamının çıkarılmasıdır. Sprout'un daha sonra neden faydalı bir örnek olduğunu açıklayan da budur: çünkü değerin pool'a girebilmesinin tek yolu vpub_old olduğundan, onu kapatan tek bir kural pool'u kalıcı olarak mühürleyebilir.

Sapling, Orchard ve Ironwood'da bakiye daha akıllı bir şekilde, bir binding signature kullanılarak kanıtlanır. Her transferin tek başına dengelenmesi yerine, tüm işlem her gizli miktara bir value commitment kullanarak taahhütte bulunur. Value commitment, bir sayı için kapalı bir zarf gibidir; homomorphic Pedersen commitment ile oluşturulur ve bunun özel bir özelliği vardır: zarflar açılmadan toplanıp çıkarılabilir. Ağ, tüm girdi commitment'larını toplar, tüm çıktı commitment'larını çıkarır ve sonucu işlemin tek beyan edilmiş net rakamı olan valueBalance alanıyla karşılaştırır. Yalnızca gizli miktarları gerçekten bu herkese açık valueBalance ile uyuşan bir işlem, birleştirilmiş commitment'lar üzerinde geçerli bir binding signature üretebilir. Biri beyan ettiğinden daha fazla değer taşımaya çalışırsa commitment'lar tutmaz, binding signature doğrulanmaz ve işlem reddedilir. Ironwood aynı Orchard protokolünü kullanır, dolayısıyla aynı şekilde çalışır.

Pool'lar arası bir transferi kontrol etmeyi güvenli kılan da budur. Fonlar bir shielded pool'dan diğerine geçtiğinde, örneğin Orchard'dan Ironwood'a, işlem muhasebeden miktarları gizleyemez. Her pool'un, kendi proof'ları tarafından karşılanması gereken kendi value balance'ı vardır: Orchard tarafı binding signature aracılığıyla eşleşen bir çıkışı göstermeli, Ironwood tarafı da kendi tarafında buna karşılık gelen girişi göstermelidir. Bir pool'dan çıkan değer ile diğerine giren değer birbirinden bağımsız olarak kanıtlanır; dolayısıyla pool'lar arası bir hareket, gerçekte tek bir işlem içinde gerçekleşen iki turnike geçişidir: biri çıkış, biri giriş. Altta yatan miktarlar özel kalsa bile ikisi de herkese açık şekilde sayılır.

Yani turnike güvene dayanmaz. Her işlem kendi net etkisini matematiksel olarak kanıtlar, ağ bu kanıtlanmış net etkileri pool bazında toplar ve bir uzlaşma kuralı (ZIP 209) bir pool'un bakiyesini negatife düşürecek her block'u reddeder. İşlem seviyesinde kanıt, zincir seviyesinde uygulama.

<br/>

## Neden önemlidir

Turnike, Zcash'e aynı anda üç şey kazandırır.

Birincisi, riski bölmelere ayırır. Bir pool'daki kriptografik bir hata o pool ile sınırlı kalır; çünkü turnike sahte değerin daha geniş arza geçmesini engeller.

İkincisi, topluluğun arzı sonradan doğrulamasını sağlar. Eğer daha sonra bir hata keşfedilirse, turnike kaydı bir pool'dan içeri girenden daha fazla değerin çıkıp çıkmadığını gösterir. Temiz bir kayıt, sahteciliğin kullanılmadığına dair güçlü bir kanıttır.

Üçüncüsü, tüm bunları yaparken gizliliği korur. Herkese açık olan yalnızca pool düzeyindeki toplamlardır. Bireysel işlemleriniz shielded kalır. Denetlenebilirlik ve gizlilik bir arada var olur; bu alışılmadık bir durumdur ve Zcash'in sessiz güçlerinden biridir.

<br/>

## Turnike iş başında

Turnike yeni değildir ve Zcash tarihinde kritik anlarda kullanılmıştır.

Zcash, orijinal Sprout pool'undan daha yeni Sapling pool'una doğru geçerken, turnike bu geçişi korudu. Sprout pool daha sonra yeni girişler alamayacak şekilde kısıtlandı; bu, kullanıcıları geçiş yapmaya teşvik ederken turnike muhasebeyi dürüst tuttu. Yıllar sonra Sprout'tan hiçbir değerin usulsüz şekilde çıkmamış olması, erken dönem kriptografisinin hiçbir zaman başarıyla istismar edilmediğine dair kanıt olarak durmaktadır.

Aynı tasarım şimdi Orchard'dan Ironwood'a geçişi koruyor. 2026'da Orchard proving system içinde bir soundness bug bulundu ve yamandı. Bunun hiç istismar edildiğine dair bir kanıt yok, ancak shielded etkinlik özel olduğu için kesinlik imkânsızdı. Çözüm, eski Orchard pool'unu mühürlemek ve herkesin fonlarını turnikeden geçirerek düzeltilmiş protokolü kullanan yeni bir pool olan Ironwood'a taşımasını sağlamak. Fonları turnikeden geçmeye zorlamak, geride kalmış olabilecek varsayımsal sahte coin'lerin peşlerinden gelemeyeceği anlamına gelir ve göç tamamlandığında herkes shielded arzın sağlam olduğunu doğrulayabilir.

<br/>

## Tek yönlü pool devreden çıkarma

Turnike, eski bir pool'u arz güvencesini hiç bozmadan, yalnızca tek yönde güvenli biçimde devreden çıkarmayı mümkün kılar. Hile, çıkışı açık bırakırken girişi kapatmaktır.

Bunun en net örneği Sprout'tur. Onu devreden çıkarmak için ZIP 211 tek bir uzlaşma kuralı ekledi: etkinleşme yüksekliğinden itibaren her JoinSplit'in vpub_old alanı sıfır olmalıdır. vpub_old, değerin Sprout'a girebilmesinin tek yolu olduğundan, onu sıfıra zorlamak artık hiçbir yeni değerin içeri giremeyeceği anlamına gelir; buna karşılık değer hâlâ transparent tarafa ya da Sapling'e doğru dışarı akabilir. Pool tek yönlü hâle geldi. Sadece boşalabilir, dolamaz. Turnike tüm bu süre boyunca saymaya devam eder; dolayısıyla bakiye fonlar çıktıkça düşebilir ama asla yükselemez ve asla negatife inemez.

Orchard'dan Ironwood'a geçiş de aynı fikri kullanır. NU6.3 yükseltmesinde Orchard pool'u yeni girişlere kapatılır ve wallet'lara Orchard fonlarını turnike üzerinden yeni Ironwood pool'una göndermeleri yönlendirilir. Orchard yalnızca boşalabilen tek yönlü bir pool hâline gelir. Her çıkış, kanıtlanması gereken bir turnike geçişi olduğundan, Orchard'da geride kalmış olabilecek varsayımsal sahte değer dürüst fonların peşinden sessizce dışarı çıkamaz. Sadece boşalan ve kapısı izlenen bir pool'da sıkışıp kalır. Zamanla bu, eski pool'u boşluğa doğru iter ve dışarı çıkan değerin içeri dürüstçe giren değerden asla fazla olmadığını herkesin doğrulamasını sağlar.

Turnikenin basit muhasebenin ötesinde neden önemli olduğunun daha derin sebebi budur. İster Sprout'ta olduğu gibi karmaşıklığı azaltmak için, ister Orchard'da olduğu gibi keşfedilmiş bir hatadan toparlanmak için olsun, Zcash'in bir shielded pool'u devreden çıkarırken arz hakkında kesintisiz, herkese açık ve kanıtlanabilir bir güvenceyi korumasını sağlayan mekanizma budur.

<br/>

## Yaygın yanlış anlamalar

- Turnike işlemlerinizi açığa çıkarmaz. Yalnızca pool toplamlarını sayar, kimin kime ne gönderdiğini değil
- Bir sahtekârı ismiyle yakalamaz. Bir pool'dan ne kadar çıkabileceğine üst sınır koyar; arzı koruyan şey budur
- Ironwood için yeni icat edilmiş bir şey değildir. Zcash tarihindeki her büyük shielded pool geçişini korumuştur
- Herkese açık bir pool toplamı gizliliği zayıflatmaz. Gizlilik, pool içindeki işlemlerdedir ve onlar gizli kalır

<br/>

## Kaynaklar

1. [ZIP 209: Zincir Değer Pool Bakiyelerinin Aralık Dışına Çıkmasını Yasaklama](https://zips.z.cash/zip-0209) - turnikenin arkasındaki uzlaşma kuralı
2. [ZIP 211: Sprout Zincir Değer Pool'una Yeni Değer Eklenmesinin Devre Dışı Bırakılması](https://zips.z.cash/zip-0211) - Sprout pool'unun yeni yatırımlara nasıl kapatıldığı
3. [ZIP 258: NU6.3](https://zips.z.cash/zip-0258) - Ironwood pool'unu tanıtan ve değeri turnike üzerinden yönlendiren yükseltme
4. [Sahteciliğe Karşı Turnike Uygulaması](https://electriccoin.co/blog/turnstile-enforcement-against-counterfeiting/) - Electric Coin Company tarafından yapılan orijinal açıklama
5. [Zcash Protokol Spesifikasyonu](https://zips.z.cash/protocol/protocol.pdf) - tüm ayrıntılar için bakiye ve binding signature bölümlerine bakın
6. [Value Pools, Zebra Book](https://zebra.zfnd.org/dev/rfcs/0012-value-pools.html) - bir node'un her pool'un value balance'ını nasıl izlediği

<br/>

## İlgili sayfalar

- [Shielded Pool'lar](https://zechub.wiki/using-zcash/shielded-pools) - Zcash shielded işlemlerinin ayrıntıları nasıl özel tuttuğu
- [Halo](https://zechub.wiki/zcash-tech/halo) - Orchard pool'unun arkasındaki proof system
- [Ağ Yükseltmeleri](https://zechub.wiki/start-here/network-upgrades) - Zcash'in yeni shielded pool'lar gibi değişiklikleri nasıl etkinleştirdiği
