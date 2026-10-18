# Dari Nol ke Zero-Knowledge: Trusted Execution Environments (TEEs)

**Seri:** Dari Nol ke Zero Knowledge

Zero to Zero Knowledge kembali hadir dengan topik baru!  
Minggu ini kita mengeksplorasi **Trusted Execution Environments (TEEs)** - bagaimana teknologi ini digunakan dalam koin privasi dan aplikasi blockchain lainnya.

![Trusted Execution Environments intro](/content-images/Fquj-h2WcAIgSnL-b80c8614cd.webp)

---

## TEEs dan Blockchain: Properti Komplementer

Blockchain dan TEE memiliki kekuatan yang sangat saling melengkapi:

- **Blockchain** menjamin ketersediaan, persistensi state, dan memungkinkan verifikasi publik terhadap seluruh state - namun memiliki daya komputasi yang terbatas.
- **TEE** dapat melakukan tugas komputasi intensif secara privat - namun tidak memiliki persistensi state bawaan.

Bersama-sama, keduanya dapat menciptakan sistem penjaga privasi yang kuat.

---

## Secret Network: Privasi Berbasis TEE

**Secret Network** memanfaatkan teknologi TEE (khususnya Intel SGX) untuk melakukan komputasi pada input, output, dan state yang terenkripsi.

Setiap node validator menjalankan chip Intel SGX. Lapisan konsensus dan komputasi digabungkan:

- Transaksi diproses di dalam enclave yang aman.  
- Data hanya didekripsi **di dalam TEE**.

Ini berbeda dari Zcash, yang menggunakan **zero-knowledge proofs** untuk privasi. Di Zcash, transaksi terlindungi disiarkan dan divalidasi secara publik tanpa ada data tambahan yang diungkapkan ke jaringan. Zcash Shielded Assets mengikuti prinsip yang sama.

![Secret Network TEE diagram](/content-images/FqulPjNX0AEfjRp-c7085732a2.webp)

Untuk penjelasan mendalam tentang bagaimana TEE diimplementasikan pada Secret Network, bacalah artikel luar biasa oleh @l_woetzel ini:  
https://carter-woetzel.medium.com/secret-network-tees-lets-talk-fud-vulnerability-33ca94b6df38

---

## Bagaimana Secret Network Mengamankan Key dan State

- **consensus encryption seed** dari jaringan disimpan di dalam TEE setiap validator.
- Kontrak menggunakan kunci enkripsi unik yang tidak dapat dipalsukan.
- Kontrak rahasia berjalan pada modul komputasi SDK Cosmos tetapi mendukung input/output dan state yang terenkripsi.

---

## Remote Attestation

**Remote Attestation** adalah proses untuk membuktikan bahwa sebuah enclave sedang berjalan di dalam lingkungan perangkat keras aman yang asli.

Ini memungkinkan pihak jarak jauh untuk memverifikasi:
- Aplikasi yang benar sedang berjalan  
- Aplikasi tidak telah dimodifikasi  
- Aplikasi sedang dieksekusi secara aman di dalam enclave Intel SGX

![Remote Attestation explanation](/content-images/FqumRjoWwAAeT-M-6eff73af4d.webp)

Enclave juga berisi kunci penandatanganan dan atestasi privat yang tidak dapat diakses dari luar.

![Enclave key protection](/content-images/Fqumv83XoAQq-MO-47c3ab77e0.webp)

---

## Penyegelan Data

Karena enclave bersifat stateless, data terkadang harus disimpan di luar dalam memori yang tidak tepercaya.

**Data Sealing** mengenkripsi data di dalam enclave menggunakan kunci yang diturunkan dari CPU. Blok terenkripsi tersebut hanya dapat dibuka kembali pada **sistem yang sama**.

![Data Sealing diagram](/content-images/FqunBwyWYAA-TR3-933c2b0e6f.webp)

---

## Oasis Network

**Oasis Network** juga menggunakan TEE melalui ParaTime rahasianya (misalnya Sapphire dan Cipher).

Data terenkripsi masuk ke dalam TEE bersama dengan smart contract. Data tersebut didekripsi, diproses, dan dienkripsi kembali sebelum meninggalkan enclave.

![Oasis Network TEE flow](/content-images/FqunJRDXwAMt4Ob-0e7969c7a8.webp)

---

## TEEs dalam Jaringan Proof-of-Stake

Banyak blockchain Proof-of-Stake (termasuk Secret dan Oasis) menggunakan **Tendermint** sebagai kerangka kerja konsensus mereka.

Untuk validator PoS:
- Key harus dikelola secara aman dan tidak boleh pernah terekspos dalam bentuk plaintext.
- Validator harus tetap online (berlaku penalti downtime).
- Menandatangani pesan yang bertentangan dapat menyebabkan slashing.

**TEEs** sangat ideal untuk menghasilkan dan menggunakan kunci validator secara aman.

![Tendermint & PoS security](/content-images/Fqun0HEX0AAooxW-7f6163ae1e.webp)

---

## Penelitian Zcash dan Proof-of-Stake

Zcash sedang aktif meneliti migrasi ke Proof-of-Stake.

- Baca penelitiannya: https://electriccoin.co/blog/zcash-proof-of-stake-research/  
- Tonton segmen dari Zcash Foundation Community Call ini yang menjelaskan berbagai desain PoS dan implikasi privasinya:
  
<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/22a-ROcb3AQ"
    title="Desain PoS"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div >

---

**Thread Asli oleh ZecHub (@ZecHub)**  
https://x.com/ZecHub/status/1633579659282587651

---

*Halaman ini disusun dari utas asli Zero to Zero Knowledge untuk wiki ZecHub.*