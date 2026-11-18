<a href="https://github.com/zechub/zechub/edit/main/site/guides/Maya_Protocol.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Sayfayı Düzenle"/>
</a>

# Maya Merkeziyetsiz Borsa

> Maya Protocol, sarılmış tokenlar, hesap veya KYC gerektirmeden yerel takaslar (örneğin ETH veya BTC'den ZEC'e) yapmayı sağlayan zincirler arası bir DEX'tir.

## Kısaca

* Maya, blok zincirleri arasında yerel coin takası yapar: bir varlık gönderir, diğerini kendi zincirinde alırsınız. Sarılmış token, hesap veya KYC gerekmez.
* THORChain'nın bir çatallanmasıdır; Cosmos SDK ile geliştirilmiştir ve sermaye bağlayan düğüm operatörleri tarafından güvence altına alınır (Bond Kanıtı).
* Yerel tokenı $CACAO'dir. Likidite sağlayıcıları takas ücretlerinden kazanç elde eder ve 50 günün ardından Geçici Olmayan Kayıp Koruması (ILP) kapsamına girer.
* Maya bir arka uçtur: THORWallet, CacaoSwap, Asgardex, Ctrl Wallet veya KeepKey gibi bir ön uç ya da cüzdan aracılığıyla kullanılır.
* Eğitim videosu, bu ön uçlardan biri olan LeoDex üzerinde ETH'den ZEC'e yapılan takası gösteriyor.
* Maya, SwapKit aracılığıyla korumalı/birleşik ZEC yatırma işlemlerini destekler (şeffaf değer çıktısı ile korumalı bir not). Böylece bazı ön uçlar ZEC'i doğrudan birleşik bir adrese gönderebilir. Kullandığınız ön uç ödemeyi şeffaf bir t1 adresine yapıyorsa gizlilik için sonrasında cüzdanınızda korumalı hâle getirin.
* Yerel ZEC takasları için tek seçenek Maya değildir: THORChain'ın da yerel bir ZEC havuzu vardır.

## Temel Açıklama

Merkezi bir borsa coinlerinizi elinde tutar ve kimliğinizi ister. Maya ise desteklenen her zincirdeki kasaları kontrol eden düğümlerden oluşan bir ağ kullanır. Coinlerinizi bir Maya kasasına gönderirsiniz; düğümlerin en az üçte ikisi yatırma işlemini onaylar ve eşdeğer varlık başka bir kasadan hedef zincirdeki adresinize gönderilir.

Düğüm operatörleri, kötü davranmaları hâlinde kesilebilecek bir teminat yatırır; bu da dürüst kalmaları için onlara finansal bir gerekçe sağlar. Maya, THORChain üzerine likidite düğümleri ve kendi rezerv tasarımı gibi özellikler ekler ve onun yanında ikinci, bağımsız bir ağ olarak da çalışır.

Aşağıdaki bölümlerde Maya'ın nasıl çalıştığı, Bond Kanıtı, THORChain'dan farkları ve onu destekleyen cüzdanlar ele alınıyor.

## Eğitim


<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/f1k6xhNfTV8"
    title="Ethereum'dan Zcash'e LeoDex ile Nasıl Takas Yapılır?"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>


## Maya Protocol nedir?

