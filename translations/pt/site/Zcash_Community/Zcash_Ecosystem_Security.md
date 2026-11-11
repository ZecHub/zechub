<a href="https://github.com/Zechub/zechub/edit/main/site/Zcash_Community/Zcash_Ecosystem_Security.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Editar Página"/>
</a>

# Segurança do ecossistema do Zcash

## Líder de segurança do ecossistema

A função de líder de segurança do ecossistema do Zcash foi estabelecida por meio de um subsídio da ZCG para fornecer engenharia de segurança dedicada ao ecossistema mais amplo do Zcash — especialmente aos beneficiários de subsídios da ZCG — fora da ECC e da ZF.

- **2022–2023:** [earthrise](https://forum.zcashcommunity.com/t/zcash-ecosystem-security-lead/42090) atuou como o primeiro líder de segurança do ecossistema. Saiba mais em [zecsec.com](https://zecsec.com).
- **2024–2025:** A ZCG selecionou a [Least Authority](https://leastauthority.com) para continuar na função por meio de uma nova [RFP](https://forum.zcashcommunity.com/t/rfp-zcash-ecosystem-security-lead-2023/45723). Atualizações podem ser encontradas [aqui](https://forum.zcashcommunity.com/t/grant-update-zcash-ecosystem-security-lead/47541).
- **2026:** A Shielded Labs [contratou Taylor Hornby](https://forum.zcashcommunity.com/t/shielded-labs-engages-taylor-hornby-as-security-consultant/55421) como consultor de segurança para reforçar as capacidades de segurança do Zcash.

## Iniciativa da ZCG de segurança e divulgação de vulnerabilidades

A [Iniciativa da ZCG de segurança e divulgação de vulnerabilidades](https://forum.zcashcommunity.com/t/zcg-security-vulnerability-disclosure-initiative/55545) fornece uma estrutura para a divulgação coordenada de vulnerabilidades de segurança em todo o ecossistema do Zcash.

## Atualizações recentes de segurança (2026)

- **Zebra 4.4.1 (maio de 2026):** [Correção crítica de segurança](https://forum.zcashcommunity.com/t/zebra-4-4-1-critical-security-fix/55588) lançada. Todos os operadores de nós são incentivados a atualizar imediatamente.
- **Zebra 4.3.1 (abril de 2026):** [Correções críticas de segurança, mineração em Docker e endurecimento de CI](https://forum.zcashcommunity.com/t/zebra-4-3-1-critical-security-fixes-dockerized-mining-and-ci-hardening/55389) lançados.
- **Múltiplas vulnerabilidades corrigidas (abril de 2026):** [Diversas vulnerabilidades do Zcash corrigidas com sucesso](https://forum.zcashcommunity.com/t/several-zcash-vulnerabilities-successfully-remediated/55388) sem afetar os fundos ou a privacidade dos usuários.
- **Aviso sobre zcashd (abril de 2026):** [Aviso para reduzir a superfície de ataque do zcashd](https://forum.zcashcommunity.com/t/advisory-reduce-your-zcashd-attack-surface-by-shielding-it-behind-zebra/55390) encaminhando o tráfego por meio do Zebra.

## Divulgação responsável

A Electric Coin Company e a Zcash Foundation estão em conformidade com este padrão de [divulgação responsável](https://github.com/RD-Crypto-Spec/Responsible-Disclosure/tree/d47a5a3dafa5942c8849a93441745fdd186731e6), com o seguinte desvio:

> "O Zcash é uma tecnologia que oferece forte privacidade. As notes são criptografadas para seus destinos, e então a base monetária é mantida por meio de provas de conhecimento zero destinadas a serem criadas apenas pelo verdadeiro detentor de Zcash. Se isso falhar e resultar em um bug de falsificação, esse bug de falsificação poderá ser explorado sem que haja uma forma de analistas de blockchain identificarem o responsável ou quais dados na blockchain foram usados para explorar o bug. Reversões anteriores a esse ponto, como as executadas em alguns outros projetos nesses casos, são, portanto, impossíveis. O padrão descreve que os relatores de vulnerabilidades incluam todos os detalhes de um problema para reproduzi-lo. Isso é necessário, por exemplo, no caso de um pesquisador externo demonstrar e comprovar que realmente existe um problema de segurança e que esse problema de segurança realmente tem o impacto que ele afirma ter — permitindo que a equipe de desenvolvimento priorize e resolva o problema com precisão. No caso de um bug de falsificação, porém, assim como no CVE-2019-7167, podemos decidir não incluir esses detalhes em nossos relatórios aos parceiros antes do lançamento coordenado, desde que tenhamos certeza de que eles são vulneráveis."

## Recursos de segurança

- [Avisos de segurança do Zcash](https://github.com/zcash/zcash/security/advisories)
- [Avisos de segurança do Zebra](https://github.com/ZcashFoundation/zebra/security/advisories)
- [Relatar uma vulnerabilidade em zcash/zcash](https://github.com/zcash/zcash/security/policy)
- [Relatar uma vulnerabilidade à ZF](https://github.com/ZcashFoundation/zebra/security/policy)
