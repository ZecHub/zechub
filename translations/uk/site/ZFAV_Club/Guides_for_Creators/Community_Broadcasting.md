<a href="https://github.com/Zechub/zechub/edit/main/site/ZFAV_Club/Guides_for_Creators/Community_Broadcasting.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Трансляція для спільноти за допомогою VDO.Ninja та OBS Studio

Цей короткий посібник було створено під час [DWeb Camp 2023](https://dwebcamp.org/) групою стипендіатів і волонтерів. Мета цієї вправи — використати смартфони, підключені до офлайн-мережі MESH, для спільного запису та трансляції відео.

Ми використовуємо два програмні продукти з відкритим кодом: [OBS Studio (Open Broadcaster software)](https://obsproject.com/) та [VDO.Ninja](https://vdo.ninja/). Ці програми можна завантажити та запускати локально на вашому комп’ютері.

## OBS Studio (Open Boardcaster software)

OBS Studio — це безкоштовне програмне забезпечення з відкритим кодом для запису та прямих трансляцій, доступне для багатьох операційних систем. Програму вперше випустили у 2012 році, і вона має досить велику популярність серед спільноти стримерів відеоігор та незалежних творців відеоконтенту.

Інтерфейс OBS Studio може здатися досить складним для користувачів, які бачать його вперше. OBS Studio поділено на два вікна: "Preview" і "Broadcast". У вікні preview показуються доступні відео (різні камери, такі як вебкамера, Iriun Webcam, OBS Virtual Camera, Video та Browser source), які називаються "Scenes", а "Broadcast" показує пряму трансляцію.

Щоб транслювати віддалений відеопотік з VDO.ninja в OBS Studio, спочатку додайте новий "Browser Source" через "Sources > Add > Browser". У новому вікні ви можете вказати URL-адресу джерела з VDO.Ninja і вибрати "Make source visible".

Тепер ви можете розпочати трансляцію віддалених потоків.

## VDO.Ninja

[VDO.Ninja](https://vdo.ninja/) — це безкоштовний вебзастосунок з відкритим кодом, який дає змогу перетворити ваші мобільні пристрої на камеру для прямої трансляції. Програму можна завантажити й розгорнути на вашому локальному комп’ютері, або ж ви можете безпосередньо скористатися [онлайн-версією за адресою https://vdo.ninja](https://vdo.ninja/).

Інтерфейс VOD.Ninja простий: просто відкрийте VDO.Ninja у веббраузері вашого мобільного пристрою та виберіть "Add your camera to OBS". Потім виберіть камеру й аудіопристрій зі списку пристроїв і натисніть "Start". Після цього ви отримаєте посилання "view", яке можна додати до OBS Studio.

## Режисура спільнотного дзвінка за допомогою VDO.Ninja

Почніть із переходу на [VDO.ninja](http://VDO.ninja) у веббраузері на настільному комп’ютері чи ноутбуці.

<a href="">
    <img src="https://images.spr.so/cdn-cgi/imagedelivery/j42No7y-dcokJuNgXeA0ig/8ded1b54-602b-4e66-af92-127990eff723/Screenshot_2023-08-23_162222/w=3840,quality=80" alt="" width="300" height="400"/>
</a>


Щоб створити нову кімнату та режисувати власну пряму трансляцію для спільноти, натисніть Create a Room.

На наступному екрані вас попросять вказати базову інформацію для налаштування вашої кімнати.

<a href="">
    <img src="https://images.spr.so/cdn-cgi/imagedelivery/j42No7y-dcokJuNgXeA0ig/ae698696-7b4d-458e-8de0-58a198c36e73/Screenshot_2023-08-23_183900/w=3840,quality=80" alt="" width="400" height="400"/>
</a>

Щойно кімнату створено, режисер отримує багато параметрів керування, доступних на наступному екрані.

<a href="">
    <img src="https://images.spr.so/cdn-cgi/imagedelivery/j42No7y-dcokJuNgXeA0ig/35b43544-5114-4e74-ac41-9e8993fe62ea/Screenshot_2023-08-23_184015/w=3840,quality=80" alt="" width="400" height="400"/>
</a>


Коли люди приєднуються до вашої кімнати, ви як режисер бачитимете всі варіанти джерел і елементи керування разом із їхнім відео та аудіо.

<a href="">
    <img src="https://images.spr.so/cdn-cgi/imagedelivery/j42No7y-dcokJuNgXeA0ig/2247f187-b005-478e-9e5e-471cb8f070d3/Screenshot_2023-08-23_194136/w=3840,quality=80" alt="" width="400" height="300"/>
</a>


## FAQ

- Які типи відеографічних карт потрібні для OBS Studio?

Ви можете використовувати персональний комп’ютер із хорошою графічною картою та великим обсягом пам’яті або, як альтернативу, апаратні енкодери [Teradek VidiU](https://www.bhphotovideo.com/c/product/1609186-REG/teradek_10_0235_vidiu_x_modem.html?gclid=EAIaIQobChMIl4aIo7zX_wIVDhqtBh0PgwhxEAAYAiAAEgInufD_BwE)
- Чи дає OBS змогу робити живий переклад і субтитрування?

Існують деякі плагіни, створені спільнотою, які, здається, надають таку функцію. [https://github.com/eddieoz/OBS-live-translation](https://github.com/eddieoz/OBS-live-translation)

- Чи можете ви розробляти власні плагіни для OBS Studio?

Так, OBS підтримує сценарії lua і python. Також JavaScript для Overlays і webviews.

- Чи використовуємо ми плавний перехід у чорний або інші переходи наживо?

Це залежить від вас, продюсера!

- Чи є затримка під час трансляції?

Це переважно залежить від платформи призначення, куди ви транслюєте. Наприклад, YouTube може мати затримку в одну хвилину або більше через обробку відео, яка виконується на їхніх серверах перед трансляцією.

- Аудіо зникає при використанні OBS на повільній машині та під час роботи із зеленим фоном

Використовуйте апаратний енкодер або stream yard
[https://support.streamyard.com/hc/en-us/articles/360056350852-How-to-Use-OBS-Virtual-Camera-with-StreamYard](https://support.streamyard.com/hc/en-us/articles/360056350852-How-to-Use-OBS-Virtual-Camera-with-StreamYard) або [RiverSide.FM](http://riverside.fm/)

## Подяки

- Ryan
- Ajay
- Arky

## Ресурси

[https://obsproject.com/help](https://obsproject.com/help)

[https://docs.vdo.ninja/](https://docs.vdo.ninja/)

Office Hours: спільнота медіа та цифрових подій
[https://alex4d.com/notes/item/media-and-digital-event-community](https://alex4d.com/notes/item/media-and-digital-event-community)
