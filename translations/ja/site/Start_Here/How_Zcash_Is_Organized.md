# Zcashの組織構造

## 要約

- Zcashは1社によって構築されているのではなく、それぞれ異なる業務を担う多くの独立組織によって構築されています
- その歴史の大部分において、Electric Coin CompanyとZcash Foundationという2つの組織が開発を主導してきました
- 2026年1月、ガバナンスを巡る対立を受けてElectric Coin Companyのチーム全員が辞任し、エコシステムは複数の独立チームへと再編されました
- 現在、プロトコル、ノードソフトウェア、ウォレット、研究、スケーリング、資金調達は、それぞれ別のグループが担っています
- 単一の組織がZcashを管理しているわけではありません。ネットワークはオープンソースかつパーミッションレスであり、あらゆる変化の間も通常どおり稼働し続けました

<br/>

## このページの対象者

- 実際に誰がZcashを構築・保守しているのかを理解したい初心者
- エコシステム内の多数の組織名に混乱している方
- 誰と協業するか、またはどこに提案を送るかを検討しているコントリビューター

<br/>

## これが重要な理由

組織構造を理解すると、他のすべてを理解しやすくなります。依存しているコードを誰が保守しているのか、助成金を誰に申請すべきか、ネットワークのどの部分を誰が担っているのかが分かります。また、Zcashの静かな強みの1つも明らかになります。業務が独立したグループに分散しているため、単一障害点によってプロジェクトが支配されたり停止したりすることはありません。

このページは地図です。このウィキですでに詳細なページがある各組織については、そこに書かれている内容を繰り返すのではなく、短い説明と詳細へのリンクを掲載しています。

<br/>

## 以前の仕組み

Zcashの歴史の大部分では、2つの組織が主導していました。

Electric Coin Companyは2016年にZcashを立ち上げ、コア開発チームの多くを雇用していました。同組織は、Zcashを支援するために設立された非営利団体の理事会であるBootstrapによって監督されていました。Zcash Foundationは独立した非営利団体としてこれと並行して活動し、プロトコルの管理と独立したノードの構築に注力していました。両組織は主に、開発のために確保されたブロック報酬の一部から資金提供を受けていました。

この2本柱の構造は何年も続きましたが、共通の資金源と、2つの組織が足並みをそろえ続けることに依存していました。当初の開発資金が変化し、その長期的な将来が不確実になるにつれ、継続的な業務への支払い方法という問題がより切迫していきました。この資金調達の問題は、その後に起きた多くの変化の背景にあり、一部のチームが外部資本を調達する一方で、他のチームが助成金に依存している理由の一部でもあります。

<br/>

## 2026年の再編

2026年1月、組織構造は大きく変化しました。1月7日、Electric Coin Companyの最高経営責任者であるJosh Swihartは、会社チーム全員が辞任したとXで発表しました。

Bootstrapは、完全子会社となっていたElectric Coin Companyを統治するために2020年に設立された非営利団体でした。会社チームとこの理事会の対立は時間をかけて深まり、組織の方向性、開発の資金調達方法、そしてチームが外部資本を調達するために非公開企業へ移管したいと考えていたZashiウォレット（wallet）の将来など、複数の問題に及びました。Swihartはこの離脱を「建設的解雇」と表現しました。これは、状況があまりに深刻に変更され、辞任が事実上強いられたことを意味する法律用語です。また、理事会の過半数がZcashの使命から外れたと述べました。

公平を期すため、もう一方の説明も重要です。Bootstrapは、この対立をガバナンスと非営利団体に関する法令遵守の問題として位置づけました。Zcashの創設者であるZooko Wilcoxは、対立で名前が挙がった理事会メンバーを公に擁護し、長年にわたり彼らと協働してきたこと、そして高い誠実さを持つ人々と見なしていることを述べる一方で、対立そのものについてはどちらの側にも立っていないことを明確にしました。

争いのなかった点は2つあります。いずれの当事者も犯罪行為を主張しておらず、これは法的事件ではなく、企業およびガバナンス上の対立でした。そしてZcashネットワーク自体は影響を受けず、終始オープンソース、パーミッションレス、安全かつ完全に稼働可能な状態を維持しました。この点はSwihartとWilcoxの両者が利用者に対して強調しています。

その後に起きたのは崩壊ではなく再編でした。旧会社チームは2026年後半にZODLを設立し、別途、元Bootstrap理事会メンバー3名がSovrightを設立しました。開発は複数の独立チームにまたがる、より分散型の形へと落ち着きました。

