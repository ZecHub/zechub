[![ページを編集](https://img.shields.io/badge/Edit-blue)](https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Recovering_Funds.md)

# Zcashウォレット資金の回復

**なぜ秘密鍵を保持するのか？**

秘密鍵はデジタル資産のセキュリティの鍵です。それらを安全に保管し、第三者と共有しないことは不可欠です。

> この文脈では、**シードフレーズ**が秘密鍵と同等であると考えることができます。

秘密鍵を自身で管理することで、いつでも回復プロセスを行うことが可能です。Zcashの秘密鍵には2つのタイプ（透明型およびシャーディング型）があり、Sweep Funds機能を使用してウォレットにインポートするか、新しいアカウントとしてインポートすることが簡単にできます。秘密鍵を自身で管理することで資産に対する完全なコントロールを保ち、所有権、セキュリティ、そして安心感が確保されます。

# セキュリティと責任

ユーザーは、秘密鍵に関連するリスクを理解し、それらの鍵が不正アクセスから保護されていることを確認することが重要です。資金のセキュリティは、ユーザー自身が秘密鍵を守る責任に依存しています。

## Ywalletによる資金回復

YWalletは、*透明型のみ*およびシャーディング型の秘密鍵からのアクセス不能な資金の回復において、最良のオプションとして知られています。

### 1) 秘密鍵のインポート 

1. [Ywallet](https://ywallet.app)をダウンロード

2. 開いた後、右下にある「More」をクリック

3. 「Accounts（アカウント）」を選択

4. 右上隅のプラス記号をクリック

![Plus sign button](https://i.postimg.cc/xJbVz7gB/plus.png)

5. 「Restore an account（アカウントの復元）」を切り替える

6. シードフレーズまたは秘密鍵を入力

> **注意**: 透明型アドレスのみをサポートしていないウォレット（Trust, Coinomi, Guardaなど）で資金を保持していた場合は、「Sweep Funds（資金のスイープ）」機能を使用する必要があります。

### 2) 資金のスイープ 

1. [Ywallet](https://ywallet.app)をダウンロード

2. 開いた後、右下にある「More」をクリック

3. 「Tools（ツール）」セクションにスクロールし、「Sweep（スイープ）」をクリック

4. シードフレーズを入力（ギャップ制限によりシードによって生成された追加のアドレスをスキャン）

![Sweep Funds screen](https://i.postimg.cc/3055CBcN/sweep.png)

5. 転送先として使用したい値プールを入力（取引所は透明型を使用します）

6. 資金を預け入れたい宛先アドレスを入力。

## Zkool

Zkoolの詳細なドキュメントをご覧ください。資金回復のための別の方法について：

- [Zkool Docs](https://hhanh00.github.io/zkool2/guide/start.html)
- [Github](https://github.com/hhanh00/zkool2/)

## ZExCavator

ZExCavatorは、おそらく失われたZECを回復（掘り起こし！）するためのツールです：

- [ZExCavator](https://zexcavator.com/)
- [Github](https://github.com/zingolabs/zexcavator)
