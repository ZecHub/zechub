# Посібник з інтеграції MetaMask Zcash Snap

Щоб переглянути повний покроковий огляд і візуальне пояснення, подивіться цей [**посібник на YouTube**](https://www.youtube.com/watch?v=UJh9Ilkohdw): 

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/UJh9Ilkohdw"
    title="How to use ZEC on Metamask"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>
     

MetaMask тепер підтримує **захищений Zcash (ZEC)** через **Zcash Snap, розроблений ChainSafe**, що дає змогу надсилати, отримувати та керувати приватними ZEC безпосередньо у вашому браузерному гаманці. Аудит виконала **Hacken**, а сам продукт розміщений в **офіційному каталозі MetaMask Snaps Directory**. Для роботи **не потрібне окреме програмне забезпечення Zcash** — лише MetaMask і Snap.

---

## **Передумови**


> [**Розширення MetaMask**](https://snaps.metamask.io/snap/npm/chainsafe/webzjs-zcash-snap/) (лише для настільних пристроїв) - Chrome, Edge або Firefox.
> Обліковий запис MetaMask - seed-фраза має бути захищена; Snap виводить із неї ключі Zcash.  
> Стабільне підключення до Інтернету - для синхронізації з мережею Zcash.  
> Кошти - ETH для обміну на ZEC або ZEC з біржі.

> **Порада:** Захистіть фразу відновлення MetaMask — вона контролює як ETH, так і ZEC.

---

## **1. Встановіть Zcash Snap**

1. Перейдіть до [**MetaMask Snaps Directory**](https://snaps.metamask.io/snap/npm/chainsafe/webzjs-zcash-snap/).  
2. Знайдіть [**"Zcash Shielded Wallet"**](https://snaps.metamask.io/snap/npm/chainsafe/webzjs-zcash-snap/) або [**"WebZjs Zcash Snap"**](https://snaps.metamask.io/snap/npm/chainsafe/webzjs-zcash-snap/).  
3. Натисніть **Install/Add to MetaMask**.
4. Підтвердьте дозволи, такі як:
   ```
      Керування обліковими записами Zcash 
      Зберігання даних на вашому пристрої
   ```

![Zcash-snap-install](https://hackmd.io/_uploads/Hy5MSG2Oex.png)


---

## **2. (Необов’язково) Додайте мережу Zcash**

У MetaMask виберіть **Add Network** і введіть:

Для **BNB SmartChain**;
```markdown
-  Name: BNB Smart Chain
-  RPC URL: https://bsc-dataseed.binance.org
-  Chain ID: 56
-  Symbol: BNB
-  Block Explorer URL: https://bscscan.com
```
Це ввімкне інформацію про мережу та посилання на оглядач.
![Add-a-custom-Net....](https://hackmd.io/_uploads/S1hq7f2Oel.png)

Для **Zcash Mainnet**;
```markdown
- Name: Zcash Mainnet  
- RPC URL: https://mainnet.lightwalletd.com:9067 
- Symbol: ZEC
```

---

## **3. Підключіться до гаманця ChainSafe WebZjs**

1. Відвідайте [webzjs.chainsafe.dev](https://webzjs.chainsafe.dev).  
2. Натисніть **Connect MetaMask Snap**.  

![Zcash-web-wallet](https://hackmd.io/_uploads/Sk8nSz3dgl.png)

3. Підтвердьте підключення.  
4. Перегляньте зведення вашого облікового запису Zcash, зокрема:
   - Unified Address і Transparent address

![Account-summary-unif....](https://hackmd.io/_uploads/r17c_Mhdel.jpg)


5. Дочекайтеся завершення синхронізації.




---

## **4. Поповніть свій гаманець**

> **Обмін ETH -> ZEC** - скористайтеся сервісами на кшталт **LeoDex** і надішліть кошти на свою захищену адресу.  
> **Виведення з біржі** - виведіть придбані ZEC на свою захищену адресу WebZjs.  

![LEODEX-SWAP](https://hackmd.io/_uploads/HyLQ0G2ugg.png)


> => Використовуйте захищені (z) адреси для **повної приватності**.

---

## **5. Надсилання / отримання ZEC**

1. У **WebZjs** перейдіть до **Transfer Balance**.  
2. Введіть:
```
   - Захищену адресу одержувача  
   - Суму
```
   ![Transfer-Balance](https://hackmd.io/_uploads/rkvcFfhdex.png)

4. Підтвердьте транзакцію в MetaMask (підпишіть транзакцію).  
5. Отримані кошти з’являться у WebZjs після підтвердження.

---

## **6. Перевірка / усунення проблем**

> Перевіряйте **WebZjs** для оновлених балансів **(MetaMask ще не відображає ZEC напряму)** .  
> Якщо виникають проблеми:
  ```
  - Підтвердьте, що у вас офіційний Snap від ChainSafe.  
  - Перевірте правильність налаштувань мережі.  
  - Переконайтеся, що формат адреси правильний.  
  - За потреби перепідключіться через **Connect Snap**.
  ``` 

> **Порада з безпеки:** Встановлюйте лише **аудитований Snap від ChainSafe**; перед підтвердженням переглядайте дозволи.

---

## **7. Перевірте компоненти адреси**

1. Перейдіть до розділу **Receive** — за замовчуванням буде показано ваш Unified Address.  
2. Скопіюйте Unified Address і відкрийте [Zcash Block Explorer](https://mainnet.zcashexplorer.app/).  
3. Вставте свій Unified Address у рядок пошуку.  
4. Тепер ви побачите всі компоненти Unified Address, які включають:
``` 
   Orchard Address  
   Sapling Address  
   Transparent Address
``` 

![Address-components](https://hackmd.io/_uploads/SyPR2f2_gg.png)



---

## **Додаткові примітки**

> Використовуйте [**останнію версію MetaMask**](https://chromewebstore.google.com/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en) - публічний реліз підтримує Snaps.  
> Створення shielded proofs може зайняти час, WebAssembly виконує обчислення в браузері.  
> Відновлення просте: встановіть MetaMask і Snap, а потім імпортуйте наявну seed-фразу.  
> Snap за замовчуванням використовує **shielded ZEC**, transparent addresses **не є основним фокусом**.  
> Використовуйте [zcashblockexplorer.com](https://zcashblockexplorer.com) для підтвердження транзакцій.
