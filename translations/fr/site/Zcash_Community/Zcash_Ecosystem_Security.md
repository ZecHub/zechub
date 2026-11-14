<a href="https://github.com/Zechub/zechub/edit/main/site/Zcash_Community/Zcash_Ecosystem_Security.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Sécurité de l'écosystème Zcash

## Responsable de la sécurité de l'écosystème

Le poste de responsable de la sécurité de l'écosystème Zcash a été créé grâce à une subvention ZCG afin de fournir une ingénierie de sécurité dédiée à l'ensemble de l'écosystème Zcash, en particulier aux bénéficiaires de ZCG, en dehors de ECC et de ZF.

- **2022–2023 :** [earthrise](https://forum.zcashcommunity.com/t/zcash-ecosystem-security-lead/42090) a été le premier responsable de la sécurité de l'écosystème. Pour en savoir plus, consultez [zecsec.com](https://zecsec.com).
- **2024–2025 :** ZCG a sélectionné [Least Authority](https://leastauthority.com) pour poursuivre ce rôle dans le cadre d'un nouvel [appel à propositions](https://forum.zcashcommunity.com/t/rfp-zcash-ecosystem-security-lead-2023/45723). Vous trouverez les mises à jour [ici](https://forum.zcashcommunity.com/t/grant-update-zcash-ecosystem-security-lead/47541).
- **2026 :** Shielded Labs [a engagé Taylor Hornby](https://forum.zcashcommunity.com/t/shielded-labs-engages-taylor-hornby-as-security-consultant/55421) en tant que consultant en sécurité afin de renforcer les capacités de sécurité de Zcash.

## Initiative de sécurité et de divulgation des vulnérabilités de ZCG

L'[initiative de sécurité et de divulgation des vulnérabilités de ZCG](https://forum.zcashcommunity.com/t/zcg-security-vulnerability-disclosure-initiative/55545) fournit un cadre pour la divulgation coordonnée des vulnérabilités de sécurité dans l'ensemble de l'écosystème Zcash.

## Mises à jour de sécurité récentes (2026)

- **Zebra 4.4.1 (mai 2026) :** [Correctif de sécurité critique](https://forum.zcashcommunity.com/t/zebra-4-4-1-critical-security-fix/55588) publié. Tous les opérateurs de nœuds sont invités à effectuer la mise à niveau immédiatement.
- **Zebra 4.3.1 (avril 2026) :** [Correctifs de sécurité critiques, minage sous Docker et renforcement de la CI](https://forum.zcashcommunity.com/t/zebra-4-3-1-critical-security-fixes-dockerized-mining-and-ci-hardening/55389) publiés.
- **Plusieurs vulnérabilités corrigées (avril 2026) :** [Plusieurs vulnérabilités de Zcash corrigées avec succès](https://forum.zcashcommunity.com/t/several-zcash-vulnerabilities-successfully-remediated/55388) sans affecter les fonds ni la confidentialité des utilisateurs.
- **Avis concernant zcashd (avril 2026) :** [Avis visant à réduire la surface d'attaque de zcashd](https://forum.zcashcommunity.com/t/advisory-reduce-your-zcashd-attack-surface-by-shielding-it-behind-zebra/55390) en faisant passer le trafic par Zebra.

## Divulgation responsable

Le Electric Coin Company et Zcash Foundation se conforment tous deux à cette [norme](https://github.com/RD-Crypto-Spec/Responsible-Disclosure/tree/d47a5a3dafa5942c8849a93441745fdd186731e6) de divulgation responsable, avec l'écart suivant :

> « Zcash est une technologie qui offre une confidentialité forte. Les notes sont chiffrées pour leur destinataire, puis la masse monétaire est maintenue grâce à des preuves à divulgation nulle de connaissance censées ne pouvoir être créées que par le véritable détenteur de Zcash. Si ce mécanisme échoue et qu'un bogue de contrefaçon en résulte, ce bogue pourrait être exploité sans qu'aucun analyste de la blockchain ne puisse identifier l'auteur ni déterminer quelles données de la blockchain ont été utilisées pour exploiter le bogue. Des retours en arrière avant ce point, tels que ceux exécutés par d'autres projets dans de tels cas, sont donc impossibles. La norme prévoit que les personnes signalant des vulnérabilités fournissent tous les détails d'un problème, afin de pouvoir le reproduire. Cela est nécessaire, par exemple, lorsqu'un chercheur externe doit à la fois démontrer et prouver qu'il existe réellement un problème de sécurité et que ce problème a réellement l'impact qu'il décrit, ce qui permet à l'équipe de développement de hiérarchiser et de résoudre le problème avec précision. Dans le cas d'un bogue de contrefaçon, toutefois, tout comme pour CVE-2019-7167, nous pourrions décider de ne pas inclure ces détails dans nos rapports aux partenaires avant la publication coordonnée, tant que nous sommes certains qu'ils sont vulnérables. »

## Ressources de sécurité

- [Avis de sécurité de Zcash](https://github.com/zcash/zcash/security/advisories)
- [Avis de sécurité de Zebra](https://github.com/ZcashFoundation/zebra/security/advisories)
- [Signaler une vulnérabilité dans zcash/zcash](https://github.com/zcash/zcash/security/policy)
- [Signaler une vulnérabilité à ZF](https://github.com/ZcashFoundation/zebra/security/policy)
