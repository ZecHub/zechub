# Zcash의 선택적 공개는 어디까지 왔으며, 무엇이 남았는가

*이 글은 ZK, FHE, MPC, TEE 및 탈중앙화 신원을 다루는 프라이버시 보존 컴퓨팅 독립 간행물인 [Proof Street](https://www.proofstreet.xyz/)에서 미러링되었습니다. 원문은 2026년 9월 7일 ["Zcash의 선택적 공개는 어디까지 왔으며, 무엇이 남았는가"](https://www.proofstreet.xyz/how-far-zcash-has-come-on-selective-disclosure-and-whats-left/)라는 제목으로 처음 게시되었습니다. 저자의 허가를 받아 [Zcash Community Grant #339](https://forum.zcashcommunity.com/t/grant-application-zcash-in-the-privacy-stack-339/56456)의 일환으로 미러링되었습니다. 글쓴이: Stephen Webber.*

---

*Zcash에서 viewing key를 사용하면 계정 보유자가 선택한 당사자에게 shielded 거래 내역을 공개할 수 있습니다. 키는 현재 사용 가능하며 사용자가 제어합니다. 개발자와 정책 옹호자들은 여전히 이를 활용할 수 있는 컴플라이언스 워크플로에 맞게 만드는 작업을 진행하고 있습니다.*

---

8월 17일 Zcash Community Grants 위원회는 Shielded Compliance Bridge라는 제안을 검토하기 위해 회의를 열었습니다. Ethereum의 execution-specs 저장소를 비롯한 작업에 기여한 오픈 소스 기여자 Deborah Olaboye는 unified full viewing key를 수집하고, testnet 인덱서에 대해 compact block을 스캔하며, shielded 전송을 오프체인 Travel Rule 기록에 연결하는 Zcash 메모 필드에 "compliance reference"를 담는 개념 증명을 구축했습니다. 그녀는 이를 완성하기 위한 그랜트를 요청했지만, 위원회는 거절했습니다.

[이유](https://forum.zcashcommunity.com/t/zcash-community-grants-meeting-minutes-8-17-2026/57119)는 컴플라이언스 통합이 이를 사용할 특정 거래소나 기관에 의해 형성되고, 구축 기준으로 삼을 공통 표준이 없으며, 도구를 요청하는 파트너가 없다면 도입될 가능성이 낮다는 것이었습니다. 같은 회의에서는 비슷한 이유로 "programmable selective disclosure" 가상 머신과 미국의 법적 쟁점 지도를 포함한 프라이버시 및 신뢰 아키텍처 프레임워크 제안도 거절되었습니다.

물론 이러한 결정이 이를 원하는 사람이 없다는 신호는 아닙니다. 올해의 나머지 흐름과 함께 보면 정반대입니다. Binance는 2024년에 프로토콜 수준의 요청을 했고 그해 안에 ZIP를 확보했습니다. Gemini는 2020년부터 규제 감독 아래 shielded 출금을 운영해 왔습니다. 생태계는 6월에 워싱턴 정책 조직을, 8월에는 기관 통합 조직을 세웠습니다. 위원회의 말은 사실상, 아직 누구나 구현할 수 있는 요구사항으로 필요가 문서화되지 않았다는 것이었습니다.

## 시스템 작동 방식

shielded Zcash 주소는 spending key로 제어됩니다. 여기서 파생되는 viewing key는 자금을 이동할 수는 없지만 거래 데이터를 읽을 수 있습니다. full viewing key는 계정의 입금 및 출금 거래를 모두 볼 수 있고, incoming viewing key는 수령한 자금만 볼 수 있으며, outgoing viewing key는 송금자가 자신이 보낸 내용을 재구성할 수 있게 합니다. [ZIP 316](https://zips.z.cash/zip-0316)부터 이들은 unified viewing key, 즉 full key 하나와 incoming key 하나로 묶이며, 계정에 한정됩니다. 계정은 [ZIP 32](https://zips.z.cash/zip-0032) 아래 지갑 키 트리에서의 위치입니다. unified full viewing key는 계정이 사용하는 모든 shielded 풀의 풀별 구성 요소를 묶고, 계정의 transparent extended public key도 포함하므로, 하나를 공유하면 shielded 내역뿐 아니라 transparent 체인도 노출됩니다.

이런 의미에서 viewing key는 소급적입니다. 계정이 생성된 순간부터 계정의 전체 내역을 복호화하며, 새 계정으로 자금을 옮기는 것 외에는 한 번 공유한 뒤 철회할 수 없습니다. 거래별 viewing key나 시간 제한 viewing key는 없습니다. 올해 프로토콜의 이전 ECC 엔지니어링 팀이 설립한 회사인 ZODL의 최고경영자 Josh Swihart는 이를 확인하면서, 거래별 결제 공개는 "어디에도 구현되어 있지 않다"고 말했습니다.

원래 참조 노드인 zcashd는 송금자가 제3자에게 단일 결제를 증명할 수 있도록 하는 두 RPC 메서드 `z_getpaymentdisclosure` 및 `z_validatepaymentdisclosure`를 제공했습니다. [RPC 문서](https://zcash.github.io/rpc/z_getpaymentdisclosure.html)는 이들이 실험적 기능이며 운영자가 experimental-features 플래그를 설정하지 않는 한 비활성화되고, "작업 진행 중인 Payment Disclosure ZIP"를 구현한다고 명시합니다. 해당 ZIP, [303](https://zips.z.cash/zip-0303)은 이제 철회됨으로 표시되었고, 후속 문서인 [ZIP 311](https://zips.z.cash/zip-0311)은 구현 없이 초안 상태로 남아 있습니다. 이 메서드는 원래 2016년 shielded 풀인 Sprout 풀만 다뤘고, 모든 현대 shielded 거래를 처리하는 풀인 Sapling 또는 Orchard으로는 확장되지 않았습니다. zcashd 자체도 Ironwood 업그레이드에 앞서 계획된 중단으로 2026년 7월 18일 [수명 종료에 도달했습니다](https://zcash.github.io/zcash/user/end-of-life.html). Zebra의 합의 노드인 Zcash Foundation도, 후속 지갑인 Zallet도 [공개 메서드를 나열하지 않습니다](https://github.com/zcash/zallet/releases). 중요한 풀에 대해서 거래별 공개는 여전히 설계 의도에 머물러 있습니다.

그 의도는 여전히 유효하지만, 7월에 보였던 것보다 더 먼 미래에 있습니다. 메모 번들인 [ZIP 231](https://zips.z.cash/zip-0231)은 이를 위한 공간을 마련할 초안입니다. Swihart는 메모 번들이 결제 증명으로 기능할 수 있는 인증된 reply-to의 궁극적 기반이 될 것이라고 설명했으며, 이에 의존하는 초안인 [authenticated reply addresses](https://zips.z.cash/draft-ecc-authenticated-reply-addrs)에는 현재 메모 필드에 담기에는 너무 큰 증명이 필요합니다. 메모 번들은 거래 형식 변경이며, [NU7 코인 보유자 투표](https://forum.zcashcommunity.com/t/nu7-coinholder-vote/56912)를 조율하는 다섯 조직은 8월에 형식 변경이 NU7의 범위 밖이고 그 다음 업그레이드의 범위 안이라는 데 합의했습니다. 8월 25일부터 9월 14일까지 진행되는 투표 자체에서는 발행량, 수수료 정책, 블록 간격, Sprout 폐지를 보유자에게 맡겼으며, 공개는 투표 항목에 없었습니다. 이전 경로인 ZIP 311은 합의 변경이 필요 없지만, 구현도 Orchard 적용 범위도 없는 초안으로 남아 있습니다.

따라서 오늘 제공되는 것은 계정 범위의 viewing key입니다. full 또는 incoming 전용이고, 소급적이며, 철회할 수 없고, 계정 보유자의 주도로 공유됩니다. 거래 수준의 공개는 로드맵에 있습니다.

## 공개 이해하기

Zcash에서든 어디에서든 공개 메커니즘은 다음 기준으로 파악할 수 있습니다. 무엇을 공개하는가(범위). 누구에게 공개하는가(수혜자). 공개가 언제 효력을 발휘하고 얼마나 과거까지 미치는가(시점). 철회할 수 있는가(철회 가능성). 그리고 데이터 주체와 권한 기관 중 누가 시작하는가(개시).

컴플라이언스 체계는 이러한 요소에 대한 요구사항이고, 아키텍처는 이에 대한 입장입니다. Zcash의 viewing key는 설계상 넓은 범위, 보유자가 선택한 수혜자, 완전한 소급성, 철회 불가, 사용자 주도라는 특성을 갖습니다. 반면 거래소와 감독기관이 적용하는 요구사항은 관계 또는 기간으로 범위가 제한되고, 지정된 기관이나 그 분석 공급업체에 부여되며, 온보딩부터 지속되고, 관계 종료 시 철회 가능하며, 서비스 조건으로 기관이 시작하는 경향이 있습니다.

이 둘 모두 선택적 공개라고 불립니다. 자격 증명 세계에서 선택적 공개란 서명된 자격 증명의 속성 중 일부만 제시하고 나머지는 공개하지 않는 것을 뜻하며, [SD-JWT](https://datatracker.ietf.org/doc/rfc9901/), ISO mdoc, BBS+ 서명은 이를 위해 만들어졌습니다. 공개 단위는 속성이고, 시점은 제시 시점이며, 보유자가 상호작용마다 결정합니다.

shielded 결제 세계에서 이 표현은 선택한 당사자에게 거래 데이터를 공개하는 것을 뜻하며, 그 단위는 계정의 내역이고 시점은 키를 넘겨줄 때입니다.

## 요구사항 측에서 요청한 것

Swihart는 엔지니어링 팀이 받은 유일한 프로토콜 수준의 컴플라이언스 요청은 2024년 1월 Binance가 예치금에 대해 transparent 출처 보장을 요구한 것이었다고 말했습니다. 팀의 대응은 transparent-source-only 주소인 [ZIP 320](https://zips.z.cash/zip-0320)이었고, ZIP 문구에는 실제로 출처가 "as required by Binance"라고 기록되어 있습니다. TEX 주소는 거래소가 transparent 출처로부터 자금을 수령한다는 것을 보장하는 일시적 transparent 통과 경로입니다. 송금자의 내역을 제공하지 않으면서 거래소에 반환 경로를 제공합니다. 프로토콜이 거래소에 제공한 유일한 조정은 거래소가 요청한 내용만, 그 이상은 공개하지 않습니다.

Sapling 업그레이드 이후 Swihart는 증명이 빠르고, 거래소 고객은 이미 온보딩에서 신원이 확인되며, 필요한 경우에는 강화된 실사가 존재하므로 거래소가 shielded 거래를 지원하지 않을 기술적 이유가 없다고 주장합니다. 이 관점에서 기술 장치와 컴플라이언스 워크플로 사이의 간극은 실제로 누락된 기본 요소가 아니라, 아직 이루어지지 않은 대화입니다.

Divij Pandya는 그 대화의 반대편에서 일하고 있습니다. 그는 이전 ECC 주도 이니셔티브를 이어 6월에 설립된 워싱턴 정책 조직 Zcash의 Pretty Good Policy 사무총장이며, 그의 조직의 과제는 컴플라이언스 책임자가 인용할 수 있는 문서에서 viewing key 공개가 허용 가능한 컴플라이언스 메커니즘으로 인정받게 하는 것입니다. 그가 아는 한, 아직 어떤 규제기관도 viewing key를 수단으로 다루지 않았습니다. PGPZ의 범위는 당연히 개발자 지침이 아니라 인정입니다. 권한 있는 누군가가 그 수단에 대해 판단하기 전에는 도구를 요구사항에 맞춰 명세화할 수 없으므로, 인정은 선행 단계입니다. 이 조직의 제출 문서는 Paul Brigner가 PGPZ의 창립자이자 ZODL의 최고 정책 및 규제 책임자로 서명했으므로, 정책과 엔지니어링 노력은 논지뿐 아니라 책임자도 공유합니다.

7월 21일 FinCEN 감독에 관한 하원 소위원회에 제출한 기록용 성명은 Zcash에 "selective disclosure capabilities, allowing users to voluntarily share transaction details through the use of viewing keys with auditors, tax authorities, or compliance officers"가 있다고 설명하며, 특정 사실을 증명하기 위한 "paired with selective viewing keys" 영지식 증명을 언급합니다. FinCEN의 공개 의견 접수 문서에 제출된 의견서 [FINCEN-2026-0101-0050](https://www.regulations.gov/comment/FINCEN-2026-0101-0050)은 Pandya에 따르면 viewing key와 선택적 공개가 허용 가능한 컴플라이언스 메커니즘이어야 한다고 주장합니다. 이들이 규제기관에 제기한 열린 질문은 세분성에 관한 것입니다. 계정 범위의 전체 내역 공개가 "targeted transaction information"에 충분한지, 아니면 답이 ZIP 231을 기다려야 하는지입니다.

그 문제가 해결되기 전까지 컴플라이언스 팀은 익명의 포럼 게시자 strahncryptography가 Olaboye의 제안 논의에서 [설명한](https://forum.zcashcommunity.com/t/grant-application-shielded-compliance-bridge/56862) 제약에 직면합니다. 이들은 규정을 문자 그대로 따르며, 암호학이 아무리 건전해도 규제기관이나 법무법인의 증명 없이는 인정되지 않은 경로를 채택하지 않을 것입니다. 거래에 참조를 연결하는 모든 공개 설계는 마지막 단계만 증명하며, 그 마지막 단계의 주체는 예치자 본인일 수 있습니다. viewing key도 같은 한계가 있습니다. 계정 보유자의 거래는 드러내지만, 제재 심사가 묻는 상대방 자금의 출처는 드러내지 않습니다.

viewing key는 예치자가 스스로 설명하기로 선택한 예치금의 출처, 자발적 감사, 세금 신고, 특정 결제가 이루어졌다는 증명처럼 데이터 주체가 일어난 일을 증명해야 하는 요구사항에서는 기준을 충족합니다. 이는 사용자 주도적이고, 소급적이며, 일회성인 공개입니다. 그러나 온보딩 이후의 지속적 모니터링, 계정 보유자가 통제하지 않는 상대방에 대한 제재 심사, 기간 또는 관계에 따른 범위 제한, 오프보딩 시 철회가 요구되는 경우에는 기준을 충족하지 못합니다.

Gemini는 대변인이 규제기관과의 지속적인 대화를 언급했던 [2020년 9월](https://www.gemini.com/blog/gemini-adds-support-for-shielded-zcash-transactions)부터 shielded 주소로의 출금을 허용해 왔고, 이를 2025년 11월 Orchard 풀로 확대했으며, 2026년 7월 활성화 이틀 뒤 post-Ironwood 풀에도 확대했습니다. shielded 주소에서 transparent 수탁으로 전송된 예치금은 수락합니다. Kraken의 [출금 주소 목록](https://support.kraken.com/articles/360001474826-supported-address-formats-for-cryptocurrency-withdrawal)은 transparent ZEC 주소만 지원하고, Coinbase도 마찬가지로 transparent 전용이며, Binance는 TEX를 요구합니다. 아직 어떤 주요 규제 거래소도 제공하지 않는 것은 shielded 수탁, shielded 예치 주소 또는 고객의 viewing key가 들어갈 워크플로입니다.

수집 기능은 한 계층 아래에서 구축되고 있습니다. 이번 9월 [검토 중인 코인 보유자 주도 소급 그랜트 라운드](https://forum.zcashcommunity.com/t/call-for-proposals-coinholder-directed-retroactive-grants-program-q3/56885)의 제안에는 view-only key를 가져오고, 노트를 분류하며, 지갑에 지속적인 접근 권한을 부여하지 않고 회계사를 위해 범위가 제한된 행 패키지를 내보내는 Mac 회계 도구 ZecBooks가 포함됩니다. 또한 mainnet 지갑을 대상으로 시험한 unified full viewing key 기반의 읽기 전용 원가 기준 및 조정 도구 ZecLedger, 그리고 결제 처리업체나 회계 시스템이 spending key를 보유하지 않고도 shielded 활동을 관찰할 수 있도록 viewing key를 받는 체인 동기화 엔진 seer-sync도 있습니다. 어느 것도 거래소 워크플로가 아니며, 어느 것도 규제기관의 관심을 받지 못했습니다. 각각은 파트너의 요청 없이 한두 명이 만든 동일한 문제의 회계사 대상 절반이며, ZecBooks의 범위 제한 내보내기는 선택적 공개가 가장 먼저 필요한 경우가 많은 인터페이스, 즉 shielded 사용자와 장부를 관리하는 사람 사이에서 작동하는 사례입니다.

## 코인이 아니라 부류

Zcash 개발자들은 모든 프라이버시 아키텍처가 공유하는 문제를 다루고 있습니다.

Zama의 confidential-EVM 설계에서는 접근 제어 목록이 어떤 주소가 암호문의 복호화를 요청할 수 있는지 결정하며, 키 관리 운영자의 threshold 네트워크가 요청 시 복호화를 수행합니다. 이는 수혜자 축을 사용자가 넘겨주는 키에서 계약이 기록하는 권한으로 옮기고, 계약이 사용 조건으로 감사자에게 복호화 권한을 부여할 수 있으므로 개시를 프로그래밍 가능하게 만듭니다. 하지만 이미 복호화된 암호문은 계속 복호화된 상태이므로, 컴플라이언스 책임자가 의미하는 철회 가능성을 제공하지는 않습니다. 또한 신뢰 기반을 사용자의 키 보관에서 운영자의 정직성으로 바꿉니다. Solana의 confidential transfer extension 및 Avalanche의 encrypted ERC 설계와 같은 유형의 자산 수준 감사자 키는 발행자 또는 지정 감사자가 해당 자산의 잔액과 전송을 읽을 수 있다는 점에서 토큰 수준에 수혜자를 고정합니다.

Inco는 거래 시점에 접근이 키 자료에 고정되는 사전 정의 viewing과, 이후 viewing 권한을 계약 상태로 부여하고 범위를 제한하고 철회할 수 있는 프로그래밍 가능한 view access를 구분하는 [프레임워크](https://www.inco.org/blog/programmable-view-access)를 발표했습니다.

## 왜 이렇게 어려운가

viewing key와 컴플라이언스 워크플로를 구분하는 것은 무엇일까요?

viewing key는 계정 보유자 자신의 내역을 공개합니다. 제재 심사와 지속적 모니터링은 각 거래 반대편 자금의 출처인 상대방에 관해 묻는데, 바로 그 정보가 shielded 풀의 존재 목적상 감춰지는 정보입니다. 투명한 원장이나 신뢰할 수 있는 제3자 없이 상대방에 관한 질문에 답하는 설계를 아직 누구도 보여주지 못했습니다.

메모 번들이 NU7 이후 업그레이드에 도입되고 reply-address 초안이 뒤따른다면, PGPZ의 제출 문서에 있는 "targeted transaction information"은 문자 그대로의 의미를 갖게 됩니다. 이는 적어도 두 번의 업그레이드가 남아 있으며, 규제 답변은 규제기관의 일정에 따라 나옵니다.

이를 향해 구축하는 사람의 수에서 수요는 쉽게 드러납니다. 부족한 것은 프라이버시 보존 공개에 대한 확정된 요구사항입니다. Zcash는 엔지니어, 옹호자, 개발자, 거래소, 그랜트 위원회가 목적지에는 동의하는 듯하지만 단계의 순서를 두고 논의하며 그 결정을 공개적으로 협상하는 생태계입니다. 요구사항이 작성되기를 기다리지 않고 회계 계층에서 시작한 개인 개발자들도 이 문제를 다루고 있습니다.

---

*공개: 이 글은 [Zcash Community Grant](https://forum.zcashcommunity.com/t/grant-application-zcash-in-the-privacy-stack-339/56456)의 지원을 받았습니다. ZCG는 게시 전에 이 글을 검토하거나 승인하지 않았습니다.*

---

**관련 페이지:** [Viewing Keys](https://zechub.wiki/zcash-tech/viewing-keys) · [기밀성 비교](https://zechub.wiki/research/confidentiality-compared)
