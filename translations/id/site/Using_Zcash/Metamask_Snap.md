<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Metamask_Snap.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# MetaMask Zcash Snap Panduan Integrasi

> Simpan dan kirim ZEC terlindungi dari ekstensi browser MetaMask, menggunakan Zcash Snap milik ChainSafe dan dompet web WebZjs.

## Ringkasan

* ChainSafe Zcash Snap menambahkan ZEC terlindungi ke MetaMask di desktop (Chrome, Edge, Firefox). Kamu tidak memerlukan software Zcash terpisah.
* Kunci Zcash kamu berasal dari frasa pemulihan MetaMask kamu. Frasa itu kini melindungi ETH dan ZEC kamu.
* Kamu mengelola ZEC melalui dompet WebZjs di webzjs.chainsafe.dev, bukan melalui daftar aset MetaMask.
* Akun kamu memiliki alamat terpadu, jadi pengirim membayar kamu melalui pool paling privat yang didukungnya.
* Isi saldo dengan melakukan swap (misalnya ETH ke ZEC) atau menarik ZEC dari exchange ke alamat terlindungi kamu.
* Pemulihan: instal ulang MetaMask dan Snap, lalu impor frasa pemulihan yang sudah kamu miliki.

## Penjelasan Inti

MetaMask Snap adalah add-on kecil dalam sandbox yang mengajarkan blockchain baru kepada MetaMask. Snap Zcash, yang dibuat oleh ChainSafe dan diaudit oleh Hacken, memungkinkan MetaMask membuat kunci Zcash dari frasa pemulihan yang sudah kamu miliki dan menandatangani transaksi Zcash.

MetaMask sendiri tidak menampilkan saldo ZEC. Sebagai gantinya, dompet web WebZjs terhubung ke Snap, melakukan sinkronisasi dengan jaringan Zcash melalui server lightwalletd, lalu menampilkan alamat dan saldo kamu. Proof terlindungi dihitung di browser kamu menggunakan WebAssembly, sehingga pengiriman bisa memerlukan waktu.

Langkah-langkah di bawah ini mencakup pemasangan Snap, menghubungkan WebZjs, mengisi saldo dompet, mengirim dan menerima, serta memeriksa bagian-bagian alamat terpadu kamu.

## Panduan Lengkap

