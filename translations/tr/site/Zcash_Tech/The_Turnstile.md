# Turnike

## Kısaca

- Turnike, her korumalı havuza ne kadar değerin girdiğini ve havuzdan ne kadar çıktığını izleyen kamusal bir muhasebe kuralıdır
- Havuzun içindeki işlemler özel olsa da herkesin, bir havuzun içine konulandan fazlasını asla ödemediğini doğrulamasını sağlar
- Sahte coinler sayımı bozmadan bir havuzdan çıkamayacağı için bu, ZEC arzını gizli bir hataya karşı korur
- Bir havuzun içindeki ödemeler özel kalır. ZEC’i havuzlar arasında taşıyan bir işlem, taşıdığı miktarı gösterir
- Orchard’den Ironwood’e geçişin korumalı arzın sağlam olduğunu kanıtlayabilmesinin nedeni turnikedir

<br/>

## Kimler için

- Zcash’ın özel arzını nasıl güvenilir tuttuğunu anlamak isteyen herkes
- Orchard’ten Ironwood’ya geçişi takip eden ve arzın gerçek olduğunu nasıl kanıtladığını merak eden kullanıcılar
- Özel bir para sisteminin yine de nasıl denetlenebileceğini merak eden yeni başlayanlar

<br/>

## Zorluk

Korumalı Zcash miktarları, gönderenleri ve alıcıları gizler. Gizlilik de zaten amaçtır. Ancak bu zor bir soruyu gündeme getirir: Korumalı havuzun içini kimse göremiyorsa ZEC toplam miktarının doğru olduğunu nasıl bilebiliriz? Göremediğiniz parayı nasıl denetleyebilirsiniz?

Bir hata, birinin korumalı havuzun içinde coin üretmesine olanak tanırsa bu sahtecilik, dürüst kullanıcıları koruyan aynı gizlilik sayesinde gizli kalır. Bir güvence olmadan bu belirsizlik, arzın tamamına duyulan güveni zedeler. Turnike, bu sorunu çözen güvencedir.

<br/>

## Turnike nedir?

Her korumalı havuzu, sayılan tek bir kapısı olan bir oda gibi düşünün. Değer her havuza dışarıdan girdiğinde veya başka bir yere gitmek üzere havuzdan çıktığında kapıdan geçer ve kamuya açık biçimde kaydedilir. Odanın içindeki işlemler özel kalır, ancak kapıdaki toplam herkes tarafından görülebilir.

Kural basittir: Bir havuz, içine girenden daha fazla değerin dışarı çıkmasına asla izin veremez. Düğümler, bir havuzun bakiyesini sıfırın altına düşürecek her bloğu reddeder. Bir havuzun içinde olduğuna inanılan miktar her zaman bilinir; çünkü bu, havuza giren toplam değerden çıkan toplam değerin çıkarılmasıyla bulunur. Bu kamusal sayım turnikedir.

<br/>

## Nasıl çalışır?

Zcash, geçmişi boyunca Sprout, Sapling ve Orchard gibi çeşitli korumalı havuzlara sahip olmuştur. Değer, şeffaf Zincir ile bu havuzlar arasında ve bazen havuzların kendi aralarında hareket eder. Turnike bu hareketleri izler:

1. ZEC korumalı bir havuza girdiğinde, miktar o havuzun kamusal bakiyesine eklenir
2. ZEC bir havuzdan çıktığında, miktar havuzun bakiyesinden düşülür
3. Ağ, bir havuzun bakiyesini negatife düşürecek, yani havuza giren miktardan daha fazlasının çıktığı her bloğu reddeder
4. Her işlem, bir havuza giren veya havuzdan çıkan net akışı, yani değer bakiyesini gösterir. Tek bir havuz içindeki bir ödeme için bu yalnızca ücrettir

Ağ, Sprout, Sapling, Orchard, yeni Ironwood havuzu ile şeffaf ve kilitli kasa bakiyeleri de dahil olmak üzere her değer havuzunun bakiyesini bu şekilde izler. Böylece, bir havuzun içeriği tam olarak gizli olsa bile havuzdan çıkabilecek azami miktar, içine giren miktarla sınırlıdır. Gizli enflasyon dolaşıma karışamaz.

