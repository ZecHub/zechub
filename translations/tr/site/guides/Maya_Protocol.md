# Maya Merkeziyetsiz Borsası

---

## Eğitim


<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/f1k6xhNfTV8"
    title="LeoDex üzerinde Ethereum'dan Zcash'e Nasıl Swap Yapılır"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>


## Maya Protocol nedir?

Maya, farklı blokzincirler arasında kripto para alım satımını mümkün kılan bir [merkeziyetsiz borsa](https://nym.com/blog/what-is-dex) (DEX) sistemidir. Örneğin, Bitcoin blokzincirindeki Bitcoin (BTC) ile Ethereum blokzincirindeki Ethereum (ETH) arasında, varlıkları emanet etmeden ve herhangi bir merkezi otorite ya da Müşterini Tanı (KYC) prosedürlerine dahil olmadan, kolay bir şekilde swap yapabilirsiniz.

Maya Protocol, Cosmos Software Development Kit (Cosmos SDK) kullanılarak geliştirilmiştir ve Proof of Bond (PoB) mutabakat mekanizmasıyla çalışır. Protokol, sisteme sermaye stake eden ve katkıları ile çabalarının karşılığında getiri elde eden "Node Operators" tarafından ayakta tutulur. Temelde node’lar, kullanıcı swap’larını doğrulayan ve farklı blokzincirlerde belirlenmiş adreslerdeki varlıkları denetleyen yazılımları çalıştıran bilgisayarlardır.

Bir swap’ı tamamlamak için, desteklenen kripto paranın kullanıcının gönderimiyle Maya'nın adreslerinden birine ulaşması gerekir; ardından farklı bir blokzincirdeki Maya adreslerinden birinden eşdeğer miktar gönderilir. Bu süreç, özellikle fonların düzgün şekilde alındığını teyit etmek için, node’ların en az üçte ikisi tarafından yönetilir ve onaylanır.

Bu şekilde kullanıcılar, bir blokzincirde bir tür token gönderip başka bir blokzincirde farklı bir tür token’ı, wrapped token kullanmadan ve tamamen yerel biçimde alabilirler.

## Proof of Bond nedir?

Proof of Bond (PoB), node operatörlerinin ağa katılabilmek için bir bond (genellikle ağın yerel token’ı biçiminde) taahhüt etmek zorunda olduğu bir mutabakat mekanizmasıdır. Bu bond, ekonomik bir güvenlik biçimi olarak işlev görür ve node’ların dürüst davranmasını, ayrıca ağın bütünlüğünü korumasını sağlar2. Bir node kötü niyetli davranmaya çalışırsa ya da görevlerini yerine getiremezse, bond’u slashing’e uğrayabilir; yani ceza olarak bir kısmı elinden alınabilir.

Maya Protocol’te bu mekanizma, node operatörlerinin stake ettiği kaynaklardan ekonomik değer üretilmesine yardımcı olarak sermaye verimliliğini artırır. Benzer şekilde Thorchain’de node operatörleri, ağı güvence altına almak ve katılımcılar arasındaki iş birliğini sağlamak için RUNE (yerel token) bond eder.

## Maya ve THORChain arasındaki farklar

Maya, THORChain'in bir fork’udur ancak onu güçlü bir alternatif haline getiren birkaç yeni özellik ve işleve sahiptir. En önemlileri şunlardır:

### Liquidity Nodes

Saf Bond Modelini izlemek yerine Maya, Liquidity Nodes modeline geçmeyi değerlendiriyor. Bu sistemde node’lar, likiditeyi doğrudan ağa bağlayarak katkıda bulunabilir. Bu yaklaşım, node operatörlerinin ciddi bir risk üstlenmesi anlamına gelir: fonları kötüye kullanırlarsa kayıp yaşarlar ve bu da güçlü bir caydırıcı unsur olarak işlev görür. Sonuç olarak node operatörleri, aynı anda hem likidite sağlayan hem de ağ güvenliğini güçlendiren Likidite Havuzlarından gelen Liquidity Units kullanır.

### Impermanent Loss Protection

Kripto varlık fiyatlarındaki sürekli dalgalanmalar nedeniyle likidite sağlarken likidite sağlayıcılarının (LPs) yaşayabileceği geçici kayba karşı koruma sunan bir sistemdir.
ILP, $CACAO arzının %10’unu (10 milyon $CACAO) elinde tutar ve protokol ücretlerinin %10’u ile sürekli olarak yenilenir. ILP, bir likidite yatırımı yapıldıktan 50 gün sonra devreye girer ve kapsama oranı en fazla %100’dür.

ILP kapsamının süresi, ASSET ve $CACAO performansına bağlıdır. ASSET daha iyi performans gösterirse 150 gün sonra, $CACAO daha iyi performans gösterirse 450 gün sonra tam kapsama sağlanır. Tam çekim yapıldığında ILP hem ödenir hem de sıfırlanır, ancak kısmi çekimlerden etkilenmez. Eklemelerde ise ILP sıfırlanır fakat ödeme yapılmaz.

### Farklı bir tahsis modeli

Liquidity Auction, $CACAO token’larını katılımcılar arasında dağıtmak için tasarlanmış 21 günlük bir etkinlikti. Etkinlik boyunca kullanıcılar, desteklenen varlıkları belirli bir adrese yatırdı. Açık artırmanın sonunda, $CACAO token’larının %90’ı katılımcılara likidite katkılarıyla orantılı olarak tahsis edilirken, kalan %10 ILP rezervine tahsis edildi. Katılımcılar, yatırdıkları varlıklar ve $CACAO token’ları Maya havuzlarına yerleştirildiği için likidite sağlayıcısı oldular ve üretilen ücretlerden pay kazanabildiler.

### Rezervlerin ele alınışında farklı bir yaklaşım

Maya Protocol’ün genesis anında, mevcut CACAO rezervleri toplam arzın yalnızca %10’uydu; THORChain’de ise bu oran %44’tü ve ağırlıklı olarak Impermanent Loss Protection (ILP) için tasarlanmıştı. Maya'da blok emisyonları yoktur; ayrıca Protocol Owned Liquidity ve Lending uygulanırsa, bunlar farklı bir tasarıma sahip olacaktır, çünkü THORChain’de bu unsurlar Rezervlerle yakından entegredir.

Yine de farklılıklarına rağmen Maya, THORChain için tamamlayıcı bir çözüm olarak da hizmet eder; yedeklilik, genişleme ve doğrulama sunar ve mevcut THORChain uygulamasında bulunmayan yeni ağları entegre eder.

Ayrıca Maya'nın amacı, başka hizmetlerin üzerine inşa edebileceği bir *backend* haline gelmektir; böylece Maya altyapısı üzerine kurulu çok sayıda yeni *frontend* veya DEX hizmeti ortaya çıkması hedeflenmektedir.

## Maya protocol cüzdan entegrasyonu

Bir *backend* olarak çalışan Maya'nın kullanılabilmesi için farklı kullanıcı arayüzleri ve cüzdanlar tarafından desteklenmesi gerekir. 
İşte Maya'yı hâlihazırda destekleyen bazı hizmetlerin listesi:

[Thorwallet DEX](https://www.thorwallet.org/): Ledger, XDEFI, Metamask, Keystore

[El Dorado](https://www.eldorado.market/): XDEFI, Keystore

[CacaoSwap](https://cacaoswap.app/): Keystore, MetaMask, XDEFI, Keplr, Leap

[Asgardex](https://www.asgardex.com/): Keystore, Ledger

[DefiSpot](https://www.defispot.com/t): XDEFI, Metamask, Keplr, Phantom, Walletconnect, Leap Wallet, Argeentx, Braavos, Trustwallet ve Rabby.

[XDEFI](https://www.xdefi.io/): Bitcoin, Ethereum, Solana, THORChain, Maya Protocol, TRON ve daha fazlası dahil olmak üzere 30’dan fazla yerel blokzinciri ile tüm EVM ve Cosmos zincirlerini destekleyen, çok ekosistemli bir self-custody cüzdan.

[KeepKey ](https://keepkey.com/): Dijital varlıkları güvenli bir şekilde saklamak için kullanılan bir donanım cüzdanı.
