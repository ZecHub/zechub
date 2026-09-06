# Ywallet FROST demosu

> **Ywallet artık geliştirilmiyor.** Geliştiricisi, Ironwood (NU6.3) için güncellenmeyeceğini doğruladı; bu nedenle artık zinciri takip edemez ve aşağıdaki adımlar mainnet üzerinde tamamlanamaz. Bu sayfa referans amaçlı tutulmaktadır. Aynı geliştiricinin ürünü olan Zkool, geliştirilen halefidir ve FROST multisig'i destekler.

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/3IZgxDqQNbw"
    title="FROST + Ywallet Transaction Demo"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>


## FROST ikili dosyalarını derleyin

[Github bağlantısı](https://github.com/ZcashFoundation/frost-zcash-demo/tree/update-zcash-sign)

Yukarıdaki repoyu kullanın ve derleme talimatlarını izleyin: 

```bash
cargo build --bin trusted-dealer
cargo build --bin dkg
cargo build --bin coordinator
cargo build --bin participants
```

İkili dosyalar target klasöründe olacaktır.

## FROST UA oluşturun

`./generateFROST_UA.sh`



## UFVK'yi Ywallet'e içe aktarın

Hesaplar -> + işaretine tıklayın ve yukarıdaki adımdaki ufvk'yi yapıştırın

## Ywallet ile bir işlem oluşturun

Herhangi bir UA yapıştırın ve bir tx gönderin. Dosyayı kaydedin.

## FROST imzalama sürecini başlatın

`./signFROST_tx.sh rawtxs/mytx signedtxs/mysignedtx`

İlk girdi, yukarıdaki adımdaki ham tx'in konumudur.
İkinci girdi, yayınlamak istediğiniz imzalı tx'in konumu ve adıdır.
Bu, FROST'a herkesin hangi işlemi imzalamasını istediğinizi söylediğiniz bölümdür.

## Coordinator'ı başlatın

`./runCoordinator.sh`

Bu, her katılımcının imzasını koordine eder ve bir grup imzası oluşturur.

## Her Katılımcının bu işlemi imzalamasını sağlayın

```bash
./participantSign.sh key-package-1.json
./participantSign.sh key-package-2.json
```

## İmzalı İşlemi tamamlayın

Coordinator penceresinde, çıktısı verilen grup imzasını kopyalayın ve FROST imzalama penceresine yapıştırın.
Bu, FROST imzalamayı tamamlayacak ve 'mysingedtx' çıktısını verecektir.


## İşleminizi Ywallet ile yayınlayın

Ywallet'in sağ alt tarafındaki 'More' seçeneğine tıklayın ve 'Broadcast' seçeneğini bulun. 'mysignedtx' dosyasını bulun ve tamam'a tıklayın.

Her şey çalışırsa bir işlem kimliği alacaksınız :)
