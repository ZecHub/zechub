# Zcash Devtool とは

[Zcash-Devtool とは？](https://github.com/zcash/zcash-devtool?tab=readme-ov-file)

Zcash Devtool は、Zcash 上でのハッキングに使用されるプラットフォームです。開発者によって構築され、開発者向けに設計されており、新しい Zcash の機能のテストおよび開発のために使用されます。これは本番環境で使用する準備ができているものとは考えず、このツールが公開するコマンドライン API はいつでも変更される可能性があります。zcash-devtool 内蔵ウォレットの管理に重要な資金を投入しないでください。

### Zcash Devtool のビデオチュートリアル:
Kris Nuttycombe (@nuttycom) が ZconVI でこのツールを紹介しました。

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

これらのツールの使用方法についてステップバイステップガイドが必要な場合は、[このウォークスルー](https://github.com/zcash/zcash-devtool/blob/main/doc/walkthrough.md) を参照してください。これは、zcash devtool ツーリングをセットアップおよび使用するための完全なウォークスルーを記載しています。このガイドは、ツールに自分の機能を追加する方法についても説明します。

**セキュリティ警告:**
本番環境での使用は厳禁です!!!
このアプリケーションはセキュリティを考慮して設計されていませんが、暗号化されたマニーニックシードフレーズなどの機能により、ご自身のリスクを負って小規模な実験には適していると考えられます。

### 高度な (librustzcash チュートリアル)

[ここからビデオを視聴](https://free2z.cash/uploadz/public/ZcashTutorial/librustzcash-a-rust-crates.mp4)
