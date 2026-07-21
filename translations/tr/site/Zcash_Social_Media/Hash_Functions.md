# Sıfırdan Sıfır Bilgiye: Hash Fonksiyonları

**Seri Girişi**  
Yeni bir seriye hoş geldiniz: **Sıfırdan Sıfır Bilgiye**!  

Bu seride, gizliliği koruyan protokollerimizin temelini oluşturan çok çeşitli teknolojilerin esaslarını öğreneceğiz.

---

## Bölüm 1: Hash Fonksiyonları

Bugün, blockchains'te kullanılan kriptografinin temel parçalarından biri olan **Hash Fonksiyonları** ile başlıyoruz. Bu serinin ilerleyen bölümlerinde, özelliklerine dayanan bazı konuları ele alacağız.

### Hash Fonksiyonu Nedir?

Hash Fonksiyonları, herhangi bir uzunluktaki girdiyi alır ve sabit uzunlukta bir çıktı üretir.

- **Hash'lenecek mesaj** = Girdi  
- **Kullanılan algoritma** = Hash Fonksiyonu  
- **Ortaya çıkan çıktı** = Hash Değeri  


![Hash Function diagram](https://pbs.twimg.com/media/Fn_NkFHXgAEtgse.png)

### Kendiniz deneyin!

Bu aracı kullanarak konuyu uygulamalı olarak anlayalım!  
Sabit uzunlukta bir çıktı üretmek için istediğiniz herhangi bir metni girin. Çıktının farklı hash algoritmalarına göre nasıl değiştiğini gözlemleyin.

**Deneyin:** https://cryptii.com/pipes/hash-function

---

### Kriptografik Hash Fonksiyonlarının Özellikleri

Kriptografik Hash Fonksiyonları şu **3 özelliğe** sahip olmalıdır:

1. **Tek yönlü** - Bir hash fonksiyonunu tersine çevirmek pratikte mümkün olmamalıdır  
2. **Çakışmaya dayanıklı** - İki farklı girdi aynı çıktıya hash'lenmemelidir  
3. **Deterministik** - Herhangi bir girdi için bir hash fonksiyonu her zaman aynı sonucu vermelidir

---

### Yaygın Hash Fonksiyonları

Hash Fonksiyonlarının birkaç sınıfı vardır. Bazı örnekler:

- Secure Hashing Algorithm (**SHA-3**)  
- Message Digest Algorithm 5 (**MD5**)  
- **BLAKE2b** - Zcash anahtar türetiminde kullanılır

**Zooko tarafından BLAKE2'ye giriş**: https://www.zfnd.org/blog/blake2/

---

### Hash Fonksiyonlarının Gerçek Dünyadaki Kullanımları

#### 1. Bütünlük Hash'leme (Veri Bütünlüğü Kontrolleri)
Veri bütünlüğü kontrolleri, "Bütünlük Hash'leme"ye bir örnektir. Veri dosyaları üzerinde checksum üretmek için kullanılırlar ve kullanıcıya doğruluk konusunda güvence sağlarlar.

![Integrity Hashing example](https://pbs.twimg.com/media/Fn_Or0MWIAI6sgx.png)

#### 2. Merkle Ağaçları (Hash Ağaçları)
Bir **hash ağacı** veya **Merkle ağacı**, bir veri bloğunun kriptografik hash'i ile etiketlenmiş dallardan ve yaprak düğümlerden oluşur.

![Merkle Tree diagram](https://pbs.twimg.com/media/Fn_O7ndWIAY5PA-.jpg)

Merkle ağaçları, **kriptografik taahhüt şeması**na bir örnektir. Ağacın kökü bir taahhüt olarak görülür ve yaprak düğümlerin orijinal taahhüdün parçası olduğu kanıtlanır.

P2P ağlarında depolanan veya aktarılan verileri doğrularlar ve eşlerden alınan verilerin değiştirilmediğini garanti ederler.

#### 3. Zcash'te Note Commitment Tree
Zcash **Sapling** ve **Orchard** shielded pool'larında, **Note Commitment Tree**, işlemlerin mutabakat kurallarına göre geçerli olduğunu doğrulamak için kullanılırken göndereni, alıcıyı ve kullanılan miktarları tamamen gizler.

#### 4. Signature Hash (Bitcoin tarzı bloklar)
**SHA256**, Bitcoin zincirindeki her bloğun değiştirilemezliğini sağlamak için kullanılan bir "Signature hash" örneğidir. Madenciler yeni bloklar için önceki bloğun hash'ini + mevcut bloktaki tüm işlemlerin hash'ini (hashMerkleRoot) + zaman damgasını + rastgele değer / ağ zorluğunu kullanır.

![SHA256 block diagram](https://pbs.twimg.com/media/Fn_PaVZXoAApHPf.jpg)

#### 5. Equihash (Zcash Madenciliği)
**Equihash**, Zcash madenciliğinde kullanılan hash algoritmasıdır. Ayrıca Komodo ve Horizen gibi ağlar tarafından da kullanılır.

**Equihash hakkında orijinal Zcash blog yazısı**: https://electriccoin.co/blog/equihash/

---

### Ek Okuma

Farklı hash fonksiyonu türleri ve bunların ilişkili kullanım alanları hakkında daha iyi bir anlayış geliştirmek için bu mükemmel bir kaynaktır:  
https://en.wikipedia.org/wiki/Hash_function

---

**ZecHub (@ZecHub) tarafından oluşturulan flood**  
Orijinal X flood'u: https://x.com/ZecHub/status/1621240109663227906  

---

*Bu sayfa, ZecHub wiki için orijinal Zero to Zero Knowledge flood'undan derlenmiştir.*
