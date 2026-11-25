# **Phantom Cüzdanında ZEC Nasıl Takas Edilir**

![img1](/content-images/SJOlnt-ceg-34468cfecd.webp)

Solana üzerinde zaten ZEC tutuyor musunuz (örneğin, sahiplerine ZEC ödemesi yapan bir tokendan gelen ZEC)? Takas etmeyin. Bu tokenı [ZEC Solana üzerinde mi? Korumalı Zcash](/using-zcash/solana-zec-to-shielded) kılavuzundaki adımları izleyerek korumalı bir Zcash cüzdanına taşıyın.

---

## **Yerel ZEC mı, yoksa ZEC tokenı mı?**

Phantom içindeki “ZEC” iki farklı varlığı ifade edebilir; bu yüzden hangisinin ödemesini yaptığınızı bilin.

- **Phantom'ın yerleşik Takas düğmesi**, Solana üzerindeki ZEC'ın (veya Phantom'ın desteklediği başka bir ağın) token temsili olan bir varlığı sunar. Bu, yerel ZEC değildir. Phantom adresinizde bulunur, Zcash korumalı işlevselliği yoktur ve Zcash cüzdanı bunu göremez veya korumalı hâle getiremez.
- **Yerel ZEC** yalnızca Zcash blokzincirinde bulunur ve bir Zcash adrese gönderilir. Bunu almak için Zcash adresinizi isteyen bir hizmet gerekir; örneğin [ZODL](https://zodl.com) içindeki takas, [DEX sayfasındaki](/dex) seçeneklerden biri veya solswap.org üzerinden işlem yaptıktan sonra Zcash cüzdanınıza çekim (8. Adım).

### Ödeme yapmadan önce kontrol edin

- **Ağ:** Alacağınız ZEC, **Zcash** ağında olmalıdır. Solana, Ethereum veya Base yazıyorsa bu bir tokendır.
- **Varlık:** Yerel ZEC için token sözleşmesi veya mint adresi yoktur. Sizinkinde bunlardan biri görünüyorsa, o bir tokendır. Solana üzerinde birbirine benzeyen pek çok “ZEC” tokenı da vardır; bu nedenle yalnızca adına bakmayın. Solana üzerindeki OmniBridge tokenı `A7bdiYdS5GjqGFtxf17ppRHtDKPkkRqbKtR27dxvQXaS`'tır; bu hâlâ bir tokendır, yerel ZEC değildir.
- **Adres:** Yerel ZEC, `t1`, `u1` veya `zs` ile başlayan bir Zcash adrese gönderilir. ZEC Phantom adresinize gönderiliyorsa, aldığınız şey bir tokendır.

---

##  **1. Adım: Takas Arayüzünü Açın**
**Phantom uygulamasını** başlatın ve **Phantom tarayıcısından [solswap.org](https://solswap.org/)** adresini ziyaret edin. Adresi kendiniz yazın. Site NEAR Intents üzerinde çalışır ve ZEC'ı bir Zcash adrese gönderebilir.

Phantom'ın kendi **Takas** düğmesi de ZEC'ı listeler; ancak bu, yerel ZEC değil, yukarıda açıklanan tokenı verir.

![img2](/content-images/S1Cp-KWqxe-ab70e844b9.webp)

---

##  **2. Adım: Yatırma İçin Ağları ve Tokenları Seçin**
- **Kaynak ağı** seçin (ör. *Ethereum* veya *Solana*), ardından takas için yatırma işlemini yapın.

![img3](/content-images/S1SaGYZ9xx-2a27ccdd47.webp)

- **SOL, USDT veya USDC** gibi bir temel token seçin.
- **Hedef tokenınız** olarak **ZEC**'ı seçin.
- Takas arayüzünde Zcash'ın kullanılabilir olduğundan emin olun.

![img4](/content-images/ry4QQF-5gx-f3805528ea.webp)

---

##  **3. Adım: Miktarı Girin ve Teklifi İnceleyin**
- Takas etmek istediğiniz miktarı girin.
- **solswap.org** üzerinde gösterilen alınacak miktarı kullanın. Bu rota için geçerli olan teklif budur.

![img5](/content-images/B1U1NYW5xe-58cf150668.webp)

---

##  **4. Adım: Gas ve Ücretleri Kontrol Edin**
- Yatırmayı onaylamak için Phantom içinde kaynak Zincir'in gas tokenından yeterli miktarda bulundurun (*Solana* üzerinde *SOL*, Ethereum'da *ETH*).
- Onaylamadan önce solswap teklifindeki ücret satırını okuyun. Phantom'ın yerleşik Takas özelliği kendi ücret tarifesini kullanır (geçmişte %0,85 Phantom ücreti ile ağ gas ücreti ve köprüleme ücreti uygulanıyordu). Bu tutarlar solswap.org yatırma işlemi için geçerli değildir.

---

##  **5. Adım: Ayarları Düzenleyin (İsteğe Bağlı)**
solswap.org üzerinde, yatırma işlemini yapmadan önce kaymayı ve o ekranda teklif edilen asgari alınacak miktarı inceleyin.

Bunun yerine Phantom'ın kendi **Takas** ekranına bakıyorsanız, bu sayfanın başındaki token rotasındasınız demektir. Ekranı kapatın ve Phantom tarayıcısında `solswap.org`'ı açın.

---

##  **6. Adım: Takası Onaylayın**
- solswap.org üzerindeki tüm takas ayrıntılarını inceleyin.
- Phantom içindeki yatırma işlemini onaylayın.

![img6](/content-images/HkU1UKZ5gx-e068ea8d5a.webp)

---

## **7. Adım: Durumu İzleyin**
- **Completed** görünene kadar yatırma işlemini solswap.org etkinliklerinde takip edin.
- Solana veya kaynak Zincir işlem kimliği, etkinlik satırında ve o ağın Zincir gezgininde bulunur.

![img7](/content-images/S1NBwKbcxe-5b7d11f5c1.webp)

---

## **8. Adım: Yerel ZEC'ı Zcash Cüzdanınıza Çekin**
Takasın ardından ZEC, solswap.org **Account** bakiyenizde görünür. Henüz Zcash ağında değildir ve Phantom içinde de bulunmaz.

1. [dizininde](/wallets) **Ironwood: Ready** olarak belirtilen bir Zcash cüzdan açın. Cüzdanınızın korumalı olarak işaretlediği bir `u1` kopyalayın. Bir `t1` da işe yarar, ancak korumalı hâle getirene kadar bu yatırma işlemi herkese açık olur.
2. solswap.org üzerinde **Account** bölümüne gidin ve **Withdraw**'a dokunun. **ZEC**'ı seçin, ağı **Zcash** olarak ayarlayın, adresi yapıştırın ve onaylamadan önce ilk ve son karakterleri kontrol edin.
3. **Received amount** ve **Fee** alanlarında “–” görünmeye devam ediyor ve düğme hiçbir şey yapmıyorsa bakiyeniz kaybolmuş değildir. Phantom anahtarınız altında NEAR Intents içinde durur. Geçici çözümü [near.com](https://near.com) üzerinde tamamlayın: aynı Phantom cüzdanla oturum açın, **Move legacy assets**'i açın, ZEC satırındaki **Withdraw**'a dokunun (**Move**'a değil), ağı **Zcash** olarak ayarlayın ve aynı `u1`'ı yapıştırın. Phantom sizden **Sign Message** isteyecektir. Yalnızca isteğin `near.com`'tan geldiğini ve mesajda `"verifying_contract": "intents.near"` adının geçtiğini doğrularsanız onaylayın. Bu geçici çözümün tüm ekranları için [ZEC Solana üzerinde mi? Korumalı Zcash](/using-zcash/solana-zec-to-shielded) kılavuzuna bakın.

---

## **Sonraki Adımlar**
Yerel ZEC Zcash cüzdanınıza ulaştığında, [ZEC'ı Gizlilik İçinde Kullanma](/guides/using-zec-privately) kılavuzundaki adımları izleyerek ZEC'ı korumalı hâle getirin.

Phantom'ın Takas düğmesiyle alınan bir ZEC tokenı Phantom üzerinden korumalı hâle getirilemez. Bu token, Solana üzerindeki OmniBridge varlığıdır. [ZEC Solana üzerinde mi? Korumalı Zcash](/using-zcash/solana-zec-to-shielded) kılavuzundaki adımları izleyerek tokenı taşıyın.
