# Sıkça Sorulan Sorular

Zcash hakkında en sık sorulan soruların bir listesi. Zcash istemcisinde sorun giderme için lütfen [resmî sorun giderme kılavuzuna](https://zcash.readthedocs.io/en/latest/rtd_pages/troubleshooting_guide.html) bakın.

### Hızlı Gezinme

<div className="flex flex-wrap gap-2 my-4">
  <a href="#what-is-zcash" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">Zcash nedir?</a>
  <a href="#how-can-i-acquire-zcash" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">Zcash nasıl edinebilirim?</a>
  <a href="#what-is-the-difference-between-zcash-and-other-cryptocurrencies" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">Diğer kripto paralardan farkı nedir?</a>
  <a href="#how-is-the-zcash-protocol-governed" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">Protokol yönetişimi?</a>
  <a href="#where-is-my-transaction" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">İşlemim nerede?</a>
  <a href="#is-zcash-really-private" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">Zcash gerçekten gizli mi?</a>
  <a href="#a-few-common-misconceptions" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">Yaygın yanlış kanılar</a>
  <a href="#zcashd-stopped-working-what-do-i-run-now" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">zcashd çalışmayı durdurdu mu?</a>
  <a href="#how-do-i-move-my-zcashd-wallet-to-zallet" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">Cüzdanımı Zallet'a nasıl taşırım?</a>
  <a href="#what-is-ironwood-and-do-i-need-to-do-anything" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">Ironwood nedir?</a>
  <a href="#which-full-node-should-i-run" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">Hangi tam düğüm?</a>
  <a href="#where-do-i-look-up-a-term-from-a-release-note" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">Bir terime nereden bakabilirim?</a>
</div>

---

## Zcash nedir?

<div className="rounded-2xl border border-border bg-card p-5 my-4">

Zcash, hızlı, gizli işlemler ve düşük ücretler sunan dijital bir para birimidir. Gizlilik, Zcash'in temel özelliğidir. Tüm işlemleri şifrelemek için sıfır bilgi kanıtlarının kullanımına öncülük etmiştir.

Anında, mobil, güvenli ve gizli ödemeler için çeşitli cüzdanlar kullanılabilir: [Cüzdanlar](/using-zcash/wallets)

</div>

## Zcash nasıl edinebilirim?

<div className="rounded-2xl border border-border bg-card p-5 my-4">

ZEC'ı [gözetimli borsalardan](/using-zcash/custodial-exchanges), [DEX'lerden](/using-zcash/dex) veya [merkezi takas platformlarından](/using-zcash/centralized-swaps) satın alabilirsiniz.

Zcash'ı eşler arası olarak da satın alabilir veya madencilik yoluyla edinebilirsiniz.

</div>

## Zcash ile diğer kripto paralar arasındaki fark nedir?

<div className="rounded-2xl border border-border bg-card p-5 my-4">

Zcash, Bitcoin veya Ethereum'dan temelde daha gizlidir. Hızlı blok süreleri (NU7 Kasım 2026'da etkinleştirildiğinden beri 25 saniye; öncesinde 75 saniyeydi), düşük ücretler ve düzenli ağ yükseltmeleri sunar.

