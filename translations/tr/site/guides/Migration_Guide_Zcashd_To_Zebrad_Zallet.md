# Geçiş Rehberi: zcashd’den Zebrad/Zallet’e

*Electric Coin Company (ECC)* / *Zodl* tarafından sürdürülen geleneksel zcashd tam düğümü, Zebra ve Zallet ile değiştirildi. zcashd, 18 Temmuz 2026 tarihinde destek sonu durdurmasına ulaştı ve artık çalışmıyor.

- Zebra, Zcash Foundation tarafından geliştirilen Zcash protokolünün modern bir Rust uygulamasıdır
- Zallet, Zodl tarafından geliştirilen Zebra düğümleriyle sorunsuz biçimde çalışmak üzere oluşturulmuş hafif bir cüzdandır

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![Diyagram: zcashd’nin düğüm görevleri için zebrad’a ve cüzdan görevleri için Zallet’e ayrılması](/content-images/SJNBsSYTel-dfd19f34e4.webp)
</div>

Bu rehber; kurulum, cüzdan içe aktarma ve yaygın geçiş sorunlarını giderme dâhil olmak üzere **Zcashd**’den **Zebrad** ve **Zallet**’e geçişte size yol gösterir.

---

## zcashd, 18 Temmuz 2026 tarihinde çalışmayı durdurdu

**Bu ne anlama geliyor**

