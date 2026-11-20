<a href="https://github.com/zechub/zechub/edit/main/site/guides/Keystone_Zashi.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="ページを編集"/>
</a>

# Keystone Zodl（旧Zashi）ユーザーガイド

> シールドされたZECをコールドストレージで保管しましょう。KeystoneハードウェアウォレットとZodlアプリ（旧Zashi、2026年2月にブランドを変更）をペアリングし、QRコードでトランザクションに署名します。

## 要約

* Cypherpunkファームウェアを搭載したKeystone 3 Pro（またはKeystone 3）は、Zodl用のエアギャップ署名デバイスとして機能するため、シールドされたZECをコールドストレージで保管できます。
* 始める前に、バッテリー残量が20%を超えていること、ファームウェア更新用のUSBケーブル（またはFAT32 MicroSDカード）、スマートフォンにZodlアプリがあることを確認してください。
* まずKeystoneのウェブサイトでデバイスを検証してください。これにより、輸送中に改ざんされていないことを確認できます。
* ウォレットはKeystoneで作成し、24語のシードフレーズをオフラインで書き留めてください。Zodlに入力することはありません。
* 接続するには、Keystoneで「...」>「ソフトウェアウォレットを接続」>「Zodl」をタップし、次にZodlで「ハードウェアウォレットを接続」をタップしてQRコードをスキャンします。
* Zodlが各トランザクションを作成します。QRコードを相互にスキャンし、Keystoneの画面で承認して署名します。

## 基本説明

ハードウェアウォレットは、インターネットに一度も接続しない別個のデバイスに支出鍵を保管します。Keystoneはエアギャップ方式で、BluetoothやUSBではなくQRコードだけを使ってスマートフォンと通信します。

この構成では、Zodlが「閲覧」側です。Zcashネットワークと同期し、シールドされた残高を表示してトランザクションを準備します。Keystoneはシードフレーズを保持して署名します。スマートフォンが侵害されると残高を見られる可能性はありますが、Keystoneで承認しない限り、資金を動かすことはできません。

以下の手順では、デバイスの準備、検証、ファームウェアの更新、ウォレットの作成、Zodlへの接続について説明します。

## 概要

Twitterガイド:  => [Zodl（旧Zashi）× Keystoneハードウェアウォレット連携Twitterガイド](https://x.com/zashi_app/status/1869793574880973144) 

この連携により、シールドされたZECをコールドストレージで保管できるようになり、Zcashの使いやすさが大きく進化します。Zcashコミュニティはこれまで他のハードウェアウォレットプラットフォームで困難に直面してきましたが、Keystoneは境界を押し広げ、Electric Coin Companyとともに革新を進める協力的なパートナーとして登場しました。Keystoneチームは、この取り組みのZCGに充てる助成金を受け取りました。

## Keystone X Zodlチュートリアル

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/ktYf7josJKM"
    title="Keystone X Zodlチュートリアル"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>
    

## 準備
[Keystone 3 ProまたはKeystone 3を注文して受け取る](https://keyst.one) 

バッテリー残量: Keystoneデバイスのバッテリー残量が20%を超えていることを確認してください。

USBケーブルまたはSDカード:

- ファームウェア更新用のUSBケーブル（同梱）。
- アップグレード用のMicro SDカード（1 TB未満、別売り）。

検証とファームウェア更新のために、Keystoneの公式ウェブサイトにアクセスできること。

モバイルデバイスでZodlアプリを設定してください。

## [ステップごとのガイド（Keystoneデバイス）](https://keyst.one/get-started) 


**言語を選択**

- **デバイスの検証（QRコードを使用）:** デバイスの検証は、輸送中に不正な変更が加えられた可能性を検出し、サプライチェーン攻撃を防ぎ、インストール済みファームウェアの安全性を確認するうえで重要です。
  - Keystoneのウェブサイトでデバイス検証ページを開きます。
  - 公式ウェブサイトで「QRコードをスキャン」をクリックします。
  - Keystoneのカメラで、ウェブサイトに表示されたQRコードをスキャンします。
  - 検証コードがKeystoneの画面に表示されます。
  - このコードをウェブサイトに入力して、検証を完了します。

- **ファームウェアの更新:**
  - MicroSDカードで更新する
    - Keystoneウォレットのバッテリー残量が20%以上あることを確認します。
    - SDカードをコンピューターに挿入し、FAT32形式でフォーマットします。
    - [Keystoneのファームウェア更新ページ](https://keyst.one/firmware)から最新のCypherpunkファームウェアをダウンロードし、keystone3.binファイルをMicroSDカードのルートに保存します。
    - ファームウェアを保存したSDカードをKeystoneウォレットに挿入します。
    - Keystoneウォレットで「アップグレード」を選択し、画面の指示に従って更新を開始します。
  - **USBケーブルで更新する**
    - ファームウェアのバージョンが1.0.4未満の場合、USBで更新する前にMicroSDカードを使って初回更新を行う必要があります。
    - Keystoneウォレットのバッテリー残量が20%以上あることを確認します。
    - 「USB経由」をタップし、USBケーブルでKeystoneウォレットをコンピューターに接続します。「[承認]」をタップして、KeystoneウォレットにUSBアクセスを許可します。許可しない場合、充電のみ可能になることがあります。
    - コンピューターのウェブブラウザーを開き、[Keystoneのファームウェア更新ページ](https://keyst.one/firmware)にアクセスします。
    - 更新ページで「更新をインストール」をクリックし、表示される指示に従って最新のファームウェアをインストールします。
- **ウォレットを作成する:**
    - 安全なパスワード: ウォレットを保護するため、強力なPINまたはパスワードを設定します。
    - ウォレットに名前を付ける（任意）: 識別しやすいように名前を付けるか、この手順をスキップします。
    - 初めてウォレットを設定する場合は、「新しいウォレットを作成」を選択します。
    - デバイスが24語のシードフレーズを生成します。
    - このシードフレーズを書き留め、安全な場所に保管します。
    - 画面に表示された正しい順序で単語を確認し、シードフレーズを検証します。
- **Zodl + Keystoneウォレットを接続する:**
    - Keystoneデバイスで、メインページの「…」をタップします。
    - 「ソフトウェアウォレットを接続」をタップし、「Zodl」を選択します。Zodlへの接続用QRコードが表示されます。
    - Zodlアプリで、Zodlのドロップダウン（画面左上）をタップします。
    - 「ハードウェアウォレットを接続」をタップします。
    - 「スキャンの準備完了」をタップします。
    - Keystoneデバイスに表示されたQRコードをスキャンします。
    - Zodlアプリで、表示されたアカウントをタップしてKeystoneウォレットアカウントを確認します。
    - 画面下部の「接続」をタップします。


## ヘルプ

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/Jr6LqtD1W0s"
    title="KeystoneハードウェアウォレットをZodlに接続"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>
    

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/t_OHb1KqrRg"
    title="Keystoneで送金トランザクションに署名する"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>
