<a href="https://github.com/zechub/zechub/edit/main/site/guides/Mining_and_Staking_Privacy.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Sayfayı düzenle"/>
</a>

# Madencilik ve staking gizliliği

Madenci ödemeniz ve finalizer'ınız aynı şey değildir. Zincir bunları asla birbirine bağlamaz.

<div className="grid gap-3 my-5 sm:grid-cols-3">
  <div className="rounded-xl border border-emerald-300 bg-emerald-50 p-4 dark:border-emerald-700 dark:bg-emerald-950">
    <div className="text-xs font-semibold uppercase tracking-wide text-emerald-700 dark:text-emerald-300">Madenci</div>
    <div className="mt-1 text-lg font-semibold text-emerald-950 dark:text-emerald-50">Şeffaf ödeme</div>
    <p className="mt-1 text-sm text-emerald-900 dark:text-emerald-100">Coinbase, bir Zcash adresine ödeme yapar. t-adresi geçmişi herkese açıktır.</p>
  </div>
  <div className="rounded-xl border border-blue-300 bg-blue-50 p-4 dark:border-blue-700 dark:bg-blue-950">
    <div className="text-xs font-semibold uppercase tracking-wide text-blue-700 dark:text-blue-300">Finalizer</div>
    <div className="mt-1 text-lg font-semibold text-blue-950 dark:text-blue-50">zfinv1 anahtarı</div>
    <p className="mt-1 text-sm text-blue-900 dark:text-blue-100">Bir ed25519 anahtarıdır. Oyları imzalar. Bir Zcash adresi değildir.</p>
  </div>
  <div className="rounded-xl border border-amber-300 bg-amber-50 p-4 dark:border-amber-700 dark:bg-amber-950">
    <div className="text-xs font-semibold uppercase tracking-wide text-amber-700 dark:text-amber-300">Bond</div>
    <div className="mt-1 text-lg font-semibold text-amber-950 dark:text-amber-50">Korumalı staking</div>
    <p className="mt-1 text-sm text-amber-900 dark:text-amber-100">Staking havuzunda bulunur. Bir hedef finalizer belirtir.</p>
  </div>
</div>

## Önemli olan sıra

<div className="my-4 rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-600 dark:bg-slate-800">
  <div className="flex flex-wrap items-center gap-2 font-semibold">
    <span className="rounded-full bg-emerald-600 px-3 py-1 text-sm text-white">1 Madencilik yap</span>
    <span className="text-slate-400">→</span>
    <span className="rounded-full bg-blue-600 px-3 py-1 text-sm text-white">2 Korumalı hale getir</span>
    <span className="text-slate-400">→</span>
    <span className="rounded-full bg-amber-600 px-3 py-1 text-sm text-white">3 Bond et</span>
  </div>
  <p className="mt-3 mb-0 text-slate-800 dark:text-slate-100">Korumalı hale getirme adımını atlarsanız gizli adım gerçekleşmez. Bond, şeffaf coinbase'i silmez.</p>
</div>

## Herkese açık olanlar

| Öğe | Herkese açık mı? | Neden |
|---|---|---|
| Madencinin t-adresi ve coinbase geçmişi | Evet | Olağan şeffaf çıktılar |
| Finalizer anahtarı ve zfinv1 | Evet, listeye eklendikten sonra | Oyları doğrulamak için herkese açık olması gerekir |
| Oy gücü ve ödül bankası | Evet | Staking dağılımının denetlenebilmesi için finalizer anahtarıyla ilişkilendirilerek yayımlanır |
| Bir bond'u hangi şeffaf adresin fonladığı | Korumalı hale getirildikten sonra hayır | Bond, korumalı noteları harcar |
| Madenciniz ile finalizer'ınız arasındaki bağlantı | Zincir üstünde değil | Protokolde bunu kaydeden hiçbir şey yoktur |

Staking yapılan miktarlar kasıtlı olarak açığa çıkarılır. Tasarım, toplam staking miktarının ve bunun finalizer'lar arasındaki dağılımının herkes tarafından doğrulanabilmesini gerektirir. Nicemleme (10'un kuvvetleri) ve sabit staking pencereleri, bu denetime olanak tanırken kişiye özgü zamanlama veya örüntü bilgilerinin sızmasını sınırlar. Staking yapılmamış Orchard bakiyeleri gizli kalır; staking, bilgilerin kasıtlı olarak açıklanmasıdır.

## Kendinize veya başkasına staking yapın

<div className="grid gap-3 my-4 sm:grid-cols-2">
  <div className="rounded-xl border border-slate-300 bg-white p-4 dark:border-slate-600 dark:bg-slate-800">
    <div className="font-semibold text-slate-900 dark:text-slate-50">Kendi finalizer'ınıza bond edin</div>
    <p className="mt-2 mb-0 text-sm text-slate-700 dark:text-slate-200">En basit seçenektir. İşletmeci rolünü ve bond'u elinizde tutarsınız. Bir gözlemci, yalnızca Zincir verilerinden t-adresi ile zfinv1'in aynı kişiye ait olduğunu yine de kanıtlayamaz.</p>
  </div>
  <div className="rounded-xl border border-amber-300 bg-amber-50 p-4 dark:border-amber-700 dark:bg-amber-950">
    <div className="font-semibold text-amber-950 dark:text-amber-50">Başka bir üyeye bond edin</div>
    <p className="mt-2 mb-0 text-sm text-amber-900 dark:text-amber-100">Oy gücü, o üyenin anahtarı altında görünür. Aktif finalizer komisyonunun %10'unu kazanır. Bond üzerinden biriken %90'ı siz alırsınız. Böylece şeffaf ödemeyi alan madencinin, finalizer'ı işleten kişi olduğu yönündeki bariz tahmin boşa çıkar.</p>
  </div>
</div>

Bir grup, ayrı ödeme adresleri kullanarak madencilik yapabilir, bakiyelerini korumalı hale getirebilir ve üyeler arasında bond edebilir. Böylece Zincir verilerinden “bu madenci şu finalizer'dır” iddiasında bulunmak çok daha zorlaşır. Bu, finalizer'ların kim olduğunu veya madencilik faaliyetini gizlemez.

## Bunun sağlamadığı şeyler

<div className="my-4 rounded-xl border border-rose-300 bg-rose-50 p-4 dark:border-rose-700 dark:bg-rose-950">
  <div className="font-semibold text-rose-700 dark:text-rose-300">Gizlenmeyenler</div>
  <ul className="mt-2 mb-0 text-rose-950 dark:text-rose-100">
    <li>Finalizer'ların kim olduğu</li>
    <li>Her birinin ne kadar oy gücüne sahip olduğu</li>
    <li>Şeffaf madencilik geçmişiniz</li>
    <li>Zincir dışında kurduğunuz bağlantılar: aynı IP, aynı ödeme örüntüsü, aynı işletmeci</li>
  </ul>
</div>

Hedef zfinv1, staking işleminin içindedir. Buradaki gizlilik, hedef anahtarın gizlenmesiyle değil, fonların kaynağıyla ilgilidir.

## Kısaca

Madencilik yapın. Bakiyelerinizi korumalı hale getirin. Ardından bond edin. Madenci adresi ile finalizer anahtarı, siz aralarında bağlantı kurmadığınız sürece birbirinden bağımsız kalır.
