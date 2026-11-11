# Zcash 資金調達とガバナンスの概要

Zcashのオンチェーン資金調達モデル、ブロック報酬の仕組み、および主要組織の役割

## 1. Zcashのブロック報酬の仕組み

ZcashはProof-of-Workの暗号資産です。マイニングされたすべてのブロックでは、ネットワークアップグレードによって定められた固定のプロトコルルールに従い、**ブロック補助金**（新規に作成されるZEC）とトランザクション手数料が分配されます。

- **現在のモデル（NU6後 / 2024年11月以降）**  
  2026年4月時点の分配は次のとおりです。

| 受取者                         | 割合       | 資金用途 / 状況                                                |
|--------------------------------|------------|-------------------------------------------------------------|
| マイナー                       | 80%        | マイナーへの直接ブロック報酬                                  |
| Zcash Community Grants（ZCG）   | 8%         | コミュニティ助成金（およそ2028年まで継続）                    |
| Lockbox（プロトコル管理）      | 12%        | 資金は蓄積中。支出メカニズムは未整備。将来のコミュニティ投票が必要 |

- **NU6以前の歴史的な開発資金（2020年-2024年11月）**  
  すべてのブロック補助金の20%は、開発組織へ直接配分されていました。

  - 7% -> Electric Coin Company（ECC）/ Bootstrapプロジェクト  
  - 5% -> Zcash Foundation（ZF）  
  - 8% -> Zcash Community Grants（ZCG）

