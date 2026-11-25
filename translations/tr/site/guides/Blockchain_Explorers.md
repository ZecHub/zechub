<a href="https://github.com/zechub/zechub/edit/main/site/guides/Blockchain_Explorers.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Sayfayı Düzenle"/>
</a>

# Blokzincir Gezgini

## Giriş

Geleneksel iş dünyasında her işlem, satın alma kanıtı olarak bir makbuz içerir. Benzer şekilde, blokzincir dünyasında bir kullanıcı, tamamlanan her işlem için işlem kimliği biçiminde dijital bir makbuz alır. Çoğu cüzdan bunu sizin için sağlar. Blokzincir gezginleri, bir blokzincirde gerçekleşmiş olanları görselleştirmenizi sağlayan basit araçlardır. Girdi olarak işlem kimliklerini, adresleri veya blok özetlerini alır ve gerçekleşenleri görsel olarak gösterirler.

## Örnekler
<div>

- Bitcoin: [c839b44a7052393f4672cdc4ec79f8f15d3036565e13bede0fab91f674506a7c](https://mempool.space/tx/c839b44a7052393f4672cdc4ec79f8f15d3036565e13bede0fab91f674506a7c)

- Ethereum: [0x43117fc201f8d3c09a72d42ab4a048003f348917771b9ace64b8944a91807320](https://etherscan.io/tx/0x43117fc201f8d3c09a72d42ab4a048003f348917771b9ace64b8944a91807320)

- Cosmos: [D0587C76E7689A9EFBDDA587DDB450F6C6E972FCEEA37DD8DA9AF95C23CF8170](https://www.mintscan.io/cosmos/txs/D0587C76E7689A9EFBDDA587DDB450F6C6E972FCEEA37DD8DA9AF95C23CF8170)

- Zcash (genel): [8dd212847a97c5eb9cee5e7e58c4d9e739f4156273ae3b2da1a4ff79ad95ff82](https://mainnet.zcashexplorer.app/transactions/8dd212847a97c5eb9cee5e7e58c4d9e739f4156273ae3b2da1a4ff79ad95ff82)

- Zcash (özel): [19a4be270089490ece2e5fe7a6c9b9804af3c7ed43e1fb1b744b0fb29070fa5d](https://mainnet.zcashexplorer.app/transactions/19a4be270089490ece2e5fe7a6c9b9804af3c7ed43e1fb1b744b0fb29070fa5d)

</div>


#### Zcash ile ikinci işlemin tüm önemli ayrıntılarının gizlendiğine dikkat edin; bu, dijital dünyada önemli ve büyük sonuçları olan bir durumdur.


## Blokzincir Haritaları

Dijital bir makbuz olarak elimizde bu uzun karakter dizisi var; şimdi ne olacak? Blokzincirde ne olduğunu anlamamıza yardımcı olması için bir [blokzincir gezgini](https://nym.com/blog/using-blockchain-privately) veya harita kullandığımız yer burasıdır. Yukarıda her Zincirin kendine ait bir [blokzincir gezgini](https://nym.com/blog/using-blockchain-privately) sürümü olduğuna dikkat edin. Tüm bu blokzincir projelerinin açık kaynaklı yazılım örnekleri olduğunu anlamak önemlidir. Yani herkes koda katkıda bulunabilir veya kodu kendi istediği şekilde çatallayabilir. Bu anlayışla her proje farklı alanlarda uzmanlaşır ve blokzincir gezginini söz konusu projenin ihtiyaçlarına uyacak şekilde özelleştirir.

### Bloklar
İşlemler *blokların* içine yerleştirilir. Bir blok madencilikle çıkarıldığında/doğrulandığında, o blok içindeki her işlem onaylanır ve bir blok özeti oluşturulur. Oluşturulan herhangi bir özet, bir blok gezginine girilebilir. CEX'lerin paranızı serbest bırakmadan önce belirli sayıda *onay* gerektirdiğini görmüş olabilirsiniz; kullandıkları ölçüt, işleminizin yeterince kesinleştiğinden emin olmaktır. Blokzincir, bir sonraki bloğa hangi işlemlerin gireceğini nasıl belirler? Araştırması karmaşık bir konudur, ancak modern Zincirlerin çoğu, kimin sıranın önüne geçeceğini belirlemek için *ücretler* fikrini kullanır. Ücret ne kadar yüksekse, sıranın önüne geçme olasılığınız o kadar yüksek olur.

### Adresler

[blokzincir gezginlerini](https://nym.com/blog/using-blockchain-privately) görsel olarak öğrenmenin eğlenceli bir yolu, rastgele bir işlemin adresini girmektir. Ardından zamanda geriye giderek fonların nereden geldiğini görebilirsiniz! Her işlemin hem bir giriş hem de bir çıkış adresi vardır. Bu bilgiler sayesinde harcanmış herhangi bir işlemden hem ileriye hem de geriye kolayca gidebilirsiniz. Bulmacaları sevenler için bu, devasa bir finansal bulmacanın dijital eşdeğeridir ve şeffaflık amacıyla kullanılabilir. Bir blokzincir gezgini kullanmak, bunu görselleştirmeyi yalnızca çok kolaylaştırmakla kalmaz, aynı zamanda işlem gizliliğinin gerekliliğini de *vurgular*. Korumalı Zcash kullanmadığınız sürece bunu BTC, ETH, ATOM, DOGE, VTC vb. *herhangi bir* şeffaf blokzincir ile yapabilirsiniz... Bu nokta, yalnızca dijital bir geleceğe güvenli biçimde ilerlerken blokzinciri kullanan herkes için kritik öneme sahiptir.

### Tutarlar

Yukarıdaki adreslere benzer şekilde, genel bir blokzincirdeki herhangi bir işlemin tutarları herkesin görebileceği şekilde açıktadır. Buna, herhangi bir işlemin hem giriş hem de çıkış adreslerindeki tutarlar dahildir. Bunun bir istisnası, Shielded Zcash kullanmayı seçtiğiniz zamandır; bu durumda tüm tutarlar gizlenir. *Adil ticaret* için zorunlu olarak gizliliğe ihtiyaç duyan küçük işletme sahipleri için bu büyük bir avantajdır!

![amounts](/content-images/206312357-e9504151-830f-4fa1-81cb-f23619-210f51493c.webp)


### Zcash üzerinde bir gezginin görebileceği ve göremeyeceği şeyler

#### Kısaca
- Şeffaf (`t`) adresler, tıpkı Bitcoin'de olduğu gibi bir gezginde tamamen görünür
- Tamamen korumalı (z'den z'ye) işlemler tutarı, adresleri ve memo'yu gizler
- Ücret, tamamen korumalı bir işlemde bile görünür durumdadır
- Korumalı hâle getirme (`t` korumalı hâle getirme) ve korumasını kaldırma (korumalı hâlden `t` hâline getirme) kısmen görünürdür, çünkü bir taraf şeffaftır
- Gizlilik yalnızca fonlar korumalı havuzların içinde kaldığı sürece geçerlidir

Zcash birden fazla adres türüne sahiptir ve bir gezgin bunlara çok farklı biçimlerde davranır.

`t` ile başlayan şeffaf adresler Bitcoin gibi çalışır. Bir gezgin göndereni, alıcıyı, tutarı ve fonların geldiği yere kadar olan izi gösterir.

Korumalı adresler özel taraftır. Sapling veya Orchard [korumalı havuzlar](https://zechub.wiki/using-zcash/shielded-pools#content) içindeki fonlar sıfır bilgi kanıtlarıyla korunur. Tamamen korumalı bir işlemi aradığınızda gezgin tutarı, adresleri veya memo'yu gösteremez. Yalnızca geçerli bir işlemin gerçekleştiğini ve bir bloğa kaydedildiğini doğrulayabilir. Bu, bu sayfanın üst kısmında gösterilen gizli özel örnektir.

Tamamen korumalı işlemlerde bile görünür kalan bir ayrıntı vardır: ücret. Zcash konsensüs kuralları, şeffaf ücretin açıkça belirtilmesini gerektirir; bu nedenle tutarlar maskelenmiş olsa bile gezgin ücreti her zaman gösterebilir. Bu nedenle standart cüzdan ücretini kullanmak iyi bir uygulamadır; böylece alışılmadık bir tutar ödeyerek işleminiz dikkat çekmez.

Gezgin, fonların şeffaf ve korumalı taraflar arasında ne zaman geçtiğini de görebilir. `t` fonlarını bir havuza taşımak korumalı hâle getirmedir; fonları tekrar dışarı taşımak ise korumasını kaldırmadır. Bu geçişler kısmen görünürdür, çünkü bir taraf şeffaftır. Bir `t` adresine hiç dokunmayan tamamen özel z'den z'ye etkinlik, ücret dışındaki her şeyi gizli tutar.

Çıkarılacak sonuç şudur: Gizlilik, korumalı havuzların içinde kalmaya bağlıdır. Fonlar bir `t` adresine dokunduğunda, geçmişlerinin o kısmı Bitcoin kadar geneldir. Kendi korumalı etkinliğinizi muhasebeci gibi seçtiğiniz birine kanıtlamak için bunu herkese açık hâle getirmek yerine bir görüntüleme anahtarı paylaşın. [Görüntüleme Anahtarları](https://zechub.wiki/zcash-tech/viewing-keys#content) sayfasına bakın.


### Zcash Blokzincir Gezginleri Listesi

- [Zcash Blok Gezgini](https://mainnet.zcashexplorer.app/)

- [3xpl](https://3xpl.com/zcash)

- [ShieldedScan](https://shieldedscan.xyz)

- [ZecBlock](https://zecblock.com/)

- [SoChain](https://sochain.com/zec) ([testnet](https://sochain.com/zectest))

- [ZecZcash Gezgini](https://zeczcash.com/explorer)



### Görsel Rehber

Farklı blokzincir gezginlerine ilişkin dört iyi örneği burada bulabilirsiniz:

* [Mempool.space](https://mempool.space)
* [Ethscan](https://etherscan.io/)
* [Zcash Blok Gezgini](https://mainnet.zcashexplorer.app)
* [Mintscan](https://hub.mintscan.io/chains/ibc-network)


![bitcoinExlporer](/content-images/206279968-a06eb0a1-b3a6-49af-a30f-7d871b-1418d95d28.webp)


![ethExplorer](/content-images/206280208-2ce5eddd-157e-4eed-90a0-680c15-488292c345.webp)


![zcashExplorer](/content-images/206280454-a2c7563f-e82d-47b9-9b58-02eece-76db7aec4c.webp)


![cosmos](/content-images/206316791-2debfd28-923a-44f4-b7d3-701182-cf39a065fc.webp)
