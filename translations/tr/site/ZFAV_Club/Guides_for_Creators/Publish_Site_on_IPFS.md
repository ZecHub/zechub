<a href="https://github.com/Zechub/zechub/edit/main/site/ZFAV_Club/Guides_for_Creators/Publish_Site_on_IPFS.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Sayfayı düzenle"/>
</a>

# IPFS Üzerinde Bir Site Yayınlama

<a href="">
    <img src="/content-images/IPFS-40c2e22732.webp" alt="" width="800" height="400"/>
</a>



## IPFS'e Giriş

IPFS (InterPlanetary File System), dosyaları depolamak ve paylaşmak için merkeziyetsiz bir yöntem oluşturmak üzere tasarlanmış eşler arası bir protokol ve ağdır.

İnternetin geleneksel istemci-sunucu modelinden farklı olarak IPFS, kullanıcıların içeriği depolayıp dağıtmak için merkezi bir sunucuya güvenmek yerine dosyaları doğrudan birbirleriyle paylaşmasına olanak tanır.

IPFS üzerindeki dosyalara *içerik adresleme (content-addressing)* yöntemiyle erişilir; bu yöntemde her dosyaya içeriğine göre benzersiz bir karma veya İÇERİK TANIMLAYICISI (CID) verilir ve dosyayı ağdan almak için bu karma kullanılır.

IPFS, içeriği CID'lerle tanımlanan bloklar olarak depolar. Bir dosya eklemek onu düğümünüzde depolar; diğer düğümlere otomatik olarak kopyalamaz. Diğer okuyucuların dosyayı alabilmesi için erişilebilir bir kopyayı çevrimiçi tutun veya uzaktan sabitleme ayarlayın. Bkz. [IPFS kalıcılık](https://docs.ipfs.tech/concepts/persistence/).

