# Демонстрація FROST у Ywallet

## Скомпілюйте бінарні файли FROST

https://github.com/ZcashFoundation/frost-zcash-demo/tree/update-zcash-sign

Скористайтеся вказаним вище репозиторієм і дотримуйтесь інструкцій зі збірки:

`cargo build --bin trusted-dealer`

`cargo build --bin dkg`

`cargo build --bin coordinator`

`cargo build --bin participants`

Бінарні файли будуть у папці target.


## Створіть FROST UA

`./generateFROST_UA.sh`



## Імпортуйте UFVK у Ywallet

Облікові записи -> Натисніть + і вставте ufvk з попереднього кроку

## Створіть транзакцію в Ywallet

Вставте будь-яку UA і надішліть tx. Збережіть файл.

## Розпочніть процедуру підписання FROST

`./signFROST_tx.sh rawtxs/mytx signedtxs/mysignedtx`

перший аргумент — це розташування сирої tx з попереднього кроку
другий аргумент — це розташування та назва підписаної tx, яку ви хочете транслювати
Це частина, де ви вказуєте FROST, яку транзакцію всі мають підписати

## Запустіть Coordinator

`./runCoordinator.sh`

Це координує підписи кожного учасника та створює груповий підпис

## Нехай кожен Participant підпише цю транзакцію

`./participantSign.sh key-package-1.json`


`./participantSign.sh key-package-2.json`

## Завершіть підписану транзакцію

У вікні coordinator скопіюйте груповий підпис, який буде виведено, і вставте його у вікно підписання FROST.
Це завершить підписання FROST і виведе 'mysingedtx'


## Транслюйте свою транзакцію через Ywallet

Натисніть 'More' у нижньому правому куті Ywallet і знайдіть 'Broadcast'. Знайдіть 'mysignedtx' і натисніть ok.

Якщо все спрацює, ви отримаєте ID транзакції :)
