# ケーストーン Zashi ユーザー・ガイド

ツイッター・ガイド:  => [Zashi x Keystone ハードウェアウォレット統合ツイッター・ガイド](https://x.com/zashi_app/status/1869793574880973144) 

この統合は、シールドされたZECのコールドストレージを可能にし、Zcashの使いやす性において重要な進化をもたらします。過去には他のハードウェアウォレットプラットフォームで問題が発生したものの、ケーストーンはElectric Coin Companyと協力して境界を押し進め、革新を行うことを願うパートナーとして登場しました。ケーストーンチームは、彼らの作業を支えるためにZCGから助成金を受けました。

## ケーストーン × Zashi チュートリアル

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

[ケーストーン3プロまたはケーストーン3を注文・受け取る](https://keyst.one) 

バッテリー残量: ケーストーンデバイスのバッテリー残量が20％以上であることを確認してください。

USBケーブルまたはSDカード:

- ファームウェアアップデート用のUSBケーブル（付属）。
- 1TB未満のマイクロSDカード（別途購入が必要）でアップグレードを行う。

公式サイトへのアクセス: 認証およびファームウェアアップデートに使用します。

モバイル端末でのZashiアプリのセットアップ。

## [ステップバイステップガイド（ケーストーンデバイス）](https://keyst.one/get-started) 

**言語選択**
- デバイス認証（QRコード経由）: 装着中に潜在的な汚染を検出し、サプライチェーン攻撃を防ぎ、インストールされたファームウェアの安全性を確保するためにデバイス認証は重要です。
  - ケーストーン公式サイトの「デバイス認証」ページにアクセスしてください。
  - 公式サイトで「QRコードをスキャン」をクリックします。
  - ケーストーンカメラを使って、ウェブサイト上に表示されているQRコードをスキャンしてください。
  - ケーストーン画面に検証コードが表示されます。
  - このコードをウェブサイトに入力して認証プロセスを完了してください。

- **ファームウェアアップデート:**
  - マイクロSDカード経由で更新
    - ケーストーンウォレットのバッテリー残量が20％以上であることを確認してください。
    - SDカードをコンピュータに挿入し、FAT32形式でフォーマットします。
    - [Keystoneファームウェアアップデートページ](https://keyst.one/firmware)から最新のCypherpunkファームウェアバージョンをダウンロードし、keystone3.binファイルをマイクロSDカードのルートに保存してください。
    - ファームウェアが入ったSDカードをケーストーンウォレットに入れてください。
    - ケーストーンウォレットで「アップグレード」オプションにアクセスし、画面表示に従ってアップデートプロセスを開始します。
  - **USBケーブル経由での更新**
    - ファームウェアバージョンが1.0.4より低い場合、USBで更新を行う前にマイクロSDカードを使用して初期の更新が必要です。
    - ケーストーンウォレットのバッテリー残量が20％以上であることを確認してください。
    - 「USB経由」をタップし、USBケーブルを使ってケーストーンウォレットをコンピュータに接続します。USBアクセスを許可するために「承諾」をタップしてください。それ以外の場合は充電のみが可能になります。
    - コンピュータのウェブブラウザを開き、[Keystoneファームウェアアップデートページ](https://keyst.one/firmware)にアクセスします。
    - 更新ページで「更新をインストール」ボタンをクリックし、表示された指示に従って最新のファームウェアをインストールしてください。
- **ウォレット作成:**
    - セキュアなパスワード：ウォレットを保護するために強力なPINまたはパスワードを選択してください。
    - ウォレット名（オプション）：ウォレットを簡単に識別できるようにするため、ウォレットに名前をつけるか、このステップを飛ばすこともできます。
    - 初めてウォレットを作成する場合は「新しいウォレットの作成」を選択してください。
    - デバイスは24語のシードフレーズを生成します。
    - このシードフレーズを書き留め、安全に保管してください。
    - 画面に表示された順序で単語を確認してシードフレーズを確認してください。
- **Zashi + ケーストーンウォレットの接続:**
    - ケーストーンデバイス上：メインページで「…」をタップ
    - 「ソフトウェアウォレットに接続」を選択し、Zashiを選択します。Zashiへの接続用QRコードが表示されます。
    - Zashiアプリ内：画面左上のzashiドロップダウンをタップ
    - 「ハードウェアウォレットの接続」をタップ
    - 「スキャン準備完了」をタップ
    - ケーストーンデバイスに表示されているQRコードをスキャンします。
    - Zashiアプリ内：表示されたアカウントでケーストーンウォレットアカウントを確認し、「接続」を画面下部にタップ


## その他のサポート

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
