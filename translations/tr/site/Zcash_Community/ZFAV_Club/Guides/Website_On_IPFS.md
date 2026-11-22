<a href="https://github.com/Zechub/zechub/edit/main/site/Zcash_Community/ZFAV_Club/Guides/Website_On_IPFS.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Sayfayı Düzenle"/>
</a>

# IPFS Üzerinde Bir Web Sitesi Yayınlama

![](/content-images/IPFS-40c2e22732.webp)

## IPFS'ye Giriş

IPFS (InterPlanetary File System), dosyaları depolamak ve paylaşmak için merkeziyetsiz bir yöntem oluşturmak amacıyla tasarlanmış eşler arası bir protokol ve ağdır.

İnternetin geleneksel istemci-sunucu modelinden farklı olarak IPFS, kullanıcıların içerikleri depolamak ve dağıtmak için merkezi bir sunucuya güvenmek yerine dosyaları doğrudan birbirleriyle paylaşmasına olanak tanır.

IPFS içindeki dosyalar *content-addressing* kullanılarak adreslenir; bu, her dosyaya içeriğine göre benzersiz bir hash veya CONTENT IDENTIFIER (CID) verildiği ve bu hash'in dosyayı ağdan almak için kullanıldığı anlamına gelir.

IPFS, içeriği CID'lerle tanımlanan bloklar halinde depolar. Bir dosya eklemek onu sizin düğümünüzde depolar; diğer düğümlere otomatik olarak kopyalamaz. Diğer okuyucuların dosyaya erişebilmesi için erişilebilir bir kopyayı çevrimiçi tutun veya uzaktan sabitleme (remote pinning) ayarlayın. Bkz. [IPFS kalıcılığı](https://docs.ipfs.tech/concepts/persistence/).

