<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/zk_SNARKS.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# ZKP & ZK-SNARKS

## Kısaca

- **ZK-SNARKs** = Sıfır-Bilgi Özlü Etkileşimsiz Bilgi Argümanları
- Bir tarafın, bilginin kendisini ifşa etmeden **bir şeyi bildiğini kanıtlamasına** olanak tanırlar
- Zcash, bir işlemin geçerli olduğunu (doğru miktarlar, harcanmamış girdiler) **göndereni, alıcıyı veya miktarı ifşa etmeden** kanıtlamak için ZK-SNARKs kullanır
- "Özlü" anlamına gelen "Succinct", karmaşık ifadeler için bile kanıtın çok küçük ve doğrulamasının hızlı olması demektir
- Orchard havuzu, **güvenilir kurulum gerektirmeyen** bir ZK-SNARK sistemi olan Halo 2’yi kullanır

---

## Kanıt Nedir?

Kanıtlar tüm matematiğin temelidir. Bir kanıt, ispatlamaya çalıştığınız bir iddia veya teoremdir ve teoremin ispatlandığını ilan etmek için yapılan türetmeler dizisidir. ör. bir üçgendeki tüm açıların toplamının 180° olduğu, herkes tarafından bağımsız olarak kontrol edilebilir (doğrulayıcı).

**Kanıtlar** 

İspatlayıcı ---> İddiayı Ortaya Koyar ---> Doğrulayıcı Seçer ---> Kabul/Reddet 

(Hem ispatlayıcı hem de doğrulayıcı algoritmalardır)

Bilgisayar biliminde verimli şekilde doğrulanabilen kanıtlar için kullanılan terim NP kanıtlarıdır. Bu kısa kanıtlar polinom zamanda doğrulanabilir. Genel fikir şudur: "Bir teoremin bir çözümü vardır ve bu çözüm, kontrol etmesi için doğrulayıcıya iletilir"


<a href="">
    <img width="853" height="396" alt="NPlanguage1" src="https://github.com/user-attachments/assets/d25345cf-e958-4ce2-b01d-f4e7f2db9551" alt="" width="600" height="400"/>
</a>


Bir NP-dilinde = iki koşulun sağlanması gerekir: 

Tamlık: Doğru iddialar doğrulayıcı tarafından kabul edilir (dürüst ispatlayıcıların doğrulamaya ulaşmasını sağlar)

Sağlamlık: Yanlış iddiaların kanıtı olmaz (hile yapan tüm ispatlayıcı stratejileri için, yanlış iddianın doğruluğunu kanıtlayamazlar).


### Etkileşimli ve Olasılıksal Kanıtlar

**Etkileşim**: Doğrulayıcı, sadece kanıtı okumak yerine, birkaç mesaj turu boyunca ispatlayıcıyla karşılıklı iletişim kurar.

**Rastgelelik**: Doğrulayıcının ispatlayıcıya talepleri rastgeleleştirilir ve ispatlayıcının bunların her birine doğru yanıt verebilmesi gerekir. 


<a href="">
 <img width="855" height="399" alt="IPmodel1" src="https://github.com/user-attachments/assets/1542be12-d3fd-4934-8413-0d16f95b8d10" alt="" width="600" height="400"/>
</a>


Etkileşim ve rastgelelik birlikte kullanıldığında, bir iddiayı kör bir doğrulayıcıya Olasılıksal Polinom Zamanda (PPT) kanıtlamak mümkündür. 

Etkileşimli Kanıtlar, NP kanıtlarından daha fazlasını verimli biçimde doğrulayabilir mi?

NP Kanıtları ve IP kanıtları:

|  İfade   |    NP     | IP    |
|--------------|-----------|--------|
|    NP        |  evet      |  evet   |
|    CO-NP     |  hayır       |  evet   |
|    #P        |  hayır       |  evet   |
|    PSPACE    |  hayır       |  evet   |


NP - Bir ifadeye ait bir çözüm vardır

CO-NP - Bir ifadeye ait çözüm olmadığını kanıtlamak

#P - Bir ifadeye ait kaç çözüm olduğunu saymak

PSPACE  - Farklı ifadelerin dönüşümlü yapısını kanıtlamak

### Sıfır Bilgi Nedir?

Bir doğrulayıcının etkileşimden sonra hesaplayabildiği şey, etkileşimden önce kanıtlayabildiği şeyle aynıdır. İspatlayıcı ve doğrulayıcı arasındaki çok turlu etkileşim, doğrulayıcının hesaplama gücünü artırmamıştır.

