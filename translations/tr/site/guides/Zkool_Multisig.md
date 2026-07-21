# Zkool Multisig Rehberi

Bu rehber, Zkool kullanarak multisig işlemlerinin nasıl gerçekleştirileceğine dair adım adım bir anlatım sunar. Hesap oluşturma, fon gönderme veya alma ve multisig için distributed key generation (DKG) kurulumunu içerir. Her önemli adım için ekran görüntüleri eklenmiştir.

## Eğitim

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/eagkCIv3BlQ"
    title="Zkool Demo | The Successor to Ywallet"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>


## 1. Hesap Oluşturma


1. **Zkool uygulamasını** açın ve **New Account** bölümüne gidin.


![img1](https://github.com/user-attachments/assets/ee906e49-361a-49b6-9484-904897fe2e3f)

3. Bir **Hesap Adı** girin (örn. Anabelle).  
   

![img2](https://github.com/user-attachments/assets/e9c325d3-8507-433a-a0c6-6e8c1ea2a254)


4. Gerekirse isteğe bağlı olarak **Use Internal Change** veya **Restore Account** seçeneğini açın/kapatın.


5. Oluşturulduktan sonra hesap, **Account List** içinde görünecektir.  


![img3](https://github.com/user-attachments/assets/c446cbca-fb3e-49b9-b1d4-fd727cd1b0fb)


## 2. Fon Alma

Her hesap birden fazla adres türü oluşturur:

**Unified Address**

**Sadece Orchard Adresi**

**Sapling Adresi**
  
**Transparent Adres**


Kullanmak istediğiniz türü seçin ve fon almak için paylaşın.  


![img4](https://github.com/user-attachments/assets/c9de5dfe-e9d7-423d-8d90-35c1a08ffd5d)





## 3. Fon Gönderme

1. **Recipient** bölümüne gidin.  


![img5](https://github.com/user-attachments/assets/9f3a03b9-dd56-450c-a8dc-4370f9289138)


3. **Alıcının adresini** girin.  

4. **Miktarı** ve isteğe bağlı **notu** belirtin.  

5. İşlem ayrıntılarını gözden geçirin ve **onaylayın**.  


Tamamlandığında, bakiye hesap listenizde güncellenir.  


![img6](https://github.com/user-attachments/assets/6e6da76b-cd18-4567-a5c0-74f07ddefc64)


## 4. Multisig İşlemleri Gerçekleştirme: Distributed Key Generation Kurulumu (Multisig)

Zkool'da multisig, birden fazla katılımcının paylaşılan bir hesabı kontrol etmesini sağlamak için **Distributed Key Generation (DKG)** kullanır.



### Adım 1: DKG'yi Başlatın
Paylaşılan cüzdan için bir **Ad** seçin (örn. Anabelle).

**Katılımcı Sayısını** belirleyin.
  
**Katılımcı Kimliğinizi** seçin.
  
**Gerekli İmzacı Sayısını (Threshold)** tanımlayın.
    
**Funding Account** seçin.
  

![img7](https://github.com/user-attachments/assets/8a90ca85-5439-4937-b16d-a570e69d55f0)



### Adım 2: Katılımcı Adreslerini Ekleyin
- Her katılımcının **Unified Address** bilgisini girin (önerilir).


**Not:** Yalnızca Orchard veya yalnızca Sapling adresi kullanırsanız, multisig yalnızca o havuzla sınırlı olacaktır (Orchard veya Sapling).  
Bu, paylaşılan cüzdanın diğer havuzlardan fon alamayacağı anlamına gelir.  
Maksimum uyumluluk ve esneklik için her zaman **Unified Address** kullanın.  


### Adım 3: DKG Turlarını Çalıştırın
Tüm katılımcıların **1. tur** ve **2. tur** paketlerini değiş tokuş etmesini bekleyin.  


![img8](https://github.com/user-attachments/assets/cdaf6e00-3cb0-4774-8a96-5ded19bf31c4)



### Adım 4: Paylaşılan Adresi Tamamlayın
İşlem tamamlandığında bir **paylaşılan adres** oluşturulur.  


![img9](https://github.com/user-attachments/assets/741d1bc6-0102-4e67-bb83-9a1c184bd747)



## Sonuç

Zkool kullanarak şunları yapabilirsiniz: hesap oluşturmak, fon gönderip almak ve Distributed Key Generation kullanarak bir **multisig cüzdan** kurmak. Bu, **gelişmiş güvenlik** ile **işbirlikçi ve özel fon yönetimi** sağlar.
