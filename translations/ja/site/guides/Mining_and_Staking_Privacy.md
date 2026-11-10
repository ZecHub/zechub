<a href="https://github.com/zechub/zechub/edit/main/site/guides/Mining_and_Staking_Privacy.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# マイニング（Mining）とステーキング（staking）のプライバシー（privacy）

あなたのマイナー（miner）報酬とファイナライザー（finalizer）は同じものではありません。チェーン（chain）が両者を結び付けることはありません。

<div className="grid gap-3 my-5 sm:grid-cols-3">
  <div className="rounded-xl border border-emerald-300 bg-emerald-50 p-4 dark:border-emerald-700 dark:bg-emerald-950">
    <div className="text-xs font-semibold uppercase tracking-wide text-emerald-700 dark:text-emerald-300">マイナー</div>
    <div className="mt-1 text-lg font-semibold text-emerald-950 dark:text-emerald-50">公開型（transparent）の報酬</div>
    <p className="mt-1 text-sm text-emerald-900 dark:text-emerald-100">Coinbase は Zcash アドレス（address）に支払われます。t-アドレスの履歴は公開されています。</p>
  </div>
  <div className="rounded-xl border border-blue-300 bg-blue-50 p-4 dark:border-blue-700 dark:bg-blue-950">
    <div className="text-xs font-semibold uppercase tracking-wide text-blue-700 dark:text-blue-300">ファイナライザー</div>
    <div className="mt-1 text-lg font-semibold text-blue-950 dark:text-blue-50">zfinv1 キー</div>
    <p className="mt-1 text-sm text-blue-900 dark:text-blue-100">ed25519 キーです。投票に署名します。Zcash アドレスではありません。</p>
  </div>
  <div className="rounded-xl border border-amber-300 bg-amber-50 p-4 dark:border-amber-700 dark:bg-amber-950">
    <div className="text-xs font-semibold uppercase tracking-wide text-amber-700 dark:text-amber-300">ボンド（bond）</div>
    <div className="mt-1 text-lg font-semibold text-amber-950 dark:text-amber-50">シールドされた（shielded）ステーク</div>
    <p className="mt-1 text-sm text-amber-900 dark:text-amber-100">ステーキング・プール（pool）内にあります。対象のファイナライザーを指定します。</p>
  </div>
</div>

## 重要な順序

<div className="my-4 rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-600 dark:bg-slate-800">
  <div className="flex flex-wrap items-center gap-2 font-semibold">
    <span className="rounded-full bg-emerald-600 px-3 py-1 text-sm text-white">1 マイニング</span>
    <span className="text-slate-400">→</span>
    <span className="rounded-full bg-blue-600 px-3 py-1 text-sm text-white">2 シールド</span>
    <span className="text-slate-400">→</span>
    <span className="rounded-full bg-amber-600 px-3 py-1 text-sm text-white">3 ボンド</span>
  </div>
  <p className="mt-3 mb-0 text-slate-800 dark:text-slate-100">シールドを省略すると、プライベートな手順は一切行われません。ボンドを作成しても、公開型のコインベースは消えません。</p>
</div>

## 公開されるもの

| 項目 | 公開されるか | 理由 |
|---|---|---|
| マイナーの t-アドレスとコインベース履歴 | はい | 通常の公開型アウトプットです |
| ファイナライザー・キーと zfinv1 | はい、ロスターに掲載されると | 投票を検証するために必要です |
| 投票力と報酬バンク | はい | ステーク配分を監査できるよう、ファイナライザー・キーに対して公開されます |
| どの公開型アドレスがボンドに資金を提供したか | いいえ、シールド後は | ボンドはシールドされたノート（note）を使用します |
| あなたのマイナーからファイナライザーへのリンク | オンチェーン（on-chain）にはありません | プロトコル内にそれを書き込むものはありません |

ステーキングされた金額は意図的に公開されます。設計上、ステーキング総額とファイナライザー間の配分を公に検証可能にする必要があります。量子化（10 の累乗）と固定されたステーキング期間により、監査を可能にしつつ、個別のタイミングやパターン情報の漏洩を抑えます。ステーキングされていない Orchard 残高はプライベートなままです。ステーキングは意図的な開示です。

## 自分自身にステークするか、他の誰かにするか

<div className="grid gap-3 my-4 sm:grid-cols-2">
  <div className="rounded-xl border border-slate-300 bg-white p-4 dark:border-slate-600 dark:bg-slate-800">
    <div className="font-semibold text-slate-900 dark:text-slate-50">自分のファイナライザーにボンドする</div>
    <p className="mt-2 mb-0 text-sm text-slate-700 dark:text-slate-200">最も簡単です。あなたはオペレーターの役割とボンドを維持します。それでも、チェーン・データだけから t-アドレスと zfinv1 が同一人物のものだと観察者が証明することはできません。</p>
  </div>
  <div className="rounded-xl border border-amber-300 bg-amber-50 p-4 dark:border-amber-700 dark:bg-amber-950">
    <div className="font-semibold text-amber-950 dark:text-amber-50">別のメンバーにボンドする</div>
    <p className="mt-2 mb-0 text-sm text-amber-900 dark:text-amber-100">投票力はその人のキーに紐付いて表示されます。その人はアクティブなファイナライザーとして 10% のコミッションを受け取ります。あなたはボンドに発生する 90% を維持します。これにより、公開型の報酬を受け取るマイナーとファイナライザーを運用する人が同一人物だという明白な推測を崩せます。</p>
  </div>
</div>

グループは別々の報酬アドレスでマイニングし、シールドして、メンバー間でボンドできます。これにより、チェーン・データから「このマイナーはこのファイナライザーである」と主張することがはるかに難しくなります。ファイナライザーが誰であるかや、マイニングそのものは隠されません。

## これでできないこと

<div className="my-4 rounded-xl border border-rose-300 bg-rose-50 p-4 dark:border-rose-700 dark:bg-rose-950">
  <div className="font-semibold text-rose-700 dark:text-rose-300">隠されないもの</div>
  <ul className="mt-2 mb-0 text-rose-950 dark:text-rose-100">
    <li>ファイナライザーが誰であるか</li>
    <li>各ファイナライザーが持つ投票力</li>
    <li>あなたの公開型マイニング履歴</li>
    <li>オフチェーンで自ら作るリンク: 1 つの IP、1 つの報酬パターン、1 人のオペレーター</li>
  </ul>
</div>

対象の zfinv1 はステーキング操作の中に含まれます。ここでのプライバシーは資金源に関するものであり、宛先キーを隠すことではありません。

## 要約

マイニングし、シールドしてからボンドします。自ら結び付けない限り、マイナー・アドレスとファイナライザー・キーは無関係のままです。
