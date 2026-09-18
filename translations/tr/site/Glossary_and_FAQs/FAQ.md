# Sıkça Sorulan Sorular

Zcash hakkında en yaygın soruların bir listesi. Zcash istemcisiyle ilgili sorun giderme için lütfen [resmî sorun giderme rehberine](https://zcash.readthedocs.io/en/latest/rtd_pages/troubleshooting_guide.html) bakın.

### Hızlı Gezinme

<div className="flex flex-wrap gap-2 my-4">
  <a href="#what-is-zcash" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">Zcash nedir?</a>
  <a href="#how-can-i-acquire-zcash" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">Zcash nasıl edinebilirim?</a>
  <a href="#what-is-the-difference-between-zcash-and-other-cryptocurrencies" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">Diğer kripto paralarla farkı?</a>
  <a href="#how-is-the-zcash-protocol-governed" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">Protokol yönetimi?</a>
  <a href="#where-is-my-transaction" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">İşlemim nerede?</a>
  <a href="#is-zcash-really-private" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">Zcash gerçekten gizli mi?</a>
  <a href="#a-few-common-misconceptions" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">Yaygın yanlış kanılar</a>
</div>

---

## Zcash nedir?

<div className="rounded-2xl border border-border bg-card p-5 my-4">

Zcash, hızlı, gizli işlemlere ve düşük ücretlere sahip bir dijital para birimidir. Gizlilik, Zcash'ün temel özelliğidir. Tüm işlemleri şifrelemek için sıfır bilgi kanıtlarının kullanımına öncülük etmiştir.

Anında, mobil, güvenli ve gizli ödemeler için çeşitli cüzdanlar mevcuttur: [Cüzdanlar](/using-zcash/wallets)

</div>

## Zcash nasıl edinebilirim?

<div className="rounded-2xl border border-border bg-card p-5 my-4">

ZEC'ü [saklama hizmeti sunan borsalardan](/using-zcash/custodial-exchanges), [DEX'lerden](/dex) veya [merkezi swap platformlarından](/using-zcash/centralizedswaps) satın alabilirsiniz.

Ayrıca Zcash'ü eşler arası olarak satın alabilir veya madencilik yoluyla edinebilirsiniz.

</div>

## Zcash ile diğer kripto paralar arasındaki fark nedir?

<div className="rounded-2xl border border-border bg-card p-5 my-4">

Zcash, Bitcoin veya Ethereum'dan temelde daha gizlidir. Hızlı blok süreleri (75 saniye), düşük ücretler ve düzenli yükseltmeler sunar.

