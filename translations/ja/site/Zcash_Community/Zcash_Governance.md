# Zcashの資金調達とガバナンス概要

Zcashのオンチェーン資金調達モデル、ブロック報酬メカニズム、および主要な組織の役割について

## 1. Zcashブロック報酬の仕組み

ZcashはProof-of-Work型の暗号資産です。毎回採掘されたブロックは、**ブロックサブシディ（新規に作成されるZEC）**とトランザクション手数料をネットワークアップグレードによって設定された固定プロトコルルールに基づいて配分します。

- **現在のモデル（NU6後 / 2024年11月以降）**  
  2026年4月時点での配分は以下の通りです：

| 受取者 | パーセンテージ | 資金用途／状況 |
|--------|----------------|----------------|
| マイナー | 80% | マイナーへの直接的なブロック報酬 |
| Zcashコミュニティグランツ（ZCG） | 8% | コミュニティグランツ（2028年頃まで継続） |
| ロックボックス（プロトコル管理） | 12% | 資金が蓄積；まだ支出メカニズムは存在せず；将来的なコミュニティ投票が必要 |

- **NU6以前の歴史的な開発基金（2020年～2024年11月）**  
  各ブロックサブシディの20%が直接的に開発組織に配分されていました：

  - 7% -> Electric Coin Company (ECC) / Bootstrap Project  
  - 5% -> Zcash Foundation (ZF)  
  - 8% -> Zcash Community Grants (ZCG)

