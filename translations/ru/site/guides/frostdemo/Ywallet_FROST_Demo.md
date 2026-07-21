# Демонстрация FROST в Ywallet

## Скомпилируйте бинарные файлы FROST

https://github.com/ZcashFoundation/frost-zcash-demo/tree/update-zcash-sign

Используйте указанный выше репозиторий и следуйте инструкциям по компиляции: 

`cargo build --bin trusted-dealer`

`cargo build --bin dkg`

`cargo build --bin coordinator`

`cargo build --bin participants`

Бинарные файлы будут находиться в папке target.


## Создайте FROST UA

`./generateFROST_UA.sh`



## Импортируйте UFVK в Ywallet

Accounts -> Нажмите + и вставьте ufvk из предыдущего шага

## Создайте транзакцию в Ywallet

Вставьте любой UA и отправьте транзакцию. Сохраните файл.

## Запустите процедуру подписи FROST

`./signFROST_tx.sh rawtxs/mytx signedtxs/mysignedtx`

первый аргумент — это путь к необработанной транзакции из предыдущего шага
второй аргумент — это путь и имя подписанной транзакции, которую вы хотите отправить в сеть
На этом этапе вы указываете FROST, какую транзакцию должны подписать все участники

## Запустите Coordinator

`./runCoordinator.sh`

Он координирует подписи всех участников и создает групповую подпись

## Пусть каждый Participant подпишет эту транзакцию

`./participantSign.sh key-package-1.json`


`./participantSign.sh key-package-2.json`

## Завершите подписанную транзакцию

В окне coordinator скопируйте выведенную групповую подпись и вставьте ее в окно подписи FROST.
Это завершит процесс подписи FROST и выведет `mysingedtx`


## Отправьте вашу транзакцию в сеть с помощью Ywallet

Нажмите 'More' в правом нижнем углу Ywallet и найдите 'Broadcast'. Найдите `mysignedtx` и нажмите ok.

Если все сработает, вы получите ID транзакции :)
