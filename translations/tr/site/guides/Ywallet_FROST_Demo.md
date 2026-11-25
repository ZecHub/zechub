# Ywallet FROST demo

> **Ywallet artık bakımı yapılmıyor.** Geliştiricisi, Ironwood (NU6.3) için güncellenmeyeceğini doğruladı; bu nedenle artık Zincir’i takip edemiyor ve aşağıdaki adımlar ana ağda tamamlanamıyor. Bu sayfa başvuru amacıyla tutulmaktadır. Aynı geliştiricinin ürünü olan Zkool, bakımı sürdürülen yeni sürümüdür ve FROST çoklu imzayı destekler.

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


## FROST ikili dosyalarını derleme

[GitHub bağlantısını](https://github.com/ZcashFoundation/frost-zcash-demo)

Yukarıdaki depoyu kullanın ve derleme yönergelerini izleyin:

```bash
cargo build --bin trusted-dealer
cargo build --bin dkg
cargo build --bin coordinator
cargo build --bin participant
```

İkili dosyalar hedef klasörde olacaktır.

## FROST UA oluşturma

`./generateFROST_UA.sh`



## UFVK'yi Ywallet içine aktarma

Accounts -> + simgesine tıklayın ve yukarıdaki adımdaki UFVK'yi yapıştırın

## Ywallet ile işlem oluşturma

Herhangi bir UA yapıştırıp bir işlem gönderin. Dosyayı kaydedin.

## FROST imzalama prosedürünü başlatma

`./signFROST_tx.sh rawtxs/mytx signedtxs/mysignedtx`

İlk girdi, yukarıdaki adımdaki ham işlemin konumudur.
İkinci girdi, yayınlamak istediğiniz imzalı işlemin konumu ve adıdır.
Bu bölümde herkese hangi işlemi imzalamasını istediğinizi FROST'ye bildirirsiniz.

## Koordinatörü başlatma

`./runCoordinator.sh`

Bu, her katılımcının imzasını koordine eder ve bir grup imzası oluşturur.

## Her katılımcının bu işlemi imzalamasını sağlama

```bash
./participantSign.sh key-package-1.json
./participantSign.sh key-package-2.json
```

## İmzalı işlemi sonlandırma

Koordinatör penceresinde, çıktılanan grup imzasını kopyalayıp FROST imzalama penceresine yapıştırın.
Böylece FROST imzalama işlemi tamamlanır ve 'mysingedtx' çıktısı oluşturulur.


## İşleminizi Ywallet ile yayınlama

Ywallet penceresinin sağ alt köşesindeki 'More' seçeneğine tıklayın ve 'Broadcast' seçeneğini bulun. 'mysignedtx' dosyasını bulun ve Tamam'a tıklayın.

Her şey yolunda giderse bir işlem kimliği alırsınız :)
