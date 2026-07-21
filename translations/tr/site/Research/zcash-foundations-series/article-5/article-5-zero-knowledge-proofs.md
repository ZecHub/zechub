# Sıfır Bilgi Kanıtları: Nedenini Söylemeden Haklı Olduğunu Kanıtlamak
##### [Annkkitaaa](https://github.com/Annkkitaaa) tarafından yapılan özgün araştırma

![alt text](image-23.png)

### Dünyanın asla göremeyeceği şeyi doğrulamasına izin veren perde

> **Seri:** *İlk Prensiplerden Zcash* . **Makale 5 . Sıfır Bilgi Kanıtları**
> **Hedef kitle:** yeni başlayanlar. Önceki her makaleden (sonlu alanlar, eğriler, taahhütler, Merkle ağaçları) yararlanıyoruz, ancak her fikri ihtiyaç duydukça yeniden hatırlatıyoruz.
> **Bu makaleden kazanacaklarınız:** bir sıfır bilgi kanıtının ne olduğuna, sağladığı üç güvenceye, keyfi ifadelerin nasıl kanıtlandığına ve Zcash'in Sapling ve Orchard yapılarının neyle çalıştığına dair sezgisel ve doğru bir anlayış.

Bu, tüm serinin tırmandığı makale. [Makale 0](article-0-shielded-transaction.md)'dan itibaren, bir ödemenin "perde arkasında" doğrulandığını, hiçbir şey açığa çıkmadan doğru olduğunun kanıtlandığını durmadan söyledik. Sıfır bilgi kanıtı işte o perdedir. Başta ortaya koyduğumuz paradoksu nihayet çözen parçadır: *halk, görmesine izin verilmeyen bir işlemi nasıl doğrulayabilir?*

---

## 1. Neden önemsemelisiniz?

Zcash'in kalbindeki çelişkiyi hatırlayın:

- Bir blokzincir, **herkes tarafından doğrulanabilir** olduğu için güvenilirdir.
- Zcash ödemeleri **tamamen özeldir**: miktarlar, gönderen, alıcı, hepsi gizlidir.

Bunlar birbirini dışlıyormuş gibi görünür. Doğrulama sanki *bakmayı* gerektirir. Gizlilik ise bakmayı *yasaklar*. İkisini uzlaştıramazsanız, kimsenin güvenebileceği özel paraya sahip olamazsınız.

Bir **sıfır bilgi kanıtı (ZKP)** bu uzlaşmadır. Bir **kanıtlayıcının**, bir ifadenin doğru olduğunu bir **doğrulayıcıya**, **doğru olduğu gerçeğinin ötesinde hiçbir şey açığa çıkarmadan** kabul ettirmesini sağlar. Miktar yok. Kimlik yok. Note yok. Sadece: *"buradaki her şey kurallara uyuyor."* Herhangi bir mekanizmaya girmeden önce sezgiyi oluşturalım.

---

## 2. Sezgi: günlük hayattan üç kanıt

**Bir parolayı bildiğini, onu söylemeden kanıtlamak.** Bir web sitesi, parolanızı gerçekten görmeden, yalnızca parolanın açabildiği bir şeyi açtığınızı gözlemleyerek onu bildiğinizi doğrulayabilir. *Açıklamadan* *bilgiyi* kanıtlarsınız.

**Renk körü arkadaş ve iki top.** Elinizde kırmızı bir top ve yeşil bir top var; bunlar renk körü arkadaşınıza aynı görünüyor. Ona bunların *farklı renklerde* olduğunu, hangisinin hangisi olduğunu söylemeden kabul ettirmek istiyorsunuz. O ikisini de sırtının arkasına saklar, isterse yerlerini değiştirir ve size birini gösterir. Siz de yer değiştirip değiştirmediğini söylersiniz. Toplar gerçekten farklıysa her zaman haklısınızdır. Aynıysalar, tahmin ediyorsunuzdur ve ancak yarı yarıya doğru çıkarsınız. 20 turun sonunda hiç hata yapmamanız, ona gerçekten farklı olduklarını kabul ettirir; ama hangi topun kırmızı olduğunu yine de öğrenmez. **Bir olgudan emin olurken başka hiçbir şey öğrenmez.** İşte minyatür hâliyle sıfır bilgi budur.

