<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Shielded_Coinholder_Voting.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Sayfayı Düzenle"/>
</a>

# Shielded Coinholder Oylaması

> Ağustos 2026'da Zcash, oy pusulalarının şifreli kaldığı ve yalnızca nihai toplamların açıklandığı, Valar Group tarafından geliştirilen shielded bir oylama protokolünü kullanarak coin sahipleri arasında bir anket düzenledi.

Bu sayfadan öğrenecekleriniz: Ne kadar ZEC tuttuğunuza göre ağırlıklandırılmış bir oyun nasıl gizli tutulup yine de doğru şekilde sayılabileceği; hiç kimse nasıl oy verdiğinizi veya ne kadar varlığa sahip olduğunuzu öğrenmeden.

Shielded coinholder oylaması, Zcash sahiplerinin shielded ZEC kullanarak ekosistemle ilgili sorularda oy vermesini sağlar. Hiç kimse bireysel bir kişinin neye oy verdiğini veya ne kadar ZEC tuttuğunu öğrenmez; buna rağmen herkes toplamların doğru olduğunu denetleyebilir. Valar Group tarafından geliştirilen, Zcash ana ağından ayrı özel bir oylama zincirinde çalışır; böylece gerçek fonlarınız asla hareket etmez. Zcash'in daha geniş ölçekte nasıl karar aldığı için [Zcash Funding and Governance genel bakışına](../zcash-community/zcash-governance) bakın. Bu sayfa yalnızca kriptografik oylama protokolü hakkındadır.

Zcash'e yeni misiniz? Önce [ZEC nedir ve Zcash](../start-here/what-is-zec-and-zcash), [Shielded Pools](../using-zcash/shielded-pools) ve [zk-SNARKs](../zcash-tech/zk-snarks) sayfalarından başlayın; ardından buraya dönün.

![Shielded voting flow: a voter proves their Ironwood balance at a snapshot, casts an encrypted ballot split into shares, which are homomorphically tallied and then threshold-decrypted into totals only](/content-images/shielded-voting-flow.webp)

## Özel oylama neden zordur

İyi bir coinholder oylaması aynı anda dört şey ister ve bunları elde etmenin bariz yolları birbiriyle çelişir.

1. Paya göre ağırlıklandırma; böylece daha fazla ZEC tutmak daha fazla ağırlık taşır.
2. Tercih gizliliği; böylece hiç kimse nasıl oy verdiğinizi öğrenmez.
3. Bakiye gizliliği; böylece hiç kimse ne kadar ZEC tuttuğunuzu öğrenmez.
4. Herkesin kontrol edebileceği doğru ve denetlenebilir bir sayım.

Paya göre ağırlıklandırmak için herkesin bakiyesine ihtiyacınız varmış gibi görünür. Oy pusulalarını saymak için de onları açmanız gerekiyormuş gibi görünür. Bunlardan herhangi birini naif biçimde yapmak, bir [shielded havuzun](../using-zcash/shielded-pools) korumak için var olduğu özel bilgileri tam olarak açığa çıkarır; önceki coin oylamaları da bu nedenle bakiye bilgilerini sızdırdı. Shielded oylama, shielded ödemelere güç veren aynı araçlarla bu gerilimi çözer: [sıfır bilgi kanıtları](../zcash-tech/zk-snarks), nullifier'lar ve şifreleme.

## Sezgi: Kendisini sayan bir oy sandığı

> Bir turnike, bir banka kasasından geçenleri içeriyi görmeden saymanızı sağlar. Shielded bir oy sandığı bir adım daha ileri gider: Mühürlü oyları hiç açmadan toplar.

Üç sıra dışı güce sahip bir oy sandığı düşünün. Mühürlü bir zarfı açmadan, devam eden toplama ekleyebilir. Anahtarı tek başına hiçbirinin elinde bulunmayan bir grup görevli, daha sonra yalnızca nihai toplamları açıklar. Siz zarfınızı atmadan önce ise, hangi coin'lerin size ait olduğunu göstermeden, sabit bir geçmiş anda ZEC tuttuğunuzu ve henüz oy kullanmadığınızı gizlice kanıtlarsınız. Aşağıda, bu sandığın gerçekte nasıl inşa edildiği anlatılmaktadır.

