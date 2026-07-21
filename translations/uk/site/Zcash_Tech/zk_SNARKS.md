<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/zk_SNARKS.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# ZKP і ZK-SNARKs

## Коротко

- **ZK-SNARKs** = Zero-Knowledge Succinct Non-Interactive Arguments of Knowledge
- Вони дозволяють одній стороні **довести, що вона щось знає**, не розкриваючи саму інформацію
- Zcash використовує ZK-SNARKs, щоб довести, що транзакція є дійсною (правильні суми, невитрачені входи) **без розкриття відправника, отримувача чи суми**
- "Succinct" означає, що доказ є дуже малим і швидко перевіряється навіть для складних тверджень
- Пул Orchard використовує Halo 2, систему ZK-SNARKs, для якої **не потрібен trusted setup**

---

## Що таке доказ?

Докази є основою всієї математики. Доказ — це твердження або теорема, яку ви намагаєтеся довести, та послідовність виведень, зроблених для того, щоб оголосити теорему доведеною. Наприклад, те, що сума всіх кутів трикутника дорівнює 180°, може бути незалежно перевірено будь-ким (verifier).

**Докази** 

Prover ---> Робить твердження ---> Verifier обирає ---> Прийняти/Відхилити 

(І prover, і verifier є алгоритмами)

У computer science термін для доказів, які можна ефективно перевіряти, — це NP proofs. Ці короткі докази можна перевірити за поліноміальний час. Загальна ідея така: "Існує розв’язок теореми, і його передають verifier для перевірки"


<a href="">
    <img width="853" height="396" alt="NPlanguage1" src="https://github.com/user-attachments/assets/d25345cf-e958-4ce2-b01d-f4e7f2db9551" alt="" width="600" height="400"/>
</a>


У NP-language мають виконуватися дві умови: 

Повнота: істинні твердження будуть прийняті verifier (це дозволяє чесним prover успішно пройти перевірку)

Коректність: хибні твердження не матимуть доказів (для будь-якої стратегії нечесного prover він не зможе довести правильність хибного твердження).


### Інтерактивні та ймовірнісні докази

**Інтерактивність**: Замість того щоб просто читати доказ, verifier взаємодіє з prover у кількох раундах обміну повідомленнями.

**Випадковість**: Запити verifier до prover є рандомізованими, і prover повинен уміти правильно відповісти на кожен із них. 


<a href="">
 <img width="855" height="399" alt="IPmodel1" src="https://github.com/user-attachments/assets/1542be12-d3fd-4934-8413-0d16f95b8d10" alt="" width="600" height="400"/>
</a>


Використовуючи разом інтерактивність і випадковість, можна довести твердження "сліпому" verifier за ймовірнісний поліноміальний час (PPT). 

Чи можуть інтерактивні докази ефективно перевіряти більше, ніж NP proofs?

NP Proofs vs IP proofs:

|  Твердження   |    NP     | IP    |
|--------------|-----------|--------|
|    NP        |  так      |  так   |
|    CO-NP     |  ні       |  так   |
|    #P        |  ні       |  так   |
|    PSPACE    |  ні       |  так   |


NP - Існує розв’язок для твердження

CO-NP - Доведення того, що для твердження не існує розв’язків

#P - Підрахунок того, скільки розв’язків має твердження

PSPACE  - Доведення чергування різних тверджень

### Що таке Zero Knowledge?

Те, що verifier може обчислити після взаємодії, є ідентичним тому, що він міг би довести до неї. Взаємодія між prover і verifier у кількох раундах не збільшує обчислювальну потужність verifier.

**Simulation Paradigm**

Цей експеримент зустрічається в усій криптографії. Він представляє "Real View" і "Simulated View". 

Real View: усі можливі історії взаємодії між Prover і Verifier (P,V)

Simulated View: verifier симулює всі можливі взаємодії між Prover і Verifier 

<a href="">
    <img width="850" height="397" alt="simulation1" src="https://github.com/user-attachments/assets/0e68649d-a231-44d8-a76a-25a307f68b9e"  alt="" width="600" height="400"/>
</a>

Поліноміальний distinguisher намагається визначити, чи дивиться він на real view чи simulated view, і багаторазово запитує зразок з обох.

Кажуть, що ці два подання є "computationally indistinguishable", якщо для всіх алгоритмів/стратегій distinguisher, навіть після отримання поліноміальної кількості зразків з real або simulated view, ймовірність становить >1/2. 

**Zero-Knowledge Arguments of Knowledge**

Інтерактивний протокол (P,V) є zero-knowledge, якщо існує simulator (алгоритм) такий, що для кожного verifier, який працює за probabilty polynomial-time (коли теорема правильна), розподіли ймовірностей, що визначають real і simulated view, є computationaly indistinguishable. 

