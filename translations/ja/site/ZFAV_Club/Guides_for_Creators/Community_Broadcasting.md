<a href="https://github.com/Zechub/zechub/edit/main/site/ZFAV_Club/Guides_for_Creators/Community_Broadcasting.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="ページを編集"/>
</a>

# VDO.NinjaとOBS Studioを使用したコミュニティ放送

この短いチュートリアルは、[DWeb Camp 2023](https://dwebcamp.org/)でフェローおよびボランティアのグループによって作成されました。この練習の目的は、オフラインMESHネットワークに接続されたスマートフォンデバイスを使用して協力的な動画録画とストリーミングを行うことです。

我々はオープンソースソフトウェアである[OBS Studio (Open Broadcaster software)](https://obsproject.com/)および[VDO.Ninja](https://vdo.ninja/)を使用します。これらのソフトウェアは、あなたのコンピュータにローカルでダウンロードして実行可能です。

## OBS Studio (Open Broadcaster Software)

OBS Studioは、ゲームストリーミングコミュニティおよび独立した動画コンテンツクリエイターの間で広く利用されている、複数のオペレーティングシステムで使用可能な無料でオープンソースソフトウェアです。このソフトウェアは2012年に最初にリリースされ、多くのユーザーがいます。

OBS Studioのユーザーインターフェースは、初めて使うユーザーにとっては少し難しいかもしれません。OBS Studioは、「プレビュー」と「放送」の二つのウィンドウに分かれています。「プレビュー」ウィンドウでは、ウェブカメラ、Iriun Webcam、OBS Virtual Camera、動画およびブラウザソースなどの利用可能な動画（さまざまなカメラ）が表示され、「シーン」と呼ばれます。「放送」はライブストリームを表示します。

VDO.Ninjaから遠隔カメラストリームをOBS Studioにストリーミングするには、「Sources > Add > Browser」を選択して新しい「ブラウザソース」を追加します。新しく開いたウィンドウで、VDO.NinjaのソースURLを提供し、「Make source visible（ソースを表示）」を選択します。

これで、遠隔ストリームの放送を開始できます。

## VDO.Ninja

[VDO.Ninja](https://vdo.ninja/)は、あなたのモバイルデバイスをライブストリーミングカメラに変えることができる無料でオープンソースのウェブアプリケーションです。このソフトウェアはローカルコンピュータにダウンロードして展開することもできますし、[オンライン版（https://vdo.ninja）](https://vdo.ninja/)を使用することも可能です。

VDO.Ninjaのインターフェースは非常にシンプルで、モバイルデバイスのウェブブラウザでVDO.Ninjaを開き、「OBSにカメラを追加」を選択します。その後、リストからカメラおよびオーディオデバイスを選択し「Start（開始）」をクリックします。「View（表示）」リンクが取得でき、それをOBS Studioに追加できます。

## VDO.Ninjaを使用したコミュニティコールのディレクション

まず、あなたのデスクトップ/ラップトップでウェブブラウザを開き、[VDO.ninja](http://VDO.ninja)にアクセスします。

<a href="">
    <img src="https://images.spr.so/cdn-cgi/imagedelivery/j42No7y-dcokJuNgXeA0ig/8ded1b54-602b-4e66-af92-127990eff723/Screenshot_2023-08-23_162222/w=3840,quality=80" alt="" width="300" height="400"/>
</a>

新しいルームを作成し、自分のコミュニティコールライブストリームをディレクションするには、「Create a Room（ルームの作成）」をクリックします。

次の画面では、ルームの設定に必要な基本情報が尋ねられます。

<a href="">
    <img src="https://images.spr.so/cdn-cgi/imagedelivery/j42No7y-dcokJuNgXeA0ig/ae698696-7b4d-458e-8de0-58a198c36e73/Screenshot_2023-08-23_183900/w=3840,quality=80" alt="" width="400" height="400"/>
</a>

ルームが作成されると、ディレクターは次の画面で多くのコントロールオプションを使用できます。

<a href="">
    <img src="https://images.spr.so/cdn-cgi/imagedelivery/j42No7y-dcokJuNgXeA0ig/35b43544-5114-4e74-ac41-9e8993fe62ea/Screenshot_2023-08-23_184015/w=3840,quality=80" alt="" width="400" height="400"/>
</a>

人々がルームに参加すると、ディレクターはその人の動画とオーディオとともにすべてのソースオプションとコントロールを表示します。

<a href="">
    <img src="https://images.spr.so/cdn-cgi/imagedelivery/j42No7y-dcokJuNgXeA0ig/2247f187-b005-478e-9e5e-471cb8f070d3/Screenshot_2023-08-23_194136/w=3840,quality=80" alt="" width="400" height="300"/>
</a>

## FAQ

- OBS Studioにはどのようなビデオグラフィックカードが必要ですか？

高性能なグラフィックカードと多くのメモリを持つ個人用コンピュータを使用するか、またはハードウェアエンコーダーを使用することができます。[Teradek VidiU](https://www.bhphotovideo.com/c/product/1609186-REG/teradek_10_0235_vidiu_x_modem.html?gclid=EAIaIQobChMIl4aIo7zX_wIVDhqtBh0PgwhxEAAYAiAAEgInufD_BwE)
- OBSはライブ翻訳や字幕をサポートしていますか？

コミュニティが提供したいくつかのプラグインがあり、そのような機能を提供しているようです。[https://github.com/eddieoz/OBS-live-translation](https://github.com/eddieoz/OBS-live-translation)
- OBS Studio用に独自のプラグインを開発できますか？

はい、OBSではLuaやPythonスクリプティングがサポートされており、オーバーレイおよびウェブビューにはJavaScriptも使用可能です。
- ライブ放送中に黒画面へのフェードまたはトランジションを使用できますか？

それはプロデューサーの裁量に委ねられます！
- ストリーミング中に遅延はありますか？

これは、ストリーミング先によって大きく異なります。たとえば、YouTubeではサーバーでの動画処理が行われるため、1分以上遅延することがあります。
- OBSを使用してグリーンスクリーンを行うときに音声が途切れてしまう

ハードウェアエンコーダーを使用するか、Stream Yardを使用してください
[https://support.streamyard.com/hc/en-us/articles/360056350852-How-to-Use-OBS-Virtual-Camera-with-StreamYard](https://support.streamyard.com/hc/en-us/articles/360056350852-How-to-Use-OBS-Virtual-Camera-with-StreamYard) または [RiverSide.FM](http://riverside.fm/)

## 謝辞

- Ryan
- Ajay
- Arky

## リソース

[https://obsproject.com/help](https://obsproject.com/help)

[https://docs.vdo.ninja/](https://docs.vdo.ninja/)

Office Hours: メディアおよびデジタルイベントコミュニティ
[https://alex4d.com/notes/item/media-and-digital-event-community](https://alex4d.com/notes/item/media-and-digital-event-community)