**Mağara.** Halka şeklinde bir mağaranın arkasında, yalnızca gizli bir sözle açılan sihirli bir kapı vardır. Siz o sözü bildiğinizi iddia ediyorsunuz. Bunu açığa vurmadan kanıtlamak için: bir doğrulayıcı dışarıda beklerken içeri girer ve rastgele sol ya da sağ geçidi seçersiniz. Ardından doğrulayıcı, hangi taraftan *çıkmanızı* istediğini bağırır. Sözü gerçekten biliyorsanız, her zaman bunu yapabilirsiniz (gerekirse taraf değiştirmek için kapıyı açabilirsiniz). Blöf yapıyorsanız, doğru taraftan çıkmanız yalnızca şansa bağlıdır; her turda 50/50. Bunu 20 kez tekrarladığınızda, blöf yapan birinin yakalanmadan kalma ihtimali milyonda birden daha az olur.

Bu mağara hikâyesi, her sıfır bilgi kanıtının sağlaması gereken **üç güvenceyi** sessizce gösterir.

---

## 3. Üç güvence

![alt text](image-24.png)

| Güvence | Mağara hikâyesinde | Zcash'te |
|---|---|---|
| **Tamlık** | Sözü biliyorsanız her zaman doğru taraftan çıkarsınız | Geçerli bir işlem her zaman kabul edilen bir kanıt üretir |
| **Sağlamlık** | Blöf yapan biri ezici olasılıkla yakalanır | Hileli bir işlem (sahte para üretimi, çift harcama) kabul edilen bir kanıt üretemez |
| **Sıfır bilgi** | Doğrulayıcı gizli sözü asla duymaz | Ağ miktarları, adresleri veya hangi note olduğunu asla öğrenmez |

Bunlardan biri bile başarısız olursa sistem bozulur: tamlık yoksa dürüst kullanıcılar reddedilir; sağlamlık yoksa sahtekârlar para basar; sıfır bilgi yoksa gizlilik buharlaşır.

---

## 4. Bir mağaradan *herhangi bir* ifadeye: devreler ve tanıklar

Mağara yalnızca hoş bir olguyu kanıtlar. Zcash'in ise şu gibi zengin bir ifadeyi kanıtlaması gerekir: *"Ağaçta harcanmamış bir note bildiğimi, onu harcamaya yetkili olduğumu, nullifier'ının doğru hesaplandığını ve girdilerimin çıktılarıma eşit olduğunu biliyorum."* Toplardan ve mağaralardan buna nasıl geçiyoruz?

Köprü, bu serinin tamamını birbirine bağlayan bir fikirdir:

> **Bir hesaplamayla kontrol edebileceğiniz her ifade, sonlu bir alan üzerinde toplama ve çarpma işlemlerinden oluşan aritmetik bir devre olarak yeniden yazılabilir:** bir kısıtlar ağı (Makale 1).

Devreyi, *yalnızca ifade doğruysa hepsi birlikte sağlanan* aritmetik kısıtların bir listesi olarak düşünün. Her şeyin kontrolü geçmesini sağlayan özel girdileriniz, yani note'unuz, anahtarınız, Merkle yolunuz, **tanık (witness)** olarak adlandırılır.

![alt text](image-25.png)

Bu yüzden Makale 1'i sonlu alanlara ve Makale 3'ü ZK-dostu hash'lere ayırdık: devre alan aritmetiğiyle konuşur, dolayısıyla ifadenin içindeki her işlem (hash'leme ve Makale 4'teki Merkle tırmanışı dâhil) bu şekilde ifade edilmek zorundadır. Her işlem bu dilde ne kadar ucuz ifade edilirse, kanıt da o kadar küçük ve hızlı olur.

