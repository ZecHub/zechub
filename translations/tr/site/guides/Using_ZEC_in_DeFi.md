<a href="https://github.com/zechub/zechub/edit/main/site/guides/Using_ZEC_in_DeFi.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Sayfayı Düzenle"/>
</a>

# DeFi'de Zcash Kullanımı


## Near Intents 

Zcash ve NEAR Intents entegre edildi; bu sayede kullanıcılar herhangi bir ücret ödemeden Zcash (ZEC) ile Bitcoin, Solana, NEAR ve XRP dahil diğer önde gelen altcoin'ler arasında takas yapabiliyor. Bu entegrasyon, NEAR Protocol'ün otonom ve doğrulanabilir yapay zekâ botlarından oluşan bir altyapı oluşturma çabalarının bir parçasıdır ve aynı zamanda yapay zekâ destekli ödeme kanallarını mümkün kılarak Zcash'e de fayda sağlar. Zcash kullanıcıları artık [Near Intents](https://app.near-intents.org) aracılığıyla gizliliklerini korurken akıllı sözleşmelere ve daha geniş [DeFi uygulamalarına](https://nym.com/blog/what-is-defi) erişebilmektedir.

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/mKVvXY4yjjA"
    title="Zcash x NEAR Intents ile Zincirler Arası Takaslar"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>

---

## Maya Protocol 

Maya Protocol, merkeziyetsizliğini, likiditesini ve işlem gizliliğini artırmak için Zcash'i entegre etti. Bu entegrasyon, Zcash kullanıcılarının gizliliği korurken merkeziyetsiz takaslardan faydalanmasına olanak tanır ve onlara daha fazla esneklik ile likidite sağlar. Daha fazla bilgi: [https://www.mayaprotocol.com/blog-maya-academy/zcash-integrates-maya](https://www.mayaprotocol.com/blog-maya-academy/zcash-integrates-maya)


<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/f1k6xhNfTV8"
    title="LeoDex'te Ethereum Zcash'e Nasıl Takas Edilir"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>


**Not**: Halihazırda sahip olduğunuz herhangi bir ETH'yi, "Release" sekmesini kullanıp Transparent adresinizi girerek özel depolamaya Shielded Zcash olarak aktarmak da mümkündür. Ardından mobil/masaüstü cüzdanınızdaki 'Autoshield' özelliğini kullanabilirsiniz. Bu uygulamanın gizli kalması için ZEC > ETH ve ardından ETH > ZEC şeklinde takas yapılmaması tavsiye edilir. 

---

## Zcash DeFi çevresindeki yenilikler 

**Katman 1 Çözümü**

Şu anda mevcut Katman 1 kullanılarak Zcash ekosistemi içinde DeFi uygulamalarını mümkün kılacak seçenekler araştırılmaktadır. Bu, sözleşme işlemlerinin çoğunu bir sequencer ile zincir dışında gerçekleştirip bu eylemlerin doğrulamasını zincir üzerinde yaparak mümkün olabilir. Bunun bir versiyonu, JP Morgan ile ortaklaşa onların kurumsal blockchain'i üzerinde oluşturulmuştu. NU5 itibarıyla, Zcash'e bu tür bir uzantı eklemek için bir mekanizma (TZE) mevcuttur. 

**zkEVM**

Bu, sıfır bilgi ispatı hesaplamasını destekleyen EVM uyumlu bir sanal makine ile Zcash'e yerel programlanabilirlik kazandıracaktır. Bu sayede Zcash, daha çeşitli bir geliştirici topluluğu aracılığıyla büyüme yakalayabilir ve gizliliği koruyan uygulamalar ile token'lardan oluşan bir ekosistemi teşvik edebilir. Bu da onu mevcut diğer L2 gizlilik çözümleriyle karşılaştırılabilir hâle getirir. 

Proof-of-Stake ve Cosmos Interblockchain Communication Protocol üzerine süren araştırmalar ECC tarafından yürütülmektedir. Ortaya çıkabilecek olası sorunlarla birlikte Ethereum'un PoS'a geçişinin başarısı da dikkate alınarak sonraki adımlar değerlendirilmektedir. 

**ZSA/UDA'lar**

Zcash Shielded Assets / User Defined Assets, bu işe adanmış bir ekibin desteğiyle geliştirilmekteydi. NU5 protokol yükseltmesinin ardından somutlaşmaya önemli ölçüde daha yaklaştılar. Bu varlıkların birlikte çalışabilirliğini mümkün kılan, güven gerektirmeyen ve özel zincirler arası köprüleme mekanizmaları şu anda geliştirilme aşamasındadır. Aşağıda bununla ilgili Zcon3 sunumunun bağlantısı yer almaktadır. 


### Kaynaklar:

[Zcon3 Özel Zincirler Arası Transferler](https://youtu.be/vCvMk2-CJN8)

[DeFi üzerine Zcon3 QEDIT Sunumu](https://youtu.be/EGjcYhovty0) / [Çizim Tahtası](https://miro.com/app/board/uXjVOhuveHo=/)

[ZSA'lar ve Stablecoin'ler üzerine Ian Miers](https://www.youtube.com/watch?v=hJMWE3zLIcs)

[Proof-of-Stake Araştırması](https://electriccoin.co/blog/proof-of-stake-research-overview-1/)

__

Zcash'in mevcut diğer akıllı sözleşme platformlarına karşı tartışmasız avantajı, yerel olarak gizli Katman 1'e sahip olmasıdır. Bu, herhangi bir Katman 2 uygulaması kullanılırken bilgi sızıntısı olasılığını tamamen ortadan kaldırır. Böylece bilgiye erişimi izinlendirmeyi çok daha kolay hâle getiren, temelde daha basit ve daha güvenli bir uygulama katmanı sağlar.
