<a href="https://github.com/Zechub/zechub/edit/main/site/ZFAV_Club/Guides_for_Creators/Serve_Github_Repo_with_IPFS.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Редагувати сторінку"/>
</a>

# Розміщення GitHub-репозиторію через IPFS

## Вступ

У цьому посібнику ми дізнаємося, як створити git-клоновану URL-адресу для вашого GitHub-репозиторію, що роздається за допомогою IPFS CID. 

Це корисно для забезпечення доступності контенту незалежно від географічного регіону, стійкості до цензури, а також як постійна резервна копія цінної інформації!

Примітка: Дані, завантажені в IPFS, доступні всім користувачам мережі. Можливо, ви захочете локально зашифрувати особисті/чутливі дані.

## Встановлення IPFS Kubo

Дотримуйтесь інструкцій зі встановлення, наведених [тут](https://docs.ipfs.tech/install/command-line/#install-official-binary-distributions)

У цьому прикладі ми використовуємо Linux, також доступні версії для інших ОС.

Перевірте, що встановлення пройшло успішно, за допомогою   ipfs –version

## Клонування репозиторію

Для початку виберіть Git-репозиторій, який хочете розмістити, і клонуте його:

Виконайте команду: “git clone https://github.com/zechub/zechub”

![https://i.ibb.co/HxFX37b/Screenshot-from-2023-05-20-14-14-46.png](https://i.ibb.co/HxFX37b/Screenshot-from-2023-05-20-14-14-46.png)

Тепер підготуємо його до клонування через IPFS.

cd zechub git update-server-info

Розпакуйте об’єкти Git:

![](https://i.ibb.co/25RwyWz/image-2024-04-20-175848513.png)

Це дозволить IPFS дедуплікувати об’єкти, якщо ви пізніше оновите Git-репозиторій.

## Додавання до IPFS

Щойно ви це зробили, репозиторій готовий до роздачі. Залишається лише додати його до IPFS:

$ pwd

/code/myrepo

$ ipfs add -r 

![https://i.ibb.co/LJgK1q3/Screenshot-from-2023-05-20-14-22-38.png](https://i.ibb.co/LJgK1q3/Screenshot-from-2023-05-20-14-22-38.png)

Отриманий CID: Qmbgqox5g3614gjTb43s5mdSmmk95aGWWA9EHksL2T91A2

![https://i.ibb.co/GvhCLwn/Screenshot-from-2023-05-20-14-26-34.png](https://i.ibb.co/GvhCLwn/Screenshot-from-2023-05-20-14-26-34.png)

Чудово! Тепер ваш репозиторій завантажено в мережу.

## Клонування за допомогою IPFS

Тепер ви маєте змогу отримати GitHub-репозиторій за допомогою:

git clone http://ipfs.io/ipfs/yourCID

Альтернативно ви можете шукати й отримувати його через свій локальний вузол IPFS.

Остання примітка: Папка репозиторію в IPFS не оновлюється разом із фактичним github-репозиторієм. Рекомендується повторно завантажувати папку через регулярні проміжки часу.