## Uygunluk ve anlık görüntü

Bir oylama turu bir anlık görüntü yüksekliği, yani tek bir Zcash ana ağ bloğu belirler; oyunuzun ağırlığı, o bloktaki [Ironwood](../zcash-tech/ironwood) havuzunda harcanabilir shielded bakiyenizdir. Kural basittir: Anlık görüntüdeki bir Ironwood ZEC, bir oya eşittir. NU7 kapsam anketinde anlık görüntü, 24 Ağustos 2026 saat 19:00 UTC civarındaki 3.459.350 numaralı ana ağ bloğuydu; oylama ise 14 Eylül 2026 saat 19:00 UTC'ye kadar açıktı. Şeffaf ZEC, bu protokolle değil eski yöntemle ayrı olarak ele alınır.

1. Fonlarınız asla hareket etmez ve kilitlenmez. Uygunluk anlık görüntüde sabitlenir; bu nedenle oyunuzu etkilemeden ZEC'i hemen sonrasında harcayabilir veya taşıyabilirsiniz.
2. Kayıt adımı yoktur. Yalnızca bir anlık görüntü yüksekliği gerekir; bu da süreci hafif tutar ve kimin oy vermeyi planladığını açığa çıkarmaz.

## Bakiyenizi açıklamadan kanıtlama

Oy verdiğinizde cüzdanınız, anlık görüntüde harcanmamış bazı shielded ZEC'leri kontrol ettiğinize dair bir sıfır bilgi kanıtı üretir. Bu kanıt, özel sayım mekanizmasına geçerli bir bakiyeyi ve büyüklüğünü belirler; ancak hiçbir notu açığa çıkarmaz ve Zcash ana ağında işlem oluşturmaz.

Bu kanıt, oylama zincirinde anlık görüntü bakiyenize eşit bir oylama kredisi basar ve bu kredi, cüzdanınızın yalnızca bu tur için ürettiği yeni bir oylama anahtarına aittir. Anahtar yeni olduğundan ve Zcash adreslerinize bağlı olmadığından, oylama zincirindeki hiçbir şey gerçek notlarınıza kadar izlenemez. Zincir üstü kimliğiniz ile oy pusulanız tasarım gereği birbirine bağlanamaz.

## Çifte oylamayı özel olarak önleme

Kimsenin aynı coin'lerle iki kez oy vermesini engellemek için sistem, bakiyenizin arkasındaki notların anlık görüntüde harcanmamış olduğunu doğrulamalıdır. Ana ağda bu, bir notun benzersiz harcama işaretleyicisi olan nullifier'ını açığa çıkararak yapılır; tam düğümler bunun yeniden kullanımını kontrol eder. Ancak nullifier'ınızı burada açığa çıkarmak, oy pusulanızı doğrudan notlarınıza bağlardı.

![Private double-vote prevention: instead of revealing a nullifier, the wallet uses Private Information Retrieval to fetch proof material while hiding which nullifier it asked about, then proves the note was unspent](/content-images/shielded-voting-pir.webp)

Bu nedenle protokol, tersini özel olarak kanıtlar. Anlık görüntü itibarıyla kullanılmış her nullifier'ın bir listesini oluşturur ve cüzdanınız, notunuzun nullifier'ının bu listede olmadığını sıfır bilgiyle kanıtlar; böylece hangi not olduğunu açıklamadan notun harcanmamış olduğunu gösterir.

Bir sorun daha kalır. Bu listenin gerekli bölümünü bir sunucudan almak nullifier'ınızı sunucuya açık ederdi; listenin tamamı ise büyüktür: Orchard dönemi verileri için yaklaşık 2 GB ve Zcash büyüdükçe çok daha fazlası. [Private Information Retrieval](../zcash-tech/private-information-retrieval) (PIR) her ikisini de çözer: Cüzdanınız, istediği veriyi kriptografik olarak gizlerken tam olarak ihtiyaç duyduğu veriyi alır. Sonuç, nullifier listesinin yayımlanmış bir özetiyle kontrol edilir; dolayısıyla dürüst olmayan bir sunucu sahte bir sonuç üretemez.

## Şifreli oy pusulası kullanma

