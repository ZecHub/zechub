## Zcash Ecosystem Security

Security work in the Zcash ecosystem spans protocol engineering, wallet safety, Zebra and lightwallet infrastructure, grants review, responsible disclosure, and audits for community projects.

Last reviewed: May 2026

## Ecosystem Security Lead

This ecosystem role began as a ZCG grant application by [earthrise](https://forum.zcashcommunity.com/t/zcash-ecosystem-security-lead/42090) to work as a security engineer serving the wider Zcash ecosystem outside of ECC and ZF, with a focus on ZCG grantees.

You can learn more about earthrise's ZecSec work at [zecsec.com](https://zecsec.com), including past audits of Zcash ecosystem projects such as ZGo, zecwallet-lite-cli, the Zcash Ledger app, Free2Z, and YWallet.

After that grant was completed, ZCG put out an [RFP](https://forum.zcashcommunity.com/t/rfp-zcash-ecosystem-security-lead-2023/45723) to find a replacement. At the end of March 2024, ZCG selected [Least Authority](https://leastauthority.com) to step into the role through another grant. You can learn more about Least Authority's work as the Zcash Ecosystem Security Lead [here](https://forum.zcashcommunity.com/t/grant-update-zcash-ecosystem-security-lead/47541).

## Core Infrastructure Stewardship

In May 2026, the Zcash Foundation announced stewardship of core community-facing Zcash assets, including the Zcash GitHub organization, the z.cash website and domain, and the @Zcash X account. This helps centralize accountability for repository governance and long-term protocol infrastructure maintenance.

Read more: [Zcash Foundation Assumes Stewardship of Core Zcash Community Assets](https://zfnd.org/zcash-foundation-assumes-stewardship-of-core-zcash-community-assets/)

## Responsible Disclosure

The Electric Coin Company and Zcash Foundation both conform to this Responsible Disclosure [standard](https://github.com/RD-Crypto-Spec/Responsible-Disclosure/tree/d47a5a3dafa5942c8849a93441745fdd186731e6), with the following deviation:

>"Zcash is a technology that provides strong privacy. Notes are encrypted to their destination, and then the monetary base is kept via zero-knowledge proofs intended to only be creatable by the real holder of Zcash. If this fails, and a counterfeiting bug results, that counterfeiting bug might be exploited without any way for blockchain analyzers to identify the perpetrator or which data in the blockchain has been used to exploit the bug. Rollbacks before that point, such as have been executed in some other projects in such cases, are therefore impossible. The standard describes reporters of vulnerabilities including full details of an issue, in order to reproduce it. This is necessary for instance in the case of an external researcher both demonstrating and proving that there really is a security issue, and that security issue really has the impact that they say it has - allowing the development team to accurately prioritize and resolve the issue. In the case of a counterfeiting bug, however, just like in CVE-2019-7167, we might decide not to include those details with our reports to partners ahead of coordinated release, so long as we are sure that they are vulnerable."
