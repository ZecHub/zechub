<a href="https://github.com/zechub/zechub/edit/main/site/guides/Viewing_Key_Transaction_Export.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Viewing Key ile İşlem Geçmişini Dışa Aktarma

Çoğu cüzdanın dışa aktardığı veriler sınırlıdır. Örneğin ZODL'ın vergi dışa aktarımı, önceki takvim yılına ait tarihleri, tutarları ve ücretleri verir; ancak işlem kimliklerini, memo'ları veya adresleri içermez. Bu veriler muhasebe tutmak, cüzdan geçişini kontrol etmek veya bir ödemenin akıbetini anlamak için yeterli değildir.

Tüm ayrıntıları görmek için kurtarma ifadenize ihtiyacınız yoktur. Birleşik tam görüntüleme anahtarı (unified full viewing key, UFVK, `uview1` ile başlar) hesaptaki tüm gelen ve giden işlemleri görebilir. İki araç da bunları saklayabileceğiniz bir dosyaya dönüştürebilir: Zkool GraphQL sunucusu ve zingo-cli. Bu kılavuz, [bu forum başlığındaki](https://forum.zcashcommunity.com/t/exporting-transaction-history-to-json-csv-from-ufvk-seed/54662) yaklaşımları bir araya getiriyor ve güncel sürümlere göre güncelliyor.

Eylül 2026'da Zkool 6.30.0 ve zingo-cli zingolib 6.0.0 sürümüyle test edildi. Her ikisi de NU7 öncesine ait olduğundan, Kasım 2026'da adımlar Zkool 6.37.0 ve zingolib 8.0.0 sürümlerine göre güncellendi. [Zkool 6.35.0](https://github.com/hhanh00/zkool2/pull/1388), Zkool'in NU7 Mainnet etkinleştirme yüksekliğiyle derlenen ilk sürümüdür; zingolib 8.0.0 ise NU7 Mainnet desteği ekleyen sürümdür.

## Başlamadan önce

İki şeye ihtiyacınız var:

1. **Hesabın UFVK'si.** [Görüntüleme Anahtarları](/zcash-tech/viewing-keys) neleri açığa çıkardığını ve nasıl dışa aktarılacağını açıklar.
2. **Doğum yüksekliği**, yani taramanın başlayacağı blok. İlk işleminizden önceki bir yüksekliği kullanın. Çok yüksek ayarlarsanız eski geçmiş görünmeden atlanır. Çok düşük ayarlarsanız tarama daha uzun sürer. Sapling etkinleştirme yüksekliği (419200) her zaman güvenlidir, ancak taranması saatler sürebilir.

## Gizliliğinizi koruyun

Görüntüleme anahtarı harcama yapamaz, ancak elinde bulunduran kişiye tüm geçmişinizi gösterir.

- Anahtarı bir web sitesine veya blok gezginine yapıştırmayın. Kendi çalıştırdığınız yazılıma aktarın.
- Eşitleme yaptığınız sunucu IP adresinizi ve hangi işlemleri tüm ayrıntılarıyla indirdiğinizi görür. Aşağıdaki iki araç da memo'ları ve ücretleri okumak için işlemlerinizin her birini kimliğine göre getirir; [ZIP 307](https://zips.z.cash/zip-0307) bunun sunucuya hangi işlemlerin size ait olduğunu bildirdiğini belirtir. Kendi Zebra düğümünüzden Zaino veya lightwalletd ile eşitleme yapmak bunu önler. [Zingolib ve Zaino Öğreticisi](/guides/zingolib-and-zaino-tutorial) kurulum adımlarını açıklar.
- zingo-cli ödemeleri Nym mixnet'i üzerinden gönderir; ancak eşitleme sırasında sunucuya doğrudan bağlanmaya devam eder. Bu nedenle yukarıdaki nokta onun için de geçerlidir.
- Bu araçlara yalnızca görüntüleme anahtarı verin, asla kurtarma ifadesi vermeyin. Aşağıdaki Docker komutu, Zkool GraphQL sunucusunu `--allow-unauthenticated` ile başlatır; dolayısıyla oturum açma gerektirmez. API'si, buradan oluşturulan herhangi bir hesabın kurtarma ifadesini verebilir ve para gönderebilir.
- Sunucuyu kendi makinenizde çalıştırın. Aşağıdaki Docker komutu yalnızca bilgisayarınızın `127.0.0.1` adresini dinler. Sunucunun kapsayıcı içinde tüm arayüzleri (`--bind-address 0.0.0.0`) dinlemesi gerekir; aksi takdirde Docker ona erişemez. Yerel kalmasını sağlayan `-p 127.0.0.1:8000:8000` eşlemesidir.
- Her iki araç da anahtarı ve geçmişinizi şifrelenmeden saklar. Zkool veritabanını şifreleyebilir (`--db-password-file`), ancak aşağıdaki komut basit tutmak için `--allow-unencrypted-database` kullanır. İşiniz bittiğinde çalışma verilerini silin ve dışa aktardığınız dosyayı şifrelenmiş bir yerde saklayın.

## Seçenek 1: Zkool GraphQL

`zkool_graphql`, Zkool'ın cüzdan motorunun bağımsız sunucu olarak çalışan sürümüdür. Zkool uygulamasından ayrı bir programdır. Çalıştırmanın en kolay yolu resmi Docker imajıdır (amd64 ve arm64). Ayrıca [Zkool sürüm sayfasında Linux x86-64 ikili dosyası da bulunur](https://github.com/hhanh00/zkool2/releases); glibc 2.38 veya üzeri gerekir. Bu nedenle Ubuntu 24.04 çalışır, Debian 12 ise çalışmaz.

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

6.32.0 sürümünden itibaren sunucu, iki tercihi açıkça belirtmeden başlamaz: istemcilerin nasıl oturum açacağı (JWT anahtarı veya `--allow-unauthenticated`) ve veritabanının şifrelenip şifrelenmeyeceği (parola veya `--allow-unencrypted-database`). Ayrıca artık varsayılan olarak yalnızca `127.0.0.1` adresini dinler; bu, kapsayıcı içinde dışarıdan erişilemeyeceği anlamına gelir. Bu yüzden `--bind-address 0.0.0.0` kullanılır. Kapsayıcı hemen durursa, `docker logs zkool-export` hangi seçeneğin eksik olduğunu gösterir.

`--lwd-url` ile kendi sunucunuzu eklemediğiniz sürece `https://zec.rocks` üzerinden eşitlenir. İmajda Sapling parametreleri yerleşik olarak bulunur; başka bir şey indirmeniz gerekmez.

Bir tarayıcıda `http://127.0.0.1:8000/graphiql` adresini açın. Sonraki adımların her birini buraya yapıştırıp çalıştırabilirsiniz.

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

Yeni hesabın kimliğini döndürür. Yeni bir sunucuda bu değer 1'dir.

- Her zaman `birth` ayarlayın. Bu olmadan Zkool geçerli bloktan başlar ve hiçbir şey bulamaz.
- `useInternal: true`, Zkool'ın şeffaf para üstü adreslerini de kontrol etmesini sağlar. ZODL anahtarlarında açık bırakın; [Fonları Kurtarma](/using-zcash/recovering-funds), ZODL kurtarma ifadeleri için aynı ayarı kullanır.

### 3. Eşitleyin

```graphql
mutation { synchronizeAccount(idAccount: 1) }
```

Bu komut eşitleme bitene kadar çalışır. `fast: true` eklemeyin. Bu seçenek, memo'ların, ücretlerin ve çıktının bulunduğu tam işlemlerin indirilmesini atlar.

Döndürülen sayı, ulaşılması hedeflenen yüksekliktir; ulaşıldığının kanıtı değildir. Ağ hatası, hiçbir bildirim vermeden eşitlemeyi erken bitirebilir. Bu nedenle şunu kontrol edin:

```graphql
{ currentHeight accounts { id name height } }
```

Hesabın `height` değeri `currentHeight` değerinin gerisindeyse eşitlemeyi yeniden çalıştırın. Kaldığı yerden devam eder.

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

`height` bağımsız değişkenini, gerçekten kullanmak istemiyorsanız eklemeyin. Bu bir alt sınır belirler; dolayısıyla forum örneğindeki `height: 3000000`, o bloktan önceki her şeyi dışarıda bırakır.

JSON olarak alın:

```bash
jq -n --rawfile q history.graphql '{query: $q}' |
  curl -s http://127.0.0.1:8000/graphql \
    -H 'content-type: application/json' --data-binary @- > history.json
```

Madencilik ödülleri dışında her işlemde 0'dan büyük bir ücret görünmelidir. Bir işlemde `"fee": "0"` görünüyor ve memo bulunmuyorsa, ayrıntıları indirilmemiştir. Zkool, taramadan sonra tam işlemleri teker teker getirir; tek bir başarısızlık, geri kalan işlemlerin getirilmesini sessizce durdurur. Etkilenen işlemleri listelemek için:

```bash
jq -r '.data.transactionsByAccount[] | select(.fee == "0") | .txid' history.json
```

Bir sonuç çıkarsa birkaç dakika sonra yeniden eşitleyin ve tekrar dışa aktarın.

Ardından her işlem için bir satır olacak şekilde CSV'ye dönüştürün:

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
| `value` | Ücret dahil, ZEC cinsinden hesaptaki net değişim. Gönderimlerde negatiftir. |
| `fee` | ZEC cinsinden ücret. Aldığınız ödemelerde ücreti gönderen öder ve bu tutar `value` içinde yer almaz. |
| `time` | Saat dilimi işareti olmadan UTC cinsinden blok zamanı |
| `notes` | Bu işlemde hesabın aldığı tutar; para üstü de dahildir. Size gönderilen memo'lar burada yer alır. Şeffaf girdilerde adres bulunmaz. |
| `spends` | Bu işlemde harcanan, hesaba ait note'lar |
| `outputs` | İşlemin gönderdiği tutarlar: tüm şeffaf çıktılar ve memo'larıyla birlikte diğer adreslere yapılan korumalı ödemeler |
| `pool` | 0 şeffaf, 1 Sapling, 2 Orchard, 3 Ironwood |
| `scope` | 0 harici (gelen ödeme), 1 dahili (para üstü) |

Zkool uygulamasında da hesap menüsünde İşlemleri, Memo'ları ve Note'ları Dışa Aktar seçenekleri vardır; ancak bunlar ham tablo dökümleridir: tutarlar zatoshi cinsinden, zaman damgaları Unix biçiminde ve memo'lar ayrı bir dosyadadır.

## Seçenek 2: zingo-cli

zingo-cli, Zingo'ın komut satırı cüzdanıdır. Önceden derlenmiş indirme dosyaları yoktur; bu nedenle Rust ile derlemeniz gerekir. zingolib 8.0.0 veya üzerini kullanın: [sürüm notlarına](https://github.com/zingolabs/zingolib/releases/tag/zingolib_v8.0.0) göre bu, NU7'ın Mainnet etkinleştirme yüksekliğini (3,543,405) bilen ilk sürümdür. 6.0.0 gibi daha eski etiketlerden yapılan derlemeler bunu bilmez.

Derleme, `cargo install cargo-make` ([cargo-make](https://github.com/sagiegurari/cargo-make)) kullanır. Ubuntu'da ayrıca `sudo apt install build-essential gcc libsqlite3-dev` gerekir.

```bash
git clone --branch zingolib_v8.0.0 https://github.com/zingolabs/zingolib.git
cd zingolib
makers run-cli --build-only
```

Bu, `./target/release/zingo-cli`'ı derler ve `nym-proxy`'i yanına koyar. Yalnızca eşitleme için bile `nym-proxy` gerekir: onsuz zingo-cli çevrimiçi olamaz. 8.0.0 sürümünden itibaren `zingo-netutils` ana çalışma alanının parçasıdır; bu nedenle `zingo-netutils/target/release/` konumundan `nym-proxy` kopyalayan eski tarif artık çalışmaz.

`zingo-cli`'ı başka bir yere taşırsanız `nym-proxy`'i de onunla taşıyın veya zingo-cli'a nerede olduğunu `--nym-proxy /path/to/nym-proxy` ya da `ZINGO_NYM_PROXY` ortam değişkeniyle bildirin. Bunlar belirtilmezse önce kendi ikili dosyasının yanına, sonra da `PATH` konumuna bakar. Proxy'yi başlatamazsa hiç çevrimiçi olamaz.

Yalnızca ödemeler (ve ZEC fiyat sorgusu) Nym üzerinden gider. Eşitleme sunucuya doğrudan bağlanır.

İlk çalıştırma salt görüntüleme cüzdanı oluşturur, eşitler ve geçmişi yazdırır:

```bash
./target/release/zingo-cli --data-dir "$HOME/zingo-export" \
  --viewkey "uview1..." --birthday 2500000 \
  --server https://zec.rocks:443 \
  --waitsync transactions > transactions.txt
```

- `--data-dir` mutlak bir yol olmalıdır.
- `--viewkey` ve `--birthday` yalnızca cüzdan oluşturulurken geçerlidir. Sonraki çalıştırmalarda bunları kullanmayın.
- Yeni bir zingo-cli varsayılan olarak çevrimdışıdır ve çevrimiçi olmak için onayınızı gerektirir. `--server` sunucuyu seçer ve aynı zamanda bu onay işlevini görür. Diğer yöntemler `--online` (yalnızca bu oturum için) ve `--remember-online` seçeneğidir. Bu seçenek tercihi cüzdanın yanına kaydeder; böylece sonraki çalıştırmalar bir seçenek kullanmadan çevrimiçi olur (`--forget-online` bu tercihi geri alır).
- Anahtar kabuk geçmişinizde kalır; daha sonra temizleyin.

Sonraki çalıştırmalar:

```bash
Z="./target/release/zingo-cli --data-dir $HOME/zingo-export"
$Z --server https://zec.rocks:443 --waitsync transactions > transactions.txt
$Z --offline value_transfers > value_transfers.txt
$Z --offline messages > memos.json
```

`--offline`, ağ bağlantısı kurmadan önceden eşitlenmiş verileri okur.

- `transactions` her işlem için bir kayıt verir: txid, zaman (UTC), yükseklik, tür (`received`, `sent`, `shield` veya `send-to-self`), değer, ücret ve ilgili note'lar.
- `value_transfers` her ödeme için bir kayıt verir; dolayısıyla iki kişiye yapılan gönderim iki kayıt oluşturur ve her kayıtta alıcı adresiyle memo'lar yer alır.
- `messages` memo'ları JSON olarak listeler.

Çıktıyla ilgili bilmeniz gereken birkaç nokta:

- `transactions` ve `value_transfers`, JSON'a benzeyen ancak JSON olmayan düz metin yazdırır.
- Tutarlar zatoshi cinsindendir (1 ZEC başına 100.000.000) ve her zaman pozitiftir. Yönü `kind` belirtir. Gönderimlerde `value`, ücret hariç diğer kişilere giden tutardır.
- Bir işlem size ait olmayan şeffaf fonları harcıyorsa ücret “mevcut değil” olarak görünür. Yalnızca metin biçimindeki memo'lar gösterilir.
- Eşitleme başarısız olursa hata dosyaya değil, terminale yazılır. zingolib 8.0.0 (zingo-cli 0.5.0) sürümünden itibaren başarısız bir komut sıfırdan farklı bir çıkış koduyla da sonlanır; yine de `transactions.txt`'a güvenmeden önce terminali kontrol edin.

dismad'ın [zingoHelper](https://github.com/dismad/zingoHelper) aracında `transactions`'ı JSON'a dönüştüren bir `exportToJSON.sh` betiği bulunur. zingo-cli 6'dan önce yazılmıştır, testnet için yapılandırılmıştır, giden bazı Sapling ve şeffaf girdileri yer tutucu olarak işaretler ve GNU araçlarına ihtiyaç duyar; bu nedenle standart macOS'ta çalışmaz. Çıktısını başlangıç noktası olarak değerlendirin ve toplamları kontrol edin.

## Görüntüleme anahtarı neleri gösteremez

- **Fiyatlar.** İki araç da her işlem anındaki ZEC fiyatını kaydetmez. İtibari para değerlerini kendiniz ekleyin.
- **Anahtar içermiyorsa şeffaf geçmiş.** [ZIP 316](https://zips.z.cash/zip-0316) kapsamında UFVK'nin şeffaf bölümü isteğe bağlıdır. zingo-cli ile `$Z --offline parse_viewkey uview1...`, bir anahtarın hangi havuzları kapsadığını gösterir.
- **Size kimin ödeme yaptığı.** Korumalı ödemeler gönderenin adresini içermez. Gönderen bunu memo'ya yazmadıysa başka hiçbir yerde bulunmaz.
- **Giden bazı işlem ayrıntıları.** Korumalı gönderimlerin hedef adresi, tutarı ve memo'su anahtarla şifre çözülerek elde edilir. Bir cüzdan işlemi bu bilgilerin elde edilemeyeceği şekilde oluşturabilir; ancak çoğu bunu yapmaz.

## Diğer araçlar

| Araç | Sağladığı |
|---|---|
| ZODL | Tarihleri, tutarları, ücretleri ve etiketi içeren vergi CSV'si. Yalnızca önceki takvim yılı; havuzlar arası geçiş işlemlerini atlar, txid, memo veya adres içermez. |
| Zkool uygulaması | Hesap menüsünden alınan ham tablo dışa aktarımları |
| [Zenith](https://code.vergara.tech/Vergara_Tech/zenith) | `importvk` ile UFVK içe aktarır. RPC üzerinden `listreceived`, txid ve memo içeren alınmış note'ları döndürür; ancak gönderimleri ve ücretleri içermez. |
| [Zallet](https://github.com/zcash/zallet) | `z_listtransactions` ayrıntılıdır ancak deneysel olarak işaretlenmiştir; Zallet ise yalnızca Sapling görüntüleme anahtarlarını içe aktarır, UFVK'leri aktarmaz. |
| [zcash-devtool](https://github.com/zcash/zcash-devtool) | `wallet init-fvk` ile UFVK içe aktarır ve ardından `wallet list-tx`. CSV kipinde txid veya adres bulunmaz ve proje, üretim ortamında kullanılmamasını önerir. |

## İlgili

- [Görüntüleme Anahtarları](/zcash-tech/viewing-keys)
- [Fonları Kurtarma](/using-zcash/recovering-funds)
- [Zingolib ve Zaino Öğreticisi](/guides/zingolib-and-zaino-tutorial)
- [Forum: UFVK/kurtarma ifadesinden işlem geçmişini JSON/CSV olarak dışa aktarma](https://forum.zcashcommunity.com/t/exporting-transaction-history-to-json-csv-from-ufvk-seed/54662)
- [Forum: Zkool ve GraphQL](https://forum.zcashcommunity.com/t/zkool-graphql/54100)
- [zingo-cli README](https://github.com/zingolabs/zingolib/blob/zingolib_v8.0.0/zingo-cli/README.md)
