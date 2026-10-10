![Tor logo](/content-images/_unavailable.svg)

# **Arti: Klien Tor Generasi Berikutnya dalam Rust**
![Atri Logo](/content-images/_unavailable.svg)

**Arti** adalah inisiatif dari Tor Project untuk membangun client **Tor** generasi berikutnya menggunakan bahasa pemrograman **Rust**. Arti dirancang agar modular, dapat disematkan, dan siap digunakan untuk produksi, guna menyediakan implementasi protokol anonimitas **Tor** yang lebih aman dan efisien. Dengan **Arti versi 1.4.0**, beberapa pembaruan signifikan telah diperkenalkan:

- **Antarmuka RPC baru** untuk interaksi yang lebih ditingkatkan.
- Pekerjaan persiapan untuk **dukungan relay**.
- Peningkatan dalam **resistansi denial-of-service pada layanan onion di sisi layanan**.

Rilis ini melanjutkan upaya Tor Project untuk menawarkan keamanan, performa, dan modularitas yang lebih baik bagi pengguna dan developer Tor.


---


## **Instalasi Arti Client**

Ikuti langkah-langkah ini untuk menginstal dan menjalankan **Arti** sebagai proxy SOCKS di sistem kamu.

---

### **Langkah 1: Siapkan Lingkungan Pengembangan Rust**

Sebelum kamu dapat membangun Arti dari sumbernya, kamu perlu menginstal versi stabil terbaru dari **Rust**.

#### Untuk Menginstal Rust:

