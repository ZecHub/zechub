# Zero to Zero Knowledge: ニーモニックシードフレーズ（Mnemonic Seed Phrases）

**シリーズ:** Zero to Zero Knowledge

ニーモニックシードフレーズは、暗号資産における最も重要な要素の1つである**自己カストディ（self-custody）**を支えています。  
今回は、シードフレーズがどのように生成され、ウォレット（Wallet）で使用されるかを学びます。

---

## ニーモニックシードフレーズとは？

リカバリーフレーズ（Recovery Phrase）は、現在最も一般的に使用されているリカバリーフレーズの種類である**BIP-39**仕様によって定義されています。

リカバリーフレーズの作成は、**ランダム性（randomness）**の生成から始まります。エントロピー（entropy）が多いほど、セキュリティは高くなります。ほとんどのユーザーには、**128ビット**のエントロピーで十分とされています。

![Seed phrase concept](/content-images/FooM3qWWACgrwzn-f222c4081f.webp)

初期エントロピーの長さに応じて、リカバリーフレーズは**12〜24語**になります。

---

## 手順解説: 12語のシードフレーズの生成方法

### 1. エントロピーを生成する
まず、**128ビット**のエントロピーを生成します。

### 2. チェックサムを追加する
**SHA256**を使用してエントロピーをハッシュ化します。このハッシュの最初の数ビットがチェックサムになります。  
これにより、エントロピーの一意のフィンガープリントが得られます。

![Entropy + Checksum diagram](/content-images/FooNoOEXgAAu-g6-613238fa7e.webp)

### 3. 11ビットのチャンクに分割する
合計132ビット（128ビットのエントロピー + 4ビットのチェックサム）を、11ビットごとのチャンクに分割します。

### 4. 単語リストにマッピングする
各11ビットのシーケンスは、10進数（0〜2047）に変換されます。  
BIP-39の単語リストには、正確に**2048語**（英語、スペイン語、中国語など）が含まれています。

これらの数値を使用して、単語リスト内の対応する単語を見つけます。

![Word mapping example](/content-images/FooN9rfXEBoQuU2-d11331fc0a.webp)

**結果:** これで、安全で人間が読み取れる12語のリカバリーフレーズが完成しました！

---

## リカバリーフレーズ → シード → 支払いアドレス

リカバリーフレーズを使用すると、ウォレットは支払いアドレスと異なるウォレットアカウントを作成するための鍵を生成できます。

生成される鍵は**決定論的（deterministic）**です。つまり、同じ入力からは常に同じ出力が生成されます。

### シードの生成
ウォレットのシードは、**鍵導出関数（Key Derivation Function、KDF）**を使用してニーモニックフレーズから導出されます。

- **Bitcoin**の場合: PBKDF2  
- **Zcash**の場合: Blake2b-256/512

これにより、**64バイト（512ビット）**のシードが生成されます。

![Seed to master keys](/content-images/FooOuumXEAgcBm1-dc7c66b84a.webp)

### マスター鍵
シードは2つの32バイトシーケンスに分割されます。
- **マスター支出鍵**
- **マスターチェーンコード**

これらは、子鍵の導出のために**階層的決定論的（Hierarchical Deterministic、HD）ウォレット**で使用されます。

---

## Zcash固有の機能（ZIP-32）

Zcashでは、マスターシードを損なうことなく、サブツリーごとに**閲覧権限（viewing authority）**または**支出権限（spending authority）**を独立して委任できます。

**ZIP-32**は、Zcashのプライバシー機能に適応した階層的決定論的鍵生成標準を定義しています。

**拡張支出鍵（Expanded Spending Key）**から、以下を導出します。
- Full Viewing Key
- Incoming Viewing Key
- 支払いアドレスのセット

異なる導出メカニズムにより、シールドされたプール（Sapling & Orchard）全体で送信者に渡すのに適した外部アドレスが生成されます。

![Zcash key derivation hierarchy](/content-images/FooPKd4XEBUQhJ6-af133c01bf.webp)

Zcashは、オートシールディングなどのウォレット操作向けに**内部アドレス（internal addresses）**もサポートしています。

---

## リソース

- [ZIP-32: シールドされた階層的決定論的ウォレット](https://zips.z.cash/zip-0032)  
- [Zcashプロトコル仕様（NU5）](https://zips.z.cash/protocol/protocol.pdf)  
- [デフォルトでシールドされたウォレットの概要](https://zechub.wiki)

---

**ZecHub（@ZecHub）によるオリジナルスレッド**  
https://x.com/ZecHub/status/1624125037945946145

---

*このページは、ZecHub wiki向けにオリジナルのZero to Zero Knowledgeスレッドから編集されました。*
