# Від нуля до нульового розголошення: Transparent vs Shielded Transactions і Unified Addresses

**Серія:** Від нуля до нульового розголошення

Якщо ви вперше знайомитеся із Zcash, то побачите, що доступні два типи транзакцій: **Transparent** і **Shielded**.  

Сьогодні ми дізнаємося про них і розглянемо одну з нових функцій в екосистемі #Zcash — **Unified Addresses**.

---

## Transparent vs Shielded Transactions

- **Transparent Transactions** використовують **t-addresses** (кодування Base58). Усе є публічно видимим — так само, як у Bitcoin.  
- **Shielded Transactions** використовують адреси, закодовані для пулів **Sapling** або **Orchard**. Вони приховують відправника, отримувача та суму за допомогою доказів з нульовим розголошенням.

**Shielded Transaction** означає будь-яку транзакцію з адресами, закодованими для пулів Sapling/Orchard.

![Вступ до Transparent vs Shielded](https://pbs.twimg.com/media/FpmW00HWIAIZpQD.jpg)

**Unified Addresses (UAs)** створені для того, щоб **об’єднати** shielded або transparent транзакції в одну адресу.

---

## Типи адрес у Zcash

Використовуються 3 типи адрес:

1. **(T) Transparent** – Base58  
2. **(Z) Sapling** – Bech32  
3. **(UA) Unified Address** – Bech32m  

Кількість символів (і, відповідно, розмір QR-коду) збільшується з кожним типом.

![Порівняння типів адрес](https://pbs.twimg.com/media/FpmXe5bXsAEFeLY.png)

![Порівняння розміру QR-кодів](https://pbs.twimg.com/media/FpmXmDwXoAIWxov.png)

---

## Як працюють Unified Addresses

Адреси та ключі кодуються як послідовність байтів (**Raw Encoding**).  
**Receiver Encoding** містить усю необхідну інформацію для переказу активу за допомогою конкретного протоколу.

Сире кодування Unified Address — це комбінація кодувань (typecode, length, addr) одержувачів:

- UA: `0x03`  
- Sapling: `0x02`  
- Transparent: `0x01`  

**Важливо**: У кожному UA має бути **принаймні одна shielded платіжна адреса**. (Адреси Sprout більше не підтримуються після оновлення Canopy.)

![Структура кодування UA](https://pbs.twimg.com/media/FpmYW1ZXgAAvALT.png)

Повна специфікація: **[ZIP-316: Unified Addresses](https://zips.z.cash/zip-0316)**

---

## Переваги Unified Addresses

- **Простіше для бірж** — тепер вони можуть безпечніше підтримувати shielded депозити/виведення.  
- **Готовність до майбутнього** — нові shielded пули можна додавати без порушення роботи гаманців.  
- **Shielded-by-Default** — кожен UA містить щонайменше одну shielded адресу, тож приватність завжди доступна.

Це фундаментальна зміна, яка вже допомагає більшій кількості ZEC переходити до shielded пулу.

---

## Orchard Transactions і Actions

Orchard представив нову концепцію під назвою **Actions**:

- Вони зменшують витік метаданих, використовуючи **єдиний anchor** для всіх Actions у транзакції.  
- Вони об’єднують поля (V4) Spend + Output в одне value commitment.  
- Це дає змогу оптимізувати продуктивність системи доказів Halo2.

Daira пояснює позиції Anchor (zcon3):

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/f6UToqiIdeY"
    title="Zcon3"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>

---

## Баланс вартості та приватність

У деяких випадках (наприклад, у транзакціях між пулами) суми можуть бути видимими для стороннього спостерігача. Однак `valueBalanceSapling` і `valueBalanceOrchard` використовують **гомоморфні commitments**, щоб довести загальну кількість ZEC у shielded пулах і запобігти підробці.

Докладніше: [Захист від підробки в shielded пулах](https://electriccoin.co/blog/defense-against-counterfeiting-in-shielded-pools/)

---

## Майбутні покращення

Команда ECC працює над новими RPC-методами в `zcashd` (на заміну `z_sendmany`), які дадуть користувачам змогу попередньо переглядати та приймати/відхиляти запропоновану транзакцію на основі її характеристик приватності.

---

## Рекомендація

Спробуйте найновішу версію **YWallet**!  
Вона вже показує на екрані "План транзакції" перед тим, як ви натиснете «надіслати», допомагаючи вам робити більш приватні вибори.

Чудова стаття про приватність транзакцій: https://medium.com/@hanh.huynh/

---

**Оригінальний тред від ZecHub (@ZecHub)**  
https://x.com/ZecHub/status/1628498645627666432

---

*Цю сторінку було укладено з оригінального треду Zero to Zero Knowledge для вікі ZecHub.*
