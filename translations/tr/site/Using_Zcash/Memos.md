<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Memos.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Sayfayı Düzenle"/>
</a>

# Notlar

#### Şifreli Notlar Gönderme

Bir Z2Z (shielded-to-shielded) işlemi gönderirken, işleme bir not (mesaj) ekleyebilirsiniz. Bu not, farklı amaçlarla kullanılabilir.

#### İşlemleri İmzalama

Notlar öncelikle ödemeleri imzalamak için kullanılır. Shielded işlemler verilerinizi şifrelediği için, size ZEC gönderenin kim olduğunu ve ZEC’in ne için gönderilmiş olabileceğini göremezsiniz. Kullanıcılar, karşı tarafa işlemin kimden geldiğini bildirmek için not alanına adlarını veya takma adlarını imza olarak ekleyebilir. Ayrıca işlemin ne için yapıldığını da açıklayabilirler.

#### Mesaj Gönderme

Şifreli notun bir başka kullanım senaryosu da, bir z-addr sahibi birine mesaj göndermektir. Bu mesajlar her şey hakkında olabilir; ister [bir arkadaş için hatırlatma](https://twitter.com/iansagstette/status/1542142468505870336), ister [mümkün olduğunca gizli kalması gereken hassas bir mesaj](https://twitter.com/InsideZcash/status/1545800146352578560) olsun.

#### Blockchain Üzerinde Aşk Notları

Bir kişi, Zcash blockchain’inin ilk bloklarından birinde partnerine bir aşk notu gönderdi. Başka biri de partnerinin kendisine bir Zcash notu aracılığıyla bir dosya gönderdiğini fark etti. Bu dosya, kendisi ve uzaktaki sevgilisinin birlikte katılmayı konuştuğu, yurt dışındaki özel bir etkinliğe ait bir biletti. Not, bir aşk mektubuydu.

#### İleri Düzey

İşte Zcash Shielded Memos, Magic-Wormhole CLI ve zcashd kullanarak dosyaları bir bilgisayardan diğerine güvenli şekilde göndermenin yolu!: 

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

#### Kaynaklar

[Şifreli Not Alanı](https://electriccoin.co/blog/encrypted-memo-field/)