---

## 5. Bunu pratik hâle getirmek: etkileşimsiz ve kısa

Mağara örneği birçok ileri geri tur gerektiriyordu. Bu, bir kanıtın bir kez yayımlanıp herkes tarafından sonsuza kadar kontrol edilmesi gereken bir blokzincir için pratik değildir. İki geliştirme bunu çözer.

**Etkileşimsiz (Fiat-Shamir fikri).** Canlı bir doğrulayıcının rastgele meydan okumalar bağırması yerine, kanıtlayıcı "rastgele meydan okumaları" kendi o ana kadarki kanıtını *hash'leyerek* üretir. İyi bir hash öngörülemez olduğu için (Makale 3), kanıtlayıcı bu meydan okumaları kendi lehine hazırlayamaz. Böylece konuşmalı diyalog, herkesin daha sonra kontrol edebileceği, **tek ve kendi kendine yeterli bir kanıta** dönüşür; etkileşim gerekmez.

**Kısa (succinct).** En iyi sistemler, ifade ne kadar büyük olursa olsun, kanıtı **küçük ve doğrulaması hızlı** hâle getirir. Gerçekten şaşırtıcı olan kısım budur.

> Bir Groth16 kanıtı (Sapling'in kullandığı sistem) yaklaşık **192 bayt** büyüklüğündedir ve doğrulaması milisaniyeler sürer; *kanıtladığı ifade küçük de olsa devasa da olsa.* Birkaç yüz bayt, binlerce kısıt içeren bir hesaplamayı tasdik edebilir.

Bunları bir araya getirdiğinizde, her yerde göreceğiniz şu kısaltma ortaya çıkar:

> **zk-SNARK** = **z**ero-**k**nowledge **S**uccinct **N**on-interactive **AR**gument of **K**nowledge. Sıfır bilgi (hiçbir şey açığa çıkarmaz), kısa (küçük ve hızlı), etkileşimsiz (tek seferlik), bilgi argümanı (kanıtlayıcı gerçekten geçerli bir tanığı *biliyor*).

---

## 6. Tek bir pürüz: trusted setup

Bedava öğle yemeği yoktur. Birçok SNARK, devre için herkese açık parametreler üreten tek seferlik bir **setup** gerektirir. Setup yan ürün olarak gizli bir rastgelelik de üretir ve bu sırrın **yok edilmesi** gerekir. Eğer biri onu saklarsa, sahte kanıt üretebilir; yani **sahte para** basabilir (ama kritik olarak yine de gizliliği bozamaz).

Bu geride kalan sırra **toxic waste** lakabı verilir. Onu güvenli biçimde bertaraf etmek için Zcash, birçok bağımsız katılımcının rastgelelik katkısında bulunduğu ayrıntılı **çok taraflı törenler** yürüttü; içlerinden *yalnızca birinin bile* kendi parçasını dürüstçe yok etmesi yeterlidir, çünkü bu durumda toxic waste geri kazanılamaz.

![alt text](image-26.png)

Daha yeni sistemler bu gereksinimi tamamen ortadan kaldırır; Zcash'in zaman içinde kanıt sistemini geliştirmesinin en büyük nedenlerinden biri de budur.

---

## 7. Bunun Zcash içindeki yeri

| Tasarım | Kanıt sistemi | Trusted setup? | Üzerine kurulu |
|---|---|---|---|
| **Sprout** (en erken) | erken zk-SNARK | Evet | orijinal tören |
| **Sapling** | **Groth16** | Evet (çok taraflı "Powers of Tau" + Sapling töreni) | **BLS12-381** (Makale 2) |
| **Orchard** (güncel) | **Halo 2** | **Trusted setup yok** | **Pallas / Vesta** (Makale 2) |

Sprout'tan Sapling'e, oradan Orchard'a giden yürüyüş büyük ölçüde kanıtların küçülmesi, hızlanması ve trusted setup gereksiniminden kurtulması hikâyesidir. Orchard tarafından kullanılan **Halo 2**, hiç tören gerektirmez ve *özyinelemeyi* (başka kanıtları doğrulayan kanıtları) desteklemek için tasarlanmıştır; bu yüzden Orchard, Makale 2'deki Pallas/Vesta eğri **döngüsünü** kullanır: her eğri, diğeri üzerinde yazılmış kanıtları doğrulamaya uyarlanmıştır.

Bu, Makale 0'daki en büyük döngüyü kapatır. "Perde arkasındaki" sihir bir **zk-SNARK**'tır: işleminizin, tüm kuralları kodlayan bir aritmetik devreyi sağladığını, "geçerli" tek bitinden başka hiçbir şey açığa çıkarmadan kanıtlar.

---

## 8. Dürüst bir not

Sıfır bilgi kanıtları derin bir alandır ve bilerek sezgi düzeyinde kaldık. Sağlamlıktaki kesin olasılık sınırlarını, aritmetik devrenin tam biçimini (R1CS, PLONKish vb.), polinomlar ve taahhütlerin bir devreyi nasıl kısa bir kanıta dönüştürdüğünü ya da Groth16 ve Halo 2'nin gerçek iç yapısını tanımlamadık. Mağara örneği *etkileşimli* bir kanıttır; üretim sistemleri ise etkileşimsizdir ve çok daha karmaşıktır. Bunların hiçbiri özü değiştirmez: gizli bir tanık tarafından sağlanan bir devreyi eksiksiz, sağlam ve hiçbir şeyi açığa çıkarmadan kanıtlamak. Mekanizmanın kendisi başlı başına ayrı bir seri konusu.

---

## 9. Özet

- Bir **sıfır bilgi kanıtı**, bir kanıtlayıcının bir doğrulayıcıyı bir ifadenin doğru olduğuna, **başka hiçbir şey açığa çıkarmadan** ikna etmesini sağlar; böylece doğrulama-gizlilik paradoksunu çözer.
- Üç güvenceyi sağlamalıdır: **tamlık** (doğru ifadeler ikna eder), **sağlamlık** (yanlış ifadeler edemez) ve **sıfır bilgi** (doğrulayıcı yalnızca "doğru" olduğunu öğrenir).
- Keyfi ifadeler, sonlu bir alan üzerinde **aritmetik devrelere** dönüşür; devreyi sağlayan gizli girdiler ise **tanık (witness)** olur. Sonlu alanların ve ZK-dostu hash'lerin neden önemli olduğu da budur.
- **Fiat-Shamir**, kanıtları **etkileşimsiz** (tek seferlik) yapar; en iyi sistemler ayrıca **kısa**dır (bir Groth16 kanıtı yaklaşık **192 bayt**tır ve ifade boyutundan bağımsız olarak milisaniyelerde doğrulanır). Birlikte: **zk-SNARK**.
- Bazı SNARK'lar, geride kalan **toxic waste**'in yok edilmesi gereken bir **trusted setup** gerektirir (çok taraflı törenler aracılığıyla); bunun ele geçirilmesi gizliliği bozmaz ama para sahteciliğine izin verebilir.
- **Sapling**, **Groth16** kullanır (trusted setup, BLS12-381); **Orchard** ise **Halo 2** kullanır (trusted setup yok, Pallas/Vesta, özyinelemeye uygun).

---

## Sözlük

| Terim | Basit anlamı |
|---|---|
| **Zero-knowledge proof** | Bir ifadenin doğru olduğunu, başka hiçbir şey açığa çıkarmadan birine kabul ettirmek |
| **Prover / Verifier** | Kanıtı oluşturan kişi / onu kontrol eden kişi |
| **Completeness** | Doğru ifadeler her zaman kabul edilir (dürüst bir kanıtlayıcıdan geldiğinde) |
| **Soundness** | Yanlış ifadeler reddedilir (hile yapanlar şans dışında kazanamaz) |
| **Witness** | İfadeyi doğru yapan gizli girdiler |
| **Arithmetic circuit** | Toplama ve çarpma işlemleriyle sonlu bir alan üzerinde yeniden yazılmış bir ifade |
| **Non-interactive (Fiat-Shamir)** | Canlı ileri geri iletişim gerektirmeyen tek seferlik bir kanıt |
| **Succinct** | İfade boyutundan bağımsız olarak küçük ve doğrulaması hızlı bir kanıt |
| **zk-SNARK** | Zero-knowledge Succinct Non-interactive ARgument of Knowledge |
| **Trusted setup / toxic waste** | Geride kalan sırrın yok edilmesi gereken tek seferlik parametre üretimi |

---

## SSS

**Kanıt hiçbir şey açığa çıkarmıyorsa, onu kontrol etmenin nasıl bir anlamı olabilir?**
Çünkü matematik öyle düzenlenmiştir ki, geçerli ve gerçek bir tanık olmadan kontrolü geçen bir kanıt üretilemez. Kontrolü geçmesi, başlı başına delildir; ifşa gerekmez.

**Birisi sahte bir kanıt üretebilir mi?**
Sağlamlık bunu uygulanamaz hâle getirir. Tek istisna, trusted setup sırasında oluşan toxic waste'in saklandığı bir SNARK'tır; işte bu yüzden onu yok etmeye yönelik törenler önemlidir.

**Bozulmuş bir trusted setup benim özel verilerimi sızdırır mı?**
Hayır. Saldırganın *yeni* para sahteciliği yapmasına izin verebilir, ancak miktarları, adresleri veya note'ları **ortaya çıkarmaz**. Gizlilik ve sağlamlık ayrı güvencelerdir.

**Zcash neden zaman içinde kanıt sistemlerini değiştirdi?**
Daha küçük ve daha hızlı kanıtlar elde etmek ve Halo 2 ile birlikte trusted setup gereksinimini tamamen ortadan kaldırıp özyinelemeyi mümkün kılmak için.

---

### Sezginizi test edin

Mağara örneğinde, doğrulayıcının çıkış tarafını *kanıtlayıcı içeri girdikten sonra* seçmesi, bunu önceden söylemek yerine neden zorunludur? *(Yanıt aşağıda.)*

<details><summary>Yanıt</summary>

Doğrulayıcı tarafı önce söyleseydi, gizli sözü bilmeyen bir blöfçü en baştan o tarafa girip rahatça geri çıkabilirdi; kapıya hiç ihtiyaç duymazdı. Seçimin *kanıtlayıcı bir geçide bağlandıktan sonra* yapılması, blöfçüyü şansa güvenmeye zorlar (tur başına 50/50); tekrar eden turları ikna edici yapan da budur. Bu "önce bağlan, sonra meydan okumayla karşılaş" sıralaması, Fiat-Shamir'in meydan okumayı kanıtlayıcının çoktan bağlanmış olduğu kanıtın hash'inden türeterek koruduğu şeyin tam kendisidir.
</details>

---

### Sırada ne var

**Makale 6 . Shielded protokol, uçtan uca:** final. Her parçayı, note'ları, taahhütleri, note taahhüt ağacını, nullifier'ları, değer dengesini ve sıfır bilgi kanıtını alıp tam bir Zcash shielded işlemi oluşturacağız; böylece Makale 0'da açılan her döngüyü tek tek kapatacağız.

*ZecHub için hazırlanan* İlk Prensiplerden Zcash *serisinin bir parçası. CC BY-SA 4.0 lisanslıdır.*
