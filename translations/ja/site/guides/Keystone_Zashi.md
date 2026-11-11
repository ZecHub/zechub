# Keystone Zashi ユーザーガイド

Twitter ガイド:  => [Zashi x Keystone ハードウェアウォレット統合 Twitter ガイド](https://x.com/zashi_app/status/1869793574880973144) 

この統合により、シールドされた（shielded）ZECのコールドストレージが可能になり、Zcashの使いやすさは大きく進化します。Zcashコミュニティは過去に他のハードウェアウォレットプラットフォームで挫折を経験してきましたが、Keystoneは限界を押し広げ、Electric Coin Companyとともに革新する意欲を持つ協力的なパートナーとして現れました。Keystoneチームは、この取り組みを進めるためにZCGの助成金（grant）を受け取りました。

## Keystone X Zashi チュートリアル

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/ktYf7josJKM"
    title="Keystone X Zashi Tutorial"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>
    

## 準備
[Keystone 3 Pro または Keystone 3](https://keyst.one)を注文して受け取ります。 

バッテリー残量: Keystoneデバイスのバッテリー残量が20%を超えていることを確認してください。

USBケーブルまたはSDカード:

- ファームウェア更新用のUSBケーブル（付属）。
- アップグレード用のMicro SDカード（1 TB未満、別途購入）。

検証およびファームウェア更新のためにKeystone公式ウェブサイトへアクセスします。

モバイルデバイスでZashiアプリをセットアップします。

## [ステップバイステップガイド（Keystoneデバイス）](https://keyst.one/get-started) 


**言語を選択します**
-デバイス検証（QR経由）: デバイス検証は、輸送中の潜在的な汚染を検出し、サプライチェーン攻撃を防ぎ、インストール済みファームウェアの安全性を確保するために不可欠です。
  - Keystoneウェブサイトの「デバイス検証」ページにアクセスします。
  - 公式ウェブサイトで「QRコードをスキャン」をクリックします。
  - Keystoneのカメラを使用して、ウェブサイトに表示されるQRコードをスキャンします。
  - 検証コードがKeystoneの画面に表示されます。
  - このコードをウェブサイトに入力して、検証プロセスを完了します。

- **ファームウェア更新:**
  - MicroSDカードによる更新
    - Keystoneウォレットのバッテリー残量が少なくとも20%あることを確認してください。
    - SDカードをコンピューターに挿入し、FAT32でフォーマットします。
    - [Keystoneファームウェア更新ページ](https://keyst.one/firmware)から最新のCypherpunkファームウェアバージョンをダウンロードし、keystone3.binファイルをMicroSDカードのルートディレクトリに保存します。
    - ファームウェアが入ったSDカードをKeystoneウォレットに挿入します。
    - Keystoneウォレットで「Upgrade」オプションにアクセスし、画面上の指示に従って更新プロセスを開始します。
  - **USBケーブルによる更新**
    - ファームウェアバージョンが1.0.4未満の場合、USB更新を進める前に、MicroSDカードを使用して初回更新を実行する必要があります。
    - Keystoneウォレットのバッテリー残量が少なくとも20%あることを確認してください。
    - 「via USB」をタップし、USBケーブルを使用してKeystoneウォレットをコンピューターに接続します。[Approve]をタップしてKeystoneウォレットにUSBアクセスを許可します。許可しない場合、充電のみが可能になることがあります。
    - コンピューターのウェブブラウザーを開き、[Keystoneファームウェア更新ページ](https://keyst.one/firmware)に移動します。
    - 更新ページで「Install Update」ボタンをクリックし、表示される指示に従って最新ファームウェアをインストールします。
- **ウォレットを作成します:**
    - 安全なパスワード: ウォレットを保護するために、強力なPINまたはパスワードを選択します。
    - ウォレットに名前を付けます（任意）: 簡単に識別できるよう任意でウォレットに名前を付けるか、この手順をスキップします。
    - 初めてウォレットを設定する場合は、「Create New Wallet」を選択します。
    - デバイスは24語のシードフレーズ（seed phrase）を生成します。
    - このシードフレーズを書き留め、安全に保管します。
    - 画面に表示される単語を正しい順序で確認して、シードフレーズを確認します。
- **Zashi + Keystoneウォレットを接続します:**
    - Keystoneデバイスで: メインページの「…」をタップします。
    - 「Connect Software Wallet」をタップし、Zashiを選択します。Zashiへの接続用QRコードが表示されます。
    - Zashiアプリで: zashiのドロップダウン（画面左上）をタップします。
    - 「Connect Hardware Wallet」をタップします。
    - 「Ready to Scan」をタップします。
    - Keystoneデバイスに表示されたQRコードをスキャンします。
    - Zashiアプリで: 表示されたアカウントをタップしてKeystoneウォレットアカウントを確認します。
    - 画面下部の「Connect」をタップします。


## 追加ヘルプ

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/Jr6LqtD1W0s"
    title="Connect Keystone Hardware Wallet to Zashi"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>
    

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/t_OHb1KqrRg"
    title="Sign an Outgoing Transaction with Keystone"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>
