<a href="https://github.com/zechub/zechub/edit/main/site/guides/Crosslink_Feature_Net.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Sayfayı Düzenle"/>
</a>

# Crosslink Feature Net Ağına Katılın

## Kısaca

- Feature Net, Shielded Labs tarafından [Crosslink](/zcash-tech/crosslink-protocol) için oluşturulan herkese açık test ağıdır; bu, Zcash'ın iş ispatına staking ekleyen önerilen kesinlik katmanıdır.
- Test parası cTAZ üzerinde çalışır. Burada yaptığınız hiçbir şey ana ağdaki ZEC'i hareket ettirmez veya riske atmaz.
- Tek bir masaüstü uygulaması düğüm, madenci, cüzdan ve kesinleştiricidir. Varsayılan olarak cTAZ madenciliği yapar ve bir musluk düğmesi içerir.
- Staking, staking'den çıkma ve çekme işlemleri yalnızca her üç günde bir olan bir "Staking Day" sırasında çalışır. Kaçırırsanız bir sonrakini beklersiniz.
- Staking yapmak için bir kesinleştiricinin kimliğini yapıştırır ve bir tutara tıklarsınız. Bu rehber örnek olarak ZecHub'ın kesinleştiricisini kullanır.
- İki RPC çağrısı durumunuzu gösterir: `wallet_staking_positions` ve `get_tfl_recency_status`.

*Feature Net sürüm 14 ile, Windows 11'de (sürüm 10.0.26200.9550), 8-10 Ekim 2026 tarihleri arasında test edilmiştir. Yazılım bir prototiptir ve her sürümde değişir. Gördükleriniz bu sayfadan farklıysa kendi çalıştırmanızı esas alın ve lütfen bir PR açın.*

## Feature Net nedir?

