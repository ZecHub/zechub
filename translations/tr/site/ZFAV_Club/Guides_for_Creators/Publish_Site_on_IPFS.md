<a href="https://github.com/Zechub/zechub/edit/main/site/ZFAV_Club/Guides_for_Creators/Publish_Site_on_IPFS.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Sayfayı Düzenle"/>
</a>

# IPFS Üzerinde Bir Site Yayınlama

<a href="">
    <img src="/content-images/IPFS-40c2e22732.webp" alt="" width="800" height="400"/>
</a>



## IPFS'ye Giriş

IPFS (InterPlanetary File System), dosyaları depolamak ve paylaşmak için merkeziyetsiz bir yöntem oluşturmak amacıyla tasarlanmış eşler arası bir protokol ve ağdır.

İnternetin geleneksel istemci-sunucu modelinden farklı olarak IPFS, kullanıcıların içerikleri depolamak ve dağıtmak için merkezi bir sunucuya güvenmek yerine dosyaları doğrudan birbirleriyle paylaşmalarına olanak tanır.

IPFS içindeki dosyalar *content-addressing* kullanılarak adreslenir; yani her dosyaya içeriğine göre benzersiz bir hash veya CONTENT IDENTIFIER (CID) verilir ve bu hash dosyayı ağdan geri almak için kullanılır.

IPFS içeriği CID'lerle tanımlanan bloklar halinde saklar. Bir dosya eklemek onu kendi düğümünüzde saklar; dosyayı diğer düğümlere otomatik olarak kopyalamaz. Diğer okuyucuların dosyaya erişebilmesi için erişilebilir bir kopyayı çevrimiçi tutun veya uzaktan sabitleme (remote pinning) ayarlayın. Bkz. [IPFS kalıcılığı](https://docs.ipfs.tech/concepts/persistence/).

