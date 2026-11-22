<a href="https://github.com/zechub/zechub/edit/main/site/guides/Zcash_Stack.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Zcash Stack: Menjalankan Server Light Wallet di Kubernetes atau Docker

[Zcash Stack](https://github.com/zecrocks/zcash-stack) adalah kit deployment sumber terbuka dari tim di balik zec.rocks. Kit ini mengemas full node Zcash, server light wallet, dan tambahan opsional (Zaino, penjelajah blok, layanan tersembunyi Tor, DNS seeder, zecd, proxy gRPC-web untuk dompet browser) sebagai Helm chart untuk Kubernetes dan sebagai file Compose Docker. Semua server zec.rocks lightwalletd dijalankan dari chart ini. Proyek ini didanai oleh [Zcash Community Grants](https://zcashcommunitygrants.org/).

Halaman ini merangkum apa yang di-deploy oleh kit ini, apa yang perlu kamu siapkan sebelum menginstalnya, dan pengaturan yang paling penting. Panduan ini mengikuti chart versi **0.4.9** (dirilis 13 November 2026). [README chart](https://github.com/zecrocks/zcash-stack/blob/main/charts/zcash-stack/README.md) dan [catatan lokakarya](https://github.com/zecrocks/zcash-stack/tree/main/docs) proyek ini adalah referensi; baca keduanya sebelum menjalankan apa pun di lingkungan produksi.

## Ringkasan

- **Dua cara untuk memulai.** Helm chart untuk Kubernetes (k3s di perangkat keras NVMe milikmu adalah target utama; GKE Standard dan Autopilot juga bisa digunakan) dan file Compose Docker untuk satu mesin. Lokakarya merekomendasikan Docker jika kamu baru mulai menjalankan server dan Kubernetes jika kamu sudah mengelola sejumlah server.
- **Satu node chain dan satu server light wallet.** Konfigurasi yang direkomendasikan adalah Zebra + lightwalletd. Zakura dapat menggantikan Zebra sebagai backend, dan Zaino dapat menggantikan atau berjalan berdampingan dengan lightwalletd.
- **Siapkan ruang disk sekitar 600 GiB.** Status chain Zebra berukuran ~260 GiB pada Juni 2026 dan terus bertambah; cache light wallet menambah ~17 GiB. Sinkronisasi penuh memerlukan waktu berhari-hari, jadi chart ini dapat memulihkan data dari snapshot yang dipublikasikan.
- **Versi image pada chart sudah ditetapkan.** Pada versi 0.4.9, versinya adalah Zebra 7.0.0 (mengikuti NU7), lightwalletd v0.6.1, Zakura 1.8.6, dan Zaino 0.8.0. Perbarui chart sebelum peningkatan jaringan dan sebelum rilis Zakura mencapai ketinggian akhir dukungannya.
- **Daftarkan servermu.** Operator publik dapat menambahkan servernya ke monitor [hosh.zec.rocks](https://hosh.zec.rocks/zec) agar dompet dan pengguna dapat melihat apakah server tersebut aktif.

## Komponen yang di-deploy

Setiap komponen dapat diaktifkan atau dinonaktifkan melalui [`values.yaml`](https://github.com/zecrocks/zcash-stack/blob/main/charts/zcash-stack/values.yaml) chart. Hanya lightwalletd yang aktif secara default, dan komponen ini memerlukan node chain, jadi file contoh juga mengaktifkan Zebra.

| Komponen | Image dalam chart 0.4.9 | Default | Fungsinya |
|:--|:--|:--|:--|
| Zebra | `zfnd/zebra:7.0.0` | nonaktif (aktif dalam file contoh) | Full node; memvalidasi chain dan menyediakan RPC untuk komponen lainnya |
| Zakura | `zakuracore/zakura:1.8.6` | nonaktif | Fork Zebra; backend pengganti untuk lightwalletd atau Zaino sebagai alternatif Zebra |
| lightwalletd | `electriccoinco/lightwalletd:v0.6.1` | aktif | Server light wallet (gRPC) untuk dompet seluler dan desktop |
| Zaino | `zingodevops/zaino:0.8.0-no-tls` | nonaktif | Pengindeks Rust yang juga melayani dompet light wallet |
| Penjelajah blok | `emersonian/zcash-explorer:v0.0.6` | nonaktif | Penjelajah web yang membaca JSON-RPC node (Zaino tidak dapat menjadi backend-nya: layanan ini hanya menyediakan gRPC) |
| Tor | `osminogin/tor-simple:0.4.9.16` | nonaktif | Menerbitkan lightwalletd atau Zaino sebagai layanan `.onion` |
| DNS seeder | `zfnd/dnsseeder:v1.8.0` | nonaktif | Membantu node baru menemukan peer |
| zecd | `ghcr.io/zecrocks/zecd:0.6.3` | nonaktif | Server dompet yang mengutamakan alamat terlindungi (lihat [zecd](/zcash-tech/zecd)) |
| Proxy gRPC-web | `envoyproxy/envoy:v1.40.2` | nonaktif | Memungkinkan dompet browser terhubung ke lightwalletd, yang tidak dapat dijangkau browser melalui gRPC mentah |
| Dompet WebZjs | `ghcr.io/zecrocks/webzjs-wallet` | nonaktif | Dompet browser; memerlukan proxy gRPC-web pada host yang sama |

Dua catatan versi. Versi upstream Zaino adalah [0.10.1](https://github.com/zingolabs/zaino/releases), sedangkan chart masih menyertakan image versi 0.8.0, jadi periksa `values.yaml` sebelum mengandalkan perilaku Zaino yang lebih baru. Node Zakura juga berhenti beroperasi di Mainnet pada ketinggian akhir dukungan yang ditentukan untuk setiap rilis: untuk versi 1.8.6, batasnya adalah blok 3,643,309, sekitar 5 Desember 2026, dan sejak versi 1.8.0, build x86-64 menolak berjalan pada CPU tanpa BMI2 dan ADX. Halaman [Zakura Node](/zcash-tech/zakura-node) membahas keduanya.

## Kubernetes: sebelum menginstal

Chart ini di-deploy dengan tiga hal yang kamu siapkan satu kali untuk setiap cluster.

1. **Ingress controller.** Chart ini membuat Kubernetes `Ingress` standar dan secara default menggunakan kelas `nginx`; ingress-nginx direkomendasikan karena menangani gRPC dengan cara yang sama di k3s dan GKE. Di k3s, instal k3s dengan `--disable traefik` atau tetap gunakan Traefik dan atur `ingress.className: traefik` serta `ingress.backendProtocol: GRPC` (chart ini kemudian menghasilkan Traefik `IngressRoute`, karena Ingress biasa melalui Traefik mengembalikan HTTP 500 untuk gRPC). Di GKE, kelas ingress bawaan `gce` tidak dapat merutekan gRPC ke lightwalletd atau Zaino.
2. **cert-manager dan ClusterIssuer** untuk sertifikat Let's Encrypt otomatis (`examples/cluster-issuer.yaml`; uji terlebih dahulu dengan issuer staging). Di GKE Autopilot, instal cert-manager dengan `--set global.leaderElection.namespace=cert-manager`, atau pembuatan issuer akan gagal dengan error x509 "unknown authority". Kamu dapat melewati cert-manager dan mengarahkan `<service>.ingress.tls.secretName` ke sertifikatmu sendiri.
3. **StorageClass.** `local-path` cocok digunakan di k3s dengan NVMe. Di GKE, berikan kelas IOPS yang telah disediakan kepada Zebra (repositori ini menyertakan contoh Hyperdisk) dan tingkatkan kuota disk regional terlebih dahulu: proyek GKE baru hanya menyediakan 500 GB SSD dan 500 GB Hyperdisk per region, sementara node chain memerlukan 300 hingga 500 GB. Jika tidak, volume akan tetap berada dalam status `Pending` dengan `QUOTA_EXCEEDED`. Pengaturan `storageClassName` tidak dapat diubah pada StatefulSet yang sudah ada tanpa membuat ulang volume.

Selanjutnya, arahkan data DNS untuk setiap hostname ke IP eksternal ingress controller. Jika kamu belum memiliki DNS, tambahkan nama [sslip.io](https://sslip.io) seperti `203-0-113-7.sslip.io` di samping hostname aslimu: nama ini mengarah ke IP yang disematkan, sehingga sertifikat langsung diterbitkan. Untuk server permanen, tetap gunakan hostname milikmu sebagai hostname utama.

## Kubernetes: instalasi

```bash
helm repo add zcash https://zecrocks.github.io/zcash-stack
helm repo update
# copy an example from the repo's examples/ folder, set your hostnames and RPC credentials, then:
helm install zcash zcash/zcash-stack -f examples/zebra-mainnet.yaml
```

Contoh [`zebra-mainnet.yaml`](https://github.com/zecrocks/zcash-stack/blob/main/examples/zebra-mainnet.yaml) mengaktifkan Zebra, menghubungkan lightwalletd ke sana, menyediakan cache 40 GiB dan ingress TLS untuk lightwalletd, serta menjaga RPC node tetap berada di dalam cluster. Ganti username dan password RPC contoh sebelum menginstal. Contoh lainnya mencakup testnet, GKE, GKE Autopilot dengan ketersediaan tinggi, layanan tersembunyi Tor, dan bootstrap sslip.io.

Untuk melakukan upgrade, jalankan `helm repo update`, pratinjau perubahannya dengan plugin helm-diff (`helm diff upgrade zcash zcash/zcash-stack -f values.yaml`), lalu `helm upgrade` dengan argumen yang sama. Jika kamu menggunakan chart 0.0.x, baca [MIGRATION.md](https://github.com/zecrocks/zcash-stack/blob/main/charts/zcash-stack/MIGRATION.md) terlebih dahulu: versi 0.1.0 mengganti konfigurasi Traefik lama dengan Ingress standar dan cert-manager, serta mengubah tata letak values.

## Kebutuhan sumber daya

| | Kondisi normal | Sinkronisasi awal | Disk |
|:--|:--|:--|:--|
| Zebra | ~0.1 vCPU, 1.6 GiB | Membutuhkan banyak CPU, IOPS, dan memori | ~260 GiB (Juni 2026) dan terus bertambah; default chart 500 GiB |
| lightwalletd | ~0.15 vCPU, 165 MiB | Membangun cache blok demi blok | ~17 GiB; default chart 40 GiB |

Seluruh stack memerlukan sekitar 1.5 vCPU dan memori 4.5 GiB. Untuk satu mesin, chart menyarankan 8 vCPU, RAM 32 GiB, dan sekitar 1 TB NVMe (di GKE, `n2-standard-8` dengan volume Hyperdisk atau pd-ssd 500 GiB). Permintaan resource default sudah memenuhi minimum GKE Autopilot, dan batas CPU tidak diaktifkan agar proses sinkronisasi dapat menggunakan CPU tambahan saat diperlukan.

## Pengaturan penting

**Pemulihan snapshot.** Atur `<chain>.initSnapshot.enabled: true` (dengan `initSnapshot.url`, `gs://` atau `https://`) agar memulai dari snapshot yang dipublikasikan, bukan menyinkronkan dari genesis. Proses pemulihan mencatat kemajuannya, mengulang unduhan yang terputus dengan bersih, dan tidak pernah menghapus volume sehat dari instalasi sebelumnya. Snapshot adalah jalan pintas yang mengharuskanmu memercayai sumbernya: blok setelah snapshot tetap divalidasi, dan snapshot yang buruk akan terlihat dari blok yang gagal divalidasi. Menurut lokakarya, sinkronisasi dari awal memerlukan sekitar 10 hari, sedangkan memulai dari snapshot sekitar 10 jam.

**Penskalaan dan tanpa downtime.** lightwalletd dan Zaino adalah cache ringan di depan node, jadi jalankan `replicas: 2` untuk melakukan pembaruan bertahap tanpa downtime (PodDisruptionBudget ditambahkan secara otomatis jika jumlah replika lebih dari 1). Node chain tidak ditujukan untuk menangani beban: setiap replika adalah full node tambahan dengan volume dan proses sinkronisasinya sendiri, jadi jalankan satu saja, atau dua untuk redundansi.

**Peer masuk.** Secara default, Zebra hanya membuat koneksi keluar. `zebra.p2pPublic.enabled: true` menerima koneksi peer masuk pada port 8233 (18233 di testnet) dan mengiklankan alamatmu; pilih `externalAddrFrom: hostIP` di bare metal dan k3s, `nodeExternalIP` di cloud saat IP node sendiri bersifat privat, atau `loadBalancer` dengan IP statis yang dicadangkan di GKE Autopilot.

**TLS dan gRPC.** TLS berakhir di ingress dan HTTP/2 biasa berjalan di dalam cluster, jadi beberapa hostname dapat diarahkan ke satu lightwalletd. Gunakan `path: /` bersama `pathType: Prefix`, karena jalur metode gRPC memerlukannya. Jika sertifikat pertama gagal karena pengalihan HTTPS, terbitkan sertifikat dengan issuer staging atau untuk sementara atur `ingress.tls.sslRedirect: "false"`.

**Layanan tersembunyi Tor.** Berguna jika cluster-mu tidak memiliki IP publik atau domain:

```yaml
tor:
  enabled: true
  targetService: zaino   # or lightwalletd
  hiddenServicePort: 443
```

Baca alamatnya dengan `kubectl exec -it tor-0 -- cat /var/lib/tor/hidden_service/hostname` dan uji melalui klien Tor lokal dengan [zecping](https://github.com/zecrocks/zecping): `./zecping -socks localhost:9150 -addr <address>.onion:443`.

**Saat peningkatan jaringan.** Zebra mungkin memblokir peer yang masih menggunakan versi lama sehingga sinkronisasi terhenti, dengan log yang menunjukkan bahwa pembaruan chain terhenti. Daftar blokirnya disimpan di memori, jadi `kubectl delete pod zebra-0` akan menghapusnya; pod akan kembali menggunakan data chain yang sama tanpa sinkronisasi ulang.

## Compose Docker

Untuk satu mesin, clone repositori dan jalankan file default dari folder `docker/`:

```bash
git clone https://github.com/zecrocks/zcash-stack.git
cd zcash-stack/docker
docker compose up --detach
docker compose logs --follow
```

`compose.yaml` menjalankan Zebra, lightwalletd, dan [Watchtower](https://containrrr.dev/watchtower/) di x86; `compose.arm.yaml` melakukan hal yang sama di host ARM. Watchtower secara otomatis mengambil image baru, dan file default menggunakan tag `zfnd/zebra:latest`, sehingga node mengikuti rilis Zebra terbaru tanpa upgrade manual. `compose.zaino.yaml` mengganti lightwalletd dengan Zaino, tetapi menggunakan image komunitas lama yang versinya ditetapkan (`emersonian/zcash-zaino:0.1.2-zr4`), jadi periksa image tersebut sebelum menggunakannya. File lain menambahkan front end Caddy TLS, proxy VPS, dan tunnel autossh untuk node di rumah.

Atur `LIGHTWALLETD_DONATION_ADDRESS` di file `.env` ke alamat terpadu milikmu agar alamat tersebut diterbitkan sebagai alamat donasi server. Menjalankan `./download-snapshot.sh` dari folder `docker/` sebelum `docker compose up` pertama akan mengunduh snapshot chain, alih-alih menyinkronkan dari awal.

## Menghubungkan dan memantau

Kelas kedua lokakarya membahas cara mengekspos server: menggunakan IP statis publik, menyembunyikan IP rumahmu di balik tunnel SSH ke VPS atau Tailscale Funnel, atau menjalankan server khusus Tor. Uji hasilnya dengan mengarahkan dompet ke server tersebut (di ZODL, Pengaturan Lanjutan; lihat [Mengubah server di dompetmu](/zcash-tech/lightwallet-nodes)) atau dengan memanggil `GetLightdInfo` menggunakan klien gRPC.

Untuk pemantauan, kelas ketiga mencantumkan perintah Docker manual dan menyarankan pendaftaran server publik ke [hosh](https://hosh.zec.rocks/zec), monitor uptime zec.rocks. Pendaftaran dilakukan dengan pull request yang menambahkan hostname dan port-mu ke daftar server hosh. Kamu bisa meminta bantuan untuk langkah apa pun di forum lokakarya [zec.rocks](https://workshops.zec.rocks).

## Kesalahan umum

**Menginstal lightwalletd tanpa node chain.** lightwalletd membaca data dari Zebra (atau Zakura). Aktifkan salah satunya atau mulai dari file contoh yang sudah mengaktifkannya.

**Membiarkan kredensial RPC contoh.** File contoh menyertakan nilai pengganti. RPC tetap berada di dalam cluster, tetapi tetap ganti nilai tersebut.

**Menjalankan node chain dengan kuota disk default GKE.** Volume tidak akan pernah terhubung. Tingkatkan kuota regional sebelum menginstal.

**Meningkatkan skala Zebra untuk menangani beban.** Setiap replika Zebra menambah satu proses sinkronisasi penuh. Tingkatkan skala lightwalletd atau Zaino.

**Menggunakan chart lama saat peningkatan jaringan.** Node yang versinya lebih lama dari suatu peningkatan akan berhenti mengikuti Mainnet setelah peningkatan itu (Zebra memerlukan versi 7.0.0 atau lebih baru sejak NU7). Jalankan `helm repo update` dan tingkatkan chart sebelum ketinggian aktivasi serta ketinggian akhir dukungan Zakura.

## Halaman terkait

- [Zcash Node Lightwallet](/zcash-tech/lightwallet-nodes): hal yang dapat dan tidak dapat dilihat oleh server light wallet, serta server publik.
- [Zebra Full Node](/zcash-tech/zebra-full-node): validator yang dijalankan stack ini.
- [Zakura Node](/zcash-tech/zakura-node): fork Zebra yang dapat dijalankan oleh chart ini.
- [Zaino](/zcash-tech/zaino): pengindeks Rust.
- [zecd](/zcash-tech/zecd): server dompet yang dapat ditambahkan oleh chart ini.
- [Zcash RPC Node dan Pengindeksan](/guides/zcash-node-rpc-and-indexing): RPC Zebra, Zallet, dan pengindeks.
- [Cara menjalankan Zebra di Jaringan Akash](/guides/akash-network-zebra): cara lain untuk menjalankan node.

## Sumber

- [zecrocks/zcash-stack](https://github.com/zecrocks/zcash-stack) (repositori, rilis, dan contoh)
- [Zcash Stack README Helm chart](https://github.com/zecrocks/zcash-stack/blob/main/charts/zcash-stack/README.md)
- [Catatan lokakarya: Sinkronkan, Hubungkan, Pantau](https://github.com/zecrocks/zcash-stack/tree/main/docs)
- [Docker README](https://github.com/zecrocks/zcash-stack/blob/main/docker/README.md)
- [Daftar Artifact Hub](https://artifacthub.io/packages/search?repo=zcash)
- [hosh.zec.rocks](https://hosh.zec.rocks/zec) (monitor server publik)

**Terakhir diperbarui:** November 2026 (chart 0.4.9)
