# Демонстрация FROST в Ywallet

> **Ywallet больше не поддерживается.** Его разработчик подтвердил, что приложение не будет обновлено для Ironwood (NU6.3), поэтому оно больше не может отслеживать цепочку, а приведённые ниже шаги нельзя выполнить в основной сети. Эта страница сохранена для справки. Zkool от того же разработчика является поддерживаемым преемником и поддерживает мультиподписи FROST.

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

## Запустите процедуру подписания FROST

`./signFROST_tx.sh rawtxs/mytx signedtxs/mysignedtx`

первый аргумент — расположение необработанной транзакции из предыдущего шага  
второй аргумент — расположение и имя подписанной транзакции, которую вы хотите транслировать  
Здесь вы указываете FROST, какую транзакцию должны подписать все участники

## Запустите координатор

`./runCoordinator.sh`

Он координирует подписи каждого участника и создаёт групповую подпись

## Пусть каждый участник подпишет эту транзакцию

```bash
./participantSign.sh key-package-1.json
./participantSign.sh key-package-2.json
```

## Завершите подписанную транзакцию

В окне координатора скопируйте выведенную групповую подпись и вставьте её в окно подписания FROST.
Это завершит подписание FROST и выведет 'mysingedtx'


## Транслируйте свою транзакцию с помощью Ywallet

Нажмите «More» в правом нижнем углу Ywallet и найдите «Broadcast». Найдите «mysignedtx» и нажмите OK.

Если всё сработает, вы получите идентификатор транзакции :)
