<a href="https://github.com/Zechub/zechub/edit/main/site/Zcash_Community/Zcash_Ecosystem_Security.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Editar Página"/>
</a>

# Segurança do Ecossistema Zcash

## Líder de Segurança do Ecossistema

A função de Líder de Segurança do Ecossistema Zcash foi estabelecida por meio de uma concessão da ZCG para fornecer engenharia de segurança dedicada ao ecossistema Zcash mais amplo — especialmente aos beneficiários da ZCG — fora da ECC e da ZF.

- **2022–2023:** [earthrise](https://forum.zcashcommunity.com/t/zcash-ecosystem-security-lead/42090) atuou como o primeiro Líder de Segurança do Ecossistema. Saiba mais em [zecsec.com](https://zecsec.com).
- **2024–2025:** A ZCG selecionou a [Least Authority](https://leastauthority.com) para continuar a função por meio de uma nova [RFP](https://forum.zcashcommunity.com/t/rfp-zcash-ecosystem-security-lead-2023/45723). Atualizações podem ser encontradas [aqui](https://forum.zcashcommunity.com/t/grant-update-zcash-ecosystem-security-lead/47541).
- **2026:** A Shielded Labs [contratou Taylor Hornby](https://forum.zcashcommunity.com/t/shielded-labs-engages-taylor-hornby-as-security-consultant/55421) como consultor de segurança para reforçar as capacidades de segurança da Zcash.

## Iniciativa ZCG de Segurança e Divulgação de Vulnerabilidades

A [Iniciativa ZCG de Segurança e Divulgação de Vulnerabilidades](https://forum.zcashcommunity.com/t/zcg-security-vulnerability-disclosure-initiative/55545) fornece uma estrutura para a divulgação coordenada de vulnerabilidades de segurança em todo o ecossistema Zcash.

## Atualizações Recentes de Segurança (2026)

- **Zebra 4.4.1 (maio de 2026):** [Correção crítica de segurança](https://forum.zcashcommunity.com/t/zebra-4-4-1-critical-security-fix/55588) lançada. Todos os operadores de nó são incentivados a atualizar imediatamente.
- **Zebra 4.3.1 (abril de 2026):** [Correções críticas de segurança, mineração em Docker e endurecimento de CI](https://forum.zcashcommunity.com/t/zebra-4-3-1-critical-security-fixes-dockerized-mining-and-ci-hardening/55389) lançados.
- **Múltiplas Vulnerabilidades Corrigidas (abril de 2026):** [Diversas vulnerabilidades do Zcash corrigidas com sucesso](https://forum.zcashcommunity.com/t/several-zcash-vulnerabilities-successfully-remediated/55388) sem afetar os fundos ou a privacidade dos usuários.
- **Aviso sobre zcashd (abril de 2026):** [Aviso para reduzir a superfície de ataque do zcashd](https://forum.zcashcommunity.com/t/advisory-reduce-your-zcashd-attack-surface-by-shielding-it-behind-zebra/55390) ao encaminhar o tráfego por meio do Zebra.

## Divulgação Responsável

A Electric Coin Company e a Zcash Foundation estão ambas em conformidade com este [padrão](https://github.com/RD-Crypto-Spec/Responsible-Disclosure/tree/d47a5a3dafa5942c8849a93441745fdd186731e6) de Divulgação Responsável, com o seguinte desvio:

> "Zcash is a technology that provides strong privacy. Notes are encrypted to their destination, and then the monetary base is kept via zero-knowledge proofs intended to only be creatable by the real holder of Zcash. If this fails, and a counterfeiting bug results, that counterfeiting bug might be exploited without any way for blockchain analyzers to identify the perpetrator or which data in the blockchain has been used to exploit the bug. Rollbacks before that point, such as have been executed in some other projects in such cases, are therefore impossible. The standard describes reporters of vulnerabilities including full details of an issue, in order to reproduce it. This is necessary for instance in the case of an external researcher both demonstrating and proving that there really is a security issue, and that security issue really has the impact that they say it has — allowing the development team to accurately prioritize and resolve the issue. In the case of a counterfeiting bug, however, just like in CVE-2019-7167, we might decide not to include those details with our reports to partners ahead of coordinated release, so long as we are sure that they are vulnerable."

## Recursos de Segurança

- [Avisos de Segurança do Zcash](https://github.com/zcash/zcash/security/advisories)
- [Avisos de Segurança do Zebra](https://github.com/ZcashFoundation/zebra/security/advisories)
- [Relatar uma Vulnerabilidade à ECC](https://electriccoin.co/blog/disclosure-of-a-major-bug-in-cryptonote-based-currencies/)
- [Relatar uma Vulnerabilidade à ZF](https://zfnd.org/contact/)
