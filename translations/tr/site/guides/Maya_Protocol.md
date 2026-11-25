<a href="https://github.com/zechub/zechub/edit/main/site/guides/Maya_Protocol.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Sayfayı düzenle"/>
</a>

# Maya Merkeziyetsiz Borsa

> Maya Protocol, paketlenmiş tokenlar, hesap veya KYC olmadan yerel takaslar (örneğin ETH veya BTC'den ZEC'a) için zincirler arası bir DEX'tir.

## Kısaca

* Maya, blokzincirler arasında yerel coin takası yapmanızı sağlar: Bir varlık gönderir, diğerini kendi Zinciri üzerinde alırsınız. Paketlenmiş token yok, hesap yok, KYC yok.
* THORChain'ın bir çatallamasıdır; Cosmos SDK ile oluşturulmuş ve bond sermayesi yatıran düğüm operatörleri tarafından güvence altına alınmıştır (Bond Kanıtı).
* Yerel tokenı $CACAO'dır. Likidite sağlayıcıları takas ücretleri kazanır ve 50 günün ardından Geçici Kayıp Koruması (ILP) kapsamına girer.
* Maya bir arka uçtur: THORWallet, CacaoSwap, Asgardex, Ctrl Wallet veya KeepKey gibi bir ön uç ya da cüzdan aracılığıyla kullanırsınız.
* Eğitim videosu, bu ön uçlardan biri olan LeoDex üzerinde ETH'den ZEC'a takası gösterir.
* Maya, SwapKit aracılığıyla korumalı/birleşik ZEC yatırımlarını destekler (şeffaf değer çıktısı ve korumalı bir memo); böylece bazı ön uçlar ZEC'ı doğrudan birleşik bir adrese gönderebilir. Kullandığınız ön uç ödemeyi şeffaf (t1) bir adrese yapıyorsa, gizlilik için sonrasında cüzdanınızda korumalı hale getirin.
* Maya, yerel ZEC takasları için tek seçenek değildir: THORChain'ın da yerel bir ZEC havuzu vardır.

## Temel Açıklama

Merkezi bir borsa coinlerinizi tutar ve kimliğinizi öğrenmek ister. Maya ise bunun yerine, desteklenen her Zincir üzerinde kasaları kontrol eden bir düğüm ağı kullanır. Coinleri bir Maya kasasına gönderirsiniz, düğümlerin en az üçte ikisi yatırımı onaylar ve karşılık gelen varlık başka bir kasadan hedef Zincir üzerindeki adresinize gönderilir.

Düğüm operatörleri bir bond yatırır; kötü davranmaları durumunda bu bond kesilebilir ve bu da dürüst kalmaları için finansal bir neden oluşturur. Maya, likidite düğümleri ve kendi rezerv tasarımı gibi özellikleri THORChain üzerine ekler ve onun yanında ikinci, bağımsız bir ağ olarak da çalışır.

Aşağıdaki bölümlerde Maya'ın nasıl çalıştığı, Bond Kanıtı, THORChain'dan farkları ve hangi cüzdanların desteklediği ele alınmaktadır.

## Eğitim

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/f1k6xhNfTV8"
    title="LeoDex üzerinde Ethereum'dan Zcash'a nasıl takas yapılır"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>


## Maya Protocol nedir?

