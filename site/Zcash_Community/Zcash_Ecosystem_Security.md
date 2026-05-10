<a href="https://github.com/Zechub/zechub/edit/main/site/Zcash_Community/Zcash_Ecosystem_Security.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

## Zcash Ecosystem Security Lead:

This ecosystem role began as a ZCG grant application by [earthrise](https://forum.zcashcommunity.com/t/zcash-ecosystem-security-lead/42090) to work as a security engineer serving the wider Zcash ecosystem outside of ECC and ZF, with a focus on ZCG grantees. After this grant was completed, ZCG put out an [RFP](https://forum.zcashcommunity.com/t/rfp-zcash-ecosystem-security-lead-2023/45723) to find a replacement. At the end of March 2024, ZCG selected [Least Authority](https://leastauthority.com) to step into the role through another grant. You can follow Least Authority's grant updates in the [Zcash Community Forum thread](https://forum.zcashcommunity.com/t/grant-update-zcash-ecosystem-security-lead/47541).

## Security updates:

- Follow the [Zcash Foundation blog](https://zfnd.org/blog/) for Zebra releases and other ecosystem security updates.
- Node operators should pay close attention to critical Zebra releases, such as the May 2026 [Zebra 4.4.1 critical security fix](https://zfnd.org/zebra-4-4-1-critical-security-fix/).
- ZecSec's earlier work remains a useful reference for ecosystem security practices, and [ZecDev](https://www.zecdev.org/) documents projects inspired by that legacy.


## Responsible Disclosure:

The Electric Coin Company & Zcash Foundation both conform to this Responsible Disclosure [standard](https://github.com/RD-Crypto-Spec/Responsible-Disclosure/tree/d47a5a3dafa5942c8849a93441745fdd186731e6) with the following Deviation: 

>"Zcash is a technology that provides strong privacy. Notes are encrypted to their destination, and then the monetary base is kept via zero-knowledge proofs intended to only be creatable by the real holder of Zcash. If this fails, and a counterfeiting bug results, that counterfeiting bug might be exploited without any way for blockchain analyzers to identify the perpetrator or which data in the blockchain has been used to exploit the bug. Rollbacks before that point, such as have been executed in some other projects in such cases, are therefore impossible.The standard describes reporters of vulnerabilities including full details of an issue, in order to reproduce it. This is necessary for instance in the case of an external researcher both demonstrating and proving that there really is a security issue, and that security issue really has the impact that they say it has - allowing the development team to accurately prioritize and resolve the issue. In the case of a counterfeiting bug, however, just like in CVE-2019-7167, we might decide not to include those details with our reports to partners ahead of coordinated release, so long as we are sure that they are vulnerable."
