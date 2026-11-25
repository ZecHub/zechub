# Zcash Geliştirici Aracı

[zcash-devtool nedir?](https://github.com/zcash/zcash-devtool?tab=readme-ov-file) 

Zcash Geliştirici Aracı, Zcash üzerinde geliştirme yapmak için bir platformdur. Geliştiriciler tarafından, geliştiriciler için, yeni Zcash işlevlerini test etmek ve geliştirmek amacıyla oluşturulmuştur; üretime hazır olduğu düşünülmemelidir. Bu aracın sunduğu komut satırı API’si her an ve önceden haber verilmeksizin değişebilir ve değişecektir. zcash-devtool gömülü cüzdanının yönetimi için önemli miktarda fon KESİNLİKLE yatırmayın.

### Zcash Geliştirici Aracı video eğitimi:
Kris Nuttycombe (@nuttycom), bu aracı ZconVI sırasında tanıttı.

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/5gvQF5oFT8E"
    title="zcash-devtool: Kris Nuttycombe ile Zcash geliştirme çok amaçlı aracı - ZconVI"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>


---

Bu araçları kullanmaya nasıl başlayacağınızı adım adım anlatan bir kılavuz için [bu anlatıma](https://github.com/zcash/zcash-devtool/blob/main/doc/walkthrough.md) göz atın. Bu kılavuz, zcash geliştirici aracı yazılımını kurup kullanmaya yönelik kapsamlı bir anlatım sunar. Aracı kurmak ve araca kendi işlevlerinizi eklemek için yol gösterici olarak hazırlanmıştır.

## Hızlı başlangıç

Aşağıdaki komutlar zcash-devtool `main` (`5a26ee8` commit’i, Ağustos 2026) ile kontrol edilmiştir. Araç haber verilmeksizin değişebilir; burada yazanlar artık eşleşmiyorsa herhangi bir komuta `--help` ekleyerek çalıştırın.

### Kurulum

Önceden derlenmiş ikili dosyalar yoktur. [Rust](https://rustup.rs) kurun, ardından kaynak koddan derleyin:

```bash
git clone https://github.com/zcash/zcash-devtool.git
cd zcash-devtool
cargo run --release -- --help
```

Aşağıdaki örneklerde derlenmiş ikili dosya olan `target/release/zcash-devtool` çağrılır. `cargo run --release -- ...` de aynı şekilde çalışır.

### Bir testnet cüzdanı oluşturma

Testnet’te başlayın. Testnet coin’lerinin (TAZ) hiçbir değeri yoktur.

```bash
zcash-devtool wallet -w ./my-wallet init --name demo -i ./my-wallet-identity.txt -n test
zcash-devtool wallet -w ./my-wallet sync
zcash-devtool wallet -w ./my-wallet balance
```

- `-w` cüzdan dizinidir. `wallet` sonrasında ve alt komuttan önce gelir.
- `-i` bir [age](https://age-encryption.org) kimlik dosyasıdır. Cüzdanın anımsatıcı ifadesi bu dosyayla şifrelenir; dosya mevcut değilse oluşturulur. Dosyayı saklayın: `send`, `shield` ve diğer harcama komutlarının seed’in şifresini çözmek için bu dosyaya ihtiyacı vardır.
- `-n` ağdır: `test` veya `main`.
- `-s` light cüzdan sunucusunu seçer. Varsayılan değer olan `zecrocks`, seçilen ağın zec.rocks sunucusuna bağlanır.
- Mevcut bir cüzdanı geri yüklemek için `init` yerine `restore-mnemonic` kullanın. İfade istenir.

`balance`, Ironwood dâhil her havuzu ayrı ayrı listeler:

```
    Balance:   0.00000000 TAZ
     Sapling Spendable:   0.00000000 TAZ
     Orchard Spendable:   0.00000000 TAZ
    Ironwood Spendable:   0.00000000 TAZ
  Unshielded Spendable:   0.00000000 TAZ
```

Cüzdanın birleşik adresini görmek için `zcash-devtool wallet -w ./my-wallet list-addresses` komutunu çalıştırın ve bir [faucet](https://zechub.wiki/using-zcash/faucets) üzerinden bu adrese testnet fonu gönderin.

Mainnet için `init` komutuna `-n main` iletin. Yalnızca kaybetmeyi göze alabileceğiniz miktarları kullanın.

### Gönderme ve korumalı havuza aktarma

Miktarlar zatoshi cinsindendir (1 ZEC = 100.000.000 zatoshi).

```bash
zcash-devtool wallet -w ./my-wallet send -i ./my-wallet-identity.txt \
  --address <recipient address> --value 100000 --memo "hello"
zcash-devtool wallet -w ./my-wallet shield -i ./my-wallet-identity.txt
```

`propose`, bir `send` tarafından oluşturulacak işlemi göndermeden gösterir. `list-tx` ve `list-unspent`, cüzdanın geçmişini ve note’larını gösterir.

Bir sunucuyla iletişim kuran tüm komutlar, bağlantıyı yerleşik Tor istemcisi üzerinden yönlendiren `--connection tor` seçeneğini de kabul eder.

### Adresleri, anahtarları ve işlemleri inceleme

`inspect`, Zcash verilerini çevrimdışı olarak çözümler: adresleri, anahtarları ve ham işlemleri. İşlem kimliğiyle işlem bulmak gibi Zincir’den daha fazla bilgi almak için `--lookup` ekleyin.

```
$ zcash-devtool inspect utest1h55y5z...
Zcash address
 - Network: testnet
 - Kind: Unified Address
 - Receivers:
   - Orchard (...)
   - Sapling (...)
   - Transparent P2PKH (...)
```

Ironwood note’ları, birleşik adresteki aynı Orchard alıcısına gönderilir; bu nedenle adresler NU6.3 ile değişmedi.

### PCZT’lerle işlemleri adım adım oluşturma

Bir PCZT (kısmen oluşturulmuş Zcash işlem), işlem oluşturma sürecini ayrı adımlara böler: oluşturma, kanıtlama, imzalama ve gönderme. Örneğin Keystone gibi bir donanım imzalayıcısıyla her adım farklı bir makinede çalıştırılabilir. Her `pczt` komutu PCZT dosyadan veya standart girdiden okur ve bir dosyaya (`--output`) ya da standart çıktıya yazar; böylece adımlar ardışık olarak bağlanabilir:

```bash
zcash-devtool pczt -w ./my-wallet create --address <recipient address> --value 100000 \
  | zcash-devtool pczt -w ./my-wallet prove -i ./my-wallet-identity.txt \
  | zcash-devtool pczt -w ./my-wallet sign -i ./my-wallet-identity.txt \
  | zcash-devtool pczt -w ./my-wallet send
```

`zcash-devtool pczt --help`, `inspect`, `redact`, `combine`, `extract` ve `shield` dâhil diğer adımları listeler.

### Fonları Orchard havuzundan Ironwood havuzuna taşıma

NU6.3 sürümünden beri Orchard fonları yalnızca cüzdanın kendi adreslerine taşınabilir. `migration` komutları bunları Ironwood havuzuna taşır:

```bash
zcash-devtool migration -w ./my-wallet plan
zcash-devtool migration -w ./my-wallet commit -i ./my-wallet-identity.txt
zcash-devtool migration -w ./my-wallet status
zcash-devtool migration -w ./my-wallet advance
```

- `plan` note bölünmelerini ve transfer zamanlamasını önizler, hiçbir değişiklik yapmaz.
- `commit` ilk hazırlık işlemlerini oluşturur ve önceden imzalar. Keystone gibi harici bir imzalayıcının kullanılması için imzasız bırakmak üzere `--external` ekleyin.
- `status` geçişin ilerleme durumunu ve sonraki adımı gösterir.
- `advance`, dayanak noktası hazır olan sonraki işlemi kanıtlar.

Geçiş komutları hâlâ geliştirilmektedir. `advance`, yayınlanmaya hazır ilk işlemde durur; çünkü bu araçta henüz yayınlama özelliği uygulanmamıştır. Günlük kullanımda fonları Ironwood destekleyen bir cüzdanla taşıyın. [Korumalı Havuzlar](https://zechub.wiki/using-zcash/shielded-pools) sayfasına bakın.


**Güvenlik Uyarıları:**
BUNU ÜRETİM ORTAMINDA KULLANMAYIN!!!
Uygulama güvenlik göz önünde bulundurularak yazılmamıştır. Bununla birlikte, anımsatıcı seed ifadelerinin şifrelenmesi gibi özellikler, riski size ait olmak üzere küçük ölçekli deneylerde kullanılmasını mümkün kılmalıdır.

### Gelişmiş (librustzcash eğitim )


[videoyu buradan izleyin](https://free2z.cash/uploadz/public/ZcashTutorial/librustzcash-a-rust-crates.mp4)