1. Kunjungi situs web resmi [Rust](https://www.rust-lang.org/).
2. Ikuti instruksi instalasi untuk sistem operasi kamu.
3. Verifikasi instalasi dengan menjalankan:
   
   ```sh
   rustc --version
   ```

Ini akan mengonfirmasi bahwa kamu telah menginstal versi stabil terbaru dari Rust di sistem kamu.

#### **Catatan untuk Pengguna Windows**:
- Rust dapat diinstal di Windows melalui [**Rustup**](https://rustup.rs/), sebuah installer toolchain. Pastikan kamu juga telah menyiapkan lingkungan build yang kompatibel (kamu mungkin memerlukan **Visual Studio Build Tools** di Windows).
  
---

### **Langkah 2: Clone Repositori Arti**

Untuk mendapatkan versi terbaru dari klien Arti, kamu perlu melakukan clone repositori dari [**GitLab**](https://gitlab.torproject.org/tpo/core/arti).

#### Langkah-langkah:
1. Buka terminal kamu (Command Prompt, PowerShell, atau Git Bash di Windows).
2. Jalankan perintah berikut untuk melakukan clone pada repositori:
   
   ```sh
   git clone https://gitlab.torproject.org/tpo/core/arti.git
   ```
4. Navigasi ke direktori *arti* yang baru dibuat:
   
   ```sh
   cd arti
   ```

Ini akan menarik kode sumber Arti ke mesin lokal kamu.

---

### **Langkah 3: Membangun Biner Arti**

Setelah kamu melakukan kloning repositori, kamu perlu membuild Arti menggunakan **Cargo**, yang merupakan package manager dan alat build milik Rust.

#### Untuk Membangun Arti:
1. Di terminal, jalankan perintah berikut:
   ```sh
   cargo build --release
   ```

Perintah ini mengompilasi kode Arti dan mengoptimalkannya untuk produksi (flag *--release*). Binary akan dibuat di direktori *target/release*.

#### Lokasi Biner yang Dikompilasi:
- Setelah proses build, biner Arti akan berada di:  
  ```sh
  target/release/arti
  ```

Kamu dapat menjalankan biner ini secara langsung dari terminal.

---

### **Langkah 4: Jalankan Arti SOCKS Proxy**

Untuk menggunakan Arti sebagai proxy SOCKS (yang akan mengarahkan lalu lintas internet kamu melalui jaringan Tor), kamu perlu memulai proxy tersebut.

#### Untuk Memulai SOCKS Proxy:
1. Jalankan perintah berikut:
   ```sh
   ./target/release/arti proxy -p 9150
   ```

Perintah ini menjalankan Arti sebagai **proxy SOCKS5** pada **port 9150**, yang merupakan port default yang digunakan oleh Tor untuk lalu lintas SOCKS.

---

### **Langkah 5: Konfigurasi Aplikasi untuk Menggunakan Arti**

Setelah Arti berjalan sebagai proxy SOCKS, kamu perlu mengonfigurasi aplikasi kamu untuk menggunakannya guna merutekan lalu lintas melalui jaringan Tor.

#### Langkah-langkah:
1. Di pengaturan aplikasi kamu (misalnya, browser web, aplikasi terminal), cari **pengaturan proxy**.
2. Atur **SOCKS5 proxy** ke *localhost:9150*.

Ini akan mengarahkan semua trafik dari aplikasi kamu melalui **jaringan Tor** menggunakan Arti sebagai perantara.

---

## **Arti Integrasi dengan Jaringan Tor**

Berikut adalah diagram sederhana untuk mengilustrasikan bagaimana Arti bekerja bersama dengan jaringan Tor:


```plaintext
[Application] --(SOCKS5)--> [Arti SOCKS Proxy] --(Tor Protocol)--> [Tor Network]
```

- **Aplikasi** terhubung ke **Arti SOCKS Proxy** menggunakan protokol **SOCKS5**.
- Arti kemudian berkomunikasi dengan **jaringan Tor**, memastikan bahwa trafik kamu dianonimkan saat melewati jaringan tersebut.

---

## **Repositori GitLab dan Kontribusi**

Jika kamu tertarik untuk berkontribusi pada pengembangan **Arti**, kamu dapat menjelajahi kodenya dan berkontribusi melalui **GitLab**.

- **Link Repositori**: [Arti GitLab Repository](https://gitlab.torproject.org/tpo/core/arti)
- **Klon Repositori**:
  ```sh
  git clone https://gitlab.torproject.org/tpo/core/arti.git
  ```

### **Forking dan Berkontribusi**:
1. **Fork** repositori di GitLab (memerlukan akun GitLab).
2. Hubungkan repositori hasil fork kamu ke pengaturan lokal kamu:
   ```sh
   git remote add _name_ git@gitlab.torproject.org:_name_/arti.git
   git fetch _name_
   ```
   Ganti *_name_* dengan username GitLab kamu.

3. **Push perubahan** ke fork kamu:
   ```sh
   git push _name_ main
   ```

4. **Buat Merge Request (MR)** di GitLab:
   Buka bagian Merge Request pada fork GitLab kamu:
   ```plaintext
   https://gitlab.torproject.org/_name_/arti/-/merge_requests
   ```

### **Panduan Merge Request**:
- **Jangan melakukan rebase dan squash commit selama proses review**.
- Jika diperlukan, gunakan *fixup!* atau *squash!* untuk auto-squashing commit.
- Berusahalah untuk **menambahkan commit baru** alih-alih melakukan squash selama siklus review.

---

### **Catatan Tambahan**:

- **Binary yang Sudah Jadi**: Hingga saat ini, **Arti** tidak menyediakan binary yang sudah jadi secara resmi. Kamu harus membangun client dari source seperti yang dijelaskan di atas.
- **Pengetahuan Rust**: Jika kamu berkontribusi ke Arti, perlu dicatat bahwa codebase masih terus berkembang, dan mungkin akan ada perubahan atau refactoring seiring dengan penambahan fitur baru.

---



Jika kamu tertarik untuk berkontribusi pada proyek ini, silakan periksa kodenya, fork repositori ini, dan ajukan Merge Request. Untuk informasi lebih lanjut, pembaruan, dan pemecahan masalah, silakan merujuk ke [Repositori GitLab ](https://gitlab.torproject.org/tpo/core/arti). 

Nikmati pengalamanmu bersama **Arti** dan selamat melakukan hacking!

--- 
