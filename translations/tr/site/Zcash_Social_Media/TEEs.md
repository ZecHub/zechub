# Sıfırdan Sıfır Bilgiye: Trusted Execution Environments (TEEs)

**Seri:** Sıfırdan Sıfır Bilgiye

Sıfırdan Sıfır Bilgiye yeni bir konuyla geri döndü!  
Bu hafta **Trusted Execution Environments (TEEs)** kavramını inceliyoruz - gizlilik coin'lerinde ve diğer blockchain uygulamalarında nasıl kullanıldıklarını.

![Trusted Execution Environments giriş](https://pbs.twimg.com/media/Fquj-h2WcAIgSnL.jpg)

---

## TEE'ler ve Blockchain'ler: Tamamlayıcı Özellikler

Blockchain'lerin ve TEE'lerin birbirini çok iyi tamamlayan güçlü yönleri vardır:

- **Blockchain'ler** erişilebilirliği, durumun kalıcılığını garanti eder ve tüm durumun kamuya açık şekilde doğrulanmasına imkân tanır - ancak hesaplama güçleri sınırlıdır.  
- **TEE'ler** yoğun hesaplama gerektiren görevleri özel şekilde gerçekleştirebilir - ancak yerleşik durum kalıcılığından yoksundur.

Birlikte güçlü, gizliliği koruyan sistemler oluşturabilirler.

---

## Secret Network: TEE Destekli Gizlilik

**Secret Network**, şifrelenmiş girdiler, çıktılar ve durum üzerinde hesaplama yapmak için TEE teknolojisinden (özellikle Intel SGX) yararlanır.

Her doğrulayıcı düğüm Intel SGX çipleri çalıştırır. Konsensüs ve hesaplama katmanları birleştirilmiştir:

- İşlemler güvenli enclave'lerin içinde işlenir.  
- Veriler yalnızca **TEE içinde** çözülür.

Bu, gizlilik için **zero-knowledge proofs** kullanan Zcash'ten farklıdır. Zcash'te shielded işlemler yayınlanır ve ağın geri kalanına ek veri açıklanmadan herkese açık şekilde doğrulanır. Zcash Shielded Assets de aynı ilkeyi takip eder.

![Secret Network TEE diyagramı](https://pbs.twimg.com/media/FqulPjNX0AEfjRp.png)

TEE'lerin Secret Network üzerinde nasıl uygulandığına dair ayrıntılı bir açıklama için, @l_woetzel tarafından yazılan bu mükemmel makaleyi okuyun:  
https://carter-woetzel.medium.com/secret-network-tees-lets-talk-fud-vulnerability-33ca94b6df38

---

## Secret Network Anahtarları ve Durumu Nasıl Güvenceye Alır

- Ağın **konsensüs şifreleme tohumu**, her doğrulayıcının TEE'si içinde saklanır.  
- Sözleşmeler benzersiz ve taklit edilemez şifreleme anahtarları kullanır.  
- Secret sözleşmeleri Cosmos SDK hesaplama modülü üzerinde çalışır ancak şifrelenmiş girdileri/çıktıları ve durumu destekler.

---

## Remote Attestation

**Remote Attestation**, bir enclave'in gerçek ve güvenli bir donanım ortamında çalıştığını kanıtlama sürecidir.

Uzak bir tarafın şunları doğrulamasına olanak tanır:
- Doğru uygulamanın çalıştığını  
- Uygulamanın kurcalanmadığını  
- Intel SGX enclave'i içinde güvenli şekilde yürütüldüğünü

![Remote Attestation açıklaması](https://pbs.twimg.com/media/FqumRjoWwAAeT-M.png)

Enclave'ler ayrıca dışarıdan erişilemeyen özel imzalama ve attestation anahtarları da içerir.

![Enclave anahtar koruması](https://pbs.twimg.com/media/Fqumv83XoAQq-MO.png)

---

## Data Sealing

Enclave'ler durumsuz olduğu için, verilerin bazen dışarıda, güvenilmeyen bellekte saklanması gerekir.  

**Data Sealing**, enclave içindeki verileri CPU'dan türetilen bir anahtar kullanarak şifreler. Şifrelenmiş blok yalnızca **aynı sistemde** yeniden açılabilir.

![Data Sealing diyagramı](https://pbs.twimg.com/media/FqunBwyWYAA-TR3.jpg)

---

## Oasis Network

**Oasis Network** de gizli ParaTime'ı (ör. Sapphire ve Cipher) aracılığıyla TEE'leri kullanır.

Şifrelenmiş veriler akıllı sözleşmeyle birlikte TEE'ye girer. Enclave'den çıkmadan önce çözülür, işlenir ve yeniden şifrelenir.

![Oasis Network TEE akışı](https://pbs.twimg.com/media/FqunJRDXwAMt4Ob.png)

---

## Proof-of-Stake Ağlarında TEE'ler

Birçok Proof-of-Stake blockchain'i (Secret ve Oasis dahil) konsensüs çerçevesi olarak **Tendermint** kullanır.

PoS doğrulayıcıları için:
- Anahtarlar güvenli şekilde yönetilmeli ve asla düz metin olarak açığa çıkmamalıdır.  
- Doğrulayıcılar çevrimiçi kalmalıdır (kesinti cezaları uygulanır).  
- Çelişkili mesajları imzalamak slashing ile sonuçlanabilir.

**TEE'ler**, doğrulayıcı anahtarlarını güvenli şekilde üretmek ve kullanmak için idealdir.

![Tendermint ve PoS güvenliği](https://pbs.twimg.com/media/Fqun0HEX0AAooxW.jpg)

---

## Zcash ve Proof-of-Stake Araştırması

Zcash, Proof-of-Stake'e geçişi aktif olarak araştırıyor.

- Araştırmayı okuyun: https://electriccoin.co/blog/zcash-proof-of-stake-research/  
- Farklı PoS tasarımlarını ve bunların gizlilik üzerindeki etkilerini açıklayan bu Zcash Foundation Community Call bölümünü izleyin:
  
<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/22a-ROcb3AQ"
    title="PoS tasarımları"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>

---

**ZecHub (@ZecHub) tarafından hazırlanan orijinal konu dizisi**  
https://x.com/ZecHub/status/1633579659282587651

---

*Bu sayfa, ZecHub wiki'si için orijinal Sıfırdan Sıfır Bilgiye konu dizisinden derlenmiştir.*
