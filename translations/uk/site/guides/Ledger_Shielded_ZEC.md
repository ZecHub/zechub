# Посібник користувача Shielded ZEC для Ledger

23 вересня 2026 року Ledger додав нативну підтримку shielded ZEC до Wallet Desktop Ledger. Один обліковий запис Zcash тепер містить прозорий баланс і приватний баланс у пулі Ironwood мережі Zcash. Ваші приватні ключі залишаються на вашому Ledger, а кожна транзакція перевіряється й підписується на пристрої.

**Лише для настільної версії.** В оголошенні Ledger зазначено, що shielded ZEC «доступний лише в Wallet Desktop Ledger. Підтримка мобільних пристроїв наразі недоступна, але незабаром з’явиться». Та саме повідомлення відображає настільний застосунок. Перевірено 15 жовтня 2026 року.

## Підготовка

- Пристрій Ledger, на якому працює застосунок Zcash: Nano S Plus, Nano X, Stax або Flex. Поточний застосунок Zcash не призначений для оригінального Nano S.
- Wallet Desktop Ledger версії 4.21 або новішої, завантажений лише з [ledger.com](https://www.ledger.com). У цьому посібнику використовувалася версія 4.24.0.
- Найновіший застосунок Zcash на вашому Ledger (3.9.4 на момент написання цього посібника).
- Невелика сума ZEC для тестування. Усі наведені нижче кроки виконано в mainnet із 0.001 ZEC. За кожну транзакцію стягується невелика мережева комісія (у нашому тесті — 0.00015 ZEC).
- Ваша фраза відновлення з 24 слів має залишатися на папері. Ніколи не вводьте її на комп’ютері й нікому не повідомляйте.

## Покроковий посібник (Wallet Desktop Ledger)

**1. Встановіть або оновіть застосунок Zcash**
- Відкрийте Wallet Ledger, підключіть і розблокуйте свій Ledger та відкрийте **Мої Ledger**. Дозвольте підключення на пристрої.
- Знайдіть **Zcash** у каталозі застосунків, а потім натисніть **Встановити** або **Оновити**, якщо його вже встановлено.
- Відкрийте застосунок Zcash на своєму Ledger. На екрані буде напис «Застосунок Zcash готовий». Прокрутіть праворуч до **Інформація про застосунок**, щоб перевірити версію.

**2. Додайте обліковий запис Zcash**
- У Wallet Ledger виберіть **Додати обліковий запис**. У розділі **Вибрати актив** знайдіть Zcash і виберіть **Zcash (ZEC)**, а не загорнутий токен на кшталт Binance-Peg Zcash Token.
- Коли застосунок Zcash відкрито на вашому Ledger, Wallet Ledger знайде ваш обліковий запис. Позначте його в розділі **Виберіть облікові записи, які хочете додати** та натисніть **Підтвердити**.
- На сторінці облікового запису відображаються **Доступний баланс**, **Прозорий баланс** і **Приватний баланс**, а також кнопка **Увімкнути shielded**.

![Zcash account in Ledger Wallet Desktop showing the desktop-only notice, transparent and private balances, and the Enable shielded button](https://raw.githubusercontent.com/ZecHub/zechub/main/site/guides/assets/ledger-zec-01-account-desktop-only.png)

**3. Увімкніть приватний баланс**
- Натисніть **Увімкнути shielded**. У вікні **Увімкнути приватний баланс Zcash** є чотири кроки: Birthday, UFVK, Device і Confirmation.
- **Birthday:** для нового облікового запису залиште висоту birthday на сьогоднішній даті. Позначайте «Цей обліковий запис раніше отримував shielded ZEC» лише тоді, коли ви точно це знаєте, оскільки сканування з блока 0 може тривати довго.
- **UFVK і Device:** Wallet Ledger попросить ваш Ledger експортувати ваш Unified Full Viewing Key (UFVK). Прочитайте повідомлення на пристрої та підтвердьте дію. Якщо відображається «З’єднання з пристроєм втрачено», переконайтеся, що застосунок Zcash відкрито, швидко підтвердьте дію та натисніть **Повторити**.
- Коли з’явиться **UFVK успішно імпортовано**, натисніть **Почати синхронізацію**. Після завершення синхронізації кнопка зміниться на **Оновити баланс** із часом «Остання синхронізація».
- Ключ перегляду зберігається на вашому комп’ютері. Він може знаходити ваші shielded кошти, але не може їх витрачати.

![Enable Zcash private balance window showing UFVK successfully imported and the Start sync button](https://raw.githubusercontent.com/ZecHub/zechub/main/site/guides/assets/ledger-zec-02-ufvk-imported.png)

**4. Отримайте ZEC та перевірте обидві адреси на своєму Ledger**
- Натисніть **Отримати** й виберіть свій обліковий запис Zcash. Wallet Ledger показує **Адресу для Zcash 1** (прозора, починається з t1) та **Приватну адресу для Zcash 1** (починається з u1). Раніші адреси залишаються дійсними.
- Ваш Ledger покаже «Перевірте адреси Zcash», **Приватну адресу** на двох сторінках, а потім **Публічну адресу**. Порівняйте кожен символ з екраном, перш ніж повідомляти будь-яку з адрес, а потім підтвердьте на пристрої.
- Віддавайте перевагу приватній адресі; використовуйте прозору лише тоді, коли відправник не підтримує нічого іншого.

![Ledger Wallet Receive window showing the transparent address and the private address for Zcash 1](https://raw.githubusercontent.com/ZecHub/zechub/main/site/guides/assets/ledger-zec-03-receive-addresses.png)

![Ledger device screens: Verify Zcash addresses, Private address in two pages, then Public Address](https://raw.githubusercontent.com/ZecHub/zechub/main/site/guides/assets/ledger-zec-04-device-verify-addresses.png)

**5. Перемістіть прозорі ZEC до свого приватного балансу**
- Натисніть **Надіслати**. У розділі **Переказ собі** виберіть **Надіслати на приватний баланс**.
- Введіть суму або використайте 25%, 50%, 75% чи **Макс.** Перевірте мережеву комісію, а потім натисніть **Переглянути**.
- На своєму Ledger перегляньте: «Перевірте транзакцію для надсилання ZEC», «Переказ із публічної на приватну адресу», суму, адресу отримання на двох сторінках, комісію та висоту завершення терміну дії. Переконайтеся, що адреса отримання збігається з вашою приватною адресою з кроку 4, а потім натисніть обидві кнопки на екрані **Підписати транзакцію**.
- Wallet Ledger покаже **Транзакцію надіслано**. У деталях транзакції тип буде вказано як **Приватна (Ironwood)**.
- Wallet Ledger зазначає, що переказ собі пов’язує ваші shielded кошти з вашою публічною адресою. Отримання безпосередньо на приватну адресу зберігає їх непов’язаними.

![Send ZEC window in Ledger Wallet with the Self transfer option Send to private balance](https://raw.githubusercontent.com/ZecHub/zechub/main/site/guides/assets/ledger-zec-05-send-to-private-balance.png)

![Ledger device review screens for moving ZEC from the transparent balance to the private address, ending with Sign transaction and Transaction signed](https://raw.githubusercontent.com/ZecHub/zechub/main/site/guides/assets/ledger-zec-06-device-review-shielding.png)

- Після підтвердження транзакції прозорий баланс зменшиться, а приватний баланс збільшиться. Нові shielded кошти відображатимуться як «дозрівають», доки не матимуть достатньо підтверджень для витрачання.

![Zcash account after shielding: transparent balance reduced, private balance increased and shown as maturing](https://raw.githubusercontent.com/ZecHub/zechub/main/site/guides/assets/ledger-zec-07-balances-after-shielding.png)

**6. Надішліть ZEC зі свого приватного балансу**
- Щойно приватний баланс стане доступним для витрачання, натисніть **Надіслати** та встановіть для **Переказ із** значення **Приватний баланс**.
- Вставте адресу отримувача та введіть суму. Ви можете додати зашифровану **Примітку (необов’язково)** обсягом до 512 байтів, яку може прочитати лише отримувач.
- Перевірте отримувача, суму та комісію на своєму Ledger, а потім натисніть обидві кнопки на екрані **Підписати транзакцію**.

![Sent transaction from the private balance in Ledger Wallet transaction details](https://raw.githubusercontent.com/ZecHub/zechub/main/site/guides/assets/ledger-zec-08-private-send.png)

## Корисно знати

- Shielded ZEC на Ledger наразі доступний лише в настільній версії (перевірено 15 жовтня 2026 року).
- Приватний баланс Wallet Ledger використовує пул Ironwood.
- Ledger повідомляє, що ви можете надати податковому консультанту доступ лише для читання до історії ваших транзакцій. Кожен, хто має ваш ключ перегляду, може бачити вашу shielded історію, тому надавайте його лише навмисно.
- Екрани пристрою в цьому посібнику було знято за допомогою емулятора Speculos від Ledger (Nano S Plus), на якому працював застосунок Zcash версії 3.9.4, підключений до Wallet Desktop Ledger версії 4.24.0 у mainnet Zcash. Фізичний Ledger працює з тим самим застосунком і показує ті самі екрани.

## Додаткова допомога

- [Новинка в Wallet Ledger: нативна підтримка Shielded Zcash](https://www.ledger.com/blog-native-shielded-zcash-support) (оголошення Ledger)
- [Довідковий центр Ledger](https://support.ledger.com)
- [Сторінка гаманців ZecHub Wallet](/using-zcash/wallets)
- [Shielded Pools](/using-zcash/shielded-pools) та [Viewing Keys](/zcash-tech/viewing-keys) на ZecHub
- Інший варіант апаратного гаманця: посібник користувача [Keystone Zashi](/guides/keystone-zashi)
