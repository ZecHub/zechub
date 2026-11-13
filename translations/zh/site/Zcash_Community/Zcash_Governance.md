# Zcash 资金与治理概览

Zcash 的链上 [on-chain] 资金模式、区块奖励机制，以及主要组织的角色

## 1. Zcash 区块奖励如何运作

Zcash 是一种工作量证明 [Proof-of-Work] 加密货币。每个挖出的区块都会根据由网络升级 [network upgrade] 设定的固定协议规则，分配其 **区块补贴 [block subsidy]**（新创建的 ZEC）以及交易 [transaction] 手续费 [fee]。

- **当前模式（NU6.1 / 自 2025 年 11 月 24 日起）**  
  分配如下：

| 接收方                      | 百分比 | 资金用途 / 状态                                      |
|--------------------------------|------------|-------------------------------------------------------------|
| 矿工                         | 80%        | 直接向矿工发放区块奖励                               |
| Zcash Community Grants（ZCG）   | 8%         | 社区拨款（持续至约 2028 年）                  |
| 持币者控制基金（Coinholder-Controlled Fund）     | 12%        | 由原 Lockbox 的资金注入；持币者对拨款进行投票（[ZIP 1016](https://zips.z.cash/zip-1016)） |

- **NU6 之前的历史开发基金（2020 年至 2024 年 11 月）**  
  每个区块补贴的 20% 直接流向开发组织：

  - 7% -> Electric Coin Company（ECC）/ Bootstrap 项目  
  - 5% -> Zcash Foundation（ZF）  
  - 8% -> Zcash Community Grants（ZCG）

这项 20% 的"开发基金"通过 [ZIP 1015](https://zips.z.cash/zip-1015)（NU6，2024 年 11 月）被 8% ZCG + 12% Lockbox 模式取代。从 2024 年 11 月到 2025 年 11 月，这 12% 的资金一直累积在延期开发基金 Lockbox（Deferred Dev Fund Lockbox）中，无法动用。

### 当前模式：ZIP 1016——社区与持币者资金模式
ZIP 1016（创建于 2025 年 2 月）于 2025 年 11 月 24 日通过 [NU6.1](/zcash-tech/nu6-1) 在区块 3,146,400 处于主网激活（[ZIP 255](https://zips.z.cash/zip-0255)）。它：
- 继续向 ZCG 分配 8%。
- 已将 12% 的 Lockbox 转换为“持币者控制基金”（由现有 Lockbox 资金 + 持续的 12% 区块补贴注入）。
- 运行至第 3 次减半（halving）（如果 NU7 改变了出块时间，ZIP 允许该日期相应调整）。
- 允许 ZEC 持币者对拨款进行投票（简单多数，最低投票量为 420,000 ZEC）。
- 要求密钥持有组织（目前包括 ZF 和 Shielded Labs，且在拨款情境中提及 Bootstrap/ECC）通过多重签名管理资金发放，并受法律协议和持币者决定的约束。
- 保留 ZIP 1015 对 Lockbox 使用的所有要求（为生态系统拨款提供资金）。

该模式将 12% 分配的治理 [governance] 从组织控制转向由持币者直接治理。它不会改变 ZIP 流程或商标规则。

## 2. 核心组织及其资金来源

**Electric Coin Company（ECC）/ Bootstrap 项目**  
- Zcash 的原始创建者（2016 年）。  
- 历史上在 2024 年 11 月之前获得约 7% 的开发基金。  
- 2026 年 1 月，核心工程和产品团队因治理争议从 Bootstrap/ECC 离职，并成立了 Zcash Open Development Lab（ZODL）。  
- ECC/Bootstrap 不再获得直接协议资金，也不再雇佣主要开发团队。它依赖捐款、赞助和自身金库 [treasury]。  
- 具有历史意义，但不再是活跃的协议开发组织。  
-> 查看完整简介：[Electric Coin Company](https://zechub.wiki/zcash-organizations/electric-coin-company)

**Zcash Open Development Lab（ZODL）**  
- 由原始 Zcash 协议开发者（核心 ECC 工程和产品团队）在离开 Bootstrap/ECC 后于 2026 年 1 月成立。  
- 从包括 a16z Crypto 和 Coinbase Ventures 在内的主要投资者处筹集了超过 2,500 万美元的种子资金。  
- 该团队由 Zcash 协议的原始发明者和开发者组成，持续进行核心协议开发、ZIP 贡献，以及包括 Zodl 移动钱包 [wallet]（由 Zashi 更名而来）在内的以隐私 [privacy] 为重点的工具 [tools] 开发。  
- 没有直接的链上协议资金；作为由风险投资支持的独立实验室运作，专注于推进 Zcash 隐私基础设施。  
-> 查看完整简介：[ZODL](https://zechub.wiki/zcash-organizations/ZODL)  
-> 官方网站：[zodl.com](https://zodl.com/)
  
**Zcash Foundation（ZF）**  
- 独立的 501(c)(3) 非营利组织，专注于基础设施、节点（node）软件、研究和生态系统健康。  
- 历史上获得开发基金的 5%。  
- 在 NU6 后不再获得直接协议资金。依赖捐款和拨款。  
- 持有 Zcash 商标（由 ECC 于 2019 年捐赠），并在治理中发挥核心作用。  
- 运营 Zcash 社区咨询小组（ZCAP），并协助推动社区投票。  
- 根据 ZIP 1016 担任密钥持有组织。  
-> 查看完整简介：[Zcash Foundation](https://zechub.wiki/zcash-organizations/zcash-foundation)  
-> 官方网站：[zfnd.org](https://zfnd.org/)

**Zcash Community Grants（ZCG）**  
- Zcash Community Grants 项目为独立团队和项目提供资金，以开展对 Zcash 生态系统公共利益重要的持续开发及其他工作。  
- 拨款由社区选举产生的委员会决定。  
- 持续获得全部 8% 的区块奖励（NU6 后），并通过 Financial Privacy Foundation 管理。  
- 拨款通过向社区开放的透明申请和投票流程发放。  
-> 查看完整简介：[Zcash Community Grants](https://zechub.wiki/zcash-organizations/zcash-community-grants)  
-> 官方网站：[zcashcommunitygrants.org/](https://zcashcommunitygrants.org/)

**Financial Privacy Foundation（FPF）**  
- 一家在开曼群岛注册成立的非营利组织。  
- 直接从协议获得 8% 的区块补贴分配（根据 ZIP 1015），并为 Zcash Community Grants 项目处理所有法律、财务和运营管理工作。  
- 为 ZCG 运营提供总体架构和行政支持，包括资金发放、合同和合规事务。  
- ZCG 作为 FPF 体系下由社区选举产生的自治实体运作。  
-> 查看完整简介：[Financial Privacy Foundation](https://zechub.wiki/zcash-organizations/financial-privacy-foundation)  
-> 官方网站：[financialprivacyfoundation.org/](https://www.financialprivacyfoundation.org/)

**Shielded Labs**  
- 总部位于瑞士、由捐款资助的独立 Zcash 支持组织。  
- 是 Zcash 生态系统中首个从未获得开发基金或区块奖励直接或间接资金的组织。  
- 专注于使 ZEC 持有者受益的倡议，并优先考虑持有者的声音来塑造 Zcash 的发展方向。  
- 根据 ZIP 1016 担任密钥持有组织，负责管理持币者控制基金。  
- 为协议开发、ZIP 流程和治理作出贡献（ZIP 编辑代表）。  
-> 查看完整简介：[Shielded Labs](https://zechub.wiki/zcash-organizations/shielded-labs)  
-> 官方网站：[shieldedlabs.net](https://shieldedlabs.net/)

## 3. 治理——决策如何制定

Zcash 的治理结合了“链上协议规则”和“链下社会共识 [consensus]”：

1. **ZIP 流程（Zcash 改进提案）**  
   - 任何人都可以提交 ZIP。  
   - 在论坛、Discord、GitHub 上公开讨论。  
   - 目前的 ZIP 编辑包括：以个人身份参与的 Jack Grigg、Daira-Emma Hopwood 和 Kris Nuttycombe；Arya 和 Marek（Zcash Foundation）；Mark Henderson 和 Sam H. Smith（Shielded Labs）；Sean Bowe 和 Tal Derei（Project Tachyon）；以及 Dev Ojha（Valar Group）。
   - ZIP 获批并不意味着会自动安排纳入下一次网络升级。共识（consensus）类 ZIP 需要部署计划和具体实现，其规则将在指定的网络升级区块高度激活。

2. **商标协议（2019-2024）**  
   - ECC 于 2019 年将 Zcash 商标捐赠给 ZF。  
   - 该协议最初要求 ECC 和 ZF 双方共同同意，才能进行任何创建新共识协议的网络升级。  
   - 2024 年 4 月，ECC 宣布有意终止；正式终止通知于 2024 年 8 月发出。  
   - 截至 2025 年，ZF 是 Zcash 商标的唯一管理者，并已采用反映生态系统去中心化的新宽松商标政策。该商标不再作为治理否决机制发挥作用。

3. **Zcash 社区咨询小组（ZCAP）**  
   - 由生态系统专家组成的志愿者团体。  
   - 用于就重大决策进行不具约束力的社区投票。

4. **链上批准**  
   - 网络升级会在预先设定的区块高度激活。从该高度开始，运行兼容软件的节点会执行新的共识规则。未升级的节点可能会继续沿用升级前的共识分支，从而可能导致链分裂。

5. **Lockbox 与 ZIP 1016**  
   - 2024 年 11 月至 2025 年 11 月期间，12% 的 Lockbox 资金在协议中累积。  
   - NU6.1 将这些资金转换为持币者控制基金，由持币者投票，并由密钥持有组织（目前注明为 ZF 和 Shielded Labs）进行多重签名管理。

## 4. 快速参考表——资金演变

| 时期           | 矿工 | ECC/Bootstrap | ZF   | ZCG  | Lockbox | 注释                                      |
|------------------|--------|---------------|------|------|---------|--------------------------------------------|
| 2020 年 - 2024 年 11 月  | 80%    | 7%            | 5%   | 8%   | -       | 经典开发基金                           |
| 2024 年 11 月 - 2025 年 11 月 | 80% | 0%            | 0%   | 8%   | 12%     | NU6 模式 + ZCG 延期                  |
| 2025 年 11 月 - 至今（ZIP 1016） | 80% | 0%   | 0%   | 8%   | 12%（持币者控制） | NU6.1；直至第 3 次减半；持币者投票 |

## 5. 相关资源

- 官方资金说明 -> [z.cash 网络资金部分](https://z.cash/network/?funding=#funding)  
- ZIP 1015（NU6 资金变更）-> [zips.z.cash/zip-1015](https://zips.z.cash/zip-1015)  
- ZIP 1016（持币者模式，自 NU6.1 起生效）-> [zips.z.cash/zip-1016](https://zips.z.cash/zip-1016)  
- Zcash 改进提案 -> [zips.z.cash](https://zips.z.cash)  
- Zcash Community Grants 门户 -> [zcashcommunitygrants.org](https://zcashcommunitygrants.org)

## 6. Lockbox 仪表板

ZecHub 仪表板显示 Lockbox 和持币者基金中当前的 ZEC 数额，[此处](https://zechub.wiki/dashboard?tab=lockbox)。
