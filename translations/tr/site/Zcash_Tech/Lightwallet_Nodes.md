<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Lightwallet_Nodes.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Sayfayı Düzenle"/>
</a>


# Zcash Lightwallet Düğümleri

## Giriş

Gizliliğe odaklanan bir kripto para olan Zcash, kullanıcıların tüm blokzincir geçmişini indirmeden Zcash blokzinciri ile etkileşim kurmasını sağlayan "lightwallet düğümleri" adlı bir özelliği destekler. Bu wiki sayfası, lightwallet düğümlerine genel bir bakış, Zcash ekosisteminde "lightwalletd" hizmetinin rolü, güncel lightwallet düğüm sunucuları listesi ve Ywallet ile Zingo gibi popüler cüzdanlarda sunucuların nasıl değiştirileceğine dair talimatlar sunar.

## Lightwalletd Hizmeti

"lightwallet daemon" ifadesinin kısaltması olan "lightwalletd" hizmeti, Zcash'in lightwallet düğüm ekosisteminde kritik bir rol oynar. Etkili şekilde çalışmaları için hafif istemcilere (lightwallet'lara) ihtiyaç duydukları bilgileri sağlayan bir aracı görevi görür. İşte lightwalletd hizmetinin kısa bir açıklaması:

__Veri Toplayıcı__: Lightwalletd, işlem bilgileri, blok verileri ve shielded havuz bilgileri gibi Zcash blokzincirindeki verileri toplar.

__Basitleştirilmiş Doğrulama__: Lightwalletd, bu verilerin basitleştirilmiş doğrulamasını gerçekleştirir ve böylece lightwallet'ların tüm blokzinciri doğrulamak zorunda kalmadan gerekli bilgilere erişmesini sağlar.

__Gizliliğin Korunması__: Bu hizmet, Zcash kullanıcılarının viewing key'lerini veya kişisel işlem bilgilerini açığa çıkarmalarını gerektirmeyerek gizliliklerini korur.

__Verimli Senkronizasyon__: Lightwalletd, lightwallet'lar için verimli senkronizasyon sağlar ve Zcash blokzinciri ile güncel kalmak için gereken süreyi ve kaynakları önemli ölçüde azaltır.


## Güncel Lightwalletd Sunucuları Listesi

* [status.zec.rocks](https://status.zec.rocks/)
* [hosh.zec.rocks](https://hosh.zec.rocks/zec)

## Mobil Cüzdanlarda Sunucu Değiştirme

Lightwallet düğüm sunucusunu değiştirmek nispeten basittir. Uygulama içindeki gelişmiş ayarları bulun ve açın.

__Ywallet/Zingo/Zashi/eZcash'i Açın__: Cihazınızda tercih ettiğiniz cüzdanı başlatın.

#### Ywallet:

Ywallet için bu, sağ üst köşedeki dişli simgesidir - Zcash sekmesine gidin. 

![SmartSelect_20250313_105128](https://github.com/user-attachments/assets/b0a2910b-dbdf-4292-8e69-af5a386aa183)

#### Zingo:

Zingo için bu, sol üst köşedeki hamburger menüsündedir, ardından ayarlara tıklayın ve aşağı kaydırın

![SmartSelect_20250313_105737_Zingo](https://github.com/user-attachments/assets/ea8f7672-e644-41a5-a422-db131740404a)

#### Zashi:

Zashi için bu, sağ üst köşedeki dişli simgesidir - Gelişmiş Ayarlar'a gidin ve ardından bir sunucu seçin

![SmartSelect_20250313_110200_Zashi](https://github.com/user-attachments/assets/5a9d050a-8308-4cc2-907e-513072066aed)

#### eZcash

eZcash için bu, sol üst köşedeki hamburger menüsündedir, ardından Ayarlar'a tıklayın, Gelişmiş'e dokunun

![SmartSelect_20250313_110616](https://github.com/user-attachments/assets/655c0172-61a0-4322-b8cf-4eee4bb53b51)


## Sonuç

Zcash'in lightwallet düğümleri ve lightwalletd hizmeti, kullanıcıların blokzincir ile etkileşim kurması için kullanışlı ve gizliliği koruyan bir yol sunar. Sunucu değiştirebilme özelliği, ihtiyaçlarınıza en uygun düğümü seçme konusunda esneklik sağlar.