Kullanıcılar **Şeffaf** veya **Korumalı** işlemler arasında seçim yapabilir. Daha fazla bilgi için [Korumalı Bir Ekosistem](https://electriccoin.co/blog/shielded-ecosystem) bölümüne bakın.

</div>

## Zcash protokolü nasıl yönetilir?

<div className="rounded-2xl border border-border bg-card p-5 my-4">

Protokol, **Zcash İyileştirme Önerisi (ZIP)** süreciyle yönetilir. Herkes taslak bir ZIP sunabilir. Taslaklar topluluk tarafından tartışılır ve ZIP editörleri tarafından kabul veya reddedilir:

- [Daira Hopwood](https://twitter.com/feministPLT) (Electric Coin Company)
- [Deirdre Connolly](https://twitter.com/durumcrustulum) (Zcash Foundation)

Kararlar spesifikasyona yazılır ve ağ bunları benimsediğinde zincir üzerinde onaylanır.

</div>

## İşlemim nerede?

<div className="rounded-2xl border border-border bg-card p-5 my-4">

Önce [blok gezginleri rehberimizi](/guides/blockchain-explorers) okuyun. Ardından [Zcash Blok Gezgini'ni](https://zcashblockexplorer.com) kontrol edin.

İşlemler yaklaşık 25 dakika (20 blok) sonra sona erer ve fonlar otomatik olarak iade edilir.

**Bir işlemin görünmemesinin yaygın nedenleri:**

- Bağlantı kaybı
- İşlem ücretinin çok düşük olması
- Ağ aşırı yükü
- Çok fazla şeffaf girdi (boyutun çok büyük olması)

**Başarılı olmak için ipuçları:**

- Kararlı bir bağlantı kullanın
- Standart ücreti ödeyin (veya öncelik için daha yüksek bir ücret)
- Bekleyin ve daha sonra tekrar deneyin
- İşlemi küçük tutmak için daha az girdi kullanın

</div>

## Zcash gerçekten Gizli mi?

<div className="rounded-2xl border border-border bg-card p-5 my-4">

**Evet.** Zcash, korumalı işlemler için gönderici, tutar ve alıcı verilerini şifreler.

Zcash şunları **yapmaz**:

- Çoklu imzalı işlemleri şifrelemez (FROST entegrasyonu bekleniyor)
- Şeffaf işlemlerle olan korelasyonlara karşı koruma sağlamaz
- IP adreslerini gizlemez

Ek okuma: [Korumalı Bir Ekosistem](https://electriccoin.co/blog/shielded-ecosystem)

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
      <td className="py-4 px-5 font-medium text-foreground">Zcash merkezi bir para birimi mi?</td>
      <td className="py-4 px-5 text-foreground">Hayır. Bir ticari marka anlaşması, Zcash Foundation veya ECC'nin topluluk fikir birliğine karşı hareket etmesini önler. Yönetimin merkeziyetsiz olduğu kanıtlanmıştır (bkz. [Messari raporu](https://messari.io/report/decentralizing-zcash)). Topluluk anketleri, ZecHub ve Zcash Foundation A/V Club geniş katılımı mümkün kılar.</td>
    </tr>
    <tr className="border-b border-border hover:bg-amber-50 dark:hover:bg-zinc-700">
      <td className="py-4 px-5 font-medium text-foreground">Zcash'te bir arka kapı var mı?</td>
      <td className="py-4 px-5 text-foreground">Hayır. Ne Zcash ne de geliştirdiğimiz herhangi bir kriptografik yazılım arka kapı içerir veya içeriyor olacaktır.</td>
    </tr>
    <tr className="border-b border-border hover:bg-amber-50 dark:hover:bg-zinc-700">
      <td className="py-4 px-5 font-medium text-foreground">Zcash bir şirket tarafından mı kontrol ediliyor?</td>
      <td className="py-4 px-5 text-foreground">Yanlış. Araştırma için şirketlerle ortaklık kuruyor olsak da Zcash merkeziyetsizliğe bağlılığını sürdürmektedir. Birden fazla özerk kuruluş, kendi saklama ve gizlilik hakları için birlikte çalışır.</td>
    </tr>
    <tr className="hover:bg-amber-50 dark:hover:bg-zinc-700">
      <td className="py-4 px-5 font-medium text-foreground">Zcash, diğer gizlilik paralarına kıyasla sınırlı gizliliğe sahiptir</td>
      <td className="py-4 px-5 text-foreground">Hayır. Monero/Grin tarzı gizlilik, aldatıcı kayıtlara dayanır (bunlar alt edilebilir). Zcash, tüm korumalı işlem verilerini şifreler; böylece havuzdaki her işlem birbirinden ayırt edilemez. Bkz. [Yeterince Gizli Değil mi?](https://electriccoin.co/blog/not-private-enough-mixers-and-decoys-wont-protect-you-for-long/).</td>
    </tr>
  </tbody>
</table>

</div>

---

**Son güncelleme:** Mart 2026
**Katkıda bulunmak ister misiniz?** [Bu sayfayı GitHub'da düzenleyin](https://github.com/ZecHub/zechub/edit/main/site/Glossary_and_FAQs/FAQ.md)
