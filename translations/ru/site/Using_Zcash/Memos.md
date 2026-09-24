<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Memos.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Редактировать страницу"/>
</a>

# Memos

#### Отправка зашифрованных memo

При отправке транзакции Z2Z (shielded-to-shielded) вы можете включить memo (сообщение) в транзакцию. Это memo можно использовать для разных целей.

#### Подпись транзакций

Memo в первую очередь используются для подписи платежей. Поскольку shielded-транзакции шифруют ваши данные, вы не можете увидеть, кто отправил вам ZEC и для чего могли быть отправлены эти ZEC. Пользователи могут использовать поле memo, чтобы указать своё имя или псевдоним и дать получателю понять, от кого пришла транзакция. Они также могут описать, для чего была эта транзакция.

#### Отправка сообщения

Ещё один вариант использования зашифрованного memo — отправить сообщение кому-то, у кого есть z-addr. Эти сообщения могут быть о чём угодно: будь то [напоминание другу](https://twitter.com/iansagstette/status/1542142468505870336) или [конфиденциальное сообщение, которое должно оставаться максимально приватным](https://twitter.com/InsideZcash/status/1545800146352578560).

#### Любовные записки в блокчейне

Один человек отправил своей второй половинке любовную записку в одном из первых блоков блокчейна Zcash. Кто-то обнаружил, что его партнёр отправил ему файл через memo Zcash. Этим файлом был билет на особое мероприятие за границей, которое она и её далёкий возлюбленный обсуждали и хотели посетить вместе. Memo было любовной запиской.

#### Продвинутый уровень

> **Историческая справка. Эта демонстрация в описанном виде больше не работает.**
>
> Демонстрация ниже использует zcashd, а её [скрипт получения](https://github.com/ZecHub/zechub/blob/main/site/tutorials/ZcashMagicWormhole/receiveOwlsWormhole.sh) читает мемо через `zcash-cli`. zcashd достиг автоматической остановки End-of-Support 18 июля 2026 года, поэтому этот скрипт не может подключиться к работающему узлу, и он не был перенесён.
>
> Чтение защищённых мемо из командной строки по-прежнему работает в Zallet: `zallet rpc z_listunspent` возвращает каждую полученную защищённую ноту с тем же полем `memoStr`, которое читает скрипт. Команда описана в [кратком справочнике по Zallet](/using-zcash/zallet-quick-reference-guide), а о переводе узла с zcashd рассказано в [руководстве по миграции на Zebra и Zallet](/guides/migration-guide-zcashd-to-zebrad-zallet). Zallet всё ещё находится в стадии бета-тестирования.
>
> Этот раздел сохранён как историческая запись демонстрации Magic-Wormhole.

Вот как использовать Shielded Memo в Zcash вместе с Magic-Wormhole CLI и zcashd, чтобы безопасно отправлять файлы с одного компьютера на другой!: 

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/8iqPCza9o6A"
    title="ДЕМО: Зашифрованная передача файлов с помощью Zcash 📁"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>

#### Ресурсы

[Зашифрованное поле memo](https://electriccoin.co/blog/encrypted-memo-field/)