Maya, farklı blokzincirler arasında kripto paraların alım satımını mümkün kılan bir [merkeziyetsiz borsa](https://nym.com/blog/what-is-dex) (DEX) sistemidir. Örneğin, varlıkları elinizde tutmadan, herhangi bir merkezi otoriteye veya Müşterini Tanı (KYC) sürecine dahil olmadan Bitcoin blokzincirindeki Bitcoin'i (BTC), Ethereum blokzincirindeki Ethereum ile (ETH) kolayca takas edebilirsiniz.

Maya Protocol, Cosmos Yazılım Geliştirme Kiti (Cosmos SDK) kullanılarak geliştirilmiştir ve Bond Kanıtı (PoB) konsensüs mekanizmasıyla çalışır. Protokol, sisteme sermaye yatıran ve katkıları ile çabalarının karşılığı olarak getiri kazanan “Düğüm Operatörleri” tarafından sürdürülür. Düğümler, kullanıcı takaslarını doğrulayan ve farklı blokzincirlerde belirlenmiş adreslerdeki varlıkları denetleyen yazılımları çalıştıran bilgisayarlardır.

Bir takasın tamamlanması için desteklenen kripto paranın kullanıcının gönderimiyle Maya adreslerinden birine ulaşması, ardından eşdeğer miktarın farklı bir blokzincirdeki Maya adreslerinden diğerinden gönderilmesi gerekir. Bu süreç, özellikle fonların doğru şekilde alındığından emin olmak üzere, düğümlerin en az üçte ikisi tarafından yönetilir ve onaylanır.

Böylece kullanıcılar bir blokzincirde bir tür token gönderip başka bir blokzincirde farklı bir tür token alabilir; tüm bunlar yerel olarak, paketlenmiş token kullanmadan gerçekleşir.

## Bond Kanıtı nedir?

Bond Kanıtı (PoB), düğüm operatörlerinin ağa katılmak için bir bond'u (genellikle ağın yerel tokenı biçiminde) taahhüt etmesi gereken bir konsensüs mekanizmasıdır. Bu bond, düğümlerin dürüst davranmasını ve ağın bütünlüğünü korumasını sağlayan bir tür ekonomik güvenlik işlevi görür. Bir düğüm kötü niyetli davranmaya çalışır veya görevlerini yerine getirmezse bond'unun bir kısmı ceza olarak kesilebilir.

Maya Protocol'da bu mekanizma, düğüm operatörlerinin staking yaptıkları kaynaklardan ekonomik değer üretmeye yardımcı olarak sermaye verimliliğini artırır. Benzer şekilde THORChain'da düğüm operatörleri, ağı güvence altına almak ve katılımcılar arasında iş birliğini sağlamak için RUNE'ı (yerel token) bond olarak yatırır.

## Maya ve THORChain arasındaki farklar

Maya, birkaç yeni özellik ve işlevle donatılmış, harika bir alternatif sunan THORChain çatallamasıdır. En önemli özellikleri şunlardır:

### Likidite Düğümleri

Saf Bond Modeli'ni izlemek yerine Maya, Likidite Düğümleri modeline geçişi değerlendiriyor. Bu sistemde düğümler, likiditeyi doğrudan ağa yatırabilir. Bu yaklaşım, düğüm operatörlerinin önemli bir riskle karşı karşıya olduğu anlamına gelir: Fonları kötüye kullanırlarsa kayba uğrarlar ve bu da güçlü bir caydırıcı etki yaratır. Sonuç olarak düğüm operatörleri, hem likidite sağlayan hem de ağ güvenliğini güçlendiren Likidite Havuzlarından Likidite Birimlerini kullanır.

### Geçici Kayıp Koruması

Likidite sağlayıcılarını (LP'leri), kripto varlıkların fiyatlarındaki sürekli dalgalanmalar nedeniyle likidite sağlarken yaşayabilecekleri geçici kayıplara karşı koruyan bir sistem.
ILP, $CACAO arzının %10'unu (10 milyon $CACAO) elinde tutar ve protokol ücretlerinin %10'u ile sürekli yenilenir. ILP, likidite yatırıldıktan 50 gün sonra etkinleşir ve kapsamı en fazla %100'dür.

ILP kapsamının süresi, ASSET'in ve $CACAO'ın performansına bağlıdır. ASSET daha iyi performans gösterirse 150 gün, $CACAO daha iyi performans gösterirse 450 gün sonra tam kapsama ulaşılır. Tamamen çekim yapıldığında ILP ödenir ve sıfırlanır; kısmi çekimlerden etkilenmez. Ek yüklemelerde ILP sıfırlanır ancak ödeme yapılmaz.

### Farklı bir dağıtım modeli

Likidite Açık Artırması, katılımcılar arasında $CACAO tokenlarını dağıtmak üzere tasarlanmış 21 günlük bir etkinlikti. Etkinlik sırasında kullanıcılar desteklenen varlıkları belirli bir adrese yatırdı. Açık artırma sonunda $CACAO tokenlarının %90'ı katılımcılara likidite katkılarıyla orantılı olarak dağıtılırken, kalan %10'u ILP rezervine ayrıldı. Katılımcılar likidite sağlayıcısı oldu; yatırdıkları varlıklar ve $CACAO tokenları Maya havuzlarına kondu ve böylece üretilen ücretlerden pay kazanmaları sağlandı.

### Rezervleri yönetmenin farklı bir yolu

Maya Protocol'ın başlangıcında mevcut CACAO rezervleri toplam arzın yalnızca %10'u kadardı; bu oran THORChain için %44'tü. Bu rezervler öncelikle Geçici Kayıp Koruması (ILP) için ayrılmıştı. Maya blok emisyonlarına sahip değildir; Protokolün Sahip Olduğu Likidite ve Borç Verme uygulanırsa bunlar, Rezervlerle yakından bütünleşmiş olan THORChain'dakinden farklı bir tasarıma sahip olacaktır.

Farklılıklarına rağmen Maya, mevcut THORChain uygulamasında bulunmayan yeni ağları entegre ederek yedeklilik, genişletme ve doğrulama sunan, THORChain'ı tamamlayıcı bir çözüm olarak da işlev görür.

Ayrıca Maya'ın hedefi, diğer hizmetlerin üzerine inşa edebileceği bir *arka uç* olmaktır; böylece Maya altyapısı üzerinde çok sayıda yeni *ön uç* veya DEX hizmeti geliştirilmesi umulmaktadır.

## Maya Protocol cüzdan entegrasyonu

Bir *arka uç* olarak Maya'ın kullanılabilmesi için farklı kullanıcı arayüzleri ve cüzdanlar tarafından desteklenmesi gerekir.
Maya'ı hâlihazırda destekleyen bazı hizmetlerin listesi şöyledir:

[THORWallet DEX](https://www.thorwallet.org/): Ledger, XDEFI, MetaMask, Keystore

El Dorado: artık çevrimiçi değil; alan adı çözümlenmiyor.

[CacaoSwap](https://cacaoswap.app/): Keystore, MetaMask, XDEFI, Keplr, Leap

[Asgardex](https://www.asgardex.com/): Keystore, Ledger

DefiSpot: artık çevrimiçi değil; alan adı çözümlenmiyor.

[Ctrl Wallet (XDEFI)](https://ctrl.xyz/): Bitcoin, Ethereum, Solana, THORChain, Maya Protocol, TRON ve daha fazlası dahil olmak üzere 30'dan fazla yerel blokzinciri ekosistemi, ayrıca tüm EVM ve Cosmos Zincirlerini destekleyen çok ekosistemli bir gözetimsiz cüzdan.

[KeepKey ](https://keepkey.com/): Dijital varlıkları güvenli şekilde saklamak için bir donanım cüzdanı.
