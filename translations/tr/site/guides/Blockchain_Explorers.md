<a href="https://github.com/zechub/zechub/edit/main/site/guides/Blockchain_Explorers.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Blokzincir Gezginleri

## Giriş

Geleneksel iş dünyasında her işlem, satın alma kanıtı olarak bir makbuz içerir. Benzer şekilde, blokzincir dünyasında bir kullanıcı, tamamlanan her işlem için işlem kimliği biçiminde dijital bir makbuz alır. Çoğu cüzdan bunu sizin için sağlar. Blokzincir gezginleri, bir blokzincirde daha önce gerçekleşmiş olanları görselleştirmeyi sağlayan araçlardır. Girdi olarak işlem kimliklerini, adresleri veya blok hash'lerini alır ve gerçekleşenleri görsel olarak sunarlar.

## Örnekler
<div>

- Bitcoin: [c839b44a7052393f4672cdc4ec79f8f15d3036565e13bede0fab91f674506a7c](https://mempool.space/tx/c839b44a7052393f4672cdc4ec79f8f15d3036565e13bede0fab91f674506a7c)

- Ethereum: [0x43117fc201f8d3c09a72d42ab4a048003f348917771b9ace64b8944a91807320](https://etherscan.io/tx/0x43117fc201f8d3c09a72d42ab4a048003f348917771b9ace64b8944a91807320)

- Cosmos: [D0587C76E7689A9EFBDDA587DDB450F6C6E972FCEEA37DD8DA9AF95C23CF8170](https://www.mintscan.io/cosmos/txs/D0587C76E7689A9EFBDDA587DDB450F6C6E972FCEEA37DD8DA9AF95C23CF8170)

- Zcash (herkese açık): [8dd212847a97c5eb9cee5e7e58c4d9e739f4156273ae3b2da1a4ff79ad95ff82](https://explorer.zec.rocks/transactions/8dd212847a97c5eb9cee5e7e58c4d9e739f4156273ae3b2da1a4ff79ad95ff82)

- Zcash (gizli): [19a4be270089490ece2e5fe7a6c9b9804af3c7ed43e1fb1b744b0fb29070fa5d](https://explorer.zec.rocks/transactions/19a4be270089490ece2e5fe7a6c9b9804af3c7ed43e1fb1b744b0fb29070fa5d)

</div>


#### Zcash'te ikinci işlemin tüm önemli ayrıntılarının gizlendiğine dikkat edin; bu önemlidir ve dijital dünyada büyük etkileri vardır.


## Blokzincir Haritaları

Dijital makbuz olarak elimizde bu uzun karakter dizisi var, peki şimdi ne olacak? İşte bu noktada, blokzincirde ne olduğunu anlamamıza yardımcı olması için bir [blokzincir gezgini](https://nym.com/blog/using-blockchain-privately), ya da harita, kullanırız. Yukarıda her zincirin kendi [blokzincir gezgini](https://nym.com/blog/using-blockchain-privately) sürümü olduğuna dikkat edin. Tüm bu blokzincir projelerinin açık kaynaklı yazılım örnekleri olduğunu anlamak önemlidir. Yani herkes koda katkıda bulunabilir ve/veya kodu kendi isteğine göre fork'layabilir. Bu anlayışla, her proje farklı alanlarda uzmanlaşır ve blokzincir gezginini söz konusu projenin ihtiyaçlarına uyacak şekilde özelleştirir.

### Bloklar
İşlemler *bloklara* yerleştirilir. Bir blok madenciliği yapıldığında/doğrulandığında, o blok içindeki her işlem onaylanır ve bir blok hash'i oluşturulur. Oluşturulan herhangi bir hash, bir blok gezginine girilebilir. CEX'lerin fonlarınızı serbest bırakmadan önce belirli sayıda *onay* istediğini görmüş olabilirsiniz; işleminizin yeterince kesinleştiğinden emin olmak için kullandıkları ölçüt budur. Blokzincir, hangi işlemlerin bir sonraki bloğa gireceğini nasıl belirler? Bu karmaşık bir araştırma konusudur, ancak modern zincirlerin çoğu, sıranın başına kimin geçeceğini belirlemek için *ücretler* fikrini kullanır. Ücret ne kadar yüksekse, kuyruğun önüne geçme olasılığınız o kadar yüksektir.

### Adresler

[Blokzincir gezginlerini](https://nym.com/blog/using-blockchain-privately) görsel olarak öğrenmenin eğlenceli bir yolu, rastgele herhangi bir işlemin adresini girmektir. Ardından zamanda geriye giderek fonların nereden geldiğini görebilirsiniz! Her işlemin hem bir giriş hem de bir çıkış adresi vardır. Bu bilgiyle, harcanmış herhangi bir işlemden hem ileri hem de geri yönde kolayca ilerlenebilir. Bulmacaları sevenler için bu, devasa bir finansal bulmacanın dijital karşılığıdır ve şeffaflık amacıyla kullanılabilir. Bir blokzincir gezgini kullanmak bunu yalnızca görselleştirmeyi çok daha kolaylaştırmakla kalmaz, *aynı zamanda işlem gizliliğine duyulan ihtiyacı da vurgular*. Korumalı Zcash kullanmıyorsanız, bunu *herhangi* bir şeffaf blokzincirde yapabilirsiniz: BTC, ETH, ATOM, DOGE, VTC, vb. ... . Bu nokta, yalnızca dijital bir geleceğe güvenle ilerlerken blokzinciri kullanan herkes için kritik önemdedir.

### Miktarlar

Yukarıdaki adreslere benzer şekilde, herkese açık bir blokzincirdeki her işlemin miktarları açıkça görülebilir. Buna, herhangi bir işlem için hem giriş hem de çıkış adreslerindeki miktarlar dahildir. Bunun bir istisnası, Korumalı Zcash kullanmayı seçtiğiniz zamandır -- bu durumda tüm miktarlar gizlenir. *Adil ticaret* için zorunlu olarak gizliliğe ihtiyaç duyan küçük işletme sahipleri açısından bu büyük bir avantajdır!

![amounts](/content-images/206312357-e9504151-830f-4fa1-81cb-f23619-210f51493c.webp)


### Bir gezginin Zcash üzerinde görebildikleri ve göremedikleri

#### Kısaca
- Şeffaf (`t`) adresler, tıpkı Bitcoin'de olduğu gibi, bir gezginde tamamen görünür
- Tamamen korumalı (z'den z'ye) işlemler miktarı, adresleri ve notu gizler
- Ücret, tamamen korumalı bir işlemde bile görünür
- Bir taraf şeffaf olduğu için korumalama (`t`'den korumalıya geçiş) ve korumayı kaldırma (korumalıdan tekrar `t`'ye geçiş) kısmen görünür
- Gizlilik yalnızca fonlar korumalı havuzların içinde kaldığı sürece korunur

Zcash'in birden fazla adres türü vardır ve bir gezgin bunlara çok farklı davranır.

`t` ile başlayan şeffaf adresler Bitcoin gibi çalışır. Bir gezgin göndericiyi, alıcıyı, miktarı ve fonların geldiği yere uzanan geçmişi gösterir.

Korumalı adresler gizli taraftır. Sapling veya Orchard [korumalı havuzlarındaki](https://zechub.wiki/using-zcash/shielded-pools#content) fonlar sıfır bilgi ispatlarıyla korunur. Tamamen korumalı bir işlemi aradığınızda gezgin miktarı, adresleri veya notu gösteremez. Yalnızca geçerli bir işlemin gerçekleştiğini ve bir bloğa kaydedildiğini doğrulayabilir. Bu, sayfanın üst kısmına yakın gösterilen gizli örnektir.

Tamamen korumalı işlemler için bile bir ayrıntı görünür kalır: ücret. Zcash konsensüs kuralları, şeffaf ücretin açıkça belirtilmesini gerektirir; dolayısıyla miktarlar maskelenmiş olsa bile bir gezgin bunu her zaman gösterebilir. Bu nedenle, alışılmadık bir miktar ödeyerek işleminizin öne çıkmaması için standart cüzdan ücretini kullanmak iyi bir uygulamadır.

Gezgin ayrıca fonların şeffaf ve korumalı taraflar arasında ne zaman geçtiğini de görebilir. `t` fonlarını bir havuza taşımak korumalamadır, onları tekrar dışarı taşımak ise korumayı kaldırmadır. Bir taraf şeffaf olduğundan bu geçişler kısmen görünür. Bir `t` adresine hiç dokunmayan, yalnızca tamamen gizli z'den z'ye faaliyet, ücret dışındaki her şeyi gizli tutar.

Çıkarım şudur: gizlilik, korumalı havuzların içinde kalmaya bağlıdır. Fonlar bir `t` adresine dokunduğunda, geçmişlerinin bu kısmı Bitcoin kadar herkese açıktır. Korumalı faaliyetlerinizi, örneğin bir muhasebeci gibi seçtiğiniz bir kişiye kanıtlamak için bunu herkese açık hâle getirmek yerine bir viewing key paylaşın. [Viewing Keys](https://zechub.wiki/zcash-tech/viewing-keys#content) sayfasına bakın.


### Zcash Blok Gezginleri Listesi

- [Zcash Blok Gezgini](https://mainnet.zcashexplorer.app/)

- [Blockchair](https://blockchair.com)

- [3xpl](https://3xpl.com/zcash)

- [Bitquery](https://explorer.bitquery.io/zcash)


### Görsel Rehber

İşte farklı blokzincir gezginlerine dair dört iyi örnek:

* [Mempool.space](https://mempool.space)
* [Ethscan](https://etherscan.io/)
* [Zcash Blok Gezgini](https://mainnet.zcashexplorer.app)
* [Mintscan](https://hub.mintscan.io/chains/ibc-network)


![bitcoinExlporer](/content-images/206279968-a06eb0a1-b3a6-49af-a30f-7d871b-1418d95d28.webp)


![ethExplorer](/content-images/206280208-2ce5eddd-157e-4eed-90a0-680c15-488292c345.webp)


![zcashExplorer](/content-images/206280454-a2c7563f-e82d-47b9-9b58-02eece-76db7aec4c.webp)


![cosmos](/content-images/206316791-2debfd28-923a-44f4-b7d3-701182-cf39a065fc.webp)
