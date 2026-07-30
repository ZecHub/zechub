<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Lightwallet_Nodes.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Zcash ライットウォレットノード

## はじめに

プライバシーを重視した暗号通貨であるZcashは、「ライトウォレットノード」と呼ばれる機能をサポートしており、ユーザーが全体のブロックチェーン履歴をダウンロードすることなく、Zcashブロックチェーンとやり取りできるようにしています。このWikiページでは、ライトウォレットノードの概要、"lightwalletd"サービスがZcashエコシステムにおいて果たす役割、現在利用可能なライトウォレットノードサーバーの一覧、およびYwalletやZingoなどの人気ウォレットでサーバーを変更する方法について説明します。

## lightwalletd サービス

"lightwalletd"サービス（略称："lightwalletデーモン"）は、Zcashのライトウォレットノードエコシステムにおいて重要な役割を果たしています。これは、軽量クライアント（ライトウォレット）が効果的に機能するために必要な情報を提供する仲介者として働きます。lightwalletdサービスについての簡単な説明は以下の通りです：

__データ集約__: lightwalletdは、トランザクション情報やブロックデータ、シールドプール情報などのZcashブロックチェーンからのデータを集約します。

__簡易検証__: lightwalletdはこのデータの簡易検証を行い、ライトウォレットが全体のブロックチェーンを検証する必要なく必要な情報をアクセスできるようにします。

__プライバシー保護__: サービスはZcashユーザーの視認キーまたは個人的なトランザクション情報の公開を要求しないため、プライバシーを維持します。

__効率的な同期__: lightwalletdはライトウォレットに対して効率的な同期を可能にし、Zcashブロックチェーンと最新の状態に合わせるために必要な時間とリソースを大幅に削減します。


## 現在利用可能なlightwalletdサーバー一覧

* [status.zec.rocks](https://status.zec.rocks/)
* [hosh.zec.rocks](https://hosh.zec.rocks/zec)

## モバイルウォレットでのサーバー変更方法

ライトウォレットノードサーバーを変更することは比較的簡単です。アプリケーション内の高度な設定にアクセスしてください。

__Ywallet/Zingo/Zashi/eZcashを開く__: お好みのウォレットをデバイスで起動します。

#### Ywallet:

Ywalletでは右上にある歯車アイコンをタップし、Zcashタブへ移動してください。

![SmartSelect_20250313_105128](https://github.com/user-attachments/assets/b0a2910b-dbdf-4292-8e69-af5a386aa183)

#### Zingo:

Zingoでは左上にあるハンバーガーメニューをタップし、設定を選択して下へスクロールしてください。

![SmartSelect_20250313_105737_Zingo](https://github.com/user-attachments/assets/ea8f7672-e644-41a5-a422-db131740404a)

#### Zashi:

Zashiでは右上にある歯車アイコンをタップし、高度な設定へ移動してサーバーを選択してください。

![SmartSelect_20250313_110200_Zashi](https://github.com/user-attachments/assets/5a9d050a-8308-4cc2-907e-513072066aed)

#### eZcash

eZcashでは左上にあるハンバーガーメニューをタップし、設定を選択して高度な設定をタップしてください。

![SmartSelect_20250313_110616](https://github.com/user-attachments/assets/655c0172-61a0-4322-b8cf-4eee4bb53b51)


## 結論

Zcashのライトウォレットノードとlightwalletdサービスは、ユーザーがブロックチェーンとやり取りするための便利でプライバシーを保護した方法を提供しています。サーバーを変更できる機能により、ご自身のニーズに最も適したノードを選択する柔軟性が得られます。
