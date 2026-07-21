# От нуля к Zero Knowledge: прозрачные и экранированные транзакции и Unified Addresses

**Серия:** От нуля к Zero Knowledge

Если вы впервые изучаете Zcash, то обнаружите, что доступны два типа транзакций: **Transparent** и **Shielded**.  

Сегодня мы разберём их и рассмотрим одну из новых функций в экосистеме #Zcash — **Unified Addresses**.

---

## Прозрачные и экранированные транзакции

- **Transparent Transactions** используют **t-addresses** (в кодировке Base58). Всё публично видно — как и в Bitcoin.  
- **Shielded Transactions** используют адреса, закодированные для пулов **Sapling** или **Orchard**. Они скрывают отправителя, получателя и сумму с помощью доказательств с нулевым разглашением.

**Shielded Transaction** — это любая транзакция с адресами, закодированными для пулов Sapling/Orchard.

![Transparent vs Shielded intro](https://pbs.twimg.com/media/FpmW00HWIAIZpQD.jpg)

**Unified Addresses (UAs)** предназначены для того, чтобы **объединить** экранированные и прозрачные транзакции в одном адресе.

---

## Типы адресов в Zcash

Используются 3 типа адресов:

1. **(T) Transparent** – Base58  
2. **(Z) Sapling** – Bech32  
3. **(UA) Unified Address** – Bech32m  

Количество символов (а значит, и размер QR-кода) увеличивается с каждым типом.

![Address types comparison](https://pbs.twimg.com/media/FpmXe5bXsAEFeLY.png)

![QR code size comparison](https://pbs.twimg.com/media/FpmXmDwXoAIWxov.png)

---

## Как работают Unified Addresses

Адреса и ключи кодируются как последовательность байтов (**Raw Encoding**).  
**Receiver Encoding** включает всю необходимую информацию для перевода актива с использованием определённого протокола.

Raw encoding для Unified Address представляет собой комбинацию кодировок (typecode, length, addr) получателей:

- UA: `0x03`  
- Sapling: `0x02`  
- Transparent: `0x01`  

**Важно**: В каждом UA должен быть **как минимум один экранированный платёжный адрес**. (Адреса Sprout больше не поддерживаются после обновления Canopy.)

![UA encoding structure](https://pbs.twimg.com/media/FpmYW1ZXgAAvALT.png)

Полная спецификация: **[ZIP-316: Unified Addresses](https://zips.z.cash/zip-0316)**

---

## Преимущества Unified Addresses

- **Проще для бирж** — теперь они могут безопаснее поддерживать экранированные депозиты/выводы.  
- **Устойчивость к будущим изменениям** — новые экранированные пулы можно добавлять без нарушения работы кошельков.  
- **Shielded-by-Default** — каждый UA содержит как минимум один экранированный адрес, поэтому приватность всегда доступна.

Это фундаментальный сдвиг, который уже помогает большему объёму ZEC переходить в экранированный пул.

---

## Транзакции Orchard и Actions

Orchard представил новую концепцию под названием **Actions**:

- Они уменьшают утечку метаданных, используя **единый anchor** для всех Actions в транзакции.  
- Они объединяют поля (V4) Spend + Output в единое commitment значения.  
- Это позволяет выполнять оптимизации производительности в системе доказательств Halo2.

Daira объясняет позиции Anchor (zcon3):

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

## Баланс стоимости и приватность

В некоторых случаях (например, при межпуловых транзакциях) суммы могут быть видны внешнему наблюдателю. Однако `valueBalanceSapling` и `valueBalanceOrchard` используют **гомоморфные commitments**, чтобы доказать общий объём ZEC в экранированных пулах и предотвратить подделку.

Подробнее: [Защита от подделки в экранированных пулах](https://electriccoin.co/blog/defense-against-counterfeiting-in-shielded-pools/)

---

## Будущие улучшения

Команда ECC работает над новыми RPC-методами в `zcashd` (которые заменят `z_sendmany`), что позволит пользователям предварительно просматривать предложенную транзакцию и принимать или отклонять её на основе её характеристик приватности.

---

## Рекомендация

Попробуйте последнюю версию **YWallet**!  
Она уже показывает на экране "Transaction Plan" перед отправкой, помогая вам делать более приватный выбор.

Отличная статья о приватности транзакций: https://medium.com/@hanh.huynh/

---

**Оригинальный тред от ZecHub (@ZecHub)**  
https://x.com/ZecHub/status/1628498645627666432

---

*Эта страница была составлена на основе оригинального треда Zero to Zero Knowledge для вики ZecHub.*
