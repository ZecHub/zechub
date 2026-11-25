<a href="https://github.com/Zechub/zechub/edit/main/site/ZFAV_Club/Guides_for_Creators/Community_Broadcasting.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Sayfayı düzenle"/>
</a>

# VDO.Ninja ve OBS Studio ile Topluluk Yayını

Bu kısa eğitim, [DWeb Camp 2023](https://dwebcamp.org/) sırasında bir grup katılımcı ve gönüllü tarafından hazırlandı. Bu çalışmanın amacı, ortaklaşa video kaydı ve yayını için çevrimdışı bir MESH ağına bağlı akıllı telefonlardan yararlanmaktır.

İki açık kaynaklı yazılım kullanıyoruz: [OBS Studio (Open Broadcaster software)](https://obsproject.com/) ve [VDO.Ninja](https://vdo.ninja/). Bu yazılımları indirip bilgisayarınızda yerel olarak çalıştırabilirsiniz.

## OBS Studio (Open Boardcaster software)

OBS Studio, birden fazla işletim sisteminde kullanılabilen, kayıt ve canlı yayın için ücretsiz ve açık kaynaklı bir yazılımdır. Yazılım ilk olarak 2012'de yayımlandı ve oyun yayını topluluğu ile bağımsız video içerik üreticileri arasında oldukça geniş bir takipçi kitlesine sahip.

OBS Studio kullanıcı arayüzü, ilk kez kullananlara oldukça göz korkutucu gelebilir. OBS Studio, “Önizleme” ve “Yayın” adlı iki pencereye ayrılır. Önizleme penceresinde kullanılabilir videolar (web kamerası, Iriun Webcam, OBS Virtual Camera, Video ve Tarayıcı kaynakları gibi çeşitli kameralar) “Sahneler” olarak gösterilir; “Yayın” penceresinde ise canlı yayın görünür.

VDO.ninja'dan OBS Studio'ya uzak kamera yayını aktarmak için “Kaynaklar > Ekle > Tarayıcı” yolunu izleyerek yeni bir “Tarayıcı Kaynağı” ekleyin. Açılan pencerede VDO.Ninja kaynak URL'sini girebilir ve “Kaynağı görünür yap” seçeneğini belirleyebilirsiniz.

Artık uzak yayınları başlatabilirsiniz.

## VDO.Ninja

[VDO.Ninja](https://vdo.ninja/), mobil cihazlarınızı canlı yayın kamerasına dönüştürmenizi sağlayan ücretsiz ve açık kaynaklı bir web uygulamasıdır. Yazılımı indirip yerel bilgisayarınıza kurabilir veya doğrudan [çevrimiçi sürümünü https://vdo.ninja](https://vdo.ninja/). kullanabilirsiniz.

VDO.Ninja arayüzü basittir: Mobil cihazınızın web tarayıcısında VDO.Ninja'yı açın ve “Kameranızı OBS'ye ekleyin” seçeneğini belirleyin. Ardından cihaz listesinden kameranızı ve ses cihazınızı seçip “Başlat”a tıklayın. OBS Studio'ya ekleyebileceğiniz bir “görüntüleme” bağlantısı alırsınız.

## VDO.Ninja ile topluluk görüşmesini yönetme

Masaüstü veya dizüstü bilgisayarınızdaki web tarayıcısıyla [VDO.ninja](http://VDO.ninja) adresine giderek başlayın.

<a href="">
    <img src="/content-images/_unavailable.svg" alt="" width="300" height="400"/>
</a>


Yeni bir oda oluşturup kendi topluluk görüşmesi canlı yayınınızı yönetmek için Oda Oluştur'a tıklayın.

Sonraki ekranda odanızı kurmak için temel bilgiler istenir.

<a href="">
    <img src="/content-images/_unavailable.svg" alt="" width="400" height="400"/>
</a>

Oda oluşturulduktan sonra yönetici, sonraki ekranda birçok kontrol seçeneğine erişebilir.

<a href="">
    <img src="/content-images/_unavailable.svg" alt="" width="400" height="400"/>
</a>


Kişiler odanıza katıldığında yönetici olarak video ve sesleriyle birlikte tüm kaynak seçeneklerini ve kontrolleri görürsünüz.

<a href="">
    <img src="/content-images/_unavailable.svg" alt="" width="400" height="300"/>
</a>


## SSS

- OBS Studio için ne tür video grafik kartları gerekir?

İyi bir grafik kartı ve bol miktarda belleği olan bir kişisel bilgisayar kullanabilir veya bunun yerine [Teradek VidiU](https://www.bhphotovideo.com/c/product/1609186-REG/teradek_10_0235_vidiu_x_modem.html?gclid=EAIaIQobChMIl4aIo7zX_wIVDhqtBh0PgwhxEAAYAiAAEgInufD_BwE) gibi donanım kodlayıcıları tercih edebilirsiniz.
- OBS ile canlı çeviri ve altyazı eklemek mümkün mü?

Topluluğun katkıda bulunduğu ve bu özelliği sağlıyor gibi görünen bazı eklentiler var. [https://github.com/eddieoz/OBS-live-translation](https://github.com/eddieoz/OBS-live-translation)

- OBS Studio için kendi eklentilerinizi geliştirebilir misiniz?

Evet, OBS Lua ve Python betiklerini destekler. Ayrıca JavaScript kaplamalar ve web görünümleri için de destek sunar.

- Canlı yayında siyaha geçiş veya geçiş efektleri kullanıyor muyuz?

Bu, yapımcı olarak size kalmış!

- Yayın yaparken gecikme olur mu?

Bu, çoğunlukla yayını yaptığınız hedef platforma bağlıdır. Örneğin, YouTube sunucularında yayınlanmadan önce yapılan video işleme nedeniyle bir dakika veya daha uzun gecikme yaşanabilir.

- Yavaş bir makinede OBS kullanırken ve yeşil perde uygularken ses kesiliyor

Donanım kodlayıcı kullanın veya stream yard kullanın
[https://support.streamyard.com/hc/en-us/articles/360056350852-How-to-Use-OBS-Virtual-Camera-with-StreamYard](https://support.streamyard.com/hc/en-us/articles/360056350852-How-to-Use-OBS-Virtual-Camera-with-StreamYard) ya da [RiverSide.FM](http://riverside.fm/)

## Katkıda Bulunanlar

- Ryan
- Ajay
- Arky

## Kaynaklar

[https://obsproject.com/help](https://obsproject.com/help)

[https://docs.vdo.ninja/](https://docs.vdo.ninja/)

Ofis Saatleri: Medya ve dijital etkinlik topluluğu
[https://alex4d.com/notes/item/media-and-digital-event-community](https://alex4d.com/notes/item/media-and-digital-event-community)