Інтерактивні протоколи корисні, коли є один verifier. Прикладом може бути податковий аудитор у застосунку zero-knowledge "proof of taxes".

## Що таке SNARK?

**Succinct Non-Interactive Argument of Knowledge**

Широке визначення — це стислий доказ того, що твердження є істинним. Доказ має бути коротким і швидким для перевірки. У SNARKS одне повідомлення надсилається від Prover до Verifier. Після цього verifier може вирішити, прийняти його чи відхилити. 

приклад твердження: "Я знаю повідомлення (m), таке що SHA256(m)=0"

У zk-SNARK доказ не розкриває нічого про повідомлення (m).

**Поліноми**: Суми членів, що містять константу (наприклад 1,2,3), змінні (наприклад x,y,z) та степені змінних (наприклад x², y³). 

приклад: "3x² + 8x + 17"

**Arithmetic Circuit**: Модель для обчислення поліномів. У більш загальному сенсі її можна визначити як Directed Acyclic Graph, у кожному вузлі якого виконується арифметична операція. Circuit складається з воріт додавання, воріт множення та деяких константних воріт. Так само, як Boolean circuits передають біти по дротах, Arithmetic circuits передають цілі числа.


<a href="">
<img width="785" height="368" alt="circuit1" src="https://github.com/user-attachments/assets/be1de1d6-60d3-4fd1-b9a2-5094c65d696f" alt="" width="300" height="200"/>
</a>

У цьому прикладі prover хоче переконати verifier, що він знає розв’язок для arithmetic circuit.  

**Commitments**: Щоб зробити це, prover поміщає всі значення (приватні та публічні), пов’язані зі схемою, у commitment. Commitments приховують свої входи, використовуючи функцію, результат якої неможливо обернути.

Sha256 — один із прикладів хеш-функції, яку можна використовувати у схемі commitments.

Після того як prover фіксує значення, commitments надсилаються verifier (який упевнений, що не зможе розкрити жодне з початкових значень). Потім prover може показати verifier, що він знає кожне зі значень у вузлах графа. 

**Fiat-Shamir Transform**

Щоб зробити протокол *неінтерактивним*, prover генерує випадковість (яка використовується для прихованого виклику) від імені verifier за допомогою криптографічної хеш-функції. Це відомо як random oracle. Потім prover може надіслати verifier одне повідомлення, яке той зможе перевірити на правильність. 

Щоб сформувати SNARK, придатний для загальних схем, потрібні два елементи:

Функціональна схема commitments: дозволяє тому, хто комітить, зафіксувати поліном коротким рядком, який verifier може використати для підтвердження заявлених обчислень committed polynomial.

Polynomial interactive oracle: verifier просить prover (алгоритм) відкрити всі commitments у різних обраних ним точках за допомогою polynomial commitment scheme і перевіряє, чи виконується між ними тотожність.

**Setup**

Процедури setup допомагають verifier, підсумовуючи схему та виводячи публічні параметри. 

<a href="">
<img width="845" height="398" alt="setup1" src="https://github.com/user-attachments/assets/c41212ca-b5e9-4ac8-8695-be612c45a679" alt="" width="600" height="300"/>
</a>

**Типи попередньої обробки setup**:

Trusted Setup для кожної схеми - Виконується один раз для кожної схеми. Є специфічним для схеми, а секретну випадковість (Common Reference String) потрібно зберігати в таємниці та знищити. 

Скомпрометований setup у цьому методі означає, що нечесний prover може доводити хибні твердження. 

Trusted but Universal Setup - Trusted setup потрібно виконати лише один раз, після чого можна детерміновано попередньо обробляти багато різних схем. 

Transparent Setup (No Trusted Setup)- Алгоритм попередньої обробки взагалі не використовує жодної секретної випадковості. 


**Типи конструкцій доказів SNARK**:

[Groth16](https://www.youtube.com/watch?v=QDplVkyncYQ): Потребує Trusted Setup, але має дуже короткі докази, які можна швидко перевіряти.

[Sonic](https://www.youtube.com/watch?v=oTRAg6Km1os)/[Marlin](https://www.youtube.com/watch?v=bJDLf8KLdL0)/[Plonk](https://cryptocurrencywiki.org/PLONK): Universally Trusted Setup.

[DARK](https://www.youtube.com/watch?v=_ZDM7NwSxEY)/[HALO](https://eprint.iacr.org/archive/2019/1021/20200218:011907)/[STARK](https://www.youtube.com/watch?v=wFZ_YIetK1o): Не потребують Trusted Setup, але створюють дещо довші докази або можуть вимагати більше часу для роботи prover. 

SNARKS корисні, коли потрібні багато verifier, як-от у blockchain на кшталт Zcash або в zk-Rollup, такому як [Aztec](https://docs.aztec.network), щоб багатьом вузлам валідації не доводилося взаємодіяти в кількох раундах для кожного доказу. 

## Як zk-SNARK's реалізовані в Zcash?

Загалом zero-knowledge proofs — це інструмент для забезпечення чесної поведінки в протоколах без розкриття будь-якої інформації. 

Zcash — це публічний blockchain, який забезпечує приватні транзакції. zk-SNARK's використовуються для доведення того, що приватна транзакція є дійсною відповідно до правил консенсусу мережі, не розкриваючи жодних інших деталей про транзакцію. 

[Відеопояснення](https://www.youtube.com/watch?v=Kx4cIkCY2EA) - У цій лекції Ariel Gabizon описує дерево commitments нотаток Zcash, Blind Polynomial Evaluation та Homomorphically Hidden Challenges і те, як вони реалізовані в мережі. 

Прочитайте [книгу Halo2](https://zcash.github.io/halo2/index.html), щоб дізнатися більше.

## Інші застосування Zero-Knowledge 

zk-SNARKS дають кілька переваг у різноманітних застосуваннях. Розгляньмо кілька прикладів.

**Масштабованість**: Це досягається через "Outsourcing Computation". Немає суворої потреби в zero-knowledge, щоб L1 chain перевіряв роботу позаланцюгового сервісу. Транзакції не обов’язково є приватними у zk-EVM.

Перевага сервісу Rollup на основі доказів (zk-Rollup) полягає в обробці пакета з сотень/тисяч транзакцій, а L1 може перевірити стислий доказ того, що всі транзакції були оброблені правильно, масштабуючи пропускну здатність мережі за транзакціями у 100 або 1000 разів.

<a href="">
  <img width="606" height="336" alt="zkvm1" src="https://github.com/user-attachments/assets/a3cbb5c9-8767-4b34-9fcb-868ca421838f" width="600" height="300"/>
</a>


**Інтероперабельність**: Це досягається у zk-Bridge шляхом "блокування" активів у вихідному chain і доведення цільовому chain, що активи були заблоковані (proof of consensus).

**Відповідність вимогам**: Такі проєкти, як [Espresso](https://www.espressosys.com/blog/decentralizing-rollups-announcing-the-espresso-sequencer), можуть довести, що приватна транзакція відповідає місцевому банківському законодавству, не розкриваючи деталей транзакції. 

**Боротьба з дезінформацією**: Серед кількох прикладів поза blockchain і cryptocurrency — використання генерації доказів для зображень, оброблених новинними та медіа-ресурсами, що дає змогу глядачам незалежно перевіряти джерело зображення та всі операції, виконані над ним. https://medium.com/@boneh/using-zk-proofs-to-fight-disinformation-17e7d57fe52f


____


Подальше вивчення: 

[Бібліографія Zero-Knowledge - a16z Crypto](https://a16zcrypto.com/zero-knowledge-canon/)

[zkSNARK's з Hanh Huynh Huu](https://www.youtube.com/watch?v=zXF-BDohZjk)

[Zcash: Halo 2 і SNARKs без Trusted Setups - Sean Bowe на Dystopia labs](https://www.youtube.com/watch?v=KdkVTEHUxgo)

[Zero knowledge Proofs з Avi Wigderson - Numberphile](https://youtu.be/5ovdoxnfFVc)

[Інтерактивні Zero-Knowledge Proofs - стаття Chainlink](https://blog.chain.link/interactive-zero-knowledge-proofs/)

[Лекція 1: Вступ та історія ZKP - zklearning.org](https://www.youtube.com/watch?v=uchjTIlPzFo)

[Просте пояснення Arithmetic Circuits - Medium](https://medium.com/web3studio/simple-explanations-of-arithmetic-circuits-and-zero-knowledge-proofs-806e59a79785)

[Scalability is Boring, Privacy is Dead: ZK-Proofs, What are They Good for?](https://www.youtube.com/watch?v=AX7eAzfSB6w)

---

## Пов’язані сторінки

- [Shielded Pools](/using-zcash/shielded-pools) — Як ZK-SNARKs використовуються в пулах цінності Zcash
- [Halo](/zcash-tech/halo) — Система ZK-SNARKs у Zcash, що усуває trusted setup
- [Постквантова безпека в Zcash](/zcash-tech/post-quantum-security) - Як майбутні квантові ризики пов’язані з криптографією Zcash
- [Shielded Assets у Zcash](/zcash-tech/zcash-shielded-assets) — ZSA, побудовані на технології ZK-SNARK
- [Що таке ZEC і Zcash](/start-here/what-is-zec-and-zcash) — Вступ до Zcash та його моделі приватності
- [Приватність як основний принцип](/privacy/privacy-as-a-core-principle) — Чому фінансова приватність має значення
