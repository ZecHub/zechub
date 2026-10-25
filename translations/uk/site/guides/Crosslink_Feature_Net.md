<a href="https://github.com/zechub/zechub/edit/main/site/guides/Crosslink_Feature_Net.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Редагувати сторінку"/>
</a>

# Приєднуйтеся до Crosslink Feature Net

## Коротко

- Feature Net — це публічна тестова мережа Shielded Labs для [Crosslink](/zcash-tech/crosslink-protocol), запропонованого рівня фіналізації, який додає стейкінг поряд із proof-of-work Zcash.
- Вона працює на тестовій монеті cTAZ. Ніщо з того, що ви на ній робите, не переміщує та не наражає на ризик ZEC основної мережі.
- Один настільний застосунок є вузлом, майнером, гаманцем і фіналізатором. Типово він майнить cTAZ та має кнопку крана.
- Стейкінг, анстейкінг і виведення працюють лише протягом «Дня стейкінгу» — одного дня з кожних трьох. Пропустите його — чекатимете наступного.
- Щоб зробити стейкінг, вставте ідентифікатор фіналізатора та натисніть суму. У цьому посібнику як приклад використано фіналізатор ZecHub.
- Два RPC-виклики показують ваше становище: `wallet_staking_positions` і `get_tfl_recency_status`.

*Перевірено з Feature Net версії 14 на Windows 11 (версія 10.0.26200.9550) з 8 по 10 жовтня 2026 року. Програмне забезпечення є прототипом і змінюється з кожним релізом. Якщо те, що ви бачите, відрізняється від цієї сторінки, довіряйте власному запуску та, будь ласка, відкрийте PR.*

## Що таке Feature Net

