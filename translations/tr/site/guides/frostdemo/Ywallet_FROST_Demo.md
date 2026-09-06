# Ywallet FROST demosu

> **Ywallet artık bakımı yapılan bir yazılım değildir.** Geliştiricisi, Ironwood (NU6.3) için güncellenmeyeceğini onayladı; bu nedenle artık zinciri takip edemez ve aşağıdaki adımlar mainnet üzerinde tamamlanamaz. Bu sayfa referans olarak tutulmaktadır. Aynı geliştiricinin ürünü olan Zkool, bakımı yapılan halefidir ve FROST multisig'i destekler.

## FROST ikililerini derleme

https://github.com/ZcashFoundation/frost-zcash-demo/tree/update-zcash-sign

Yukarıdaki depoyu kullanın ve derleme talimatlarını izleyin:

`cargo build --bin trusted-dealer`

`cargo build --bin dkg`

`cargo build --bin coordinator`

`cargo build --bin participants`

İkili dosyalar target klasöründe olacaktır.


## FROST UA oluşturma

`./generateFROST_UA.sh`



## UFVK'yi Ywallet'e içe aktarma

Hesaplar -> + işaretine tıklayın ve yukarıdaki adımdaki ufvk'yi yapıştırın

## Ywallet ile bir işlem oluşturma

Herhangi bir UA'yı yapıştırın ve bir işlem gönderin. Dosyayı kaydedin.

## FROST imzalama sürecini başlatma

`./signFROST_tx.sh rawtxs/mytx signedtxs/mysignedtx`

İlk girdi, yukarıdaki adımdaki ham işlemin konumudur  
İkinci girdi, yayınlamak istediğiniz imzalı işlemin konumu ve adıdır  
Bu, FROST'a herkesin hangi işlemi imzalamasını istediğinizi söylediğiniz bölümdür

## Coordinator'ı başlatma

`./runCoordinator.sh`

Bu, her katılımcının imzasını koordine eder ve bir grup imzası oluşturur

## Her katılımcının bu işlemi imzalamasını sağlama

`./participantSign.sh key-package-1.json`


`./participantSign.sh key-package-2.json`

## İmzalı İşlemi sonlandırma

Coordinator penceresinde, çıktı olarak verilen grup imzasını kopyalayın ve FROST imzalama penceresine yapıştırın.  
Bu, FROST imzalamayı tamamlayacak ve 'mysingedtx' çıktısını verecektir.


## İşleminizi Ywallet ile yayınlama

Ywallet'in sağ alt tarafındaki 'More' seçeneğine tıklayın ve 'Broadcast' seçeneğini bulun. 'mysignedtx' dosyasını bulun ve tamam'a tıklayın.

Her şey çalışırsa bir işlem kimliği alırsınız :)
