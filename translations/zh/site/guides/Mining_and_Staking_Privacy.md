<a href="https://github.com/zechub/zechub/edit/main/site/guides/Mining_and_Staking_Privacy.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# 挖矿 [mining] 与质押 [staking] 隐私 [privacy]

您的矿工 [miner] 收益和您的 finalizer 不是一回事。链 [chain] 永远不会将两者关联起来。

<div className="grid gap-3 my-5 sm:grid-cols-3">
  <div className="rounded-xl border border-emerald-300 bg-emerald-50 p-4 dark:border-emerald-700 dark:bg-emerald-950">
    <div className="text-xs font-semibold uppercase tracking-wide text-emerald-700 dark:text-emerald-300">矿工</div>
    <div className="mt-1 text-lg font-semibold text-emerald-950 dark:text-emerald-50">透明 [transparent] 收益</div>
    <p className="mt-1 text-sm text-emerald-900 dark:text-emerald-100">Coinbase 向一个 Zcash 地址 [address] 付款。t-地址历史记录是公开的。</p>
  </div>
  <div className="rounded-xl border border-blue-300 bg-blue-50 p-4 dark:border-blue-700 dark:bg-blue-950">
    <div className="text-xs font-semibold uppercase tracking-wide text-blue-700 dark:text-blue-300">Finalizer</div>
    <div className="mt-1 text-lg font-semibold text-blue-950 dark:text-blue-50">zfinv1 密钥</div>
    <p className="mt-1 text-sm text-blue-900 dark:text-blue-100">这是一把 ed25519 密钥。它用于签署投票。它不是 Zcash 地址。</p>
  </div>
  <div className="rounded-xl border border-amber-300 bg-amber-50 p-4 dark:border-amber-700 dark:bg-amber-950">
    <div className="text-xs font-semibold uppercase tracking-wide text-amber-700 dark:text-amber-300">Bond</div>
    <div className="mt-1 text-lg font-semibold text-amber-950 dark:text-amber-50">屏蔽 [shielded] 质押</div>
    <p className="mt-1 text-sm text-amber-900 dark:text-amber-100">它存在于质押 pool 中。它指定一个目标 finalizer。</p>
  </div>
</div>

## 重要的顺序

<div className="my-4 rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-600 dark:bg-slate-800">
  <div className="flex flex-wrap items-center gap-2 font-semibold">
    <span className="rounded-full bg-emerald-600 px-3 py-1 text-sm text-white">1 挖矿</span>
    <span className="text-slate-400">→</span>
    <span className="rounded-full bg-blue-600 px-3 py-1 text-sm text-white">2 屏蔽</span>
    <span className="text-slate-400">→</span>
    <span className="rounded-full bg-amber-600 px-3 py-1 text-sm text-white">3 Bond</span>
  </div>
  <p className="mt-3 mb-0 text-slate-800 dark:text-slate-100">跳过屏蔽步骤，私密步骤就永远不会发生。Bond 不会抹除透明 coinbase。</p>
</div>

## 哪些信息是公开的

| 项目 | 公开？ | 原因 |
|---|---|---|
| 矿工 t-地址和 coinbase 历史记录 | 是 | 常规透明输出 |
| Finalizer 密钥和 zfinv1 | 是，进入名单后 | 必须如此，才能验证投票 |
| 投票权和奖励银行 | 是 | 会根据 finalizer 密钥发布，以便审计质押分布 |
| 哪个透明地址为 bond 提供资金 | 否，在屏蔽后 | Bond 会花费屏蔽 note [note] |
| 从您的矿工到您的 finalizer 的关联 | 不在链上 [on-chain] | 协议中没有任何内容会写入该关联 |

质押金额是有意公开的。该设计需要让质押总额以及各 finalizer 之间的分布能够被公开核查。量化（10 的幂）和固定的质押窗口限制了个人时间或模式信息的泄露量，同时仍允许进行该审计。未质押的 Orchard 余额保持私密；质押是有意进行的信息披露。

## 为自己质押，或为他人质押

<div className="grid gap-3 my-4 sm:grid-cols-2">
  <div className="rounded-xl border border-slate-300 bg-white p-4 dark:border-slate-600 dark:bg-slate-800">
    <div className="font-semibold text-slate-900 dark:text-slate-50">Bond 到您自己的 finalizer</div>
    <p className="mt-2 mb-0 text-sm text-slate-700 dark:text-slate-200">最简单的方式。您保留运营者角色和 bond。观察者仍无法仅凭链数据证明 t-地址和 zfinv1 属于同一个人。</p>
  </div>
  <div className="rounded-xl border border-amber-300 bg-amber-50 p-4 dark:border-amber-700 dark:bg-amber-950">
    <div className="font-semibold text-amber-950 dark:text-amber-50">Bond 到另一位成员</div>
    <p className="mt-2 mb-0 text-sm text-amber-900 dark:text-amber-100">投票权会显示在他们的密钥之下。他们获得 10% 的活跃 finalizer 佣金。您保留 bond 上累积的 90%。这打破了一个显而易见的猜测：获得透明收益的矿工与运营 finalizer 的人是同一个人。</p>
  </div>
</div>

一个群组可以在不同的收益地址上挖矿、进行屏蔽，并在成员之间分配 bond。这样就更难仅根据链数据断言“这个矿工就是这个 finalizer”。这不会隐藏 finalizer 是谁，也不会隐藏挖矿活动。

## 这不会做到什么

<div className="my-4 rounded-xl border border-rose-300 bg-rose-50 p-4 dark:border-rose-700 dark:bg-rose-950">
  <div className="font-semibold text-rose-700 dark:text-rose-300">未隐藏</div>
  <ul className="mt-2 mb-0 text-rose-950 dark:text-rose-100">
    <li>Finalizer 是谁</li>
    <li>每个 finalizer 拥有多少投票权</li>
    <li>您的透明挖矿历史</li>
    <li>您在链下创建的关联：一个 IP、一个收益模式、一个运营者</li>
  </ul>
</div>

目标 zfinv1 位于质押操作内部。这里的隐私关乎资金来源，而不是隐藏目标密钥。

## 简短版本

挖矿。屏蔽。然后 bond。除非您亲自将它们关联起来，否则矿工地址和 finalizer 密钥将保持互不相关。
