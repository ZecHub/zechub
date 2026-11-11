<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Shielded_Coinholder_Voting.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="编辑页面"/>
</a>

# 屏蔽持币者投票 [Shielded Coinholder Voting]

> 2026 年 8 月，Zcash 开展了一项持币者投票，其中选票保持加密状态，仅公布最终总数；该投票使用了由 Valar Group 构建的屏蔽投票协议。

你将了解：投票如何能够根据你持有的 ZEC 数量加权、保持私密，同时仍被正确计票，而且没有任何人能得知你的投票选择或持有数量。

屏蔽持币者投票让 Zcash 持有者能够使用其屏蔽 ZEC 对生态系统问题进行投票。没有人会知道任何个人投了什么，或其持有多少 ZEC，但任何人都可以审计总数是否正确。它运行在由 Valar Group 构建的专用投票链上，与 Zcash 主网分离，因此你的真实资金不会移动。如需了解 Zcash 如何在更广泛层面作出决策，请参阅 [Zcash 资金与治理概览](../zcash-community/zcash-governance)。本页仅介绍加密投票协议。

刚接触 Zcash？请先阅读 [什么是 ZEC 以及 Zcash](../start-here/what-is-zec-and-zcash)、[屏蔽池](../using-zcash/shielded-pools) 和 [zk-SNARKs](../zcash-tech/zk-snarks)，然后再回到这里。

![Shielded voting flow: a voter proves their Ironwood balance at a snapshot, casts an encrypted ballot split into shares, which are homomorphically tallied and then threshold-decrypted into totals only](/content-images/shielded-voting-flow.webp)

## 为什么私密投票很难

一场好的持币者投票同时需要四项要素，而实现它们的显而易见方法彼此冲突。

1. 按持币量加权，因此持有更多 ZEC 就拥有更大权重。
2. 选择的隐私 [privacy]，因此没有人知道你如何投票。
3. 余额隐私，因此没有人知道你持有多少 ZEC。
4. 任何人都可检查的正确、可审计计票。

要按持币量加权，似乎需要知道每个人的余额。要统计选票，似乎需要打开它们。以朴素方式执行任一操作，都会泄露 [屏蔽 pool](../using-zcash/shielded-pools) 为保护而存在的私密信息；早期的持币投票也因此泄露了余额信息。屏蔽投票利用驱动屏蔽支付的相同工具解决了这种矛盾：[零知识证明](../zcash-tech/zk-snarks)、nullifier 和加密 [encryption]。

## 直觉：一个会自行计票的投票箱

> turnstile 可以让你统计通过银行金库的物品，而无需查看内部。屏蔽投票箱更进一步：它无需打开密封选票就能将票数相加。

设想一个具有三种非同寻常能力的投票箱。它可以将密封信封加入运行总数而无需打开它。随后，一组官员——没有任何单一官员持有密钥——仅公布最终总数。而在你可以投入信封之前，你会私下证明你在某个固定过去时点持有 ZEC，且尚未投票，无需显示哪些币属于你。以下内容说明这个投票箱实际上是如何构建的。

## 资格与快照

一轮投票会固定一个快照高度，即一个 Zcash 主网区块，而你的权重是该区块中 [Ironwood](../zcash-tech/ironwood) pool 内可花费的屏蔽余额。规则很简单：快照时每 1 个 Ironwood ZEC 等于 1 票。对于 NU7 范围投票，快照为主网区块 3,459,350，约为 2026 年 8 月 24 日 19:00 UTC，投票开放至 2026 年 9 月 14 日 19:00 UTC。透明 ZEC 由较旧的方法单独处理，而非通过本协议。

1. 你的资金不会移动，也不会被锁定。资格在快照时固定，因此你可以在之后立即花费或移动 ZEC，而不会影响投票。
2. 没有注册步骤。仅需一个快照高度，这使流程轻量化，并避免暴露谁打算投票。

## 在不透露余额的情况下证明它

当你投票时，你的钱包会生成一项零知识证明，证明在快照时你控制着一些未花费的屏蔽 ZEC。它向私密计票机制证明有效余额及其数额，但不透露任何 note，也不会在 Zcash 主网上产生交易 [transaction]。

该证明会在投票链上铸造一份等于你快照余额的投票额度，由你的钱包专为本轮生成的全新投票密钥拥有。由于该密钥是新的，且与 Zcash 地址无关联，投票链上的任何内容都无法追溯到你的真实 note。你的链上身份与选票在设计上不可关联 [unlinkable]。

## 私密地防止重复投票

为防止任何人使用相同币两次投票，系统必须确认你余额背后的 note 在快照时尚未花费。在主网上，这是通过公开 note 的 nullifier——其唯一花费标记——实现的，全节点会检查其是否被重复使用。但在此处公开你的 nullifier 会将选票直接关联回你的 note。

