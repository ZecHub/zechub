<a href="https://github.com/zechub/zechub/edit/main/site/guides/Mining_and_Staking_Privacy.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Madencilik ve stake gizliliği

Madenci ödemesi ile finalizer'ınız aynı şey değildir. Zincir bunları asla birbirine bağlamaz. Bu faydalıdır ve kolayca boşa harcanabilir.

<div className="grid gap-3 my-5 sm:grid-cols-3">
  <div className="rounded-xl border border-emerald-300 bg-emerald-50 p-4 dark:border-emerald-700 dark:bg-emerald-950">
    <div className="text-xs font-semibold uppercase tracking-wide text-emerald-700 dark:text-emerald-300">Madenci</div>
    <div className="mt-1 text-lg font-semibold text-emerald-950 dark:text-emerald-50">Şeffaf ödeme</div>
    <p className="mt-1 text-sm text-emerald-900 dark:text-emerald-100">Coinbase, bir Zcash adresine ödeme yapar. Bir t-adresinin geçmişi herkese açıktır.</p>
  </div>
  <div className="rounded-xl border border-blue-300 bg-blue-50 p-4 dark:border-blue-700 dark:bg-blue-950">
    <div className="text-xs font-semibold uppercase tracking-wide text-blue-700 dark:text-blue-300">Finalizer</div>
    <div className="mt-1 text-lg font-semibold text-blue-950 dark:text-blue-50">zfinv1 anahtarı</div>
    <p className="mt-1 text-sm text-blue-900 dark:text-blue-100">Bir ed25519 anahtarıdır. Oyları imzalar. Bir Zcash adresi değildir.</p>
  </div>
  <div className="rounded-xl border border-amber-300 bg-amber-50 p-4 dark:border-amber-700 dark:bg-amber-950">
    <div className="text-xs font-semibold uppercase tracking-wide text-amber-700 dark:text-amber-300">Tahvil</div>
    <div className="mt-1 text-lg font-semibold text-amber-950 dark:text-amber-50">Korumalı stake</div>
    <p className="mt-1 text-sm text-amber-900 dark:text-amber-100">Stake havuzunda bulunur. Hedef bir finalizer belirtir.</p>
  </div>
</div>

## Önemli olan sıra

<div className="my-4 rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-600 dark:bg-slate-800">
  <div className="flex flex-wrap items-center gap-2 font-semibold">
    <span className="rounded-full bg-emerald-600 px-3 py-1 text-sm text-white">1 Madencilik yap</span>
    <span className="text-slate-400">→</span>
    <span className="rounded-full bg-blue-600 px-3 py-1 text-sm text-white">2 Koru</span>
    <span className="text-slate-400">→</span>
    <span className="rounded-full bg-amber-600 px-3 py-1 text-sm text-white">3 Tahvil oluştur</span>
  </div>
  <p className="mt-3 mb-0 text-slate-800 dark:text-slate-100">Koruma adımını atlarsanız gizli adım hiç gerçekleşmez. Bir tahvil, şeffaf bir coinbase'i silmez.</p>
</div>

## Herkese açık olanlar

| Şey | Herkese açık mı? | Neden |
|---|---|---|
| Madenci t-adresi ve coinbase geçmişi | Evet | Normal şeffaf çıktılar |
| Finalizer anahtarı ve zfinv1 | Evet, listeye girdikten sonra | Oyları doğrulamak için öyle olması gerekir |
| Oy gücü ve ödül bankası | Evet | Finalizer anahtarıyla ilişkilendirilerek yayımlanır |
| Bir tahvili hangi şeffaf adresin finanse ettiği | Hayır, korumadan sonra | Tahvil, korumalı notları harcar |
| Madencinizden finalizer'ınıza bağlantı | Zincir üzerinde değil | Protokolde bunu yazan hiçbir şey yoktur |

## Kendinize veya başka birine stake edin

<div className="grid gap-3 my-4 sm:grid-cols-2">
  <div className="rounded-xl border border-slate-300 bg-white p-4 dark:border-slate-600 dark:bg-slate-800">
    <div className="font-semibold text-slate-900 dark:text-slate-50">Kendi finalizer'ınıza tahvil oluşturun</div>
    <p className="mt-2 mb-0 text-sm text-slate-700 dark:text-slate-200">En basit seçenek. Operatör rolünü ve tahvili korursunuz. Bir gözlemci, yalnızca zincir verilerinden t-adresi ile zfinv1'in aynı kişiye ait olduğunu yine de kanıtlayamaz.</p>
  </div>
  <div className="rounded-xl border border-amber-300 bg-amber-50 p-4 dark:border-amber-700 dark:bg-amber-950">
    <div className="font-semibold text-amber-950 dark:text-amber-50">Başka bir üyeye tahvil oluşturun</div>
    <p className="mt-2 mb-0 text-sm text-amber-900 dark:text-amber-100">Oy gücü onların anahtarının altında görünür. %10 etkin-finalizer komisyonunu onlar kazanır. Tahvil üzerinde biriken %90'ı siz korursunuz. Açık tahmini bozan model budur.</p>
  </div>
</div>

Bir grup ayrı ödeme adreslerinde madencilik yapabilir, koruma uygulayabilir ve üyeler arasında tahvil oluşturabilir. Bu, "bu madenci şu finalizer'dır" iddiasını çok daha zorlaştırır. Finalizer'ların kim olduğunu veya madenciliği gizlemez.

## Bunun yapmadıkları

<div className="my-4 rounded-xl border border-rose-300 bg-rose-50 p-4 dark:border-rose-700 dark:bg-rose-950">
  <div className="font-semibold text-rose-700 dark:text-rose-300">Gizli olmayanlar</div>
  <ul className="mt-2 mb-0 text-rose-950 dark:text-rose-100">
    <li>Finalizer'ların kim olduğu</li>
    <li>Her birinin ne kadar oy gücüne sahip olduğu</li>
    <li>Şeffaf madencilik geçmişiniz</li>
    <li>Zincir dışında oluşturduğunuz bir bağlantı: tek IP, tek ödeme modeli, tek operatör</li>
  </ul>
</div>

Hedef zfinv1 stake eyleminin içindedir. Buradaki gizlilik, hedef anahtarı gizlemekle değil, fonların kaynağıyla ilgilidir.

## Kısa sürüm

Madencilik yapın. Koruyun. Ardından tahvil oluşturun. Madenci adresi ile finalizer anahtarı, siz kendiniz bağlamadıkça ilişkisiz kalır.
