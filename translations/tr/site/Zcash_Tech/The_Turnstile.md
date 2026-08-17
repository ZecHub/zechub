# Turnike

## Kısaca

- Turnike, her korumalı havuza ne kadar değerin girip çıktığını izleyen halka açık bir muhasebe kuralıdır
- Havuz içindeki işlemler özel kalsa bile, herkesin bir havuzun içine konulandan daha fazlasını dışarı ödemediğini doğrulamasını sağlar
- Bu, ZEC arzını gizli bir hataya karşı korur; çünkü sahte coin'ler sayımı bozmadan bir havuzdan çıkamaz
- Bu, gizliliği zayıflatmadan çalışır; çünkü yalnızca havuz toplamları halka açıktır, tek tek işlemler asla değildir
- Turnike, Orchard'tan Ironwood'a geçişin korumalı arzın sağlam olduğunu kanıtlayabilmesinin nedenidir

<br/>

## Bu kimin için

- Zcash'in özel arzını nasıl güvenilir tuttuğunu anlamak isteyen herkes
- Orchard'tan Ironwood'a geçişi takip eden ve bunun arzın gerçek olduğunu nasıl kanıtladığını merak eden kullanıcılar
- Özel bir para sisteminin yine de nasıl denetlenebileceğini merak eden yeni başlayanlar

<br/>

## Zorluk

Korumalı Zcash, tutarları, gönderenleri ve alıcıları gizler. Gizliliğin amacı budur. Ancak bu zor bir soruyu ortaya çıkarır: Korumalı havuzun içini kimse göremiyorsa, toplam ZEC miktarının doğru olduğunu nasıl bilebilir? Göremediğiniz parayı nasıl denetlersiniz?

Eğer bir hata birinin korumalı bir havuz içinde coin üretmesine izin verseydi, bu sahtecilik dürüst kullanıcıları koruyan aynı gizlilik tarafından gizlenirdi. Bir güvence olmadan bu belirsizlik, tüm arza olan güveni zedelerdi. Bunu çözen güvence turnikedir.

<br/>

## Turnike nedir

Her korumalı havuzu, sayılan tek bir kapısı olan bir oda gibi düşünün. Değer havuza dışarıdan her girdiğinde ya da başka bir yere gitmek üzere havuzdan her çıktığında, bu kapıdan geçer ve herkesin görebileceği şekilde kaydedilir. Odanın içindeki işlemler özel kalır, ama kapıdaki toplam sayaç herkes tarafından görülebilir.

Kural basittir: bir havuz, içine girenden daha fazla değerin dışarı çıkmasına asla izin veremez. Düğümler, bir havuzun bakiyesini sıfırın altına itecek her bloğu reddeder. Bir havuzun içinde olduğuna inanılan miktar her zaman bilinir; çünkü bu sadece içeri giren toplamdan dışarı çıkan toplamın çıkarılmasıdır. Bu halka açık sayaç turnikedir.

<br/>

## Nasıl çalışır

Zcash, tarihi boyunca Sprout, Sapling ve Orchard gibi birkaç korumalı havuza sahip olmuştur. Değer, şeffaf zincir ile bu havuzlar arasında, bazen de havuzların kendi aralarında hareket eder. Turnike bu hareketleri izler:

1. ZEC bir korumalı havuza girdiğinde, miktar o havuzun halka açık bakiyesine eklenir
2. ZEC bir havuzdan çıktığında, miktar çıkarılır
3. Ağ, bir havuzun bakiyesini negatif yapacak, yani şimdiye kadar girenden daha fazlasının çıkmış olduğu her bloğu reddeder
4. Tek tek korumalı işlemler tamamen özel kalır; halka açık olan yalnızca havuz toplamlarıdır

Ağ, Sprout, Sapling, Orchard, yeni Ironwood havuzu ile şeffaf ve lockbox bakiyeleri dahil olmak üzere her değer havuzu için bakiyeyi bu şekilde izler. Bu sayede, bir havuzun tam içeriği gizli olsa bile, dışarı çıkabilecek azami miktar içeri girenle sınırlıdır. Gizli enflasyon dolaşıma kaçamaz.

