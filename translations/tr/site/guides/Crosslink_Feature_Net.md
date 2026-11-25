<a href="https://github.com/zechub/zechub/edit/main/site/guides/Crosslink_Feature_Net.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Sayfayı Düzenle"/>
</a>

# Crosslink Feature Net ağına katılın

## Kısaca

- Feature Net, Zcash'nin iş kanıtının yanına staking ekleyen önerilen kesinlik katmanı olan [Crosslink](/zcash-tech/crosslink-protocol) için Shielded Labs'in herkese açık test ağıdır.
- cTAZ adlı bir test coin'i üzerinde çalışır. Burada yaptığınız hiçbir şey ana ağdaki ZEC'yi taşımaz veya riske atmaz.
- Tek bir masaüstü uygulaması düğüm, madenci, cüzdan ve finalizer görevi görür. Varsayılan olarak cTAZ madenciliği yapar ve bir faucet düğmesine sahiptir.
- Staking, staking'i bırakma ve çekme işlemleri yalnızca her üç günde bir gerçekleşen bir “Staking Day” sırasında çalışır. Bu günü kaçırırsanız bir sonrakini beklersiniz.
- Staking yapmak için bir finalizer'ın kimliğini yapıştırıp bir miktar seçersiniz. Bu kılavuzda örnek olarak ZecHub'nin finalizer'ı kullanılmıştır.
- Durumunuzu iki RPC çağrısı gösterir: `wallet_staking_positions` ve `get_tfl_recency_status`.

*8-10 Ekim 2026 tarihleri arasında Windows 11 (10.0.26200.9550 sürümü) üzerinde Feature Net sürüm 14 ile test edilmiştir. Yazılım bir prototiptir ve her sürümde değişir. Gördükleriniz bu sayfadan farklıysa kendi çalıştırdığınız sürüme güvenin ve lütfen bir PR açın.*

