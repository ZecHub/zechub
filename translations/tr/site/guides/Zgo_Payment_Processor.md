<a href="https://github.com/zechub/zechub/edit/main/site/guides/Zgo_Payment_Processor.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Sayfayı Düzenle"/>
</a>

# ZGo Payment Processor: Emanet Olmadan Zcash Kabul Etmek

ZGo, Zcash için emanetçi olmayan bir ödeme işlemcisidir. Bir müşteri kendi cüzdanından ZEC ile ödeme yapar, ZGo işlemi Zcash blokzincirinde izler ve fonlar korumalı bir transfer yoluyla doğrudan satıcının cüzdanına ulaşır. ZGo parayı arada hiçbir zaman elinde tutmaz.

Bu rehber, ödeme akışının nasıl çalıştığını, bir hesabın nasıl kurulacağını ve ZGo’nun Xero ile WooCommerce’e nasıl entegre edileceğini açıklar. Ayrıca ilk kurulumda en çok soruna yol açan iki hatayı da ele alır.

## Bu sayfada

1. [Neden ZGo kullanılmalı](#why-use-zgo)
2. [ZGo nasıl çalışır](#how-zgo-works)
3. [Hesap kurma](#setting-up-an-account)
4. [Xero ile ZGo](#zgo-with-xero)
5. [WooCommerce ile ZGo](#zgo-with-woocommerce)
6. [Özellikler](#features)
7. [Yaygın hatalar](#common-mistakes)
8. [Sonuç](#conclusion)
9. [Kaynaklar](#resources)

## Neden ZGo kullanılmalı

Çoğu kripto para ödeme işlemcisi emanetçidir. Fonlar önce işlemcinin hesabına gelir ve daha sonra satıcıya iletilir; bu da üçüncü bir tarafın parayı geçici olarak kontrol ettiği ve onu dondurabildiği, geciktirebildiği veya hakkında raporlama yapabildiği anlamına gelir.

ZGo bunun tam tersini yapar. Ödemeler, müşterinin cüzdanından doğrudan satıcının cüzdanına bir Zcash korumalı işlemi üzerinden gider. İşlemci yalnızca faturayı oluşturur ve onay için blokzinciri izler. Aracı bir bakiye yoktur, çekim süreci yoktur ve mutabakatı geciktirebilecek bir üçüncü taraf bulunmaz.

Bir satıcı için bu üç pratik anlama gelir: gelen ZEC üzerinde tam saklama kontrolü, varsayılan olarak korumalı işlem gizliliği ve çevrimiçi veya ödeme gücüne sahip kalacak merkezi bir sağlayıcıya bağımlı olmama.

## ZGo nasıl çalışır

Ödeme akışı, ZGo ister tek başına, ister Xero üzerinden, ister WooCommerce üzerinden kullanılsın aynıdır:

1. Satıcı ZGo’da bir ödeme talebi oluşturur; bu, tutarı, fatura kimliğini ve bir Zcash alım adresini içeren bir QR kodu olarak görüntülenir.
2. Müşteri QR kodunu bir Zcash cüzdanıyla tarar (WordPress eklentisinde Orchard, Sapling ve Transparent adres türlerinin tümü desteklenir) ve ödemeyi onaylar.
3. İşlem, müşterinin cüzdanından satıcının cüzdanına korumalı bir transfer olarak Zcash ağına yayınlanır.
4. ZGo işlemi Zcash blokzincirinde izler.
5. Beş onaydan sonra ZGo ödemeyi nihai olarak işaretler ve bağlı tüm entegrasyonlara (Xero, WooCommerce veya bir webhook) bildirim gönderir.

Beş onay eşiği kilit sayıdır. Bundan önceki her şey alınmış bir ödeme değil, devam eden bir ödemedir. Sipariş karşılama, envanter güncellemeleri ve satıcı tarafındaki geri döndürülemez tüm işlemler 5. adımı beklemelidir.

ZGo, her iki tarafta da kurulum gerektirmeden masaüstünde veya mobilde herhangi bir modern tarayıcıda çalışır. Müşterinin bir Zcash cüzdanına ihtiyacı vardır; satıcının ise bir Zcash cüzdanına ve bir ZGo hesabına ihtiyacı vardır.

<img width="672" height="378" alt="ZGo ödeme talebi ve blokzincir izleme genel görünümü" src="https://github.com/user-attachments/assets/de50885b-b068-4157-bbda-0981ca23efc8" />

## Hesap kurma

Bir ZGo hesabı oluşturmak için az miktarda ZEC içeren bir Zcash cüzdanı gerekir. Bu küçük ZEC bakiyesi, hesap başlatma işlemi için zincir üzerindeki ücreti karşılar. Bunun için herhangi bir büyük Zcash cüzdanı kullanılabilir; güncel seçenekler için [ZecHub Cüzdanları](https://zechub.wiki/wallets) sayfasına bakın.

Temel kurulum:

1. Tarayıcıda [zgo.cash](https://zgo.cash/) adresini açın.
2. Satıcının kontrolü altındaki bir Zcash cüzdanını kullanarak hesap oluşturun. Bu cüzdan anahtarları tutmalıdır. Bir borsa yatırma adresi çalışmaz (bkz. [Yaygın hatalar](#common-mistakes)).
3. Küçük başlatma işlemini göndererek cüzdanı doğrulayın.
4. Alım adresini yapılandırın. Bu hesap üzerinden işlenen tüm ödemeler bu cüzdana ulaşacaktır.

Hesap etkinleştirildikten sonra aynı satıcı ZGo’yu tek seferlik ödemeler için (örneğin bir pop-up etkinlikte tek bir QR kodu) kullanabilir veya Xero ya da WooCommerce üzerinden kalıcı bir kuruluma bağlayabilir.

## Xero ile ZGo

[Xero](https://www.xero.com/), birçok küçük ve orta ölçekli işletmenin kullandığı bulut tabanlı bir muhasebe platformudur. ZGo–Xero entegrasyonu, bir satıcının Xero’da fatura oluşturmasına, müşterinin bunu ZEC ile ödemesine ve işlem onaylandığında Xero’nun faturayı otomatik olarak ödenmiş olarak işaretlemesine olanak tanır.

Nasıl çalışır:

1. Satıcı her zamanki gibi Xero’da bir fatura oluşturur.
2. ZGo faturaya bir Zcash ödeme seçeneği ekler.
3. Müşteri kendi cüzdanı üzerinden ZEC ile ödeme yapar.
4. ZGo işlemi [Zcash blokzincirinde](https://z.cash/) izler.
5. Beş onaydan sonra ZGo ödemeyi Xero’ya geri bildirir ve Xero faturayı kapatılmış olarak işaretler.

ZEC, ZGo veya Xero tarafından kontrol edilen herhangi bir hesaba değil, satıcının cüzdanına ulaşır. Xero’daki muhasebe kaydı, zincir üzerindeki mutabakat ile otomatik olarak senkronize kalır.

İlk kurulum için özel adım adım kılavuzu izleyin: [Xero Entegrasyon Yapılandırması](https://hedgedoc.vergara.tech/s/4iXC67fmb).

## WooCommerce ile ZGo

[WooCommerce](https://woocommerce.com/) ve [WordPress](https://wordpress.org/) üzerinde çalışan çevrimiçi mağazalar için ZGo özel bir eklenti sunar. Eklenti, ödeme sırasında Zcash’i bir ödeme yöntemi olarak ekler ve ödeme onaylandığında sipariş durumunu otomatik olarak yönetir.

<img width="672" height="378" alt="ZGo WooCommerce eklentisi ödeme ekranı ve sipariş akışı" src="https://github.com/user-attachments/assets/55a791bb-1947-4f55-b5b9-55083be8ed49" />

Bir WooCommerce mağazası içindeki uçtan uca akış:

1. Müşteri ödeme sayfasına gelir ve ödeme yöntemi olarak Zcash’i seçer.
2. Eklenti bir ödeme talebi oluşturur ve QR kodunu ödeme sayfasında gösterir.
3. Müşteri kendi cüzdanından ödeme yapar.
4. İşlem Zcash ağına yayınlanır ve ZGo bunu izlemeye başlar.
5. Beş onaydan sonra ZGo ödemeyi eklentiye nihai olarak bildirir.
6. Eklenti WooCommerce siparişini ödenmiş olarak işaretler ve sipariş veritabanını günceller.

Sipariş yalnızca 6. adım tamamlandığında ödenmiş sayılır. Daha erken durumlar (yayın, ilk onaylar) müşteriye "ödeme alındı, onay bekleniyor" olarak gösterilebilir; ancak envanter, sipariş karşılama ve sonraki tüm otomasyonlar nihai durumu beklemelidir.

Eklenti ayrıca WordPress içinde yönetsel bir pano da kurar; burada satıcı, normal WooCommerce sipariş görünümünün yanında siparişleri ve gelen ZEC ödemelerini izleyebilir. Eklenti, mevcut tüm Zcash adres türlerini destekler: Orchard, Sapling ve Transparent. Uyumlu herhangi bir cüzdandan ödeme yapan müşteriler işlemi tamamlayabilir.

## Özellikler

**Emanetçi değil.** Ödemeler, korumalı işlemler aracılığıyla doğrudan müşterinin cüzdanından satıcının cüzdanına gider. ZGo arada fonları hiçbir zaman tutmaz ve satıcı süreç boyunca tam kontrolü elinde bulundurur.

**Esnek kullanım.** ZGo, bir pop-up pazarda tek bir öğleden sonra için, kalıcı bir satış noktası kurulumu için veya Xero ya da WooCommerce entegrasyonları üzerinden bir çevrimiçi mağazanın arka ucu olarak kullanılabilir.

**Tarayıcı tabanlı.** Ne müşteri ne de satıcı tarafında kurulum gerekir. ZGo, masaüstü veya mobilde herhangi bir modern tarayıcıda çalışır.

**Cüzdan uyumluluğu.** Orchard, Sapling ve Transparent adres türlerini destekleyenler de dahil olmak üzere başlıca Zcash cüzdanları, müşteri tarafında ek yapılandırma olmadan bir ZGo faturasını ödeyebilir.

**Entegrasyonlar.** Xero (muhasebe) ve WooCommerce (e-ticaret) ile doğrudan entegrasyonlar, en yaygın iki satıcı iş akışını kutudan çıktığı gibi kapsar.

## Yaygın hatalar

**Siparişi beş onaydan önce ödenmiş saymak.** Yayınlanmış bir işlem, onaylanmış bir ödeme ile aynı şey değildir. İşlem hâlâ onay alamayabilir veya yerine başka bir işlem geçebilir. Ancak beş onaydan sonra ZGo ödemeyi nihai olarak bildirir ve ancak o zaman sipariş aşağı akışta ödenmiş olarak işaretlenmelidir. Bir satıcı envanteri veya sipariş karşılamayı yayın olayıyla tetiklenecek şekilde yapılandırırsa, dolandırıcılık veya başarısız ödemeler gerçek kayıplara yol açacaktır.

**ZGo’yu bir borsa yatırma adresine yönlendirmek.** Dışarıdan bir Zcash adresi gibi görünür, ancak borsa yatırma adresleri satıcı tarafından değil, borsa tarafından kontrol edilir. Anahtarları borsa tutar; bu da fonları borsanın tuttuğu anlamına gelir ve emanetçi olmayan bir işlemci kullanma nedenini ortadan kaldırır. ZGo’da yapılandırılan cüzdan adresi, tohum ifadesi doğrudan satıcının kontrolünde olan bir cüzdan olmalıdır.

**ZGo’yu bir cüzdan sanmak.** ZGo bir ödeme işlemcisidir, cüzdan değildir. Anahtarları saklamaz, bakiye tutmaz ve satıcının fon harcamasına izin vermez. ZGo’nun yönlendirdiği parayı almak için satıcının kontrolü altında ayrı bir Zcash cüzdanı gerekir.

## Sonuç

ZGo, satıcılara saklama kontrolünden vazgeçmeden, bir aracıya bağımlı olmadan ve işlem ayrıntılarını herkese açık bir zincirde ifşa etmeden Zcash ödemeleri kabul etme imkânı verir. İki entegrasyon (Xero ve WooCommerce) en yaygın satıcı iş akışlarını kapsar; diğer her şey için ZGo herhangi bir tarayıcıdan bağımsız olarak kullanılabilir.

Kurulum için yol kısadır: bir Zcash cüzdanı edinin, [zgo.cash](https://zgo.cash/) üzerinde bir hesap oluşturun ve ya doğrudan ödeme talepleri üretmeye başlayın ya da ilgili entegrasyonu kurun.

## Kaynaklar

- [ZGo resmi web sitesi](https://zgo.cash/)
- [Xero Entegrasyon Yapılandırması rehberi](https://hedgedoc.vergara.tech/s/4iXC67fmb)
- [WooCommerce](https://woocommerce.com/) ve [WordPress](https://wordpress.org/)
- [Xero](https://www.xero.com/)
- [Zcash proje ana sayfası](https://z.cash/)
- [ZecHub Cüzdanları](https://zechub.wiki/wallets), uyumlu Zcash cüzdanlarının listesi
- [ZecHub Ödeme İşlemcileri genel bakışı](https://zechub.wiki/payment-processors), ZGo’nun diğer Zcash ödeme seçenekleri bağlamındaki yeri
- [BTCPayServer Zcash Plugin](https://zechub.wiki/guides/btcpayserver-zcash-plugin), self-hosted bir alternatif için ilgili ZecHub rehberi