<br/>

## Değer bakiyesi nasıl denetlenir?

Kapıdaki sayım ancak her işlem, miktarın kendisi gizli kalsa bile, taşıdığı miktarın doğru olduğunu kanıtlamak zorunda olduğu için güvenilirdir. Her korumalı işlem, havuza giren veya havuzdan çıkan net değeri gösteren tek bir doğru sayı yayımlar; buna değer bakiyesi denir. Pozitif değer bakiyesi, fonların havuzdan şeffaf tarafa çıktığı; negatif değer bakiyesi ise fonların havuza girdiği anlamına gelir. Özel ayrıntılar gizli kalır, ancak bu tek net değer kamuya açıktır ve turnikenin topladığı değer de budur.

İşlemin, arkasındaki özel miktarları açığa çıkarmadan bu kamusal sayının doğru olduğunu nasıl kanıtladığı işin ustaca tarafıdır. Mekanizma havuza göre değişir ve turnikenin asıl işleyişi de budur.

Orijinal Sprout havuzunda her işlem bir JoinSplit kullanır. Bir JoinSplit, iki gizli note harcar ve iki yeni note oluşturur; ayrıca iki kamusal alan taşır: şeffaf taraftan korumalı havuza giren değeri belirten vpub_old ve havuzdan şeffaf tarafa çıkan değeri belirten vpub_new. Her JoinSplit kendi içinde dengeli olmalıdır ve sıfır bilgi kanıtı, gizli girdilerle gizli çıktıların doğru biçimde toplandığını garanti eder. Sprout havuzunun bakiyesi, Zincir boyunca tüm vpub_old değerlerinin toplamından tüm vpub_new değerlerinin toplamının çıkarılmasıyla elde edilen toplamdır. Bu nedenle Sprout daha sonra yararlı bir örnek oluşturur: vpub_old havuza değer girmesinin tek yolu olduğundan, onu devre dışı bırakan tek bir kural havuzu kalıcı olarak kapatabilir.

Sapling, Orchard ve Ironwood’de bakiye, imza bağlama (binding signature) yöntemiyle daha akıllıca kanıtlanır. Her aktarımın tek başına dengelenmesi yerine işlemin tamamı, her gizli miktara bir değer taahhüdü kullanarak taahhüt eder. Değer taahhüdü, homomorfik bir Pedersen taahhüdüyle oluşturulan ve bir sayıyı içeren mühürlü bir zarftır. Özel bir özelliği vardır: Zarflar açılmadan toplanıp çıkarılabilir. Ağ, tüm girdi taahhütlerini toplar, tüm çıktı taahhütlerini çıkarır ve sonucu işlemin beyan ettiği tek net değer olan valueBalance alanıyla karşılaştırır. Yalnızca gizli miktarları gerçekten bu kamusal valueBalance değeriyle eşleşen bir işlem, birleştirilmiş taahhütler üzerinde geçerli bir imza bağlama üretebilir. Birisi beyan ettiğinden daha fazla değer taşımaya çalışırsa taahhütler eşleşmez, imza bağlama doğrulanmaz ve işlem reddedilir. Ironwood aynı Orchard protokolünü kullanır; dolayısıyla aynı şekilde çalışır.

Bu mekanizma, havuzlar arası bir aktarımın güvenli biçimde denetlenmesini de sağlar. Fonlar bir korumalı havuzdan diğerine, örneğin Orchard’dan Ironwood’e taşındığında işlem, miktarları muhasebeden gizleyemez. Her havuzun, kendi kanıtlarıyla karşılanması gereken ayrı bir değer bakiyesi vardır: Orchard tarafı imza bağlama yoluyla buna uygun bir çıkış göstermeli, Ironwood tarafı ise kendi imza bağlamasıyla buna karşılık gelen girişi göstermelidir. Bir havuzdan çıkan değerle diğer havuza giren değer ayrı ayrı kanıtlanır. Bu nedenle havuzlar arası bir aktarım, tek bir işlem içinde gerçekleşen iki turnike geçişidir: biri çıkış, diğeri giriş. Temelindeki miktarlar özel kalsa da ikisi de kamuya açık biçimde kaydedilir.

