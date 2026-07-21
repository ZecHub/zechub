<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Zcash_Shielded_Assets.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Sayfayı Düzenle"/>
</a>
<a href="">
    <img src="https://i.ibb.co/0VfMFB5/image-2023-11-18-160742427.png" alt="" width="800" height="500"/>
</a>

# Zcash Shielded Assets

Zcash Shielded Assets (ZSA), Zcash zincirinde özel varlıkların oluşturulmasını, transfer edilmesini ve yakılmasını mümkün kılacak şekilde Zcash protokolü için önerilen bir iyileştirmedir.

Ethereum blokzincirindeki [ERC-20](https://ethereum.org/en/developers/docs/standards/tokens/erc-20/) token standardına aşinaysanız, ZSA'lar Zcash için neyse ERC-20 tokenları da Ethereum için odur.

Zcash Shielded Assets, Zcash blokzinciri üzerinde özel tokenların oluşturulmasını mümkün kılacak ve böylece [ZEC](https://wiki.zechub.xyz/using-zec-privately) dışındaki tokenların da Zcash blokzincirindeki shielded işlemlerin anonimlik ve gizliliğinden faydalanmasına olanak tanıyacaktır.

ZSA'ların başlıca potansiyel kullanım alanlarından biri, Zcash protokolü üzerinde stablecoin ihraç edilmesi olacaktır. Stablecoin'ler, değerini ABD Doları veya Euro gibi itibari bir para birimine sabitleyen kripto paralardır. Günümüzde en yaygın dolaşımdaki stablecoin'lerden bazıları, [USDC](https://www.circle.com/en/usdc) ve [Dai](https://docs.makerdao.com/) gibi ERC-20 tokenlarıdır.

ZSA'ların bir başka potansiyel kullanım alanı ise yönetişim tokenlarının ihraç edilmesi olacaktır. Örneğin, Zechub (bu vikinin yayıncısı) Merkeziyetsiz Otonom Bir Organizasyondur (DAO) ve tekliflere ve yönetişim kararlarına oy vermek amacıyla üyelerine bir ZSA oluşturup dağıtabilir.

ZSAs, [QEDIT](https://qed-it.com/) tarafından, [Zcash Foundation](https://wiki.zechub.xyz/zcash-foundation) tarafından sağlanan büyük bir hibe kapsamında ve [Electric Coin Company](https://wiki.zechub.xyz/electric-coin-company) ile iş birliği içinde geliştirilmektedir. Bu proje hâlâ aktif olarak geliştirildiği için güncellemeler Zcash forumundaki [bu başlıkta](https://forum.zcashcommunity.com/t/grant-update-zcash-shielded-assets-monthly-updates/41153) paylaşılmaktadır. QEDIT tarafından yapılan [ZSA hibe başvurusu](https://zcashgrants.org/gallery/25215916-53ea-4041-a3b2-6d00c487917d/33106640/), Zcash Foundation hibe sitesinde mevcuttur.


### Zebra üzerinde ZSA Demosu 


[![Video Küçük Resmi](https://i.ytimg.com/vi/1MZMGC9ViyA/hqdefault.jpg?)](https://youtu.be/1MZMGC9ViyA)


**Demoyu kendiniz çalıştırın!** 

zcash-tx-tool deposunu klonlayın:
[https://github.com/QED-it/zcash_tx_tool](https://github.com/QED-it/zcash_tx_tool)


___

## Zcash Improvement Proposals (ZIPs)

[ZIP 226](https://zips.z.cash/zip-0226): Zcash Shielded Assets Transferi ve Yakımı
[ZIP 227](https://zips.z.cash/zip-0227): Zcash Shielded Assets İhracı
[ZIP 230](https://zips.z.cash/zip-0230): Sürüm 6 İşlem Formatı


## ZSA Hibe Teklifi

Shielded Assets (ZSA/UDA) için ZSA teklifi, Zcash blokzinciri üzerinde genel amaçlı shielded varlıklar oluşturmak amacıyla [QEDIT](https://qed-it.com/) ekibi tarafından sunuldu. Bunlar genellikle User Defined Assets (UDA) veya Zcash Shielded Assets (ZSA) olarak anılır.

Bu teklifle birlikte [QEDIT](https://qed-it.com/) ekibi, Zcash ekosistemine DeFi getirmeyi ve aynı zamanda ekip tarafından sorulan ve topluluğun yanıtladığı bir anket bağlamında mevcut DeFi ekosistemi içinde en iyi gizlilik teknolojisinin kullanımını mümkün kılmayı planlıyor: [genel amaçlı shielded varlıklar (ZSA/UDA) şu anda en çok talep edilen özelliktir](https://twitter.com/BenarrochDaniel/status/1428327864034791429)

Bu teklifler, teknik olarak [Zcash Improvement Proposal (ZIP)](https://zips.z.cash/zip-0000) spesifikasyonuna uygundur ve ZIP 226 ile ZIP 227'de tanımlanmıştır.

1. [ZIP 226](https://qed-it.github.io/zips/zip-0226): Zcash Shielded Assets Transferi ve Yakımı
2. [ZIP 227](https://qed-it.github.io/zips/zip-0227): Zcash Shielded Assets İhracı
