# Zkool Çoklu İmza (Multisig) Rehberi

Bu kılavuzda, Zkool kullanarak çoklu imza işlemlerinin nasıl gerçekleştirileceği adım adım anlatılmaktadır. Hesap oluşturma, fon gönderme veya alma ve çoklu imza için dağıtık anahtar üretimini (DKG) ayarlama konuları ele alınmaktadır. Her önemli adım için ekran görüntüleri eklenmiştir.

## Eğitim

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/eagkCIv3BlQ"
    title="Zkool Demo | Ywallet'ın Ardılı"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>


## 1. Hesap Oluşturma


1. **Zkool uygulamasını** açın ve **Yeni Hesap** bölümüne gidin.


![img1](/content-images/ee906e49-361a-49b6-9484-904897fe2e3f-074e400a9c.webp)

3. Bir **Hesap Adı** girin (ör. Anabelle).
   

![img2](/content-images/e9c325d3-8507-433a-a0c6-6e8c1ea2a254-a637810ed5.webp)


4. Gerekirse isteğe bağlı olarak **Dahili Para Üstü Kullan** veya **Hesabı Geri Yükle** seçeneğini etkinleştirin.


5. Hesap oluşturulduktan sonra **Hesap Listenizde** görünür.


![img3](/content-images/c446cbca-fb3e-49b9-b1d4-fd727cd1b0fb-971cf76b33.webp)


## 2. Fon Alma

Her hesap birden fazla adres türü oluşturur:

**Birleşik Adres**

**Yalnızca Orchard adresi**

**Sapling Adresi**
  
**Şeffaf Adres**


Kullanmak istediğiniz türü seçin ve fon almak için paylaşın.  


![img4](/content-images/c9de5dfe-e9d7-423d-8d90-35c1a08ffd5d-a0d6a4e7b7.webp)





## 3. Fon Gönderme

1. **Alıcı** bölümüne gidin.


![img5](/content-images/9f3a03b9-dd56-450c-a8dc-4370f9289138-3217d846b7.webp)


3. **Alıcının adresini** girin.  

4. **Tutarı** ve isteğe bağlı **memo** alanını belirtin.

5. İşlem ayrıntılarını gözden geçirin ve **onaylayın**.  


İşlem tamamlandığında bakiyeniz hesap listenizde güncellenir.


![img6](/content-images/6e6da76b-cd18-4567-a5c0-74f07ddefc64-78dc3362dc.webp)


## 4. Çoklu İmza İşlemleri Gerçekleştirme: Dağıtık Anahtar Üretimini Ayarlama (Çoklu İmza)

Zkool içindeki çoklu imza, birden fazla katılımcının ortak bir hesabı kontrol etmesini sağlamak için **Dağıtık Anahtar Üretimi (DKG)** kullanır.



### 1. Adım: DKG'yi Başlatma
Paylaşılan cüzdan için bir **Ad** seçin (ör. Anabelle).

**Katılımcı Sayısını** belirleyin.
  
**Katılımcı Kimliğinizi** seçin.
  
Gerekli **İmzalayan Sayısını (Eşiği)** tanımlayın.
    
**Fonlama Hesabını** seçin.
  

![img7](/content-images/8a90ca85-5439-4937-b16d-a570e69d55f0-1477202a57.webp)



### 2. Adım: Katılımcı Adreslerini Ekleme
- Her katılımcının **Birleşik Adresini** girin (önerilir).


**Not:** Yalnızca Orchard veya yalnızca Sapling adresi kullanırsanız, çoklu imza yalnızca ilgili havuzla (Orchard veya Sapling) sınırlı olur.  
Bu, paylaşılan cüzdanın diğer havuzlardan fon alamayacağı anlamına gelir.  
En yüksek uyumluluk ve esneklik için her zaman **Birleşik Adresleri** kullanın.


### 3. Adım: DKG Turlarını Gerçekleştirme
Tüm katılımcıların **1. tur** ve **2. tur** paketlerini karşılıklı olarak paylaşmasını bekleyin.


![img8](/content-images/cdaf6e00-3cb0-4774-8a96-5ded19bf31c4-b6bb50bbab.webp)



### 4. Adım: Paylaşılan Adresi Tamamlama
İşlem tamamlandığında bir **paylaşılan adres** oluşturulur.  


![img9](/content-images/741d1bc6-0102-4e67-bb83-9a1c184bd747-a508ea0371.webp)



## Sonuç

Zkool kullanarak hesap oluşturabilir, fon gönderip alabilir ve Dağıtık Anahtar Üretimi ile bir **çoklu imza cüzdanı** ayarlayabilirsiniz. Bu, **gelişmiş güvenlik** ile **fonların ortaklaşa ve gizlilik içinde yönetilmesini** sağlar.
