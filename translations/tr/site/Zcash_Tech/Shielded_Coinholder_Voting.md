<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Shielded_Coinholder_Voting.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Sayfayı düzenle"/>
</a>

# Korumalı Coinholder Oylaması

> Ağustos 2026'da Zcash, oy pusulalarının şifreli kaldığı ve yalnızca nihai toplamların açıklandığı, Valar Group tarafından oluşturulan korumalı bir oylama protokolünü kullanan bir coinholder anketi düzenledi.

Bu sayfadan öğrenecekleriniz: Elinizde tuttuğunuz ZEC miktarına göre oyunuzun nasıl ağırlıklandırılabileceği, gizli tutulabileceği ve yine de doğru şekilde sayılabileceği; üstelik hiç kimse nasıl oy kullandığınızı veya ne kadar varlığa sahip olduğunuzu öğrenmeden.

Korumalı coinholder oylaması, Zcash sahiplerinin ekosistemle ilgili sorularda korumalı ZEC kullanarak oy kullanmasını sağlar. Hiç kimse herhangi bir kişinin nasıl oy kullandığını veya elinde ne kadar ZEC bulunduğunu öğrenmez; buna rağmen herkes toplamların doğru olduğunu denetleyebilir. Bu oylama, Valar Group tarafından oluşturulan ve Zcash ana ağından ayrı olan özel bir oylama Zinciri üzerinde çalışır; böylece gerçek fonlarınız asla hareket etmez. Zcash'ın daha genel olarak nasıl karar aldığını öğrenmek için [Zcash Finansman ve Yönetişim genel bakışına](../zcash-community/zcash-governance) göz atın. Bu sayfa yalnızca kriptografik oylama protokolünü ele alır.

Zcash konusunda yeni misiniz? Önce [ZEC nedir ve Zcash](../start-here/what-is-zec-and-zcash), [Korumalı Havuzlar](../using-zcash/shielded-pools) ve [zk-SNARKs](../zcash-tech/zk-snarks) sayfalarını okuyup sonra buraya dönün.

![Korumalı oylama akışı: seçmen, bir anlık görüntüdeki Ironwood bakiyesini kanıtlar ve paylara bölünmüş şifreli oy kullanır; oylar homomorfik olarak sayılır, ardından yalnızca toplamları elde etmek için eşik şifre çözme uygulanır](/content-images/shielded-voting-flow.webp)

## Gizli oylama neden zordur

İyi bir coinholder oylaması aynı anda dört şeyi sağlamalıdır ve bunları sağlamanın bariz yolları birbiriyle çatışır.

1. Stake'e göre ağırlıklandırma; böylece daha fazla ZEC tutmak daha fazla ağırlık taşır.
2. Tercih gizliliği; böylece hiç kimse nasıl oy kullandığınızı öğrenmez.
3. Bakiye gizliliği; böylece hiç kimse ne kadar ZEC tuttuğunuzu öğrenmez.
4. Herkesin kontrol edebileceği, doğru ve denetlenebilir bir sayım.

Stake'e göre ağırlıklandırmak için herkesin bakiyesini bilmeniz gerekiyormuş gibi görünür. Oy pusulalarını saymak içinse onları açmanız gerekiyormuş gibi görünür. Bunlardan herhangi birini en basit şekilde yapmak, tam da [korumalı havuzun](../using-zcash/shielded-pools) korumak üzere tasarlandığı özel bilgileri açığa çıkarır; önceki coin oylamalarında da bu nedenle bakiye bilgileri sızmıştı. Korumalı oylama bu çelişkiyi, korumalı ödemeleri mümkün kılan araçlarla çözer: [sıfır bilgi kanıtları](../zcash-tech/zk-snarks), nullifier'lar ve şifreleme.

## Temel fikir: kendi kendini sayan bir oy sandığı

> Bir turnike, banka kasasının içini görmeden içinden geçenleri saymanızı sağlar. Korumalı bir oy sandığı bir adım daha ileri gider: Mühürlü oyları hiç açmadan toplar.

Üç sıra dışı gücü olan bir oy sandığı hayal edin. Mühürlü bir zarfı açmadan çalışan toplama ekleyebilir. Hiçbiri anahtarı tek başına elinde tutmayan bir yetkililer grubu, daha sonra yalnızca nihai toplamları açıklar. Sandığa bir zarf bırakabilmeniz için önce, hangi coinlerin size ait olduğunu göstermeden, belirli bir geçmiş anda ZEC tuttuğunuzu ve daha önce oy kullanmadığınızı sessizce kanıtlarsınız. Aşağıda anlatılan her şey, bu sandığın gerçekte nasıl oluşturulduğudur.

