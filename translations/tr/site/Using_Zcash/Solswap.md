# **Phantom Wallet'ta ZEC Takası Nasıl Yapılır**



![img1](/content-images/SJOlnt-ceg-34468cfecd.webp)

Solana üzerinde hâlihazırda ZEC mı tutuyorsunuz (örneğin, sahiplerine ZEC ile ödeme yapan bir tokenden)? Takas etmeyin. Bu tokeni [ ile korumalı bir Zcash cüzdanına taşıyınSolana üzerinde ZEC mı var? Onu korumalı Zcash](/using-zcash/solana-zec-to-shielded)'e taşıyın.

---

## **Yerel ZEC mi, yoksa bir ZEC tokenı mı?**

Phantom'daki "ZEC" iki farklı varlığı ifade edebilir; bu nedenle ne için ödeme yaptığınızı bilin.

- **Phantom'un yerleşik Swap düğmesi**, Solana (veya Phantom'un desteklediği başka bir ağ) üzerinde ZEC için bir token temsili sunar. Bu, yerel ZEC değildir. Phantom adresinizde bulunur, Zcash korumalı işlevselliğine sahip değildir ve bir Zcash cüzdanı bunu göremez veya koruyamaz.
- **Yerel ZEC** yalnızca Zcash blokzincirinde bulunur ve bir Zcash adresine gönderilir. Bunu elde etmek için Zcash adresinizi isteyen bir hizmete ihtiyacınız vardır; örneğin [ZODL](https://zodl.com) içindeki bir takas, [DEX sayfasındaki seçeneklerden biri](/dex) veya solswap.org üzerinden yapılan ve ardından Zcash cüzdanınıza çekimle tamamlanan bir işlem (8. Adım).

### Ödeme yapmadan önce kontrol edin

- **Ağ:** aldığınız ZEC, **Zcash** ağında olmalıdır. Solana, Ethereum veya Base yazıyorsa bu bir tokendır.
- **Varlık:** yerel ZEC için token sözleşmesi veya mint adresi bulunmaz. Sizinkinde bunlardan biri görünüyorsa bu bir tokendır. Solana’da benzer görünümlü birçok "ZEC" tokenı da vardır; bu nedenle yalnızca isme güvenmeyin. Solana’daki OmniBridge tokenı `A7bdiYdS5GjqGFtxf17ppRHtDKPkkRqbKtR27dxvQXaS`’dir; bu hâlâ bir tokendır, yerel ZEC değildir.
- **Adres:** yerel ZEC, `t1`, `u1` veya `zs` ile başlayan bir Zcash adresine gönderilir. ZEC, Phantom adresinize gönderiliyorsa bir token alıyorsunuz.

---

##  **Adım 1: Swap Arayüzünü Açın**
**Phantom uygulamasını** başlatın ve Phantom tarayıcısından **[solswap.org](https://solswap.org/)** adresini ziyaret edin. Adresi kendiniz yazın. Site NEAR Intents üzerinde çalışır ve ZEC varlıklarını bir Zcash adresine gönderebilir.

Phantom'un kendi **Swap** düğmesinde de ZEC listelenir, ancak bu size yukarıda açıklanan tokenı verir; yerel ZEC vermez.  


![img2](/content-images/S1Cp-KWqxe-ab70e844b9.webp)

---

##  **2. Adım: Yatırma İçin Ağları ve Tokenları Seçin**  
- **Kaynak ağınızı** (ör. *Ethereum* veya *Solana*) seçin, ardından takas için yatırma işlemi yapın.  


![img3](/content-images/S1SaGYZ9xx-2a27ccdd47.webp)

- **SOL, USDT veya USDC** gibi bir temel token seçin.  
- **Hedef tokenınız** olarak **ZEC** seçin.  
- Zcash varlığının takas arayüzü üzerinden kullanılabilir olduğundan emin olun.  



![img4](/content-images/ry4QQF-5gx-f3805528ea.webp)

---

##  **Adım 3: Tutarı Girin ve Teklifi İnceleyin**
- Takas etmek istediğiniz tutarı girin.
- **solswap.org** üzerinde gösterilen alınacak tutarı kullanın. Bu rotada geçerli olan teklif budur.

![img5](/content-images/B1U1NYW5xe-58cf150668.webp)

---

##  **Adım 4: Gas ve Ücretleri Kontrol Edin**
- Yatırma işlemini onaylamak için Phantom içinde kaynak zincirin gas tokeninden yeterli miktarda bulundurun (Solana'da *SOL*, Ethereum'da *ETH*).
- Onaylamadan önce solswap teklifindeki ücret satırını okuyun. Phantom'ın yerleşik Swap özelliği kendi ücret tarifesini kullanır (geçmişte ağ gası ve köprüleme ücretine ek olarak %0,85 Phantom ücreti). Bu rakamlar solswap.org yatırma işlemi için geçerli değildir.

---

##  **Adım 5: Ayarları Düzenleyin (İsteğe Bağlı)**
solswap.org'da, yatırma işlemi yapmadan önce kaymayı ve ekranda belirtilen minimum alım miktarını inceleyin.

Bunun yerine Phantom'ın kendi **Swap** sayfasına bakıyorsanız, bu sayfanın üst kısmındaki token rotasındasınız. Kapatın ve Phantom tarayıcısında `solswap.org` öğesini açın.

---

##  **Adım 6: Takası Onaylayın**
- solswap.org üzerindeki tüm takas ayrıntılarını gözden geçirin.
- Para yatırma işlemini Phantom içinde onaylayın.

![img6](/content-images/HkU1UKZ5gx-e068ea8d5a.webp)

---

## **Adım 7: Durumu İzleyin**
- Para yatırma işlemini **Tamamlandı** olarak görünene kadar solswap.org etkinliğinden takip edin.
- Solana veya kaynak zincir işlem kimliği, bu etkinlik satırında ve ilgili ağın zincir gezgininde yer alır.

![img7](/content-images/S1NBwKbcxe-5b7d11f5c1.webp)

---

## **8. Adım: Yerel ZEC'i Zcash Cüzdanınıza Çekin**
Swap işleminden sonra ZEC, solswap.org **Hesap** bakiyenizde görünür. Henüz Zcash ağında değildir ve Phantom içinde de değildir.

1. [directory](/wallets) tarafından **Ironwood: Hazır** olarak işaretlenen bir Zcash cüzdanını açın. Cüzdanınızın korumalı olarak etiketlediği bir `u1` kopyalayın. `t1` de kullanılabilir, ancak bu yatırma işlemi siz koruyana kadar herkese açıktır.
2. solswap.org'da **Hesap** bölümüne gidin ve **Çek** seçeneğine dokunun. **ZEC** seçeneğini belirleyin, ağı **Zcash** olarak ayarlayın, adresi yapıştırın ve onaylamadan önce ilk ve son karakterleri kontrol edin.
3. **Alınan tutar** ve **Ücret** "–" olarak kalır ve düğme hiçbir şey yapmazsa bakiye kaybolmamıştır. NEAR Intents içinde, Phantom anahtarınız altında bulunur. [near.com](https://near.com) üzerinde işlemi tamamlayın: aynı Phantom cüzdanıyla oturum açın, **Eski varlıkları taşı** bölümünü açın, ZEC satırında (**Taşı** değil) **Çek** seçeneğine dokunun, ağı **Zcash** olarak ayarlayın ve aynı `u1` adresini yapıştırın. Phantom sizden **Mesajı İmzala** işlemini isteyecektir. Yalnızca istek `near.com` kaynaklıysa ve mesajda `"verifying_contract": "intents.near"` adı geçiyorsa onaylayın. Bu geçici çözümün tüm ekranları [Solana'da ZEC mi var? Korunaklı Zcash konumuna taşıyın](/using-zcash/solana-zec-to-shielded).

---

## **Sonraki Adımlar**
Yerel ZEC, Zcash cüzdanınıza ulaştığında [ kullanarak gizli tutun ZEC'ü özel olarak kullanma](/guides/using-zec-privately).

Phantom'nin Swap düğmesiyle satın alınan bir ZEC tokenı, Phantom'den shielded hâle getirilemez. Bu token, Solana üzerindeki OmniBridge varlığıdır. Onu [ ile taşıyın. Solana'da ZEC mi var? Onu shielded Zcash](/using-zcash/solana-zec-to-shielded)'ye taşıyın.