**Okuyun: [IPFS'ye Giriş](https://blog.infura.io/post/an-introduction-to-ipfs)**

## Sitenizi Oluşturma

Bu örnekte basit bir web sitesi oluşturuyoruz.

[Örnek Site](https://squirrel.surf/)

**Adım 1:** Web tasarımına aşina değilseniz, web siteniz için Başlık, ana metin gövdesi, diğer sayfalara/sitelere bağlantılar ve alt bilgi dahil olmak üzere ana içeriği yazın.

**Adım 2:** Bir [HTML şablonu kullanın!](https://nicepage.com/html-templates) Yazdığınız metni uygun şekilde yapıştırın. İsteğe bağlı olarak web siteniz için bir .CSS stil sayfası da oluşturabilirsiniz.

**Adım 3:** Ana sayfanızı site klasörünün kök dizininde `index.html` içine yerleştirin. Görsellerini ve CSS dosyalarını da ekleyin. Bir IPFS ağ geçidi URL'si altında da çalışmaları için `style.css` gibi göreli yollar kullanın.

## Bir Node Kurulumu

[IPFS Desktop](https://docs.ipfs.tech/install/ipfs-desktop/) düğümü sizin için yönetir. Sitenizi paylaşırken açık tutun.

Komut satırı yoluyla ilerlemek için ([komut satırı yolu](https://docs.ipfs.tech/how-to/command-line-quick-start/)), yeni bir depoyu bir kez başlatın:

```sh
ipfs init
```

Ardından düğümü başlatın ve bu terminali açık bırakın:

```sh
ipfs daemon
```

Kalan komutları ikinci bir terminalde çalıştırın. Bu depo zaten IPFS Desktop tarafından yönetiliyorsa ikinci bir daemon başlatmayın.

### **Site Klasörünü IPFS'ye Ekleyin**:

IPFS Desktop'ta, Klasör Ekle seçeneğini kullanarak web sitesi dosyalarınızın bulunduğu klasörü seçin.

<a href="">
    <img src="/content-images/ipfs-site-folder-2c96524d98.webp" alt="" width="400" height="200"/>
</a>

–

CLI yolu için bunu site klasörünüzün üst dizininden çalıştırın:

```sh
ipfs add -r folder_name
```

`folder_name` yerine klasörünüzün adını yazın (boşluk içeren adları tırnak içine alın). Son `added ... folder_name` satırındaki CID'yi kaydedin: bu CID yalnızca `index.html` dosyasını değil, dizinin tamamını tanımlar.

### Siteyi IPFS Üzerinde Pinleyin:

CLI `ipfs add` komutu, içe aktarılan içeriği varsayılan olarak yerel olarak sabitler. Klasör sabitlemesini şu komutla kontrol edin:

```sh
ipfs pin ls YOUR_FOLDER_CID
```

`YOUR_FOLDER_CID` yerine önceki adımdaki CID'yi yazın; çıktıda `recursive` ifadesi görünmelidir. Sabitleme (pinning), bu düğümün kopyasını çöp toplamaya karşı korur, ancak kapalı bir bilgisayarı çevrimiçi tutmaz. Düğümünüz çevrimdışıyken erişilebilirlik için [uzaktan sabitleme](https://docs.ipfs.tech/how-to/work-with-pinning-services/) ayarlayın ve uzak hizmetin sabitleme işlemini tamamladığını doğrulayın.

### Web sitenize IPFS üzerinde erişin:

Sitenizi önce `http://127.0.0.1:8080/ipfs/YOUR_FOLDER_CID/` adresindeki yerel ağ geçidi üzerinden kontrol edin (daemon'unuzun yazdırdığı ağ geçidi bağlantı noktası farklıysa onu kullanın). Sondaki eğik çizgi, göreli bağlantıların dizin içinde çözümlenmesini sağlar.

Herkese açık bir ağ geçidi, örneğin `https://ipfs.io/ipfs/YOUR_FOLDER_CID/`, içeriği erişilebilir bir düğümden alabildiğinde onu sunabilir. Yerel önizlemenin başarılı olması, içeriğin herkese açık olarak erişilebilir olduğunu kanıtlamaz.

Bizim durumumuzda CID = QmW2UEfap1vrRRvS5H9wed8qmsx4WsvXBk3GPGVVfWx3r3

## IPNS

Interplanetary Naming System (IPNS), web sitenizle ilişkili IPFS CID'lerini güncellemenize ve yine de sabit bir bağlantı sunmanıza olanak tanır. Bir anahtar olarak sağlanır.


<a href="">
    <img src="/content-images/dns-query.a0134a75-9ef7817f80.webp" alt="" width="400" height="100"/>
</a>


IPFS masaüstü uygulamasında site klasörünüzün ayarlar menüsünde Publish to IPNS seçeneğini seçin.

<a href="">
    <img src="/content-images/IPNS-2fe62cc369.webp" alt="" width="400" height="200"/>
</a>


Anahtar: “k51qzi5uqu5di670a6uxywo17b2be1eyhoa2cl0qlwpfxn5p9ypcu8jbzgnj4n”

Ayrıca sitemizi bir gateway üzerinden görüntülemek için de kullanılabilir: https://ipfs.io/ipns/k51qzi5uqu5di670a6uxywo17b2be1eyhoa2cl0qlwpfxn5p9ypcu8jbzgnj4n

## DNS Link

Site oluşturuldu, şimdi bir URL'yi içeriğe yönlendirecek bir yola ihtiyacımız var.

`example.com` için bu DNS kaydını ekleyin ve `YOUR_FOLDER_CID` değerini kendi dizin CID'nizle değiştirin:

| Tür | Ad | Değer |
|---|---|---|
| TXT | `_dnslink.example.com` | `dnslink=/ipfs/YOUR_FOLDER_CID` |

Bazı DNS sağlayıcıları bölgeyi (zone) otomatik olarak ekler; orada yalnızca `_dnslink` girin. Yukarıdaki IPNS adını kullanıyorsanız, değer bunun yerine `dnslink=/ipns/YOUR_IPNS_NAME` olabilir. Bkz. [DNSLink](https://docs.ipfs.tech/concepts/dnslink/).

<a href="">
    <img src="/content-images/example-c2a9edb28b.webp" alt="" width="400" height="100"/>
</a>


DNS yayılımı tamamlandıktan sonra `https://ipfs.io/ipns/example.com/` adresini deneyin. Siteyi doğrudan `https://example.com/` adresinde sunmak için ayrıca DNSLink destekli bir ağ geçidi ve HTTPS yapılandırması da gerekir; bunları yalnızca TXT kaydı ayarlamaz. [Özel alan adı kılavuzunu](https://docs.ipfs.tech/how-to/websites-on-ipfs/custom-domains/) izleyin.

*Tebrikler! Artık sansüre dayanıklı bir web siteniz var.*

____

**Kaynaklar**

[IPFS Dokümantasyonu](https://docs.ipfs.tech/)

[IPNS Dokümantasyonu](https://docs.ipfs.tech/concepts/ipns/)

[DNS link Dokümanları](https://dnslink.io/#introduction)
