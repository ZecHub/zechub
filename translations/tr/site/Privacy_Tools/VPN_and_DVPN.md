<a href="https://github.com/zechub/zechub/edit/main/site/Privacy_Tools/VPN_and_DVPN.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Sayfayı düzenle"/>
</a>


# VPN ve dVPN

Dijital çağda çevrimiçi gizliliğinizi ve güvenliğinizi korumak son derece önemlidir. Sanal Özel Ağlar (VPN'ler) ve merkeziyetsiz VPN'ler (dVPN'ler), çevrimiçi etkinliklerinizi ve verilerinizi korumada önemli bir rol oynar. Bu wiki sayfasında geleneksel VPN'ler ile yeni ortaya çıkan dVPN'ler arasındaki temel farklar, VPN seçerken göz önünde bulundurulması gereken güvenlik unsurları ve gizlilik odaklı kripto para birimi Zcash'ü kabul eden VPN hizmetlerinin listesi ele alınmaktadır.

# Aralarındaki Fark Nedir?

__Sanal Özel Ağlar (VPN'ler)__: Geleneksel VPN'ler, cihazınız ile VPN sağlayıcısının kontrolündeki uzak bir sunucu arasında güvenli, şifrelenmiş bir tünel oluşturur. Bu tünel, çevrimiçi etkinliklerinizi bilgisayar korsanları, internet servis sağlayıcıları veya devlet kurumları gibi meraklı gözlerden gizler. VPN'ler anonim gezinme, coğrafi kısıtlamalı içeriklere erişme ve siber tehditlere karşı korunma gibi amaçlarla yaygın olarak kullanılır.

![image223](/content-images/image-223-399e3015e7.webp)


__Merkeziyetsiz VPN'ler (dVPN'ler)__: Buna karşılık dVPN'ler, merkeziyetsiz bir düğüm ağı oluşturmak için blokzincir ve eşler arası teknolojiden yararlanır. Kullanıcıların trafiği bu düğümler üzerinden yönlendirilir; böylece tek bir kuruluşun tüm ağı izlemesi veya kontrol etmesi zorlaşır. Ağı denetleyen merkezi bir otorite olmadığından dVPN'ler sansüre karşı genellikle daha dirençlidir. Daha fazla gizlilik ve güvenlik arayan kullanıcılar için uygundur.

![dvpn](/content-images/dvpn-89698d4cb9.webp)


# VPN Seçerken Dikkat Edilmesi Gereken Güvenlik Unsurları

Bir VPN hizmeti seçerken aşağıdaki güvenlik etkenlerini göz önünde bulundurmanız önemlidir:

1. __Şifreleme__: Verilerinizin ele geçirilmesini önlemek için VPN'in OpenVPN veya WireGuard gibi güçlü şifreleme protokolleri kullandığından emin olun.

2. __Kayıt Tutmama Politikası__: Çevrimiçi etkinliklerinize ilişkin kayıtları saklamayan, katı bir kayıt tutmama politikası bulunan sağlayıcıları tercih edin.

3. __Sunucu Konumları__: Farklı bölgelerdeki içeriklere erişmek ve gecikmeyi en aza indirmek için sunucu konumlarının coğrafi dağılımını göz önünde bulundurun.

4. __Kill Switch__: VPN bağlantısı kesildiğinde kill switch internet bağlantınızı keserek verilerinizin açığa çıkmasını önler.

5. __Gizlilik ve Yargı Yetkisi__: Farklı ülkelerin veri saklama yasaları değişiklik gösterdiğinden, VPN sağlayıcısının gizlilik uygulamalarını ve tabi olduğu yargı yetkisini araştırın.

6. __Sızıntı Koruması__: Anonimliğinizi korumak için VPN'in DNS ve WebRTC sızıntılarını önlediğinden emin olun.

7. __Fiyat ve Özellikler__: İhtiyaçlarınıza ve bütçenize uygun olanı bulmak için farklı sağlayıcıların sunduğu maliyetleri ve özellikleri değerlendirin.

# VPN hizmetleri ve Zcash ödemeleri

Zcash ödeme desteği her sağlayıcı için ayrı ayrı kontrol edilmelidir. Kripto para kabul edilmesi, ZEC'ün de kabul edildiği anlamına gelmez; üçüncü taraf bir borsaya veya satıcıya ödeme yapmak, doğrudan VPN sağlayıcısına ödeme yapmaktan farklıdır. Aşağıdaki hizmetlerin ödeme politikaları farklıdır; para göndermeden önce güncel olarak kabul edilen para birimlerini doğrulayın.

1. [__Mullvad VPN__](https://mullvad.net/en)
   
   Mullvad VPN, gizlilik odaklı bir VPN hizmetidir. [güncel ödeme SSS sayfasında](https://mullvad.net/en/pricing) kabul edilen ödeme yöntemleri listelenir.
   Kripto para desteği, her coin'in doğrudan kabul edildiği anlamına gelmez. Mullvad'ın temel özellikleri şunlardır:

   __Kayıt Tutmama Politikası__: Mullvad katı bir kayıt tutmama politikası uygular; yani çevrimiçi etkinliklerinizle ilgili hiçbir veriyi saklamaz.

   __Güçlü Şifreleme__: Hizmet, verilerinizi korumak için WireGuard dahil güçlü şifreleme protokolleri kullanır.

   __Çoklu Atlama VPN'i__: Mullvad, gizliliği ve güvenliği artırmak için trafiğinizi birden fazla sunucu üzerinden yönlendiren çoklu atlama bağlantıları seçeneği sunar.

   __Köprü Modu__: Belirli sansür önlemlerini aşmaya yardımcı olabilecek bir köprü modu vardır.

   __Anonim Hesap Oluşturma__: Kullanıcılara rastgele oluşturulmuş bir hesap numarası atanır; böylece kayıt sırasında kişisel bilgi verme gereği ortadan kalkar.

   __Kripto para ödemeleri__: Yayımlanan listede Bitcoin, Bitcoin Cash ve Monero yer alır; Zcash yer almaz. Üçüncü taraf bir borsa veya satıcı ayrı bir hizmettir; bunu Mullvad'ın doğrudan ZEC kabulü olarak tanımlamayın.

3. [__Nym VPN (dVPN)__](https://nym.com/)
   
   Nym VPN, gizlilik odaklı bir ağ aracılığıyla kullanıcı gizliliğini ve güvenliğini artırmaya odaklanan merkeziyetsiz bir VPN'dir (dVPN). Nym VPN, kullanıcı trafiğinin bir düğüm ağı üzerinden yönlendirildiği bir mixnet kullanarak geleneksel VPN'lerden farklı şekilde çalışır. Nym VPN'in temel özellikleri şunlardır:

   __Merkeziyetsizlik__: Nym VPN merkeziyetsiz ve açık kaynaklıdır; böylece merkezi kontrol ve sansür riski azalır.

   __Gizlilik Mixnet'i__: Hizmet, kullanıcı trafiğini bir mixnet üzerinden yönlendirerek herhangi bir kuruluşun ağ trafiğini izlemesini veya analiz etmesini zorlaştırır.

   __Düğüm İşletimi__: Kullanıcılar ağa katkıda bulunmak ve ödül kazanmak için düğüm işletebilir; bu da altyapıyı daha da merkeziyetsizleştirir.

   __Güçlü Gizlilik__: Nym VPN gizlilik gözetilerek tasarlanmıştır ve kullanıcıların hesap oluştururken kişisel bilgi vermesini gerektirmez.

   Zcash cüzdanına özel yönlendirme için [Zcash Cüzdan Trafiğini Nym Mixnet'i Üzerinden Yönlendirme](../guides/Nym_Mixnet_Wallet_Setup.md) sayfasına bakın.

## Kontrol edilebilecek diğer VPN sağlayıcıları

 3. [__ExpressVPN__](https://www.expressvpn.com/)
 4. [__NordVPN__](https://nordvpn.com/)
 5. [__CyberGhost__](https://www.cyberghostvpn.com/)
 6. [__Private Internet Access (PIA)__](https://www.privateinternetaccess.com/)

Kripto para ile ödeme seçeneklerinin kullanılabilirliği değişebileceğinden, kabul edilen ödeme yöntemleri ve Zcash dahil en güncel bilgiler için VPN sağlayıcısının web sitesini kontrol etmeniz veya müşteri desteğiyle iletişime geçmeniz önerilir.
