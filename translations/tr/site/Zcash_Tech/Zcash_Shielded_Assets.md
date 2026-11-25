<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Zcash_Shielded_Assets.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Sayfayı düzenle"/>
</a>
<a href="">
    <img src="/content-images/image-2023-11-18-160742427-658dda69c0.webp" alt="" width="800" height="500"/>
</a>

# Zcash Korumalı Varlıklar

## Özet

Zcash Korumalı Varlıklar (ZSA), varlıkların **ZEC dışındaki** — stablecoin’ler, yönetişim token’ları veya özel olarak oluşturulmuş herhangi bir varlık — Zcash'in korumalı havuzunda yer almasını sağlayacak önerilen bir protokol uzantısıdır; gönderen, alıcı ve miktar gizli kalır.

- **Nedir:** Varsayılan olarak korumalı ERC-20 tarzı özel varlıklar.
- **Kim geliştiriyor:** [QEDIT](https://qed-it.com/), Zcash Foundation'den alınan bir hibe kapsamında, Electric Coin Company ile iş birliği içinde.
- **Nasıl tanımlanıyor:** [ZIP 226](https://zips.z.cash/zip-0226) (transfer ve yakma) ile [ZIP 227](https://zips.z.cash/zip-0227) (ihrac).
- **Durum:** Ana ağda kullanıma sunulmamıştır ve Ağ Yükseltmesi 7'nin (NU7) parçası değildir. [ZIP 259](https://zips.z.cash/zip-0259), NU7'in kullanıma sunacağı her şeyi listeler; ZIP 226 ve ZIP 227 burada yer almaz ve ZSA için henüz bir etkinleştirme tarihi belirlenmemiştir.
- **Ücretler:** Taşınan varlıktan bağımsız olarak her zaman ZEC cinsinden ödenir.

---

## Temel Açıklama

Zcash Korumalı Varlıklar (ZSA), Zcash protokolü için önerilen bir geliştirmedir ve Zcash Zinciri üzerinde özel varlıkların oluşturulmasını, transferini ve yakılmasını mümkün kılacaktır.

Ethereum blokzincirindeki [ERC-20](https://ethereum.org/en/developers/docs/standards/tokens/erc-20/) token standardına aşinaysanız, ZSA'lar da Zcash için ERC-20 token’larının Ethereum'da yaptığını yapacaktır.

Zcash Korumalı Varlıklar, Zcash blokzincirinde özel token’ların oluşturulmasını sağlayarak [ZEC](/guides/using-zec-privately) dışındaki token’ların da Zcash blokzincirindeki korumalı işlemlerin anonimlik ve gizlilik özelliklerinden yararlanmasına olanak tanıyacaktır.

ZSA'ların önemli bir potansiyel kullanım alanı, Zcash protokolünde stablecoin ihraç etmektir. Stablecoin’ler, değerini ABD doları veya euro gibi itibari bir para birimine sabitleyen kripto para birimleridir. Şu anda en yaygın olarak dolaşımda olan stablecoin’lerden bazıları [USDC](https://www.circle.com/en/usdc) ve [Dai](https://docs.makerdao.com/) gibi ERC-20 token’larıdır.

ZSA'ların bir diğer potansiyel kullanım alanı da yönetişim token’ları ihraç etmektir. Örneğin, ZecHub (bu vikinin yayıncısı) Merkeziyetsiz Otonom Organizasyon (DAO) niteliğindedir ve üyelerine, teklifler ve yönetişim kararları üzerinde oy kullanmaları için bir ZSA oluşturup ihraç edebilir.

ZSA'lar, [Zcash Foundation](/zcash-organizations/zcash-foundation)'den alınan büyük bir hibe kapsamında [QEDIT](https://qed-it.com/) tarafından [Electric Coin Company](/zcash-organizations/electric-coin-company) ile iş birliği içinde geliştirilmektedir. Proje hâlâ etkin biçimde geliştirildiğinden, güncellemeler Zcash forumundaki [bu başlıkta](https://forum.zcashcommunity.com/t/grant-update-zcash-shielded-assets-monthly-updates/41153) yayımlanmaktadır. QEDIT tarafından sunulan [ZSA hibe başvurusu](https://zcashgrants.org/gallery/25215916-53ea-4041-a3b2-6d00c487917d/33106640/), Zcash Foundation hibe web sitesinde bulunmaktadır.

---

## Görsel / Benzetme

### Mühürlü zarf

Zcash korumalı bir işlemi, halka açık bir posta kutusuna bırakılan sade, mühürlü bir zarf gibi düşünün. Herkes bir zarfın postaya verildiğini görebilir. Ancak kimse kimin gönderdiğini, kimin aldığını veya içinde ne olduğunu göremez — üstelik her zarf diğerleriyle tıpatıp aynıdır.

Bugün Zcash ağındaki bir zarf yalnızca tek bir şey taşıyabilir: ZEC.

ZSA zarfı değiştirmez. **İçine ne konulabileceğini** değiştirir. ZSA'dan sonra aynı mühürlü zarf bir stablecoin, bir DAO yönetişim token’ı veya bir şirket sadakat puanı taşıyabilir — dışarıdan bakıldığında ise ağdaki diğer zarflarla tıpatıp aynı görünür.

Aklınızda tutmanız gereken bir ayrıntı var: **Zarfın içindekinden bağımsız olarak posta ücreti her zaman ZEC cinsinden ödenir.**

### Dışarıdan bakan biri ne görebilir?

| Bir gözlemci şunları görebilir... | Ethereum'da ERC-20 | Zcash üzerinde ZSA |
| --- | --- | --- |
| Gönderen | Herkese açık | Korumalı |
| Alıcı | Herkese açık | Korumalı |
| Taşınan miktar | Herkese açık | Korumalı |
| Bireysel bakiyeler | Herkese açık | Korumalı |
| Varlığın toplam arzı | Herkese açık | **Herkese açık — bilerek** |
| Ücretin ödendiği para birimi | ETH | ZEC |

### Arz satırının neden hata olmadığı

Tablonun son iki satırı, ZSA'yı ilginç kılan noktadır.

ZIP 227, her varlığın dolaşımdaki arzının zincir üstünde izlenebilmesi için **ihracın şeffaf olmasını** bilerek sağlar. Bireysel varlıklar ve ödemeler gizli kalır; mevcut token’ların toplam sayısı ise gizli değildir.

Stablecoin ihraççısı için bu birleşim bir ödün değil, tam da amaçlanan şeydir. Rezervler, herkesçe doğrulanabilir bir arz üzerinden denetlenebilirken token’ı fiilen kullanan kişiler bakiyelerini ve ödemelerini kendilerine saklayabilir.

### Her varlığa bir kimlik

Her varlık, ihraççının ihraç anahtarı ile varlığın metinsel açıklamasından türetilen benzersiz bir **Varlık Tanımlayıcısı** alır. İki farklı ihraççı aynı tanımlayıcıyı oluşturamaz ve bir varlığın basılması veya değiştirilmesi için ihraççısının kriptografik yetkilendirmesi gerekir. Zarf benzetmesiyle: Herkes bir zarf postalayabilir, ancak belirli bir varlığa sahip olan basım kuruluşu yalnızca o varlıktan daha fazla basabilir.

---

## Derinlemesine İnceleme

### Zebra üzerinde ZSA demosu

[![Video küçük resmi](/content-images/hqdefault-3ae84de424.webp)](https://youtu.be/1MZMGC9ViyA)

**Demoyu kendiniz çalıştırın!**

zcash-tx-tool deposunu klonlayın: [https://github.com/QED-it/zcash_tx_tool](https://github.com/QED-it/zcash_tx_tool)

### Zcash Geliştirme Önerileri (ZIP'ler)

- [ZIP 226](https://zips.z.cash/zip-0226): Zcash Korumalı Varlıkların Transferi ve Yakılması
- [ZIP 227](https://zips.z.cash/zip-0227): Zcash Korumalı Varlıkların İhracı
- [ZIP 230](https://zips.z.cash/zip-0230): 6. Sürüm İşlem Biçimi

> **ZIP 230 hakkında not:** ZIP 230 daha sonra geri çekilmiştir ve kullanıma sunulmayacaktır. 6. sürüm işlem biçimi artık [ZIP 229](https://zips.z.cash/zip-0229) ile tanımlanmaktadır. [ZIP 230](https://zips.z.cash/zip-0230) sayfasının üst kısmındaki duyuruya bakın.

ZIP 226, özel varlıkların transferini ve yakılmasını sağlayan Orchard protokolünün bir uzantısı olan OrchardZSA protokolünü tanımlar. ZIP 227, bu varlıkların ilk olarak nasıl oluşturulacağını tanımlar ve yalnızca ZIP 226 ile birlikte uygulanmalıdır.

### ZSA Hibe Önerisi

Korumalı Varlıklar (ZSA/UDA) için ZSA önerisi, [QEDIT](https://qed-it.com/) ekibi tarafından Zcash blokzincirinde genel amaçlı korumalı varlıklar oluşturmak üzere sunulmuştur. Bunlara genellikle Kullanıcı Tanımlı Varlıklar (UDA) veya Zcash Korumalı Varlıklar (ZSA) denir.

Bu öneriyle [QEDIT](https://qed-it.com/) ekibi, DeFi'yi Zcash ekosistemine taşımayı ve aynı zamanda mevcut DeFi ekosisteminde en iyi gizlilik teknolojisinin kullanılmasını sağlamayı planlıyor. Bir anketle ekip topluluğa sordu ve topluluk, [genel amaçlı korumalı varlıkların (ZSA/UDA) şu anda en çok talep edilen özellik olduğunu](https://twitter.com/BenarrochDaniel/status/1428327864034791429) belirtti.

Bu öneriler teknik açıdan [Zcash Geliştirme Önerisi (ZIP)](https://zips.z.cash/zip-0000) şartnamesine uygundur ve ZIP 226 ile ZIP 227'de tanımlanmıştır.

1. [ZIP 226](https://zips.z.cash/zip-0226): Zcash Korumalı Varlıkların Transferi ve Yakılması
2. [ZIP 227](https://zips.z.cash/zip-0227): Zcash Korumalı Varlıkların İhracı

---

## Pratik Etkiler

**ZEC tutuyor veya kullanıyorsanız**

- ZSA'lar Orchard'ün (“OrchardZSA”) bir uzantısı olarak tanımlanır; dolayısıyla ZEC'ün zaten kullandığı korumalı altyapıyı paylaşırlar. ZSA'ları tutabilmeniz veya gönderebilmeniz için cüzdanınızın açıkça ZSA desteği sunması gerekir.
- Elinizde her zaman bir miktar ZEC bulundurmanız gerekir. ZSA ihraç etme ve transfer etme ücretleri varlığın kendisiyle değil, ZEC ile ödenir.
- Mevcut ZEC işlemlerinizde hiçbir şey değişmez.

**Potansiyel bir ihraççıysanız — stablecoin, DAO veya şirket**

- Bir varlığın ihracı, ihraç anahtarına bağlı kriptografik yetkilendirme gerektirir; böylece kendi varlığınızı yalnızca siz basabilir veya özelliklerini değiştirebilirsiniz.
- Kullanıcılarınızın bakiyeleri ve transferleri gizli kalırken varlığınızın dolaşımdaki arzı herkesçe denetlenebilir. Düzenlemelere tabi bir ihraççı için genellikle gereken tam olarak bu birleşimdir.
- Tek bir ihraç işlemiyle aynı anda birden fazla varlık oluşturulabilir.

**Ekosistem açısından**

- Her ZSA ücreti ZEC cinsinden belirlendiğinden, Zcash üzerinde ihraç edilen gelecekteki tüm varlıklara ilişkin etkinlik ZEC'e yönelik talep oluşturur.

---

## Sık Yapılan Hatalar

| Yaygın inanış | Gerçekte olan |
| --- | --- |
| “ZSA'lar bugün Zcash üzerinde kullanıma sunulmuştur.” | Hayır. ZSA, [ZIP 259](https://zips.z.cash/zip-0259)'un ZIP 226 veya ZIP 227 olmadan tanımladığı Ağ Yükseltmesi 7'nin (NU7) parçası değildir ve hâlâ inceleme ve test aşamasındadır. |
| “ZSA, Zcash'e akıllı sözleşmeler getirir.” | ZSA, varlıkların ihracını, transferini ve yakılmasını tanımlar. Genel amaçlı, programlanabilir bir sözleşme katmanı değildir. |
| “ZSA ücretlerini ZSA token’ının kendisiyle ödeyebilirsiniz.” | Ücretler ZEC ile ödenir. |
| “Korumalıysa token arzı da gizli olmalıdır.” | ZIP 227, her varlığın arzının herkese açık biçimde izlenebilmesi için ihracı bilerek şeffaf kılar. Bakiyeler ve transferler gizli kalır; arz kalmaz. |
| “ZIP 230, güncel 6. sürüm işlem biçimidir.” | ZIP 230 geri çekilmiştir. 6. sürüm artık ZIP 229 ile tanımlanır. |

---

## İlgili Sayfalar

- [Halo](/zcash-tech/halo) — ZSA'nın genişlettiği protokol olan Orchard'ün arkasındaki kanıt sistemi
- [zk-SNARKs](/zcash-tech/zk-snarks) — korumalı bir transferin açığa çıkarılmadan doğrulanmasını sağlayan sıfır bilgi kanıtları
- [Korumalı Havuzlar](/using-zcash/shielded-pools) — ZSA'ların ZEC ile birlikte yer alacağı havuzlar
- [İşlemler](/using-zcash/transactions) — Bir Zcash işleminin nasıl oluşturulduğu
- [Zebra Tam Düğüm](/zcash-tech/zebra-full-node) — yukarıdaki ZSA demosunda kullanılan düğüm uygulaması
