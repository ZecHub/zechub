<a href="https://github.com/Zechub/zechub/edit/main/site/Zcash_Community/Zcash_Ecosystem_Security.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Zcash Ecosystem Security

Last reviewed: May 2026.

This page summarizes public security resources for Zcash ecosystem contributors. Do not disclose exploitable vulnerability details in public issues, public pull requests, social media, or chat rooms.

## Ecosystem Security Lead

The Zcash Ecosystem Security Lead role began as a Zcash Community Grants proposal by [earthrise](https://forum.zcashcommunity.com/t/zcash-ecosystem-security-lead/42090). The role focused on supporting security work across the wider Zcash ecosystem, especially for ZCG-funded projects outside ECC and the Zcash Foundation.

After the original grant, ZCG opened an [RFP for a new Ecosystem Security Lead](https://forum.zcashcommunity.com/t/rfp-zcash-ecosystem-security-lead-2023/45723). In 2024, ZCG selected [Least Authority](https://leastauthority.com/) for the next phase of this work. Updates have been shared on the forum, including the [Least Authority grant update](https://forum.zcashcommunity.com/t/grant-update-zcash-ecosystem-security-lead/47541).

Additional ecosystem security notes are published at [zecsec.com](https://zecsec.com/).

## Responsible Disclosure

Zcash uses coordinated vulnerability disclosure. If you find a security issue:

- report it through the affected project's official security policy;
- include enough detail for maintainers to reproduce and assess the issue;
- keep sensitive details private until the maintainers coordinate a fix and disclosure;
- avoid filing public issues for exploitable bugs.

Public references:

- Zcash security information: [z.cash/support/security](https://z.cash/support/security/2/)
- zcashd security policy: [github.com/zcash/zcash/security/policy](https://github.com/zcash/zcash/security/policy)
- Zebra security policy: [github.com/ZcashFoundation/zebra/security/policy](https://github.com/ZcashFoundation/zebra/security/policy)
- librustzcash security policy: [github.com/zcash/librustzcash/security/policy](https://github.com/zcash/librustzcash/security/policy)
- lightwalletd security policy: [github.com/zcash/lightwalletd/security/policy](https://github.com/zcash/lightwalletd/security/policy)

## ZCG Security and Vulnerability Disclosure Initiative

The Zcash Community Grants security initiative coordinates eligible vulnerability disclosures and bounty handling for covered projects. Disclosure should still begin with the relevant project's SECURITY.md so the maintainers can triage and remediate the issue.

- Initiative announcement: [ZCG Security & Vulnerability Disclosure Initiative](https://forum.zcashcommunity.com/t/zcg-security-vulnerability-disclosure-initiative/55545)
- Program information: [bountyzcash.org](https://bountyzcash.org/)

## Security Announcements and Audits

Security announcements, release notes, and audit reports may be published by multiple ecosystem organizations. Useful starting points include:

- Electric Coin Company security information and announcements: [z.cash/support/security](https://z.cash/support/security/2/)
- Zcash Foundation updates: [zfnd.org](https://zfnd.org/)
- Zcash Community Forum security and grant updates: [forum.zcashcommunity.com](https://forum.zcashcommunity.com/)
- Zcash documentation security warnings: [Security Warnings](https://zcash.readthedocs.io/en/latest/rtd_pages/security_warnings.html)

## Reporter Checklist

Before submitting a report, prepare:

- affected project, version, commit, or deployed service;
- impact summary and affected users or funds;
- reproduction steps or proof of concept, shared privately;
- logs, screenshots, or test data that do not expose unrelated secrets;
- suggested remediation if known;
- preferred name or handle for credit, if you want acknowledgement.
