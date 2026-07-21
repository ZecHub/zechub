# Руководство по миграции: с zcashd на Zebrad/Zallet

Экосистема Zcash развивается. Традиционный полный узел Zcashd, поддерживаемый *Electric Coin Company (ECC)* / *Zodl*, постепенно заменяется на Zebra и Zallet.

- Zebra — это современная реализация протокола Zcash на Rust, разработанная Zcash Foundation
- Zallet — это легковесный кошелёк, созданный для бесшовного взаимодействия с узлами Zebra и разработанный Zodl

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![ChatGPTImageOct12202508_15_20A](https://hackmd.io/_uploads/SJNBsSYTel.jpg)
</div>

Это руководство проведёт вас через процесс миграции с **Zcashd** на **Zebrad** и **Zallet**, включая настройку, импорт кошелька и устранение распространённых проблем при миграции.

---

## Проект Zcash официально объявил, что zcashd будет выведен из эксплуатации в 2025 году.

**Статус вывода из эксплуатации и что это означает**

- Проект Zcash официально объявил, что zcashd будет выведен из эксплуатации в 2025 году.
- Полные узлы переводятся на Zebrad, реализацию на Rust, в то время как Zallet предназначен для замены кошелёчной части zcashd. 
- В ответ на это проект Zebra отслеживает этап "Zcashd Deprecation", чтобы обеспечить совместимость, миграцию RPC и поддержку экосистемы.
- Для многих методов RPC Zebrad/Zallet будут стремиться стать полной заменой без изменений (эмулируя или повторяя поведение). Другие методы изменятся или могут не поддерживаться.

**Почему стоит мигрировать — помимо вывода из эксплуатации**

Даже если не учитывать вывод из эксплуатации, есть веские причины перейти:
- Безопасность и надёжность: безопасность памяти Rust и современные инструменты снижают риски уязвимостей.
- Производительность и эффективность: Zebrad спроектирован для параллелизма, более эффективного использования ресурсов и более быстрой синхронизации.
- Модульная архитектура: разделение логики узла (Zebrad) и интерфейса кошелька (Zallet) обеспечивает более чёткие границы и лучшие возможности для обновления.
- Совместимость с будущей экосистемой: инструменты, улучшения и остальная часть экосистемы Zcash всё чаще будут ориентироваться на Zebrad/Zallet.
- Спокойствие: вы избежите ситуации, когда останетесь на устаревшем и неподдерживаемом компоненте.

### А теперь перейдём к руководству по миграции

**1. Сделайте резервную копию всего**
* Создайте резервную копию вашего wallet.dat (или любого другого файла кошелька / хранилища ключей) с вашего узла zcashd.

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![bash (1)](https://hackmd.io/_uploads/SJ_0mUtTxg.svg)
</div>

* Сохраните ваш zcash.conf и все пользовательские настройки.
* Экспортируйте копию всех RPC-скриптов или автоматизаций, которые вы используете.
* Убедитесь, что ваши резервные копии корректны (например, попробуйте открыть или проверить их в другой среде).
* Проверьте, какие методы JSON-RPC вы сейчас используете.
* Сравните их с планируемой таблицей совместимости, поддерживаемой на [сайте поддержки Zcash](https://z.cash/support/zcashd-deprecation/?utm_source=chatgpt.com) 
* Подготовьтесь к изменениям или отсутствующим методам (для некоторых могут потребоваться обходные решения или адаптация).

**2. Системные требования и место на диске**
* Убедитесь, что у вас достаточно места на диске (цепочка Zcash большая). Не менее 10 ГБ свободного дискового пространства.
* Убедитесь, что у вашей машины стабильные сеть, CPU и RAM.
* Подключение к интернету 
* Если вы планируете компилировать из исходников, установите Rust и Cargo.

**3. Установка / настройка Zebrad**
Вы можете либо скачать готовый бинарный файл, либо собрать программу из исходников.
* Zcash Foundation публикует релизы и бинарные файлы Zebra. Например, вы можете использовать установочный скрипт или скачать подходящий бинарный файл для вашей ОС.

* Обратите внимание, что в последних версиях Zebra [RPC-эндпоинт больше не включён по умолчанию в Docker.](https://zfnd.org/zebra-2-3-0-release/?utm_source=chatgpt.com)

**Вариант A: Установка готового бинарного файла**  
На **Linux**/**macOS**:

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![bash (2)](https://hackmd.io/_uploads/HJhYu8Y6el.svg)
</div>

Это установит последнюю стабильную версию zebrad.

**Вариант B: Сборка из исходников**

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![bash (3)](https://hackmd.io/_uploads/Syg8FUK6eg.svg)
</div>

После сборки переместите бинарный файл в ваш path:

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![migration 11](https://hackmd.io/_uploads/BJ0zjLY6ll.png)
</div>

**4. Конфигурация и запуск**  
Сгенерируйте конфигурацию по умолчанию:

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![migration2](https://hackmd.io/_uploads/HJV1C8tTxx.png)
</div>

Отредактируйте **zebrad.toml** в соответствии с вашими предпочтениями (адрес прослушивания, порты, каталог состояния, кэширование).

**Запуск узла:**

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![image](https://hackmd.io/_uploads/H1KPkvt6gl.png)
</div>

Узел начнёт синхронизацию с genesis — в зависимости от оборудования и сети это может занять несколько часов (или больше).

**5. Установка / настройка Zallet (кошелька)**

Zallet предназначен для замены кошелёчной части zcashd.

Проверьте страницу GitHub / релизов Zallet на наличие бинарных файлов.

**Или соберите из исходников:**

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![image](https://hackmd.io/_uploads/SyUFxvFTex.png)
</div>

* Запустите GUI или CLI (в зависимости от того, что предоставляет ваша установка).
* Настройте подключение к вашему локальному узлу Zebrad через RPC или API-эндпоинт.

**6. Импорт вашего кошелька zcashd в Zallet**  
Через экспорт приватных ключей

На zcashd экспортируйте ваши приватные ключи:

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![bash (4)](https://hackmd.io/_uploads/rJzgzwFagx.svg)
</div>

* В Zallet выберите Import Keys или аналогичную опцию.
* Укажите файл **zcashd_keys.txt**. 
* Zallet должен распознать и импортировать адреса ZEC и связанные с ними ключи.

**Через seed-фразу** (если применимо)

* Если ваш кошелёк поддерживает резервное копирование через seed-фразу, используйте Restore from Seed Phrase в Zallet.
* Это работает только в том случае, если ваш кошелёк zcashd был создан из seed-фразы (или у вас есть возможность преобразования seed).

**Повторное сканирование кошелька и синхронизация**

* После импорта ключей Zallet запустит повторное сканирование цепочки через Zebrad.
* Дайте Zallet некоторое время на восстановление вашего баланса и истории транзакций.

**7. Проверка балансов и синхронизации**

После импорта Zallet подключится к вашему узлу Zebrad и повторно просканирует блокчейн.
Когда синхронизация завершится, ваши балансы и транзакции должны отображаться точно так же, как и раньше.

Вы можете проверить статус синхронизации вашего узла, выполнив:

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![image](https://hackmd.io/_uploads/SyIyVDY6xl.png)
</div>

Или проверьте логи.

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![image](https://hackmd.io/_uploads/r1HfVPF6gg.png)
</div>

**8. Устранение неполадок**

<div className="overflow-x-auto my-8 rounded-2xl border border-slate-200 dark:border-slate-700">
  <table className="w-full min-w-full border-collapse text-sm">
    <thead className="bg-slate-100 dark:bg-slate-800">
      <tr>
        <th className="px-6 py-4 text-left font-semibold text-slate-900 dark:text-white">Проблема</th>
        <th className="px-6 py-4 text-left font-semibold text-slate-900 dark:text-white">Возможная причина</th>
        <th className="px-6 py-4 text-left font-semibold text-slate-900 dark:text-white">Решение</th>
      </tr>
    </thead>
    <tbody>
      <tr className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-900/50">
        <td className="px-6 py-4">Zebrad не запускается</td>
        <td className="px-6 py-4">Порт занят или неверная конфигурация</td>
        <td className="px-6 py-4">Проверьте **zebrad.toml** и используйте свободный порт</td>
      </tr>
      <tr className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-900/50">
        <td className="px-6 py-4">Медленная синхронизация</td>
        <td className="px-6 py-4">Перегрузка сети</td>
        <td className="px-6 py-4">Убедитесь в стабильности интернета, перезапустите Zebrad</td>
      </tr>
      <tr className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-900/50">
        <td className="px-6 py-4">В кошельке отсутствуют транзакции</td>
        <td className="px-6 py-4">Неполный импорт ключей</td>
        <td className="px-6 py-4">Повторно импортируйте ключи или выполните повторное сканирование в Zallet</td>
      </tr>
      <tr className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-900/50">
        <td className="px-6 py-4">Zallet не может подключиться к узлу</td>
        <td className="px-6 py-4">Узел не запущен или неверный эндпоинт</td>
        <td className="px-6 py-4">Запустите Zebrad и проверьте правильный RPC-порт</td>
      </tr>
      <tr className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-900/50">
        <td className="px-6 py-4">Сбой Zallet</td>
        <td className="px-6 py-4">Устаревшая сборка</td>
        <td className="px-6 py-4">Обновитесь до последнего релиза с GitHub</td>
      </tr>
    </tbody>
  </table>
</div>

**9. Заключение**

Миграция с zcashd на Zebrad и Zallet даёт вам более быстрый, безопасный и современный опыт работы с Zcash.
Благодаря безопасности Rust, модульному дизайну и лучшим инструментам эта конфигурация гарантирует, что ваш узел и кошелёк будут готовы к будущему по мере дальнейшего развития экосистемы Zcash.

Совет: храните ключи вашего кошелька офлайн и регулярно создавайте резервные копии данных Zallet.
Посетите [zebra.zfnd.org](https://zebra.zfnd.org) и [zallet.zfnd.org](https://zallet.zfnd.org) для получения обновлений и поддержки сообщества.
