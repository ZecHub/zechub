<a href="https://github.com/Zechub/zechub/edit/main/site/ZFAV_Club/Guides_for_Creators/Community_Broadcasting.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Halaman"/>
</a>

# Siaran Komunitas menggunakan VDO.Ninja dan OBS Studio

Tutorial singkat ini dibuat selama [DWeb Camp 2023](https://dwebcamp.org/) oleh sekelompok fellow dan sukarelawan. Tujuan dari latihan ini adalah untuk memanfaatkan penggunaan perangkat smartphone yang terhubung ke jaringan MESH offline untuk perekaman video dan streaming secara kolaboratif.

Kami menggunakan dua perangkat lunak sumber terbuka [OBS Studio (perangkat lunak Open Broadcaster)](https://obsproject.com/) dan [VDO.Ninja](https://vdo.ninja/). Perangkat lunak ini dapat diunduh dan dijalankan secara lokal di komputer kamu.

## OBS Studio (perangkat lunak Open Broadcaster)

OBS Studio adalah perangkat lunak gratis dan sumber terbuka untuk perekaman dan live streaming yang tersedia untuk berbagai sistem operasi. Perangkat lunak ini pertama kali dirilis pada tahun 2012 dan memiliki pengikut yang cukup besar di kalangan komunitas game streaming dan kreator konten video independen.

Antarmuka pengguna OBS Studio mungkin terlihat cukup menakutkan bagi pengguna baru. OBS Studio terbagi menjadi dua jendela yaitu "Preview" dan "Broadcast". Jendela preview menampilkan video yang tersedia (berbagai kamera seperti webcam, Iriun Webcam, OBS Virtual Camera, Video, dan sumber Browser) yang disebut sebagai "Scenes", dan "Broadcast" menampilkan live stream.

Untuk melakukan streaming dari aliran kamera jarak jauh dari VDO.ninja ke OBS Studio, kamu memulainya dengan menambahkan "Browser Source" baru melalui "Sources > Add > Browser". Di jendela baru, kamu dapat memasukkan URL sumber dari VDO.ninja dan memilih "Make source visible".

Sekarang kamu sudah bisa mulai menyiarkan stream jarak jauh tersebut.

## VDO.Ninja

[VDO.Ninja](https://vdo.ninja/) adalah aplikasi web gratis dan sumber terbuka yang memungkinkan kamu mengubah perangkat seluler menjadi kamera live streaming. Perangkat lunak ini dapat diunduh dan diterapkan ke komputer lokal kamu atau kamu dapat langsung menggunakan [versi online di https://vdo.ninja](https://vdo.ninja/).

Antarmuka VOD.Ninja sangat sederhana, kamu cukup buka VDO.Ninja di browser perangkat seluler kamu dan pilih "Add your camera to OBS". Kamu kemudian akan memilih kamera dan perangkat audio milikmu dari daftar perangkat yang tersedia lalu klik "Start". Setelah itu, kamu akan mendapatkan link "view" yang bisa ditambahkan ke OBS Studio.

## Mengarahkan panggilan komunitas dengan VDO.Ninja

Mulailah dengan membuka [VDO.ninja](http://VDO.ninja) menggunakan browser web kamu di desktop/laptop.

<a href="">
    <img src="/content-images/_unavailable.svg" alt="" width="300" height="400"/>
</a>


Untuk membuat ruangan baru dan mengarahkan siaran langsung panggilan komunitas kamu sendiri, klik Buat Ruangan.

Layar berikutnya akan meminta informasi dasar untuk menyiapkan ruangan kamu.

<a href="">
    <img src="/content-images/_unavailable.svg" alt="" width="400" height="400"/>
</a>

Setelah sebuah ruangan dibuat, sutradara memiliki banyak opsi kontrol yang tersedia pada layar berikutnya.

<a href="">
    <img src="/content-images/_unavailable.svg" alt="" width="400" height="400"/>
</a>


Saat orang-orang bergabung ke dalam ruanganmu, kamu sebagai direktur akan melihat semua opsi sumber dan kontrol muncul bersama dengan video dan audio mereka.

<a href="">
    <img src="/content-images/_unavailable.svg" alt="" width="400" height="300"/>
</a>


## FAQ

- Jenis kartu grafis video apa yang diperlukan untuk OBS Studio?

Kamu bisa menggunakan komputer pribadi dengan kartu grafis yang mumpuni dan memori yang besar, atau sebagai alternatif kamu bisa menggunakan hardware encoder [Teradek VidiU](https://www.bhphotovideo.com/c/product/1609186-REG/teradek_10_0235_vidiu_x_modem.html?gclid=EAIaIQobChMIl4aIo7zX_wIVDhqtBh0PgwhxEAAYAiAAEgInufD_BwE)
- Apakah OBS memungkinkan kamu untuk melakukan penerjemahan langsung dan pembuatan caption?

Ada beberapa plugin kontribusi komunitas yang tampaknya menyediakan fitur tersebut. [https://github.com/eddieoz/OBS-live-translation](https://github.com/eddieoz/OBS-live-translation)

- Bisakah kamu mengembangkan plugin milikmu sendiri untuk OBS Studio?

Ya, OBS memiliki dukungan skrip lua dan python. Selain itu, ada juga JavaScript untuk Overlay dan webview.

- Apakah kita menggunakan efek *fade to black* secara langsung atau transisi?

Itu terserah kamu, produser!

- Apakah ada latensi saat kamu sedang melakukan streaming?

Hal ini sebagian besar bergantung pada tujuan ke mana kamu melakukan streaming. Sebagai contoh, YouTube mungkin mengalami penundaan selama satu menit atau lebih karena pemrosesan video yang dilakukan di server mereka sebelum disiarkan.

- Audio terputus saat menggunakan OBS pada mesin lambat dan saat melakukan green-screening

Gunakan encoder hardware atau gunakan stream yard
[https://support.streamyard.com/hc/en-us/articles/360056350852-How-to-Use-OBS-Virtual-Camera-with-StreamYard](https://support.streamyard.com/hc/en-us/articles/360056350852-How-to-Use-OBS-Virtual-Camera-with-StreamYard) atau [RiverSide.FM](http://riverside.fm/)

## Kredit

- Ryan
- Ajay
- Arky

## Sumber Daya

[https://obsproject.com/help](https://obsproject.com/help)

[https://docs.vdo.ninja/](https://docs.vdo.ninja/)

Jam Kerja: Komunitas media dan acara digital
[https://alex4d.com/notes/item/media-and-digital-event-community](https://alex4d.com/notes/item/media-and-digital-event-community)