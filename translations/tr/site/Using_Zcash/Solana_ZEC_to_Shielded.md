<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Solana_ZEC_to_Shielded.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Solana üzerindeki ZEC elinize mi geçti? Korumalı Zcash’ye taşıyın

Bu sayfa, elinizde ZCAT bulunduğu için ZEC Solana cüzdanınızda görünüyorsa veya sahiplerine ZEC ödemesi yapan başka bir Solana tokenınız varsa sizin içindir. Bu adımları izlemek için hiçbir şey satmanız gerekmez. Zaten sahip olduğunuz ZEC varlığını Solana üzerinden bir Zcash cüzdanına aktaracak ve sonunda varlığı korumalı hâle getireceksiniz.

Aşağıdaki her adımı, 27 Eylül 2026’da Phantom içinde 0,00266336 ZEC ile başlayan gerçek bir transferle uyguladık. Bu sayfadaki ücretler, süreler ve ekranlar bizim gördüklerimizdir.

---

## Kısaca

- ZEC cüzdanınızdaki Solana, gerçek ZEC ile 1:1 desteklenen bir **Solana token**'dır (mint `A7bd…QXaS`); NEAR OmniBridge'ın Zcash Zinciri'nde tuttuğu bu varlık, Solana'ın halka açık defterinde bulunan ve orada korumalı hâle getirilemeyen “kâğıt ZEC”tır.
- Rota iki adımdan oluşur: önce token'ı solswap.org'da (NEAR Intents) **yatırın**, ardından `u1` korumalı adresinize near.com üzerinden **çekin**. Phantom'ın kendi Takas düğmesini kullanmayın; size yardımcı olamaz.
- [ZecHub dizininin](/wallets) **Ironwood: Hazır** olarak işaretlediği bir cüzdan kullanın ve Solana ücretini ödemek için Phantom'da az miktarda SOL bulundurun.
- Gerçek testimizde (27 Eylül 2026, 0.00266336 ZEC): yatırma 9 saniyede gerçekleşti, çekme yaklaşık 8 dakika sürdü; toplam maliyet ~0.00025 ZEC + 0.0016 SOL oldu.
- Güvenlik notu: `intents.near`'ın mesajda bulunduğu `near.com`/`solswap.org` üzerindeki mesaj isteklerini yalnızca imzalayın, kurtarma ifadenizi asla yazmayın ve bir `u1` yapıştırın; asla `t1` yapıştırmayın.

## Görsel benzetme

Solana üzerindeki ZEC bir **casino fişi** gibi çalışır. Nakit gibi fiyatlanır ve casino — NEAR OmniBridge — fişi iade eden herkese gerçek banknotlar (yerel ZEC) vermeyi taahhüt eder. Ancak fiş, casinonun defterindeki bir satırdan ibarettir: Herkes kimin elinde olduğunu görebilir ve değeri, casinonun sistemlerinin düzgün çalışmasına bağlıdır. near.com üzerinden çekmek, gişeye gidip fişi bozdurmak gibidir. Banknotlar korumalı bir havuza girdikten sonra, kendi opak cüzdanınızdadır — artık hiç kimse tutarı veya sahibini göremez.

---

## Elinizde aslında ne var

Solana cüzdanınızdaki ZEC, Zcash ağındaki coinler değil, Solana üzerinde bir tokendır. NEAR OmniBridge bu tokenı çıkarır ve desteklemek için Zcash Zinciri’nde gerçek ZEC tutar; köprü Ekim 2025’ten beri Solana üzerinde çalışıyor. Solana ayağı, bir Zcash hafif istemcisi üzerinde değil, Wormhole mesajları ve NEAR Chain Signatures üzerinden çalışır; bu nedenle Solana tarafının güvenilirliği yalnızca bu iki sistem kadar sağlamdır. İnsanlar buna “kâğıt ZEC” der. ZEC fiyatını takip eder, ancak her bakiye ve her transfer, cüzdan adresinizle birlikte Solana’ın herkese açık defterinde yer alır ve orada kaldığı sürece korumalı hâle getirilemez.

