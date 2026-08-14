<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Zcash_Shielded_Assets.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Sayfayı Düzenle"/>
</a>
<a href="">
    <img src="/content-images/image-2023-11-18-160742427-658dda69c0.webp" alt="" width="800" height="500"/>
</a>

# Zcash Shielded Assets

## Kısaca

Zcash Shielded Assets (ZSA), **ZEC dışındaki** varlıkların — stablecoin'ler, yönetişim token'ları veya herhangi bir özel varlık — Zcash'in shielded havuzu içinde yer almasını sağlayacak, göndericinin, alıcının ve miktarın gizli tutulduğu önerilen bir protokol uzantısıdır.

- **Nedir:** ERC-20 tarzı özel varlıklar, ancak varsayılan olarak shielded.
- **Kim geliştiriyor:** [QEDIT](https://qed-it.com/), Zcash Foundation hibesi kapsamında, Electric Coin Company ile iş birliği içinde.
- **Nasıl tanımlanıyor:** [ZIP 226](https://zips.z.cash/zip-0226) (transfer ve burn) ile birlikte [ZIP 227](https://zips.z.cash/zip-0227) (ihraç).
- **Durum:** mainnet'te aktif değil. ZSA protokolünün Network Upgrade 7 (NU7) içinde devreye alınması planlanıyor.
- **Ücretler:** taşınan varlık ne olursa olsun her zaman ZEC ile ödenir.

---

## Temel Açıklama

Zcash Shielded Assets (ZSA), Zcash protokolüne önerilen ve Zcash zinciri üzerinde özel varlıkların oluşturulmasını, transfer edilmesini ve burn edilmesini mümkün kılacak bir iyileştirmedir.

Eğer Ethereum blokzincirindeki [ERC-20](https://ethereum.org/en/developers/docs/standards/tokens/erc-20/) token standardına aşinaysanız, ZSA'lar Zcash için neyse ERC-20 token'ları da Ethereum için odur.

Zcash Shielded Assets, Zcash blokzinciri üzerinde özel token'ların oluşturulmasını mümkün kılarak [ZEC](/guides/using-zec-privately) dışındaki token'ların da Zcash blokzincirindeki shielded işlemlerin anonimliğinden ve gizliliğinden faydalanmasına olanak tanıyacaktır.

ZSA'ların başlıca potansiyel kullanım alanlarından biri, Zcash protokolü üzerinde stablecoin ihraç etmektir. Stablecoin'ler, değerini ABD Doları veya Euro gibi itibari para birimlerine sabitleyen kripto paralardır. Günümüzde en yaygın dolaşımdaki stablecoin'lerin bazıları [USDC](https://www.circle.com/en/usdc) ve [Dai](https://docs.makerdao.com/) gibi ERC-20 token'larıdır.

ZSA'ların bir başka potansiyel kullanım alanı ise yönetişim token'larının ihraç edilmesidir. Örneğin, Zechub (bu wiki'nin yayıncısı) bir Decentralized Autonomous Organization (DAO)'dur ve tekliflerle yönetişim kararlarında oylama yapmak üzere üyelerine bir ZSA oluşturup ihraç edebilir.

ZSA'lar, [QEDIT](https://qed-it.com/) tarafından, [Zcash Foundation](/zcash-organizations/zcash-foundation) tarafından sağlanan büyük bir hibe kapsamında, [Electric Coin Company](/zcash-organizations/electric-coin-company) ile iş birliği içinde geliştirilmektedir. Bu proje hâlen aktif olarak geliştirildiği için güncellemeler Zcash forumundaki [bu başlıkta](https://forum.zcashcommunity.com/t/grant-update-zcash-shielded-assets-monthly-updates/41153) paylaşılmaktadır. QEDIT tarafından yapılan [ZSA hibe başvurusu](https://zcashgrants.org/gallery/25215916-53ea-4041-a3b2-6d00c487917d/33106640/) Zcash Foundation hibe sitesinde mevcuttur.

---

## Görsel / Analoji

### Mühürlü zarf

Bir Zcash shielded işlemini, herkese açık bir posta kutusuna bırakılmış sade, mühürlü bir zarf olarak düşünün. Herkes bir zarfın postalandığını görebilir. Kimsenin onu kimin gönderdiğini, kimin aldığını ya da içinde ne olduğunu görmesi mümkün değildir — ve her zarf diğerlerinin hepsiyle tamamen aynı görünür.

Bugün Zcash ağındaki bir zarf yalnızca tek bir şey taşıyabilir: ZEC.

ZSA zarfı değiştirmez. **İçine ne konulmasına izin verildiğini** değiştirir. ZSA sonrasında aynı mühürlü zarf bir stablecoin, bir DAO yönetişim token'ı veya bir şirket sadakat puanı taşıyabilir — ve dışarıdan bakıldığında yine ağdaki diğer tüm zarflarla tamamen aynı görünür.

Aklınızda tutmaya değer bir ayrıntı var: **posta ücreti her zaman ZEC ile ödenir**, zarfın içinde ne olursa olsun.

### Dışarıdan bir gözlemci ne görebilir

| Bir gözlemci şunları görebilir... | Ethereum üzerindeki ERC-20 | Zcash üzerindeki ZSA |
| --- | --- | --- |
| Kimin gönderdiğini | Herkese açık | Shielded |
| Kimin aldığını | Herkese açık | Shielded |
| Ne kadar taşındığını | Herkese açık | Shielded |
| Bireysel bakiyeler | Herkese açık | Shielded |
| Varlığın toplam arzı | Herkese açık | **Herkese açık — bilinçli olarak** |
| Ücretin hangi para birimiyle ödendiği | ETH | ZEC |

### Arz satırı neden bir hata değil

Tablonun en alt iki satırı, ZSA'nın ilginçleştiği yerdir.

ZIP 227, her varlığın dolaşımdaki arzının zincir üzerinde takip edilebilmesi için **ihracı bilerek şeffaf** tutar. Bireysel varlıklar ve bireysel ödemeler gizli kalır; var olan toplam token sayısı gizli kalmaz.

Bir stablecoin ihraççısı için bu birleşim bir taviz değil, tam da amacın kendisidir. Rezervler, kamuya açık şekilde doğrulanabilir bir arzla denetlenebilirken, token'ı fiilen kullanan kişiler bakiyelerini ve ödemelerini kendilerine saklar.

### Tek varlık, tek kimlik

Her varlık, ihraççının issuance key'i ile varlığın metinsel açıklamasından türetilen benzersiz bir **Asset Identifier** alır. İki farklı ihraççı aynı tanımlayıcıyı üretemez ve bir varlığı mint etmek ya da değiştirmek, ihraççısından kriptografik yetkilendirme gerektirir. Zarf benzetmesiyle: herkes bir zarf postalayabilir, ancak yalnızca belirli bir varlığa sahip olan darphane ondan daha fazlasını basabilir.

---

## Derinlemesine İnceleme

### Zebra üzerinde ZSA demosu

[![Video Küçük Görseli](/content-images/hqdefault-3ae84de424.webp)](https://youtu.be/1MZMGC9ViyA)

**Demoyu kendiniz çalıştırın!**

zcash-tx-tool deposunu klonlayın: <https://github.com/QED-it/zcash_tx_tool>

### Zcash Improvement Proposal'lar (ZIP'ler)

- [ZIP 226](https://zips.z.cash/zip-0226): Zcash Shielded Assets'in Transferi ve Burn Edilmesi
- [ZIP 227](https://zips.z.cash/zip-0227): Zcash Shielded Assets'in İhracı
- [ZIP 230](https://zips.z.cash/zip-0230): Sürüm 6 İşlem Formatı

> **ZIP 230 hakkında not:** ZIP 230 daha sonra geri çekilmiştir ve devreye alınmayacaktır. İşlem sürüm 6 artık [ZIP 229](https://zips.z.cash/zip-0229) tarafından tanımlanmaktadır. Ayrıntılar için [ZIP 230](https://zips.z.cash/zip-0230) sayfasının üst kısmındaki duyuruya bakın.

ZIP 226, özel varlıkların transferini ve burn edilmesini taşıyan Orchard protokolünün bir uzantısı olan OrchardZSA protokolünü tanımlar. ZIP 227 ise bu varlıkların ilk etapta nasıl oluşturulduğunu tanımlar ve yalnızca ZIP 226 ile birlikte uygulanmalıdır.

### ZSA Hibe Teklifi

Shielded Assets (ZSA/UDA) için ZSA teklifi, Zcash blokzinciri üzerinde genel amaçlı shielded varlıklar inşa etmek üzere [QEDIT](https://qed-it.com/) ekibi tarafından sunulmuştur. Bunlar genellikle User Defined Assets (UDA) veya Zcash Shielded Assets (ZSA) olarak anılır.

Bu teklifle [QEDIT](https://qed-it.com/) ekibi, DeFi'ı Zcash ekosistemine getirmeyi ve aynı zamanda mevcut DeFi ekosistemi içinde en iyi gizlilik teknolojisinin kullanımını mümkün kılmayı planlamaktadır. Bir anket çalışmasında ekip sordu ve topluluk da [genel amaçlı shielded varlıkların (ZSA/UDA) şu anda en çok talep edilen özellik olduğunu](https://twitter.com/BenarrochDaniel/status/1428327864034791429) söyledi.

Bu teklifler teknik olarak [Zcash Improvement Proposal (ZIP)](https://zips.z.cash/zip-0000) spesifikasyonuna uygundur ve ZIP 226 ile ZIP 227'de tanımlanmıştır.

1. [ZIP 226](https://zips.z.cash/zip-0226): Zcash Shielded Assets'in Transferi ve Burn Edilmesi
2. [ZIP 227](https://zips.z.cash/zip-0227): Zcash Shielded Assets'in İhracı

---

## Pratik Sonuçlar

**Eğer ZEC tutuyor veya kullanıyorsanız**

- ZSA'lar Orchard'ın bir uzantısı ("OrchardZSA") olarak tanımlanmıştır; bu nedenle ZEC'in hâlihazırda kullandığı shielded altyapıyı paylaşırlar. Cüzdanınızın, bunları tutabilmesi veya gönderebilmesi için açıkça ZSA desteğine sahip olması gerekir.
- Her zaman elinizin altında biraz ZEC bulundurmanız gerekir. Bir ZSA'nın ihraç ve transfer ücretleri, varlığın kendisiyle değil ZEC ile ödenir.
- Mevcut ZEC işlemlerinizle ilgili hiçbir şey değişmez.

**Potansiyel bir ihraççıysanız — bir stablecoin, bir DAO, bir şirket**

- Bir varlığın ihraç edilmesi, issuance key'e bağlı kriptografik yetkilendirme gerektirir; dolayısıyla yalnızca siz kendi varlığınızı mint edebilir veya özelliklerini değiştirebilirsiniz.
- Kullanıcılarınızın bakiyeleri ve transferleri herkese açık değilken varlığınızın dolaşımdaki arzı kamuya açık şekilde denetlenebilir. Düzenlemeye tabi bir ihraççı için genellikle tam olarak gereken kombinasyon budur.
- Tek bir ihraç işlemi aynı anda birden fazla varlık oluşturabilir.

**Ekosistem için**

- Her ZSA ücreti ZEC cinsinden belirlendiği için, Zcash üzerinde gelecekte ihraç edilecek herhangi bir varlıktaki faaliyet, ZEC'in kendisine de talep yaratır.

---

## Yaygın Hatalar

| Yaygın inanış | Gerçekte durum nedir |
| --- | --- |
| "ZSA'lar bugün Zcash üzerinde aktif." | Hayır. ZSA'nın Network Upgrade 7 (NU7) içinde devreye alınması planlanmaktadır ve hâlâ inceleme ile test aşamasındadır. |
| "ZSA, Zcash'e akıllı sözleşmeler getiriyor." | ZSA, varlıkların ihraç edilmesini, transfer edilmesini ve burn edilmesini tanımlar. Genel amaçlı, programlanabilir bir sözleşme katmanı değildir. |
| "ZSA ücretlerini ZSA token'ının kendisiyle ödeyebilirsiniz." | Ücretler ZEC ile ödenir. |
| "Shielded ise token arzı da gizli olmalı." | ZIP 227, her varlığın arzının kamuya açık şekilde takip edilebilmesi için ihracı bilerek şeffaf kılar. Bakiyeler ve transferler gizli kalır; arz gizli kalmaz. |
| "ZIP 230, güncel sürüm 6 işlem formatıdır." | ZIP 230 geri çekilmiştir. Sürüm 6 artık ZIP 229 tarafından tanımlanmaktadır. |

---

## İlgili Sayfalar

- [Halo](/zcash-tech/halo) — ZSA'nın genişlettiği protokol olan Orchard'ın arkasındaki ispat sistemi
- [Zk-SNARKs](/zcash-tech/zk-snarks) — bir shielded transferin ifşa edilmeden doğrulanmasını sağlayan zero-knowledge ispatları
- [Shielded Pools](/using-zcash/shielded-pools) — ZSA'ların ZEC ile birlikte bulunacağı yer
- [Transactions](/using-zcash/transactions) — bir Zcash işleminin nasıl oluşturulduğu
- [Zebra Full Node](/zcash-tech/zebra-full-node) — yukarıdaki ZSA demosunda kullanılan düğüm uygulaması