![Private double-vote prevention: instead of revealing a nullifier, the wallet uses Private Information Retrieval to fetch proof material while hiding which nullifier it asked about, then proves the note was unspent](/content-images/shielded-voting-pir.webp)

因此，协议会私下证明相反的事情。它构建截至快照时所有已使用 nullifier 的列表，而你的钱包通过零知识证明你的 note 的 nullifier 不在该列表中，从而在不透露是哪一笔 note 的情况下表明该 note 未被花费。

还有一个问题。向服务器获取该列表所需的部分会向服务器暴露你的 nullifier，而完整列表很大，对于 Orchard 时代的数据约为 2 GB，并且随着 Zcash 增长而大得多。[私密信息检索 Private Information Retrieval](../zcash-tech/private-information-retrieval)（PIR）同时解决了这两个问题：你的钱包精确获取所需数据，同时通过加密方式隐藏其请求了哪些数据。结果会根据已发布的 nullifier 列表摘要进行检查，因此不诚实的服务器无法伪造虚假结果。

## 投出加密选票

对于每个问题，你的钱包会做三件事。

1. 它使用同态加密将你的投票权重加密给计票委员会。同态加密是一种可在不解密的情况下将密文相加的加密方式。这使投票箱能够汇总它无法读取的投票。
2. 它将你的投票拆分为 16 个独立份额，因此即使完全串通的委员会也难以重组任何一个人投了多少。
3. 它通过多个服务器在随机时间提交这些份额，因此观察者无法通过到达时间判断这些份额属于同一位投票者。

每个份额都附带自己的零知识证明，以表明它是有效选票的合法组成部分，因此没有人能够添加无依据的投票。经验证的份额会通过同态方式加入你所选答案的加密运行总数。

## 不打开任何选票的计票

计票由分布式选举机构执行：至少 10 个投票链验证者，没有任何单一验证者能够解密任何内容。在一轮开始时，它们共同运行密钥生成仪式，产生一个加密密钥；其对应解密密钥被拆分到所有验证者之间，且绝不会在一个地方组装。

> 没有单一官员持有密钥。只有当其中三分之二共同使用其密钥时，投票箱才会打开，而且即使如此，它也只会公布总数。

当本轮结束时，加密总数已通过上文的同态相加产生。每个验证者发布一份部分解密结果以及一项证明其正确解密的证明。一旦至少三分之二作出贡献，它们的部分便会组合成每个问题最终的明文计数，而其他任何内容都不会被解密。之后，任何全节点都可以检查组合后的正确性证明，因此公众无需信任验证者即可验证计票。

## 谁在运行它，以及他们不能做什么

该设计分离了两个角色，因此没有任何群体拥有过多权力。

![Separation of powers: a coordinator multisig sets which questions appear but cannot see votes, while a validator set counts but cannot read individual ballots or forge a tally](/content-images/shielded-voting-roles.webp)

协调者多签名是一个 2-of-5 群体，成员代表来自 Project Tachyon、[Zcash Foundation](../zcash-organizations/zcash-foundation)、ZODL、[Shielded Labs](../zcash-organizations/shielded-labs) 和 Valar Group。它决定哪些问题进入链上，并证明每轮的加密密钥，但它无法查看、更改或阻止个人投票。由于软件是开源且无需许可的，任何不喜欢这些问题的人都可以运行自己的投票链。

验证者是持有拆分解密密钥并执行阈值解密的至少 10 个节点。它们无法解密个人选票或伪造错误计数，因为每次解密都附带公开的正确性证明。

## 法定人数的用途

组织者设定参与门槛：只有至少 1,000,000 ZEC 参与至少一个问题（包括弃权）时，投票结果才被视为具有持币者代表性。法定人数不决定任何问题，也不按问题分别应用。它是对整场投票的单一检查，因此只有在大量 ZEC 参与时，结果才会被认真对待。低于该水平，结果不会被视为有意义的信号。

## 本协议无法防御的事项

清楚说明边界是理解该设计的一部分。

1. 它是一项信号，而非具有约束力的决定。持币者投票衡量按持币量加权的情绪，并融入 Zcash 的常规 [治理流程](../zcash-community/zcash-governance)，而非取代它。
2. 它按持币量加权，因此影响力随持有量而定。较低的摩擦可能提高投票率，但不会改变 ZEC 的集中程度。
3. 议程由协调者多签名设定，其选择显示哪些问题。它无法触及投票，且任何人都可以运行竞争链，但议程设定仍然是一个影响点。
4. 计票需要验证者在线。产生计数结果需要其中至少三分之二合作，因此大规模故障或协调拒绝可能延迟结果。
5. 完全串通情况下的余额隐私是深度防御，而非定理。如果整个委员会秘密重建密钥，份额拆分和定时提交将保护你的余额，而设计者承认它们在串通情况下较弱。复杂流量分析仍是一种残余风险。
6. 比旧设计有更多可移动部分。PIR 服务器、提交服务器、全新的投票密钥和多阶段证明，都是可能出现错误或配置错误的地方。系统是开源的，部分组件已接受独立审计；这管理了风险，而非消除了风险。

