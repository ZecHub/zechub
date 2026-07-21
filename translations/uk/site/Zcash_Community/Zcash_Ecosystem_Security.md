<a href="https://github.com/Zechub/zechub/edit/main/site/Zcash_Community/Zcash_Ecosystem_Security.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Безпека екосистеми Zcash

## Керівник із безпеки екосистеми

Роль керівника з безпеки екосистеми Zcash була створена завдяки гранту ZCG, щоб забезпечити спеціалізований інжиніринг безпеки для ширшої екосистеми Zcash — зокрема для грантоотримувачів ZCG — поза межами ECC і ZF.

- **2022–2023:** [earthrise](https://forum.zcashcommunity.com/t/zcash-ecosystem-security-lead/42090) був першим керівником із безпеки екосистеми. Дізнайтеся більше на [zecsec.com](https://zecsec.com).
- **2024–2025:** ZCG обрала [Least Authority](https://leastauthority.com), щоб продовжити цю роль через новий [RFP](https://forum.zcashcommunity.com/t/rfp-zcash-ecosystem-security-lead-2023/45723). Оновлення можна знайти [тут](https://forum.zcashcommunity.com/t/grant-update-zcash-ecosystem-security-lead/47541).
- **2026:** Shielded Labs [залучила Taylor Hornby](https://forum.zcashcommunity.com/t/shielded-labs-engages-taylor-hornby-as-security-consultant/55421) як консультанта з безпеки, щоб посилити можливості безпеки Zcash.

## Ініціатива ZCG з безпеки та розкриття вразливостей

[Ініціатива ZCG з безпеки та розкриття вразливостей](https://forum.zcashcommunity.com/t/zcg-security-vulnerability-disclosure-initiative/55545) надає рамкову основу для скоординованого розкриття вразливостей безпеки в усій екосистемі Zcash.

## Останні оновлення безпеки (2026)

- **Zebra 4.4.1 (травень 2026):** випущено [критичне виправлення безпеки](https://forum.zcashcommunity.com/t/zebra-4-4-1-critical-security-fix/55588). Усім операторам вузлів рекомендується негайно оновитися.
- **Zebra 4.3.1 (квітень 2026):** випущено [критичні виправлення безпеки, dockerized mining і посилення CI](https://forum.zcashcommunity.com/t/zebra-4-3-1-critical-security-fixes-dockerized-mining-and-ci-hardening/55389).
- **Усунено кілька вразливостей (квітень 2026):** [кілька вразливостей Zcash успішно виправлено](https://forum.zcashcommunity.com/t/several-zcash-vulnerabilities-successfully-remediated/55388) без впливу на кошти користувачів або приватність.
- **Консультативне повідомлення щодо zcashd (квітень 2026):** [рекомендація зменшити площу атаки zcashd](https://forum.zcashcommunity.com/t/advisory-reduce-your-zcashd-attack-surface-by-shielding-it-behind-zebra/55390) шляхом маршрутизації трафіку через Zebra.

## Відповідальне розкриття

Electric Coin Company і Zcash Foundation обидві дотримуються цього [стандарту](https://github.com/RD-Crypto-Spec/Responsible-Disclosure/tree/d47a5a3dafa5942c8849a93441745fdd186731e6) відповідального розкриття з таким відхиленням:

> "Zcash — це технологія, що забезпечує високий рівень приватності. Notes шифруються для свого призначення, а грошова база підтримується за допомогою доказів з нульовим розголошенням, які мають бути створюваними лише справжнім власником Zcash. Якщо це не спрацює й виникне баг підробки, цей баг підробки може бути використаний без жодної можливості для блокчейн-аналітиків визначити винуватця або з’ясувати, які саме дані в блокчейні були використані для експлуатації бага. Відкати до цього моменту, як це було зроблено в деяких інших проєктах у подібних випадках, тому є неможливими. Стандарт описує, що дослідники, які повідомляють про вразливості, мають надавати повні подробиці проблеми, щоб її можна було відтворити. Це необхідно, наприклад, у випадку, коли зовнішній дослідник і демонструє, і доводить, що проблема безпеки справді існує, і що ця проблема безпеки справді має той вплив, про який він заявляє, — дозволяючи команді розробки точно визначити пріоритетність проблеми та усунути її. Однак у випадку бага підробки, як і у CVE-2019-7167, ми можемо вирішити не включати ці подробиці до наших звітів партнерам до скоординованого релізу, доки ми впевнені, що вони вразливі."

## Ресурси з безпеки

- [Попередження безпеки Zcash](https://github.com/zcash/zcash/security/advisories)
- [Попередження безпеки Zebra](https://github.com/ZcashFoundation/zebra/security/advisories)
- [Повідомити про вразливість до ECC](https://electriccoin.co/blog/disclosure-of-a-major-bug-in-cryptonote-based-currencies/)
- [Повідомити про вразливість до ZF](https://zfnd.org/contact/)
