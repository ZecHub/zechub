---
published: 2025-08-02
---

<a href="https://github.com/Zechub/zechub/edit/main/site/Research/Namada_Privacy_and_Best_Practices.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Sayfayı düzenle"/>
</a>

![Namada Logo](/content-images/nam-078c7b6883.webp)

# Namada Gizlilik İçin En İyi Uygulamalar

> Namada üzerinde en yüksek düzeyde gizliliğe ulaşmak ve korumalarının nerede sona erdiğini tam olarak anlamak için pratik, uygulanabilir öneriler.

**Gizlilik temel bir haktır.** Namada, gelişmiş sıfır bilgi (zero-knowledge) kriptografisiyle gizliliği korumak üzere özel olarak tasarlanmıştır. Bu kılavuz, gizliliğe önem veren kullanıcıların ve geliştiricilerin uyguladığı en etkili yöntemleri derliyor.

---

## Namada Gizliliğinizi Nasıl Korur?

Namada, cüzdan adreslerini, işlem tutarlarını ve bakiyelerini sıfır bilgi kanıtları (zk-SNARKs) kullanarak gizleyen, egemen ve gizliliği önceliklendiren bir blokzincirdir.

### Temel Gizlilik Özellikleri

- **Korumalı İşlemler** - Göndereni, alıcıyı ve tutarları tamamen gizler.
- **Çok Varlıklı Korumalı Havuz (MASP)** - Her türlü varlık arasında özel transferler, takaslar ve köprüleme.
- **Zincirler Arası Gizlilik** - IBC üzerinden korumalı köprüleme (Ethereum ve Solana desteği yakında geliyor).
- **Korumalı Getiri Ödülleri** - İşlemleri korumalı hâle getirerek NAM token’larını kazanın.
- **Düşük Ücretler** - Kullanılabilirlikten ödün vermeden güçlü gizlilik.

---

## Önemli Sınırlamalar

En güçlü zincir üstü gizlilik bile kullanıcı davranışları veya zincir dışı etkenler nedeniyle zayıflatılabilir.

<div class="border-l-4 border-yellow-400 bg-yellow-400/10 p-6 my-8 rounded-r-xl text-sm">

**Namada aşağıdakilere karşı koruma SAĞLAMAZ:**

- VPN veya Tor kullanmadan bağlanmak (IP adresiniz açığa çıkar)
- Korumalı adresleri tekrar tekrar kullanmak
- Şeffaf (korumasız) işlemler gerçekleştirmek
- Namada adresinizi sosyal medya hesabınızla veya gerçek dünyadaki kimliğinizle ilişkilendirmek
- Para yatırma veya çekme işlemleri için merkezi KYC borsalarını kullanmak

</div>

---

## En Yüksek Düzeyde Gizlilik İçin En İyi Uygulamalar

### 1. Genel İlkeler
- Her işlemde varsayılan olarak **korumalı işlemleri** tercih edin.
- Korumalı adresleri farklı amaçlar için asla tekrar kullanmayın.
- Aynı oturumda korumalı ve şeffaf etkinlikleri karıştırmaktan kaçının.

### 2. Varlıkları Köprüleme
- Gelen köprü işlemleri **yalnızca** özel bir şeffaf adresle gerçekleştirin.
- Varlıkları köprü üzerinden aldıktan hemen sonra korumalı hâle getirin.
- Mümkün olduğunda Namada dışına köprüleme işlemlerini en aza indirin.

### 3. MASP (Çok Varlıklı Korumalı Havuz)
- Varsayılan olarak tüm varlıklarınızı MASP içinde tutun.
- MASP bakiyenizi birincil özel cüzdanınız olarak değerlendirin.

### 4. Görüntüleme Anahtarları
- Görüntüleme anahtarlarını **yalnızca** tamamen güvendiğiniz taraflarla paylaşın.
- Görüntüleme anahtarlarını asla herkese açık şekilde yayımlamayın veya paylaşmayın.

### 5. İşlem Alışkanlıkları
- İşlemler arasındaki zamanlamayı ve tutarları rastgele değiştirin.
- Mümkün olduğunda birden fazla işlemi toplu hâlde gerçekleştirin.
- Yuvarlak veya kimliğinizi kolayca açığa çıkarabilecek tutarları göndermekten kaçının.

### 6. Operasyonel Güvenlik
- Cüzdanlarla veya dApp’lerle etkileşim kurarken daima bir **VPN** (tercihen Tor) kullanın.
- Adres veya bakiye içeren ekran görüntülerini asla paylaşmayın.
- Farklı etkinlikler (alım satım, bağış, kişisel kullanım) için ayrı cüzdanlar kullanın.

---

## Genişletilmiş Gizlilik Kontrol Listesi

1. **Önce daima korumalı hâle getirin** - İşlem yapmadan önce varlıkları MASP içine taşıyın.
2. **Farklı kullanım alanları** için korumalı adresleri düzenli olarak değiştirin.
3. Mümkün olduğunda borsalardan doğrudan korumalı adreslere **çekim yapın**.
4. Tanımlanabilir örüntüleri kırmak için **işlem zamanlamalarını çeşitlendirin**.
5. Büyük varlıklar için **donanım cüzdanları** kullanın.
6. **Yazılımları güncel tutun** - Daima en güncel Namada istemcisini çalıştırın.
7. Güçlü Şifreleme ve parola yöneticileriyle **cihazınızın güvenliğini sağlayın**.
8. Sohbetlerde veya herkese açık kayıtlarda meta verilerin sızmasına karşı **son derece dikkatli olun**.

---

## Katkıda Bulunun

Ek en iyi uygulamalarınız veya geri bildiriminiz mi var?  
[Discord](https://discord.gg/srC76aE6) üzerinde tartışmaya katılın.

---
*Son güncelleme: Mart 2026*