**The Simulation Paradigm**

Bu deney, kriptografinin her yerinde karşımıza çıkar. Bir "Real View" ve bir "Simulated View" sunar. 

Gerçek Görünüm: İspatlayıcı ve Doğrulayıcı (P,V) arasındaki etkileşimlerin tüm olası geçmişleri

Simüle Edilmiş Görünüm: Doğrulayıcı, İspatlayıcı ve Doğrulayıcı arasındaki tüm olası etkileşimleri simüle eder 

<a href="">
    <img width="850" height="397" alt="simulation1" src="https://github.com/user-attachments/assets/0e68649d-a231-44d8-a76a-25a307f68b9e"  alt="" width="600" height="400"/>
</a>

Polinom-zamanlı bir ayırt edici, gerçek mi yoksa simüle edilmiş görünüm mü gördüğünü belirlemeye çalışır ve her ikisinden de tekrar tekrar örnek ister.

Tüm ayırt edici algoritmalar/stratejiler için, gerçek veya simüle edilmiş görünümden polinom sayıda örnek aldıktan sonra bile olasılık >1/2 ise, bu iki görünümün "hesaplamasal olarak ayırt edilemez" olduğu söylenir. 

**Sıfır-Bilgi Bilgi Argümanları**

Etkileşimli bir protokol (P,V), her olasılıksal polinom-zamanlı doğrulayıcı için (teorem doğru olduğunda), gerçek görünümü simüle edilmiş görünümden ayıran olasılık dağılımlarının hesaplamasal olarak ayırt edilemez olduğu bir simülatör (algoritma) mevcutsa sıfır-bilgidir. 

Etkileşimli Protokoller, tek bir doğrulayıcı olduğunda faydalıdır. Buna örnek olarak, sıfır-bilgi temelli bir "vergi kanıtı" uygulamasındaki vergi denetçisi verilebilir.

## SNARK Nedir?

**Özlü Etkileşimsiz Bilgi Argümanı**

Geniş tanım - Bir ifadenin doğru olduğuna dair özlü bir kanıt. Kanıt kısa olmalı ve hızlı doğrulanabilmelidir. SNARKS’ta İspatlayıcıdan Doğrulayıcıya tek bir mesaj gönderilir. Doğrulayıcı daha sonra kabul etmeyi veya reddetmeyi seçebilir. 

örnek ifade: "SHA256(m)=0 olacak şekilde bir mesaj (m) biliyorum"

Bir zk-SNARK’ta kanıt, mesaj (m) hakkında hiçbir şey açığa çıkarmaz.

**Polinomlar**: Sabitler (örneğin 1,2,3), değişkenler (örneğin x,y,z) ve değişkenlerin üslerini (örneğin x², y³) içeren terimlerin toplamları. 

örnek: "3x² + 8x + 17"

**Aritmetik Devre**: Polinomları hesaplamak için bir model. Daha genel olarak, grafiğin her düğümünde bir aritmetik işlemin gerçekleştirildiği Yönlendirilmiş Döngüsüz Grafik olarak tanımlanabilir. Devre, toplama kapıları, çarpma kapıları ve bazı sabit kapılardan oluşur. Boolean devrelerinin tellerde bit taşıdığı gibi, aritmetik devreler de tam sayıları taşır.


<a href="">
<img width="785" height="368" alt="circuit1" src="https://github.com/user-attachments/assets/be1de1d6-60d3-4fd1-b9a2-5094c65d696f" alt="" width="300" height="200"/>
</a>

Bu örnekte ispatlayıcı, doğrulayıcıyı aritmetik devrenin bir çözümünü bildiğine ikna etmek istiyor.  

**Taahhütler**: Bunu yapmak için ispatlayıcı, devreyle ilişkili tüm değerleri (özel ve açık) bir taahhüt içine koyacaktır. Taahhütler, çıktısı geri döndürülemez bir fonksiyon kullanarak girdilerini gizler.

Sha256, bir taahhüt şemasında kullanılabilecek hash fonksiyonlarından bir örnektir.

İspatlayıcı değerlere taahhütte bulunduktan sonra, taahhütler doğrulayıcıya gönderilir (doğrulayıcının özgün değerlerden hiçbirini ortaya çıkaramayacağından emin olunarak). İspatlayıcı daha sonra, grafikteki düğümlerde bulunan değerlerin her biri hakkındaki bilgisini doğrulayıcıya gösterebilir. 

**Fiat-Shamir Dönüşümü**