Crosslink — це пропозиція, яка сьогодні не є частиною Zcash. У FAQ Shielded Labs [Crosslink FAQ](https://shieldedlabs.net/crosslink-faq/) сказано, що їй «потрібно буде пройти стандартний процес управління Zcash», перш ніж вона зможе потрапити до основної мережі. Сторінка [Crosslink Protocol](/zcash-tech/crosslink-protocol) пояснює дизайн.

Щоб випробувати дизайн із реальними користувачами, Shielded Labs запускає те, що називає [incentivized feature nets](https://shieldedlabs.net/crosslink-incentivized-feature-nets/): «серію стимульованих тестнетів». У мережі існують три ролі, і настільний застосунок може виконувати всі з них:

| Роль | Що вона робить |
|---|---|
| Майнер | Створює блоки proof-of-work, як у Zcash сьогодні |
| Стейкер | Блокує cTAZ у делегаційному бонді та спрямовує його на фіналізатор |
| Фіналізатор | Голосує за фіналізацію блоків. Його сила голосу — це делегований йому стейк |

Репозиторій, що лежить в його основі, починається з застереження, яке варто прочитати перед встановленням будь-чого: він «існує, щоб доводити ідеї, а не демонструвати інженерію промислового рівня» і є «кодом, не готовим до промислового використання» ([README](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/README.md)). Запускайте його на машині, де це прийнятно.

### Що змінила версія 14

[Version 14](https://github.com/ShieldedLabs/crosslink_monolith/releases/tag/v14) вийшла 1 жовтня 2026 року. Її мережа починається як звичайна proof-of-work і вмикає Crosslink у три кроки ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/librustzcash/zcash_primitives/src/bft.rs#L546-L555), також показано на [ctaz.cash](https://ctaz.cash/v14)):

| Блок | Що відбувається |
|---|---|
| 20 736 | Відкривається стейкінг |
| 34 560 | Перший склад фіналізаторів формується зі стейків у ланцюзі |
| 36 288 | Починається BFT-фіналізація, а разом із нею — винагороди за стейкінг |

Винагороди за стейкінг починаються з останнього з цих блоків. Бонд, створений раніше, до того часу нічого не заробляє ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebra-chain/src/parameters/network/subsidy.rs#L487-L508)).

Той самий реліз обмежив активний склад 12 фіналізаторами з найбільшим стейком ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/librustzcash/zcash_primitives/src/bft.rs#L884)) і, словами приміток до релізу, надав їм комісію: «10% усіх PoS-винагород у блоці йдуть на ці комісії, тоді як 90% розподіляється між усіма стейкінг-бондами».

### cTAZ і справжній ZEC

cTAZ («Crosslink TAZ») — це тестова монета Feature Net. Ви робите стейкінг cTAZ, ніколи не ZEC.

Справжній ZEC з’являється лише наприкінці. Shielded Labs виділив [500 ZEC](https://shieldedlabs.net/crosslink-incentivized-feature-nets/) для feature nets, а в [release notes](https://github.com/ShieldedLabs/crosslink_monolith/releases/tag/v14) сказано, що він виплачується «пропорційно, лише на основі кількості cTAZ, яку кожен учасник заробив майнінгом або стейкінгом». З цього випливають два наслідки:

- **Монети з крана не враховуються.** cTAZ, які вам дали — кран чи будь-хто інший, — нічого не заробляють, просто лежачи у вашому гаманці. Враховуються лише винагороди за блоки від майнінгу й стейкінгу.
- **Виплати потрібно заявляти, вони не автоматичні.** Shielded Labs оголошує кожен раунд у [forum thread](https://forum.zcashcommunity.com/t/crosslink-incentivized-feature-net/55210). Для раунду 2 учасників просили надіслати viewing key свого гаманця й адресу основної мережі до 4 жовтня 2026 року ([post 94](https://forum.zcashcommunity.com/t/crosslink-incentivized-feature-net/55210/94)). Мережу, на якій працює версія 14 і до якої приєднується цей посібник, було оголошено як раунд 3 ([post 101](https://forum.zcashcommunity.com/t/crosslink-incentivized-feature-net/55210/101)).

## Перед початком

- **Комп’ютер, який можна залишити увімкненим.** Реліз має збірки для Windows, macOS, Ubuntu та Arch Linux. Цей посібник було виконано на Windows, на ПК із процесором Intel Core i5-8350U.
- **День стейкінгу.** Перевірте, коли відкривається наступний, перш ніж щось планувати. Панель [Staker Space's dashboard](https://crosslink.staker.space/) відлічує час до нього.
- **Більше нічого.** Не потрібні ні ZEC, ні обліковий запис, ні реєстрація.

## Крок 1: Завантажте застосунок і перевірте файл

1. Відкрийте [version 14 release](https://github.com/ShieldedLabs/crosslink_monolith/releases/tag/v14) і прокрутіть до **Assets**.
2. Завантажте файл для вашої системи. На Windows це `zebrad_v14_win32.exe`.
3. Порівняйте SHA-256 файлу з дайджестом, який GitHub показує поруч із цим активом.

На Windows у PowerShell:

```powershell
Get-FileHash .\zebrad_v14_win32.exe -Algorithm SHA256 | Format-List
```

```text
Algorithm : SHA256
Hash      : 1D464E31CCC110E175D45E3EDC0B7FB0B9583ACC996E99F4398F390EC111297E
Path      : C:\crosslink\zebrad_v14_win32.exe
```

Дайджест, який GitHub показує для цього файлу, — `1d464e31ccc110e175d45e3edc0b7fb0b9583acc996e99f4398f390ec111297e`. Шістнадцятковий запис не має регістру, тому великі літери вище підходять. Щоб порівняння виконав командний інтерпретатор, а не ваші очі:

```powershell
$expected = "1d464e31ccc110e175d45e3edc0b7fb0b9583acc996e99f4398f390ec111297e"
$actual = (Get-FileHash .\zebrad_v14_win32.exe -Algorithm SHA256).Hash.ToLower()
if ($actual -eq $expected) { "OK" } else { "MISMATCH" }
```

```text
OK
```

Розумійте цінність цієї перевірки. Реліз не має підпису, тож збіг хешу говорить вам, що завантаження повне і це файл, який роздає GitHub. Це не говорить, хто його зібрав. [Verifying Zcash Releases](/guides/verifying-zcash-releases) пояснює різницю.

## Крок 2: Запустіть вузол і дайте йому синхронізуватися

Запустіть застосунок із термінала, щоб його повідомлення під час запуску залишалися на екрані. Використовуйте звичайне вікно PowerShell, а не відкрите через «Запустити від імені адміністратора»: це непідписане прототипне ПЗ і права адміністратора йому не потрібні.

```powershell
.\zebrad_v14_win32.exe
```

Відкриється вікно з назвою «Zcash Crosslink Visualizer». Гаманець розміщено ліворуч, із вкладками **Your Wallet** та **Faucet Wallet**, ланцюг зображено посередині, а фіналізатори перелічено праворуч. Термінал продовжує друкувати журнал вузла. Залиште обидва відкритими, поки користуєтеся мережею.

Примітки до релізу містять посилання на [video of the Windows install](https://www.youtube.com/watch?v=cO-5Oa4B1Tk).

Застосунок зберігає дані в папці кешу: `%LOCALAPPDATA%\zebra` на Windows, `~/.cache/zebra` на Linux та `~/Library/Caches/zebra` на macOS, згідно з примітками до релізу.

**Тримайте секрет при собі.** У цій папці міститься файл із назвою `secret.seed`. Застосунок створює його під час першого запуску ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebrad/src/commands/start.rs#L280-L305)) і виводить із нього ваш гаманець та ідентифікатор фіналізатора ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebrad/src/commands/start.rs#L625-L626)). Застосунок також має кнопку **Copy Seed**, яка копіює той самий секрет до буфера обміну. Кожен, хто має будь-що з цього, контролює ваш гаманець. Ніколи не вставляйте їх у чат, допис на форумі чи знімок екрана.

### Як визначити, що ви синхронізовані

У примітках до релізу сказано, що «немає вбудованого моніторингу того, наскільки близько до вершини мережі ви синхронізовані». У версії 14 дещо є: розкривний список **Network Info** у верхній частині вікна має рядки PoW Height, Wallet Sync та Blocks Behind Known PoW ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-gui/src/ui.rs#L4362-L4373)). Порівняйте свою висоту з тією, що на [Staker Space](https://crosslink.staker.space/) або [ctaz.cash](https://ctaz.cash/).

Вузол також відповідає через RPC:

```powershell
Invoke-RestMethod -Uri http://127.0.0.1:8232 -Method Post -ContentType 'application/json' -Body '{"jsonrpc":"2.0","method":"getblockcount","params":[],"id":1}' | ConvertTo-Json -Depth 20
```

```text
{
    "jsonrpc":  "2.0",
    "id":  1,
    "result":  36490
}
```

RPC-порт `127.0.0.1:8232` у цій збірці відкритий типово й не потребує пароля ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebrad/src/config.rs#L333-L337)). Він слухає лише на вашій машині, і все, що виконується на цій машині, може його викликати.

У цьому запуску перша синхронізація, від блоку 0 до вершини приблизно на блоці 28 400, зайняла близько 50 хвилин.

**Після перезапуску ваш баланс деякий час показує нуль.** Щоразу під час запуску застосунок відновлює гаманець із `secret.seed` та знову сканує ланцюг від блоку 0 ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/wallet/src/lib.rs#L3609-L3623)). Допоки сканування не досягне ваших транзакцій, баланс і стейк показуватимуться як 0. У цьому запуску вони повернулися приблизно через 15 хвилин після перезапуску. Гаманець крана сканується так само ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/wallet/src/lib.rs#L3588)), і під час сканування вкладка Faucet Wallet показувала дуже великий баланс. Ігноруйте обидва, поки Wallet Sync не завершиться.

## Крок 3: Отримайте трохи cTAZ

### Майнінг

Згідно з примітками до релізу, після синхронізації застосунок запускає CPU-майнінг на ваш власний гаманець. Вам не потрібно нічого вмикати. Намайнені монети надходять на прозору адресу вашого гаманця ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebrad/src/commands/start.rs#L349-L355)).

Чи знайде він блок — інше питання. У примітках попереджають, що «вас можуть випередити інші, які майнять швидше, тому успіх не гарантований». Типово вбудований майнер використовує один потік CPU ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebra-rpc/src/config/mining.rs#L97-L100)).

Щоб використовувати більше потоків, задайте змінну середовища в тому самому вікні PowerShell перед запуском застосунку ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebrad/src/config.rs#L109-L128)). У цьому запуску використовувалися чотири:

```powershell
$env:ZEBRA_MINING__INTERNAL_MINER_THREADS = "4"
.\zebrad_v14_win32.exe
```

Змінна діє лише доти, доки відкрите це вікно. Коли її було задано, лічильник процесора Windows показував, що вузол використовує час, еквівалентний чотирьом-п’ятьом процесорам, у відсотках від одного логічного процесора:

```powershell
(Get-Counter '\Process(zebrad_v14_win32)\% Processor Time' -SampleInterval 2 -MaxSamples 3).CounterSamples.CookedValue
```

```text
506.362346582771
509.688760671639
505.957457577538
```

Результат: Intel Core i5-8350U, який майнив у чотири потоки з ранку 8 жовтня до дня 9 жовтня, не знайшов жодного блоку.

### Або скористайтеся краном

Застосунок має кнопку **Receive cTAZ** у нижньому правому куті. У вихідному коді версії 14 одне натискання надсилає 0,5 cTAZ із гаманця крана до вашого ([amount](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/wallet/src/lib.rs#L3073), [send](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/wallet/src/lib.rs#L5018-L5021)). Кран — це один гаманець, який має кожна копія застосунку ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/wallet/src/lib.rs#L3579-L3583)), а вкладка **Faucet Wallet** показує його баланс.

Кнопка вимкнена, якщо кран має не більше ніж 5,01 cTAZ у shielded-монетах ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-gui/src/ui.rs#L3975-L3989)). Вкладка також рахує намайнені краном монети, а вони стають shielded лише партіями рівно по 10 cTAZ плюс комісія ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/wallet/src/lib.rs#L4880-L4884)), тож вкладка може показувати багато коштів, поки кнопка залишається сірою. У цьому запуску вона залишалася сірою 8 і 9 жовтня, а при наведенні показувала «The faucet is mining more funds.», хоча вкладка показувала 14.74695 cTAZ.

**Коли кнопка сіра, запитайте власний вузол.** Вузол має метод запиту до крана, `requestfaucetdonation` ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebra-rpc/src/methods.rs#L314-L315)), який не застосовує правило кнопки щодо 5,01 cTAZ. Підставте власну адресу замість `YOUR_ADDRESS` (це поле `address` у `wallet_spendable_funds` нижче):

```powershell
Invoke-RestMethod -Uri http://127.0.0.1:8232 -Method Post -ContentType 'application/json' -Body '{"jsonrpc":"2.0","method":"requestfaucetdonation","params":[{"address":"YOUR_ADDRESS"}],"id":1}' | ConvertTo-Json -Depth 20
```

```text
{
    "jsonrpc":  "2.0",
    "id":  1,
    "result":  {
                   "amount":  50000000
               }
}
```

Така відповідь означає, що запит поставлено в чергу, а не що його вже надіслано. У цьому запуску 0,5 cTAZ із крана було намайнено в блоці 33 306, а витрачати їх можна було на блоці 33 322. Запитуйте один раз: кран спільний, і другий запит для тієї самої адреси відхиляється, поки перший очікує ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/wallet/src/lib.rs#L3553)).

### Або попросіть іншого учасника

Будь-хто в мережі може надіслати вам cTAZ кнопкою **Send** у застосунку. У цьому запуску інший учасник надіслав 31 cTAZ. Вони надійшли як «Received» із приміткою «send from user wallet» — саме таку примітку додає власна функція Send застосунку ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/wallet/src/lib.rs#L5036)). Запитайте у [forum thread](https://forum.zcashcommunity.com/t/crosslink-incentivized-feature-net/55210) та надайте лише свою адресу.

Монет із крана та подарунків достатньо, щоб навчитися стейкінгу. Вони не зараховуються до винагород ZEC.

### Перевірте, що ви можете витратити

```powershell
Invoke-RestMethod -Uri http://127.0.0.1:8232 -Method Post -ContentType 'application/json' -Body '{"jsonrpc":"2.0","method":"wallet_spendable_funds","params":[],"id":1}' | ConvertTo-Json -Depth 20
```

Ось такою була відповідь після надходження 0,5 cTAZ із крана, з укороченою адресою:

```text
{
    "jsonrpc":  "2.0",
    "id":  1,
    "result":  {
                   "address":  "utest1vqszm53j...mqmdj",
                   "committed_zats":  0,
                   "pending_zats":  0,
                   "spendable_zats":  50000000,
                   "tip_height":  33322,
                   "unshielded_zats":  0
               }
}
```

Суми вказані в затоші: 100 000 000 становлять один cTAZ. Shielded-монетам потрібно 3 підтвердження, перш ніж їх можна буде витрачати ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebra-rpc/src/methods.rs#L621-L634)). Монети з крана та від інших учасників потрапляють у `spendable_zats`. Намайнені монети прозорі, тому вони потрапляють у `unshielded_zats` ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/wallet/src/lib.rs#L4659)).

Через один блок після другого стейку в цьому запуску решта балансу відображалася в `pending_zats`. За кілька блоків її знову можна було витрачати.

## Крок 4: Зробіть стейкінг на фіналізатора

### Дочекайтеся Дня стейкінгу

Стейкінг, анстейкінг і виведення приймаються лише тоді, коли

```text
block height mod 10,368 < 3,456
```

це вікно тривалістю 3 456 блоків на початку кожних 10 368. За цільового часу блоку мережі 25 секунд це один день із кожних трьох ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/librustzcash/zcash_primitives/src/transaction/mod.rs#L1540-L1547)). Перші вікна версії 14 відкриваються на блоках 20 736, 31 104, 41 472 і 51 840.

Згідно з примітками до релізу, застосунок оголошує початок і кінець кожного Дня стейкінгу. У цьому запуску його список блоків показував червоний рядок «* STAKING DAY END *» між блоками 34 559 і 34 560.

**У примітках до релізу сказано дві різні речі.** У переліку змін наведено «~1 day for Staking Day and ~3 days for the Staking Cycle», що відповідає коду. Нижче розділ, перенесений із сезону 1, досі каже, що День стейкінгу починається кожні 150 блоків і триває 70. Керуйтеся першим. Рядок завершення вище стоїть там, де перше правило закриває вікно (34 560 mod 10 368 = 3 456); за другим правилом блок 34 560 потрапляв би у вікно.

### Виберіть фіналізатор

Фіналізатор називається своїм ідентифікатором — рядком, що починається з `zfinv1`. ZecHub публікує ідентифікатор фіналізатора, який він запускає, у [`zechub_validator_crosslink.json`](https://github.com/ZecHub/zechub/blob/main/zechub_validator_crosslink.json):

```text
zfinv1j65qJgeSId7ssZk6a71NvQG2KjD5hfJCYxWkCSPvQSmwibffVw52UYU72wKbrEL0-cw-C4PQoO5IlLgbsgA3q_Gf1mzYIKcnixNP9XXVgphIDuLI6RBMhjFfYWyzp4YN
```

Копіюйте ідентифікатор із джерела, якому довіряєте. Згідно з примітками до релізу, застосунок також перелічує фіналізаторів у правій панелі, з іконкою копіювання ліворуч від кожного.

Після стейкінгу історія гаманця та RPC називають фіналізатор за шістнадцятковим ключем замість його ідентифікатора. Для фіналізатора ZecHub цей ключ — `2941ef23...266aae8f`.

Вибирайте фіналізатору, якому довіряєте. Дизайн не має автоматичного слешингу, але дозволяє «скоординований користувачами хардфорк, який спалює весь стейк, делегований названому фіналізатору» ([Crosslink book, огляд дизайну](https://shieldedlabs.github.io/crosslink_book/branches/main/crosslink-design-overview-20260914.html)).

Вибір також визначає, хто голосує. Кожен активний бонд отримує свою частку винагороди за стейкінг. Якщо його фіналізатор входить до 12 у складі, десята частина цієї частки надходить фіналізатору як комісія. Бонд, спрямований на фіналізатор поза цими 12, зберігає всю свою частку, але цей фіналізатор не голосує ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebra-state/src/service.rs#L2063-L2079)).

### Зробіть стейкінг

1. Скопіюйте ідентифікатор фіналізатора.
2. На вкладці **Your Wallet** натисніть **Stake**.
3. Натисніть **Paste Identity**. Рядок над кнопкою зміниться на перші та останні символи ідентифікатора — `[zfinv1j6..YWyzp4YN]` для ZecHub. Перевірте його, перш ніж продовжити.
4. Натисніть суму. Суми мають фіксовані кроки, найменший — 0,01 cTAZ, і підсвічуються лише суми, які покриває ваш баланс. За 0,5 cTAZ були доступні +0,01 cTAZ та +0,1 cTAZ.

**Ніщо не просить вас підтвердити дію, і, здається, нічого не відбувається.** У цьому запуску, словами тестувальника: «I clicked it once and nothing happened, it just turned grey and lit up back.» Стейкінг пройшов. Історія гаманця показала «Staked @ 33334 to 2941ef23..266aae8f», комісія становила 0,00015 cTAZ, а гаманець показував 0,010 cTAZ Staked. Другий стейкінг за кілька хвилин створив другий бонд на блоці 33 348.

Кожен стейкінг створює власний делегаційний бонд. Фіксовані суми та День стейкінгу існують для конфіденційності: вони ускладнюють відрізнення стейку однієї людини від стейку іншої.

## Крок 5: Перевірте своє становище

### Ваші бонди

```powershell
Invoke-RestMethod -Uri http://127.0.0.1:8232 -Method Post -ContentType 'application/json' -Body '{"jsonrpc":"2.0","method":"wallet_staking_positions","params":[],"id":1}' | ConvertTo-Json -Depth 20
```

Ось такою була відповідь на блоці 36 490, через два дні після стейкінгу:

```text
{
    "jsonrpc":  "2.0",
    "id":  1,
    "result":  {
                   "active":  {
                                  "2941ef2309a4156342f285f9302ab601bd4dbd6b3a99b1ecde219207266aae8f":  [
                                                                                                           {
                                                                                                               "create_height":  33334,
                                                                                                               "create_txid":  "6824b24834eb8ca13befb3a817765e512fd25132166f0b38ad096503c4fc5a35",
                                                                                                               "initial_val":  1000000,
                                                                                                               "latest_val":  1003451,
                                                                                                               "pk":  "128a0ae7fef05e338d6b613939a45cb7773d8e9c98915cadef6fffa898f4e28d"
                                                                                                           },
                                                                                                           {
                                                                                                               "create_height":  33348,
                                                                                                               "create_txid":  "f4d932738ef4104b8663f21e5666e60a0236b117a7883391e9870a0029d25ba2",
                                                                                                               "initial_val":  1000000,
                                                                                                               "latest_val":  1003451,
                                                                                                               "pk":  "f113e0c15eaf6e89621314d88ed15d9fb035a5afeee4606af7173f9d60c48c0c"
                                                                                                           }
                                                                                                       ]
                              },
                   "withdrawable":  [

                                    ]
               }
}
```

Виклик не приймає параметрів. Він повертає ваші активні бонди, згруповані під ключем фіналізатора, якого кожен із них підтримує, а також бонди, які завершили анстейкінг і можуть бути виведені. Кожен бонд показує суму стейкінгу (`initial_val`), його поточну вартість (`latest_val`), а також транзакцію та висоту блоку, що його створили. Винагороди додаються до самого бонду: на блоці 36 490 кожен бонд у 1 000 000 затоші зріс до 1 003 451.

**Вікно Edit Stake показує кожен бонд удесятеро завеликим.** У цьому запуску кожен бонд на 0,01 cTAZ у власному рядку читався як 0,100 cTAZ, а після початку винагород — як 0,1003536 cTAZ, тоді як підсумки над рядками (0,020 cTAZ, пізніше 0,02007 cTAZ) відповідали RPC. Керуйтеся підсумками та RPC.

Те саме вікно показувало попереджувальний трикутник поруч із фіналізатором до і після початку фіналізації. У вихідному коді трикутник означає, що ваш застосунок не вважає цей фіналізатор онлайн, а онлайн-фіналізатор натомість отримує іконку Wi‑Fi ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-gui/src/ui.rs#L2646-L2648)). Попри це бонди отримували винагороди.

### Фіналізатори

```powershell
Invoke-RestMethod -Uri http://127.0.0.1:8232 -Method Post -ContentType 'application/json' -Body '{"jsonrpc":"2.0","method":"get_tfl_recency_status","params":[],"id":1}' | ConvertTo-Json -Depth 20
```

Згідно з примітками до релізу, це повідомляє, де ваш вузол перебуває в процесі голосування, а також для кожного фіналізатора — коли ваш вузол востаннє чув від нього та як той голосував.

До блоку 36 288 кожне поле дорівнює нулю, а список порожній. Ось відповідь на блоці 33 354:

```text
{
    "jsonrpc":  "2.0",
    "id":  1,
    "result":  {
                   "now_utc":  0,
                   "my_height":  0,
                   "my_round":  0,
                   "my_step":  0,
                   "my_locked_round":  0,
                   "my_valid_round":  0,
                   "finalizer_statuses":  [

                                          ]
               }
}
```

Після початку фіналізації список містить фіналізаторів зі складу. На блоці 36 490 він містив 12, серед них ZecHub `2941ef23...`, що відповідає обмеженню складу в 12. Це початок тієї відповіді, обрізаний після першого запису:

```text
{
    "jsonrpc":  "2.0",
    "id":  1,
    "result":  {
                   "now_utc":  1791628531,
                   "my_height":  8,
                   "my_round":  0,
                   "my_step":  0,
                   "my_locked_round":  -1,
                   "my_valid_round":  -1,
                   "finalizer_statuses":  [
                                              [
                                                  "8239a79bc2f224f9f2a276a1050ec9945866253be7da4bdf27c4186c8e588dee",
                                                  {
                                                      "no_yes_votes_in_my_height":  [
                                                                                        [
                                                                                            0,
                                                                                            0
                                                                                        ],
                                                                                        [
                                                                                            0,
                                                                                            0
                                                                                        ]
                                                                                    ],
                                                      "highest_round_vote":  0,
                                                      "last_seen_new_info_utc":  0,
                                                      "last_direct_connection_utc":  null
                                                  }
                                              ],
```

За кілька хвилин права панель застосунку показала «Finalizers (23)».

### На Linux та macOS

[source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebra-rpc/src/methods.rs#L602-L610) надає виклик у формі `curl`. Змініть назву методу для інших викликів. Цю форму не запускали для цього посібника:

```bash
curl -X POST -H "Content-Type: application/json" -d \
'{ "jsonrpc": "2.0", "method": "get_tfl_recency_status", "params": [], "id": 1 }' \
http://127.0.0.1:8232
```

На Linux, за словами приміток до релізу, вам, імовірно, потрібно встановити `xclip`, перш ніж у застосунку запрацюють копіювання та вставлення.

### Одна RPC-назва, на яку варто звернути увагу

Примітки до релізу версії 14 описують виклик стейкінгу з назвою `wallet_staking_action`, який приймає об’єкт. У вихідному коді версії 14 немає методу з такою назвою, і в цьому запуску вузол відповів:

```text
{
    "jsonrpc":  "2.0",
    "id":  1,
    "error":  {
                  "code":  -32601,
                  "message":  "Method not found"
              }
}
```

Метод стейкінгу, який він реєструє, — [`staking_command`](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebra-rpc/src/methods.rs#L418-L420); він приймає один рядок, що містить запит як JSON, а фіналізатор задається його ідентифікатором `zfinv1` ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebra-crosslink/src/lib.rs#L750-L760)). Його не випробовували для цього посібника.

## Анстейкінг і виведення

Бонд не можна скасувати в день його створення. Від початку до завершення потрібно три Дні стейкінгу: стейкінг в одному, анстейкінг у пізнішому, виведення у третьому. У примітках до релізу додано, що один бонд не може виконати дві стейкінг-дії в один День стейкінгу.

*Не виконувалося для цього посібника. З приміток до релізу версії 14:* щоб виконати анстейкінг, натисніть **Edit Stake**, виберіть бонд зі списку Staked Bonds і натисніть іконку ланцюга. Щоб вивести кошти в пізніший День стейкінгу, натисніть **Edit Stake**, виберіть бонд зі списку Withdrawable Bonds і натисніть іконку грошей. Переміщення бонду до іншого фіналізатора, яке в примітках називається retargeting, дозволене будь-коли.

## Де стежити за мережею

Вкладка [Crosslink на ZecHub Tools](https://zechub.wiki/tools?tool=crosslink) збирає інструменти в одному місці під повідомленням «Staking on this network does not move ZEC»:

- Розміщені, без потреби у вузлі: [Staker Space](https://crosslink.staker.space/) — «жива панель для поточного тестнету cTAZ» із висотою, майнерами, швидкістю розв’язань, відліком до Дня стейкінгу та фіналізацією; і [ctaz.cash](https://ctaz.cash/) — із виробництвом майнінгу, складом фіналізаторів, пірами та заявками назв стейкінг-адрес.
- На власній машині: `zcash-explorer`, сторінка `/live/crosslink` якого показує активацію, затримку фіналізації, склад і позиції стейкінгу; та `crosslink_indexer` — індекс SQLite вузла Crosslink.

## Поширені помилки

**Планування за годинником замість висоти блоку.** Дні стейкінгу рахуються блоками. Слідкуйте за відліком на панелі, а не за календарем.

**Стейкінг в останні хвилини вікна.** Правило перевіряється щодо блоку, який містить вашу транзакцію ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebra-consensus/src/transaction.rs#L941-L953)), тому стейкінг має бути намайнений до закриття вікна, а не просто надісланий.

**Очікування намайнити свій стейк.** Чотирипотоковий CPU-майнер на Intel Core i5-8350U не знайшов жодного блоку між 8 та 9 жовтня. Отримайте перші cTAZ із крана або від іншого учасника.

**Повторне натискання, бо здавалося, що нічого не сталося.** Кожне натискання суми створює новий бонд. Спочатку перевірте історію гаманця або `wallet_staking_positions`.

**Паніка після перезапуску.** Ваш баланс і стейк показують нуль, доки гаманець не завершить повторне сканування. Дочекайтеся завершення Wallet Sync.

**Сприйняття cTAZ як іграшкових грошей або секрету як чогось нешкідливого.** cTAZ — тестова монета, але зароблені вами cTAZ визначають вашу частку справжнього ZEC. Захищайте `secret.seed` так само, як гаманець.

**Читання старих інструкцій.** Примітки до релізу містять текст із попередніх сезонів поруч із новими правилами. Якщо вони суперечать тому, що робить ваш вузол, ваш вузол має рацію.

## Пов’язані сторінки

- [Crosslink Protocol](/zcash-tech/crosslink-protocol) — дизайн, який тестує ця мережа
- [Shielded Labs](/zcash-organizations/shielded-labs) — команда, що стоїть за Crosslink
- [Verifying Zcash Releases](/guides/verifying-zcash-releases) — що контрольна сума доводить, а чого не доводить
- [Zebra Full Node](/zcash-tech/zebra-full-node) — вузол, на якому побудовано застосунок Feature Net
- [Zcash Testnet](/using-zcash/testnet) — звичайна тестова мережа Zcash, яка є іншою мережею

## Джерела

- [Version 14 release notes](https://github.com/ShieldedLabs/crosslink_monolith/releases/tag/v14), Shielded Labs, 1 жовтня 2026 року
- [Crosslink: Incentivized Feature Nets](https://shieldedlabs.net/crosslink-incentivized-feature-nets/), Shielded Labs, 2 квітня 2026 року
- [Crosslink: Incentivized Feature Net](https://forum.zcashcommunity.com/t/crosslink-incentivized-feature-net/55210), Zcash Community Forum
- [Crosslink FAQ](https://shieldedlabs.net/crosslink-faq/), Shielded Labs
- [The Crosslink book](https://shieldedlabs.github.io/crosslink_book/), Shielded Labs

---

*Кроки на цій сторінці виконувалися з Feature Net версії 14 на Windows 11 (версія 10.0.26200.9550) з 8 по 10 жовтня 2026 року. Твердження, яке посилається на примітки до релізу або вихідний код, узято з них. Усе, позначене «не виконувалося», не було випробувано.*
