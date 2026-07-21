# Zcash 资金与治理概览

Zcash 的链上资金模型、区块奖励机制以及主要组织的角色

## 1. Zcash 区块奖励如何运作

Zcash 是一种工作量证明加密货币。每个被挖出的区块都会按照由网络升级设定的固定协议规则，分配其**区块补贴**（新创建的 ZEC）以及交易手续费。

- **当前模型（NU6 之后 / 自 2024 年 11 月起）**  
  截至 2026 年 4 月，分配情况如下：

| 接收方                         | 百分比     | 资金用途 / 状态                                              |
|--------------------------------|------------|-------------------------------------------------------------|
| 矿工                           | 80%        | 直接发放给矿工的区块奖励                                     |
| Zcash Community Grants (ZCG)   | 8%         | 社区资助（持续至约 2028 年）                                 |
| Lockbox（协议控制）            | 12%        | 资金持续累积；尚无支出机制；未来需社区投票决定               |

- **NU6 之前的历史开发基金（2020 年 - 2024 年 11 月）**  
  每个区块补贴的 20% 会直接分配给开发组织：

  - 7% -> Electric Coin Company (ECC) / Bootstrap Project  
  - 5% -> Zcash Foundation (ZF)  
  - 8% -> Zcash Community Grants (ZCG)

