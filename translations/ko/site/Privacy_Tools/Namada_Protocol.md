[![Edit Page](https://img.shields.io/badge/Edit-blue)](https://github.com/zechub/zechub/edit/main/site/Privacy_Tools/Namada_Protocol.md)

# Namada 프로토콜

![Namada Logo](/content-images/logo-2067e2533d.webp)


## Namada란 무엇인가요?

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/Wg_WtPdBig0"
    title="Zcash Explained: Namada-Zcash Strategic Alliance"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>

Namada 프로토콜은 지분 증명 합의를 기반으로 하는 레이어 1 플랫폼으로, 체인 간 자산 종류에 구애받지 않는 프라이버시를 제공하도록 설계되었습니다. 인터블록체인 통신(Inter-Blockchain Communication, IBC) 프로토콜을 통해 Namada은 빠른 최종성을 갖춘 체인과 원활하게 통합되어, 매끄러운 상호 운용성을 지원합니다. 또한 Namada은 이더리움과 신뢰가 필요 없는 양방향 브릿지를 구축하여 두 네트워크 간의 안전하고 신뢰할 수 있는 통신을 지원합니다.

Namada은 멀티 에셋 거래정보 보호 구역(Multi-Asset Shielded Pool, MASP) 회로의 개선된 버전을 구현해 프라이버시를 우선시합니다. 이 업그레이드 버전을 사용하면 대체 가능 토큰과 대체 불가능 토큰을 비롯한 모든 유형의 자산이 Zcash의 거래정보 보호 구역과 동일한 공유 거래정보 보호 집합을 이용할 수 있습니다. 그 결과, Namada에서 지원되는 자산을 이전하는 행위는 높은 수준의 프라이버시로 인해 구별하기 어려워집니다. 또한 멀티 에셋 거래정보 보호 구역 회로의 최신 업데이트에는 거래정보 보호 집합 보상이 추가되었습니다. 이는 공공재로서의 프라이버시를 증진하기 위해 자원을 배분하는 획기적인 기능이자 인센티브입니다.

## 이더리움 브릿지 및 IBC 호환성

이더리움 브릿지를 Namada에 통합하면 별도의 프로토콜이 필요하지 않으며, 브릿지는 Namada 생태계의 필수 요소가 됩니다. Namada의 검증자는 핵심 Namada 프로토콜과 함께 브릿지를 운영합니다. 또한 이 검증자들은 자산을 Namada으로 이전할 때 중계자 역할도 하므로, 추가 참여자가 필요하지 않습니다. 반면 자산을 이더리움으로 이전할 때는 외부 당사자(중계자)가 참여하지만, 이들은 브릿지의 검증이나 보안 유지에 대한 책임을 지지 않습니다.

![Ethereum Bridge Diagram](/content-images/image-0fd8f754ba.webp)

Namada 프로토콜은 인터블록체인 통신(Inter-Blockchain Communication, IBC) 프로토콜을 지원하는 모든 빠른 최종성 체인과 원활하게 연결할 수 있습니다. Ethereum과 상호 운용할 때 Namada는 신뢰가 필요 없는 방식으로 작동하는 특수하고 안전한 Ethereum 브릿지를 구현합니다. 이 브릿지는 모든 브릿지 연결에 흐름 제어를 적용하고, 잘못된 Ethereum 전송을 슬래싱 페널티로 이어질 수 있는 심각한 위반으로 취급하여 안전을 우선하도록 세심하게 설계되었습니다.

## 거래정보 보호 집합 보상

[Namada 프로토콜](https://namada.net/blog/what-is-namada)의 최신 업데이트에서는 거래정보 보호 자산을 보유한 사용자가 공유 거래정보 보호 집합에 적극적으로 참여하도록 장려합니다. 이는 업데이트된 MASP 회로에 혁신적인 컨버트 회로(Convert Circuit)를 통합함으로써 가능해졌습니다. 이 새로운 기능을 활용하여 Namada은 사용자들이 거래정보 보호 자산을 보유함으로써 공유 거래정보 보호 집합에 기여하도록 장려합니다.

Namada에서 거래정보 보호 집합은 배타적이지 않고 경쟁성이 없는 공공재로 간주됩니다. 즉, 거래정보 보호 이전을 이용하는 사람이 많아질수록 각 참여자에게 제공되는 프라이버시 보장이 강화됩니다. 프로토콜은 모든 사용자의 프라이버시를 강화하는 데 집단적인 도입과 참여가 중요하다는 점을 인식합니다. 따라서 사용자가 거래정보 보호 자산을 보유하고 공유 거래정보 보호 집합에 기여하도록 장려함으로써 Namada은 더욱 강력하고 견고한 프라이버시 생태계를 조성합니다.

## 거래정보 보호 자산 거래

MASP([멀티 에셋 거래정보 보호 구역](https://docs.namada.net/users/shielded-accounts))은 Zcash의 Sapling 회로를 확장하여 네이티브 자산과 비네이티브 자산의 거래정보 보호 이전을 지원합니다. 풀을 공유한다고 해서 프라이버시가 자산의 이용 방식과 무관해지는 것은 아닙니다. Namada의 문서에 따르면 같은 종류의 자산은 익명성 집합을 공유하며, 공개적인 거래정보 보호 및 거래정보 보호 해제 패턴으로 자산의 출처가 드러날 수도 있습니다.

![Shielded Assets Transaction Diagram](/content-images/image-1-512c639d56.webp)

예를 들어, 한 계정만 BTC를 거래정보 보호 상태로 전환한 뒤 나중에 같은 계정으로 출금한다면, 자금이 MASP 내부에서 프라이빗하게 이동했더라도 공개된 입출금 지점을 서로 연결할 수 있습니다. 더 많은 계정이 BTC를 거래정보 보호 상태로 전환하면, 이후의 출금은 그 계정 중 어느 계정에서 이루어졌든 가능해집니다. 중요한 것은 참여와 거래 패턴이며, 공유 풀의 크기만으로 모든 자산에 동일한 프라이버시가 보장되는 것은 아닙니다.

## 낮은 수수료와 빠른 거래

Namada은 빠른 거래 속도와 최종성을 제공하기 위해 두 가지 핵심 요소, 즉 빠른 증명 생성과 현대적인 비잔틴 장애 허용(Byzantine Fault Tolerant, BFT) 합의를 결합합니다. 이 두 가지 기능을 통해 Namada은 높은 처리량으로 잘 알려진 결제 네트워크 Visa와 비슷한 수준의 거래 처리량을 달성할 수 있습니다. 빠른 증명 생성은 블록체인에서 거래의 정확성과 무결성을 검증하는 암호학적 증명을 효율적으로 생성하는 것을 뜻합니다. Namada 프로토콜은 고급 기법과 최적화를 활용해 이러한 증명 생성에 필요한 연산 부담을 줄이고, 그 결과 거래를 신속하게 검증하고 확인합니다.

또한 Namada은 네트워크 전반에서 거래의 무결성과 합의를 보장하는 현대적인 BFT 합의 알고리즘을 사용합니다. 이러한 합의 메커니즘은 Namada이 거래의 순서와 유효성에 대한 합의에 도달하도록 하여 강력한 최종성 보장을 제공합니다. 최종성이 확보되면 거래는 되돌릴 수 없는 것으로 간주되어 이중 지불이나 거래 롤백 위험이 줄어듭니다. Namada은 scaling 솔루션으로 잘 알려진 또 다른 프로토콜인 Anoma과 비슷한 접근 방식을 따릅니다. Namada은 프랙탈 인스턴스를 도입해 메인 블록체인 안에 중첩 체인을 만들 수 있도록 합니다. 이러한 프랙탈 구조는 여러 인스턴스에 부하를 분산해 수평 scaling을 가능하게 하고, 네트워크의 전반적인 용량과 성능을 높입니다.

## Namada과 Zcash의 전략적 제휴

[Namada 프로토콜 블로그](https://namada.net/blog/rfc-proposal-for-a-strategic-alliance-between-namada-and-zcash)에서 확인할 수 있는 최근 게시물에 따르면, Namada 프로토콜 팀은 Namada과 Zcash의 자산, 체인, 커뮤니티 간 전략적 제휴를 위한 제안서와 의견 수렴 요청(RFC)을 발표하게 되어 기쁘게 생각합니다.

![Namada-Zcash Strategic Alliance Diagram](/content-images/image-2-68804c60f3.webp)

제안된 제휴는 세 가지 주요 요소로 구성됩니다. 첫째, Zcash과 Namada 모두에 이점을 제공하는 프로젝트에 자금을 지원하기 위해 개발 지원금 풀을 조성합니다. 둘째, NAM 토큰을 에어드롭하여 ZEC 보유자에게 배분합니다. 마지막으로 Zcash과 Namada을 연결하는 신뢰 최소화 브릿지를 구축할 계획입니다. 이 브릿지가 구현되면 Zolders라고 불리는 ZEC 보유자는 ZEC을 Namada에서 사용할 수 있습니다. 또한 Zolders는 Namada을 통해 더 넓은 Cosmos 및 이더리움 생태계에 접근할 수 있습니다. 전략적 제휴에 대한 자세한 내용은 [Zcash 커뮤니티 포럼](https://forum.zcashcommunity.com/t/rfc-proposal-for-a-strategic-alliance-between-namada-and-zcash/44372)에서 확인할 수 있습니다.

## 참고 링크

- [Namada 프로토콜 공식 영상](https://www.youtube.com/watch?v=Wg_WtPdBig0)
- [Namada 프로토콜 공식 웹사이트](https://namada.net/)
- [Namada 블로그](https://namada.net/blog)
- [Namada 문서](https://docs.namada.net/)
