<a href="https://github.com/Zechub/zechub/edit/main/site/ZFAV_Club/Guides_for_Creators/Community_Broadcasting.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# VDO.Ninja ve OBS Studio kullanarak Community Yayını

Bu kısa eğitim, [DWeb Camp 2023](https://dwebcamp.org/) sırasında bir grup fellow ve gönüllü tarafından oluşturuldu. Bu çalışmanın amacı, iş birliğine dayalı video kaydı ve yayın için çevrimdışı MESH ağına bağlı akıllı telefon cihazlarının kullanımından yararlanmaktır.

İki açık kaynaklı yazılım kullanıyoruz: [OBS Studio (Open Broadcaster software)](https://obsproject.com/) ve [VDO.Ninja](https://vdo.ninja/). Bu yazılımlar indirilebilir ve bilgisayarınızda yerel olarak çalıştırılabilir.

## OBS Studio (Open Boardcaster software)

OBS Studio, kayıt ve canlı yayın için birden fazla işletim sisteminde kullanılabilen ücretsiz ve açık kaynaklı bir yazılımdır. Yazılım ilk olarak 2012 yılında yayımlandı ve oyun yayıncılığı topluluğu ile bağımsız video içerik üreticileri arasında oldukça geniş bir kullanıcı kitlesine sahiptir.

OBS Studio kullanıcı arayüzü, ilk kez kullananlar için oldukça göz korkutucu görünebilir. OBS Studio iki pencereye ayrılır: "Preview" ve "Broadcast". Preview penceresi, "Scenes" olarak adlandırılan kullanılabilir videoları (webcam, Iriun Webcam, OBS Virtual Camera, Video ve Browser source gibi çeşitli kameralar) gösterir; "Broadcast" ise canlı yayını gösterir.

VDO.ninja üzerindeki uzak bir kamera akışını OBS Studio’ya aktarmak için, "Sources > Add > Browser" yolunu izleyerek yeni bir "Browser Source" ekleyerek başlarsınız. Yeni pencerede, VDO.Ninja’dan gelen kaynak URL’sini girebilir ve "Make source visible" seçeneğini işaretleyebilirsiniz.

Artık uzak akışları yayınlamaya başlayabilirsiniz.

## VDO.Ninja

[VDO.Ninja](https://vdo.ninja/), mobil cihazlarınızı canlı yayın kamerasına dönüştürmenizi sağlayan ücretsiz ve açık kaynaklı bir web uygulamasıdır. Yazılım indirilebilir ve yerel bilgisayarınıza kurulabilir ya da doğrudan [https://vdo.ninja adresindeki çevrimiçi sürümü](https://vdo.ninja/) kullanabilirsiniz.

VOD.Ninja arayüzü basittir; mobil cihazınızın web tarayıcısında VDO.Ninja’yı açın ve "Add your camera to OBS" seçeneğini seçin. Ardından cihaz listesinden kamera ve ses aygıtınızı seçip "Start" düğmesine tıklarsınız. Sonrasında OBS Studio’ya eklenebilecek bir "view" bağlantısı elde edersiniz.

## VDO.Ninja ile bir community çağrısını yönetmek

Masaüstü/dizüstü bilgisayarınızda web tarayıcınızla [VDO.ninja](http://VDO.ninja) adresine giderek başlayın.

<a href="">
    <img src="https://images.spr.so/cdn-cgi/imagedelivery/j42No7y-dcokJuNgXeA0ig/8ded1b54-602b-4e66-af92-127990eff723/Screenshot_2023-08-23_162222/w=3840,quality=80" alt="" width="300" height="400"/>
</a>


Yeni bir oda oluşturmak ve kendi community çağrısı canlı yayınınızı yönetmek için Create a Room’a tıklayın.

Bir sonraki ekranda odanızı kurmak için temel bilgiler istenecektir.

<a href="">
    <img src="https://images.spr.so/cdn-cgi/imagedelivery/j42No7y-dcokJuNgXeA0ig/ae698696-7b4d-458e-8de0-58a198c36e73/Screenshot_2023-08-23_183900/w=3840,quality=80" alt="" width="400" height="400"/>
</a>

Bir oda oluşturulduktan sonra, yönetmen olarak bir sonraki ekranda kullanabileceğiniz çok sayıda kontrol seçeneğiniz olur.

<a href="">
    <img src="https://images.spr.so/cdn-cgi/imagedelivery/j42No7y-dcokJuNgXeA0ig/35b43544-5114-4e74-ac41-9e8993fe62ea/Screenshot_2023-08-23_184015/w=3840,quality=80" alt="" width="400" height="400"/>
</a>


İnsanlar odanıza katıldığında, yönetmen olarak tüm kaynak seçeneklerinin ve kontrollerin video ve sesleriyle birlikte göründüğünü göreceksiniz.

<a href="">
    <img src="https://images.spr.so/cdn-cgi/imagedelivery/j42No7y-dcokJuNgXeA0ig/2247f187-b005-478e-9e5e-471cb8f070d3/Screenshot_2023-08-23_194136/w=3840,quality=80" alt="" width="400" height="300"/>
</a>


## SSS

- OBS Studio için ne tür ekran kartları gereklidir?

İyi bir ekran kartına ve bol miktarda belleğe sahip bir kişisel bilgisayar kullanabilirsiniz ya da alternatif olarak bir donanım kodlayıcı kullanabilirsiniz: [Teradek VidiU](https://www.bhphotovideo.com/c/product/1609186-REG/teradek_10_0235_vidiu_x_modem.html?gclid=EAIaIQobChMIl4aIo7zX_wIVDhqtBh0PgwhxEAAYAiAAEgInufD_BwE)
- OBS canlı çeviri ve altyazı yapmanıza izin veriyor mu?

Böyle bir özellik sunduğu görülen, topluluk katkısıyla geliştirilmiş bazı eklentiler var. [https://github.com/eddieoz/OBS-live-translation](https://github.com/eddieoz/OBS-live-translation)

- OBS Studio için kendi eklentilerinizi geliştirebilir misiniz?

Evet, OBS lua ve python betiklerini destekler. Ayrıca Overlay’ler ve webview’ler için JavaScript de desteklenir.

- Canlı yayında kararma geçişi veya diğer geçişleri kullanıyor muyuz?

Bu tamamen size, yani yapımcıya kalmış!

- Yayın yaparken gecikme oluyor mu?

Bu çoğunlukla yayın yaptığınız hedefe bağlıdır. Örneğin, YouTube, yayınlanmadan önce sunucularında yapılan video işleme nedeniyle bir dakika veya daha fazla gecikmeye sahip olabilir.

- Yavaş bir makinede OBS kullanırken ve green-screen yaparken ses kesiliyor

Donanım kodlayıcı kullanın ya da stream yard kullanın
[https://support.streamyard.com/hc/en-us/articles/360056350852-How-to-Use-OBS-Virtual-Camera-with-StreamYard](https://support.streamyard.com/hc/en-us/articles/360056350852-How-to-Use-OBS-Virtual-Camera-with-StreamYard) veya [RiverSide.FM](http://riverside.fm/)

## Katkıda Bulunanlar

- Ryan
- Ajay
- Arky

## Kaynaklar

[https://obsproject.com/help](https://obsproject.com/help)

[https://docs.vdo.ninja/](https://docs.vdo.ninja/)

Ofis Saatleri: Medya ve dijital etkinlik community’si
[https://alex4d.com/notes/item/media-and-digital-event-community](https://alex4d.com/notes/item/media-and-digital-event-community)