[IPFS'ye Giriş](https://blog.infura.io/post/an-introduction-to-ipfs) yazısını okuyun.



## Sitenizi Oluşturma

Bu örnek için basit bir web sitesi oluşturuyoruz.

[Örnek Site](https://squirrel.surf)


**Adım 1:** Web tasarımına aşina değilseniz, web siteniz için Başlık, ana metin gövdesi, diğer sayfalara/sitelere bağlantılar ve alt bilgi dahil olmak üzere ana içeriği yazın.

**Adım 2:** Bir [HTML şablonu kullanın!](https://nicepage.com/html-templates) Yazdığınız metni uygun şekilde yapıştırın. İsteğe bağlı olarak web siteniz için bir .CSS stil sayfası da oluşturabilirsiniz.

**Adım 3:** Ana sayfanızı site klasörünün kök dizinindeki `index.html` içine koyun. Görsellerini ve CSS dosyalarını da ekleyin. Bunlar için `style.css` gibi göreli yollar kullanın, böylece bir IPFS ağ geçidi URL'si altında da çalışırlar.

## Bir Node Kurulumu

[IPFS Desktop](https://docs.ipfs.tech/install/ipfs-desktop/) düğümü sizin için yönetir. Sitenizi paylaşırken açık kalmasını sağlayın.

[komut satırı yolu](https://docs.ipfs.tech/how-to/command-line-quick-start/) için yeni bir depoyu bir kez başlatın:

```sh
ipfs init
```

Ardından düğümü başlatın ve bu terminali açık bırakın:

```sh
ipfs daemon
```

Kalan komutları ikinci bir terminalde çalıştırın. IPFS Desktop bu depoyu zaten yönetiyorsa ikinci bir daemon başlatmayın.

**Site Klasörünü IPFS'ye Ekleyin**:

IPFS Desktop'ta, Klasör Ekle seçeneğini kullanarak web sitesi dosyalarınızın bulunduğu klasörü seçin.

![](/content-images/ipfs-site-folder-2c96524d98.webp)

--

CLI yöntemi için bunu site klasörünüzün üst dizininden çalıştırın:

```sh
ipfs add -r folder_name
```

`folder_name` yerine klasörünüzün adını yazın (boşluk içeren adları tırnak içine alın). Son `added ... folder_name` satırındaki CID'yi kaydedin: bu CID yalnızca `index.html` dosyasını değil, dizinin tamamını tanımlar.

### Siteyi IPFS'de Sabitleyin:

CLI `ipfs add` komutu, içe aktarılan içeriği varsayılan olarak yerel olarak sabitler. Klasörün sabitlenip sabitlenmediğini şu komutla kontrol edin:

```sh
ipfs pin ls YOUR_FOLDER_CID
```

`YOUR_FOLDER_CID` ifadesini önceki adımdaki CID ile değiştirin; çıktı `recursive` şeklinde olmalıdır. Sabitleme (pinning), bu düğümün kopyasını çöp toplamaya (garbage collection) karşı korur, ancak kapalı bir bilgisayarı çevrimiçi tutmaz. Düğümünüz çevrimdışıyken erişilebilirlik için [uzaktan sabitleme](https://docs.ipfs.tech/how-to/work-with-pinning-services/) ayarlayın ve uzak hizmetin sabitleme işlemini tamamladığını doğrulayın.

### Web sitenize IPFS üzerinde erişin:

Sitenizi önce `http://127.0.0.1:8080/ipfs/YOUR_FOLDER_CID/` adresindeki yerel ağ geçidi üzerinden kontrol edin (daemon'unuzun yazdırdığı ağ geçidi bağlantı noktası farklıysa onu kullanın). Sondaki eğik çizgi, göreli bağlantıların dizin içinde çözümlenmesini sağlar.

`https://ipfs.io/ipfs/YOUR_FOLDER_CID/` gibi herkese açık bir ağ geçidi, içeriği erişilebilir bir düğümden alabildiği anda onu sunabilir. Yerel önizlemenin başarılı olması, içeriğin herkese açık olarak erişilebilir olduğunu kanıtlamaz.

Bizim durumumuzda CID = "QmW2UEfap1vrRRvS5H9wed8qmsx4WsvXBk3GPGVVfWx3r3"


## IPNS

Interplanetary Naming System (IPNS), web sitenizle ilişkilendirilen IPFS CID'lerini güncellemenize ve yine de sabit bir bağlantı sunmanıza olanak tanır. Bu, bir anahtar olarak sağlanır.

![](/content-images/dns-query.a0134a75-9ef7817f80.webp)

IPFS masaüstü uygulamasında site klasörünüzün ayarlar menüsünde Publish to IPNS seçeneğini seçin.

![](/content-images/IPNS-2fe62cc369.webp)

Anahtar: "k51qzi5uqu5di670a6uxywo17b2be1eyhoa2cl0qlwpfxn5p9ypcu8jbzgnj4n"

Ayrıca sitemizi bir gateway üzerinden görüntülemek için de kullanılabilir: https://ipfs.io/ipns/k51qzi5uqu5di670a6uxywo17b2be1eyhoa2cl0qlwpfxn5p9ypcu8jbzgnj4n


## DNS Link

Site oluşturuldu, şimdi bir URL'yi içeriğe yönlendirecek bir yola ihtiyacımız var.

`example.com` için bu DNS kaydını ekleyin ve `YOUR_FOLDER_CID` değerini kendi dizin CID'nizle değiştirin:

| Tür | Ad | Değer |
|---|---|---|
| TXT | `_dnslink.example.com` | `dnslink=/ipfs/YOUR_FOLDER_CID` |

Bazı DNS sağlayıcıları bölgeyi otomatik olarak ekler; orada yalnızca `_dnslink` girin. Yukarıdaki IPNS adını kullanıyorsanız, değer bunun yerine `dnslink=/ipns/YOUR_IPNS_NAME` olabilir. Bkz. [DNSLink](https://docs.ipfs.tech/concepts/dnslink/).

![](/content-images/example-c2a9edb28b.webp)

DNS yayılımı tamamlandıktan sonra `https://ipfs.io/ipns/example.com/` adresini deneyin. Siteyi doğrudan `https://example.com/` adresinde sunmak için ayrıca DNSLink destekli bir ağ geçidi ve HTTPS yapılandırması da gerekir; TXT kaydı tek başına bunları kurmaz. [Özel alan adı kılavuzunu](https://docs.ipfs.tech/how-to/websites-on-ipfs/custom-domains/) izleyin.

Tebrikler! Sansüre dayanıklı bir web sitesi kurdunuz.


**Kaynaklar**

[IPFS Dokümantasyonu](https://docs.ipfs.tech)

[IPNS Dokümantasyonu](https://docs.ipfs.tech/concepts/ipns/)

[DNS link Dokümanları](https://dnslink.io/#introduction)
