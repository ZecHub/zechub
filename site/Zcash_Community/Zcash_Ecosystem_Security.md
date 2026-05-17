<a href="https://github.com/Zechub/zechub/edit/main/site/Zcash_Community/Zcash_Ecosystem_Security.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Zcash Ecosystem Security

## Ecosystem Security Lead

The Zcash Ecosystem Security Lead role was established through a ZCG grant to provide dedicated security engineering for the wider Zcash ecosystem — particularly ZCG grantees — outside of ECC and ZF.

- **2022–2023:** [earthrise](https://forum.zcashcommunity.com/t/zcash-ecosystem-security-lead/42090) served as the first Ecosystem Security Lead. Learn more at [zecsec.com](https://zecsec.com).
- **2024–2025:** ZCG selected [Least Authority](https://leastauthority.com) to continue the role via a new [RFP](https://forum.zcashcommunity.com/t/rfp-zcash-ecosystem-security-lead-2023/45723). Updates can be found [here](https://forum.zcashcommunity.com/t/grant-update-zcash-ecosystem-security-lead/47541).
- **2026:** Shielded Labs [engaged Taylor Hornby](https://forum.zcashcommunity.com/t/shielded-labs-engages-taylor-hornby-as-security-consultant/55421) as a security consultant to bolster Zcash's security capabilities.

## ZCG Security & Vulnerability Disclosure Initiative

The [ZCG Security & Vulnerability Disclosure Initiative](https://forum.zcashcommunity.com/t/zcg-security-vulnerability-disclosure-initiative/55545) provides a framework for coordinated disclosure of security vulnerabilities across the Zcash ecosystem.

## Recent Security Updates (2026)

- **Zebra 4.4.1 (May 2026):** [Critical security fix](https://forum.zcashcommunity.com/t/zebra-4-4-1-critical-security-fix/55588) released. All node operators are encouraged to upgrade immediately.
- **Zebra 4.3.1 (April 2026):** [Critical security fixes, dockerized mining and CI hardening](https://forum.zcashcommunity.com/t/zebra-4-3-1-critical-security-fixes-dockerized-mining-and-ci-hardening/55389) released.
- **Multiple Vulnerabilities Remediated (April 2026):** [Several Zcash vulnerabilities successfully patched](https://forum.zcashcommunity.com/t/several-zcash-vulnerabilities-successfully-remediated/55388) without affecting user funds or privacy.
- **zcashd Advisory (April 2026):** [Advisory to reduce zcashd attack surface](https://forum.zcashcommunity.com/t/advisory-reduce-your-zcashd-attack-surface-by-shielding-it-behind-zebra/55390) by routing traffic through Zebra.

## Responsible Disclosure

The Electric Coin Company and Zcash Foundation both conform to this Responsible Disclosure [standard](https://github.com/RD-Crypto-Spec/Responsible-Disclosure/tree/d47a5a3dafa5942c8849a93441745fdd186731e6) with the following deviation:

> "Zcash is a technology that provides strong privacy. Notes are encrypted to their destination, and then the monetary base is kept via zero-knowledge proofs intended to only be creatable by the real holder of Zcash. If this fails, and a counterfeiting bug results, that counterfeiting bug might be exploited without any way for blockchain analyzers to identify the perpetrator or which data in the blockchain has been used to exploit the bug. Rollbacks before that point, such as have been executed in some other projects in such cases, are therefore impossible. The standard describes reporters of vulnerabilities including full details of an issue, in order to reproduce it. This is necessary for instance in the case of an external researcher both demonstrating and proving that there really is a security issue, and that security issue really has the impact that they say it has — allowing the development team to accurately prioritize and resolve the issue. In the case of a counterfeiting bug, however, just like in CVE-2019-7167, we might decide not to include those details with our reports to partners ahead of coordinated release, so long as we are sure that they are vulnerable."

## Security Resources

- [Zcash Security Advisories](https://github.com/zcash/zcash/security/advisories)
- [Zebra Security Advisories](https://github.com/ZcashFoundation/zebra/security/advisories)
- [Report a Vulnerability to ECC](https://electriccoin.co/blog/disclosure-of-a-major-bug-in-cryptonote-based-currencies/)
- [Report a Vulnerability to ZF](https://zfnd.org/contact/)
