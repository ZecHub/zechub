# Демонстрация FROST в Ywallet

> **Ywallet больше не поддерживается.** Его разработчик подтвердил, что он не будет обновлён для Ironwood (NU6.3), поэтому больше не может следовать за блокчейном, а приведённые ниже шаги невозможно выполнить в основной сети. Эта страница сохранена для справки. Zkool от того же разработчика является поддерживаемым преемником и поддерживает мультиподпись FROST.

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


## Компиляция бинарных файлов FROST

[Ссылка на Github](https://github.com/ZcashFoundation/frost-zcash-demo/tree/update-zcash-sign)

Используйте указанный выше репозиторий и следуйте инструкциям по компиляции: 

```bash
cargo build --bin trusted-dealer
cargo build --bin dkg
cargo build --bin coordinator
cargo build --bin participants
```

Бинарные файлы будут находиться в папке target.

## Создание FROST UA

`./generateFROST_UA.sh`



## Импорт UFVK в Ywallet

Accounts -> Нажмите + и вставьте ufvk из предыдущего шага

## Создание транзакции с помощью Ywallet

Вставьте любой UA и отправьте транзакцию. Сохраните файл.

## Запуск процедуры подписания FROST

`./signFROST_tx.sh rawtxs/mytx signedtxs/mysignedtx`

Первый ввод — расположение необработанной транзакции из предыдущего шага.
Второй ввод — расположение и имя подписанной транзакции, которую вы хотите транслировать.
Здесь вы указываете FROST, какую транзакцию должны подписать все участники.

## Запуск координатора

`./runCoordinator.sh`

Это координирует подписи каждого участника и создаёт групповую подпись.

## Пусть каждый участник подпишет эту транзакцию

```bash
./participantSign.sh key-package-1.json
./participantSign.sh key-package-2.json
```

## Завершение подписанной транзакции

В окне координатора скопируйте выведенную групповую подпись и вставьте её в окно подписания FROST.
Это завершит подписание FROST и выведет 'mysingedtx'


## Трансляция транзакции с помощью Ywallet

Нажмите «More» в правом нижнем углу Ywallet и найдите «Broadcast». Найдите «mysignedtx» и нажмите OK.

Если всё сработает, вы получите идентификатор транзакции :)
