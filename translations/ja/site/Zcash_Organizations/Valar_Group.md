<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Organizations/Valar_Group.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Valar Group

[ウェブサイトを訪問](https://valargroup.dev/)

<<img width="200" height="200" alt="254678133" src="https://github.com/user-attachments/assets/0dc8c697-bcad-492a-b024-89b502d27af4" />


## ミッション・ステートメント

Valar Groupは、Zcashのスケーリング、コイン保有者ガバナンスの強化、そしてプロトコルのプライバシー、性能、長期的なレジリエンスの改善に注力する独立系エンジニアリング組織です。

その取り組みはプロトコルレベルのインフラに集中しています。すなわち、プライベートなトークン保有者投票、高性能フルノードソフトウェア、ウォレット同期技術、そしてシールドされたZcashを大規模により使いやすくするネットワークアップグレードです。

この組織は、ZEC保有者が選好をプライベートに表明できる手段を提供し、ノード運用者にはより高速で高機能なソフトウェアを提供し、ウォレットにはネットワーク参加のコストを抑えながらユーザーのプライバシーを維持するツールを提供することを目指しています。

## 背景

Valar Groupは、Osmosisの共同創業者であり、Cosmosを立ち上げたチームのメンバーでもあるDev Ojha（ValarDragon）が率いています。彼は過去10年間にわたり、zk-SNARKs、BFTコンセンサス、本番運用のDeFiシステムに携わってきました。

Zcashにおける同グループの公開活動は、2026年のコア開発再編後にエコシステムが独立したプロトコルチームへと移行する中で注目を集めました。Valar Groupは、Project Tachyon、Shielded Labs、ZODL、Zcash Foundationと並び、次世代のZcashインフラを構築する組織の一つとして台頭しました。

その活動で繰り返し見られるテーマは、Zcashのプライバシー特性が決済を超えて拡張されるべきだということです。保有者が発行量、ブロック時間、またはネットワークアップグレードの範囲について投票を求められる場合、身元、残高、個別の投票を明かすことなく、シールド残高から投票できるべきです。この要件を受け、Valar Groupは専用のコイン保有者投票チェーンを設計・提供しました。

同じスケーリングと暗号技術の背景は、ノードおよび同期に関する取り組みにも影響を与えました。より高速なブロック、より軽量なウォレット同期、そしてより高機能なフルノードは、価値保存手段としてだけでなく、決済ネットワーク規模で利用できるプライベートマネーの前提条件と見なされています。

## ビジョン

Valar Groupの公開資料とプロジェクト活動は、以下を実現できるZcashネットワークを目指しています。

- 繰り返し実施可能なガバナンスプロセスとして、プライベートかつ監査可能なコイン保有者投票をサポートする。
- シールドされたプライバシーを損なうことなく、プルーフ・オブ・ワーク決済をスケールさせる。
- PIR、プルーニング、より高速なブロック伝播を通じて、ウォレットとノードのボトルネックを削減する。
- 独立したフルノードスタックを提供することで、実装の多様性を高める。
- ポスト量子対応と、正式なレビューを経たプロトコルアップグレードに貢献する。

この組織は、プロトコルの所有者ではなく独立した貢献者として活動しています。プロトコル変更は引き続きZIP、実装、レビュー、コミュニティの意思表示を経て進められます。Valar Groupの役割は、これらのプロセスを実用的にするシステムを設計、実装、運用し、オープンソース化することです。

## 戦略分野

Valar Groupの活動は4つの分野に分かれています。

### プライベートなコイン保有者ガバナンス

Zcashは、自動的なオンチェーンのプロトコル制御を採用していません。コイン保有者投票は、より広範なラフコンセンサスのプロセスに情報を与える助言的なシグナルです。Valar Groupは、投票者の身元や個別の投票規模を公開することなく、これらのシグナルをシールド残高から収集できるよう、Tokenholder Voting Chainを構築しました。

現在の設計には、以下が使用されています。

- 投票ラウンドを統括する専用のCosmos SDKアプリケーションチェーン。
- 使用可能なIronwoodノートに対するスナップショット証明。
- 投票額の準同型暗号化。
- nullifier非所属証明のためのPrivate Information Retrieval。
- コーディネーターのマルチシグと分散型選挙機関。

目標は、従来のトークン保有者投票プロセスを、他の組織が運用し、独自に集計できる、再利用可能で監査済みかつウォレット統合可能なシステムに置き換えることです。

### ノードソフトウェアとネットワークのスケーリング

Valar Groupは、Zebraコードベースから構築されたZcashフルノードであるZakuraにおいて、Project Tachyonと協力しています。Zakuraは、より高速な初期同期、プルーニング、スナップショットによるブートストラップ、そして旧`zcashd`ユーザー向けの互換性パスを必要とする運用者のための高性能ノードとして位置付けられています。

関連するスケーリング作業には以下が含まれます。

- NU7テストネットにおける25秒ブロック実験を含む、より短い目標ブロック時間。
- 改善されたピアツーピアのブロック伝播。
- シールド活動の拡大に伴ってもZcashを利用可能に保つことを目的としたフルノード機能。

### ウォレットおよび同期インフラ

シールドされたウォレットは、従来、多量のチェーンデータをスキャンする必要があります。Valar GroupはPIRシステムを開発し、ウォレットが完全なnullifierセットをダウンロードしたり、関心のあるノートを明かしたりすることなく、必要な証明を取得できるようにしています。

この取り組みは、投票スタックとより広範なウォレット同期研究の両方に現れています。同グループは、ZODLのモバイルスタックで使われる複数サーバーへのトランザクション送信やサーバー選択の改善など、ウォレット側の信頼性向上にも貢献しています。

### プロトコルアップグレードとエコシステム協調

Valar Groupは、Orchard回路の脆弱性後のIronwood対応に公にコミットした組織の一つです。Ironwoodは新しいシールドプールを導入し、元のOrchardプールをターンスタイルの背後に封印し、流通供給量を独立して検証するための道筋を復元しました。Valar Groupは、Project Tachyon、Shielded Labs、ZODL、Zcash Foundationとともに、アーキテクチャ、コンセンサスルール実装、エコシステム協調に取り組みました。

同グループはNU7のスコーピング、テストネット運用、ZIP編集にも参加しています。Dev OjhaはZIPエディターとして記載されています。

## 現在の取り組み

### Tokenholder Voting Chain / Shielded Vote

Shielded Voteは、Zcash向けのValar Groupのプライベートガバナンスプロトコルです。保有者は、個別の金額を明かしたり、投票を身元に結び付けたりすることなく、シールド残高で投票します。

主な特性は以下のとおりです。

- 複数日にわたるコミット／リビールプロセスではなく、投票のためのオンラインセッションは1回。
- 資金を危険にさらすことなく投票権をhotkeyに委任する、Keystone互換のスナップショット署名。
- 準同型ElGamalを使用した暗号化投票額。
- スナップショット証明中にnullifierが漏洩しないようにするPIRクエリ。
- 時間的相関を低減する投票分割と遅延リレー送信。
- 公開監査可能な集計。

2026年8月、Valar GroupとProject Tachyonは、このスタックをNU7コイン保有者投票に使用しました。参加資格には、メインネットの高さ3,459,350においてIronwood内に使用可能なシールドZECを保有していることが必要でした。投票は2026年8月25日から9月14日まで実施され、その結果を代表性のあるものとして扱うには1,000,000 ZECの参加基準が設定されました。質問は、NSM発行の平滑化、再発行の時期、Sprout/v4の廃止、25秒ブロック時間、NU7の範囲と準備状況を対象としました。

デフォルトチェーンの調整には、Project Tachyon、Valar Group、Zcash Foundation、ZODL、Shielded Labsによる5者中2者のマルチシグが使用されます。別のバリデーターセットが、ラウンドごとの復号鍵シェアを保有します。単一のバリデーターが個別の投票を復元することはできません。最終集計を作成するには、しきい値数のバリデーターが必要です。

公開された運用者および監査者向けの機能には、以下が含まれます。

- [投票チェーンのセットアップ](https://setup.valargroup.org)
- [集計監査ツール](https://tally.valargroup.org)
- [コーディネーターUI](https://svote.valargroup.org/)
- [PIRサーバーのセットアップ](https://setup-pir.valargroup.org)
- [Shielded Voteドキュメント](https://valargroup.gitbook.io/shielded-vote-docs)

### Zakura

Zakuraは、Valar GroupとProject Tachyonの協力により開発されたZcashフルノードです。Zebraをベースに派生しており、より高速な同期、ネイティブプルーニング、スナップショットによるブートストラップ、`zcashd`互換性パス、実験的な高性能P2P機能を追加しています。

Zcash Foundationはこのプロジェクトを公に歓迎し、Zebraは独立チームがフォークして改善できるよう寛容なライセンスの下でリリースされており、複数のZakura貢献者はすでにZebraへアップストリーム貢献していると述べました。

### Private Information Retrieval

Valar Groupは、関連する2つの問題に対応するPIRサービスとライブラリを維持しています。

- nullifierを明かさずに、ノートがスナップショット高で未使用だったことを証明する。
- 同期または投票のためにウォレットが取得しなければならないデータを削減する。

これはShielded Voteの中核的な依存関係であり、より高速でプライベートなウォレットUXの構成要素です。

### IronwoodとNU7のエンジニアリング

Valar Groupは、2026年6月のIronwoodに対する共同コミットメントに参加し、新しいプールに関するコンセンサスルール実装とクライアント作業に貢献しました。また、参加スクリプトや`nu7.valargroup.dev`でホストされる公開ノードを含む、NU7テストネットインフラを運用しました。

### オープンソースのプロトコルライブラリ

`valargroup` GitHub組織は、投票およびノードスタックを公開リポジトリとして公開しています。これには以下が含まれます。

- [`vote-sdk`](https://github.com/valargroup/vote-sdk) — プライベートなオンチェーン投票向けのアプリケーション固有チェーン
- [`zcash_voting`](https://github.com/valargroup/zcash_voting) — クライアント側のシールド投票ライブラリ、証明、ストレージ、FFI
- [`voting-circuits`](https://github.com/valargroup/voting-circuits) — Halo2の委任および投票回路
- [`vote-nullifier-pir`](https://github.com/valargroup/vote-nullifier-pir) — nullifier非所属証明のためのPIR
- [`token-holder-voting-config`](https://github.com/valargroup/token-holder-voting-config) — ウォレットのサービス検出設定
- [`zebra`](https://github.com/valargroup/zebra) — Valar GroupのZebra/Zakura開発フォーク

## チーム

Valar Groupは、**Dev Ojha**（ValarDragon）が率いています。Zakuraに関連する公開チームページには、以下のValar関連エンジニアが記載されています。

- **Dev Ojha** — メンテナー。Valar Groupを率いる。重点分野はトークン保有者投票、ポスト量子技術、Zakura、PIR。
- **Roman Akhtariev** — プリンシパルエンジニア。以前はOsmosisのプリンシパルエンジニア。PIRウォレット同期、トークン保有者投票、Zakura同期性能に取り組む。
- **Evan Forbes** — プリンシパルエンジニア。元Celestiaコンセンサスリード兼創設エンジニア。より高速なブロック時間への対応準備とQUIC P2Pスタックに取り組む。
- **Adam Tucker** — プリンシパルエンジニア。元Osmosisエンジニア。Roman Akhtarievとともにトークン保有者投票、ウォレットの信頼性、スタック全体にわたるIronwood統合に取り組む。

Zakura自体は、Sean Bowe率いるProject Tachyonと共同で保守されています。両組織は密接に協力していますが、別組織です。

## 組織構造

Valar Groupは独立したエンジニアリング組織として運営されています。Zcash Foundation、ZODL、Shielded Labs、Zcash Community Grantsの一部ではありません。

投票チェーン設計において、Valar Groupは5つのコーディネーター組織の一つです。この役割は投票システムのパラメーターであり、Zcashガバナンスを排他的に管理するという主張ではありません。他のチームもバリデーターを運用し、代替の投票チェーンを立ち上げたり、公開ツールを通じて公開された集計を監査したりできます。

法人形態、取締役会構成、内部ガバナンスに関する追加情報は、以前からあるZcash組織ほど詳細には公開されていません。

## 資金調達

2026年半ばの公開フォーラム投稿では、Valar GroupとProject Tachyonは民間寄付によって資金提供を受けていると説明されています。ZODLが開示したベンチャーラウンドやShielded Labsの公開寄付発表とは異なり、Valar Groupは詳細な寄付者リストや助成スケジュールを公開していません。

この資金モデルにより、チームは歴史的なDevelopment Fund／ブロック報酬の経路から独立していますが、一方で予算規模や資金源に関する公開可視性は低くなります。

## Zcashエコシステムにおける役割

Valar Groupは、Zcashの2026年の開発環境において形成された独立プロトコル組織の一つです。この環境では、以下のような役割分担があります。

- **Zcash Foundation**は、コミュニティのスチュワードシップとZebraを継続しています。
- **ZODL**は、ECC分離後のウォレット製品とプロトコル継続に注力しています。
- **Shielded Labs**は、持続可能性、セキュリティ、コンセンサス研究に注力しています。
- **Project Tachyon**は、再帰、形式検証、長期的なスケーラビリティに注力しています。
- **Valar Group**は、プライベートなコイン保有者投票、ノード性能、PIR、およびこれらのシステムを本番環境で運用するために必要なエンジニアリングに注力しています。

その際立った貢献は、シールドされたガバナンスを実運用可能にすることです。NU7投票はこのスタックの最初の大規模な利用例です。保有者はIronwood残高を証明し、ZodlやVizorなどのウォレットはそのフローを統合でき、誰でも特定の保有者がどのように投票したかを知ることなく集計を監査できます。

同じチームのノードおよび同期に関する活動は、この全体像のもう一方を支えることを目的としています。ウォレットが同期できず、ノードが追随できず、アップグレードを迅速に実装できないなら、プライベート投票の有用性は低下します。Valar Groupは、ガバナンス、ノードソフトウェア、ウォレットインフラを一つの問題として扱います。すなわち、運用上の権力を単一組織に集中させることなく、プライベートなZcashを大規模に利用可能にすることです。

## リソース

- [Valar Groupウェブサイト](https://valargroup.dev/)
- [Valar Group GitHub](https://github.com/valargroup)
- [Shielded Voteドキュメント](https://valargroup.gitbook.io/shielded-vote-docs)
- [投票チェーンのセットアップ](https://setup.valargroup.org)
- [集計監査ツール](https://tally.valargroup.org)
- [コーディネーターUI](https://svote.valargroup.org/)
- [Zakura](https://zakura.com/)
- [Zakuraについて / チーム](https://zakura.com/about/)
- [NU7コイン保有者投票フォーラムスレッド](https://forum.zcashcommunity.com/t/nu7-token-holder-vote/56912)
- [Coinholder Voting Chainフォーラムスレッド](https://forum.zcashcommunity.com/t/the-coinholder-voting-chain/56925)
