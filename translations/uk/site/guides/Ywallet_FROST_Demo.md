# Демонстрація FROST у Ywallet

> **Ywallet більше не підтримується.** Його розробник підтвердив, що його не буде оновлено для Ironwood (NU6.3), тому він більше не може стежити за блокчейном, а наведені нижче кроки неможливо виконати в mainnet. Цю сторінку збережено для довідки. Zkool, від того ж розробника, є підтримуваним наступником і підтримує мультипідпис FROST.

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/3IZgxDqQNbw"
    title="Демонстрація транзакції FROST + Ywallet"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>


## Скомпілюйте бінарні файли FROST

[Посилання на Github](https://github.com/ZcashFoundation/frost-zcash-demo/tree/update-zcash-sign)

Використайте наведений вище репозиторій і дотримуйтеся інструкцій зі компіляції: 

```bash
cargo build --bin trusted-dealer
cargo build --bin dkg
cargo build --bin coordinator
cargo build --bin participants
```

Бінарні файли будуть у папці target.

## Створіть FROST UA

`./generateFROST_UA.sh`



## Імпортуйте UFVK до Ywallet

Облікові записи -> Натисніть + і вставте ufvk із кроку вище

## Створіть транзакцію за допомогою Ywallet

Вставте будь-яку UA і надішліть tx. Збережіть файл.

## Запустіть процедуру підписання FROST

`./signFROST_tx.sh rawtxs/mytx signedtxs/mysignedtx`

перший вхідний параметр — розташування необробленої tx із кроку вище  
другий вхідний параметр — розташування та назва підписаної tx, яку ви хочете транслювати  
Це частина, де ви повідомляєте FROST, яку транзакцію мають підписати всі

## Запустіть Coordinator

`./runCoordinator.sh`

Це координує підпис кожного учасника та створює груповий підпис

## Нехай кожен Participant підпише цю транзакцію

```bash
./participantSign.sh key-package-1.json
./participantSign.sh key-package-2.json
```

## Завершіть підписану транзакцію

У вікні координатора скопіюйте виведений груповий підпис і вставте його у вікно підписання FROST.
Це завершить підписання FROST і виведе 'mysingedtx'


## Транслюйте вашу транзакцію за допомогою Ywallet

Натисніть «More» у правому нижньому куті Ywallet і знайдіть «Broadcast». Знайдіть «mysignedtx» і натисніть OK.

Якщо все спрацює, ви отримаєте ідентифікатор транзакції :)