## Uygunluk ve anlık görüntü

Bir oylama turunda, tek bir Zcash ana ağ bloğu olan bir anlık görüntü yüksekliği belirlenir ve oyunuzun ağırlığı, bu bloktaki [Ironwood](../zcash-tech/ironwood) havuzunda harcanabilir durumda olan korumalı bakiyenizdir. Kural basittir: Anlık görüntü anında her Ironwood ZEC, bir oy demektir. NU7 kapsam anketinde anlık görüntü, 24 Ağustos 2026 saat 19:00 UTC civarındaki 3.459.350 numaralı ana ağ bloğuydu; oylama 14 Eylül 2026 saat 19:00 UTC'ye kadar sürdü. Şeffaf ZEC, bu protokolle değil, eski yöntemle ayrı olarak ele alınır.

1. Fonlarınız asla hareket etmez veya kilitlenmez. Uygunluk anlık görüntüde sabitlenir; dolayısıyla oyunuzu etkilemeden hemen sonrasında ZEC harcayabilir veya taşıyabilirsiniz.
2. Kayıt adımı yoktur. Yalnızca anlık görüntü yüksekliği gerekir; bu da süreci yalın tutar ve kimlerin oy kullanmayı planladığını açığa çıkarmaktan kaçınır.

## Bakiyenizi açığa çıkarmadan kanıtlama

Oy kullandığınızda cüzdanınız, anlık görüntü anında harcanmamış bir miktar korumalı ZEC kontrol ettiğinizi gösteren bir sıfır bilgi kanıtı üretir. Bu kanıt, geçerli bir bakiyenin ve miktarının özel sayım mekanizmasına doğrulanmasını sağlar; ancak hiçbir note'u açığa çıkarmaz ve Zcash ana ağında işlem oluşturmaz.

Bu kanıt, oylama Zinciri üzerinde, anlık görüntü bakiyenize eşit bir oylama kredisi oluşturur. Bu kredi, cüzdanınızın yalnızca bu tur için ürettiği yeni bir oylama anahtarına aittir. Anahtar yeni olduğu ve Zcash adreslerinizle bağlantılı olmadığı için oylama Zinciri üzerindeki hiçbir şey gerçek note'larınıza kadar izlenemez. Zincir üstü kimliğiniz ile oy pusulanız, tasarım gereği ilişkilendirilemez.

## Çifte oylamayı gizliliği koruyarak önleme

Bir kişinin aynı coinlerle iki kez oy kullanmasını önlemek için sistem, bakiyenizin arkasındaki note'ların anlık görüntü anında harcanmamış olduğunu doğrulamalıdır. Ana ağda bu, bir note'un nullifier'ını, yani benzersiz harcama işaretleyicisini açıklayarak yapılır; tam düğümler bu işaretleyicinin yeniden kullanılmadığını kontrol eder. Ancak burada nullifier'ınızı açıklamak, oy pusulanızı doğrudan note'larınıza bağlar.