Protokolü *etkileşimsiz* hale getirmek için ispatlayıcı, kriptografik bir hash fonksiyonu kullanarak doğrulayıcı adına rastgelelik üretir (gizli meydan okuma için kullanılır). Buna random oracle denir. İspatlayıcı daha sonra doğrulayıcıya tek bir mesaj gönderebilir ve doğrulayıcı da bunun doğru olduğunu kontrol edebilir. 

Genel devreler için kullanılabilecek bir SNARK oluşturmak için iki unsur gereklidir:

İşlevsel taahhüt şeması: Taahhütte bulunan kişinin, doğrulayıcı tarafından taahhüt edilen polinomun iddia edilen değerlendirmelerini doğrulamak için kullanılabilecek kısa bir dizgeyle bir polinoma taahhütte bulunmasına olanak tanır.

Polinom etkileşimli oracle: Doğrulayıcı, polinom taahhüt şemasını kullanarak ispatlayıcıdan (algoritma) kendi seçtiği çeşitli noktalarda tüm taahhütleri açmasını ister ve aralarındaki özdeşliğin doğru olup olmadığını kontrol eder.

**Kurulum**

Kurulum prosedürleri, bir devreyi özetleyip açık parametreler üreterek doğrulayıcıya yardımcı olur. 

<a href="">
<img width="845" height="398" alt="setup1" src="https://github.com/user-attachments/assets/c41212ca-b5e9-4ac8-8695-be612c45a679" alt="" width="600" height="300"/>
</a>

**Ön işleme kurulum türleri**:

Devre başına Güvenilir Kurulum - Devre başına bir kez çalıştırılır. Bir devreye özeldir ve gizli rastgeleliğin (Common Reference String) gizli tutulması ve yok edilmesi gerekir. 

Bu yöntemde tehlikeye girmiş bir kurulum, dürüst olmayan bir ispatlayıcının yanlış ifadeleri kanıtlayabilmesi anlamına gelir. 

Güvenilir ama Evrensel Kurulum - Güvenilir kurulumu yalnızca bir kez çalıştırması gerekir ve ardından birden fazla devreyi deterministik olarak ön işleyebilir. 

Şeffaf Kurulum (Güvenilir Kurulum Yok)- Ön işleme algoritması hiçbir gizli rastgelelik kullanmaz. 


**SNARK kanıt yapısı türleri**:

