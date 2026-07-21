# Ywallet FROST demosu

## FROST ikili dosyalarını derleyin

https://github.com/ZcashFoundation/frost-zcash-demo/tree/update-zcash-sign

Yukarıdaki repoyu kullanın ve derleme talimatlarını izleyin: 

`cargo build --bin trusted-dealer`

`cargo build --bin dkg`

`cargo build --bin coordinator`

`cargo build --bin participants`

İkili dosyalar `target` klasöründe olacaktır.


## FROST UA oluşturun

`./generateFROST_UA.sh`



## UFVK'yi Ywallet içine aktarın

Hesaplar -> + işaretine tıklayın ve yukarıdaki adımdan aldığınız ufvk'yi yapıştırın

## Ywallet ile bir işlem oluşturun

Herhangi bir UA yapıştırın ve bir tx gönderin. Dosyayı kaydedin.

## FROST imzalama prosedürünü başlatın 

`./signFROST_tx.sh rawtxs/mytx signedtxs/mysignedtx`

ilk girdi, yukarıdaki adımdaki ham tx'in konumudur
ikinci girdi, yayınlamak istediğiniz imzalı tx'in konumu ve adıdır
Burası, FROST'a herkesin hangi işlemi imzalamasını istediğinizi söylediğiniz kısımdır

## Coordinator'ı başlatın

`./runCoordinator.sh`

Bu, her katılımcının imzasını koordine eder ve bir grup imzası oluşturur

## Her Participant'ın bu işlemi imzalamasını sağlayın

`./participantSign.sh key-package-1.json`


`./participantSign.sh key-package-2.json`

## İmzalı işlemi tamamlayın

Coordinator penceresinde, çıktı olarak verilen grup imzasını kopyalayın ve FROST imzalama penceresine yapıştırın.
Bu, FROST imzalamayı tamamlayacak ve 'mysingedtx' çıktısını verecektir


## İşleminizi Ywallet ile yayınlayın

Ywallet'in sağ alt tarafındaki 'More' seçeneğine tıklayın ve 'Broadcast' seçeneğini bulun. 'mysignedtx' dosyasını bulun ve tamam'a tıklayın.

Her şey çalışırsa bir işlem kimliği alırsınız :)
