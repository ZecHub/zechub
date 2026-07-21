<a href="https://github.com/Zechub/zechub/edit/main/site/Zcash_Community/Zcash_Ecosystem_Security.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Editar página"/>
</a>

# Seguridad del ecosistema Zcash

## Liderazgo de seguridad del ecosistema

El rol de liderazgo de seguridad del ecosistema Zcash se estableció mediante una subvención de ZCG para proporcionar ingeniería de seguridad dedicada al ecosistema Zcash en general — en particular a los beneficiarios de subvenciones de ZCG — fuera de ECC y ZF.

- **2022–2023:** [earthrise](https://forum.zcashcommunity.com/t/zcash-ecosystem-security-lead/42090) fue la primera persona en ocupar el rol de liderazgo de seguridad del ecosistema. Más información en [zecsec.com](https://zecsec.com).
- **2024–2025:** ZCG seleccionó a [Least Authority](https://leastauthority.com) para continuar con el rol mediante una nueva [RFP](https://forum.zcashcommunity.com/t/rfp-zcash-ecosystem-security-lead-2023/45723). Las actualizaciones pueden encontrarse [aquí](https://forum.zcashcommunity.com/t/grant-update-zcash-ecosystem-security-lead/47541).
- **2026:** Shielded Labs [contrató a Taylor Hornby](https://forum.zcashcommunity.com/t/shielded-labs-engages-taylor-hornby-as-security-consultant/55421) como consultor de seguridad para reforzar las capacidades de seguridad de Zcash.

## Iniciativa de ZCG sobre seguridad y divulgación de vulnerabilidades

La [Iniciativa de ZCG sobre seguridad y divulgación de vulnerabilidades](https://forum.zcashcommunity.com/t/zcg-security-vulnerability-disclosure-initiative/55545) proporciona un marco para la divulgación coordinada de vulnerabilidades de seguridad en todo el ecosistema Zcash.

## Actualizaciones recientes de seguridad (2026)

- **Zebra 4.4.1 (mayo de 2026):** Se publicó una [corrección crítica de seguridad](https://forum.zcashcommunity.com/t/zebra-4-4-1-critical-security-fix/55588). Se recomienda a todos los operadores de nodos actualizar de inmediato.
- **Zebra 4.3.1 (abril de 2026):** Se publicaron [correcciones críticas de seguridad, minería en contenedores Docker y refuerzo de CI](https://forum.zcashcommunity.com/t/zebra-4-3-1-critical-security-fixes-dockerized-mining-and-ci-hardening/55389).
- **Múltiples vulnerabilidades corregidas (abril de 2026):** [Varias vulnerabilidades de Zcash fueron corregidas con éxito](https://forum.zcashcommunity.com/t/several-zcash-vulnerabilities-successfully-remediated/55388) sin afectar los fondos ni la privacidad de los usuarios.
- **Aviso sobre zcashd (abril de 2026):** [Aviso para reducir la superficie de ataque de zcashd](https://forum.zcashcommunity.com/t/advisory-reduce-your-zcashd-attack-surface-by-shielding-it-behind-zebra/55390) enroutando el tráfico a través de Zebra.

## Divulgación responsable

Electric Coin Company y Zcash Foundation se ajustan a este [estándar](https://github.com/RD-Crypto-Spec/Responsible-Disclosure/tree/d47a5a3dafa5942c8849a93441745fdd186731e6) de divulgación responsable con la siguiente desviación:

> "Zcash es una tecnología que proporciona una fuerte privacidad. Las notas se cifran hacia su destino, y luego la base monetaria se mantiene mediante pruebas de conocimiento cero destinadas a que solo puedan ser creadas por el verdadero poseedor de Zcash. Si esto falla y se produce un error de falsificación, ese error de falsificación podría ser explotado sin que exista forma alguna de que los analizadores de blockchain identifiquen al autor o qué datos de la blockchain se han utilizado para explotar el error. Por lo tanto, los rollbacks anteriores a ese punto, como se han ejecutado en algunos otros proyectos en tales casos, son imposibles. El estándar describe que quienes reportan vulnerabilidades incluyan todos los detalles de un problema para poder reproducirlo. Esto es necesario, por ejemplo, en el caso de que un investigador externo demuestre y pruebe que realmente existe un problema de seguridad, y que ese problema de seguridad realmente tiene el impacto que afirma tener, permitiendo al equipo de desarrollo priorizar y resolver el problema con precisión. Sin embargo, en el caso de un error de falsificación, al igual que en CVE-2019-7167, podríamos decidir no incluir esos detalles en nuestros informes a los socios antes de la publicación coordinada, siempre que estemos seguros de que son vulnerables."

## Recursos de seguridad

- [Avisos de seguridad de Zcash](https://github.com/zcash/zcash/security/advisories)
- [Avisos de seguridad de Zebra](https://github.com/ZcashFoundation/zebra/security/advisories)
- [Reportar una vulnerabilidad a ECC](https://electriccoin.co/blog/disclosure-of-a-major-bug-in-cryptonote-based-currencies/)
- [Reportar una vulnerabilidad a ZF](https://zfnd.org/contact/)
