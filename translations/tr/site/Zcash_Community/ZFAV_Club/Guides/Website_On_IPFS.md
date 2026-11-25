<a href="https://github.com/Zechub/zechub/edit/main/site/Zcash_Community/ZFAV_Club/Guides/Website_On_IPFS.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Sayfayı düzenle"/>
</a>

# IPFS Üzerinde Bir Web Sitesi Yayınlama

![](/content-images/IPFS-40c2e22732.webp)

## IPFS’ye Giriş

IPFS (InterPlanetary File System), dosyaları depolamak ve paylaşmak için merkeziyetsiz (decentralized) bir yöntem oluşturmak üzere tasarlanmış eşler arası (peer-to-peer) bir protokol ve ağdır.

İnternetin geleneksel istemci-sunucu modelinden farklı olarak IPFS, kullanıcıların içeriği depolamak ve dağıtmak için merkezi bir sunucuya güvenmek yerine dosyaları doğrudan birbirleriyle paylaşmalarına olanak tanır.

IPFS’deki dosyalar *içerik adresleme* (content-addressing) yöntemiyle adreslenir; yani her dosyaya içeriğine göre benzersiz bir karma veya İÇERİK TANIMLAYICISI (CID) verilir ve dosyayı ağdan almak için bu karma kullanılır.

IPFS, içeriği CID'lerle tanımlanan bloklar halinde depolar. Bir dosya eklemek onu düğümünüzde depolar; diğer düğümlere otomatik olarak kopyalamaz. Diğer okuyucuların dosyayı alabilmesi için erişilebilir bir kopyayı çevrimiçi tutun veya uzaktan sabitleme ayarlayın. Bkz. [IPFS kalıcılığı](https://docs.ipfs.tech/concepts/persistence/).

