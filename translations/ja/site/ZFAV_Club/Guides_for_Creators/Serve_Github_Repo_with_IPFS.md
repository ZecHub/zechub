<a href="https://github.com/Zechub/zechub/edit/main/site/ZFAV_Club/Guides_for_Creators/Serve_Github_Repo_with_IPFS.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="ページを編集"/>
</a>

# IPFSを使用してGitHubリポジトリをホストする

## はじめに

このガイドでは、IPFS CIDを使用してホストされるGitHubリポジトリのためのgit clone可能なURLを作成する方法について学びます。

これは、地理的な地域に関係なくコンテンツが利用可能になること、検閲に対する抵抗性があること、そして価値ある情報を永続的なバックアップとして保持することに役立ちます！

注意: IPFSにアップロードされたデータはネットワーク上のすべてのユーザーにとってアクセス可能です。個人的/機密なデータをローカルで暗号化する必要があります。

## IPFS Kuboのインストール

[こちら](https://docs.ipfs.tech/install/command-line/#install-official-binary-distributions)に提供されているインストール手順に従ってください。

この例ではLinuxを使用していますが、他のOSバージョンも利用可能です。

インストールが成功したかを確認するには `ipfs –version` を実行してください。

## リポジトリのクローン

開始するために、ホストしたいGitリポジトリを選択し、それをクローンします:

コマンド: “git clone https://github.com/zechub/zechub”

![https://i.ibb.co/HxFX37b/Screenshot-from-2023-05-20-14-14-46.png](https://i.ibb.co/HxFX37b/Screenshot-from-2023-05-20-14-14-46.png)

次に、IPFS経由でクローンできるように準備します。

cd zechub git update-server-info

Gitのオブジェクトを解凍:

![](https://i.ibb.co/25RwyWz/image-2024-04-20-175848513.png)

これを行うことで、後でGitリポジトリを更新した場合にIPFSがオブジェクトの重複を排除できるようになります。

## IPFSへのアップロード

それを行った後、そのリポジトリはホスト準備ができています。残っていることはそれをIPFSに追加することだけです:

$ pwd

/code/myrepo

$ ipfs add -r 

![https://i.ibb.co/LJgK1q3/Screenshot-from-2023-05-20-14-22-38.png](https://i.ibb.co/LJgK1q3/Screenshot-from-2023-05-20-14-22-38.png)

生成されたCID: Qmbgqox5g3614gjTb43s5mdSmmk95aGWWA9EHksL2T91A2

![https://i.ibb.co/GvhCLwn/Screenshot-from-2023-05-20-14-26-34.png](https://i.ibb.co/GvhCLwn/Screenshot-from-2023-05-20-14-26-34.png)

素晴らしい！今やあなたのリポジトリはネットワークにアップロードされました。

## IPFSを使用してクローンする

この時点で、以下のコマンドを使ってGitHubリポジトリを取得できるようになります:

git clone http://ipfs.io/ipfs/yourCID

あるいは、ローカルのIPFSノードを使用して検索・取得することも可能です。

最終的な注意点: IPFS上のリポジトリフォルダは実際のGitHubリポジトリと同時に更新されません。定期的にフォルダを再アップロードすることをお勧めします。