Crosslink bir öneridir; bugün Zcash'ın parçası değildir. Shielded Labs'ın [Crosslink SSS'si](https://shieldedlabs.net/crosslink-faq/), ana ağa ulaşabilmesi için önce "standart Zcash yönetişim sürecinden geçmesi gerekeceğini" söyler. [Crosslink Protokolü](/zcash-tech/crosslink-protocol) sayfası tasarımı açıklar.

Tasarımı gerçek kullanıcılarla denemek için Shielded Labs, [teşvikli özellik ağları](https://shieldedlabs.net/crosslink-incentivized-feature-nets/) adını verdiği, "bir dizi teşvikli test ağı" çalıştırır. Ağda üç rol bulunur ve masaüstü uygulaması bunların üçünü de üstlenebilir:

| Rol | Ne yapar |
|---|---|
| Madenci | Bugün Zcash'da olduğu gibi iş ispatı blokları üretir |
| Staker | cTAZ'i bir delegasyon tahvilinde kilitler ve bunu bir kesinleştiriciye yönlendirir |
| Kesinleştirici | Blokları kesinleştirmek için oy verir. Oy gücü, kendisine devredilen stake'tir |

Arkasındaki depo, herhangi bir şey yüklemeden önce okunmaya değer bir uyarıyla başlar: "üretim mühendisliğini göstermek için değil, fikirleri kanıtlamak için vardır" ve "üretime hazır kod değildir" ([README](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/README.md)). Bunu, kabul edilebilir olduğu bir makinede çalıştırın.

### Sürüm 14'ün değiştirdikleri

[Sürüm 14](https://github.com/ShieldedLabs/crosslink_monolith/releases/tag/v14), 1 Ekim 2026'da yayınlandı. Ağı düz iş ispatı olarak başlar ve Crosslink'ı üç adımda etkinleştirir ([kaynak](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/librustzcash/zcash_primitives/src/bft.rs#L546-L555), ayrıca [ctaz.cash](https://ctaz.cash/v14) üzerinde gösterilmiştir):

| Blok | Ne olur |
|---|---|
| 20.736 | Staking açılır |
| 34.560 | İlk kesinleştirici listesi zincirdeki stake'lerden alınır |
| 36.288 | BFT kesinliği ve onunla birlikte staking ödülleri başlar |

Staking ödülleri bu blokların sonuncusunda başlar. Daha önce oluşturulan bir tahvil o zamana kadar hiçbir şey kazanmaz ([kaynak](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebra-chain/src/parameters/network/subsidy.rs#L487-L508)).

Aynı sürüm etkin listeyi en çok stake'e sahip 12 kesinleştiriciye indirdi ([kaynak](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/librustzcash/zcash_primitives/src/bft.rs#L884)) ve sürüm notlarının ifadesiyle onlara bir komisyon verdi: "Bir bloktaki tüm PoS Ödüllerinin %10'u bu komisyonlara giderken, %90'ı tüm staking tahvillerine dağıtılır".

### cTAZ ve gerçek ZEC

cTAZ ("Crosslink TAZ"), Feature Net'ın test parasıdır. ZEC değil, cTAZ stake edersiniz.

Gerçek ZEC yalnızca sonunda devreye girer. Shielded Labs, özellik ağları için [500 ZEC](https://shieldedlabs.net/crosslink-incentivized-feature-nets/) ayırmıştır ve [sürüm notları](https://github.com/ShieldedLabs/crosslink_monolith/releases/tag/v14) bunun, "yalnızca her katılımcının madencilik veya staking yoluyla kazandığı cTAZ miktarına göre orantılı olarak" ödendiğini söyler. Bunun iki sonucu vardır:

- **Musluk paraları sayılmaz.** Musluktan veya başka birinden verilen cTAZ, cüzdanınızda durarak hiçbir şey kazandırmaz. Yalnızca madencilik ve staking'den gelen blok ödülleri sayılır.
- **Ödemeler talep edilir, otomatik değildir.** Shielded Labs her turu [forum başlığında](https://forum.zcashcommunity.com/t/crosslink-incentivized-feature-net/55210) duyurur. 2. Tur için katılımcılardan cüzdanlarının görüntüleme anahtarını ve bir ana ağ adresini 4 Ekim 2026'ya kadar göndermelerini istedi ([gönderi 94](https://forum.zcashcommunity.com/t/crosslink-incentivized-feature-net/55210/94)). Sürüm 14'ün çalıştığı, bu rehberin katıldığı ağ 3. Tur olarak duyuruldu ([gönderi 101](https://forum.zcashcommunity.com/t/crosslink-incentivized-feature-net/55210/101)).

## Başlamadan önce

- **Açık bırakabileceğiniz bir bilgisayar.** Sürümün Windows, macOS, Ubuntu ve Arch Linux için derlemeleri vardır. Bu rehber, Windows üzerinde, Intel Core i5-8350U işlemcili bir bilgisayarda çalıştırıldı.
- **Bir Staking Day.** Herhangi bir plan yapmadan önce bir sonrakinin ne zaman açıldığını kontrol edin. [Staker Space'in panosu](https://crosslink.staker.space/) buna geri sayım yapar.
- **Başka hiçbir şey.** ZEC yok, hesap yok, kayıt yok.

## Adım 1: Uygulamayı indirin ve dosyayı kontrol edin

1. [sürüm 14 yayınını](https://github.com/ShieldedLabs/crosslink_monolith/releases/tag/v14) açın ve **Assets** bölümüne kaydırın.
2. Sisteminiz için olan dosyayı indirin. Windows üzerinde bu `zebrad_v14_win32.exe` dosyasıdır.
3. Dosyanın SHA-256 değerini, GitHub'ın o varlığın yanında gösterdiği özetle karşılaştırın.

Windows üzerinde, PowerShell içinde:

```powershell
Get-FileHash .\zebrad_v14_win32.exe -Algorithm SHA256 | Format-List
```

```text
Algorithm : SHA256
Hash      : 1D464E31CCC110E175D45E3EDC0B7FB0B9583ACC996E99F4398F390EC111297E
Path      : C:\crosslink\zebrad_v14_win32.exe
```

GitHub'ın bu dosya için gösterdiği özet `1d464e31ccc110e175d45e3edc0b7fb0b9583acc996e99f4398f390ec111297e`'dır. Onaltılık sistemde büyük/küçük harf ayrımı yoktur, dolayısıyla yukarıdaki büyük harfler sorun değildir. Gözleriniz yerine kabuğun karşılaştırmasını sağlamak için:

```powershell
$expected = "1d464e31ccc110e175d45e3edc0b7fb0b9583acc996e99f4398f390ec111297e"
$actual = (Get-FileHash .\zebrad_v14_win32.exe -Algorithm SHA256).Hash.ToLower()
if ($actual -eq $expected) { "OK" } else { "MISMATCH" }
```

```text
OK
```

Bu kontrolün ne kadar değerli olduğunu bilin. Sürüm imza taşımadığından, eşleşen bir hash indirmenin tamamlandığını ve GitHub'ın sunduğu dosya olduğunu gösterir. Dosyayı kimin oluşturduğunu göstermez. [Zcash Sürümlerini Doğrulama](/guides/verifying-zcash-releases) farkı açıklar.

## Adım 2: Düğümü başlatın ve eşzamanlanmasını bekleyin

Başlangıç mesajlarının ekranda kalması için uygulamayı terminalden başlatın. "Yönetici olarak çalıştır" ile açılmış bir pencere değil, sıradan bir PowerShell penceresi kullanın: bu imzasız prototip yazılımdır ve yönetici haklarına ihtiyaç duymaz.

```powershell
.\zebrad_v14_win32.exe
```

"Zcash Crosslink Visualizer" başlıklı bir pencere açılır. Solda **Your Wallet** ve **Faucet Wallet** sekmeleriyle cüzdan, ortada çizilmiş zincir, sağda ise kesinleştiriciler bulunur. Terminal düğüm günlüğünü yazdırmaya devam eder. Ağı kullanırken ikisini de açık bırakın.

Sürüm notları, [ kurulumunun Windowsvideosuna](https://www.youtube.com/watch?v=cO-5Oa4B1Tk) bağlantı verir.

Uygulama verilerini bir önbellek klasöründe tutar: sürüm notlarına göre `%LOCALAPPDATA%\zebra` üzerinde Windows, `~/.cache/zebra` üzerinde Linux ve macOS üzerinde `~/Library/Caches/zebra`.

**Sırrı kendinize saklayın.** Bu klasör `secret.seed` adlı bir dosya tutar. Uygulama bunu ilk başlangıçta oluşturur ([kaynak](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebrad/src/commands/start.rs#L280-L305)) ve cüzdanınızı ile kesinleştirici kimliğinizi bundan türetir ([kaynak](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebrad/src/commands/start.rs#L625-L626)). Uygulamada aynı sırrı panonuza koyan bir **Copy Seed** düğmesi de vardır. Bunlardan herhangi birine sahip olan kişi cüzdanınızı kontrol eder. Bunları asla bir sohbete, forum gönderisine veya ekran görüntüsüne yapıştırmayın.

### Eşzamanlandığınızı nasıl anlarsınız?

Sürüm notları, "ağ ucuna ne kadar yakın eşzamanlandığınıza dair yerleşik bir izleme olmadığını" söyler. Sürüm 14'te bir miktar vardır: pencerenin üstündeki **Network Info** açılır menüsünde PoW Height, Wallet Sync ve Blocks Behind Known PoW satırları bulunur ([kaynak](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-gui/src/ui.rs#L4362-L4373)). Yüksekliğinizi [Staker Space](https://crosslink.staker.space/) veya [ctaz.cash](https://ctaz.cash/) üzerindekiyle karşılaştırın.

Düğüm ayrıca RPC üzerinden yanıt verir:

```powershell
Invoke-RestMethod -Uri http://127.0.0.1:8232 -Method Post -ContentType 'application/json' -Body '{"jsonrpc":"2.0","method":"getblockcount","params":[],"id":1}' | ConvertTo-Json -Depth 20
```

```text
{
    "jsonrpc":  "2.0",
    "id":  1,
    "result":  36490
}
```

RPC bağlantı noktası `127.0.0.1:8232`, bu derlemede varsayılan olarak açıktır ve parola gerektirmez ([kaynak](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebrad/src/config.rs#L333-L337)). Yalnızca kendi makinenizde dinler ve o makinede çalışan her şey onu çağırabilir.

Bu çalıştırmada, blok 0'dan yaklaşık 28.400. bloktaki uca ilk eşzamanlama yaklaşık 50 dakika sürdü.

**Yeniden başlatmadan sonra bakiyeniz bir süre sıfır görünür.** Uygulama her başladığında cüzdanı `secret.seed`'dan yeniden oluşturur ve zinciri blok 0'dan tekrar tarar ([kaynak](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/wallet/src/lib.rs#L3609-L3623)). Tarama işlemlerinizin bulunduğu yere ulaşana kadar bakiyeniz ve stake'iniz 0 görünür. Bu çalıştırmada, yeniden başlatmadan yaklaşık 15 dakika sonra geri geldiler. Musluğun cüzdanı da aynı şekilde yeniden taranır ([kaynak](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/wallet/src/lib.rs#L3588)) ve tarama sırasında Faucet Wallet sekmesi çok büyük bir bakiye gösterdi. Wallet Sync tamamlanana kadar ikisini de dikkate almayın.

## Adım 3: Biraz cTAZ alın

### Madencilik yapın

Sürüm notlarına göre uygulama, eşzamanlandığında kendi cüzdanınıza CPU madenciliği başlatır. Herhangi bir şeyi açmanız gerekmez. Kazılan paralar kendi cüzdanınızın şeffaf bir adresine gider ([kaynak](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebrad/src/commands/start.rs#L349-L355)).

Bir blok bulup bulamayacağı ise başka konudur. Notlar, "daha hızlı madencilik yapan diğerleri tarafından geride bırakılabileceğiniz, dolayısıyla başarı garantisi olmadığı" uyarısını yapar. Yerleşik madenci varsayılan olarak tek bir CPU iş parçacığı kullanır ([kaynak](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebra-rpc/src/config/mining.rs#L97-L100)).

Daha fazla iş parçacığı kullanmak için uygulamayı başlatmadan önce aynı PowerShell penceresinde bir ortam değişkeni ayarlayın ([kaynak](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebrad/src/config.rs#L109-L128)). Bu çalıştırmada dört iş parçacığı kullanıldı:

```powershell
$env:ZEBRA_MINING__INTERNAL_MINER_THREADS = "4"
.\zebrad_v14_win32.exe
```

Değişken yalnızca o pencere açık kaldığı sürece geçerlidir. Ayarlandığında Windows'ın işlemci sayacı, düğümün mantıksal bir işlemcinin yüzdesi cinsinden dört ila beş işlemciye denk zaman kullandığını gösterdi:

```powershell
(Get-Counter '\Process(zebrad_v14_win32)\% Processor Time' -SampleInterval 2 -MaxSamples 3).CounterSamples.CookedValue
```

```text
506.362346582771
509.688760671639
505.957457577538
```

Sonuç: Dört iş parçacığında madencilik yapan bir Intel Core i5-8350U, 8 Ekim sabahından 9 Ekim öğleden sonrasına kadar hiçbir blok bulmadı.

### Veya musluğu kullanın

Uygulamanın sağ altında bir **Receive cTAZ** düğmesi vardır. Sürüm 14 kaynak kodunda tek bir basış, musluğun cüzdanından sizinkine 0,5 cTAZ gönderir ([tutar](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/wallet/src/lib.rs#L3073), [gönder](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/wallet/src/lib.rs#L5018-L5021)). Musluk, uygulamanın her kopyasının taşıdığı tek bir cüzdandır ([kaynak](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/wallet/src/lib.rs#L3579-L3583)) ve **Faucet Wallet** sekmesi bakiyesini gösterir.

Düğme, muslukta korumalı para olarak 5,01 cTAZ'den fazla olmadıkça devre dışıdır ([kaynak](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-gui/src/ui.rs#L3975-L3989)). Sekme musluğun kazdığı paraları da sayar ve bunlar yalnızca ücretle birlikte tam 10 cTAZ'lik miktarlarda korumalıdır ([kaynak](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/wallet/src/lib.rs#L4880-L4884)); dolayısıyla sekme bol miktar gösterirken düğme gri kalabilir. Bu çalıştırmada 8 ve 9 Ekim'de, sekme 14,74695 cTAZ gösterirken üzerine gelindiğinde "The faucet is mining more funds." ifadesiyle gri kaldı.

**Düğme griyse kendi düğümünüze sorun.** Düğüm, düğmenin 5,01 cTAZ kuralını uygulamayan `requestfaucetdonation` adlı bir musluk istek yöntemine sahiptir ([kaynak](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebra-rpc/src/methods.rs#L314-L315)). `YOUR_ADDRESS` yerine kendi adresinizi koyun (aşağıdaki `wallet_spendable_funds`'ın `address` alanıdır):

```powershell
Invoke-RestMethod -Uri http://127.0.0.1:8232 -Method Post -ContentType 'application/json' -Body '{"jsonrpc":"2.0","method":"requestfaucetdonation","params":[{"address":"YOUR_ADDRESS"}],"id":1}' | ConvertTo-Json -Depth 20
```

```text
{
    "jsonrpc":  "2.0",
    "id":  1,
    "result":  {
                   "amount":  50000000
               }
}
```

Bu yanıt, gönderildiği değil, isteğin kuyruğa alındığı anlamına gelir. Bu çalıştırmada musluğun 0,5 cTAZ'i 33.306. blokta kazıldı ve 33.322. blokta harcanabilir oldu. Bir kez isteyin: musluk paylaşılır ve ilk istek beklemedeyken aynı adres için ikinci istek reddedilir ([kaynak](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/wallet/src/lib.rs#L3553)).

### Veya başka bir katılımcıya sorun

Ağdaki herkes uygulamanın **Send** düğmesiyle size cTAZ gönderebilir. Bu çalıştırmada başka bir katılımcı 31 cTAZ gönderdi. Uygulamanın kendi Send işlevinin eklediği not olan "send from user wallet" notuyla "Received" olarak ulaştı ([kaynak](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/wallet/src/lib.rs#L5036)). [forum başlığında](https://forum.zcashcommunity.com/t/crosslink-incentivized-feature-net/55210) isteyin ve yalnızca adresinizi verin.

Musluk paraları ve hediyeler staking'i öğrenmek için yeterlidir. ZEC ödüllerine sayılmazlar.

### Harcayabileceklerinizi kontrol edin

```powershell
Invoke-RestMethod -Uri http://127.0.0.1:8232 -Method Post -ContentType 'application/json' -Body '{"jsonrpc":"2.0","method":"wallet_spendable_funds","params":[],"id":1}' | ConvertTo-Json -Depth 20
```

Adres kısaltılmış şekilde, musluğun 0,5 cTAZ'i ulaştığında yanıt buydu:

```text
{
    "jsonrpc":  "2.0",
    "id":  1,
    "result":  {
                   "address":  "utest1vqszm53j...mqmdj",
                   "committed_zats":  0,
                   "pending_zats":  0,
                   "spendable_zats":  50000000,
                   "tip_height":  33322,
                   "unshielded_zats":  0
               }
}
```

Tutarlar zatoshi cinsindendir: 100.000.000 tanesi bir cTAZ eder. Korumalı paraların harcanabilir sayılması için 3 onay gerekir ([kaynak](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebra-rpc/src/methods.rs#L621-L634)). Musluktan ve diğer katılımcılardan gelen paralar `spendable_zats`'a ulaşır. Kazılan paralar şeffaftır, dolayısıyla `unshielded_zats`'a ulaşırlar ([kaynak](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/wallet/src/lib.rs#L4659)).

Bu çalıştırmadaki ikinci stake'ten bir blok sonra, bakiyenin kalanı `pending_zats` altında görünüyordu. Birkaç blok sonra yeniden harcanabilir hale geldi.

## Adım 4: Bir kesinleştiriciye stake edin

### Bir Staking Day bekleyin

Staking, staking'den çıkma ve çekme işlemleri yalnızca şu sırada kabul edilir:

```text
block height mod 10,368 < 3,456
```

Bu, her 10.368 bloğun başında 3.456 blokluk bir penceredir. Ağın 25 saniyelik blok hedefinde bu, her üç günde bir gün eder ([kaynak](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/librustzcash/zcash_primitives/src/transaction/mod.rs#L1540-L1547)). Sürüm 14'ün ilk pencereleri 20.736, 31.104, 41.472 ve 51.840. bloklarda açılır.

Sürüm notlarına göre uygulama her Staking Day'in başlangıcını ve bitişini duyurur. Bu çalıştırmada blok listesi 34.559 ve 34.560. bloklar arasında kırmızı bir "* STAKING DAY END *" satırı gösterdi.

**Sürüm notları iki farklı şey söylüyor.** Değişiklik listelerinde "~1 gün Staking Day ve ~3 gün Staking Cycle" ifadesi yer alır; bu kodla eşleşir. Aşağıda, 1. Sezondan devralınmış bir bölüm ise hâlâ bir Staking Day'in her 150 blokta bir başladığını ve 70 blok sürdüğünü söyler. İlkini esas alın. Yukarıdaki bitiş satırı, ilk kuralın pencereyi kapattığı yerde bulunur (34.560 mod 10.368 = 3.456); ikinci kurala göre 34.560. blok pencerenin içinde kalırdı.

### Bir kesinleştirici seçin

Bir kesinleştirici, `zfinv1` ile başlayan bir dizge olan kimliğiyle adlandırılır. ZecHub, çalıştırdığı kesinleştiricinin kimliğini [`zechub_validator_crosslink.json`](https://github.com/ZecHub/zechub/blob/main/zechub_validator_crosslink.json) içinde yayımlar:

```text
zfinv1j65qJgeSId7ssZk6a71NvQG2KjD5hfJCYxWkCSPvQSmwibffVw52UYU72wKbrEL0-cw-C4PQoO5IlLgbsgA3q_Gf1mzYIKcnixNP9XXVgphIDuLI6RBMhjFfYWyzp4YN
```

Kimliği güvendiğiniz bir kaynaktan kopyalayın. Sürüm notlarına göre uygulama ayrıca sağ panelinde kesinleştiricileri, her birinin solunda bir kopyalama simgesiyle listeler.

Stake ettikten sonra cüzdan geçmişi ve RPC, kesinleştiriciyi kimliği yerine onaltılık bir anahtarla adlandırır. ZecHub'ın kesinleştiricisi için bu anahtar `2941ef23...266aae8f`'tir.

Güvendiğiniz bir kesinleştirici seçin. Tasarım otomatik kesinti içermez ancak "adlandırılmış bir kesinleştiriciye devredilmiş tüm stake'i yakan, kullanıcıların koordine ettiği bir hard fork"a izin verir ([Crosslink kitabı, tasarım özeti](https://shieldedlabs.github.io/crosslink_book/branches/main/crosslink-design-overview-20260914.html)).

Seçim aynı zamanda kimin oy vereceğine karar verir. Her etkin tahvil staking ödülündeki payını kazanır. Kesinleştiricisi listedeki 12 kişi arasındaysa, o payın onda biri komisyon olarak kesinleştiriciye gider. Bu 12'nin dışında bir kesinleştiriciye yönlendirilmiş tahvil payının tamamını korur, ancak o kesinleştirici oy kullanmaz ([kaynak](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebra-state/src/service.rs#L2063-L2079)).

### Stake edin

1. Kesinleştirici kimliğini kopyalayın.
2. **Your Wallet** sekmesinde **Stake** düğmesine basın.
3. **Paste Identity** düğmesine basın. Düğmenin üzerindeki satır, kimliğin ilk ve son karakterlerine dönüşür; ZecHub'ınki için `[zfinv1j6..YWyzp4YN]`. Devam etmeden önce bunu kontrol edin.
4. Bir tutara tıklayın. Tutarlar sabit adımlarla gelir, en küçüğü 0,01 cTAZ'dir ve yalnızca bakiyenizin karşıladığı tutarlar yanar. 0,5 cTAZ ile +0,01 cTAZ ve +0,1 cTAZ yanıyordu.

**Hiçbir şey sizden onay istemez ve hiçbir şey olmuş gibi görünmez.** Bu çalıştırmada test kullanıcısının ifadesiyle: "Bir kez tıkladım ve hiçbir şey olmadı, sadece griye dönüp tekrar yandı." Stake gerçekleşmişti. Cüzdan geçmişinde "Staked @ 33334 to 2941ef23..266aae8f" görünüyordu, ücret 0,00015 cTAZ'di ve cüzdan 0,010 cTAZ Staked gösteriyordu. Birkaç dakika sonraki ikinci stake, 33.348. blokta ikinci bir tahvil oluşturdu.

Her stake kendi delegasyon tahvilini oluşturur. Sabit tutarlar ve Staking Day'in ikisi de gizlilik içindir: bir kişinin stake'ini diğerinden ayırt etmeyi zorlaştırırlar.

## Adım 5: Konumunuzu kontrol edin

### Tahvilleriniz

```powershell
Invoke-RestMethod -Uri http://127.0.0.1:8232 -Method Post -ContentType 'application/json' -Body '{"jsonrpc":"2.0","method":"wallet_staking_positions","params":[],"id":1}' | ConvertTo-Json -Depth 20
```

Bu, staking'den iki gün sonra, 36.490. bloktaki yanıttı:

```text
{
    "jsonrpc":  "2.0",
    "id":  1,
    "result":  {
                   "active":  {
                                  "2941ef2309a4156342f285f9302ab601bd4dbd6b3a99b1ecde219207266aae8f":  [
                                                                                                           {
                                                                                                               "create_height":  33334,
                                                                                                               "create_txid":  "6824b24834eb8ca13befb3a817765e512fd25132166f0b38ad096503c4fc5a35",
                                                                                                               "initial_val":  1000000,
                                                                                                               "latest_val":  1003451,
                                                                                                               "pk":  "128a0ae7fef05e338d6b613939a45cb7773d8e9c98915cadef6fffa898f4e28d"
                                                                                                           },
                                                                                                           {
                                                                                                               "create_height":  33348,
                                                                                                               "create_txid":  "f4d932738ef4104b8663f21e5666e60a0236b117a7883391e9870a0029d25ba2",
                                                                                                               "initial_val":  1000000,
                                                                                                               "latest_val":  1003451,
                                                                                                               "pk":  "f113e0c15eaf6e89621314d88ed15d9fb035a5afeee4606af7173f9d60c48c0c"
                                                                                                           }
                                                                                                       ]
                              },
                   "withdrawable":  [

                                    ]
               }
}
```

Çağrı parametre almaz. Destekledikleri kesinleştiricinin anahtarı altında gruplanmış etkin tahvillerinizi ve staking'den çıkışı tamamlanmış, çekilebilecek tahvilleri döndürür. Her tahvil stake edilen tutarı (`initial_val`), mevcut değerini (`latest_val`) ve onu oluşturan işlemi ile blok yüksekliğini gösterir. Ödüller tahvilin kendisine eklenir: 36.490. blokta 1.000.000 zatoshi olan her tahvil 1.003.451'e büyümüştü.

**Edit Stake penceresi her tahvili on kat fazla gösterir.** Bu çalıştırmada her 0,01 cTAZ tahvil kendi satırında 0,100 cTAZ, ödüller başladıktan sonra ise 0,1003536 cTAZ görünüyordu; satırların üzerindeki toplamlar (0,020 cTAZ, daha sonra 0,02007 cTAZ) RPC ile uyuşuyordu. Toplamları ve RPC'yi esas alın.

Aynı pencere, kesinlik başlamadan önce de başladıktan sonra da kesinleştiricinin yanında bir uyarı üçgeni gösterdi. Kaynakta üçgen, uygulamanızın bu kesinleştiriciyi çevrimiçi saymadığı anlamına gelir; çevrimiçi olanın yerine bir Wi-Fi simgesi görünür ([kaynak](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-gui/src/ui.rs#L2646-L2648)). Tahviller yine de ödül kazandı.

### Kesinleştiriciler

```powershell
Invoke-RestMethod -Uri http://127.0.0.1:8232 -Method Post -ContentType 'application/json' -Body '{"jsonrpc":"2.0","method":"get_tfl_recency_status","params":[],"id":1}' | ConvertTo-Json -Depth 20
```

Sürüm notlarına göre bu, düğümünüzün oylama sürecinde nerede olduğunu ve her kesinleştirici için düğümünüzün ondan en son ne zaman haber aldığını ve nasıl oy kullandığını bildirir.

36.288. bloktan önce her alan sıfırdır ve liste boştur. Bu, 33.354. bloktaki yanıttı:

```text
{
    "jsonrpc":  "2.0",
    "id":  1,
    "result":  {
                   "now_utc":  0,
                   "my_height":  0,
                   "my_round":  0,
                   "my_step":  0,
                   "my_locked_round":  0,
                   "my_valid_round":  0,
                   "finalizer_statuses":  [

                                          ]
               }
}
```

Kesinlik başladıktan sonra liste, listedeki kesinleştiricileri tutar. 36.490. blokta 12 adet vardı; bunların arasında ZecHub'ın `2941ef23...`'ı da bulunuyordu ve bu, 12 kişilik liste sınırıyla uyuşuyordu. Bu, ilk girdiden sonra kesilmiş yanıtın başlangıcıdır:

```text
{
    "jsonrpc":  "2.0",
    "id":  1,
    "result":  {
                   "now_utc":  1791628531,
                   "my_height":  8,
                   "my_round":  0,
                   "my_step":  0,
                   "my_locked_round":  -1,
                   "my_valid_round":  -1,
                   "finalizer_statuses":  [
                                              [
                                                  "8239a79bc2f224f9f2a276a1050ec9945866253be7da4bdf27c4186c8e588dee",
                                                  {
                                                      "no_yes_votes_in_my_height":  [
                                                                                        [
                                                                                            0,
                                                                                            0
                                                                                        ],
                                                                                        [
                                                                                            0,
                                                                                            0
                                                                                        ]
                                                                                    ],
                                                      "highest_round_vote":  0,
                                                      "last_seen_new_info_utc":  0,
                                                      "last_direct_connection_utc":  null
                                                  }
                                              ],
```

Birkaç dakika sonra uygulamanın sağ panelinde "Finalizers (23)" görünüyordu.

### Linux ve macOS üzerinde

[kaynağı](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebra-rpc/src/methods.rs#L602-L610), çağrıyı `curl` biçiminde verir. Diğer çağrılar için yöntem adını değiştirin. Bu biçim bu rehber için çalıştırılmadı:

```bash
curl -X POST -H "Content-Type: application/json" -d \
'{ "jsonrpc": "2.0", "method": "get_tfl_recency_status", "params": [], "id": 1 }' \
http://127.0.0.1:8232
```

Linux üzerinde sürüm notları, uygulamada kopyalama ve yapıştırmanın çalışması için muhtemelen önce `xclip` yüklemeniz gerektiğini söyler.

### Dikkat edilmesi gereken bir RPC adı

Sürüm 14 notları, nesne alan `wallet_staking_action` adlı bir staking çağrısını açıklar. Sürüm 14 kaynak kodunda bu adda bir yöntem yoktur ve bu çalıştırmada düğüm şunu yanıtladı:

```text
{
    "jsonrpc":  "2.0",
    "id":  1,
    "error":  {
                  "code":  -32601,
                  "message":  "Method not found"
              }
}
```

Kaydettiği staking yöntemi, isteği JSON olarak tutan tek bir dizge alan ve kesinleştiriciyi `zfinv1` kimliğiyle veren [`staking_command`](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebra-rpc/src/methods.rs#L418-L420) yöntemidir ([kaynak](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebra-crosslink/src/lib.rs#L750-L760)). Bu rehber için denenmedi.

## Staking'den çıkma ve çekme

Bir tahvil oluşturulduğu gün geri alınamaz. Baştan sona üç Staking Day sürer: birinde stake edin, daha sonraki birinde staking'den çıkın, üçüncüsünde çekin. Sürüm notları, bir tahvilin aynı Staking Day içinde iki staking işlemi yapamayacağını ekler.

*Bu rehber için çalıştırılmadı. Sürüm 14 notlarına göre:* staking'den çıkmak için **Edit Stake** düğmesine basın, Staked Bonds listesinden bir tahvil seçin ve zincir bağlantısı simgesine tıklayın. Daha sonraki bir Staking Day'de çekmek için **Edit Stake** düğmesine basın, Withdrawable Bonds listesinden bir tahvil seçin ve para simgesine tıklayın. Notların retargeting dediği, tahvili farklı bir kesinleştiriciye taşıma işlemi her zaman yapılabilir.

## Ağı nereden izlemeli?

[Crosslink sekmesi, ZecHub Tools](https://zechub.wiki/tools?tool=crosslink) üzerinde araçları, "Bu ağda staking yapmak ZEC'i hareket ettirmez" yazan bir bildirimin altında tek yerde toplar:

- Düğüm gerektirmeyen barındırılan araçlar: yüksekliği, madencileri, çözüm oranını, Staking Day geri sayımını ve kesinliği içeren, "mevcut cTAZ test ağı için canlı pano" [Staker Space](https://crosslink.staker.space/); ayrıca madencilik üretimini, kesinleştirici listesini, eşleri ve staking adresi ad taleplerini içeren [ctaz.cash](https://ctaz.cash/).
- Kendi makinenizde: etkinleştirme, kesinlik gecikmesi, liste ve staking konumlarını gösteren `/live/crosslink` sayfasına sahip `zcash-explorer` ve bir Crosslink düğümünün SQLite dizini olan `crosslink_indexer`.

## Yaygın hatalar

**Saat yerine blok yüksekliğine göre plan yapmak.** Staking Day'ler bloklarla sayılır. Takvimi değil, panonun geri sayımını izleyin.

**Pencerenin son dakikalarında stake etmek.** Kural, işleminizi içeren bloğa göre kontrol edilir ([kaynak](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebra-consensus/src/transaction.rs#L941-L953)); dolayısıyla stake'in yalnızca gönderilmesi değil, pencere kapanmadan önce kazılması gerekir.

**Stake'inizi madencilikle elde etmeyi beklemek.** Dört iş parçacıklı bir CPU madencisi, Intel Core i5-8350U üzerinde 8-9 Ekim arasında hiçbir blok bulmadı. İlk cTAZ'inizi musluktan veya başka bir katılımcıdan alın.

**Hiçbir şey olmuş gibi görünmediği için yeniden tıklamak.** Bir tutara yapılan her tıklama yeni bir tahvildir. Önce cüzdan geçmişini veya `wallet_staking_positions`'ı kontrol edin.

**Yeniden başlatmadan sonra panik yapmak.** Cüzdan yeniden taranana kadar bakiyeniz ve stake'iniz sıfır görünür. Wallet Sync'in bitmesini bekleyin.

**cTAZ'i oyuncak para veya sırrı zararsız görmek.** cTAZ test parasıdır, ancak kazandığınız cTAZ gerçek ZEC içindeki payınıza karar verir. `secret.seed`'ı bir cüzdanı korur gibi koruyun.

**Eski talimatları okumak.** Sürüm notları, yeni kuralların yanında önceki sezonlardan gelen metinler taşır. Düğümünüzün yaptığıyla çeliştikleri yerde düğümünüz doğrudur.

## İlgili sayfalar

- [Crosslink Protokolü](/zcash-tech/crosslink-protocol) - bu ağın test ettiği tasarım
- [Shielded Labs](/zcash-organizations/shielded-labs) - Crosslink'ın arkasındaki ekip
- [Zcash Sürümlerini Doğrulama](/guides/verifying-zcash-releases) - bir sağlama toplamının neyi kanıtladığı ve kanıtlamadığı
- [Zebra Tam Düğüm](/zcash-tech/zebra-full-node) - Feature Net uygulamasının üzerine kurulduğu düğüm
- [Zcash Testnet](/using-zcash/testnet) - farklı bir ağ olan sıradan Zcash test ağı

## Kaynaklar

- [Sürüm 14 sürüm notları](https://github.com/ShieldedLabs/crosslink_monolith/releases/tag/v14), Shielded Labs, 1 Ekim 2026
- [Crosslink: Teşvikli Özellik Ağları](https://shieldedlabs.net/crosslink-incentivized-feature-nets/), Shielded Labs, 2 Nisan 2026
- [Crosslink: Teşvikli Feature Net](https://forum.zcashcommunity.com/t/crosslink-incentivized-feature-net/55210), Zcash Topluluk Forumu
- [Crosslink SSS](https://shieldedlabs.net/crosslink-faq/), Shielded Labs
- [Crosslink kitabı](https://shieldedlabs.github.io/crosslink_book/), Shielded Labs

---

*Bu sayfadaki adımlar, Feature Net sürüm 14 ile, Windows 11 üzerinde (sürüm 10.0.26200.9550), 8-10 Ekim 2026 arasında çalıştırılmıştır. Sürüm notlarına veya kaynak koda atıfta bulunan bir ifade bunlardan alınmıştır. "Çalıştırılmadı" olarak işaretlenen hiçbir şey denenmemiştir.*
