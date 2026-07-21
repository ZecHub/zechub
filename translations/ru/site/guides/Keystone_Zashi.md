# Руководство пользователя Keystone Zashi

Руководство в Twitter:  => [Руководство по интеграции аппаратного кошелька Zashi x Keystone в Twitter](https://x.com/zashi_app/status/1869793574880973144) 

Эта интеграция знаменует собой значительный шаг вперёд в удобстве использования Zcash, поскольку делает возможным холодное хранение защищённых ZEC. Сообщество Zcash в прошлом сталкивалось с неудачами с другими платформами аппаратных кошельков, но Keystone стал партнёром, готовым к сотрудничеству, который захотел расширять границы возможного и внедрять инновации вместе с Electric Coin Company. Команда Keystone получила грант ZCG для финансирования своей части работы.

## Учебное руководство Keystone X Zashi

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
    

## Подготовка
[Закажите и получите ваш Keystone 3 Pro или Keystone 3](https://keyst.one) 

Уровень заряда батареи: убедитесь, что уровень заряда вашего устройства keystone превышает 20%.

USB-кабель или SD-карта:

- USB-кабель для обновления прошивки (в комплекте).
- Карта Micro SD (менее 1 ТБ) для обновлений (приобретается отдельно).

Доступ к официальному сайту Keystone для верификации и обновления прошивки.

Настроенное приложение Zashi на вашем мобильном устройстве.

## [Пошаговое руководство (устройство Keystone)](https://keyst.one/get-started) 


**Выберите свой язык**
-Верификация устройства (через QR): верификация устройства крайне важна для выявления возможной компрометации во время транспортировки, предотвращения атак на цепочку поставок и обеспечения безопасности установленной прошивки.
  - Перейдите на страницу верификации устройства на сайте Keystone.
  - Нажмите Scan QR Code на официальном сайте.
  - Используйте камеру Keystone, чтобы отсканировать QR-код, показанный на сайте.
  - На экране Keystone появится код подтверждения.
  - Введите этот код на сайте, чтобы завершить процесс верификации.

- **Обновление прошивки:**
  - Обновление через карту MicroSD
    - Убедитесь, что ваш кошелёк Keystone заряжен как минимум на 20%.
    - Вставьте SD-карту в компьютер и отформатируйте её в FAT32.
    - Загрузите последнюю версию прошивки Cypherpunk со [страницы обновления прошивки Keystone](https://keyst.one/firmware) и сохраните файл keystone3.bin в корневой каталог вашей карты MicroSD.
    - Вставьте SD-карту с прошивкой в ваш кошелёк Keystone.
    - Откройте пункт "Upgrade" на вашем кошельке Keystone, затем следуйте инструкциям на экране, чтобы начать процесс обновления.
  - **Обновление через USB-кабель**
    - Если ваша версия прошивки ниже 1.0.4, вам нужно будет выполнить первоначальное обновление с помощью карты MicroSD, прежде чем вы сможете перейти к обновлениям через USB.
    - Убедитесь, что ваш кошелёк Keystone заряжен как минимум на 20%.
    - Нажмите via USB и с помощью USB-кабеля подключите ваш кошелёк Keystone к компьютеру. Нажмите [Approve], чтобы предоставить вашему кошельку Keystone доступ по USB, иначе он может разрешить только зарядку.
    - Откройте веб-браузер на вашем компьютере и перейдите на [страницу обновления прошивки Keystone](https://keyst.one/firmware)
    - На странице обновления нажмите кнопку Install Update и следуйте предоставленным инструкциям, чтобы установить последнюю версию прошивки.
- **Создание кошелька:**
    - Надёжный пароль: выберите сложный PIN-код или пароль для защиты вашего кошелька.
    - Назовите ваш кошелёк (необязательно): при желании дайте вашему кошельку имя для удобной идентификации или пропустите этот шаг.
    - Выберите Create New Wallet, если вы настраиваете кошелёк впервые.
    - Ваше устройство сгенерирует сид-фразу из 24 слов.
    - Запишите эту сид-фразу и храните её в безопасном месте.
    - Подтвердите сид-фразу, проверив слова в правильном порядке, как показано на экране.
- **Подключение кошелька Zashi + Keystone:**
    - На устройстве Keystone: нажмите … на главной странице
    - Нажмите Connect Software Wallet и выберите Zashi. Появится QR-код для подключения к Zashi.
    - В приложении Zashi: нажмите на выпадающее меню zashi (в левом верхнем углу экрана)
    - Нажмите Connect Hardware Wallet
    - Нажмите Ready to Scan
    - Отсканируйте QR-код, отображаемый на устройстве Keystone
    - В приложении Zashi: подтвердите учётную запись кошелька Keystone, нажав на отображаемую учётную запись
    - Нажмите Connect внизу экрана


## Дополнительная помощь

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