Kullanıcılar **Şeffaf** veya **Korumalı** işlemler arasında seçim yapabilir. Daha fazla bilgi için [Korumalı Bir Ekosistem](https://electriccoin.co/blog/shielded-ecosystem) sayfasına bakın.

</div>

## Zcash protokolünün yönetişimi nasıl sağlanır?

<div className="rounded-2xl border border-border bg-card p-5 my-4">

Protokol, **Zcash İyileştirme Önerisi (ZIP)** süreciyle yönetilir. Herkes bir ZIP taslağı gönderebilir. Taslaklar topluluk tarafından tartışılır ve ZIP editörleri tarafından kabul edilir veya reddedilir:

- [Daira Hopwood](https://twitter.com/feministPLT) (Electric Coin Company)
- [Deirdre Connolly](https://twitter.com/durumcrustulum) (Zcash Foundation)

Kararlar spesifikasyona yazılır ve ağ bunları benimsediğinde zincir üstünde onaylanır.

</div>

## İşlemim Nerede?

<div className="rounded-2xl border border-border bg-card p-5 my-4">

Önce [blok gezginleri hakkındaki kılavuzumuzu](/guides/blockchain-explorers) okuyun. Ardından [Zcash Blok Gezgini'ni](https://mainnet.zcashexplorer.app) kontrol edin.

Sabit bir 25 dakikalık sona erme süresi veya otomatik geri ödeme zamanlayıcısı yoktur. Cüzdanınızın kaydettiği sona erme yüksekliğini ve ilk ödemenin madenciliğinin yapılıp yapılmadığını kontrol edin. Ödeme, madenciliği yapılmadan sona erdiyse zincir üstünde sonuçlanmamıştır; sona erme bir geri ödeme işlemi oluşturmaz. Yeniden deneme talimatlarını uygulamadan önce cüzdanın eşitlenmesini bekleyin. [işlem sorun giderme](/using-zcash/transactions#troubleshooting-stuck-transactions) ve [ZIP 203](https://zips.z.cash/zip-0203) sayfalarına bakın.

**Bir işlemin görünmemesinin yaygın nedenleri:**

- Bağlantının kesilmesi
- İşlem ücretinin çok düşük olması
- Ağın aşırı yüklenmesi
- Çok fazla şeffaf girdinin bulunması (boyutun çok büyük olması)

**Başarıyla tamamlamak için ipuçları:**

- Kararlı bir bağlantı kullanın
- Standart ücreti ödeyin (veya öncelik için daha yüksek bir ücret ödeyin)
- Bekleyin ve daha sonra yeniden deneyin
- İşlemi küçük tutmak için daha az girdi kullanın

</div>

## Zcash gerçekten Gizli mi?

<div className="rounded-2xl border border-border bg-card p-5 my-4">

**Evet.** Zcash, korumalı işlemlerde gönderen, tutar ve alıcı verilerini Şifreler.

Zcash şunları **yapmaz**:

- Çoklu imzalı işlemleri Şifrelemez (FROST entegrasyonu beklemede)
- Şeffaf işlemlerle olan korelasyonlara karşı koruma sağlamaz
- IP adreslerini gizlemez

Daha fazla bilgi için: [Korumalı Bir Ekosistem](https://web.archive.org/web/20260903010654/https://electriccoin.co/blog/shielded-ecosystem/)

</div>

## zcashd çalışmayı durdurdu, şimdi ne çalıştırmalıyım?

<div className="rounded-2xl border border-border bg-card p-5 my-4">

zcashd kullanımdan kaldırıldı. 6.20.0 sürümü 18 Temmuz 2026'da 3417100 numaralı blokta kendini kapattı ve Ironwood'ı (NU6.3) hiçbir zaman desteklemedi; dolayısıyla yükseltilecek daha sonraki bir sürüm yoktur.

Bunun yerine Z3 yığınını çalıştırın. Üç program, zcashd'nın tek başına yaptığı işi paylaşır:

- **[Zebra](/zcash-tech/zebra-full-node)**, Zincir'i doğrular
- **[Zaino](/zcash-tech/zaino)**, Zincir'i indeksler ve cüzdan verilerini sunar
- **[Zallet](/zcash-tech/zallet)**, varlıklarınızı tutar

[Zakura](/zcash-tech/zakura-node) alternatif bir tam düğümdür. Ayrıca kendi üzerinde zcashd çalıştırır; bu da başka yazılımlar hâlâ eski arayüzü bekliyorsa yardımcı olur.

[geçiş kılavuzuyla](/guides/migration-guide-zcashd-to-zebrad-zallet) başlayın.

</div>

## zcashd cüzdanımı Zallet'a nasıl taşırım?

<div className="rounded-2xl border border-border bg-card p-5 my-4">

Zallet mevcut bir `wallet.dat`'ı taşır; böylece varlıklarınızı ve adreslerinizi korursunuz.

Önce `wallet.dat` için yedek alın, ardından [geçiş kılavuzunu](/guides/migration-guide-zcashd-to-zebrad-zallet) izleyin. Bakiyenizi Zallet içinde doğrulayıncaya kadar bu yedeği saklayın.

[Zallet hızlı başvuru](/using-zcash/zallet-quick-reference-guide) belgesi, geçiş yaptıktan sonra günlük komutları kapsar.

</div>

## Ironwood nedir ve bir şey yapmam gerekiyor mu?

<div className="rounded-2xl border border-border bg-card p-5 my-4">

Ironwood, ağ yükseltmesi NU6.3'tür. 28 Temmuz 2026'da 3.428.143 numaralı bloktan beri ana ağda çalışmaktadır. Düzeltilmiş bir devre üzerine kurulmuş korumalı bir havuz ekler ve eski [Orchard](/using-zcash/shielded-pools) havuzunu mühürler; böylece herkes Orchard'da sahte ZEC üretilmediğini doğrulayabilir.

**Korumalı varlıklarınız varsa bunların taşınması gerekebilir.** Değer, Orchard'dan yalnızca [turnike](/zcash-tech/the-turnstile) üzerinden çıkar ve cüzdanlar bu taşımayı farklı zamanlarda ve farklı şekillerde gerçekleştirir. Herhangi bir şeyi elle taşımadan önce cüzdan sağlayıcınıza danışın.

Nelerin değiştiğini ve nedenini öğrenmek için [Ironwood](/zcash-tech/ironwood) sayfasını okuyun.

</div>

## Hangi tam düğümü çalıştırmalıyım?

<div className="rounded-2xl border border-border bg-card p-5 my-4">

**[Zebra](/zcash-tech/zebra-full-node)**, zcashd'in doğrudan yerine geçer ve geçiş kılavuzunun varsaydığı düğümdür. Aksine bir nedeniniz yoksa bunu seçin.

**[Zakura](/zcash-tech/zakura-node)**, ölçeklenmeye odaklanan, daha hızlı eşitleme ve yerel blok budama sunan ikinci uygulamadır. Bunlara ihtiyacınız varsa veya hâlâ zcashd ile iletişim kuran bir yazılıma bağlıysanız bunu seçin.

Her ikisi de aynı Zincir'i doğrular; dolayısıyla bu, konsensüs seçimi değil, operasyonel bir tercihtir.

</div>

## Sürüm notundaki bir terime nereden bakabilirim?

<div className="rounded-2xl border border-border bg-card p-5 my-4">

[Zcash Kütüphanesine](/glossary-and-faqs/zcash-library) bakın. Bu kütüphane, düğüm ve cüzdan yazılımlarını, korumalı havuzları ve en sık karşılaşılan ZIP numaralarını kapsar.

</div>

## Bazı yaygın yanlış kanılar

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
      <td className="py-4 px-5 font-medium text-foreground">Zcash merkezi bir coin mi?</td>
      <td className="py-4 px-5 text-foreground">Hayır. Bir ticari marka anlaşması, Zcash Foundation veya ECC'nın topluluk konsensüsüne karşı hareket etmesini engeller. Yönetişimin merkeziyetsiz olduğu kanıtlanmıştır (bkz. [Messari raporu](https://messari.io/report/decentralizing-zcash)). Topluluk anketleri, ZecHub ve Zcash Foundation A/V Club geniş katılımı mümkün kılar.</td>
    </tr>
    <tr className="border-b border-border hover:bg-amber-50 dark:hover:bg-zinc-700">
      <td className="py-4 px-5 font-medium text-foreground">Zcash'in bir arka kapısı var mı?</td>
      <td className="py-4 px-5 text-foreground">Hayır. Ne Zcash ne de geliştirdiğimiz herhangi bir kriptografik yazılım bir arka kapı içerir ve gelecekte de içermeyecektir.</td>
    </tr>
    <tr className="border-b border-border hover:bg-amber-50 dark:hover:bg-zinc-700">
      <td className="py-4 px-5 font-medium text-foreground">Zcash bir şirket tarafından mı kontrol ediliyor?</td>
      <td className="py-4 px-5 text-foreground">Yanlış. Araştırma için şirketlerle ortaklık kursak da Zcash merkeziyetsizliğe bağlılığını sürdürmektedir. Birden çok özerk kuruluş, kendi varlıklarını koruma ve gizlilik hakları doğrultusunda birlikte çalışır.</td>
    </tr>
    <tr className="hover:bg-amber-50 dark:hover:bg-zinc-700">
      <td className="py-4 px-5 font-medium text-foreground">Zcash, diğer gizlilik coin'lerine kıyasla sınırlı gizliliğe sahiptir</td>
      <td className="py-4 px-5 text-foreground">Hayır. Monero/Grin tarzı gizlilik, etkisiz hâle getirilebilen yemlere dayanır. Zcash, tüm korumalı işlem verilerini Şifreler; böylece havuzdaki her işlem birbirinden ayırt edilemez. [Yeterince Gizli Değil mi?](https://electriccoin.co/blog/not-private-enough-mixers-and-decoys-wont-protect-you-for-long/) sayfasına bakın.</td>
    </tr>
  </tbody>
</table>

</div>

---

**Son güncelleme:** Ekim 2026
**Katkıda bulunmak ister misiniz?** [Bu sayfayı GitHub](https://github.com/ZecHub/zechub/edit/main/site/Glossary_and_FAQs/FAQ.md) üzerinde düzenleyin
