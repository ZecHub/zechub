<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/zk_SNARKS.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Sayfayı düzenle"/>
</a>

# ZKP ve ZK-SNARK’lar

## Kısaca

- **zk-SNARKs** = Sıfır Bilgili Özlü Etkileşimsiz Bilgi Argümanları (Zero-Knowledge Succinct Non-Interactive Arguments of Knowledge)
- Bir tarafın, bilginin kendisini açıklamadan **bir şeyi bildiğini kanıtlamasını** sağlar
- Zcash, bir işlemin geçerli olduğunu (tutarların doğru, girdilerin harcanmamış olduğunu) **göndereni, alıcıyı veya tutarı açıklamadan** kanıtlamak için zk-SNARKs kullanır
- “Özlü”, kanıtın küçük olduğu ve karmaşık ifadeler için bile hızlıca doğrulanabildiği anlamına gelir
- Orchard havuzu, **güvene dayalı kurulum gerektirmeyen** bir zk-SNARK sistemi olan Halo 2’yi kullanır

---

## Kanıt Nedir?

Kanıtlar tüm matematiğin temelidir. Kanıt, kanıtlamaya çalıştığınız bir iddia veya teorem ile teoremin kanıtlandığını ilan etmek için yapılan çıkarımlar dizisidir. Örneğin, bir üçgendeki tüm açıların toplamının 180° olduğu herkes tarafından bağımsız olarak kontrol edilebilir (doğrulayıcı).

**Kanıtlar** 

Kanıtlayıcı ---> İddiada Bulunur ---> Doğrulayıcı Seçer ---> Kabul/Ret

(Hem kanıtlayıcı hem de doğrulayıcı algoritmadır)

Bilgisayar biliminde verimli bir şekilde doğrulanabilen kanıtlar için kullanılan terim NP kanıtlarıdır. Bu kısa kanıtlar polinom zamanda doğrulanabilir. Temel fikir şudur: “Bir teoremin çözümü vardır ve doğrulayıcının kontrol etmesi için ona iletilir.”

<a href="">
    <img width="853" height="396" alt="NPlanguage1" src="/content-images/d25345cf-e958-4ce2-b01d-f4e7f2db9551-1ac56e56d7.webp" alt="" width="600" height="400"/>
</a>


Bir NP dilinde 2 koşul sağlanmalıdır:

Tamlık: Doğru iddialar doğrulayıcı tarafından kabul edilir (dürüst kanıtlayıcıların doğrulamadan geçmesini sağlar)

Sağlamlık: Yanlış iddiaların kanıtı olmaz (hile yapan kanıtlayıcıların hiçbir stratejisi yanlış bir iddianın doğruluğunu kanıtlamalarını sağlayamaz).


### Etkileşimli ve Olasılıksal Kanıtlar

**Etkileşim**: Doğrulayıcı, yalnızca kanıtı okumak yerine birkaç mesaj turu boyunca kanıtlayıcıyla karşılıklı iletişim kurar.

**Rastgelelik**: Doğrulayıcının kanıtlayıcıya yönelttiği istekler rastgele belirlenir ve kanıtlayıcı her birine doğru yanıt verebilmelidir.


<a href="">
 <img width="855" height="399" alt="IPmodel1" src="/content-images/1542be12-d3fd-4934-8413-0d16f95b8d10-58bfcb4059.webp" alt="" width="600" height="400"/>
</a>


Etkileşim ve rastgeleliği birlikte kullanarak, kör bir doğrulayıcıya Olasılıksal Polinom Zamanda (PPT) bir iddiayı kanıtlamak mümkündür.

Etkileşimli kanıtlar NP kanıtlarından daha fazlasını verimli bir şekilde doğrulayabilir mi?

NP kanıtları ve IP kanıtları:

