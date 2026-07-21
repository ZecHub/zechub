<a href="https://github.com/Zechub/zechub/edit/main/site/Zcash_Community/Zcash_Ecosystem_Security.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Modifier la page"/>
</a>

# Sécurité de l’écosystème Zcash

## Responsable de la sécurité de l’écosystème

Le rôle de responsable de la sécurité de l’écosystème Zcash a été créé grâce à une subvention de ZCG afin de fournir une ingénierie de sécurité dédiée à l’ensemble de l’écosystème Zcash — en particulier aux bénéficiaires de subventions ZCG — en dehors d’ECC et de ZF.

- **2022–2023 :** [earthrise](https://forum.zcashcommunity.com/t/zcash-ecosystem-security-lead/42090) a été le premier responsable de la sécurité de l’écosystème. Pour en savoir plus, consultez [zecsec.com](https://zecsec.com).
- **2024–2025 :** ZCG a sélectionné [Least Authority](https://leastauthority.com) pour poursuivre ce rôle via un nouvel [RFP](https://forum.zcashcommunity.com/t/rfp-zcash-ecosystem-security-lead-2023/45723). Des mises à jour sont disponibles [ici](https://forum.zcashcommunity.com/t/grant-update-zcash-ecosystem-security-lead/47541).
- **2026 :** Shielded Labs a [engagé Taylor Hornby](https://forum.zcashcommunity.com/t/shielded-labs-engages-taylor-hornby-as-security-consultant/55421) comme consultant en sécurité afin de renforcer les capacités de sécurité de Zcash.

## Initiative ZCG sur la sécurité et la divulgation des vulnérabilités

L’[initiative ZCG sur la sécurité et la divulgation des vulnérabilités](https://forum.zcashcommunity.com/t/zcg-security-vulnerability-disclosure-initiative/55545) fournit un cadre pour la divulgation coordonnée des vulnérabilités de sécurité à travers l’écosystème Zcash.

## Mises à jour récentes de sécurité (2026)

- **Zebra 4.4.1 (mai 2026) :** [Correctif critique de sécurité](https://forum.zcashcommunity.com/t/zebra-4-4-1-critical-security-fix/55588) publié. Tous les opérateurs de nœuds sont encouragés à mettre à niveau immédiatement.
- **Zebra 4.3.1 (avril 2026) :** [Correctifs critiques de sécurité, minage conteneurisé avec Docker et renforcement de la CI](https://forum.zcashcommunity.com/t/zebra-4-3-1-critical-security-fixes-dockerized-mining-and-ci-hardening/55389) publiés.
- **Multiples vulnérabilités corrigées (avril 2026) :** [Plusieurs vulnérabilités de Zcash corrigées avec succès](https://forum.zcashcommunity.com/t/several-zcash-vulnerabilities-successfully-remediated/55388) sans affecter les fonds des utilisateurs ni leur vie privée.
- **Avis concernant zcashd (avril 2026) :** [Avis pour réduire la surface d’attaque de zcashd](https://forum.zcashcommunity.com/t/advisory-reduce-your-zcashd-attack-surface-by-shielding-it-behind-zebra/55390) en acheminant le trafic via Zebra.

## Divulgation responsable

Electric Coin Company et Zcash Foundation se conforment toutes deux à cette [norme](https://github.com/RD-Crypto-Spec/Responsible-Disclosure/tree/d47a5a3dafa5942c8849a93441745fdd186731e6) de divulgation responsable, avec la déviation suivante :

> "Zcash est une technologie qui offre une forte confidentialité. Les notes sont chiffrées vers leur destination, puis la masse monétaire est préservée grâce à des preuves à divulgation nulle de connaissance destinées à ne pouvoir être créées que par le véritable détenteur de Zcash. Si cela échoue et qu’un bug de contrefaçon en résulte, ce bug de contrefaçon pourrait être exploité sans qu’il n’existe aucun moyen pour les analystes de la blockchain d’identifier l’auteur ou de déterminer quelles données de la blockchain ont été utilisées pour exploiter le bug. Les rollbacks antérieurs à ce point, comme cela a été exécuté dans certains autres projets dans de tels cas, sont donc impossibles. La norme décrit les rapporteurs de vulnérabilités comme incluant tous les détails d’un problème, afin de le reproduire. Cela est nécessaire, par exemple, dans le cas d’un chercheur externe démontrant et prouvant qu’il existe réellement un problème de sécurité, et que ce problème de sécurité a réellement l’impact qu’il affirme — permettant à l’équipe de développement de hiérarchiser et de résoudre précisément le problème. Dans le cas d’un bug de contrefaçon, cependant, tout comme dans CVE-2019-7167, nous pourrions décider de ne pas inclure ces détails dans nos rapports aux partenaires avant la publication coordonnée, tant que nous sommes certains qu’ils sont vulnérables."

## Ressources de sécurité

- [Avis de sécurité Zcash](https://github.com/zcash/zcash/security/advisories)
- [Avis de sécurité Zebra](https://github.com/ZcashFoundation/zebra/security/advisories)
- [Signaler une vulnérabilité à ECC](https://electriccoin.co/blog/disclosure-of-a-major-bug-in-cryptonote-based-currencies/)
- [Signaler une vulnérabilité à ZF](https://zfnd.org/contact/)
