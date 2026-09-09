<a href="https://github.com/zechub/zechub/edit/main/site/contribute/ZecWeekly_Newsletter.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Sayfayı Düzenle"/>
</a>

# ZecWeekly Bülteni

ZecWeekly, her pazar sabahı yayımlanan bir bültendir. Zcash ekosisteminde hafta boyunca gerçekleşen tüm haberleri içerir. Haberler her hafta topluluk üyeleri tarafından derlenir ve ilgili tüm bağlantılar bültene eklenir. Lütfen bültene [buradan](https://zechub.substack.com/) abone olun.

## Katkıda Bulunma

Bülten katkıları, bir katkıda bulunan doğru haftanın sayısını hazırladığında, güncel ödül veya koordinasyon başlığını takip ettiğinde ve haftalık bağlantılar hazır olduktan sonra pull request gönderdiğinde en iyi şekilde işler. Lütfen ZecHub o sayının tarihini yayımlamadan veya doğrulamadan gelecekteki bir sayı göndermeyin. Erken açılan pull request'lerde genellikle hafta sonu güncellemeleri eksik olur, atanmış bir küratörle çakışılır veya yanlış son tarih kullanılır.

### 1. Güncel sayıyı doğrulayın

Yazmaya başlamadan önce:

- Güncel bülten görevi için [ZEC Bounties ](https://bounties.zechub.wiki/) sayfasını kontrol edin.
- Atanmayı bekleyin

![ss](/content-images/149a802c-b64f-4969-ad89-e83ffecf568e-d5d8387145.webp)



### 2. Depoyu fork'layın

GitHub'da yeniyseniz şu iş akışını kullanın:

1. [ZecHub deposunu](https://github.com/ZecHub/zechub) açın.
2. **Fork** seçeneğine tıklayın ve GitHub hesabınız altında bir fork oluşturun.
3. Fork'unuzda sayı için yeni bir dal oluşturun. Açık bir dal adı yararlıdır; örneğin `digest-may-30-2026`.
4. Pull request'inizin temel depo olarak `ZecHub/zechub`u, temel dal olarak da `main`i hedefleyeceğinden emin olun.

Komut satırını kullanıyorsanız aynı iş akışı şöyledir:

```bash
git clone https://github.com/YOUR-USERNAME/zechub.git
cd zechub
git checkout -b digest-month-day-year
```

`YOUR-USERNAME` ifadesini kendi GitHub kullanıcı adınızla değiştirin. Yukarıdaki URL bir yer tutucudur ve yazıldığı şekliyle çalışmaz.

### 3. Bülten dosyasını oluşturun

Başlangıç noktası olarak [bülten şablonunu](https://github.com/ZecHub/zechub/blob/main/newsletter/newslettertemplate.md) kullanın. Bülten sayıları [`newsletter`](https://github.com/ZecHub/zechub/tree/main/newsletter) klasöründe yer alır.

Dosyayı oluştururken:

- Issue tarafından istenen veya yakın zamanda kabul edilmiş sayılarda kullanılan dosya adı biçimiyle eşleşin.
- Görev farklı bir biçim istemediği sürece şablonla aynı bölüm sırasını koruyun.
- Yalnızca ilgili haftanın bağlantılarını ekleyin.
- Okuyucuların neden önemli olduğunu anlaması için her bağlantı için kısa ve açık bir açıklama yazın.
- Gerektiğinde İngilizce olmayan kaynakları İngilizceye çevirin veya özetleyin.
- Pull request'i açmadan önce her bağlantıyı kontrol edin.

### 4. Bağlantıları doğru zamanda toplayın

ZecWeekly normalde güncel haftadaki Zcash ekosistemi faaliyetlerini kapsar ve haftanın sonuna doğru yayımlanır. En güvenli zamanlama şöyledir:

- Güncel bülten issue'su veya görevi yayımlandıktan sonra bağlantıları toplamaya başlayın.
- Hafta hâlâ devam ederken bir taslak tutun.
- Hafta sonu güncellemelerini kontrol ettikten sonra, talep edilen gönderim tarihine yakın zamanda pull request'i gönderin.
- O tarihe ait görev oluşturulmadan veya ZecHub onu hazırlamanız gerektiğini doğrulamadan gelecek haftanın bültenini göndermeyin.

Bir issue belirli bir tarihe kadar gönderim yapılmasını söylüyorsa bu tarihi izleyin. Bu sayfa ile güncel bir issue arasında çelişki varsa güncel issue'yu izleyin.

### 5. Pull request'i açın

Bülten dosyanız hazır olduğunda:

1. Değişikliklerinizi fork'unuza commit edin.
2. `main` dalında `ZecHub/zechub`a bir pull request açın.
3. `Zcash Ecosystem Digest | May 30th` gibi, sayıyla eşleşen bir başlık kullanın.
4. İnceleyenlerin çalışmayı göreve bağlayabilmesi için pull request gövdesinde issue'ya bağlantı verin.

Örnek pull request gövdesi:

```md
Closes #ISSUE_NUMBER

Summary:
- Adds the Zcash Ecosystem Digest for Month Day.
- Uses the newsletter template and the current issue deadline.
- Checks links and descriptions for the requested week.
```

Pull request açıldıktan sonra inceleme yorumlarını takip edin. ZecHub düzenleme isterse aynı sayı için ikinci bir pull request açmak yerine aynı dalı güncelleyin.

### Gerçek örnekler

Kabul edilmiş gönderim örnekleri olarak birleştirilmiş bu bülten pull request'lerini kullanın:

- [Zcash Ecosystem Digest | 11 Nisan](https://github.com/ZecHub/zechub/pull/1551)
- [Zcash Ecosystem Digest | 28 Mart](https://github.com/ZecHub/zechub/pull/1544)
- [Zcash Ecosystem Digest | 14 Şubat](https://github.com/ZecHub/zechub/pull/1474)


![Birleştirilmiş ZecWeekly bülteni pull request örneği](/content-images/9230d68d-6406-4c8a-992c-df84e0d318d8-8893d2de55.webp)

Çalışmanızı bir örnekle karşılaştırırken dosya konumuna, başlık biçimine, bölüm sırasına, bağlantı açıklamalarına ve pull request'in doğru göreve bağlanıp bağlanmadığına odaklanın.

### Kaçınılması gereken yaygın hatalar

- Sayı tarihi veya görev doğrulanmadan pull request açmak.
- Zaten bağlı bir pull request'i olan bir issue üzerinde çalışmak.
- Pull request'i `ZecHub/zechub` yerine kendi fork'unuza göndermek.
- Yanlış dosya adı kullanmak veya dosyayı `newsletter` klasörü dışına koymak.
- Her tarihi, bağlantıyı ve açıklamayı güncellemeden eski bir sayıyı kopyalamak.
- Yanlış haftadan bağlantılar eklemek.
- Şablondan kalan bozuk bağlantıları, yinelenen bağlantıları veya yer tutucu metinleri bırakmak.
- İnceleme yorumlarından sonra özgün dalı güncellemek yerine yeni bir pull request açmak.

### Son kontrol listesi

İnceleme istemeden önce şunları doğrulayın:

- Issue veya görev tarihi, bülten dosyanızla eşleşiyor.
- Başka bir açık pull request aynı issue'yu veya sayıyı zaten kapsamıyor.
- Dosya `newsletter` klasöründe.
- Şablon bölümleri tamamlandı.
- Her bağlantı çalışıyor ve yararlı bir açıklamaya sahip.
- Pull request gövdesi doğru issue'ya bağlantı veriyor.
- İnceleyenler değişiklik isterse düzenleme yapmaya hazırsınız.

## Geçmiş sayılar

[ZecWeekly Arşivi](https://zechub.substack.com/p/archive)
