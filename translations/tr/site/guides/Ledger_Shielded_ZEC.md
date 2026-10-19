# Ledger Korumalı ZEC Kullanıcı Kılavuzu

23 Eylül 2026'da Ledger, Ledger Wallet Desktop'a yerel korumalı ZEC desteği ekledi. Artık tek bir Zcash hesabı, şeffaf bakiye ile Zcash'in Ironwood havuzundaki özel bakiyeyi bir arada tutuyor. Özel anahtarlarınız Ledger'inizde kalır ve her işlem cihaz üzerinde incelenip imzalanır.

**Yalnızca masaüstü.** Ledger'in duyurusunda korumalı ZEC'in "yalnızca Ledger Wallet Desktop'ta kullanılabildiği belirtiliyor. Mobil destek şu anda mevcut değil, ancak yakında gelecek." Masaüstü uygulaması da aynı bildirimi gösteriyor. 15 Ekim 2026'da kontrol edildi.

## Hazırlık

- Zcash uygulamasını çalıştıran bir Ledger cihazı: Nano S Plus, Nano X, Stax veya Flex. Güncel Zcash uygulaması, orijinal Nano S için geliştirilmemiştir.
- Yalnızca [ledger.com](https://www.ledger.com) adresinden indirilen Ledger Wallet Desktop 4.21 veya üzeri. Bu kılavuzda 4.24.0 sürümü kullanılmıştır.
- Ledger cihazınızdaki en güncel Zcash uygulaması (bu kılavuz yazıldığında 3.9.4).
- Test için az miktarda ZEC. Aşağıdaki her adım mainnet üzerinde 0.001 ZEC ile gerçekleştirildi. Her işlem küçük bir ağ ücreti gerektirir (testimizde 0.00015 ZEC).
- 24 kelimelik kurtarma ifadeniz kâğıtta kalmalıdır. Bunu asla bir bilgisayara yazmayın veya paylaşmayın.

## Adım Adım Kılavuz (Ledger Wallet Desktop)

**1. Zcash uygulamasını yükleyin veya güncelleyin**
- Ledger Wallet'ı açın, Ledger cihazınızı bağlayıp kilidini açın ve **My Ledger** bölümünü açın. Cihazda bağlantıya izin verin.
- Uygulama kataloğunda **Zcash** araması yapın, ardından **Install** seçeneğine veya zaten yüklüyse **Update** seçeneğine tıklayın.
- Ledger cihazınızda Zcash uygulamasını açın. Ekranda "Zcash app is ready" yazar. Sürümü kontrol etmek için sağa kaydırarak **App info** bölümüne gidin.

**2. Bir Zcash hesabı ekleyin**
- Ledger Wallet'ta **Add account** seçeneğini seçin. **Select asset** bölümünde Zcash araması yapın ve sarılmış bir token olan Binance-Peg Zcash Token yerine **Zcash (ZEC)** seçeneğini seçin.
- Ledger cihazınızda Zcash uygulaması açıkken, Ledger Wallet hesabınızı bulur. **Select the accounts you want to add** altında kutucuğu işaretleyin ve **Confirm** seçeneğine tıklayın.
- Hesap sayfasında **Available balance**, **Transparent balance** ve **Private balance** ile birlikte bir **Enable shielded** düğmesi gösterilir.

![Zcash account in Ledger Wallet Desktop showing the desktop-only notice, transparent and private balances, and the Enable shielded button](https://raw.githubusercontent.com/ZecHub/zechub/main/site/guides/assets/ledger-zec-01-account-desktop-only.png)

**3. Özel bakiyeyi etkinleştirin**
- **Enable shielded** seçeneğine tıklayın. **Enable Zcash private balance** penceresinde dört adım bulunur: Birthday, UFVK, Device ve Confirmation.
- **Birthday:** Yeni bir hesap için doğum günü yüksekliğini bugünün tarihinde bırakın. Blok 0'dan tarama uzun sürebileceğinden, yalnızca geçmişte bu hesabın korumalı ZEC aldığını biliyorsanız "This account received shielded ZEC in the past" kutucuğunu işaretleyin.
- **UFVK ve Device:** Ledger Wallet, Ledger cihazınızdan Unified Full Viewing Key (UFVK) dışa aktarmasını ister. Cihazdaki ekranları okuyun ve onaylayın. "Device connection lost" görürseniz Zcash uygulamasının açık olduğundan emin olun, hemen onaylayın ve **Retry** seçeneğine tıklayın.
- **UFVK successfully imported** mesajını gördüğünüzde **Start sync** seçeneğine tıklayın. Eşitleme tamamlandığında düğme, "Last sync" zamanı ile birlikte **Update balance** olarak değişir.
- Görüntüleme anahtarı bilgisayarınızda kalır. Korumalı fonlarınızı bulabilir, ancak harcayamaz.

![Enable Zcash private balance window showing UFVK successfully imported and the Start sync button](https://raw.githubusercontent.com/ZecHub/zechub/main/site/guides/assets/ledger-zec-02-ufvk-imported.png)

**4. ZEC alın ve her iki adresi de Ledger cihazınızda doğrulayın**
- **Receive** seçeneğine tıklayın ve Zcash hesabınızı seçin. Ledger Wallet, bir **Address for Zcash 1** (şeffaf, t1 ile başlar) ve bir **Private address for Zcash 1** (u1 ile başlar) gösterir. Önceki adresler geçerliliğini korur.
- Ledger cihazınızda "Verify Zcash addresses", iki sayfaya yayılmış **Private address** ve ardından **Public Address** gösterilir. Herhangi bir adresi paylaşmadan önce her karakteri ekranla karşılaştırın, ardından cihazda onaylayın.
- Özel adresi tercih edin; şeffaf adresi yalnızca gönderen başka hiçbir şeyi desteklemiyorsa kullanın.

![Ledger Wallet Receive window showing the transparent address and the private address for Zcash 1](https://raw.githubusercontent.com/ZecHub/zechub/main/site/guides/assets/ledger-zec-03-receive-addresses.png)

![Ledger device screens: Verify Zcash addresses, Private address in two pages, then Public Address](https://raw.githubusercontent.com/ZecHub/zechub/main/site/guides/assets/ledger-zec-04-device-verify-addresses.png)

**5. Şeffaf ZEC bakiyeyi özel bakiyenize taşıyın**
- **Send** seçeneğine tıklayın. **Self transfer** altında **Send to private balance** seçeneğini seçin.
- Bir tutar girin veya %25, %50, %75 ya da **Max** seçeneğini kullanın. Ağ ücretini kontrol edin, ardından **Review** seçeneğine tıklayın.
- Ledger cihazınızda şu ekranları adım adım inceleyin: "Review transaction to send ZEC", "Transfer from public to private address", tutar, iki sayfadaki çıktı adresi, ücret ve son kullanma yüksekliği. Çıktı adresinin 4. adımdaki özel adresinizle eşleştiğini kontrol edin, ardından **Sign transaction** üzerinde her iki düğmeye basın.
- Ledger Wallet, **Transaction sent** mesajını gösterir. İşlem ayrıntılarında tür **Private (Ironwood)** olarak görünür.
- Ledger Wallet, bir öz transferin korumalı fonlarınızı genel adresinizle ilişkilendirdiğini belirtir. Doğrudan özel adresinize almak, bunların ilişkilendirilmemesini sağlar.

![Send ZEC window in Ledger Wallet with the Self transfer option Send to private balance](https://raw.githubusercontent.com/ZecHub/zechub/main/site/guides/assets/ledger-zec-05-send-to-private-balance.png)

![Ledger device review screens for moving ZEC from the transparent balance to the private address, ending with Sign transaction and Transaction signed](https://raw.githubusercontent.com/ZecHub/zechub/main/site/guides/assets/ledger-zec-06-device-review-shielding.png)

- İşlem onaylandıktan sonra şeffaf bakiye azalır ve özel bakiye artar. Yeni korumalı fonlar, harcanmak için yeterli onay alana kadar "maturing" olarak görünür.

![Zcash account after shielding: transparent balance reduced, private balance increased and shown as maturing](https://raw.githubusercontent.com/ZecHub/zechub/main/site/guides/assets/ledger-zec-07-balances-after-shielding.png)

**6. Özel bakiyenizden ZEC gönderin**
- Özel bakiye harcanabilir olduğunda **Send** seçeneğine tıklayın ve **Transfer from** ayarını **Private balance** olarak belirleyin.
- Alıcının adresini yapıştırın ve tutarı girin. Yalnızca alıcının okuyabileceği, 512 bayta kadar şifrelenmiş bir **Memo (optional)** ekleyebilirsiniz.
- Alıcıyı, tutarı ve ücreti Ledger cihazınızda inceleyin, ardından **Sign transaction** üzerinde her iki düğmeye basın.

![Sent transaction from the private balance in Ledger Wallet transaction details](https://raw.githubusercontent.com/ZecHub/zechub/main/site/guides/assets/ledger-zec-08-private-send.png)

## Bilmeniz Gerekenler

- Ledger üzerindeki korumalı ZEC şimdilik yalnızca masaüstünde kullanılabilir (15 Ekim 2026'da kontrol edildi).
- Ledger Wallet'ın özel bakiyesi Ironwood havuzunu kullanır.
- Ledger, işlem geçmişinize salt okunur erişimi bir vergi danışmanıyla paylaşabileceğinizi söylüyor. Görüntüleme anahtarınıza sahip herkes korumalı geçmişinizi görebilir; bu nedenle yalnızca bilinçli olarak paylaşın.
- Bu kılavuzdaki cihaz ekranları, Nano S Plus üzerinde Zcash uygulaması 3.9.4 çalıştırılarak ve Zcash mainnet üzerinde Ledger Wallet Desktop 4.24.0'a bağlanarak, Ledger'in Speculos emülatörü ile yakalanmıştır. Fiziksel bir Ledger aynı uygulamayı çalıştırır ve aynı ekranları gösterir.

## Ek Yardım

- [Ledger Wallet'ta Yeni: Yerel Korumalı Zcash Desteği](https://www.ledger.com/blog-native-shielded-zcash-support) (Ledger'in duyurusu)
- [Ledger Yardım Merkezi](https://support.ledger.com)
- [ZecHub Wallet'lar sayfası](/using-zcash/wallets)
- ZecHub üzerinde [Korumalı Havuzlar](/using-zcash/shielded-pools) ve [Görüntüleme Anahtarları](/zcash-tech/viewing-keys)
- Başka bir donanım cüzdanı seçeneği: [Keystone Zashi Kullanıcı Kılavuzu](/guides/keystone-zashi)
