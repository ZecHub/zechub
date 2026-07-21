# Посібник із мультипідпису в Zkool

Цей посібник надає покрокову інструкцію з виконання транзакцій із мультипідписом за допомогою Zkool. Він охоплює створення акаунтів, надсилання або отримання коштів, а також налаштування розподіленої генерації ключів (DKG) для мультипідпису. Для кожного основного кроку додано скриншоти.

## Навчальне відео

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/eagkCIv3BlQ"
    title="Zkool Demo | The Successor to Ywallet"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>


## 1. Створення акаунта


1. Відкрийте **додаток Zkool** і перейдіть до **New Account**.


![img1](https://github.com/user-attachments/assets/ee906e49-361a-49b6-9484-904897fe2e3f)

3. Введіть **назву акаунта** (наприклад, Anabelle).  
   

![img2](https://github.com/user-attachments/assets/e9c325d3-8507-433a-a0c6-6e8c1ea2a254)


4. За потреби ввімкніть **Use Internal Change** або **Restore Account**.


5. Після створення акаунт з’явиться у вашому **списку акаунтів**.  


![img3](https://github.com/user-attachments/assets/c446cbca-fb3e-49b9-b1d4-fd727cd1b0fb)


## 2. Отримання коштів

Кожен акаунт генерує кілька типів адрес:

**Unified Address**

**Адреса лише Orchard**

**Адреса Sapling**
  
**Прозора адреса**


Виберіть тип, який хочете використовувати, і поділіться ним, щоб отримати кошти.  


![img4](https://github.com/user-attachments/assets/c9de5dfe-e9d7-423d-8d90-35c1a08ffd5d)





## 3. Надсилання коштів

1. Перейдіть до розділу **Recipient**.  


![img5](https://github.com/user-attachments/assets/9f3a03b9-dd56-450c-a8dc-4370f9289138)


3. Введіть **адресу отримувача**.  

4. Вкажіть **суму** та, за бажанням, **memo**.  

5. Перевірте деталі транзакції та **підтвердьте**.  


Після завершення баланс оновиться у вашому списку акаунтів.  


![img6](https://github.com/user-attachments/assets/6e6da76b-cd18-4567-a5c0-74f07ddefc64)


## 4. Виконання транзакцій із мультипідписом: налаштування розподіленої генерації ключів (Multisig)

Мультипідпис у Zkool використовує **Distributed Key Generation (DKG)**, щоб гарантувати, що спільний акаунт контролюється кількома учасниками.



### Крок 1: Ініціюйте DKG
Виберіть **назву** для спільного гаманця (наприклад, Anabelle).

Встановіть **кількість учасників**.
  
Виберіть свій **ідентифікатор учасника**.
  
Визначте **кількість підписантів, необхідних для підтвердження (поріг)**.
    
Виберіть **акаунт фінансування**.
  

![img7](https://github.com/user-attachments/assets/8a90ca85-5439-4937-b16d-a570e69d55f0)



### Крок 2: Додайте адреси учасників
- Введіть **Unified Address** кожного учасника (рекомендовано).


**Примітка:** Якщо ви використовуєте адресу лише Orchard або лише Sapling, мультипідпис буде обмежений лише цим пулом (Orchard або Sapling).  
Це означає, що спільний гаманець не зможе отримувати кошти з інших пулів.  
Для максимальної сумісності та гнучкості завжди використовуйте **Unified Addresses**.  


### Крок 3: Виконайте раунди DKG
Зачекайте, поки всі учасники обміняються пакетами **round 1** і **round 2**.  


![img8](https://github.com/user-attachments/assets/cdaf6e00-3cb0-4774-8a96-5ded19bf31c4)



### Крок 4: Завершіть створення спільної адреси
Після завершення буде згенеровано **спільну адресу**.  


![img9](https://github.com/user-attachments/assets/741d1bc6-0102-4e67-bb83-9a1c184bd747)



## Висновок

Використовуючи Zkool, ви можете: створювати акаунти, надсилати й отримувати кошти, а також налаштовувати **гаманець із мультипідписом** за допомогою Distributed Key Generation. Це забезпечує **підвищену безпеку** та **спільне й приватне керування коштами**.
