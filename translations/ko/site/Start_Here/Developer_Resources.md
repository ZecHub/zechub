<a href="https://github.com/zechub/zechub/edit/main/site/Start_Here/Developer_Resources.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>


# 개발자 리소스

Zcash에서 개발하는 데 필요한 리소스를, 한곳에 나열하는 대신 각각의 용도별로 분류했습니다.

2026년에 스택은 크게 바뀌었습니다. 역사 대부분의 기간 동안 네트워크를 운영했던 zcashd는 블록 높이 3417100에서 2026년 7월 18일 수명 종료에 도달했으며, 수정되지 않은 모든 노드는 해당 높이에서 종료되고 재시작을 거부합니다. zcashd를 위해 작성된 가이드는 이제 출발점이 아니라 역사가 되었으므로, 이 페이지는 이를 대체한 것들을 중심으로 구성되어 있습니다.

## 스택 한눈에 보기

| 계층 | 사용할 것 | 시작점 |
|:--|:--|:--|
| 전체 노드 | Zebra 또는 Zakura | [The Zebra Book](https://zebra.zfnd.org/), [zakura.com](https://zakura.com/) |
| 전체 노드 지갑 | 베타 버전 Zallet | [The Zallet Book](https://zcash.github.io/zallet/) |
| 라이트 지갑 서버 | Zaino 또는 lightwalletd | [Zaino](https://github.com/zingolabs/zaino), [lightwalletd](https://github.com/zcash/lightwalletd) |
| 지갑 라이브러리 | librustzcash 크레이트 | [librustzcash](https://github.com/zcash/librustzcash) |
| 모바일 | Android 및 iOS SDK | [Android](https://github.com/zcash/zcash-android-wallet-sdk), [iOS](https://github.com/zcash/zcash-swift-wallet-sdk) |
| 명세 | 프로토콜 명세 및 ZIP | [zips.z.cash](https://zips.z.cash) |

## 노드

노드는 합의를 검증하고 체인을 보관합니다. 활발히 개발 중인 구현체는 두 가지입니다.

[Zebra](/zcash-tech/zebra-full-node)는 Rust로 작성된 Zcash Foundation의 노드이며, 현재 대부분의 가이드가 전제하는 구현체입니다. [The Zebra Book](https://zebra.zfnd.org/)에서는 설치 및 실행 방법을 다루며, 개발은 [리포지터리](https://github.com/ZcashFoundation/zebra)에서 이루어집니다.

[Zakura](/zcash-tech/zakura-node)는 더 새로운 노드로, 제작자는 이를 더 빠른 동기화, 블록 프루닝 및 zcashd 호환 모드를 갖춘 "확장성을 위해 구축된 합의 호환 Zcash 전체 노드"라고 설명합니다. Zcash 공동 창립자인 Sean Bowe와 Dev Ojha가 이끌고 있습니다. Apache 2.0 라이선스의 오픈 소스이며 [zakura-core/zakura](https://github.com/zakura-core/zakura)에서 확인할 수 있습니다.

ZecHub의 [전체 노드](/zcash-tech/full-nodes) 페이지에서는 이들 사이의 장단점을 다룹니다.

## 전체 노드 지갑

zcashd는 노드에 지갑을 포함했습니다. 그 지갑은 사라졌으며, [Zallet](https://github.com/zcash/zallet)이 이를 대체합니다. The Zallet Book에서는 이를 "Rust로 작성된 전체 노드 Zcash 지갑"이자 "zcashd 지갑을 대체하기 위해 구축 중인" 지갑으로 설명합니다.

의존하기 전에 보안 경고를 읽어 보세요. Zallet은 베타 버전이며, "완전히 검토되지 않았고", 호환성이 깨지는 변경이 "언제든 발생할 수 있어 Zallet 지갑을 삭제하고 다시 만들어야 할 수 있으며", 모든 zcashd RPC 메서드가 아직 이식되지는 않았습니다.

기존 설정을 이전하는 경우, ZecHub에는 [zcashd에서 Zebra 및 Zallet으로의 마이그레이션 가이드](/guides/migration-guide-zcashd-to-zebrad-zallet)와 [Zallet 빠른 참조](/using-zcash/zallet-quick-reference-guide)가 있습니다.

## 라이트 지갑 서버

대부분의 지갑은 노드를 실행하지 않습니다. 대신 체인을 유지하고 그 압축된 보기를 반환하는 서버와 통신합니다.

[lightwalletd](https://github.com/zcash/lightwalletd)는 Go로 작성된 원래 서비스로, "Zcash 블록체인에 대역폭 효율적인 인터페이스를 제공하는 백엔드 서비스"로 설명됩니다. [Zaino](/zcash-tech/zaino)는 Rust로 작성된 더 새로운 인덱서로, 자체 체인 사본을 보관하는 대신 전체 검증자로부터 데이터를 읽습니다.

[Light Client Protocol](https://zcash.readthedocs.io/en/latest/lightwalletd/index.html) 문서에서는 프로토콜 자체를 다룹니다. [라이트월렛 노드](/zcash-tech/lightwallet-nodes) 페이지에서는 이 서버들이 사용자에 대해 무엇을 볼 수 있고 볼 수 없는지 다루므로, 하나를 선택하기 전에 이해해 두는 것이 좋습니다.

## 지갑 만들기

대부분의 지갑 작업은 [librustzcash](https://github.com/zcash/librustzcash)의 Rust 크레이트에서 이루어지며, 모바일 SDK와 여러 데스크톱 지갑은 이를 기반으로 구축됩니다. 각 크레이트는 [docs.rs](https://docs.rs)에 문서화되어 있습니다.

| 크레이트 | 용도 |
|:--|:--|
| zcash_client_backend | 동기화 및 트랜잭션 구성을 포함한 "차폐된 Zcash 라이트 클라이언트 생성을 위한 API" |
| zcash_client_sqlite | 위 항목의 저장소 계층인 "SQLite 기반 Zcash 라이트 클라이언트" |
| zcash_keys | "Zcash 키 및 주소 관리" |
| zcash_primitives | "Zcash 프리미티브의 Rust 구현" |
| zcash_protocol | "Zcash 프로토콜 네트워크 상수 및 값 유형" |
| orchard | "Orchard 차폐 트랜잭션 프로토콜" |
| sapling-crypto | "Zcash Sapling용 암호화 라이브러리" |
| pczt | 하드웨어 및 다중 기기 서명에 사용되는 "부분 생성된 Zcash 트랜잭션 작업 도구" |
| zip321 | ZIP 321에 명시된 결제 요청 URI |

모바일용으로는 [Android SDK](https://github.com/zcash/zcash-android-wallet-sdk)와 [iOS SDK](https://github.com/zcash/zcash-swift-wallet-sdk)가 이 라이브러리를 감쌉니다. iOS 리포지터리는 이전에 ZcashLightClientKit이라고 불렸으므로, 오래된 링크와 글에서는 그 이름을 사용합니다.

## 명세와 암호학

[프로토콜 명세](https://zips.z.cash/protocol/protocol.pdf)는 [주소 및 키 인코딩](https://zips.z.cash/protocol/protocol.pdf#5.6%20Encodings%20of%20Addresses%20and%20Keys)을 포함하여 Zcash 작동 방식에 관한 권위 있는 자료입니다.

[ZIP](https://zips.z.cash)은 변경 사항이 제안되고 명세되는 곳이며, 인덱스에서 초안과 최종본을 확인할 수 있습니다. 합의 변경은 네트워크 업그레이드로 배포되며, ZecHub는 [네트워크 업그레이드](/start-here/network-upgrades) 페이지에서 이를 추적합니다.

기반 암호학은 [The halo2 Book](https://zcash.github.io/halo2/index.html) 및 [The Orchard Book](https://zcash.github.io/orchard/)을 읽고, [halo2](https://docs.rs/halo2_proofs/latest/halo2_proofs/) 및 [orchard](https://docs.rs/orchard/latest/orchard/) 크레이트 문서도 함께 참고하세요. [The FROST Book](https://frost.zfnd.org/)에서는 임계값 서명을 다루며, ZecHub에는 [FROST](/zcash-tech/frost) 페이지가 있습니다.

## 테스트넷

테스트넷은 TAZ라는 가치 없는 코인을 사용하는 별도의 체인입니다. Zebra와 Zakura 모두 이를 대상으로 실행할 수 있으며, [테스트넷 가이드](https://zcash.readthedocs.io/en/latest/rtd_pages/testnet_guide.html)에서 노드 구성을 다룹니다.

[testnet.zcashexplorer.app](https://testnet.zcashexplorer.app/)은 작동 중인 테스트넷 블록 탐색기이며, 메인넷 대응 서비스는 [mainnet.zcashexplorer.app](https://mainnet.zcashexplorer.app/)에 있습니다.

TAZ를 얻는 것이 까다로운 부분입니다. 공개 파우싯은 생겼다 사라지며, 이 페이지 작성 당시 오래된 문서에서 연결한 파우싯들은 응답하지 않았습니다. 신뢰할 수 있는 방법은 Zcash R&D Discord에서 요청하는 것이며, Zcash 문서 자체도 이를 제안합니다.

## 일반 문서

[Zcash 문서](https://zcash.readthedocs.io/en/latest/)는 프로토콜 개념, 통합 및 채굴을 다루는 가장 폭넓은 단일 자료입니다. 다만 주의해서 읽으세요. zcashd를 기준으로 버전 관리되므로 일부는 더 이상 실행되지 않는 노드를 설명하지만, 프로토콜과 라이트 클라이언트 섹션은 여전히 유용합니다. 그곳에 있는 [Zcash 지갑 앱 위협 모델](https://zcash.readthedocs.io/en/latest/rtd_pages/wallet_threat_model.html)은 사용자 프라이버시와 관련된 것을 설계하기 전에 읽어볼 가치가 있습니다.

블록체인 전반이 처음이라면, 공유되는 기초 지식에는 [Mastering Bitcoin](https://github.com/bitcoinbook/bitcoinbook)이 일반적인 추천 자료이며 전문을 무료로 읽을 수 있습니다. 차폐 트랜잭션은 다루지 않습니다.

## 개발자들이 언급한 기타 도구

[Arti](https://docs.rs/arti/latest/arti/)는 지갑 트래픽을 라우팅하기 위해 zcash_client_backend가 사용하는 Tor의 Rust 구현체입니다. [Tailscale](https://github.com/tailscale/tailscale)은 직접 실행하는 노드에 연결할 때 언급됩니다. [warp2](https://github.com/hhanh00/warp2)는 Hanh가 만든 빠른 동기화 구현체이지만, 2023년 이후 업데이트되지 않았습니다.

## 커뮤니티와 이벤트

[Zcash R&D Discord](https://discord.gg/6AK7keWFaK)는 프로토콜 및 지갑 개발이 논의되는 곳이며, [Zcash 커뮤니티 포럼](https://forum.zcashcommunity.com/)에는 더 긴 제안과 지원 스레드가 올라옵니다.

최근 해커톤 결과는 사람들이 무엇을 만들고 있는지 잘 보여줍니다: [ZecHub 2024](https://x.com/ZecHub/status/1845212469809033489), [ZecHub 2025](https://x.com/ZecHub/status/1975565960661635283) 및 [Zypherpunk Hackathon 2025](https://forum.zcashcommunity.com/t/zypherpunk-hackathon-winners/53985).

## 은퇴한 리소스

오래된 글에서 이를 연결하고 있으며, 은퇴한 노드의 동작 방식을 확인하는 참고 자료로 여전히 유용하기 때문에 보존합니다. 여기서 시작하지 마세요.

[The Zcashd Book](https://zcash.github.io/zcash/)과 [zcashd RPC 참조](https://zcash.github.io/rpc/)는 2026년 7월에 [수명 종료](https://zcash.github.io/zcash/user/end-of-life.html)에 도달한 소프트웨어를 문서화합니다. [zcash/zcash](https://github.com/zcash/zcash) 리포지터리는 보관 처리되었습니다.

추가할 리소스가 있거나 여기에서 오래된 내용을 발견했다면 이슈 또는 풀 리퀘스트를 열어 주세요. 팀이 항상 모든 것을 최신으로 유지할 역량을 갖추고 있는 것은 아니며, 마주친 문제를 알려주면 가이드의 방향을 정하는 데 도움이 됩니다.

**최종 업데이트:** 2026년 8월
