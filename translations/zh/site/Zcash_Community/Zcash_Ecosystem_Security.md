<a href="https://github.com/Zechub/zechub/edit/main/site/Zcash_Community/Zcash_Ecosystem_Security.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="编辑页面"/>
</a>

# Zcash 生态安全

## 生态安全负责人

Zcash 生态安全负责人这一角色通过 ZCG 资助设立，旨在为更广泛的 Zcash 生态系统——特别是 ZCG 受资助项目——在 ECC 和 ZF 之外提供专门的安全工程支持。

- **2022–2023：** [earthrise](https://forum.zcashcommunity.com/t/zcash-ecosystem-security-lead/42090) 担任首位生态安全负责人。更多信息见 [zecsec.com](https://zecsec.com)。
- **2024–2025：** ZCG 通过新的 [RFP](https://forum.zcashcommunity.com/t/rfp-zcash-ecosystem-security-lead-2023/45723) 选择了 [Least Authority](https://leastauthority.com) 继续承担该角色。更新可在[这里](https://forum.zcashcommunity.com/t/grant-update-zcash-ecosystem-security-lead/47541)查看。
- **2026：** Shielded Labs [聘请 Taylor Hornby](https://forum.zcashcommunity.com/t/shielded-labs-engages-taylor-hornby-as-security-consultant/55421) 担任安全顾问，以加强 Zcash 的安全能力。

## ZCG 安全与漏洞披露倡议

[ZCG 安全与漏洞披露倡议](https://forum.zcashcommunity.com/t/zcg-security-vulnerability-disclosure-initiative/55545) 为整个 Zcash 生态系统中的安全漏洞协调披露提供了一个框架。

## 最新安全更新（2026）

- **Zebra 4.4.1（2026 年 5 月）：** 已发布[关键安全修复](https://forum.zcashcommunity.com/t/zebra-4-4-1-critical-security-fix/55588)。建议所有节点运营者立即升级。
- **Zebra 4.3.1（2026 年 4 月）：** 已发布[关键安全修复、Docker 化挖矿与 CI 加固](https://forum.zcashcommunity.com/t/zebra-4-3-1-critical-security-fixes-dockerized-mining-and-ci-hardening/55389)。
- **已修复多个漏洞（2026 年 4 月）：** [多个 Zcash 漏洞已成功修补](https://forum.zcashcommunity.com/t/several-zcash-vulnerabilities-successfully-remediated/55388)，未影响用户资金或隐私。
- **zcashd 公告（2026 年 4 月）：** 通过将流量路由到 Zebra，[降低 zcashd 攻击面](https://forum.zcashcommunity.com/t/advisory-reduce-your-zcashd-attack-surface-by-shielding-it-behind-zebra/55390)的公告已发布。

## 负责任披露

Electric Coin Company 和 Zcash Foundation 均遵循这一负责任披露[标准](https://github.com/RD-Crypto-Spec/Responsible-Disclosure/tree/d47a5a3dafa5942c8849a93441745fdd186731e6)，但有以下偏离：

> “Zcash 是一种提供强隐私保护的技术。Notes 会被加密发送到其目标地址，而货币基础则通过零知识证明来维持，这些证明按设计应当只能由 Zcash 的真实持有者创建。如果这一机制失效，并出现伪造漏洞，那么该漏洞可能会被利用，而区块链分析人员无法识别实施者，也无法识别区块链中的哪些数据被用来利用该漏洞。因此，无法像其他一些项目在类似情况下所做的那样，在事发前的某个时间点进行回滚。该标准要求漏洞报告者提供包括问题完整细节在内的信息，以便复现。这在某些情况下是必要的，例如外部研究人员既演示又证明确实存在安全问题，并且该安全问题确实具有其所声称的影响——从而使开发团队能够准确地确定优先级并解决问题。然而，对于伪造漏洞，就像 CVE-2019-7167 一样，只要我们确信合作伙伴同样受到该漏洞影响，我们可能会决定在协调发布之前提交给合作伙伴的报告中不包含这些细节。”

## 安全资源

- [Zcash 安全公告](https://github.com/zcash/zcash/security/advisories)
- [Zebra 安全公告](https://github.com/ZcashFoundation/zebra/security/advisories)
- [向 ECC 报告漏洞](https://electriccoin.co/blog/disclosure-of-a-major-bug-in-cryptonote-based-currencies/)
- [向 ZF 报告漏洞](https://zfnd.org/contact/)