<br/>

## Değer bakiyesi nasıl kontrol edilir

Kapıdaki sayaç ancak her işlemin, miktarın kendisi gizli kalsa bile, doğru bir miktar taşıdığını kanıtlamaya zorlanması sayesinde güvenilirdir. Her korumalı işlem tek bir dürüst sayı yayımlar: havuza giren ya da havuzdan çıkan net değer; buna değer bakiyesi denir. Pozitif bir değer bakiyesi, fonların havuzdan şeffaf tarafa çıktığı anlamına gelir; negatif olan ise fonların içeri girdiği anlamına gelir. Özel ayrıntılar kapalı kalır, ama bu tek net rakam halka açıktır ve turnikenin topladığı şey de budur.

Akıllıca olan kısım, bir işlemin bu halka açık sayının dürüst olduğunu, arkasındaki özel miktarları açıklamadan nasıl kanıtladığıdır. Mekanizma havuza göre değişir ve turnikenin gerçek işleyişi budur.

İlk Sprout havuzunda her işlem bir JoinSplit kullanır. Bir JoinSplit, iki gizli note harcar ve iki yeni note oluşturur; ayrıca iki halka açık alan taşır: şeffaf taraftan korumalı havuza giren değeri gösteren vpub_old ve havuzdan tekrar şeffaf tarafa çıkan değeri gösteren vpub_new. Her JoinSplit kendi içinde dengeli olmak zorundadır ve sıfır bilgi ispatı, gizli girdiler ile gizli çıktılarının doğru şekilde toplandığını garanti eder. Sprout'un havuz bakiyesi, zincir genelindeki tüm vpub_old toplamından tüm vpub_new toplamının çıkarılmasıyla elde edilen hareketli toplamdır. Bu yüzden Sprout daha sonra faydalı bir örnektir: çünkü değerin havuza girebilmesinin tek yolu vpub_old olduğundan, bunu kapatan tek bir kural havuzu kalıcı olarak mühürleyebilir.

Sapling, Orchard ve Ironwood'da bakiye daha akıllı bir yolla, bağlayıcı imza kullanılarak kanıtlanır. Her transferin tek başına dengelenmesi yerine, tüm işlem her gizli miktarı bir değer taahhüdü kullanarak taahhüt eder. Değer taahhüdü, bir sayı için kapalı bir zarf gibidir; homomorfik Pedersen taahhüdü ile oluşturulur ve özel bir özelliğe sahiptir: zarflar açılmadan toplanıp çıkarılabilir. Ağ, tüm girdi taahhütlerini toplar, tüm çıktı taahhütlerini çıkarır ve sonucu işlemin ilan ettiği tek net rakamla, yani `valueBalance` alanıyla karşılaştırır. Yalnızca gizli miktarları bu halka açık `valueBalance` ile gerçekten uyuşan bir işlem, birleşik taahhütler üzerinde geçerli bir bağlayıcı imza üretebilir. Biri beyan ettiğinden daha fazla değer taşımaya çalışsaydı, taahhütler birbirini tutmazdı, bağlayıcı imza doğrulanmazdı ve işlem reddedilirdi. Ironwood aynı Orchard protokolünü kullanır, bu yüzden aynı şekilde çalışır.

Havuzlar arası transferin güvenli şekilde kontrol edilebilmesini sağlayan şey de budur. Fonlar bir korumalı havuzdan diğerine taşındığında, örneğin Orchard'tan Ironwood'a, işlem muhasebeden miktarları gizleyemez. Her havuzun, kendi ispatlarıyla karşılanması gereken kendi değer bakiyesi vardır: Orchard tarafı bağlayıcı imzası aracılığıyla eşleşen bir çıkışı göstermeli, Ironwood tarafı da kendi mekanizmasıyla buna karşılık gelen girişi göstermelidir. Bir havuzdan çıkan değer ile diğerine giren değer birbirinden bağımsız olarak kanıtlanır; yani havuzlar arası bir hareket aslında tek işlemde gerçekleşen iki turnike geçişidir: biri çıkış, biri giriş. Alttaki miktarlar özel kalsa bile ikisi de halka açık şekilde sayılır.

