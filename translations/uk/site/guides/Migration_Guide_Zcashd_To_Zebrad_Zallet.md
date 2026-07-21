# Посібник з міграції: від zcashd до Zebrad/Zallet

Екосистема Zcash розвивається. Традиційний повний вузол Zcashd, який підтримується *Electric Coin Company (ECC)* / *Zodl*, поступово замінюється на Zebra і Zallet.

- Zebra — це сучасна реалізація протоколу Zcash мовою Rust, розроблена Zcash Foundation
- Zallet — це легкий гаманець, створений для безшовної взаємодії з вузлами Zebra, розробленими Zodl

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![ChatGPTImageOct12202508_15_20A](https://hackmd.io/_uploads/SJNBsSYTel.jpg)
</div>

Цей посібник проведе вас через міграцію з **Zcashd** на **Zebrad** і **Zallet**, включно з налаштуванням, імпортом гаманця та усуненням типових проблем під час міграції.

---

## Проєкт Zcash офіційно оголосив, що zcashd буде виведено з експлуатації у 2025 році.

**Статус виведення з експлуатації та що це означає**

- Проєкт Zcash офіційно оголосив, що zcashd буде виведено з експлуатації у 2025 році.
- Повні вузли мігрують на Zebrad, реалізацію на Rust, тоді як Zallet має замінити компонент гаманця в zcashd. 
- У відповідь проєкт Zebra відстежує етап "Zcashd Deprecation", щоб забезпечити сумісність, міграцію RPC та підтримку екосистеми.
- Для багатьох RPC-методів Zebrad/Zallet прагнутимуть бути повноцінною заміною без додаткових змін (емуляція або відповідність поведінці). Інші зміняться або можуть не підтримуватися.

**Чому варто мігрувати — не лише через виведення з експлуатації**

Навіть якщо не брати до уваги виведення з експлуатації, є переконливі причини перейти:
- Безпека та надійність: безпечна робота з пам’яттю в Rust і сучасний інструментарій зменшують ризики вразливостей.
- Продуктивність та ефективність: Zebrad спроєктований для паралелізму, ефективнішого використання ресурсів і швидшої синхронізації.
- Модульна архітектура: розділення логіки вузла (Zebrad) та інтерфейсу гаманця (Zallet) забезпечує чіткіші межі та кращі шляхи оновлення.
- Сумісність з майбутньою екосистемою: інструменти, покращення та решта екосистеми Zcash дедалі більше орієнтуватимуться на Zebrad/Zallet.
- Спокій: ви уникнете ситуації, коли залишитесь із застарілим і непідтримуваним компонентом.

### Тепер перейдемо до посібника з міграції

**1. Зробіть резервну копію всього**
* Зробіть резервну копію вашого wallet.dat (або будь-якого іншого файлу гаманця / сховища ключів) з вашого вузла zcashd.

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![bash (1)](https://hackmd.io/_uploads/SJ_0mUtTxg.svg)
</div>

* Збережіть ваш zcash.conf і всі власні налаштування.
* Експортуйте копію всіх RPC-скриптів або автоматизацій, якими ви користуєтесь.
* Переконайтеся, що ваші резервні копії дійсні (наприклад, в іншому середовищі спробуйте їх відкрити або перевірити).
* Перегляньте, від яких JSON-RPC-методів ви зараз залежите.
* Порівняйте їх із запланованою таблицею сумісності, що підтримується на [сайті підтримки Zcash](https://z.cash/support/zcashd-deprecation/?utm_source=chatgpt.com) 
* Підготуйтеся до змін або відсутніх методів (для деяких можуть знадобитися обхідні рішення чи адаптація).

**2. Системні вимоги та дисковий простір**
* Переконайтеся, що у вас достатньо місця на диску (ланцюг Zcash великий). Щонайменше 10 ГБ вільного дискового простору.
* Переконайтеся, що ваш пристрій має стабільну мережу, CPU та RAM.
* Підключення до інтернету 
* Якщо ви плануєте компілювати з джерельного коду, у вас мають бути встановлені Rust і Cargo.

**3. Встановлення / налаштування Zebrad**
Ви можете або завантажити попередньо зібраний бінарний файл, або зібрати програму з джерельного коду.
* Zcash Foundation публікує релізи та бінарні файли для Zebra. Наприклад, ви можете використати інсталяційний скрипт або завантажити відповідний бінарний файл для вашої ОС.

* Зверніть увагу, що в останніх версіях Zebra [кінцева точка RPC більше не ввімкнена за замовчуванням у Docker.](https://zfnd.org/zebra-2-3-0-release/?utm_source=chatgpt.com)

**Варіант A: Встановлення з попередньо зібраного бінарного файлу**  
На **Linux**/**macOS**:

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![bash (2)](https://hackmd.io/_uploads/HJhYu8Y6el.svg)
</div>

Це встановить останню стабільну версію zebrad.

**Варіант B: Збірка з джерельного коду**

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![bash (3)](https://hackmd.io/_uploads/Syg8FUK6eg.svg)
</div>

Після збірки перемістіть бінарний файл у ваш path:

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![migration 11](https://hackmd.io/_uploads/BJ0zjLY6ll.png)
</div>

**4. Конфігурація та запуск**  
Згенеруйте стандартний конфіг:

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![migration2](https://hackmd.io/_uploads/HJV1C8tTxx.png)
</div>

Відредагуйте **zebrad.toml** відповідно до ваших уподобань (адреса прослуховування, порти, каталог стану, кешування).

**Запуск вузла:**

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![image](https://hackmd.io/_uploads/H1KPkvt6gl.png)
</div>

Вузол почне синхронізацію з genesis — залежно від обладнання та мережі це може тривати кілька годин (або більше).

**5. Встановлення / налаштування Zallet (гаманця)**

Zallet створений, щоб замінити частину zcashd, пов’язану з гаманцем.

Перевірте GitHub / сторінку релізів Zallet на наявність бінарних файлів.

**Або зберіть із джерельного коду:**

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![image](https://hackmd.io/_uploads/SyUFxvFTex.png)
</div>

* Запустіть GUI або CLI (залежно від того, що передбачає ваше встановлення).
* Налаштуйте його на підключення до вашого локального вузла Zebrad через RPC або API endpoint.

**6. Імпорт вашого гаманця zcashd у Zallet**  
Через дамп приватного ключа

У zcashd експортуйте ваші приватні ключі:

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![bash (4)](https://hackmd.io/_uploads/rJzgzwFagx.svg)
</div>

* У Zallet виберіть Import Keys або схожу опцію.
* Вкажіть файл **zcashd_keys.txt**. 
* Zallet має розпізнати та імпортувати адреси ZEC і пов’язані з ними ключі.

**Через seed-фразу** (якщо застосовно)

* Якщо ваш гаманець підтримує резервне копіювання через seed, скористайтеся функцією Restore from Seed Phrase у Zallet.
* Це працює лише якщо ваш гаманець zcashd був похідним від seed-фрази (або у вас є спосіб конвертації seed).

**Повторне сканування гаманця та синхронізація**

* Після імпорту ключів Zallet ініціює повторне сканування ланцюга через Zebrad.
* Дайте Zallet певний час на відновлення вашого балансу та історії транзакцій.

**7. Перевірка балансів і синхронізації**

Після імпорту Zallet підключиться до вашого вузла Zebrad і повторно просканує блокчейн.
Коли синхронізацію буде завершено, ваші баланси та транзакції мають відображатися точно так само, як і раніше.

Ви можете перевірити статус синхронізації вашого вузла, виконавши:

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![image](https://hackmd.io/_uploads/SyIyVDY6xl.png)
</div>

Або перевірте логи.

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![image](https://hackmd.io/_uploads/r1HfVPF6gg.png)
</div>

**8. Усунення проблем**

<div className="overflow-x-auto my-8 rounded-2xl border border-slate-200 dark:border-slate-700">
  <table className="w-full min-w-full border-collapse text-sm">
    <thead className="bg-slate-100 dark:bg-slate-800">
      <tr>
        <th className="px-6 py-4 text-left font-semibold text-slate-900 dark:text-white">Проблема</th>
        <th className="px-6 py-4 text-left font-semibold text-slate-900 dark:text-white">Можлива причина</th>
        <th className="px-6 py-4 text-left font-semibold text-slate-900 dark:text-white">Рішення</th>
      </tr>
    </thead>
    <tbody>
      <tr className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-900/50">
        <td className="px-6 py-4">Zebrad не запускається</td>
        <td className="px-6 py-4">Порт зайнятий або неправильна конфігурація</td>
        <td className="px-6 py-4">Перевірте **zebrad.toml** і використайте вільний порт</td>
      </tr>
      <tr className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-900/50">
        <td className="px-6 py-4">Повільна синхронізація</td>
        <td className="px-6 py-4">Перевантаження мережі</td>
        <td className="px-6 py-4">Забезпечте стабільний інтернет, перезапустіть Zebrad</td>
      </tr>
      <tr className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-900/50">
        <td className="px-6 py-4">У гаманці відсутні транзакції</td>
        <td className="px-6 py-4">Частковий імпорт ключів</td>
        <td className="px-6 py-4">Повторно імпортуйте ключі або виконайте повторне сканування в Zallet</td>
      </tr>
      <tr className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-900/50">
        <td className="px-6 py-4">Zallet не може підключитися до вузла</td>
        <td className="px-6 py-4">Вузол не запущений або неправильна кінцева точка</td>
        <td className="px-6 py-4">Запустіть Zebrad і перевірте правильний RPC-порт</td>
      </tr>
      <tr className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-900/50">
        <td className="px-6 py-4">Zallet аварійно завершує роботу</td>
        <td className="px-6 py-4">Застаріла збірка</td>
        <td className="px-6 py-4">Оновіть до останнього релізу з GitHub</td>
      </tr>
    </tbody>
  </table>
</div>

**9. Висновок**

Міграція з zcashd на Zebrad і Zallet забезпечує вам швидший, безпечніший і сучасніший досвід використання Zcash.
Завдяки безпеці на основі Rust, модульному дизайну та кращому інструментарію ця конфігурація гарантує, що ваш вузол і гаманець будуть готові до майбутнього, поки екосистема Zcash продовжує розвиватися.

Порада: зберігайте ключі гаманця офлайн і регулярно створюйте резервні копії даних Zallet.
Відвідуйте [zebra.zfnd.org](https://zebra.zfnd.org) і [zallet.zfnd.org](https://zallet.zfnd.org) для оновлень і підтримки спільноти.
