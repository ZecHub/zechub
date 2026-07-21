<a href="https://github.com/zechub/zechub/edit/main/site/guides/Using_ZEC_Privately.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# ZEC'i özel olarak kullanma

#### Shielded (Özel) ve Transparent

Şu anda Zcash'te iki tür adres ve işlem vardır: shielded ve transparent. Shielded ve transparent ZEC arasındaki fark oldukça basittir. Shielded ZEC paranızı ve işlemlerinizi gizli tutar; transparent ZEC ise Bitcoin gibi çalışır ve tamamen şeffaftır. Bu, birisi adresinizi biliyorsa bakiyenizi ve tüm işlemlerinizi görebileceği anlamına gelir.

İnsanlar ZEC kullanmaya ilk başladıklarında, hangi tür adres kullandıklarını fark etmeyebilirler. Bunun nedeni, tüm borsaların shielded ZEC'yi ve/veya shielded ZEC çekimlerini desteklememesidir.

Örneğin, birisi Coinbase kullanıp ZEC satın alırsa, transparent ZEC satın almış olur ve bu ZEC'yi yalnızca bir cüzdandaki transparent bir adrese çekebilir. [Zodl](https://zodl.com/) gibi cüzdanlar, transparent bir adrese gönderilen fonları shielded hâle getirerek bunu çözer, ancak herkes bunun farkında değildir. Basitçe söylemek gerekirse, birçok kişi ZEC'yi borsalarının veya birincil cüzdanlarının izin verdiği şekilde kullanır.

#### ZEC'inizin shielded olduğundan emin olma

Herkesin ZEC'lerini kendi saklamasını öneriyoruz. Yani ZEC'inizi bir borsadan bir cüzdana taşıyın. Shielded, yani özel, ZEC kullanıp kullanmadığınızı anlamanın en iyi yolu, bakiyenin bulunduğu adrese bakmaktır. Adres "z" veya "u1" ile başlıyorsa, bakiyeniz shielded durumdadır. Adres "t" ile başlıyorsa, bakiye transparent durumdadır.

Shielded ZEC'ye ulaşmanın genel olarak iki yolu vardır.

**Shielded** çekimleri destekleyen bir borsadan:

  1. Bir borsada ZEC satın alın
  2. Borsada çekim sürecini başlatın
  3. Shielded ZEC cüzdanınızı açın ve alıcı adresin "u1" veya "z" ile başladığından emin olun
  4. Borsanızdan çekimi gerçekleştirin

**Transparent** çekimleri destekleyen bir borsadan:


  1. Bir borsada ZEC satın alın
  2. Borsada çekim sürecini başlatın
  3. Otomatik shielding yapan ZEC cüzdanınızı açın ve transparent alıcı adresini kullanın
  4. Borsanızdan çekimi gerçekleştirin
  5. On onay bekleyin, ardından ZEC'yi transparent adresinizden shielded adresinize taşıyarak shielded hâle getirin


İşte bir borsadan ZEC çekmenin nasıl yapılacağına dair bir eğitim. Bunun shielded bir çekim olduğunu unutmayın.

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/REUbkLzK7J4"
    title="Buy and withdraw ZEC to a shielded wallet from Gemini"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>
    

---
İşte ZEC'inizi transparent bir adresten shielded bir adrese taşıyarak shielded hâle getirmenin nasıl yapılacağına dair bir eğitim.

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/W2msuzrxr3s"
    title="Shield your ZEC from a transparent to shielded address"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>


---
İşte Coinbase üzerinden ZEC satın alıp Zashi'ye göndermenin nasıl yapılacağına dair bir eğitim.

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/Avweu5V9QRc"
    title="Coinbase + Zashi: Buy Zcash & Shield Instantly"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>


#### İşlemler

ZEC'inizin shielded adresleri destekleyen shielded bir cüzdanda olduğundan emin olduktan sonra, artık bu ZEC ile işlem yapmak isteyip istemediğinize karar verebilirsiniz. ZEC ile işlem yapmak son derece kolaydır. Karşı tarafın tercihine bağlı olarak ZEC'yi shielded veya transparent adreslere gönderebilirsiniz. Her parasal işlemde olduğu gibi, insanların veri sızdırma ihtimali küçük de olsa vardır. ZEC veri sızıntısına karşı mücadelede en iyisidir, ancak bu onu dikkatsizce kullanmanız gerektiği anlamına gelmez. İşte ZEC ile işlem yaparken kaçınmanız gereken bazı şeyler.

- Shielded adresinizi ifşa etmek
- Shielded bir adresi t-address'ler için bir geçiş noktası olarak kullanmak (yani "mixing")
- Çok sayıda shielded'dan transparent'a işlem gerçekleştirmek ve bunu yaptığınızı ifşa etmek
- İnsanlara düzenli olarak shielded ZEC'yi nerede harcadığınızı bildirmek


Esasen, ZEC ile yapılacak en iyi şey onu shielded bir cüzdanda tutmak, shielded adresler arasında işlem yapmak ve ZEC'yi kamusal alanda (ör. bir kahve dükkânında) nasıl kullandığınız konusunda dikkatli olmaktır. Gizliliği korumak belli bir sorumluluk düzeyi gerektirir.

#### Kaynaklar

[Zcash işlemleri](https://zechub.wiki/using-zcash/transactions)
