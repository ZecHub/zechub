# Посібник користувача Keystone Zashi

Посібник у Twitter:  => [Twitter-посібник з інтеграції Zashi x Keystone Hardware Wallet](https://x.com/zashi_app/status/1869793574880973144) 

Ця інтеграція означає значну еволюцію у зручності використання Zcash, оскільки забезпечує холодне зберігання захищених ZEC. Спільнота Zcash у минулому стикалася з невдачами з іншими платформами апаратних гаманців, але Keystone став партнером, готовим до співпраці, який прагнув розширювати межі можливого та впроваджувати інновації разом з Electric Coin Company. Команда Keystone отримала грант ZCG для підтримки своєї частини роботи.

## Навчальний посібник Keystone X Zashi

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/ktYf7josJKM"
    title="Keystone X Zashi Tutorial"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>
    

## Підготовка
[Замовте та отримайте свій Keystone 3 Pro або Keystone 3](https://keyst.one) 

Рівень заряду батареї: переконайтеся, що ваш пристрій Keystone має рівень заряду вище 20%.

USB-кабель або SD-картка:

- USB-кабель для оновлення прошивки (входить до комплекту).
- Micro SD-картка (менше 1 ТБ) для оновлень (купується окремо).

Доступ до офіційного вебсайту Keystone для перевірки та оновлення прошивки.

Налаштований застосунок Zashi на вашому мобільному пристрої.

## [Покроковий посібник (пристрій Keystone)](https://keyst.one/get-started) 


**Оберіть свою мову**
-Перевірка пристрою (через QR): перевірка пристрою є надзвичайно важливою для виявлення можливого втручання під час транспортування, запобігання атакам на ланцюг постачання та забезпечення безпеки встановленої прошивки.
  - Відвідайте сторінку перевірки пристрою на вебсайті Keystone.
  - Натисніть Scan QR Code на офіційному вебсайті.
  - Використайте камеру вашого Keystone, щоб сканувати QR-код, показаний на вебсайті.
  - На екрані вашого Keystone з’явиться код перевірки.
  - Введіть цей код на вебсайті, щоб завершити процес перевірки.

- **Оновлення прошивки:**
  - Оновлення через MicroSD-картку
    - Переконайтеся, що ваш гаманець Keystone має щонайменше 20% заряду батареї.
    - Вставте SD-картку у свій комп’ютер і відформатуйте її у FAT32.
    - Завантажте останню версію прошивки Cypherpunk зі [сторінки оновлення прошивки Keystone](https://keyst.one/firmware) і збережіть файл keystone3.bin у кореневому каталозі вашої MicroSD-картки.
    - Вставте SD-картку з прошивкою у ваш гаманець Keystone.
    - Відкрийте опцію "Upgrade" на вашому гаманці Keystone, а потім дотримуйтесь інструкцій на екрані, щоб розпочати процес оновлення.
  - **Оновлення через USB-кабель**
    - Якщо ваша версія прошивки нижча за 1.0.4, вам потрібно буде виконати початкове оновлення за допомогою MicroSD-картки, перш ніж ви зможете перейти до оновлень через USB.
    - Переконайтеся, що ваш гаманець Keystone має щонайменше 20% заряду батареї.
    - Натисніть via USB і використайте USB-кабель, щоб під’єднати ваш гаманець Keystone до комп’ютера. Натисніть [Approve], щоб надати вашому гаманцю Keystone доступ через USB, інакше він може дозволяти лише заряджання.
    - Відкрийте веббраузер на своєму комп’ютері та перейдіть на [сторінку оновлення прошивки Keystone](https://keyst.one/firmware)
    - На сторінці оновлення натисніть кнопку Install Update і дотримуйтесь наданих інструкцій, щоб встановити найновішу прошивку.
- **Створення гаманця:**
    - Надійний пароль: оберіть надійний PIN-код або пароль для захисту вашого гаманця.
    - Назвіть свій гаманець (необов’язково): за бажанням дайте своєму гаманцю назву для легкої ідентифікації або пропустіть цей крок.
    - Оберіть Create New Wallet, якщо ви налаштовуєте гаманець уперше.
    - Ваш пристрій згенерує seed-фразу з 24 слів.
    - Запишіть цю seed-фразу та зберігайте її в безпечному місці.
    - Підтвердьте seed-фразу, перевіривши слова у правильному порядку, як показано на екрані.
- **Підключення гаманця Zashi + Keystone:**
    - На пристрої Keystone: натисніть … на головній сторінці
    - Натисніть Connect Software Wallet і оберіть Zashi. З’явиться QR-код для підключення до Zashi.
    - У застосунку Zashi: натисніть випадне меню zashi (у верхньому лівому куті екрана)
    - Натисніть Connect Hardware Wallet
    - Натисніть Ready to Scan
    - Відскануйте QR-код, показаний на пристрої Keystone
    - У застосунку Zashi: підтвердьте обліковий запис гаманця Keystone, натиснувши показаний обліковий запис
    - Натисніть Connect у нижній частині екрана


## Додаткова допомога

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/Jr6LqtD1W0s"
    title="Connect Keystone Hardware Wallet to Zashi"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>
    

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/t_OHb1KqrRg"
    title="Sign an Outgoing Transaction with Keystone"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>
