<a href="https://github.com/Zechub/zechub/edit/main/site/ZFAV_Club/Guides_for_Creators/Serve_Github_Repo_with_IPFS.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# IPFSでGitHubリポジトリを提供する

## はじめに

このガイドでは、IPFS CIDを使用して提供されるGitHubリポジトリ用の、gitでクローン可能なURLを作成する方法を学びます。 

これは、地理的地域にかかわらないコンテンツの可用性、検閲耐性、および貴重な情報の永続的なバックアップを確保するのに役立ちます。

注: IPFSにアップロードされたデータは、すべてのネットワークユーザーが利用できます。個人データや機密データはローカルで暗号化（encryption）することをおすすめします。

## IPFS Kuboをインストールする

[こちら](https://docs.ipfs.tech/install/command-line/#install-official-binary-distributions)で提供されているインストール手順に従ってください。

この例ではLinuxを使用しますが、他のOSバージョンも利用できます。

`ipfs –version` を使用して、インストールが成功したことを確認してください。

## リポジトリをクローンする

まず、ホストしたいGitリポジトリを選択してクローンします。

コマンドを実行: 「git clone https://github.com/zechub/zechub”

![https://i.ibb.co/HxFX37b/Screenshot-from-2023-05-20-14-14-46.png](/content-images/Screenshot-from-2023-05-20-14-14-46-8503afccc3.webp)

次に、IPFS経由でクローンできるよう準備します。

cd zechub git update-server-info

Gitのオブジェクトを展開します。

![](/content-images/image-2024-04-20-175848513-2ceb90dd7b.webp)

これにより、後でGitリポジトリを更新した場合に、IPFSでオブジェクトの重複排除が可能になります。

## IPFSに追加する

ここまで完了すると、そのリポジトリを提供する準備が整います。あとはIPFSに追加するだけです。

$ pwd

/code/myrepo

$ ipfs add -r 

![https://i.ibb.co/LJgK1q3/Screenshot-from-2023-05-20-14-22-38.png](/content-images/Screenshot-from-2023-05-20-14-22-38-3fc2f72d91.webp)

生成されるCID: Qmbgqox5g3614gjTb43s5mdSmmk95aGWWA9EHksL2T91A2

![https://i.ibb.co/GvhCLwn/Screenshot-from-2023-05-20-14-26-34.png](/content-images/Screenshot-from-2023-05-20-14-26-34-6e00fee828.webp)

素晴らしいです！これでリポジトリはネットワークにアップロードされました。

## IPFSを使用してクローンする

これで、次を使用してGitHubリポジトリを取得できるはずです。

git clone http://ipfs.io/ipfs/yourCID

または、ローカルのIPFSノードを使用して検索・取得することもできます。

最後に: IPFS上のリポジトリフォルダは、実際のgithubリポジトリと連動して更新されません。定期的にフォルダを再アップロードすることをおすすめします。
