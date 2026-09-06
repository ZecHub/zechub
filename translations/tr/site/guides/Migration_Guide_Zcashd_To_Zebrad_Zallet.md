# Geçiş Rehberi: zcashd'den Zebrad/Zallet'e

*Electric Coin Company (ECC)* / *Zodl* tarafından sürdürülen geleneksel zcashd tam düğümü, Zebra ve Zallet ile değiştirildi. zcashd, 18 Temmuz 2026 tarihinde destek sonu durdurmasına ulaştı ve artık çalışmıyor.

- Zebra, Zcash Foundation tarafından geliştirilen Zcash protokolünün modern bir Rust uygulamasıdır
- Zallet, Zodl tarafından geliştirilen Zebra düğümleriyle sorunsuz biçimde çalışmak üzere oluşturulmuş hafif bir cüzdandır

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![Diyagram: zcashd, düğüm görevleri için zebrad ve cüzdan görevleri için Zallet olarak ayrılıyor](/content-images/SJNBsSYTel-dfd19f34e4.webp)
</div>

Bu rehber, kurulum, cüzdan içe aktarma ve yaygın geçiş sorunlarının giderilmesi dahil olmak üzere **Zcashd**'den **Zebrad** ve **Zallet**'e geçişte size yol gösterir.

---

## zcashd 18 Temmuz 2026 tarihinde çalışmayı durdurdu

**Bu ne anlama geliyor**