Maya, farklı blok zincirleri arasında kripto para alım satımını sağlayan bir [merkeziyetsiz borsa](https://nym.com/blog/what-is-dex) (DEX) sistemidir. Örneğin, varlıkları elinizde tutmadan veya herhangi bir merkezi otoriteyi ya da Müşterini Tanı (KYC) prosedürünü devreye sokmadan, Bitcoin blok zincirindeki Bitcoin'i (BTC) Ethereum blok zincirindeki Ethereum ile (ETH) kolayca takas edebilirsiniz.

Maya Protocol, Cosmos Yazılım Geliştirme Kiti (Cosmos SDK) kullanılarak geliştirilmiş ve Bond Kanıtı (PoB) mutabakat mekanizmasıyla çalışır. Protokol, sermayelerini sisteme yatıran ve katkı ve çabalarının karşılığında getiri elde eden “Düğüm Operatörleri” tarafından sürdürülür. Düğümler, kullanıcı takaslarını doğrulayan ve farklı blok zincirlerinde belirlenmiş adreslerdeki varlıkları denetleyen yazılımları çalıştıran bilgisayarlardır.

Bir takasın tamamlanması için desteklenen kripto para, kullanıcının gönderdiği şekilde Maya adreslerinden birine ulaşmalıdır. Ardından farklı bir blok zincirindeki Maya adreslerinden birinden eşdeğer miktar gönderilir. Bu süreç, özellikle fonların doğru şekilde ulaştığından emin olmak için düğümlerin en az üçte ikisi tarafından yönetilir ve onaylanır.

Böylece kullanıcılar, sarılmış token kullanmadan, tamamen yerel biçimde bir blok zincirinde bir token türü gönderip başka bir blok zincirinde farklı bir tür alabilir.

## Bond Kanıtı nedir?

Bond Kanıtı (PoB), düğüm operatörlerinin ağa katılmak için bir teminat (genellikle ağın yerel tokenı biçiminde) yatırmasını gerektiren bir mutabakat mekanizmasıdır. Bu teminat ekonomik güvenlik sağlar; düğümlerin dürüst davranmasını ve ağın bütünlüğünü korumasını güvence altına alır. Bir düğüm kötü niyetli davranmaya çalışırsa veya görevlerini yerine getirmezse teminatının bir kısmı ceza olarak kesilebilir.

Maya Protocol'da bu mekanizma, düğüm operatörlerinin stake ettiği kaynaklardan ekonomik değer üretilmesine yardımcı olarak sermaye verimliliğini artırır. Benzer şekilde THORChain'da düğüm operatörleri, ağı güvenceye almak ve katılımcılar arasındaki iş birliğini sağlamak için RUNE (yerel tokenı) teminat olarak yatırır.

## Maya ve THORChain arasındaki farklar

Maya, THORChain'nın çatallanmasıdır; ancak onu güçlü bir alternatif hâline getiren bazı yeni özellikler ve işlevlerle donatılmıştır. En önemlileri şunlardır:

### Likidite Düğümleri

Saf Teminat Modeli'ni izlemek yerine Maya, Likidite Düğümleri modeline geçmeyi değerlendiriyor. Bu sistemde düğümler doğrudan likidite sağlayabilir ve bunu ağa teminat olarak bağlayabilir. Bu yaklaşım, düğüm operatörleri için önemli bir risk doğurur: fonları kötüye kullanırlarsa zarara uğrarlar; bu da güçlü bir caydırıcı etki yaratır. Sonuç olarak düğüm operatörleri, aynı anda likidite sağlayıp ağ güvenliğini güçlendiren Likidite Havuzlarındaki Likidite Birimlerini kullanır.

### Geçici Olmayan Kayıp Koruması

Kripto varlık fiyatlarındaki sürekli dalgalanmalar nedeniyle likidite sağlarken yaşayabilecekleri geçici kayıplara karşı likidite sağlayıcılarını (LP'ler) koruyan bir sistem.
ILP, $CACAO arzının %10'unu (10 milyon $CACAO) elinde tutar ve protokol ücretlerinin %10'u ile sürekli yenilenir. ILP, likidite yatırma işleminden 50 gün sonra etkinleşir ve kapsamı en fazla %100 olabilir.

ILP kapsamının süresi, ASSET'in ve $CACAO'in performansına bağlıdır. ASSET daha iyi performans gösterirse 150 gün sonra, $CACAO daha iyi performans gösterirse 450 gün sonra tam kapsama ulaşılır. Tüm varlık çekildiğinde ILP ödemesi yapılır ve sıfırlanır; kısmi çekimlerden etkilenmez. Ek yatırımlarda ILP sıfırlanır ancak ödeme yapılmaz.

### Farklı bir dağıtım modeli

Likidite Açık Artırması, katılımcılara $CACAO tokenları dağıtmak için tasarlanmış 21 günlük bir etkinlikti. Etkinlik boyunca kullanıcılar desteklenen varlıkları belirli bir adrese yatırdı. Açık artırma sona erdiğinde $CACAO tokenlarının %90'ı likidite katkıları oranında katılımcılara, kalan %10'u ise ILP rezervine tahsis edildi. Katılımcılar likidite sağlayıcısı oldu; yatırdıkları varlıklar ve $CACAO tokenları Maya havuzlarına kondu ve böylece üretilen ücretlerden pay kazanmaları sağlandı.

### Rezervleri yönetmenin farklı bir yolu

Maya Protocol'ın başlangıcında mevcut CACAO rezervleri toplam arzın yalnızca %10'uydu; bu oran THORChain için %44'tü ve rezervler öncelikle Geçici Olmayan Kayıp Koruması (ILP) için ayrılmıştı. Maya blok emisyonlarına sahip değildir. Protokolün Sahip Olduğu Likidite ve Borç Verme uygulamaya konursa, THORChain'da olduğu gibi farklı bir tasarıma sahip olacak; bu özellikler rezervlerle yakından bütünleşecektir.

Yine de Maya, farklılıklarına rağmen yedeklilik, genişletme ve doğrulama sunarak ve mevcut THORChain uygulamasında bulunmayan yeni ağları entegre ederek THORChain'ı tamamlayıcı bir çözüm olarak da işlev görür.

Ayrıca Maya'ın amacı, başka hizmetlerin üzerine inşa edebileceği bir *arka uç* olmaktır. Böylece Maya altyapısı üzerine kurulu çok sayıda yeni *ön uç* veya DEX hizmetinin ortaya çıkması hedeflenir.

## Maya Protocol cüzdan entegrasyonu

Bir *arka uç* olarak Maya'ın kullanılabilmesi için farklı arayüzler ve cüzdanlar tarafından desteklenmesi gerekir.
Maya'ı hâlihazırda destekleyen hizmetlerden bazıları şunlardır:

[THORWallet DEX](https://www.thorwallet.org/): Ledger, XDEFI, MetaMask, Keystore

El Dorado: artık çevrimiçi değil; alan adı çözümlenmiyor.

[CacaoSwap](https://cacaoswap.app/): Keystore, MetaMask, XDEFI, Keplr, Leap

[Asgardex](https://www.asgardex.com/): Keystore, Ledger

DefiSpot: artık çevrimiçi değil; alan adı çözümlenmiyor.

[Ctrl Wallet (XDEFI)](https://ctrl.xyz/): Bitcoin, Ethereum, Solana, THORChain, Maya Protocol, TRON ve daha fazlası dâhil 30'dan fazla yerel blok zincirini, tüm EVM ve Cosmos zincirlerini destekleyen çoklu ekosistemli, kullanıcının kendi varlıklarını sakladığı bir cüzdan.

[KeepKey ](https://keepkey.com/): Dijital varlıkları güvenle saklamak için bir donanım cüzdanı.
