# MetaMask Zcash Snap Entegrasyon Rehberi

Tam bir adım adım anlatım ve görsel açıklama için bu [**YouTube rehberini**](https://www.youtube.com/watch?v=UJh9Ilkohdw) izleyin: 

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/UJh9Ilkohdw"
    title="How to use ZEC on Metamask"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>
     

MetaMask artık **ChainSafe tarafından geliştirilen Zcash Snap** aracılığıyla **shielded Zcash (ZEC)** desteği sunuyor; bu sayede özel ZEC'yi doğrudan tarayıcı cüzdanınızdan gönderip alabilir ve yönetebilirsiniz. **Hacken** tarafından denetlenmiş ve **resmi MetaMask Snaps Directory** içinde listelenmiştir; **ayrı bir Zcash yazılımı gerektirmez** - yalnızca MetaMask ve Snap yeterlidir.

---

## **Ön Koşullar**


> [**MetaMask Eklentisi**](https://snaps.metamask.io/snap/npm/chainsafe/webzjs-zcash-snap/) (yalnızca masaüstü) - Chrome, Edge veya Firefox.
> MetaMask Hesabı - Seed phrase güvence altına alınmış olmalı; Snap, Zcash anahtarlarını bundan türetir.  
> Kararlı İnternet Bağlantısı - Zcash ağıyla senkronizasyon için.  
> Bakiye - ZEC ile takas etmek için ETH veya bir borsadan ZEC.

> **İpucu:** MetaMask kurtarma ifadenizi koruyun - hem ETH hem de ZEC'yi kontrol eder.

---

## **1. Zcash Snap'i Yükleyin**

1. [**MetaMask Snaps Directory**](https://snaps.metamask.io/snap/npm/chainsafe/webzjs-zcash-snap/) sayfasına gidin.  
2. [**"Zcash Shielded Wallet"**](https://snaps.metamask.io/snap/npm/chainsafe/webzjs-zcash-snap/) veya [**"WebZjs Zcash Snap"**](https://snaps.metamask.io/snap/npm/chainsafe/webzjs-zcash-snap/) aratın.  
3. **Install/Add to MetaMask** seçeneğine tıklayın.
4. Şu izinleri onaylayın:
   ```
      Manage Zcash accounts 
      Store data on your device
   ```

![Zcash-snap-install](/content-images/Hy5MSG2Oex-42d0c5b346.webp)


---

## **2. (İsteğe Bağlı) Zcash Ağını Ekleyin**

MetaMask içinde **Add Network** seçeneğini seçin ve şunları girin:

**BNB SmartChain** için;
```markdown
-  Name: BNB Smart Chain
-  RPC URL: https://bsc-dataseed.binance.org
-  Chain ID: 56
-  Symbol: BNB
-  Block Explorer URL: https://bscscan.com
```
Bu, ağ bilgilerini ve explorer bağlantılarını etkinleştirir.
![Add-a-custom-Net....](/content-images/S1hq7f2Oel-e1ca8b9044.webp)

**Zcash Mainnet** için;
```markdown
- Name: Zcash Mainnet  
- RPC URL: https://mainnet.lightwalletd.com:9067 
- Symbol: ZEC
```

---

## **3. ChainSafe WebZjs Wallet'a Bağlanın**

1. [webzjs.chainsafe.dev](https://webzjs.chainsafe.dev) adresini ziyaret edin.  
2. **Connect MetaMask Snap** seçeneğine tıklayın.  

![Zcash-web-wallet](/content-images/Sk8nSz3dgl-98ce36cc67.webp)

3. Bağlantıyı onaylayın.  
4. Şunlar dahil olmak üzere Zcash hesap özetinizi görüntüleyin:
   - Unified adresleri ve Transparent adres

![Account-summary-unif....](/content-images/r17c_Mhdel-f4963826d5.webp)


5. Senkronizasyonun tamamlanmasını bekleyin.




---

## **4. Cüzdanınıza Bakiye Ekleyin**

> **ETH -> ZEC Takası** - **LeoDex** gibi hizmetleri kullanın ve shielded adresinize gönderin.  
> **Borsadan Çekim** - Satın aldığınız ZEC'yi WebZjs shielded adresinize çekin.  

![LEODEX-SWAP](/content-images/HyLQ0G2ugg-8d82ef24f6.webp)


> => **Tam gizlilik** için shielded (z) adresleri kullanın.

---

## **5. ZEC Gönderin / Alın**

1. **WebZjs** içinde **Transfer Balance** bölümüne gidin.  
2. Şunları girin:
```
   - Shielded alıcı adresi  
   - Tutar
```
   ![Transfer-Balance](/content-images/rkvcFfhdex-bd55d079eb.webp)

4. İşlemi MetaMask içinde onaylayın (işlemi imzalayın).  
5. Gelen fonlar, onaydan sonra WebZjs içinde görünecektir.

---

## **6. Doğrulayın / Sorun Giderin**

> Güncel bakiyeler için **WebZjs**'yi kontrol edin **(MetaMask, ZEC'yi doğrudan listelememiştir)** .  
> Sorun oluşursa:
  ```
  - Resmi ChainSafe Snap'e sahip olduğunuzu doğrulayın.  
  - Ağ ayarlarının doğru olduğunu kontrol edin.  
  - Adres biçiminin doğru olduğundan emin olun.  
  - Gerekirse **Connect Snap** ile yeniden bağlanın.
  ``` 

> **Güvenlik İpucu:** Yalnızca **denetlenmiş ChainSafe Snap**'i yükleyin; onaylamadan önce izinleri gözden geçirin.

---

## **7. Adres Bileşenlerini Kontrol Edin**

1. **Receive** bölümüne gidin - Unified Address varsayılan olarak görüntülenecektir.  
2. Unified Address'i kopyalayın ve [Zcash Block Explorer](https://mainnet.zcashexplorer.app/) adresini ziyaret edin.  
3. Unified Address'inizi arama çubuğuna yapıştırın.  
4. Artık Unified Address'in tüm bileşenlerini göreceksiniz; bunlar şunları içerir:
``` 
   Orchard Address  
   Sapling Address  
   Transparent Address
``` 

![Address-components](/content-images/SyPR2f2_gg-3907c5bf58.webp)



---

## **Ek Notlar**

> Snaps desteği herkese açık sürümde bulunduğundan [**en güncel MetaMask sürümünü**](https://chromewebstore.google.com/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en) kullanın.  
> Shielded proof'ların oluşturulması zaman alabilir; hesaplama tarayıcı içinde WebAssembly tarafından gerçekleştirilir.  
> Kurtarma basittir, MetaMask ve Snap'i yükleyin, ardından mevcut seed'inizi içe aktarın.  
> Snap varsayılan olarak **shielded ZEC** kullanır, transparent adresler **odak noktası değildir**.  
> İşlem onayları için [zcashblockexplorer.com](https://zcashblockexplorer.com) kullanın.
