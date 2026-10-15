# Sık Sorulan Sorular

Zcash hakkında en sık sorulan soruların listesi. Zcash istemcisindeki sorunları gidermek için lütfen [resmî sorun giderme kılavuzuna](https://zcash.readthedocs.io/en/latest/rtd_pages/troubleshooting_guide.html) bakın.

### Hızlı Gezinme

<div className="flex flex-wrap gap-2 my-4">
  <a href="#what-is-zcash" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">Zcash nedir?</a>
  <a href="#how-can-i-acquire-zcash" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">Zcash nasıl edinebilirim?</a>
  <a href="#what-is-the-difference-between-zcash-and-other-cryptocurrencies" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">Diğer kripto paralarla farkı?</a>
  <a href="#how-is-the-zcash-protocol-governed" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">Protokol yönetimi?</a>
  <a href="#where-is-my-transaction" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">İşlemim nerede?</a>
  <a href="#is-zcash-really-private" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">Zcash gerçekten gizli mi?</a>
  <a href="#a-few-common-misconceptions" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">Yaygın yanlış kanılar</a>
  <a href="#zcashd-stopped-working-what-do-i-run-now" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">zcashd çalışmayı durdurdu mu?</a>
  <a href="#how-do-i-move-my-zcashd-wallet-to-zallet" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">Cüzdanımı Zallet'a taşıyayım mı?</a>
  <a href="#what-is-ironwood-and-do-i-need-to-do-anything" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">Ironwood nedir?</a>
  <a href="#which-full-node-should-i-run" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">Hangi tam düğüm?</a>
  <a href="#where-do-i-look-up-a-term-from-a-release-note" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">Bir terime bakayım mı?</a>
</div>

---

## Zcash nedir?

<div className="rounded-2xl border border-border bg-card p-5 my-4">

Zcash, hızlı ve gizli işlemlere ve düşük ücretlere sahip bir dijital para birimidir. Gizlilik, Zcash'ün temel özelliğidir. Tüm işlemleri şifrelemek için sıfır bilgi kanıtlarının kullanımına öncülük etmiştir.

Anlık, mobil, güvenli ve gizli ödemeler için çeşitli cüzdanlar mevcuttur: [Cüzdanlar](/using-zcash/wallets)

</div>

## Zcash nasıl edinebilirim?

<div className="rounded-2xl border border-border bg-card p-5 my-4">

ZEC'ü [emanetçi borsalardan](/using-zcash/custodial-exchanges), [DEX'lerden](/using-zcash/dex) veya [merkezi takas platformlarından](/using-zcash/centralized-swaps) satın alabilirsiniz.

Ayrıca Zcash'ü eşler arası olarak satın alabilir veya madencilik yoluyla edinebilirsiniz.

</div>

## Zcash ile diğer kripto paralar arasındaki fark nedir?

<div className="rounded-2xl border border-border bg-card p-5 my-4">

Zcash, Bitcoin veya Ethereum'dan temelde daha gizlidir. Hızlı blok süreleri (75 saniye), düşük ücretler ve düzenli yükseltmeler sunar.

