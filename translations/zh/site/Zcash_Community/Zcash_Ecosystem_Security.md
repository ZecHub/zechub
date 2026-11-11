<a href="https://github.com/Zechub/zechub/edit/main/site/Zcash_Community/Zcash_Ecosystem_Security.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Zcash 生态系统安全

## 生态系统安全负责人

Zcash生态系统安全负责人的职位通过一项ZCG拨款 [grant]设立，旨在为更广泛的Zcash生态系统提供专门的安全工程支持，尤其是ZCG受资助者，并且独立于ECC和 ZF。

- **2022–2023：** [earthrise](https://forum.zcashcommunity.com/t/zcash-ecosystem-security-lead/42090)担任首位生态系统安全负责人。更多信息请参阅[zecsec.com](https://zecsec.com)。
- **2024–2025：** ZCG通过新的[RFP](https://forum.zcashcommunity.com/t/rfp-zcash-ecosystem-security-lead-2023/45723)，选定[Least Authority](https://leastauthority.com)继续担任该职位。更新内容可在[此处](https://forum.zcashcommunity.com/t/grant-update-zcash-ecosystem-security-lead/47541)查看。
- **2026：** Shielded Labs聘请[Taylor Hornby](https://forum.zcashcommunity.com/t/shielded-labs-engages-taylor-hornby-as-security-consultant/55421)担任安全顾问，以加强Zcash的安全能力。

## ZCG安全与漏洞披露倡议

[ZCG安全与漏洞披露倡议](https://forum.zcashcommunity.com/t/zcg-security-vulnerability-disclosure-initiative/55545)为协调披露Zcash生态系统中的安全漏洞提供了框架。

## 最新安全更新（2026）

- **Zebra 4.4.1（2026 年 5 月）：** 已发布[关键安全修复](https://forum.zcashcommunity.com/t/zebra-4-4-1-critical-security-fix/55588)。鼓励所有节点 [node]运营者立即升级。
- **Zebra 4.3.1（2026 年 4 月）：** 已发布[关键安全修复、Docker 化挖矿 [mining]及 CI 加固](https://forum.zcashcommunity.com/t/zebra-4-3-1-critical-security-fixes-dockerized-mining-and-ci-hardening/55389)。
- **已修复多个漏洞（2026 年 4 月）：** [多个Zcash漏洞已成功修补](https://forum.zcashcommunity.com/t/several-zcash-vulnerabilities-successfully-remediated/55388)，未影响用户资金或隐私 [privacy]。
- **zcashd公告（2026 年 4 月）：** [通过将流量路由至Zebra以减少zcashd攻击面](https://forum.zcashcommunity.com/t/advisory-reduce-your-zcashd-attack-surface-by-shielding-it-behind-zebra/55390)的公告。

## 负责任披露

Electric Coin Company和Zcash Foundation均遵循此负责任披露[标准](https://github.com/RD-Crypto-Spec/Responsible-Disclosure/tree/d47a5a3dafa5942c8849a93441745fdd186731e6)，但存在以下偏差：

> "Zcash是一项提供强大隐私的技术。note [note] 会被加密 [encryption]至其目的地，随后货币基础通过零知识 [zero-knowledge]证明 [proof]加以维持，这些证明旨在只能由Zcash的真实持有者创建。如果这一机制失效并导致伪造漏洞，该伪造漏洞可能会在 blockchain 分析者无法识别肇事者，或无法识别 blockchain 中哪些数据被用于利用该漏洞的情况下遭到利用。因此，回滚至该时间点之前是不可能的；某些其他项目曾在此类情况下执行过此类回滚。该标准规定，漏洞报告者应包含问题的完整细节，以便重现漏洞。例如，在外部研究人员既演示又证明确实存在安全问题，且该安全问题确实具有其所声称的影响时，这是必要的——这样开发团队便能准确地确定优先级并解决问题。然而，对于伪造漏洞，就像 CVE-2019-7167 一样，只要我们确信合作伙伴存在漏洞，我们可能会决定在协调发布前向合作伙伴提交的报告中不包含这些细节。"

## 安全资源

- [Zcash安全公告](https://github.com/zcash/zcash/security/advisories)
- [Zebra安全公告](https://github.com/ZcashFoundation/zebra/security/advisories)
- [报告 zcash/zcash 中的漏洞](https://github.com/zcash/zcash/security/policy)
- [向 ZF 报告漏洞](https://github.com/ZcashFoundation/zebra/security/policy)