この20%の「開発基金」は[ZIP 1015](https://zips.z.cash/zip-1015)によって、8%のZCG＋12%のロックボックスモデルに置き換えられました。

### 提案された進化：ZIP 1016 - コミュニティおよびコインホルダーファンディングモデル
ZIP 1016（2025年2月に提案、ステータス：提案中）はより分散型の資金調達モデルを導入します。以下のように変更されます：
- ZCGへの8%の配分を継続。
- 12%のロックボックスを「コインホルダーコントロールファンド（既存のロックボックス資金＋継続的な12%ブロックサブシディで初期資金となる）」に変換。
- このモデルは、3回目のハーフリング（約3年間）まで有効。
- ZECコインホルダーがコミュニティ定義されたプロセスを通じて四半期ごとにグランツを投票（単純過半数、最低クオラム420,000 ZEC）。
- キー・ホルダーオーガニゼーション（現在はZFとShielded Labsが含まれており、Bootstrap/ECCはグランツ文脈で参照される）がマルチシグを通じて支払いを管理し、法的合意およびコインホルダーの決定に従う。
- ZIP 1015におけるロックボックス使用に関するすべての要件を維持（エコシステムグランツへの資金提供）。

この提案は、12%の配分について組織管理から直接的なコインホルダーガバナンスへと移行することを目指しています。ZIPプロセスや商標規則には変更はありません。

## 2. 核心的な組織とその資金源

**Electric Coin Company (ECC) / Bootstrap Project**  
- Zcashのオリジナルクリエイター（2016年）。  
- 2024年11月まで、開発基金の約7%を受けていました。  
- 2026年1月に、ガバナンス紛争によりBootstrap/ECCから退職したコアエンジニアリングおよび製品チームはZcash Open Development Lab (ZODL)を設立しました。  
- ECC/Bootstrapは直接的なプロトコル資金を受け取らなくなり、主要な開発チームも雇用していません。寄付やスポンサーシップ、自身の財政に依存しています。  
- 歴史的意義があるが、現在ではアクティブなプロトコル開発組織ではありません。  
-> 詳細プロフィール：[Electric Coin Company](https://zechub.wiki/zcash-organizations/electric-coin-company)

**Zcash Open Development Lab (ZODL)**  
- 2026年1月に、Bootstrap/ECCから退職したオリジナルのZcashプロトコル開発者（ECCのコアエンジニアリングおよび製品チーム）によって設立されました。  
- a16z CryptoやCoinbase Venturesなどの主要投資家から2500万ドル以上のシード資金を調達しました。  
- Zcashプロトコルのオリジナルの発明者および開発者で構成されるチームは、コアプロトコル開発、ZIPへの貢献、プライバシーに焦点を当てたツール（ZashiからリブランドされたZodlモバイルウォレット）などを行っています。  
- オンチェーンプロトコル資金の直接的な受け取りはなく、VC支援を受けた独立研究室として運営され、Zcashプライバシーインフラを推進しています。  
-> 詳細プロフィール：[ZODL](https://zechub.wiki/zcash-organizations/ZODL)  
-> 公式サイト：[zodl.com](https://zodl.com/)

**Zcash Foundation (ZF)**  
- インフラ、ノードソフトウェア、研究、エコシステムの健康を目的とした独立した501(c)(3)非営利団体。  
- 過去には開発基金の5%を受け取っていました。  
- NU6後は直接的なプロトコル資金を受け取っておらず、寄付およびグランツに依存しています。  
- Zcash商標（2019年にECCから寄付された）を保有し、ガバナンスにおいて中心的な役割を果たしています。  
- Zcash Community Advisory Panel (ZCAP)を運営し、コミュニティ投票の実施を支援しています。  
- ZIP 1016提案下ではキーホルダーオーガニゼーションとして機能します。  
-> 詳細プロフィール：[Zcash Foundation](https://zechub.wiki/zcash-organizations/zcash-foundation)  
-> 公式サイト：[zfnd.org](https://zfnd.org/)

**Zcash Community Grants (ZCG)**  
- Zcashエコシステムのための公共利益に寄与する主要な継続的な開発およびその他の作業を行う独立チームやプロジェクトを支援します。  
- グランツはコミュニティ選出された委員会によって決定されます。  
- NU6後も8%のブロック報酬を受け取り、Financial Privacy Foundationを通じて管理されています。  
- コミュニティ向けに透明な申請および投票プロセスを通じてグランツが授与されます。  
-> 詳細プロフィール：[Zcash Community Grants](https://zechub.wiki/zcash-organizations/zcash-community-grants)  
-> 公式サイト：[zcashcommunitygrants.org/](https://zcashcommunitygrants.org/)

**Financial Privacy Foundation (FPF)**  
- ケイマン諸島に設立された非営利団体。  
- ZIP 1015に基づきプロトコルから直接的に8%のブロックサブシディを受けており、Zcash Community Grantsプログラムのすべての法的、財務および運用管理を行います。  
- ZCG運営における枠組み構造と行政支援（支払い、契約、コンプライアンス）を提供します。  
- FPFの下でZCGはコミュニティ選出された自治体として機能しています。  
-> 詳細プロフィール：[Financial Privacy Foundation](https://zechub.wiki/zcash-organizations/financial-privacy-foundation)  
-> 公式サイト：[financialprivacyfoundation.org/](https://www.financialprivacyfoundation.org/)

**Shielded Labs**  
- スイスに拠点を置く、寄付資金で運営されるZcash支援団体。  
- Zcashエコシステムにおいて開発基金またはブロック報酬から直接的または間接的な資金を受けたことがない最初の組織です。  
- ZECホルダーにとって利益になるイニシアチブに注力し、Zcashの方向性を形成する際にホルダーボイスを重視しています。  
- ZIP 1016提案下ではキーホルダーオーガニゼーションとして機能し、コインホルダーコントロールファンドの管理を行います。  
- プロトコル開発、ZIPプロセス、ガバナンス（ZIP編集者代表）にも貢献しています。  
-> 詳細プロフィール：[Shielded Labs](https://zechub.wiki/zcash-organizations/shielded-labs)  
-> 公式サイト：[shieldedlabs.net](https://shieldedlabs.net/)

## 3. ガバナンス - 決定の仕方

Zcashガバナンスは「オンチェーンプロトコルルール」と「オフチェーン社会的コンセンサス」の混合です：

1. **ZIPプロセス（Zcash Improvement Proposals）**  
   - 誰でもZIPを提出できます。  
   - フォーラム、Discord、GitHubでの公開議論が行われます。  
   - ZIP編集者（現在はJack Grigg、Daira-Emma Hopwood、Kris Nuttycombe（個人として）、ZFのArya、Shielded Labsの代表）が審査し採択を決定します。  
   - 採択されたZIPは次のネットワークアップグレードに含まれます。

2. **商標合意（2019-2024）**  
   - ECCは2019年にZcash商標をZFに寄付しました。  
   - 元々の合意では、新しいコンセンサスプロトコルを作成するネットワークアップグレードについてはECCとZF双方の同意が必要でした。  
   - 2024年4月にECCは終了の意思を表明し、2024年8月に正式な終了通知が発行されました。  
   - 2025年現在ではZFのみがZcash商標の唯一の管理者であり、エコシステムの分散化を反映した新しい許容的な商標ポリシーを採用しています。商標はもはやガバナンスでの否決メカニズムとして機能していません。

3. **Zcash Community Advisory Panel (ZCAP)**  
   - エコシステムの専門家によるボランティアグループです。  
   - 重要な決定に関する非拘束的なコミュニティ投票に使用されます。

4. **オンチェーン承認**  
   - ネットワークアップグレードが展開された後、ネットワークハッシュレートの大多数がそれを採用する必要があります（コンセンサスが達成されればハードフォークリスクはありません）。

5. **将来的な方向性 - ロックボックスとZIP 1016**  
   - 12%のロックボックス資金はプロトコル内で蓄積されています。  
   - ZIP 1016では、この資金を四半期ごとのコインホルダー投票とキーホルダーオーガニゼーション（ZFおよびShielded Labs）によるマルチシグ管理を通じて「コインホルダーコントロールファンド」に変換することを提案しています。

## 4. 资金調達の進化に関するクイックリファレンス表

| 時期 | マイナー | ECC/Bootstrap | ZF | ZCG | ロックボックス | 備考 |
|------|----------|------------------|----|-----|----------------|--------|
| 2020 - 2024年11月 | 80% | 7% | 5% | 8% | - | クラシック開発基金 |
| 2024年11月 - 現在 | 80% | 0% | 0% | 8% | 12% | NU6モデル＋ZCG拡張 |
| 提案（ZIP 1016） | 80% | 0% | 0% | 8% | 12%（コインホルダーコントロール） | 3回目のハーフリングまで；コインホルダー投票 |

## 5. 関連リソース

- 公式資金説明 -> [z.cash/network funding section](https://z.cash/network/?funding=#funding)  
- ZIP 1015（NU6資金変更）-> [zips.z.cash/zip-1015](https://zips.z.cash/zip-1015)  
- ZIP 1016（提案されたコインホルダーモデル）-> [zips.z.cash/zip-1016](https://zips.z.cash/zip-1016)  
- Zcash Improvement Proposals -> [zips.z.cash](https://zips.z.cash)  
- Zcash Community Grantsポータル -> [grants.zcashcommunity.com](https://grants.zcashcommunity.com)（または現在のFPFサイト）

## 6. ロックボックスダッシュボード

ZecHubダッシュボードでロックボックスおよびコインホルダーファンドに含まれるZECの現在の量を確認できます [ここ](https://zechub.wiki/dashboard?tab=lockbox)。