Dolayısıyla turnike güvene dayanmaz. Her işlem kendi net etkisini matematiksel olarak kanıtlar, ağ kanıtlanmış bu net etkileri her havuz için toplar ve bir konsensüs kuralı olan ZIP 209, bir havuzun bakiyesini negatife düşürecek her bloğu reddeder. İşlem düzeyinde kanıt, Zincir düzeyinde uygulama.

<br/>

## Neden önemli?

Turnike Zcash’a aynı anda üç şey sağlar.

İlk olarak riski bölümlere ayırır. Bir havuzdaki kriptografik hata o havuzla sınırlı kalır; çünkü turnike, sahte değerin daha geniş arza geçmesini durdurur.

İkinci olarak topluluğun arzı geçmişe dönük olarak doğrulamasını sağlar. Bir hata sonradan keşfedilirse turnike kaydı, bir havuzdan girenden daha fazla değerin çıkıp çıkmadığını gösterir. Temiz bir kayıt, sahteciliğin istismar edilmediğine dair güçlü bir kanıttır.

Üçüncü olarak, tüm bunları yaparken bir havuz içindeki ödemelerin gizliliğini korur. Her işlem, bir havuza giren veya havuzdan çıkan net akışı yayımlar. Tek bir havuz içindeki bir ödeme için bu yalnızca ücrettir. Orchard’dan Ironwood’ya yapılan gibi havuzlar arasındaki bir aktarım, geçiş yapan miktarı gösterir. Denetlenebilirlik ve gizlilik bir arada bulunur. Bu alışılmadık bir durumdur ve Zcash’ın sessiz güçlü yanlarından biridir.

<br/>

## Turnike iş başında

Turnike yeni değildir ve Zcash tarihinde önemli anlarda kullanılmıştır.

Zcash, orijinal Sprout havuzundan daha yeni Sapling havuzuna geçerken turnike bu geçişi korudu. Sprout havuzuna sonradan yeni girişler kısıtlandı; bu, kullanıcıları geçiş yapmaya teşvik ederken turnike muhasebenin doğruluğunu korudu. Yıllar sonra, hiçbir değerin uygunsuz biçimde Sprout’dan çıkmamış olması, ilk dönem kriptografisinin hiçbir zaman başarıyla istismar edilmediğinin kanıtı olarak duruyor.

Aynı tasarım şimdi Orchard’ten Ironwood’ya geçişi koruyor. 2026’da Orchard kanıtlama sisteminde bir sağlamlık hatası bulundu ve düzeltildi. Hatanın istismar edildiğine dair bir kanıt yok; ancak korumalı etkinlik özel olduğundan kesinlik mümkün değildi. Çözüm, eski Orchard havuzunu kapatmak ve herkesin fonlarını turnikeden geçirerek düzeltilmiş protokolü kullanan yeni bir havuz olan Ironwood’e taşımasını sağlamaktır. Fonları turnikeden geçirmek, varsayımsal sahte coinlerin geride kalıp peşlerinden gelemeyeceği anlamına gelir. Geçiş tamamlandığında herkes korumalı arzın sağlam olduğunu doğrulayabilir.

<br/>

## Havuzun tek yönlü kullanımdan kaldırılması

Turnike, eski bir havuzu arz güvencesini hiçbir zaman bozmadan ve yalnızca tek yönde güvenli biçimde kullanımdan kaldırmayı mümkün kılar. Püf noktası, çıkışı açık bırakırken girişi kapatmaktır.

Sprout bunun en açık örneğidir. Kullanımdan kaldırmak için ZIP 211, etkinleştirme yüksekliğinden itibaren her JoinSplit’nin vpub_old alanının sıfır olmasını gerektiren tek bir konsensüs kuralı ekledi; vpub_old, Sprout’a değer girmenin tek yolu olduğundan, bu alanı sıfıra zorlamak yeni değerin bir daha havuza giremeyeceği; ancak değerin şeffaf tarafa veya Sapling’a doğru akmaya devam edebileceği anlamına gelir. Havuz tek yönlü hale geldi. Yalnızca boşalabilir, dolamaz. Turnike tüm süreç boyunca saymaya devam eder; bu yüzden fonlar çıktıkça bakiye azalabilir, ancak asla yükselemez ve negatife düşemez.

