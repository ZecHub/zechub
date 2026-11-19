<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Metamask_Snap.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Редактировать страницу"/>
</a>

# MetaMask Zcash Snap: руководство по интеграции

> Храните и отправляйте защищённые ZEC из расширения браузера MetaMask, используя Zcash Snap от ChainSafe и веб-кошелёк WebZjs.

## Кратко

* ChainSafe Zcash Snap добавляет поддержку защищённых ZEC в MetaMask на компьютере (Chrome, Edge, Firefox). Отдельное программное обеспечение Zcash не требуется.
* Ключи Zcash выводятся из вашей фразы восстановления MetaMask. Теперь эта фраза защищает и ваши ETH, и ZEC.
* Управляйте ZEC через кошелёк WebZjs на webzjs.chainsafe.dev, а не в собственном списке активов MetaMask.
* Для вашего аккаунта создаётся унифицированный адрес, поэтому отправители могут платить вам через наиболее приватный поддерживаемый ими пул.
* Пополните его обменом (например, ETH на ZEC) или выведите ZEC с биржи на свой защищённый адрес.
* Восстановление: переустановите MetaMask и Snap, затем импортируйте существующую фразу восстановления.

## Основное объяснение

MetaMask Snap — это небольшое изолированное дополнение, которое обучает MetaMask работе с новым блокчейном. Zcash Snap, созданный ChainSafe и проверенный Hacken, позволяет MetaMask выводить ключи Zcash из вашей существующей фразы восстановления и подписывать транзакции Zcash.

Сам по себе MetaMask не отображает баланс ZEC. Вместо этого веб-кошелёк WebZjs подключается к Snap, синхронизируется с сетью Zcash через сервер lightwalletd и показывает ваши адреса и баланс. Защищённые доказательства вычисляются в браузере с помощью WebAssembly, поэтому отправка средств может занять некоторое время.

Ниже описаны установка Snap, подключение WebZjs, пополнение кошелька, отправка и получение средств, а также проверка компонентов унифицированного адреса.

## Полное руководство