|  İfade   |    NP     | IP    |
|--------------|-----------|--------|
|    NP        |  evet      |  evet   |
|    CO-NP     |  hayır       |  evet   |
|    #P        |  hayır       |  evet   |
|    PSPACE    |  hayır       |  evet   |


NP - Bir ifadenin çözümü vardır

CO-NP - Bir ifadenin çözümü olmadığını kanıtlama

#P - Bir ifadenin kaç çözümü olduğunu sayma

PSPACE  - Farklı ifadelerin dönüşümlü olarak sıralanmasını kanıtlama

### Sıfır Bilgi Nedir?

Bir etkileşimden sonra doğrulayıcının hesaplayabildikleri, etkileşimden önce kanıtlayabildikleriyle aynıdır. Kanıtlayıcı ve doğrulayıcı arasındaki çok turlu etkileşim, doğrulayıcının hesaplama gücünü artırmamıştır.

**Simülasyon Paradigm yaklaşımı**

Bu deney kriptografinin her alanında karşımıza çıkar. “Gerçek Görünüm” ve “Simüle Edilmiş Görünüm” sunar.

Gerçek Görünüm: Kanıtlayıcı ve Doğrulayıcı (P,V) arasındaki tüm olası etkileşim geçmişleri

Simüle Edilmiş Görünüm: Doğrulayıcı, Kanıtlayıcı ve Doğrulayıcı arasındaki tüm olası etkileşimleri simüle eder

<a href="">
    <img width="850" height="397" alt="simulation1" src="/content-images/0e68649d-a231-44d8-a76a-25a307f68b9e-ba1f0027cf.webp"  alt="" width="600" height="400"/>
</a>

Polinom zamanda çalışan bir ayırt edici, gerçek mi yoksa simüle edilmiş görünüme mi baktığını belirlemeye çalışır ve her ikisinden de tekrar tekrar örnek ister.

Gerçek veya simüle edilmiş görünümden polinom sayıda örnek aldıktan sonra bile tüm ayırt edici algoritmalar/stratejiler için olasılık >1/2 ise, iki görünümün “hesaplamalı olarak ayırt edilemez” olduğu söylenir.

**Sıfır Bilgili Bilgi Argümanları**

Etkileşimli bir protokol (P,V), her olasılıksal polinom zamanlı doğrulayıcı için (teorem doğru olduğunda) gerçek görünüm ile simüle edilmiş görünümü belirleyen olasılık dağılımları hesaplamalı olarak ayırt edilemez kılan bir simülatör (algoritma) varsa sıfır bilgilidir.

Etkileşimli protokoller, tek bir doğrulayıcının olduğu durumlarda kullanışlıdır. Örneğin, sıfır bilgili bir “vergilerin kanıtı” uygulamasındaki vergi denetçisi.

## SNARK Nedir?

**Özlü Etkileşimsiz Bilgi Argümanı**

Geniş tanım: Bir ifadenin doğru olduğuna dair özlü bir kanıt. Kanıt kısa olmalı ve hızlıca doğrulanabilmelidir. SNARK’larda Kanıtlayıcıdan Doğrulayıcıya tek bir mesaj gönderilir. Ardından doğrulayıcı kabul veya ret kararı verebilir.

Örnek ifade: “SHA256(m)=0 olacak bir mesajı (m) biliyorum.”

zk-SNARK içinde kanıt, mesaj (m) hakkında hiçbir şey açığa çıkarmaz.

**Polinomlar**: Sabit (1, 2, 3 gibi), değişkenler (x, y, z gibi) ve değişkenlerin üslerini (x², y³ gibi) içeren terimlerin toplamlarıdır.

Örnek: “3x² + 8x + 17”

**Aritmetik Devre**: Polinomları hesaplamak için kullanılan bir modeldir. Daha genel olarak, grafiğin her düğümünde bir aritmetik işlemin gerçekleştirildiği Yönlü Döngüsüz Grafik olarak tanımlanabilir. Devre; toplama kapılarından, çarpma kapılarından ve bazı sabit kapılarından oluşur. Boole devrelerinin bitleri tellerde taşıması gibi, aritmetik devreler de tamsayıları taşır.


