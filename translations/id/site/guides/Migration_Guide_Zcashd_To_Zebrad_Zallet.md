# Panduan Migrasi: Dari zcashd ke Zebrad/Zallet

Full node zcashd tradisional, yang dikelola oleh *Electric Coin Company (ECC)* / *Zodl*, telah digantikan oleh Zebra dan Zallet. zcashd mencapai penghentian akhir-dukungan pada 18 Juli 2026 dan tidak lagi berjalan.

- Zebra adalah implementasi Rust modern dari protokol Zcash yang dikembangkan oleh Zcash Foundation
- Zallet adalah dompet ringan yang dibuat untuk berinteraksi secara mulus dengan node Zebra yang dikembangkan oleh Zodl

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![Diagram: zcashd splitting into zebrad for node duties and Zallet for wallet duties](/content-images/SJNBsSYTel-dfd19f34e4.webp)
</div>

Panduan ini akan membimbing kamu melalui migrasi dari **Zcashd** ke **Zebrad** dan **Zallet**, termasuk pengaturan, impor dompet, dan pemecahan masalah umum terkait migrasi.

---

## zcashd berhenti berjalan pada 18 Juli 2026

**Apa artinya ini**

- zcashd telah mencapai penghentian dukungan pada 18 Juli 2026. Ia tidak akan sinkron ke ujung chain lagi, dan tidak dapat mengirim atau menerima dana. Ini sudah selesai, bukan direncanakan.
- Dua tugas zcashd kini terpisah: **zebrad** adalah full node, dan **Zallet** adalah dompet.
- Zallet sedang dalam tahap **beta**. Perubahan yang merusak dapat terjadi di antara rilis, dan beberapa metode JSON-RPC zcashd belum diimplementasikan. Periksa matriks status metode [method status matrix](https://zcash.github.io/zallet/) sebelum kamu bergantung pada pemanggilan tertentu.
- Jika kamu masih memegang dana **Sprout**, baca peringatan di langkah 6 terlebih dahulu. Zallet tidak mendukung pool Sprout, dan cara biasa untuk memindahkan dana tersebut memerlukan zcashd yang sedang berjalan.

**Mengapa Bermigrasi - Lebih dari Sekadar Depresiasi**

Bahkan jika mengesampingkan masalah deprecation, ada alasan kuat untuk beralih:
- Keamanan & Ketangguhan: Keamanan memori Rust dan tooling modern mengurangi risiko kerentanan.
- Performa & Efisiensi: Zebrad dirancang untuk paralelisme, penggunaan sumber daya yang lebih efisien, dan sinkronisasi yang lebih cepat.
- Arsitektur Modular: Memisahkan logika node (Zebrad) dari UI dompet (Zallet) menawarkan batasan yang lebih jelas dan jalur peningkatan yang lebih baik.
- Kompatibilitas Ekosistem Masa Depan: Tools, peningkatan, dan seluruh ekosistem Zcash akan semakin menargetkan Zebrad/Zallet.
- Ketenangan Pikiran: Hindari terjebak menjalankan komponen yang sudah deprecated dan tidak lagi didukung.

### Sekarang mari kita pelajari panduan Migrasi ini lebih dalam

**1. Cadangkan Semuanya**
* Cadangkan wallet.dat kamu (atau file wallet / key store lainnya) dari zcashd node milikmu.

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![bash (1)](/content-images/SJ_0mUtTxg-1441185a72.svg)
</div>

* Simpan zcash.conf dan semua pengaturan kustom kamu.
* Ekspor salinan dari skrip RPC atau otomatisasi apa pun yang kamu gunakan.
* Verifikasi bahwa cadangan kamu valid (misalnya, di lingkungan lain, coba buka atau periksa cadangan tersebut).
* Tinjau metode JSON-RPC mana yang saat ini kamu andalkan.
* Bandingkan dengan tabel kompatibilitas terencana yang dikelola di situs dukungan [Zcash](https://z.cash/support/zcashd-deprecation/).
* Bersiaplah untuk perubahan atau metode yang hilang (beberapa mungkin memerlukan solusi alternatif atau adaptasi).

**2. Persyaratan Sistem & Ruang Disk**
* Ruang disk adalah persyaratan yang sering diremehkan orang. Rantai Zcash telah melewati **270 GB** pada Agustus 2026, jadi sediakan setidaknya **300 GB** ruang kosong, gunakan SSD jika kamu bisa.
* Pastikan mesin kamu memiliki jaringan, CPU, dan RAM yang stabil.
* Koneksi internet 
* Jika kamu berencana untuk melakukan kompilasi dari source, pastikan Rust & Cargo sudah terinstal.

**3. Instal / Setup Zebrad**
Kamu bisa mengunduh biner yang sudah jadi atau membangunnya dari source.
* Zcash Foundation merilis rilis dan biner untuk Zebra. Misalnya, kamu mungkin menggunakan skrip instalasi atau mengunduh biner yang sesuai untuk OS kamu.

* Perhatikan bahwa pada versi Zebra terbaru, [endpoint RPC tidak lagi diaktifkan secara default di Docker.](https://zfnd.org/zebra-2-3-0-release/)

**Opsi A: Instal melalui biner yang sudah jadi**  
Pada **Linux**/**macOS**:

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![bash (2)](/content-images/HJhYu8Y6el-d2198f22c9.svg)
</div>

Ini menginstal versi stabil terbaru dari zebrad.

**Opsi B: Membangun dari sumber**

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![bash (3)](/content-images/Syg8FUK6eg-b4557e52e0.svg)
</div>

Setelah melakukan build, pindahkan file binary ke dalam path kamu:

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![migration 11](/content-images/BJ0zjLY6ll-f77354d701.webp)
</div>

**4. Konfigurasi & Peluncuran**  
Buat konfigurasi default:

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![migration2](/content-images/HJV1C8tTxx-5823395651.webp)
</div>

Edit **zebrad.toml** sesuai preferensi kamu (alamat listen, port, direktori state, caching).

**Mulai node:**

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![image](/content-images/H1KPkvt6gl-864c48ca40.webp)
</div>

Node akan mulai melakukan sinkronisasi dari genesis - perkirakan beberapa jam (atau lebih) tergantung pada perangkat keras dan jaringan.

**5. Instal / Setup Zallet (Dompet)**

Zallet dirancang untuk menggantikan bagian dompet dari zcashd.

Periksa halaman rilis Zallet GitHub untuk mendapatkan file binary.

**Atau bangun dari sumber (build from source):**

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![image](/content-images/SyUFxvFTex-5bb10ee1d3.webp)
</div>

* Luncurkan GUI atau CLI (sesuai dengan instalasi yang kamu miliki).
* Konfigurasikan untuk terhubung ke node Zebrad lokal kamu melalui endpoint RPC atau API.

**6. Mengimpor Dompet zcashd Kamu ke dalam Zallet**

Kamu tidak memerlukan zcashd yang sedang berjalan untuk ini. Zallet membaca file `wallet.dat` secara langsung, hal ini penting karena zcashd tidak lagi dapat dimulai.

> **Tetap simpan `wallet.dat`.** Migrasi akan melaporkan apa pun yang tidak dapat direpresentasikannya dalam dompet Zallet alih-alih mengimpornya, dan materi kunci tersebut kemudian hanya ada di `wallet.dat`. Jangan menghapusnya setelah melakukan migrasi.

Jalankan `zallet init-wallet-encryption` terlebih dahulu. Zallet mengenkripsi materi kunci ke sebuah identitas age, dan identitas tersebut harus sudah ada sebelum kunci apa pun diimpor.

Kemudian konversi konfigurasi dan dompet kamu:

```bash
# translate zcash.conf into zallet.toml
zallet migrate-zcash-conf --zcashd-datadir /path/to/zcashd/datadir -o /path/to/zallet/datadir/zallet.toml

# import wallet.dat into Zallet's wallet.db
zallet migrate-zcashd-wallet --zcashd-datadir /path/to/zcashd/datadir
```

`migrate-zcashd-wallet` hanya tersedia pada build dengan fitur `zcashd-import`, dan membaca `wallet.dat` memerlukan utilitas `db_dump` dari Berkeley DB 6.2, versi yang digunakan oleh zcashd. Jika kamu memiliki lebih dari satu file dompet, jalankan perintah tersebut satu kali per file dan tambahkan `--allow-multiple-wallet-imports` pada proses selanjutnya; masing-masing akan menjadi set akun tersendiri. `rpcuser` dan `rpcpassword` kamu tidak akan terbawa, karena JSON-RPC milik Zallet menggunakan autentikasi cookie secara default; tambahkan kredensial dengan `zallet add-rpc-user` jika kamu membutuhkannya.

**Apa yang tersampaikan**

* Seed mnemonic dan kunci yang diturunkan darinya, dengan akun yang dibangun ulang agar sesuai dengan dompet zcashd
* Kunci spending Sapling yang diimpor secara mandiri dan kunci transparan
* Entri watch-only transparan yang menyertakan public key atau redeem script mereka
* Tanggal pembuatan akun, sehingga pemindaian chain dimulai pada height yang tepat

**Apa yang tidak terbawa.** Hal-hal ini dilaporkan dengan jumlah hitungan, bukan diimpor:

* **spending key Sprout dan dana.** Zallet tidak mendukung pool Sprout. Rute yang terdokumentasi adalah memindahkan dana Sprout keluar menggunakan zcashd sebelum menghentikannya, dan hal itu tidak lagi memungkinkan. Jika ini memengaruhi kamu, tanyakan di Discord](https://discord.gg/xpzPR53xtU) R&D [Zcash atau ](https://forum.zcashcommunity.com/)forum komunitas[ sebelum melakukan hal lainnya.
* Entri buku alamat
* Entri watch-only yang disimpan tanpa public key atau redeem script, dan entri dengan public key yang tidak terkompresi
* Dompet Regtest

**Mencadangkan setelahnya.** Sebuah mnemonik saja bukanlah cadangan yang lengkap, karena kunci yang diimpor hanya ada di dalam database dompet. Simpan salinan aman dari `wallet.db`, file identitas enkripsi lama yang dinamai oleh opsi `keystore.encryption_identity`, dan frasa pemulihan kamu, serta simpan `wallet.dat` yang asli. Perhatikan bahwa `wallet.db` itu sendiri tidak terenkripsi: file ini menyimpan riwayat transaksi dan viewing key kamu secara terbuka, jadi simpanlah cadangan tersebut di tempat yang aman.

**Pemindaian Ulang & Sinkronisasi Dompet**

* Setelah kunci diimpor, Zallet akan memicu pemindaian ulang rantai melalui Zebrad.
* Berikan waktu sejenak agar Zallet dapat membangun kembali saldo dan riwayat transaksi kamu.

**7. Verifikasi Saldo dan Sinkronisasi**

Setelah diimpor, Zallet akan terhubung ke node Zebrad kamu dan memindai ulang blockchain.
Saat sinkronisasi selesai, saldo dan transaksi kamu seharusnya muncul persis seperti sebelumnya.

Kamu dapat memverifikasi status sinkronisasi node kamu dengan menjalankan:

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![image](/content-images/SyIyVDY6xl-10d6bed7b8.webp)
</div>

Atau periksa log.

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![image](/content-images/r1HfVPF6gg-b6b76e9907.webp)
</div>

**8. Pemecahan Masalah**

<div className="overflow-x-auto my-8 rounded-2xl border border-slate-200 dark:border-slate-700">
  <table className="w-full min-w-full border-collapse text-sm">
    <thead className="bg-slate-100 dark:bg-slate-800">
      <tr>
        <th className="px-6 py-4 text-left font-semibold text-slate-900 dark:text-white">Masalah</th>
        <th className="px-6 py-4 text-left font-semibold text-slate-900 dark:text-white">Kemungkinan Penyebab</th>
        <th className="px-6 py-4 text-left font-semibold text-slate-900 dark:text-white">Solusi</th>
      </tr>
    </thead>
    <tbody>
      <tr className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-900/50">
        <td className="px-6 py-4">Zebrad tidak mau berjalan</td>
        <td className="px-6 py-4">Port sedang digunakan atau konfigurasi buruk</td>
        <td className="px-6 py-4">Periksa **zebrad.toml** dan gunakan port yang bebas</td>
      </tr>
      <tr className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-900/50">
        <td className="px-6 py-4">Sinkronisasi lambat</td>
        <td className="px-6 py-4">Kongesti jaringan</td>
        <td className="px-6 py-4">Pastikan internet stabil, mulai ulang Zebrad</td>
      </tr>
      <tr className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-900/50">
        <td className="px-6 py-4">Dompet kehilangan transaksi</td>
        <td className="px-6 py-4">Impor key tidak lengkap</td>
        <td className="px-6 py-4">Impor ulang key atau pindai ulang di Zallet</td>
      </tr>
      <tr className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-900/50">
        <td className="px-6 py-4">Zallet tidak dapat terhubung ke node</td>
        <td className="px-6 py-4">Node tidak berjalan atau endpoint salah</td>
        <td className="px-6 py-4">Jalankan Zebrad dan verifikasi port RPC yang benar</td>
      </tr>
      <tr className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-900/50">
        <td className="px-6 py-4">Zallet crash</td>
        <td className="px-6 py-4">Build sudah usang</td>
        <td className="px-6 py-4">Perbarui ke rilis terbaru dari GitHub</td>
      </tr>
    </tbody>
  </table>
</div>

**9. Kesimpulan**

Beralih dari zcashd ke Zebrad dan Zallet memberi kamu pengalaman Zcash yang lebih cepat, aman, dan modern.
Dengan keamanan berbasis Rust, desain modular, dan tooling yang lebih baik, pengaturan ini memastikan node dan dompet kamu tetap siap menghadapi masa depan seiring dengan ekosistem Zcash yang terus berkembang.

Tip: Simpan kunci dompet kamu secara offline dan cadangkan data Zallet kamu secara rutin.
Kunjungi [zebra.zfnd.org](https://zebra.zfnd.org) untuk Zebra, dan [Buku Zallet](https://zcash.github.io/zallet/) atau repositori [Zallet](https://github.com/zcash/zallet) untuk Zallet. Bab [Migrating from zcashd](https://zcash.github.io/zallet/) dari Buku Zallet adalah referensi otoritatif untuk langkah 6.
