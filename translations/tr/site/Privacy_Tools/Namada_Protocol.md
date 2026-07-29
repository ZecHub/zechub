[![Sayfayı Düzenle](https://img.shields.io/badge/Edit-blue)](https://github.com/zechub/zechub/edit/main/site/Privacy_Tools/Namada_Protocol.md)

# Namada Protocol

![Namada Logosu](https://i.ibb.co/BZcZHS1/logo.png)


## Namada Nedir?

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/Wg_WtPdBig0"
    title="Zcash Açıklanıyor: Namada-Zcash Stratejik İttifakı"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>

Namada Protocol, zincirler arası varlıklardan bağımsız gizlilik sağlamak üzere tasarlanmış, proof-of-stake uzlaşmasına dayalı bir Katman 1 platformu olarak hizmet verir. Inter-Blockchain Communication (IBC) protokolü aracılığıyla Namada, hızlı kesinlik sunan zincirlerle sorunsuz bir şekilde entegre olur ve akıcı birlikte çalışabilirlik sağlar. Ayrıca Namada, Ethereum ile güvene ihtiyaç duymayan çift yönlü bir köprü kurarak iki ağ arasında güvenli ve güvenilir iletişimi kolaylaştırır.

Namada, Multi-Asset Shielded Pool (MASP) devresinin geliştirilmiş bir yinelemesini uygulayarak gizliliğe öncelik verir. Bu yükseltilmiş sürüm, hem fungible hem de non-fungible tokenlar dahil olmak üzere her tür varlığın, tıpkı Zcash'teki gibi ortak bir shielded set kullanmasını sağlar. Sonuç olarak, Namada üzerinde desteklenen varlıkların aktarımı, içerdiği yüksek gizlilik seviyesi nedeniyle ayırt edilmesi zor hale geldiğinden daha farklı bir nitelik kazanır. Ayrıca, Multi Asset Shielded Pool devresine yapılan son güncelleme, shielded set rewards özelliğini mümkün kılar; bu, gizliliği kamusal bir fayda olarak teşvik etmek için kaynak tahsis eden çığır açıcı bir özellik ya da teşviktir.

## Ethereum Bridge + IBC Uyumlu

Ethereum köprüsünün Namada'ya entegrasyonu, ayrı bir protokole olan ihtiyacı ortadan kaldırır; çünkü bu köprü Namada ekosisteminin ayrılmaz bir parçası haline gelir. Namada içindeki doğrulayıcılar, temel Namada protokolünün yanında köprüyü de çalıştırmakla görevlendirilir. Bu doğrulayıcılar, varlıkların Namada'ya aktarılması söz konusu olduğunda aynı zamanda aktarıcı olarak da görev yapar; böylece ek aktörlerin dahil olmasına gerek kalmaz. Öte yandan, varlıklar Ethereum'a aktarılırken harici taraflar (aktarıcılar olarak bilinir) devreye girer; ancak bunlar köprüyü doğrulama veya güvenliğini sağlama konusunda herhangi bir sorumluluk taşımaz.

![Ethereum Bridge Diyagramı](https://i.ibb.co/wKds5RP/image.jpg)

Namada Protocol ayrıca Inter-Blockchain Communication (IBC) protokolünü destekleyen herhangi bir hızlı kesinlik zinciriyle sorunsuz şekilde bağlantı kurabilme yeteneğine sahiptir. Ethereum ile birlikte çalışabilirlik söz konusu olduğunda, Namada güvene ihtiyaç duymayan biçimde çalışan, özelleşmiş ve güvenli bir Ethereum köprüsü uygular. Bu köprü, tüm köprü bağlantıları için akış kontrolleri uygulayarak ve hatalı Ethereum transferlerini slashing cezalarına yol açabilecek ciddi bir ihlal olarak değerlendirerek güvenliği önceliklendirecek şekilde dikkatle tasarlanmıştır.

## Shielded Set Rewards

[Namada Protocol](https://blog.namada.net/what-is-namada/) üzerindeki son güncellemede, shielded varlıkları elinde tutan kullanıcılar ortak shielded set'e aktif olarak katılmaları için teşvik edilmektedir. Bu, artık yenilikçi Convert Circuit'i de içeren güncellenmiş MASP devresinin entegrasyonu sayesinde mümkün olmaktadır. Namada, bu yeni özellikten yararlanarak kullanıcıları shielded varlıklar tutmaya ve ortak shielded set'e katkıda bulunmaya teşvik eder.

Namada'da shielded set, dışlayıcı olmayan ve rekabet karşıtı bir kamusal fayda olarak kabul edilir. Bu, daha fazla kişinin shielded transferleri kullandıkça her katılımcı için gizlilik güvencelerinin seviyesinin arttığı anlamına gelir. Protokol, tüm kullanıcılar için gizliliği artırmada kolektif benimsemenin ve katılımın önemini kabul eder. Bu nedenle, kullanıcıları shielded varlıklar tutmaya ve ortak shielded set'e katkıda bulunmaya teşvik ederek Namada, daha güçlü ve daha sağlam bir gizlilik ekosistemi oluşturur.

## Shielded Varlık İşlemi

Shielded transferler söz konusu olduğunda, ister bir Ethereum non-fungible token (NFT), ister ATOM, ister NAM olsun, bunlar birbirinden ayırt edilemez. Bu, Zcash Sapling devresinin geliştirilmiş bir sürümü olan MASP (Modified Accumulator Sapling Protocol) tarafından sağlanan gizliliği koruyan özelliklerin tüm varlık türlerine eşit şekilde uygulandığı anlamına gelir. MASP devresi, Namada ekosistemi içindeki tüm varlıkların aynı shielded set'i paylaşmasını sağlar. Bu yaklaşım, gizlilik güvencelerinin tek tek varlıklar arasında parçalanmamasını garanti eder. Belirli bir varlıkla ilişkili işlem hacmi ne olursa olsun, gizlilik koruması tutarlı ve bağımsız kalır.

![Shielded Varlık İşlemi Diyagramı](https://i.ibb.co/7CDmWk6/image-1.png)

Farklı varlıklar arasında shielded set'i birleştirerek Namada, shielded bir transfere dahil olan belirli varlık türünden bağımsız olarak gizliliğin eşit biçimde korunmasını sağlar. Bu yaklaşım, protokol içinde bütüncül bir gizlilik çerçevesini teşvik eder ve Ethereum NFT'leri, ATOM, NAM ve diğer desteklenen varlıkları içeren işlemlerin gizliliğini artırır. Namada ayrıca, yeni zk-SNARKs kullanarak fungible ve non-fungible tokenların özel transferini mümkün kılar ve yerel ile yerel olmayan tokenlar için tıpkı Zcash'te yapıldığı gibi gizlilik sağlar.

## Daha Düşük Ücretler ve Hızlı İşlemler

Namada, hızlı işlem hızı ve kesinlik sağlamak için iki temel unsuru bir araya getirir: hızlı proof üretimi ve modern Byzantine Fault Tolerant (BFT) uzlaşması. Bu iki özellik, Namada'nın yüksek throughput kapasitesiyle tanınan iyi bilinen bir ödeme ağı olan Visa ile karşılaştırılabilir bir işlem işleme hızına ulaşmasını sağlar. Hızlı proof üretimi, Blockchain üzerindeki işlemlerin doğruluğunu ve bütünlüğünü doğrulayan kriptografik proof'ların verimli biçimde üretilmesini ifade eder. Namada Protocol, gelişmiş teknikler ve optimizasyonlar kullanarak bu proof'ları üretmek için gereken hesaplama yükünü en aza indirir; bunun sonucunda işlemlerin doğrulanması ve onaylanması hızlı bir şekilde gerçekleşir.

Buna ek olarak, Namada modern BFT uzlaşma algoritmalarından yararlanır; bunlar ağ genelinde işlemlerin bütünlüğünü ve uzlaşmasını sağlar. Bu uzlaşma mekanizmaları, Namada'nın işlemlerin sırası ve geçerliliği konusunda uzlaşmaya varmasını mümkün kılar ve güçlü bir kesinlik garantisi sunar. Kesinlik sayesinde işlemler geri döndürülemez kabul edilir; bu da double-spending veya işlem geri alma riskini azaltır. Namada, ölçeklenebilirlik çözümleriyle bilinen başka bir protokol olan Anoma'ya benzer bir yaklaşım izler. Namada, ana blockchain içinde iç içe geçmiş zincirlerin oluşturulmasına olanak tanıyan fraktal örnekleri benimser. Bu fraktal yapı, yükü birden fazla örneğe dağıtarak yatay ölçeklemeyi mümkün kılar ve ağın genel kapasitesi ile performansını artırır.

## Namada ve Zcash Stratejik İttifakı

Yakın zamanda yayımlanan ve [Namada Protocol Blog](https://blog.namada.net/rfc-proposal-for-a-strategic-alliance-between-namada-and-zcash/) üzerinde bulunabilecek bir yayına göre, Namada Protocol'ün arkasındaki ekip, Namada ve Zcash varlıkları, zincirleri ve toplulukları arasında stratejik bir ittifak için bir teklif ve request-for-comment (RFC) sunmaktan heyecan duyuyor.

![Namada-Zcash Stratejik İttifak Diyagramı](https://i.ibb.co/FqsmkMb/image-2.png)

Önerilen ittifak üç temel unsuru kapsıyor. İlk olarak, hem Zcash hem de Namada'ya fayda sağlayan projelere finansman sağlamak için bir hibe havuzu oluşturulacak. İkinci olarak, ZEC sahiplerine bir NAM token airdrop'u tahsis edilecek. Son olarak, Zcash ve Namada'yı birbirine bağlayan, güveni en aza indiren bir köprü kurmak için bir plan bulunmaktadır. Bu köprü hayata geçirildiğinde, Zolders olarak anılan ZEC sahipleri ZEC'lerini Namada üzerinde kullanabilecekler. Ayrıca Zolders, Namada aracılığıyla daha geniş Cosmos ve Ethereum ekosistemlerine erişme fırsatına sahip olacaklar. Stratejik ittifak hakkında daha fazla bilgiye [Zcash Topluluk Forumu](https://forum.zcashcommunity.com/t/rfc-proposal-for-a-strategic-alliance-between-namada-and-zcash/44372) üzerinden ulaşabilirsiniz.

## Referans Bağlantıları

- [Namada Protocol Resmi Videosu](https://www.youtube.com/watch?v=Wg_WtPdBig0)
- [Namada Protocol Resmi Web Sitesi](https://namada.net/)
- [Namada Blogu](https://blog.namada.net/)
- [Namada Dokümantasyonu](https://docs.namada.net/)
