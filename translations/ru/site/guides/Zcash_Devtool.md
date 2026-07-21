# Инструмент разработчика Zcash

[Что такое Zcash-Devtool?](https://github.com/zcash/zcash-devtool?tab=readme-ov-file) 

Zcash Devtool — это платформа для разработки и экспериментов с Zcash. Он создан разработчиками для разработчиков, для тестирования и разработки новой функциональности Zcash; и его не следует считать готовым к использованию в production. API командной строки, которое предоставляет этот инструмент, может измениться в любой момент и без предупреждения. НЕ доверяйте управление значительными средствами встроенному кошельку zcash-devtool.

### Видеоруководство по Zcash Devtool:
Kris Nuttycombe (@nuttycom) представил этот инструмент во время ZconVI.

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/5gvQF5oFT8E"
    title="zcash-devtool: the Zcash development multitool with Kris Nuttycombe - ZconVI"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>


---

Пошаговое руководство по началу работы с этими инструментами см. в [этом руководстве](https://github.com/zcash/zcash-devtool/blob/main/doc/walkthrough.md). В нём подробно описан полный процесс настройки и использования инструментов zcash devtool. Оно предназначено служить руководством по настройке, а также по добавлению собственной функциональности в инструмент.


**Предупреждения о безопасности:**
НЕ ИСПОЛЬЗУЙТЕ ЭТО В PRODUCTION!!!
Приложение не разрабатывалось с упором на безопасность. Однако в нём есть такие возможности, как шифрование мнемонических seed-фраз, что делает его пригодным для небольших экспериментов — на ваш страх и риск.

### Продвинутый уровень (учебное руководство по librustzcash )


[смотреть видео здесь](https://free2z.cash/uploadz/public/ZcashTutorial/librustzcash-a-rust-crates.mp4)
