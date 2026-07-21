# ZAP1 Tasdik Protokolü

ZAP1, Zcash için açık kaynaklı bir tasdik protokolüdür. Yapılandırılmış yaşam döngüsü olaylarını bir BLAKE2b Merkle ağacına yazar ve ağaç kökünü Orchard shielded memo’ları aracılığıyla zincir üzerine sabitler. Kanıtlar herkes tarafından doğrulanabilir. Olay verileri gizli kalır.

## Nasıl çalışır

Operatörler olay türlerini (dağıtımlar, ödemeler, transferler vb.) kaydeder ve bunları bir ZAP1 örneğine gönderir. Her olay, alan ayrımlı BLAKE2b-256 kullanarak bir yaprak hash’i üretir. Yapraklar bir Merkle ağacında birikir. Bir eşik değere ulaşıldığında, ağaç kökü bir ZAP1:09 memo’su olarak kodlanır ve shielded bir işlemde Zcash’e sabitlenir.

Bir yaprak hash’ine sahip olan herkes, operatöre güvenmek zorunda kalmadan, yapraktan köke ve oradan zincir üzerindeki sabitlemeye kadar olan tam yolu doğrulayabilir.

## Temel özellikler

- **Uygulamadan bağımsız**: herhangi bir Zcash operatörü kendi olay türlerini ve kişiselleştirme dizelerini tanımlayabilir
- **Gizliliği koruyan**: olay yükleri sabitlenmeden önce hash’lenir. Zincire yalnızca hash’ler yazılır.
- **Bağımsız olarak doğrulanabilir**: doğrulama için yalnızca kanıt paketi ve zincire erişim gerekir. Operatöre güven gerekmez.
- **ZIP 302 uyumlu**: ZAP1, tasdik yükü için bir ZIP 302 partType’a doğru yakınsamaktadır

## Var olanlar

- Referans uygulama (Rust, MIT lisanslı)
- crates.io üzerinde Doğrulama SDK’sı (Rust + 83KB WASM)
- npm üzerinde JavaScript SDK’sı
- Evrensel memo çözücü (ZAP1, ZIP 302 TVLV, metin, ikili ve boş memo’ları tanımlar)
- 29 API kontrolü ve 14 protokol kontrolü içeren uyumluluk kiti
- Çok taraflı anchor yayını için FROST 2-of-3 eşik imzalama tasarımı
- İnceleme altında olan ZIP taslak PR #1243
- Mart 2026 itibarıyla 14 yaprak içeren 4 mainnet anchor’ı

## Mimari

```
Your app  -->  ZAP1 API  -->  Merkle tree  -->  Zcash anchor
                  |                                    |
             event types                         shielded memo
          (DEPLOYMENT, etc)                    (ZAP1:09:{root})
```

Her operatör kendi anahtarları, Merkle ağacı ve anchor’larıyla kendi ZAP1 örneğini çalıştırır. Operatörler arasında paylaşılan durum yoktur.

## Daha fazlasını nereden öğrenebilirsiniz

- Kaynak kod: [github.com/Frontier-Compute/zap1](https://github.com/Frontier-Compute/zap1)
- Doğrulama SDK’sı: [crates.io/crates/zap1-verify](https://crates.io/crates/zap1-verify)
- Memo çözücü: [crates.io/crates/zcash-memo-decode](https://crates.io/crates/zcash-memo-decode)
- Protokol spesifikasyonu: [ONCHAIN_PROTOCOL.md](https://github.com/Frontier-Compute/zap1/blob/main/ONCHAIN_PROTOCOL.md)
- ZIP taslağı: [PR #1243](https://github.com/zcash/zips/pull/1243)
- Canlı API: [pay.frontiercompute.io/protocol/info](https://pay.frontiercompute.io/protocol/info)
- Operatör rehberi: [frontiercompute.io/operators.html](https://frontiercompute.io/operators.html)
