<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Organizations/Valar_Group.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Valar Group

[ウェブサイトを見る](https://valargroup.dev/)

<img width="200" height="200" alt="254678133" src="/content-images/0dc8c697-bcad-492a-b024-89b502d27af4-4c0d4552c2.webp" />


## ミッションステートメント

Valar Groupは、Zcashのスケーリング（scaling）、コイン保有者ガバナンス（governance）の強化、ならびにプロトコルのプライバシー（privacy）、パフォーマンス、長期的な回復力の向上に注力する独立したエンジニアリング組織です。

その活動はプロトコルレベルのインフラストラクチャに集中しており、プライベートなトークン保有者投票、高性能フルノード（full node）ソフトウェア、ウォレット（wallet）同期技術、そしてシールドされた（shielded）Zcashをより大規模に使いやすくするネットワークアップグレード（network upgrade）を扱います。

この組織は、ZEC保有者がプライベートに意思を表明できる手段を提供し、ノード（node）運営者にはより高速で高機能なソフトウェアを提供し、ウォレットにはネットワーク参加のコストを抑えながらユーザーのプライバシーを保護するツール（tools）を提供することを目指しています。

## 背景

Valar Groupは、Osmosisの共同創設者であり、Cosmosを立ち上げたチームの一員でもあるDev Ojha（ValarDragon）が率いています。過去10年間、彼はzk-SNARKs、BFTコンセンサス（consensus）、本番環境のDeFiシステムにわたって活動してきました。

Zcashにおけるこのグループの公開活動は、2026年のコア開発再編後、エコシステムが独立したプロトコルチームへ移行する中で注目を集めました。Valar Groupは、Project Tachyon、Shielded Labs、ZODL、およびZcash Foundationとともに、次世代のZcashインフラストラクチャを構築する組織の1つとして台頭しました。

活動に繰り返し見られるテーマは、Zcashのプライバシー特性が支払い（payment）を超えて拡張されるべきだということです。保有者が発行量、ブロック（block）時間、またはネットワークアップグレードの範囲について投票を求められる場合、身元、残高、または個別の投票を明かすことなく、シールドされた残高から投票できるべきです。この要件を受け、Valar Groupは専用のコイン保有者投票チェーン（chain）を設計・提供しました。

同じスケーリングと暗号技術の背景は、ノードと同期に関する活動にも影響を与えました。より高速なブロック、軽量なウォレット同期、より高機能なフルノードは、価値保存手段としてだけでなく、支払いネットワーク規模で利用できるプライベートマネーの前提条件として扱われています。

## ビジョン

Valar Groupの公開資料とプロジェクト活動は、次のことが可能なZcashネットワークを示しています。

- 繰り返し利用可能なガバナンスプロセスとして、プライベートかつ監査可能なコイン保有者投票を支援すること。
- シールドされたプライバシーを損なうことなく、プルーフ・オブ・ワークの支払いをスケーリングすること。
- PIR、プルーニング、より高速なブロック伝播により、ウォレットとノードのボトルネックを削減すること。
- 独立したフルノードスタックを提供して、実装の多様性を高めること。
- ポスト量子対応と、正式なレビューを受けたプロトコルアップグレードに貢献すること。

この組織は、プロトコル所有者ではなく独立した貢献者として活動しています。プロトコル変更は引き続きZIP、実装、レビュー、コミュニティシグナリングを経て進められます。Valar Groupの役割は、これらのプロセスを実用的にするシステムを設計、実装、運用し、オープンソース化することです。

## 戦略分野

Valar Groupの活動は4つの分野に集約されます。

### プライベートなコイン保有者ガバナンス

Zcashは、自動的なオンチェーン（on-chain）プロトコル制御を採用していません。コイン保有者投票は、より広範なラフコンセンサスプロセスに反映される助言的なシグナルです。Valar Groupは、投票者の身元や個別の投票規模を公開せずに、シールドされた残高からこれらのシグナルを収集できるよう、Tokenholder Voting Chainを構築しました。

現在の設計には、次のものが含まれます。

- 投票ラウンドをオーケストレーションする専用のCosmos SDKアプリケーションチェーン。
- 使用可能なIronwoodノート（note）に対するスナップショットproof。
- 投票額の準同型暗号化（encryption）。
- ヌリファイア（nullifier）の非所属proofのためのプライベート情報検索。
- コーディネーターマルチシグと分散型選挙機関。

目標は、従来のトークン保有者投票プロセスを、他組織が運用し独自に集計できる、再利用可能で監査済みかつウォレット統合可能なシステムに置き換えることです。

### ノードソフトウェアとネットワークスケーリング

Valar GroupはProject Tachyonと協力し、Zebraコードベースから構築されたZakura、すなわちZcashフルノードを開発しています。Zakuraは、より高速な初期同期、プルーニング、スナップショットによるブートストラップ、および旧`zcashd`ユーザー向けの互換性パスを必要とする運営者向けの高性能ノードとして位置付けられています。

関連するスケーリング活動には、次のものが含まれます。

- NU7テストネットにおける25秒ブロックの実験を含む、より高速な目標ブロック時間。
- 改善されたピアツーピアのブロック伝播。
- シールドされた活動の増加に伴ってもZcashを利用可能に保つためのフルノード機能。

### ウォレットと同期インフラストラクチャ

シールドされたウォレットは歴史的に、大量のチェーンデータをスキャンする必要があります。Valar Groupは、ウォレットが完全なヌリファイア集合をダウンロードしたり、関心のあるノートを明らかにしたりせずに必要なproofを取得できるPIRシステムを開発しています。

この活動は投票スタックと、より広範なウォレット同期研究の両方に見られます。このグループはまた、ZODLのモバイルスタックで使用される、マルチサーバートランザクション送信やサーバー選択の改善を含む、ウォレット側の信頼性向上にも貢献しています。

### プロトコルアップグレードとエコシステム協調

Valar Groupは、Orchard回路の脆弱性を受けたIronwood対応に公にコミットした組織の1つです。Ironwoodは新しいシールドされたプール（pool）を導入し、元のOrchardプールをターンスタイル（turnstile）の背後に封印し、流通供給量を独立して検証する道筋を復元しました。Valar GroupはProject Tachyon、Shielded Labs、ZODL、およびZcash Foundationとともに、アーキテクチャ、コンセンサスルール実装、エコシステム協調に取り組みました。

このグループは、NU7の範囲設定、テストネット運用、ZIP編集にも参加しています。Dev OjhaはZIP編集者として記載されています。

## 現在の取り組み

### Tokenholder Voting Chain / Shielded Vote

Shielded Voteは、Zcash向けのValar Groupによるプライベートガバナンスプロトコルです。保有者は個別の金額を公開したり、投票を身元に紐付けたりせず、シールドされた残高で投票します。

主な特性は次のとおりです。

- 複数日にわたるコミット／リビールプロセスではなく、投票のための1回のオンラインセッション。
- 資金を危険にさらすことなく投票権をホットキーへ委任する、Keystone互換のスナップショット署名（signature）。
- 準同型ElGamalを使用した暗号化された投票額。
- スナップショットproof中にヌリファイアが漏洩しないようにするPIRクエリ。
- 時間的相関を低減する投票分割と遅延リレー送信。
- 公開監査可能な集計。

2026年8月、Valar GroupとProject Tachyonは、このスタックをNU7コイン保有者投票に使用しました。参加資格には、メインネットの高さ3,459,350においてIronwood内で使用可能なシールドされたZECが必要でした。投票は2026年8月25日から9月14日まで行われ、結果を代表的なものとして扱うには1,000,000 ZECの参加しきい値が必要でした。質問は、NSM発行の平滑化、再発行のタイミング、Sprout/v4の廃止、25秒ブロック時間、およびNU7の範囲／準備状況を対象としました。

デフォルトチェーンの協調では、Project Tachyon、Valar Group、Zcash Foundation、ZODL、Shielded Labsによる5者中2者のマルチシグを使用します。別のバリデータセットが、ラウンドごとの復号鍵シェアを保持します。単一のバリデータが個別投票を復元することはできず、最終集計を作成するにはバリデータのしきい値が必要です。

公開されている運営者・監査者向けの情報源には、次のものがあります。

- [投票チェーンのセットアップ](https://setup.valargroup.org)
- [集計監査ツール](https://tally.valargroup.org)
- [コーディネーターUI](https://svote.valargroup.org/)
- [PIRサーバーのセットアップ](https://setup-pir.valargroup.org)
- [Shielded Voteドキュメント](https://valargroup.gitbook.io/shielded-vote-docs)

### Zakura

Zakuraは、Valar GroupとProject Tachyonの協力により開発されたZcashフルノードです。Zebraから派生しており、より高速な同期、ネイティブプルーニング、スナップショットによるブートストラップ、`zcashd`互換性パス、実験的な高性能P2P機能を追加しています。

Zcash Foundationはこのプロジェクトを公に歓迎し、Zebraは独立チームがフォークして改善できるよう寛容なライセンスで公開されており、複数のZakura貢献者がすでにZebraへアップストリーム貢献していると述べました。

### プライベート情報検索

Valar Groupは、関連する2つの問題に対するPIRサービスとライブラリを維持しています。

- ヌリファイアを明かさずに、ノートがスナップショットの高さで未使用であったことを証明すること。
- 同期または投票のためにウォレットが取得しなければならないデータを減らすこと。

これはShielded Voteの中核的な依存関係であり、より高速でプライベートなウォレットUXの構成要素です。

### IronwoodとNU7のエンジニアリング

Valar Groupは、2026年6月のIronwoodに対する共同コミットメントに参加し、新しいプールをめぐるコンセンサスルール実装とクライアント作業に貢献しました。また、参加スクリプトや`nu7.valargroup.dev`でホストされる公開ノードを含む、NU7テストネットインフラストラクチャも運用しました。

### オープンソースのプロトコルライブラリ

`valargroup`のGitHub組織は、投票およびノードスタックを公開リポジトリとして提供しています。これには次のものが含まれます。

- [`vote-sdk`](https://github.com/valargroup/vote-sdk) — プライベートなオンチェーン投票向けのアプリケーション固有チェーン
- [`zcash_voting`](https://github.com/valargroup/zcash_voting) — クライアント側のシールドされた投票ライブラリ、proof、ストレージ、FFI
- [`voting-circuits`](https://github.com/valargroup/voting-circuits) — Halo2の委任および投票回路
- [`vote-nullifier-pir`](https://github.com/valargroup/vote-nullifier-pir) — ヌリファイア非所属proof用のPIR
- [`token-holder-voting-config`](https://github.com/valargroup/token-holder-voting-config) — ウォレットのサービスディスカバリー設定
- [`zebra`](https://github.com/valargroup/zebra) — Valar GroupのZebra/Zakura開発フォーク

## チーム

Valar Groupは**Dev Ojha**（ValarDragon）が率いています。Zakuraに関連する公開チームページには、以下のValar関連エンジニアが記載されています。

- **Dev Ojha** — メンテナー。Valar Groupを率いています。重点分野には、トークン保有者投票、ポスト量子研究、Zakura、PIRが含まれます。
- **Roman Akhtariev** — プリンシパルエンジニア。以前はOsmosisのプリンシパルエンジニアであり、PIRウォレット同期、トークン保有者投票、Zakura同期パフォーマンスを担当しています。
- **Evan Forbes** — プリンシパルエンジニア。元Celestiaコンセンサスリード兼創設エンジニアであり、より高速なブロック時間への対応とQUIC P2Pスタックを担当しています。
- **Adam Tucker** — プリンシパルエンジニア。元Osmosisエンジニアであり、Roman Akhtarievとのトークン保有者投票、ウォレットの信頼性、スタック全体でのIronwood統合を担当しています。

Zakura自体は、Sean Boweが率いるProject Tachyonと共同で維持されています。両組織は緊密に協力していますが、別個の組織です。

## 組織構造

Valar Groupは独立したエンジニアリング組織として運営されています。Zcash Foundation、ZODL、Shielded Labs、Zcash Community Grantsの一部ではありません。

投票チェーンの設計において、Valar Groupは5つのコーディネーター組織の1つです。この役割は投票システムのパラメーターであり、Zcashガバナンスに対する排他的支配の主張ではありません。他のチームも、バリデータの運用、代替投票チェーンの立ち上げ、公開ツールから公開された集計の監査を行えます。

法人種別、取締役会構成、内部ガバナンスに関する追加情報は、以前からあるZcash組織と同程度の詳細では公開されていません。

## 資金調達

2026年半ばの公開フォーラム声明では、Valar GroupとProject Tachyonは民間寄付によって資金提供されていると説明されています。ZODLが開示したベンチャーラウンドやShielded Labsの公開寄付発表とは異なり、Valar Groupは詳細な寄付者一覧または助成金（grant）スケジュールを公開していません。

この資金調達モデルにより、チームは歴史的なDevelopment Fund／ブロック報酬経路から独立していますが、予算規模と資金源についての公開可視性は低くなります。

## Zcashエコシステムにおける役割

Valar Groupは、Zcashの2026年の開発環境を中心に形成された独立プロトコル組織の1つです。この環境では、次のようになっています。

- **Zcash Foundation**は、引き続きコミュニティスチュワードシップとZebraを担っています。
- **ZODL**は、ECC分離後のウォレット製品とプロトコル継続に注力しています。
- **Shielded Labs**は、持続可能性、セキュリティ、コンセンサス研究に注力しています。
- **Project Tachyon**は、再帰、形式検証、長期的なスケーラビリティに注力しています。
- **Valar Group**は、プライベートなコイン保有者投票、ノードパフォーマンス、PIR、およびこれらのシステムを本番環境で運用するために必要なエンジニアリングに注力しています。

その際立った貢献は、シールドされたガバナンスを実運用可能にしたことです。NU7投票はこのスタックの最初の主要な利用例です。保有者はIronwood残高を証明し、ZODLやVizorなどのウォレットはこのフローを統合でき、誰でも特定の保有者がどのように投票したかを知ることなく集計を監査できます。

同チームのノードおよび同期に関する活動は、この構図のもう半分を支えることを目的としています。ウォレットが同期できず、ノードが追随できず、またはアップグレードを迅速に実装できなければ、プライベート投票の有用性は低くなります。Valar Groupは、ガバナンス、ノードソフトウェア、ウォレットインフラストラクチャを1つの問題として扱います。すなわち、運用上の権限を単一組織に集中させることなく、プライベートなZcashを大規模に利用可能にすることです。

## リソース

- [Valar Groupウェブサイト](https://valargroup.dev/)
- [Valar Group GitHub](https://github.com/valargroup)
- [Shielded Voteドキュメント](https://valargroup.gitbook.io/shielded-vote-docs)
- [投票チェーンのセットアップ](https://setup.valargroup.org)
- [集計監査ツール](https://tally.valargroup.org)
- [コーディネーターUI](https://svote.valargroup.org/)
- [Zakura](https://zakura.com/)
- [Zakuraについて／チーム](https://zakura.com/about/)
- [NU7コイン保有者投票フォーラムスレッド](https://forum.zcashcommunity.com/t/nu7-token-holder-vote/56912)
- [Coinholder Voting Chainフォーラムスレッド](https://forum.zcashcommunity.com/t/the-coinholder-voting-chain/56925)
