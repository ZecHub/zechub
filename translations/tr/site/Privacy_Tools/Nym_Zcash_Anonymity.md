<a href="https://github.com/ZecHub/zechub/edit/main/site/Privacy_Tools/Nym_Zcash_Anonymity.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Sayfayı Düzenle"/>
</a>

# Nym ile Zcash için Mixnet Anonimliği

> Son doğrulama: 18 Ekim 2026

Zcash korumalı havuzları, zincir üzerinde tutarları, göndericileri ve alıcıları gizler. Bir cüzdan ile lightwallet sunucusu arasındaki ağ yolunu gizlemezler. Nym'in mixnet'i, eksik olan bu ağ katmanı korumasını ekler. Ekim 2026 itibarıyla entegrasyon üretimdeki cüzdanlarda (Zingo, Zkool) aktif durumdadır.

Kaynak: [Nym, Zcash cüzdanlarına nasıl anonimlik ekliyor](https://nym.com/blog/zcash-mixnet-anonymity) (Nym, 13 Ekim 2026).

## Korunanlar

Nym, işlem paketlerini (genellikle 7–15 KB harcama verisi ve ZK kanıtları) Sphinx paketlerine böler ve bunları mixnet üzerinden yönlendirir. Bu şunları sağlar:

- Göndericinin IP adresini lightwallet sunucusundan gizler
- Trafiği diğer Nym trafiğiyle harmanlar
- Varsayılan ayarlarda yaklaşık 17 bit entropi ve 100.000 kullanıcının üzerinde belirtilen bir anonimlik kümesi sağlar

Zingo v7'deki ödemeler ve fiyat istekleri varsayılan olarak bu yolu izler.

## Korunmayanlar

Zincir senkronizasyonu, nullifier sorguları, işlem getirmeleri ve mempool trafiği şu anda normal indexer bağlantısını kullanır. Karma paketlerin dışındaki cihaz düzeyindeki veya uygulama düzeyindeki meta veriler de Nym'in kapsamı dışındadır.

Tehdit modeliniz senkronizasyon trafiğinin gizlenmesini gerektiriyorsa, yerel mixnet kullanan bir cüzdanı sistem düzeyinde NymVPN ile birleştirin. Bkz. [Nym VPN](/guides/nym-vpn).

## Cüzdanlar

| Cüzdan | Durum | Notlar |
| --- | --- | --- |
| Zingo v7 | Aktif, varsayılan | `makers run-cli`, `nym-proxy`'ü içerir. Oturum çevrimdışı başlar; `--online`, `--remember-online` veya `--server` onay verir. |
| Zkool | Aktif | Yerel mixnet entegrasyonu. |
| Diğerleri | NymVPN aracılığıyla | Cüzdanı sistem düzeyindeki Mixnet modu üzerinden yönlendirin. |

Cüzdan düzeyindeki yolun kurulum ayrıntıları [Zcash Cüzdan Trafiğini Nym Mixnet Üzerinden Yönlendirme](/guides/nym-mixnet-wallet-setup) bölümünde yer alır.

## Ödünleşimler

Nym üzerinden yönlendirilmiş bir yayın, clearnet'e kıyasla yaklaşık 12,5× daha yavaştır (~3,4 sn.). Tor daha hızlıdır (~3,7×), ancak karıştırma olmadan FIFO akışları kullanır; dolayısıyla küresel bir saldırgan hâlâ korelasyon kurabilir. Ortak Nym kullanıcı tabanının büyümesi, ek gecikme eklemekten daha etkili biçimde anonimliği artırır.

## Uygulama katmanı hijyeni: nym-swizzle-zcash

Ağ katmanı koruması yeterli değildir. Mükemmel bir mixnet veya VPN ile bile bir lightwallet sunucusu, uygulama katmanı kalıplarını gözlemleyerek oturumları yine de ilişkilendirebilir:

- Devam noktası zincirleme: istemciler senkronizasyona tam olarak `previous end + 1` noktasından devam eder; bu nedenle sunucu, yalnızca blok yüksekliğine bakarak oturumları zincirleyebilir.
- Önce senkronizasyon, sonra gönderim: cüzdanlar yayından hemen önce senkronize olur ve sunucunun bir işlemi önceki senkronizasyon oturumuna atfetmesine olanak tanır.

[`nym-swizzle-zcash`](https://nym.com/docs/developers/swizzle/zcash) crate'i, her ikisini de ele alan Zcash'e özgü bir hijyen politikası uygular. Genel `nym-swizzle` ilkellerini light client'lar için zincir farkındalığı olan bir politikada bir araya getirir.

**Kuantize senkronizasyon aralıkları.** İstekler, gün boyutunda hücrelere sahip ağ genelindeki bir ızgaraya genişletilir. Başlangıç aşağı yuvarlanır, bitiş yukarı yuvarlanır. Aralıklar deterministik, artan ve ayrıdır. Reorg kontrolleri genişletilmiş aralık içinde kalır; böylece kesin devam noktası açığa çıkmaz. Anonimlik gürültüden değil, çakışmadan (birçok cüzdanın aynı sınırları yaymasından) gelir.

**Ayrıştırılmış yayınlar.** İşlem gönderimleri, ZIP 318 transfer zamanlamasına uygun olarak üstel dağılımla geciktirilir (ortalama 144 blok ≈ 3 saat, üst sınır 576 blok ≈ 12 saat). Gecikmeler tipik süreç ömürlerini aşar; bu nedenle zamanlamalar kalıcı olarak saklanır. İşlem, yalnızca tetikleme anında güncel bir tip'e göre oluşturulur. Senkronizasyon ve yayın farklı sunucular kullanmalıdır.

Crate, `BlockSource` ve `TxBroadcaster` trait'lerini sunar, `wasm32-unknown-unknown` için derlenir ve kendi ağ yığını yoktur. Tüm API ve örnekler için [Nym belgelerine](https://nym.com/docs/developers/swizzle/zcash) bakın.

## Kaynaklar

- [Nym, Zcash cüzdanlarına nasıl anonimlik ekliyor](https://nym.com/blog/zcash-mixnet-anonymity) — Nym, 13 Ekim 2026
- [nym-swizzle-zcash: Zcash Light Client'ları için Hijyen Politikası](https://nym.com/docs/developers/swizzle/zcash) — Nym Belgeleri
- [Zingo + Nym](https://zingolabs.org/zingo/blog/zingo-nym/) — Zingo Labs
- [Zcash Cüzdan Trafiğini Nym Mixnet Üzerinden Yönlendirme](/guides/nym-mixnet-wallet-setup) — ZecHub
- [Nym VPN](/guides/nym-vpn) — ZecHub