Untuk panduan langkah demi langkah dengan penjelasan visual, tonton panduan [**YouTube**](https://www.youtube.com/watch?v=UJh9Ilkohdw) ini:

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
     

MetaMask kini mendukung **Zcash terlindungi (ZEC)** melalui **Zcash Snap yang dikembangkan oleh ChainSafe**, sehingga kamu dapat mengirim, menerima, dan mengelola ZEC privat langsung di dompet browser kamu. Diaudit oleh **Hacken** dan tercantum di **Direktori Snaps resmi MetaMask**, fitur ini tidak memerlukan **software Zcash terpisah**—cukup MetaMask dan Snap.

---

## **Prasyarat**


> Ekstensi [**MetaMask**](https://snaps.metamask.io/snap/npm/zcashcommunitygrants/webzjs-zcash-snap/) (khusus desktop)—Chrome, Edge, atau Firefox.
> Akun MetaMask—Frasa pemulihan harus diamankan; Snap membuat kunci Zcash dari frasa tersebut.  
> Koneksi Internet Stabil—Untuk sinkronisasi dengan jaringan Zcash.  
> Dana—ETH untuk ditukar dengan ZEC atau ZEC dari exchange.

> **Tips:** Jaga frasa pemulihan MetaMask kamu—frasa ini mengendalikan ETH dan ZEC.

---

## **1. Instal Zcash Snap**

1. Buka [**Direktori Snaps MetaMask**](https://snaps.metamask.io/snap/npm/zcashcommunitygrants/webzjs-zcash-snap/).  
2. Cari [**"Zcash WebZjs Wallet"**](https://snaps.metamask.io/snap/npm/zcashcommunitygrants/webzjs-zcash-snap/) atau [**"WebZjs Zcash Snap"**](https://snaps.metamask.io/snap/npm/zcashcommunitygrants/webzjs-zcash-snap/).  
3. Klik **Instal/Tambahkan ke MetaMask**.
4. Setujui izin seperti:
   ```
      Manage Zcash accounts 
      Store data on your device
   ```

![Zcash-snap-install](/content-images/Hy5MSG2Oex-42d0c5b346.webp)


---

## **2. (Opsional) Tambahkan Jaringan Zcash**

Di MetaMask, pilih **Tambahkan Jaringan** dan masukkan:

Untuk **BNB SmartChain**;
```markdown
-  Name: BNB Smart Chain
-  RPC URL: https://bsc-dataseed.binance.org
-  Chain ID: 56
-  Symbol: BNB
-  Block Explorer URL: https://bscscan.com
```
Ini akan mengaktifkan informasi jaringan dan tautan penjelajah.
![Add-a-custom-Net....](/content-images/S1hq7f2Oel-e1ca8b9044.webp)

Untuk **Mainnet Zcash**;
```markdown
- Name: Zcash Mainnet  
- RPC URL: https://zjs.zec.rocks 
- Symbol: ZEC
```
`https://zjs.zec.rocks` adalah server lightwalletd yang kompatibel dengan WebZjs (gRPC-web), yang dijalankan oleh [zec.rocks](https://zec.rocks) (@emersonian). Untuk testnet, gunakan `https://zjs.zec.rocks/testnet`. Jika kamu menjalankan sendiri dompet web WebZjs, tetapkan nilai ini sebagai `LIGHTWALLETD_PROXY`.

---

## **3. Hubungkan ke Dompet ChainSafe WebZjs**

1. Kunjungi [webzjs.chainsafe.dev](https://webzjs.chainsafe.dev).  
2. Klik **Hubungkan MetaMask Snap**.  

![Zcash-web-wallet](/content-images/Sk8nSz3dgl-98ce36cc67.webp)

3. Setujui koneksi.  
4. Lihat ringkasan akun Zcash kamu, termasuk:
   - Alamat terpadu dan alamat transparan

![Account-summary-unif....](/content-images/r17c_Mhdel-f4963826d5.webp)


5. Tunggu hingga sinkronisasi selesai.




---

## **4. Isi Saldo Dompet**

> **Swap ETH -> ZEC**—Gunakan layanan seperti **LeoDex** dan kirim ke alamat terlindungi kamu.  
> **Penarikan dari Exchange**—Tarik ZEC yang sudah dibeli ke alamat terlindungi WebZjs kamu.  

![LeoDex-SWAP](/content-images/HyLQ0G2ugg-8d82ef24f6.webp)


> => Gunakan alamat terlindungi (z) untuk **privasi penuh**.

---

## **5. Kirim / Terima ZEC**

1. Di **WebZjs**, buka **Transfer Saldo**.  
2. Masukkan:
```
   - Shielded recipient address  
   - Amount
```
   ![Transfer-Balance](/content-images/rkvcFfhdex-bd55d079eb.webp)

4. Konfirmasikan transaksi di MetaMask (tandatangani transaksi).  
5. Dana yang diterima akan muncul di WebZjs setelah dikonfirmasi.

---

## **6. Verifikasi / Pemecahan Masalah**

> Periksa **WebZjs** untuk melihat saldo terbaru **(MetaMask tidak mencantumkan ZEC secara langsung)**.  
> Jika terjadi masalah:
  ```
  - Confirm you have the official ChainSafe Snap.  
  - Check correct network settings.  
  - Ensure correct address format.  
  - Reconnect via **Connect Snap** if needed.
  ``` 

> **Tips Keamanan:** Instal hanya **ChainSafe Snap yang diaudit**; tinjau izin sebelum menyetujuinya.

---

## **7. Periksa Komponen Alamat**

1. Buka bagian **Terima**—Alamat Terpadu kamu akan ditampilkan secara default.  
2. Salin Alamat Terpadu dan kunjungi [Zcash Block Explorer](https://mainnet.zcashexplorer.app/).  
3. Tempel Alamat Terpadu kamu di kolom pencarian.  
4. Kamu akan melihat semua komponen Alamat Terpadu, yang mencakup:
``` 
   Orchard Address  
   Sapling Address  
   Transparent Address
``` 

![Address-components](/content-images/SyPR2f2_gg-3907c5bf58.webp)



---

## **Catatan Tambahan**

> Gunakan versi MetaMask terbaru[](https://chromewebstore.google.com/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en)—rilis publik mendukung Snaps.  
> Proof terlindungi mungkin memerlukan waktu; WebAssembly menangani komputasi di browser.  
> Pemulihan mudah: instal MetaMask dan Snap, lalu impor seed yang sudah kamu miliki.  
> Snap secara default menggunakan **ZEC terlindungi**; alamat transparan **bukan fokusnya**.  
> Gunakan [mainnet.zcashexplorer.app](https://mainnet.zcashexplorer.app) untuk mengonfirmasi transaksi.
