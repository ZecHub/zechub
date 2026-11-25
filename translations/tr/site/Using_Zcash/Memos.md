<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Memos.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Memolar

## Kısaca

* Memo, korumalı bir adrese gönderilen ödemeye eklediğiniz kısa bir nottur. Şifrelenir; bu nedenle blokzinciri izleyen kişiler okuyamaz.
* Memo alanı, en fazla 512 bayt metin tutar.
* İnsanlar memoları, ödemeyi kimin gönderdiğini ve ne için olduğunu belirtmek veya özel bir mesaj göndermek için kullanır.
* Şeffaf adreslere yapılan ödemeler memo içeremez.
* Bir [ödeme isteği bağlantısı](/using-zcash/payment-request-uris), bir mağazanın her siparişi etiketleyebilmesi için memo alanını sizin yerinize doldurabilir.

## Temel Açıklama

### Şifrelenmiş Memolar Gönderme

Bir Z2Z (korumalı adresten korumalı adrese) işlem gönderirken işleme bir memo (mesaj) ekleyebilirsiniz. Bu memo farklı amaçlarla kullanılabilir.

### İşlemleri İmzalama

Memolar öncelikle ödemeleri imzalamak için kullanılır. Korumalı işlemler verilerinizi şifrelediğinden, size kimin ZEC gönderdiğini ve ZEC ne için gönderilmiş olabileceğini göremezsiniz. Kullanıcılar, işlemin kimden geldiğini karşı tarafa bildirmek için memo alanına adlarını veya takma adlarını yazabilir. Ayrıca işlemin ne için olduğunu da açıklayabilirler.

### Mesaj Gönderme

Şifrelenmiş memonun bir başka kullanım alanı, z-adresi olan birine mesaj göndermektir. Bu mesajlar, [bir arkadaşınıza hatırlatma](https://twitter.com/iansagstette/status/1542142468505870336) ya da [olabildiğince özel kalması gereken hassas bir mesaj](https://twitter.com/InsideZcash/status/1545800146352578560) gibi her konuda olabilir.

### Blokzincirdeki Aşk Notları

Bir kişi, Zcash blokzincirindeki ilk bloklardan birinde partnerine bir aşk notu gönderdi. Birisi, partnerinin kendisine bir Zcash memo aracılığıyla dosya gönderdiğini keşfetti. Bu dosya, kendisinin ve uzaktaki sevgilisinin birlikte katılmaktan söz ettikleri, denizaşırı özel bir etkinliğin biletinin ta kendisiydi. Memo bir aşk notuydu.

## Görsel / Benzetme

Korumalı bir ödemeyi içinde para bulunan mühürlü bir zarf olarak düşünün. Memo, parayla birlikte zarfa katlanıp konan bir nottur.

Blokzincir postanedir. Zarfı taşır ve ulaştığını kaydeder; zarfı asla açmaz. Zarfı açan kişi notu okur. Şeffaf ödeme ise kartpostaldır; dolayısıyla not koyacak bir zarf yoktur.

## Ayrıntılı İnceleme

### Memoya neler sığar

Memo alanı her zaman tam olarak 512 bayttır. Daha kısa bir metin memo, şifrelenmeden önce sıfır baytlarla doldurulur; böylece zincir üstündeki tüm memolar aynı boyutta görünür.

Memoların çoğu düz UTF-8 metnidir. [ZIP 302](https://zips.z.cash/zip-0302) ayrıca `0xF5` veya daha yüksek bir baytla başlayan memoları başka veri türleri için ayırır; `0xF6` ardından sıfırlar gelen bir memo ise “memo yok” anlamına gelir.

Bir işlemdeki her korumalı çıktı kendi memosunu taşır; bu nedenle birden fazla kişiye ödeme yapan tek bir işlem, her biri için farklı bir not içerebilir.

### İleri Düzey

> **Tarihsel. Bu demo artık yazıldığı biçimde çalışmıyor.**
>
> Aşağıdaki demo zcashd kullanır ve [alıcı betiği](https://github.com/ZecHub/zechub/blob/main/site/tutorials/ZcashMagicWormhole/receiveOwlsWormhole.sh) memoları `zcash-cli` üzerinden okur; zcashd, otomatik Destek Sonu durdurma aşamasına 18 Temmuz 2026'da ulaştı; bu nedenle betik çalışan bir düğüme erişemez ve yeni sisteme uyarlanmamıştır.
>
> Korumalı memoları komut satırından okumak Zallet üzerinde hâlâ mümkündür: `zallet rpc z_listunspent`, alınan her korumalı note'u betiğin okuduğu `memoStr` alanıyla birlikte döndürür. Komut için [Zallet Kısa Başvuru Kılavuzu](/using-zcash/zallet-quick-reference-guide)'na, bir düğümü zcashd üzerinden taşımak içinse [Zebra ve Zallet](/guides/migration-guide-zcashd-to-zebrad-zallet)'a geçiş kılavuzuna bakın. Zallet hâlâ beta aşamasındadır.
>
> Bu bölüm, Magic-Wormhole demosunun tarihsel kaydı olarak tutulmaktadır.

Dosyaları bir bilgisayardan diğerine güvenli biçimde göndermek için Zcash korumalı memoları Magic-Wormhole CLI ve zcashd ile şu şekilde kullanabilirsiniz!

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/8iqPCza9o6A"
    title="DEMO: Zcash ile Şifrelenmiş Dosya Aktarımı 📁"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>

## İlgili Sayfalar

- [Ödeme İsteği URI'leri](/using-zcash/payment-request-uris): bir `zcash:` bağlantısına veya QR koduna memo ekleyin.
- [İşlemler](/using-zcash/transactions): korumalı ve şeffaf işlem türleri.
- [Korumalı Havuzlar](/using-zcash/shielded-pools): memoları taşıyan korumalı note'ların bulunduğu yer.
- [Cüzdanlar](/using-zcash/wallets): memoları destekleyen cüzdanları bulmak için Korumalı Memo filtresini kullanın.
- [Zallet Kısa Başvuru Kılavuzu](/using-zcash/zallet-quick-reference-guide): alınan memoları komut satırından okuyun.
- [Zcash İçerik Üreticileri için Araçlar](/using-zcash/creators-and-tips): bahşişle birlikte mesaj gönderen bahşiş araçları.

### Kaynaklar

[Şifrelenmiş Memo Alanı](https://electriccoin.co/blog/encrypted-memo-field/)

**Son güncelleme:** Ekim 2026
