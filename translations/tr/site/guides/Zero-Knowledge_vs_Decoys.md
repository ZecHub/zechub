<a href="https://github.com/zechub/zechub/edit/main/site/guides/Zero-Knowledge_vs_Decoys.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Sayfayı Düzenle"/>
</a>

# Sıfır Bilgi ve Yem Tabanlı Sistemler

"Kripto para, banka hesabınıza bağlı bir Twitter gibi olduğu için tüm harcama faaliyetlerinizi kamuya açık hale getirir ve bu, zincir üstü gizliliğin benimsenmesiyle çözülmesi gereken büyük bir sorundur." - Ian Miers, [Devcon4](https://youtube.com/watch?v=9s3EbSKDA3o&feature=share9)'te.

Bazı kripto projeleri, gizlilik odaklı yaklaşımlarıyla tanınmıştır. Zcash, işlem tutarlarını ve adreslerini korumak için Sıfır Bilgi İspatları'nı (ZK) kullanmasıyla bilinir. Monero ise kullanıcı gizliliğini blockchain üzerinde sağlamak için diğer şifreleme yöntemleriyle birlikte Yem tabanlı gönderici gizleme yöntemini kullanmasıyla öne çıkar.


<a href="">
    <img src="https://user-images.githubusercontent.com/38798812/257773807-af8ae27d-0805-4a60-a5ba-749e2fea2490.png" alt="" width="400" height="300"/>
</a>


## ZK İspatları ve Yem Tabanlı Sistemleri Anlamak

Sıfır Bilgi İspatları, bir tarafın (ispatlayıcı), başka bir tarafa (doğrulayıcı) bir ifadenin geçerliliğini, *ifadenin kendisiyle ilgili altta yatan herhangi bir bilgiyi* açıklamadan göstermesine olanak tanıyan kriptografik sistemlerdir. Zcash bağlamında ZK ispatları, bir işlemin geçerliliğini, GÖNDEREN, ALICI veya işlem TUTARI gibi işlem ayrıntılarını ifşa etmeden doğrulamak için kullanılır. 

**Bu, işlem doğrulanırken gizli kalmasını sağlayarak kullanıcı gizliliğinin korunmasını temin eder. Bu teknoloji, Zcash ağı üzerindeki finansal işlemlerin gizliliğini sağlamak üzere tasarlanmıştır.**

[RingCT](https://twitter.com/ZecHub/status/1636473585781948416) gibi Yem tabanlı sistemlerde, birden fazla işlem bir araya getirilir ve bu da fonların gerçek kaynağını ve hedefini izlemeyi zorlaştırır. Algoritma, işlemlere yem girdileri ve çıktıları ekler; ayrıca girdi olarak kullanılan adreslerin şifrelenmesini ve aktarılan miktarın harcanabilir olduğunu doğrulamak için aralık ispatlarını kullanır. 

Bu yaklaşım, işlem izini belirsizleştirir. Yem girdilerinin kullanılması, blockchain'i analiz eden herhangi birinin gerçek göndericiyi, alıcıyı veya işlem tutarını tespit etmesini zorlaştırır. 

**Önemli Not**: Zincir üstü gizliliği koruyan bu işlem yöntemi, yine de tüm kullanıcı işlemlerinin girdilerini açıkça (şifrelenmiş olarak) ortaya koyar. Ağdaki farklı kullanıcılar arasındaki *İŞLEM AKIŞI* gibi meta veriler yine de toplanabilir. Bir saldırgan ağ üzerinde aktif biçimde işlem üretimine katılırsa, bu durum diğer kullanıcıların yem girdilerini fiilen anonimlikten çıkarır. 


## ZK'nın Yem Tabanlı Sistemlere Göre Avantajları

Hem Zcash hem de Monero gizlilik odaklı kripto paralardır, ancak gizliliği farklı şekillerde sağlarlar. 

İşte Zcash'in sıfır bilgi ispatlarının (ZK), Monero'nun yem sistemine göre bazı avantajları:

1) **Seçimli İfşa**: Zcash ZK özellik seti sayesinde kullanıcılar, işlem ayrıntılarını belirli taraflara açıklama seçeneğine sahiptir [Seçimli İfşa hakkında ECC Blogunu okuyun](https://electriccoin.co/blog/viewing-keys-selective-disclosure/). Zcash'te shielded işlemlerin şifrelenmiş içerikleri, kişilerin belirli bir transferden verileri seçmeli olarak ifşa etmesine olanak tanır. Ayrıca, belirli bir shielded adresle ilişkili tüm işlemleri açıklamak için bir Viewing Key sağlanabilir. Bu özellik, ağın genel gizliliğinden ödün vermeden düzenleyici uyumluluk ve denetlenebilirlik sağlar. 

Monero'nun yem algoritması (halka imzası) gizlilik sağlamaya yardımcı olsa da, aynı şekilde *seçimli* ifşa sunmaz.


<a href="">
    <img src="https://user-images.githubusercontent.com/38798812/257793324-2dcc6047-300e-4fa7-a28d-2e6cbbadf1df.png" alt="" width="400" height="80"/>
</a>


2) **İsteğe Bağlı Görünürlük**: Zcash, kullanıcıların transparent (özel olmayan) ve shielded (özel) işlemler arasında seçim yapmasına olanak tanır. Bu, [Zcash resmî web sitesinde](https://z.cash/learn/what-is-the-difference-between-shielded-and-transparent-zcash/) açıklandığı gibi, Zcash'in kullanıcılara finansal bilgilerini gizli tutma (shielded) ya da diğer çoğu blockchain'e benzer şekilde şeffaf ve kamuya açık hale getirme esnekliği sunduğu anlamına gelir. Bu isteğe bağlı gizlilik, bazı işlemler kamusal inceleme için daha az gizlilik gerektirirken diğerleri daha güçlü gizlilikten faydalandığı için, daha fazla esneklik ve iş/kurumsal açıdan ilgili kullanım senaryoları sağlar.


3) **Anonimlik Kümesi**: Sıfır bilgi shielded havuzlarının [anonimlik kümesi](https://blog.wasabiwallet.io/what-is-the-difference-between-an-anonymity-set-and-an-anonymity-score/), şimdiye kadar gerçekleşmiş *tüm* işlemlerden oluşur. Bu, işlem bağlantısızlığını sağlamak için kullanılan diğer çoğu zincir üstü tekniğe kıyasla çok daha büyüktür. Not: bu yalnızca aynı shielded havuz içindeki işlemler için geçerlidir.

Yemlerin kullanılması anonimlik kümesini artırır. Ancak bu yaklaşım tamamen ağdaki *gerçek* kullanıcı sayısına bağlıdır. 

4) **Güvenilir Kurulum Yok**: Zcash'in Sprout ve Sapling kurulumu, "güvenilir kurulum töreni" olarak bilinen çok taraflı bir hesaplama kullanıyordu. Yakın tarihli NU5 yükseltmesi, sıfır bilgi devresinin kurulumunun bütünlüğüne herhangi bir güven gerektirmedi. [NU5 hakkında ECC Blogunu okuyun](https://electriccoin.co/blog/nu5-activates-on-mainnet-eliminating-trusted-setup-and-launching-a-new-era-for-zcash/).

5) **Veri Gizliliği**: Zcash'in shielded havuzlarında kullanılan [zk-SNARK teknolojisi](https://wiki.zechub.xyz/zcash-technology), kullanıcılar için önemli ölçüde artırılmış güvenlik sağlar. Zincir üzerinde meta veri sızıntısının azaltılması, kullanıcıların potansiyel bilgisayar korsanları veya baskıcı devlet kurumları gibi hasımlara karşı güvende olması anlamına gelir. 

