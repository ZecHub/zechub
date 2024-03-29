# Пулы стоимости Zcash

Мы рассмотрим 4 [пула значений](https://zcash.readthedocs.io/en/latest/rtd_pages/addresses.html) в Zcash, которые включают пулы Sprout, Sapling, Orchard и Transparent. На этой вики-странице также рассказывается об улучшениях в технологии и некоторых передовых методах передачи пула.


## Экранированные пулы

### Росток


![zcash-sprout-launch](https://user-images.githubusercontent.com/81990132/233535478-a84724d7-cb0e-4ad8-bfcc-499f665fba24.png)


Серия Sprout была первым открытым протоколом конфиденциальности с нулевым разглашением без разрешения, запущенным на Zcash, и его иногда называют Zcash 1.0 или «Обычный Zcash». Он был запущен 28 октября 2016 года и стал первой версией Zcash, в которой используется технология доказательства с нулевым разглашением, которая является важной особенностью криптографии Zcash.


Адреса Sprout идентифицируются их первыми двумя буквами, которые всегда «zc». Он был назван «Sprout» с основной целью подчеркнуть, что программное обеспечение было молодым, многообещающим блокчейном с большим потенциалом для роста и открытым для развития.

Серия Sprout использовалась в качестве раннего инструмента для [медленного старта майнинга Zcash](https://electriccoin.co/blog/slow-start-and-mining-ecosystem/), что привело к распределению вознаграждений ZEC и блоков для майнеров. .

Поскольку экосистема Zcash продолжает расширяться за счет увеличения количества защищенных транзакций, было замечено, что серия Zcash Sprout стала ограниченной и менее эффективной, когда речь идет о конфиденциальности пользователей, масштабируемости и обработке транзакций. Это привело к модификации сети и обновлению Sapling.


### Саженец Zcash

![zcash-sapling-vertical-fullcolor-2x](https://user-images.githubusercontent.com/81990132/233535552-f04b727e-078f-483a-8fbc-1628486be0c8.png)

[Zcash Sapling](https://z.cash/upgrade/sapling) — это обновление протокола Zcash, представленное 28 октября 2018 года. Это значительное улучшение по сравнению с более ранней версией, известной как Sprout, которая имела некоторые ограничения. с точки зрения конфиденциальности, эффективности и удобства использования.

Некоторые из обновлений включают улучшенную производительность для экранированных адресов, улучшенные ключи просмотра, позволяющие пользователям просматривать входящие и исходящие транзакции без раскрытия закрытых ключей пользователей, и независимые ключи с нулевым разглашением для аппаратного кошелька во время подписи транзакции.

Zcash Sapling позволяет пользователям выполнять частные транзакции всего за несколько секунд по сравнению с более длительным периодом, который требовался в Sprout Series.

Защита транзакций повышает конфиденциальность, делая невозможным связывание транзакций третьими сторонами и определение суммы перевода ZEC. Sapling также повышает удобство использования за счет снижения вычислительных требований для создания частных транзакций, делая его более доступным для пользователей.

Адреса кошельков Sapling начинаются с «zs», и это можно наблюдать во всех поддерживаемых защищенных кошельках Zcash (YWallet, Zingo Wallet Nighthawk и т. д.), которые имеют встроенные адреса Sapling. Zcash Sapling представляет собой значительное развитие технологий, когда речь идет о конфиденциальности и эффективности транзакций, что делает Zcash практичной и эффективной криптовалютой для пользователей, которые ценят конфиденциальность и безопасность.

### Садовый бассейн

Orchard Shielded Pool был запущен 31 мая 2022 года. Адреса Orchard также известны как унифицированные адреса (UA).

Поскольку унифицированные адреса объединяют приемники для адресов Orchard, Sapling и Transparent, ожидается, что объем средств, хранящихся в защищенных, значительно возрастет. Невозможно отличить средства, отправляемые в прозрачные/защищенные пулы.

Защищенный бассейн Orchard служит значительным усовершенствованием существующих бассейнов. Он формирует отдельный набор анонимности из защищенных пулов Sprout и Sapling, что помогает повысить конфиденциальность и анонимность пользователей.

Транзакции внутри Orchard будут увеличивать размер анонимного набора быстрее, чем транзакции, выполняемые с помощью Sapling, из-за скрытой арности природы «Действий» Orchard по сравнению с входами и выходами UTXO.

Обновление Orchard поможет внести больше улучшений в сеть Zcash, включая более быстрые и эффективные транзакции, повышенную анонимность, улучшенную безопасность и большую гибкость для разработчиков при создании децентрализованных приложений на блокчейне Zcash.

![IMG-20230419-221707](https://user-images.githubusercontent.com/81990132/233535609-6bf85926-567d-42ff-8b3f-9123afe98f65.jpg)

Кошельки Zcash Shielded теперь поддерживают Orchard в своих опциях пула средств. Хороший пример можно найти в приложении Zingo Wallet.


## Прозрачный пул

Прозрачный пул Zcash не защищен и не является частным. Адрес прозрачного кошелька в Zcash начинается с буквы «t», конфиденциальность в этом типе транзакций считается очень низкой.

Прозрачные транзакции в Zcash аналогичны транзакциям биткойнов, которые поддерживают транзакции с несколькими подписями и используют стандартные общедоступные адреса, которые может отправлять и получать любой пользователь сети.


![IMG-20230420-100149](https://user-images.githubusercontent.com/81990132/233535663-bc536044-2537-41b2-9acb-69b3613e9ab6.jpg)

Zcash Transparent в основном используется централизованными биржами для обеспечения высокой прозрачности и сетевого подтверждения при отправке и получении ZEC между пользователями.

Также важно отметить, что хотя адреса Zcash Shielded обеспечивают высокую конфиденциальность во время транзакций, они также требуют больше вычислительных ресурсов для обработки транзакций. Поэтому некоторые пользователи могут использовать прозрачные адреса для транзакций, не требующих такого же уровня конфиденциальности.

---
###

## Рекомендуемая практика переноса пула

Когда речь идет о высоком уровне конфиденциальности во время транзакций в сети Zcash, рекомендуется следовать приведенным ниже рекомендациям.

![20230420_051415_0000.png](https://user-images.githubusercontent.com/38798812/233546739-e9076b2d-bcb5-40a1-96a8-25284dff0786.png)

Транзакции, происходящие между кошельками «от z до z» в блокчейне Zcash, в основном защищены и иногда называются частной транзакцией из-за высокого уровня конфиденциальности. Обычно это лучший и наиболее рекомендуемый способ отправки и получения $ZEC, когда требуется конфиденциальность.

---
![20230421_070131_0000.png](https://user-images.githubusercontent.com/38798812/233552931-d69f4ef3-b065-4d61-8e6b-adbc2edc4d70.png)

Когда вы отправляете ZEC с «Z-адреса» на «T-адрес», это просто означает форму транзакции деэкранирования. В этом типе транзакций уровень конфиденциальности не всегда высок, поскольку некоторая информация будет видна в блокчейне из-за эффекта отправки ZEC на прозрачный адрес. Деэкранирование транзакции не всегда рекомендуется, когда требуется высокий уровень конфиденциальности.

---

![20230421_071247_0000.png](https://user-images.githubusercontent.com/38798812/233555082-455fbcbd-c685-4c1d-91f2-2d911e6a6273.png)

Перенос ZEC с прозрачного адреса (T-адреса) на Z-адрес называется просто экранированием. В этом типе транзакции уровень конфиденциальности не всегда высок по сравнению с транзакцией z-z, но также рекомендуется, когда требуется конфиденциальность.



---

![20230420_091346_0000.png](https://user-images.githubusercontent.com/38798812/233546890-5580a7b9-e8c5-4e2c-a248-3f6338bbe0d1.png)

Отправка ZEC с прозрачного адреса (T-адрес) на другой прозрачный адрес (T-адрес) в сети Zcash (транзакция T-T) очень похожа на транзакцию биткойнов, и поэтому транзакции TT в Zcash всегда называются публичными транзакциями, поскольку обе детали транзакции отправителя и получателя становятся общедоступными, что делает уровень конфиденциальности в такой транзакции очень низким.

Большинство централизованных бирж криптовалют используют прозрачный адрес («T-адрес»), когда дело доходит до транзакций в блокчейне Zcash, но этот тип транзакции (T-T) не будет иметь каких-либо частных свойств.



