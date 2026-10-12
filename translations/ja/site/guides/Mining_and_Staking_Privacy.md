<a href="https://github.com/zechub/zechub/edit/main/site/guides/Mining_and_Staking_Privacy.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="ページを編集"/>
</a>

# マイニングとステーキングのプライバシー

マイナー報酬の受取先とあなたのファイナライザーは同じものではありません。チェーン上で両者が結び付けられることはありません。これは有用ですが、簡単に無駄にしてしまう可能性もあります。

<div className="grid gap-3 my-5 sm:grid-cols-3">
  <div className="rounded-xl border border-emerald-300 bg-emerald-50 p-4 dark:border-emerald-700 dark:bg-emerald-950">
    <div className="text-xs font-semibold uppercase tracking-wide text-emerald-700 dark:text-emerald-300">マイナー</div>
    <div className="mt-1 text-lg font-semibold text-emerald-950 dark:text-emerald-50">透明な報酬受取</div>
    <p className="mt-1 text-sm text-emerald-900 dark:text-emerald-100">Coinbase は Zcash アドレスへ支払います。t-address の履歴は公開されています。</p>
  </div>
  <div className="rounded-xl border border-blue-300 bg-blue-50 p-4 dark:border-blue-700 dark:bg-blue-950">
    <div className="text-xs font-semibold uppercase tracking-wide text-blue-700 dark:text-blue-300">ファイナライザー</div>
    <div className="mt-1 text-lg font-semibold text-blue-950 dark:text-blue-50">zfinv1 キー</div>
    <p className="mt-1 text-sm text-blue-900 dark:text-blue-100">ed25519 キーです。投票に署名します。これは Zcash アドレスではありません。</p>
  </div>
  <div className="rounded-xl border border-amber-300 bg-amber-50 p-4 dark:border-amber-700 dark:bg-amber-950">
    <div className="text-xs font-semibold uppercase tracking-wide text-amber-700 dark:text-amber-300">ボンド</div>
    <div className="mt-1 text-lg font-semibold text-amber-950 dark:text-amber-50">シールドされたステーク</div>
    <p className="mt-1 text-sm text-amber-900 dark:text-amber-100">ステーキングプール内に存在します。対象となるファイナライザーを指定します。</p>
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
  <p className="mt-3 mb-0 text-slate-800 dark:text-slate-100">シールドを省略すると、プライベートな手順は行われません。ボンドを作成しても、透明なコインベースは消去されません。</p>
</div>

## 公開されるもの

| 項目 | 公開されるか？ | 理由 |
|---|---|---|
| マイナーの t-address とコインベース履歴 | はい | 通常の透明な出力であるため |
| ファイナライザーキーと zfinv1 | はい、ロスターに登録されると | 投票を検証するために必要なため |
| 投票力と報酬バンク | はい | ファイナライザーキーに紐付けて公開されるため |
| どの透明なアドレスがボンドに資金を供給したか | いいえ、シールド後は | ボンドはシールドされたノートを使用するため |
| マイナーからファイナライザーへのリンク | チェーン上にはない | プロトコル内にそれを書き込むものはないため |

## 自分にステークするか、他者にステークするか

<div className="grid gap-3 my-4 sm:grid-cols-2">
  <div className="rounded-xl border border-slate-300 bg-white p-4 dark:border-slate-600 dark:bg-slate-800">
    <div className="font-semibold text-slate-900 dark:text-slate-50">自分のファイナライザーにボンドする</div>
    <p className="mt-2 mb-0 text-sm text-slate-700 dark:text-slate-200">最も簡単です。あなたはオペレーターの役割とボンドを維持します。それでも、チェーンデータだけから t-address と zfinv1 が同一人物のものだと観察者が証明することはできません。</p>
  </div>
  <div className="rounded-xl border border-amber-300 bg-amber-50 p-4 dark:border-amber-700 dark:bg-amber-950">
    <div className="font-semibold text-amber-950 dark:text-amber-50">別のメンバーにボンドする</div>
    <p className="mt-2 mb-0 text-sm text-amber-900 dark:text-amber-100">投票力は相手のキーの下に表示されます。相手はアクティブなファイナライザーとしての 10% の手数料を得ます。あなたはボンドに発生する 90% を維持します。これは、明白な推測を崩すパターンです。</p>
  </div>
</div>

グループは個別の報酬受取アドレスでマイニングし、シールドした後、メンバー間でボンドを作成できます。これにより、「このマイナーがこのファイナライザーである」と主張することははるかに困難になります。ただし、誰がファイナライザーであるかや、マイニング自体を隠すものではありません。

## これはできないこと

<div className="my-4 rounded-xl border border-rose-300 bg-rose-50 p-4 dark:border-rose-700 dark:bg-rose-950">
  <div className="font-semibold text-rose-700 dark:text-rose-300">隠されないもの</div>
  <ul className="mt-2 mb-0 text-rose-950 dark:text-rose-100">
    <li>誰がファイナライザーであるか</li>
    <li>各ファイナライザーが持つ投票力</li>
    <li>あなたの透明なマイニング履歴</li>
    <li>オフチェーンで自ら作るリンク：1つの IP、1つの報酬パターン、1人のオペレーター</li>
  </ul>
</div>

対象の zfinv1 はステーキングアクションの内部にあります。ここでのプライバシーは資金の出所に関するものであり、宛先キーを隠すことではありません。

## 要約

マイニング。シールド。そしてボンド。自分で結び付けない限り、マイナーアドレスとファイナライザーキーは無関係のままです。
