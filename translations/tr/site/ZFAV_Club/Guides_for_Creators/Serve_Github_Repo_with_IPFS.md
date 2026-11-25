<a href="https://github.com/Zechub/zechub/edit/main/site/ZFAV_Club/Guides_for_Creators/Serve_Github_Repo_with_IPFS.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Sayfayı düzenle"/>
</a>

# GitHub Deposu IPFS ile nasıl sunulur

## Giriş

Bu kılavuzda, IPFS CID'si kullanılarak sunulan GitHub deponuz için git ile klonlanabilir bir URL oluşturmayı öğreneceğiz.

Bu, coğrafi bölgeden bağımsız olarak içeriğin erişilebilir olmasını, sansüre karşı dayanıklılığı ve değerli bilgilerin kalıcı bir yedeğini sağlamaya yardımcı olur!

Not: IPFS üzerine yüklenen verilere tüm ağ kullanıcıları erişebilir. Kişisel/hassas verileri yerel olarak şifrelemek isteyebilirsiniz.

## IPFS Kubo'yu yükleme

[burada](https://docs.ipfs.tech/install/command-line/#install-official-binary-distributions) verilen yükleme talimatlarını izleyin.

Bu örnekte Linux kullanıyoruz; diğer işletim sistemi sürümleri de mevcuttur.

Yüklemenin başarılı olduğunu ipfs –version komutunu kullanarak kontrol edin.

## Depoyu klonlama

Başlamak için, barındırmak istediğiniz bir Git deposu seçin ve onu klonlayın:

Şu komutu çalıştırın: “git clone https://github.com/zechub/zechub”

![https://i.ibb.co/HxFX37b/Screenshot-from-2023-05-20-14-14-46.png](/content-images/Screenshot-from-2023-05-20-14-14-46-8503afccc3.webp)

Şimdi, IPFS üzerinden klonlanmaya hazır hale getirmek için:

cd zechub git update-server-info

Git nesnelerini paketinden çıkarın:

![](/content-images/image-2024-04-20-175848513-2ceb90dd7b.webp)

Bunu yapmak, Git deposunu daha sonra güncellerseniz IPFS nesneleri tekilleştirmesini sağlar.

## IPFS üzerine ekleme

Bunu yaptıktan sonra, depo sunulmaya hazırdır. Geriye yalnızca onu IPFS üzerine eklemek kalıyor:

$ pwd

/code/myrepo

$ ipfs add -r 

![https://i.ibb.co/LJgK1q3/Screenshot-from-2023-05-20-14-22-38.png](/content-images/Screenshot-from-2023-05-20-14-22-38-3fc2f72d91.webp)

Ortaya çıkan CID: Qmbgqox5g3614gjTb43s5mdSmmk95aGWWA9EHksL2T91A2

![https://i.ibb.co/GvhCLwn/Screenshot-from-2023-05-20-14-26-34.png](/content-images/Screenshot-from-2023-05-20-14-26-34-6e00fee828.webp)

Harika! Artık deponuz ağa yüklendi.

## IPFS kullanarak klonlama

Artık GitHub deposunu şu komutu kullanarak alabilmelisiniz:

git clone http://ipfs.io/ipfs/yourCID

Alternatif olarak, yerel IPFS düğümünüzü kullanarak arama yapabilir ve içeriği alabilirsiniz.

Son not: IPFS üzerindeki depo klasörü, gerçek GitHub deposuyla birlikte güncellenmez. Klasörü düzenli aralıklarla yeniden yüklemeniz önerilir.
