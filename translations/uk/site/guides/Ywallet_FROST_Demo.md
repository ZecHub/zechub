# Демо Ywallet FROST

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


## Скомпілюйте бінарні файли FROST

[Посилання на Github](https://github.com/ZcashFoundation/frost-zcash-demo/tree/update-zcash-sign)

Використайте вищезазначений репозиторій і дотримуйтесь інструкцій щодо компіляції: 

```bash
cargo build --bin trusted-dealer
cargo build --bin dkg
cargo build --bin coordinator
cargo build --bin participants
```

Бінарні файли будуть у папці target.

## Створіть FROST UA

`./generateFROST_UA.sh`



## Імпортуйте UFVK у Ywallet

Акаунти -> Натисніть + і вставте ufvk з попереднього кроку

## Створіть транзакцію в Ywallet

Вставте будь-який UA і надішліть tx. Збережіть файл.

## Розпочніть процедуру підписання FROST 

`./signFROST_tx.sh rawtxs/mytx signedtxs/mysignedtx`

перший вхідний параметр — це розташування raw tx з попереднього кроку
другий вхідний параметр — це розташування та назва підписаної tx, яку ви хочете транслювати
На цьому етапі ви вказуєте FROST, яку транзакцію всі мають підписати

## Запустіть Coordinator

`./runCoordinator.sh`

Це координує підпис кожного учасника та створює груповий підпис

## Нехай кожен Participant підпише цю транзакцію

```bash
./participantSign.sh key-package-1.json
./participantSign.sh key-package-2.json
```

## Завершіть підписану транзакцію

У вікні coordinator скопіюйте виведений груповий підпис і вставте його у вікно підписання FROST.
Це завершить підписання FROST і виведе 'mysingedtx'


## Транслюйте вашу транзакцію через Ywallet

Натисніть 'More' внизу праворуч у Ywallet і знайдіть 'Broadcast'. Знайдіть 'mysignedtx' і натисніть ok.

Якщо все спрацює, ви отримаєте ID транзакції :)
