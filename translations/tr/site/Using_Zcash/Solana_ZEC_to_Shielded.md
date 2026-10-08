<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Solana_ZEC_to_Shielded.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Sayfayı Düzenle"/>
</a>

# Solana'da ZEC mı var? Onu korumalı Zcash'e taşıyın

Bu sayfa, ZCAT tuttuğunuz veya sahiplerine ZEC ödeyen başka bir Solana tokeni bulundurduğunuz için Solana cüzdanınızda ZEC belirdiyse sizin içindir. Bunu yapmak için hiçbir şey satmanız gerekmez. Halihazırda sahip olduğunuz ZEC'i Solana'dan bir Zcash cüzdanına taşıyacak ve korumalı hâlde elde edeceksiniz.

Aşağıdaki her adımı 27 Eylül 2026'da, Phantom içinde 0.00266336 ZEC ile başlayan gerçek bir transferle uyguladık. Bu sayfadaki ücretler, süreler ve ekranlar gördüklerimizdir.

---

## Aslında ne tutuyorsunuz?

Solana cüzdanınızdaki ZEC, Zcash ağındaki coinler değil, Solana üzerindeki bir tokendir. NEAR OmniBridge onu çıkarır ve karşılığını sağlamak için Zcash zincirinde gerçek ZEC tutar; köprü Ekim 2025'ten beri Solana'da aktiftir. Solana ayağı, Zcash hafif istemcisi yerine Wormhole mesajları ve NEAR Chain Signatures üzerinde çalışır; dolayısıyla Solana tarafı yalnızca bu iki sistem kadar sağlamdır. İnsanlar buna "kâğıt ZEC" der. ZEC fiyatını takip eder, ancak her bakiye ve her transfer Solana'nın herkese açık defterinde cüzdan adresiniz altında yer alır ve orada kaldığı sürece korunamaz.

Sahip olduğunuzun gerçek token olduğunu kontrol edin. Phantom içinde **ZEC** öğesine dokunun ve **Zcash Hakkında** bölümüne kaydırın. Sözleşme adresi şu olmalıdır:

```
A7bdiYdS5GjqGFtxf17ppRHtDKPkkRqbKtR27dxvQXaS
```

