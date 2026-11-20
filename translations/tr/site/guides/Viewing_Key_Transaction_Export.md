<a href="https://github.com/zechub/zechub/edit/main/site/guides/Viewing_Key_Transaction_Export.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Viewing Key'den İşlem Geçmişini Dışa Aktarma

Çoğu cüzdan dışa aktarımı yetersizdir. Örneğin ZODL'ün vergi dışa aktarımı, önceki takvim yılı için tarihleri, tutarları ve ücretleri verir; ancak işlem kimlikleri, memolar veya adresler içermez. Bu; muhasebe, bir cüzdan geçişini kontrol etmek ya da bir ödemeye ne olduğunu anlamak için yeterli değildir.

Tam resmi görmek için seed ifadenize ihtiyacınız yoktur. Bir birleşik tam görüntüleme anahtarı (UFVK, `uview1` ile başlayan), bir hesaptaki tüm gelen ve giden işlemleri görebilir ve iki araç bunu saklayacağınız bir dosyaya dönüştürebilir: Zkool GraphQL sunucusu ve zingo-cli. Bu rehber, [bu forum başlığındaki](https://forum.zcashcommunity.com/t/exporting-transaction-history-to-json-csv-from-ufvk-seed/54662) yaklaşımları derler ve güncel sürümler için günceller.

Eylül 2026'da Zkool 6.30.0 ve zingolib 6.0.0 sürümünden zingo-cli ile test edildi. Her ikisi de NU7 öncesine ait olduğundan, adımlar Kasım 2026'da Zkool 6.37.0 ve zingolib 8.0.0 sürümlerine taşındı. [Zkool 6.35.0](https://github.com/hhanh00/zkool2/pull/1388), NU7 Mainnet etkinleştirme yüksekliğiyle derlenen ilk Zkool sürümüdür ve zingolib 8.0.0, NU7 Mainnet desteği ekleyen sürümdür.

## Başlamadan önce

İki şeye ihtiyacınız var:

1. Hesap için **UFVK**. [Görüntüleme Anahtarları](/zcash-tech/viewing-keys), neyi açığa çıkardığını ve nasıl dışa aktarılacağını açıklar.
2. **Doğum yüksekliği**, taramaya başlanacak blok. İlk işleminizden önceki bir yüksekliği kullanın. Çok yüksek ayarlarsanız eski geçmiş sessizce eksik kalır. Çok düşük ayarlarsanız tarama yalnızca daha uzun sürer. Sapling etkinleştirmesi (419200) her zaman güvenlidir, ancak taranması saatler sürebilir.

## Gizli tutun

Bir görüntüleme anahtarı harcama yapamaz, ancak anahtarı elinde tutan herkese tüm geçmişinizi gösterir.

- Onu bir web sitesine veya blok gezginine yapıştırmayın. Kendi çalıştırdığınız yazılıma içe aktarın.
- Senkronize olduğunuz sunucu IP adresinizi ve hangi işlemleri tam olarak indirdiğinizi görür. Aşağıdaki iki araç da memoları ve ücretleri okumak için işlemlerinizin her birini kimliğe göre getirir; ayrıca [ZIP 307](https://zips.z.cash/zip-0307), bunun sunucuya hangi işlemlerin size ait olduğunu söylediğini belirtir. Kendi Zebra düğümünüzden Zaino veya lightwalletd ile senkronizasyon bunu önler. [Zingolib ve Zaino Eğitimi](/guides/zingolib-and-zaino-tutorial), kurulumu adım adım anlatır.
- zingo-cli, ödemeleri Nym mixnet üzerinden gönderir; ancak senkronizasyonu hâlâ doğrudan sunucuya bağlanır, dolayısıyla yukarıdaki nokta bunun için de geçerlidir.
- Bu araçlara görüntüleme anahtarı verin, asla seed vermeyin. Aşağıdaki Docker komutu, `--allow-unauthenticated` ile Zkool GraphQL sunucusunu başlatır; bu nedenle giriş gerektirmez. API'si, bu sunucuda oluşturulan herhangi bir hesabın seed'ini geri verebilir ve fon gönderebilir.
- Sunucuyu kendi makinenizde tutun. Aşağıdaki Docker komutu yalnızca bilgisayarınızın `127.0.0.1` adresinde dinler. Container içinde sunucunun tüm arayüzlerde (`--bind-address 0.0.0.0`) dinlemesi gerekir; aksi takdirde Docker ona erişemez. Yerel kalmasını sağlayan `-p 127.0.0.1:8000:8000` eşlemesidir.
- Her iki araç da anahtarı ve geçmişinizi şifrelenmemiş olarak saklar. Zkool veritabanını şifreleyebilir (`--db-password-file`), ancak aşağıdaki komut basit tutmak için `--allow-unencrypted-database` kullanır. İşiniz bittiğinde çalışma verilerini silin ve dışa aktarımı şifrelenmiş bir yerde tutun.

## Seçenek 1: Zkool GraphQL

`zkool_graphql`, Zkool'ün bağımsız bir sunucu olarak çalışan cüzdan motorudur. Zkool uygulamasından ayrı bir programdır. Çalıştırmanın en kolay yolu resmî Docker imajıdır (amd64 ve arm64). [Zkool sürümler sayfasında](https://github.com/hhanh00/zkool2/releases) bir Linux x86-64 ikilisi de vardır; glibc 2.38 veya daha yenisini gerektirir; bu nedenle Ubuntu 24.04 çalışır, Debian 12 ise çalışmaz.

### 1. Sunucuyu başlatın

```bash
docker run -d --name zkool-export \
  -p 127.0.0.1:8000:8000 \
  -v zkool-export:/data \
  hhanh00/zkool-graphql:6.37.0 \
  --db-path /data/zkool.db \
  --bind-address 0.0.0.0 \
  --allow-unauthenticated \
  --allow-unencrypted-database
```

6.32.0 sürümünden itibaren sunucu, iki tercihi açıkça belirtmediğiniz sürece başlamaz: istemcilerin nasıl oturum açacağı (bir JWT anahtarı veya `--allow-unauthenticated`) ve veritabanının şifrelenip şifrelenmeyeceği (bir parola veya `--allow-unencrypted-database`). Ayrıca artık varsayılan olarak yalnızca `127.0.0.1` adresini dinler; bu da bir kapsayıcı içinde dışarıdan hiçbir şeyin ona erişemeyeceği anlamına gelir. Bu yüzden `--bind-address 0.0.0.0` gerekir. Kapsayıcı hemen durursa, hangi seçeneğin eksik olduğunu `docker logs zkool-export` gösterir.

`https://zec.rocks` üzerinden eşitlenir; kendi sunucunuzu kullanmak için `--lwd-url` ekleyin. Görüntüde Sapling parametreleri yerleşik olarak bulunur, bu nedenle başka bir şey indirmeniz gerekmez.

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

zingo-cli, Zingo’ın komut satırı cüzdanıdır. Önceden derlenmiş indirme dosyaları bulunmadığından, Rust ile kendiniz derlemeniz gerekir. zingolib 8.0.0 veya daha yeni bir sürüm kullanın: [sürüm notlarına](https://github.com/zingolabs/zingolib/releases/tag/zingolib_v8.0.0) göre, NU7’ın Mainnet etkinleştirme yüksekliğini (3.543.405) bilen ilk sürüm budur. 6.0.0 gibi daha eski etiketlerden yapılan derlemeler bu bilgiyi içermez.

Derleme [cargo-make](https://github.com/sagiegurari/cargo-make) (`cargo install cargo-make`) kullanır. Ubuntu’da ayrıca `sudo apt install build-essential gcc libsqlite3-dev` gerekir.

```bash
git clone --branch zingolib_v8.0.0 https://github.com/zingolabs/zingolib.git
cd zingolib
makers run-cli --build-only
```

Bu, `./target/release/zingo-cli` derler ve `nym-proxy`’i yanına koyar. Yalnızca eşitleme yapmak için bile `nym-proxy` gerekir: zingo-cli onsuz çevrimiçi olmaz. 8.0.0 sürümünden beri `zingo-netutils` ana çalışma alanının bir parçasıdır; bu nedenle `nym-proxy` öğesini `zingo-netutils/target/release/` konumundan kopyalayan eski tarif artık işe yaramaz.

`zingo-cli` dosyasını başka bir yere taşırsanız, `nym-proxy` dosyasını da onunla birlikte taşıyın ya da `--nym-proxy /path/to/nym-proxy` veya `ZINGO_NYM_PROXY` ortam değişkeniyle zingo-cli’ye konumunu bildirin. Bunlar olmadan, kendi ikili dosyasının bulunduğu yere, ardından `PATH`’inize bakar. Proxy’yi başlatamazsa çevrimiçi olmaz.

Yalnızca ödemeler (ve ZEC fiyat sorgulaması) Nym üzerinden yapılır. Senkronizasyon doğrudan sunucuya bağlanır.

İlk çalıştırma yalnızca görüntülemeye yönelik bir cüzdan oluşturur, senkronize eder ve geçmişi yazdırır:

```bash
./target/release/zingo-cli --data-dir "$HOME/zingo-export" \
  --viewkey "uview1..." --birthday 2500000 \
  --server https://zec.rocks:443 \
  --waitsync transactions > transactions.txt
```

- `--data-dir` mutlak bir yol olmalıdır.
- `--viewkey` ve `--birthday` yalnızca cüzdan oluşturulurken geçerlidir. Sonrasında bunları kullanmayın.
- Yeni oluşturulan bir zingo-cli varsayılan olarak çevrimdışıdır ve çevrimiçi olması için izninizi gerektirir. `--server` sunucuyu seçer ve aynı zamanda bu izni de verir. Diğer yöntemler `--online` (yalnızca bu oturum için) ve `--remember-online` yöntemidir; bu yöntem seçimi cüzdanın yanına da kaydeder, böylece sonraki çalıştırmalarda bir işaret olmadan çevrimiçi olur (`--forget-online` bu seçimi geri alır).
- Anahtar kabuk geçmişinize kaydedilir; bu yüzden sonrasında geçmişi temizleyin.

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

- `transactions` ve `value_transfers` JSON’a benzeyen ama JSON olmayan düz metinler yazdırır.
- Tutarlar zatoshi cinsindendir (100.000.000 zatoshi = 1 ZEC) ve her zaman pozitiftir. Yönü `kind` belirtir. Gönderimlerde `value`, ücret hariç başkalarına giden tutardır.
- Bir işlem size ait olmayan şeffaf fonları harcadığında ücret “kullanılamıyor” olarak gösterilir. Yalnızca metin notları gösterilir.
- Eşitleme başarısız olursa hata dosyaya değil terminale yazılır. zingolib 8.0.0 sürümünden beri (zingo-cli 0.5.0) başarısız bir komut sıfırdan farklı bir kodla da çıkar; ancak `transactions.txt`’ye güvenmeden önce terminali kontrol edin.

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
- [Forum: UFVK/tohumdan işlem geçmişini JSON/CSV olarak dışa aktarma](https://forum.zcashcommunity.com/t/exporting-transaction-history-to-json-csv-from-ufvk-seed/54662)
- [Forum: Zkool ve GraphQL](https://forum.zcashcommunity.com/t/zkool-graphql/54100)
- [zingo-cli README](https://github.com/zingolabs/zingolib/blob/zingolib_v8.0.0/zingo-cli/README.md)
