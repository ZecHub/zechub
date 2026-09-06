<a href="https://github.com/zechub/zechub/edit/main/site/contribute/ZecWeekly_Newsletter.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# ZecWeekly Bülteni

ZecWeekly, her pazar sabahı gönderilen bir bültendir. Zcash ekosisteminde hafta boyunca gerçekleşen tüm haberleri içerir. Haberler topluluk üyeleri tarafından haftalık olarak derlenir ve ilgili tüm bağlantılar bültene eklenir. Lütfen bültene [buradan](https://zechub.substack.com/) abone olun.

## Katkıda bulunma

Bülten katkıları, bir katkıda bulunan doğru haftanın sayısını hazırladığında, güncel ödül veya koordinasyon başlığını takip ettiğinde ve haftalık bağlantılar hazır olduktan sonra çekme isteğini gönderdiğinde en iyi şekilde işler. Lütfen ZecHub o sayı için tarihi paylaşmadan veya onaylamadan gelecekteki bir sayıyı göndermeyin. Erken çekme istekleri genellikle haftanın son güncellemelerini kaçırır, atanmış bir editörle çakışır veya yanlış son tarihi kullanır.

### 1. Güncel sayıyı doğrulayın

Yazmaya başlamadan önce:

- Güncel bülten görevi için [ZEC Bounties ](https://bounties.zechub.wiki/) sayfasını kontrol edin.
- Atanmayı bekleyin

![ss](/content-images/149a802c-b64f-4969-ad89-e83ffecf568e-d5d8387145.webp)



### 2. Depoyu çatallayın

GitHub'da yeniyseniz, şu iş akışını kullanın:

1. [ZecHub deposunu](https://github.com/ZecHub/zechub) açın.
2. **Fork** düğmesine tıklayın ve GitHub hesabınız altında bir çatallama oluşturun.
3. Çatallamanızda sayı için yeni bir dal oluşturun. `digest-may-30-2026` gibi açık bir dal adı faydalıdır.
4. Çekme isteğinizin temel depo olarak `ZecHub/zechub`u ve temel dal olarak `main`i hedefleyeceğinden emin olun.

Komut satırını kullanıyorsanız, aynı iş akışı şöyle görünür:

```bash
git clone https://github.com/YOUR-USERNAME/zechub.git
cd zechub
git checkout -b digest-month-day-year
```

`YOUR-USERNAME` ifadesini kendi GitHub kullanıcı adınızla değiştirin. Yukarıdaki URL bir yer tutucudur ve yazıldığı şekliyle çözümlenmez.

### 3. Bülten dosyasını oluşturun

Başlangıç noktası olarak [bülten şablonunu](https://github.com/ZecHub/zechub/blob/main/newsletter/newslettertemplate.md) kullanın. Bülten sayıları [`newsletter`](https://github.com/ZecHub/zechub/tree/main/newsletter) klasöründe yer alır.

Dosyayı oluştururken:

- Görevde istenen veya yakın zamanda kabul edilen sayılarda kullanılan dosya adı biçimiyle eşleşin.
- Görev farklı bir biçim istemedikçe şablonla aynı bölüm sırasını koruyun.
- Yalnızca ilgili haftadan bağlantılar ekleyin.
- Okuyucuların neden önemli olduğunu anlaması için her bağlantı için kısa ve açık bir açıklama yazın.
- Gerektiğinde İngilizce olmayan kaynakları İngilizceye çevirin veya özetleyin.
- Çekme isteğini açmadan önce her bağlantıyı kontrol edin.

### 4. Bağlantıları doğru zamanda toplayın

ZecWeekly normalde güncel haftanın Zcash ekosistemi faaliyetlerini kapsar ve haftanın sonuna yakın yayımlanır. En güvenli zamanlama şöyledir:

- Güncel bülten konusu veya görevi yayımlandıktan sonra bağlantıları toplamaya başlayın.
- Hafta hâlâ aktifken bir taslak tutun.
- Haftanın son güncellemelerini kontrol ettikten sonra, istenen gönderim tarihine yakın bir zamanda çekme isteğini gönderin.
- O tarih için görev mevcut olmadan veya ZecHub hazırlamanız gerektiğini onaylamadan gelecek haftanın bültenini göndermeyin.

Bir konu belirli bir tarihe kadar gönderim yapılmasını söylüyorsa, o tarihi takip edin. Bu sayfa ile güncel bir konu arasında çakışma varsa, güncel konuyu takip edin.

### 5. Çekme isteğini açın

Bülten dosyanız hazır olduğunda:

1. Değişikliklerinizi çatallamanıza işleyin.
2. `main` dalında `ZecHub/zechub`a bir çekme isteği açın.
3. `Zcash Ecosystem Digest | May 30th` gibi, sayıyla eşleşen bir başlık kullanın.
4. İnceleyenlerin çalışmayı görevle ilişkilendirebilmesi için çekme isteği gövdesinde konuya bağlantı verin.

Örnek çekme isteği gövdesi:

```md
Closes #ISSUE_NUMBER

Summary:
- Adds the Zcash Ecosystem Digest for Month Day.
- Uses the newsletter template and the current issue deadline.
- Checks links and descriptions for the requested week.
```

Çekme isteği açıldıktan sonra inceleme yorumlarını takip edin. ZecHub düzenleme isterse, aynı sayı için ikinci bir çekme isteği açmak yerine aynı dalı güncelleyin.

### Gerçek örnekler

Kabul edilen gönderim örnekleri için birleştirilmiş şu bülten çekme isteklerini kullanın:

- [Zcash Ecosystem Digest | 11 Nisan](https://github.com/ZecHub/zechub/pull/1551)
- [Zcash Ecosystem Digest | 28 Mart](https://github.com/ZecHub/zechub/pull/1544)
- [Zcash Ecosystem Digest | 14 Şubat](https://github.com/ZecHub/zechub/pull/1474)


![Merged ZecWeekly newsletter pull request example](/content-images/9230d68d-6406-4c8a-992c-df84e0d318d8-8893d2de55.webp)

Çalışmanızı bir örnekle karşılaştırırken dosya konumuna, başlık biçimine, bölüm sırasına, bağlantı açıklamalarına ve çekme isteğinin doğru göreve bağlanıp bağlanmadığına odaklanın.

### Kaçınılması gereken yaygın hatalar

- Sayı tarihi veya görev onaylanmadan çekme isteği açmak.
- Zaten bağlantılı bir çekme isteği olan bir konu üzerinde çalışmak.
- Çekme isteğini `ZecHub/zechub` yerine kendi çatallamanıza göndermek.
- Yanlış dosya adını kullanmak veya dosyayı `newsletter` klasörünün dışına koymak.
- Her tarihi, bağlantıyı ve açıklamayı güncellemeden eski bir sayıyı kopyalamak.
- Yanlış haftadan bağlantılar eklemek.
- Şablondan bozuk bağlantılar, yinelenen bağlantılar veya yer tutucu metin bırakmak.
- İnceleme yorumlarından sonra özgün dalı güncellemek yerine yeni bir çekme isteği açmak.

### Son kontrol listesi

İnceleme istemeden önce şunları doğrulayın:

- Konu veya görev tarihi bülten dosyanızla eşleşiyor.
- Başka açık bir çekme isteği aynı konuyu veya sayıyı zaten kapsamıyor.
- Dosya `newsletter` klasöründe.
- Şablon bölümleri tamamlandı.
- Her bağlantı çalışıyor ve faydalı bir açıklamaya sahip.
- Çekme isteği gövdesi doğru konuya bağlantı veriyor.
- İnceleyenler değişiklik isterse düzenleme yapmaya müsaitsiniz.

## Geçmiş sayılar

[ZecWeekly Arşivi](https://zechub.substack.com/p/archive)
