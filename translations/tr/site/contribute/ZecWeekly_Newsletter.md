<a href="https://github.com/zechub/zechub/edit/main/site/contribute/ZecWeekly_Newsletter.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# ZecWeekly Bülten (newsletter)

ZecWeekly, her pazar sabahı yayımlanan bir bültendir. Zcash ekosisteminde hafta boyunca yaşanan tüm haberleri içerir. Haberler topluluk üyeleri tarafından her hafta derlenir ve ilgili tüm bağlantılar bültene eklenir. Lütfen [buradan](https://zechub.substack.com/) bültene abone olun.

## Katkıda bulunun

Bülten katkıları, bir katkıcının doğru haftanın sayısını hazırlaması, güncel ödül veya koordinasyon başlığını takip etmesi ve haftalık bağlantılar hazır olduğunda çekme isteğini göndermesi durumunda en iyi şekilde ilerler. ZecHub ilgili sayı için tarihi paylaşmadan veya onaylamadan önce lütfen gelecekteki bir sayıyı göndermeyin. Erken açılan çekme istekleri çoğu zaman haftanın sonundaki güncellemeleri kaçırır, görevlendirilmiş bir derleyiciyle çakışır veya yanlış son tarihi kullanır.

### 1. Güncel sayıyı onaylayın

Yazmaya başlamadan önce:

- Güncel bülten görevi için [ZEC Bounties](https://bounties.zechub.wiki/) adresini kontrol edin.
- Size görev verilmesini bekleyin.
- Bülten sayıları, [ödül miktarları politikasının](https://bounties.zechub.wiki/docs/bounty-amounts) XS bandında yer alır. Canlı ödüldeki ZEC rakam, katkı kılavuzlarındaki eski bir başlık değil, miktardır.

![ss](/content-images/149a802c-b64f-4969-ad89-e83ffecf568e-d5d8387145.webp)



### 2. Depoyu çatallayın

GitHub konusunda yeniyseniz şu iş akışını kullanın:

1. [ZecHub deposunu](https://github.com/ZecHub/zechub) açın.
2. **Fork** düğmesine tıklayın ve GitHub hesabınız altında bir çatal oluşturun.
3. Çatalınızda sayı için yeni bir dal oluşturun. `digest-may-30-2026` gibi açık bir dal adı kullanmak yararlı olacaktır.
4. Çekme isteğinizin temel deposu olarak `ZecHub/zechub`, temel dal olarak da `main` hedefleneceğinden emin olun.

Komut satırını kullanıyorsanız aynı iş akışı şöyle görünür:

```bash
git clone https://github.com/YOUR-USERNAME/zechub.git
cd zechub
git checkout -b digest-month-day-year
```

`YOUR-USERNAME` yerine kendi GitHub kullanıcı adınızı yazın. Yukarıdaki URL yer tutucudur ve yazıldığı şekliyle çalışmaz.

### 3. Bülten dosyasını oluşturun

Başlangıç noktası olarak [bülten şablonunu](https://github.com/ZecHub/zechub/blob/main/newsletter/newslettertemplate.md) kullanın. Bülten sayıları [`newsletter`](https://github.com/ZecHub/zechub/tree/main/newsletter) klasöründe yer almalıdır.

Dosyayı oluştururken:

- Dosya adı biçimini, issue tarafından istenen veya yakın zamanda kabul edilen sayılarda kullanılan biçimle eşleştirin.
- Görev farklı bir biçim istemediği sürece şablondaki bölüm sırasını koruyun.
- Yalnızca ilgili haftanın bağlantılarını ekleyin.
- Okuyucuların neden önemli olduğunu anlaması için her bağlantı hakkında kısa ve açık bir açıklama yazın.
- Gerektiğinde İngilizce olmayan kaynakları İngilizce olarak çevirin veya özetleyin.
- Çekme isteğini açmadan önce her bağlantıyı kontrol edin.

### 4. Bağlantıları doğru zamanda toplayın

ZecWeekly normalde mevcut haftadaki Zcash ekosistem faaliyetlerini kapsar ve haftanın sonuna doğru yayımlanır. En güvenli zamanlama şöyledir:

- Mevcut bülten sayısı veya görevi yayımlandıktan sonra bağlantıları toplamaya başlayın.
- Hafta devam ederken bir taslak tutun.
- Geç haftadaki güncellemeleri kontrol ettikten sonra çekme isteğini istenen gönderim tarihine yakın bir zamanda gönderin.
- O tarihe ait görev mevcut olmadan veya ZecHub hazırlamanız gerektiğini onaylamadan önce gelecek haftanın bültenini göndermeyin.

Bir issue belirli bir tarihe kadar gönderim yapılmasını söylüyorsa o tarihi izleyin. Bu sayfa ile güncel bir issue arasında çelişki varsa güncel issue'yu izleyin.

### 5. Çekme isteğini açın

Bülten dosyanız hazır olduğunda:

1. Değişikliklerinizi çatalınıza kaydedin.
2. `main` dalındaki `ZecHub/zechub` deposuna bir çekme isteği açın.
3. `Zcash Ecosystem Digest | May 30th` gibi sayıyla eşleşen bir başlık kullanın.
4. İnceleyenlerin çalışmayı görevle ilişkilendirebilmesi için issue'yu çekme isteğinin gövdesinde bağlayın.

Örnek çekme isteği gövdesi:

```md
Closes #ISSUE_NUMBER

Summary:
- Adds the Zcash Ecosystem Digest for Month Day.
- Uses the newsletter template and the current issue deadline.
- Checks links and descriptions for the requested week.
```

Çekme isteği açıldıktan sonra inceleme yorumlarını takip edin. ZecHub düzenleme isterse aynı sayı için ikinci bir çekme isteği açmak yerine aynı dalı güncelleyin.

### Gerçek örnekler

Kabul edilen gönderimlere örnek olarak bu birleştirilmiş bülten çekme isteklerini kullanın:

- [Zcash Ekosistem Özeti | 11 Nisan](https://github.com/ZecHub/zechub/pull/1551)
- [Zcash Ekosistem Özeti | 28 Mart](https://github.com/ZecHub/zechub/pull/1544)
- [Zcash Ekosistem Özeti | 14 Şubat](https://github.com/ZecHub/zechub/pull/1474)


![Birleştirilmiş ZecWeekly bülteni pull request örneği](/content-images/9230d68d-6406-4c8a-992c-df84e0d318d8-8893d2de55.webp)

Çalışmanızı bir örnekle karşılaştırırken dosyanın konumuna, başlık biçimine, bölüm sırasına, bağlantı açıklamalarına ve çekme isteğinin doğru göreve bağlanıp bağlanmadığına odaklanın.

### Kaçınılması gereken yaygın hatalar

- Sayı tarihi veya görev onaylanmadan önce çekme isteği açmak.
- Zaten bağlantılı bir çekme isteği bulunan bir issue üzerinde çalışmak.
- Çekme isteğini `ZecHub/zechub` yerine kendi çatalınıza göndermek.
- Yanlış dosya adı kullanmak veya dosyayı `newsletter` klasörünün dışına yerleştirmek.
- Her tarihi, bağlantıyı ve açıklamayı güncellemeden eski bir sayıyı kopyalamak.
- Yanlış haftaya ait bağlantılar eklemek.
- Bozuk bağlantılar, yinelenen bağlantılar veya şablondan kalan yer tutucu metin bırakmak.
- İnceleme yorumlarından sonra özgün dalı güncellemek yerine yeni bir çekme isteği açmak.

### Son kontrol listesi

İnceleme istemeden önce şunları doğrulayın:

- Issue veya görev tarihi bülten dosyanızla eşleşiyor.
- Aynı issue veya sayıyı kapsayan başka bir açık çekme isteği bulunmuyor.
- Dosya `newsletter` klasöründe.
- Şablon bölümleri eksiksiz.
- Her bağlantı çalışıyor ve yararlı bir açıklamaya sahip.
- Çekme isteğinin gövdesi doğru issue'yu bağlıyor.
- İnceleyenler değişiklik isterse düzenleme yapmaya hazırsınız.

## Geçmiş sayılar

[ZecWeekly Arşiv](https://zechub.substack.com/p/archive)
