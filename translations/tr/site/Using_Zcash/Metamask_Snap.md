<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Metamask_Snap.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Sayfayı düzenle"/>
</a>

# MetaMask Zcash Snap Entegrasyon Rehberi

> MetaMask tarayıcı uzantısından, ChainSafe'ın Zcash Snap ve WebZjs web cüzdanını kullanarak korumalı ZEC tutun ve gönderin.

## Kısaca

* ChainSafe Zcash Snap, masaüstünde (Chrome, Edge, Firefox) MetaMask'e korumalı ZEC ekler. Ayrı bir Zcash yazılımı gerekmez.
* Zcash anahtarlarınız, MetaMask kurtarma ifadenizden türetilir. Bu tek ifade artık hem ETH'nizi hem de ZEC'ınızı korur.
* ZEC'ı MetaMask'ın kendi varlık listesinde değil, webzjs.chainsafe.dev adresindeki WebZjs cüzdanı üzerinden yönetirsiniz.
* Hesabınız birleşik bir adres alır; böylece gönderenler size destekledikleri en gizli havuz üzerinden ödeme yapar.
* Takas yaparak (örneğin ETH'yi ZEC'a) veya bir borsadan korumalı adresinize ZEC çekerek cüzdanınıza para yatırabilirsiniz.
* Kurtarma: MetaMask ve Snap'ı yeniden yükleyin, ardından mevcut kurtarma ifadenizi içe aktarın.

## Temel Açıklama

MetaMask Snap, MetaMask'a yeni bir blok zinciri öğreten, küçük ve yalıtılmış bir eklentidir. ChainSafe tarafından geliştirilen ve Hacken tarafından denetlenen Zcash Snap, MetaMask'ın mevcut kurtarma ifadenizden Zcash anahtarları türetmesini ve Zcash işlemlerini imzalamasını sağlar.

MetaMask kendi başına ZEC bakiyesi göstermez. Bunun yerine WebZjs web cüzdanı Snap'a bağlanır, bir lightwalletd sunucusu üzerinden Zcash ağıyla eşitlenir ve adreslerinizi ve bakiyenizi gösterir. Korumalı kanıtlar tarayıcınızda WebAssembly ile hesaplanır; bu nedenle gönderim işlemleri biraz zaman alabilir.

Aşağıdaki adımlar Snap'ı yüklemeyi, WebZjs'ı bağlamayı, cüzdana para yatırmayı, gönderip almayı ve birleşik adresinizin bileşenlerini kontrol etmeyi kapsar.

## Tam Rehber