Полную пошаговую инструкцию с наглядным объяснением смотрите в этом [**YouTube руководстве**](https://www.youtube.com/watch?v=UJh9Ilkohdw): 

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/UJh9Ilkohdw"
    title="Как использовать ZEC в Metamask"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>
     

MetaMask теперь поддерживает **защищённые Zcash (ZEC)** через **разработанные ChainSafe Zcash Snap**, позволяя отправлять, получать и хранить приватные ZEC прямо в браузерном кошельке. Решение прошло аудит **Hacken** и включено в **официальный каталог Snaps MetaMask**. Отдельное программное обеспечение Zcash **не требуется** — нужны только MetaMask и Snap.

---

## **Предварительные требования**


> Расширение [**MetaMask**](https://snaps.metamask.io/snap/npm/zcashcommunitygrants/webzjs-zcash-snap/) (только для компьютеров) — Chrome, Edge или Firefox.
> Аккаунт MetaMask — сохраните фразу восстановления; Snap выводит из неё ключи Zcash.  
> Стабильное подключение к интернету — для синхронизации с сетью Zcash.  
> Средства — ETH для обмена на ZEC или ZEC с биржи.

> **Совет:** храните фразу восстановления MetaMask в безопасности — она управляет и ETH, и ZEC.

---

## **1. Установите Zcash Snap**

1. Перейдите в [**каталог Snaps MetaMask**](https://snaps.metamask.io/snap/npm/zcashcommunitygrants/webzjs-zcash-snap/).  
2. Найдите [**«Zcash WebZjs Wallet»**](https://snaps.metamask.io/snap/npm/zcashcommunitygrants/webzjs-zcash-snap/) или [**«WebZjs Zcash Snap»**](https://snaps.metamask.io/snap/npm/zcashcommunitygrants/webzjs-zcash-snap/).  
3. Нажмите **Install/Add to MetaMask**.
4. Разрешите запрашиваемые действия, например:
   ```
      Manage Zcash accounts 
      Store data on your device
   ```

![Zcash-snap-install](/content-images/Hy5MSG2Oex-42d0c5b346.webp)


---

## **2. (Необязательно) Добавьте сеть Zcash**

В MetaMask выберите **Add Network** и укажите:

Для **BNB SmartChain**:
```markdown
-  Name: BNB Smart Chain
-  RPC URL: https://bsc-dataseed.binance.org
-  Chain ID: 56
-  Symbol: BNB
-  Block Explorer URL: https://bscscan.com
```
Это позволит отображать сведения о сети и ссылки на обозреватель блоков.
![Add-a-custom-Net....](/content-images/S1hq7f2Oel-e1ca8b9044.webp)

Для **основной сети Zcash**:
```markdown
- Name: Zcash Mainnet  
- RPC URL: https://zjs.zec.rocks 
- Symbol: ZEC
```
`https://zjs.zec.rocks` — сервер lightwalletd, совместимый с WebZjs (gRPC-web), который поддерживает [zec.rocks](https://zec.rocks) (@emersonian). Для тестовой сети используйте `https://zjs.zec.rocks/testnet`. Если вы запускаете веб-кошелёк WebZjs самостоятельно, укажите это значение в параметре `LIGHTWALLETD_PROXY`.

---

## **3. Подключитесь к кошельку ChainSafe WebZjs**

1. Перейдите на [webzjs.chainsafe.dev](https://webzjs.chainsafe.dev).  
2. Нажмите **Connect MetaMask Snap**.  

![Zcash-web-wallet](/content-images/Sk8nSz3dgl-98ce36cc67.webp)

3. Подтвердите подключение.  
4. Просмотрите сводку аккаунта Zcash, в том числе:
   - Унифицированные адреса и прозрачный адрес

![Account-summary-unif....](/content-images/r17c_Mhdel-f4963826d5.webp)


5. Дождитесь завершения синхронизации.




---

## **4. Пополните кошелёк**

> **Обмен ETH -> ZEC** — воспользуйтесь такими сервисами, как **LeoDex**, и отправьте средства на защищённый адрес.  
> **Вывод с биржи** — выведите купленные ZEC на свой защищённый адрес WebZjs.  

![LeoDex-SWAP](/content-images/HyLQ0G2ugg-8d82ef24f6.webp)


> => Для **полной приватности** используйте защищённые адреса (z).

---

## **5. Отправка и получение ZEC**

1. В **WebZjs** откройте раздел **Transfer Balance**.  
2. Укажите:
```
   - Shielded recipient address  
   - Amount
```
   ![Transfer-Balance](/content-images/rkvcFfhdex-bd55d079eb.webp)

4. Подтвердите транзакцию в MetaMask (подпишите транзакцию).  
5. После подтверждения полученные средства появятся в WebZjs.

---

## **6. Проверка и устранение неполадок**

> Проверьте обновлённые балансы в **WebZjs** (**MetaMask не отображает ZEC напрямую**).  
> Если возникли проблемы:
  ```
  - Confirm you have the official ChainSafe Snap.  
  - Check correct network settings.  
  - Ensure correct address format.  
  - Reconnect via **Connect Snap** if needed.
  ``` 

> **Совет по безопасности:** устанавливайте только прошедший аудит **ChainSafe Snap**; перед подтверждением проверьте разрешения.

---

## **7. Проверьте компоненты адреса**

1. Откройте раздел **Receive** — по умолчанию там отображается ваш унифицированный адрес.  
2. Скопируйте унифицированный адрес и перейдите в [Zcash обозреватель блоков](https://mainnet.zcashexplorer.app/).  
3. Вставьте унифицированный адрес в строку поиска.  
4. Вы увидите все компоненты унифицированного адреса, в том числе:
``` 
   Orchard Address  
   Sapling Address  
   Transparent Address
``` 

![Address-components](/content-images/SyPR2f2_gg-3907c5bf58.webp)



---

## **Дополнительные примечания**

> Используйте [**последнюю версию MetaMask**](https://chromewebstore.google.com/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en) — публичный выпуск поддерживает Snaps.  
> На вычисление защищённых доказательств может потребоваться время: WebAssembly выполняет вычисления в браузере.  
> Восстановить доступ просто: установите MetaMask и Snap, затем импортируйте существующую фразу восстановления.  
> По умолчанию в Snap используются **защищённые ZEC**; прозрачные адреса **не являются основным вариантом**.  
> Для подтверждения транзакций используйте [mainnet.zcashexplorer.app](https://mainnet.zcashexplorer.app).
