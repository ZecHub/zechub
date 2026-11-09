<a href="https://github.com/Zechub/zechub/edit/main/site/Zcash_Community/Zcash_Ecosystem_Security.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Editar página"/>
</a>

# Seguridad del ecosistema de Zcash

## Responsable de seguridad del ecosistema

El cargo de Responsable de Seguridad del Ecosistema de Zcash se estableció mediante una subvención [grant] de ZCG para proporcionar ingeniería de seguridad dedicada al ecosistema más amplio de Zcash, en particular a los beneficiarios de subvenciones de ZCG, fuera de ECC y ZF.

- **2022–2023:** [earthrise](https://forum.zcashcommunity.com/t/zcash-ecosystem-security-lead/42090) se desempeñó como el primer Responsable de Seguridad del Ecosistema. Obtenga más información en [zecsec.com](https://zecsec.com).
- **2024–2025:** ZCG seleccionó a [Least Authority](https://leastauthority.com) para continuar en el cargo mediante una nueva [RFP](https://forum.zcashcommunity.com/t/rfp-zcash-ecosystem-security-lead-2023/45723). Las actualizaciones se pueden encontrar [aquí](https://forum.zcashcommunity.com/t/grant-update-zcash-ecosystem-security-lead/47541).
- **2026:** Shielded Labs [contrató a Taylor Hornby](https://forum.zcashcommunity.com/t/shielded-labs-engages-taylor-hornby-as-security-consultant/55421) como consultor de seguridad para reforzar las capacidades de seguridad de Zcash.

## Iniciativa de Seguridad y Divulgación de Vulnerabilidades de ZCG

La [ZCG Iniciativa de Seguridad y Divulgación de Vulnerabilidades](https://forum.zcashcommunity.com/t/zcg-security-vulnerability-disclosure-initiative/55545) proporciona un marco para la divulgación coordinada de vulnerabilidades de seguridad en todo el ecosistema de Zcash.

## Actualizaciones recientes de seguridad (2026)

- **Zebra 4.4.1 (mayo de 2026):** Se publicó una [corrección de seguridad crítica](https://forum.zcashcommunity.com/t/zebra-4-4-1-critical-security-fix/55588). Se recomienda a todos los operadores de nodos [node] actualizar de inmediato.
- **Zebra 4.3.1 (abril de 2026):** Se publicaron [correcciones de seguridad críticas, minado [mining] en contenedores Docker y fortalecimiento de CI](https://forum.zcashcommunity.com/t/zebra-4-3-1-critical-security-fixes-dockerized-mining-and-ci-hardening/55389).
- **Múltiples vulnerabilidades corregidas (abril de 2026):** [Varias vulnerabilidades de Zcash fueron corregidas con éxito](https://forum.zcashcommunity.com/t/several-zcash-vulnerabilities-successfully-remediated/55388) sin afectar los fondos de los usuarios ni la privacidad [privacy].
- **Aviso de zcashd (abril de 2026):** [Aviso para reducir la superficie de ataque de zcashd](https://forum.zcashcommunity.com/t/advisory-reduce-your-zcashd-attack-surface-by-shielding-it-behind-zebra/55390) mediante el enrutamiento del tráfico a través de Zebra.

## Divulgación responsable

Tanto Electric Coin Company como Zcash Foundation cumplen con este [estándar](https://github.com/RD-Crypto-Spec/Responsible-Disclosure/tree/d47a5a3dafa5942c8849a93441745fdd186731e6) de Divulgación Responsable, con la siguiente desviación:

> «Zcash es una tecnología que proporciona una sólida privacidad. Las notas [Notes] se cifran [encrypted] para su destino y, posteriormente, la base monetaria se mantiene mediante pruebas [proofs] zero-knowledge destinadas a ser creadas únicamente por el poseedor real de Zcash. Si esto falla y se produce un error de falsificación, ese error de falsificación podría ser explotado sin que haya forma de que los analizadores de blockchain identifiquen al perpetrador ni qué datos de la blockchain se han utilizado para explotar el error. Por lo tanto, las reversiones anteriores a ese punto, como las que se han ejecutado en algunos otros proyectos en tales casos, son imposibles. El estándar describe a los reportantes de vulnerabilidades que incluyen todos los detalles de un problema para reproducirlo. Esto es necesario, por ejemplo, en el caso de un investigador externo que demuestre y pruebe que realmente existe un problema de seguridad y que ese problema de seguridad tiene realmente el impacto que afirma tener, lo que permite al equipo de desarrollo priorizar y resolver el problema con precisión. Sin embargo, en el caso de un error de falsificación, al igual que en CVE-2019-7167, podríamos decidir no incluir esos detalles en nuestros informes a socios antes de la publicación coordinada, siempre que estemos seguros de que son vulnerables».

## Recursos de seguridad

- [Zcash Avisos de seguridad](https://github.com/zcash/zcash/security/advisories)
- [Zebra Avisos de seguridad](https://github.com/ZcashFoundation/zebra/security/advisories)
- [Informar una vulnerabilidad en zcash/zcash](https://github.com/zcash/zcash/security/policy)
- [Informar una vulnerabilidad a ZF](https://github.com/ZcashFoundation/zebra/security/policy)