它强力且可验证地保护了最重要的两件事：你的选票无法与你的身份关联，且仅会公布最终总数。

## 术语表

| 术语 | 通俗含义 |
|---|---|
| Voting chain | 由 Valar Group 构建的独立 blockchain，用于运行投票；你的 Zcash note 永远不会移至其上 |
| Snapshot height | 其余额决定投票权重的主网区块（NU7 投票为区块 3,459,350） |
| Nullifier | note 的唯一花费标记；公开它会将选票关联到 note，因此投票改为证明非成员关系 |
| Private Information Retrieval (PIR) | 从服务器获取数据，同时隐藏你请求了哪些数据 |
| Homomorphic encryption | 可在不解密的情况下将密文相加的加密方式 |
| Coordinator multisig | 授权问题和本轮密钥的 2-of-5 群体，但无法查看或更改投票 |
| Election authority | 共同持有拆分解密密钥、仅公布最终计数的 10 个或更多验证者 |
| Threshold decryption | 仅当足够多密钥份额持有者——此处为三分之二——合作时才恢复结果 |
| Quorum | 投票被视为具有代表性所需的最低 1,000,000 ZEC 参与量 |

## 常见问题

我投票时，我的币会移动或被锁定吗？不会。资格在快照区块时衡量，因此你的 ZEC 保持原位且可花费。投票会在独立链上生成证明，而非生成 Zcash 交易。

有人能知道我如何投票或我持有多少吗？不能。选票经过加密，仅对聚合总数进行解密。你的投票与你的身份不可关联，而你的余额被拆分为 16 个定时份额，即使面对串通委员会也能保护它。

是什么阻止某人投票两次，或用其并不拥有的币投票？每张选票都附带零知识证明，表明其由真实、未花费的快照余额支持；基于 PIR 的非成员证明表明底层 note 尚未被花费，且不透露是哪一笔 note。

谁来统计投票？至少 10 个验证者组成的分布式集合，其中没有任何一个能单独解密任何内容。必须有三分之二合作才能公布总数，并且每次解密都附带公开的正确性证明。

结果具有约束力吗？它是一项按持币量加权的持币者情绪信号。它为 Zcash 的常规治理提供参考，而非自动实施变更。

我可以自行运行或审计吗？可以。投票链软件、电路、PIR 系统和计数审计器均由 Valar Group 发布，任何人都可检查和运行。

## 测试你的理解

如果每张选票都经过加密且每位投票者都是匿名的，任何人如何确信已发布的总数正确，并且没有人投票两次？

<details>
<summary>答案</summary>

三项证明完成这项工作。每张选票都附带零知识证明，表明它由真实快照余额支持，因此不会计入无依据的投票。基于 PIR 的非成员证明表明其背后的 note 未被花费，从而在不透露该 note 的情况下防止重复投票。而当验证者解密总数时，每个验证者都会发布正确性证明，因此任何全节点都能确认最终数字是从加密选票中诚实解密得出的。
</details>

## 资源

- [NU7 持币者投票公告（Valar Group 和 Project Tachyon）](https://forum.zcashcommunity.com/t/nu7-coinholder-vote/56912) - 说明投票范围、快照高度和时间表的论坛帖子
- [持币者投票链：技术设计](https://forum.zcashcommunity.com/t/the-coinholder-voting-chain/56925) - 本页所依据的协议说明
- [Valar Group 屏蔽投票文档](https://valargroup.gitbook.io/shielded-vote-docs) - 投票链的维护参考资料
- [Valar Group 投票代码和审计（GitHub）](https://github.com/valargroup/vote-sdk) - 开源实现及其审计

## 相关页面

- [私密信息检索](../zcash-tech/private-information-retrieval) - 私密防止重复投票背后的非成员证明技术
- [Ironwood](../zcash-tech/ironwood) - 其余额决定投票权重的屏蔽 pool
- [zk-SNARKs](../zcash-tech/zk-snarks) - 余额与资格证明背后的证明系统
- [屏蔽池](../using-zcash/shielded-pools) - 什么是屏蔽余额，以及它为何保持隐藏
- [Zcash 资金与治理概览](../zcash-community/zcash-governance) - 这项情绪信号如何融入 Zcash 的更广泛决策流程
- [Shielded Labs](../zcash-organizations/shielded-labs) - 协调者多签名的五名成员之一
