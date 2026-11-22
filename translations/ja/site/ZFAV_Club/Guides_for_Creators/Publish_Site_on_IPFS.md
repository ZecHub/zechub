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

IPFSは、コンテンツをCIDで識別されるブロック（blocks）として保存します。ファイルを追加すると、そのファイルはあなたのノードに保存されますが、他のノードへ自動的にコピーされるわけではありません。他の読者がファイルを取得できるように、アクセス可能なコピーをオンラインで維持するか、リモートピン留め（remote pinning）を手配してください。詳しくは[IPFSの永続性](https://docs.ipfs.tech/concepts/persistence/)をご覧ください。

**読む: [IPFSの概要](https://blog.infura.io/post/an-introduction-to-ipfs)**

## サイトを作成する

この例では、シンプルなウェブサイトを作成します。

[サイトの例](https://squirrel.surf/)

**ステップ1:** ウェブデザインに不慣れな場合は、タイトル、本文、他のページ／サイトへのリンク、フッターを含むウェブサイトの主要コンテンツを作成します。

**ステップ2:** [HTMLテンプレート!](https://nicepage.com/html-templates)を使用し、作成したテキストを適切に貼り付けます。必要に応じて、ウェブサイト用の.CSSスタイルシートも作成します。

**ステップ3:** ホームページを`index.html`としてサイトフォルダーのルートに配置します。画像とCSSも含め、`style.css`のような相対パスを使用してください。そうすることで、IPFSゲートウェイ（Gateway）のURLからアクセスした場合でも正しく表示されます。

## ノードを設定する

[IPFS Desktop](https://docs.ipfs.tech/install/ipfs-desktop/)がノードを管理してくれます。サイトを共有している間は、起動したままにしておいてください。

コマンドライン手順[（command-line route）](https://docs.ipfs.tech/how-to/command-line-quick-start/)を使う場合は、最初に一度だけ新しいリポジトリを初期化します：

```sh
ipfs init
```

次に、ノードを起動して、このターミナルを開いたままにしてください：

```sh
ipfs daemon
```

残りのコマンドは2つ目のターミナル（Terminal）で実行してください。IPFS Desktopがすでにこのリポジトリ（Repository）を管理している場合は、2つ目のデーモン（Daemon）を起動しないでください。

### **サイトフォルダーをIPFSに追加する**:

IPFS Desktopで、「フォルダを追加」（Add Folder）オプションを使用して、ウェブサイトのファイルが入ったフォルダを選択します。

<a href="">
    <img src="/content-images/ipfs-site-folder-2c96524d98.webp" alt="" width="400" height="200"/>
</a>

–

CLI を使う場合は、サイトフォルダーの親ディレクトリで次のコマンドを実行します:

```sh
ipfs add -r folder_name
```

`folder_name` をあなたのフォルダー名に置き換えてください（スペースを含む名前は引用符で囲んでください）。最後の `added ... folder_name` 行に表示される CID を保存してください。この CID は `index.html` だけでなく、ディレクトリ全体を識別します。

### IPFSにサイトをピン留めする:

CLI の `ipfs add` コマンドは、デフォルトでインポートしたコンテンツをローカルにピン留め（Pin）します。フォルダーのピン留めは次のコマンドで確認できます：

```sh
ipfs pin ls YOUR_FOLDER_CID
```

`YOUR_FOLDER_CID` を前の手順で得た CID に置き換えてください。出力には `recursive` と表示されるはずです。ピン留め（Pinning）は、このノードが保持するコピーをガベージコレクション（Garbage Collection）から保護しますが、電源が切れたコンピューターをオンラインに保つわけではありません。ノードがオフラインの間も利用できるようにするには、[リモートピン留め](https://docs.ipfs.tech/how-to/work-with-pinning-services/)を手配し、リモートサービスでピン留めが完了したことを確認してください。

### IPFS上でウェブサイトにアクセスする:

まず、ローカルゲートウェイ `http://127.0.0.1:8080/ipfs/YOUR_FOLDER_CID/` でサイトを確認してください（デーモンが別のゲートウェイポートを表示している場合は、そちらを使用してください）。末尾のスラッシュにより、相対リンクがディレクトリ内で正しく解決されます。

`https://ipfs.io/ipfs/YOUR_FOLDER_CID/`などのパブリックゲートウェイ（Public Gateway）は、到達可能なノードからコンテンツを取得できるようになれば、そのコンテンツを配信できます。ローカルでのプレビューが成功しても、一般に公開されて利用できることの証明にはなりません。

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

`example.com`の場合は、次のDNSレコードを追加し、`YOUR_FOLDER_CID`をご自身のディレクトリCIDに置き換えてください。

| タイプ | 名前 | 値 |
|---|---|---|
| TXT | `_dnslink.example.com` | `dnslink=/ipfs/YOUR_FOLDER_CID` |

一部のDNSプロバイダー（DNS provider）はゾーン（zone）を自動的に付加します。その場合は`_dnslink`のみを入力してください。上記のIPNSという名前を使用する場合は、値を代わりに`dnslink=/ipns/YOUR_IPNS_NAME`にすることもできます。詳しくは[DNSLink](https://docs.ipfs.tech/concepts/dnslink/)をご覧ください。

<a href="">
    <img src="/content-images/example-c2a9edb28b.webp" alt="" width="400" height="100"/>
</a>


DNSの反映後、`https://ipfs.io/ipns/example.com/`をお試しください。`https://example.com/`でサイトを直接配信するには、DNSLinkに対応したゲートウェイ（Gateway）とHTTPSの設定も必要です。TXTレコードだけではこれらは設定されません。[カスタムドメインガイド](https://docs.ipfs.tech/how-to/websites-on-ipfs/custom-domains/)に従ってください。

*おめでとうございます！これで検閲耐性のあるウェブサイトが完成しました。*

____

**リソース**

[IPFSドキュメント](https://docs.ipfs.tech/)

[IPNSドキュメント](https://docs.ipfs.tech/concepts/ipns/)

[DNSリンクのドキュメント](https://dnslink.io/#introduction)