Yani turnike güvene dayanmaz. Her işlem kendi net etkisini matematiksel olarak kanıtlar, ağ havuz başına bu kanıtlanmış net etkileri toplar ve bir mutabakat kuralı (ZIP 209), bir havuzun bakiyesini negatife indirecek her bloğu reddeder. İşlem düzeyinde ispat, zincir düzeyinde yaptırım.

<br/>

## Neden önemlidir

Turnike, Zcash'e aynı anda üç şey sağlar.

Birincisi, riski bölümlere ayırır. Bir havuzdaki kriptografik bir hata o havuzla sınırlı kalır; çünkü turnike sahte değerin daha geniş arza geçmesini durdurur.

İkincisi, topluluğun arzı sonradan doğrulamasına olanak tanır. Eğer daha sonra bir hata keşfedilirse, turnike kaydı bir havuzdan içeri girenden daha fazla değerin çıkıp çıkmadığını gösterir. Temiz bir kayıt, sahteciliğin kullanılmadığına dair güçlü bir kanıttır.

Üçüncüsü, bunların hepsini yaparken gizliliği korur. Halka açık olan yalnızca havuz düzeyindeki toplamlardır. Bireysel işlemleriniz korumalı kalır. Denetlenebilirlik ve gizlilik bir arada bulunur; bu sıra dışıdır ve Zcash'in sessiz güçlü yanlarından biridir.

<br/>

## Turnike iş başında

Turnike yeni değildir ve Zcash tarihinde kilit anlarda kullanılmıştır.

Zcash, ilk Sprout havuzundan daha yeni Sapling havuzuna doğru geçerken, turnike bu geçişi korudu. Sprout havuzu daha sonra yeni girişler alamayacak şekilde kısıtlandı; bu da kullanıcıları geçiş yapmaya teşvik ederken turnike muhasebeyi dürüst tuttu. Yıllar sonra, Sprout'tan uygunsuz şekilde hiçbir değerin çıkmamış olması, erken dönem kriptografisinin hiçbir zaman başarıyla istismar edilmediğine dair kanıt olarak duruyor.

Aynı tasarım şimdi Orchard'tan Ironwood'a geçişi koruyor. 2026'da Orchard ispat sisteminde bir sağlamlık hatası bulundu ve düzeltildi. Bunun hiç istismar edildiğine dair bir kanıt yok, ancak korumalı faaliyet özel olduğu için kesinlik imkânsızdı. Buna verilen yanıt, eski Orchard havuzunu mühürlemek ve herkesin fonlarını turnike üzerinden düzeltilmiş protokolü kullanan yeni bir havuz olan Ironwood'a taşımasını sağlamaktır. Fonları turnikeden geçirmek, geride kalmış olabilecek varsayımsal sahte coin'lerin peşlerinden gelemeyeceği anlamına gelir ve geçiş tamamlandığında herkes korumalı arzın sağlam olduğunu doğrulayabilir.

<br/>

## Tek yönlü havuz kullanımdan kaldırma

Turnike, arz garantisini hiç bozmadan, eski bir havuzun güvenli şekilde yalnızca tek yönde kullanımdan kaldırılmasını mümkün kılar. Püf noktası, çıkışı açık bırakırken girişi kapatmaktır.

Bunun en net örneği Sprout'tur. Onu kullanımdan kaldırmak için ZIP 211 tek bir mutabakat kuralı ekledi: etkinleşme yüksekliğinden itibaren her JoinSplit'in `vpub_old` alanı sıfır olmak zorundadır. `vpub_old`, değerin Sprout'a girebilmesinin tek yolu olduğundan, onu sıfıra zorlamak artık hiçbir yeni değerin içeri giremeyeceği anlamına gelir; buna karşın değer hâlâ şeffaf tarafa ya da Sapling'e doğru akabilir. Havuz tek yönlü hâle geldi. Sadece boşalabilir, asla dolamaz. Turnike tüm bu süre boyunca saymaya devam eder; böylece bakiye fonlar çıktıkça düşebilir ama asla yükselemez ve asla negatife inemez.

