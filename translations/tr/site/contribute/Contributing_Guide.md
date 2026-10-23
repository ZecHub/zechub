<a href="https://github.com/zechub/zechub/edit/main/site/contribute/Contributing_Guide.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# ZecHub'ye Katkıda Bulunma

ZecHub, insanların Zcash hakkında bilgi edinmesine yardımcı olur. Bu sayfayı okuyorsanız, katkıda bulunmayı düşündüğünüz için gerçekten çok heyecanlıyız! Yaptığınız her katkı [zechub.wiki](https://www.zechub.wiki/) ve diğer ZecHub sosyal medya hesaplarında yer alacaktır.

### Yeni katkıda bulunanlar

ZecHub hakkında genel bir bakış edinmek için [README](https://github.com/ZecHub/zechub/blob/main/README.md) dosyasını okuyun.


### Başlarken

ZecHub, topluluk katkılarını yönetmek için GitHub kullanır. GitHub konusunda yeniyseniz endişelenmeyin! ZecHub topluluğuna katkıda bulunan biri olarak nasıl yer alabileceğinizi açıklayacağız. Kabul edilen katkılar için korumalı ZEC cinsinden bahşiş ödüyoruz. Ödül miktarları ZEC içinde sabit değildir — [Ödüller nasıl belirlenir](#how-rewards-are-set) bölümüne bakın. Bu kılavuzda; issue açmaktan pull request (PR) oluşturmaya, incelemeden PR'yi birleştirmeye kadar katkı iş akışına genel bakış edineceksiniz.


<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/8eYDTyV39a4"
    title="How to Contribute to ZecHub!"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>


### Sohbete katılın

Öncelikle [topluluk bağlantılarımızdaki](https://zechub.wiki/zcash-community/community-links) sohbete katılın.

### Stil Kılavuzları

ZecHub'ye yapılan her katkı, [ZecHub stil kılavuzuna](https://zechub.wiki/contribute/style-guide) uymalıdır. Buna wiki'ler, dokümanlar ve sosyal medya içerikleri dahildir.

### Katkıda bulunma yolları

ZecHub, Zcash kullanıcıları ve geliştiricileri için destek ve kaynak sağlamayı amaçlayan, topluluk odaklı bir projedir. Haftalık bültenimiz için yazarak, bilgi tabanımıza katkıda bulunarak veya geliştirme projelerinde yardımcı olarak ZecHub'ye dahil olmanın birçok yolu vardır.

Bunlar, ZecHub'nin şu anda kabul ettiği katkı türleridir:

### Ödüller nasıl belirlenir

Bahşişler korumalı ZEC cinsinden ödenir. Aşağıdaki başlıklarda önceden yer alan ZEC sayıları, eski bir ZEC/USD kurundaki geçmiş anlık görüntülerdi. Bunları güncel oranlar olarak değerlendirmeyin.

Bir miktar nasıl seçilir:

1. Çalışmayı [ödül miktarları politikasındaki](https://bounties.zechub.wiki/docs/bounty-amounts) bir USD aralığıyla eşleştirin.
2. Bu aralık içinde bir hedef seçin — otomatik olarak en üst değeri değil.
3. Herkese açık bir ZEC/USD spot fiyatından dönüşüm yapın ve ödül için ZEC girin:

```
zec_to_enter = usd_target / zec_usd_spot
```

4 ondalık basamağa yuvarlayın. Politika dosyası tek doğruluk kaynağıdır. Bu sayfa ile o dosya çelişirse politika geçerlidir.

Ücretli çalışmalar [ZEC Bounties](https://bounties.zechub.wiki/) üzerinde listelenir.

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/Lb5Bvl1GkRQ"
    title="ZecBounties Explained | Earn ZEC by Contributing"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>

Birbirinden farklı üç durum:

1. **Birleştirildi** — PR depoya kabul edildi.
2. **Ödül onaylandı** — bir sponsor veya DAO, bir ödül borçlu olunduğunu ve miktarını kabul eder.
3. **Ödendi** — ZEC korumalı Unified Address adresinize ulaşır.

Bir katkının birleştirilmesi tek başına ödülü onaylamaz. Onaylanmış bir ödül, tamamlanmış ödeme değildir.

#### Geliştirme Çalışması

Zcash ekosisteminin oluşturulmasına yardımcı olan tüm onaylanmış geliştirme çalışmaları. Buna wiki'miz, yeni cüzdanlar veya düşünebileceğiniz herhangi bir uygulama dahil olabilir.

#### Zcash Eğitimleri (video)

Aşağıda örnek bir eğitim bulabilirsiniz:


<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/qz4KzDjkqu8"
    title="WSL Install + Zcashd Compile/Transaction Tutorial"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>

Zcash uygulamaları hakkında eğitimler oluşturup paylaşın ve ödül kazanın. zechub/tutorials için PR gönderin veya videoyu Discord içindeki #video-content kanalına yollayın. Video ölçütlerimizi karşılıyorsa paylaşır ve size bahşiş veririz.

#### ZecHub Wiki - yayımlanan yeni wiki sayfası

Wiki sitemiz, Zcash eğitim materyallerini kolay ve anlaşılır bir formatta sunar. Zcash, canlı bir topluluğa sahip çok gelişmiş bir teknolojidir; bu nedenle oluşturmamız gereken daha fazla dokümantasyon var. Amacımız şu konularda dokümantasyon oluşturmaktır:

```
- Zcash and its related technologies
- ZEC (Zcash currency) Use cases
- New User Guides
- Zcash Community and Ecosystem
- Privacy Ecosystem & Tools
```

Bunlar oldukça geniş alanlardır, dolayısıyla üzerinde çalışılacak çok şey vardır. İlham almak isterseniz mevcut [wiki-docs sitemize](https://zechub.wiki/) göz atın ve nelerin eksik olduğunu görün. Ne yazmak istediğinizi belirledikten sonra değişikliklerinizi yapmaya başlayın ve ZecHub deposuna nasıl PR göndereceğinizi öğrenin. Tüm dokümanlarımız bu depoda oluşturulur ve korunur. Bir wiki sayfası yazarken [ZecHub stil kılavuzunu](https://zechub.wiki/contribute/style-guide) izleyin ve yapısal referans olarak aynı bölümdeki mevcut bir sayfayı kullanın. PR gönderdikten sonra lütfen Discord'un #zechub bölümünde @dismad, @squirrel veya @vito'ya mesaj gönderin; PR'nizi inceleyip siteye eklenmeye hazırsa birleştireceklerdir. Birleştirilirse dokümanı ZecHub web sitesine ekleyeceklerdir. Doküman hazır değilse PR içinde size düzenleme önerilerinde bulunacaklardır.

#### ZecHub Wiki - çevrilmiş wiki sayfası

ZecHub'nin amacı, Zcash topluluğundaki herkesin katkıda bulunabileceği açık kaynaklı bir eğitim merkezi sağlamaktır. Merkezin en büyük başarılarından biri, topluluk üyelerinin ZecHub materyallerini kendi yerel dillerine çevirdiğini görmektir.

Not: ZecHub Global sayfa çeviri oran sınırı haftada 10 sayfadır.

`translations/<locale>/site/` altındaki seçilmiş yerel sayfalar, kaynak karması manifesti aracılığıyla İngilizce kaynaklarıyla karşılaştırılır. Güncelliğini yitirme tespiti, senkronizasyon iş akışı ve korunan terimlerin doğrulanması için [translation/README-sync.md](https://github.com/ZecHub/zechub/blob/main/translation/README-sync.md) dosyasına bakın.

#### ZecHub Wiki - mevcut bir dokümanda düzenleme

Bazen dokümanlardaki bilgilerimiz tam olarak doğru olmayabilir. Sorun değil. Bu yüzden onları açık kaynaklı yapıyoruz! Bir wiki dokümanında değişiklik gerektiren bir şey bulursanız lütfen dokümanın alt bilgisine gidin (GitHub sayfasına bağlantı verir) ve PR aracılığıyla bir değişiklik önerin.

#### ZecHub Wiki - düzeltilen bozuk bağlantı

Bir bağlantının bozuk olduğunu veya önemli bir şeyin yanlış yazıldığını fark ederseniz lütfen dokümanın alt bilgisine gidin (GitHub sayfasına bağlantı verir) ve PR aracılığıyla değişikliği önerin.

#### Bülten - yeni sayı

Ekosistemin haftalık bültenini hazırlıyoruz. Bu, dahil olmanın çok kolay bir yoludur! Bülten her cuma veya cumartesi yayımlanır. Bir bülten yazmak istiyorsanız, haber vermek için Discord içindeki #zecweekly bölümünde @squirrel'a mesaj gönderin.

Bunu yaptıktan sonra [bu deponun bülten bölümüne](/newsletter/newsletterbasics.md) giderek bültenin yeni bir sayısını oluşturmak için pull request gönderebilirsiniz. Lütfen bu [şablonda](/newsletter/newslettertemplate.md) kullanılan biçimi izleyin.

Bunu yaptıktan sonra @squirrel veya (Discord içinde) bültenin yeni sayısının hazır olduğunu görecek, inceleyecek ve ardından depoya birleştirecektir. Birleştirildikten sonra içeriği alıp Substack üzerinden paylaşacaklardır.

#### Bülten - çeviri

Şu anda İspanyolca, Portekizce ve Rusça sayılarımız var. Çevrilmiş sürümler kendi sosyal medya hesaplarında paylaşılır ve ZecHub sosyal medya aracılığıyla bunları elimizden geldiğince yaygınlaştırmaya çalışırız.

Bülteni yerel dilinize çevirmek istiyorsanız, yayını koordine edebilmemiz için hangi kanaldan paylaşacağınızı ve bülteni hangi dilde yayımlayacağınızı bize bildirin.

#### Podcast - ZecHub sosyal medya hesaplarında yayımlanan bölüm

Bir haber programı, podcast, Twitter konuşması veya başka bir video/ses içeriği için fikriniz var mı? Discord içindeki #video-content kanalında bize söyleyin, konuşalım.

Bu tür içeriklerin ödülleri biraz daha büyüktür; bu nedenle harcama onaylanmadan önce ZecHub DAO'suna bir teklif sunulması gerekir.

#### Yaratıcı sosyal medya gönderileri

Sosyal medyamız için yeni ve ilgi çekici içerikler istiyoruz. Kısa videolar, GIF'ler, memler ve diğer yaratıcı gönderiler, [ZecHub stil kılavuzuyla](https://zechub.wiki/contribute/style-guide) eşleştiğinde kabul edilir. Ödül miktarı [ödül miktarları politikasını](https://bounties.zechub.wiki/docs/bounty-amounts) izler.

Bültenimiz ve podcast'imiz için küçük görseller de tasarlayabilirsiniz. Tasarım yeteneğiniz varsa Discord içindeki #design kanalında bize mesaj gönderin.

#### Başka fikirleriniz mi var? Bize bildirin!

Başka bir öneriniz var mı? Discord içindeki #general kanalında bize söyleyin. Bunu tartışabilir ve ZecHub DAO'sunun destekleyip desteklemeyeceğini görebiliriz.

### Bitirmek için

Sektörün en saygın protokollerinden birine katkıda bulunmaya başlamaktan lütfen çekinmeyin. Bu, Zcash'ye dahil olmanın harika bir yoludur. Katkıda bulunma hakkında herhangi bir sorunuz varsa lütfen [Discord](#join-the-conversation) üzerinden bize bildirin.

Teşekkürler!
