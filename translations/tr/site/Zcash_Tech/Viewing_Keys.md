<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Viewing_Keys.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Sayfayı Düzenle"/>
</a>

# Viewing Keys

Shielded adresler, kullanıcıların Zcash blokzincirinde mümkün olduğunca az bilgi açığa çıkararak işlem yapmasını sağlar. Peki, shielded bir Zcash işlemiyle ilgili hassas bilgileri belirli bir tarafla paylaşmanız gerektiğinde ne olur? Her shielded adres bir viewing key içerir. Viewing key'ler [ZIP 310](https://zips.z.cash/zip-0310) ile tanıtıldı ve Sapling ağ yükseltmesiyle protokole eklendi. Viewing key'ler, kullanıcıların işlemlerle ilgili bilgileri seçici olarak paylaşmasına imkân tanıdığı için Zcash'in çok önemli bir parçasıdır.

### Neden bir viewing key kullanılır?

Bir kullanıcı neden bunu yapmak istesin ki? Electric Coin Co.'nun bu konudaki blogundan...

*- Bir borsa, bir müşterinin shielded bir adrese ZEC yatırdığını tespit etmek isterken **spend authority** anahtarlarını güvenli donanımda tutmak isteyebilir. Borsa bir incoming viewing key oluşturup bunu internete bağlı bir **detection** düğümüne yükleyebilir; spending key ise daha güvenli sistemde kalır.*

*- Bir saklama kuruluşunun, Zcash varlıklarının görünürlüğünü denetçilere sağlaması gerekebilir. Saklayıcı, shielded adreslerinin her biri için bir full viewing key oluşturabilir ve bu anahtarı denetçisiyle paylaşabilir. Denetçi, bu adreslerin bakiyesini doğrulayabilir ve bu adreslere gelen ve bu adreslerden giden geçmiş işlem faaliyetlerini inceleyebilir.* 

*- Bir borsa, shielded bir adresten yatırma yapan bir müşteri üzerinde ek inceleme kontrolleri yürütmek zorunda kalabilir. Borsa, müşteriden shielded adresine ait viewing key'i talep edebilir ve gelişmiş inceleme prosedürlerinin bir parçası olarak müşterinin shielded işlem faaliyetlerini gözden geçirmek için bunu kullanabilir.*

### Viewing key'inizi nasıl bulursunuz

#### zcashd

* *./zcash-cli listaddresses* kullanarak bilinen tüm adresleri listeleyin

* Ardından UA'lar veya Sapling shielded adresleri için aşağıdaki komutu çalıştırın

  ```bash
  ./zcash-cli z_exportviewingkey "<UA or Z address>"
  ```

#### Ywallet

* Sağ üst köşede "Backup" seçeneğini seçin, telefonunuzda kimlik doğrulaması yapın, ardından görüntülenen viewing key'inizi kopyalayın.

### Viewing key'inizi nasıl kullanırsınız

#### zcashd

* Herhangi bir vkey veya ukey ile aşağıdakini kullanın: 

```bash
./zcash-cli z_importviewingkey "vkey/ukey" whenkeyisnew 30000
```

#### ywallet

* Sağ üst köşede "Account" seçeneğini seçin, ardından sağ altta bulunan "+" simgesine tıklayarak viewing key'inizi içe aktarın ve 'read-only' hesabınızı ekleyin.

<a href="">
    <img src="https://i.ibb.co/C0b002N/image-2024-01-13-175554676.png" alt="" width="200" height="280"/>
</a>


#### zcashblockexplorer.com

* Tarayıcınızı doğrudan [buraya](https://zcashblockexplorer.com/vk) yönlendirin ve sonuçları bekleyin! not: bu sonuç artık zcashblockexplorer düğümünde bulunduğundan, bu bilgiyi zcashblockexplorer.com sahiplerine emanet etmiş olursunuz

### Kaynaklar

Harika bir teknoloji olsa da, viewing key'leri yalnızca gerektiğinde kullanmanız önerilir.

Viewing key'lerle ilgili bu eğitime göz atın. Konuyu daha derinlemesine incelemek isterseniz, aşağıda bu konuyla ilgili kaynakların bir listesi yer alıyor:

- [ECC, Viewing Keys Açıklaması](https://electriccoin.co/blog/explaining-viewing-keys/)
- [ECC, Selective Disclosure ve Viewing Keys](https://electriccoin.co/blog/viewing-keys-selective-disclosure/)
- [ECC, Zcash Viewing Key Video Sunumu](https://www.youtube.com/watch?v=NXjK_Ms7D5U&t=199s)
- [ZIP 310](https://zips.z.cash/zip-0310)
