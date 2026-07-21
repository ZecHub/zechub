<a href="https://github.com/Zechub/zechub/edit/main/site/ZFAV_Club/Guides_for_Creators/Publish_Site_on_IPFS.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Sayfayı Düzenle"/>
</a>

# IPFS Üzerinde Bir Site Yayınlama

<a href="">
    <img src="https://blog.desdelinux.net/wp-content/uploads/2020/04/IPFS-.jpg" alt="" width="800" height="400"/>
</a>



## IPFS'ye Giriş

IPFS (InterPlanetary File System), dosyaları depolamak ve paylaşmak için merkeziyetsiz bir yöntem oluşturmak amacıyla tasarlanmış eşler arası bir protokol ve ağdır.

İnternetin geleneksel istemci-sunucu modelinden farklı olarak IPFS, kullanıcıların içerikleri depolamak ve dağıtmak için merkezi bir sunucuya güvenmek yerine dosyaları doğrudan birbirleriyle paylaşmalarına olanak tanır.

IPFS içindeki dosyalar *content-addressing* kullanılarak adreslenir; yani her dosyaya içeriğine göre benzersiz bir hash veya CONTENT IDENTIFIER (CID) verilir ve bu hash dosyayı ağdan geri almak için kullanılır.

Bir kullanıcı IPFS'ye bir dosya eklediğinde, dosya block adı verilen küçük parçalara bölünür ve her bloğa bir CID verilir. Bu bloklar daha sonra ağdaki farklı düğümlerde saklanır, böylece dosya birden fazla kaynaktan kolayca geri alınabilir.

Bu, yedeklilik ve hata toleransı sağlar; aynı zamanda herhangi bir düğümün tek bir hata veya kontrol noktası hâline gelmesini zorlaştırır.

**Okuyun: [IPFS'ye Giriş](https://blog.infura.io/post/an-introduction-to-ipfs)**

## Sitenizi Oluşturma

Bu örnekte basit bir web sitesi oluşturuyoruz.

[Örnek Site](https://squirrel.surf/)

**Adım 1:** Web tasarımına aşina değilseniz, web siteniz için Başlık, ana metin gövdesi, diğer sayfalara/sitelere bağlantılar ve alt bilgi dahil olmak üzere ana içeriği yazın.

**Adım 2:** Bir [HTML şablonu kullanın!](https://nicepage.com/html-templates) Yazdığınız metni uygun şekilde yapıştırın. İsteğe bağlı olarak web siteniz için bir .CSS stil sayfası da oluşturabilirsiniz.

**Adım 3:** Dizinizi kaydedin. Tüm .html sayfaları + görseller aynı klasörde olmalıdır.

## Bir Node Kurulumu

IPFS'yi [resmî web sitesinden](https://docs.ipfs.tech/install/ipfs-desktop/) indirin ve kurun.

### IPFS'yi başlatın:

Masaüstü Uygulamasını kullanıyorsanız başlatmanız gerekmez.

Bir Terminal veya komut istemi kullanarak şu komutu çalıştırın: ipfs init

### **Site Klasörünü IPFS'ye Ekleyin**:

Web sitenizin dosyalarının bulunduğu klasörü seçin ve Add Folder seçeneğine gidin.


<a href="">
    <img src="https://i.ibb.co/ZHW4zsY/ipfs-site-folder.png" alt="" width="400" height="200"/>
</a>

–

Terminal kullanıyorsanız, tüm klasörü özyinelemeli olarak IPFS'ye eklemek için şu komutu çalıştırın: ipfs add -r folder_name

### Siteyi IPFS Üzerinde Pinleyin:

Web sitenizin dosyaları IPFS'ye eklendikten sonra, ağ üzerinde erişilebilir kalmalarını sağlamak için bunları **pinlemeniz** gerekir.

–

Terminal kullanıyorsanız, şu komutu çalıştırın: If using Terminal, Run command: ipfs pin add **hash**

**hash** = önceki adımda eklediğiniz klasörün CID'si.

Alternatif olarak, [Pinata](https://pinata.cloud/) veya [Dolpin](https://dolpin.io/) gibi hizmetleri kullanarak da dizinleri pinleyebilirsiniz.

Bu size çok zaman kazandırır!

–

### Web sitenize IPFS üzerinde erişin:

Web siteniz artık IPFS üzerinde yayınlandı ve klasörün hash'i kullanılarak erişilebilir. Web sitenize erişmek için https://ipfs.io/ipfs/**hash** adresini ziyaret edebilirsiniz.

**hash** = klasörün CID'si.

Bizim durumumuzda CID = QmW2UEfap1vrRRvS5H9wed8qmsx4WsvXBk3GPGVVfWx3r3

## IPNS

Interplanetary Naming System (IPNS), web sitenizle ilişkili IPFS CID'lerini güncellemenize ve yine de sabit bir bağlantı sunmanıza olanak tanır. Bir anahtar olarak sağlanır.


<a href="">
    <img src="https://dnslink.io/assets/dns-query.a0134a75.png" alt="" width="400" height="100"/>
</a>


IPFS masaüstü uygulamasında site klasörünüzün ayarlar menüsünde Publish to IPNS seçeneğini seçin.

<a href="">
    <img src="https://i.ibb.co/Ch25dKf/IPNS.png" alt="" width="400" height="200"/>
</a>


Anahtar: “k51qzi5uqu5di670a6uxywo17b2be1eyhoa2cl0qlwpfxn5p9ypcu8jbzgnj4n”

Ayrıca sitemizi bir gateway üzerinden görüntülemek için de kullanılabilir: https://ipfs.io/ipns/k51qzi5uqu5di670a6uxywo17b2be1eyhoa2cl0qlwpfxn5p9ypcu8jbzgnj4n

## DNS Link

Site oluşturuldu, şimdi bir URL'yi içeriğe yönlendirecek bir yola ihtiyacımız var.

Zaten bir web adresine sahipseniz, TXT kaydı _dnslink(your domain) kullanarak yeni bir kayıt ekleyebilirsiniz. Sağlayıcıya bağlı olarak bu kayıt otomatik olarak doldurulabilir.


<a href="">
    <img src="https://i.ibb.co/MgRxBHj/example.png" alt="" width="400" height="100"/>
</a>


Görüntüleyebilmeniz için ağ genelinde yayılması zaman alacaktır.

*Tebrikler! Artık sansüre dayanıklı bir web siteniz var.*

____

**Kaynaklar**

[IPFS Dokümantasyonu](https://docs.ipfs.tech/)

[IPNS Dokümantasyonu](https://docs.ipfs.tech/concepts/ipns/)

[DNS link Dokümanları](https://dnslink.io/#introduction)