**Okuyun: [IPFS Hakkında Bir Giriş](https://blog.infura.io/post/an-introduction-to-ipfs)**

## Sitenizi Oluşturma

Bu örnekte basit bir web sitesi oluşturuyoruz.

[Örnek Site](https://squirrel.surf/)

**1. Adım:** Web tasarımına aşina değilseniz web sitenizin başlık, ana metin gövdesi, diğer sayfalara/sitelere bağlantılar ve altbilgiler dahil ana içeriğini yazın.

**2. Adım:** Bir [HTML şablonu!](https://nicepage.com/html-templates) kullanın. Yazdığınız metni uygun yerlere yapıştırın. İsteğe bağlı olarak web siteniz için bir .CSS stil sayfası da oluşturabilirsiniz.

**3. Adım:** Ana sayfanızı `index.html` site klasörünün kök dizinine koyun. Görsellerini ve CSS dosyasını, IPFS ağ geçidi URL'si altında da çalışmaları için `style.css` gibi göreli yollar kullanarak ekleyin.

## Bir Düğüm Kurma

[IPFS Desktop](https://docs.ipfs.tech/install/ipfs-desktop/) düğümü sizin için yönetir. Sitenizi paylaşırken çalışır durumda tutun.

[komut satırı yolunu](https://docs.ipfs.tech/how-to/command-line-quick-start/) kullanacaksanız önce bir kez yeni bir depo başlatın:

```sh
ipfs init
```

Ardından düğümü başlatın ve bu terminali açık bırakın:

```sh
ipfs daemon
```

Kalan komutları ikinci bir terminalde çalıştırın. IPFS Desktop bu depoyu zaten yönetiyorsa ikinci bir arka plan hizmeti başlatmayın.

### **Site Klasörünü IPFS'e Ekleme**:

IPFS Desktop'ta, Klasör Ekle seçeneğini kullanarak web sitesi dosyalarınızın bulunduğu klasörü seçin.


<a href="">
    <img src="/content-images/ipfs-site-folder-2c96524d98.webp" alt="" width="400" height="200"/>
</a>

–

CLI yolunu kullanıyorsanız bunu site klasörünüzün üst dizininde çalıştırın:

```sh
ipfs add -r folder_name
```

`folder_name` yerine klasör adınızı yazın (boşluk içeren adları tırnak içine alın). Son `added ... folder_name` satırındaki CID'yi kaydedin: Bu, yalnızca `index.html` değil, tüm dizini tanımlar.

### Siteyi IPFS Üzerinde Sabitleme:

CLI `ipfs add` komutu, içe aktarılan içeriği varsayılan olarak yerel olarak sabitler. Klasör sabitlemesini şu komutla kontrol edin:

```sh
ipfs pin ls YOUR_FOLDER_CID
```

`YOUR_FOLDER_CID` yerine önceki adımdaki CID'yi yazın; çıktıda `recursive` yazmalıdır. Sabitleme, bu düğümdeki kopyanın çöp toplama işlemiyle silinmesini önler; ancak kapalı bir bilgisayarı çevrimiçi tutmaz. Düğümünüz çevrimdışıyken erişilebilir olması için [uzaktan sabitleme](https://docs.ipfs.tech/how-to/work-with-pinning-services/) ayarlayın ve uzaktaki hizmetin sabitleme işlemini tamamladığını doğrulayın.

### IPFS Üzerinde Web Sitenize Erişme:

Önce sitenizi `http://127.0.0.1:8080/ipfs/YOUR_FOLDER_CID/` adresindeki yerel ağ geçidi üzerinden kontrol edin (farklıysa arka plan hizmetinizin yazdırdığı ağ geçidi bağlantı noktasını kullanın). Sondaki eğik çizgi, göreli bağlantıların dizin içinde çözülmesini sağlar.

`https://ipfs.io/ipfs/YOUR_FOLDER_CID/` gibi bir genel ağ geçidi, erişilebilir bir düğümden içeriği alabildiğinde siteyi sunabilir. Yerel önizlemenin başarılı olması, sitenin genel erişime açık olduğunu kanıtlamaz.

Örneğimizde CID = QmW2UEfap1vrRRvS5H9wed8qmsx4WsvXBk3GPGVVfWx3r3

## IPNS

Gezegenler Arası Adlandırma Sistemi (IPNS), statik bir bağlantı sunmaya devam ederken web sitenizle ilişkili IPFS CID'lerini güncellemenize olanak tanır. Bir anahtar olarak sağlanır.


<a href="">
    <img src="/content-images/dns-query.a0134a75-9ef7817f80.webp" alt="" width="400" height="100"/>
</a>


IPFS masaüstü uygulamasında site klasörünüzün ayarlar menüsünden IPNS'de Yayımla'yı seçin.

<a href="">
    <img src="/content-images/IPNS-2fe62cc369.webp" alt="" width="400" height="200"/>
</a>


Anahtar: “k51qzi5uqu5di670a6uxywo17b2be1eyhoa2cl0qlwpfxn5p9ypcu8jbzgnj4n”

Sitemizi bir ağ geçidi üzerinden görüntülemek için de kullanılabilir: https://ipfs.io/ipns/k51qzi5uqu5di670a6uxywo17b2be1eyhoa2cl0qlwpfxn5p9ypcu8jbzgnj4n

## DNS Bağlantısı

Site oluşturuldu; şimdi bir URL'yi içeriğe yönlendirecek bir yola ihtiyacımız var.

`example.com` için, `YOUR_FOLDER_CID` yerine dizin CID'nizi yazarak bu DNS kaydını ekleyin:

| Tür | Ad | Değer |
|---|---|---|
| TXT | `_dnslink.example.com` | `dnslink=/ipfs/YOUR_FOLDER_CID` |

Bazı DNS sağlayıcıları bölge adını otomatik olarak ekler; oraya yalnızca `_dnslink` yazın. Yukarıdaki IPNS adını kullanıyorsanız değer bunun yerine `dnslink=/ipns/YOUR_IPNS_NAME` olabilir. Bkz. [DNSLink](https://docs.ipfs.tech/concepts/dnslink/).


<a href="">
    <img src="/content-images/example-c2a9edb28b.webp" alt="" width="400" height="100"/>
</a>


DNS yayılımından sonra `https://ipfs.io/ipns/example.com/` adresini deneyin. Siteyi doğrudan `https://example.com/` adresinde sunmak için ayrıca DNSLink destekli bir ağ geçidi ve HTTPS yapılandırması gerekir; TXT kaydı bunları tek başına ayarlamaz. [özel alan adı kılavuzunu](https://docs.ipfs.tech/how-to/websites-on-ipfs/custom-domains/) izleyin.

*Kutlarız! Artık sansüre dayanıklı bir web siteniz var.*

____

**Kaynaklar**

[IPFS Belgeleri](https://docs.ipfs.tech/)

[IPNS Belgeleri](https://docs.ipfs.tech/concepts/ipns/)

[DNS bağlantısı belgeleri](https://dnslink.io/#introduction)
