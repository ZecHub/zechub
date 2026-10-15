# Zcash Devtool

[zcash-devtool nedir?](https://github.com/zcash/zcash-devtool?tab=readme-ov-file) 

Zcash Devtool, Zcash üzerinde çalışmak için bir platformdur. Geliştiriciler tarafından, geliştiriciler için, yeni Zcash işlevlerini test etmek ve geliştirmek amacıyla oluşturulmuştur; üretim ortamına hazır kabul edilmemelidir. Bu aracın sunduğu komut satırı API'si herhangi bir zamanda ve uyarı yapılmaksızın değişebilir ve değişecektir. zcash-devtool gömülü cüzdanının yönetimine KESİNLİKLE önemli miktarda fon ayırmayın.

### Zcash Devtool video eğitimi:
Kris Nuttycombe (@nuttycom), bu aracı ZconVI sırasında sundu.

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/5gvQF5oFT8E"
    title="zcash-devtool: Kris Nuttycombe ile Zcash geliştirme çoklu aracı - ZconVI"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>


---

Bu araçları kullanmaya başlamak için adım adım bir kılavuz için [bu rehbere](https://github.com/zcash/zcash-devtool/blob/main/doc/walkthrough.md) bakın. zcash devtool araçlarını nasıl kuracağınızı ve kullanacağınızı baştan sona açıklar. Nasıl kurulum yapacağınız ve araca kendi işlevlerinizi nasıl ekleyeceğiniz konusunda rehber olması amaçlanmıştır.

## Hızlı başlangıç

Aşağıdaki komutlar zcash-devtool `main` (commit `5a26ee8`, Ağustos 2026) ile kontrol edilmiştir. Araç bildirimde bulunmaksızın değişir; bu nedenle burada bir şey artık eşleşmiyorsa herhangi bir komutta `--help` çalıştırın.

### Kurulum

Önceden derlenmiş ikili dosyalar yoktur. [Rust](https://rustup.rs) kurun, ardından kaynaktan derleyin:

```bash
git clone https://github.com/zcash/zcash-devtool.git
cd zcash-devtool
cargo run --release -- --help
```

Aşağıdaki örnekler derlenen ikili dosyayı, `target/release/zcash-devtool`, çağırır. `cargo run --release -- ...` de aynı şekilde çalışır.

### Bir testnet cüzdanı oluşturun

Testnet'te başlayın. Testnet coinlerinin (TAZ) değeri yoktur.

```bash
zcash-devtool wallet -w ./my-wallet init --name demo -i ./my-wallet-identity.txt -n test
zcash-devtool wallet -w ./my-wallet sync
zcash-devtool wallet -w ./my-wallet balance
```

- `-w` cüzdan dizinidir. `wallet` sonrasında ve alt komuttan önce yer alır.
- `-i` bir [age](https://age-encryption.org) kimlik dosyasıdır. Cüzdanın anımsatıcı ifadesi bununla şifrelenir ve dosya yoksa oluşturulur. Saklayın: `send`, `shield` ve diğer harcama komutlarının seed'i çözmek için buna ihtiyacı vardır.
- `-n` ağdır: `test` veya `main`.
- `-s` hafif cüzdan sunucusunu seçer. Varsayılan olan `zecrocks`, seçilen ağ için zec.rocks sunucusuna bağlanır.
- Mevcut bir cüzdanı geri yüklemek için `init` yerine `restore-mnemonic` kullanın. İfadeyi girmenizi ister.

`balance`, Ironwood dahil olmak üzere her havuzu ayrı ayrı listeler:

```
    Balance:   0.00000000 TAZ
     Sapling Spendable:   0.00000000 TAZ
     Orchard Spendable:   0.00000000 TAZ
    Ironwood Spendable:   0.00000000 TAZ
  Unshielded Spendable:   0.00000000 TAZ
```

Cüzdanın birleşik adresini görmek için `zcash-devtool wallet -w ./my-wallet list-addresses` çalıştırın ve [faucet](https://zechub.wiki/using-zcash/faucets) aracılığıyla buna testnet fonu gönderin.

Mainnet için `init` komutuna `-n main` iletin. Yalnızca kaybetmeyi göze alabileceğiniz tutarları kullanın.

### Gönderin ve shield edin

Tutarlar zatoshi cinsindendir (1 ZEC = 100.000.000 zatoshi).

```bash
zcash-devtool wallet -w ./my-wallet send -i ./my-wallet-identity.txt \
  --address <recipient address> --value 100000 --memo "hello"
zcash-devtool wallet -w ./my-wallet shield -i ./my-wallet-identity.txt
```

`propose`, göndermeden önce bir `send` tarafından oluşturulacak işlemi gösterir. `list-tx` ve `list-unspent`, cüzdanın geçmişini ve notlarını gösterir.

Bir sunucuyla iletişim kuran tüm komutlar ayrıca bağlantıyı yerleşik Tor istemcisi üzerinden yönlendiren `--connection tor` seçeneğini de kabul eder.

### Adresleri, anahtarları ve işlemleri inceleyin

`inspect`, Zcash verilerini çevrimdışı olarak çözümler: adresler, anahtarlar ve ham işlemler. İşlem kimliğine göre işlem gibi zincirden daha fazla bilgi almak için `--lookup` ekleyin.

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

Ironwood notları, birleşik bir adresteki aynı Orchard alıcısına gönderilir; dolayısıyla adresler NU6.3 ile değişmedi.

### PCZT'lerle işlemleri adım adım oluşturun

Bir PCZT (kısmen oluşturulmuş Zcash işlemi), işlem oluşturmayı ayrı adımlara böler: oluşturma, kanıtlama, imzalama ve gönderme. Her adım, örneğin Keystone gibi bir donanım imzalayıcıyla farklı bir makinede çalıştırılabilir. Her `pczt` komutu, PCZT öğesini bir dosyadan veya stdin'den okur ve bir dosyaya (`--output`) ya da stdout'a yazar; dolayısıyla adımlar boru hattına bağlanabilir:

```bash
zcash-devtool pczt -w ./my-wallet create --address <recipient address> --value 100000 \
  | zcash-devtool pczt -w ./my-wallet prove -i ./my-wallet-identity.txt \
  | zcash-devtool pczt -w ./my-wallet sign -i ./my-wallet-identity.txt \
  | zcash-devtool pczt -w ./my-wallet send
```

`zcash-devtool pczt --help`, `inspect`, `redact`, `combine`, `extract` ve `shield` dahil diğer adımları listeler.

### Fonları Orchard konumundan Ironwood konumuna taşıma

NU6.3'ten beri, Orchard fonları yalnızca cüzdanın kendi adreslerine taşınabilir. `migration` komutları bunları Ironwood içine taşır:

```bash
zcash-devtool migration -w ./my-wallet plan
zcash-devtool migration -w ./my-wallet commit -i ./my-wallet-identity.txt
zcash-devtool migration -w ./my-wallet status
zcash-devtool migration -w ./my-wallet advance
```

- `plan` not bölünmelerini ve aktarım takvimini önizler, hiçbir şeyi değiştirmez.
- `commit` ilk hazırlık işlemlerini oluşturur ve önceden imzalar. Keystone gibi harici bir imzalayıcı için bunları imzasız bırakmak üzere `--external` ekleyin.
- `status` geçişin ilerlemesini ve sonraki adımı gösterir.
- `advance` anchor'ı hazır olan sonraki işlemi kanıtlar.

Geçiş komutları hâlâ geliştirilmektedir. `advance`, yayınlama araçta henüz uygulanmadığından, yayınlamaya hazır ilk işlemde durur. Günlük kullanım için, fonları Ironwood destekleyen bir cüzdanla taşıyın. [Shielded Pools](https://zechub.wiki/using-zcash/shielded-pools) bölümüne bakın.


**Güvenlik Uyarıları:**
BUNU KESİNLİKLE ÜRETİM ORTAMINDA KULLANMAYIN!!!
Uygulama, güvenlik göz önünde bulundurularak yazılmamıştır. Bununla birlikte, kendi riskiniz altında küçük ölçekli denemeler için kullanılabilir olmasını sağlayacak anımsatıcı seed ifadelerinin şifrelenmesi gibi olanaklara sahiptir.

### Gelişmiş (librustzcash eğitimi )


[videoyu buradan izleyin](https://free2z.cash/uploadz/public/ZcashTutorial/librustzcash-a-rust-crates.mp4)
