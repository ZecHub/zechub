<a href="https://github.com/Zechub/zechub/edit/main/site/Zcash_Community/ZFAV_Club/Guides/Github_With_IPFS.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Sayfayı Düzenle"/>
</a>

# Github Repo’sunu IPFS ile Sunma

## Giriş

Bu rehberde, Github deponuz için bir IPFS CID kullanılarak sunulan, `git clone` ile klonlanabilir bir URL’nin nasıl oluşturulacağını öğreneceğiz. Bu, coğrafi bölgeden bağımsız olarak içeriğin erişilebilirliğini sağlamak, sansüre karşı dayanıklılık kazanmak ve değerli bilgilerin kalıcı bir yedeğini oluşturmak açısından faydalıdır!

Not: IPFS’ye yüklenen veriler ağdaki *tüm* kullanıcılar tarafından erişilebilir. Kişisel/hassas verileri yerel olarak şifrelemek isteyebilirsiniz.


## IPFS Kubo Kurulumu

Kurulum talimatlarını [buradan](https://docs.ipfs.tech/install/command-line/#install-official-binary-distributions) takip edin.

Bu örnekte Linux kullanıyoruz, diğer işletim sistemi sürümleri de mevcuttur. 

Kurulumun başarılı olduğunu "ipfs --version" komutunu kullanarak kontrol edin. 


## Depoyu Klonlayın 

Başlamak için, barındırmak istediğiniz bir Git deposu seçin ve klonlayın:

Komutu çalıştırın: "git clone https://github.com/zechub/zechub"

![](/content-images/Screenshot-from-2023-05-20-14-14-46-8503afccc3.webp)


Şimdi, IPFS üzerinden klonlanmaya hazır hale getirmek için:

cd zechub
git update-server-info


Git nesnelerini açın:

mv objects/pack/*.pack .
git unpack-objects < *.pack
rm -f *.pack objects/pack/*

Bunu yapmak, Git deposunu daha sonra güncellerseniz IPFS’nin nesneleri tekilleştirmesine olanak tanır.


## IPFS’ye Ekleyin 

Bunu yaptıktan sonra, depo sunulmaya hazır olacaktır. Geriye sadece onu IPFS’ye eklemek kalır:

$ pwd

/code/myrepo

$ ipfs add -r .

![](/content-images/Screenshot-from-2023-05-20-14-22-38-3fc2f72d91.webp)

Ortaya çıkan CID: Qmbgqox5g3614gjTb43s5mdSmmk95aGWWA9EHksL2T91A2

![](/content-images/Screenshot-from-2023-05-20-14-26-34-6e00fee828.webp)

Harika! Artık deponuz ağa yüklenmiş durumda.


## IPFS kullanarak klonlama 

Artık github deposunu şu komutla alabilmeniz gerekir:

git clone http://ipfs.io/ipfs/"yourCID"

Alternatif olarak, kendi yerel IPFS düğümünüzü kullanarak arama yapabilir ve depoyu alabilirsiniz. 

Son Not: IPFS üzerindeki repo klasörü, gerçek github deposuyla birlikte güncellenmez. Klasörün düzenli aralıklarla yeniden yüklenmesi tavsiye edilir.
