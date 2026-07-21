<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Transactions.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Редактировать страницу"/>
</a>


# Транзакции

ZEC — это широко используемый цифровой актив для платежей, предлагающий сильные функции приватности, которые делают его подходящим для различных транзакций, таких как оплата друзьям, совершение покупок или пожертвования. Чтобы максимально повысить приватность и безопасность, важно понимать, как работают разные типы транзакций в Zcash.

## Shielded Transactions

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/bZM3o_eIovU"
    title="Zcash Explained: Zcash Shielded Transactions"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>

---

Shielded-транзакции происходят, когда вы переводите ZEC в свой shielded-кошелёк. Адрес вашего shielded-кошелька начинается с U или Z. Отправляя shielded-транзакции, вы обеспечиваете себе и людям, с которыми совершаете транзакции, такой уровень приватности, который невозможен в других P2P платёжных сетях. Отправить shielded-транзакцию очень просто — вам нужно лишь убедиться в двух вещах. Во-первых, что вы используете правильный тип кошелька. Самый простой способ убедиться, что вы используете правильный тип кошелька, — скачать [кошелёк](https://zechub.wiki/wallets). Во-вторых, важно перевести ZEC в shielded-кошелёк. При выводе ZEC с биржи вам нужно знать, поддерживает ли биржа shielded- или transparent-вывод. Если она поддерживает shielded-вывод, вы можете просто вывести ZEC на свой shielded-адрес. Если биржа поддерживает только transparent-вывод, тогда вам нужно использовать YWallet и выполнить autoshield для своих ZEC после получения. Использование только shielded-транзакций для отправки и получения средств — лучший способ сохранять приватность и снижать риск утечки данных

## Transparent Transactions

Transparent-транзакции работают схожим образом, но не имеют защиты приватности, из-за чего детали транзакции становятся публично видимыми в блокчейне. Transparent-транзакций следует избегать, если приватность является приоритетом. Примечание: transparent-кошельки могут сталкиваться с проблемами из-за ZIP-317, который требует комиссий, пропорциональных сложности транзакции. Комиссии по умолчанию могут приводить к отклонению или задержкам, поэтому возможность настройки комиссии крайне важна.

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/R-krX1UpsIg"
    title="Learn 🛡️Zcash shielded wallets!"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>


### Управление комиссиями для Transparent Transactions

Рекомендации ZIP-317: Структура комиссий масштабируется в зависимости от сложности транзакции, требуя корректировок сверх стандартной комиссии 0.00001 ZEC.
Пример расчёта: Простая транзакция с одной note может потребовать комиссию 0.0001 ZEC, которая увеличивается примерно на 0.00005 ZEC за каждую дополнительную note.

Изменение комиссий в кошельках

Trust Wallet: Получите доступ к расширенным настройкам, нажав на значок шестерёнки во время создания транзакции. Осторожно настройте поля Miner Tip Gwei и Max Fee Gwei, чтобы избежать сбоя транзакции. Trust Wallet взимает только сетевые комиссии.
Coinomi Wallet: Предлагает три динамических варианта комиссии — Low, Normal, High — в зависимости от состояния сети. Для ручной настройки выберите Custom для поддерживаемых монет или используйте Change Fee в правом верхнем углу. Пользователи могут задавать комиссии за байт или килобайт, что влияет на время подтверждения. Если вы не уверены, рекомендуется использовать динамические варианты.

Эта версия включает рекомендации по управлению комиссиями, динамические варианты комиссий и настройки кастомизации в Trust Wallet и Coinomi, предоставляя пользователям подробную информацию для полного контроля над комиссиями.

#### Ресурсы

[ZIPS](https://zips.z.cash/)

#### Примечание

Пожалуйста, обратите внимание, что самый безопасный способ использовать ZEC — это использовать только shielded-транзакции. Некоторые кошельки находятся в процессе внедрения [unified addresses](https://electriccoin.co/blog/unified-addresses-in-zcash-explained/#:~:text=The%20unified%20address%20(UA)%20is,within%20the%20broader%20Zcash%20ecosystem.), которые позволяют пользователям и биржам объединять transparent- и shielded-адреса. 

## Конвертер ZEC в ZAT
