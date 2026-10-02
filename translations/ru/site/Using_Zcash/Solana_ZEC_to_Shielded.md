<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Solana_ZEC_to_Shielded.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Редактировать страницу"/>
</a>

# Есть ZEC в Solana? Переместите его в экранированный Zcash

Эта страница для вас, если ZEC появился в вашем кошельке Solana, потому что у вас есть ZCAT или другой токен Solana, выплачивающий своим держателям ZEC. Чтобы выполнить эти шаги, вам не нужно ничего продавать. Вы переместите уже имеющийся у вас ZEC из Solana в кошелёк Zcash и получите его в экранированном виде.

Мы выполнили каждый шаг ниже с реальным переводом 27 сентября 2026 года, начав с 0.00266336 ZEC в Phantom. Комиссии, время и экраны на этой странице соответствуют тому, что увидели мы.

---

## Чем вы на самом деле владеете

ZEC в вашем кошельке Solana — это токен в Solana, а не монеты в сети Zcash. NEAR OmniBridge выпускает его и держит настоящие ZEC в цепочке Zcash в качестве обеспечения; мост работает в Solana с октября 2025 года. Его часть в Solana работает на сообщениях Wormhole и NEAR Chain Signatures, а не на лёгком клиенте Zcash, поэтому сторона Solana надёжна лишь настолько, насколько надёжны эти две системы. Люди называют его «бумажным ZEC». Он отслеживает цену ZEC, но каждый баланс и каждый перевод находятся в публичном реестре Solana под адресом вашего кошелька, и пока он остаётся там, его нельзя экранировать.

Убедитесь, что у вас настоящий токен. В Phantom нажмите **ZEC** и прокрутите до **О Zcash**. Адрес контракта должен быть:

```
A7bdiYdS5GjqGFtxf17ppRHtDKPkkRqbKtR27dxvQXaS
```

