# Geçiş Rehberi: zcashd'den Zebrad/Zallet'e

Zcash ekosistemi gelişiyor. *Electric Coin Company (ECC)* / *Zodl* tarafından sürdürülen geleneksel Zcashd tam düğümü, kademeli olarak Zebra ve Zallet ile değiştiriliyor.

- Zebra, Zcash Foundation tarafından geliştirilen, Zcash protokolünün modern bir Rust uygulamasıdır
- Zallet, Zodl tarafından geliştirilen Zebra düğümleriyle sorunsuz şekilde arayüz kurmak için tasarlanmış hafif bir cüzdandır

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![ChatGPTImageOct12202508_15_20A](https://hackmd.io/_uploads/SJNBsSYTel.jpg)
</div>

Bu rehber, **Zcashd**'den **Zebrad** ve **Zallet**'e geçişte kurulum, cüzdan içe aktarma ve yaygın geçiş sorunlarının giderilmesi dahil olmak üzere size yol gösterir.

---

## Zcash projesi, zcashd'nin 2025 yılında kullanımdan kaldırılacağını resmen duyurdu.

**Kullanımdan Kaldırma Durumu ve Bunun Anlamı**

- Zcash projesi, zcashd'nin 2025 yılında kullanımdan kaldırılacağını resmen duyurdu.
- Tam düğümler, bir Rust uygulaması olan Zebrad'e taşınıyor; Zallet ise zcashd'nin cüzdan bileşeninin yerini almak üzere tasarlanıyor. 
- Buna yanıt olarak Zebra projesi, uyumluluk, RPC geçişi ve ekosistem desteğini sağlamak için bir "Zcashd Deprecation" kilometre taşını takip ediyor.
- Birçok RPC yöntemi için, Zebrad/Zallet doğrudan yerine geçebilen çözümler olmayı hedefleyecek (davranışı taklit ederek veya eşleştirerek). Diğerleri değişecek veya desteklenmeyebilir.

**Neden Geçiş Yapılmalı - Kullanımdan Kaldırmanın Ötesinde**

Kullanımdan kaldırma bir yana, geçmek için güçlü nedenler var:
- Güvenlik ve Dayanıklılık: Rust'ın bellek güvenliği ve modern araçları, güvenlik açıkları riskini azaltır.
- Performans ve Verimlilik: Zebrad paralellik, daha verimli kaynak kullanımı ve daha hızlı senkronizasyon için tasarlanmıştır.
- Modüler Mimari: Düğüm mantığını (Zebrad) cüzdan arayüzünden (Zallet) ayırmak daha net sınırlar ve daha iyi yükseltme yolları sunar.
- Gelecekteki Ekosistem Uyumluluğu: Araçlar, geliştirmeler ve Zcash ekosisteminin geri kalanı giderek daha fazla Zebrad/Zallet'i hedefleyecektir.
- İç Rahatlığı: Kullanımdan kaldırılmış, desteklenmeyen bir bileşeni çalıştırmak zorunda kalmazsınız.

### Şimdi Geçiş rehberine dalalım

**1. Her Şeyi Yedekleyin**
* zcashd düğümünüzden wallet.dat dosyanızı (veya başka herhangi bir cüzdan dosyası / anahtar deponuzu) yedekleyin.

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![bash (1)](https://hackmd.io/_uploads/SJ_0mUtTxg.svg)
</div>

* zcash.conf dosyanızı ve tüm özel ayarlarınızı kaydedin.
* Kullandığınız tüm RPC betiklerinin veya otomasyonların bir kopyasını dışa aktarın.
* Yedeklerinizin geçerli olduğunu doğrulayın (örneğin başka bir ortamda açmayı veya incelemeyi deneyin).
* Şu anda hangi JSON-RPC yöntemlerine güvendiğinizi gözden geçirin.
* [Zcash destek sitesinde](https://z.cash/support/zcashd-deprecation/?utm_source=chatgpt.com) tutulan planlı uyumluluk tablosuyla karşılaştırın 
* Değişikliklere veya eksik yöntemlere hazırlıklı olun (bazıları geçici çözüm veya uyarlama gerektirebilir).

**2. Sistem Gereksinimleri ve Disk Alanı**
* Yeterli disk alanınız olduğundan emin olun (Zcash zinciri büyüktür). En az 10 GB boş disk alanı.
* Makinenizin kararlı ağ, CPU ve RAM'e sahip olduğundan emin olun.
* Bir internet bağlantısı 
* Kaynak koddan derlemeyi planlıyorsanız Rust ve Cargo yüklü olsun.

**3. Zebrad Kurulumu / Yapılandırması**
Önceden derlenmiş bir ikili dosya indirebilir veya kaynak koddan derleyebilirsiniz.
* Zcash Foundation, Zebra için sürümler ve ikili dosyalar yayımlar. Örneğin, bir kurulum betiği kullanabilir veya işletim sisteminize uygun ikili dosyayı indirebilirsiniz.

* Zebra'nın son sürümlerinde, [RPC uç noktasının artık Docker'da varsayılan olarak etkin olmadığını](https://zfnd.org/zebra-2-3-0-release/?utm_source=chatgpt.com) unutmayın.

**Seçenek A: Önceden derlenmiş ikili dosya ile kurulum**  
**Linux**/**macOS** üzerinde:

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![bash (2)](https://hackmd.io/_uploads/HJhYu8Y6el.svg)
</div>

Bu, zebrad'in en son kararlı sürümünü kurar.

**Seçenek B: Kaynak koddan derleme**

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![bash (3)](https://hackmd.io/_uploads/Syg8FUK6eg.svg)
</div>

Derlemeden sonra ikili dosyayı path'inize taşıyın:

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![migration 11](https://hackmd.io/_uploads/BJ0zjLY6ll.png)
</div>

**4. Yapılandırma ve Başlatma**  
Varsayılan bir yapılandırma oluşturun:

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![migration2](https://hackmd.io/_uploads/HJV1C8tTxx.png)
</div>

**zebrad.toml** dosyasını tercihlerinize göre düzenleyin (dinleme adresi, portlar, durum dizini, önbellekleme).

**Düğümü başlatın:**

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![image](https://hackmd.io/_uploads/H1KPkvt6gl.png)
</div>

Düğüm genesis'ten itibaren senkronize olmaya başlayacaktır - donanım ve ağa bağlı olarak birkaç saat (veya daha fazla) sürebilir.

**5. Zallet Kurulumu / Yapılandırması (Cüzdan)**

Zallet, zcashd'nin cüzdan kısmının yerini almak üzere tasarlanmıştır.

İkili dosyalar için Zallet GitHub / sürüm sayfasını kontrol edin.

**Veya kaynak koddan derleyin:**

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![image](https://hackmd.io/_uploads/SyUFxvFTex.png)
</div>

* GUI veya CLI'yi başlatın (kurulumunuzun sağladığı şekilde).
* Yerel Zebrad düğümünüze RPC veya API uç noktası üzerinden bağlanacak şekilde yapılandırın.

**6. zcashd Cüzdanınızı Zallet'e İçe Aktarma**  
Özel Anahtar Dökümü ile

zcashd üzerinde özel anahtarlarınızı dışa aktarın:

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![bash (4)](https://hackmd.io/_uploads/rJzgzwFagx.svg)
</div>

* Zallet'te Anahtarları İçe Aktar veya benzeri seçeneği seçin.
* **zcashd_keys.txt** dosyasını gösterin. 
* Zallet, ZEC adreslerini ve ilişkili anahtarları ayrıştırıp içe aktarmalıdır.

**Seed Phrase ile** (uygulanabiliyorsa)

* Cüzdanınız seed yedeğini destekliyorsa, Zallet'te Restore from Seed Phrase seçeneğini kullanın.
* Bu yalnızca zcashd cüzdanınız bir seed'den türetilmişse (veya elinizde seed dönüşümü varsa) çalışır.

**Cüzdan Yeniden Taraması ve Senkronizasyon**

* Anahtarlar içe aktarıldıktan sonra Zallet, zincirin Zebrad üzerinden yeniden taranmasını tetikleyecektir.
* Zallet'in bakiyenizi ve işlem geçmişinizi yeniden oluşturması için biraz zaman tanıyın.

**7. Bakiyeleri ve Senkronizasyonu Doğrulayın**

İçe aktarma tamamlandıktan sonra Zallet, Zebrad düğümünüze bağlanacak ve blok zincirini yeniden tarayacaktır.
Senkronizasyon tamamlandığında, bakiyeleriniz ve işlemleriniz tam olarak önceki gibi görünmelidir.

Düğümünüzün senkronizasyon durumunu şu komutu çalıştırarak doğrulayabilirsiniz:

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![image](https://hackmd.io/_uploads/SyIyVDY6xl.png)
</div>

Veya günlükleri kontrol edin.

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![image](https://hackmd.io/_uploads/r1HfVPF6gg.png)
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
        <td className="px-6 py-4">Zebrad başlamıyor</td>
        <td className="px-6 py-4">Port kullanımda veya yapılandırma hatalı</td>
        <td className="px-6 py-4">**zebrad.toml** dosyasını kontrol edin ve boş bir port kullanın</td>
      </tr>
      <tr className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-900/50">
        <td className="px-6 py-4">Yavaş senkronizasyon</td>
        <td className="px-6 py-4">Ağ tıkanıklığı</td>
        <td className="px-6 py-4">İnternetin kararlı olduğundan emin olun, Zebrad'i yeniden başlatın</td>
      </tr>
      <tr className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-900/50">
        <td className="px-6 py-4">Cüzdanda eksik işlemler</td>
        <td className="px-6 py-4">Kısmi anahtar içe aktarma</td>
        <td className="px-6 py-4">Anahtarları yeniden içe aktarın veya Zallet'te yeniden tarama yapın</td>
      </tr>
      <tr className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-900/50">
        <td className="px-6 py-4">Zallet düğüme bağlanamıyor</td>
        <td className="px-6 py-4">Düğüm çalışmıyor veya uç nokta yanlış</td>
        <td className="px-6 py-4">Zebrad'i başlatın ve doğru RPC portunu doğrulayın</td>
      </tr>
      <tr className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-900/50">
        <td className="px-6 py-4">Zallet çöküyor</td>
        <td className="px-6 py-4">Güncel olmayan derleme</td>
        <td className="px-6 py-4">GitHub'daki en son sürüme güncelleyin</td>
      </tr>
    </tbody>
  </table>
</div>

**9. Sonuç**

zcashd'den Zebrad ve Zallet'e geçmek size daha hızlı, daha güvenli ve daha modern bir Zcash deneyimi sunar.
Rust tabanlı güvenlik, modüler tasarım ve daha iyi araçlarla bu kurulum, Zcash ekosistemi gelişmeye devam ederken düğümünüzün ve cüzdanınızın geleceğe hazır kalmasını sağlar.

İpucu: Cüzdan anahtarlarınızı çevrimdışı tutun ve Zallet verilerinizi düzenli olarak yedekleyin.
Güncellemeler ve topluluk desteği için [zebra.zfnd.org](https://zebra.zfnd.org) ve [zallet.zfnd.org](https://zallet.zfnd.org) adreslerini ziyaret edin.
