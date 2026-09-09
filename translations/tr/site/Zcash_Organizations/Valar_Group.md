<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Organizations/Valar_Group.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Sayfayı Düzenle"/>
</a>

# Valar Group

[Web sitesini ziyaret edin](https://valargroup.dev/)

<<img width="200" height="200" alt="254678133" src="https://github.com/user-attachments/assets/0dc8c697-bcad-492a-b024-89b502d27af4" />


## Misyon Beyanı

Valar Group, Zcash'i ölçeklendirmeye, coin sahipleri yönetişimini güçlendirmeye ve protokolün gizliliğini, performansını ve uzun vadeli dayanıklılığını iyileştirmeye odaklanan bağımsız bir mühendislik kuruluşudur.

Çalışmaları, protokol düzeyindeki altyapıda yoğunlaşır: özel token sahibi oylaması, yüksek performanslı tam düğüm yazılımı, cüzdan senkronizasyon teknolojisi ve korumalı Zcash'i daha büyük ölçekte daha kullanılabilir hâle getiren ağ yükseltmeleri.

Kuruluş, ZEC sahiplerine tercihlerini özel olarak ifade etme yolu, düğüm operatörlerine daha hızlı ve yetenekli yazılım, cüzdanlara ise ağ katılımının maliyetini azaltırken kullanıcı gizliliğini koruyan araçlar sunmayı amaçlar.

## Arka Plan

Valar Group, Osmosis'in kurucu ortaklarından ve Cosmos'u başlatan ekibin üyelerinden Dev Ojha (ValarDragon) tarafından yönetilmektedir. Son on yılda zk-SNARKs, BFT konsensüsü ve üretimdeki DeFi sistemleri alanlarında çalışmıştır.

Grubun Zcash'teki kamuya açık çalışmaları, ekosistemin 2026'daki çekirdek geliştirme yeniden yapılanmasından sonra bağımsız protokol ekiplerine yönelmesiyle öne çıktı. Valar Group, Project Tachyon, Shielded Labs, ZODL ve Zcash Foundation ile birlikte yeni nesil Zcash altyapısını inşa eden kuruluşlardan biri olarak ortaya çıktı.

Çalışmalarındaki tekrarlayan tema, Zcash'in gizlilik özelliklerinin ödemelerin ötesine uzanması gerektiğidir. Sahiplerden ihraç, blok süreleri veya ağ yükseltmesinin kapsamı hakkında oy kullanmaları istenirse, kimliklerini, bakiyelerini veya bireysel oylarını açıklamadan korumalı bakiyelerinden bunu yapabilmelidirler. Bu gereklilik, Valar Group'u özel bir coin sahibi oylama zinciri tasarlayıp kullanıma sunmaya yöneltti.

Aynı ölçeklendirme ve kriptografi geçmişi, düğüm ve senkronizasyon çalışmalarını da şekillendirdi. Daha hızlı bloklar, daha hafif cüzdan senkronizasyonu ve daha yetenekli bir tam düğüm; yalnızca değer saklama aracı olarak değil, ödeme ağı ölçeğinde kullanılabilecek özel para için ön koşullar olarak ele alınır.

## Vizyon

Valar Group'un kamuya açık materyalleri ve proje çalışmaları, şu özelliklere sahip bir Zcash ağına işaret eder:

- Tekrarlanabilir bir yönetişim süreci olarak özel, denetlenebilir coin sahibi oylamasını desteklemek.
- Korumalı gizlilikten ödün vermeden iş ispatı ödemelerini ölçeklendirmek.
- PIR, budama ve daha hızlı blok yayılımı aracılığıyla cüzdan ve düğüm darboğazlarını azaltmak.
- Bağımsız bir tam düğüm altyapısı sunarak uygulama çeşitliliğini artırmak.
- Kuantum sonrası hazırlığa ve resmî olarak incelenmiş protokol yükseltmelerine katkıda bulunmak.

Kuruluş, protokol sahibi olarak değil, bağımsız bir katkı sağlayıcı olarak çalışır. Protokol değişiklikleri yine ZIP'ler, uygulama, inceleme ve topluluk sinyallemesi üzerinden ilerler. Valar Group'un rolü, bu süreçleri uygulanabilir kılan sistemleri tasarlamak, uygulamak, işletmek ve açık kaynak hâline getirmektir.

## Stratejik Alanlar

Valar Group'un çalışmaları dört alanda kümelenmektedir.

### Özel Coin Sahibi Yönetişimi

Zcash, otomatik zincir üzeri protokol kontrolü kullanmaz. Coin sahibi anketleri, daha geniş bir yaklaşık konsensüs sürecini besleyen tavsiye niteliğindeki sinyallerdir. Valar Group, bu sinyallerin seçmen kimliğini veya bireysel oy büyüklüğünü açığa çıkarmadan korumalı bakiyelerden toplanabilmesi için Tokenholder Voting Chain'i geliştirdi.

Mevcut tasarım şunları kullanır:

- Oylama turlarını düzenlemek için özel bir Cosmos SDK uygulama zinciri.
- Harcanabilir Ironwood notlarına karşı anlık görüntü kanıtları.
- Oy miktarlarının homomorfik şifrelemesi.
- Nullifier üyelik dışılık kanıtları için Private Information Retrieval.
- Bir koordinatör multisig'i ve dağıtık bir seçim otoritesi.

Amaç, önceki token sahibi oylama süreçlerini, diğer kuruluşların işletebileceği ve bağımsız olarak sayım yapabileceği yeniden kullanılabilir, denetlenmiş, cüzdanla entegre edilebilir bir sistemle değiştirmektir.

### Düğüm Yazılımı ve Ağ Ölçeklendirmesi

Valar Group, Zebra kod tabanından oluşturulmuş bir Zcash tam düğümü olan Zakura üzerinde Project Tachyon ile iş birliği yapmaktadır. Zakura, daha hızlı ilk senkronizasyon, budama, anlık görüntü önyüklemesi ve eski `zcashd` kullanıcıları için uyumluluk yolu gerektiren operatörlere yönelik yüksek performanslı bir düğüm olarak konumlandırılmıştır.

İlgili ölçeklendirme çalışmaları şunları içerir:

- NU7 test ağlarında 25 saniyelik blok deneyleri de dâhil olmak üzere daha hızlı hedef blok süreleri.
- Geliştirilmiş eşler arası blok yayılımı.
- Korumalı etkinlik büyüdükçe Zcash'i kullanılabilir tutmayı amaçlayan tam düğüm özellikleri.

### Cüzdan ve Senkronizasyon Altyapısı

Korumalı cüzdanların geçmişte büyük miktarda zincir verisi taraması gerekmiştir. Valar Group, cüzdanların tam nullifier kümelerini indirmeden veya hangi notlarla ilgilendiklerini açıklamadan ihtiyaç duydukları kanıtları getirebilmeleri için PIR sistemleri geliştirir.

Bu çalışma hem oylama altyapısında hem de daha geniş cüzdan senkronizasyon araştırmalarında görülür. Grup ayrıca ZODL'nin mobil altyapısında kullanılan çok sunuculu işlem gönderimi ve sunucu seçimi iyileştirmeleri de dâhil olmak üzere cüzdan tarafında güvenilirlik çalışmalarına katkıda bulunmuştur.

### Protokol Yükseltmeleri ve Ekosistem Koordinasyonu

Valar Group, Orchard devre açığından sonra Ironwood yanıtına kamuya açık şekilde taahhütte bulunan kuruluşlardan biriydi. Ironwood yeni bir korumalı havuz sundu, özgün Orchard havuzunu bir turnike arkasında mühürledi ve dolaşımdaki arzın bağımsız olarak doğrulanmasına yönelik bir yol sağladı. Valar Group, mimari, konsensüs kuralı uygulaması ve ekosistem koordinasyonu konularında Project Tachyon, Shielded Labs, ZODL ve Zcash Foundation ile çalıştı.

Grup ayrıca NU7 kapsam belirleme, test ağı işletimi ve ZIP düzenleme çalışmalarına katılır. Dev Ojha, ZIP düzenleyicisi olarak listelenmektedir.

## Güncel Girişimler

### Tokenholder Voting Chain / Shielded Vote

Shielded Vote, Valar Group'un Zcash için özel yönetişim protokolüdür. Sahipler, bireysel miktarları açıklamadan veya oyları kimliklerle ilişkilendirmeden korumalı bakiyelerle oy kullanır.

Temel özellikleri şunlardır:

- Çok günlük bir taahhüt/açıklama süreci yerine oylama için tek çevrim içi oturum.
- Fonları riske atmadan oy hakkını bir hotkey'e devreden Keystone uyumlu anlık görüntü imzası.
- Homomorfik ElGamal kullanılarak şifrelenmiş oy miktarları.
- Anlık görüntü kanıtları sırasında nullifier'ların sızdırılmaması için PIR sorguları.
- Zamanlama korelasyonunu azaltmak için oy bölme ve gecikmeli aktarma gönderimi.
- Kamuya açık şekilde denetlenebilir sayımlar.

Ağustos 2026'da Valar Group ve Project Tachyon, bu altyapıyı NU7 coin sahibi oylaması için kullandı. Uygunluk, ana ağın 3.459.350 yüksekliğinde Ironwood'da harcanabilir korumalı ZEC gerektiriyordu. Oylama 25 Ağustos'tan 14 Eylül 2026'ya kadar sürdü ve sonucun temsilî kabul edilmesi için 1.000.000 ZEC katılım eşiği belirlendi. Sorular NSM ihraç yumuşatması, yeniden ihraç zamanlaması, Sprout/v4 kullanım dışı bırakılması, 25 saniyelik blok süreleri ve NU7 kapsamı/hazırlığını kapsıyordu.

Varsayılan zincir koordinasyonu Project Tachyon, Valar Group, Zcash Foundation, ZODL ve Shielded Labs arasında 5 üzerinden 2 multisig kullanır. Ayrı bir doğrulayıcı kümesi, her tur için şifre çözme anahtarı paylarını tutar. Hiçbir tekil doğrulayıcı bireysel oyları kurtaramaz; nihai sayımı oluşturmak için doğrulayıcı eşiği gerekir.

Kamuya açık operatör ve denetçi arayüzleri şunları içerir:

- [Oylama zinciri kurulumu](https://setup.valargroup.org)
- [Sayım denetçisi](https://tally.valargroup.org)
- [Koordinatör arayüzü](https://svote.valargroup.org/)
- [PIR sunucu kurulumu](https://setup-pir.valargroup.org)
- [Shielded Vote belgeleri](https://valargroup.gitbook.io/shielded-vote-docs)

### Zakura

Zakura, Valar Group ve Project Tachyon arasındaki iş birliğiyle geliştirilen bir Zcash tam düğümüdür. Zebra'dan türetilmiştir ve daha hızlı senkronizasyon, yerel budama, anlık görüntü önyüklemesi, `zcashd` uyumluluk yolları ve deneysel yüksek performanslı P2P çalışmaları ekler.

Zcash Foundation, Zebra'nın bağımsız ekiplerin çatallayıp geliştirebilmesi için izin veren lisanslar altında yayımlandığını ve bazı Zakura katkıcılarının Zebra'ya hâlihazırda yukarı akış katkılar sağladığını belirterek projeyi kamuya açık şekilde karşıladı.

### Private Information Retrieval

Valar Group, birbiriyle bağlantılı iki sorun için PIR hizmetleri ve kütüphaneleri sürdürmektedir:

- Bir notun, nullifier'ını açıklamadan anlık görüntü yüksekliğinde harcanmamış olduğunu kanıtlamak.
- Cüzdanların senkronize olmak veya oy kullanmak için getirmesi gereken veriyi azaltmak.

Bu, Shielded Vote'un temel bir bağımlılığı ve daha hızlı özel cüzdan kullanıcı deneyimi için bir yapı taşıdır.

### Ironwood ve NU7 Mühendisliği

Valar Group, Haziran 2026'da Ironwood'a yönelik ortak taahhüdün parçasıydı ve yeni havuzla ilgili konsensüs kuralı uygulamasına ve istemci çalışmalarına katkıda bulundu. Ayrıca `nu7.valargroup.dev` altında barındırılan katılım betikleri ve kamuya açık düğümler de dâhil olmak üzere NU7 test ağı altyapısını işletti.

### Açık Kaynak Protokol Kütüphaneleri

`valargroup` GitHub kuruluşu, oylama ve düğüm altyapısını aşağıdakiler de dâhil olmak üzere herkese açık depolar olarak yayımlar:

- [`vote-sdk`](https://github.com/valargroup/vote-sdk) — özel zincir üzeri oylama için uygulamaya özgü zincir
- [`zcash_voting`](https://github.com/valargroup/zcash_voting) — istemci tarafı korumalı oylama kütüphanesi, kanıtlar, depolama ve FFI
- [`voting-circuits`](https://github.com/valargroup/voting-circuits) — Halo2 delegasyon ve oylama devreleri
- [`vote-nullifier-pir`](https://github.com/valargroup/vote-nullifier-pir) — nullifier üyelik dışılık kanıtları için PIR
- [`token-holder-voting-config`](https://github.com/valargroup/token-holder-voting-config) — cüzdan hizmeti keşif yapılandırması
- [`zebra`](https://github.com/valargroup/zebra) — Valar Group'un Zebra/Zakura geliştirme çatalı

## Ekipler

Valar Group, **Dev Ojha** (ValarDragon) tarafından yönetilmektedir. Zakura ile ilişkili kamuya açık ekip sayfaları aşağıdaki Valar bağlantılı mühendisleri listeler:

- **Dev Ojha** — Sürdürücü; Valar Group'u yönetir. Odak alanları token sahibi oylaması, kuantum sonrası çalışmalar, Zakura ve PIR'dir.
- **Roman Akhtariev** — Baş mühendis. Daha önce Osmosis'te baş mühendisti; çalışmaları PIR cüzdan senkronizasyonu, token sahibi oylaması ve Zakura senkronizasyon performansını içerir.
- **Evan Forbes** — Baş mühendis. Eski Celestia konsensüs lideri ve kurucu mühendistir; çalışmaları daha hızlı blok süresi hazırlığı ve QUIC P2P altyapısını içerir.
- **Adam Tucker** — Baş mühendis. Eski Osmosis mühendisidir; çalışmaları Roman Akhtariev ile token sahibi oylamasını, cüzdan güvenilirliğini ve altyapı genelinde Ironwood entegrasyonunu içerir.

Zakura'nın kendisi Sean Bowe liderliğindeki Project Tachyon ile ortaklaşa sürdürülmektedir. İki kuruluş yakın iş birliği yapsa da ayrı kalmaktadır.

## Organizasyonel Yapı

Valar Group bağımsız bir mühendislik kuruluşu olarak faaliyet gösterir. Zcash Foundation, ZODL, Shielded Labs veya Zcash Community Grants'in parçası değildir.

Oylama zinciri tasarımında Valar Group, beş koordinatör kuruluştan biridir. Bu rol, Zcash yönetişimi üzerinde münhasır kontrol iddiası değil, oylama sisteminin bir parametresidir. Diğer ekipler doğrulayıcı çalıştırabilir, alternatif oylama zincirleri kurabilir veya kamu araçlarındaki yayımlanmış sayımları denetleyebilir.

Tüzel kişi türü, yönetim kurulu yapısı ve iç yönetişime ilişkin ek bilgiler, eski Zcash kuruluşlarıyla aynı ayrıntı düzeyinde yayımlanmamıştır.

## Finansman

2026 ortalarındaki kamuya açık forum açıklamaları, Valar Group ve Project Tachyon'un özel bağışlar yoluyla finanse edildiğini belirtmektedir. ZODL'nin açıklanan girişim turundan veya Shielded Labs'in kamuya açık bağış duyurularından farklı olarak Valar Group, ayrıntılı bir bağışçı listesi veya hibe takvimi yayımlamamıştır.

Bu finansman modeli, ekibi tarihî Development Fund / blok ödülü yolundan bağımsız tutar; ancak bütçe büyüklüğü ve finansman kaynakları konusunda daha az kamu görünürlüğü anlamına da gelir.

## Zcash Ekosistemindeki Rolü

Valar Group, Zcash'in 2026 geliştirme ortamı etrafında oluşan bağımsız protokol kuruluşlarından biridir. Bu ortamda:

- **Zcash Foundation** topluluk yönetimini ve Zebra'yı sürdürmektedir.
- **ZODL**, ECC ayrılığından sonra cüzdan ürününe ve protokolün devamlılığına odaklanmaktadır.
- **Shielded Labs**, sürdürülebilirlik, güvenlik ve konsensüs araştırmalarına odaklanmaktadır.
- **Project Tachyon**, özyineleme, biçimsel doğrulama ve uzun vadeli ölçeklenebilirliğe odaklanmaktadır.
- **Valar Group**, özel coin sahibi oylaması, düğüm performansı, PIR ve bu sistemlerin üretimde işletilmesi için gereken mühendisliğe odaklanmaktadır.

Ayırt edici katkısı, korumalı yönetişimi operasyonel hâle getirmesidir. NU7 oylaması bu altyapının ilk büyük kullanımıdır: sahipler Ironwood bakiyelerini kanıtlar, Zodl ve Vizor gibi cüzdanlar akışı entegre edebilir ve herkes belirli bir sahibin nasıl oy kullandığını öğrenmeden sayımı denetleyebilir.

Aynı ekibin düğüm ve senkronizasyon çalışmaları, bu tablonun diğer yarısını desteklemeyi amaçlar. Cüzdanlar senkronize olamıyorsa, düğümler yetişemiyorsa veya yükseltmeler hızlıca uygulanamıyorsa özel oylama daha az faydalıdır. Valar Group, yönetişimi, düğüm yazılımını ve cüzdan altyapısını tek bir sorun olarak ele alır: operasyonel gücü tek bir kuruluşta yoğunlaştırmadan özel Zcash'i ölçekli biçimde kullanılabilir kılmak.

## Kaynaklar

- [Valar Group web sitesi](https://valargroup.dev/)
- [Valar Group GitHub](https://github.com/valargroup)
- [Shielded Vote belgeleri](https://valargroup.gitbook.io/shielded-vote-docs)
- [Oylama zinciri kurulumu](https://setup.valargroup.org)
- [Sayım denetçisi](https://tally.valargroup.org)
- [Koordinatör arayüzü](https://svote.valargroup.org/)
- [Zakura](https://zakura.com/)
- [Zakura hakkında / ekip](https://zakura.com/about/)
- [NU7 coin sahibi oylaması forum başlığı](https://forum.zcashcommunity.com/t/nu7-token-holder-vote/56912)
- [Coinholder Voting Chain forum başlığı](https://forum.zcashcommunity.com/t/the-coinholder-voting-chain/56925)