ここで説明した声明は、Josh Swihart（@jswihart）とZooko Wilcox（@zooko）が2026年1月7日にXで公開したものであり、元の投稿を全文で読むことができます。

<br/>

## 現在Zcashを構築している組織

現在の業務は、明確な役割を担う独立組織に分散しています。

### 2026年の分裂から生まれた2組織

1. ZODL（Zcash Open Development Lab）は、元Electric Coin Companyチームによって設立され、Josh Swihartが率いています。外部投資家から2,500万ドル以上を調達しており、Zcashの最新のシールドされたトランザクションを支えるHalo 2プルーフ（proof）システムを含むコアプロトコル開発と、以前はZashiと呼ばれていた、デフォルトでシールドされたモバイルウォレットであるZODLウォレットに取り組んでいます。[ZODL](https://zechub.wiki/zcash-organizations/zodl)をご覧ください。
2. Sovrightは、元Bootstrap理事会メンバー3名によって設立された非営利団体です。エコシステム向けのツール（tools）と支援に注力しており、古く保守されていないウォレットに取り残された資金を初期利用者が回収できるようにするツール、Argosを構築しました。[Sovright](https://zechub.wiki/zcash-organizations/sovright)をご覧ください。

### プロトコル管理、研究、ノードソフトウェア

3. Zcash Foundationは、旧来のzcashdクライアントの廃止に伴ってネットワークの主要ノードとなる、RustノードであるZebraを保守しています。また、ZcashのGitHub組織、z.cashウェブサイト、およびX上の主要なZcashアカウントを管理し、これらの資産の一部の管理を支援するためにZecHubと提携しています。[Zcash Foundation](https://zechub.wiki/zcash-organizations/zcash-foundation)をご覧ください。
4. Shielded Labsは、スイスに拠点を置く、寄付で資金提供される独立非営利団体です。将来の開発に資金を提供するネットワーク持続可能性メカニズム、Zcashにプルーフ・オブ・ステークのファイナリティを追加するCrosslinkの業務、そして2026年にOrchardプールの脆弱性を発見したセキュリティ監査への資金提供を含む、研究と長期的な持続可能性に注力しています。[Shielded Labs](https://zechub.wiki/zcash-organizations/shielded-labs)をご覧ください。
5. Electric Coin Companyは、2016年にZcashを創設・立ち上げた組織として、引き続き歴史の一部を成しています。[Electric Coin Company](https://zechub.wiki/zcash-organizations/electric-coin-company)をご覧ください。

### スケーリングと暗号技術

6. Project Tachyonは、暗号学者のSean Boweが主導するスケーリングの取り組みです。これは、ウォレットがブロックチェーンと同期するための「オブリビアス同期」と呼ばれる新しい方法を提案しており、トランザクションを縮小するとともに、副次的効果としてZcashをポスト量子プライバシーへと近づけます。その業務は[tachyon.z.cash](https://tachyon.z.cash/)に記録されています。
7. Valar Groupは、大規模なプライベートかつポスト量子のデジタルキャッシュのためのZcashプロトコルに取り組む暗号技術の研究・エンジニアリングラボです。スケーリングと量子関連の業務について、Project Tachyonと緊密に協力しています。詳細は[valargroup.dev](https://valargroup.dev/)でご覧いただけます。

### 地域およびコミュニティ組織

8. Obscura Labsはナイジェリアで登録された独立組織であり、アフリカと新興市場に焦点を当て、インフラと普及経路を構築しています。[Obscura Labs](https://zechub.wiki/zcash-organizations/obscura-labs)をご覧ください。

### 教育

9. ZecHubは、Zcashのための分散型教育ハブです。コミュニティメンバーが協力して、チュートリアル、ウィキ文書、ポッドキャスト、週刊ニュースレター（newsletter）を通じ、エコシステムの理解と参加方法の学習を支援するコンテンツを作成、検証、促進しています。現在お読みのウィキはZecHubの一部であり、Zcash Foundationは一部のコミュニティリソースの管理を支援するためにこれと提携しています。

### 資金調達

10. Zcash Community Grantsは、ブロック報酬の一部から独立コントリビューターとコミュニティプロジェクトに資金を提供し、コア組織を超えた多くのチームへ業務を分散しています。[Zcash Community Grants](https://zechub.wiki/zcash-organizations/zcash-community-grants)をご覧ください。
11. Financial Privacy Foundationは、Zcashエコシステムとコミュニティプロジェクトを支援しています。[Financial Privacy Foundation](https://zechub.wiki/zcash-organizations/financial-privacy-foundation)をご覧ください。

これらすべての組織はオープンソースのリポジトリを維持しているため、その業務は誰でも読んで確認し、基盤として利用できます。そして、組織だけがすべてではありません。多くの重要な貢献は、コア組織だけではなく、個人や助成金によって資金提供された契約企業からもたらされています。これらと並んで、ウォレットチーム、地域コミュニティ、独立したデベロッパー（developer）、そしてプロトコルを構築せずにZECを保有・支援する投資家も存在します。上記の一覧は基盤であり、全体像ではありません。

<br/>

## 初心者はどこから始めるべきか

どの組織が重要かは、何をしたいかによって異なります。

1. Zcashを使うにはウォレットが必要です。そのため、ZODLとそのウォレットが自然な出発点になります。
2. ノードを運用したい、またはネットワークソフトウェアを理解したい場合は、Zcash FoundationとそのZebraノードを参照してください。
3. プロジェクトに資金提供する、または有償の業務に貢献するには、Zcash Community Grantsを参照してください。
4. 研究とプロトコルの将来を追うには、Shielded Labs、Project Tachyon、Valar Groupを追ってください。

<br/>

## さらに学ぶ

このウィキは理解を深めるために存在しているため、次にすべきことは読み進めることです。初心者向けの、いくつかの良い関連トピックを紹介します。

- ネットワークとコインの基本については、[ZECとは何か、そしてZcash](https://zechub.wiki/start-here/what-is-zec-and-zcash)
- Zcashの利用を初めて体験するための、[新規ユーザーガイド](https://zechub.wiki/start-here/new-user-guide)
- Zcashがトランザクションのプライバシーを守る仕組みについては、[シールドされたプール](https://zechub.wiki/using-zcash/shielded-pools)
- コイン供給が検証可能な状態を維持する仕組みについては、[ターンスタイル](https://zechub.wiki/zcash-tech/the-turnstile)
- ネットワークが移行中のシールドされたプールについては、[Ironwood](https://zechub.wiki/zcash-tech/ironwood)
- Zcashが時間とともに変化する仕組みについては、[ネットワークアップグレード](https://zechub.wiki/start-here/network-upgrades)
- プライバシーの背後にある暗号技術については、[zk-SNARKs](https://zechub.wiki/zcash-tech/zk-snarks)

各ページはさらに多くのページへリンクしているため、好きなだけ深く読み進められます。

<br/>

## よくある誤解

- Zcashは単一の企業によって所有・管理されておらず、1つの組織だけでネットワークを変更または停止することはできません
- 2026年の対立はネットワーク、資金、プライバシーに影響を与えませんでした。これは組織上の意見の相違であり、プロトコルは終始正常に稼働しました
- Electric Coin Companyを離れたチームによってZcashが終わったわけではなく、業務は新たな独立組織へ移行しました
- 多数の組織があることは弱点ではなく強みであり、単一障害点を排除してプロジェクトの回復力を維持します
- ZECを保有または推進することは、Zcashを構築することと同じではありません。投資家と支持者はコミュニティの一部ですが、プロトコルを開発するチームとは区別されます

<br/>

## 関連ページ

- [ZODL](https://zechub.wiki/zcash-organizations/zodl) - 元Electric Coin Companyチームによって設立された開発ラボ
- [Sovright](https://zechub.wiki/zcash-organizations/sovright) - 元Bootstrap理事会メンバーによって設立された非営利団体
- [Zcash Foundation](https://zechub.wiki/zcash-organizations/zcash-foundation) - プロトコルおよびZebraノードの管理者
- [Shielded Labs](https://zechub.wiki/zcash-organizations/shielded-labs) - 研究およびプロトコルの持続可能性
- [Electric Coin Company](https://zechub.wiki/zcash-organizations/electric-coin-company) - 2016年にZcashを立ち上げた企業
- [Obscura Labs](https://zechub.wiki/zcash-organizations/obscura-labs) - アフリカおよび新興市場全体でのインフラと普及
- [Zcash Community Grants](https://zechub.wiki/zcash-organizations/zcash-community-grants) - 独立コントリビューターへの資金提供
