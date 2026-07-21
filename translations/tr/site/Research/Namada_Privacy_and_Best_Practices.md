---
---
published: 2025-08-02
---

<a href="https://github.com/Zechub/zechub/edit/main/site/Research/Namada_Best_Practices.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Sayfayı Düzenle"/>
</a>

![Namada Logosu](https://raw.githubusercontent.com/ZecHub/zechub-wiki/main/public/nam.png)

# Namada Gizlilik için En İyi Uygulamalar

> Namada'da azami gizliliğe ulaşmak ve korumalarının tam olarak nerede sona erdiğini anlamak için pratik, uygulanabilir rehber.

**Gizlilik temel bir haktır.** Namada, gelişmiş zero-knowledge kriptografisiyle bunu korumak için özel olarak tasarlanmıştır. Bu rehber, gizlilik odaklı kullanıcılar ve geliştiriciler tarafından kullanılan en etkili uygulamaları derler.

---

## Namada Gizliliğinizi Nasıl Korur

Namada, cüzdan adreslerini, işlem tutarlarını ve bakiyeleri **zero-knowledge proofs (zk-SNARKs)** kullanarak gizleyen egemen, gizlilik öncelikli bir blokzincirdir.

### Temel Gizlilik Özellikleri

- **Shielded Transactions** - Göndereni, alıcıyı ve tutarları tamamen gizler.
- **Multi-Asset Shielded Pool (MASP)** - Herhangi bir varlıkta özel transferler, takaslar ve köprüleme.
- **Cross-Chain Privacy** - IBC üzerinden shielded köprüleme (Ethereum ve Solana desteği yakında geliyor).
- **Shielded Yield Rewards** - Yalnızca işlemleri shield ederek NAM token kazan.
- **Low Fees** - Kullanılabilirlikten ödün vermeden güçlü gizlilik.

---

## Önemli Sınırlamalar

Zincir üstündeki en güçlü gizlilik bile kullanıcı davranışları veya zincir dışı etkenler nedeniyle zayıflatılabilir.

<div class="border-l-4 border-yellow-400 bg-yellow-400/10 p-6 my-8 rounded-r-xl text-sm">

**Namada şunlara karşı koruma sağlamaz:**

- VPN veya Tor olmadan bağlanmak (IP adresiniz açığa çıkar)
- Shielded adresleri tekrar tekrar kullanmak
- Şeffaf (shielded olmayan) işlemler yapmak
- Namada adresinizi sosyal medya veya gerçek dünya kimliğinizle ilişkilendirmek
- Yatırma veya çekme işlemleri için merkezi KYC borsaları kullanmak

</div>

---

## Azami Gizlilik için En İyi Uygulamalar

### 1. Genel İlkeler
- Her işlem için varsayılan olarak **shielded transactions** kullanın.
- Farklı amaçlar için shielded adresleri asla yeniden kullanmayın.
- Aynı oturum içinde shielded ve şeffaf faaliyetleri karıştırmaktan kaçının.

### 2. Varlıkları Köprüleme
- Gelen köprüler için **yalnızca** özel bir şeffaf adres kullanın.
- Köprüleme sonrasında varlıkları hemen shield edin.
- Mümkün olduğunda Namada dışına köprüleme yapmayı en aza indirin.

### 3. MASP (Multi-Asset Shielded Pool)
- Varsayılan olarak tüm varlıkları MASP içinde tutun.
- MASP bakiyenizi birincil özel cüzdanınız olarak değerlendirin.

### 4. Görüntüleme Anahtarları
- Viewing Key'leri **yalnızca** tamamen güvendiğiniz taraflarla paylaşın.
- Viewing Key'leri asla herkese açık şekilde yayımlamayın veya paylaşmayın.

### 5. İşlem Hijyeni
- İşlemler arasındaki zamanlamayı ve tutarları rastgeleleştirin.
- Mümkün olduğunda birden fazla işlemi toplu yapın.
- Yuvarlak veya kolayca ayırt edilebilen tutarlar göndermekten kaçının.

### 6. Operasyonel Güvenlik
- Cüzdanlar veya dApp'lerle etkileşime geçerken her zaman bir **VPN** kullanın (tercihen Tor).
- Adres veya bakiye içeren ekran görüntülerini asla paylaşmayın.
- Farklı faaliyetler için ayrı cüzdanlar kullanın (alım satım, bağışlar, kişisel kullanım).

---

## Genişletilmiş Gizlilik Kontrol Listesi

1. **Önce her zaman shield edin** - işlem yapmadan önce varlıkları MASP içine taşıyın.
2. **Shielded adresleri dönüşümlü kullanın** ve farklı kullanım senaryoları için düzenli olarak değiştirin.
3. **Mümkün olduğunda borsalardan doğrudan shielded adreslere çekim yapın.**
4. **İşlem zamanlamalarını çeşitlendirin** ve ayırt edilebilir kalıpları bozun.
5. **Daha büyük bakiyeler için hardware wallet kullanın.**
6. **Yazılımı güncel tutun** - her zaman en güncel Namada istemcisini çalıştırın.
7. **Cihazınızı güvenceye alın** güçlü şifreleme ve parola yöneticileri kullanın.
8. **Sohbetlerde veya herkese açık kayıtlarda metadata sızıntıları** konusunda son derece dikkatli olun.

---

## Katkıda Bulunun

Ek en iyi uygulamalarınız veya geri bildiriminiz mi var?  
[Discord'da tartışmaya katılın](https://discord.gg/srC76aE6)

---
*Son güncelleme: Mart 2026*
