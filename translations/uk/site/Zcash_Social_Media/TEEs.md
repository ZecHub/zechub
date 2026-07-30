# Від нуля до нульового розголошення: довірені середовища виконання (TEE)

**Серія:** Від нуля до нульового розголошення

Серія «Від нуля до нульового розголошення» повертається з новою темою!  
Цього тижня ми розглянемо **Trusted Execution Environments (TEE)** — як вони використовуються в privacy coins та інших блокчейн-застосунках.

![Trusted Execution Environments intro](https://pbs.twimg.com/media/Fquj-h2WcAIgSnL.jpg)

---

## TEE і блокчейни: взаємодоповнювальні властивості

Блокчейни та TEE мають дуже взаємодоповнювальні сильні сторони:

- **Блокчейни** гарантують доступність, збереження стану та дають змогу публічно перевіряти весь стан — але мають обмежену обчислювальну потужність.  
- **TEE** можуть приватно виконувати ресурсоємні обчислювальні завдання — але не мають вбудованого збереження стану.

Разом вони можуть створювати потужні системи зі збереженням приватності.

---

## Secret Network: приватність на базі TEE

**Secret Network** використовує технологію TEE (зокрема Intel SGX) для виконання обчислень над зашифрованими вхідними даними, вихідними даними та станом.

Кожен вузол-валідатор запускається на чипах Intel SGX. Рівні консенсусу та обчислень поєднані:

- Транзакції обробляються всередині захищених enclaves.  
- Дані розшифровуються лише **всередині TEE**.

Це відрізняється від Zcash, який використовує **докази з нульовим розголошенням** для забезпечення приватності. У Zcash shielded-транзакції транслюються та валідуються публічно без розкриття будь-яких додаткових даних мережі. Zcash Shielded Assets дотримуються того самого принципу.

![Secret Network TEE diagram](https://pbs.twimg.com/media/FqulPjNX0AEfjRp.png)

Для детального пояснення того, як TEE реалізовані в Secret Network, прочитайте цю чудову статтю від @l_woetzel:  
https://carter-woetzel.medium.com/secret-network-tees-lets-talk-fud-vulnerability-33ca94b6df38

---

## Як Secret Network захищає ключі та стан

- **Сід шифрування консенсусу** мережі зберігається всередині TEE кожного валідатора.  
- Контракти використовують унікальні неспростовні ключі шифрування.  
- Секретні контракти працюють на обчислювальному модулі Cosmos SDK, але підтримують зашифровані вхідні/вихідні дані та стан.

---

## Remote Attestation

**Remote Attestation** — це процес доведення того, що enclave працює в справжньому безпечному апаратному середовищі.

Він дозволяє віддаленій стороні перевірити:
- Що запущено правильний застосунок  
- Що застосунок не був скомпрометований  
- Що він безпечно виконується всередині enclave Intel SGX

![Remote Attestation explanation](https://pbs.twimg.com/media/FqumRjoWwAAeT-M.png)

Enclaves також містять приватні ключі підпису та attestation, до яких неможливо отримати доступ ззовні.

![Enclave key protection](https://pbs.twimg.com/media/Fqumv83XoAQq-MO.png)

---

## Data Sealing

Оскільки enclaves не мають стану, інколи дані потрібно зберігати зовні в недовіреній пам’яті.  

**Data Sealing** шифрує дані всередині enclave за допомогою ключа, похідного від CPU. Зашифрований блок можна розпечатати лише на **тій самій системі**.

![Data Sealing diagram](https://pbs.twimg.com/media/FqunBwyWYAA-TR3.jpg)

---

## Oasis Network

**Oasis Network** також використовує TEE через свій конфіденційний ParaTime (наприклад, Sapphire і Cipher).

Зашифровані дані потрапляють до TEE разом зі smart contract. Вони розшифровуються, обробляються та повторно шифруються перед виходом з enclave.

![Oasis Network TEE flow](https://pbs.twimg.com/media/FqunJRDXwAMt4Ob.png)

---

## TEE в мережах Proof-of-Stake

Багато блокчейнів на Proof-of-Stake (включно з Secret і Oasis) використовують **Tendermint** як свій фреймворк консенсусу.

Для PoS-валідаторів:
- Ключами потрібно безпечно керувати й ніколи не розкривати їх у відкритому вигляді.  
- Валідатори мають залишатися онлайн (застосовуються штрафи за простій).  
- Підписання суперечливих повідомлень може призвести до slashing.

**TEE** ідеально підходять для безпечного генерування та використання ключів валідатора.

![Tendermint & PoS security](https://pbs.twimg.com/media/Fqun0HEX0AAooxW.jpg)

---

## Zcash і дослідження Proof-of-Stake

Zcash активно досліджує перехід на Proof-of-Stake.

- Ознайомтеся з дослідженням: https://electriccoin.co/blog/zcash-proof-of-stake-research/  
- Перегляньте цей фрагмент із Community Call від Zcash Foundation, у якому пояснюються різні дизайни PoS та їхні наслідки для приватності:
  
<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/22a-ROcb3AQ"
    title="PoS designs"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>

---

**Оригінальний тред від ZecHub (@ZecHub)**  
https://x.com/ZecHub/status/1633579659282587651

---

*Цю сторінку було укладено на основі оригінального треду Zero to Zero Knowledge для вікі ZecHub.*
