<a href="https://github.com/Zechub/zechub/edit/main/site/ZFAV_Club/Guides_for_Creators/Publish_Site_on_IPFS.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# IPFSでサイトを公開する

<a href="">
    <img src="/content-images/IPFS-40c2e22732.webp" alt="" width="800" height="400"/>
</a>



## IPFSの概要

IPFS（InterPlanetary File System）は、ファイルを保存・共有するための分散型の方法を構築するよう設計されたピアツーピア（peer-to-peer）プロトコルおよびネットワークです。

従来のインターネットにおけるクライアント・サーバーモデルとは異なり、IPFSではコンテンツの保存・配信を中央集権型サーバーに依存せず、ユーザー同士が直接ファイルを共有できます。

IPFS内のファイルは、コンテンツアドレッシング（content-addressing）を使用してアドレス指定されます。つまり、各ファイルにはその内容に基づく一意のハッシュまたはコンテンツ識別子（CONTENT IDENTIFIER、CID）が付与され、このハッシュを使用してネットワークからファイルを取得します。

ユーザーがIPFSにファイルを追加すると、そのファイルはブロック（blocks）と呼ばれる小さな断片に分割され、各ブロックにCIDが付与されます。これらのブロックはネットワーク内の異なるノードに保存されるため、複数のソースからファイルを簡単に取得できます。

これにより冗長性と耐障害性が確保されると同時に、1つのノードが単一障害点または制御点になることを困難にします。

**読む: [IPFSの概要](https://blog.infura.io/post/an-introduction-to-ipfs)**

## サイトを作成する

この例では、シンプルなウェブサイトを作成します。

[サイトの例](https://squirrel.surf/)

**ステップ1:** ウェブデザインに不慣れな場合は、タイトル、本文、他のページ／サイトへのリンク、フッターを含むウェブサイトの主要コンテンツを作成します。

**ステップ2:** [HTMLテンプレート!](https://nicepage.com/html-templates)を使用し、作成したテキストを適切に貼り付けます。必要に応じて、ウェブサイト用の.CSSスタイルシートも作成します。

**ステップ3:** ディレクトリを保存します。すべての.htmlページと画像は同じフォルダー内に置く必要があります。

## ノードを設定する

[公式ウェブサイト](https://docs.ipfs.tech/install/ipfs-desktop/)からIPFSをダウンロードしてインストールします。

### IPFSを初期化する:

デスクトップアプリケーションを使用している場合、初期化は必要ありません。

ターミナルまたはコマンドプロンプトで、次のコマンドを実行します: ipfs init

### **サイトフォルダーをIPFSに追加する**:

ウェブサイトのファイルが入ったフォルダーを選択し、「フォルダーを追加」オプションに移動します。


<a href="">
    <img src="/content-images/ipfs-site-folder-2c96524d98.webp" alt="" width="400" height="200"/>
</a>

–

ターミナルを使用する場合は、次のコマンドを実行します: ipfs add -r folder_name。これにより、フォルダー全体が再帰的にIPFSへ追加されます。

### IPFSにサイトをピン留めする:

ウェブサイトのファイルをIPFSに追加したら、ネットワーク上で利用可能な状態を維持するために、それらを**ピン留め**する必要があります。

–

ターミナルを使用する場合は、次のコマンドを実行します: If using Terminal, Run command: ipfs pin add **hash**

**hash** = 前のステップで追加したフォルダーのCIDです。

また、[Pinata](https://pinata.cloud/)や[Dolpin](https://dolpin.io/)などのサービスを使用して、ディレクトリをピン留めすることもできます。

大幅に時間を節約できます！

–

### IPFS上でウェブサイトにアクセスする:

ウェブサイトはIPFS上に公開され、フォルダーのハッシュを使用してアクセスできます。ウェブサイトにアクセスするには、https://ipfs.io/ipfs/**hash**にアクセスします。

**hash** = フォルダーのCIDです。

この例では、CID = QmW2UEfap1vrRRvS5H9wed8qmsx4WsvXBk3GPGVVfWx3r3 です。

## IPNS

Interplanetary Naming System（IPNS）を使用すると、ウェブサイトに関連付けられたIPFS CIDを更新しても、固定リンクを提供し続けることができます。これはキーとして提供されます。


<a href="">
    <img src="/content-images/dns-query.a0134a75-9ef7817f80.webp" alt="" width="400" height="100"/>
</a>


IPFSデスクトップアプリケーションでサイトフォルダーの設定メニューを開き、「IPNSに公開」を選択します。

<a href="">
    <img src="/content-images/IPNS-2fe62cc369.webp" alt="" width="400" height="200"/>
</a>


キー: 「k51qzi5uqu5di670a6uxywo17b2be1eyhoa2cl0qlwpfxn5p9ypcu8jbzgnj4n」

ゲートウェイ経由でサイトを表示するためにも使用できます: https://ipfs.io/ipns/k51qzi5uqu5di670a6uxywo17b2be1eyhoa2cl0qlwpfxn5p9ypcu8jbzgnj4n

## DNSリンク

サイトは作成できたので、次はURLをコンテンツへ向ける方法が必要です。

すでにウェブアドレスを所有している場合は、TXTレコード _dnslink(ドメイン) を使用して新しいレコードを追加できます。プロバイダーによっては自動入力される場合があります。


<a href="">
    <img src="/content-images/example-c2a9edb28b.webp" alt="" width="400" height="100"/>
</a>


表示できるようになるまで、ネットワーク全体に伝播する時間がかかります。

*おめでとうございます！これで検閲耐性のあるウェブサイトが完成しました。*

____

**リソース**

[IPFSドキュメント](https://docs.ipfs.tech/)

[IPNSドキュメント](https://docs.ipfs.tech/concepts/ipns/)

[DNSリンクのドキュメント](https://dnslink.io/#introduction)
