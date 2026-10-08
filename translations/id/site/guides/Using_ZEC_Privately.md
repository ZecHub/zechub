<a href="https://github.com/zechub/zechub/edit/main/site/guides/Using_ZEC_Privately.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Halaman"/>
</a>

# Menggunakan ZEC, secara privat

#### Terlindungi (Privat) vs. Transparan

Seperti yang ada saat ini, terdapat dua jenis alamat dan transaksi di Zcash, yaitu terlindungi dan transparan. Perbedaan antara ZEC terlindungi dan transparan sangatlah sederhana. ZEC terlindungi menjaga uang dan transaksi kamu tetap privat, sedangkan ZEC transparan beroperasi seperti Bitcoin, yang sepenuhnya transparan. Ini berarti seseorang dapat melihat saldo dan semua transaksi kamu jika mereka mengetahui alamat kamu.

Saat orang pertama kali mulai menggunakan ZEC, mereka mungkin tidak menyadari jenis alamat apa yang sedang mereka gunakan. Hal ini dikarenakan tidak semua exchange mendukung penarikan ZEC terlindungi dan/atau penarikan ZEC terlindungi.

Jadi, sebagai contoh, jika seseorang menggunakan Coinbase dan mereka membeli ZEC, mereka akan membeli ZEC transparan dan hanya dapat menarik ZEC tersebut ke alamat transparan di sebuah dompet. Dompet seperti [Zodl](https://zodl.com/) dapat melakukan shielding dana yang dikirim ke alamat transparan untuk mengatasi hal ini, tetapi tidak semua orang menyadari hal tersebut. Singkatnya, banyak orang menggunakan ZEC sesuai dengan cara yang dimungkinkan oleh exchange atau dompet utama mereka.

#### Memastikan ZEC kamu terlindungi

Kami menyarankan agar setiap orang melakukan kustodial mandiri terhadap ZEC mereka. Artinya, pindahkan ZEC kamu dari exchange ke dompet. Cara terbaik untuk mengetahui apakah kamu menggunakan ZEC yang terlindungi, atau alias privat, adalah dengan melihat alamat tempat saldo tersebut berada. Jika alamat dimulai dengan "z" atau "u1", maka saldo kamu terlindungi. Jika alamat dimulai dengan "t", maka saldo tersebut transparan.

Umumnya ada dua jalur untuk mendapatkan ZEC terlindungi.

Dari sebuah exchange yang mendukung penarikan **terlindungi**:

1. Beli ZEC di sebuah exchange
  2. Mulai proses penarikan di exchange tersebut
  3. Buka dompet ZEC terlindungi milikmu dan pastikan alamat penerima dimulai dengan "u1" atau "z"
  4. Jalankan penarikan dari exchange milikmu

Dari sebuah exchange yang mendukung penarikan **transparan**:


1. Beli ZEC di sebuah exchange
  2. Mulai proses penarikan di exchange tersebut
  3. Buka dompet ZEC autoshielding milikmu dan gunakan alamat penerima transparan
  4. Jalankan penarikan dari exchange kamu
  5. Tunggu sepuluh konfirmasi, lalu pindahkan ZEC dari alamat transparan ke alamat terlindungi


Berikut adalah tutorial tentang cara menarik ZEC dari sebuah exchange. Perlu diperhatikan bahwa ini adalah penarikan terlindungi.

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/REUbkLzK7J4"
    title="Beli dan tarik ZEC ke dompet terlindungi dari Gemini"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div >
    

---
Berikut adalah tutorial tentang cara melindungi ZEC kamu dari alamat transparan ke alamat terlindungi.

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/W2msuzrxr3s"
    title="Lindungi ZEC kamu dari alamat transparan ke alamat terlindungi"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div >


---
Berikut adalah tutorial tentang cara membeli ZEC di Coinbase dan mengirimkannya ke Zodl.

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/Avweu5V9QRc"
    title="Coinbase + Zashi: Beli Zcash & Lindungi Secara Instan"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div >


#### Transaksi

Setelah memastikan bahwa ZEC kamu berada dalam dompet terlindungi yang mendukung alamat terlindungi, kini kamu dapat memutuskan apakah ingin melakukan transaksi dengan ZEC tersebut. Bertransaksi dengan ZEC sangatlah mudah. Kamu dapat mengirim ZEC ke alamat terlindungi maupun transparan tergantung pada preferensi orang tersebut. Seperti halnya transaksi moneter lainnya, ada kemungkinan kecil bahwa data seseorang dapat bocor. ZEC adalah yang terbaik dalam melawan kebocoran data, tetapi itu tidak berarti kamu boleh menggunakannya tanpa rasa waspada. Berikut adalah beberapa hal yang perlu kamu hindari saat bertransaksi dengan ZEC.

- Mengungkapkan alamat terlindungi kamu
- Menggunakan alamat terlindungi sebagai perantara untuk t-addresses (atau yang dikenal sebagai "mixing")
- Menjalankan, dan mengungkapkan aktivitas menjalankan, sejumlah besar transaksi dari terlindungi ke transparan
- Secara rutin memberi tahu orang lain di mana kamu membelanjakan ZEC terlindungi


Pada dasarnya, hal terbaik yang bisa kamu lakukan dengan ZEC milikmu adalah menyimpannya di dalam dompet terlindungi, melakukan transaksi antar alamat terlindungi, dan berhati-hati tentang bagaimana kamu menggunakan ZEC di tempat umum (misalnya, kedai kopi). Menjaga privasi datang dengan tingkat tanggung jawab tersendiri.

#### Sumber Daya

transaksi [Zcash](https://zechub.wiki/using-zcash/transactions)