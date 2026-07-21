# Zcash 开发工具

[什么是 Zcash-Devtool？](https://github.com/zcash/zcash-devtool?tab=readme-ov-file) 

Zcash Devtool 是一个用于在 Zcash 上进行开发的平台。它由开发者构建，并面向开发者，用于测试和开发新的 Zcash 功能；不应被视为可用于生产环境。该工具暴露的命令行 API 可能会在任何时候发生变化，且不会提前通知。请勿将大量资金交由 zcash-devtool 内嵌钱包管理。

### Zcash Devtool 视频教程：
Kris Nuttycombe (@nuttycom) 在 ZconVI 期间演示了这个工具。

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/5gvQF5oFT8E"
    title="zcash-devtool：Kris Nuttycombe 介绍的 Zcash 开发多功能工具 - ZconVI"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>


---

如需了解如何开始使用这些工具的分步指南，请参阅[这份演练](https://github.com/zcash/zcash-devtool/blob/main/doc/walkthrough.md)。其中完整记录了如何设置并使用 zcash devtool 工具链。它旨在作为一份指南，帮助你完成设置，并向该工具中添加你自己的功能。


**安全警告：**
请勿在生产环境中使用！！！
该应用在编写时并未将安全性作为重点。不过，它确实提供了一些功能，例如对助记词种子短语进行加密，因此可在你自行承担风险的前提下用于小规模实验。

### 高级内容（librustzcash 教程）


[在此查看视频](https://free2z.cash/uploadz/public/ZcashTutorial/librustzcash-a-rust-crates.mp4)
