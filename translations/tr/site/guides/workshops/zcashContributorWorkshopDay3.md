# Atölye Günü 3



## Veri Analitiği

* Ham verileri, kalıpları, eğilimleri ve içgörüleri belirlemek için özel sistemler, araçlar ve teknikler kullanarak analiz etme bilimi


Şunları içerir:
```markdown
                     \
-> collecting         \
-> cleaning     =====  \  DATA
-> organizing   =====  / 
-> transforming       /
-> optimizing        /
```




## Zcash 

* Şifrelenmiş elektronik nakit. Özel eşler arası ödemeler için sıfır bilgi şifrelemesi geliştiren ilk kripto para birimi.

not: Güvendiğiniz doğru veriler istiyorsanız, kendi tam düğümünüzü [zebrad] çalıştırmanız önerilir. Tam ve sağlam bir çözüm istiyorsanız
z3 altyapısını [ zebrad + zainod/lightwalletd + "buraya tercih ettiğiniz cüzdan" ] kurabilirsiniz. Verilere
RPC'ler (Remote Procedure Calls) kullanarak erişirsiniz.

Bunun nasıl çalıştığına dair hızlı bir gösterim için şu videoyu izleyin:


https://www.youtube.com/watch?v=Ok9Wa8FNbMA


## Atölye Demosu

Bu atölye, cüzdan seviyesinden veri toplamaya ve dönüştürmeye odaklanacaktır. Çoğu kişinin
Zcash blokzincirine erişeceği seviye burasıdır.


### Kullanım senaryosu (Zkool'da belirli bir hesap için tüm işlemlerin .csv dosyasını oluşturma)

Bu, kişinin *dijital* kişisel finanslarını düzenlemesi ve optimize etmesi gereken popüler bir senaryodur.

#### Adım 1

Zkool'u açın ve kullanmak istediğiniz hesabı seçin

not: Bu demo için bir testnet cüzdanı kullanacağız.

not2: Burada Zkool'u seçiyoruz, ancak dışa aktarma işlevine sahip HERHANGİ BİR cüzdan iş görür!

https://github.com/hhanh00/zkool2

<img width="1496" height="646" alt="1" src="https://github.com/user-attachments/assets/125adfe8-6be3-4798-8ee8-b96bba9fb9ac" />



#### Adım 2


Sağ üstteki menüye gidin ve "İşlemleri Dışa Aktar" seçeneğini seçin

<img width="1398" height="718" alt="2" src="https://github.com/user-attachments/assets/4287ceb6-669b-4ef0-ba24-3f7e2d9860b6" />


#### Adım 3

Verilerimizi dönüştürmek için kullanacağımız bash betiğini indirin. İzleyen geliştiriciler için, çoğu Linux dağıtımında standart olan bash kullanacağım,
ancak siz tercih ettiğiniz dili kullanabilirsiniz. 

Geliştirici olmayanlar veya konuya yeni başlayan öğrenciler için, AI kullanın! 

Başlamanıza yardımcı olabilecek bazı örnek istemler:

""bash/rust/python/ ... vb." kullanarak CSV dosyalarını nasıl dönüştürebilirim"

<img width="1098" height="480" alt="3" src="https://github.com/user-attachments/assets/6503f4be-6fbc-473f-919c-8914e09181bc" />

not: Yine de temelleri anlamanız gerekir, ancak bu atölyeleri yürütmek sürecin AKIŞINI nasıl anlayacağınızı gösterir.

not2: AI genellikle özel değildir, bu yüzden öğrenci olarak kullanırken ekstra dikkatli olun!

#### Adım 4

Kullanım için betikleri ayarlayın ve çalıştırın

`chmod +x cleanCSV.sh`

`./cleanCSV.sh "name_of_exportBackup"`

#### Adım 5 Verileri kullanın

Kullanmak için libreOffice'te veya herhangi bir CSV görüntüleyicide açın!



<img width="2132" height="942" alt="4" src="https://github.com/user-attachments/assets/1097030d-c0f4-44c4-b15c-f86706a77bdc" />
