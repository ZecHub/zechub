---
# ZecHub hackathon geliştirici rehberi

## Özet

- Kod yazmadan önce neden bir şey inşa ettiğini bil, fayda karmaşıklıktan üstündür
- Basit tut, iyi yapılmış küçük bir fikir yarım kalmış büyük bir fikirden daha iyidir
- Zcash altyapı katmanını erkenden öğren, tırmanışın en dik kısmı burasıdır
- Uygulaman fon taşıyorsa mainnet üzerinde çalışmak zorundadır, testnet üzerinde geliştir, sonra bunu mainnet üzerinde kanıtla
- Dokümantasyon ve net bir demo, ürünün kendisinden daha önemli olabilir
- Kazanmak başlangıç çizgisidir, itibarını oluşturur ve toplulukta kapılar açar

<br/>

## Bu rehber kimler için

- İlk kez bir şeyler inşa eden ve bir ZecHub veya Zcash hackathon'una katılanlar
- Başka ekosistemlerden gelip Zcash'e yeni başlayan geliştiriciler
- Bir hackathon projesini kalıcı bir şeye dönüştürmek isteyen herkes

<br/>

## Neden ile başla

Editörünü açmadan önce hangi problemi çözdüğünü ve neden birilerinin bunu önemseyeceğini bil. İyi bir test basittir: İnşa ettiğin şey var olmasaydı, biri onun yokluğunu hisseder miydi? Kendin kullanacağın bir şey inşa et. Zcash'in var olma nedeni gizliliktir; bu yüzden, bir şeyler inşa ettiğin insanlar için gizliliğin neden önemli olduğunu anla ve ardından bunun tüm projeye yön vermesine izin ver.

<br/>

## Önce altyapı katmanını öğren

Diğer zincirlerden gelen geliştiriciler için en yaygın sürpriz, kodlamadan çok Zcash altyapısının öğrenme eğrisidir. Uygulamanı tasarlamadan önce parçaların nasıl bir araya geldiğini anlamak için kendine zaman ver. Genellikle Z'nin küpü olarak adlandırılan temel altyapı katmanıyla başla: zebrad, bir light server ve bir cüzdan. Ardından geliştirici araçlarına aşina ol:

1. Wiki'deki geliştirici sayfasını [zechub.wiki/developers](https://zechub.wiki/developers) adresinden oku, önerilen ilk duraktır
2. Çoğu projenin farklı kategorilerde ihtiyaç duyduğu şeylerin büyük kısmını kapsayan çağrılara sahip zingolib ve zingo-cli'yi incele
3. Daha düşük seviyeli yapı taşları için librustzcash ve referans cüzdan ZODL'e bak
4. Bir FROST projesi için crates.io üzerindeki Zcash Foundation frostd ve frost-core araçlarını kullan ve tanımlar konusunda yardımcı olması için AI'dan faydalan; ancak FROST'u güvenli şekilde kullanmak yine de gerçek emek ve zaman gerektirir

<br/>

## Mainnet'in ne anlama geldiğini anla

Bazı kategoriler uygulamanın Zcash mainnet ile etkileşime girmesini gerektirir. Pratikte bu, projenin ya da onu kullanan birinin, buna bir AI agent da dahil, mainnet üzerinde gerçek fon gönderip alması ya da bunu mümkün kılan araçları inşa edip geliştirmesi anlamına gelir. Uygulaman işlem yapıyorsa, başvurunda bunları mainnet üzerinde gösterme zorunluluğun vardır.

Geliştirme yaparken testnet üzerinde çalış. Mainnet etkinliği gerçek ZEC maliyeti doğurur ve zamanla sadece daha pahalı hale gelecektir, bu yüzden yineleme yapmak için önerilen yer testnet'tir. Nihai kanıt için mainnet'e geç. Akışını tasarlarken bir ayrıntıyı aklında tut: Fonlar shielded bir adrese geldiğinde, cüzdanının onları tarayıp bulması gerekir; ancak ondan sonra harcanabilirler ve bu tarama biraz zaman alır. Gelen fonların hemen kullanılmaya hazır olduğunu varsaymak yerine bu kısa beklemeyi uygulamana dahil et.

<br/>

## Basit tut

Basit ve iyi uygulanmış bir fikir, karmaşık bir fikri birçok kez geride bırakmıştır. Jüri üyeleri, gerçek bir problemi çözdüğü ve anlaşılması kolay olduğu için, aynı etkinlikte teknik olarak daha iddialı bir projeye karşı temel bir kavramın kazandığını gördü. Bitirebileceğini düşündüğünden daha azını üstlen. Ayrıntıları gözden kaçırmak, kapsamı fazla büyütmek ve araştırmayı atlamak, geliştiricilere ödül kaybettiren hatalardır. Temel kavramdan ilk komuta kadar projeni anlamayı ve çalıştırmayı kolaylaştır.

<br/>

## İlk 30 saniyeyi kazan

İnceleyenler güçlü bir ilk izlenimi hızla oluşturur; bu nedenle sunum, konu ve görseller, çözümünün ne kadar yenilikçi olduğu kadar gerçek ağırlık taşır. Dokümantasyon ve net bir demo sonradan akla gelen şeyler değildir. Fikrini aktarmak bazen fikrin kendisinden daha önemlidir; çünkü kimse ne inşa ettiğini anlamazsa başarılı olamaz. Değerlendirme genelde teknik derinlik, kullanıcı deneyimi, özgünlük ve pratik faydayı dengeler ve güçlü dokümantasyon bunların hepsini yükseltir.

<br/>

## Daha zor ve daha az kalabalık kategorilere bak

Daha az kalabalık bir rekabet istiyorsan, daha zor kategorilerde genellikle daha az başvuru olur çünkü onları daha az kişi denemeye girişir. Accounting kategorisi, zincir üstü işlem işleriyle uğraşmak istemeyen yeni başlayanlar için iyi bir seçenektir. FROST güçlüdür ve yeterince kullanılmaz; ayrıca bir proje için güçlü bir temel oluşturur. Topluluk ne inşa edilmesi gerektiğini dayatmaz; bu yüzden sıfırdan başlamak yerine ekosistemin zaten sahip olduğu yetenekli bir araç üzerine inşa etmek akıllıca bir hamledir.

<br/>

## Hackathon'dan sonra

Kazanmak yolun sonu değildir. Kazanmak portföyünü ve itibarını güçlendirir, toplulukta kapılar açar ve teklifler yoluyla fonlamaya götürebilir.

1. Güçlü bir projeyi yol haritası, kilometre taşları ve bütçe gerekçesiyle birlikte ZecHub DAO veya Zcash Community Grants'e sunulacak bir teklife dönüştür
2. Forum, Discord ve X üzerinde toplulukta aktif kal
3. Arborist R and D toplantılarına katıl, fikirlerini paylaş ve geri bildirim iste
4. Kazanamasan bile inşa etmeye devam et ve bir sonraki hackathon'u takip et

<br/>

## İlgili sayfalar

- [Geliştirici Kaynakları](https://zechub.wiki/developers) - Zcash geliştiricileri için ilk durak
- [Zebra Full Node](https://zechub.wiki/zcash-tech/zebra-full-node) - altyapı katmanının tabanındaki düğüm
- [FROST](https://zechub.wiki/zcash-tech/frost) - ileri düzey projeler için eşik imzaları

<br/>

<small>Bu rehber, ZecHub çekirdek katkıcıları squirrel, Dismad ve Tron'un görüşleriyle şekillendi.</small>