[IPFS’ye Giriş](https://blog.infura.io/post/an-introduction-to-ipfs)



## Sitenizi Oluşturma

Bu örnekte basit bir web sitesi oluşturuyoruz.

[Örnek Site](https://squirrel.surf)


**Adım 1:** Web tasarımına aşina değilseniz web sitenizin ana içeriğini yazın; başlık, ana metin gövdesi, diğer sayfalara/sitelere bağlantılar ve alt bilgiler ekleyin.

**Adım 2:** Bir [HTML şablonu!](https://nicepage.com/html-templates) kullanın. Yazdığınız metni uygun yerlere yapıştırın. İsteğe bağlı olarak web siteniz için bir .CSS stil sayfası da oluşturabilirsiniz.

**Adım 3:** Ana sayfanızı site klasörünün kökündeki `index.html` konumuna yerleştirin. Görsellerini ve CSS dosyasını, IPFS ağ geçidi URL'sinde de çalışmaları için `style.css` gibi göreli yollar kullanarak ekleyin.



## Bir Düğüm Kurma

[IPFS Desktop](https://docs.ipfs.tech/install/ipfs-desktop/) düğümü sizin için yönetir. Sitenizi paylaşırken uygulamayı çalışır durumda tutun.

[komut satırı yolunu](https://docs.ipfs.tech/how-to/command-line-quick-start/) tercih ediyorsanız önce bir kez yeni bir depo başlatın:

```sh
ipfs init
```

Ardından düğümü başlatın ve bu terminali açık bırakın:

```sh
ipfs daemon
```

Kalan komutları ikinci bir terminalde çalıştırın. IPFS Desktop bu depoyu zaten yönetiyorsa ikinci bir arka plan hizmeti başlatmayın.

**Site Klasörünü IPFS'ye Ekleme**:

IPFS Desktop'ta, Klasör Ekle seçeneğini kullanarak web sitesi dosyalarınızın bulunduğu klasörü seçin.

![](/content-images/ipfs-site-folder-2c96524d98.webp)

--

Komut satırı yolunu kullanıyorsanız bunu site klasörünüzün üst dizininden çalıştırın:

```sh
ipfs add -r folder_name
```

`folder_name` yerine klasörünüzün adını yazın (boşluk içeren adları tırnak içine alın). Son `added ... folder_name` satırındaki CID'yi kaydedin: Bu CID yalnızca `index.html` dosyasını değil, tüm dizini tanımlar.


### Siteyi IPFS'de Sabitleme:

Komut satırındaki `ipfs add` komutu, içe aktarılan içeriği varsayılan olarak yerel olarak sabitler. Klasörün sabitlenme durumunu şu komutla kontrol edin:

```sh
ipfs pin ls YOUR_FOLDER_CID
```

`YOUR_FOLDER_CID` yerine önceki adımdaki CID'yi yazın; çıktıda `recursive` yazmalıdır. Sabitleme, bu düğümdeki kopyanın çöp toplama işlemiyle silinmesini önler ancak kapalı bir bilgisayarı çevrimiçi tutmaz. Düğümünüz çevrimdışıyken de erişilebilir olması için [uzaktan sabitleme](https://docs.ipfs.tech/how-to/work-with-pinning-services/) ayarlayın ve uzak hizmetin sabitleme işlemini tamamladığını doğrulayın.

### IPFS Üzerinden Web Sitenize Erişme:

Önce sitenizi `http://127.0.0.1:8080/ipfs/YOUR_FOLDER_CID/` adresindeki yerel ağ geçidi üzerinden kontrol edin (farklıysa arka plan hizmetinizin yazdırdığı ağ geçidi bağlantı noktasını kullanın). Sondaki eğik çizgi, göreli bağlantıların dizin içinde çözümlenmesini sağlar.

`https://ipfs.io/ipfs/YOUR_FOLDER_CID/` gibi herkese açık bir ağ geçidi, içeriği erişilebilir bir düğümden alabildiğinde siteyi sunabilir. Yerel önizlemenin başarılı olması, sitenin herkese açık olduğunu kanıtlamaz.

Bizim örneğimizde CID = "QmW2UEfap1vrRRvS5H9wed8qmsx4WsvXBk3GPGVVfWx3r3"


## IPNS

Gezegenler Arası Adlandırma Sistemi (IPNS), sitenizle ilişkilendirilmiş IPFS CID'lerini güncellemenize ve yine de statik bir bağlantı sunmanıza olanak tanır. Bir anahtar olarak sağlanır.

![](/content-images/dns-query.a0134a75-9ef7817f80.webp)

IPFS masaüstü uygulamasında sitenizin klasörüne ait ayarlar menüsünden IPNS'ye Yayınla'yı seçin.

![](/content-images/IPNS-2fe62cc369.webp)

Anahtar: "k51qzi5uqu5di670a6uxywo17b2be1eyhoa2cl0qlwpfxn5p9ypcu8jbzgnj4n"

Ayrıca sitemizi bir ağ geçidi üzerinden görüntülemek için de kullanılabilir: https://ipfs.io/ipns/k51qzi5uqu5di670a6uxywo17b2be1eyhoa2cl0qlwpfxn5p9ypcu8jbzgnj4n


## DNS Bağlantısı

Site oluşturuldu; şimdi URL'yi içeriğe yönlendirecek bir yönteme ihtiyacımız var.

`example.com` için, `YOUR_FOLDER_CID` yerine dizin CID'nizi yazarak bu DNS kaydını ekleyin:

| Tür | Ad | Değer |
|---|---|---|
| TXT | `_dnslink.example.com` | `dnslink=/ipfs/YOUR_FOLDER_CID` |

Bazı DNS sağlayıcıları bölge adını otomatik olarak ekler; oraya yalnızca `_dnslink` yazın. Yukarıdaki IPNS adı kullanılıyorsa değer bunun yerine `dnslink=/ipns/YOUR_IPNS_NAME` olabilir. Bkz. [DNSLink](https://docs.ipfs.tech/concepts/dnslink/).

![](/content-images/example-c2a9edb28b.webp)

DNS yayılımından sonra `https://ipfs.io/ipns/example.com/` adresini deneyin. Siteyi doğrudan `https://example.com/` adresinde sunmak için ayrıca DNSLink destekleyen bir ağ geçidi ve HTTPS yapılandırması gerekir; TXT kaydı bunları tek başına kurmaz. [özel alan adı kılavuzunu](https://docs.ipfs.tech/how-to/websites-on-ipfs/custom-domains/) izleyin.

Tebrikler! Sansüre dayanıklı bir web sitesi kurdunuz.


**Kaynaklar**

[IPFS Belgeleri](https://docs.ipfs.tech)

[IPNS Belgeleri](https://docs.ipfs.tech/concepts/ipns/)

[DNS bağlantısı belgeleri](https://dnslink.io/#introduction)
