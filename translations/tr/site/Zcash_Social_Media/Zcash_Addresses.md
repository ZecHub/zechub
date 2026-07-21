# Sıfırdan Sıfır Bilgiye: Transparent vs Shielded İşlemler ve Unified Address

**Seri:** Sıfırdan Sıfır Bilgiye

Zcash hakkında ilk kez bilgi ediniyorsanız, kullanılabilen iki tür işlem olduğunu göreceksiniz: **Transparent** ve **Shielded**.  

Bugün bunları öğrenecek ve #Zcash ekosistemindeki yeni özelliklerden biri olan **Unified Address** konusunu ele alacağız.

---

## Transparent vs Shielded İşlemler

- **Transparent İşlemler** **t-addresses** kullanır (Base58 kodlu). Her şey herkese açık şekilde görünür - tıpkı Bitcoin gibi.  
- **Shielded İşlemler** **Sapling** veya **Orchard** havuzları için kodlanmış adresleri kullanır. Bunlar, sıfır bilgi ispatları kullanarak göndereni, alıcıyı ve miktarı gizler.

**Shielded Transaction**, Sapling/Orchard havuzları için kodlanmış adresler içeren her türlü işlemi ifade eder.

![Transparent vs Shielded intro](https://pbs.twimg.com/media/FpmW00HWIAIZpQD.jpg)

**Unified Addresses (UA'lar)**, shielded veya transparent işlemleri tek bir adres altında **birleştirmek** için tasarlanmıştır.

---

## Zcash'teki Adres Türleri

Kullanımda olan 3 adres türü vardır:

1. **(T) Transparent** – Base58  
2. **(Z) Sapling** – Bech32  
3. **(UA) Unified Address** – Bech32m  

Karakter sayısı (ve dolayısıyla QR kod boyutu) her türde artar.

![Address types comparison](https://pbs.twimg.com/media/FpmXe5bXsAEFeLY.png)

![QR code size comparison](https://pbs.twimg.com/media/FpmXmDwXoAIWxov.png)

---

## Unified Address Nasıl Çalışır

Adresler ve anahtarlar bir bayt dizisi olarak kodlanır (**Raw Encoding**).  
Bir **Receiver Encoding**, belirli bir protokol kullanarak bir varlığı transfer etmek için gerekli tüm bilgileri içerir.

Bir Unified Address'in raw encoding'i, alıcıların encoding'lerinin (typecode, length, addr) birleşimidir:

- UA: `0x03`  
- Sapling: `0x02`  
- Transparent: `0x01`  

**Önemli**: Her UA içinde **en az bir shielded ödeme adresi** bulunmalıdır. (Sprout adresleri, Canopy yükseltmesinden sonra artık desteklenmiyor.)

![UA encoding structure](https://pbs.twimg.com/media/FpmYW1ZXgAAvALT.png)

Tam spesifikasyon: **[ZIP-316: Unified Addresses](https://zips.z.cash/zip-0316)**

---

## Unified Address'in Faydaları

- **Borsalar için daha kolay** - Artık shielded yatırma/çekme işlemlerini daha güvenli şekilde destekleyebilirler.  
- **Geleceğe dayanıklı** - Yeni shielded havuzlar, cüzdanları bozmadan eklenebilir.  
- **Varsayılan olarak Shielded** - Her UA en az bir shielded adres içerir, bu nedenle gizlilik her zaman kullanılabilir.

Bu, daha fazla ZEC'in shielded havuza taşınmasına şimdiden yardımcı olan temel bir değişimdir.

---

## Orchard İşlemleri ve Actions

Orchard, **Actions** adı verilen yeni bir kavramı tanıttı:

- Bir işlemdeki tüm Actions için **tek bir anchor** kullanarak metadata sızıntısını azaltırlar.  
- (V4) Spend + Output alanlarını tek bir değer taahhüdünde birleştirirler.  
- Bu, Halo2 ispat sisteminde performans optimizasyonlarını mümkün kılar.

Daira, Anchor konumlarını açıklıyor (zcon3):

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/f6UToqiIdeY"
    title="Zcon3"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>

---

## Value Balance ve Gizlilik

Bazı durumlarda (ör. havuzlar arası işlemler) miktarlar dışarıdan bir gözlemci tarafından görülebilir. Ancak `valueBalanceSapling` ve `valueBalanceOrchard`, shielded havuzlardaki toplam ZEC'i kanıtlamak ve sahteciliği önlemek için **homomorphic commitments** kullanır.

Daha fazlasını okuyun: [Shielded Havuzlarda Sahteciliğe Karşı Savunma](https://electriccoin.co/blog/defense-against-counterfeiting-in-shielded-pools/)

---

## Gelecekteki İyileştirmeler

ECC ekibi, `zcashd` içinde (`z_sendmany` yerine geçecek) yeni RPC yöntemleri üzerinde çalışıyor; bunlar, kullanıcıların önerilen bir işlemi gizlilik özelliklerine göre önizlemesine ve kabul/reddetmesine olanak tanıyacak.

---

## Tavsiye

**YWallet**'ın en son sürümünü deneyin!  
Gönder tuşuna basmadan önce ekranda zaten bir "Transaction Plan" gösteriyor; bu da daha gizli seçimler yapmanıza yardımcı oluyor.

İşlem gizliliği üzerine harika makale: https://medium.com/@hanh.huynh/

---

**ZecHub (@ZecHub) tarafından hazırlanan orijinal flood**  
https://x.com/ZecHub/status/1628498645627666432

---

*Bu sayfa, ZecHub wiki için orijinal Sıfırdan Sıfır Bilgiye flood'undan derlenmiştir.*