- zcashd, 18 Temmuz 2026 tarihinde destek sonu durdurmasına ulaştı. Artık zincirin en güncel bloğuyla tekrar senkronize olmayacak; fon gönderemez veya alamaz. Bu planlanan değil, tamamlanmış bir durumdur.
- zcashd'nin iki görevi artık ayrıldı: **zebrad** tam düğümdür, **Zallet** ise cüzdandır.
- Zallet **beta** aşamasındadır. Sürümler arasında uyumluluğu bozan değişiklikler olabilir ve bazı zcashd JSON-RPC yöntemleri henüz uygulanmamıştır. Belirli bir çağrıya bağımlı olmadan önce [yöntem durum matrisini](https://zcash.github.io/zallet/) kontrol edin.
- Hâlâ **Sprout** fonlarınız varsa önce 6. adımdaki uyarıyı okuyun. Zallet, Sprout havuzunu desteklemez ve bu fonları taşımanın alışılmış yolu çalışan bir zcashd gerektiriyordu.

**Neden Geçiş Yapmalı - Kullanımdan Kaldırmanın Ötesinde**

Kullanımdan kaldırmayı bir kenara bıraksak bile, geçiş yapmak için ikna edici nedenler vardır:
- Güvenlik ve Sağlamlık: Rust'ın bellek güvenliği ve modern araçları, güvenlik açıkları risklerini azaltır.
- Performans ve Verimlilik: Zebrad paralellik, daha verimli kaynak kullanımı ve daha hızlı senkronizasyon için tasarlanmıştır.
- Modüler Mimari: Düğüm mantığının (Zebrad) cüzdan arayüzünden (Zallet) ayrılması, daha net sınırlar ve daha iyi yükseltme yolları sunar.
- Gelecekteki Ekosistem Uyumluluğu: Araçlar, geliştirmeler ve Zcash ekosisteminin geri kalanı giderek daha fazla Zebrad/Zallet'i hedefleyecektir.
- İç Rahatlığı: Kullanımdan kaldırılmış, desteklenmeyen bir bileşeni çalıştırmaya mahkûm olmaktan kaçının.

### Şimdi Geçiş rehberine geçelim

**1. Her Şeyin Yedeğini Alın**
* zcashd düğümünüzden wallet.dat dosyanızın (veya başka bir cüzdan dosyası / anahtar deposunun) yedeğini alın.

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![bash (1)](/content-images/SJ_0mUtTxg-1441185a72.svg)
</div>

* zcash.conf dosyanızı ve tüm özel ayarlarınızı kaydedin.
* Kullandığınız tüm RPC betiklerinin veya otomasyonların bir kopyasını dışa aktarın.
* Yedeklerinizin geçerli olduğunu doğrulayın (örneğin başka bir ortamda açmayı veya incelemeyi deneyin).
* Şu anda hangi JSON-RPC yöntemlerine güvendiğinizi gözden geçirin.
* [Zcash destek sitesinde](https://z.cash/support/zcashd-deprecation/) bulunan planlanan uyumluluk tablosuyla karşılaştırın. 
* Değişikliklere veya eksik yöntemlere hazırlıklı olun (bazıları geçici çözüm veya uyarlama gerektirebilir).

**2. Sistem Gereksinimleri ve Disk Alanı**
* Disk alanı, insanların hafife aldığı gereksinimdir. Zcash zinciri Ağustos 2026'da **270 GB**'ı geçti; bu nedenle mümkünse SSD üzerinde en az **300 GB** boş alan ayırın.
* Makinenizin kararlı bir ağa, CPU'ya ve RAM'e sahip olduğundan emin olun.
* İnternet bağlantısı 
* Kaynaktan derlemeyi planlıyorsanız Rust ve Cargo'nun kurulu olduğundan emin olun.

**3. Zebrad'ı Kurma / Ayarlama**
Önceden derlenmiş bir ikili dosya indirebilir veya kaynaktan derleyebilirsiniz.
* Zcash Foundation, Zebra için sürümler ve ikili dosyalar yayımlar. Örneğin bir kurulum betiği kullanabilir veya işletim sisteminize uygun ikili dosyayı indirebilirsiniz.

* Zebra'nın güncel sürümlerinde [RPC uç noktasının Docker'da artık varsayılan olarak etkin olmadığını](https://zfnd.org/zebra-2-3-0-release/) unutmayın.

**Seçenek A: Önceden derlenmiş ikili dosya ile kurulum**  
**Linux**/**macOS** üzerinde:

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![bash (2)](/content-images/HJhYu8Y6el-d2198f22c9.svg)
</div>

Bu, zebrad'ın en son kararlı sürümünü kurar.

**Seçenek B: Kaynaktan derleme**

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

**zebrad.toml** dosyasını tercihlerinize göre düzenleyin (dinleme adresi, bağlantı noktaları, durum dizini, önbellekleme).

**Düğümü başlatın:**

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![görüntü](/content-images/H1KPkvt6gl-864c48ca40.webp)
</div>

Düğüm genesis'ten senkronize olmaya başlayacaktır; donanım ve ağa bağlı olarak birkaç saat (veya daha fazla) bekleyin.

**5. Zallet'i Kurma / Ayarlama (Cüzdan)**

Zallet, zcashd'nin cüzdan kısmının yerini almak üzere tasarlanmıştır.

İkili dosyalar için Zallet GitHub / sürüm sayfasını kontrol edin.

**Veya kaynaktan derleyin:**

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![görüntü](/content-images/SyUFxvFTex-5bb10ee1d3.webp)
</div>

* GUI veya CLI'yi başlatın (kurulumunuzun sağladığı şekilde).
* RPC veya API uç noktası üzerinden yerel Zebrad düğümünüze bağlanacak şekilde yapılandırın.

**6. zcashd Cüzdanınızı Zallet'e İçe Aktarma**

Bunun için çalışan bir zcashd'ye ihtiyacınız yoktur. Zallet, `wallet.dat` dosyasını doğrudan okur; zcashd artık başlatılamadığı için bu önemlidir.

> **`wallet.dat` dosyasını saklayın.** Geçiş, Zallet cüzdanında temsil edemediği her şeyi içe aktarmak yerine raporlar; bu anahtar materyali daha sonra yalnızca `wallet.dat` içinde bulunur. Geçişten sonra silmeyin.

Önce `zallet init-wallet-encryption` komutunu çalıştırın. Zallet, anahtar materyalini bir age kimliğine şifreler ve herhangi bir anahtar içe aktarılmadan önce bu kimliğin mevcut olması gerekir.

Ardından yapılandırmanızı ve cüzdanınızı dönüştürün:

```bash
# zcash.conf dosyasını zallet.toml dosyasına çevir
zallet migrate-zcash-conf --zcashd-datadir /path/to/zcashd/datadir -o /path/to/zallet/datadir/zallet.toml

# wallet.dat dosyasını Zallet'in wallet.db dosyasına içe aktar
zallet migrate-zcashd-wallet --zcashd-datadir /path/to/zcashd/datadir
```

`migrate-zcashd-wallet` yalnızca `zcashd-import` özelliğine sahip derlemelerde bulunur ve `wallet.dat` dosyasını okumak, zcashd'nin kullandığı Berkeley DB 6.2 sürümündeki `db_dump` aracını gerektirir. Birden fazla cüzdan dosyanız varsa komutu her dosya için bir kez çalıştırın ve sonraki çalıştırmalarda `--allow-multiple-wallet-imports` ekleyin; her biri kendi hesap kümesi hâline gelir. Zallet'in JSON-RPC'si varsayılan olarak çerez kimlik doğrulaması kullandığından `rpcuser` ve `rpcpassword` değerleriniz aktarılmaz; gerekirse `zallet add-rpc-user` ile kimlik bilgileri ekleyin.

**Aktarılanlar**

* Anımsatıcı tohumlar ve bunlardan türetilen anahtarlar; hesaplar zcashd cüzdanıyla eşleşecek şekilde yeniden oluşturulur
* Bağımsız olarak içe aktarılmış Sapling harcama anahtarları ve şeffaf anahtarlar
* Açık anahtarlarını veya redeem betiklerini içeren salt-okunur şeffaf girdiler
* Hesap başlangıç noktaları; böylece zincir taraması doğru yükseklikten başlar

**Aktarılmayanlar.** Bunlar içe aktarılmak yerine sayılarıyla raporlanır:

* **Sprout harcama anahtarları ve fonları.** Zallet, Sprout havuzunu desteklemez. Belgelenmiş yol, zcashd kullanımdan kaldırılmadan önce Sprout fonlarını taşımaktı ve bu artık mümkün değildir. Bu sizi etkiliyorsa başka bir şey yapmadan önce [Zcash R&D Discord](https://discord.gg/xpzPR53xtU) veya [topluluk forumunda](https://forum.zcashcommunity.com/) sorun.
* Adres defteri girdileri
* Açık anahtar veya redeem betiği olmadan depolanan salt-okunur girdiler ile sıkıştırılmamış açık anahtarlara sahip girdiler
* Regtest cüzdanları

**Sonrasında yedekleme.** Anımsatıcı tek başına tam bir yedek değildir; çünkü içe aktarılmış anahtarlar yalnızca cüzdan veritabanında bulunur. `wallet.db`, `keystore.encryption_identity` seçeneğinin belirttiği age şifreleme kimlik dosyası ve anımsatıcı ifadenizin güvenli kopyalarını saklayın; ayrıca özgün `wallet.dat` dosyasını muhafaza edin. `wallet.db` dosyasının kendisinin şifrelenmediğini unutmayın: işlem geçmişinizi ve görüntüleme anahtarlarınızı açık biçimde tutar; bu nedenle yedeği güvenli bir yerde saklayın.

**Cüzdanı Yeniden Tarama ve Senkronizasyon**

* Anahtarlar içe aktarıldıktan sonra Zallet, Zebrad üzerinden zincirin yeniden taranmasını tetikler.
* Zallet'in bakiyenizi ve işlem geçmişinizi yeniden oluşturması için biraz zaman tanıyın.

**7. Bakiyeleri ve Senkronizasyonu Doğrulama**

İçe aktarıldıktan sonra Zallet, Zebrad düğümünüze bağlanacak ve blokzinciri yeniden tarayacaktır.
Senkronizasyon tamamlandığında bakiyeleriniz ve işlemleriniz eskisi gibi görünmelidir.

Düğümünüzün senkronizasyon durumunu şu komutu çalıştırarak doğrulayabilirsiniz:

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![görüntü](/content-images/SyIyVDY6xl-10d6bed7b8.webp)
</div>

Veya günlükleri kontrol edin.

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
        <td className="px-6 py-4">Bağlantı noktası kullanımda veya yapılandırma hatalı</td>
        <td className="px-6 py-4">**zebrad.toml** dosyasını kontrol edin ve boş bir bağlantı noktası kullanın</td>
      </tr>
      <tr className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-900/50">
        <td className="px-6 py-4">Yavaş senkronizasyon</td>
        <td className="px-6 py-4">Ağ yoğunluğu</td>
        <td className="px-6 py-4">Kararlı bir internet bağlantısı olduğundan emin olun, Zebrad'ı yeniden başlatın</td>
      </tr>
      <tr className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-900/50">
        <td className="px-6 py-4">Cüzdanda eksik işlemler var</td>
        <td className="px-6 py-4">Kısmi anahtar içe aktarma</td>
        <td className="px-6 py-4">Anahtarları yeniden içe aktarın veya Zallet'te yeniden tarayın</td>
      </tr>
      <tr className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-900/50">
        <td className="px-6 py-4">Zallet düğüme bağlanamıyor</td>
        <td className="px-6 py-4">Düğüm çalışmıyor veya uç nokta yanlış</td>
        <td className="px-6 py-4">Zebrad'ı başlatın ve doğru RPC bağlantı noktasını doğrulayın</td>
      </tr>
      <tr className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-900/50">
        <td className="px-6 py-4">Zallet çöküyor</td>
        <td className="px-6 py-4">Güncel olmayan derleme</td>
        <td className="px-6 py-4">GitHub'dan en son sürüme güncelleyin</td>
      </tr>
    </tbody>
  </table>
</div>

**9. Sonuç**

zcashd'den Zebrad ve Zallet'e geçiş yapmak size daha hızlı, daha güvenli ve daha modern bir Zcash deneyimi sunar.
Rust tabanlı güvenlik, modüler tasarım ve daha iyi araçlarla bu kurulum, Zcash ekosistemi gelişmeye devam ederken düğümünüzün ve cüzdanınızın geleceğe hazır kalmasını sağlar.

İpucu: Cüzdan anahtarlarınızı çevrimdışı tutun ve Zallet verilerinizi düzenli olarak yedekleyin.
Zebra için [zebra.zfnd.org](https://zebra.zfnd.org), Zallet için [The Zallet Book](https://zcash.github.io/zallet/) veya [Zallet deposunu](https://github.com/zcash/zallet) ziyaret edin. The Zallet Book içindeki [zcashd'den Geçiş](https://zcash.github.io/zallet/) bölümü, 6. adım için yetkili başvurudur.
