<a href="https://github.com/zechub/zechub/edit/main/site/contribute/ZecWeekly_Newsletter.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# ZecWeekly Bülteni

ZecWeekly, her Pazar sabahı yayımlanan bir bültendir. Zcash ekosisteminde hafta boyunca gerçekleşen tüm haberleri içerir. Haberler her hafta topluluk üyeleri tarafından derlenir ve ilgili tüm bağlantılar bültene eklenir. Lütfen bültene [buradan](https://zechub.substack.com/) abone olun.

## Katkıda Bulunun

Bülten katkıları en iyi şekilde, bir katkıcı doğru hafta için sayıyı hazırladığında, mevcut ödül veya koordinasyon başlığını takip ettiğinde ve haftalık bağlantılar hazır olduktan sonra pull request gönderdiğinde işler. Lütfen ZecHub o sayı için tarihi paylaşmadan veya onaylamadan gelecekteki bir sayıyı göndermeyin. Erken gönderilen pull request'ler genellikle haftanın geç saatlerinde gelen güncellemeleri kaçırır, atanmış bir derleyiciyle çakışır veya yanlış son teslim tarihini kullanır.

### 1. Güncel sayıyı doğrulayın

Yazmaya başlamadan önce:

- Güncel bülten görevi için [ZEC Bounties ](https://bounties.zechub.wiki/)'i kontrol edin.
- Atanmayı bekleyin

![ss](/content-images/149a802c-b64f-4969-ad89-e83ffecf568e-d5d8387145.webp)



### 2. Depoyu fork edin

GitHub'a yeniyseniz, şu iş akışını kullanın:

1. [ZecHub deposunu](https://github.com/ZecHub/zechub) açın.
2. **Fork** düğmesine tıklayın ve GitHub hesabınız altında bir fork oluşturun.
3. Fork'unuzda, sayı için yeni bir branch oluşturun. `digest-may-30-2026` gibi açık bir branch adı faydalıdır.
4. Pull request'inizin temel depo olarak `ZecHub/zechub`'u ve temel branch olarak `main`'i hedeflediğinden emin olun.

Komut satırını kullanıyorsanız, aynı iş akışı şöyle görünür:

```bash
git clone https://github.com/YOUR-USERNAME/zechub.git
cd zechub
git checkout -b digest-month-day-year
```

`YOUR-USERNAME` kısmını kendi GitHub kullanıcı adınızla değiştirin. Yukarıdaki URL bir yer tutucudur ve yazıldığı haliyle çözümlenmez.

### 3. Bülten dosyasını oluşturun

Başlangıç noktası olarak [bülten şablonunu](https://github.com/ZecHub/zechub/blob/main/newsletter/newslettertemplate.md) kullanın. Bülten sayıları [`newsletter`](https://github.com/ZecHub/zechub/tree/main/newsletter) klasörüne aittir.

Dosyayı oluştururken:

- Sorunda istenen veya yakın zamanda kabul edilen sayılarda kullanılan dosya adı biçimiyle eşleştirin.
- Görev farklı bir biçim istemediği sürece şablondaki aynı bölüm sırasını koruyun.
- Yalnızca ilgili haftadaki bağlantıları ekleyin.
- Okuyucuların neden önemli olduğunu anlaması için her bağlantı için kısa ve açık bir açıklama yazın.
- Gerektiğinde İngilizce olmayan kaynakları İngilizceye çevirin veya İngilizce özetleyin.
- Pull request'i açmadan önce her bağlantıyı kontrol edin.

### 4. Bağlantıları doğru zamanda toplayın

ZecWeekly normalde mevcut haftaya ait Zcash ekosistemi faaliyetlerini kapsar ve haftanın sonuna doğru yayımlanır. En güvenli zamanlama şudur:

- Mevcut bülten sayısı veya görev paylaşıldıktan sonra bağlantı toplamaya başlayın.
- Hafta hâlâ devam ederken bir taslak tutun.
- Haftanın geç dönem güncellemelerini kontrol ettikten sonra, pull request'i istenen gönderim tarihine yakın bir zamanda gönderin.
- O tarih için görev mevcut olmadan veya ZecHub onu hazırlamanız gerektiğini doğrulamadan gelecek haftanın bültenini göndermeyin.

Bir sorunda belirli bir tarihe kadar gönderilmesi yazıyorsa, o tarihi takip edin. Bu sayfa ile güncel bir sorun arasında bir çelişki varsa, güncel sorunu takip edin.

### 5. Pull request'i açın

Bülten dosyanız hazır olduğunda:

1. Değişikliklerinizi fork'unuza commit edin.
2. `main` branch'inde `ZecHub/zechub` içine bir pull request açın.
3. `Zcash Ecosystem Digest | May 30th` gibi, sayıyla eşleşen bir başlık kullanın.
4. İnceleyenlerin işi görevle ilişkilendirebilmesi için pull request gövdesinde soruna bağlantı verin.

Örnek pull request gövdesi:

```md
Closes #ISSUE_NUMBER

Summary:
- Adds the Zcash Ecosystem Digest for Month Day.
- Uses the newsletter template and the current issue deadline.
- Checks links and descriptions for the requested week.
```

Pull request açıldıktan sonra inceleme yorumlarını takip edin. ZecHub düzenleme isterse, aynı sayı için ikinci bir pull request açmak yerine aynı branch'i güncelleyin.

### Gerçek örnekler

Kabul edilmiş gönderim örnekleri olarak birleştirilmiş şu bülten pull request'lerini kullanın:

- [Zcash Ecosystem Digest | 11 Nisan](https://github.com/ZecHub/zechub/pull/1551)
- [Zcash Ecosystem Digest | 28 Mart](https://github.com/ZecHub/zechub/pull/1544)
- [Zcash Ecosystem Digest | 14 Şubat](https://github.com/ZecHub/zechub/pull/1474)


![Merged ZecWeekly newsletter pull request example](/content-images/9230d68d-6406-4c8a-992c-df84e0d318d8-8893d2de55.webp)

Çalışmanızı bir örnekle karşılaştırırken dosya konumuna, başlık biçimine, bölüm sırasına, bağlantı açıklamalarına ve pull request'in doğru göreve bağlanıp bağlanmadığına odaklanın.

### Kaçınılması gereken yaygın hatalar

- Sayı tarihi veya görev doğrulanmadan pull request açmak.
- Zaten bağlantılı bir pull request'i olan bir sorun üzerinde çalışmak.
- Pull request'i `ZecHub/zechub` yerine kendi fork'unuza göndermek.
- Yanlış dosya adını kullanmak veya dosyayı `newsletter` klasörü dışına koymak.
- Eski bir sayıyı kopyalayıp her tarihi, bağlantıyı ve açıklamayı güncellememek.
- Yanlış haftadan bağlantılar eklemek.
- Bozuk bağlantılar, yinelenen bağlantılar veya şablondan kalan yer tutucu metinler bırakmak.
- İnceleme yorumlarından sonra orijinal branch'i güncellemek yerine yeni bir pull request açmak.

### Son kontrol listesi

İnceleme istemeden önce şunları doğrulayın:

- Sorun veya görev tarihi, bülten dosyanızla eşleşiyor.
- Aynı sorun veya sayıyı kapsayan başka açık bir pull request yok.
- Dosya `newsletter` klasöründe.
- Şablon bölümleri tamamlanmış.
- Her bağlantı çalışıyor ve faydalı bir açıklamaya sahip.
- Pull request gövdesi doğru soruna bağlantı veriyor.
- İnceleyenler değişiklik isterse düzenleme yapabilecek durumdasınız.

## Geçmiş sayılar

[ZecWeekly Arşivi](https://zechub.substack.com/p/archive)
