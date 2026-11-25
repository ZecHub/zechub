<a href="https://github.com/ZecHub/zechub/edit/main/site/Privacy_Tools/Nym_Zcash_Anonymity.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Sayfayı düzenle"/>
</a>

# Nym Zcash için Mixnet Anonimliği

> Son doğrulama: 18 Ekim 2026

Zcash korumalı havuzlar, zincir üstünde tutarları, göndericileri ve alıcıları gizler. Ancak bir cüzdan ile hafif istemci sunucusu arasındaki ağ yolunu gizlemez. Nym mixnet’i bu eksik ağ katmanı korumasını sağlar. Ekim 2026 itibarıyla entegrasyon, üretim cüzdanlarında kullanıma açıktır (Zingo, Zkool).

Kaynak: [How Nym adds anonymity to Zcash wallets](https://nym.com/blog/zcash-mixnet-anonymity) (Nym, 13 Ekim 2026).

## Neler korunuyor

Nym işlem paketlerini (genellikle 7–15 KB harcama verisi ve ZK kanıtları) Sphinx paketlerine dönüştürür ve mixnet üzerinden yönlendirir. Bu sayede:

- Göndericinin IP adresi hafif istemci sunucusundan gizlenir
- Trafik diğer Nym trafiğiyle harmanlanır
- Varsayılan ayarlarda yaklaşık 17 bit entropi ve 100.000 kullanıcının üzerinde olduğu belirtilen bir anonimlik kümesi sağlanır

Zingo v7’deki ödemeler ve fiyat istekleri varsayılan olarak bu yolu izler.

## Neler korunmuyor

Zincir senkronizasyonu, nullifier sorguları, işlem getirme istekleri ve mempool trafiği şu anda normal indeksleyici bağlantısını kullanır. Karıştırılmış paketlerin dışındaki cihaz veya uygulama düzeyindeki meta veriler de Nym’in kapsamı dışındadır.

Tehdit modeliniz senkronizasyon trafiğinin gizlenmesini gerektiriyorsa, yerel mixnet kullanan bir cüzdanı sistem düzeyinde NymVPN ile birlikte kullanın. Bkz. [Nym VPN](/guides/nym-vpn).

## Cüzdanlar

| Cüzdan | Durum | Notlar |
| --- | --- | --- |
| Zingo v7 | Kullanımda, varsayılan | `makers run-cli`, `nym-proxy` paketini içerir. Oturum çevrimdışı başlar; `--online`, `--remember-online` veya `--server` onay verir. |
| Zkool | Kullanımda | Yerel mixnet entegrasyonu. |
| Diğerleri | NymVPN aracılığıyla | Cüzdan trafiğini sistem düzeyindeki Mixnet modundan yönlendirin. |

Cüzdan düzeyindeki yolun kurulum ayrıntıları [Route Zcash Wallet Traffic Over the Nym Mixnet](/guides/nym-mixnet-wallet-setup) sayfasındadır.

## Ödünleşimler

Nym üzerinden yönlendirilen bir yayın, açık internete kıyasla yaklaşık 12,5× daha yavaştır (~3,4 sn). Tor daha hızlıdır (~3,7×), ancak karıştırma yapmayan FIFO akışları kullanır; bu nedenle küresel bir saldırgan bağlantı kurmaya devam edebilir. Paylaşılan Nym kullanıcı tabanını büyütmek, anonimliği ek gecikme eklemekten daha etkili biçimde artırır.

## Uygulama katmanı hijyeni: nym-swizzle-zcash

Ağ katmanı koruması tek başına yeterli değildir. Kusursuz bir mixnet veya VPN kullanılsa bile, hafif istemci sunucusu uygulama katmanı örüntülerini gözlemleyerek oturumları birbirine bağlayabilir:

- Başlangıç noktasını zincirleme: İstemciler senkronizasyona tam olarak `previous end + 1` noktasından devam eder; bu nedenle sunucu oturumları yalnızca blok yüksekliğine bakarak birbirine bağlayabilir.
- Senkronizasyondan sonra gönderme: Cüzdanlar yayın yapmadan hemen önce senkronize olur; bu da sunucunun bir işlemi önceki senkronizasyon oturumuyla ilişkilendirmesine olanak tanır.

[`nym-swizzle-zcash`](https://nym.com/docs/developers/swizzle/zcash) crate’i, bu iki sorunu ele alan Zcash’e özgü bir hijyen politikası uygular. Genel `nym-swizzle` ilkellerini, hafif istemciler için Zincir farkındalığına sahip bir politikada bir araya getirir.

**Nicemlenmiş senkronizasyon aralıkları.** İstekler, gün büyüklüğünde hücreleri olan ağ genelindeki bir ızgaraya genişletilir. Başlangıç aşağı, bitiş yukarı yuvarlanır. Aralıklar deterministik, artan sıralı ve ayrışıktır. Yeniden düzenleme kontrolleri genişletilmiş aralığın içinde kalır; böylece tam devam noktası açığa çıkmaz. Anonimlik gürültüden değil, çakışmadan (birçok cüzdanın aynı sınırları göndermesinden) kaynaklanır.

**Yayından ayrıştırılmış işlemler.** İşlem gönderimleri, ZIP 318 transfer zamanlamasına uygun üstel dağılımla geciktirilir (ortalama 144 blok ≈ 3 saat, üst sınır 576 blok ≈ 12 saat). Gecikmeler tipik süreç ömürlerini aştığından zamanlamalar kalıcı olarak saklanır. İşlem yalnızca gönderim zamanı geldiğinde, güncel bir tepe noktası temel alınarak oluşturulur. Senkronizasyon ve yayın için farklı sunucular kullanılmalıdır.

Crate, `BlockSource` ve `TxBroadcaster` trait’lerini sunar, `wasm32-unknown-unknown` için derlenir ve kendine ait bir ağ yığını yoktur. Tam API ve örnekler için [Nym docs](https://nym.com/docs/developers/swizzle/zcash) sayfasına bakın.

## Kaynaklar

- [How Nym adds anonymity to Zcash wallets](https://nym.com/blog/zcash-mixnet-anonymity) — Nym, 13 Ekim 2026
- [nym-swizzle-zcash: Hygiene Policy for Zcash Light Clients](https://nym.com/docs/developers/swizzle/zcash) — Nym Docs
- [Zingo + Nym](https://zingolabs.org/zingo/blog/zingo-nym/) — Zingo Labs
- [Route Zcash Wallet Traffic Over the Nym Mixnet](/guides/nym-mixnet-wallet-setup) — ZecHub
- [Nym VPN](/guides/nym-vpn) — ZecHub
