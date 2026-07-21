# Демонстрация FROST в Ywallet

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/3IZgxDqQNbw"
    title="Демонстрация транзакции FROST + Ywallet"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>


## Скомпилируйте бинарные файлы FROST

[Ссылка на Github](https://github.com/ZcashFoundation/frost-zcash-demo/tree/update-zcash-sign)

Используйте указанный выше репозиторий и следуйте инструкциям по компиляции: 

```bash
cargo build --bin trusted-dealer
cargo build --bin dkg
cargo build --bin coordinator
cargo build --bin participants
```

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
второй аргумент — это путь и имя подписанной транзакции, которую вы хотите транслировать
На этом этапе вы указываете FROST, какую именно транзакцию должны подписать все участники

## Запустите Coordinator

`./runCoordinator.sh`

Это координирует подпись каждого участника и создает групповую подпись

## Пусть каждый Participant подпишет эту транзакцию

```bash
./participantSign.sh key-package-1.json
./participantSign.sh key-package-2.json
```

## Завершите подписанную транзакцию

В окне coordinator скопируйте выведенную групповую подпись и вставьте её в окно подписи FROST.
Это завершит подписание FROST и создаст файл 'mysingedtx'


## Транслируйте свою транзакцию через Ywallet

Нажмите 'More' в правом нижнем углу Ywallet и найдите 'Broadcast'. Найдите 'mysignedtx' и нажмите ok.

Если всё сработает, вы получите ID транзакции :)
