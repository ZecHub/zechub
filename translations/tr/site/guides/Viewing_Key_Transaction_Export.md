<a href="https://github.com/zechub/zechub/edit/main/site/guides/Viewing_Key_Transaction_Export.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Viewing Key'den İşlem Geçmişini Dışa Aktarma

Çoğu cüzdan dışa aktarımı yetersizdir. Örneğin ZODL'ün vergi dışa aktarımı, önceki takvim yılı için tarihleri, tutarları ve ücretleri verir; ancak işlem kimlikleri, memolar veya adresler içermez. Bu; muhasebe, bir cüzdan geçişini kontrol etmek ya da bir ödemeye ne olduğunu anlamak için yeterli değildir.

Tam resmi görmek için seed ifadenize ihtiyacınız yoktur. Bir birleşik tam görüntüleme anahtarı (UFVK, `uview1` ile başlayan), bir hesaptaki tüm gelen ve giden işlemleri görebilir ve iki araç bunu saklayacağınız bir dosyaya dönüştürebilir: Zkool GraphQL sunucusu ve zingo-cli. Bu rehber, [bu forum başlığındaki](https://forum.zcashcommunity.com/t/exporting-transaction-history-to-json-csv-from-ufvk-seed/54662) yaklaşımları derler ve güncel sürümler için günceller.

Eylül 2026'da Zkool 6.30.0 ve zingolib 6.0.0'dan zingo-cli ile test edildi.

## Başlamadan önce

İki şeye ihtiyacınız var:

1. Hesap için **UFVK**. [Görüntüleme Anahtarları](/zcash-tech/viewing-keys), neyi açığa çıkardığını ve nasıl dışa aktarılacağını açıklar.
2. **Doğum yüksekliği**, taramaya başlanacak blok. İlk işleminizden önceki bir yüksekliği kullanın. Çok yüksek ayarlarsanız eski geçmiş sessizce eksik kalır. Çok düşük ayarlarsanız tarama yalnızca daha uzun sürer. Sapling etkinleştirmesi (419200) her zaman güvenlidir, ancak taranması saatler sürebilir.

## Gizli tutun

Bir görüntüleme anahtarı harcama yapamaz, ancak anahtarı elinde tutan herkese tüm geçmişinizi gösterir.

- Onu bir web sitesine veya blok gezginine yapıştırmayın. Kendi çalıştırdığınız yazılıma içe aktarın.
- Senkronize olduğunuz sunucu IP adresinizi ve hangi işlemleri tam olarak indirdiğinizi görür. Aşağıdaki iki araç da memoları ve ücretleri okumak için işlemlerinizin her birini kimliğe göre getirir; ayrıca [ZIP 307](https://zips.z.cash/zip-0307), bunun sunucuya hangi işlemlerin size ait olduğunu söylediğini belirtir. Kendi Zebra düğümünüzden Zaino veya lightwalletd ile senkronizasyon bunu önler. [Zingolib ve Zaino Eğitimi](/guides/zingolib-and-zaino-tutorial), kurulumu adım adım anlatır.
- zingo-cli 6, ödemeleri Nym mixnet üzerinden gönderir; ancak senkronizasyonu hâlâ doğrudan sunucuya bağlanır, dolayısıyla yukarıdaki nokta bunun için de geçerlidir.
- Bu araçlara görüntüleme anahtarı verin, asla seed vermeyin. Zkool GraphQL sunucusunda varsayılan olarak giriş yoktur; API'si seed ile oluşturulmuş herhangi bir hesabın seed'ini geri verebilir ve fon gönderebilir.
- Sunucuyu kendi makinenizde tutun. Aşağıdaki Docker komutu yalnızca `127.0.0.1` üzerinde dinler.
- Her iki araç da anahtarı ve geçmişinizi şifrelenmemiş olarak saklar. İşiniz bittiğinde çalışma verilerini silin ve dışa aktarımı şifrelenmiş bir yerde tutun.

## Seçenek 1: Zkool GraphQL

`zkool_graphql`, Zkool'ün bağımsız bir sunucu olarak çalışan cüzdan motorudur. Zkool uygulamasından ayrı bir programdır. Çalıştırmanın en kolay yolu resmî Docker imajıdır (amd64 ve arm64). [Zkool sürümler sayfasında](https://github.com/hhanh00/zkool2/releases) bir Linux x86-64 ikilisi de vardır; glibc 2.38 veya daha yenisini gerektirir; bu nedenle Ubuntu 24.04 çalışır, Debian 12 ise çalışmaz.

### 1. Sunucuyu başlatın

```bash
docker run -d --name zkool-export \
  -p 127.0.0.1:8000:8000 \
  -v zkool-export:/data \
  hhanh00/zkool-graphql:6.30.0 \
  --db-path /data/zkool.db
```

`--lwd-url` ile kendi sunucunuzu eklemediğiniz sürece `https://zec.rocks` üzerinden senkronize olur. İlk başlatmada Sapling parametrelerini (yaklaşık 50 MB) indirir. Bu başarısız olursa, `docker start zkool-export` yeniden dener.

Tarayıcıda `http://127.0.0.1:8000/graphiql` adresini açın. Sonraki adımların her birini buraya yapıştırıp çalıştırabilirsiniz.

### 2. Anahtarı içe aktarın

```graphql
mutation {
  createAccount(newAccount: {
    name: "export"
    key: "uview1..."
    aindex: 0
    birth: 2500000
    useInternal: true
  })
}
```

Yeni hesabın kimliğini döndürür; yeni bir sunucuda bu 1'dir.

- Her zaman `birth` ayarlayın. Bu olmadan Zkool mevcut bloktan başlar ve hiçbir şey bulmaz.
- `useInternal: true`, Zkool'in şeffaf para üstü adreslerini de kontrol etmesini sağlar. ZODL kaynaklı anahtarlar için açık tutun; [Fonları Kurtarma](/using-zcash/recovering-funds)'nın ZODL seed'leri için kullandığı ayar da aynıdır.

### 3. Senkronize edin

```graphql
mutation { synchronizeAccount(idAccount: 1) }
```

Bu, senkronizasyon bitene kadar çalışır. `fast: true` eklemeyin. Memoların, ücretlerin ve çıktıların geldiği yer olan tam işlemlerin indirilmesini atlar.

Döndürdüğü sayı ulaşılamaya çalışılan yüksekliktir; oraya ulaştığının kanıtı değildir. Bir ağ hatası hiçbir şey bildirmeden senkronizasyonu erken bitirebilir; bu nedenle kontrol edin:

```graphql
{ currentHeight accounts { id name height } }
```

Hesabın `height` değeri `currentHeight`'nin gerisindeyse senkronizasyonu tekrar çalıştırın. Durduğu yerden devam eder.

### 4. Dışa aktarın

Bunu `history.graphql` olarak kaydedin:

```graphql
{
  transactionsByAccount(idAccount: 1) {
    txid height time value fee
    notes { pool scope address value memo }
    spends { pool scope address value }
    outputs { pool vout address value memo }
  }
}
```

Kastetmediğiniz sürece `height` bağımsız değişkenini kullanmayın. Bu bir minimum belirler; dolayısıyla forum örneğindeki `height: 3000000`, o bloktan önceki her şeyi çıkarır.

JSON olarak getirin:

```bash
jq -n --rawfile q history.graphql '{query: $q}' |
  curl -s http://127.0.0.1:8000/graphql \
    -H 'content-type: application/json' --data-binary @- > history.json
```

Madencilik ödülleri hariç, her işlemin 0'dan büyük bir ücreti görünmelidir. Bir işlemde `"fee": "0"` ve memo yoksa ayrıntıları indirilmemiştir. Zkool, taramadan sonra tam işlemleri teker teker getirir ve bir başarısızlık geri kalanını sessizce durdurur. Etkilenenleri listelemek için:

```bash
jq -r '.data.transactionsByAccount[] | select(.fee == "0") | .txid' history.json
```

Herhangi bir şey görünürse birkaç dakika sonra tekrar senkronize edin ve yeniden dışa aktarın.

Ardından bunu işlem başına bir satır olacak şekilde CSV'ye düzleştirin:

```bash
jq -r '["txid","height","time_utc","net_zec","fee_zec","memos"],
  (.data.transactionsByAccount[] |
    [.txid, .height, .time, .value, .fee,
     ([.notes[].memo, .outputs[].memo] | map(select(. != null and . != "")) | unique | join(" | "))])
  | @csv' history.json > history.csv
```

### Çıktıyı okuma

| Alan | Anlamı |
|---|---|
| `value` | Ücret dâhil, hesaptaki net değişim ZEC cinsindendir. Gönderimler için negatiftir. |
| `fee` | ZEC cinsinden ücret. Aldığınız ödemelerde bunu gönderen ödemiştir ve `value` içinde değildir. |
| `time` | Saat dilimi işareti olmadan UTC'deki blok zamanı |
| `notes` | Hesabın bu işlemde aldığı şey; para üstü dâhildir. Size gönderilen memolar buradadır. Şeffaf girdilerin adresi yoktur. |
| `spends` | Bu işlemin kullandığı hesabın kendi notları |
| `outputs` | İşlemin dışarı gönderdiği şey: her şeffaf çıktı ile memolarıyla birlikte diğer adreslere yapılan korumalı ödemeler |
| `pool` | 0 şeffaf, 1 Sapling, 2 Orchard, 3 Ironwood |
| `scope` | 0 harici (gelen ödeme), 1 dahili (para üstü) |

Zkool uygulamasında hesap menüsünde İşlemleri, Memoları ve Notları Dışa Aktar seçenekleri de bulunur; ancak bunlar ham tablo dökümleridir: tutarlar zatoshi cinsinden, Unix zaman damgalarıyla ve memolar ayrı bir dosyadadır.

## Seçenek 2: zingo-cli

zingo-cli, Zingo'ün komut satırı cüzdanıdır. Önceden oluşturulmuş indirmeler yoktur; bu nedenle Rust ile derlersiniz:

```bash
git clone --branch zingolib_v6.0.0 https://github.com/zingolabs/zingolib.git
cd zingolib
cargo build --release -p zingo-cli
cargo build --release --manifest-path zingo-netutils/Cargo.toml --features nym --bin nym-proxy
cp zingo-netutils/target/release/nym-proxy target/release/
```

Yalnızca senkronizasyon için bile `nym-proxy` gerekir. zingo-cli 6 onsuz hiçbir sunucuya bağlanmaz.

İlk çalıştırma yalnızca görüntülemeye yönelik bir cüzdan oluşturur, senkronize eder ve geçmişi yazdırır:

```bash
./target/release/zingo-cli --data-dir "$HOME/zingo-export" \
  --viewkey "uview1..." --birthday 2500000 \
  --server https://zec.rocks:443 \
  --waitsync transactions > transactions.txt
```

- `--data-dir` mutlak bir yol olmalıdır.
- `--viewkey` ve `--birthday` yalnızca cüzdan oluşturulurken geçerlidir. Sonrasında bunları kullanmayın.
- zingo-cli varsayılan olarak çevrimdışı başlar. `--server` sunucuyu seçer ve aynı zamanda çevrimiçi olma onayınız sayılır.
- Anahtar kabuk geçmişinizde kalır; bu yüzden sonrasında temizleyin.

Sonraki çalıştırmalar:

```bash
Z="./target/release/zingo-cli --data-dir $HOME/zingo-export"
$Z --server https://zec.rocks:443 --waitsync transactions > transactions.txt
$Z --offline value_transfers > value_transfers.txt
$Z --offline messages > memos.json
```

`--offline`, ağa dokunmadan zaten senkronize edilmiş olanı okur.

- `transactions` işlem başına bir girdi verir: txid, zaman (UTC), yükseklik, tür (`received`, `sent`, `shield` veya `send-to-self`), değer, ücret ve ilgili notlar.
- `value_transfers` ödeme başına bir girdi verir; dolayısıyla iki kişiye yapılan bir gönderim, her biri alıcı adresi ve memolarıyla iki girdi olur.
- `messages` memoları JSON olarak listeler.

Çıktı hakkında bilinmesi gereken birkaç şey:

- `transactions` ve `value_transfers`, JSON'a biraz benzeyen ancak JSON olmayan düz metin yazdırır.
- Tutarlar zatoshi cinsindendir (1 ZEC için 100.000.000) ve her zaman pozitiftir. `kind` yönü belirtir. Gönderimlerde `value`, ücret hariç diğer kişilere giden miktardır.
- Bir işlem size ait olmayan şeffaf fonları harcadığında ücret "not available" olarak görünür. Yalnızca metin memolar gösterilir.
- Senkronizasyon başarısız olursa hata dosyaya değil terminale gider ve zingo-cli yine de normal şekilde çıkar. `transactions.txt`'ye güvenmeden önce terminali kontrol edin.

dismad'in [zingoHelper](https://github.com/dismad/zingoHelper) aracı, `transactions`'ü JSON'a dönüştüren bir `exportToJSON.sh` betiğine sahiptir. zingo-cli 6'dan önce yazılmıştır, testnet için ayarlanmıştır, bazı giden Sapling ve şeffaf girdileri yer tutucu olarak işaretler ve GNU araçlarına ihtiyaç duyar; dolayısıyla standart macOS'ta çalışmaz. Çıktısını başlangıç noktası olarak görün ve toplamları kontrol edin.

## Bir görüntüleme anahtarının söyleyemeyecekleri

- **Fiyatlar.** Hiçbir araç, her işlem anındaki ZEC fiyatını kaydetmez. Fiat değerlerini kendiniz ekleyin.
- **Anahtar içermiyorsa şeffaf geçmiş.** UFVK'nin şeffaf kısmı [ZIP 316](https://zips.z.cash/zip-0316) kapsamında isteğe bağlıdır. zingo-cli ile `$Z --offline parse_viewkey uview1...`, bir anahtarın hangi havuzları kapsadığını gösterir.
- **Size kimin ödeme yaptığı.** Korumalı ödemeler gönderenin adresini taşımaz. Gönderen bunu memoya koymadıysa hiçbir yerde bulunmaz.
- **Bazı giden ayrıntılar.** Korumalı gönderimlerin hedef adresi, tutarı ve memosu anahtarla şifre çözülerek geri kazanılır. Bir cüzdan, bunun mümkün olmadığı bir işlem oluşturabilir; ancak çoğu oluşturmaz.

## Diğer araçlar

| Araç | Aldığınız şey |
|---|---|
| ZODL | Tarihleri, tutarları, ücretleri ve etiketi içeren vergi CSV'si. Yalnızca önceki takvim yılı; korumaya alma işlemlerini atlar, txid, memo veya adres içermez. |
| Zkool uygulaması | Hesap menüsünden ham tablo dışa aktarımları |
| [Zenith](https://code.vergara.tech/Vergara_Tech/zenith) | Bir UFVK'yi `importvk` ile içe aktarır. RPC üzerinden `listreceived`, txid ve memo içeren alınmış notları döndürür; ancak gönderimleri ve ücretleri döndürmez. |
| [Zallet](https://github.com/zcash/zallet) | `z_listtransactions` ayrıntılıdır ancak deneysel olarak işaretlenmiştir; Zallet ise UFVK'leri değil, yalnızca Sapling görüntüleme anahtarlarını içe aktarır |
| [zcash-devtool](https://github.com/zcash/zcash-devtool) | Bir UFVK'yi `wallet init-fvk`, ardından `wallet list-tx` ile içe aktarır. CSV modunda txid veya adres yoktur ve proje bunu üretimde kullanmamanızı söyler. |

## İlgili

- [Görüntüleme Anahtarları](/zcash-tech/viewing-keys)
- [Fonları Kurtarma](/using-zcash/recovering-funds)
- [Zingolib ve Zaino Eğitimi](/guides/zingolib-and-zaino-tutorial)
- [Forum: UFVK/seed'den işlem geçmişini JSON/CSV'ye dışa aktarma](https://forum.zcashcommunity.com/t/exporting-transaction-history-to-json-csv-from-ufvk-seed/54662)
- [Forum: Zkool & GraphQL](https://forum.zcashcommunity.com/t/zkool-graphql/54100)
- [zingo-cli README](https://github.com/zingolabs/zingolib/blob/zingolib_v6.0.0/zingo-cli/README.md)