Monero'nun yem seçim algoritmasında hataların tespit edildiği çeşitli durumlar olmuştur. [Coindesk](https://coindesk.com/markets/2021/07/27/bug-found-in-decoy-algorithm-for-privacy-coin-monero) tarafından hazırlanan bir rapora göre bu hatalar, kullanıcı harcamalarını ortaya çıkarma potansiyeline sahipti. 


Özetle, gerçekten en önemli olan şey, Zooko'nun [Orchid (priv8) AMA canlı oturumunda](https://youtube.com/watch?v=XpRzKqEfpP4&feature=share9) açıkladığı gibi, kullanıcı bilgileri ve verilerinin sızmasını azaltmak veya ortadan kaldırmaktır. 


<a href="">
    <img src="https://user-images.githubusercontent.com/38798812/257788813-509f1139-7daa-4f95-bbb4-c535641962f6.png" alt="" width="400" height="200"/>
</a>


____

***Referans Bağlantıları***

https://z.cash/learn/

https://www.getmonero.org/get-started/what-is-monero/

https://youtu.be/9s3EbSKDA3o

https://electriccoin.co/blog/nu5-activates-on-mainnet-eliminating-trusted-setup-and-launching-a-new-era-for-zcash/

https://youtu.be/XpRzKqEfpP4

https://electriccoin.co/blog/zcash-evolution/

https://electriccoin.co/zcash-metrics/
https://electriccoin.co/blog/viewing-keys-selective-disclosure/
