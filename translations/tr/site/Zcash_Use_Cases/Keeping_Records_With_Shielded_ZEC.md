# Shielded ZEC ile kayıt tutmak

## TL;DR

- Shielded fonlar özeldir, ancak yine de düzenli ve eksiksiz finansal kayıtlar tutabilirsiniz
- Memo’lar, bir fatura numarası veya ödemenin ne için yapıldığı gibi, muhasebe defterinizdeki satır kalemleri gibi işlev görür
- Bir viewing key, sizin ya da seçtiğiniz birinin, örneğin bir muhasebecinin, geçmişinizi herkese açık hâle getirmeden incelemesini sağlar
- Herhangi bir dönem için gelir ve harcamaları toplamlandırabilirsiniz; raporlama veya vergi için gereken de budur
- Bunların hiçbiri gizliliğinizi zayıflatmaz, çünkü neyi kimin göreceğine siz karar verirsiniz

<br/>

## Bu kimin için?

- ZEC ile ödeme alan serbest çalışanlar ve küçük işletmeler
- Gizliliğini korurken muhasebe kaydı tutması gereken herkes
- Bir muhasebeci veya vergi için kayıt hazırlayan kişiler

<br/>

## Zorluk

Gizlilik ve kayıt tutma birbirinin zıttı gibi gelebilir. İşlemleriniz shielded ise, tutarlar ve adresler kamuya açık şekilde gizlenir; peki o zaman nasıl düzgün muhasebe tutulur ya da geliriniz bir muhasebeciye nasıl gösterilir?

Zcash ile bu sahte bir ikilemdir. Shielded işlemler etkinliğinizi varsayılan olarak herkesten gizler, ancak Zcash aynı zamanda kendi kayıtlarınızı ihtiyaç duyan kişilere, kendi belirlediğiniz şartlarla açıklamanız için araçlar da sunar. Dünyaya karşı özel kalır, aynı anda muhasebecinize karşı açık olursunuz.

<br/>

## Memo’lar sizin muhasebe defterinizdir

Her shielded (z’den z’ye) işlem, şifreli bir [memo](/using-zcash/memos) taşıyabilir. Kayıt tutma açısından memo, ödemenin ne için yapıldığını yazdığınız yerdir: bir fatura numarası, müşteri adı, proje kodu veya "Mart kirası" gibi kısa bir not.

Memo işlemle birlikte taşındığı ve yalnızca ilgili taraflarca okunabildiği için, kayıtlarınızda özel bir satır kalemine dönüşür. Siz veya müşteriniz her ödemeye açık bir memo eklediğinizde, işlem geçmişiniz bağlamı olmayan tutarlar listesinden çıkıp kullanılabilir bir muhasebe defterine dönüşür.

Basit bir alışkanlık: müşterilerle, memo alanına her zaman fatura numarasını ekleme konusunda anlaşın. Böylece daha sonra ödemeleri faturalarla eşleştirmek çok daha kolay olur.

<br/>

## Kendi geçmişinizi incelemek

Muhasebe kaydı tutmak için kendi etkinliğinizi görmeniz gerekir. Cüzdanınız shielded işlemlerinizi çözen anahtarları tutar, bu yüzden cüzdanınız size tam resmi gösterebilir: tarihler, tutarlar, hangilerinin alındığı, hangilerinin gönderildiği ve eklenen memo’lar.

Bu, kamunun göremediği ama sizin görebildiğiniz kısımdır, çünkü veriler size aittir. Geçmişinizi yıl sonunda değil de düzenli olarak gözden geçirmek kayıtlarınızın doğruluğunu korur ve hataların daha kolay fark edilmesini sağlar.

<br/>

## Kayıtları bir muhasebeciyle paylaşmak

Bir muhasebeci veya denetçi gibi başka birinin shielded etkinliğinizi görmesi gerektiğinde, harcama anahtarlarınızı vermeniz ya da herhangi bir şeyi herkese açık hâle getirmeniz gerekmez. Bir [viewing key](/zcash-tech/viewing-keys) paylaşırsınız.

Tam viewing key salt okunurdur. Sahibine bir adres için gelen ve giden işlemleri, tutarlar ve memo’lar dâhil, görme imkânı verir; ancak hiçbir zaman fonlarınızı taşımasına izin vermez. Bu da onu bir muhasebeciye vermek için güvenli seçenek yapar. İhtiyaç duydukları görünürlüğü tam olarak elde ederler, paranız sizin kontrolünüzde kalır ve dünyanın geri kalanı hâlâ hiçbir şey görmez.

Buna seçici açıklama denir ve shielded Zcash’in dürüst muhasebe tutmaya karşı değil, onun için neden pratik olduğunu gösteren sebeplerden biridir.

<br/>

## Bir dönem için toplam alma

Çoğu raporlama için belirli bir zaman aralığındaki toplamlar gerekir: bu çeyrekte ne kadar aldınız, ne kadar gönderdiniz, net durumunuz nedir. Kendi tam geçmişinizi inceleyebildiğiniz için, bunları seçtiğiniz herhangi bir dönem için toplayabilirsiniz: bir ay, bir çeyrek veya bir yıl.

Memo’ları tutarlı kullanmak bunu kolaylaştırır, çünkü ödemeleri yalnızca tarih ve tutara göre değil, ne için yapıldıklarına göre de gruplayabilirsiniz.

<br/>

## Vergi hakkında bir not

Vergi kuralları ülkeden ülkeye farklılık gösterir ve zamanla değişir, bu nedenle bu genel bilgidir ve vergi tavsiyesi değildir. Pek çok yerde kripto para almak veya elden çıkarmak vergi sonuçları doğurabilir ve ne aldığınızın, ne zaman aldığınızın ve o andaki değerinin kaydını tutmanız beklenebilir.

İyi haber şu ki shielded Zcash bu yükümlülükleri yerine getirmenizi engellemez. Tam ve özel kayıtlar tutabilir, bunları vergi makamınızın istediği dönem için toplamlandırabilir ve etkinliğinizi herkese açık hâle getirmeden, bir viewing key kullanarak bir muhasebeciye veya vergi otoritesine açıklayabilirsiniz. Yükümlülüklerinizin ne olduğundan emin değilseniz, ülkenizde yetkin bir uzmana danışın.

<br/>

## Kaçınılması gereken yaygın hatalar

- Memo kullanmamak; bu da yıl sonunda elinizde yalnızca tutarlar kalmasına ve bağlamın kaybolmasına yol açar
- Her şey için tek bir adresi yeniden kullanmak; bu da müşterileri veya kullanım amaçlarını ayırmayı zorlaştırır
- Kayıtları düzenli tutmak yerine, bir yıllık geçmişi vergi döneminde gözden geçirmeyi beklemek
- Bir muhasebecinin ihtiyaç duyduğu tek şey salt okunur bir viewing key iken, harcama anahtarını paylaşmak

<br/>

## İlgili sayfalar

- [Memo’lar](/using-zcash/memos) - şifreli memo’ların nasıl çalıştığı
- [Viewing Key’ler](/zcash-tech/viewing-keys) - salt okunur erişimin nasıl dışa aktarılıp paylaşıldığı
- [Serbest Çalışanlar için Gizlilik Kurulumu](/zcash-use-cases/freelance-privacy-setup) - geliri özel şekilde alma, kayıt tutmadan önceki adım