这一 20% 的“开发基金”已通过 [ZIP 1015](https://zips.z.cash/zip-1015) 被 8% ZCG + 12% lockbox 模型取代。

### 拟议演进：ZIP 1016 - 社区与持币者资金模型
ZIP 1016（于 2025 年 2 月提出，状态：Proposed）引入了一个更加去中心化的资金模型。其内容包括：
- 继续向 ZCG 分配 8%。
- 将 12% 的 lockbox 转变为“Coinholder-Controlled Fund”（由现有 lockbox 资金 + 持续的 12% 区块补贴共同注入）。
- 启用该模型直至第三次减半（约 3 年）。
- 赋予 ZEC 持币者通过社区定义流程按季度对资助项目进行投票的权力（简单多数，最低法定人数为 420,000 ZEC）。
- 要求 Key-Holder Organizations（当前包括 ZF 和 Shielded Labs，在资助相关语境中也提及 Bootstrap/ECC）通过多重签名管理资金发放，并受法律协议及持币者决策约束。
- 保持 ZIP 1015 对 lockbox 资金用途的全部要求（用于资助生态系统项目）。

该提案旨在将这 12% 的分配从由组织控制转向由持币者直接治理。它不会修改 ZIP 流程或商标规则。

## 2. 核心组织及其资金来源

**Electric Coin Company (ECC) / Bootstrap Project**  
- Zcash 的原始创建者（2016 年）。  
- 历史上在 2024 年 11 月之前一直接收约 7% 的开发基金。  
- 2026 年 1 月，由于治理争议，核心工程与产品团队从 Bootstrap/ECC 集体离职，并成立了 Zcash Open Development Lab (ZODL)。  
- ECC/Bootstrap 不再获得直接的协议资金，也不再雇佣主要开发团队。其资金来源依赖捐赠、赞助和自身储备。  
- 具有重要的历史意义，但已不再是当前活跃的协议开发组织。  
-> 查看完整介绍：[Electric Coin Company](https://zechub.wiki/zcash-organizations/electric-coin-company)

**Zcash Open Development Lab (ZODL)**  
- 由原始 Zcash 协议开发者（即 ECC 核心工程与产品团队）于 2026 年 1 月在离开 Bootstrap/ECC 后成立。  
- 已从包括 a16z Crypto 和 Coinbase Ventures 在内的主要投资者处筹集超过 2500 万美元种子资金。  
- 该团队由 Zcash 协议的原始发明者和开发者组成，继续推进核心协议开发、ZIP 贡献以及以隐私为重点的工具，包括 Zodl 移动钱包（由 Zashi 重新命名而来）。  
- 不直接获得链上协议资金；作为一家由风投注资的独立实验室运营，专注于推进 Zcash 隐私基础设施。  
-> 查看完整介绍：[ZODL](https://zechub.wiki/zcash-organizations/ZODL)  
-> 官方网站：[zodl.com](https://zodl.com/)
  
**Zcash Foundation (ZF)**  
- 独立的 501(c)(3) 非营利组织，专注于基础设施、节点软件、研究和生态系统健康。  
- 历史上接收开发基金中的 5%。  
- 在 NU6 之后不再获得直接协议资金，依赖捐赠和资助。  
- 持有 Zcash 商标（由 ECC 于 2019 年捐赠），并在治理中发挥核心作用。  
- 运营 Zcash Community Advisory Panel (ZCAP)，并帮助推动社区投票。  
- 在拟议的 ZIP 1016 下担任 Key-Holder Organization。  
-> 查看完整介绍：[Zcash Foundation](https://zechub.wiki/zcash-organizations/zcash-foundation)  
-> 官方网站：[zfnd.org](https://zfnd.org/)

**Zcash Community Grants (ZCG)**  
- Zcash Community Grants 计划为独立团队和项目提供资金，用于开展重大持续开发以及其他有利于 Zcash 生态系统公共利益的工作。  
- 资助由社区选举产生的委员会决定。  
- 持续获得全部 8% 的区块奖励（NU6 之后），并通过 Financial Privacy Foundation 管理。  
- 资助通过面向社区开放的透明申请和投票流程发放。  
-> 查看完整介绍：[Zcash Community Grants](https://zechub.wiki/zcash-organizations/zcash-community-grants)  
-> 官方网站：[zcashcommunitygrants.org/](https://zcashcommunitygrants.org/)

**Financial Privacy Foundation (FPF)**  
- 一家在开曼群岛注册成立的非营利组织。  
- 直接从协议接收 8% 的区块补贴分配（根据 ZIP 1015），并负责 Zcash Community Grants 计划的全部法律、财务和运营管理。  
- 为 ZCG 的运作提供伞形架构和行政支持，包括资金发放、合同和合规事务。  
- ZCG 作为 FPF 框架下由社区选举产生的自治实体运作。  
-> 查看完整介绍：[Financial Privacy Foundation](https://zechub.wiki/zcash-organizations/financial-privacy-foundation)  
-> 官方网站：[financialprivacyfoundation.org/](https://www.financialprivacyfoundation.org/)

**Shielded Labs**  
- 总部位于瑞士、依靠捐赠资助的独立 Zcash 支持组织。  
- 是 Zcash 生态系统中首个从未直接或间接接受 Development Fund 或区块奖励资助的组织。  
- 专注于使 ZEC 持有者受益的倡议，并优先考虑持有者在塑造 Zcash 发展方向中的声音。  
- 在拟议的 ZIP 1016 下，作为 Key-Holder Organization 参与 Coinholder-Controlled Fund 的管理。  
- 参与协议开发、ZIP 流程和治理（ZIP 编辑代表）。  
-> 查看完整介绍：[Shielded Labs](https://zechub.wiki/zcash-organizations/shielded-labs)  
-> 官方网站：[shieldedlabs.net](https://shieldedlabs.net/)

## 3. 治理 - 决策是如何形成的

Zcash 的治理是“链上协议规则”与“链下社会共识”的混合体：

1. **ZIP 流程（Zcash Improvement Proposals）**  
   - 任何人都可以提交 ZIP。  
   - 在论坛、Discord、GitHub 上公开讨论。  
   - ZIP 编辑者（目前为以个人身份参与的 Jack Grigg、Daira-Emma Hopwood、Kris Nuttycombe，来自 ZF 的 Arya，以及来自 Shielded Labs 的代表）负责审查并决定是否接受。  
   - 被接受的 ZIP 会纳入下一次网络升级。

2. **商标协议（2019-2024）**  
   - ECC 于 2019 年将 Zcash 商标捐赠给 ZF。  
   - 该协议最初要求，任何创建新共识协议的网络升级都必须同时获得 ECC 和 ZF 的共同同意。  
   - 2024 年 4 月，ECC 宣布有意终止该协议；正式终止通知于 2024 年 8 月发出。  
   - 截至 2025 年，ZF 已成为 Zcash 商标的唯一管理者，并采用了反映生态系统去中心化的新宽松商标政策。商标不再作为治理否决机制发挥作用。

3. **Zcash Community Advisory Panel (ZCAP)**  
   - 由生态系统专家组成的志愿者团体。  
   - 用于围绕重大决策进行不具约束力的社区投票。

4. **链上确认**  
   - 一旦网络升级被部署，网络中的大多数算力必须采用它（如果达成共识，则不存在硬分叉风险）。

5. **未来方向 - Lockbox 与 ZIP 1016**  
   - 12% 的 lockbox 资金正在协议中持续累积。  
   - ZIP 1016 提议将其转变为一个 Coinholder-Controlled Fund，由持币者按季度投票，并由 Key-Holder Organizations（目前提到的是 ZF 和 Shielded Labs）通过多重签名管理。

## 4. 快速参考表 - 资金演变

| 时期             | 矿工   | ECC/Bootstrap | ZF   | ZCG  | Lockbox | 说明                                       |
|------------------|--------|---------------|------|------|---------|--------------------------------------------|
| 2020 年 - 2024 年 11 月 | 80%    | 7%            | 5%   | 8%   | -       | 经典开发基金                               |
| 2024 年 11 月 - 至今 | 80%    | 0%            | 0%   | 8%   | 12%     | NU6 模型 + ZCG 延续                        |
| 拟议中（ZIP 1016） | 80% | 0%         | 0%   | 8%   | 12%（Coinholder-Controlled） | 直到第 3 次减半；由持币者投票 |

## 5. 相关资源

- 官方资金说明 -> [z.cash/network 资金部分](https://z.cash/network/?funding=#funding)  
- ZIP 1015（NU6 资金变更） -> [zips.z.cash/zip-1015](https://zips.z.cash/zip-1015)  
- ZIP 1016（拟议中的持币者模型） -> [zips.z.cash/zip-1016](https://zips.z.cash/zip-1016)  
- Zcash Improvement Proposals -> [zips.z.cash](https://zips.z.cash)  
- Zcash Community Grants 门户 -> [grants.zcashcommunity.com](https://grants.zcashcommunity.com)（或当前 FPF 网站）

## 6. Lockbox 仪表板

ZecHub Dashboard 展示了当前 Lockbox 和 Coinholders fund 中的 ZEC 数量，见[这里](https://zechub.wiki/dashboard?tab=lockbox)。