Orchard'tan Ironwood'a geçiş de aynı fikri kullanır. NU6.3 yükseltmesinde Orchard havuzu yeni girişlere kapatılır ve cüzdanlar Orchard fonlarını turnike üzerinden yeni Ironwood havuzuna göndermeye yönlendirilir. Orchard, yalnızca boşalabilen tek yönlü bir havuz hâline gelir. Her çıkış, kanıtlanması gereken bir turnike geçişi olduğundan, Orchard'ta geride kalmış olabilecek varsayımsal sahte değer dürüst fonların ardından sessizce dışarı çıkamaz. Sadece boşalan ve kapısında gözetlenen bir havuzda sıkışıp kalır. Zamanla bu, eski havuzu boşluğa doğru iter ve herkesin dışarı çıkan değerin, dürüstçe içeri giren değerden asla fazla olmadığını doğrulamasını sağlar.

Bu, basit muhasebenin ötesinde, turnikenin neden önemli olduğunun daha derin nedenidir. İster Sprout örneğinde olduğu gibi karmaşıklığı azaltmak için, ister Orchard örneğinde olduğu gibi keşfedilmiş bir hatadan toparlanmak için olsun, Zcash'in bir korumalı havuzu kullanımdan kaldırırken arz hakkında kesintisiz, halka açık ve kanıtlanabilir bir garanti korumasını sağlayan mekanizma budur.

<br/>

## Yaygın yanlış anlamalar

- Turnike işlemlerinizi açığa çıkarmaz. Sadece havuz toplamlarını sayar; kimin kime ne gönderdiğini değil
- Bir sahteciyi adıyla yakalamaz. Bir havuzdan ne kadar çıkabileceğine sınır koyar; arzı koruyan da budur
- Ironwood için yeni icat edilmiş bir şey değildir. Zcash tarihindeki her büyük korumalı havuz geçişini korumuştur
- Halka açık bir havuz toplamı gizliliği zayıflatmaz. Gizlilik, havuzun içindeki ve gizli kalan işlemlerdedir

<br/>

## Kaynaklar

1. [ZIP 209: Zincir Değer Havuzu Bakiyelerinin Aralık Dışı Olmasının Yasaklanması](https://zips.z.cash/zip-0209) - turnikenin arkasındaki mutabakat kuralı
2. [ZIP 211: Sprout Zincir Değer Havuzuna Yeni Değer Eklenmesinin Devre Dışı Bırakılması](https://zips.z.cash/zip-0211) - Sprout havuzunun yeni yatırımlara nasıl kapatıldığı
3. [ZIP 258: NU6.3](https://zips.z.cash/zip-0258) - Ironwood havuzunu tanıtan ve değeri turnike üzerinden yönlendiren yükseltme
4. [Sahteciliğe Karşı Turnike Yaptırımı](https://electriccoin.co/blog/turnstile-enforcement-against-counterfeiting/) - Electric Coin Company tarafından yapılan özgün açıklama
5. [Zcash Protokol Spesifikasyonu](https://zips.z.cash/protocol/protocol.pdf) - tüm ayrıntılar için denge ve bağlayıcı imza bölümlerine bakın
6. [Değer Havuzları, Zebra Book](https://zebra.zfnd.org/dev/rfcs/0012-value-pools.html) - bir düğümün her havuzun değer bakiyesini nasıl izlediği

<br/>

## İlgili sayfalar

- [Korumalı Havuzlar](https://zechub.wiki/using-zcash/shielded-pools) - Zcash korumalı işlemlerinin ayrıntıları nasıl gizli tuttuğu
- [Halo](https://zechub.wiki/zcash-tech/halo) - Orchard havuzunun arkasındaki ispat sistemi
- [Ağ Yükseltmeleri](https://zechub.wiki/start-here/network-upgrades) - Zcash'in yeni korumalı havuzlar gibi değişiklikleri nasıl etkinleştirdiği
