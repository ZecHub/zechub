[![페이지 편집](https://img.shields.io/badge/Edit-blue)](https://github.com/zechub/zechub/edit/main/site/Privacy_Tools/Namada_Protocol.md)

# Namada 프로토콜

![Namada 로고](https://i.ibb.co/BZcZHS1/logo.png)


## Namada란 무엇인가?

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

Namada 프로토콜은 블록체인 간 자산 무관한 개인 정보 보호를 제공하기 위해 설계된 스테이킹 기반의 레이어1 플랫폼입니다. Inter-Blockchain Communication (IBC) 프로토콜을 통해 Namada는 빠른 최종성 체인과 원활하게 통합되어, 간편한 상호 운용성을 제공합니다. 또한, Namada는 Ethereum과의 신뢰 없는 양방향 브리지 연결을 구축하여 두 네트워크 간 안전하고 신뢰할 수 있는 커뮤니케이션을 가능하게 합니다.

Namada는 Multi-Asset Shielded Pool (MASP) 회로의 개선된 버전을 도입함으로써 개인 정보 보호를 우선시합니다. 이 업그레이드된 버전은 Zcash와 동일한 방식으로 모든 유형의 자산, 즉 동질적 및 비동질적 토큰이 공유된 쉴드 세트를 사용할 수 있도록 합니다. 결과적으로, Namada에서 지원되는 자산을 전송하는 행위는 높은 수준의 개인 정보 보호로 인해 식별하기 어렵게 되어 구분됩니다. 또한, Multi Asset Shielded Pool 회로의 최신 업데이트는 쉴드 세트 보상이라는 혁신적인 기능이나 인센티브를 제공하여, 개인 정보 보호가 공공재로서 자원을 할당하도록 촉진합니다.

## 이더리움 브리지 + IBC 호환

이더리움 브리지의 Namada 통합은 별도 프로토콜의 필요성을 제거하며, Namada 생태계의 필수적인 부분이 됩니다. Namada 내 검증자는 핵심 Namada 프로토콜과 함께 브리지를 실행하는 임무를 맡습니다. 또한, 이 검증자들은 자산을 Namada로 전송할 때 중개자 역할을 수행합니다. 따라서 추가적인 참여자의 개입이 필요하지 않습니다. 반면, 자산을 이더리움으로 전송할 경우 외부 당사자(중개자)가 관여하게 되지만, 그들은 브리지의 검증이나 보안에 책임을 지지 않습니다.

![이더리움 브리지 다이어그램](https://i.ibb.co/wKds5RP/image.jpg)

Namada 프로토콜은 또한 IBC(Inter-Blockchain Communication) 프로토콜을 지원하는 모든 빠른 최종성 체인과 원활하게 연결할 수 있습니다. 이더리움과의 상호 운용 시, Namada는 신뢰 없는 방식으로 작동하는 특별하고 보안이 강화된 이더리움 브리지를 구현합니다. 이 브리지는 모든 브리지 연결에 대해 흐름 제어를 시행하며, 오류가 있는 이더리움 전송은 심각한 위반으로 간주되어 슬래싱 벌금이 부과될 수 있도록 설계되었습니다.

## 쉴드 세트 보상

[Namada 프로토콜](https://blog.namada.net/what-is-namada/)의 최신 업데이트에 따르면, 쉴드 자산을 소유한 사용자는 공유된 쉴드 세트에 적극적으로 참여하도록 인센티브를 제공받습니다. 이는 업그레이드된 MASP 회로와 통합되어, 혁신적인 Convert 회로가 포함되어 있기 때문에 가능합니다. 이러한 새로운 기능을 활용하여 Namada는 사용자가 쉴드 자산을 소유함으로써 공유된 쉴드 세트에 기여하도록 장려합니다.

Namada에서의 쉴드 세트는 비독점적이고 반경쟁적인 공공재로 간주됩니다. 이는 더 많은 사람들이 쉴드 전송을 사용할수록 각 참여자에게 제공되는 개인 정보 보호 수준이 향상된다는 의미입니다. 프로토콜은 집단 채택과 참여가 모든 사용자의 개인정보 보호를 강화하는 데 중요하다고 인식합니다. 따라서, 쉴드 자산을 소유하고 공유된 쉴드 세트에 기여하도록 사용자를 인센티브화함으로써 Namada는 더 강력하고 견고한 개인 정보 보호 생태계를 조성합니다.

## 쉴드 자산 거래

쉴드 전송의 경우, 이더리움 비동질 토큰(NFT), ATOM 또는 NAM 등 어떤 자산이든 구분되지 않습니다. 즉, MASP(수정된 누적자 Sapling 프로토콜)가 제공하는 개인 정보 보호 기능은 Zcash Sapling 회로의 개선 버전으로, 모든 유형의 자산에 동일하게 적용됩니다. MASP 회로는 Namada 생태계 내 모든 자산이 동일한 쉴드 세트를 공유하도록 합니다. 이 접근 방식은 개인 자산 간 개인정보 보호가 분할되지 않도록 보장합니다. 특정 자산과 관련된 거래량에 관계없이 개인정보 보호 수준은 일관되고 독립적으로 유지됩니다.

![쉴드 자산 거래 다이어그램](https://i.ibb.co/7CDmWk6/image-1.png)

다양한 자산 간 쉴드 세트를 통합함으로써 Namada는 특정 자산 유형과 관계없이 쉴드 전송에 참여하는 경우 개인정보 보호가 일관되게 유지되도록 합니다. 이 접근 방식은 프로토콜 내에서 일관된 개인 정보 보호 프레임워크를 촉진하고, 이더리움 NFT, ATOM, NAM 및 기타 지원 자산을 포함한 거래의 기밀성을 향상시킵니다. Namada는 또한 Zcash와 동일하게 원ative 및 비원ative 토큰에 대한 기밀성을 보장하는 새로운 zk-SNARKs를 사용하여, fungible 및 non-fungible 토큰의 사적인 전송을 가능하게 합니다.

## 낮은 수수료와 빠른 거래

Namada는 두 가지 핵심 요소를 결합하여 빠른 거래 속도와 최종성을 제공합니다: 빠른 증명 생성 및 현대적 Byzantine Fault Tolerant (BFT) 공감 알고리즘. 이 두 가지 기능은 Namada가 Visa와 같은 고 처리량 능력을 갖춘 유명한 결제 네트워크와 비교할 수 있는 거래 처리 속도를 달성하도록 합니다. 빠른 증명 생성은 블록체인 상의 거래의 정확성과 무결성을 검증하는 암호학적 증명을 효율적으로 생성하는 것을 의미합니다. 고급 기술 및 최적화를 통해 Namada 프로토콜은 이러한 증명을 생성하기 위해 필요한 계산 오버헤드를 최소화하여 거래의 신속한 확인과 검증이 가능하게 합니다.

또한, Namada는 현대적인 BFT 공감 알고리즘을 사용함으로써 네트워크 상에서 거래의 무결성 및 합의를 보장합니다. 이러한 공감 메커니즘은 Namada가 거래의 순서와 유효성을 결정하는 데 합의에 도달하도록 하여, 최종성을 강력하게 보장합니다. 최종성은 거래가 되돌릴 수 없으며, 이중 지출 또는 거래 롤백의 위험을 줄입니다. Namada는 스케일링 솔루션으로 유명한 Anoma 프로토콜과 유사한 접근 방식을 따릅니다. Namada는 분할 인스턴스를 채택하여 메인 블록체인 내 중첩 체인의 생성이 가능하도록 합니다. 이 분할 구조는 여러 인스턴스에 부하를 분산시켜 네트워크 전체의 용량과 성능을 향상시키는 수평 확장을 가능하게 합니다.

## Namada와 Zcash 전략적 동맹

[Namada 프로토콜 블로그](https://blog.namada.net/rfc-proposal-for-a-strategic-alliance-between-namada-and-zcash/)에 게시된 최근 공고에 따르면, Namada 프로토콜 팀은 Namada와 Zcash 자산, 체인 및 커뮤니티 간의 전략적 동맹을 제안하고 요청-댓글(RFC)을 발표하기를 기대합니다.

![Namada-Zcash 전략적 동맹 다이어그램](https://i.ibb.co/FqsmkMb/image-2.png)

제안된 동맹은 세 가지 주요 요소로 구성됩니다. 첫째, Zcash와 Namada 모두에 이점을 제공하는 프로젝트를 지원하기 위한 기금 풀이 생성될 예정입니다. 둘째, NAM 토큰의 에어드롭이 ZEC 보유자에게 할당될 예정입니다. 마지막으로, Zcash와 Namada 간 신뢰 최소화된 브리지 연결을 구축하기 위한 계획이 마련되어 있습니다. 이 브리지가 실행되면, ZEC 보유자인 Zolders는 그들의 ZEC를 Namada에서 사용할 수 있게 됩니다. 또한, Zolders는 Namada를 통해 더 넓은 Cosmos 및 Ethereum 생태계에 접근할 기회가 제공됩니다. 전략적 동맹에 대한 자세한 내용은 [Zcash 커뮤니티 포럼](https://forum.zcashcommunity.com/t/rfc-proposal-for-a-strategic-alliance-between-namada-and-zcash/44372)에서 확인할 수 있습니다.

## 참고 링크

- [Namada 프로토콜 공식 영상](https://www.youtube.com/watch?v=Wg_WtPdBig0)
- [Namada 프로토콜 공식 웹사이트](https://namada.net/)
- [Namada 블로그](https://blog.namada.net/)
- [Namada 문서](https://docs.namada.net/)
