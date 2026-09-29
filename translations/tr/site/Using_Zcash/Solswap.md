# **Phantom Wallet'ta ZEC Takası Nasıl Yapılır**



![img1](/content-images/SJOlnt-ceg-34468cfecd.webp)

---

## **Yerel ZEC mi, yoksa bir ZEC tokenı mı?**

Phantom'daki "ZEC" iki farklı varlığı ifade edebilir; bu nedenle ne için ödeme yaptığınızı bilin.

- **Phantom'un yerleşik Swap düğmesi**, Solana (veya Phantom'un desteklediği başka bir ağ) üzerinde ZEC için bir token temsili sunar. Bu, yerel ZEC değildir. Phantom adresinizde bulunur, Zcash korumalı işlevselliğine sahip değildir ve bir Zcash cüzdanı bunu göremez veya koruyamaz.
- **Yerel ZEC** yalnızca Zcash blokzincirinde bulunur ve bir Zcash adresine gönderilir. Bunu elde etmek için Zcash adresinizi isteyen bir hizmete ihtiyacınız vardır; örneğin [ZODL](https://zodl.com) içindeki bir takas, [DEX sayfasındaki seçeneklerden biri](/dex) veya solswap.org üzerinden yapılan ve ardından Zcash cüzdanınıza çekimle tamamlanan bir işlem (8. Adım).

### Ödeme yapmadan önce kontrol edin

- **Ağ:** Aldığınız ZEC, **Zcash** ağında olmalıdır. Solana, Ethereum veya Base yazıyorsa bu bir tokendır.
- **Varlık:** Yerel ZEC için token sözleşmesi ya da mint adresi bulunmaz. Sizinkinde böyle bir adres görünüyorsa, bu bir tokendır. Solana'da benzer görünümlü pek çok "ZEC" tokenı da vardır; bu nedenle yalnızca adına bakmayın.
- **Adres:** Yerel ZEC, `t1`, `u1` veya `zs` ile başlayan bir Zcash adresine gider. ZEC Phantom adresinize gönderiliyorsa, bir token alıyorsunuz demektir.

---

##  **1. Adım: Takas Arayüzünü Açın**  
**Phantom uygulamasını** açın ve Phantom tarayıcısından **[solswap.org](https://solswap.org/)** adresini ziyaret edin. Site Near Intents üzerinde çalışır ve ZEC varlığını bir Zcash adresine gönderebilir.  

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

##  **3. Adım: Tutarı Girin ve Teklifi İnceleyin**  
- Takas etmek istediğiniz tutarı girin.  
- Phantom, ücretlerden sonra **tahmini alınacak tutarı** gösterecektir.  


![img5](/content-images/B1U1NYW5xe-58cf150668.webp)

---

##  **4. Adım: Gas ve Ücretleri Kontrol Edin**  
- **Aynı zincirdeki takaslar** için yeterli yerel gas tokenına sahip olduğunuzdan emin olun (*Ethereum için ETH, Solana için SOL*).  
- **Zincirler arası takaslar**, hem kaynak hem de hedef zincirde gas gerektirir.  
- Ücret dökümünü inceleyin:  
  - Phantom Ücreti: **%0,85**  
  - Ağ Gas Ücreti  
  - Köprü Sağlayıcısı Ücretleri (~**%0,3**)  
  
  
---

##  **5. Adım: Ayarları Yapın (İsteğe Bağlı)**  
Şunları yapmak için **Swap Settings** seçeneğine dokunun:  
- **Slippage** değerini ayarlamak (varsayılan **%0,3**, %30'a kadar ayarlanabilir).  
- Yoğun ağlarda **öncelik ücretlerini** artırmak.  

---

##  **6. Adım: Takası Onaylayın**  
- Tüm takas ayrıntılarını inceleyin.  
- İşlemi başlatmak için **Swap Now** seçeneğine dokunun.  


![img6](/content-images/HkU1UKZ5gx-e068ea8d5a.webp)

---

## **7. Adım: Durumu Takip Edin**  
- Takasınızı **Recent Activity** sekmesinden takip edin.  
- Zincirler arası takaslarda, gerçek zamanlı güncellemeler için **işlem kimliğinizi** **Li.Fi Scanner** ile kullanın. 


![img7](/content-images/S1NBwKbcxe-5b7d11f5c1.webp)

---

## **8. Adım: Yerel ZEC Varlığını Zcash Cüzdanınıza Çekin**  
Takastan sonra ZEC varlığınız solswap.org **Account** bakiyenizde görünür. Henüz Zcash ağında değildir ve Phantom'da da bulunmaz. Taşımak için:  
- Zcash gibi bir [ZODL](https://zodl.com) cüzdanı açın ve alım adresinizi kopyalayın. Çekim formu şeffaf (`t1`) veya birleşik (`u1`) bir adresi kabul eder.  
- solswap.org'da **Account** bölümüne gidin ve **Withdraw** seçeneğine dokunun.  
- **ZEC** seçeneğini belirleyin, ağı **Zcash** olarak ayarlayın, adresinizi yapıştırın ve onaylamadan önce iki kez kontrol edin.  

---

## **Sonraki Adımlar**  
Yerel ZEC, Zcash cüzdanınıza ulaştığında [bu rehberle](/guides/using-zec-privately) koruyabilirsiniz.  

Phantom'un Swap düğmesiyle satın alınan bir ZEC tokenı, Zcash ağında olmadığı için bu şekilde korunamaz. Öncelikle bunu bir Zcash adresine gönderilen yerel ZEC ile takas etmeniz gerekir.