![Phantom's About Zcash panel showing the contract address A7bd…QXaS on the Solana network](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Using_Zcash/assets/solana-zec-to-shielded/01-phantom-zec-mint.png)

Phantom сокращает его до `A7bd…QXaS`, поэтому сравните первые и последние символы либо найдите полный адрес в [Solscan](https://solscan.io/token/A7bdiYdS5GjqGFtxf17ppRHtDKPkkRqbKtR27dxvQXaS). Любой другой токен «ZEC» в вашем кошельке, независимо от названия или логотипа, не является этим токеном. Не трогайте его.

---

## Зачем его перемещать

Экранированный ZEC — это смысл Zcash. Когда ваш ZEC находится в экранированном пуле, отправитель, получатель и сумма каждого платежа зашифрованы в цепочке Zcash. Никто, просматривающий обозреватель блоков, не увидит ваш баланс.

У вас уже есть ZEC. Перемещение его в кошелёк Zcash даёт вам ту часть, которая делает его Zcash, и убирает мост из схемы: нативный ZEC в вашем собственном кошельке не зависит от того, выполнит ли кто-либо выкуп.

[Кто может видеть ваш платёж Zcash?](/start-here/who-can-see-your-zcash-payment) подробно объясняет, что остаётся скрытым.

---

## Выберите кошелёк Zcash

ZecHub не выбирает его за вас. Выберите кошелёк из [ZecHub каталога кошельков](/wallets) и проверьте две метки на карточке кошелька перед установкой:

- **Ironwood: готов.** Ironwood — это пул, в который поступает новый экранированный ZEC после обновления [Ironwood](/zcash-tech/ironwood) 28 июля 2026 года. Старый пул Orchard больше не принимает новые средства.
- **Автоматическое экранирование.** Полезно, если платёж поступает прозрачно: кошелёк перемещает этот ZEC в экранированный пул за вас. Не считайте эту метку заменой **Ironwood: готов**. Кошелёк может иметь автоматическое экранирование и при этом не иметь пула Ironwood (сегодня Edge находится в таком состоянии в каталоге). В большинстве других кошельков вместо этого есть кнопка **Экранировать**.

Устанавливайте кошелёк по ссылке на его карточке в каталоге, а не из результатов поиска или рекламы. Запишите seed-фразу на бумаге и храните её офлайн.

Ваш кошелёк показывает два типа адресов:

![A Zcash wallet's Receive screen with a shielded address starting u1 and a transparent address starting t1](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Using_Zcash/assets/solana-zec-to-shielded/02-zodl-receive.png)

| Начинается с | Тип | Что видит общественность |
|---|---|---|
| `u1` | Unified Address | Ничего о вас, но только если платёж поступает в экранированный пул |
| `t1` | Прозрачный адрес | Ваш адрес и сумму навсегда, как в Solana |

Используйте `u1`, который ваш кошелёк помечает как экранированный. `u1` — это набор получателей, и некоторые кошельки помещают в него прозрачного получателя рядом с экранированным. Отправитель, который может платить только на прозрачные адреса, использует его, и ваш платёж станет публичным, даже если вы вставили `u1`. Экранированный адрес нашего тестового кошелька не имеет прозрачного получателя, поэтому этого не могло произойти. [Экранированные пулы](/using-zcash/shielded-pools) подробнее рассматривает получателей. Некоторые кошельки показывают новый `u1` каждый раз, когда вы открываете «Получить»; это нормально, и все они принадлежат вам. По этой причине на скриншоте получения и в поле получателя near.com на этой странице используются разные префиксы `u1`.

Для нашего теста мы использовали ZODL, потому что этот кошелёк уже был у нас настроен. Только кошельки, помеченные в каталоге как **Ironwood: готов**, могут получать новую экранированную стоимость.

---

## Переместите его

Маршрут состоит из двух частей: поместите ваш ZEC в NEAR Intents из Phantom, затем отправьте его на ваш адрес Zcash. Для первой части мы использовали [solswap.org](https://solswap.org) — сайт, созданный NEAR для пользователей Solana, а для второй — [near.com](https://near.com), собственное приложение NEAR. Руководство ZecHub [Как обменять ZEC в кошельке Phantom](/using-zcash/solswap) подробнее рассматривает экраны solswap. Не используйте для этого собственную кнопку **Swap** в Phantom: токен у вас уже есть, и его обмен ни к чему не приведёт.

Держите немного SOL в Phantom для комиссии Solana.

### 1. Внесите ваш ZEC на solswap.org

1. Откройте Phantom, перейдите на вкладку браузера, самостоятельно введите `solswap.org` и подключите свой кошелёк.
2. Нажмите **Deposit**. Установите **Asset** на **Zcash**, **Network** на **Solana**, а способ — на **Wallet**.
3. Введите сумму (или нажмите **Max**) и подтвердите транзакцию в Phantom.

![solswap Deposit screen with Zcash as the asset, Solana as the network and Wallet as the method](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Using_Zcash/assets/solana-zec-to-shielded/03-solswap-deposit.png)

Наш депозит попал в блок Solana в 15:09:08 (UTC+1), а через девять секунд solswap показал его статус как **Completed**.

![solswap deposit history showing Completed, +0.0026 ZEC](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Using_Zcash/assets/solana-zec-to-shielded/04-solswap-deposit-complete.png)

Теперь ваш ZEC находится в вашем балансе NEAR Intents. Ваш ключ Phantom авторизует каждое исходящее перемещение, решатели NEAR Intents выполняют доставку, а NEAR Intents может удерживать баланс для проверки соответствия требованиям (см. примечания о доверии ниже).

### 2. Отправьте его на ваш адрес Zcash через near.com

У solswap тоже есть страница **Withdraw**, но у нас она не работала. Поля **Received amount** и **Fee** оставались со значением «–», а кнопка ничего не делала, независимо от того, выбирали ли мы Zcash или Solana в качестве сети.

![solswap Withdraw form with the received amount and fee stuck at a dash](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Using_Zcash/assets/solana-zec-to-shielded/05-solswap-withdraw-blank.png)

Если это случится с вами, ваш ZEC не застрял. Баланс привязан к ключу вашего кошелька, а не к сайту, поэтому его может получить любое приложение NEAR Intents, в которое вы войдёте с этим кошельком. Мы завершили перевод на near.com:

1. Перейдите на `near.com` и войдите с тем же кошельком Phantom.
2. Ваш баланс solswap отображается в разделе **Move legacy assets** (near.com называет балансы из старых приложений NEAR Intents «legacy»). Нажмите **Withdraw** в строке ZEC. Вам не нужно **Move**.

![near.com Move legacy assets page listing 0.0026 ZEC with Move and Withdraw buttons](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Using_Zcash/assets/solana-zec-to-shielded/06-nearcom-legacy-assets.png)

3. Установите **Network** на **Zcash**, вставьте адрес `u1` вашего кошелька в поле **Recipient** и сверяйте первые и последние шесть символов с адресом в кошельке.

![near.com Withdraw legacy asset form with Zcash as the network and a u1 recipient, receive at least 0.00233164 ZEC, about 2 minutes](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Using_Zcash/assets/solana-zec-to-shielded/07-nearcom-withdraw.png)

4. Нажмите **Review withdrawal**, прочитайте сводку и нажмите **Send**.

![near.com Review send screen: network Zcash, recipient receives at least 0.00233164 ZEC, fee 0 ZEC, you pay 0.00266336 ZEC](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Using_Zcash/assets/solana-zec-to-shielded/08-nearcom-review.png)

5. Phantom попросит вас **Sign Message** для near.com. Эта подпись авторизует NEAR Intents на перемещение вашего баланса. Она не требует SOL, но это не делает её безвредной: сайт-двойник может показать такой же запрос и с его помощью опустошить ваш баланс NEAR Intents. Прежде чем нажать **Confirm**, проверьте всё перечисленное ниже и нажмите **Cancel**, если хотя бы один пункт не выполнен:
   - Сайт, указанный в запросе, — `near.com`. (Депозит на шаге 1 был обычным запросом транзакции Phantom от `solswap.org`; проверяйте это имя таким же образом.)
   - Откройте **Message** и найдите `"verifying_contract": "intents.near"`.
   - Сообщение представляет собой читаемый текст, как на скриншоте. Если это нечитаемый набор данных или сайт не совпадает с сайтом в адресной строке, отклоните его.
   - Никогда не запрашивается ваша seed-фраза. Подписание никогда не требует её ввода.

![Phantom Sign Message request from near.com on the Solana network](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Using_Zcash/assets/solana-zec-to-shielded/09-phantom-sign-message.png)

6. near.com показывает **Processing send**, **Sending** и **Complete**. **View on explorer** открывает запись NEAR Intents о переводе.

![near.com status screen: Sending 0.0023 ZEC, all three steps complete](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Using_Zcash/assets/solana-zec-to-shielded/10-nearcom-complete.png)

![NEAR Intents explorer record: created 3:59:28 PM, withdrawn to the u1 address 4:07:55 PM, with the Zcash withdraw transaction ID](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Using_Zcash/assets/solana-zec-to-shielded/11-intents-explorer.png)

### Сколько стоил наш тест и сколько времени он занял

| | Наш тест |
|---|---|
| ZEC внесено из Phantom | 0.00266336 ZEC |
| ZEC получено в кошельке Zcash | 0.00241336 ZEC, экранировано |
| Стоимость со стороны ZEC | 0.00025 ZEC (near.com показал «Fee 0 ZEC»; стоимость включена в котировку) |
| SOL, потраченные на депозит | 0.00156844 SOL, из которых 0.00008 SOL — сетевая комиссия |
| Минимум | Не достигнут. solswap указывал минимальный депозит 0.00000001 ZEC, а near.com принял 0.0026 ZEC |
| Депозит, из Phantom в solswap | 9 секунд |
| Вывод, от подписания на near.com до ZEC в кошельке Zcash | Около 8 минут (near.com оценивал примерно в 2) |

Записи: депозит Solana [5ijsgRrh…AjLkx](https://solscan.io/tx/5ijsgRrhViNTtFMmnsfJDSo3HhRmt3Ri7WB513oBoQLxfGNswDxvHnakwW1yyqXznTTCSxnUkooAHDKowz9AjLkx), NEAR Intents [79c23cfd…a405a9](https://explorer.near-intents.org/transactions/79c23cfd43928de5522c182e26f8f052dc9c43d53430ca497b40e016a6a405a9), Zcash [28d6da27…481034](https://mainnet.zcashexplorer.app/transactions/28d6da27d74dc91e45175a7aff6023bc85578603dd77f1b49782a28f8f481034) в блоке 3,498,141. Комиссии и время меняются в зависимости от нагрузки сети, поэтому экран проверки является окончательным источником данных при выполнении перевода.

Мост NEAR публикует минимум 0.01 ZEC и комиссию 0.00047 ZEC для стандартных выводов Zcash. near.com не применил ни один из них к нашим 0.0026 ZEC. Если приложение отклоняет небольшую сумму, попробуйте near.com, прежде чем пополнять баланс.

### Другие маршруты и доверие в каждом из них

Каждый маршрут из Solana доверяет OmniBridge, поскольку мост хранит ZEC, обеспечивающий ваш токен. Кроме того:

- **Описанный выше маршрут** доверяет NEAR Intents. Ваша подпись авторизует перевод, решатели доставляют ZEC на стороне Zcash, а NEAR Intents может удерживать средства для проверки соответствия требованиям; в 2026 году держатель Zcash [сообщил о крупном обмене, удерживаемом неделями](https://www.cryptotimes.io/2026/09/11/zcash-holder-says-589k-usdt-stuck-on-near-intents-50-days-after-zodl-swap/). Вы также подключаете свой кошелёк к двум сайтам, поэтому каждый раз проверяйте адресную строку.
- **Кошельки со встроенным NEAR Intents** (ищите функцию NEAR Intents в [каталоге](/wallets)) используют ту же систему внутри кошелька Zcash. То же доверие, меньше сайтов. Мы не тестировали это с ZEC в Solana.
- **Биржа**, только если она принимает депозиты этого токена в сети Solana, чего большинство не делает. Вы передаёте хранение и обычно свою личность, а многие биржи отправляют ZEC только на адреса `t1`. См. [кастодиальные биржи](/using-zcash/custodial-exchanges).

---

## Экранируйте и проверьте

Он прибыл экранированным. Наш ZEC был отправлен на адрес `u1` и сразу поступил в экранированный пул Ironwood. Прозрачного этапа не было, и вручную экранировать ничего не требовалось. Кошелёк отображал его как **Receiving…** со значком экранирования в 16:07 (UTC+1), пока собирал подтверждения.

![Zcash wallet activity showing Receiving 0.00241336 ZEC with a shield icon](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Using_Zcash/assets/solana-zec-to-shielded/12-zodl-receiving.png)

Чтобы проверить это самостоятельно, откройте транзакцию в своём кошельке и скопируйте идентификатор транзакции.

![Zcash wallet transaction details with the transaction ID and timestamp](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Using_Zcash/assets/solana-zec-to-shielded/13-zodl-tx-details.png)

Вставьте его в [обозреватель блоков Zcash](https://mainnet.zcashexplorer.app). Не смущайтесь из-за сводки. У нас указано **Shielded Inputs / Outputs 0 / 0** и **Transferred from/to shielded pool 0.0 ZEC**, потому что сводка обозревателя пока не учитывает Ironwood. Видимые адреса `t1` находятся на стороне отправителя (ZEC, который он потратил, и сдача, которую он сохранил), а не на вашей.

![Explorer summary for the transaction: two transparent inputs, one transparent output, 0/0 shielded](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Using_Zcash/assets/solana-zec-to-shielded/14-explorer-summary.png)

Нажмите **Raw TX: JSON** и найдите `ironwood`. Отрицательное значение `valueBalance` означает, что ZEC входит в пул Ironwood. У нас это было `-0.00241336` — ровно столько, сколько поступило, — и в транзакции ничто не показывает, кто его получил.

![Raw transaction JSON with the ironwood section highlighted: valueBalance -0.00241336 (highlight added)](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Using_Zcash/assets/solana-zec-to-shielded/15-explorer-raw-ironwood.png)

[Что может видеть обозреватель блоков](/zcash-tech/what-a-block-explorer-can-see) объясняет остальные поля.

### Если вы вставите адрес `t1`

Мы не отправляли на такой адрес, но результат предсказуем. ZEC поступает на прозрачный баланс вашего кошелька, а обозреватель навсегда показывает любому человеку ваш адрес `t1` и сумму. Затем кошелёк с автоматическим экранированием перемещает его в экранированный пул; в противном случае нажмите **Shield**, что требует небольшой сетевой комиссии. Транзакция экранирования тоже публична, поскольку она тратит средства с вашего адреса `t1`. Ничего не теряется, но связь между этим депозитом и вашим кошельком остаётся в цепочке. Вставьте `u1`.

---

## Оставайтесь в безопасности

Новые держатели становятся мишенью. Почти каждое мошенничество, которое вы увидите, относится к одному из следующих типов:

- **Неправильный тип адреса.** Адрес Zcash начинается с `u1`, `t1`, `zs` или `tex1`. Адрес Solana не имеет ни одного из этих префиксов. Никогда не отправляйте нативный ZEC на адрес Solana и никогда не отправляйте токен Solana на адрес Zcash.
- **Сервисы только с прозрачными адресами.** Некоторые мосты, сайты обмена и биржи могут отправлять только на адреса `t1`. Это допустимо, если вы экранируете ZEC сразу после его поступления. Только не оставляйте его там.
- **Поддельные кошельки.** Устанавливайте приложения только по ссылке на карточке [каталога кошельков](/wallets) или в официальном магазине приложений, на который она указывает. Поддельные приложения криптокошельков всё же попадают в магазины приложений и выглядят точно как настоящие.
- **Фишинг seed-фразы.** Ни кошельку, ни мосту, ни сайту обмена, ни агенту поддержки, ни модератору, ни раздаче токенов никогда не нужна ваша seed-фраза. Подписание сообщения никогда не требует её ввода. Каждый, кто просит её, пытается вас обокрасть. [Восстановление средств](/using-zcash/recovering-funds) рассматривает вариант этого мошенничества «мы восстановим ваш кошелёк».
- **Мошеннические токены и сайты «claim».** Токены под названием ZEC, Zcash или чем-то похожим появляются в кошельках Solana без запроса, часто со ссылкой на «claim» большего количества. Подключение кошелька к этой ссылке может опустошить его. Проверьте адрес контракта в начале этой страницы и игнорируйте всё остальное.
- **Вредоносные запросы подписи.** Запрос «Sign Message» может переместить ваш баланс NEAR Intents без комиссии SOL. Подписывайте только на `near.com` или `solswap.org` и только когда в сообщении указан `intents.near` (шаг 5 выше показывает, что нужно проверить).
- **Сайты-двойники.** Вводите `solswap.org` и `near.com` самостоятельно или используйте закладки. Не переходите по ссылкам из личных сообщений, ответов или рекламы.

---

## Что делать с экранированным ZEC

- Сохраняйте конфиденциальность при тратах: [Использование ZEC конфиденциально](/guides/using-zec-privately)
- Найдите места, где его принимают: [Где потратить ZEC](/using-zcash/spend-zcash/top-10-places-to-spend-zec)
- Отправьте его с прикреплённым личным сообщением: [Заметки](/using-zcash/memos)
- Заплатите кому-либо, не связывая свою личность: [Отправить деньги без привязки личности](/zcash-use-cases/send-money-without-linking-identity)
