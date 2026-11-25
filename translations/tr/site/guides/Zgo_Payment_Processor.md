<a href="https://github.com/zechub/zechub/edit/main/site/guides/Zgo_Payment_Processor.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Sayfayı düzenle"/>
</a>

# ZGo Ödeme İşlemcisi: Zcash Gözetimsiz Kabul Etme

ZGo, Zcash için gözetimsiz bir ödeme işlemcisidir. Müşteri, kendi cüzdanından ZEC ile ödeme yapar, ZGo işlem için Zcash blokzincirini izler ve fonlar korumalı bir işlem aracılığıyla doğrudan satıcının cüzdanına ulaşır. ZGo parayı arada hiçbir zaman elinde tutmaz.

Bu kılavuz, ödeme akışının nasıl çalıştığını, hesabın nasıl kurulacağını ve ZGo’in Xero ve WooCommerce ile nasıl entegre edileceğini açıklar. Ayrıca, ilk kurulumda sorunlara en çok yol açan iki hatayı da ele alır.

## Bu sayfada

1. [Neden ZGo](#why-use-zgo) kullanmalı?
2. [ZGo nasıl çalışır?](#how-zgo-works)
3. [Hesap oluşturma](#setting-up-an-account)
4. [ZGo ile Xero](#zgo-with-xero)
5. [ZGo ile WooCommerce](#zgo-with-woocommerce)
6. [Özellikler](#features)
7. [Yaygın hatalar](#common-mistakes)
8. [Sonuç](#conclusion)
9. [Kaynaklar](#resources)

## Neden ZGo kullanmalı?

Çoğu kripto para ödeme işlemcisi gözetimlidir. Fonlar önce işlemcinin hesabına gelir ve daha sonra satıcıya aktarılır. Bu, üçüncü bir tarafın parayı geçici olarak kontrol ettiği ve parayı dondurabileceği, geciktirebileceği veya bildirebileceği anlamına gelir.

ZGo tam tersini yapar. Ödemeler, Zcash korumalı bir işlem aracılığıyla müşterinin cüzdanından doğrudan satıcının cüzdanına aktarılır. İşlemci yalnızca faturayı oluşturur ve onay için blokzinciri izler. Aracı bakiye, para çekme süreci veya ödemeyi geciktirebilecek bir üçüncü taraf yoktur.

Satıcı açısından bu, üç pratik avantaj sağlar: gelen ZEC üzerinde tam kontrol, varsayılan olarak korumalı işlem gizliliği ve merkezi bir sağlayıcının çevrimiçi veya ödeme gücüne sahip kalmasına bağımlı olmama.

## ZGo nasıl çalışır?

ZGo bağımsız olarak, Xero üzerinden veya WooCommerce aracılığıyla kullanılsa da ödeme akışı aynıdır:

1. Satıcı, ZGo içinde bir ödeme talebi oluşturur. Bu talep; tutarı, fatura kimliğini ve Zcash alıcı adresini içeren bir QR kodu olarak görüntülenir.
2. Müşteri, QR kodunu bir Zcash cüzdanıyla tarar (Orchard, Sapling ve şeffaf adres türlerinin tümü WordPress eklentisinde desteklenir) ve ödemeyi onaylar.
3. İşlem, müşterinin cüzdanından satıcının cüzdanına korumalı bir transfer olarak Zcash ağına yayınlanır.
4. ZGo, işlem için Zcash blokzincirini izler.
5. Beş onaydan sonra ZGo ödemeyi kesinleşmiş olarak işaretler ve bağlı entegrasyonları (Xero, WooCommerce veya bir webhook) bilgilendirir.

Beş onay eşiği kritik sayıdır. Bundan önceki her durum, alınmış bir ödeme değil, devam eden bir ödemedir. Siparişin yerine getirilmesi, envanter güncellemeleri ve satıcı tarafında geri alınamaz herhangi bir işlem 5. adımı beklemelidir.

ZGo, masaüstü veya mobil cihazlarda herhangi bir modern tarayıcıda çalışır ve iki tarafta da kurulum gerektirmez. Müşterinin bir Zcash cüzdanına, satıcının ise bir Zcash cüzdanına ve ZGo hesabına ihtiyacı vardır.

<img width="672" height="378" alt="ZGo ödeme talebi ve blokzincir izleme genel görünümü" src="/content-images/de50885b-b068-4157-bbda-0981ca23efc8-a00a274776.webp" />

## Hesap oluşturma

ZGo hesabı oluşturmak için az miktarda ZEC içeren bir Zcash cüzdanı gerekir. Bu küçük ZEC bakiyesi, hesap başlatma işleminin zincir üstü ücretini karşılar. Bu amaçla büyük Zcash cüzdanlarının tümü kullanılabilir; mevcut seçenekler için [ZecHub Cüzdanları](https://zechub.wiki/wallets) sayfasına bakın.

Temel kurulum adımları:

1. Bir tarayıcıda [zgo.cash](https://zgo.cash/) adresini açın.
2. Satıcının kontrolündeki bir Zcash cüzdanını kullanarak hesap oluşturun. Bu cüzdanın anahtarları sizde olmalıdır. Bir borsa yatırma adresi işe yaramaz (bkz. [Yaygın hatalar](#common-mistakes)).
3. Küçük başlatma işlemini göndererek cüzdanı doğrulayın.
4. Alıcı adresini yapılandırın. Bu hesap üzerinden işlenen tüm ödemeler bu cüzdana ulaşır.

Hesap etkinleştirildikten sonra aynı satıcı, ZGo’i tek seferlik ödemeler için (örneğin bir pop-up etkinliğinde tek bir QR kodu) kullanabilir veya Xero ya da WooCommerce üzerinden kalıcı bir kuruluma entegre edebilir.

## Xero ile ZGo

[Xero](https://www.xero.com/), birçok küçük ve orta ölçekli işletmenin kullandığı bulut tabanlı bir muhasebe platformudur. ZGo–Xero entegrasyonu, satıcının Xero’da fatura oluşturmasını, müşterinin bu faturayı ZEC ile ödemesini ve işlem onaylandığında Xero’nun faturayı otomatik olarak ödenmiş şeklinde işaretlemesini sağlar.

Çalışma şekli:

1. Satıcı, Xero’da her zamanki gibi bir fatura oluşturur.
2. ZGo faturaya bir Zcash ödeme seçeneği ekler.
3. Müşteri, cüzdanı aracılığıyla ZEC ile ödeme yapar.
4. ZGo işlem için [Zcash blokzincirini](https://z.cash/) izler.
5. Beş onaydan sonra ZGo ödemeyi Xero’ya bildirir ve Xero faturayı kapatır.

ZEC satıcının cüzdanına ulaşır; ZGo veya Xero kontrolündeki bir hesaba değil. Xero’daki muhasebe kaydı, zincir üstü mutabakatla otomatik olarak eşitlenmiş kalır.

İlk kurulum için özel kılavuzu izleyin: [Xero Entegrasyonu Yapılandırma](https://hedgedoc.vergara.tech/s/4iXC67fmb).

## WooCommerce ile ZGo

[WooCommerce](https://woocommerce.com/) ve [WordPress](https://wordpress.org/) üzerinde çalışan çevrimiçi mağazalar için ZGo özel bir eklenti sunar. Eklenti, ödeme sırasında Zcash’i bir ödeme yöntemi olarak ekler ve ödeme onaylandığında sipariş durumunu otomatik olarak yönetir.

<img width="672" height="378" alt="ZGo WooCommerce eklentisinin ödeme ve sipariş akışı" src="/content-images/55a791bb-1947-4f55-b5b9-55083be8ed49-2bc8d2571e.webp" />

Bir WooCommerce mağazasındaki uçtan uca akış:

1. Müşteri ödeme aşamasına gelir ve ödeme yöntemi olarak Zcash’i seçer.
2. Eklenti bir ödeme talebi oluşturur ve QR kodunu ödeme sayfasında gösterir.
3. Müşteri cüzdanından ödeme yapar.
4. İşlem Zcash ağına yayınlanır ve ZGo işlemi izlemeye başlar.
5. Beş onaydan sonra ZGo ödemenin kesinleştiğini eklentiye bildirir.
6. Eklenti WooCommerce siparişini ödenmiş olarak işaretler ve sipariş veritabanını günceller.

Sipariş yalnızca 6. adım tamamlandığında ödenmiş olur. Önceki durumlar (işlemin yayınlanması, ilk onaylar) müşteriye “Ödeme alındı, onay bekleniyor” şeklinde gösterilebilir; ancak envanter, siparişin yerine getirilmesi ve sonraki otomasyonlar son durumu beklemelidir.

Eklenti ayrıca WordPress içine bir yönetim gösterge paneli kurar. Satıcı burada siparişleri ve gelen ZEC ödemelerini normal WooCommerce sipariş görünümüyle birlikte izleyebilir. Eklenti, mevcut tüm Zcash adres türlerini destekler: Orchard, Sapling ve şeffaf. Uyumlu herhangi bir cüzdanla ödeme yapan müşteriler işlemi tamamlayabilir.

## Özellikler

**Gözetimsiz.** Ödemeler, korumalı işlemler aracılığıyla müşterinin cüzdanından doğrudan satıcının cüzdanına aktarılır. ZGo fonları arada hiçbir zaman elinde tutmaz ve satıcı süreç boyunca tam kontrolü elinde bulundurur.

**Esnek kullanım.** ZGo, bir pop-up pazarda tek bir öğleden sonra boyunca, kalıcı bir satış noktası kurulumu olarak veya Xero ya da WooCommerce entegrasyonları aracılığıyla çevrimiçi bir mağazanın arka ucu olarak kullanılabilir.

**Tarayıcı tabanlı.** Müşteri veya satıcı tarafında kurulum gerekmez. ZGo, masaüstü veya mobil cihazlarda herhangi bir modern tarayıcıda çalışır.

**Cüzdan uyumluluğu.** Orchard, Sapling ve şeffaf adres türlerini destekleyenler de dahil olmak üzere büyük Zcash cüzdanları, müşterinin tarafında ek yapılandırma gerektirmeden ZGo faturalarını ödeyebilir.

**Entegrasyonlar.** Xero (muhasebe) ve WooCommerce (e-ticaret) ile doğrudan entegrasyonlar, satıcıların en yaygın iki iş akışını kullanıma hazır şekilde karşılar.

## Yaygın hatalar

**Beş onaydan önce siparişi ödenmiş saymak.** Yayınlanmış bir işlem, onaylanmış bir ödemeyle aynı şey değildir. İşlem yine de onaylanmayabilir veya başka bir işlemle değiştirilebilir. ZGo ödemeyi ancak beş onaydan sonra kesinleşmiş olarak bildirir; sipariş de ancak bundan sonra sonraki sistemlerde ödenmiş olarak işaretlenmelidir. Satıcı, envanter veya siparişin yerine getirilmesini işlemin yayınlanmasıyla tetiklenecek şekilde yapılandırırsa sahte veya başarısız ödemeler gerçek kayıplara yol açar.

**ZGo’i bir borsa yatırma adresine yönlendirmek.** Bu adres bir Zcash adresine benzer, ancak borsa yatırma adresleri satıcı tarafından değil, borsa tarafından kontrol edilir. Anahtarlar borsadadır; dolayısıyla fonlar da borsanın kontrolündedir. Bu, gözetimsiz bir işlemci kullanma amacını boşa çıkarır. ZGo içinde yapılandırılan cüzdan adresi, kurtarma ifadesi doğrudan satıcının kontrolünde olan bir cüzdana ait olmalıdır.

**ZGo’i cüzdan sanmak.** ZGo bir cüzdan değil, ödeme işlemcisidir. Anahtarları saklamaz, bakiye tutmaz veya satıcının fon harcamasını sağlamaz. ZGo’in aktardığı parayı alabilmek için satıcının kontrolünde ayrı bir Zcash cüzdanı gerekir.

## Sonuç

ZGo, satıcılara gözetimden vazgeçmeden, bir aracıya bağımlı olmadan ve işlem ayrıntılarını halka açık bir Zincir üzerinde açığa çıkarmadan Zcash ödemelerini kabul etme olanağı sunar. İki entegrasyon (Xero ve WooCommerce) satıcıların en yaygın iş akışlarını karşılar; diğer tüm durumlarda ZGo herhangi bir tarayıcıdan bağımsız olarak kullanılabilir.

Kurulum için izlenecek yol kısadır: Bir Zcash cüzdanı edinin, [zgo.cash](https://zgo.cash/) adresinde hesap oluşturun ve doğrudan ödeme talepleri oluşturmaya başlayın ya da ilgili entegrasyonu kurun.

## Kaynaklar

- [ZGo resmi web sitesi](https://zgo.cash/)
- [Xero Entegrasyonu Yapılandırma kılavuzu](https://hedgedoc.vergara.tech/s/4iXC67fmb)
- [WooCommerce](https://woocommerce.com/) ve [WordPress](https://wordpress.org/)
- [Xero](https://www.xero.com/)
- [Zcash proje ana sayfası](https://z.cash/)
- [ZecHub Cüzdanları](https://zechub.wiki/wallets), uyumlu Zcash cüzdanlarının listesi
- [ZecHub Ödeme İşlemcilerine genel bakış](https://zechub.wiki/payment-processors), ZGo diğer Zcash ödeme seçenekleri bağlamında
- [BTCPayServer Zcash Eklentisi](https://zechub.wiki/guides/btcpayserver-zcash-plugin), kendi sunucunuzda barındırılan alternatif için ilgili ZecHub kılavuzu
