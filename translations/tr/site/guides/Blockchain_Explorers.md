<a href="https://github.com/zechub/zechub/edit/main/site/guides/Blockchain_Explorers.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Sayfayı Düzenle"/>
</a>

# Blockchain Gezgini Araçları

## Giriş

Geleneksel iş dünyasında her işlem, satın alma kanıtı olarak bir makbuz içerir. Benzer şekilde, blockchain dünyasında bir kullanıcı, tamamlanan her işlem için işlem kimliği biçiminde dijital bir makbuz alır. Çoğu cüzdan bunu sizin için sağlar. Blockchain gezgini araçları ise, bir blockchain üzerinde zaten gerçekleşmiş olanları görselleştirmeye yarayan araçlardır. Girdi olarak işlem kimliklerini, adresleri veya blok hash’lerini alırlar ve gerçekleşenleri görsel olarak gösterirler.

## Örnekler
<div>

- Bitcoin: [c839b44a7052393f4672cdc4ec79f8f15d3036565e13bede0fab91f674506a7c](https://mempool.space/tx/c839b44a7052393f4672cdc4ec79f8f15d3036565e13bede0fab91f674506a7c)

- Ethereum: [0x43117fc201f8d3c09a72d42ab4a048003f348917771b9ace64b8944a91807320](https://etherscan.io/tx/0x43117fc201f8d3c09a72d42ab4a048003f348917771b9ace64b8944a91807320)

- Cosmos: [D0587C76E7689A9EFBDDA587DDB450F6C6E972FCEEA37DD8DA9AF95C23CF8170](https://www.mintscan.io/cosmos/txs/D0587C76E7689A9EFBDDA587DDB450F6C6E972FCEEA37DD8DA9AF95C23CF8170)

- Zcash (genel): [8dd212847a97c5eb9cee5e7e58c4d9e739f4156273ae3b2da1a4ff79ad95ff82](https://explorer.zec.rocks/transactions/8dd212847a97c5eb9cee5e7e58c4d9e739f4156273ae3b2da1a4ff79ad95ff82)

- Zcash (özel): [19a4be270089490ece2e5fe7a6c9b9804af3c7ed43e1fb1b744b0fb29070fa5d](https://explorer.zec.rocks/transactions/19a4be270089490ece2e5fe7a6c9b9804af3c7ed43e1fb1b744b0fb29070fa5d)

</div>


#### Zcash ile ikinci işlemin tüm önemli ayrıntılarının gizlendiğine dikkat edin; bu önemlidir ve dijital dünyada büyük sonuçlar doğurur.


## Blockchain Haritaları

Elimizde dijital makbuz olarak bu uzun karakter dizisi var, şimdi ne olacak? İşte burada, blockchain üzerinde neler olduğunu anlamamıza yardımcı olması için bir [blockchain explorer](https://nym.com/blog/using-blockchain-privately), yani harita kullanırız. Yukarıda her zincirin kendine özgü bir [blockchain explorer](https://nym.com/blog/using-blockchain-privately) sürümü olduğuna dikkat edin. Tüm bu blockchain projelerinin açık kaynaklı yazılım örnekleri olduğunu anlamak önemlidir. Yani herkes koda katkıda bulunabilir ve/veya onu kendi isteğine göre fork edebilir. Bunu akılda tutarak, her proje farklı alanlarda uzmanlaşır ve blockchain gezginini o projenin ihtiyaçlarına uygun şekilde özelleştirir.

### Bloklar
İşlemler *bloklar* içine yerleştirilir. Bir blok madencilik/validasyon sürecinden geçtiğinde, o bloğun içindeki her işlem onaylanır ve bir blok hash’i oluşturulur. Oluşturulan herhangi bir hash, bir blok gezginine girilebilir. CEX'lerin fonlarınızı serbest bırakmadan önce belirli sayıda *onay* istediğini görmüş olabilirsiniz; işleminizin yeterince kesinleştiğinden emin olmak için kullandıkları ölçüt budur. Blockchain hangi işlemlerin bir sonraki bloğa gireceğini nasıl belirler? Bu karmaşık bir araştırma konusudur, ancak modern zincirlerin çoğu sıranın önüne kimin geçeceğini belirlemek için *ücretler* fikrini kullanır. Ücret ne kadar yüksekse, kuyruğun önüne geçme olasılığınız da o kadar yüksektir.

### Adresler

[Blockchain explorer](https://nym.com/blog/using-blockchain-privately) araçlarını görsel olarak öğrenmenin eğlenceli bir yolu, rastgele herhangi bir işlemin adresini girmektir. Sonra zamanda geriye gidip fonların nereden geldiğini görebilirsiniz! Her işlemin hem bir giriş hem de bir çıkış adresi vardır. Bu bilgilerle donanmış olarak, harcanmış herhangi bir işlemden hem ileriye hem de geriye doğru kolayca ilerlenebilir. Bulmaca sevenler için bu, devasa bir finansal bulmacanın dijital eşdeğeridir ve şeffaflık amacıyla kullanılabilir. Bir blockchain explorer kullanmak bunu yalnızca görselleştirmeyi çok daha kolay hale getirmez, aynı zamanda işlem gizliliğine duyulan ihtiyacı da *vurgular*. Shielded Zcash kullanmıyorsanız, bunu *herhangi* bir şeffaf blockchain ile yapabilirsiniz: BTC, ETH, ATOM, DOGE, VTC, vb. ... . Bu nokta, yalnızca dijital bir geleceğe güvenli şekilde geçerken blockchain kullanan herkes için kritik önemdedir.

### Miktarlar

Yukarıdaki adreslere benzer şekilde, genel bir blockchain üzerindeki herhangi bir işlemin miktarları da herkesin görebileceği şekilde açıktır. Buna, herhangi bir işlem için hem giriş hem de çıkış adreslerindeki miktarlar dahildir. Bunun bir istisnası, Shielded Zcash kullanmayı seçtiğiniz zamandır -- bu durumda tüm miktarlar gizlenir. Adil ticaret için mutlaka gizliliğe ihtiyaç duyan küçük işletme sahipleri için bu büyük bir avantajdır!

![amounts](https://user-images.githubusercontent.com/81990132/206312357-e9504151-830f-4fa1-81cb-f23619fd7226.png)


### Bir gezginin Zcash üzerinde görebilecekleri ve göremeyecekleri

#### Kısaca
- Şeffaf (`t`) adresler, tıpkı Bitcoin gibi, bir gezginde tamamen görünür
- Tamamen shielded (z'den z'ye) işlemler miktarı, adresleri ve notu gizler
- Ücret, tamamen shielded bir işlemde bile görünür kalır
- Shielding (`t`den shielded'a geçiş) ve deshielding (shielded'dan tekrar `t`ye dönüş) kısmen görünürdür, çünkü taraflardan biri şeffaftır
- Gizlilik yalnızca fonlar shielded pool'ların içinde kaldığı sürece korunur

Zcash birden fazla adres türüne sahiptir ve bir gezgin bunlara çok farklı şekilde davranır.

`T` ile başlayan şeffaf adresler Bitcoin gibi çalışır. Bir gezgin göndericiyi, alıcıyı, miktarı ve fonların nereden geldiğine kadar uzanan izi gösterir.

Shielded adresler özel taraftır. Sapling veya Orchard [shielded pools](https://zechub.wiki/using-zcash/shielded-pools#content) içindeki fonlar sıfır bilgi ispatlarıyla korunur. Tamamen shielded bir işleme baktığınızda gezgin miktarı, adresleri veya notu gösteremez. Yalnızca geçerli bir işlemin gerçekleştiğini ve bir bloğa kaydedildiğini doğrulayabilir. Bu, sayfanın üst kısmında gösterilen gizli özel örnektir.

Bir ayrıntı, tamamen shielded işlemlerde bile görünür kalır: ücret. Zcash mutabakat kuralları, şeffaf ücretin açıkça belirtilmesini gerektirir; bu nedenle gezgin, miktarlar maskelenmiş olsa bile ücreti her zaman gösterebilir. Bu nedenle, işleminizin alışılmadık bir miktar ödeyerek dikkat çekmemesi için standart cüzdan ücretini kullanmak iyi bir uygulamadır.

Gezgin ayrıca fonların şeffaf ve shielded taraflar arasında ne zaman geçtiğini de görebilir. `T` fonlarını bir pool içine taşımak shielding, onları tekrar dışarı çıkarmak ise deshielding olarak adlandırılır. Bu geçişler kısmen görünürdür çünkü taraflardan biri şeffaftır. Yalnızca hiçbir zaman bir `t` adresine dokunmayan, tamamen özel z'den z'ye faaliyetler ücret dışında her şeyi gizli tutar.

Çıkarılması gereken sonuç şu: gizlilik, shielded pool'ların içinde kalmaya bağlıdır. Fonlar bir `t` adresine dokunduğunda, geçmişlerinin o kısmı Bitcoin kadar açık hale gelir. Kendi shielded faaliyetlerinizi seçtiğiniz birine, örneğin bir muhasebeciye kanıtlamak için, bunu herkese açık hale getirmek yerine bir viewing key paylaşın. [Viewing Keys](https://zechub.wiki/zcash-tech/viewing-keys#content) sayfasına bakın.


### Görsel Rehber

İşte farklı blockchain explorer araçlarına dair dört iyi örnek:

* [Mempool.space](https://mempool.space)
* [Ethscan](https://etherscan.io/)
* [Zcash Blok Gezgini](https://mainnet.zcashexplorer.com)
* [Mintscan](https://hub.mintscan.io/chains/ibc-network)


![bitcoinExlporer](https://user-images.githubusercontent.com/81990132/206279968-a06eb0a1-b3a6-49af-a30f-7d871b906eeb.png)


![ethExplorer](https://user-images.githubusercontent.com/81990132/206280208-2ce5eddd-157e-4eed-90a0-680c1520ec57.png)


![zcashExplorer](https://user-images.githubusercontent.com/81990132/206280454-a2c7563f-e82d-47b9-9b58-02eece1c89ee.png)


![cosmos](https://user-images.githubusercontent.com/81990132/206316791-2debfd28-923a-44f4-b7d3-701182112c30.png)
