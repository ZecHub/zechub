<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Halo.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Sayfayı Düzenle"/>
</a>

# Halo


## Halo nedir?

Halo, Electric Coin Co.'da Sean Bowe tarafından keşfedilen güven gerektirmeyen, özyinelemeli bir sıfır bilgi kanıtıdır (ZKP). Güvenilir kurulum gereksinimini ortadan kaldırır ve Zcash blokzincirinin daha büyük ölçekte ölçeklenmesini sağlar. Halo, hem verimli hem de özyinelemeli olan ilk sıfır bilgi kanıt sistemiydi ve bilimsel bir atılım olarak geniş çapta kabul görür.

![halo](https://electriccoin.co/wp-content/uploads/2021/01/Halo-on-Z-1440x720.png "halo")


**Bileşenler**

Özlü Polinom Taahhüt Şeması: Taahhütte bulunan kişinin, bir doğrulayıcının taahhüt edilmiş polinomun iddia edilen değerlendirmelerini doğrulamak için kullanabileceği kısa bir dizeyle bir polinoma taahhütte bulunmasına olanak tanır.

Polinom Etkileşimli Oracle Kanıtı: Doğrulayıcı, ispatlayıcıdan (algoritma) polinom taahhüt şemasını kullanarak seçtiği çeşitli noktalarda tüm taahhütleri açmasını ister ve aralarındaki özdeşliğin doğru olduğunu kontrol eder. 


### Güvenilir Kurulum Yok

zkSNARK'lar, ispatlama ve doğrulama için ortak referans dizisine (CRS) kamu parametresi olarak dayanır. Bu CRS, önceden güvenilir bir tarafça oluşturulmalıdır. Yakın zamana kadar, bu [güvenilir kurulum töreni](https://zkproof.org/2021/06/30/setup-ceremonies/amp/) sırasında ortaya çıkan riski azaltmak için Aztec network ve Zcash tarafından gerçekleştirilenler gibi ayrıntılı güvenli çok taraflı hesaplamalar (MPC) gerekliydi. 

Daha önce Zcash'in Sprout ve Sapling shielded pool'ları BCTV14 ve Groth 16 zk-ispat sistemlerini kullanıyordu. Bunlar güvenli olsa da bazı sınırlamalar vardı. Tek bir uygulamaya bağlı oldukları için ölçeklenebilir değillerdi, "toxic waste" (genesis töreni sırasında üretilen kriptografik materyalin kalıntıları) varlığını sürdürebiliyordu ve kullanıcıların töreni kabul edilebilir bulması için bir güven unsuru (çok küçük de olsa) söz konusuydu.

Zor problemlerin birden fazla örneğini eliptik eğri döngüleri üzerinde tekrar tekrar bir araya getirerek, hesaplamalı kanıtların kendileri hakkında verimli şekilde akıl yürütmek için kullanılabilmesi sayesinde (Nested amortization) güvenilir kuruluma olan ihtiyaç ortadan kalkar. Bu aynı zamanda yapılandırılmış referans dizisinin (tören çıktısı) yükseltilebilir olduğu anlamına gelir ve akıllı sözleşmeler gibi uygulamaları mümkün kılar.

Halo, kullanıcılara büyük ölçekli sıfır bilgi kanıt sisteminin güvenliği konusunda iki önemli güvence sunar. İlk olarak, genesis törenine katılan hiç kimsenin sahte işlemler gerçekleştirmek için gizli bir arka kapı oluşturmadığını kullanıcıların kanıtlamasını sağlar. İkinci olarak ise, sistem güncellemeler ve değişiklikler geçirse bile zaman içinde güvenli kaldığını göstermelerine olanak tanır.

[Dystopia Labs'ta Sean Bowe açıklaması](https://www.youtube.com/watch?v=KdkVTEHUxgo) 
 


### Özyinelemeli Kanıtlar

Özyinelemeli kanıt bileşimi, tek bir kanıtın pratik olarak sınırsız sayıdaki diğer kanıtın doğruluğunu tasdik etmesine olanak tanır; böylece büyük miktarda hesaplama (ve bilgi) sıkıştırılabilir. Bu, ölçeklenebilirlik için temel bir bileşendir; özellikle de ağın geri kalanının bütünlüğüne güvenmeye devam ederken ağın yatay olarak ölçeklenmesine imkân tanıdığı için.

Halo'dan önce, özyinelemeli kanıt bileşimini gerçekleştirmek büyük hesaplama maliyeti ve güvenilir kurulum gerektiriyordu. Başlıca keşiflerden biri **nested amortization** adı verilen bir teknikti. Bu teknik, iç çarpım argümanına dayalı polinom taahhüt şeması kullanılarak özyinelemeli bileşime olanak tanır; performansı ciddi ölçüde iyileştirir ve güvenilir kurulum gereksinimini ortadan kaldırır.

[Halo makalesinde](https://eprint.iacr.org/2019/1021.pdf), bu polinom taahhüt şemasını tam olarak açıkladık ve bunun içinde yeni bir toplulaştırma tekniğinin bulunduğunu keşfettik. Bu teknik, bağımsız olarak oluşturulmuş çok sayıda kanıtın neredeyse tek bir kanıtı doğrulama hızında doğrulanmasına olanak tanır. Bu bile tek başına Zcash'te kullanılan önceki zk-SNARK'lara daha iyi bir alternatif sunardı.


### Halo 2

Halo 2, Rust ile yazılmış yüksek performanslı bir zk-SNARK uygulamasıdır; güvenilir kurulum ihtiyacını ortadan kaldırırken Zcash'te ölçeklenebilirliğin de zeminini hazırlar. 

<a href="">
    <img src="https://electriccoin.co/wp-content/uploads/2020/09/Halo-puzzle-03-1024x517.jpg" alt="" width="500" height="300"/>
</a>

Buna **accumulation scheme** adı verilen yaklaşımımızın bir genellemesi de dahildir. Bu yeni biçimselleştirme, nested amortization tekniğimizin gerçekte nasıl çalıştığını ortaya koyar; kanıtları **accumulator** adı verilen bir nesneye ekleyerek ve kanıtların accumulator'ün önceki durumu hakkında akıl yürütmesini sağlayarak, yalnızca accumulator'ün mevcut durumunu kontrol ederek önceki tüm kanıtların doğru olduğunu (tümevarım yoluyla) kontrol edebiliriz.

<a href="">
    <img src="https://i.imgur.com/l4HrYgE.png" alt="" width="500" height="300"/>
</a>



Buna paralel olarak, başka birçok ekip de Sonic'ten (Halo 1'de kullanılır) daha verimli yeni Polynomial IOP'ler keşfediyordu; örneğin Marlin. 

Bu yeni protokoller arasında en verimlisi PLONK'tur; uygulamaya özgü ihtiyaçlara dayalı verimli uygulamalar tasarlamada büyük esneklik sağlar ve Sonic'e kıyasla 5 kat daha iyi ispatlayıcı süresi sunar.

[PLONK'a genel bakış](https://www.youtube.com/watch?v=P1JeN30RdwQ)


### Bu Zcash'e nasıl fayda sağlar?

Orchard Shielded pool, NU5 ile etkinleştirildi ve bu yeni kanıt sisteminin Zcash Network üzerindeki uygulamasıdır. Eski shielded pool'ların kademeli olarak kullanımdan kaldırılması amacıyla Sprout ve Sapling arasında kullanılanla aynı turnike tasarımıyla korunur. Bu, tamamen güven gerektirmeyen bir kanıt sistemine geçişi teşvik eder, para arzının sağlamlığına olan güveni pekiştirir ve genel olarak Zcash'in uygulama karmaşıklığını ve saldırı yüzeyini azaltır. 2022 ortasında NU5 etkinleştirildikten sonra özyinelemeli kanıtların entegrasyonu mümkün hâle geldi (her ne kadar bu tamamlanmış olmasa da). Ayrıca dolaylı olarak çeşitli gizlilik iyileştirmeleri de yapıldı. Girdiler/çıktılar yerine 'Actions' kavramının getirilmesi, işlem metadata miktarının azaltılmasına yardımcı oldu. 

Güvenilir kurulumları koordine etmek genel olarak zordur ve sistemik bir risk oluşturmuştur. Her büyük protokol yükseltmesi için bunların tekrarlanması gerekirdi. Bunların kaldırılması, yeni protokol yükseltmelerinin güvenli şekilde uygulanması açısından önemli bir iyileşme sunar. 

Özyinelemeli kanıt bileşimi, sınırsız miktarda hesaplamayı sıkıştırma, denetlenebilir dağıtık sistemler oluşturma potansiyeline sahiptir ve özellikle Proof of Stake'e geçişle birlikte Zcash'i son derece yetkin hâle getirir. Bu, ayrıca Zcash Shielded Assets gibi uzantılar ve önümüzdeki yıllarda Zcash için full node kullanımının üst sınırlarında Layer 1 kapasitesini iyileştirmek açısından da faydalıdır.


## Daha geniş ekosistemde Halo 

Electric Coin Company, Halo Ar-Ge'sini ve bu teknolojinin kendi ağlarında nasıl kullanılabileceğini araştırmak üzere Protocol Labs, Filecoin Foundation ve Ethereum Foundation ile bir anlaşma yapmıştır. Bu anlaşma, ekosistemler genelinde ve Web 3.0 için daha iyi ölçeklenebilirlik, birlikte çalışabilirlik ve gizlilik sağlamayı amaçlamaktadır.

Ek olarak, Halo 2 [MIT ve Apache 2.0 açık kaynak lisansları](https://github.com/zcash/halo2#readme) altında yayımlanmaktadır; bu da ekosistemdeki herkesin bu ispat sistemiyle inşa yapabileceği anlamına gelir.

### Filecoin

Kullanıma alınmasından bu yana halo2 kütüphanesi zkEVM gibi projelerde benimsenmiştir; Halo 2'nin Filecoin Virtual Machine için kanıt sistemine entegre edilme potansiyeli vardır. Filecoin çok sayıda maliyetli spacetime kanıtı / replication kanıtı gerektirir. Halo2, alan kullanımını sıkıştırmada ve ağı daha iyi ölçeklendirmede kritik öneme sahip olacaktır.

[Zooko ile Filecoin Foundation videosu](https://www.youtube.com/watch?v=t4XOdagc9xw)

Ayrıca, Filecoin depolama ödemelerinin ZEC ile yapılabilmesi hem Filecoin hem de Zcash ekosistemleri için çok faydalı olurdu; böylece depolama satın alımlarında da Zcash shielded transfer'lerinde var olan aynı düzeyde gizlilik sağlanabilirdi. Bu destek, Filecoin depolamasındaki dosyaları şifreleme imkânı ekler ve mobil istemcilerin bir Zcash şifreli notuna medya ya da dosya **ekleyebilmesini** desteklerdi. 

[ECC x Filecoin Blog Yazısı](https://electriccoin.co/blog/ethereum-zcash-filecoin-collab/)

### Ethereum

Geliştirilmekte olan verimli Verifiable Delay Function (VDF) için bir Halo 2 kanıtının uygulanması üzerinde çalışılmaktadır. VDF, birçok potansiyel kullanım alanına sahip bir kriptografik ilkeldir. 

Akıllı sözleşme uygulamalarındaki kullanımın yanı sıra Ethereum ve diğer protokollerdeki Proof of Stake lider seçimi dâhil olmak üzere genel amaçlı rastgelelik kaynağı olarak kullanılabilir.

ECC, Filecoin Foundation, Protocol Labs ve Ethereum Foundation ayrıca GPU ve ASIC tasarımı ile VDF geliştirmesi için donanım hızlandırmalı kriptografi konusunda uzman bir tedarikçi olan [SupraNational](https://www.supranational.net/) ile de çalışacaktır.

[Privacy and Scaling Exploration group](https://appliedzkp.org/) da Halo 2 kanıtlarının Ethereum ekosistemi için gizlilik ve ölçeklenebilirliği nasıl iyileştirebileceğine dair farklı yolları araştırmaktadır. Bu grup Ethereum foundation'a bağlıdır ve sıfır bilgi kanıtları ile kriptografik ilkeller üzerine geniş bir odak alanına sahiptir. 

## Halo kullanan diğer projeler

+ [Anoma, gizliliği koruyan çok zincirli bir atomik takas protokolü](https://anoma.net/blog/an-introduction-to-zk-snark-plonkup)

+ [Oribis, Cardano üzerinde bir L2 zkRollup](https://docs.orbisprotocol.com/orbis/technology/halo-2)

+ [Darkfi, özel bir L1 zkEVM blokzinciri](https://darkrenaissance.github.io/darkfi/architecture/architecture.html)

+ [Scroll, Ethereum üzerinde bir L2 zkRollup](https://scroll.mirror.xyz/nDAbJbSIJdQIWqp9kn8J0MVS4s6pYBwHmK7keidQs-k)


**Daha Fazla Öğrenme**:

[zkp ve halo 2'ye giriş - Hanh Huynh Huu](https://www.youtube.com/watch?v=jDHWJLjQ9oA)

[Daira ve Str4d ile Halo 2 - ZKPodcast](https://www.youtube.com/watch?v=-lZH8T5i-K4)

[Teknik Açıklama Blogu](https://electriccoin.co/blog/technical-explainer-halo-on-zcash/)

[Halo 2 Community Showcase - Ying Tong @Zcon3](https://www.youtube.com/watch?v=JJi2TT2Ahp0)

**Dokümantasyon**

[Halo 2 kaynakları](https://github.com/adria0/awesome-halo2)

[Halo 2 dokümanları](https://zcash.github.io/halo2/)

[Halo 2 github](https://github.com/zcash/halo2)