**Güncelleme, 17 Kasım 2026: Sürüm 14 artık Feature Net ağına katılamıyor.** [Sürüm 15](https://github.com/ShieldedLabs/crosslink_monolith/releases/tag/v15) (13 Ekim), PoW yüksekliği 55.296'da bir ağ yükseltmesi içeriyordu. [sürüm 16](https://github.com/ShieldedLabs/crosslink_monolith/releases/tag/v16) ile birlikte “”her sürüm yayımlandıktan iki hafta sonra çalışmayı durdurur”” ve Shielded Labs her hafta bir sürüm yayımlamayı planlıyor. [Sürüm 17](https://github.com/ShieldedLabs/crosslink_monolith/releases/tag/v17) (5 Kasım), PoW yüksekliği 165.000'de başka bir ağ yükseltmesi içeriyordu. Bu not yazılırken en yeni sürüm [sürüm 18](https://github.com/ShieldedLabs/crosslink_monolith/releases/tag/v18) (17 Kasım 2026) idi: sürüm 17 düğümleriyle iletişim kuramıyor, 189.000. blokta bir ağ yükseltmesi içeriyor ve yaklaşık 30 Kasım'da, 212.568. blokta çalışmayı durduruyor. Sürüm 14 yerine [en yeni sürümü](https://github.com/ShieldedLabs/crosslink_monolith/releases/latest) indirin. Aşağıdaki adımlar bu sürümde yeniden uygulanmadı. Bilinen iki fark var: dosya adları değişti ve staking RPC'si artık `wallet_staking_action` oldu (bkz. [İzlenecek bir RPC adı](#one-rpc-name-to-watch)).

## Feature Net nedir?

Crosslink bir öneridir; günümüzde Zcash'nin parçası değildir. Shielded Labs'nin [Crosslink SSS'si](https://shieldedlabs.net/crosslink-faq/), bunun ana ağa ulaşabilmesi için “”standart Zcash yönetişim sürecinden geçmesi gerektiğini”” söylüyor. [Crosslink Protokol](/zcash-tech/crosslink-protocol) sayfası tasarımı açıklıyor.

Tasarımı gerçek kullanıcılarla denemek için Shielded Labs, [teşvikli özellik ağları](https://shieldedlabs.net/crosslink-incentivized-feature-nets/) olarak adlandırdığı, “”bir dizi teşvikli test ağı”” çalıştırıyor. Ağda üç rol bulunuyor ve masaüstü uygulaması bunların tümünü üstlenebiliyor:

| Rol | Yaptığı iş |
|---|---|
| Madenci | Günümüzde Zcash'de olduğu gibi iş kanıtı blokları üretir |
| Staker | cTAZ'yi bir delegasyon bond'unda kilitler ve onu bir finalizer'a yönlendirir |
| Finalizer | Blokları kesinleştirmek için oy kullanır. Oy gücü, kendisine devredilen stake miktarıdır |

Bunun arkasındaki repository, herhangi bir şey yüklemeden önce okunmaya değer bir sorumluluk reddiyle başlıyor: bu repository “”fikirleri kanıtlamak için vardır, üretim mühendisliğini göstermek için değil”” ve “”üretime hazır kod değildir”” ([README](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/README.md)). Bunu çalıştırmanın kabul edilebilir olduğu bir makinede çalıştırın.

### Sürüm 14'te değişenler

[Sürüm 14](https://github.com/ShieldedLabs/crosslink_monolith/releases/tag/v14), 1 Ekim 2026'da yayımlandı. Ağ, basit iş kanıtı olarak başlıyor ve Crosslink'yi üç adımda etkinleştiriyor ([kaynak](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/librustzcash/zcash_primitives/src/bft.rs#L546-L555); ayrıca [ctaz.cash](https://ctaz.cash/v14) üzerinde gösteriliyor):

| Blok | Ne olur |
|---|---|
| 20.736 | Staking açılır |
| 34.560 | İlk finalizer listesi, zincir üstündeki stake'lerden alınır |
| 36.288 | BFT kesinliği ve bununla birlikte staking ödülleri başlar |

Staking ödülleri bu blokların sonuncusunda başlar. Daha önce oluşturulan bir bond, o zamana kadar hiçbir şey kazanmaz ([kaynak](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebra-chain/src/parameters/network/subsidy.rs#L487-L508)).

Aynı sürüm, etkin listeyi en fazla stake'e sahip 12 finalizer'a indirdi ([kaynak](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/librustzcash/zcash_primitives/src/bft.rs#L884)) ve sürüm notlarının ifadesiyle onlara bir komisyon verdi: “”Bir bloktaki tüm PoS ödüllerinin %10'u bu komisyonlara giderken %90'ı tüm staking bond'larına dağıtılır.””

### cTAZ ve gerçek ZEC

cTAZ (””Crosslink TAZ””), Feature Net'nin test coin'idir. cTAZ stake edersiniz, asla ZEC değil.

Gerçek ZEC yalnızca sonunda devreye girer. Shielded Labs, özellik ağları için [500 ZEC](https://shieldedlabs.net/crosslink-incentivized-feature-nets/) ayırdı ve [sürüm notlarında](https://github.com/ShieldedLabs/crosslink_monolith/releases/tag/v14) bunun “”yalnızca her katılımcının madencilik veya staking yoluyla kazandığı cTAZ miktarına göre orantılı olarak”” ödendiği yazıyor. Bunun iki sonucu var:

- **Faucet coin'leri sayılmaz.** Faucet'in veya başka birinin size verdiği cTAZ, cüzdanınızda durarak hiçbir şey kazandırmaz. Yalnızca madencilik ve staking yoluyla elde edilen blok ödülleri sayılır.
- **Ödemeler otomatik değil, talep edilmelidir.** Shielded Labs her turu [forum başlığında](https://forum.zcashcommunity.com/t/crosslink-incentivized-feature-net/55210) duyurur. Round 2 için katılımcılardan cüzdanlarının görüntüleme anahtarını ve bir ana ağ adresini 4 Ekim 2026'ya kadar göndermeleri istendi ([94. gönderi](https://forum.zcashcommunity.com/t/crosslink-incentivized-feature-net/55210/94)). Sürüm 14'ün çalıştığı ve bu kılavuzun katıldığı ağ, Round 3 olarak duyuruldu ([101. gönderi](https://forum.zcashcommunity.com/t/crosslink-incentivized-feature-net/55210/101)).

## Başlamadan önce

- **Çalışır durumda bırakabileceğiniz bir bilgisayar.** Sürüm 14'ün Windows, macOS, Ubuntu ve Arch Linux için derlemeleri vardı. Sürüm 17 ve 18'in Windows, macOS ve Ubuntu için derlemeleri var. Bu kılavuz Windows üzerinde, Intel Core i5-8350U işlemcili bir bilgisayarda uygulandı.
- **Bir Staking Day.** Herhangi bir plan yapmadan önce bir sonraki günün ne zaman açılacağını kontrol edin. [Staker Space'in gösterge paneli](https://crosslink.staker.space/) bu zamana geri sayar.
- **Başka hiçbir şey gerekmez.** ZEC, hesap veya kayıt yok.

## 1. adım: Uygulamayı indirin ve dosyayı kontrol edin

1. [en yeni sürümü](https://github.com/ShieldedLabs/crosslink_monolith/releases/latest) açın ve **Assets** bölümüne kaydırın. Bu kılavuzda, artık ağa katılamayan [sürüm 14 sürümü](https://github.com/ShieldedLabs/crosslink_monolith/releases/tag/v14) kullanıldı.
2. Sisteminiz için olan dosyayı indirin. Windows üzerinde dosya adı `_win32.exe` ile biter: aşağıdaki çalıştırmada `zebrad_v14_win32.exe`, sürüm 18 için `zebra-crosslink_v18_win32.exe`. Aşağıdaki komutlarda kendi dosyanızın adını ve özetini kullanın.
3. Dosyanın SHA-256 değerini, GitHub'nin ilgili asset'in yanında gösterdiği özetle karşılaştırın.

Windows üzerinde, PowerShell içinde:

```powershell
Get-FileHash .\zebrad_v14_win32.exe -Algorithm SHA256 | Format-List
```

```text
Algorithm : SHA256
Hash      : 1D464E31CCC110E175D45E3EDC0B7FB0B9583ACC996E99F4398F390EC111297E
Path      : C:\crosslink\zebrad_v14_win32.exe
```

GitHub'nin bu dosya için gösterdiği özet `1d464e31ccc110e175d45e3edc0b7fb0b9583acc996e99f4398f390ec111297e`. Onaltılık gösterimde büyük-küçük harf farkı olmadığı için yukarıdaki büyük harfler uygundur. Karşılaştırmayı gözleriniz yerine shell'in yapmasını sağlamak için:

```powershell
$expected = "1d464e31ccc110e175d45e3edc0b7fb0b9583acc996e99f4398f390ec111297e"
$actual = (Get-FileHash .\zebrad_v14_win32.exe -Algorithm SHA256).Hash.ToLower()
if ($actual -eq $expected) { "OK" } else { "MISMATCH" }
```

```text
OK
```

Bu kontrolün neyi doğruladığını bilin. Sürüm imza taşımıyor; dolayısıyla eşleşen bir hash, indirmenin tamamlandığını ve GitHub'nin sunduğu dosya olduğunu gösterir. Dosyayı kimin oluşturduğunu göstermez. [Zcash sürümlerini doğrulama](/guides/verifying-zcash-releases) bu farkı açıklar.

## 2. adım: Düğümü başlatın ve eşitlenmesine izin verin

Uygulamayı bir terminalden başlatın; böylece başlangıç iletileri ekranda kalır. “”Yönetici olarak çalıştır”” seçeneğiyle açılmamış sıradan bir PowerShell penceresi kullanın: bu imzasız prototip yazılımının yönetici haklarına ihtiyacı yoktur.

```powershell
.\zebrad_v14_win32.exe
```

“”Zcash Crosslink Görselleştirici”” başlıklı bir pencere açılır. Solda **Your Wallet** ve **Faucet Wallet** sekmeleriyle cüzdan, ortada zincir ve sağda finalizer'lar gösterilir. Terminal, düğümün günlüğünü yazdırmaya devam eder. Ağı kullanırken ikisini de açık bırakın.

Sürüm notlarında [Windows kurulum videosuna](https://www.youtube.com/watch?v=cO-5Oa4B1Tk) bağlantı veriliyor.

Sürüm notlarına göre uygulama verilerini şu önbellek klasöründe tutar: Windows üzerinde `%LOCALAPPDATA%\zebra`, Linux üzerinde `~/.cache/zebra` ve macOS üzerinde `~/Library/Caches/zebra`.

**Sırrınızı kendinize saklayın.** Bu klasörde `secret.seed` adlı bir dosya bulunur. Uygulama bu dosyayı ilk başlatmada oluşturur ([kaynak](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebrad/src/commands/start.rs#L280-L305)) ve cüzdanınızı ve finalizer kimliğinizi bundan türetir ([kaynak](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebrad/src/commands/start.rs#L625-L626)). Uygulamada aynı sırrı panonuza koyan bir **Copy Seed** düğmesi de bulunur. Bunlardan herhangi birine sahip olan kişi cüzdanınızı kontrol eder. Bunları asla bir sohbete, forum gönderisine veya ekran görüntüsüne yapıştırmayın.

### Eşitlendiğinizi nasıl anlarsınız?

Sürüm notlarında, ağa ne kadar yaklaştığınızın eşitlenme durumunu izlemek için “”yerleşik bir izleme bulunmadığı”” yazıyor. Sürüm 14'te gerçekten de bazı bilgiler var: pencerenin üst kısmındaki **Network Info** açılır menüsünde PoW Height, Wallet Sync ve Blocks Behind Known PoW satırları bulunuyor ([kaynak](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-gui/src/ui.rs#L4362-L4373)). Yüksekliğinizi [Staker Space](https://crosslink.staker.space/) veya [ctaz.cash](https://ctaz.cash/) üzerindeki değerle karşılaştırın.

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

Bu derlemede RPC bağlantı noktası `127.0.0.1:8232` varsayılan olarak açıktır ve parola gerektirmez ([kaynak](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebrad/src/config.rs#L333-L337)). Yalnızca kendi makinenizi dinler ve o makinede çalışan her şey onu çağırabilir.

Bu çalıştırmada, 0. bloktan yaklaşık 28.400. bloktaki tepeye kadar olan ilk eşitleme yaklaşık 50 dakika sürdü.

**Yeniden başlattıktan sonra bakiyeniz bir süre sıfır görünür.** Uygulama her başladığında cüzdanı `secret.seed` üzerinden yeniden oluşturur ve zinciri 0. bloktan itibaren tekrar tarar ([kaynak](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/wallet/src/lib.rs#L3609-L3623)). Tarama işlemlerinizin bulunduğu yere ulaşana kadar bakiyeniz ve stake'iniz 0 görünür. Bu çalıştırmada, yeniden başlatmadan yaklaşık 15 dakika sonra değerler geri geldi. Faucet'in cüzdanı da aynı şekilde yeniden taranır ([kaynak](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/wallet/src/lib.rs#L3588)) ve tarama sırasında Faucet Wallet sekmesinde çok büyük bir bakiye gösterildi. Wallet Sync tamamlanana kadar her ikisini de göz ardı edin.

## 3. adım: Biraz cTAZ edinin

### Madencilik yapın

Sürüm notlarına göre uygulama, eşitlendiğinde kendi cüzdanınız için CPU madenciliğini başlatır. Herhangi bir şeyi açmanız gerekmez. Madencilikle elde edilen coin'ler kendi cüzdanınızın şeffaf adresine gider ([kaynak](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebrad/src/commands/start.rs#L349-L355)).

Bir blok bulup bulamayacağı ise başka bir konudur. Notlarda “”daha hızlı madencilik yapanlar tarafından geride bırakılabileceğiniz için başarı garantisi yoktur”” uyarısı yapılıyor. Yerleşik madenci varsayılan olarak tek bir CPU iş parçacığı kullanır ([kaynak](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebra-rpc/src/config/mining.rs#L97-L100)).

Daha fazla iş parçacığı kullanmak için uygulamayı başlatmadan önce aynı PowerShell penceresinde bir ortam değişkeni ayarlayın ([kaynak](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebrad/src/config.rs#L109-L128)). Bu çalıştırmada dört iş parçacığı kullanıldı:

```powershell
$env:ZEBRA_MINING__INTERNAL_MINER_THREADS = "4"
.\zebrad_v14_win32.exe
```

Değişken yalnızca o pencere açık kaldığı sürece geçerlidir. Ayarlandığında Windows'nin işlemci sayacı, düğümün bir mantıksal işlemcinin yüzdesi olarak dört ila beş işlemci değerinde zaman kullandığını gösterdi:

```powershell
(Get-Counter '\Process(zebrad_v14_win32)\% Processor Time' -SampleInterval 2 -MaxSamples 3).CounterSamples.CookedValue
```

```text
506.362346582771
509.688760671639
505.957457577538
```

Sonuç: dört iş parçacığında madencilik yapan bir Intel Core i5-8350U, 8 Ekim'in erken saatlerinden 9 Ekim öğleden sonrasına kadar hiçbir blok bulamadı.

### Veya faucet'i kullanın

Uygulamanın sağ alt kısmında **Receive cTAZ** düğmesi bulunur. Sürüm 14 kaynak kodunda, bir kez basıldığında faucet'in cüzdanından sizin cüzdanınıza 0,5 cTAZ gönderilir ([miktar](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/wallet/src/lib.rs#L3073), [gönderme](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/wallet/src/lib.rs#L5018-L5021)). Faucet, uygulamanın her kopyasının taşıdığı tek bir cüzdandır ([kaynak](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/wallet/src/lib.rs#L3579-L3583)) ve **Faucet Wallet** sekmesi onun bakiyesini gösterir.

Düğme, faucet'in korumalı coin'lerinde 5,01 cTAZ'den fazla olmadığı sürece etkin değildir ([kaynak](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-gui/src/ui.rs#L3975-L3989)). Sekme faucet'in madencilikle kazandığı coin'leri de sayar; bunlar yalnızca tam olarak 10 cTAZ artı bir ücretlik gruplar hâlinde korumalı olduğundan ([kaynak](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/wallet/src/lib.rs#L4880-L4884)), düğme gri kalırken sekmede yüksek bir bakiye görünebilir. Bu çalıştırmada düğme 8 ve 9 Ekim'de gri kaldı; üzerine gelindiğinde “”Faucet daha fazla fon madenciliği yapıyor.”” yazarken sekmede 14,74695 cTAZ gösteriliyordu.

**Düğme gri olduğunda kendi düğümünüze sorun.** Düğümde `requestfaucetdonation` adlı bir faucet isteme yöntemi vardır ([kaynak](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebra-rpc/src/methods.rs#L314-L315)) ve düğmenin 5,01 cTAZ kuralını uygulamaz. `YOUR_ADDRESS` yerine kendi adresinizi yazın (aşağıdaki `wallet_spendable_funds` öğesinin `address` alanıdır):

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

Bu yanıt isteğin kuyruğa alındığı anlamına gelir; gönderildiği anlamına gelmez. Bu çalıştırmada faucet'in 0,5 cTAZ'si 33.306. blokta madencilikle elde edildi ve 33.322. blokta harcanabilir hâle geldi. Yalnızca bir kez isteyin: faucet ortaktır ve ilk istek beklemedeyken aynı adres için ikinci bir istek reddedilir ([kaynak](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/wallet/src/lib.rs#L3553)).

### Veya başka bir katılımcıdan isteyin

Ağdaki herkes uygulamanın **Send** düğmesiyle size cTAZ gönderebilir. Bu çalıştırmada başka bir katılımcı 31 cTAZ gönderdi. Bu, “”Received”” olarak geldi ve uygulamanın kendi Send işleminin eklediği note olan “”send from user wallet”” note'unu içeriyordu ([kaynak](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/wallet/src/lib.rs#L5036)). [forum başlığında](https://forum.zcashcommunity.com/t/crosslink-incentivized-feature-net/55210) isteyin ve yalnızca adresinizi verin.

Faucet coin'leri ve hediyeler staking öğrenmek için yeterlidir. Bunlar ZEC ödüllerine dahil edilmez.

### Harcayabileceğiniz miktarı kontrol edin

```powershell
Invoke-RestMethod -Uri http://127.0.0.1:8232 -Method Post -ContentType 'application/json' -Body '{"jsonrpc":"2.0","method":"wallet_spendable_funds","params":[],"id":1}' | ConvertTo-Json -Depth 20
```

Faucet'in 0,5 cTAZ'si geldikten sonra adres kısaltılmış olarak yanıt şöyleydi:

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

Miktarlar zatoshi cinsindendir: 100.000.000 zatoshi, 1 cTAZ eder. Korumalı coin'lerin harcanabilir sayılması için 3 onay gerekir ([kaynak](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebra-rpc/src/methods.rs#L621-L634)). Faucet'ten ve diğer katılımcılardan gelen coin'ler `spendable_zats` içine düşer. Madencilikle elde edilen coin'ler şeffaftır; bu nedenle `unshielded_zats` içine düşer ([kaynak](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/wallet/src/lib.rs#L4659)).

Bu çalıştırmada ikinci stake işleminden bir blok sonra bakiyenin geri kalanı `pending_zats` altında göründü. Birkaç blok sonra yeniden harcanabilir hâle geldi.

## 4. Adım: Bir finalizer'a staking yapma

### Bir Staking Day bekleyin

Staking, staking'i kaldırma ve çekme işlemleri yalnızca

```text
block height mod 10,368 < 3,456
```

sırasında kabul edilir. Bu, her 10.368 blokta başlangıçta bulunan 3.456 blokluk bir aralıktır. Ağın 25 saniyelik blok hedefinde bu, her üç günde bir gün anlamına gelir ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/librustzcash/zcash_primitives/src/transaction/mod.rs#L1540-L1547)). Sürüm 14'ün ilk aralıkları 20.736, 31.104, 41.472 ve 51.840 numaralı bloklarda açılır.

Sürüm notlarına göre uygulama, her Staking Day'in başlangıcını ve bitişini duyurur. Bu çalıştırmada blok listesinde 34.559 ve 34.560 blokları arasında kırmızı bir “* STAKING DAY END *” satırı gösterildi.

**Sürüm notları iki şey söylüyor.** Değişiklikler listesinde “Staking Day için yaklaşık 1 gün ve Staking Cycle için yaklaşık 3 gün” ifadesi yer alıyor; bu, kodla uyuşuyor. Daha aşağıda, Season 1'den devralınan bir bölüm hâlâ Staking Day'in her 150 blokta başladığını ve 70 blok sürdüğünü söylüyor. İlk kuralı esas alın. Yukarıdaki bitiş satırı, ilk kuralın aralığı kapattığı yerde bulunuyor (34.560 mod 10.368 = 3.456); ikinci kurala göre 34.560 numaralı blok bir aralığın içinde olurdu.

### Bir finalizer seçin

Bir finalizer, `zfinv1` ile başlayan bir dize olan kimliğiyle adlandırılır. ZecHub, çalıştırdığı finalizer'ın kimliğini [`zechub_validator_crosslink.json`](https://github.com/ZecHub/zechub/blob/main/zechub_validator_crosslink.json) içinde yayımlar:

```text
zfinv1j65qJgeSId7ssZk6a71NvQG2KjD5hfJCYxWkCSPvQSmwibffVw52UYU72wKbrEL0-cw-C4PQoO5IlLgbsgA3q_Gf1mzYIKcnixNP9XXVgphIDuLI6RBMhjFfYWyzp4YN
```

Güvendiğiniz bir kaynaktan bir kimlik kopyalayın. Sürüm notlarına göre uygulama, finalizer'ları sağ panelinde de listeler ve her birinin solunda bir kopyalama simgesi bulunur.

Staking yaptıktan sonra cüzdan geçmişi ve RPC, finalizer'ı kimliği yerine bir onaltılık anahtarla adlandırır. ZecHub finalizer'ı için bu anahtar `2941ef23...266aae8f` değeridir.

Güvendiğiniz bir finalizer seçin. Tasarımda otomatik slashing yoktur, ancak “kullanıcıların koordine ettiği ve adı belirtilen bir finalizer'a devredilmiş tüm stake'i yakan bir hard fork” yapılmasına izin verir ([Crosslink book, design overview](https://shieldedlabs.github.io/crosslink_book/branches/main/crosslink-design-overview-20260914.html)).

Seçim, kimin oy kullanacağını da belirler. Her etkin bond, staking ödülündeki payını kazanır. Finalizer'ı 12 kişilik listede yer alıyorsa, bu payın onda biri komisyon olarak finalizer'a gider. 12 kişinin dışındaki bir finalizer'a yönlendirilmiş bir bond, payının tamamını korur; ancak bu finalizer oy kullanmaz ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebra-state/src/service.rs#L2063-L2079)).

### Stake yapın

1. Finalizer kimliğini kopyalayın.
2. **Your Wallet** sekmesinde **Stake** düğmesine basın.
3. **Paste Identity** düğmesine basın. Düğmenin üstündeki satır, kimliğin ilk ve son karakterlerine dönüşür; ZecHub için bu değer `[zfinv1j6..YWyzp4YN]` olur. Devam etmeden önce kontrol edin.
4. Bir miktara tıklayın. Miktarlar sabit adımlarla gelir; en küçük miktar 0,01 cTAZ'dır ve yalnızca bakiyenizin karşıladığı miktarlar etkin görünür. 0,5 cTAZ ile +0,01 cTAZ ve +0,1 cTAZ etkin görünüyordu.

**Hiçbir şey sizden onay istemez ve hiçbir şey oluyor gibi görünmez.** Bu çalıştırmada test uzmanının sözleriyle: “Bir kez tıkladım ve hiçbir şey olmadı; sadece griye döndü, sonra tekrar etkinleşti.” Stake işlemi gerçekleşmişti. Cüzdan geçmişinde “Staked @ 33334 to 2941ef23..266aae8f” gösterildi, ücret 0,00015 cTAZ idi ve cüzdanda 0,010 cTAZ Staked görünüyordu. Birkaç dakika sonra yapılan ikinci stake işlemi, 33.348 numaralı blokta ikinci bir bond oluşturdu.

Her stake işlemi kendi delegation bond'unu oluşturur. Sabit miktarlar ve Staking Day, gizlilik amacıyla kullanılır: Bir kişinin stake'ini diğerinden ayırt etmeyi zorlaştırırlar.

## 5. Adım: Pozisyonunuzu kontrol edin

### Bond'larınız

```powershell
Invoke-RestMethod -Uri http://127.0.0.1:8232 -Method Post -ContentType 'application/json' -Body '{"jsonrpc":"2.0","method":"wallet_staking_positions","params":[],"id":1}' | ConvertTo-Json -Depth 20
```

Bu, staking işleminden iki gün sonra, 36.490 numaralı bloktaki yanıttı:

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

Bu çağrı parametre almaz. Etkin bond'larınızı, her birinin desteklediği finalizer'ın anahtarı altında gruplandırılmış şekilde ve staking'i kaldırma işlemi tamamlanmış, çekilmeye hazır bond'ları döndürür. Her bond, stake yapılan miktarı (`initial_val`), mevcut değerini (`latest_val`) ve onu oluşturan işlemi ve blok yüksekliğini gösterir. Ödüller doğrudan bond'a eklenir: 36.490 numaralı blokta 1.000.000 zatoshi değerindeki her bond 1.003.451'e yükselmişti.

**Edit Stake penceresi her bond'u on kat büyük gösterir.** Bu çalıştırmada her 0,01 cTAZ değerindeki bond kendi satırında 0,100 cTAZ olarak görünüyordu; ödüller başladıktan sonra ise 0,1003536 cTAZ görünüyordu. Satırların üzerindeki toplamlar (0,020 cTAZ, daha sonra 0,02007 cTAZ) RPC ile uyuşuyordu. Toplamları ve RPC'yi esas alın.

Aynı pencere, finalizer'ın yanında hem finalite başlamadan önce hem de başladıktan sonra bir uyarı üçgeni gösteriyordu. Kaynak kodda üçgen, uygulamanızın bu finalizer'ı çevrimiçi olarak saymadığı anlamına gelir; çevrimiçi olan bir finalizer yerine bir Wi-Fi simgesi alır ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-gui/src/ui.rs#L2646-L2648)). Bond'lar yine de ödül kazandı.

### Finalizer'lar

```powershell
Invoke-RestMethod -Uri http://127.0.0.1:8232 -Method Post -ContentType 'application/json' -Body '{"jsonrpc":"2.0","method":"get_tfl_recency_status","params":[],"id":1}' | ConvertTo-Json -Depth 20
```

Sürüm notlarına göre bu, düğümünüzün oylama sürecinde nerede bulunduğunu ve her finalizer için düğümünüzün ondan en son ne zaman haber aldığını ve nasıl oy kullandığını bildirir.

36.288 numaralı bloktan önce her alan sıfırdır ve liste boştur. Bu, 33.354 numaralı bloktaki yanıttı:

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

Finalite başladıktan sonra listede roster'daki finalizer'lar bulunur. 36.490 numaralı blokta listede, aralarında `2941ef23...`'nın ZecHub değerinin de bulunduğu 12 finalizer vardı; bu, 12 kişilik roster sınırıyla uyuşur. Bu, ilk girdiden sonra kesilmiş yanıtın başlangıcıdır:

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

Birkaç dakika sonra uygulamanın sağ panelinde “Finalizers (23)” gösterildi.

### Linux ve macOS hakkında

[source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebra-rpc/src/methods.rs#L602-L610), çağrıyı `curl` biçiminde verir. Diğer çağrılar için yöntem adını değiştirin. Bu biçim bu rehber için çalıştırılmadı:

```bash
curl -X POST -H "Content-Type: application/json" -d \
'{ "jsonrpc": "2.0", "method": "get_tfl_recency_status", "params": [], "id": 1 }' \
http://127.0.0.1:8232
```

Linux üzerinde, sürüm notlarına göre uygulamada kopyalama ve yapıştırmanın çalışması için muhtemelen önce `xclip` yüklemeniz gerekir.

### Dikkat edilmesi gereken bir RPC adı

Sürüm 14 sürüm notları, bir nesne alan ve `wallet_staking_action` adını taşıyan bir staking çağrısını açıklar. Sürüm 14 kaynak kodunda bu ada sahip bir yöntem yoktur ve bu çalıştırmada düğüm şu yanıtı verdi:

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

Kaydettiği staking yöntemi, isteği JSON olarak içeren tek bir dize alan [`staking_command`](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebra-rpc/src/methods.rs#L418-L420) yöntemidir; finalizer, `zfinv1` kimliğiyle verilir ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebra-crosslink/src/lib.rs#L750-L760)). Bu rehber için denenmedi.

**Sürüm 14'ten sonra değişti.** Sürüm 15'ten itibaren düğüm `wallet_staking_action` kaydeder ve artık `staking_command` yöntemine sahip değildir ([version 18 source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v18/zebra-crosslink/zebra-rpc/src/methods.rs#L620-L622)). Bu yöntem, tam olarak dört biçimden birine sahip tek bir nesne alır: `CreateNewDelegationBond`, `RetargetDelegationBond`, `BeginDelegationUnbonding` veya `WithdrawDelegationBond`. Finalizer, 64 karakterlik bir onaltılık anahtar olarak verilir ([version 15 release notes](https://github.com/ShieldedLabs/crosslink_monolith/releases/tag/v15)). 189.000 numaralı bloktan itibaren her staking işlemi bond'un mevcut sürümünü de belirtir; bu nedenle güncel olmayan bir bond'a karşı oluşturulan işlem reddedilir ve cüzdanların sürüm 18'i çalıştırması gerekir ([version 18 release notes](https://github.com/ShieldedLabs/crosslink_monolith/releases/tag/v18)). Bu da bu rehber için denenmedi.

## Staking'i kaldırma ve çekme

Bir bond oluşturulduğu gün geri alınamaz. Başlangıçtan tamamlanmaya kadar üç Staking Day gerekir: Birinde stake yapın, daha sonrakinde staking'i kaldırın, üçüncüsünde çekin. Sürüm notları, tek bir bond'un aynı Staking Day içinde iki staking işlemi gerçekleştiremeyeceğini de ekler.

*Bu rehber için çalıştırılmadı. Sürüm 14 sürüm notlarına göre:* staking'i kaldırmak için **Edit Stake** düğmesine basın, Staked Bonds listesinden bir bond seçin ve zincir bağlantısı simgesine tıklayın. Daha sonraki bir Staking Day'de çekmek için **Edit Stake** düğmesine basın, Withdrawable Bonds listesinden bir bond seçin ve para simgesine tıklayın. Sürüm notlarında retargeting olarak adlandırılan bir bond'u farklı bir finalizer'a taşımaya her zaman izin verilir.

## Ağı nereden izleyebilirsiniz

[Crosslink sekmesi, ZecHub Tools](https://zechub.wiki/tools?tool=crosslink) üzerinde, “Bu ağda staking yapmak ZEC taşımaz” bildiriminin altında araçları tek bir yerde toplar:

- Barındırılan, düğüm gerektirmeyen: “mevcut cTAZ testnet'i için canlı gösterge paneli” olan [Staker Space](https://crosslink.staker.space/); blok yüksekliğini, madencileri, çözüm oranını, Staking Day geri sayımını ve finaliteyi gösterir. Ayrıca madencilik üretimini, finalizer roster'ını, eşleri ve staking-adresi ad taleplerini gösteren [ctaz.cash](https://ctaz.cash/) bulunur.
- Kendi makinenizde: etkinleştirmeyi, finalite gecikmesini, roster'ı ve staking pozisyonlarını gösteren `/live/crosslink` sayfasına sahip `zcash-explorer` ve bir Crosslink düğümünün SQLite dizini olan `crosslink_indexer`.

## Yaygın hatalar

**Saat yerine blok yüksekliğine göre plan yapmamak.** Staking Day'ler bloklarla sayılır. Takvimi değil, bir gösterge panelinin geri sayımını izleyin.

**Aralığın son dakikalarında staking yapmak.** Kural, işleminizi içeren bloğa göre denetlenir ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebra-consensus/src/transaction.rs#L941-L953)); bu nedenle stake işleminin yalnızca gönderilmesi değil, aralık kapanmadan önce madenciliğinin yapılması gerekir.

**Stake'inizi madencilik yaparak kazanmayı beklemek.** Intel Core i5-8350U üzerinde çalışan dört iş parçacıklı bir CPU madencisi, 8 ve 9 Ekim arasında hiçbir blok bulamadı. İlk cTAZ'ınızı faucet'tan veya başka bir katılımcıdan alın.

**Hiçbir şey olmuş gibi görünmediği için yeniden tıklamak.** Bir miktara yapılan her tıklama yeni bir bond oluşturur. Önce cüzdan geçmişini veya `wallet_staking_positions` kontrol edin.

**Yeniden başlatma sonrasında paniğe kapılmak.** Cüzdan yeniden tarama yapmayı tamamlayana kadar bakiyeniz ve stake'iniz sıfır görünür. Wallet Sync işleminin tamamlanmasını bekleyin.

**cTAZ'ı oyun parası veya sırrı zararsız bir şey olarak görmek.** cTAZ bir test coin'idir, ancak kazandığınız cTAZ gerçek ZEC içindeki payınızı belirler. `secret.seed` bir cüzdanı koruduğunuz gibi koruyun.

**Eski talimatları okumak.** Sürüm notlarında, yeni kuralların yanında önceki sezonlardan kalma metinler bulunur. Düğümünüzün davranışıyla çeliştikleri yerde düğümünüzü esas alın.

## İlgili sayfalar

- [Crosslink Protocol](/zcash-tech/crosslink-protocol) - bu ağın sınadığı tasarım
- [Shielded Labs](/zcash-organizations/shielded-labs) - Crosslink arkasındaki ekip
- [Verifying Zcash Releases](/guides/verifying-zcash-releases) - bir sağlama toplamının neyi kanıtlayıp neyi kanıtlamadığı
- [Zebra Full Node](/zcash-tech/zebra-full-node) - Feature Net uygulamasının üzerine kurulduğu düğüm
- [Zcash Testnet](/using-zcash/testnet) - farklı bir ağ olan sıradan Zcash test ağı

## Kaynaklar

- [Version 14 release notes](https://github.com/ShieldedLabs/crosslink_monolith/releases/tag/v14), Shielded Labs, 1 Ekim 2026
- [Crosslink: Incentivized Feature Nets](https://shieldedlabs.net/crosslink-incentivized-feature-nets/), Shielded Labs, 2 Nisan 2026
- [Crosslink: Incentivized Feature Net](https://forum.zcashcommunity.com/t/crosslink-incentivized-feature-net/55210), Zcash Community Forum
- [Crosslink FAQ](https://shieldedlabs.net/crosslink-faq/), Shielded Labs
- [The Crosslink book](https://shieldedlabs.github.io/crosslink_book/), Shielded Labs

---

*Bu sayfadaki adımlar, 8-10 Ekim 2026 tarihleri arasında, Feature Net version 14 ile Windows 11 (version 10.0.26200.9550) üzerinde çalıştırıldı. Sürüm notlarına veya kaynak koduna atıfta bulunan ifadeler bunlardan alınmıştır. “not run” olarak işaretlenen hiçbir şey denenmedi.*
