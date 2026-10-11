<a href="https://github.com/zechub/zechub/edit/main/site/guides/Mining_and_Staking_Privacy.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="编辑页面"/>
</a>

# 挖矿与质押隐私

你的矿工收益地址和你的终结者并不是一回事。链上永远不会将它们关联起来。这很有用，但也很容易被浪费。

<div className="grid gap-3 my-5 sm:grid-cols-3">
  <div className="rounded-xl border border-emerald-300 bg-emerald-50 p-4 dark:border-emerald-700 dark:bg-emerald-950">
    <div className="text-xs font-semibold uppercase tracking-wide text-emerald-700 dark:text-emerald-300">矿工</div>
    <div className="mt-1 text-lg font-semibold text-emerald-950 dark:text-emerald-50">透明收益</div>
    <p className="mt-1 text-sm text-emerald-900 dark:text-emerald-100">Coinbase 向一个 Zcash 地址付款。t-address 的历史记录是公开的。</p>
  </div>
  <div className="rounded-xl border border-blue-300 bg-blue-50 p-4 dark:border-blue-700 dark:bg-blue-950">
    <div className="text-xs font-semibold uppercase tracking-wide text-blue-700 dark:text-blue-300">终结者</div>
    <div className="mt-1 text-lg font-semibold text-blue-950 dark:text-blue-50">zfinv1 密钥</div>
    <p className="mt-1 text-sm text-blue-900 dark:text-blue-100">一种 ed25519 密钥。它用于签署投票。它不是 Zcash 地址。</p>
  </div>
  <div className="rounded-xl border border-amber-300 bg-amber-50 p-4 dark:border-amber-700 dark:bg-amber-950">
    <div className="text-xs font-semibold uppercase tracking-wide text-amber-700 dark:text-amber-300">债券</div>
    <div className="mt-1 text-lg font-semibold text-amber-950 dark:text-amber-50">屏蔽质押</div>
    <p className="mt-1 text-sm text-amber-900 dark:text-amber-100">存放在质押池中。指定一个目标终结者。</p>
  </div>
</div>

## 重要的顺序

<div className="my-4 rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-600 dark:bg-slate-800">
  <div className="flex flex-wrap items-center gap-2 font-semibold">
    <span className="rounded-full bg-emerald-600 px-3 py-1 text-sm text-white">1 挖矿</span>
    <span className="text-slate-400">→</span>
    <span className="rounded-full bg-blue-600 px-3 py-1 text-sm text-white">2 屏蔽</span>
    <span className="text-slate-400">→</span>
    <span className="rounded-full bg-amber-600 px-3 py-1 text-sm text-white">3 债券</span>
  </div>
  <p className="mt-3 mb-0 text-slate-800 dark:text-slate-100">跳过屏蔽，私密步骤就永远不会发生。债券不会抹除透明的 coinbase。</p>
</div>

## 哪些内容是公开的

| 项目 | 公开？ | 原因 |
|---|---|---|
| 矿工 t-address 和 coinbase 历史 | 是 | 常规透明输出 |
| 终结者密钥和 zfinv1 | 是，一旦列入名单 | 为了验证投票，它必须公开 |
| 投票权和奖励池 | 是 | 根据终结者密钥公布 |
| 哪个透明地址为债券提供资金 | 否，屏蔽后 | 债券花费的是屏蔽票据 |
| 从你的矿工到你的终结者的关联 | 不在链上 | 协议中没有任何内容会写入它 |

## 为自己质押，或为他人质押

<div className="grid gap-3 my-4 sm:grid-cols-2">
  <div className="rounded-xl border border-slate-300 bg-white p-4 dark:border-slate-600 dark:bg-slate-800">
    <div className="font-semibold text-slate-900 dark:text-slate-50">绑定到你自己的终结者</div>
    <p className="mt-2 mb-0 text-sm text-slate-700 dark:text-slate-200">最简单。你保留运营者角色和债券。仅从链上数据，观察者仍无法证明该 t-address 与 zfinv1 属于同一个人。</p>
  </div>
  <div className="rounded-xl border border-amber-300 bg-amber-50 p-4 dark:border-amber-700 dark:bg-amber-950">
    <div className="font-semibold text-amber-950 dark:text-amber-50">绑定到另一位成员</div>
    <p className="mt-2 mb-0 text-sm text-amber-900 dark:text-amber-100">投票权会显示在他们的密钥下。他们获得 10% 的活跃终结者佣金。你保留债券所累积的 90%。这种模式打破了显而易见的猜测。</p>
  </div>
</div>

一个群组可以在不同的收益地址上挖矿、进行屏蔽，并在成员之间绑定债券。这让“这个矿工就是这个终结者”的说法更难成立。它不会隐藏终结者是谁，也不会隐藏挖矿活动。

## 这无法做到什么

<div className="my-4 rounded-xl border border-rose-300 bg-rose-50 p-4 dark:border-rose-700 dark:bg-rose-950">
  <div className="font-semibold text-rose-700 dark:text-rose-300">不会被隐藏</div>
  <ul className="mt-2 mb-0 text-rose-950 dark:text-rose-100">
    <li>终结者是谁</li>
    <li>每个人拥有多少投票权</li>
    <li>你的透明挖矿历史</li>
    <li>你在链下创建的关联：同一个 IP、同一种收益模式、同一个运营者</li>
  </ul>
</div>

目标 zfinv1 位于质押操作中。这里的隐私保护的是资金来源，而不是隐藏目标密钥。

## 简短版本

挖矿。屏蔽。然后绑定债券。除非你自己将它们关联起来，否则矿工地址和终结者密钥将保持互不关联。
