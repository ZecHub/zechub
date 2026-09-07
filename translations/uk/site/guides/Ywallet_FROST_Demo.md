# Демонстрація FROST у Ywallet

> **Ywallet більше не підтримується.** Його розробник підтвердив, що його не буде оновлено для Ironwood (NU6.3), тож він більше не може відстежувати ланцюг, а наведені нижче кроки неможливо виконати в mainnet. Цю сторінку збережено для довідки. Zkool, від того самого розробника, є підтримуваним наступником і підтримує мультипідпис FROST.

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/3IZgxDqQNbw"
    title="FROST + Ywallet Transaction Demo"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>


## Компіляція бінарних файлів FROST

[Посилання на Github](https://github.com/ZcashFoundation/frost-zcash-demo/tree/update-zcash-sign)

Використайте наведений вище репозиторій і дотримуйтеся інструкцій з компіляції: 

```bash
cargo build --bin trusted-dealer
cargo build --bin dkg
cargo build --bin coordinator
cargo build --bin participants
```

Бінарні файли будуть у теці target.

## Створення FROST UA

`./generateFROST_UA.sh`



## Імпорт UFVK до Ywallet

Облікові записи -> Натисніть + і вставте ufvk із кроку вище

## Створення транзакції за допомогою Ywallet

Вставте будь-яку UA та надішліть tx. Збережіть файл.

## Запуск процедури підписання FROST 

`./signFROST_tx.sh rawtxs/mytx signedtxs/mysignedtx`

перший вхідний параметр — розташування необробленої tx із кроку вище
другий вхідний параметр — розташування та назва підписаної tx, яку ви хочете транслювати
Саме тут ви вказуєте FROST, яку транзакцію мають підписати всі

## Запуск координатора

`./runCoordinator.sh`

Це координує підпис кожного учасника та створює груповий підпис

## Нехай кожен учасник підпише цю транзакцію

```bash
./participantSign.sh key-package-1.json
./participantSign.sh key-package-2.json
```

## Завершення підписаної транзакції

У вікні координатора скопіюйте виведений груповий підпис і вставте його у вікно підписання FROST.
Це завершить підписання FROST і виведе 'mysingedtx'


## Трансляція вашої транзакції за допомогою Ywallet

Натисніть «More» у нижній правій частині Ywallet і знайдіть «Broadcast». Знайдіть «mysignedtx» та натисніть OK.

Якщо все працює, ви отримаєте ID транзакції :)