- zcashd, 18 Temmuz 2026 tarihinde destek sonu durdurmasına ulaştı. Artık zincir ucuyla eşzamanlanmayacak ve para gönderip alamayacak. Bu planlanan değil, tamamlanmış bir durumdur.
- zcashd’nin iki görevi artık ayrıldı: **zebrad** tam düğümdür, **Zallet** ise cüzdandır.
- Zallet **beta** aşamasındadır. Sürümler arasında uyumluluğu bozan değişiklikler olabilir ve bazı zcashd JSON-RPC metotları henüz uygulanmamıştır. Belirli bir çağrıya güvenmeden önce [metot durum matrisini](https://zcash.github.io/zallet/) kontrol edin.
- Hâlâ **Sprout** fonlarınız varsa önce 6. adımdaki uyarıyı okuyun. Zallet, Sprout havuzunu desteklemez ve bu fonları taşımanın olağan yolu çalışan bir zcashd gerektiriyordu.

**Neden Geçiş Yapılmalı - Kullanımdan Kaldırmanın Ötesinde**

Kullanımdan kaldırmayı bir kenara bıraksak bile, geçiş yapmak için güçlü nedenler vardır:
- Güvenlik ve Dayanıklılık: Rust’ın bellek güvenliği ve modern araçları, güvenlik açığı risklerini azaltır.
- Performans ve Verimlilik: Zebrad, paralellik, daha verimli kaynak kullanımı ve daha hızlı eşzamanlama için tasarlanmıştır.
- Modüler Mimari: Düğüm mantığını (Zebrad) cüzdan arayüzünden (Zallet) ayırmak, daha net sınırlar ve daha iyi yükseltme yolları sunar.
- Gelecekteki Ekosistem Uyumluluğu: Araçlar, iyileştirmeler ve Zcash ekosisteminin geri kalanı giderek daha fazla Zebrad/Zallet’i hedefleyecektir.
- İç Huzuru: Kullanımdan kaldırılmış, desteklenmeyen bir bileşeni çalıştırmak zorunda kalmaktan kaçının.

### Şimdi geçiş rehberine geçelim

**1. Her Şeyin Yedeğini Alın**
* zcashd düğümünüzden wallet.dat (veya başka herhangi bir cüzdan dosyası / anahtar deposu) dosyanızı yedekleyin.

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![bash (1)](/content-images/SJ_0mUtTxg-1441185a72.svg)
</div>

* zcash.conf dosyanızı ve tüm özel ayarlarınızı kaydedin.
* Kullandığınız tüm RPC betiklerinin veya otomasyonların bir kopyasını dışa aktarın.
* Yedeklerinizin geçerli olduğunu doğrulayın (örneğin başka bir ortamda açmayı veya incelemeyi deneyin).
* Şu anda hangi JSON-RPC metotlarına güvendiğinizi gözden geçirin.
* [Zcash destek sitesinde](https://z.cash/support/zcashd-deprecation/) tutulan planlanan uyumluluk tablosuyla karşılaştırın 
* Değişikliklere veya eksik metotlara hazırlıklı olun (bazıları geçici çözüm veya uyarlama gerektirebilir).

**2. Sistem Gereksinimleri ve Disk Alanı**
* Disk alanı, insanların hafife aldığı gereksinimdir. Zcash zinciri Ağustos 2026’da **270 GB**’ı geçti; bu nedenle mümkünse SSD üzerinde en az **300 GB** boş alan ayırın.
* Makinenizin kararlı ağ, CPU ve RAM’e sahip olduğundan emin olun.
* İnternet bağlantısı 
* Kaynak koddan derlemeyi planlıyorsanız Rust ve Cargo’nun yüklü olduğundan emin olun.

**3. Zebrad’ı Kurun / Yapılandırın**
Önceden derlenmiş bir ikili dosya indirebilir veya kaynak koddan derleyebilirsiniz.
* Zcash Foundation, Zebra için sürümler ve ikili dosyalar yayımlar. Örneğin, bir kurulum betiği kullanabilir veya işletim sisteminiz için uygun ikili dosyayı indirebilirsiniz.

* Yakın tarihli Zebra sürümlerinde [RPC uç noktasının Docker’da artık varsayılan olarak etkin olmadığını](https://zfnd.org/zebra-2-3-0-release/) unutmayın.

**Seçenek A: Önceden derlenmiş ikili dosya ile kurulum**  
**Linux**/**macOS** üzerinde:

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![bash (2)](/content-images/HJhYu8Y6el-d2198f22c9.svg)
</div>

Bu, zebrad’ın en güncel kararlı sürümünü kurar.

**Seçenek B: Kaynak koddan derleme**

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![bash (3)](/content-images/Syg8FUK6eg-b4557e52e0.svg)
</div>

Derlemeden sonra ikili dosyayı yolunuza taşıyın:

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![geçiş 11](/content-images/BJ0zjLY6ll-f77354d701.webp)
</div>

**4. Yapılandırma ve Başlatma**  
Varsayılan bir yapılandırma oluşturun:

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![geçiş2](/content-images/HJV1C8tTxx-5823395651.webp)
</div>

**zebrad.toml** dosyasını tercihlerinize göre düzenleyin (dinleme adresi, portlar, durum dizini, önbellekleme).

**Düğümü başlatın:**

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![görüntü](/content-images/H1KPkvt6gl-864c48ca40.webp)
</div>

Düğüm genesis’ten eşzamanlamaya başlayacaktır — donanımınıza ve ağınıza bağlı olarak birkaç saat (veya daha fazla) sürebilir.

**5. Zallet’i Kurun / Yapılandırın (Cüzdan)**

Zallet, zcashd’nin cüzdan bölümünün yerini almak üzere tasarlanmıştır.

İkili dosyalar için Zallet GitHub / sürüm sayfasını kontrol edin.

**Veya kaynak koddan derleyin:**

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![görüntü](/content-images/SyUFxvFTex-5bb10ee1d3.webp)
</div>

* GUI veya CLI’ı (kurulumunuzun sağladığı şekilde) başlatın.
* RPC veya API uç noktası aracılığıyla yerel Zebrad düğümünüze bağlanacak şekilde yapılandırın.

**6. zcashd Cüzdanınızı Zallet’e İçe Aktarma**

Bunun için çalışan bir zcashd’ye ihtiyacınız yoktur. Zallet, `wallet.dat` dosyasını doğrudan okur; zcashd artık başlatılamadığı için bu önemlidir.

> **`wallet.dat` dosyasını saklayın.** Geçiş, Zallet cüzdanında temsil edemediği her şeyi içe aktarmak yerine raporlar ve bu anahtar materyali yalnızca `wallet.dat` içinde bulunur. Geçişten sonra silmeyin.

Önce `zallet init-wallet-encryption` komutunu çalıştırın. Zallet, anahtar materyalini bir age kimliğine şifreler ve herhangi bir anahtar içe aktarılmadan önce bu kimliğin var olması gerekir.

Ardından yapılandırmanızı ve cüzdanınızı dönüştürün:

```bash
# translate zcash.conf into zallet.toml
zallet migrate-zcash-conf --zcashd-datadir /path/to/zcashd/datadir -o /path/to/zallet/datadir/zallet.toml

# import wallet.dat into Zallet's wallet.db
zallet migrate-zcashd-wallet --zcashd-datadir /path/to/zcashd/datadir
```

`migrate-zcashd-wallet` yalnızca `zcashd-import` özelliğine sahip derlemelerde bulunur ve `wallet.dat` dosyasını okumak, zcashd’nin kullandığı sürüm olan Berkeley DB 6.2’nin `db_dump` aracını gerektirir. Birden fazla cüzdan dosyanız varsa komutu her dosya için bir kez çalıştırın ve sonraki çalıştırmalarda `--allow-multiple-wallet-imports` ekleyin; her biri kendi hesap kümesine dönüşür. Zallet’in JSON-RPC’si varsayılan olarak çerez kimlik doğrulaması kullandığından `rpcuser` ve `rpcpassword` aktarılmaz; gerekirse `zallet add-rpc-user` ile kimlik bilgileri ekleyin.

**Neler aktarılır**

* Anımsatıcı tohumlar ve bunlardan türetilen anahtarlar; hesaplar zcashd cüzdanıyla eşleşecek şekilde yeniden oluşturulur
* Bağımsız olarak içe aktarılmış Sapling harcama anahtarları ve şeffaf anahtarlar
* Genel anahtarını veya geri ödeme betiğini içeren salt okunur şeffaf girdiler
* Zincir taramasının doğru yükseklikten başlaması için hesap doğum günleri

**Neler aktarılmaz.** Bunlar içe aktarılmak yerine sayılarıyla raporlanır:

* **Sprout harcama anahtarları ve fonları.** Zallet, Sprout havuzunu desteklemez. Belgelenmiş yol, Sprout fonlarını zcashd kullanarak kullanımdan kaldırılmadan önce taşımaktı ve bu artık mümkün değildir. Bu sizi etkiliyorsa başka bir şey yapmadan önce [Zcash R&D Discord](https://discord.gg/xpzPR53xtU) sunucusuna veya [topluluk forumuna](https://forum.zcashcommunity.com/) sorun.
* Adres defteri girdileri
* Genel anahtar veya geri ödeme betiği olmadan saklanan salt okunur girdiler ve sıkıştırılmamış genel anahtarlara sahip girdiler
* Regtest cüzdanları

**Sonrasında yedekleme.** Anımsatıcı tek başına tam bir yedek değildir; çünkü içe aktarılan anahtarlar yalnızca cüzdan veritabanında bulunur. `wallet.db` dosyasının, `keystore.encryption_identity` seçeneğinin belirttiği age şifreleme kimlik dosyasının ve anımsatıcı ifadenizin güvenli kopyalarını saklayın; ayrıca orijinal `wallet.dat` dosyasını da koruyun. `wallet.db` dosyasının kendisinin şifrelenmediğini unutmayın: işlem geçmişinizi ve görüntüleme anahtarlarınızı açık biçimde tutar; bu yüzden yedeği güvenli bir yerde saklayın.

**Cüzdanı Yeniden Tarama ve Eşzamanlama**

* Anahtarlar içe aktarıldığında Zallet, Zebrad üzerinden zincirin yeniden taranmasını tetikler.
* Zallet’in bakiyenizi ve işlem geçmişinizi yeniden oluşturması için biraz zaman tanıyın.

**7. Bakiyeleri ve Eşzamanlamayı Doğrulayın**

İçe aktarıldıktan sonra Zallet, Zebrad düğümünüze bağlanacak ve blokzinciri yeniden tarayacaktır.
Eşzamanlama tamamlandığında bakiyeleriniz ve işlemleriniz eskisiyle tamamen aynı şekilde görünmelidir.

Düğümünüzün eşzamanlama durumunu şu komutu çalıştırarak doğrulayabilirsiniz:

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![görüntü](/content-images/SyIyVDY6xl-10d6bed7b8.webp)
</div>

Ya da günlükleri kontrol edin.

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![görüntü](/content-images/r1HfVPF6gg-b6b76e9907.webp)
</div>

**8. Sorun Giderme**

<div className="overflow-x-auto my-8 rounded-2xl border border-slate-200 dark:border-slate-700">
  <table className="w-full min-w-full border-collapse text-sm">
    <thead className="bg-slate-100 dark:bg-slate-800">
      <tr>
        <th className="px-6 py-4 text-left font-semibold text-slate-900 dark:text-white">Sorun</th>
        <th className="px-6 py-4 text-left font-semibold text-slate-900 dark:text-white">Olası Neden</th>
        <th className="px-6 py-4 text-left font-semibold text-slate-900 dark:text-white">Çözüm</th>
      </tr>
    </thead>
    <tbody>
      <tr className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-900/50">
        <td className="px-6 py-4">Zebrad başlatılamıyor</td>
        <td className="px-6 py-4">Port kullanımda veya yapılandırma hatalı</td>
        <td className="px-6 py-4">**zebrad.toml** dosyasını kontrol edin ve boş bir port kullanın</td>
      </tr>
      <tr className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-900/50">
        <td className="px-6 py-4">Yavaş eşzamanlama</td>
        <td className="px-6 py-4">Ağ yoğunluğu</td>
        <td className="px-6 py-4">İnternet bağlantısının kararlı olduğundan emin olun, Zebrad’ı yeniden başlatın</td>
      </tr>
      <tr className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-900/50">
        <td className="px-6 py-4">Cüzdanda işlemler eksik</td>
        <td className="px-6 py-4">Kısmi anahtar içe aktarma</td>
        <td className="px-6 py-4">Anahtarları yeniden içe aktarın veya Zallet’te yeniden tarama yapın</td>
      </tr>
      <tr className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-900/50">
        <td className="px-6 py-4">Zallet düğüme bağlanamıyor</td>
        <td className="px-6 py-4">Düğüm çalışmıyor veya uç nokta hatalı</td>
        <td className="px-6 py-4">Zebrad’ı başlatın ve doğru RPC portunu doğrulayın</td>
      </tr>
      <tr className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-900/50">
        <td className="px-6 py-4">Zallet çöküyor</td>
        <td className="px-6 py-4">Güncel olmayan derleme</td>
        <td className="px-6 py-4">GitHub’daki en güncel sürüme yükseltin</td>
      </tr>
    </tbody>
  </table>
</div>

**9. Sonuç**

zcashd’den Zebrad ve Zallet’e geçiş yapmak size daha hızlı, daha güvenli ve daha modern bir Zcash deneyimi sunar.
Rust tabanlı güvenlik, modüler tasarım ve daha iyi araçlarla bu kurulum, Zcash ekosistemi gelişmeye devam ederken düğümünüzün ve cüzdanınızın geleceğe hazır kalmasını sağlar.

İpucu: Cüzdan anahtarlarınızı çevrimdışı tutun ve Zallet verilerinizi düzenli olarak yedekleyin.
Zebra için [zebra.zfnd.org](https://zebra.zfnd.org) adresini; Zallet için [The Zallet Book](https://zcash.github.io/zallet/) veya [Zallet deposunu](https://github.com/zcash/zallet) ziyaret edin. The Zallet Book’taki [zcashd’den Geçiş](https://zcash.github.io/zallet/) bölümü, 6. adım için yetkili kaynaktır.
