<a href="https://github.com/zechub/zechub/edit/main/site/Start_Here/Developer_Resources.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>


# 개발자 리소스

Zcash를 기반으로 개발하는 데 필요한 리소스를 용도별로 모았습니다.

2026년에 기술 스택이 크게 바뀌었습니다. 대부분의 역사 동안 네트워크를 운영했던 zcashd는 2026년 7월 18일 블록 높이 3417100에서 수명이 다했습니다. 수정되지 않은 모든 노드는 해당 높이에서 종료되며 다시 시작되지 않습니다. zcashd를 기준으로 작성된 가이드는 이제 시작점이 아니라 과거의 기록이므로, 이 페이지는 이를 대체한 기술 스택을 중심으로 구성했습니다.

## 기술 스택 한눈에 보기

| 계층 | 사용할 것 | 시작점 |
|:--|:--|:--|
| 풀 노드 | Zebra 또는 Zakura | [The Zebra Book](https://zebra.zfnd.org/), [zakura.com](https://zakura.com/) |
| 풀 노드 지갑 | 베타 버전인 Zallet | [The Zallet Book](https://zcash.github.io/zallet/) |
| 라이트 지갑 서버 | Zaino 또는 lightwalletd | [Zaino](https://github.com/zingolabs/zaino), [lightwalletd](https://github.com/zcash/lightwalletd) |
| 지갑 라이브러리 | librustzcash 크레이트 | [librustzcash](https://github.com/zcash/librustzcash) |
| 모바일 | Android 및 iOS SDK | [Android](https://github.com/zcash/zcash-android-wallet-sdk), [iOS](https://github.com/zcash/zcash-swift-wallet-sdk) |
| 사양 | 프로토콜 사양 및 ZIP | [zips.z.cash](https://zips.z.cash) |

## 노드

노드는 합의를 검증하고 체인을 보유합니다. 현재 활발히 개발 중인 구현은 2가지입니다.

[Zebra](/zcash-tech/zebra-full-node)는 Zcash Foundation의 노드로, Rust로 작성되었으며 현재 대부분의 가이드가 이를 기준으로 합니다. [The Zebra Book](https://zebra.zfnd.org/)에서 설치와 실행 방법을 확인할 수 있으며, 개발은 [저장소](https://github.com/ZcashFoundation/zebra)에서 이루어집니다.

[Zakura](/zcash-tech/zakura-node)는 새로 나온 노드로, 개발자들은 이 노드를 “규모 확장에 맞게 구축된, Zcash 합의 호환 풀 노드”라고 설명합니다. 동기화 속도가 더 빠르고 블록 가지치기를 지원하며, zcashd 호환 모드를 제공합니다. Zcash 공동 창업자인 Sean Bowe과 Dev Ojha가 주도하며, Apache 2.0 라이선스에 따라 [zakura-core/zakura](https://github.com/zakura-core/zakura)에서 오픈 소스로 제공됩니다.

ZecHub의 [Full Nodes](/zcash-tech/full-nodes) 페이지에서 두 구현 간의 장단점을 살펴볼 수 있습니다.

## 풀 노드 지갑

zcashd는 노드와 함께 지갑을 제공했습니다. 해당 지갑은 더 이상 사용할 수 없으며, 이를 대체하는 것은 [Zallet](https://github.com/zcash/zallet)입니다. Zallet Book에서는 이를 “Rust로 작성된 풀 노드 Zcash 지갑”으로, “zcashd 지갑을 대체하기 위해 구축 중”인 것으로 설명합니다.

사용하기 전에 보안 경고를 읽어 보세요. Zallet는 베타 버전이며, “완전히 검토되지 않았고”, 호환성이 깨지는 변경 사항이 “언제든 발생할 수 있어 Zallet 지갑을 삭제하고 다시 만들어야 할 수 있으며”, 아직 모든 zcashd RPC 메서드가 이식된 것도 아닙니다.

기존 설정을 옮기려는 경우, ZecHub에서 [zcashd에서 Zebra 및 Zallet로 이전하는 가이드](/guides/migration-guide-zcashd-to-zebrad-zallet)와 [Zallet 빠른 참조](/using-zcash/zallet-quick-reference-guide)를 확인할 수 있습니다.

## 라이트 지갑 서버

대부분의 지갑은 노드를 직접 실행하지 않습니다. 체인을 보관하고 그 정보를 간략한 형태로 전달하는 서버와 통신합니다.

[lightwalletd](https://github.com/zcash/lightwalletd)는 Go로 작성된 기존 서비스로, “Zcash 블록체인에 대역폭 효율적인 인터페이스를 제공하는 백엔드 서비스”입니다. [Zaino](/zcash-tech/zaino)는 Rust로 작성된 새로운 인덱서로, 자체 체인 사본을 보유하는 대신 전체 검증 노드에서 데이터를 읽습니다.

[Light Client Protocol](https://zcash.readthedocs.io/en/latest/lightwalletd/index.html) 문서에서는 프로토콜 자체를 다룹니다. [Lightwallet Nodes](/zcash-tech/lightwallet-nodes) 페이지에서는 이러한 서버가 사용자에 관해 어떤 정보를 볼 수 있고 볼 수 없는지 설명합니다. 서버를 선택하기 전에 알아 두면 좋습니다.

## 지갑 만들기

대부분의 지갑 개발은 [librustzcash](https://github.com/zcash/librustzcash) 아래의 Rust 크레이트를 중심으로 이루어집니다. 모바일 SDK와 여러 데스크톱 지갑이 이를 기반으로 합니다. 각 크레이트에 관한 문서는 [docs.rs](https://docs.rs)에서 확인할 수 있습니다.

| 크레이트 | 용도 |
|:--|:--|
| zcash_client_backend | 동기화와 거래 구성을 포함해 “거래정보 보호 Zcash 라이트 클라이언트를 만들기 위한 API” |
| zcash_client_sqlite | 위 클라이언트의 저장 계층인 “SQLite 기반 Zcash 라이트 클라이언트” |
| zcash_keys | “Zcash 키 및 주소 관리” |
| zcash_primitives | “Zcash 기본 요소의 Rust 구현” |
| zcash_protocol | “Zcash 프로토콜 네트워크 상수 및 값 유형” |
| orchard | “Orchard 거래정보 보호 거래 프로토콜” |
| sapling-crypto | “Zcash Sapling용 암호화 라이브러리” |
| pczt | 하드웨어 및 여러 기기에서 서명할 때 사용하는 “일부만 생성된 Zcash 거래 작업 도구” |
| zip321 | ZIP 321에 명시된 결제 요청 URI |

모바일에서는 [Android SDK](https://github.com/zcash/zcash-android-wallet-sdk)와 [iOS SDK](https://github.com/zcash/zcash-swift-wallet-sdk)가 이 라이브러리들을 감싸서 제공합니다. iOS 저장소는 이전에 ZcashLightClientKit라고 불렸으므로, 오래된 링크와 문서에서는 그 이름을 사용합니다.

## 사양 및 암호학

[프로토콜 사양](https://zips.z.cash/protocol/protocol.pdf)은 Zcash의 작동 방식에 관한 공식 기준 문서이며, [주소와 키 인코딩](https://zips.z.cash/protocol/protocol.pdf#5.6%20Encodings%20of%20Addresses%20and%20Keys)도 다룹니다.

변경 사항은 [ZIP](https://zips.z.cash)에서 제안하고 명세하며, 색인에서 초안과 최종안을 확인할 수 있습니다. 합의 변경 사항은 네트워크 업그레이드에 포함되며, ZecHub는 [네트워크 업그레이드](/start-here/network-upgrades) 페이지에서 이를 추적합니다.

기반이 되는 암호학을 알아보려면 [The halo2 Book](https://zcash.github.io/halo2/index.html)과 [The Orchard Book](https://zcash.github.io/orchard/)을 읽고, [halo2](https://docs.rs/halo2_proofs/latest/halo2_proofs/) 및 [orchard](https://docs.rs/orchard/latest/orchard/) 크레이트 문서도 함께 살펴보세요. [The FROST Book](https://frost.zfnd.org/)에서는 임계값 서명을 다루며, ZecHub에는 [FROST](/zcash-tech/frost) 페이지가 있습니다.

## 테스트넷

테스트넷은 TAZ라고 불리는 가치 없는 코인을 사용하는 별도의 체인입니다. Zebra와 Zakura 모두 테스트넷에 연결해 실행할 수 있으며, [테스트넷 가이드](https://zcash.readthedocs.io/en/latest/rtd_pages/testnet_guide.html)에서 노드 설정 방법을 확인할 수 있습니다.

[testnet.zcashexplorer.app](https://testnet.zcashexplorer.app/)은 정상적으로 작동하는 테스트넷 블록 탐색기이며, 메인넷 대응 서비스는 [mainnet.zcashexplorer.app](https://mainnet.zcashexplorer.app/)입니다.

TAZ를 얻는 일은 까다롭습니다. 이전 문서에 링크된 파우셋이 더 이상 응답하지 않기 때문입니다. [zcashfaucet.jinolabs.xyz](https://zcashfaucet.jinolabs.xyz)는 커뮤니티가 운영하는 파우셋으로, “자체 노드, 지갑, 채굴자를 운영”하고 “거래정보 보호 z2z 소액 지급”을 제공하며, “캡차 서비스 업체 대신 브라우저 작업 증명으로 요청을 제한”합니다. MIT 라이선스에 따라 오픈 소스로 제공됩니다. 사용할 수 없다면 Zcash R&D Discord에서 문의하세요. Zcash 문서에서도 그렇게 안내합니다.

## 일반 문서

[Zcash 문서](https://zcash.readthedocs.io/en/latest/)는 여전히 프로토콜 개념, 통합, 채굴을 아우르는 가장 폭넓은 단일 자료입니다. 다만 주의해서 읽어야 합니다. zcashd를 기준으로 버전이 관리되므로, 일부 내용은 더 이상 실행되지 않는 노드를 설명하는 반면 프로토콜과 라이트 클라이언트 관련 부분은 여전히 유용합니다. 그 안에 있는 [The Zcash Wallet App Threat Model](https://zcash.readthedocs.io/en/latest/rtd_pages/wallet_threat_model.html)은 사용자 프라이버시와 관련된 것을 설계하기 전에 읽어 볼 만합니다.

블록체인 전반을 처음 접한다면, 공통 기반 지식을 익히기 위해 보통 [Mastering Bitcoin](https://github.com/bitcoinbook/bitcoinbook)을 권합니다. 전체 내용을 무료로 읽을 수 있습니다. 다만 거래정보 보호 거래는 다루지 않습니다.

## 개발자들이 언급한 기타 도구

[Arti](https://docs.rs/arti/latest/arti/)는 Tor의 Rust 구현으로, zcash_client_backend가 지갑 트래픽을 라우팅하는 데 사용합니다. 직접 실행하는 노드에 연결할 때는 [Tailscale](https://github.com/tailscale/tailscale)도 언급됩니다. [warp2](https://github.com/hhanh00/warp2)는 Hanh가 만든 빠른 동기화 구현이지만, 2023년 이후 업데이트되지 않았습니다.

## 커뮤니티 및 행사

프로토콜과 지갑 개발에 관한 논의는 [Zcash R&D Discord](https://discord.gg/6AK7keWFaK)에서 이루어지며, [Zcash 커뮤니티 포럼](https://forum.zcashcommunity.com/)에는 긴 제안과 지원 관련 토론이 올라옵니다.

최근 해커톤 결과를 보면 사람들이 무엇을 개발하는지 잘 알 수 있습니다. [ZecHub 2024](https://x.com/ZecHub/status/1845212469809033489), [ZecHub 2025](https://x.com/ZecHub/status/1975565960661635283), 그리고 [Zypherpunk Hackathon 2025](https://forum.zcashcommunity.com/t/zypherpunk-hackathon-winners/53985)를 확인해 보세요.

## 사용 중단된 리소스

오래된 문서에서 링크하는 경우가 있고, 사용이 중단된 노드의 동작을 확인하는 참고 자료로 여전히 유용하므로 남겨 두었습니다. 여기서 시작하지 마세요.

[The zcashd Book](https://zcash.github.io/zcash/)과 [zcashd RPC 참조 문서](https://zcash.github.io/rpc/)에는 2026년 7월에 [수명이 다한](https://zcash.github.io/zcash/user/end-of-life.html) 소프트웨어가 기록되어 있습니다. [zcash/zcash](https://github.com/zcash/zcash) 저장소는 보관 처리되었습니다.

추가할 리소스가 있거나 이 페이지의 정보가 오래되었다면 이슈 또는 풀 리퀘스트를 열어 주세요. 팀에 항상 모든 내용을 최신 상태로 유지할 여력이 있는 것은 아니므로, 겪으신 문제를 알려 주시면 가이드의 개선 방향을 정하는 데 도움이 됩니다.

**마지막 업데이트:** 2026년 8월
