<a href="https://github.com/zechub/zechub/edit/main/site/contribute/ZecWeekly_Newsletter.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Halaman"/>
</a>

# Buletin ZecWeekly

ZecWeekly adalah buletin yang dikirimkan setiap Minggu pagi. Buletin ini mencakup semua berita yang terjadi selama seminggu terakhir di ekosistem Zcash. Berita tersebut dikurasi setiap minggu oleh anggota komunitas dan semua tautan relevan ditambahkan ke dalam buletin. Silakan berlangganan buletin [di sini](https://zechub.substack.com/).

## Berkontribusi

Kontribusi newsletter akan bekerja paling baik jika satu kontributor menyiapkan edisi untuk minggu yang tepat, mengikuti thread bounty atau koordinasi yang sedang berjalan, dan mengirimkan pull request setelah tautan mingguan siap. Mohon jangan mengirimkan edisi mendatang sebelum ZecHub mengunggah atau mengonfirmasi tanggal untuk edisi tersebut. Pull request yang terlalu dini sering kali melewatkan pembaruan di akhir minggu, berbenturan dengan kurator yang telah ditugaskan, atau menggunakan tenggat waktu yang salah.

### 1. Konfirmasi edisi saat ini

Sebelum kamu mulai menulis:

- Periksa [ZEC Bounties](https://bounties.zechub.wiki/) untuk tugas newsletter saat ini.
- Tunggu hingga ditugaskan.
- Edisi newsletter berada dalam band XS dari kebijakan jumlah [bounty](https://bounties.zechub.wiki/docs/bounty-amounts). Angka ZEC pada bounty yang sedang berlangsung adalah jumlahnya, bukan tajuk lama apa pun di panduan kontribusi.

![ss](/content-images/149a802c-b64f-4969-ad89-e83ffecf568e-d5d8387145.webp)



### 2. Fork repositori ini

Jika kamu baru mengenal GitHub, gunakan alur kerja ini:

1. Buka repositori [ZecHub](https://github.com/ZecHub/zechub).
2. Klik **Fork** dan buat fork di bawah akun GitHub kamu.
3. Di dalam fork kamu, buat branch baru untuk edisi ini. Nama branch yang jelas akan sangat membantu, seperti `digest-may-30-2026`.
4. Pastikan pull request kamu menargetkan `ZecHub/zechub` sebagai repositori dasar dan `main` sebagai branch dasar.

Jika kamu menggunakan command line, alur kerja yang sama akan terlihat seperti ini:

```bash
git clone https://github.com/YOUR-USERNAME/zechub.git
cd zechub
git checkout -b digest-month-day-year
```

Ganti `YOUR-USERNAME` dengan username GitHub milikmu sendiri. URL di atas adalah placeholder dan tidak akan dapat diakses sebagaimana tertulis.

### 3. Buat file buletin

Gunakan templat buletin [](https://github.com/ZecHub/zechub/blob/main/newsletter/newslettertemplate.md) sebagai titik awal kamu. Edisi buletin harus ditempatkan di dalam folder [`newsletter`](https://github.com/ZecHub/zechub/tree/main/newsletter).

Saat membuat file:

- Sesuaikan format nama file yang diminta oleh issue atau yang digunakan oleh edisi yang baru saja diterima.
- Pertahankan urutan bagian yang sama seperti template kecuali jika tugas meminta format yang berbeda.
- Tambahkan tautan hanya dari minggu yang relevan.
- Tulis deskripsi singkat dan jelas untuk setiap tautan agar pembaca memahami mengapa hal tersebut penting.
- Terjemahkan atau ringkas sumber non-Bahasa Inggris ke dalam Bahasa Inggris jika diperlukan.
- Periksa setiap tautan sebelum membuka pull request.

### 4. Kumpulkan tautan pada waktu yang tepat

ZecWeekly biasanya mencakup aktivitas ekosistem Zcash untuk minggu berjalan dan diterbitkan menjelang akhir minggu. Waktu yang paling aman adalah:

- Mulailah mengumpulkan tautan setelah edisi buletin atau tugas saat ini dipublikasikan.
- Simpan draf selama minggu tersebut masih aktif.
- Kirimkan pull request mendekati tanggal pengiriman yang diminta, setelah kamu memeriksa pembaruan di akhir minggu.
- Jangan mengirimkan buletin untuk minggu mendatang sebelum tugas untuk tanggal tersebut tersedia atau sebelum ZecHub mengonfirmasi bahwa kamu harus menyiapkannya.

Jika sebuah isu menyatakan untuk mengirimkan paling lambat pada tanggal tertentu, ikuti tanggal tersebut. Jika terjadi konflik antara halaman ini dengan isu yang sedang berjalan, ikuti isu yang sedang berjalan.

### 5. Buka pull request

Saat file buletin kamu sudah siap:

1. Commit perubahan kamu ke fork kamu.
2. Buka pull request ke `ZecHub/zechub` pada branch `main`.
3. Gunakan judul yang sesuai dengan edisi, seperti `Zcash Ecosystem Digest | May 30th`.
4. Tautkan issue di dalam body pull request agar reviewer dapat menghubungkan pekerjaan tersebut dengan tugasnya.

Contoh isi pull request:

```md
Closes #ISSUE_NUMBER

Summary:
- Adds the Zcash Ecosystem Digest for Month Day.
- Uses the newsletter template and the current issue deadline.
- Checks links and descriptions for the requested week.
```

Setelah pull request dibuka, pantau komentar tinjauan yang ada. Jika ZecHub meminta pengeditan, perbarui branch yang sama alih-alih membuka pull request kedua untuk edisi yang sama.

### Contoh nyata

Gunakan pull request newsletter yang telah digabungkan ini sebagai contoh pengajuan yang diterima:

- Ringkasan Ekosistem [Zcash | 11 April](https://github.com/ZecHub/zechub/pull/1551)
- Ringkasan Ekosistem [Zcash | 28 Maret](https://github.com/ZecHub/zechub/pull/1544)
- Ringkasan Ekosistem [Zcash | 14 Februari](https://github.com/ZecHub/zechub/pull/1474)


![Merged ZecWeekly newsletter pull request example](/content-images/9230d68d-6406-4c8a-992c-df84e0d318d8-8893d2de55.webp)

Saat membandingkan pekerjaanmu dengan sebuah contoh, fokuslah pada lokasi file, format judul, urutan bagian, deskripsi tautan, dan apakah pull request tersebut terhubung kembali ke tugas yang benar.

### Kesalahan umum yang harus dihindari

- Membuka pull request sebelum tanggal edisi atau tugas dikonfirmasi.
- Mengerjakan sebuah issue yang sudah memiliki pull request tertaut.
- Mengirimkan pull request ke fork milikmu sendiri, bukan ke `ZecHub/zechub`.
- Menggunakan nama file yang salah atau meletakkan file di luar folder `newsletter`.
- Menyalin edisi lama tanpa memperbarui setiap tanggal, tautan, dan deskripsi.
- Menambahkan tautan dari minggu yang salah.
- Membiarkan tautan rusak, tautan duplikat, atau teks placeholder dari template.
- Membuka pull request baru setelah adanya komentar review, alih-alih memperbarui branch asli.

### Daftar periksa terakhir

Sebelum meminta peninjauan, pastikan bahwa:

- Tanggal isu atau tugas sesuai dengan file newsletter kamu.
- Tidak ada pull request terbuka lainnya yang sudah mencakup isu atau edisi yang sama.
- File berada di dalam folder `newsletter`.
- Bagian-bagian template sudah lengkap.
- Setiap tautan berfungsi dan memiliki deskripsi yang bermanfaat.
- Body pull request menautkan ke isu yang benar.
- Kamu bersedia melakukan pengeditan jika reviewer meminta perubahan.

## Edisi sebelumnya

[ZecWeekly Arsip](https://zechub.substack.com/p/archive)