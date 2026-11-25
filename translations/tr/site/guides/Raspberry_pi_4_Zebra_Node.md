<a href="https://github.com/henryquincy/zechub/edit/main/site/guides/Raspberry_pi_4_Zebra_Node.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Sayfayı düzenle"/>
</a>

# Zebra Çalıştırmak için Raspberry Pi 4 Kılavuzu

<img src="/content-images/image-2023-11-28-172907488-e7e9fd4ac5.webp" alt="raspberry pi" width="300" height="300"/>

Zebra düğüm yazılımını Raspberry Pi 4 üzerinde çalıştırmak, bağımsız ve konsensüs (consensus) ile uyumlu bir düğüm (node) olarak Zcash ağına katılmanızı sağlar. Bu kılavuz, Raspberry Pi 4’ünüzde Zebra kurup çalıştırma adımlarında size yol gösterecektir.

## Ön koşullar

1. Raspberry Pi 4 (2 GB veya üzeri RAM önerilir).

2. Raspberry Pi OS (Raspbian) yüklü microSD kart (16 GB veya üzeri önerilir).

3. Kararlı internet bağlantısı.

4. Klavye, fare ve monitör (ilk kurulum için).

5. SSH istemcisi (isteğe bağlı, uzaktan erişim için).

## Kurulum

1. __Sisteminizi güncelleyin__
   Bir terminal açın veya Raspberry Pi'nize SSH ile bağlanın ve şu komutları çalıştırarak sisteminizin güncel olduğundan emin olun:

   __sudo apt update__

   __sudo apt upgrade__

2. __Bağımlılıkları yükleyin__
   Zebra derlemek ve çalıştırmak için gerekli bazı bağımlılıkları yüklemeniz gerekir:

   __sudo apt install build-essential cmake git clang libssl-dev pkg-config__

3. __Zebra deposunu klonlayın__
   Bir terminal açın ve Zebra deposunu Raspberry Pi'nize klonlayın:

   __git clone https://github.com/ZcashFoundation/zebra.git__

   __cd zebra__

4. __Zebra derleyin__
   Zebra derlemek için aşağıdaki komutları kullanın:

   __cargo build --release__

   Bu işlem biraz zaman alabilir. Derleme ısı üretebileceğinden Raspberry Pi'nizin yeterince soğutulduğundan emin olun.

5. __Yapılandırma__
   Zebra için bir yapılandırma dosyası oluşturun. Başlangıç noktası olarak varsayılan yapılandırmayı kullanabilirsiniz:

   __cp zcash.conf.example zcash.conf__

   Düğüm ayarlarınızı özelleştirmek için zcash.conf dosyasını düzenleyin. Ağı belirtebilir, madenciliği etkinleştirebilir, eş bağlantıları kurabilir ve daha fazlasını yapabilirsiniz.

6. __Zebra başlatın__
   Artık özel yapılandırmanızla Zebra başlatabilirsiniz:

   __./target/release/zebrad -c zcash.conf__

   __git comment__ 

   Bu komut Zebra düğümünü başlatır ve Zcash blokzinciriyle eşitleme işlemine başlar.

7. __İzleme__
   Bir web tarayıcısı açıp __http://127.0.0.1:8233/status__. adresine giderek Zebra düğümünüzün ilerleme durumunu ve durumunu izleyebilirsiniz.

<img src="/content-images/image-2023-11-28-173024853-99540511cf.webp" alt="zebra logosu" width="200" height="200"/>

## Sorun giderme

Zebra derlerken veya çalıştırırken sorun yaşarsanız sorun giderme ipuçları ve ek bilgiler için [Zebra belgelerine](https://zebra.zfnd.org/user/troubleshooting.html) bakın.

Düğüm çalıştırmak ısı üretebileceğinden Raspberry Pi'nizi serin tutmaya dikkat edin. Fan veya soğutucu gibi bir soğutma çözümü kullanabilirsiniz.

## Sonuç

Bu kılavuzu izleyerek Raspberry Pi 4'ünüzde Zebra kurup çalıştırmış olmalısınız. Artık bağımsız bir düğüm olarak Zcash ağına katkıda bulunuyor ve Zcash işlemlerinin gizliliğini korumaya yardımcı oluyorsunuz.