Orchard’ten Ironwood’ya geçişte de aynı fikir kullanılır. NU6.3 yükseltmesinde Orchard havuzu yeni girişlere kapatılır ve cüzdanlar Orchard fonlarını turnikeden geçirerek yeni Ironwood havuzuna göndermeye yönlendirilir. Orchard yalnızca boşalabilen tek yönlü bir havuz haline gelir. Her çıkışın kanıtlanması gereken bir turnike geçişi olması sayesinde Orchard’da kalmış olabilecek varsayımsal sahte değer, dürüst fonlarla birlikte fark edilmeden çıkamaz. Yalnızca boşalan ve kapısında izlenen bir havuzda sıkışıp kalır. Zamanla bu, eski havuzun boşalmasını sağlar ve herkesin, çıkan değerin dürüstçe giren değerden asla fazla olmadığını doğrulamasına olanak tanır.

Turnikenin basit muhasebenin ötesinde önemli olmasının temel nedeni budur. Zcash’ın korumalı bir havuzu, Sprout’te olduğu gibi karmaşıklığı azaltmak veya Orchard’te olduğu gibi keşfedilmiş bir hatadan kurtulmak amacıyla kullanımdan kaldırmasını sağlarken arz hakkında kesintisiz, kamusal ve kanıtlanabilir bir güvenceyi koruyan mekanizmadır.

<br/>

## Yaygın yanlış anlamalar

- Turnike kimin kime ne gönderdiğini açığa çıkarmaz. ZEC’i havuzlar arasında taşıyan herhangi bir işlemin miktarını gösterir
- Bir sahteciyi adıyla tespit etmez. Bir havuzdan çıkabilecek miktarı sınırlar ve arzı koruyan da budur
- Ironwood için yeni bir icat değildir. Zcash tarihinde korumalı havuzlar arasındaki her büyük geçişi korumuştur
- Kamusal havuz toplamı, havuz içindeki ödemelerin gizliliğini zayıflatmaz. ZEC’i havuzlar arasında taşımak taşınan miktarı gösterir. Bu nedenle ZIP 318, cüzdanlardan zaman içinde standart miktarlarda geçiş yapmalarını ister

<br/>

## Kaynaklar

1. [ZIP 209: Zincir Değer Havuzu Bakiyelerinin İzin Verilen Aralık Dışına Çıkmasını Yasaklama](https://zips.z.cash/zip-0209) - turnikenin arkasındaki konsensüs kuralı
2. [ZIP 211: Sprout Zincir Değer Havuzuna Yeni Değer Eklenmesini Devre Dışı Bırakma](https://zips.z.cash/zip-0211) - Sprout havuzunun yeni yatırımlara nasıl kapatıldığı
3. [ZIP 258: NU6.3](https://zips.z.cash/zip-0258) - Ironwood havuzunu kullanıma sunan ve değeri turnikeden geçiren yükseltme
4. [Sahteciliğe Karşı Turnike Uygulaması](https://electriccoin.co/blog/turnstile-enforcement-against-counterfeiting/) - Electric Coin Company tarafından hazırlanan ilk açıklama
5. [Zcash Protokol Spesifikasyonu](https://zips.z.cash/protocol/protocol.pdf) - tüm ayrıntılar için bakiye ve imza bağlama bölümlerine bakın
6. [Değer Havuzları, Zebra Kitabı](https://zebra.zfnd.org/dev/rfcs/0012-value-pools.html) - bir düğümün her havuzun değer bakiyesini nasıl izlediği

<br/>

## İlgili sayfalar

- [Korumalı Havuzlar](https://zechub.wiki/using-zcash/shielded-pools) - Zcash korumalı işlemlerinin ayrıntıları nasıl gizli tuttuğu
- [Halo](https://zechub.wiki/zcash-tech/halo) - Orchard havuzunun arkasındaki kanıt sistemi
- [Ağ Yükseltmeleri](https://zechub.wiki/start-here/network-upgrades) - Zcash yeni korumalı havuzlar gibi değişiklikleri nasıl etkinleştirir
