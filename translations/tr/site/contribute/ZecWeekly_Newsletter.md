<a href="https://github.com/zechub/zechub/edit/main/site/contribute/ZecWeekly_Newsletter.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Sayfayı Düzenle"/>
</a>

# ZecWeekly Bülteni

ZecWeekly, her Pazar sabahı yayımlanan bir bültendir. Zcash ekosisteminde hafta boyunca yaşanan tüm haberleri içerir. Haberler her hafta topluluk üyeleri tarafından derlenir ve ilgili tüm bağlantılar bültene eklenir. Lütfen bültene [buradan](https://zechub.substack.com/) abone olun.

## Katkıda Bulunun

Bülten katkıları en iyi şekilde, bir katkıda bulunan ilgili haftanın sayısını hazırladığında, mevcut ödül veya koordinasyon başlığını takip ettiğinde ve haftalık bağlantılar hazır olduktan sonra pull request gönderdiğinde işler. Lütfen ZecHub o sayı için tarihi paylaşmadan veya onaylamadan gelecekteki bir sayıyı göndermeyin. Erken açılan pull request’ler genellikle haftanın son günlerindeki güncellemeleri kaçırır, atanmış bir derleyiciyle çakışır veya yanlış son teslim tarihini kullanır.

### 1. Güncel sayıyı doğrulayın

Yazmaya başlamadan önce:

- Güncel bülten görevi için [ZEC Bounties ](https://bounties.zechub.wiki/) sayfasını kontrol edin.
- Atanmayı bekleyin

![ss](https://github.com/user-attachments/assets/149a802c-b64f-4969-ad89-e83ffecf568e)



### 2. Depoyu fork edin

GitHub’da yeniyseniz, şu iş akışını kullanın:

1. [ZecHub deposunu](https://github.com/ZecHub/zechub) açın.
2. **Fork** düğmesine tıklayın ve GitHub hesabınız altında bir fork oluşturun.
3. Fork’unuzda, sayı için yeni bir branch oluşturun. Açık bir branch adı faydalıdır; örneğin `digest-may-30-2026`.
4. Pull request’inizin temel depo olarak `ZecHub/zechub` ve temel branch olarak `main` hedeflediğinden emin olun.

Komut satırını kullanıyorsanız, aynı iş akışı şöyle görünür:

```bash
git clone https://github.com/YOUR-USERNAME/zechub.git
cd zechub
git checkout -b digest-month-day-year
```

### 3. Bülten dosyasını oluşturun

Başlangıç noktası olarak [bülten şablonunu](https://github.com/ZecHub/zechub/blob/main/newsletter/newslettertemplate.md) kullanın. Bülten sayıları [`newsletter`](https://github.com/ZecHub/zechub/tree/main/newsletter) klasöründe yer almalıdır.

Dosyayı oluştururken:

- Sorunda istenen veya yakın zamanda kabul edilen sayılarda kullanılan dosya adı biçimini eşleştirin.
- Görev farklı bir biçim istemediği sürece şablondaki bölüm sırasını koruyun.
- Yalnızca ilgili haftadaki bağlantıları ekleyin.
- Okuyucuların neden önemli olduğunu anlayabilmesi için her bağlantı için kısa ve net bir açıklama yazın.
- Gerekirse İngilizce olmayan kaynakları İngilizceye çevirin veya İngilizce özetleyin.
- Pull request açmadan önce her bağlantıyı kontrol edin.

### 4. Doğru zamanda bağlantıları toplayın

ZecWeekly normalde mevcut haftadaki Zcash ekosistemi faaliyetlerini kapsar ve haftanın sonuna doğru yayımlanır. En güvenli zamanlama şudur:

- Mevcut bülten sayısı veya görev yayımlandıktan sonra bağlantıları toplamaya başlayın.
- Hafta hâlâ aktifken bir taslak tutun.
- Haftanın sonundaki güncellemeleri kontrol ettikten sonra, istenen gönderim tarihine yakın bir zamanda pull request’i gönderin.
- O tarihe ait görev mevcut olmadan veya ZecHub size onu hazırlamanız gerektiğini onaylamadan gelecekteki bir haftanın bültenini göndermeyin.

Bir sorunda belirli bir tarihe kadar gönderim isteniyorsa, o tarihi takip edin. Bu sayfa ile güncel bir sorun arasında çelişki varsa, güncel sorunu takip edin.

### 5. Pull request’i açın

Bülten dosyanız hazır olduğunda:

1. Değişikliklerinizi fork’unuza commit edin.
2. `main` branch’inde `ZecHub/zechub` deposuna bir pull request açın.
3. Sayıyla eşleşen bir başlık kullanın; örneğin `Zcash Ecosystem Digest | May 30th`.
4. İnceleyenlerin yapılan işi görevle ilişkilendirebilmesi için sorunu pull request gövdesinde bağlantılayın.

Örnek pull request gövdesi:

```md
Closes #ISSUE_NUMBER

Summary:
- Adds the Zcash Ecosystem Digest for Month Day.
- Uses the newsletter template and the current issue deadline.
- Checks links and descriptions for the requested week.
```

Pull request açıldıktan sonra inceleme yorumlarını takip edin. ZecHub düzenleme isterse, aynı sayı için ikinci bir pull request açmak yerine aynı branch’i güncelleyin.

### Gerçek örnekler

Kabul edilmiş gönderim örnekleri olarak birleştirilmiş şu bülten pull request’lerini kullanın:

- [Zcash Ecosystem Digest | 11 Nisan](https://github.com/ZecHub/zechub/pull/1551)
- [Zcash Ecosystem Digest | 28 Mart](https://github.com/ZecHub/zechub/pull/1544)
- [Zcash Ecosystem Digest | 14 Şubat](https://github.com/ZecHub/zechub/pull/1474)


![Merged ZecWeekly newsletter pull request example](https://github.com/user-attachments/assets/9230d68d-6406-4c8a-992c-df84e0d318d8)

Çalışmanızı bir örnekle karşılaştırırken, dosya konumuna, başlık biçimine, bölüm sırasına, bağlantı açıklamalarına ve pull request’in doğru göreve bağlanıp bağlanmadığına odaklanın.

### Kaçınılması gereken yaygın hatalar

- Sayı tarihi veya görev onaylanmadan önce pull request açmak.
- Zaten bağlantılı bir pull request’i olan bir sorun üzerinde çalışmak.
- Pull request’i `ZecHub/zechub` yerine kendi fork’unuza göndermek.
- Yanlış dosya adını kullanmak veya dosyayı `newsletter` klasörü dışında bir yere koymak.
- Eski bir sayıyı kopyalayıp her tarihi, bağlantıyı ve açıklamayı güncellememek.
- Yanlış haftadan bağlantılar eklemek.
- Bozuk bağlantılar, yinelenen bağlantılar veya şablondan kalan yer tutucu metin bırakmak.
- İnceleme yorumlarından sonra orijinal branch’i güncellemek yerine yeni bir pull request açmak.

### Son kontrol listesi

İnceleme talep etmeden önce şunları doğrulayın:

- Sorun veya görev tarihi bülten dosyanızla eşleşiyor.
- Aynı sorun veya sayı için başka bir açık pull request zaten bulunmuyor.
- Dosya `newsletter` klasöründe.
- Şablon bölümleri eksiksiz.
- Her bağlantı çalışıyor ve faydalı bir açıklamaya sahip.
- Pull request gövdesi doğru soruna bağlantı veriyor.
- İnceleyenler değişiklik isterse düzenleme yapmaya müsaitsiniz.

## Geçmiş sayılar

[ZecWeekly Arşivi](https://zechub.substack.com/p/archive)
