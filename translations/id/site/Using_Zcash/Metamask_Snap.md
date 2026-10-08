# Panduan Integrasi MetaMask Zcash

Untuk panduan lengkap dan penjelasan visual, tonton [**panduan YouTube ini**](https://www.youtube.com/watch?v=UJh9Ilkohdw):

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/UJh9Ilkohdw"
    title="Cara menggunakan ZEC di Metamask"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div >
     

MetaMask kini mendukung **Zcash terlindungi (ZEC)** melalui **Snap Zcash yang dikembangkan oleh ChainSafe**, memungkinkan kamu untuk mengirim, menerima, dan mengelola ZEC pribadi secara langsung di dompet browser kamu. Telah diaudit oleh **Hacken** dan terdaftar dalam **Direktori Snap MetaMask resmi**, fitur ini **tidak memerlukan software Zcash terpisah** - hanya butuh MetaMask dan Snap tersebut.

---

## **Prasyarat**


> **Ekstensi [ MetaMask** ](https://snaps.metamask.io/snap/npm/chainsafe/webzjs-zcash-snap/) (hanya desktop) - Chrome, Edge, atau Firefox.
> Akun MetaMask - Frasa pemulihan aman; Snap menurunkan kunci Zcash darinya.  
> Koneksi Internet Stabil - Untuk sinkronisasi dengan jaringan Zcash.  
> Dana - ETH untuk di-swap ke ZEC atau ZEC dari sebuah exchange.

> **Tip:** Lindungi frasa pemulihan MetaMask kamu - ini mengontrol ETH dan ZEC.

---

## **1. Instal Zcash Snap**

1. Buka [**MetaMask Direktori Snaps ](https://snaps.metamask.io/snap/npm/chainsafe/webzjs-zcash-snap/)**.  
2. Cari [**"Zcash Shielded Wallet"**](https://snaps.metamask.io/snap/npm/chainsafe/webzjs-zcash-snap/) atau [**"WebZjs Zcash Snap"**](https://snaps.metamask.io/snap/npm/chainsafe/webzjs-zcash-snap/).  
3. Klik **Install/Add to MetaMask**.
4. Setujui izin seperti:```
      Manage Zcash accounts 
      Store data on your device
   ```

![Zcash-snap-install](/content-images/Hy5MSG2Oex-42d0c5b346.webp)


---

## **2. (Opsional) Tambahkan Jaringan Zcash**

Di MetaMask, pilih **Add Network** dan masukkan:

Untuk **BNB SmartChain**;```markdown
-  Name: BNB Smart Chain
-  RPC URL: https://bsc-dataseed.binance.org
-  Chain ID: 56
-  Symbol: BNB
-  Block Explorer URL: https://bscscan.com
```Ini memungkinkan informasi jaringan dan tautan explorer.
![Add-a-custom-Net....](/content-images/S1hq7f2Oel-e1ca8b9044.webp)

Untuk **Mainnet Zcash**;```markdown
- Name: Zcash Mainnet  
- RPC URL: https://zjs.zec.rocks 
- Symbol: ZEC
````https://zjs.zec.rocks` adalah server lightwalletd yang kompatibel dengan WebZjs (gRPC-web) yang dijalankan oleh [zec.rocks](https://zec.rocks) (@emersonian). Untuk testnet, gunakan `https://zjs.zec.rocks/testnet`. Jika kamu menjalankan dompet web WebZjs sendiri, ini adalah nilai yang harus diatur sebagai `LIGHTWALLETD_PROXY`.

---

## **3. Hubungkan ke Dompet ChainSafe WebZjs**

1. Kunjungi [webzjs.chainsafe.dev](https://webzjs.chainsafe.dev).  
2. Klik **Hubungkan MetaMask Snap**.

![Zcash-web-wallet](/content-images/Sk8nSz3dgl-98ce36cc67.webp)

3. Setujui koneksi tersebut.  
4. Lihat ringkasan akun Zcash kamu, termasuk:
   - Alamat terpadu dan alamat transparan

![Account-summary-unif....](/content-images/r17c_Mhdel-f4963826d5.webp)


5. Tunggu hingga sinkronisasi selesai.




---

## **4. Isi Dompet Kamu**

> **Swap ETH -> ZEC** - Gunakan layanan seperti **LeoDex** dan kirim ke alamat terlindungi kamu.  
> **Penarikan Exchange** - Tarik ZEC yang telah dibeli ke alamat terlindungi WebZjs kamu.

![LEODEX-SWAP](/content-images/HyLQ0G2ugg-8d82ef24f6.webp)


> => Gunakan alamat (z) terlindungi untuk **privasi penuh**.

---

## **5. Mengirim / Menerima ZEC**

1. Di **WebZjs**, buka **Transfer Balance**.  
2. Masukkan:```
   - Shielded recipient address  
   - Amount
```![Transfer-Balance](/content-images/rkvcFfhdex-bd55d079eb.webp)

4. Konfirmasi transaksi di MetaMask (tandatangani transaksi).  
5. Dana yang diterima akan muncul di WebZjs setelah konfirmasi.

---

## **6. Verifikasi / Pemecahan Masalah**

> Periksa **WebZjs** untuk saldo terbaru **(MetaMask tidak mencantumkan ZEC secara langsung)**.  
> Jika terjadi masalah:```
  - Confirm you have the official ChainSafe Snap.  
  - Check correct network settings.  
  - Ensure correct address format.  
  - Reconnect via **Connect Snap** if needed.
  ``` 

> **Tips Keamanan:** Hanya instal **ChainSafe Snap yang telah diaudit**; tinjau izin sebelum menyetujui.

---

## **7. Periksa Komponen Alamat**

1. Buka bagian **Terima** - Unified Address kamu akan ditampilkan secara default.  
2. Salin Unified Address dan kunjungi [Block ExplorerZcash](https://mainnet.zcashexplorer.app/).  
3. Tempelkan Unified Address kamu ke bilah pencarian.  
4. Sekarang kamu akan melihat semua komponen dari Unified Address, yang meliputi:``` 
   Orchard Address  
   Sapling Address  
   Transparent Address
``` 

![Address-components](/content-images/SyPR2f2_gg-3907c5bf58.webp)



---

## **Catatan Tambahan**

> Gunakan [**versi MetaMask terbaru**](https://chromewebstore.google.com/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en) - rilis publik mendukung Snaps.  
> Proof terlindungi mungkin memakan waktu, WebAssembly menangani komputasi di dalam browser.  
> Pemulihan sangat mudah, instal MetaMask dan Snap tersebut, lalu impor frasa pemulihan kamu yang sudah ada.  
> Snap ini secara default menggunakan **ZEC terlindungi**, alamat transparan **bukanlah fokus utamanya**.  
> Gunakan [zcashblockexplorer.com](https://zcashblockexplorer.com) untuk konfirmasi transaksi.