Kullanıcılar **Şeffaf** veya **Korumalı** işlemler arasında seçim yapabilir. Daha fazla bilgi için [Korumalı Bir Ekosistem](https://electriccoin.co/blog/shielded-ecosystem) sayfasına bakın.

</div>

## Zcash protokolü nasıl yönetilir?

<div className="rounded-2xl border border-border bg-card p-5 my-4">

Protokol, **Zcash İyileştirme Önerisi (ZIP)** süreciyle yönetilir. Herkes bir taslak ZIP sunabilir. Taslaklar topluluk tarafından tartışılır ve ZIP editörleri tarafından kabul veya reddedilir:

- [Daira Hopwood](https://twitter.com/feministPLT) (Electric Coin Company)
- [Deirdre Connolly](https://twitter.com/durumcrustulum) (Zcash Foundation)

Kararlar teknik belirtime yazılır ve ağ bunları benimsediğinde zincir üzerinde onaylanır.

</div>

## İşlemim nerede?

<div className="rounded-2xl border border-border bg-card p-5 my-4">

Önce [blok gezginleri kılavuzumuzu](/guides/blockchain-explorers) okuyun. Ardından [Zcash Blok Gezgini'ni](https://zcashblockexplorer.com) kontrol edin.

İşlemler yaklaşık 25 dakika (20 blok) sonra sona erer ve fonlar otomatik olarak iade edilir.

**Bir işlemin görünmemesinin yaygın nedenleri:**

- Bağlantı kaybı
- İşlem ücretinin çok düşük olması
- Ağ aşırı yükü
- Çok fazla şeffaf girdi (boyut çok büyük)

**Başarılı olmak için ipuçları:**

- Kararlı bir bağlantı kullanın
- Standart ücreti ödeyin (veya öncelik için daha fazlasını)
- Bekleyin ve daha sonra tekrar deneyin
- İşlemi küçük tutmak için daha az girdi kullanın

</div>

## Zcash gerçekten Gizli mi?

<div className="rounded-2xl border border-border bg-card p-5 my-4">

**Evet.** Zcash, korumalı işlemlerde gönderen, tutar ve alıcı verilerini şifreler.

Zcash şunları **yapmaz**:

- Çoklu imza işlemlerini şifrelemez (FROST entegrasyonu bekleniyor)
- Şeffaf işlemlerle ilişkili korelasyonlara karşı koruma sağlamaz
- IP adreslerini gizlemez

Ek okuma: [Korumalı Bir Ekosistem](https://web.archive.org/web/20260903010654/https://electriccoin.co/blog/shielded-ecosystem/)

</div>

## zcashd çalışmayı durdurdu, şimdi ne çalıştırmalıyım?

<div className="rounded-2xl border border-border bg-card p-5 my-4">

zcashd kullanımdan kaldırılmıştır. 6.20.0 sürümü 18 Temmuz 2026'da 3417100 numaralı blokta kendini kapattı ve Ironwood'ü (NU6.3) hiçbir zaman desteklemedi; bu nedenle yükseltilecek daha yeni bir sürüm yoktur.

Bunun yerine Z3 yığınını çalıştırın. Üç program, zcashd'ün tek başına yaptığı işi paylaşıyor:

- **[Zebra](/zcash-tech/zebra-full-node)** zinciri doğrular
- **[Zaino](/zcash-tech/zaino)** zinciri indeksler ve cüzdan verilerini sunar
- **[Zallet](/zcash-tech/zallet)** fonlarınızı tutar

[Zakura](/zcash-tech/zakura-node) alternatif bir tam düğümdür. Ayrıca kendi üzerinde zcashd çalıştırır; bu, diğer yazılımlar hâlâ eski arayüzü bekliyorsa yardımcı olur.

[geçiş kılavuzuyla](/guides/migration-guide-zcashd-to-zebrad-zallet) başlayın.

</div>

## zcashd cüzdanımı Zallet'a nasıl taşırım?

<div className="rounded-2xl border border-border bg-card p-5 my-4">

Zallet, mevcut bir `wallet.dat`'ü taşır; böylece fonlarınızı ve adreslerinizi korursunuz.

Önce `wallet.dat`'ün yedeğini alın, ardından [geçiş kılavuzunu](/guides/migration-guide-zcashd-to-zebrad-zallet) izleyin. Bakiyenizi Zallet içinde doğrulayana kadar bu yedeği saklayın.

[Zallet hızlı başvuru kaynağı](/using-zcash/zallet-quick-reference-guide), geçiş yaptıktan sonra günlük komutları kapsar.

</div>

## Ironwood nedir ve bir şey yapmam gerekiyor mu?

<div className="rounded-2xl border border-border bg-card p-5 my-4">

Ironwood, ağ yükseltmesi NU6.3'tür ve 28 Temmuz 2026'dan beri 3.428.143 numaralı bloktan itibaren ana ağda aktiftir. Düzeltilmiş bir devre üzerine inşa edilmiş korumalı bir havuz ekler ve eski [Orchard](/using-zcash/shielded-pools) havuzunu kapatır; böylece herkes hiçbir ZEC'ün sahte olarak üretilmediğini doğrulayabilir.

**Korumalı fonlarınız varsa, taşınmaları gerekebilir.** Değer, Orchard'den yalnızca [turnike](/zcash-tech/the-turnstile) aracılığıyla çıkar ve cüzdanlar bu taşımayı farklı zamanlarda ve farklı şekillerde gerçekleştirir. Herhangi bir şeyi elle taşımadan önce cüzdan sağlayıcınıza danışın.

Nelerin ve neden değiştiğini öğrenmek için [Ironwood](/zcash-tech/ironwood) sayfasını okuyun.

</div>

## Hangi tam düğümü çalıştırmalıyım?

<div className="rounded-2xl border border-border bg-card p-5 my-4">

**[Zebra](/zcash-tech/zebra-full-node)**, zcashd'ün doğrudan yerine geçer ve geçiş kılavuzunun varsaydığı düğümdür. Aksini gerektiren bir nedeniniz yoksa bunu seçin.

**[Zakura](/zcash-tech/zakura-node)**, daha hızlı eşzamanlama ve yerel blok budama özellikleriyle ölçeklenmeyi amaçlayan ikinci bir uygulamadır. Bunlara ihtiyacınız varsa veya hâlâ zcashd ile konuşan bir yazılıma bağımlıysanız bunu seçin.

Her ikisi de aynı zinciri doğrular; dolayısıyla bu, fikir birliğinden ziyade operasyonel bir seçimdir.

</div>

## Bir sürüm notundaki terime nereden bakabilirim?

<div className="rounded-2xl border border-border bg-card p-5 my-4">

[Zcash Kütüphanesi'ne](/glossary-and-faqs/zcash-library) bakın. Düğüm ve cüzdan yazılımlarını, korumalı havuzları ve en sık karşılaşılan ZIP numaralarını kapsar.

</div>

## Yaygın birkaç yanlış kanı

<div className="rounded-2xl border border-border bg-card p-5 my-4 overflow-x-auto">

<table className="w-full border-collapse">
  <thead>
    <tr className="border-b border-border bg-amber-100 dark:bg-zinc-800">
      <th className="py-4 px-5 text-left font-bold text-amber-800 dark:text-white">Yanlış Kanı</th>
      <th className="py-4 px-5 text-left font-bold text-amber-800 dark:text-white">Doğru Yanıt</th>
    </tr>
  </thead>
  <tbody>
    <tr className="border-b border-border hover:bg-amber-50 dark:hover:bg-zinc-700">
      <td className="py-4 px-5 font-medium text-foreground">Zcash merkezi bir para birimi mi?</td>
      <td className="py-4 px-5 text-foreground">Hayır. Bir ticari marka anlaşması, Zcash Foundation'ün veya ECC'ün topluluk fikir birliğine karşı hareket etmesini engeller. Yönetimin merkeziyetsiz olduğu kanıtlanmıştır (bkz. [Messari raporu](https://messari.io/report/decentralizing-zcash)). Topluluk anketleri, ZecHub ve Zcash Foundation A/V Club geniş katılımı mümkün kılar.</td>
    </tr>
    <tr className="border-b border-border hover:bg-amber-50 dark:hover:bg-zinc-700">
      <td className="py-4 px-5 font-medium text-foreground">Zcash'de bir arka kapı var mı?</td>
      <td className="py-4 px-5 text-foreground">Hayır. Ne Zcash ne de geliştirdiğimiz herhangi bir kriptografik yazılım arka kapı içerir ve asla içermeyecektir.</td>
    </tr>
    <tr className="border-b border-border hover:bg-amber-50 dark:hover:bg-zinc-700">
      <td className="py-4 px-5 font-medium text-foreground">Zcash bir şirket tarafından mı kontrol ediliyor?</td>
      <td className="py-4 px-5 text-foreground">Yanlış. Araştırma için şirketlerle ortaklık kursak da Zcash merkeziyetsizliğe bağlılığını sürdürmektedir. Birden çok özerk kuruluş, öz saklama ve gizlilik hakları için birlikte çalışır.</td>
    </tr>
    <tr className="hover:bg-amber-50 dark:hover:bg-zinc-700">
      <td className="py-4 px-5 font-medium text-foreground">Zcash, diğer gizlilik paralarına kıyasla sınırlı gizliliğe sahiptir</td>
      <td className="py-4 px-5 text-foreground">Hayır. Monero/Grin tarzı gizlilik, yemlere dayanır (bunlar alt edilebilir). Zcash, tüm korumalı işlem verilerini şifreler; böylece havuzdaki her işlem ayırt edilemez olur. Bkz. [Yeterince Gizli Değil mi?](https://electriccoin.co/blog/not-private-enough-mixers-and-decoys-wont-protect-you-for-long/).</td>
    </tr>
  </tbody>
</table>

</div>

---

**Son güncelleme:** Ekim 2026
**Katkıda bulunmak ister misiniz?** [Bu sayfayı GitHub üzerinde düzenleyin](https://github.com/ZecHub/zechub/edit/main/site/Glossary_and_FAQs/FAQ.md)