Cüzdanınız her soru için üç şey yapar.

1. Oy ağırlığınızı sayım komitesine homomorfik şifrelemeyle şifreler; bu, şifreli metinleri şifresi çözülmeden birbirine eklenebilen bir şifreleme türüdür. Bu, sandığın okuyamadığı oyları toplamasını sağlar.
2. Oyunuzu 16 ayrı paya böler; böylece tamamen iş birliği yapan bir komitenin bile herhangi bir kişinin ne kadar oy kullandığını yeniden birleştirmesi zorlaşır.
3. Bu payları birden fazla sunucu üzerinden rastgeleleştirilmiş zamanlarda gönderir; böylece bir gözlemci, varış zamanlarından payların aynı seçmene ait olduğunu anlayamaz.

Her pay, geçerli bir oy pusulasının meşru parçası olduğuna dair kendi sıfır bilgi kanıtını taşır; dolayısıyla hiç kimse dayanağı olmayan oylar ekleyemez. Doğrulanmış paylar, seçtiğiniz yanıt için şifrelenmiş devam eden toplama homomorfik olarak eklenir.

## Hiçbir oy pusulasını açmadan sayma

Sayım, dağıtılmış bir seçim otoritesi tarafından yürütülür: En az 10 oylama zinciri doğrulayıcısı; bunların hiçbiri tek başına herhangi bir şeyin şifresini çözemez. Turun başında, eşleşen çözme anahtarı hepsine bölünmüş ve tek bir yerde asla bir araya getirilmeyen bir şifreleme anahtarı üreten ortak bir anahtar oluşturma töreni düzenlerler.

> Anahtar tek bir görevlinin elinde değildir. Sandık yalnızca üçte ikisi anahtarlarını birlikte kullandığında açılır ve o zaman bile yalnızca toplamları açıklar.

Tur kapandığında, şifrelenmiş toplamlar yukarıdaki homomorfik ekleme sayesinde zaten mevcuttur. Her doğrulayıcı kısmi bir şifre çözümünü ve doğru çözdüğüne dair bir kanıtı yayımlar. En az üçte ikisi katkıda bulunduğunda, parçaları her soru için nihai açık metin sayımında birleşir ve başka hiçbir şeyin şifresi asla çözülmez. Herhangi bir tam düğüm daha sonra birleştirilmiş doğruluk kanıtını kontrol edebilir; böylece halk, doğrulayıcılara güvenmeden sayımı doğrulayabilir.

## Sistemi kim yürütür ve ne yapamazlar

Tasarım, hiçbir grubun aşırı güce sahip olmaması için iki rolü ayırır.

![Separation of powers: a coordinator multisig sets which questions appear but cannot see votes, while a validator set counts but cannot read individual ballots or forge a tally](/content-images/shielded-voting-roles.webp)

Koordinatör multisig, Project Tachyon, [Zcash Foundation](../zcash-organizations/zcash-foundation), ZODL, [Shielded Labs](../zcash-organizations/shielded-labs) ve Valar Group temsilcilerinden oluşan 2/5'lik bir gruptur. Hangi soruların zincire ulaşacağına karar verir ve her turun şifreleme anahtarını tasdik eder; ancak bireysel oyları göremez, değiştiremez veya engelleyemez. Soruları beğenmeyen herkes, yazılım açık ve izinsiz olduğundan kendi oylama zincirini çalıştırabilir.

Doğrulayıcılar, bölünmüş çözme anahtarını tutan ve eşik şifre çözümünü gerçekleştiren en az 10 düğümdür. Bireysel oy pusulalarının şifresini çözemez veya sahte bir sayım üretemezler; çünkü her şifre çözümü herkese açık bir doğruluk kanıtıyla gelir.

## Yeter sayının amacı

Organizatörler bir katılım eşiği belirler: Anket sonuçları, en az 1.000.000 ZEC en az bir soruya katılırsa, çekimser oylar dahil, coin sahiplerini temsil ediyor kabul edilir. Yeter sayı hiçbir soruyu karara bağlamaz ve soru başına uygulanmaz. Tüm anket için tek bir kontroldür; dolayısıyla sonuç, yalnızca önemli miktarda ZEC katıldığında ciddiye alınır. Bu seviyenin altında, sonuç anlamlı bir sinyal sayılmaz.