<a href="">
<img width="785" height="368" alt="circuit1" src="/content-images/be1de1d6-60d3-4fd1-b9a2-5094c65d696f-dbd3177247.webp" alt="" width="300" height="200"/>
</a>

Bu örnekte kanıtlayıcı, aritmetik devrenin bir çözümünü bildiğine dair doğrulayıcıyı ikna etmek ister.

**Kriptografik Taahhütler**: Bunu yapmak için kanıtlayıcı, devreyle ilişkili tüm değerleri (özel ve herkese açık) bir kriptografik taahhüde koyar. Kriptografik taahhütler, çıktısı geri döndürülemez olan bir işlev kullanarak girdilerini gizler.

Sha256, kriptografik taahhüt şemasında kullanılabilecek bir karma işlevi örneğidir.

Kanıtlayıcı değerler için taahhütte bulunduktan sonra, taahhütler doğrulayıcıya gönderilir (böylece doğrulayıcının orijinal değerlerden herhangi birini ortaya çıkaramayacağından emin olunur). Ardından kanıtlayıcı, grafiğin düğümlerindeki değerlerin her birini bildiğini doğrulayıcıya gösterebilir.

**Fiat-Shamir Dönüşümü**

Protokolü *etkileşimsiz* hâle getirmek için kanıtlayıcı, doğrulayıcı adına gizli meydan okumada kullanılacak rastgeleliği bir kriptografik karma işleviyle üretir. Buna rastgele kâhin denir. Kanıtlayıcı daha sonra doğrulayıcıya tek bir mesaj gönderebilir; doğrulayıcı da mesajın doğru olup olmadığını kontrol edebilir.

Genel devrelerde kullanılabilecek bir SNARK oluşturmak için 2 öğe gerekir:

İşlevsel kriptografik taahhüt şeması: Bir taahhüt sahibinin bir polinom için kısa bir dizeyle taahhütte bulunmasını ve doğrulayıcının bu dizeyi kullanarak taahhüt edilen polinomun iddia edilen değerlendirmelerini doğrulamasını sağlar.

Polinom etkileşimli kâhini: Doğrulayıcı, polinom kriptografik taahhüt şemasını kullanarak kanıtlayıcıdan (algoritma) tüm taahhütleri kendi seçtiği çeşitli noktalarda açmasını ister ve aralarındaki özdeşliğin doğru olduğunu kontrol eder.

**Kurulum**

Kurulum süreçleri, bir devreyi özetleyip herkese açık parametreler üreterek doğrulayıcıya yardımcı olur.

<a href="">
<img width="845" height="398" alt="setup1" src="/content-images/c41212ca-b5e9-4ac8-8695-be612c45a679-80a6a87752.webp" alt="" width="600" height="300"/>
</a>

**Ön işlemeli kurulum türleri**:

