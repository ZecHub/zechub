<a href="https://github.com/zechub/zechub/edit/main/site/guides/Mining_and_Staking_Privacy.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# 挖矿与质押隐私

你的矿工收益地址和你的 finalizer 并非同一事物。链上永远不会将它们关联起来。

<div className="grid gap-3 my-5 sm:grid-cols-3">
  <div className="rounded-xl border border-emerald-300 bg-emerald-50 p-4 dark:border-emerald-700 dark:bg-emerald-950">
    <div className="text-xs font-semibold uppercase tracking-wide text-emerald-700 dark:text-emerald-300">矿工</div>
    <div className="mt-1 text-lg font-semibold text-emerald-950 dark:text-emerald-50">透明收益</div>
    <p className="mt-1 text-sm text-emerald-900 dark:text-emerald-100">Coinbase 向一个 Zcash 地址支付。t 地址的历史记录是公开的。</p>
  </div>
  <div className="rounded-xl border border-blue-300 bg-blue-50 p-4 dark:border-blue-700 dark:bg-blue-950">
    <div className="text-xs font-semibold uppercase tracking-wide text-blue-700 dark:text-blue-300">Finalizer</div>
    <div className="mt-1 text-lg font-semibold text-blue-950 dark:text-blue-50">zfinv1 密钥</div>
    <p className="mt-1 text-sm text-blue-900 dark:text-blue-100">一种 ed25519 密钥。它为投票签名。它不是 Zcash 地址。</p>
  </div>
  <div className="rounded-xl border border-amber-300 bg-amber-50 p-4 dark:border-amber-700 dark:bg-amber-950">
    <div className="text-xs font-semibold uppercase tracking-wide text-amber-700 dark:text-amber-300">债券</div>
    <div className="mt-1 text-lg font-semibold text-amber-950 dark:text-amber-50">屏蔽质押</div>
    <p className="mt-1 text-sm text-amber-900 dark:text-amber-100">存在于质押池中。指定一个目标 finalizer。</p>
  </div>
</div>

## 重要的顺序

<div className="my-4 rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-600 dark:bg-slate-800">
  <div className="flex flex-wrap items-center gap-2 font-semibold">
    <span className="rounded-full bg-emerald-600 px-3 py-1 text-sm text-white">1 挖矿</span>
    <span className="text-slate-400">→</span>
    <span className="rounded-full bg-blue-600 px-3 py-1 text-sm text-white">2 屏蔽</span>
    <span className="text-slate-400">→</span>
    <span className="rounded-full bg-amber-600 px-3 py-1 text-sm text-white">3 质押</span>
  </div>
  <p className="mt-3 mb-0 text-slate-800 dark:text-slate-100">跳过屏蔽，私密步骤就永远不会发生。债券不会抹去透明的 coinbase。</p>
</div>

## 公开的信息

| 项目 | 公开？ | 原因 |
|---|---|---|
| 矿工 t 地址和 coinbase 历史 | 是 | 常规透明输出 |
| Finalizer 密钥和 zfinv1 | 是，在名册上出现后 | 为了验证投票，它必须公开 |
| 投票权和奖励池 | 是 | 会依据 finalizer 密钥发布，以便审计质押分配 |
| 哪个透明地址为债券提供资金 | 否，经过屏蔽后 | 债券会花费屏蔽票据 |
| 从你的矿工到你的 finalizer 的关联 | 不在链上 | 协议中没有任何内容会记录它 |

质押金额是有意公开的。该设计要求总质押量以及各 finalizer 之间的分配可被公开核查。量化（10 的幂次）和固定的质押窗口限制了个人时间或模式信息的泄露量，同时仍允许进行这种审计。未质押的 Orchard 余额保持私密；质押是有意进行的信息披露。

## 给自己质押，或给其他人质押

<div className="grid gap-3 my-4 sm:grid-cols-2">
  <div className="rounded-xl border border-slate-300 bg-white p-4 dark:border-slate-600 dark:bg-slate-800">
    <div className="font-semibold text-slate-900 dark:text-slate-50">绑定到你自己的 finalizer</div>
    <p className="mt-2 mb-0 text-sm text-slate-700 dark:text-slate-200">最简单。你保留运营者角色和债券。仅凭链上数据，观察者仍无法证明 t 地址和 zfinv1 属于同一个人。</p>
  </div>
  <div className="rounded-xl border border-amber-300 bg-amber-50 p-4 dark:border-amber-700 dark:bg-amber-950">
    <div className="font-semibold text-amber-950 dark:text-amber-50">绑定到另一位成员</div>
    <p className="mt-2 mb-0 text-sm text-amber-900 dark:text-amber-100">投票权会显示在其密钥之下。他们获得 10% 的活跃 finalizer 佣金。你保留债券产生的 90%。这打破了一个显而易见的猜测：接收透明收益的矿工与运营 finalizer 的人是同一个人。</p>
  </div>
</div>

一个团体可以使用不同的收益地址挖矿、进行屏蔽，并在成员之间分配债券。这样就更难仅凭链上数据断言“这个矿工就是这个 finalizer”。这不会隐藏 finalizer 的身份，也不会隐藏挖矿行为。

## 这并不能做到什么

<div className="my-4 rounded-xl border border-rose-300 bg-rose-50 p-4 dark:border-rose-700 dark:bg-rose-950">
  <div className="font-semibold text-rose-700 dark:text-rose-300">未隐藏的信息</div>
  <ul className="mt-2 mb-0 text-rose-950 dark:text-rose-100">
    <li>谁是 finalizer</li>
    <li>每位 finalizer 拥有多少投票权</li>
    <li>你的透明挖矿历史</li>
    <li>你在链下创建的关联：同一个 IP、同一种收益模式、同一位运营者</li>
  </ul>
</div>

目标 zfinv1 位于质押操作之中。这里的隐私保护针对的是资金来源，而不是隐藏目标密钥。

## 简短版本

挖矿。屏蔽。然后质押。除非你自己将它们关联起来，否则矿工地址和 finalizer 密钥会保持互不关联。