![Phantom's About Zcash panel showing the contract address A7bd…QXaS on the Solana network](/content-images/01-phantom-zec-mint-4a718bc213.webp)

Phantom bunu `A7bd…QXaS` olarak kısaltır; bu nedenle ilk ve son karakterleri karşılaştırın veya tam adresi [Solscan](https://solscan.io/token/A7bdiYdS5GjqGFtxf17ppRHtDKPkkRqbKtR27dxvQXaS) üzerinde arayın. Cüzdanınızdaki, adı veya logosu ne olursa olsun, başka herhangi bir "ZEC" tokeni bu token değildir. Ona dokunmayın.

---

## Neden taşımalısınız?

Korumalı ZEC, Zcash'in asıl amacıdır. ZEC'iniz korumalı bir havuzda bulunduğunda, her ödemenin göndereni, alıcısı ve tutarı Zcash zincirinde şifrelenir. Bir gezginde arama yapan hiç kimse bakiyenizi göremez.

Zaten ZEC tutuyorsunuz. Onu bir Zcash cüzdanına taşımak, onu Zcash yapan kısmı size kazandırır ve köprüyü aradan çıkarır: kendi cüzdanınızdaki yerel ZEC, hiç kimsenin geri ödemeye uymasına bağlı değildir.

[Zcash ödemenizi kimler görebilir?](/start-here/who-can-see-your-zcash-payment) neyin gizli kaldığını tam olarak açıklar.

---

## Bir Zcash cüzdanı seçin

ZecHub sizin yerinize bir tane seçmez. [ZecHub cüzdan dizininden](/wallets) seçim yapın ve yüklemeden önce cüzdanın kartındaki iki etiketi kontrol edin:

- **Ironwood: Hazır.** Ironwood, 28 Temmuz 2026'daki [Ironwood yükseltmesinden](/zcash-tech/ironwood) bu yana yeni korumalı ZEC'in gittiği havuzdur. Eski Orchard havuzu artık yeni fon kabul etmiyor.
- **Otomatik Koruma.** Bir ödeme şeffaf olarak gelirse kullanışlıdır: cüzdan o ZEC'i sizin için korumalı havuza taşır. Bu etiketi **Ironwood: Hazır** yerine geçer diye düşünmeyin. Bir cüzdanda Otomatik Koruma olabilir ancak yine de Ironwood havuzu bulunmayabilir (Edge bugün dizinde bu durumdadır). Diğer çoğu cüzdanda bunun yerine bir **Koru** düğmesi gösterilir.

Cüzdanı arama sonucundan veya reklamdan değil, dizin kartındaki bağlantıdan yükleyin. Kurtarma ifadesini kâğıda yazın ve çevrimdışı saklayın.

Cüzdanınız iki tür adres gösterir:

![A Zcash wallet's Receive screen with a shielded address starting u1 and a transparent address starting t1](/content-images/02-zodl-receive-c98cd378fb.webp)

| Şununla başlar | Tür | Herkesin gördüğü |
|---|---|---|
| `u1` | Unified Address | Hakkınızda hiçbir şey, ancak yalnızca ödeme korumalı bir havuza ulaşırsa |
| `t1` | Şeffaf adres | Solana'daki gibi, adresiniz ve tutar sonsuza dek |

Cüzdanınızın korumalı olarak etiketlediği bir `u1` kullanın. `u1`, alıcıların bir paketidir ve bazı cüzdanlar korumalı alıcının yanına şeffaf bir alıcı da koyar. Yalnızca şeffaf adreslere ödeme yapabilen bir gönderen onu kullanır ve siz `u1` yapıştırmış olsanız bile ödemeniz herkese açık olarak ulaşır. Test cüzdanımızın korumalı adresinde şeffaf alıcı yoktu; dolayısıyla bu gerçekleşemezdi. [Korumalı havuzlar](/using-zcash/shielded-pools), alıcıları daha ayrıntılı açıklar. Bazı cüzdanlar Al'ı her açtığınızda yeni bir `u1` gösterir; bu normaldir ve hepsi size aittir. Bu sayfadaki alma ekran görüntüsü ve near.com alıcı alanı bu nedenle farklı `u1` önekleri kullanır.

Testimiz için, önceden kurmuş olduğumuz cüzdan olduğu için ZODL kullandık. Yalnızca dizinin **Ironwood: Hazır** olarak işaretlediği cüzdanlar yeni korumalı değer alabilir.

---

## Taşıyın

Rota iki bölümden oluşur: Phantom üzerinden ZEC'inizi NEAR Intents içine koyun, ardından Zcash adresinize gönderin. İlk bölüm için Solana kullanıcılarına yönelik NEAR yapımı bir site olan [solswap.org](https://solswap.org)'u, ikinci bölüm için ise NEAR'ın kendi uygulaması olan [near.com](https://near.com)'u kullandık. ZecHub'in [Phantom Wallet'ta ZEC ile nasıl takas yapılır](/using-zcash/solswap) rehberi, solswap ekranlarını daha ayrıntılı ele alır. Bunun için Phantom'in kendi **Swap** düğmesini kullanmayın: token zaten sizde ve onu takas etmek sizi hiçbir yere götürmez.

Solana ücreti için Phantom içinde biraz SOL bulundurun.

### 1. ZEC'inizi solswap.org'a yatırın

1. Phantom'i açın, tarayıcı sekmesine gidin, `solswap.org` adresini kendiniz yazın ve cüzdanınızı bağlayın.
2. **Deposit** öğesine dokunun. **Asset** için **Zcash**, **Network** için **Solana** ve yöntem için **Wallet** seçin.
3. Tutarı girin (veya **Max** öğesine dokunun) ve işlemi Phantom içinde onaylayın.

![solswap Deposit screen with Zcash as the asset, Solana as the network and Wallet as the method](/content-images/03-solswap-deposit-425691e62f.webp)

Yatırma işlemimiz 15:09:08'de (UTC+1) Solana bloğuna ulaştı ve solswap dokuz saniye sonra bunu **Completed** olarak gösterdi.

![solswap deposit history showing Completed, +0.0026 ZEC](/content-images/04-solswap-deposit-complete-be5feaf758.webp)

ZEC'iniz artık NEAR Intents bakiyenizde duruyor. Phantom anahtarınız bundan yapılan her çıkışı yetkilendirir, NEAR Intents çözücüleri teslimatı gerçekleştirir ve NEAR Intents uyumluluk incelemesi için bakiye tutabilir (aşağıdaki güven notlarına bakın).

### 2. near.com'da Zcash adresinize gönderin

solswap'ta bir **Withdraw** sayfası da var, ancak bizim için çalışmadı. **Received amount** ve **Fee** "–" olarak kaldı ve Zcash veya Solana'yı ağ olarak seçmemiz fark etmeksizin düğme hiçbir şey yapmadı.

![solswap Withdraw form with the received amount and fee stuck at a dash](/content-images/05-solswap-withdraw-blank-92c6e64c65.webp)

Bu sizin de başınıza gelirse ZEC'iniz sıkışmış değildir. Bakiye web sitesine değil, cüzdanınızın anahtarına bağlıdır; dolayısıyla o cüzdanla oturum açtığınız herhangi bir NEAR Intents uygulaması ona erişebilir. İşlemi near.com'da tamamladık:

1. `near.com` adresine gidin ve aynı Phantom cüzdanıyla oturum açın.
2. solswap bakiyeniz **Move legacy assets** altında görünür (near.com, eski NEAR Intents uygulamalarındaki bakiyeleri "legacy" olarak adlandırır). ZEC satırında **Withdraw** öğesine dokunun. **Move** seçeneğine ihtiyacınız yoktur.

![near.com Move legacy assets page listing 0.0026 ZEC with Move and Withdraw buttons](/content-images/06-nearcom-legacy-assets-7ee16c5ac4.webp)

3. **Network** için **Zcash** seçin, cüzdanınızın `u1` adresini **Recipient** olarak yapıştırın ve ilk ve son altı karakteri cüzdanınızdakiyle karşılaştırın.

![near.com Withdraw legacy asset form with Zcash as the network and a u1 recipient, receive at least 0.00233164 ZEC, about 2 minutes](/content-images/07-nearcom-withdraw-724ef22b38.webp)

4. **Review withdrawal** öğesine dokunun, özeti okuyun ve **Send** öğesine dokunun.

![near.com Review send screen: network Zcash, recipient receives at least 0.00233164 ZEC, fee 0 ZEC, you pay 0.00266336 ZEC](/content-images/08-nearcom-review-b6053f675b.webp)

5. Phantom, near.com için sizden **Sign Message** ister. Bu imza, NEAR Intents'in bakiyenizi taşımasını yetkilendirir. SOL maliyeti yoktur, ancak bu onu zararsız kılmaz: taklit bir site aynı isteği gösterip NEAR Intents bakiyenizi bununla boşaltabilir. **Confirm** öğesine dokunmadan önce bunların hepsini kontrol edin; herhangi biri başarısız olursa **Cancel** öğesine dokunun:
   - İstekte adı geçen site `near.com`'dir. (1. adımdaki yatırma, `solswap.org` kaynaklı sıradan bir Phantom işlem isteğiydi; orada da adı aynı şekilde kontrol edin.)
   - **Message** bölümünü açın ve `"verifying_contract": "intents.near"` ifadesini bulun.
   - Mesaj, ekran görüntüsündeki gibi okunabilir metin olmalıdır. Okunamayan bir veri yığınıysa veya site adres çubuğunuzdaki siteyle eşleşmiyorsa reddedin.
   - Sizden asla kurtarma ifadenizi istemez. İmzalama, onu yazmayı asla içermez.

![Phantom Sign Message request from near.com on the Solana network](/content-images/09-phantom-sign-message-cb1ce6d20f.webp)

6. near.com sırasıyla **Processing send**, **Sending** ve **Complete** gösterir. **View on explorer**, transferin NEAR Intents kaydını açar.

![near.com status screen: Sending 0.0023 ZEC, all three steps complete](/content-images/10-nearcom-complete-c641093c46.webp)

![NEAR Intents explorer record: created 3:59:28 PM, withdrawn to the u1 address 4:07:55 PM, with the Zcash withdraw transaction ID](/content-images/11-intents-explorer-f93f87814e.webp)

### Testimizin maliyeti ve süresi

| | Testimiz |
|---|---|
| Phantom'den yatırılan ZEC | 0.00266336 ZEC |
| Zcash cüzdanında alınan ZEC | 0.00241336 ZEC, korumalı |
| ZEC tarafındaki maliyet | 0.00025 ZEC (near.com "Fee 0 ZEC" gösterdi; maliyet teklife dahil edilmiştir) |
| Yatırma için harcanan SOL | 0.00156844 SOL; bunun 0.00008 SOL'si ağ ücretiydi |
| Minimum | Yok. solswap minimum 0.00000001 ZEC yatırma tutarı listeledi ve near.com 0.0026 ZEC kabul etti |
| Yatırma, Phantom'den solswap'a | 9 saniye |
| Çekme, near.com'da imzalamadan Zcash cüzdanındaki ZEC'e | Yaklaşık 8 dakika (near.com yaklaşık 2 dakika tahmin etti) |

Kayıtlar: Solana yatırması [5ijsgRrh…AjLkx](https://solscan.io/tx/5ijsgRrhViNTtFMmnsfJDSo3HhRmt3Ri7WB513oBoQLxfGNswDxvHnakwW1yyqXznTTCSxnUkooAHDKowz9AjLkx), NEAR Intents [79c23cfd…a405a9](https://explorer.near-intents.org/transactions/79c23cfd43928de5522c182e26f8f052dc9c43d53430ca497b40e016a6a405a9), blok 3,498,141 içindeki Zcash [28d6da27…481034](https://mainnet.zcashexplorer.app/transactions/28d6da27d74dc91e45175a7aff6023bc85578603dd77f1b49782a28f8f481034). Ücretler ve süreler ağ yüküne göre değişir; bu nedenle işlemi yaptığınızda son söz inceleme ekranındadır.

NEAR'ın köprüsü, standart Zcash çekimleri için 0.01 ZEC minimum ve 0.00047 ZEC ücret yayımlar. near.com bunların hiçbirini 0.0026 ZEC tutarındaki testimize uygulamadı. Bir uygulama küçük bir tutarı reddederse bakiye eklemeden önce near.com'u deneyin.

### Diğer rotalar ve her birinin güvendiği şeyler

Solana'dan çıkan her rota OmniBridge'e güvenir; çünkü köprü, tokeninizin karşılığını oluşturan ZEC'i tutar. Buna ek olarak:

- **Yukarıdaki rota** NEAR Intents'e güvenir. İmzanız transferi yetkilendirir, çözücüler Zcash tarafındaki ZEC'i teslim eder ve NEAR Intents uyumluluk incelemesi için fonları tutabilir; 2026'da bir Zcash sahibi, haftalarca bekletilen büyük bir takası [bildirdi](https://www.cryptotimes.io/2026/09/11/zcash-holder-says-589k-usdt-stuck-on-near-intents-50-days-after-zodl-swap/). Ayrıca cüzdanınızı iki web sitesine bağlıyorsunuz; bu yüzden her seferinde adres çubuğunu kontrol edin.
- **Yerleşik NEAR Intents bulunan cüzdanlar** ([dizininde](/wallets) NEAR Intents özelliğini arayın) aynı sistemi Zcash cüzdanının içinden kullanır. Aynı güven varsayımı, daha az web sitesi. Bunu Solana'daki ZEC ile test etmedik.
- **Bir borsa**, yalnızca Solana ağında bu tokenin yatırılmasını kabul ediyorsa; çoğu kabul etmez. Velayeti ve genellikle kimliğinizi devredersiniz; ayrıca birçok borsa `t1` adreslerine yalnızca ZEC gönderir. [saklama hizmeti veren borsalara](/using-zcash/custodial-exchanges) bakın.

---

## Koruyun ve kontrol edin

Korumalı olarak ulaştı. ZEC'imiz bir `u1` adresine gitti ve doğrudan Ironwood korumalı havuzuna ulaştı. Şeffaf bir adım yoktu ve elle korunacak hiçbir şey bulunmuyordu. Cüzdan, onayları toplarken 16:07'de (UTC+1) onu koruma simgesiyle **Receiving…** olarak listeledi.

![Zcash wallet activity showing Receiving 0.00241336 ZEC with a shield icon](/content-images/12-zodl-receiving-cb9f41511d.webp)

Kendiniz kontrol etmek için cüzdanınızdaki işlemi açın ve işlem kimliğini kopyalayın.

![Zcash wallet transaction details with the transaction ID and timestamp](/content-images/13-zodl-tx-details-b08434d680.webp)

Onu [Zcash blok gezginine](https://mainnet.zcashexplorer.app) yapıştırın. Özete takılmayın. Bizimki **Shielded Inputs / Outputs 0 / 0** ve **Transferred from/to shielded pool 0.0 ZEC** yazıyor; çünkü gezginin özeti henüz Ironwood'i saymıyor. Gördüğünüz `t1` adresleri sizin değil, gönderen tarafındadır (harcadığı ZEC ve elinde tuttuğu para üstü).

![Explorer summary for the transaction: two transparent inputs, one transparent output, 0/0 shielded](/content-images/14-explorer-summary-6153afb265.webp)

**Raw TX: JSON** seçeneğine tıklayın ve `ironwood` arayın. Oradaki negatif bir `valueBalance`, ZEC'in Ironwood havuzuna girdiğini gösterir. Bizimki, tam olarak ulaşan tutar olan `-0.00241336` idi ve işlemde bunu kimin aldığına dair hiçbir şey gösterilmiyordu.

![Raw transaction JSON with the ironwood section highlighted: valueBalance -0.00241336 (highlight added)](/content-images/15-explorer-raw-ironwood-8ff8ae0892.webp)

[Bir blok gezgini neleri görebilir?](/zcash-tech/what-a-block-explorer-can-see), alanların geri kalanını açıklar.

### Bir `t1` adresi yapıştırırsanız

Böyle bir adrese gönderim yapmadık, ancak sonuç öngörülebilir. ZEC, cüzdanınızın şeffaf bakiyesine ulaşır ve gezgin, `t1` adresinizi ve tutarı herkese kalıcı olarak gösterir. Otomatik korumaya sahip bir cüzdan bunu daha sonra korumalı havuza taşır; aksi hâlde küçük bir ağ ücreti karşılığında **Shield** öğesine dokunun. Koruma işlemi de herkese açıktır; çünkü `t1` adresinizden harcama yapar. Hiçbir şey kaybolmaz, ancak bu yatırma ile cüzdanınız arasındaki bağlantı zincirde kalır. `u1` adresini yapıştırın.

---

## Güvende kalın

Yeni sahipler hedef alınır. Göreceğiniz neredeyse her dolandırıcılık şunlardan biridir:

- **Yanlış adres türü.** Bir Zcash adresi `u1`, `t1`, `zs` veya `tex1` ile başlar. Solana adresinin bu öneklerin hiçbiri yoktur. Yerel ZEC'i asla Solana adresine, Solana tokenini de asla Zcash adresine göndermeyin.
- **Yalnızca şeffaf hizmetler.** Bazı köprüler, takas siteleri ve borsalar yalnızca `t1` adreslerine gönderebilir. Gelen ZEC'i gelir gelmez korursanız bu uygulanabilir. Yalnızca orada bırakmayın.
- **Sahte cüzdanlar.** Yalnızca [cüzdan dizini](/wallets) kartındaki bağlantıdan veya onun yönlendirdiği resmî uygulama mağazası listesinden yükleyin. Sahte kripto cüzdan uygulamaları uygulama mağazalarına sızabiliyor ve gerçeğiyle tamamen aynı görünüyor.
- **Kurtarma ifadesi oltalaması.** Hiçbir cüzdan, köprü, takas sitesi, destek görevlisi, moderatör veya airdrop kurtarma ifadenize ihtiyaç duymaz. Bir mesajı imzalamak, onu yazmayı asla içermez. Bunu isteyen herkes sizden çalmaya çalışıyordur. [Fonları geri alma](/using-zcash/recovering-funds), bu dolandırıcılığın "cüzdanınızı geri alacağız" sürümünü kapsar.
- **Dolandırıcılık tokenleri ve "claim" siteleri.** Solana cüzdanlarında istenmeden ZEC, Zcash veya benzer adlı tokenler görünür; çoğu zaman daha fazlasını "claim" etmek için bir bağlantıyla birlikte gelir. Cüzdanınızı bu bağlantıya bağlamak onu boşaltabilir. Bu sayfanın başındaki sözleşme adresini kontrol edin ve diğer her şeyi görmezden gelin.
- **Kötü amaçlı imza istekleri.** Bir "Sign Message" isteği, herhangi bir SOL ücreti olmadan NEAR Intents bakiyenizi taşıyabilir. Yalnızca `near.com` veya `solswap.org` üzerinde ve yalnızca mesajda `intents.near` adı geçtiğinde imzalayın (yukarıdaki 5. adım neyi kontrol edeceğinizi gösterir).
- **Taklit siteler.** `solswap.org` ve `near.com` adreslerini kendiniz yazın veya yer imlerini kullanın. Doğrudan mesajlar, yanıtlar veya reklamlardaki bağlantıları takip etmeyin.

---

## Korumalı ZEC ile ne yapabilirsiniz?

- Harcadığınızda gizli tutun: [ZEC'i gizli kullanma](/guides/using-zec-privately)
- Kabul eden yerleri bulun: [ZEC harcanabilecek yerler](/using-zcash/spend-zcash/top-10-places-to-spend-zec)
- Ekli özel bir mesajla gönderin: [Notlar](/using-zcash/memos)
- Kimliğinizi bağlamadan birine ödeme yapın: [Kimliği bağlamadan para gönderme](/zcash-use-cases/send-money-without-linking-identity)
