<a href="https://github.com/Zechub/zechub/edit/main/site/Zcash_Community/Zcash_Ecosystem_Security.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Редактировать страницу"/>
</a>

# Безопасность экосистемы Zcash

## Руководитель по безопасности экосистемы

Роль руководителя по безопасности экосистемы Zcash была учреждена благодаря гранту ZCG, чтобы обеспечить специализированную инженерную работу в области безопасности для более широкой экосистемы Zcash — особенно для грантополучателей ZCG — вне ECC и ZF.

- **2022–2023:** [earthrise](https://forum.zcashcommunity.com/t/zcash-ecosystem-security-lead/42090) был первым руководителем по безопасности экосистемы. Подробнее на [zecsec.com](https://zecsec.com).
- **2024–2025:** ZCG выбрал [Least Authority](https://leastauthority.com) для продолжения этой роли через новый [RFP](https://forum.zcashcommunity.com/t/rfp-zcash-ecosystem-security-lead-2023/45723). Обновления можно найти [здесь](https://forum.zcashcommunity.com/t/grant-update-zcash-ecosystem-security-lead/47541).
- **2026:** Shielded Labs [привлекла Taylor Hornby](https://forum.zcashcommunity.com/t/shielded-labs-engages-taylor-hornby-as-security-consultant/55421) в качестве консультанта по безопасности для усиления возможностей Zcash в области безопасности.

## Инициатива ZCG по безопасности и раскрытию уязвимостей

[Инициатива ZCG по безопасности и раскрытию уязвимостей](https://forum.zcashcommunity.com/t/zcg-security-vulnerability-disclosure-initiative/55545) предоставляет основу для скоординированного раскрытия уязвимостей безопасности во всей экосистеме Zcash.

## Последние обновления по безопасности (2026)

- **Zebra 4.4.1 (май 2026):** выпущено [критическое исправление безопасности](https://forum.zcashcommunity.com/t/zebra-4-4-1-critical-security-fix/55588). Всем операторам узлов рекомендуется немедленно обновиться.
- **Zebra 4.3.1 (апрель 2026):** выпущены [критические исправления безопасности, dockerized mining и усиление CI](https://forum.zcashcommunity.com/t/zebra-4-3-1-critical-security-fixes-dockerized-mining-and-ci-hardening/55389).
- **Устранены множественные уязвимости (апрель 2026):** [несколько уязвимостей Zcash были успешно исправлены](https://forum.zcashcommunity.com/t/several-zcash-vulnerabilities-successfully-remediated/55388) без влияния на средства пользователей или приватность.
- **Предупреждение по zcashd (апрель 2026):** [рекомендация по снижению поверхности атаки zcashd](https://forum.zcashcommunity.com/t/advisory-reduce-your-zcashd-attack-surface-by-shielding-it-behind-zebra/55390) путём маршрутизации трафика через Zebra.

## Ответственное раскрытие информации

Electric Coin Company и Zcash Foundation обе придерживаются этого [стандарта](https://github.com/RD-Crypto-Spec/Responsible-Disclosure/tree/d47a5a3dafa5942c8849a93441745fdd186731e6) ответственного раскрытия информации со следующим отклонением:

> «Zcash — это технология, обеспечивающая высокий уровень приватности. Notes шифруются для своего получателя, а затем денежная база поддерживается с помощью доказательств с нулевым разглашением, которые, как предполагается, могут быть созданы только настоящим владельцем Zcash. Если это не сработает и возникнет ошибка подделки, такая ошибка подделки может быть использована без какой-либо возможности для аналитиков блокчейна определить виновника или выяснить, какие данные в блокчейне были использованы для эксплуатации ошибки. Откаты до этого момента, как это делалось в некоторых других проектах в подобных случаях, поэтому невозможны. Стандарт описывает, как исследователи уязвимостей предоставляют полные сведения о проблеме, чтобы её можно было воспроизвести. Это необходимо, например, в случае, когда внешний исследователь как демонстрирует, так и доказывает, что проблема безопасности действительно существует и что она действительно имеет заявленные последствия — позволяя команде разработки точно расставить приоритеты и устранить проблему. Однако в случае ошибки подделки, как и в случае CVE-2019-7167, мы можем принять решение не включать эти детали в наши отчёты партнёрам до момента скоординированного релиза, если мы уверены, что они уязвимы».

## Ресурсы по безопасности

- [Рекомендации по безопасности Zcash](https://github.com/zcash/zcash/security/advisories)
- [Рекомендации по безопасности Zebra](https://github.com/ZcashFoundation/zebra/security/advisories)
- [Сообщить об уязвимости в ECC](https://electriccoin.co/blog/disclosure-of-a-major-bug-in-cryptonote-based-currencies/)
- [Сообщить об уязвимости в ZF](https://zfnd.org/contact/)
