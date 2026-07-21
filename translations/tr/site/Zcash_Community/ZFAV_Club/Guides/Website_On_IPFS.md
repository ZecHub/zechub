<a href="https://github.com/Zechub/zechub/edit/main/site/Zcash_Community/ZFAV_Club/Guides/Website_On_IPFS.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Sayfayı Düzenle"/>
</a>

# IPFS Üzerinde Bir Web Sitesi Yayınlama

![](https://blog.desdelinux.net/wp-content/uploads/2020/04/IPFS-.jpg)

## IPFS'ye Giriş

IPFS (InterPlanetary File System), dosyaları depolamak ve paylaşmak için merkeziyetsiz bir yöntem oluşturmak amacıyla tasarlanmış eşler arası bir protokol ve ağdır.

İnternetin geleneksel istemci-sunucu modelinden farklı olarak IPFS, kullanıcıların içerikleri depolamak ve dağıtmak için merkezi bir sunucuya güvenmek yerine dosyaları doğrudan birbirleriyle paylaşmasına olanak tanır.

IPFS içindeki dosyalar *content-addressing* kullanılarak adreslenir; bu, her dosyaya içeriğine göre benzersiz bir hash veya CONTENT IDENTIFIER (CID) verildiği ve bu hash'in dosyayı ağdan almak için kullanıldığı anlamına gelir.

Bir kullanıcı IPFS'ye bir dosya eklediğinde, dosya blok adı verilen küçük parçalara ayrılır ve her bloğa bir CID verilir. Bu bloklar daha sonra ağdaki farklı node'larda depolanır, böylece dosya birden fazla kaynaktan kolayca alınabilir.

Bu, yedeklilik ve hata toleransı sağlarken aynı zamanda herhangi bir node'un tek başına bir arıza veya kontrol noktası haline gelmesini zorlaştırır.

[IPFS'ye Giriş](https://blog.infura.io/post/an-introduction-to-ipfs) yazısını okuyun.



## Sitenizi Oluşturma

Bu örnek için basit bir web sitesi oluşturuyoruz.

[Örnek Site](https://squirrel.surf)


**Adım 1:** Web tasarımına aşina değilseniz, web siteniz için Başlık, ana metin gövdesi, diğer sayfalara/sitelere bağlantılar ve alt bilgi dahil olmak üzere ana içeriği yazın.

**Adım 2:** Bir [HTML şablonu kullanın!](https://nicepage.com/html-templates) Yazdığınız metni uygun şekilde yapıştırın. İsteğe bağlı olarak web siteniz için bir .CSS stil sayfası da oluşturabilirsiniz.

**Adım 3:** Dizininizi kaydedin. Tüm .html sayfaları + görseller aynı Klasörde olmalıdır.



## Bir Node Kurulumu

IPFS'yi [resmi web sitesinden](https://docs.ipfs.tech/install/ipfs-desktop/) indirip kurun.



### IPFS'yi başlatın:

Masaüstü uygulamasını kullanıyorsanız başlatma yapmanız gerekmez.

Bir Terminal veya komut istemi kullanarak şu komutu çalıştırın: <mark>ipfs init </mark>.



**Site Klasörünü IPFS'ye Ekleyin**:

Web sitenizin dosyalarının bulunduğu klasörü seçin ve Klasör Ekle seçeneğine gidin.

![](https://i.ibb.co/ZHW4zsY/ipfs-site-folder.png)

--

Terminal kullanıyorsanız, klasörün tamamını özyinelemeli olarak IPFS'ye eklemek için şu komutu çalıştırın: <mark>ipfs add -r "folder_name"</mark>.


### Siteyi IPFS'de Sabitleyin:

Web sitenizin dosyaları IPFS'ye eklendikten sonra, ağ üzerinde erişilebilir kalmalarını sağlamak için bunları **pin** etmeniz gerekir.

--

Terminal kullanıyorsanız, şu komutu çalıştırın: If using Terminal, Run command: <mark>ipfs pin add "hash"</mark>

"hash" = önceki adımda eklediğiniz klasörün CID'si.


Alternatif olarak, [Pinata](https://pinata.cloud) veya [Dolpin](https://dolpin.io) gibi hizmetleri kullanarak dizinleri de pinleyebilirsiniz.

Bu, çok zaman kazandırır!

--

### Web sitenize IPFS üzerinde erişin:

Web siteniz artık IPFS üzerinde yayınlandı ve klasörün hash'i kullanılarak erişilebilir. Web sitenize erişmek için https://ipfs.io/ipfs/"hash" adresini ziyaret edebilirsiniz.

"hash" = klasörün CID'si.

Bizim durumumuzda CID = "QmW2UEfap1vrRRvS5H9wed8qmsx4WsvXBk3GPGVVfWx3r3"


## IPNS

Interplanetary Naming System (IPNS), web sitenizle ilişkilendirilen IPFS CID'lerini güncellemenize ve yine de sabit bir bağlantı sunmanıza olanak tanır. Bu, bir anahtar olarak sağlanır.

![](https://dnslink.io/assets/dns-query.a0134a75.png)

IPFS masaüstü uygulamasında site klasörünüzün ayarlar menüsünde Publish to IPNS seçeneğini seçin.

![](https://i.ibb.co/Ch25dKf/IPNS.png)

Anahtar: "k51qzi5uqu5di670a6uxywo17b2be1eyhoa2cl0qlwpfxn5p9ypcu8jbzgnj4n"

Ayrıca sitemizi bir gateway üzerinden görüntülemek için de kullanılabilir: https://ipfs.io/ipns/k51qzi5uqu5di670a6uxywo17b2be1eyhoa2cl0qlwpfxn5p9ypcu8jbzgnj4n


## DNS Link

Site oluşturuldu, şimdi bir URL'yi içeriğe yönlendirecek bir yola ihtiyacımız var.

Zaten bir web adresine sahipseniz, "_dnslink(your domain)" TXT kaydını kullanarak yeni bir kayıt ekleyebilirsiniz. Sağlayıcıya bağlı olarak bu alan otomatik olarak doldurulabilir.

![](https://i.ibb.co/MgRxBHj/example.png)

Görüntüleyebilmeniz için bunun ağ genelinde yayılması zaman alacaktır.

Tebrikler! Sansüre dayanıklı bir web sitesi kurdunuz.


**Kaynaklar**

[IPFS Dokümantasyonu](https://docs.ipfs.tech)

[IPNS Dokümantasyonu](https://docs.ipfs.tech/concepts/ipns/)

[DNS link Dokümanları](https://dnslink.io/#introduction)
