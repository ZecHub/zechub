# Від нуля до нульового розголошення: протокол Lelantus

**Серія:** Від нуля до нульового розголошення

Сьогодні ми розглянемо **Lelantus**!

Випущений у 2019 році, цей протокол розвиває Zerocoin. Він використовується у валюті **Firo** (раніше Zcoin) для забезпечення приватних ончейн-транзакцій. У деяких аспектах він нагадує Zcash, але в більшості аспектів суттєво відрізняється.

![Lelantus intro](https://pbs.twimg.com/media/Fsk18DgXsAEc0Ob.jpg)

---

## Zcash vs Firo: основи протоколів

- **Zcash** - Побудований на протоколі **Zerocash**  
- **Firo (Zcoin)** - Побудований на протоколі **Zerocoin**

![Zerocash vs Zerocoin comparison](https://pbs.twimg.com/media/Fsk2Fk7WcAA81ty.png)

---

## Еволюція протоколів приватності Firo

Подібно до Zcash, Firo використовує захищені адреси для досягнення анонімних платежів.

**Часова шкала:**
- **Zerocoin** - Порушено надійність
- **Sigma** - Система фіксованих номіналів
- **Lelantus 1.0** - Бракувало коректних доказів безпеки

![Protocol evolution](https://pbs.twimg.com/media/Fsk2NdaWAAAKVgH.png)

---

## Обмеження протоколу Sigma

Протокол Σ (Sigma), що використовувався в ранніх версіях Zcoin/Firo, мав суттєве обмеження: користувачі могли карбувати лише фіксовані номінали.

Це створювало менші набори анонімності й відкривало можливість для таймінгових атак між операціями mint і redeem (а також проблеми «tainted change»).

![Sigma denominations](https://pbs.twimg.com/media/Fsk2fxfWcAMUBDo.png)

---

## Як Lelantus покращує приватність

**Lelantus** розв’язує проблему фіксованих номіналів, дозволяючи карбування з одного більшого набору.

Ключові переваги:
- Усуває набори анонімності з фіксованими номіналами
- Зменшує таймінгові атаки між burn/redeem
- Усуває проблему tainted change

**Обмеження**: Розмір набору наразі обмежений **65,000 coins**.

![Lelantus advantages](https://pbs.twimg.com/media/Fsk2wK3X0AA6MEe.png)

---

## Зобов’язання монети

**Зобов’язання монети** — це подвійно засліплене зобов’язання, що кодує серійний номер монети та її вартість.

Вони функціонують подібно до **Notes** у Zcash.

Зобов’язання монети публікується та зберігається в реєстрі, коли монета створюється (через транзакції Mint або Spend).

![Coin commitment diagram](https://pbs.twimg.com/media/Fsk3AWNX0AIHya8.png)

---

## Модель Basecoin < - > Zerocoin

Lelantus використовує класичну модель **basecoin < - > zerocoin**.

**Важлива особливість**: Тепер можливі часткові погашення із збереженням прихованими залишку та сум.

Як і в Zcash, прозорі транзакції мають бути явно обрані користувачем.

![Lelantus flow](https://pbs.twimg.com/media/Fsk3HrjXgAMgqmX.png)

---

## Докази One-of-Many

Lelantus використовує **One-of-Many Proofs** для отримання вхідних значень, необхідних для доведення балансу, без розкриття походження входів — і без потреби в trusted setup.

Ці докази також використовуються в **Triptych** (згаданому в нашій гілці про CryptoNote).

![One-of-Many Proofs](https://pbs.twimg.com/media/Fsk3Z0nWIAAPD4k.jpg)

---

## Приватність мережевого рівня: Dandelion++

Вузли Firo використовують той самий Network Magic, що й Magicbean у Zcash.

Подібно до Monero, Firo впровадив **Dandelion++**, щоб додати приватності шляхом приховування IP-адреси транслятора транзакції.

**Фази Dandelion++:**
- **Фаза Stem** - Транзакція передається одному випадковому вузлу замість усіх пірів
- **Фаза Fluff** - Ініціюється випадково, після чого перемикається в звичайний режим gossip

Це значно ускладнює відстеження походження транзакції за допомогою мережевого аналізу.

![Dandelion++ explanation](https://pbs.twimg.com/media/Fsk4A8VWcAU84MR.png)

---

## Майбутнє: Lelantus-Spark

**Lelantus-Spark** (запланований на пізніший період 2023 року) вводить два рівні добровільної видимості, використовуючи **ZIP-32 style derivation** і диверсифіковані адреси.

Також буде додано підтримку:
- Multisig
- User Defined Confidential Assets

Ці функції є паралеллю до Zcash Shielded Assets.

![Lelantus-Spark announcement](https://pbs.twimg.com/media/Fsk4jXeXsAACQ3h.jpg)

---

**Оригінальна гілка від ZecHub (@ZecHub)**  
https://x.com/ZecHub/status/1641902859800150017

---

*Цю сторінку було укладено на основі оригінальної гілки Zero to Zero Knowledge для вікі ZecHub.*
