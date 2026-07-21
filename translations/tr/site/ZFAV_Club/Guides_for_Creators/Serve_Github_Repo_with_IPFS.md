<a href="https://github.com/Zechub/zechub/edit/main/site/ZFAV_Club/Guides_for_Creators/Serve_Github_Repo_with_IPFS.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# GitHub Repo'sunu IPFS ile Sunma

## Giriş

Bu rehberde, IPFS CID kullanılarak sunulan GitHub deponuz için nasıl git clone yapılabilir bir URL oluşturacağımızı öğreneceğiz. 

Bu, coğrafi bölgeden bağımsız olarak içeriğin erişilebilirliğini sağlamak, sansüre karşı dayanıklılık kazanmak ve değerli bilgilerin kalıcı bir yedeğini oluşturmak için faydalıdır!

Not: IPFS'ye yüklenen veriler ağdaki tüm kullanıcılar tarafından erişilebilir durumdadır. Kişisel/hassas verileri yerel olarak şifrelemek isteyebilirsiniz.

## IPFS Kubo'yu Kurun

Kurulum talimatlarını [buradan](https://docs.ipfs.tech/install/command-line/#install-official-binary-distributions) takip edin

Bu örnekte Linux kullanıyoruz, diğer işletim sistemi sürümleri de mevcuttur.

Kurulumun başarılı olduğunu   ipfs –version kullanarak kontrol edin

## Depoyu Klonlayın

Başlamak için, barındırmak istediğiniz bir Git deposu seçin ve onu klonlayın:

Komutu çalıştırın: “git clone https://github.com/zechub/zechub”

![https://i.ibb.co/HxFX37b/Screenshot-from-2023-05-20-14-14-46.png](https://i.ibb.co/HxFX37b/Screenshot-from-2023-05-20-14-14-46.png)

Şimdi, bunu IPFS üzerinden klonlanmaya hazır hale getirelim.

cd zechub git update-server-info

Git nesnelerini açın:

![](https://i.ibb.co/25RwyWz/image-2024-04-20-175848513.png)

Bunu yapmak, Git deposunu daha sonra güncellerseniz IPFS'nin nesneleri tekilleştirmesine olanak tanır.

## IPFS'ye Ekleyin

Bunu yaptıktan sonra, depo sunulmaya hazır hale gelir. Geriye yalnızca onu IPFS'ye eklemek kalır:

$ pwd

/code/myrepo

$ ipfs add -r 

![https://i.ibb.co/LJgK1q3/Screenshot-from-2023-05-20-14-22-38.png](https://i.ibb.co/LJgK1q3/Screenshot-from-2023-05-20-14-22-38.png)

Ortaya çıkan CID: Qmbgqox5g3614gjTb43s5mdSmmk95aGWWA9EHksL2T91A2

![https://i.ibb.co/GvhCLwn/Screenshot-from-2023-05-20-14-26-34.png](https://i.ibb.co/GvhCLwn/Screenshot-from-2023-05-20-14-26-34.png)

Harika! Artık deponuz ağa yüklenmiş durumda.

## IPFS kullanarak klonlayın

Artık GitHub reposunu şu komutla alabilmelisiniz:

git clone http://ipfs.io/ipfs/yourCID

Alternatif olarak, yerel IPFS düğümünüzü kullanarak arama yapabilir ve depoyu alabilirsiniz.

Son Not: IPFS üzerindeki repo klasörü, gerçek github deposuyla birlikte güncelleme almaz. Klasörü düzenli aralıklarla yeniden yüklemeniz önerilir.
