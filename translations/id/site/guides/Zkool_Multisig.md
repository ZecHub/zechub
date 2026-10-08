# Panduan Multisig Zkool

Panduan ini memberikan panduan langkah demi langkah tentang cara melakukan transaksi multisig menggunakan Zkool. Ini mencakup pembuatan akun, mengirim atau menerima dana, dan menyiapkan distributed key generation (DKG) untuk multisig. Tangkapan layar disertakan untuk setiap langkah utama.

## Tutorial

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/eagkCIv3BlQ"
    title="Demo Zkool | Penerus Ywallet"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div >


## 1. Membuat Akun


1. Buka **aplikasi Zkool** dan masuk ke **Akun Baru**.


![img1](/content-images/ee906e49-361a-49b6-9484-904897fe2e3f-074e400a9c.webp)

3. Masukkan **Nama Akun** (misalnya Anabelle).
   

![img2](/content-images/e9c325d3-8507-433a-a0c6-6e8c1ea2a254-a637810ed5.webp)


4. Secara opsional, aktifkan **Use Internal Change** atau **Restore Account** jika diperlukan.


5. Setelah dibuat, akun tersebut akan muncul di **Daftar Akun** kamu.


![img3](/content-images/c446cbca-fb3e-49b9-b1d4-fd727cd1b0fb-971cf76b33.webp)


## 2. Menerima Dana

Setiap akun menghasilkan beberapa tipe alamat:

**Unified Address**

**Hanya Alamat Orchard**

**Alamat Sapling**
  
**Alamat Transparan**


Pilih jenis yang ingin kamu gunakan dan bagikan untuk menerima dana.


![img4](/content-images/c9de5dfe-e9d7-423d-8d90-35c1a08ffd5d-a0d6a4e7b7.webp)





## 3. Mengirim Dana

1. Buka bagian **Penerima**.


![img5](/content-images/9f3a03b9-dd56-450c-a8dc-4370f9289138-3217d846b7.webp)


3. Masukkan **alamat penerima**.

4. Tentukan **jumlah** dan **memo** opsional.

5. Tinjau detail transaksi dan **konfirmasi**.


Setelah selesai, saldo akan diperbarui dalam daftar akun kamu.


![img6](/content-images/6e6da76b-cd18-4567-a5c0-74f07ddefc64-78dc3362dc.webp)


## 4. Melakukan Transaksi Multisig: Menyiapkan Distributed Key Generation (Multisig)

Multisig di Zkool menggunakan **Distributed Key Generation (DKG)** untuk memastikan beberapa partisipan mengontrol satu akun bersama.



### Langkah 1: Inisiasi DKG
Pilih sebuah **Nama** untuk dompet bersama (misalnya Anabelle).

Atur **Jumlah Peserta**.
  
Pilih **ID Peserta** kamu.
  
Definisikan **Jumlah Penanda Tangan yang Dibutuhkan (Threshold)**.
    
Pilih **Akun Pendanaan**.
  

![img7](/content-images/8a90ca85-5439-4937-b16d-a570e69d55f0-1477202a57.webp)



### Langkah 2: Tambahkan Alamat Peserta
- Masukkan **Unified Address** setiap peserta (disarankan).


**Catatan:** Jika kamu hanya menggunakan alamat Orchard atau hanya Sapling, multisig akan terbatas pada pool tersebut saja (Orchard atau Sapling).  
Ini berarti dompet bersama tidak dapat menerima dana dari pool lain.  
Untuk kompatibilitas dan fleksibilitas maksimal, selalu gunakan **Unified Addresses**.


### Langkah 3: Jalankan Ronde DKG
Tunggu semua partisipan untuk saling bertukar paket **ronde 1** dan **ronde 2**.


![img8](/content-images/cdaf6e00-3cb0-4774-8a96-5ded19bf31c4-b6bb50bbab.webp)



### Langkah 4: Finalisasi Alamat Bersama
Setelah selesai, sebuah **alamat bersama** akan dibuat.


![img9](/content-images/741d1bc6-0102-4e67-bb83-9a1c184bd747-a508ea0371.webp)



## Kesimpulan

Dengan menggunakan Zkool, kamu dapat: membuat akun, mengirim dan menerima dana, serta menyiapkan **dompet multisig** menggunakan Distributed Key Generation. Hal ini memastikan **keamanan yang ditingkatkan** serta **pengelolaan dana yang kolaboratif dan privat**.