![Gizliliği koruyarak çift oy kullanımını önleme: nullifier'ı açığa çıkarmak yerine cüzdan, hangi nullifier'ı sorguladığını gizleyerek kanıt materyalini almak için Private Information Retrieval kullanır; ardından note'un harcanmamış olduğunu kanıtlar](/content-images/shielded-voting-pir.webp)

Bu nedenle protokol bunun tersini gizliliği koruyarak kanıtlar. Anlık görüntü itibarıyla kullanılmış her nullifier'ın bir listesini oluşturur ve cüzdanınız, note'unun nullifier'ının bu listede olmadığını sıfır bilgiyle kanıtlar. Böylece hangi note olduğunu açıklamadan note'un harcanmamış olduğunu gösterir.

Bir sorun daha kalır. Listenin gereken bölümünü bir sunucudan almak, nullifier'ınızı sunucuya açığa çıkarır; ayrıca listenin tamamı Orchard dönemine ait veriler için yaklaşık 2 GB boyutundadır ve Zcash büyüdükçe çok daha büyük hâle gelir. [Özel Bilgi Getirme](../zcash-tech/private-information-retrieval) (PIR) her iki sorunu da çözer: Cüzdanınız, hangi veriyi istediğini kriptografik olarak gizlerken yalnızca ihtiyaç duyduğu veriyi alır. Sonuç, yayımlanmış bir nullifier listesi özetiyle karşılaştırılarak doğrulanır; böylece dürüst olmayan bir sunucu sahte bir sonuç üretemez.

## Şifreli oy pusulası kullanma

Cüzdanınız her soru için üç şey yapar.

1. Oyunuzun ağırlığını, homomorfik şifreleme kullanarak sayım komitesine şifreler. Bu, şifreli metinlerin şifreleri çözülmeden birbiriyle toplanmasına imkân veren bir şifreleme türüdür. Böylece sandık, okuyamadığı oyları toplayabilir.
2. Oyunuzu 16 ayrı paya böler; böylece komite tamamen iş birliği yapsa bile herhangi bir kişinin ne kadar oy kullandığını yeniden bir araya getirmekte zorlanır.
3. Payları, rastgele zamanlarda birden fazla sunucu üzerinden gönderir; böylece bir gözlemci, ulaşma zamanlarına bakarak payların aynı seçmene ait olduğunu anlayamaz.

Her pay, geçerli bir oy pusulasının meşru bir parçası olduğunu kanıtlayan kendi sıfır bilgi kanıtını taşır; böylece kimse dayanaksız oy ekleyemez. Doğrulanmış paylar, seçtiğiniz yanıtın şifreli çalışan toplamına homomorfik olarak eklenir.

## Hiçbir oy pusulasını açmadan sayım

Sayımı dağıtık bir seçim yetkilisi yürütür: En az 10 oylama Zinciri doğrulayıcısı bulunur ve bunların hiçbiri tek başına herhangi bir şeyin şifresini çözemez. Turun başında, eşleşen şifre çözme anahtarını aralarında paylaştıran ve hiçbir yerde bir araya getirmeyen bir anahtar oluşturma töreni düzenlerler.

> Hiçbir yetkili anahtarı tek başına elinde tutmaz. Sandık yalnızca yetkililerin üçte ikisi anahtarlarını birlikte kullandığında açılır; o zaman bile yalnızca toplamları gösterir.

Tur sona erdiğinde, yukarıda açıklanan homomorfik toplama sayesinde şifreli toplamlar zaten hazırdır. Her doğrulayıcı, kısmi bir şifre çözme sonucu ve bunu doğru şekilde gerçekleştirdiğini gösteren bir kanıt yayımlar. En az üçte ikisi katkıda bulunduğunda, bu parçalar her soru için nihai açık metin toplamında birleştirilir; başka hiçbir şeyin şifresi çözülmez. Her tam düğüm birleştirilmiş doğruluk kanıtını kontrol edebilir; böylece herkes doğrulayıcılara güvenmek zorunda kalmadan sayımı doğrulayabilir.

## Kimler yürütür ve neleri yapamazlar

Tasarım, hiçbir grubun aşırı güce sahip olmaması için iki rolü birbirinden ayırır.

![Kuvvetler ayrılığı: koordinatör multisig hangi soruların görüneceğini belirler ancak oyları göremez; doğrulayıcı kümesi sayım yapar ancak bireysel oyları okuyamaz veya toplamı sahteleyemez](/content-images/shielded-voting-roles.webp)

Koordinatör çoklu imza grubu 2/5 yapısındadır ve Project Tachyon, [Zcash Foundation](../zcash-organizations/zcash-foundation), ZODL, [Shielded Labs](../zcash-organizations/shielded-labs) ve Valar Group temsilcilerinden oluşur. Hangi soruların Zincir'e ulaşacağına karar verir ve her turun şifreleme anahtarını tasdik eder; ancak bireysel oyları göremez, değiştiremez veya engelleyemez. Sorulardan hoşlanmayan herkes kendi oylama Zinciri'ni çalıştırabilir; çünkü yazılım açık ve izin gerektirmez.

Doğrulayıcılar, bölünmüş şifre çözme anahtarını elinde tutan ve eşik şifre çözme işlemini gerçekleştiren en az 10 düğümdür. Her şifre çözme işlemi herkese açık bir doğruluk kanıtıyla birlikte sunulduğundan, bireysel oy pusulalarının şifresini çözemez veya sahte bir toplam üretemezler.

## Yeter sayının amacı

Düzenleyiciler bir katılım eşiği belirler: Çekimser oylar dâhil, en az 1.000.000 ZEC herhangi bir soruya katılırsa anket sonuçları coinholder'ları temsil ediyor kabul edilir. Yeter sayı hiçbir soruya karar vermez ve soru başına uygulanmaz. Tüm anket için tek bir kontroldür; böylece bir sonucun ciddiye alınması için kayda değer miktarda ZEC katılımı gerekir. Bu seviyenin altında sonuç, anlamlı bir gösterge kabul edilmez.

## Bu protokol neleri korumaz

Tasarımın sınırlarını açıkça belirtmek, onu anlamanın bir parçasıdır.

1. Bu, bağlayıcı bir karar değil, bir göstergedir. Coinholder anketi, stake'e göre ağırlıklandırılmış eğilimi ölçer ve Zcash'ın olağan [yönetişim sürecine](../zcash-community/zcash-governance) katkı sağlar; onun yerini almaz.
2. Ağırlık coin miktarına göre belirlenir; dolayısıyla etki, elde tutulan varlıkları izler. Daha az zahmetli olması katılımı artırabilir, ancak ZEC yoğunlaşmasını değiştirmez.
3. Gündemi, hangi soruların yer alacağını seçen koordinatör çoklu imza grubu belirler. Oyları etkileyemez ve herkes rakip bir Zincir çalıştırabilir; ancak gündem belirleme yine de bir etki noktasıdır.
4. Sayım için doğrulayıcıların çevrimiçi olması gerekir. Toplamı üretmek için en az üçte ikisinin iş birliği yapması gerekir; bu nedenle büyük çaplı bir kesinti veya eş güdümlü bir ret sonucu geciktirebilir.
5. Tam iş birliği durumunda bakiye gizliliği bir teorem değil, katmanlı bir savunmadır. Komitenin tamamı gizlice anahtarı yeniden oluşturursa, bakiyenizi koruyan önlemler paylara bölme ve zamanlanmış gönderimdir; tasarımcılar bunların iş birliği durumunda daha zayıf olduğunu kabul eder. Gelişmiş trafik analizi artık bir risk olmaya devam eder.
6. Eski tasarıma kıyasla daha fazla hareketli parça vardır. PIR sunucuları, gönderim sunucuları, yeni bir oylama anahtarı ve çok aşamalı kanıtların her biri hata veya yanlış yapılandırma kaynağı olabilir. Sistem açık kaynaklıdır ve bazı bileşenler bağımsız olarak denetlenmiştir; bu, riski ortadan kaldırmaz ama yönetir.

Güçlü ve doğrulanabilir biçimde koruduğu en önemli iki şey şunlardır: Oy pusulanız kimliğinize bağlanamaz ve yalnızca nihai toplamlar açıklanır.

## Terimler sözlüğü

| Terim | Sade açıklaması |
|---|---|
| Voting chain | Valar Group tarafından oluşturulan ve oylamayı yürüten ayrı bir blokzincir; Zcash note'larınız buraya taşınmaz |
| Snapshot height | Oylama ağırlığını belirleyen ana ağ bloğu (NU7 anketi için 3.459.350 numaralı blok) |
| Nullifier | Bir note'un benzersiz harcama işaretleyicisi; açıklanması oy pusulasını note'a bağlayacağından oylama bunun yerine listede bulunmadığını kanıtlar |
| Private Information Retrieval (PIR) | Hangi veriyi istediğinizi gizlerken bir sunucudan veri alma yöntemi |
| Homomorphic encryption | Şifreli metinlerin şifreleri çözülmeden birbiriyle toplanmasına imkân veren şifreleme |
| Coordinator multisig | Soruları ve tur anahtarını yetkilendiren, ancak oyları göremeyen veya değiştiremeyen 2/5 grubu |
| Election authority | Bölünmüş şifre çözme anahtarını birlikte elinde tutan ve yalnızca nihai toplamı açıklayan 10 veya daha fazla doğrulayıcı |
| Threshold decryption | Burada anahtar payı sahiplerinin üçte ikisi gibi yeterli sayıda kişinin iş birliği yapmasıyla bir sonucu elde etme |
| Quorum | Anketin temsil edici sayılması için gereken 1.000.000 ZEC asgari katılımı |

## Sık sorulan sorular

Oy kullanırken coinlerim hareket eder veya kilitlenir mi? Hayır. Uygunluk anlık görüntü bloğunda ölçülür; ZEC yerinde kalır ve harcanabilir. Oylama, Zcash işlemi değil, ayrı bir Zincir üzerinde kanıtlar üretir.

Nasıl oy kullandığımı veya ne kadar varlığım olduğunu biri anlayabilir mi? Hayır. Oy pusulaları şifrelenir ve yalnızca toplam sonuçların şifresi çözülür. Oyunuz kimliğinizle ilişkilendirilemez; bakiyeniz de iş birliği yapan bir komiteye karşı koruma sağlamak için zamanlanmış 16 paya bölünür.

Bir kişinin iki kez oy kullanmasını veya sahip olmadığı coinlerle oy vermesini ne engeller? Her oy pusulası, gerçek ve harcanmamış bir anlık görüntü bakiyesiyle desteklendiğini gösteren sıfır bilgi kanıtları taşır. PIR tabanlı listede bulunmama kanıtı ise hangi note olduğunu açıklamadan, dayanak olan note'un daha önce harcanmadığını gösterir.

Oyları kim sayar? En az 10 doğrulayıcıdan oluşan dağıtık bir grup; bunların hiçbiri tek başına hiçbir şeyin şifresini çözemez. Toplamları açıklamak için üçte ikisinin iş birliği gerekir ve her şifre çözme işlemi herkese açık bir doğruluk kanıtıyla birlikte sunulur.

Sonuç bağlayıcı mı? Bu, stake'e göre ağırlıklandırılmış bir coinholder eğilimi göstergesidir. Zcash'ın olağan yönetişim sürecini bilgilendirir; değişikliği otomatik olarak yürürlüğe koymaz.

Bunu kendim çalıştırabilir veya denetleyebilir miyim? Evet. Oylama Zinciri yazılımı, devreler, PIR sistemi ve toplam denetleyicisi, herkesin inceleyip çalıştırabilmesi için Valar Group tarafından yayımlanmıştır.

## Anlayıp anlamadığınızı sınayın

Her oy pusulası şifreliyse ve her seçmen anonimse, yayımlanan toplamların doğru olduğundan ve hiç kimsenin iki kez oy kullanmadığından herkes nasıl emin olabilir?

<details>
<summary>Yanıt</summary>

Bu işi üç kanıt yapar. Her oy pusulası, gerçek bir anlık görüntü bakiyesiyle desteklendiğini gösteren bir sıfır bilgi kanıtı taşır; böylece dayanaksız oylar sayılmaz. PIR tabanlı listede bulunmama kanıtı, note'u açığa çıkarmadan arkasındaki note'un harcanmamış olduğunu gösterir ve çifte oylamayı önler. Doğrulayıcılar toplamların şifresini çözdüğünde ise her biri bir doğruluk kanıtı yayımlar; böylece her tam düğüm, nihai sayıların şifreli oy pusulalarından dürüstçe elde edildiğini doğrulayabilir.
</details>

## Kaynaklar

- [NU7 Coinholder Oylaması duyurusu (Valar Group ve Project Tachyon)](https://forum.zcashcommunity.com/t/nu7-coinholder-vote/56912) - anketin kapsamını, anlık görüntü yüksekliğini ve takvimini belirleyen forum gönderisi
- [Coinholder Oylama Zinciri: teknik tasarım](https://forum.zcashcommunity.com/t/the-coinholder-voting-chain/56925) - bu sayfanın dayandığı protokol açıklaması
- [Valar Group korumalı oylama belgeleri](https://valargroup.gitbook.io/shielded-vote-docs) - oylama Zinciri için güncel başvuru kaynağı
- [Valar Group oylama kodu ve denetimleri (GitHub)](https://github.com/valargroup/vote-sdk) - açık kaynaklı uygulama ve denetimleri

## İlgili sayfalar

- [Özel Bilgi Getirme](../zcash-tech/private-information-retrieval) - özel çifte oy önlemesinin temelindeki listede bulunmama kanıtı tekniği
- [Ironwood](../zcash-tech/ironwood) - bakiyeleri oy ağırlığını belirleyen korumalı havuz
- [zk-SNARKs](../zcash-tech/zk-snarks) - bakiye ve uygunluk kanıtlarının temelindeki kanıt sistemi
- [Korumalı Havuzlar](../using-zcash/shielded-pools) - korumalı bakiyenin ne olduğu ve neden gizli kaldığı
- [Zcash Finansman ve Yönetişim genel bakışı](../zcash-community/zcash-governance) - bu eğilim göstergesinin Zcash'ın daha genel karar alma sürecine nasıl katkı sağladığı
- [Shielded Labs](../zcash-organizations/shielded-labs) - koordinatör çoklu imza grubunun beş üyesinden biri