[Groth16](https://www.youtube.com/watch?v=QDplVkyncYQ): Güvenilir Kurulum gerektirir ancak çok kısa kanıtlara sahiptir ve hızlı doğrulanabilir.

[Sonic](https://www.youtube.com/watch?v=oTRAg6Km1os)/[Marlin](https://www.youtube.com/watch?v=bJDLf8KLdL0)/[Plonk](https://cryptocurrencywiki.org/PLONK): Evrensel Güvenilir Kurulum.

[DARK](https://www.youtube.com/watch?v=_ZDM7NwSxEY)/[HALO](https://eprint.iacr.org/archive/2019/1021/20200218:011907)/[STARK](https://www.youtube.com/watch?v=wFZ_YIetK1o): Güvenilir Kurulum gerektirmez ancak biraz daha uzun kanıtlar üretir veya ispatlayıcının çalışması daha uzun sürebilir. 

SNARKS, Zcash gibi bir blockchain veya [Aztec](https://docs.aztec.network) gibi bir zk-Rollup gibi birden fazla doğrulayıcıya ihtiyaç duyulan durumlarda faydalıdır; böylece birden fazla doğrulayıcı düğümün her kanıt için birkaç tur boyunca etkileşim kurması gerekmez. 

## zk-SNARK'lar Zcash’te nasıl uygulanır?

Genel olarak sıfır-bilgi kanıtları, herhangi bir bilgiyi ifşa etmeden protokollerde dürüst davranışı zorunlu kılmak için kullanılan bir araçtır. 

Zcash, özel işlemleri mümkün kılan halka açık bir blockchain’dir. zk-SNARK'lar, özel bir işlemin ağın konsensüs kuralları içinde geçerli olduğunu, işlemle ilgili başka hiçbir ayrıntıyı ifşa etmeden kanıtlamak için kullanılır. 

[Video Açıklaması](https://www.youtube.com/watch?v=Kx4cIkCY2EA) - Bu derste Ariel Gabizon, Zcash Note Commitment Tree, Blind Polynomial Evaluation ve Homomorphically Hidden Challenges hakkında açıklamalar sunuyor ve bunların ağda nasıl uygulandığını anlatıyor. 

Daha fazla bilgi için [Halo2 kitabını](https://zcash.github.io/halo2/index.html) okuyun.

## Diğer Sıfır-Bilgi Uygulamaları 

zk-SNARKS, çok çeşitli farklı uygulamalarda çeşitli avantajlar sunar. Şimdi bazı örneklere bakalım.

**Ölçeklenebilirlik**: Bu, "Hesaplamayı Dış Kaynağa Aktarma" ile sağlanır. Bir L1 zincirinin zincir dışı bir hizmetin yaptığı işi doğrulaması için sıfır-bilgiye kesin bir ihtiyaç yoktur. İşlemler bir zk-EVM üzerinde mutlaka özel değildir.

Kanıta dayalı bir Rollup (zk-Rollup) hizmetinin avantajı, yüzlerce/binlerce işlemlik bir partiyi işlemesi ve L1’in tüm işlemlerin doğru işlendiğine dair özlü bir kanıtı doğrulayabilmesidir; bu da ağın işlem verimini 100 veya 1000 kat artırır.

<a href="">
  <img width="606" height="336" alt="zkvm1" src="https://github.com/user-attachments/assets/a3cbb5c9-8767-4b34-9fcb-868ca421838f" width="600" height="300"/>
</a>


**Birlikte Çalışabilirlik**: Bu, bir zk-Bridge üzerinde kaynak zincirde varlıkları "kilitleyerek" ve hedef zincire varlıkların kilitlendiğini kanıtlayarak (konsensüs kanıtı) sağlanır.

**Uyumluluk**: [Espresso](https://www.espressosys.com/blog/decentralizing-rollups-announcing-the-espresso-sequencer) gibi projeler, özel bir işlemin ayrıntılarını ifşa etmeden yerel bankacılık yasalarına uygun olduğunu kanıtlayabilir. 

**Dezenformasyonla Mücadele**: Blockchain ve kripto para dışında çeşitli örnekler arasında, haber ve medya kuruluşları tarafından işlenmiş görseller üzerinde kanıt üretiminin kullanılması; böylece izleyicilerin bir görselin kaynağını ve üzerinde yapılan tüm işlemleri bağımsız olarak doğrulayabilmesi. https://medium.com/@boneh/using-zk-proofs-to-fight-disinformation-17e7d57fe52f


____


İleri Öğrenme: 

[Zero-Knowledge Kaynakçası - a16z Crypto](https://a16zcrypto.com/zero-knowledge-canon/)

[Hanh Huynh Huu ile zkSNARK'lar](https://www.youtube.com/watch?v=zXF-BDohZjk)

[Zcash: Halo 2 ve Güvenilir Kurulum Olmadan SNARK'lar - Dystopia labs’de Sean Bowe](https://www.youtube.com/watch?v=KdkVTEHUxgo)

[Avi Wigderson ile Sıfır bilgi Kanıtları - Numberphile](https://youtu.be/5ovdoxnfFVc)

[Etkileşimli Sıfır-Bilgi Kanıtları - Chainlink makalesi](https://blog.chain.link/interactive-zero-knowledge-proofs/)

[Ders 1: ZKP’ye Giriş ve Tarihçe - zklearning.org](https://www.youtube.com/watch?v=uchjTIlPzFo)

[Aritmetik Devrelerin Basit Açıklaması - Medium](https://medium.com/web3studio/simple-explanations-of-arithmetic-circuits-and-zero-knowledge-proofs-806e59a79785)

[Ölçeklenebilirlik Sıkıcı, Mahremiyet Öldü: ZK-Proofs, Ne İşe Yararlar?](https://www.youtube.com/watch?v=AX7eAzfSB6w)

---

## İlgili Sayfalar

- [Shielded Pools](/using-zcash/shielded-pools) — ZK-SNARKs’in Zcash değer havuzlarında nasıl kullanıldığı
- [Halo](/zcash-tech/halo) — Güvenilir kurulumları ortadan kaldıran Zcash ZK-SNARK sistemi
- [Zcash’te Post-Quantum Güvenlik](/zcash-tech/post-quantum-security) - Gelecekteki kuantum risklerinin Zcash kriptografisiyle ilişkisi
- [Zcash Shielded Assets](/zcash-tech/zcash-shielded-assets) — ZK-SNARK teknolojisi üzerine inşa edilmiş ZSA’lar
- [ZEC ve Zcash nedir](/start-here/what-is-zec-and-zcash) — Zcash ve onun mahremiyet modeline giriş
- [Temel Bir İlke Olarak Mahremiyet](/privacy/privacy-as-a-core-principle) — Finansal mahremiyet neden önemlidir
