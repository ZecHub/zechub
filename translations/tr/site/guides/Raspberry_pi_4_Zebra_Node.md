<a href="https://github.com/henryquincy/zechub/edit/main/site/guides/Raspberry_pi_4_Zebra_Node.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Zebra Çalıştırmak için Raspberry Pi 4 Rehberi

<img src="https://i.ibb.co/V3rjKwv/image-2023-11-28-172907488.png" alt="raspberry pi" width="300" height="300"/>

Bir Raspberry Pi 4 üzerinde Zebra düğüm yazılımını çalıştırmak, Zcash ağına bağımsız ve konsensüsle uyumlu bir düğüm olarak katılmanızı sağlar. Bu rehber, Raspberry Pi 4 cihazınızda Zebra kurmak ve çalıştırmak için gerekli adımları size gösterecektir.

## Ön Koşullar

1. Raspberry Pi 4 (2GB RAM veya üzeri önerilir).

2. Raspberry Pi OS (Raspbian) yüklü MicroSD kart (16GB veya üzeri önerilir).

3. Kararlı internet bağlantısı.

4. Klavye, fare ve monitör (ilk kurulum için).

5. SSH istemcisi (isteğe bağlı, uzaktan erişim için).

## Kurulum

1. __Sisteminizi Güncelleyin__
   Bir terminal açın veya Raspberry Pi cihazınıza SSH ile bağlanın ve aşağıdaki komutları çalıştırarak sisteminizin güncel olduğundan emin olun:

   __sudo apt update__

   __sudo apt upgrade__

2. __Bağımlılıkları Kurun__
   Zebra'yı derlemek ve çalıştırmak için gerekli bazı bağımlılıkları yüklemeniz gerekecek:

   __sudo apt install build-essential cmake git clang libssl-dev pkg-config__

3. __Zebra Deposunu Klonlayın__
   Bir terminal açın ve Zebra deposunu Raspberry Pi cihazınıza klonlayın:

   __git clone https://github.com/ZcashFoundation/zebra.git__

   __cd zebra__

4. __Zebra'yı Derleyin__
   Zebra'yı derlemek için aşağıdaki komutları kullanın:

   __cargo build --release__

   Bu işlem biraz zaman alabilir. Derleme sırasında ısı oluşabileceği için Raspberry Pi cihazınızın yeterince soğutulduğundan emin olun.

5. __Yapılandırma__
   Zebra için bir yapılandırma dosyası oluşturun. Başlangıç noktası olarak varsayılan yapılandırmayı kullanabilirsiniz:

   __cp zcash.conf.example zcash.conf__

   Düğümünüzün ayarlarını özelleştirmek için zcash.conf dosyasını düzenleyin. Ağı belirtebilir, madenciliği etkinleştirebilir, eş bağlantılarını ayarlayabilir ve daha fazlasını yapabilirsiniz.

6. __Zebra'yı Başlatın__
   Artık Zebra'yı özel yapılandırmanızla başlatabilirsiniz:

   __./target/release/zebrad -c zcash.conf__

   __git comment__ 

   Bu komut Zebra düğümünü başlatır ve Zcash blokzinciri ile senkronize olmaya başlar.

7. __İzleme__
   Bir web tarayıcısı açıp __http://127.0.0.1:8233/status__ adresine giderek Zebra düğümünüzün ilerlemesini ve durumunu izleyebilirsiniz.

<img src="https://i.ibb.co/BCtKrGp/image-2023-11-28-173024853.png" alt="zebra logo" width="200" height="200"/>

## Sorun Giderme

Zebra'yı derlerken veya çalıştırırken herhangi bir sorunla karşılaşırsanız, sorun giderme ipuçları ve ek bilgiler için [Zebra belgelerine](https://doc.zebra.zfnd.org/docs/intro.html) göz atın.

Bir düğüm çalıştırmanın ısı üretebileceğini unutmayın; Raspberry Pi cihazınızı serin tuttuğunuzdan emin olun. Fan veya ısı emici gibi bir soğutma çözümü kullanmak isteyebilirsiniz.

## Sonuç

Bu rehberi takip ederek Raspberry Pi 4 cihazınızda Zebra'yı başarıyla kurmuş ve çalıştırmış olmalısınız. Artık bağımsız bir düğüm olarak Zcash ağına katkıda bulunuyor, Zcash işlemlerinin gizliliğinin korunmasına yardımcı oluyorsunuz.