Sizdekinin gerçek token olduğunu doğrulayın. Phantom içinde **ZEC** seçeneğine dokunun ve **About Zcash** bölümüne ilerleyin. Sözleşme adresi şöyle olmalıdır:

```
A7bdiYdS5GjqGFtxf17ppRHtDKPkkRqbKtR27dxvQXaS
```

![Phantom'daki “About Zcash” panelinde Solana ağındaki A7bd…QXaS sözleşme adresi gösteriliyor](/content-images/01-phantom-zec-mint-4a718bc213.webp)

Phantom adresi `A7bd…QXaS` şeklinde kısaltır; bu nedenle ilk ve son karakterleri karşılaştırın ya da adresin tamamını [Solscan](https://solscan.io/token/A7bdiYdS5GjqGFtxf17ppRHtDKPkkRqbKtR27dxvQXaS) üzerinde aratın. Cüzdanınızdaki adı veya logosu ne olursa olsun, başka herhangi bir “ZEC” tokenı bu token değildir. Onu olduğu gibi bırakın.

---

## Neden taşımalısınız

Korumalı ZEC, Zcash’ın temel amacıdır. ZEC korumalı bir havuzda durduğunda, her ödemenin göndereni, alıcısı ve tutarı Zcash Zinciri’nde şifrelenir. Bir blok gezginine bakan hiç kimse bakiyenizi göremez.

Zaten ZEC elinizde. Onu bir Zcash cüzdanına taşımak, onu Zcash yapan özelliği edinmenizi sağlar ve köprüyü denklemden çıkarır: Kendi cüzdanınızdaki yerel ZEC, herhangi birinin geri ödemeyi yerine getirmesine bağlı değildir.

[Zcash ödemenizi kimler görebilir?](/start-here/who-can-see-your-zcash-payment) nelerin gizli kaldığını tam olarak açıklar.

---

## Bir Zcash cüzdanı seçin

ZecHub sizin yerinize seçim yapmaz. [ZecHub cüzdan dizininden](/wallets) seçim yapın ve yüklemeden önce cüzdan kartındaki iki etiketi kontrol edin:

- **Ironwood: Ready.** [Ironwood yükseltmesinden](/zcash-tech/ironwood) bu yana, 28 Temmuz 2026’dan itibaren yeni korumalı ZEC’lerin girdiği havuz Ironwood’dır. Eski Orchard havuzu artık yeni fonları kabul etmez.
- **Automatic Shielding.** Bir ödeme şeffaf biçimde ulaştığında kullanışlıdır: Cüzdan, bu ZEC’i sizin için korumalı havuza taşır. Bu etiketi **Ironwood: Ready** etiketinin yerine geçen bir özellik olarak görmeyin. Bir cüzdanda Automatic Shielding bulunup Ironwood havuzu yine de olmayabilir (bugün dizinde Edge bu durumdadır). Diğer cüzdanların çoğunda bunun yerine **Shield** düğmesi bulunur.

Cüzdanı bir arama sonucundan veya reklamdan değil, dizindeki kartının bağlantısından yükleyin. Kurtarma ifadenizi kâğıda yazın ve çevrimdışı saklayın.

Cüzdanınız iki tür adres gösterir:

![Zcash cüzdanının “Receive” ekranında u1 ile başlayan korumalı ve t1 ile başlayan şeffaf adres gösteriliyor](/content-images/02-zodl-receive-c98cd378fb.webp)

| Şununla başlar | Tür | Herkese açık olarak görünenler |
|---|---|---|
| `u1` | Birleşik Adres | Ödeme korumalı bir havuza ulaştığı sürece sizinle ilgili hiçbir şey |
| `t1` | Şeffaf adres | Solana üzerinde olduğu gibi, adresiniz ve tutar sonsuza dek |

Cüzdanınızın korumalı olarak etiketlediği bir `u1` kullanın. Bir `u1`, alıcıların bir araya geldiği bir adrestir ve bazı cüzdanlar içine korumalı alıcının yanına şeffaf bir alıcı da koyar. Yalnızca şeffaf adreslere ödeme yapabilen bir gönderici bu adresi kullanır; siz bir `u1` yapıştırmış olsanız bile ödemeniz herkese açık biçimde ulaşır. Test cüzdanımızın korumalı adresinde şeffaf alıcı bulunmadığından bu mümkün değildi. [Korumalı havuzlar](/using-zcash/shielded-pools) alıcıları daha ayrıntılı ele alır. Bazı cüzdanlar Receive’i her açışınızda yeni bir `u1` gösterir; bu normaldir ve hepsi size aittir. Bu nedenle bu sayfadaki alım ekran görüntüsü ile near.com alıcı alanı farklı `u1` önekleri kullanır.

Testimizde ZODL kullandık; çünkü kurulumunu yaptığımız cüzdan oydu. Yalnızca dizinde **Ironwood: Ready** olarak işaretlenen cüzdanlar yeni korumalı değer alabilir.

---

## Taşıma

İşlem yolu iki bölümden oluşur: Phantom’dan NEAR Intents içine ZEC’inizi yatırın, ardından Zcash adresinize gönderin. İlk bölümde Solana kullanıcıları için NEAR tarafından geliştirilmiş bir site olan [solswap.org](https://solswap.org)’u; ikinci bölümde ise NEAR’ın kendi uygulaması olan [near.com](https://near.com)’u kullandık. ZecHub’ın [ZEC’i Phantom Wallet’ta](/using-zcash/solswap) takas etme kılavuzu, solswap ekranlarını daha ayrıntılı anlatır. Phantom’ın kendi **Swap** düğmesini kullanmayın: Token zaten elinizde ve onu takas etmek sizi hiçbir yere götürmez.

Phantom içinde Solana ücreti için biraz SOL bulundurun.

### 1. ZEC’inizi solswap.org’a yatırın

1. Phantom’ı açın, tarayıcı sekmesine gidin, `solswap.org`’ü kendiniz yazın ve cüzdanınızı bağlayın.
2. **Deposit**’e dokunun. **Asset**’i **Zcash**, **Network**’ü **Solana** olarak ayarlayın ve yöntem olarak **Wallet**’ı seçin.
3. Tutarı girin (veya **Max**’e dokunun) ve Phantom içinde işlemi onaylayın.

![solswap “Deposit” ekranında varlık olarak Zcash, ağ olarak Solana ve yöntem olarak “Wallet” gösteriliyor](/content-images/03-solswap-deposit-425691e62f.webp)

Yatırmamız Solana bloğuna 15:09:08’de (UTC+1) ulaştı ve solswap bunu 9 saniye sonra **Completed** olarak gösterdi.

![solswap para yatırma geçmişinde “Completed” durumu ve +0.0026 ZEC gösteriliyor](/content-images/04-solswap-deposit-complete-be5feaf758.webp)

ZEC artık NEAR Intents bakiyenizde duruyor. Phantom anahtarınız, buradan yapılacak her hareketi yetkilendirir; NEAR Intents çözücüleri teslimatı gerçekleştirir ve NEAR Intents uyumluluk incelemesi için bakiyeyi bekletebilir (aşağıdaki güven notlarına bakın).

### 2. near.com üzerinden Zcash adresinize gönderin

solswap’ta **Withdraw** sayfası da var, ancak bizde çalışmadı. Ağ olarak Zcash veya Solana seçmemiz fark etmeksizin **Received amount** ve **Fee** alanlarında “–” görünüyordu ve düğme hiçbir şey yapmıyordu.

![solswap “Withdraw” formunda alınan tutar ve ücret tireyle gösteriliyor](/content-images/05-solswap-withdraw-blank-92c6e64c65.webp)

Bu başınıza gelirse ZEC’iniz takılıp kalmış değildir. Bakiye web sitesine değil, cüzdanınızın anahtarına bağlıdır; bu nedenle bu cüzdanla oturum açtığınız herhangi bir NEAR Intents uygulaması ona erişebilir. İşlemi near.com’da tamamladık:

1. `near.com`’e gidin ve aynı Phantom cüzdanıyla oturum açın.
2. solswap bakiyeniz **Move legacy assets** altında görünür (near.com, eski NEAR Intents uygulamalarındaki bakiyelere “legacy” der). ZEC satırındaki **Withdraw** düğmesine dokunun. **Move**’a ihtiyacınız yok.

![near.com eski varlıkları taşıma sayfasında 0.0026 ZEC ile “Move” ve “Withdraw” düğmeleri listeleniyor](/content-images/06-nearcom-legacy-assets-7ee16c5ac4.webp)

3. **Network**’ü **Zcash** olarak ayarlayın, cüzdanınızın `u1` adresini **Recipient** alanına yapıştırın ve ilk ve son 6 karakteri cüzdanınızdakiyle karşılaştırın.

![near.com “Withdraw” eski varlık çekme formunda ağ olarak Zcash ve alıcı olarak u1 adresi yer alıyor; en az 0.00233164 ZEC alınır ve işlem yaklaşık 2 dakika sürer](/content-images/07-nearcom-withdraw-724ef22b38.webp)

4. **Review withdrawal**’a dokunun, özeti okuyun ve **Send**’e dokunun.

![near.com “Review send” ekranı: ağ Zcash, alıcıya en az 0.00233164 ZEC ulaşır, ücret 0 ZEC, ödenecek tutar 0.00266336 ZEC](/content-images/08-nearcom-review-b6053f675b.webp)

5. Phantom, near.com için **Sign Message** işlemi yapmanızı ister. Bu imza, NEAR Intents’ın bakiyenizi taşımasına yetki verir. SOL’a mal olmaz, ancak bu onu zararsız yapmaz: Taklit bir site aynı isteği gösterebilir ve bu imzayla NEAR Intents bakiyenizi boşaltabilir. **Confirm**’e dokunmadan önce aşağıdakilerin tümünü kontrol edin; herhangi biri yanlışsa **Cancel**’a dokunun:
   - İstekte belirtilen site `near.com` olmalıdır. (1. adımdaki yatırma işlemi, `solswap.org`’dan gelen sıradan bir Phantom işlem isteğiydi; oradaki adı da aynı şekilde kontrol edin.)
   - **Message**’ı açın ve `"verifying_contract": "intents.near"` ifadesini bulun.
   - Mesaj, ekran görüntüsündeki gibi okunabilir metin olmalıdır. Okunamayan bir metin yığınıysa veya site adres çubuğunuzdakiyle eşleşmiyorsa isteği reddedin.
   - Kurtarma ifadenizi asla istemez. İmzalama sırasında bu ifadeyi yazmanız gerekmez.

![Solana ağında near.com'dan gelen Phantom “Sign Message” isteği](/content-images/09-phantom-sign-message-cb1ce6d20f.webp)

6. near.com **Processing send**, **Sending** ve **Complete** durumlarını gösterir. **View on explorer**, transferin NEAR Intents kaydını açar.

![near.com durum ekranında “Sending 0.0023 ZEC” ifadesi ve üç tamamlanmış adım gösteriliyor](/content-images/10-nearcom-complete-c641093c46.webp)

![NEAR Intents gezgin kaydı: 3:59:28 PM'de oluşturulmuş, 4:07:55 PM'de u1 adresine çekilmiş; Zcash çekim işlem kimliği de gösteriliyor](/content-images/11-intents-explorer-f93f87814e.webp)

### Testimizin maliyeti ve süresi

| | Testimiz |
|---|---|
| Phantom’dan yatırılan ZEC | 0,00266336 ZEC |
| Zcash cüzdanında alınan ZEC | 0,00241336 ZEC, korumalı |
| ZEC tarafındaki maliyet | 0,00025 ZEC (near.com “Fee 0 ZEC” gösterdi; maliyet teklife dahildir) |
| Yatırma için harcanan SOL | 0,00156844 SOL; bunun 0,00008 SOL’u ağ ücretiydi |
| Minimum | Minimum tutara takılmadık. solswap 0,00000001 ZEC minimum yatırma tutarı listeledi ve near.com 0,0026 ZEC kabul etti |
| Yatırma, Phantom’dan solswap’a | 9 saniye |
| Çekme, near.com’da imzalamadan Zcash cüzdanında ZEC görünene kadar | Yaklaşık 8 dakika (near.com yaklaşık 2 dakika tahmin etti) |

Kayıtlar: Solana yatırma [5ijsgRrh…AjLkx](https://solscan.io/tx/5ijsgRrhViNTtFMmnsfJDSo3HhRmt3Ri7WB513oBoQLxfGNswDxvHnakwW1yyqXznTTCSxnUkooAHDKowz9AjLkx), NEAR Intents [79c23cfd…a405a9](https://explorer.near-intents.org/transactions/79c23cfd43928de5522c182e26f8f052dc9c43d53430ca497b40e016a6a405a9), blok 3.498.141’de Zcash [28d6da27…481034](https://mainnet.zcashexplorer.app/transactions/28d6da27d74dc91e45175a7aff6023bc85578603dd77f1b49782a28f8f481034). Ücretler ve süreler ağ yüküne göre değişir; işlemi yaparken son sözü inceleme ekranı söyler.

NEAR’ın köprüsü, standart Zcash çekimleri için 0,01 ZEC minimum tutar ve 0,00047 ZEC ücret yayımlar. near.com, 0,0026 ZEC tutarındaki işlemimize ikisini de uygulamadı. Bir uygulama küçük bir tutarı kabul etmezse yükleme yapmadan önce near.com’u deneyin.

### Diğer yollar ve her birinin güvendiği şeyler

Solana’dan çıkış sağlayan her yol OmniBridge’a güvenir; çünkü köprü, tokenınızı destekleyen ZEC’ı tutar. Buna ek olarak:

- **Yukarıdaki yol** NEAR Intents’a güvenir. İmzanız transferi yetkilendirir, aktarıcılar Zcash tarafındaki ZEC’i teslim eder ve NEAR Intents uyumluluk incelemesi için fonları bekletebilir; 2026’da bir Zcash sahibi, haftalarca bekletilen büyük bir takas işlemini [bildirdi](https://www.cryptotimes.io/2026/09/11/zcash-holder-says-589k-usdt-stuck-on-near-intents-50-days-after-zodl-swap/). Ayrıca cüzdanınızı iki web sitesine bağlarsınız; bu yüzden her seferinde adres çubuğunu kontrol edin.
- **NEAR Intents yerleşik cüzdanlar** ([dizinindeki](/wallets) NEAR Intents özelliğini arayın), aynı sistemi Zcash cüzdanının içinden kullanır. Aynı güven, daha az web sitesi. Solana üzerinde ZEC ile bunu test etmedik.
- **Bir borsa**, yalnızca bu tokenın Solana ağındaki yatırımlarını kabul ediyorsa — çoğu kabul etmez. Saklama kontrolünü ve genellikle kimliğinizi devredersiniz; ayrıca birçok borsa `t1` adreslerine yalnızca ZEC gönderir. Bkz. [gözetimli borsalar](/using-zcash/custodial-exchanges).

---

## Korumalı hâle getirin ve kontrol edin

Varlık korumalı biçimde ulaştı. ZEC’imiz bir `u1` adresine gönderildi ve doğrudan Ironwood korumalı havuzuna girdi. Şeffaf bir aşama olmadı ve elle korumalı hâle getirilecek bir şey yoktu. Onaylar toplanırken cüzdan, 16:07’de (UTC+1) kalkan simgesiyle birlikte **Receiving…** durumunu gösterdi.

![Korumalı simgeyle 0.00241336 ZEC alındığını gösteren Zcash cüzdanı etkinliği](/content-images/12-zodl-receiving-cb9f41511d.webp)

Kendiniz kontrol etmek için cüzdanınızda işlemi açın ve işlem kimliğini kopyalayın.

![İşlem kimliğini ve zaman damgasını gösteren Zcash cüzdanı işlem ayrıntıları](/content-images/13-zodl-tx-details-b08434d680.webp)

Kimliği [Zcash blok gezginine](https://mainnet.zcashexplorer.app) yapıştırın. Özete aldanmayın. Bizim işlemimizde özet **Shielded Inputs / Outputs 0 / 0** ve **Transferred from/to shielded pool 0.0 ZEC** gösteriyor; çünkü gezgin henüz Ironwood’leri hesaba katmıyor. Gördüğünüz `t1` adresleri gönderen tarafa aittir (harcanan ZEC ve kalan para üstü); sizin adresiniz değildir.

![İşlem için gezgin özeti: iki şeffaf girdi, bir şeffaf çıktı, 0/0 korumalı](/content-images/14-explorer-summary-6153afb265.webp)

**Raw TX: JSON**’a tıklayın ve `ironwood` için arama yapın. Buradaki negatif `valueBalance`, Ironwood havuzuna giren ZEC anlamına gelir. Bizim işlemimizde `-0.00241336` vardı; gelen tutar tam olarak buydu ve işlemde alıcının kim olduğu gösterilmiyor.

![Ironwood bölümü vurgulanmış ham işlem JSON'u: valueBalance -0.00241336 (vurgu sonradan eklendi)](/content-images/15-explorer-raw-ironwood-8ff8ae0892.webp)

[Bir blok gezgini neleri görebilir](/zcash-tech/what-a-block-explorer-can-see) diğer alanları açıklar.

### `t1` adresi yapıştırırsanız

Biz böyle bir adrese göndermedik, ancak sonuç bellidir. ZEC cüzdanınızın şeffaf bakiyesine ulaşır ve gezgin, `t1` adresinizi ve tutarı herkese kalıcı olarak gösterir. Otomatik korumalı hâle getirme özelliği olan bir cüzdan, ardından bunu korumalı havuza taşır; yoksa küçük bir ağ ücretine mal olan **Shield** düğmesine dokunun. Korumalı hâle getirme işlemi de herkese açıktır; çünkü `t1` adresinizden harcama yapar. Hiçbir şey kaybolmaz, ancak bu yatırma ile cüzdanınız arasındaki bağlantı Zincir üzerinde kalır. `u1`’i yapıştırın.

---

## Güvende kalın

Yeni sahipler hedef alınır. Karşılaşacağınız dolandırıcılıkların neredeyse tamamı şu türlerden biridir:

- **Yanlış adres türü.** Bir Zcash adresi `u1`, `t1`, `zs` veya `tex1` ile başlar. Bir Solana adresinin bu öneklerden hiçbiri yoktur. Yerel ZEC’i asla Solana adresine, Solana tokenını da asla Zcash adresine göndermeyin.
- **Yalnızca şeffaf adresleri destekleyen hizmetler.** Bazı köprüler, takas siteleri ve borsalar yalnızca `t1` adreslerine gönderim yapabilir. ZEC ulaşır ulaşmaz korumalı hâle getirirseniz bu kullanılabilir bir yöntemdir. Orada bırakmayın yeter.
- **Sahte cüzdanlar.** Yalnızca [cüzdan dizini](/wallets) kartındaki bağlantıdan veya bu bağlantının yönlendirdiği resmî uygulama mağazası sayfasından yükleyin. Sahte kripto cüzdanı uygulamaları uygulama mağazalarına sızabiliyor ve gerçekleriyle tamamen aynı görünüyor.
- **Kurtarma ifadesi avı.** Hiçbir cüzdan, köprü, takas sitesi, destek temsilcisi, moderatör veya airdrop kurtarma ifadenize ihtiyaç duymaz. Mesaj imzalama sırasında bu ifadeyi yazmanız asla gerekmez. İsteyen herkes sizden çalmaya çalışıyordur. [Fonları kurtarma](/using-zcash/recovering-funds), bu dolandırıcılığın “cüzdanınızı kurtaracağız” biçimini açıklar.
- **Dolandırıcılık tokenları ve “claim” siteleri.** Solana cüzdanlarında ZEC, Zcash veya benzer isimli tokenlar, isteğiniz olmadan belirir ve çoğu zaman daha fazlasını “claim” etmenizi sağlayan bir bağlantı içerir. Cüzdanınızı bu bağlantıya bağlamak, bakiyenizin boşaltılmasına yol açabilir. Bu sayfanın üst kısmındaki sözleşme adresini kontrol edin ve diğer her şeyi yok sayın.
- **Kötü amaçlı imza istekleri.** Bir “Sign Message” isteği, SOL ücreti olmadan NEAR Intents bakiyenizi taşıyabilir. Yalnızca `near.com` veya `solswap.org` üzerinde ve yalnızca mesajda `intents.near` adı geçtiğinde imzalayın (yukarıdaki 5. adımda neyi kontrol etmeniz gerektiği gösteriliyor).
- **Taklit siteler.** `solswap.org` ve `near.com` adreslerini kendiniz yazın veya yer işaretlerinizi kullanın. Doğrudan mesajlardaki, yanıtlardaki veya reklamlardaki bağlantıları izlemeyin.

---

## Sık Yapılan Hatalar

- Yatırma akışı yerine **Phantom’ın Swap düğmesini kullanmak**. Token zaten elinizde — takas etmek yalnızca bir kâğıt ZEC’i başka bir tokenla değiştirir ve sizi yerel ZEC’e yaklaştırmaz.
- Cüzdanınızda yalnızca korumalı bir `u1` varken **`t1` adresi veya şeffaf alıcıyı gizleyen bir `u1` yapıştırmak**. Yatırma herkese açık şekilde ulaşır ve cüzdanınızla kalıcı olarak bağlantı kurar.
- solswap’ın Withdraw sayfasında “–” gösterdiğini görünce **fonların takılı kaldığını varsaymak**. Bakiye web sitesini değil, Phantom anahtarınızı takip eder — çekme işlemini near.com’da tamamlayın.
- **Bir mesajı kontrol etmeden imzalamak.** Taklit bir site tek imzayla NEAR Intents bakiyenizi boşaltabilir. Site `near.com` olmalı ve mesajda `"verifying_contract": "intents.near"` bulunmalıdır.
- İki “ZEC” sembolünü karıştırmak. Solana tokenı ile yerel Zcash ZEC aynı adı taşır, ancak ağları farklıdır — bunlardan birini diğer Zincir’e göndermek varlığı kaybettirir.

## Korumalı ZEC ile ne yapabilirsiniz

- Harcarken gizliliğini koruyun: [ZEC’i gizlilik içinde kullanma](/guides/using-zec-privately)
- Kabul eden yerleri bulun: [ZEC harcayabileceğiniz yerler](/using-zcash/spend-zcash/top-10-places-to-spend-zec)
- Ekinde özel mesajla gönderin: [Memolar](/using-zcash/memos)
- Kimliğinizi ilişkilendirmeden birine ödeme yapın: [Kimliği ilişkilendirmeden para gönderme](/zcash-use-cases/send-money-without-linking-identity)

---

## İlgili Sayfalar

- [Phantom Wallet’ta ZEC için nasıl takas yapılır](/using-zcash/solswap) — solswap ekranlarını daha ayrıntılı anlatır
- [Korumalı havuzlar](/using-zcash/shielded-pools) — Ironwood/Orchard havuzlarının ne olduğunu ve alıcıların nasıl çalıştığını açıklar
- [Zcash ödemenizi kimler görebilir?](/start-here/who-can-see-your-zcash-payment) — korumalı hâle getirmenin gerçekte neleri gizlediğini açıklar
- [Cüzdanlar](/wallets) — dizin; **Ironwood: Ready** etiketini kontrol edin
- [Gözetimli borsalar](/using-zcash/custodial-exchanges) — bu yolun önlediği ödünleşim
- [Fonları kurtarma](/using-zcash/recovering-funds) — erişiminizi asla kaybetmemek için neleri güvende tutmanız gerektiği