## Bu protokolün korumadığı şeyler

Tasarımı anlamanın bir parçası da sınırları açıkça bilmektir.

1. Bu bir sinyaldir, bağlayıcı bir karar değildir. Coinholder anketi, paya göre ağırlıklandırılmış duyarlılığı ölçer ve Zcash'in normal [yönetişim sürecini](../zcash-community/zcash-governance) değiştirmek yerine ona katkı sağlar.
2. Coin ağırlıklıdır; dolayısıyla etki varlıkları takip eder. Daha düşük sürtünme katılımı artırabilir ancak ZEC yoğunlaşmasını değiştirmez.
3. Gündem, hangi soruların yer alacağını seçen koordinatör multisig tarafından belirlenir. Multisig oylara dokunamaz ve herkes rakip bir zincir çalıştırabilir; ancak gündem belirleme yine de bir etki noktasıdır.
4. Sayım için doğrulayıcıların çevrimiçi olması gerekir. Sayımın üretilmesi, bunların en az üçte ikisinin iş birliğini gerektirir; bu nedenle büyük bir kesinti veya koordineli ret sonucu geciktirebilir.
5. Tam iş birliği altında bakiye gizliliği bir teorem değil, derinlemesine savunmadır. Komitenin tamamı anahtarı gizlice yeniden oluştursaydı, bakiyenizi koruyan şey paylara bölme ve zamanlamalı gönderim olurdu; tasarımcılar bunların iş birliği altında daha zayıf olduğunu kabul eder. Gelişmiş trafik analizi kalıcı bir risktir.
6. Eski tasarımdan daha fazla hareketli parça vardır. PIR sunucuları, gönderim sunucuları, yeni bir oylama anahtarı ve çok aşamalı kanıtların her biri, hata veya yanlış yapılandırmanın ortaya çıkabileceği bir yerdir. Sistem açık kaynaklıdır ve parçaları bağımsız olarak denetlenmiştir; bu, riski ortadan kaldırmak yerine yönetir.

Güçlü ve doğrulanabilir biçimde koruduğu iki önemli şey şudur: Oy pusulanız kimliğinize bağlanamaz ve yalnızca nihai toplamlar açıklanır.

## Sözlük

| Terim | Sade dilde anlamı |
|---|---|
| Voting chain | Valar Group tarafından geliştirilen ve oylamayı yürüten ayrı bir blok zinciri; Zcash notlarınız asla buna taşınmaz |
| Snapshot height | Bakiyeleri oylama ağırlığını belirleyen ana ağ bloğu (NU7 anketi için 3.459.350. blok) |
| Nullifier | Bir notun benzersiz harcama işaretleyicisi; bunu açıklamak oy pusulasını nota bağlardı, bu yüzden oylama bunun yerine listede olmadığını kanıtlar |
| Private Information Retrieval (PIR) | Hangi veriyi istediğinizi gizlerken bir sunucudan veri alma |
| Homomorphic encryption | Şifreli metinleri şifresi çözülmeden birbirine eklenebilen şifreleme |
| Coordinator multisig | Soruları ve tur anahtarını yetkilendiren, ancak oyları göremeyen veya değiştiremeyen 2/5'lik grup |
| Election authority | Bölünmüş çözme anahtarını birlikte tutan ve yalnızca nihai sayımı açıklayan 10 veya daha fazla doğrulayıcı |
| Threshold decryption | Yalnızca yeterli sayıda anahtar payı sahibinin, burada üçte ikisinin, iş birliği yapmasıyla sonucun elde edilmesi |
| Quorum | Anketin temsil edici sayılması için gereken 1.000.000 ZEC asgari katılım |

## SSS

Oy verdiğimde coin'lerim hareket eder veya kilitlenir mi? Hayır. Uygunluk anlık görüntü bloğunda ölçülür; dolayısıyla ZEC yerinde ve harcanabilir kalır. Oylama, Zcash işlemi değil, ayrı bir zincir üzerinde kanıtlar üretir.

