<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Metamask_Snap.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Редагувати сторінку"/>
</a>

# MetaMask Zcash Snap: посібник з інтеграції

> Зберігайте та надсилайте захищені ZEC із розширення браузера MetaMask, використовуючи ChainSafe Zcash Snap і вебгаманець WebZjs.

## Коротко

* ChainSafe Zcash Snap додає захищені ZEC до MetaMask на комп’ютері (Chrome, Edge, Firefox). Окреме програмне забезпечення Zcash не потрібне.
* Ваші ключі Zcash виводяться з вашої фрази відновлення MetaMask. Тепер ця фраза захищає і ваш ETH, і ваші ZEC.
* Ви керуєте ZEC через гаманець WebZjs за адресою webzjs.chainsafe.dev, а не у власному списку активів MetaMask.
* Ваш обліковий запис отримує уніфіковану адресу, тож відправники надсилають вам кошти через найприватніший пул із тих, які вони підтримують.
* Поповніть гаманець обміном (наприклад, ETH на ZEC) або виведіть ZEC з біржі на свою захищену адресу.
* Відновлення: перевстановіть MetaMask і Snap, а потім імпортуйте наявну фразу відновлення.

## Основне пояснення

MetaMask Snap — це невелике ізольоване доповнення, яке додає MetaMask підтримку нового блокчейну. Zcash Snap, створений ChainSafe і перевірений Hacken, дає змогу MetaMask виводити ключі Zcash з вашої наявної фрази відновлення та підписувати транзакції Zcash.

Сам MetaMask не показує баланс ZEC. Натомість вебгаманець WebZjs підключається до Snap, синхронізується з мережею Zcash через сервер lightwalletd і показує ваші адреси та баланс. Докази з нульовим розголошенням обчислюються у вашому браузері за допомогою WebAssembly, тому надсилання коштів може тривати певний час.

Наведені нижче кроки охоплюють встановлення Snap, підключення WebZjs, поповнення гаманця, надсилання й отримання коштів, а також перевірку складників вашої уніфікованої адреси.

## Повний посібник

