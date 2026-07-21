# Ywallet FROST demosu

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/3IZgxDqQNbw"
    title="FROST + Ywallet İşlem Demosu"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>


## FROST bin dosyalarını derleyin

[Github bağlantısı](https://github.com/ZcashFoundation/frost-zcash-demo/tree/update-zcash-sign)

Yukarıdaki repoyu kullanın ve derleme talimatlarını izleyin: 

```bash
cargo build --bin trusted-dealer
cargo build --bin dkg
cargo build --bin coordinator
cargo build --bin participants
```

Bin dosyaları `target` klasöründe olacaktır.

## FROST UA oluşturun

`./generateFROST_UA.sh`



## UFVK’yi Ywallet’e içe aktarın

Hesaplar -> + işaretine tıklayın ve yukarıdaki adımdan aldığınız ufvk’yi yapıştırın

## Ywallet ile bir işlem oluşturun

Herhangi bir UA yapıştırın ve bir tx gönderin. Dosyayı kaydedin.

## FROST imzalama prosedürünü başlatın

`./signFROST_tx.sh rawtxs/mytx signedtxs/mysignedtx`

ilk girdi, yukarıdaki adımdaki ham tx’in konumudur
ikinci girdi, yayınlamak istediğiniz imzalı tx’in konumu ve adıdır
Burası, FROST’a herkesin hangi işlemi imzalayacağını söylediğiniz kısımdır

## Coordinator’ı başlatın

`./runCoordinator.sh`

Bu, her katılımcının imzasını koordine eder ve bir grup imzası oluşturur

## Her Participant’ın bu işlemi imzalamasını sağlayın

```bash
./participantSign.sh key-package-1.json
./participantSign.sh key-package-2.json
```

## İmzalı işlemi sonlandırın

Coordinator penceresinde, çıktı olarak verilen grup imzasını kopyalayın ve FROST imzalama penceresine yapıştırın.
Bu, FROST imzalama işlemini tamamlayacak ve `mysingedtx` çıktısını verecektir


## İşleminizi Ywallet ile yayınlayın

Ywallet’in sağ alt tarafındaki 'More' seçeneğine tıklayın ve 'Broadcast' seçeneğini bulun. `mysignedtx` dosyasını bulun ve tamam’a tıklayın.

Her şey düzgün çalışırsa bir işlem kimliği alırsınız :)
