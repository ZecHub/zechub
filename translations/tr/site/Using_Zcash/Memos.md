<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Memos.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Sayfayı Düzenle"/>
</a>

# Notlar

## Kısaca

* Memo, korumalı bir adrese gönderilen ödemeye eklediğiniz kısa bir nottur. Şifrelenmiştir; bu nedenle blok zincirini izleyen kişiler onu okuyamaz.
* Memo alanı en fazla 512 bayt metin tutar.
* İnsanlar memoları, bir ödemeyi kimin gönderdiğini ve ne için olduğunu belirtmek veya özel mesaj göndermek için kullanır.
* Şeffaf adreslere yapılan ödemeler memo taşıyamaz.
* Bir [ödeme talebi bağlantısı](/using-zcash/payment-request-uris), mağazanın her siparişi etiketleyebilmesi için memoyu sizin yerinize doldurabilir.

## Temel Açıklama

### Şifreli Memo Gönderme

Z2Z (korumalıdan korumalıya) işlem gönderirken, işleme bir memo (mesaj) ekleyebilirsiniz. Bu memo birkaç farklı amaçla kullanılabilir.

### İşlemleri İmzalama

Memolar öncelikle ödemeleri imzalamak için kullanılır. Korumalı işlemler verilerinizi şifrelediğinden, size ZEC gönderenin kim olduğunu ve ZEC ne için olabileceğini göremezsiniz. Kullanıcılar, karşı tarafın işlemin kimden geldiğini bilmesi için memo alanına adlarını veya takma adlarını yazabilir. Ayrıca işlemin ne için olduğunu da açıklayabilirler.

### Mesaj Gönderme

Şifreli memo için bir diğer kullanım alanı, z-addr kullanan birine mesaj göndermektir. Bu mesajlar, ister bir [arkadaşa hatırlatma](https://twitter.com/iansagstette/status/1542142468505870336) isterse [mümkün olduğunca gizli kalması gereken hassas bir mesaj](https://twitter.com/InsideZcash/status/1545800146352578560) olsun, herhangi bir konuda olabilir.

### Blok Zincirinde Aşk Notları

Zcash blok zincirindeki ilk bloklardan birinde partnerine aşk notu gönderen biri vardı. Birisi, partnerinin kendisine Zcash memo aracılığıyla bir dosya gönderdiğini keşfetti. Bu dosya, onun ve uzaktaki sevgilisinin birlikte katılmaktan söz ettiği yurt dışındaki özel bir etkinliğe biletti. Memo bir aşk notuydu.

## Görsel / Analoji

Korumalı bir ödemeyi, içinde para bulunan mühürlü bir zarf olarak düşünün. Memo, parayla birlikte zarfa katlanmış bir nottur.

Blok zinciri postanedir. Zarfı taşır ve ulaştığını kaydeder, ancak onu asla açmaz. Zarfı açan kişi notu okur. Şeffaf bir ödeme kartpostaldır; dolayısıyla içine not katlanacak bir zarf yoktur.

## Derinlemesine İnceleme

### Bir memoya neler sığar

Memo alanı her zaman tam olarak 512 bayttır. Daha kısa bir metin memosu şifrelenmeden önce sıfır baytlarıyla doldurulur; böylece zincir üzerindeki her memo aynı boyutta görünür.

Çoğu memo düz UTF-8 metnidir. [ZIP 302](https://zips.z.cash/zip-0302) ayrıca `0xF5` veya daha yüksek bir baytla başlayan memoları başka veri türleri için ayırır ve `0xF6` ardından sıfırların gelmesi “memo yok” anlamına gelir.

Bir işlemdeki her korumalı çıktı kendi memosunu taşır; dolayısıyla birkaç kişiye ödeme yapan tek bir işlem, her biri için farklı bir not içerebilir.

### Gelişmiş

> **Tarihsel. Bu demo artık yazıldığı şekliyle çalışmıyor.**
>
> Aşağıdaki demo zcashd kullanır ve [alma betiği](https://github.com/ZecHub/zechub/blob/main/site/tutorials/ZcashMagicWormhole/receiveOwlsWormhole.sh) memoları `zcash-cli` aracılığıyla okur. zcashd, 18 Temmuz 2026'da otomatik Destek Sonu durdurmasına ulaştı; bu nedenle bu betik çalışan bir düğüme erişemez ve başka bir sisteme taşınmadı.
>
> Korumalı memoları komut satırından okumak Zallet üzerinde hâlâ çalışır: `zallet rpc z_listunspent`, alınan her korumalı notu betiğin okuduğu aynı `memoStr` alanıyla döndürür. Komut için [Zallet Hızlı Başvuru Kılavuzu](/using-zcash/zallet-quick-reference-guide)na, bir düğümü zcashd üzerinden taşımak için de [Zebra ve Zallet](/guides/migration-guide-zcashd-to-zebrad-zallet) geçiş kılavuzuna bakın. Zallet hâlâ beta aşamasındadır.
>
> Bu bölüm, Magic-Wormhole demosunun tarihsel kaydı olarak korunmuştur.

İşte, dosyaları bir bilgisayardan diğerine güvenli şekilde göndermek için Magic-Wormhole CLI ve zcashd ile Zcash Korumalı Memoların nasıl kullanılacağı!

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/8iqPCza9o6A"
    title="DEMO: Zcash ile Şifreli Dosya Aktarımı 📁"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>

## İlgili Sayfalar

- [Ödeme Talebi URI'leri](/using-zcash/payment-request-uris): bir `zcash:` bağlantısına veya QR koduna memo ekleyin.
- [İşlemler](/using-zcash/transactions): korumalı ve şeffaf işlem türleri.
- [Korumalı Havuzlar](/using-zcash/shielded-pools): memoları taşıyan korumalı notların bulunduğu yer.
- [Cüzdanlar](/using-zcash/wallets): memoları destekleyen cüzdanları bulmak için Korumalı Memo filtresini kullanın.
- [Zallet Hızlı Başvuru Kılavuzu](/using-zcash/zallet-quick-reference-guide): alınan memoları komut satırından okuyun.
- [Zcash İçerik Üreticileri için Araçlar](/using-zcash/creators-and-tips): bahşişle birlikte mesaj gönderen bahşiş araçları.

### Kaynaklar

[Şifreli Memo Alanı](https://electriccoin.co/blog/encrypted-memo-field/)

**Son güncelleme:** Ekim 2026