Щоб переглянути повну покрокову інструкцію з візуальним поясненням, подивіться цей [**посібник YouTube**](https://www.youtube.com/watch?v=UJh9Ilkohdw):

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/UJh9Ilkohdw"
    title="Як користуватися ZEC у Metamask"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>
     

MetaMask тепер підтримує **захищені Zcash (ZEC)** через **ChainSafe-розроблений Zcash Snap**, даючи змогу надсилати, отримувати й керувати приватними ZEC безпосередньо у браузерному гаманці. Рішення перевірене **Hacken** і розміщене в **офіційному каталозі MetaMask Snaps**; для нього **не потрібне окреме програмне забезпечення Zcash** — лише MetaMask і Snap.

---

## **Передумови**


> [**Розширення MetaMask**](https://snaps.metamask.io/snap/npm/zcashcommunitygrants/webzjs-zcash-snap/) (лише для комп’ютерів) — Chrome, Edge або Firefox.
> Обліковий запис MetaMask — фраза відновлення має бути захищена; Snap виводить із неї ключі Zcash.  
> Стабільне підключення до інтернету — для синхронізації з мережею Zcash.  
> Кошти — ETH для обміну на ZEC або ZEC з біржі.

> **Порада:** Захистіть фразу відновлення MetaMask — вона контролює і ETH, і ZEC.

---

## **1. Встановіть Zcash Snap**

1. Перейдіть до [**каталогу MetaMask Snaps**](https://snaps.metamask.io/snap/npm/zcashcommunitygrants/webzjs-zcash-snap/).  
2. Знайдіть [**«Zcash WebZjs Wallet»**](https://snaps.metamask.io/snap/npm/zcashcommunitygrants/webzjs-zcash-snap/) або [**«WebZjs Zcash Snap»**](https://snaps.metamask.io/snap/npm/zcashcommunitygrants/webzjs-zcash-snap/).  
3. Натисніть **«Установити/Додати до MetaMask»**.
4. Підтвердьте дозволи, наприклад:
   ```
      Manage Zcash accounts 
      Store data on your device
   ```

![Zcash-snap-install](/content-images/Hy5MSG2Oex-42d0c5b346.webp)


---

## **2. (Необов’язково) Додайте мережу Zcash**

У MetaMask виберіть **«Додати мережу»** та введіть:

Для **BNB SmartChain**;
```markdown
-  Name: BNB Smart Chain
-  RPC URL: https://bsc-dataseed.binance.org
-  Chain ID: 56
-  Symbol: BNB
-  Block Explorer URL: https://bscscan.com
```
Це дасть змогу переглядати інформацію про мережу та посилання на оглядач блоків.
![Add-a-custom-Net....](/content-images/S1hq7f2Oel-e1ca8b9044.webp)

Для **Zcash Mainnet**;
```markdown
- Name: Zcash Mainnet  
- RPC URL: https://zjs.zec.rocks 
- Symbol: ZEC
```
`https://zjs.zec.rocks` — це сумісний із WebZjs сервер lightwalletd (gRPC-web), яким керує [zec.rocks](https://zec.rocks) (@emersonian). Для тестової мережі використовуйте `https://zjs.zec.rocks/testnet`. Якщо ви самостійно запускаєте вебгаманець WebZjs, це значення потрібно вказати для `LIGHTWALLETD_PROXY`.

---

## **3. Підключіться до гаманця ChainSafe WebZjs**

1. Відвідайте [webzjs.chainsafe.dev](https://webzjs.chainsafe.dev).  
2. Натисніть **«Підключити MetaMask Snap»**.  

![Zcash-web-wallet](/content-images/Sk8nSz3dgl-98ce36cc67.webp)

3. Підтвердьте підключення.  
4. Перегляньте зведення облікового запису Zcash, зокрема:
   - Уніфіковані адреси та прозору адресу

![Account-summary-unif....](/content-images/r17c_Mhdel-f4963826d5.webp)


5. Дочекайтеся завершення синхронізації.




---

## **4. Поповніть гаманець**

> **Обмін ETH -> ZEC** — скористайтеся сервісами на кшталт **LeoDex** і надішліть кошти на свою захищену адресу.  
> **Виведення з біржі** — виведіть придбані ZEC на свою захищену адресу WebZjs.  

![LeoDex-SWAP](/content-images/HyLQ0G2ugg-8d82ef24f6.webp)


> => Для **повної приватності** використовуйте захищені адреси (z).

---

## **5. Надсилання / отримання ZEC**

1. У **WebZjs** перейдіть до розділу **Transfer Balance**.  
2. Введіть:
```
   - Shielded recipient address  
   - Amount
```
   ![Transfer-Balance](/content-images/rkvcFfhdex-bd55d079eb.webp)

4. Підтвердьте транзакцію в MetaMask (підпишіть транзакцію).  
5. Отримані кошти з’являться в WebZjs після підтвердження.

---

## **6. Перевірка / усунення несправностей**

> Перевірте **WebZjs**, щоб побачити оновлені баланси **(MetaMask не відображає ZEC безпосередньо)** .  
> Якщо виникають проблеми:
  ```
  - Confirm you have the official ChainSafe Snap.  
  - Check correct network settings.  
  - Ensure correct address format.  
  - Reconnect via **Connect Snap** if needed.
  ``` 

> **Порада з безпеки:** Установлюйте лише **перевірений ChainSafe Snap**; перед підтвердженням перегляньте дозволи.

---

## **7. Перевірте складники адреси**

1. Перейдіть до розділу **«Отримати»** — за замовчуванням буде показано вашу уніфіковану адресу.  
2. Скопіюйте уніфіковану адресу та перейдіть до [Zcash оглядача блоків](https://mainnet.zcashexplorer.app/).  
3. Вставте уніфіковану адресу в рядок пошуку.  
4. Ви побачите всі складники уніфікованої адреси, зокрема:
``` 
   Orchard Address  
   Sapling Address  
   Transparent Address
``` 

![Address-components](/content-images/SyPR2f2_gg-3907c5bf58.webp)



---

## **Додаткові примітки**

> Використовуйте [**найновішу версію MetaMask**](https://chromewebstore.google.com/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en) — публічний випуск підтримує Snaps.  
> Обчислення доказів із нульовим розголошенням може тривати певний час; WebAssembly виконує обчислення у браузері.  
> Відновлення просте: установіть MetaMask і Snap, а потім імпортуйте наявну фразу відновлення.  
> За замовчуванням у Snap використовуються **захищені ZEC**; прозорі адреси **не є основним призначенням**.  
> Використовуйте [mainnet.zcashexplorer.app](https://mainnet.zcashexplorer.app), щоб підтверджувати транзакції.
