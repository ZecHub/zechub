[![Sayfayı Düzenle](https://img.shields.io/badge/Edit-blue)](https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Recovering_Funds.md)

# Zcash Cüzdanı Fon Kurtarma

**Özel anahtarınızı neden saklamalısınız?** 

Özel anahtarlar, dijital varlıklarınızın güvenliğinin sırrıdır. Onları güvende tutmak ve asla üçüncü taraflarla paylaşmamak hayati önem taşır. 

> Bu bağlamda, bir **Seed Phrase** özel anahtarın eşdeğeri olarak görülebilir.

Özel anahtarlarınızın kontrolünü elinizde tutarak, kurtarma süreci her zaman mümkün olur. Zcash için 2 tür özel anahtar vardır (transparent ve shielded); ister Sweep Funds işlevini kullanarak ister bunları yeni bir hesap olarak içe aktararak cüzdanınıza kolayca aktarabilirsiniz. Özel anahtarlarınızın kontrolünü elinizde tutarak varlıklarınız üzerinde tam kontrol sahibi olur, mülkiyet, güvenlik ve iç huzurunu garanti altına alırsınız.

# Güvenlik ve Sorumluluk

Kullanıcıların, özel anahtarlarla işlem yaparken söz konusu olan riskleri anlaması ve bu anahtarları yetkisiz erişime karşı koruması son derece önemlidir. Fonların güvenliği, kullanıcının özel anahtarlarını koruma sorumluluğuna bağlıdır.

## Ywallet ile Fon Kurtarma

YWallet, hem *yalnızca transparent* hem de shielded özel anahtarlardan erişilemeyen fonları kurtarmak için en iyi seçeneklerden biri olarak kabul edilir.

### 1) Özel Anahtar İçe Aktarma 

1. Ywallet'i indirin[](https://ywallet.app)

2. Açıldıktan sonra sağ altta 'More' seçeneğine tıklayın

3. 'Accounts' seçeneğini seçin

4. Sağ üst köşedeki artı işaretine tıklayın 

![Artı işareti düğmesi](https://i.postimg.cc/xJbVz7gB/plus.png)

5. 'Restore an account' seçeneğini etkinleştirin 

6. Seed phrase veya Private key girin

> **Not**: Shielded adresleri desteklemeyen bir cüzdanda (Trust, Coinomi, Guarda vb.) fon tuttuysanız, 'Sweep Funds' özelliğini kullanmanız gerekecektir.

### 2) Sweep Funds

1. Ywallet'i indirin[](https://ywallet.app)

2. Açıldıktan sonra sağ altta 'More' seçeneğine tıklayın

3. Tools bölümüne kadar aşağı kaydırın, 'Sweep' seçeneğine tıklayın

4. Seed phrase'inizi girin (Gap limit, seed tarafından oluşturulan ek adresleri tarar)

![Sweep Funds ekranı](https://i.postimg.cc/3055CBcN/sweep.png)

5. Kullanmak istediğiniz hedef için Value Pool'u girin (Borsalar Transparent kullanır)

6. Fonları yatırmak istediğiniz Destination Address'i girin. 

## Zkool

Fon kurtarma için başka bir yol olarak lütfen ayrıntılı Zkool belgelerine göz atın:

- [Zkool Dokümanları](https://hhanh00.github.io/zkool2/guide/start.html)
- [Github](https://github.com/hhanh00/zkool2/)

## ZExCavator

ZExCavator, muhtemelen kaybolmuş ZEC'i kurtaran (kazıp çıkaran!) bir araçtır:

- [ZExCavator](https://zexcavator.com/)
- [Github](https://github.com/zingolabs/zexcavator)