この20%の「開発資金」は、[ZIP 1015](https://zips.z.cash/zip-1015)を通じて、8%のZCG + 12%のLockboxモデルに置き換えられました。

### 提案されている進化：ZIP 1016 - コミュニティおよびコイン保有者の資金調達モデル
ZIP 1016（2025年2月提案、ステータス：提案中）は、より分散型の資金調達モデルを導入します。この提案では以下を行います。
- ZCGへの8%の配分を継続します。
- 12%のLockboxを「Coinholder-Controlled Fund」（既存のLockbox資金 + 継続する12%のブロック補助金を原資とする）へ転換します。
- このモデルを第3回半減期まで（約3年間）有効にします。
- ZECコイン保有者が、コミュニティで定義されたプロセスを通じて四半期ごとに助成金へ投票できるようにします（単純過半数、最低定足数420,000 ZEC）。
- Key-Holder Organizations（現在はZFおよびShielded Labsを含み、助成金の文脈ではBootstrap/ECCも参照されています）に対し、法的合意およびコイン保有者の決定に拘束されるマルチシグを通じて支出を管理するよう求めます。
- Lockboxの利用に関するZIP 1015のすべての要件（エコシステム助成金への資金提供）を維持します。

この提案は、12%の配分に関する組織管理型のガバナンスから、コイン保有者による直接ガバナンスへの移行を目的としています。ZIPプロセスや商標ルールは変更しません。

## 2. 中核組織とその資金源

**Electric Coin Company（ECC）/ Bootstrapプロジェクト**  
- Zcashの当初の創設者です（2016年）。  
- 2024年11月まで、歴史的に開発資金の約7%を受け取っていました。  
- 2026年1月、コアエンジニアリングおよびプロダクトチームはガバナンスをめぐる対立によりBootstrap/ECCを辞任し、Zcash Open Development Lab（ZODL）を設立しました。  
- ECC/Bootstrapはもはやプロトコルから直接資金を受け取っておらず、主要開発チームも雇用していません。寄付、スポンサーシップ、および独自のトレジャリーに依存しています。  
- 歴史的に重要な存在ですが、現在は積極的なプロトコル開発組織ではありません。  
-> 詳細プロフィール：[Electric Coin Company](https://zechub.wiki/zcash-organizations/electric-coin-company)

**Zcash Open Development Lab（ZODL）**  
- Bootstrap/ECCを離れた後、元のZcashプロトコルデベロッパー（コアECCエンジニアリングおよびプロダクトチーム）によって2026年1月に設立されました。  
- a16z CryptoおよびCoinbase Venturesを含む主要投資家から、2,500万ドル超のシード資金を調達しました。  
- Zcashプロトコルの当初の発明者およびデベロッパーから成るチームは、コアプロトコル開発、ZIPへの貢献、およびZashiからリブランドされたZodlモバイルウォレットを含むプライバシー重視のツールを継続しています。  
- オンチェーンの直接的なプロトコル資金調達はなく、Zcashのプライバシーインフラの発展に注力するVC支援の独立ラボとして運営されています。  
-> 詳細プロフィール：[ZODL](https://zechub.wiki/zcash-organizations/ZODL)  
-> 公式サイト：[zodl.com](https://zodl.com/)
  
**Zcash Foundation（ZF）**  
- インフラ、ノードソフトウェア、研究、エコシステムの健全性に注力する独立した501(c)(3)非営利組織です。  
- 歴史的に開発資金の5%を受け取っていました。  
- NU6後はプロトコルからの直接資金を受け取っていません。寄付および助成金に依存しています。  
- ECCから2019年に寄贈されたZcash商標を保有し、ガバナンスにおいて中心的な役割を果たしています。  
- Zcash Community Advisory Panel（ZCAP）を運営し、コミュニティ投票の促進を支援しています。  
- 提案中のZIP 1016ではKey-Holder Organizationとして機能します。  
-> 詳細プロフィール：[Zcash Foundation](https://zechub.wiki/zcash-organizations/zcash-foundation)  
-> 公式サイト：[zfnd.org](https://zfnd.org/)

**Zcash Community Grants（ZCG）**  
- Zcash Community Grantsプログラムは、Zcashエコシステムの公共善のために、重要な継続的開発やその他の活動を行う独立チームおよびプロジェクトに資金を提供しています。  
- 助成金は、コミュニティ選出の委員会によって決定されます。  
- Financial Privacy Foundationを通じて管理され、ブロック報酬の全8%を引き続き受け取ります（NU6後）。  
- 助成金は、コミュニティに開かれた透明性の高い申請および投票プロセスを通じて授与されます。  
-> 詳細プロフィール：[Zcash Community Grants](https://zechub.wiki/zcash-organizations/zcash-community-grants)  
-> 公式サイト：[zcashcommunitygrants.org/](https://zcashcommunitygrants.org/)

**Financial Privacy Foundation（FPF）**  
- ケイマン諸島で法人化された非営利組織です。  
- プロトコルから8%のブロック補助金配分を直接受け取り（ZIP 1015に基づく）、Zcash Community Grantsプログラムに関するすべての法務、財務、および運営管理を担います。  
- 支出、契約、コンプライアンスを含むZCGの運営に対し、包括的な組織構造および管理支援を提供します。  
- ZCGはFPFの傘下で、自律的なコミュニティ選出組織として運営されています。  
-> 詳細プロフィール：[Financial Privacy Foundation](https://zechub.wiki/zcash-organizations/financial-privacy-foundation)  
-> 公式サイト：[financialprivacyfoundation.org/](https://www.financialprivacyfoundation.org/)

**Shielded Labs**  
- スイスを拠点とする、寄付で資金を賄う独立したZcash支援組織です。  
- Development Fundまたはブロック報酬から直接的・間接的を問わず資金を受け取ったことがない、Zcashエコシステム初の組織です。  
- ZEC保有者に利益をもたらす取り組みに注力し、Zcashの方向性を形成するうえで保有者の声を優先しています。  
- Coinholder-Controlled Fundの管理に関して、提案中のZIP 1016のKey-Holder Organizationとして機能します。  
- プロトコル開発、ZIPプロセス、およびガバナンス（ZIP編集者の代表）に貢献しています。  
-> 詳細プロフィール：[Shielded Labs](https://zechub.wiki/zcash-organizations/shielded-labs)  
-> 公式サイト：[shieldedlabs.net](https://shieldedlabs.net/)

## 3. ガバナンス - 意思決定の仕組み

Zcashのガバナンスは、「オンチェーンのプロトコルルール」と「オフチェーンの社会的コンセンサス」を組み合わせたものです。

1. **ZIPプロセス（Zcash Improvement Proposals）**  
   - 誰でもZIPを提出できます。  
   - フォーラム、Discord、GitHubで公開討議が行われます。  
   - ZIP編集者（現在は個人の立場でのJack Grigg、Daira-Emma Hopwood、Kris Nuttycombe、ZFのArya、およびShielded Labsの代表者）がレビューを行い、受理を決定します。  
   - 受理されたZIPは、次回のネットワークアップグレードに含まれます。

2. **商標契約（2019年-2024年）**  
   - ECCは2019年にZcash商標をZFへ寄贈しました。  
   - この契約では当初、新しいコンセンサスプロトコルを作成するネットワークアップグレードについて、ECCとZFの双方の合意が必要でした。  
   - 2024年4月、ECCは終了の意向を発表し、2024年8月に正式な終了通知が発行されました。  
   - 2025年時点で、ZFはZcash商標の唯一の管理者であり、エコシステムの分散化を反映した新たな寛容な商標ポリシーを採用しています。商標はもはやガバナンスの拒否メカニズムとして機能していません。

3. **Zcash Community Advisory Panel（ZCAP）**  
   - エコシステムの専門家から成るボランティアグループです。  
   - 重要な意思決定について、拘束力のないコミュニティ投票に利用されます。

4. **オンチェーン承認**  
   - ネットワークアップグレードが展開されると、ネットワークハッシュレートの過半数が採用する必要があります（コンセンサスに達した場合、ハードフォークのリスクはありません）。

5. **将来の方向性 - LockboxとZIP 1016**  
   - 12%のLockbox資金はプロトコル内で蓄積されています。  
   - ZIP 1016は、これを四半期ごとのコイン保有者投票とKey-Holder Organizations（現在はZFおよびShielded Labsが記載されています）によるマルチシグ管理を伴うCoinholder-Controlled Fundへ転換することを提案しています。

## 4. クイックリファレンス表 - 資金調達の変遷

| 期間             | マイナー | ECC/Bootstrap | ZF   | ZCG  | Lockbox | 注記                                       |
|------------------|--------|---------------|------|------|---------|--------------------------------------------|
| 2020年 - 2024年11月 | 80%    | 7%            | 5%   | 8%   | -       | 従来の開発資金                              |
| 2024年11月 - 現在 | 80%    | 0%            | 0%   | 8%   | 12%     | NU6モデル + ZCG拡張                  |
| 提案中（ZIP 1016） | 80% | 0%         | 0%   | 8%   | 12%（Coinholder-Controlled） | 第3回半減期まで。コイン保有者による投票 |

## 5. 関連リソース

- 公式の資金調達解説 -> [z.cashのネットワーク資金調達セクション](https://z.cash/network/?funding=#funding)  
- ZIP 1015（NU6の資金調達変更） -> [zips.z.cash/zip-1015](https://zips.z.cash/zip-1015)  
- ZIP 1016（提案中のコイン保有者モデル） -> [zips.z.cash/zip-1016](https://zips.z.cash/zip-1016)  
- Zcash Improvement Proposals -> [zips.z.cash](https://zips.z.cash)  
- Zcash Community Grantsポータル -> [zcashcommunitygrants.org](https://zcashcommunitygrants.org)

## 6. Lockboxダッシュボード

ZecHubダッシュボードでは、LockboxおよびCoinholders fundにある現在のZEC額を[こちら](https://zechub.wiki/dashboard?tab=lockbox)で確認できます。