Adım adım açıklama ve görsel anlatım için bu [**YouTube rehberini**](https://www.youtube.com/watch?v=UJh9Ilkohdw) izleyin: 

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/UJh9Ilkohdw"
    title="Metamask'te ZEC nasıl kullanılır?"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>
     

MetaMask artık **korumalı Zcash (ZEC)** desteği sunuyor. Bu özellik, tarayıcı cüzdanınızda özel ZEC gönderip almanızı ve yönetmenizi sağlayan **ChainSafe tarafından geliştirilen Zcash Snap** aracılığıyla kullanılabiliyor. **Hacken** tarafından denetlenmiş ve **resmî MetaMask Snaps Dizini**'nde listelenmiştir; **ayrı bir Zcash yazılımı** gerektirmez, yalnızca MetaMask ve Snap yeterlidir.

---

## **Ön Koşullar**


> [**MetaMask Uzantısı**](https://snaps.metamask.io/snap/npm/zcashcommunitygrants/webzjs-zcash-snap/) (yalnızca masaüstü) - Chrome, Edge veya Firefox.
> MetaMask Hesabı - Kurtarma ifadeniz güvenli olmalı; Snap bu ifadeden Zcash anahtarlarını türetir.  
> Kararlı İnternet Bağlantısı - Zcash ağıyla eşitleme için.  
> Bakiye - ZEC ile takas etmek için ETH veya bir borsadan ZEC.

> **İpucu:** MetaMask kurtarma ifadenizi koruyun; hem ETH'nizi hem de ZEC'ınızı kontrol eder.

---

## **1. Zcash Snap'ı yükleyin**

1. [**MetaMask Snaps Dizini**](https://snaps.metamask.io/snap/npm/zcashcommunitygrants/webzjs-zcash-snap/)'ne gidin.  
2. [**"Zcash WebZjs Wallet"**](https://snaps.metamask.io/snap/npm/zcashcommunitygrants/webzjs-zcash-snap/) veya [**"WebZjs Zcash Snap"**](https://snaps.metamask.io/snap/npm/zcashcommunitygrants/webzjs-zcash-snap/) için arama yapın.  
3. **Install/MetaMask'a ekle** seçeneğine tıklayın.
4. Şu izinleri onaylayın:
   ```
      Manage Zcash accounts 
      Store data on your device
   ```

![Zcash-snap-install](/content-images/Hy5MSG2Oex-42d0c5b346.webp)


---

## **2. (İsteğe bağlı) Zcash Ağını ekleyin**

MetaMask'te **Ağ Ekle**'yi seçin ve şu bilgileri girin:

**BNB SmartChain** için;
```markdown
-  Name: BNB Smart Chain
-  RPC URL: https://bsc-dataseed.binance.org
-  Chain ID: 56
-  Symbol: BNB
-  Block Explorer URL: https://bscscan.com
```
Bu, ağ bilgilerini ve blok gezgini bağlantılarını etkinleştirir.
![Add-a-custom-Net....](/content-images/S1hq7f2Oel-e1ca8b9044.webp)

**Zcash Mainnet** için;
```markdown
- Name: Zcash Mainnet  
- RPC URL: https://zjs.zec.rocks 
- Symbol: ZEC
```
`https://zjs.zec.rocks`, [zec.rocks](https://zec.rocks) (@emersonian) tarafından çalıştırılan, WebZjs uyumlu bir (gRPC-web) lightwalletd sunucusudur. Testnet için `https://zjs.zec.rocks/testnet` kullanın. WebZjs web cüzdanını kendiniz çalıştırıyorsanız, `LIGHTWALLETD_PROXY` olarak ayarlamanız gereken değer budur.

---

## **3. ChainSafe WebZjs Cüzdanına bağlanın**

1. [webzjs.chainsafe.dev](https://webzjs.chainsafe.dev) adresini ziyaret edin.  
2. **MetaMask Snap'a bağlan** seçeneğine tıklayın.  

![Zcash-web-wallet](/content-images/Sk8nSz3dgl-98ce36cc67.webp)

3. Bağlantıyı onaylayın.  
4. Aşağıdakiler de dahil olmak üzere Zcash hesap özetinizi görüntüleyin:
   - Birleşik adresler ve şeffaf adres

![Account-summary-unif....](/content-images/r17c_Mhdel-f4963826d5.webp)


5. Eşitlemenin tamamlanmasını bekleyin.




---

## **4. Cüzdanınıza Para Yatırın**

> **ETH -> ZEC takası** - **LeoDex** gibi hizmetleri kullanıp korumalı adresinize gönderin.  
> **Borsadan çekim** - Satın aldığınız ZEC'ı WebZjs korumalı adresinize çekin.  

![LeoDex-SWAP](/content-images/HyLQ0G2ugg-8d82ef24f6.webp)


> => **Tam gizlilik** için korumalı (z) adresleri kullanın.

---

## **5. ZEC Gönderme / Alma**

1. **WebZjs** içinde **Bakiyeyi Aktar** bölümüne gidin.  
2. Şunları girin:
```
   - Shielded recipient address  
   - Amount
```
   ![Transfer-Balance](/content-images/rkvcFfhdex-bd55d079eb.webp)

4. İşlemi MetaMask içinde onaylayın (işlemi imzalayın).  
5. Alınan para, onaylandıktan sonra WebZjs içinde görünür.

---

## **6. Doğrulama / Sorun Giderme**

> Güncel bakiyeler için **WebZjs**'ı kontrol edin **(MetaMask, ZEC'ı doğrudan listelemiyor)** .  
> Sorun yaşarsanız:
  ```
  - Confirm you have the official ChainSafe Snap.  
  - Check correct network settings.  
  - Ensure correct address format.  
  - Reconnect via **Connect Snap** if needed.
  ``` 

> **Güvenlik İpucu:** Yalnızca **denetlenmiş ChainSafe Snap**'ı yükleyin; onaylamadan önce izinleri inceleyin.

---

## **7. Adres Bileşenlerini Kontrol Edin**

1. **Al** bölümüne gidin - Birleşik Adresiniz varsayılan olarak görüntülenir.  
2. Birleşik Adresi kopyalayıp [Zcash Blok Gezgini](https://mainnet.zcashexplorer.app/)'ni ziyaret edin.  
3. Birleşik Adresinizi arama çubuğuna yapıştırın.  
4. Artık Birleşik Adresin tüm bileşenlerini görebilirsiniz. Bunlar şunlardır:
``` 
   Orchard Address  
   Sapling Address  
   Transparent Address
``` 

![Address-components](/content-images/SyPR2f2_gg-3907c5bf58.webp)



---

## **Ek Notlar**

> [**en son MetaMask sürümünü**](https://chromewebstore.google.com/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en) kullanın - herkese açık sürüm Snaps'i destekler.  
> Korumalı kanıtların oluşturulması zaman alabilir; hesaplama tarayıcıda WebAssembly tarafından yapılır.  
> Kurtarma kolaydır: MetaMask ve Snap'ı yükleyin, ardından mevcut kurtarma ifadenizi içe aktarın.  
> Snap varsayılan olarak **korumalı ZEC** kullanır; şeffaf adresler **öncelikli değildir**.  
> İşlem onayları için [mainnet.zcashexplorer.app](https://mainnet.zcashexplorer.app) adresini kullanın.