Herhangi biri nasıl oy verdiğimi veya ne kadar tuttuğumu anlayabilir mi? Hayır. Oy pusulaları şifrelidir ve yalnızca toplam sonuçların şifresi çözülür. Oyunuz kimliğinize bağlanamaz; bakiyeniz ise iş birliği yapan bir komiteye karşı bile korunması için zamanlamalı 16 paya bölünür.

Bir kişinin iki kez oy vermesini veya sahip olmadığı coin'lerle oy vermesini ne engeller? Her oy pusulası, gerçek ve harcanmamış bir anlık görüntü bakiyesiyle desteklendiğine dair sıfır bilgi kanıtları taşır; PIR tabanlı listede olmama kanıtı da hangi not olduğunu açıklamadan temel notun daha önce harcanmadığını gösterir.

Oyları kim sayar? En az 10 doğrulayıcıdan oluşan dağıtılmış bir küme; bunların hiçbiri tek başına herhangi bir şeyin şifresini çözemez. Toplamları açıklamak için üçte ikisinin iş birliği gerekir ve her şifre çözümü herkese açık bir doğruluk kanıtıyla gelir.

Sonuç bağlayıcı mı? Bu, paya göre ağırlıklandırılmış bir coinholder duyarlılık sinyalidir. Bir değişikliği otomatik olarak yürürlüğe koymak yerine Zcash'in normal yönetişimini bilgilendirir.

Bunu kendim çalıştırabilir veya denetleyebilir miyim? Evet. Oylama zinciri yazılımı, devreler, PIR sistemi ve bir sayım denetleyicisi, herkesin incelemesi ve çalıştırması için Valar Group tarafından yayımlanmıştır.

## Bilginizi test edin

Her oy pusulası şifreliyse ve her seçmen anonimse, herkes yayımlanan toplamların doğru olduğundan ve hiç kimsenin iki kez oy vermediğinden nasıl emin olabilir?

<details>
<summary>Yanıt</summary>

Üç kanıt işi yapar. Her oy pusulası, gerçek bir anlık görüntü bakiyesiyle desteklendiğine dair sıfır bilgi kanıtı taşır; böylece dayanağı olmayan oylar sayılmaz. PIR tabanlı listede olmama kanıtı, arkasındaki notun harcanmamış olduğunu gösterir ve notu açıklamadan çifte oylamayı önler. Doğrulayıcılar toplamların şifresini çözdüğünde ise her biri bir doğruluk kanıtı yayımlar; böylece herhangi bir tam düğüm, nihai sayıların şifreli oy pusulalarından dürüstçe çözüldüğünü doğrulayabilir.
</details>

## Kaynaklar

- [NU7 Coinholder Vote duyurusu (Valar Group ve Project Tachyon)](https://forum.zcashcommunity.com/t/nu7-coinholder-vote/56912) - anketin kapsamını, anlık görüntü yüksekliğini ve takvimini belirleyen forum gönderisi
- [The Coinholder Voting Chain: teknik tasarım](https://forum.zcashcommunity.com/t/the-coinholder-voting-chain/56925) - bu sayfanın dayandığı protokol açıklaması
- [Valar Group shielded oylama belgeleri](https://valargroup.gitbook.io/shielded-vote-docs) - oylama zinciri için güncel tutulan referans
- [Valar Group oylama kodu ve denetimleri (GitHub)](https://github.com/valargroup/vote-sdk) - açık kaynak uygulama ve denetimleri

## İlgili sayfalar

- [Private Information Retrieval](../zcash-tech/private-information-retrieval) - özel çifte oy önlemenin arkasındaki listede olmama kanıtlama tekniği
- [Ironwood](../zcash-tech/ironwood) - bakiyeleri oy ağırlığını belirleyen shielded havuz
- [zk-SNARKs](../zcash-tech/zk-snarks) - bakiye ve uygunluk kanıtlarının arkasındaki kanıt sistemi
- [Shielded Pools](../using-zcash/shielded-pools) - shielded bakiyenin ne olduğu ve neden gizli kaldığı
- [Zcash Funding and Governance genel bakışı](../zcash-community/zcash-governance) - bu duyarlılık sinyalinin Zcash'in daha geniş karar sürecine nasıl katkı sağladığı
- [Shielded Labs](../zcash-organizations/shielded-labs) - koordinatör multisig'in beş üyesinden biri
