# Руководство по интеграции MetaMask Zcash Snap

Для полного пошагового руководства и визуального объяснения посмотрите это [**руководство на YouTube**](https://www.youtube.com/watch?v=UJh9Ilkohdw): 

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
     

MetaMask теперь поддерживает **экранированный Zcash (ZEC)** через **Zcash Snap, разработанный ChainSafe**, что позволяет отправлять, получать и управлять приватными ZEC напрямую в вашем браузерном кошельке. Решение прошло аудит **Hacken** и размещено в **официальном каталоге MetaMask Snaps**; для работы **не требуется отдельное ПО для Zcash** — только MetaMask и Snap.

---

## **Предварительные требования**


> [**Расширение MetaMask**](https://snaps.metamask.io/snap/npm/chainsafe/webzjs-zcash-snap/) (только для компьютера) - Chrome, Edge или Firefox.
> Аккаунт MetaMask - сид-фраза должна быть надёжно защищена; Snap получает из неё ключи Zcash.  
> Стабильное подключение к интернету - для синхронизации с сетью Zcash.  
> Средства - ETH для обмена на ZEC или ZEC с биржи.

> **Совет:** Защитите фразу восстановления MetaMask — она контролирует и ETH, и ZEC.

---

## **1. Установите Zcash Snap**

1. Перейдите в [**каталог MetaMask Snaps**](https://snaps.metamask.io/snap/npm/chainsafe/webzjs-zcash-snap/).  
2. Найдите [**"Zcash Shielded Wallet"**](https://snaps.metamask.io/snap/npm/chainsafe/webzjs-zcash-snap/) или [**"WebZjs Zcash Snap"**](https://snaps.metamask.io/snap/npm/chainsafe/webzjs-zcash-snap/).  
3. Нажмите **Install/Add to MetaMask**.
4. Подтвердите разрешения, такие как:
   ```
      Manage Zcash accounts 
      Store data on your device
   ```

![Zcash-snap-install](https://hackmd.io/_uploads/Hy5MSG2Oex.png)


---

## **2. (Необязательно) Добавьте сеть Zcash**

В MetaMask выберите **Add Network** и введите:

Для **BNB SmartChain**;
```markdown
-  Name: BNB Smart Chain
-  RPC URL: https://bsc-dataseed.binance.org
-  Chain ID: 56
-  Symbol: BNB
-  Block Explorer URL: https://bscscan.com
```
Это позволит отображать информацию о сети и ссылки на обозреватель.
![Add-a-custom-Net....](https://hackmd.io/_uploads/S1hq7f2Oel.png)

Для **Zcash Mainnet**;
```markdown
- Name: Zcash Mainnet  
- RPC URL: https://mainnet.lightwalletd.com:9067 
- Symbol: ZEC
```

---

## **3. Подключитесь к кошельку ChainSafe WebZjs**

1. Перейдите на [webzjs.chainsafe.dev](https://webzjs.chainsafe.dev).  
2. Нажмите **Connect MetaMask Snap**.  

![Zcash-web-wallet](https://hackmd.io/_uploads/Sk8nSz3dgl.png)

3. Подтвердите подключение.  
4. Просмотрите сводку по вашему аккаунту Zcash, включая:
   - Unified Address и Transparent address

![Account-summary-unif....](https://hackmd.io/_uploads/r17c_Mhdel.jpg)


5. Дождитесь завершения синхронизации.




---

## **4. Пополните кошелёк**

> **Обмен ETH -> ZEC** - Используйте сервисы, такие как **LeoDex**, и отправляйте средства на ваш экранированный адрес.  
> **Вывод с биржи** - Выведите купленные ZEC на ваш экранированный адрес WebZjs.  

![LEODEX-SWAP](https://hackmd.io/_uploads/HyLQ0G2ugg.png)


> => Используйте экранированные (z) адреса для **полной приватности**.

---

## **5. Отправка / получение ZEC**

1. В **WebZjs** перейдите в **Transfer Balance**.  
2. Введите:
```
   - Shielded recipient address  
   - Amount
```
   ![Transfer-Balance](https://hackmd.io/_uploads/rkvcFfhdex.png)

4. Подтвердите транзакцию в MetaMask (подпишите транзакцию).  
5. Полученные средства появятся в WebZjs после подтверждения.

---

## **6. Проверка / устранение неполадок**

> Проверяйте **WebZjs** на предмет обновлённых балансов **(MetaMask пока не отображает ZEC напрямую)** .  
> Если возникают проблемы:
  ```
  - Confirm you have the official ChainSafe Snap.  
  - Check correct network settings.  
  - Ensure correct address format.  
  - Reconnect via **Connect Snap** if needed.
  ``` 

> **Совет по безопасности:** Устанавливайте только **прошедший аудит Snap от ChainSafe**; перед подтверждением проверяйте запрашиваемые разрешения.

---

## **7. Проверьте компоненты адреса**

1. Перейдите в раздел **Receive** — по умолчанию будет отображаться ваш Unified Address.  
2. Скопируйте Unified Address и перейдите в [обозреватель блоков Zcash](https://mainnet.zcashexplorer.app/).  
3. Вставьте ваш Unified Address в строку поиска.  
4. Теперь вы увидите все компоненты Unified Address, которые включают:
``` 
   Orchard Address  
   Sapling Address  
   Transparent Address
``` 

![Address-components](https://hackmd.io/_uploads/SyPR2f2_gg.png)



---

## **Дополнительные примечания**

> Используйте [**последнюю версию MetaMask**](https://chromewebstore.google.com/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en) - публичный релиз поддерживает Snaps.  
> Создание shielded-доказательств может занимать время; вычисления в браузере обрабатываются через WebAssembly.  
> Восстановление простое: установите MetaMask и Snap, затем импортируйте существующую сид-фразу.  
> Snap по умолчанию использует **shielded ZEC**, transparent addresses **не являются основным фокусом**.  
> Используйте [zcashblockexplorer.com](https://zcashblockexplorer.com) для подтверждения транзакций.