Her devre için güvene dayalı kurulum - Her devre için ayrı ayrı çalıştırılır. Ortaya çıkan ortak referans dizgesi (CRS), kanıtlayıcılar ve doğrulayıcılar tarafından kullanılan herkese açık parametreleri içerir. Gizli tutulup yok edilmesi gereken şey CRS değil, gizli ara kurulum malzemesidir (“toksik atık”). ECC’nin [herkese açık parametre açıklaması](https://zodl.com/snark-parameters/) bu ikisini birbirinden ayırır.

Gerekli gizli kurulum malzemesi saklanır veya kurtarılırsa, dürüst olmayan bir kanıtlayıcı yanlış ifadeler için kanıt üretebilir. Bir MPC töreninde güvenlik, en az bir katılımcının protokole uymasına ve gizli katkısını yok etmesine bağlı olabilir.

Güvene dayalı ancak evrensel kurulum - Tek bir güvene dayalı kurulum, desteklenen boyut sınırları dahilindeki birden fazla devre için kanıtlama ve doğrulama anahtarları türetmekte kullanılabilecek parametreler üretir. Bu yaklaşım yine de sırların yok edilmesine ilişkin bir varsayıma dayanır; evrensel olması şeffaf olduğu anlamına gelmez.

Şeffaf kurulum (güvene dayalı kurulum yok) - Herhangi birinin yok etmesi için güvenilmesi gereken gizli bir kurulum arka kapısı olmadan herkese açık parametreler üretilebilir. Bu, kanıtlamada rastgelelik kullanılmadığı veya sistemin herkese açık parametreleri olmadığı anlamına gelmez. [Halo 2 kitabı](https://zcash.github.io/halo2/background/pc-ipa.html#setup) herkese açık grup parametrelerine örnek verir.


**SNARK kanıtı oluşturma türleri**:

[Groth16](https://eprint.iacr.org/2016/260): Güvene dayalı kurulum gerektirir ancak çok kısa kanıtları vardır ve bu kanıtlar hızlıca doğrulanabilir.

[Sonic](https://www.youtube.com/watch?v=oTRAg6Km1os)/[Marlin](https://www.youtube.com/watch?v=bJDLf8KLdL0)/[PLONK](https://eprint.iacr.org/2019/953): Evrensel güvene dayalı kurulum.

[DARK](https://eprint.iacr.org/2019/1229)/[Halo](https://eprint.iacr.org/archive/2019/1021/20200218:011907)/[STARK](https://www.youtube.com/watch?v=wFZ_YIetK1o): Güvene dayalı kurulum gerektirmez ancak biraz daha uzun kanıtlar üretir veya kanıtlayıcının çalıştırması daha uzun sürebilir.

Birden fazla doğrulayıcı gerektiğinde SNARK’lar kullanışlıdır. Örneğin, Zcash gibi bir blokzincirde veya [Aztec](https://docs.aztec.network) gibi bir zk-Rollup’ta, birden fazla doğrulayıcı düğümün her kanıt için birkaç tur boyunca etkileşim kurması gerekmez.

## Zcash'da zk-SNARK nasıl uygulanır?

Genel olarak sıfır bilgili kanıtlar, herhangi bir bilgiyi açığa çıkarmadan protokollerde dürüst davranışı sağlamaya yarayan araçlardır.

Zcash, özel işlemleri mümkün kılan herkese açık bir blokzincirdir. zk-SNARK, özel bir işlemin ağın konsensüs kuralları kapsamında geçerli olduğunu, işlemle ilgili başka hiçbir ayrıntıyı açığa çıkarmadan kanıtlamak için kullanılır.

[Video Açıklaması](https://www.youtube.com/watch?v=Kx4cIkCY2EA) - Ariel Gabizon bu derste Zcash Note Kriptografik Taahhüt Ağacı, Kör Polinom Değerlendirmesi ve Homomorfik Olarak Gizlenmiş Meydan Okumaları ve bunların ağda nasıl uygulandığını anlatıyor.

Daha fazla bilgi için [Halo2 kitabını](https://zcash.github.io/halo2/index.html) okuyun.

## Diğer Sıfır Bilgi Uygulamaları

zk-SNARKs çeşitli uygulamalarda birçok avantaj sağlar. Bazı örneklere göz atalım.

**Ölçeklenebilirlik**: Bu, “Hesaplamayı Dış Kaynağa Aktarma” yoluyla sağlanır. Bir L1 Zincirinin zincir dışı bir hizmetin çalışmasını doğrulaması için sıfır bilgiye kesinlikle gerek yoktur. zk-EVM’de işlemler mutlaka özel değildir.

Kanıta dayalı bir Rollup (zk-Rollup) hizmetinin avantajı, yüzlerce/binlerce işlemden oluşan bir paketi işlemesi ve L1’in tüm işlemlerin doğru işlendiğini gösteren özlü bir kanıtı doğrulayabilmesidir. Böylece ağların işlem hacmi 100 veya 1.000 katına çıkar.

<a href="">
  <img width="606" height="336" alt="zkvm1" src="/content-images/a3cbb5c9-8767-4b34-9fcb-868ca421838f-d69b264b5b.webp" width="600" height="300"/>
</a>


**Birlikte Çalışabilirlik**: zk-Köprüde, varlıkların kaynak Zincirde “kilitlenmesi” ve varlıkların kilitlendiğinin hedef Zincire kanıtlanması (konsensüs kanıtı) yoluyla sağlanır.

**Uyumluluk**: [Espresso](https://www.espressosys.com/blog/decentralizing-rollups-announcing-the-espresso-sequencer) gibi projeler, özel bir işlemin yerel bankacılık yasalarına uygun olduğunu işlemin ayrıntılarını açığa çıkarmadan kanıtlayabilir.

**Dezenformasyonla Mücadele**: Blokzincir ve kripto para dışındaki çeşitli örneklerden biri, haber ve medya kuruluşlarınca işlenen görseller üzerinde kanıt üreterek izleyicilerin görselin kaynağını ve görsel üzerinde gerçekleştirilen tüm işlemleri bağımsız olarak doğrulamasını sağlamaktır. https://medium.com/@boneh/using-zk-proofs-to-fight-disinformation-17e7d57fe52f


____


Daha Fazla Bilgi:

[Sıfır Bilgi Bibliyografyası - a16z Crypto](https://a16zcrypto.com/zero-knowledge-canon/)

[Hanh Huynh Huu ile zkSNARK’lar](https://www.youtube.com/watch?v=zXF-BDohZjk)

[Zcash: Halo 2 ve Güvene Dayalı Kurulum Gerektirmeyen SNARK’lar - Sean Bowe Dystopia labs’ta](https://www.youtube.com/watch?v=KdkVTEHUxgo)

[Avi Wigderson ile Sıfır Bilgili Kanıtlar - Numberphile](https://youtu.be/5ovdoxnfFVc)

[Etkileşimli Sıfır Bilgili Kanıtlar - Chainlink makalesi](https://blog.chain.link/interactive-zero-knowledge-proofs/)

[Ders 1: ZKP’ye Giriş ve Tarihçe - zklearning.org](https://www.youtube.com/watch?v=uchjTIlPzFo)

[Aritmetik Devrelerin Basit Açıklaması - Medium](https://medium.com/web3studio/simple-explanations-of-arithmetic-circuits-and-zero-knowledge-proofs-806e59a79785)

[Ölçeklenebilirlik Sıkıcı, Gizlilik Ölü: ZK Kanıtları Ne İşe Yarar?](https://www.youtube.com/watch?v=AX7eAzfSB6w)

---

## İlgili Sayfalar

- [Korumalı Havuzlar](/using-zcash/shielded-pools) — zk-SNARKs'ın Zcash değer havuzlarında nasıl kullanıldığı
- [Halo](/zcash-tech/halo) — Güvene dayalı kurulumları ortadan kaldıran Zcash'ın zk-SNARK sistemi
- [Zcash'te Kuantum Sonrası Güvenlik](/zcash-tech/post-quantum-security) - Gelecekteki kuantum risklerinin Zcash kriptografisiyle ilişkisi
- [Zcash Korumalı Varlıklar](/zcash-tech/zcash-shielded-assets) — zk-SNARK teknolojisi üzerine kurulu ZSA’lar
- [ZEC ve Zcash](/start-here/what-is-zec-and-zcash) nedir — Zcash ve gizlilik modeline giriş
- [Zcash Ödemesini Kim Görebilir?](/start-here/who-can-see-your-zcash-payment) — Nelerin herkese açık kaldığı ve korumanın neleri gizlediği
