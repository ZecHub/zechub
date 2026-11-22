<a href="https://github.com/Zechub/zechub/edit/main/site/Zcash_Community/Zcash_Ecosystem_Security.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Segurança do ecossistema Zcash

## Líder de segurança do ecossistema

A função de Líder de segurança do ecossistema Zcash foi criada por meio de um subsídio da ZCG para oferecer engenharia de segurança dedicada ao ecossistema Zcash como um todo, em especial aos beneficiários da ZCG, fora da ECC e da ZF.

- **2022–2023:** [earthrise](https://forum.zcashcommunity.com/t/zcash-ecosystem-security-lead/42090) atuou como o primeiro Líder de segurança do ecossistema. Saiba mais em [zecsec.com](https://zecsec.com).
- **2024–2025:** A ZCG selecionou [Least Authority](https://leastauthority.com) para dar continuidade à função por meio de uma nova [RFP](https://forum.zcashcommunity.com/t/rfp-zcash-ecosystem-security-lead-2023/45723). As atualizações podem ser encontradas [aqui](https://forum.zcashcommunity.com/t/grant-update-zcash-ecosystem-security-lead/47541).
- **2026:** A Shielded Labs [contratou Taylor Hornby](https://forum.zcashcommunity.com/t/shielded-labs-engages-taylor-hornby-as-security-consultant/55421) como consultor de segurança para reforçar as capacidades de segurança do Zcash.

## Iniciativa de segurança e divulgação de vulnerabilidades do ZCG

A [Iniciativa de segurança e divulgação de vulnerabilidades do ZCG](https://forum.zcashcommunity.com/t/zcg-security-vulnerability-disclosure-initiative/55545) oferece uma estrutura para a divulgação coordenada de vulnerabilidades de segurança em todo o ecossistema Zcash.

## Atualizações de segurança recentes (2026)

- **Zebra 4.4.1 (mai 2026):** Foi lançada uma [correção de segurança crítica](https://forum.zcashcommunity.com/t/zebra-4-4-1-critical-security-fix/55588). Todos os operadores de nós são incentivados a atualizar imediatamente.
- **Zebra 4.3.1 (abr 2026):** Foram lançadas [correções de segurança críticas, mineração via Docker e reforço do CI](https://forum.zcashcommunity.com/t/zebra-4-3-1-critical-security-fixes-dockerized-mining-and-ci-hardening/55389).
- **Várias vulnerabilidades corrigidas (abr 2026):** [Diversas vulnerabilidades do Zcash foram corrigidas com sucesso](https://forum.zcashcommunity.com/t/several-zcash-vulnerabilities-successfully-remediated/55388) sem afetar os fundos ou a privacidade dos usuários.
- **Alerta sobre o zcashd (abr 2026):** [Alerta para reduzir a superfície de ataque do zcashd](https://forum.zcashcommunity.com/t/advisory-reduce-your-zcashd-attack-surface-by-shielding-it-behind-zebra/55390) roteando o tráfego pelo Zebra.

## Divulgação responsável

O Electric Coin Company e o Zcash Foundation seguem este [padrão](https://github.com/RD-Crypto-Spec/Responsible-Disclosure/tree/d47a5a3dafa5942c8849a93441745fdd186731e6) de divulgação responsável, com o seguinte desvio:

> "O Zcash é uma tecnologia que oferece privacidade forte. As notes são criptografadas para o seu destino, e a base monetária é mantida por meio de provas de conhecimento zero que, em princípio, só podem ser criadas pelo verdadeiro detentor de Zcash. Se isso falhar e surgir um bug de falsificação, esse bug poderá ser explorado sem que os analisadores de blockchain tenham qualquer forma de identificar o autor ou quais dados da blockchain foram usados para explorá-lo. Por isso, reverter a blockchain para antes desse ponto, como já foi feito em alguns outros projetos em casos assim, é impossível. O padrão prevê que quem relata vulnerabilidades inclua todos os detalhes do problema para que ele possa ser reproduzido. Isso é necessário, por exemplo, quando um pesquisador externo precisa demonstrar e provar que realmente existe um problema de segurança e que ele tem de fato o impacto alegado, permitindo que a equipe de desenvolvimento priorize e resolva o problema corretamente. No caso de um bug de falsificação, porém, assim como no CVE-2019-7167, podemos decidir não incluir esses detalhes nos relatórios enviados aos parceiros antes da divulgação coordenada, desde que tenhamos certeza de que eles estão vulneráveis."

## Recursos de segurança

- [Alertas de segurança do Zcash](https://github.com/zcash/zcash/security/advisories)
- [Alertas de segurança do Zebra](https://github.com/ZcashFoundation/zebra/security/advisories)
- [Relatar uma vulnerabilidade no zcash/zcash](https://github.com/zcash/zcash/security/policy)
- [Relatar uma vulnerabilidade à ZF](https://github.com/ZcashFoundation/zebra/security/policy)
