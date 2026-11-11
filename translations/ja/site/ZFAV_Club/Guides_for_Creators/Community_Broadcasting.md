<a href="https://github.com/Zechub/zechub/edit/main/site/ZFAV_Club/Guides_for_Creators/Community_Broadcasting.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# VDO.NinjaとOBS Studioを使用したコミュニティ配信

この短いチュートリアルは、仲間とボランティアのグループによって[DWeb Camp 2023](https://dwebcamp.org/)で作成されました。この演習の目的は、オフラインMESHネットワークに接続されたスマートフォン端末を活用し、共同での動画録画とストリーミングを行うことです。

2つのオープンソースソフトウェア、[OBS Studio（Open Broadcaster software）](https://obsproject.com/)と[VDO.Ninja](https://vdo.ninja/)を使用します。これらのソフトウェアはダウンロードして、お使いのコンピューター上でローカルに実行できます。

## OBS Studio（Open Boardcaster software）

OBS Studioは、複数のオペレーティングシステムで利用できる、録画およびライブストリーミング向けの無料オープンソースソフトウェアです。このソフトウェアは2012年に初めてリリースされ、ゲームストリーミングコミュニティや独立系動画コンテンツ制作者の間で非常に多くの支持を得ています。

OBS Studioのユーザーインターフェースは、初めて使うユーザーにはかなり複雑に見えるかもしれません。OBS Studioは「プレビュー」と「配信」という2つのウィンドウに分かれています。プレビューウィンドウには、「シーン」と呼ばれる利用可能な動画（ウェブカメラ、Iriun Webcam、OBS Virtual Camera、動画、ブラウザーソースなどの各種カメラ）が表示され、「配信」にはライブストリームが表示されます。

VDO.ninjaからのリモートカメラストリームをOBS Studioに取り込むには、まず「ソース > 追加 > ブラウザー」から新しい「ブラウザーソース」を追加します。新しいウィンドウでVDO.NinjaのソースURLを指定し、「ソースを表示する」を選択できます。

これでリモートストリームの配信を開始できます。

## VDO.Ninja

[VDO.Ninja](https://vdo.ninja/)は、モバイル端末をライブストリーミングカメラに変えることができる、無料のオープンソースウェブアプリケーションです。このソフトウェアはダウンロードしてお使いのローカルコンピューターにデプロイすることも、[オンライン版（online version）をhttps://vdo.ninja](https://vdo.ninja/).で直接使用することもできます。

VOD.Ninjaのインターフェースはシンプルです。モバイル端末のウェブブラウザーでVDO.Ninjaを開き、「カメラをOBSに追加」を選択するだけです。次に、デバイスの一覧からカメラとオーディオデバイスを選択し、「開始」をクリックします。その後、OBS Studioに追加できる「view」リンクを取得します。

## VDO.Ninjaでコミュニティ通話をディレクションする

デスクトップまたはラップトップのウェブブラウザーで、[VDO.ninja](http://VDO.ninja)にアクセスすることから始めます。

<a href="">
    <img src="/content-images/_unavailable.svg" alt="" width="300" height="400"/>
</a>


新しいルームを作成して自身のコミュニティ通話ライブストリームをディレクションするには、「Create a Room」をクリックします。

次の画面で、ルームを設定するための基本情報を入力します。

<a href="">
    <img src="/content-images/_unavailable.svg" alt="" width="400" height="400"/>
</a>

ルームが作成されると、ディレクターは次の画面で多くの操作オプションを利用できます。

<a href="">
    <img src="/content-images/_unavailable.svg" alt="" width="400" height="400"/>
</a>


参加者がルームに入ると、ディレクターであるあなたには、その参加者の動画と音声に関するすべてのソースオプションと操作項目が表示されます。

<a href="">
    <img src="/content-images/_unavailable.svg" alt="" width="400" height="300"/>
</a>


## よくある質問

- OBS Studioにはどの種類のビデオグラフィックカードが必要ですか？

高性能なグラフィックカードと大容量メモリーを搭載したパーソナルコンピューターを使用するか、あるいはハードウェアエンコーダーの[Teradek VidiU](https://www.bhphotovideo.com/c/product/1609186-REG/teradek_10_0235_vidiu_x_modem.html?gclid=EAIaIQobChMIl4aIo7zX_wIVDhqtBh0PgwhxEAAYAiAAEgInufD_BwE)を使用できます。
- OBSではライブ翻訳と字幕表示を行えますか？

このような機能を提供していると思われる、コミュニティ提供のプラグインがいくつかあります。[https://github.com/eddieoz/OBS-live-translation](https://github.com/eddieoz/OBS-live-translation)

- OBS Studio向けに独自のプラグインを開発できますか？

はい。OBSはluaとpythonのスクリプティングをサポートしています。また、オーバーレイとウェブビュー向けのJavaScriptもあります。

- ライブのフェードトゥブラックやトランジションを使用しますか？

それはプロデューサーであるあなた次第です！

- ストリーミング時にレイテンシーはありますか？

これは主にストリーミング先によって異なります。たとえば、YouTubeでは、配信前にサーバー上で行われる動画処理により、1分以上の遅延が発生する場合があります。

- 低速なマシンでOBSを使用し、グリーンスクリーン処理を行うと音声が途切れます

ハードウェアエンコーダーまたはstream yardを使用してください。
[https://support.streamyard.com/hc/en-us/articles/360056350852-How-to-Use-OBS-Virtual-Camera-with-StreamYard](https://support.streamyard.com/hc/en-us/articles/360056350852-How-to-Use-OBS-Virtual-Camera-with-StreamYard)または[RiverSide.FM](http://riverside.fm/)

## クレジット

- Ryan
- Ajay
- Arky

## リソース

[https://obsproject.com/help](https://obsproject.com/help)

[https://docs.vdo.ninja/](https://docs.vdo.ninja/)

オフィスアワー：メディアとデジタルイベントのコミュニティ
[https://alex4d.com/notes/item/media-and-digital-event-community](https://alex4d.com/notes/item/media-and-digital-event-community)
