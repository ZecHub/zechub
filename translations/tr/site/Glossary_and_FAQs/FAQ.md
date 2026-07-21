# Sıkça Sorulan Sorular

Zcash hakkında en yaygın soruların bir listesi. Zcash istemcisinde sorun giderme için lütfen [resmî sorun giderme kılavuzuna](https://zcash.readthedocs.io/en/latest/rtd_pages/troubleshooting_guide.html) bakın.

### Hızlı Gezinme
[Zcash nedir?](#what-is-zcash) | [Zcash nasıl edinilir?](#acquire) | [Diğer kripto paralarla farkı nedir?](#difference) | [Protokol yönetişimi?](#governance) | [İşlemim nerede?](#transaction) | [Zcash gerçekten özel mi?](#privacy) | [Yaygın Yanılgılar](#misconceptions)

---

## Zcash nedir?

<div className="overflow-x-auto my-8 rounded-3xl border border-border bg-card p-6">
Zcash, hızlı, gizli işlemler ve düşük ücretler sunan bir dijital para birimidir. Gizlilik, Zcash’in temel özelliğidir. Tüm işlemleri şifrelemek için sıfır bilgi ispatlarının kullanımına öncülük etmiştir.  

Anlık, mobil, güvenli ve özel ödemeler için çeşitli cüzdanlar mevcuttur: [Mobil Cüzdanlar](https://z.cash/wallets/)
</div>

## Zcash’i nasıl edinebilirim?

<div className="overflow-x-auto my-8 rounded-3xl border border-border bg-card p-6">
ZEC’i kripto para [borsalarından](https://z.cash/exchanges) satın alabilirsiniz.  
Ayrıca Zcash’i eşler arası olarak satın alabilir veya madencilik yaparak edinebilirsiniz.
</div>

## Zcash ile diğer kripto paralar arasındaki fark nedir?

<div className="overflow-x-auto my-8 rounded-3xl border border-border bg-card p-6">
Zcash, Bitcoin veya Ethereum’dan temelde daha özeldir. Hızlı blok süreleri (75 saniye), düşük ücretler ve düzenli yükseltmeler sunar.  

Kullanıcılar **Transparent** veya **Shielded** işlemler arasında seçim yapabilir. Daha fazla bilgi için [Shielded Bir Ekosistem](https://bitzecbzc.github.io/blog/shielded-ecosystem/index.html) sayfasına bakın.
</div>

## Zcash protokolü nasıl yönetilir?

<div className="overflow-x-auto my-8 rounded-3xl border border-border bg-card p-6">
Protokol, **Zcash Improvement Proposal (ZIP)** süreci ile yönetilir. Herkes taslak bir ZIP sunabilir. Taslaklar topluluk tarafından tartışılır ve ZIP editörleri tarafından kabul edilir veya reddedilir:

- [Daira Hopwood](https://twitter.com/feministPLT) (Electric Coin Company)  
- [Deirdre Connolly](https://twitter.com/durumcrustulum) (Zcash Foundation)

Kararlar spesifikasyona yazılır ve ağ bunları benimsediğinde zincir üzerinde onaylanır.
</div>

## İşlemim nerede?

<div className="overflow-x-auto my-8 rounded-3xl border border-border bg-card p-6">
Önce [blok gezginleri rehberimizi](https://zechub.notion.site/Zcash-Blockchain-Explorer-4b4d970cb53e474989932c6e1a78b629) okuyun. Ardından [Zcash Block Explorer](https://zcashblockexplorer.com) üzerinden kontrol edin.  

İşlemler yaklaşık 25 dakika (20 blok) sonra süresi dolarak sona erer ve fonlar otomatik olarak iade edilir.  

**Bir işlemin görünmemesinin yaygın nedenleri:**
- Bağlantı kaybı
- İşlem ücretinin çok düşük olması
- Ağın aşırı yük altında olması
- Çok fazla transparent girdi kullanılması (boyutun çok büyük olması)

**Başarı için ipuçları:**
- Kararlı bir bağlantı kullanın
- Standart ücreti ödeyin (veya öncelik için daha yüksek)
- Bekleyin ve daha sonra tekrar deneyin
- İşlemi küçük tutmak için daha az girdi kullanın
</div>

## Zcash gerçekten Özel mi?

<div className="overflow-x-auto my-8 rounded-3xl border border-border bg-card p-6">
**Evet.** Zcash, shielded işlemler için gönderici, tutar ve alıcı verilerini şifreler.  

Zcash şunları **yapmaz**:
- Çoklu imza işlemlerini şifrelemez (FROST entegrasyonu bekleniyor)
- Transparent işlemlerle olan korelasyonlara karşı koruma sağlamaz
- IP adreslerini gizlemez

İleri okuma: [Shielded Bir Ekosistem](https://electriccoin.co/blog/shielded-ecosystem)
</div>

## Bazı yaygın yanlış anlamalar

<div className="overflow-x-auto my-8 rounded-3xl border border-border bg-card p-6">
  <table className="w-full border-collapse rounded-2xl overflow-hidden">
    <thead>
      <tr className="border-b border-border bg-amber-100 dark:bg-zinc-800">
        <th className="py-6 px-6 text-left font-bold text-amber-800 dark:text-white">Yanlış Anlama</th>
        <th className="py-6 px-6 text-left font-bold text-amber-800 dark:text-white">Doğru Cevap</th>
      </tr>
    </thead>
    <tbody>
      <tr className="border-b border-border hover:bg-amber-50 dark:hover:bg-zinc-700">
        <td className="py-5 px-6 font-medium text-foreground">Zcash merkezi bir coin mi?</td>
        <td className="py-5 px-6 text-foreground">Hayır. Bir ticari marka anlaşması, Zcash Foundation veya ECC’nin topluluk mutabakatına karşı hareket etmesini engeller. Yönetişimin merkeziyetsiz olduğu kanıtlanmıştır (bkz. [Messari raporu](https://messari.io/report/decentralizing-zcash)). Topluluk anketleri, ZecHub ve Zcash Foundation A/V Club geniş katılımı mümkün kılar.</td>
      </tr>
      <tr className="border-b border-border hover:bg-amber-50 dark:hover:bg-zinc-700">
        <td className="py-5 px-6 font-medium text-foreground">Zcash’te bir arka kapı var mı?</td>
        <td className="py-5 px-6 text-foreground">Hayır. Ne Zcash ne de geliştirdiğimiz herhangi bir kriptografik yazılım bir arka kapı içerir; ayrıca hiçbir zaman içermeyecektir.</td>
      </tr>
      <tr className="border-b border-border hover:bg-amber-50 dark:hover:bg-zinc-700">
        <td className="py-5 px-6 font-medium text-foreground">Zcash bir şirket tarafından mı kontrol ediliyor?</td>
        <td className="py-5 px-6 text-foreground">Yanlış. Araştırma için şirketlerle ortaklık kursak da Zcash merkeziyetsizliğe bağlı kalır. Birden fazla özerk kuruluş, kendi kendine saklama ve gizlilik hakları doğrultusunda birlikte çalışır.</td>
      </tr>
      <tr className="hover:bg-amber-50 dark:hover:bg-zinc-700">
        <td className="py-5 px-6 font-medium text-foreground">Zcash’in gizliliği diğer gizlilik coin’lerine kıyasla sınırlıdır</td>
        <td className="py-5 px-6 text-foreground">Hayır. Monero/Grin tarzı gizlilik, aldatıcı işlemlere dayanır (ve bunlar aşılabilir). Zcash, tüm shielded işlem verilerini şifreler; böylece havuzdaki her işlem ayırt edilemez hale gelir. Bkz. [Yeterince Özel Değil mi?](https://electriccoin.co/blog/not-private-enough-mixers-and-decoys-wont-protect-you-for-long/).</td>
      </tr>
    </tbody>
  </table>
</div>

---

**Son güncelleme:** Mart 2026  
**Katkıda bulunmak ister misiniz?** [Bu sayfayı GitHub’da düzenleyin](https://github.com/ZecHub/zechub/edit/main/site/Glossary_and_FAQs/FAQ.md)
