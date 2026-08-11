---
<a href="https://github.com/Zechub/zechub/edit/main/site/ZFAV_Club/Guides_for_Creators/Community_Broadcasting.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="ページを編集"/>
</a>

# VDO.Ninja と OBS Studio を使ったコミュニティ配信

この短いチュートリアルは、[DWeb Camp 2023](https://dwebcamp.org/) の期間中に、フェローとボランティアのグループによって作成されました。この演習の目的は、オフラインの MESH ネットワークに接続されたスマートフォン端末を活用し、共同での動画収録と配信を行うことです。

ここでは、2つのオープンソースソフトウェアである [OBS Studio (Open Broadcaster software)](https://obsproject.com/) と [VDO.Ninja](https://vdo.ninja/) を使用します。これらのソフトウェアはダウンロードして、あなたのコンピューター上でローカルに実行できます。

## OBS Studio (Open Boardcaster software)

OBS Studio は、複数のオペレーティングシステムで利用可能な、録画およびライブ配信用の無料オープンソースソフトウェアです。このソフトウェアは 2012 年に初めて公開され、ゲーム配信コミュニティや独立系動画コンテンツ制作者の間で非常に大きな支持を得ています。

OBS Studio のユーザーインターフェースは、初めて使うユーザーにはかなり圧倒的に見えるかもしれません。OBS Studio は「Preview」と「Broadcast」という2つのウィンドウに分かれています。Preview ウィンドウには利用可能な映像（ウェブカメラ、Iriun Webcam、OBS Virtual Camera、Video、Browser source などのさまざまなカメラ）が「Scenes」として表示され、「Broadcast」にはライブ配信が表示されます。

VDO.ninja からのリモートカメラ配信を OBS Studio に取り込んで配信するには、まず「Sources > Add > Browser」から新しい「Browser Source」を追加します。新しいウィンドウで、VDO.Ninja から取得したソース URL を入力し、「Make source visible」を選択します。

これで、リモート配信の配信を開始できます。

## VDO.Ninja

[VDO.Ninja](https://vdo.ninja/) は、あなたのモバイル端末をライブ配信用カメラに変えることができる、無料のオープンソース Web アプリケーションです。このソフトウェアはダウンロードしてローカルコンピューター上にデプロイすることもできますし、直接 [オンライン版 https://vdo.ninja](https://vdo.ninja/) を利用することもできます。

VOD.Ninja のインターフェースはシンプルで、モバイル端末の Web ブラウザーで VDO.Ninja を開き、「Add your camera to OBS」を選択するだけです。続いて、デバイス一覧からカメラと音声デバイスを選び、「Start」をクリックします。すると、OBS Studio に追加できる「view」リンクが取得できます。

## VDO.Ninja でコミュニティ通話をディレクションする

まず、デスクトップまたはノートパソコンの Web ブラウザーで [VDO.ninja](http://VDO.ninja) にアクセスします。

<a href="">
    <img src="/content-images/_unavailable.svg" alt="" width="300" height="400"/>
</a>


新しいルームを作成し、自分のコミュニティ通話のライブ配信をディレクションするには、Create a Room をクリックします。

次の画面では、ルームの設定に必要な基本情報の入力が求められます。

<a href="">
    <img src="/content-images/_unavailable.svg" alt="" width="400" height="400"/>
</a>

ルームが作成されると、ディレクターは次の画面で多くの制御オプションを利用できます。

<a href="">
    <img src="/content-images/_unavailable.svg" alt="" width="400" height="400"/>
</a>


人々があなたのルームに参加すると、ディレクターであるあなたには、各参加者の映像と音声とともに、すべてのソースオプションとコントロールが表示されます。

<a href="">
    <img src="/content-images/_unavailable.svg" alt="" width="400" height="300"/>
</a>


## よくある質問

- OBS Studio にはどのような種類のビデオ用グラフィックカードが必要ですか？

高性能なグラフィックカードと大容量メモリを備えたパーソナルコンピューターを使用できます。あるいは、ハードウェアエンコーダー [Teradek VidiU](https://www.bhphotovideo.com/c/product/1609186-REG/teradek_10_0235_vidiu_x_modem.html?gclid=EAIaIQobChMIl4aIo7zX_wIVDhqtBh0PgwhxEAAYAiAAEgInufD_BwE) を使用することもできます。
- OBS ではライブ翻訳や字幕表示を行えますか？

そのような機能を提供していると思われる、コミュニティ提供のプラグインがいくつかあります。[https://github.com/eddieoz/OBS-live-translation](https://github.com/eddieoz/OBS-live-translation)

- OBS Studio 用の独自プラグインを開発できますか？

はい。OBS は lua、python スクリプトをサポートしています。また、オーバーレイや Web ビュー向けに JavaScript も利用できます。

- ライブ中にフェード・トゥ・ブラックやトランジションを使いますか？

それはプロデューサーであるあなた次第です！

- 配信中に遅延はありますか？

これは主に、どこへ配信しているかという配信先に依存します。たとえば YouTube では、配信前にサーバー上で行われる動画処理のため、1分以上の遅延が発生することがあります。

- 低速なマシンで OBS を使い、さらにグリーンスクリーン処理をしていると音声が途切れます

ハードウェアエンコーダーを使うか、stream yard を使用してください。
[https://support.streamyard.com/hc/en-us/articles/360056350852-How-to-Use-OBS-Virtual-Camera-with-StreamYard](https://support.streamyard.com/hc/en-us/articles/360056350852-How-to-Use-OBS-Virtual-Camera-with-StreamYard) または [RiverSide.FM](http://riverside.fm/)

## クレジット

- Ryan
- Ajay
- Arky

## リソース

[https://obsproject.com/help](https://obsproject.com/help)

[https://docs.vdo.ninja/](https://docs.vdo.ninja/)

Office Hours: メディアおよびデジタルイベントのコミュニティ
[https://alex4d.com/notes/item/media-and-digital-event-community](https://alex4d.com/notes/item/media-and-digital-event-community)
